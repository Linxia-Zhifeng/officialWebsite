import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setSeo, applyRouteSeo, type SeoMeta } from '../useSeo'
import i18n, { setLocale } from '../../locales'

describe('useSeo', () => {
  beforeEach(() => {
    // 清除之前添加的 meta 和 link 标签
    const metas = document.head.querySelectorAll('meta')
    metas.forEach(m => {
      if (
        m.getAttribute('name')?.includes('description') ||
        m.getAttribute('name')?.includes('keywords') ||
        m.getAttribute('name')?.includes('robots') ||
        m.getAttribute('name')?.includes('twitter') ||
        m.getAttribute('property')?.includes('og:')
      ) {
        m.remove()
      }
    })
    const links = document.head.querySelectorAll('link[rel="canonical"], link[rel="alternate"]')
    links.forEach(l => l.remove())
  })

  describe('setSeo', () => {
    it('应该更新 document.title', () => {
      const meta: SeoMeta = { title: '测试页面' }
      setSeo(meta)
      expect(document.title).toContain('测试页面')
    })

    it('应该设置默认标题（当未传入 title 时）', () => {
      setSeo({})
      expect(document.title).toBeDefined()
      expect(document.title.length).toBeGreaterThan(0)
    })

    it('应该创建/更新 description meta 标签', () => {
      const meta: SeoMeta = { description: '这是一段测试描述' }
      setSeo(meta)
      const descMeta = document.head.querySelector('meta[name="description"]')
      expect(descMeta).not.toBeNull()
      expect(descMeta?.getAttribute('content')).toBe('这是一段测试描述')
    })

    it('应该创建/更新 keywords meta 标签', () => {
      const meta: SeoMeta = { keywords: 'Vue,Vite,测试' }
      setSeo(meta)
      const kwMeta = document.head.querySelector('meta[name="keywords"]')
      expect(kwMeta).not.toBeNull()
      expect(kwMeta?.getAttribute('content')).toBe('Vue,Vite,测试')
    })

    it('应该设置 robots meta 标签', () => {
      setSeo({})
      const robotsMeta = document.head.querySelector('meta[name="robots"]')
      expect(robotsMeta).not.toBeNull()
      expect(robotsMeta?.getAttribute('content')).toBe('index, follow')
    })

    it('noindex=true 时应该设置 noindex nofollow', () => {
      setSeo({ noindex: true })
      const robotsMeta = document.head.querySelector('meta[name="robots"]')
      expect(robotsMeta?.getAttribute('content')).toBe('noindex, nofollow')
    })

    it('应该创建 canonical link 标签', () => {
      setSeo({ path: '/about' })
      const canonicalLink = document.head.querySelector('link[rel="canonical"]')
      expect(canonicalLink).not.toBeNull()
      expect(canonicalLink?.getAttribute('href')).toContain('/about')
    })

    it('应该创建 hreflang 标签（zh 和 en）', () => {
      setSeo({ path: '/services' })
      const zhLink = document.head.querySelector('link[rel="alternate"][hreflang="zh"]')
      const enLink = document.head.querySelector('link[rel="alternate"][hreflang="en"]')
      expect(zhLink).not.toBeNull()
      expect(enLink).not.toBeNull()
      expect(zhLink?.getAttribute('href')).toContain('/services')
    })

    it('应该创建 Open Graph meta 标签', () => {
      setSeo({ title: 'OG标题', description: 'OG描述', path: '/test' })
      const ogTitle = document.head.querySelector('meta[property="og:title"]')
      const ogDesc = document.head.querySelector('meta[property="og:description"]')
      const ogUrl = document.head.querySelector('meta[property="og:url"]')
      const ogType = document.head.querySelector('meta[property="og:type"]')
      const ogSiteName = document.head.querySelector('meta[property="og:site_name"]')

      expect(ogTitle).not.toBeNull()
      expect(ogTitle?.getAttribute('content')).toContain('OG标题')
      expect(ogDesc?.getAttribute('content')).toContain('OG描述')
      expect(ogUrl?.getAttribute('href') || ogUrl?.getAttribute('content')).toBeDefined()
      expect(ogType?.getAttribute('content')).toBe('website')
      expect(ogSiteName).not.toBeNull()
    })

    it('应该创建 Twitter Card meta 标签', () => {
      setSeo({ title: 'Twitter标题', description: 'Twitter描述' })
      const twCard = document.head.querySelector('meta[name="twitter:card"]')
      const twTitle = document.head.querySelector('meta[name="twitter:title"]')
      const twDesc = document.head.querySelector('meta[name="twitter:description"]')
      expect(twCard?.getAttribute('content')).toBe('summary_large_image')
      expect(twTitle?.getAttribute('content')).toContain('Twitter标题')
      expect(twDesc?.getAttribute('content')).toContain('Twitter描述')
    })

    it('应该更新 document.documentElement.lang', () => {
      setLocale('zh')
      setSeo({})
      expect(document.documentElement.getAttribute('lang')).toBe('zh')

      setLocale('en')
      setSeo({})
      expect(document.documentElement.getAttribute('lang')).toBe('en')
    })

    it('中文环境时标题拼接中文站点名', () => {
      setLocale('zh')
      setSeo({ title: '测试' })
      expect(document.title).toContain('林下之风')
    })

    it('英文环境时标题拼接英文站点名', () => {
      setLocale('en')
      setSeo({ title: 'Test' })
      expect(document.title).toContain('Linxiafeng')
      setLocale('zh')
    })

    it('当 i18n.locale.value 为空时回退到默认语言', () => {
      // 模拟 locale.value 为空字符串
      const origLocale = i18n.global.locale.value
      i18n.global.locale.value = '' as any
      setSeo({ title: 'Fallback' })
      // 应该回退到 defaultLocale='zh'，使用中文站点名
      expect(document.title).toContain('林下之风')
      i18n.global.locale.value = origLocale
    })
  })

  describe('applyRouteSeo', () => {
    it('应该从路由 meta.seo 中读取配置并应用', async () => {
      const to = {
        path: '/test-path',
        meta: {
          seo: {
            title: '路由SEO标题',
            description: '路由SEO描述',
            keywords: '路由,SEO'
          } as SeoMeta
        }
      }

      await applyRouteSeo(to as any)

      expect(document.title).toContain('路由SEO标题')
      const descMeta = document.head.querySelector('meta[name="description"]')
      expect(descMeta?.getAttribute('content')).toBe('路由SEO描述')
    })

    it('当 meta.seo 为空时应该也能正常运行', async () => {
      const to = {
        path: '/empty',
        meta: {}
      }

      expect(() => applyRouteSeo(to as any)).not.toThrow()
      await applyRouteSeo(to as any)
      expect(document.title).toBeDefined()
    })
  })
})
