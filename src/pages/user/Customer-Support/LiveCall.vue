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


        <!-- Live Call -->
        <div class="bg-white rounded-xl shadow-lg border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-bold text-gray-900">Live Call</h2>
              <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {{ activeCalls }} In Progress
              </span>
            </div>
            <p class="text-gray-600 mt-2">Voice call support with customers</p>
          </div>

          <div class="p-6">
            <!-- Current Call -->
            <div v-if="currentCall" class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center">
                  <div class="w-3 h-3 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                  <span class="font-medium text-gray-900">Active Call</span>
                </div>
                <span class="text-sm font-mono text-gray-600">{{ callDuration }}</span>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-semibold text-gray-900">{{ currentCall.customerName }}</p>
                  <p class="text-sm text-gray-600">{{ currentCall.customerPhone }}</p>
                </div>
                <div class="flex space-x-2">
                  <button
                    @click="muteCall"
                    class="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </button>
                  <button
                    @click="endCall"
                    class="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Call Queue -->
            <div class="space-y-3 max-h-64 overflow-y-auto">
              <div
                v-for="call in callQueue"
                :key="call.id"
                class="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium text-gray-900">{{ call.customerName }}</p>
                    <p class="text-sm text-gray-600">{{ call.customerPhone }}</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="text-sm text-gray-500">{{ call.waitTime }}</span>
                    <button
                      @click="answerCall(call)"
                      class="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Answer
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Call Actions -->
            <div class="flex space-x-3 mt-6 pt-6 border-t border-gray-200">
              <button
                @click="makeOutboundCall"
                class="flex-1 px-4 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                Make Outbound Call
              </button>
              <button
                @click="openCallSettings"
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
