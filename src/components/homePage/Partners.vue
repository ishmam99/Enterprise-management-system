<template>
  <section class="bg-gradient-to-b from-white to-gray-50 py-20 overflow-hidden">
    <div class="container mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <span class="text-blue-600 font-semibold text-sm uppercase tracking-wider">Trusted By</span>
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
          Our Enterprise Partners
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Collaborating with world-class organizations to deliver exceptional engineering solutions
        </p>
      </div>

      <!-- Logo Slider -->
      <div class="relative">
        <!-- Gradient Overlays -->
        <div class="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <div class="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
        
        <!-- Scrolling Container -->
        <div class="relative w-full overflow-hidden py-8">
          <div
            class="flex items-center gap-16 animate-scroll"
            @mouseenter="pauseScroll"
            @mouseleave="resumeScroll"
            :style="{ animationPlayState: isPaused ? 'paused' : 'running' }"
          >
            <!-- Duplicate logos for infinite loop -->
            <div 
              v-for="(logo, index) in duplicatedLogos" 
              :key="index" 
              class="flex-shrink-0 group"
            >
              <div class="relative bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                <img
                  :src="logo"
                  alt="Partner Logo"
                  class="h-20 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Partner Stats -->
      <div class="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
        <div class="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div class="text-4xl font-bold text-blue-600 mb-2">50+</div>
          <div class="text-gray-600 font-medium">Global Partners</div>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div class="text-4xl font-bold text-cyan-600 mb-2">100+</div>
          <div class="text-gray-600 font-medium">Countries Served</div>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div class="text-4xl font-bold text-purple-600 mb-2">24/7</div>
          <div class="text-gray-600 font-medium">Support Available</div>
        </div>
        <div class="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div class="text-4xl font-bold text-green-600 mb-2">99.9%</div>
          <div class="text-gray-600 font-medium">Uptime Guarantee</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Import your logo assets
import lg from "../../assets/images/lg.png"
import udc from "../../assets/images/udc.jpg"
import samsung from "../../assets/images/samsung.png"
import adacel from "../../assets/images/adacel.png"
import airpower from "../../assets/images/airpower.png"
import cisco from "../../assets/images/cisco.png"

const logos = [lg, udc, samsung, adacel, airpower, cisco, lg]

// Duplicate logos to make the scroll seamless
const duplicatedLogos = [...logos, ...logos]

const isPaused = ref(false)
const pauseScroll = () => (isPaused.value = true)
const resumeScroll = () => (isPaused.value = false)
</script>

<style scoped>
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  display: inline-flex;
  animation: scroll 20s linear infinite;
}
</style>
