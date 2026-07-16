# 命令行工具

Nebula 引擎提供多种命令行运行模式，支持批处理、交互式 REPL、DAP 调试和自动更新。

## 运行模式

### 批处理模式

```bash
nebula <文件.nr>
```

加载并执行 `.nr` 脚本文件，自动调用 `[f]main` 函数并将输出打印到标准输出。

```
nebula main.nr
```

### 交互 REPL 模式

```bash
nebula -i <文件.nr>
```

加载脚本后进入交互式 REPL（Read-Eval-Print Loop），逐行输入触发词并实时查看匹配结果。

```
nebula -i main.nr
Nebula REPL
>>> hello
你好，世界！
>>> quit
```

REPL 模式下：
- 每行输入作为触发词进行主词条匹配
- 匹配结果实时打印
- 空行跳过
- 按 `Ctrl+C` 退出

### DAP 调试模式

```bash
nebula --debug [文件.nr]
```

启动 Debug Adapter Protocol 服务，通过 stdin/stdout 与 VS Code 通信。支持断点调试、单步执行和变量查看。

```
nebula --debug main.nr
```

文件路径可选：不指定时可以通过 VS Code 的 `launch.json` 在运行时传入。

详见 [DAP 调试](./debug)。

## 更新命令

Nebula 内置了自动更新功能，从 GitHub Releases 检测并下载新版本。

### 检测更新

```bash
nebula --check-update
nebula -c
```

查询 [GitHub Releases](https://github.com/cjxpj/nebula-rs/releases) 的最新版本，与当前版本对比：

- **有新版本**：显示当前版本、最新版本号、更新内容和可下载文件列表
- **已是最新**：显示"已是最新版本"

### 自动更新

```bash
nebula --update
nebula -u
```

下载最新版本并替换当前程序：

1. 检测 GitHub Releases 是否有新版本
2. 自动匹配当前平台的资源文件（Windows / macOS / Linux）
3. 下载新版本程序
4. 替换旧文件并退出

```
nebula --update
正在更新: v0.1.0 -> v0.1.1
  下载中: https://github.com/cjxpj/nebula-rs/releases/download/...
  下载完成 (1234567 字节)
更新已启动，正在退出当前进程...
```

**Windows 平台**：通过批处理脚本实现文件替换——旧进程退出后，脚本等待 2 秒，将新文件覆盖旧文件，然后重新启动。

**Linux/macOS 平台**：直接通过 `rename` 原子替换文件，然后重启进程。

### 指定更新资源

```bash
nebula --update --asset <关键词>
```

当同一版本有多个平台的资源文件时，可通过 `--asset` 参数指定下载匹配名称的资源。默认自动根据当前操作系统选择。

```
nebula --update --asset x86_64
```

### 更新选项

| 选项 | 简写 | 说明 |
|------|------|------|
| `--check-update` | `-c` | 检测新版本，不下载 |
| `--update` | `-u` | 下载并安装最新版本 |
| `--asset` | | 指定下载资源的匹配关键词 |

## 帮助

```bash
nebula -h
nebula --help
```

显示版本号和用法说明：

```
Nebula 脚本引擎 v0.1.1

用法:
  nebula <文件路径>              批处理模式（执行 main 函数）
  nebula -i <文件路径>           交互 REPL 模式

更新命令:
  nebula --check-update [-c]     检测是否有新版本
  nebula --update [-u]           下载并安装最新版本

更新选项:
  --asset <关键词>              指定下载资源的匹配关键词

其他:
  nebula -h, --help              显示帮助
```

[← DAP 调试](./debug)
