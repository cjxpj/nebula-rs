import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import MarkdownPage from '../components/MarkdownPage.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/:version', redirect: to => `/${to.params.version}/` },
    { path: '/:version/', component: MarkdownPage },
    { path: '/:version/:page', component: MarkdownPage }
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
