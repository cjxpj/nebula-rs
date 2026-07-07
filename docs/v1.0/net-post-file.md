# $net.POST文件$ — 设置文件上传

导入：`net:#引入=@访问` | 标准库函数。

- **签名**：`$net.POST文件 [handle] [field] [data] [filename]$`
- **参数**：请求句柄、表单字段名、文件数据、文件名
- **返回值**：无

通过 multipart/form-data 上传文件。

```
$net.POST文件 %req% file %file_content% upload.txt$
```