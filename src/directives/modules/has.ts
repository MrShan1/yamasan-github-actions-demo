import type { DirectiveBinding } from 'vue'
import { useUserStore } from '@/store/user'
import { watch } from 'vue'

// 权限指令
export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<string | string[], any, string>) {
    const store = useUserStore()
    const arg = binding.arg || 'roles'
    const { not = false } = binding.modifiers || {}

    if (!(arg in store)) {
      throw new Error(`${arg} not found in userStore`)
    }

    let values = binding.value || []
    if (typeof values === 'string') {
      values = [values]
    }

    const checkPermission = () => {
      if (Array.isArray(values)) {
        // @ts-ignore
        const hasRole = values.some((value) => store[arg].includes(value))
        const hasPermission = not ? !hasRole : hasRole
        if (!hasPermission) {
          el.style.display = 'none' // 无权限时，隐藏元素
        } else {
          el.style.display = '' // 有权限时，显示元素
        }
      }
      return
    }

    // 角色权限变化时，重新检查权限
    watch(
      () => {
        // @ts-ignore
        return store[arg]
      },
      () => checkPermission(),
      { immediate: true, deep: true },
    )
  },
}
