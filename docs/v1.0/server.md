# 服务器

内置函数 | 共 1 个函数。`$启动服务器$` 启动 TCP/HTTP 双栈服务器，自动检测协议。

### `$启动服务器$` — TCP/HTTP 服务器

<dl>
  <dt>格式</dt><dd><code>$启动服务器 [端口] [处理函数]$</code></dd>
  <dt>参数</dt><dd>监听端口（默认 8080）、可选的处理函数名或变量</dd>
  <dt>返回值</dt><dd>无（阻塞运行，持续监听）</dd>
</dl>

启动 TCP 服务器，监听 `0.0.0.0:端口`，自动检测每个连接的协议类型：

```
$启动服务器 8080 handle$
$启动服务器 3000$                   ← 省略处理函数，直接按触发词匹配
$启动服务器 8080 %handler_var%$     ← 通过变量动态指定处理函数
```

## HTTP 模式 vs TCP 模式

| 特性 | HTTP 模式 | TCP 模式 |
| --- | --- | --- |
| 检测方式 | 请求首行匹配 HTTP 方法（GET/POST/PUT/DELETE/HEAD/OPTIONS/PATCH） | 首行不匹配 HTTP 方法 |
| 触发词来源 | 请求路径（含查询参数，如 `/api/user?id=1`） | 首行原始内容 |
| 响应格式 | 标准 HTTP/1.1 响应（状态行 + 头部 + 正文） | 原始文本，无 HTTP 包装 |
| 连接模型 | 每个请求一个连接（短连接） | 持续交互（长连接），逐行读写 |
| `_DATA` 变量 | 包含完整 HTTP 请求数据 | 不适用 |
| 适用场景 | Web API、网页服务 | 自定义协议、聊天服务、Telnet 应用 |

- **HTTP 模式**：请求路径作为触发词，`%触发%` 为完整路径（含查询参数）
- **TCP 模式**：首行作为触发词，后续行持续交互（长连接）
- 处理函数可选，不指定时直接按触发词匹配主词条

## HTTP 模式

### 支持的 HTTP 方法

GET、POST、PUT、DELETE、HEAD、OPTIONS、PATCH 均自动识别。

### 请求变量

在 HTTP 模式下，服务器自动设置以下变量，可在处理函数或词条中直接使用：

| 变量 | 内容 | 说明 |
| --- | --- | --- |
| `%触发%` | `/api/user?id=1` | 完整请求路径（含查询参数） |
| `%_路径%` | `/api/user` | 路径部分（不含查询参数） |
| `%_GET%` | `{"id":"1"}` | URL 查询参数，JSON 对象格式 |
| `%_POST%` | `{"name":"Alice"}` | POST/PUT/PATCH 请求体，自动解析 JSON；非 JSON 内容包装为 `{"raw":"..."}` |
| `%_头部%` | `{"Content-Type":"application/json"}` | 所有请求头，JSON 对象格式 |
| `%_DATA%` | JSON 聚合对象 | 包含 method、path、header、get、post 字段的完整请求数据 |
| `%self%` | 处理函数名 | 当前被调用的处理函数名称 |

`_DATA` 结构示例：

```json
{
  "method": "POST",
  "path": "/api/user",
  "header": {"Content-Type": "application/json", "Authorization": "Bearer xxx"},
  "get": {"page": "1"},
  "post": {"name": "Alice", "age": 25}
}
```

### 响应控制

可通过以下变量自定义 HTTP 响应：

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `%_状态码%` | `200` | 自定义 HTTP 状态码 |
| `%_设置头部%` | `{}` | 自定义响应头，JSON 对象格式 |

默认响应头包含：
- `Content-Type: text/plain; charset=utf-8`
- `Access-Control-Allow-Origin: *`（CORS 跨域支持）
- `Connection: close`

### 支持的状态码

200、201、204、301、302、304、400、401、403、404、405、500、502、503。

### 处理函数

HTTP 模式下支持指定处理函数，每次请求调用该函数：

```
[函数]handle
method:[%_DATA%、"method"]
path:[%_路径%]
name:[%_POST%、"name"]
```

- 处理函数名可直接写，也可通过变量传递：`$启动服务器 8080 %func_name%$`
- 变量值会在每次请求时动态解析，支持运行时切换处理逻辑
- 不指定处理函数时，请求路径直接作为触发词匹配词条

### 完整示例

```
; === 启动服务器 ===
[f]main
$启动服务器 8080 handler$

[函数]handler
$如果 %_路径% == /api/hello
  你好，[%_GET%、"name"]

$如果 %_路径% == /api/json
  $_状态码%:201$
  $_设置头部%:{"X-Custom":"value"}$
  {"status":"ok","data":[%_POST%]}
```

用 curl 测试：

```
curl http://localhost:8080/api/hello?name=世界
→ 你好，世界

curl -X POST http://localhost:8080/api/json -d '{"msg":"hello"}'
→ {"status":"ok","data":{"msg":"hello"}}
（状态码 201，含自定义响应头 X-Custom: value）
```

### 请求转发

在 HTTP 模式下可使用 `$访问转发$` 将请求转发到后端服务：

```
[函数]handler
$如果 %_路径% == /api/users
  $访问转发 https://backend.internal/api/users$
```

> 转发时读取 `_DATA` 变量获取原始请求数据。详见 [@访问](./network#net-访问转发)。

## TCP 模式

TCP 模式下不匹配 HTTP 方法的连接将进入**长连接**模式：

- **第一行**作为触发词进行首次匹配
- **后续每行**持续作为新触发词，逐行读取→匹配→输出
- 连接持续直到客户端断开或发送空行

适用于自定义文本协议、Telnet 聊天服务等场景。

```
; === TCP 长连接示例 ===
[f]main
$启动服务器 2323$

hello
你好！输入 help 查看帮助。

help
可用命令：hello, time, quit

time
当前时间：%time%
```

用 telnet 测试：

```
telnet localhost 2323
> hello
你好！输入 help 查看帮助。
> time
当前时间：2025-...
```

> 服务器自动检测 HTTP/TCP，HTTP 模式返回标准响应，TCP 模式支持长连接逐行交互。配合 [@访问](./network) 可构建完整 Web 服务。

[← 输出](./output-print) [对象创建 →](./object)
