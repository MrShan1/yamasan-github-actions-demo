import type { DirectiveBinding } from 'vue'

export default {
  mounted(el: any, binding: DirectiveBinding) {
    if (typeof binding.value !== 'function') {
      throw new Error('v-debounce callback must be a function')
    }

    let timer: any = null
    el.__debounceHandler = (...args: any) => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        binding.value(...args)
      }, 500)
    }
    el.addEventListener('click', el.__debounceHandler)
  },
  beforeUnmount(el: any) {
    el.removeEventListener('click', el.__debounceHandler)
  },
}
