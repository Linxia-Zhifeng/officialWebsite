import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import ProcessSection from '../ProcessSection.vue'
import zh from '../../locales/zh'
import en from '../../locales/en'

function createTestWrapper() {
  const i18n = createI18n({
    legacy: false,
    locale: 'zh',
    fallbackLocale: 'en',
    messages: { zh, en }
  })

  return mount(ProcessSection, {
    global: { plugins: [i18n] },
    attachTo: document.body
  })
}

describe('ProcessSection 组件', () => {
  it('应该是一个 section 元素且包含 section 和 process 类', () => {
    const wrapper = createTestWrapper()
    expect(wrapper.element.tagName).toBe('SECTION')
    expect(wrapper.classes()).toContain('process')
    expect(wrapper.classes()).toContain('section')
  })

  it('应该渲染 section-title 包含标题和副标题', () => {
    const wrapper = createTestWrapper()
    const titleSection = wrapper.find('.section-title')
    expect(titleSection.exists()).toBe(true)
    expect(titleSection.find('h2').text()).toBe(zh.process.title)
    expect(titleSection.find('p').text()).toBe(zh.process.subtitle)
  })

  it('应该渲染 process-timeline 时间线', () => {
    const wrapper = createTestWrapper()
    expect(wrapper.find('.process-timeline').exists()).toBe(true)
  })

  it('应该根据翻译渲染所有 process-step 步骤', () => {
    const wrapper = createTestWrapper()
    const steps = wrapper.findAll('.process-step')
    expect(steps.length).toBe(zh.process.steps.length)
  })

  it('每个 step 应该包含 step-dot 和 step-content', () => {
    const wrapper = createTestWrapper()
    const steps = wrapper.findAll('.process-step')

    steps.forEach((step, idx) => {
      const dot = step.find('.step-dot')
      expect(dot.exists()).toBe(true)
      expect(dot.find('.step-number').text()).toBe(String(idx + 1))

      const content = step.find('.step-content')
      expect(content.exists()).toBe(true)
      expect(content.find('.step-label').text()).toBe(zh.process.steps[idx])
    })
  })

  it('除了最后一个步骤外，其他步骤应该有 step-line 连接线', () => {
    const wrapper = createTestWrapper()
    const steps = wrapper.findAll('.process-step')
    const lines = wrapper.findAll('.step-line')
    expect(lines.length).toBe(steps.length - 1)
  })
})
