<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
    <!-- Hero Section -->
    <section
      class="relative bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 text-white py-20 overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-96 h-96 bg-pink-400 rounded-full filter blur-3xl animate-pulse"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl animate-pulse"
          style="animation-delay: 1s;"></div>
      </div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="max-w-5xl mx-auto">
          <!-- Back Button -->
          <RouterLink to="/Products_and_services/Software_Sales/Engineering_Software_List"
            class="inline-flex items-center gap-2 text-purple-200 hover:text-white transition-colors mb-8 group">
            <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <span>Back to Products</span>
          </RouterLink>

          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div
                class="inline-flex items-center gap-2 bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full px-4 py-2 mb-6">
                <svg class="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z">
                  </path>
                </svg>
                <span class="text-purple-300 font-semibold">Pre & Post-Processing</span>
              </div>

              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                MSC Patran
              </h1>

              <p class="text-xl md:text-2xl text-purple-100 mb-8 leading-relaxed">
                The world's most widely used pre and post-processing solution for finite element analysis
              </p>

              <div class="flex flex-wrap gap-3 mb-8">
                <span
                  class="px-4 py-2 bg-purple-500/30 backdrop-blur-sm rounded-lg text-sm font-semibold border border-purple-400/30">Pre-Processing</span>
                <span
                  class="px-4 py-2 bg-pink-500/30 backdrop-blur-sm rounded-lg text-sm font-semibold border border-pink-400/30">Post-Processing</span>
                <span
                  class="px-4 py-2 bg-red-500/30 backdrop-blur-sm rounded-lg text-sm font-semibold border border-red-400/30">Multi-Solver</span>
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
                class="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur-3xl opacity-30">
              </div>
              <div class="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <img :src="patranLogo" alt="MSC Patran" class="w-full h-auto object-contain mb-6" />
                <div class="grid grid-cols-2 gap-4">
                  <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div class="text-3xl font-bold mb-1">40+</div>
                    <div class="text-purple-200 text-sm">Years Leading</div>
                  </div>
                  <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div class="text-3xl font-bold mb-1">Multi</div>
                    <div class="text-purple-200 text-sm">Solver Support</div>
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
              <span class="font-bold text-purple-600">MSC Patran</span> is the world's most widely used pre- and
              post-processing software for FEA analysis. It provides a rich set of tools for mesh generation, model
              setup, and results visualization.
            </p>
            <p>
              With its complete range of FEA modeling capabilities, Patran enables engineers to build comprehensive
              virtual prototypes for analysis. Its open architecture supports multiple FEA solvers including MSC
              Nastran, Marc, Abaqus, LS-DYNA, ANSYS, and more.
            </p>
            <p>
              From geometry import and cleanup to advanced meshing and comprehensive results post-processing, Patran
              streamlines the entire analysis workflow with an intuitive, powerful interface.
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
            Complete pre/post-processing for all your simulation needs
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            class="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
            <div
              class="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01">
                </path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">CAD Geometry Import</h3>
            <p class="text-gray-600">
              Direct CAD integration with major CAD systems including CATIA, Pro/Engineer, SolidWorks, and more.
            </p>
          </div>

          <div
            class="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
            <div
              class="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z">
                </path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Advanced Meshing</h3>
            <p class="text-gray-600">
              Comprehensive meshing tools for hex, tet, quad, and tri elements with automatic and semi-automatic
              capabilities.
            </p>
          </div>

          <div
            class="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
            <div
              class="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                </path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Results Visualization</h3>
            <p class="text-gray-600">
              Powerful post-processing with contour plots, vector plots, animations, XY plotting, and report generation.
            </p>
          </div>

          <div
            class="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
            <div
              class="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Multi-Solver Support</h3>
            <p class="text-gray-600">
              Native support for multiple FEA solvers with solver-specific model setup and results extraction.
            </p>
          </div>

          <div
            class="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
            <div
              class="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4">
                </path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Customization & Scripting</h3>
            <p class="text-gray-600">
              PCL (Patran Command Language) for automation and customization of modeling and post-processing tasks.
            </p>
          </div>

          <div
            class="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
            <div
              class="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                </path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Comprehensive Libraries</h3>
            <p class="text-gray-600">
              Extensive material, element, and load libraries for all analysis types and engineering disciplines.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-5xl mx-auto">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
            Why Choose MSC Patran?
          </h2>

          <div class="grid md:grid-cols-2 gap-6">
            <div
              class="flex gap-4 items-start bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <div class="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">Industry Standard</h3>
                <p class="text-gray-600 text-sm">
                  Most widely used pre/post-processor in aerospace, automotive, and defense industries.
                </p>
              </div>
            </div>

            <div
              class="flex gap-4 items-start bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
              <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z">
                  </path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">Seamless Integration</h3>
                <p class="text-gray-600 text-sm">
                  Perfect companion to MSC Nastran with native support for all analysis types and capabilities.
                </p>
              </div>
            </div>

            <div
              class="flex gap-4 items-start bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">Productivity Boost</h3>
                <p class="text-gray-600 text-sm">
                  Streamlined workflows and automation capabilities significantly reduce modeling time.
                </p>
              </div>
            </div>

            <div
              class="flex gap-4 items-start bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
              <div class="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5">
                  </path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">Flexibility</h3>
                <p class="text-gray-600 text-sm">
                  Open architecture supports multiple solvers, making it ideal for multi-solver environments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Product Resources Section -->
    <ProductResourcesSection :resources="pdfResources" />

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 text-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl md:text-5xl font-bold mb-6">
          Ready to Experience MSC Patran?
        </h2>
        <p class="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
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
            class="px-8 py-4 bg-white text-purple-900 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl inline-flex items-center justify-center gap-2">
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
import patranLogo from '@/assets/LOGO/Patran.jpg'

const showDemoModal = ref(false)
const showQuoteModal = ref(false)

// Get PDF resources for this product
import ProductResourcesSection from '@/components/ProductResourcesSection.vue'
import { getProductResources } from '@/config/productPdfResources.js'
const pdfResources = getProductResources('patran')



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
