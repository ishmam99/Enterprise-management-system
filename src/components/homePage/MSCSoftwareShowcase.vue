<template>
  <section class="py-20 bg-gradient-to-b from-gray-50 to-white">
    <div class="container mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <span class="text-blue-600 font-semibold text-sm uppercase tracking-wider">MSC Software Suite</span>
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
          Complete MSC Software Solutions
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          As a certified reseller, we offer the complete range of MSC Software products for simulation, analysis, and
          engineering excellence
        </p>
      </div>

      <!-- Main Software Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        <!-- MSCOne -->
        <div
          class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-slate-400 lg:col-span-1">
          <div
            class="relative h-48 bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0 opacity-10">
              <div class="absolute inset-0 bg-grid-pattern"></div>
            </div>
            <img :src="mscOneLogo" alt="MSCOne" class="relative z-10 h-24 w-auto object-contain" />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">MSCOne</h3>
            <p class="text-gray-600 text-sm mb-4">
              Design everything. Simulate anything. Complete CAE suite with token-based flexible access
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">Unified Platform</span>
              <span class="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">Subscription</span>
            </div>
            <a href="/Products_and_services/Software_Sales/products/msc-one"
              class="text-slate-600 font-semibold text-sm hover:text-slate-800 transition inline-flex items-center gap-1">
              Learn More
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
        <!-- MSC Nastran -->
        <div
          class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-400">
          <div
            class="relative h-48 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0 opacity-10">
              <div class="absolute inset-0 bg-grid-pattern"></div>
            </div>
            <img :src="mscNastranLogo" alt="MSC Nastran" class="relative z-10 h-24 w-auto object-contain filter" />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">MSC Nastran</h3>
            <p class="text-gray-600 text-sm mb-4">
              Industry-leading finite element analysis (FEA) solver for structural analysis
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Structural Analysis</span>
              <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">FEA</span>
            </div>
            <a href="/Products_and_services/Software_Sales/products/msc-nastran"
              class="text-blue-600 font-semibold text-sm hover:text-blue-800 transition inline-flex items-center gap-1">
              Learn More
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>

        <!-- Patran -->
        <div
          class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-green-400">
          <div
            class="relative h-48 bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0 opacity-10">
              <div class="absolute inset-0 bg-grid-pattern"></div>
            </div>
            <img :src="patranLogo" alt="Patran" class="relative z-10 h-24 w-auto object-contain" />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">Patran</h3>
            <p class="text-gray-600 text-sm mb-4">
              Pre and post-processing environment for FEA analysis and result visualization
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Pre-Processing</span>
              <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Visualization</span>
            </div>
            <a href="/Products_and_services/Software_Sales/products/patran"
              class="text-green-600 font-semibold text-sm hover:text-green-800 transition inline-flex items-center gap-1">
              Learn More
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>

        <!-- Marc -->
        <div
          class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-purple-400">
          <div
            class="relative h-48 bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0 opacity-10">
              <div class="absolute inset-0 bg-grid-pattern"></div>
            </div>
            <img :src="marcLogo" alt="Marc" class="relative z-10 h-24 w-auto object-contain filter" />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">Marc</h3>
            <p class="text-gray-600 text-sm mb-4">
              Advanced nonlinear simulation solution for complex engineering problems
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Nonlinear</span>
              <span class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Simulation</span>
            </div>
            <a href="/Products_and_services/Software_Sales/products/marc"
              class="text-purple-600 font-semibold text-sm hover:text-purple-800 transition inline-flex items-center gap-1">
              Learn More
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>

        <!-- Dytran -->
        <div
          class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-red-400">
          <div
            class="relative h-48 bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0 opacity-10">
              <div class="absolute inset-0 bg-grid-pattern"></div>
            </div>
            <img :src="dytranLogo" alt="Dytran"
              class="relative z-10 h-24 w-auto object-contain filter brightness-0 invert" />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">Dytran</h3>
            <p class="text-gray-600 text-sm mb-4">
              Explicit dynamics solver for impact, crash, and short-duration events
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Crash Analysis</span>
              <span class="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Impact</span>
            </div>
            <a href="/Products_and_services/Software_Sales/products/dytran"
              class="text-red-600 font-semibold text-sm hover:text-red-800 transition inline-flex items-center gap-1">
              Learn More
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>

        <!-- MSC Apex -->
        <div
          class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-orange-400">
          <div
            class="relative h-48 bg-gradient-to-br from-orange-600 to-orange-800 flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0 opacity-10">
              <div class="absolute inset-0 bg-grid-pattern"></div>
            </div>
            <img :src="mscApexLogo" alt="MSC Apex" class="relative z-10 h-24 w-auto object-contain filter " />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">MSC Apex</h3>
            <p class="text-gray-600 text-sm mb-4">
              Next-generation CAE platform with advanced meshing and modeling capabilities
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">CAE Platform</span>
              <span class="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Meshing</span>
            </div>
            <a href="/Products_and_services/Software_Sales/products/apex"
              class="text-orange-600 font-semibold text-sm hover:text-orange-800 transition inline-flex items-center gap-1">
              Learn More
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>

        <!-- Actran -->
        <div
          class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-cyan-400">
          <div
            class="relative h-48 bg-gradient-to-br from-cyan-600 to-cyan-800 flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0 opacity-10">
              <div class="absolute inset-0 bg-grid-pattern"></div>
            </div>
            <img :src="actranLogo" alt="Actran"
              class="relative z-10 h-24 w-auto object-contain filter brightness-0 invert" />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">Actran</h3>
            <p class="text-gray-600 text-sm mb-4">
              Advanced acoustic simulation software for noise and vibration analysis
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full">Acoustics</span>
              <span class="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full">Vibration</span>
            </div>
            <a href="/Products_and_services/Software_Sales/products/actran"
              class="text-cyan-600 font-semibold text-sm hover:text-cyan-800 transition inline-flex items-center gap-1">
              Learn More
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>

        <!-- MSC CoSim -->
        <div
          class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-indigo-400">
          <div
            class="relative h-48 bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0 opacity-10">
              <div class="absolute inset-0 bg-grid-pattern"></div>
            </div>
            <img :src="mscCoSimLogo" alt="MSC CoSim" class="relative z-10 h-24 w-auto object-contain" />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">MSC CoSim</h3>
            <p class="text-gray-600 text-sm mb-4">
              Co-simulation engine for multi-physics and multi-domain analysis
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">Co-Simulation</span>
              <span class="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">Multi-Physics</span>
            </div>
            <a href="/Products_and_services/Software_Sales/products/msc-cosim"
              class="text-indigo-600 font-semibold text-sm hover:text-indigo-800 transition inline-flex items-center gap-1">
              Learn More
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>

        <!-- CAEfatigue -->
        <div
          class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-pink-400">
          <div
            class="relative h-48 bg-gradient-to-br from-pink-600 to-pink-800 flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0 opacity-10">
              <div class="absolute inset-0 bg-grid-pattern"></div>
            </div>
            <img :src="caeFatigueLogo" alt="CAEfatigue" class="relative z-10 h-24 w-auto object-contain" />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">CAEfatigue</h3>
            <p class="text-gray-600 text-sm mb-4">
              Fatigue life prediction and durability analysis software
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">Fatigue Analysis</span>
              <span class="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">Durability</span>
            </div>
            <a href="/Products_and_services/Software_Sales/products/caefatigue"
              class="text-pink-600 font-semibold text-sm hover:text-pink-800 transition inline-flex items-center gap-1">
              Learn More
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-center text-white">
        <h3 class="text-3xl md:text-4xl font-bold mb-4">
          Get Started with MSC Software Today
        </h3>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Purchase any MSC Software license and receive FREE 24/7 technical support and training
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/contact_us"
            class="px-8 py-4 bg-white text-blue-900 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
            Request a Quote
          </a>
          <a href="/Products_and_services/Software_Sales/Engineering_Software_List"
            class="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-300 hover:scale-105">
            View Full Catalog
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Import MSC Software logos
import mscNastranLogo from '@/assets/LOGO/MSCNastran.png'
import patranLogo from '@/assets/LOGO/Patran.jpg'
import marcLogo from '@/assets/LOGO/Marc.png'
import dytranLogo from '@/assets/LOGO/Dytran.png'
import mscApexLogo from '@/assets/LOGO/MSC Apex.png'
import actranLogo from '@/assets/LOGO/Actran.png'
import mscCoSimLogo from '@/assets/LOGO/MSC CoSim.jpg'
import caeFatigueLogo from '@/assets/LOGO/CAEfatigue.jpg'
import mscOneLogo from '@/assets/LOGO/MSCOne.jpg'
</script>

<style scoped>
.bg-grid-pattern {
  background-image:
    linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent),
    linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent);
  background-size: 50px 50px;
}
</style>
