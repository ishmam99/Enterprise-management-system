<template>
  <div class="min-h-screen w-5/6 px-10 py-6 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-600 flex items-center justify-center shadow-lg shadow-fuchsia-500/30">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/>
            </svg>
          </div>
          <div>
            <h1 class="text-2xl md:text-3xl font-bold bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">Website Overview</h1>
            <p class="text-gray-500 text-sm">Monitor your website performance and content at a glance</p>
          </div>
        </div>
      </div>
      <div class="flex gap-3 mt-4 md:mt-0">
        <button class="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-semibold transition border border-gray-200 shadow-sm flex items-center gap-2 hover:border-fuchsia-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
          </svg>
          Preview Site
        </button>
        <router-link to="/website_management/website/settings" class="bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-lg shadow-fuchsia-500/30 flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
          Edit Site
        </router-link>
      </div>
    </div>

    <!-- Top Stats with Sparklines -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
      <div v-for="(stat, idx) in stats" :key="idx" class="group relative overflow-hidden bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div class="absolute inset-0 bg-gradient-to-br from-fuchsia-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div class="flex items-center justify-between relative">
          <div>
            <p class="text-xs text-gray-400 font-medium uppercase tracking-wider">{{ stat.label }}</p>
            <p class="text-3xl font-bold text-gray-900 mt-1 group-hover:text-fuchsia-600 transition">{{ stat.value }}</p>
          </div>
          <div class="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110" :class="[stat.bg]">
            <div class="w-6 h-6 text-white" v-html="stat.icon"></div>
          </div>
        </div>
        <!-- Sparkline (mini trend) -->
        <div class="mt-3 relative">
          <svg class="w-full h-6" viewBox="0 0 100 20" preserveAspectRatio="none">
            <polyline :points="stat.sparkline" fill="none" stroke="currentColor" stroke-width="1.5" class="text-fuchsia-500" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="flex items-center gap-2 relative">
          <span class="text-xs font-semibold" :class="stat.trend > 0 ? 'text-green-600' : 'text-red-600'">{{ stat.trend > 0 ? '↑' : '↓' }} {{ Math.abs(stat.trend) }}{{ stat.trendUnit || '' }}</span>
          <span class="text-xs text-gray-400">{{ stat.trendLabel }}</span>
        </div>
        <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-fuchsia-400 to-pink-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Traffic Chart -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
            Traffic Overview
          </h3>
          <span class="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full">Last 7 days</span>
        </div>
        <!-- Bar Chart -->
        <div class="flex items-end justify-between gap-2 h-40 pt-4 pb-2">
          <div v-for="(day, i) in weeklyTraffic" :key="i" class="flex flex-col items-center flex-1">
            <div class="w-full max-w-8 bg-gradient-to-t rounded-lg transition-all duration-500 hover:scale-y-105" 
                 :style="{ height: day.value + '%', backgroundColor: day.color }" 
                 :title="day.label + ': ' + day.visits"></div>
            <span class="text-[10px] text-gray-400 mt-1">{{ day.label }}</span>
          </div>
        </div>
        <div class="flex justify-between text-xs text-gray-400 mt-2">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>

      <!-- Content Performance -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
            Content Performance
          </h3>
          <span class="text-xs bg-fuchsia-50 text-fuchsia-700 px-3 py-1 rounded-full">Top pages</span>
        </div>
        <div class="space-y-3">
          <div v-for="page in topPages" :key="page.name" class="flex items-center gap-3">
            <span class="text-xs text-gray-600 w-20 flex-shrink-0 truncate">{{ page.name }}</span>
            <div class="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
              <div class="h-full rounded-full transition-all duration-1000" 
                   :style="{ width: page.percentage + '%', backgroundColor: page.color }"></div>
            </div>
            <span class="text-xs font-semibold text-gray-700 w-10 text-right">{{ page.views }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom: Recent Activity + Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div class="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <h3 class="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <span class="text-xs bg-gradient-to-r from-fuchsia-50 to-pink-50 text-fuchsia-700 px-3 py-1 rounded-full border border-fuchsia-200">Last 7 days</span>
        </div>
        <div class="space-y-4">
          <div v-for="activity in recentActivities" :key="activity.id" class="flex items-start gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-fuchsia-50/50 hover:to-pink-50/50 transition">
            <div class="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" :class="activity.iconBg">
              <div class="w-4 h-4 text-white" v-html="activity.icon"></div>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
              <p class="text-xs text-gray-400">{{ activity.time }}</p>
            </div>
            <span class="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{{ activity.user }}</span>
          </div>
        </div>
        <button class="w-full mt-4 text-fuchsia-600 text-sm font-medium hover:text-fuchsia-700 transition text-center flex items-center justify-center gap-1 group">
          View All Activity
          <svg class="w-4 h-4 transform group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </button>
      </div>

      <!-- Quick Actions -->
      <div class="bg-gradient-to-br from-fuchsia-50/80 to-pink-50/80 rounded-2xl border border-fuchsia-100 shadow-sm p-6 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-24 h-24 bg-fuchsia-200/30 rounded-full blur-2xl"></div>
        <div class="absolute bottom-0 left-0 w-24 h-24 bg-pink-200/30 rounded-full blur-2xl"></div>
        <div class="flex items-center gap-2 mb-4 relative">
          <svg class="w-5 h-5 text-fuchsia-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          <h3 class="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>
        <div class="grid grid-cols-2 gap-3 relative">
          <RouterLink to="/website_management/pages/create" class="bg-white hover:shadow-md text-gray-700 p-4 rounded-xl text-center transition border border-gray-200 hover:border-fuchsia-300 group">
            <div class="text-2xl block mb-1 text-fuchsia-500 group-hover:scale-110 transition">📄</div>
            <span class="text-xs font-medium">Add Page</span>
          </RouterLink>
          <RouterLink to="/website_management/navigation/create" class="bg-white hover:shadow-md text-gray-700 p-4 rounded-xl text-center transition border border-gray-200 hover:border-blue-300 group">
            <div class="text-2xl block mb-1 text-blue-500 group-hover:scale-110 transition">🧭</div>
            <span class="text-xs font-medium">Add Menu</span>
          </RouterLink>
          <RouterLink to="/website_management/testimonials/create" class="bg-white hover:shadow-md text-gray-700 p-4 rounded-xl text-center transition border border-gray-200 hover:border-green-300 group">
            <div class="text-2xl block mb-1 text-green-500 group-hover:scale-110 transition">💬</div>
            <span class="text-xs font-medium">Add Testimonial</span>
          </RouterLink>
          <RouterLink to="/website_management/settings" class="bg-white hover:shadow-md text-gray-700 p-4 rounded-xl text-center transition border border-gray-200 hover:border-purple-300 group">
            <div class="text-2xl block mb-1 text-purple-500 group-hover:scale-110 transition">⚙️</div>
            <span class="text-xs font-medium">Site Settings</span>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Site Health Bar -->
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-fuchsia-50/20 via-transparent to-pink-50/20"></div>
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative">
        <div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            <h3 class="text-lg font-semibold text-gray-900">Site Health</h3>
          </div>
          <p class="text-sm text-gray-500">Overall site performance and SEO score</p>
        </div>
        <div class="flex items-center gap-6">
          <div v-for="(item, idx) in healthItems" :key="idx" class="text-center group">
            <div class="relative w-16 h-16">
              <svg class="w-16 h-16 transform -rotate-90">
                <circle cx="32" cy="32" r="28" fill="none" stroke="#e5e7eb" stroke-width="4"/>
                <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" stroke-width="4"
                  :stroke-dasharray="`${2 * Math.PI * 28 * item.value / 100} ${2 * Math.PI * 28 * (1 - item.value / 100)}`"
                  :class="[item.color]"
                  class="transition-all duration-1000 ease-out"/>
              </svg>
              <div class="absolute inset-0 flex items-center justify-center text-sm font-bold" :class="[item.textColor]">
                {{ item.value }}%
              </div>
            </div>
            <p class="text-xs text-gray-400 mt-1">{{ item.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const stats = ref([
  {
    label: 'Pages',
    value: 6,
    trend: 2,
    trendUnit: '',
    trendLabel: 'this month',
    bg: 'bg-gradient-to-br from-fuchsia-500 to-pink-500',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`,
    sparkline: '0,10,20,15,30,25,40'
  },
  {
    label: 'Menu Items',
    value: 4,
    trend: 1,
    trendUnit: '',
    trendLabel: 'this week',
    bg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4v4m8-4v4"/></svg>`,
    sparkline: '40,30,35,25,45,50,60'
  },
  {
    label: 'Testimonials',
    value: 8,
    trend: 3,
    trendUnit: '',
    trendLabel: 'this month',
    bg: 'bg-gradient-to-br from-green-500 to-emerald-500',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>`,
    sparkline: '20,30,25,40,35,50,45'
  },
  {
    label: 'Visitors',
    value: '1.2K',
    trend: 5,
    trendUnit: '%',
    trendLabel: 'vs last week',
    trendNegative: true,
    bg: 'bg-gradient-to-br from-orange-500 to-amber-500',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`,
    sparkline: '120,130,125,140,135,150,145'
  }
])

const weeklyTraffic = ref([
  { label: 'Mon', value: 65, visits: 420, color: '#7C3AED' },
  { label: 'Tue', value: 78, visits: 580, color: '#6D28D9' },
  { label: 'Wed', value: 70, visits: 490, color: '#5B21B6' },
  { label: 'Thu', value: 85, visits: 620, color: '#4F46E5' },
  { label: 'Fri', value: 72, visits: 560, color: '#4338CA' },
  { label: 'Sat', value: 55, visits: 380, color: '#2563EB' },
  { label: 'Sun', value: 45, visits: 320, color: '#0284C7' }
])

const topPages = ref([
  { name: 'Home', views: 4200, percentage: 100, color: '#7C3AED' },
  { name: 'About', views: 3800, percentage: 90, color: '#6D28D9' },
  { name: 'Services', views: 2900, percentage: 69, color: '#5B21B6' },
  { name: 'Contact', views: 2400, percentage: 57, color: '#4F46E5' },
  { name: 'Careers', views: 2100, percentage: 50, color: '#4338CA' }
])

const recentActivities = ref([
  {
    id: 1,
    title: 'Homepage content updated',
    time: '2 hours ago',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>`,
    iconBg: 'bg-fuchsia-500',
    user: 'Admin'
  },
  {
    id: 2,
    title: 'New testimonial added from Boeing',
    time: '3 hours ago',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>`,
    iconBg: 'bg-green-500',
    user: 'Editor'
  },
  {
    id: 3,
    title: 'Navigation menu reorganized',
    time: '5 hours ago',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>`,
    iconBg: 'bg-blue-500',
    user: 'Admin'
  },
  {
    id: 4,
    title: 'Meta tags updated for SEO',
    time: '1 day ago',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
    iconBg: 'bg-purple-500',
    user: 'SEO'
  },
  {
    id: 5,
    title: 'New page created: Careers',
    time: '2 days ago',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`,
    iconBg: 'bg-teal-500',
    user: 'Editor'
  }
])

const healthItems = ref([
  { label: 'Performance', value: 92, color: 'text-green-500', textColor: 'text-green-600' },
  { label: 'SEO', value: 85, color: 'text-fuchsia-500', textColor: 'text-fuchsia-600' },
  { label: 'Accessibility', value: 78, color: 'text-amber-500', textColor: 'text-amber-600' }
])
</script>

<style scoped>
svg circle {
  transition: stroke-dasharray 1.5s ease;
}
</style>