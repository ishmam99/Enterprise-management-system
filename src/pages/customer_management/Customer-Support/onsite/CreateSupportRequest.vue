<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <div class="flex items-center mb-2">
              <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Create Onsite Support Request
                </h1>
                <p class="text-gray-600 mt-2">Submit a new support ticket for on-premise assistance</p>
              </div>
            </div>
          </div>
          <button @click="$router.back()" class="flex items-center px-5 py-3 text-gray-600 hover:text-purple-700 transition-all duration-300 border border-gray-300 hover:border-purple-400 rounded-xl hover:shadow-lg">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
        </div>
      </div>



      <!-- Progress Steps (Now only 3 steps) -->
      <div class="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-purple-100">
        <div class="flex items-center justify-between max-w-3xl mx-auto">
          <div v-for="(step, index) in steps" :key="step.id" class="flex items-center flex-1">
            <div class="flex flex-col items-center">
              <div :class="[
                'w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold border-4 transition-all duration-500 transform',
                currentStep >= step.id
                  ? 'bg-gradient-to-r from-purple-500 to-blue-600 border-white shadow-lg scale-110 text-white'
                  : 'bg-white border-gray-200 text-gray-400 shadow-md'
              ]">
                <svg v-if="currentStep > step.id" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span v-else>{{ step.id }}</span>
              </div>
              <span :class="['text-sm font-semibold mt-3', currentStep >= step.id ? 'text-purple-600' : 'text-gray-400']">
                {{ step.name }}
              </span>
            </div>
            <div v-if="index < steps.length - 1" :class="['flex-1 h-2 mx-4 rounded-full', currentStep > step.id ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-gray-200']"></div>
          </div>
        </div>
      </div>

      <!-- Main Form -->
      <div class="bg-white rounded-2xl shadow-xl p-10 border border-purple-100">
        <form @submit.prevent="createTicket">

          <!-- Step 1: Customer + End User + Company Info (All in one page) -->
          <div v-if="currentStep === 1" class="space-y-12">
            <div class="text-center">
              <h3 class="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8">
                Who Needs Help?
              </h3>
            </div>

            <!-- Customer Selection -->
            <div class="max-w-2xl mx-auto">
              <label class="block text-sm font-bold text-gray-800 mb-3">Select Customer <span class="text-rose-500">*</span></label>
              <select v-model="selectedCustomerId" @change="onCustomerChange" :disabled="loadingCustomers" required
                class="w-full px-6 py-5 text-lg bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-300 rounded-2xl focus:ring-4 focus:ring-indigo-400 focus:border-indigo-600 transition-all duration-300 font-medium shadow-inner">
                <option value="" disabled>{{ loadingCustomers ? 'Loading customers...' : 'Choose a customer' }}</option>
                <option v-for="cust in customers" :key="cust.id" :value="cust.id">
                  ({{ cust.id }}) {{ cust.name || cust.user?.name || 'Unnamed' }} — {{ cust.user?.email || 'No email' }}
                </option>
              </select>
            </div>

            <!-- End User Selection (appears after customer selected) -->
            <div v-if="selectedCustomerId" class="max-w-2xl mx-auto animate-fade-in">
              <label class="block text-sm font-bold text-gray-800 mb-3">Select End User <span class="text-rose-500">*</span></label>
              <select v-model="selectedEndUserId" required :disabled="loadingEndUsers"
                class="w-full px-6 py-5 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-300 rounded-2xl focus:ring-4 focus:ring-indigo-400 focus:border-indigo-600 transition-all duration-300 font-medium text-gray-800 shadow-inner">
                <option value="" disabled>{{ loadingEndUsers ? 'Loading end users...' : 'Select the person facing the issue' }}</option>
                <option v-for="user in endUsers" :key="user.id" :value="user.id">
                  {{ user.user?.name || user.username || 'No Name' }} ({{ user.user?.email || user.user_id || 'No contact' }})
                </option>
              </select>
            </div>

            <!-- Company & Location -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-3">Company / Organization <span class="text-rose-500">*</span></label>
                <input v-model="requestForm.company" type="text" required placeholder="e.g., ABC Corporation Ltd."
                  class="w-full px-5 py-4 border-2 border-green-200 rounded-2xl focus:ring-4 focus:ring-green-300 focus:border-green-500 transition-all bg-green-50/50" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-3">Site Location / Address <span class="text-rose-500">*</span></label>
                <input v-model="requestForm.location" type="text" required placeholder="Full address where engineer will visit"
                  class="w-full px-5 py-4 border-2 border-blue-200 rounded-2xl focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all bg-blue-50/50" />
              </div>
            </div>
          </div>

          <!-- Step 2: Request Details -->
          <div v-if="currentStep === 2" class="space-y-10">
            <div class="text-center mb-8">
              <h3 class="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Tell Us About the Issue
              </h3>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div>
                <label class="block text-sm font-bold text-gray-800 mb-3">Select Solution <span class="text-rose-500">*</span></label>
                <select v-model="selectedSolution" @change="onSolutionChange" required
                  class="w-full px-5 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-300 font-medium text-gray-800 shadow-inner">
                  <option value="" disabled>Select Solution</option>
                  <option v-for="solution in solutions" :key="solution.id" :value="solution">{{ solution.solution_name }}</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-bold text-gray-800 mb-3">Select Software <span class="text-rose-500">*</span></label>
                <select v-model="ticketForm.software_id" :disabled="!selectedSolution" required
                  class="w-full px-5 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-300 font-medium text-gray-800 shadow-inner disabled:bg-gray-100">
                  <option value="" disabled>{{ selectedSolution ? 'Select Software' : 'First select a solution' }}</option>
                  <option v-for="software in selectedSolution?.softwares || []" :key="software.id" :value="software.id">
                    {{ software.name }}
                  </option>
                </select>
              </div>

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
                <label class="block text-sm font-semibold text-gray-700 mb-3">Priority Level <span class="text-rose-500">*</span></label>
                <select v-model="ticketForm.priority_level" required
                  class="w-full px-5 py-4 border-2 border-orange-200 rounded-2xl focus:ring-4 focus:ring-orange-300 focus:border-orange-500 transition-all bg-orange-50/50">
                  <option value="" disabled>Select priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent (24/7)</option>
                </select>
              </div>
            </div>

            <div class="max-w-4xl mx-auto space-y-8">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-3">Subject <span class="text-rose-500">*</span></label>
                <input v-model="ticketForm.subject" type="text" required placeholder="Brief summary of the request"
                  class="w-full px-5 py-4 border-2 border-blue-200 rounded-2xl focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all bg-blue-50/50" />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-3">Detailed Description <span class="text-rose-500">*</span></label>
                <textarea v-model="ticketForm.description" rows="8" required placeholder="Explain the issue, what needs to be done, preferred dates if any..."
                  class="w-full px-5 py-5 border-2 border-indigo-200 rounded-2xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition-all resize-none bg-indigo-50/50"></textarea>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-4">Attach Files (Optional)</label>
                <div @click="fileInput.click()" @dragover.prevent @drop.prevent="handleDrop"
                  class="border-4 border-dashed border-purple-300 rounded-3xl p-12 text-center cursor-pointer hover:bg-purple-50/50 transition-all bg-gradient-to-br from-purple-50 to-pink-50 group">
                  <svg class="w-20 h-20 mx-auto mb-5 text-purple-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p class="text-xl font-bold text-purple-700">Drop files or click to upload</p>
                  <p class="text-gray-600 mt-2">Images, PDFs, logs • Max 10MB</p>
                  <input ref="fileInput" type="file" class="hidden" @change="handleFileUpload" multiple accept="image/*,.pdf,.doc,.docx,.txt" />
                </div>
                <div v-if="ticketForm.attachment" class="mt-6 p-6 bg-emerald-50 border-2 border-emerald-200 rounded-2xl flex items-center justify-between">
                  <div class="flex items-center">
                    <svg class="w-8 h-8 text-emerald-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p class="font-bold text-emerald-800">{{ ticketForm.attachment.name }}</p>
                      <p class="text-sm text-emerald-600">{{ formatFileSize(ticketForm.attachment.size) }}</p>
                    </div>
                  </div>
                  <button @click="removeFile" type="button" class="text-red-600 hover:text-red-800">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Review & Submit -->
          <div v-if="currentStep === 3" class="max-w-4xl mx-auto">
            <h3 class="text-3xl font-bold text-center bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-10">
              Review Your Request
            </h3>
            <div class="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-10 border-2 border-purple-200">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm">
                <div class="space-y-5">
                  <h4 class="font-bold text-xl text-gray-800 mb-4">Customer & Site</h4>
                  <div class="flex p-4 bg-white rounded-xl border"><span class="font-semibold w-40">Customer:</span> {{ selectedCustomer?.name || selectedCustomer?.user?.name || selectedCustomerId }}</div>
                  <div class="flex p-4 bg-white rounded-xl border"><span class="font-semibold w-40">End User:</span> {{ selectedEndUserName }}</div>
                  <div class="flex p-4 bg-white rounded-xl border"><span class="font-semibold w-40">Company:</span> {{ requestForm.company }}</div>
                  <div class="flex p-4 bg-white rounded-xl border"><span class="font-semibold w-40">Location:</span> {{ requestForm.location }}</div>
                </div>
                <div class="space-y-5">
                  <h4 class="font-bold text-xl text-gray-800 mb-4">Request Details</h4>
                  <div class="flex p-4 bg-white rounded-xl border"><span class="font-semibold w-40">Solution:</span> {{ selectedSolution?.solution_name || '—' }}</div>
                  <div class="flex p-4 bg-white rounded-xl border"><span class="font-semibold w-40">Software:</span> {{ selectedSoftwareName }}</div>
                  <div class="flex p-4 bg-white rounded-xl border"><span class="font-semibold w-40">Issue Type:</span> {{ ticketForm.issue_type || '—' }}</div>
                  <div class="flex p-4 bg-white rounded-xl border"><span class="font-semibold w-40">Priority:</span> {{ ticketForm.priority_level || '—' }}</div>
                </div>
              </div>
              <div class="mt-8 p-6 bg-white/70 rounded-2xl border">
                <p class="font-semibold text-gray-800 mb-2">Description:</p>
                <p class="text-gray-700 leading-relaxed">{{ ticketForm.description || 'No description provided' }}</p>
              </div>
            </div>
          </div>

          <!-- Navigation -->
          <div class="flex justify-between items-center pt-10 mt-10 border-t-4 border-gray-200">
            <button type="button" v-if="currentStep > 1" @click="currentStep--"
              class="px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition">
              Previous
            </button>
            <div v-else class="w-40"></div>

            <button type="button" v-if="currentStep < 3" @click="nextStep"
              class="px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-xl rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition">
              Continue →
            </button>

            <button v-if="currentStep === 3" :disabled="isSubmitting"
              class="px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-xl rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center gap-3">
              <span v-if="!isSubmitting">Submit Onsite Request</span>
              <span v-else class="flex items-center gap-2">
                <svg class="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Submitting...
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import Swal from 'sweetalert2'
import api from '@/config/api'

const currentStep = ref(1)
const isSubmitting = ref(false)
const loadingCustomers = ref(true)
const loadingEndUsers = ref(false)
const fileInput = ref(null)

// Customer & End User
const customers = ref([])
const selectedCustomerId = ref('')
const selectedCustomer = computed(() => customers.value.find(c => c.id === selectedCustomerId.value) || {})

const endUsers = ref([])
const selectedEndUserId = ref('')
const selectedEndUserName = computed(() => {
  const user = endUsers.value.find(u => u.id === selectedEndUserId.value)
  return user ? `${user.user?.name || user.username || 'Unknown'} (${user.user?.email || user.user_id || 'No email'})` : '—'
})

const steps = [
  { id: 1, name: 'Customer & Site' },
  { id: 2, name: 'Issue Details' },
  { id: 3, name: 'Review & Submit' }
]

const requestForm = reactive({
  company: '',
  location: ''
})

const ticketForm = reactive({
  issue_type: '',
  priority_level: '',
  subject: '',
  description: '',
  attachment: null,
  solution_id: null,
  software_id: null,
})

const solutions = ref([])
const selectedSolution = ref(null)
const selectedSoftwareName = computed(() => {
  if (!selectedSolution.value || !ticketForm.software_id) return '—'
  const sw = selectedSolution.value.softwares?.find(s => s.id === ticketForm.software_id)
  return sw?.name || '—'
})

watch(selectedSolution, (val) => {
  ticketForm.solution_id = val?.id || null
  ticketForm.software_id = null
})

const onSolutionChange = () => ticketForm.software_id = null

// Load customers
const getCustomers = async () => {
  loadingCustomers.value = true
  try {
    const { data } = await api().get('/customers?with=user')
    customers.value = data.success ? data.data : []
  } catch (err) {
    Swal.fire('Error', 'Failed to load customers', 'error')
  } finally {
    loadingCustomers.value = false
  }
}

// Load end users for selected customer
const onCustomerChange = async () => {
  selectedEndUserId.value = ''
  endUsers.value = []
  if (!selectedCustomerId.value) return

  loadingEndUsers.value = true
  try {
    const { data } = await api().get(`/end-users?with=user`)
    endUsers.value = data.data || data || []
  } catch (err) {
    Swal.fire('Error', 'Failed to load end users', 'error')
  } finally {
    loadingEndUsers.value = false
  }
}

const getSolutions = async () => {
  try {
    const { data } = await api().get('customer-solution?with=softwares')
    solutions.value = data.data || data
  } catch (err) {
    console.error(err)
  }
}

const nextStep = () => {
  if (!selectedCustomerId.value || !selectedEndUserId.value || !requestForm.company || !requestForm.location) {
    Swal.fire('Incomplete', 'Please select customer, end user, and fill company & location', 'warning')
    return
  }
  if (currentStep.value === 2) {
    if (!selectedSolution.value || !ticketForm.software_id || !ticketForm.subject || !ticketForm.description) {
      Swal.fire('Required', 'Please complete all fields in Issue Details', 'warning')
      return
    }
  }
  currentStep.value++
}

// File handling
const handleFileUpload = (e) => {
  const file = e.target.files[0]
  if (file && file.size > 10 * 1024 * 1024) {
    Swal.fire('Error', 'File must be under 10MB', 'error')
    return
  }
  ticketForm.attachment = file
}

const handleDrop = (e) => {
  const file = e.dataTransfer.files[0]
  if (file) handleFileUpload({ target: { files: [file] } })
}

const removeFile = () => {
  ticketForm.attachment = null
  if (fileInput.value) fileInput.value.value = ''
}

const formatFileSize = (bytes) => {
  if (!bytes) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const createTicket = async () => {
  isSubmitting.value = true
  const formData = new FormData()
  formData.append('customer_id', selectedCustomerId.value)
  formData.append('end_user_id', selectedEndUserId.value)
  formData.append('company_name', requestForm.company)
  formData.append('location', requestForm.location)
  formData.append('solution_id', ticketForm.solution_id)
  formData.append('software_id', ticketForm.software_id)
  formData.append('issue_type', ticketForm.issue_type)
  formData.append('priority_level', ticketForm.priority_level)
  formData.append('subject', ticketForm.subject)
  formData.append('description', ticketForm.description)
  if (ticketForm.attachment) formData.append('attachment', ticketForm.attachment)

  try {
    await api().post('customer-support?type=onsite', formData)
    Swal.fire('Success!', 'Your onsite support request has been submitted.', 'success')
    resetForm()
  } catch (err) {
    Swal.fire('Error', err.response?.data?.message || 'Failed to submit request', 'error')
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  selectedCustomerId.value = ''
  selectedEndUserId.value = ''
  endUsers.value = []
  Object.assign(requestForm, { company: '', location: '' })
  Object.assign(ticketForm, { issue_type: '', priority_level: '', subject: '', description: '', attachment: null, solution_id: null, software_id: null })
  selectedSolution.value = null
  currentStep.value = 1
}

onMounted(() => {
  getCustomers()
  getSolutions()
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
