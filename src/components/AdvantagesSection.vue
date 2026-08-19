<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const iconPaths: Record<string, string> = {
  stability: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  efficiency: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  custom: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z',
  companion: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75'
}

const advantages = tm('advantages.items') as any[]

const getIconPath = (icon: string) => iconPaths[icon] || iconPaths.stability

const observer = ref<IntersectionObserver | null>(null)

onMounted(() => {
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.1 }
  )
  
  document.querySelectorAll('.advantage-card').forEach((el, i) => {
    el.classList.add('reveal');
    ;(el as HTMLElement).style.transitionDelay = `${i * 0.1}s`
    observer.value?.observe(el)
  })

  const title = document.querySelector('.advantages .section-title')
  if (title) {
    title.classList.add('reveal')
    observer.value.observe(title)
  }
})

onUnmounted(() => {
  observer.value?.disconnect()
})
</script>

<template>
  <section class="advantages section">
    <div class="container">
      <div class="section-title">
        <h2>{{ t('advantages.title') }}</h2>
        <p>{{ t('advantages.subtitle') }}</p>
      </div>

      <div class="advantages-grid">
        <div
          v-for="(item, index) in advantages"
          :key="index"
          class="advantage-card"
        >
          <div class="advantage-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path :d="getIconPath(item.icon)" />
            </svg>
          </div>
          <h3 class="advantage-title">{{ item.title }}</h3>
          <p class="advantage-desc">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.advantages {
  background-color: var(--color-bg-secondary);
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-xl);
  margin-top: var(--spacing-2xl);
}

.advantage-card {
  background-color: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  transition: all var(--transition-normal);
  border: 1px solid var(--color-border-light);
}

.advantage-card:hover {
  transform: translateY(-8px);
  border-color: var(--color-secondary);
}

.advantage-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto var(--spacing-md);
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  transition: all var(--transition-normal);
}

.advantage-card:hover .advantage-icon {
  background-color: var(--color-primary);
  color: #fff;
}

.advantage-icon svg {
  width: 28px;
  height: 28px;
}

.advantage-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-heading);
  margin-bottom: var(--spacing-sm);
}

.advantage-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0;
}

@media (max-width: 1024px) {
  .advantages-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .advantages-grid {
    grid-template-columns: 1fr;
  }
}
</style>
