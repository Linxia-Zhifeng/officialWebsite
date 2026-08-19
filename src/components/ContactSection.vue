<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const form = ref({
  name: '',
  company: '',
  phone: '',
  message: ''
})

const submitted = ref(false)

const submitForm = () => {
  submitted.value = true
  setTimeout(() => {
    submitted.value = false
    form.value = { name: '', company: '', phone: '', message: '' }
  }, 3000)
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
  
  const infoEl = document.querySelector('.contact-info')
  if (infoEl) {
    infoEl.classList.add('reveal-left')
    observer.value.observe(infoEl)
  }

  const formEl = document.querySelector('.form')
  if (formEl) {
    formEl.classList.add('reveal-right')
    observer.value.observe(formEl)
  }
})

onUnmounted(() => {
  observer.value?.disconnect()
})
</script>

<template>
  <section class="contact section">
    <div class="container">
      <div class="contact-content">
        <div class="contact-info">
          <h2 class="contact-title">{{ t('contact.title') }}</h2>
          <p class="contact-subtitle">{{ t('contact.subtitle') }}</p>

          <div class="info-list">
            <div class="info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <div>
                <span class="info-label">{{ t('contact.address') }}</span>
                <span class="info-value">{{ t('contact.addressValue') }}</span>
              </div>
            </div>
            <div class="info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <div>
                <span class="info-label">{{ t('contact.email') }}</span>
                <span class="info-value">{{ t('contact.emailValue') }}</span>
              </div>
            </div>
            <div class="info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <div>
                <span class="info-label">{{ t('contact.tel') }}</span>
                <span class="info-value">{{ t('contact.telValue') }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="contact-form">
          <form @submit.prevent="submitForm" class="form">
            <div class="form-row">
              <div class="form-group">
                <label>{{ t('contact.name') }}</label>
                <input v-model="form.name" type="text" class="form-input" required />
              </div>
              <div class="form-group">
                <label>{{ t('contact.company') }}</label>
                <input v-model="form.company" type="text" class="form-input" />
              </div>
            </div>
            <div class="form-group">
              <label>{{ t('contact.phone') }}</label>
              <input v-model="form.phone" type="tel" class="form-input" required />
            </div>
            <div class="form-group">
              <label>{{ t('contact.message') }}</label>
              <textarea v-model="form.message" class="form-input form-textarea" rows="4" required></textarea>
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
</template>

<style scoped>
.contact-content {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: var(--spacing-3xl);
  margin-top: var(--spacing-2xl);
}

.contact-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-heading);
  margin-bottom: var(--spacing-md);
}

.contact-subtitle {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-2xl);
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
}

.info-item svg {
  color: var(--color-primary);
  flex-shrink: 0;
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

.form {
  background-color: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  border: 1px solid var(--color-border-light);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
}

.form-group {
  margin-bottom: var(--spacing-md);
}

.form-group label {
  display: block;
  font-size: var(--font-size-sm);
  color: var(--color-text);
  margin-bottom: var(--spacing-xs);
}

.form-input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text);
  font-size: var(--font-size-base);
  font-family: inherit;
  transition: border-color var(--transition-fast);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
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
  margin-top: var(--spacing-md);
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
