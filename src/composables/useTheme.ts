import { ref, watch } from 'vue'

export type Theme = 'light' | 'dark'

const savedTheme = localStorage.getItem('theme') as Theme || 'light'
const currentTheme = ref<Theme>(savedTheme)

export function useTheme() {
  watch(currentTheme, (newTheme) => {
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }, { immediate: true })

  function toggleTheme() {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  }

  function setTheme(theme: Theme) {
    currentTheme.value = theme
  }

  return {
    theme: currentTheme,
    toggleTheme,
    setTheme
  }
}
