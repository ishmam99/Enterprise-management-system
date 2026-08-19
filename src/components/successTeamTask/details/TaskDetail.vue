<!-- src/components/tasks/TaskDetail.vue -->
<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/config/api'
import TaskHeader from './TaskHeader.vue'
import TaskOverview from './TaskOverview.vue'
import TaskOutputs from './TaskOutputs.vue'
import TaskProgress from './TaskProgress.vue'
import TaskTimeline from './TaskTimeline.vue'
import TaskActions from './TaskActions.vue'

const route = useRoute()
const router = useRouter()

const task = ref(null)
const loading = ref(true)
const error = ref(null)
const editing = ref(false)
// Fetch task details
const fetchTask = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await api().get(`/success-team-tasks/${route.params.id}?with=solution,software,user,assignedPerson,outputs,successTeam`)
    task.value = res.data.data || res.data
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load task details'
    console.error('Error fetching task:', err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchTask)
watch(() => route.params.id, fetchTask)
const editingTask = () => {
  editing.value = true
}
watch(()=>route.query,
  editing.value = route.query.editing == 'true' ? true :false

)
// Expose methods to child components
const refreshTask = fetchTask
const updateTask = (updatedData) => {
  Object.assign(task.value, updatedData)
}

defineExpose({
  refreshTask,
  updateTask
})
</script>

<template>
  <div class="min-h-screen bg-gray-200 pb-16 pt-10 px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="text-center">
          <div class="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p class="mt-4 text-gray-600">Loading task details...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="max-w-2xl mx-auto p-8 rounded-2xl bg-red-50 border border-red-100">
        <div class="text-center">
          <i class="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
          <h2 class="text-xl font-bold text-gray-900 mb-2">Error Loading Task</h2>
          <p class="text-red-600 mb-6">{{ error }}</p>
          <div class="flex justify-center gap-3">
            <button
              @click="fetchTask"
              class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors font-medium"
            >
              <i class="fas fa-redo mr-2"></i> Try Again
            </button>
            <button
              @click="router.back()"
              class="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-medium"
            >
              <i class="fas fa-arrow-left mr-2"></i> Go Back
            </button>
          </div>
        </div>
      </div>

      <!-- Task Details -->
      <div v-else-if="task" class="space-y-8">
        <TaskHeader
          :task="task"
          @edit-task="editingTask()"
          @refresh="refreshTask"
        />

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Column: Task Info -->
          <div class="lg:col-span-2 space-y-8">
          
            <TaskOverview
              :task="task"
              :editing="editing"
              @refresh="refreshTask"
              @editing-task="editing=false"
            />

            <TaskOutputs
              :task="task"
              @refresh="refreshTask"
              @task-updated="updateTask"
            />
          </div>

          <!-- Right Column: Progress & Timeline -->
          <div class="space-y-8">
            <TaskProgress :task="task" />
            <TaskTimeline :task="task" />
            <TaskActions
              :task="task"
              @refresh="refreshTask"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
