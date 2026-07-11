use std::collections::HashMap;
use std::collections::HashSet;
use std::sync::Arc;
use std::time::SystemTime;
use crate::value::DicVal;
use crate::parser::{BuildDic, BuildValue};
use crate::analyzer::val_text_test;
use crate::iftext::IfText;
use crate::file_lock;
use crate::functions::next_instance_id;

/* ===================== 状态机 ===================== */

/// `find_func_prefix` 返回值：(代码列表, 参数名列表, 默认值列表, 是否可变参数, 文件行偏移)
type FuncPrefixResult = (Vec<String>, Vec<String>, Vec<Option<String>>, bool, usize);
/// `find_trigger` 返回值：(代码列表, 触发名, 捕获名列表, 捕获值列表)
type TriggerResult = (Vec<String>, String, Vec<String>, Vec<String>);

/// 输出累积器
#[derive(Debug, Clone, Default)]
#[allow(dead_code)]
pub struct Output {
    parts: Vec<String>,
}

#[allow(dead_code)]
impl Output {
    pub fn new() -> Self {
        Output { parts: Vec::new() }
    }
    pub fn add(&mut self, s: &str) {
        if !s.is_empty() {
            self.parts.push(s.to_string());
        }
    }
    pub fn add_string(&mut self, s: String) {
        if !s.is_empty() {
            self.parts.push(s);
        }
    }
    pub fn get(&self) -> String {
        self.parts.join("")
    }
    pub fn clear(&mut self) {
        self.parts.clear();
    }
}

/// 系统状态
#[derive(Debug, Clone, Default)]
pub struct SysV {
    pub stop: bool,
    /// 函数执行错误信息（非空时拦截后续执行）
    pub error: Option<String>,
    /// 当前执行上下文的文件行偏移（1-based，函数首行体对应的文件行号，0=主文件）
    pub line_offset: usize,
    /// 当前执行上下文的源文件名
    pub source_file: String,
    /// 来自父作用域的标签映射（用于跨函数 goto）
    /// (index, depth): depth=0 表示标签定义在当前作用域，depth>0 表示来自更外层
    pub external_labels: std::collections::HashMap<String, (isize, usize)>,
    /// 待处理的跨函数 goto 目标 (index, depth)
    pub pending_goto: Option<(isize, usize)>,

    pub if_func: IfFuncState,
    pub for_state: ForState,
    pub for_each: ForEachState,
    pub func_state: FuncState,
    pub set_json: SetJsonState,
    pub set_new_json: SetNewJsonState,
    pub val_text: ValTextState,
    pub val_textr: ValTextrState,
}


impl SysV {
    /// 返回 "文件名 第N行: " 格式的位置信息，未设置文件时返回空字符串
    pub fn file_location(&self) -> String {
        if self.source_file.is_empty() {
            String::new()
        } else {
            format!("{} 第{}行: ", self.source_file, self.line_offset + 1)
        }
    }

    /// 是否有任何活动状态块（文本/JSON/函数/循环/遍历/如果 等）
    #[inline]
    pub fn has_active_blocks(&self) -> bool {
        self.val_textr.success
            || self.val_text.success
            || self.set_new_json.success
            || self.set_json.success
            || self.func_state.success
            || self.for_each.success
            || self.for_state.success
            || self.if_func.success
    }
}

#[derive(Debug, Clone, Default)]
pub struct IfFuncState {
    pub success: bool,
    pub num: usize,
    pub if_num: usize,
    pub if_conds: Vec<String>,
    pub else_lines: Vec<String>,
    pub run_lines: Vec<Vec<String>>,
    pub is_else: bool,
    pub is_if: bool,
    pub jump: bool,
}

#[derive(Debug, Clone, Default)]
pub struct ForState {
    pub success: bool,
    pub num: usize,
    pub run: Option<usize>,
    pub content: Vec<String>,
    pub value_name: String,
    pub is_for: bool,
    pub jump: bool,
}

#[derive(Debug, Clone, Default)]
pub struct ForEachState {
    pub success: bool,
    pub num: usize,
    pub run: Option<serde_json::Value>,
    pub content: Vec<String>,
    pub value_name: String,
    pub is_for: bool,
    pub jump: bool,
}

impl ForEachState {
    pub fn close(&mut self) {
        self.success = false;
        self.num = 0;
        self.run = None;
        self.content.clear();
        self.value_name.clear();
        self.is_for = false;
    }
}

#[derive(Debug, Clone, Default)]
pub struct FuncState {
    pub success: bool,
    pub num: usize,
    pub content: Vec<String>,
    pub value_name: String,
    pub trigger: String,
}

#[derive(Debug, Clone, Default)]
#[allow(dead_code)]
pub struct SetJsonState {
    pub success: bool,
    pub json: serde_json::Value,
    pub value_name: String,
    pub ok_len: bool,
    pub len: usize,
}

#[derive(Debug, Clone, Default)]
pub struct SetNewJsonState {
    pub success: bool,
    pub json: String,
    pub json_type: bool,
    pub len: usize,
    pub value_name: String,
}

#[derive(Debug, Clone, Default)]
pub struct ValTextState {
    pub success: bool,
    pub content: Vec<String>,
    pub value_name: String,
}

#[derive(Debug, Clone, Default)]
pub struct ValTextrState {
    pub success: bool,
    pub content: Vec<String>,
    pub value_name: String,
}

/* ===================== 词库上下文 ===================== */

/// 内置函数签名
pub type BuiltinFn = fn(ctx: &mut DicContext, args: &[String], content: &str) -> Option<String>;

/// 执行期间不可变的数据（通过 Arc 共享，避免循环中深拷贝）
#[derive(Debug, Clone)]
#[allow(dead_code)]
pub struct SharedContext {
    pub trigger: bool,
    pub builtins: Arc<HashMap<String, BuiltinFn>>,
    pub local_static: Vec<BuildDic>,
    pub local_static_map: HashMap<String, usize>,
    pub local_func: Vec<BuildDic>,
    pub local_func_map: HashMap<String, usize>,
    pub packages: HashMap<String, BuildValue>,
    /// 星引入函数→源包名映射（用于隔离执行：调用时注入源包 head 变量）
    pub star_import_funcs: HashMap<String, String>,
    pub triggers: Vec<BuildDic>,
    pub init_lines: Vec<String>,
    /// 包最后加载时间，用于热更新检测
    pub package_mtimes: HashMap<String, SystemTime>,
}

#[derive(Debug, Clone)]
#[allow(dead_code)]
pub struct DicContext {
    pub val: DicVal,
    pub sys: SysV,
    pub output: Output,
    /// 执行期间不可变数据（通过 Arc 共享，避免循环中深拷贝）
    pub shared: Arc<SharedContext>,
    /// 正在加载的目录路径，防止 #引入= 循环递归
    pub reloading_dirs: HashSet<String>,
}

#[derive(Debug, Clone)]
#[allow(dead_code)]
pub struct FuncInfo {
    pub name: String,
    pub params: Vec<(String, String)>, // (参数名, 默认值)
    pub text: Vec<String>,
}

#[allow(dead_code)]
impl DicContext {
    pub fn new() -> Self {
        let shared = SharedContext {
            trigger: true,
            builtins: Arc::new(HashMap::new()),
            local_static: Vec::new(),
            local_static_map: HashMap::new(),
            local_func: Vec::new(),
            local_func_map: HashMap::new(),
            packages: HashMap::new(),
            star_import_funcs: HashMap::new(),
            triggers: Vec::new(),
            init_lines: Vec::new(),
            package_mtimes: HashMap::new(),
        };
        let mut ctx = DicContext {
            val: DicVal::new(),
            sys: SysV::default(),
            output: Output::new(),
            shared: Arc::new(shared),
            reloading_dirs: HashSet::new(),
        };
        crate::functions::register_builtins(&mut ctx);
        ctx
    }

    pub fn load_from_build(&mut self, bv: &BuildValue) {
        // 所有 head 行统一收集到 init_lines，由 exec_init 按顺序执行
        // 只有 #引入= 包引入需要在此立即处理以获取包变量
        // 头部变量仅设为局部，全局变量由 [f]初始化 负责
        let mut loaded_pkgs: std::collections::HashSet<String> = std::collections::HashSet::new();
        let mut star_init_pkgs: Vec<(String, BuildValue, bool)> = Vec::new(); // (pkg_name, pkg_bv, is_star)
        let shared = Arc::make_mut(&mut self.shared);
        for (head_idx, line) in bv.head.iter().enumerate() {
            // #引入 / #引入= / #引入*= / pkg:#引入= 行在解析阶段已处理，不加入初始化队列
            // contains 用 ":#引入" 同时覆盖 ":#引入=" 和 ":#引入*="（* 阻断 = 子串匹配）
            if !line.starts_with("#引入") && !line.contains(":#引入") {
                shared.init_lines.push(line.clone());
            }

            let (v_type, v_prefix, v_suffix) = val_text_test(line);
            if v_type == 6 && !v_prefix.is_empty() && v_suffix.contains("#引入=") && !loaded_pkgs.contains(&v_prefix) {
                let v_suffix_owned = v_suffix.clone();
                let processed = self.val.text(&v_suffix_owned);
                self.val.p.set_string(&v_prefix, processed.clone());

                loaded_pkgs.insert(v_prefix.clone());
                // 包名已剥离 . 前缀
                let pkg_lookup = v_prefix.strip_prefix('.').unwrap_or(&v_prefix);
                if let Some(pkg_bv) = bv.packages.get(pkg_lookup) {
                    // 冲突检测：类名不能和同包函数名相同
                    let mut class_names: std::collections::HashSet<&str> = std::collections::HashSet::new();
                    for item in pkg_bv.local_func.iter().chain(pkg_bv.local_static.iter()) {
                        for suffix in &[".初始化", ".new"] {
                            if let Some(dot_pos) = item.trigger.find(suffix) {
                                if dot_pos > 0 {
                                    let after = &item.trigger[dot_pos + suffix.len()..];
                                    if after.is_empty() || after.starts_with(' ') {
                                        class_names.insert(&item.trigger[..dot_pos]);
                                    }
                                }
                            }
                        }
                    }
                    for class_name in &class_names {
                        let pfx = format!("{} ", class_name);
                        let conflict = pkg_bv.local_func.iter().any(|item|
                            item.trigger == *class_name || item.trigger.starts_with(&pfx)
                        ) || pkg_bv.local_static.iter().any(|item|
                            item.trigger == *class_name || item.trigger.starts_with(&pfx)
                        );
                        if conflict {
                            let file_loc = format!("{} 第{}行: ", self.sys.source_file, head_idx + 1);
                            self.sys.error = Some(format!(
                                "[错误] {}引入包 '{}' 时：类名 '{}' 与包内函数名冲突", file_loc, pkg_lookup, class_name
                            ));
                            self.sys.stop = true;
                        }
                    }
                    if self.sys.stop { continue; }
                    for pkg_line in &pkg_bv.head {
                        let (pv_type, pv_prefix, pv_suffix) = val_text_test(pkg_line);
                        if pv_type == 6 && !pv_prefix.is_empty() {
                            if self.val.p.get(&pv_prefix).is_some() {
                                continue;
                            }
                            let pv_suffix_owned = pv_suffix.clone();
                            let pv_processed = self.val.text(&pv_suffix_owned);
                            let pv_final = if pv_suffix.starts_with('[') && pv_suffix.ends_with(']') {
                                crate::count::run_count_text(&self.val, &pv_processed)
                            } else {
                                pv_processed.clone()
                            };
                            self.val.p.set_string(&pv_prefix, pv_final.clone());
                        }
                    }
                    // 收集有 [f]初始化 的包（改到头部执行）
                    if pkg_bv.local_func.iter().any(|f| f.trigger == "初始化") {
                        star_init_pkgs.push((pkg_lookup.to_string(), pkg_bv.clone(), false));
                    }
                }
            }

            // 星引入 #引入*=path：加载被引入包的 head 变量到当前作用域
            if line.starts_with("#引入*=") {
                let raw_path = line.strip_prefix("#引入*=").unwrap_or("").trim();
                let paths: Vec<&str> = raw_path.split(',')
                    .map(|s| s.trim())
                    .filter(|s| !s.is_empty())
                    .collect();
                for path in &paths {
                    // 推导出 package 在 map 中的 key
                    let pkg_key = if crate::functions::is_stdlib_path(path) {
                        path[1..].to_string() // @module → module
                    } else {
                        let p = std::path::Path::new(path);
                        if path.ends_with(".nr") {
                            p.file_stem().and_then(|s| s.to_str()).unwrap_or(path).to_string()
                        } else {
                            p.file_name().and_then(|s| s.to_str()).unwrap_or(path).to_string()
                        }
                    };
                    if let Some(pkg_bv) = bv.packages.get(&pkg_key) {
                        // 冲突检测：类名不能和同包函数名相同
                        let mut cn_set: std::collections::HashSet<&str> = std::collections::HashSet::new();
                        for item in pkg_bv.local_func.iter().chain(pkg_bv.local_static.iter()) {
                            for suffix in &[".初始化", ".new"] {
                                if let Some(dot_pos) = item.trigger.find(suffix) {
                                    if dot_pos > 0 {
                                        let after = &item.trigger[dot_pos + suffix.len()..];
                                        if after.is_empty() || after.starts_with(' ') {
                                            cn_set.insert(&item.trigger[..dot_pos]);
                                        }
                                    }
                                }
                            }
                        }
                        for class_name in &cn_set {
                            let pfx = format!("{} ", class_name);
                            let conflict = pkg_bv.local_func.iter().any(|item|
                                item.trigger == *class_name || item.trigger.starts_with(&pfx)
                            ) || pkg_bv.local_static.iter().any(|item|
                                item.trigger == *class_name || item.trigger.starts_with(&pfx)
                            );
                            if conflict {
                                let file_loc = format!("{} 第{}行: ", self.sys.source_file, head_idx + 1);
                                self.sys.error = Some(format!(
                                    "[错误] {}星引入包 '{}' 时：类名 '{}' 与包内函数名冲突", file_loc, pkg_key, class_name
                                ));
                                self.sys.stop = true;
                            }
                        }
                        if self.sys.stop { continue; }
                        // 注册星引入函数→源包名映射（用于隔离执行）
                        for func in &pkg_bv.local_func {
                            shared.star_import_funcs.insert(func.trigger.clone(), pkg_key.clone());
                            // 同时注册基础名（去掉参数定义部分）
                            let base_name = func.trigger.split(' ').next().unwrap_or(&func.trigger).to_string();
                            if base_name != func.trigger {
                                shared.star_import_funcs.entry(base_name).or_insert_with(|| pkg_key.clone());
                            }
                        }
                        for static_func in &pkg_bv.local_static {
                            shared.star_import_funcs.insert(static_func.trigger.clone(), pkg_key.clone());
                            let base_name = static_func.trigger.split(' ').next().unwrap_or(&static_func.trigger).to_string();
                            if base_name != static_func.trigger {
                                shared.star_import_funcs.entry(base_name).or_insert_with(|| pkg_key.clone());
                            }
                        }
                        // 加载包 head 变量（不覆盖已有变量，保持隔离性）
                        for pkg_line in &pkg_bv.head {
                            let (pv_type, pv_prefix, pv_suffix) = val_text_test(pkg_line);
                            if pv_type == 6 && !pv_prefix.is_empty() {
                                if self.val.p.get(&pv_prefix).is_some() {
                                    continue;
                                }
                                let pv_suffix_owned = pv_suffix.clone();
                                let pv_processed = self.val.text(&pv_suffix_owned);
                                let pv_final = if pv_suffix.starts_with('[') && pv_suffix.ends_with(']') {
                                    crate::count::run_count_text(&self.val, &pv_processed)
                                } else {
                                    pv_processed.clone()
                                };
                                self.val.p.set_string(&pv_prefix, pv_final.clone());
                            }
                        }
                        // 记录需要执行 [f]初始化 的包（在 shared 借出后执行）
                        if !pkg_bv.local_func.iter().any(|f| f.trigger == "初始化") {
                            // 无初始化，跳过
                        } else {
                            star_init_pkgs.push((pkg_key.clone(), pkg_bv.clone(), true));
                        }
                    }
                }
            }
        }
        shared.local_static = bv.local_static.clone();
        shared.local_static_map = bv.local_static.iter().enumerate()
            .map(|(i, d)| (d.trigger.clone(), i))
            .collect();
        shared.local_func = bv.local_func.clone();
        shared.local_func_map = bv.local_func.iter().enumerate()
            .map(|(i, d)| (d.trigger.clone(), i))
            .collect();
        shared.packages = bv.packages.clone();
        shared.triggers = bv.dic.clone();

        // 扫描并注册标准库包（#引入=@模块名）
        {
            let stdlib_modules: Vec<String> = bv.packages.values()
                .filter_map(|pkg_bv| crate::functions::is_stdlib_package(pkg_bv).map(|m| m.to_string()))
                .collect();
            for module in &stdlib_modules {
                crate::functions::StdLib::register_module(self, module);
            }
        }

        // 执行所有引入包的 [f]初始化 并将其变量归属为 head 变量
        for (pkg_key, pkg_bv, is_star) in &star_init_pkgs {
            for func in &pkg_bv.local_func {
                if func.trigger == "初始化" {
                    let mut sub_ctx = self.fresh_sub_context();
                    let sub_shared = Arc::make_mut(&mut sub_ctx.shared);
                    sub_shared.local_static = pkg_bv.local_static.clone();
                    sub_shared.local_func = pkg_bv.local_func.clone();
                    sub_shared.triggers = pkg_bv.dic.clone();
                    let _ = sub_shared;
                    sub_ctx.rebuild_internal_maps();
                    for line in &pkg_bv.head {
                        let (v_type, v_prefix, v_suffix) = val_text_test(line);
                        if v_type == 6 && !v_prefix.is_empty() {
                            let value = sub_ctx.val.text(&v_suffix);
                            sub_ctx.val.p.set_string(&v_prefix, value.clone());
                        }
                    }
                    sub_ctx.val.p.set_string("self", pkg_key.clone());
                    sub_ctx.val.p.set_string("触发", format!("{}.初始化", pkg_key));
                    entry(&mut sub_ctx, &func.text);
                    // 星引入：裸变量注入（不覆盖已有）；普通引入：pkg.var 格式
                    for (k, v) in sub_ctx.val.p.get_all() {
                        if k == "self" || k == "触发" {
                            continue;
                        }
                        if *is_star {
                            if self.val.p.get(&k).is_some() { continue; }
                            self.val.p.set_val(&k, v.clone());
                        } else {
                            let pkg_keyed = format!("{}.{}", pkg_key, k);
                            self.val.p.set_val(&pkg_keyed, v.clone());
                        }
                    }
                    break; // 每个包只执行一次 [f]初始化
                }
            }
        }

        // 执行包/子包的 [f]初始化（跳过已在头部执行的包）
        let star_init_names: HashSet<String> = star_init_pkgs.iter().map(|(n, _, _)| n.clone()).collect();
        let init_output = self.run_pkg_init(bv, &star_init_names);
        if !init_output.is_empty() {
            self.output.add(&init_output);
        }
    }

    /// 执行包的 [f]初始化（支持文件夹子包）
    fn run_pkg_init(&mut self, bv: &BuildValue, skip_pkgs: &HashSet<String>) -> String {
        let mut out = String::new();
        for (pkg_name, pkg_bv) in &bv.packages {
            // 跳过已在星引入头部执行的包
            if skip_pkgs.contains(pkg_name) {
                continue;
            }
            if !pkg_bv.sub_packages.is_empty() {
                // 文件夹包：遍历子包执行各自的 [f]初始化
                for sub_bv in pkg_bv.sub_packages.values() {
                    for func in &sub_bv.local_func {
                        if func.trigger == "初始化" {
                            let mut sub_ctx = self.fresh_sub_context();
                            let sub_shared = Arc::make_mut(&mut sub_ctx.shared);
                            sub_shared.local_static = sub_bv.local_static.clone();
                            sub_shared.local_func = sub_bv.local_func.clone();
                            sub_shared.triggers = sub_bv.dic.clone();
                            let _ = sub_shared;
                            sub_ctx.rebuild_internal_maps();
                            // 加载子包 head 变量
                            for line in &sub_bv.head {
                                let (v_type, v_prefix, v_suffix) = val_text_test(line);
                                if v_type == 6 && !v_prefix.is_empty() {
                                    let value = sub_ctx.val.text(&v_suffix);
                                    sub_ctx.val.p.set_string(&v_prefix, value.clone());
                                    sub_ctx.val.set_g_string(&v_prefix, value);
                                }
                            }
                            sub_ctx.val.p.set_string("self", pkg_name.clone());
                            sub_ctx.val.p.set_string("触发", format!("{}.初始化", pkg_name));
                            entry(&mut sub_ctx, &func.text);
                            if sub_ctx.sys.stop { self.sys.stop = true; }
                            let init_out = sub_ctx.output.get();
                            if !init_out.is_empty() {
                                if !out.is_empty() { out.push('\n'); }
                                out.push_str(&init_out);
                            }
                            // 回写变量到主上下文（包名.变量名 格式）
                            for (k, v) in sub_ctx.val.p.get_all() {
                                let pkg_key = format!("{}.{}", pkg_name, k);
                                self.val.p.set_val(&pkg_key, v.clone());
                                self.val.set_g_val(&pkg_key, v.clone());
                            }
                        }
                    }
                }
            } else {
                // 单文件包
                for func in &pkg_bv.local_func {
                    if func.trigger == "初始化" {
                        let mut sub_ctx = self.fresh_sub_context();
                        let sub_shared = Arc::make_mut(&mut sub_ctx.shared);
                        sub_shared.local_static = pkg_bv.local_static.clone();
                        sub_shared.local_func = pkg_bv.local_func.clone();
                        sub_shared.triggers = pkg_bv.dic.clone();
                        let _ = sub_shared;
                        sub_ctx.rebuild_internal_maps();
                        for line in &pkg_bv.head {
                            let (v_type, v_prefix, v_suffix) = val_text_test(line);
                            if v_type == 6 && !v_prefix.is_empty() {
                                let value = sub_ctx.val.text(&v_suffix);
                                sub_ctx.val.p.set_string(&v_prefix, value.clone());
                                sub_ctx.val.set_g_string(&v_prefix, value);
                            }
                        }
                        sub_ctx.val.p.set_string("self", pkg_name.clone());
                        sub_ctx.val.p.set_string("触发", format!("{}.初始化", pkg_name));
                        entry(&mut sub_ctx, &func.text);
                        if sub_ctx.sys.stop { self.sys.stop = true; }
                        let init_out = sub_ctx.output.get();
                        if !init_out.is_empty() {
                            if !out.is_empty() { out.push('\n'); }
                            out.push_str(&init_out);
                        }
                        for (k, v) in sub_ctx.val.p.get_all() {
                            let pkg_key = format!("{}.{}", pkg_name, k);
                            self.val.p.set_val(&pkg_key, v.clone());
                            self.val.set_g_val(&pkg_key, v.clone());
                        }
                    }
                }
            }
        }
        out
    }

    /// 查找匹配的内部词条或函数（O(1) HashMap 查找）
    pub fn find_internal(&self, name: &str) -> Option<Vec<String>> {
        // 先查 local_static（[内部]）
        if let Some(&i) = self.shared.local_static_map.get(name) {
            return Some(self.shared.local_static[i].text.clone());
        }
        // 再查 local_func（[函数]）
        if let Some(&i) = self.shared.local_func_map.get(name) {
            return Some(self.shared.local_func[i].text.clone());
        }
        None
    }

    /// 前缀匹配查找函数（支持 "路由" 匹配 "路由 data" 等带参数定义）
    pub fn find_internal_prefix(&self, name: &str) -> Option<Vec<String>> {
        // 先精确匹配
        if let Some(result) = self.find_internal(name) {
            return Some(result);
        }
        // 前缀匹配：name 作为前缀（name 后跟空格）
        let prefix = format!("{} ", name);
        for item in &self.shared.local_func {
            if item.trigger == name || item.trigger.starts_with(&prefix) {
                return Some(item.text.clone());
            }
        }
        for item in &self.shared.local_static {
            if item.trigger == name || item.trigger.starts_with(&prefix) {
                return Some(item.text.clone());
            }
        }
        None
    }

    /// 从 local_static / local_func 向量重建 HashMap 索引
    pub fn rebuild_internal_maps(&mut self) {
        let shared = Arc::make_mut(&mut self.shared);
        shared.local_static_map = shared.local_static.iter().enumerate()
            .map(|(i, d)| (d.trigger.clone(), i))
            .collect();
        shared.local_func_map = shared.local_func.iter().enumerate()
            .map(|(i, d)| (d.trigger.clone(), i))
            .collect();
    }

    /// 解析 %包名.变量% 引入包变量（仅头部变量，不执行代码）
    pub fn resolve_package_vars(&mut self, input: &str) -> String {
        // 快速路径：不含 %. → 肯定不是 %包名.变量% 模式
        if !input.contains("%.") {
            return input.to_string();
        }

        use std::sync::OnceLock;
        static PKG_RE: OnceLock<regex::Regex> = OnceLock::new();
        let re = PKG_RE.get_or_init(|| regex::Regex::new(r"%([^.]+)\.([^%]+)%").unwrap());

        let mut result = input.to_string();
        loop {
            let caps = re.captures(&result);
            if caps.is_none() { break; }
            let caps = caps.unwrap();
            let pkg = caps[1].to_string();
            let key = caps[2].to_string();
            let matched = caps[0].to_string();

            let resolved = if let Some(bv) = self.shared.packages.get(&pkg) {
                let override_key = format!("{}.{}", pkg, key);
                let local_override = self.val.p.get(&override_key)
                    .or_else(|| self.val.get_g(&override_key));
                if let Some(val) = local_override {
                    let s = val.display();
                    if !s.is_empty() && !s.contains('%') {
                        Some(s)
                    } else {
                        None
                    }
                } else {
                    let mut found: Option<String> = None;
                    for line in &bv.head {
                        let (v_type, v_prefix, v_suffix) = val_text_test(line);
                        if v_type == 6 && v_prefix == key {
                            found = Some(self.val.text(&v_suffix));
                            break;
                        }
                    }
                    found
                }
            } else {
                None
            };

            if let Some(val) = resolved {
                result = result.replace(&matched, &val);
            } else {
                break;
            }
        }
        result
    }

    /// 运行时重新加载 #引入= 包（热更新）
    pub fn reload_package(&mut self, pkg_name: &str, path: &str) {
        // 先检测是否为文件夹
        let dir_path = std::path::Path::new(path);
        if dir_path.is_dir() {
            // 优先加载 main.nr 作为主文件
            let main_nr = dir_path.join("main.nr");
            if main_nr.exists() {
                let main_str = main_nr.to_string_lossy().to_string();
                self.reload_package(pkg_name, &main_str);
            } else {
                self.reload_package_dir(pkg_name, path);
            }
            return;
        }

        let mut actual_path = path.to_string();
        if !actual_path.ends_with(".nr") {
            let try_nr = format!("{}.nr", path);
            if std::path::Path::new(&try_nr).exists() {
                actual_path = try_nr;
            } else {
                let file_info = self.sys.file_location();
                self.output.add(&format!("[错误] {}引入文件不存在或不为 .nr 文件：{}（#引入={}）\n", file_info, actual_path, path));
                self.sys.stop = true;
                return;
            }
        }

        // 防递归：若该文件正在加载中，报错
        let canon = std::path::Path::new(&actual_path).canonicalize().unwrap_or_else(|_| std::path::Path::new(&actual_path).to_path_buf());
        let canon_str = canon.to_string_lossy().to_string();
        if !self.reloading_dirs.insert(canon_str.clone()) {
            let file_info = self.sys.file_location();
            self.output.add(&format!("[错误] {}循环引入：{}（#引入={}）\n", file_info, actual_path, path));
            self.sys.stop = true;
            return;
        }

        // 检查文件是否存在
        if !std::path::Path::new(&actual_path).is_file() {
            let file_info = self.sys.file_location();
            self.output.add(&format!("[错误] {}引入目标不存在：{}（#引入={}）\n", file_info, actual_path, path));
            self.sys.stop = true;
            return;
        }

        // 检查文件修改时间，仅在文件变更时重新加载
        let data = file_lock::with_file_read(std::path::Path::new(&actual_path), || {
            if let Ok(metadata) = std::fs::metadata(&actual_path) {
                if let Ok(mtime) = metadata.modified() {
                    let shared = Arc::make_mut(&mut self.shared);
                    if let Some(&last_mtime) = shared.package_mtimes.get(pkg_name) {
                        if mtime <= last_mtime {
                            return None; // 文件未修改，跳过
                        }
                    }
                    shared.package_mtimes.insert(pkg_name.to_string(), mtime);
                }
            }
            std::fs::read_to_string(&actual_path).ok()
        });
        let Some(data) = data else { return; };
        crate::parser::invalidate_parse_cache(&actual_path);
        if let Ok(pkg_bv) = crate::parser::build_dic(&actual_path, &data) {
            // 处理头部赋值行（引入包不执行非赋值 head 行）
            for line in &pkg_bv.head {
                let (pv_type, pv_prefix, pv_suffix) = val_text_test(line);
                if pv_type == 6 && !pv_prefix.is_empty() {
                    let processed = self.val.text(&pv_suffix);
                    let final_val = if pv_suffix.starts_with('[') && pv_suffix.ends_with(']') {
                        crate::count::run_count_text(&self.val, &processed)
                    } else {
                        processed
                    };
                    self.val.p.set_string(&pv_prefix, final_val.clone());
                }
            }
            // 执行包的 [f]初始化 — 用临时 ctx 避免污染当前输出
            for func in &pkg_bv.local_func {
                if func.trigger == "初始化" {
                    let mut tmp_ctx = self.clone();
                    tmp_ctx.output.clear();
                    tmp_ctx.sys.source_file = if func.source_file.is_empty() { actual_path.clone() } else { func.source_file.clone() };
                    tmp_ctx.sys.line_offset = func.line;
                    tmp_ctx.val.p.set_string("触发", format!("{}.初始化", pkg_name));
                    tmp_ctx.val.p.set_string("self", pkg_name.to_string());
                    entry(&mut tmp_ctx, &func.text);
                    if tmp_ctx.sys.stop { self.sys.stop = true; }
                    let init_out = tmp_ctx.output.get();
                    if !init_out.is_empty() {
                        self.output.add(&init_out);
                    }
                }
            }
            // 标准库包：注册函数到 builtins
            if let Some(module) = crate::functions::is_stdlib_package(&pkg_bv) {
                let module = module.to_string();
                crate::functions::StdLib::register_module(self, &module);
            }
            // 清除 stdlib 标记
            let mut pkg_bv = pkg_bv;
            pkg_bv.head.retain(|line| !line.starts_with("@stdlib="));
            // 替换缓存中的包
            let shared = Arc::make_mut(&mut self.shared);
            shared.packages.insert(pkg_name.to_string(), pkg_bv);
        }
    }

    /// 运行时重新加载文件夹类型的 #引入= 包
    fn reload_package_dir(&mut self, pkg_name: &str, dir_path: &str) {
        let dir = std::path::Path::new(dir_path);
        if !dir.is_dir() {
            let file_info = self.sys.file_location();
            self.output.add(&format!("[错误] {}引入目标不存在：{}（#引入={}）\n", file_info, dir_path, dir_path));
            self.sys.stop = true;
            return;
        }
        // 防递归：若该目录正在加载中，报错
        let canon = dir.canonicalize().unwrap_or_else(|_| dir.to_path_buf());
        let canon_str = canon.to_string_lossy().to_string();
        if !self.reloading_dirs.insert(canon_str.clone()) {
            let file_info = self.sys.file_location();
            self.output.add(&format!("[错误] {}循环引入：{}（#引入={}）\n", file_info, dir_path, dir_path));
            self.sys.stop = true;
            return;
        }

        // 先尝试加载同名 .nr 文件（如 web.nr 配套 web/ 目录），执行其 head 和 init
        let nr_file = format!("{}.nr", dir_path);
        if std::path::Path::new(&nr_file).is_file() {
            if let Ok(data) = file_lock::with_file_read(std::path::Path::new(&nr_file), || std::fs::read_to_string(&nr_file)) {
                if let Ok(file_bv) = crate::parser::build_dic(&nr_file, &data) {
                    // 处理头部赋值行（引入包不执行非赋值 head 行）
                    for line in &file_bv.head {
                        let (pv_type, pv_prefix, pv_suffix) = val_text_test(line);
                        if pv_type == 6 && !pv_prefix.is_empty() {
                            let processed = self.val.text(&pv_suffix);
                            let final_val = if pv_suffix.starts_with('[') && pv_suffix.ends_with(']') {
                                crate::count::run_count_text(&self.val, &processed)
                            } else {
                                processed
                            };
                            self.val.p.set_string(&pv_prefix, final_val.clone());
                        }
                    }
                    for func in &file_bv.local_func {
                        if func.trigger == "初始化" {
                            let mut tmp_ctx = self.clone();
                            tmp_ctx.output.clear();
                            tmp_ctx.sys.source_file = nr_file.clone();
                            tmp_ctx.sys.line_offset = func.line;
                            tmp_ctx.val.p.set_string("触发", format!("{}.初始化", pkg_name));
                            tmp_ctx.val.p.set_string("self", pkg_name.to_string());
                            entry(&mut tmp_ctx, &func.text);
                            if tmp_ctx.sys.stop { self.sys.stop = true; }
                            let init_out = tmp_ctx.output.get();
                            if !init_out.is_empty() {
                                self.output.add(&init_out);
                            }
                        }
                    }
                }
            }
        }

        crate::parser::invalidate_parse_cache(dir_path);
        match crate::parser::merge_dir_package(dir_path) {
            Ok(merged_bv) => {
                // 处理头部赋值行（引入包不执行非赋值 head 行）
                for line in &merged_bv.head {
                    let (pv_type, pv_prefix, pv_suffix) = val_text_test(line);
                    if pv_type == 6 && !pv_prefix.is_empty() {
                        let processed = self.val.text(&pv_suffix);
                        let final_val = if pv_suffix.starts_with('[') && pv_suffix.ends_with(']') {
                            crate::count::run_count_text(&self.val, &processed)
                        } else {
                            processed
                        };
                        self.val.p.set_string(&pv_prefix, final_val.clone());
                    }
                }
                // 执行 [f]初始化
                for func in &merged_bv.local_func {
                    if func.trigger == "初始化" {
                        let mut tmp_ctx = self.clone();
                        tmp_ctx.output.clear();
                        tmp_ctx.sys.source_file = if func.source_file.is_empty() { dir_path.to_string() } else { func.source_file.clone() };
                        tmp_ctx.sys.line_offset = func.line;
                        tmp_ctx.val.p.set_string("触发", format!("{}.初始化", pkg_name));
                        tmp_ctx.val.p.set_string("self", pkg_name.to_string());
                        entry(&mut tmp_ctx, &func.text);
                        if tmp_ctx.sys.stop { self.sys.stop = true; }
                        let init_out = tmp_ctx.output.get();
                        if !init_out.is_empty() {
                            self.output.add(&init_out);
                        }
                    }
                }
                // 标准库包：检查并注册函数
                if let Some(module) = crate::functions::is_stdlib_package(&merged_bv) {
                    let module = module.to_string();
                    crate::functions::StdLib::register_module(self, &module);
                }
                // 清除 stdlib 标记
                let mut merged_bv = merged_bv;
                merged_bv.head.retain(|line| !line.starts_with("@stdlib="));
                // 插入包缓存
                let shared = Arc::make_mut(&mut self.shared);
                shared.packages.insert(pkg_name.to_string(), merged_bv);
            }
            Err(e) => {
                let file_info = self.sys.file_location();
                self.output.add(&format!("{} {}\n", file_info, e));
                self.sys.stop = true;
            }
        }
    }

    /// 正则匹配内部词条（用于 $回调$），trigger 为模式，匹配输入
    /// 返回 (代码, 捕获名, 捕获值)
    pub fn find_internal_regex(&self, input: &str) -> Option<(Vec<String>, Vec<String>, Vec<String>)> {
        for item in &self.shared.local_static {
            // 优先用 bracket 捕获匹配
            if let Some((cnames, cvals)) = crate::value::match_bracket_trigger(&item.trigger, input) {
                return Some((item.text.clone(), cnames, cvals));
            }
            // 兼容纯正则：trigger 即正则表达式
            let re = regex::Regex::new(&format!("^({})$", item.trigger)).ok();
            if let Some(re) = re {
                if re.is_match(input) {
                    return Some((item.text.clone(), Vec::new(), Vec::new()));
                }
            }
        }
        None
    }

    /// $包.类 参数$ → OOP 构造函数执行，返回实例 ID（如 a_测试@0）
    fn exec_ctor_create(&mut self, pkg: &str, class: &str, ctor_name: &str,
                        code: &[String], func_line: usize, args: &[String]) -> String
    {
        let mut sub_ctx = self.fresh_sub_context();
        sub_ctx.sys.line_offset = func_line;
        sub_ctx.sys.source_file = self.sys.source_file.clone();

        if let Some(pkg_data) = self.shared.packages.get(pkg) {
            let mut pkg_func = pkg_data.local_func.clone();
            pkg_func.extend(sub_ctx.shared.local_func.clone());
            let mut pkg_static = pkg_data.local_static.clone();
            pkg_static.extend(sub_ctx.shared.local_static.clone());
            {
                let sub_shared = Arc::make_mut(&mut sub_ctx.shared);
                sub_shared.local_func = pkg_func;
                sub_shared.local_static = pkg_static;
                sub_shared.triggers = pkg_data.dic.clone();
            }
            sub_ctx.rebuild_internal_maps();

            for line in &pkg_data.head {
                let (v_type, v_prefix, v_suffix) = val_text_test(line);
                if v_type == 6 && !v_prefix.is_empty() {
                    let value = sub_ctx.val.text(&v_suffix);
                    sub_ctx.val.p.set_string(&v_prefix, value.clone());
                    sub_ctx.val.set_g_string(&v_prefix, value);
                }
            }
            for line in &pkg_data.head {
                let (v_type, v_prefix, _) = val_text_test(line);
                if v_type != 6 || v_prefix.is_empty() {
                    entry(&mut sub_ctx, std::slice::from_ref(line));
                }
            }
        }

        let class_spec = format!("{}.{}", pkg, class);
        sub_ctx.val.p.set_string("self", class_spec.clone());
        sub_ctx.val.p.set_string("触发", ctor_name.to_string());
        sub_ctx.val.p.set_string("参数0", ctor_name.to_string());

        for (i, arg) in args.iter().skip(1).enumerate() {
            let val = self.val.text(arg);
            sub_ctx.val.p.set_string(&format!("参数{}", i + 1), val);
        }

        entry(&mut sub_ctx, code);

        let instance_id = format!("{}@{}", class_spec, next_instance_id());

        for (key, val) in sub_ctx.val.p.obj.iter() {
            if let Some(field) = key.strip_prefix('.') {
                self.val.p.set_string(&format!("{}.{}", instance_id, field), val.display());
            }
        }

        let output = sub_ctx.output.get();
        if !output.is_empty() {
            self.output.add(&crate::analyzer::unescape_newline(&output));
        }

        instance_id
    }

    /// 解析函数参数定义字符串，检测 ... 可变参数标记 和 name=default 默认值
    /// 如 "num=1" → (["num"], [Some("1")], false)
    /// 规则：
    /// - 含 = → 命名参数（如 "num=1"）
    /// - 单个词不含 = → 位置参数默认值（如 "cs"）
    /// - 多个词不含 = → 命名参数（如 "cx cy r"，兼容现有 embed）
    fn parse_param_defs(raw: &str) -> (Vec<String>, Vec<Option<String>>, bool) {
        let raw_params: Vec<String> = raw.split_whitespace().map(|s| s.to_string()).collect();
        let is_variadic = raw_params.last().is_some_and(|p| p.ends_with("..."));
        let mut params = Vec::new();
        let mut defaults = Vec::new();

        // 检查是否有任何参数含有 =（显式命名参数定义）
        let has_any_named = raw_params.iter().any(|p| {
            let core = if is_variadic && p == raw_params.last().unwrap() && p.len() > 3 {
                &p[..p.len() - 3]
            } else {
                p.as_str()
            };
            core.contains('=')
        });

        // 有效参数数量（不含空的 ...）
        let effective_count = raw_params.iter().filter(|p| {
            !(is_variadic && *p == raw_params.last().unwrap() && p.len() <= 3)
        }).count();

        if has_any_named {
            // 有 =：按命名参数解析（原有逻辑）
            for p in &raw_params {
                let mut p = p.clone();
                if is_variadic && p == *raw_params.last().unwrap() {
                    if p.len() > 3 {
                        p.truncate(p.len() - 3);
                    } else {
                        continue;
                    }
                }
                if let Some(eq_pos) = p.find('=') {
                    let name = p[..eq_pos].to_string();
                    let default = p[eq_pos + 1..].to_string();
                    params.push(name);
                    defaults.push(Some(default));
                } else {
                    params.push(p);
                    defaults.push(None);
                }
            }
        } else if effective_count == 1
            || raw_params.iter().any(|p| {
                let c = p.chars().next().unwrap_or('_');
                c.is_ascii_digit()
            })
        {
            // 单个词 或 含数字开头 → 位置参数默认值，不作为命名参数
            for p in &raw_params {
                let mut p = p.clone();
                if is_variadic && p == *raw_params.last().unwrap() {
                    if p.len() > 3 {
                        p.truncate(p.len() - 3);
                    } else {
                        continue;
                    }
                }
                defaults.push(Some(p));
            }
        } else {
            // 多个词无 =：按命名参数解析（兼容现有 embed 文件如 "cx cy r"）
            for p in &raw_params {
                let mut p = p.clone();
                if is_variadic && p == *raw_params.last().unwrap() {
                    if p.len() > 3 {
                        p.truncate(p.len() - 3);
                    } else {
                        continue;
                    }
                }
                params.push(p);
                defaults.push(None);
            }
        }

        (params, defaults, is_variadic)
    }

    /// 按空格前缀匹配 [f] 函数：trigger 首段=函数名，后续段=参数名
    /// 返回 (代码, 参数名列表, 默认值列表, 是否可变参数)
    /// 如 trigger="add num=1"，查找 "add" → 返回 (code, ["num"], [Some("1")], false)
    pub fn find_func_prefix(&self, func_name: &str) -> Option<FuncPrefixResult> {
        let prefix = format!("{} ", func_name);
        for item in &self.shared.local_func {
            if item.trigger == func_name {
                // line_offset = BuildDic.line + 1 (1-based file line of first body line)
                return Some((item.text.clone(), Vec::new(), Vec::new(), false, item.line + 1));
            }
            if item.trigger.starts_with(&prefix) {
                let (param_names, defaults, is_variadic) = Self::parse_param_defs(&item.trigger[prefix.len()..]);
                return Some((item.text.clone(), param_names, defaults, is_variadic, item.line + 1));
            }
        }
        None
    }

    /// 查找匹配的触发词（包括普通词条），返回 (代码, 触发名, 捕获名, 捕获值)
    pub fn find_trigger(&self, trigger: &str) -> Option<TriggerResult> {
        for item in &self.shared.local_func {
            if let Some((cnames, cvals)) = crate::value::match_bracket_trigger(&item.trigger, trigger) {
                return Some((item.text.clone(), item.trigger.clone(), cnames, cvals));
            }
        }
        None
    }

    /// 查找主词条（普通触发词），返回 (代码, 捕获名, 捕获值)
    pub fn find_main_trigger(&self, trigger: &str) -> Option<(Vec<String>, Vec<String>, Vec<String>)> {
        for item in &self.shared.triggers {
            if let Some((cnames, cvals)) = crate::value::match_bracket_trigger(&item.trigger, trigger) {
                return Some((item.text.clone(), cnames, cvals));
            }
        }
        None
    }

    /// 预处理 %func@arg% 语法：将 %函数名@参数变量% 替换为函数调用结果
    fn expand_func_at(&mut self, text: &str) -> String {
        if !text.contains('@') {
            return text.to_string();
        }
        // 已知的特殊 @ 前缀，不在 expand_func_at 中处理
        const KNOWN_AT_PREFIXES: &[&str] = &["TYPE@", "B64@", "len@", "长度@", "URL编码@", "func@"];

        let mut result = String::with_capacity(text.len());
        let mut rest = text;

        loop {
            match rest.find('%') {
                None => { result.push_str(rest); break; }
                Some(pct) => {
                    result.push_str(&rest[..pct]);
                    rest = &rest[pct + 1..];

                    match rest.find('%') {
                        None => { result.push('%'); result.push_str(rest); break; }
                        Some(close) => {
                            let inner = &rest[..close];
                            rest = &rest[close + 1..];

                            if inner.is_empty() || !inner.contains('@') {
                                result.push('%');
                                result.push_str(inner);
                                result.push('%');
                                continue;
                            }
                            // 跳过已知前缀和以 @ 开头的 JSON 路径
                            if KNOWN_AT_PREFIXES.iter().any(|p| inner.starts_with(p))
                                || inner.starts_with('@')
                            {
                                result.push('%');
                                result.push_str(inner);
                                result.push('%');
                                continue;
                            }
                            // 分割 func@arg：取第一个 @ 之前为函数名，之后为参数变量名
                            if let Some(at_pos) = inner.find('@') {
                                let func_name = &inner[..at_pos];
                                let arg_key = &inner[at_pos + 1..];
                                // 解析参数变量的值
                                let arg_val = self.val.text(&format!("%{}%", arg_key));
                                // 调用函数（通过 $func arg$ 语法）
                                let call_result = self.run_internal_text(
                                    &format!("${} {}$", func_name, arg_val)
                                );
                                result.push_str(&call_result);
                            } else {
                                result.push('%');
                                result.push_str(inner);
                                result.push('%');
                            }
                        }
                    }
                }
            }
        }

        result
    }

    /// 处理文本中的 $内部词条名 参数...$ 回调
    /// 返回替换后的文本
    pub fn run_internal_text(&mut self, text: &str) -> String {
        // 快速路径：不含 $ 直接做变量替换（含 %func@arg% 展开）
        if !text.contains('$') {
            let expanded = self.expand_func_at(text);
            // 若含 \x01 标记（:: 原始值），跳过 val.text() 的二次 %var% 展开
            if expanded.contains('\x01') {
                return expanded;
            }
            return self.val.text(&expanded);
        }

        let mut result = String::new();
        let mut start = 0;

        while let Some(open_index) = crate::analyzer::find_unescaped(text, "$", start) {
            // 查找配对的 $
            let close_index = match crate::analyzer::find_unescaped(text, "$", open_index + 1) {
                Some(i) => i,
                None => break,
            };

            // 外部文本：先展开 %func@arg%，再变量替换
            let outside = &text[start..open_index];
            if !outside.is_empty() {
                let expanded = self.expand_func_at(outside);
                if expanded.contains('\x01') {
                    result.push_str(&expanded);
                } else {
                    result.push_str(&self.val.text(&expanded));
                }
            }

            // 内部文本：$函数名 参数...$
            let content = &text[open_index + 1..close_index];
            let args = crate::analyzer::split_with_escape(content);
            let func_name_raw = if args.is_empty() { "" } else { &args[0] };
            // %var% → 解析为实际函数名；$.method → 解析 self 变量获取当前类名，转为 ClassName.method
            let func_name_resolved: std::borrow::Cow<str>;
            let func_name: &str = if func_name_raw.len() > 2 && func_name_raw.starts_with('%') && func_name_raw.ends_with('%') {
                func_name_resolved = std::borrow::Cow::Owned(self.val.text(func_name_raw));
                &func_name_resolved
            } else if !func_name_raw.is_empty() && func_name_raw.starts_with('.') && func_name_raw.len() > 1 {
                let self_class = self.val.p.get_cloned("self");
                if !self_class.is_empty() {
                    // 如果 self 含包名前缀（如 "web.Counter"），只取纯类名
                    let pure_class = self_class.rfind('.').map(|p| &self_class[p+1..]).unwrap_or(&self_class);
                    let pure_class = pure_class.rfind('@').map(|p| &pure_class[..p]).unwrap_or(pure_class);
                    func_name_resolved = std::borrow::Cow::Owned(format!("{}{}", pure_class, func_name_raw));
                    &func_name_resolved
                } else {
                    func_name_raw
                }
            } else {
                func_name_raw
            };
            if func_name.is_empty() {
                // 空的 $$ → 保持
                result.push_str("$$");
            } else if let Some(&builtin_fn) = self.shared.builtins.get(func_name) {
                if let Some(output) = builtin_fn(self, &args, content) {
                    result.push_str(&output);
                }
            } else if func_name.contains('.') {
                // 面向对象调用（含 . ）—— 全新变量上下文，不互通
                if let Some(dot_pos) = func_name.find('.') {
                    let raw_obj = &func_name[..dot_pos];
                    let method = &func_name[dot_pos + 1..];
                    if !raw_obj.is_empty() && !method.is_empty() {
                        // 包.类 → 检测构造函数（初始化/new），有则创建实例
                        let ctor_info = self.shared.packages.get(raw_obj).and_then(|pkg| {
                            for ctor_suffix in &[".初始化", ".new"] {
                                let ctor_name = format!("{}{}", method, ctor_suffix);
                                for item in &pkg.local_func {
                                    if item.trigger == ctor_name {
                                        return Some((item.text.clone(), ctor_name, item.line + 1));
                                    }
                                }
                                for item in &pkg.local_static {
                                    if item.trigger == ctor_name {
                                        return Some((item.text.clone(), ctor_name, item.line + 1));
                                    }
                                }
                            }
                            None
                        });
                        if let Some((code, ctor_name, func_line)) = ctor_info {
                            // 冲突检测：类名不能和同包函数名相同
                            if let Some(pkg) = self.shared.packages.get(raw_obj) {
                                let pfx = format!("{} ", method);
                                let conflict = pkg.local_func.iter().any(|item|
                                    item.trigger == method || item.trigger.starts_with(&pfx)
                                ) || pkg.local_static.iter().any(|item|
                                    item.trigger == method || item.trigger.starts_with(&pfx)
                                );
                                if conflict {
                                    let file_info = self.sys.file_location();
                                    self.sys.error = Some(format!(
                                        "[错误] {}类名 '{}' 与包 '{}' 中的函数名冲突", file_info, method, raw_obj
                                    ));
                                    self.sys.stop = true;
                                    return result;
                                }
                            }
                            let instance_id = self.exec_ctor_create(
                                raw_obj, method, &ctor_name, &code, func_line, &args
                            );
                            result.push_str(&instance_id);
                            start = close_index + 1;
                            continue;
                        }

                        // 检查是否为引入包
                        let pkg_code = self.shared.packages.get(raw_obj).and_then(|pkg| {
                            let prefix = format!("{} ", method);
                            for item in &pkg.local_func {
                                if item.trigger == method || item.trigger.starts_with(&prefix) {
                                    let (param_names, defaults, is_variadic) = if item.trigger.len() > method.len() + 1 {
                                        Self::parse_param_defs(&item.trigger[method.len() + 1..])
                                    } else {
                                        (Vec::new(), Vec::new(), false)
                                    };
                                    return Some((item.text.clone(), format!("{}.{}", raw_obj, method), item.trigger.clone(), param_names, defaults, is_variadic, item.line + 1));
                                }
                            }
                            for item in &pkg.local_static {
                                if item.trigger == method || item.trigger.starts_with(&prefix) {
                                    let (param_names, defaults, is_variadic) = if item.trigger.len() > method.len() + 1 {
                                        Self::parse_param_defs(&item.trigger[method.len() + 1..])
                                    } else {
                                        (Vec::new(), Vec::new(), false)
                                    };
                                    return Some((item.text.clone(), format!("{}.{}", raw_obj, method), item.trigger.clone(), param_names, defaults, is_variadic, item.line + 1));
                                }
                            }
                            None
                        });
                        if let Some((code, qualified, matched_trigger, param_names, defaults, is_variadic, func_line)) = pkg_code {
                            let mut sub_ctx = self.fresh_sub_context();
                            sub_ctx.sys.line_offset = func_line;
                            sub_ctx.sys.source_file = self.sys.source_file.clone();
                            // 将包的本地词条和头部变量前置，使包内 $回调$/%var% 优先匹配包内内容
                            if let Some(pkg) = self.shared.packages.get(raw_obj) {
                                let mut pkg_static = pkg.local_static.clone();
                                pkg_static.extend(sub_ctx.shared.local_static.clone());
                                {
                                    let sub_shared = Arc::make_mut(&mut sub_ctx.shared);
                                    sub_shared.local_static = pkg_static;
                                }
                                let mut pkg_func = pkg.local_func.clone();
                                pkg_func.extend(sub_ctx.shared.local_func.clone());
                                {
                                    let sub_shared = Arc::make_mut(&mut sub_ctx.shared);
                                    sub_shared.local_func = pkg_func;
                                }
                                sub_ctx.rebuild_internal_maps();
                                // 包的 triggers 也注入，支持包内 $主回调$
                                Arc::make_mut(&mut sub_ctx.shared).triggers = pkg.dic.clone();
                                // 分包处理：找到函数来源文件，执行该文件 head
                                let source_file = pkg.trigger_source.get(&matched_trigger)
                                    .cloned()
                                    .unwrap_or_default();
                                if let Some(sub_pkg) = pkg.sub_packages.get(&source_file) {
                                    // 先处理变量
                                    for line in &sub_pkg.head {
                                        let (v_type, v_prefix, v_suffix) = val_text_test(line);
                                        if v_type == 6 && !v_prefix.is_empty() {
                                            let override_key = format!("{}.{}", raw_obj, v_prefix);
                                            let value = if let Some(ov) = self.val.p.get(&override_key) {
                                                let ov_str = ov.display();
                                                if !ov_str.is_empty() && !ov_str.contains('%') { ov_str }
                                                else { sub_ctx.val.text(&v_suffix) }
                                            } else if let Some(ov) = self.val.get_g(&override_key) {
                                                let ov_str = ov.display();
                                                if !ov_str.is_empty() && !ov_str.contains('%') { ov_str }
                                                else { sub_ctx.val.text(&v_suffix) }
                                            } else {
                                                sub_ctx.val.text(&v_suffix)
                                            };
                                            sub_ctx.val.p.set_string(&v_prefix, value.clone());
                                            sub_ctx.val.set_g_string(&v_prefix, value);
                                        }
                                    }
                                    // 再执行非变量 head 行
                                    for line in &sub_pkg.head {
                                        let (v_type, v_prefix, _) = val_text_test(line);
                                        if v_type != 6 || v_prefix.is_empty() {
                                            entry(&mut sub_ctx, std::slice::from_ref(line));
                                        }
                                    }
                                } else {
                                    // 单文件包（无 sub_packages）：直接使用包自身 head
                                    for line in &pkg.head {
                                        let (v_type, v_prefix, v_suffix) = val_text_test(line);
                                        if v_type == 6 && !v_prefix.is_empty() {
                                            let override_key = format!("{}.{}", raw_obj, v_prefix);
                                            let value = if let Some(ov) = self.val.p.get(&override_key) {
                                                let ov_str = ov.display();
                                                if !ov_str.is_empty() && !ov_str.contains('%') { ov_str }
                                                else { sub_ctx.val.text(&v_suffix) }
                                            } else if let Some(ov) = self.val.get_g(&override_key) {
                                                let ov_str = ov.display();
                                                if !ov_str.is_empty() && !ov_str.contains('%') { ov_str }
                                                else { sub_ctx.val.text(&v_suffix) }
                                            } else {
                                                sub_ctx.val.text(&v_suffix)
                                            };
                                            sub_ctx.val.p.set_string(&v_prefix, value.clone());
                                            sub_ctx.val.set_g_string(&v_prefix, value);
                                        }
                                    }
                                    // 再执行非变量 head 行
                                    for line in &pkg.head {
                                        let (v_type, v_prefix, _) = val_text_test(line);
                                        if v_type != 6 || v_prefix.is_empty() {
                                            entry(&mut sub_ctx, std::slice::from_ref(line));
                                        }
                                    }
                                }
                            }
                            sub_ctx.val.p.set_string("self", raw_obj.to_string());
                            sub_ctx.val.p.set_string("触发", qualified.clone());
                            sub_ctx.val.p.set_string("参数0", qualified.clone());
                            let has_named_params = !param_names.is_empty();
                            let arg_count = args.len().saturating_sub(1);
                            let required_count = defaults.iter().filter(|d| d.is_none()).count();
                            let valid = if is_variadic {
                                arg_count >= required_count
                            } else if has_named_params {
                                arg_count >= required_count && arg_count <= param_names.len()
                            } else {
                                true
                            };
                            if !valid {
                                let label = if is_variadic { "至少需要" } else { "需要" };
                                self.sys.error = Some(format!(
                                    "[错误] 函数 '{}' {} {} 个参数，但传入了 {} 个",
                                    qualified, label, required_count, arg_count
                                ));
                                return result;
                            } else {
                                let var_base = if is_variadic { param_names.last().cloned() } else { None };
                                let mut all_vals: Vec<String> = Vec::new();
                                // 注入命名参数（用传入值或默认值）
                                for i in 0..param_names.len() {
                                    let val = if i < arg_count {
                                        self.val.text(&args[i + 1])
                                    } else if let Some(ref d) = defaults[i] {
                                        self.val.p.resolve_default(d, has_named_params)
                                    } else {
                                        String::new()
                                    };
                                    all_vals.push(val.clone());
                                    sub_ctx.val.p.set_string(&param_names[i], val.clone());
                                    let param_name = format!("参数{}", i + 1);
                                    sub_ctx.val.p.set_string(&param_name, val.clone());
                                    if let Some(ref base) = var_base {
                                        sub_ctx.val.p.set_string(&format!("{}{}", base, i + 1), val);
                                    }
                                }
                                // 可变参数多余传入值
                                for i in param_names.len()..arg_count {
                                    let val = self.val.text(&args[i + 1]);
                                    all_vals.push(val.clone());
                                    let param_name = format!("参数{}", i + 1);
                                    sub_ctx.val.p.set_string(&param_name, val.clone());
                                    if let Some(ref base) = var_base {
                                        sub_ctx.val.p.set_string(&format!("{}{}", base, i + 1), val);
                                    }
                                }
                                // 填充位置参数默认值到 %参数N%（param_names 为空时 defaults 仍有值）
                                for i in arg_count.max(param_names.len())..defaults.len() {
                                    if let Some(ref d) = defaults[i] {
                                        let val = self.val.p.resolve_default(d, has_named_params);
                                        all_vals.push(val.clone());
                                        let param_name = format!("参数{}", i + 1);
                                        sub_ctx.val.p.set_string(&param_name, val);
                                    }
                                }
                                if let Some(ref base) = var_base {
                                    let json_arr = serde_json::to_string(&all_vals).unwrap_or_default();
                                    sub_ctx.val.p.set_string(base, json_arr);
                                }
                                // 实例变量加载：从父上下文复制对象字段到子上下文
                                // 1. 从解析后的参数值加载（如 Counter@0.count）
                                for arg_val in &all_vals {
                                    let obj_prefix = format!("{}.", arg_val);
                                    for (key, val) in self.val.p.obj.iter() {
                                        if let Some(field) = key.strip_prefix(&obj_prefix) {
                                            let dot_key = format!(".{}", field);
                                            if !sub_ctx.val.p.obj.contains_key(&dot_key) {
                                                sub_ctx.val.p.set_string(&dot_key, val.display());
                                            }
                                            sub_ctx.val.p.set_string(key, val.display());
                                        }
                                    }
                                }
                                // 2. 从原始参数 %var% 提取变量名加载（如 a.count）
                                for raw_arg in args.iter().skip(1) {
                                    if raw_arg.starts_with('%') && raw_arg.ends_with('%') && raw_arg.len() > 2 {
                                        let var_name = &raw_arg[1..raw_arg.len()-1];
                                        let obj_prefix = format!("{}.", var_name);
                                        for (key, val) in self.val.p.obj.iter() {
                                            if let Some(field) = key.strip_prefix(&obj_prefix) {
                                                let dot_key = format!(".{}", field);
                                                if !sub_ctx.val.p.obj.contains_key(&dot_key) {
                                                    sub_ctx.val.p.set_string(&dot_key, val.display());
                                                }
                                                sub_ctx.val.p.set_string(key, val.display());
                                            }
                                        }
                                    }
                                }
                                entry(&mut sub_ctx, &code);
                                // 实例变量持久化：将子上下文中属于传入对象的字段回写到父上下文
                                for arg_val in &all_vals {
                                    let obj_prefix = format!("{}.", arg_val);
                                    for (key, val) in sub_ctx.val.p.obj.iter() {
                                        if key.starts_with(&obj_prefix) {
                                            self.val.p.set_string(key, val.display());
                                        }
                                    }
                                }
                                for raw_arg in args.iter().skip(1) {
                                    if raw_arg.starts_with('%') && raw_arg.ends_with('%') && raw_arg.len() > 2 {
                                        let var_name = &raw_arg[1..raw_arg.len()-1];
                                        let obj_prefix = format!("{}.", var_name);
                                        for (key, val) in sub_ctx.val.p.obj.iter() {
                                            if key.starts_with(&obj_prefix) {
                                                self.val.p.set_string(key, val.display());
                                            }
                                        }
                                    }
                                }
                                result.push_str(&sub_ctx.output.get());
                            }
                        } else if let Some(pkg) = self.shared.packages.get(raw_obj) {
                            // method 是 builtin → 在包上下文里调用
                            // 若 method 不在 builtins 中，尝试 stdlib 包的 "{module}.{method}" 格式
                            let builtin_key = if self.shared.builtins.contains_key(method) {
                                std::borrow::Cow::Borrowed(method)
                            } else if let Some(module) = pkg.stdlib_module.as_deref() {
                                std::borrow::Cow::Owned(format!("{}.{}", module, method))
                            } else {
                                std::borrow::Cow::Borrowed(method)
                            };
                            if let Some(&builtin_fn) = self.shared.builtins.get(builtin_key.as_ref()) {
                                let mut sub_ctx = self.fresh_sub_context();
                                let mut pkg_static = pkg.local_static.clone();
                                pkg_static.extend(sub_ctx.shared.local_static.clone());
                                {
                                    let sub_shared = Arc::make_mut(&mut sub_ctx.shared);
                                    sub_shared.local_static = pkg_static;
                                }
                                let mut pkg_func = pkg.local_func.clone();
                                pkg_func.extend(sub_ctx.shared.local_func.clone());
                                {
                                    let sub_shared = Arc::make_mut(&mut sub_ctx.shared);
                                    sub_shared.local_func = pkg_func;
                                }
                                sub_ctx.rebuild_internal_maps();
                                Arc::make_mut(&mut sub_ctx.shared).triggers = pkg.dic.clone();
                                for line in &pkg.head {
                                    let (v_type, v_prefix, v_suffix) = val_text_test(line);
                                    if v_type == 6 && !v_prefix.is_empty() {
                                        let override_key = format!("{}.{}", raw_obj, v_prefix);
                                        let value = if let Some(ov) = self.val.p.get(&override_key) {
                                            let ov_str = ov.display();
                                            if !ov_str.is_empty() && !ov_str.contains('%') { ov_str }
                                            else { sub_ctx.val.text(&v_suffix) }
                                        } else if let Some(ov) = self.val.get_g(&override_key) {
                                            let ov_str = ov.display();
                                            if !ov_str.is_empty() && !ov_str.contains('%') { ov_str }
                                            else { sub_ctx.val.text(&v_suffix) }
                                        } else {
                                            sub_ctx.val.text(&v_suffix)
                                        };
                                        sub_ctx.val.p.set_string(&v_prefix, value.clone());
                                        sub_ctx.val.set_g_string(&v_prefix, value);
                                    }
                                }
                                sub_ctx.val.p.set_string("self", raw_obj.to_string());
                                let qualified = format!("{}.{}", raw_obj, method);
                                sub_ctx.val.p.set_string("触发", qualified.clone());
                                sub_ctx.val.p.set_string("参数0", qualified);
                                // 重建 content 和 args（以子上下文视角）
                                let sub_content = format!("{} {}", method, args.iter().skip(1).map(|s| s.as_str()).collect::<Vec<_>>().join(" "));
                                let sub_args = crate::analyzer::split_with_escape(&sub_content);
                                if let Some(output) = builtin_fn(&mut sub_ctx, &sub_args, &sub_content) {
                                    result.push_str(&output);
                                }
                            } else {
                                // 包存在但方法和内置函数都不存在 → 报错
                                let file_info = self.sys.file_location();
                                let err_msg = format!("[错误] {}包 '{}' 没有方法或函数 '{}'\n", file_info, raw_obj, method);
                                self.output.add(&err_msg);
                                self.sys.stop = true;
                                return result;
                            }
                        } else {
                            // 非包 OOP：解析对象名，查找本地函数
                            let resolved_obj = self.val.text(&format!("%{}%", raw_obj));
                            let pure_class = resolved_obj.rfind('@').map(|p| &resolved_obj[..p]).unwrap_or(&resolved_obj);
                            // 分离包名和类名（如 "a.测试" → pkg="a", class="测试"）
                            let (oop_pkg, oop_class) = if let Some(dot_pos) = pure_class.rfind('.') {
                                (Some(&pure_class[..dot_pos]), &pure_class[dot_pos+1..])
                            } else {
                                (None, pure_class)
                            };
                            let qualified = if resolved_obj.contains('%') {
                                format!("{}.{}", raw_obj, method)
                            } else {
                                format!("{}.{}", oop_class, method)
                            };
                            let mut param_names: Vec<String> = Vec::new();
                            let mut param_defaults: Vec<Option<String>> = Vec::new();
                            let found: Option<(Vec<String>, Vec<String>, Vec<String>)> = self.find_internal(&qualified)
                                .map(|code| (code, Vec::new(), Vec::new()))
                                .or_else(|| self.find_internal_regex(&qualified))
                                .or_else(|| {
                                    // [函数:ClassName]Method 存在 local_static，trigger 包含参数定义
                                    // find_internal 用 HashMap 精确匹配找不到，需要前缀匹配
                                    let prefix = format!("{} ", qualified);
                                    for item in &self.shared.local_static {
                                        if item.trigger == qualified {
                                            return Some((item.text.clone(), Vec::new(), Vec::new()));
                                        }
                                        if item.trigger.starts_with(&prefix) {
                                            let (names, defs, _variadic) = Self::parse_param_defs(&item.trigger[prefix.len()..]);
                                            param_names = names;
                                            param_defaults = defs;
                                            return Some((item.text.clone(), Vec::new(), Vec::new()));
                                        }
                                    }
                                    None
                                })
                                .or_else(|| {
                                    // 实例来自包（如 "a.测试@0"），在包中搜索 "{类}.{方法}"
                                    if let Some(pkg_name) = oop_pkg {
                                        if let Some(pkg) = self.shared.packages.get(pkg_name) {
                                            let class_method = format!("{}.{}", oop_class, method);
                                            let cfn_prefix = format!("{} ", class_method);
                                            for item in &pkg.local_func {
                                                if item.trigger == class_method {
                                                    return Some((item.text.clone(), Vec::new(), Vec::new()));
                                                }
                                                if item.trigger.starts_with(&cfn_prefix) {
                                                    let (names, defs, _variadic) = Self::parse_param_defs(&item.trigger[cfn_prefix.len()..]);
                                                    param_names = names;
                                                    param_defaults = defs;
                                                    return Some((item.text.clone(), Vec::new(), Vec::new()));
                                                }
                                            }
                                            for item in &pkg.local_static {
                                                if item.trigger == class_method {
                                                    return Some((item.text.clone(), Vec::new(), Vec::new()));
                                                }
                                                if item.trigger.starts_with(&cfn_prefix) {
                                                    let (names, defs, _variadic) = Self::parse_param_defs(&item.trigger[cfn_prefix.len()..]);
                                                    param_names = names;
                                                    param_defaults = defs;
                                                    return Some((item.text.clone(), Vec::new(), Vec::new()));
                                                }
                                            }
                                        }
                                    }
                                    None
                                });
                            if let Some((code, cnames, cvals)) = found {
                                let mut sub_ctx = self.fresh_sub_context();
                                // 如果方法来自包，注入包上下文（函数/词条/trigger/head变量）
                                if let Some(pkg_name) = oop_pkg {
                                    if let Some(pkg_data) = self.shared.packages.get(pkg_name) {
                                        let mut pkg_func = pkg_data.local_func.clone();
                                        pkg_func.extend(sub_ctx.shared.local_func.clone());
                                        let mut pkg_static = pkg_data.local_static.clone();
                                        pkg_static.extend(sub_ctx.shared.local_static.clone());
                                        {
                                            let sub_shared = Arc::make_mut(&mut sub_ctx.shared);
                                            sub_shared.local_func = pkg_func;
                                            sub_shared.local_static = pkg_static;
                                            sub_shared.triggers = pkg_data.dic.clone();
                                        }
                                        sub_ctx.rebuild_internal_maps();
                                        for line in &pkg_data.head {
                                            let (v_type, v_prefix, v_suffix) = val_text_test(line);
                                            if v_type == 6 && !v_prefix.is_empty() {
                                                let value = sub_ctx.val.text(&v_suffix);
                                                sub_ctx.val.p.set_string(&v_prefix, value.clone());
                                                sub_ctx.val.set_g_string(&v_prefix, value);
                                            }
                                        }
                                    }
                                }
                                for (i, (name, val)) in cnames.iter().zip(cvals.iter()).enumerate() {
                                    sub_ctx.val.p.set_string(name, val.clone());
                                    sub_ctx.val.p.set_string(&format!("参数{}", i), val.clone());
                                }
                                // 实例变量持久化：加载 .field
                                for prefix in [&format!("{}.", raw_obj), &format!("{}.", resolved_obj)] {
                                    for (key, val) in self.val.p.obj.iter() {
                                        if let Some(field) = key.strip_prefix(prefix.as_str()) {
                                            let dot_key = format!(".{}", field);
                                            if !sub_ctx.val.p.obj.contains_key(&dot_key) {
                                                sub_ctx.val.p.set_string(&dot_key, val.display());
                                            }
                                            sub_ctx.val.p.set_string(key, val.display());
                                        }
                                    }
                                }
                                sub_ctx.val.p.set_string("self", resolved_obj.clone());
                                sub_ctx.val.p.set_string("触发", qualified.clone());
                                sub_ctx.val.p.set_string("参数0", qualified.clone());
                                let arg_count = args.len().saturating_sub(1);
                                for (i, arg) in args.iter().skip(1).enumerate() {
                                    let param_name = format!("参数{}", i + 1);
                                    sub_ctx.val.p.set_string(&param_name, self.val.text(arg));
                                }
                                // 注入命名参数（传入值或默认值）
                                let has_named_params = !param_names.is_empty();
                                for i in 0..param_names.len() {
                                    let val = if i < arg_count {
                                        self.val.text(&args[i + 1])
                                    } else if let Some(ref d) = param_defaults[i] {
                                        self.val.p.resolve_default(d, has_named_params)
                                    } else {
                                        String::new()
                                    };
                                    sub_ctx.val.p.set_string(&param_names[i], val.clone());
                                    let param_name = format!("参数{}", i + 1);
                                    sub_ctx.val.p.set_string(&param_name, val);
                                }
                                // 填充位置参数默认值到 %参数N%（param_names 为空时 defaults 仍有值）
                                for i in arg_count.max(param_names.len())..param_defaults.len() {
                                    if let Some(ref d) = param_defaults[i] {
                                        let val = self.val.p.resolve_default(d, has_named_params);
                                        let param_name = format!("参数{}", i + 1);
                                        sub_ctx.val.p.set_string(&param_name, val);
                                    }
                                }
                                entry(&mut sub_ctx, &code);
                                // 实例变量持久化：保存 .field 回主上下文
                                for (key, val) in sub_ctx.val.p.obj.iter() {
                                    if let Some(field) = key.strip_prefix('.') {
                                        self.val.p.set_string(&format!("{}.{}", raw_obj, field), val.display());
                                        if resolved_obj != raw_obj {
                                            self.val.p.set_string(&format!("{}.{}", resolved_obj, field), val.display());
                                        }
                                    }
                                }
                                result.push_str(&sub_ctx.output.get());
                            } else {
                                // 尝试作为类名.内置函数调用（如 $.回调 → Counter.回调 → 调用 回调 内置函数）
                                if let Some(&builtin_fn) = self.shared.builtins.get(method) {
                                    // OOP 上下文：设置 self 为对象引用，使内置函数能获取请求句柄
                                    let saved_self = self.val.p.get_cloned("self");
                                    self.val.p.set_string("self", resolved_obj.clone());
                                    if let Some(output) = builtin_fn(self, &args, content) {
                                        result.push_str(&output);
                                    }
                                    // 恢复 self（避免 OOP 调用后残留 self 污染后续代码）
                                    if saved_self.is_empty() {
                                        self.val.p.remove("self");
                                    } else {
                                        self.val.p.set_string("self", saved_self);
                                    }
                                } else {
                                    result.push('$');
                                    result.push_str(content);
                                    result.push('$');
                                }
                            }
                        }
                    } else {
                        result.push('$');
                        result.push_str(content);
                        result.push('$');
                    }
                } else {
                    result.push('$');
                    result.push_str(content);
                    result.push('$');
                }
            } else {
                let found = self.find_func_prefix(func_name)
                    .or_else(|| self.find_internal(func_name).map(|code| (code, Vec::new(), Vec::new(), false, 0)));
                if let Some((code, param_names, defaults, is_variadic, func_line)) = found {
                    // 检测自调用（函数递归）：当前 self 与 func_name 相同则保留变量上下文
                    let is_self = self.val.p.get_cloned("self") == func_name;
                    if is_self {
                        // 自调用：保留变量上下文，继承当前所有变量
                        let mut sub_ctx = self.clone_for_internal();
                        sub_ctx.sys.line_offset = func_line;
                        sub_ctx.val.p.set_string("触发", self.val.text(func_name));
                        sub_ctx.val.p.set_string("self", self.val.text(func_name));
                        sub_ctx.val.p.set_string("参数0", self.val.text(func_name));
                        let has_named_params = !param_names.is_empty();
                        let arg_count = args.len().saturating_sub(1);
                        let required_count = defaults.iter().filter(|d| d.is_none()).count();
                        let valid = if is_variadic {
                            arg_count >= required_count
                        } else if has_named_params {
                            arg_count >= required_count && arg_count <= param_names.len()
                        } else {
                            true
                        };
                        if !valid {
                            let label = if is_variadic { "至少需要" } else { "需要" };
                            self.sys.error = Some(format!(
                                "[错误] 函数 '{}' {} {} 个参数，但传入了 {} 个",
                                func_name, label, required_count, arg_count
                            ));
                            return result;
                        } else {
                            let var_base = if is_variadic { param_names.last().cloned() } else { None };
                            let mut all_vals: Vec<String> = Vec::new();
                            // 注入命名参数（用传入值或默认值）
                            for i in 0..param_names.len() {
                                let val = if i < arg_count {
                                    self.val.text(&args[i + 1])
                                } else if let Some(ref d) = defaults[i] {
                                    self.val.p.resolve_default(d, has_named_params)
                                } else {
                                    String::new()
                                };
                                all_vals.push(val.clone());
                                sub_ctx.val.p.set_string(&param_names[i], val.clone());
                                let param_name = format!("参数{}", i + 1);
                                sub_ctx.val.p.set_string(&param_name, val.clone());
                                if let Some(ref base) = var_base {
                                    sub_ctx.val.p.set_string(&format!("{}{}", base, i + 1), val);
                                }
                            }
                            // 可变参数多余传入值
                            for i in param_names.len()..arg_count {
                                let val = self.val.text(&args[i + 1]);
                                all_vals.push(val.clone());
                                let param_name = format!("参数{}", i + 1);
                                sub_ctx.val.p.set_string(&param_name, val.clone());
                                if let Some(ref base) = var_base {
                                    sub_ctx.val.p.set_string(&format!("{}{}", base, i + 1), val);
                                }
                            }
                            // 填充位置参数默认值到 %参数N%（param_names 为空时 defaults 仍有值）
                            for i in arg_count.max(param_names.len())..defaults.len() {
                                if let Some(ref d) = defaults[i] {
                                    let val = self.val.p.resolve_default(d, has_named_params);
                                    all_vals.push(val.clone());
                                    let param_name = format!("参数{}", i + 1);
                                    sub_ctx.val.p.set_string(&param_name, val);
                                }
                            }
                            // 填充位置参数默认值到 %参数N%（param_names 为空时 defaults 仍有值）
                            for i in arg_count.max(param_names.len())..defaults.len() {
                                if let Some(ref d) = defaults[i] {
                                    let val = self.val.p.resolve_default(d, has_named_params);
                                    all_vals.push(val.clone());
                                    let param_name = format!("参数{}", i + 1);
                                    sub_ctx.val.p.set_string(&param_name, val);
                                }
                            }
                            if let Some(ref base) = var_base {
                                let json_arr = serde_json::to_string(&all_vals).unwrap_or_default();
                                sub_ctx.val.p.set_string(base, json_arr);
                            }
                            entry(&mut sub_ctx, &code);
                            // 指针变量回写
                            for (i, raw_arg) in args.iter().skip(1).enumerate() {
                                if raw_arg.starts_with('%') && raw_arg.ends_with('%') && raw_arg.len() > 2 {
                                    let var_name = &raw_arg[1..raw_arg.len()-1];
                                    let ptr_key = format!("*{}", var_name);
                                    if self.val.p.get(&ptr_key).is_some() || self.val.get_g(&ptr_key).is_some() {
                                        if i < param_names.len() {
                                            let new_val = sub_ctx.val.p.get_cloned(&param_names[i]);
                                            self.val.p.set_string(&ptr_key, new_val);
                                        }
                                    }
                                }
                            }
                            result.push_str(&sub_ctx.output.get());
                        }
                    } else {
                        // 跨函数调用 —— 全新变量上下文，变量隔离
                        let mut sub_ctx = self.fresh_sub_context();
                        sub_ctx.sys.line_offset = func_line;
                        sub_ctx.sys.source_file = self.sys.source_file.clone();
                        // 注入变量：星引入函数用源包的 head 变量（隔离），否则用父上下文变量
                        if let Some(pkg_name) = self.shared.star_import_funcs.get(func_name) {
                            if let Some(pkg_bv) = self.shared.packages.get(pkg_name) {
                                for line in &pkg_bv.head {
                                    let (v_type, v_prefix, v_suffix) = val_text_test(line);
                                    if v_type == 6 && !v_prefix.is_empty() {
                                        let value = sub_ctx.val.text(&v_suffix);
                                        sub_ctx.val.p.set_string(&v_prefix, value);
                                    }
                                }
                            }
                        } else {
                            for (key, val) in self.val.p.obj.iter() {
                                sub_ctx.val.p.set_string(key, val.display());
                            }
                        }
                        sub_ctx.val.p.set_string("触发", self.val.text(func_name));
                        sub_ctx.val.p.set_string("self", self.val.text(func_name));
                        sub_ctx.val.p.set_string("参数0", self.val.text(func_name));
                        let has_named_params = !param_names.is_empty();
                        let arg_count = args.len().saturating_sub(1);
                        let required_count = defaults.iter().filter(|d| d.is_none()).count();
                        let valid = if is_variadic {
                            arg_count >= required_count
                        } else if has_named_params {
                            arg_count >= required_count && arg_count <= param_names.len()
                        } else {
                            true
                        };
                        if !valid {
                            let label = if is_variadic { "至少需要" } else { "需要" };
                            self.sys.error = Some(format!(
                                "[错误] 函数 '{}' {} {} 个参数，但传入了 {} 个",
                                func_name, label, required_count, arg_count
                            ));
                            return result;
                        } else {
                            let var_base = if is_variadic { param_names.last().cloned() } else { None };
                            let mut all_vals: Vec<String> = Vec::new();
                            // 注入命名参数（用传入值或默认值）
                            for i in 0..param_names.len() {
                                let val = if i < arg_count {
                                    self.val.text(&args[i + 1])
                                } else if let Some(ref d) = defaults[i] {
                                    self.val.p.resolve_default(d, has_named_params)
                                } else {
                                    String::new()
                                };
                                all_vals.push(val.clone());
                                sub_ctx.val.p.set_string(&param_names[i], val.clone());
                                let param_name = format!("参数{}", i + 1);
                                sub_ctx.val.p.set_string(&param_name, val.clone());
                                if let Some(ref base) = var_base {
                                    sub_ctx.val.p.set_string(&format!("{}{}", base, i + 1), val);
                                }
                            }
                            // 可变参数多余传入值
                            for i in param_names.len()..arg_count {
                                let val = self.val.text(&args[i + 1]);
                                all_vals.push(val.clone());
                                let param_name = format!("参数{}", i + 1);
                                sub_ctx.val.p.set_string(&param_name, val.clone());
                                if let Some(ref base) = var_base {
                                    sub_ctx.val.p.set_string(&format!("{}{}", base, i + 1), val);
                                }
                            }
                            // 填充位置参数默认值到 %参数N%（param_names 为空时 defaults 仍有值）
                            for i in arg_count.max(param_names.len())..defaults.len() {
                                if let Some(ref d) = defaults[i] {
                                    let val = self.val.p.resolve_default(d, has_named_params);
                                    all_vals.push(val.clone());
                                    let param_name = format!("参数{}", i + 1);
                                    sub_ctx.val.p.set_string(&param_name, val);
                                }
                            }
                            if let Some(ref base) = var_base {
                                let json_arr = serde_json::to_string(&all_vals).unwrap_or_default();
                                sub_ctx.val.p.set_string(base, json_arr);
                            }
                            entry(&mut sub_ctx, &code);
                            // 指针变量回写：若参数来自 %varName% 且 *varName 存在，
                            // 将子上下文参数值回写到调用者的指针变量
                            for (i, raw_arg) in args.iter().skip(1).enumerate() {
                                if raw_arg.starts_with('%') && raw_arg.ends_with('%') && raw_arg.len() > 2 {
                                    let var_name = &raw_arg[1..raw_arg.len()-1];
                                    let ptr_key = format!("*{}", var_name);
                                    if self.val.p.get(&ptr_key).is_some() || self.val.get_g(&ptr_key).is_some() {
                                        if i < param_names.len() {
                                            let new_val = sub_ctx.val.p.get_cloned(&param_names[i]);
                                            self.val.p.set_string(&ptr_key, new_val);
                                        }
                                    }
                                }
                            }
                            result.push_str(&sub_ctx.output.get());
                        }
                    }
                } else {
                    // 未找到，保持原样
                    result.push('$');
                    result.push_str(content);
                    result.push('$');
                }
            }

            start = close_index + 1;
        }

        // 剩余外部文本
        if start < text.len() {
            let outside = &text[start..];
            if !outside.is_empty() {
                if outside.contains('\x01') {
                    result.push_str(outside);
                } else {
                    result.push_str(&self.val.text(outside));
                }
            }
        }

        result
    }

    /// 为内部调用创建子上下文（重置状态机）
    pub(crate) fn clone_for_internal(&self) -> DicContext {
        let mut ctx = self.clone();
        ctx.output.clear();
        ctx.sys.if_func.success = false;
        ctx.sys.for_state.success = false;
        ctx.sys.for_each.success = false;
        ctx.sys.func_state.success = false;
        ctx.sys.pending_goto = None;
        ctx
    }

    /// 为子调用（函数/OOP方法）创建全新变量上下文，变量完全隔离
    pub(crate) fn fresh_sub_context(&self) -> DicContext {
        DicContext {
            val: DicVal {
                g: self.val.share_g(),
                ..DicVal::new()
            },
            sys: SysV::default(),
            output: Output::new(),
            shared: Arc::new(SharedContext {
                trigger: false,
                builtins: Arc::clone(&self.shared.builtins),
                local_static: self.shared.local_static.clone(),
                local_static_map: self.shared.local_static_map.clone(),
                local_func: self.shared.local_func.clone(),
                local_func_map: self.shared.local_func_map.clone(),
                packages: self.shared.packages.clone(),
                star_import_funcs: self.shared.star_import_funcs.clone(),
                triggers: Vec::new(),
                init_lines: Vec::new(),
                package_mtimes: self.shared.package_mtimes.clone(),
            }),
            reloading_dirs: self.reloading_dirs.clone(),
        }
    }
}

impl crate::iftext::CondEval for DicContext {
    fn val(&self) -> &DicVal {
        &self.val
    }
    fn val_mut(&mut self) -> &mut DicVal {
        &mut self.val
    }
    fn process_internal(&mut self, text: &str) -> String {
        self.run_internal_text(text)
    }
}

/* ===================== 循环体预编译 ===================== */

/// 预编译的循环体：将 `x:[%i%+1]` 编译为原生 i+1，跳过 entry/text/count
enum LoopJit {
    /// var:[%loop_var% op const]
    BinOp { target: String, op: u8, operand: f64 },
    /// var:[%loop_var%]
    Copy { target: String },
    /// var+:[%loop_var% op const]  — 自增常量
    AddAssign { target: String, op: u8, operand: f64 },
    /// var+:%loop_var% 等  — 自增变量值 (x += i, x *= i, ...)
    OpBy { target: String, op: u8 },
}


/// 将 val_text_test 的 v_type 映射为操作符字节
fn vtype_to_op(v_type: i8) -> u8 {
    match v_type {
        1 => b'-',  // -:
        2 => b'+',  // +:
        7 => b'*',  // *:
        8 => b'/',  // /:
        9 => b'%',  // %:
        _ => b'+',
    }
}

/// 尝试预编译单行循环体
fn try_compile_loop(line: &str, loop_var: &str) -> Option<LoopJit> {
    // 禁止含控制流的行
    if line.contains('$') || line.contains("终止") || line.contains("跳过")
        || line.contains("如果") || line.contains("循环") || line.contains("遍历")
        || line.contains("文本") || line.contains("JSON")
    { return None; }

    let (v_type, v_prefix, v_suffix) = val_text_test(line);
    let target = v_prefix;
    if target.is_empty() { return None; }

    match v_type {
        6 => {
            // 普通赋值 var:[expr]
            if !v_suffix.starts_with('[') || !v_suffix.ends_with(']') { return None; }
            let inner = &v_suffix[1..v_suffix.len()-1];
            // 必须只含 %loop_var% 引用
            parse_loop_expr(inner, loop_var).map(|(op, operand)| {
                if op == 0 { LoopJit::Copy { target } }
                else { LoopJit::BinOp { target, op, operand } }
            })
        }
        2 | 1 | 7 | 8 | 9 => {
            // 自增 var+:expr, var*:%loop_var% 等
            // 有括号：var+:[%i% op const]
            if v_suffix.starts_with('[') && v_suffix.ends_with(']') {
                let inner = &v_suffix[1..v_suffix.len()-1];
                return parse_loop_expr(inner, loop_var).map(|(op, operand)| {
                    LoopJit::AddAssign { target, op, operand }
                });
            }
            // 无括号：var*:%loop_var% → x = x * i
            if v_suffix.len() == loop_var.len() + 2
                && v_suffix.as_bytes()[0] == b'%'
                && v_suffix.as_bytes()[v_suffix.len()-1] == b'%'
                && &v_suffix[1..v_suffix.len()-1] == loop_var
            {
                let op_byte = vtype_to_op(v_type);
                return Some(LoopJit::OpBy { target, op: op_byte });
            }
            None
        }
        _ => None,
    }
}

/// 解析 %loop_var%opC 或 %loop_var% 模式，返回 (op_byte, operand)
/// op_byte = 0 表示只有 %var% 引用，无操作符
fn parse_loop_expr(expr: &str, loop_var: &str) -> Option<(u8, f64)> {
    let expr = expr.trim();
    let b = expr.as_bytes();

    // 必须以 %loop_var% 开头
    if b.len() < loop_var.len() + 2 || b[0] != b'%' { return None; }
    let end_pct = expr[1..].find('%')? + 1;
    let var = &expr[1..end_pct];
    if var != loop_var { return None; }

    let rest = &expr[end_pct + 1..];
    if rest.is_empty() {
        return Some((0, 0.0));
    }

    // 解析 op + 操作数
    let op = rest.as_bytes()[0];
    let operand_str = rest[1..].trim();
    let operand: f64 = operand_str.parse().ok()?;

    match op {
        b'+' | b'-' | b'*' | b'/' | b'%' | b'^' => Some((op, operand)),
        _ => None,
    }
}

/// 执行一次循环迭代：优先走 JIT 原生计算，否则回退 entry()
fn exec_loop_body(ctx: &mut DicContext, jit: &Option<LoopJit>, content: &[String], loop_var: &str, i: usize) {
    ctx.val.p.set_string(loop_var, i.to_string());

    if let Some(j) = jit {
        let f_i = i as f64;
        match j {
            LoopJit::BinOp { target, op, operand } => {
                let operand = *operand;
                let result = match op {
                    b'+' => f_i + operand,
                    b'-' => f_i - operand,
                    b'*' => f_i * operand,
                    b'/' => { if operand != 0.0 { f_i / operand } else { f_i } }
                    b'%' => { if operand != 0.0 { f_i % operand } else { f_i } }
                    b'^' => f_i.powf(operand),
                    _ => f_i,
                };
                let out = if result == result.trunc() && result.abs() < (i64::MAX as f64) {
                    (result as i64).to_string()
                } else {
                    format!("{:.10}", result).trim_end_matches('0').trim_end_matches('.').to_string()
                };
                ctx.val.p.set_string(target, out);
            }
            LoopJit::Copy { target } => {
                ctx.val.p.set_string(target, i.to_string());
            }
            LoopJit::AddAssign { target, op, operand } => {
                let operand = *operand;
                let val_str = ctx.val.p.get_cloned(target);
                let base: f64 = val_str.parse().unwrap_or(0.0);
                let result = match op {
                    b'+' => base + operand,
                    b'-' => base - operand,
                    b'*' => base * operand,
                    b'/' => { if operand != 0.0 { base / operand } else { base } }
                    b'%' => { if operand != 0.0 { base % operand } else { base } }
                    b'^' => base.powf(operand),
                    _ => base,
                };
                let out = if result == result.trunc() && result.abs() < (i64::MAX as f64) {
                    (result as i64).to_string()
                } else {
                    format!("{:.10}", result).trim_end_matches('0').trim_end_matches('.').to_string()
                };
                ctx.val.p.set_string(target, out);
            }
            LoopJit::OpBy { target, op } => {
                let val_str = ctx.val.p.get_cloned(target);
                let base: f64 = val_str.parse().unwrap_or(0.0);
                let result = match op {
                    b'+' => base + f_i,
                    b'-' => base - f_i,
                    b'*' => base * f_i,
                    b'/' => { if f_i != 0.0 { base / f_i } else { base } }
                    b'%' => { if f_i != 0.0 { base % f_i } else { base } }
                    b'^' => base.powf(f_i),
                    _ => base,
                };
                let out = if result == result.trunc() && result.abs() < (i64::MAX as f64) {
                    (result as i64).to_string()
                } else {
                    format!("{:.10}", result).trim_end_matches('0').trim_end_matches('.').to_string()
                };
                ctx.val.p.set_string(target, out);
            }
        }
        return;
    }

    // 回退：走完整 entry() 状态机
    let saved_stop = ctx.sys.stop;
    ctx.sys.stop = false;
    ctx.sys.for_state.is_for = true;
    entry(ctx, content);
    if ctx.sys.stop {
        ctx.sys.stop = saved_stop || ctx.sys.stop;
        return;
    }
    if ctx.sys.for_state.jump {
        ctx.sys.for_state.jump = false;
        return;
    }
    ctx.sys.stop = saved_stop;
}

/* ===================== Entry 主解释器 ===================== */

/// 执行词库代码块（通过 AST executor）
pub fn entry(ctx: &mut DicContext, txt: &[String]) {
    match crate::executor::parse_stmts(txt, false, ctx.sys.line_offset, &ctx.sys.source_file) {
        Ok(stmts) => {
            crate::executor::exec_stmts(ctx, &stmts);
        }
        Err(e) => {
            // JSON 解析错误 → 拦截执行
            if e.contains("[JSON错误]") {
                eprintln!("\x1b[91m{}\x1b[0m", e);
                ctx.sys.stop = true;
                ctx.sys.error = Some(e);
            } else {
                // 解析失败，回退到旧状态机
                entry_fallback(ctx, txt);
            }
        }
    }
}

/// 旧状态机（fallback）
#[allow(unused)]
fn entry_fallback(ctx: &mut DicContext, txt: &[String]) {
    let txt_len = txt.len();
    let mut is_if = false;
    let mut lock = false;
    let mut index = 0;

    // 预扫描标签（Go-style goto）
    let mut labels: HashMap<String, usize> = HashMap::new();
    for (i, line) in txt.iter().enumerate() {
        if let Some(label) = line.strip_prefix(':') {
            if !label.is_empty() && !label.contains(' ') && !label.starts_with(':') && label != "=" {
                labels.insert(label.to_string(), i);
            }
        }
    }

    while index < txt_len {
        // 检查函数执行错误
        if let Some(ref msg) = ctx.sys.error.take() {
            ctx.output.add(msg);
            break;
        }

        let text = &txt[index];
        let text_len = text.len();

        // 跳过标签行（Go-style goto label）
        if text.starts_with(':') && !text.starts_with("::") && text != ":=" {
            if let Some(label) = text.strip_prefix(':') {
                if !label.contains(' ') {
                    index += 1;
                    continue;
                }
            }
        }

        if ctx.sys.stop {
            return;
        }

        // 快速路径：无活动块 → 跳过所有块收集器和旧式 if 检查
        if ctx.sys.has_active_blocks() || is_if || lock {
        // ===== 纯文本框 ''' =====
        if ctx.sys.val_textr.success {
            if text == "'''" {
                let val_name = ctx.sys.val_textr.value_name.clone();
                let joined = ctx.sys.val_textr.content.join("\n");
                ctx.val.p.set_string(&val_name, joined);
                ctx.sys.val_textr.content.clear();
                ctx.sys.val_textr.success = false;
                index += 1;
                continue;
            }
            ctx.sys.val_textr.content.push(text.replace("\\'''", "'''"));
            index += 1;
            continue;
        }

        // ===== 纯文本框 """ =====
        if ctx.sys.val_text.success {
            if text == "\"\"\"" {
                let val_name = ctx.sys.val_text.value_name.clone();
                let joined = ctx.sys.val_text.content.join("\n");
                ctx.val.p.set_string(&val_name, joined);
                ctx.sys.val_text.content.clear();
                ctx.sys.val_text.success = false;
                index += 1;
                continue;
            }
            let processed = ctx.val.text(text);
            ctx.sys.val_text.content.push(processed.replace("\\\"\"\"", "\"\"\""));
            index += 1;
            continue;
        }

        // ===== JSON>{ ...[ =====
        if ctx.sys.set_new_json.success {
            ctx.sys.set_new_json.json.push_str(text);
            if text.ends_with('{') || text.ends_with('[') {
                ctx.sys.set_new_json.len += 1;
            }
            if text == "}" || text == "]" || text == "}," || text == "]," {
                ctx.sys.set_new_json.len -= 1;
                if ctx.sys.set_new_json.len == 0 && (text == "}" || text == "]") {
                    let val_name = ctx.sys.set_new_json.value_name.clone();
                    let json_val = serde_json::from_str::<serde_json::Value>(&ctx.sys.set_new_json.json);
                    if let Ok(jv) = json_val {
                        let s = jv.to_string();
                        if !val_name.is_empty() {
                            ctx.val.p.set_string(&val_name, s);
                        } else {
                            ctx.output.add(&s);
                        }
                    }
                    ctx.sys.set_new_json.success = false;
                    index += 1;
                    continue;
                }
            }
            index += 1;
            continue;
        }

        // ===== JSON>jsonstr =====
        if ctx.sys.set_json.success {
            if text == "<JSON" {
                let val_name = ctx.sys.set_json.value_name.clone();
                if let Ok(s) = serde_json::to_string(&ctx.sys.set_json.json) {
                    if !val_name.is_empty() {
                        ctx.val.p.set_string(&val_name, s);
                    } else {
                        ctx.output.add(&s);
                    }
                }
                ctx.sys.set_json.success = false;
                index += 1;
                continue;
            }
            // JSON 内赋值: key=value 或 key:=value
            if let Some(eq_pos) = text.find('=') {
                let key = if eq_pos > 0 && text.as_bytes()[eq_pos - 1] == b':' {
                    text[..eq_pos - 1].to_string()
                } else {
                    text[..eq_pos].to_string()
                };
                let value_start = eq_pos + 1;
                let raw_value = &text[value_start..];
                let value = ctx.val.text(raw_value);

                let keys: Vec<String> = if let Some((base, sub_keys)) = crate::value::parse_bracket_path(&key) {
                    let mut ks = vec![crate::count::run_count_text(&ctx.val, base)];
                    ks.extend(sub_keys.into_iter().map(|k| crate::count::run_count_text(&ctx.val, &k)));
                    ks
                } else {
                    vec![crate::count::run_count_text(&ctx.val, &key)]
                };
                json_set_value(&mut ctx.sys.set_json.json, &keys, &value);
                index += 1;
                continue;
            }
            index += 1;
            continue;
        }

        // ===== 函数> =====
        if ctx.sys.func_state.success {
            let mut for_num = ctx.sys.func_state.num;
            if text_len > 7 && text.starts_with("函数>") {
                for_num += 1;
                ctx.sys.func_state.num = for_num;
            }
            if text == "<函数" {
                if for_num == 0 {
                    // TODO: 存储函数框（FuncBox）
                    ctx.sys.func_state.content.clear();
                    ctx.sys.func_state.success = false;
                    index += 1;
                    continue;
                }
                for_num -= 1;
                ctx.sys.func_state.num = for_num;
            }
            ctx.sys.func_state.content.push(text.clone());
            index += 1;
            continue;
        }

        // ===== 遍历> =====
        if ctx.sys.for_each.success {
            let mut for_num = ctx.sys.for_each.num;
            if text_len >= 7 && text.starts_with("遍历>") {
                for_num += 1;
                ctx.sys.for_each.num = for_num;
            }
            if text == "<遍历" {
                if for_num == 0 {
                    let val_name = ctx.sys.for_each.value_name.clone();
                    let content = ctx.sys.for_each.content.clone();
                    let run_val = ctx.sys.for_each.run.clone();

                    if let Some(run_data) = run_val {
                        let (v1, v2) = if let Some(comma_pos) = val_name.find(',') {
                            (val_name[..comma_pos].to_string(), val_name[comma_pos + 1..].to_string())
                        } else {
                            (val_name.clone(), String::from("_"))
                        };

                        match &run_data {
                            serde_json::Value::Array(arr) => {
                                for (key, val) in arr.iter().enumerate() {
                                    ctx.val.p.set_string(&v1, key.to_string());
                                    let v2_str: String = match val {
                                        serde_json::Value::String(s) => s.clone(),
                                        other => other.to_string(),
                                    };
                                    ctx.val.p.set_string(&v2, v2_str);

                                    let saved_stop = ctx.sys.stop;
                                    ctx.sys.stop = false;
                                    ctx.sys.for_each.success = false;

                                    entry(ctx, &content);

                                    if ctx.sys.stop || ctx.sys.for_each.jump {
                                        ctx.sys.stop = saved_stop || ctx.sys.stop;
                                        ctx.sys.for_each.jump = false;
                                        break;
                                    }
                                    ctx.sys.stop = saved_stop;
                                }
                            }
                            serde_json::Value::Object(map) => {
                                for (key, val) in map {
                                    ctx.val.p.set_string(&v1, key.clone());
                                    let v2_str: String = match val {
                                        serde_json::Value::String(s) => s.clone(),
                                        other => other.to_string(),
                                    };
                                    ctx.val.p.set_string(&v2, v2_str);

                                    let saved_stop = ctx.sys.stop;
                                    ctx.sys.stop = false;
                                    ctx.sys.for_each.success = false;

                                    entry(ctx, &content);

                                    if ctx.sys.stop || ctx.sys.for_each.jump {
                                        ctx.sys.stop = saved_stop || ctx.sys.stop;
                                        ctx.sys.for_each.jump = false;
                                        break;
                                    }
                                    ctx.sys.stop = saved_stop;
                                }
                            }
                            _ => {}
                        }
                    }
                    ctx.sys.for_each.close();
                    index += 1;
                    continue;
                }
                for_num -= 1;
                ctx.sys.for_each.num = for_num;
            }
            ctx.sys.for_each.content.push(text.clone());
            index += 1;
            continue;
        }

        // ===== 循环> =====
        if ctx.sys.for_state.success {
            let mut for_num = ctx.sys.for_state.num;
            if text_len >= 7 && text.starts_with("循环>") {
                for_num += 1;
                ctx.sys.for_state.num = for_num;
            }
            if text == "<循环" {
                if for_num == 0 {
                    let val_name = ctx.sys.for_state.value_name.clone();
                    let content = ctx.sys.for_state.content.clone();
                    let run_count = ctx.sys.for_state.run;

                    // 尝试预编译循环体为原生计算
                    let jit = if content.len() == 1 {
                        try_compile_loop(&content[0], &val_name)
                    } else {
                        None
                    };

                    if let Some(count) = run_count {
                            // 有限循环
                            ctx.sys.for_state.success = false;
                            let mut i = 1;
                            while i <= count {
                                exec_loop_body(ctx, &jit, &content, &val_name, i);
                                if let Some(set_num) = ctx.val.p.get(&val_name) {
                                    if let Ok(new_i) = set_num.display().parse::<usize>() {
                                        i = new_i;
                                    }
                                }
                                i += 1;
                            }
                    } else {
                        // 无限循环
                        let mut i = 1;
                        ctx.sys.for_state.success = false;
                        loop {
                            exec_loop_body(ctx, &jit, &content, &val_name, i);
                            if ctx.sys.stop { break; }
                            if ctx.sys.for_state.jump {
                                ctx.sys.for_state.jump = false;
                                break;
                            }
                            if let Some(set_num) = ctx.val.p.get(&val_name) {
                                if let Ok(new_i) = set_num.display().parse::<usize>() {
                                    i = new_i;
                                }
                            }
                            i += 1;
                        }
                    }

                    ctx.sys.for_state.num = 0;
                    ctx.sys.for_state.run = None;
                    ctx.sys.for_state.content.clear();
                    ctx.sys.for_state.success = false;
                    index += 1;
                    continue;
                }
                for_num -= 1;
                ctx.sys.for_state.num = for_num;
            }
            ctx.sys.for_state.content.push(text.clone());
            index += 1;
            continue;
        }

        // ===== 如果> =====
        if ctx.sys.if_func.success {
            let mut for_num = ctx.sys.if_func.num;
            if text_len > 7 && text.starts_with("如果>") {
                for_num += 1;
                ctx.sys.if_func.num = for_num;
            }
            if text == "<如果" {
                if for_num == 0 {
                    let if_conds = ctx.sys.if_func.if_conds.clone();
                    let else_lines = ctx.sys.if_func.else_lines.clone();
                    let run_lines = ctx.sys.if_func.run_lines.clone();
                    let if_num = ctx.sys.if_func.if_num;

                    for i in 0..=if_num {
                        let cond = if i < if_conds.len() { &if_conds[i] } else { &String::new() };
                        let ifval = IfText::pd(ctx, cond);
                        if ifval {
                            let run = if i < run_lines.len() { &run_lines[i] } else { &Vec::new() };
                            let mut sub_ctx = ctx.clone();
                            sub_ctx.output.clear();
                            sub_ctx.sys.if_func.success = false;
                            sub_ctx.sys.if_func.is_if = true;
                            entry(&mut sub_ctx, run);
                            ctx.output.add(&sub_ctx.output.get());
                            if sub_ctx.sys.stop {
                                ctx.sys.stop = true;
                                return;
                            }
                            break;
                        } else if i == if_num {
                            // else 分支
                            let mut sub_ctx = ctx.clone();
                            sub_ctx.output.clear();
                            sub_ctx.sys.if_func.success = false;
                            entry(&mut sub_ctx, &else_lines);
                            ctx.output.add(&sub_ctx.output.get());
                        }
                    }

                    ctx.sys.if_func.if_conds.clear();
                    ctx.sys.if_func.else_lines.clear();
                    ctx.sys.if_func.run_lines.clear();
                    ctx.sys.if_func.if_num = 0;
                    ctx.sys.if_func.is_else = false;
                    ctx.sys.if_func.success = false;
                    ctx.sys.if_func.is_if = false;
                    index += 1;
                    continue;
                }
                for_num -= 1;
                ctx.sys.if_func.num = for_num;
            }

            if for_num == 0 {
                if !ctx.sys.if_func.is_else && text == ">否则" {
                    ctx.sys.if_func.is_else = true;
                    index += 1;
                    continue;
                }
                if !ctx.sys.if_func.is_else && text_len > 14 && text.starts_with(">否则如果:") {
                    ctx.sys.if_func.if_num += 1;
                    ctx.sys.if_func.if_conds.push(text[14..].to_string());
                    index += 1;
                    continue;
                }
            }

            if ctx.sys.if_func.is_else {
                ctx.sys.if_func.else_lines.push(text.clone());
            } else {
                while ctx.sys.if_func.run_lines.len() <= ctx.sys.if_func.if_num {
                    ctx.sys.if_func.run_lines.push(Vec::new());
                }
                ctx.sys.if_func.run_lines[ctx.sys.if_func.if_num].push(text.clone());
            }
            index += 1;
            continue;
        }

        // ===== 旧式 if:/如果:/elif:/否则如果: 条件 =====
        if is_if {
            if lock {
                if text == "如果尾" || text == "end" {
                    lock = false;
                    is_if = false;
                    index += 1;
                    continue;
                }
                if text == "else" || text == "否则" {
                    lock = false;
                    is_if = false;
                    index += 1;
                    continue;
                }
                if text == "返回" && index + 1 < txt_len && txt[index + 1] == "如果尾" {
                    lock = false;
                    is_if = false;
                    index += 2;
                    continue;
                }
                if text_len > 5 && text.starts_with("elif:") {
                    is_if = true;
                    lock = true;
                    if IfText::pd(ctx, &text[5..]) {
                        lock = false;
                        index += 1;
                        continue;
                    }
                    index += 1;
                    continue;
                }
                if text_len > 13 && text.starts_with("否则如果:") {
                    is_if = true;
                    lock = true;
                    if IfText::pd(ctx, &text[13..]) {
                        lock = false;
                        index += 1;
                        continue;
                    }
                    index += 1;
                    continue;
                }
            }
            if !lock {
                if text == "如果尾" || text == "end" {
                    lock = false;
                    is_if = false;
                    index += 1;
                    continue;
                }
                if text_len > 5 && text.starts_with("elif:") { break; }
                if text_len > 13 && text.starts_with("否则如果:") { break; }
                if text == "else" || text == "否则" { break; }
                if text == "返回" && index + 1 < txt_len && txt[index + 1] == "如果尾" { break; }
            }
        }

        } // has_active_blocks (块收集器结束，旧式 if 检测在外部)

        if text_len > 3 && text.starts_with("if:") {
            is_if = true;
            lock = true;
            if IfText::pd(ctx, &text[3..]) {
                lock = false;
                index += 1;
                continue;
            }
            index += 1;
            continue;
        }

        if text_len > 7 && text.starts_with("如果:") {
            is_if = true;
            lock = true;
            if IfText::pd(ctx, &text[7..]) {
                lock = false;
                index += 1;
                continue;
            }
            index += 1;
            continue;
        }

        if lock {
            index += 1;
            continue;
        }

        // ===== 控制流指令 =====
        if text == ">跳过" && ctx.sys.for_state.is_for {
            return;
        }
        if text == ">跳过" && ctx.sys.for_each.is_for {
            return;
        }
        if text == ">终止循环" && ctx.sys.for_state.is_for {
            ctx.sys.for_state.jump = true;
            return;
        }
        if text == ">终止遍历" && ctx.sys.for_each.is_for {
            ctx.sys.for_each.jump = true;
            return;
        }
        if text == ">跳过" && ctx.sys.if_func.is_if {
            ctx.sys.if_func.jump = true;
            return;
        }
        // Go-style goto label
        if let Some(label) = text.strip_prefix("goto ") {
            let label = label.trim();
            if let Some(&target) = labels.get(label) {
                index = target;
                continue;
            }
            // 检查外部标签（跨函数 goto，来自父调用上下文）
            if let Some(&(target, _depth)) = ctx.sys.external_labels.get(label) {
                ctx.sys.pending_goto = Some((target, _depth));
                ctx.sys.stop = true;
                return;
            }
        }
        if text == ">终止" {
            ctx.sys.stop = true;
            return;
        }
        if let Some(msg) = text.strip_prefix(">终止 ") {
            if !msg.is_empty() {
                ctx.sys.stop = true;
                ctx.output.add(msg);
                return;
            }
        }

        // ===== 函数> =====
        if text_len >= 7 && text.starts_with("函数>") {
            let inner = &text[7..];
            if let Some(eq_pos) = inner.find('=') {
                let key = &inner[..eq_pos];
                let value = &inner[eq_pos + 1..];
                ctx.sys.func_state.content.clear();
                ctx.sys.func_state.value_name = key.to_string();
                ctx.sys.func_state.trigger = value.to_string();
                ctx.sys.func_state.success = true;
            } else {
                ctx.sys.func_state.content.clear();
                ctx.sys.func_state.value_name = inner.to_string();
                ctx.sys.func_state.trigger.clear();
                ctx.sys.func_state.success = true;
            }
            index += 1;
            continue;
        }

        // ===== 如果> =====
        if text_len > 7 && text.starts_with("如果>") {
            ctx.sys.if_func.if_conds.push(text[7..].to_string());
            ctx.sys.if_func.success = true;
            index += 1;
            continue;
        }

        // ===== JSON>[ / JSON>{ =====
        if text_len == 6 && text == "JSON>[" {
            ctx.sys.set_new_json.success = true;
            ctx.sys.set_new_json.json = "[".to_string();
            ctx.sys.set_new_json.json_type = true;
            ctx.sys.set_new_json.len = 1;
            ctx.sys.set_new_json.value_name.clear();
            index += 1;
            continue;
        }
        if text_len == 6 && text == "JSON>{" {
            ctx.sys.set_new_json.success = true;
            ctx.sys.set_new_json.json = "{".to_string();
            ctx.sys.set_new_json.json_type = true;
            ctx.sys.set_new_json.len = 1;
            ctx.sys.set_new_json.value_name.clear();
            index += 1;
            continue;
        }

        // ===== JSON> =====
        if text_len >= 5 && text.starts_with("JSON>") {
            let inner = &text[5..];
            if let Some(eq_pos) = inner.find('=') {
                let key = &inner[..eq_pos];
                let raw_val = ctx.val.text(&inner[eq_pos + 1..]);
                if let Ok(jv) = serde_json::from_str::<serde_json::Value>(&raw_val) {
                    ctx.sys.set_json.success = true;
                    ctx.sys.set_json.value_name = key.to_string();
                    ctx.sys.set_json.json = jv;
                }
            } else {
                let raw_val = ctx.val.text(inner);
                if let Ok(jv) = serde_json::from_str::<serde_json::Value>(&raw_val) {
                    ctx.sys.set_json.success = true;
                    ctx.sys.set_json.value_name.clear();
                    ctx.sys.set_json.json = jv;
                }
            }
            index += 1;
            continue;
        }

        // ===== 遍历> =====
        if text_len >= 7 && text.starts_with("遍历>") {
            let inner = &text[7..];
            if let Some(eq_pos) = inner.find('=') {
                let key = &inner[..eq_pos];
                let raw_val = &inner[eq_pos + 1..];
                let processed = ctx.val.text(raw_val);
                // 尝试解析为 JSON
                if let Ok(arr) = serde_json::from_str::<Vec<serde_json::Value>>(&processed) {
                    ctx.sys.for_each.run = Some(serde_json::Value::Array(arr));
                } else if let Ok(obj) = serde_json::from_str::<serde_json::Map<String, serde_json::Value>>(&processed) {
                    ctx.sys.for_each.run = Some(serde_json::Value::Object(obj));
                } else {
                    ctx.sys.for_each.run = Some(serde_json::Value::Array(vec![serde_json::Value::String(processed)]));
                }
                ctx.sys.for_each.content.clear();
                ctx.sys.for_each.value_name = key.to_string();
                ctx.sys.for_each.success = true;
            } else {
                ctx.sys.for_each.content.clear();
                ctx.sys.for_each.value_name = inner.to_string();
                ctx.sys.for_each.run = None; // 需要从变量获取
                ctx.sys.for_each.success = true;
            }
            index += 1;
            continue;
        }

        // ===== 循环> =====
        if text_len >= 7 && text.starts_with("循环>") {
            let inner = &text[7..];
            if let Some(eq_pos) = inner.find('=') {
                let key = &inner[..eq_pos];
                let raw_val = &inner[eq_pos + 1..];
                let processed = ctx.val.text(raw_val);
                let count = processed.parse::<usize>().unwrap_or(0);
                ctx.sys.for_state.content.clear();
                ctx.sys.for_state.run = Some(count);
                ctx.sys.for_state.value_name = key.to_string();
                ctx.sys.for_state.success = true;
            } else {
                ctx.sys.for_state.content.clear();
                ctx.sys.for_state.value_name = inner.to_string();
                ctx.sys.for_state.run = None;
                ctx.sys.for_state.success = true;
            }
            index += 1;
            continue;
        }

        // ===== #: 异步 =====
        if text_len > 2 && text.starts_with("#:") {
            // 简化：同步执行
            let inner = ctx.val.text(&text[2..]);
            ctx.output.add(&inner);
            index += 1;
            continue;
        }

        // ===== 解析 %包名.变量% 引入包变量 =====
        let text_resolved = ctx.resolve_package_vars(text);

        // ===== 赋值操作符检测 =====
        let (v_type, v_prefix, v_suffix) = val_text_test(&text_resolved);
        match v_type {
            0 => {
                // 无操作符 = 纯输出
                ctx.val.p.set_string("行数", (index + 1).to_string());
                let result = ctx.run_internal_text(&text_resolved);
                ctx.output.add(&crate::analyzer::unescape_newline(&result));
            }
            1 | 2 | 7 | 8 | 9 => {
                // 先对 suffix 做变量替换 + 数学计算
                let v_set_data_raw = ctx.val.text(&v_suffix);
                let v_set_data = crate::count::run_count_text(&ctx.val, &v_set_data_raw);

                match v_type {
                    1 => {
                        // 自减
                        let val_str = ctx.val.p.get_cloned(&v_prefix);
                        if let (Ok(a), Ok(b)) = (val_str.parse::<f64>(), v_set_data.parse::<f64>()) {
                            ctx.val.p.set_string(&v_prefix, format!("{}", a - b));
                        }
                    }
                    2 => {
                        // 自增 / JSON追加 / 字符串拼接
                        let val_str = ctx.val.p.get_cloned(&v_prefix);
                        // 尝试 JSON 追加
                        if let Ok(arr) = serde_json::from_str::<Vec<serde_json::Value>>(&val_str) {
                            let mut arr = arr;
                            arr.push(serde_json::Value::String(v_set_data.clone()));
                            if let Ok(s) = serde_json::to_string(&arr) {
                                ctx.val.p.set_string(&v_prefix, s);
                            }
                        } else if let Ok(obj) = serde_json::from_str::<serde_json::Map<String, serde_json::Value>>(&val_str) {
                            let mut obj = obj;
                            obj.insert(obj.len().to_string(), serde_json::Value::String(v_set_data.clone()));
                            if let Ok(s) = serde_json::to_string(&obj) {
                                ctx.val.p.set_string(&v_prefix, s);
                            }
                        } else if let (Ok(a), Ok(b)) = (val_str.parse::<f64>(), v_set_data.parse::<f64>()) {
                            ctx.val.p.set_string(&v_prefix, format!("{}", a + b));
                        } else {
                            ctx.val.p.set_string(&v_prefix, format!("{}{}", val_str, v_set_data));
                        }
                    }
                    7 => {
                        // 乘法 / 字符串重复
                        let val_str = ctx.val.p.get_cloned(&v_prefix);
                        if let (Ok(a), Ok(b)) = (val_str.parse::<f64>(), v_set_data.parse::<f64>()) {
                            ctx.val.p.set_string(&v_prefix, format!("{}", a * b));
                        } else if let Ok(b) = v_set_data.parse::<usize>() {
                            ctx.val.p.set_string(&v_prefix, val_str.repeat(b));
                        }
                    }
                    8 => {
                        // 除法
                        let val_str = ctx.val.p.get_cloned(&v_prefix);
                        if let (Ok(a), Ok(b)) = (val_str.parse::<f64>(), v_set_data.parse::<f64>()) {
                            if b != 0.0 {
                                ctx.val.p.set_string(&v_prefix, format!("{}", a / b));
                            }
                        }
                    }
                    9 => {
                        // 取余
                        let val_str = ctx.val.p.get_cloned(&v_prefix);
                        if let (Ok(a), Ok(b)) = (val_str.parse::<f64>(), v_set_data.parse::<f64>()) {
                            if b != 0.0 {
                                ctx.val.p.set_string(&v_prefix, format!("{}", a % b));
                            }
                        }
                    }
                    _ => {}
                }
            }
                5 => {
                    // key::value  纯文本赋值
                    ctx.val.p.set_string(&v_prefix, v_suffix.clone());
                }
                6 => {
                    // key:value  普通赋值
                    if v_prefix.is_empty() {
                        // 无前缀 = 输出
                        ctx.val.p.set_string("行数", (index + 1).to_string());
                        let result = ctx.run_internal_text(text);
                        let evaluated = crate::count::run_count_text(&ctx.val, &result);
                        ctx.output.add(&evaluated);
                    } else if v_suffix.is_empty() {
                        ctx.val.p.set_string(&v_prefix, String::new());
                    } else if v_suffix == "\"\"\"" {
                        ctx.sys.val_text.success = true;
                        ctx.sys.val_text.value_name = v_prefix.clone();
                    } else if v_suffix == "'''" {
                        ctx.sys.val_textr.success = true;
                        ctx.sys.val_textr.value_name = v_prefix.clone();
                    } else if v_suffix == "{" {
                        ctx.sys.set_new_json.success = true;
                        ctx.sys.set_new_json.json = "{".to_string();
                        ctx.sys.set_new_json.len = 1;
                        ctx.sys.set_new_json.value_name = v_prefix.clone();
                    } else if v_suffix == "[" {
                        ctx.sys.set_new_json.success = true;
                        ctx.sys.set_new_json.json = "[".to_string();
                        ctx.sys.set_new_json.len = 1;
                        ctx.sys.set_new_json.value_name = v_prefix.clone();
                    } else {
                        // 先处理 $...$ 语法（$回调$ 等内置函数）
                        let v_suffix = ctx.run_internal_text(&v_suffix);

                        // 运行时 #引入= 热重载（支持批量逗号分隔）
                        if v_suffix.contains("#引入=") {
                            if let Some(paths_str) = v_suffix.strip_prefix("#引入=") {
                                // #引入= 始终创建包（剥离 . 前缀作为包名）
                                let pkg_name = v_prefix.strip_prefix('.').unwrap_or(&v_prefix);
                                for path in paths_str.split(',') {
                                    let path = path.trim();
                                    if !path.is_empty() && !path.starts_with('@') {
                                        ctx.reload_package(pkg_name, path);
                                    }
                                }
                                // 同时存入变量
                                ctx.val.p.set_string(&v_prefix, paths_str.trim().to_string());
                            }
                        } else if v_suffix.starts_with('[') && v_suffix.ends_with(']') {
                            let evaluated = ctx.val.text(&v_suffix);
                            // 无嵌套括号 → 直接 strip 调 count()，跳过 run_count_text
                            let result = if evaluated.len() >= 3 && !evaluated[1..evaluated.len()-1].contains('[') {
                                let inner = &evaluated[1..evaluated.len()-1];
                                match crate::count::count(inner) {
                                    Ok(n) => n.display(),
                                    Err(_) => inner.to_string(),
                                }
                            } else {
                                crate::count::run_count_text(&ctx.val, &evaluated)
                            };
                            ctx.val.p.set_string(&v_prefix, result);
                        } else if v_prefix.contains('[') {
                            if let Some((json_key, sub_keys)) = crate::value::parse_bracket_path(&v_prefix) {
                                let json_key = crate::count::run_count_text(&ctx.val, json_key);
                                let json_str = ctx.val.p.get_cloned(&json_key);
                                if let Ok(mut val) = serde_json::from_str::<serde_json::Value>(&json_str) {
                                    let v_set_data = ctx.val.text(&v_suffix);
                                    let sub_keys: Vec<String> = sub_keys.iter().map(|k| resolve_value(&ctx.val, k)).collect();
                                    json_set_value_mut(&mut val, &sub_keys, &v_set_data);
                                    if let Ok(s) = serde_json::to_string(&val) {
                                        ctx.val.p.set_string(&json_key, s);
                                    }
                                }
                            }
                        } else {
                            // ?: 条件赋值: key: @a ?: b
                            let parts: Vec<&str> = v_suffix.split("?:").collect();
                            for part in &parts {
                                if let Some(key_path) = part.strip_prefix('@') {
                                    if let Some((json_key, sub_keys)) = crate::value::parse_bracket_path(key_path) {
                                        let json_key = crate::count::run_count_text(&ctx.val, json_key);
                                        let json_str = ctx.val.p.get_cloned(&json_key);
                                        if let Ok(val) = serde_json::from_str::<serde_json::Value>(&json_str) {
                                            let sub_keys: Vec<String> = sub_keys.iter().map(|k| resolve_value(&ctx.val, k)).collect();
                                            if let Some(result) = json_navigate(&val, &sub_keys) {
                                                let s = match result {
                                                    serde_json::Value::String(s) => s.clone(),
                                                    serde_json::Value::Null => String::new(),
                                                    other => other.to_string(),
                                                };
                                                ctx.val.p.set_string(&v_prefix, s);
                                                break;
                                            }
                                        }
                                    } else {
                                        let val = ctx.val.p.get_cloned(key_path);
                                        if !val.is_empty() && val != "null" && val != "false" {
                                            ctx.val.p.set_string(&v_prefix, val);
                                            break;
                                        }
                                    }
                                } else {
                                    let result = ctx.val.text(part);
                                    if !result.is_empty() && result != "null" && result != "false" {
                                        ctx.val.p.set_string(&v_prefix, result);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
                _ => {}
            }
            index += 1;
            continue;
    }
}

/* ===================== JSON 工具 ===================== */

fn json_navigate<'a>(val: &'a serde_json::Value, keys: &[String]) -> Option<&'a serde_json::Value> {
    let mut cur = val;
    for key in keys {
        match cur {
            serde_json::Value::Object(map) => {
                cur = map.get(key)?;
            }
            serde_json::Value::Array(arr) => {
                let idx = key.parse::<usize>().ok()?;
                cur = arr.get(idx)?;
            }
            _ => return None,
        }
    }
    Some(cur)
}

fn json_set_value(json: &mut serde_json::Value, keys: &[String], value: &str) {
    if keys.is_empty() { return; }
    let mut cur = json;
    for (i, key) in keys.iter().enumerate() {
        if i == keys.len() - 1 {
            match cur {
                serde_json::Value::Object(map) => {
                    map.insert(key.clone(), serde_json::Value::String(value.to_string()));
                }
                serde_json::Value::Array(arr) => {
                    if let Ok(idx) = key.parse::<usize>() {
                        if idx < arr.len() {
                            arr[idx] = serde_json::Value::String(value.to_string());
                        } else {
                            while arr.len() <= idx {
                                arr.push(serde_json::Value::Null);
                            }
                            arr[idx] = serde_json::Value::String(value.to_string());
                        }
                    }
                }
                _ => {}
            }
            return;
        }
        match cur {
            serde_json::Value::Object(map) => {
                cur = map.entry(key.clone()).or_insert(serde_json::Value::Object(serde_json::Map::new()));
            }
            serde_json::Value::Array(arr) => {
                if let Ok(idx) = key.parse::<usize>() {
                    while arr.len() <= idx {
                        arr.push(serde_json::Value::Object(serde_json::Map::new()));
                    }
                    cur = &mut arr[idx];
                } else {
                    return;
                }
            }
            _ => return,
        }
    }
}

fn json_set_value_mut(json: &mut serde_json::Value, keys: &[String], value: &str) {
    json_set_value(json, keys, value);
}

/// 递归解析值引用，支持 @ 前缀 JSON 导航和 [...] 表达式计算
fn resolve_value(val: &DicVal, s: &str) -> String {
    if let Some(key_path) = s.strip_prefix('@') {
        if let Some((json_key, sub_keys)) = crate::value::parse_bracket_path(key_path) {
            let json_key = crate::count::run_count_text(val, json_key);
            let json_str = val.p.get_cloned(&json_key);
            if let Ok(v) = serde_json::from_str::<serde_json::Value>(&json_str) {
                let sub_keys: Vec<String> = sub_keys.iter()
                    .map(|k| resolve_value(val, k))
                    .collect();
                if let Some(result) = json_navigate(&v, &sub_keys) {
                    return match result {
                        serde_json::Value::String(s) => s.clone(),
                        serde_json::Value::Null => String::new(),
                        other => other.to_string(),
                    };
                }
            }
        }
        return String::new();
    }
    crate::count::run_count_text(val, &val.text_immut(s))
}

/* ===================== Nebula 精简入口 ===================== */

/// Nebula 词库运行时
pub struct Nebula {
    pub build: BuildValue,
    pub ctx: DicContext,
}

#[allow(dead_code)]
impl Nebula {
    /// 打开 .nr 文件（仅解析，不加载变量）
    /// 自动将工作目录切换到词库文件所在目录，使 #引入= 等相对路径正确解析
    pub fn from_file(path: &str) -> Result<Self, String> {
        let p = std::path::Path::new(path);
        // 切换到词库文件所在目录
        if let Some(parent) = p.parent() {
            if !parent.as_os_str().is_empty() {
                std::env::set_current_dir(parent)
                    .map_err(|e| format!("切换工作目录失败: {}", e))?;
            }
        }
        // 切换后只取文件名解析
        let filename = p.file_name()
            .and_then(|n| n.to_str())
            .unwrap_or(path);
        let build = crate::parser::parse_file(filename)?;
        let mut ctx = DicContext::new();
        ctx.sys.source_file = filename.to_string();
        Ok(Nebula { build, ctx })
    }

    /// 加载词库（注入变量优先，词库内变量覆盖）
    pub fn load(&mut self) -> &mut Self {
        self.ctx.load_from_build(&self.build);
        self
    }

    /// 执行头部初始化代码（主词库 + 所有引入包的非变量行统一执行）
    pub fn exec_init(&mut self) -> &mut Self {
        let build = self.build.clone();
        let lines = std::mem::take(&mut Arc::make_mut(&mut self.ctx.shared).init_lines);
        entry(&mut self.ctx, &lines);
        // 执行主词库自身的 [f]初始化
        for func in &build.local_func {
            if func.trigger == "初始化" {
                // 快照当前变量和包，用于执行后清理局部变量/包
                let pre_keys: std::collections::HashSet<String> = self.ctx.val.p.get_all()
                    .iter().map(|(k, _)| k.clone()).collect();
                let pre_pkgs: std::collections::HashSet<String> = self.ctx.shared.packages
                    .keys().cloned().collect();
                self.ctx.val.p.set_string("触发", "初始化".to_string());
                entry(&mut self.ctx, &func.text);
                // 清除执行中新增的无 . 前缀的局部变量
                let leaked: Vec<String> = self.ctx.val.p.get_all().iter()
                    .filter(|(k, _)| !pre_keys.contains(*k) && !k.starts_with('.') && k.as_str() != "触发")
                    .map(|(k, _)| k.clone())
                    .collect();
                for k in &leaked {
                    self.ctx.val.p.remove(k);
                }
                // 清除执行中新增的无 . 前缀对应变量名的包
                // （包名已剥离 . 前缀，通过 .{pkg_name} 变量是否存在来判断是否保留）
                let leaked_pkgs: Vec<String> = self.ctx.shared.packages.keys()
                    .filter(|k| !pre_pkgs.contains(*k) 
                        && self.ctx.val.p.get_cloned(&format!(".{}", k)).is_empty())
                    .cloned()
                    .collect();
                for k in &leaked_pkgs {
                    Arc::make_mut(&mut self.ctx.shared).packages.remove(k);
                }
            }
        }
        self
    }

    /// 注入变量（同时设置局部和全局，优先级低于词库内定义）
    pub fn inject_var(&mut self, key: &str, value: &str) -> &mut Self {
        self.ctx.val.p.set_string(key, value.to_string());
        self.ctx.val.set_g_string(key, value.to_string());
        self
    }

    /// 注入自定义内置函数
    pub fn inject_func(&mut self, name: &str, f: BuiltinFn) -> &mut Self {
        let shared = Arc::make_mut(&mut self.ctx.shared);
        Arc::make_mut(&mut shared.builtins).insert(name.to_string(), f);
        self
    }

    /// 按触发词执行单条词条
    pub fn exec_trigger(&mut self, trigger: &str) -> Result<String, String> {
        for (i, item) in self.build.dic.iter().enumerate() {
            // 优先用 bracket 捕获匹配
            if let Some((cnames, cvals)) = crate::value::match_bracket_trigger(&item.trigger, trigger) {
                self.ctx.val.p.set_string("触发", item.trigger.clone());
                self.ctx.val.p.set_string("行数", i.to_string());
                for (name, val) in cnames.iter().zip(cvals.iter()) {
                    self.ctx.val.p.set_string(name, val.clone());
                }
                entry(&mut self.ctx, &item.text);
                return Ok(self.ctx.output.get());
            }
            // 回退：兼容旧逻辑
            let escaped = regex::escape(&item.trigger);
            if let Ok(re) = regex::Regex::new(&format!("^{}$", &escaped)) {
                if re.is_match(trigger) {
                    self.ctx.val.p.set_string("触发", item.trigger.clone());
                    self.ctx.val.p.set_string("行数", i.to_string());
                    entry(&mut self.ctx, &item.text);
                    return Ok(self.ctx.output.get());
                }
            }
            if escaped != item.trigger {
                if let Ok(re) = regex::Regex::new(&format!("^{}$", &item.trigger)) {
                    if let Some(caps) = re.captures(trigger) {
                        self.ctx.val.p.set_string("触发", item.trigger.clone());
                        self.ctx.val.p.set_string("行数", i.to_string());
                        // 括号N 捕获变量
                        for j in 1..caps.len() {
                            if let Some(m) = caps.get(j) {
                                self.ctx.val.p.set_string(&format!("括号{}", j), m.as_str().to_string());
                            }
                        }
                        entry(&mut self.ctx, &item.text);
                        return Ok(self.ctx.output.get());
                    }
                }
            }
        }
        Err(format!("触发词 '{}' 未找到", trigger))
    }

    /// 执行 [函数] 块
    pub fn exec_func(&mut self, func_name: &str) -> Result<String, String> {
        if let Some((code, param_names, _defaults, _is_variadic, func_line)) = self.ctx.find_func_prefix(func_name)
            .or_else(|| self.ctx.find_internal(func_name).map(|c| (c, Vec::new(), Vec::new(), false, 0)))
        {
            self.ctx.sys.line_offset = func_line;
            let head_output = self.ctx.output.get();
            self.ctx.output.clear();
            // 检查 load/init 阶段是否有致命错误（#引入= 等）
            if let Some(err) = self.ctx.sys.error.take() {
                return Err(err);
            }
            if self.ctx.sys.stop {
                return Err(head_output.trim_end().to_string());
            }
            self.ctx.val.p.set_string("触发", func_name.to_string());
            self.ctx.val.p.set_string("self", func_name.to_string());
            self.ctx.val.p.set_string("参数0", func_name.to_string());
            // 初始化命名参数为空字符串
            for p in &param_names {
                self.ctx.val.p.set_string(p, String::new());
            }
            entry(&mut self.ctx, &code);
            let func_output = self.ctx.output.get();
            if head_output.is_empty() {
                Ok(func_output)
            } else if func_output.is_empty() {
                Ok(head_output)
            } else {
                Ok(format!("{}\n{}", head_output, func_output))
            }
        } else {
            Err(format!("函数 '{}' 未找到", func_name))
        }
    }

    /// 执行全部词条（从上到下）
    pub fn exec_all(&mut self) -> String {
        for item in &self.build.dic {
            entry(&mut self.ctx, &item.text);
        }
        self.ctx.output.get()
    }
}
