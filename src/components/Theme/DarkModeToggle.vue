<!-- 开发暗黑模式组件
添加主题切换组件

添加ELement Plus的暗黑主题样式
import 'element-plus/theme-chalk/dark/css-vars.css'

导入@vitejs/plugin-vue-jsx，并在vite.config.ts中配置vueJsx插件
尝试使用h函数创建icon组件vnode
尝试使用tsx语法创建icon组件vnode

使用useDark实现切换主题

解决el-switch组件的背景色不正确问题
在style中添加变量--el-switch-on-color: #333;

解决主题颜色切换时没有渐变效果的问题
全局样式中添加transition切换主题样式

添加prop:dark，允许用户设置默认主题

自定义元素使用dark:xxx添加暗黑主题样式
在main.css中添加tailwind的指令@custom-variant dark (&:where(.dark, .dark *))
 -->
<script setup lang="tsx">
import { ref, h, nextTick, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useDark, useToggle } from '@vueuse/core'

// ---------------------------创建Icon组件---------------------------------
// 使用h函数创建Icon组件
// const DarkIcon = h(Icon, { icon: 'prime:moon' })
// const LightIcon = h(Icon, { icon: 'octicon:sun-24' })

// 使用tsx语法创建Icon组件
const DarkIcon = () => <Icon icon="prime:moon" />
const LightIcon = () => <Icon icon="octicon:sun-24" />

// ------------------------------设置默认主题---------------------------------
const props = defineProps({
  dark: {
    type: Boolean,
    default: false,
  },
})

// ---------------------------实现主题切换---------------------------------
const isDark = useDark({
  disableTransition: false, // 启用过渡效果
})
isDark.value = props.dark

// 使用onChanged实现主题切换
// const isDark = useDark({
//   onChanged(dark) {
//     nextTick(() => {
//       document.documentElement.classList.toggle('dark', dark)
//     })
//   },
// })

// 使用ref和watch实现主题切换
// const isDark = ref(true)
// watch(
//   isDark,
//   () => {
//     nextTick(() => {
//       if (isDark.value) {
//         document.documentElement.classList.add('dark')
//       } else {
//         document.documentElement.classList.remove('dark')
//       }
//     })
//   },
//   { immediate: true },
// )
</script>

<template>
  <el-switch
    v-model="isDark"
    :active-action-icon="DarkIcon"
    :inactive-action-icon="LightIcon"
    style="--el-switch-on-color: #333"
  />
</template>

<style scoped></style>
