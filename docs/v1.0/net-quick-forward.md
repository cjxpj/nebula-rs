# $访问转发$ — 转发请求

基础函数 | 无需导入。

<dl>
  <dt>签名</dt><dd><code>$访问转发 [url]$</code></dd>
  <dt>参数</dt><dd>目标 URL</dd>
  <dt>返回值</dt><dd>转发后的响应</dd>
</dl>

仅在 `$启动服务器$` 的 HTTP 模式下可用，需读取 `_DATA` 变量获取原始请求数据。

```
$访问转发 https://backend.internal/api$
```

> 仅在 `$启动服务器$` 的 HTTP 模式下可用。