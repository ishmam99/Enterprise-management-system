<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <div class="flex items-center mb-2">
            <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-3">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h1 class="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Completed Call List
            </h1>
          </div>
          <p class="text-gray-600 ml-13">Manage and view all approved live call sessions</p>
        </div>
        <div class="flex items-center space-x-4">
          <button
            @click="$router.push('/schedule-call')"
            class="flex items-center px-5 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl hover:from-green-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            New Call
          </button>
          <button
            @click="$router.back()"
            class="flex items-center px-4 py-2 text-gray-600 hover:text-green-700 transition-colors border border-gray-300 hover:border-green-400 rounded-lg"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Back
          </button>
        </div>
      </div>



      <!-- Filters -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-green-100">
        <div class="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div class="flex-1">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search calls..."
                class="block w-full pl-10 pr-3 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-green-50"
              >
            </div>
          </div>

          <div class="flex flex-wrap gap-4">
            <div class="relative">
              <select
                v-model="filters.status"
                class="px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-blue-50 appearance-none pr-10"
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="live">Live Now</option>
                <option value="completed">Completed</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>

            <div class="relative">
              <select
                v-model="filters.type"
                class="px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-purple-50 appearance-none pr-10"
              >
                <option value="all">All Types</option>
                <option value="team-meeting">Team Meeting</option>
                <option value="client-call">Client Call</option>
                <option value="one-on-one">One-on-One</option>
                <option value="training">Training</option>
                <option value="webinar">Webinar</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>

            <div class="relative">
              <select
                v-model="filters.priority"
                class="px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-orange-50 appearance-none pr-10"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-20">
        <div class="inline-flex flex-col items-center">
          <div class="relative">
            <svg class="animate-spin h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
          </div>
          <p class="text-gray-600 mt-4 font-medium">Loading approved calls...</p>
        </div>
      </div>

      <!-- Calls Table -->
      <div v-else-if="filteredCalls.length > 0" class="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider rounded-tl-2xl">
                  Call Details
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">
                  Schedule
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">
                  Type & Priority
                </th>

                <th class="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">
                  Status
                </th>
                <th class="px-6 py-4 text-center text-sm font-semibold text-white tracking-wider rounded-tr-2xl">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 bg-white">
              <tr
                v-for="call in filteredCalls"
                :key="call.id"
                class="hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-200 group"
              >
                <!-- Call Details -->
                <td class="px-6 py-4">
                  <div class="flex items-start space-x-3">
                    <div :class="[
                      'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                      call.type === 'team-meeting' ? 'bg-blue-100 text-blue-600' :
                      call.type === 'client-call' ? 'bg-purple-100 text-purple-600' :
                      call.type === 'one-on-one' ? 'bg-green-100 text-green-600' :
                      call.type === 'training' ? 'bg-orange-100 text-orange-600' :
                      'bg-pink-100 text-pink-600'
                    ]">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <div class="min-w-0 flex-1">
                      <div class="flex items-center space-x-2 mb-1">
                        <span class="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">{{ call.id }}</span>
                        <span :class="[
                          'px-2 py-1 rounded-full text-xs font-semibold',
                          call.priority === 'high' ? 'bg-red-100 text-red-700 border border-red-200' :
                          call.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                          'bg-green-100 text-green-700 border border-green-200'
                        ]">
                          {{ call.priority }}
                        </span>
                      </div>
                      <h4 class="text-sm font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                        {{ call.title }}
                      </h4>
                      <p class="text-xs text-gray-500 mt-1 line-clamp-2">{{ call.description }}</p>
                    </div>
                  </div>
                </td>

                <!-- Schedule -->
                <td class="px-6 py-4">
                  <div class="space-y-1">
                    <div class="flex items-center text-sm text-gray-600">
                      <svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <span>{{ formatDate(call.date) }}</span>
                    </div>
                    <div class="flex items-center text-sm text-gray-600">
                      <svg class="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span>{{ call.startTime }} - {{ call.endTime }}</span>
                    </div>
                    <div class="text-xs text-gray-400 mt-2">
                      {{ getTimeUntil(call.date, call.startTime) }}
                    </div>
                  </div>
                </td>

                <!-- Type & Priority -->
                <td class="px-6 py-4">
                  <div class="space-y-2">
                    <span :class="[
                      'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold',
                      call.type === 'team-meeting' ? 'bg-blue-100 text-blue-700' :
                      call.type === 'client-call' ? 'bg-purple-100 text-purple-700' :
                      call.type === 'one-on-one' ? 'bg-green-100 text-green-700' :
                      call.type === 'training' ? 'bg-orange-100 text-orange-700' :
                      'bg-pink-100 text-pink-700'
                    ]">
                      {{ formatCallType(call.type) }}
                    </span>
                    <div class="flex items-center text-sm text-gray-600">
                      <svg class="w-4 h-4 mr-1 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                      </svg>
                      <span class="capitalize">{{ call.priority }} Priority</span>
                    </div>
                  </div>
                </td>



                <!-- Status -->
                <td class="px-6 py-4">
                  <span
                    :class="[
                      'px-3 py-2 rounded-full text-xs font-semibold flex items-center justify-center w-24',
                      call.status === 'live'
                        ? 'bg-red-100 text-red-700 border border-red-200 animate-pulse'
                        : call.status === 'upcoming'
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'bg-green-100 text-green-700 border border-green-200'
                    ]"
                  >
                    <svg
                      v-if="call.status === 'live'"
                      class="w-3 h-3 mr-1 animate-pulse"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="5"/>
                    </svg>
                    {{ call.status === 'live' ? 'Live Now' : call.status === 'upcoming' ? 'Upcoming' : 'Completed' }}
                  </span>
                </td>

                <!-- Actions -->
                <td class="px-6 py-4">
                  <div class="flex items-center justify-center space-x-2">
                    <button
                      @click="joinCall(call)"
                      :class="[
                        'px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center',
                        call.status === 'live'
                          ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg transform hover:-translate-y-0.5'
                          : call.status === 'upcoming'
                          ? 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white shadow-lg transform hover:-translate-y-0.5'
                          : 'bg-gray-200 text-gray-600 cursor-not-allowed'
                      ]"
                      :disabled="call.status === 'completed'"
                    >
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                      </svg>
                      {{ call.status === 'live' ? 'Join' : call.status === 'upcoming' ? 'Start' : 'Completed' }}
                    </button>
                    <button
                      @click="viewDetails(call)"
                      class="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-300"
                      title="View Details"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <div class="inline-flex flex-col items-center max-w-md">
          <div class="relative mb-6">
            <div class="w-24 h-24 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center">
              <svg class="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
            </div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900">No approved calls</h3>
          <p class="mt-2 text-gray-600">There are no approved calls scheduled at the moment.</p>
          <button
            @click="$router.push('/schedule-call')"
            class="mt-6 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl hover:from-green-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Schedule New Call
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/config/api'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/stores/AuthStore'
const authStore = useAuthStore()
const router = useRouter()
const isLoading = ref(true)
const searchQuery = ref('')

// Your filters (status, type, priority)
const filters = ref({
  status: 'all',
  type: 'all',
  priority: 'all'
})

const calls = ref([])  // Filled from API

// Filtered + Searched + Priority-filtered calls
const filteredCalls = computed(() => {
  let list = calls.value

  // Search
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(c =>
      c.title?.toLowerCase().includes(q) ||
      c.description?.toLowerCase().includes(q) ||
      c.id?.toLowerCase().includes(q)
    )
  }

  // Status filter
  if (filters.value.status !== 'all') {
    list = list.filter(c => c.status === filters.value.status)
  }

  // Type filter
  if (filters.value.type !== 'all') {
    list = list.filter(c => (c.call_type || c.type) === filters.value.type)
  }

  // Priority filter
  if (filters.value.priority !== 'all') {
    list = list.filter(c => c.priority === filters.value.priority)
  }

  return list
})

// Format date (e.g. Mon, Nov 17, 2025)
const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A'
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

// Format call type for display
const formatCallType = (type) => {
  const map = {
    'team-meeting': 'Team Meeting',
    'client-call': 'Client Call',
    'one-on-one': 'One-on-One',
    'training': 'Training',
    'webinar': 'Webinar',
    'interview': 'Interview'
  }
  return map[type] || type?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
}

// Time until call starts (e.g. "In 2 hours", "Live now", "2 hours ago")
const getTimeUntil = (date, startTime) => {
  const callDateTime = new Date(`${date}T${startTime}:00`)
  const now = new Date()
  const diffMs = callDateTime - now
  const diffMins = Math.round(diffMs / 60000)

  if (diffMins < -120) return 'Ended'
  if (diffMins < 0) return 'Live now'
  if (diffMins === 0) return 'Starting now'
  if (diffMins < 60) return `In ${diffMins} min`
  if (diffMins < 1440) return `In ${Math.floor(diffMins / 60)}h ${diffMins % 60}m`

  return formatDate(date)
}

// Join / Start Call
const joinCall = (call) => {
  if (call.status === 'completed') {
    Swal.fire('Completed', 'This call has already ended.', 'info')
    return
  }

  if (call.status !== 'live') {
    Swal.fire({
      icon: 'info',
      title: 'Not started yet',
      text: 'This call will start soon. You can join when it goes live.',
      timer: 3000,
      showConfirmButton: false
    })
    return
  }

  // Replace with your actual meeting room URL
  const meetingUrl = `${window.location.origin}/meeting-room/${call.id}`
  window.open(meetingUrl, '_blank')
}

// View Details
const viewDetails = (call) => {
  router.push(`/live-calls/${call.id}`)
}

// Fetch today’s approved calls
const fetchTodayCalls = async () => {
  isLoading.value = true

  try {
    // const response = await api().get('/customer-support?type=liveCall')
    const {response} = authStore.role !== 'customer-manager' ? await api().get('/customer-support?type=liveCall') : await api().get(`/customer-support?type=liveCall&customer_id=${authStore.companyId}`)

    // Adjust according to your actual API response
    const rawData = response.data?.data || response.data?.calls || response.data || []

    calls.value = rawData.map(item => ({
      id: item.id || item.call_id,
      title: item.title || 'Untitled Call',
      description: item.description || 'No description provided',
      date: item.date,
      startTime: item.start_time || item.startTime,
      endTime: item.end_time || item.endTime,
      type: item.call_type || item.type || 'team-meeting',
      status: item.status || 'upcoming',           // upcoming | live | completed
      priority: item.priority || 'medium',         // high | medium | low
      participantsCount: item.participants?.length || 0
    }))

  } catch (err) {
    console.error('Failed to load calls:', err)
    Swal.fire({
      icon: 'error',
      title: 'Failed to load',
      text: err.response?.data?.message || 'Could not fetch today\'s calls. Please try again.'
    })
    calls.value = []
  } finally {
    isLoading.value = false
  }
}

// Load on mount
onMounted(() => {
  fetchTodayCalls()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom scrollbar styling */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(to right, #10b981, #3b82f6);
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to right, #059669, #2563eb);
}
</style>
