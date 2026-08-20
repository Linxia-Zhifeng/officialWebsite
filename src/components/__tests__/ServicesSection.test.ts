import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import ServicesSection from '../ServicesSection.vue'
import zh from '../../locales/zh'
import en from '../../locales/en'

function createTestWrapper() {
  const i18n = createI18n({
    legacy: false,
    locale: 'zh',
    fallbackLocale: 'en',
    messages: { zh, en }
  })

  return mount(ServicesSection, {
    global: {
      plugins: [i18n]
    },
    attachTo: document.body
  })
}

describe('ServicesSection 组件', () => {
  it('应该是一个 section 元素且包含 section 和 services 类', () => {
    const wrapper = createTestWrapper()
    expect(wrapper.element.tagName).toBe('SECTION')
    expect(wrapper.classes()).toContain('services')
    expect(wrapper.classes()).toContain('section')
  })

  it('应该渲染 section-title 包含标题和副标题', () => {
    const wrapper = createTestWrapper()
    const titleSection = wrapper.find('.section-title')
    expect(titleSection.exists()).toBe(true)

    const h2 = titleSection.find('h2')
    expect(h2.text()).toBe(zh.services.title)

    const p = titleSection.find('p')
    expect(p.text()).toBe(zh.services.subtitle)
  })

  it('应该渲染 services 翻译中的所有卡片', () => {
    const wrapper = createTestWrapper()
    const cards = wrapper.findAll('.service-card')
    expect(cards.length).toBe(zh.services.items.length)
  })

  it('每个 service-card 应该包含 SVG 图标、h3 标题、描述和装饰元素', () => {
    const wrapper = createTestWrapper()
    const cards = wrapper.findAll('.service-card')

    cards.forEach((card, idx) => {
      expect(card.find('.service-icon').exists()).toBe(true)
      expect(card.find('.service-icon svg').exists()).toBe(true)
      expect(card.find('.service-icon svg path').exists()).toBe(true)

      const h3 = card.find('h3.service-title')
      expect(h3.exists()).toBe(true)
      expect(h3.text()).toBe(zh.services.items[idx].title)

      const p = card.find('p.service-desc')
      expect(p.exists()).toBe(true)
      expect(p.text()).toBe(zh.services.items[idx].desc)

      expect(card.find('.service-decoration').exists()).toBe(true)
    })
  })

  it('应该使用 services-grid 网格布局', () => {
    const wrapper = createTestWrapper()
    expect(wrapper.find('.services-grid').exists()).toBe(true)
  })

  it('应该有 container 容器包裹', () => {
    const wrapper = createTestWrapper()
    expect(wrapper.find('.container').exists()).toBe(true)
  })
})
