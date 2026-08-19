<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white py-20 overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-96 h-96 bg-cyan-400 rounded-full filter blur-3xl animate-pulse"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      </div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="max-w-5xl mx-auto">
          <!-- Back Button -->
          <RouterLink to="/Products_and_services/Software_Sales/Engineering_Software_List" class="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-8 group">
            <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <span>Back to Products</span>
          </RouterLink>

          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div class="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2 mb-6">
                <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                </svg>
                <span class="text-blue-300 font-semibold">Multidisciplinary Structural Analysis</span>
              </div>
              
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                MSC Nastran
              </h1>
              
              <p class="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                The world's most trusted and widely used finite element analysis (FEA) solver for structural analysis
              </p>

              <div class="flex flex-wrap gap-3 mb-8">
                <span class="px-4 py-2 bg-blue-500/30 backdrop-blur-sm rounded-lg text-sm font-semibold border border-blue-400/30">FEA Solver</span>
                <span class="px-4 py-2 bg-purple-500/30 backdrop-blur-sm rounded-lg text-sm font-semibold border border-purple-400/30">Linear & Nonlinear</span>
                <span class="px-4 py-2 bg-cyan-500/30 backdrop-blur-sm rounded-lg text-sm font-semibold border border-cyan-400/30">Multidisciplinary</span>
              </div>

              <div class="flex flex-col sm:flex-row gap-4">
                <button
                  @click="openQuoteModal"
                  class="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 hover:scale-105 shadow-xl inline-flex items-center justify-center gap-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <span>Get Quote</span>
                </button>
                <button
                  @click="openDemoModal"
                  class="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                  <span>Request Demo</span>
                </button>
              </div>
            </div>

            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl blur-3xl opacity-30"></div>
              <div class="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <img 
                  :src="nastranLogo" 
                  alt="MSC Nastran" 
                  class="w-full h-auto object-contain mb-6"
                />
                <div class="grid grid-cols-2 gap-4">
                  <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div class="text-3xl font-bold mb-1">50+</div>
                    <div class="text-blue-200 text-sm">Years in Industry</div>
                  </div>
                  <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div class="text-3xl font-bold mb-1">#1</div>
                    <div class="text-blue-200 text-sm">FEA Solver</div>
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
          <div class="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p class="text-xl leading-relaxed">
              <span class="font-bold text-blue-600">MSC Nastran</span> is the industry-standard finite element analysis (FEA) solver used by engineers worldwide to perform linear and nonlinear static, dynamic, and thermal analyses on structures and mechanical components.
            </p>
            <p>
              With over 50 years of continuous development and enhancement, MSC Nastran has become the most trusted and widely used multidisciplinary structural analysis solution. It delivers powerful capabilities for stress, vibration, heat transfer, acoustics, aeroelasticity, and more.
            </p>
            <p>
              From aerospace to automotive, from biomedical to consumer products, MSC Nastran helps engineers understand how their designs will behave under real-world conditions, enabling them to optimize performance, reduce physical testing, and accelerate time to market.
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
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive analysis capabilities for every engineering challenge
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature Cards -->
          <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
            <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Linear & Nonlinear Statics</h3>
            <p class="text-gray-600">
              Perform static analysis for both linear and nonlinear behavior including material, geometric, and contact nonlinearities.
            </p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
            <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Normal Modes & Dynamics</h3>
            <p class="text-gray-600">
              Comprehensive dynamic analysis including modal, frequency response, transient response, and random vibration.
            </p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
            <div class="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Heat Transfer</h3>
            <p class="text-gray-600">
              Steady-state and transient thermal analysis with radiation, convection, and conduction capabilities.
            </p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
            <div class="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Acoustics & Vibration</h3>
            <p class="text-gray-600">
              Interior and exterior acoustics, noise analysis, and vibration prediction capabilities.
            </p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
            <div class="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Aeroelasticity</h3>
            <p class="text-gray-600">
              Advanced aeroelastic analysis for flutter, divergence, control effectiveness, and more.
            </p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
            <div class="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Optimization</h3>
            <p class="text-gray-600">
              Integrated design optimization including topology, topography, size, and shape optimization.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Applications -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Industry Applications
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted across all major engineering industries
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200 hover:border-blue-400 transition-all">
            <h4 class="font-bold text-gray-900 mb-2">Aerospace</h4>
            <p class="text-gray-600 text-sm">Aircraft structures, satellites, launch vehicles</p>
          </div>
          <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 hover:border-purple-400 transition-all">
            <h4 class="font-bold text-gray-900 mb-2">Automotive</h4>
            <p class="text-gray-600 text-sm">Vehicle structures, NVH, crash safety</p>
          </div>
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 hover:border-green-400 transition-all">
            <h4 class="font-bold text-gray-900 mb-2">Energy</h4>
            <p class="text-gray-600 text-sm">Power generation, turbines, renewable energy</p>
          </div>
          <div class="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200 hover:border-orange-400 transition-all">
            <h4 class="font-bold text-gray-900 mb-2">Medical</h4>
            <p class="text-gray-600 text-sm">Medical devices, implants, diagnostics</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits -->
    <section class="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-5xl mx-auto">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
            Why Choose MSC Nastran?
          </h2>

          <div class="space-y-6">
            <div class="flex gap-6 items-start bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Industry Standard</h3>
                <p class="text-gray-600">
                  Used by 95% of Fortune 1000 companies and recognized as the gold standard for FEA analysis across all industries.
                </p>
              </div>
            </div>

            <div class="flex gap-6 items-start bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Proven Accuracy</h3>
                <p class="text-gray-600">
                  Decades of validation against physical tests and real-world applications ensure reliable, accurate results you can trust.
                </p>
              </div>
            </div>

            <div class="flex gap-6 items-start bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Scalable Performance</h3>
                <p class="text-gray-600">
                  From desktop workstations to HPC clusters, MSC Nastran scales efficiently to handle models from thousands to millions of DOF.
                </p>
              </div>
            </div>

            <div class="flex gap-6 items-start bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
              <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Comprehensive Ecosystem</h3>
                <p class="text-gray-600">
                  Seamless integration with CAD tools, pre/post-processors, and optimization software for a complete simulation workflow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Resources & Downloads Section -->
    <ProductResourcesSection :resources="pdfResources" />

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl md:text-5xl font-bold mb-6">
          Ready to Experience MSC Nastran?
        </h2>
        <p class="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
          Get competitive pricing with FREE training, support, and installation
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="openQuoteModal"
            class="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 hover:scale-105 shadow-xl inline-flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span>Get FREE Quote</span>
          </button>
          <button
            @click="openDemoModal"
            class="px-8 py-4 bg-white text-blue-900 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl inline-flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            <span>Request Demo</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Modals -->
    <RequestDemoModal
      v-model="showDemoModal"
      @submit="handleDemoSubmit"
    />
    <RequestQuoteModal
      v-model="showQuoteModal"
      @submit="handleQuoteSubmit"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import RequestDemoModal from '@/components/shared/RequestDemoModal.vue'
import RequestQuoteModal from '@/components/shared/RequestQuoteModal.vue'
import nastranLogo from '@/assets/LOGO/MSCNastran.png'

const showDemoModal = ref(false)
const showQuoteModal = ref(false)

// Get PDF resources for this product
import ProductResourcesSection from '@/components/ProductResourcesSection.vue'
import { getProductResources } from '@/config/productPdfResources.js'
const pdfResources = getProductResources('msc-nastran')

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
  0%, 100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.2;
  }
}
</style>

