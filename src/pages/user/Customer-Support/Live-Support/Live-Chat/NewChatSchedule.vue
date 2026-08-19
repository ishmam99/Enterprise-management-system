<template>
  <div class="px-10 bg-white py-5 w-11/12 mx-auto">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8 text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
        </div>
        <h1 class="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Schedule Live Chat
        </h1>
        <p class="text-gray-600 mt-2 max-w-md mx-auto">
          Set up a new live chat session for customer support or team collaboration
        </p>
      </div>

      <!-- Main Form Card -->
      <div class="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
        <form @submit.prevent="scheduleChat" class="space-y-8">
          <!-- Chat Title & Description -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="space-y-4">
              <label class="block">
                <span class="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                  Chat Session Title *
                </span>
                <input
                  v-model="form.title"
                  type="text"
                  required
                  placeholder="Enter chat session title..."
                  class="w-full px-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-green-50"
                >
              </label>

              <label class="block">
                <span class="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <svg class="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Chat Purpose
                </span>
                <textarea
                  v-model="form.description"
                  rows="4"
                  placeholder="Describe the purpose and topics for this chat session..."
                  class="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-blue-50 resize-none"
                ></textarea>
              </label>
            </div>

            <!-- Date & Time -->
            <div class="space-y-4">
              <label class="block">
                <span class="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <svg class="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  Start Date & Time *
                </span>
                <input
                  v-model="form.startDateTime"
                  type="datetime-local"
                  required
                  class="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-purple-50"
                >
              </label>

              <label class="block">
                <span class="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <svg class="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Duration *
                </span>
                <select
                  v-model="form.duration"
                  required
                  class="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-orange-50 appearance-none"
                >
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                  <option value="120">2 hours</option>
                  <option value="180">3 hours</option>
                  <option value="custom">Custom duration</option>
                </select>
              </label>

              <div v-if="form.duration === 'custom'" class="grid grid-cols-2 gap-4">
                <label class="block">
                  <span class="text-sm font-semibold text-gray-700 mb-2">Hours</span>
                  <input
                    v-model="form.customHours"
                    type="number"
                    min="0"
                    max="24"
                    class="w-full px-4 py-3 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-red-50"
                  >
                </label>
                <label class="block">
                  <span class="text-sm font-semibold text-gray-700 mb-2">Minutes</span>
                  <input
                    v-model="form.customMinutes"
                    type="number"
                    min="0"
                    max="59"
                    class="w-full px-4 py-3 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-red-50"
                  >
                </label>
              </div>
            </div>
          </div>

          <!-- Chat Type & Settings -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <label class="block">
              <span class="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <svg class="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                Chat Type *
              </span>
              <select
                v-model="form.chatType"
                required
                class="w-full px-4 py-3 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-indigo-50 appearance-none"
              >
                <option value="">Select chat type</option>
                <option value="customer-support">Customer Support</option>
                <option value="team-collaboration">Team Collaboration</option>
                <option value="qna-session">Q&A Session</option>
                <option value="focus-group">Focus Group Discussion</option>
                <option value="community-chat">Community Chat</option>
                <option value="onboarding">Client Onboarding</option>
              </select>
            </label>

            <label class="block">
              <span class="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <svg class="w-4 h-4 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                </svg>
                Priority Level
              </span>
              <select
                v-model="form.priority"
                class="w-full px-4 py-3 border border-yellow-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 bg-yellow-50 appearance-none"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
            </label>
          </div>



          <!-- Chat Settings -->
          <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Chat Settings
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <label class="flex items-center space-x-3">
                  <input
                    v-model="form.allowFileSharing"
                    type="checkbox"
                    class="w-4 h-4 text-green-600 rounded focus:ring-green-500 border-green-300"
                  >
                  <span class="text-sm text-gray-700">Allow file sharing</span>
                </label>


              </div>
              <div class="space-y-4">
                <label class="flex items-center space-x-3">
                  <input
                    v-model="form.sendReminders"
                    type="checkbox"
                    class="w-4 h-4 text-orange-600 rounded focus:ring-orange-500 border-orange-300"
                  >
                  <span class="text-sm text-gray-700">Send reminder notifications</span>
                </label>
                <label class="flex items-center space-x-3">
                  <input
                    v-model="form.allowAnonymous"
                    type="checkbox"
                    class="w-4 h-4 text-pink-600 rounded focus:ring-pink-500 border-pink-300"
                  >
                  <span class="text-sm text-gray-700">Allow anonymous participants</span>
                </label>

              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              class="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              Schedule Live Chat
            </button>
            <button
              type="button"
              @click="$router.back()"
              class="flex-1 px-6 py-4 border border-gray-300 text-gray-700 hover:border-green-400 hover:text-green-700 font-semibold rounded-xl transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <!-- Success Modal -->
      <div v-if="showSuccess" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <div class="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-2">Chat Scheduled!</h3>
          <p class="text-gray-600 mb-6">Your live chat session has been successfully scheduled.</p>
          <button
            @click="showSuccess = false"
            class="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-blue-700 transition-all duration-300"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/config/api'
import Swal from 'sweetalert2'

const router = useRouter()
const showSuccess = ref(false)
const loading = ref(false)

const form = ref({
  title: '',
  description: '',
  startDateTime: '',
  duration: '60',
  customHours: 0,
  customMinutes: 30,
  chatType: '',
  priority: 'medium',
  allowFileSharing: true,
  sendReminders: true,
  allowAnonymous: false,

})

// Compute final duration in minutes
const finalDuration = computed(() => {
  if (form.value.duration !== 'custom') return parseInt(form.value.duration)
  const h = parseInt(form.value.customHours) || 0
  const m = parseInt(form.value.customMinutes) || 0
  return h * 60 + m
})

// CRITICAL FIX: Convert datetime-local → MySQL DATETIME string in +06 (BD time)
const formatForMySQL = (datetimeLocal) => {
  if (!datetimeLocal) return null

  // datetime-local gives: "2025-11-17T17:30" (browser local time = +06)
  const date = new Date(datetimeLocal)  // Already in correct timezone

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = '00'

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

const scheduleChat = async () => {
  if (loading.value) return
  loading.value = true

  try {
    const payload = {
      title: form.value.title.trim(),
      description: form.value.description.trim() || null,
      start_datetime: formatForMySQL(form.value.startDateTime),  // Fixed format
      duration_minutes: finalDuration.value,
      chat_type: form.value.chatType,
      priority: form.value.priority,
      allow_file_sharing: form.value.allowFileSharing ? 1 : 0,
      send_reminders: form.value.sendReminders ? 1 : 0,
      allow_anonymous: form.value.allowAnonymous ? 1 : 0,

    }

    const response = await api().post('customer-support?type=liveChat', payload)

    if (response.status === 200 || response.status === 201) {
      Swal.fire({
        icon: 'success',
        title: 'Scheduled!',
        text: 'Live chat session created successfully.',
        timer: 2000,
        showConfirmButton: false
      })

      showSuccess.value = true

      // Reset form
      form.value = {
        title: '', description: '', startDateTime: '', duration: '60',
        customHours: 0, customMinutes: 30, chatType: '', priority: 'medium',
        allowFileSharing: true, sendReminders: true, allowAnonymous: false,
      }

      setTimeout(() => {
        showSuccess.value = false
        router.push('/customer_management/Customer-Support/Live-Support/Live-Chat/ApprovedChatSchedules/ApprovedList')
      }, 2200)
    }
  } catch (err) {
    console.error('Schedule failed:', err)
    const msg = err.response?.data?.message || 'Failed to schedule chat. Please try again.'
    Swal.fire('Error', msg, 'error')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Custom styles for better appearance */
input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  filter: invert(0.5) sepia(1) saturate(5) hue-rotate(230deg);
  cursor: pointer;
}

select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

/* Custom scrollbar for participants list */
.max-h-32::-webkit-scrollbar {
  width: 6px;
}

.max-h-32::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.max-h-32::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #10b981, #3b82f6);
  border-radius: 10px;
}

.max-h-32::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #059669, #2563eb);
}
</style>
