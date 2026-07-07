# $net.切换POST$ — 切换到 POST 方法

导入：`net:#引入=@访问` | 标准库函数。

- **签名**：`$net.切换POST [handle] [body]$`
- **参数**：请求句柄、请求体
- **返回值**：无

将请求方法设置为 POST 并传入请求体。

```
$net.切换POST %req% {"key":"value"}$
```