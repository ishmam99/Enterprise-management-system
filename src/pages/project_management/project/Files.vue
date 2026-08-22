<template>
  <div class="min-h-screen w-5/6 bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
    <div class="mx-auto">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <span class="text-2xl">📁</span>
            </div>
            <div>
              <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Files</h1>
              <p class="text-gray-500 text-sm">Manage project files and documents</p>
            </div>
          </div>
        </div>
        <RouterLink to="/project_management/files/create" class="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-lg shadow-cyan-500/30 flex items-center gap-2 mt-3 md:mt-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Upload File
        </RouterLink>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-lg transition text-center">
          <p class="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">32</p>
          <p class="text-xs text-gray-500 font-medium">Total Files</p>
          <div class="w-10 h-1 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full mx-auto mt-1"></div>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-lg transition text-center">
          <p class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">8</p>
          <p class="text-xs text-gray-500 font-medium">Uploaded This Week</p>
          <div class="w-10 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mt-1"></div>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-lg transition text-center">
          <p class="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">2.4 GB</p>
          <p class="text-xs text-gray-500 font-medium">Total Storage</p>
          <div class="w-10 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mx-auto mt-1"></div>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gradient-to-r from-cyan-50/50 to-blue-50/50 border-b border-gray-200">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Filename</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="item in files" :key="item.id" class="hover:bg-cyan-50/50 transition">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <span class="text-xl">{{ getFileIcon(item.filename) }}</span>
                    <span class="text-sm font-semibold text-gray-900">{{ item.filename }}</span>
                  </div>
                </td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ getProjectName(item.project_id) }}</span></td>
                <td class="px-6 py-4">
                  <span class="text-xs px-3 py-1 rounded-full font-medium" :class="item.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'">{{ item.status }}</span>
                </td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ item.uploaded }}</span></td>
                <td class="px-6 py-4 text-right">
                  <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">Download</button>
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

const files = ref([
  { id: 1, project_id: 1, filename: 'Project_Specs_v2.pdf', status: 'active', uploaded: '2026-10-15' },
  { id: 2, project_id: 1, filename: 'CAD_Models_v3.dwg', status: 'active', uploaded: '2026-10-14' },
  { id: 3, project_id: 2, filename: 'Integration_Plan.docx', status: 'pending', uploaded: '2026-10-12' },
  { id: 4, project_id: 1, filename: 'Material_Data_Sheet.xlsx', status: 'active', uploaded: '2026-10-10' }
])

const getProjectName = (id) => {
  const project = projects.value.find(p => p.id === id)
  return project ? project.name : 'Unknown'
}

const getFileIcon = (filename) => {
  const ext = filename.split('.').pop().toLowerCase()
  const map = {
    'pdf': '📄',
    'docx': '📝',
    'doc': '📝',
    'xlsx': '📊',
    'xls': '📊',
    'dwg': '📐',
    'dxf': '📐',
    'jpg': '🖼️',
    'png': '🖼️',
    'zip': '📦',
    'rar': '📦'
  }
  return map[ext] || '📁'
}
</script>