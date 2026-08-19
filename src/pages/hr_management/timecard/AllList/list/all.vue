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
                Sales Timecard Details
              </h1>
              <p class="text-indigo-100 text-sm font-medium">
                View and review sales team timecard logs across multiple accounts
              </p>
            </div>
          </div>
          <div class="hidden sm:block bg-white bg-opacity-20 px-4 py-2 rounded-xl">
            <span class="text-white font-semibold text-lg">{{ filteredTimecards.length }}</span>
            <span class="text-indigo-100 text-sm ml-1">Records</span>
          </div>
        </div>
      </div>

      <!-- Employee Selector -->
      <div class="flex items-center space-x-4">
        <div class="bg-white px-4 py-2 rounded-xl shadow-md border border-gray-100">
          <span class="text-gray-600 text-sm mr-3">Select Sales Rep:</span>
          <select 
            v-model="selectedEmployee" 
            class="bg-transparent border-0 outline-none text-blue-600 font-semibold focus:ring-0"
          >
            <option value="">All Sales Reps</option>
            <option 
              v-for="employee in employees" 
              :key="employee.id" 
              :value="employee.id"
            >
              {{ employee.name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <span class="loading loading-spinner loading-lg text-blue-600"></span>
      <span class="ml-3 text-gray-600">Loading timecard data...</span>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
      <div class="text-red-500 text-lg font-semibold mb-2">Failed to Load Data</div>
      <p class="text-red-600 mb-4">{{ error }}</p>
      <button 
        @click="fetchTimecards"
        class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        Retry
      </button>
    </div>

    <!-- Table -->
    <div v-else class="overflow-x-auto bg-white rounded-2xl shadow-xl border border-gray-100">
      <table class="min-w-full text-sm text-gray-700">
        <thead class="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-left">
          <tr>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">#</th>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Employee</th>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Role</th>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Account Name</th>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Date</th>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Allocated Hours</th>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Total Hours</th>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Type Of Work</th>
            <!-- <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Status</th> -->
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(row, index) in paginatedTimecards"
            :key="row.id"
            class="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200"
          >
            <td class="py-4 border-e px-6 font-medium text-gray-900">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
            <td class="py-4 border-e px-6 font-semibold flex items-center">
              <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              {{ row.user.name }}
            </td>
            <td class="py-4 border-e px-6 text-gray-700">{{ row.user.role }}</td>
            <td class="py-4 border-e px-6">
              <div v-for="t in row.times" :key="t.id" class="mb-1">
                {{ t.account.name }}
              </div>
            </td>

            <td class="py-4 border-e px-6 text-gray-700">{{ formatDate(row.date) }}</td>
            <!-- <td class="py-4 border-e px-6 text-gray-700">{{ row.allocated_hours }}h</td> -->
              <td class="py-4 border-e px-6 text-gray-900 font-semibold">
              {{ formatMinutesToHours(row.total_working_minute) }}
            </td>
            <!-- <td class="py-4 border-e px-6 text-gray-900 font-semibold">{{ row.total_working_minute }}h</td> -->
             <td class="py-4 border-e px-6 text-gray-900 font-semibold">
              {{ formatMinutesToHours(row.total_working_minute) }}
            </td>

            <td class="py-4 border-e px-6 text-gray-700 max-w-xs truncate"
              :title="row.times.map(t => t.type_of_work).join(', ')">
            {{ row.times.map(t => t.type_of_work).join(', ') }}
          </td>

            <!-- <td class="py-4 border-e px-6">
              <span
                class="px-2 py-1 rounded-full text-xs font-medium capitalize"
                :class="{
                  'bg-yellow-100 text-yellow-800': row.status === '0' || row.status === 'pending',
                  'bg-green-100 text-green-800': row.status === '1' || row.status === 'approved',
                  'bg-red-100 text-red-800': row.status === '2' || row.status === 'rejected'
                }"
              >
                {{ getStatusText(row.status) }}
              </span>
            </td> -->
            <td class="py-4 border-e px-6 text-gray-900 font-semibold">
              <button 
                class="px-5 py-2.5 rounded-xl shadow-md bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
                @click="approveTimecard(row.id)"
                :disabled="actionLoading || row.status === '1'"
                :class="row.status === '1' ? 'opacity-50 cursor-not-allowed' : ''"
              >
                <span v-if="actionLoading && approvingId === row.id" class="loading loading-spinner loading-xs"></span>
                {{ row.status === '1' ? 'Approved' : 'Approve' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div v-if="filteredTimecards.length === 0" class="text-center py-12">
        <div class="text-gray-400 text-6xl mb-4">⏱️</div>
        <h3 class="text-lg font-semibold text-gray-600 mb-2">No timecard records found</h3>
        <p class="text-gray-500">No timecard data available for the selected criteria.</p>
      </div>

      <!-- Pagination -->
      <div v-if="filteredTimecards.length > 0 && meta" class="flex flex-col sm:flex-row justify-between items-center px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div class="text-sm text-gray-600 mb-3 sm:mb-0">
          Showing {{ showingFrom }} to {{ showingTo }} of {{ filteredTimecards.length }} records
        </div>
        <div class="join">
          <button 
            v-for="link in meta.links" 
            :key="link.label" 
            class="join-item btn btn-sm" 
            :class="{'btn-active': link.active}" 
            @click="handlePagination(link)"
            v-html="link.label"
          ></button>
        </div>
      </div>
    </div>

    <!-- Timecard Details Modal -->
    <div v-if="selectedTimecard" class="modal modal-open">
      <div class="modal-box max-w-4xl">
        <h3 class="font-bold text-lg mb-4">Timecard Details</h3>

        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label class="font-semibold text-gray-700">Timecard ID:</label>
            <p class="text-gray-900">{{ selectedTimecard.id }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Employee:</label>
            <p class="text-gray-900">{{ getEmployeeName(selectedTimecard.employee_id) }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Role:</label>
            <p class="text-gray-900">{{ getEmployeeRole(selectedTimecard.employee_id) }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Account:</label>
            <p class="text-gray-900">{{ selectedTimecard.account_name }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Date:</label>
            <p class="text-gray-900">{{ formatDate(selectedTimecard.date) }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Allocated Hours:</label>
            <p class="text-gray-900">{{ selectedTimecard.allocated_hours }}h</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Total Hours:</label>
            <p class="text-gray-900">{{ selectedTimecard.total_hours }}h</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Status:</label>
            <span
              class="px-2 py-1 rounded-full text-xs font-medium capitalize"
              :class="{
                'bg-yellow-100 text-yellow-800': selectedTimecard.status === '0',
                'bg-green-100 text-green-800': selectedTimecard.status === '1',
                'bg-red-100 text-red-800': selectedTimecard.status === '2'
              }"
            >
              {{ getStatusText(selectedTimecard.status) }}
            </span>
          </div>
        </div>

        <div class="mb-6">
          <label class="font-semibold text-gray-700">Work Description:</label>
          <p class="text-gray-900 mt-2">{{ selectedTimecard.description || 'No description available' }}</p>
        </div>

        <div class="modal-action">
          <button class="btn" @click="selectedTimecard = null">Close</button>
          <div v-if="selectedTimecard.status === '0'" class="flex gap-2">
            <button
              @click="approveTimecard(selectedTimecard.id)"
              class="btn btn-success text-white"
              :disabled="actionLoading"
            >
              <span v-if="actionLoading && approvingId === selectedTimecard.id" class="loading loading-spinner loading-xs"></span>
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from '@/components/ui/toast/use-toast'
import { ref, onMounted, computed, reactive, watch } from 'vue'
import Swal from 'sweetalert2'
import api from '@/config/api'

const { toast } = useToast()

// Data
const timecards = ref([])
const employees = ref([])
const selectedTimecard = ref(null)
const loading = ref(false)
const actionLoading = ref(false)
const approvingId = ref(null)
const currentPage = ref(1)
const itemsPerPage = ref(10)
const meta = ref()

// Filters
const selectedEmployee = ref('')

// Fetch timecards from API
const fetchTimecards = async () => {
  loading.value = true
  try {
    const response = await api().get(`attendance`)
    console.log('API Response:', response.data) 
    timecards.value = response.data.data || response.data
    meta.value = response.data.meta
  } catch (error) {
    console.error('Error fetching timecards:', error)
    toast({
      title: 'Error',
      description: 'Failed to load timecards',
      variant: 'destructive'
    })
  } finally {
    loading.value = false
  }
}

const formatMinutesToHours = (minutes) => {
  minutes = Number(minutes) || 0;
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs}h ${mins}m`;
}


// Fetch employees for name resolution
// const fetchEmployees = async () => {
//   try {
//     const response = await api().get('employees')
//     employees.value = response.data.data || response.data
//   } catch (error) {
//     console.error('Error fetching employees:', error)
//     // Fallback to mock employees if API fails
//     employees.value = [
//       { id: 1, name: 'John Doe', role: 'Account Executive' },
//       { id: 2, name: 'Mary Smith', role: 'Sales Manager' },
//       { id: 3, name: 'Aziz Rahman', role: 'Business Development Rep' },
//       { id: 4, name: 'Lisa Brown', role: 'Sales Engineer' },
//       { id: 5, name: 'Kamal Hossain', role: 'Customer Success Manager' },
//       { id: 6, name: 'Sarah Johnson', role: 'Enterprise Sales' },
//       { id: 7, name: 'Mike Chen', role: 'Regional Sales Director' }
//     ]
//   }
// }

// Helper functions to get employee details
// const getEmployeeName = (employeeId) => {
//   const employee = employees.value.find(emp => emp.id == employeeId)
//   return employee?.name || 'Unknown Employee'
// }

// const getEmployeeRole = (employeeId) => {
//   const employee = employees.value.find(emp => emp.id == employeeId)
//   return employee?.role || 'Sales Representative'
// }

// Helper function to convert status codes to text
const getStatusText = (status) => {
  switch(status) {
    case '0': return 'pending'
    case '1': return 'approved'
    case '2': return 'rejected'
    default: return status
  }
}

// Format date for display
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch {
    return dateString
  }
}

// Handle pagination
const handlePagination = (link) => {
  if (link.url && !link.active) {
    const url = new URL(link.url)
    currentPage.value = parseInt(url.searchParams.get('page')) || 1
    fetchTimecards()
  }
}

// Filter timecards
const filteredTimecards = computed(() => {
  let filtered = timecards.value

  // Filter by selected employee
  if (selectedEmployee.value) {
    filtered = filtered.filter(timecard => 
      timecard.employee_id == selectedEmployee.value
    )
  }

  return filtered
})

// Paginated timecards
const paginatedTimecards = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredTimecards.value.slice(start, end)
})

const showingFrom = computed(() => {
  return (currentPage.value - 1) * itemsPerPage.value + 1
})

const showingTo = computed(() => {
  const end = currentPage.value * itemsPerPage.value
  return end > filteredTimecards.value.length ? filteredTimecards.value.length : end
})

// Approve timecard
const approveTimecard = async (timecardId) => {
  approvingId.value = timecardId
  actionLoading.value = true

  try {
    const payload = {
      status: 1,
      _method: "PUT"
    }

    await api().post(
      `attendance/${timecardId}`,
      payload
    )

    // Update local state
    const timecardIndex = timecards.value.findIndex(tc => tc.id === timecardId)
    if (timecardIndex !== -1) {
      timecards.value[timecardIndex].status = '1'
    }

    Swal.fire({
      title: 'Approved!',
      text: `Timecard has been approved.`,
      icon: 'success'
    })

    // Close modal if open
    if (selectedTimecard.value && selectedTimecard.value.id === timecardId) {
      selectedTimecard.value = null
    }
  } catch (error) {
    console.error('Error approving timecard:', error)
    Swal.fire({
      title: 'Error',
      text: 'Failed to approve timecard. Please try again.',
      icon: 'error'
    })
  } finally {
    actionLoading.value = false
    approvingId.value = null
  }
}

// View details
const viewDetails = (timecard) => {
  selectedTimecard.value = timecard
}

// Helper function for account color coding
const getAccountColor = (accountName) => {
  const colors = {
    'blue': 'bg-blue-100 text-blue-800',
    'green': 'bg-green-100 text-green-800',
    'yellow': 'bg-yellow-100 text-yellow-800',
    'red': 'bg-red-100 text-red-800',
    'purple': 'bg-purple-100 text-purple-800',
    'indigo': 'bg-indigo-100 text-indigo-800',
    'pink': 'bg-pink-100 text-pink-800',
    'orange': 'bg-orange-100 text-orange-800'
  };
  
  const colorKeys = Object.keys(colors);
  const hash = accountName.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const colorKey = colorKeys[Math.abs(hash) % colorKeys.length];
  return colors[colorKey];
}

// Watch for employee changes and reset to page 1
watch(selectedEmployee, () => {
  currentPage.value = 1
})

// Fetch data on component mount
onMounted(() => {
  fetchTimecards()
  // fetchEmployees()
})
</script>

<style scoped>
.overflow-x-auto::-webkit-scrollbar { height: 8px; }
.overflow-x-auto::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
.overflow-x-auto::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 4px; }
.overflow-x-auto::-webkit-scrollbar-thumb:hover { background: #a8a8a8; }
</style>