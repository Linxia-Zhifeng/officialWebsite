import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import ContactSection from '../ContactSection.vue'
import zh from '../../locales/zh'
import en from '../../locales/en'

function createTestWrapper() {
  const i18n = createI18n({
    legacy: false,
    locale: 'zh',
    fallbackLocale: 'en',
    messages: { zh, en }
  })

  return mount(ContactSection, {
    global: { plugins: [i18n] },
    attachTo: document.body
  })
}

describe('ContactSection 组件', () => {
  it('应该是一个 section 元素且包含 contact 和 section 类', () => {
    const wrapper = createTestWrapper()
    expect(wrapper.element.tagName).toBe('SECTION')
    expect(wrapper.classes()).toContain('contact')
    expect(wrapper.classes()).toContain('section')
  })

  it('应该包含 contact-content 双栏布局', () => {
    const wrapper = createTestWrapper()
    expect(wrapper.find('.contact-content').exists()).toBe(true)
  })

  it('应该包含 contact-info 联系信息区域', () => {
    const wrapper = createTestWrapper()
    const info = wrapper.find('.contact-info')
    expect(info.exists()).toBe(true)
  })

  it('contact-info 应该有 title 和 subtitle', () => {
    const wrapper = createTestWrapper()
    const info = wrapper.find('.contact-info')
    expect(info.find('h2.contact-title').text()).toBe(zh.contact.title)
    expect(info.find('p.contact-subtitle').text()).toBe(zh.contact.subtitle)
  })

  it('应该有 3 个 info-item (地址、邮箱、电话)', () => {
    const wrapper = createTestWrapper()
    const items = wrapper.findAll('.info-item')
    expect(items.length).toBe(3)
  })

  it('每个 info-item 应该包含 SVG 图标、label 和 value', () => {
    const wrapper = createTestWrapper()
    const items = wrapper.findAll('.info-item')

    items.forEach(item => {
      expect(item.find('svg').exists()).toBe(true)
      expect(item.find('.info-label').exists()).toBe(true)
      expect(item.find('.info-value').exists()).toBe(true)
    })
  })

  it('地址项 label/value 应该对应翻译', () => {
    const wrapper = createTestWrapper()
    const items = wrapper.findAll('.info-item')
    expect(items[0].find('.info-label').text()).toBe(zh.contact.address)
    expect(items[0].find('.info-value').text()).toBe(zh.contact.addressValue)
  })

  it('邮箱项 label/value 应该对应翻译', () => {
    const wrapper = createTestWrapper()
    const items = wrapper.findAll('.info-item')
    expect(items[1].find('.info-label').text()).toBe(zh.contact.email)
    // zh.ts 中 emailValue 用 {'@'} 转义，渲染后变为 @
    const expectedEmail = zh.contact.emailValue.replace("{'@'}", '@')
    expect(items[1].find('.info-value').text()).toBe(expectedEmail)
  })

  it('电话项 label/value 应该对应翻译', () => {
    const wrapper = createTestWrapper()
    const items = wrapper.findAll('.info-item')
    expect(items[2].find('.info-label').text()).toBe(zh.contact.tel)
    expect(items[2].find('.info-value').text()).toBe(zh.contact.telValue)
  })

  it('应该包含 contact-form 表单区域和 form 元素', () => {
    const wrapper = createTestWrapper()
    const formArea = wrapper.find('.contact-form')
    expect(formArea.exists()).toBe(true)
    expect(formArea.find('form.form').exists()).toBe(true)
  })

  it('表单应该包含 4 个 form-group (name, company, phone, message)', () => {
    const wrapper = createTestWrapper()
    const groups = wrapper.findAll('.form-group')
    expect(groups.length).toBe(4)
  })

  it('表单应该有 4 个 input/textarea 对应字段', () => {
    const wrapper = createTestWrapper()
    const inputs = wrapper.findAll('input, textarea')
    expect(inputs.length).toBe(4)
  })

  it('应该有一个提交按钮 btn-submit', () => {
    const wrapper = createTestWrapper()
    const btn = wrapper.find('.btn-submit')
    expect(btn.exists()).toBe(true)
    expect(btn.element.tagName).toBe('BUTTON')
  })

  it('表单初始 submitted 状态应该为 false', () => {
    const wrapper = createTestWrapper()
    expect((wrapper.vm as any).submitted).toBe(false)
  })

  it('提交表单后 submitted 应该变为 true', async () => {
    const wrapper = createTestWrapper()
    const form = wrapper.find('form.form')
    await form.trigger('submit.prevent')
    expect((wrapper.vm as any).submitted).toBe(true)
  })

  it('form 初始数据应该为空字符串', () => {
    const wrapper = createTestWrapper()
    const formData = (wrapper.vm as any).form
    expect(formData.name).toBe('')
    expect(formData.company).toBe('')
    expect(formData.phone).toBe('')
    expect(formData.message).toBe('')
  })

  it('提交表单后应该显示成功消息', async () => {
    const wrapper = createTestWrapper()
    const form = wrapper.find('form.form')
    await form.trigger('submit.prevent')
    expect(wrapper.find('.form-success').exists()).toBe(true)
  })

  it('v-model 应该正确绑定表单输入', async () => {
    const wrapper = createTestWrapper()
    const inputs = wrapper.findAll('input.form-input')
    const textarea = wrapper.find('textarea.form-input')

    if (inputs.length > 0) {
      await inputs[0].setValue('张三')
      expect((wrapper.vm as any).form.name).toBe('张三')
    }
    if (textarea.exists()) {
      await textarea.setValue('测试消息内容')
      expect((wrapper.vm as any).form.message).toBe('测试消息内容')
    }
  })

  it('onMounted 应该为 contact-info 和 form 添加 reveal-draw 类', () => {
    const wrapper = createTestWrapper()
    const info = wrapper.find('.contact-info')
    const form = wrapper.find('.form')
    expect(info.classes()).toContain('reveal-draw')
    expect(form.classes()).toContain('reveal-draw')
  })

  it('onMounted 应该为 info-item 添加 reveal-seq 类', () => {
    const wrapper = createTestWrapper()
    const items = wrapper.findAll('.info-item')
    items.forEach(item => {
      expect(item.classes()).toContain('reveal-seq')
    })
  })

  it('onMounted 应该为 form-group 添加 reveal-seq 类', () => {
    const wrapper = createTestWrapper()
    const groups = wrapper.findAll('.form-group')
    groups.forEach(group => {
      expect(group.classes()).toContain('reveal-seq')
    })
  })
})
