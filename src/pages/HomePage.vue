<script setup lang="ts">
import HeroSection from '../components/HeroSection.vue'
import AdvantagesSection from '../components/AdvantagesSection.vue'
import ServicesSection from '../components/ServicesSection.vue'
import ProcessSection from '../components/ProcessSection.vue'
import CasesSection from '../components/CasesSection.vue'
import AboutSection from '../components/AboutSection.vue'
import ContactSection from '../components/ContactSection.vue'
</script>

<template>
  <main class="home-page">
    <HeroSection />
    <AdvantagesSection />
    <ServicesSection />
    <ProcessSection />
    <CasesSection />
    <AboutSection />
    <ContactSection />
  </main>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
}
</style>
