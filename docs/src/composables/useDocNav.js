import { useRoute } from 'vue-router'

export const sidebarGroups = [
  {
    text: 'NR 语言参考手册',
    items: [
      { text: '概述', link: '/v1.0/' },
      { text: '1. 词法结构', link: '/v1.0/lexical' },
      { text: '2. 类型系统', link: '/v1.0/types' },
      { text: '3. 变量与赋值', link: '/v1.0/variables' },
      { text: '4. 表达式与运算符', link: '/v1.0/expressions' },
      { text: '5. 控制流', link: '/v1.0/control-flow' },
      { text: '6. 词条系统', link: '/v1.0/entries' },
      { text: '7. 函数', link: '/v1.0/functions' },
      { text: '8. JSON 数据处理', link: '/v1.0/json' },
      { text: '9. 面向对象编程', link: '/v1.0/oop' },
      { text: '10. 模块与引入', link: '/v1.0/modules' },
      { text: '11. 内置函数参考', link: '/v1.0/flow-output' }
    ]
  },
  {
    text: '内置函数分类',
    items: [
      { text: '字符串操作', link: '/v1.0/string' },
      { text: '数学操作', link: '/v1.0/math' },
      { text: '网络操作', link: '/v1.0/network' },
      { text: '类型操作', link: '/v1.0/type' },
      { text: '画布操作', link: '/v1.0/canvas' },
      { text: '文件操作', link: '/v1.0/file' }
    ]
  }
]

const flatPages = sidebarGroups.flatMap(g => g.items)

export function usePrevNext() {
  const route = useRoute()
  const idx = flatPages.findIndex(p => p.link === route.path)
  const prev = idx > 0 ? flatPages[idx - 1] : null
  const next = idx < flatPages.length - 1 ? flatPages[idx + 1] : null
  return { prev, next }
}
