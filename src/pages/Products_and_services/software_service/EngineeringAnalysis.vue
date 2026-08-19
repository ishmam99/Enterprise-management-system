<template>
  <div class="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
    <!-- Header -->
    <div class="bg-gradient-to-r from-emerald-900 via-green-900 to-teal-900 p-8 md:p-10">
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
        </div>
        <div>
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-2">
            Engineering Analysis
          </h2>
          <p class="text-emerald-200">Advanced simulation and analysis services</p>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-8 md:p-10">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-1 h-8 bg-gradient-to-b from-emerald-600 to-green-600 rounded-full"></div>
          <p class="text-lg text-gray-700 leading-relaxed">
            We provide comprehensive software and technical support for advanced engineering analysis across multiple domains.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="(service, index) in services" 
          :key="index"
          class="group flex items-center p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl hover:from-emerald-100 hover:to-green-100 transition-all duration-300 hover:shadow-lg border border-emerald-100 hover:border-emerald-300"
        >
          <div class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="service.icon"></path>
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-sm font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
              {{ service }}
            </h3>
          </div>
        </div>
      </div>

      <!-- Analysis Categories -->
      <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900">Structural Analysis</h3>
          </div>
          <p class="text-gray-700 text-sm mb-3">Comprehensive structural analysis including linear, non-linear, and super element analysis.</p>
          <ul class="space-y-1 text-xs text-gray-600">
            <li>• FEA Linear Analysis</li>
            <li>• FEA Non-Linear Analysis</li>
            <li>• FEA Super Element Analysis</li>
            <li>• Stress Analysis</li>
            <li>• Buckling Analysis</li>
          </ul>
        </div>

        <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V1a1 1 0 011-1h2a1 1 0 011 1v3m0 0h8"></path>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900">Dynamic Analysis</h3>
          </div>
          <p class="text-gray-700 text-sm mb-3">Advanced dynamic analysis for vibration, shock, and transient analysis.</p>
          <ul class="space-y-1 text-xs text-gray-600">
            <li>• Vibration Analysis</li>
            <li>• Shock Analysis</li>
            <li>• Transient Analysis</li>
            <li>• Seismic Analysis</li>
            <li>• Crash Analysis</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const services = [
  'FEA - Linear Analysis',
  'Stress Analysis',
  'FEA - Super Element Analysis',
  'Vibration - Seismic Analysis',
  'Buckling Analysis',
  'Thermal Analysis',
  'Design Optimization',
  'CFD Analysis',
  'Non-Linear Dynamic Analysis',
  'Electronic Packaging Analysis',
  'Finite Element Modeling Analysis',
  'FEA - Non-Linear Analysis',
  'Fatigue Analysis',
  'Linear Analysis',
  'Vibration - Shock Analysis',
  'Vibration - Transient Analysis',
  'Crash Analysis',
  'System Performance Analysis',
  'Dynamic Analysis',
  'DFM Analysis',
  'Fracture Analysis',
  'Pressure Vessel'
]

const analysisCategories = [
  {
    name: 'Structural Analysis',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    services: ['FEA Linear Analysis', 'FEA Non-Linear Analysis', 'Stress Analysis', 'Buckling Analysis']
  },
  {
    name: 'Dynamic Analysis',
    icon: 'M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V1a1 1 0 011-1h2a1 1 0 011 1v3m0 0h8',
    services: ['Vibration Analysis', 'Shock Analysis', 'Transient Analysis', 'Crash Analysis']
  }
]
</script>
