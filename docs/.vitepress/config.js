import { defineConfig } from 'vitepress'
import { vsixPackager } from './vsix-plugin.js'

export default defineConfig({
  lang: 'zh-CN',
  title: 'NR 语言参考手册',
  description: 'NR 是 Nebula 词库引擎的领域特定语言（DSL）',
  base: '/nebula-rs/',
  ignoreDeadLinks: true,

  vite: {
    assetsInclude: ['**/*.vsix'],
    plugins: [vsixPackager()]
  },

  themeConfig: {
    nav: [
      { text: 'v1.0', link: '/v1.0/' }
    ],

    sidebar: {
      '/v1.0/': [
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
            { text: '11. 内置函数参考', link: '/v1.0/flow-output' },
            { text: '字符串操作', link: '/v1.0/string' },
            { text: '数学操作', link: '/v1.0/math' },
            { text: '网络操作', link: '/v1.0/network' },
            { text: '类型操作', link: '/v1.0/type' },
            { text: '画布操作', link: '/v1.0/canvas' },
            { text: '文件操作', link: '/v1.0/file' }
          ]
        }
      ]
    },

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3],
      label: '本页目录'
    },

    docFooter: {
      prev: '上一章',
      next: '下一章'
    },

    lastUpdated: {
      text: '最后更新'
    }
  }
})
