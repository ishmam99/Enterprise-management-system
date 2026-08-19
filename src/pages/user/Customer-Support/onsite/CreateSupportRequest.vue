<template>
  <div class="px-10 bg-white py-5 w-11/12 mx-auto">
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
                  Create Support Request
                </h1>
                <p class="text-gray-600 mt-2">Submit a new support ticket for assistance</p>
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

      <!-- Customer Info Banner -->
      <div class="mb-8 p-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl border-2 border-indigo-300 shadow-lg">
        <div class="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p class="text-sm font-medium text-indigo-700">Submitting for Customer</p>
            <p class="text-2xl font-bold text-indigo-900">{{ store.user?.name || 'Customer' }}</p>
          </div>
          <div class="text-right">
            <p class="text-sm font-medium text-purple-700">Customer ID</p>
            <p class="text-xl font-mono font-bold text-purple-900">{{ store.user?.customer?.id }}</p>
          </div>
        </div>
      </div>

      <!-- Progress Steps -->
      <div class="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-purple-100">
        <div class="flex items-center justify-between max-w-2xl mx-auto">
          <div v-for="(step, index) in steps" :key="step.id" class="flex items-center flex-1">
            <div class="flex flex-col items-center">
              <div :class="[
                'w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold border-4 transition-all duration-500 transform',
                currentStep >= step.id
                  ? 'bg-gradient-to-r from-purple-500 to-blue-600 border-white shadow-lg scale-110'
                  : 'bg-white border-gray-200 text-gray-400 shadow-md'
              ]">
                <span v-if="currentStep > step.id" class="text-white">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span v-else>{{ step.id }}</span>
              </div>
              <span :class="[
                'text-sm font-semibold mt-3 transition-colors duration-300',
                currentStep >= step.id ? 'text-purple-600' : 'text-gray-400'
              ]">
                {{ step.name }}
              </span>
            </div>
            <div v-if="index < steps.length - 1" :class="[
              'flex-1 h-2 mx-4 rounded-full transition-all duration-500',
              currentStep > step.id ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-gray-200'
            ]"></div>
          </div>
        </div>
      </div>

      <!-- Main Form -->
      <div class="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
        <!-- Step 1: Company Info + End User -->
        <div v-if="currentStep === 1" class="space-y-8">
          <div class="text-center mb-6">
            <div class="w-16 h-16 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Company & End User Information
            </h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Company / Organization *</label>
              <input v-model="requestForm.company" type="text" required placeholder="Enter your company name"
                class="w-full px-4 py-4 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-green-50" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
              <input v-model="requestForm.location" type="text" required placeholder="Enter your location"
                class="w-full px-4 py-4 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-blue-50" />
            </div>
          </div>

          <!-- End User Selection -->
          <div class="mt-8">
            <label class="block text-sm font-bold text-gray-800 mb-3">
              Select End User <span class="text-rose-500">*</span>
            </label>
            <select
              v-model="selectedEndUserId"
              required
              :disabled="loadingEndUsers"
              class="w-full px-5 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-300 rounded-2xl focus:ring-4 focus:ring-indigo-400 focus:border-indigo-600 transition-all duration-300 font-medium text-gray-800 shadow-inner"
            >
              <option value="" disabled>
                {{ loadingEndUsers ? 'Loading end users...' : 'Choose the person facing the issue' }}
              </option>
              <option v-for="user in endUsers" :key="user.id" :value="user.id">
                {{ user.username }} ({{ user.user_id }})
              </option>
            </select>
            <p v-if="errors.end_user_id" class="mt-2 text-sm text-red-600">{{ errors.end_user_id }}</p>
          </div>
        </div>

        <!-- Step 2: Request Details (unchanged except minor styling) -->
        <div v-if="currentStep === 2" class="space-y-8">
          <div class="text-center mb-6">
            <div class="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Request Details
            </h3>
          </div>

          <!-- Solution & Software -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold text-gray-800 mb-3">Select Solution <span class="text-rose-500">*</span></label>
              <select v-model="selectedSolution" @change="onSolutionChange" required
                class="w-full px-5 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-300 font-medium text-gray-800 shadow-inner">
                <option value="" disabled>Select Solution</option>
                <option v-for="solution in solutions" :key="solution.id" :value="solution">
                  {{ solution.solution_name }}
                </option>
              </select>
              <p v-if="errors.solution" class="mt-2 text-sm text-red-600">{{ errors.solution }}</p>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-800 mb-3">Select Software <span class="text-rose-500">*</span></label>
              <select v-model="ticketForm.software_id" :disabled="!selectedSolution" required
                class="w-full px-5 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-300 font-medium text-gray-800 shadow-inner disabled:bg-gray-100">
                <option value="" disabled>
                  {{ selectedSolution ? 'Select Software' : 'First select a solution' }}
                </option>
                <option v-for="software in selectedSolution?.softwares || []" :key="software.id" :value="software.id">
                  {{ software.name }}
                </option>
              </select>
              <p v-if="errors.software_id" class="mt-2 text-sm text-red-600">{{ errors.software_id }}</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Issue Type *</label>
              <select v-model="ticketForm.issue_type" required
                class="w-full px-4 py-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-purple-50">
                <option value="">Select issue type</option>
                <option value="Technical">Technical</option>
                <option value="Billing">Billing</option>
                <option value="Account">Account</option>
                <option value="Feature">Feature Request</option>
                <option value="Bug">Bug Report</option>
                <option value="General">General Inquiry</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Priority Level *</label>
              <select v-model="ticketForm.priority_level" required
                class="w-full px-4 py-4 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-orange-50">
                <option value="">Select priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
            <input v-model="ticketForm.subject" type="text" required placeholder="Brief summary of your issue"
              class="w-full px-4 py-4 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-blue-50" />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Detailed Description *</label>
            <textarea v-model="ticketForm.description" rows="6" required placeholder="Please provide detailed information..."
              class="w-full px-4 py-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-indigo-50 resize-none"></textarea>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Attach Files (Optional)</label>
            <div @click="triggerFileInput"
              class="border-2 border-dashed border-green-300 rounded-2xl p-8 text-center cursor-pointer hover:border-green-500 transition-all duration-300 bg-green-50 hover:bg-green-100 group">
              <svg class="w-12 h-12 text-green-400 mx-auto mb-4 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p class="text-gray-600 mb-2 font-medium">Drop files here or click to upload</p>
              <p class="text-sm text-gray-500">Max size: 10MB</p>
              <input ref="fileInput" type="file" class="hidden" @change="handleFileUpload" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
            </div>

            <div v-if="ticketForm.attachment" class="mt-4 flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
              <div class="flex items-center">
                <svg class="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div>
                  <span class="text-sm font-medium">{{ ticketForm.attachment.name }}</span>
                  <p class="text-xs text-gray-500">{{ (ticketForm.attachment.size / 1024 / 1024).toFixed(2) }} MB</p>
                </div>
              </div>
              <button @click="removeFile" class="text-red-500 hover:text-red-700">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Step 3: Review -->
        <div v-if="currentStep === 3" class="space-y-8">
          <div class="text-center mb-6">
            <h3 class="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Review Your Request
            </h3>
          </div>

          <div class="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-8 space-y-6 border border-purple-200">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 class="font-bold text-lg text-gray-800 mb-4">Company & User</h4>
                <div class="space-y-3 text-sm">
                  <div class="flex p-3 bg-white rounded-lg border"><span class="font-semibold w-32">Company:</span> {{ requestForm.company }}</div>
                  <div class="flex p-3 bg-white rounded-lg border"><span class="font-semibold w-32">Location:</span> {{ requestForm.location }}</div>
                  <div class="flex p-3 bg-white rounded-lg border"><span class="font-semibold w-32">End User:</span> {{ selectedEndUserName || '—' }}</div>
                  <div class="flex p-3 bg-white rounded-lg border"><span class="font-semibold w-32">Customer ID:</span> {{ store.user.customer.id }}</div>
                </div>
              </div>
              <div>
                <h4 class="font-bold text-lg text-gray-800 mb-4">Issue Details</h4>
                <div class="space-y-3 text-sm">
                  <div class="flex p-3 bg-white rounded-lg border"><span class="font-semibold w-32">Solution:</span> {{ selectedSolution?.solution_name || '—' }}</div>
                  <div class="flex p-3 bg-white rounded-lg border"><span class="font-semibold w-32">Software:</span> {{ selectedSoftwareName }}</div>
                  <div class="flex p-3 bg-white rounded-lg border"><span class="font-semibold w-32">Issue Type:</span> {{ ticketForm.issue_type || '—' }}</div>
                  <div class="flex p-3 bg-white rounded-lg border"><span class="font-semibold w-32">Priority:</span> {{ ticketForm.priority_level || '—' }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between pt-8 border-t border-gray-200 mt-8">
          <button v-if="currentStep > 1" @click="previousStep"
            class="flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-purple-400 hover:text-purple-700 hover:bg-purple-50 transition-all duration-300">
            Previous
          </button>
          <div v-else class="w-32"></div>

          <button v-if="currentStep < 3" @click="nextStep"
            class="flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-blue-700 transition-all duration-300 shadow-lg">
            Continue
          </button>

          <button v-if="currentStep === 3" @click="createTicket" :disabled="isSubmitting || !selectedEndUserId"
            class="flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 transition-all duration-300 shadow-lg">
            <span v-if="!isSubmitting">Submit Request</span>
            <span v-else>Submitting...</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, computed } from 'vue'
import Swal from 'sweetalert2'
import api from '@/config/api'
import { useAuthStore } from '@/stores/AuthStore'

const store = useAuthStore()

const currentStep = ref(1)
const isSubmitting = ref(false)
const loadingEndUsers = ref(true)
const fileInput = ref(null)

const steps = [
  { id: 1, name: 'Contact Info' },
  { id: 2, name: 'Request Details' },
  { id: 3, name: 'Review & Submit' }
]

// Forms
const requestForm = reactive({
  company: '',
  location: ''
})

const ticketForm = reactive({
  company_name: '',
  location: '',
  issue_type: '',
  priority_level: '',
  subject: '',
  description: '',
  attachment: null,
  solution_id: null,
  software_id: null,

})

// End User
const endUsers = ref([])
const selectedEndUserId = ref('')
const selectedEndUserName = computed(() => {
  const user = endUsers.value.find(u => u.id === selectedEndUserId.value)
  return user ? `${user.name} (${user.email})` : ''
})

// Solution & Software
const solutions = ref([])
const selectedSolution = ref(null)

const selectedSoftwareName = computed(() => {
  if (!selectedSolution.value || !ticketForm.software_id) return '—'
  const sw = selectedSolution.value.softwares.find(s => s.id === ticketForm.software_id)
  return sw?.name || '—'
})

watch(selectedSolution, (newVal) => {
  ticketForm.solution_id = newVal?.id || null
  ticketForm.software_id = null
})

const onSolutionChange = () => {
  ticketForm.software_id = null
}

// Load Data
const getSolutions = async () => {
  try {
    const { data } = await api().get('customer-solution?with=softwares')
    solutions.value = data.data || data
  } catch (err) {
    console.error('Failed to load solutions', err)
  }
}

const getEndUsers = async () => {
  loadingEndUsers.value = true
  try {
    const { data } = await api().get('end-users')
    endUsers.value = data.data || data || []
  } catch (err) {
    Swal.fire('Error', 'Could not load end users', 'error')
    console.error(err)
  } finally {
    loadingEndUsers.value = false
  }
}

// Validation
const errors = reactive({})

const validateStep1 = () => {
  const e = {}
  if (!requestForm.company.trim()) e.company = 'Company is required'
  if (!requestForm.location.trim()) e.location = 'Location is required'
  if (!selectedEndUserId.value) e.end_user_id = 'Please select an end user'
  Object.assign(errors, e)
  return Object.keys(e).length === 0
}

const validateStep2 = () => {
  const e = {}
  if (!selectedSolution.value) e.solution = 'Please select a solution'
  if (!ticketForm.software_id) e.software_id = 'Please select a software'
  if (!ticketForm.issue_type) e.issue_type = 'Issue type required'
  if (!ticketForm.priority_level) e.priority_level = 'Priority required'
  if (!ticketForm.subject?.trim()) e.subject = 'Subject required'
  if (!ticketForm.description?.trim() || ticketForm.description.trim().length < 10) e.description = 'Detailed description required'
  Object.assign(errors, e)
  return Object.keys(e).length === 0
}

const nextStep = () => {
  if (currentStep.value === 1 && !validateStep1()) return
  if (currentStep.value === 2 && !validateStep2()) return
  if (currentStep.value < 3) currentStep.value++
}

const previousStep = () => {
  if (currentStep.value > 1) currentStep.value--
}

// File handling
const triggerFileInput = () => fileInput.value?.click()
const handleFileUpload = (e) => {
  const file = e.target.files[0]
  if (file && file.size <= 10 * 1024 * 1024) {
    ticketForm.attachment = file
  } else if (file) {
    Swal.fire('Error', 'File must be under 10MB', 'error')
  }
}
const removeFile = () => {
  ticketForm.attachment = null
  if (fileInput.value) fileInput.value.value = ''
}

// Submit
const createTicket = async () => {
  if (!validateStep1() || !validateStep2()) {
    currentStep.value = 1
    return
  }

  isSubmitting.value = true
  ticketForm.company_name = requestForm.company
  ticketForm.location = requestForm.location

  const formData = new FormData()
  formData.append('customer_id', store.user.customer.id)
  formData.append('end_user_id', selectedEndUserId.value)
  formData.append('company_name', ticketForm.company_name)
  formData.append('location', ticketForm.location)
  formData.append('solution_id', ticketForm.solution_id)
  formData.append('software_id', ticketForm.software_id)
  formData.append('issue_type', ticketForm.issue_type)
  formData.append('priority_level', ticketForm.priority_level)
  formData.append('subject', ticketForm.subject)
  formData.append('description', ticketForm.description)

  if (ticketForm.attachment) {
    formData.append('attachment', ticketForm.attachment)
  }

  try {
    const response = await api().post('customer-support?type=onsite', formData)
    Swal.fire('Success!', 'Your onsite support request has been created.', 'success')
    resetForm()
    currentStep.value = 1
  } catch (err) {
    Swal.fire('Error', err.response?.data?.message || 'Failed to create ticket', 'error')
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  Object.assign(requestForm, { company: '', location: '' })
  Object.assign(ticketForm, {
    company_name: '', location: '', issue_type: '', priority_level: '',
    subject: '', description: '', attachment: null,
    solution_id: null, software_id: null,
  })
  selectedSolution.value = null
  selectedEndUserId.value = ''
  Object.keys(errors).forEach(k => delete errors[k])
  if (fileInput.value) fileInput.value.value = ''
}

onMounted(() => {
  getSolutions()
  getEndUsers()
})
</script>

<style scoped>
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 1rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
  appearance: none;
}
</style>
