<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { observeReveal } from '../composables/useScrollAnimation'

const { t, tm } = useI18n()

const activeFilter = ref('all')

const filters = computed(() => tm('cases.filters') as any[])
const allCases = computed(() => tm('cases.detailItems') as any[])

const filteredCases = () => {
  if (activeFilter.value === 'all') return allCases.value
  return allCases.value.filter((c: any) => c.industryKey === activeFilter.value)
}

// 筛选切换后重新为列表项绑定入场动画
watch(activeFilter, async () => {
  await nextTick()
  const cards = document.querySelectorAll('.case-detail-card')
  cards.forEach((el, i) => {
    el.classList.remove('visible')
    el.classList.remove('reveal-wave-l', 'reveal-wave-r')
    el.removeAttribute('data-reveal-observed')
    const cls = i % 2 === 0 ? 'reveal-wave-l' : 'reveal-wave-r';
    el.classList.add(cls);
    (el as HTMLElement).style.transitionDelay = `${i * 0.15}s`
  })
  observeReveal(cards)
})

onMounted(() => {
  const cards = document.querySelectorAll('.case-detail-card')
  cards.forEach((el, i) => {
    const cls = i % 2 === 0 ? 'reveal-wave-l' : 'reveal-wave-r';
    el.classList.add(cls);
    (el as HTMLElement).style.transitionDelay = `${i * 0.15}s`
  })
  observeReveal(cards)
})
</script>

<template>
  <main class="cases-page">
    <section class="page-header">
      <div class="container">
        <h1 class="page-title">{{ t('cases.title') }}</h1>
        <p class="page-subtitle">{{ t('cases.subtitle') }}</p>
      </div>
    </section>

    <section class="cases-filter section">
      <div class="container">
        <div class="filter-tabs">
          <button
            v-for="filter in filters"
            :key="filter.key"
            class="filter-tab"
            :class="{ active: activeFilter === filter.key }"
            @click="activeFilter = filter.key"
          >
            {{ filter.label }}
          </button>
        </div>

        <div class="cases-list">
          <article
            v-for="caseItem in filteredCases()"
            :key="caseItem.id"
            class="case-detail-card"
          >
            <div class="case-visual">
              <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="200" fill="var(--color-primary)" opacity="0.05"/>
                <g opacity="0.3" style="color: var(--color-primary)">
                  <rect x="40" y="40" width="100" height="120" rx="8" fill="currentColor"/>
                  <rect x="160" y="40" width="100" height="120" rx="8" fill="currentColor" opacity="0.7"/>
                  <rect x="280" y="40" width="80" height="120" rx="8" fill="currentColor" opacity="0.4"/>
                </g>
              </svg>
            </div>
            <div class="case-body">
              <span class="case-industry">{{ caseItem.industry }}</span>
              <h2 class="case-heading">{{ caseItem.title }}</h2>
              <p class="case-description">{{ caseItem.desc }}</p>
              <div class="case-tags">
                <span v-for="tag in caseItem.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
              <div class="case-result-bar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                  <polyline points="17 6 23 6 23 12"/>
                </svg>
                <span>{{ caseItem.result }}</span>
              </div>
            </div>
          </article>
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
}

.filter-tabs {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-2xl);
  flex-wrap: wrap;
}

.filter-tab {
  padding: var(--spacing-sm) var(--spacing-lg);
  background-color: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.filter-tab:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.filter-tab.active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}

.cases-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-xl);
}

.case-detail-card {
  background-color: var(--color-bg-card);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-border-light);
  transition: all var(--transition-normal);
}

.case-detail-card:hover {
  box-shadow: 0 8px 24px var(--color-shadow);
}

.case-visual svg {
  width: 100%;
  height: auto;
  display: block;
}

.case-body {
  padding: var(--spacing-lg);
}

.case-industry {
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: var(--color-bg-secondary);
  color: var(--color-primary);
  font-size: var(--font-size-xs);
  border-radius: var(--radius-sm);
  margin-bottom: var(--spacing-sm);
}

.case-heading {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-heading);
  margin-bottom: var(--spacing-sm);
}

.case-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-md);
}

.case-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
}

.tag {
  padding: 2px var(--spacing-sm);
  background-color: var(--color-bg-secondary);
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  border-radius: var(--radius-sm);
}

.case-result-bar {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-border-light);
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

@media (max-width: 768px) {
  .cases-list {
    grid-template-columns: 1fr;
  }

  .page-title {
    font-size: var(--font-size-2xl);
  }
}
</style>
