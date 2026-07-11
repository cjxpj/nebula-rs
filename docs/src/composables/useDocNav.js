import { computed } from 'vue'
import { useRoute } from 'vue-router'

export const sidebarGroups = [
  {
    text: '入门',
    items: [
      { text: '概述', link: '/v1.0/' },
      { text: '词法结构', link: '/v1.0/lexical' },
      { text: '类型系统', link: '/v1.0/types' },
      { text: '变量与赋值', link: '/v1.0/variables' },
      { text: '表达式与运算符', link: '/v1.0/expressions' },
      { text: '控制流', link: '/v1.0/control-flow' },
      { text: '词条系统', link: '/v1.0/entries' },
      { text: 'JSON 数据处理', link: '/v1.0/json' },
      { text: '面向对象编程', link: '/v1.0/oop' },
      { text: '模块与引入', link: '/v1.0/modules' },
      { text: '函数', link: '/v1.0/functions' },
      {
        text: '内置函数',
        link: '/v1.0/flow-output',
        children: [
          { text: '回调', link: '/v1.0/flow-callback' },
          { text: '主回调', link: '/v1.0/flow-main-callback' },
          { text: '打印', link: '/v1.0/output-print' },
          { text: '打印返回', link: '/v1.0/output-print-return' },
          { text: '服务器', link: '/v1.0/server' },
          { text: '对象创建', link: '/v1.0/object' },
          { text: '字符串', link: '/v1.0/string' },
          { text: '数学', link: '/v1.0/math' },
          { text: '网络', link: '/v1.0/network' },
          { text: '类型', link: '/v1.0/type' },
          { text: '文件', link: '/v1.0/file' },
          { text: '画布', link: '/v1.0/canvas' }
        ]
      }
    ]
  }
]

function flattenItems(items) {
  const result = []
  for (const item of items) {
    if (item.link && !item.children) {
      result.push(item)
    } else if (item.children) {
      if (item.link) {
        result.push({ text: item.text, link: item.link })
      }
      result.push(...flattenItems(item.children))
    }
  }
  return result
}

const flatPages = sidebarGroups.flatMap(g => flattenItems(g.items))

export function usePrevNext() {
  const route = useRoute()
  const idx = computed(() => flatPages.findIndex(p => {
    const linkPath = p.link.split('#')[0]
    return linkPath === route.path
  }))
  const prev = computed(() => idx.value > 0 ? flatPages[idx.value - 1] : null)
  const next = computed(() => idx.value < flatPages.length - 1 ? flatPages[idx.value + 1] : null)
  return { prev, next }
}

export function getPageSections(path) {
  function search(items) {
    for (const item of items) {
      if (item.link && item.link.split('#')[0] === path && item.children) {
        return { title: item.text, link: item.link, items: item.children }
      }
      if (item.children) {
        const found = search(item.children)
        if (found) return found
      }
    }
    return null
  }
  for (const group of sidebarGroups) {
    const found = search(group.items)
    if (found) return found
  }
  return null
}
