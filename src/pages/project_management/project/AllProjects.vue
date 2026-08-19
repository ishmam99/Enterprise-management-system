<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">All Projects</h1>
          <p class="text-gray-500 text-sm mt-1">Manage all projects across the organization</p>
        </div>
        <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-lg shadow-purple-200 flex items-center gap-2 mt-3 md:mt-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          New Project
        </button>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm mb-6">
        <div class="flex flex-wrap gap-3 items-end">
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">Status</label>
            <select class="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option>All Status</option>
              <option>Active</option>
              <option>In Review</option>
              <option>Completed</option>
              <option>On Hold</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">Priority</label>
            <select class="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option>All Priorities</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">Search</label>
            <input type="text" placeholder="Search projects..." class="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 w-48 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
          </div>
          <button class="bg-purple-50 text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-100 transition">Apply</button>
        </div>
      </div>

      <!-- Table -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-100">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Manager</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="project in projects" :key="project.id" class="hover:bg-gray-50 transition">
                <td class="px-6 py-4">
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ project.name }}</p>
                    <p class="text-xs text-gray-500">{{ project.client }}</p>
                  </div>
                </td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ project.manager }}</span></td>
                <td class="px-6 py-4">
                  <span class="text-xs px-2 py-1 rounded-full" :class="getStatusClass(project.status)">{{ project.status }}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-xs px-2 py-1 rounded-full" :class="getPriorityClass(project.priority)">{{ project.priority }}</span>
                </td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ project.dueDate }}</span></td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <div class="w-20 bg-gray-200 rounded-full h-2">
                      <div class="h-2 rounded-full" :style="{ width: project.progress + '%', backgroundColor: project.progress > 75 ? '#10B981' : project.progress > 40 ? '#F59E0B' : '#7C3AED' }"></div>
                    </div>
                    <span class="text-xs font-semibold text-gray-700">{{ project.progress }}%</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-right">
                  <button class="text-purple-600 hover:text-purple-800 text-sm font-medium">View</button>
                  <button class="text-gray-400 hover:text-gray-600 ml-3 text-sm">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="px-6 py-3 border-t border-gray-100 flex items-center justify-between">
          <p class="text-sm text-gray-500">Showing 1-5 of 12 projects</p>
          <div class="flex gap-2">
            <button class="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">Previous</button>
            <button class="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm">1</button>
            <button class="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">2</button>
            <button class="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">3</button>
            <button class="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const projects = ref([
  { id: 1, name: 'Aerospace Project Alpha', client: 'Boeing', manager: 'John Smith', status: 'Active', priority: 'High', dueDate: 'Dec 15, 2026', progress: 85 },
  { id: 2, name: 'Defense System Integration', client: 'Lockheed Martin', manager: 'Sarah Johnson', status: 'Active', priority: 'High', dueDate: 'Jan 30, 2027', progress: 65 },
  { id: 3, name: 'Medical Imaging Platform', client: 'Siemens', manager: 'Mike Lee', status: 'In Review', priority: 'Medium', dueDate: 'Nov 20, 2026', progress: 45 },
  { id: 4, name: 'Composite Research Phase 2', client: 'NASA', manager: 'Emily Davis', status: 'Active', priority: 'Medium', dueDate: 'Mar 15, 2027', progress: 30 },
  { id: 5, name: 'Space Component Testing', client: 'SpaceX', manager: 'John Smith', status: 'On Hold', priority: 'Low', dueDate: 'Oct 30, 2026', progress: 15 }
])

const getStatusClass = (status) => {
  const map = {
    'Active': 'bg-green-100 text-green-700',
    'In Review': 'bg-blue-100 text-blue-700',
    'Completed': 'bg-purple-100 text-purple-700',
    'On Hold': 'bg-yellow-100 text-yellow-700'
  }
  return map[status] || 'bg-gray-100 text-gray-700'
}

const getPriorityClass = (priority) => {
  const map = {
    'High': 'bg-red-100 text-red-700',
    'Medium': 'bg-orange-100 text-orange-700',
    'Low': 'bg-blue-100 text-blue-700'
  }
  return map[priority] || 'bg-gray-100 text-gray-700'
}
</script>