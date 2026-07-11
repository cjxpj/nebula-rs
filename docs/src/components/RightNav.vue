<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const headings = ref([])
const activeId = ref('')
let cachedHeadings = []
let ticking = false

function extract() {
  const article = document.querySelector('.markdown-body')
  if (!article) { headings.value = []; cachedHeadings = []; return }
  cachedHeadings = Array.from(article.querySelectorAll('h2[id], h3[id]'))
  headings.value = cachedHeadings.map(h => ({
    id: h.id,
    text: h.textContent,
    tag: h.tagName
  }))
}

function scrollTo(id) {
  router.replace({ hash: '#' + id })
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function updateActiveHeading() {
  if (!cachedHeadings.length) return
  let current = cachedHeadings[0].id
  for (const h of cachedHeadings) {
    if (h.getBoundingClientRect().top <= 120) current = h.id
  }
  activeId.value = current
}

function onScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateActiveHeading()
      ticking = false
    })
    ticking = true
  }
}

watch(() => route.path, () => nextTick(extract), { immediate: true })

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <nav v-if="headings.length" class="right-nav">
    <a
      v-for="h in headings"
      :key="h.id"
      href="javascript:void(0)"
      :class="['right-nav-link', { active: activeId === h.id }, h.tag === 'H3' ? 'sub' : '']"
      @click="scrollTo(h.id)"
    >{{ h.text }}</a>
  </nav>
</template>

<style scoped>
.right-nav {
  position: sticky;
  top: var(--header-height);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 12px;
  background: var(--color-bg);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

.right-nav:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border-color: var(--color-brand);
}

.right-nav-link {
  display: block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.8em;
  color: var(--color-text-muted);
  text-decoration: none;
  border-left: 2px solid transparent;
  transition: color 0.15s, border-color 0.15s, background 0.15s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.right-nav-link.sub {
  padding-left: 20px;
  font-size: 0.78em;
}

.right-nav-link:hover {
  color: var(--color-brand);
}

.right-nav-link.active {
  color: var(--color-brand);
  border-left-color: var(--color-brand);
  background: var(--color-code-bg);
}
</style>
