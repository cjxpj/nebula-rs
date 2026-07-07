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
      { text: '函数', link: '/v1.0/functions' },
      { text: 'JSON 数据处理', link: '/v1.0/json' },
      { text: '面向对象编程', link: '/v1.0/oop' },
      { text: '模块与引入', link: '/v1.0/modules' },
      {
        text: '基础函数',
        link: '/v1.0/flow-output',
        children: [
          {
            text: '内置函数',
            children: [
              { text: '流程控制', link: '/v1.0/flow-control' },
              { text: '回调', link: '/v1.0/flow-callback' },
              { text: '主回调', link: '/v1.0/flow-main-callback' },
              { text: '输出', link: '/v1.0/output' },
              { text: '打印', link: '/v1.0/output-print' },
              { text: '打印返回', link: '/v1.0/output-print-return' },
              { text: '服务器', link: '/v1.0/server' },
              { text: '启动服务器', link: '/v1.0/server-start' },
              { text: '对象创建', link: '/v1.0/object' },
              { text: 'new', link: '/v1.0/object-new' },
              { text: '快捷访问', link: '/v1.0/network' },
              { text: '访问', link: '/v1.0/net-quick-get' },
              { text: '访问POST', link: '/v1.0/net-quick-post' },
              { text: '访问转发', link: '/v1.0/net-quick-forward' }
            ]
          },
          {
            text: '标准库',
            children: [
              {
                text: '字符串',
                link: '/v1.0/string',
                children: [
                  { text: '截取', link: '/v1.0/string-substr' },
                  { text: '替换', link: '/v1.0/string-replace' },
                  { text: '删前缀', link: '/v1.0/string-trim-prefix' },
                  { text: '删后缀', link: '/v1.0/string-trim-suffix' },
                  { text: '长度', link: '/v1.0/string-len' },
                  { text: '文本包含', link: '/v1.0/string-contains' },
                  { text: '文本分割', link: '/v1.0/string-split' },
                  { text: '头尾去空', link: '/v1.0/string-trim' },
                  { text: '判断数字', link: '/v1.0/string-is-digit' },
                  { text: '大写', link: '/v1.0/string-upper' },
                  { text: '小写', link: '/v1.0/string-lower' },
                  { text: '首字母大写', link: '/v1.0/string-title' },
                  { text: '大小写互换', link: '/v1.0/string-swapcase' },
                  { text: '查找', link: '/v1.0/string-find' },
                  { text: '计数', link: '/v1.0/string-count' },
                  { text: '开头判断', link: '/v1.0/string-starts-with' },
                  { text: '结尾判断', link: '/v1.0/string-ends-with' },
                  { text: '文本连接', link: '/v1.0/string-join' },
                  { text: '文本重复', link: '/v1.0/string-repeat' },
                  { text: '判断字母', link: '/v1.0/string-is-alpha' },
                  { text: '判断小写', link: '/v1.0/string-is-lower' },
                  { text: '判断大写', link: '/v1.0/string-is-upper' },
                  { text: '判断空白', link: '/v1.0/string-is-whitespace' },
                  { text: '左对齐', link: '/v1.0/string-pad-left' },
                  { text: '右对齐', link: '/v1.0/string-pad-right' },
                  { text: '居中', link: '/v1.0/string-pad-center' }
                ]
              },
              {
                text: '数学',
                link: '/v1.0/math',
                children: [
                  { text: '绝对值', link: '/v1.0/math-abs' },
                  { text: '最大值', link: '/v1.0/math-max' },
                  { text: '最小值', link: '/v1.0/math-min' },
                  { text: '幂运算', link: '/v1.0/math-pow' },
                  { text: '求和', link: '/v1.0/math-sum' },
                  { text: '向上取整', link: '/v1.0/math-ceil' },
                  { text: '向下取整', link: '/v1.0/math-floor' },
                  { text: '取整', link: '/v1.0/math-round' }
                ]
              },
              {
                text: '网络',
                link: '/v1.0/network',
                children: [
                  { text: 'net.新建', link: '/v1.0/net-create' },
                  { text: 'net.切换GET', link: '/v1.0/net-switch-get' },
                  { text: 'net.切换POST', link: '/v1.0/net-switch-post' },
                  { text: 'net.POST', link: '/v1.0/net-post' },
                  { text: 'net.POST文件', link: '/v1.0/net-post-file' },
                  { text: 'net.设置头部', link: '/v1.0/net-set-header' },
                  { text: 'net.设置超时', link: '/v1.0/net-set-timeout' },
                  { text: 'net.发送', link: '/v1.0/net-send' },
                  { text: 'net.全部内容', link: '/v1.0/net-content-all' },
                  { text: 'net.内容', link: '/v1.0/net-content' }
                ]
              },
              {
                text: '类型',
                link: '/v1.0/type',
                children: [
                  { text: 't.转文本', link: '/v1.0/type-to-string' },
                  { text: 't.转数字', link: '/v1.0/type-to-number' },
                  { text: 't.转整数', link: '/v1.0/type-to-int' },
                  { text: 't.转浮点', link: '/v1.0/type-to-float' }
                ]
              },
              {
                text: '文件',
                link: '/v1.0/file',
                children: [
                  { text: '写文件', link: '/v1.0/file-write' },
                  { text: '读文件', link: '/v1.0/file-read' },
                  { text: '写', link: '/v1.0/file-kv-write' },
                  { text: '读', link: '/v1.0/file-kv-read' },
                  { text: '存在文件', link: '/v1.0/file-exists' },
                  { text: '存在文件夹', link: '/v1.0/file-dir-exists' },
                  { text: '存在文件或文件夹', link: '/v1.0/file-path-exists' },
                  { text: '文件后缀', link: '/v1.0/file-ext' },
                  { text: '文件夹列表', link: '/v1.0/file-list-dirs' },
                  { text: '文件列表', link: '/v1.0/file-list-files' },
                  { text: '随机文件夹名', link: '/v1.0/file-random-dir' },
                  { text: '随机文件名', link: '/v1.0/file-random-file' },
                  { text: '读文件行', link: '/v1.0/file-read-lines' },
                  { text: '文件大小', link: '/v1.0/file-size' },
                  { text: '文件夹大小', link: '/v1.0/file-dir-size' },
                  { text: '删除文件', link: '/v1.0/file-delete' },
                  { text: '删除文件夹', link: '/v1.0/file-delete-dir' },
                  { text: '重命名', link: '/v1.0/file-rename' },
                  { text: '复制粘贴', link: '/v1.0/file-copy' },
                  { text: '下载文件', link: '/v1.0/file-download' }
                ]
              },
              {
                text: '画布',
                link: '/v1.0/canvas',
                children: [
                  { text: '创建画布', link: '/v1.0/canvas-create' },
                  { text: '画布.获取', link: '/v1.0/canvas-get' },
                  { text: '画笔.设置颜色', link: '/v1.0/canvas-set-color' },
                  { text: '绘制.线', link: '/v1.0/canvas-line' },
                  { text: '绘制.方形', link: '/v1.0/canvas-rect' },
                  { text: '绘制.椭圆', link: '/v1.0/canvas-ellipse' },
                  { text: '绘制.文本', link: '/v1.0/canvas-text' },
                  { text: '绘制.图片', link: '/v1.0/canvas-image' }
                ]
              }
            ]
          }
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
      for (const child of item.children) {
        if (child.children) {
          if (child.link) {
            result.push({ text: child.text, link: child.link })
          }
          for (const sub of child.children) {
            if (sub.children) {
              if (sub.link) {
                result.push({ text: sub.text, link: sub.link })
              }
              for (const leaf of sub.children) {
                result.push(leaf)
              }
            } else {
              result.push(sub)
            }
          }
        } else {
          result.push(child)
        }
      }
    }
  }
  return result
}

const flatPages = sidebarGroups.flatMap(g => flattenItems(g.items))

export function usePrevNext() {
  const route = useRoute()
  const idx = computed(() => flatPages.findIndex(p => p.link === route.path))
  const prev = computed(() => idx.value > 0 ? flatPages[idx.value - 1] : null)
  const next = computed(() => idx.value < flatPages.length - 1 ? flatPages[idx.value + 1] : null)
  return { prev, next }
}
