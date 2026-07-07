<script setup>
import { ref, watch, nextTick } from 'vue'
import { search } from '../composables/useSearchIndex.js'

const emit = defineEmits(['close'])

const query = ref('')
const results = ref([])
const selectedIndex = ref(0)
const inputEl = ref(null)

nextTick(() => inputEl.value?.focus())

watch(query, (q) => {
  results.value = search(q)
  selectedIndex.value = 0
})

function select(path) {
  window.location.hash = '#' + path
  emit('close')
}

function onKeydown(e) {
  if (e.key === 'Escape') {
    emit('close')
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    selectedIndex.value = Math.min(selectedIndex.value + 1, results.value.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
  } else if (e.key === 'Enter' && results.value[selectedIndex.value]) {
    select(results.value[selectedIndex.value].path)
  }
}
</script>

<template>
  <div class="search-overlay" @click.self="emit('close')">
    <div class="search-modal">
      <div class="search-input-wrap">
        <svg class="search-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          ref="inputEl"
          v-model="query"
          class="search-input"
          placeholder="搜索文档..."
          @keydown="onKeydown"
        />
        <button class="search-close" @click="emit('close')">Esc</button>
      </div>
      <div class="search-results" v-if="results.length">
        <div
          v-for="(r, i) in results"
          :key="r.path"
          :class="['search-result', { active: i === selectedIndex }]"
          @click="select(r.path)"
          @mouseenter="selectedIndex = i"
        >
          <div class="result-title">{{ r.title }}</div>
          <div class="result-path">{{ r.path }}</div>
          <div class="result-snippet">{{ r.snippet }}</div>
        </div>
      </div>
      <div class="search-empty" v-else-if="query">
        未找到相关结果
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  justify-content: center;
  padding-top: 15vh;
}

[data-theme="dark"] .search-overlay {
  background: rgba(0, 0, 0, 0.7);
}

.search-modal {
  width: 560px;
  max-width: 95vw;
  max-height: 70vh;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.search-input-wrap {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);
  gap: 10px;
}

.search-icon {
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1em;
  background: transparent;
  color: var(--color-text);
}

.search-input::placeholder {
  color: var(--color-text-muted);
}

.search-close {
  font-size: 0.75em;
  padding: 2px 8px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-code-bg);
  color: var(--color-text-muted);
  cursor: pointer;
  flex-shrink: 0;
}

.search-results {
  overflow-y: auto;
  padding: 8px;
  flex: 1;
}

.search-result {
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;
}

.search-result:hover,
.search-result.active {
  background: var(--color-code-bg);
}

.result-title {
  font-weight: 600;
  font-size: 0.95em;
  color: var(--color-text);
}

.result-path {
  font-size: 0.75em;
  color: var(--color-text-muted);
  margin: 2px 0 4px;
}

.result-snippet {
  font-size: 0.8em;
  color: var(--color-text-muted);
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.search-empty {
  padding: 32px 16px;
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.9em;
}
</style>
