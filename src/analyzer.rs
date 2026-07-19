/// 赋值操作符检测（Go 版本 `build/analyzer.go` 的 ValTextTest）
/// 返回值: (类型, 键名, 值内容)
///
/// 类型:
///   0 = 非赋值
///   1 = key-:value  自减
///   2 = key+:value  自增 / JSON追加 / 字符串拼接
///   3 = key:$:value 执行函数后赋值
///   4 = （类型 4 已被类型 9 key%:value 取代为取余赋值）
///   5 = key::value  纯文本赋值
///   6 = key:value   普通赋值
///   7 = key*:value  乘法 / 字符串重复
///   8 = key/:value  除法
///   9 = key%:value  取余
pub fn val_text_test(text: &str) -> (i8, String, String) {
    if text.is_empty() {
        return (0, String::new(), String::new());
    }

    let chars: Vec<char> = text.chars().collect();
    let n = chars.len();
    let mut i = 0;
    let mut json_head = false;
    let mut bracket_depth = 0u32;

    // 扫描键名
    while i < n {
        let c = chars[i];

        // JSON 多键 -xxx>
        if json_head {
            if c == '>' {
                json_head = false;
                i += 1;
                continue;
            }
            break;
        }
        if c == '-' {
            // 如果 - 后面紧跟 : 则是自减操作符，不是 JSON 多键
            if i + 1 < n && chars[i + 1] == ':' {
                break;
            }
            json_head = true;
            i += 1;
            continue;
        }

        // 指针变量前缀 *，仅允许在变量名开头
        if i == 0 && c == '*' {
            i += 1;
            continue;
        }

        // 括号追踪：[] 内部不视为操作符边界
        if c == '[' {
            bracket_depth += 1;
        } else if c == ']' {
            bracket_depth = bracket_depth.saturating_sub(1);
        }

        // ASCII 快速路径
        if c.is_ascii_alphanumeric() || c == '_' || c == '.' || c == '@' || c == '[' || c == ']' {
            i += 1;
            continue;
        }

        // Unicode（中文等）
        if is_chinese_char(c) || c.is_alphabetic() {
            i += 1;
            continue;
        }

        // 在方括号内时，: 不是操作符，继续扫描
        if c == ':' && bracket_depth > 0 {
            i += 1;
            continue;
        }

        break;
    }

    // 没有操作符
    if i >= n {
        return (0, String::new(), String::new());
    }

    let prefix: String = chars[..i].iter().collect();

    // prefix 长度限制
    if prefix.len() > 128 {
        return (0, String::new(), String::new());
    }

    let rest: String = chars[i..].iter().collect();

    // 操作符解析
    if rest.len() >= 2 && rest.starts_with("-:") {
        return (1, prefix, rest[2..].to_string());
    }
    if rest.len() >= 2 && rest.starts_with("+:") {
        return (2, prefix, rest[2..].to_string());
    }
    if rest.len() >= 2 && rest.starts_with("*:") {
        return (7, prefix, rest[2..].to_string());
    }
    if rest.len() >= 2 && rest.starts_with("/:") {
        return (8, prefix, rest[2..].to_string());
    }
    if rest.len() >= 2 && rest.starts_with("$:") {
        return (3, prefix, rest[2..].to_string());
    }
    if rest.len() >= 2 && rest.starts_with("%:") {
        return (9, prefix, rest[2..].to_string());
    }
    if rest.len() >= 2 && rest.starts_with("::") {
        return (5, prefix, rest[2..].to_string());
    }
    if let Some(stripped) = rest.strip_prefix(':') {
        // 注意：全角冒号 ：（U+FF1A）不视为操作符，用于普通文本输出
        return (6, prefix, stripped.to_string());
    }

    (0, String::new(), String::new())
}

#[inline]
pub fn is_chinese_char(c: char) -> bool {
    matches!(c as u32, 0x4E00..=0x9FFF | 0x3400..=0x4DBF | 0x20000..=0x2A6DF)
}

/// 在文本中查找未转义的子串（偶数个反斜杠在前 = 未转义）
pub fn find_unescaped(s: &str, sub: &str, start: usize) -> Option<usize> {
    let mut search_start = start;
    loop {
        let i = s[search_start..].find(sub)?;
        let abs_i = search_start + i;

        // 统计紧挨在前的反斜杠数量
        let mut bs = 0;
        let mut j = abs_i;
        while j > 0 && s.as_bytes()[j - 1] == b'\\' {
            bs += 1;
            j -= 1;
        }
        if bs % 2 == 0 {
            return Some(abs_i); // 偶数 → 未转义
        }
        search_start = abs_i + sub.len();
    }
}

/// 在 $...$ 内部按空格切分，支持转义：\  → 空格, \\ → \, \$ → $
pub fn split_with_escape(s: &str) -> Vec<String> {
    let mut args = Vec::new();
    let mut b = String::new();
    let mut escaped = false;

    for ch in s.chars() {
        if escaped {
            match ch {
                ' ' => b.push(' '),
                '\\' => b.push('\\'),
                '$' => b.push('$'),
                _ => {
                    b.push('\\');
                    b.push(ch);
                }
            }
            escaped = false;
            continue;
        }

        if ch == '\\' {
            escaped = true;
            continue;
        }

        if ch == ' ' {
            if !b.is_empty() {
                args.push(b.clone());
                b.clear();
            }
            continue;
        }

        b.push(ch);
    }

    if escaped {
        b.push('\\');
    }
    if !b.is_empty() {
        args.push(b);
    }
    args
}

/// 处理 $函数名 参数1 参数2$ 格式
/// process: 处理函数文本（接收空格分割后的参数列表）
/// process2: 处理外部文本（原样，不做转义）
#[allow(dead_code)]
pub fn build_func_str<F1, F2>(s: &str, process: &mut F1, process2: &mut F2) -> String
where
    F1: FnMut(&[String]) -> (String, bool),
    F2: FnMut(&str) -> (String, bool),
{
    let mut result = String::new();
    let mut start = 0;

    while let Some(open_index) = find_unescaped(s, "$", start) {
        let close_index = match find_unescaped(s, "$", open_index + 1) {
            Some(i) => i,
            None => break,
        };

        // 外部文本
        let outside = &s[start..open_index];
        if !outside.is_empty() {
            let (out, stop) = process2(outside);
            result.push_str(&out);
            if stop {
                break;
            }
        }

        // 内部文本：按空格分割，处理转义
        let content = &s[open_index + 1..close_index];
        let args = split_with_escape(content);
        let (inn, stop) = process(&args);
        result.push_str(&inn);
        if stop {
            break;
        }

        start = close_index + 1;
    }

    // 余下外部文本
    if start < s.len() {
        let outside = &s[start..];
        if !outside.is_empty() {
            let (out, _) = process2(outside);
            result.push_str(&out);
        }
    }

    result
}

/// ReplaceProcessedContent：查找 strStart...strEnd 之间的内容，经 process 处理后替换
#[allow(dead_code)]
pub fn replace_processed_content<F>(s: &str, str_start: &str, str_end: &str, process: &F) -> String
where
    F: Fn(&str) -> String,
{
    let mut result = String::new();
    let mut start = 0;

    while let Some(open_index) = s[start..].find(str_start).map(|i| start + i) {
        let close_index = match s[open_index + str_start.len()..].find(str_end) {
            Some(i) => open_index + str_start.len() + i,
            None => break,
        };

        result.push_str(&s[start..open_index]);
        let content = &s[open_index + str_start.len()..close_index];
        result.push_str(&process(content));
        start = close_index + str_end.len();
    }

    result.push_str(&s[start..]);
    result
}

/// 规范化源文件路径为调试用格式：去除 Windows \\\\?\\ 前缀，统一为正斜杠
pub fn normalize_source_path(path: &str) -> String {
    if cfg!(windows) {
        path.strip_prefix("\\\\?\\").unwrap_or(path).replace('\\', "/")
    } else {
        path.to_string()
    }
}

/// 处理输出文本中的换行转义（逐字符状态机）：
/// - `\\` → 字面量 `\`（转义的反斜杠）
/// - `\r` → 换行 `\n`（NR 转义序列）
/// - `\\r` → 字面量 `\r`（`\\` 转义为 `\`，后跟普通 `r`）
/// - 实际的回车符 `\r`（0x0D）→ 换行 `\n`
/// - 未知转义 `\x` → 原样保留 `\x`
///
/// 示例：
/// - `a\rb`     → `a\nb`
/// - `a\\rb`    → `a\rb`
/// - `a\\\rb`   → `a\\nb`（`\\` → `\`，`\r` → `\n`）
/// - `a\\\\rb`  → `a\\rb`
pub fn unescape_newline(s: &str) -> String {
    let mut result = String::with_capacity(s.len());
    let mut chars = s.chars();
    while let Some(c) = chars.next() {
        if c == '\\' {
            match chars.next() {
                Some('\\') => result.push('\\'),       // \\ → \
                Some('r') => result.push('\n'),        // \r → 换行
                Some(ch) => {                          // \x（未知）→ 原样 \x
                    result.push('\\');
                    result.push(ch);
                }
                None => result.push('\\'),             // 末尾 \ → 原样
            }
        } else {
            result.push(c);
        }
    }
    result
}
