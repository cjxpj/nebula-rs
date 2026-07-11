import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getVersionFromPath } from './useVersion.js'

export const sidebarGroups = [
  {
    text: '入门',
    items: [
      { text: '概述', link: '/' },
      { text: '词法结构', link: '/lexical' },
      { text: '类型系统', link: '/types' },
      { text: '变量与赋值', link: '/variables' },
      { text: '表达式与运算符', link: '/expressions' },
      { text: '判断逻辑', link: '/control-flow' },
      { text: '词条系统', link: '/entries' },
      { text: 'JSON 数据处理', link: '/json' },
      { text: '面向对象编程', link: '/oop' },
      { text: '模块与引入', link: '/modules' },
      { text: '函数', link: '/functions' },
      {
        text: '内置函数',
        link: '/flow-output',
        children: [
          { text: '回调', link: '/flow-callback' },
          { text: '主回调', link: '/flow-main-callback' },
          { text: '打印', link: '/output-print' },
          { text: '服务器', link: '/server' },
          { text: '对象创建', link: '/object' },
          { text: '字符串', link: '/string' },
          { text: '数学', link: '/math' },
          { text: '网络', link: '/network' },
          { text: '类型', link: '/type' },
          { text: '文件', link: '/file' },
          { text: '画布', link: '/canvas' }
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
    const version = getVersionFromPath(route.path)
    const linkPath = p.link.split('#')[0]
    return `/${version}${linkPath}` === route.path
  }))
  const prev = computed(() => {
    if (idx.value <= 0) return null
    const version = getVersionFromPath(route.path)
    const prev = flatPages[idx.value - 1]
    return { text: prev.text, link: `/${version}${prev.link}` }
  })
  const next = computed(() => {
    if (idx.value >= flatPages.length - 1) return null
    const version = getVersionFromPath(route.path)
    const next = flatPages[idx.value + 1]
    return { text: next.text, link: `/${version}${next.link}` }
  })
  return { prev, next }
}

export function getPageSections(path) {
  const version = getVersionFromPath(path)

  function search(items) {
    for (const item of items) {
      const fullLink = item.link ? `/${version}${item.link}` : ''
      if (item.link && fullLink.split('#')[0] === path && item.children) {
        return { title: item.text, link: fullLink, items: item.children.map(c => ({ ...c, link: c.link ? `/${version}${c.link}` : c.link })) }
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
