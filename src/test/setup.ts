import { vi } from 'vitest'
import { config } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createRouter, createMemoryHistory } from 'vue-router'
import zh from '../locales/zh'
import en from '../locales/en'

// 全局 mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    }
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

// 全局 mock IntersectionObserver
class MockIntersectionObserver {
  readonly root: Element | null = null
  readonly rootMargin: string = ''
  readonly thresholds: ReadonlyArray<number> = []
  readonly scrollMargin: string = ''
  private callback: IntersectionObserverCallback

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
  }

  observe(target: Element) {
    this.callback([{
      isIntersecting: true,
      target,
      intersectionRatio: 1,
      intersectionRect: target.getBoundingClientRect(),
      boundingClientRect: target.getBoundingClientRect(),
      rootBounds: null,
      time: 0
    }], this as any)
  }

  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  value: MockIntersectionObserver,
  configurable: true,
  writable: true
})

// 全局 mock window.location
Object.defineProperty(window, 'location', {
  value: {
    pathname: '/',
    origin: 'https://www.linxiafeng.com',
    href: 'https://www.linxiafeng.com/'
  },
  writable: true
})

// 全局 mock document.documentElement
if (!document.documentElement.getAttribute('lang')) {
  document.documentElement.setAttribute('lang', 'zh')
}

// 配置 vue-i18n 用于测试
const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'en',
  messages: { zh, en }
})

// 配置 vue-router 用于测试
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', name: 'home', component: { template: '<div>Home</div>' } },
    { path: '/services', name: 'services', component: { template: '<div>Services</div>' } },
    { path: '/capabilities', name: 'capabilities', component: { template: '<div>Capabilities</div>' } },
    { path: '/cases', name: 'cases', component: { template: '<div>Cases</div>' } },
    { path: '/about', name: 'about', component: { template: '<div>About</div>' } },
    { path: '/contact', name: 'contact', component: { template: '<div>Contact</div>' } }
  ]
})

// 全局安装插件
config.global.plugins = [i18n, router]
config.global.stubs = {
  'router-link': {
    props: ['to'],
    template: '<a :href="to"><slot /></a>'
  },
  'router-view': {
    template: '<slot />'
  }
}

// 清除所有 mock 调用
beforeEach(() => {
  vi.clearAllMocks()
  window.localStorage.clear()
  // 清理 DOM body，避免 onMounted 中的 document.querySelector 找到旧元素
  document.body.innerHTML = ''
  document.documentElement.removeAttribute('data-theme')
  document.documentElement.setAttribute('lang', 'zh')
  // 清除所有 meta 和 link 标签
  const metas = document.head.querySelectorAll('meta[data-test-cleanup]')
  metas.forEach(m => m.remove())
})
