<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Assets</h1>
          <p class="text-gray-500 text-sm mt-1">Manage marketing assets and resources</p>
        </div>
        <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-lg shadow-purple-200 flex items-center gap-2 mt-3 md:mt-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Upload Asset
        </button>
      </div>

      <!-- Asset Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="asset in assets" :key="asset.id" class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition text-center">
          <div class="text-4xl mb-2">{{ asset.icon }}</div>
          <p class="text-sm font-medium text-gray-900">{{ asset.name }}</p>
          <p class="text-xs text-gray-400">{{ asset.type }} • {{ asset.size }}</p>
          <button class="mt-3 w-full bg-purple-50 text-purple-600 py-1.5 rounded-lg text-xs font-medium hover:bg-purple-100 transition">Download</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const assets = ref([
  { id: 1, name: 'Company Logo Package', type: 'ZIP', size: '4.2 MB', icon: '📦' },
  { id: 2, name: 'Q4 Product Brochure', type: 'PDF', size: '2.8 MB', icon: '📄' },
  { id: 3, name: 'Aerospace Infographic', type: 'PNG', size: '1.5 MB', icon: '🖼️' },
  { id: 4, name: 'Sales Presentation Deck', type: 'PPTX', size: '8.3 MB', icon: '📊' },
  { id: 5, name: 'Case Study - Boeing', type: 'PDF', size: '3.1 MB', icon: '📄' },
  { id: 6, name: 'Video - Facility Tour', type: 'MP4', size: '45 MB', icon: '🎥' },
  { id: 7, name: 'Brand Style Guide', type: 'PDF', size: '5.6 MB', icon: '📘' },
  { id: 8, name: 'Social Media Templates', type: 'ZIP', size: '6.7 MB', icon: '🎨' }
])
</script>