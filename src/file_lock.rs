use std::collections::HashMap;
use std::path::{Path, PathBuf};
use std::sync::{Arc, LazyLock, Mutex, RwLock};

/// 全局文件锁表：每个文件路径对应一个 RwLock
static FILE_LOCKS: LazyLock<Mutex<HashMap<PathBuf, Arc<RwLock<()>>>>> =
    LazyLock::new(|| Mutex::new(HashMap::new()));

/// 获取或创建指定路径的文件锁（RwLock 的 Arc 克隆）
fn get_lock(path: &Path) -> Arc<RwLock<()>> {
    // 规范化路径，避免同一文件因路径写法不同而使用不同的锁
    let key = path.canonicalize().unwrap_or_else(|_| path.to_path_buf());
    let mut locks = FILE_LOCKS.lock().unwrap();
    locks
        .entry(key)
        .or_insert_with(|| Arc::new(RwLock::new(())))
        .clone()
}

/// 以共享读锁持有文件，执行 `f`。多个读操作可并发执行。
pub fn with_file_read<R, F: FnOnce() -> R>(path: &Path, f: F) -> R {
    let lock = get_lock(path);
    let _guard = lock.read().unwrap();
    f()
}

/// 以独占写锁持有文件，执行 `f`。写操作期间所有读写均阻塞。
pub fn with_file_write<R, F: FnOnce() -> R>(path: &Path, f: F) -> R {
    let lock = get_lock(path);
    let _guard = lock.write().unwrap();
    f()
}
