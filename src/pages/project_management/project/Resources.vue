<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Resources</h1>
          <p class="text-gray-500 text-sm mt-1">Manage project resources and allocations</p>
        </div>
        <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-lg shadow-purple-200 flex items-center gap-2 mt-3 md:mt-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Allocate Resource
        </button>
      </div>

      <!-- Resource Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
          <p class="text-2xl font-bold text-gray-900">18</p>
          <p class="text-xs text-gray-400">Total Resources</p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
          <p class="text-2xl font-bold text-green-600">12</p>
          <p class="text-xs text-gray-400">Active</p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
          <p class="text-2xl font-bold text-orange-600">4</p>
          <p class="text-xs text-gray-400">Inactive</p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
          <p class="text-2xl font-bold text-blue-600">85%</p>
          <p class="text-xs text-gray-400">Allocation Rate</p>
        </div>
      </div>

      <!-- Resource Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="resource in resources" :key="resource.id" class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition">
          <div class="flex items-center gap-3">
            <img :src="resource.avatar" class="w-12 h-12 rounded-full border-2 border-purple-200" />
            <div>
              <h3 class="font-bold text-gray-900">{{ resource.name }}</h3>
              <p class="text-sm text-purple-600">{{ resource.role }}</p>
            </div>
          </div>
          <div class="mt-3 space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Allocation</span>
              <span class="font-semibold text-gray-900">{{ resource.allocation }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="h-2 rounded-full" :style="{ width: resource.allocation + '%', backgroundColor: resource.allocation > 75 ? '#10B981' : resource.allocation > 40 ? '#F59E0B' : '#7C3AED' }"></div>
            </div>
            <div class="flex justify-between text-xs text-gray-500">
              <span>{{ resource.project }}</span>
              <span>{{ resource.hours }} hrs/week</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const resources = ref([
  { id: 1, name: 'John Smith', role: 'Project Manager', allocation: 100, project: 'Aerospace Alpha', hours: 40, avatar: 'https://i.pravatar.cc/100?img=11' },
  { id: 2, name: 'Sarah Johnson', role: 'Senior Engineer', allocation: 80, project: 'Aerospace Alpha', hours: 32, avatar: 'https://i.pravatar.cc/100?img=12' },
  { id: 3, name: 'Mike Lee', role: 'Design Lead', allocation: 60, project: 'Defense System', hours: 24, avatar: 'https://i.pravatar.cc/100?img=13' },
  { id: 4, name: 'Emily Davis', role: 'Quality Engineer', allocation: 50, project: 'Medical Imaging', hours: 20, avatar: 'https://i.pravatar.cc/100?img=14' },
  { id: 5, name: 'David Wilson', role: 'Manufacturing Specialist', allocation: 40, project: 'Composite Research', hours: 16, avatar: 'https://i.pravatar.cc/100?img=15' },
  { id: 6, name: 'Lisa Chen', role: 'Composites Engineer', allocation: 70, project: 'Space Component', hours: 28, avatar: 'https://i.pravatar.cc/100?img=16' }
])
</script>