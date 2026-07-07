# $删前缀$ — 删除前缀 <span class="badge">基础</span>

导入：`#引入=@字符串` | 标准库函数。

<dl>
  <dt>签名</dt><dd><code>$删前缀 [字符串] [前缀]$</code></dd>
  <dt>参数</dt><dd>源字符串、要删除的前缀</dd>
  <dt>返回值</dt><dd>删除前缀后的字符串；不匹配则返回原字符串</dd>
</dl>

```
$删前缀 https://example.com https://$   → "example.com"
```

> 属于基础函数，无需导入即可使用。