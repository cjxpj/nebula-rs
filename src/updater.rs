use std::io::Read;
use crate::file_lock;

/// 默认的 GitHub 仓库地址，格式: owner/name
const DEFAULT_REPO: &str = "cjxpj/nebula-rs";

/// 当前程序版本（编译时从 Cargo.toml 获取）
const CURRENT_VERSION: &str = env!("CARGO_PKG_VERSION");
const CURRENT_NAME: &str = env!("CARGO_PKG_NAME");

/// 检测更新：查询 GitHub Releases 最新版本并与当前版本对比
pub fn run_check() -> Result<(), String> {
    let latest = fetch_latest_release(DEFAULT_REPO)?;

    if latest.tag != CURRENT_VERSION {
        println!("\x1b[33m=== 发现新版本! ===\x1b[0m");
        println!("  当前版本: v{}", CURRENT_VERSION);
        println!("  最新版本: v{}", latest.tag);
        if !latest.body.is_empty() {
            println!("\n  更新内容:");
            for line in latest.body.lines() {
                println!("    {}", line);
            }
        }
        if !latest.assets.is_empty() {
            println!("\n  下载文件:");
            for (name, url) in &latest.assets {
                println!("    {} -> {}", name, url);
            }
        }
    } else {
        println!("\x1b[32m已是最新版本 (v{})\x1b[0m", CURRENT_VERSION);
    }
    Ok(())
}

/// 执行更新：下载新版本并替换当前程序
pub fn run_update(asset_filter: &str) -> Result<(), String> {
    let latest = fetch_latest_release(DEFAULT_REPO)?;

    if latest.tag == CURRENT_VERSION {
        println!("\x1b[32m已是最新版本 (v{})\x1b[0m", CURRENT_VERSION);
        return Ok(());
    }

    println!("\x1b[33m正在更新: v{} -> v{}\x1b[0m", CURRENT_VERSION, latest.tag);

    // 匹配当前平台的资源文件
    let target_filter = if !asset_filter.is_empty() {
        asset_filter.to_string()
    } else {
        platform_asset_keyword()
    };

    let download_url = latest
        .assets
        .iter()
        .find_map(|(name, url)| {
            if name.to_lowercase().contains(&target_filter.to_lowercase()) {
                Some(url.clone())
            } else {
                None
            }
        })
        .ok_or_else(|| {
            let names: Vec<&str> = latest.assets.iter().map(|(n, _)| n.as_str()).collect();
            format!(
                "未找到匹配当前平台的更新包 (筛选: {}, 可用: [{}])",
                target_filter,
                names.join(", ")
            )
        })?;

    // 下载新版本
    println!("  下载中: {}", download_url);
    let exe_data = download_binary(&download_url)?;
    println!("  下载完成 ({} 字节)", exe_data.len());

    // 保存新版本并执行替换
    apply_update(&exe_data)?;

    println!("\x1b[32m更新已启动，正在退出当前进程...\x1b[0m");
    std::process::exit(0);
}

// ========== 内部实现 ==========

struct ReleaseInfo {
    tag: String,
    body: String,
    assets: Vec<(String, String)>, // (名称, 浏览器下载地址)
}

fn fetch_latest_release(repo: &str) -> Result<ReleaseInfo, String> {
    let url = format!("https://api.github.com/repos/{}/releases/latest", repo);

    let agent: ureq::Agent = ureq::Agent::config_builder()
        .timeout_global(Some(std::time::Duration::from_secs(20)))
        .build()
        .into();

    let mut data = Vec::new();
    agent
        .get(&url)
        .header("User-Agent", "Nebula-Updater/1.0")
        .header("Accept", "application/vnd.github+json")
        .call()
        .map_err(|e| format!("请求 GitHub API 失败: {}", e))?
        .body_mut()
        .as_reader()
        .read_to_end(&mut data)
        .map_err(|e| format!("读取响应失败: {}", e))?;

    let json: serde_json::Value =
        serde_json::from_slice(&data).map_err(|e| format!("JSON 解析失败: {}", e))?;

    let tag = json["tag_name"]
        .as_str()
        .unwrap_or("")
        .trim_start_matches('v')
        .to_string();
    if tag.is_empty() {
        return Err("无法从 GitHub API 获取最新版本号".into());
    }

    let body = json["body"].as_str().unwrap_or("").to_string();

    let assets: Vec<(String, String)> = json["assets"]
        .as_array()
        .map(|arr| {
            arr.iter()
                .filter_map(|a| {
                    let name = a["name"].as_str()?.to_string();
                    let url = a["browser_download_url"].as_str()?.to_string();
                    Some((name, url))
                })
                .collect()
        })
        .unwrap_or_default();

    Ok(ReleaseInfo { tag, body, assets })
}

fn download_binary(url: &str) -> Result<Vec<u8>, String> {
    let agent: ureq::Agent = ureq::Agent::config_builder()
        .timeout_global(Some(std::time::Duration::from_secs(300)))
        .build()
        .into();

    let mut data = Vec::new();
    agent
        .get(url)
        .header("User-Agent", "Nebula-Updater/1.0")
        .call()
        .map_err(|e| format!("下载失败: {}", e))?
        .body_mut()
        .as_reader()
        .read_to_end(&mut data)
        .map_err(|e| format!("读取下载数据失败: {}", e))?;

    Ok(data)
}

#[cfg(windows)]
fn apply_update(exe_data: &[u8]) -> Result<(), String> {
    let current_exe =
        std::env::current_exe().map_err(|e| format!("无法获取当前程序路径: {}", e))?;

    // 新建一个以 .new 结尾的临时文件
    let new_exe = current_exe.with_file_name(format!("{}_new.exe", CURRENT_NAME));
    file_lock::with_file_write(&new_exe, || {
        std::fs::write(&new_exe, exe_data)
            .map_err(|e| format!("写入新版本失败: {}", e))
    })?;

    // 创建更新批处理脚本
    let current_path = current_exe.to_string_lossy().to_string();
    let new_path = new_exe.to_string_lossy().to_string();
    let script = format!(
        "@echo off\r\n\
         title Nebula 更新中...\r\n\
         echo 正在等待旧进程退出...\r\n\
         timeout /t 2 /nobreak >nul\r\n\
         echo 正在替换文件...\r\n\
         move /y \"{}\" \"{}\"\r\n\
         if %errorlevel% neq 0 (\r\n\
             echo 更新失败! 请手动将 {} 替换为 {}\r\n\
             pause\r\n\
             exit /b 1\r\n\
         )\r\n\
         echo 更新成功!\r\n\
         del \"%~f0\"\r\n\
         start \"\" \"{}\"\r\n",
        new_path, current_path, new_path, current_path, current_path
    );

    let script_path = current_exe.with_file_name("nebula_update.bat");
    file_lock::with_file_write(&script_path, || {
        std::fs::write(&script_path, script)
            .map_err(|e| format!("写入更新脚本失败: {}", e))
    })?;

    // 在新窗口中执行更新脚本
    std::process::Command::new("cmd")
        .arg("/C")
        .arg("start")
        .arg("\"Nebula Update\"")
        .arg("cmd")
        .arg("/C")
        .arg(&script_path)
        .spawn()
        .map_err(|e| format!("启动更新脚本失败: {}", e))?;

    Ok(())
}

#[cfg(not(windows))]
fn apply_update(exe_data: &[u8]) -> Result<(), String> {
    // Linux/macOS 平台：直接写入并替换
    let current_exe =
        std::env::current_exe().map_err(|e| format!("无法获取当前程序路径: {}", e))?;
    let new_exe = current_exe.with_file_name(format!("{}_new", CURRENT_NAME));
    file_lock::with_file_write(&new_exe, || {
        std::fs::write(&new_exe, exe_data)
            .map_err(|e| format!("写入新版本失败: {}", e))
    })?;

    // 设置执行权限
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        file_lock::with_file_write(&new_exe, || {
            std::fs::set_permissions(&new_exe, std::fs::Permissions::from_mode(0o755))
                .map_err(|e| format!("设置权限失败: {}", e))
        })?;
    }

    // 用 mv 替换（同文件系统内是原子操作）
    file_lock::with_file_write(&current_exe, || {
        std::fs::rename(&new_exe, &current_exe)
            .map_err(|e| format!("替换文件失败: {} (已保存至 {})", e, new_exe.display()))
    })?;

    // 重新启动
    std::process::Command::new(&current_exe)
        .args(std::env::args().skip(1).collect::<Vec<_>>())
        .spawn()
        .map_err(|e| format!("重启失败: {}", e))?;

    Ok(())
}

fn platform_asset_keyword() -> String {
    if cfg!(target_os = "windows") {
        "windows".into()
    } else if cfg!(target_os = "macos") {
        "macos".into()
    } else if cfg!(target_os = "linux") {
        "linux".into()
    } else {
        "unknown".into()
    }
}
