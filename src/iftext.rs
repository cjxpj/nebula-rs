use regex::Regex;
use crate::value::DicVal;
use crate::count;
use crate::ast::Value;

/// 条件求值上下文：用于 IfText 内部处理 $...$ 语法和变量求值
pub trait CondEval {
    fn val(&self) -> &DicVal;
    fn val_mut(&mut self) -> &mut DicVal;
    fn process_internal(&mut self, text: &str) -> String;
}

/// 条件表达式求值器
/// 支持操作符: == != >= <= > < ~= in
/// 逻辑：&&（与）||（或）& | ( ) 括号
pub struct IfText;

impl IfText {
    /// 对表达式求值，返回 bool（支持短路求值）
    /// $...$ 在操作数内按需求值，|| 左侧为 true / && 左侧为 false 时短路
    pub fn pd(ctx: &mut impl CondEval, input: &str) -> bool {
        let tokens = Self::run(input);
        Self::evaluate_bool(ctx, &tokens)
    }

    /// 使用预编译的 Token 进行条件求值（跳过词法分析）
    pub fn eval_cached(ctx: &mut impl CondEval, tokens: &[Token]) -> bool {
        Self::evaluate_bool(ctx, tokens)
    }

    /// 预编译条件表达式为 Token 流（可缓存复用）
    pub fn parse_tokens(input: &str) -> Vec<Token> {
        Self::run(input)
    }

    /// 词法分析：将输入字符串解析为 Token 流
    /// Token 格式: {"a": 操作数, "b": 操作符, "c": 操作数, "jump": 跳转符}
    fn run(input: &str) -> Vec<Token> {
        let input: Vec<char> = input.chars().collect();
        let len = input.len();
        let mut tokens = Vec::new();
        let mut i = 0;

        while i < len {
            match input[i] {
                '(' | ')' => {
                    tokens.push(RawToken { ttype: "jump".to_string(), value: input[i].to_string() });
                    i += 1;
                }
                '&' => {
                    if i + 1 < len && input[i + 1] == '&' {
                        tokens.push(RawToken { ttype: "jump".to_string(), value: "&&".to_string() });
                        i += 2;
                    } else {
                        tokens.push(RawToken { ttype: "jump".to_string(), value: "&".to_string() });
                        i += 1;
                    }
                }
                '|' => {
                    if i + 1 < len && input[i + 1] == '|' {
                        tokens.push(RawToken { ttype: "jump".to_string(), value: "||".to_string() });
                        i += 2;
                    } else {
                        tokens.push(RawToken { ttype: "jump".to_string(), value: "|".to_string() });
                        i += 1;
                    }
                }
                '=' | '!' | '>' | '<' | '~' => {
                    // 三字符操作符: === !== (严格相等/严格不等)
                    if i + 2 < len && input[i + 1] == '=' && input[i + 2] == '='
                        && (input[i] == '=' || input[i] == '!')
                    {
                        tokens.push(RawToken { ttype: "b".to_string(), value: format!("{}==", input[i]) });
                        i += 3;
                    } else if i + 1 < len && input[i + 1] == '=' {
                        tokens.push(RawToken { ttype: "b".to_string(), value: format!("{}=", input[i]) });
                        i += 2;
                    } else {
                        tokens.push(RawToken { ttype: "b".to_string(), value: input[i].to_string() });
                        i += 1;
                    }
                }
                ' ' if i + 3 < len && input[i + 1] == 'i' && input[i + 2] == 'n' && input[i + 3] == ' ' => {
                    tokens.push(RawToken { ttype: "b".to_string(), value: " in ".to_string() });
                    i += 4;
                }
                _ => {
                    let start = i;
                    while i < len
                        && input[i] != '(' && input[i] != ')' && input[i] != '&' && input[i] != '|'
                        && input[i] != '=' && input[i] != '!' && input[i] != '>' && input[i] != '<'
                        && input[i] != '~'
                        && !(input[i] == ' ' && i + 3 < len
                            && input[i + 1] == 'i' && input[i + 2] == 'n' && input[i + 3] == ' ')
                    {
                        i += 1;
                    }
                    tokens.push(RawToken { ttype: "a".to_string(), value: input[start..i].iter().collect() });
                }
            }
        }

        // 组装已解析的 Token
        let mut parsed = Vec::new();
        let mut i = 0;
        let tokens_len = tokens.len();
        let mut die_num = 0;

        while i < tokens_len {
            die_num += 1;
            if die_num > 5000 {
                return vec![Token {
                    a: String::new(),
                    b: "!=".to_string(),
                    c: String::new(),
                    text: String::new(),
                    jump: String::new(),
                }];
            }

            let mut current = Token::default();

            match tokens[i].ttype.as_str() {
                "a" => {
                    current.a = tokens[i].value.clone();
                    i += 1;
                    if i < tokens_len && tokens[i].ttype == "b" {
                        current.b = tokens[i].value.clone();
                        i += 1;
                        if i < tokens_len && tokens[i].ttype == "a" {
                            current.c = tokens[i].value.clone();
                            i += 1;
                            if i < tokens_len && tokens[i].ttype == "jump" {
                                current.jump = tokens[i].value.clone();
                                i += 1;
                            }
                        } else {
                            current.c = String::new();
                        }
                    }
                }
                "jump" => {
                    current.text = tokens[i].value.clone();
                    i += 1;
                }
                _ => {}
            }
            parsed.push(current);
        }

        parsed
    }

    /// 解析条件表达式中 token 的严格类型 Value（保留原始类型）
    /// - %var% → 从变量存储获取原始 Value（Int/Float/Str/Bool/Null）
    /// - 数字字面量 → Int/Float
    /// - true/false/null → Bool/Null
    /// - 其他 → Str
    fn resolve_strict_value(ctx: &impl CondEval, token: &str) -> Value {
        let token = token.trim();
        // %var% 模式 → 查变量原始类型
        if token.starts_with('%') && token.ends_with('%') && token.len() > 2 {
            let var_name = &token[1..token.len() - 1];
            // 内嵌 $...$ 的函数调用 → 先执行再返回结果字符串
            if var_name.contains('$') {
                let processed = ctx.val().p.text(token);
                // 尝试解析结果为数字
                if let Ok(i) = processed.parse::<i64>() {
                    return Value::Int(i);
                }
                if let Ok(f) = processed.parse::<f64>() {
                    return Value::Float(f);
                }
                return Value::Str(processed);
            }
            // 查变量存储
            if let Some(v) = ctx.val().p.get(var_name) {
                return v.clone();
            }
            // 未找到 → 空字符串
            return Value::Str(String::new());
        }
        // 数字字面量（整数优先，因为 i64 解析不包含 .）
        if let Ok(i) = token.parse::<i64>() {
            return Value::Int(i);
        }
        if let Ok(f) = token.parse::<f64>() {
            return Value::Float(f);
        }
        // 布尔和 null
        match token {
            "true" => return Value::Bool(true),
            "false" => return Value::Bool(false),
            "null" => return Value::Null,
            _ => {}
        }
        // 默认字符串
        Value::Str(token.to_string())
    }

    /// 短路求值：直接在 token 流上进行布尔求值
    fn evaluate_bool(ctx: &mut impl CondEval, parsed: &[Token]) -> bool {
        let mut operands: Vec<bool> = Vec::new();
        let mut operators: Vec<char> = Vec::new();
        let mut skip_mode = false;

        for p in parsed {
            // 文本 token：( ) && || & |
            if !p.text.is_empty() {
                match p.text.as_str() {
                    "(" => {
                        operators.push('(');
                    }
                    ")" => {
                        // 解析直到 (
                        while let Some(&op) = operators.last() {
                            if op == '(' {
                                operators.pop();
                                break;
                            }
                            if operands.len() >= 2 {
                                let right = operands.pop().unwrap();
                                let left = operands.pop().unwrap();
                                operators.pop();
                                operands.push(if op == '&' { left && right } else { left || right });
                            } else {
                                // 短路导致的孤儿操作符，丢弃
                                operators.pop();
                                break;
                            }
                        }
                        skip_mode = false;
                    }
                    "&&" | "&" => {
                        if !skip_mode
                            && operands.last() == Some(&false) {
                            skip_mode = true;
                        }
                        operators.push('&');
                    }
                    "||" | "|" => {
                        if !skip_mode
                            && operands.last() == Some(&true) {
                            skip_mode = true;
                        }
                        operators.push('|');
                    }
                    _ => {}
                }
                continue;
            }

            if skip_mode {
                continue;
            }

            // 对操作数 a 执行 $...$ 处理 + 变量替换 + 数学计算
            let a_processed = ctx.process_internal(&p.a);
            let a_raw = ctx.val_mut().text(&a_processed);
            let a = count::run_count_text(ctx.val(), &a_raw);

            let val = if p.b.is_empty() {
                // 单操作数：真值判断
                !matches!(a.as_str(), "" | "0" | "false" | "null")
            } else {
                // 对操作数 c 执行同样处理
                let c_processed = ctx.process_internal(&p.c);
                let c_raw = ctx.val_mut().text(&c_processed);
                let c = count::run_count_text(ctx.val(), &c_raw);

                match p.b.as_str() {
                    " in " => Self::cmp_in(&a, &c),
                    "~=" => Self::cmp_regex_match(&a, &c),
                    "===" => {
                        let va = Self::resolve_strict_value(ctx, &p.a);
                        let vc = Self::resolve_strict_value(ctx, &p.c);
                        va == vc
                    }
                    "!==" => {
                        let va = Self::resolve_strict_value(ctx, &p.a);
                        let vc = Self::resolve_strict_value(ctx, &p.c);
                        va != vc
                    }
                    "==" => a == c,
                    "!=" => a != c,
                    ">=" => Self::cmp_numeric(&a, &c, ">="),
                    "<=" => Self::cmp_numeric(&a, &c, "<="),
                    "~" => !Self::cmp_regex_match(&a, &c),
                    "!" => a.len() == c.len(),
                    "<" => Self::cmp_numeric(&a, &c, "<"),
                    ">" => Self::cmp_numeric(&a, &c, ">"),
                    _ => false,
                }
            };

            operands.push(val);

            // 处理附加的 jump 操作符（短路逻辑）
            if !p.jump.is_empty() {
                let op_char = match p.jump.as_str() {
                    "&&" | "&" => '&',
                    "||" | "|" => '|',
                    _ => continue,
                };

                if (op_char == '|' && val) || (op_char == '&' && !val) {
                    skip_mode = true;
                }
                operators.push(op_char);
            }
        }

        // 解析剩余操作符
        while operands.len() >= 2 && !operators.is_empty() {
            let op = operators.pop().unwrap();
            if op == '(' || op == ')' {
                continue;
            }
            let right = operands.pop().unwrap();
            let left = operands.pop().unwrap();
            operands.push(if op == '&' { left && right } else { left || right });
        }

        operands.first().copied().unwrap_or(false)
    }

    fn cmp_in(a: &str, c: &str) -> bool {
        // 尝试解析 a 或 c 为 JSON 数组
        if let Ok(arr) = serde_json::from_str::<Vec<serde_json::Value>>(a) {
            for v in &arr {
                if value_equals(v, c) {
                    return true;
                }
            }
        } else if let Ok(arr) = serde_json::from_str::<Vec<serde_json::Value>>(c) {
            for v in &arr {
                if value_equals(v, a) {
                    return true;
                }
            }
        }
        false
    }

    fn cmp_regex_match(a: &str, c: &str) -> bool {
        let pattern = format!("^{}$", a);
        Regex::new(&pattern).map(|re| re.is_match(c)).unwrap_or(false)
    }

    fn cmp_numeric(a: &str, c: &str, op_type: &str) -> bool {
        if let (Ok(av), Ok(cv)) = (a.parse::<f64>(), c.parse::<f64>()) {
            match op_type {
                ">=" => av >= cv,
                "<=" => av <= cv,
                "<" => av < cv,
                ">" => av > cv,
                _ => false,
            }
        } else {
            // 字符串字典序比较
            match op_type {
                ">=" => a >= c,
                "<=" => a <= c,
                "<" => a < c,
                ">" => a > c,
                _ => false,
            }
        }
    }
}

fn value_equals(val: &serde_json::Value, target: &str) -> bool {
    match val {
        serde_json::Value::String(s) => s == target,
        serde_json::Value::Number(n) => n.to_string() == target,
        serde_json::Value::Bool(b) => (if *b { "true" } else { "false" }) == target,
        serde_json::Value::Null => target == "null",
        _ => val == target,
    }
}

/* ===================== Token 结构 ===================== */

#[derive(Debug, Clone, Default)]
pub struct Token {
    pub a: String,
    pub b: String,
    pub c: String,
    pub text: String,
    pub jump: String,
}

#[derive(Debug, Clone)]
struct RawToken {
    ttype: String,
    value: String,
}
