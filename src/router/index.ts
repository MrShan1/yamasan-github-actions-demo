import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

const history = import.meta.env.VITE_ACTIONS ? createWebHashHistory() : createWebHistory()

const router = createRouter({
  history,
  routes,
})

export default router
