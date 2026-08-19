<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p class="text-gray-500 text-sm mt-1">Track key marketing metrics and performance</p>
        </div>
        <div class="flex gap-2 mt-3 md:mt-0">
          <button class="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold transition border border-gray-200 shadow-sm">
            <i class="fa-solid fa-calendar"></i> This Month
          </button>
          <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-lg shadow-purple-200">
            <i class="fa-solid fa-file-export"></i> Export
          </button>
        </div>
      </div>

      <!-- Top Metrics -->
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <p class="text-gray-400 text-xs">Total Traffic</p>
          <p class="text-2xl font-bold text-gray-900">24.8K</p>
          <span class="text-green-600 text-xs">↑ 12%</span>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <p class="text-gray-400 text-xs">Unique Visitors</p>
          <p class="text-2xl font-bold text-gray-900">18.2K</p>
          <span class="text-green-600 text-xs">↑ 8%</span>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <p class="text-gray-400 text-xs">Bounce Rate</p>
          <p class="text-2xl font-bold text-green-600">32%</p>
          <span class="text-green-600 text-xs">↓ 5%</span>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <p class="text-gray-400 text-xs">Avg Session</p>
          <p class="text-2xl font-bold text-gray-900">4:32</p>
          <span class="text-green-600 text-xs">↑ 2%</span>
        </div>
      </div>

      <!-- Charts -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 class="text-gray-900 font-semibold mb-4">Traffic Sources</h3>
          <div class="space-y-3">
            <div v-for="source in trafficSources" :key="source.name" class="flex items-center gap-3">
              <span class="text-gray-600 text-xs w-24">{{ source.name }}</span>
              <div class="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                <div class="h-full rounded-full flex items-center justify-end px-2" :style="{ width: source.percentage + '%', backgroundColor: source.color }">
                  <span class="text-white text-[10px] font-bold">{{ source.percentage }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 class="text-gray-900 font-semibold mb-4">Top Pages</h3>
          <div class="space-y-3">
            <div v-for="page in topPages" :key="page.name" class="flex items-center justify-between p-2 border-b border-gray-100">
              <span class="text-sm text-gray-700">{{ page.name }}</span>
              <span class="text-sm font-semibold text-gray-900">{{ page.views }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Weekly Trends -->
      <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h3 class="text-gray-900 font-semibold mb-4">Weekly Trends</h3>
        <div class="grid grid-cols-7 gap-2">
          <div v-for="day in weeklyTrends" :key="day.name" class="text-center">
            <div class="h-16 flex items-end justify-center">
              <div class="w-full rounded-t-lg" :style="{ height: day.height + 'px', backgroundColor: day.color }"></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">{{ day.name }}</p>
            <p class="text-xs font-semibold text-gray-700">{{ day.value }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const trafficSources = ref([
  { name: 'Organic Search', percentage: 45, color: '#7C3AED' },
  { name: 'Direct', percentage: 25, color: '#3B82F6' },
  { name: 'Social Media', percentage: 18, color: '#0EA5E9' },
  { name: 'Email', percentage: 8, color: '#F59E0B' },
  { name: 'Referrals', percentage: 4, color: '#10B981' }
])

const topPages = ref([
  { name: '/products/composites', views: '4,200' },
  { name: '/blog/composite-guide', views: '3,800' },
  { name: '/about/facility', views: '2,900' },
  { name: '/contact', views: '2,400' },
  { name: '/industries/aerospace', views: '2,100' }
])

const weeklyTrends = ref([
  { name: 'Mon', value: 420, height: 60, color: '#7C3AED' },
  { name: 'Tue', value: 580, height: 82, color: '#7C3AED' },
  { name: 'Wed', value: 490, height: 70, color: '#7C3AED' },
  { name: 'Thu', value: 620, height: 88, color: '#7C3AED' },
  { name: 'Fri', value: 560, height: 80, color: '#7C3AED' },
  { name: 'Sat', value: 380, height: 54, color: '#3B82F6' },
  { name: 'Sun', value: 320, height: 45, color: '#3B82F6' }
])
</script>