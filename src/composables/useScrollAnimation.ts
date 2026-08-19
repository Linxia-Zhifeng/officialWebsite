import { onMounted } from 'vue'

/**
 * 全局共享的滚动入场动画 observer
 *
 * 设计要点：
 * 1. 单例 IntersectionObserver，避免每个组件各自 new 一个造成的内存浪费
 * 2. 元素进入视口后立即 unobserve，减少后续回调
 * 3. 通过 data-observed 标记去重，多次 scan 不会重复 observe
 * 4. 不再监听 window.scroll 事件 —— 入场动画靠 IntersectionObserver 自身触发
 *    路由切换时由 router.afterEach 主动调用 scanReveals 扫描新挂载的元素
 */

const REVEAL_SELECTORS = [
  '.reveal', '.reveal-left', '.reveal-right', '.reveal-scale',
  '.reveal-flip', '.reveal-shine',
  '.reveal-wave-l', '.reveal-wave-r',
  '.reveal-flow', '.reveal-flow-line',
  '.reveal-diag-tl', '.reveal-diag-br',
  '.reveal-ripple',
  '.reveal-draw', '.reveal-seq'
]
const NEW_SELECTOR = REVEAL_SELECTORS.map((s) => `${s}:not([data-reveal-observed])`).join(', ')

let observer: IntersectionObserver | null = null

function getObserver(): IntersectionObserver | null {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
    return null
  }
  if (observer) return observer

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          // 一次性触发，离开视口后不再关心
          observer?.unobserve(entry.target)
        }
      }
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  )

  return observer
}

/** 观察单个元素（供组件对特殊元素手动注册） */
export function observeReveal(el: Element | null | undefined | Iterable<Element>) {
  const ob = getObserver()
  if (!ob || !el) return

  if (Symbol.iterator in Object(el)) {
    for (const item of el as Iterable<Element>) {
      if (!item.hasAttribute('data-reveal-observed')) {
        item.setAttribute('data-reveal-observed', '1')
        ob.observe(item)
      }
    }
  } else if (el instanceof Element) {
    if (!(el as Element).hasAttribute('data-reveal-observed')) {
      ;(el as Element).setAttribute('data-reveal-observed', '1')
      ob.observe(el as Element)
    }
  }
}

/** 批量扫描文档中所有未观察的 reveal-* 元素并注册 */
export function scanReveals() {
  const ob = getObserver()
  if (!ob) return

  const elements = document.querySelectorAll(NEW_SELECTOR)
  if (elements.length === 0) return

  elements.forEach((el) => {
    el.setAttribute('data-reveal-observed', '1')
    ob.observe(el)
  })
}

/** Vue 组件入口：onMounted 时自动扫描一次 */
export function useScrollAnimation() {
  onMounted(() => {
    scanReveals()
  })

  return {
    scanReveals,
    observeReveal
  }
}
