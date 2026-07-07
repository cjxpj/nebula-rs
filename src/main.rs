mod analyzer;
mod ast;
mod canvas;
mod count;
mod executor;
mod functions;
mod iftext;
mod interpreter;
mod parser;
mod value;

use std::io::{self, Write};

#[cfg(windows)]
fn enable_ansi() {
    const STD_OUTPUT_HANDLE: u32 = 0xFFFFFFF5; // -11
    const ENABLE_VIRTUAL_TERMINAL_PROCESSING: u32 = 0x0004;
    extern "system" {
        fn GetStdHandle(nStdHandle: u32) -> isize;
        fn GetConsoleMode(hConsoleHandle: isize, lpMode: *mut u32) -> i32;
        fn SetConsoleMode(hConsoleHandle: isize, dwMode: u32) -> i32;
    }
    unsafe {
        let handle = GetStdHandle(STD_OUTPUT_HANDLE);
        if handle != -1isize && handle != 0 {
            let mut mode: u32 = 0;
            if GetConsoleMode(handle, &mut mode) != 0 {
                SetConsoleMode(handle, mode | ENABLE_VIRTUAL_TERMINAL_PROCESSING);
            }
        }
        // Also enable for stderr
        const STD_ERROR_HANDLE: u32 = 0xFFFFFFF4; // -12
        let err_handle = GetStdHandle(STD_ERROR_HANDLE);
        if err_handle != -1isize && err_handle != 0 {
            let mut mode: u32 = 0;
            if GetConsoleMode(err_handle, &mut mode) != 0 {
                SetConsoleMode(err_handle, mode | ENABLE_VIRTUAL_TERMINAL_PROCESSING);
            }
        }
    }
}

fn load_and_init(file_path: &str) -> Result<interpreter::Nebula, String> {
    let mut nb = interpreter::Nebula::from_file(file_path)?;
    nb.load();
    nb.exec_init();
    Ok(nb)
}

fn run_batch(file_path: &str) -> Result<(), String> {
    let mut nb = load_and_init(file_path)?;
    nb.exec_func("main")
        .map(|output| {
            if !output.is_empty() {
                println!("{}", output);
            }
        })
}

fn run_repl(file_path: &str) -> Result<(), String> {
    let mut nb = load_and_init(file_path)?;
    let stdin = io::stdin();
    let mut input = String::new();

    println!("Nebula REPL — 输入触发词，:q 退出，:func 调用函数");
    loop {
        print!(">>> ");
        io::stdout().flush().unwrap();
        input.clear();
        if stdin.read_line(&mut input).is_err() {
            break;
        }
        let line = input.trim();
        if line.is_empty() {
            continue;
        }
        if line.starts_with(':') {
            match line {
                ":q" | ":quit" | ":exit" => break,
                _ if line.starts_with(":func ") => {
                    let func_name = &line[6..].trim();
                    match nb.exec_func(func_name) {
                        Ok(output) => {
                            if !output.is_empty() {
                                println!("{}", output);
                            }
                        }
                        Err(e) => eprintln!("\x1b[31m{}\x1b[0m", e),
                    }
                    nb.ctx.output.clear();
                }
                _ => eprintln!("未知命令: {}（可用: :q :func）", line),
            }
        } else {
            match nb.exec_trigger(line) {
                Ok(output) => {
                    if !output.is_empty() {
                        println!("{}", output);
                    }
                }
                Err(e) => eprintln!("\x1b[31m{}\x1b[0m", e),
            }
            nb.ctx.output.clear();
        }
    }
    Ok(())
}

fn main() {
    #[cfg(windows)]
    enable_ansi();

    let args: Vec<String> = std::env::args().collect();
    let exe_name = args.get(0).map(|s| s.as_str()).unwrap_or("nebula");

    // nebula file.nr        → 批处理模式
    // nebula -i file.nr     → 交互 REPL 模式
    let (interactive, file_path) = if args.len() >= 3 && args[1] == "-i" {
        (true, args[2].as_str())
    } else if args.len() >= 2 {
        if args[1] == "-h" || args[1] == "--help" {
            println!("用法:");
            println!("  {} <文件路径>          批处理模式（执行 main 函数）", exe_name);
            println!("  {} -i <文件路径>       交互 REPL 模式", exe_name);
            println!("  {} -h                  显示帮助", exe_name);
            return;
        }
        (false, args[1].as_str())
    } else {
        eprintln!("用法: {} <文件路径>", exe_name);
        eprintln!("      {} -i <文件路径>  (交互模式)", exe_name);
        return;
    };

    let result = if interactive {
        run_repl(file_path)
    } else {
        run_batch(file_path)
    };

    if let Err(e) = result {
        eprintln!("\x1b[31m{}\x1b[0m", e);
    }
}
