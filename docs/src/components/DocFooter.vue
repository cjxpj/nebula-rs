<script setup>
import { usePrevNext } from '../composables/useDocNav.js'

const { prev, next } = usePrevNext()
</script>

<template>
  <nav v-if="prev || next" class="doc-footer">
    <div class="doc-footer-inner">
      <a v-if="prev" :href="'#' + prev.link" class="footer-link prev">
        <span class="footer-label">上一章</span>
        <span class="footer-text">{{ prev.text }}</span>
      </a>
      <div v-else class="footer-link prev placeholder"></div>
      <a v-if="next" :href="'#' + next.link" class="footer-link next">
        <span class="footer-label">下一章</span>
        <span class="footer-text">{{ next.text }}</span>
      </a>
      <div v-else class="footer-link next placeholder"></div>
    </div>
  </nav>
</template>

<style scoped>
.doc-footer {
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid var(--color-border);
}

.doc-footer-inner {
  display: flex;
  justify-content: space-between;
}

.footer-link {
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  max-width: 48%;
  transition: border-color 0.2s, background 0.2s;
}

.footer-link:hover {
  border-color: var(--color-brand);
  background: var(--color-code-bg);
}

.footer-link.prev {
  align-items: flex-start;
}

.footer-link.next {
  align-items: flex-end;
  text-align: right;
  margin-left: auto;
}

.footer-link.placeholder {
  visibility: hidden;
}

.footer-label {
  font-size: 0.75em;
  color: var(--color-text-muted);
  margin-bottom: 4px;
}

.footer-text {
  font-size: 0.9em;
  font-weight: 500;
  color: var(--color-brand);
}
</style>
