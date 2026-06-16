import type { DirectiveBinding } from 'vue'
import { useUserStore } from '@/store/user'
import { watch } from 'vue'

// 权限指令
export default {
  mounted(el: any, binding: DirectiveBinding) {
    const store = useUserStore()
    const { not } = binding.modifiers

    let values: string | string[] = binding.value
    if (typeof values === 'string') {
      values = [values]
    }

    const checkPermission = () => {
      if (Array.isArray(values)) {
        const hasRole = values.some((value) => store.roles.includes(value))
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
      () => store.roles,
      () => checkPermission(),
      { immediate: true, deep: true },
    )
  },
}
