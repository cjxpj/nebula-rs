# DAP 调试

Nebula 引擎内置了 Debug Adapter Protocol（DAP）服务，支持在 VS Code 中对 `.nr` 脚本进行断点调试、单步执行和变量查看。

## 启动调试

```bash
nebula --debug [文件路径]
```

如果启动时指定了文件路径，引擎会立即加载文件并等待 VS Code 连接。也可以在 VS Code 的 `launch.json` 中指定 `program` 字段，由调试器在运行时传入文件路径。

## 调试功能

### 断点

在 VS Code 编辑器中点击行号左侧的空白区域即可设置断点。断点命中时执行暂停：

- 断点基于**文件路径 + 行号**定位
- 支持同时设置多个断点
- 每次暂停时，调试控制台中会显示暂停位置的文件名和行号

### 单步执行

| 操作 | 快捷键 (VS Code) | 说明 |
|------|-----------------|------|
| 继续 (Continue) | `F5` | 恢复执行直到下一个断点 |
| 单步跳过 (Step Over) | `F10` | 执行当前行，不进入函数内部 |
| 单步进入 (Step In) | `F11` | 进入函数调用内部 |
| 单步跳出 (Step Out) | `Shift+F11` | 执行完当前函数并返回到调用方 |
| 暂停 (Pause) | `Ctrl+Shift+F5` | 暂停正在运行的脚本 |

### 调用栈

暂停时，VS Code 的"调用堆栈"面板会显示完整的函数调用链：

- 每层栈帧显示**函数名**、**文件名**和**行号**
- 点击不同栈帧可切换当前查看的作用域

### 变量查看

暂停时，"变量"面板会展示当前作用域链中的所有变量：

- **作用域层级**：按作用域链从局部到全局分层显示
- **嵌套变量**：点号分隔的变量（如 `obj.field1.field2`）会自动展开为树形结构
- **值截断**：超过 200 字符的变量值会自动截断，保留前 200 字符

### 输出事件

脚本运行期间，`$打印$` 等输出会实时显示在 VS Code 的调试控制台中。

## VS Code 配置

### 安装语法高亮扩展

下载并安装 VS Code 语法高亮扩展（`.vsix`）：

1. 下载 [nr-language-0.1.1.vsix](../vscode-nr/nr-language-0.1.1.vsix)
2. VS Code 中按 `Ctrl+Shift+P`，输入 "Extensions: Install from VSIX..."
3. 选择下载的 `.vsix` 文件

### launch.json 配置

在项目根目录创建 `.vscode/launch.json`：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "nebula",
      "request": "launch",
      "name": "调试 .nr 脚本",
      "program": "${workspaceFolder}/主脚本.nr"
    }
  ]
}
```

## 架构说明

DAP 调试采用**双线程架构**：

| 线程 | 职责 |
|------|------|
| 主线程 | DAP 消息循环，通过 stdin/stdout 与 VS Code 通信 |
| 执行器线程 | 运行 NR 脚本，通过 mpsc channel 与主线程协调 |

每条语句执行前，执行器线程会检查是否遇到断点或步进命令，决定是否暂停。暂停期间执行器线程阻塞等待恢复命令，主线程持续响应 VS Code 的消息请求（如读取变量、调用栈等）。

### 步进语义

| 命令 | 实现逻辑 |
|------|----------|
| Step Over | 在同深度或更浅的调用层级暂停 |
| Step In | 下一条语句立即暂停。如果当前不是函数调用，行为等同于 Step Over |
| Step Out | 在深度小于起始深度的层级暂停 |

## DAP 协议支持能力

| 能力 | 支持 |
|------|------|
| 断点设置/移除 | 支持 |
| 条件断点 | 不支持 |
| 命中计数断点 | 不支持 |
| Function Breakpoints | 不支持 |
| Logpoints | 不支持 |
| Set Variable | 不支持 |
| Evaluate for Hovers | 不支持 |

[← 内置函数](./flow-output) [命令行工具 →](./cli)
