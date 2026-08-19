<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-10">
      <div>
        <h1 class="text-3xl font-semibold text-slate-900 tracking-tight">
          Generated Activity Reports
        </h1>
        <p class="text-slate-600 mt-2 text-lg">
          View and manage all Success Team activity reports
        </p>
      </div>
    </div>

    <!-- Filters Card -->
    <div class="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 mb-10">
      <div class="flex flex-col lg:flex-row lg:items-end gap-8">
        <!-- Success Team Filter -->
        <div class="flex-1">
          <label class="block text-sm font-medium text-slate-700 mb-2.5">
            Success Team
          </label>
          <select
            v-model="filters.success_team_id"
            class="w-full border border-slate-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all bg-white text-slate-800"
          >
            <option value="">All Teams</option>
            <option
              v-for="team in successTeams"
              :key="team.id"
              :value="team.id"
            >
              {{ team.name }}
            </option>
          </select>
        </div>

        <!-- Month-Year Picker -->
        <div class="flex-1">
          <label class="block text-sm font-medium text-slate-700 mb-2.5">
            Reporting Period
          </label>
          <div class="relative">
            <input
              :value="displayPeriod"
              @focus="showPicker = true"
              @blur="handleBlur"
              readonly
              placeholder="Select month and year"
              class="w-full border border-slate-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all cursor-pointer bg-white text-slate-800"
            />

            <!-- Calendar Icon -->
            <div class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            <!-- Month-Year Picker Dropdown -->
            <div
              v-if="showPicker"
              class="absolute z-50 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl w-72 overflow-hidden"
            >
              <div class="p-6">
                <!-- Year Navigation -->
                <div class="flex items-center justify-between mb-6">
                  <button
                    @click="prevYear"
                    class="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span class="text-xl font-semibold text-slate-800">{{ currentYear }}</span>
                  <button
                    @click="nextYear"
                    class="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <!-- Months Grid -->
                <div class="grid grid-cols-3 gap-2">
                  <button
                    v-for="(month, index) in months"
                    :key="index"
                    @click="selectMonth(index)"
                    class="py-3 px-4 text-sm font-medium rounded-xl transition-all duration-200"
                    :class="isSelected(index)
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-700 hover:bg-slate-100'"
                    type="button"
                  >
                    {{ month.substring(0, 3) }}
                  </button>
                </div>

                <!-- Actions -->
                <div class="flex justify-between mt-6 pt-6 border-t border-slate-100">
                  <button
                    @click="selectCurrentMonth"
                    class="text-sm font-medium text-blue-600 hover:text-blue-700 px-4 py-2 rounded-xl hover:bg-blue-50 transition"
                    type="button"
                  >
                    Current Month
                  </button>
                  <button
                    @click="clearPeriod"
                    class="text-sm font-medium text-slate-500 hover:text-slate-700 px-4 py-2 rounded-xl hover:bg-slate-100 transition"
                    type="button"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-4 lg:ml-auto">
          <button
            @click="fetchReports"
            class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-all shadow-sm active:scale-[0.98]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Apply Filter
          </button>

          <button
            @click="resetFilters"
            class="inline-flex items-center gap-2 border border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 rounded-xl font-medium transition-all"
          >
            Reset
          </button>
        </div>
      </div>

      <!-- Active Filters -->
      <div v-if="hasActiveFilters" class="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-slate-100">
        <span class="text-sm text-slate-500 font-medium">Active filters:</span>
        <span
          v-if="filters.success_team_id"
          class="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-2xl text-sm font-medium"
        >
          Team: {{ selectedTeamName }}
          <button @click="filters.success_team_id = ''" class="hover:text-blue-900 transition">
            ✕
          </button>
        </span>
        <span
          v-if="filters.period"
          class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-2xl text-sm font-medium"
        >
          Period: {{ filters.period }}
          <button @click="clearPeriod" class="hover:text-emerald-900 transition">
            ✕
          </button>
        </span>
      </div>
    </div>

    <!-- Reports Table Card -->
    <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <!-- Table Header -->
      <div class="px-8 py-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <h2 class="text-xl font-semibold text-slate-900">Activity Reports</h2>
        <span class="text-sm text-slate-600 font-medium">
          {{ reports.length }} report{{ reports.length !== 1 ? 's' : '' }} found
        </span>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200">
              <th class="px-8 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-widest">Team</th>
              <th class="px-8 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-widest">Period</th>
              <th class="px-8 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-widest">Status</th>
              <th class="px-8 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-widest">Created By</th>
              <th class="px-8 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-widest">Date</th>
              <th class="px-8 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-widest">View Report</th>
              <th class="px-8 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-widest">Pre-Approval</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-200">
            <tr
              v-for="report in reports"
              :key="report.id"
              class="hover:bg-slate-50 transition-colors group"
            >
              <td class="px-8 py-5">
                <div class="flex items-center gap-4">
                  <div class="w-9 h-9 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span class="text-blue-600 text-lg">📊</span>
                  </div>
                  <div>
                    <p class="font-semibold text-slate-900">{{ report.success_team?.name }}</p>
                    <p class="text-xs text-slate-500">ID: {{ report.success_team_id }}</p>
                  </div>
                </div>
              </td>

              <td class="px-8 py-5">
                <span class="font-medium text-slate-900">{{ report.period }}</span>
              </td>

              <td class="px-8 py-5">
                <span
                  class="inline-flex items-center px-4 py-1.5 rounded-2xl text-xs font-semibold"
                  :class="statusClass(report.status)"
                >
                  <span class="w-2 h-2 rounded-full mr-2" :class="statusDotClass(report.status)"></span>
                  {{ statusText(report.status) }}
                </span>
              </td>

              <td class="px-8 py-5">
                <div>
                  <p class="font-medium text-slate-900">{{ report.user?.name }}</p>
                  <p class="text-xs text-slate-500 truncate max-w-[180px]">{{ report.user?.email }}</p>
                </div>
              </td>

              <td class="px-8 py-5">
                <div class="text-sm">
                  <p class="text-slate-900">{{ formatDate(report.created_at) }}</p>
                  <p class="text-xs text-slate-500">{{ formatTime(report.created_at) }}</p>
                </div>
              </td>

              <td class="px-8 py-5">
                <router-link
                  :to="{ name: 'customer_success_manager-activity-report-id', params: { id: report.id } }"
                  class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Report
                </router-link>
              </td>

              <td class="px-8 py-5">
                <button
                  v-if="report.status == 0"
                  @click="editReport(report.id)"
                  :disabled="editing == report.id"
                  class="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-700 font-medium text-sm px-5 py-2.5 rounded-xl hover:bg-emerald-50 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span v-if="editing == report.id" class="animate-spin">⟳</span>
                  Pre-Approve
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="!reports.length && !loading" class="text-center py-20">
        <div class="mx-auto w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 class="text-xl font-medium text-slate-900 mb-2">No Reports Found</h3>
        <p class="text-slate-600 max-w-md mx-auto">
          {{ hasActiveFilters ? 'No reports match your filters.' : 'No activity reports have been generated yet.' }}
        </p>
        <button
          v-if="hasActiveFilters"
          @click="resetFilters"
          class="mt-6 text-blue-600 hover:text-blue-700 font-medium"
        >
          Clear Filters
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20">
      <div class="animate-spin rounded-full h-14 w-14 border-b-2 border-blue-600"></div>
      <p class="text-slate-600 mt-5">Loading reports...</p>
    </div>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2'
import { ref, onMounted, computed, watch } from 'vue'

const reports = ref([])
const successTeams = ref([])
const loading = ref(false)
const editing = ref(null)
const filters = ref({
  success_team_id: '',
  period: '' // Will be in "January-2026" format
})

// Month-Year Picker State
const showPicker = ref(false)
const currentYear = ref(new Date().getFullYear())

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

onMounted(() => {
  fetchReports()
  fetchTeams()
})

// Fetch success teams
const fetchTeams = async () => {
  try {
    const { data } = await api().get('/my-success-team')
    successTeams.value = data.data?.data ?? data.data ?? []
  } catch (error) {
    console.error('Error fetching teams:', error)
  }
}

// Fetch reports with filters
const fetchReports = async () => {
  loading.value = true
  try {
    // Build query params
    const params = {}
    if (filters.value.success_team_id) {
      params.success_team_id = filters.value.success_team_id
    }
    if (filters.value.period) {
      params.period = filters.value.period
    }

    const { data } = await api().get('/success-team-activity-reports?status=0', {
      params
    })
    reports.value = data.data ?? data ?? []
  } catch (error) {
    console.error('Error fetching reports:', error)
    reports.value = []
  } finally {
    loading.value = false
  }
}

// Reset all filters
const resetFilters = () => {
  filters.value = {
    success_team_id: '',
    period: ''
  }
  currentYear.value = new Date().getFullYear()
  fetchReports()
}

// Clear period filter only
const clearPeriod = () => {
  filters.value.period = ''
}

// Computed properties
const displayPeriod = computed(() => {
  return filters.value.period || 'Select month and year'
})

const selectedTeamName = computed(() => {
  if (!filters.value.success_team_id) return ''
  const team = successTeams.value.find(t => t.id == filters.value.success_team_id)
  return team?.name || ''
})

const hasActiveFilters = computed(() => {
  return filters.value.success_team_id || filters.value.period
})

// Month-Year Picker Methods
const isSelected = (monthIndex) => {
  if (!filters.value.period) return false

  try {
    const [month, year] = filters.value.period.split('-')
    return months[monthIndex] === month && parseInt(year) === currentYear.value
  } catch {
    return false
  }
}

const selectMonth = (monthIndex) => {
  const selectedMonth = months[monthIndex]
  filters.value.period = `${selectedMonth}-${currentYear.value}`
  showPicker.value = false
}

const selectCurrentMonth = () => {
  const now = new Date()
  const currentMonth = months[now.getMonth()]
  filters.value.period = `${currentMonth}-${now.getFullYear()}`
  currentYear.value = now.getFullYear()
  showPicker.value = false
}

const prevYear = () => {
  currentYear.value -= 1
}

const nextYear = () => {
  currentYear.value += 1
}

const handleBlur = () => {
  setTimeout(() => {
    showPicker.value = false
  }, 200)
}

// Edit report function
const editReport = async(id) => {
  editing.value = id
  try{
  const response = await api().post('/success-team-activity-reports/'+id,{
    status : 2,
    _method:'put'
  })
      Swal.fire({
      title: " Pre Approved!",
      text: "Report has been approved.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  if(response)
  fetchReports()
}
catch(error)
{
    Swal.fire({
      title: "Error!",
      text: "Failed to approve the report.",
      icon: "error",
    });
}
finally{
  editing.value = null
}
}

// Format helpers
const formatDate = (dateString) => {
  if (!dateString) return '—'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatTime = (dateString) => {
  if (!dateString) return '—'
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const statusText = (status) => {
  return {
    '0': 'Draft',
    '1': 'Submitted',
    '2': 'Approved'
  }[status] || 'Unknown'
}

const statusClass = (status) => {
  return {
    '0': 'bg-gray-100 text-gray-800',
    '1': 'bg-blue-100 text-blue-800',
    '2': 'bg-green-100 text-green-800'
  }[status] || 'bg-gray-100 text-gray-800'
}

const statusDotClass = (status) => {
  return {
    '0': 'bg-gray-500',
    '1': 'bg-blue-500',
    '2': 'bg-green-500'
  }[status] || 'bg-gray-500'
}
const deleteReport = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This report will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!"
  })

  if (!result.isConfirmed) return

  try {
    await api().delete(`/success-team-activity-reports/${id}`)

    Swal.fire({
      title: "Deleted!",
      text: "Report has been deleted.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    })

    fetchReports()
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "Failed to delete the report.",
      icon: "error",
    })
  }
}
// Watch for filter changes to auto-apply (optional)
// Uncomment if you want filters to apply automatically
// watch(filters, () => {
//   fetchReports()
// }, { deep: true })
</script>

<style scoped>
/* Additional styles if needed */
</style>
