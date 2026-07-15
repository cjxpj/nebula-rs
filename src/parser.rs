use std::collections::HashMap;
use std::fs;
use std::path::Path;
use std::sync::{Mutex, OnceLock};
use crate::file_lock;

// 解析缓存：key = canonical path 或 @模块名，value = 解析结果
fn parse_cache() -> &'static Mutex<HashMap<String, BuildValue>> {
    static CACHE: OnceLock<Mutex<HashMap<String, BuildValue>>> = OnceLock::new();
    CACHE.get_or_init(|| Mutex::new(HashMap::new()))
}

/// 构建词条：触发词 → 代码块列表
#[derive(Debug, Clone)]
pub struct BuildDic {
    pub trigger: String,
    pub text: Vec<String>,
    pub line: usize, // 原始文件中的起始行号（从 0 开始）
}

impl Default for BuildDic {
    fn default() -> Self {
        BuildDic {
            trigger: String::new(),
            text: Vec::new(),
            line: 0,
        }
    }
}

/// 构建后的词库数据结构
#[derive(Debug, Clone)]
pub struct BuildValue {
    /// 头部文本（第一个空行前的内容）
    pub head: Vec<String>,
    /// 普通词条
    pub dic: Vec<BuildDic>,
    /// 内部词条 [L] 或 [内部]
    pub local_static: Vec<BuildDic>,
    /// 函数词条 [F] 或 [函数]
    pub local_func: Vec<BuildDic>,
    /// 引入包 var:#引入=file
    pub packages: HashMap<String, BuildValue>,
    /// 文件夹引入时：文件名 → 独立 BuildValue（分包执行 head）
    pub sub_packages: HashMap<String, BuildValue>,
    /// 函数/词条 → 来源文件名（分包执行时用于定位 head）
    pub trigger_source: HashMap<String, String>,
    /// 标准库模块名（如 "画布"），None 表示非标准库包
    pub stdlib_module: Option<String>,
    /// 源码文件路径（调试时用于断点匹配和光标定位）
    pub source_file: String,
}

impl BuildValue {
    pub fn new_empty() -> Self {
        BuildValue {
            head: Vec::new(),
            dic: Vec::new(),
            local_static: Vec::new(),
            local_func: Vec::new(),
            packages: HashMap::new(),
            sub_packages: HashMap::new(),
            trigger_source: HashMap::new(),
            stdlib_module: None,
            source_file: String::new(),
        }
    }
}

/// 解析 .nr 文件为 BuildValue
pub fn build_dic(_dic_path: &str, text: &str) -> Result<BuildValue, String> {
    // 去除 UTF-8 BOM
    let text = text.strip_prefix('\u{feff}').unwrap_or(text);
    let lines: Vec<String> = text.lines().map(|l| l.to_string()).collect();

    let lines_num = lines.len();

    let mut dic_trigger = String::new();
    let mut trigger_line: usize = 0; // dic_trigger 对应的原始行号
    let mut dic_texts: Vec<String> = Vec::new();
    let mut dic_text: Vec<BuildDic> = Vec::new();

    let mut neibu = false;
    let mut func_text: Vec<BuildDic> = Vec::new();
    let mut chajian = false;
    let mut chajian_text: Vec<BuildDic> = Vec::new();

    let mut runhead = true;
    let mut runheadtext: Vec<String> = Vec::new();

    let mut zhushi = false;
    let mut f_run_all = false;
    let mut suojin = false;

    let mut packages: HashMap<String, BuildValue> = HashMap::new();

    // 命名去重（各分类独立）
    let mut seen_dic: std::collections::HashSet<String> = std::collections::HashSet::new();
    let mut seen_static: std::collections::HashSet<String> = std::collections::HashSet::new();
    let mut seen_func: std::collections::HashSet<String> = std::collections::HashSet::new();

    if !lines.is_empty() && !lines[0].is_empty() {
        runhead = true;
    }

    for (dic_i, line_ref) in lines.iter().enumerate() {
        let mut line = line_ref.clone();

        if !line.is_empty() && !suojin {
            line = line.trim_start().to_string();
        }

        // 多行注释
        if zhushi {
            if line.len() >= 2 && line.ends_with("*/") {
                zhushi = false;
            }
            continue;
        }
        if !zhushi && line.len() >= 2 && line.starts_with("/*") {
            zhushi = true;
            continue;
        }

        // 单行注释
        if line.len() > 2 && line.starts_with("//") {
            match line.as_str() {
                "//@关闭缩进" => suojin = true,
                "//@启用缩进" => suojin = false,
                _ => {}
            }
            continue;
        }

        // 头部处理
        if runhead {
            if line.starts_with("#引入*=") || line.contains("#引入=") {
                let is_star = line.starts_with("#引入*=");
                // 格式: var:#引入=path / #引入=path / #引入*=path / #引入=path1,path2...
                let (pkg_name, path) = if is_star {
                    let p = line.strip_prefix("#引入*=").unwrap_or("").trim();
                    (String::new(), p.to_string())
                } else if let Some(colon_pos) = line.find(":#引入=") {
                    let name = line[..colon_pos].trim().to_string();
                    let p = line[colon_pos..].strip_prefix(":#引入=").unwrap_or("").trim();
                    (name, p.to_string())
                } else if line.starts_with("#引入=") {
                    let p = line.strip_prefix("#引入=").unwrap_or("").trim();
                    (String::new(), p.to_string())
                } else {
                    runheadtext.push(line);
                    continue;
                };
                // 批量引入支持：逗号分隔多个路径
                let paths: Vec<&str> = path.split(',')
                    .map(|s| s.trim())
                    .filter(|s| !s.is_empty())
                    .collect();
                // 带变量名时暂不支持批量
                if !pkg_name.is_empty() && paths.len() > 1 {
                    return Err(format!("[错误] {} 第{}行: 带变量名的引入不支持批量（#引入={}）", _dic_path, dic_i + 1, path));
                }
                // 星引入不支持 var:#引入*=path 语法
                if is_star && !pkg_name.is_empty() {
                    return Err(format!("[错误] {} 第{}行: 星引入暂不支持设置别名（#引入*={}）", _dic_path, dic_i + 1, path));
                }

                for single_path in &paths {
                // 检测自己引入自己（路径相对于工作目录）
                // 标准库路径 (@开头) 跳过文件系统检查
                if !crate::functions::is_stdlib_path(single_path) {
                    {
                        let cur = std::path::Path::new(_dic_path);
                        if let Ok(cur_canon) = cur.canonicalize() {
                            let tgt = std::path::Path::new(single_path);
                            if let Ok(tgt_canon) = tgt.canonicalize() {
                                if cur_canon == tgt_canon || (tgt_canon.is_dir() && cur_canon.starts_with(&tgt_canon)) {
                                    let prefix = if is_star { "#引入*" } else { "#引入" };
                                    return Err(format!("[错误] {} 第{}行: 不能引入自己（{}=）", _dic_path, dic_i + 1, prefix));
                                }
                            }
                        }
                    }
                }

                // 检查 @ 路径是否指向 embed 文件夹
                let merged = if crate::functions::is_stdlib_path(single_path) {
                    let module = &single_path[1..]; // 去掉 @
                    if module.is_empty() {
                        return Err(format!("[错误] {} 第{}行: 模块名不能为空（#引入={}）", _dic_path, dic_i + 1, single_path));
                    }
                    let embed_dir = format!("embed/{}", module);
                    let embed_path = std::path::Path::new(&embed_dir);
                    if embed_path.is_dir() {
                        let cache_key = match embed_path.canonicalize() {
                            Ok(p) => p.to_string_lossy().to_string(),
                            Err(_) => embed_dir.clone(),
                        };
                        let mut cache = parse_cache().lock().unwrap();
                        if let Some(cached) = cache.get(&cache_key) {
                            Some(cached.clone())
                        } else {
                            let mut full = merge_dir_package(&embed_dir)?;
                            full.stdlib_module = Some(module.to_string());
                            cache.insert(cache_key, full.clone());
                            Some(full)
                        }
                    } else if crate::functions::StdLib::resolve(module).is_some() {
                        let cache_key = format!("@{}", module);
                        let mut cache = parse_cache().lock().unwrap();
                        if let Some(cached) = cache.get(&cache_key) {
                            Some(cached.clone())
                        } else {
                            let pkg = crate::functions::create_stdlib_package(module);
                            cache.insert(cache_key, pkg.clone());
                            Some(pkg)
                        }
                    } else {
                        return Err(format!("[错误] {} 第{}行: 模块不存在：{}（#引入={}）", _dic_path, dic_i + 1, module, single_path));
                    }
                } else {
                    // 先检测是否为文件夹
                    let dir_path = std::path::Path::new(single_path);
                    if dir_path.is_dir() {
                        // 优先加载 main.nr 作为主文件
                        let main_nr = dir_path.join("main.nr");
                        if main_nr.exists() {
                            let main_nr_str = main_nr.to_string_lossy().to_string();
                            let cache_key = match main_nr.canonicalize() {
                                Ok(p) => p.to_string_lossy().to_string(),
                                Err(_) => main_nr_str.clone(),
                            };
                            {
                                let cache = parse_cache().lock().unwrap();
                                if let Some(cached) = cache.get(&cache_key) {
                                    Some(cached.clone())
                                } else {
                                    drop(cache);
                                    let data = file_lock::with_file_read(&main_nr, || {
                                        fs::read_to_string(&main_nr)
                                            .map_err(|e| format!("[错误] 无法读取文件 '{}': {}", main_nr_str, e))
                                    })?;
                                    let parsed = build_dic(&main_nr_str, &data)?;
                                    let mut cache = parse_cache().lock().unwrap();
                                    cache.insert(cache_key, parsed.clone());
                                    Some(parsed)
                                }
                            }
                        } else {
                            // 无 main.nr，合并目录下所有 .nr 文件（带缓存）
                            let cache_key = match std::path::Path::new(single_path).canonicalize() {
                                Ok(p) => p.to_string_lossy().to_string(),
                                Err(_) => single_path.to_string(),
                            };
                            {
                                 let mut cache = parse_cache().lock().unwrap();
                                 if let Some(cached) = cache.get(&cache_key) {
                                     let mut merged_bv = cached.clone();
                                     merged_bv.head.clear();
                                     Some(merged_bv)
                                 } else {
                                     let full = merge_dir_package(single_path)?;
                                     cache.insert(cache_key, full.clone());
                                     let mut merged_bv = full;
                                     merged_bv.head.clear();
                                     Some(merged_bv)
                                 }
                             }
                        }
                    } else {
                        // 不是文件夹，则必须为 .nr 文件（自动补充 .nr 后缀）
                        let final_path = if single_path.ends_with(".nr") {
                            single_path.to_string()
                        } else {
                            let try_nr = format!("{}.nr", single_path);
                            if std::path::Path::new(&try_nr).exists() {
                                try_nr
                            } else {
                                return Err(format!("[错误] {} 第{}行: 引入文件不存在：{}（#引入={}）", _dic_path, dic_i + 1, try_nr, single_path));
                            }
                        };
                        let cache_key = match std::path::Path::new(&final_path).canonicalize() {
                            Ok(p) => p.to_string_lossy().to_string(),
                            Err(_) => final_path.clone(),
                        };
                        {
                            let mut cache = parse_cache().lock().unwrap();
                            if let Some(cached) = cache.get(&cache_key) {
                                Some(cached.clone())
                            } else {
                                match file_lock::with_file_read(std::path::Path::new(&final_path), || fs::read_to_string(&final_path)) {
                                    Ok(file_data) => {
                                        let parsed = build_dic(&final_path, &file_data)?;
                                        cache.insert(cache_key, parsed.clone());
                                        Some(parsed)
                                    }
                                    Err(_) => None,
                                }
                            }
                        }
                    }
                };
                if let Some(z) = merged {
                    if is_star {
                        // 星引入：合并包内所有函数/词条到当前作用域
                        chajian_text.extend(z.local_func.clone());
                        func_text.extend(z.local_static.clone());
                        dic_text.extend(z.dic.clone());
                        // 同时保留命名空间访问（如 $test.函数$）
                        let auto_name = crate::interpreter::resolve_pkg_key(single_path);
                        if !packages.contains_key(&auto_name) {
                            packages.insert(auto_name, z);
                        }
                    } else {
                        if !pkg_name.is_empty() {
                            let pkg_key = pkg_name.strip_prefix('.').unwrap_or(&pkg_name).to_string();
                            packages.insert(pkg_key, z);
                        } else {
                            let auto_name = crate::interpreter::resolve_pkg_key(single_path);
                            if packages.contains_key(&auto_name) {
                                // 同名包已存在 → 跳过
                            } else {
                                packages.insert(auto_name, z);
                            }
                        }
                    }
                } else {
                    return Err(format!("[错误] {} 第{}行: 引入目标不存在：{}（#引入={}）", _dic_path, dic_i + 1, single_path, single_path));
                }
                } // 单路径 for 循环结束
                runheadtext.push(line);
                continue;
            }

            if line.is_empty() {
                runhead = false;
                continue;
            }
            runheadtext.push(line);
            continue;
        }

        // 正文处理
        if !line.is_empty() || (line.is_empty() && f_run_all) {
            if !dic_trigger.is_empty() {
                if f_run_all {
                    if line == "}#" {
                        f_run_all = false;
                    } else {
                        dic_texts.push(line.clone());
                    }
                } else {
                    dic_texts.push(line.clone());
                }
            } else {
                // 新触发词
                dic_trigger = line.clone();
                trigger_line = dic_i;

                // 检测 [L] / [内部] / [F] / [函数] / [类:xxx] 标记
                if line == "[L]" || line == "[内部]" {
                    neibu = true;
                    dic_trigger.clear();
                } else if line == "[F]" || line == "[f]" || line == "[函数]" {
                    chajian = true;
                    dic_trigger.clear();
                } else if line.starts_with("[L]") && line.len() > 3 {
                    neibu = true;
                    dic_trigger = line[3..].to_string();
                } else if line.starts_with("[f:") || line.starts_with("[F:") {
                    // [f:ClassName]MethodName / [F:ClassName]MethodName → 存为 ClassName.MethodName
                    if let Some(bracket_pos) = line.find(']') {
                        let prefix_len = if line.starts_with("[f:") { "[f:".len() } else { "[F:".len() };
                        let class_name = &line[prefix_len..bracket_pos];
                        let method_name = &line[bracket_pos + 1..];
                        if !class_name.is_empty() && !method_name.is_empty() {
                            chajian = true;
                            dic_trigger = format!("{}.{}", class_name, method_name);
                        }
                    }
                } else if line.starts_with("[F]") && line.len() > 3
                          || line.starts_with("[f]") && line.len() > 3
                {
                    chajian = true;
                    dic_trigger = line[3..].to_string();
                } else if line.starts_with("[内部]") && line.len() > 8 {
                    neibu = true;
                    dic_trigger = line[8..].to_string();
                } else if line.starts_with("[函数:") {
                    // [函数:ClassName]MethodName → 存为 ClassName.MethodName
                    if let Some(bracket_pos) = line.find(']') {
                        let prefix_len = "[函数:".len();
                        let class_name = &line[prefix_len..bracket_pos];
                        let method_name = &line[bracket_pos + 1..];
                        if !class_name.is_empty() && !method_name.is_empty() {
                            neibu = true;
                            dic_trigger = format!("{}.{}", class_name, method_name);
                        }
                    }
                } else if line.starts_with("[L:") {
                    // [L:ClassName]TriggerText → 存为 ClassName.TriggerText（类内部回调）
                    if let Some(bracket_pos) = line.find(']') {
                        let prefix_len = "[L:".len();
                        let class_name = &line[prefix_len..bracket_pos];
                        let trigger = &line[bracket_pos + 1..];
                        if !class_name.is_empty() && !trigger.is_empty() {
                            neibu = true;
                            dic_trigger = format!("{}.{}", class_name, trigger);
                        }
                    }
                } else if line.starts_with("[函数]") && line.len() > 8 {
                    chajian = true;
                    dic_trigger = line[8..].to_string();
                }

                // 函数名合法性校验：禁止特殊字符
                if chajian && !dic_trigger.is_empty() {
                    if !is_valid_func_name(&dic_trigger) {
                        return Err(format!(
                            "[错误] 函数名含非法字符: '{}' (第 {} 行)，仅允许字母、数字、下划线和中文",
                            dic_trigger, dic_i + 1
                        ));
                    }
                    // ... 只能出现在函数名最后
                    if let Some(pos) = dic_trigger.find("...") {
                        if pos + 3 < dic_trigger.len() {
                            return Err(format!(
                                "[错误] 可变参数 '...' 只能出现在函数名末尾 (第 {} 行): {}",
                                dic_i + 1, dic_trigger
                            ));
                        }
                    }
                }

                if dic_trigger.ends_with(" #{") {
                    f_run_all = true;
                    let len = dic_trigger.len();
                    dic_trigger.truncate(len - 3);
                }
            }
        }

        if !dic_trigger.is_empty() {
            if line.is_empty() && f_run_all {
                continue;
            }

            if line.is_empty() || dic_i == lines_num - 1 {
                let trigger_name = dic_trigger.clone();
                let json = BuildDic {
                    trigger: trigger_name.clone(),
                    text: dic_texts.clone(),
                    line: trigger_line,
                };

                // 重复命名检测（各分类独立）
                let seen = if neibu {
                    &mut seen_static
                } else if chajian {
                    &mut seen_func
                } else {
                    &mut seen_dic
                };
                if seen.contains(&trigger_name) {
                    let category = if neibu { "[内部]" } else if chajian { "[函数]" } else { "词条" };
                    return Err(format!("[错误] 命名重复: {} '{}' (第 {} 行)", category, trigger_name, dic_i + 1));
                }
                seen.insert(trigger_name.clone());

                if neibu {
                    neibu = false;
                    func_text.push(json);
                } else if chajian {
                    chajian = false;
                    chajian_text.push(json);
                } else {
                    dic_text.push(json);
                }
                dic_trigger.clear();
                trigger_line = 0;
                dic_texts.clear();
            }
        }
    }

    // 规范化源文件路径为绝对路径（调试时用于断点匹配）
    let source_file = std::path::Path::new(_dic_path)
        .canonicalize()
        .map(|p| {
            let s = p.to_string_lossy().to_string();
            // 去除 Windows \\?\ 前缀
            if cfg!(windows) {
                s.strip_prefix("\\\\?\\").unwrap_or(&s).to_string()
            } else {
                s
            }
        })
        .unwrap_or_else(|_| _dic_path.to_string());

    Ok(BuildValue {
        head: runheadtext,
        dic: dic_text,
        local_static: func_text,
        local_func: chajian_text,
        packages,
        sub_packages: HashMap::new(),
        trigger_source: HashMap::new(),
        stdlib_module: None,
        source_file,
    })
}

/// 校验函数/内部词条名：仅允许字母、数字、下划线、中文
/// 允许 Class.method 格式（OOP 语法）
fn is_valid_func_name(name: &str) -> bool {
    // 先去掉末尾的 ...（可变参数标记）
    let name = name.strip_suffix("...").unwrap_or(name);
    is_valid_name_part(name)
}

fn is_valid_name_part(name: &str) -> bool {
    !name.is_empty() && name.chars().all(|c| {
        c.is_ascii_alphanumeric() || c == '_' || c == '#' || c == ' ' || c == '.' || c == '=' || is_chinese_char(c)
    })
}

fn is_chinese_char(c: char) -> bool {
    matches!(c as u32, 0x4E00..=0x9FFF | 0x3400..=0x4DBF | 0x20000..=0x2A6DF)
}

/// 从文件加载并解析（带缓存）
pub fn parse_file(path: &str) -> Result<BuildValue, String> {
    let cache_key = match std::path::Path::new(path).canonicalize() {
        Ok(p) => p.to_string_lossy().to_string(),
        Err(_) => path.to_string(),
    };
    {
        let cache = parse_cache().lock().unwrap();
        if let Some(cached) = cache.get(&cache_key) {
            return Ok(cached.clone());
        }
    }
    let text = file_lock::with_file_read(std::path::Path::new(path), || {
        fs::read_to_string(path).map_err(|e| format!("读取文件失败: {}", e))
    })?;
    let result = build_dic(path, &text)?;
    {
        let mut cache = parse_cache().lock().unwrap();
        cache.insert(cache_key, result.clone());
    }
    Ok(result)
}

/// 热重载时清除指定路径的缓存（文件或目录）
pub fn invalidate_parse_cache(path: &str) {
    let cache_key = match std::path::Path::new(path).canonicalize() {
        Ok(p) => p.to_string_lossy().to_string(),
        Err(_) => path.to_string(),
    };
    let mut cache = parse_cache().lock().unwrap();
    cache.remove(&cache_key);
}

/// 合并目录下所有 .nr 文件为一个 BuildValue
/// 统一 parser 和 runtime 的目录合并逻辑
pub fn merge_dir_package(dir_path: &str) -> Result<BuildValue, String> {
    let dir = Path::new(dir_path);
    if !dir.is_dir() {
        return Err(format!("[错误] 路径不是目录：{}", dir_path));
    }

    let entries = file_lock::with_file_read(dir, || {
        fs::read_dir(dir)
            .map_err(|e| format!("[错误] 无法读取目录 '{}': {}", dir_path, e))
    })?;

    let mut merged = BuildValue::new_empty();
    let mut seen_dic: std::collections::HashSet<String> = std::collections::HashSet::new();
    let mut seen_static: std::collections::HashSet<String> = std::collections::HashSet::new();
    let mut seen_func: std::collections::HashSet<String> = std::collections::HashSet::new();

    for entry in entries.flatten() {
        let p = entry.path();
        if p.extension().and_then(|e| e.to_str()) != Some("nr") {
            continue;
        }
        let fname = p.file_name().and_then(|n| n.to_str()).unwrap_or("?").to_string();
        let stem = p.file_stem().and_then(|s| s.to_str()).unwrap_or("?").to_string();
        let p_str = p.to_string_lossy().to_string();

        // 带缓存的单文件解析
        let cache_key = match p.canonicalize() {
            Ok(cp) => cp.to_string_lossy().to_string(),
            Err(_) => p_str.clone(),
        };
        let bv = {
            let cache = parse_cache().lock().unwrap();
            if let Some(cached) = cache.get(&cache_key) {
                cached.clone()
            } else {
                drop(cache); // I/O 期间释放锁
                let data = file_lock::with_file_read(&p, || {
                    fs::read_to_string(&p)
                        .map_err(|e| format!("[错误] 无法读取文件 '{}': {}", fname, e))
                })?;
                let parsed = build_dic(&p_str, &data)
                    .map_err(|e| format!("[错误] 文件 '{}' 解析失败: {}", fname, e))?;
                let mut cache = parse_cache().lock().unwrap();
                cache.insert(cache_key, parsed.clone());
                parsed
            }
        };

        // 检测跨文件命名冲突（三类全覆盖）
        for item in &bv.dic {
            if seen_dic.contains(&item.trigger) {
                return Err(format!("[错误] 文件夹引入 '{}' 中词条 '{}' 重复定义", dir_path, item.trigger));
            }
            seen_dic.insert(item.trigger.clone());
            merged.trigger_source.insert(item.trigger.clone(), stem.clone());
        }
        for item in &bv.local_static {
            if seen_static.contains(&item.trigger) {
                return Err(format!("[错误] 文件夹引入 '{}' 中 [内部] '{}' 重复定义 (文件: {})", dir_path, item.trigger, fname));
            }
            seen_static.insert(item.trigger.clone());
            merged.trigger_source.insert(item.trigger.clone(), stem.clone());
        }
        for item in &bv.local_func {
            if seen_func.contains(&item.trigger) {
                return Err(format!("[错误] 文件夹引入 '{}' 中 [函数] '{}' 重复定义 (文件: {})", dir_path, item.trigger, fname));
            }
            seen_func.insert(item.trigger.clone());
            merged.trigger_source.insert(item.trigger.clone(), stem.clone());
        }

        // 合并 head（去重）
        for line in &bv.head {
            if !merged.head.contains(line) {
                merged.head.push(line.clone());
            }
        }

        merged.sub_packages.insert(stem.clone(), bv.clone());
        merged.dic.extend(bv.dic);
        merged.local_static.extend(bv.local_static);
        merged.local_func.extend(bv.local_func);
    }

    Ok(merged)
}
