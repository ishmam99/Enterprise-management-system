<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
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
        <form @submit.prevent="scheduleChat" class="space-y-12">

          <!-- ==================== 1. CUSTOMER & END-USER SELECTION ==================== -->
          <!-- 1. Customer Selection -->
          <div>
            <div class="flex items-center mb-8">
              <div class="w-2 h-12 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full mr-4"></div>
              <h3 class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Select Customer
              </h3>
            </div>

            <div class="max-w-2xl">
              <label class="block text-sm font-bold text-gray-800 mb-3">
                Customer <span class="text-rose-500">*</span>
              </label>
              <select
                v-model="selectedCustomerId"
                @change="onCustomerChange"
                :disabled="loadingCustomers"
                required
                class="w-full px-5 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition-all duration-300 font-medium text-gray-800 shadow-inner"
              >
                <option value="" disabled>
                  {{ loadingCustomers ? 'Loading customers...' : 'Choose a customer' }}
                </option>
                <option v-for="cust in customers" :key="cust.id" :value="cust.id">
                  {{ cust.user?.name || 'Unnamed' }} -Email- ({{ cust.user?.email }})
                </option>
              </select>
            </div>
          </div>

          <!-- 2. End User Selection -->
          <div v-if="selectedCustomerId">
            <div class="flex items-center mb-8">
              <div class="w-2 h-12 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full mr-4"></div>
              <h3 class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Select End User
              </h3>
            </div>

            <div class="max-w-2xl">
              <label class="block text-sm font-bold text-gray-800 mb-3">
                End User <span class="text-rose-500">*</span>
              </label>
              <select
                v-model="selectedEndUserId"
                required
                :disabled="loadingEndUsers"
                class="w-full px-5 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition-all duration-300 font-medium text-gray-800 shadow-inner"
              >
                <option value="" disabled>
                  {{ loadingEndUsers ? 'Loading end users...' : 'Select an end user' }}
                </option>
                <option v-for="user in endUsers" :key="user.id" :value="user.id">
                  {{ user.user?.name || user.name || 'No name' }} --({{ user.user?.email }})
                </option>
              </select>
            </div>
          </div>

          <!-- ==================== REST OF THE ORIGINAL FORM ==================== -->
          <!-- Chat Title & Description -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- ... (your existing title, description, date/time, duration blocks stay unchanged) ... -->
            <div class="space-y-4">
              <label class="block">
                <span class="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                  Chat Session Title *
                </span>
                <input v-model="form.title" type="text" required placeholder="Enter chat session title..."
                  class="w-full px-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-green-50">
              </label>

              <label class="block">
                <span class="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <svg class="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Chat Purpose
                </span>
                <textarea v-model="form.description" rows="4" placeholder="Describe the purpose and topics for this chat session..."
                  class="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-blue-50 resize-none"></textarea>
              </label>
            </div>

            <div class="space-y-4">
              <label class="block">
                <span class="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <svg class="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  Start Date & Time *
                </span>
                <input v-model="form.startDateTime" type="datetime-local" required
                  class="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-purple-50">
              </label>

              <label class="block">
                <span class="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <svg class="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Duration *
                </span>
                <select v-model="form.duration" required
                  class="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-orange-50 appearance-none">
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
                  <input v-model="form.customHours" type="number" min="0" max="24"
                    class="w-full px-4 py-3 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-red-50">
                </label>
                <label class="block">
                  <span class="text-sm font-semibold text-gray-700 mb-2">Minutes</span>
                  <input v-model="form.customMinutes" type="number" min="0" max="59"
                    class="w-full px-4 py-3 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-red-50">
                </label>
              </div>
            </div>
          </div>

          <!-- Chat Type & Settings (unchanged) -->
          <!-- ... all your existing sections ... -->

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button type="submit"
              class="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              :disabled="!selectedCustomerId || !selectedEndUserId">
              <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              Schedule Live Chat
            </button>
            <button type="button" @click="$router.back()"
              class="flex-1 px-6 py-4 border border-gray-300 text-gray-700 hover:border-green-400 hover:text-green-700 font-semibold rounded-xl transition-all duration-300">
              Cancel
            </button>
          </div>
        </form>
      </div>

      <!-- Success Modal (unchanged) -->
      <div v-if="showSuccess" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <!-- ... modal content ... -->
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
const showSuccess = ref(false)
const loading = ref(false)

// ---------- Customer & End-User ----------
const customers = ref([])
const endUsers = ref([])
const selectedCustomerId = ref('')
const selectedEndUserId = ref('')
const loadingCustomers = ref(false)
const loadingEndUsers = ref(false)

const getCustomers = async () => {
  loadingCustomers.value = true
  try {
    const { data } = await api().get('/customers?with=user')
    if (data.success && Array.isArray(data.data)) {
      customers.value = data.data
    }
  } catch (err) {
    Swal.fire('Error', 'Failed to load customers', 'error')
    console.error(err)
  } finally {
    loadingCustomers.value = false
  }
}

const onCustomerChange = async () => {
  selectedEndUserId.value = ''
  endUsers.value = []
  if (!selectedCustomerId.value) return

  loadingEndUsers.value = true
  try {
    // Change this endpoint if your backend uses a different one for end-users under a customer
       const { data } = await api().get(`/end-users?customer_id=${selectedCustomerId.value}&with=user`)
    // Some APIs return { data: [...] }, some return the array directly
    endUsers.value = Array.isArray(data.data) ? data.data : data
  } catch (err) {
    Swal.fire('Error', 'Could not load end users for this customer', 'error')
    console.error(err)
  } finally {
    loadingEndUsers.value = false
  }
}

// Load customers on component mount
onMounted(() => {
  getCustomers()
})

// ---------- Original Form ----------
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

const finalDuration = computed(() => {
  if (form.value.duration !== 'custom') return parseInt(form.value.duration)
  const h = parseInt(form.value.customHours) || 0
  const m = parseInt(form.value.customMinutes) || 0
  return h * 60 + m
})

const formatForMySQL = (datetimeLocal) => {
  if (!datetimeLocal) return null
  const date = new Date(datetimeLocal)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:00`
}

const scheduleChat = async () => {
  if (loading.value) return
  if (!selectedCustomerId.value || !selectedEndUserId.value) {
    Swal.fire('Validation', 'Please select both Customer and End User', 'warning')
    return
  }

  loading.value = true
  try {
    const payload = {
      customer_id: selectedCustomerId.value,          // ← added
      end_user_id: selectedEndUserId.value,              // ← added (end-user)
      title: form.value.title.trim(),
      description: form.value.description.trim() || null,
      start_datetime: formatForMySQL(form.value.startDateTime),
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

      // Reset everything
      form.value = { title: '', description: '', startDateTime: '', duration: '60', customHours: 0, customMinutes: 30, chatType: '', priority: 'medium', allowFileSharing: true, sendReminders: true, allowAnonymous: false }
      selectedCustomerId.value = ''
      selectedEndUserId.value = ''
      endUsers.value = []

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

<!-- Your existing <style scoped> block stays unchanged -->
