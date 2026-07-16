//! Nebula 脚本的 AST 解析器与树遍历执行器。
//!
//! 脚本语法：
//!   Output:     任何无赋值操作符的行
//!   Assign:     key:value, key+:value, key-:value, key*:value, key/:value, key%:value

//   Loop:       循环>var=N ... <循环   或   循环>var ... <循环 (无限)
//   If/Else:    如果:cond ... 如果尾
//   ForEach:    遍历>var,array ... <遍历
//   FuncCall:   $func args$
//   Label:      :labelName
//   Goto:       goto labelName
//   Skip:       >跳过
//   BreakLoop:  >跳出 / >终止循环
//   BreakForEach: >终止遍历
//   Stop:       >终止
//   TextBlock:  ''' ... '''
//   AsyncOutput: #: 直接打印

use crate::analyzer::val_text_test;
use crate::ast::*;
use crate::count;
use crate::iftext::IfText;
use crate::interpreter::entry;

/// 解析函数参数定义字符串，检测 ... 可变参数标记
use crate::functions::parse_param_defs;
use crate::functions::fuzzy_search_pkg_method;
use crate::interpreter::DicContext;

use std::sync::mpsc::{Receiver, Sender};
use std::sync::{Arc, Mutex};
use crate::dap::{self, DebugCommand, DebugEvent, SharedDebugState, StackFrame};
use crate::interpreter::Nebula;

/* ===================== 执行结果 ===================== */

/// 语句块执行结果
#[derive(Debug, Clone, PartialEq)]
pub enum ExecResult {
    /// 正常继续
    Continue,
    /// 遇到 >终止，停止执行
    Stop,
    /// 遇到 >跳过，跳过当前迭代
    Skip,
    /// goto 跳转到父作用域的标签（携带全局 stmts 索引）
    Goto(isize),
}

/* ===================== 调试上下文 ===================== */

/// 调试上下文：通过 Option<&DebugContext> 开关控制调试行为
pub struct DebugContext<'a> {
    pub shared: &'a Arc<Mutex<SharedDebugState>>,
    pub event_tx: &'a Sender<DebugEvent>,
    pub cmd_rx: &'a Receiver<DebugCommand>,
    pub depth: usize,
}

/* ===================== 解析器 ===================== */

/// 将脚本代码块解析为 AST 语句列表
pub fn parse_stmts(lines: &[String], _is_sub_package: bool, line_offset: usize, source_file: &str) -> Result<Vec<Stmt>, String> {
    let processed = preprocess(lines);
    let mut stmts = Vec::new();
    let mut i = 0;
    while i < processed.len() {
        let consumed = parse_one(&processed, i, &mut stmts, line_offset, source_file)?;
        i += consumed.max(1);
    }
    Ok(stmts)
}

/// 预处理：去除注释、合并续行
fn preprocess(lines: &[String]) -> Vec<String> {
    let mut out = Vec::new();
    let mut in_multiline = false;

    for line in lines {
        let trimmed = line.trim().to_string();

        // 多行注释 /* */
        if in_multiline {
            if let Some(end) = trimmed.find("*/") {
                in_multiline = false;
                // 处理 */ 之后的内容
                let rest = &trimmed[end + 2..];
                if !rest.is_empty() && !rest.starts_with("//") {
                    out.push(rest.to_string());
                }
            }
            continue;
        }

        if trimmed.starts_with("/*") {
            if let Some(end) = trimmed.find("*/") {
                let rest = &trimmed[end + 2..];
                if !rest.is_empty() && !rest.starts_with("//") {
                    out.push(rest.to_string());
                }
            } else {
                in_multiline = true;
            }
            continue;
        }

        // 单行注释 //
        if trimmed.starts_with("//") {
            continue;
        }

        out.push(trimmed);
    }
    out
}

/// 解析一行（或一个块），返回消费的行数
fn parse_one(lines: &[String], idx: usize, stmts: &mut Vec<Stmt>, line_offset: usize, source_file: &str) -> Result<usize, String> {
    let line = &lines[idx];

    // 空行跳过
    if line.is_empty() {
        return Ok(1);
    }

    // ===== 控制流指令 =====
    if line == ">终止" {
        stmts.push(Stmt::Stop);
        return Ok(1);
    }
    if let Some(msg) = line.strip_prefix(">终止 ") {
        if !msg.is_empty() {
            // 终止带消息：先输出消息，再停止
            stmts.push(Stmt::Output(msg.to_string()));
            stmts.push(Stmt::Stop);
            return Ok(1);
        }
    }

    // >跳过 — 循环体/遍历体中的 continue
    if line == ">跳过" {
        stmts.push(Stmt::Skip);
        return Ok(1);
    }

    // >跳出 — 终止循环/终止遍历
    if line == ">跳出" {
        stmts.push(Stmt::BreakLoop);
        return Ok(1);
    }

    // >终止循环 / >终止遍历
    if line == ">终止循环" {
        stmts.push(Stmt::BreakLoop);
        return Ok(1);
    }
    if line == ">终止遍历" {
        stmts.push(Stmt::BreakForEach);
        return Ok(1);
    }

    // ===== Go 风格标签 :labelName =====
    if line.starts_with(':') && line.len() > 1 {
        let label = line[1..].trim().to_string();
        if !label.is_empty() && label.chars().all(|c| c.is_alphanumeric() || c == '_') {
            stmts.push(Stmt::Label(label));
            return Ok(1);
        }
    }

    // ===== Go 风格 goto labelName =====
    if let Some(label) = line.strip_prefix("goto ") {
        let label = label.trim().to_string();
        if !label.is_empty() {
            stmts.push(Stmt::Goto(label));
            return Ok(1);
        }
    }

    // ===== #: 异步输出（直接打印到终端，不返回） =====
    if let Some(content) = line.strip_prefix("#:") {
        stmts.push(Stmt::AsyncOutput(content.to_string()));
        return Ok(1);
    }

    // ===== 旧式 if:/如果: 条件 =====
    let old_if_consumed = parse_old_if(lines, idx, stmts, line_offset, source_file)?;
    if old_if_consumed > 0 {
        return Ok(old_if_consumed);
    }

    // ===== 块开始 =====

    // 循环>var=N ... <循环
    if line.starts_with("循环>") {
        return parse_loop_block(lines, idx, stmts, line_offset, source_file);
    }

    // 遍历>var,array ... <遍历
    if line.starts_with("遍历>") {
        return parse_foreach_block(lines, idx, stmts, line_offset, source_file);
    }

    // ===== 纯文本框 ''' =====
    if line.starts_with("'''") {
        return parse_triple_quote_block(lines, idx, stmts, "'''");
    }
    // """ 文本块
    if line.starts_with("\"\"\"") {
        return parse_triple_quote_block(lines, idx, stmts, "\"\"\"");
    }

    // ===== 函数调用 $func args$ =====
    if let Some(stmt) = parse_func_call_line(line) {
        stmts.push(stmt);
        return Ok(1);
    }

    // ===== @变量[key]:value JSON 路径赋值 =====
    if line.starts_with('@') {
        if let Some(b_close) = line.rfind(']') {
            if b_close + 1 < line.len() && line.as_bytes()[b_close + 1] == b':' {
                let target = line[..=b_close].to_string();
                let is_force_str = b_close + 2 < line.len() && line.as_bytes()[b_close + 2] == b':';
                let suffix_start = if is_force_str { b_close + 3 } else { b_close + 2 };
                let suffix = line[suffix_start..].to_string();
                let (v_type_override, expr) = if is_force_str {
                    // ::value 强制字符串
                    (Some(5), Expr::Lit(Value::Str(suffix.clone())))
                } else {
                    (None, parse_assign_expr(&suffix))
                };
                let op = v_type_override
                    .and_then(|vt| AssignOp::from_vtype(vt))
                    .unwrap_or(AssignOp::Set);
                stmts.push(Stmt::Assign {
                    target,
                    op,
                    expr,
                });
                return Ok(1);
            }
        }
    }

    // ===== 赋值 / 输出 =====
    let (v_type, v_prefix, v_suffix) = val_text_test(line);
    match v_type {
        0 => {
            // 无操作符 = 纯输出
            stmts.push(Stmt::Output(line.clone()));
        }
        1 | 2 | 3 | 5 | 6 | 7 | 8 | 9 => {
            let op = AssignOp::from_vtype(v_type).unwrap_or(AssignOp::Set);
            if v_prefix.is_empty() && v_type == 6 {
                // v_type 6 但无前缀 → 当作输出处理
                stmts.push(Stmt::Output(line.clone()));
            } else if v_type == 6
                && (v_suffix == "\"\"\"" || v_suffix == "'''")
            {
                // 特殊赋值：文本块标记
                let marker = v_suffix.as_str();
                // 记录为特殊赋值，运行时启动对应的块收集器
                stmts.push(Stmt::Assign {
                    target: v_prefix.clone(),
                    op: AssignOp::Set,
                    expr: Expr::Lit(Value::Str(marker.to_string())),
                });
            } else if v_type == 6 && (v_suffix == "{" || v_suffix == "[") {
                // 行内 JSON 块: key:{ ... } 或 key:[ ... ]
                return parse_inline_json_block(lines, idx, stmts, &v_prefix, &v_suffix, line_offset, source_file);
            } else if v_type == 6 && v_prefix.contains('[') {
                // JSON 路径赋值: key[sub]...:value
                let expr = parse_assign_expr(&v_suffix);
                stmts.push(Stmt::Assign {
                    target: v_prefix.clone(),
                    op,
                    expr,
                });
            } else if v_type == 5 {
                // :: — 纯文本赋值：不解析表达式，将右侧原样存为字面量
                let expr = Expr::Lit(Value::Str(v_suffix.clone()));
                stmts.push(Stmt::Assign {
                    target: v_prefix.clone(),
                    op,
                    expr,
                });
            } else {
                let expr = parse_assign_expr(&v_suffix);
                stmts.push(Stmt::Assign {
                    target: v_prefix.clone(),
                    op,
                    expr,
                });
            }
        }
        _ => {
            // 不应到达
            stmts.push(Stmt::Output(line.clone()));
        }
    }

    Ok(1)
}

/* ===================== 块解析 ===================== */

/// 解析 循环>条件 ... <循环 块
fn parse_loop_block(lines: &[String], idx: usize, stmts: &mut Vec<Stmt>, line_offset: usize, source_file: &str) -> Result<usize, String> {
    let header = &lines[idx];
    let inner = &header[7..]; // 去掉 "循环>"

    let (var_name, condition_expr, cached_tokens) = if inner.is_empty() {
        (String::new(), None, None) // 无限循环
    } else {
        let tokens = IfText::parse_tokens(inner);
        ("_".to_string(), Some(parse_expr(inner).unwrap_or(Expr::Lit(Value::Str(inner.to_string())))), Some(tokens))
    };

    // 收集循环体直到 <循环
    let mut body_lines = Vec::new();
    let mut nested = 1;
    let mut i = idx + 1;

    while i < lines.len() {
        let line = &lines[i];
        if line.starts_with("循环>") {
            nested += 1;
        }
        if line == "<循环" {
            nested -= 1;
            if nested == 0 {
                let body = parse_stmts(&body_lines, false, line_offset, source_file)?;
                stmts.push(Stmt::Loop {
                    var: var_name,
                    count: None,
                    condition: condition_expr,
                    cached_tokens,
                    body,
                });
                return Ok(i - idx + 1);
            }
        }
        body_lines.push(line.clone());
        i += 1;
    }

    Err(format!("未闭合的循环块 (第 {} 行)", idx + 1))
}

/// 解析旧式 if:/如果:/elif: 条件 ... 如果尾/end 块
/// 返回消费的行数（0 表示不是旧式 if）
fn parse_old_if(lines: &[String], idx: usize, stmts: &mut Vec<Stmt>, line_offset: usize, source_file: &str) -> Result<usize, String> {
    let line = &lines[idx];

    let cond_str = if let Some(stripped) = line.strip_prefix("if:") {
        stripped.to_string()
    } else if let Some(stripped) = line.strip_prefix("如果:") {
        stripped.to_string()
    } else {
        return Ok(0);
    };

    let mut conds: Vec<String> = vec![cond_str];
    let mut branches: Vec<Vec<String>> = vec![Vec::new()];
    let mut else_lines: Vec<String> = Vec::new();
    let mut in_else = false;
    let mut branch_idx = 0;
    let mut i = idx + 1;
    let mut depth = 1; // 嵌套深度，遇到 如果: 递增，遇到 如果尾 递减

    while i < lines.len() {
        let line = &lines[i];

        // 嵌套的 如果:/if: → 深度+1，当作普通行收集
        if line.starts_with("如果:") || line.starts_with("if:") {
            depth += 1;
            if in_else {
                else_lines.push(line.clone());
            } else {
                while branches.len() <= branch_idx {
                    branches.push(Vec::new());
                }
                branches[branch_idx].push(line.clone());
            }
            i += 1;
            continue;
        }

        // 终止标记 → 深度-1，深度为0时退出
        if line == "如果尾" || line == "end" {
            depth -= 1;
            if depth == 0 {
                i += 1;
                break;
            }
            if in_else {
                else_lines.push(line.clone());
            } else {
                while branches.len() <= branch_idx {
                    branches.push(Vec::new());
                }
                branches[branch_idx].push(line.clone());
            }
            i += 1;
            continue;
        }

        // else/否则 切换（仅顶层）
        if depth == 1 && (line == "else" || line == "否则") {
            in_else = true;
            i += 1;
            continue;
        }

        // elif/否则如果: 新分支（仅顶层）
        if depth == 1 && line.starts_with("elif:") {
            let c = line[5..].to_string();
            conds.push(c);
            branch_idx += 1;
            branches.push(Vec::new());
            in_else = false;
            i += 1;
            continue;
        }
        if depth == 1 && line.starts_with("否则如果:") {
            let c = line[13..].to_string();
            conds.push(c);
            branch_idx += 1;
            branches.push(Vec::new());
            in_else = false;
            i += 1;
            continue;
        }

        // 返回 + 如果尾 → 提前结束（仅顶层）
        if depth == 1 && line == "返回" && i + 1 < lines.len() && (lines[i + 1] == "如果尾" || lines[i + 1] == "end") {
            i += 2;
            break;
        }

        if in_else {
            else_lines.push(line.clone());
        } else {
            while branches.len() <= branch_idx {
                branches.push(Vec::new());
            }
            branches[branch_idx].push(line.clone());
        }
        i += 1;
    }

    let parsed_conds: Vec<Expr> = conds
        .iter()
        .map(|c| Expr::Lit(Value::Str(c.clone())))
        .collect();

    // 预编译条件 Token，避免每轮词法分析
    let cached_tokens: Vec<Vec<crate::iftext::Token>> = conds
        .iter()
        .map(|c| IfText::parse_tokens(c))
        .collect();

    let parsed_branches: Result<Vec<Vec<Stmt>>, String> = branches
        .iter()
        .map(|b| parse_stmts(b, false, line_offset, source_file))
        .collect();
    let parsed_branches = parsed_branches?;

    let parsed_else = if else_lines.is_empty() {
        None
    } else {
        Some(parse_stmts(&else_lines, false, line_offset, source_file)?)
    };

    stmts.push(Stmt::If {
        conds: parsed_conds,
        cached_tokens: Some(cached_tokens),
        branches: parsed_branches,
        else_branch: parsed_else,
    });

    Ok(i - idx)
}

/// 解析 遍历>var,array ... <遍历 块
fn parse_foreach_block(lines: &[String], idx: usize, stmts: &mut Vec<Stmt>, line_offset: usize, source_file: &str) -> Result<usize, String> {
    let header = &lines[idx];
    let inner = &header[7..]; // 去掉 "遍历>"

    let (var_spec, array_str) = if let Some(eq_pos) = inner.find('=') {
        let var = inner[..eq_pos].to_string();
        let arr = inner[eq_pos + 1..].to_string();
        (var, arr)
    } else {
        (inner.to_string(), String::new())
    };

    let array_expr = parse_expr(&array_str).unwrap_or(Expr::Var(array_str));

    // 收集遍历体直到 <遍历
    let mut body_lines = Vec::new();
    let mut nested = 1;
    let mut i = idx + 1;

    while i < lines.len() {
        let line = &lines[i];
        if line.starts_with("遍历>") {
            nested += 1;
        }
        if line == "<遍历" {
            nested -= 1;
            if nested == 0 {
                let body = parse_stmts(&body_lines, false, line_offset, source_file)?;
                stmts.push(Stmt::ForEach {
                    var: var_spec,
                    array: array_expr,
                    body,
                });
                return Ok(i - idx + 1);
            }
        }
        body_lines.push(line.clone());
        i += 1;
    }

    Err(format!("未闭合的遍历块 (第 {} 行)", idx + 1))
}

/// 解析行内 JSON 块: key:{ ... } 或 key:[ ... ]
fn parse_inline_json_block(
    lines: &[String],
    idx: usize,
    stmts: &mut Vec<Stmt>,
    var_name: &str,
    marker: &str,
    line_offset: usize,
    source_file: &str,
) -> Result<usize, String> {
    let start_char = if marker == "{" { '{' } else { '[' };
    let end_char = if marker == "{" { '}' } else { ']' };
    let mut part = Vec::new();
    let mut depth: i32 = 1;
    let mut i = idx + 1;

    while i < lines.len() {
        let line = &lines[i];
        for ch in line.chars() {
            if ch == start_char {
                depth += 1;
            } else if ch == end_char {
                depth -= 1;
            }
        }
        if depth == 0 {
            let json_str = build_json_value(&part, marker, idx + 2, line_offset, source_file)?;
            stmts.push(Stmt::Assign {
                target: var_name.to_string(),
                op: AssignOp::Set,
                expr: Expr::Lit(Value::Str(json_str)),
            });
            return Ok(i - idx + 1);
        }
        part.push(line.as_str());
        i += 1;
    }

    Err(format!("未闭合的 JSON 块 (第 {} 行)", idx + 1))
}

/// 将 { } / [ ] 内部的行构建为标准 JSON 字符串
fn build_json_value(parts: &[&str], marker: &str, start_line: usize, line_offset: usize, source_file: &str) -> Result<String, String> {
    // 先拼接成完整字符串，尝试作为合法 JSON 解析
    let raw = if marker == "{" {
        format!("{{{}}}", parts.join(""))
    } else {
        format!("[{}]", parts.join(","))
    };
    if serde_json::from_str::<serde_json::Value>(&raw).is_ok() {
        return Ok(raw);
    }

    // 不是合法 JSON → 按脚本格式重新构建
    let qstr = |v: &str| -> String {
        let v = v.trim();
        if v.len() >= 2 && v.starts_with('"') && v.ends_with('"') {
            v.to_string()
        } else {
            format!("\"{}\"", v)
        }
    };

    // 自适应值：JSON 字面量原样，否则加引号
    let adapt_val = |v: &str| -> String {
        let v = v.trim();
        if v.len() >= 2 && v.starts_with('"') && v.ends_with('"') {
            return v.to_string();
        }
        if let Ok(jv) = serde_json::from_str::<serde_json::Value>(v) {
            if jv.is_number() || jv.is_boolean() || jv.is_null() || jv.is_object() || jv.is_array() {
                return v.to_string();
            }
        }
        format!("\"{}\"", v)
    };

    if marker == "{" {
        // { } 对象：每行必须是 key:value / key::value
        // 重复键自动合并为数组
        use std::collections::HashMap;
        let mut key_order: Vec<String> = Vec::new();
        let mut key_to_idx: HashMap<String, usize> = HashMap::new();
        let mut key_vals: Vec<(usize, Vec<String>)> = Vec::new(); // (insert_order, values)

        for (i, line) in parts.iter().enumerate() {
            let s = line.trim();
            if s.is_empty() {
                continue;
            }
            let lineno = start_line + i;
            let file_lineno = line_offset + lineno;
            let (pos, force_str) = if let Some(ppos) = s.find("::") {
                (ppos, true)
            } else if let Some(pos) = s.find(':') {
                (pos, false)
            } else {
                return Err(format!("[JSON错误] {} 文件第{}行(执行第{}行): 缺少键值分隔符(:)", source_file, file_lineno, lineno));
            };
            let key = s[..pos].trim().to_string();
            let mut val = s[pos + if force_str { 2 } else { 1 }..].trim();
            if val.contains(",,") {
                return Err(format!("[JSON错误] {} 文件第{}行(执行第{}行): 多余逗号", source_file, file_lineno, lineno));
            }
            val = val.trim_end_matches(',');
            let json_val = if force_str {
                format!("\"__STR__{}\"", val)
            } else {
                adapt_val(val)
            };

            if let Some(&idx) = key_to_idx.get(&key) {
                // 重复键：追加到已有值列表
                key_vals[idx].1.push(json_val);
            } else {
                let idx = key_vals.len();
                key_to_idx.insert(key.clone(), idx);
                key_order.push(key.clone());
                key_vals.push((idx, vec![json_val]));
            }
        }

        // 构建输出：单值保持原样，多值合并为数组
        let entries: Vec<String> = key_order.iter().map(|key| {
            let idx = key_to_idx[key];
            let vals = &key_vals.iter().find(|(i, _)| *i == idx).unwrap().1;
            let key_quoted = qstr(key);
            if vals.len() == 1 {
                format!("{}:{}", key_quoted, vals[0])
            } else {
                format!("{}:[{}]", key_quoted, vals.join(","))
            }
        }).collect();
        Ok(format!("{{{}}}", entries.join(",")))
    } else {
        // [ ] 数组：每行是一个元素
        // ::val → 强制字符串；key::val → 单键对象强制字符串
        // key:val → 单键对象，val 自适应；纯值 → 自适应
        let mut entries: Vec<String> = Vec::new();
        for (i, line) in parts.iter().enumerate() {
            let s = line.trim();
            if s.is_empty() {
                continue;
            }
            let lineno = start_line + i;
            let file_lineno = line_offset + lineno;
            if let Some(ppos) = s.find("::") {
                if ppos == 0 {
                    // ::value → 强制字符串元素
                    let mut val = s[2..].trim();
                    if val.contains(",,") {
                        return Err(format!("[JSON错误] {} 文件第{}行(执行第{}行): 多余逗号", source_file, file_lineno, lineno));
                    }
                    val = val.trim_end_matches(',');
                    entries.push(format!("\"__STR__{}\"", val));
                } else {
                    // key::value → 单键对象，强制字符串
                    let key = s[..ppos].trim();
                    let mut val = s[ppos + 2..].trim();
                    if val.contains(",,") {
                        return Err(format!("[JSON错误] {} 文件第{}行(执行第{}行): 多余逗号", source_file, file_lineno, lineno));
                    }
                    val = val.trim_end_matches(',');
                    entries.push(format!("{{{}:\"__STR__{}\"}}", qstr(key), val));
                }
            } else if let Some(pos) = s.find(':') {
                // key:value → 单键对象，value 自适应
                let key = s[..pos].trim();
                let mut val = s[pos + 1..].trim();
                if val.contains(",,") {
                    return Err(format!("[JSON错误] {} 文件第{}行(执行第{}行): 多余逗号", source_file, file_lineno, lineno));
                }
                val = val.trim_end_matches(',');
                entries.push(format!("{{{}:{}}}", qstr(key), adapt_val(val)));
            } else {
                // 无 : → 纯值元素，自适应
                let v = s.trim_end_matches(',');
                if v.contains(",,") {
                    return Err(format!("[JSON错误] {} 文件第{}行(执行第{}行): 多余逗号", source_file, file_lineno, lineno));
                }
                entries.push(adapt_val(v));
            }
        }
        Ok(format!("[{}]", entries.join(",")))
    }
}


/// 解析 ''' / """ 文本块
fn parse_triple_quote_block(
    lines: &[String],
    idx: usize,
    stmts: &mut Vec<Stmt>,
    marker: &str,
) -> Result<usize, String> {
    // 检查 header 行是否包含变量名: var=''' 或 var:'''
    let header = &lines[idx];
    let var_name = if header.len() > marker.len() {
        let before = &header[..header.len() - marker.len()];
        before.trim_end_matches(':').trim_end_matches('=').to_string()
    } else {
        String::new()
    };

    let mut content_lines = Vec::new();
    let mut i = idx + 1;

    while i < lines.len() {
        let line = &lines[i];
        if line == marker {
            let content = content_lines.join("\n");
            if var_name.is_empty() {
                stmts.push(Stmt::Output(content));
            } else {
                stmts.push(Stmt::TextBlock {
                    var: var_name,
                    content,
                });
            }
            return Ok(i - idx + 1);
        }
        // 支持转义: \''' → '''
        content_lines.push(line.replace(&format!("\\{}", marker), marker));
        i += 1;
    }

    Err(format!("未闭合的 {} 文本块 (第 {} 行)", marker, idx + 1))
}


/* ===================== 行解析辅助 ===================== */

/// 解析 $函数名 参数1 参数2$ 格式的行
fn parse_func_call_line(line: &str) -> Option<Stmt> {
    let line = line.trim_end();
    // 支持 $func$\r 语法（\r 是 nebula 的无换行标记）
    let no_newline = line.ends_with("\\r");
    let line = if no_newline { line.strip_suffix("\\r").unwrap_or(line) } else { line };
    if !line.starts_with('$') || !line.ends_with('$') {
        return None;
    }
    let inner = &line[1..line.len() - 1];
    if inner.is_empty() {
        return None;
    }

    let args = crate::analyzer::split_with_escape(inner);
    if args.is_empty() {
        return None;
    }

    let name = args[0].clone();
    let rest = args[1..].to_vec();

    Some(Stmt::FuncCall {
        name,
        args: rest,
        no_newline,
    })
}

/// 解析赋值右侧表达式
fn parse_assign_expr(raw: &str) -> Expr {
    let raw = raw.trim();
    if raw.is_empty() {
        return Expr::Lit(Value::Str(String::new()));
    }

    // [expr] 括号表达式
    if raw.starts_with('[') && raw.ends_with(']') {
        let inner = &raw[1..raw.len() - 1];
        return parse_expr(inner).unwrap_or(Expr::Lit(Value::Str(inner.to_string())));
    }

    // 包含 %var% 引用 → Var
    if raw.starts_with('%') && raw.ends_with('%') && raw.len() > 2 {
        let inner = &raw[1..raw.len() - 1];
        if !inner.contains('%') {
            return Expr::Var(inner.to_string());
        }
    }

    // 默认为字面量字符串
    Expr::Lit(Value::Str(raw.to_string()))
}

/* ===================== 表达式解析 ===================== */

/// 解析表达式字符串为 AST
pub fn parse_expr(raw: &str) -> Option<Expr> {
    let raw = raw.trim();
    if raw.is_empty() {
        return Some(Expr::Lit(Value::Str(String::new())));
    }

    // 括号包裹的表达式
    if raw.starts_with('[') && raw.ends_with(']') {
        let inner = &raw[1..raw.len() - 1];
        return parse_binary_expr(inner);
    }

    parse_binary_expr(raw)
}

/// 解析二元表达式 a op b
fn parse_binary_expr(raw: &str) -> Option<Expr> {
    let raw = raw.trim();
    if raw.is_empty() {
        return Some(Expr::Lit(Value::Str(String::new())));
    }

    // 尝试找最外层操作符（优先级最低的：+, -）
    // 操作符优先级: +, - (最低), *, /, %, ^ (高)
    let chars: Vec<char> = raw.chars().collect();

    // 从右往左找 +, - （左结合）
    if let Some(pos) = find_op_outside_parens(&chars, &['+', '-'], true) {
        let left = parse_term(&chars[..pos].iter().collect::<String>())?;
        let right = parse_binary_expr(&chars[pos + 1..].iter().collect::<String>())?;
        let op = chars[pos] as u8;
        return Some(Expr::BinOp(Box::new(left), op, Box::new(right)));
    }

    parse_term(raw)
}

/// 解析项: *, /, %, ^
fn parse_term(raw: &str) -> Option<Expr> {
    let raw = raw.trim();
    if raw.is_empty() {
        return Some(Expr::Lit(Value::Str(String::new())));
    }

    let chars: Vec<char> = raw.chars().collect();

    if let Some(pos) = find_op_outside_parens(&chars, &['*', '/', '%', '^'], false) {
        let left = parse_factor(&chars[..pos].iter().collect::<String>())?;
        let right = parse_term(&chars[pos + 1..].iter().collect::<String>())?;
        let op = chars[pos] as u8;
        return Some(Expr::BinOp(Box::new(left), op, Box::new(right)));
    }

    parse_factor(raw)
}

/// 解析因子: 字面量、变量、括号、负号、函数调用
fn parse_factor(raw: &str) -> Option<Expr> {
    let raw = raw.trim();
    if raw.is_empty() {
        return Some(Expr::Lit(Value::Str(String::new())));
    }

    // 负号 (一元)
    if raw.starts_with('-') && raw.len() > 1 {
        let rest = &raw[1..];
        // 确保不是减号（前面有操作数的情况由上层处理）
        let inner = parse_factor(rest)?;
        return Some(Expr::Neg(Box::new(inner)));
    }

    // 括号
    if raw.starts_with('(') && raw.ends_with(')') {
        let inner = &raw[1..raw.len() - 1];
        return parse_binary_expr(inner);
    }

    // %var% 变量引用
    if raw.starts_with('%') && raw.ends_with('%') && raw.len() > 2 {
        let inner = &raw[1..raw.len() - 1];
        if !inner.contains('%') && !inner.contains('$') {
            return Some(Expr::Var(inner.to_string()));
        }
    }

    // $func args$ 函数调用
    if raw.starts_with('$') && raw.ends_with('$') && raw.len() > 2 {
        let inner = &raw[1..raw.len() - 1];
        let args = crate::analyzer::split_with_escape(inner);
        if !args.is_empty() {
            return Some(Expr::Call {
                name: args[0].clone(),
                args: args[1..]
                    .iter()
                    .map(|a| Expr::Lit(Value::Str(a.clone())))
                    .collect(),
            });
        }
    }

    // 数值字面量
    if let Ok(i) = raw.parse::<i64>() {
        return Some(Expr::Lit(Value::Int(i)));
    }
    if let Ok(f) = raw.parse::<f64>() {
        return Some(Expr::Lit(Value::Float(f)));
    }

    // 布尔 / null
    match raw {
        "true" => return Some(Expr::Lit(Value::Bool(true))),
        "false" => return Some(Expr::Lit(Value::Bool(false))),
        "null" => return Some(Expr::Lit(Value::Null)),
        _ => {}
    }

    // 默认：字符串字面量
    Some(Expr::Lit(Value::Str(raw.to_string())))
}

/// 在字符数组中查找操作符位置（跳过括号内容和 %变量% 引用）
fn find_op_outside_parens(chars: &[char], ops: &[char], _right_to_left: bool) -> Option<usize> {
    let mut depth = 0;
    let mut found = None;

    let mut i = 0;
    while i < chars.len() {
        let ch = chars[i];
        match ch {
            '(' | '[' => depth += 1,
            ')' | ']' => if depth > 0 { depth -= 1; },
            '%' if depth == 0 => {
                // 检测 %...% 变量引用：向后查找匹配的 %
                let mut j = i + 1;
                let mut inner_depth = 0;
                let mut has_matching = false;
                while j < chars.len() {
                    match chars[j] {
                        '(' | '[' => inner_depth += 1,
                        ')' | ']' => if inner_depth > 0 { inner_depth -= 1; },
                        '%' if inner_depth == 0 => {
                            has_matching = true;
                            break;
                        }
                        _ => {}
                    }
                    j += 1;
                }
                if has_matching {
                    // %变量% 配对，跳过整个变量引用
                    i = j; // 循环末尾 i+=1 会跳过关闭的 %
                } else {
                    // 无配对 → % 是取模运算符
                    if ops.contains(&'%') {
                        found = Some(i);
                        if ops.contains(&'+') || ops.contains(&'-') {
                            // 继续找右边的（+/- 右结合）
                        } else {
                            return Some(i);
                        }
                    }
                }
            }
            _ if depth == 0 && ops.contains(&ch) => {
                found = Some(i);
                // 对于 +, -: 从右往左找最后一个
                // 对于 *, /, %, ^: 从左往右找第一个
                if ops.contains(&'+') || ops.contains(&'-') {
                    // 继续找右边的
                } else {
                    return Some(i); // 左结合：返回第一个
                }
            }
            _ => {}
        }
        i += 1;
    }

    found
}

/* ===================== 执行器 ===================== */

/// 执行 AST 语句列表（顶层入口，自动预扫描标签）
pub fn exec_stmts(ctx: &mut DicContext, stmts: &[Stmt], debug: Option<&DebugContext>) -> ExecResult {
    let global_labels = collect_all_labels(stmts);
    exec_stmts_impl(ctx, stmts, &global_labels, debug)
}

/* ===================== 调试模式执行器 ===================== */

/// 调试模式入口：加载 Nebula 脚本并启动调试执行
pub fn run_debug_executor(
    mut nb: Nebula,
    shared: Arc<Mutex<SharedDebugState>>,
    event_tx: Sender<DebugEvent>,
    cmd_rx: Receiver<DebugCommand>,
) {
    nb.ctx.debug_mode = true;
    nb.load();

    let init_lines = std::mem::take(&mut Arc::make_mut(&mut nb.ctx.shared).init_lines);
    nb.ctx.sys.line_offset = 0;

    match cmd_rx.recv() {
        Ok(DebugCommand::Continue) | Ok(DebugCommand::StepIn) => {}
        _ => {
            let _ = event_tx.send(DebugEvent::Terminated);
            return;
        }
    }

    let debug_ctx = DebugContext {
        shared: &shared,
        event_tx: &event_tx,
        cmd_rx: &cmd_rx,
        depth: 0,
    };

    {
        let mut ds = shared.lock().unwrap();
        ds.current_file = nb.ctx.sys.source_file.clone();
        ds.depth = 0;
        ds.call_stack = vec![StackFrame {
            id: 0,
            name: "main".to_string(),
            file: ds.current_file.clone(),
            line: 0,
            scope_chain: Vec::new(),
        }];
    }

    if !init_lines.is_empty() {
        let result = exec_stmts_with_debug_wrapper(&mut nb.ctx, &init_lines, &debug_ctx);
        if matches!(result, ExecResult::Stop) {
            let _ = event_tx.send(DebugEvent::Terminated);
            return;
        }
    }

    // 查找并执行 main 函数
    let main_info =
        nb.ctx.find_func_prefix("main")
            .or_else(|| nb.ctx.find_internal("main").map(|code| (code, Vec::new(), Vec::new(), false, 0)));

    if let Some((code, func_line)) = main_info.map(|(code, _, _, _, fl)| (code, fl)) {
        nb.ctx.sys.line_offset = func_line;

        {
            let mut ds = shared.lock().unwrap();
            ds.current_file = nb.ctx.sys.source_file.clone();
            ds.depth = 0;
            ds.call_stack = vec![StackFrame {
                id: 0,
                name: "main".to_string(),
                file: ds.current_file.clone(),
                line: func_line,
                scope_chain: Vec::new(),
            }];
        }

        exec_stmts_with_debug_wrapper(&mut nb.ctx, &code, &debug_ctx);
    }

    let _ = event_tx.send(DebugEvent::Terminated);
}

/// 解析代码块并用 debug 上下文执行
fn exec_stmts_with_debug_wrapper(ctx: &mut DicContext, code: &[String], debug: &DebugContext) -> ExecResult {
    let stmts = match parse_stmts(code, false, ctx.sys.line_offset, &ctx.sys.source_file) {
        Ok(s) => s,
        Err(e) => {
            ctx.output.add(&e);
            return ExecResult::Continue;
        }
    };
    exec_stmts(ctx, &stmts, Some(debug))
}

/// 判断是否为内部变量（不应在调试器变量面板中显示）
fn is_internal_variable(name: &str) -> bool {
    if name == "self" || name == "触发" || name == "触发响应" || name == "行数" {
        return true;
    }
    if name.starts_with("参数") && name.len() > 6 {
        let suffix = &name[6..];
        if suffix.chars().all(|c| c.is_ascii_digit()) {
            return true;
        }
    }
    if name.starts_with("括号") && name.len() > 6 {
        let suffix = &name[6..];
        if suffix.chars().all(|c| c.is_ascii_digit()) {
            return true;
        }
    }
    if name.starts_with('*') {
        return true;
    }
    if name.starts_with('.') {
        return true;
    }
    if name.starts_with("0x") {
        return true;
    }
    if name.starts_with('_') {
        return true;
    }
    false
}

/// 递归收集所有标签（包括嵌套块中的标签），返回标签名 → 全局索引映射
fn collect_all_labels(stmts: &[Stmt]) -> std::collections::HashMap<String, isize> {
    let mut labels = std::collections::HashMap::new();
    for (i, stmt) in stmts.iter().enumerate() {
        if let Stmt::Label(name) = stmt {
            labels.insert(name.clone(), i as isize);
        }
        // 不递归进入子块：子块的标签索引是相对于子块的，goto 只能跳到同级或父级标签
    }
    labels
}

/// 执行 AST 语句列表（带全局标签映射，支持跨作用域 goto）
fn exec_stmts_impl(
    ctx: &mut DicContext,
    stmts: &[Stmt],
    global_labels: &std::collections::HashMap<String, isize>,
    debug: Option<&DebugContext>,
) -> ExecResult {
    use std::collections::HashMap;
    let mut idx: isize = 0;
    let len = stmts.len() as isize;

    // 预扫描本地标签：建立 label_name → index 映射
    let mut labels: HashMap<String, isize> = HashMap::new();
    for (i, stmt) in stmts.iter().enumerate() {
        if let Stmt::Label(name) = stmt {
            labels.insert(name.clone(), i as isize);
        }
    }

    // 执行前先检查 stop 标志（#引入= 等错误导致）
    if ctx.sys.stop {
        return ExecResult::Stop;
    }

    // Debug: 已发送到调试控制台的 parts 索引，用于避免 drain 时重复发送
    let mut debug_sent: usize = 0;

    while idx >= 0 && idx < len {
        let stmt = &stmts[idx as usize];

        // ===== Debug: 每条语句前检查断点/步进 =====
        if let Some(debug_ctx) = debug {
            let file = ctx.sys.source_file.clone();
            let line = ctx.sys.line_offset + (idx as usize) + 1;
            let is_func_call = matches!(stmt, Stmt::FuncCall { .. });
            let scope_chain: Vec<(String, HashMap<String, String>)> = ctx.val.p.collect_chain_vars()
                .into_iter()
                .map(|(name, map)| {
                    let filtered: HashMap<String, String> = map.into_iter()
                        .filter(|(k, _)| !is_internal_variable(k))
                        .map(|(k, v)| (k, v.display()))
                        .collect();
                    (name, filtered)
                })
                .collect();

            if !dap::check_debug_before_exec(
                debug_ctx.shared, debug_ctx.event_tx, debug_ctx.cmd_rx,
                &file, line, debug_ctx.depth, &scope_chain, is_func_call,
            ) {
                return ExecResult::Stop;
            }
        }

        match stmt {
            Stmt::Output(text) => {
                let parts_before = ctx.output.parts_len();
                exec_output(ctx, text);
                // Debug: 非 \r 输出立即发送（\r 输出进 pending，函数末尾 flush 时发送）
                if let Some(debug_ctx) = debug {
                    if ctx.output.parts_len() > parts_before {
                        let new_out = ctx.output.snapshot_from(parts_before);
                        if !new_out.is_empty() {
                            let _ = debug_ctx.event_tx.send(DebugEvent::Output(new_out));
                            debug_sent = ctx.output.parts_len();
                        }
                    }
                }
            }
            Stmt::Assign { target, op, expr } => {
                exec_assign(ctx, target, op, expr);
            }
            Stmt::Loop { var, count, condition, cached_tokens, body } => {
                // Debug: 子块深度 +1（原 debug 路径为 depth + 1）
                let mut sub_debug_holder: Option<DebugContext> = None;
                let sub_debug: Option<&DebugContext> = debug.and_then(|dbg| {
                    sub_debug_holder = Some(DebugContext {
                        shared: dbg.shared,
                        event_tx: dbg.event_tx,
                        cmd_rx: dbg.cmd_rx,
                        depth: dbg.depth + 1,
                    });
                    sub_debug_holder.as_ref()
                });
                let result = exec_loop(ctx, var, count, condition, cached_tokens, body, global_labels, sub_debug);
                match result {
                    ExecResult::Stop => return ExecResult::Stop,
                    ExecResult::Skip => return ExecResult::Skip,
                    ExecResult::Goto(target) => {
                        idx = target;
                        continue;
                    }
                    ExecResult::Continue => {}
                }
            }
            Stmt::If {
                conds,
                cached_tokens,
                branches,
                else_branch,
            } => {
                // Debug: 子块深度 +1
                let mut sub_debug_holder: Option<DebugContext> = None;
                let sub_debug: Option<&DebugContext> = debug.and_then(|dbg| {
                    sub_debug_holder = Some(DebugContext {
                        shared: dbg.shared,
                        event_tx: dbg.event_tx,
                        cmd_rx: dbg.cmd_rx,
                        depth: dbg.depth + 1,
                    });
                    sub_debug_holder.as_ref()
                });
                let result = exec_if(ctx, conds, cached_tokens, branches, else_branch, global_labels, sub_debug);
                match result {
                    ExecResult::Stop => return ExecResult::Stop,
                    ExecResult::Skip => return ExecResult::Skip,
                    ExecResult::Goto(target) => {
                        idx = target;
                        continue;
                    }
                    ExecResult::Continue => {}
                }
            }
            Stmt::ForEach { var, array, body } => {
                // Debug: 子块深度 +1
                let mut sub_debug_holder: Option<DebugContext> = None;
                let sub_debug: Option<&DebugContext> = debug.and_then(|dbg| {
                    sub_debug_holder = Some(DebugContext {
                        shared: dbg.shared,
                        event_tx: dbg.event_tx,
                        cmd_rx: dbg.cmd_rx,
                        depth: dbg.depth + 1,
                    });
                    sub_debug_holder.as_ref()
                });
                let result = exec_foreach(ctx, var, array, body, global_labels, sub_debug);
                match result {
                    ExecResult::Stop => return ExecResult::Stop,
                    ExecResult::Skip => return ExecResult::Skip,
                    ExecResult::Goto(target) => {
                        idx = target;
                        continue;
                    }
                    ExecResult::Continue => {}
                }
            }
            Stmt::FuncCall { name, args, no_newline } => {
                // Debug: 更新调用者栈帧为当前调用位置
                if let Some(debug_ctx) = debug {
                    let line = ctx.sys.line_offset + (idx as usize) + 1;
                    let file = ctx.sys.source_file.clone();
                    {
                        let mut ds = debug_ctx.shared.lock().unwrap();
                        if let Some(top) = ds.call_stack.last_mut() {
                            top.line = line;
                            top.file = file;
                        }
                    }
                }
                // 将当前作用域的标签合并为 external_labels，传给子调用
                let old_external = std::mem::take(&mut ctx.sys.external_labels);
                for (k, &v) in &labels {
                    ctx.sys.external_labels.entry(k.clone()).or_insert((v, 0));
                }
                for (k, &v) in global_labels {
                    ctx.sys.external_labels.entry(k.clone()).or_insert((v, 0));
                }
                // 若当前有 pending 且非内置函数，则非 \r 调用也视为延迟输出
                let is_builtin = ctx.shared.builtins.contains_key(name.as_str());
                let effective_no_newline = *no_newline || (!is_builtin && ctx.output.has_pending());
                let snapshot = if effective_no_newline { Some(ctx.output.parts_len()) } else { None };
                // 延迟调用时剥离非 OOP 调用的 debug 上下文，避免子函数 exec_stmts_impl 实时发送绕过 \r 语义
                // OOP 调用保留 debug 上下文，确保构造函数可以逐步调试（析构函数内部输出由 sub_ctx 实时发送，符合预期）
                let is_oop_call = name.contains('.');
                let debug_for_call: Option<&DebugContext> = if effective_no_newline && !is_oop_call { None } else { debug };
                let parts_before_fc = ctx.output.parts_len();
                let result = exec_func_call(ctx, name, args, debug_for_call);
                // Debug: 根据 \r 语义决定立即发送还是延迟
                if let Some(debug_ctx) = debug {
                    if effective_no_newline {
                        // \r 调用或链式延迟：移到 pending，函数末尾统一发送
                        if ctx.sys.last_call_was_ctor && ctx.output.parts_len() > parts_before_fc {
                            // 构造函数：内部输出由 sub_ctx 实时发送，handle 延迟
                            let handle_idx = ctx.output.parts_len() - 1;
                            if handle_idx > parts_before_fc {
                                // 仅当 handle 之前还有额外输出时发送（debug=None 走正常路径的场景）
                                let immediate = ctx.output.snapshot_range(parts_before_fc, handle_idx);
                                if !immediate.is_empty() {
                                    let _ = debug_ctx.event_tx.send(DebugEvent::Output(immediate));
                                }
                                debug_sent = handle_idx;
                            }
                            ctx.output.move_last_to_pending();
                        } else if ctx.output.parts_len() > parts_before_fc {
                            ctx.output.move_tail_to_pending(parts_before_fc);
                        }
                        // debug_sent 不更新（或已在上面更新），末尾 drain 会发送 pending
                    } else if ctx.output.parts_len() > parts_before_fc {
                        // 非延迟：立即发送新增输出
                        let new_out = ctx.output.snapshot_from(parts_before_fc);
                        if !new_out.is_empty() {
                            let _ = debug_ctx.event_tx.send(DebugEvent::Output(new_out));
                        }
                        debug_sent = ctx.output.parts_len();
                    }
                } else if effective_no_newline {
                    if ctx.sys.last_call_was_ctor {
                        ctx.output.move_last_to_pending();
                    } else {
                        ctx.output.move_tail_to_pending(snapshot.unwrap());
                    }
                }
                // 处理 exec_func_call 的返回结果（Stop/Skip/Goto）
                match result {
                    ExecResult::Stop => return ExecResult::Stop,
                    ExecResult::Skip => return ExecResult::Skip,
                    ExecResult::Goto(target) => {
                        ctx.sys.external_labels = old_external;
                        idx = target;
                        continue;
                    }
                    ExecResult::Continue => {}
                }
                // 检查子调用是否触发了跨函数 goto
                if let Some((target, depth)) = ctx.sys.pending_goto.take() {
                    if depth == 0 && target >= 0 && target < len {
                        ctx.sys.external_labels = old_external;
                        idx = target;
                        continue;
                    }
                    // depth > 0 或目标不在当前作用域，一律向上传播
                    ctx.sys.external_labels = old_external;
                    return ExecResult::Goto(target);
                }
                ctx.sys.external_labels = old_external;
            }
            Stmt::Label(_) => {
                // 标签仅作为 goto 目标，执行时跳过
            }
            Stmt::Goto(label) => {
                // 先在本地标签中查找
                if let Some(&target) = labels.get(label) {
                    if target >= 0 && target < len {
                        idx = target;
                        continue;
                    }
                }
                // 再在全局标签中查找（跨作用域 goto，始终向上传播）
                if let Some(&target) = global_labels.get(label) {
                    return ExecResult::Goto(target);
                }
                // 最后在外部标签中查找（跨函数 goto，来自父调用上下文）
                if let Some(&(target, depth)) = ctx.sys.external_labels.get(label) {
                    ctx.sys.pending_goto = Some((target, depth));
                    return ExecResult::Stop;
                }
            }
            Stmt::Skip => {
                return ExecResult::Skip;
            }
            Stmt::BreakLoop => {
                ctx.sys.for_state.jump = true;
                return ExecResult::Continue;
            }
            Stmt::BreakForEach => {
                ctx.sys.for_each.jump = true;
                return ExecResult::Continue;
            }
            Stmt::Stop => {
                return ExecResult::Stop;
            }
            Stmt::TextBlock { var, content } => {
                if var.is_empty() {
                    ctx.output.add(content);
                    // Debug: 文本块输出立即发送
                    if let Some(debug_ctx) = debug {
                        let _ = debug_ctx.event_tx.send(DebugEvent::Output(content.clone()));
                        debug_sent = ctx.output.parts_len();
                    }
                } else {
                    ctx.val.p.set_string(var, content.clone());
                }
            }
            Stmt::AsyncOutput(text) => {
                let text_with_vars = ctx.val.text(text);
                let text_with_funcs = ctx.run_internal_text(&text_with_vars);
                let final_text = count::run_count_text(&ctx.val, &text_with_funcs);
                if let Some(debug_ctx) = debug {
                    let _ = debug_ctx.event_tx.send(DebugEvent::Output(final_text));
                } else {
                    ctx.output.add(&final_text);
                }
            }
        }

        // 检查函数执行错误
        if let Some(msg) = ctx.sys.error.take() {
            ctx.output.add(&msg);
            if let Some(debug_ctx) = debug {
                let _ = debug_ctx.event_tx.send(DebugEvent::Output(msg.clone()));
            }
            return ExecResult::Stop;
        }

        if ctx.sys.stop {
            return ExecResult::Stop;
        }

        idx += 1;
    }

    ctx.output.flush_pending();
    // Debug: 仅发送尚未发送的延迟输出（\r 内容在 pending 中 flush 后变为 parts）
    if let Some(debug_ctx) = debug {
        let deferred = ctx.output.drain_from(debug_sent);
        if !deferred.is_empty() {
            let _ = debug_ctx.event_tx.send(DebugEvent::Output(deferred));
        }
    }
    ExecResult::Continue
}

/* ===================== 语句执行 ===================== */

/// 判断字符串是否看起来像 JSON 对象或数组
fn looks_like_json(s: &str) -> bool {
    (s.starts_with('{') && s.ends_with('}'))
        || (s.starts_with('[') && s.ends_with(']'))
}

/// 标准化 JSON 字符串：将 __N 标记的字符串转为 JSON Number
fn normalize_json_numbers(ctx: &mut DicContext, s: &str) -> String {
    let trimmed = s.trim();
    if looks_like_json(trimmed) {
        if let Ok(mut val) = serde_json::from_str::<serde_json::Value>(trimmed) {
            json_unnumber(&mut val);
            if let Ok(compact) = serde_json::to_string(&val) {
                return compact;
            }
        } else {
            json_err(ctx, "normalize_json_numbers", s);
        }
    }
    s.to_string()
}

/// 输出 JSON 解析错误，并拦截后续执行
fn json_err(ctx: &mut DicContext, site: &str, detail: &str) {
    ctx.output.add(&format!("\x1b[91m[JSON错误@{site}] 无法解析为合法 JSON: {detail}\x1b[0m\n"));
    ctx.sys.stop = true;
    ctx.sys.error = Some("JSON解析失败".to_string());
}

/// 递归遍历 JSON，将 "__N..." 字符串值转为 Number
fn json_unnumber(val: &mut serde_json::Value) {
    match val {
        serde_json::Value::String(s) => {
            if let Some(num_str) = s.strip_prefix("__N") {
                if let Ok(n) = num_str.parse::<i64>() {
                    *val = serde_json::Value::Number(n.into());
                } else if let Ok(f) = num_str.parse::<f64>() {
                    if let Some(n) = serde_json::Number::from_f64(f) {
                        *val = serde_json::Value::Number(n);
                    }
                }
            }
        }
        serde_json::Value::Array(arr) => {
            for v in arr.iter_mut() {
                json_unnumber(v);
            }
        }
        serde_json::Value::Object(map) => {
            for (_, v) in map.iter_mut() {
                json_unnumber(v);
            }
        }
        _ => {}
    }
}

/// 剥离 __N 前缀（非 JSON 场景的单值处理）
fn strip_n_marker(s: &str) -> String {
    if let Some(num_str) = s.strip_prefix("__N") {
        num_str.to_string()
    } else {
        s.to_string()
    }
}

/// JSON 模板解析：在 JSON 结构层级替换 %var% 和 $func$，自动转义特殊字符
fn resolve_json_template(ctx: &mut DicContext, template: &str) -> String {
    let Ok(mut val) = serde_json::from_str::<serde_json::Value>(template) else {
        // 解析失败 → 回退到纯文本替换，并报错拦截
        json_err(ctx, "resolve_json_template", template);
        let mut p = ctx.val.text(template);
        p = ctx.run_internal_text(&p);
        return normalize_json_numbers(ctx, &p);
    };
    resolve_json_node(ctx, &mut val);
    serde_json::to_string(&val).unwrap_or_else(|_| template.to_string())
}

/// 递归解析 JSON 节点中的 %var% 和 $func%（自适应检测 JSON）
fn resolve_json_node(ctx: &mut DicContext, val: &mut serde_json::Value) {
    match val {
        serde_json::Value::String(s) => {
            // __STR__ 标记（来自 JSON 块中的 :: 强制字符串）→ 先剥离
            if let Some(stripped) = s.strip_prefix("__STR__") {
                // 剥离后仍然可能有 %var% / $func$ 需要解析
                if stripped.contains('%') || stripped.contains('$') {
                    let text_with_vars = ctx.val.text(stripped);
                    let resolved = ctx.run_internal_text(&text_with_vars);
                    // 再次检查 __STR__（双重标记防御）
                    if let Some(s2) = resolved.strip_prefix("__STR__") {
                        *val = serde_json::Value::String(s2.to_string());
                    } else {
                        *val = serde_json::Value::String(resolved);
                    }
                } else {
                    *val = serde_json::Value::String(stripped.to_string());
                }
                return;
            }
            if s.contains('%') || s.contains('$') {
                // 先解析 %var%
                let text_with_vars = ctx.val.text(s);
                // 再解析 $func%
                let resolved = ctx.run_internal_text(&text_with_vars);
                if let Some(stripped) = resolved.strip_prefix("__STR__") {
                    *val = serde_json::Value::String(stripped.to_string());
                } else if let Ok(sub_val) = serde_json::from_str::<serde_json::Value>(&resolved) {
                    // 自适应：合法 JSON → 嵌入为结构值
                    *val = sub_val;
                } else {
                    // 若长得像 JSON 但解析失败 → 报错
                    let trimmed = resolved.trim();
                    if looks_like_json(trimmed) {
                        json_err(ctx, "resolve_json_node", &resolved);
                    }
                    // 否则作为字符串
                    *val = serde_json::Value::String(resolved);
                }
            }
        }
        serde_json::Value::Array(arr) => {
            for v in arr.iter_mut() {
                resolve_json_node(ctx, v);
            }
        }
        serde_json::Value::Object(map) => {
            for (_, v) in map.iter_mut() {
                resolve_json_node(ctx, v);
            }
        }
        _ => {} // Number, Bool, Null — 不变
    }
}

fn exec_output(ctx: &mut DicContext, text: &str) -> String {
    // 设置行号
    // val.text() 变量替换 → run_internal_text() $...$ 处理 → run_count_text() [...] 求值
    let text_with_vars = ctx.val.text(text);
    let text_with_funcs = ctx.run_internal_text(&text_with_vars);
    let final_text = count::run_count_text(&ctx.val, &text_with_funcs);
    // 剥离 __N 数字标记前缀
    let final_text = strip_n_marker(&final_text);
    // 剥离 :: 原始值的 \x01 标记
    let final_text = final_text.replace('\x01', "");
    // 剥离行尾 \r（换行标记），再处理内部转义
    let has_r_suffix = final_text.ends_with("\\r");
    let final_text = final_text.strip_suffix("\\r").unwrap_or(&final_text);
    let display = crate::analyzer::unescape_newline(final_text);
    if has_r_suffix {
        // \r 结尾 = 换行 + 延迟到函数末尾输出
        ctx.output.add_pending(&format!("{}\n", display));
    } else {
        ctx.output.add(&format!("{}\n", display));
    }
    display
}

fn exec_assign(ctx: &mut DicContext, target: &str, op: &AssignOp, expr: &Expr) {
    if target.is_empty() {
        // 无目标变量 → 当作输出
        let val = eval_expr(ctx, expr).unwrap_or(Value::Null);
        ctx.output.add(&val.display());
        return;
    }

    // 特殊处理：检查 expr 是否是文本块标记
    if *op == AssignOp::Set {
        if let Expr::Lit(Value::Str(marker)) = expr {
            match marker.as_str() {
                "\"\"\"" => {
                    // 启动 """ 文本块收集器（在 exec_stmts 层面不适用，因为文本块已在 parse 阶段处理）
                    // 这里仅作为兜底
                    ctx.val.p.set_string(target, String::new());
                    return;
                }
                "'''" => {
                    ctx.val.p.set_string(target, String::new());
                    return;
                }
                _ => {}
            }
        }
    }

    // JSON 路径赋值: target 包含 [key] 语法
    if target.contains('[') {
        // 剥离 @ 前缀（@json_var[path] 语法）
        let clean_target = target.strip_prefix('@').unwrap_or(target);
        if let Some((json_key, sub_keys)) = crate::value::parse_bracket_path(clean_target) {
            let json_key = count::run_count_text(&ctx.val, json_key);
            let json_str = crate::value::Scope::lookup_display(&json_key, &ctx.val.p, Some(ctx.val.g.get_all()));
            if let Ok(mut val) = serde_json::from_str::<serde_json::Value>(&json_str) {
                let eval_result = eval_expr(ctx, expr).unwrap_or(Value::Null);
                let v_set_data = eval_result.display();
                let sub_keys: Vec<String> = sub_keys
                    .iter()
                    .map(|k| {
                        let resolved = ctx.val.text(k);
                        count::run_count_text(&ctx.val, &resolved)
                    })
                    .collect();
                // :: 强字符串 / : 自适应
                let json_val = if *op == AssignOp::Plain {
                    serde_json::Value::String(v_set_data)
                } else {
                    match serde_json::from_str::<serde_json::Value>(&v_set_data) {
                        Ok(v) if v.is_number() || v.is_boolean() || v.is_null() || v.is_object() || v.is_array() => v,
                        _ => serde_json::Value::String(v_set_data),
                    }
                };
                json_set_value_mut(&mut val, &sub_keys, &json_val);
                if let Ok(s) = serde_json::to_string(&val) {
                    let storage_key = crate::value::Scope::resolve_ptr_key(&json_key, &ctx.val.p, Some(ctx.val.g.get_all()));
                    ctx.val.p.set_string(&storage_key, s);
                }
            } else if looks_like_json(&json_str) {
                json_err(ctx, "exec_assign#1", &json_str);
            }
            return;
        }
    }

    // 标准赋值
    let raw_val = eval_expr(ctx, expr).unwrap_or(Value::Null);

    match op {
        AssignOp::Set => {
            if let Value::Str(s) = &raw_val {
                // JSON 感知解析：先解析 JSON 模板，在 JSON 结构层级替换 %var%/$func$
                let processed = if looks_like_json(s) {
                    resolve_json_template(ctx, s)
                } else {
                    let mut p = ctx.val.text(s);
                    p = ctx.run_internal_text(&p);
                    // 标准化 JSON：将 __N 标记字符串转为 JSON Number
                    normalize_json_numbers(ctx, &p)
                };
                if s.starts_with('[') && s.ends_with(']') {
                    let evaluated = count::run_count_text(&ctx.val, &processed);
                    ctx.val.p.set_string(target, evaluated);
                    return;
                }
                if processed.contains("#引入=") {
                    if let Some(path) = processed.strip_prefix("#引入=") {
                        // #引入= 始终创建包（剥离 . 前缀作为包名）
                        let pkg_name = target.strip_prefix('.').unwrap_or(target);
                        ctx.reload_package(pkg_name, path.trim());
                        // 同时存入变量（. 前缀变量持久化，无 . 前缀的在 [f]初始化 后清理）
                        ctx.val.p.set_string(target, path.trim().to_string());
                    }
                    return;
                }
                if processed.starts_with('@') {
                    // @json_var[path] — JSON 路径导航
                    if let Some((json_key, sub_keys)) = crate::value::parse_bracket_path(&processed[1..]) {
                        let json_key = count::run_count_text(&ctx.val, json_key);
                        let json_str = ctx.val.p.get_cloned(&json_key);
                        if let Ok(val) = serde_json::from_str::<serde_json::Value>(&json_str) {
                            let sub_keys: Vec<String> = sub_keys
                                .iter()
                                .map(|k| {
                                    let resolved = ctx.val.text(k);
                                    count::run_count_text(&ctx.val, &resolved)
                                })
                                .collect();
                            if let Some(result) = json_navigate(&val, &sub_keys) {
                                let val_str = match result {
                                    serde_json::Value::String(s) => s.clone(),
                                    serde_json::Value::Null => String::new(),
                                    other => other.to_string(),
                                };
                                ctx.val.p.set_string(target, val_str);
                                return;
                            }
                        } else if looks_like_json(&json_str) {
                            json_err(ctx, "exec_assign#2", &json_str);
            }
                    }
                    ctx.val.p.set_string(target, processed);
                    return;
                }
                if processed.starts_with('?') && processed.contains("?:") {
                    // ?: 条件赋值: @a ?: b
                    let parts: Vec<&str> = processed.split("?:").collect();
                    for part in &parts {
                        let part = part.trim();
                        if let Some(key_path) = part.strip_prefix('@') {
                            if let Some((json_key, sub_keys)) = crate::value::parse_bracket_path(key_path) {
                                let json_key = count::run_count_text(&ctx.val, json_key);
                                let json_str = ctx.val.p.get_cloned(&json_key);
                                if let Ok(val) = serde_json::from_str::<serde_json::Value>(&json_str) {
                                    let sub_keys: Vec<String> = sub_keys
                                        .iter()
                                        .map(|k| {
                                            let resolved = ctx.val.text(k);
                                            count::run_count_text(&ctx.val, &resolved)
                                        })
                                        .collect();
                                    if let Some(result) = json_navigate(&val, &sub_keys) {
                                        let val_str = match result {
                                            serde_json::Value::String(s) => s.clone(),
                                            serde_json::Value::Null => String::new(),
                                            other => other.to_string(),
                                        };
                                        if !val_str.is_empty() && val_str != "null" && val_str != "false" {
                                            ctx.val.p.set_string(target, val_str);
                                            return;
                                        }
                                    }
                                } else if looks_like_json(&json_str) {
                                    json_err(ctx, "exec_assign#3", &json_str);
                                }
                            } else {
                                let val = ctx.val.p.get_cloned(key_path);
                                if !val.is_empty() && val != "null" && val != "false" {
                                    ctx.val.p.set_string(target, val);
                                    return;
                                }
                            }
                        } else {
                            let result = ctx.val.text(part);
                            if !result.is_empty() && result != "null" && result != "false" {
                                ctx.val.p.set_string(target, result);
                                return;
                            }
                        }
                    }
                } else {
                    ctx.val.p.set_string(target, processed);
                }
            } else {
                ctx.val.p.set_val(target, raw_val);
            }
        }
        AssignOp::Add => {
            let val_str = ctx.val.p.get_cloned(target);
            let rhs_raw = raw_val.display();
            let resolved = ctx.val.text(&rhs_raw);
            let rhs = count::run_count_text(&ctx.val, &resolved);

            // 尝试 JSON 追加
            if let Ok(arr) = serde_json::from_str::<Vec<serde_json::Value>>(&val_str) {
                let mut arr = arr;
                arr.push(serde_json::Value::String(rhs.clone()));
                if let Ok(s) = serde_json::to_string(&arr) {
                    ctx.val.p.set_string(target, s);
                }
            } else if let Ok(obj) =
                serde_json::from_str::<serde_json::Map<String, serde_json::Value>>(&val_str)
            {
                let mut obj = obj;
                obj.insert(obj.len().to_string(), serde_json::Value::String(rhs.clone()));
                if let Ok(s) = serde_json::to_string(&obj) {
                    ctx.val.p.set_string(target, s);
                }
            } else if let (Ok(a), Ok(b)) = (val_str.parse::<f64>(), rhs.parse::<f64>()) {
                ctx.val.p.set_string(target, format!("{}", a + b));
            } else {
                ctx.val.p.set_string(target, format!("{}{}", val_str, rhs));
            }
        }
        AssignOp::Sub => {
            let val_str = ctx.val.p.get_cloned(target);
            let rhs_raw = raw_val.display();
            let resolved = ctx.val.text(&rhs_raw);
            let rhs = count::run_count_text(&ctx.val, &resolved);
            if let (Ok(a), Ok(b)) = (val_str.parse::<f64>(), rhs.parse::<f64>()) {
                ctx.val.p.set_string(target, format!("{}", a - b));
            }
        }
        AssignOp::Mul => {
            let val_str = ctx.val.p.get_cloned(target);
            let rhs_raw = raw_val.display();
            let resolved = ctx.val.text(&rhs_raw);
            let rhs = count::run_count_text(&ctx.val, &resolved);
            if let (Ok(a), Ok(b)) = (val_str.parse::<f64>(), rhs.parse::<f64>()) {
                ctx.val.p.set_string(target, format!("{}", a * b));
            } else if let Ok(b) = rhs.parse::<usize>() {
                ctx.val.p.set_string(target, val_str.repeat(b));
            }
        }
        AssignOp::Div => {
            let val_str = ctx.val.p.get_cloned(target);
            let rhs_raw = raw_val.display();
            let resolved = ctx.val.text(&rhs_raw);
            let rhs = count::run_count_text(&ctx.val, &resolved);
            if let (Ok(a), Ok(b)) = (val_str.parse::<f64>(), rhs.parse::<f64>()) {
                if b != 0.0 {
                    ctx.val.p.set_string(target, format!("{}", a / b));
                }
            }
        }
        AssignOp::Mod => {
            let val_str = ctx.val.p.get_cloned(target);
            let rhs_raw = raw_val.display();
            let resolved = ctx.val.text(&rhs_raw);
            let rhs = count::run_count_text(&ctx.val, &resolved);
            if let (Ok(a), Ok(b)) = (val_str.parse::<f64>(), rhs.parse::<f64>()) {
                if b != 0.0 {
                    ctx.val.p.set_string(target, format!("{}", a % b));
                }
            }
        }
        AssignOp::Plain => {
            // :: — 强制字符串赋值：不做任何 %var% / $func$ 展开，原样存储
            // 用 \x01 包裹标记为原始值，防止 val.text() 递归展开
            let rhs_raw = raw_val.display();
            let marked = format!("\x01{}\x01", rhs_raw);
            ctx.val.p.set_string(target, marked);
        }
        AssignOp::FnSet => {
            // $: — 执行函数后赋值，行为与 Set 相同（表达式中的 $func$ 已在 eval_expr 中处理）
            if let Value::Str(s) = &raw_val {
                let processed = ctx.val.text(s);
                ctx.val.p.set_string(target, processed);
            } else {
                ctx.val.p.set_val(target, raw_val);
            }
        }
    }
}

fn exec_loop(
    ctx: &mut DicContext,
    var: &str,
    count: &Option<Expr>,
    condition: &Option<Expr>,
    cached_tokens: &Option<Vec<crate::iftext::Token>>,
    body: &[Stmt],
    global_labels: &std::collections::HashMap<String, isize>,
    debug: Option<&DebugContext>,
) -> ExecResult {
    // 条件循环
    if let Some(_cond_expr) = condition {
        ctx.sys.for_state.is_for = true;
        // 使用预编译 Token 直接求值，每轮只做变量替换不做词法分析
        if let Some(tokens) = cached_tokens {
            loop {
                if !IfText::eval_cached(ctx, tokens) {
                    break;
                }
                let result = exec_stmts_impl(ctx, body, global_labels, debug);
                if ctx.sys.stop {
                    ctx.sys.for_state.is_for = false;
                    return ExecResult::Stop;
                }
                if ctx.sys.for_state.jump {
                    ctx.sys.for_state.jump = false;
                    ctx.sys.for_state.is_for = false;
                    break;
                }
                if result == ExecResult::Skip {
                    continue;
                }
                if let ExecResult::Goto(target) = result {
                    ctx.sys.for_state.is_for = false;
                    return ExecResult::Goto(target);
                }
            }
        } else {
            loop {
                let cond_text = eval_cond_text(ctx, _cond_expr);
                if !IfText::pd(ctx, &cond_text) {
                    break;
                }
                let result = exec_stmts_impl(ctx, body, global_labels, debug);
                if ctx.sys.stop {
                    ctx.sys.for_state.is_for = false;
                    return ExecResult::Stop;
                }
                if ctx.sys.for_state.jump {
                    ctx.sys.for_state.jump = false;
                    ctx.sys.for_state.is_for = false;
                    break;
                }
                if result == ExecResult::Skip {
                    continue;
                }
                if let ExecResult::Goto(target) = result {
                    ctx.sys.for_state.is_for = false;
                    return ExecResult::Goto(target);
                }
            }
        }
        ctx.sys.for_state.is_for = false;
        return ExecResult::Continue;
    }

    let max_count = match count {
        Some(expr) => {
            match eval_expr(ctx, expr) {
                Ok(val) => {
                    let n = val.as_i64();
                    if n < 0 { 0 } else { n as usize }
                }
                Err(e) => {
                    ctx.sys.error = Some(e);
                    0
                }
            }
        }
        None => 0, // 0 表示无限循环
    };

    // 统一循环体（max_count == 0 表示无限循环）
    let mut i: usize = 1;
    loop {
        if max_count > 0 && i > max_count {
            break;
        }
        if !var.is_empty() {
            ctx.val.p.set_string(var, i.to_string());
        }
        ctx.sys.for_state.is_for = true;

        let result = exec_stmts_impl(ctx, body, global_labels, debug);

        if ctx.sys.stop {
            ctx.sys.for_state.is_for = false;
            return ExecResult::Stop;
        }
        if ctx.sys.for_state.jump {
            ctx.sys.for_state.jump = false;
            ctx.sys.for_state.is_for = false;
            break;
        }

        // 检查循环变量是否被循环体修改
        let new_i = ctx.val.p.get(var).and_then(|v| {
            if let Value::Int(n) = v {
                Some(*n as usize)
            } else if let Value::Str(s) = v {
                s.parse::<usize>().ok()
            } else {
                None
            }
        });

        // >跳过 (Skip)
        if result == ExecResult::Skip {
            i = new_i.unwrap_or(i) + 1;
            continue;
        }

        if let ExecResult::Goto(target) = result {
            ctx.sys.for_state.is_for = false;
            return ExecResult::Goto(target);
        }

        if let Some(ni) = new_i {
            i = ni;
        }
        i += 1;
    }

    ctx.sys.for_state.is_for = false;
    ExecResult::Continue
}

fn exec_if(
    ctx: &mut DicContext,
    conds: &[Expr],
    cached_tokens: &Option<Vec<Vec<crate::iftext::Token>>>,
    branches: &[Vec<Stmt>],
    else_branch: &Option<Vec<Stmt>>,
    global_labels: &std::collections::HashMap<String, isize>,
    debug: Option<&DebugContext>,
) -> ExecResult {
    for (i, cond) in conds.iter().enumerate() {
        let ifval = if let Some(tokens_list) = cached_tokens {
            if let Some(tokens) = tokens_list.get(i) {
                IfText::eval_cached(ctx, tokens)
            } else {
                let cond_text = eval_cond_text(ctx, cond);
                IfText::pd(ctx, &cond_text)
            }
        } else {
            let cond_text = eval_cond_text(ctx, cond);
            IfText::pd(ctx, &cond_text)
        };
        if ifval {
            if let Some(branch) = branches.get(i) {
                return exec_stmts_impl(ctx, branch, global_labels, debug);
            }
            return ExecResult::Continue;
        }
    }

    // else 分支
    if let Some(else_body) = else_branch {
        return exec_stmts_impl(ctx, else_body, global_labels, debug);
    }

    ExecResult::Continue
}

fn exec_foreach(
    ctx: &mut DicContext,
    var_spec: &str,
    array_expr: &Expr,
    body: &[Stmt],
    global_labels: &std::collections::HashMap<String, isize>,
    debug: Option<&DebugContext>,
) -> ExecResult {
    let array_val = eval_expr(ctx, array_expr).unwrap_or(Value::Null);
    let array_str = ctx.val.text(&array_val.display());
    let final_str = count::run_count_text(&ctx.val, &array_str);

    // 解析 var_spec: "key_var,val_var"
    let (v1, v2) = if let Some(comma_pos) = var_spec.find(',') {
        (
            var_spec[..comma_pos].to_string(),
            var_spec[comma_pos + 1..].to_string(),
        )
    } else {
        (var_spec.to_string(), String::from("_"))
    };

    // 尝试解析为 JSON
    let run_data: Option<serde_json::Value> =
        serde_json::from_str(&final_str).ok();

    if let Some(run_data) = run_data {
        // 将 JSON 值转为字符串
        let json_val_to_str = |val: &serde_json::Value| -> String {
            match val {
                serde_json::Value::String(s) => s.clone(),
                other => other.to_string(),
            }
        };
        // 统一收集 (key, value) 对
        let items: Vec<(String, String)> = match &run_data {
            serde_json::Value::Array(arr) => {
                arr.iter().enumerate()
                    .map(|(k, v)| (k.to_string(), json_val_to_str(v)))
                    .collect()
            }
            serde_json::Value::Object(map) => {
                map.iter()
                    .map(|(k, v)| (k.clone(), json_val_to_str(v)))
                    .collect()
            }
            _ => vec![],
        };

        for (key, val) in items {
            ctx.val.p.set_string(&v1, key);
            ctx.val.p.set_string(&v2, val);

            ctx.sys.for_each.is_for = true;
            let result = exec_stmts_impl(ctx, body, global_labels, debug);
            ctx.sys.for_each.is_for = false;

            if result == ExecResult::Stop || ctx.sys.stop {
                return ExecResult::Stop;
            }
            if ctx.sys.for_each.jump {
                ctx.sys.for_each.jump = false;
                break;
            }
            // >跳过 (Skip): 跳过当前元素
            if result == ExecResult::Skip {
                continue;
            }
            if let ExecResult::Goto(target) = result {
                return ExecResult::Goto(target);
            }
        }
    }

    ExecResult::Continue
}

/// 将包的 static/func/triggers 注入到子上下文
fn exec_func_call(ctx: &mut DicContext, name: &str, args: &[String], debug: Option<&DebugContext>) -> ExecResult {
    // 保存原始参数（含 %var% 模式），用于 OOP 实例变量传播
    let raw_args: Vec<String> = args.to_vec();
    // 预先求值参数
    let resolved_args: Vec<String> = args.iter().map(|a| ctx.val.text(a)).collect();
    let args: &[String] = &resolved_args;

    ctx.sys.last_call_was_ctor = false;

    // $var:func$ — 冒号语法：执行函数并将结果赋值给变量
    // 例如：$s:创建服务器$ → 调用 创建服务器()，结果存入变量 s
    if let Some(colon_pos) = name.find(':') {
        let var_name = &name[..colon_pos];
        let func_name = &name[colon_pos + 1..];
        if !var_name.is_empty() && !func_name.is_empty() && !func_name.contains(':') {
            let all_args: Vec<String> = {
                let mut a = vec![func_name.to_string()];
                a.extend(args.iter().cloned());
                a
            };
            let content = if args.is_empty() {
                func_name.to_string()
            } else {
                let mut s = func_name.to_string();
                for a in args {
                    s.push(' ');
                    s.push_str(a);
                }
                s
            };

            // 先查内置函数
            if let Some(&builtin_fn) = ctx.shared.builtins.get(func_name) {
                if let Some(out) = builtin_fn(ctx, &all_args, &content) {
                    let old = ctx.val.p.get_cloned(var_name);
                    crate::functions::track_ptr_assign(&old, &out);
                    ctx.val.p.set_string(var_name, out.clone());
                    ctx.val.set_global(var_name, out);
                }
                return ExecResult::Continue;
            }

            // 非内置函数：查找并执行本地函数
            if let Some((code, _param_names, _defaults, _is_variadic, func_line)) = ctx.find_func_prefix(func_name) {
                let mut sub_ctx = ctx.fresh_sub_context();
                sub_ctx.sys.line_offset = func_line;
                sub_ctx.sys.source_file = ctx.sys.source_file.clone();
                sub_ctx.val.p.set_string("self", func_name.to_string());
                sub_ctx.val.p.set_string("触发", func_name.to_string());
                sub_ctx.val.p.set_string("参数0", func_name.to_string());
                for (i, arg) in args.iter().enumerate() {
                    sub_ctx.val.p.set_string(&format!("参数{}", i + 1), arg.clone());
                }
                if let Some(debug_ctx) = debug {
                    let parsed_stmts = match parse_stmts(&code, false, func_line, &ctx.sys.source_file) {
                        Ok(s) => s,
                        Err(e) => {
                            ctx.output.add(&e);
                            return ExecResult::Continue;
                        }
                    };
                    let func_labels = collect_all_labels(&parsed_stmts);
                    {
                        let mut ds = debug_ctx.shared.lock().unwrap();
                        let frame_id = ds.call_stack.len();
                        let saved_scope = ds.scope_chain.clone();
                        if let Some(caller) = ds.call_stack.last_mut() {
                            caller.scope_chain = saved_scope;
                        }
                        ds.call_stack.push(StackFrame {
                            id: frame_id,
                            name: func_name.to_string(),
                            file: ctx.sys.source_file.clone(),
                            line: func_line,
                            scope_chain: Vec::new(),
                        });
                    }
                    let sub_debug = DebugContext {
                        shared: debug_ctx.shared,
                        event_tx: debug_ctx.event_tx,
                        cmd_rx: debug_ctx.cmd_rx,
                        depth: debug_ctx.depth + 1,
                    };
                    let exec_result = exec_stmts_impl(&mut sub_ctx, &parsed_stmts, &func_labels, Some(&sub_debug));
                    {
                        let mut ds = debug_ctx.shared.lock().unwrap();
                        ds.call_stack.pop();
                    }
                    let out = sub_ctx.output.get();
                    if !out.is_empty() {
                        ctx.val.p.set_string(var_name, out.clone());
                        ctx.val.set_global(var_name, out);
                    }
                    return exec_result;
                }
                entry(&mut sub_ctx, &code);
                let result = sub_ctx.output.get();
                if !result.is_empty() {
                    let old = ctx.val.p.get_cloned(var_name);
                    crate::functions::track_ptr_assign(&old, &result);
                    ctx.val.p.set_string(var_name, result.clone());
                    ctx.val.set_global(var_name, result);
                }
            }
            return ExecResult::Continue;
        }
    }

    // $.method → 解析 self 变量获取当前类名，转为 ClassName.method
    let name_resolved: std::borrow::Cow<str>;
    let name: &str = if name.len() > 2 && name.starts_with('%') && name.ends_with('%') {
        name_resolved = std::borrow::Cow::Owned(ctx.val.text(name));
        &name_resolved
    } else if name.starts_with('.') && name.len() > 1 {
        let self_class = ctx.val.p.get_cloned("self");
        if !self_class.is_empty() {
            // *N / pkg.ClassName → 纯类名
            let pure_class = crate::functions::pure_class_name(&self_class);
            name_resolved = std::borrow::Cow::Owned(format!("{}{}", pure_class, name));
            &name_resolved
        } else {
            name
        }
    } else {
        name
    };

    // 构建 $func arg1 arg2$ 格式的 content 参数
    let content = if args.is_empty() {
        name.to_string()
    } else {
        let mut s = name.to_string();
        for a in args {
            s.push(' ');
            s.push_str(a);
        }
        s
    };

    let all_args: Vec<String> = {
        let mut a = vec![name.to_string()];
        a.extend(args.iter().cloned());
        a
    };

    // 先查内置函数
    if let Some(&builtin_fn) = ctx.shared.builtins.get(name) {
        if let Some(output) = builtin_fn(ctx, &all_args, &content) {
            ctx.output.add_string(output);
        }
        return ExecResult::Continue;
    }


// ===== OOP 变量解析 (x.method → 将 x 作为变量解析为类名) =====
    if let Some(dot_pos) = name.find('.') {
        let raw_obj = &name[..dot_pos];
        let method = &name[dot_pos + 1..];
        if !raw_obj.is_empty() && !method.is_empty() {
            let resolved_obj = ctx.val.text(&format!("%{}%", raw_obj));
            // 变量未定义时，可能是直接类名（如 $.回调 → Counter.回调）
            let resolved_obj = if resolved_obj.contains('%') {
                raw_obj.to_string()
            } else {
                resolved_obj
            };
            if !resolved_obj.is_empty() {
                // === 服务器 OOP 实例方法调度 (.静态, .启动) ===
                if crate::functions::is_server_instance(&resolved_obj) {
                    crate::functions::dispatch_server_method(ctx, &resolved_obj, method, args);
                    return ExecResult::Continue;
                }

                // raw_obj 是已知包别名 → 优先搜该包（含构造函数）
                // 但如果变量被 0x 池句柄覆盖，则包别名失效（例如 a:0xa 后 $a.测试$ 不再指向包）
                let resolved_raw = ctx.val.text(&format!("%{}%", raw_obj));
                let pkg_alias_active = !resolved_raw.starts_with("0x") && !resolved_raw.starts_with("-0x");
                let mut found_result: Option<(Vec<String>, Vec<String>, Vec<Option<String>>, bool, usize, String, String)> = None;
                let mut found_is_ctor = false;
                if pkg_alias_active {
                    if let Some(raw_pkg) = ctx.shared.packages.get(raw_obj) {
                    let pfx = format!("{} ", method);
                    let cmt = format!("{}.{}", method, method);
                    // 构造函数检测
                    if let Some((text, line, ctor_name)) = crate::functions::search_pkg_ctor(raw_pkg, method) {
                        found_is_ctor = true;
                        ctx.sys.last_call_was_ctor = true;
                        found_result = Some((text, Vec::new(), Vec::new(), false, line, ctor_name, raw_obj.to_string()));
                    }
                    // 普通方法
                    if found_result.is_none() {
                        for item in &raw_pkg.local_func {
                            if item.trigger == cmt || item.trigger == method || item.trigger.starts_with(&pfx) {
                                found_result = Some((item.text.clone(), Vec::new(), Vec::new(), false, item.line + 1, cmt.clone(), raw_obj.to_string()));
                                break;
                            }
                        }
                    }
                    if found_result.is_none() {
                        for item in &raw_pkg.local_static {
                            if item.trigger == cmt || item.trigger == method || item.trigger.starts_with(&pfx) {
                                found_result = Some((item.text.clone(), Vec::new(), Vec::new(), false, item.line + 1, cmt.clone(), raw_obj.to_string()));
                                break;
                            }
                        }
                    }
                    // 模糊搜索
                    if found_result.is_none() {
                        let cmt_clone = cmt.clone();
                        found_result = fuzzy_search_pkg_method(raw_pkg, method).map(
                            move |(text, pnames, pdefaults, pvari, line)| (text, pnames, pdefaults, pvari, line, cmt_clone, raw_obj.to_string())
                        );
                    }
                }
                }
                // 搜方法：先 resolved_obj，再 raw_obj（回退）
                // 若包别名已失效（变量被 0x 覆盖），跳过 raw_obj 回退
                for obj in std::iter::once(resolved_obj.as_str()).chain(
                    if pkg_alias_active { std::iter::once(raw_obj) } else { std::iter::once("") }
                ) {
                    if found_result.is_some() || obj.is_empty() { continue; }
                    // 包别名已失效 → 尝试通过池指针解析包方法，不做全包模糊搜索
                    if !pkg_alias_active {
                        if let Some((class_spec, _)) = crate::functions::resolve_class_from_pool(obj) {
                            // class_spec 可能是 "a"（包指针）或 "a.测试"（类实例指针）
                            let (pkg_name, class_name) = if let Some(dot) = class_spec.rfind('.') {
                                (&class_spec[..dot], &class_spec[dot + 1..])
                            } else {
                                (class_spec.as_str(), "")
                            };
                            if let Some(pkg_bv) = ctx.shared.packages.get(pkg_name) {
                                if class_name.is_empty() {
                                    // 包指针：直接搜索方法名 / 构造函数
                                    if let Some((text, line, ctor_name)) = crate::functions::search_pkg_ctor(pkg_bv, method) {
                                        found_is_ctor = true;
                                        ctx.sys.last_call_was_ctor = true;
                                        found_result = Some((text, Vec::new(), Vec::new(), false, line, ctor_name, obj.to_string()));
                                    }
                                    if found_result.is_none() {
                                        if let Some((text, pnames, pdefaults, pvari, line)) = crate::functions::search_pkg_method_direct(pkg_bv, method) {
                                            let cmt = format!("{}.{}", method, method);
                                            found_result = Some((text, pnames, pdefaults, pvari, line, cmt, obj.to_string()));
                                        }
                                    }
                                } else {
                                    // 类实例指针：搜索 Class.method
                                    let class_qualified = format!("{}.{}", class_name, method);
                                    if let Some((text, pnames, pdefaults, pvari, line)) = crate::functions::search_pkg_method_exact_or_prefix(pkg_bv, &class_qualified) {
                                        let qualified = format!("{}.{}", class_name, method);
                                        found_result = Some((text, pnames, pdefaults, pvari, line, qualified, obj.to_string()));
                                    }
                                }
                            }
                        }
                        continue;
                    }

                    let pure_class = crate::functions::pure_class_name(obj);
                    let qualified = format!("{}.{}", pure_class, method);
                    // 0x 指针 → 从池中获取包名，用于精确定位方法所在包
                    let pkg_from_pool: Option<String> = crate::functions::resolve_class_from_pool(obj)
                        .and_then(|(class_spec, _)| class_spec.rfind('.')
                            .map(|p| class_spec[..p].to_string()));
                    // 若 obj 是 "pkg.Class" 格式 → 仅在目标包中搜索
                    let found = if let Some(pkg_dot) = obj.find('.') {
                        let pkg_name = &obj[..pkg_dot];
                        let class_name = &obj[pkg_dot + 1..];
                        let class_qualified = format!("{}.{}", class_name, method);
                        ctx.shared.packages.get(pkg_name).and_then(|pkg_bv| {
                            crate::functions::search_pkg_method_exact_or_prefix(pkg_bv, &class_qualified)
                        })
                    } else if let Some(ref pkg_name) = pkg_from_pool {
                        // obj 是 0x 指针 → 从池中获取了包名，直接在该包中搜索
                        let class_qualified = format!("{}.{}", pure_class, method);
                        ctx.shared.packages.get(pkg_name.as_str()).and_then(|pkg_bv| {
                            crate::functions::search_pkg_method_exact_or_prefix(pkg_bv, &class_qualified)
                        })
                    } else {
                        None
                    };
                    // 常规搜索链
                    let found = found.or_else(|| {
                        ctx
                            .find_func_prefix(&qualified)
                            .or_else(|| {
                                let prefix = format!("{} ", qualified);
                                for item in &ctx.shared.local_static {
                                    if item.trigger == qualified {
                                        return Some((item.text.clone(), Vec::new(), Vec::new(), false, item.line + 1));
                                    }
                                    if item.trigger.starts_with(&prefix) {
                                        let (param_names, defaults, is_variadic) = parse_param_defs(&item.trigger[prefix.len()..]);
                                        return Some((item.text.clone(), param_names, defaults, is_variadic, item.line + 1));
                                    }
                                }
                                None
                            })
                            // obj 是已知包名 → 直接搜方法 / 构造函数
                            .or_else(|| {
                                ctx.shared.packages.get(obj).and_then(|pkg_bv| {
                                    let pfx = format!("{} ", method);
                                    let cmt = format!("{}.{}", method, method);
                                    // 1) 构造函数检测（类名.初始化 / 类名.new）
                                    if let Some((text, line, _ctor_name)) = crate::functions::search_pkg_ctor(pkg_bv, method) {
                                        found_is_ctor = true;
                                        ctx.sys.last_call_was_ctor = true;
                                        return Some((text, Vec::new(), Vec::new(), false, line));
                                    }
                                    // 2) 普通方法：类.方法 / 方法 / 方法 params
                                    for item in &pkg_bv.local_func {
                                        if item.trigger == cmt || item.trigger == method || item.trigger.starts_with(&pfx) {
                                            let (pnames, pdefaults, pvari) = if item.trigger == cmt {
                                                (Vec::new(), Vec::new(), false)
                                            } else if item.trigger.len() > method.len() + 1 {
                                                parse_param_defs(&item.trigger[method.len() + 1..])
                                            } else {
                                                (Vec::new(), Vec::new(), false)
                                            };
                                            return Some((item.text.clone(), pnames, pdefaults, pvari, item.line + 1));
                                        }
                                    }
                                    for item in &pkg_bv.local_static {
                                        if item.trigger == cmt || item.trigger == method || item.trigger.starts_with(&pfx) {
                                            let (pnames, pdefaults, pvari) = if item.trigger == cmt {
                                                (Vec::new(), Vec::new(), false)
                                            } else if item.trigger.len() > method.len() + 1 {
                                                parse_param_defs(&item.trigger[method.len() + 1..])
                                            } else {
                                                (Vec::new(), Vec::new(), false)
                                            };
                                            return Some((item.text.clone(), pnames, pdefaults, pvari, item.line + 1));
                                        }
                                    }
                                    // 3) 模糊搜索：*.method / *.method params
                                    fuzzy_search_pkg_method(pkg_bv, method)
                                })
                            })
                            .or_else(|| ctx.find_internal(&qualified).map(|code| (code, Vec::new(), Vec::new(), false, 0)))
                            .or_else(|| {
                                let prefix = format!("{} ", qualified);
                                for (_, pkg_bv) in ctx.shared.packages.iter() {
                                    for item in &pkg_bv.local_func {
                                        if item.trigger == qualified {
                                            return Some((item.text.clone(), Vec::new(), Vec::new(), false, item.line + 1));
                                        }
                                        if item.trigger.starts_with(&prefix) {
                                            let (pnames, pdefaults, pvari) = parse_param_defs(&item.trigger[prefix.len()..]);
                                            return Some((item.text.clone(), pnames, pdefaults, pvari, item.line + 1));
                                        }
                                    }
                                    for item in &pkg_bv.local_static {
                                        if item.trigger == qualified {
                                            return Some((item.text.clone(), Vec::new(), Vec::new(), false, item.line + 1));
                                        }
                                    }
                                }
                                // 模糊搜索所有包
                                for (_, pkg_bv) in ctx.shared.packages.iter() {
                                    if let Some(result) = fuzzy_search_pkg_method(pkg_bv, method) {
                                        return Some(result);
                                    }
                                }
                                None
                            })
                    });
                    if let Some((code, param_names, defaults, is_variadic, func_line)) = found {
                        found_result = Some((code, param_names, defaults, is_variadic, func_line, qualified, obj.to_string()));
                    }
                }
                if let Some((code, param_names, defaults, is_variadic, func_line, qualified, use_obj)) = found_result {
                    let mut sub_ctx = ctx.fresh_sub_context();
                    sub_ctx.sys.line_offset = func_line;
                    sub_ctx.sys.source_file = ctx.sys.source_file.clone();
                    // 包上下文注入
                    if let Some(pkg_dot) = use_obj.find('.') {
                        let pkg_name = &use_obj[..pkg_dot];
                        if let Some(pkg_bv) = ctx.shared.packages.get(pkg_name) {
                            crate::functions::inject_pkg_context(&mut sub_ctx, pkg_bv);
                            crate::functions::process_pkg_head_vars(&ctx.val, &mut sub_ctx, pkg_bv, Some(&use_obj));
                        }
                    } else {
                        // 0x 指针 → 从池中获取包名，精确定位
                        let pool_pkg = crate::functions::resolve_class_from_pool(&use_obj)
                            .and_then(|(class_spec, _)| class_spec.rfind('.')
                                .map(|p| class_spec[..p].to_string()));
                        if let Some(ref pkg_name) = pool_pkg {
                            if let Some(pkg_bv) = ctx.shared.packages.get(pkg_name.as_str()) {
                                crate::functions::inject_pkg_context(&mut sub_ctx, pkg_bv);
                                crate::functions::process_pkg_head_vars(&ctx.val, &mut sub_ctx, pkg_bv, None);
                            }
                        } else {
                            let pure_class = crate::functions::pure_class_name(&use_obj);
                            let dot_prefix = format!("{}.", pure_class);
                            for (_, pkg_bv) in ctx.shared.packages.iter() {
                                let found_in_pkg = pkg_bv.local_func.iter().any(|item| item.trigger.starts_with(&dot_prefix))
                                    || pkg_bv.local_static.iter().any(|item| item.trigger.starts_with(&dot_prefix));
                                if found_in_pkg {
                                    crate::functions::inject_pkg_context(&mut sub_ctx, pkg_bv);
                                    crate::functions::process_pkg_head_vars(&ctx.val, &mut sub_ctx, pkg_bv, None);
                                    break;
                                }
                            }
                        }
                    }
                    // 更新子上下文的源文件为包/函数的实际文件（调试断点/堆栈需要）
                    if let Some(pkg_dot) = use_obj.find('.') {
                        let pkg_name = &use_obj[..pkg_dot];
                        if let Some(pkg_bv) = ctx.shared.packages.get(pkg_name) {
                            if !pkg_bv.source_file.is_empty() {
                                sub_ctx.sys.source_file = pkg_bv.source_file.clone();
                            }
                        }
                    } else {
                        // use_obj 可能是包别名或类名，直接查找包
                        for search in &[use_obj.as_str(), raw_obj] {
                            if let Some(pkg_bv) = ctx.shared.packages.get(*search) {
                                if !pkg_bv.source_file.is_empty() {
                                    sub_ctx.sys.source_file = pkg_bv.source_file.clone();
                                    break;
                                }
                            }
                        }
                    }
                    // 实例变量持久化
                    ctx.load_instance_vars(&mut sub_ctx, raw_obj, &resolved_obj);
                    sub_ctx.val.p.set_string("self", use_obj.clone());
                    sub_ctx.val.p.set_string("触发", qualified.clone());
                    sub_ctx.val.p.set_string("参数0", qualified.clone());

                    let has_named_params = !param_names.is_empty();
                    let arg_count = args.len();
                    let required_count = defaults.iter().filter(|d| d.is_none()).count();
                    let valid = if is_variadic {
                        arg_count >= required_count
                    } else if has_named_params {
                        arg_count >= required_count && arg_count <= param_names.len()
                    } else {
                        true
                    };

                    if !valid {
                        let label = if is_variadic { "至少需要" } else { "需要" };
                        ctx.sys.error = Some(format!(
                            "[错误] 函数 '{}' {} {} 个参数，但传入了 {} 个",
                            qualified, label, required_count, arg_count
                        ));
                        return ExecResult::Continue;
                    }

                    let var_base = if is_variadic {
                        param_names.last().cloned()
                    } else {
                        None
                    };
                    let mut all_vals: Vec<String> = Vec::new();

                    for i in 0..param_names.len() {
                        let val = if i < arg_count {
                            ctx.val.text(&args[i])
                        } else if let Some(ref d) = defaults[i] {
                            ctx.val.p.resolve_default(d, has_named_params)
                        } else {
                            String::new()
                        };
                        all_vals.push(val.clone());
                        let is_funcptr = i < raw_args.len() && raw_args[i].contains("func@");
                        if is_funcptr {
                            sub_ctx.val.p.set_funcptr(&param_names[i], val.clone());
                        } else {
                            sub_ctx.val.p.set_string(&param_names[i], val.clone());
                        }
                        if is_funcptr {
                            sub_ctx.val.p.set_funcptr(&format!("参数{}", i + 1), val.clone());
                        } else {
                            sub_ctx.val.p.set_string(&format!("参数{}", i + 1), val.clone());
                        }
                        if let Some(ref base) = var_base {
                            sub_ctx.val.p.set_string(&format!("{}{}", base, i + 1), val);
                        }
                    }
                    for i in param_names.len()..arg_count {
                        let val = ctx.val.text(&args[i]);
                        all_vals.push(val.clone());
                        sub_ctx.val.p.set_string(&format!("参数{}", i + 1), val.clone());
                        if let Some(ref base) = var_base {
                            sub_ctx.val.p.set_string(&format!("{}{}", base, i + 1), val);
                        }
                    }
                    if let Some(ref base) = var_base {
                        let json_arr = serde_json::to_string(&all_vals).unwrap_or_default();
                        sub_ctx.val.p.set_string(base, json_arr);
                    }

                    sub_ctx.sys.external_labels = ctx.sys.external_labels
                        .iter()
                        .map(|(k, &(idx, d))| (k.clone(), (idx, d + 1)))
                        .collect();
                    if let Some(debug_ctx) = debug {
                        let parsed_stmts = match parse_stmts(&code, false, func_line, &sub_ctx.sys.source_file) {
                            Ok(s) => s,
                            Err(e) => {
                                ctx.output.add(&e);
                                return ExecResult::Continue;
                            }
                        };
                        let func_labels = collect_all_labels(&parsed_stmts);
                        {
                            let mut ds = debug_ctx.shared.lock().unwrap();
                            let frame_id = ds.call_stack.len();
                            let saved_scope = ds.scope_chain.clone();
                            if let Some(caller) = ds.call_stack.last_mut() {
                                caller.scope_chain = saved_scope;
                            }
                            ds.call_stack.push(StackFrame {
                                id: frame_id,
                                name: name.to_string(),
                                file: sub_ctx.sys.source_file.clone(),
                                line: func_line,
                                scope_chain: Vec::new(),
                            });
                        }
                        let sub_debug = DebugContext {
                            shared: debug_ctx.shared,
                            event_tx: debug_ctx.event_tx,
                            cmd_rx: debug_ctx.cmd_rx,
                            depth: debug_ctx.depth + 1,
                        };
                        let exec_result = exec_stmts_impl(&mut sub_ctx, &parsed_stmts, &func_labels, Some(&sub_debug));
                        {
                            let mut ds = debug_ctx.shared.lock().unwrap();
                            ds.call_stack.pop();
                        }
                        if sub_ctx.sys.pending_goto.is_some() {
                            ctx.sys.pending_goto = sub_ctx.sys.pending_goto.take();
                            return exec_result;
                        }
                        crate::functions::writeback_ptr_vars(ctx, &sub_ctx, &raw_args, &param_names, 0);
                        if found_is_ctor {
                            let class_spec = if use_obj.contains('.') {
                                use_obj.clone()
                            } else if let Some((cs, _)) = crate::functions::resolve_class_from_pool(&use_obj) {
                                if cs.contains('.') { cs } else { format!("{}.{}", cs, method) }
                            } else if ctx.shared.packages.contains_key(raw_obj) {
                                format!("{}.{}", raw_obj, method)
                            } else if ctx.shared.packages.contains_key(&use_obj) {
                                format!("{}.{}", use_obj, method)
                            } else {
                                method.to_string()
                            };
                            let handle = crate::functions::pool_alloc_instance(&class_spec);
                            ctx.save_ctor_instance_vars(&sub_ctx, &handle);
                            // Debug: 子上下文输出已实时发送，handle 写入 ctx.output
                            // 由 Stmt::FuncCall 根据 \r 语义决定立即发送还是延迟
                            ctx.output.add(&handle);
                        } else {
                            ctx.save_instance_vars(&sub_ctx, raw_obj, &resolved_obj);
                            // Debug: 子上下文输出已实时发送
                        }
                        return exec_result;
                    }
                    entry_via_ast(&mut sub_ctx, &code);
                    if sub_ctx.sys.pending_goto.is_some() {
                        ctx.sys.pending_goto = sub_ctx.sys.pending_goto.take();
                        return ExecResult::Continue;
                    }
                    crate::functions::writeback_ptr_vars(ctx, &sub_ctx, &raw_args, &param_names, 0);
                    if found_is_ctor {
                        // OOP 构造函数：分配实例池
                        let class_spec = if use_obj.contains('.') {
                            use_obj.clone()
                        } else if let Some((cs, _)) = crate::functions::resolve_class_from_pool(&use_obj) {
                            if cs.contains('.') {
                                cs
                            } else {
                                format!("{}.{}", cs, method)
                            }
                        } else if ctx.shared.packages.contains_key(raw_obj) {
                            format!("{}.{}", raw_obj, method)
                        } else if ctx.shared.packages.contains_key(&use_obj) {
                            format!("{}.{}", use_obj, method)
                        } else {
                            method.to_string()
                        };
                        let handle = crate::functions::pool_alloc_instance(&class_spec);
                        ctx.save_ctor_instance_vars(&sub_ctx, &handle);
                        // 构造函数：输出子上下文中的打印内容 + 实例指针
                        ctx.output.append_parts_from(&sub_ctx.output);
                        ctx.output.add(&handle);
                    } else {
                        ctx.save_instance_vars(&sub_ctx, raw_obj, &resolved_obj);
                        ctx.output.append_parts_from(&sub_ctx.output);
                    }
                    return ExecResult::Continue;
                }
                // 方法未找到 → 原样输出
                let args_str = args.join(" ");
                if args_str.is_empty() {
                    ctx.output.add_string(format!("${}$", name));
                } else {
                    ctx.output.add_string(format!("${} {}$", name, args_str));
                }
                return ExecResult::Continue;
            }
        }
    }

    // ===== 非 OOP：查内部函数 =====
    let found = ctx
        .find_func_prefix(name)
        .or_else(|| ctx.find_internal(name).map(|code| (code, Vec::new(), Vec::new(), false, 0)))
        .or_else(|| {
            // [函数:ClassName]Method 存在 local_static，trigger 包含参数定义
            // find_internal 用 HashMap 精确匹配找不到，需要前缀匹配
            let prefix = format!("{} ", name);
            for item in &ctx.shared.local_static {
                if item.trigger == name {
                    return Some((item.text.clone(), Vec::new(), Vec::new(), false, item.line + 1));
                }
                if item.trigger.starts_with(&prefix) {
                    let (param_names, defaults, is_variadic) = parse_param_defs(&item.trigger[prefix.len()..]);
                    return Some((item.text.clone(), param_names, defaults, is_variadic, item.line + 1));
                }
            }
            None
        });

    if let Some((code, param_names, defaults, is_variadic, func_line)) = found {
        // 检测自调用（递归）：当前 self 与 name 相同则保留变量上下文
        let is_self = ctx.val.p.eq_str("self", name);
        let mut sub_ctx = if is_self {
            ctx.clone_for_internal()
        } else {
            ctx.fresh_sub_context()
        };
        sub_ctx.sys.line_offset = func_line;
        sub_ctx.sys.source_file = ctx.sys.source_file.clone();

        // 注入变量：星引入函数用源包的 head 变量（隔离），否则用父上下文变量
        crate::functions::inject_star_import_head_vars(ctx, &mut sub_ctx, name);

        // 加载实例变量：
        // 1) ClassName.field → .field（从父上下文加载）
        // 2) .field → .field（直接复制，支持 OOP 子上下文嵌套调用）
        if let Some(dot_pos) = name.find('.') {
            let class_name = &name[..dot_pos];
            let resolved_obj = ctx.val.text(&format!("%{}%", class_name));
            let class_key = if resolved_obj.contains('%') { class_name.to_string() } else { resolved_obj };
            for prefix in [&format!("{}.", class_name), &format!("{}.", class_key)] {
                for (key, val) in ctx.val.p.iter_local() {
                    if let Some(field) = key.strip_prefix(prefix.as_str()) {
                        let dot_key = format!(".{}", field);
                        if !sub_ctx.val.p.contains_key_local(&dot_key) {
                            sub_ctx.val.p.set_string(&dot_key, val.display());
                        }
                    }
                }
            }
            // 同时复制当前上下文中已有的 .field（OOP 子上下文已加载的）
            for (key, val) in ctx.val.p.iter_local() {
                if key.starts_with('.')
                    && !sub_ctx.val.p.contains_key_local(key) {
                    sub_ctx.val.p.set_string(key, val.display());
                }
            }
        }

        sub_ctx.val.p.set_string("触发", name.to_string());
        // self 只存类名（如 "Counter"），不存全限定方法名（如 "Counter.print"）
        let class_name = name.rfind('.').map(|p| &name[..p]).unwrap_or(name);
        sub_ctx.val.p.set_string("self", class_name.to_string());
        sub_ctx.val.p.set_string("参数0", name.to_string());

        let has_named_params = !param_names.is_empty();
        let arg_count = args.len();
        let required_count = defaults.iter().filter(|d| d.is_none()).count();
        let valid = if is_variadic {
            arg_count >= required_count
        } else if has_named_params {
            arg_count >= required_count && arg_count <= param_names.len()
        } else {
            true
        };

        if valid {
            let var_base = if is_variadic {
                param_names.last().cloned()
            } else {
                None
            };
            let mut all_vals: Vec<String> = Vec::new();

            // 注入命名参数（用传入值或默认值）
            for i in 0..param_names.len() {
                let val = if i < arg_count {
                    ctx.val.text(&args[i])
                } else if let Some(ref d) = defaults[i] {
                    ctx.val.p.resolve_default(d, has_named_params)
                } else {
                    String::new()
                };
                all_vals.push(val.clone());
                let is_funcptr = i < raw_args.len() && raw_args[i].contains("func@");
                if is_funcptr {
                    sub_ctx.val.p.set_funcptr(&param_names[i], val.clone());
                } else {
                    sub_ctx.val.p.set_string(&param_names[i], val.clone());
                }
                if is_funcptr {
                    sub_ctx.val.p.set_funcptr(&format!("参数{}", i + 1), val.clone());
                } else {
                    sub_ctx.val.p.set_string(&format!("参数{}", i + 1), val.clone());
                }
                if let Some(ref base) = var_base {
                    sub_ctx.val.p.set_string(&format!("{}{}", base, i + 1), val);
                }
            }
            // 位置参数默认值（无命名参数时的回退处理）
            if param_names.is_empty() {
                for i in 0..defaults.len() {
                    if i >= arg_count {
                        if let Some(ref d) = defaults[i] {
                            let val = ctx.val.p.resolve_default(d, false);
                            all_vals.push(val.clone());
                            sub_ctx.val.p.set_string(&format!("参数{}", i + 1), val);
                        }
                    }
                }
            }
            // 可变参数多余传入值
            for i in param_names.len()..arg_count {
                let val = ctx.val.text(&args[i]);
                all_vals.push(val.clone());
                sub_ctx.val.p.set_string(&format!("参数{}", i + 1), val.clone());
                if let Some(ref base) = var_base {
                    sub_ctx.val.p.set_string(&format!("{}{}", base, i + 1), val);
                }
            }
            if let Some(ref base) = var_base {
                let json_arr =
                    serde_json::to_string(&all_vals).unwrap_or_default();
                sub_ctx.val.p.set_string(base, json_arr);
            }

            // 为非 OOP 函数加载参数引用的实例变量
            // 如果参数值如 "Counter" 对应类名，则从父上下文加载 Counter.field → paramName.field
            for i in 0..param_names.len() {
                let val = sub_ctx.val.p.get_cloned(&param_names[i]);
                if !val.is_empty() {
                    let class_prefix = format!("{}.", val);
                    let param_prefix = format!("{}.", &param_names[i]);
                    for (key, v) in ctx.val.p.iter_local() {
                        if let Some(field) = key.strip_prefix(&class_prefix) {
                            // 同时以参数名和类名为前缀存入，确保 OOP 调度能找到
                            let dot_key = format!(".{}", field);
                            if !sub_ctx.val.p.contains_key_local(&dot_key) {
                                sub_ctx.val.p.set_string(&dot_key, v.display());
                            }
                            let param_key = format!("{}{}", param_prefix, field);
                            if !sub_ctx.val.p.contains_key_local(&param_key) {
                                sub_ctx.val.p.set_string(&param_key, v.display());
                            }
                            let class_key = format!("{}{}", class_prefix, field);
                            if !sub_ctx.val.p.contains_key_local(&class_key) {
                                sub_ctx.val.p.set_string(&class_key, v.display());
                            }
                        }
                    }
                }
            }

            sub_ctx.sys.external_labels = ctx.sys.external_labels
                .iter()
                .map(|(k, &(idx, d))| (k.clone(), (idx, d + 1)))
                .collect();
            if let Some(debug_ctx) = debug {
                let parsed_stmts = match parse_stmts(&code, false, func_line, &ctx.sys.source_file) {
                    Ok(s) => s,
                    Err(e) => {
                        ctx.output.add(&e);
                        return ExecResult::Continue;
                    }
                };
                let func_labels = collect_all_labels(&parsed_stmts);
                {
                    let mut ds = debug_ctx.shared.lock().unwrap();
                    let frame_id = ds.call_stack.len();
                    let saved_scope = ds.scope_chain.clone();
                    if let Some(caller) = ds.call_stack.last_mut() {
                        caller.scope_chain = saved_scope;
                    }
                    ds.call_stack.push(StackFrame {
                        id: frame_id,
                        name: name.to_string(),
                        file: ctx.sys.source_file.clone(),
                        line: func_line + 1,
                        scope_chain: Vec::new(),
                    });
                }
                let sub_debug = DebugContext {
                    shared: debug_ctx.shared,
                    event_tx: debug_ctx.event_tx,
                    cmd_rx: debug_ctx.cmd_rx,
                    depth: debug_ctx.depth + 1,
                };
                let exec_result = exec_stmts_impl(&mut sub_ctx, &parsed_stmts, &func_labels, Some(&sub_debug));
                {
                    let mut ds = debug_ctx.shared.lock().unwrap();
                    ds.call_stack.pop();
                }
                // 回传跨函数 goto
                if sub_ctx.sys.pending_goto.is_some() {
                    ctx.sys.pending_goto = sub_ctx.sys.pending_goto.take();
                    return exec_result;
                }
                // 指针变量回写
                crate::functions::writeback_ptr_vars(ctx, &sub_ctx, &raw_args, &param_names, 0);
                // 实例变量持久化
                for (key, val) in sub_ctx.val.p.iter_local() {
                    if key.starts_with('.') {
                        ctx.val.p.set_string(key, val.display());
                    }
                }
                // Debug: 子上下文输出已实时发送，不追加到父上下文
                return exec_result;
            }
            entry_via_ast(&mut sub_ctx, &code);
            // 回传跨函数 goto
            if sub_ctx.sys.pending_goto.is_some() {
                ctx.sys.pending_goto = sub_ctx.sys.pending_goto.take();
                return ExecResult::Continue;
            }
            // 指针变量回写：若参数来自 %varName% 且 *varName 存在
            crate::functions::writeback_ptr_vars(ctx, &sub_ctx, &raw_args, &param_names, 0);
            // 实例变量持久化：同步子上下文 .field 到当前上下文
            // 上层 OOP 调用会负责 ClassName.field 最终持久化
            for (key, val) in sub_ctx.val.p.iter_local() {
                if key.starts_with('.') {
                    ctx.val.p.set_string(key, val.display());
                }
            }
            ctx.output.append_parts_from(&sub_ctx.output);
        } else {
            let label = if is_variadic { "至少需要" } else { "需要" };
            ctx.sys.error = Some(format!(
                "[错误] 函数 '{}' {} {} 个参数，但传入了 {} 个",
                name, label, required_count, arg_count
            ));
        }
        return ExecResult::Continue;
    }

    // 未找到 OOP 函数：尝试作为类名.内置函数调用（如 $.回调 → Counter.回调 → 回调 内置函数）
    if let Some(dot_pos) = name.find('.') {
        let method = &name[dot_pos + 1..];
        if let Some(&builtin_fn) = ctx.shared.builtins.get(method) {
            if let Some(output) = builtin_fn(ctx, &all_args, &content) {
                ctx.output.add_string(output);
            }
            return ExecResult::Continue;
        }
    }

    // 未找到：保持原样输出
    let fallback = format!("${}$", content);
    ctx.output.add(&fallback);
    ExecResult::Continue
}

/// 通过 AST 执行内部函数代码（递归调用 parse → exec）
fn entry_via_ast(ctx: &mut DicContext, code: &[String]) {
    match parse_stmts(code, false, ctx.sys.line_offset, &ctx.sys.source_file) {
        Ok(stmts) => {
            exec_stmts(ctx, &stmts, None);
        }
        Err(e) => {
            // JSON 解析错误 → 拦截执行
            if e.contains("[JSON错误]") {
                ctx.output.add(&format!("\x1b[91m{}\x1b[0m\n", e));
                ctx.sys.stop = true;
                ctx.sys.error = Some(e);
            } else {
                // 其他解析失败，回退到 entry() 解析
                crate::interpreter::entry(ctx, code);
            }
        }
    }
}

/* ===================== 表达式求值 ===================== */

/// 将条件表达式转为求值文本（用于 IfText::pd）
/// 注意：IfText::pd 内部会自行调用 process_internal($...$) + val.text(%var%) + run_count_text([...])
/// 所以对于字符串字面量，直接返回原始字符串即可，避免双重处理。
fn eval_cond_text(ctx: &mut DicContext, expr: &Expr) -> String {
    match expr {
        Expr::Lit(v) => v.display(),
        Expr::Var(name) => {
            let resolved = ctx.val.text(&format!("%{}%", name));
            if resolved.starts_with('%') && resolved.ends_with('%') {
                String::new()
            } else {
                resolved
            }
        }
        Expr::BinOp(left, op, right) => {
            let l = match eval_expr(ctx, left) {
                Ok(v) => v,
                Err(e) => { ctx.sys.error = Some(e); Value::Int(0) }
            };
            let r = match eval_expr(ctx, right) {
                Ok(v) => v,
                Err(e) => { ctx.sys.error = Some(e); Value::Int(0) }
            };
            count::compute_bin_op(&l, &r, *op).display()
        }
        Expr::Neg(inner) => {
            let v = match eval_expr(ctx, inner) {
                Ok(v) => v,
                Err(e) => { ctx.sys.error = Some(e); Value::Int(0) }
            };
            match v {
                Value::Int(i) => Value::Int(-i).display(),
                Value::Float(f) => Value::Float(-f).display(),
                _ => format!("-{}", v.display()),
            }
        }
        Expr::Call { name, args } => {
            let arg_strs: Vec<String> = args
                .iter()
                .map(|a| match eval_expr(ctx, a) {
                    Ok(v) => v.display(),
                    Err(e) => { ctx.sys.error = Some(e); String::new() }
                })
                .collect();
            let all_args: Vec<String> = {
                let mut a = vec![name.clone()];
                a.extend(arg_strs.clone());
                a
            };
            let content = all_args.join(" ");
            // 尝试调用内置函数获取结果
            if let Some(&builtin_fn) = ctx.shared.builtins.get(name.as_str()) {
                builtin_fn(ctx, &all_args, &content).unwrap_or_default()
            } else {
                ctx.val.text(&content)
            }
        }
    }
}

/// 求值表达式为 Value
pub fn eval_expr(ctx: &mut DicContext, expr: &Expr) -> Result<Value, String> {
    match expr {
        Expr::Lit(v) => Ok(v.clone()),
        Expr::Var(name) => {
            // 通过 val.text() 解析 %var% 以获得完整的变量解析能力
            let resolved = ctx.val.text(&format!("%{}%", name));
            // 如果解析后仍是 %var% 格式，说明未找到，用空字符串
            let val = if resolved.starts_with('%') && resolved.ends_with('%') {
                String::new()
            } else {
                resolved
            };
            // 尝试解析为数字
            if let Ok(i) = val.parse::<i64>() {
                Ok(Value::Int(i))
            } else if let Ok(f) = val.parse::<f64>() {
                Ok(Value::Float(f))
            } else {
                Ok(Value::Str(val))
            }
        }
        Expr::BinOp(left, op, right) => {
            let l = eval_expr(ctx, left)?;
            let r = eval_expr(ctx, right)?;
            Ok(count::compute_bin_op(&l, &r, *op))
        }
        Expr::Neg(inner) => {
            let v = eval_expr(ctx, inner)?;
            match v {
                Value::Int(i) => Ok(Value::Int(-i)),
                Value::Float(f) => Ok(Value::Float(-f)),
                other => {
                    let f = other.as_f64();
                    Ok(Value::Float(-f))
                }
            }
        }
        Expr::Call { name, args } => {
            // 函数调用求值：先执行 exec_func_call，捕获输出作为返回值
            let arg_strs: Vec<String> = args
                .iter()
                .map(|a| eval_expr(ctx, a).map(|v| v.display()).unwrap_or_default())
                .collect();
            let all_args: Vec<String> = {
                let mut a = vec![name.clone()];
                a.extend(arg_strs.clone());
                a
            };
            let content = all_args.join(" ");
            if let Some(&builtin_fn) = ctx.shared.builtins.get(name.as_str()) {
                let result = builtin_fn(ctx, &all_args, &content).unwrap_or_default();
                Ok(Value::Str(result))
            } else {
                // 执行函数调用，捕获其输出作为返回值（不输出到终端）
                let saved = ctx.output.get();
                ctx.output.clear();
                exec_func_call(ctx, name, &arg_strs, None);
                let result = ctx.output.get();
                ctx.output.clear();
                ctx.output.add_string(saved);
                if let Some(err) = ctx.sys.error.take() {
                    return Err(err);
                }
                Ok(Value::Str(result))
            }
        }
    }
}

/* ===================== JSON 工具 ===================== */

fn json_navigate<'a>(
    val: &'a serde_json::Value,
    keys: &[String],
) -> Option<&'a serde_json::Value> {
    let mut cur = val;
    for key in keys {
        match cur {
            serde_json::Value::Object(map) => {
                cur = map.get(key)?;
            }
            serde_json::Value::Array(arr) => {
                let idx = key.parse::<usize>().ok()?;
                cur = arr.get(idx)?;
            }
            _ => return None,
        }
    }
    Some(cur)
}

fn json_set_value_mut(json: &mut serde_json::Value, keys: &[String], value: &serde_json::Value) {
    if keys.is_empty() {
        return;
    }
    let mut cur = json;
    for (i, key) in keys.iter().enumerate() {
        if i == keys.len() - 1 {
            match cur {
                serde_json::Value::Object(map) => {
                    map.insert(key.clone(), value.clone());
                }
                serde_json::Value::Array(arr) => {
                    if key.is_empty() {
                        // [] 空括号 = 追加到数组末尾
                        arr.push(value.clone());
                    } else if let Ok(idx) = key.parse::<usize>() {
                        if idx < arr.len() {
                            arr[idx] = value.clone();
                        } else {
                            while arr.len() <= idx {
                                arr.push(serde_json::Value::Null);
                            }
                            arr[idx] = value.clone();
                        }
                    }
                }
                _ => {}
            }
            return;
        }
        match cur {
            serde_json::Value::Object(map) => {
                cur = map
                    .entry(key.clone())
                    .or_insert(serde_json::Value::Object(serde_json::Map::new()));
            }
            serde_json::Value::Array(arr) => {
                if let Ok(idx) = key.parse::<usize>() {
                    while arr.len() <= idx {
                        arr.push(serde_json::Value::Object(serde_json::Map::new()));
                    }
                    cur = &mut arr[idx];
                } else {
                    return;
                }
            }
            _ => return,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_current_dic_main() {
        // 当前 dic.nr [f]main 的实际内容
        let source = vec![
            "c:{\"a\":\"b\"}".to_string(),
            "b:123".to_string(),
            "a:{".to_string(),
            "    a:a".to_string(),
            "    b:[]".to_string(),
            "}".to_string(),
            "@a[b][]:成功".to_string(),
            "@a[b][]:123".to_string(),
            "@a[b][]::123".to_string(),
            "%a%".to_string(),
        ];

        let mut ctx = crate::interpreter::DicContext::new();
        ctx.sys.source_file = "test".to_string();

        let stmts = parse_stmts(&source, false, 0, &ctx.sys.source_file)
            .expect("parse should succeed");

        exec_stmts(&mut ctx, &stmts, None);

        let output = ctx.output.get();

        assert!(ctx.sys.error.is_none(), "unexpected error: {:?}", ctx.sys.error);

        let parsed: serde_json::Value = serde_json::from_str(&output)
            .expect("output should be valid JSON");

        // 验证 a 键是字符串 "a"
        assert_eq!(parsed.get("a").and_then(|v| v.as_str()).unwrap(), "a");

        // 验证 b 键是数组 ["成功",123,"123"]
        let b_arr = parsed.get("b").and_then(|v| v.as_array())
            .expect("key 'b' should be an array");
        assert_eq!(b_arr.len(), 3);
        assert_eq!(b_arr[0].as_str().unwrap(), "成功");
        assert_eq!(b_arr[1].as_i64().unwrap(), 123);      // :123 自适应 → Number
        assert_eq!(b_arr[2].as_str().unwrap(), "123");    // ::123 强制字符串
    }

    #[test]
    fn test_val_text_json_path() {
        // JSON 路径赋值: @a[啊]:不啊
        let (v_type, prefix, suffix) = crate::analyzer::val_text_test("@a[啊]:不啊");
        assert_eq!(v_type, 6, "should be assignment type 6");
        assert_eq!(prefix, "@a[啊]");
        assert_eq!(suffix, "不啊");

        // JSON 路径赋值（不带 @）：a[啊]:不啊
        let (v_type, prefix, suffix) = crate::analyzer::val_text_test("a[0]:val");
        assert_eq!(v_type, 6);
        assert_eq!(prefix, "a[0]");
        assert_eq!(suffix, "val");

        // 正常赋值不受影响
        let (v_type, prefix, suffix) = crate::analyzer::val_text_test("a:123");
        assert_eq!(v_type, 6);
        assert_eq!(prefix, "a");
        assert_eq!(suffix, "123");

        // 多级 JSON 路径: @a[6][啊]:不啊
        let (v_type, prefix, suffix) = crate::analyzer::val_text_test("@a[6][啊]:不啊");
        assert_eq!(v_type, 6);
        assert_eq!(prefix, "@a[6][啊]");
        assert_eq!(suffix, "不啊");
    }

    #[test]
    fn test_full_exec_flow() {
        // 模拟 [f]main 完整执行
        let source = vec![
            "c:{\"a\":\"b\"}".to_string(),
            "b:123".to_string(),
            "a:[".to_string(),
            "    a,".to_string(),
            "    b,".to_string(),
            "    %b%,".to_string(),
            "    ::%b%,".to_string(),
            "    %c%,".to_string(),
            "    啊:123,".to_string(),
            "    啊::啊,".to_string(),
            "]".to_string(),
            "@a[6][啊]:不啊".to_string(),
            "@a[]:成功".to_string(),
            "%a%".to_string(),
        ];

        let mut ctx = crate::interpreter::DicContext::new();
        ctx.sys.source_file = "test".to_string();

        let stmts = parse_stmts(&source, false, 0, &ctx.sys.source_file)
            .expect("parse should succeed");

        // 执行
        exec_stmts(&mut ctx, &stmts, None);

        let output = ctx.output.get();

        // 验证：不应有 JSON 解析错误
        assert!(ctx.sys.error.is_none(), "unexpected error: {:?}", ctx.sys.error);

        // 输出应该是修改后的 JSON 数组
        let parsed: serde_json::Value = serde_json::from_str(&output)
            .expect("output should be valid JSON");

        // 验证 a[6]["啊"] == "不啊"
        if let Some(obj) = parsed.get(6) {
            let val = obj.get("啊").and_then(|v| v.as_str()).unwrap_or("");
            assert_eq!(val, "不啊");
        } else {
            panic!("a[6] not found");
        }

        // 验证 @a[]:成功 追加成功
        let last_idx = parsed.as_array().map(|a| a.len()).unwrap_or(0) - 1;
        let pushed = parsed.get(last_idx).and_then(|v| v.as_str()).unwrap_or("");
        assert_eq!(pushed, "成功");
    }

    #[test]
    fn test_json_object_with_nested_push() {
        // 模拟当前 dic.nr [f]main: 对象嵌套数组追加
        let source = vec![
            "c:{\"a\":\"b\"}".to_string(),
            "b:123".to_string(),
            "a:{".to_string(),
            "    a:b".to_string(),
            "    a:c".to_string(),
            "    b:[]".to_string(),
            "}".to_string(),
            "@a[b][]:成功".to_string(),
            "%a%".to_string(),
        ];

        let mut ctx = crate::interpreter::DicContext::new();
        ctx.sys.source_file = "test".to_string();

        let stmts = parse_stmts(&source, false, 0, &ctx.sys.source_file)
            .expect("parse should succeed");

        exec_stmts(&mut ctx, &stmts, None);

        let output = ctx.output.get();

        assert!(ctx.sys.error.is_none(), "unexpected error: {:?}", ctx.sys.error);

        let parsed: serde_json::Value = serde_json::from_str(&output)
            .expect("output should be valid JSON");

        // 验证 b 键是数组 ["成功"]
        let b_arr = parsed.get("b").and_then(|v| v.as_array())
            .expect("key 'b' should be an array");
        assert_eq!(b_arr.len(), 1);
        assert_eq!(b_arr[0].as_str().unwrap(), "成功");

        // 验证重复键 a 合并为数组 ["b","c"]
        let a_arr = parsed.get("a").and_then(|v| v.as_array())
            .expect("key 'a' should be an array (duplicate keys merged)");
        assert_eq!(a_arr.len(), 2);
        assert_eq!(a_arr[0].as_str().unwrap(), "b");
        assert_eq!(a_arr[1].as_str().unwrap(), "c");
    }

    #[test]
    fn trace_json_array_flow() {
        // 模拟 dic.nr [f]main 中的 JSON 数组
        let parts = vec![
            "a,",
            "b,",
            "%b%,",
            "::%b%,",
            "%c%,",
            "啊:啊,",
            "啊::啊,",
        ];
        
        // 步骤 1：build_json_value
        match build_json_value(&parts, "[", 1, 0, "test") {
            Ok(json_str) => {
                // 步骤 2：验证 serde_json 能否解析
                let _ = serde_json::from_str::<serde_json::Value>(&json_str);
            }
            Err(_) => {}
        }
    }
}
