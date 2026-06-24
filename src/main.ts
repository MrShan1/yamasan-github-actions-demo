import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'virtual:svg-icons-register'
// import i18n from './i18n'
import i18n from './modules/i18n'
import directives from './directives'
import { createPinia } from 'pinia'
import elementPlus from 'element-plus'

if (import.meta.env.MODE !== 'production') {
  import('element-plus/dist/index.css')
  import('element-plus/theme-chalk/dark/css-vars.css')
}

import './assets/main.css'

const app = createApp(App)
app.use(directives)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(elementPlus)
app.mount('#app')

app.config.errorHandler = (err, vm, info) => {
  console.error('捕获的错误', err, '组件实例', vm, '信息', info)
}
