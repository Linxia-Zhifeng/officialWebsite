<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { observeReveal } from '../composables/useScrollAnimation'

const { t } = useI18n()

const services = [
  {
    title: '定制化系统开发',
    desc: '面向企业内部管理或对外业务场景，根据实际流程设计开发，不套用现成模板，确保系统与业务需求匹配。',
    features: ['需求调研分析', '原型方案设计', '功能开发实现', '部署上线培训'],
    icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'
  },
  {
    title: 'Web 与移动端开发',
    desc: '覆盖企业官网、管理后台、微信小程序、移动应用等多端形态，实现统一数据接口与一致的操作体验。',
    features: ['响应式多端适配', '统一接口数据互通', '性能优化保障流畅', '简洁易用交互设计'],
    icon: 'M18 20h3v-8h-3v8zM6 20H3v-8h3v8zM9 20h3V8H9v12zM15 20h3V4h-3v16z'
  },
  {
    title: '数字化方案咨询',
    desc: '协助企业梳理业务流程、识别痛点与优化机会，提供分阶段可落地的数字化规划方案，控制试错成本。',
    features: ['业务现状诊断', '流程优化分析', '落地路径规划', '技术选型建议'],
    icon: 'M21 13a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 13a2.25 2.25 0 0 0 2.25 2.25h1.5a3 3 0 1 0 5.5 0h.5a3 3 0 1 0 5.5 0h.5A2.25 2.25 0 0 0 21 13z'
  },
  {
    title: '系统运维与迭代',
    desc: '针对已上线系统提供持续的运维支持、性能优化、功能扩展与技术重构服务，保障系统伴随业务稳步演进。',
    features: ['运行监控与排障', '性能调优与加固', '功能扩展与迭代', '技术架构升级'],
    icon: 'M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8 M21 3v5h-5 M12 7v5l4 2'
  }
]

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
