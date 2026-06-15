import type { Directive, DirectiveBinding } from 'vue'

const blinkStyle = `
  @keyframes blink {
    to {
      visibility: hidden;
    }
  }

  .cursor-blink::after {
    content: '_';
    margin-left: .25rem;
    vertical-align: baseline;
    animation: blink 1s steps(5, start) infinite;
  }
`

function addStylesOnce(css: any, id: string) {
  if (!document.head.querySelector(`#${id}`)) {
    const style = document.createElement('style')
    style.id = id
    style.textContent = css
    document.head.appendChild(style)
  }
}

// 打字机指令
export default {
  mounted(el: any, binding: DirectiveBinding) {
    // css -> 模拟光标闪烁效果
    addStylesOnce(blinkStyle, 'v-flash-animation') // 添加打字机动画样式

    // 添加打字机光标样式
    el.classList.add('cursor-blink')

    // 获取文本内容 -> 获取总长度
    const text: string = el.textContent || ''
    if (text.length === 0) return

    // 设置随机数 -> 随机数小于总长度 -> 用于回退文本
    const len = text.length
    const random = Math.floor(Math.random() * len) // 0 ~ len-1，回退后剩余字符数

    // 文本回退：每隔200ms删除一个字符 -> 删除到指定长度后停止
    let content = text
    const deleteTimer = setInterval(() => {
      content = content.slice(0, -1)
      el.textContent = content
      if (content.length === random) {
        clearInterval(deleteTimer)
        // 文本恢复：每隔1s添加一个字符 -> 添加完毕 -> 这是一个轮回
        const restoreTimer = setInterval(() => {
          content = content + text[content.length]
          el.textContent = content
          if (content.length === len) {
            clearInterval(restoreTimer)
          }
        }, 1000)
      }
    }, 200)
  },
} as Directive
