import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: 'zh',
  fallbackLocale: 'en',
  messages: {
    zh: {
      message: {
        hello: '你好，世界',
      },
    },
    en: {
      message: {
        hello: 'Hello, World',
      },
    },
  },
})

export default i18n
