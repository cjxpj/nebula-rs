use crate::interpreter::{DicContext, BuiltinFn, entry};
use crate::parser::BuildValue;
use crate::canvas;
use crate::file_lock;
use std::sync::Arc;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::io::Read;
use std::collections::HashMap;
use std::sync::{Mutex, LazyLock};
use std::io::Write;

static INSTANCE_ID: AtomicUsize = AtomicUsize::new(0);

pub(crate) fn next_instance_id() -> usize {
    INSTANCE_ID.fetch_add(1, Ordering::Relaxed)
}

// ==================== 访问请求结构体 ====================

/// HTTP 请求对象
#[derive(Debug, Clone)]
struct AccessRequest {
    method: String,           // "get" 或 "post"
    url: String,
    headers: HashMap<String, String>,
    timeout: usize,           // 超时秒数，0 表示默认 15s
    files: HashMap<String, HashMap<String, Vec<u8>>>, // field → (filename → data)
    body: String,
    response: Option<AccessResponse>,
    stop_redirect: bool,
}

/// HTTP 响应对象
#[derive(Debug, Clone)]
struct AccessResponse {
    status_text: String,
    status_code: u16,
    headers: HashMap<String, String>,
    data: Vec<u8>,
}

/// 全局请求存储（按 handle 索引）
static REQUEST_STORE: LazyLock<Mutex<HashMap<String, AccessRequest>>> =
    LazyLock::new(|| Mutex::new(HashMap::new()));

fn get_request(handle: &str) -> Option<AccessRequest> {
    REQUEST_STORE.lock().ok()?.get(handle).cloned()
}

fn set_request(handle: &str, req: AccessRequest) {
    if let Ok(mut store) = REQUEST_STORE.lock() {
        store.insert(handle.to_string(), req);
    }
}

// ==================== 服务器 OOP 实例 ====================

/// 服务器实例（OOP 风格服务器管理）
#[derive(Debug, Clone)]
pub(crate) struct ServerInstance {
    pub port: String,
    pub handler_ref: Option<String>,
    /// 静态文件本地目录路径
    pub static_dir: Option<String>,
    /// 静态文件网络路径（URL 前缀），空字符串 = 根路径 "/"
    pub static_url_path: Option<String>,
}

static SERVER_STORE: LazyLock<Mutex<HashMap<String, ServerInstance>>> =
    LazyLock::new(|| Mutex::new(HashMap::new()));

pub(crate) fn get_server(handle: &str) -> Option<ServerInstance> {
    SERVER_STORE.lock().ok()?.get(handle).cloned()
}

pub(crate) fn set_server(handle: &str, srv: ServerInstance) {
    if let Ok(mut store) = SERVER_STORE.lock() {
        store.insert(handle.to_string(), srv);
    }
}

/// 判断一个 handle 是否为服务器实例
pub(crate) fn is_server_instance(handle: &str) -> bool {
    handle.starts_with("服务器@")
}

// ==================== 基础模块函数 ====================

/// Python range(stop) 或 range(start, stop, step)
/// 返回 JSON 数组字符串
fn range_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let a = resolve_num(ctx, args.get(1).map(|s| s.as_str()).unwrap_or("")).unwrap_or(0) as i64;
    let b = args.get(2).and_then(|s| resolve_num(ctx, s)).map(|n| n as i64);
    let c = args.get(3).and_then(|s| resolve_num(ctx, s)).map(|n| n as i64);

    let (start, end, step) = match (b, c) {
        (Some(end), Some(step)) => (a, end, step),
        (Some(end), None) => (a, end, 1),
        (None, _) => (0, a, 1),
    };

    if step == 0 {
        return Some("[]".to_string());
    }

    let mut result: Vec<i64> = Vec::new();
    if step > 0 {
        let mut i = start;
        while i < end {
            result.push(i);
            i += step;
        }
    } else {
        let mut i = start;
        while i > end {
            result.push(i);
            i += step;
        }
    }

    let json: Vec<serde_json::Value> = result
        .into_iter()
        .map(|n| serde_json::Value::Number(n.into()))
        .collect();
    Some(serde_json::Value::Array(json).to_string())
}

/// Python enumerate(list) — 返回 [[index, value], ...]
fn enumerate_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let list_str = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let arr: Vec<serde_json::Value> = serde_json::from_str(&list_str).unwrap_or_default();
    let result: Vec<serde_json::Value> = arr
        .into_iter()
        .enumerate()
        .map(|(i, v)| serde_json::json!([i, v]))
        .collect();
    Some(serde_json::Value::Array(result).to_string())
}

/// Python zip(list_a, list_b) — 配对两个 JSON 数组
fn zip_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let a_str = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let b_str = ctx.val.text(args.get(2).map(|s| s.as_str()).unwrap_or(""));
    let a: Vec<serde_json::Value> = serde_json::from_str(&a_str).unwrap_or_default();
    let b: Vec<serde_json::Value> = serde_json::from_str(&b_str).unwrap_or_default();
    let len = a.len().min(b.len());
    let result: Vec<serde_json::Value> = (0..len)
        .map(|i| serde_json::json!([a[i], b[i]]))
        .collect();
    Some(serde_json::Value::Array(result).to_string())
}

/// Python reversed(list) — 反转 JSON 数组
fn reversed_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let list_str = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let mut arr: Vec<serde_json::Value> = serde_json::from_str(&list_str).unwrap_or_default();
    arr.reverse();
    Some(serde_json::Value::Array(arr).to_string())
}

/// Python sorted(list, reverse?) — 排序 JSON 数组
fn sorted_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let list_str = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let reverse = args.get(2).map(|s| s.as_str()).unwrap_or("") == "true";
    let mut arr: Vec<serde_json::Value> = serde_json::from_str(&list_str).unwrap_or_default();
    arr.sort_by(|a, b| {
        let sa = val_to_sortable(a);
        let sb = val_to_sortable(b);
        sa.cmp(&sb)
    });
    if reverse {
        arr.reverse();
    }
    Some(serde_json::Value::Array(arr).to_string())
}

/// Python all(list) — 所有元素为真返回 "1"，否则 ""
fn all_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let list_str = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let arr: Vec<serde_json::Value> = serde_json::from_str(&list_str).unwrap_or_default();
    let all_true = arr.iter().all(|v| is_truthy_val(v));
    Some(if all_true { "1".to_string() } else { String::new() })
}

/// Python any(list) — 任一元素为真返回 "1"，否则 ""
fn any_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let list_str = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let arr: Vec<serde_json::Value> = serde_json::from_str(&list_str).unwrap_or_default();
    let any_true = arr.iter().any(|v| is_truthy_val(v));
    Some(if any_true { "1".to_string() } else { String::new() })
}

/// Python map(fn_name, list) — 对列表每个元素调用函数，返回结果列表
fn map_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let fn_name = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let list_str = ctx.val.text(args.get(2).map(|s| s.as_str()).unwrap_or(""));
    let arr: Vec<serde_json::Value> = serde_json::from_str(&list_str).unwrap_or_default();

    let fn_ptr = ctx.shared.builtins.get(&fn_name).copied();
    let mut results: Vec<serde_json::Value> = Vec::new();
    for v in &arr {
        let val_str = val_to_string(v);
        if let Some(builtin) = fn_ptr {
            let mut sub_ctx = ctx.clone_for_internal();
            let result = builtin(&mut sub_ctx, &[fn_name.clone(), val_str.clone()], "");
            if let Some(ref r) = result {
                if !r.is_empty() {
                    results.push(serde_json::Value::String(r.clone()));
                }
            }
        }
    }
    Some(serde_json::Value::Array(results).to_string())
}

/// Python filter(fn_name, list) — 过滤列表，保留函数返回值为真的元素
fn filter_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let fn_name = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let list_str = ctx.val.text(args.get(2).map(|s| s.as_str()).unwrap_or(""));
    let arr: Vec<serde_json::Value> = serde_json::from_str(&list_str).unwrap_or_default();

    let fn_ptr = ctx.shared.builtins.get(&fn_name).copied();
    let mut results: Vec<serde_json::Value> = Vec::new();
    for v in &arr {
        let val_str = val_to_string(v);
        if let Some(builtin) = fn_ptr {
            let mut sub_ctx = ctx.clone_for_internal();
            let result = builtin(&mut sub_ctx, &[fn_name.clone(), val_str.clone()], "");
            if let Some(ref r) = result {
                if !r.is_empty() && r != "0" && r != "false" {
                    results.push(v.clone());
                }
            }
        }
    }
    Some(serde_json::Value::Array(results).to_string())
}

/// Python bool(value) — 真值转换，返回 "true" 或 ""
fn to_bool_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let s = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let is_true = !s.is_empty() && s != "0" && s != "false" && s != "null";
    Some(if is_true { "true".to_string() } else { String::new() })
}

/// Python chr(i) — Unicode 码点转字符
fn chr_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let n = resolve_num(ctx, args.get(1).map(|s| s.as_str()).unwrap_or("")).unwrap_or(0);
    let c = char::from_u32(n as u32).unwrap_or('\u{FFFD}');
    Some(c.to_string())
}

/// Python ord(c) — 字符转 Unicode 码点
fn ord_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let s = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let code = s.chars().next().map(|c| c as u32).unwrap_or(0);
    Some(code.to_string())
}

/// Python bin(n) — 整数转二进制字符串（0b 前缀），支持负数
fn bin_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let n = resolve_num(ctx, args.get(1).map(|s| s.as_str()).unwrap_or("")).unwrap_or(0) as i64;
    let abs = n.unsigned_abs();
    let sign = if n < 0 { "-" } else { "" };
    Some(format!("{}0b{:b}", sign, abs))
}

/// Python hex(n) — 整数转十六进制字符串（0x 前缀）
fn hex_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let n = resolve_num(ctx, args.get(1).map(|s| s.as_str()).unwrap_or("")).unwrap_or(0) as i64;
    let abs = n.unsigned_abs();
    let sign = if n < 0 { "-" } else { "" };
    Some(format!("{}0x{:x}", sign, abs))
}

/// Python divmod(a, b) — 返回 [商, 余] JSON 数组
fn divmod_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let a = resolve_num(ctx, args.get(1).map(|s| s.as_str()).unwrap_or("")).unwrap_or(0) as i64;
    let b = resolve_num(ctx, args.get(2).map(|s| s.as_str()).unwrap_or("")).unwrap_or(1) as i64;
    let b = if b == 0 { 1 } else { b };
    let div = a / b;
    let rem = a % b;
    Some(serde_json::json!([div, rem]).to_string())
}

// ==================== 辅助函数 ====================

/// 将 serde_json::Value 转为可排序的字符串
fn val_to_sortable(v: &serde_json::Value) -> String {
    match v {
        serde_json::Value::String(s) => s.clone(),
        other => other.to_string(),
    }
}

/// 将 serde_json::Value 转为字符串
fn val_to_string(v: &serde_json::Value) -> String {
    match v {
        serde_json::Value::String(s) => s.clone(),
        other => other.to_string(),
    }
}

/// 判断 serde_json::Value 是否为"真"
fn is_truthy_val(v: &serde_json::Value) -> bool {
    match v {
        serde_json::Value::Null => false,
        serde_json::Value::Bool(b) => *b,
        serde_json::Value::Number(n) => n.as_f64().map(|f| f != 0.0).unwrap_or(true),
        serde_json::Value::String(s) => !s.is_empty() && s != "0" && s != "false",
        serde_json::Value::Array(a) => !a.is_empty(),
        serde_json::Value::Object(o) => !o.is_empty(),
    }
}

fn format_f64(v: f64) -> String {
    if v.fract() == 0.0 { (v as i64).to_string() } else { v.to_string() }
}

/// 内置函数：所有函数通过 `register_builtins()` 全局注册，始终可用。
///
/// 以下 72 个基础函数：
/// 范围、枚举、配对、反转、排序、全真、任一真、映射、过滤、转布尔、
/// 码转字、字转码、转二进制、转十六进制、商和余、
/// 长度、文本包含、文本分割、头尾去空、判断数字、大写、小写、查找、计数、
/// 开头判断、结尾判断、文本连接、文本重复、判断字母、判断小写、判断大写、
/// 判断空白、首字母大写、大小写互换、左对齐、右对齐、居中、
/// 转文本、转数字、转整数、转浮点、
/// 绝对值、最大值、最小值、取整、幂运算、求和、向上取整、向下取整、平方根、随机数、
/// 写文件、读文件、写、读、删除文件、删除文件夹、存在文件、存在文件夹、
/// 存在文件或文件夹、文件后缀、文件头部、读文件行、文件夹列表、文件列表、
/// 随机文件夹名、随机文件名、文件夹大小、文件大小、重命名、复制粘贴、下载文件
///
/// 此外访问（12 个函数）和画布（30 个函数）也均已全局内置。
pub struct StdLib;

impl StdLib {
    /// 预留接口：返回函数列表。当前始终返回 None。
    pub fn resolve(_module: &str) -> Option<Vec<(&'static str, BuiltinFn)>> {
        None
    }

    /// 预留接口：将模块函数注册到 builtins 表。当前始终返回 0。
    pub fn register_module(ctx: &mut DicContext, module: &str) -> usize {
        let funcs = match Self::resolve(module) {
            Some(f) => f,
            None => return 0,
        };
        let count = funcs.len();
        let shared = Arc::make_mut(&mut ctx.shared);
        let builtins = Arc::make_mut(&mut shared.builtins);
        for (name, func) in &funcs {
            builtins.insert(name.to_string(), *func);
        }
        count
    }
}

/// 检查路径是否以 @ 开头（标记为内部模块路径）
pub fn is_stdlib_path(path: &str) -> bool {
    path.starts_with('@')
}

/// 为内部模块创建标记 BuildValue（解析阶段使用）
pub fn create_stdlib_package(module: &str) -> BuildValue {
    let mut pkg = BuildValue::new_empty();
    pkg.head.push(format!("@stdlib={}", module));
    pkg.stdlib_module = Some(module.to_string());
    pkg
}

/// 判断 BuildValue 是否为内部模块标记包
pub fn is_stdlib_package(bv: &BuildValue) -> Option<&str> {
    bv.stdlib_module.as_deref()
}

/// 注册所有内置函数到上下文的 builtins 表
pub fn register_builtins(ctx: &mut DicContext) {
    let shared = Arc::make_mut(&mut ctx.shared);
    let builtins = Arc::make_mut(&mut shared.builtins);

    // ===== 引擎核心函数（始终可用）=====
    builtins.insert("回调".to_string(), callback_fn);
    builtins.insert("主回调".to_string(), main_callback_fn);
    builtins.insert("打印".to_string(), print_fn);
    builtins.insert("打印返回".to_string(), print_return_fn);
    builtins.insert("创建服务器".to_string(), create_server_fn);
    builtins.insert("截取".to_string(), substr_fn);
    builtins.insert("替换".to_string(), replace_fn);
    builtins.insert("删前缀".to_string(), trim_prefix_fn);
    builtins.insert("删后缀".to_string(), trim_suffix_fn);
    builtins.insert("访问".to_string(), access_get_fn);
    builtins.insert("访问POST".to_string(), access_post_fn);
    builtins.insert("访问转发".to_string(), request_forward_fn);

    // ===== 内置基础函数 =====
    builtins.insert("范围".to_string(), range_fn);
    builtins.insert("枚举".to_string(), enumerate_fn);
    builtins.insert("配对".to_string(), zip_fn);
    builtins.insert("反转".to_string(), reversed_fn);
    builtins.insert("排序".to_string(), sorted_fn);
    builtins.insert("全真".to_string(), all_fn);
    builtins.insert("任一真".to_string(), any_fn);
    builtins.insert("映射".to_string(), map_fn);
    builtins.insert("过滤".to_string(), filter_fn);
    builtins.insert("转布尔".to_string(), to_bool_fn);
    builtins.insert("码转字".to_string(), chr_fn);
    builtins.insert("字转码".to_string(), ord_fn);
    builtins.insert("转二进制".to_string(), bin_fn);
    builtins.insert("转十六进制".to_string(), hex_fn);
    builtins.insert("商和余".to_string(), divmod_fn);
    builtins.insert("长度".to_string(), len_fn);
    builtins.insert("文本包含".to_string(), contains_fn);
    builtins.insert("文本分割".to_string(), split_fn);
    builtins.insert("头尾去空".to_string(), trim_fn);
    builtins.insert("判断数字".to_string(), is_number_fn);
    builtins.insert("大写".to_string(), upper_fn);
    builtins.insert("小写".to_string(), lower_fn);
    builtins.insert("查找".to_string(), find_fn);
    builtins.insert("计数".to_string(), count_sub_fn);
    builtins.insert("开头判断".to_string(), starts_with_fn);
    builtins.insert("结尾判断".to_string(), ends_with_fn);
    builtins.insert("文本连接".to_string(), join_fn);
    builtins.insert("文本重复".to_string(), repeat_fn);
    builtins.insert("判断字母".to_string(), is_alpha_fn);
    builtins.insert("判断小写".to_string(), is_lower_fn);
    builtins.insert("判断大写".to_string(), is_upper_fn);
    builtins.insert("判断空白".to_string(), is_space_fn);
    builtins.insert("首字母大写".to_string(), title_fn);
    builtins.insert("大小写互换".to_string(), swap_case_fn);
    builtins.insert("左对齐".to_string(), ljust_fn);
    builtins.insert("右对齐".to_string(), rjust_fn);
    builtins.insert("居中".to_string(), center_fn);
    builtins.insert("转文本".to_string(), to_string_fn);
    builtins.insert("转数字".to_string(), to_number_fn);
    builtins.insert("转整数".to_string(), to_int_fn);
    builtins.insert("转浮点".to_string(), to_float_fn);
    builtins.insert("绝对值".to_string(), abs_fn);
    builtins.insert("最大值".to_string(), max_fn);
    builtins.insert("最小值".to_string(), min_fn);
    builtins.insert("取整".to_string(), round_fn);
    builtins.insert("幂运算".to_string(), pow_fn);
    builtins.insert("求和".to_string(), sum_fn);
    builtins.insert("向上取整".to_string(), ceil_fn);
    builtins.insert("向下取整".to_string(), floor_fn);
    builtins.insert("平方根".to_string(), sqrt_fn);
    builtins.insert("随机数".to_string(), random_fn);
    builtins.insert("写文件".to_string(), write_string_file_fn);
    builtins.insert("读文件".to_string(), read_string_file_fn);
    builtins.insert("写".to_string(), write_key_string_file_fn);
    builtins.insert("读".to_string(), read_key_string_file_fn);
    builtins.insert("删除文件".to_string(), delete_file_fn);
    builtins.insert("删除文件夹".to_string(), delete_dir_fn);
    builtins.insert("存在文件".to_string(), file_exist_fn);
    builtins.insert("存在文件夹".to_string(), dir_exist_fn);
    builtins.insert("存在文件或文件夹".to_string(), file_or_dir_exist_fn);
    builtins.insert("文件后缀".to_string(), file_suffix_fn);
    builtins.insert("文件头部".to_string(), file_header_fn);
    builtins.insert("读文件行".to_string(), read_file_lines_fn);
    builtins.insert("文件夹列表".to_string(), dir_list_fn);
    builtins.insert("文件列表".to_string(), file_list_fn);
    builtins.insert("随机文件夹名".to_string(), random_dir_name_fn);
    builtins.insert("随机文件名".to_string(), random_file_name_fn);
    builtins.insert("文件夹大小".to_string(), dir_size_fn);
    builtins.insert("文件大小".to_string(), file_size_fn);
    builtins.insert("重命名".to_string(), file_rename_fn);
    builtins.insert("复制粘贴".to_string(), file_copy_fn);
    builtins.insert("下载文件".to_string(), download_file_fn);

    // ===== 访问（HTTP 客户端）=====
    builtins.insert("创建访问".to_string(), create_access_fn);
    builtins.insert("切换GET".to_string(), change_get_fn);
    builtins.insert("切换POST".to_string(), change_post_fn);
    builtins.insert("POST".to_string(), request_post_fn);
    builtins.insert("POST文件".to_string(), request_post_file_fn);
    builtins.insert("启用跳转".to_string(), enable_redirects_fn);
    builtins.insert("禁用跳转".to_string(), disable_redirects_fn);
    builtins.insert("设置头部".to_string(), set_headers_fn);
    builtins.insert("设置超时".to_string(), set_timeout_fn);
    builtins.insert("发送".to_string(), request_send_fn);
    builtins.insert("全部内容".to_string(), request_all_content_fn);
    builtins.insert("内容".to_string(), request_content_fn);

    // ===== 画布 =====
    builtins.insert("创建画布".to_string(), canvas_new_fn);
    builtins.insert("画布获取".to_string(), canvas_get_fn);
    builtins.insert("画笔设置颜色".to_string(), canvas_brush_color_fn);
    builtins.insert("画笔获取颜色".to_string(), canvas_brush_get_color_fn);
    builtins.insert("画笔大小".to_string(), canvas_brush_size_fn);
    builtins.insert("绘制点".to_string(), canvas_draw_point_fn);
    builtins.insert("绘制线".to_string(), canvas_draw_line_fn);
    builtins.insert("绘制喷漆".to_string(), canvas_brush_line_fn);
    builtins.insert("绘制波浪".to_string(), canvas_wave_line_fn);
    builtins.insert("绘制油漆桶".to_string(), canvas_flood_fill_fn);
    builtins.insert("绘制方形".to_string(), canvas_draw_rect_fill_fn);
    builtins.insert("绘制方形描边".to_string(), canvas_draw_rect_stroke_fn);
    builtins.insert("绘制椭圆".to_string(), canvas_draw_ellipse_fill_fn);
    builtins.insert("绘制椭圆描边".to_string(), canvas_draw_ellipse_stroke_fn);
    builtins.insert("绘制圆形".to_string(), canvas_draw_pie_fill_fn);
    builtins.insert("绘制圆形描边".to_string(), canvas_draw_pie_stroke_fn);
    builtins.insert("绘制多边形".to_string(), canvas_polygon_fn);
    builtins.insert("绘制多边形描边".to_string(), canvas_polygon_stroke_fn);
    builtins.insert("绘制圆弧".to_string(), canvas_draw_arc_fn);
    builtins.insert("绘制图片".to_string(), canvas_draw_image_fn);
    builtins.insert("绘制文本".to_string(), canvas_draw_text_fn);
    builtins.insert("绘制随机点".to_string(), canvas_random_dots_fn);
    builtins.insert("绘制随机线条".to_string(), canvas_random_lines_fn);
    builtins.insert("画布灰度".to_string(), canvas_grayscale_fn);
    builtins.insert("画布马赛克".to_string(), canvas_mosaic_all_fn);
    builtins.insert("绘制马赛克".to_string(), canvas_draw_mosaic_fn);
    builtins.insert("绘制高斯模糊".to_string(), canvas_draw_blur_fn);
    builtins.insert("画布旋转".to_string(), canvas_rotate_fn);
    builtins.insert("画布圆形".to_string(), canvas_round_corners_fn);
}

/// 以 swap 共享变量池方式执行子调用，变更直接作用到父级
fn run_with_shared_val(
    ctx: &mut DicContext,
    code: &[String],
    target: &str,
    cnames: &[String],
    cvals: &[String],
) -> Option<String> {
    let mut sub_ctx = ctx.clone_for_internal();
    std::mem::swap(&mut ctx.val, &mut sub_ctx.val);
    for (i, (name, val)) in cnames.iter().zip(cvals.iter()).enumerate() {
        sub_ctx.val.p.set_string(name, val.clone());
        sub_ctx.val.p.set_string(&format!("参数{}", i), val.clone());
    }
    sub_ctx.val.p.set_string("self", target.to_string());
    sub_ctx.val.p.set_string("触发", target.to_string());
    sub_ctx.sys.external_labels = ctx.sys.external_labels
        .iter()
        .map(|(k, &(idx, d))| (k.clone(), (idx, d + 1)))
        .collect();
    entry(&mut sub_ctx, code);
    if sub_ctx.sys.pending_goto.is_some() {
        ctx.sys.pending_goto = sub_ctx.sys.pending_goto.take();
        std::mem::swap(&mut ctx.val, &mut sub_ctx.val);
        return None;
    }
    let output = Some(sub_ctx.output.get());
    std::mem::swap(&mut ctx.val, &mut sub_ctx.val);
    output
}

/// $回调 触发词 参数...$
fn callback_fn(ctx: &mut DicContext, _args: &[String], content: &str) -> Option<String> {
    // 处理三种格式：
    //   $.回调 text    → content = ".回调 text"
    //    $回调 text    → content = "回调 text"
    //   解析后 OOP 调用 → content = "ClassName.回调 text"
    let rest = content.trim_start();
    let after_callback = if let Some(pos) = rest.find(".回调") {
        rest[pos + ".回调".len()..].trim_start()
    } else if rest.starts_with('.') {
        rest.strip_prefix(".回调").unwrap_or(rest)
    } else {
        rest.strip_prefix("回调").unwrap_or(rest)
    };
    let target = after_callback.trim_start();

    // 类作用域查找：self 变量为类名时，先查 ClassName.target，再回退到 target
    let class_name_raw = ctx.val.p.get_cloned("self");
    let class_name = class_name_raw.rfind('.').map(|p| &class_name_raw[p+1..]).unwrap_or(&class_name_raw);
    let class_name = class_name.rfind('@').map(|p| &class_name[..p]).unwrap_or(class_name);
    let found = if !class_name.is_empty() {
        let qualified = format!("{}.{}", class_name, target);
        ctx.find_internal_regex(&qualified)
            .or_else(|| ctx.find_internal_regex(target))
    } else {
        ctx.find_internal_regex(target)
    };

    if let Some((code, cnames, cvals)) = found {
        let resolved_target = ctx.val.text(target);
        run_with_shared_val(ctx, &code, &resolved_target, &cnames, &cvals)
    } else {
        None
    }
}

/// $主回调 触发词 参数...$ — 回调正常触发词（主词条）
fn main_callback_fn(ctx: &mut DicContext, _args: &[String], content: &str) -> Option<String> {
    let raw_target = content["主回调".len()..].trim_start();
    let target = ctx.val.text(raw_target);
    let found = ctx.find_main_trigger(&target);
    if let Some((code, cnames, cvals)) = found {
        run_with_shared_val(ctx, &code, &target, &cnames, &cvals)
    } else {
        None
    }
}

fn print_core(ctx: &mut DicContext, args: &[String]) -> String {
    let value = args.iter().skip(1).map(|s| s.as_str()).collect::<Vec<_>>().join(" ");
    let texted = ctx.val.text(&value);
    let result = crate::count::run_count_text(&ctx.val, &texted);
    println!("{}", crate::analyzer::unescape_newline(&result));
    result
}

/// $打印 内容$ — 直接输出到 stdout，不返回（支持 %var% 和 [expr]）
fn print_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    print_core(ctx, args);
    None
}

/// $打印返回 内容$ — 输出并返回该值（支持 %var% 和 [expr]）
fn print_return_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    Some(print_core(ctx, args))
}

// ===== 创建服务器 — 创建服务器 OOP 实例，返回句柄 =====

fn create_server_fn(_ctx: &mut DicContext, _args: &[String], _content: &str) -> Option<String> {
    let instance_id = next_instance_id();
    let handle = format!("服务器@{}", instance_id);
    let srv = ServerInstance {
        port: "8080".to_string(),
        handler_ref: None,
        static_dir: None,
        static_url_path: None,
    };
    set_server(&handle, srv);
    Some(handle)
}

// ===== 服务器实例方法：.静态 和 .启动 =====

/// 服务器.静态 — 配置静态文件目录，由 executor 通过 dispatch_server_method 调用
pub(crate) fn server_static_method(ctx: &mut DicContext, handle: &str, args: &[String]) -> Option<String> {
    let Some(mut srv) = get_server(handle) else {
        return Some(format!("[错误] {} 服务器实例不存在", ctx.sys.file_location()));
    };
    let dir = args.first().map(|s| s.as_str()).unwrap_or("静态");
    srv.static_dir = Some(ctx.val.text(dir));
    // 第二个参数：网络路径（URL 前缀），留空 = 根路径 "/"
    let url_path = args.get(1).map(|s| ctx.val.text(s)).unwrap_or_default();
    srv.static_url_path = Some(url_path);
    set_server(handle, srv);
    None
}

/// 服务器.启动 — 启动服务器监听，由 executor 通过 dispatch_server_method 调用
pub(crate) fn server_start_method(ctx: &mut DicContext, handle: &str, args: &[String]) -> Option<String> {
    let Some(srv) = get_server(handle) else {
        return Some(format!("[错误] {} 服务器实例不存在", ctx.sys.file_location()));
    };

    let handler_ref: Option<String> = args.get(1).map(|s| s.to_string());

    // 未传入端口则使用实例默认端口
    let port = match args.first() {
        Some(s) => ctx.val.text(s.as_str()),
        None => srv.port.clone(),
    };
    let handler_ref = handler_ref.or(srv.handler_ref.clone());
    let static_dir = srv.static_dir.clone();
    let static_url_path = srv.static_url_path.clone();

    run_server(ctx, &port, &handler_ref, &static_dir, &static_url_path)
}

/// 服务器实例方法调度入口（由 executor.rs 调用）
pub(crate) fn dispatch_server_method(
    ctx: &mut DicContext,
    handle: &str,
    method: &str,
    args: &[String],
) -> Option<String> {
    match method {
        "静态" => server_static_method(ctx, handle, args),
        "启动" => server_start_method(ctx, handle, args),
        _ => {
            ctx.sys.error = Some(format!(
                "[错误] {} 服务器不支持方法 '{}'", ctx.sys.file_location(), method
            ));
            None
        }
    }
}

/// 运行服务器（从 server_fn 重构而来，支持 OOP 实例配置）
fn run_server(
    ctx: &mut DicContext,
    port: &str,
    handler_ref: &Option<String>,
    static_dir: &Option<String>,
    static_url_path: &Option<String>,
) -> Option<String> {
    use std::io::{BufRead, BufReader, Write};
    use std::net::TcpListener;

    let bind_addr = format!("0.0.0.0:{}", port);

    let listener = match TcpListener::bind(&bind_addr) {
        Ok(l) => l,
        Err(e) => {
            eprintln!("[Nebula] 服务器启动失败: {}", e);
            return Some(format!("[错误] {} 服务器启动失败: {}", ctx.sys.file_location(), e));
        }
    };

    let mut base_ctx = ctx.clone();

    for stream in listener.incoming() {
        let stream = match stream {
            Ok(s) => s,
            Err(e) => {
                eprintln!("[Nebula] 连接错误: {}", e);
                continue;
            }
        };
        let mut reader = BufReader::new(stream.try_clone().unwrap());
        let mut writer = stream;

        let mut first_line = String::new();
        match reader.read_line(&mut first_line) {
            Ok(0) => continue,
            Err(_) => continue,
            _ => {}
        }
        let first_line = first_line.trim();
        if first_line.is_empty() {
            continue;
        }

        let is_http = first_line.starts_with("GET ")
            || first_line.starts_with("POST ")
            || first_line.starts_with("PUT ")
            || first_line.starts_with("DELETE ")
            || first_line.starts_with("HEAD ")
            || first_line.starts_with("OPTIONS ")
            || first_line.starts_with("PATCH ");

        if is_http {
            let http_method = first_line.split_whitespace().next().unwrap_or("GET").to_string();
            let mut http_path = String::new();
            let parts: Vec<&str> = first_line.split_whitespace().collect();
            if parts.len() >= 2 {
                http_path = parts[1].to_string();
            }

            let (path_only, query_string) = if let Some(qm) = http_path.find('?') {
                (http_path[..qm].to_string(), http_path[qm + 1..].to_string())
            } else {
                (http_path.clone(), String::new())
            };
            let get_json = build_query_json(&query_string);

            // === 静态文件服务 ===
            if let Some(ref sdir) = static_dir {
                if path_only.starts_with('/') {
                    // 网络路径：匹配 URL 前缀（空 = 根路径）
                    let url_prefix = static_url_path.as_deref().unwrap_or("");
                    let url_prefix = url_prefix.trim_matches('/');

                    // 去掉开头的 /
                    let rel = path_only.trim_start_matches('/');

                    // 匹配网络路径前缀（仅匹配路径边界）
                    let rel_path = if url_prefix.is_empty() {
                        // 根路径：整个 URL 路径直接映射到文件
                        rel.to_string()
                    } else if let Some(stripped) = rel.strip_prefix(url_prefix) {
                        // 仅当 stripped 为空（精确匹配）或以 / 开头（子路径）才算匹配
                        if stripped.is_empty() || stripped.starts_with('/') {
                            stripped.trim_start_matches('/').to_string()
                        } else {
                            String::new()
                        }
                    } else {
                        String::new()
                    };

                    // 路径匹配时进入静态处理：
                    // - 根路径(url_prefix空)：所有请求
                    // - 子路径(!rel_path空)：有具体文件路径
                    // - 空 rel_path 但 rel 匹配前缀：目录请求(/assets 或 /assets/)
                    let prefix_matched = url_prefix.is_empty() || !rel_path.is_empty()
                        || rel == url_prefix || rel.starts_with(&format!("{}/", url_prefix));
                    if prefix_matched {
                        let file_path = if rel_path.is_empty() {
                            // 目录请求 → 尝试 index.html
                            format!("{}/index.html", sdir.trim_end_matches('/'))
                        } else {
                            format!("{}/{}", sdir.trim_end_matches('/'), rel_path)
                        };
                        if let Ok(data) = std::fs::read(&file_path) {
                            let mime = mime_from_path(&file_path);
                            let response = format!(
                                "HTTP/1.1 200 OK\r\nContent-Type: {}\r\nContent-Length: {}\r\nAccess-Control-Allow-Origin: *\r\nConnection: close\r\n\r\n",
                                mime, data.len()
                            );
                            let _ = writer.write_all(response.as_bytes());
                            let _ = writer.write_all(&data);
                            let _ = writer.flush();
                            continue;
                        }
                        // 文件不存在 → 尝试 404.html
                        let not_found_path = format!("{}/404.html", sdir.trim_end_matches('/'));
                        if let Ok(data) = std::fs::read(&not_found_path) {
                            let response = format!(
                                "HTTP/1.1 404 Not Found\r\nContent-Type: text/html; charset=utf-8\r\nContent-Length: {}\r\nAccess-Control-Allow-Origin: *\r\nConnection: close\r\n\r\n",
                                data.len()
                            );
                            let _ = writer.write_all(response.as_bytes());
                            let _ = writer.write_all(&data);
                            let _ = writer.flush();
                            continue;
                        }
                    }
                }
            }

            // 读取头部
            let mut headers_map = serde_json::Map::new();
            let mut content_length: usize = 0;
            loop {
                let mut header_line = String::new();
                match reader.read_line(&mut header_line) {
                    Ok(0) => break,
                    Err(_) => break,
                    _ => {}
                }
                let header_trimmed = header_line.trim().to_string();
                if header_trimmed.is_empty() {
                    break;
                }
                if let Some(colon) = header_trimmed.find(':') {
                    let key = header_trimmed[..colon].trim().to_string();
                    let val = header_trimmed[colon + 1..].trim().to_string();
                    if key.to_lowercase() == "content-length" {
                        content_length = val.parse().unwrap_or(0);
                    }
                    headers_map.insert(key, serde_json::Value::String(val));
                }
            }
            let header_json = serde_json::Value::Object(headers_map).to_string();

            let post_body = if (http_method == "POST" || http_method == "PUT" || http_method == "PATCH")
                && content_length > 0
            {
                let mut body = vec![0u8; content_length];
                use std::io::Read;
                match reader.read_exact(&mut body) {
                    Ok(()) => String::from_utf8_lossy(&body).to_string(),
                    Err(_) => String::new(),
                }
            } else {
                String::new()
            };

            let post_json = if post_body.is_empty() {
                "{}".to_string()
            } else if let Ok(v) = serde_json::from_str::<serde_json::Value>(&post_body) {
                v.to_string()
            } else {
                format!("{{\"raw\":{}}}", serde_json::Value::String(post_body))
            };

            let data_json = format!(
                r#"{{"method":"{}","path":"{}","header":{},"get":{},"post":{}}}"#,
                http_method, path_only, header_json, get_json, post_json
            );

            let trigger = if http_path.is_empty() {
                first_line.to_string()
            } else {
                http_path
            };

            let handler_name = resolve_handler_name(&base_ctx, handler_ref);
            let handler_code = handler_name.as_ref().and_then(|name| base_ctx.find_internal_prefix(name));

            let (response_body, rheader_raw, status_code) = if let Some(ref code) = handler_code {
                let mut req_ctx = base_ctx.clone();
                req_ctx.val.p.set_string("触发", trigger.clone());
                req_ctx.val.p.set_string("触发响应", String::new());
                req_ctx.val.p.set_string("_路径", path_only);
                req_ctx.val.p.set_string("_GET", get_json);
                req_ctx.val.p.set_string("_POST", post_json);
                req_ctx.val.p.set_string("_头部", header_json);
                req_ctx.val.p.set_string("_DATA", data_json);
                req_ctx.val.p.set_string("_设置头部", "{}".to_string());
                req_ctx.val.p.set_string("_状态码", "200".to_string());
                if let Some(ref name) = handler_name {
                    req_ctx.val.p.set_string("self", name.clone());
                }
                entry(&mut req_ctx, code);
                if !Arc::ptr_eq(&base_ctx.shared, &req_ctx.shared) {
                    base_ctx.shared = req_ctx.shared.clone();
                }
                let rheader_raw = crate::value::Val::lookup_display("_设置头部", req_ctx.val.p.get_all(), Some(req_ctx.val.g.get_all()));
                let status_code = crate::value::Val::lookup_display("_状态码", req_ctx.val.p.get_all(), Some(req_ctx.val.g.get_all()));
                let body = req_ctx.output.get();
                std::mem::swap(&mut base_ctx.val, &mut req_ctx.val);
                (body, rheader_raw, status_code)
            } else {
                (match_tcp_trigger(&base_ctx, &trigger), String::new(), "200".to_string())
            };

            let mut extra_header_lines = String::new();
            if !rheader_raw.is_empty() {
                if let Ok(obj) = serde_json::from_str::<serde_json::Map<String, serde_json::Value>>(&rheader_raw) {
                    for (key, val) in &obj {
                        let v = match val {
                            serde_json::Value::String(s) => s.clone(),
                            other => other.to_string(),
                        };
                        extra_header_lines.push_str(&format!("{}: {}\r\n", key, v));
                    }
                }
            }

            let status_text = match status_code.as_str() {
                "200" => "OK",
                "201" => "Created",
                "204" => "No Content",
                "301" => "Moved Permanently",
                "302" => "Found",
                "304" => "Not Modified",
                "400" => "Bad Request",
                "401" => "Unauthorized",
                "403" => "Forbidden",
                "404" => "Not Found",
                "405" => "Method Not Allowed",
                "500" => "Internal Server Error",
                "502" => "Bad Gateway",
                "503" => "Service Unavailable",
                _ => "",
            };
            let http_response = format!(
                "HTTP/1.1 {} {}\r\nContent-Type: text/plain; charset=utf-8\r\nContent-Length: {}\r\nAccess-Control-Allow-Origin: *\r\nConnection: close\r\n{}\r\n{}",
                status_code, status_text,
                response_body.len(),
                extra_header_lines,
                response_body
            );
            let _ = writer.write_all(http_response.as_bytes());
            let _ = writer.flush();
        } else {
            // TCP 原始模式
            let trigger = first_line.to_string();
            write_tcp_output(&mut writer, handle_tcp_request(&mut base_ctx, handler_ref, &trigger));

            let mut line = String::new();
            loop {
                line.clear();
                match reader.read_line(&mut line) {
                    Ok(0) => break,
                    Ok(_) => {}
                    Err(_) => break,
                }
                let trigger = line.trim().to_string();
                if trigger.is_empty() {
                    continue;
                }
                write_tcp_output(&mut writer, handle_tcp_request(&mut base_ctx, handler_ref, &trigger));
            }
        }
    }
    None
}

/// 根据文件路径返回 MIME 类型
fn mime_from_path(path: &str) -> &'static str {
    let ext = path.rfind('.').map(|i| &path[i..]).unwrap_or("");
    match ext {
        ".html" | ".htm" => "text/html; charset=utf-8",
        ".css" => "text/css; charset=utf-8",
        ".js" => "application/javascript; charset=utf-8",
        ".json" => "application/json; charset=utf-8",
        ".png" => "image/png",
        ".jpg" | ".jpeg" => "image/jpeg",
        ".gif" => "image/gif",
        ".svg" => "image/svg+xml",
        ".ico" => "image/x-icon",
        ".woff" => "font/woff",
        ".woff2" => "font/woff2",
        ".ttf" => "font/ttf",
        ".wasm" => "application/wasm",
        ".txt" => "text/plain; charset=utf-8",
        ".xml" => "application/xml; charset=utf-8",
        ".pdf" => "application/pdf",
        ".zip" => "application/zip",
        _ => "application/octet-stream",
    }
}

/// 从变量或直接函数名解析出实际的函数名
fn resolve_handler_name(ctx: &DicContext, handler_ref: &Option<String>) -> Option<String> {
    let raw = handler_ref.as_ref()?;
    let resolved = crate::value::Val::text_with_vals(
        &format!("%{}%", raw),
        ctx.val.p.get_all(),
        Some(ctx.val.g.get_all()),
    );
    if !resolved.is_empty() && !resolved.starts_with('%') {
        return Some(resolved);
    }
    Some(raw.clone())
}

/// 执行一次 TCP 请求处理，返回 (output, is_handler_path)
fn handle_tcp_request(
    base_ctx: &mut DicContext,
    handler_ref: &Option<String>,
    trigger: &str,
) -> (String, bool) {
    let handler_name = resolve_handler_name(base_ctx, handler_ref);
    let handler_code = handler_name.as_ref().and_then(|name| base_ctx.find_internal_prefix(name));
    if let Some(ref code) = handler_code {
        let mut req_ctx = base_ctx.clone();
        req_ctx.val.p.set_string("触发", trigger.to_string());
        req_ctx.val.p.set_string("触发响应", String::new());
        if let Some(ref name) = handler_name {
            req_ctx.val.p.set_string("self", name.clone());
        }
        entry(&mut req_ctx, code);
        if !Arc::ptr_eq(&base_ctx.shared, &req_ctx.shared) {
            base_ctx.shared = req_ctx.shared.clone();
        }
        let output = req_ctx.output.get();
        std::mem::swap(&mut base_ctx.val, &mut req_ctx.val);
        (output, true)
    } else {
        (match_tcp_trigger(base_ctx, trigger), false)
    }
}

fn write_tcp_output<W: std::io::Write>(writer: &mut W, (output, from_handler): (String, bool)) {
    if !output.is_empty() {
        let _ = writeln!(writer, "{}", output);
    } else if from_handler {
        let _ = writeln!(writer);
    } else {
        let _ = writeln!(writer, "[未找到匹配词条]");
    }
    let _ = writer.flush();
}

/// 将 URL 查询字符串解析为 JSON 对象
fn build_query_json(query: &str) -> String {
    if query.is_empty() {
        return "{}".to_string();
    }
    let mut map = serde_json::Map::new();
    for pair in query.split('&') {
        let mut kv = pair.splitn(2, '=');
        let key = kv.next().unwrap_or("");
        let val = kv.next().unwrap_or("");
        // URL 解码
        let key = urlencoding_decode(key);
        let val = urlencoding_decode(val);
        map.insert(key, serde_json::Value::String(val));
    }
    serde_json::Value::Object(map).to_string()
}

/// 简单 URL 百分号解码
fn urlencoding_decode(input: &str) -> String {
    let mut bytes: Vec<u8> = Vec::with_capacity(input.len());
    let mut chars = input.bytes();
    while let Some(b) = chars.next() {
        if b == b'%' {
            let hi = chars.next();
            let lo = chars.next();
            if let (Some(hi), Some(lo)) = (hi, lo) {
                if let (Some(hi), Some(lo)) = (hex_val(hi), hex_val(lo)) {
                    bytes.push(hi << 4 | lo);
                    continue;
                }
            }
            bytes.push(b'%');
            if let Some(hi) = hi { bytes.push(hi); }
            if let Some(lo) = lo { bytes.push(lo); }
        } else if b == b'+' {
            bytes.push(b' ');
        } else {
            bytes.push(b);
        }
    }
    String::from_utf8_lossy(&bytes).to_string()
}

fn hex_val(b: u8) -> Option<u8> {
    match b {
        b'0'..=b'9' => Some(b - b'0'),
        b'a'..=b'f' => Some(b - b'a' + 10),
        b'A'..=b'F' => Some(b - b'A' + 10),
        _ => None,
    }
}

/// 匹配 TCP 触发词（复用逻辑）
fn match_tcp_trigger(base_ctx: &DicContext, trigger: &str) -> String {
    let mut matched_text: Option<Vec<String>> = None;
    let mut capture_names: Vec<String> = Vec::new();
    let mut capture_vals: Vec<String> = Vec::new();
    for item in &base_ctx.shared.triggers {
        if let Some((cnames, cvals)) = crate::value::match_bracket_trigger(&item.trigger, trigger) {
            matched_text = Some(item.text.clone());
            capture_names = cnames;
            capture_vals = cvals;
            break;
        }
        let escaped = regex::escape(&item.trigger);
        if let Ok(re) = regex::Regex::new(&format!("^{}$", &escaped)) {
            if re.is_match(trigger) {
                matched_text = Some(item.text.clone());
                break;
            }
        }
        if escaped != item.trigger {
            if let Ok(re) = regex::Regex::new(&format!("^{}$", &item.trigger)) {
                if let Some(caps) = re.captures(trigger) {
                    matched_text = Some(item.text.clone());
                    for j in 1..caps.len() {
                        if let Some(m) = caps.get(j) {
                            capture_names.push(format!("括号{}", j));
                            capture_vals.push(m.as_str().to_string());
                        }
                    }
                    break;
                }
            }
        }
    }

    match matched_text {
        Some(text) => {
            let mut req_ctx = base_ctx.fresh_sub_context();
            req_ctx.val.p.set_string("触发", trigger.to_string());
            req_ctx.val.p.set_string("触发响应", String::new());
            for (name, val) in capture_names.iter().zip(capture_vals.iter()) {
                req_ctx.val.p.set_string(name, val.clone());
            }
            entry(&mut req_ctx, &text);
            req_ctx.output.get()
        }
        None => String::new(),
    }
}

/// $长度 字符串$ — 返回字符数（含中文）
fn len_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let value = args.iter().skip(1).map(|s| s.as_str()).collect::<Vec<_>>().join(" ");
    let result = ctx.val.text(&value);
    Some(result.chars().count().to_string())
}

/// $截取 [字符串] [起始] [长度]$ — 提取子串（0-based，长度可选）
fn substr_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let s = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let start: usize = args
        .get(2)
        .map(|a| resolve_num(ctx, a).unwrap_or(0))
        .unwrap_or(0);
    let len: Option<usize> = args
        .get(3)
        .and_then(|a| resolve_num(ctx, a));

    let chars: Vec<char> = s.chars().collect();
    let start = start.min(chars.len());
    let end = match len {
        Some(l) => (start + l).min(chars.len()),
        None => chars.len(),
    };
    Some(chars[start..end].iter().collect())
}

/// $替换 [字符串] [旧内容] [新内容]$ — 替换所有匹配
fn replace_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let s = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let from = ctx.val.text(args.get(2).map(|s| s.as_str()).unwrap_or(""));
    let to = ctx.val.text(args.get(3).map(|s| s.as_str()).unwrap_or(""));
    Some(s.replace(&from, &to))
}

/// $删前缀 [字符串] [前缀]$ — 删除字符串开头的匹配前缀
fn trim_prefix_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let s = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let prefix = ctx.val.text(args.get(2).map(|s| s.as_str()).unwrap_or(""));
    if let Some(stripped) = s.strip_prefix(&prefix) {
        Some(stripped.to_string())
    } else {
        Some(s)
    }
}

/// $删后缀 [字符串] [后缀]$ — 删除字符串末尾的匹配后缀
fn trim_suffix_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let s = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let suffix = ctx.val.text(args.get(2).map(|s| s.as_str()).unwrap_or(""));
    if let Some(stripped) = s.strip_suffix(&suffix) {
        Some(stripped.to_string())
    } else {
        Some(s)
    }
}

/// 解析数值参数：先 %var% 替换，再 [expr] 求值，最后 parse
fn resolve_num(ctx: &DicContext, s: &str) -> Option<usize> {
    let v = crate::count::run_count_text(&ctx.val, &ctx.val.text_immut(s));
    v.trim().parse::<usize>().ok()
}

// ==================== 访问 模块 ====================

/// 判断字符串是否为有效 JSON
fn is_json_str(s: &str) -> bool {
    let trimmed = s.trim();
    if trimmed.len() < 2 { return false; }
    let first = trimmed.as_bytes()[0];
    let last = trimmed.as_bytes()[trimmed.len() - 1];
    (first == b'{' && last == b'}') || (first == b'[' && last == b']')
}

/// 确保 URL 有 http:// 前缀
fn ensure_http(url: &str) -> String {
    if url.starts_with("http://") || url.starts_with("https://") {
        url.to_string()
    } else {
        format!("http://{}", url)
    }
}

// ===== 创建访问 url$ — 创建请求对象，返回 OOP 对象引用 =====

fn create_access_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let url = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    if url.is_empty() {
        return Some(format!("[错误] {} 创建访问 需要 URL", ctx.sys.file_location()));
    }
    let instance_id = next_instance_id();
    let handle = format!("访问请求@{}", instance_id);
    let req = AccessRequest {
        method: "get".to_string(),
        url: ensure_http(&url),
        headers: HashMap::new(),
        timeout: 0,
        files: HashMap::new(),
        body: String::new(),
        response: None,
        stop_redirect: false,
    };
    set_request(&handle, req);
    // 返回 OOP 对象引用（\x00 标记，与 $new$ 保持一致）
    let mut result = String::new();
    result.push('\x00');
    result.push_str(&handle);
    result.push('\x00');
    Some(result)
}

// ===== 访问.切换GET handle$ — 切换为 GET =====

fn change_get_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let (handle, _) = get_req_handle_and_offset(ctx, args);
    let Some(mut req) = get_request(&handle) else {
        return Some(format!("[错误] {} 未新建请求", ctx.sys.file_location()));
    };
    req.method = "get".to_string();
    set_request(&handle, req);
    None
}

// ===== 访问.切换POST handle [body]$ — 切换为 POST 并可选设置 body =====

fn change_post_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let (handle, offset) = get_req_handle_and_offset(ctx, args);
    let Some(mut req) = get_request(&handle) else {
        return Some(format!("[错误] {} 未新建请求", ctx.sys.file_location()));
    };
    req.method = "post".to_string();
    if let Some(body) = args.get(offset) {
        req.body = ctx.val.text(body);
    }
    set_request(&handle, req);
    None
}

// ===== 访问.POST handle body$ — 设置 POST body =====

fn request_post_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let (handle, offset) = get_req_handle_and_offset(ctx, args);
    let Some(mut req) = get_request(&handle) else {
        return Some(format!("[错误] {} 未新建请求", ctx.sys.file_location()));
    };
    req.method = "post".to_string();
    req.body = ctx.val.text(args.get(offset).map(|s| s.as_str()).unwrap_or(""));
    set_request(&handle, req);
    None
}

// ===== 访问.POST文件 handle field data [filename]$ — 设置 multipart 文件 =====

fn request_post_file_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let (handle, offset) = get_req_handle_and_offset(ctx, args);
    let Some(mut req) = get_request(&handle) else {
        return Some(format!("[错误] {} 未新建请求", ctx.sys.file_location()));
    };
    req.method = "post".to_string();

    let field = ctx.val.text(args.get(offset).map(|s| s.as_str()).unwrap_or(""));
    let data = ctx.val.text(args.get(offset + 1).map(|s| s.as_str()).unwrap_or("")).into_bytes();

    let (filename, file_data) = if let Some(fname) = args.get(offset + 2) {
        (ctx.val.text(fname).into_bytes(), data)
    } else {
        let fname = if let Some(fn_var) = args.get(offset + 3) {
            ctx.val.text(fn_var).into_bytes()
        } else {
            field.clone().into_bytes()
        };
        let fdata = if let Some(d) = args.get(offset + 2) {
            ctx.val.text(d).into_bytes()
        } else {
            data
        };
        (fname, fdata)
    };

    let entry = req.files.entry(field.clone()).or_default();
    entry.insert(String::from_utf8_lossy(&filename).to_string(), file_data);
    set_request(&handle, req);
    None
}

// ===== 访问.启用跳转 handle$ — 允许重定向 =====

fn enable_redirects_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let (handle, _) = get_req_handle_and_offset(ctx, args);
    let Some(mut req) = get_request(&handle) else {
        return Some(format!("[错误] {} 未新建请求", ctx.sys.file_location()));
    };
    req.stop_redirect = false;
    set_request(&handle, req);
    None
}

// ===== 访问.禁用跳转 handle$ — 禁止重定向 =====

fn disable_redirects_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let (handle, _) = get_req_handle_and_offset(ctx, args);
    let Some(mut req) = get_request(&handle) else {
        return Some(format!("[错误] {} 未新建请求", ctx.sys.file_location()));
    };
    req.stop_redirect = true;
    set_request(&handle, req);
    None
}

// ===== 访问.设置头部 handle json_headers$ — 设置请求头 =====

fn set_headers_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let (handle, offset) = get_req_handle_and_offset(ctx, args);
    let Some(mut req) = get_request(&handle) else {
        return Some(format!("[错误] {} 未新建请求", ctx.sys.file_location()));
    };
    let headers_str = ctx.val.text(args.get(offset).map(|s| s.as_str()).unwrap_or(""));
    if let Ok(map) = serde_json::from_str::<HashMap<String, String>>(&headers_str) {
        req.headers = map;
    }
    set_request(&handle, req);
    None
}

// ===== 访问.设置超时 handle seconds$ — 设置超时秒数 =====

fn set_timeout_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let (handle, offset) = get_req_handle_and_offset(ctx, args);
    let Some(mut req) = get_request(&handle) else {
        return Some(format!("[错误] {} 未新建请求", ctx.sys.file_location()));
    };
    req.timeout = args.get(offset)
        .and_then(|s| ctx.val.text(s).trim().parse::<usize>().ok())
        .unwrap_or(15);
    set_request(&handle, req);
    None
}

// ===== 访问.发送 handle$ — 发送请求，结果存入 response =====

fn request_send_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let (handle, _) = get_req_handle_and_offset(ctx, args);
    let Some(req) = get_request(&handle) else {
        return Some(format!("[错误] {} 未新建请求", ctx.sys.file_location()));
    };

    let timeout_secs = if req.timeout > 0 { req.timeout } else { 15 };
    let timeout_dur = std::time::Duration::from_secs(timeout_secs as u64);

    let agent: ureq::Agent = ureq::Agent::config_builder()
        .timeout_global(Some(timeout_dur))
        .build()
        .into();

    let result = || -> Result<AccessResponse, String> {
        let method_upper = req.method.to_uppercase();

        // 构建请求
        let mut resp = if method_upper == "GET" {
            let mut r = agent.get(&req.url);
            for (k, v) in &req.headers { r = r.header(k, v); }
            r.call().map_err(|e| format!("发送失败: {}", e))?
        } else {
            // POST：决定 body 类型
            if !req.files.is_empty() {
                // multipart 上传
                let boundary = format!("nebula-boundary-{}", next_instance_id());
                let body_vec = build_multipart_body(&req, &boundary);
                let body_str = String::from_utf8_lossy(&body_vec).to_string();
                let mut r = agent.post(&req.url);
                for (k, v) in &req.headers { r = r.header(k, v); }
                r = r.header("Content-Type", &format!("multipart/form-data; boundary={}", boundary));
                r.send(body_str).map_err(|e| format!("发送失败: {}", e))?
            } else if !req.body.is_empty() {
                let body_clone = req.body.clone();
                let mut r = agent.post(&req.url);
                for (k, v) in &req.headers { r = r.header(k, v); }
                if is_json_str(&body_clone) {
                    r = r.header("Content-Type", "application/json");
                } else {
                    r = r.header("Content-Type", "application/x-www-form-urlencoded");
                }
                r.send(body_clone).map_err(|e| format!("发送失败: {}", e))?
            } else {
                let mut r = agent.post(&req.url);
                for (k, v) in &req.headers { r = r.header(k, v); }
                r.send(String::new()).map_err(|e| format!("发送失败: {}", e))?
            }
        };

        let status_code = resp.status().as_u16();
        let headers: HashMap<String, String> = resp.headers().iter()
            .map(|(name, val)| (name.to_string(), String::from_utf8_lossy(val.as_bytes()).to_string()))
            .collect();

        let mut data = Vec::new();
        resp.body_mut().as_reader().read_to_end(&mut data).unwrap_or_default();

        Ok(AccessResponse {
            status_text: format!("{}", status_code),
            status_code,
            headers,
            data,
        })
    };

    match result() {
        Ok(resp) => {
            let mut updated = req;
            updated.response = Some(resp);
            set_request(&handle, updated);
            None
        }
        Err(e) => Some(format!("[错误] {} {}", ctx.sys.file_location(), e)),
    }
}

/// 构建 multipart/form-data 请求体
fn build_multipart_body(req: &AccessRequest, boundary: &str) -> Vec<u8> {
    let mut buf = Vec::new();
    for (field, files) in &req.files {
        for (filename, data) in files {
            write!(&mut buf, "--{}\r\n", boundary).unwrap();
            write!(&mut buf, "Content-Disposition: form-data; name=\"{}\"; filename=\"{}\"\r\n", field, filename).unwrap();
            write!(&mut buf, "Content-Type: application/octet-stream\r\n\r\n").unwrap();
            buf.extend_from_slice(data);
            write!(&mut buf, "\r\n").unwrap();
        }
    }
    // 附加 body 中的字段
    if !req.body.is_empty() {
        if let Ok(map) = serde_json::from_str::<HashMap<String, String>>(&req.body) {
            for (k, v) in &map {
                write!(&mut buf, "--{}\r\n", boundary).unwrap();
                write!(&mut buf, "Content-Disposition: form-data; name=\"{}\"\r\n\r\n{}\r\n", k, v).unwrap();
            }
        } else {
            // URL 编码解析
            for pair in req.body.split('&') {
                if let Some((k, v)) = pair.split_once('=') {
                    write!(&mut buf, "--{}\r\n", boundary).unwrap();
                    write!(&mut buf, "Content-Disposition: form-data; name=\"{}\"\r\n\r\n{}\r\n", k, v).unwrap();
                }
            }
        }
    }
    write!(&mut buf, "--{}--\r\n", boundary).unwrap();
    buf
}

// ===== 访问.全部内容 handle$ — 返回完整响应 JSON（含状态、头部、data 已屏蔽）=====

fn request_all_content_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let (handle, _) = get_req_handle_and_offset(ctx, args);
    let Some(req) = get_request(&handle) else {
        return Some(format!("[错误] {} 未新建请求", ctx.sys.file_location()));
    };
    let resp = match &req.response {
        Some(r) => r,
        None => return Some(String::new()),
    };
    let json_val = serde_json::json!({
        "method": req.method,
        "url": req.url,
        "headers": req.headers,
        "timeout": req.timeout,
        "stop_redirect": req.stop_redirect,
        "response": {
            "status_text": resp.status_text,
            "status_code": resp.status_code,
            "headers": resp.headers,
            "data": "已屏蔽",
        },
    });
    Some(json_val.to_string())
}

// ===== 访问.内容 handle$ — 返回响应 body 文本 =====

fn request_content_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let (handle, _) = get_req_handle_and_offset(ctx, args);
    let Some(req) = get_request(&handle) else {
        return Some(format!("[错误] {} 未新建请求", ctx.sys.file_location()));
    };
    let resp = match &req.response {
        Some(r) => r,
        None => return Some(String::new()),
    };
    Some(String::from_utf8_lossy(&resp.data).to_string())
}

// ===== 访问 url [headers_json]$ — 快捷 GET 请求 =====

fn access_get_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let url = ensure_http(&ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or("")));
    if url.is_empty() || url == "http://" {
        return Some(format!("[错误] {} 访问 需要 URL", ctx.sys.file_location()));
    }

    let agent: ureq::Agent = ureq::Agent::config_builder()
        .timeout_global(Some(std::time::Duration::from_secs(15)))
        .build()
        .into();

    let mut result = || -> Result<String, String> {
        let mut r = agent.get(&url).header("User-Agent", "Nebula-Client/1.0");
        if let Some(hdr_arg) = args.get(2) {
            let hdr_text = ctx.val.text(hdr_arg);
            if let Ok(headers) = serde_json::from_str::<HashMap<String, String>>(&hdr_text) {
                for (k, v) in &headers {
                    r = r.header(k, v);
                }
            }
        }
        let mut data = Vec::new();
        r.call()
            .map_err(|e| format!("请求失败: {}", e))?
            .body_mut()
            .as_reader()
            .read_to_end(&mut data)
            .unwrap_or_default();
        Ok(String::from_utf8_lossy(&data).to_string())
    };

    match result() {
        Ok(body) => Some(body),
        Err(e) => Some(format!("[错误] {} 访问失败: {}", ctx.sys.file_location(), e)),
    }
}

// ===== 访问POST url body [headers_json]$ — 快捷 POST 请求 =====

fn access_post_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let url = ensure_http(&ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or("")));
    let body = ctx.val.text(args.get(2).map(|s| s.as_str()).unwrap_or(""));
    if url.is_empty() || url == "http://" {
        return Some(format!("[错误] {} 访问POST 需要 URL", ctx.sys.file_location()));
    }

    let agent: ureq::Agent = ureq::Agent::config_builder()
        .timeout_global(Some(std::time::Duration::from_secs(15)))
        .build()
        .into();

    let result = || -> Result<String, String> {
        let mut r = agent.post(&url).header("User-Agent", "Nebula-Client/1.0");
        if is_json_str(&body) {
            r = r.header("Content-Type", "application/json");
        } else {
            r = r.header("Content-Type", "application/x-www-form-urlencoded");
        }
        if let Some(hdr_arg) = args.get(3) {
            let hdr_text = ctx.val.text(hdr_arg);
            if let Ok(headers) = serde_json::from_str::<HashMap<String, String>>(&hdr_text) {
                for (k, v) in &headers {
                    r = r.header(k, v);
                }
            }
        }
        let mut data = Vec::new();
        r.send(body)
            .map_err(|e| format!("请求失败: {}", e))?
            .body_mut()
            .as_reader()
            .read_to_end(&mut data)
            .unwrap_or_default();
        Ok(String::from_utf8_lossy(&data).to_string())
    };

    match result() {
        Ok(body) => Some(body),
        Err(e) => Some(format!("[错误] {} 访问POST失败: {}", ctx.sys.file_location(), e)),
    }
}

// ===== 访问转发 url$ — 将当前 HTTP 请求转发到目标 URL =====

fn request_forward_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let target_url = ensure_http(&ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or("")));
    if target_url.is_empty() || target_url == "http://" {
        return Some(format!("[错误] {} 访问转发 需要 URL", ctx.sys.file_location()));
    }

    // 从全局变量读取 _DATA（服务器模式设置的请求数据）
    let data_raw = ctx.val.p.get_cloned("_DATA");
    if data_raw.is_empty() {
        return Some("[错误] 无法获取原始请求数据".to_string());
    }

    let req_data: serde_json::Value = match serde_json::from_str(&data_raw) {
        Ok(v) => v,
        Err(_) => return Some("[错误] 原始请求数据JSON解析失败".to_string()),
    };

    let method = req_data["method"].as_str().unwrap_or("GET");
    let orig_headers = &req_data["header"];

    let agent: ureq::Agent = ureq::Agent::config_builder()
        .timeout_global(Some(std::time::Duration::from_secs(15)))
        .build()
        .into();

    let result = || -> Result<String, String> {
        let method_upper = method.to_uppercase();

        // 复制原始头部（跳过不需要转发的）
        let skip_headers = ["Host", "Content-Length", "Transfer-Encoding", "Connection", "Keep-Alive", "Proxy-Connection", "Upgrade"];

        // 准备 POST body
        let post_body = if (method_upper == "POST" || method_upper == "PUT") && !req_data["post"].is_null() {
            let post_str = req_data["post"].to_string();
            if post_str == "{}" {
                req_data["post"]["raw"].as_str().unwrap_or("").to_string()
            } else {
                post_str
            }
        } else {
            String::new()
        };

        // 构建并发送请求
        let mut data = Vec::new();
        match method_upper.as_str() {
            "GET" | "DELETE" => {
                let mut r = if method_upper == "DELETE" {
                    agent.delete(&target_url)
                } else {
                    agent.get(&target_url)
                };
                if let Some(header_obj) = orig_headers.as_object() {
                    for (k, v) in header_obj {
                        if skip_headers.contains(&k.as_str()) { continue; }
                        r = r.header(k, v.as_str().unwrap_or(""));
                    }
                }
                r.call().map_err(|e| format!("转发失败: {}", e))?
            }
            _ => {
                let mut r = agent.post(&target_url);
                if let Some(header_obj) = orig_headers.as_object() {
                    for (k, v) in header_obj {
                        if skip_headers.contains(&k.as_str()) { continue; }
                        r = r.header(k, v.as_str().unwrap_or(""));
                    }
                }
                r.send(post_body).map_err(|e| format!("转发失败: {}", e))?
            }
        }
        .body_mut()
        .as_reader()
        .read_to_end(&mut data)
        .unwrap_or_default();

        Ok(String::from_utf8_lossy(&data).to_string())
    };

    match result() {
        Ok(body) => Some(body),
        Err(e) => Some(format!("[错误] {} {}", ctx.sys.file_location(), e)),
    }
}

/// 获取请求句柄和参数起始偏移（OOP 兼容）
/// 返回 (handle, data_start_index)
/// - 显式句柄模式：args[1] 是句柄 → data_start=2
/// - OOP 模式：句柄来自 self 变量 → data_start=1
fn get_req_handle_and_offset(ctx: &mut DicContext, args: &[String]) -> (String, usize) {
    if let Some(h) = args.get(1) {
        let h = ctx.val.text(h);
        if !h.is_empty() && (h.starts_with("req_") || h.contains("访问请求@")) {
            return (h, 2);
        }
    }
    let handle = ctx.val.p.get_cloned("self");
    (handle, 1)
}

// ===== 类型转换 =====

/// $转文本 值$ — 将任意值转为文本
fn to_string_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let value = args.iter().skip(1).map(|s| s.as_str()).collect::<Vec<_>>().join(" ");
    Some(ctx.val.text(&value))
}

/// $转数字 文本$ — 文本转数字（f64），失败返回空
fn to_number_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let value = args.iter().skip(1).map(|s| s.as_str()).collect::<Vec<_>>().join(" ");
    let text = ctx.val.text(&value);
    let trimmed = text.trim();
    if let Ok(n) = trimmed.parse::<f64>() {
        // 去掉无意义的小数位 ".0"
        if n.fract() == 0.0 && !trimmed.contains('.') {
            Some(format!("__N{}", n as i64))
        } else {
            Some(format!("__N{}", n))
        }
    } else {
        None  // 失败返回 None（不赋值）
    }
}

/// $转整数 文本$ — 文本转整数，失败返回空
fn to_int_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let value = args.iter().skip(1).map(|s| s.as_str()).collect::<Vec<_>>().join(" ");
    let text = ctx.val.text(&value);
    let trimmed = text.trim();
    if let Ok(n) = trimmed.parse::<i64>() {
        Some(format!("__N{}", n))
    } else {
        // 尝试解析 f64 再取整
        if let Ok(f) = trimmed.parse::<f64>() {
            Some(format!("__N{}", f as i64))
        } else {
            None  // 失败返回 None（不赋值）
        }
    }
}

/// $转浮点 文本$ — 文本转浮点数（保留小数），失败返回空
fn to_float_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let value = args.iter().skip(1).map(|s| s.as_str()).collect::<Vec<_>>().join(" ");
    let text = ctx.val.text(&value);
    let trimmed = text.trim();
    if let Ok(f) = trimmed.parse::<f64>() {
        Some(format!("__N{}", f))
    } else {
        None  // 失败返回 None（不赋值）
    }
}

/// $取整 数字$ — 四舍五入取整
fn round_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let value = args.iter().skip(1).map(|s| s.as_str()).collect::<Vec<_>>().join(" ");
    let text = ctx.val.text(&value);
    if let Ok(f) = text.trim().parse::<f64>() {
        Some((f.round() as i64).to_string())
    } else {
        Some(String::new())
    }
}

// ===== 文本工具 =====

/// $文本包含 字符串 子串$ — 判断是否包含，返回 1/0
fn contains_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let s = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let sub = ctx.val.text(args.get(2).map(|s| s.as_str()).unwrap_or(""));
    Some(if s.contains(&sub) { "1" } else { "0" }.to_string())
}

/// $文本分割 字符串 分隔符$ — 按分隔符分割，返回第一段（多段用 %文本分割.1% 后续）
fn split_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let s = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let sep = ctx.val.text(args.get(2).map(|s| s.as_str()).unwrap_or(""));
    let parts: Vec<&str> = s.split(&sep).collect();
    let index: usize = args.get(3)
        .and_then(|a| resolve_num(ctx, a))
        .unwrap_or(0);
    if index < parts.len() {
        Some(parts[index].to_string())
    } else {
        Some(String::new())
    }
}

/// $头尾去空 文本$ — 去除首尾空白
fn trim_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let value = args.iter().skip(1).map(|s| s.as_str()).collect::<Vec<_>>().join(" ");
    Some(ctx.val.text(&value).trim().to_string())
}

/// $判断数字 文本$ — 判断是否为非负整数，返回 1/0（小数、负数返回 0）
fn is_number_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let value = args.iter().skip(1).map(|s| s.as_str()).collect::<Vec<_>>().join(" ");
    let text = ctx.val.text(&value);
    let trimmed = text.trim();
    let result = !trimmed.is_empty() && trimmed.chars().all(|c| c.is_ascii_digit());
    Some(if result { "1" } else { "0" }.to_string())
}

// ===== 大小写转换 =====

/// $大写 文本$ — 转为大写
fn upper_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let value = args.iter().skip(1).map(|s| s.as_str()).collect::<Vec<_>>().join(" ");
    let text = ctx.val.text(&value);
    Some(text.to_uppercase())
}

/// $小写 文本$ — 转为小写
fn lower_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let value = args.iter().skip(1).map(|s| s.as_str()).collect::<Vec<_>>().join(" ");
    let text = ctx.val.text(&value);
    Some(text.to_lowercase())
}

// ===== 查找与统计 =====

/// $查找 字符串 子串$ — 查找子串位置（0-based），找不到返回 "-1"
fn find_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let s = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let sub = ctx.val.text(args.get(2).map(|s| s.as_str()).unwrap_or(""));
    let start: usize = args.get(3)
        .and_then(|a| resolve_num(ctx, a))
        .unwrap_or(0);
    if start < s.len() {
        s[start..].find(&sub).map(|pos| (start + pos).to_string())
            .or_else(|| Some("-1".to_string()))
    } else {
        Some("-1".to_string())
    }
}

/// $计数 字符串 子串$ — 统计子串出现次数
fn count_sub_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let s = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let sub = ctx.val.text(args.get(2).map(|s| s.as_str()).unwrap_or(""));
    let count = s.matches(&sub).count();
    Some(count.to_string())
}

// ===== 前后缀判断 =====

/// $开头判断 字符串 前缀$ — 判断是否以指定前缀开头，返回 1/0
fn starts_with_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let s = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let prefix = ctx.val.text(args.get(2).map(|s| s.as_str()).unwrap_or(""));
    Some(if s.starts_with(&prefix) { "1" } else { "0" }.to_string())
}

/// $结尾判断 字符串 后缀$ — 判断是否以指定后缀结尾，返回 1/0
fn ends_with_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let s = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let suffix = ctx.val.text(args.get(2).map(|s| s.as_str()).unwrap_or(""));
    Some(if s.ends_with(&suffix) { "1" } else { "0" }.to_string())
}

// ===== 数学函数 =====

/// $绝对值 数字$ — 返回绝对值
fn abs_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let value = args.iter().skip(1).map(|s| s.as_str()).collect::<Vec<_>>().join(" ");
    let text = ctx.val.text(&value);
    let trimmed = text.trim();
    // 尝试解析为整数
    if let Ok(i) = trimmed.parse::<i64>() {
        return Some(i.abs().to_string());
    }
    // 尝试解析为浮点
    if let Ok(f) = trimmed.parse::<f64>() {
        return Some(format_f64(f.abs()));
    }
    None
}

fn extreme_fn(ctx: &mut DicContext, args: &[String], better: fn(f64, f64) -> bool) -> Option<String> {
    let arg_count = args.len().saturating_sub(1);
    if arg_count == 0 {
        return None;
    }
    let mut best: Option<f64> = None;
    for arg in args.iter().skip(1) {
        let text = ctx.val.text(arg);
        if let Ok(f) = text.trim().parse::<f64>() {
            best = Some(match best {
                Some(m) => if better(f, m) { f } else { m },
                None => f,
            });
        }
    }
    best.map(format_f64)
}

/// $最大值 数字1 数字2 ...$ — 返回最大值
fn max_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    extreme_fn(ctx, args, |a, b| a > b)
}

/// $最小值 数字1 数字2 ...$ — 返回最小值
fn min_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    extreme_fn(ctx, args, |a, b| a < b)
}

// ===== 文本拼接与重复 =====

/// $文本连接 分隔符 文本1 文本2 ...$ — 用分隔符连接多个文本
fn join_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let sep = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let parts: Vec<String> = args.iter().skip(2)
        .map(|a| ctx.val.text(a))
        .collect();
    Some(parts.join(&sep))
}

/// $文本重复 文本 次数$ — 将文本重复指定次数
fn repeat_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let s = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let n: usize = args.get(2)
        .and_then(|a| resolve_num(ctx, a))
        .unwrap_or(1);
    Some(s.repeat(n))
}

// ==================== 字符串判断函数 ====================

fn str_predicate_fn(ctx: &mut DicContext, args: &[String], pred: impl FnOnce(&str) -> bool) -> Option<String> {
    let s = ctx.val.text(&args.iter().skip(1).map(|s| s.as_str()).collect::<Vec<_>>().join(" "));
    let result = pred(&s);
    Some(if result { "1".to_string() } else { String::new() })
}

/// 判断是否全为 ASCII 字母 (A-Z a-z)，非空
fn is_alpha_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    str_predicate_fn(ctx, args, |s| !s.is_empty() && s.chars().all(|c| c.is_ascii_alphabetic()))
}

/// Python str.islower()
fn is_lower_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    str_predicate_fn(ctx, args, |s| {
        let has_cased = s.chars().any(|c| c.is_alphabetic() && c.is_lowercase());
        let all_lower = s.chars().all(|c| !c.is_alphabetic() || c.is_lowercase());
        has_cased && all_lower
    })
}

/// Python str.isupper()
fn is_upper_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    str_predicate_fn(ctx, args, |s| {
        let has_cased = s.chars().any(|c| c.is_alphabetic() && c.is_uppercase());
        let all_upper = s.chars().all(|c| !c.is_alphabetic() || c.is_uppercase());
        has_cased && all_upper
    })
}

/// Python str.isspace() — 全空白字符且非空时返回 "1"
fn is_space_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    str_predicate_fn(ctx, args, |s| !s.is_empty() && s.chars().all(|c| c.is_whitespace()))
}

// ==================== 字符串变形函数 ====================

/// Python str.title() — 每个单词首字母大写
fn title_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let s = ctx.val.text(&args.iter().skip(1).map(|s| s.as_str()).collect::<Vec<_>>().join(" "));
    let mut result = String::with_capacity(s.len());
    let mut capitalize_next = true;
    for c in s.chars() {
        if c.is_whitespace() {
            capitalize_next = true;
            result.push(c);
        } else if capitalize_next {
            result.extend(c.to_uppercase());
            capitalize_next = false;
        } else {
            result.extend(c.to_lowercase());
        }
    }
    Some(result)
}

/// Python str.swapcase() — 大小写互换
fn swap_case_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let s = ctx.val.text(&args.iter().skip(1).map(|s| s.as_str()).collect::<Vec<_>>().join(" "));
    let result: String = s.chars().map(|c| {
        if c.is_lowercase() {
            c.to_uppercase().collect::<String>()
        } else if c.is_uppercase() {
            c.to_lowercase().collect::<String>()
        } else {
            c.to_string()
        }
    }).collect();
    Some(result)
}

struct AlignArgs {
    s: String,
    width: usize,
    fill_char: char,
}

fn parse_align_args(ctx: &mut DicContext, args: &[String]) -> AlignArgs {
    let s = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let width: usize = args.get(2)
        .and_then(|a| resolve_num(ctx, a))
        .unwrap_or(0);
    let fill = args.get(3).map(|s| s.as_str()).unwrap_or(" ");
    let fill_char = fill.chars().next().unwrap_or(' ');
    AlignArgs { s, width, fill_char }
}

/// Python str.ljust(width, fillchar) — 左对齐填充
fn ljust_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let aa = parse_align_args(ctx, args);
    if aa.s.len() >= aa.width {
        Some(aa.s)
    } else {
        let padding: String = std::iter::repeat_n(aa.fill_char, aa.width - aa.s.len()).collect();
        Some(aa.s + &padding)
    }
}

/// Python str.rjust(width, fillchar) — 右对齐填充
fn rjust_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let aa = parse_align_args(ctx, args);
    if aa.s.len() >= aa.width {
        Some(aa.s)
    } else {
        let padding: String = std::iter::repeat_n(aa.fill_char, aa.width - aa.s.len()).collect();
        Some(padding + &aa.s)
    }
}

/// Python str.center(width, fillchar) — 居中填充
fn center_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let aa = parse_align_args(ctx, args);
    if aa.s.len() >= aa.width {
        Some(aa.s)
    } else {
        let left_pad = (aa.width - aa.s.len()) / 2;
        let right_pad = aa.width - aa.s.len() - left_pad;
        let left: String = std::iter::repeat_n(aa.fill_char, left_pad).collect();
        let right: String = std::iter::repeat_n(aa.fill_char, right_pad).collect();
        Some(left + &aa.s + &right)
    }
}

// ==================== 数学扩展函数 ====================

/// Python pow(base, exp) — 幂运算
fn pow_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let text_base = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let text_exp = ctx.val.text(args.get(2).map(|s| s.as_str()).unwrap_or(""));
    let base: f64 = text_base.trim().parse::<f64>().unwrap_or(0.0);
    let exp: f64 = text_exp.trim().parse::<f64>().unwrap_or(1.0);
    let result = base.powf(exp);
    Some(format_f64(result))
}

/// Python sum() — 多参数求和
fn sum_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let mut total = 0.0_f64;
    let mut has_num = false;
    for arg in args.iter().skip(1) {
        let text = ctx.val.text(arg);
        if let Ok(n) = text.trim().parse::<f64>() {
            total += n;
            has_num = true;
        }
    }
    if has_num {
        Some(format_f64(total))
    } else {
        Some("0".to_string())
    }
}

fn math_unary_fn(ctx: &mut DicContext, args: &[String], op: fn(f64) -> f64) -> Option<String> {
    let text = ctx.val.text(&args.iter().skip(1).map(|s| s.as_str()).collect::<Vec<_>>().join(" "));
    let n: f64 = text.trim().parse::<f64>().unwrap_or(0.0);
    Some(format_f64(op(n)))
}

/// Python math.ceil(x) — 向上取整
fn ceil_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    math_unary_fn(ctx, args, f64::ceil)
}

/// Python math.floor(x) — 向下取整
fn floor_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    math_unary_fn(ctx, args, f64::floor)
}

/// Python math.sqrt(x) — 返回平方根
fn sqrt_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let text = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let n: f64 = text.trim().parse::<f64>().unwrap_or(0.0);
    if n < 0.0 {
        return Some(String::new());
    }
    Some(format_f64(n.sqrt()))
}

/// 返回 0..max 的随机整数；不传参数则返回 0..1 的随机浮点数
fn random_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let max_str = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    if max_str.is_empty() {
        // 返回 0~1 之间的随机浮点数
        let r = simple_rand(1_000_000) as f64 / 1_000_000.0;
        Some(format_f64(r))
    } else {
        let max = resolve_num(ctx, &max_str).unwrap_or(100);
        Some(simple_rand(max).to_string())
    }
}

// ==================== 画布 模块 ====================

/// 获取画布句柄和参数起始偏移（OOP 兼容）
/// 返回 (handle, data_start_index)
/// - 显式句柄模式：args[1] 是句柄 → data_start=2
/// - OOP 模式：句柄来自 self 变量 → data_start=1
fn get_canvas_handle_and_offset(ctx: &mut DicContext, args: &[String]) -> (String, usize) {
    if let Some(h) = args.get(1) {
        let h = ctx.val.text(h);
        if !h.is_empty() && h.contains('@') {
            return (h, 2);
        }
    }
    let handle = ctx.val.p.get_cloned("self");
    (handle, 1)
}

/// 对 args 做变量替换，支持 OOP self 模式
fn resolve_canvas_args(ctx: &mut DicContext, args: &[String]) -> Vec<String> {
    if args.is_empty() {
        return vec![];
    }
    let (handle, offset) = get_canvas_handle_and_offset(ctx, args);
    let mut resolved = vec![ctx.val.text(&args[0])];
    resolved.push(handle);
    for i in offset..args.len() {
        resolved.push(ctx.val.text(&args[i]));
    }
    resolved
}

/// 对 args 做变量替换（不插入 self，供不需要 OOP 的函数使用）
fn resolve_args(ctx: &mut DicContext, args: &[String]) -> Vec<String> {
    args.iter().map(|a| ctx.val.text(a)).collect()
}

macro_rules! canvas_err {
    ($ctx:expr, $msg:expr) => {
        Some(format!("[错误] {} {}", $ctx.sys.file_location(), $msg))
    };
}

/// $创建画布 [width] [height] [bgColor]$ — 生成并返回画布对象结构体
fn canvas_new_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_args(ctx, args);
    match canvas::canvas_new(&resolved) {
        Ok(handle) => {
            // 读取画布数据，将对象属性写入变量系统
            if let Some(c) = canvas::get_canvas(&handle) {
                ctx.val.p.set_string(&format!("{}.width", handle), c.width.to_string());
                ctx.val.p.set_string(&format!("{}.height", handle), c.height.to_string());
                ctx.val.p.set_string(&format!("{}.size", handle), c.size.to_string());
                let color_str = format!("#{:02X}{:02X}{:02X}{:02X}", c.color[0], c.color[1], c.color[2], c.color[3]);
                ctx.val.p.set_string(&format!("{}.color", handle), color_str);
                if c.font_data.is_some() {
                    ctx.val.p.set_string(&format!("{}.font", handle), "已加载".to_string());
                }
            }

            Some(handle)
        }
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $画布.获取 [format]$
fn canvas_get_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_canvas_args(ctx, args);
    match canvas::canvas_get(&resolved) {
        Ok(data) => Some(data),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $画笔.设置颜色 [color]$
fn canvas_brush_color_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_canvas_args(ctx, args);
    let handle = resolved.get(1).cloned().unwrap_or_default();
    match canvas::brush_set_color(&resolved) {
        Ok(None) => {
            // 更新实例变量中的颜色属性
            if let Some(c) = canvas::get_canvas(&handle) {
                let color_str = format!("#{:02X}{:02X}{:02X}{:02X}", c.color[0], c.color[1], c.color[2], c.color[3]);
                ctx.val.p.set_string(&format!("{}.color", handle), color_str);
            }
            None
        }
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $画笔.获取颜色$
fn canvas_brush_get_color_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_canvas_args(ctx, args);
    match canvas::brush_get_color(&resolved) {
        Ok(s) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $画笔.大小 [size]$
fn canvas_brush_size_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_canvas_args(ctx, args);
    let handle = resolved.get(1).cloned().unwrap_or_default();
    match canvas::brush_set_size(&resolved) {
        Ok(None) => {
            // 更新实例变量中的大小属性
            if let Some(c) = canvas::get_canvas(&handle) {
                ctx.val.p.set_string(&format!("{}.size", handle), c.size.to_string());
            }
            None
        }
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.点 x y [color]$
fn canvas_draw_point_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_canvas_args(ctx, args);
    match canvas::draw_point(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.线 x1 y1 x2 y2 [color]$
fn canvas_draw_line_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_canvas_args(ctx, args);
    match canvas::draw_line(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.方形 x y w h [radius] [color]$
fn canvas_draw_rect_fill_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_canvas_args(ctx, args);
    match canvas::draw_rect_fill(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.方形描边 x y w h [radius] [color]$
fn canvas_draw_rect_stroke_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_canvas_args(ctx, args);
    match canvas::draw_rect_stroke(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.椭圆 x y w h [color]$
fn canvas_draw_ellipse_fill_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_canvas_args(ctx, args);
    match canvas::draw_ellipse_fill(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.椭圆描边 x y w h [color]$
fn canvas_draw_ellipse_stroke_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_canvas_args(ctx, args);
    match canvas::draw_ellipse_stroke(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.圆形 cx cy [radius] [startDeg] [endDeg] [color]$
fn canvas_draw_pie_fill_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_canvas_args(ctx, args);
    match canvas::draw_pie_fill(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.圆形描边 cx cy [radius] [startDeg] [endDeg] [color]$
fn canvas_draw_pie_stroke_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_canvas_args(ctx, args);
    match canvas::draw_pie_stroke(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.圆弧 cx cy radius startDeg endDeg [color]$
fn canvas_draw_arc_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_canvas_args(ctx, args);
    match canvas::draw_arc(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.图片 srcData x y [alpha]$
fn canvas_draw_image_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_canvas_args(ctx, args);
    match canvas::draw_image(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.文本 x y text [color] [strokeColor] [strokeWidth]$
fn canvas_draw_text_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_canvas_args(ctx, args);
    match canvas::draw_text(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $画布.灰度$
fn canvas_grayscale_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_canvas_args(ctx, args);
    match canvas::canvas_grayscale(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $画布.马赛克 [blockSize]$
fn canvas_mosaic_all_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_canvas_args(ctx, args);
    match canvas::canvas_mosaic_all(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.马赛克 x y w h$
fn canvas_draw_mosaic_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_canvas_args(ctx, args);
    match canvas::draw_mosaic(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.高斯模糊 x y w h$
fn canvas_draw_blur_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_canvas_args(ctx, args);
    match canvas::draw_gaussian_blur(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $画布.旋转 degrees [bgColor]$
fn canvas_rotate_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_canvas_args(ctx, args);
    let handle = resolved.get(1).cloned().unwrap_or_default();
    match canvas::canvas_rotate(&resolved) {
        Ok(None) => {
            // 旋转后画布尺寸可能变化，更新实例变量
            if let Some(c) = canvas::get_canvas(&handle) {
                ctx.val.p.set_string(&format!("{}.width", handle), c.width.to_string());
                ctx.val.p.set_string(&format!("{}.height", handle), c.height.to_string());
            }
            None
        }
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $画布.圆形 radius [bgColor]$
fn canvas_round_corners_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_canvas_args(ctx, args);
    match canvas::canvas_round_corners(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.喷漆 x1 y1 x2 y2 [rangeRadius] [density] [color] [pointRadius]$
fn canvas_brush_line_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_canvas_args(ctx, args);
    match canvas::draw_brush_line(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.波浪 x1 y1 x2 y2 [amplitude] [wavelength] [step]$
fn canvas_wave_line_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_canvas_args(ctx, args);
    match canvas::draw_wave_line(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.油漆桶 x y [fillColor]$
fn canvas_flood_fill_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_canvas_args(ctx, args);
    match canvas::draw_flood_fill(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.随机点 [dotCount]$
fn canvas_random_dots_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_canvas_args(ctx, args);
    match canvas::draw_random_dots(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.随机线条 [lineCount]$
fn canvas_random_lines_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_canvas_args(ctx, args);
    match canvas::draw_random_lines(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.多边形 x,y x,y ... [color]$
fn canvas_polygon_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_canvas_args(ctx, args);
    match canvas::draw_polygon(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.多边形描边 x,y x,y ... [color]$
fn canvas_polygon_stroke_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_canvas_args(ctx, args);
    match canvas::draw_polygon_stroke(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

// ==================== 文件读写 ====================

/// 生成当前本地时间字符串，格式 "2006-01-02 15:04:05"（UTC+8）
fn format_local_time() -> String {
    use std::time::UNIX_EPOCH;
    let now = std::time::SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap_or_default();
    // UTC+8
    let total_secs = now.as_secs().saturating_add(8 * 3600);
    let day_secs = total_secs % 86400;
    let h = day_secs / 3600;
    let m = (day_secs % 3600) / 60;
    let s = day_secs % 60;
    let total_days = (total_secs / 86400) as i64;
    let (year, month, day) = days_to_ymd(total_days);
    format!("{:04}-{:02}-{:02} {:02}:{:02}:{:02}", year, month, day, h, m, s)
}

/// 从 1970-01-01 起的天数计算年月日
fn days_to_ymd(days: i64) -> (i64, u32, u32) {
    let mut remaining = days;
    let mut year = 1970i64;
    loop {
        let days_in_year = if is_leap_year(year) { 366 } else { 365 };
        if remaining < days_in_year { break; }
        remaining -= days_in_year;
        year += 1;
    }
    let leap = is_leap_year(year);
    let months = [31, if leap { 29 } else { 28 }, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let mut month = 1u32;
    for &md in &months {
        if remaining < md as i64 { break; }
        remaining -= md as i64;
        month += 1;
    }
    (year, month, (remaining + 1) as u32)
}

fn is_leap_year(y: i64) -> bool {
    (y % 4 == 0 && y % 100 != 0) || (y % 400 == 0)
}

/// $写文件 路径 内容$ — 将内容写入文件
fn write_string_file_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let path = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let data = ctx.val.text(args.get(2).map(|s| s.as_str()).unwrap_or(""));
    if path.is_empty() {
        return Some(format!("[错误] {} 写文件 需要路径", ctx.sys.file_location()));
    }
    if let Some(parent) = std::path::Path::new(&path).parent() {
        let _ = std::fs::create_dir_all(parent);
    }
    let path_buf = std::path::PathBuf::from(&path);
    match file_lock::with_file_write(&path_buf, || std::fs::write(&path, &data)) {
        Ok(()) => None,
        Err(e) => Some(format!("[错误] {} 写文件失败: {}", ctx.sys.file_location(), e)),
    }
}

/// $读文件 路径 [默认值]$ — 读取整个文件内容，失败时返回默认值
fn read_string_file_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let path = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let default = ctx.val.text(args.get(2).map(|s| s.as_str()).unwrap_or(""));
    if path.is_empty() {
        return Some(default);
    }
    let path_buf = std::path::PathBuf::from(&path);
    match file_lock::with_file_read(&path_buf, || std::fs::read_to_string(&path)) {
        Ok(s) => {
            let s = s.replace("\r\n", "\n")     // CRLF 字节 → LF
                     .replace('\r', "\n");       // 独立 CR 字节 → LF
            Some(crate::analyzer::unescape_newline(&s))
        },
        Err(_) => Some(default),
    }
}

/// $写 路径 键 值$ — 将键值对写入 database/ 下的键值文件
/// 文件格式：首行为更新时间，后续每行为 key=value
fn write_key_string_file_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let key = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let subkey = ctx.val.text(args.get(2).map(|s| s.as_str()).unwrap_or(""));
    let value = ctx.val.text(args.get(3).map(|s| s.as_str()).unwrap_or(""));
    if key.is_empty() {
        return Some(format!("[错误] {} 写 需要路径参数", ctx.sys.file_location()));
    }
    let path = format!("database/{}", key);
    let path_buf = std::path::PathBuf::from(&path);
    file_lock::with_file_write(&path_buf, || {
        let data = std::fs::read_to_string(&path).unwrap_or_default();
        let lines: Vec<&str> = data.lines().collect();
        let now = format_local_time();
        let mut new_lines: Vec<String> = Vec::new();
        new_lines.push(format!("更新时间: {}", now));
        let mut found = false;
        for (i, line) in lines.iter().enumerate() {
            if i == 0 { continue; }
            if found {
                new_lines.push(line.to_string());
            } else if let Some(eq_pos) = line.find('=') {
                let k = &line[..eq_pos];
                if k == subkey {
                    new_lines.push(format!("{}={}", subkey, value));
                    found = true;
                } else {
                    new_lines.push(line.to_string());
                }
            } else {
                new_lines.push(line.to_string());
            }
        }
        if !found {
            new_lines.push(format!("{}={}", subkey, value));
        }
        let new_data = new_lines.join("\n");
        if let Some(parent) = std::path::Path::new(&path).parent() {
            let _ = std::fs::create_dir_all(parent);
        }
        let _ = std::fs::write(&path, &new_data);
    });
    None
}

/// $读 路径 [键] [默认值]$ — 读取 database/ 下的键值文件
/// 不传键时返回全部键值对的 JSON 数组；传键时查找对应值，未找到返回默认值
fn read_key_string_file_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let key = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    if key.is_empty() {
        return Some("[]".to_string());
    }
    let path = format!("database/{}", key);
    let path_buf = std::path::PathBuf::from(&path);
    let data = match file_lock::with_file_read(&path_buf, || std::fs::read_to_string(&path)) {
        Ok(s) => s,
        Err(_) => {
            if args.len() >= 4 {
                return Some(ctx.val.text(args.get(3).map(|s| s.as_str()).unwrap_or("")));
            }
            return Some("[]".to_string());
        }
    };
    // 只有一个路径参数：返回全部键值对 JSON 数组
    if args.len() <= 2 {
        let mut result: Vec<serde_json::Value> = Vec::new();
        for (i, line) in data.lines().enumerate() {
            if i == 0 { continue; }
            if let Some(eq_pos) = line.find('=') {
                let k = &line[..eq_pos];
                let v = &line[eq_pos + 1..];
                result.push(serde_json::json!({"key": k, "data": v}));
            }
        }
        return Some(serde_json::Value::Array(result).to_string());
    }
    // 查找特定键
    let subkey = ctx.val.text(args.get(2).map(|s| s.as_str()).unwrap_or(""));
    for (i, line) in data.lines().enumerate() {
        if i == 0 { continue; }
        if let Some(eq_pos) = line.find('=') {
            let k = &line[..eq_pos];
            let v = &line[eq_pos + 1..];
            if k == subkey {
                return Some(v.to_string());
            }
        }
    }
    Some(ctx.val.text(args.get(3).map(|s| s.as_str()).unwrap_or("")))
}

// ==================== 更多文件操作 ====================

/// $删除文件 路径$ — 删除文件
fn delete_file_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let path = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    if path.is_empty() { return None; }
    let path_buf = std::path::PathBuf::from(&path);
    file_lock::with_file_write(&path_buf, || {
        match std::fs::metadata(&path) {
            Ok(meta) if meta.is_file() => { let _ = std::fs::remove_file(&path); }
            _ => {}
        }
    });
    None
}

/// $删除文件夹 路径$ — 删除文件夹及其所有内容
fn delete_dir_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let path = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    if path.is_empty() { return None; }
    let path_buf = std::path::PathBuf::from(&path);
    file_lock::with_file_write(&path_buf, || {
        match std::fs::metadata(&path) {
            Ok(meta) if meta.is_dir() => { let _ = std::fs::remove_dir_all(&path); }
            _ => {}
        }
    });
    None
}

/// $存在文件 路径$ — 判断是否为已存在的文件，返回 true/false
fn file_exist_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let path = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let path_buf = std::path::PathBuf::from(&path);
    let exists = file_lock::with_file_read(&path_buf, || {
        std::fs::metadata(&path).map(|m| m.is_file()).unwrap_or(false)
    });
    Some(exists.to_string())
}

/// $存在文件夹 路径$ — 判断是否为已存在的文件夹，返回 true/false
fn dir_exist_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let path = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let path_buf = std::path::PathBuf::from(&path);
    let exists = file_lock::with_file_read(&path_buf, || {
        std::fs::metadata(&path).map(|m| m.is_dir()).unwrap_or(false)
    });
    Some(exists.to_string())
}

/// $存在文件或文件夹 路径$ — 判断路径是否存在，返回 true/false
fn file_or_dir_exist_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let path = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let path_buf = std::path::PathBuf::from(&path);
    let exists = file_lock::with_file_read(&path_buf, || {
        std::path::Path::new(&path).exists()
    });
    Some(exists.to_string())
}

/// $文件后缀 路径$ — 获取文件扩展名，含前导点
fn file_suffix_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let path = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let ext = std::path::Path::new(&path)
        .extension()
        .map(|e| format!(".{}", e.to_string_lossy()))
        .unwrap_or_default();
    Some(ext)
}

/// $文件头部 路径或后缀$ — 根据文件后缀返回 Content-Type 头部
fn file_header_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let path = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let ext = std::path::Path::new(&path)
        .extension()
        .map(|e| e.to_string_lossy().to_lowercase())
        .unwrap_or_else(|| path.trim_start_matches('.').to_lowercase());

    let mime = match ext.as_str() {
        // 文本类
        "html" | "htm" => "text/html; charset=utf-8",
        "css" => "text/css; charset=utf-8",
        "js" | "mjs" => "application/javascript; charset=utf-8",
        "json" => "application/json; charset=utf-8",
        "xml" => "application/xml; charset=utf-8",
        "txt" | "text" => "text/plain; charset=utf-8",
        "csv" => "text/csv; charset=utf-8",
        "md" | "markdown" => "text/markdown; charset=utf-8",
        "yaml" | "yml" => "text/yaml; charset=utf-8",
        "toml" => "application/toml; charset=utf-8",
        // 图片类
        "png" => "image/png",
        "jpg" | "jpeg" => "image/jpeg",
        "gif" => "image/gif",
        "svg" => "image/svg+xml",
        "ico" => "image/x-icon",
        "webp" => "image/webp",
        "bmp" => "image/bmp",
        "tiff" | "tif" => "image/tiff",
        // 字体类
        "woff" => "font/woff",
        "woff2" => "font/woff2",
        "ttf" => "font/ttf",
        "otf" => "font/otf",
        "eot" => "application/vnd.ms-fontobject",
        // 音视频类
        "mp3" => "audio/mpeg",
        "wav" => "audio/wav",
        "ogg" => "audio/ogg",
        "flac" => "audio/flac",
        "mp4" => "video/mp4",
        "webm" => "video/webm",
        "avi" => "video/x-msvideo",
        // 文档类
        "pdf" => "application/pdf",
        "zip" => "application/zip",
        "tar" => "application/x-tar",
        "gz" => "application/gzip",
        "bz2" => "application/x-bzip2",
        "7z" => "application/x-7z-compressed",
        "rar" => "application/vnd.rar",
        "doc" => "application/msword",
        "docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "xls" => "application/vnd.ms-excel",
        "xlsx" => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "ppt" => "application/vnd.ms-powerpoint",
        "pptx" => "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        // 其他
        "wasm" => "application/wasm",
        _ => "application/octet-stream",
    };
    Some(mime.to_string())
}

/// 简易伪随机数生成器
fn simple_rand(max: usize) -> usize {
    if max == 0 { return 0; }
    use std::time::{SystemTime, UNIX_EPOCH};
    let nanos = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|d| d.as_nanos())
        .unwrap_or(0);
    let mut x = nanos as u64;
    x ^= x << 13;
    x ^= x >> 7;
    x ^= x << 17;
    x = x.wrapping_mul(0x2545F4914F6CDD1D);
    x ^= x >> 32;
    (x as usize) % max
}


/// $读文件行 路径 起始行 数量 [默认值]$ — 从起始行开始读取指定数量的行，返回 JSON 数组
/// 起始行和数量均为 1-based
fn read_file_lines_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let path = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let start: usize = args.get(2).and_then(|a| resolve_num(ctx, a)).unwrap_or(1).max(1);
    let count: usize = args.get(3).and_then(|a| resolve_num(ctx, a)).unwrap_or(1).max(1);
    let default = ctx.val.text(args.get(4).map(|s| s.as_str()).unwrap_or(""));
    let path_buf = std::path::PathBuf::from(&path);
    let content = match file_lock::with_file_read(&path_buf, || std::fs::read_to_string(&path)) {
        Ok(s) => s,
        Err(_) => return Some(default),
    };
    let lines: Vec<&str> = content.lines().collect();
    let start_idx = (start.saturating_sub(1)).min(lines.len());
    let end_idx = (start_idx + count).min(lines.len());
    let selected: Vec<serde_json::Value> = lines[start_idx..end_idx]
        .iter()
        .map(|s| serde_json::Value::String(s.to_string()))
        .collect();
    Some(serde_json::Value::Array(selected).to_string())
}

/// $文件夹列表 [路径]$ — 列出目录下的文件夹名，返回 JSON 数组
fn dir_list_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let path = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let path_buf = std::path::PathBuf::from(&path);
    let dirs: Vec<serde_json::Value> = match file_lock::with_file_read(&path_buf, || std::fs::read_dir(&path)) {
        Ok(entries) => entries
            .filter_map(|e| e.ok())
            .filter(|e| e.file_type().map(|ft| ft.is_dir()).unwrap_or(false))
            .map(|e| serde_json::Value::String(e.file_name().to_string_lossy().to_string()))
            .collect(),
        Err(_) => return Some("[]".to_string()),
    };
    Some(serde_json::Value::Array(dirs).to_string())
}

/// $文件列表 [路径]$ — 列出目录下的文件名，返回 JSON 数组
fn file_list_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let path = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let path_buf = std::path::PathBuf::from(&path);
    let files: Vec<serde_json::Value> = match file_lock::with_file_read(&path_buf, || std::fs::read_dir(&path)) {
        Ok(entries) => entries
            .filter_map(|e| e.ok())
            .filter(|e| e.file_type().map(|ft| ft.is_file()).unwrap_or(false))
            .map(|e| serde_json::Value::String(e.file_name().to_string_lossy().to_string()))
            .collect(),
        Err(_) => return Some("[]".to_string()),
    };
    Some(serde_json::Value::Array(files).to_string())
}

/// $随机文件夹名 [路径]$ — 随机返回目录下的一个文件夹名
fn random_dir_name_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let path = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let path_buf = std::path::PathBuf::from(&path);
    let dirs: Vec<String> = match file_lock::with_file_read(&path_buf, || std::fs::read_dir(&path)) {
        Ok(entries) => entries
            .filter_map(|e| e.ok())
            .filter(|e| e.file_type().map(|ft| ft.is_dir()).unwrap_or(false))
            .map(|e| e.file_name().to_string_lossy().to_string())
            .collect(),
        Err(_) => return Some(String::new()),
    };
    if dirs.is_empty() { return Some(String::new()); }
    let idx = simple_rand(dirs.len());
    Some(dirs[idx].clone())
}

/// $随机文件名 [路径]$ — 随机返回目录下的一个文件名
fn random_file_name_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let path = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let path_buf = std::path::PathBuf::from(&path);
    let files: Vec<String> = match file_lock::with_file_read(&path_buf, || std::fs::read_dir(&path)) {
        Ok(entries) => entries
            .filter_map(|e| e.ok())
            .filter(|e| e.file_type().map(|ft| ft.is_file()).unwrap_or(false))
            .map(|e| e.file_name().to_string_lossy().to_string())
            .collect(),
        Err(_) => return Some(String::new()),
    };
    if files.is_empty() { return Some(String::new()); }
    let idx = simple_rand(files.len());
    Some(files[idx].clone())
}

/// $文件夹大小 路径$ — 递归计算目录总大小（字节）
fn dir_size_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let path = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let path_buf = std::path::PathBuf::from(&path);
    let size = file_lock::with_file_read(&path_buf, || dir_calc_size(std::path::Path::new(&path)));
    Some(size.to_string())
}

fn dir_calc_size(path: &std::path::Path) -> u64 {
    if path.is_file() {
        return path.metadata().map(|m| m.len()).unwrap_or(0);
    }
    let mut total = 0u64;
    if let Ok(entries) = std::fs::read_dir(path) {
        for entry in entries.flatten() {
            total += dir_calc_size(&entry.path());
        }
    }
    total
}

/// $文件大小 路径$ — 获取文件大小（字节）
fn file_size_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let path = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let path_buf = std::path::PathBuf::from(&path);
    let size = file_lock::with_file_read(&path_buf, || {
        std::fs::metadata(&path).map(|m| m.len()).unwrap_or(0)
    });
    Some(size.to_string())
}

/// $重命名 原路径 新路径$ — 重命名文件或文件夹，返回 true/false
fn file_rename_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let src = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let dst = ctx.val.text(args.get(2).map(|s| s.as_str()).unwrap_or(""));
    if src.is_empty() || dst.is_empty() { return Some("false".to_string()); }
    let dst_buf = std::path::PathBuf::from(&dst);
    let ok = file_lock::with_file_write(&dst_buf, || std::fs::rename(&src, &dst).is_ok());
    Some(ok.to_string())
}

/// $复制粘贴 原路径 目标路径$ — 复制文件或文件夹，返回 true/false
fn file_copy_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let src = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let dst = ctx.val.text(args.get(2).map(|s| s.as_str()).unwrap_or(""));
    if src == dst || src.is_empty() || dst.is_empty() { return Some("false".to_string()); }
    let dst_buf = std::path::PathBuf::from(&dst);
    let ok = file_lock::with_file_write(&dst_buf, || {
        match std::fs::metadata(&src) {
            Ok(meta) if meta.is_dir() => copy_dir_recursive(std::path::Path::new(&src), std::path::Path::new(&dst)).is_ok(),
            Ok(_) => std::fs::copy(&src, &dst).is_ok(),
            Err(_) => false,
        }
    });
    Some(ok.to_string())
}

fn copy_dir_recursive(src: &std::path::Path, dst: &std::path::Path) -> std::io::Result<()> {
    std::fs::create_dir_all(dst)?;
    for entry in std::fs::read_dir(src)? {
        let entry = entry?;
        let dst_path = dst.join(entry.file_name());
        if entry.file_type()?.is_dir() {
            copy_dir_recursive(&entry.path(), &dst_path)?;
        } else {
            std::fs::copy(entry.path(), &dst_path)?;
        }
    }
    Ok(())
}

/// $下载文件 下载地址 保存路径$ — 从 URL 下载文件到本地
fn download_file_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let url = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let save_path = ctx.val.text(args.get(2).map(|s| s.as_str()).unwrap_or(""));
    if url.is_empty() || save_path.is_empty() {
        return Some(String::new());
    }
    if let Some(parent) = std::path::Path::new(&save_path).parent() {
        let _ = std::fs::create_dir_all(parent);
    }
    let agent: ureq::Agent = ureq::Agent::config_builder()
        .timeout_global(Some(std::time::Duration::from_secs(300)))
        .build()
        .into();
    // 先下载数据（不加锁，避免长时间阻塞其他文件操作）
    let mut data = Vec::new();
    if let Err(e) = (|| -> Result<(), String> {
        agent.get(&url)
            .header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
            .call()
            .map_err(|e| format!("下载失败: {}", e))?
            .body_mut()
            .as_reader()
            .read_to_end(&mut data)
            .map_err(|e| format!("读取失败: {}", e))
            .map(|_| ())
    })() {
        eprintln!("[Nebula] {}", e);
        return Some(String::new());
    }
    // 写入文件时加写锁
    let save_path_buf = std::path::PathBuf::from(&save_path);
    match file_lock::with_file_write(&save_path_buf, || std::fs::write(&save_path, &data)) {
        Ok(()) => Some("true".to_string()),
        Err(e) => {
            eprintln!("[Nebula] {}", e);
            Some(String::new())
        }
    }
}
