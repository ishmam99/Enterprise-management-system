<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/config/api'
import { watch } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const assignments = ref([])
const loading = ref(false)
const searchQuery = ref('')
const viewMode = ref('table')
const statusFilter = ref('all')
const assigneeFilter = ref('all')
const sortBy = ref('created_at')
const sortOrder = ref('desc')
const showFilters = ref(false)

const loadAssignments = async () => {
  loading.value = true
  try {
    const res = await api().get(`/success-team-tasks?success_team_id=${authStore.team_id}&solution_id=${route.params.id}&with=solution,software,user,assignedPerson,outputs,successTeam`)
    assignments.value = res.data.data ?? res.data
  } catch (err) {
    console.error('Failed to load tasks', err)
  } finally {
    loading.value = false
  }
}

onMounted(loadAssignments)

const uniqueAssignees = computed(() => {
  const assignees = assignments.value
    .map(task => task.assigned_person)
    .filter(Boolean)
    .reduce((acc, person) => {
      if (!acc.some(p => p.id === person.id)) {
        acc.push(person)
      }
      return acc
    }, [])
  return assignees.sort((a, b) => a.name.localeCompare(b.name))
})

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' }
]

const filteredAssignments = computed(() => {
  let filtered = [...assignments.value]

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    filtered = filtered.filter(task =>
      (task.solution?.name || '').toLowerCase().includes(q) ||
      (task.software?.name || '').toLowerCase().includes(q) ||
      (task.assigned_person?.name || '').toLowerCase().includes(q) ||
      (task.description || '').toLowerCase().includes(q) ||
      (task.success_team?.name || '').toLowerCase().includes(q)
    )
  }

  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(task =>
      task.status?.toLowerCase() === statusFilter.value.toLowerCase()
    )
  }

  if (assigneeFilter.value !== 'all') {
    filtered = filtered.filter(task =>
      task.assigned_person?.id.toString() === assigneeFilter.value
    )
  }

  filtered.sort((a, b) => {
    let aVal, bVal

    switch(sortBy.value) {
      case 'created_at':
        aVal = new Date(a.created_at)
        bVal = new Date(b.created_at)
        break
      case 'software':
        aVal = a.software?.name || ''
        bVal = b.software?.name || ''
        break
      case 'assignee':
        aVal = a.assigned_person?.name || ''
        bVal = b.assigned_person?.name || ''
        break
      default:
        aVal = a[sortBy.value] || ''
        bVal = b[sortBy.value] || ''
    }

    if (sortOrder.value === 'asc') {
      return aVal > bVal ? 1 : -1
    } else {
      return aVal < bVal ? 1 : -1
    }
  })

  return filtered
})

const stats = computed(() => {
  const total = assignments.value.length
  const pending = assignments.value.filter(t => t.status === 'pending').length
  const completed = assignments.value.filter(t => t.status === 'completed').length
  const inProgress = assignments.value.filter(t => t.status === 'in_progress').length

  return {
    total,
    pending,
    completed,
    inProgress,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
  }
})

const formatDate = (date) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatRelativeDate = (date) => {
  if (!date) return ''
  const now = new Date()
  const taskDate = new Date(date)
  const diffDays = Math.floor((now - taskDate) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return formatDate(date)
}

const statusConfig = {
  pending: {
    label: 'Pending',
    textColor: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    ringColor: 'ring-amber-500',
    dotColor: 'bg-amber-500',
    gradientFrom: 'from-amber-400',
    gradientTo: 'to-amber-500'
  },
  in_progress: {
    label: 'In Progress',
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    ringColor: 'ring-blue-500',
    dotColor: 'bg-blue-500',
    gradientFrom: 'from-blue-400',
    gradientTo: 'to-blue-500'
  },
  completed: {
    label: 'Completed',
    textColor: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    ringColor: 'ring-emerald-500',
    dotColor: 'bg-emerald-500',
    gradientFrom: 'from-emerald-400',
    gradientTo: 'to-emerald-500'
  }
}

const getStatusConfig = (status) => {
  return statusConfig[status?.toLowerCase()] || statusConfig.pending
}

const getOutputSummary = (outputs) => {
  if (!outputs || outputs.length === 0) return 'No updates yet'
  const latest = outputs[outputs.length - 1]
  return latest.output.length > 50 ? latest.output.substring(0, 50) + '...' : latest.output
}

const deleteTask = async (id, name) => {
  if (!confirm(`Are you sure you want to delete task "${name}"?`)) return
  try {
    await api().delete(`/success-team-tasks/${id}`)
    assignments.value = assignments.value.filter(t => t.id !== id)
  } catch (err) {
    alert('Failed to delete task')
  }
}

const toggleSort = (field) => {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = field
    sortOrder.value = 'asc'
  }
}

const resetFilters = () => {
  searchQuery.value = ''
  statusFilter.value = 'all'
  assigneeFilter.value = 'all'
  sortBy.value = 'created_at'
  sortOrder.value = 'desc'
  showFilters.value = false
}
watch(()=>route.params.id,()=>{
  loadAssignments()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-16 pt-10 px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <div class="mb-10">
        <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-3 h-8 rounded-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
              <h1 class="text-3xl font-bold text-gray-900">Task List By Solution : {{ route.query.name }}</h1>
            </div>
            <p class="text-gray-600 max-w-2xl">
              Track and manage success team tasks and assignments with real-time updates and progress monitoring.
            </p>
          </div>
          <div class="flex gap-3">
            <button
              class="px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:-translate-y-0.5"
            @click="router.push('/assignments/create')" >
              <i class="fas fa-plus"></i>
              Create Task
            </button>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Total Tasks</p>
                <p class="text-2xl font-bold text-gray-900 mt-1">{{ stats.total }}</p>
              </div>
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <i class="fas fa-tasks text-blue-600 text-xl"></i>
              </div>
            </div>
            <div class="mt-4 text-xs text-gray-500">
              <span class="flex items-center gap-1">
                <i class="fas fa-arrow-up text-emerald-500"></i>
                <span class="text-emerald-600 font-medium">{{ stats.completed }}</span> completed
              </span>
            </div>
          </div>

          <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">In Progress</p>
                <p class="text-2xl font-bold text-blue-600 mt-1">{{ stats.inProgress }}</p>
              </div>
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                <i class="fas fa-spinner text-blue-500 text-xl"></i>
              </div>
            </div>
            <div class="mt-4 text-xs text-gray-500">
              Currently active tasks
            </div>
          </div>

          <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Pending</p>
                <p class="text-2xl font-bold text-amber-600 mt-1">{{ stats.pending }}</p>
              </div>
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
                <i class="fas fa-clock text-amber-500 text-xl"></i>
              </div>
            </div>
            <div class="mt-4 text-xs text-gray-500">
              Awaiting assignment or start
            </div>
          </div>

          <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Completion Rate</p>
                <p class="text-2xl font-bold text-emerald-600 mt-1">{{ stats.completionRate }}%</p>
              </div>
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center">
                <i class="fas fa-check-circle text-emerald-500 text-xl"></i>
              </div>
            </div>
            <div class="mt-4">
              <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                  :style="{ width: stats.completionRate + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <div class="flex flex-col lg:flex-row gap-6">
          <div class="flex-1">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i class="fas fa-search text-gray-400"></i>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                class="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Search tasks, solutions, software, or assignees..."
              />
              <div v-if="searchQuery" class="absolute inset-y-0 right-0 pr-4 flex items-center">
                <button class="text-gray-400 hover:text-gray-600" @click="searchQuery = ''">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div class="flex bg-gray-100 p-1 rounded-xl">
              <button

                class="w-10 h-10 rounded-lg flex items-center justify-center transition-all"
                :class="viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'"
                title="Grid View" @click="viewMode = 'grid'"
              >
                <i class="ri-layout-grid-fill text-lg"></i>
              </button>
              <button

                class="w-10 h-10 rounded-lg flex items-center justify-center transition-all"
                :class="viewMode === 'table' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'"
                title="Table View" @click="viewMode = 'table'"
              >
                <i class="fas fa-table text-lg"></i>
              </button>
            </div>

            <button

              class="px-4 py-3 rounded-xl border border-gray-300 hover:border-gray-400 transition-colors flex items-center gap-2 font-medium"
              :class="showFilters ? 'bg-blue-50 text-blue-600 border-blue-300' : 'bg-white text-gray-700'" @click="showFilters = !showFilters"
            >
              <i class="fas fa-filter"></i>
              Filters
              <span v-if="statusFilter !== 'all' || assigneeFilter !== 'all'" class="w-2 h-2 rounded-full bg-blue-500"></span>
            </button>
          </div>
        </div>

        <div v-if="showFilters" class="mt-6 pt-6 border-t border-gray-100">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                v-model="statusFilter"
                class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
              >
                <option v-for="option in statusOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Assignee</label>
              <select
                v-model="assigneeFilter"
                class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
              >
                <option value="all">All Assignees</option>
                <option v-for="person in uniqueAssignees" :key="person.id" :value="person.id">
                  {{ person.name }}
                </option>
              </select>
            </div>

            <div class="flex items-end">
              <button
               class="px-5 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                @click="resetFilters"
                >
                <i class="fas fa-redo"></i>
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p class="text-sm text-gray-600">
          Showing <span class="font-semibold text-gray-900">{{ filteredAssignments.length }}</span> of
          <span class="font-semibold text-gray-900">{{ assignments.length }}</span> tasks
        </p>
        <div class="flex items-center gap-3">
          <span class="text-sm text-gray-600">Sort by:</span>
          <select
            v-model="sortBy"

            class="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-sm"
            @change="sortOrder = 'asc'">
            <option value="created_at">Date Created</option>
            <option value="software">Software</option>
            <option value="assignee">Assignee</option>
          </select>
          <button

            class="w-10 h-10 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors flex items-center justify-center bg-white"
            title="Toggle sort order" @click="toggleSort(sortBy)"
          >
            <i v-if="sortOrder === 'asc'" class="fas fa-sort-up text-gray-600"></i>
            <i v-else class="fas fa-sort-down text-gray-600"></i>
          </button>
        </div>
      </div>

      <div v-if="loading" class="flex justify-center py-20">
        <div class="text-center">
          <div class="inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p class="mt-4 text-gray-600">Loading tasks...</p>
        </div>
      </div>

      <div v-else-if="viewMode === 'grid' && filteredAssignments.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="task in filteredAssignments"
          :key="task.id"
          class="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
        >

          <div class="px-6 pt-6">
            <div class="flex items-center justify-between mb-4">
              <span
                class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
                :class="[getStatusConfig(task.status).bgColor, getStatusConfig(task.status).textColor]"
              >
                <span class="w-2 h-2 rounded-full" :class="getStatusConfig(task.status).dotColor"></span>
                {{ getStatusConfig(task.status).label }}
              </span>
              <div class="relative group">
                <button class="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                  <i class="fas fa-ellipsis-v"></i>
                </button>
                <div class="absolute right-0 top-full mt-2 w-48 rounded-xl bg-white shadow-lg border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <button
                    class="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700"
                   @click="router.push(`/customer_success_manager/team-tasks/${task.id}`)"
                  >
                    <i class="fas fa-eye text-gray-400"></i>
                    View Details
                  </button>
                  <button
                    class="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700"
                      @click="router.push(`/assignments/${task.id}/edit`)"
                  >
                    <i class="fas fa-edit text-gray-400"></i>
                    Edit
                  </button>
                  <button
                    class="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center gap-2 text-red-600"
                      @click="deleteTask(task.id, task.solution?.name)"
                  >
                    <i class="fas fa-trash text-red-400"></i>
                    Delete
                  </button>
                </div>
              </div>
            </div>

            <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
              {{ task.solution?.name || 'Unnamed Task' }}
            </h3>
            <p class="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
              {{ task.description || 'No description provided' }}
            </p>
          </div>

          <div class="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
                  <i class="fas fa-desktop text-emerald-500"></i>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ task.software?.name || 'No software' }}</div>
                  <div class="text-xs text-gray-500">Software</div>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                  <i class="fas fa-user text-blue-500"></i>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ task.assigned_person?.name || 'Unassigned' }}</div>
                  <div class="text-xs text-gray-500">{{ task.assigned_person?.role || 'No role' }}</div>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center">
                  <i class="fas fa-calendar text-amber-500"></i>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ formatRelativeDate(task.created_at) }}</div>
                  <div class="text-xs text-gray-500">Created</div>
                </div>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t border-gray-200">
              <div class="flex justify-between items-center mb-2">
                <span class="text-xs font-medium text-gray-600">Latest Update</span>
                <span class="text-xs text-gray-500 flex items-center gap-1">
                  <i class="fas fa-list"></i>
                  {{ task.outputs?.length || 0 }}
                </span>
              </div>
              <p class="text-xs text-gray-600 truncate italic">
                {{ getOutputSummary(task.outputs) }}
              </p>
            </div>
          </div>

          <div class="px-6 py-4 bg-white border-t border-gray-100">
            <div class="flex justify-between items-center">
              <button
                class="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
                @click="router.push(`/customer_success_manager/team-tasks/${task.id}`)">
                View Details
                <i class="fas fa-arrow-right text-xs"></i>
              </button>
              <div class="flex items-center gap-2 text-xs text-gray-500">
                <i class="fas fa-users"></i>
                {{ task.success_team?.name || '—' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="viewMode === 'table' && filteredAssignments.length > 0" class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gradient-to-r from-gray-50 to-gray-100">
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Solution</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Software</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Assignee</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Created</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Last Update</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr
                v-for="(task, index) in filteredAssignments"
                :key="task.id"
                class="hover:bg-gray-50 transition-colors"
                :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'"
              >
                <td class="px-6 py-4">
                  <div>
                    <div class="font-medium text-gray-900">
                      {{ task.solution?.name || '—' }}
                    </div>
                    <div class="text-sm text-gray-500 truncate max-w-xs mt-1">
                      {{ task.description || 'No description' }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
                      <i class="fas fa-desktop text-emerald-500 text-sm"></i>
                    </div>
                    <span class="font-medium text-gray-700">{{ task.software?.name || '—' }}</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                      {{ task.assigned_person?.name?.charAt(0) || '?' }}
                    </div>
                    <div>
                      <div class="font-medium text-gray-900">{{ task.assigned_person?.name || '—' }}</div>
                      <div class="text-xs text-gray-500">{{ task.assigned_person?.role || '—' }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                    :class="[getStatusConfig(task.status).bgColor, getStatusConfig(task.status).textColor]"
                  >
                    <span class="w-1.5 h-1.5 rounded-full" :class="getStatusConfig(task.status).dotColor"></span>
                    {{ getStatusConfig(task.status).label }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-700">{{ formatDate(task.created_at) }}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-600 italic">
                    {{ getOutputSummary(task.outputs) }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <button

                      class="w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title="View" @click="router.push(`/customer_success_manager/team-tasks/${task.id}`)"
                    >
                      <i class="fas fa-eye"></i>
                    </button>
                    <button

                      class="w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                      title="Edit" @click="router.push(`/assignments/${task.id}/edit`)"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <button

                      class="w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete"  @click="deleteTask(task.id, task.solution?.name)"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-else-if="!loading && filteredAssignments.length === 0" class="text-center py-16">
        <div class="max-w-md mx-auto">
          <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <i class="fas fa-puzzle-piece text-gray-400 text-3xl"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">No tasks found</h3>
          <p class="text-gray-600 mb-8">
            {{ searchQuery || statusFilter !== 'all' || assigneeFilter !== 'all'
              ? 'Try adjusting your filters or search query to find what you\'re looking for.'
              : 'Get started by creating your first task to manage your success team assignments.' }}
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              v-if="!searchQuery && statusFilter === 'all' && assigneeFilter === 'all'"

              class="px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:-translate-y-0.5"
          @click="router.push('/assignments/create')"  >
              <i class="fas fa-plus"></i>
              Create First Task
            </button>
            <button
              v-else

              class="px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 justify-center bg-white border border-gray-300 text-gray-700 hover:border-gray-400"
              @click="resetFilters">
              <i class="fas fa-redo"></i>
              Clear Filters
            </button>
            <button

              class="px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 justify-center bg-gray-100 text-gray-700 hover:bg-gray-200"
             @click="loadAssignments" >
              <i class="fas fa-sync-alt"></i>
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Custom scrollbar */
.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Card hover effect */
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

.group:hover .group-hover\:visible {
  visibility: visible;
}
</style>
