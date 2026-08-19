<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { observeReveal } from '../composables/useScrollAnimation'

const { t, tm } = useI18n()

const steps = tm('process.steps') as string[]
const stepsCount = steps.length

onMounted(() => {
  const targets: Element[] = []

  document.querySelectorAll('.process-step').forEach((el, i) => {
    const dot = el.querySelector('.step-dot');
    const line = el.querySelector('.step-line');
    const content = el.querySelector('.step-content');
    if (dot) {
      dot.classList.add('reveal-flow');
      (dot as HTMLElement).style.transitionDelay = `${0.1 + i * 0.1}s`;
      targets.push(dot)
    }
    if (line) {
      line.classList.add('reveal-flow-line');
      (line as HTMLElement).style.transitionDelay = `${0.25 + i * 0.1}s`;
      targets.push(line)
    }
    if (content) {
      content.classList.add('reveal-flow');
      (content as HTMLElement).style.transitionDelay = `${0.4 + i * 0.1}s`;
      targets.push(content)
    }
    el.classList.add('reveal-flow');
    (el as HTMLElement).style.transitionDelay = `${i * 0.05}s`;
    targets.push(el)
  })
  observeReveal(targets)
})
</script>

<template>
  <section class="process section">
    <div class="container">
      <div class="section-title">
        <h2>{{ t('process.title') }}</h2>
        <p>{{ t('process.subtitle') }}</p>
      </div>

      <div class="process-timeline">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="process-step"
        >
          <div class="step-dot">
            <span class="step-number">{{ index + 1 }}</span>
          </div>
          <div v-if="index < stepsCount - 1" class="step-line"></div>
          <div class="step-content">
            <p class="step-label">{{ step }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.process {
  background-color: var(--color-bg-secondary);
}

.process-timeline {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: var(--spacing-3xl);
  position: relative;
}

.process-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
}

.step-dot {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--color-bg-card);
  border: 2px solid var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-md);
  position: relative;
  z-index: 2;
  transition: all var(--transition-normal);
}

.process-step:hover .step-dot {
  background-color: var(--color-primary);
  box-shadow: 0 0 0 6px var(--color-glow);
}

.step-number {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  transition: color var(--transition-normal);
}

.process-step:hover .step-number {
  color: #fff;
}

.step-line {
  position: absolute;
  top: 24px;
  left: 50%;
  width: 100%;
  height: 2px;
  background-color: var(--color-primary);
  z-index: 1;
}

.step-content {
  text-align: center;
  padding: 0 var(--spacing-sm);
}

.step-label {
  font-size: var(--font-size-sm);
  color: var(--color-text);
  margin: 0;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .process-timeline {
    flex-direction: column;
    align-items: stretch;
    gap: var(--spacing-xl);
  }

  .step-line {
    width: 2px;
    height: 24px;
    left: 50%;
    top: 48px;
    transform: translateX(-50%);
  }

  .step-content {
    margin-top: var(--spacing-sm);
  }
}
</style>
