# 加密与编码

共 2 个函数。提供 Ed25519 数字签名和字节级十六进制编码。

## 加密编码概述

NR 的加密函数基于 Ed25519 非对称签名算法。签名流程为：

1. **生成种子**：将密钥字符串截取/填充到 32 字节（通过 `$文本重复$` + `@seed[:32]`）
2. **签名**：`$ed25519签名$` 从种子派生密钥对，对消息签名，返回 64 字节原始签名
3. **编码**：`$hex编码$` 将原始签名字节转为 128 字符十六进制字符串

典型场景为 QQ 机器人 / Webhook 的验证回调（对标 Go `handleValidation`）。

<a id="crypto-ed25519-sign"></a>

### `$ed25519签名$` — Ed25519 签名

<dl>
  <dt>格式</dt><dd><code>$ed25519签名 [种子] [消息]$</code></dd>
  <dt>参数</dt><dd>32 字节种子字符串、待签名的消息字符串</dd>
  <dt>返回值</dt><dd>64 字节原始签名（latin-1 编码字符串，每个字符为一个字节值）</dd>
</dl>

从种子派生 Ed25519 签名密钥，对消息进行签名。种子不足 32 字节时以零填充，超长时截取前 32 字节。返回的签名需配合 `$hex编码$` 转为可读十六进制。

```
sig_bytes:$ed25519签名 %seed% %msg%$
signature:$hex编码 %sig_bytes%$   → 128 字符 hex 字符串
```

> **注意**：`$ed25519签名$` 返回原始字节字符串，直接输出为乱码。必须通过 `$hex编码$` 转为十六进制后才能用于 JSON 响应。

<a id="crypto-hex-encode"></a>

### `$hex编码$` — 字节转十六进制

<dl>
  <dt>格式</dt><dd><code>$hex编码 [数据]$</code></dd>
  <dt>参数</dt><dd>原始字节字符串（每个字符视为一个字节值 0–255）</dd>
  <dt>返回值</dt><dd>十六进制字符串，每字节对应两个 hex 字符</dd>
</dl>

将任意字节字符串转为十六进制表示。常用于将 `$ed25519签名$` 的原始签名输出转为 JSON 友好的 hex 格式。

```
$hex编码 abc$         → "616263"
$hex编码 %sig_bytes%$ → 128 字符 hex 签名
```

| 输入 | 输出 | 说明 |
| --- | --- | --- |
| `"a"` (0x61) | `"61"` | 单字符 |
| `"abc"` | `"616263"` | a=97=0x61, b=98=0x62, c=99=0x63 |
| `"\x00\xff"` | `"00ff"` | 控制字符也能正确编码 |

---

## 完整示例：Webhook 验证

```
[f]handle_validation body_json secret
// 1. 解析 Payload
payload:%body_json%
data:@payload[data]
event_ts:@data[event_ts]
plain_token:@data[plain_token]

// 2. 生成 32 字节种子
seed:%secret%
循环>%长度@seed%<32
seed:$文本重复 %seed% 2$
<循环
seed:@seed[:32]

// 3. 签名
msg:%event_ts%%plain_token%
sig_bytes:$ed25519签名 %seed% %msg%$
signature:$hex编码 %sig_bytes%$

// 4. 返回
$打印返回 {"plain_token":"%plain_token%","signature":"%signature%"}$
```

[← 类型转换](./type)

[← 内置函数总览](./flow-output)
