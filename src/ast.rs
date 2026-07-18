use std::collections::HashMap;
use crate::iftext::Token;

/* ===================== 值类型 ===================== */

/// 统一值类型 —— 替代 HashMap<String, String>
#[derive(Debug, Clone, PartialEq)]
#[allow(dead_code)]
pub enum Value {
    Int(i64),
    Float(f64),
    Str(String),
    Bool(bool),
    Null,
    /// 对象引用（类名），display() 输出类名，但类型上 ≠ Str
    Obj(String),
    /// 函数指针（函数名），display() 输出函数名，类型上 ≠ Str
    FuncPtr(String),
}

#[allow(dead_code)]
impl Value {
    /// 转为 f64
    pub fn as_f64(&self) -> f64 {
        match self {
            Value::Int(i) => *i as f64,
            Value::Float(f) => *f,
            Value::Str(s) => s.parse().unwrap_or(0.0),
            Value::Bool(b) => if *b { 1.0 } else { 0.0 },
            Value::Null => 0.0,
            Value::Obj(_) => 0.0,
            Value::FuncPtr(_) => 0.0,
        }
    }

    /// 转为 i64
    pub fn as_i64(&self) -> i64 {
        match self {
            Value::Int(i) => *i,
            Value::Float(f) => *f as i64,
            Value::Str(s) => s.parse().unwrap_or(0),
            Value::Bool(b) => if *b { 1 } else { 0 },
            Value::Null => 0,
            Value::Obj(_) => 0,
            Value::FuncPtr(_) => 0,
        }
    }

    /// 布尔真值判断
    pub fn is_truthy(&self) -> bool {
        match self {
            Value::Str(s) => !s.is_empty() && s != "0" && s != "false",
            Value::Int(i) => *i != 0,
            Value::Float(f) => *f != 0.0,
            Value::Bool(b) => *b,
            Value::Null => false,
            Value::Obj(_) => true,
            Value::FuncPtr(_) => true,
        }
    }

    /// 显示字符串
    pub fn display(&self) -> String {
        match self {
            Value::Str(s) => s.clone(),
            Value::Int(i) => i.to_string(),
            Value::Null => String::new(),
            Value::Bool(b) => (if *b { "1" } else { "0" }).to_string(),
            Value::Float(f) => {
                let s = format!("{:.10}", f);
                let s = s.trim_end_matches('0');
                if s.ends_with('.') {
                    // 保留小数点，补 0（如 "0." → "0.0"）
                    format!("{}0", s)
                } else {
                    s.to_string()
                }
            }
            Value::Obj(s) => s.clone(),
            Value::FuncPtr(s) => s.clone(),
        }
    }

    /// 返回类型名称字符串
    pub fn type_name(&self) -> &'static str {
        match self {
            Value::Int(_) => "整数",
            Value::Float(_) => "浮点",
            Value::Str(_) => "字符串",
            Value::Bool(_) => "布尔",
            Value::Null => "空",
            Value::Obj(_) => "对象",
            Value::FuncPtr(_) => "函数",
        }
    }
}

/* ===================== 赋值操作符 ===================== */

#[derive(Debug, Clone, PartialEq)]
pub enum AssignOp {
    Set,      // :
    Add,      // +:
    Sub,      // -:
    Mul,      // *:
    Div,      // /:
    Mod,      // %:
    Plain,    // ::
    FnSet,    // $: 执行函数后赋值
}

impl AssignOp {
    pub fn from_vtype(v_type: i8) -> Option<AssignOp> {
        match v_type {
            6 => Some(AssignOp::Set),
            2 => Some(AssignOp::Add),
            1 => Some(AssignOp::Sub),
            7 => Some(AssignOp::Mul),
            8 => Some(AssignOp::Div),
            9 => Some(AssignOp::Mod),
            5 => Some(AssignOp::Plain),
            3 => Some(AssignOp::FnSet),
            _ => None,
        }
    }
}

/* ===================== 表达式 ===================== */

#[derive(Debug, Clone)]
pub enum Expr {
    /// 字面量
    Lit(Value),
    /// 变量引用 %name%
    Var(String),
    /// 二元运算 [expr op expr]
    BinOp(Box<Expr>, u8, Box<Expr>),
    /// 一元负号
    Neg(Box<Expr>),
    /// 函数调用 $func args$
    Call { name: String, args: Vec<Expr> },
}

/* ===================== 语句 ===================== */

#[derive(Debug, Clone)]
pub enum Stmt {
    /// 纯输出行（含 %var% 和 [expr] 的文本）
    Output(String),
    /// 赋值 var op expr
    Assign { target: String, op: AssignOp, expr: Expr, no_newline: bool },
    /// for 循环 (count=循环次数, condition=条件表达式, cached_tokens=预编译Token)
    Loop { var: String, count: Option<Expr>, condition: Option<Expr>, cached_tokens: Option<Vec<Token>>, body: Vec<Stmt> },
    /// 如果 / 否则 (cached_tokens: 预编译条件 Token，避免每轮词法分析)
    If { conds: Vec<Expr>, cached_tokens: Option<Vec<Vec<Token>>>, branches: Vec<Vec<Stmt>>, else_branch: Option<Vec<Stmt>> },
    /// 遍历
    ForEach { var: String, array: Expr, body: Vec<Stmt> },
    /// 函数调用语句: $函数名$ 或 $函数名 参数$
    FuncCall { name: String, args: Vec<String>, no_newline: bool },
    /// Go 风格标签: :labelName
    Label(String),
    /// Go 风格 goto: goto labelName
    Goto(String),
    /// 跳过当前迭代 (continue)
    Skip,
    /// 终止循环 (break)
    BreakLoop,
    /// 终止遍历 (break foreach)
    BreakForEach,
    /// 终止
    Stop,
    /// 文本块 ''' ... '''
    TextBlock { var: String, content: String },
    /// 异步输出 #: 直接打印到终端，不被表达式求值捕获
    AsyncOutput(String),
}

/* ===================== 程序结构 ===================== */

#[derive(Debug, Clone)]
#[allow(dead_code)]
pub struct Program {
    pub init: Vec<Stmt>,
    pub triggers: Vec<Trigger>,
    pub funcs: HashMap<String, Vec<Stmt>>,
    pub static_blocks: HashMap<String, Vec<Stmt>>,
    pub classes: HashMap<String, ClassDef>,
}

#[derive(Debug, Clone)]
#[allow(dead_code)]
pub struct Trigger {
    pub pattern: String,
    pub body: Vec<Stmt>,
}

#[derive(Debug, Clone)]
#[allow(dead_code)]
pub struct ClassDef {
    pub vars: HashMap<String, Value>,
    pub static_blocks: Vec<(String, Vec<Stmt>)>,
    pub methods: Vec<(String, Vec<Stmt>)>,
}
