<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-4 md:p-6">
    <div class=" mx-auto">

      <!-- Page Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
            Marketing <span class="text-purple-600">Overview</span>
          </h1>
          <p class="text-gray-500 text-sm mt-1">Manage and track your marketing campaigns and performance</p>
        </div>
        <div class="flex gap-3 mt-3 md:mt-0">
          <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-lg shadow-purple-200 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            New Campaign
          </button>
          <button class="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold transition border border-gray-200 shadow-sm">
            <i class="fa-solid fa-download"></i> Export
          </button>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium">Total Campaigns</p>
              <p class="text-3xl font-bold text-gray-900 mt-1">48</p>
            </div>
            <div class="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
          </div>
          <div class="mt-2 flex items-center gap-2">
            <span class="text-green-600 text-xs font-semibold">↑ 15%</span>
            <span class="text-gray-400 text-xs">vs last month</span>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium">Total Leads</p>
              <p class="text-3xl font-bold text-gray-900 mt-1">1,284</p>
            </div>
            <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <div class="mt-2 flex items-center gap-2">
            <span class="text-green-600 text-xs font-semibold">↑ 22%</span>
            <span class="text-gray-400 text-xs">vs last month</span>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium">Conversion Rate</p>
              <p class="text-3xl font-bold text-gray-900 mt-1">32%</p>
            </div>
            <div class="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div class="mt-2 flex items-center gap-2">
            <span class="text-green-600 text-xs font-semibold">↑ 5%</span>
            <span class="text-gray-400 text-xs">vs last month</span>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium">ROI</p>
              <p class="text-3xl font-bold text-gray-900 mt-1">215%</p>
            </div>
            <div class="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div class="mt-2 flex items-center gap-2">
            <span class="text-green-600 text-xs font-semibold">↑ 8%</span>
            <span class="text-gray-400 text-xs">vs last month</span>
          </div>
        </div>
      </div>

      <!-- Main Content: Charts & Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <!-- Campaign Performance (spans 2 cols) -->
        <div class="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-gray-900 font-semibold">Campaign Performance</h3>
            <select class="bg-gray-50 text-gray-700 text-sm rounded-lg px-3 py-1.5 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Last Year</option>
            </select>
          </div>

          <!-- Horizontal Bar Chart -->
          <div class="space-y-3">
            <div v-for="campaign in campaignPerformance" :key="campaign.name" class="flex items-center gap-3">
              <span class="text-gray-600 text-xs w-28 flex-shrink-0">{{ campaign.name }}</span>
              <div class="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                <div class="h-full rounded-full transition-all duration-1000 flex items-center justify-end px-2"
                     :style="{ width: campaign.percentage + '%', backgroundColor: campaign.color }"
                     style="transition: width 1.5s ease;">
                  <span class="text-white text-[10px] font-bold">{{ campaign.percentage }}%</span>
                </div>
              </div>
              <span class="text-gray-700 text-xs font-semibold w-16 text-right">{{ campaign.leads }}</span>
            </div>
          </div>

          <!-- Campaign Type Stats -->
          <div class="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-100">
            <div class="text-center">
              <p class="text-gray-400 text-xs font-medium">Email</p>
              <p class="text-gray-900 font-bold">18</p>
            </div>
            <div class="text-center">
              <p class="text-gray-400 text-xs font-medium">Social</p>
              <p class="text-gray-900 font-bold">12</p>
            </div>
            <div class="text-center">
              <p class="text-gray-400 text-xs font-medium">Paid Ads</p>
              <p class="text-gray-900 font-bold">8</p>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 class="text-gray-900 font-semibold mb-4">Recent Activity</h3>
          <div class="space-y-4">
            <div v-for="(activity, index) in recentActivities" :key="index" class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                   :class="activity.iconBg">
                <i :class="activity.icon" class="text-white text-xs"></i>
              </div>
              <div>
                <p class="text-gray-800 text-sm font-medium">{{ activity.title }}</p>
                <p class="text-gray-400 text-xs">{{ activity.time }}</p>
              </div>
            </div>
          </div>
          <button class="w-full mt-4 text-purple-600 text-sm font-medium hover:text-purple-700 transition text-center">
            View All Activity →
          </button>
        </div>
      </div>

      <!-- Bottom: Upcoming Tasks & Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Upcoming Tasks -->
        <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 class="text-gray-900 font-semibold mb-4">Upcoming Tasks</h3>
          <div class="space-y-3">
            <div v-for="task in upcomingTasks" :key="task.title"
                 class="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
              <div class="flex items-center gap-3">
                <input type="checkbox" class="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                <div>
                  <p class="text-gray-800 text-sm font-medium">{{ task.title }}</p>
                  <p class="text-gray-400 text-xs">{{ task.due }}</p>
                </div>
              </div>
              <span class="text-xs px-2.5 py-1 rounded-full font-medium" :class="task.priorityClass">
                {{ task.priority }}
              </span>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 class="text-gray-900 font-semibold mb-4">Quick Actions</h3>
          <div class="grid grid-cols-2 gap-3">
            <button class="bg-purple-50 hover:bg-purple-100 text-gray-700 p-4 rounded-xl text-center transition border border-purple-100">
              <i class="fa-solid fa-bullhorn text-purple-600 text-xl block mb-1"></i>
              <span class="text-xs font-medium">New Campaign</span>
            </button>
            <button class="bg-blue-50 hover:bg-blue-100 text-gray-700 p-4 rounded-xl text-center transition border border-blue-100">
              <i class="fa-solid fa-plus-circle text-blue-600 text-xl block mb-1"></i>
              <span class="text-xs font-medium">Add Lead</span>
            </button>
            <button class="bg-green-50 hover:bg-green-100 text-gray-700 p-4 rounded-xl text-center transition border border-green-100">
              <i class="fa-solid fa-envelope text-green-600 text-xl block mb-1"></i>
              <span class="text-xs font-medium">Email Blast</span>
            </button>
            <button class="bg-orange-50 hover:bg-orange-100 text-gray-700 p-4 rounded-xl text-center transition border border-orange-100">
              <i class="fa-solid fa-file-export text-orange-600 text-xl block mb-1"></i>
              <span class="text-xs font-medium">Generate Report</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Campaign performance data
const campaignPerformance = [
  { name: 'Email Newsletter', leads: 342, percentage: 75, color: '#7C3AED' },
  { name: 'Social Media Ads', leads: 215, percentage: 48, color: '#3B82F6' },
  { name: 'LinkedIn Outreach', leads: 189, percentage: 42, color: '#0EA5E9' },
  { name: 'PPC Campaigns', leads: 156, percentage: 35, color: '#F59E0B' },
  { name: 'Content Marketing', leads: 98, percentage: 22, color: '#10B981' }
]

// Recent activities
const recentActivities = [
  { title: 'New email campaign launched: "Summer Special"', time: '2 hours ago', icon: 'fa-solid fa-envelope', iconBg: 'bg-purple-500' },
  { title: '300 new leads imported from LinkedIn', time: '3 hours ago', icon: 'fa-solid fa-users', iconBg: 'bg-blue-500' },
  { title: 'Social media ad approved for Q4', time: '5 hours ago', icon: 'fa-solid fa-check', iconBg: 'bg-green-500' },
  { title: 'Blog post published: "Composite Materials 101"', time: '1 day ago', icon: 'fa-solid fa-file-alt', iconBg: 'bg-orange-500' }
]

// Upcoming tasks
const upcomingTasks = [
  { title: 'Review Q4 campaign strategy', due: 'Today, 3:00 PM', priority: 'High', priorityClass: 'bg-red-100 text-red-700' },
  { title: 'Design email template for product launch', due: 'Tomorrow, 10:00 AM', priority: 'Medium', priorityClass: 'bg-orange-100 text-orange-700' },
  { title: 'Update social media content calendar', due: 'Oct 15, 9:00 AM', priority: 'Low', priorityClass: 'bg-blue-100 text-blue-700' },
  { title: 'Prepare monthly marketing report', due: 'Oct 12, 12:00 PM', priority: 'High', priorityClass: 'bg-red-100 text-red-700' }
]
</script>

<style scoped>
.transition {
  transition: all 0.3s ease;
}
input[type="checkbox"] {
  accent-color: #7C3AED;
  width: 16px;
  height: 16px;
  cursor: pointer;
}
.rounded-full .text-white {
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}
</style>