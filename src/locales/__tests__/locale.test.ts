import { describe, it, expect, beforeEach } from 'vitest'
import i18n, { setLocale } from '../index'
import zh from '../zh'
import en from '../en'

describe('locales i18n 配置', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.removeAttribute('lang')
  })

  it('应该支持中文和英文两种语言', () => {
    expect(i18n.global.availableLocales).toContain('zh')
    expect(i18n.global.availableLocales).toContain('en')
  })

  it('默认 fallbackLocale 应该是 en', () => {
    const fb = (i18n.global.fallbackLocale as any)
    const fbVal = typeof fb === 'string' ? fb : (fb.value || 'en')
    expect(['en', ['en']].flat()).toContain(fbVal)
    // 可以是已保存的语言，但默认为 zh
    expect(['zh', 'en'] as any).toContain(i18n.global.locale.value)
  })

  it('中文翻译应该包含导航文案', () => {
    expect(zh.nav.home).toBeDefined()
    expect(zh.nav.services).toBeDefined()
    expect(zh.nav.capabilities).toBeDefined()
    expect(zh.nav.cases).toBeDefined()
    expect(zh.nav.about).toBeDefined()
    expect(zh.nav.contact).toBeDefined()
  })

  it('英文翻译应该包含导航文案', () => {
    expect(en.nav.home).toBeDefined()
    expect(en.nav.services).toBeDefined()
    expect(en.nav.capabilities).toBeDefined()
    expect(en.nav.cases).toBeDefined()
    expect(en.nav.about).toBeDefined()
    expect(en.nav.contact).toBeDefined()
  })

  it('中文翻译应该包含 hero 区块文案', () => {
    expect(zh.hero.title).toBeDefined()
    expect(zh.hero.subtitle).toBeDefined()
  })

  it('英文翻译应该包含 hero 区块文案', () => {
    expect(en.hero.title).toBeDefined()
    expect(en.hero.subtitle).toBeDefined()
  })

  it('中文翻译应该包含 advantages 区块', () => {
    expect(zh.advantages.title).toBeDefined()
    expect(zh.advantages.items).toBeInstanceOf(Array)
    expect(zh.advantages.items.length).toBeGreaterThan(0)
  })

  it('英文翻译应该包含 advantages 区块', () => {
    expect(en.advantages.title).toBeDefined()
    expect(en.advantages.items).toBeInstanceOf(Array)
    expect(en.advantages.items.length).toBeGreaterThan(0)
  })

  it('中英文 advantages 条目数应该一致', () => {
    expect(zh.advantages.items.length).toBe(en.advantages.items.length)
  })

  it('中英文 services 条目数应该一致', () => {
    expect(zh.services.items.length).toBe(en.services.items.length)
  })

  it('setLocale 应该正确切换为中文', () => {
    setLocale('zh')
    expect(i18n.global.locale.value).toBe('zh')
    expect(window.localStorage.getItem('locale')).toBe('zh')
    expect(document.documentElement.getAttribute('lang')).toBe('zh')
  })

  it('setLocale 应该正确切换为英文', () => {
    setLocale('en')
    expect(i18n.global.locale.value).toBe('en')
    expect(window.localStorage.getItem('locale')).toBe('en')
    expect(document.documentElement.getAttribute('lang')).toBe('en')
  })

  it('i18n global t 函数在中文环境能正确返回中文文案', () => {
    setLocale('zh')
    expect(i18n.global.t('nav.home')).toBe(zh.nav.home)
    expect(i18n.global.t('nav.services')).toBe(zh.nav.services)
  })

  it('i18n global t 函数在英文环境能正确返回英文文案', () => {
    setLocale('en')
    expect(i18n.global.t('nav.home')).toBe(en.nav.home)
    expect(i18n.global.t('nav.services')).toBe(en.nav.services)
    setLocale('zh')
  })

  it('footer 区块两种语言都应有文案', () => {
    expect(zh.footer.slogan).toBeDefined()
    expect(en.footer.slogan).toBeDefined()
    expect(zh.footer.quickNav).toBeDefined()
    expect(en.footer.quickNav).toBeDefined()
    expect(zh.footer.contactUs).toBeDefined()
    expect(en.footer.contactUs).toBeDefined()
    expect(zh.footer.copyright).toBeDefined()
    expect(en.footer.copyright).toBeDefined()
  })

  it('contact 区块两种语言都应有联系信息', () => {
    expect(zh.contact.emailValue).toBeDefined()
    expect(en.contact.emailValue).toBeDefined()
    expect(zh.contact.telValue).toBeDefined()
    expect(en.contact.telValue).toBeDefined()
    expect(zh.contact.addressValue).toBeDefined()
    expect(en.contact.addressValue).toBeDefined()
  })
})
