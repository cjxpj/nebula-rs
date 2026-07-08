# 访问 · @访问

NR 提供两种 HTTP 客户端调用方式：**快捷函数**（基础函数，一行完成）和 **@访问 状态机 API**（标准库，精细控制请求的每个阶段）。

## 网络访问概述

两种调用方式对比：

- **快捷函数**：`$访问$`、`$访问POST$`、`$访问转发$` — 基础函数，无需导入，一行完成的简化调用。适合简单场景。
- **@访问 状态机 API**：精细控制请求的每个阶段——创建、切换方法、设置头部/超时、发送、读取结果。适合需要定制请求细节的复杂场景。

## @访问

导入：`net:#引入=@访问` | 共 12 个状态机函数。快捷函数（无需导入）：`$访问$`、`$访问POST$`（见访问章节）

`@访问` 模块提供**状态机模式**的 HTTP 客户端：先创建请求对象，逐步配置（方法/头部/超时/文件），最后发送并读取结果。

**状态机流程**：新建 → 切换GET/POST → 设置头部 → 设置超时 → 发送 → 内容

### 状态机生命周期

每个 `$net.新建$` 创建的请求句柄代表一个独立的 HTTP 请求状态机。状态机转移路径如下：

| 阶段 | 操作 | 说明 |
| --- | --- | --- |
| 1. 创建 | `$net.新建 url$` | 初始化请求对象，默认 GET 方法 |
| 2. 配置方法 | `$net.切换GET$` / `$net.切换POST$` / `$net.POST$` / `$net.POST文件$` | 设置 HTTP 方法和请求体 |
| 3. 配置选项 | `$net.设置头部$` / `$net.设置超时$` / `$net.启用跳转$` / `$net.禁用跳转$` | 设置头部、超时、重定向策略 |
| 4. 执行 | `$net.发送$` | 实际发起网络请求（阻塞） |
| 5. 读取 | `$net.内容$` / `$net.全部内容$` | 获取响应体 |

同一请求句柄只能发送一次，发送后不可修改配置。

<a id="net-create"></a>

### `$net.新建$` — 创建请求对象

- **格式**：`$net.新建 [url]$`
- **参数**：目标 URL
- **返回值**：请求句柄

初始化 HTTP 请求状态机，默认 GET 方法。

```
req:$net.新建 https://httpbin.org/post$
```

<a id="net-switch-get"></a>

### `$net.切换GET$` — 切换到 GET 方法

- **格式**：`$net.切换GET [handle]$`
- **参数**：请求句柄
- **返回值**：无

将请求方法设置为 GET。

```
$net.切换GET %req%$
```

<a id="net-switch-post"></a>

### `$net.切换POST$` — 切换到 POST 方法

- **格式**：`$net.切换POST [handle] [body]$`
- **参数**：请求句柄、请求体
- **返回值**：无

将请求方法设置为 POST 并传入请求体。

```
$net.切换POST %req% {"key":"value"}$
```

<a id="net-post"></a>

### `$net.POST$` — 设置 POST 请求体

- **格式**：`$net.POST [handle] [body]$`
- **参数**：请求句柄、请求体
- **返回值**：无

在已切换到 POST 的状态机上设置请求体。

```
$net.POST %req% {"name":"Alice","age":25}$
```

<a id="net-post-file"></a>

### `$net.POST文件$` — 设置文件上传

- **格式**：`$net.POST文件 [handle] [field] [data] [filename]$`
- **参数**：请求句柄、表单字段名、文件数据、文件名
- **返回值**：无

通过 multipart/form-data 上传文件。

```
$net.POST文件 %req% file %file_content% upload.txt$
```

### `$net.启用跳转$` / `$net.禁用跳转$` — 控制重定向

- **格式**：`$net.启用跳转 [handle]$` / `$net.禁用跳转 [handle]$`
- **参数**：请求句柄
- **返回值**：无

启用或禁用 HTTP 重定向跟随。

```
$net.启用跳转 %req%$
$net.禁用跳转 %req%$
```

<a id="net-set-header"></a>

### `$net.设置头部$` — 设置请求头

- **格式**：`$net.设置头部 [handle] [json_headers]$`
- **参数**：请求句柄、JSON 格式的请求头键值对
- **返回值**：无

以 JSON 对象格式设置 HTTP 请求头。

```
$net.设置头部 %req% {"Authorization":"Bearer xxxx","Content-Type":"application/json"}$
```

<a id="net-set-timeout"></a>

### `$net.设置超时$` — 设置超时

- **格式**：`$net.设置超时 [handle] [seconds]$`
- **参数**：请求句柄、超时秒数
- **返回值**：无

设置请求超时时间（秒）。默认无超时限制。

```
$net.设置超时 %req% 30$
```

<a id="net-send"></a>

### `$net.发送$` — 发送请求

- **格式**：`$net.发送 [handle]$`
- **参数**：请求句柄
- **返回值**：无

实际发起网络请求（阻塞）。发送后不可修改配置。

```
$net.发送 %req%$
```

<a id="net-content-all"></a>

### `$net.全部内容$` — 读取全部响应内容

- **格式**：`$net.全部内容 [handle]$`
- **参数**：请求句柄
- **返回值**：完整响应 JSON（含状态码、头部、data 字段）

> 注意：`data` 字段中的敏感数据（如 HTML 页面、二进制内容等）会被自动替换为 `"已屏蔽"`。需要原始响应体请使用 `$net.内容$`。

```
$net.全部内容 %req%$
```

<a id="net-content"></a>

### `$net.内容$` — 读取响应内容

- **格式**：`$net.内容 [handle]$`
- **参数**：请求句柄
- **返回值**：响应体内容

```
body:$net.内容 %req%$
```

### 状态机完整示例

```
net:#引入=@访问

[函数]post_json
req:$net.新建 https://httpbin.org/post$
$net.切换POST %req%$
$net.设置头部 %req% {"Content-Type":"application/json"}$
$net.POST %req% {"name":"Alice"}$
$net.设置超时 %req% 10$
$net.发送 %req%$
result:$net.内容 %req%$
```

## 访问

无需导入，始终可用 | 共 3 个函数

### User-Agent 说明

快捷函数（`$访问$`、`$访问POST$`）默认发送 `User-Agent: Nebula-Client/1.0` 请求头。如果目标服务器要求特定 User-Agent，可通过 headers 参数覆盖：

```
$访问 https://httpbin.org/headers {"User-Agent":"MyApp/2.0"}$
```

状态机模式（`@访问`）不自动添加 User-Agent，需通过 `$net.设置头部$` 手动指定。

### 超时与错误处理

`$访问$` 和 `$访问POST$` 默认超时为 15 秒，超时后返回空字符串。状态机模式默认无超时限制，需通过 `$net.设置超时$` 显式设置。

当网络请求因以下原因失败时，所有访问函数均返回**空字符串**：

- DNS 解析失败
- 连接被拒绝（目标端口未开放）
- 超时（仅当设置了超时限制）
- TLS/SSL 握手失败
- HTTP 状态码 4xx/5xx（响应体仍然返回，不会因状态码而报错）

### `$访问$` — GET 请求

- **格式**：`$访问 [url] [headers_json]$`
- **参数**：URL、可选的 JSON 格式请求头
- **返回值**：响应体文本；失败返回空字符串

发起 HTTP GET 请求。自动补全 `http://` 前缀，默认 User-Agent: `Nebula-Client/1.0`，超时 15 秒。

```
$访问 https://httpbin.org/ip$
$访问 https://httpbin.org/headers {"Authorization":"Bearer xxx"}$
```

### `$访问POST$` — POST 请求

- **格式**：`$访问POST [url] [body] [headers_json]$`
- **参数**：URL、请求体、可选的 JSON 格式请求头
- **返回值**：响应体文本；失败返回空字符串

发起 HTTP POST 请求，默认超时 15 秒。

```
$访问POST https://httpbin.org/post {"key":"value"}$
$访问POST https://httpbin.org/post {"key":"value"} {"Authorization":"Bearer xxx"}$
```

### `$访问转发$` — 转发请求

- **格式**：`$访问转发 [url]$`
- **参数**：目标 URL
- **返回值**：转发后的响应

仅在 `$启动服务器$` 的 HTTP 模式下可用，需读取 `_DATA` 变量获取原始请求数据。

```
$访问转发 https://backend.internal/api$
```

> 仅在 `$启动服务器$` 的 HTTP 模式下可用。

> 状态机模式提供完整控制，快捷函数适合快速调用。所有请求失败时返回空字符串而非抛异常。网络操作是阻塞的，注意超时设置。配合 [启动服务器](./server) 可构建完整 Web 服务。

[← @数学](./math)

[@类型 →](./type)
