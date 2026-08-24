<template>
  <div class="min-h-screen w-5/6 px-10 py-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-600 flex items-center justify-center shadow-lg shadow-fuchsia-500/30">
            <span class="text-2xl">🌐</span>
          </div>
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Website Overview</h1>
            <p class="text-gray-500 text-sm">Monitor your website performance and content at a glance</p>
          </div>
        </div>
      </div>
      <div class="flex gap-3 mt-4 md:mt-0">
        <button class="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-semibold transition border border-gray-200 shadow-sm flex items-center gap-2">
          <span>🔍</span> Preview Site
        </button>
        <router-link to="/website_management/website/settings" class="bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-lg shadow-fuchsia-500/30 flex items-center gap-2">
          <span>✏️</span> Edit Site
        </router-link>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
      <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-xl transition group">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs text-gray-400 font-medium uppercase tracking-wider">Pages</p>
            <p class="text-3xl font-bold text-gray-900 mt-1 group-hover:text-fuchsia-600 transition">6</p>
          </div>
          <div class="w-12 h-12 rounded-2xl bg-fuchsia-50 flex items-center justify-center group-hover:bg-fuchsia-100 transition">
            <span class="text-2xl">📄</span>
          </div>
        </div>
        <div class="mt-3 flex items-center gap-2">
          <span class="text-xs text-green-600 font-semibold">↑ 2</span>
          <span class="text-xs text-gray-400">this month</span>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-xl transition group">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs text-gray-400 font-medium uppercase tracking-wider">Menu Items</p>
            <p class="text-3xl font-bold text-gray-900 mt-1 group-hover:text-blue-600 transition">4</p>
          </div>
          <div class="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition">
            <span class="text-2xl">🧭</span>
          </div>
        </div>
        <div class="mt-3 flex items-center gap-2">
          <span class="text-xs text-green-600 font-semibold">↑ 1</span>
          <span class="text-xs text-gray-400">this week</span>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-xl transition group">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs text-gray-400 font-medium uppercase tracking-wider">Testimonials</p>
            <p class="text-3xl font-bold text-gray-900 mt-1 group-hover:text-green-600 transition">8</p>
          </div>
          <div class="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition">
            <span class="text-2xl">💬</span>
          </div>
        </div>
        <div class="mt-3 flex items-center gap-2">
          <span class="text-xs text-green-600 font-semibold">↑ 3</span>
          <span class="text-xs text-gray-400">this month</span>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-xl transition group">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs text-gray-400 font-medium uppercase tracking-wider">Visitors</p>
            <p class="text-3xl font-bold text-gray-900 mt-1 group-hover:text-orange-600 transition">1.2K</p>
          </div>
          <div class="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition">
            <span class="text-2xl">👥</span>
          </div>
        </div>
        <div class="mt-3 flex items-center gap-2">
          <span class="text-xs text-red-600 font-semibold">↓ 5%</span>
          <span class="text-xs text-gray-400">vs last week</span>
        </div>
      </div>
    </div>

    <!-- Main Content: Recent Activity + Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- Recent Activity (spans 2) -->
      <div class="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <span class="text-xl">🕒</span>
            <h3 class="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <span class="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">Last 7 days</span>
        </div>
        <div class="space-y-4">
          <div v-for="activity in recentActivities" :key="activity.id" class="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition">
            <div class="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" :class="activity.iconBg">
              <span class="text-white text-sm">{{ activity.icon }}</span>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
              <p class="text-xs text-gray-400">{{ activity.time }}</p>
            </div>
            <span class="text-xs text-gray-400">{{ activity.user }}</span>
          </div>
        </div>
        <button class="w-full mt-4 text-fuchsia-600 text-sm font-medium hover:text-fuchsia-700 transition text-center">View All Activity →</button>
      </div>

      <!-- Quick Actions -->
      <div class="bg-gradient-to-br from-fuchsia-50 to-pink-50 rounded-2xl border border-fuchsia-100 shadow-sm p-6">
        <div class="flex items-center gap-2 mb-4">
          <span class="text-xl">⚡</span>
          <h3 class="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <RouterLink to="/website_management/pages/create" class="bg-white hover:shadow-md text-gray-700 p-4 rounded-xl text-center transition border border-gray-200 hover:border-fuchsia-300">
            <span class="text-2xl block mb-1">📄</span>
            <span class="text-xs font-medium">Add Page</span>
          </RouterLink>
          <RouterLink to="/website_management/navigation/create" class="bg-white hover:shadow-md text-gray-700 p-4 rounded-xl text-center transition border border-gray-200 hover:border-blue-300">
            <span class="text-2xl block mb-1">🧭</span>
            <span class="text-xs font-medium">Add Menu</span>
          </RouterLink>
          <RouterLink to="/website_management/testimonials/create" class="bg-white hover:shadow-md text-gray-700 p-4 rounded-xl text-center transition border border-gray-200 hover:border-green-300">
            <span class="text-2xl block mb-1">💬</span>
            <span class="text-xs font-medium">Add Testimonial</span>
          </RouterLink>
          <RouterLink to="/website_management/settings" class="bg-white hover:shadow-md text-gray-700 p-4 rounded-xl text-center transition border border-gray-200 hover:border-purple-300">
            <span class="text-2xl block mb-1">⚙️</span>
            <span class="text-xs font-medium">Site Settings</span>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Site Health Bar -->
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xl">❤️</span>
            <h3 class="text-lg font-semibold text-gray-900">Site Health</h3>
          </div>
          <p class="text-sm text-gray-500">Overall site performance and SEO score</p>
        </div>
        <div class="flex items-center gap-6">
          <div class="text-center">
            <div class="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center text-xl font-bold text-green-600">92%</div>
            <p class="text-xs text-gray-400 mt-1">Performance</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 rounded-full border-4 border-fuchsia-500 flex items-center justify-center text-xl font-bold text-fuchsia-600">85%</div>
            <p class="text-xs text-gray-400 mt-1">SEO</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 rounded-full border-4 border-amber-500 flex items-center justify-center text-xl font-bold text-amber-600">78%</div>
            <p class="text-xs text-gray-400 mt-1">Accessibility</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const recentActivities = ref([
  { id: 1, title: 'Homepage content updated', time: '2 hours ago', icon: '📝', iconBg: 'bg-fuchsia-500', user: 'Admin' },
  { id: 2, title: 'New testimonial added from Boeing', time: '3 hours ago', icon: '💬', iconBg: 'bg-green-500', user: 'Editor' },
  { id: 3, title: 'Navigation menu reorganized', time: '5 hours ago', icon: '🧭', iconBg: 'bg-blue-500', user: 'Admin' },
  { id: 4, title: 'Meta tags updated for SEO', time: '1 day ago', icon: '🔧', iconBg: 'bg-purple-500', user: 'SEO' },
  { id: 5, title: 'New page created: Careers', time: '2 days ago', icon: '📄', iconBg: 'bg-teal-500', user: 'Editor' }
])
</script>