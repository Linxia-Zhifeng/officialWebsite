<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const activeFilter = ref('all')

const filters = [
  { key: 'all', label: '全部' },
  { key: 'manufacturing', label: '制造业' },
  { key: 'retail', label: '零售业' },
  { key: 'logistics', label: '物流业' },
  { key: 'software', label: '软件服务' }
]

const allCases = [
  {
    id: 1,
    title: '制造业生产管理系统',
    industry: '制造业',
    industryKey: 'manufacturing',
    result: '生产协同效率提升 30%',
    desc: '为大型制造企业定制开发生产管理系统，实现生产计划、物料管理、质量监控全流程数字化与可视化。',
    tags: ['MES 系统', '生产看板', '实时数据']
  },
  {
    id: 2,
    title: '连锁零售会员体系',
    industry: '零售业',
    industryKey: 'retail',
    result: '会员复购率提升 45%',
    desc: '为连锁零售企业构建全渠道会员体系，打通线上线下会员权益，支持精准营销与个性化服务。',
    tags: ['CRM 系统', '全渠道整合', '消费分析']
  },
  {
    id: 3,
    title: '物流调度平台',
    industry: '物流业',
    industryKey: 'logistics',
    result: '配送时效缩短 25%',
    desc: '为物流企业打造智能调度平台，通过路径优化算法提升调度效率，支持运输过程实时追踪与异常预警。',
    tags: ['智能调度', '实时追踪', '路径优化']
  },
  {
    id: 4,
    title: '团队协作 SaaS 工具',
    industry: '软件服务',
    industryKey: 'software',
    result: '团队协作效率提升 50%',
    desc: '面向企业场景的云端协作工具，集成文档协作、任务管理、即时通讯等能力，降低团队沟通成本。',
    tags: ['SaaS 产品', '协作办公', '云原生']
  },
  {
    id: 5,
    title: '电商中台系统',
    industry: '零售业',
    industryKey: 'retail',
    result: '订单处理效率提升 60%',
    desc: '为电商企业搭建统一业务中台，整合商品、库存、订单、营销等核心模块，支撑业务规模快速增长。',
    tags: ['中台架构', '高并发处理', '微服务']
  },
  {
    id: 6,
    title: '供应链金融平台',
    industry: '软件服务',
    industryKey: 'software',
    result: '审批流程缩短 70%',
    desc: '为金融科技企业开发供应链金融平台，实现授信审批、风控管理、放款流程全线上化与自动化。',
    tags: ['金融科技', '风控模型', '流程自动化']
  }
]

const filteredCases = () => {
  if (activeFilter.value === 'all') return allCases
  return allCases.filter(c => c.industryKey === activeFilter.value)
}

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
  
  document.querySelectorAll('.case-detail-card').forEach((el, i) => {
    const cls = i % 2 === 0 ? 'reveal-wave-l' : 'reveal-wave-r';
    el.classList.add(cls);
    (el as HTMLElement).style.transitionDelay = `${i * 0.15}s`
    observer.value?.observe(el)
  })
})

onUnmounted(() => {
  observer.value?.disconnect()
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
