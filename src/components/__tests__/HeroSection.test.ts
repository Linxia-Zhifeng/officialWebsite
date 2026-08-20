import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { config } from '@vue/test-utils'
import HeroSection from '../HeroSection.vue'
import zh from '../../locales/zh'

function createTestWrapper() {
  return mount(HeroSection, { attachTo: document.body })
}

function getRouter() {
  return (config.global.plugins || []).find((p: any) => p && p.currentRoute)
}

describe('HeroSection 组件', () => {
  it('应该是一个 section 元素且含有 hero 类', () => {
    const wrapper = createTestWrapper()
    expect(wrapper.element.tagName).toBe('SECTION')
    expect(wrapper.classes()).toContain('hero')
  })

  it('应该渲染背景元素 (bars-left, bars-right, scatter-dots)', () => {
    const wrapper = createTestWrapper()
    expect(wrapper.find('.hero-bg').exists()).toBe(true)
    expect(wrapper.find('.bars-left').exists()).toBe(true)
    expect(wrapper.find('.bars-right').exists()).toBe(true)
    expect(wrapper.find('.scatter-dots').exists()).toBe(true)
  })

  it('左侧 bars 应该有 7 个 bar 元素', () => {
    const wrapper = createTestWrapper()
    const bars = wrapper.find('.bars-left').findAll('.bar')
    expect(bars.length).toBe(7)
  })

  it('右侧 bars 应该有 6 个 bar 元素', () => {
    const wrapper = createTestWrapper()
    const bars = wrapper.find('.bars-right').findAll('.bar')
    expect(bars.length).toBe(6)
  })

  it('scatter-dots 应该有 10 个 dot 元素', () => {
    const wrapper = createTestWrapper()
    const dots = wrapper.find('.scatter-dots').findAll('.dot')
    expect(dots.length).toBe(10)
  })

  it('应该渲染 logo-mark 区域和 logo 图片', () => {
    const wrapper = createTestWrapper()
    const logoMark = wrapper.find('.logo-mark')
    expect(logoMark.exists()).toBe(true)
    expect(logoMark.find('img').exists()).toBe(true)
  })

  it('应该渲染主标题 (h1)', () => {
    const wrapper = createTestWrapper()
    const h1 = wrapper.find('h1.hero-title')
    expect(h1.exists()).toBe(true)
    expect(h1.text()).toBe(zh.hero.title)
  })

  it('应该渲染副标题', () => {
    const wrapper = createTestWrapper()
    const subtitle = wrapper.find('.hero-subtitle')
    expect(subtitle.exists()).toBe(true)
    expect(subtitle.text()).toBe(zh.hero.subtitle)
  })

  it('应该渲染两个按钮在 hero-actions 中', () => {
    const wrapper = createTestWrapper()
    const actions = wrapper.find('.hero-actions')
    expect(actions.exists()).toBe(true)

    const buttons = actions.findAll('button')
    expect(buttons.length).toBe(2)
  })

  it('第一个按钮应该有正确的 btn2 文案和 btn-primary 类', () => {
    const wrapper = createTestWrapper()
    const buttons = wrapper.findAll('.hero-actions button')
    expect(buttons[0].text()).toBe(zh.hero.btn2)
    expect(buttons[0].classes()).toContain('btn-primary')
  })

  it('第二个按钮应该有正确的 btn3 文案和 btn-secondary 类', () => {
    const wrapper = createTestWrapper()
    const buttons = wrapper.findAll('.hero-actions button')
    expect(buttons[1].text()).toBe(zh.hero.btn3)
    expect(buttons[1].classes()).toContain('btn-secondary')
  })

  it('点击 btn2 (查看案例) 应该跳转到 /cases', async () => {
    const wrapper = createTestWrapper()
    const router = getRouter()
    const pushSpy = vi.spyOn(router, 'push')

    const buttons = wrapper.findAll('.hero-actions button')
    await buttons[0].trigger('click')

    expect(pushSpy).toHaveBeenCalledWith('/cases')
  })

  it('点击 btn3 (联系团队) 应该跳转到 /contact', async () => {
    const wrapper = createTestWrapper()
    const router = getRouter()
    const pushSpy = vi.spyOn(router, 'push')

    const buttons = wrapper.findAll('.hero-actions button')
    await buttons[1].trigger('click')

    expect(pushSpy).toHaveBeenCalledWith('/contact')
  })

  it('应该有 container 容器包裹内容区域', () => {
    const wrapper = createTestWrapper()
    expect(wrapper.find('.container.hero-content').exists()).toBe(true)
  })

  it('onMounted 后 isLoaded 应该在 setTimeout 后变为 true', async () => {
    vi.useFakeTimers()
    const wrapper = createTestWrapper()

    // 初始 isLoaded 为 false
    expect((wrapper.vm as any).isLoaded).toBe(false)

    // 快进 100ms 触发 setTimeout
    vi.advanceTimersByTime(150)

    await wrapper.vm.$nextTick()
    expect((wrapper.vm as any).isLoaded).toBe(true)

    vi.useRealTimers()
  })

  it('isLoaded 为 true 后 hero-content 应该有 loaded 类', async () => {
    vi.useFakeTimers()
    const wrapper = createTestWrapper()
    vi.advanceTimersByTime(150)
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.hero-content').classes()).toContain('loaded')
    vi.useRealTimers()
  })

  it('isLoaded 为 true 后 logo-mark 应该有 animate 类', async () => {
    vi.useFakeTimers()
    const wrapper = createTestWrapper()
    vi.advanceTimersByTime(150)
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.logo-mark').classes()).toContain('animate')
    vi.useRealTimers()
  })
})
