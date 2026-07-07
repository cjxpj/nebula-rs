<script setup>
import { useRoute } from 'vue-router'
import { sidebarGroups } from '../composables/useDocNav.js'

const route = useRoute()

function isActive(link) {
  return route.path === link
}
</script>

<template>
  <nav class="sidebar-nav">
    <div v-for="(group, gi) in sidebarGroups" :key="group.text" class="sidebar-group" :class="{ 'has-divider': gi < sidebarGroups.length - 1 }">
      <p class="sidebar-group-title">{{ group.text }}</p>
      <a
        v-for="item in group.items"
        :key="item.link"
        :href="'#' + item.link"
        :class="['sidebar-link', { active: isActive(item.link) }]"
      >
        {{ item.text }}
      </a>
    </div>
  </nav>
</template>

<style scoped>
.sidebar-group {
  margin-bottom: 16px;
}

.sidebar-group.has-divider {
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border);
}

.sidebar-group-title {
  font-size: 0.75em;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 8px;
  padding-left: 4px;
  letter-spacing: 0.05em;
}

.sidebar-link {
  display: block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
  color: var(--color-text-muted);
  transition: color 0.2s, background 0.2s;
}

.sidebar-link:hover {
  color: var(--color-brand);
}

.sidebar-link.active {
  color: var(--color-brand);
  background: var(--color-code-bg);
}
</style>
