<template>
  <div class="min-h-screen w-5/6 bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
    <div class=" mx-auto">
      <div class="flex items-center gap-3 mb-6">
        <RouterLink to="/project_management/timesheets" class="text-gray-400 hover:text-gray-600 transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </RouterLink>
        <div>
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <span class="text-2xl">⏱️</span>
            </div>
            <div>
              <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Log Hours</h1>
              <p class="text-gray-500 text-sm">Add a new timesheet entry</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
        <form @submit.prevent="saveTimesheet" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Project <span class="text-red-500">*</span></label>
            <select v-model="form.project_id" required @change="onProjectChange" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition">
              <option value="">Select project...</option>
              <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Task</label>
            <select v-model="form.task_id" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition">
              <option :value="null">None</option>
              <option v-for="task in filteredTasks" :key="task.id" :value="task.id">{{ task.title }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Hours <span class="text-red-500">*</span></label>
            <input type="number" step="0.5" v-model="form.hours" required class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition" placeholder="e.g. 8">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Date <span class="text-red-500">*</span></label>
            <input type="date" v-model="form.date" required class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition">
          </div>
          <div class="flex gap-3 pt-4 border-t border-gray-100">
            <RouterLink to="/project_management/timesheets" class="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition text-center font-medium">Cancel</RouterLink>
            <button type="submit" class="flex-1 bg-gradient-to-r from-orange-600 to-amber-600 text-white py-3 rounded-xl hover:from-orange-700 hover:to-amber-700 transition shadow-lg shadow-orange-500/30 font-medium" :disabled="isSubmitting">
              {{ isSubmitting ? 'Saving...' : 'Log Hours' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
// import api from '@/utils/api'

const router = useRouter()
const isSubmitting = ref(false)

const projects = ref([])
const tasks = ref([])

const form = ref({
  project_id: '',
  task_id: null,
  hours: '',
  date: new Date().toISOString().split('T')[0]
})

// Filtered tasks based on selected project
const filteredTasks = computed(() => {
  if (!form.value.project_id) return []
  return tasks.value.filter(t => t.project_id === form.value.project_id)
})

// Fetch projects
const fetchProjects = async () => {
  try {
    const { data } = await api().get('/projects')
    projects.value = data.data || data
  } catch (error) {
    console.error('Failed to fetch projects:', error)
  }
}

// Fetch tasks
const fetchTasks = async () => {
  try {
    const { data } = await api().get('/tasks')
    tasks.value = data.data || data
  } catch (error) {
    console.error('Failed to fetch tasks:', error)
  }
}

// Reset task selection when project changes
const onProjectChange = () => {
  form.value.task_id = null
}

const saveTimesheet = async () => {
  isSubmitting.value = true
  try {
    await api().post('/timesheets', form.value)
    router.push('/project_management/timesheets')
  } catch (error) {
    console.error('Failed to create timesheet entry:', error)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  Promise.all([fetchProjects(), fetchTasks()])
})
</script>