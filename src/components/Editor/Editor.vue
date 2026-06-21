<template>
  <div ref="editor"></div>
</template>

<script setup lang="ts">
import { useTemplateRef, onMounted, shallowRef, onBeforeUnmount, watch, ref } from 'vue'
import Vditor from 'vditor'
import type { EditorProps, VditorOptions } from './types'
// import { defaultOptions } from './defaults'

import 'vditor/dist/index.css'

// 默认值（简单配置）
const defaultOptions: VditorOptions = {
  rtl: false, // RTL，无注释默认值，源码 false
  value: '', // 编辑器初始化值
  height: 'auto', // 编辑器总高度
  minHeight: 400, // 编辑器最小高度（你的业务需求，非 vditor 内置默认）
  width: 'auto', // 编辑器总宽度
  placeholder: '欢迎使用编辑器...', // 输入区域为空时的提示
  lang: 'zh_CN', // 多语言
  mode: 'ir', // 编辑模式：'ir'，即时渲染模式，类似与typora使用

  // 缓存
  cache: {
    enable: true, // 是否使用 localStorage
    id: Math.random().toString(36).slice(2), // ⚠️ 必填：使用 HTMLElement 初始化时需设置唯一 id
  },
}

const props = defineProps<EditorProps>()

const editorRef = useTemplateRef<HTMLDivElement>('editor')
const editorInstanceRef = shallowRef<Vditor>()

const emits = defineEmits<{
  init: [editorInstance: Vditor]
}>()

const modelValue = defineModel<string>()
watch(modelValue, (newVal) => {
  // 添加判断，避免重复设置值
  if (newVal && editorInstanceRef.value?.getValue() !== `${newVal}`) {
    editorInstanceRef.value?.setValue(newVal + '')
  }
})

const historyRef = ref('')
watch(
  () => props.options,
  (newOptions) => {
    // 获取旧实例的value
    historyRef.value = editorInstanceRef.value?.getValue() ?? ''
    // 销毁旧实例
    editorInstanceRef.value?.destroy()
    // 初始化新实例
    initEditor(newOptions)
  },
  { deep: true },
)

function initEditor(options: VditorOptions) {
  if (!editorRef.value) return

  const defaultAfter = options.after ?? (() => {})
  const defaultInput = options.input ?? (() => {})
  const editorInstance = new Vditor(editorRef.value, {
    ...defaultOptions,
    ...options,
    after: () => {
      defaultAfter()
      if (historyRef.value) {
        editorInstance.setValue(historyRef.value, true) // 清空历史堆栈，避免报错
      }
      modelValue.value = editorInstance.getValue()
    },
    input: (md: string) => {
      defaultInput(md)
      modelValue.value = md
    },
  })

  // 初始化modelValue
  modelValue.value = options.value ?? ''

  // 保存实例
  editorInstanceRef.value = editorInstance

  // 通过emit事件，将editorInstance传递出去，交由用户控制
  emits('init', editorInstance)

  return editorInstance
}

onMounted(() => {
  initEditor(props.options)
})

onBeforeUnmount(() => {
  editorInstanceRef.value?.destroy()
})
</script>
