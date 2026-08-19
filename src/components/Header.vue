<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { setLocale } from '../locales'

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()

const menuOpen = ref(false)
const langMenuOpen = ref(false)

const navItems = computed(() => [
  { path: '/', label: t('nav.home') },
  { path: '/services', label: t('nav.services') },
  { path: '/capabilities', label: t('nav.capabilities') },
  { path: '/cases', label: t('nav.cases') },
  { path: '/about', label: t('nav.about') },
  { path: '/contact', label: t('nav.contact') }
])

const isActive = (path: string) => route.path === path

const selectLocale = (lang: 'zh' | 'en') => {
  setLocale(lang)
  langMenuOpen.value = false
}

const toggleLangMenu = () => {
  langMenuOpen.value = !langMenuOpen.value
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
</script>

<template>
  <header class="header">
    <div class="container header-inner">
      <router-link to="/" class="logo">
        <svg class="logo-icon" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="24" width="6" height="20" rx="1" fill="#0B7285"/>
          <rect x="14" y="16" width="6" height="28" rx="1" fill="#1190A5"/>
          <rect x="24" y="8" width="6" height="36" rx="1" fill="#1B8AAA"/>
          <rect x="34" y="12" width="6" height="32" rx="1" fill="#2FB8A6"/>
          <rect x="44" y="20" width="6" height="24" rx="1" fill="#4FD9C4"/>
          <rect x="52" y="28" width="4" height="16" rx="1" fill="#7EE5D4"/>
        </svg>
        <span class="logo-text">林下之风</span>
      </router-link>

      <nav class="nav" :class="{ open: menuOpen }">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-link"
          :class="{ active: isActive(item.path) }"
          @click="menuOpen = false"
        >
          {{ item.label }}
        </router-link>
      </nav>

      <div class="header-actions">
        <div class="lang-select" @click.stop>
          <button class="lang-btn" @click="toggleLangMenu">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span>{{ locale === 'zh' ? '中文' : 'EN' }}</span>
            <svg class="arrow" :class="{ rotated: langMenuOpen }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          <div v-if="langMenuOpen" class="lang-dropdown">
            <button 
              class="lang-option" 
              :class="{ active: locale === 'zh' }"
              @click="selectLocale('zh')"
            >
              中文
            </button>
            <button 
              class="lang-option" 
              :class="{ active: locale === 'en' }"
              @click="selectLocale('en')"
            >
              English
            </button>
          </div>
        </div>

        <button class="menu-toggle" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  background-color: #ffffff;
  border-bottom: 1px solid var(--color-border-light);
  z-index: 1000;
  transition: all var(--transition-normal);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-lg);
}

.logo:hover {
  color: var(--color-primary);
}

.logo-icon {
  width: 36px;
  height: 36px;
}

.logo-text {
  white-space: nowrap;
}

.nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
}

.nav-link {
  color: var(--color-text);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  position: relative;
  padding: var(--spacing-sm) 0;
  transition: color var(--transition-fast);
}

.nav-link:hover,
.nav-link.active {
  color: var(--color-primary);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 2px;
  background-color: var(--color-secondary);
  border-radius: 1px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.lang-select {
  position: relative;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.lang-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.lang-btn .icon {
  width: 16px;
  height: 16px;
}

.lang-btn .arrow {
  width: 12px;
  height: 12px;
  transition: transform var(--transition-fast);
}

.lang-btn .arrow.rotated {
  transform: rotate(180deg);
}

.lang-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  background-color: #ffffff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 120px;
  overflow: hidden;
}

.lang-option {
  display: block;
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background: transparent;
  border: none;
  color: var(--color-text);
  font-size: var(--font-size-sm);
  text-align: left;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.lang-option:hover {
  background-color: var(--color-bg-secondary);
  color: var(--color-primary);
}

.lang-option.active {
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: var(--spacing-sm);
}

.menu-toggle span {
  display: block;
  width: 24px;
  height: 2px;
  background-color: var(--color-text);
  transition: all var(--transition-fast);
}

@media (max-width: 1024px) {
  .nav {
    position: fixed;
    top: var(--header-height);
    left: 0;
    right: 0;
    background-color: #ffffff;
    flex-direction: column;
    padding: var(--spacing-lg);
    gap: var(--spacing-md);
    border-bottom: 1px solid var(--color-border);
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: all var(--transition-normal);
  }

  .nav.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .nav-link {
    width: 100%;
    padding: var(--spacing-md) 0;
    border-bottom: 1px solid var(--color-border-light);
  }

  .nav-link.active::after {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }
}
</style>
