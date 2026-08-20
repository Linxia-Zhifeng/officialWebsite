import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createRouter, createMemoryHistory } from 'vue-router'
import { config } from '@vue/test-utils'
import ServicesPage from '../ServicesPage.vue'
import CapabilitiesPage from '../CapabilitiesPage.vue'
import CasesPage from '../CasesPage.vue'
import AboutPage from '../AboutPage.vue'
import ContactPage from '../ContactPage.vue'
import zh from '../../locales/zh'
import en from '../../locales/en'

/**
 * 在这个文件里，每个 describe 初始化时创建一次性的 i18n + router 插件，
 * 并通过修改 config.global.plugins 安装；避免每次 mount 新建 router
 * 导致 "Cannot redefine property: $route" 错误。
 */
let i18n: any
let router: any

beforeEach(() => {
  if (!i18n) {
    i18n = createI18n({
      legacy: false,
      locale: 'zh',
      fallbackLocale: 'en',
      messages: { zh, en }
    })
  }
  if (!router) {
    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', name: 'home', component: { template: '<div/>' } },
        { path: '/services', name: 'services', component: { template: '<div/>' } },
        { path: '/capabilities', name: 'capabilities', component: { template: '<div/>' } },
        { path: '/cases', name: 'cases', component: { template: '<div/>' } },
        { path: '/about', name: 'about', component: { template: '<div/>' } },
        { path: '/contact', name: 'contact', component: { template: '<div/>' } }
      ]
    })
  }
  // 仅当没有全局插件时再注入（避免重复注入）
  if (!config.global.plugins || config.global.plugins.length === 0) {
    config.global.plugins = [i18n, router]
  }
  if (!config.global.stubs || !Object.keys(config.global.stubs).length) {
    config.global.stubs = {
      'router-link': {
        props: ['to'],
        template: '<a :href="to"><slot /></a>'
      },
      'router-view': { template: '<slot />' }
    }
  }
})

function pageMount(component: any) {
  return mount(component, { attachTo: document.body })
}

describe('ServicesPage 页面', () => {
  it('根元素应该是 main 标签且含有 services-page 类', () => {
    const wrapper = pageMount(ServicesPage)
    expect(wrapper.element.tagName).toBe('MAIN')
    expect(wrapper.classes()).toContain('services-page')
  })

  it('应该包含 page-header section 及 title/subtitle', () => {
    const wrapper = pageMount(ServicesPage)
    const header = wrapper.find('.page-header')
    expect(header.exists()).toBe(true)
    expect(header.find('h1.page-title').text()).toBe(zh.services.title)
    expect(header.find('p.page-subtitle').text()).toBe(zh.services.subtitle)
  })

  it('应该渲染 servicesDetail.items 中的所有 service-block', () => {
    const wrapper = pageMount(ServicesPage)
    const blocks = wrapper.findAll('.service-block')
    expect(blocks.length).toBeGreaterThan(0)
    expect(blocks.length).toBe(zh.servicesDetail.items.length)
  })
})

describe('CapabilitiesPage 页面', () => {
  it('根元素应该是 main 标签且含有 capabilities-page 类', () => {
    const wrapper = pageMount(CapabilitiesPage)
    expect(wrapper.element.tagName).toBe('MAIN')
    expect(wrapper.classes()).toContain('capabilities-page')
  })

  it('应该包含 page-header 及标题副标题', () => {
    const wrapper = pageMount(CapabilitiesPage)
    const header = wrapper.find('.page-header')
    expect(header.find('h1.page-title').text()).toBe(zh.capabilities.title)
    expect(header.find('p.page-subtitle').text()).toBe(zh.capabilities.subtitle)
  })

  it('应该渲染 capabilities 所有 cap-card 卡片', () => {
    const wrapper = pageMount(CapabilitiesPage)
    const cards = wrapper.findAll('.cap-card')
    expect(cards.length).toBe(zh.capabilities.items.length)
  })

  it('每个 cap-card 应该有编号、标题、描述和子项列表', () => {
    const wrapper = pageMount(CapabilitiesPage)
    const cards = wrapper.findAll('.cap-card')

    cards.forEach((card, idx) => {
      expect(card.find('.cap-number').text()).toBe(String(idx + 1).padStart(2, '0'))
      expect(card.find('h3.cap-title').exists()).toBe(true)
      expect(card.find('p.cap-desc').exists()).toBe(true)
      expect(card.find('ul.cap-items').exists()).toBe(true)
    })
  })
})

describe('CasesPage 页面', () => {
  it('根元素应该是 main 标签且含有 cases-page 类', () => {
    const wrapper = pageMount(CasesPage)
    expect(wrapper.element.tagName).toBe('MAIN')
    expect(wrapper.classes()).toContain('cases-page')
  })

  it('应该包含 page-header 及标题副标题', () => {
    const wrapper = pageMount(CasesPage)
    const header = wrapper.find('.page-header')
    expect(header.find('h1.page-title').text()).toBe(zh.cases.title)
    expect(header.find('p.page-subtitle').text()).toBe(zh.cases.subtitle)
  })

  it('应该渲染 filters 筛选标签', () => {
    const wrapper = pageMount(CasesPage)
    const tabs = wrapper.findAll('.filter-tab')
    expect(tabs.length).toBeGreaterThan(0)
    expect(tabs.length).toBe(zh.cases.filters.length)
  })

  it('应该渲染 case-detail-card 案例详情卡片', () => {
    const wrapper = pageMount(CasesPage)
    const cards = wrapper.findAll('.case-detail-card')
    expect(cards.length).toBeGreaterThan(0)
  })

  it('activeFilter 默认应该是 "all"', () => {
    const wrapper = pageMount(CasesPage)
    expect((wrapper.vm as any).activeFilter).toBe('all')
  })

  it('点击筛选标签应该切换 activeFilter', async () => {
    const wrapper = pageMount(CasesPage)
    const tabs = wrapper.findAll('.filter-tab')

    // 点击第二个标签（非 all）
    if (tabs.length > 1) {
      await tabs[1].trigger('click')
      expect((wrapper.vm as any).activeFilter).not.toBe('all')
    }
  })

  it('切换回 all 筛选应该显示全部案例', async () => {
    const wrapper = pageMount(CasesPage)
    const vm = wrapper.vm as any

    // 切换到某个筛选
    const tabs = wrapper.findAll('.filter-tab')
    if (tabs.length > 1) {
      await tabs[1].trigger('click')
      await wrapper.vm.$nextTick()
    }

    // 切换回 all
    await tabs[0].trigger('click')
    await wrapper.vm.$nextTick()
    expect(vm.activeFilter).toBe('all')
  })

  it('filteredCases 在 all 模式下返回所有案例', () => {
    const wrapper = pageMount(CasesPage)
    const vm = wrapper.vm as any
    const result = vm.filteredCases()
    expect(result.length).toBeGreaterThan(0)
  })

  it('filteredCases 在特定筛选下返回过滤后的案例', () => {
    const wrapper = pageMount(CasesPage)
    const vm = wrapper.vm as any
    const allResult = vm.filteredCases()

    // 模拟特定筛选
    if (allResult.length > 0) {
      const firstKey = allResult[0].industryKey
      vm.activeFilter = firstKey
      const filtered = vm.filteredCases()
      expect(filtered.length).toBeGreaterThan(0)
      filtered.forEach((c: any) => {
        expect(c.industryKey).toBe(firstKey)
      })
    }
  })

  it('筛选切换后应该触发 watch 重新绑定动画类', async () => {
    const wrapper = pageMount(CasesPage)
    const vm = wrapper.vm as any
    const tabs = wrapper.findAll('.filter-tab')

    if (tabs.length > 1) {
      await tabs[1].trigger('click')
      await wrapper.vm.$nextTick()
      // watch 内会操作 DOM 元素的 class
      const cards = document.querySelectorAll('.case-detail-card')
      expect(cards.length).toBeGreaterThan(0)
    }
  })

  it('onMounted 应该为卡片添加 reveal 动画类', () => {
    const wrapper = pageMount(CasesPage)
    const cards = wrapper.findAll('.case-detail-card')
    cards.forEach(card => {
      // onMounted 添加 reveal-wave-l 或 reveal-wave-r
      const classes = card.classes()
      expect(classes.some(c => c.startsWith('reveal-wave'))).toBe(true)
    })
  })
})

describe('AboutPage 页面', () => {
  it('根元素应该是 main 标签且含有 about-page 类', () => {
    const wrapper = pageMount(AboutPage)
    expect(wrapper.element.tagName).toBe('MAIN')
    expect(wrapper.classes()).toContain('about-page')
  })

  it('应该包含 page-header 及标题', () => {
    const wrapper = pageMount(AboutPage)
    const header = wrapper.find('.page-header')
    expect(header.find('h1.page-title').text()).toBe(zh.about.title)
  })

  it('应该包含 about-intro 介绍段落', () => {
    const wrapper = pageMount(AboutPage)
    const intro = wrapper.find('.about-intro')
    expect(intro.exists()).toBe(true)
    expect(intro.findAll('.intro-text').length).toBe(3)
  })

  it('应该渲染 value-card 价值观卡片', () => {
    const wrapper = pageMount(AboutPage)
    const values = wrapper.findAll('.value-card')
    expect(values.length).toBe(zh.about.values.length)
  })

  it('应该渲染 timeline-item 时间线条目', () => {
    const wrapper = pageMount(AboutPage)
    const items = wrapper.findAll('.timeline-item')
    expect(items.length).toBe(zh.about.timeline.length)
  })
})

describe('ContactPage 页面', () => {
  it('根元素应该是 main 标签且含有 contact-page 类', () => {
    const wrapper = pageMount(ContactPage)
    expect(wrapper.element.tagName).toBe('MAIN')
    expect(wrapper.classes()).toContain('contact-page')
  })

  it('应该包含 page-header 及标题副标题', () => {
    const wrapper = pageMount(ContactPage)
    const header = wrapper.find('.page-header')
    expect(header.find('h1.page-title').text()).toBe(zh.contact.title)
    expect(header.find('p.page-subtitle').text()).toBe(zh.contact.subtitle)
  })

  it('应该包含 contact-info-panel 和 contact-form-panel', () => {
    const wrapper = pageMount(ContactPage)
    expect(wrapper.find('.contact-info-panel').exists()).toBe(true)
    expect(wrapper.find('.contact-form-panel').exists()).toBe(true)
  })

  it('表单应该包含 5 个字段 (name, company, phone, email, message)', () => {
    const wrapper = pageMount(ContactPage)
    const inputs = wrapper.findAll('.contact-form-panel input, .contact-form-panel textarea')
    expect(inputs.length).toBe(5)
  })

  it('应该有提交按钮', () => {
    const wrapper = pageMount(ContactPage)
    expect(wrapper.find('.contact-form-panel .btn-submit').exists()).toBe(true)
  })

  it('form 初始数据应该全部为空字符串', () => {
    const wrapper = pageMount(ContactPage)
    const f = (wrapper.vm as any).form
    expect(f.name).toBe('')
    expect(f.company).toBe('')
    expect(f.phone).toBe('')
    expect(f.email).toBe('')
    expect(f.message).toBe('')
  })

  it('应该渲染 faq 列表', () => {
    const wrapper = pageMount(ContactPage)
    const faqs = wrapper.findAll('.faq-item')
    expect(faqs.length).toBe(zh.contact.faqs.length)
  })

  it('activeFaq 初始应该为 null', () => {
    const wrapper = pageMount(ContactPage)
    expect((wrapper.vm as any).activeFaq).toBeNull()
  })

  it('toggleFaq 应该在 null 和 index 之间切换', () => {
    const wrapper = pageMount(ContactPage)
    const vm = wrapper.vm as any

    vm.toggleFaq(0)
    expect(vm.activeFaq).toBe(0)

    vm.toggleFaq(0)
    expect(vm.activeFaq).toBeNull()

    vm.toggleFaq(1)
    expect(vm.activeFaq).toBe(1)
  })

  it('点击 FAQ 问题按钮应该切换 activeFaq', async () => {
    const wrapper = pageMount(ContactPage)
    const questions = wrapper.findAll('.faq-question')

    expect(questions.length).toBeGreaterThan(0)

    await questions[0].trigger('click')
    expect((wrapper.vm as any).activeFaq).toBe(0)

    // 答案应该显示
    expect(wrapper.findAll('.faq-answer').length).toBeGreaterThan(0)

    await questions[0].trigger('click')
    expect((wrapper.vm as any).activeFaq).toBeNull()
  })

  it('提交表单后 submitted 应该变为 true', async () => {
    const wrapper = pageMount(ContactPage)
    const form = wrapper.find('form.contact-form')
    await form.trigger('submit.prevent')
    expect((wrapper.vm as any).submitted).toBe(true)
  })

  it('提交表单后应该显示成功消息', async () => {
    const wrapper = pageMount(ContactPage)
    const form = wrapper.find('form.contact-form')
    await form.trigger('submit.prevent')
    expect(wrapper.find('.form-success').exists()).toBe(true)
  })

  it('onMounted 应该为 info-panel 和 form-panel 添加 reveal-draw 类', () => {
    const wrapper = pageMount(ContactPage)
    const infoPanel = wrapper.find('.contact-info-panel')
    const formPanel = wrapper.find('.contact-form-panel')

    expect(infoPanel.classes()).toContain('reveal-draw')
    expect(formPanel.classes()).toContain('reveal-draw')
  })

  it('onMounted 应该为 info-item 和 form-group 添加 reveal-seq 类', () => {
    const wrapper = pageMount(ContactPage)
    const infoItems = wrapper.findAll('.info-item')
    const formGroups = wrapper.findAll('.form-group')

    infoItems.forEach(item => {
      expect(item.classes()).toContain('reveal-seq')
    })
    formGroups.forEach(group => {
      expect(group.classes()).toContain('reveal-seq')
    })
  })

  it('onMounted 应该为 faq-item 添加 reveal-seq 类', () => {
    const wrapper = pageMount(ContactPage)
    const faqItems = wrapper.findAll('.faq-item')
    faqItems.forEach(item => {
      expect(item.classes()).toContain('reveal-seq')
    })
  })

  it('v-model 应该正确绑定表单输入', async () => {
    const wrapper = pageMount(ContactPage)
    const inputs = wrapper.findAll('.contact-form-panel input')
    const textarea = wrapper.find('.contact-form-panel textarea')

    if (inputs.length > 0) {
      await inputs[0].setValue('张三')
      expect((wrapper.vm as any).form.name).toBe('张三')
    }
    if (textarea.exists()) {
      await textarea.setValue('测试消息内容')
      expect((wrapper.vm as any).form.message).toBe('测试消息内容')
    }
  })
})
