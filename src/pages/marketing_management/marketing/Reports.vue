<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Reports</h1>
          <p class="text-gray-500 text-sm mt-1">View and generate marketing reports</p>
        </div>
        <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-lg shadow-purple-200 flex items-center gap-2 mt-3 md:mt-0">
          <i class="fa-solid fa-download"></i> Generate Report
        </button>
      </div>

      <!-- Report Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div v-for="report in reports" :key="report.id" class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition">
          <div class="text-3xl mb-2">{{ report.icon }}</div>
          <h3 class="text-lg font-bold text-gray-900">{{ report.name }}</h3>
          <p class="text-sm text-gray-500">{{ report.description }}</p>
          <p class="text-xs text-gray-400 mt-2">Last updated: {{ report.updated }}</p>
          <button class="mt-3 w-full bg-purple-50 text-purple-600 py-2 rounded-xl text-sm font-medium hover:bg-purple-100 transition">View Report</button>
        </div>
      </div>

      <!-- Scheduled Reports -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 class="text-gray-900 font-semibold mb-4">Scheduled Reports</h3>
        <div class="divide-y divide-gray-100">
          <div v-for="schedule in scheduledReports" :key="schedule.name" class="flex items-center justify-between py-3">
            <div>
              <p class="text-sm font-medium text-gray-900">{{ schedule.name }}</p>
              <p class="text-xs text-gray-500">Frequency: {{ schedule.frequency }}</p>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-xs px-2 py-1 rounded-full" :class="schedule.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'">{{ schedule.status }}</span>
              <button class="text-purple-600 text-sm hover:text-purple-800">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const reports = ref([
  { id: 1, name: 'Campaign Performance', description: 'Complete overview of all campaign metrics', icon: '📊', updated: 'Oct 15, 2026' },
  { id: 2, name: 'Lead Generation Report', description: 'Lead sources, conversion rates, and trends', icon: '👤', updated: 'Oct 14, 2026' },
  { id: 3, name: 'ROI Analysis', description: 'Return on investment for all marketing channels', icon: '💰', updated: 'Oct 13, 2026' }
])

const scheduledReports = ref([
  { name: 'Weekly Marketing Digest', frequency: 'Every Monday at 9:00 AM', status: 'Active' },
  { name: 'Monthly Performance Report', frequency: 'First of each month', status: 'Active' },
  { name: 'Q4 Campaign Analysis', frequency: 'Quarterly', status: 'Pending' }
])
</script>