<p align="center">
  <h1 align="center">Nebula</h1>
  <p align="center">
    <img src="https://img.shields.io/badge/Rust-2021%20edition-orange?logo=rust" alt="Rust">
    <img src="https://img.shields.io/badge/license-CC%20BY--NC%204.0-blue" alt="License">
    <img src="https://img.shields.io/badge/version-0.1.1-green" alt="Version">
  </p>
  <p align="center">基于 Rust 的词库引擎 / NR 语言解释器</p>
</p>

---

Nebula 是一个轻量级的文本处理 DSL 解释器，通过读取 `.nr` 脚本文件，以触发词匹配的方式执行文本处理逻辑。适用于聊天机器人、互动小说、自动化文本生成等场景。

## 快速开始

**前置要求：** Rust 1.70+ ([rustup.rs](https://rustup.rs))

```bash
git clone https://github.com/cjxpj/nebula-rs.git
cd nebula
cargo run
```

## 命令行

```bash
nebula <文件.nr>               # 批处理模式（执行 [f]main）
nebula -i <文件.nr>            # 交互 REPL 模式
nebula --debug [文件.nr]       # DAP 调试模式（VS Code 断点调试）
nebula --check-update [-c]     # 检测新版本
nebula --update [-u]           # 自动更新
nebula -h, --help              # 显示帮助
```

## 项目结构

```
src/
├── main.rs          # 入口、CLI 参数解析
├── parser.rs        # .nr 词库文件解析
├── interpreter.rs   # 核心状态机解释器
├── executor.rs      # AST 语句执行与表达式求值
├── value.rs         # 变量存储、%变量% 替换、Base64、JSON 导航
├── ast.rs           # AST 节点与操作符定义
├── count.rs         # [...] 数学表达式求值
├── analyzer.rs      # 赋值操作符检测、转义处理
├── iftext.rs        # 条件表达式求值（短路）
├── functions.rs     # 内置函数注册、OOP 实例池
├── canvas.rs        # 像素画布与图像生成
├── dap.rs           # DAP 调试适配器（VS Code 断点调试）
├── updater.rs       # 自动更新（GitHub Releases）
└── file_lock.rs     # 文件锁（并发文件访问）
```

## 文档

完整语言参考手册：[**在线文档**](https://cjxpj.github.io/nebula-rs/)

| 章节 | 内容 |
|---|---|
| [词法结构](https://cjxpj.github.io/nebula-rs/#/v0.1.0/lexical) | 源文件结构、注释、转义、多行字符串 |
| [类型系统](https://cjxpj.github.io/nebula-rs/#/v0.1.0/types) | 整数/浮点/字符串/布尔/对象/函数 |
| [变量与赋值](https://cjxpj.github.io/nebula-rs/#/v0.1.0/variables) | 作用域、操作符、内置变量 |
| [表达式](https://cjxpj.github.io/nebula-rs/#/v0.1.0/expressions) | 数学运算、比较、逻辑运算 |
| [控制流](https://cjxpj.github.io/nebula-rs/#/v0.1.0/control-flow) | 条件分支、循环、中断与跳转 |
| [词条系统](https://cjxpj.github.io/nebula-rs/#/v0.1.0/entries) | 普通词条、内部词条、类词条 |
| [函数](https://cjxpj.github.io/nebula-rs/#/v0.1.0/functions) | 定义语法、参数、初始化、main 入口 |
| [JSON 数据处理](https://cjxpj.github.io/nebula-rs/#/v0.1.0/json) | 内联 JSON、导航读写 |
| [面向对象](https://cjxpj.github.io/nebula-rs/#/v0.1.0/oop) | 类定义、实例化、方法调用 |
| [模块与引入](https://cjxpj.github.io/nebula-rs/#/v0.1.0/modules) | 文件/目录引入、热更新、星号引入 |
| [内置函数](https://cjxpj.github.io/nebula-rs/#/v0.1.0/flow-output) | 流程控制、输出、标准库 |
| [DAP 调试](https://cjxpj.github.io/nebula-rs/#/v0.1.0/debug) | VS Code 断点调试、单步执行、变量查看 |
| [命令行工具](https://cjxpj.github.io/nebula-rs/#/v0.1.0/cli) | 批处理、REPL、自动更新 |

## 许可证

Copyright (c) 2025 保留所有权利。

本软件及其文档仅限非商业用途使用。详细条款见 [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)。
