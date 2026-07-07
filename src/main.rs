mod ast;
mod value;
mod count;
mod analyzer;
mod iftext;
mod parser;
mod executor;
mod interpreter;
mod functions;
mod canvas;

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

fn main() {
    #[cfg(windows)]
    enable_ansi();

    let mut nb = match interpreter::Nebula::from_file("dicTest/dic.nr") {
        Ok(nb) => nb,
        Err(e) => {
            eprintln!("Error: {}", e);
            return;
        }
    };
    nb.load();
    nb.exec_init();
    match nb.exec_func("main") {
        Ok(output) => {
            if !output.is_empty() {
                println!("{}", output);
            }
        }
        Err(e) => eprintln!("\x1b[31m{}\x1b[0m", e),
    }
}
