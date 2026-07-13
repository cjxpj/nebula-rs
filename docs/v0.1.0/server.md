# 服务器

内置函数 | 共 3 个（`$创建服务器$`、`.静态`、`.启动`）。支持 OOP 风格启动 TCP/HTTP 双栈服务器，可配置静态文件服务。

## OOP 风格

```
$s:创建服务器$                  # 创建服务器对象，返回 0x 指针句柄
$s.静态 本地目录 网络路径$       # 配置静态文件服务（网络路径可留空=根路径）
$s.启动 端口 处理函数$           # 启动服务器开始监听
```

### `$创建服务器$` — 创建服务器对象

<dl>
  <dt>格式</dt><dd><code>$var:创建服务器$</code></dd>
  <dt>参数</dt><dd>无</dd>
  <dt>返回值</dt><dd>服务器实例句柄（<code>0x</code> 开头十六进制指针），存入指定变量</dd>
</dl>

创建一个服务器 OOP 实例，默认端口 8080，未配置静态目录和处理函数。实例存储在引擎统一的指针池中，通过引用计数管理生命周期。

```
$s:创建服务器$
$打印 服务器句柄：%s%$     # → 服务器句柄：0x1a2b3c4d
```

### `.静态` — 配置静态文件目录

<dl>
  <dt>格式</dt><dd><code>$s.静态 本地目录 [网络路径]$</code></dd>
  <dt>参数</dt><dd>本地文件目录路径、可选的网络 URL 路径（留空 = 根路径 <code>/</code>）</dd>
  <dt>返回值</dt><dd>无</dd>
</dl>

配置后，服务器启动时会自动处理匹配的静态文件请求：

- 网络路径为空时，所有 URL 路径映射到本地目录（如 `/style.css` → `本地目录/style.css`）
- 指定网络路径时，仅匹配该前缀的 URL（如 `/assets/style.css` → `本地目录/style.css`）
- 自动识别 MIME 类型（HTML、CSS、JS、图片、字体等）
- 目录请求自动查找 `index.html`
- 文件不存在时，尝试返回 `404.html`（HTTP 404 状态码）
- 无 `404.html` 时回退到路由处理

```
$s.静态 public$             # 本地 public/ → 网络根路径 /
$s.静态 public assets$      # 本地 public/ → 网络路径 /assets/
```

### `.启动` — 启动服务器

<dl>
  <dt>格式</dt><dd><code>$s.启动 [端口] [处理函数]$</code></dd>
  <dt>参数</dt><dd>监听端口（默认 8080）、可选的处理函数名或变量</dd>
  <dt>返回值</dt><dd>无（阻塞运行，持续监听）</dd>
</dl>

启动服务器监听 `0.0.0.0:端口`。传入的参数会覆盖创建时的默认配置。

```
$s.启动 8080 %func@路由%$     # 端口 8080，路由处理函数
$s.启动 3000$                 # 端口 3000，无处理函数
```

### OOP 完整示例

```
[函数]main
$s:创建服务器$
$s.静态 数据/静态$
$s.启动 8080 route$

[函数]route
$如果 %_路径% == /api/hello
  你好，[%_GET%、"name"]

$如果 %_路径% == /api/json
  $_状态码%:201$
  {"status":"ok","data":[%_POST%]}
```

## 静态文件服务

通过 OOP 风格的 `.静态` 方法配置静态文件目录。服务器收到 HTTP 请求时，优先检查请求路径是否匹配网络路径：

- 网络路径为空 → 所有 URL 映射到本地目录（如 `/style.css` → `public/style.css`）
- 指定网络路径 → 仅匹配该前缀的 URL（如 `/assets/js/app.js` → `public/js/app.js`）
- 目录请求（如 `/` 或 `/assets/`）→ 自动查找 `index.html`
- 文件不存在 → 尝试返回 `404.html`（HTTP 404），无则交由路由处理

### 路由判断示例

以 `$s.静态 public assets$` 为例（网络路径 = `assets`）：

| 请求 URL | 匹配结果 | 文件路径 | 说明 |
| --- | --- | --- | --- |
| `/assets/style.css` | 匹配 | `public/style.css` | 文件存在则返回 |
| `/assets/js/app.js` | 匹配 | `public/js/app.js` | 子目录正常映射 |
| `/assets` | 匹配 | `public/index.html` | 精确匹配 → 自动查找 index |
| `/assets/` | 匹配 | `public/index.html` | 目录请求 → 自动查找 index |
| `/assets/404.html` | 匹配 | `public/404.html` | 不存在 → 触发 404.html |
| `/assetssomething/x.js` | 不匹配 | — | 前缀边界检查，交由路由 |
| `/api/data` | 不匹配 | — | 非静态前缀，交由路由 |

以 `$s.静态 public$` 为例（网络路径 = 空，根路径）：

| 请求 URL | 匹配结果 | 文件路径 | 说明 |
| --- | --- | --- | --- |
| `/style.css` | 匹配 | `public/style.css` | 根路径：所有 URL 都匹配 |
| `/` | 匹配 | `public/index.html` | 目录请求 → 自动查找 index |
| `/api/data` | 匹配 | `public/api/data` | 不存在 → 404.html → 路由 |

### 支持的 MIME 类型

| 扩展名 | Content-Type |
| --- | --- |
| `.html` `.htm` | `text/html; charset=utf-8` |
| `.css` | `text/css; charset=utf-8` |
| `.js` | `application/javascript; charset=utf-8` |
| `.json` | `application/json; charset=utf-8` |
| `.png` | `image/png` |
| `.jpg` `.jpeg` | `image/jpeg` |
| `.gif` | `image/gif` |
| `.svg` | `image/svg+xml` |
| `.ico` | `image/x-icon` |
| `.woff` `.woff2` | `font/woff` / `font/woff2` |
| `.ttf` | `font/ttf` |
| `.wasm` | `application/wasm` |
| `.txt` | `text/plain; charset=utf-8` |
| 其他 | `application/octet-stream` |

```
; === 静态文件服务示例 ===
[函数]main
$s:创建服务器$
$s.静态 public assets$
$s.启动 8080 router$

[函数]router
$如果 %_路径% == /api/data
  {"data":[1,2,3]}
```

目录结构：
```
public/
  index.html          ← 访问 /assets/ 返回此文件
  style.css           ← 访问 /assets/style.css
  js/app.js           ← 访问 /assets/js/app.js
  images/logo.png     ← 访问 /assets/images/logo.png
```

## HTTP 模式 vs TCP 模式

| 特性 | HTTP 模式 | TCP 模式 |
| --- | --- | --- |
| 检测方式 | 请求首行匹配 HTTP 方法（GET/POST/PUT/DELETE/HEAD/OPTIONS/PATCH） | 首行不匹配 HTTP 方法 |
| 触发词来源 | 请求路径（含查询参数，如 `/api/user?id=1`） | 首行原始内容 |
| 响应格式 | 标准 HTTP/1.1 响应（状态行 + 头部 + 正文） | 原始文本，无 HTTP 包装 |
| 连接模型 | 每个请求一个连接（短连接） | 持续交互（长连接），逐行读写 |
| `_DATA` 变量 | 包含完整 HTTP 请求数据 | 不适用 |
| 静态文件 | 支持（OOP 风格） | 不适用 |
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

### 完整示例

```
; === OOP 风格 ===
[函数]main
$s:创建服务器$
$s.静态 数据/静态$
$s.启动 8080 handler$

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

> 转发时读取 `_DATA` 变量获取原始请求数据。详见 [网络访问](./network#net-访问转发)。

## TCP 模式

TCP 模式下不匹配 HTTP 方法的连接将进入**长连接**模式：

- **第一行**作为触发词进行首次匹配
- **后续每行**持续作为新触发词，逐行读取→匹配→输出
- 连接持续直到客户端断开或发送空行

适用于自定义文本协议、Telnet 聊天服务等场景。

```
; === TCP 长连接示例 ===
[函数]main
$s:创建服务器$
$s.启动 2323$

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

> 服务器自动检测 HTTP/TCP，HTTP 模式返回标准响应，TCP 模式支持长连接逐行交互。配合 [网络访问](./network) 可构建完整 Web 服务。

[← 输出](./output-print) [对象创建 →](./object)
