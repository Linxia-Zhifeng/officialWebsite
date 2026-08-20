import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import AdvantagesSection from '../AdvantagesSection.vue'
import zh from '../../locales/zh'
import en from '../../locales/en'

function createTestWrapper() {
  const i18n = createI18n({
    legacy: false,
    locale: 'zh',
    fallbackLocale: 'en',
    messages: { zh, en }
  })

  return mount(AdvantagesSection, {
    global: {
      plugins: [i18n]
    },
    attachTo: document.body
  })
}

describe('AdvantagesSection 组件', () => {
  it('应该是一个 section 元素且包含 section 和 advantages 类', () => {
    const wrapper = createTestWrapper()
    expect(wrapper.element.tagName).toBe('SECTION')
    expect(wrapper.classes()).toContain('advantages')
    expect(wrapper.classes()).toContain('section')
  })

  it('应该渲染 section-title 包含标题和副标题', () => {
    const wrapper = createTestWrapper()
    const titleSection = wrapper.find('.section-title')
    expect(titleSection.exists()).toBe(true)

    const h2 = titleSection.find('h2')
    expect(h2.text()).toBe(zh.advantages.title)

    const p = titleSection.find('p')
    expect(p.text()).toBe(zh.advantages.subtitle)
  })

  it('应该渲染 4 个 advantage-card 卡片', () => {
    const wrapper = createTestWrapper()
    const cards = wrapper.findAll('.advantage-card')
    expect(cards.length).toBe(4)
  })

  it('每个卡片应该包含 SVG 图标、h3 标题和描述', () => {
    const wrapper = createTestWrapper()
    const cards = wrapper.findAll('.advantage-card')

    cards.forEach((card, idx) => {
      expect(card.find('.advantage-icon').exists()).toBe(true)
      expect(card.find('.advantage-icon svg').exists()).toBe(true)
      expect(card.find('.advantage-icon svg path').exists()).toBe(true)

      const h3 = card.find('h3.advantage-title')
      expect(h3.exists()).toBe(true)
      expect(h3.text()).toBe(zh.advantages.items[idx].title)

      const p = card.find('p.advantage-desc')
      expect(p.exists()).toBe(true)
      expect(p.text()).toBe(zh.advantages.items[idx].desc)
    })
  })

  it('应该使用 advantages-grid 网格布局', () => {
    const wrapper = createTestWrapper()
    expect(wrapper.find('.advantages-grid').exists()).toBe(true)
  })

  it('应该有 container 容器包裹', () => {
    const wrapper = createTestWrapper()
    expect(wrapper.find('.container').exists()).toBe(true)
  })

  it('每个卡片图标应该有对应的 SVG path', () => {
    const wrapper = createTestWrapper()
    const cards = wrapper.findAll('.advantage-card')

    cards.forEach(card => {
      const path = card.find('svg path')
      expect(path.exists()).toBe(true)
      const d = path.attributes('d')
      expect(d).toBeDefined()
      expect(d!.length).toBeGreaterThan(0)
    })
  })
})
