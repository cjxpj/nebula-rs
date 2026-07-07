<script setup>
import { ref } from 'vue'
import { useTheme } from './composables/useTheme.js'
import Sidebar from './components/Sidebar.vue'
import SearchModal from './components/SearchModal.vue'
import VersionSwitcher from './components/VersionSwitcher.vue'

const { isDark, toggle: toggleTheme } = useTheme()
const showSearch = ref(false)

function onKeydown(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    showSearch.value = true
  }
}
</script>

<template>
  <div class="app" @keydown="onKeydown">
    <header class="header">
      <a class="logo" href="#/">NR 语言参考手册？</a>
      <VersionSwitcher />
      <div class="header-spacer"></div>
      <button class="icon-btn" @click="showSearch = true" title="搜索 (Ctrl+K)">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      </button>
      <button class="icon-btn" @click="toggleTheme" :title="isDark ? '浅色模式' : '深色模式'">
        <!-- Sun icon -->
        <svg v-if="isDark" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <circle cx="12" cy="12" r="5"/>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
        <!-- Moon icon -->
        <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </button>
    </header>
    <div class="main">
      <aside class="sidebar">
        <Sidebar />
      </aside>
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
  <SearchModal v-if="showSearch" @close="showSearch = false" />
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --header-height: 56px;
  --sidebar-width: 260px;
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
  --color-text-muted: #666;
  --color-brand: #3451b2;
  --color-brand-light: #4772d9;
  --color-border: #e2e2e2;
  --color-code-bg: #f6f8fa;
  --color-header-bg: rgba(255, 255, 255, 0.85);
}

[data-theme="dark"] {
  --color-bg: #0d1117;
  --color-text: #e6edf3;
  --color-text-muted: #8b949e;
  --color-brand: #58a6ff;
  --color-brand-light: #79c0ff;
  --color-border: #30363d;
  --color-code-bg: #161b22;
  --color-header-bg: rgba(13, 17, 23, 0.85);
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans SC', sans-serif;
  color: var(--color-text);
  background: var(--color-bg);
  line-height: 1.6;
  transition: background 0.3s, color 0.3s;
}

a {
  color: var(--color-brand);
  text-decoration: none;
}

a:hover {
  color: var(--color-brand-light);
}

code {
  background: var(--color-code-bg);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.875em;
}

pre {
  background: var(--color-code-bg);
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 16px 0;
  border: 1px solid var(--color-border);
}

pre code {
  background: none;
  padding: 0;
  border: none;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin: 16px 0;
}

th,
td {
  border: 1px solid var(--color-border);
  padding: 8px 12px;
  text-align: left;
}

th {
  background: var(--color-code-bg);
  font-weight: 600;
}

h1, h2, h3, h4 {
  margin-top: 24px;
  margin-bottom: 12px;
}

h1 {
  font-size: 2em;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 8px;
}

h2 {
  font-size: 1.5em;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 6px;
}

h3 {
  font-size: 1.25em;
}

p {
  margin: 8px 0;
}

ul, ol {
  padding-left: 24px;
  margin: 8px 0;
}

/* icon button base */
.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-bg);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.2s;
}

.icon-btn:hover {
  color: var(--color-brand);
  border-color: var(--color-brand);
  background: var(--color-code-bg);
}
</style>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  height: var(--header-height);
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 14px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-header-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 10;
}

.logo {
  font-size: 1.05em;
  font-weight: 700;
  color: var(--color-text);
  flex-shrink: 0;
}

.header-spacer {
  flex: 1;
}

.main {
  display: flex;
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.sidebar {
  width: var(--sidebar-width);
  flex-shrink: 0;
  border-right: 1px solid var(--color-border);
  padding: 16px;
  overflow-y: auto;
  height: calc(100vh - var(--header-height));
  position: sticky;
  top: var(--header-height);
}

.content {
  flex: 1;
  padding: 24px 32px;
  min-width: 0;
}

@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
  .content {
    padding: 16px;
  }
}
</style>
