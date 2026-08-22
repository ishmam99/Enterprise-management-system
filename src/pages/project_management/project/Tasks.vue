<template>
  <div class="min-h-screen w-5/6 bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
    <div class=" mx-auto">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
              <span class="text-2xl">✅</span>
            </div>
            <div>
              <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Tasks</h1>
              <p class="text-gray-500 text-sm">Manage project tasks</p>
            </div>
          </div>
        </div>
        <RouterLink to="/project_management/tasks/create" class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-lg shadow-green-500/30 flex items-center gap-2 mt-3 md:mt-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Task
        </RouterLink>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-lg transition text-center">
          <p class="text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">{{ stats.total }}</p>
          <p class="text-xs text-gray-500 font-medium">Total Tasks</p>
          <div class="w-10 h-1 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full mx-auto mt-1"></div>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-lg transition text-center">
          <p class="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">{{ stats.inProgress }}</p>
          <p class="text-xs text-gray-500 font-medium">In Progress</p>
          <div class="w-10 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mx-auto mt-1"></div>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-lg transition text-center">
          <p class="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{{ stats.completed }}</p>
          <p class="text-xs text-gray-500 font-medium">Completed</p>
          <div class="w-10 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mt-1"></div>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-lg transition text-center">
          <p class="text-2xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">{{ stats.overdue }}</p>
          <p class="text-xs text-gray-500 font-medium">Overdue</p>
          <div class="w-10 h-1 bg-gradient-to-r from-red-500 to-rose-500 rounded-full mx-auto mt-1"></div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm mb-6">
        <div class="flex flex-wrap gap-3 items-end">
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">Project</label>
            <select v-model="filters.project_id" class="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option value="">All Projects</option>
              <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">Status</label>
            <select v-model="filters.status" class="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">Search</label>
            <input type="text" v-model="filters.search" placeholder="Search tasks..." class="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 w-48 focus:ring-2 focus:ring-green-500 focus:border-transparent">
          </div>
          <button @click="fetchTasks" class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition">Apply</button>
          <button @click="resetFilters" class="text-gray-400 text-sm hover:text-gray-600">Clear</button>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-12">
        <svg class="w-12 h-12 animate-spin text-green-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-gray-500 mt-2">Loading tasks...</p>
      </div>

      <!-- Table -->
      <div v-else class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gradient-to-r from-green-50/50 to-emerald-50/50 border-b border-gray-200">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Milestone</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-if="tasks.length === 0">
                <td colspan="6" class="px-6 py-8 text-center text-gray-500">No tasks found</td>
              </tr>
              <tr v-for="task in tasks" :key="task.id" class="hover:bg-green-50/50 transition">
                <td class="px-6 py-4">
                  <div>
                    <p class="text-sm font-semibold text-gray-900">{{ task.title }}</p>
                    <p class="text-xs text-gray-500">{{ task.description }}</p>
                  </div>
                </td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ getProjectName(task.project_id) }}</span></td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ getMilestoneName(task.milestone_id) }}</span></td>
                <td class="px-6 py-4">
                  <span class="text-xs px-3 py-1 rounded-full font-medium" :class="getStatusClass(task.status)">{{ task.status }}</span>
                </td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ task.due_date || '-' }}</span></td>
                <td class="px-6 py-4 text-right">
                  <button @click="openEditModal(task)" class="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                  <button @click="confirmDelete(task)" class="text-red-600 hover:text-red-800 ml-3 text-sm font-medium">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="px-6 py-3 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
          <p class="text-sm text-gray-500">Showing {{ tasks.length }} tasks</p>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="closeEditModal">
      <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-gray-900">Edit Task</h3>
          <button @click="closeEditModal" class="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        <form @submit.prevent="updateTask" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title <span class="text-red-500">*</span></label>
            <input type="text" v-model="editForm.title" required class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Project <span class="text-red-500">*</span></label>
            <select v-model="editForm.project_id" required class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Milestone</label>
            <select v-model="editForm.milestone_id" class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option :value="null">None</option>
              <option v-for="milestone in filteredMilestones" :key="milestone.id" :value="milestone.id">{{ milestone.title }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea v-model="editForm.description" rows="2" class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select v-model="editForm.status" class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input type="date" v-model="editForm.due_date" class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent">
          </div>
          <div class="flex gap-3 pt-2">
            <button type="button" @click="closeEditModal" class="flex-1 border border-gray-200 text-gray-700 py-2 rounded-xl hover:bg-gray-50 transition">Cancel</button>
            <button type="submit" class="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 rounded-xl hover:shadow-lg transition shadow-green-500/30" :disabled="isSubmitting">
              {{ isSubmitting ? 'Saving...' : 'Update Task' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="showDeleteModal = false">
      <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl text-center">
        <div class="text-5xl mb-4">🗑️</div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Delete Task?</h3>
        <p class="text-gray-500">Are you sure you want to delete <strong>{{ deleteTarget?.title }}</strong>?</p>
        <div class="flex gap-3 mt-6">
          <button @click="showDeleteModal = false" class="flex-1 border border-gray-200 text-gray-700 py-2 rounded-xl hover:bg-gray-50 transition">Cancel</button>
          <button @click="deleteTask" class="flex-1 bg-gradient-to-r from-red-600 to-rose-600 text-white py-2 rounded-xl hover:shadow-lg transition shadow-red-600/30">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
// import api from '@/utils/api'

const tasks = ref([])
const projects = ref([])
const milestones = ref([])
const loading = ref(false)
const isSubmitting = ref(false)

const filters = ref({ project_id: '', status: '', search: '' })

const showEditModal = ref(false)
const showDeleteModal = ref(false)
const editForm = ref({})
const editId = ref(null)
const deleteTarget = ref(null)

// Fetch projects
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
  try {
    const { data } = await api().get('/milestones')
    milestones.value = data.data || data
  } catch (error) {
    console.error('Failed to fetch milestones:', error)
  }
}

// Fetch tasks
const fetchTasks = async () => {
  loading.value = true
  try {
    const params = {}
    if (filters.value.project_id) params.project_id = filters.value.project_id
    if (filters.value.status) params.status = filters.value.status
    if (filters.value.search) params.search = filters.value.search

    const { data } = await api().get('/tasks', { params })
    tasks.value = data.data || data
  } catch (error) {
    console.error('Failed to fetch tasks:', error)
  } finally {
    loading.value = false
  }
}

// Filtered milestones for dropdown based on selected project
const filteredMilestones = computed(() => {
  if (!editForm.value.project_id) return []
  return milestones.value.filter(m => m.project_id === editForm.value.project_id)
})

// Get project name
const getProjectName = (id) => {
  if (!id) return 'Unknown'
  const project = projects.value.find(p => p.id === id)
  return project ? project.name : 'Unknown'
}

// Get milestone name
const getMilestoneName = (id) => {
  if (!id) return 'None'
  const milestone = milestones.value.find(m => m.id === id)
  return milestone ? milestone.title : 'None'
}

// Status badge class
const getStatusClass = (status) => {
  const map = {
    'Pending': 'bg-yellow-100 text-yellow-700',
    'In Progress': 'bg-blue-100 text-blue-700',
    'Completed': 'bg-green-100 text-green-700',
    'Overdue': 'bg-red-100 text-red-700'
  }
  return map[status] || 'bg-gray-100 text-gray-700'
}

// Stats
const stats = computed(() => {
  const total = tasks.value.length
  const inProgress = tasks.value.filter(t => t.status === 'In Progress').length
  const completed = tasks.value.filter(t => t.status === 'Completed').length
  const overdue = tasks.value.filter(t => t.status === 'Overdue').length
  return { total, inProgress, completed, overdue }
})

// Reset filters
const resetFilters = () => {
  filters.value = { project_id: '', status: '', search: '' }
  fetchTasks()
}

// Open edit modal
const openEditModal = (task) => {
  editId.value = task.id
  editForm.value = { ...task }
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  editForm.value = {}
  editId.value = null
}

// Update task
const updateTask = async () => {
  if (!editId.value) return
  isSubmitting.value = true
  try {
    await api().put(`/tasks/${editId.value}`, editForm.value)
    await fetchTasks()
    closeEditModal()
  } catch (error) {
    console.error('Failed to update task:', error)
  } finally {
    isSubmitting.value = false
  }
}

// Confirm delete
const confirmDelete = (task) => {
  deleteTarget.value = task
  showDeleteModal.value = true
}

// Delete task
const deleteTask = async () => {
  if (!deleteTarget.value) return
  try {
    await api().delete(`/tasks/${deleteTarget.value.id}`)
    await fetchTasks()
    showDeleteModal.value = false
    deleteTarget.value = null
  } catch (error) {
    console.error('Failed to delete task:', error)
  }
}

// Load all data
onMounted(() => {
  Promise.all([fetchProjects(), fetchMilestones(), fetchTasks()])
})
</script>