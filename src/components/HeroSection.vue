<script setup lang="ts">import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import logoImg from '../assets/logo.png';
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
      <!-- 左侧大号条形组，呼应logo主结构 -->
      <div class="bars bars-left">
        <span class="bar bar-1"></span>
        <span class="bar bar-2"></span>
        <span class="bar bar-3"></span>
        <span class="bar bar-4"></span>
        <span class="bar bar-5"></span>
        <span class="bar bar-6"></span>
        <span class="bar bar-7"></span>
      </div>

      <!-- 右侧中号条形组 -->
      <div class="bars bars-right">
        <span class="bar bar-1"></span>
        <span class="bar bar-2"></span>
        <span class="bar bar-3"></span>
        <span class="bar bar-4"></span>
        <span class="bar bar-5"></span>
        <span class="bar bar-6"></span>
      </div>

      <!-- 散落小方块，呼应logo散点 -->
      <div class="scatter-dots">
        <span class="dot dot-1"></span>
        <span class="dot dot-2"></span>
        <span class="dot dot-3"></span>
        <span class="dot dot-4"></span>
        <span class="dot dot-5"></span>
        <span class="dot dot-6"></span>
        <span class="dot dot-7"></span>
        <span class="dot dot-8"></span>
        <span class="dot dot-9"></span>
        <span class="dot dot-10"></span>
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
  pointer-events: none;
}

/* ========== 条形组容器 ========== */
.bars {
  position: absolute;
  display: flex;
  align-items: flex-end;
  gap: 10px;
  pointer-events: none;
}

.bars-left {
  left: -10px;
  bottom: 8%;
  gap: 18px;
  opacity: 0.22;
}

.bars-right {
  right: -5px;
  top: 10%;
  gap: 14px;
  opacity: 0.2;
  transform: rotate(180deg);
}

/* 单根条形 - 颜色对应 logo 色系 */
.bar {
  width: 20px;
  border-radius: 4px;
  display: block;
  animation: barPulse 5s ease-in-out infinite;
}

.bars-left .bar {
  width: 26px;
}

.bar-1 { background-color: #0B7285; height: 110px; animation-delay: 0s; }
.bar-2 { background-color: #0E7E96; height: 160px; animation-delay: 0.3s; }
.bar-3 { background-color: #1190A5; height: 220px; animation-delay: 0.6s; }
.bar-4 { background-color: #1B8AAA; height: 290px; animation-delay: 0.9s; }
.bar-5 { background-color: #2FB8A6; height: 250px; animation-delay: 1.2s; }
.bar-6 { background-color: #4FD9C4; height: 170px; animation-delay: 1.5s; }
.bar-7 { background-color: #7EE5D4; height: 120px; animation-delay: 1.8s; }

@keyframes barPulse {
  0%, 100% { transform: scaleY(1); opacity: 1; }
  50%      { transform: scaleY(1.15); opacity: 0.85; }
}

/* ========== 散落小方块 ========== */
.scatter-dots {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.dot {
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 3px;
  opacity: 0.18;
  animation: dotDrift 9s ease-in-out infinite;
}

/* 左半区方块，颜色偏深 */
.dot-1 { top: 15%; left: 10%; background-color: #0B7285; width: 26px; height: 26px; animation-delay: 0s; }
.dot-2 { top: 26%; left: 20%; background-color: #1190A5; width: 20px; height: 20px; animation-delay: 1.2s; }
.dot-3 { top: 52%; left: 6%;  background-color: #0E7E96; width: 22px; height: 22px; animation-delay: 2.4s; }
.dot-4 { top: 72%; left: 24%; background-color: #1B8AAA; width: 18px; height: 18px; animation-delay: 3.6s; }
.dot-5 { top: 38%; left: 30%; background-color: #0B7285; width: 16px; height: 16px; animation-delay: 4.8s; }

/* 右半区方块，颜色偏浅 */
.dot-6  { top: 20%; right: 20%; background-color: #2FB8A6; width: 20px; height: 20px; animation-delay: 0.6s; }
.dot-7  { top: 33%; right: 8%;  background-color: #4FD9C4; width: 26px; height: 26px; animation-delay: 1.8s; }
.dot-8  { top: 58%; right: 24%; background-color: #7EE5D4; width: 22px; height: 22px; animation-delay: 3.0s; }
.dot-9  { top: 73%; right: 12%; background-color: #2FB8A6; width: 18px; height: 18px; animation-delay: 4.2s; }
.dot-10 { top: 43%; right: 30%; background-color: #4FD9C4; width: 16px; height: 16px; animation-delay: 5.4s; }

@keyframes dotDrift {
  0%, 100% { transform: translate(0, 0) rotate(0deg);      opacity: 0.15; }
  50%      { transform: translate(14px, -20px) rotate(8deg); opacity: 0.26; }
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
  width: 160px;
  height: 160px;
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
    width: 110px;
    height: 110px;
  }

  .scroll-indicator {
    display: none;
  }

  /* 移动端背景：缩小条形并降低密度 */
  .bars-left { left: -30px; gap: 10px; opacity: 0.18; }
  .bars-right { right: -20px; gap: 8px; opacity: 0.16; }
  .bars-left .bar, .bar { width: 14px; border-radius: 3px; }
  .bar-1 { height: 70px; }
  .bar-2 { height: 100px; }
  .bar-3 { height: 145px; }
  .bar-4 { height: 190px; }
  .bar-5 { height: 165px; }
  .bar-6 { height: 110px; }
  .bar-7 { height: 75px; }

  .dot-3, .dot-4, .dot-8, .dot-9 { display: none; }
  .dot { width: 13px; height: 13px; opacity: 0.16; }
  .dot-1, .dot-7 { width: 18px; height: 18px; }
}
</style>
