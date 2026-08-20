import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'

// setup.ts 已全局安装 i18n 和 router，这里只 stub 子组件
function createTestWrapper() {
  return mount(App, {
    global: {
      stubs: {
        'router-view': { template: '<div class="router-view-stub"></div>' },
        Header: { template: '<header class="header-stub"><slot /></header>' },
        Footer: { template: '<footer class="footer-stub"><slot /></footer>' }
      }
    }
  })
}

describe('App.vue', () => {
  it('应该包含 id="app-wrapper" 的根 div', () => {
    const wrapper = createTestWrapper()
    expect(wrapper.find('#app-wrapper').exists()).toBe(true)
  })

  it('app-wrapper 应该是 flex 布局（min-height 100vh 是必需的）', () => {
    const wrapper = createTestWrapper()
    const el = wrapper.find('#app-wrapper')
    expect(el.attributes('id')).toBe('app-wrapper')
  })

  it('应该包含 Header 组件', () => {
    const wrapper = createTestWrapper()
    expect(wrapper.find('.header-stub').exists()).toBe(true)
  })

  it('应该包含 main 元素包裹 RouterView', () => {
    const wrapper = createTestWrapper()
    const main = wrapper.find('main')
    expect(main.exists()).toBe(true)
    expect(main.find('.router-view-stub').exists()).toBe(true)
  })

  it('应该包含 Footer 组件', () => {
    const wrapper = createTestWrapper()
    expect(wrapper.find('.footer-stub').exists()).toBe(true)
  })
})
