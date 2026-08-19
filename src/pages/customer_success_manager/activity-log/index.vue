<script setup>
import { ref, onMounted } from 'vue'
import api from '@/config/api'
import moment from 'moment'
import { useAuthStore } from '@/stores/AuthStore'

const activities = ref([])
const customers = ref([])
const loading = ref(false)
const error = ref(null)
const message = ref('')
const messageType = ref('')
const authStore = useAuthStore()
// Form modal state
const showFormModal = ref(false)
const isEditing = ref(false)
const saving = ref(false)
const form = ref({
  id: null,
  type: '',
  date: new Date().toISOString().split('T')[0],
  customer_id: '',
  activity: ''
})

const currentMonth = ref(moment().startOf('month'))
// Delete state
const showDeleteConfirm = ref(false)
const deleting = ref(false)
const activityToDelete = ref(null)

// ────────────────────────────────────────────────
async function fetchActivities(monthType) {
  loading.value = true
  try {
    let startDate, endDate
    if (monthType === 'prev') {
      startDate = currentMonth.value
        .clone()
        .subtract(1, 'month')
        .startOf('month')
        .format('YYYY-MM-DD')
      endDate = currentMonth.value.clone().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
    } else if (monthType === 'next') {
      startDate = currentMonth.value.clone().add(1, 'month').startOf('month').format('YYYY-MM-DD')
      endDate = currentMonth.value.clone().add(1, 'month').endOf('month').format('YYYY-MM-DD')
    } else {
      startDate = currentMonth.value.clone().startOf('month').format('YYYY-MM-DD')
      endDate = currentMonth.value.clone().endOf('month').format('YYYY-MM-DD')
    }
    const res = await api().get(
      '/monthly-csm-activity?with=customer.user&user_id=' +
        authStore.user.id +
        '&date_from=' +
        startDate +
        '&date_to=' +
        endDate
    )

    currentMonth.value = moment(startDate).startOf('month')
    activities.value = res.data.data || res.data || []
  } catch (err) {
    error.value = 'Could not load activities'
    console.error(err)
  } finally {
    loading.value = false
  }
}

async function fetchCustomers() {
  try {
    const res = await api().get('/customers')
    customers.value = res.data.data || res.data || []
  } catch (err) {
    console.error('Failed to load customers', err)
  }
}

// ────────────────────────────────────────────────
function openCreateModal() {
  resetForm()
  isEditing.value = false
  showFormModal.value = true
}

function openEditModal(act) {
  form.value = {
    id: act.id,
    type: act.type,
    date: act.date,
    customer_id: act.customer_id,
    activity: act.activity
  }
  isEditing.value = true
  showFormModal.value = true
}

function closeModal() {
  showFormModal.value = false
  resetForm()
}

function resetForm() {
  form.value = {
    id: null,
    type: '',
    date: new Date().toISOString().split('T')[0],
    customer_id: '',
    activity: ''
  }
}

// ────────────────────────────────────────────────
async function saveActivity() {
  saving.value = true
  message.value = ''

  try {
    const payload = {
      type: form.value.type,
      date: form.value.date,
      activity: form.value.activity.trim(),
      customer_id: form.value.customer_id ? Number(form.value.customer_id) : null
    }

    if (isEditing.value) {
      // UPDATE using PUT method
      await api().put(`/monthly-csm-activity/${form.value.id}`, payload)
      message.value = 'Activity updated successfully'
    } else {
      // CREATE
      await api().post('/monthly-csm-activity', payload)
      message.value = 'Activity created successfully'
    }

    messageType.value = 'success'
    closeModal()
    await fetchActivities()
  } catch (err) {
    message.value = err.response?.data?.message || 'Failed to save activity'
    messageType.value = 'error'
    console.error(err)
  } finally {
    saving.value = false
  }
}

// ────────────────────────────────────────────────
function confirmDelete(id) {
  activityToDelete.value = id
  showDeleteConfirm.value = true
}

async function performDelete() {
  deleting.value = true
  try {
    await api().delete(`/monthly-csm-activity/${activityToDelete.value}`)
    message.value = 'Activity deleted successfully'
    messageType.value = 'success'
    activities.value = activities.value.filter((a) => a.id !== activityToDelete.value)
    showDeleteConfirm.value = false
  } catch (err) {
    message.value = 'Failed to delete activity'
    messageType.value = 'error'
    console.error(err)
  } finally {
    deleting.value = false
    activityToDelete.value = null
  }
}

// ────────────────────────────────────────────────
function formatDate(dateStr) {
  return dateStr
    ? new Date(dateStr).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    : '—'
}

function formatType(type) {
  return type ? type.charAt(0).toUpperCase() + type.slice(1) : '—'
}

function typeBadgeClass(type) {
  // Mapping logic remains for your dynamic styling
  const t = type?.toLowerCase() || ''
  if (t.includes('summary')) return 'bg-blue-50 text-blue-700 border-blue-100'
  if (t.includes('outcome')) return 'bg-emerald-50 text-emerald-700 border-emerald-100'
  return 'bg-slate-50 text-slate-700 border-slate-100'
}

onMounted(() => {
  fetchActivities()
  fetchCustomers()
})
</script>

<template>
  <div class="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <div class="md:flex md:items-center justify-between mb-10">
        <div class="flex-col">
          <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Activity Log
          </h1>
          <p class="mt-2 text-base text-slate-600">
            Track and manage customer success interactions.
          </p>
        </div>
        <div class="flex w-full justify-center items-center space-x-2">
          <button
            class="px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
            @click="fetchActivities('prev')"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div
            class="px-4 py-2 rounded-lg bg-white border border-slate-300 text-sm font-semibold text-slate-900 min-w-max"
          >
            {{ currentMonth.format('MMMM YYYY') }}
          </div>
          <button
            class="px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
            @click="fetchActivities('next')"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <div class="mt-6 flex md:ml-4 md:mt-0">
          <router-link
            to="/customer_success_manager/activity-log/create"
            class="inline-flex text-nowrap items-center px-6 py-3 border border-transparent shadow-sm text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-all transform hover:scale-105"
          >
            Log New Activity
          </router-link>
        </div>
      </div>

      <div
        v-if="!loading && activities.length > 0"
        class="bg-white shadow-xl shadow-slate-200/50 rounded-2xl border border-slate-200 overflow-hidden"
      >
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-200">
            <thead class="bg-slate-50">
              <tr>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest"
                >
                  Date
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest"
                >
                  Type
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest"
                >
                  Customer Name
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest"
                >
                  Details
                </th>
                <th
                  class="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-widest"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 bg-white">
              <tr
                v-for="act in activities"
                :key="act.id"
                class="hover:bg-indigo-50/30 transition-colors group"
              >
                <td class="px-6 py-5 whitespace-nowrap text-sm font-medium text-slate-600">
                  {{ formatDate(act.date) }}
                </td>
                <td class="px-2 py-5 whitespace-nowrap">
                  <span
                    class="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full border"
                    :class="typeBadgeClass(act.type)"
                  >
                    {{ formatType(act.type) }}
                  </span>
                </td>
                <td class="px-1 py-2 ">

                    {{ act.customer.user.name }}
                 
                </td>
                <td class="px-6 py-5 text-sm text-slate-700 min-w-[300px]">
                  <div class="prose prose-sm max-h-32 overflow-y-auto" v-html="act.activity"></div>
                </td>
                <td class="px-6 py-5 whitespace-nowrap text-right text-sm font-bold">
                  <div class="flex justify-end space-x-4">
                    <button
                      @click="openEditModal(act)"
                      class="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button @click="confirmDelete(act.id)" class="text-red-500 hover:text-red-700">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        v-else-if="loading"
        class="bg-white shadow-xl shadow-slate-200/50 rounded-2xl border border-slate-200 overflow-hidden"
      >
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-200">
            <thead class="bg-slate-50">
              <tr>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest"
                >
                  Date
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest"
                >
                  Type
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest"
                >
                  Customer Name
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest"
                >
                  Details
                </th>
                <th
                  class="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-widest"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              <tr v-for="i in 5" :key="i" class="bg-white">
                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="h-4 bg-slate-200 rounded animate-pulse w-24"></div>
                </td>
                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="h-8 bg-slate-200 rounded-full animate-pulse w-20"></div>
                </td>
                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="h-8 bg-slate-200 rounded-full animate-pulse w-32"></div>
                </td>
                <td class="px-6 py-5">
                  <div class="h-4 bg-slate-200 rounded animate-pulse w-full"></div>
                </td>
                <td class="px-6 py-5 text-right">
                  <div class="h-4 bg-slate-200 rounded animate-pulse w-24 ml-auto"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="!loading && activities.length === 0" class="text-center py-12">
        <p class="text-slate-500">No activities found.</p>
      </div>
      <div
        v-if="showDeleteConfirm"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        <div
          class="fixed inset-0 bg-slate-900/75 transition-opacity"
          @click="showDeleteConfirm = false"
        ></div>
        <div class="relative bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl">
          <div class="text-center">
            <div
              class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4"
            >
              <svg
                class="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-slate-900">Confirm Delete</h3>
            <p class="text-sm text-slate-500 mt-2">
              Are you sure you want to remove this activity? This action cannot be undone.
            </p>
          </div>
          <div class="mt-6 flex space-x-3">
            <button
              @click="showDeleteConfirm = false"
              class="flex-1 px-4 py-2 border border-slate-300 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              @click="performDelete"
              :disabled="deleting"
              class="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 disabled:opacity-50"
            >
              {{ deleting ? 'Deleting...' : 'Delete' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
