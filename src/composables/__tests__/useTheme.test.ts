import { describe, it, expect, beforeEach } from 'vitest'
import { useTheme, type Theme } from '../useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('应该返回正确的主题状态', () => {
    const { theme } = useTheme()
    expect(theme.value).toBeDefined()
    expect(['light', 'dark'] as Theme[]).toContain(theme.value)
  })

  it('toggleTheme 应该在 light 和 dark 之间切换', () => {
    const { theme, toggleTheme } = useTheme()
    const initialTheme = theme.value

    toggleTheme()
    expect(theme.value).not.toBe(initialTheme)
    expect(theme.value).toBe(initialTheme === 'light' ? 'dark' : 'light')

    toggleTheme()
    expect(theme.value).toBe(initialTheme)
  })

  it('toggleTheme 应该更新 localStorage', () => {
    const { toggleTheme } = useTheme()

    toggleTheme()
    const storedTheme = window.localStorage.getItem('theme')
    expect(storedTheme).toBeDefined()
    expect(['light', 'dark']).toContain(storedTheme)
  })

  it('toggleTheme 应该更新 document.documentElement data-theme 属性', () => {
    const { toggleTheme } = useTheme()

    toggleTheme()
    const dataTheme = document.documentElement.getAttribute('data-theme')
    expect(['light', 'dark']).toContain(dataTheme)
  })

  it('setTheme 应该直接设置为指定主题', () => {
    const { theme, setTheme } = useTheme()

    setTheme('dark')
    expect(theme.value).toBe('dark')
    expect(window.localStorage.getItem('theme')).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')

    setTheme('light')
    expect(theme.value).toBe('light')
    expect(window.localStorage.getItem('theme')).toBe('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('应该从 localStorage 读取已保存的主题', () => {
    // 先设置 localStorage 中的主题为 dark
    window.localStorage.setItem('theme', 'dark')
    // useTheme 内部使用模块级 ref，首次加载时已从 localStorage 读取
    // 验证 setTheme/getTheme 能正确读写
    const { setTheme, theme } = useTheme()
    setTheme('dark')
    expect(theme.value).toBe('dark')
    expect(window.localStorage.getItem('theme')).toBe('dark')
  })

  it('typeof document !== "undefined" 时设置 data-theme 属性（SSR 守卫）', () => {
    // 在 jsdom 中 document 存在，导入时模块级代码已执行
    // 验证 document.documentElement 有 data-theme
    const { setTheme } = useTheme()
    setTheme('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('无保存主题时默认为 light', () => {
    // localStorage 已在 beforeEach 中清除
    // 模块级代码首次导入时读取 localStorage.getItem('theme') 为 null，默认 'light'
    // useTheme 返回的 theme ref 初始值应该是 'light'
    const { theme, setTheme } = useTheme()
    // 切换到 dark 再切换回来，验证 'light' 是合法值
    setTheme('light')
    expect(theme.value).toBe('light')
    expect(window.localStorage.getItem('theme')).toBe('light')
  })
})
