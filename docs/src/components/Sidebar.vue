<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { sidebarGroups } from '../composables/useDocNav.js'
import { getVersionFromPath } from '../composables/useVersion.js'

const route = useRoute()
const version = computed(() => getVersionFromPath(route.path))

function buildHref(link) {
  const hashIdx = link.indexOf('#')
  const path = hashIdx >= 0 ? link.substring(0, hashIdx) : link
  const hash = hashIdx >= 0 ? link.substring(hashIdx) : ''
  return `#/${version.value}${path}${hash}`
}

function isActive(link) {
  const prefix = `/${version.value}`
  const [pathOnly, hash] = link.split('#')
  const fullPath = `${prefix}${pathOnly}`
  if (hash) {
    return route.path === fullPath && route.hash === '#' + hash
  }
  return route.path === fullPath && !route.hash
}
</script>

<template>
  <nav class="sidebar-nav">
    <div v-for="(group, gi) in sidebarGroups" :key="group.text" class="sidebar-group" :class="{ 'has-divider': gi < sidebarGroups.length - 1 }">
      <p class="sidebar-section-title">{{ group.text }}</p>
      <template v-for="item in group.items" :key="item.link || item.text">
        <a
          v-if="item.link && !item.children"
          :href="buildHref(item.link)"
          :class="['sidebar-link', 'sidebar-link-sub', { active: isActive(item.link) }]"
        >
          {{ item.text }}
        </a>
        <template v-else>
          <a v-if="item.link" :href="buildHref(item.link)" :class="['sidebar-section-title', 'sidebar-section-link', { active: isActive(item.link) }]">{{ item.text }}</a>
          <p v-else class="sidebar-section-title">{{ item.text }}</p>
          <template v-for="child in (item.children || [])" :key="child.link || child.text">
            <!-- child has link but no children: plain link -->
            <a
              v-if="child.link && !child.children"
              :href="buildHref(child.link)"
              :class="['sidebar-link', 'sidebar-link-sub', { active: isActive(child.link) }]"
            >
              {{ child.text }}
            </a>
            <!-- child has children (always visible) -->
            <template v-else-if="child.children">
              <p class="sidebar-sub-title">{{ child.text }}</p>
              <div class="sidebar-sub-group">
                <template v-for="sub in child.children" :key="sub.link || sub.text">
                  <!-- sub with link but no children: plain link -->
                  <a
                    v-if="sub.link && !sub.children"
                    :href="buildHref(sub.link)"
                    :class="['sidebar-link', 'sidebar-link-fn', { active: isActive(sub.link) }]"
                  >
                    {{ sub.text }}
                  </a>
                  <!-- sub with children: simple link -->
                  <a v-else-if="sub.children && sub.link"
                    :href="buildHref(sub.link)"
                    :class="['sidebar-link', 'sidebar-link-fn', { active: isActive(sub.link) }]"
                  >{{ sub.text }}</a>
                  <p v-else-if="sub.children" class="sidebar-sub-title">{{ sub.text }}</p>
                </template>
              </div>
            </template>
          </template>
        </template>
      </template>
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

.sidebar-section-title {
  font-size: 0.85em;
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 4px;
  padding-left: 4px;
}

.sidebar-section-link {
  display: block;
  color: var(--color-text);
  text-decoration: none;
}

.sidebar-section-link:hover {
  color: var(--color-brand);
}

.sidebar-sub-title {
  font-size: 0.8em;
  font-weight: 400;
  color: var(--color-text);
  margin-bottom: 2px;
  padding-left: 4px;
}

.sidebar-sub-group {
  margin-bottom: 4px;
}

.sidebar-link {
  display: block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
  color: var(--color-text-muted);
  transition: color 0.2s, background 0.2s;
}

.sidebar-link-sub {
  padding-left: 20px;
}

.sidebar-link-fn {
  padding-left: 36px;
  font-size: 0.8em;
}

.sidebar-link:hover {
  color: var(--color-brand);
}

.sidebar-link.active {
  color: var(--color-brand);
  background: var(--color-code-bg);
}
</style>
