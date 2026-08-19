<template>
  <div class="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
    <!-- Header -->
    <div class="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 p-8 md:p-10">
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
          </svg>
        </div>
        <div>
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-2">
            Engineering Design
          </h2>
          <p class="text-purple-200">Comprehensive design and development services</p>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-8 md:p-10">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-1 h-8 bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full"></div>
          <p class="text-lg text-gray-700 leading-relaxed">
            We provide comprehensive software and technical support for engineering design across various domains and industries.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="(service, index) in services" 
          :key="index"
          class="group flex items-center p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl hover:from-purple-100 hover:to-indigo-100 transition-all duration-300 hover:shadow-lg border border-purple-100 hover:border-purple-300"
        >
          <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="service.icon"></path>
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-sm font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
              {{ service }}
            </h3>
          </div>
        </div>
      </div>

      <!-- Design Categories -->
      <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900">Product Design</h3>
          </div>
          <p class="text-gray-700 text-sm mb-3">Complete product design services from concept to production-ready designs.</p>
          <ul class="space-y-1 text-xs text-gray-600">
            <li>• Product Design</li>
            <li>• Component Design</li>
            <li>• 3D Modeling</li>
            <li>• Assembly Design</li>
            <li>• Detail Design</li>
          </ul>
        </div>

        <div class="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-200">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900">System Design</h3>
          </div>
          <p class="text-gray-700 text-sm mb-3">Advanced system design including electrical, hydraulic, and fluid delivery systems.</p>
          <ul class="space-y-1 text-xs text-gray-600">
            <li>• General System Design</li>
            <li>• Electrical System Design</li>
            <li>• Hydraulic System Design</li>
            <li>• Fluid Delivery System Design</li>
            <li>• PCB Electronic Design</li>
          </ul>
        </div>
      </div>

      <!-- Additional Services -->
      <div class="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Specialized Design Services</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 class="font-semibold text-gray-800 mb-2">Design & Development</h4>
                <ul class="space-y-1 text-sm text-gray-600">
                  <li>• General R&D</li>
                  <li>• Design Optimization</li>
                  <li>• Design Modification</li>
                  <li>• Design Consulting</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800 mb-2">Technical Services</h4>
                <ul class="space-y-1 text-sm text-gray-600">
                  <li>• Drafting</li>
                  <li>• Layout Design</li>
                  <li>• Process Planning</li>
                  <li>• Tool Design</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const services = [
  'Product Design',
  'Component Design',
  'Drafting',
  'General System Design',
  'Layout Design',
  'Assembly Design',
  'Detail Design',
  'Design Conversion',
  'Industrial Process Design',
  '3D Modeling',
  'Process planning',
  'Tool Design',
  'Fluid Delivery System Design',
  'Electrical System Design',
  'PCB Electronic Design',
  'Hydraulic System Design',
  'General R&D',
  'Design Optimization',
  'Design Modification',
  'Design Consulting',
  'General Mechanical Engineering Design'
]

const designCategories = [
  {
    name: 'Product Design',
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    services: ['Product Design', 'Component Design', '3D Modeling', 'Assembly Design', 'Detail Design']
  },
  {
    name: 'System Design',
    icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
    services: ['General System Design', 'Electrical System Design', 'Hydraulic System Design', 'Fluid Delivery System Design', 'PCB Electronic Design']
  }
]
</script>
