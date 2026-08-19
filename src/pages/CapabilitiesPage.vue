<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { observeReveal } from '../composables/useScrollAnimation'

const { t } = useI18n()

const capabilities = [
  {
    title: '全栈开发能力',
    desc: '前端界面、后端服务、移动端应用一体化交付，完整技术栈覆盖，团队内部协作高效。',
    items: ['Vue / React 前端开发', 'Node / Python 后端服务', 'iOS / Android 原生应用', '微信小程序开发']
  },
  {
    title: '系统架构能力',
    desc: '根据业务规模设计高可用、可扩展的技术架构，保障系统在访问量增长时的稳定性。',
    items: ['微服务架构拆分', '云原生部署方案', '分布式系统设计', '高并发场景优化']
  },
  {
    title: '数据分析能力',
    desc: '构建从数据采集、存储、处理到可视化的完整链路，为业务决策提供有效数据支撑。',
    items: ['数据仓库搭建', '实时数据处理', '可视化报表呈现', '智能分析建议']
  },
  {
    title: '安全防护能力',
    desc: '建立身份认证、权限管控、传输加密、漏洞扫描等多层安全防护，保障企业核心数据安全。',
    items: ['统一身份认证授权', '数据加密传输存储', '漏洞扫描与修复', '操作审计日志记录']
  },
  {
    title: 'DevOps 工程能力',
    desc: '自动化测试、构建、部署与监控体系，提升交付效率，降低人工操作风险。',
    items: ['CI/CD 持续交付流水线', '容器化部署管理', '运行监控与告警', '日志采集与分析']
  },
  {
    title: 'UI / UX 设计能力',
    desc: '从用户使用场景出发，完成界面交互与视觉设计，保证产品体验的易用性与一致性。',
    items: ['用户研究与分析', '交互流程设计', '视觉风格设计', '可用性测试迭代']
  }
]

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
        <h1 class="page-title">{{ t('nav.capabilities') }}</h1>
        <p class="page-subtitle">覆盖多维度的技术能力，为企业数字化项目提供端到端的技术支撑</p>
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
