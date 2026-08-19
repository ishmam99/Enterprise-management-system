<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">
          Approved Activity Reports
        </h1>
        <p class="text-gray-600 mt-1">View and manage all success team activity reports</p>
      </div>
    </div>

    <!-- Filters Card -->
    <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-8">
      <div class="flex flex-col lg:flex-row lg:items-end gap-6">
        <!-- Success Team Filter -->
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Success Team
          </label>
          <select
            v-model="filters.success_team_id"
            class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
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
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Reporting Period
          </label>
          <div class="relative">
            <input
              :value="displayPeriod"
              @focus="showPicker = true"
              @blur="handleBlur"
              readonly
              placeholder="Select month and year"
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition cursor-pointer bg-white"
            />

            <!-- Calendar Icon -->
            <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>

            <!-- Month-Year Picker Dropdown -->
            <div
              v-if="showPicker"
              class="absolute z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl w-64"
            >
              <div class="p-4">
                <!-- Year Navigation -->
                <div class="flex items-center justify-between mb-4">
                  <button
                    @click="prevYear"
                    @mousedown.prevent
                    class="p-1 hover:bg-gray-100 rounded-lg transition"
                    type="button"
                  >
                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                  </button>
                  <span class="text-lg font-semibold text-gray-800">{{ currentYear }}</span>
                  <button
                    @click="nextYear"
                    @mousedown.prevent
                    class="p-1 hover:bg-gray-100 rounded-lg transition"
                    type="button"
                  >
                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>

                <!-- Months Grid -->
                <div class="grid grid-cols-3 gap-2">
                  <button
                    v-for="(month, index) in months"
                    :key="index"
                    @click="selectMonth(index)"
                    @mousedown.prevent
                    class="py-2 px-3 text-sm font-medium rounded-lg transition-all duration-200"
                    :class="
                      isSelected(index)
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-gray-700 hover:bg-gray-100'
                    "
                    type="button"
                  >
                    {{ month.substring(0, 3) }}
                  </button>
                </div>

                <!-- Actions -->
                <div class="flex justify-between mt-4 pt-4 border-t">
                  <button
                    @click="selectCurrentMonth"
                    @mousedown.prevent
                    class="text-sm text-primary hover:text-primary-dark font-medium px-3 py-1 rounded hover:bg-primary/5 transition"
                    type="button"
                  >
                    Current
                  </button>
                  <button
                    @click="clearPeriod"
                    @mousedown.prevent
                    class="text-sm text-gray-500 hover:text-gray-700 font-medium px-3 py-1 rounded hover:bg-gray-100 transition"
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
        <div class="flex gap-3">
          <button
            @click="fetchReports"
            class="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            Filter
          </button>

          <button
            @click="resetFilters"
            class="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Reset
          </button>
        </div>
      </div>

      <!-- Active Filters Display -->
      <div v-if="hasActiveFilters" class="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t">
        <span class="text-sm text-gray-600">Active filters:</span>
        <span
          v-if="filters.success_team_id"
          class="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm"
        >
          Team: {{ selectedTeamName }}
          <button @click="filters.success_team_id = ''" class="hover:text-blue-900">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </span>
        <span
          v-if="filters.period"
          class="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm"
        >
          Period: {{ filters.period }}
          <button @click="clearPeriod" class="hover:text-green-900">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </span>
      </div>
    </div>

    <!-- Reports Table -->
    <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <!-- Table Header -->
      <div class="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900">Activity Reports</h2>
          <span class="text-sm text-gray-600">
            {{ reports.length }} report{{ reports.length !== 1 ? 's' : '' }} found
          </span>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Team</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Period</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Created By</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">View Report</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">View PDF</th>
              <!-- <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status of Approval</th> -->

              <!-- <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th> -->
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="report in reports"
              :key="report.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                    <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ report.success_team?.name }}</p>
                    <p class="text-xs text-gray-500">ID: {{ report.success_team_id }}</p>
                  </div>
                </div>
              </td>

              <td class="px-6 py-4">
                <span class="font-medium text-gray-900">{{ report.period }}</span>
              </td>

              <td class="px-6 py-4">
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                  :class="statusClass(report.status)"
                >
                  <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="statusDotClass(report.status)"></span>
                  {{ statusText(report.status) }}
                </span>
              </td>

              <td class="px-6 py-4">
                <div>
                  <p class="font-medium text-gray-900">{{ report.user?.name }}</p>
                  <p class="text-xs text-gray-500 truncate max-w-[150px]">{{ report.user?.email }}</p>
                </div>
              </td>

              <td class="px-6 py-4">
                <p class="text-sm text-gray-900">{{ formatDate(report.created_at) }}</p>
                <p class="text-xs text-gray-500">{{ formatTime(report.created_at) }}</p>
              </td>

              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <router-link
                    :to="{name:'customer_success_manager-activity-report-id',params:{id:report.id}}"
                    class="inline-flex bg-success text-white hover:text-black items-center gap-1.5 text-primary hover:text-primary-dark text-sm font-medium px-3 py-1.5 hover:bg-primary/5 rounded transition-colors"
                  >
                  <i class="fa-regular fa-file-lines"></i>
                    View Report
                  </router-link>


                 
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <!-- <router-link
                    :to="{name:'customer_success_manager-activity-report-id',params:{id:report.id}}"
                    class="inline-flex items-center gap-1.5 text-primary hover:text-primary-dark text-sm font-medium px-3 py-1.5 hover:bg-primary/5 rounded transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    View
                  </router-link> -->

                  <router-link
                    :to="{name:'customer_success_manager-activity-report-id',query:{type: 'pdf'},params:{id:report.id}}"
                    class="inline-flex bg-info text-white hover:text-black items-center gap-1.5 text-primary hover:text-primary-dark text-sm font-medium px-3 py-1.5 hover:bg-primary/5 rounded transition-colors"
                  >
                   <i class="fas fa-file-pdf"></i>
                    View PDF
                  </router-link>
                </div>
              </td>
          
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="!reports.length && !loading" class="text-center py-16">
        <div class="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No Reports Found</h3>
        <p class="text-gray-600 max-w-md mx-auto">
          {{ hasActiveFilters
            ? 'No reports match your current filters. Try adjusting your search criteria.'
            : 'There are no activity reports generated yet.'
          }}
        </p>
        <button
          v-if="hasActiveFilters"
          @click="resetFilters"
          class="mt-4 text-primary hover:text-primary-dark font-medium"
        >
          Clear all filters
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
      <p class="text-gray-600">Loading reports...</p>
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

    const { data } = await api().get('/success-team-activity-reports?status=1', {
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
    status : 1,
    _method:'put'
  })
      Swal.fire({
      title: " Approved!",
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
    '1': 'Approved',
    '2': ' Pre Approved'
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
