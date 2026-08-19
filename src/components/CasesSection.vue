<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { observeReveal } from '../composables/useScrollAnimation'

const { t, tm } = useI18n()
const router = useRouter()

const cases = computed(() => tm('cases.items') as any[])

const goCases = () => router.push('/cases')

onMounted(() => {
  const cards = document.querySelectorAll('.case-card')
  cards.forEach((el, i) => {
    const cls = (i === 0 || i === 3) ? 'reveal-diag-tl' : 'reveal-diag-br';
    el.classList.add(cls);
    (el as HTMLElement).style.transitionDelay = `${i * 0.12}s`
  })
  observeReveal(cards)

  const more = document.querySelector('.cases-more')
  if (more) {
    more.classList.add('reveal-scale')
    observeReveal(more)
  }
})
</script>

<template>
  <section class="cases section">
    <div class="container">
      <div class="section-title">
        <h2>{{ t('cases.title') }}</h2>
        <p>{{ t('cases.subtitle') }}</p>
      </div>

      <div class="cases-grid">
        <div
          v-for="(item, index) in cases"
          :key="index"
          class="case-card"
        >
          <div class="case-cover">
            <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="240" fill="var(--color-primary)" opacity="0.06"/>
              <g opacity="0.25">
                <rect x="40" y="60" width="320" height="8" rx="4" fill="var(--color-primary)"/>
                <rect x="40" y="80" width="240" height="8" rx="4" fill="var(--color-primary)" opacity="0.6"/>
                <rect x="40" y="100" width="280" height="8" rx="4" fill="var(--color-primary)" opacity="0.4"/>
                <rect x="40" y="140" width="120" height="80" rx="8" fill="var(--color-primary)" opacity="0.2"/>
                <rect x="180" y="140" width="120" height="80" rx="8" fill="var(--color-secondary)" opacity="0.15"/>
              </g>
            </svg>
          </div>
          <div class="case-content">
            <span class="case-tag">{{ item.industry }}</span>
            <h3 class="case-title">{{ item.title }}</h3>
            <p class="case-result">{{ item.result }}</p>
          </div>
        </div>
      </div>

      <div class="cases-more">
        <button class="btn btn-secondary" @click="goCases">
          {{ t('cases.more') }}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cases-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-xl);
  margin-top: var(--spacing-2xl);
}

.case-card {
  background-color: var(--color-bg-card);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-normal);
  border: 1px solid var(--color-border-light);
}

.case-card:hover {
  transform: rotate(0.5deg);
  border-color: var(--color-primary);
  box-shadow: 0 16px 48px var(--color-shadow-hover);
}

.case-cover svg {
  width: 100%;
  height: auto;
  display: block;
}

.case-content {
  padding: var(--spacing-lg);
}

.case-tag {
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: var(--color-bg-secondary);
  color: var(--color-primary);
  font-size: var(--font-size-xs);
  border-radius: var(--radius-sm);
  margin-bottom: var(--spacing-sm);
}

.case-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-heading);
  margin-bottom: var(--spacing-sm);
}

.case-result {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

.cases-more {
  text-align: center;
  margin-top: var(--spacing-2xl);
}

.cases-more .btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
}

@media (max-width: 768px) {
  .cases-grid {
    grid-template-columns: 1fr;
  }
}
</style>
