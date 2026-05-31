import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vite'
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

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter(),
    vue(),
    vueJsx(),
    vueDevTools(),
    tailwindcss(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: [VueRouterAutoImports],
    }),
    Components({
      directoryAsNamespace: false, // 是否将目录作为命名空间
      collapseSamePrefixes: false, // 是否合并相同的前缀
      resolvers: [ElementPlusResolver()],
    }),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    }),
    ElementPlus({}),
    VueI18nPlugin({
      // locale messages resource pre-compile option
      include: path.resolve(process.cwd(), './src/locales/**'),
      // 由于i18n.ts使用composition API，legacy为false，此处禁止修改
      compositionOnly: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
