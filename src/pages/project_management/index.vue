<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-4 md:p-6">
    <div class=" mx-auto">

      <!-- Page Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
            Project <span class="text-purple-600">Overview</span>
          </h1>
          <p class="text-gray-500 text-sm mt-1">Track and manage all your projects from a single dashboard</p>
        </div>
        <div class="flex gap-3 mt-3 md:mt-0">
          <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-lg shadow-purple-200 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            New Project
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
              <p class="text-gray-500 text-sm font-medium">Active Projects</p>
              <p class="text-3xl font-bold text-gray-900 mt-1">12</p>
            </div>
            <div class="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
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
              <p class="text-gray-500 text-sm font-medium">Tasks Overdue</p>
              <p class="text-3xl font-bold text-gray-900 mt-1">4</p>
            </div>
            <div class="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div class="mt-2 flex items-center gap-2">
            <span class="text-red-600 text-xs font-semibold">↑ 2</span>
            <span class="text-gray-400 text-xs">from last week</span>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium">Team Members</p>
              <p class="text-3xl font-bold text-gray-900 mt-1">18</p>
            </div>
            <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          <div class="mt-2 flex items-center gap-2">
            <span class="text-green-600 text-xs font-semibold">↑ 2</span>
            <span class="text-gray-400 text-xs">this month</span>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium">Completion Rate</p>
              <p class="text-3xl font-bold text-gray-900 mt-1">76%</p>
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
      </div>

      <!-- Main Content: Charts & Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <!-- Project Status (spans 2 cols) -->
        <div class="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-gray-900 font-semibold">Project Status</h3>
            <select class="bg-gray-50 text-gray-700 text-sm rounded-lg px-3 py-1.5 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option>All Projects</option>
              <option>Active</option>
              <option>Completed</option>
              <option>On Hold</option>
            </select>
          </div>

          <!-- Horizontal Bar Chart -->
          <div class="space-y-3">
            <div v-for="project in projectStatus" :key="project.name" class="flex items-center gap-3">
              <span class="text-gray-600 text-xs w-32 flex-shrink-0">{{ project.name }}</span>
              <div class="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                <div class="h-full rounded-full transition-all duration-1000 flex items-center justify-end px-2"
                     :style="{ width: project.progress + '%', backgroundColor: project.color }"
                     style="transition: width 1.5s ease;">
                  <span class="text-white text-[10px] font-bold">{{ project.progress }}%</span>
                </div>
              </div>
              <span class="text-gray-700 text-xs font-semibold w-16 text-right">{{ project.tasks }}</span>
            </div>
          </div>

          <!-- Quick Status Stats -->
          <div class="grid grid-cols-4 gap-4 mt-6 pt-4 border-t border-gray-100">
            <div class="text-center">
              <p class="text-gray-400 text-xs font-medium">Active</p>
              <p class="text-gray-900 font-bold">7</p>
            </div>
            <div class="text-center">
              <p class="text-gray-400 text-xs font-medium">In Review</p>
              <p class="text-gray-900 font-bold">3</p>
            </div>
            <div class="text-center">
              <p class="text-gray-400 text-xs font-medium">Completed</p>
              <p class="text-gray-900 font-bold">2</p>
            </div>
            <div class="text-center">
              <p class="text-gray-400 text-xs font-medium">On Hold</p>
              <p class="text-gray-900 font-bold">1</p>
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
              <i class="fa-solid fa-plus-circle text-purple-600 text-xl block mb-1"></i>
              <span class="text-xs font-medium">New Project</span>
            </button>
            <button class="bg-blue-50 hover:bg-blue-100 text-gray-700 p-4 rounded-xl text-center transition border border-blue-100">
              <i class="fa-solid fa-tasks text-blue-600 text-xl block mb-1"></i>
              <span class="text-xs font-medium">Add Task</span>
            </button>
            <button class="bg-green-50 hover:bg-green-100 text-gray-700 p-4 rounded-xl text-center transition border border-green-100">
              <i class="fa-solid fa-users text-green-600 text-xl block mb-1"></i>
              <span class="text-xs font-medium">Team Meeting</span>
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

// Project status data
const projectStatus = [
  { name: 'Aerospace Project Alpha', tasks: 24, progress: 85, color: '#7C3AED' },
  { name: 'Defense System Integration', tasks: 18, progress: 65, color: '#3B82F6' },
  { name: 'Medical Imaging Platform', tasks: 12, progress: 45, color: '#0EA5E9' },
  { name: 'Composite Research Phase 2', tasks: 8, progress: 30, color: '#F59E0B' },
  { name: 'Space Component Testing', tasks: 6, progress: 15, color: '#10B981' }
]

// Recent activities
const recentActivities = [
  { title: 'Project Alpha milestone reached - Phase 1 complete', time: '2 hours ago', icon: 'fa-solid fa-check', iconBg: 'bg-green-500' },
  { title: 'New task assigned: "Review technical specs"', time: '3 hours ago', icon: 'fa-solid fa-tasks', iconBg: 'bg-blue-500' },
  { title: 'Meeting scheduled with engineering team', time: '5 hours ago', icon: 'fa-solid fa-calendar', iconBg: 'bg-purple-500' },
  { title: 'Project files uploaded to shared drive', time: '1 day ago', icon: 'fa-solid fa-upload', iconBg: 'bg-orange-500' }
]

// Upcoming tasks
const upcomingTasks = [
  { title: 'Review composite material specs', due: 'Today, 3:00 PM', priority: 'High', priorityClass: 'bg-red-100 text-red-700' },
  { title: 'Update project timeline', due: 'Tomorrow, 10:00 AM', priority: 'Medium', priorityClass: 'bg-orange-100 text-orange-700' },
  { title: 'Prepare weekly status report', due: 'Oct 15, 9:00 AM', priority: 'Low', priorityClass: 'bg-blue-100 text-blue-700' },
  { title: 'Client presentation preparation', due: 'Oct 12, 12:00 PM', priority: 'High', priorityClass: 'bg-red-100 text-red-700' }
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