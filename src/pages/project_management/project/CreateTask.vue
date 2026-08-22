<template>
  <div class="min-h-screen w-5/6 bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
    <div class=" mx-auto">
      <div class="flex items-center gap-3 mb-6">
        <RouterLink to="/project_management/tasks" class="text-gray-400 hover:text-gray-600 transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </RouterLink>
        <div>
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
              <span class="text-2xl">✅</span>
            </div>
            <div>
              <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Add Task</h1>
              <p class="text-gray-500 text-sm">Create a new project task</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
        <form @submit.prevent="saveTask" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title <span class="text-red-500">*</span></label>
            <input type="text" v-model="form.title" required class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition" placeholder="Task title">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Project <span class="text-red-500">*</span></label>
            <select v-model="form.project_id" required @change="onProjectChange" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition">
              <option value="">Select project...</option>
              <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Milestone</label>
            <select v-model="form.milestone_id" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition">
              <option :value="null">None</option>
              <option v-for="milestone in filteredMilestones" :key="milestone.id" :value="milestone.id">{{ milestone.title }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea v-model="form.description" rows="3" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition" placeholder="Task description..."></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select v-model="form.status" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition">
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input type="date" v-model="form.due_date" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition">
          </div>
          <div class="flex gap-3 pt-4 border-t border-gray-100">
            <RouterLink to="/project_management/tasks" class="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition text-center font-medium">Cancel</RouterLink>
            <button type="submit" class="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition shadow-lg shadow-green-500/30 font-medium" :disabled="isSubmitting">
              {{ isSubmitting ? 'Creating...' : 'Create Task' }}
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
const milestones = ref([])

const form = ref({
  project_id: '',
  milestone_id: null,
  title: '',
  description: '',
  status: 'Pending',
  due_date: ''
})

// Filtered milestones based on selected project
const filteredMilestones = computed(() => {
  if (!form.value.project_id) return []
  return milestones.value.filter(m => m.project_id === form.value.project_id)
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

// Fetch milestones
const fetchMilestones = async () => {
  try {
    const { data } = await api().get('/milestones')
    milestones.value = data.data || data
  } catch (error) {
    console.error('Failed to fetch milestones:', error)
  }
}

// Reset milestone selection when project changes
const onProjectChange = () => {
  form.value.milestone_id = null
}

const saveTask = async () => {
  isSubmitting.value = true
  try {
    await api().post('/tasks', form.value)
    router.push('/project_management/tasks')
  } catch (error) {
    console.error('Failed to create task:', error)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  Promise.all([fetchProjects(), fetchMilestones()])
})
</script>