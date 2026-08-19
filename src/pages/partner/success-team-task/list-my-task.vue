
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/config/api'
import TaskHeader from '@/components/successTeamTask/list/TaskHeader.vue'
import TaskStats from '@/components/successTeamTask/list/TaskStats.vue'
import TaskFilters from '@/components/successTeamTask/list/TaskFilters.vue'
import TaskGrid from '@/components/successTeamTask/list/TaskGrid.vue'
import TaskTable from '@/components/successTeamTask/list/TaskTable.vue'
import TaskEmptyState from '@/components/successTeamTask/list/TaskEmptyState.vue'
import {
  formatDate,
  formatRelativeDate,
  getStatusConfig,
  getOutputSummary,
  sortTasks
} from '@/components/successTeamTask/list/taskUtils'
import { useAuthStore } from '@/stores/AuthStore'

const router = useRouter()

const assignments = ref([])
const loading = ref(false)
const searchQuery = ref('')
const viewMode = ref('table')
const statusFilter = ref('all')
const assigneeFilter = ref('all')
const sortBy = ref('created_at')
const sortOrder = ref('desc')
const showFilters = ref(false)
const authStore = useAuthStore()
const loadTasks = async () => {
  loading.value = true
  try {
    const res = await api().get(`/success-team-tasks?assigned_to=${authStore.user.id}&user_id=${authStore.user.id}&with=solution,software,user,assignedPerson,outputs,successTeam`)
    assignments.value = res.data.data ?? res.data
  } catch (err) {
    console.error('Failed to load tasks', err)
  } finally {
    loading.value = false
  }
}

onMounted(loadTasks)

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

const filteredTasks = computed(() => {
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

  return sortTasks(filtered, sortBy.value, sortOrder.value)
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
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-16 pt-10 px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-6xl">
      <TaskHeader
        :title="'My Tasks List'"
        :stats="stats"
        :has-create="false"
        @create-task="router.push('/customer_success_manager/team-tasks/create')"
      />



      <TaskFilters
        v-model:search-query="searchQuery"
        v-model:status-filter="statusFilter"
        v-model:assignee-filter="assigneeFilter"
        v-model:view-mode="viewMode"
        v-model:show-filters="showFilters"
        v-model:sort-by="sortBy"
        v-model:sort-order="sortOrder"
        :unique-assignees="uniqueAssignees"
        @reset-filters="resetFilters"
        @toggle-sort="toggleSort"
      />

      <div v-if="loading" class="flex justify-center py-20">
        <div class="text-center">
          <div class="inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p class="mt-4 text-gray-600">Loading tasks...</p>
        </div>
      </div>

      <template v-else>
        <div v-if="filteredTasks.length > 0" class="mb-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p class="text-sm text-gray-600">
              Showing <span class="font-semibold text-gray-900">{{ filteredTasks.length }}</span> of
              <span class="font-semibold text-gray-900">{{ assignments.length }}</span> tasks
            </p>
          </div>
        </div>

        <TaskGrid
          v-if="viewMode === 'grid' && filteredTasks.length > 0"
          :assignments="filteredTasks"
          @view-details="(id) => router.push(`/customer_success_manager/team-tasks/${id}`)"
          @edit-task="(id) => router.push(`/customer_success_manager/team-tasks/${id}?editing=true`)"
          @delete-task="deleteTask"
        />

        <TaskTable
          v-else-if="viewMode === 'table' && filteredTasks.length > 0"
          :assignments="filteredTasks"
          @view-details="(id) => router.push(`/customer_success_manager/team-tasks/${id}`)"
          @edit-task="(id) => router.push(`/customer_success_manager/team-tasks/${id}?editing=true`)"
          @delete-task="deleteTask"
        />

        <TaskEmptyState
          v-else-if="!loading && filteredTasks.length === 0"
          :has-filters="searchQuery || statusFilter !== 'all' || assigneeFilter !== 'all'"
          @create-task="router.push('/partner/success-team-task/create')"
          @reset-filters="resetFilters"
          @refresh="loadTasks"
        />
      </template>
    </div>
  </div>
</template>
