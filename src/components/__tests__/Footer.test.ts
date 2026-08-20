import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Footer from '../Footer.vue'
import zh from '../../locales/zh'

function createTestWrapper() {
  return mount(Footer)
}

describe('Footer 组件', () => {
  it('应该是一个 footer HTML 元素', () => {
    const wrapper = createTestWrapper()
    expect(wrapper.element.tagName).toBe('FOOTER')
    expect(wrapper.classes()).toContain('footer')
  })

  it('应该正确渲染品牌区域 logo 和名称', () => {
    const wrapper = createTestWrapper()
    const brand = wrapper.find('.footer-brand')
    expect(brand.exists()).toBe(true)

    const logo = brand.find('.logo')
    expect(logo.exists()).toBe(true)
    expect(logo.find('.logo-icon').exists()).toBe(true)
    expect(logo.text()).toContain('林下之风')
  })

  it('应该渲染 slogan 文案', () => {
    const wrapper = createTestWrapper()
    const slogan = wrapper.find('.slogan')
    expect(slogan.exists()).toBe(true)
    expect(slogan.text().length).toBeGreaterThan(0)
  })

  it('应该渲染快捷导航区域标题', () => {
    const wrapper = createTestWrapper()
    const linksSection = wrapper.find('.footer-links')
    expect(linksSection.exists()).toBe(true)

    const h4 = linksSection.find('h4')
    expect(h4.exists()).toBe(true)
    expect(h4.text()).toBe(zh.footer.quickNav)
  })

  it('应该渲染所有 6 个快捷导航链接', () => {
    const wrapper = createTestWrapper()
    const links = wrapper.findAll('.footer-link')
    expect(links.length).toBe(6)
  })

  it('快捷导航链接应该有正确的路由路径', () => {
    const wrapper = createTestWrapper()
    const links = wrapper.findAll('.footer-link')

    const expectedPaths = ['/', '/services', '/capabilities', '/cases', '/about', '/contact']
    links.forEach((link, idx) => {
      expect(link.attributes('href')).toBe(expectedPaths[idx])
    })
  })

  it('应该渲染联系我们区域', () => {
    const wrapper = createTestWrapper()
    const contactSection = wrapper.find('.footer-contact')
    expect(contactSection.exists()).toBe(true)

    const h4 = contactSection.find('h4')
    expect(h4.exists()).toBe(true)
    expect(h4.text()).toBe(zh.footer.contactUs)
  })

  it('应该渲染三个联系信息项', () => {
    const wrapper = createTestWrapper()
    const contactItems = wrapper.findAll('.contact-item')
    expect(contactItems.length).toBe(3)
  })

  it('每个联系项应该包含 SVG 图标', () => {
    const wrapper = createTestWrapper()
    const contactItems = wrapper.findAll('.contact-item')

    contactItems.forEach(item => {
      expect(item.find('svg').exists()).toBe(true)
    })
  })

  it('应该渲染底部版权区域', () => {
    const wrapper = createTestWrapper()
    const footerBottom = wrapper.find('.footer-bottom')
    expect(footerBottom.exists()).toBe(true)

    const paragraphs = footerBottom.findAll('p')
    expect(paragraphs.length).toBe(2)
  })

  it('底部版权和 ICP 备案信息不应该为空', () => {
    const wrapper = createTestWrapper()
    const paragraphs = wrapper.find('.footer-bottom').findAll('p')

    paragraphs.forEach(p => {
      expect(p.text().length).toBeGreaterThan(0)
    })
  })

  it('footer-inner 应该有三个主要区块', () => {
    const wrapper = createTestWrapper()
    const inner = wrapper.find('.footer-inner')
    expect(inner.find('.footer-brand').exists()).toBe(true)
    expect(inner.find('.footer-links').exists()).toBe(true)
    expect(inner.find('.footer-contact').exists()).toBe(true)
  })
})
