<template>
  <div class="min-h-screen w-5/6 bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
    <div class=" mx-auto">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span class="text-2xl">🎯</span>
            </div>
            <div>
              <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Milestones</h1>
              <p class="text-gray-500 text-sm">Manage project milestones</p>
            </div>
          </div>
        </div>
        <RouterLink to="/project_management/milestones/create" class="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-lg shadow-blue-500/30 flex items-center gap-2 mt-3 md:mt-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Milestone
        </RouterLink>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm mb-6">
        <div class="flex flex-wrap gap-3 items-end">
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">Project</label>
            <select v-model="filters.project_id" class="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">All Projects</option>
              <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">Search</label>
            <input type="text" v-model="filters.search" placeholder="Search milestones..." class="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 w-48 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          </div>
          <button @click="fetchMilestones" class="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition">Apply</button>
          <button @click="resetFilters" class="text-gray-400 text-sm hover:text-gray-600">Clear</button>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-12">
        <svg class="w-12 h-12 animate-spin text-blue-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-gray-500 mt-2">Loading milestones...</p>
      </div>

      <!-- Table -->
      <div v-else class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gradient-to-r from-blue-50/50 to-cyan-50/50 border-b border-gray-200">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-if="milestones.length === 0">
                <td colspan="4" class="px-6 py-8 text-center text-gray-500">No milestones found</td>
              </tr>
              <tr v-for="item in milestones" :key="item.id" class="hover:bg-blue-50/50 transition">
                <td class="px-6 py-4"><span class="text-sm font-semibold text-gray-900">{{ item.title }}</span></td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ getProjectName(item.project_id) }}</span></td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ item.due_date || '-' }}</span></td>
                <td class="px-6 py-4 text-right">
                  <button @click="openEditModal(item)" class="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                  <button @click="confirmDelete(item)" class="text-red-600 hover:text-red-800 ml-3 text-sm font-medium">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="px-6 py-3 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
          <p class="text-sm text-gray-500">Showing {{ milestones.length }} milestones</p>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="closeEditModal">
      <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-gray-900">Edit Milestone</h3>
          <button @click="closeEditModal" class="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        <form @submit.prevent="updateMilestone" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title <span class="text-red-500">*</span></label>
            <input type="text" v-model="editForm.title" required class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Project <span class="text-red-500">*</span></label>
            <select v-model="editForm.project_id" required class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input type="date" v-model="editForm.due_date" class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          </div>
          <div class="flex gap-3 pt-2">
            <button type="button" @click="closeEditModal" class="flex-1 border border-gray-200 text-gray-700 py-2 rounded-xl hover:bg-gray-50 transition">Cancel</button>
            <button type="submit" class="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2 rounded-xl hover:shadow-lg transition shadow-blue-500/30" :disabled="isSubmitting">
              {{ isSubmitting ? 'Saving...' : 'Update Milestone' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="showDeleteModal = false">
      <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl text-center">
        <div class="text-5xl mb-4">🗑️</div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Delete Milestone?</h3>
        <p class="text-gray-500">Are you sure you want to delete <strong>{{ deleteTarget?.title }}</strong>?</p>
        <div class="flex gap-3 mt-6">
          <button @click="showDeleteModal = false" class="flex-1 border border-gray-200 text-gray-700 py-2 rounded-xl hover:bg-gray-50 transition">Cancel</button>
          <button @click="deleteMilestone" class="flex-1 bg-gradient-to-r from-red-600 to-rose-600 text-white py-2 rounded-xl hover:shadow-lg transition shadow-red-600/30">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import api from '@/utils/api'

const milestones = ref([])
const projects = ref([])
const loading = ref(false)
const isSubmitting = ref(false)

const filters = ref({ project_id: '', search: '' })

const showEditModal = ref(false)
const showDeleteModal = ref(false)
const editForm = ref({})
const editId = ref(null)
const deleteTarget = ref(null)

// Fetch projects for dropdown and name display
const fetchProjects = async () => {
  try {
    const { data } = await api().get('/projects')
    projects.value = data.data || data
  } catch (error) {
    console.error('Failed to fetch projects:', error)
  }
}

// Fetch milestones
const fetchMilestones = async () => {
  loading.value = true
  try {
    const params = {}
    if (filters.value.project_id) params.project_id = filters.value.project_id
    if (filters.value.search) params.search = filters.value.search

    const { data } = await api().get('/milestones', { params })
    milestones.value = data.data || data
  } catch (error) {
    console.error('Failed to fetch milestones:', error)
  } finally {
    loading.value = false
  }
}

// Get project name by id
const getProjectName = (id) => {
  if (!id) return 'Unknown'
  const project = projects.value.find(p => p.id === id)
  return project ? project.name : 'Unknown'
}

// Reset filters
const resetFilters = () => {
  filters.value = { project_id: '', search: '' }
  fetchMilestones()
}

// Open edit modal
const openEditModal = (milestone) => {
  editId.value = milestone.id
  editForm.value = { ...milestone }
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  editForm.value = {}
  editId.value = null
}

// Update milestone
const updateMilestone = async () => {
  if (!editId.value) return
  isSubmitting.value = true
  try {
    await api().put(`/milestones/${editId.value}`, editForm.value)
    await fetchMilestones()
    closeEditModal()
  } catch (error) {
    console.error('Failed to update milestone:', error)
  } finally {
    isSubmitting.value = false
  }
}

// Confirm delete
const confirmDelete = (milestone) => {
  deleteTarget.value = milestone
  showDeleteModal.value = true
}

// Delete milestone
const deleteMilestone = async () => {
  if (!deleteTarget.value) return
  try {
    await api().delete(`/milestones/${deleteTarget.value.id}`)
    await fetchMilestones()
    showDeleteModal.value = false
    deleteTarget.value = null
  } catch (error) {
    console.error('Failed to delete milestone:', error)
  }
}

// Load data
onMounted(() => {
  Promise.all([fetchProjects(), fetchMilestones()])
})
</script>