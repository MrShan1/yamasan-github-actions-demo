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

// 清除指定元素上的定时器
const timerMap = new WeakMap<HTMLElement, Set<number>>()
function clearTimerOnElement(el: HTMLElement, timer?: number) {
  const timers = timerMap.get(el)
  if (!timers) {
    return
  }

  if (timer) {
    clearInterval(timer)
    timers.delete(timer)
  } else if (timers.size > 0) {
    timers.forEach((timer) => clearTimerOnElement(el, timer))
    timerMap.delete(el)
  }
}

// 打字机指令
export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // css -> 模拟光标闪烁效果
    addStylesOnce(blinkStyle, 'v-flash-animation') // 添加打字机动画样式

    // 获取文本内容 -> 获取总长度
    const text = el.innerText
    const children = el.children

    // 初始化定时器集合
    timerMap.set(el, new Set<number>())
    const clearTimer = (timer: number) => {
      clearTimerOnElement(el, timer)
    }
    const addTimer = (timer: number) => {
      timerMap.get(el)?.add(timer)
    }

    const run = (node: HTMLElement, nodeText: string, cb?: () => void) => {
      // 动画开始时添加打字机光标样式
      node.classList.add('cursor-blink')

      // 设置随机数 -> 随机数小于总长度 -> 用于回退文本
      const len = nodeText.length
      const random = Math.floor(Math.random() * len) // 0 ~ len-1，回退后剩余字符数

      // 文本回退：每隔200ms删除一个字符 -> 删除到指定长度后停止
      let content = nodeText
      const timer = setInterval(() => {
        content = content.slice(0, -1)
        node.innerText = content
        if (content.length === random) {
          clearTimer(timer)
          // 文本恢复：每隔1s添加一个字符 -> 直到添加完毕 -> 这是一个轮回
          const timer2 = setInterval(() => {
            content = content + nodeText[content.length]
            node.innerText = content
            if (content.length === len) {
              clearTimer(timer2)
              // 动画结束时移除打字机光标样式
              node.classList.remove('cursor-blink')
              // 3秒后重新开始
              setTimeout(() => {
                if (cb) {
                  cb()
                } else {
                  run(node, nodeText)
                }
              }, 3000)
            }
          }, 1000)
          addTimer(timer2)
        }
      }, 200)
      addTimer(timer)
    }

    if (text.length > 0 && children.length === 0) {
      // 单个元素时，直接执行打字机动画
      run(el, text)
    } else if (children.length > 0) {
      // 列表时，随机选择一个子元素，并执行打字机动画
      const runChildren = () => {
        const randomIndex = Math.floor(Math.random() * children.length)
        const child = children[randomIndex] as HTMLElement
        const childText = child.innerText
        run(child, childText, () => {
          runChildren()
        })
      }
      runChildren()
    }
  },
  beforeUnmount(el: HTMLElement) {
    clearTimerOnElement(el) // 清理尚未执行完成的定时器
  },
} as Directive
