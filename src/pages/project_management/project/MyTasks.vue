<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">My Tasks</h1>
          <p class="text-gray-500 text-sm mt-1">Tasks assigned to you</p>
        </div>
        <div class="flex gap-2 mt-3 md:mt-0">
          <button class="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold transition border border-gray-200 shadow-sm">
            <i class="fa-solid fa-filter"></i> Filter
          </button>
          <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-lg shadow-purple-200">
            <i class="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
          <p class="text-2xl font-bold text-gray-900">8</p>
          <p class="text-xs text-gray-400">Total Tasks</p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
          <p class="text-2xl font-bold text-orange-600">3</p>
          <p class="text-xs text-gray-400">In Progress</p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
          <p class="text-2xl font-bold text-green-600">2</p>
          <p class="text-xs text-gray-400">Completed</p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
          <p class="text-2xl font-bold text-red-600">1</p>
          <p class="text-xs text-gray-400">Overdue</p>
        </div>
      </div>

      <!-- Task List -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100">
        <div v-for="task in myTasks" :key="task.id" class="flex items-center justify-between p-4 hover:bg-gray-50 transition">
          <div class="flex items-center gap-3 flex-1">
            <input type="checkbox" class="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
            <div>
              <p class="text-sm font-medium text-gray-900">{{ task.title }}</p>
              <p class="text-xs text-gray-500">{{ task.project }} • {{ task.dueDate }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs px-2 py-1 rounded-full" :class="getPriorityClass(task.priority)">{{ task.priority }}</span>
            <span class="text-xs px-2 py-1 rounded-full" :class="getStatusClass(task.status)">{{ task.status }}</span>
            <button class="text-purple-600 text-sm hover:text-purple-800">Update</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const myTasks = ref([
  { id: 1, title: 'Review composite material specs', project: 'Aerospace Alpha', dueDate: 'Today, 3:00 PM', priority: 'High', status: 'In Progress' },
  { id: 2, title: 'Update project timeline', project: 'Aerospace Alpha', dueDate: 'Tomorrow, 10:00 AM', priority: 'Medium', status: 'In Progress' },
  { id: 3, title: 'Prepare weekly status report', project: 'Defense System', dueDate: 'Oct 15, 9:00 AM', priority: 'Low', status: 'Pending' },
  { id: 4, title: 'Client presentation preparation', project: 'Medical Imaging', dueDate: 'Oct 12, 12:00 PM', priority: 'High', status: 'Overdue' },
  { id: 5, title: 'Quality testing documentation', project: 'Aerospace Alpha', dueDate: 'Oct 10, 5:00 PM', priority: 'Medium', status: 'Completed' }
])

const getPriorityClass = (priority) => {
  const map = { 'High': 'bg-red-100 text-red-700', 'Medium': 'bg-orange-100 text-orange-700', 'Low': 'bg-blue-100 text-blue-700' }
  return map[priority] || 'bg-gray-100 text-gray-700'
}

const getStatusClass = (status) => {
  const map = { 'In Progress': 'bg-blue-100 text-blue-700', 'Pending': 'bg-yellow-100 text-yellow-700', 'Completed': 'bg-green-100 text-green-700', 'Overdue': 'bg-red-100 text-red-700' }
  return map[status] || 'bg-gray-100 text-gray-700'
}
</script>