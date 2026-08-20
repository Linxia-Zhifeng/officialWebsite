import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomePage from '../HomePage.vue'

// setup.ts 已经全局注册 i18n 和 router
function pageMount() {
  const sectionStub = {
    template: '<section class="stubbed-section"><slot /></section>'
  }
  return mount(HomePage, {
    global: {
      stubs: {
        HeroSection: sectionStub,
        AdvantagesSection: sectionStub,
        ServicesSection: sectionStub,
        ProcessSection: sectionStub,
        CasesSection: sectionStub,
        AboutSection: sectionStub,
        ContactSection: sectionStub
      }
    },
    attachTo: document.body
  })
}

describe('HomePage 页面', () => {
  it('根元素应该是 main 标签且含有 home-page 类', () => {
    const wrapper = pageMount()
    expect(wrapper.element.tagName).toBe('MAIN')
    expect(wrapper.classes()).toContain('home-page')
  })

  it('应该包含 HeroSection 组件', () => {
    const wrapper = pageMount()
    const sections = wrapper.findAll('.stubbed-section')
    expect(sections.length).toBe(7)
  })

  it('应该依次包含 7 个 section 子组件', () => {
    const wrapper = pageMount()
    const main = wrapper.find('.home-page')
    const sections = main.findAll('.stubbed-section')
    expect(sections.length).toBe(7)
  })
})
