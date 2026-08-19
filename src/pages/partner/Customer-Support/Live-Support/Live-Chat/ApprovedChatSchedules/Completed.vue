<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <div class="flex items-center mb-2">
            <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
              <i class="ri-chat-history-line text-white text-lg"></i>
            </div>
            <h1 class="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Previous Chat List
            </h1>
          </div>
          <p class="text-gray-600 ml-13">Review and manage all previous chat sessions</p>
        </div>
        <div class="flex items-center space-x-4">
          <button
            @click="$router.back()"
            class="flex items-center px-4 py-2 text-gray-600 hover:text-indigo-700 transition-colors border border-gray-300 hover:border-indigo-400 rounded-lg"
          >
            <i class="ri-arrow-left-line mr-2"></i>
            Back
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-2xl p-6 shadow-lg border border-indigo-200">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-xl flex items-center justify-center mr-4">
              <i class="ri-chat-3-line text-indigo-600 text-xl"></i>
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
              <i class="ri-time-line text-green-600 text-xl"></i>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ stats.averageDuration }}</p>
              <p class="text-sm text-gray-600">Avg Duration</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-lg border border-purple-200">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mr-4">
              <i class="ri-user-line text-purple-600 text-xl"></i>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ stats.totalParticipants }}</p>
              <p class="text-sm text-gray-600">Participants</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-lg border border-orange-200">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl flex items-center justify-center mr-4">
              <i class="ri-file-text-line text-orange-600 text-xl"></i>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ stats.withTranscripts }}</p>
              <p class="text-sm text-gray-600">With Transcripts</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-indigo-100">
        <div class="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div class="flex-1">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="ri-search-line text-indigo-500"></i>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search previous chats..."
                class="block w-full pl-10 pr-3 py-3 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-indigo-50"
              >
            </div>
          </div>

          <div class="flex flex-wrap gap-4">
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
                <i class="ri-arrow-down-s-line text-purple-500"></i>
              </div>
            </div>

            <div class="relative">
              <select
                v-model="filters.duration"
                class="px-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-green-50 appearance-none pr-10"
              >
                <option value="all">Any Duration</option>
                <option value="short">Short (&lt; 15min)</option>
                <option value="medium">Medium (15-45min)</option>
                <option value="long">Long (&gt; 45min)</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <i class="ri-arrow-down-s-line text-green-500"></i>
              </div>
            </div>

            <div class="relative">
              <select
                v-model="filters.month"
                class="px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-orange-50 appearance-none pr-10"
              >
                <option value="all">All Time</option>
                <option value="this-month">This Month</option>
                <option value="last-month">Last Month</option>
                <option value="last-3months">Last 3 Months</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <i class="ri-arrow-down-s-line text-orange-500"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-20">
        <div class="inline-flex flex-col items-center">
          <div class="relative">
            <i class="ri-loader-4-line animate-spin text-4xl text-indigo-600"></i>
          </div>
          <p class="text-gray-600 mt-4 font-medium">Loading previous chats...</p>
        </div>
      </div>

      <!-- Chats List -->
      <div v-else-if="filteredChats.length > 0" class="space-y-6">
        <div
          v-for="chat in filteredChats"
          :key="chat.id"
          class="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
        >
          <!-- Chat Header -->
          <div class="p-6 border-b border-gray-100">
            <div class="flex justify-between items-start mb-3">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="text-lg font-semibold text-gray-900 line-clamp-1">{{ chat.title || 'Untitled Chat' }}</h3>
                  <span class="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                    Completed
                  </span>
                </div>
                <p class="text-sm text-gray-500">Chat #{{ chat.id }}</p>
              </div>
            </div>
            <p class="text-gray-600 text-sm line-clamp-2">{{ chat.description || 'No description provided' }}</p>
          </div>

          <!-- Chat Details -->
          <div class="p-6 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Date & Time -->
              <div class="flex items-center text-sm text-gray-600">
                <i class="ri-calendar-line text-indigo-500 mr-2"></i>
                <div>
                  <div class="font-medium">{{ formatDate(chat.start_datetime) }}</div>
                  <div class="text-xs">{{ formatTime(chat.start_datetime) }}</div>
                </div>
              </div>

              <!-- Chat Type -->
              <div class="flex items-center text-sm text-gray-600">
                <i class="ri-group-line text-purple-500 mr-2"></i>
                <div>
                  <div class="font-medium capitalize">{{ formatChatType(chat.chat_type || chat.type) }}</div>
                  <div class="text-xs">Chat Type</div>
                </div>
              </div>

              <!-- Duration -->
              <div class="flex items-center text-sm text-gray-600">
                <i class="ri-time-line text-green-500 mr-2"></i>
                <div>
                  <div class="font-medium">{{ chat.duration_minutes || 'N/A' }} min</div>
                  <div class="text-xs">Duration</div>
                </div>
              </div>
            </div>

            <!-- Features Badges -->
            <div class="flex flex-wrap gap-2">
              <span
                v-for="feature in getChatFeatures(chat)"
                :key="feature"
                :class="featureClasses[feature]"
                class="inline-flex items-center px-2 py-1 rounded-full text-xs"
              >
                <i :class="featureIcons[feature]" class="mr-1"></i>
                {{ featureLabels[feature] }}
              </span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
            <div class="flex space-x-3">
              <button
                @click="viewTranscript(chat)"
                :class="[
                  'flex-1 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center',
                  chat.send_reminders === '1' 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-600 cursor-not-allowed'
                ]"
                :disabled="chat.send_reminders !== '1'"
              >
                <i class="ri-file-text-line mr-2"></i>
                {{ chat.send_reminders === '1' ? 'View Transcript' : 'No Transcript' }}
              </button>
              <button
                @click="toggleDetails(chat.id)"
                class="px-4 py-2 border border-gray-300 text-gray-700 hover:border-indigo-400 hover:text-indigo-700 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center"
              >
                <span>{{ expandedChat === chat.id ? 'Hide Details' : 'View Details' }}</span>
                <i 
                  class="ri-arrow-down-s-line ml-1 transition-transform duration-300" 
                  :class="{ 'rotate-180': expandedChat === chat.id }"
                ></i>
              </button>
            </div>
          </div>

          <!-- Expanded Details Section -->
          <div 
            v-if="expandedChat === chat.id"
            class="border-t border-gray-200 bg-gray-50 p-6 animate-fade-in"
          >
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Left Column -->
              <div class="space-y-6">
                <!-- Chat Information -->
                <div>
                  <h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <i class="ri-information-line text-indigo-500 mr-2"></i>
                    Chat Information
                  </h4>
                  <div class="space-y-3">
                    <div class="flex justify-between items-center p-3 bg-white rounded-lg border">
                      <span class="text-sm text-gray-600">Chat ID</span>
                      <span class="font-medium">#{{ chat.id }}</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-white rounded-lg border">
                      <span class="text-sm text-gray-600">Type</span>
                      <span class="font-medium capitalize">{{ formatChatType(chat.chat_type || chat.type) }}</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-white rounded-lg border">
                      <span class="text-sm text-gray-600">Duration</span>
                      <span class="font-medium">{{ chat.duration_minutes || 'N/A' }} minutes</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-white rounded-lg border">
                      <span class="text-sm text-gray-600">Date</span>
                      <span class="font-medium">{{ formatDate(chat.start_datetime) }}</span>
                    </div>
                  </div>
                </div>

                <!-- Customer Information -->
                <div v-if="chat.customer">
                  <h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <i class="ri-building-line text-green-500 mr-2"></i>
                    Customer Organization
                  </h4>
                  <div class="bg-white rounded-lg p-4 border border-gray-200 space-y-2">
                    <p class="font-medium text-sm">{{ chat.customer.user?.name || 'N/A' }}</p>
                    <p class="text-xs text-gray-500">{{ chat.customer.user?.email || 'N/A' }}</p>
                    <p class="text-xs text-gray-500">{{ chat.customer.address || 'No address provided' }}</p>
                  </div>
                </div>
              </div>

              <!-- Right Column -->
              <div class="space-y-6">
                <!-- End User Information -->
                <div v-if="chat.end_user">
                  <h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <i class="ri-user-line text-purple-500 mr-2"></i>
                    Chat Participant
                  </h4>
                  <div class="bg-white rounded-lg p-4 border border-gray-200 space-y-2">
                    <p class="font-medium text-sm">{{ chat.end_user.user?.name || 'N/A' }}</p>
                    <p class="text-xs text-gray-500">{{ chat.end_user.user?.email || 'N/A' }}</p>
                    <p class="text-xs text-gray-500">Username: {{ chat.end_user.username || 'N/A' }}</p>
                    <p class="text-xs text-gray-500">Status: 
                      <span :class="chat.end_user.status === '1' ? 'text-green-600' : 'text-red-600'">
                        {{ chat.end_user.status === '1' ? 'Active' : 'Inactive' }}
                      </span>
                    </p>
                  </div>
                </div>

                <!-- Chat Settings -->
                <div>
                  <h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <i class="ri-settings-3-line text-orange-500 mr-2"></i>
                    Chat Settings
                  </h4>
                  <div class="grid grid-cols-2 gap-3">
                    <div class="bg-white rounded-lg p-3 border border-gray-200 text-center">
                      <div class="text-sm font-medium text-gray-600">File Sharing</div>
                      <div class="text-lg font-semibold" :class="chat.allow_file_sharing === '1' ? 'text-green-600' : 'text-red-600'">
                        {{ chat.allow_file_sharing === '1' ? 'Allowed' : 'Not Allowed' }}
                      </div>
                    </div>
                    <div class="bg-white rounded-lg p-3 border border-gray-200 text-center">
                      <div class="text-sm font-medium text-gray-600">Anonymous</div>
                      <div class="text-lg font-semibold" :class="chat.allow_anonymous === '1' ? 'text-green-600' : 'text-red-600'">
                        {{ chat.allow_anonymous === '1' ? 'Allowed' : 'Not Allowed' }}
                      </div>
                    </div>
                    <div class="bg-white rounded-lg p-3 border border-gray-200 text-center">
                      <div class="text-sm font-medium text-gray-600">Transcript</div>
                      <div class="text-lg font-semibold" :class="chat.send_reminders === '1' ? 'text-green-600' : 'text-red-600'">
                        {{ chat.send_reminders === '1' ? 'Available' : 'Not Available' }}
                      </div>
                    </div>
                    <div class="bg-white rounded-lg p-3 border border-gray-200 text-center">
                      <div class="text-sm font-medium text-gray-600">Guests</div>
                      <div class="text-lg font-semibold" :class="chat.allow_guests === '1' ? 'text-green-600' : 'text-red-600'">
                        {{ chat.allow_guests === '1' ? 'Allowed' : 'Not Allowed' }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Full Description -->
            <div class="mt-6 pt-6 border-t border-gray-200">
              <h4 class="text-sm font-semibold text-gray-700 mb-3">Chat Description</h4>
              <p class="text-gray-600 text-sm leading-relaxed bg-white p-4 rounded-lg border border-gray-200">
                {{ chat.description || 'No detailed description provided for this chat session.' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <div class="inline-flex flex-col items-center max-w-md">
          <div class="relative mb-6">
            <div class="w-24 h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
              <i class="ri-chat-history-line text-indigo-500 text-3xl"></i>
            </div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900">No previous chats</h3>
          <p class="mt-2 text-gray-600">There are no previous chat sessions to display.</p>
          <button
            @click="$router.push('/schedule-chat')"
            class="mt-6 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
const chats = ref([])
const expandedChat = ref(null)

const filters = ref({
  type: 'all',
  duration: 'all',
  month: 'all'
})

const stats = ref({
  totalChats: 0,
  averageDuration: '0min',
  totalParticipants: 0,
  withTranscripts: 0
})

// Feature configuration
const featureClasses = {
  'file-sharing': 'bg-blue-100 text-blue-700',
  'transcript': 'bg-green-100 text-green-700',
  'moderated': 'bg-purple-100 text-purple-700',
  'anonymous': 'bg-orange-100 text-orange-700'
}

const featureIcons = {
  'file-sharing': 'ri-file-line',
  'transcript': 'ri-file-text-line',
  'moderated': 'ri-shield-check-line',
  'anonymous': 'ri-user-unfollow-line'
}

const featureLabels = {
  'file-sharing': 'Files',
  'transcript': 'Transcript',
  'moderated': 'Moderated',
  'anonymous': 'Anonymous'
}

// Toggle details view
const toggleDetails = (chatId) => {
  expandedChat.value = expandedChat.value === chatId ? null : chatId
}

// Get enabled features for a chat
const getChatFeatures = (chat) => {
  const features = []
  if (chat.allow_file_sharing === '1') features.push('file-sharing')
  if (chat.send_reminders === '1') features.push('transcript')
  if (chat.allow_anonymous === '1') features.push('anonymous')
  // Add moderated if needed based on your business logic
  if (chat.chat_type === 'focus-group' || chat.chat_type === 'community-chat') {
    features.push('moderated')
  }
  return features
}

// View transcript
const viewTranscript = (chat) => {
  if (!chat.send_reminders || chat.send_reminders !== '1') {
    Swal.fire('No Transcript', 'Transcript is not available for this chat.', 'info')
    return
  }
  
  // Replace with your actual transcript URL logic
  const transcriptUrl = `https://yourdomain.com/transcripts/${chat.id}`
  window.open(transcriptUrl, '_blank')
}

// Filtered + Searched chats
const filteredChats = computed(() => {
  let list = chats.value

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(c =>
      (c.title?.toLowerCase().includes(q) ?? false) ||
      (c.description?.toLowerCase().includes(q) ?? false) ||
      (c.id?.toString().includes(q) ?? false) ||
      (c.customer?.user?.name?.toLowerCase().includes(q) ?? false) ||
      (c.end_user?.user?.name?.toLowerCase().includes(q) ?? false)
    )
  }

  if (filters.value.type !== 'all') {
    list = list.filter(c => 
      (c.chat_type === filters.value.type) || (c.type === filters.value.type)
    )
  }

  if (filters.value.duration !== 'all') {
    list = list.filter(c => {
      const duration = c.duration_minutes || 0
      switch (filters.value.duration) {
        case 'short': return duration < 15
        case 'medium': return duration >= 15 && duration <= 45
        case 'long': return duration > 45
        default: return true
      }
    })
  }

  // Month filtering (simplified)
  if (filters.value.month !== 'all') {
    const now = new Date()
    list = list.filter(c => {
      const chatDate = new Date(c.start_datetime)
      switch (filters.value.month) {
        case 'this-month': 
          return chatDate.getMonth() === now.getMonth() && chatDate.getFullYear() === now.getFullYear()
        case 'last-month':
          const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
          return chatDate.getMonth() === lastMonth.getMonth() && chatDate.getFullYear() === lastMonth.getFullYear()
        case 'last-3months':
          const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1)
          return chatDate >= threeMonthsAgo
        default: return true
      }
    })
  }

  return list
})

// Format date
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

// Format time from datetime string
const formatTime = (datetimeString) => {
  if (!datetimeString) return 'N/A'
  const date = new Date(datetimeString)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
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
  return map[type] || type?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'N/A'
}

// Update dashboard stats
const updateStats = () => {
  const completedChats = chats.value
  
  stats.value.totalChats = completedChats.length
  
  // Calculate average duration
  const totalDuration = completedChats.reduce((total, chat) => {
    return total + (parseInt(chat.duration_minutes) || 0)
  }, 0)
  const avgDuration = completedChats.length > 0 ? Math.round(totalDuration / completedChats.length) : 0
  stats.value.averageDuration = `${avgDuration}min`
  
  // Count unique participants
  const participantIds = new Set()
  completedChats.forEach(chat => {
    if (chat.end_user?.user?.id) participantIds.add(chat.end_user.user.id)
    if (chat.customer?.user?.id) participantIds.add(chat.customer.user.id)
  })
  stats.value.totalParticipants = participantIds.size
  
  // Count chats with transcripts
  stats.value.withTranscripts = completedChats.filter(chat => 
    chat.send_reminders === '1'
  ).length
}

// Fetch previous chats from API
const fetchPreviousChats = async () => {
  isLoading.value = true

  try {
    const response = await api().get('/customer-support?type=liveChat&status=completed')

    const data = response.data?.data || []

    if (Array.isArray(data)) {
      chats.value = data.map(chat => ({
        ...chat,
        status: 'completed', // All are completed for previous chats
        title: chat.title || 'Untitled Chat',
        description: chat.description || 'No description provided'
      }))
    } else {
      console.warn('Unexpected API response format:', response.data)
      chats.value = []
    }

    updateStats()
  } catch (err) {
    console.error('Failed to load previous chats:', err)
    Swal.fire({
      icon: 'error',
      title: 'Failed to Load',
      text: err.response?.data?.message || 'Could not fetch previous chats.'
    })
    chats.value = []
    updateStats()
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchPreviousChats()
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

.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
  background: linear-gradient(to bottom, #6366f1, #8b5cf6);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #4f46e5, #7c3aed);
}
</style>