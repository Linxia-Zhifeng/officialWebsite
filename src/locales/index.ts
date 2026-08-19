import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

const savedLocale = localStorage.getItem('locale') || 'zh'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: {
    zh,
    en
  }
})

export default i18n

export function setLocale(locale: string) {
  i18n.global.locale.value = locale as 'zh' | 'en'
  localStorage.setItem('locale', locale)
  document.documentElement.lang = locale
}
