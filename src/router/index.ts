import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

const history = import.meta.env.VITE_GITHUB_PAGES ? createWebHashHistory() : createWebHistory()
// const history = createWebHistory()

const router = createRouter({
  history,
  routes,
})

export default router
