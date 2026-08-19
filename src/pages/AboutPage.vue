<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { observeReveal } from '../composables/useScrollAnimation'

const { t } = useI18n()

const timeline = [
  { year: '2024', title: '慢慢长大', desc: '服务过的企业超过100家，团队也扩展到30多号人了' },
  { year: '2022', title: '攒了点经验', desc: '做了好几个大系统的重构项目，越来越多客户愿意一直跟我们合作' },
  { year: '2020', title: '团队凑齐了', desc: '核心成员稳定了，从设计、写代码、测bug到上线维护，啥岗位都有' },
  { year: '2018', title: '开干了', desc: '林下之风科技成立，就想做点靠谱的软件给企业用' }
]

const values = [
  { icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5', title: '沉下心做', desc: '技术慢慢磨，行业慢慢钻，不着急' },
  { icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z', title: '说到做到', desc: '说好什么时候交就什么时候交，有变动提前说' },
  { icon: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z', title: '实在做事', desc: '不说虚话，不玩套路，该咋干就咋干' },
  { icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', title: '长期搭档', desc: '交完货不跑路，有事随时找得着' }
]

onMounted(() => {
  const targets: Element[] = []

  const intro = document.querySelector('.intro-content')
  if (intro) {
    intro.classList.add('reveal-ripple')
    targets.push(intro)
  }

  document.querySelectorAll('.value-card').forEach((el, i) => {
    el.classList.add('reveal-flip');
    (el as HTMLElement).style.transitionDelay = `${i * 0.1}s`
    targets.push(el)
  })

  document.querySelectorAll('.timeline-item').forEach((el, i) => {
    const line = el.querySelector('.timeline-line');
    if (line) {
      line.classList.add('reveal-flow-line');
      (line as HTMLElement).style.transitionDelay = `${0.2 + i * 0.1}s`;
      targets.push(line);
    }
    if (i % 2 === 0) {
      el.classList.add('reveal-left');
    } else {
      el.classList.add('reveal-right');
    }
    (el as HTMLElement).style.transitionDelay = `${i * 0.1}s`
    targets.push(el)
  })

  observeReveal(targets)
})
</script>

<template>
  <main class="about-page">
    <section class="page-header">
      <div class="container">
        <h1 class="page-title">{{ t('about.title') }}</h1>
      </div>
    </section>

    <section class="about-intro section">
      <div class="container">
        <div class="intro-content">
          <p class="intro-text">{{ t('about.p1') }}</p>
          <p class="intro-text">{{ t('about.p2') }}</p>
          <p class="intro-text">{{ t('about.p3') }}</p>
        </div>
      </div>
    </section>

    <section class="values section">
      <div class="container">
        <div class="section-title">
          <h2>我们怎么做事</h2>
        </div>
        <div class="values-grid">
          <div v-for="(value, index) in values" :key="index" class="value-card">
            <div class="value-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path :d="value.icon"/>
              </svg>
            </div>
            <h3>{{ value.title }}</h3>
            <p>{{ value.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="timeline-section section">
      <div class="container">
        <div class="section-title">
          <h2>走过来的路</h2>
        </div>
        <div class="timeline">
          <div
            v-for="(item, index) in timeline"
            :key="index"
            class="timeline-item"
          >
            <div class="timeline-year">{{ item.year }}</div>
            <div class="timeline-content">
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
            </div>
            <div v-if="index < timeline.length - 1" class="timeline-line"></div>
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

.intro-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.intro-text {
  font-size: var(--font-size-lg);
  color: var(--color-text);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-lg);
}

.values {
  background-color: var(--color-bg-secondary);
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-xl);
  margin-top: var(--spacing-2xl);
}

.value-card {
  background-color: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  border: 1px solid var(--color-border-light);
  transition: all var(--transition-normal);
}

.value-card:hover {
  border-color: var(--color-primary);
}

.value-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto var(--spacing-md);
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
}

.value-icon svg {
  width: 24px;
  height: 24px;
}

.value-card h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-heading);
  margin-bottom: var(--spacing-sm);
}

.value-card p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

.timeline {
  max-width: 800px;
  margin: var(--spacing-2xl) auto 0;
  position: relative;
}

.timeline-item {
  position: relative;
  padding-left: var(--spacing-3xl);
  padding-bottom: var(--spacing-2xl);
}

.timeline-year {
  position: absolute;
  left: 0;
  top: 0;
  width: 64px;
  height: 64px;
  background-color: var(--color-primary);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
}

.timeline-content {
  padding-left: var(--spacing-xl);
}

.timeline-content h3 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-heading);
  margin-bottom: var(--spacing-sm);
}

.timeline-content p {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin: 0;
}

.timeline-line {
  position: absolute;
  left: 32px;
  top: 64px;
  width: 2px;
  height: calc(100% - 64px);
  background-color: var(--color-border);
}

@media (max-width: 1024px) {
  .values-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .values-grid {
    grid-template-columns: 1fr;
  }

  .page-title {
    font-size: var(--font-size-2xl);
  }

  .timeline-year {
    width: 48px;
    height: 48px;
    font-size: var(--font-size-base);
  }

  .timeline-item {
    padding-left: var(--spacing-2xl);
  }
}
</style>
