use std::collections::{HashMap, HashSet};
use std::sync::{Arc, mpsc::Sender};
use crate::value::{DicVal, Scope};
use crate::parser::{BuildDic, BuildValue};
use crate::analyzer::val_text_test;
use crate::file_lock;
use crate::debug::DebugHandle;

/* ===================== 状态机 ===================== */

/// `find_func_prefix` 返回值：(代码列表, 参数名列表, 默认值列表, 是否可变参数, 文件行偏移)
type FuncPrefixResult = (Vec<String>, Vec<String>, Vec<Option<String>>, bool, usize);
/// `find_trigger` 返回值：(代码列表, 触发名, 捕获名列表, 捕获值列表)
type TriggerResult = (Vec<String>, String, Vec<String>, Vec<String>);

/// 输出累积器
/// 双管道设计：
/// - 打印管道（print_parts）：所有需要输出到终端的内容，保持有序
/// - 返回管道（return_parts）：仅函数返回值（构造函数 handle 等）
///   每次 add_return 会同时写入打印管道以维持顺序
#[derive(Debug, Clone, Default)]
#[allow(dead_code)]
pub struct Output {
    print_parts: Vec<String>,
    return_parts: Vec<String>,
    /// \r 延迟输出缓冲区：\r 后缀的行暂存于此，函数结束时 flush 到 print_parts
    pending: Vec<String>,
}

#[allow(dead_code)]
impl Output {
    pub fn new() -> Self {
        Output { print_parts: Vec::new(), return_parts: Vec::new(), pending: Vec::new() }
    }

    /// 写入打印管道
    pub fn add_print(&mut self, s: &str) {
        if s.is_empty() { return; }
        self.print_parts.push(s.to_string());
    }

    /// 写入打印管道（String 版本）
    pub fn add_print_string(&mut self, s: String) {
        if s.is_empty() { return; }
        self.print_parts.push(s);
    }

    /// 写入返回管道（同时写入打印管道以保持顺序）
    pub fn add_return(&mut self, s: &str) {
        if s.is_empty() { return; }
        self.print_parts.push(s.to_string());
        self.return_parts.push(s.to_string());
    }

    /// 获取打印管道内容
    pub fn get_print(&self) -> String {
        self.print_parts.join("")
    }

    /// 获取返回管道内容
    pub fn get_return(&self) -> String {
        self.return_parts.join("")
    }

    /// 如果最后一个 print_part 以 \n 结尾，去掉该 \n
    pub fn strip_trailing_newline(&mut self) {
        if let Some(last) = self.print_parts.last_mut() {
            if last.ends_with('\n') {
                last.pop();
            }
        }
    }

    /// 清空所有管道
    pub fn clear(&mut self) {
        self.print_parts.clear();
        self.return_parts.clear();
        self.pending.clear();
    }

    // === \r 延迟输出 ===

    /// 将文本加入 \r 延迟缓冲区
    pub fn add_pending(&mut self, s: &str) {
        if s.is_empty() { return; }
        self.pending.push(s.to_string());
    }

    /// 延迟缓冲区是否非空
    pub fn has_pending(&self) -> bool {
        !self.pending.is_empty()
    }

    /// 将延迟缓冲区的内容追加到打印管道末尾
    pub fn flush_pending(&mut self) {
        self.print_parts.append(&mut self.pending);
    }

    /// 返回 print_parts 的长度，用于捕获函数调用期间的输出增量
    pub fn print_len(&self) -> usize {
        self.print_parts.len()
    }

    /// 将 from_idx 及之后的 print_parts 移动到 pending 缓冲区
    /// \r 语义：确保末尾有 \n（换行），再延迟输出
    pub fn move_tail_to_pending(&mut self, from_idx: usize) {
        let mut tail: Vec<String> = self.print_parts.drain(from_idx..).collect();
        if let Some(last) = tail.last_mut() {
            if !last.ends_with('\n') {
                last.push('\n');
            }
        }
        for s in tail {
            if !s.is_empty() {
                self.pending.push(s);
            }
        }
    }

    /// 仅将最后一个 print_part 移动到 pending（自动加 \n 保证换行）
    /// 用于构造函数 \r：构造函数体 $打印$ 立即输出，仅返回值 0x 指针延迟
    pub fn move_last_to_pending(&mut self) {
        if let Some(last) = self.print_parts.pop() {
            if !last.is_empty() {
                let s = if last.ends_with('\n') { last } else { last + "\n" };
                self.pending.push(s);
            }
        }
    }

    /// 将另一个 Output 的 print_parts 逐个追加到当前 Output
    /// （避免 get_print() 拼接导致 $打印$ 的 \n 混入中间）
    pub fn append_print_from(&mut self, other: &Output) {
        for part in &other.print_parts {
            if !part.is_empty() {
                self.print_parts.push(part.clone());
            }
        }
    }

    /// 从 from_idx 开始快照 print_parts（不 drain），返回拼接后的字符串
    pub fn snapshot_print_from(&self, from_idx: usize) -> String {
        if from_idx >= self.print_parts.len() {
            return String::new();
        }
        self.print_parts[from_idx..].join("")
    }

    /// 快照 print_parts[from..to]（不 drain），返回拼接后的字符串
    pub fn snapshot_print_range(&self, from: usize, to: usize) -> String {
        if from >= self.print_parts.len() || to <= from {
            return String::new();
        }
        let to = to.min(self.print_parts.len());
        self.print_parts[from..to].join("")
    }

    /// 从 from_idx 开始 drain print_parts 并返回拼接后的字符串
    pub fn drain_print_from(&mut self, from_idx: usize) -> String {
        if from_idx >= self.print_parts.len() {
            return String::new();
        }
        let drained: Vec<String> = self.print_parts.drain(from_idx..).collect();
        drained.join("")
    }

    /// 排空 pending 缓冲区并返回拼接后的字符串
    pub fn drain_pending(&mut self) -> String {
        if self.pending.is_empty() {
            return String::new();
        }
        let drained: Vec<String> = self.pending.drain(..).collect();
        drained.join("")
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

    /// 标记最近一次 exec_func_call 是否是构造函数调用
    /// 用于 Stmt::FuncCall 的 \r 处理：构造函数体的 $打印$ 应即时输出，仅返回值延迟
    pub last_call_was_ctor: bool,

    pub if_func: IfFuncState,
    pub for_state: ForState,
    pub for_each: ForEachState,
    pub func_state: FuncState,
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

}

#[derive(Debug, Clone, Default)]
pub struct IfFuncState {
    pub success: bool,
}

#[derive(Debug, Clone, Default)]
pub struct ForState {
    pub success: bool,
    pub is_for: bool,
    pub jump: bool,
}

#[derive(Debug, Clone, Default)]
pub struct ForEachState {
    pub success: bool,
    pub is_for: bool,
    pub jump: bool,
}

#[derive(Debug, Clone, Default)]
pub struct FuncState {
    pub success: bool,
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
    /// DAP 调试句柄：统一封装调试模式所需的共享状态和通信通道
    pub debug: Option<DebugHandle>,
}

#[derive(Debug, Clone)]
#[allow(dead_code)]
pub struct FuncInfo {
    pub name: String,
    pub params: Vec<(String, String)>, // (参数名, 默认值)
    pub text: Vec<String>,
}

/// 从路径推导包名（用于 #引入 / #引入*= 分支查找 packages map）
pub(crate) fn resolve_pkg_key(path: &str) -> String {
    if crate::functions::is_stdlib_path(path) {
        path[1..].to_string()
    } else {
        let p = std::path::Path::new(path);
        if path.ends_with(".nr") {
            p.file_stem().and_then(|s| s.to_str()).unwrap_or(path).to_string()
        } else {
            p.file_name().and_then(|s| s.to_str()).unwrap_or(path).to_string()
        }
    }
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
        };
        let mut ctx = DicContext {
            val: DicVal::new(),
            sys: SysV::default(),
            output: Output::new(),
            shared: Arc::new(shared),
            reloading_dirs: HashSet::new(),
            debug: None,
        };
        crate::functions::register_builtins(&mut ctx);
        ctx
    }

    pub fn load_from_build(&mut self, bv: &BuildValue) {
        // 所有 head 行统一收集到 init_lines，由 exec_init 按顺序执行
        // 只有 #引入= 包引入需要在此立即处理以获取包变量
        // 头部变量仅设为局部
        let mut loaded_pkgs: std::collections::HashSet<String> = std::collections::HashSet::new();
        let mut processed_heads: std::collections::HashSet<String> = std::collections::HashSet::new();
        let shared = Arc::make_mut(&mut self.shared);

        /// 加载包 head 变量到作用域，set_local 控制是否同时设置无前缀的本地变量
        fn load_head_vars(val: &mut DicVal, shared: &mut SharedContext, pkg_bv: &BuildValue, pkg_key: &str, set_local: bool) {
            for pkg_line in &pkg_bv.head {
                let (pv_type, pv_prefix, pv_suffix) = val_text_test(pkg_line);
                if pv_type == 6 && !pv_prefix.is_empty() {
                    if val.p.get(&pv_prefix).is_some() {
                        continue;
                    }
                    let pv_final = compute_head_value(val, &pv_suffix);
                    if set_local {
                        val.p.set_string(&pv_prefix, pv_final.clone());
                    }
                    let prefixed_key = format!("{}.{}", pkg_key, pv_prefix);
                    val.p.set_string(&prefixed_key, pv_final);
                } else if !pkg_line.trim().is_empty() {
                    shared.init_lines.push(pkg_line.clone());
                }
            }
        }

        for line in &bv.head {
            shared.init_lines.push(line.clone());

            let (v_type, v_prefix, v_suffix) = val_text_test(line);
            if v_type == 6 && !v_prefix.is_empty() && v_suffix.contains("#引入=") && !loaded_pkgs.contains(&v_prefix) {
                loaded_pkgs.insert(v_prefix.clone());
                // 包名已剥离 . 前缀
                let pkg_lookup = v_prefix.strip_prefix('.').unwrap_or(&v_prefix);
                // #引入 返回指针对象（0x 池句柄），而非路径字符串
                let handle = crate::functions::pool_alloc_package(pkg_lookup);
                self.val.p.set_string(&v_prefix, handle);
                // 从 init_lines 中移除对该变量的旧赋值，防止 exec_init 覆盖池指针
                shared.init_lines.retain(|line| {
                    let (t, p, _) = val_text_test(line);
                    !(t == 6 && p == v_prefix)
                });
                if let Some(pkg_bv) = bv.packages.get(pkg_lookup) {
                    if !processed_heads.insert(pkg_lookup.to_string()) { continue; }
                    load_head_vars(&mut self.val, shared, pkg_bv, pkg_lookup, false);
                }
            }

            // 星引入 #引入*=path：加载被引入包的 head 变量到当前作用域
            if line.starts_with("#引入*=") {
                let raw_path = line.strip_prefix("#引入*=").unwrap_or("").trim();
                for path in raw_path.split(',').map(|s| s.trim()).filter(|s| !s.is_empty()) {
                    let pkg_key = resolve_pkg_key(path);
                    if let Some(pkg_bv) = bv.packages.get(&pkg_key) {
                        if !processed_heads.insert(pkg_key.clone()) { continue; }
                        // 清理该包的旧星引入函数映射，再重新注册
                        shared.star_import_funcs.retain(|_, v| v != &pkg_key);
                        let pk = pkg_key.clone();
                        for func in pkg_bv.local_func.iter().chain(pkg_bv.local_static.iter()) {
                            shared.star_import_funcs.insert(func.trigger.clone(), pk.clone());
                            let base_name = func.trigger.split(' ').next().unwrap_or(&func.trigger).to_string();
                            if base_name != func.trigger {
                                shared.star_import_funcs.entry(base_name).or_insert_with(|| pk.clone());
                            }
                        }
                        // 加载包 head 变量，同时设置本地变量（不覆盖已有）
                        load_head_vars(&mut self.val, shared, pkg_bv, &pkg_key, true);
                    }
                }
            }
            // 引入 #引入=path：加载被引入包的 head 变量和可执行行
            if line.starts_with("#引入=") && !line.starts_with("#引入*=") {
                let raw_path = line.strip_prefix("#引入=").unwrap_or("").trim();
                let pkg_key = resolve_pkg_key(raw_path);
                if let Some(pkg_bv) = bv.packages.get(&pkg_key) {
                    if !processed_heads.insert(pkg_key.clone()) { continue; }
                    // 为无前缀的 #引入=path 也分配包指针，使 %包名% 可访问
                    if self.val.p.get(&pkg_key).is_none() {
                        let handle = crate::functions::pool_alloc_package(&pkg_key);
                        self.val.p.set_string(&pkg_key, handle);
                        // 从 init_lines 中移除对该变量的旧赋值，防止 exec_init 覆盖池指针
                        shared.init_lines.retain(|line| {
                            let (t, p, _) = val_text_test(line);
                            !(t == 6 && p == pkg_key)
                        });
                    }
                    load_head_vars(&mut self.val, shared, pkg_bv, &pkg_key, false);
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
        for module in bv.packages.values()
            .filter_map(|pkg_bv| crate::functions::is_stdlib_package(pkg_bv))
        {
            crate::functions::StdLib::register_module(self, module);
        }
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

    /// 注入变量（同时设置局部和全局）
    pub fn inject_var(&mut self, key: &str, value: String) {
        self.val.p.set_string(key, value.clone());
        self.val.set_global(key, value);
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
                let local_override = self.val.p.resolve(&override_key);
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
                self.output.add_print(&format!("[错误] {}引入文件不存在或不为 .nr 文件：{}（#引入={}）\n", file_info, actual_path, path));
                self.sys.stop = true;
                return;
            }
        }

        // 防循环引入
        let canon_str;
        {
            let canon = std::path::Path::new(&actual_path).canonicalize().unwrap_or_else(|_| std::path::Path::new(&actual_path).to_path_buf());
            canon_str = canon.to_string_lossy().to_string();
            // 防递归：若该文件正在加载中，报错
            if !self.reloading_dirs.insert(canon_str.clone()) {
                let file_info = self.sys.file_location();
                self.output.add_print(&format!("[错误] {}循环引入：{}（#引入={}）\n", file_info, actual_path, path));
                self.sys.stop = true;
                return;
            }
        }
        let data = std::fs::read_to_string(&actual_path).ok();
        let Some(data) = data else { self.reloading_dirs.remove(&canon_str); return; };
        crate::parser::invalidate_parse_cache(&actual_path);
        if let Ok(pkg_bv) = crate::parser::build_dic(&actual_path, &data) {
            // 处理头部赋值行和可执行行
            for line in &pkg_bv.head {
                let (pv_type, pv_prefix, pv_suffix) = val_text_test(line);
                if pv_type == 6 && !pv_prefix.is_empty() {
                    let head_val = compute_head_value(&mut self.val, &pv_suffix);
                    self.val.p.set_string(&pv_prefix, head_val);
                } else if !line.trim().is_empty() {
                    entry(self, &[line.clone()]);
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
        self.reloading_dirs.remove(&canon_str);
    }

    /// 运行时重新加载文件夹类型的 #引入= 包
    fn reload_package_dir(&mut self, pkg_name: &str, dir_path: &str) {
        let dir = std::path::Path::new(dir_path);
        if !dir.is_dir() {
            let file_info = self.sys.file_location();
            self.output.add_print(&format!("[错误] {}引入目标不存在：{}（#引入={}）\n", file_info, dir_path, dir_path));
            self.sys.stop = true;
            return;
        }
        // 防递归：若该目录正在加载中，报错
        let canon = dir.canonicalize().unwrap_or_else(|_| dir.to_path_buf());
        let canon_str = canon.to_string_lossy().to_string();
        if !self.reloading_dirs.insert(canon_str.clone()) {
            let file_info = self.sys.file_location();
            self.output.add_print(&format!("[错误] {}循环引入：{}（#引入={}）\n", file_info, dir_path, dir_path));
            self.sys.stop = true;
            return;
        }

        // 先尝试加载同名 .nr 文件（如 web.nr 配套 web/ 目录），执行其 head 和 init
        let nr_file = format!("{}.nr", dir_path);
        if std::path::Path::new(&nr_file).is_file() {
            if let Ok(data) = file_lock::with_file_read(std::path::Path::new(&nr_file), || std::fs::read_to_string(&nr_file)) {
                if let Ok(file_bv) = crate::parser::build_dic(&nr_file, &data) {
                    // 处理头部赋值行和可执行行
                    for line in &file_bv.head {
                        let (pv_type, pv_prefix, pv_suffix) = val_text_test(line);
                        if pv_type == 6 && !pv_prefix.is_empty() {
                            let head_val = compute_head_value(&mut self.val, &pv_suffix);
                            self.val.p.set_string(&pv_prefix, head_val);
                        } else if !line.trim().is_empty() {
                            entry(self, &[line.clone()]);
                        }
                    }
                }
            }
        }

        crate::parser::invalidate_parse_cache(dir_path);
        match crate::parser::merge_dir_package(dir_path) {
            Ok(merged_bv) => {
                // 处理头部赋值行和可执行行
                for line in &merged_bv.head {
                    let (pv_type, pv_prefix, pv_suffix) = val_text_test(line);
                    if pv_type == 6 && !pv_prefix.is_empty() {
                            let head_val = compute_head_value(&mut self.val, &pv_suffix);
                            self.val.p.set_string(&pv_prefix, head_val);
                    } else if !line.trim().is_empty() {
                        entry(self, &[line.clone()]);
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
                self.output.add_print(&format!("{} {}\n", file_info, e));
                self.sys.stop = true;
            }
        }
        self.reloading_dirs.remove(&canon_str);
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

    /// $包.类 参数$ → OOP 构造函数执行，返回实例指针（如 *1）
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
                    sub_ctx.inject_var(&v_prefix, value);
                }
            }
            for line in &pkg_data.head {
                let (v_type, v_prefix, _) = val_text_test(line);
                if v_type != 6 || v_prefix.is_empty() {
                    entry(&mut sub_ctx, &[line.clone()]);
                }
            }
        }

        let class_spec = format!("{}.{}", pkg, class);
        sub_ctx.val.p.set_string("self", class_spec.clone());
        let ctor_name_s = ctor_name.to_string();
        sub_ctx.val.p.set_string("触发", ctor_name_s.clone());
        sub_ctx.val.p.set_string("参数0", ctor_name_s);

        for (i, arg) in args.iter().skip(1).enumerate() {
            let val = self.val.text(arg);
            sub_ctx.val.p.set_string(&format!("参数{}", i + 1), val);
        }

        entry(&mut sub_ctx, code);

        let handle = crate::functions::pool_alloc_instance(&class_spec);
        self.save_ctor_instance_vars(&sub_ctx, &handle);

        let output = sub_ctx.output.get_print();
        if !output.is_empty() {
            self.output.add_print(&crate::analyzer::unescape_newline(&output));
        }

        handle
    }

    /// 按空格前缀匹配 [f] 函数：trigger 首段=函数名，后续段=参数名
    /// 返回 (代码, 参数名列表, 默认值列表, 是否可变参数)
    /// 如 trigger="add num=1"，查找 "add" → 返回 (code, ["num"], [Some("1")], false)
    pub fn find_func_prefix(&self, func_name: &str) -> Option<FuncPrefixResult> {
        let prefix = format!("{} ", func_name);
        for item in &self.shared.local_func {
            if item.trigger == func_name {
                // line_offset = BuildDic.line + 1（1-based，函数首行体的文件行号）
                return Some((item.text.clone(), Vec::new(), Vec::new(), false, item.line + 1));
            }
            if item.trigger.starts_with(&prefix) {
                let (param_names, defaults, is_variadic) = crate::functions::parse_param_defs(&item.trigger[prefix.len()..]);
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
                    let pure_class = crate::functions::pure_class_name(&self_class);
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
                        // 解析对象名，查找方法
                            let resolved_obj = self.val.text(&format!("%{}%", raw_obj));
                            // 0x 指针 → 从池中获取完整 class_spec（含包名），避免丢失包上下文
                            let (oop_pkg, oop_class, oop_from_pool): (Option<String>, String, bool) = if let Some((class_spec, _)) = crate::functions::resolve_class_from_pool(&resolved_obj) {
                                if let Some(dot_pos) = class_spec.rfind('.') {
                                    (Some(class_spec[..dot_pos].to_string()), class_spec[dot_pos+1..].to_string(), true)
                                } else {
                                    // class_spec 无点号 → 包指针（来自 #引入），class_spec 即包名
                                    (Some(class_spec.clone()), class_spec, true)
                                }
                            } else {
                                let pure_class = crate::functions::pure_class_name(&resolved_obj);
                                if let Some(dot_pos) = pure_class.rfind('.') {
                                    (Some(pure_class[..dot_pos].to_string()), pure_class[dot_pos+1..].to_string(), false)
                                } else {
                                    (None, pure_class.to_string(), false)
                                }
                            };
                            let qualified = if resolved_obj.contains('%') {
                                format!("{}.{}", raw_obj, method)
                            } else {
                                format!("{}.{}", oop_class, method)
                            };
                            let mut param_names: Vec<String> = Vec::new();
                            let mut param_defaults: Vec<Option<String>> = Vec::new();
                            let mut is_ctor = false;
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
                                            let (names, defs, _variadic) = crate::functions::parse_param_defs(&item.trigger[prefix.len()..]);
                                            param_names = names;
                                            param_defaults = defs;
                                            return Some((item.text.clone(), Vec::new(), Vec::new()));
                                        }
                                    }
                                    None
                                })
                                .or_else(|| {
                                    // 包指针（oop_class == pkg_name，无实际类名，来自 #引入）：直接在包中搜索
                                    if let Some(ref pkg_name) = oop_pkg {
                                        if oop_class == *pkg_name {
                                            if let Some(pkg) = self.shared.packages.get(pkg_name) {
                                                // 构造函数搜索
                                                if let Some((text, _, _)) = crate::functions::search_pkg_ctor(pkg, method) {
                                                    is_ctor = true;
                                                    return Some((text, Vec::new(), Vec::new()));
                                                }
                                                // 直接方法搜索（无类名前缀）
                                                if let Some((text, names, defs, _, _)) = crate::functions::search_pkg_method_direct(pkg, method) {
                                                    param_names = names;
                                                    param_defaults = defs;
                                                    return Some((text, Vec::new(), Vec::new()));
                                                }
                                            }
                                            return None;
                                        }
                                    }
                                    // 实例来自包（如 "*1"），在包中搜索 "{类}.{方法}"
                                    let class_method = format!("{}.{}", oop_class, method);
                                    // 构造函数优先检测
                                    let search_pkg_ctor = |pkg: &crate::parser::BuildValue| -> Option<(Vec<String>, Vec<String>, Vec<Option<String>>)> {
                                        crate::functions::search_pkg_ctor(pkg, method).map(|(text, _, _)| (text, Vec::new(), Vec::new()))
                                    };
                                    // 精确搜索：trigger == class_method 或 trigger 以 class_method + 空格开头
                                    let search_pkg_exact = |pkg: &crate::parser::BuildValue| -> Option<(Vec<String>, Vec<String>, Vec<Option<String>>)> {
                                        crate::functions::search_pkg_method_exact_or_prefix(pkg, &class_method).map(|(text, names, defs, _, _)| (text, names, defs))
                                    };
                                    // 模糊搜索：trigger 匹配 *.method 或 *.method params
                                    let search_pkg_fuzzy = |pkg: &crate::parser::BuildValue| -> Option<(Vec<String>, Vec<String>, Vec<Option<String>>)> {
                                        crate::functions::fuzzy_search_pkg_method(pkg, method).map(|(text, names, defs, _, _)| (text, names, defs))
                                    };
                                    // raw_obj 是已知包别名 → 优先搜该包（含构造函数）
                                    // 但如果变量被 0x 池句柄覆盖，则包别名失效
                                    let interp_pkg_active = !resolved_obj.starts_with("0x") && !resolved_obj.starts_with("-0x");
                                    if interp_pkg_active {
                                    if let Some(raw_pkg) = self.shared.packages.get(raw_obj) {
                                        if let Some((text, names, defs)) = search_pkg_ctor(raw_pkg) {
                                            is_ctor = true;
                                            param_names = names;
                                            param_defaults = defs;
                                            return Some((text, Vec::new(), Vec::new()));
                                        }
                                        if let Some((text, names, defs)) = search_pkg_exact(raw_pkg).or_else(|| search_pkg_fuzzy(raw_pkg)) {
                                            param_names = names;
                                            param_defaults = defs;
                                            return Some((text, Vec::new(), Vec::new()));
                                        }
                                    }
                                    }
                                    if let Some(ref pkg_name) = oop_pkg {
                                        if let Some(pkg) = self.shared.packages.get(pkg_name) {
                                            // 仅当 oop_pkg 来自非池化路径时才搜构造函数（实例池中的对象已存在）
                                            if !oop_from_pool {
                                                if let Some((text, names, defs)) = search_pkg_ctor(pkg) {
                                                    is_ctor = true;
                                                    param_names = names;
                                                    param_defaults = defs;
                                                    return Some((text, Vec::new(), Vec::new()));
                                                }
                                            }
                                            if let Some((text, names, defs)) = search_pkg_exact(pkg).or_else(|| search_pkg_fuzzy(pkg)) {
                                                param_names = names;
                                                param_defaults = defs;
                                                return Some((text, Vec::new(), Vec::new()));
                                            }
                                        }
                                    } else {
                                        // oop_pkg 为空（*N 解析后类名无包前缀）：扫描所有包
                                        // 但如果包别名已失效（变量被 0x 覆盖），不执行全包扫描
                                        // 如果 oop_class 含 %（变量未解析），也不执行
                                        if interp_pkg_active && !oop_class.contains('%') {
                                        for (_, pkg) in self.shared.packages.iter() {
                                            if let Some((text, names, defs)) = search_pkg_exact(pkg).or_else(|| search_pkg_fuzzy(pkg)) {
                                                param_names = names;
                                                param_defaults = defs;
                                                return Some((text, Vec::new(), Vec::new()));
                                            }
                                        }
                                        }
                                    }
                                    None
                                });
                            if let Some((code, cnames, cvals)) = found {
                                let mut sub_ctx = self.fresh_sub_context();
                                // 如果方法来自包，注入包上下文（函数/词条/trigger/head变量）
                                if let Some(ref pkg_name) = oop_pkg {
                                    if let Some(pkg_data) = self.shared.packages.get(pkg_name) {
                                        crate::functions::inject_pkg_context(&mut sub_ctx, pkg_data);
                                        crate::functions::process_pkg_head_vars(&self.val, &mut sub_ctx, pkg_data, None);
                                    }
                                }
                                for (i, (name, val)) in cnames.iter().zip(cvals.iter()).enumerate() {
                                    sub_ctx.val.p.set_string(name, val.clone());
                                    sub_ctx.val.p.set_string(&format!("参数{}", i), val.clone());
                                }
                                // 实例变量持久化：加载 .field
                                self.load_instance_vars(&mut sub_ctx, raw_obj, &resolved_obj);
                                sub_ctx.val.p.set_string("self", resolved_obj.clone());
                                sub_ctx.val.p.set_string("触发", qualified.clone());
                                sub_ctx.val.p.set_string("参数0", qualified);
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
                                // OOP 构造函数：分配实例池，返回 0x 内存地址指针
                                if is_ctor {
                                    // 包指针（oop_class == pkg_name）时，实际类名是 method 而非 oop_class
                                    let actual_class = if let Some(ref pkg) = oop_pkg {
                                        if oop_class == *pkg { method } else { &oop_class }
                                    } else {
                                        &oop_class
                                    };
                                    let class_spec = if let Some(ref pkg) = oop_pkg {
                                        format!("{}.{}", pkg, actual_class)
                                    } else if self.shared.packages.get(raw_obj).is_some() {
                                        format!("{}.{}", raw_obj, actual_class)
                                    } else {
                                        actual_class.to_string()
                                    };
                                    let handle = crate::functions::pool_alloc_instance(&class_spec);
                                    self.save_ctor_instance_vars(&sub_ctx, &handle);
                                    // 构造函数：丢弃原始输出，仅返回 0x 指针
                                    result.push_str(&handle);
                                } else {
                                    // 实例变量持久化：保存 .field 回主上下文
                                    self.save_instance_vars(&sub_ctx, raw_obj, &resolved_obj);
                                    result.push_str(&sub_ctx.output.get_print());
                                }
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
                    let is_self = self.val.p.eq_str("self", func_name);
                    if is_self {
                        // 自调用：保留变量上下文，继承当前所有变量
                        let mut sub_ctx = self.clone_for_internal();
                        sub_ctx.sys.line_offset = func_line;
                        let func_name_resolved = self.val.text(func_name);
                        sub_ctx.val.p.set_string("触发", func_name_resolved.clone());
                        sub_ctx.val.p.set_string("self", func_name_resolved.clone());
                        sub_ctx.val.p.set_string("参数0", func_name_resolved);
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
                            // 指针变量回写
                            crate::functions::writeback_ptr_vars(self, &sub_ctx, &args[1..], &param_names, 0);
                            result.push_str(&sub_ctx.output.get_print());
                        }
                    } else {
                        // 跨函数调用 —— 全新变量上下文，变量隔离
                        let mut sub_ctx = self.fresh_sub_context();
                        sub_ctx.sys.line_offset = func_line;
                        sub_ctx.sys.source_file = self.sys.source_file.clone();
                        // 注入变量：星引入函数用源包的 head 变量（隔离），否则用父上下文变量
                        crate::functions::inject_star_import_head_vars(self, &mut sub_ctx, func_name);
                        let func_name_resolved = self.val.text(func_name);
                        sub_ctx.val.p.set_string("触发", func_name_resolved.clone());
                        sub_ctx.val.p.set_string("self", func_name_resolved.clone());
                        sub_ctx.val.p.set_string("参数0", func_name_resolved);
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
                            // 指针变量回写
                            crate::functions::writeback_ptr_vars(self, &sub_ctx, &args[1..], &param_names, 0);
                            result.push_str(&sub_ctx.output.get_print());
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
        ctx.debug = None;
        ctx
    }

    /// 为子调用（函数/OOP方法）创建全新变量上下文，变量完全隔离
    /// p.enclosing 直接指向 g（全局根），不链入父调用者的局部变量（Python 函数语义）
    pub(crate) fn fresh_sub_context(&self) -> DicContext {
        let g = self.val.global();
        let p = Scope::with_enclosing(Arc::clone(&g));
        DicContext {
            val: DicVal { p, g },
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
            }),
            reloading_dirs: self.reloading_dirs.clone(),
            debug: None,
        }
    }

    /// 加载实例变量 (.field) 到子上下文，以 raw_obj 和 resolved_obj 为前缀
    pub(crate) fn load_instance_vars(&self, sub_ctx: &mut DicContext, raw_obj: &str, resolved_obj: &str) {
        for prefix in [&format!("{}.", raw_obj), &format!("{}.", resolved_obj)] {
            for (key, val) in self.val.p.iter_local() {
                if let Some(field) = key.strip_prefix(prefix.as_str()) {
                    let dot_key = format!(".{}", field);
                    if !sub_ctx.val.p.contains_key_local(&dot_key) {
                        sub_ctx.val.p.set_string(&dot_key, val.display());
                    }
                    sub_ctx.val.p.set_string(key, val.display());
                }
            }
        }
    }

    /// 保存子上下文实例变量 (.field) 回主上下文（非构造函数执行后）
    pub(crate) fn save_instance_vars(&mut self, sub_ctx: &DicContext, raw_obj: &str, resolved_obj: &str) {
        for (key, val) in sub_ctx.val.p.iter_local() {
            if let Some(field) = key.strip_prefix('.') {
                self.val.p.set_string(&format!("{}.{}", raw_obj, field), val.display());
                if resolved_obj != raw_obj {
                    self.val.p.set_string(&format!("{}.{}", resolved_obj, field), val.display());
                }
            }
        }
    }

    /// 保存构造函数实例变量，以 0x handle 为前缀
    pub(crate) fn save_ctor_instance_vars(&mut self, sub_ctx: &DicContext, handle: &str) {
        for (key, val) in sub_ctx.val.p.iter_local() {
            if let Some(field) = key.strip_prefix('.') {
                self.val.p.set_string(&format!("{}.{}", handle, field), val.display());
            }
        }
    }
}

/// 计算 head 行变量的值：先做 %var% 替换，再对 [...] 做数学求值
fn compute_head_value(val: &mut DicVal, suffix: &str) -> String {
    let processed = val.text(suffix);
    if suffix.starts_with('[') && suffix.ends_with(']') {
        crate::count::run_count_text(val, &processed)
    } else {
        processed
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

/* ===================== Entry 主解释器 ===================== */

/// 执行词库代码块（通过 AST executor）
pub fn entry(ctx: &mut DicContext, txt: &[String]) {
    match crate::executor::parse_stmts(txt, false, ctx.sys.line_offset, &ctx.sys.source_file) {
        Ok(stmts) => {
            if let Some(ref dbg) = ctx.debug {
                let debug_ctx = crate::executor::DebugContext {
                    shared: Arc::clone(&dbg.shared),
                    event_tx: Sender::clone(&dbg.event_tx),
                    cmd_rx: Arc::clone(&dbg.cmd_rx),
                    depth: 0,
                    defer_output: false,
                };
                crate::executor::exec_stmts(ctx, &stmts, Some(&debug_ctx));
                return;
            }
            crate::executor::exec_stmts(ctx, &stmts, None);
        }
        Err(e) => {
            // 所有解析错误均为致命错误，输出详细信息并停止执行
            let location = ctx.sys.file_location();
            eprintln!("\x1b[91m{}解析错误: {}\x1b[0m", location, e);
            ctx.sys.stop = true;
            ctx.sys.error = Some(format!("{}{}", location, e));
        }
    }
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
        // 在切换 cwd 前解析绝对路径（供调试器断点匹配用）
        let absolute_path = p.canonicalize().unwrap_or_else(|_| {
            if p.is_absolute() {
                p.to_path_buf()
            } else {
                std::env::current_dir()
                    .unwrap_or_else(|_| std::path::PathBuf::from("."))
                    .join(p)
            }
        });
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
        // 去除 Windows canonicalize 产生的 \\?\ 前缀，并统一为正斜杠（与 VS Code URI 一致）
        let clean_path = crate::analyzer::normalize_source_path(&absolute_path.to_string_lossy());
        ctx.sys.source_file = clean_path;
        Ok(Nebula { build, ctx })
    }

    /// 加载词库（注入变量优先，词库内变量覆盖）
    pub fn load(&mut self) -> &mut Self {
        self.ctx.load_from_build(&self.build);
        self
    }

    /// 执行头部初始化代码（主词库 + 所有引入包的非变量行统一执行）
    pub fn exec_init(&mut self) -> &mut Self {
        let lines = std::mem::take(&mut Arc::make_mut(&mut self.ctx.shared).init_lines);
        entry(&mut self.ctx, &lines);
        self
    }

    /// 注入变量（同时设置局部和全局，优先级低于词库内定义）
    pub fn inject_var(&mut self, key: &str, value: &str) -> &mut Self {
        self.ctx.val.p.set_string(key, value.to_string());
        self.ctx.val.set_global(key, value.to_string());
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
                return Ok(self.ctx.output.get_print());
            }
            // 无括号捕获的精确匹配
            let escaped = regex::escape(&item.trigger);
            if let Ok(re) = regex::Regex::new(&format!("^{}$", &escaped)) {
                if re.is_match(trigger) {
                    self.ctx.val.p.set_string("触发", item.trigger.clone());
                    self.ctx.val.p.set_string("行数", i.to_string());
                    entry(&mut self.ctx, &item.text);
                    return Ok(self.ctx.output.get_print());
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
                        return Ok(self.ctx.output.get_print());
                    }
                }
            }
        }
        Err(format!("触发词 '{}' 未找到", trigger))
    }

    /// 执行 [函数] 块
    /// 返回 (print_output, return_value)
    pub fn exec_func(&mut self, func_name: &str) -> Result<(String, String), String> {
        if let Some((code, param_names, _defaults, _is_variadic, func_line)) = self.ctx.find_func_prefix(func_name)
            .or_else(|| self.ctx.find_internal(func_name).map(|c| (c, Vec::new(), Vec::new(), false, 0)))
        {
            self.ctx.sys.line_offset = func_line;
            let head_print = self.ctx.output.get_print();
            let head_return = self.ctx.output.get_return();
            self.ctx.output.clear();
            // 检查 load/init 阶段是否有致命错误（#引入= 等）
            if let Some(err) = self.ctx.sys.error.take() {
                return Err(err);
            }
            if self.ctx.sys.stop {
                return Err(head_print.trim_end().to_string());
            }
            let fn_name_s = func_name.to_string();
            self.ctx.val.p.set_string("触发", fn_name_s.clone());
            self.ctx.val.p.set_string("self", fn_name_s.clone());
            self.ctx.val.p.set_string("参数0", fn_name_s);
            self.ctx.val.p.set_string("_输出", String::new());
            // 初始化命名参数为空字符串
            for p in &param_names {
                self.ctx.val.p.set_string(p, String::new());
            }
            entry(&mut self.ctx, &code);
            // 将 _输出 变量内容追加到输出管道（函数执行完毕返回 _输出 数据）
            let output_content = self.ctx.val.p.get_cloned("_输出");
            let output_trimmed = output_content.trim().to_string();
            if !output_trimmed.is_empty() {
                let display_output = crate::analyzer::unescape_newline(&output_trimmed);
                self.ctx.output.add_print(&display_output);
                self.ctx.output.add_print("\n");
                // 调试模式：同时通过 DebugEvent 发送 _输出 到调试控制台
                if let Some(ref dbg) = self.ctx.debug {
                    let _ = dbg.event_tx.send(crate::debug::DebugEvent::Output(format!("{}\n", display_output)));
                }
            }
            self.ctx.output.flush_pending();
            let func_print = self.ctx.output.get_print();
            let func_return = self.ctx.output.get_return();

            let print_out = format!("{}{}", head_print, func_print);
            let return_val = format!("{}{}", head_return, func_return);

            Ok((print_out, return_val))
        } else {
            Err(format!("函数 '{}' 未找到", func_name))
        }
    }

    /// 执行全部词条（从上到下）
    pub fn exec_all(&mut self) -> String {
        for item in &self.build.dic {
            entry(&mut self.ctx, &item.text);
        }
        self.ctx.output.get_print()
    }
}
