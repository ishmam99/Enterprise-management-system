<template>
  <div class="w-full min-h-screen px-10 py-6">
    <div v-if="isLoading" class="fixed inset-0 z-40 flex items-center justify-center bg-white/80">
      <div class="h-16 w-16 rounded-full border-4 border-slate-300 border-t-slate-900 animate-spin"></div>
    </div>
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">My Skills</h1>
        <p class="text-sm text-slate-600 mt-1">Create and manage your skills.</p>
      </div>
      <button @click="openCreateModal"
        class="inline-flex items-center gap-2 rounded-xl bg-sky-600 text-white px-5 py-3 shadow hover:bg-sky-700 transition">
        <i class="ri-add-line"></i>
        Add Skill
      </button>
    </div>

    <div class="bg-white rounded-3xl shadow border border-slate-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left min-w-[900px]">
          <thead class="bg-slate-900 text-white">
            <tr>
              <th class="px-4 py-3 text-xs uppercase tracking-wider">ID</th>
              <th class="px-4 py-3 text-xs uppercase tracking-wider">Type</th>
              <th class="px-4 py-3 text-xs uppercase tracking-wider">Software / Solution</th>
              <th class="px-4 py-3 text-xs uppercase tracking-wider">Trainer</th>
              <th class="px-4 py-3 text-xs uppercase tracking-wider">Level</th>
              <th class="px-4 py-3 text-xs uppercase tracking-wider">Analysis</th>
              <th class="px-4 py-3 text-xs uppercase tracking-wider">Status</th>
              <th class="px-4 py-3 text-xs uppercase tracking-wider">Created</th>
              <th class="px-4 py-3 text-xs uppercase tracking-wider text-center">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr v-for="skill in skills" :key="skill.id" class="hover:bg-slate-50 transition-colors">
              <td class="px-4 py-4 text-sm text-slate-700">{{ skill.id }}</td>
              <td class="px-4 py-4 text-sm text-slate-700">{{ skillTypeLabel(skill.skill_type) }}</td>
              <td class="px-4 py-4 text-sm text-slate-700">{{ skill.software?.name || skill.solution?.name || '-' }}</td>
              <td class="px-4 py-4 text-sm text-slate-700">{{ skill.trainer_request_form?.name || skill.trainer?.name || '-' }}</td>
              <td class="px-4 py-4 text-sm text-slate-700">{{ skill.level || '-' }}</td>
              <td class="px-4 py-4 text-sm text-slate-700 max-w-[260px] truncate" :title="skill.analysis">{{ skill.analysis || '-' }}</td>
              <td class="px-4 py-4 text-sm">
                <span :class="statusClass(skill.status)">{{ statusLabel(skill.status) }}</span>
              </td>
              <td class="px-4 py-4 text-sm text-slate-700">{{ formatDate(skill.created_at) }}</td>
              <td class="px-4 py-4 text-sm text-right">
                <button @click="openEditModal(skill)" class="text-sky-600 hover:text-sky-800 mr-2" aria-label="Edit skill">
                  <i class="ri-edit-line"></i>
                </button>
                <button @click="confirmDelete(skill.id)" class="text-red-600 hover:text-red-800" aria-label="Delete skill">
                  <i class="ri-delete-bin-line"></i>
                </button>
              </td>
            </tr>
            <tr v-if="!skills.length">
              <td colspan="9" class="px-4 py-12 text-center text-slate-500">No skills found for your trainer account.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="meta && meta.links?.length" class="flex flex-col md:flex-row items-center justify-between gap-3 px-4 py-4 text-sm text-slate-600">
      <span>Showing {{ meta.from }} - {{ meta.to }} of {{ meta.total }}</span>
      <div class="flex flex-wrap gap-2">
        <button v-for="link in meta.links" :key="link.label"
          @click="changePage(link.page)"
          class="px-3 py-2 rounded-lg border text-xs transition"
          :class="link.active ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'"
          v-html="link.label" />
      </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div class="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <h2 class="text-xl font-semibold text-slate-900">{{ editMode ? 'Edit Skill' : 'Add Skill' }}</h2>
            <p class="text-sm text-slate-500">{{ editMode ? 'Update a skill record.' : 'Create a new trainer skill record.' }}</p>
          </div>
          <button @click="closeModal" class="text-slate-400 hover:text-slate-700">
            <i class="ri-close-line text-xl"></i>
          </button>
        </div>

        <div class="p-6 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Skill Type</label>
              <select v-model="form.skill_type" class="w-full border border-slate-200 rounded-xl px-3 py-2">
                <option value="1">Software</option>
                <option value="2">Solution</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Status</label>
              <select v-model="form.status" class="w-full border border-slate-200 rounded-xl px-3 py-2">
                <option value="0">Inactive</option>
                <option value="1">Active</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div v-if="form.skill_type === '1' || form.skill_type === 1">
              <label class="block text-sm font-medium text-slate-700 mb-2">Software</label>
              <select v-model="form.software_id" class="w-full border border-slate-200 rounded-xl px-3 py-2">
                <option value="">Select software</option>
                <option v-for="item in softwareOptions" :key="item.id" :value="String(item.id)">{{ item.name }}</option>
              </select>
            </div>
            <div v-else>
              <label class="block text-sm font-medium text-slate-700 mb-2">Solution</label>
              <select v-model="form.solution_id" class="w-full border border-slate-200 rounded-xl px-3 py-2">
                <option value="">Select solution</option>
                <option v-for="item in solutionOptions" :key="item.id" :value="String(item.id)">{{ item.name }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Level</label>
              <input v-model="form.level" type="text" class="w-full border border-slate-200 rounded-xl px-3 py-2" placeholder="Beginner, Intermediate, Expert" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Analysis</label>
            <textarea v-model="form.analysis" rows="4" class="w-full border border-slate-200 rounded-xl px-3 py-2" placeholder="Notes, experience details or analysis"></textarea>
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
          <button @click="closeModal" class="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100">Cancel</button>
          <button @click="saveSkill" class="px-5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800">
            <span v-if="saving">Saving...</span>
            <span v-else>{{ editMode ? 'Update Skill' : 'Create Skill' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import api from '@/config/api'
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()
const skills = ref([])
const meta = ref(null)
const currentPage = ref(1)
const showModal = ref(false)
const editMode = ref(false)
const saving = ref(false)
const isLoading = ref(false)
const selectedSkill = ref(null)

const softwareOptions = ref([])
const solutionOptions = ref([])

const form = reactive({
  skill_type: '1',
  software_id: '',
  solution_id: '',
  level: '',
  analysis: '',
  status: '0'
})

const trainerId = computed(() => {
  return authStore.user?.id || authStore.user?.trainer_id || authStore.login_id || null
})

const fetchSkills = async (page = 1) => {
  if (!trainerId.value) {
    skills.value = []
    meta.value = null
    isLoading.value = false
    return
  }

  isLoading.value = true

  try {
    const { data } = await api().get('/trainer-skills', {
      params: {
        trainer_id: trainerId.value,
        with: 'software,solution,trainer_request_form',
        page,
        per_page: 15
      }
    })
    skills.value = data.data.data ?? []
    meta.value = data.data ?? null
  } catch (error) {
    console.error('Unable to fetch trainer skills', error)
    skills.value = []
    meta.value = null
  } finally {
    isLoading.value = false
  }
}

const fetchSoftwareOptions = async () => {
  try {
    const { data } = await api().get('/softwares')
    softwareOptions.value = data.data ?? data ?? []
  } catch (error) {
    console.error('Unable to load softwares', error)
    softwareOptions.value = []
  }
}

const fetchSolutionOptions = async () => {
  try {
    const { data } = await api().get('/solutions')
    solutionOptions.value = data.data ?? data ?? []
  } catch (error) {
    console.error('Unable to load solutions', error)
    solutionOptions.value = []
  }
}

const resetForm = () => {
  form.skill_type = '1'
  form.software_id = ''
  form.solution_id = ''
  form.level = ''
  form.analysis = ''
  form.status = '0'
}

const openCreateModal = () => {
  editMode.value = false
  selectedSkill.value = null
  resetForm()
  showModal.value = true
}

const openEditModal = (skill) => {
  editMode.value = true
  selectedSkill.value = skill
  form.skill_type = String(skill.skill_type || '1')
  form.software_id = skill.software_id ? String(skill.software_id) : ''
  form.solution_id = skill.solution_id ? String(skill.solution_id) : ''
  form.level = skill.level || ''
  form.analysis = skill.analysis || ''
  form.status = String(skill.status ?? '0')
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const saveSkill = async () => {
  if (!trainerId.value) {
    window.alert('Trainer identity missing. Please log in again.')
    return
  }

  const payload = {
    trainer_id: trainerId.value,
    skill_type: form.skill_type,
    software_id: form.skill_type === '1' ? (form.software_id || null) : null,
    solution_id: form.skill_type === '2' ? (form.solution_id || null) : null,
    level: form.level || null,
    analysis: form.analysis || null,
    status: form.status
  }

  if (form.skill_type === '1') {
    payload.solution_id = null
  } else {
    payload.software_id = null
  }

  saving.value = true

  try {
    if (editMode.value && selectedSkill.value) {
      await api().post(`/trainer-skills/${selectedSkill.value.id}`, {
        ...payload,
        _method: 'PUT'
      })
    } else {
      await api().post('/trainer-skills', payload)
    }
    closeModal()
    await fetchSkills(currentPage.value)
  } catch (error) {
    console.error('Unable to save trainer skill', error)
    window.alert('Unable to save skill. Please check the form and try again.')
  } finally {
    saving.value = false
  }
}

const confirmDelete = async (id) => {
  if (!window.confirm('Delete this skill permanently?')) return

  try {
    await api().delete(`/trainer-skills/${id}`)
    await fetchSkills(currentPage.value)
  } catch (error) {
    console.error('Unable to delete trainer skill', error)
    window.alert('Unable to delete skill. Please try again.')
  }
}

const skillTypeLabel = (type) => {
  if (type === 2 || type === '2') return 'Solution'
  return 'Software'
}

const statusLabel = (status) => {
  if (status === 1 || status === '1') return 'Active'
  return 'Inactive'
}

const statusClass = (status) => {
  return status === 1 || status === '1'
    ? 'inline-flex rounded-full bg-emerald-100 text-emerald-800 px-2 py-1 text-xs font-semibold'
    : 'inline-flex rounded-full bg-red-100 text-red-800 px-2 py-1 text-xs font-semibold'
}

const formatDate = (value) => {
  if (!value) return '-'
  const date = new Date(value)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const changePage = (page) => {
  if (!page) return
  currentPage.value = page
  fetchSkills(page)
}

onMounted(async () => {
  await Promise.all([fetchSoftwareOptions(), fetchSolutionOptions()])
  await fetchSkills(currentPage.value)
})
</script>

<style scoped>
button:focus {
  outline: none;
}
</style>
