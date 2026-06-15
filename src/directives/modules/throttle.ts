import type { DirectiveBinding } from 'vue'

export default {
  mounted(el: any, binding: DirectiveBinding) {
    if (typeof binding.value !== 'function') {
      throw new Error('v-throttle callback must be a function')
    }

    let timer: any = null
    el.__throttleHandler = (...args: any) => {
      if (timer) {
        return
      }
      binding.value(...args)
      timer = setTimeout(() => {
        timer = null
      }, 1000)
    }
    el.addEventListener('click', el.__throttleHandler)
  },
  beforeUnmount(el: any) {
    el.removeEventListener('click', el.__throttleHandler)
  },
}
