import { ref } from 'vue'

export type Theme = 'light' | 'dark'

const savedTheme = (localStorage.getItem('theme') as Theme) || 'light'
const currentTheme = ref<Theme>(savedTheme)

// 启动时一次性应用主题（项目当前无主题切换 UI，无需 watch）
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-theme', currentTheme.value)
}

export function useTheme() {
  function toggleTheme() {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', currentTheme.value)
    document.documentElement.setAttribute('data-theme', currentTheme.value)
  }

  function setTheme(theme: Theme) {
    currentTheme.value = theme
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }

  return {
    theme: currentTheme,
    toggleTheme,
    setTheme
  }
}
