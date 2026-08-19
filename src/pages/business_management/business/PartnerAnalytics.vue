<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Partner Analytics</h1>
          <p class="text-gray-500 text-sm mt-1">Insights and metrics on partner performance</p>
        </div>
        <div class="flex gap-2 mt-3 md:mt-0">
          <button class="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold transition border border-gray-200 shadow-sm">
            <i class="fa-solid fa-calendar"></i> Last 30 Days
          </button>
          <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-lg shadow-purple-200">
            <i class="fa-solid fa-download"></i> Export
          </button>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <p class="text-gray-500 text-sm font-medium">Total Partners</p>
          <p class="text-3xl font-bold text-gray-900">12</p>
          <span class="text-green-600 text-xs">↑ 3 this month</span>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <p class="text-gray-500 text-sm font-medium">Active Partners</p>
          <p class="text-3xl font-bold text-green-600">9</p>
          <span class="text-green-600 text-xs">75% active rate</span>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <p class="text-gray-500 text-sm font-medium">Referrals Generated</p>
          <p class="text-3xl font-bold text-blue-600">24</p>
          <span class="text-green-600 text-xs">↑ 12% vs last month</span>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <p class="text-gray-500 text-sm font-medium">Deal Value</p>
          <p class="text-3xl font-bold text-purple-600">$4.8M</p>
          <span class="text-green-600 text-xs">↑ 8% vs last month</span>
        </div>
      </div>

      <!-- Charts -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Partner Distribution -->
        <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 class="text-gray-900 font-semibold mb-4">Partner Type Distribution</h3>
          <div class="space-y-3">
            <div v-for="item in partnerDistribution" :key="item.name" class="flex items-center gap-3">
              <span class="text-gray-600 text-xs w-24">{{ item.name }}</span>
              <div class="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                <div class="h-full rounded-full flex items-center justify-end px-2" :style="{ width: item.percentage + '%', backgroundColor: item.color }">
                  <span class="text-white text-[10px] font-bold">{{ item.count }}</span>
                </div>
              </div>
              <span class="text-gray-700 text-xs font-semibold w-16 text-right">{{ item.percentage }}%</span>
            </div>
          </div>
        </div>

        <!-- Partner Performance -->
        <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 class="text-gray-900 font-semibold mb-4">Top Performing Partners</h3>
          <div class="space-y-3">
            <div v-for="partner in topPartners" :key="partner.name" class="flex items-center justify-between p-2 border-b border-gray-100">
              <div>
                <p class="text-sm font-medium text-gray-900">{{ partner.name }}</p>
                <p class="text-xs text-gray-500">{{ partner.type }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-semibold text-purple-600">{{ partner.deals }} deals</p>
                <p class="text-xs text-gray-400">${{ partner.value }}M value</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const partnerDistribution = ref([
  { name: 'Strategic', count: 4, percentage: 33, color: '#7C3AED' },
  { name: 'Technology', count: 3, percentage: 25, color: '#3B82F6' },
  { name: 'Distribution', count: 3, percentage: 25, color: '#10B981' },
  { name: 'Channel', count: 2, percentage: 17, color: '#F59E0B' }
])

const topPartners = ref([
  { name: 'Boeing Aerospace', type: 'Strategic', deals: 8, value: 4.2 },
  { name: 'Lockheed Martin', type: 'Strategic', deals: 5, value: 3.1 },
  { name: 'Composite Technologies', type: 'Technology', deals: 4, value: 2.4 }
])
</script>