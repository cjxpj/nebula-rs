<script setup>
const versions = [
  { label: 'v1.0', path: '/v1.0/' }
]

function onChange(e) {
  window.location.hash = '#' + e.target.value
}

const current = '/v1.0/'
</script>

<template>
  <select
    class="version-select"
    :value="current"
    @change="onChange"
  >
    <option v-for="v in versions" :key="v.path" :value="v.path">{{ v.label }}</option>
  </select>
</template>

<style scoped>
.version-select {
  appearance: none;
  padding: 4px 28px 4px 10px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  font-size: 0.85em;
  color: var(--color-text);
  background: var(--color-bg);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  cursor: pointer;
  transition: border-color 0.2s;
}

.version-select:hover {
  border-color: var(--color-brand);
}

.version-select:focus {
  outline: none;
  border-color: var(--color-brand);
  box-shadow: 0 0 0 2px rgba(52, 81, 178, 0.15);
}

[data-theme="dark"] .version-select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23a0a0a0' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
}

[data-theme="dark"] .version-select:focus {
  box-shadow: 0 0 0 2px rgba(122, 162, 247, 0.2);
}
</style>
