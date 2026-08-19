<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Timesheets</h1>
          <p class="text-gray-500 text-sm mt-1">Track and manage team hours</p>
        </div>
        <div class="flex gap-2 mt-3 md:mt-0">
          <button class="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold transition border border-gray-200 shadow-sm">
            <i class="fa-solid fa-calendar"></i> This Week
          </button>
          <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-lg shadow-purple-200">
            <i class="fa-solid fa-export"></i> Export
          </button>
        </div>
      </div>

      <!-- Summary -->
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
          <p class="text-2xl font-bold text-gray-900">320</p>
          <p class="text-xs text-gray-400">Total Hours</p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
          <p class="text-2xl font-bold text-purple-600">85%</p>
          <p class="text-xs text-gray-400">Billed</p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
          <p class="text-2xl font-bold text-green-600">12</p>
          <p class="text-xs text-gray-400">Resources</p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
          <p class="text-2xl font-bold text-blue-600">8</p>
          <p class="text-xs text-gray-400">Projects</p>
        </div>
      </div>

      <!-- Timesheet Table -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-100">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Resource</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mon</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tue</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Wed</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thu</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fri</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="entry in timesheets" :key="entry.id" class="hover:bg-gray-50 transition">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <img :src="entry.avatar" class="w-6 h-6 rounded-full" />
                    <span class="text-sm font-medium text-gray-900">{{ entry.name }}</span>
                  </div>
                </td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ entry.project }}</span></td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ entry.mon }}</span></td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ entry.tue }}</span></td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ entry.wed }}</span></td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ entry.thu }}</span></td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ entry.fri }}</span></td>
                <td class="px-6 py-4"><span class="text-sm font-semibold text-gray-900">{{ entry.total }}</span></td>
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

const timesheets = ref([
  { id: 1, name: 'John Smith', project: 'Aerospace Alpha', mon: 8, tue: 8, wed: 8, thu: 8, fri: 8, total: 40, avatar: 'https://i.pravatar.cc/50?img=11' },
  { id: 2, name: 'Sarah Johnson', project: 'Aerospace Alpha', mon: 6, tue: 7, wed: 8, thu: 7, fri: 6, total: 34, avatar: 'https://i.pravatar.cc/50?img=12' },
  { id: 3, name: 'Mike Lee', project: 'Defense System', mon: 8, tue: 6, wed: 4, thu: 8, fri: 6, total: 32, avatar: 'https://i.pravatar.cc/50?img=13' },
  { id: 4, name: 'Emily Davis', project: 'Medical Imaging', mon: 4, tue: 6, wed: 6, thu: 4, fri: 8, total: 28, avatar: 'https://i.pravatar.cc/50?img=14' },
  { id: 5, name: 'Lisa Chen', project: 'Composite Research', mon: 6, tue: 4, wed: 6, thu: 6, fri: 4, total: 26, avatar: 'https://i.pravatar.cc/50?img=16' }
])
</script>