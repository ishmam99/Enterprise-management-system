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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                <span class="text-blue-300 font-semibold">Unified Simulation Platform</span>
              </div>
              
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                MSC One
              </h1>
              
              <p class="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                All-inclusive simulation licensing platform with flexible token-based access
              </p>

              <div class="flex flex-wrap gap-3 mb-8">
                <span class="px-4 py-2 bg-blue-500/30 backdrop-blur-sm rounded-lg text-sm font-semibold border border-blue-400/30">Unified Platform</span>
                <span class="px-4 py-2 bg-purple-500/30 backdrop-blur-sm rounded-lg text-sm font-semibold border border-purple-400/30">Flexible Licensing</span>
                <span class="px-4 py-2 bg-cyan-500/30 backdrop-blur-sm rounded-lg text-sm font-semibold border border-cyan-400/30">Multi-Discipline</span>
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
                <div class="bg-white/20 rounded-xl p-8 mb-6 flex items-center justify-center">
                  <svg class="w-32 h-32 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div class="text-3xl font-bold mb-1">All</div>
                    <div class="text-blue-200 text-sm">MSC Products</div>
                  </div>
                  <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div class="text-3xl font-bold mb-1">One</div>
                    <div class="text-blue-200 text-sm">Token System</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Key Highlights Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-4xl font-bold text-gray-900 mb-8 text-center">Key Highlights</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="flex gap-4 items-start bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
              <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 class="font-bold text-gray-900 mb-2">Unified access to MSC's complete simulation portfolio</h3>
                <p class="text-gray-600 text-sm">Access all MSC tools through one platform</p>
              </div>
            </div>

            <div class="flex gap-4 items-start bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
              <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 class="font-bold text-gray-900 mb-2">Flexible licensing for multiple CAE disciplines</h3>
                <p class="text-gray-600 text-sm">Token-based system for maximum flexibility</p>
              </div>
            </div>

            <div class="flex gap-4 items-start bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
              <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 class="font-bold text-gray-900 mb-2">Supports structural, motion, fluids, acoustics, and manufacturing</h3>
                <p class="text-gray-600 text-sm">Complete multi-physics capabilities</p>
              </div>
            </div>

            <div class="flex gap-4 items-start bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
              <div class="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 class="font-bold text-gray-900 mb-2">Scales from single users to enterprise teams</h3>
                <p class="text-gray-600 text-sm">Suitable for organizations of all sizes</p>
              </div>
            </div>

            <div class="flex gap-4 items-start bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200">
              <div class="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 class="font-bold text-gray-900 mb-2">Optimized for collaboration and workflow efficiency</h3>
                <p class="text-gray-600 text-sm">Seamless team collaboration and standardized workflows</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Detailed Description Section -->
    <section class="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-4xl font-bold text-gray-900 mb-6">
            Detailed Description
          </h2>
          <div class="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p class="text-xl leading-relaxed">
              <span class="font-bold text-blue-600">MSC One</span> is an all-inclusive simulation licensing platform that provides seamless access to a broad range of MSC's industry-leading engineering software through a single, flexible token-based system. Instead of managing multiple standalone licenses, organizations can use MSC One to run different simulation tools as needed, improving accessibility and operational efficiency.
            </p>
            <p>
              The platform supports a wide spectrum of engineering disciplines, including structural analysis, multibody dynamics, nonlinear simulation, acoustics, computational fluid dynamics, fatigue, manufacturing process simulation, and system-level co-simulation. This makes MSC One ideal for organizations working on complex, multi-physics engineering problems that require collaboration across teams and domains.
            </p>
            <p>
              MSC One enables engineers to move fluidly between different simulation tools without licensing constraints, allowing them to focus on solving engineering challenges rather than managing software access. Its scalability makes it suitable for small engineering teams as well as large enterprises with global simulation needs.
            </p>
            <p>
              By adopting MSC One, organizations can reduce software ownership costs, improve resource utilization, and accelerate product development cycles. It also supports standardized workflows, better collaboration, and faster decision-making across the entire product lifecycle.
            </p>
            <p>
              MSC One is the preferred choice for companies seeking flexibility, efficiency, and maximum value from their simulation investment.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-5xl mx-auto">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
            Why Choose MSC One?
          </h2>

          <div class="space-y-6">
            <div class="flex gap-6 items-start bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Cost Efficiency</h3>
                <p class="text-gray-600">
                  Reduce software ownership costs by sharing licenses across teams. Pay only for what you need when you need it, maximizing ROI on simulation investments.
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
                <h3 class="text-xl font-bold text-gray-900 mb-2">Workflow Flexibility</h3>
                <p class="text-gray-600">
                  Switch seamlessly between different simulation tools without worrying about license availability. Engineers can use the right tool for each task without delays.
                </p>
              </div>
            </div>

            <div class="flex gap-6 items-start bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Enhanced Collaboration</h3>
                <p class="text-gray-600">
                  Enable better teamwork with standardized workflows and shared access to simulation tools across departments and locations.
                </p>
              </div>
            </div>

            <div class="flex gap-6 items-start bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
              <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Scalable Solution</h3>
                <p class="text-gray-600">
                  Grows with your organization from individual workstations to enterprise-wide deployments. Easily add more tokens as your needs evolve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Applications Section -->
    <section class="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Included Simulation Capabilities
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Access the complete MSC simulation portfolio
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200 hover:border-blue-400 transition-all">
            <h4 class="font-bold text-gray-900 mb-2">Structural Analysis</h4>
            <p class="text-gray-600 text-sm">MSC Nastran, Patran, Marc</p>
          </div>
          <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 hover:border-purple-400 transition-all">
            <h4 class="font-bold text-gray-900 mb-2">Multibody Dynamics</h4>
            <p class="text-gray-600 text-sm">Adams, MSC Easy5</p>
          </div>
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 hover:border-green-400 transition-all">
            <h4 class="font-bold text-gray-900 mb-2">Acoustics & Vibration</h4>
            <p class="text-gray-600 text-sm">Actran</p>
          </div>
          <div class="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200 hover:border-orange-400 transition-all">
            <h4 class="font-bold text-gray-900 mb-2">Impact & Crash</h4>
            <p class="text-gray-600 text-sm">Dytran</p>
          </div>
          <div class="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200 hover:border-cyan-400 transition-all">
            <h4 class="font-bold text-gray-900 mb-2">Manufacturing</h4>
            <p class="text-gray-600 text-sm">Simufact, FTI FormingSuite</p>
          </div>
          <div class="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200 hover:border-indigo-400 transition-all">
            <h4 class="font-bold text-gray-900 mb-2">CFD & Thermal</h4>
            <p class="text-gray-600 text-sm">MSC Cradle CFD</p>
          </div>
          <div class="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border-2 border-pink-200 hover:border-pink-400 transition-all">
            <h4 class="font-bold text-gray-900 mb-2">Fatigue & Durability</h4>
            <p class="text-gray-600 text-sm">CAEfatigue</p>
          </div>
          <div class="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border-2 border-yellow-200 hover:border-yellow-400 transition-all">
            <h4 class="font-bold text-gray-900 mb-2">Drivetrain Analysis</h4>
            <p class="text-gray-600 text-sm">Romax</p>
          </div>
          <div class="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border-2 border-teal-200 hover:border-teal-400 transition-all">
            <h4 class="font-bold text-gray-900 mb-2">CAE Environment</h4>
            <p class="text-gray-600 text-sm">MSC Apex</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Product Resources Section -->
    <ProductResourcesSection :resources="pdfResources" />

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl md:text-5xl font-bold mb-6">
          Ready to Experience MSC One?
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


const showDemoModal = ref(false)
const showQuoteModal = ref(false)

// Get PDF resources for this product
import ProductResourcesSection from '@/components/ProductResourcesSection.vue'
import { getProductResources } from '@/config/productPdfResources.js'
const pdfResources = getProductResources('msc-one')


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
