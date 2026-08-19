<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Project Reports</h1>
          <p class="text-gray-500 text-sm mt-1">View project performance and status reports</p>
        </div>
        <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-lg shadow-purple-200 flex items-center gap-2 mt-3 md:mt-0">
          <i class="fa-solid fa-download"></i> Generate Report
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <!-- Project Status Summary -->
        <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Project Status Summary</h3>
          <div class="space-y-3">
            <div v-for="status in projectStatusSummary" :key="status.name" class="flex items-center gap-3">
              <span class="text-xs text-gray-600 w-20">{{ status.name }}</span>
              <div class="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                <div class="h-full rounded-full" :style="{ width: status.percentage + '%', backgroundColor: status.color }"></div>
              </div>
              <span class="text-xs font-medium text-gray-700 w-16 text-right">{{ status.count }}</span>
            </div>
          </div>
        </div>

        <!-- Resource Utilization -->
        <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Resource Utilization</h3>
          <div class="space-y-3">
            <div v-for="resource in resourceUtilization" :key="resource.name" class="flex items-center gap-3">
              <span class="text-xs text-gray-600 w-24">{{ resource.name }}</span>
              <div class="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                <div class="h-full rounded-full" :style="{ width: resource.percentage + '%', backgroundColor: resource.percentage > 75 ? '#10B981' : resource.percentage > 40 ? '#F59E0B' : '#7C3AED' }"></div>
              </div>
              <span class="text-xs font-medium text-gray-700 w-16 text-right">{{ resource.percentage }}%</span>
            </div>
          </div>
        </div>

        <!-- Recent Reports -->
        <div class="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
          <div class="divide-y divide-gray-100">
            <div v-for="report in recentReports" :key="report.id" class="flex items-center justify-between py-3">
              <div>
                <p class="text-sm font-medium text-gray-900">{{ report.name }}</p>
                <p class="text-xs text-gray-500">Generated: {{ report.date }}</p>
              </div>
              <div class="flex gap-2">
                <span class="text-xs px-2 py-1 rounded-full" :class="report.status === 'Ready' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'">{{ report.status }}</span>
                <button class="text-purple-600 text-sm hover:text-purple-800">Download</button>
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

const projectStatusSummary = ref([
  { name: 'Active', count: 7, percentage: 58, color: '#3B82F6' },
  { name: 'In Review', count: 3, percentage: 25, color: '#F59E0B' },
  { name: 'Completed', count: 2, percentage: 17, color: '#10B981' }
])

const resourceUtilization = ref([
  { name: 'John Smith', percentage: 85 },
  { name: 'Sarah Johnson', percentage: 72 },
  { name: 'Mike Lee', percentage: 65 },
  { name: 'Emily Davis', percentage: 58 },
  { name: 'Lisa Chen', percentage: 45 }
])

const recentReports = ref([
  { id: 1, name: 'Monthly Project Status Report', date: 'Oct 15, 2026', status: 'Ready' },
  { id: 2, name: 'Q4 Resource Allocation Report', date: 'Oct 10, 2026', status: 'Ready' },
  { id: 3, name: 'Project Alpha Final Report', date: 'Oct 5, 2026', status: 'Generating...' },
  { id: 4, name: 'Defense System Progress Report', date: 'Sep 30, 2026', status: 'Ready' }
])
</script>