<script setup>
import { computed, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import DocFooter from './DocFooter.vue'
import { getVersionFromPath } from '../composables/useVersion.js'

const route = useRoute()

const mdModules = import.meta.glob(
  ['../../*/*.md'],
  { query: '?raw', import: 'default', eager: true }
)

function slugify(text) {
  return text
    .replace(/<[^>]*>/g, '')
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff]+/g, '-')
    .replace(/^-|-$/g, '')
}

function addHeadingIds(html) {
  return html.replace(/<(h[23])>(.*?)<\/\1>/gi, (_, tag, text) =>
    `<${tag} id="${slugify(text)}">${text}</${tag}>`
  )
}

function preprocessLinks(md, version) {
  return md.replace(/\]\(\.\/([^)]*?)\)/g, (_, path) => {
    if (/\.(vsix|png|jpg|gif|svg|pdf)$/i.test(path)) return _
    if (path.startsWith('http')) return _
    return `](#/${version}/${path})`
  })
}

const html = computed(() => {
  const version = getVersionFromPath(route.path)
  let key
  if (route.path === `/${version}/`) {
    key = `../../${version}/index.md`
  } else {
    key = `../../${version}/${route.params.page}.md`
  }
  const raw = mdModules[key]
  if (!raw) return '<p>页面未找到</p>'
  return addHeadingIds(marked.parse(preprocessLinks(raw, version), { gfm: true, breaks: false }))
})

watch([() => route.hash, html], ([hash]) => {
  nextTick(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
})
</script>

<template>
  <article class="markdown-body" v-html="html"></article>
  <DocFooter />
</template>
