<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Ad Campaigns</h1>
          <p class="text-gray-500 text-sm mt-1">Manage paid advertising campaigns</p>
        </div>
        <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-lg shadow-purple-200 flex items-center gap-2 mt-3 md:mt-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Launch Campaign
        </button>
      </div>

      <!-- Ad Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
          <p class="text-2xl font-bold text-gray-900">$12,400</p>
          <p class="text-xs text-gray-400">Total Spend</p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
          <p class="text-2xl font-bold text-green-600">$48,200</p>
          <p class="text-xs text-gray-400">Revenue Generated</p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
          <p class="text-2xl font-bold text-purple-600">388%</p>
          <p class="text-xs text-gray-400">ROAS</p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
          <p class="text-2xl font-bold text-blue-600">2.4%</p>
          <p class="text-xs text-gray-400">Conversion Rate</p>
        </div>
      </div>

      <!-- Ad Table -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-100">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Platform</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Spend</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Impressions</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Clicks</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CTR</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="ad in adCampaigns" :key="ad.id" class="hover:bg-gray-50 transition">
                <td class="px-6 py-4"><p class="text-sm font-medium text-gray-900">{{ ad.name }}</p></td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ ad.platform }}</span></td>
                <td class="px-6 py-4"><span class="text-sm font-semibold text-gray-900">${{ ad.spend }}</span></td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ ad.impressions }}</span></td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ ad.clicks }}</span></td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ ad.ctr }}%</span></td>
                <td class="px-6 py-4">
                  <span class="text-xs px-2 py-1 rounded-full" :class="ad.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'">{{ ad.status }}</span>
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

const adCampaigns = ref([
  { id: 1, name: 'LinkedIn - Aerospace Professionals', platform: 'LinkedIn', spend: 3200, impressions: '45,200', clicks: 680, ctr: 1.5, status: 'Active' },
  { id: 2, name: 'Google - Composites Manufacturing', platform: 'Google', spend: 2800, impressions: '82,400', clicks: 1240, ctr: 1.5, status: 'Active' },
  { id: 3, name: 'LinkedIn - Defense Industry', platform: 'LinkedIn', spend: 1800, impressions: '28,600', clicks: 420, ctr: 1.47, status: 'Active' },
  { id: 4, name: 'Facebook - Medical Imaging', platform: 'Meta', spend: 2200, impressions: '95,000', clicks: 1560, ctr: 1.64, status: 'Active' },
  { id: 5, name: 'Google - Space Components', platform: 'Google', spend: 2400, impressions: '68,200', clicks: 890, ctr: 1.3, status: 'Paused' }
])
</script>