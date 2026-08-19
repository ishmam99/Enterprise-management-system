<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Referral Analytics</h1>
          <p class="text-gray-500 text-sm mt-1">Insights and metrics on referral performance</p>
        </div>
        <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-lg shadow-purple-200 flex items-center gap-2 mt-3 md:mt-0">
          <i class="fa-solid fa-download"></i> Export
        </button>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <p class="text-gray-500 text-sm font-medium">Total Referrals</p>
          <p class="text-3xl font-bold text-gray-900">24</p>
          <span class="text-green-600 text-xs">↑ 15% this month</span>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <p class="text-gray-500 text-sm font-medium">Conversion Rate</p>
          <p class="text-3xl font-bold text-green-600">62%</p>
          <span class="text-green-600 text-xs">↑ 8% vs last month</span>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <p class="text-gray-500 text-sm font-medium">Value Generated</p>
          <p class="text-3xl font-bold text-purple-600">$3.2M</p>
          <span class="text-green-600 text-xs">↑ 12% vs last month</span>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <p class="text-gray-500 text-sm font-medium">Avg. Deal Size</p>
          <p class="text-3xl font-bold text-blue-600">$133K</p>
          <span class="text-green-600 text-xs">↑ 5% vs last month</span>
        </div>
      </div>

      <!-- Charts -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 class="text-gray-900 font-semibold mb-4">Referral Status Distribution</h3>
          <div class="space-y-3">
            <div v-for="item in statusDistribution" :key="item.name" class="flex items-center gap-3">
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

        <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 class="text-gray-900 font-semibold mb-4">Top Performing Partners</h3>
          <div class="space-y-3">
            <div v-for="partner in topPartners" :key="partner.name" class="flex items-center justify-between p-2 border-b border-gray-100">
              <div>
                <p class="text-sm font-medium text-gray-900">{{ partner.name }}</p>
                <p class="text-xs text-gray-500">{{ partner.type }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-semibold text-purple-600">{{ partner.referrals }} referrals</p>
                <p class="text-xs text-gray-400">{{ partner.conversion }}% conversion</p>
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

const statusDistribution = ref([
  { name: 'Pending', count: 8, percentage: 33, color: '#F59E0B' },
  { name: 'Contacted', count: 5, percentage: 21, color: '#3B82F6' },
  { name: 'Converted', count: 7, percentage: 29, color: '#10B981' },
  { name: 'Lost', count: 4, percentage: 17, color: '#EF4444' }
])

const topPartners = ref([
  { name: 'Boeing Aerospace', type: 'Strategic', referrals: 8, conversion: 75 },
  { name: 'Lockheed Martin', type: 'Strategic', referrals: 5, conversion: 80 },
  { name: 'Composite Technologies', type: 'Technology', referrals: 4, conversion: 50 }
])
</script>