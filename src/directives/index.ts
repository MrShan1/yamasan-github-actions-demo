import type { App } from 'vue'

const modules: [string, any][] = Object.entries(
  import.meta.glob('./modules/*.ts', {
    eager: true, // 立即加载所有模块
    import: 'default', // 导入模块的默认导出
  }),
).map(([path, module]) => [path.match(/([\w-]*)\.ts$/)?.[1] as string, module])

function setupDirectives(app: App) {
  for (const [name, module] of modules) {
    app.directive(name, module)
  }
}

export default {
  install(app: App) {
    setupDirectives(app)
  },
}
