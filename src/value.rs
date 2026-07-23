use std::collections::HashMap;
use std::fmt;
use std::sync::Arc;
use crate::ast::Value;

/* ===================== Scope: 链式作用域 ===================== */

/// 变量作用域（Python 风格链式查找）
/// 
/// 查找沿 enclosing 链回溯：当前 obj → enclosing.obj → enclosing.enclosing.obj → ...
/// 写入始终写入当前 obj（Python 语义：赋值只在本地作用域）
#[derive(Clone)]
pub struct Scope {
    pub(crate) obj: HashMap<String, Value>,
    enclosing: Option<Arc<Scope>>,
}

/// 自定义 Debug：不递归展开链，仅展示当前帧变量 + 链深度
impl fmt::Debug for Scope {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let depth = self.chain_depth();
        f.debug_struct("Scope")
            .field("vars", &self.obj.len())
            .field("chain_depth", &depth)
            .finish()
    }
}

#[allow(dead_code)]
impl Scope {
    pub fn new() -> Self {
        Scope {
            obj: HashMap::new(),
            enclosing: None,
        }
    }

    pub fn with_enclosing(enclosing: Arc<Scope>) -> Self {
        Scope {
            obj: HashMap::new(),
            enclosing: Some(enclosing),
        }
    }

    /// 链深度（调试用）
    fn chain_depth(&self) -> usize {
        let mut depth = 1;
        let mut cur = self;
        while let Some(p) = &cur.enclosing {
            depth += 1;
            cur = p;
        }
        depth
    }

    // ─── 链式查找（Python LEGB 风格） ───

    /// 本作用域查找（不回溯链）
    pub fn get(&self, key: &str) -> Option<&Value> {
        self.obj.get(key)
    }

    /// 链式查找：当前 → enclosing → ...
    pub fn resolve(&self, key: &str) -> Option<&Value> {
        if let Some(v) = self.obj.get(key) {
            return Some(v);
        }
        self.enclosing.as_ref().and_then(|e| e.resolve(key))
    }

    /// 链式查找并转为显示字符串
    pub fn get_cloned(&self, key: &str) -> String {
        self.resolve(key).map(|v| v.display()).unwrap_or_default()
    }

    /// 链式查找：比较变量值是否等于指定字符串
    pub fn eq_str(&self, key: &str, other: &str) -> bool {
        self.resolve(key).map(|v| match v {
            Value::Str(s) => s == other,
            Value::Int(i) => i.to_string() == other,
            _ => false,
        }).unwrap_or(other.is_empty())
    }

    // ─── 本地查找（不回溯链） ───

    pub fn contains_key_local(&self, key: &str) -> bool {
        self.obj.contains_key(key)
    }

    pub fn iter_local(&self) -> impl Iterator<Item = (&String, &Value)> {
        self.obj.iter()
    }

    // ─── 写入 ───

    pub fn set_funcptr(&mut self, key: &str, func_name: String) {
        self.obj.insert(key.to_string(), Value::FuncPtr(func_name));
    }

    pub fn set_val(&mut self, key: &str, value: Value) {
        self.obj.insert(key.to_string(), value);
    }

    pub fn set_string(&mut self, key: &str, value: String) {
        if let Ok(i) = value.parse::<i64>() {
            self.obj.insert(key.to_string(), Value::Int(i));
        } else if let Ok(f) = value.parse::<f64>() {
            self.obj.insert(key.to_string(), Value::Float(f));
        } else {
            self.obj.insert(key.to_string(), Value::Str(value));
        }
    }

    pub fn remove(&mut self, key: &str) {
        self.obj.remove(key);
    }

    pub fn get_all(&self) -> &HashMap<String, Value> {
        &self.obj
    }

    /// 收集链上所有变量，返回 [(作用域名, 变量表)]，从当前到根
    /// 最底层的 root（最后一级）标记为 "全局变量"
    pub fn collect_chain_vars(&self) -> Vec<(String, HashMap<String, Value>)> {
        let mut chain = Vec::new();
        let mut cur = Some(self);
        while let Some(scope) = cur {
            let name = if scope.enclosing.is_none() {
                "全局变量".to_string()
            } else if chain.is_empty() {
                "局部变量".to_string()
            } else {
                format!("上级作用域 #{}", chain.len())
            };
            chain.push((name, scope.obj.clone()));
            cur = scope.enclosing.as_deref();
        }
        chain
    }

    // ─── 文本替换（%变量名%） ───

    /// 核心变量替换：处理 %变量名% 格式
    /// 仅从本作用域查找（不回溯链）
    pub fn text(&self, input: &str) -> String {
        if input.is_empty() {
            return String::new();
        }
        if !input.contains('%') {
            if input.contains('@') {
                return resolve_at_slices(input, self, None);
            }
            return input.to_string();
        }
        let result = Self::text_with_vals(input, self, None);
        if result.contains('@') {
            return resolve_at_slices(&result, self, None);
        }
        result
    }

    /// 解析参数默认值
    pub fn resolve_default(&self, default_val: &str, has_named_params: bool) -> String {
        if has_named_params {
            return default_val.to_string();
        }
        let resolved = self.text(&format!("%{}%", default_val));
        if resolved.starts_with('%') && resolved.ends_with('%') {
            default_val.to_string()
        } else {
            resolved
        }
    }

    /// 带全局变量加链式查找的文本替换
    pub fn text_with_vals(input: &str, scope: &Scope, global: Option<&HashMap<String, Value>>) -> String {
        if !input.contains('%') {
            return input.to_string();
        }

        let mut result = String::with_capacity(input.len());
        let mut rest = input;

        loop {
            match rest.find('%') {
                None => {
                    result.push_str(rest);
                    break;
                }
                Some(pct_pos) => {
                    result.push_str(&rest[..pct_pos]);
                    rest = &rest[pct_pos + 1..];

                    match rest.find('%') {
                        None => {
                            result.push('%');
                            result.push_str(rest);
                            break;
                        }
                        Some(close_pos) => {
                            let inner = &rest[..close_pos];
                            if inner.is_empty() {
                                result.push_str("%%");
                            } else {
                                result.push_str(&Self::resolve_var(inner, scope, global));
                            }
                            rest = &rest[close_pos + 1..];
                        }
                    }
                }
            }
        }

        if result.contains('@') {
            return resolve_at_slices(&result, scope, global);
        }
        result
    }

    fn resolve_var(inner: &str, scope: &Scope, global: Option<&HashMap<String, Value>>) -> String {
        match inner {
            "空格" => return " ".to_string(),
            "换行" => return "\n".to_string(),
            _ => {}
        }

        // %!key% 布尔取反
        if let Some(key) = inner.strip_prefix('!') {
            let val = Self::lookup_display(key, scope, global);
            return match val.as_str() {
                "" | "0" | "false" | "False" | "FALSE" | "null" | "NULL" => "1".to_string(),
                _ => "0".to_string(),
            };
        }

        // %TYPE@key% 类型查询
        if let Some(key) = inner.strip_prefix("TYPE@") {
            return Self::lookup_type(key, scope, global);
        }

        // %B64@key% base64 解码
        if let Some(key) = inner.strip_prefix("B64@") {
            let val = Self::lookup_display(key, scope, global);
            if val.is_empty() {
                return format!("%{}%", inner);
            }
            if let Ok(decoded) = base64_decode(&val) {
                if let Ok(s) = std::str::from_utf8(&decoded) {
                    return s.to_string();
                }
            }
            return val;
        }

        // %URL编码@key%
        if let Some(key) = inner.strip_prefix("URL编码@") {
            let val = Self::lookup_display(key, scope, global);
            if val.is_empty() { return format!("%{}%", inner); }
            return urlencoding_encode(&val);
        }

        // %func@key% 获取函数指针
        if let Some(key) = inner.strip_prefix("func@") {
            return key.to_string();
        }

        // %len@key% / %长度@key%
        if let Some(key) = inner.strip_prefix("len@")
            .or_else(|| inner.strip_prefix("长度@"))
        {
            let val = Self::lookup_display(key, scope, global);
            return val.chars().count().to_string();
        }

        // %?key% 可选变量
        if let Some(key) = inner.strip_prefix('?') {
            let val = Self::lookup_display(key, scope, global);
            if val.starts_with('%') && val.ends_with('%') {
                return String::new();
            }
            return val;
        }

        // %随机数X-Y% 随机整数
        if let Some(rest) = inner.strip_prefix("随机数") {
            if let Some(pos) = rest.find('-') {
                let min_str = &rest[..pos];
                let max_str = &rest[pos + 1..];
                if let (Ok(min), Ok(max)) = (min_str.parse::<i64>(), max_str.parse::<i64>()) {
                    if min <= max {
                        let range = (max - min + 1) as u64;
                        use std::collections::hash_map::RandomState;
                        use std::hash::{BuildHasher, Hasher};
                        use std::sync::atomic::{AtomicU64, Ordering};
                        static COUNTER: AtomicU64 = AtomicU64::new(0);
                        let c = COUNTER.fetch_add(1, Ordering::Relaxed);
                        let mut hasher = RandomState::new().build_hasher();
                        hasher.write_u64(c);
                        let hash = hasher.finish();
                        return (min + (hash % range) as i64).to_string();
                    }
                }
            }
        }

        // %@key[slice]% 文本切片
        if inner.starts_with('@') && inner.contains('[') {
            if let Some((var_name, slice)) = parse_text_slice(&inner[1..]) {
                let val = Self::lookup_display(var_name, scope, global);
                if !val.is_empty() && !val.starts_with('%') {
                    return apply_text_slice(&val, slice);
                }
                return String::new();
            } else if let Some((json_key, sub_keys)) = parse_bracket_path(&inner[1..]) {
                let json_str = Self::lookup_display(json_key, scope, global);
                if !json_str.is_empty() {
                    if let Ok(val) = serde_json::from_str::<serde_json::Value>(&json_str) {
                        if let Some(result) = navigate_json(&val, &sub_keys) {
                            return match result {
                                serde_json::Value::String(s) => s.clone(),
                                serde_json::Value::Null => String::new(),
                                other => other.to_string(),
                            };
                        }
                    }
                }
                return String::new();
            }
        }

        Self::lookup_display(inner, scope, global)
    }

    fn lookup_type(key: &str, scope: &Scope, global: Option<&HashMap<String, Value>>) -> String {
        // 链式查找
        if let Some(v) = scope.resolve(key) {
            return v.type_name().to_string();
        }
        if let Some(g) = global {
            if let Some(v) = g.get(key) {
                return v.type_name().to_string();
            }
        }
        String::new()
    }

    /// 解析指针链：*a → 查找 *a 的值 → 查找目标变量的值
    fn resolve_ptr_chain(ptr_key: &str, scope: &Scope, global: Option<&HashMap<String, Value>>, depth: usize) -> Option<String> {
        if depth == 0 {
            return None;
        }
        let ptr_val = if let Some(v) = scope.resolve(ptr_key) {
            Some(v.display())
        } else if let Some(g) = global {
            g.get(ptr_key).map(|v| v.display())
        } else {
            None
        };

        if let Some(target_name) = ptr_val {
            if target_name.is_empty() {
                return Some(String::new());
            }
            if target_name.starts_with('*') {
                return Self::resolve_ptr_chain(&target_name, scope, global, depth - 1);
            }
            let result = Self::lookup_display_depth(&target_name, scope, global, depth - 1);
            let target_exists = scope.resolve(&target_name).is_some()
                || global.map_or(false, |g| g.contains_key(&target_name))
                || scope.resolve(&format!(".{}", &target_name)).is_some()
                || global.map_or(false, |g| g.contains_key(&format!(".{}", &target_name)));
            if target_exists {
                return Some(result);
            }
            return Some(target_name);
        }

        None
    }

    pub fn resolve_ptr_key(key: &str, scope: &Scope, global: Option<&HashMap<String, Value>>) -> String {
        let ptr_key = format!("*{}", key);
        let ptr_val = if let Some(v) = scope.resolve(&ptr_key) {
            Some(v.display())
        } else if let Some(g) = global {
            g.get(&ptr_key).map(|v| v.display())
        } else {
            None
        };
        match ptr_val {
            Some(ref target_name) if !target_name.is_empty() => {
                if target_name.starts_with('*') {
                    Self::resolve_ptr_key(target_name, scope, global)
                } else {
                    let nested_ptr_key = format!("*{}", target_name);
                    if scope.resolve(&nested_ptr_key).is_some() || global.map_or(false, |g| g.contains_key(&nested_ptr_key)) {
                        Self::resolve_ptr_key(target_name, scope, global)
                    } else {
                        target_name.clone()
                    }
                }
            }
            _ => key.to_string(),
        }
    }

    fn lookup_display_depth(key: &str, scope: &Scope, global: Option<&HashMap<String, Value>>, depth: usize) -> String {
        if depth == 0 {
            return Self::lookup_display_raw(key, scope, global);
        }
        if !key.starts_with('*') {
            let direct = Self::lookup_display_raw(key, scope, global);
            if !(direct.starts_with('%') && direct.ends_with('%')) {
                return direct;
            }
            let ptr_key = format!("*{}", key);
            if let Some(target) = Self::resolve_ptr_chain(&ptr_key, scope, global, depth) {
                return target;
            }
            return direct;
        }
        Self::lookup_display_raw(key, scope, global)
    }

    pub fn lookup_display(key: &str, scope: &Scope, global: Option<&HashMap<String, Value>>) -> String {
        if !key.starts_with('*') {
            let direct = Self::lookup_display_raw(key, scope, global);
            if !(direct.starts_with('%') && direct.ends_with('%')) {
                return direct;
            }
            let ptr_key = format!("*{}", key);
            if let Some(target) = Self::resolve_ptr_chain(&ptr_key, scope, global, 8) {
                return target;
            }
            return direct;
        }
        Self::lookup_display_raw(key, scope, global)
    }

    /// 原始变量查找（链式：scope.resolve → global fallback）
    fn lookup_display_raw(key: &str, scope: &Scope, global: Option<&HashMap<String, Value>>) -> String {
        // 链式查找
        if let Some(v) = scope.resolve(key) {
            return v.display();
        }
        // 全局 fallback
        if let Some(g) = global {
            if let Some(v) = g.get(key) {
                return v.display();
            }
        }
        // 回退：查找 .key（点前缀全局变量）
        if !key.starts_with('.') {
            let dot_key = format!(".{}", key);
            if let Some(v) = scope.resolve(&dot_key) {
                return v.display();
            }
            if let Some(g) = global {
                if let Some(v) = g.get(&dot_key) {
                    return v.display();
                }
            }
        }
        // 特殊内置变量
        match key {
            "时间戳" => {
                use std::time::{SystemTime, UNIX_EPOCH};
                SystemTime::now()
                    .duration_since(UNIX_EPOCH)
                    .map(|d| d.as_secs().to_string())
                    .unwrap_or_default()
            }
            "毫秒时间戳" => {
                use std::time::{SystemTime, UNIX_EPOCH};
                SystemTime::now()
                    .duration_since(UNIX_EPOCH)
                    .map(|d| d.as_millis().to_string())
                    .unwrap_or_default()
            }
            "微秒时间戳" => {
                use std::time::{SystemTime, UNIX_EPOCH};
                SystemTime::now()
                    .duration_since(UNIX_EPOCH)
                    .map(|d| d.as_micros().to_string())
                    .unwrap_or_default()
            }
            "纳秒时间戳" => {
                use std::time::{SystemTime, UNIX_EPOCH};
                SystemTime::now()
                    .duration_since(UNIX_EPOCH)
                    .map(|d| d.as_nanos().to_string())
                    .unwrap_or_default()
            }
            "时间" => {
                let now = std::time::SystemTime::now()
                    .duration_since(std::time::UNIX_EPOCH)
                    .unwrap_or_default();
                let secs = now.as_secs();
                let secs = secs + 8 * 3600;
                let days_since_epoch = secs / 86400;
                let mut y = 1970;
                let mut remaining_days = days_since_epoch as i64;
                loop {
                    let days_in_year = if (y % 4 == 0 && y % 100 != 0) || y % 400 == 0 { 366 } else { 365 };
                    if remaining_days < days_in_year { break; }
                    remaining_days -= days_in_year;
                    y += 1;
                }
                let leap = (y % 4 == 0 && y % 100 != 0) || y % 400 == 0;
                let month_days = [31, if leap { 29 } else { 28 }, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                let mut m = 0;
                for (i, &md) in month_days.iter().enumerate() {
                    if remaining_days < md { m = i + 1; break; }
                    remaining_days -= md;
                }
                let d = remaining_days + 1;
                let day_secs = secs % 86400;
                let h = day_secs / 3600;
                let min = (day_secs % 3600) / 60;
                let s = day_secs % 60;
                format!("{:04}-{:02}-{:02} {:02}:{:02}:{:02}", y, m, d, h, min, s)
            }
            _ => {
                if key == "参数" {
                    let mut params: Vec<(usize, String)> = Vec::new();
                    for (k, v) in scope.iter_local() {
                        if let Some(num_str) = k.strip_prefix("参数") {
                            if let Ok(n) = num_str.parse::<usize>() {
                                if n > 0 {
                                    params.push((n, v.display()));
                                }
                            }
                        }
                    }
                    params.sort_by_key(|(n, _)| *n);
                    let json_parts: Vec<String> = params.iter()
                        .map(|(_, v)| serde_json::Value::String(v.clone()).to_string())
                        .collect();
                    return format!("[{}]", json_parts.join(","));
                }

                if key.contains('-') {
                    let parts: Vec<&str> = key.splitn(2, '-').collect();
                    if parts.len() == 2 {
                        if let (Ok(min), Ok(max)) = (parts[0].parse::<i64>(), parts[1].parse::<i64>()) {
                            if min < max {
                                use std::collections::hash_map::DefaultHasher;
                                use std::hash::{Hash, Hasher};
                                use std::time::{SystemTime, UNIX_EPOCH};
                                let seed = SystemTime::now()
                                    .duration_since(UNIX_EPOCH)
                                    .map(|d| d.as_nanos())
                                    .unwrap_or(0);
                                let mut h = DefaultHasher::new();
                                seed.hash(&mut h);
                                let r = (h.finish() % ((max - min + 1) as u64)) as i64 + min;
                                return r.to_string();
                            }
                        }
                    }
                }
                format!("%{}%", key)
            }
        }
    }
}

/* ===================== 工具函数 ===================== */

pub fn parse_bracket_path(input: &str) -> Option<(&str, Vec<String>)> {
    if let Some(bracket_pos) = input.find('[') {
        let var_name = &input[..bracket_pos];
        let rest = &input[bracket_pos..];
        let mut keys = Vec::new();
        let mut pos = 0;
        let chars: Vec<char> = rest.chars().collect();
        while pos < chars.len() {
            if chars[pos] == '[' {
                let key_start = pos + 1;
                let mut depth = 1;
                let mut end = pos + 1;
                while end < chars.len() && depth > 0 {
                    if chars[end] == '[' { depth += 1; }
                    else if chars[end] == ']' { depth -= 1; }
                    end += 1;
                }
                if depth == 0 {
                    let key: String = chars[key_start..end - 1].iter().collect();
                    keys.push(key);
                    pos = end;
                } else { break; }
            } else { pos += 1; }
        }
        Some((var_name, keys))
    } else { None }
}

fn navigate_json<'a>(val: &'a serde_json::Value, keys: &[String]) -> Option<&'a serde_json::Value> {
    let mut cur = val;
    for key in keys {
        match cur {
            serde_json::Value::Object(map) => cur = map.get(key)?,
            serde_json::Value::Array(arr) => {
                let idx = key.parse::<usize>().ok()?;
                cur = arr.get(idx)?;
            }
            _ => return None,
        }
    }
    Some(cur)
}

fn parse_text_slice(input: &str) -> Option<(&str, (Option<isize>, Option<isize>, Option<isize>))> {
    if let Some(bracket_pos) = input.find('[') {
        let var_name = &input[..bracket_pos];
        let rest = &input[bracket_pos + 1..];
        if let Some(close_pos) = rest.rfind(']') {
            let slice_content = &rest[..close_pos];
            if slice_content.contains(':') {
                let parts: Vec<&str> = slice_content.split(':').collect();
                if parts.len() >= 2 && parts.len() <= 3 {
                    let parse_part = |s: &str| -> Option<isize> {
                        if s.is_empty() { None } else { s.parse::<isize>().ok() }
                    };
                    let start = parse_part(parts[0]);
                    let end = parse_part(parts[1]);
                    let step = if parts.len() == 3 { parse_part(parts[2]) } else { None };
                    return Some((var_name, (start, end, step)));
                }
            }
        }
    }
    None
}

fn apply_text_slice(s: &str, slice: (Option<isize>, Option<isize>, Option<isize>)) -> String {
    let chars: Vec<char> = s.chars().collect();
    let len = chars.len() as isize;
    let step = slice.2.unwrap_or(1);

    if step == 0 { return String::new(); }

    let resolve = |idx: Option<isize>, default: isize| -> isize {
        match idx {
            Some(i) => {
                let i = if i < 0 { i + len } else { i };
                if step > 0 { i.max(0) } else { i.max(-1) }
            }
            None => default,
        }
    };

    let start = resolve(slice.0, if step > 0 { 0 } else { len - 1 });
    let end = resolve(slice.1, if step > 0 { len } else { -1 });

    let mut result = String::new();
    if step > 0 {
        let mut i = start;
        while i < end && i < len {
            result.push(chars[i as usize]);
            i += step;
        }
    } else {
        let mut i = start;
        while i > end && i >= 0 {
            result.push(chars[i as usize]);
            i += step;
        }
    }
    result
}

/// 扫描文本中的 @var[slice] 快捷截取语法并替换
fn resolve_at_slices(input: &str, scope: &Scope, global: Option<&HashMap<String, Value>>) -> String {
    if !input.contains('@') {
        return input.to_string();
    }

    if input.contains('\x01') {
        return input.to_string();
    }

    let chars: Vec<char> = input.chars().collect();
    let len = chars.len();
    let mut result = String::with_capacity(input.len());
    let mut i = 0;

    while i < len {
        if chars[i] == '@' && i + 1 < len {
            let next = chars[i + 1];
            if !next.is_alphanumeric() && next != '_' && !is_cjk(next) {
                result.push('@');
                i += 1;
                continue;
            }

            let var_start = i + 1;
            let mut var_end = var_start;
            while var_end < len {
                let c = chars[var_end];
                if c.is_alphanumeric() || c == '_' || is_cjk(c) || c == '.' {
                    var_end += 1;
                } else {
                    break;
                }
            }

            if var_end > var_start && var_end < len && chars[var_end] == '[' {
                let bracket_start = var_end;
                let mut depth = 1;
                let mut bracket_end = bracket_start + 1;
                while bracket_end < len && depth > 0 {
                    match chars[bracket_end] {
                        '[' => depth += 1,
                        ']' => depth -= 1,
                        _ => {}
                    }
                    bracket_end += 1;
                }

                if depth == 0 {
                    let slice_content: String = chars[bracket_start + 1..bracket_end - 1].iter().collect();
                    if slice_content.contains(':') {
                        let var_name: String = chars[var_start..var_end].iter().collect();
                        let parts: Vec<&str> = slice_content.split(':').collect();
                        if parts.len() >= 2 && parts.len() <= 3 {
                            let parse_part = |s: &str| -> Option<isize> {
                                if s.is_empty() { None } else { s.parse::<isize>().ok() }
                            };
                            let start = parse_part(parts[0]);
                            let end = parse_part(parts[1]);
                            let step = if parts.len() == 3 { parse_part(parts[2]) } else { None };
                            let slice = (start, end, step);

                            let val = Scope::lookup_display(&var_name, scope, global);
                            if !val.is_empty() && !val.starts_with('%') {
                                result.push_str(&apply_text_slice(&val, slice));
                            }
                            i = bracket_end;
                            continue;
                        }
                    }
                }
            }
        }
        result.push(chars[i]);
        i += 1;
    }
    result
}

fn is_cjk(c: char) -> bool {
    matches!(c,
        '\u{4E00}'..='\u{9FFF}' |
        '\u{3400}'..='\u{4DBF}' |
        '\u{F900}'..='\u{FAFF}' |
        '\u{2E80}'..='\u{2EFF}' |
        '\u{3000}'..='\u{303F}' |
        '\u{31C0}'..='\u{31EF}' |
        '\u{3200}'..='\u{32FF}' |
        '\u{3300}'..='\u{33FF}' |
        '\u{FE10}'..='\u{FE1F}' |
        '\u{FE30}'..='\u{FE4F}' |
        '\u{FF00}'..='\u{FFEF}' |
        '\u{20000}'..='\u{2FFFF}' |
        '\u{30000}'..='\u{3FFFF}'
    )
}

/// 正则触发词匹配
pub fn match_bracket_trigger(pattern: &str, input: &str) -> Option<(Vec<String>, Vec<String>)> {
    if let Ok(re) = regex::Regex::new(&format!("^{}$", pattern)) {
        if let Some(caps) = re.captures(input) {
            let num = caps.len().saturating_sub(1);
            if num > 0 {
                let mut names = Vec::with_capacity(num);
                let mut values = Vec::with_capacity(num);
                for i in 1..=num {
                    names.push(format!("括号{}", i));
                    values.push(caps.get(i).map(|m| m.as_str().to_string()).unwrap_or_default());
                }
                return Some((names, values));
            }
            return Some((Vec::new(), Vec::new()));
        }
    }
    if regex::Regex::new(&format!("^{}$", &regex::escape(pattern)))
        .map(|re| re.is_match(input)).unwrap_or(false)
    {
        return Some((Vec::new(), Vec::new()));
    }
    None
}

pub(crate) fn base64_decode(input: &str) -> Result<Vec<u8>, String> {
    const CHARS: &[u8] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let input = input.trim_end_matches('=');
    let mut result = Vec::new();
    let mut buf: u32 = 0;
    let mut bits = 0;
    for c in input.bytes() {
        if c == b'\n' || c == b'\r' || c == b' ' { continue; }
        if let Some(pos) = CHARS.iter().position(|&x| x == c) {
            buf = (buf << 6) | pos as u32;
            bits += 6;
            if bits >= 8 { bits -= 8; result.push((buf >> bits) as u8); buf &= (1 << bits) - 1; }
        } else { return Err(format!("invalid base64 char: {}", c as char)); }
    }
    Ok(result)
}

fn urlencoding_encode(input: &str) -> String {
    let mut result = String::new();
    for byte in input.bytes() {
        match byte {
            b'A'..=b'Z' | b'a'..=b'z' | b'0'..=b'9' | b'-' | b'_' | b'.' | b'~' => result.push(byte as char),
            b' ' => result.push('+'),
            _ => result.push_str(&format!("%{:02X}", byte)),
        }
    }
    result
}

/* ===================== DicVal ===================== */

/// 预处理 %func@arg% 语法：扫描文本中的 %函数名@参数变量%，通过 exec_call 回调执行替换
/// exec_call 接收 (函数名, 参数变量名)，返回替换文本
pub fn expand_func_at<E>(text: &str, mut exec_call: E) -> String
where E: FnMut(&str, &str) -> String
{
    if !text.contains('@') {
        return text.to_string();
    }
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
                        if KNOWN_AT_PREFIXES.iter().any(|p| inner.starts_with(p))
                            || inner.starts_with('@')
                        {
                            result.push('%');
                            result.push_str(inner);
                            result.push('%');
                            continue;
                        }
                        if let Some(at_pos) = inner.find('@') {
                            let func_name = &inner[..at_pos];
                            let arg_key = &inner[at_pos + 1..];
                            let call_result = exec_call(func_name, arg_key);
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

/* ===================== DicVal ===================== */

/// 预处理 %++var% / %--var%：变量自增/自减辅助宏（模块级定义，impl 内调用）
macro_rules! incr_decr_fn {
    ($name:ident, $delim:literal, $op:expr) => {
        fn $name(&mut self, input: &str) -> String {
            if !input.contains($delim) {
                return input.to_string();
            }
            let mut result = String::with_capacity(input.len());
            let mut rest = input;
            let delim_len = $delim.len();
            while let Some(pct) = rest.find($delim) {
                result.push_str(&rest[..pct]);
                rest = &rest[pct + delim_len..];
                if let Some(close) = rest.find('%') {
                    let var_name = &rest[..close];
                    let current = self.p.get_cloned(var_name);
                    let current_num: i64 = if current.is_empty() { 0 } else { current.parse().unwrap_or(0) };
                    let new_val = $op(current_num);
                    self.p.set_string(var_name, new_val.to_string());
                    result.push_str(&new_val.to_string());
                    rest = &rest[close + 1..];
                } else {
                    result.push_str($delim);
                }
            }
            result.push_str(rest);
            result
        }
    };
}

/// 词库双层变量存储：本地作用域 + 全局作用域
///
/// - `p`: 本地变量（含 enclosing 链，支持 Python 风格链式查找）
/// - `g`: 全局变量（Arc 共享，所有上下文共享）
#[derive(Debug, Clone)]
pub struct DicVal {
    pub p: Scope,
    pub(crate) g: Arc<Scope>,
}

#[allow(dead_code)]
impl DicVal {
    pub fn new() -> Self {
        let g = Arc::new(Scope::new());
        let p = Scope::with_enclosing(Arc::clone(&g));
        DicVal { p, g }
    }

    pub fn text(&mut self, input: &str) -> String {
        if input.is_empty() { return String::new(); }
        if !input.contains('%') {
            if input.contains('@') {
                return resolve_at_slices(input, &self.p, Some(self.g.get_all()));
            }
            return input.to_string();
        }
        let input = self.resolve_incr(input);
        let input = self.resolve_decr(&input);
        Scope::text_with_vals(&input, &self.p, Some(self.g.get_all()))
    }

    /// 纯变量替换（不处理 ++ 自增）
    pub fn text_immut(&self, input: &str) -> String {
        if input.is_empty() { return String::new(); }
        if !input.contains('%') {
            if input.contains('@') {
                return resolve_at_slices(input, &self.p, Some(self.g.get_all()));
            }
            return input.to_string();
        }
        Scope::text_with_vals(input, &self.p, Some(self.g.get_all()))
    }

    incr_decr_fn!(resolve_incr, "%++", |n| n + 1);
    incr_decr_fn!(resolve_decr, "%--", |n| n - 1);

    // ─── 全局变量访问（通过链根写入） ───

    /// 在全局作用域（链根）写入变量
    pub fn set_global(&mut self, key: &str, value: String) {
        Arc::make_mut(&mut self.g).set_string(key, value);
    }

    /// 获取全局作用域的 Arc 引用
    pub fn global(&self) -> Arc<Scope> {
        Arc::clone(&self.g)
    }
}
