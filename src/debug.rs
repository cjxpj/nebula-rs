//! Debug Adapter Protocol (DAP) 服务端实现
//!
//! 通过 stdin/stdout 与 VS Code 调试器通信，支持：
//! - 断点设置/移除
//! - 单步执行（StepOver / StepIn / StepOut）

// - 继续执行
// - 变量查看
// - 调用栈查看
//
// 架构：
//   主线程 = DAP 消息循环（stdin/stdout）
//   子线程 = NR 脚本执行器
//   两个线程通过 mpsc channel 通信

use std::collections::{BTreeMap, HashMap, HashSet};
use std::io::{self, BufRead, Read, Write};
use std::sync::mpsc::{self, Receiver, Sender, TryRecvError};
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::Duration;
use serde_json::{json, Value};

use crate::interpreter;

// Windows: 检查 stdin 是否有可用数据（非阻塞）
#[cfg(windows)]
fn stdin_has_data() -> bool {
    use std::os::windows::io::AsRawHandle;
    extern "system" {
        fn GetFileType(hFile: isize) -> u32;
        fn PeekNamedPipe(
            hNamedPipe: isize,
            _lpBuffer: *mut u8,
            _nBufferSize: u32,
            _lpBytesRead: *mut u32,
            lpTotalBytesAvail: *mut u32,
            _lpBytesLeftThisMessage: *mut u32,
        ) -> i32;
        fn GetNumberOfConsoleInputEvents(hConsoleInput: isize, lpNumberOfEvents: *mut u32) -> i32;
    }
    const FILE_TYPE_PIPE: u32 = 0x0003;
    const FILE_TYPE_CHAR: u32 = 0x0002;

    let handle = io::stdin().as_raw_handle();
    let file_type = unsafe { GetFileType(handle as isize) };

    if file_type == FILE_TYPE_PIPE {
        let mut total_avail: u32 = 0;
        unsafe {
            PeekNamedPipe(
                handle as isize,
                std::ptr::null_mut(),
                0,
                std::ptr::null_mut(),
                &mut total_avail,
                std::ptr::null_mut(),
            );
        }
        total_avail > 0
    } else if file_type == FILE_TYPE_CHAR {
        let mut num_events: u32 = 0;
        unsafe {
            GetNumberOfConsoleInputEvents(handle as isize, &mut num_events);
        }
        num_events > 0
    } else {
        true // 未知类型，保守返回 true
    }
}

#[cfg(not(windows))]
fn stdin_has_data() -> bool {
    true // 非 Windows：回退到阻塞读取
}

/* ===================== 调试事件 / 命令 ===================== */

/// executor → DAP 线程 的事件
#[derive(Debug, Clone)]
pub enum DebugEvent {
    Stopped { reason: String, _file: String, _line: usize },
    Output(String),
    Terminated,
}

/// DAP 线程 → executor 的命令
#[derive(Debug, Clone)]
pub enum DebugCommand {
    Continue,
    Next(usize),
    StepIn,
    StepOut(usize),
    Pause,
}

/// 栈帧
#[derive(Debug, Clone)]
pub struct StackFrame {
    pub id: usize,
    pub name: String,
    pub file: String,
    pub line: usize,
    /// 该帧暂停时的作用域链（点击调用栈帧切换时用于显示对应帧的变量）
    pub scope_chain: Vec<(String, HashMap<String, String>)>,
}

/// 步进意图（暂停后消费步进命令时暂存，供下一条语句检查）
#[derive(Debug, Clone)]
pub enum StepIntent {
    StepIn,
    StepOver(usize),
    StepOut(usize),
}

/* ===================== 调试共享状态 ===================== */

/// 由 executor 写入、DAP 线程读取的轻量共享状态
#[derive(Debug)]
pub struct SharedDebugState {
    /// 断点: 文件路径 → 行号集合
    pub breakpoints: HashMap<String, HashSet<usize>>,
    pub paused: bool,
    pub terminated: bool,
    pub current_file: String,
    pub current_line: usize,
    pub depth: usize,
    pub call_stack: Vec<StackFrame>,
    /// 作用域链：[(作用域名, 变量表)]，从局部到全局
    pub scope_chain: Vec<(String, HashMap<String, String>)>,
    /// 嵌套变量子表：variablesReference → children as Value
    nested_var_map: HashMap<u64, Vec<Value>>,
    /// 嵌套引用计数器
    next_nested_ref: u64,
    /// 暂停期间收到的步进命令，留给恢复后的第一条语句使用
    pub(crate) step_pending: Option<StepIntent>,
    /// stopOnEntry：在 main 入口处自动暂停
    pub stop_on_entry: bool,
    /// 被调试程序文件的规范化路径（与 executor 中 source_file 一致）
    pub program_path: String,
}

impl SharedDebugState {
    pub fn new() -> Self {
        SharedDebugState {
            breakpoints: HashMap::new(),
            paused: false,
            terminated: false,
            current_file: String::new(),
            current_line: 0,
            depth: 0,
            call_stack: Vec::new(),
            scope_chain: Vec::new(),
            nested_var_map: HashMap::new(),
            next_nested_ref: 1_000_000,
            step_pending: None,
            stop_on_entry: false,
            program_path: String::new(),
        }
    }
}

/* ===================== 调试句柄 ===================== */

/// 调试模式句柄：统一封装 DAP 通信所需的三要素
/// 替代 DicContext 中分散的 debug_mode / debug_shared / debug_event_tx / debug_cmd_rx
#[derive(Debug, Clone)]
pub struct DebugHandle {
    pub shared: Arc<Mutex<SharedDebugState>>,
    pub event_tx: Sender<DebugEvent>,
    pub cmd_rx: Arc<Mutex<Receiver<DebugCommand>>>,
}

/* ===================== DAP 协议读写 ===================== */

fn read_message(reader: &mut io::BufReader<io::StdinLock>) -> Option<Value> {
    let mut header = String::new();
    loop {
        header.clear();
        if reader.read_line(&mut header).is_err() || header.is_empty() {
            return None;
        }
        let trimmed = header.trim();
        if trimmed.is_empty() {
            continue;
        }
        break;
    }

    let content_length = header
        .strip_prefix("Content-Length:")
        .and_then(|s| s.trim().parse::<usize>().ok())?;

    // 跳过剩余头部
    loop {
        header.clear();
        if reader.read_line(&mut header).is_err() {
            return None;
        }
        if header == "\r\n" || header == "\n" {
            break;
        }
    }

    let mut body = vec![0u8; content_length];
    if reader.read_exact(&mut body).is_err() {
        return None;
    }
    serde_json::from_slice(&body).ok()
}

fn send_message(writer: &mut io::StdoutLock, msg: &Value) {
    let body = serde_json::to_string(msg).unwrap_or_default();
    let header = format!("Content-Length: {}\r\n\r\n", body.len());
    let _ = writer.write_all(header.as_bytes());
    let _ = writer.write_all(body.as_bytes());
    let _ = writer.flush();
}

/* ===================== 辅助函数 ===================== */

/// 规范化路径：去除 Windows `\\?\` 前缀，并将反斜杠转为正斜杠（VS Code 使用正斜杠 URI）
fn clean_path(path: &str) -> String {
    if cfg!(windows) {
        let stripped = path.strip_prefix("\\\\?\\").unwrap_or(path);
        stripped.replace('\\', "/")
    } else {
        path.to_string()
    }
}

fn dap_response(seq: i64, command: &str, request_seq: i64, success: bool, body: Option<Value>) -> Value {
    let mut r = json!({
        "type": "response",
        "seq": seq,
        "command": command,
        "request_seq": request_seq,
        "success": success,
    });
    if let Some(b) = body {
        r["body"] = b;
    }
    r
}

/* ===================== DAP 服务端主循环 ===================== */

pub fn run_dap_server(file_path: Option<&str>) -> Result<(), String> {
    eprintln!("[DAP] run_dap_server start, file_path={:?}", file_path);

    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut reader = io::BufReader::new(stdin.lock());
    let mut writer = stdout.lock();

    let shared = Arc::new(Mutex::new(SharedDebugState::new()));

    // 通道
    let (event_tx, event_rx): (Sender<DebugEvent>, Receiver<DebugEvent>) = mpsc::channel();
    let (cmd_tx, cmd_rx): (Sender<DebugCommand>, Receiver<DebugCommand>) = mpsc::channel();
    let mut cmd_rx_opt = Some(cmd_rx); // Option 包装以支持延迟移动

    // 执行器句柄（延迟初始化：如果有文件路径则预加载，否则等 launch 请求）
    let shared_clone = shared.clone();
    let event_tx_clone = event_tx.clone();
    let mut executor_handle: Option<thread::JoinHandle<()>> = None;

    // 如果启动时就指定了文件路径，提前加载
    if let Some(fp) = file_path {
        eprintln!("[DAP] pre-loading file: {}", fp);
        let nb = interpreter::Nebula::from_file(fp)?;
        // 捕获规范化后的源文件路径（供 setBreakpoints 路径匹配用）
        {
            let mut ds = shared.lock().unwrap();
            ds.program_path = nb.ctx.sys.source_file.clone();
            eprintln!("[DAP] program_path = {}", ds.program_path);
        }
        eprintln!("[DAP] file loaded, spawning executor thread");
        let et = event_tx.clone();
        let cr = cmd_rx_opt.take().unwrap(); // 安全：此处一定为 Some
        executor_handle = Some(thread::spawn(move || {
            crate::executor::run_debug_executor(nb, shared_clone, et, cr);
        }));
    }

    let mut seq: i64 = 0;
    let mut launched = false;
    let mut launch_failed = false;

    eprintln!("[DAP] entering main loop, waiting for DAP client...");

    // DAP 主循环（非阻塞轮询模式：避免 blocking read 导致 Terminated 事件无法处理）
    loop {
        // 1) 处理 executor 发来的事件（全部排空）
        loop {
            match event_rx.try_recv() {
                Ok(DebugEvent::Stopped { reason, _file, _line }) => {
                    eprintln!("[DAP] event: Stopped reason={} file={} line={}", reason, _file, _line);
                    let fname = _file.rsplit(&['\\', '/'][..]).next().unwrap_or(&_file);
                    let ev = json!({
                        "type": "event",
                        "seq": seq,
                        "event": "stopped",
                        "body": {
                            "reason": reason,
                            "description": format!("Paused in {}", fname),
                            "threadId": 1,
                            "allThreadsStopped": true,
                            "text": format!("{} (line {})", fname, _line),
                        }
                    });
                    seq += 1;
                    send_message(&mut writer, &ev);
                }
                Ok(DebugEvent::Output(text)) => {
                    let ev = json!({
                        "type": "event",
                        "seq": seq,
                        "event": "output",
                        "body": { "category": "stdout", "output": text }
                    });
                    seq += 1;
                    send_message(&mut writer, &ev);
                }
                Ok(DebugEvent::Terminated) => {
                    eprintln!("[DAP] event: Terminated");
                    let ev = json!({
                        "type": "event", "seq": seq, "event": "terminated"
                    });
                    send_message(&mut writer, &ev);
                    if let Some(h) = executor_handle.take() {
                        let _ = h.join();
                    }
                    return Ok(());
                }
                Err(TryRecvError::Empty) => break,
                Err(TryRecvError::Disconnected) => {
                    if let Some(h) = executor_handle.take() {
                        let _ = h.join();
                    }
                    return Ok(());
                }
            }
        }

        // 2) 非阻塞读取 DAP 请求：仅当有缓冲数据或 stdin 就绪时才读取
        if reader.buffer().is_empty() && !stdin_has_data() {
            thread::sleep(Duration::from_millis(30));
            continue;
        }

        let msg = match read_message(&mut reader) {
            Some(m) => m,
            None => break,
        };

        let req_type = msg.get("type").and_then(|v| v.as_str()).unwrap_or("");
        if req_type != "request" {
            continue;
        }

        let command = msg.get("command").and_then(|v| v.as_str()).unwrap_or("");
        let request_seq = msg.get("seq").and_then(|v| v.as_i64()).unwrap_or(0);
        let args = msg.get("arguments");

        eprintln!("[DAP] request: {} seq={}", command, request_seq);

        match command {
            "initialize" => {
                eprintln!("[DAP] handling initialize");
                seq += 1;
                send_message(&mut writer, &dap_response(seq, "initialize", request_seq, true,
                    Some(json!({
                        "supportsConfigurationDoneRequest": true,
                        "supportsStepInTargetsRequest": false,
                        "supportsConditionalBreakpoints": false,
                        "supportsHitConditionalBreakpoints": false,
                        "supportsEvaluateForHovers": false,
                        "supportsSetVariable": false,
                        "supportsFunctionBreakpoints": false,
                        "supportsLogPoints": false,
                        "supportsDelayedStackTraceLoading": false,
                    }))));

                seq += 1;
                let ev = json!({
                    "type": "event", "seq": seq, "event": "initialized",
                });
                send_message(&mut writer, &ev);
            }

            "launch" => {
                // 读取 stopOnEntry 选项（无论预加载还是延迟加载都需要）
                let stop_on_entry = args
                    .and_then(|a| a.get("stopOnEntry"))
                    .and_then(|v| v.as_bool())
                    .unwrap_or(false);
                if stop_on_entry {
                    shared.lock().unwrap().stop_on_entry = true;
                }

                // 如果没有预加载（启动时未传文件），从 launch args 中获取文件并初始化 executor
                if !launched && executor_handle.is_none() {
                    let program = args
                        .and_then(|a| a.get("program"))
                        .and_then(|v| v.as_str())
                        .unwrap_or("");

                    if !program.is_empty() {
                        match interpreter::Nebula::from_file(program) {
                            Ok(nb) => {
                                // 捕获规范化后的源文件路径
                                {
                                    let mut ds = shared.lock().unwrap();
                                    ds.program_path = nb.ctx.sys.source_file.clone();
                                    eprintln!("[DAP] launch program_path = {}", ds.program_path);
                                }
                                launched = true;
                                let sc = shared.clone();
                                let et = event_tx_clone.clone();
                                if let Some(cr) = cmd_rx_opt.take() {
                                    let sh = thread::spawn(move || {
                                    crate::executor::run_debug_executor(nb, sc, et, cr);
                                    });
                                    executor_handle = Some(sh);
                                }
                            }
                            Err(e) => {
                                launch_failed = true;
                                // 文件加载失败，通过 output 事件通知用户
                                seq += 1;
                                let ev = json!({
                                    "type": "event",
                                    "seq": seq,
                                    "event": "output",
                                    "body": { "category": "stderr", "output": format!("加载文件失败: {}\n", e) }
                                });
                                send_message(&mut writer, &ev);
                                // 发送 terminated 避免调试会话挂起
                                seq += 1;
                                let term_ev = json!({
                                    "type": "event", "seq": seq, "event": "terminated"
                                });
                                send_message(&mut writer, &term_ev);
                            }
                        }
                    }
                }
                seq += 1;
                send_message(&mut writer, &dap_response(seq, "launch", request_seq, true, None));
            }

            "setBreakpoints" => {
                let raw_path = args
                    .and_then(|a| a.get("source"))
                    .and_then(|s| s.get("path"))
                    .and_then(|v| v.as_str())
                    .unwrap_or("")
                    .to_string();

                // 规范化路径，确保与 executor 中 ctx.sys.source_file 匹配
                // 策略：1) 直接 canonicalize  2) 相对 program 目录解析  3) clean_path 兜底
                let source_path = {
                    let p = std::path::Path::new(&raw_path);
                    p.canonicalize()
                        .or_else(|_| {
                            let ds = shared.lock().unwrap();
                            let prog_dir = std::path::Path::new(&ds.program_path)
                                .parent()
                                .unwrap_or(std::path::Path::new("."));
                            prog_dir.join(&raw_path).canonicalize()
                        })
                        .map(|abs| clean_path(&abs.to_string_lossy()))
                        .unwrap_or_else(|_| clean_path(&raw_path))
                };
                eprintln!("[DAP] setBreakpoints raw={} resolved={}", raw_path, source_path);

                let bp_list = args
                    .and_then(|a| a.get("breakpoints"))
                    .and_then(|v| v.as_array())
                    .cloned()
                    .unwrap_or_default();

                {
                    let mut ds = shared.lock().unwrap();
                    let lines: HashSet<usize> = bp_list
                        .iter()
                        .filter_map(|bp| bp.get("line").and_then(|v| v.as_u64()).map(|l| l as usize))
                        .collect();
                    ds.breakpoints.insert(source_path, lines);
                }

                let confirmed: Vec<Value> = bp_list.iter().map(|bp| {
                    let line = bp.get("line").and_then(|v| v.as_u64()).unwrap_or(0);
                    json!({ "verified": true, "line": line })
                }).collect();

                seq += 1;
                send_message(&mut writer, &dap_response(seq, "setBreakpoints", request_seq, true,
                    Some(json!({ "breakpoints": confirmed }))));
            }

            "configurationDone" => {
                eprintln!("[DAP] configurationDone: sending Continue to executor");
                seq += 1;
                send_message(&mut writer, &dap_response(seq, "configurationDone", request_seq, true, None));
                if !launch_failed {
                    // 通知 executor 开始执行
                    let _ = cmd_tx.send(DebugCommand::Continue);
                    eprintln!("[DAP] Continue sent to executor");
                }
            }

            "continue" => {
                seq += 1;
                send_message(&mut writer, &dap_response(seq, "continue", request_seq, true,
                    Some(json!({ "allThreadsContinued": false }))));
                let _ = cmd_tx.send(DebugCommand::Continue);
            }

            "next" => {
                seq += 1;
                send_message(&mut writer, &dap_response(seq, "next", request_seq, true, None));
                let depth = shared.lock().unwrap().depth;
                let _ = cmd_tx.send(DebugCommand::Next(depth));
            }

            "stepIn" => {
                seq += 1;
                send_message(&mut writer, &dap_response(seq, "stepIn", request_seq, true, None));
                let _ = cmd_tx.send(DebugCommand::StepIn);
            }

            "stepOut" => {
                seq += 1;
                send_message(&mut writer, &dap_response(seq, "stepOut", request_seq, true, None));
                let depth = shared.lock().unwrap().depth;
                let _ = cmd_tx.send(DebugCommand::StepOut(depth));
            }

            "pause" => {
                seq += 1;
                send_message(&mut writer, &dap_response(seq, "pause", request_seq, true, None));
                let _ = cmd_tx.send(DebugCommand::Pause);
            }

            "threads" => {
                seq += 1;
                send_message(&mut writer, &dap_response(seq, "threads", request_seq, true,
                    Some(json!({ "threads": [{ "id": 1, "name": "main" }] }))));
            }

            "stackTrace" => {
                let ds = shared.lock().unwrap();
                let frames: Vec<Value> = ds.call_stack.iter().map(|f| {
                    let fname = f.file.rsplit(&['\\', '/'][..]).next().unwrap_or(&f.file);
                    let display_path = clean_path(&f.file);
                    eprintln!("[DAP] stackTrace frame id={} name={} path={}", f.id, f.name, display_path);
                    json!({
                        "id": f.id,
                        "name": f.name,
                        "source": { "name": fname, "path": display_path },
                        "line": f.line,
                        "column": 0,
                    })
                }).collect();
                drop(ds);

                seq += 1;
                send_message(&mut writer, &dap_response(seq, "stackTrace", request_seq, true,
                    Some(json!({ "stackFrames": frames, "totalFrames": frames.len() }))));
            }

            "scopes" => {
                let frame_id = args
                    .and_then(|a| a.get("frameId"))
                    .and_then(|v| v.as_u64())
                    .unwrap_or(0);

                let scopes: Vec<Value> = {
                    let ds = shared.lock().unwrap();
                    // 根据 frame_id 查找对应栈帧的作用域链
                    let scope_chain = ds.call_stack
                        .iter()
                        .find(|f| f.id as u64 == frame_id)
                        .map(|f| &f.scope_chain)
                        .unwrap_or(&ds.scope_chain);
                    scope_chain.iter().enumerate().map(|(i, (name, vars))| {
                        json!({
                            "name": name,
                            "variablesReference": (frame_id + 1000) * 10 + (i as u64),
                            "namedVariables": vars.len(),
                            "indexedVariables": 0,
                            "expensive": false,
                        })
                    }).collect()
                };

                seq += 1;
                send_message(&mut writer, &dap_response(seq, "scopes", request_seq, true,
                    Some(json!({ "scopes": scopes }))));
            }

            "variables" => {
                let var_ref = args
                    .and_then(|a| a.get("variablesReference"))
                    .and_then(|v| v.as_u64())
                    .unwrap_or(0);

                // 判断引用类型
                if var_ref >= 1_000_000 {
                    // 嵌套变量引用：查 nested_var_map
                    let ds = shared.lock().unwrap();
                    let vars: Vec<Value> = ds.nested_var_map
                        .get(&var_ref)
                        .cloned()
                        .unwrap_or_default();
                    drop(ds);
                    seq += 1;
                    send_message(&mut writer, &dap_response(seq, "variables", request_seq, true,
                        Some(json!({ "variables": vars }))));
                } else {
                    // 作用域引用：构建嵌套树
                    let scope_idx = (var_ref % 10) as usize;
                    let frame_id = (var_ref / 10) - 1000;
                    let ds = shared.lock().unwrap();
                    // 根据 frame_id 查找对应栈帧的作用域链
                    let scope_chain = ds.call_stack
                        .iter()
                        .find(|f| f.id as u64 == frame_id)
                        .map(|f| &f.scope_chain)
                        .unwrap_or(&ds.scope_chain);
                    let flat_map = scope_chain
                        .get(scope_idx)
                        .map(|(_, m)| m.clone());
                    let mut next_ref = ds.next_nested_ref;
                    drop(ds);

                    let (vars, new_nested) = flat_map
                        .as_ref()
                        .map(|m| build_nested_vars(m, &mut next_ref))
                        .unwrap_or_default();

                    let mut ds = shared.lock().unwrap();
                    ds.nested_var_map.extend(new_nested);
                     ds.next_nested_ref = next_ref;
                     drop(ds);

                     seq += 1;
                    send_message(&mut writer, &dap_response(seq, "variables", request_seq, true,
                        Some(json!({ "variables": vars }))));
                }
            }

            "disconnect" => {
                seq += 1;
                send_message(&mut writer, &dap_response(seq, "disconnect", request_seq, true, None));
                {
                    let mut ds = shared.lock().unwrap();
                    ds.terminated = true;
                }
                let _ = cmd_tx.send(DebugCommand::Continue); // 唤醒可能阻塞的 executor
                if let Some(h) = executor_handle.take() {
                    let _ = h.join();
                }
                return Ok(());
            }

            _ => {
                // 未知命令返回成功
                seq += 1;
                send_message(&mut writer, &dap_response(seq, command, request_seq, true, None));
            }
        }
    }

    if let Some(h) = executor_handle.take() {
        let _ = h.join();
    }
    Ok(())
}

/* ===================== 执行器线程 ===================== */

/* ===================== 断点检查（executor 调用） ===================== */

/// 将扁平变量表构建为嵌套树。
/// 例如 `test.a` → test 节点包含子节点 a
/// 返回 (顶层变量列表, nested_var_map)
fn build_nested_vars(
    flat: &HashMap<String, String>,
    next_ref: &mut u64,
) -> (Vec<Value>, HashMap<u64, Vec<Value>>) {
    // 1. 构建树：根节点 + 子节点
    struct Node {
        leaf_val: Option<String>,
        children: BTreeMap<String, Node>,
    }

    let mut root = BTreeMap::<String, Node>::new();

    for (name, val) in flat {
        let mut parts: Vec<&str> = name.split('.').collect();
        if parts.is_empty() {
            continue;
        }
        let first = parts.remove(0).to_string();

        if parts.is_empty() {
            // 叶子变量：直接赋值
            let node = root.entry(first).or_insert_with(|| Node {
                leaf_val: None,
                children: BTreeMap::new(),
            });
            node.leaf_val = Some(val.clone());
        } else {
            // 嵌套路径：逐级插入
            let leaf_key = parts.pop().unwrap().to_string();
            let leaf_val = val.clone();
            let mut cur = root.entry(first).or_insert_with(|| Node {
                leaf_val: None,
                children: BTreeMap::new(),
            });
            for part in parts {
                cur = cur.children.entry(part.to_string()).or_insert_with(|| Node {
                    leaf_val: None,
                    children: BTreeMap::new(),
                });
            }
            let leaf = cur.children.entry(leaf_key).or_insert_with(|| Node {
                leaf_val: None,
                children: BTreeMap::new(),
            });
            leaf.leaf_val = Some(leaf_val);
        }
    }

    // 2. 扁平化树 → DAP variables
    fn flatten(
         tree: BTreeMap<String, Node>,
         next_ref: &mut u64,
         nested: &mut HashMap<u64, Vec<Value>>,
     ) -> Vec<Value> {
        let mut result = Vec::new();
        // 用 BTreeMap 保证稳定顺序
        for (name, node) in tree {
            let leaf_str = node.leaf_val.as_deref().unwrap_or("");
            if node.children.is_empty() {
                // 纯叶子：无子节点
                let dv = truncate_val(leaf_str);
                result.push(json!({ "name": name, "value": dv, "variablesReference": 0 }));
            } else {
                // 容器：分配 nested ref，递归子节点
                let child_vars = flatten(node.children, next_ref, nested);
                let ref_id = *next_ref;
                *next_ref += 1;

                // 构建内联摘要：{key: val, ...}
                let mut parts: Vec<String> = child_vars.iter()
                    .filter_map(|v| {
                        let name = v.get("name")?.as_str()?;
                        let val = v.get("value")?.as_str().unwrap_or("");
                        if val.len() > 30 {
                            Some(format!("{}: {}...", name, &val[..30]))
                        } else {
                            Some(format!("{}: {}", name, val))
                        }
                    })
                    .collect();
                let contents = if parts.len() > 3 {
                    parts.truncate(3);
                    format!("{}, ...", parts.join(", "))
                } else {
                    parts.join(", ")
                };

                let summary = if leaf_str.is_empty() {
                    format!("*{} {{{}}}", name, contents)
                } else {
                    format!("{} *{} {{{}}}", leaf_str, name, contents)
                };
                nested.insert(ref_id, child_vars);
                result.push(json!({ "name": name, "value": summary, "variablesReference": ref_id }));
            }
        }
        result
    }

    let mut nested = HashMap::new();
    let vars = flatten(root, next_ref, &mut nested);
    (vars, nested)
}

/// 截断过长值
fn truncate_val(val: &str) -> String {
    if val.chars().count() > 5000 {
        format!("{}...", val.chars().take(5000).collect::<String>())
    } else {
        val.to_string()
    }
}

/// executor 在每条语句执行前调用，检查是否该暂停。
/// 返回 true = 继续执行，false = 终止。
pub fn check_debug_before_exec(
    shared: &Arc<Mutex<SharedDebugState>>,
    event_tx: &Sender<DebugEvent>,
    cmd_rx: &Arc<Mutex<Receiver<DebugCommand>>>,
    file: &str,
    line: usize,
    depth: usize,
    scope_chain: &[(String, HashMap<String, String>)],
    is_func_call: bool,
) -> bool {
    let mut ds = shared.lock().unwrap();

    if ds.terminated {
        return false;
    }

    // 更新位置信息（ds.call_stack 由 exec_func_call 管理 push/pop，
    // 由 Stmt::FuncCall 分支更新调用者帧，此处只更新栈顶帧行号）
    ds.current_file = file.to_string();
    ds.current_line = line;
    ds.depth = depth;
    ds.scope_chain = scope_chain.to_vec();
    // 更新栈顶帧的行号为当前执行行
    if let Some(top) = ds.call_stack.last_mut() {
        top.line = line;
    }

    // 当前是否在断点上
    let at_breakpoint = ds.breakpoints
        .get(file)
        .map(|set| set.contains(&line))
        .unwrap_or(false);

    // 确定本次是否需要暂停
    let need_pause = if at_breakpoint {
        true
    } else if let Some(ref intent) = ds.step_pending {
        // 来自暂停后阻塞循环中消费的步进命令（使用引用避免提前消费）
        let pause = match intent {
            StepIntent::StepIn => { true },
            StepIntent::StepOver(step_depth) => {
                let p = depth <= *step_depth;
                p
            },
            StepIntent::StepOut(step_depth) => {
                let p = depth < *step_depth;
                p
            },
        };
        pause
    } else {
        // 检查是否有待处理的步进命令
        match cmd_rx.lock().unwrap().try_recv() {
            Ok(DebugCommand::Continue) => false,
            Ok(DebugCommand::Pause) => true,
            Ok(DebugCommand::Next(step_depth)) => {
                // StepOver: 同深度或更浅时暂停
                depth <= step_depth
            }
            Ok(DebugCommand::StepIn) => true,
            Ok(DebugCommand::StepOut(step_depth)) => {
                // StepOut: 当前深度小于起始深度时暂停
                depth < step_depth
            }
            Err(_) => false, // 无命令，继续执行
        }
    };

    eprintln!("[DBG] check file={} line={} depth={} at_bp={}", file, line, depth, at_breakpoint);
    if need_pause {
        eprintln!("[DBG] PAUSING at {}:{} reason={}", file, line, if at_breakpoint { "breakpoint" } else { "step" });
        ds.paused = true;
        ds.step_pending = None; // 暂停时清除步进意图

        // 更新调用栈顶部帧为当前暂停位置（确保 VS Code 显示正确的行号和文件）
        if let Some(top) = ds.call_stack.last_mut() {
            top.line = line;
            top.file = file.to_string();
            top.scope_chain = scope_chain.to_vec();
        }
        drop(ds);

        // 通知 DAP 线程：已停止
        let reason = if at_breakpoint { "breakpoint" } else { "step" };
        let _ = event_tx.send(DebugEvent::Stopped {
            reason: reason.to_string(),
            _file: file.to_string(),
            _line: line,
        });

        // 阻塞等待恢复命令
        loop {
            match cmd_rx.lock().unwrap().recv() {
                Ok(DebugCommand::Continue) => {
                    let mut ds = shared.lock().unwrap();
                    ds.paused = false;
                    ds.step_pending = None;
                    break;
                }
                Ok(DebugCommand::Next(_)) => {
                    let mut ds = shared.lock().unwrap();
                    ds.paused = false;
                    ds.step_pending = Some(StepIntent::StepOver(depth));
                    break;
                }
                Ok(DebugCommand::StepIn) => {
                    let mut ds = shared.lock().unwrap();
                    ds.paused = false;
                    if is_func_call {
                        // 当前暂停在函数调用上 → 真正步入
                        ds.step_pending = Some(StepIntent::StepIn);
                    } else {
                        // 当前不是函数调用 → 行为等同于 StepOver
                        ds.step_pending = Some(StepIntent::StepOver(depth));
                    }
                    break;
                }
                Ok(DebugCommand::StepOut(_)) => {
                    let mut ds = shared.lock().unwrap();
                    ds.paused = false;
                    ds.step_pending = Some(StepIntent::StepOut(depth));
                    break;
                }
                Ok(DebugCommand::Pause) => {
                    // 已经暂停了，忽略
                }
                Err(_) => {
                    // channel 断开
                    return false;
                }
            }
        }

        // 检查是否被终止
        let ds = shared.lock().unwrap();
        if ds.terminated {
            return false;
        }
    }

    true
}
