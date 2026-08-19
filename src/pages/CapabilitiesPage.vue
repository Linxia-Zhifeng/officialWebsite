<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { observeReveal } from '../composables/useScrollAnimation'

const { t, tm } = useI18n()

const capabilities = computed(() => tm('capabilities.items') as any[])

onMounted(() => {
  const cards = document.querySelectorAll('.cap-card')
  cards.forEach((el, i) => {
    // 按行列从不同对角线方向切入
    const cls = (i % 2 === 0) ? 'reveal-diag-tl' : 'reveal-diag-br';
    el.classList.add(cls);
    (el as HTMLElement).style.transitionDelay = `${(i % 3) * 0.12 + Math.floor(i / 3) * 0.08}s`
  })
  observeReveal(cards)
})
</script>

<template>
  <main class="capabilities-page">
    <section class="page-header">
      <div class="container">
        <h1 class="page-title">{{ t('capabilities.title') }}</h1>
        <p class="page-subtitle">{{ t('capabilities.subtitle') }}</p>
      </div>
    </section>

    <section class="capabilities-grid section">
      <div class="container">
        <div
          v-for="(cap, index) in capabilities"
          :key="index"
          class="cap-card"
        >
          <div class="cap-number">{{ String(index + 1).padStart(2, '0') }}</div>
          <h3 class="cap-title">{{ cap.title }}</h3>
          <p class="cap-desc">{{ cap.desc }}</p>
          <ul class="cap-items">
            <li v-for="(item, i) in cap.items" :key="i">{{ item }}</li>
          </ul>
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

.capabilities-grid {
  padding-top: var(--spacing-3xl);
}

.capabilities-grid .container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-xl);
}

.cap-card {
  background-color: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  border: 1px solid var(--color-border-light);
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.cap-card:hover {
  border-color: var(--color-primary);
  box-shadow: 0 14px 40px var(--color-shadow-hover);
}

.cap-number {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  opacity: 0.3;
  margin-bottom: var(--spacing-md);
}

.cap-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-heading);
  margin-bottom: var(--spacing-md);
}

.cap-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-lg);
}

.cap-items {
  list-style: none;
  padding: 0;
}

.cap-items li {
  position: relative;
  padding-left: var(--spacing-lg);
  font-size: var(--font-size-sm);
  color: var(--color-text);
  padding-bottom: var(--spacing-sm);
}

.cap-items li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 8px;
  height: 8px;
  background-color: var(--color-secondary);
  border-radius: 50%;
}

@media (max-width: 1024px) {
  .capabilities-grid .container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .capabilities-grid .container {
    grid-template-columns: 1fr;
  }

  .page-title {
    font-size: var(--font-size-2xl);
  }
}
</style>
