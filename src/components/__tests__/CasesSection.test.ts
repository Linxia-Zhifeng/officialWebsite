import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { config } from '@vue/test-utils'
import CasesSection from '../CasesSection.vue'
import zh from '../../locales/zh'

// setup.ts 已全局安装 i18n 和 router
function createTestWrapper() {
  return mount(CasesSection, { attachTo: document.body })
}

function getRouter() {
  return (config.global.plugins || []).find((p: any) => p && p.currentRoute)
}

describe('CasesSection 组件', () => {
  it('应该是一个 section 元素且包含 section 和 cases 类', () => {
    const wrapper = createTestWrapper()
    expect(wrapper.element.tagName).toBe('SECTION')
    expect(wrapper.classes()).toContain('cases')
    expect(wrapper.classes()).toContain('section')
  })

  it('应该渲染 section-title 包含标题和副标题', () => {
    const wrapper = createTestWrapper()
    const titleSection = wrapper.find('.section-title')
    expect(titleSection.find('h2').text()).toBe(zh.cases.title)
    expect(titleSection.find('p').text()).toBe(zh.cases.subtitle)
  })

  it('应该渲染 cases 翻译中的所有案例卡片', () => {
    const wrapper = createTestWrapper()
    const cards = wrapper.findAll('.case-card')
    expect(cards.length).toBe(zh.cases.items.length)
  })

  it('每个 case-card 应该包含 case-cover SVG 和 case-content', () => {
    const wrapper = createTestWrapper()
    const cards = wrapper.findAll('.case-card')

    cards.forEach((card, idx) => {
      const cover = card.find('.case-cover')
      expect(cover.exists()).toBe(true)
      expect(cover.find('svg').exists()).toBe(true)

      const content = card.find('.case-content')
      expect(content.exists()).toBe(true)
      expect(content.find('.case-tag').text()).toBe(zh.cases.items[idx].industry)
      expect(content.find('.case-title').text()).toBe(zh.cases.items[idx].title)
      expect(content.find('.case-result').text()).toBe(zh.cases.items[idx].result)
    })
  })

  it('应该渲染"查看更多"按钮', () => {
    const wrapper = createTestWrapper()
    const more = wrapper.find('.cases-more')
    expect(more.exists()).toBe(true)
    const btn = more.find('button.btn')
    expect(btn.exists()).toBe(true)
    expect(btn.text()).toContain(zh.cases.more)
  })

  it('点击"查看更多"按钮应该跳转到 /cases', async () => {
    const wrapper = createTestWrapper()
    const router = getRouter()
    const pushSpy = vi.spyOn(router, 'push')

    const btn = wrapper.find('.cases-more button')
    await btn.trigger('click')

    expect(pushSpy).toHaveBeenCalledWith('/cases')
  })

  it('应该使用 cases-grid 网格布局', () => {
    const wrapper = createTestWrapper()
    expect(wrapper.find('.cases-grid').exists()).toBe(true)
  })
})
