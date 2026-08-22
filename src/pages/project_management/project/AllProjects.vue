<template>
  <div class="min-h-screen w-5/6 bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
    <div class=" mx-auto">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <span class="text-2xl">📋</span>
            </div>
            <div>
              <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Projects</h1>
              <p class="text-gray-500 text-sm">Manage all projects</p>
            </div>
          </div>
        </div>
        <RouterLink to="/project_management/projects/create" class="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-lg shadow-purple-500/30 flex items-center gap-2 mt-3 md:mt-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Project
        </RouterLink>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm mb-6">
        <div class="flex flex-wrap gap-3 items-end">
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">Status</label>
            <select v-model="filters.status" class="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option value="">All Status</option>
              <option value="planning">Planning</option>
              <option value="active">Active</option>
              <option value="review">Review</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">Search</label>
            <input type="text" v-model="filters.search" placeholder="Search projects..." class="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 w-48 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
          </div>
          <button @click="fetchProjects" class="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition">Apply</button>
          <button @click="resetFilters" class="text-gray-400 text-sm hover:text-gray-600">Clear</button>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-12">
        <svg class="w-12 h-12 animate-spin text-purple-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-gray-500 mt-2">Loading projects...</p>
      </div>

      <!-- Table -->
      <div v-else class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-if="projects.length === 0">
                <td colspan="6" class="px-6 py-8 text-center text-gray-500">No projects found</td>
              </tr>
              <tr v-for="project in projects" :key="project.id" class="hover:bg-purple-50/50 transition">
                <td class="px-6 py-4">
                  <div>
                    <p class="text-sm font-semibold text-gray-900">{{ project.name }}</p>
                    <p class="text-xs text-gray-500">{{ project.description }}</p>
                  </div>
                </td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ project.start_date || '-' }}</span></td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ project.end_date || '-' }}</span></td>
                <td class="px-6 py-4"><span class="text-sm font-semibold text-emerald-600">${{ project.budget || 0 }}K</span></td>
                <td class="px-6 py-4">
                  <span class="text-xs px-3 py-1 rounded-full font-medium" :class="getStatusClass(project.status)">{{ project.status }}</span>
                </td>
                <td class="px-6 py-4 text-right">
                  <button @click="openEditModal(project)" class="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                  <button @click="confirmDelete(project)" class="text-red-600 hover:text-red-800 ml-3 text-sm font-medium">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Pagination (simplified) -->
        <div class="px-6 py-3 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
          <p class="text-sm text-gray-500">Showing {{ projects.length }} projects</p>
          <!-- Add pagination controls if your API supports pagination -->
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="closeEditModal">
      <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-gray-900">Edit Project</h3>
          <button @click="closeEditModal" class="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        <form @submit.prevent="updateProject" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input type="text" v-model="editForm.name" required class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea v-model="editForm.description" rows="2" class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"></textarea>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input type="date" v-model="editForm.start_date" class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input type="date" v-model="editForm.end_date" class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Budget ($K)</label>
            <input type="number" step="0.1" v-model="editForm.budget" class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select v-model="editForm.status" class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option value="planning">Planning</option>
              <option value="active">Active</option>
              <option value="review">Review</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </select>
          </div>
          <div class="flex gap-3 pt-2">
            <button type="button" @click="closeEditModal" class="flex-1 border border-gray-200 text-gray-700 py-2 rounded-xl hover:bg-gray-50 transition">Cancel</button>
            <button type="submit" class="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-xl hover:shadow-lg transition shadow-purple-500/30" :disabled="isSubmitting">
              {{ isSubmitting ? 'Saving...' : 'Update Project' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="showDeleteModal = false">
      <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl text-center">
        <div class="text-5xl mb-4">🗑️</div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Delete Project?</h3>
        <p class="text-gray-500">Are you sure you want to delete <strong>{{ deleteTarget?.name }}</strong>?</p>
        <div class="flex gap-3 mt-6">
          <button @click="showDeleteModal = false" class="flex-1 border border-gray-200 text-gray-700 py-2 rounded-xl hover:bg-gray-50 transition">Cancel</button>
          <button @click="deleteProject" class="flex-1 bg-gradient-to-r from-red-600 to-rose-600 text-white py-2 rounded-xl hover:shadow-lg transition shadow-red-600/30">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import api from '@/utils/api' // adjust path to your api helper

const projects = ref([])
const loading = ref(false)
const isSubmitting = ref(false)

const filters = ref({ status: '', search: '' })

const showEditModal = ref(false)
const showDeleteModal = ref(false)
const editForm = ref({})
const editId = ref(null)
const deleteTarget = ref(null)

// Fetch projects from API
const fetchProjects = async () => {
  loading.value = true
  try {
    const params = {}
    if (filters.value.status) params.status = filters.value.status
    if (filters.value.search) params.search = filters.value.search

    const { data } = await api().get('/projects', { params })
    // Adjust based on your API response structure
    projects.value = data.data || data
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    // Optionally show a toast/error message
  } finally {
    loading.value = false
  }
}

// Reset filters
const resetFilters = () => {
  filters.value = { status: '', search: '' }
  fetchProjects()
}

// Open edit modal
const openEditModal = (project) => {
  editId.value = project.id
  editForm.value = { ...project }
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  editForm.value = {}
  editId.value = null
}

// Update project
const updateProject = async () => {
  if (!editId.value) return
  isSubmitting.value = true
  try {
    await api().put(`/projects/${editId.value}`, editForm.value)
    await fetchProjects()
    closeEditModal()
  } catch (error) {
    console.error('Failed to update project:', error)
  } finally {
    isSubmitting.value = false
  }
}

// Confirm delete
const confirmDelete = (project) => {
  deleteTarget.value = project
  showDeleteModal.value = true
}

// Delete project
const deleteProject = async () => {
  if (!deleteTarget.value) return
  try {
    await api().delete(`/projects/${deleteTarget.value.id}`)
    await fetchProjects()
    showDeleteModal.value = false
    deleteTarget.value = null
  } catch (error) {
    console.error('Failed to delete project:', error)
  }
}

// Status badge class
const getStatusClass = (status) => {
  const map = {
    'planning': 'bg-blue-100 text-blue-700',
    'active': 'bg-green-100 text-green-700',
    'review': 'bg-orange-100 text-orange-700',
    'completed': 'bg-purple-100 text-purple-700',
    'on-hold': 'bg-red-100 text-red-700'
  }
  return map[status] || 'bg-gray-100 text-gray-700'
}

// Load projects on mount
onMounted(() => {
  fetchProjects()
})
</script>