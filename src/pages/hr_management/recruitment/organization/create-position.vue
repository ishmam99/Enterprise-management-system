<template>
  <div class="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
    <!-- Header -->
    <div class=" mx-auto mb-10">
      <h1 class="text-4xl font-bold text-indigo-900 mb-3">Create New Position</h1>
      <p class="text-lg text-indigo-700">
        Add a new role to the organizational structure and define its hierarchy
      </p>
    </div>

    <!-- Form Card -->
    <div class=" mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div class="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-5">
        <h2 class="text-2xl font-semibold text-white">Position Details</h2>
      </div>

      <form @submit.prevent="submitForm" class="p-8 space-y-8">
        <!-- Position Title -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label class="form-label">
              <span class="flex items-center gap-2">
                <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Position Title <span class="text-red-500">*</span>
              </span>
            </label>
            <input
              v-model="form.title"
              type="text"
              placeholder="e.g. Senior HR Executive"
              class="form-input"
              :class="{ 'border-red-500': errors.title }"
            />
            <p v-if="errors.title" class="form-error">{{ errors.title }}</p>
          </div>

          <!-- Department -->
          <div>
            <label class="form-label">
              <span class="flex items-center gap-2">
                <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Department <span class="text-red-500">*</span>
              </span>
            </label>
            <select v-model="form.department" class="form-input" :class="{ 'border-red-500': errors.department }" :disabled="loadingDepartments">
              <option value="" disabled>{{ loadingDepartments ? 'Loading departments...' : 'Select Department' }}</option>
              <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                {{ dept.name }}
              </option>
            </select>
            <p v-if="errors.department" class="form-error">{{ errors.department }}</p>
          </div>
        </div>

        <!-- Level & Employment Type -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label class="form-label">
              <span class="flex items-center gap-2">
                <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Level <span class="text-red-500">*</span>
              </span>
            </label>
            <select v-model="form.level" class="form-input" :class="{ 'border-red-500': errors.level }">
              <option value="" disabled>Select Level</option>
              <option>Junior</option>
              <option>Mid-level</option>
              <option>Senior</option>
              <option>Lead</option>
              <option>Principal</option>
              <option>Manager</option>
              <option>Director</option>
            </select>
            <p v-if="errors.level" class="form-error">{{ errors.level }}</p>
          </div>

          <div>
            <label class="form-label">
              <span class="flex items-center gap-2">
                <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M9 9h.01M15 9h.01M12 3v1m0 16v1m8.485-1.515l-.687-.687m-15.596 0l.687.687M5 12H4m16 0h-1" />
                </svg>
                Employment Type <span class="text-red-500">*</span>
              </span>
            </label>
            <select v-model="form.employment_type" class="form-input" :class="{ 'border-red-500': errors.employment_type }">
              <option value="" disabled>Select Type</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Freelance</option>
              <option>Internship</option>
            </select>
            <p v-if="errors.employment_type" class="form-error">{{ errors.employment_type }}</p>
          </div>
        </div>

        <!-- Description -->
        <div>
          <label class="form-label">
            <span class="flex items-center gap-2">
              <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Description <span class="text-red-500">*</span>
            </span>
          </label>
          <textarea
            v-model="form.description"
            rows="6"
            placeholder="Enter position description..."
            class="form-input resize-none"
            :class="{ 'border-red-500': errors.description }"
          />
          <p v-if="errors.description" class="form-error">{{ errors.description }}</p>
        </div>

        <!-- Status -->
        <div>
          <label class="form-label mb-4">
            <span class="flex items-center gap-2">
              <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Position Status
            </span>
          </label>
          <div class="flex items-center gap-10">
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="radio" :value="1" v-model="form.status" class="w-5 h-5 text-indigo-600 focus:ring-indigo-500" />
              <span class="text-lg font-medium text-gray-700">Active</span>
              <span class="text-sm text-gray-500">(Open for hiring/filling)</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="radio" :value="0" v-model="form.status" class="w-5 h-5 text-indigo-600 focus:ring-indigo-500" />
              <span class="text-lg font-medium text-gray-700">Inactive</span>
              <span class="text-sm text-gray-500">(Frozen or archived)</span>
            </label>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <button type="button" class="btn-secondary">
            Cancel
          </button>
          <button type="submit" class="btn-primary shadow-lg" :disabled="loading">
            {{ loading ? 'Creating...' : 'Create Position' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Toast Notification -->
    <transition name="fade">
      <div
        v-if="toast.show"
        class="fixed bottom-6 right-6 px-6 py-4 rounded-xl shadow-2xl text-white text-base font-medium z-50 flex items-center gap-3 min-w-[300px]"
        :class="toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'"
      >
        <svg v-if="toast.type === 'success'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <span>{{ toast.message }}</span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import api from '@/config/api'

const form = reactive({
  title: '',
  department: '',
  level: '',
  employment_type: '',
  description: '',
  status: 1,
})

const errors = reactive({})
const departments = ref([])
const loadingDepartments = ref(false)
const loading = ref(false)

const toast = reactive({
  show: false,
  message: '',
  type: 'success'
})

const showToast = (message, type = 'success') => {
  toast.show = true
  toast.message = message
  toast.type = type
  setTimeout(() => (toast.show = false), 3000)
}

// Fetch departments from API
const fetchDepartments = async () => {
  loadingDepartments.value = true
  try {
    const response = await api().get('active-department')

    // Handle different response structures
    const departmentData = response.data?.data || response.data || []

    // Filter only active departments (status === "1" or 1)
    departments.value = departmentData.filter(dept => dept.status == 1 || dept.status === "1")
  } catch (error) {
    console.error('Error fetching departments:', error)
    departments.value = []
  } finally {
    loadingDepartments.value = false
  }
}

// Fetch departments on component mount
onMounted(() => {
  fetchDepartments()
})

const submitForm = async () => {
  // Clear previous errors
  Object.keys(errors).forEach(key => delete errors[key])

  // Validation
  if (!form.title.trim()) errors.title = 'Position title is required'
  if (!form.department) errors.department = 'Please select a department'
  if (!form.level) errors.level = 'Level is required'
  if (!form.employment_type) errors.employment_type = 'Employment type is required'
  if (!form.description.trim()) errors.description = 'Description is required'

  if (Object.keys(errors).length > 0) return

  // Prepare API payload
  const payload = {
    department_id: form.department,
    title: form.title,
    level: form.level,
    employment_type: form.employment_type,
    description: form.description,
    status: form.status
  }

  loading.value = true
  try {
    const response = await api().post('positions', payload)

    // Success
    showToast('Position created successfully!', 'success')
    console.log('New Position Created:', response.data)

    // Reset form
    form.title = ''
    form.department = ''
    form.level = ''
    form.employment_type = ''
    form.description = ''
    form.status = 1
  } catch (error) {
    console.error('Error creating position:', error)
    const errorMessage = error.response?.data?.message || 'Failed to create position. Please try again.'
    showToast(errorMessage, 'error')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.form-label {
  @apply block mb-2 text-base font-semibold text-gray-800;
}

.form-input {
  @apply w-full px-4 py-3 border border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all;
}

.form-error {
  @apply text-sm text-red-600 mt-2;
}

.btn-primary {
  @apply bg-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-indigo-700 transform hover:scale-105 transition-all shadow-md;
}

.btn-secondary {
  @apply bg-gray-200 text-gray-800 px-8 py-3 rounded-xl font-medium hover:bg-gray-300 transition-all;
}

.btn-primary:disabled {
  @apply opacity-50 cursor-not-allowed;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
