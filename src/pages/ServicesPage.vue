<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { observeReveal } from '../composables/useScrollAnimation'

const { t, tm } = useI18n()

const services = computed(() => tm('servicesDetail.items') as any[])

onMounted(() => {
  const blocks = document.querySelectorAll('.service-block')
  blocks.forEach((el, i) => {
    const cls = i % 2 === 0 ? 'reveal-flip' : 'reveal-ripple'
    el.classList.add(cls);
    (el as HTMLElement).style.transitionDelay = `${i * 0.15}s`
  })
  observeReveal(blocks)
})
</script>

<template>
  <main class="services-page">
    <section class="page-header">
      <div class="container">
        <h1 class="page-title">{{ t('services.title') }}</h1>
        <p class="page-subtitle">{{ t('services.subtitle') }}</p>
      </div>
    </section>

    <section class="services-detail section">
      <div class="container">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="service-block"
          :class="{ reverse: index % 2 === 1 }"
        >
          <div class="service-image">
            <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="300" fill="var(--color-primary)" opacity="0.05"/>
              <g style="color: var(--color-primary)">
                <rect x="60" y="50" width="280" height="40" rx="8" fill="currentColor" opacity="0.12"/>
                <rect x="60" y="110" width="200" height="24" rx="4" fill="currentColor" opacity="0.08"/>
                <rect x="60" y="150" width="240" height="24" rx="4" fill="currentColor" opacity="0.06"/>
                <rect x="60" y="190" width="160" height="80" rx="8" fill="currentColor" opacity="0.1"/>
                <rect x="240" y="190" width="100" height="80" rx="8" fill="currentColor" opacity="0.08"/>
              </g>
            </svg>
          </div>
          <div class="service-info">
            <div class="service-icon-lg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path :d="service.icon"/>
              </svg>
            </div>
            <h2 class="service-title-h2">{{ service.title }}</h2>
            <p class="service-desc">{{ service.desc }}</p>
            <div class="service-features">
              <span v-for="(feature, fi) in service.features" :key="fi" class="feature-tag">
                {{ feature }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.page-header {
  padding: calc(var(--header-height) + var(--spacing-4xl)) 0 var(--spacing-2xl);
  background-color: var(--color-bg-secondary);
}

.page-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-heading);
  margin-bottom: var(--spacing-md);
}

.page-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  max-width: 600px;
}

.service-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-3xl);
  align-items: center;
  margin-bottom: var(--spacing-4xl);
}

.service-block.reverse {
  direction: rtl;
}

.service-block.reverse > * {
  direction: ltr;
}

.service-image svg {
  width: 100%;
  height: auto;
  border-radius: var(--radius-lg);
}

.service-icon-lg {
  width: 56px;
  height: 56px;
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  margin-bottom: var(--spacing-lg);
}

.service-icon-lg svg {
  width: 28px;
  height: 28px;
}

.service-title-h2 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-heading);
  margin-bottom: var(--spacing-md);
}

.service-desc {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-lg);
}

.service-features {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.feature-tag {
  padding: var(--spacing-xs) var(--spacing-md);
  background-color: var(--color-bg-secondary);
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  border-radius: var(--radius-sm);
}

@media (max-width: 768px) {
  .service-block,
  .service-block.reverse {
    grid-template-columns: 1fr;
    direction: ltr;
  }

  .page-title {
    font-size: var(--font-size-2xl);
  }
}
</style>
