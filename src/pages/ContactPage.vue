<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const form = ref({
  name: '',
  company: '',
  phone: '',
  email: '',
  message: ''
})

const submitted = ref(false)

const submitForm = () => {
  submitted.value = true
  setTimeout(() => {
    submitted.value = false
    form.value = { name: '', company: '', phone: '', email: '', message: '' }
  }, 3000)
}

const faqs = [
  {
    q: '项目开发周期一般是多久？',
    a: '根据项目规模和复杂度，一般定制化项目开发周期在2-6个月不等。我们会在需求调研阶段给出详细的时间规划。'
  },
  {
    q: '是否支持系统二次开发和迭代？',
    a: '当然支持。我们提供长期技术支持服务，系统上线后可以根据业务发展需求进行功能迭代和优化升级。'
  },
  {
    q: '数据安全如何保障？',
    a: '我们严格遵循数据安全规范，采用加密传输、权限控制、安全审计等多重防护措施，确保您的数据安全。'
  },
  {
    q: '是否提供技术培训？',
    a: '是的。项目交付后，我们会提供详细的技术文档和操作培训，确保您的团队能够独立使用和维护系统。'
  }
]

const activeFaq = ref<number | null>(null)

const toggleFaq = (index: number) => {
  activeFaq.value = activeFaq.value === index ? null : index
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
  
  const infoPanel = document.querySelector('.contact-info-panel')
  if (infoPanel) {
    infoPanel.classList.add('reveal-left')
    observer.value.observe(infoPanel)
  }

  const formPanel = document.querySelector('.contact-form-panel')
  if (formPanel) {
    formPanel.classList.add('reveal-right')
    observer.value.observe(formPanel)
  }

  document.querySelectorAll('.faq-item').forEach((el, i) => {
    el.classList.add('reveal');
    ;(el as HTMLElement).style.transitionDelay = `${i * 0.1}s`
    observer.value?.observe(el)
  })
})

onUnmounted(() => {
  observer.value?.disconnect()
})
</script>

<template>
  <main class="contact-page">
    <section class="page-header">
      <div class="container">
        <h1 class="page-title">{{ t('contact.title') }}</h1>
        <p class="page-subtitle">{{ t('contact.subtitle') }}</p>
      </div>
    </section>

    <section class="contact-main section">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info-panel">
            <h2>联系方式</h2>
            <div class="info-list">
              <div class="info-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <div>
                  <span class="info-label">{{ t('contact.address') }}</span>
                  <span class="info-value">{{ t('contact.addressValue') }}</span>
                </div>
              </div>
              <div class="info-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <div>
                  <span class="info-label">{{ t('contact.email') }}</span>
                  <span class="info-value">{{ t('contact.emailValue') }}</span>
                </div>
              </div>
              <div class="info-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <div>
                  <span class="info-label">{{ t('contact.tel') }}</span>
                  <span class="info-value">{{ t('contact.telValue') }}</span>
                </div>
              </div>
            </div>

            <div class="business-hours">
              <h3>工作时间</h3>
              <p>周一至周五 9:00 - 18:00</p>
              <p>周六 10:00 - 16:00</p>
            </div>
          </div>

          <div class="contact-form-panel">
            <h2>提交需求</h2>
            <form @submit.prevent="submitForm" class="contact-form">
              <div class="form-row">
                <div class="form-group">
                  <label>{{ t('contact.name') }} *</label>
                  <input v-model="form.name" type="text" required />
                </div>
                <div class="form-group">
                  <label>{{ t('contact.company') }}</label>
                  <input v-model="form.company" type="text" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>{{ t('contact.phone') }} *</label>
                  <input v-model="form.phone" type="tel" required />
                </div>
                <div class="form-group">
                  <label>{{ t('contact.email') }}</label>
                  <input v-model="form.email" type="email" />
                </div>
              </div>
              <div class="form-group">
                <label>{{ t('contact.message') }} *</label>
                <textarea v-model="form.message" rows="5" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-submit">
                {{ t('contact.submit') }}
              </button>
              <p v-if="submitted" class="form-success">{{ t('contact.success') }}</p>
            </form>
          </div>
        </div>
      </div>
    </section>

    <section class="faq section">
      <div class="container">
        <div class="section-title">
          <h2>常见问题</h2>
        </div>
        <div class="faq-list">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="faq-item"
          >
            <button
              class="faq-question"
              :class="{ open: activeFaq === index }"
              @click="toggleFaq(index)"
            >
              <span>{{ faq.q }}</span>
              <svg
                class="faq-icon"
                :class="{ rotated: activeFaq === index }"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            <div v-if="activeFaq === index" class="faq-answer">
              <p>{{ faq.a }}</p>
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
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: var(--spacing-3xl);
}

.contact-info-panel h2,
.contact-form-panel h2 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-heading);
  margin-bottom: var(--spacing-xl);
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
}

.info-item svg {
  color: var(--color-primary);
  flex-shrink: 0;
  margin-top: var(--spacing-xs);
}

.info-label {
  display: block;
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-xs);
}

.info-value {
  display: block;
  font-size: var(--font-size-base);
  color: var(--color-text);
}

.business-hours {
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border-light);
}

.business-hours h3 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-heading);
  margin-bottom: var(--spacing-md);
}

.business-hours p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xs);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: var(--font-size-sm);
  color: var(--color-text);
  margin-bottom: var(--spacing-xs);
}

.form-group input,
.form-group textarea {
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text);
  font-size: var(--font-size-base);
  font-family: inherit;
  transition: border-color var(--transition-fast);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}

.form-group textarea {
  resize: vertical;
}

.btn-submit {
  width: 100%;
  padding: var(--spacing-md);
  font-size: var(--font-size-base);
}

.form-success {
  text-align: center;
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  margin: 0;
}

.faq {
  background-color: var(--color-bg-secondary);
}

.faq-list {
  max-width: 800px;
  margin: var(--spacing-2xl) auto 0;
}

.faq-item {
  margin-bottom: var(--spacing-md);
}

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  background-color: var(--color-bg-card);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  color: var(--color-text-heading);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.faq-question:hover {
  border-color: var(--color-primary);
}

.faq-icon {
  width: 20px;
  height: 20px;
  transition: transform var(--transition-fast);
  flex-shrink: 0;
  margin-left: var(--spacing-md);
}

.faq-icon.rotated {
  transform: rotate(180deg);
}

.faq-answer {
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: var(--color-bg-card);
  border: 1px solid var(--color-border-light);
  border-top: none;
  border-radius: 0 0 var(--radius-md) var(--radius-md);
  margin-top: -1px;
}

.faq-answer p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0;
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .page-title {
    font-size: var(--font-size-2xl);
  }
}
</style>
