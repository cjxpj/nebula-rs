use std::collections::HashMap;
use std::sync::Arc;
use crate::ast::Value;

/// 词库变量存储
#[derive(Debug, Clone)]
pub struct Val {
    pub(crate) obj: HashMap<String, Value>,
    objlock: HashMap<String, bool>,
}

#[allow(dead_code)]
impl Val {
    pub fn new() -> Self {
        Val {
            obj: HashMap::new(),
            objlock: HashMap::new(),
        }
    }

    pub fn get(&self, key: &str) -> Option<&Value> {
        self.obj.get(key)
    }

    /// 获取值并转为 f64
    pub fn get_f64(&self, key: &str) -> f64 {
        self.obj.get(key).map(|v| v.as_f64()).unwrap_or(0.0)
    }

    /// 获取值并转为 i64
    pub fn get_i64(&self, key: &str) -> i64 {
        self.obj.get(key).map(|v| v.as_i64()).unwrap_or(0)
    }

    /// 获取值并显示为 String
    pub fn get_display(&self, key: &str) -> String {
        self.obj.get(key).map(|v| v.display()).unwrap_or_default()
    }

    pub fn get_cloned(&self, key: &str) -> String {
        self.get_display(key)
    }

    pub fn set(&mut self, key: &str, value: &str) {
        self.obj.insert(key.to_string(), Value::Str(value.to_string()));
    }

    pub fn set_int(&mut self, key: &str, value: i64) {
        self.obj.insert(key.to_string(), Value::Int(value));
    }

    pub fn set_float(&mut self, key: &str, value: f64) {
        self.obj.insert(key.to_string(), Value::Float(value));
    }

    pub fn set_str(&mut self, key: &str, value: String) {
        self.obj.insert(key.to_string(), Value::Str(value));
    }

    pub fn set_funcptr(&mut self, key: &str, func_name: String) {
        self.obj.insert(key.to_string(), Value::FuncPtr(func_name));
    }

    pub fn set_val(&mut self, key: &str, value: Value) {
        self.obj.insert(key.to_string(), value);
    }

    pub fn set_string(&mut self, key: &str, value: String) {
        // 兼容旧接口：尝试解析为数字
        if let Ok(i) = value.parse::<i64>() {
            self.obj.insert(key.to_string(), Value::Int(i));
        } else if let Ok(f) = value.parse::<f64>() {
            self.obj.insert(key.to_string(), Value::Float(f));
        } else {
            self.obj.insert(key.to_string(), Value::Str(value));
        }
    }

    pub fn is_locked(&self, key: &str) -> bool {
        self.objlock.get(key).copied().unwrap_or(false)
    }

    pub fn lock(&mut self, key: &str) {
        self.objlock.insert(key.to_string(), true);
    }

    pub fn remove(&mut self, key: &str) {
        self.obj.remove(key);
    }

    pub fn get_all(&self) -> &HashMap<String, Value> {
        &self.obj
    }

    pub fn reset(&mut self, data: &HashMap<String, Value>) -> &mut Self {
        self.obj = data.clone();
        self
    }

    /// 核心变量替换：处理 %变量名% 格式
    pub fn text(&self, input: &str) -> String {
        if input.is_empty() {
            return String::new();
        }
        if !input.contains('%') {
            // 快速路径：不含 %，但可能含 @var[slice] 快捷截取
            if input.contains('@') {
                return resolve_at_slices(input, &self.obj, None);
            }
            return input.to_string();
        }
        let result = Self::text_with_vals(input, &self.obj, None);
        // text_with_vals 中未被 %...% 包裹的 @var[slice] 仍需处理
        if result.contains('@') {
            return resolve_at_slices(&result, &self.obj, None);
        }
        result
    }

    /// 带全局变量的文本替换
    pub fn text_with_vals(input: &str, local: &HashMap<String, Value>, global: Option<&HashMap<String, Value>>) -> String {
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
                                result.push_str(&Self::resolve_var(inner, local, global));
                            }
                            rest = &rest[close_pos + 1..];
                        }
                    }
                }
            }
        }

        // 处理未被 %...% 包裹的 @var[slice] 快捷截取
        if result.contains('@') {
            return resolve_at_slices(&result, local, global);
        }
        result
    }

    fn resolve_var(inner: &str, local: &HashMap<String, Value>, global: Option<&HashMap<String, Value>>) -> String {
        match inner {
            "空格" => return " ".to_string(),
            "换行" => return "\n".to_string(),
            _ => {}
        }

        // %!key% 布尔取反
        if let Some(key) = inner.strip_prefix('!') {
            let val = Self::lookup_display(key, local, global);
            return match val.as_str() {
                "" | "0" | "false" | "False" | "FALSE" | "null" | "NULL" => "1".to_string(),
                _ => "0".to_string(),
            };
        }

        // %TYPE@key% 类型查询
        if let Some(key) = inner.strip_prefix("TYPE@") {
            return Self::lookup_type(key, local, global);
        }

        // %B64@key% base64 解码
        if let Some(key) = inner.strip_prefix("B64@") {
            let val = Self::lookup_display(key, local, global);
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
            let val = Self::lookup_display(key, local, global);
            if val.is_empty() { return format!("%{}%", inner); }
            return urlencoding_encode(&val);
        }

        // %func@key% 获取函数指针（返回函数名作为引用）
        if let Some(key) = inner.strip_prefix("func@") {
            return key.to_string();
        }

        // %len@key% / %长度@key%
        if let Some(key) = inner.strip_prefix("len@")
            .or_else(|| inner.strip_prefix("长度@"))
        {
            let val = Self::lookup_display(key, local, global);
            return val.chars().count().to_string();
        }

        // %?key% 可选变量
        if let Some(key) = inner.strip_prefix('?') {
            let val = Self::lookup_display(key, local, global);
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

        // %@key[slice]% 文本切片 (符号截取) —— 方括号内含 ':' 即视为切片
        if inner.starts_with('@') && inner.contains('[') {
            if let Some((var_name, slice)) = parse_text_slice(&inner[1..]) {
                let val = Self::lookup_display(var_name, local, global);
                if !val.is_empty() && !val.starts_with('%') {
                    return apply_text_slice(&val, slice);
                }
                return String::new();
            } else if let Some((json_key, sub_keys)) = parse_bracket_path(&inner[1..]) {
                // %@key[path]% JSON 路径导航
                let json_str = local.get(json_key)
                    .or_else(|| global.and_then(|g| g.get(json_key)))
                    .map(|v| v.display())
                    .unwrap_or_default();
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

        Self::lookup_display(inner, local, global)
    }

    fn lookup_type(key: &str, local: &HashMap<String, Value>, global: Option<&HashMap<String, Value>>) -> String {
        if let Some(v) = local.get(key) {
            return v.type_name().to_string();
        }
        if let Some(g) = global {
            if let Some(v) = g.get(key) {
                return v.type_name().to_string();
            }
        }
        String::new()
    }

    /// 解析指针链：*a → 查找 *a 的值（目标变量名）→ 查找目标变量的值
    /// 支持多级指针链，depth 限制递归深度防止循环引用
    fn resolve_ptr_chain(ptr_key: &str, local: &HashMap<String, Value>, global: Option<&HashMap<String, Value>>, depth: usize) -> Option<String> {
        if depth == 0 {
            return None;
        }
        // 查找指针变量本身
        let ptr_val = if let Some(v) = local.get(ptr_key) {
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
            // 如果目标变量名也是指针，继续递归解引用
            if target_name.starts_with('*') {
                return Self::resolve_ptr_chain(&target_name, local, global, depth - 1);
            }
            // 查找目标变量（传递 depth-1 防止通过 lookup_display 循环）
            let result = Self::lookup_display_depth(&target_name, local, global, depth - 1);
            // 判断目标变量是否真实存在，而非依赖 %key% 格式字符串匹配
            let target_exists = local.contains_key(&target_name)
                || global.map_or(false, |g| g.contains_key(&target_name))
                || local.contains_key(&format!(".{}", &target_name))
                || global.map_or(false, |g| g.contains_key(&format!(".{}", &target_name)));
            if target_exists {
                return Some(result);
            }
            // 目标变量不存在，返回目标名本身作为字面值
            return Some(target_name);
        }

        None
    }

    /// 解析指针链，返回最终存储变量的键名（不取值）
    pub fn resolve_ptr_key(key: &str, local: &HashMap<String, Value>, global: Option<&HashMap<String, Value>>) -> String {
        let ptr_key = format!("*{}", key);
        let ptr_val = if let Some(v) = local.get(&ptr_key) {
            Some(v.display())
        } else if let Some(g) = global {
            g.get(&ptr_key).map(|v| v.display())
        } else {
            None
        };
        match ptr_val {
            Some(ref target_name) if !target_name.is_empty() => {
                if target_name.starts_with('*') {
                    Self::resolve_ptr_key(target_name, local, global)
                } else {
                    // 递归检查目标是否也有指针
                    let nested_ptr_key = format!("*{}", target_name);
                    if local.contains_key(&nested_ptr_key) || global.map_or(false, |g| g.contains_key(&nested_ptr_key)) {
                        Self::resolve_ptr_key(target_name, local, global)
                    } else {
                        target_name.clone()
                    }
                }
            }
            _ => key.to_string(),
        }
    }

    /// 带深度限制的变量查找，防止指针链无限递归
    fn lookup_display_depth(key: &str, local: &HashMap<String, Value>, global: Option<&HashMap<String, Value>>, depth: usize) -> String {
        if depth == 0 {
            // 深度耗尽，回退到普通查找
            return Self::lookup_display_raw(key, local, global);
        }
        // 指针解引用：%a% 时若 *a 存在，则取 *a 的值作为目标变量名，再查找目标变量
        if !key.starts_with('*') {
            let ptr_key = format!("*{}", key);
            if let Some(target) = Self::resolve_ptr_chain(&ptr_key, local, global, depth) {
                return target;
            }
        }
        Self::lookup_display_raw(key, local, global)
    }

    pub fn lookup_display(key: &str, local: &HashMap<String, Value>, global: Option<&HashMap<String, Value>>) -> String {
        // 指针解引用：%a% 时若 *a 存在，则取 *a 的值作为目标变量名，再查找目标变量
        // %*a% 直接返回 *a 的值（目标变量名），不再二次解引用
        if !key.starts_with('*') {
            let ptr_key = format!("*{}", key);
            // 最多递归 8 层防止循环引用
            if let Some(target) = Self::resolve_ptr_chain(&ptr_key, local, global, 8) {
                return target;
            }
        }
        Self::lookup_display_raw(key, local, global)
    }

    /// 原始变量查找（不含指针解引用）
    fn lookup_display_raw(key: &str, local: &HashMap<String, Value>, global: Option<&HashMap<String, Value>>) -> String {

        // Check local
        if let Some(v) = local.get(key) {
            return v.display();
        }
        // Check global
        if let Some(g) = global {
            if let Some(v) = g.get(key) {
                return v.display();
            }
        }
        // 回退：查找 .key（点前缀全局变量）
        if !key.starts_with('.') {
            let dot_key = format!(".{}", key);
            if let Some(v) = local.get(&dot_key) {
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
                // 转为本地时间（简单处理：用 UTC+8）
                let secs = secs + 8 * 3600;
                let days_since_epoch = secs / 86400;
                // 简单推算年月日时分秒
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
                    for (k, v) in local.iter() {
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

/// 解析 [] 格式的 JSON 路径
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

/// JSON 路径导航：按 keys 逐级访问 JSON 值
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

/// 解析文本切片语法：varName[start:end:step]
/// 返回 (变量名, (start_opt, end_opt, step_opt))
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

/// 应用文本切片到字符串（Python 风格切片语义）
fn apply_text_slice(s: &str, slice: (Option<isize>, Option<isize>, Option<isize>)) -> String {
    let chars: Vec<char> = s.chars().collect();
    let len = chars.len() as isize;
    let step = slice.2.unwrap_or(1);

    if step == 0 {
        return String::new();
    }

    // 将索引解析为实际位置
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
fn resolve_at_slices(input: &str, local: &HashMap<String, Value>, global: Option<&HashMap<String, Value>>) -> String {
    if !input.contains('@') {
        return input.to_string();
    }

    // 若包含 \x01 标记，说明含 :: 原始值，跳过 @ 截取展开
    if input.contains('\x01') {
        return input.to_string();
    }

    let chars: Vec<char> = input.chars().collect();
    let len = chars.len();
    let mut result = String::with_capacity(input.len());
    let mut i = 0;

    while i < len {
        if chars[i] == '@' && i + 1 < len {
            // @ 后面必须是变量名字符开头（字母、数字、中文、下划线）
            let next = chars[i + 1];
            if !next.is_alphanumeric() && next != '_' && !is_cjk(next) {
                result.push('@');
                i += 1;
                continue;
            }

            // 收集变量名
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
                // 找配对的 ]
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
                        // 这是一个 @var[slice] 文本切片
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

                            let val = Val::lookup_display(&var_name, local, global);
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

#[derive(Debug, Clone)]
pub struct DicVal {
    pub p: Val,
    pub(crate) g: Arc<Val>,
}

#[allow(dead_code)]
impl DicVal {
    pub fn new() -> Self {
        DicVal { p: Val::new(), g: Arc::new(Val::new()) }
    }

    pub fn text(&mut self, input: &str) -> String {
        if input.is_empty() { return String::new(); }
        if !input.contains('%') {
            if input.contains('@') {
                return resolve_at_slices(input, self.p.get_all(), Some(self.g.get_all()));
            }
            return input.to_string();
        }
        // 先处理 %++var% 自增 / %--var% 自减语法
        let input = self.resolve_incr(input);
        let input = self.resolve_decr(input);
        Val::text_with_vals(&input, self.p.get_all(), Some(self.g.get_all()))
    }

    /// 纯变量替换（不处理 ++ 自增），用于不需要改动的上下文
    pub fn text_immut(&self, input: &str) -> String {
        if input.is_empty() { return String::new(); }
        if !input.contains('%') {
            if input.contains('@') {
                return resolve_at_slices(input, self.p.get_all(), Some(self.g.get_all()));
            }
            return input.to_string();
        }
        Val::text_with_vals(input, self.p.get_all(), Some(self.g.get_all()))
    }

    /// 预处理 %++var%：变量自增，返回自增后的值。变量不存在默认 0。
    fn resolve_incr(&mut self, input: &str) -> String {
        if !input.contains("%++") {
            return input.to_string();
        }
        let mut result = String::with_capacity(input.len());
        let mut rest = input;
        while let Some(pct) = rest.find("%++") {
            result.push_str(&rest[..pct]);
            rest = &rest[pct + 3..]; // 跳过 "%++"
            if let Some(close) = rest.find('%') {
                let var_name = &rest[..close];
                let current = self.p.get_display(var_name);
                let current_num: i64 = if current.is_empty() { 0 } else { current.parse().unwrap_or(0) };
                let new_val = current_num + 1;
                self.p.set_string(var_name, new_val.to_string());
                result.push_str(&new_val.to_string());
                rest = &rest[close + 1..];
            } else {
                result.push_str("%++");
            }
        }
        result.push_str(rest);
        result
    }

    /// 预处理 %--var%：变量自减，返回自减后的值。变量不存在默认 0。
    fn resolve_decr(&mut self, input: String) -> String {
        if !input.contains("%--") {
            return input;
        }
        let mut result = String::with_capacity(input.len());
        let mut rest: &str = &input;
        while let Some(pct) = rest.find("%--") {
            result.push_str(&rest[..pct]);
            rest = &rest[pct + 3..]; // 跳过 "%--"
            if let Some(close) = rest.find('%') {
                let var_name = &rest[..close];
                let current = self.p.get_display(var_name);
                let current_num: i64 = if current.is_empty() { 0 } else { current.parse().unwrap_or(0) };
                let new_val = current_num - 1;
                self.p.set_string(var_name, new_val.to_string());
                result.push_str(&new_val.to_string());
                rest = &rest[close + 1..];
            } else {
                result.push_str("%--");
            }
        }
        result.push_str(rest);
        result
    }

    pub fn run_count_text(&self, content: &str) -> String {
        crate::count::run_count_text(self, content)
    }

    pub fn set_g_string(&mut self, key: &str, value: String) {
        Arc::make_mut(&mut self.g).set_string(key, value);
    }

    pub fn set_g_val(&mut self, key: &str, value: Value) {
        Arc::make_mut(&mut self.g).set_val(key, value);
    }

    pub fn get_g(&self, key: &str) -> Option<&Value> {
        self.g.get(key)
    }

    pub fn get_g_cloned(&self, key: &str) -> String {
        self.g.get_display(key)
    }

    pub fn share_g(&self) -> Arc<Val> {
        Arc::clone(&self.g)
    }

    pub fn set_g_arc(&mut self, g: Arc<Val>) {
        self.g = g;
    }
}
