<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-indigo-50">
    <!-- Hero Section -->
    <section
      class="relative bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 text-white py-20 overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-96 h-96 bg-cyan-400 rounded-full filter blur-3xl animate-pulse"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl animate-pulse"
          style="animation-delay: 1s;"></div>
      </div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="max-w-5xl mx-auto">
          <!-- Back Button -->
          <RouterLink to="/Products_and_services/Software_Sales/Engineering_Software_List"
            class="inline-flex items-center gap-2 text-cyan-200 hover:text-white transition-colors mb-8 group">
            <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <span>Back to Products</span>
          </RouterLink>

          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div
                class="inline-flex items-center gap-2 bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full px-4 py-2 mb-6">
                <svg class="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z">
                  </path>
                </svg>
                <span class="text-cyan-300 font-semibold">Explicit Dynamics Simulation</span>
              </div>

              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                MSC Dytran
              </h1>

              <p class="text-xl md:text-2xl text-cyan-100 mb-8 leading-relaxed">
                Explicit finite element solver for short duration, highly nonlinear dynamic events
              </p>

              <div class="flex flex-wrap gap-3 mb-8">
                <span
                  class="px-4 py-2 bg-cyan-500/30 backdrop-blur-sm rounded-lg text-sm font-semibold border border-cyan-400/30">Explicit
                  Dynamics</span>
                <span
                  class="px-4 py-2 bg-cyan-500/30 backdrop-blur-sm rounded-lg text-sm font-semibold border border-cyan-400/30">Crash</span>
                <span
                  class="px-4 py-2 bg-cyan-500/30 backdrop-blur-sm rounded-lg text-sm font-semibold border border-cyan-400/30">Impact</span>
              </div>

              <div class="flex flex-col sm:flex-row gap-4">
                <button @click="openQuoteModal"
                  class="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 hover:scale-105 shadow-xl inline-flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                    </path>
                  </svg>
                  <span>Get Quote</span>
                </button>
                <button @click="openDemoModal"
                  class="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300 inline-flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z">
                    </path>
                  </svg>
                  <span>Request Demo</span>
                </button>
              </div>
            </div>

            <div class="relative">
              <div
                class="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl blur-3xl opacity-30">
              </div>
              <div class="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <img :src="productLogo" alt="MSC Dytran" class="w-full h-auto object-contain mb-6" />
                <div class="grid grid-cols-2 gap-4">
                  <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div class="text-3xl font-bold mb-1">30+</div>
                    <div class="text-cyan-200 text-sm">Years Proven</div>
                  </div>
                  <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div class="text-3xl font-bold mb-1">Fast</div>
                    <div class="text-cyan-200 text-sm">Explicit Solver</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Overview Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-4xl font-bold text-gray-900 mb-6">
            Product Overview
          </h2>
          <div class="prose prose-lg max-w-none text-gray-700">
            <p class="text-xl leading-relaxed">
              MSC Dytran is an explicit finite element analysis solver for simulating highly nonlinear dynamic events.
              It excels at analyzing short-duration events like crash, impact, blast, and drop testing where inertial
              effects dominate.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Key Features -->
    <section class="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Key Features & Capabilities
          </h2>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            class="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
            <div
              class="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z">
                </path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Explicit Integration</h3>
            <p class="text-gray-600">
              Fast explicit time integration for highly dynamic events
            </p>
          </div>
          <div
            class="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
            <div
              class="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z">
                </path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Crash Analysis</h3>
            <p class="text-gray-600">
              Automotive and aerospace crash simulation
            </p>
          </div>
          <div
            class="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
            <div
              class="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3">
                </path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Impact & Drop</h3>
            <p class="text-gray-600">
              Product drop testing and impact analysis
            </p>
          </div>
          <div
            class="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
            <div
              class="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z">
                </path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Blast & Explosion</h3>
            <p class="text-gray-600">
              Explosive loading and blast wave simulation
            </p>
          </div>
          <div
            class="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
            <div
              class="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Fluid-Structure Interaction</h3>
            <p class="text-gray-600">
              Eulerian and ALE capabilities for FSI
            </p>
          </div>
          <div
            class="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
            <div
              class="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6">
                </path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">High Velocity Impact</h3>
            <p class="text-gray-600">
              Projectile and penetration analysis
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Resources & Downloads Section -->
    <ProductResourcesSection :resources="pdfResources" />

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 text-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl md:text-5xl font-bold mb-6">
          Ready to Experience MSC Dytran?
        </h2>
        <p class="text-xl text-cyan-100 mb-8 max-w-3xl mx-auto">
          Get competitive pricing with FREE training, support, and installation
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="openQuoteModal"
            class="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 hover:scale-105 shadow-xl inline-flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
              </path>
            </svg>
            <span>Get FREE Quote</span>
          </button>
          <button @click="openDemoModal"
            class="px-8 py-4 bg-white text-cyan-900 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl inline-flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z">
              </path>
            </svg>
            <span>Request Demo</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Modals -->
    <RequestDemoModal v-model="showDemoModal" @submit="handleDemoSubmit" />
    <RequestQuoteModal v-model="showQuoteModal" @submit="handleQuoteSubmit" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import RequestDemoModal from '@/components/shared/RequestDemoModal.vue'
import RequestQuoteModal from '@/components/shared/RequestQuoteModal.vue'
import productLogo from '@/assets/LOGO/Dytran.png'

const showDemoModal = ref(false)
const showQuoteModal = ref(false)

// Get PDF resources for this product
import ProductResourcesSection from '@/components/ProductResourcesSection.vue'
import { getProductResources } from '@/config/productPdfResources.js'
const pdfResources = getProductResources('dytran')

const openDemoModal = () => {
  showDemoModal.value = true
}

const openQuoteModal = () => {
  showQuoteModal.value = true
}

const handleDemoSubmit = (formData) => {
  console.log('Demo request submitted:', formData)
}

const handleQuoteSubmit = (formData) => {
  console.log('Quote request submitted:', formData)
}
</script>

<style scoped>
@keyframes pulse {

  0%,
  100% {
    opacity: 0.1;
  }

  50% {
    opacity: 0.2;
  }
}
</style>
