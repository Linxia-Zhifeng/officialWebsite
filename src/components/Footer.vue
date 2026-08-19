<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const navLinks = [
  { path: '/', labelKey: 'nav.home' },
  { path: '/services', labelKey: 'nav.services' },
  { path: '/capabilities', labelKey: 'nav.capabilities' },
  { path: '/cases', labelKey: 'nav.cases' },
  { path: '/about', labelKey: 'nav.about' },
  { path: '/contact', labelKey: 'nav.contact' }
]
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <div class="logo">
          <svg class="logo-icon" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="24" width="6" height="20" rx="1" fill="#0B7285"/>
            <rect x="14" y="16" width="6" height="28" rx="1" fill="#1190A5"/>
            <rect x="24" y="8" width="6" height="36" rx="1" fill="#1B8AAA"/>
            <rect x="34" y="12" width="6" height="32" rx="1" fill="#2FB8A6"/>
            <rect x="44" y="20" width="6" height="24" rx="1" fill="#4FD9C4"/>
            <rect x="52" y="28" width="4" height="16" rx="1" fill="#7EE5D4"/>
          </svg>
          <span>林下之风</span>
        </div>
        <p class="slogan">{{ t('footer.slogan') }}</p>
      </div>

      <div class="footer-links">
        <h4>{{ t('footer.quickNav') }}</h4>
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="footer-link"
        >
          {{ t(link.labelKey) }}
        </router-link>
      </div>

      <div class="footer-contact">
        <h4>{{ t('footer.contactUs') }}</h4>
        <p class="contact-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" width="16" height="16">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          contact@linxiafeng.com
        </p>
        <p class="contact-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" width="16" height="16">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          400-888-8888
        </p>
        <p class="contact-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" width="16" height="16">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          北京市海淀区中关村
        </p>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container">
        <p>{{ t('footer.copyright') }}</p>
        <p>{{ t('footer.icp') }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border-light);
}

.footer-inner {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: var(--spacing-3xl);
  padding: var(--spacing-3xl) var(--spacing-lg);
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-md);
}

.logo-icon {
  width: 32px;
  height: 32px;
}

.slogan {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
}

.footer-links,
.footer-contact {
  h4 {
    color: var(--color-text-heading);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    margin-bottom: var(--spacing-md);
  }
}

.footer-link {
  display: block;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  padding: var(--spacing-xs) 0;
  transition: color var(--transition-fast);
}

.footer-link:hover {
  color: var(--color-primary);
}

.contact-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-sm);
}

.footer-bottom {
  border-top: 1px solid var(--color-border-light);
  padding: var(--spacing-lg) 0;
}

.footer-bottom .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-bottom p {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  margin: 0;
}

@media (max-width: 768px) {
  .footer-inner {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
    padding: var(--spacing-2xl) var(--spacing-md);
  }

  .footer-bottom .container {
    flex-direction: column;
    gap: var(--spacing-sm);
    text-align: center;
  }
}
</style>
