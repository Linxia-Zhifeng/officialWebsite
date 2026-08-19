import { nextTick } from 'vue'
import i18n from '../locales'

/**
 * SEO 元信息类型
 */
export interface SeoMeta {
  /** 页面标题（会自动拼接站点后缀） */
  title?: string
  /** 页面描述 */
  description?: string
  /** 关键词 */
  keywords?: string
  /** Open Graph 类型，默认 website */
  ogType?: 'website' | 'article' | 'profile'
  /** 路由路径，用于生成 canonical / og:url，留空则用当前 location */
  path?: string
  /** 是否禁止索引 */
  noindex?: boolean
}

/** 站点基础信息（与 index.html 保持一致） */
const SITE = {
  /** 站点域名（结尾不带斜杠） */
  origin: 'https://www.linxiafeng.com',
  /** 站点名称 */
  name: '林下之风科技',
  /** 站点名称（英文） */
  nameEn: 'Linxiafeng Technology',
  /** 默认分享图 */
  ogImage: '/og-image.jpg',
  /** 站点语言对应的 locale */
  defaultLocale: 'zh'
}

/** 通过选择器查找或创建 meta 标签 */
function upsertMeta(selector: string, attr: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr.split('=')[0], attr.split('=')[1].replace(/"/g, ''))
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** 更新或创建 link 标签 */
function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * 设置页面 SEO 元信息
 * 用于在路由切换时动态更新 title / description / canonical / og:* 等
 */
export function setSeo(meta: SeoMeta) {
  const currentLocale = (i18n.global.locale.value || SITE.defaultLocale) as string
  const isZh = currentLocale.startsWith('zh')

  const siteName = isZh ? SITE.name : SITE.nameEn
  const title = meta.title
    ? `${meta.title} - ${siteName}`
    : `${siteName} - 专注定制化软件开发`
  const description = meta.description || '林下之风科技，专注于企业数字化服务的软件开发公司。定制软件系统开发、Web与移动端开发、数字化转型咨询、技术运维与迭代。'
  const url = `${SITE.origin}${meta.path || window.location.pathname}`
  const ogImage = `${SITE.origin}${SITE.ogImage}`

  // 标题
  document.title = title
  document.documentElement.lang = currentLocale

  // 基础 meta
  upsertMeta('meta[name="description"]', 'name=description', description)
  upsertMeta('meta[name="keywords"]', 'name=keywords', meta.keywords || '')
  upsertMeta('meta[name="robots"]', 'name=robots', meta.noindex ? 'noindex, nofollow' : 'index, follow')

  // canonical
  upsertLink('canonical', url)

  // hreflang（中英双语）
  upsertLink('alternate', `${SITE.origin}${meta.path || '/'}`)
  const zhLink = document.head.querySelector('link[rel="alternate"][hreflang="zh"]')
  if (!zhLink) {
    const l = document.createElement('link')
    l.setAttribute('rel', 'alternate')
    l.setAttribute('hreflang', 'zh')
    l.setAttribute('href', `${SITE.origin}${meta.path || '/'}`)
    document.head.appendChild(l)
  }
  const enLink = document.head.querySelector('link[rel="alternate"][hreflang="en"]')
  if (!enLink) {
    const l = document.createElement('link')
    l.setAttribute('rel', 'alternate')
    l.setAttribute('hreflang', 'en')
    l.setAttribute('href', `${SITE.origin}${meta.path || '/'}?lang=en`)
    document.head.appendChild(l)
  }

  // Open Graph
  upsertMeta('meta[property="og:title"]', 'property=og:title', title)
  upsertMeta('meta[property="og:description"]', 'property=og:description', description)
  upsertMeta('meta[property="og:url"]', 'property=og:url', url)
  upsertMeta('meta[property="og:image"]', 'property=og:image', ogImage)
  upsertMeta('meta[property="og:type"]', 'property=og:type', meta.ogType || 'website')
  upsertMeta('meta[property="og:site_name"]', 'property=og:site_name', siteName)
  upsertMeta('meta[property="og:locale"]', 'property=og:locale', isZh ? 'zh_CN' : 'en_US')
  upsertMeta('meta[property="og:locale:alternate"]', 'property=og:locale:alternate', isZh ? 'en_US' : 'zh_CN')

  // Twitter Card
  upsertMeta('meta[name="twitter:card"]', 'name=twitter:card', 'summary_large_image')
  upsertMeta('meta[name="twitter:title"]', 'name=twitter:title', title)
  upsertMeta('meta[name="twitter:description"]', 'name=twitter:description', description)
  upsertMeta('meta[name="twitter:image"]', 'name=twitter:image', ogImage)
}

/**
 * 在路由守卫中使用：根据 to.meta.seo 设置 SEO
 */
export async function applyRouteSeo(to: { path: string; meta?: Record<string, unknown> }) {
  await nextTick()
  const seo = (to.meta?.seo as SeoMeta) || {}
  setSeo({ ...seo, path: to.path })
}
