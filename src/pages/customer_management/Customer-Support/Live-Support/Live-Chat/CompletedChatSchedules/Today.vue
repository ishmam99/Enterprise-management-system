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
              Today Live Chat Schedule
            </h1>
          </div>
          <p class="text-gray-600 ml-13">View and manage all scheduled live chats for today</p>
        </div>
        <div class="flex items-center space-x-4">
          <button @click="$router.push('/schedule-chat')"
            class="flex items-center px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Schedule New Chat
          </button>
        </div>
      </div>

      <!-- Stats Cards (Optional - kept for quick overview) -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-2xl p-6 shadow-lg border border-blue-200 text-center">
          <p class="text-3xl font-bold text-blue-600">{{ chats.length }}</p>
          <p class="text-sm text-gray-600">Total Today</p>
        </div>
        <div class="bg-white rounded-2xl p-6 shadow-lg border border-green-200 text-center">
          <p class="text-3xl font-bold text-green-600">{{ upcomingCount }}</p>
          <p class="text-sm text-gray-600">Upcoming</p>
        </div>
        <div class="bg-white rounded-2xl p-6 shadow-lg border border-purple-200 text-center">
          <p class="text-3xl font-bold text-purple-600">{{ activeCount }}</p>
          <p class="text-sm text-gray-600">Active Now</p>
        </div>
        <div class="bg-white rounded-2xl p-6 shadow-lg border border-orange-200 text-center">
          <p class="text-3xl font-bold text-orange-600">{{ completedCount }}</p>
          <p class="text-sm text-gray-600">Completed</p>
        </div>
      </div>

      <!-- Table -->
      <div class="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full table-auto">
            <thead class="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold">ID</th>
                <th class="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                <th class="px-6 py-4 text-left text-sm font-semibold">End User</th>
                <th class="px-6 py-4 text-left text-sm font-semibold">Title</th>
                <th class="px-6 py-4 text-left text-sm font-semibold">Start Time</th>
                <th class="px-6 py-4 text-left text-sm font-semibold">Duration</th>
                <th class="px-6 py-4 text-left text-sm font-semibold">Priority</th>
                <th class="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th class="px-6 py-4 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="chat in chats" :key="chat.id"
                  class="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200">
                <!-- ID -->
                <td class="px-6 py-5 text-sm font-medium text-gray-900">#{{ chat.id }}</td>

                <!-- Customer -->
                <td class="px-6 py-5">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                      {{ chat.customer.user.name.charAt(0) }}
                    </div>
                    <div>
                      <p class="text-sm font-semibold text-gray-900">{{ chat.customer.user.name }}</p>
                      <p class="text-xs text-gray-500">{{ chat.customer.user.email }}</p>
                    </div>
                  </div>
                </td>

                <!-- End User -->
                <td class="px-6 py-5">
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ chat.end_user.user.name }}</p>
                    <p class="text-xs text-gray-500">{{ chat.end_user.user.email }}</p>
                  </div>
                </td>

                <!-- Title -->
                <td class="px-6 py-5">
                  <p class="text-sm font-medium text-gray-900 line-clamp-2">{{ chat.title }}</p>
                  <p class="text-xs text-gray-500 mt-1">{{ chat.description || 'No description' }}</p>
                </td>

                <!-- Start Time -->
                <td class="px-6 py-5 text-sm">
                  <div class="flex items-center">
                    <svg class="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {{ formatDateTime(chat.start_datetime) }}
                  </div>
                </td>

                <!-- Duration -->
                <td class="px-6 py-5 text-sm text-center font-medium">
                  {{ chat.duration_minutes }} min
                </td>

                <!-- Priority -->
                <td class="px-6 py-5">
                  <span :class="[
                    'px-3 py-1 rounded-full text-xs font-semibold',
                    chat.priority === 'high' || chat.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                    chat.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  ]">
                    {{ chat.priority ? chat.priority.charAt(0).toUpperCase() + chat.priority.slice(1) : 'Medium' }}
                  </span>
                </td>

                <!-- Status -->
                <td class="px-6 py-5">
                  <span :class="getStatusClass(chat)">
                    {{ getStatusText(chat) }}
                  </span>
                </td>

                <!-- Actions -->
                <td class="px-6 py-5 text-center">
                  <button @click="joinChat(chat)"
                    :disabled="!isActive(chat)"
                    :class="[
                      'px-4 py-2 rounded-lg text-sm font-semibold transition-all mr-2',
                      isActive(chat)
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-md'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    ]">
                    <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                    {{ isActive(chat) ? 'Join Now' : 'Pending' }}
                  </button>
                  <button @click="viewDetails(chat)"
                    class="px-3 py-2 border border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 rounded-lg text-sm font-medium transition-all">
                    Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="chats.length === 0 && !isLoading" class="text-center py-16">
          <div class="w-24 h-24 mx-auto bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
            <svg class="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-800">No Chats Scheduled Today</h3>
          <p class="text-gray-600 mt-2">Schedule a new live chat session to get started.</p>
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
const chats = ref([])

const upcomingCount = computed(() => chats.value.filter(c => isUpcoming(c)).length)
const activeCount = computed(() => chats.value.filter(c => isActive(c)).length)
const completedCount = computed(() => chats.value.filter(c => isCompleted(c)).length)

// Format datetime (e.g., Nov 21, 2025 at 3:30 PM)
const formatDateTime = (datetime) => {
  if (!datetime) return 'N/A'
  const date = new Date(datetime)
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}

// Determine chat status
const isUpcoming = (chat) => new Date(chat.start_datetime) > new Date()
const isActive = (chat) => {
  const now = new Date()
  const start = new Date(chat.start_datetime)
  const end = new Date(start.getTime() + chat.duration_minutes * 60000)
  return now >= start && now <= end
}
const isCompleted = (chat) => new Date(chat.start_datetime) < new Date() && !isActive(chat)

const getStatusText = (chat) => {
  if (isActive(chat)) return 'Active Now'
  if (isUpcoming(chat)) return 'Upcoming'
  return 'Completed'
}

const getStatusClass = (chat) => {
  if (isActive(chat)) return 'px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200'
  if (isUpcoming(chat)) return 'px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200'
  return 'px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200'
}

const joinChat = (chat) => {
  if (!isActive(chat)) {
    Swal.fire('Not Live', 'This chat is not active yet.', 'info')
    return
  }
  const chatUrl = `${window.location.origin}/live-chat-room/${chat.id}`
  window.open(chatUrl, '_blank')
}

const viewDetails = (chat) => {
  router.push(`/live-chat/${chat.id}`)
}

const fetchTodayChats = async () => {
  isLoading.value = true
  try {
    const {data} = authStore.role !== 'customer-manager' ? await api().get(`/customer-support?type=liveChat&today=1`) : await api().get(`customer-support?company_id=${authStore.companyId}&type=liveChat&today=1`)
    // const { data } = await api().get('/customer-support?type=liveChat&today=1') // assuming you have today filter
    chats.value = Array.isArray(data.data) ? data.data : []
  } catch (err) {
    console.error(err)
    Swal.fire('Error', 'Failed to load today\'s chats', 'error')
    chats.value = []
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchTodayChats()
})
</script>

<style scoped>
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
