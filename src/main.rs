mod analyzer;
mod ast;
mod canvas;
mod count;
mod executor;
mod file_lock;
mod functions;
mod iftext;
mod interpreter;
mod parser;
mod updater;
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

    println!("Nebula REPL");
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
        interpreter::entry(&mut nb.ctx, &[line.to_string()]);
        let output = nb.ctx.output.get();
        if !output.is_empty() {
            println!("{}", output);
        }
        nb.ctx.output.clear();
    }
    Ok(())
}

fn main() {
    #[cfg(windows)]
    enable_ansi();

    let args: Vec<String> = std::env::args().collect();
    let exe_name = args.get(0).map(|s| s.as_str()).unwrap_or("nebula");

    // 解析可选参数
    let mut check_update = false;
    let mut do_update = false;
    let mut asset_filter = String::new();
    let mut interactive = false;
    let mut file_path: Option<&str> = None;

    // 简单的手动参数解析
    let mut i = 1;
    while i < args.len() {
        match args[i].as_str() {
            "-h" | "--help" => {
                print_help(exe_name);
                return;
            }
            "--check-update" | "-c" => check_update = true,
            "--update" | "-u" => do_update = true,
            "--asset" => {
                i += 1;
                if i < args.len() {
                    asset_filter = args[i].clone();
                }
            }
            "-i" => {
                interactive = true;
                i += 1;
                if i < args.len() {
                    file_path = Some(&args[i]);
                }
            }
            arg if !arg.starts_with('-') => {
                file_path = Some(&args[i]);
            }
            _ => {}
        }
        i += 1;
    }

    // 更新相关命令优先处理
    if check_update {
        let result = updater::run_check();
        if let Err(e) = result {
            eprintln!("\x1b[31m{}\x1b[0m", e);
        }
        return;
    }

    if do_update {
        let result = updater::run_update(&asset_filter);
        if let Err(e) = result {
            eprintln!("\x1b[31m{}\x1b[0m", e);
        }
        return;
    }

    let file_path = match file_path {
        Some(p) => p,
        None => {
            eprintln!("用法: {} <文件路径>", exe_name);
            eprintln!("      {} -i <文件路径>  (交互模式)", exe_name);
            eprintln!("      {} --help          (帮助)", exe_name);
            return;
        }
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

fn print_help(exe_name: &str) {
    println!("Nebula 脚本引擎 v{}", env!("CARGO_PKG_VERSION"));
    println!();
    println!("用法:");
    println!("  {} <文件路径>              批处理模式（执行 main 函数）", exe_name);
    println!("  {} -i <文件路径>           交互 REPL 模式", exe_name);
    println!();
    println!("更新命令:");
    println!("  {} --check-update [-c]     检测是否有新版本", exe_name);
    println!("  {} --update [-u]           下载并安装最新版本", exe_name);
    println!();
    println!("更新选项:");
    println!("  --asset <关键词>          指定下载资源的匹配关键词");
    println!();
    println!("其他:");
    println!("  {} -h, --help              显示帮助", exe_name);
}
