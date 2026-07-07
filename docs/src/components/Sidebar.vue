<script setup>
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { sidebarGroups } from '../composables/useDocNav.js'

const route = useRoute()

const expanded = reactive({})

function buildHref(link) {
  if (link.includes('#')) return link
  return '#' + link
}

function isActive(link) {
  return route.path === link
}

function toggle(key) {
  expanded[key] = !expanded[key]
}

function isExpanded(key) {
  return expanded[key] === true
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
          <a v-if="item.link" :href="buildHref(item.link)" class="sidebar-section-title sidebar-section-link">{{ item.text }}</a>
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
                  <!-- sub with children (toggleable category) -->
                  <template v-else-if="sub.children">
                    <p class="sidebar-toggle">
                      <span class="toggle-arrow" :class="{ open: isExpanded(sub.text) }" @click="toggle(sub.text)">&#9654;</span>
                      <a v-if="sub.link" :href="buildHref(sub.link)" :class="['sidebar-toggle-link', { active: isActive(sub.link) }]">{{ sub.text }}</a>
                      <span v-else>{{ sub.text }}</span>
                    </p>
                    <Transition name="slide">
                      <div v-if="isExpanded(sub.text)" class="sidebar-sub-group-deep">
                        <a
                          v-for="item in sub.children"
                          :key="item.link"
                          :href="buildHref(item.link)"
                          :class="['sidebar-link', 'sidebar-link-fn-deep', { active: isActive(item.link) }]"
                        >{{ item.text }}</a>
                      </div>
                    </Transition>
                  </template>
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
  color: var(--color-text-default);
  margin-bottom: 4px;
  padding-left: 4px;
}

.sidebar-section-link {
  display: block;
  color: var(--color-text-default);
  text-decoration: none;
}

.sidebar-section-link:hover {
  color: var(--color-brand);
}

.sidebar-sub-title {
  font-size: 0.8em;
  font-weight: 400;
  color: var(--color-text-muted);
  margin-bottom: 2px;
  padding-left: 4px;
}

.sidebar-sub-group {
  margin-bottom: 4px;
}

.sidebar-sub-group-deep {
  overflow: hidden;
  margin-bottom: 4px;
}

.sidebar-toggle {
  font-size: 0.8em;
  font-weight: 400;
  color: var(--color-text-muted);
  margin-bottom: 2px;
  padding-left: 20px;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  gap: 4px;
}

.sidebar-toggle:hover {
  color: var(--color-brand);
}

.sidebar-toggle-link {
  color: inherit;
  text-decoration: none;
}

.sidebar-toggle-link:hover {
  color: var(--color-brand);
}

.toggle-arrow {
  display: inline-block;
  font-size: 0.7em;
  transition: transform 0.15s;
  flex-shrink: 0;
}

.toggle-arrow.open {
  transform: rotate(90deg);
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

.sidebar-link-fn-deep {
  padding-left: 36px;
  font-size: 0.75em;
}

.sidebar-link:hover {
  color: var(--color-brand);
}

.sidebar-link.active {
  color: var(--color-brand);
  background: var(--color-code-bg);
}
</style>

<style>
.slide-enter-active {
  transition: max-height 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease;
  overflow: hidden;
}

.slide-leave-active {
  transition: max-height 0.25s ease-in, opacity 0.15s ease;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  margin-bottom: 0;
}

.slide-enter-to,
.slide-leave-from {
  max-height: 300px;
  opacity: 1;
  margin-bottom: 4px;
}
</style>
