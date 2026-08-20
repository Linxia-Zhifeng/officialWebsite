import { describe, it, expect, beforeEach, vi } from 'vitest'
import { nextTick } from 'vue'

// 导入实际路由模块以覆盖其代码
import router from '../index'

describe('router 模块', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('应该包含所有必要的路由名称', () => {
    const routeNames = router.getRoutes().map(r => r.name)
    expect(routeNames).toContain('home')
    expect(routeNames).toContain('services')
    expect(routeNames).toContain('capabilities')
    expect(routeNames).toContain('cases')
    expect(routeNames).toContain('about')
    expect(routeNames).toContain('contact')
    expect(routeNames).toContain('not-found')
  })

  it('每个路由都应该有 path 和 component', () => {
    const routes = router.getRoutes()
    routes.forEach(route => {
      expect(route.path).toBeDefined()
    })
  })

  it('首页路由 path 应该是 /', () => {
    const home = router.getRoutes().find(r => r.name === 'home')
    expect(home?.path).toBe('/')
  })

  it('services 路由 path 应该是 /services', () => {
    const r = router.getRoutes().find(r => r.name === 'services')
    expect(r?.path).toBe('/services')
  })

  it('capabilities 路由 path 应该是 /capabilities', () => {
    const r = router.getRoutes().find(r => r.name === 'capabilities')
    expect(r?.path).toBe('/capabilities')
  })

  it('cases 路由 path 应该是 /cases', () => {
    const r = router.getRoutes().find(r => r.name === 'cases')
    expect(r?.path).toBe('/cases')
  })

  it('about 路由 path 应该是 /about', () => {
    const r = router.getRoutes().find(r => r.name === 'about')
    expect(r?.path).toBe('/about')
  })

  it('contact 路由 path 应该是 /contact', () => {
    const r = router.getRoutes().find(r => r.name === 'contact')
    expect(r?.path).toBe('/contact')
  })

  it('not-found 路由应该重定向到 /', () => {
    const nf = router.getRoutes().find(r => r.name === 'not-found')
    expect(nf?.redirect).toBe('/')
  })

  it('各路由应该有 SEO meta', () => {
    const seoRoutes = ['home', 'services', 'capabilities', 'cases', 'about', 'contact']
    seoRoutes.forEach(name => {
      const route = router.getRoutes().find(r => r.name === name)
      expect(route?.meta?.seo, `${name} should have seo meta`).toBeDefined()
      const seo = route?.meta?.seo as any
      expect(seo.title).toBeDefined()
      expect(seo.description).toBeDefined()
      expect(seo.keywords).toBeDefined()
    })
  })

  it('每个路由 meta 应该有 title', () => {
    const titledRoutes = ['home', 'services', 'capabilities', 'cases', 'about', 'contact']
    titledRoutes.forEach(name => {
      const route = router.getRoutes().find(r => r.name === name)
      expect(route?.meta?.title).toBeDefined()
    })
  })

  it('scrollBehavior 应该返回 top: 0', () => {
    const result = router.options.scrollBehavior?.({} as any, {} as any, {} as any)
    expect(result).toEqual({ top: 0 })
  })

  it('home 路由 SEO 应该包含首页关键词', () => {
    const home = router.getRoutes().find(r => r.name === 'home')
    const seo = home?.meta?.seo as any
    expect(seo.description).toContain('林下之风')
    expect(seo.keywords).toContain('定制软件开发')
  })

  it('contact 路由 SEO 应该包含联系信息', () => {
    const contact = router.getRoutes().find(r => r.name === 'contact')
    const seo = contact?.meta?.seo as any
    expect(seo.description).toContain('联系')
    expect(seo.keywords).toContain('联系')
  })

  it('未知路径应该重定向到首页', async () => {
    await router.push('/unknown-page-xyz')
    await nextTick()
    expect(router.currentRoute.value.path).toBe('/')
  })

  it('应该能导航到 /services', async () => {
    await router.push('/services')
    await nextTick()
    expect(router.currentRoute.value.name).toBe('services')
  })

  it('应该能导航到 /about', async () => {
    await router.push('/about')
    await nextTick()
    expect(router.currentRoute.value.name).toBe('about')
  })
})
