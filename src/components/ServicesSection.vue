<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { observeReveal } from '../composables/useScrollAnimation'

const { t, tm } = useI18n()

const serviceIcons = [
  'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
  'M18 20h3v-8h-3v8zM6 20H3v-8h3v8zM9 20h3V8H9v12zM15 20h3V4h-3v16z',
  'M21 13a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 13a2.25 2.25 0 0 0 2.25 2.25h1.5a3 3 0 1 0 5.5 0h.5a3 3 0 1 0 5.5 0h.5A2.25 2.25 0 0 0 21 13z',
  'M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8 M21 3v5h-5 M12 7v5l4 2'
]

const services = tm('services.items') as any[]

onMounted(() => {
  const cards = document.querySelectorAll('.service-card')
  cards.forEach((el, i) => {
    const cls = i % 2 === 0 ? 'reveal-wave-l' : 'reveal-wave-r';
    el.classList.add(cls);
    (el as HTMLElement).style.transitionDelay = `${i * 0.13}s`
  })
  observeReveal(cards)
})
</script>

<template>
  <section class="services section">
    <div class="container">
      <div class="section-title">
        <h2>{{ t('services.title') }}</h2>
        <p>{{ t('services.subtitle') }}</p>
      </div>

      <div class="services-grid">
        <div
          v-for="(item, index) in services"
          :key="index"
          class="service-card"
        >
          <div class="service-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path :d="serviceIcons[index]" />
            </svg>
          </div>
          <h3 class="service-title">{{ item.title }}</h3>
          <p class="service-desc">{{ item.desc }}</p>
          <div class="service-decoration"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-xl);
  margin-top: var(--spacing-2xl);
}

.service-card {
  position: relative;
  background-color: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  transition: all var(--transition-normal);
  border: 1px solid var(--color-border-light);
  overflow: hidden;
}

.service-card:hover {
  transform: skewX(-1deg);
  border-color: var(--color-primary);
  box-shadow: 0 14px 40px var(--color-shadow-hover);
}

.service-card:hover .service-decoration {
  width: 100%;
}

.service-icon {
  width: 48px;
  height: 48px;
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
  transition: all var(--transition-normal);
}

.service-card:hover .service-icon {
  background-color: var(--color-primary);
  color: #fff;
}

.service-icon svg {
  width: 24px;
  height: 24px;
}

.service-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-heading);
  margin-bottom: var(--spacing-md);
}

.service-desc {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0;
}

.service-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 0;
  background-color: var(--color-primary);
  transition: width var(--transition-slow);
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
