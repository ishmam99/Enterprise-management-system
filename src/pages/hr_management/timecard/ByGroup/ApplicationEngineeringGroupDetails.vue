<template>
  <div class="p-6 min-h-screen w-4/5 bg-gray-50">
    <!-- Header -->
    <div class="flex flex-col gap-4 mb-6">
      <div class="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl shadow-xl p-6 w-full relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-full"></div>
          <div class="absolute -bottom-8 -left-8 w-32 h-32 bg-white rounded-full"></div>
        </div>

        <div class="relative z-10 flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="bg-white bg-opacity-20 p-3 rounded-2xl shadow-lg">
              <span class="text-2xl">⏱️</span>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-white mb-1 drop-shadow-lg">
                Application Engineering Person Timecard List
              </h1>
              <p class="text-indigo-100 text-sm font-medium">
                View and review application engineering team timecard logs across multiple accounts
              </p>
            </div>
          </div>
          <div class="hidden sm:block bg-white bg-opacity-20 px-4 py-2 rounded-xl">
            <span class="text-white font-semibold text-lg">{{ timecards.length }}</span>
            <span class="text-indigo-100 text-sm ml-1">Records</span>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
        <div class="flex flex-col md:flex-row gap-4 items-end">
          <!-- Employee Name Filter -->
          <div class="flex-1">
            <label class="block text-gray-600 text-sm font-semibold mb-2">
              <span class="flex items-center gap-1">
                <span>👤</span>
                Employee Name
              </span>
            </label>
            <select
              v-model="selectedEmployee"
              class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              @change="handleFilterChange"
            >
              <option value="">All Employees</option>
              <option
                v-for="employee in employees"
                :key="employee.id"
                :value="employee.id"
              >
                {{ employee.name }}
              </option>
            </select>
          </div>

          <!-- Time Period Filter -->
          <div class="flex-1">
            <label class="block text-gray-600 text-sm font-semibold mb-2">
              <span class="flex items-center gap-1">
                <span>📅</span>
                Time Period
              </span>
            </label>
            <select
              v-model="selectedPeriod"
              class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              @change="handleFilterChange"
            >
              <option value="">All Time</option>
              <option value="today">Today</option>
              <option value="current_week">Current Week</option>
              <option value="last_week">Last Week</option>
              <option value="current_month">Current Month</option>
              <option value="last_month">Last Month</option>
            </select>
          </div>

          <!-- Reset Button -->
          <div>
            <button
              @click="resetFilters"
              class="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
            >
              <span>🔄</span>
              Reset
            </button>
          </div>
        </div>
      </div>

      <!-- Date Range Filter Section -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 mt-4">
        <div class="flex flex-col md:flex-row gap-4 items-end">
          <!-- From Date -->
          <div class="flex-1">
            <label class="block text-gray-600 text-sm font-semibold mb-2">
              <span class="flex items-center gap-1">
                <span>📅</span>
                From Date
              </span>
            </label>
            <input
              type="date"
              v-model="fromDate"
              class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <!-- To Date -->
          <div class="flex-1">
            <label class="block text-gray-600 text-sm font-semibold mb-2">
              <span class="flex items-center gap-1">
                <span>📅</span>
                To Date
              </span>
            </label>
            <input
              type="date"
              v-model="toDate"
              class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <!-- Apply Filter Button -->
          <div>
            <button
              @click="applyDateRangeFilter"
              :disabled="isApplyingFilter"
              class="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <svg
                v-if="isApplyingFilter"
                class="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span v-else>🔍</span>
              <span>{{ isApplyingFilter ? 'Applying...' : 'Apply Filter' }}</span>
            </button>
          </div>

          <!-- Reset Range Button -->
          <div>
            <button
              @click="resetDateRangeFilter"
              class="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
            >
              <span>🔄</span>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white rounded-2xl shadow-xl border border-gray-100">
      <table class="min-w-full text-sm text-gray-700">
        <thead class="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-left">
          <tr>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">#</th>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Application Engineering Rep</th>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Role</th>

            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Date</th>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Account Name</th>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Allocated Hours</th>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Total Hours</th>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Sales Activity</th>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Status</th>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(row, index) in timecards"
            :key="row.id"
            class="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200"
          >
            <td class="py-4 border-e px-6 font-medium text-gray-900">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
            <td class="py-4 border-e px-6 font-semibold flex items-center">
              <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              {{ row.user.name }}
            </td>
            <td class="py-4 border-e px-6 text-gray-700">{{ row.user.role }}</td>
              <td class="py-4 border-e px-6 text-nowrap text-gray-700">{{ row.date }}</td>
            <td class="py-4 border-e px-6">
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="time in row.times"
                  :key="time.id"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-1"
                >
                  {{ time?.account?.name || 'N/A' }}
                </span>
              </div>
            </td>
            <td class="py-4 border-e px-6">
              <div
                v-for="time in row.times"
                :key="time.id"
                class="items-center px-2 py-1 rounded-full text-xs font-medium mb-1"
              >
                {{ time.total_hours }}
              </div>
            </td>

            <td class="py-4 border-e px-6 text-gray-900 font-semibold">
              {{ row.times?.reduce((sum, t) => sum + parseFloat(t.total_hours || 0), 0).toFixed(2) || row.total_working_hours || '0.00' }}
            </td>
            <td class="py-4 border-e px-6 text-gray-700 max-w-xs truncate">
              <div
                v-for="timeData in row.times"
                :key="timeData.id"
                class="items-center px-2 py-1 rounded-full text-xs font-medium mb-1"
              >
                {{ timeData.activity || timeData.type_of_work || 'N/A' }}
              </div>
            </td>
            <td class="py-4 border-e px-6">
              <span :class="getStatusClass(row.status)" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium">
                <i :class="getStatusIcon(row.status)"></i>
                {{ getStatusText(row.status) }}
              </span>
            </td>
            <td class="py-4 border-e px-6 text-right">
              <button
                v-if="['0', '1', '2'].includes(String(row.status))"
                @click="approveTimecard(row)"
                :disabled="approvingId === row.id"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i v-if="approvingId === row.id" class="ri-loader-4-line animate-spin -ml-1 mr-2 h-5 w-5"></i>
                <i v-else class="ri-check-line -ml-1 mr-2 h-5 w-5"></i>
                {{ approvingId === row.id ? 'Approving...' : 'Approve' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div v-if="timecards.length > 0" class="flex flex-col sm:flex-row justify-between items-center px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div class="text-sm text-gray-600 mb-3 sm:mb-0">
          Showing {{ meta?.from }} to {{ meta?.to }} of {{ meta?.total }} records
        </div>
        <div class="flex space-x-1">


          <button
            v-for="page in meta?.links"
            :key="page"
            class="px-4 py-2 rounded-lg font-medium transition-all duration-200"
            :class="page.active
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'"
            :disabled="!page.url"
            @click="handlePageClick(page)"
          >
          <span v-html="page.label"></span>

          </button>


        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { time } from 'echarts'
import moment from 'moment'
import { ref, computed, watch, onMounted } from 'vue'
import api from '@/config/api'

// Sales team data with sales roles
const employees = ref([
])
const meta = ref()

const loading  = ref('')
// All timecards data with multiple accounts per sales rep
const timecards = ref([])

const selectedEmployee = ref('')
const selectedPeriod = ref('')
const fromDate = ref('')
const toDate = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(20)
const isApplyingFilter = ref(false)
const approvingId = ref(null)

// Extract unique employees from timecards
const extractEmployeesFromTimecards = (timecardsData) => {
  if (!timecardsData || timecardsData.length === 0) return

  const uniqueEmployees = new Map()
  timecardsData.forEach(row => {
    if (row.user && row.user.id && !uniqueEmployees.has(row.user.id)) {
      uniqueEmployees.set(row.user.id, {
        id: row.user.id,
        name: row.user.name
      })
    }
  })

  // Merge with existing employees (avoid duplicates)
  const existingIds = new Set(employees.value.map(e => e.id))
  const newEmployees = Array.from(uniqueEmployees.values()).filter(e => !existingIds.has(e.id))
  employees.value = [...employees.value, ...newEmployees].sort((a, b) => a.name.localeCompare(b.name))
}

// Fetch all employees on initial load (without filters)
const fetchAllEmployees = async () => {
  try {
    const { data } = await api().get('attendance?status=1&per_page=100')
    if (data.data && data.data.length > 0) {
      extractEmployeesFromTimecards(data.data)
    }
  } catch (error) {
    console.error('Error fetching employees:', error)
  }
}

// Calculate date ranges based on selected period or custom date range
const getDateRange = () => {
  let startDate = ''
  let endDate = ''

  // Check if custom date range is provided (has priority)
  if (fromDate.value && toDate.value) {
    startDate = fromDate.value
    endDate = toDate.value
    return { startDate, endDate }
  }

  // If no custom range, use period filter
  switch (selectedPeriod.value) {
    case 'today':
      startDate = moment().format('YYYY-MM-DD')
      endDate = moment().format('YYYY-MM-DD')
      break
    case 'current_week':
      startDate = moment().startOf('week').format('YYYY-MM-DD')
      endDate = moment().endOf('week').format('YYYY-MM-DD')
      break
    case 'last_week':
      startDate = moment().subtract(1, 'week').startOf('week').format('YYYY-MM-DD')
      endDate = moment().subtract(1, 'week').endOf('week').format('YYYY-MM-DD')
      break
    case 'current_month':
      startDate = moment().startOf('month').format('YYYY-MM-DD')
      endDate = moment().endOf('month').format('YYYY-MM-DD')
      break
    case 'last_month':
      startDate = moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD')
      endDate = moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
      break
    default:
      // No date filter
      break
  }

  return { startDate, endDate }
}

const fetchTimeCards = async()=>{
  try {
    const { startDate, endDate } = getDateRange()

    // Build query parameters
    const params = new URLSearchParams()
    params.append('status', '1')
    params.append('per_page', itemsPerPage.value)
    params.append('page', currentPage.value)

    // Add employee filter if selected
    if (selectedEmployee.value) {
      params.append('user_id', selectedEmployee.value)
    }

    // Add date range filter if period is selected or custom date range is provided
    if (startDate && endDate) {
      params.append('start_date', startDate)
      params.append('end_date', endDate)
    }

    const { data } = await api().get(`attendance?${params.toString()}`)
    timecards.value = data.data
    meta.value = data.meta

    // Extract unique employees from timecards data
    extractEmployeesFromTimecards(data.data)
  } catch (error) {
    console.error('Error fetching timecards:', error)
  } finally {
    isApplyingFilter.value = false
  }
}

// Status helper functions
const getStatusText = (status) => {
  const statusStr = String(status)
  switch (statusStr) {
    case '0':
      return 'Pending'
    case '1':
      return 'Employee Approval'
    case '2':
      return 'Manager Approval'
    case '3':
      return 'HR Approval'
    default:
      return 'Unknown'
  }
}

const getStatusClass = (status) => {
  const statusStr = String(status)
  switch (statusStr) {
    case '0':
      return 'bg-yellow-100 text-yellow-800'
    case '1':
      return 'bg-blue-100 text-blue-800'
    case '2':
      return 'bg-purple-100 text-purple-800'
    case '3':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusIcon = (status) => {
  const statusStr = String(status)
  switch (statusStr) {
    case '0':
      return 'ri-time-line'
    case '1':
      return 'ri-user-check-line'
    case '2':
      return 'ri-user-star-line'
    case '3':
      return 'ri-checkbox-circle-fill'
    default:
      return 'ri-question-line'
  }
}

// Approve timecard function
const approveTimecard = async (timecard) => {
  try {
    approvingId.value = timecard.id
    const { data } = await api().post(`attendance/${timecard.id}`, {
      _method: 'PUT',
      status: 3,
      date: timecard.date,
      user_id: timecard.user_id
    })
    if (data.status) {
      // Update the status in the local data
      const index = timecards.value.findIndex(tc => tc.id === timecard.id)
      if (index !== -1) {
        timecards.value[index].status = '3'
      }
    }
  } catch (error) {
    console.error('Error approving timecard:', error)
    alert('Failed to approve timecard. Please try again.')
  } finally {
    approvingId.value = null
  }
}

const updateTimeCard =  async(time) => {
  loading.value = time.id
  const {data} = await api().post('attendance/'+time.id,{
    _method:'PUT',
    status : 1,
    date:time.date,
    user_id:time.user_id
  })
  console.log(data.status)
  if(data.status)
  {
    loading.value = ''
    fetchTimeCards()
  }
}

// Handle filter changes
const handleFilterChange = () => {
  currentPage.value = 1
  fetchTimeCards()
}

// Reset all filters
const resetFilters = () => {
  selectedEmployee.value = ''
  selectedPeriod.value = ''
  fromDate.value = ''
  toDate.value = ''
  currentPage.value = 1
  fetchTimeCards()
}

// Apply custom date range filter
const applyDateRangeFilter = async () => {
  if (fromDate.value && toDate.value) {
    isApplyingFilter.value = true
    // Clear period filter when custom date range is applied
    selectedPeriod.value = ''
    currentPage.value = 1
    await fetchTimeCards()
  } else {
    alert('Please select both From Date and To Date')
  }
}

// Reset date range filter only
const resetDateRangeFilter = () => {
  fromDate.value = ''
  toDate.value = ''
  currentPage.value = 1
  fetchTimeCards()
}

// Handle pagination clicks
const handlePageClick = (page) => {
  if (!page.url) return

  // Extract page number from URL or use label
  if (page.url) {
    const url = new URL(page.url)
    const pageNum = url.searchParams.get('page')
    if (pageNum) {
      currentPage.value = parseInt(pageNum)
      fetchTimeCards()
    }
  } else if (page.label && !isNaN(parseInt(page.label))) {
    currentPage.value = parseInt(page.label)
    fetchTimeCards()
  }
}

// Watch for employee changes and reset to page 1
watch(selectedEmployee, () => {
  currentPage.value = 1
  fetchTimeCards()
})

// Watch for period changes
watch(selectedPeriod, () => {
  // Clear custom date range when period is selected
  if (selectedPeriod.value) {
    fromDate.value = ''
    toDate.value = ''
  }
  currentPage.value = 1
  fetchTimeCards()
})

onMounted(async ()=>{
  // Fetch all employees first to populate dropdown
  await fetchAllEmployees()
  // Then fetch timecards with current filters
  await fetchTimeCards()
})
</script>

<style scoped>
.overflow-x-auto::-webkit-scrollbar { height: 8px; }
.overflow-x-auto::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
.overflow-x-auto::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 4px; }
.overflow-x-auto::-webkit-scrollbar-thumb:hover { background: #a8a8a8; }
</style>
