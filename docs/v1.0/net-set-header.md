# $net.设置头部$ — 设置请求头

导入：`net:#引入=@访问` | 标准库函数。

- **签名**：`$net.设置头部 [handle] [json_headers]$`
- **参数**：请求句柄、JSON 格式的请求头键值对
- **返回值**：无

以 JSON 对象格式设置 HTTP 请求头。

```
$net.设置头部 %req% {"Authorization":"Bearer xxxx","Content-Type":"application/json"}$
```