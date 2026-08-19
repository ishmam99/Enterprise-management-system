<template>
  <div class="p-4 min-h-screen w-4/5 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
    <!-- Employee Header Card -->
    <div class="mb-4">
      <div class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl shadow-lg p-4 relative overflow-hidden">
        <div class="absolute inset-0 opacity-20">
          <div class="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
          <div class="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24"></div>
        </div>

        <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between">
          <div class="flex items-center space-x-4 mb-2 md:mb-0">
            <div class="bg-white bg-opacity-30 backdrop-blur-sm p-3 rounded-xl shadow-lg">
              <i class="ri-user-3-line text-xl text-white"></i>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                {{ userName || 'Employee' }}
              </h1>
              <div class="flex items-center gap-3 text-indigo-100 text-sm">
                <span class="flex items-center gap-1">
                  <i class="ri-time-line text-xs"></i>
                  <span>Timecard Records</span>
                </span>
                <span class="flex items-center gap-1">
                  <i class="ri-calendar-line text-xs"></i>
                  <span>{{ timecards.length }} Entries</span>
                </span>
              </div>
            </div>
          </div>

          <div class="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
            <div class="text-center">
              <div class="text-xl font-bold text-white">{{ totalHours }}</div>
              <div class="text-indigo-100 text-xs font-medium">Total Hours</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Summary Statistics Cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
      <div class="bg-white rounded-xl shadow-md p-3 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-xs font-medium mb-0.5">This Week</p>
            <p class="text-lg font-bold text-gray-800">{{ thisWeekHours }}h</p>
          </div>
          <div class="bg-blue-100 p-2 rounded-lg">
            <i class="ri-calendar-week-line text-lg text-blue-600"></i>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-md p-3 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-xs font-medium mb-0.5">This Month</p>
            <p class="text-lg font-bold text-gray-800">{{ thisMonthHours }}h</p>
          </div>
          <div class="bg-green-100 p-2 rounded-lg">
            <i class="ri-calendar-month-line text-lg text-green-600"></i>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-md p-3 border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-xs font-medium mb-0.5">Approved</p>
            <p class="text-lg font-bold text-gray-800">{{ approvedCount }}</p>
          </div>
          <div class="bg-purple-100 p-2 rounded-lg">
            <i class="ri-checkbox-circle-line text-lg text-purple-600"></i>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-md p-3 border-l-4 border-orange-500 hover:shadow-lg transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-xs font-medium mb-0.5">Pending</p>
            <p class="text-lg font-bold text-gray-800">{{ pendingCount }}</p>
          </div>
          <div class="bg-orange-100 p-2 rounded-lg">
            <i class="ri-time-line text-lg text-orange-600"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Filter Buttons -->
    <div class="bg-white rounded-xl shadow-md border border-gray-100 p-3 mb-3">
      <h3 class="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
        <i class="ri-filter-3-line text-blue-600 text-base"></i>
        Quick Filters
      </h3>
      <div class="flex flex-wrap gap-2 items-center">
        <button
          v-for="filter in quickFilters"
          :key="filter.value"
          @click="applyQuickFilter(filter.value)"
          :class="[
            'px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5',
            selectedPeriod === filter.value
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:shadow-sm'
          ]"
        >
          <i :class="filter.icon + ' text-xs'"></i>
          <span>{{ filter.label }}</span>
        </button>
        <button
          @click="resetFilters"
          class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 bg-red-100 hover:bg-red-200 text-red-700 hover:shadow-sm"
        >
          <i class="ri-refresh-line text-xs"></i>
          <span>Reset</span>
        </button>
      </div>
    </div>

    <!-- Custom Date Range -->
    <div class="bg-white rounded-xl shadow-md border border-gray-100 p-3 mb-4">
      <h3 class="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
        <i class="ri-calendar-2-line text-blue-600 text-base"></i>
        Custom Date Range
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-2">
        <div>
          <label class="block text-gray-600 text-xs font-semibold mb-1">
            From Date
          </label>
          <input
            type="date"
            v-model="fromDate"
            class="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label class="block text-gray-600 text-xs font-semibold mb-1">
            To Date
          </label>
          <input
            type="date"
            v-model="toDate"
            class="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div class="flex items-end gap-2">
          <button
            @click="applyDateRangeFilter"
            :disabled="isApplyingFilter || !fromDate || !toDate"
            class="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
          >
            <svg v-if="isApplyingFilter" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <i v-else class="ri-search-line text-xs"></i>
            <span>{{ isApplyingFilter ? 'Applying...' : 'Apply' }}</span>
          </button>
          <button
            @click="resetDateRangeFilter"
            class="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5"
          >
            <i class="ri-refresh-line text-xs"></i>
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Timecard Table -->
    <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div class="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <h3 class="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <i class="ri-table-line text-blue-600 text-base"></i>
          Timecard Records
        </h3>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gradient-to-r from-blue-600 to-indigo-600">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">#</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Date</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Total Hours</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Accounts</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Activities</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Status</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="(row, index) in timecards"
              :key="row.id"
              class="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
            >
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ (currentPage - 1) * itemsPerPage + index + 1 }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-semibold text-gray-900">{{ formatDate(row.date) }}</div>
                <div class="text-xs text-gray-500">{{ getDayName(row.date) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span class="text-sm font-bold text-gray-900">{{ row.total_working_hours }}h</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="time in row.times"
                    :key="time.id"
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {{ time.account?.name || 'N/A' }}
                  </span>
                  <span v-if="!row.times || row.times.length === 0" class="text-xs text-gray-400">No accounts</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="timeData in row.times"
                    :key="timeData.id"
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                  >
                    {{ timeData.type_of_work || 'N/A' }}
                  </span>
                  <span v-if="!row.times || row.times.length === 0" class="text-xs text-gray-400">-</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold',
                    getStatusClass(row.status)
                  ]"
                >
                  <i :class="getStatusIcon(row.status) + ' mr-1'"></i>
                  {{ getStatusLabel(row.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button
                  v-if="row.status !== '3' && row.status !== 3"
                  @click="approveTimecard(row)"
                  :disabled="approvingId === row.id"
                  class="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <svg
                    v-if="approvingId === row.id"
                    class="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <i v-else class="ri-check-line"></i>
                  <span>{{ approvingId === row.id ? 'Approving...' : 'Approve' }}</span>
                </button>
                <span
                  v-else
                  class="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold bg-green-100 text-green-800"
                >
                  <i class="ri-checkbox-circle-fill mr-1"></i>
                  Approved
                </span>
              </td>
            </tr>
            <tr v-if="timecards.length === 0">
              <td colspan="7" class="px-6 py-12 text-center">
                <div class="flex flex-col items-center justify-center">
                  <i class="ri-file-search-line text-6xl text-gray-300 mb-4"></i>
                  <p class="text-gray-500 text-lg font-medium">No timecard records found</p>
                  <p class="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="timecards.length > 0 && meta?.links" class="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div class="text-sm text-gray-600">
            Showing <span class="font-semibold">{{ meta?.from }}</span> to <span class="font-semibold">{{ meta?.to }}</span> of
            <span class="font-semibold">{{ meta?.total }}</span> records
          </div>
          <div class="flex items-center gap-2">
            <button
              v-for="page in meta?.links"
              :key="page"
              @click="handlePageClick(page)"
              :disabled="!page.url"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-all duration-200',
                page.active
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:shadow-md',
                !page.url ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              ]"
            >
              <span v-html="page.label"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from 'moment'
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/config/api'

const route = useRoute()
const userId = ref(route.params.id || '')
const userName = ref('')

const meta = ref()
const timecards = ref([])

const selectedPeriod = ref('')
const fromDate = ref('')
const toDate = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(20)
const isApplyingFilter = ref(false)
const approvingId = ref(null)

// Status helper functions
const getStatusLabel = (status) => {
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
      status: 3, // HR Approval
      date: timecard.date,
      user_id: timecard.user_id
    })

    if (data.status) {
      // Update the timecard status in the local array
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

// Quick filter options
const quickFilters = [
  { label: 'This Week', value: 'current_week', icon: 'ri-calendar-week-line' },
  { label: 'This Month', value: 'current_month', icon: 'ri-calendar-month-line' },
  { label: 'Last Week', value: 'last_week', icon: 'ri-calendar-2-line' },
  { label: 'This Year', value: 'this_year', icon: 'ri-calendar-line' },
  { label: 'Last Year', value: 'last_year', icon: 'ri-calendar-line' }
]

// Map date filter query parameter to selectedPeriod value
const mapDateFilterToPeriod = (dateFilter) => {
  switch (dateFilter) {
    case 'today':
      return 'today'
    case 'this_week':
      return 'current_week'
    case 'this_month':
      return 'current_month'
    default:
      return ''
  }
}

// Computed statistics
const totalHours = computed(() => {
  return timecards.value.reduce((sum, card) => {
    return sum + parseFloat(card.total_working_hours || 0)
  }, 0).toFixed(2)
})

const thisWeekHours = computed(() => {
  const weekStart = moment().startOf('week')
  const weekEnd = moment().endOf('week')
  return timecards.value
    .filter(card => {
      const cardDate = moment(card.date)
      return cardDate.isBetween(weekStart, weekEnd, null, '[]')
    })
    .reduce((sum, card) => sum + parseFloat(card.total_working_hours || 0), 0)
    .toFixed(2)
})

const thisMonthHours = computed(() => {
  const monthStart = moment().startOf('month')
  const monthEnd = moment().endOf('month')
  return timecards.value
    .filter(card => {
      const cardDate = moment(card.date)
      return cardDate.isBetween(monthStart, monthEnd, null, '[]')
    })
    .reduce((sum, card) => sum + parseFloat(card.total_working_hours || 0), 0)
    .toFixed(2)
})

const approvedCount = computed(() => {
  return timecards.value.filter(card => card.status === '3' || card.status === 3).length
})

const pendingCount = computed(() => {
  return timecards.value.filter(card => {
    const status = String(card.status)
    return status === '0' || status === '1' || status === '2'
  }).length
})

// Format date helper
const formatDate = (dateString) => {
  return moment(dateString).format('MMM DD, YYYY')
}

const getDayName = (dateString) => {
  return moment(dateString).format('dddd')
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
    case 'this_year':
      startDate = moment().startOf('year').format('YYYY-MM-DD')
      endDate = moment().endOf('year').format('YYYY-MM-DD')
      break
    case 'last_year':
      startDate = moment().subtract(1, 'year').startOf('year').format('YYYY-MM-DD')
      endDate = moment().subtract(1, 'year').endOf('year').format('YYYY-MM-DD')
      break
    default:
      // No date filter
      break
  }

  return { startDate, endDate }
}

// Apply quick filter
const applyQuickFilter = (period) => {
  selectedPeriod.value = period
  fromDate.value = ''
  toDate.value = ''
  currentPage.value = 1
  fetchTimeCards()
}

const fetchTimeCards = async () => {
  try {
    // Get user_id from route params
    const routeUserId = route.params.id || userId.value

    if (!routeUserId) {
      console.error('User ID is required')
      timecards.value = []
      return
    }

    // Update userId ref
    userId.value = routeUserId

    const { startDate, endDate } = getDateRange()

    // Build query parameters - user_id is ALWAYS required
    const params = new URLSearchParams()
    params.append('user_id', routeUserId)
    params.append('per_page', itemsPerPage.value)
    params.append('page', currentPage.value)

    // Add date range filter if period is selected or custom date range is provided
    if (startDate && endDate) {
      params.append('start_date', startDate)
      params.append('end_date', endDate)
    }

    // Make API call with user_id filter
    const { data } = await api().get(`attendance?${params.toString()}`)

    // Only show data for this specific user_id
    if (data.data && Array.isArray(data.data)) {
      timecards.value = data.data.filter(item => {
        // Double-check that the user_id matches
        return item.user_id === routeUserId || item.user?.id === parseInt(routeUserId)
      })
    } else {
      timecards.value = []
    }

    meta.value = data.meta

    // Extract user name from first record if available
    if (timecards.value.length > 0 && timecards.value[0].user) {
      userName.value = timecards.value[0].user.name
    } else {
      userName.value = ''
    }
  } catch (error) {
    console.error('Error fetching timecards:', error)
    timecards.value = []
  } finally {
    isApplyingFilter.value = false
  }
}

// Handle filter changes
const handleFilterChange = () => {
  currentPage.value = 1
  fetchTimeCards()
}

// Reset all filters
const resetFilters = () => {
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

// Watch for route changes
watch(() => route.params.id, (newId) => {
  if (newId) {
    userId.value = newId
    currentPage.value = 1
    fetchTimeCards()
  }
})

// Watch for query parameter changes (date_filter)
watch(() => route.query.date_filter, (newFilter) => {
  if (newFilter) {
    const period = mapDateFilterToPeriod(newFilter)
    if (period) {
      selectedPeriod.value = period
      fromDate.value = ''
      toDate.value = ''
      currentPage.value = 1
      fetchTimeCards()
    }
  }
}, { immediate: true })

onMounted(async () => {
  // Check if date_filter query parameter exists and apply it
  const dateFilter = route.query.date_filter
  if (dateFilter) {
    const period = mapDateFilterToPeriod(dateFilter)
    if (period) {
      selectedPeriod.value = period
      fromDate.value = ''
      toDate.value = ''
    }
  }
  await fetchTimeCards()
})
</script>

<style scoped>
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}
.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}
.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}
.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
