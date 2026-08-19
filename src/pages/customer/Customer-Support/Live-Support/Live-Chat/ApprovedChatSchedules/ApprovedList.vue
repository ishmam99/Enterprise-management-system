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
              Approved Chat Sessions
            </h1>
          </div>
          <p class="text-gray-600 ml-13">Manage and view all approved live chat sessions</p>
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
                  chat.status === 'active'
                    ? 'bg-green-100 text-green-700 border border-green-200 animate-pulse'
                    : chat.status === 'upcoming'
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-700 border border-gray-200'
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
                {{ chat.status === 'active' ? 'Join Chat' : chat.status === 'upcoming' ? 'Start Chat' : 'Completed' }}
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

const router = useRouter()
const isLoading = ref(false)
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

const chats = ref([
  {
    id: 'CHAT-001',
    title: 'Customer Support - Product Issues',
    description: 'Live support session for customers experiencing technical issues with our latest product release.',
    date: '2024-01-15',
    startTime: '14:00',
    type: 'customer-support',
    status: 'active',
    participantsCount: 8,
    messageCount: 45,
    features: ['file-sharing', 'transcript', 'moderated']
  },
  {
    id: 'CHAT-002',
    title: 'Team Collaboration - Project Alpha',
    description: 'Weekly team sync to discuss project progress, blockers, and next steps for Project Alpha.',
    date: '2024-01-15',
    startTime: '11:00',
    type: 'team-collaboration',
    status: 'upcoming',
    participantsCount: 12,
    messageCount: 0,
    features: ['file-sharing', 'transcript']
  },
  {
    id: 'CHAT-003',
    title: 'Q&A Session - New Features',
    description: 'Community Q&A about our recently launched features and upcoming roadmap.',
    date: '2024-01-16',
    startTime: '16:00',
    type: 'qna-session',
    status: 'upcoming',
    participantsCount: 25,
    messageCount: 0,
    features: ['transcript', 'moderated']
  },
  {
    id: 'CHAT-004',
    title: 'Focus Group - User Experience',
    description: 'Discussion with selected users about their experience with our platform and suggested improvements.',
    date: '2024-01-14',
    startTime: '13:00',
    type: 'focus-group',
    status: 'completed',
    participantsCount: 15,
    messageCount: 189,
    features: ['transcript']
  },
  {
    id: 'CHAT-005',
    title: 'Community Chat - General Discussion',
    description: 'Open community chat for general discussions, feedback, and community building.',
    date: '2024-01-17',
    startTime: '18:00',
    type: 'community-chat',
    status: 'upcoming',
    participantsCount: 50,
    messageCount: 0,
    features: ['moderated']
  },
  {
    id: 'CHAT-006',
    title: 'Client Onboarding - TechCorp',
    description: 'Onboarding session for new enterprise client TechCorp to discuss setup and training.',
    date: '2024-01-13',
    startTime: '10:00',
    type: 'customer-support',
    status: 'completed',
    participantsCount: 6,
    messageCount: 78,
    features: ['file-sharing', 'transcript']
  }
])

const filteredChats = computed(() => {
  let filtered = chats.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(chat =>
      chat.title.toLowerCase().includes(query) ||
      chat.description.toLowerCase().includes(query) ||
      chat.id.toLowerCase().includes(query)
    )
  }

  // Status filter
  if (filters.value.status !== 'all') {
    filtered = filtered.filter(chat => chat.status === filters.value.status)
  }

  // Type filter
  if (filters.value.type !== 'all') {
    filtered = filtered.filter(chat => chat.type === filters.value.type)
  }

  return filtered
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const formatChatType = (type) => {
  return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

const joinChat = (chat) => {
  if (chat.status === 'completed') return

  console.log('Joining chat:', chat.id)
  // In real app, this would navigate to the chat room
  alert(`Joining chat: ${chat.title}`)
}

const viewDetails = (chat) => {
  console.log('Viewing details:', chat.id)
  // In real app, this would navigate to chat details page
  router.push(`/chat-details/${chat.id}`)
}

const updateStats = () => {
  stats.value.totalChats = chats.value.length
  stats.value.upcomingChats = chats.value.filter(chat => chat.status === 'upcoming').length
  stats.value.activeNow = chats.value.filter(chat => chat.status === 'active').length
  stats.value.completed = chats.value.filter(chat => chat.status === 'completed').length
}

onMounted(() => {
  isLoading.value = true
  // Simulate API call
  setTimeout(() => {
    updateStats()
    isLoading.value = false
  }, 1000)
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
