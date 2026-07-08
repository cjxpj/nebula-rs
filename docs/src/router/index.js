import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import MarkdownPage from '../components/MarkdownPage.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/v1.0', redirect: '/v1.0/' },
    { path: '/v1.0/', component: MarkdownPage },
    { path: '/v1.0/:page', component: MarkdownPage }
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80
      }
    }
    return { top: 0 }
  }
})
