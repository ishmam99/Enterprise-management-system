<template>
  <div class="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
    <!-- Header -->
    <div class="bg-gradient-to-r from-green-900 via-emerald-900 to-green-800 p-8 md:p-10">
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
          </svg>
        </div>
        <div>
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-2">
            Design & Engineering Solutions
          </h2>
          <p class="text-green-200">Advanced simulation capabilities for every engineering challenge</p>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-8 md:p-10">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-1 h-8 bg-gradient-to-b from-green-600 to-emerald-600 rounded-full"></div>
          <p class="text-lg text-gray-700 leading-relaxed">
            Comprehensive engineering analysis software solutions with <span class="font-bold text-green-600">expert support</span> for all your simulation needs.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="(service, index) in services" :key="index"
             class="group flex items-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-300 border border-green-200 hover:border-green-400 hover:shadow-lg hover:-translate-y-1">
          <div class="w-3 h-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mr-4 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
          <span class="text-gray-800 text-lg font-medium group-hover:text-green-700 transition-colors">{{ service }}</span>
        </div>
      </div>

      <!-- Solutions Count Badge -->
      <div class="mt-8 text-center">
        <div class="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full shadow-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
          </svg>
          <span class="font-bold">{{ services.length }} Engineering Solutions</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const services = [
  "Structures & Durability",
  "System & Multibody Dynamics",
  "Thermal & Fluid Dynamics",
  "Acoustics",
  "Computational Materials",
  "Simulation Process Management",
  "Design Optimization",
  "Noise & Vibration",
  "Systems & Controls",
  "Co-Simulation",
  "Virtual Manufacturing"
]
</script>
