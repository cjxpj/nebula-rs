use std::collections::HashMap;
use std::fs;
use std::path::Path;

/// 构建词条：触发词 → 代码块列表
#[derive(Debug, Clone)]
pub struct BuildDic {
    pub trigger: String,
    pub text: Vec<String>,
    pub line: usize, // 原始文件中的起始行号 (0-based)
    pub source_file: String, // 来源文件路径（用于错误报告）
}

impl Default for BuildDic {
    fn default() -> Self {
        BuildDic {
            trigger: String::new(),
            text: Vec::new(),
            line: 0,
            source_file: String::new(),
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

    let mut f_header_name = String::new();

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
            if line.len() > 13 && line.starts_with("//@函数头=") {
                f_header_name = line[13..].to_string();
            }
            continue;
        }

        // 头部处理
        if runhead {
            if line.contains("#引入=") {
                // 格式: var:#引入=path  或  #引入=path
                let (pkg_name, path) = if let Some(colon_pos) = line.find(":#引入=") {
                    let name = line[..colon_pos].trim().to_string();
                    let p = line[colon_pos..].strip_prefix(":#引入=").unwrap_or("").trim();
                    (name, p)
                } else if line.starts_with("#引入=") {
                    let p = line.strip_prefix("#引入=").unwrap_or("").trim();
                    (String::new(), p)
                } else {
                    runheadtext.push(line);
                    continue;
                };
                // 检测自己引入自己（路径相对于工作目录）
                // 标准库路径 (@开头) 跳过文件系统检查
                if !crate::functions::is_stdlib_path(path) {
                    {
                        let cur = std::path::Path::new(_dic_path);
                        if let Ok(cur_canon) = cur.canonicalize() {
                            let tgt = std::path::Path::new(path);
                            if let Ok(tgt_canon) = tgt.canonicalize() {
                                if cur_canon == tgt_canon || (tgt_canon.is_dir() && cur_canon.starts_with(&tgt_canon)) {
                                    return Err(format!("[错误] {} 第{}行: 不能引入自己（#引入={}）", _dic_path, dic_i + 1, path));
                                }
                            }
                        }
                    }
                }

                // 标准库引入：@模块名 → 创建标记包
                let merged = if crate::functions::is_stdlib_path(path) {
                    let module = &path[1..]; // 去掉 @
                    if module.is_empty() {
                        return Err(format!("[错误] {} 第{}行: 标准库模块名不能为空（#引入={}）", _dic_path, dic_i + 1, path));
                    }
                    if crate::functions::StdLib::resolve(module).is_none() {
                        return Err(format!("[错误] {} 第{}行: 标准库模块不存在：{}（#引入={}）", _dic_path, dic_i + 1, module, path));
                    }
                    Some(crate::functions::create_stdlib_package(module))
                } else {
                    // 先检测是否为文件夹，是则加载文件夹下所有 .nr 文件
                    let dir_path = std::path::Path::new(path);
                    if dir_path.is_dir() {
                        let mut merged_bv = merge_dir_package(path)?;
                        // 清除合并后的 head（各文件 head 仅通过分包执行）
                        merged_bv.head.clear();
                        Some(merged_bv)
                    } else {
                        // 不是文件夹，则必须为 .nr 文件
                        if !path.ends_with(".nr") {
                            return Err(format!("[错误] {} 第{}行: 引入文件必须为 .nr 后缀：{}（#引入={}）", _dic_path, dic_i + 1, path, path));
                        }
                        match fs::read_to_string(path) {
                            Ok(file_data) => Some(build_dic(_dic_path, &file_data)?),
                            Err(_) => None,
                        }
                    }
                };
                if let Some(z) = merged {
                    let is_stdlib = z.stdlib_module.is_some();
                    if !pkg_name.is_empty() {
                        // var:#引入=path —— 作为面对像包，剥离 . 前缀（.web 存为 web）
                        let pkg_key = pkg_name.strip_prefix('.').unwrap_or(&pkg_name).to_string();
                        packages.insert(pkg_key, z);
                        runheadtext.push(line);
                    } else if is_stdlib {
                        // #引入=@模块名 —— 标准库无变量名时，以模块名作为包名存入 packages
                        let module = z.stdlib_module.as_deref().unwrap_or("unknown");
                        packages.insert(module.to_string(), z);
                        runheadtext.push(line);
                    } else {
                        // #引入=path —— 直接合并（兼容旧语法）
                        runheadtext.push(line);
                        func_text.extend(z.local_static);
                        if !f_header_name.is_empty() {
                            for mut item in z.local_func {
                                item.trigger = format!("{}.{}", f_header_name, item.trigger);
                                chajian_text.push(item);
                            }
                        } else {
                            chajian_text.extend(z.local_func);
                        }
                    }
                } else {
                    return Err(format!("[错误] {} 第{}行: 引入目标不存在：{}（#引入={}）", _dic_path, dic_i + 1, path, path));
                }
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
                    if !f_header_name.is_empty() {
                        dic_trigger = format!("{}{}", f_header_name, &line[3..]);
                    } else {
                        dic_trigger = line[3..].to_string();
                    }
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
                    if !f_header_name.is_empty() {
                        dic_trigger = format!("{}{}", f_header_name, &line[8..]);
                    } else {
                        dic_trigger = line[8..].to_string();
                    }
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
                    source_file: _dic_path.to_string(),
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

    Ok(BuildValue {
        head: runheadtext,
        dic: dic_text,
        local_static: func_text,
        local_func: chajian_text,
        packages,
        sub_packages: HashMap::new(),
        trigger_source: HashMap::new(),
        stdlib_module: None,
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

/// 从文件加载并解析
pub fn parse_file(path: &str) -> Result<BuildValue, String> {
    let text = fs::read_to_string(path).map_err(|e| format!("读取文件失败: {}", e))?;
    build_dic(path, &text)
}

/// 合并目录下所有 .nr 文件为一个 BuildValue
/// 统一 parser 和 runtime 的目录合并逻辑
pub fn merge_dir_package(dir_path: &str) -> Result<BuildValue, String> {
    let dir = Path::new(dir_path);
    if !dir.is_dir() {
        return Err(format!("[错误] 路径不是目录：{}", dir_path));
    }

    let entries = fs::read_dir(dir)
        .map_err(|e| format!("[错误] 无法读取目录 '{}': {}", dir_path, e))?;

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
        let data = fs::read_to_string(&p)
            .map_err(|e| format!("[错误] 无法读取文件 '{}': {}", fname, e))?;
        let p_str = p.to_string_lossy().to_string();
        let bv = build_dic(&p_str, &data)
            .map_err(|e| format!("[错误] 文件 '{}' 解析失败: {}", fname, e))?;

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
