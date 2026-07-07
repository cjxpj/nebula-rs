# $net.POST$ — 设置 POST 请求体

导入：`net:#引入=@访问` | 标准库函数。

- **签名**：`$net.POST [handle] [body]$`
- **参数**：请求句柄、请求体
- **返回值**：无

在已切换到 POST 的状态机上设置请求体。

```
$net.POST %req% {"name":"Alice","age":25}$
```