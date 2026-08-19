<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

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
    textEl.classList.add('reveal-left')
    observer.value.observe(textEl)
  }

  const visualEl = document.querySelector('.about-visual')
  if (visualEl) {
    visualEl.classList.add('reveal-right')
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
          <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" class="about-svg">
            <circle cx="150" cy="150" r="120" stroke="currentColor" stroke-width="1" opacity="0.1">
              <animate attributeName="r" values="120;125;120" dur="6s" repeatCount="indefinite"/>
            </circle>
            <circle cx="150" cy="150" r="90" stroke="currentColor" stroke-width="1" opacity="0.15">
              <animate attributeName="r" values="90;95;90" dur="5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="150" cy="150" r="60" stroke="currentColor" stroke-width="1" opacity="0.2">
              <animate attributeName="r" values="60;65;60" dur="4s" repeatCount="indefinite"/>
            </circle>
            
            <g opacity="0.6">
              <rect x="60" y="140" width="10" height="60" rx="2" fill="#0B7285">
                <animate attributeName="y" values="140;135;140" dur="3s" repeatCount="indefinite"/>
                <animate attributeName="height" values="60;65;60" dur="3s" repeatCount="indefinite"/>
              </rect>
              <rect x="90" y="110" width="10" height="90" rx="2" fill="#1190A5">
                <animate attributeName="y" values="110;105;110" dur="3s" begin="0.2s" repeatCount="indefinite"/>
                <animate attributeName="height" values="90;95;90" dur="3s" begin="0.2s" repeatCount="indefinite"/>
              </rect>
              <rect x="120" y="80" width="10" height="120" rx="2" fill="#1B8AAA">
                <animate attributeName="y" values="80;75;80" dur="3s" begin="0.4s" repeatCount="indefinite"/>
                <animate attributeName="height" values="120;125;120" dur="3s" begin="0.4s" repeatCount="indefinite"/>
              </rect>
              <rect x="150" y="50" width="10" height="150" rx="2" fill="#2FB8A6">
                <animate attributeName="y" values="50;45;50" dur="3s" begin="0.6s" repeatCount="indefinite"/>
                <animate attributeName="height" values="150;155;150" dur="3s" begin="0.6s" repeatCount="indefinite"/>
              </rect>
              <rect x="180" y="90" width="10" height="110" rx="2" fill="#4FD9C4">
                <animate attributeName="y" values="90;85;90" dur="3s" begin="0.8s" repeatCount="indefinite"/>
                <animate attributeName="height" values="110;115;110" dur="3s" begin="0.8s" repeatCount="indefinite"/>
              </rect>
              <rect x="210" y="120" width="10" height="80" rx="2" fill="#7EE5D4">
                <animate attributeName="y" values="120;115;120" dur="3s" begin="1s" repeatCount="indefinite"/>
                <animate attributeName="height" values="80;85;80" dur="3s" begin="1s" repeatCount="indefinite"/>
              </rect>
            </g>
            
            <g opacity="0.4">
              <line x1="40" y1="200" x2="260" y2="200" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4">
                <animate attributeName="x1" values="40;50;40" dur="4s" repeatCount="indefinite"/>
              </line>
              <line x1="40" y1="220" x2="200" y2="220" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4" opacity="0.5">
                <animate attributeName="x2" values="200;210;200" dur="5s" repeatCount="indefinite"/>
              </line>
            </g>
          </svg>
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

.about-svg {
  width: 100%;
  max-width: 300px;
  height: auto;
  color: var(--color-secondary);
}

@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }

  .about-visual {
    order: -1;
  }

  .about-svg {
    max-width: 200px;
  }
}
</style>
