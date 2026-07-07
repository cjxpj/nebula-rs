/// 数学表达式解释器（基于 ast::Value）
use crate::ast::Value;

/* ===================== Token ===================== */

#[derive(Debug, Clone, PartialEq)]
enum TokenType { Int, Float, Plus, Minus, Mul, Div, Mod, Pow, Shl, Shr, LParen, RParen, Eof }

#[derive(Debug, Clone)]
struct Token { ttype: TokenType, value: Option<Value> }

/* ===================== Lexer ===================== */

struct Lexer {
    text: Vec<char>,
    pos: usize,
    current_char: Option<char>,
}

impl Lexer {
    fn new(text: &str) -> Self {
        let chars: Vec<char> = text.trim().chars().collect();
        let current_char = chars.first().copied();
        Lexer { text: chars, pos: 0, current_char }
    }

    fn advance(&mut self) {
        self.pos += 1;
        self.current_char = if self.pos < self.text.len() { Some(self.text[self.pos]) } else { None };
    }

    fn read_int(&mut self) -> Token {
        let mut s = String::new();
        while let Some(c) = self.current_char {
            if c.is_ascii_digit() { s.push(c); self.advance(); } else { break; }
        }
        let v = s.parse::<i64>().unwrap_or(0);
        Token { ttype: TokenType::Int, value: Some(Value::Int(v)) }
    }

    fn read_float(&mut self) -> Token {
        let mut s = String::new();
        while let Some(c) = self.current_char {
            if c.is_ascii_digit() || c == '.' { s.push(c); self.advance(); } else { break; }
        }
        let v = s.parse::<f64>().unwrap_or(0.0);
        Token { ttype: TokenType::Float, value: Some(Value::Float(v)) }
    }

    fn next_token(&mut self) -> Result<Token, String> {
        loop {
            match self.current_char {
                None => return Ok(Token { ttype: TokenType::Eof, value: None }),
                Some(' ') => { self.advance(); continue; }
                Some(c) if c.is_ascii_digit() => {
                    let start = self.pos;
                    while self.pos < self.text.len() && self.text[self.pos].is_ascii_digit() { self.pos += 1; }
                    if self.pos < self.text.len() && self.text[self.pos] == '.' {
                        self.pos = start;
                        self.current_char = Some(self.text[self.pos]);
                        return Ok(self.read_float());
                    }
                    self.pos = start;
                    self.current_char = Some(self.text[self.pos]);
                    return Ok(self.read_int());
                }
                Some('+') => { self.advance(); return Ok(Token { ttype: TokenType::Plus, value: None }); }
                Some('-') => { self.advance(); return Ok(Token { ttype: TokenType::Minus, value: None }); }
                Some('*') => { self.advance(); return Ok(Token { ttype: TokenType::Mul, value: None }); }
                Some('/') => { self.advance(); return Ok(Token { ttype: TokenType::Div, value: None }); }
                Some('%') => { self.advance(); return Ok(Token { ttype: TokenType::Mod, value: None }); }
                Some('^') => { self.advance(); return Ok(Token { ttype: TokenType::Pow, value: None }); }
                Some('<') => {
                    self.advance();
                    if self.current_char == Some('<') { self.advance(); return Ok(Token { ttype: TokenType::Shl, value: None }); }
                    return Err("非法 <".to_string());
                }
                Some('>') => {
                    self.advance();
                    if self.current_char == Some('>') { self.advance(); return Ok(Token { ttype: TokenType::Shr, value: None }); }
                    return Err("非法 >".to_string());
                }
                Some('(') => { self.advance(); return Ok(Token { ttype: TokenType::LParen, value: None }); }
                Some(')') => { self.advance(); return Ok(Token { ttype: TokenType::RParen, value: None }); }
                _ => return Err("非法字符".to_string()),
            }
        }
    }
}

/* ===================== Interpreter ===================== */

struct Interpreter {
    lexer: Lexer,
    current_token: Token,
    err: Option<String>,
}

impl Interpreter {
    fn new(mut lexer: Lexer) -> Self {
        let token = lexer.next_token().unwrap_or(Token { ttype: TokenType::Eof, value: None });
        Interpreter { lexer, current_token: token, err: None }
    }

    fn next(&mut self) {
        if self.err.is_some() { self.current_token = Token { ttype: TokenType::Eof, value: None }; return; }
        match self.lexer.next_token() {
            Ok(t) => self.current_token = t,
            Err(e) => { self.err = Some(e); self.current_token = Token { ttype: TokenType::Eof, value: None }; }
        }
    }

    fn eat(&mut self, expected: TokenType) {
        if self.err.is_some() { return; }
        if self.current_token.ttype != expected {
            self.err = Some("语法错误".to_string());
            self.current_token = Token { ttype: TokenType::Eof, value: None };
            return;
        }
        self.next();
    }

    fn factor(&mut self) -> Option<Value> {
        if self.err.is_some() { return None; }
        if self.current_token.ttype == TokenType::Minus {
            self.eat(TokenType::Minus);
            return self.factor().map(|n| match n {
                Value::Int(i) => Value::Int(-i),
                Value::Float(f) => Value::Float(-f),
                other => Value::Float(-other.as_f64()),
            });
        }
        match self.current_token.ttype {
            TokenType::Int | TokenType::Float => {
                let v = self.current_token.value.clone();
                self.eat(self.current_token.ttype.clone());
                v
            }
            TokenType::LParen => {
                self.eat(TokenType::LParen);
                let r = self.expr();
                self.eat(TokenType::RParen);
                r
            }
            _ => { self.err = Some("Factor 错误".to_string()); None }
        }
    }

    fn power(&mut self) -> Option<Value> {
        let left = self.factor()?;
        if self.err.is_some() { return None; }
        if self.current_token.ttype == TokenType::Pow {
            self.eat(TokenType::Pow);
            let right = self.power()?;
            let l = left.as_i64();
            let r = right.as_i64();
            if r < 0 { self.err = Some("幂指数不能为负数".to_string()); return None; }
            return Some(Value::Int(l.pow(r as u32)));
        }
        Some(left)
    }

    fn term(&mut self) -> Option<Value> {
        let mut result = self.power()?;
        if self.err.is_some() { return None; }
        loop {
            match self.current_token.ttype {
                TokenType::Mul => {
                    self.eat(TokenType::Mul);
                    let rhs = self.power()?;
                    result = bin_op(&result, &rhs, b'*');
                }
                TokenType::Div => {
                    self.eat(TokenType::Div);
                    let rhs = self.power()?;
                    result = bin_op(&result, &rhs, b'/');
                }
                TokenType::Mod => {
                    self.eat(TokenType::Mod);
                    let rhs = self.power()?;
                    result = bin_op(&result, &rhs, b'%');
                }
                _ => break,
            }
            if self.err.is_some() { return None; }
        }
        Some(result)
    }

    fn expr(&mut self) -> Option<Value> {
        let mut result = self.term()?;
        if self.err.is_some() { return None; }
        loop {
            match self.current_token.ttype {
                TokenType::Plus => {
                    self.eat(TokenType::Plus);
                    let rhs = self.term()?;
                    result = bin_op(&result, &rhs, b'+');
                }
                TokenType::Minus => {
                    self.eat(TokenType::Minus);
                    let rhs = self.term()?;
                    result = bin_op(&result, &rhs, b'-');
                }
                _ => break,
            }
            if self.err.is_some() { return None; }
        }
        Some(result)
    }

    fn shift(&mut self) -> Option<Value> {
        let mut result = self.expr()?;
        if self.err.is_some() { return None; }
        loop {
            match self.current_token.ttype {
                TokenType::Shl => {
                    self.eat(TokenType::Shl);
                    let rhs = self.expr()?;
                    let l = result.as_i64();
                    let r = rhs.as_i64();
                    if r < 0 { self.err = Some("位移位数不能为负".to_string()); return None; }
                    result = Value::Int(l << r);
                }
                TokenType::Shr => {
                    self.eat(TokenType::Shr);
                    let rhs = self.expr()?;
                    let l = result.as_i64();
                    let r = rhs.as_i64();
                    if r < 0 { self.err = Some("位移位数不能为负".to_string()); return None; }
                    result = Value::Int(l >> r);
                }
                _ => break,
            }
            if self.err.is_some() { return None; }
        }
        Some(result)
    }
}

/* ===================== 二元运算 ===================== */

fn bin_op(left: &Value, right: &Value, op: u8) -> Value {
    let a = left.as_f64();
    let b = right.as_f64();
    let result = match op {
        b'+' => a + b,
        b'-' => a - b,
        b'*' => a * b,
        b'/' => { if b == 0.0 { return Value::Int(0) } a / b }
        b'%' => { if b == 0.0 { return Value::Int(0) } a % b }
        _ => a,
    };
    // 仅当两个操作数都是 Int 时，结果才转为 Int；否则保留 Float（防止 0.0 丢小数点）
    let is_int = matches!(left, Value::Int(_)) && matches!(right, Value::Int(_));
    if is_int && result == result.trunc() && result.abs() < (i64::MAX as f64) {
        Value::Int(result as i64)
    } else {
        Value::Float(result)
    }
}

/// 对两个表达式值做二元运算（用 value 兼容）
pub fn compute_bin_op(left: &Value, right: &Value, op: u8) -> Value {
    bin_op(left, right, op)
}

/* ===================== 求值入口 ===================== */

/// 计算数学表达式字符串 → Value
pub fn count(text: &str) -> Result<Value, String> {
    if let Some(result) = try_simple_binary(text) {
        return result;
    }
    let mut i = Interpreter::new(Lexer::new(text));
    let res = i.shift();
    if let Some(e) = i.err { return Err(e); }
    res.ok_or_else(|| "计算失败".to_string())
}

/// 简单二元表达式快速计算
fn try_simple_binary(text: &str) -> Option<Result<Value, String>> {
    let text = text.trim();
    if text.is_empty() { return None; }
    let bytes = text.as_bytes();

    let mut op_at: Option<(usize, u8)> = None;
    for (i, &b) in bytes.iter().enumerate() {
        if i == 0 { continue; }
        match b {
            b'+' | b'*' | b'/' | b'^' => { op_at = Some((i, b)); break; }
            b'-' => {
                let prev = bytes[i-1];
                if prev.is_ascii_digit() || prev == b' ' || prev == b'.' { op_at = Some((i, b)); break; }
            }
            b'%'
                if bytes[i-1].is_ascii_digit() => { op_at = Some((i, b)); break; }
            _ => {}
        }
    }

    let (pos, op_byte) = op_at?;
    let left_str = std::str::from_utf8(&bytes[..pos]).ok()?.trim();
    let right_str = std::str::from_utf8(&bytes[pos+1..]).ok()?.trim();
    if left_str.is_empty() || right_str.is_empty() { return None; }

    let left: f64 = left_str.parse().ok()?;
    let right: f64 = right_str.parse().ok()?;

    let result = match op_byte {
        b'+' => left + right,
        b'-' => left - right,
        b'*' => left * right,
        b'/' => { if right == 0.0 { return Some(Err("除数不能为0".to_string())); } left / right }
        b'^' => left.powf(right),
        b'%' => left % right,
        _ => return None,
    };

    // 仅当无小数点且结果为整数时，才转为 Int；否则保留 Float 类型
    let has_float = left_str.contains('.') || right_str.contains('.');
    if !has_float && result == result.trunc() && result > i64::MIN as f64 && result < i64::MAX as f64 {
        Some(Ok(Value::Int(result as i64)))
    } else {
        Some(Ok(Value::Float(result)))
    }
}

/// 在文本中查找 `[...]` 并求值替换
pub fn run_count_text(v: &crate::value::DicVal, content: &str) -> String {
    if content.is_empty() { return String::new(); }
    if !content.contains('[') { return content.to_string(); }

    let mut result = String::new();
    let chars: Vec<char> = content.chars().collect();
    let mut i = 0;

    while i < chars.len() {
        if chars[i] == '[' {
            i += 1;
            let mut inner = String::new();
            let mut depth = 1;
            while i < chars.len() && depth > 0 {
                match chars[i] {
                    '[' => depth += 1,
                    ']' => depth -= 1,
                    _ => {}
                }
                if depth > 0 { inner.push(chars[i]); }
                i += 1;
            }
            let raw = v.text_immut(&inner);
            match count(&raw) {
                Ok(n) => { result.push_str(&n.display()); }
                Err(_) => { result.push('['); result.push_str(&inner); result.push(']'); }
            }
        } else {
            result.push(chars[i]);
            i += 1;
        }
    }
    result
}
