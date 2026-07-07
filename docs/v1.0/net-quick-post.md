# $访问POST$ — POST 请求

基础函数 | 无需导入。

<dl>
  <dt>签名</dt><dd><code>$访问POST [url] [body] [headers_json]$</code></dd>
  <dt>参数</dt><dd>URL、请求体、可选的 JSON 格式请求头</dd>
  <dt>返回值</dt><dd>响应体文本；失败返回空字符串</dd>
</dl>

发起 HTTP POST 请求，默认超时 15 秒。

```
$访问POST https://httpbin.org/post {"key":"value"}$
$访问POST https://httpbin.org/post {"key":"value"} {"Authorization":"Bearer xxx"}$
```

> 快捷函数适合快速调用，复杂场景请使用 @访问 状态机 API。