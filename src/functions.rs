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

fn next_instance_id() -> usize {
    INSTANCE_ID.fetch_add(1, Ordering::Relaxed)
}

// ==================== 访问请求结构体 ====================

/// HTTP 请求对象（对标 Go access.go 中的 AccessRequest）
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

/// HTTP 响应对象（对标 Go access.go 中的 AccessResponse）
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

fn format_f64(v: f64) -> String {
    if v.fract() == 0.0 { (v as i64).to_string() } else { v.to_string() }
}

/// 标准库：通过 `#引入=@模块名` 按需加载
///
/// # 用法
///
/// 在 .nr 文件头部声明引入，函数仅在使用 `#引入=` 导入后才生效：
///
/// ```nr
/// #引入=@字符串      ← 不赋变量名，函数直接全局可用：$大写 hello$
/// #引入=@数学        ← 不赋变量名，函数直接全局可用：$绝对值 -5$
/// #引入=@访问        ← 不赋变量名，创建 OOP 对象：$创建访问 url$
/// #引入=@画布      ← 不赋变量名，函数直接全局可用：$创建画布 100 100$
/// ```
///
/// # 模块列表
///
/// | 模块名 | 包含函数 |
/// |--------|---------|
/// | `@字符串` | 长度, 文本包含, 文本分割, 头尾去空, 大写, 小写, 查找, 计数, 开头判断, 结尾判断, 文本连接, 文本重复, 判断数字, 判断字母, 判断小写, 判断大写, 判断空白, 首字母大写, 大小写互换, 左对齐, 右对齐, 居中 |
/// | `@内置` | 截取, 替换, 删前缀, 删后缀 |
/// | `@数学` | 绝对值, 最大值, 最小值, 取整, 幂运算, 求和, 向上取整, 向下取整 |
/// | `@类型` | 转文本, 转数字, 转整数, 转浮点 |
/// | `@访问` | 创建访问, 切换GET, 切换POST, POST, POST文件, 启用跳转, 禁用跳转, 设置头部, 设置超时, 发送, 全部内容, 内容 |
/// | `@画布` | 创建画布, 画布.获取, 画笔.设置颜色, ... 等 30 个函数 |
/// | `@文件` | 写文件, 读文件, 写, 读, 删除文件, 删除文件夹, 存在文件, 存在文件夹, 存在文件或文件夹, 文件后缀, 读文件行, 文件夹列表, 文件列表, 随机文件夹名, 随机文件名, 文件夹大小, 文件大小, 重命名, 复制粘贴, 下载文件 |
pub struct StdLib;

impl StdLib {
    /// 解析标准库模块，返回函数列表。未找到模块返回 None。
    pub fn resolve(module: &str) -> Option<Vec<(&'static str, BuiltinFn)>> {
        let funcs: Vec<(&str, BuiltinFn)> = match module {
            "字符串" => vec![
                ("长度", len_fn as BuiltinFn),
                ("文本包含", contains_fn as BuiltinFn),
                ("文本分割", split_fn as BuiltinFn),
                ("头尾去空", trim_fn as BuiltinFn),
                ("判断数字", is_number_fn as BuiltinFn),
                ("大写", upper_fn as BuiltinFn),
                ("小写", lower_fn as BuiltinFn),
                ("查找", find_fn as BuiltinFn),
                ("计数", count_sub_fn as BuiltinFn),
                ("开头判断", starts_with_fn as BuiltinFn),
                ("结尾判断", ends_with_fn as BuiltinFn),
                ("文本连接", join_fn as BuiltinFn),
                ("文本重复", repeat_fn as BuiltinFn),
                // 字符串判断
                ("判断字母", is_alpha_fn as BuiltinFn),
                ("判断小写", is_lower_fn as BuiltinFn),
                ("判断大写", is_upper_fn as BuiltinFn),
                ("判断空白", is_space_fn as BuiltinFn),
                // 字符串变形
                ("首字母大写", title_fn as BuiltinFn),
                ("大小写互换", swap_case_fn as BuiltinFn),
                ("左对齐", ljust_fn as BuiltinFn),
                ("右对齐", rjust_fn as BuiltinFn),
                ("居中", center_fn as BuiltinFn),
            ],
            "数学" => vec![
                ("绝对值", abs_fn as BuiltinFn),
                ("最大值", max_fn as BuiltinFn),
                ("最小值", min_fn as BuiltinFn),
                ("取整", round_fn as BuiltinFn),
                ("幂运算", pow_fn as BuiltinFn),
                ("求和", sum_fn as BuiltinFn),
                ("向上取整", ceil_fn as BuiltinFn),
                ("向下取整", floor_fn as BuiltinFn),
            ],
            "类型" => vec![
                ("转文本", to_string_fn as BuiltinFn),
                ("转数字", to_number_fn as BuiltinFn),
                ("转整数", to_int_fn as BuiltinFn),
                ("转浮点", to_float_fn as BuiltinFn),
            ],
            "访问" => vec![
                ("创建访问", create_access_fn as BuiltinFn),
                ("切换GET", change_get_fn as BuiltinFn),
                ("切换POST", change_post_fn as BuiltinFn),
                ("POST", request_post_fn as BuiltinFn),
                ("POST文件", request_post_file_fn as BuiltinFn),
                ("启用跳转", enable_redirects_fn as BuiltinFn),
                ("禁用跳转", disable_redirects_fn as BuiltinFn),
                ("设置头部", set_headers_fn as BuiltinFn),
                ("设置超时", set_timeout_fn as BuiltinFn),
                ("发送", request_send_fn as BuiltinFn),
                ("全部内容", request_all_content_fn as BuiltinFn),
                ("内容", request_content_fn as BuiltinFn),
            ],
            "画布" => vec![
                ("创建画布", canvas_new_fn as BuiltinFn),
                ("画布.获取", canvas_get_fn as BuiltinFn),
                ("画笔.设置颜色", canvas_brush_color_fn as BuiltinFn),
                ("画笔.获取颜色", canvas_brush_get_color_fn as BuiltinFn),
                ("画笔.大小", canvas_brush_size_fn as BuiltinFn),
                ("绘制.点", canvas_draw_point_fn as BuiltinFn),
                ("绘制.线", canvas_draw_line_fn as BuiltinFn),
                ("绘制.喷漆", canvas_brush_line_fn as BuiltinFn),
                ("绘制.波浪", canvas_wave_line_fn as BuiltinFn),
                ("绘制.油漆桶", canvas_flood_fill_fn as BuiltinFn),
                ("绘制.方形", canvas_draw_rect_fill_fn as BuiltinFn),
                ("绘制.方形描边", canvas_draw_rect_stroke_fn as BuiltinFn),
                ("绘制.椭圆", canvas_draw_ellipse_fill_fn as BuiltinFn),
                ("绘制.椭圆描边", canvas_draw_ellipse_stroke_fn as BuiltinFn),
                ("绘制.圆形", canvas_draw_pie_fill_fn as BuiltinFn),
                ("绘制.圆形描边", canvas_draw_pie_stroke_fn as BuiltinFn),
                ("绘制.多边形", canvas_polygon_fn as BuiltinFn),
                ("绘制.多边形描边", canvas_polygon_stroke_fn as BuiltinFn),
                ("绘制.圆弧", canvas_draw_arc_fn as BuiltinFn),
                ("绘制.图片", canvas_draw_image_fn as BuiltinFn),
                ("绘制.文本", canvas_draw_text_fn as BuiltinFn),
                ("绘制.随机点", canvas_random_dots_fn as BuiltinFn),
                ("绘制.随机线条", canvas_random_lines_fn as BuiltinFn),
                ("画布.灰度", canvas_grayscale_fn as BuiltinFn),
                ("画布.马赛克", canvas_mosaic_all_fn as BuiltinFn),
                ("绘制.马赛克", canvas_draw_mosaic_fn as BuiltinFn),
                ("绘制.高斯模糊", canvas_draw_blur_fn as BuiltinFn),
                ("画布.旋转", canvas_rotate_fn as BuiltinFn),
                ("画布.圆形", canvas_round_corners_fn as BuiltinFn),
            ],
            "文件" => vec![
                ("写文件", write_string_file_fn as BuiltinFn),
                ("读文件", read_string_file_fn as BuiltinFn),
                ("写", write_key_string_file_fn as BuiltinFn),
                ("读", read_key_string_file_fn as BuiltinFn),
                ("删除文件", delete_file_fn as BuiltinFn),
                ("删除文件夹", delete_dir_fn as BuiltinFn),
                ("存在文件", file_exist_fn as BuiltinFn),
                ("存在文件夹", dir_exist_fn as BuiltinFn),
                ("存在文件或文件夹", file_or_dir_exist_fn as BuiltinFn),
                ("文件后缀", file_suffix_fn as BuiltinFn),
                ("读文件行", read_file_lines_fn as BuiltinFn),
                ("文件夹列表", dir_list_fn as BuiltinFn),
                ("文件列表", file_list_fn as BuiltinFn),
                ("随机文件夹名", random_dir_name_fn as BuiltinFn),
                ("随机文件名", random_file_name_fn as BuiltinFn),
                ("文件夹大小", dir_size_fn as BuiltinFn),
                ("文件大小", file_size_fn as BuiltinFn),
                ("重命名", file_rename_fn as BuiltinFn),
                ("复制粘贴", file_copy_fn as BuiltinFn),
                ("下载文件", download_file_fn as BuiltinFn),
            ],
            _ => return None,
        };
        Some(funcs)
    }

    /// 将标准库模块的函数注册到 builtins 表。
    /// 返回注册的函数数量。模块不存在时返回 0。
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

/// 检查路径是否为标准库引入（以 @ 开头）
pub fn is_stdlib_path(path: &str) -> bool {
    path.starts_with('@')
}

/// 为标准库模块创建标记 BuildValue（解析阶段使用）
pub fn create_stdlib_package(module: &str) -> BuildValue {
    let mut pkg = BuildValue::new_empty();
    pkg.head.push(format!("@stdlib={}", module));
    pkg.stdlib_module = Some(module.to_string());
    pkg
}

/// 判断 BuildValue 是否为标准库标记包
pub fn is_stdlib_package(bv: &BuildValue) -> Option<&str> {
    bv.stdlib_module.as_deref()
}

/// 注册所有内置函数到上下文的 builtins 表
pub fn register_builtins(ctx: &mut DicContext) {
    // ===== 引擎核心函数（始终可用，无需 #引入=）=====
    let shared = Arc::make_mut(&mut ctx.shared);
    let builtins = Arc::make_mut(&mut shared.builtins);
    builtins.insert("回调".to_string(), callback_fn);
    builtins.insert("主回调".to_string(), main_callback_fn);
    builtins.insert("打印".to_string(), print_fn);
    builtins.insert("打印返回".to_string(), print_return_fn);
    builtins.insert("启动服务器".to_string(), server_fn);
    builtins.insert("截取".to_string(), substr_fn);
    builtins.insert("替换".to_string(), replace_fn);
    builtins.insert("删前缀".to_string(), trim_prefix_fn);
    builtins.insert("删后缀".to_string(), trim_suffix_fn);
    builtins.insert("new".to_string(), new_fn);
    builtins.insert("访问".to_string(), access_get_fn);
    builtins.insert("访问POST".to_string(), access_post_fn);
    builtins.insert("访问转发".to_string(), request_forward_fn);
}

/// new 类名$ — 创建面对像实例，返回类名
/// 支持 $new 类名$（当前文件或已加载包）和 $new 包名.类名$（指定包）
fn new_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let class_name = args.get(1).map(|s| s.as_str()).unwrap_or("");
    if class_name.is_empty() {
        return Some(format!("[错误] {} $new 需要类名", ctx.sys.file_location()));
    }
    // 解析：支持 "pkg.Class" 和 "Class" 两种格式
    let (pkg_target, pure_class) = if let Some(dot_pos) = class_name.find('.') {
        (Some(&class_name[..dot_pos]), &class_name[dot_pos + 1..])
    } else {
        (None, class_name)
    };
    let constructor_keys: [String; 2] = [
        format!("{}.new", pure_class),
        format!("{}.初始化", pure_class),
    ];
    // 在 BuildValue 的 local_func 中线性搜索
    let find_in_bv = |bv: &BuildValue, key: &str| -> Option<Vec<String>> {
        bv.local_func.iter().find(|d| d.trigger == key).map(|d| d.text.clone())
    };
    // 搜索构造函数：当前文件 → 指定包 → 所有包
    let mut found_code: Option<Vec<String>> = None;
    let mut found_pkg: Option<String> = None;
    for ck in &constructor_keys {
        if let Some(code) = ctx.find_internal(ck) {
            found_code = Some(code);
            break;
        }
    }
    if found_code.is_none() {
        if let Some(pkg) = pkg_target {
            if let Some(bv) = ctx.shared.packages.get(pkg) {
                for ck in &constructor_keys {
                    if let Some(code) = find_in_bv(bv, ck) {
                        found_code = Some(code);
                        found_pkg = Some(pkg.to_string());
                        break;
                    }
                }
            }
            if found_code.is_none() {
                return Some(format!("[错误] {} 包 '{}' 中没有类 '{}'", ctx.sys.file_location(), pkg, pure_class));
            }
        }
    }
    if found_code.is_none() && pkg_target.is_none() {
        for (pkg_name, bv) in ctx.shared.packages.iter() {
            for ck in &constructor_keys {
                if let Some(code) = find_in_bv(bv, ck) {
                    found_code = Some(code);
                    found_pkg = Some(pkg_name.clone());
                    break;
                }
            }
            if found_code.is_some() {
                break;
            }
        }
    }
    if let Some(code) = found_code {
        let ck_used = constructor_keys.iter().find(|k| {
            if let Some(ref p) = found_pkg {
                ctx.shared.packages.get(p)
                    .map(|bv| find_in_bv(bv, k).is_some())
                    .unwrap_or(false)
            } else {
                ctx.find_internal(k).is_some()
            }
        });
        let mut sub_ctx = if let Some(ref pkg_name) = found_pkg {
            let mut sc = ctx.clone_for_internal();
            let sc_shared = Arc::make_mut(&mut sc.shared);
            if let Some(bv) = ctx.shared.packages.get(pkg_name) {
                sc_shared.triggers = bv.dic.clone();
                sc_shared.local_static = bv.local_static.clone();
                sc_shared.local_func = bv.local_func.clone();
            }
            sc.rebuild_internal_maps();
            sc
        } else {
            ctx.fresh_sub_context()
        };
        sub_ctx.val.p.set_string("_", class_name.to_string());
        sub_ctx.val.p.set_string("触发", ck_used.cloned().unwrap_or_default());
        for (i, arg) in args.iter().skip(2).enumerate() {
            sub_ctx.val.p
                .set_string(&format!("参数{}", i + 1), ctx.val.text(arg));
        }
        entry(&mut sub_ctx, &code);
        let instance_id = format!("{}@{}", class_name, next_instance_id());
        // 实例变量存储：同时用变量名和实例 ID 作为前缀
        let target_var = ctx.val.p.get_cloned("_target");
        for (key, val) in sub_ctx.val.p.obj.iter() {
            if let Some(field) = key.strip_prefix('.') {
                // 变量名前缀（如 a.count）
                if !target_var.is_empty() {
                    ctx.val.p.set_string(&format!("{}.{}", target_var, field), val.display());
                }
                // 实例 ID 前缀（如 Counter@0.count），用于函数传参时查找
                ctx.val.p.set_string(&format!("{}.{}", instance_id, field), val.display());
            }
        }
        let output = sub_ctx.output.get();
        if !output.is_empty() {
            println!("{}", crate::analyzer::unescape_newline(&output));
        }
        return Some(instance_id);
    }
    Some(class_name.to_string())
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
    sub_ctx.val.p.set_string("_", target.to_string());
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

    // 类作用域查找：_ 变量为类名时，先查 ClassName.target，再回退到 target
    let class_name_raw = ctx.val.p.get_cloned("_");
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

/// $启动服务器 端口 [处理函数|变量]$ — 启动 TCP/HTTP 服务器持续监听触发词
/// 如果指定了处理函数名，则每个客户端连接时调用该 [函数] 处理
/// 支持传入变量名：每次请求时读取该变量的值作为函数指针（动态分发）
/// 自动检测 HTTP 请求并返回正确的 HTTP 响应
/// 否则按普通触发词匹配
fn server_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    use std::io::{BufRead, BufReader, Write};
    use std::net::TcpListener;

    let port = args.get(1).map(|s| s.as_str()).unwrap_or("8080");
    // handler_ref: 直接函数名 或 存储函数指针的变量名
    let handler_ref: Option<String> = args.get(2).map(|s| s.to_string());
    let bind_addr = format!("0.0.0.0:{}", port);

    let listener = match TcpListener::bind(&bind_addr) {
        Ok(l) => l,
        Err(e) => {
            eprintln!("[Nebula] 服务器启动失败: {}", e);
            return Some(format!("[错误] {} 服务器启动失败: {}", ctx.sys.file_location(), e));
        }
    };
    // println!("[Nebula] 服务器已启动 (HTTP + TCP): http://{}", bind_addr);

    // 保存初始上下文作为模板
    let mut base_ctx = ctx.clone();

    for stream in listener.incoming() {
        let stream = match stream {
            Ok(s) => s,
            Err(e) => {
                eprintln!("[Nebula] 连接错误: {}", e);
                continue;
            }
        };
        let _ = stream.peer_addr();
        let mut reader = BufReader::new(stream.try_clone().unwrap());
        let mut writer = stream;

        // 读取第一行判断是否为 HTTP 请求
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

        // 检测是否 HTTP 请求
        let is_http = first_line.starts_with("GET ")
            || first_line.starts_with("POST ")
            || first_line.starts_with("PUT ")
            || first_line.starts_with("DELETE ")
            || first_line.starts_with("HEAD ")
            || first_line.starts_with("OPTIONS ")
            || first_line.starts_with("PATCH ");

        if is_http {
            // === HTTP 模式 ===
            // 读取所有 HTTP 头（直到空行）
            let http_method = first_line.split_whitespace().next().unwrap_or("GET").to_string();
            let mut http_path = String::new();
            let parts: Vec<&str> = first_line.split_whitespace().collect();
            if parts.len() >= 2 {
                http_path = parts[1].to_string();
            }

            // 分离路径和查询参数
            let (path_only, query_string) = if let Some(qm) = http_path.find('?') {
                (http_path[..qm].to_string(), http_path[qm + 1..].to_string())
            } else {
                (http_path.clone(), String::new())
            };
            // 构建 _GET JSON
            let get_json = build_query_json(&query_string);

            // 读取头部并跟踪 Content-Length
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
                    break; // 头部结束
                }
                // 收集所有头部
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

            // 读取 POST 请求体
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

            // 尝试将 POST body 解析为 JSON，失败则保持原字符串
            let post_json = if post_body.is_empty() {
                "{}".to_string()
            } else if let Ok(v) = serde_json::from_str::<serde_json::Value>(&post_body) {
                v.to_string()
            } else {
                // 非 JSON → 包装为 {"raw": "..."}
                format!("{{\"raw\":{}}}", serde_json::Value::String(post_body))
            };

            // 构建 _DATA（聚合所有数据）
            let data_json = format!(
                r#"{{"method":"{}","path":"{}","header":{},"get":{},"post":{}}}"#,
                http_method, path_only, header_json, get_json, post_json
            );

            // 构建请求触发文本（路径作为触发词）
            let trigger = if http_path.is_empty() {
                first_line.to_string()
            } else {
                http_path
            };

            // 动态解析函数指针（每次请求从变量读取）
            let handler_name = resolve_handler_name(&base_ctx, &handler_ref);
            let handler_code = handler_name.as_ref().and_then(|name| base_ctx.find_internal_prefix(name));

            // 执行处理
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
                    req_ctx.val.p.set_string("_", name.clone());
                }
                entry(&mut req_ctx, code);
                if !Arc::ptr_eq(&base_ctx.shared, &req_ctx.shared) {
                    base_ctx.shared = req_ctx.shared.clone();
                }
                // 读取响应头、状态码
                let rheader_raw = crate::value::Val::lookup_display("_设置头部", req_ctx.val.p.get_all(), Some(req_ctx.val.g.get_all()));
                let status_code = crate::value::Val::lookup_display("_状态码", req_ctx.val.p.get_all(), Some(req_ctx.val.g.get_all()));
                let body = req_ctx.output.get();
                std::mem::swap(&mut base_ctx.val, &mut req_ctx.val);
                (body, rheader_raw, status_code)
            } else {
                // 无处理函数时，匹配触发词
                (match_tcp_trigger(&base_ctx, &trigger), String::new(), "200".to_string())
            };

            // 解析自定义响应头
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

            // 构建 HTTP 响应
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
            // === TCP 原始模式 ===
            let trigger = first_line.to_string();
            write_tcp_output(&mut writer, handle_tcp_request(&mut base_ctx, &handler_ref, &trigger));

            // 继续读取后续行（TCP 长连接模式）
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
                write_tcp_output(&mut writer, handle_tcp_request(&mut base_ctx, &handler_ref, &trigger));
            }
        }
        // println!("[Nebula] 客户端断开: {}", peer_addr);
    }
    None
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
            req_ctx.val.p.set_string("_", name.clone());
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

// ==================== @访问 模块 ====================

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
    let handle = get_req_handle(ctx, args);
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
    let handle = get_req_handle(ctx, args);
    let Some(mut req) = get_request(&handle) else {
        return Some(format!("[错误] {} 未新建请求", ctx.sys.file_location()));
    };
    req.stop_redirect = false;
    set_request(&handle, req);
    None
}

// ===== 访问.禁用跳转 handle$ — 禁止重定向 =====

fn disable_redirects_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let handle = get_req_handle(ctx, args);
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
    let handle = get_req_handle(ctx, args);
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
            .map(|(name, val)| (name.to_string(), val.to_str().unwrap_or("").to_string()))
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
    let handle = get_req_handle(ctx, args);
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
    let handle = get_req_handle(ctx, args);
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

/// 从 args 获取请求 handle：优先从参数1取（若看起来是句柄），否则从 _ 变量取（OOP 模式）
fn get_req_handle(ctx: &mut DicContext, args: &[String]) -> String {
    if let Some(h) = args.get(1) {
        let h = ctx.val.text(h);
        if !h.is_empty() && (h.starts_with("req_") || h.contains("访问请求@")) {
            return h;
        }
    }
    ctx.val.p.get_cloned("_")
}

/// 获取请求句柄和参数起始偏移（OOP 兼容）
/// 返回 (handle, data_start_index)
/// - 显式句柄模式：args[1] 是句柄 → data_start=2
/// - OOP 模式：句柄来自 _ 变量 → data_start=1
fn get_req_handle_and_offset(ctx: &mut DicContext, args: &[String]) -> (String, usize) {
    if let Some(h) = args.get(1) {
        let h = ctx.val.text(h);
        if !h.is_empty() && (h.starts_with("req_") || h.contains("访问请求@")) {
            return (h, 2);
        }
    }
    let handle = ctx.val.p.get_cloned("_");
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

/// $大写 文本$ — 转为大写，对标 Python str.upper()
fn upper_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let value = args.iter().skip(1).map(|s| s.as_str()).collect::<Vec<_>>().join(" ");
    let text = ctx.val.text(&value);
    Some(text.to_uppercase())
}

/// $小写 文本$ — 转为小写，对标 Python str.lower()
fn lower_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let value = args.iter().skip(1).map(|s| s.as_str()).collect::<Vec<_>>().join(" ");
    let text = ctx.val.text(&value);
    Some(text.to_lowercase())
}

// ===== 查找与统计 =====

/// $查找 字符串 子串$ — 查找子串位置（0-based），找不到返回 "-1"，对标 Python str.find()
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

/// $计数 字符串 子串$ — 统计子串出现次数，对标 Python str.count()
fn count_sub_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let s = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let sub = ctx.val.text(args.get(2).map(|s| s.as_str()).unwrap_or(""));
    let count = s.matches(&sub).count();
    Some(count.to_string())
}

// ===== 前后缀判断 =====

/// $开头判断 字符串 前缀$ — 判断是否以指定前缀开头，返回 1/0，对标 Python str.startswith()
fn starts_with_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let s = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let prefix = ctx.val.text(args.get(2).map(|s| s.as_str()).unwrap_or(""));
    Some(if s.starts_with(&prefix) { "1" } else { "0" }.to_string())
}

/// $结尾判断 字符串 后缀$ — 判断是否以指定后缀结尾，返回 1/0，对标 Python str.endswith()
fn ends_with_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let s = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let suffix = ctx.val.text(args.get(2).map(|s| s.as_str()).unwrap_or(""));
    Some(if s.ends_with(&suffix) { "1" } else { "0" }.to_string())
}

// ===== 数学函数 =====

/// $绝对值 数字$ — 返回绝对值，对标 Python abs()
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

/// $最大值 数字1 数字2 ...$ — 返回最大值，对标 Python max()
fn max_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    extreme_fn(ctx, args, |a, b| a > b)
}

/// $最小值 数字1 数字2 ...$ — 返回最小值，对标 Python min()
fn min_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    extreme_fn(ctx, args, |a, b| a < b)
}

// ===== 文本拼接与重复 =====

/// $文本连接 分隔符 文本1 文本2 ...$ — 用分隔符连接多个文本，对标 Python str.join()
fn join_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let sep = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let parts: Vec<String> = args.iter().skip(2)
        .map(|a| ctx.val.text(a))
        .collect();
    Some(parts.join(&sep))
}

/// $文本重复 文本 次数$ — 将文本重复指定次数，对标 Python str * n
fn repeat_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let s = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let n: usize = args.get(2)
        .and_then(|a| resolve_num(ctx, a))
        .unwrap_or(1);
    Some(s.repeat(n))
}

// ==================== 字符串判断函数 ====================

/// 判断是否全为 ASCII 字母 (A-Z a-z)，非空
fn is_alpha_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let s = ctx.val.text(&args.iter().skip(1).map(|s| s.as_str()).collect::<Vec<_>>().join(" "));
    let result = !s.is_empty() && s.chars().all(|c| c.is_ascii_alphabetic());
    Some(if result { "1".to_string() } else { String::new() })
}

/// Python str.islower()
fn is_lower_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let s = ctx.val.text(&args.iter().skip(1).map(|s| s.as_str()).collect::<Vec<_>>().join(" "));
    let has_cased = s.chars().any(|c| c.is_alphabetic() && c.is_lowercase());
    let all_lower = s.chars().all(|c| !c.is_alphabetic() || c.is_lowercase());
    Some(if has_cased && all_lower { "1".to_string() } else { String::new() })
}

/// Python str.isupper()
fn is_upper_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let s = ctx.val.text(&args.iter().skip(1).map(|s| s.as_str()).collect::<Vec<_>>().join(" "));
    let has_cased = s.chars().any(|c| c.is_alphabetic() && c.is_uppercase());
    let all_upper = s.chars().all(|c| !c.is_alphabetic() || c.is_uppercase());
    Some(if has_cased && all_upper { "1".to_string() } else { String::new() })
}

/// Python str.isspace() — 空字符串返回 "1"
fn is_space_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let s = ctx.val.text(&args.iter().skip(1).map(|s| s.as_str()).collect::<Vec<_>>().join(" "));
    let result = s.is_empty() || s.chars().all(|c| c.is_whitespace());
    Some(if result { "1".to_string() } else { String::new() })
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

/// Python math.ceil(x) — 向上取整
fn ceil_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let text = ctx.val.text(&args.iter().skip(1).map(|s| s.as_str()).collect::<Vec<_>>().join(" "));
    let n: f64 = text.trim().parse::<f64>().unwrap_or(0.0);
    let v = n.ceil();
    Some(format_f64(v))
}

/// Python math.floor(x) — 向下取整
fn floor_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let text = ctx.val.text(&args.iter().skip(1).map(|s| s.as_str()).collect::<Vec<_>>().join(" "));
    let n: f64 = text.trim().parse::<f64>().unwrap_or(0.0);
    let v = n.floor();
    Some(format_f64(v))
}

// ==================== @画布 模块 ====================

/// 对 args 做变量替换
fn resolve_args(ctx: &mut DicContext, args: &[String]) -> Vec<String> {
    args.iter().map(|a| ctx.val.text(a)).collect()
}

macro_rules! canvas_err {
    ($ctx:expr, $msg:expr) => {
        Some(format!("[错误] {} {}", $ctx.sys.file_location(), $msg))
    };
}

/// $创建画布 [width] [height] [bgColor]$ — 对标 Go drawImgNew，生成并返回画布对象结构体
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

/// $画布.获取 handle [format]$
fn canvas_get_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_args(ctx, args);
    match canvas::canvas_get(&resolved) {
        Ok(data) => Some(data),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $画笔.设置颜色 handle color$
fn canvas_brush_color_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_args(ctx, args);
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

/// $画笔.获取颜色 [color]$
fn canvas_brush_get_color_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_args(ctx, args);
    match canvas::brush_get_color(&resolved) {
        Ok(s) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $画笔.大小 handle size$
fn canvas_brush_size_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_args(ctx, args);
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

/// $绘制.点 handle x y [color]$
fn canvas_draw_point_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_args(ctx, args);
    match canvas::draw_point(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.线 handle x1 y1 x2 y2 [color]$
fn canvas_draw_line_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_args(ctx, args);
    match canvas::draw_line(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.方形 handle x y w h [radius] [color]$
fn canvas_draw_rect_fill_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_args(ctx, args);
    match canvas::draw_rect_fill(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.方形描边 handle x y w h [radius] [color]$
fn canvas_draw_rect_stroke_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_args(ctx, args);
    match canvas::draw_rect_stroke(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.椭圆 handle x y w h [color]$
fn canvas_draw_ellipse_fill_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_args(ctx, args);
    match canvas::draw_ellipse_fill(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.椭圆描边 handle x y w h [color]$
fn canvas_draw_ellipse_stroke_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_args(ctx, args);
    match canvas::draw_ellipse_stroke(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.圆形 handle cx cy [radius] [startDeg] [endDeg] [color]$
fn canvas_draw_pie_fill_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_args(ctx, args);
    match canvas::draw_pie_fill(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.圆形描边 handle cx cy [radius] [startDeg] [endDeg] [color]$
fn canvas_draw_pie_stroke_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_args(ctx, args);
    match canvas::draw_pie_stroke(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.圆弧 handle cx cy radius startDeg endDeg [color]$
fn canvas_draw_arc_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_args(ctx, args);
    match canvas::draw_arc(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.图片 handle srcData x y [alpha]$
fn canvas_draw_image_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_args(ctx, args);
    match canvas::draw_image(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.文本 handle x y text [color] [strokeColor] [strokeWidth]$
fn canvas_draw_text_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_args(ctx, args);
    match canvas::draw_text(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $画布.灰度 handle$
fn canvas_grayscale_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_args(ctx, args);
    match canvas::canvas_grayscale(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $画布.马赛克 handle [blockSize]$
fn canvas_mosaic_all_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_args(ctx, args);
    match canvas::canvas_mosaic_all(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.马赛克 handle x y w h$
fn canvas_draw_mosaic_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_args(ctx, args);
    match canvas::draw_mosaic(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.高斯模糊 handle x y w h$
fn canvas_draw_blur_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_args(ctx, args);
    match canvas::draw_gaussian_blur(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $画布.旋转 handle degrees [bgColor]$
fn canvas_rotate_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_args(ctx, args);
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

/// $画布.圆形 handle radius [bgColor]$
fn canvas_round_corners_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_args(ctx, args);
    match canvas::canvas_round_corners(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.喷漆 handle x1 y1 x2 y2 [rangeRadius] [density] [color] [pointRadius]$
fn canvas_brush_line_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_args(ctx, args);
    match canvas::draw_brush_line(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.波浪 handle x1 y1 x2 y2 [amplitude] [wavelength] [step]$
fn canvas_wave_line_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_args(ctx, args);
    match canvas::draw_wave_line(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.油漆桶 handle x y [fillColor]$
fn canvas_flood_fill_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_args(ctx, args);
    match canvas::draw_flood_fill(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.随机点 handle [dotCount]$
fn canvas_random_dots_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_args(ctx, args);
    match canvas::draw_random_dots(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.随机线条 handle [lineCount]$
fn canvas_random_lines_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_args(ctx, args);
    match canvas::draw_random_lines(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.多边形 handle x,y x,y ... [color]$
fn canvas_polygon_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_args(ctx, args);
    match canvas::draw_polygon(&resolved) {
        Ok(None) => None,
        Ok(Some(s)) => Some(s),
        Err(e) => canvas_err!(ctx, e),
    }
}

/// $绘制.多边形描边 handle x,y x,y ... [color]$
fn canvas_polygon_stroke_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let resolved = resolve_args(ctx, args);
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

/// $写文件 路径 内容$ — 将内容写入文件（对标 Go writeStringFile）
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

/// $读文件 路径 [默认值]$ — 读取整个文件内容，失败时返回默认值（对标 Go readStringFile）
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

/// $写 路径 键 值$ — 将键值对写入 database/ 下的键值文件（对标 Go writeKeyStringFile）
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

/// $读 路径 [键] [默认值]$ — 读取 database/ 下的键值文件（对标 Go readKeyStringFile）
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

/// $删除文件 路径$ — 删除文件（对标 Go deleteFile）
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

/// $删除文件夹 路径$ — 删除文件夹及其所有内容（对标 Go deleteDir）
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

/// $存在文件 路径$ — 判断是否为已存在的文件，返回 true/false（对标 Go fileExist）
fn file_exist_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let path = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let path_buf = std::path::PathBuf::from(&path);
    let exists = file_lock::with_file_read(&path_buf, || {
        std::fs::metadata(&path).map(|m| m.is_file()).unwrap_or(false)
    });
    Some(exists.to_string())
}

/// $存在文件夹 路径$ — 判断是否为已存在的文件夹，返回 true/false（对标 Go dirExist）
fn dir_exist_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let path = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let path_buf = std::path::PathBuf::from(&path);
    let exists = file_lock::with_file_read(&path_buf, || {
        std::fs::metadata(&path).map(|m| m.is_dir()).unwrap_or(false)
    });
    Some(exists.to_string())
}

/// $存在文件或文件夹 路径$ — 判断路径是否存在，返回 true/false（对标 Go fileOrDirExist）
fn file_or_dir_exist_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let path = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let path_buf = std::path::PathBuf::from(&path);
    let exists = file_lock::with_file_read(&path_buf, || {
        std::path::Path::new(&path).exists()
    });
    Some(exists.to_string())
}

/// $文件后缀 路径$ — 获取文件扩展名，含前导点（对标 Go fileSuffix / filepath.Ext）
fn file_suffix_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let path = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let ext = std::path::Path::new(&path)
        .extension()
        .map(|e| format!(".{}", e.to_string_lossy()))
        .unwrap_or_default();
    Some(ext)
}

/// 简易伪随机数生成器（无需外部依赖，对标 Go utils.RandNum）
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
/// 起始行和数量均为 1-based（对标 Go readStringFileLines）
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

/// $文件夹列表 [路径]$ — 列出目录下的文件夹名，返回 JSON 数组（对标 Go dirList）
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

/// $文件列表 [路径]$ — 列出目录下的文件名，返回 JSON 数组（对标 Go fileList）
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

/// $随机文件夹名 [路径]$ — 随机返回目录下的一个文件夹名（对标 Go randomDirName）
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

/// $随机文件名 [路径]$ — 随机返回目录下的一个文件名（对标 Go randomFileName）
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

/// $文件夹大小 路径$ — 递归计算目录总大小（字节）（对标 Go dirSize）
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

/// $文件大小 路径$ — 获取文件大小（字节）（对标 Go fileSize）
fn file_size_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let path = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let path_buf = std::path::PathBuf::from(&path);
    let size = file_lock::with_file_read(&path_buf, || {
        std::fs::metadata(&path).map(|m| m.len()).unwrap_or(0)
    });
    Some(size.to_string())
}

/// $重命名 原路径 新路径$ — 重命名文件或文件夹，返回 true/false（对标 Go fileRename）
fn file_rename_fn(ctx: &mut DicContext, args: &[String], _content: &str) -> Option<String> {
    let src = ctx.val.text(args.get(1).map(|s| s.as_str()).unwrap_or(""));
    let dst = ctx.val.text(args.get(2).map(|s| s.as_str()).unwrap_or(""));
    if src.is_empty() || dst.is_empty() { return Some("false".to_string()); }
    let dst_buf = std::path::PathBuf::from(&dst);
    let ok = file_lock::with_file_write(&dst_buf, || std::fs::rename(&src, &dst).is_ok());
    Some(ok.to_string())
}

/// $复制粘贴 原路径 目标路径$ — 复制文件或文件夹，返回 true/false（对标 Go fileCopy）
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

/// $下载文件 下载地址 保存路径$ — 从 URL 下载文件到本地（对标 Go downloadFile）
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
