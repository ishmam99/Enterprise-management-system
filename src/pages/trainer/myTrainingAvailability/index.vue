<template>
  <div class="w-full min-h-screen px-10 py-6">
    <div v-if="isLoading" class="fixed inset-0 z-40 flex items-center justify-center bg-white/80">
      <div class="h-16 w-16 rounded-full border-4 border-slate-300 border-t-slate-900 animate-spin"></div>
    </div>
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">My Training Availability</h1>
        <p class="text-sm text-slate-600 mt-1">Manage your preferred weekly training schedule.</p>
      </div>
      <button @click="openCreateModal"
        class="inline-flex items-center gap-2 rounded-xl bg-sky-600 text-white px-5 py-3 shadow hover:bg-sky-700 transition">
        <i class="ri-add-line"></i>
        Add Availability
      </button>
    </div>

    <div class="bg-white rounded-3xl shadow border border-slate-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left min-w-[900px]">
          <thead class="bg-slate-900 text-white">
            <tr>
              <th class="px-4 py-3 text-xs uppercase tracking-wider">ID</th>
              <th class="px-4 py-3 text-xs uppercase tracking-wider">Days</th>
              <th class="px-4 py-3 text-xs uppercase tracking-wider">Start Time</th>
              <th class="px-4 py-3 text-xs uppercase tracking-wider">End Time</th>
              <th class="px-4 py-3 text-xs uppercase tracking-wider">Status</th>
              <th class="px-4 py-3 text-xs uppercase tracking-wider">Created</th>
              <th class="px-4 py-3 text-xs uppercase tracking-wider text-center">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr v-for="item in schedules" :key="item.id" class="hover:bg-slate-50 transition-colors">
              <td class="px-4 py-4 text-sm text-slate-700">{{ item.id }}</td>
              <td class="px-4 py-4 text-sm text-slate-700">{{ formatDays(item.days) }}</td>
              <td class="px-4 py-4 text-sm text-slate-700">{{ item.start_time || '-' }}</td>
              <td class="px-4 py-4 text-sm text-slate-700">{{ item.end_time || '-' }}</td>
              <td class="px-4 py-4 text-sm">
                <span :class="statusClass(item.status)">{{ statusLabel(item.status) }}</span>
              </td>
              <td class="px-4 py-4 text-sm text-slate-700">{{ formatDate(item.created_at) }}</td>
              <td class="px-4 py-4 text-sm text-right">
                <button @click="openEditModal(item)" class="text-sky-600 hover:text-sky-800 mr-2" aria-label="Edit availability">
                  <i class="ri-edit-line"></i>
                </button>
                <button @click="confirmDelete(item.id)" class="text-red-600 hover:text-red-800" aria-label="Delete availability">
                  <i class="ri-delete-bin-line"></i>
                </button>
              </td>
            </tr>
            <tr v-if="!schedules.length">
              <td colspan="7" class="px-4 py-12 text-center text-slate-500">No training availability records found.</td>
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
            <h2 class="text-xl font-semibold text-slate-900">{{ editMode ? 'Edit Availability' : 'Add Availability' }}</h2>
            <p class="text-sm text-slate-500">{{ editMode ? 'Update your preferred schedule.' : 'Create a new preferred schedule for your trainer availability.' }}</p>
          </div>
          <button @click="closeModal" class="text-slate-400 hover:text-slate-700">
            <i class="ri-close-line text-xl"></i>
          </button>
        </div>

        <div class="p-6 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-slate-700">Days</label>
              <div class="grid grid-cols-2 gap-2">
                <label v-for="day in daysList" :key="day" class="inline-flex items-center gap-2 rounded-xl border px-3 py-2 cursor-pointer hover:bg-slate-50">
                  <input type="checkbox" :value="day" v-model="form.days" class="rounded text-sky-600" />
                  <span class="capitalize">{{ day }}</span>
                </label>
              </div>
            </div>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">Start Time</label>
                <input v-model="form.start_time" type="time" class="w-full border border-slate-200 rounded-xl px-3 py-2" />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">End Time</label>
                <input v-model="form.end_time" type="time" class="w-full border border-slate-200 rounded-xl px-3 py-2" />
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Status</label>
            <select v-model="form.status" class="w-full border border-slate-200 rounded-xl px-3 py-2">
              <option value="0">Inactive</option>
              <option value="1">Active</option>
            </select>
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
          <button @click="closeModal" class="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100">Cancel</button>
          <button @click="saveSchedule" class="px-5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800">
            <span v-if="saving">Saving...</span>
            <span v-else>{{ editMode ? 'Update Availability' : 'Create Availability' }}</span>
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
const schedules = ref([])
const meta = ref(null)
const currentPage = ref(1)
const showModal = ref(false)
const editMode = ref(false)
const saving = ref(false)
const isLoading = ref(false)
const selectedSchedule = ref(null)

const daysList = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

const form = reactive({
  days: [],
  start_time: '',
  end_time: '',
  status: '0'
})

const trainerId = computed(() => authStore.user?.id || authStore.user?.trainer_id || authStore.login_id || null)

const fetchSchedules = async (page = 1) => {
  if (!trainerId.value) {
    schedules.value = []
    meta.value = null
    isLoading.value = false
    return
  }

  isLoading.value = true

  try {
    const { data } = await api().get('/trainer-preferred-schedules', {
      params: {
        trainer_id: trainerId.value,
        page,
        per_page: 15
      }
    })

    schedules.value = (data.data.data ?? data.data) || []
    meta.value = data.data ?? null
  } catch (error) {
    console.error('Unable to fetch availability schedules', error)
    schedules.value = []
    meta.value = null
  } finally {
    isLoading.value = false
  }
}

const resetForm = () => {
  form.days = []
  form.start_time = ''
  form.end_time = ''
  form.status = '0'
}

const openCreateModal = () => {
  editMode.value = false
  selectedSchedule.value = null
  resetForm()
  showModal.value = true
}

const openEditModal = (item) => {
  editMode.value = true
  selectedSchedule.value = item
  form.days = Array.isArray(item.days) ? item.days : safeParseDays(item.days)
  form.start_time = normalizeTime(item.start_time)
  form.end_time = normalizeTime(item.end_time)
  form.status = String(item.status ?? '0')
  showModal.value = true
}

const safeParseDays = (days) => {
  try {
    return Array.isArray(days) ? days : JSON.parse(days || '[]')
  } catch {
    return []
  }
}

const normalizeTime = (value) => {
  if (!value) return ''
  const trimmed = String(value).trim()
  return trimmed.length >= 5 ? trimmed.slice(0, 5) : trimmed
}

const closeModal = () => {
  showModal.value = false
}

const saveSchedule = async () => {
  if (!trainerId.value) {
    window.alert('Trainer identity missing. Please log in again.')
    return
  }

  if (!form.days.length) {
    window.alert('Please select at least one day.')
    return
  }

  const payload = {
    trainer_id: trainerId.value,
    days: form.days,
    start_time: normalizeTime(form.start_time) || null,
    end_time: normalizeTime(form.end_time) || null,
    status: form.status
  }

  saving.value = true

  try {
    if (editMode.value && selectedSchedule.value) {
      await api().post(`/trainer-preferred-schedules/${selectedSchedule.value.id}`, {
        ...payload,
        _method: 'PUT'
      })
    } else {
      await api().post('/trainer-preferred-schedules', payload)
    }

    closeModal()
    await fetchSchedules(currentPage.value)
  } catch (error) {
    console.error('Unable to save availability schedule', error)
    window.alert('Unable to save schedule. Please check your input and try again.')
  } finally {
    saving.value = false
  }
}

const confirmDelete = async (id) => {
  if (!window.confirm('Delete this availability record?')) return

  try {
    await api().delete(`/trainer-preferred-schedules/${id}`)
    await fetchSchedules(currentPage.value)
  } catch (error) {
    console.error('Unable to delete schedule', error)
    window.alert('Unable to delete schedule. Please try again.')
  }
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

const formatDays = (days) => {
  const list = safeParseDays(days)
  return list.length ? list.map(d => d.charAt(0).toUpperCase() + d.slice(1)).join(', ') : '-'
}

const formatDate = (value) => {
  if (!value) return '-'
  const date = new Date(value)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const changePage = (page) => {
  if (!page) return
  currentPage.value = page
  fetchSchedules(page)
}

onMounted(async () => {
  await fetchSchedules(currentPage.value)
})
</script>

<style scoped>
button:focus {
  outline: none;
}
</style>
