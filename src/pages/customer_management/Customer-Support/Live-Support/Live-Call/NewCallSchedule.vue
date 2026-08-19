<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
    <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8 text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
          </svg>
        </div>
        <h1 class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Schedule Live Call
        </h1>
        <p class="text-gray-600 mt-2 max-w-md mx-auto">
          Set up a new live call session with your team or clients
        </p>
      </div>

      <!-- Main Form Card -->
      <div class="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
        <form @submit.prevent="scheduleCall" class="space-y-10">

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
                  {{ cust.user?.name || 'Unnamed' }} - ({{ cust.user?.email }})
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
                :disabled="loadingEndUsers || !selectedCustomerId"
                class="w-full px-5 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition-all duration-300 font-medium text-gray-800 shadow-inner"
              >
                <option value="" disabled>
                  {{ loadingEndUsers ? 'Loading end users...' : 'Select an end user' }}
                </option>
                <option v-for="user in endUsers" :key="user.id" :value="user.end_user_id || user.id">
                  {{ user.user?.name || user.name || 'No name' }} — ({{ user.user?.email || 'No email' }})
                </option>
              </select>
            </div>
          </div>

          <!-- Call Title & Description -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="space-y-4">
              <label class="block">
                <span class="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  Call Title *
                </span>
                <input v-model="form.title" type="text" required placeholder="Enter call title..."
                  class="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-purple-50">
              </label>

              <label class="block">
                <span class="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  Description
                </span>
                <textarea v-model="form.description" rows="4" placeholder="Describe the purpose of this call..."
                  class="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-blue-50 resize-none"></textarea>
              </label>
            </div>

            <!-- Date & Time -->
            <div class="space-y-4">
              <label class="block">
                <span class="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  Date *
                </span>
                <input v-model="form.date" type="date" required
                  class="w-full px-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-green-50">
              </label>

              <div class="grid grid-cols-2 gap-4">
                <label class="block">
                  <span class="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    Start Time *
                  </span>
                  <input v-model="form.startTime" type="time" required
                    class="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-orange-50">
                </label>
                <label class="block">
                  <span class="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    End Time *
                  </span>
                  <input v-model="form.endTime" type="time" required
                    class="w-full px-4 py-3 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-red-50">
                </label>
              </div>
            </div>
          </div>

          <!-- Participants -->
          <label class="block">
            <span class="text-sm font-semibold text-gray-700 mb-2 flex items-center">
              Additional Participants (comma-separated emails)
            </span>
            <input v-model="form.participants" type="text" placeholder="john@example.com, jane@example.com"
              class="w-full px-4 py-3 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-indigo-50">
          </label>

          <!-- Call Type & Priority -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <label class="block">
              <span class="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                Call Type *
              </span>
              <select v-model="form.callType" required
                class="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-purple-50 appearance-none">
                <option value="">Select call type</option>
                <option value="team-meeting">Team Meeting</option>
                <option value="client-call">Client Call</option>
                <option value="one-on-one">One-on-One</option>
                <option value="training">Training Session</option>
                <option value="webinar">Webinar</option>
                <option value="interview">Interview</option>
              </select>
            </label>

            <label class="block">
              <span class="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                Priority Level
              </span>
              <select v-model="form.priority"
                class="w-full px-4 py-3 border border-yellow-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 bg-yellow-50 appearance-none">
                <option value="low">Low Priority</option>
                <option value="medium" selected>Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
            </label>
          </div>

          <!-- Additional Options -->
          <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
            <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              Additional Options
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label class="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" :checked="recordCallChecked" @change="toggleRecordCall"
                  class="w-5 h-5 text-purple-600 rounded focus:ring-purple-500 border-purple-300">
                <span class="text-sm text-gray-700">Record this call</span>
              </label>
              <label class="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" :checked="sendRemindersChecked" @change="toggleSendReminders"
                  class="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-blue-300">
                <span class="text-sm text-gray-700">Send email reminders</span>
              </label>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button type="submit" :disabled="loading || !selectedCustomerId || !selectedEndUserId"
              class="flex-1 px-6 py-4 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed">
              {{ loading ? 'Scheduling...' : 'Schedule Live Call' }}
            </button>
            <button type="button" @click="router.back()"
              class="flex-1 px-6 py-4 border border-gray-300 text-gray-700 hover:border-purple-400 hover:text-purple-700 font-semibold rounded-xl transition-all duration-300">
              Cancel
            </button>
          </div>
        </form>
      </div>

      <!-- Success Overlay -->
      <div v-if="showSuccess" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-bounce-in">
          <div class="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-2">Call Scheduled!</h3>
          <p class="text-gray-600 mb-6">Your live call has been successfully scheduled.</p>
          <button @click="showSuccess = false; router.push('/customer_management/Customer-Support/Live-Support/Live-Call/ApprovedCallSchedules/ApprovedList')"
            class="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-blue-700 transition-all duration-300">
            Continue
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import api from '@/config/api'

const router = useRouter()
const loading = ref(false)
const showSuccess = ref(false)

// Customer & End User Selection
const customers = ref([])
const endUsers = ref([])
const selectedCustomerId = ref('')
const selectedEndUserId = ref('')  // This is the actual end_user_id (end user)
const loadingCustomers = ref(false)
const loadingEndUsers = ref(false)

const form = ref({
  title: '',
  description: '',
  date: '',
  startTime: '',
  endTime: '',
  participants: '',
  callType: '',
  priority: 'medium',
  record_call: 1,
  send_reminders: 1
})

// Checkbox computed
const recordCallChecked = computed(() => form.value.record_call === 1)
const sendRemindersChecked = computed(() => form.value.send_reminders === 1)

const toggleRecordCall = (e) => { form.value.record_call = e.target.checked ? 1 : 0 }
const toggleSendReminders = (e) => { form.value.send_reminders = e.target.checked ? 1 : 0 }

// Fetch Customers
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

// Fetch End Users for Selected Customer
const onCustomerChange = async () => {
  selectedEndUserId.value = ''
  endUsers.value = []
  if (!selectedCustomerId.value) return

  loadingEndUsers.value = true
  try {
    // Adjust this endpoint based on your actual API
    const { data } = await api().get(`/end-users?customer_id=${selectedCustomerId.value}&with=user`)
    endUsers.value = Array.isArray(data.data) ? data.data : data
  } catch (err) {
    Swal.fire('Error', 'Could not load end users for this customer', 'error')
    console.error(err)
  } finally {
    loadingEndUsers.value = false
  }
}

// Submit Form with customer_id & end_user_id
const scheduleCall = async () => {
  if (!selectedCustomerId.value || !selectedEndUserId.value) {
    Swal.fire('Validation Error', 'Please select both Customer and End User', 'warning')
    return
  }

  loading.value = true

  try {
    const payload = {
      customer_id: selectedCustomerId.value,
      end_user_id: selectedEndUserId.value,  // This is the actual end user's end_user_id
      title: form.value.title,
      description: form.value.description,
      date: form.value.date,
      start_time: form.value.startTime,
      end_time: form.value.endTime,
      participants: form.value.participants.split(',').map(p => p.trim()).filter(Boolean),
      call_type: form.value.callType,
      priority: form.value.priority,
      record_call: form.value.record_call,
      send_reminders: form.value.send_reminders
    }

    const response = await api().post('customer-support?type=liveCall', payload)

    if (response.status === 200 || response.status === 201) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Live call scheduled successfully.',
        timer: 2000,
        showConfirmButton: false
      })

      showSuccess.value = true

      // Reset form
      selectedCustomerId.value = ''
      selectedEndUserId.value = ''
      endUsers.value = []
      Object.assign(form.value, {
        title: '', description: '', date: '', startTime: '', endTime: '',
        participants: '', callType: '', priority: 'medium',
        record_call: 1, send_reminders: 1
      })
    }
  } catch (err) {
    const msg = err.response?.data?.message || 'Failed to schedule call. Please try again.'
    Swal.fire('Error', msg, 'error')
    console.error(err)
  } finally {
    loading.value = false
  }
}

// Load customers on mount
onMounted(() => {
  getCustomers()
})
</script>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator,
input[type="time"]::-webkit-calendar-picker-indicator {
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
</style>
