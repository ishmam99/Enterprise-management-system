<script setup lang="ts">
import { ref } from 'vue'
import AboutUs from '@/components/homePage/AboutUs.vue';
import HeroSection from '@/components/homePage/HeroSection.vue'
import Markets from '@/components/homePage/Markets.vue';
import ProgramExp from '@/components/homePage/ProgramExp.vue';
import WhyChooseUs from '@/components/homePage/WhyChooseUs.vue';
import KeywordMarquee from '@/components/homePage/KeywordMarquee.vue'

const programs = [

]

const manufacturingCapabilities = [
  'F-35 Lightning II',
  'F/A-18 Hornet',
  'P-8 Poseidon',
  'Orion Spacecraft',
  'UH-60 Black Hawk',
  'Global Hawk / Triton',
  'Siemens Healthineers',
  '5-Axis CNC',
  '3-Axis CNC',
  'Dual Head 3-Axis CNC',
  'Autoclaves — max 10 ft dia. × 30 ft',
  'Ovens — up to 8 × 10 × 12 ft',
  'Presses — 150-ton max',
  'Machine Centers',
  '2x EMA Areas',
  'Automated Grit Blast',
  'Automated Part Wash',
  'Reticulation',
  'C-Scan — 7-axis, 30 ft',
  'A-Scan',
  'X-Ray / Attenuation',
  'Level 1 Onsite',
  'Level 2 Onsite',
  'Level 3 Onsite',
  'Compression',
  'Fatigue',
  'Flexural',
  'Shear',
  'Tensile'
]

const inspectionTesting = [

]


</script>

<template>
  <div>
    <HeroSection />
    <KeywordMarquee :items="manufacturingCapabilities" speed="50s" variant="dark" :hover-pause="true" />
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
