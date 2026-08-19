<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import logoImg from '../assets/logo.png'

const { t } = useI18n()

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
  
  const textEl = document.querySelector('.about-text')
  if (textEl) {
    textEl.classList.add('reveal-ripple')
    observer.value.observe(textEl)
  }

  const visualEl = document.querySelector('.about-visual')
  if (visualEl) {
    visualEl.classList.add('reveal-scale');
    (visualEl as HTMLElement).style.transitionDelay = '0.25s'
    observer.value.observe(visualEl)
  }
})

onUnmounted(() => {
  observer.value?.disconnect()
})
</script>

<template>
  <section class="about section">
    <div class="container">
      <div class="about-content">
        <div class="about-text">
          <h2 class="about-title">{{ t('about.title') }}</h2>
          <p class="about-desc">{{ t('about.p1') }}</p>
          <p class="about-desc">{{ t('about.p2') }}</p>
          <p class="about-desc">{{ t('about.p3') }}</p>
        </div>

        <div class="about-visual">
          <img :src="logoImg" alt="林下之风" class="about-logo" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  background-color: var(--color-bg-secondary);
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-3xl);
  align-items: center;
}

.about-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-heading);
  margin-bottom: var(--spacing-xl);
}

.about-desc {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-lg);
}

.about-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.about-logo {
  width: 100%;
  max-width: 220px;
  height: auto;
}

@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }

  .about-visual {
    order: -1;
  }

  .about-logo {
    max-width: 160px;
  }
}
</style>
