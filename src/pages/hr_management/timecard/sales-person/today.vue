<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
    <!-- Animated Background Blobs -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-20 -right-20 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-40 left-40 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
    </div>

    <div class="relative z-10 p-6 w-full mx-auto max-w-full">
      <!-- Header -->
      <div class="text-center mb-8">
        <h2 class="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
          Sales Person Timecard List {{ selectedUser ? `- ${usersOfRole.find(u => u.id === selectedUser)?.name || 'User'}` : '' }}
        </h2>
        <p class="mt-2 text-md text-gray-600 font-medium">View and review sales team timecard logs across multiple accounts</p>
      </div>

      <!-- Enhanced Selection Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- ROLE DROPDOWN -->
        <div class="group">
          <label class="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3 shadow-lg">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            Select Sales Role
          </label>
          <div class="relative">
            <select
              v-model="selectedRole"
              class="w-full px-6 py-4 pl-12 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200/50 font-semibold text-gray-700 text-lg appearance-none cursor-pointer transition-all duration-300 hover:border-blue-400 hover:shadow-lg backdrop-blur-sm group-hover:scale-[1.02]"
            >
              <option value="" class="text-gray-400 text-lg py-3">-- Choose Role --</option>
              <option
                v-for="r in roles"
                :key="r"
                :value="r"
                class="text-gray-700 text-lg py-3 bg-white hover:bg-blue-50"
              >
                {{ r.replace(/-/g, ' ').toUpperCase() }}
              </option>
            </select>
            <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
            <div class="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-600">
              <div class="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                ↓
              </div>
            </div>
          </div>
        </div>

        <!-- USER DROPDOWN -->
        <div v-if="usersOfRole.length > 0" class="group">
          <label class="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3 shadow-lg">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            Select User
          </label>
          <div class="relative">
            <select
              v-model="selectedUser"
              class="w-full px-6 py-4 pl-12 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200/50 font-semibold text-gray-700 text-lg appearance-none cursor-pointer transition-all duration-300 hover:border-purple-400 hover:shadow-lg backdrop-blur-sm group-hover:scale-[1.02]"
            >
              <option value="" class="text-gray-400 text-lg py-3">-- Choose User --</option>
              <option
                v-for="u in usersOfRole"
                :key="u.id"
                :value="u.id"
                class="text-gray-700 text-lg py-3 bg-white hover:bg-purple-50"
              >
                {{ u.name }} • {{ u.email }}
              </option>
            </select>
            <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <div class="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-600">
              <div class="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                ↓
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- TIME CARDS SECTION - Only show when user is selected -->
      <div v-if="selectedUser">
        <!-- Filters Card -->
        <div class="backdrop-blur-xl bg-white/80 rounded-2xl shadow-xl border border-white/30 p-6 mb-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Date Filter -->
            <div>
              <label class="block text-sm font-medium mb-1 text-gray-700">Select Date</label>
              <input
                type="date"
                v-model="startDate"
                class="w-full px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 font-medium text-sm"
              />
            </div>

            <!-- Enhanced Status Filter -->
            <div class="group">
              <label class="block text-sm font-medium mb-1 text-gray-700">Status</label>
              <div class="relative">
                <select
                  v-model="statusFilter"
                  @change="fetchTimeCards()"
                  class="w-full px-4 py-3 pl-12 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 font-medium text-sm appearance-none cursor-pointer transition-all duration-200 hover:border-purple-400"
                >
                  <option value="0">⏳ Pending Approval</option>
                  <option value="1">✅ Approved</option>
                  <option value="">🌐 All Status</option>
                </select>
                <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div class="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-500">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Refresh Button -->
            <div class="flex items-end">
              <button
                @click="fetchTimeCards()"
                class="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh Data
              </button>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p class="mt-3 text-gray-600 font-medium">Loading timecards...</p>
        </div>

        <!-- Timecards Table -->
        <div v-else-if="timecards.length > 0" class="overflow-x-auto bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30">
          <table class="min-w-full text-sm text-gray-700">
            <thead class="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-left">
              <tr>
                <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">#</th>
                <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Sales Rep</th>
                <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Role</th>
                <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Date</th>
                <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Account Name</th>
                <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Total Hours</th>
                <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Allocated Hours</th>
                <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Sales Activity</th>
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
                      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-1 bg-blue-100 text-blue-800"
                    >
                      {{ time.account.name }}
                    </span>
                  </div>
                </td>
                <td class="py-4 border-e px-6">
                  <div
                    v-for="time in row.times"
                    :key="time.id"
                    class="items-center px-2 py-1 rounded-full text-xs font-medium mb-1 text-gray-700"
                  >
                    {{ formatHoursToHhMm(time.total_hours) }}
                  </div>
                </td>
                <td class="py-4 border-e px-6 text-gray-900 font-semibold">{{ formatHoursToHhMm(row.total_working_hours) }}</td>
                <td class="py-4 border-e px-6 text-gray-700 max-w-xs truncate">
                  <div
                    v-for="timeData in row.times"
                    :key="timeData.id"
                    class="items-center px-2 py-1 rounded-full text-xs font-medium mb-1 text-green-800 bg-green-100"
                  >
                    {{ timeData.type_of_work }}
                  </div>
                </td>
                <td class="py-4 border-e px-6 text-gray-900 font-semibold">
                  <button
                    class="px-5 py-2.5 flex gap-3 rounded-xl shadow-md bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
                    :disabled="loading == row?.id"
                    @click="updateTimeCard(row)"
                  >
                    <div v-if="loading==row?.id" class="animate-spin">
                      <i class="ri-loader-4-line"></i>
                    </div>
                    Approve
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Pagination -->
          <div class="flex flex-col sm:flex-row justify-between items-center px-6 py-4 bg-gray-50/80 border-t border-gray-100">
            <div class="text-sm text-gray-600 mb-3 sm:mb-0">
              Showing {{ meta?.from }} to {{ meta?.to }} of {{ meta?.total }} records
            </div>
            <div class="flex space-x-1">
              <button
                v-for="page in meta?.links"
                :key="page.label"
                class="px-4 py-2 rounded-lg font-medium transition-all duration-200"
                :class="page.active
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'"
                @click="currentPage = parseInt(page.label) || 1, fetchTimeCards()"
                v-html="page.label"
              ></button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <div class="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/30 p-8 max-w-md mx-auto">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">No Timecards Found</h3>
            <p class="text-gray-600 text-sm">No timecard records found for the selected user and filters.</p>
          </div>
        </div>
      </div>

      <!-- Initial State - When no user selected -->
      <div v-else class="text-center py-12">
        <div class="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/30 p-8 max-w-md mx-auto">
          <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Select a Sales Person</h3>
          <p class="text-gray-600 text-sm">Choose a role and user from the dropdowns above to view their timecards.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import moment from 'moment'

// Reactive data
const loading = ref(false)
const roles = ref(["sales-manager", "sales-executive"])
const selectedRole = ref("")
const usersOfRole = ref([])
const selectedUser = ref("")
const timecards = ref([])
const meta = ref({})
const statusFilter = ref("0")
const currentPage = ref(1)
const itemsPerPage = ref(20)
const startDate = ref(moment().format('YYYY-MM-DD'))

// Format decimal hours to "Xh Ym" format
const formatHoursToHhMm = (hours) => {
  if (!hours || hours === '0') return '0h 0m'

  const totalHours = parseFloat(hours)
  const hoursPart = Math.floor(totalHours)
  const minutesPart = Math.round((totalHours - hoursPart) * 60)

  // Handle cases where minutes might be 60 due to rounding
  if (minutesPart === 60) {
    return `${hoursPart + 1}h 0m`
  }

  return `${hoursPart}h ${minutesPart}m`
}

// Load users by role
const loadUsersByRole = async () => {
  if (!selectedRole.value) {
    usersOfRole.value = []
    return
  }
  try {
    const { data } = await api().get(`/users/role-get?role=${selectedRole.value}`)
    usersOfRole.value = data?.data || []
  } catch (err) {
    console.error("Failed to load users:", err)
  }
}

// Fetch timecards for selected user
const fetchTimeCards = async () => {
  if (!selectedUser.value) return

  loading.value = true
  try {
    const params = {
      status: statusFilter.value,
      per_page: itemsPerPage.value,
      date: startDate.value,
      page: currentPage.value,
      user_id: selectedUser.value // Add user filter
    }

    const { data } = await api().get('attendance', { params })
    timecards.value = data.data
    meta.value = data.meta
  } catch (error) {
    console.error("Failed to fetch timecards:", error)
  } finally {
    loading.value = false
  }
}

const updateTimeCard = async (time) => {
  loading.value = time.id
  try {
    const { data } = await api().post('attendance/' + time.id, {
      _method: 'PUT',
      status: 1,
      date: time.date,
      user_id: time.user_id
    })

    if (data.status) {
      fetchTimeCards()
    }
  } catch (error) {
    console.error("Failed to update timecard:", error)
  } finally {
    loading.value = ''
  }
}

// Watchers
watch(selectedRole, () => {
  selectedUser.value = ""
  usersOfRole.value = []
  timecards.value = []
  loadUsersByRole()
})

watch(selectedUser, (newVal) => {
  if (newVal) {
    timecards.value = []
    currentPage.value = 1
    fetchTimeCards()
  }
})

watch([startDate, statusFilter], () => {
  if (selectedUser.value) {
    currentPage.value = 1
    fetchTimeCards()
  }
})

onMounted(() => {
  // You can add any initial loading logic here if needed
})
</script>

<style scoped>
@keyframes blob {
  0%, 100% { transform: translate(0px, 0px) scale(1); }
  50% { transform: translate(30px, -30px) scale(1.1); }
}
.animate-blob { animation: blob 20s infinite; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }

.overflow-x-auto::-webkit-scrollbar { height: 8px; }
.overflow-x-auto::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
.overflow-x-auto::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 4px; }
.overflow-x-auto::-webkit-scrollbar-thumb:hover { background: #a8a8a8; }
</style>
