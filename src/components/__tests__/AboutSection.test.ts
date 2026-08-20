import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import AboutSection from '../AboutSection.vue'
import zh from '../../locales/zh'
import en from '../../locales/en'

function createTestWrapper() {
  const i18n = createI18n({
    legacy: false,
    locale: 'zh',
    fallbackLocale: 'en',
    messages: { zh, en }
  })

  return mount(AboutSection, {
    global: { plugins: [i18n] },
    attachTo: document.body
  })
}

describe('AboutSection 组件', () => {
  it('应该是一个 section 元素且包含 about 和 section 类', () => {
    const wrapper = createTestWrapper()
    expect(wrapper.element.tagName).toBe('SECTION')
    expect(wrapper.classes()).toContain('about')
    expect(wrapper.classes()).toContain('section')
  })

  it('应该包含 about-content 双栏布局', () => {
    const wrapper = createTestWrapper()
    expect(wrapper.find('.about-content').exists()).toBe(true)
  })

  it('应该包含 about-text 文本区域', () => {
    const wrapper = createTestWrapper()
    const text = wrapper.find('.about-text')
    expect(text.exists()).toBe(true)
  })

  it('about-text 应该有 title 和 3 段描述', () => {
    const wrapper = createTestWrapper()
    const text = wrapper.find('.about-text')
    const title = text.find('h2.about-title')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe(zh.about.title)

    const descs = text.findAll('p.about-desc')
    expect(descs.length).toBe(3)
    expect(descs[0].text()).toBe(zh.about.p1)
    expect(descs[1].text()).toBe(zh.about.p2)
    expect(descs[2].text()).toBe(zh.about.p3)
  })

  it('应该包含 about-visual 视觉区域和 logo 图片', () => {
    const wrapper = createTestWrapper()
    const visual = wrapper.find('.about-visual')
    expect(visual.exists()).toBe(true)
    expect(visual.find('.about-logo').exists()).toBe(true)
    expect(visual.find('.about-logo').element.tagName).toBe('IMG')
  })

  it('应该有 container 容器包裹', () => {
    const wrapper = createTestWrapper()
    expect(wrapper.find('.container').exists()).toBe(true)
  })
})
