<p align="center">
  <h1 align="center">Nebula</h1>
  <p align="center">
    <img src="https://img.shields.io/badge/Rust-2021%20edition-orange?logo=rust" alt="Rust">
    <img src="https://img.shields.io/badge/license-CC%20BY--NC%204.0-blue" alt="License">
    <img src="https://img.shields.io/badge/version-0.1.0-green" alt="Version">
  </p>
  <p align="center">基于 Rust 的词库引擎 / 文本处理 DSL 解释器</p>
</p>

---

Nebula 是一个轻量级的文本处理 DSL（领域特定语言）解释器，通过读取 `.nr` / `.n` 脚本文件，以触发词匹配的方式执行文本处理逻辑。适用于聊天机器人、互动小说、自动化文本生成等场景。

## 特性

- **触发词匹配** — 支持正则表达式，按优先级匹配用户输入
- **丰富的变量系统** — 支持全局/局部变量、JSON 路径导航、指针解引用
- **数学表达式** — `[...]` 内支持四则运算、取余、幂运算
- **条件判断** — `==` `!=` `>=` `<=` `~=` `in`，`&&` `||` 短路求值
- **循环与遍历** — `for` 循环、JSON 遍历、条件循环
- **函数调用** — `$func args$` 内联函数与回调
- **多行文本** — `"""..."""` 和 `'''...'''` 文本块
- **画布操作** — 内置像素级图像生成，支持 PNG/JPEG 输出、Base64 编解码

## 快速开始

### 前置要求

- **Rust** 1.70+ ([rustup.rs](https://rustup.rs))

### 构建与运行

```bash
git clone https://github.com/your/nebula.git
cd nebula
cargo run
```

默认运行 `dicTest/dic.nr` 文件。修改 `src/main.rs` 中的 `trigger` 变量切换触发词，或设为空字符串执行全词库。

## 项目结构

```
src/
├── main.rs          # 入口，运行模式控制
├── parser.rs        # .nr 词库文件解析
├── interpreter.rs   # 核心状态机解释器
├── executor.rs      # AST 语句执行与表达式求值
├── value.rs         # 变量存储、%变量% 替换、Base64、JSON 导航
├── ast.rs           # AST 节点与操作符定义
├── count.rs         # [...] 数学表达式求值
├── analyzer.rs      # 赋值操作符检测、转义处理
├── iftext.rs        # 条件表达式求值（支持短路）
├── functions.rs     # 内置函数注册
└── canvas.rs        # 像素画布与图像生成
```

## 基本语法

### 词条

```
触发词
词条内容第一行
词条内容第二行
```

触发词支持正则表达式（如 `.*` 匹配所有输入），按文件顺序优先匹配。

### 变量与赋值

```nr
# 头部变量（全局）
name:World

# 普通赋值（执行 $...$ 和数学表达式）
name:Alice
score:85

# 纯文本赋值（不处理）
greeting::Hello World

# 函数执行后赋值
result:$:calc_score %input%

# 四则运算
score+:5                     # 自增
score-:3                     # 自减
score*:2                     # 乘法
score/:2                     # 除法
score%:3                     # 取余

# 引用变量
%name%                       # 输出变量值

# 特殊变量
%空格%                       # 空格
%换行%                       # 换行
%时间戳%                     # Unix 时间戳（秒）
%毫秒时间戳%                 # Unix 时间戳（毫秒）
%1-100%                      # 随机整数 [1, 100]
%!key%                       # 布尔取反
%?key%                       # 可选变量（不存在时为空）
%B64@key%                    # Base64 解码
%URL编码@key%                # URL 编码
%TYPE@key%                   # 类型查询
%len@key% / %长度@key%       # 字符串长度
%++var% / %--var%            # 自增 / 自减

# 数学表达式
result:[%score% * 2 + 10]
```

### 条件判断

支持 `==` `!=` `>=` `<=` `>` `<` `~=` `in`，逻辑操作符 `&&` `||`（短路求值）。

**行内语法：**

```nr
如果:%score%>=60
及格
否则
不及格
如果尾
```

**块语法：**

```nr
如果>%score%>=90
优秀
>否则如果:%score%>=60
及格
>否则
不及格
<如果
```

### 循环

```nr
# 计数循环
循环>i=5
第%i%行
<循环

# 条件循环
循环>%i%<10
%i%
<循环

# JSON 遍历
遍历>key,val=@jsonData
%key%: %val%
<遍历
```

### JSON 操作

```nr
data:{"name": "Alice", "age": 30}
@data[name]                  # 导航读取 → "Alice"
data[age]:25                 # 导航写入
data:["a", "b"]
data+:c                      # JSON 数组追加
```

### `$...$` 函数调用

```nr
$say_hello %name%$           # 调用内部词条
$回调 pattern arg1 arg2$     # 正则回调
$跳行 [%行数%+2]$            # 跳转到绝对行号
$打印 content$               # 输出不返回
$打印返回 content$           # 输出并返回
```

### 控制指令

| 指令 | 说明 |
|---|---|
| `>终止` | 停止所有执行 |
| `>终止 msg` | 停止并输出消息 |
| `>跳过` | 跳过当前循环 / 遍历 / 判断 |
| `>终止循环` | 跳出循环 |
| `>终止遍历` | 跳出遍历 |

### 多行文本

```nr
text:"""
多行文本内容
支持插入 %变量%
"""

text:'''
单行原样文本
'''
```

### 内部词条与函数

```nr
[内部]say_hello
你好，%参数1%！

[函数]print_num
第%i%行
```

### 注释

```nr
// 单行注释

/* 多行
   注释 */
```

## 完整示例

详见 `dicTest/dic.nr`，包含变量赋值、条件判断、循环、JSON 操作、回调、跳行等全部语法的演示。

## 许可证

Copyright (c) 2025 保留所有权利。

本软件及其文档仅限非商业用途使用。未经著作者书面许可，不得将本软件用于任何商业目的。使用时必须保留原始版权声明和著作者信息。

详细条款见 [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)。
