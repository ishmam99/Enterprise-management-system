<template>
  <div class="px-10 bg-white py-5 w-11/12 mx-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Live Support</h1>
            <p class="text-gray-600 mt-2">Real-time customer assistance and communication</p>
          </div>
          <div class="flex items-center space-x-4">
            <div class="flex items-center px-3 py-2 bg-green-100 text-green-800 rounded-lg">
              <div class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span class="text-sm font-medium">Online</span>
            </div>
            <button
              @click="$router.back()"
              class="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
          </div>
        </div>
      </div>

      <!-- Support Channels -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Live Chat -->
        <div class="bg-white rounded-xl shadow-lg border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-bold text-gray-900">Live Chat</h2>
              <span class="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                {{ activeChats }} Active
              </span>
            </div>
            <p class="text-gray-600 mt-2">Real-time text-based customer support</p>
          </div>

          <div class="p-6">
            <!-- Chat List -->
            <div class="space-y-4 max-h-96 overflow-y-auto">
              <div
                v-for="chat in activeChatSessions"
                :key="chat.id"
                @click="selectChat(chat)"
                :class="[
                  'p-4 border rounded-lg cursor-pointer transition-all',
                  selectedChat?.id === chat.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                ]"
              >
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center">
                    <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span class="font-medium text-gray-900">{{ chat.customerName }}</span>
                  </div>
                  <span class="text-sm text-gray-500">{{ formatTime(chat.lastActivity) }}</span>
                </div>
                <p class="text-sm text-gray-600 truncate">{{ chat.lastMessage }}</p>
                <div class="flex items-center justify-between mt-2">
                  <span class="text-xs text-gray-500">Waiting: {{ chat.waitTime }}</span>
                  <span
                    v-if="chat.unread"
                    class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full"
                  >
                    {{ chat.unread }} new
                  </span>
                </div>
              </div>
            </div>

            <!-- Chat Actions -->
            <div class="flex space-x-3 mt-6 pt-6 border-t border-gray-200">
              <button
                @click="startNewChat"
                class="flex-1 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start New Chat
              </button>
              <button
                @click="openChatSettings"
                class="px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>


      </div>

      <!-- Support Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Today's Performance -->
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Today's Performance</h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Chats Handled</span>
              <span class="font-semibold text-gray-900">12</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Calls Answered</span>
              <span class="font-semibold text-gray-900">8</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Avg. Response Time</span>
              <span class="font-semibold text-gray-900">45s</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Satisfaction Rate</span>
              <span class="font-semibold text-green-600">96%</span>
            </div>
          </div>
        </div>

        <!-- Quick Templates -->
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Responses</h3>
          <div class="space-y-3">
            <button
              v-for="template in quickTemplates"
              :key="template.id"
              @click="useTemplate(template)"
              class="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <p class="text-sm font-medium text-gray-900">{{ template.title }}</p>
              <p class="text-xs text-gray-600 mt-1">{{ template.message }}</p>
            </button>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const activeChats = ref(3)
const activeCalls = ref(1)
const selectedChat = ref(null)
const currentCall = ref(null)
const callDuration = ref('00:00')

const activeChatSessions = ref([
  {
    id: 1,
    customerName: 'John Smith',
    lastMessage: 'Hello, I need help with my account settings...',
    lastActivity: new Date(),
    waitTime: '2 min',
    unread: 3
  },
  {
    id: 2,
    customerName: 'Sarah Johnson',
    lastMessage: 'The payment page is not loading properly...',
    lastActivity: new Date(Date.now() - 5 * 60000),
    waitTime: '5 min',
    unread: 0
  },
  {
    id: 3,
    customerName: 'Mike Wilson',
    lastMessage: 'Can you help me reset my password?',
    lastActivity: new Date(Date.now() - 10 * 60000),
    waitTime: '10 min',
    unread: 1
  }
])

const callQueue = ref([
  {
    id: 1,
    customerName: 'Emily Davis',
    customerPhone: '+1 (555) 123-4567',
    waitTime: '3 min'
  },
  {
    id: 2,
    customerName: 'David Brown',
    customerPhone: '+1 (555) 987-6543',
    waitTime: '7 min'
  }
])

const quickTemplates = ref([
  {
    id: 1,
    title: 'Welcome Message',
    message: 'Hello! Thank you for contacting support. How can I help you today?'
  },
  {
    id: 2,
    title: 'Technical Issue',
    message: 'I understand you\'re experiencing technical difficulties. Let me help you resolve this.'
  },
  {
    id: 3,
    title: 'Billing Question',
    message: 'I\'d be happy to help with your billing inquiry. Let me look into this for you.'
  },
  {
    id: 4,
    title: 'Follow-up',
    message: 'Just following up on our previous conversation. Is there anything else you need help with?'
  }
])

let callTimer = null

const formatTime = (date) => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const selectChat = (chat) => {
  selectedChat.value = chat
  chat.unread = 0
  console.log('Selected chat:', chat.id)
}

const startNewChat = () => {
  console.log('Starting new chat session...')
}

const openChatSettings = () => {
  console.log('Opening chat settings...')
}

const answerCall = (call) => {
  currentCall.value = call
  callQueue.value = callQueue.value.filter(c => c.id !== call.id)
  activeCalls.value++

  // Start call timer
  let seconds = 0
  callTimer = setInterval(() => {
    seconds++
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    callDuration.value = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }, 1000)
}

const muteCall = () => {
  console.log('Toggling mute...')
}

const endCall = () => {
  if (currentCall.value) {
    console.log('Ending call with:', currentCall.value.customerName)
    currentCall.value = null
    activeCalls.value--
    clearInterval(callTimer)
  }
}

const makeOutboundCall = () => {
  console.log('Making outbound call...')
}

const openCallSettings = () => {
  console.log('Opening call settings...')
}

const useTemplate = (template) => {
  console.log('Using template:', template.title)
  if (selectedChat.value) {
    console.log('Sending message:', template.message)
  }
}

onMounted(() => {
  // Initialize live support features
  console.log('Live support initialized')
})

onUnmounted(() => {
  if (callTimer) {
    clearInterval(callTimer)
  }
})
</script>
