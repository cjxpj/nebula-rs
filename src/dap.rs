//! Debug Adapter Protocol (DAP) 服务端实现
//!
//! 通过 stdin/stdout 与 VS Code 调试器通信，支持：
//! - 断点设置/移除
//! - 单步执行（StepOver / StepIn / StepOut）
//! - 继续执行
//! - 变量查看
//! - 调用栈查看
//!
//! 架构：
//!   主线程 = DAP 消息循环（stdin/stdout）
//!   子线程 = NR 脚本执行器
//!   两个线程通过 mpsc channel 通信

use std::collections::{HashMap, HashSet};
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
}

/// 步进意图（暂停后消费步进命令时暂存，供下一条语句检查）
#[derive(Debug, Clone)]
enum StepIntent {
    StepIn,
    StepOver(usize),
    StepOut(usize),
}

/* ===================== 调试共享状态 ===================== */

/// 由 executor 写入、DAP 线程读取的轻量共享状态
pub struct SharedDebugState {
    /// 断点: 文件路径 → 行号集合
    pub breakpoints: HashMap<String, HashSet<usize>>,
    pub paused: bool,
    pub terminated: bool,
    pub current_file: String,
    pub current_line: usize,
    pub depth: usize,
    pub call_stack: Vec<StackFrame>,
    pub variables: HashMap<String, String>,
    /// 暂停期间收到的步进命令，留给恢复后的第一条语句使用
    step_pending: Option<StepIntent>,
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
            variables: HashMap::new(),
            step_pending: None,
        }
    }
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

/// 去除 Windows canonicalize 产生的 \\?\ 前缀，避免 VS Code 无法识别路径而打开新文件
fn clean_path(path: &str) -> String {
    if cfg!(windows) {
        path.strip_prefix("\\\\?\\").unwrap_or(path).to_string()
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
        let nb = interpreter::Nebula::from_file(fp)?;
        let et = event_tx.clone();
        let cr = cmd_rx_opt.take().unwrap(); // 安全：此处一定为 Some
        executor_handle = Some(thread::spawn(move || {
            crate::executor::run_debug_executor(nb, shared_clone, et, cr);
        }));
    }

    let mut seq: i64 = 0;
    let mut launched = false;
    let mut launch_failed = false;

    // DAP 主循环（非阻塞轮询模式：避免 blocking read 导致 Terminated 事件无法处理）
    loop {
        // 1) 处理 executor 发来的事件（全部排空）
        loop {
            match event_rx.try_recv() {
                Ok(DebugEvent::Stopped { reason, .. }) => {
                    let ev = json!({
                        "type": "event",
                        "seq": seq,
                        "event": "stopped",
                        "body": {
                            "reason": reason,
                            "threadId": 1,
                            "allThreadsStopped": true,
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

        match command {
            "initialize" => {
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
                // 如果没有预加载（启动时未传文件），从 launch args 中获取文件并初始化 executor
                if !launched && executor_handle.is_none() {
                    let program = args
                        .and_then(|a| a.get("program"))
                        .and_then(|v| v.as_str())
                        .unwrap_or("");

                    if !program.is_empty() {
                        match interpreter::Nebula::from_file(program) {
                            Ok(nb) => {
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
                // Windows: canonicalize 保证路径大小写一致，再去除 \\?\ 前缀
                let source_path =
                    std::path::Path::new(&raw_path)
                        .canonicalize()
                        .map(|p| clean_path(&p.to_string_lossy()))
                        .unwrap_or(raw_path);

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
                seq += 1;
                send_message(&mut writer, &dap_response(seq, "configurationDone", request_seq, true, None));
                if !launch_failed {
                    // 通知 executor 开始执行
                    let _ = cmd_tx.send(DebugCommand::Continue);
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

                let var_count = {
                    let ds = shared.lock().unwrap();
                    ds.variables.len()
                };

                seq += 1;
                send_message(&mut writer, &dap_response(seq, "scopes", request_seq, true,
                    Some(json!({
                        "scopes": [{
                            "name": "局部变量",
                            "variablesReference": frame_id + 1000,
                            "namedVariables": var_count,
                            "indexedVariables": 0,
                            "expensive": false,
                        }]
                    }))));
            }

            "variables" => {
                let ds = shared.lock().unwrap();
                let vars: Vec<Value> = ds.variables.iter().map(|(name, val)| {
                    let dv = if val.chars().count() > 200 {
                        format!("{}...", val.chars().take(200).collect::<String>())
                    } else {
                        val.clone()
                    };
                    json!({ "name": name, "value": dv, "variablesReference": 0 })
                }).collect();
                drop(ds);

                seq += 1;
                send_message(&mut writer, &dap_response(seq, "variables", request_seq, true,
                    Some(json!({ "variables": vars }))));
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

/// executor 在每条语句执行前调用，检查是否该暂停。
/// 返回 true = 继续执行，false = 终止。
pub fn check_debug_before_exec(
    shared: &Arc<Mutex<SharedDebugState>>,
    event_tx: &Sender<DebugEvent>,
    cmd_rx: &Receiver<DebugCommand>,
    file: &str,
    line: usize,
    depth: usize,
    variables: &HashMap<String, String>,
    call_stack: &[StackFrame],
) -> bool {
    let mut ds = shared.lock().unwrap();

    if ds.terminated {
        return false;
    }

    // 更新位置信息
    ds.current_file = file.to_string();
    ds.current_line = line;
    ds.depth = depth;
    ds.variables = variables.clone();
    ds.call_stack = call_stack.to_vec();
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
        match intent {
            StepIntent::StepIn => true,
            StepIntent::StepOver(step_depth) => depth <= *step_depth,
            StepIntent::StepOut(step_depth) => depth < *step_depth,
        }
    } else {
        // 检查是否有待处理的步进命令
        match cmd_rx.try_recv() {
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

    if need_pause {
        ds.paused = true;
        ds.step_pending = None; // 暂停时清除步进意图
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
            match cmd_rx.recv() {
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
                    ds.step_pending = Some(StepIntent::StepIn);
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
