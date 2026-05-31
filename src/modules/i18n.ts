import { createI18n, type Locale } from 'vue-i18n'
import type { App } from 'vue'

export const DEFAULT_LOCALE = 'zh-CN'

const i18n = createI18n({
  legacy: false,
  locale: '',
  messages: {},
})

// 读取locales目录下的所有js文件，并生成一个对象，key为文件名，value为动态导入函数
// 原理：
// import.meta.glob(...) -> modules对象 -> { './locales/en.json': () => import('./locales/en.json'), ... }
// Object.entries(...) -> 读取key-value -> [['./locales/en.json', () => import('./locales/en.json')], ...]
// Array.map[...] -> 简化key-value -> [['en', () => import('./locales/en.json')], ...]
// Object.fromEntries(...) -> 将key-value转换为对象 -> { en: () => import('./locales/en.json'), ... }
const localesMap = Object.fromEntries(
  Object.entries(import.meta.glob('../locales/*.json')).map(([path, loadLocale]) => [
    path.match(/([\w-]*)\.json$/)?.[1],
    loadLocale,
  ]),
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>

export const availableLocales = Object.keys(localesMap) // ['en', 'zh-CN']

const loadedLanguages: string[] = []

export function setI18nLanguage(locale: string) {
  i18n.global.locale.value = locale

  if (typeof document !== 'undefined') {
    document.querySelector('html')?.setAttribute('lang', locale) // 设置html标签的lang属性，用于fetch请求的Accept-Language头
  }

  return locale
}

export async function loadLocaleMessages(locale: string) {
  // 如果locale不存在，则直接返回
  if (!localesMap[locale]) {
    return
  }

  //  如果locale已加载，则直接切换语言
  if (loadedLanguages.includes(locale)) {
    return setI18nLanguage(locale)
  }

  // 加载locale messages
  const messages = await localesMap[locale]()

  // 设置locale和locale message
  i18n.global.setLocaleMessage(locale, messages.default)
  // 记录已加载的locale
  loadedLanguages.push(locale)

  return setI18nLanguage(locale)
}

export default {
  // 安装i18n插件
  install(app: App) {
    app.use(i18n)
    loadLocaleMessages(DEFAULT_LOCALE) // 加载默认语言
  },
}
