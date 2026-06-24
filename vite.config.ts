import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import tailwindcss from '@tailwindcss/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import ElementPlus from 'unplugin-element-plus/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import fs from 'node:fs'
import { visualizer } from 'rollup-plugin-visualizer'
// import { cdn } from 'vite-plugin-cdn2'
import { defineResolve } from 'vite-plugin-cdn2/resolve'
import cdn from 'vite-plugin-cdn-import'

// 读取src/locales的文件名集合，用于过滤打包文件
const localesDir = path.resolve(process.cwd(), 'src/locales')
const locales = fs
  .readdirSync(localesDir)
  .map((file) => file.toLowerCase().match(/([\w-]*)\.json$/)?.[1] || '')

// 排除Element Plus中不必要的locale资源
function excludeEpLocales(id: string) {
  if (id.includes('element-plus/dist/locale')) {
    const pathname = path.basename(id, '.min.mjs')
    if (!locales.includes(pathname)) {
      return true
    }
  }
  return false
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'
  const isAnalysis = process.env.ANALYSIS === 'true' // 是否进行包体分析
  const isSourcemap = process.env.SOURCEMAP === 'true' // 是否生成sourcemap文件

  const componentsPlugin = Components({
    directoryAsNamespace: false, // 是否将目录作为命名空间
    collapseSamePrefixes: false, // 是否合并相同的前缀
    resolvers: isProd ? [] : [ElementPlusResolver()],
    dirs: ['src/components'],
    extensions: ['vue'],
  })

  // const env = loadEnv(mode, process.cwd(), '')
  // console.log('环境变量', env.VITE_APP_TITLE)

  return {
    build: {
      rolldownOptions: {
        external: excludeEpLocales,
        plugins: [
          // 在rolldownOptions中再引入一次Components，解决打包时，components的组件没有被打包的问题
          //
          // 原因与解决方案：
          // cdn() 会通过 config hook 往 Rolldown 里塞 rollup-plugin-external-globals，
          // 也就是说：Vue 被外置成全局 Vue，发生在 Rolldown 打包阶段，不在 Vite transform 阶段
          // 所以需要在rolldownOptions中再引入一次，让它在 Rolldown 打包阶段再执行一遍，和 CDN 的 externalGlobals 处在同一条插件链里，就可以正常打包了
          //
          // issue参考：
          // https://github.com/unplugin/unplugin-vue-components/issues/664
          // https://github.com/MMF-FE/vite-plugin-cdn-import/issues/54
          componentsPlugin,
        ],
      },
      outDir: 'dist',
      emptyOutDir: true, // 显式清空输出目录
      sourcemap: isSourcemap, // 生成sourcemap文件
    },
    optimizeDeps: {
      include: ['src/components/**/*.vue'],
    },
    plugins: [
      VueRouter(),
      vue(),
      vueJsx(),
      vueDevTools(),
      tailwindcss(),
      AutoImport({
        resolvers: isProd ? [] : [ElementPlusResolver()],
        imports: [VueRouterAutoImports],
      }),
      componentsPlugin, // 此处也要保留，development环境也要打包components的组件
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
      // cdn({
      //   modules: [
      //     'vue',
      //     'vue-router',
      //     'pinia',
      //     'element-plus',
      //     'vue-echarts',
      //     {
      //       name: 'echarts',
      //       global: 'echarts',
      //       relativeModule: 'dist/echarts.min.js',
      //       aliases: ['core', 'renderers', 'charts', 'components', 'features'],
      //     },
      //   ],
      // }),
      cdn({
        // prodUrl: 'https://unpkg.com/{name}@{version}/{path}', // 切换cdn地址
        generateScriptTag: (name, scriptUrl) => {
          return {
            tag: 'script',
            attrs: {
              src: scriptUrl,
              defer: true, // 设置script的defer属性，确保在页面渲染前加载完成
            },
          }
        },
        modules: [
          'vue',
          'vue-router',
          // {
          //   name: 'vue-demi',
          //   var: 'VueDemi',
          //   path: 'dist/index.iife.min.js',
          // },
          // {
          //   name: 'pinia',
          //   var: 'Pinia',
          //   path: 'dist/pinia.iife.min.js',
          // },
          {
            name: 'element-plus',
            var: 'ElementPlus',
            path: 'dist/index.full.min.js',
            css: ['dist/index.css', 'theme-chalk/dark/css-vars.css'],
          },
          {
            name: 'echarts',
            var: 'echarts',
            alias: [
              'echarts/core',
              'echarts/renderers',
              'echarts/charts',
              'echarts/components',
              'echarts/features',
            ],
            path: 'dist/echarts.min.js',
          },
          {
            name: 'vditor',
            var: 'Vditor',
            path: 'dist/index.min.js',
            css: 'dist/index.min.css',
          },
        ],
      }),
      ElementPlus({}),
      VueI18nPlugin({
        // 声明哪些 locale 资源在构建时被插件处理
        // loadLocaleMessages 里 await localesMap[locale]() 仍是动态 import，但路径落在 include 内时，插件会在构建期把 JSON 预编译成更利于运行时的格式，而不是裸 JSON
        include: path.resolve(process.cwd(), './src/locales/**'),
        // 由于i18n.ts使用composition API，legacy为false，此处禁止修改
        compositionOnly: true,
      }),
      visualizer({
        open: isAnalysis,
        filename: 'dist/stats.html',
        template: 'treemap',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
