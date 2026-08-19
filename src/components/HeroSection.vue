<script setup lang="ts">import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import logoImg from '../assets/logo.svg';
const { t } = useI18n();
const router = useRouter();
const isLoaded = ref(false);
const goContact = () => router.push('/contact');
const goCases = () => router.push('/cases');
onMounted(() => {
 setTimeout(() => {
 isLoaded.value = true;
 }, 100);
});
</script>

<template>
  <section class="hero">
    <div class="hero-bg">
      <svg class="deco-lines" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="100" y1="100" x2="400" y2="100" stroke="currentColor" stroke-width="1" opacity="0.1">
          <animate attributeName="x1" values="100;400;100" dur="8s" repeatCount="indefinite"/>
          <animate attributeName="x2" values="400;700;400" dur="8s" repeatCount="indefinite"/>
        </line>
        <line x1="200" y1="200" x2="500" y2="200" stroke="currentColor" stroke-width="1" opacity="0.08">
          <animate attributeName="x1" values="200;500;200" dur="10s" repeatCount="indefinite"/>
          <animate attributeName="x2" values="500;800;500" dur="10s" repeatCount="indefinite"/>
        </line>
        <line x1="300" y1="300" x2="600" y2="300" stroke="currentColor" stroke-width="1" opacity="0.06">
          <animate attributeName="x1" values="300;600;300" dur="12s" repeatCount="indefinite"/>
          <animate attributeName="x2" values="600;900;600" dur="12s" repeatCount="indefinite"/>
        </line>
        <line x1="700" y1="150" x2="1000" y2="150" stroke="currentColor" stroke-width="1" opacity="0.08">
          <animate attributeName="x1" values="700;1000;700" dur="9s" repeatCount="indefinite"/>
          <animate attributeName="x2" values="1000;1200;1000" dur="9s" repeatCount="indefinite"/>
        </line>
        <line x1="800" y1="250" x2="1100" y2="250" stroke="currentColor" stroke-width="1" opacity="0.1">
          <animate attributeName="x1" values="800;1100;800" dur="11s" repeatCount="indefinite"/>
        </line>
        <circle cx="900" cy="400" r="80" stroke="currentColor" stroke-width="1" opacity="0.08">
          <animate attributeName="r" values="80;100;80" dur="6s" repeatCount="indefinite"/>
        </circle>
        <circle cx="1000" cy="450" r="50" stroke="currentColor" stroke-width="1" opacity="0.06">
          <animate attributeName="r" values="50;70;50" dur="8s" repeatCount="indefinite"/>
        </circle>
      </svg>
      <div class="floating-elements">
        <div class="float-block block-1"></div>
        <div class="float-block block-2"></div>
        <div class="float-block block-3"></div>
        <div class="float-block block-4"></div>
        <div class="float-block block-5"></div>
        <div class="float-block block-6"></div>
      </div>
    </div>

    <div class="container hero-content" :class="{ loaded: isLoaded }">
      <div class="logo-mark" :class="{ animate: isLoaded }">
        <img :src="logoImg" alt="林下之风" />
      </div>

      <h1 class="hero-title" :class="{ animate: isLoaded }">{{ t('hero.title') }}</h1>
      <p class="hero-subtitle" :class="{ animate: isLoaded }">{{ t('hero.subtitle') }}</p>

      <div class="hero-actions" :class="{ animate: isLoaded }">
        <button class="btn btn-primary btn-lg" @click="goCases">
          {{ t('hero.btn2') }}
        </button>
        <button class="btn btn-secondary btn-lg" @click="goContact">
          {{ t('hero.btn3') }}
        </button>
      </div>
    </div>

    <div class="scroll-indicator">
      <div class="mouse">
        <div class="wheel"></div>
      </div>
      <span class="scroll-text">Scroll</span>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-top: var(--header-height);
}

.hero-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  color: var(--color-secondary);
}

.deco-lines {
  width: 100%;
  height: 100%;
}

.floating-elements {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.float-block {
  position: absolute;
  border-radius: 4px;
  opacity: 0.3;
}

.block-1 {
  width: 20px;
  height: 20px;
  background-color: var(--color-primary);
  top: 15%;
  left: 10%;
  animation: float 6s ease-in-out infinite;
}

.block-2 {
  width: 12px;
  height: 12px;
  background-color: var(--color-primary-light);
  top: 25%;
  right: 15%;
  animation: float 5s ease-in-out infinite 1s;
}

.block-3 {
  width: 16px;
  height: 16px;
  background-color: var(--color-secondary);
  bottom: 30%;
  left: 20%;
  animation: float 7s ease-in-out infinite 2s;
}

.block-4 {
  width: 8px;
  height: 8px;
  background-color: var(--color-secondary-light);
  top: 40%;
  right: 25%;
  animation: float 4s ease-in-out infinite 0.5s;
}

.block-5 {
  width: 24px;
  height: 24px;
  background-color: var(--color-accent);
  bottom: 20%;
  right: 10%;
  animation: float 8s ease-in-out infinite 1.5s;
}

.block-6 {
  width: 10px;
  height: 10px;
  background-color: var(--color-primary-dark);
  top: 60%;
  left: 35%;
  animation: float 5.5s ease-in-out infinite 2.5s;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-15px) rotate(5deg); }
  50% { transform: translateY(-5px) rotate(-3deg); }
  75% { transform: translateY(-20px) rotate(3deg); }
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.logo-mark {
  margin-bottom: var(--spacing-xl);
  color: var(--color-primary);
  display: flex;
  justify-content: center;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.logo-mark.animate {
  opacity: 1;
  transform: scale(1);
}

.logo-mark img {
  width: 100px;
  height: 100px;
}

.hero-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-heading);
  margin-bottom: var(--spacing-lg);
  letter-spacing: -0.02em;
  opacity: 0;
  transition: opacity 0.8s ease 0.2s;
}

.hero-title.animate {
  opacity: 1;
}

.hero-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto var(--spacing-2xl);
  line-height: var(--line-height-relaxed);
  opacity: 0;
  transition: opacity 0.8s ease 0.4s;
}

.hero-subtitle.animate {
  opacity: 1;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  opacity: 0;
  transition: opacity 0.8s ease 0.6s;
}

.hero-actions.animate {
  opacity: 1;
}

.btn-lg {
  padding: var(--spacing-md) var(--spacing-2xl);
  font-size: var(--font-size-base);
}

.scroll-indicator {
  position: absolute;
  bottom: var(--spacing-2xl);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  opacity: 0;
  animation: fadeIn 1s ease 1s forwards;
}

.mouse {
  width: 26px;
  height: 42px;
  border: 2px solid var(--color-text-muted);
  border-radius: 13px;
  display: flex;
  justify-content: center;
  padding-top: 8px;
}

.wheel {
  width: 4px;
  height: 8px;
  background-color: var(--color-primary);
  border-radius: 2px;
  animation: scroll-wheel 1.5s ease-in-out infinite;
}

@keyframes scroll-wheel {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(15px); opacity: 0; }
}

.scroll-text {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  letter-spacing: 2px;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: var(--font-size-2xl);
  }

  .hero-subtitle {
    font-size: var(--font-size-base);
    padding: 0 var(--spacing-md);
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .logo-mark img {
    width: 70px;
    height: 70px;
  }

  .scroll-indicator {
    display: none;
  }
}
</style>
