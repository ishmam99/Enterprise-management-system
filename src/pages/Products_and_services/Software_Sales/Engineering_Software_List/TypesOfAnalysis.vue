<template>
  <div class="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
    <!-- Header -->
    <div class="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-800 p-8 md:p-10">
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
          </svg>
        </div>
        <div>
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-2">
            Analysis Types & MSC Solutions
          </h2>
          <p class="text-purple-200">Complete mapping of analysis types to software products</p>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-8 md:p-10">
      <div class="space-y-8">
        <!-- Category Section -->
        <div v-for="(category, index) in services" :key="index" class="mb-8">
          <!-- Category Header -->
          <div class="flex items-center mb-6 p-5 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border-l-4 border-orange-500 shadow-md hover:shadow-lg transition-all">
            <div class="w-4 h-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mr-4 flex-shrink-0"></div>
            <h3 class="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {{ category.category }}
            </h3>
          </div>

          <!-- Items Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pl-6">
            <div v-for="(item, itemIndex) in category.items" :key="itemIndex"
                 class="group flex items-center p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl hover:from-purple-100 hover:to-indigo-100 transition-all duration-300 border border-purple-200 hover:border-purple-400 hover:shadow-lg hover:-translate-y-1">
              <div class="w-3 h-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full mr-3 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
              <span class="text-gray-800 font-medium group-hover:text-purple-700 transition-colors">{{ item }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Analysis Categories Count -->
      <div class="mt-10 text-center">
        <div class="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
          </svg>
          <span class="font-bold">{{ services.length }} Analysis Categories Covered</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const services = [
  {
    category: "Simulation Modeling & Result Viewing",
    items: ["MSC CoSim", "MSC Apex Generative Design", "MSC Apex", "Patran", "ScPOST"]
  },
  {
    category: "Integrated Computational Materials Engineering (ICME)",
    items: ["Digimat", "MaterialCenter"]
  },
  {
    category: "Structures",
    items: ["MSC Apex", "Patran", "Marc", "Dytran", "CAEfatigue"]
  },
  {
    category: "System Dynamics",
    items: ["Adams", "Easy5"]
  },
  {
    category: "Thermal",
    items: ["PICLS", "ScSTREAM", "ScHeatDesigner", "ScPOST", "MSC Nastran", "Marc"]
  },
  {
    category: "Fluids",
    items: ["ScFLOW", "ScSTREAM", "ScHeatDesigner", "ScPOST"]
  },
  {
    category: "Acoustics",
    items: ["Actran", "MSC Nastran"]
  },
  {
    category: "Virtual Manufacturing",
    items: ["FormingSuite", "Simufact Welding", "Simufact Joining", "Simufact Forming", "Simufact Additive"]
  },
  {
    category: "Engineering Lifecycle Management",
    items: ["MaterialCenter", "SimManager"]
  }
]
</script>
