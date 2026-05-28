import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'virtual:svg-icons-register'

import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/main.css'

createApp(App).use(router).mount('#app')
