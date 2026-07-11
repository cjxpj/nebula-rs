# JSON 数据处理

NR 内置强大的 JSON 处理能力，本章涵盖内联 JSON 赋值、JSON DSL 对象与数组语法、导航取值/写入、数组追加以及变量替换在 JSON 上下文中的使用。

<dl>
  <dt>JSON DSL</dt>
  <dd>NR 特有的 <code>{ }</code> 和 <code>[ ]</code> 块语法，以更可读的方式构建 JSON 数据，深度集成变量替换和函数调用。</dd>
  <dt>自适应解析</dt>
  <dd><code>key:value</code> 中 value 会被解析为 JSON 字面量（数字/布尔/null/对象/数组），否则作为字符串。</dd>
  <dt>核心用途</dt>
  <dd>复杂数据结构存储、与外部 API 的数据交换、可变参数和配置对象的载体。</dd>
</dl>

## 内联 JSON 赋值

```
data:{"name":"Alice","age":25,"items":[1,2,3]}
```

## JSON 对象 DSL `{ }`

多行构建 JSON 对象，每行 `key:value` 或 `key::value`：

```
user:{
    name:Alice
    age:25
    active:true
    tags:["a","b"]
    note::raw text
    姓名:张三
}
```

| 分隔符 | 值处理 |
| --- | --- |
| `key:value` | **自适应**：尝试解析 value 为 JSON 字面量（数字/布尔/null/对象/数组），不成则加引号当字符串 |
| `key::value` | **强制字符串**：始终作为字符串 |

```
a:{
    x:123        → 123 (Number)
    y:true       → true (Bool)
    z:null       → null
    w:[]         → [] (空数组)
    v:hello      → "hello" (非 JSON 字面量，加引号)
    名称::Alice  → "Alice" (强制字符串)
}
```

## 重复键自动合并

NR 的 JSON DSL 有一个独特的特性：当同一个对象中出现重复的键时，**值会自动合并为数组**，而非覆盖。这极大简化了构建列表型数据的场景。

```
a:{
    tag:a
    tag:b
    tag:c
}
// → {"tag":["a","b","c"]}
```

- **合并规则**：第一个值作为数组的第一个元素，后续同名键的值依次追加
- **适用性**：仅在 JSON 对象 DSL 块 `{ }` 中生效，内联 JSON 不适用
- **混合类型**：合并的值可以不同类型，如 `tag:a` 和 `tag:123` 合并为 `["a",123]`

## JSON 数组 DSL `[ ]`

```
list:[
    a,
    b,
    123,
    ::hello,
    key:val,
]
```

- **纯值**：自适应解析（`true`→Bool, `123`→Number, `abc`→String）
- **`::value`**：强制字符串
- **`key:value`**：单键对象，值自适应
- **`key::value`**：单键对象，值强制字符串

## 导航取值 `@`

```
@data[name]           → "Alice"
@data[items][0]       → "1"
@data[items][%i%]     → 动态索引（变量替换）
```

```
@a[0][name]           → 数组第 0 个元素的 name 字段
```

## 导航写入

```
data[name]:Bob                        ← 修改已有字段
@data[name]:Bob                       ← @ 前缀等价写法
data[info][city]:上海                  ← 多级写入
@data[info][city]:上海                ← @ 前缀等价写法
```

### 自适应与强制字符串

```
@data[age]:25          → Number(25)，自适应解析
@data[age]::25         → String("25")，强制字符串
```

## 数组追加 `[]`

```
list:[a,b]
@list[]:c              → list = ["a","b","c"]
@list[]:123            → list = ["a","b","c",123] (自适应 → Number)
@list[]::123           → list = ["a","b","c",123,"123"] (强制字符串)
```

## 变量替换与函数调用

```
prefix:Hello
msg:{
    text:%prefix% World
    ts:%时间戳%
}
// → {"text":"Hello World","ts":"1719500000"}
```

## 深度导航最佳实践

当 JSON 结构嵌套较深时，关注以下要点可以帮助你编写更可靠的导航代码：

- **逐级取值**：使用 `@data[a][b][c]` 逐级展开，不要跳级假设中间路径存在
- **动态路径**：索引处可以使用变量，如 `@data[%key%]`，但需确保变量值不为空
- **路径不存在时**：导航到不存在的路径返回空字符串，不会报错；写入不存在的路径会**自动创建中间对象**
- **数组越界**：访问不存在的数组索引返回空字符串

```
// 安全的多级导航模式
key:%参数1%
value:@config[settings][%key%]

[如果 %value% == ]
 值不存在，使用默认值
 value:default
```

> **注意事项**
> - **自适应模式注意**：`key:value` 会尝试将 value 解析为 JSON 字面量。如果 value 恰巧是 `true`、`null`、数字等，它会被解析为对应的类型而非字符串——请根据场景选择 `:` 或 `::`
> - **变量替换时机**：JSON DSL 块 `{ }` 中的 `%变量%` 在**赋值时**替换，而非定义时
> - **大文件考虑**：大型 JSON 结构建议使用内联 JSON 赋值而非 DSL 块，解析效率更高
> - **嵌套 DSL**：JSON DSL 块可以嵌套，但每层都需要独立的 `{ }` 或 `[ ]` 标记
> 关于 JSON 数组操作的更多内容，参见 [类型转换](./type)

[← 函数](./functions) [面向对象编程 →](./oop)
