<template>
  <div class="min-h-screen w-full bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-12 px-4">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 leading-tight">
          Create Support Ticket
        </h1>
      </div>

      <!-- Back Button -->
      <div class="flex justify-end mb-6">
        <button @click="$router.back()" class="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm border-2 border-purple-200 text-purple-700 font-semibold rounded-xl hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 shadow-md hover:shadow-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>
      </div>

      <!-- Customer Info Banner -->
      <div class="mb-8 p-6 bg-gradient-to-r from-indigo-100 to-purple-100 border-2 border-indigo-300 rounded-2xl shadow-lg">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p class="text-sm font-medium text-indigo-700">Submitting ticket for</p>
            <p class="text-2xl font-bold text-indigo-900">{{ store.user?.name || 'Customer' }}</p>
          </div>
          <!-- <div class="text-right">
            <p class="text-sm font-medium text-purple-700">Customer ID</p>
            <p class="text-xl font-mono font-bold text-purple-900">{{ store.user.customer?.id }}</p>
          </div> -->
        </div>
      </div>

      <!-- Main Form Card -->
      <div class="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
        <div class="bg-gradient-to-r from-purple-600 to-pink-600 p-1">
          <div class="bg-white rounded-3xl p-8 md:p-10">
            <form @submit.prevent="createTicket" class="space-y-10">

              <!-- NEW: End User Selection -->
              <div>
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
                      {{ loadingEndUsers ? 'Loading users...' : 'Select an end user' }}
                    </option>
                    <option v-for="user in endUsers" :key="user.id" :value="user.id">
                     ({{ user.user.email }})--- {{ user.user?.name || 'No name' }}
                    </option>
                  </select>
                </div>
              </div>
              <!-- Existing Issue Information Section -->
              <div>
                <div class="flex items-center mb-8">
                  <div class="w-2 h-12 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-4"></div>
                  <h3 class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                    Tell Us About Your Issue
                  </h3>
                </div>

                <!-- Your existing grid with solution, software, etc. -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <!-- Issue Type -->
                  <div>
                    <label class="block text-sm font-bold text-gray-800 mb-3">Select Solution <span class="text-rose-500">*</span></label>
                    <select v-model="selectedSolution" required class="w-full px-5 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-300 font-medium text-gray-800 shadow-inner">
                      <option value="" disabled>Select Solutions</option>
                      <option v-for="solution in solutions" :key="solution.id" :value="solution">{{ solution.solution_name }}</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-bold text-gray-800 mb-3">Select Software<span class="text-rose-500">*</span></label>
                    <select v-model="ticketForm.software" required class="w-full px-5 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-300 font-medium text-gray-800 shadow-inner">
                      <option value="" disabled>Select softwares</option>
                      <option v-if="!selectedSolution" value="" disabled>No softwares</option>
                      <option v-for="software in selectedSolution?.softwares" :key="software.id" :value="software.id">{{ software.name }}</option>
                    </select>
                  </div>

                  <!-- Issue Type & Priority -->
               <div>
  <label class="block text-sm font-bold text-gray-800 mb-3">
    Issue Type <span class="text-rose-500">*</span>
  </label>

  <select
    v-model="ticketForm.issue_type"
    required
    class="w-full px-5 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-300 font-medium text-gray-800 shadow-inner"
  >
    <option value="" disabled>Select category</option>

    <!-- IT Group -->
    <optgroup label="IT">
      <option value="Technical">Technical Issue</option>
      <option value="Account">Account Help</option>
      <option value="Billing">Billing Inquiry</option>
    </optgroup>

    <!-- Engineering Group -->
    <optgroup label="Engineering">
      <option value="Bug">Bug Report</option>
      <option value="Feature">Feature Request</option>
      <option value="Other">Other</option>
    </optgroup>
  </select>
</div>


                  <div>
                    <label class="block text-sm font-bold text-gray-800 mb-3">Priority Level <span class="text-rose-500">*</span></label>
                    <select v-model="ticketForm.priority_level" required class="w-full px-5 py-4 bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-200 rounded-2xl focus:ring-4 focus:ring-pink-300 focus:border-pink-500 transition-all duration-300 font-medium text-gray-800 shadow-inner">
                      <option value="" disabled>How urgent is it?</option>
                      <option value="Low">Low – Can wait</option>
                      <option value="Medium">Medium – Soon please</option>
                      <option value="High">High – Important!</option>
                      <option value="Urgent">Urgent – Critical!</option>
                    </select>
                  </div>
                </div>

                <!-- Subject & Description (unchanged) -->
                <div class="mt-8">
                  <label class="block text-sm font-bold text-gray-800 mb-3">Subject <span class="text-rose-500">*</span></label>
                  <input v-model="ticketForm.subject" type="text" required placeholder="e.g., Can't log in after update" class="w-full px-6 py-4 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-300 text-lg font-medium placeholder-gray-400 shadow-inner" />
                </div>

                <div class="mt-8">
                  <label class="block text-sm font-bold text-gray-800 mb-3">Describe Everything in Detail <span class="text-rose-500">*</span></label>
                  <textarea v-model="ticketForm.description" rows="8" required placeholder="Help us help you faster! Include steps to reproduce, screenshots..." class="w-full px-6 py-5 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-300 resize-none text-gray-800 leading-relaxed shadow-inner placeholder-gray-400"></textarea>
                </div>

                <!-- File Upload (unchanged) -->
                <div class="mt-10">
                  <label class="block text-sm font-bold text-gray-800 mb-4">Attach Screenshots or Files (Optional)</label>
                  <div @click="fileInput.click()" @dragover.prevent @drop.prevent="handleDrop" class="border-4 border-dashed border-purple-300 rounded-3xl p-12 text-center cursor-pointer hover:bg-purple-50/50 transition-all duration-500 bg-gradient-to-br from-purple-50 to-pink-50 group">
                    <svg class="w-20 h-20 mx-auto mb-5 text-purple-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p class="text-xl font-bold text-purple-700">Drop files here or click to upload</p>
                    <p class="text-gray-600 mt-2">Supports images, PDFs, logs • Max 10MB</p>
                    <input ref="fileInput" type="file" class="hidden" @change="handleFileUpload" accept="image/*,.pdf,.txt,.log" />
                  </div>

                  <transition name="fade">
                    <div v-if="ticketForm.attachment" class="mt-6 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl flex items-center shadow-md">
                      <svg class="w-10 h-10 text-emerald-600 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div class="flex-1">
                        <p class="font-bold text-emerald-800 text-lg">Attached: {{ ticketForm.attachment.name }}</p>
                        <p class="text-sm text-emerald-600">{{ formatFileSize(ticketForm.attachment.size) }}</p>
                      </div>
                      <button @click="ticketForm.attachment = null" class="text-red-500 hover:text-red-700">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </transition>
                </div>
              </div>

              <!-- Submit Buttons -->
              <div class="flex flex-col sm:flex-row gap-6 pt-10 border-t-4 border-gradient-to-r from-purple-200 to-pink-200">
                <button type="submit" :disabled="isSubmitting " class="flex-1 py-5 px-8 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:scale-100 disabled:opacity-70 transition-all duration-300 flex items-center justify-center gap-3">
                  <span v-if="!isSubmitting">Submit Ticket Now</span>
                  <span v-else class="flex items-center">
                    <svg class="animate-spin h-7 w-7 text-white" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                    Sending...
                  </span>
                </button>

                <button type="button" @click="resetForm" class="px-8 py-5 border-4 border-gray-200 text-gray-700 font-bold text-lg rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300">
                  Clear All
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import Swal from 'sweetalert2'
import api from '@/config/api'
import { useAuthStore } from '@/stores/AuthStore'

const store = useAuthStore()

const isSubmitting = ref(false)
const loadingEndUsers = ref(true)
const fileInput = ref(null)
const selectedSolution = ref(null)
const selectedEndUserId = ref('')  // ← New: selected end user

const solutions = ref([])
const endUsers = ref([])

const ticketForm = reactive({
  software: '',
  issue_type: '',
  priority_level: '',
  subject: '',
  description: '',
  attachment: null,
})

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file && file.size <= 10 * 1024 * 1024) {
    ticketForm.attachment = file
  } else if (file) {
    Swal.fire('Error', 'File must be under 10MB', 'error')
  }
}

const handleDrop = (e) => {
  const file = e.dataTransfer.files[0]
  if (file) {
    ticketForm.attachment = file
  }
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const getSolutions = async () => {
  try {
    const { data } = await api().get('customer-solution?with=softwares')
    solutions.value = data
  } catch (err) {
    console.error('Failed to load solutions', err)
  }
}

const getEndUsers = async () => {
  loadingEndUsers.value = true
  try {
    const { data } = await api().get('end-users?with=user')  // ← Your API endpoint
    endUsers.value = data.data || data  // adjust based on actual response structure
  } catch (err) {
    Swal.fire('Error', 'Could not load end users', 'error')
    console.error(err)
  } finally {
    loadingEndUsers.value = false
  }
}

const createTicket = async () => {


  if (!selectedSolution.value) {
    Swal.fire('Required', 'Please select a solution', 'warning')
    return
  }

  isSubmitting.value = true

  try {
    const formData = new FormData()


    formData.append('customer_id', store.user.customer.id)
    formData.append('end_user_id', selectedEndUserId.value)
    formData.append('solution_id', selectedSolution.value.id)
    formData.append('software_id', ticketForm.software)
    formData.append('issue_type', ticketForm.issue_type)
    formData.append('priority_level', ticketForm.priority_level)
    formData.append('subject', ticketForm.subject)
    formData.append('description', ticketForm.description)
    if (ticketForm.attachment) {
      formData.append('attachment', ticketForm.attachment)
    }

    const response = await api().post('customer-support?type=online', formData)

    if (response.status === 200 || response.status === 201) {
      Swal.fire({
        icon: 'success',
        title: 'Ticket Created!',
        text: 'Your support ticket has been submitted.',
        timer: 2500,
        showConfirmButton: false
      })
      resetForm()
    }
  } catch (error) {
    console.error('Ticket creation failed:', error)
    Swal.fire('Error', error.response?.data?.message || 'Failed to create ticket', 'error')
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  selectedSolution.value = null
  selectedEndUserId.value = ''
  ticketForm.software = ''
  ticketForm.issue_type = ''
  ticketForm.priority_level = ''
  ticketForm.subject = ''
  ticketForm.description = ''
  ticketForm.attachment = null
  if (fileInput.value) fileInput.value.value = ''
}

onMounted(() => {
  getSolutions()
  getEndUsers()   // ← Load end users on mount
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
