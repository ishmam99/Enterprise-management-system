<template>
  <div class="px-10 bg-white py-5 w-11/12 mx-auto">
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
              Completed Call Schedule List
            </h1>
          </div>
          <p class="text-gray-600 ml-13">Manage and view all completed live call sessions</p>
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

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-2xl p-6 shadow-lg border border-green-200">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ stats.totalCalls }}</p>
              <p class="text-sm text-gray-600">Total Calls</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-lg border border-blue-200">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ stats.upcomingCalls }}</p>
              <p class="text-sm text-gray-600">Upcoming</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-lg border border-purple-200">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ stats.liveNow }}</p>
              <p class="text-sm text-gray-600">Live Now</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-lg border border-orange-200">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ stats.completed }}</p>
              <p class="text-sm text-gray-600">Completed</p>
            </div>
          </div>
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

      <!-- Calls Grid -->
      <div v-else-if="filteredCalls.length > 0" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div
          v-for="call in filteredCalls"
          :key="call.id"
          class="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <!-- Call Header -->
          <div class="p-6 border-b border-gray-100">
            <div class="flex justify-between items-start mb-3">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 line-clamp-1">{{ call.title }}</h3>
                <p class="text-sm text-gray-500 mt-1">{{ call.id }}</p>
              </div>
              <span
                :class="[
                  'px-3 py-1 rounded-full text-xs font-semibold',
                  call.status === 'live'
                    ? 'bg-red-100 text-red-700 border border-red-200'
                    : call.status === 'upcoming'
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-green-100 text-green-700 border border-green-200'
                ]"
              >
                {{ call.status === 'live' ? 'Live Now' : call.status === 'upcoming' ? 'Upcoming' : 'Completed' }}
              </span>
            </div>
            <p class="text-gray-600 text-sm line-clamp-2">{{ call.description }}</p>
          </div>

          <!-- Call Details -->
          <div class="p-6 space-y-4">
            <!-- Date & Time -->
            <div class="flex items-center text-sm text-gray-600">
              <svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <span>{{ formatDate(call.date) }}</span>
              <span class="mx-2">•</span>
              <svg class="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>{{ call.startTime }} - {{ call.endTime }}</span>
            </div>

            <!-- Call Type -->
            <div class="flex items-center text-sm text-gray-600">
              <svg class="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
              <span class="capitalize">{{ call.type.replace('-', ' ') }}</span>
            </div>



            <!-- Priority -->
            <div class="flex items-center text-sm">
              <svg class="w-4 h-4 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
              </svg>
              <span
                :class="[
                  'capitalize font-medium',
                  call.priority === 'high' ? 'text-red-600' :
                  call.priority === 'medium' ? 'text-yellow-600' :
                  'text-green-600'
                ]"
              >
                {{ call.priority }} priority
              </span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
            <div class="flex space-x-3">
              <button
                @click="joinCall(call)"
                :class="[
                  'flex-1 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300',
                  call.status === 'live'
                    ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg'
                    : call.status === 'upcoming'
                    ? 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-600 cursor-not-allowed'
                ]"
                :disabled="call.status === 'completed'"
              >
                {{ call.status === 'live' ? 'Join Live' : call.status === 'upcoming' ? 'Start Call' : 'Completed' }}
              </button>
              <button
                @click="viewDetails(call)"
                class="px-4 py-2 border border-gray-300 text-gray-700 hover:border-green-400 hover:text-green-700 rounded-xl font-semibold text-sm transition-all duration-300"
              >
                Details
              </button>
            </div>
          </div>
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

const router = useRouter()
const isLoading = ref(true)
const searchQuery = ref('')
const calls = ref([])
const error = ref('')

const filters = ref({
  status: 'all',
  type: 'all'
})

const stats = ref({
  totalCalls: 0,
  upcomingCalls: 0,
  liveNow: 0,
  completed: 0
})

// Computed: Filtered & Searched Calls
const filteredCalls = computed(() => {
  let filtered = calls.value

  // Search
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(call =>
      (call.title?.toLowerCase().includes(query) ?? false) ||
      (call.description?.toLowerCase().includes(query) ?? false) ||
      (call.id?.toLowerCase().includes(query) ?? false)
    )
  }

  // Status filter
  if (filters.value.status !== 'all') {
    filtered = filtered.filter(call => call.status === filters.value.status)
  }

  // Type filter
  if (filters.value.type !== 'all') {
    filtered = filtered.filter(call => call.call_type === filters.value.type || call.type === filters.value.type)
  }

  return filtered
})

// Format date nicely
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const formatTime = (time24) => {
  if (!time24) return ''
  const [h, m] = time24.split(':')
  const hour = parseInt(h)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${m} ${ampm}`
}

// Update stats based on current calls
const updateStats = () => {
  stats.value.totalCalls = calls.value.length
  stats.value.upcomingCalls = calls.value.filter(c => c.status === 'upcoming').length
  stats.value.liveNow = calls.value.filter(c => c.status === 'live').length
  stats.value.completed = calls.value.filter(c => c.status === 'completed').length
}

// Join Call Button
const joinCall = (call) => {
  if (call.status === 'completed') {
    Swal.fire('Ended', 'This call has already ended.', 'info')
    return
  }
  if (call.status !== 'live') {
    Swal.fire('Not Started', 'This call has not started yet.', 'info')
    return
  }

  // Replace with your actual meeting room URL
  const roomUrl = `https://yourdomain.com/meeting/${call.id}`
  window.open(roomUrl, '_blank')
  // Or navigate internally: router.push(`/live-call/${call.id}`)
}

// View Details
const viewDetails = (call) => {
  router.push(`/live-calls/${call.id}`)
}

// Fetch Live Calls from API
const fetchLiveCalls = async () => {
  isLoading.value = true
  error.value = ''

  try {
    const response = await api().get('/customer-support?type=liveCall')

    // Adjust based on your actual API response structure
    // Common patterns:
    const data = response.data?.data || response.data?.calls || response.data

    if (Array.isArray(data)) {
      calls.value = data.map(call => ({
        id: call.id || call.call_id,
        title: call.title,
        description: call.description || 'No description',
        date: call.date,
        startTime: call.start_time || call.startTime,
        endTime: call.end_time || call.endTime,
        type: call.call_type || call.type,
        status: call.status || 'upcoming', // fallback
        participantsCount: call.participants?.length || call.participants_count || 0,
        priority: call.priority || 'medium'
      }))
    } else {
      console.warn('Unexpected API response format:', response.data)
      calls.value = []
    }

    updateStats()
  } catch (err) {
    console.error('Failed to fetch live calls:', err)
    error.value = err.response?.data?.message || 'Failed to load calls. Please try again.'

    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.value
    })

    // Optional: fallback to empty state
    calls.value = []
    updateStats()
  } finally {
    isLoading.value = false
  }
}

// Load data on mount
onMounted(() => {
  fetchLiveCalls()
})
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #10b981, #3b82f6);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #059669, #2563eb);
}
</style>
