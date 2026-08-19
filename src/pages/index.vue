<script setup lang="ts">
import { ref } from 'vue'
import AboutUs from '@/components/homePage/AboutUs.vue';
import HeroSection from '@/components/homePage/HeroSection.vue'
import Markets from '@/components/homePage/Markets.vue';
import ProgramExp from '@/components/homePage/ProgramExp.vue';
import WhyChooseUs from '@/components/homePage/WhyChooseUs.vue';


</script>

<template>
  <div>
    <HeroSection />
    <AboutUs />
    <Markets />
    <ProgramExp />
    <!-- <ProgramsSection/> -->
    <WhyChooseUs />
    <!-- <FAQ /> -->
    <!--<CallToAction /> -->
    

  </div>
</template>

<style scoped>
/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}
</style>
