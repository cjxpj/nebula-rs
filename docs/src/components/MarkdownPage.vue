<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import DocFooter from './DocFooter.vue'

const route = useRoute()

const mdModules = import.meta.glob(
  ['../../v1.0/*.md'],
  { query: '?raw', import: 'default', eager: true }
)

function preprocessLinks(md) {
  return md.replace(/\]\(\.\/([^)]*?)\)/g, (_, path) => {
    if (/\.(vsix|png|jpg|gif|svg|pdf)$/i.test(path)) return _;
    if (path.startsWith('http')) return _;
    return `](#/v1.0/${path})`
  })
}

const html = computed(() => {
  let key
  if (route.path === '/v1.0/') {
    key = '../../v1.0/index.md'
  } else {
    key = `../../v1.0/${route.params.page}.md`
  }
  const raw = mdModules[key]
  if (!raw) return '<p>页面未找到</p>'
  return marked.parse(preprocessLinks(raw), { gfm: true, breaks: false })
})
</script>

<template>
  <article class="markdown-body" v-html="html"></article>
  <DocFooter />
</template>
