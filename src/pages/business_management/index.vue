<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-4 md:p-6">
    <div class=" mx-auto">
      
      <!-- Page Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
            Business Development <span class="text-blue-600">Overview</span>
          </h1>
          <p class="text-gray-500 text-sm mt-1">Manage and track your business development activities</p>
        </div>
        <div class="flex gap-3 mt-3 md:mt-0">
          <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-lg shadow-blue-200 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            New Opportunity
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
              <p class="text-gray-500 text-sm font-medium">Total Opportunities</p>
              <p class="text-3xl font-bold text-gray-900 mt-1">247</p>
            </div>
            <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div class="mt-2 flex items-center gap-2">
            <span class="text-green-600 text-xs font-semibold">↑ 12%</span>
            <span class="text-gray-400 text-xs">vs last month</span>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium">Active Deals</p>
              <p class="text-3xl font-bold text-gray-900 mt-1">38</p>
            </div>
            <div class="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div class="mt-2 flex items-center gap-2">
            <span class="text-green-600 text-xs font-semibold">↑ 8%</span>
            <span class="text-gray-400 text-xs">vs last month</span>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium">Pipeline Value</p>
              <p class="text-3xl font-bold text-gray-900 mt-1">$12.4M</p>
            </div>
            <div class="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0 1v1" />
              </svg>
            </div>
          </div>
          <div class="mt-2 flex items-center gap-2">
            <span class="text-green-600 text-xs font-semibold">↑ 5.2%</span>
            <span class="text-gray-400 text-xs">vs last month</span>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium">Win Rate</p>
              <p class="text-3xl font-bold text-gray-900 mt-1">68%</p>
            </div>
            <div class="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <div class="mt-2 flex items-center gap-2">
            <span class="text-green-600 text-xs font-semibold">↑ 3%</span>
            <span class="text-gray-400 text-xs">vs last month</span>
          </div>
        </div>
      </div>

      <!-- Main Content: Charts & Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <!-- Chart - Opportunities by Stage (spans 2 cols) -->
        <div class="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-gray-900 font-semibold">Pipeline by Stage</h3>
            <select class="bg-gray-50 text-gray-700 text-sm rounded-lg px-3 py-1.5 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Last Year</option>
            </select>
          </div>

          <!-- Bar Chart -->
          <div class="space-y-3">
            <div v-for="stage in pipelineStages" :key="stage.name" class="flex items-center gap-3">
              <span class="text-gray-600 text-xs w-24 flex-shrink-0">{{ stage.name }}</span>
              <div class="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                <div class="h-full rounded-full transition-all duration-1000 flex items-center justify-end px-2" 
                     :style="{ width: stage.percentage + '%', backgroundColor: stage.color }"
                     style="transition: width 1.5s ease;">
                  <span class="text-white text-[10px] font-bold">{{ stage.count }}</span>
                </div>
              </div>
              <span class="text-gray-700 text-xs font-semibold w-10 text-right">{{ stage.percentage }}%</span>
            </div>
          </div>

          <!-- Small stats -->
          <div class="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-100">
            <div class="text-center">
              <p class="text-gray-400 text-xs font-medium">Prospecting</p>
              <p class="text-gray-900 font-bold">42</p>
            </div>
            <div class="text-center">
              <p class="text-gray-400 text-xs font-medium">Qualified</p>
              <p class="text-gray-900 font-bold">28</p>
            </div>
            <div class="text-center">
              <p class="text-gray-400 text-xs font-medium">Closed Won</p>
              <p class="text-gray-900 font-bold">19</p>
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
          <button class="w-full mt-4 text-blue-600 text-sm font-medium hover:text-blue-700 transition text-center">
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
                <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
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
            <button class="bg-blue-50 hover:bg-blue-100 text-gray-700 p-4 rounded-xl text-center transition border border-blue-100">
              <i class="fa-solid fa-plus-circle text-blue-600 text-xl block mb-1"></i>
              <span class="text-xs font-medium">New Deal</span>
            </button>
            <button class="bg-green-50 hover:bg-green-100 text-gray-700 p-4 rounded-xl text-center transition border border-green-100">
              <i class="fa-solid fa-users text-green-600 text-xl block mb-1"></i>
              <span class="text-xs font-medium">Add Client</span>
            </button>
            <button class="bg-purple-50 hover:bg-purple-100 text-gray-700 p-4 rounded-xl text-center transition border border-purple-100">
              <i class="fa-solid fa-calendar-plus text-purple-600 text-xl block mb-1"></i>
              <span class="text-xs font-medium">Schedule Meeting</span>
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
import { ref } from 'vue';

// Pipeline stages data
const pipelineStages = [
  { name: 'Prospecting', count: 42, percentage: 45, color: '#4ECDC4' },
  { name: 'Qualified', count: 28, percentage: 30, color: '#45B7D1' },
  { name: 'Proposal', count: 18, percentage: 20, color: '#FF6B6B' },
  { name: 'Negotiation', count: 12, percentage: 13, color: '#F9CA24' },
  { name: 'Closed Won', count: 19, percentage: 20, color: '#6ECA9F' }
];

// Recent activities
const recentActivities = [
  { title: 'New deal with ABC Aerospace - $450K', time: '2 hours ago', icon: 'fa-solid fa-check', iconBg: 'bg-green-500' },
  { title: 'Meeting scheduled with Northrop Grumman', time: '3 hours ago', icon: 'fa-solid fa-calendar', iconBg: 'bg-blue-500' },
  { title: 'Proposal sent to Lockheed Martin', time: '5 hours ago', icon: 'fa-solid fa-file-pdf', iconBg: 'bg-red-500' },
  { title: 'Call with Boeing procurement team', time: '1 day ago', icon: 'fa-solid fa-phone', iconBg: 'bg-purple-500' }
];

// Upcoming tasks
const upcomingTasks = [
  { title: 'Follow up with Airbus', due: 'Today, 3:00 PM', priority: 'High', priorityClass: 'bg-red-100 text-red-700' },
  { title: 'Review proposal for Raytheon', due: 'Tomorrow, 10:00 AM', priority: 'Medium', priorityClass: 'bg-orange-100 text-orange-700' },
  { title: 'Prepare Q4 BD strategy', due: 'Oct 15, 9:00 AM', priority: 'Low', priorityClass: 'bg-blue-100 text-blue-700' },
  { title: 'Client lunch with GE Aviation', due: 'Oct 12, 12:00 PM', priority: 'High', priorityClass: 'bg-red-100 text-red-700' }
];
</script>

<style scoped>
/* Smooth transitions */
.transition {
  transition: all 0.3s ease;
}

/* Custom checkbox style */
input[type="checkbox"] {
  accent-color: #2563eb;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

/* Bar chart number inside bar */
.rounded-full .text-white {
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}
</style>