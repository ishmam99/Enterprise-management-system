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
              Completed Chat List
            </h1>
          </div>
          <p class="text-gray-600 ml-13">Manage and view all live chat sessions for today</p>
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
                <option value="active">Active Now</option>
                <option value="upcoming">Upcoming</option>
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
            <svg class="animate-spin h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
          <p class="text-gray-600 mt-4 font-medium">Loading today's chat sessions...</p>
        </div>
      </div>

      <!-- Chats Table -->
      <div v-else-if="filteredChats.length > 0" class="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider rounded-tl-2xl">
                  Chat Details
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-white tracking-wider">
                  Schedule & Activity
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
                v-for="chat in filteredChats"
                :key="chat.id"
                class="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 group"
              >
                <!-- Chat Details -->
                <td class="px-6 py-4">
                  <div class="flex items-start space-x-3">
                    <div :class="[
                      'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                      chat.type === 'customer-support' ? 'bg-blue-100 text-blue-600' :
                      chat.type === 'team-collaboration' ? 'bg-green-100 text-green-600' :
                      chat.type === 'qna-session' ? 'bg-purple-100 text-purple-600' :
                      chat.type === 'focus-group' ? 'bg-orange-100 text-orange-600' :
                      'bg-pink-100 text-pink-600'
                    ]">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                      </svg>
                    </div>
                    <div class="min-w-0 flex-1">
                      <div class="flex items-center space-x-2 mb-1">
                        <span class="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">{{ chat.id }}</span>
                        <span :class="[
                          'px-2 py-1 rounded-full text-xs font-semibold',
                          chat.priority === 'high' ? 'bg-red-100 text-red-700 border border-red-200' :
                          chat.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                          'bg-green-100 text-green-700 border border-green-200'
                        ]">
                          {{ chat.priority }}
                        </span>
                      </div>
                      <h4 class="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                        {{ chat.title }}
                      </h4>
                      <p class="text-xs text-gray-500 mt-1 line-clamp-2">{{ chat.description }}</p>
                      <!-- Chat Features -->
                      <div class="flex flex-wrap gap-1 mt-2">
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
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Schedule & Activity -->
                <td class="px-6 py-4">
                  <div class="space-y-2">
                    <div class="flex items-center text-sm text-gray-600">
                      <svg class="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span>{{ chat.startTime }}</span>
                      <span class="mx-2 text-gray-300">•</span>
                      <span>{{ chat.duration }} min</span>
                    </div>
                    <div v-if="chat.messageCount" class="flex items-center text-sm text-gray-600">
                      <svg class="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                      </svg>
                      <span>{{ chat.messageCount }} messages</span>
                    </div>
                    <div class="text-xs text-gray-400">
                      {{ getTimeUntil(chat.date, chat.startTime) }}
                    </div>
                  </div>
                </td>

                <!-- Type & Priority -->
                <td class="px-6 py-4">
                  <div class="space-y-2">
                    <span :class="[
                      'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold',
                      chat.type === 'customer-support' ? 'bg-blue-100 text-blue-700' :
                      chat.type === 'team-collaboration' ? 'bg-green-100 text-green-700' :
                      chat.type === 'qna-session' ? 'bg-purple-100 text-purple-700' :
                      chat.type === 'focus-group' ? 'bg-orange-100 text-orange-700' :
                      'bg-pink-100 text-pink-700'
                    ]">
                      {{ formatChatType(chat.type) }}
                    </span>
                    <div class="flex items-center text-sm text-gray-600">
                      <svg class="w-4 h-4 mr-1 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                      </svg>
                      <span class="capitalize">{{ chat.priority }} Priority</span>
                    </div>
                  </div>
                </td>

        

                <!-- Status -->
                <td class="px-6 py-4">
                  <span
                    :class="[
                      'px-3 py-2 rounded-full text-xs font-semibold flex items-center justify-center w-24',
                      chat.status === 'active'
                        ? 'bg-green-100 text-green-700 border border-green-200 animate-pulse'
                        : chat.status === 'upcoming'
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'bg-gray-100 text-gray-700 border border-gray-200'
                    ]"
                  >
                    <svg
                      v-if="chat.status === 'active'"
                      class="w-3 h-3 mr-1 animate-pulse"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="5"/>
                    </svg>
                    {{ chat.status === 'active' ? 'Active Now' : chat.status === 'upcoming' ? 'Upcoming' : 'Completed' }}
                  </span>
                </td>

                <!-- Actions -->
                <td class="px-6 py-4">
                  <div class="flex items-center justify-center space-x-2">
                    <button
                      @click="joinChat(chat)"
                      :class="[
                        'px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center',
                        chat.status === 'active'
                          ? 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white shadow-lg transform hover:-translate-y-0.5'
                          : chat.status === 'upcoming'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg transform hover:-translate-y-0.5'
                          : 'bg-gray-200 text-gray-600 cursor-not-allowed'
                      ]"
                      :disabled="chat.status === 'completed'"
                    >
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                      </svg>
                      {{ chat.status === 'active' ? 'Join' : chat.status === 'upcoming' ? 'Start' : 'Completed' }}
                    </button>
                    <button
                      @click="viewDetails(chat)"
                      class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
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
            <div class="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <svg class="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
            </div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900">No chat sessions today</h3>
          <p class="mt-2 text-gray-600">There are no chat sessions scheduled for today.</p>
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
  type: 'all',
  priority: 'all'
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
    date: new Date().toISOString().split('T')[0],
    startTime: '14:00',
    duration: 60,
    type: 'customer-support',
    status: 'active',
    participantsCount: 8,
    messageCount: 45,
    priority: 'high',
    features: ['file-sharing', 'transcript']
  },
  {
    id: 'CHAT-002',
    title: 'Team Collaboration - Project Alpha',
    description: 'Weekly team sync to discuss project progress, blockers, and next steps for Project Alpha.',
    date: new Date().toISOString().split('T')[0],
    startTime: '11:00',
    duration: 30,
    type: 'team-collaboration',
    status: 'upcoming',
    participantsCount: 12,
    messageCount: 0,
    priority: 'medium',
    features: ['file-sharing']
  },
  {
    id: 'CHAT-003',
    title: 'Q&A Session - New Features',
    description: 'Community Q&A about our recently launched features and upcoming roadmap.',
    date: new Date().toISOString().split('T')[0],
    startTime: '16:00',
    duration: 90,
    type: 'qna-session',
    status: 'upcoming',
    participantsCount: 25,
    messageCount: 0,
    priority: 'medium',
    features: ['transcript']
  },
  {
    id: 'CHAT-004',
    title: 'Focus Group - User Experience',
    description: 'Discussion with selected users about their experience with our platform and suggested improvements.',
    date: new Date().toISOString().split('T')[0],
    startTime: '13:00',
    duration: 45,
    type: 'focus-group',
    status: 'completed',
    participantsCount: 15,
    messageCount: 189,
    priority: 'high',
    features: ['transcript']
  },
  {
    id: 'CHAT-005',
    title: 'Community Chat - General Discussion',
    description: 'Open community chat for general discussions, feedback, and community building.',
    date: new Date().toISOString().split('T')[0],
    startTime: '18:00',
    duration: 120,
    type: 'community-chat',
    status: 'upcoming',
    participantsCount: 50,
    messageCount: 0,
    priority: 'low',
    features: []
  },
  {
    id: 'CHAT-006',
    title: 'Client Onboarding - TechCorp',
    description: 'Onboarding session for new enterprise client TechCorp to discuss setup and training.',
    date: new Date().toISOString().split('T')[0],
    startTime: '10:00',
    duration: 60,
    type: 'customer-support',
    status: 'completed',
    participantsCount: 6,
    messageCount: 78,
    priority: 'high',
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

  // Priority filter
  if (filters.value.priority !== 'all') {
    filtered = filtered.filter(chat => chat.priority === filters.value.priority)
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

const formatChatType = (type) => {
  return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

const getTimeUntil = (dateString, timeString) => {
  const now = new Date()
  const chatDate = new Date(`${dateString}T${timeString}`)
  const diff = chatDate - now

  if (diff < 0) return 'Past'

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (hours > 0) {
    return `in ${hours}h ${minutes}m`
  } else {
    return `in ${minutes}m`
  }
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
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to right, #2563eb, #7c3aed);
}
</style>
