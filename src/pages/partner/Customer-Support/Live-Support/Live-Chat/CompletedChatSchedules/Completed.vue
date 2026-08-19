<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <div class="flex items-center mb-2">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
            </div>
            <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Completed Chat Sessions
            </h1>
          </div>
          <p class="text-gray-600 ml-13">Manage and view all completed live chat sessions</p>
        </div>
        <div class="flex items-center space-x-4">
          <button
            @click="$router.push('/schedule-chat')"
            class="flex items-center px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            New Chat
          </button>
          <button
            @click="$router.back()"
            class="flex items-center px-4 py-2 text-gray-600 hover:text-blue-700 transition-colors border border-gray-300 hover:border-blue-400 rounded-lg"
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
        <div class="bg-white rounded-2xl p-6 shadow-lg border border-blue-200">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ stats.totalChats }}</p>
              <p class="text-sm text-gray-600">Total Chats</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-lg border border-green-200">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ stats.upcomingChats }}</p>
              <p class="text-sm text-gray-600">Upcoming</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-lg border border-purple-200">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ stats.activeNow }}</p>
              <p class="text-sm text-gray-600">Active Now</p>
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
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-blue-100">
        <div class="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div class="flex-1">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search chat sessions..."
                class="block w-full pl-10 pr-3 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-blue-50"
              >
            </div>
          </div>

          <div class="flex flex-wrap gap-4">
            <div class="relative">
              <select
                v-model="filters.status"
                class="px-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-green-50 appearance-none pr-10"
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="active">Active Now</option>
                <option value="completed">Completed</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <option value="customer-support">Customer Support</option>
                <option value="team-collaboration">Team Collaboration</option>
                <option value="qna-session">Q&A Session</option>
                <option value="focus-group">Focus Group</option>
                <option value="community-chat">Community Chat</option>
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
            <svg class="animate-spin h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
          <p class="text-gray-600 mt-4 font-medium">Loading chat sessions...</p>
        </div>
      </div>

      <!-- Chats Grid -->
      <div v-else-if="filteredChats.length > 0" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div
          v-for="chat in filteredChats"
          :key="chat.id"
          class="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <!-- Chat Header -->
          <div class="p-6 border-b border-gray-100">
            <div class="flex justify-between items-start mb-3">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 line-clamp-1">{{ chat.title }}</h3>
                <p class="text-sm text-gray-500 mt-1">{{ chat.id }}</p>
              </div>
              <span
                :class="[
                  'px-3 py-1 rounded-full text-xs font-semibold',
                  chat.status === 'live'
                    ? 'bg-red-100 text-red-700 border border-red-200'
                    : chat.status === 'upcoming'
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-green-100 text-green-700 border border-green-200'
                ]"
              >
                {{ chat.status === 'active' ? 'Active Now' : chat.status === 'upcoming' ? 'Upcoming' : 'Completed' }}
              </span>
            </div>
            <p class="text-gray-600 text-sm line-clamp-2">{{ chat.description }}</p>
          </div>

          <!-- Chat Details -->
          <div class="p-6 space-y-4">
            <!-- Date & Time -->
            <div class="flex items-center text-sm text-gray-600">
              <svg class="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <span>{{ formatDate(chat.date) }}</span>
              <span class="mx-2">•</span>
              <svg class="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>{{ chat.startTime }}</span>
            </div>

            <!-- Chat Type -->
            <div class="flex items-center text-sm text-gray-600">
              <svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <span class="capitalize">{{ formatChatType(chat.type) }}</span>
            </div>



            <!-- Features -->
            <div class="flex flex-wrap gap-2">
              <span
                v-if="chat.features.includes('file-sharing')"
                class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700"
              >
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                Files
              </span>
              <span
                v-if="chat.features.includes('transcript')"
                class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-700"
              >
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                Transcript
              </span>
              <span
                v-if="chat.features.includes('moderated')"
                class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-700"
              >
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                Moderated
              </span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
            <div class="flex space-x-3">
              <button
                @click="joinChat(chat)"
                :class="[
                  'flex-1 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center',
                  chat.status === 'active'
                    ? 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white shadow-lg'
                    : chat.status === 'upcoming'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-600 cursor-not-allowed'
                ]"
                :disabled="chat.status === 'completed'"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                {{ chat.status === 'live' ? 'Join Live' : chat.status === 'upcoming' ? 'Start Chat' : 'Completed' }}
              </button>
              <button
                @click="viewDetails(chat)"
                class="px-4 py-2 border border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-700 rounded-xl font-semibold text-sm transition-all duration-300"
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
            <div class="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <svg class="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
            </div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900">No approved chat sessions</h3>
          <p class="mt-2 text-gray-600">There are no approved chat sessions scheduled at the moment.</p>
          <button
            @click="$router.push('/schedule-chat')"
            class="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Schedule New Chat
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

const filters = ref({
  status: 'all',
  type: 'all'
})

const stats = ref({
  totalChats: 0,
  upcomingChats: 0,
  activeNow: 0,
  completed: 0
})

const chats = ref([]) // Filled from real API

// Filtered + Searched chats
const filteredChats = computed(() => {
  let list = chats.value

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(c =>
      c.title?.toLowerCase().includes(q) ||
      c.description?.toLowerCase().includes(q) ||
      c.id?.toLowerCase().includes(q)
    )
  }

  if (filters.value.status !== 'all') {
    list = list.filter(c => c.status === filters.value.status)
  }

  if (filters.value.type !== 'all') {
    list = list.filter(c => c.chat_type === filters.value.type || c.type === filters.value.type)
  }

  return list
})

// Format date for BD users (e.g. Sun, Nov 17, 2025)
const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A'
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

// Format time (24h → 12h with AM/PM)
const formatTime = (time24) => {
  if (!time24) return ''
  const [h, m] = time24.split(':')
  const hour = parseInt(h)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${m} ${ampm}`
}

// Human-readable chat type
const formatChatType = (type) => {
  const map = {
    'customer-support': 'Customer Support',
    'team-collaboration': 'Team Collaboration',
    'qna-session': 'Q&A Session',
    'focus-group': 'Focus Group',
    'community-chat': 'Community Chat',
    'onboarding': 'Client Onboarding'
  }
  return map[type] || type.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

// Join active chat
const joinChat = (chat) => {
  if (chat.status === 'completed') {
    Swal.fire('Ended', 'This chat session has ended.', 'info')
    return
  }
  if (chat.status !== 'active') {
    Swal.fire('Not Active', 'This chat is not live yet.', 'info')
    return
  }

  // Replace with your real chat room URL
  const chatUrl = `${window.location.origin}/live-chat/${chat.id}`
  window.open(chatUrl, '_blank')
}

// View details
const viewDetails = (chat) => {
  router.push(`/live-chat/${chat.id}`)
}

// Update dashboard stats
const updateStats = () => {
  stats.value.totalChats = chats.value.length
  stats.value.upcomingChats = chats.value.filter(c => c.status === 'upcoming').length
  stats.value.activeNow = chats.value.filter(c => c.status === 'active').length
  stats.value.completed = chats.value.filter(c => c.status === 'completed').length
}

// Fetch real live chats from your API
const fetchLiveChats = async () => {
  isLoading.value = true

  try {
    const response = await api().get('/customer-support?type=liveChat')

    const raw = response.data?.data || response.data || []

    chats.value = raw.map(item => ({
      id: item.id || item.chat_id || 'N/A',
      title: item.title || 'Untitled Chat',
      description: item.description || 'No description',
      date: item.start_datetime?.split(' ')[0] || item.date,
      startTime: item.start_datetime?.split(' ')[1]?.slice(0, 5) || '00:00',
      type: item.chat_type || item.type || 'customer-support',
      status: item.status || 'upcoming', // upcoming | active | completed
      participantsCount: item.participants_count || 0,
      messageCount: item.message_count || 0,
      features: [
        item.allow_file_sharing ? 'file-sharing' : null,
        item.send_reminders ? 'transcript' : null,
        item.allow_anonymous ? 'anonymous' : null
      ].filter(Boolean)
    }))

    updateStats()
  } catch (err) {
    console.error('Failed to load chats:', err)
    Swal.fire({
      icon: 'error',
      title: 'Failed to Load',
      text: err.response?.data?.message || 'Could not fetch live chats.'
    })
    chats.value = []
    updateStats()
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchLiveChats()
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
  background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2563eb, #7c3aed);
}
</style>
