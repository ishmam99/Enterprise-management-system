<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Competitive Analysis</h1>
          <p class="text-gray-500 text-sm mt-1">SWOT analysis and competitive landscape</p>
        </div>
        <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-lg shadow-purple-200 flex items-center gap-2 mt-3 md:mt-0">
          <i class="fa-solid fa-download"></i> Export Analysis
        </button>
      </div>

      <!-- SWOT Matrix -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2"><span class="text-green-600">💪</span> Strengths</h3>
          <ul class="space-y-2">
            <li v-for="item in swot.strengths" :key="item" class="flex items-start gap-2 text-sm text-gray-600">
              <span class="text-green-500">•</span> {{ item }}
            </li>
          </ul>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2"><span class="text-red-600">⚠️</span> Weaknesses</h3>
          <ul class="space-y-2">
            <li v-for="item in swot.weaknesses" :key="item" class="flex items-start gap-2 text-sm text-gray-600">
              <span class="text-red-500">•</span> {{ item }}
            </li>
          </ul>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2"><span class="text-blue-600">🚀</span> Opportunities</h3>
          <ul class="space-y-2">
            <li v-for="item in swot.opportunities" :key="item" class="flex items-start gap-2 text-sm text-gray-600">
              <span class="text-blue-500">•</span> {{ item }}
            </li>
          </ul>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2"><span class="text-orange-600">🔥</span> Threats</h3>
          <ul class="space-y-2">
            <li v-for="item in swot.threats" :key="item" class="flex items-start gap-2 text-sm text-gray-600">
              <span class="text-orange-500">•</span> {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Competitor Comparison -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-gray-100">
          <h3 class="text-lg font-bold text-gray-900">Competitor Comparison Matrix</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Criteria</th>
                <th v-for="comp in comparison" :key="comp.name" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ comp.name }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="row in comparisonRows" :key="row.criteria" class="hover:bg-gray-50">
                <td class="px-6 py-3 text-sm font-medium text-gray-700">{{ row.criteria }}</td>
                <td v-for="comp in comparison" :key="comp.name" class="px-6 py-3 text-sm text-gray-600">
                  <span v-for="(value, idx) in row.values" :key="idx" v-if="comp.name === comparison[idx]?.name">
                    {{ value }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const swot = ref({
  strengths: [
    'Strong engineering and R&D capabilities',
    'Vertically integrated manufacturing',
    'AS9100 and NADCAP certifications',
    'Established relationships with prime contractors'
  ],
  weaknesses: [
    'Limited global presence outside US',
    'Higher production costs vs. offshore competitors',
    'Smaller capacity than major competitors'
  ],
  opportunities: [
    'Growing demand for composite materials in aerospace',
    'Expansion into new geographic markets',
    'Emerging space exploration sector'
  ],
  threats: [
    'Increasing raw material costs',
    'New competitors entering the market',
    'Supply chain disruptions'
  ]
})

const comparison = ref([
  { name: 'Vermont Composites' },
  { name: 'Hexcel' },
  { name: 'Spirit AeroSystems' },
  { name: 'Toray' }
])

const comparisonRows = ref([
  { criteria: 'Manufacturing Capacity', values: ['100K sq ft', '1M+ sq ft', '2M+ sq ft', '500K sq ft'] },
  { criteria: 'Global Presence', values: ['US Only', 'Global', 'Global', 'Global'] },
  { criteria: 'Certifications', values: ['AS9100, NADCAP', 'AS9100, NADCAP', 'AS9100', 'AS9100'] },
  { criteria: 'Material Innovation', values: ['High', 'High', 'Medium', 'High'] },
  { criteria: 'Lead Times', values: ['Fast', 'Medium', 'Slow', 'Medium'] }
])
</script>