<template>
  <div class="min-h-screen w-5/6 bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
    <div class=" mx-auto">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/30">
              <span class="text-2xl">⚠️</span>
            </div>
            <div>
              <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Risks</h1>
              <p class="text-gray-500 text-sm">Manage project risks and mitigation</p>
            </div>
          </div>
        </div>
        <RouterLink to="/project_management/risks/create" class="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-lg shadow-red-500/30 flex items-center gap-2 mt-3 md:mt-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Risk
        </RouterLink>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-lg transition text-center">
          <p class="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">5</p>
          <p class="text-xs text-gray-500 font-medium">Total Risks</p>
          <div class="w-10 h-1 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full mx-auto mt-1"></div>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-lg transition text-center">
          <p class="text-3xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">2</p>
          <p class="text-xs text-gray-500 font-medium">Critical</p>
          <div class="w-10 h-1 bg-gradient-to-r from-red-500 to-rose-500 rounded-full mx-auto mt-1"></div>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-lg transition text-center">
          <p class="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">2</p>
          <p class="text-xs text-gray-500 font-medium">High</p>
          <div class="w-10 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mx-auto mt-1"></div>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-lg transition text-center">
          <p class="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">1</p>
          <p class="text-xs text-gray-500 font-medium">Medium</p>
          <div class="w-10 h-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full mx-auto mt-1"></div>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gradient-to-r from-red-50/50 to-rose-50/50 border-b border-gray-200">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mitigation Plan</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="item in risks" :key="item.id" class="hover:bg-red-50/50 transition">
                <td class="px-6 py-4"><span class="text-sm font-semibold text-gray-900">{{ item.title }}</span></td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ getProjectName(item.project_id) }}</span></td>
                <td class="px-6 py-4">
                  <span class="text-xs px-3 py-1 rounded-full font-medium" :class="getSeverityClass(item.severity)">{{ item.severity }}</span>
                </td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ item.mitigation_plan || '-' }}</span></td>
                <td class="px-6 py-4 text-right">
                  <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                  <button class="text-red-600 hover:text-red-800 ml-3 text-sm font-medium">Delete</button>
                </td>
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

const projects = ref([
  { id: 1, name: 'Aerospace Project Alpha' },
  { id: 2, name: 'Defense System Integration' }
])

const risks = ref([
  { id: 1, project_id: 1, title: 'Material Supply Delay', severity: 'Critical', mitigation_plan: 'Secure backup supplier' },
  { id: 2, project_id: 1, title: 'Technical Design Issue', severity: 'High', mitigation_plan: 'Additional design review' },
  { id: 3, project_id: 2, title: 'Integration Failure', severity: 'Critical', mitigation_plan: 'Early testing and validation' },
  { id: 4, project_id: 1, title: 'Budget Overrun', severity: 'High', mitigation_plan: 'Monthly budget review' },
  { id: 5, project_id: 2, title: 'Resource Shortage', severity: 'Medium', mitigation_plan: 'Cross-train team members' }
])

const getProjectName = (id) => {
  const project = projects.value.find(p => p.id === id)
  return project ? project.name : 'Unknown'
}

const getSeverityClass = (severity) => {
  const map = {
    'Critical': 'bg-red-100 text-red-700',
    'High': 'bg-orange-100 text-orange-700',
    'Medium': 'bg-yellow-100 text-yellow-700',
    'Low': 'bg-blue-100 text-blue-700'
  }
  return map[severity] || 'bg-gray-100 text-gray-700'
}
</script>