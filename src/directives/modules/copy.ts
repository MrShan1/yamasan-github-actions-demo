import type { DirectiveBinding } from 'vue'
import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'

// 复制指令
export default {
  mounted(el: any, binding: DirectiveBinding) {
    const { mute = false } = binding.modifiers // 指令修饰符
    const { copy } = useClipboard({ source: binding.value })
    el.__copyData = binding.value
    el.__clickHandler = el.addEventListener('click', () => {
      copy(el.__copyData)
      !mute &&
        ElMessage({
          type: 'success',
          message: '复制成功',
        })
    })
  },
  updated(el: any, binding: DirectiveBinding) {
    el.__copyData = binding.value
  },
  unmounted(el: any) {
    el.removeEventListener('click', el.__clickHandler)
  },
}
