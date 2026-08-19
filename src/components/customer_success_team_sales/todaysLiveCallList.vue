<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-2">
    <div class="max-w-7xl mx-auto">
      <!-- Header with Search/Filters in same row -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <!-- Left: Title and Description -->
        <div class="lg:flex-1">
          <div class="flex items-center mb-2">
            <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-3">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h1 class="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Todays Call List
            </h1>
          </div>
          <p class="text-gray-600 ml-13 text-sm">Manage and view all approved live call sessions</p>
        </div>

        <!-- Right: Search and Filters -->
        <div class="flex-1 lg:flex lg:items-center lg:justify-end space-x-3">
          <!-- Search -->
          <div class="relative flex-1 lg:max-w-xs">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search calls..."
              class="block w-full pl-10 pr-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm bg-white shadow-sm"
            >
          </div>

          <!-- Filters -->
          <div class="flex space-x-2">
            <div class="relative">
              <select
                v-model="filters.status"
                class="px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white shadow-sm appearance-none pr-8"
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="live">Live Now</option>
                <option value="completed">Completed</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>

            <div class="relative">
              <select
                v-model="filters.type"
                class="px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm bg-white shadow-sm appearance-none pr-8"
              >
                <option value="all">All Types</option>
                <option value="team-meeting">Team Meeting</option>
                <option value="client-call">Client Call</option>
                <option value="one-on-one">One-on-One</option>
                <option value="training">Training</option>
                <option value="webinar">Webinar</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>

            <div class="relative">
              <select
                v-model="filters.priority"
                class="px-3 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm bg-white shadow-sm appearance-none pr-8"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Cards (Removed to match the unresolved tickets design) -->

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="inline-flex flex-col items-center">
          <div class="relative">
            <svg class="animate-spin h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
          </div>
          <p class="text-gray-600 mt-3 text-sm font-medium">Loading approved calls...</p>
        </div>
      </div>

      <!-- Calls Table -->
      <div v-else-if="filteredCalls.length > 0" class="bg-white rounded-xl shadow-lg border border-green-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 table-zebra">
            <thead class="bg-gradient-to-r from-green-600 to-blue-600">
              <tr>
                <th class="px-4 border-e py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Call Details
                </th>
                <th class="px-4 border-e py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Schedule
                </th>
                <th class="px-4 border-e py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Type & Priority
                </th>
                <th class="px-4 border-e py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Status
                </th>
                <th class="px-4 border-e py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 bg-white">
              <tr
                v-for="call in filteredCalls"
                :key="call.id"
                class="hover:bg-green-50 transition-colors group"
              >
                <!-- Call Details -->
                <td class="px-4 border-e py-3">
                  <div class="flex items-start space-x-3">
                    <div :class="[
                      'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
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
                          'px-2 py-1 rounded text-xs font-medium',
                          call.priority === 'high' ? 'bg-red-100 text-red-700' :
                          call.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
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
                <td class="px-4 border-e py-3">
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
                <td class="px-4 border-e py-3">
                  <div class="space-y-2">
                    <span :class="[
                      'inline-flex items-center px-2.5 py-1 rounded text-xs font-medium',
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
                      <span class="capitalize text-xs">{{ call.priority }} Priority</span>
                    </div>
                  </div>
                </td>

                <!-- Status -->
                <td class="px-4 border-e py-3">
                  <span
                    :class="[
                      'px-2.5 py-1.5 rounded text-xs font-medium flex items-center w-20',
                      call.status === 'live'
                        ? 'bg-red-100 text-red-700'
                        : call.status === 'upcoming'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-green-100 text-green-700'
                    ]"
                  >
                    <svg
                      v-if="call.status === 'live'"
                      class="w-2.5 h-2.5 mr-1 animate-pulse"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="5"/>
                    </svg>
                    {{ call.status === 'live' ? 'Live Now' : call.status === 'upcoming' ? 'Upcoming' : 'Completed' }}
                  </span>
                </td>

                <!-- Actions -->
                <td class="px-4 border-e py-3">
                  <div class="flex items-center space-x-2">
                    <button
                      @click="joinCall(call)"
                      :class="[
                        'px-3 py-1.5 rounded-lg font-medium text-xs transition-colors flex items-center',
                        call.status === 'live'
                          ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-sm'
                          : call.status === 'upcoming'
                          ? 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white shadow-sm'
                          : 'bg-gray-200 text-gray-600 cursor-not-allowed'
                      ]"
                      :disabled="call.status === 'completed'"
                    >
                      <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                      </svg>
                      {{ call.status === 'live' ? 'Join' : call.status === 'upcoming' ? 'Start' : 'Completed' }}
                    </button>
                    <button
                      @click="viewDetails(call)"
                      class="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                      title="View Details"
                    >
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <div v-else class="text-center py-12">
        <div class="inline-flex flex-col items-center">
          <div class="relative mb-4">
            <div class="w-16 h-16 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
            </div>
          </div>
          <h3 class="text-xl font-bold text-gray-900">No approved calls</h3>
          <p class="mt-1 text-sm text-gray-600">There are no approved calls scheduled at the moment.</p>
          <button
            @click="$router.push('/schedule-call')"
            class="mt-4 px-5 py-2.5 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-colors shadow-sm hover:shadow"
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

const router = useRouter()
const isLoading = ref(false)
const searchQuery = ref('')

const filters = ref({
  status: 'all',
  type: 'all',
  priority: 'all'
})

const calls = ref([
  {
    id: 'CAL-001',
    title: 'Quarterly Team Planning Session',
    description: 'Discussion about Q3 goals, objectives, and team alignment for upcoming projects and initiatives.',
    date: '2024-01-15',
    startTime: '14:00',
    endTime: '15:30',
    type: 'team-meeting',
    status: 'upcoming',
    participantsCount: 12,
    priority: 'high'
  },
  {
    id: 'CAL-002',
    title: 'Client Onboarding Call - TechCorp',
    description: 'Initial onboarding session with new enterprise client TechCorp to discuss implementation timeline.',
    date: '2024-01-15',
    startTime: '11:00',
    endTime: '12:00',
    type: 'client-call',
    status: 'live',
    participantsCount: 5,
    priority: 'high'
  },
  {
    id: 'CAL-003',
    title: 'Weekly One-on-One: Sarah Johnson',
    description: 'Regular weekly check-in to discuss progress, challenges, and career development goals.',
    date: '2024-01-16',
    startTime: '09:30',
    endTime: '10:00',
    type: 'one-on-one',
    status: 'upcoming',
    participantsCount: 2,
    priority: 'medium'
  },
  {
    id: 'CAL-004',
    title: 'Product Training Webinar',
    description: 'Training session for new product features and updates for all customer success team members.',
    date: '2024-01-14',
    startTime: '13:00',
    endTime: '14:30',
    type: 'training',
    status: 'completed',
    participantsCount: 25,
    priority: 'medium'
  },
  {
    id: 'CAL-005',
    title: 'Marketing Strategy Review',
    description: 'Review of Q1 marketing campaigns and planning for upcoming product launch activities.',
    date: '2024-01-17',
    startTime: '15:00',
    endTime: '16:00',
    type: 'team-meeting',
    status: 'upcoming',
    participantsCount: 8,
    priority: 'medium'
  },
  {
    id: 'CAL-006',
    title: 'Technical Architecture Discussion',
    description: 'Deep dive into system architecture with engineering leads and principal architects.',
    date: '2024-01-13',
    startTime: '10:00',
    endTime: '12:00',
    type: 'team-meeting',
    status: 'completed',
    participantsCount: 6,
    priority: 'high'
  }
])

const filteredCalls = computed(() => {
  let filtered = calls.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(call =>
      call.title.toLowerCase().includes(query) ||
      call.description.toLowerCase().includes(query) ||
      call.id.toLowerCase().includes(query)
    )
  }

  // Status filter
  if (filters.value.status !== 'all') {
    filtered = filtered.filter(call => call.status === filters.value.status)
  }

  // Type filter
  if (filters.value.type !== 'all') {
    filtered = filtered.filter(call => call.type === filters.value.type)
  }

  // Priority filter
  if (filters.value.priority !== 'all') {
    filtered = filtered.filter(call => call.priority === filters.value.priority)
  }

  return filtered
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })
}

const formatCallType = (type) => {
  return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

const getTimeUntil = (dateString, timeString) => {
  const now = new Date()
  const callDate = new Date(`${dateString}T${timeString}`)
  const diff = callDate - now

  if (diff < 0) return 'Past'

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (hours > 0) {
    return `in ${hours}h ${minutes}m`
  } else {
    return `in ${minutes}m`
  }
}

const joinCall = (call) => {
  if (call.status === 'completed') return
  console.log('Joining call:', call.id)
  alert(`Joining call: ${call.title}`)
}

const viewDetails = (call) => {
  console.log('Viewing details:', call.id)
  router.push(`/call-details/${call.id}`)
}

onMounted(() => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
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
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 6px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(to right, #10b981, #3b82f6);
  border-radius: 6px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to right, #059669, #2563eb);
}
</style>