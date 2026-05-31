import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'

console.log(messages)

const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: 'zh-CN',
  fallbackLocale: 'en',
  messages,
})

export default i18n
