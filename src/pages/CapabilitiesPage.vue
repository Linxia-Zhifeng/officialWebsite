<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const capabilities = [
  {
    title: '全栈开发能力',
    desc: '覆盖前端、后端、移动端全栈技术栈，提供一站式开发服务。',
    items: ['Vue/React前端框架', 'Node.js/Python后端', 'iOS/Android原生开发', '微信小程序']
  },
  {
    title: '架构设计能力',
    desc: '为企业提供高可用、可扩展的系统架构设计方案。',
    items: ['微服务架构', '云原生部署', '分布式系统', '高并发优化']
  },
  {
    title: '数据分析能力',
    desc: '打造数据驱动的业务决策支持系统，释放数据价值。',
    items: ['数据仓库建设', '实时数据分析', '可视化报表', 'AI智能分析']
  },
  {
    title: '安全防护能力',
    desc: '全方位安全体系，保障企业核心数据资产。',
    items: ['身份认证授权', '数据加密传输', '漏洞扫描修复', '安全审计日志']
  },
  {
    title: 'DevOps能力',
    desc: '自动化运维流程，提升研发交付效率。',
    items: ['CI/CD流水线', '容器化部署', '监控告警', '日志管理']
  },
  {
    title: 'UI/UX设计能力',
    desc: '以用户为中心的设计理念，打造优质产品体验。',
    items: ['用户研究', '交互设计', '视觉设计', '可用性测试']
  }
]

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
  
  document.querySelectorAll('.cap-card').forEach((el, i) => {
    el.classList.add('reveal');
    ;(el as HTMLElement).style.transitionDelay = `${(i % 3) * 0.1}s`
    observer.value?.observe(el)
  })
})

onUnmounted(() => {
  observer.value?.disconnect()
})
</script>

<template>
  <main class="capabilities-page">
    <section class="page-header">
      <div class="container">
        <h1 class="page-title">{{ t('nav.capabilities') }}</h1>
        <p class="page-subtitle">多维度技术能力矩阵，支撑企业数字化全链路落地</p>
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
  transform: translateY(-4px);
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
