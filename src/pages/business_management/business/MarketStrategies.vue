<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Market Strategies</h1>
          <p class="text-gray-500 text-sm mt-1">Develop and track market entry strategies</p>
        </div>
        <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-lg shadow-purple-200 flex items-center gap-2 mt-3 md:mt-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Strategy
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="strategy in strategies" :key="strategy.id" class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition">
          <div class="flex items-start justify-between">
            <div>
              <h3 class="text-lg font-bold text-gray-900">{{ strategy.market }}</h3>
              <p class="text-sm text-gray-500">{{ strategy.strategy }}</p>
            </div>
            <span class="text-xs px-2 py-1 rounded-full" :class="strategy.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'">{{ strategy.status }}</span>
          </div>
          <div class="mt-3 flex items-center gap-2 text-xs text-gray-400">
            <span>📅 {{ strategy.lastUpdated }}</span>
            <span>👤 {{ strategy.owner }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const strategies = ref([
  { id: 1, market: 'North America', strategy: 'Expand distribution network, strengthen partnerships', status: 'Active', lastUpdated: '2026-10-15', owner: 'John Smith' },
  { id: 2, market: 'Europe', strategy: 'Establish EU subsidiary, localize offerings', status: 'Active', lastUpdated: '2026-10-12', owner: 'Sarah Johnson' },
  { id: 3, market: 'Asia-Pacific', strategy: 'Joint ventures with local manufacturers', status: 'Planning', lastUpdated: '2026-10-10', owner: 'Mike Lee' },
  { id: 4, market: 'Middle East', strategy: 'Government relations and defense contracts', status: 'Planning', lastUpdated: '2026-10-08', owner: 'Emily Davis' }
])
</script>