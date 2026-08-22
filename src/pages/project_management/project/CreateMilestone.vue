<template>
  <div class="min-h-screen w-5/6 bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
    <div class=" mx-auto">
      <div class="flex items-center gap-3 mb-6">
        <RouterLink to="/project_management/milestones" class="text-gray-400 hover:text-gray-600 transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </RouterLink>
        <div>
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span class="text-2xl">🎯</span>
            </div>
            <div>
              <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Add Milestone</h1>
              <p class="text-gray-500 text-sm">Create a new project milestone</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
        <form @submit.prevent="saveMilestone" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title <span class="text-red-500">*</span></label>
            <input type="text" v-model="form.title" required class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" placeholder="Milestone title">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Project <span class="text-red-500">*</span></label>
            <select v-model="form.project_id" required class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
              <option value="">Select project...</option>
              <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input type="date" v-model="form.due_date" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
          </div>
          <div class="flex gap-3 pt-4 border-t border-gray-100">
            <RouterLink to="/project_management/milestones" class="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition text-center font-medium">Cancel</RouterLink>
            <button type="submit" class="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition shadow-lg shadow-blue-500/30 font-medium" :disabled="isSubmitting">
              {{ isSubmitting ? 'Creating...' : 'Create Milestone' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
// import api from '@/utils/api'

const router = useRouter()
const isSubmitting = ref(false)

const projects = ref([])

const form = ref({
  project_id: '',
  title: '',
  due_date: ''
})

// Fetch projects for dropdown
const fetchProjects = async () => {
  try {
    const { data } = await api().get('/projects')
    projects.value = data.data || data
  } catch (error) {
    console.error('Failed to fetch projects:', error)
  }
}

const saveMilestone = async () => {
  isSubmitting.value = true
  try {
    await api().post('/milestones', form.value)
    router.push('/project_management/milestones')
  } catch (error) {
    console.error('Failed to create milestone:', error)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  fetchProjects()
})
</script>