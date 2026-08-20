import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { scanReveals, observeReveal, useScrollAnimation } from '../useScrollAnimation'

describe('useScrollAnimation', () => {
  beforeEach(() => {
    // 清空 body
    document.body.innerHTML = ''
    vi.clearAllMocks()
  })

  it('useScrollAnimation 应该返回 scanReveals 和 observeReveal 函数', () => {
    const result = useScrollAnimation()
    expect(result).toHaveProperty('scanReveals')
    expect(result).toHaveProperty('observeReveal')
    expect(typeof result.scanReveals).toBe('function')
    expect(typeof result.observeReveal).toBe('function')
  })

  it('observeReveal 应该接受单个 Element 参数', () => {
    const el = document.createElement('div')
    el.className = 'reveal'
    document.body.appendChild(el)

    observeReveal(el)
    expect(el.hasAttribute('data-reveal-observed')).toBe(true)
  })

  it('observeReveal 应该接受 Element 数组/可迭代参数', () => {
    const el1 = document.createElement('div')
    el1.className = 'reveal'
    const el2 = document.createElement('div')
    el2.className = 'reveal-left'
    document.body.appendChild(el1)
    document.body.appendChild(el2)

    observeReveal([el1, el2] as any)
    expect(el1.hasAttribute('data-reveal-observed')).toBe(true)
    expect(el2.hasAttribute('data-reveal-observed')).toBe(true)
  })

  it('observeReveal 对已观察的元素不重复标记', () => {
    const el = document.createElement('div')
    el.className = 'reveal'
    el.setAttribute('data-reveal-observed', '1')
    document.body.appendChild(el)

    // 应该不会抛出异常
    expect(() => observeReveal(el)).not.toThrow()
  })

  it('observeReveal 对 null/undefined 安全', () => {
    expect(() => observeReveal(null)).not.toThrow()
    expect(() => observeReveal(undefined)).not.toThrow()
  })

  it('scanReveals 应该扫描所有 reveal-* 类的元素', () => {
    const el1 = document.createElement('div')
    el1.className = 'reveal'
    const el2 = document.createElement('div')
    el2.className = 'reveal-left'
    const el3 = document.createElement('div')
    el3.className = 'reveal-scale'
    document.body.appendChild(el1)
    document.body.appendChild(el2)
    document.body.appendChild(el3)

    scanReveals()

    expect(el1.hasAttribute('data-reveal-observed')).toBe(true)
    expect(el2.hasAttribute('data-reveal-observed')).toBe(true)
    expect(el3.hasAttribute('data-reveal-observed')).toBe(true)
  })

  it('scanReveals 不应重复扫描已标记的元素', () => {
    const el = document.createElement('div')
    el.className = 'reveal'
    el.setAttribute('data-reveal-observed', '1')
    document.body.appendChild(el)

    const setAttributeSpy = vi.spyOn(el, 'setAttribute')
    scanReveals()
    expect(setAttributeSpy).not.toHaveBeenCalledWith('data-reveal-observed', '1')
  })

  it('scanReveals 支持所有支持的 reveal 选择器类型', () => {
    const selectors = [
      'reveal', 'reveal-left', 'reveal-right', 'reveal-scale',
      'reveal-flip', 'reveal-wave-l', 'reveal-wave-r',
      'reveal-flow', 'reveal-flow-line',
      'reveal-diag-tl', 'reveal-diag-br',
      'reveal-ripple', 'reveal-draw', 'reveal-seq'
    ]

    selectors.forEach(cls => {
      const el = document.createElement('div')
      el.className = cls
      document.body.appendChild(el)
    })

    scanReveals()

    selectors.forEach((cls, idx) => {
      const found = document.querySelectorAll(`.${cls}`)[0]
      expect(found.hasAttribute('data-reveal-observed'), `${cls} should be observed`).toBe(true)
    })
  })

  it('scanReveals 在没有匹配元素时安全返回', () => {
    document.body.innerHTML = ''
    expect(() => scanReveals()).not.toThrow()
  })

  it('observeReveal 对非 Element 类型（如纯对象）安全跳过', () => {
    const fakeObj: any = { [Symbol.iterator]: () => ({ next: () => ({ done: true, value: undefined }) }) }
    expect(() => observeReveal(fakeObj)).not.toThrow()
  })

  it('getObserver 在无 IntersectionObserver 环境安全返回 null（SSR 守卫）', () => {
    // 保存原始值
    const origIO = window.IntersectionObserver

    try {
      // 模拟 IntersectionObserver 不存在
      Object.defineProperty(window, 'IntersectionObserver', {
        value: undefined,
        configurable: true,
        writable: true
      })
      // scanReveals/observeReveal 内部 getObserver 检测到 IO 不存在应该安全返回
      expect(() => scanReveals()).not.toThrow()
      expect(() => observeReveal(document.createElement('div'))).not.toThrow()
    } finally {
      // 恢复
      Object.defineProperty(window, 'IntersectionObserver', {
        value: origIO,
        configurable: true,
        writable: true
      })
    }
  })

  it('useScrollAnimation 在组件 onMounted 时调用 scanReveals', () => {
    // 创建一个使用 useScrollAnimation 的测试组件
    const TestComponent = defineComponent({
      setup() {
        useScrollAnimation()
        return () => null
      }
    })

    const el = document.createElement('div')
    el.className = 'reveal'
    document.body.appendChild(el)

    mount(TestComponent)

    // onMounted 会调用 scanReveals，元素应该被标记为 observed
    expect(el.hasAttribute('data-reveal-observed')).toBe(true)
  })
})
