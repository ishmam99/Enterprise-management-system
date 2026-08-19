<template>
  <div class="px-2 bg-white py-5 w-11/12 mx-auto">
    <div class="bg-gradient-to-r from-teal-600 to-teal-700 rounded-t-2xl text-white px-6 py-5 mb-6 shadow-lg">
      <h1 class="text-2xl font-bold mb-2">Create Training Schedule</h1>
      <p class="text-teal-100">Schedule training sessions for approved courses</p>
    </div>

    <!-- Form Card -->
    <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <!-- Loading State -->
      <div v-if="loadingCourses" class="flex flex-col items-center justify-center py-10">
        <span class="loading loading-spinner loading-lg text-teal-600 mb-3"></span>
        <span class="text-gray-600 font-medium">Loading approved courses...</span>
        <p class="text-sm text-gray-400 mt-1">Fetching available courses for scheduling</p>
      </div>

      <form v-else @submit.prevent="submitForm" class="space-y-8">
        <!-- Course Selection -->
        <div class="form-group">
          <div class="flex items-center justify-between mb-2">
            <label class="block text-sm font-semibold text-gray-700">
              Select Course
              <span class="text-red-500 ml-1">*</span>
            </label>
            <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {{ approvedCourses.length }} courses available
            </span>
          </div>
          <div class="relative">
            <select 
              v-model="formData.training_course_id" 
              class="w-full pl-4 pr-10 py-3 border-2 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
              :class="errors.training_course_id ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'"
              required
            >
              <option value="" disabled selected class="text-gray-400">Choose a course...</option>
              <option 
                v-for="course in approvedCourses" 
                :key="course.id" 
                :value="course.training_course?.id"
                class="py-2"
              >
                {{ formatCourseOption(course) }}
              </option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          <div v-if="errors.training_course_id" class="mt-2 flex items-center text-red-600 text-sm">
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            {{ errors.training_course_id }}
          </div>
        </div>

        <!-- Start Date -->
        <div class="form-group">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Start Date & Time
            <span class="text-red-500 ml-1">*</span>
          </label>
          <div class="relative">
            <input 
              type="datetime-local" 
              v-model="formData.start_date" 
              class="w-full pl-4 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
              :class="errors.start_date ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'"
              required
            />
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
          <div v-if="errors.start_date" class="mt-2 flex items-center text-red-600 text-sm">
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            {{ errors.start_date }}
          </div>
        </div>

        <!-- Duration in Days -->
        <div class="form-group">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Duration (in Days)
            <span class="text-red-500 ml-1">*</span>
          </label>
          <div class="relative">
            <input 
              type="number" 
              v-model="formData.duration_days" 
              min="1"
              max="30"
              step="1"
              class="w-full pl-4 pr-12 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
              :class="errors.duration_days ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'"
              placeholder="Enter number of days"
              required
              @input="calculateEndDate"
            />
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span class="text-gray-500 font-medium">days</span>
            </div>
          </div>
          <div class="flex justify-between mt-1">
            <div v-if="errors.duration_days" class="flex items-center text-red-600 text-sm">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              {{ errors.duration_days }}
            </div>
            <div class="text-xs text-gray-500">
              Min: 1 day • Max: 30 days
            </div>
          </div>
        </div>

        <!-- End Date (Auto-calculated) -->
        <div class="form-group">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            End Date & Time
            <span class="text-green-600 text-xs ml-2">(Auto-calculated)</span>
          </label>
          <div class="relative">
            <input 
              type="datetime-local" 
              v-model="formData.end_date" 
              class="w-full pl-4 pr-4 py-3 border-2 rounded-lg bg-gray-50 border-gray-300 text-gray-700"
              readonly
            />
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
          <div v-if="formData.end_date" class="mt-2 text-sm text-gray-600">
            <div class="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
              </svg>
              Total duration: {{ formData.duration_days || 0 }} day(s)
            </div>
          </div>
        </div>

        <!-- Additional Information -->
        <div class="form-group">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Additional Notes
            <span class="text-gray-400 text-xs font-normal ml-1">(Optional)</span>
          </label>
          <div class="relative">
            <textarea 
              v-model="formData.notes" 
              class="w-full pl-4 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 resize-none"
              :class="errors.notes ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'"
              placeholder="Add any special instructions, requirements, or notes for this training schedule..."
              rows="4"
            ></textarea>
            <div class="absolute bottom-3 right-3 text-xs text-gray-400">
              {{ formData.notes?.length || 0 }}/500
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-gray-200">
          <div class="mb-4 sm:mb-0">
            <button 
              type="button" 
              @click="resetForm"
              class="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center"
              :disabled="submitting"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Reset Form
            </button>
          </div>
          <button 
            type="submit" 
            class="px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-lg shadow-md hover:from-teal-700 hover:to-teal-800 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
            :disabled="submitting"
          >
            <span v-if="submitting" class="loading loading-spinner loading-sm mr-2"></span>
            <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            {{ submitting ? 'Creating Schedule...' : 'Create Training Schedule' }}
          </button>
        </div>
      </form>

      <!-- Success Message -->
      <div v-if="successMessage" class="mt-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg shadow-sm">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-semibold text-green-800">Schedule Created Successfully!</h3>
            <p class="text-green-700 mt-1">{{ successMessage }}</p>
            <div v-if="createdSchedule" class="mt-3 p-3 bg-white rounded border border-green-100">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <span class="text-xs font-medium text-gray-500">Schedule ID:</span>
                  <p class="text-sm font-semibold text-gray-800">{{ createdSchedule.id }}</p>
                </div>
                <div>
                  <span class="text-xs font-medium text-gray-500">Start Date:</span>
                  <p class="text-sm font-semibold text-gray-800">{{ formatDateTime(createdSchedule.start_date) }}</p>
                </div>
                <div>
                  <span class="text-xs font-medium text-gray-500">End Date:</span>
                  <p class="text-sm font-semibold text-gray-800">{{ formatDateTime(createdSchedule.end_date) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Course Information Preview -->
    <div v-if="selectedCourse" class="mt-8 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-xl font-bold text-gray-800">Selected Course Details</h2>
        <span class="px-3 py-1 bg-teal-100 text-teal-800 text-xs font-semibold rounded-full">
          {{ selectedCourse.training_course?.training_type || 'Onsite' }}
        </span>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="flex items-center mb-2">
              <svg class="w-5 h-5 text-teal-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-sm font-medium text-gray-700">Course Information</span>
            </div>
            <div class="space-y-2 pl-7">
              <div>
                <span class="text-xs text-gray-500 block">Title:</span>
                <p class="text-gray-900 font-medium">{{ selectedCourse.training_course?.title }}</p>
              </div>
              <div>
                <span class="text-xs text-gray-500 block">Code:</span>
                <p class="text-gray-900">{{ selectedCourse.training_course?.course_code }}</p>
              </div>
              <div>
                <span class="text-xs text-gray-500 block">Course ID:</span>
                <p class="text-gray-900 font-mono text-sm">{{ selectedCourse.training_course?.course_id }}</p>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="flex items-center mb-2">
              <svg class="w-5 h-5 text-teal-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span class="text-sm font-medium text-gray-700">Trainer Information</span>
            </div>
            <div class="space-y-2 pl-7">
              <div>
                <span class="text-xs text-gray-500 block">Name:</span>
                <p class="text-gray-900 font-medium">{{ selectedCourse.trainer_id?.name }}</p>
              </div>
              <div>
                <span class="text-xs text-gray-500 block">Email:</span>
                <p class="text-gray-900">{{ selectedCourse.trainer_id?.email }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="flex items-center mb-2">
              <svg class="w-5 h-5 text-teal-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <span class="text-sm font-medium text-gray-700">Technical Details</span>
            </div>
            <div class="grid grid-cols-2 gap-4 pl-7">
              <div>
                <span class="text-xs text-gray-500 block">Industry:</span>
                <p class="text-gray-900">{{ selectedCourse.training_course?.industry?.name || 'N/A' }}</p>
              </div>
              <div>
                <span class="text-xs text-gray-500 block">Solution:</span>
                <p class="text-gray-900">{{ selectedCourse.training_course?.solution?.name || 'N/A' }}</p>
              </div>
              <div>
                <span class="text-xs text-gray-500 block">Software:</span>
                <p class="text-gray-900">{{ selectedCourse.training_course?.software?.name || 'N/A' }}</p>
              </div>
              <div>
                <span class="text-xs text-gray-500 block">Course Duration:</span>
                <p class="text-gray-900">{{ selectedCourse.training_course?.duration || 'N/A' }}</p>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="flex items-center mb-2">
              <svg class="w-5 h-5 text-teal-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              <span class="text-sm font-medium text-gray-700">Training Level</span>
            </div>
            <div class="pl-7">
              <span 
                class="px-3 py-1.5 rounded-full text-sm font-semibold capitalize inline-flex items-center"
                :class="{
                  'bg-blue-100 text-blue-800 border border-blue-200': selectedCourse.training_course?.training_level === 'Basic' || selectedCourse.training_course?.training_level?.toLowerCase() === 'basic',
                  'bg-yellow-100 text-yellow-800 border border-yellow-200': selectedCourse.training_course?.training_level === 'Intermediate' || selectedCourse.training_course?.training_level?.toLowerCase() === 'intermediate',
                  'bg-red-100 text-red-800 border border-red-200': selectedCourse.training_course?.training_level === 'Advanced' || selectedCourse.training_course?.training_level?.toLowerCase() === 'advance'
                }"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {{ selectedCourse.training_course?.training_level || 'N/A' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'
import api from '@/config/api'
import Swal from 'sweetalert2'

const { toast } = useToast()

// Reactive data
const approvedCourses = ref([]) // Trainer-course records with status 1 (approved)
const loadingCourses = ref(false)
const submitting = ref(false)
const successMessage = ref('')
const createdSchedule = ref(null)

// Form data
const formData = ref({
  training_course_id: '', // This should be the ID from training_course table
  start_date: '',
  duration_days: 1,
  end_date: '',
  notes: ''
})

// Form errors
const errors = ref({
  training_course_id: '',
  start_date: '',
  duration_days: '',
  notes: ''
})

// Fetch approved courses from trainer-course
const fetchApprovedCourses = async () => {
  loadingCourses.value = true
  try {
    const response = await api().get('trainer-course', {
      params: {
        status: 1, // Only get approved courses
        with: 'trainer,training_course.industry,training_course.solution,training_course.software'
      }
    })
    
    approvedCourses.value = response.data.data.data || response.data.data
    console.log('Fetched courses:', approvedCourses.value) // Debug log
  } catch (error) {
    console.error('Error fetching approved courses:', error)
    toast({
      title: 'Error',
      description: 'Failed to load approved courses',
      variant: 'destructive'
    })
  } finally {
    loadingCourses.value = false
  }
}

// Format course option for dropdown - FIXED
const formatCourseOption = (course) => {
  const courseTitle = course.training_course?.title || 'Unknown Course'
  const trainerName = course.trainer_id?.name || 'Unknown Trainer'
  const courseCode = course.training_course?.course_code || ''
  const courseId = course.training_course?.id || 'N/A'
  
  return `${courseTitle}`
}

// Get selected course details - FIXED
const selectedCourse = computed(() => {
  if (!formData.value.training_course_id) return null
  
  // Find the trainer-course record that has the matching training_course.id
  return approvedCourses.value.find(course => 
    course.training_course?.id == formData.value.training_course_id
  )
})

// Format date for display
const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A'
  try {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (error) {
    return 'Invalid date'
  }
}

// Calculate end date based on start date and duration
const calculateEndDate = () => {
  if (!formData.value.start_date || !formData.value.duration_days) {
    return
  }

  const startDate = new Date(formData.value.start_date)
  const durationDays = parseInt(formData.value.duration_days) || 0
  
  if (durationDays <= 0) {
    formData.value.end_date = ''
    return
  }

  // Add duration days to start date
  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + durationDays)
  
  // Format for datetime-local input (YYYY-MM-DDTHH:MM)
  const formatForInput = (date) => {
    return date.toISOString().slice(0, 16)
  }
  
  formData.value.end_date = formatForInput(endDate)
}

// Validate form
const validateForm = () => {
  let isValid = true
  errors.value = { training_course_id: '', start_date: '', duration_days: '', notes: '' }

  // Validate course selection
  if (!formData.value.training_course_id) {
    errors.value.training_course_id = 'Please select a course'
    isValid = false
  }

  // Validate start date
  if (!formData.value.start_date) {
    errors.value.start_date = 'Start date is required'
    isValid = false
  } else {
    const startDate = new Date(formData.value.start_date)
    const now = new Date()
    if (startDate < now) {
      errors.value.start_date = 'Start date cannot be in the past'
      isValid = false
    }
  }

  // Validate duration
  if (!formData.value.duration_days || formData.value.duration_days <= 0) {
    errors.value.duration_days = 'Duration must be at least 1 day'
    isValid = false
  } else if (formData.value.duration_days > 30) {
    errors.value.duration_days = 'Duration cannot exceed 30 days'
    isValid = false
  }

  // Validate notes length
  if (formData.value.notes && formData.value.notes.length > 500) {
    errors.value.notes = 'Notes cannot exceed 500 characters'
    isValid = false
  }

  return isValid
}

// Submit form
const submitForm = async () => {
  if (!validateForm()) {
    toast({
      title: 'Validation Error',
      description: 'Please fix the errors in the form',
      variant: 'destructive'
    })
    return
  }

  submitting.value = true

  try {
    // Prepare payload for trainer-schedule API
    // Important: We need to send the training_course_id (from training_course table)
    const payload = {
      training_course_id: formData.value.training_course_id,
      start_date: formData.value.start_date,
      end_date: formData.value.end_date,
      notes: formData.value.notes || null,
      duration_days: parseInt(formData.value.duration_days)
    }

    console.log('Submitting payload:', payload) // Debug log

    // Make API call to create schedule
    const response = await api().post('trainer-schedule', payload)

    createdSchedule.value = response.data.data || response.data
    successMessage.value = 'Training schedule created successfully!'
    
    // Show success alert
    Swal.fire({
      title: 'Success!',
      html: `
        <div class="text-left">
          <p class="mb-3">Training schedule has been created successfully.</p>
          
        </div>
      `,
      icon: 'success',
      timer: 4000
    })

    // Reset form after success
    resetForm()
    
  } catch (error) {
    console.error('Error creating schedule:', error)
    
    let errorMessage = 'Failed to create schedule. Please try again.'
    
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message
    } else if (error.response?.data?.errors) {
      // Handle validation errors from backend
      const backendErrors = error.response.data.errors
      Object.keys(backendErrors).forEach(key => {
        if (errors.value[key] !== undefined) {
          errors.value[key] = backendErrors[key][0]
        }
      })
      errorMessage = 'Please fix the validation errors'
    }
    
    toast({
      title: 'Error',
      description: errorMessage,
      variant: 'destructive'
    })
  } finally {
    submitting.value = false
  }
}

// Reset form
const resetForm = () => {
  formData.value = {
    training_course_id: '',
    start_date: '',
    duration_days: 1,
    end_date: '',
    notes: ''
  }
  errors.value = {
    training_course_id: '',
    start_date: '',
    duration_days: '',
    notes: ''
  }
  successMessage.value = ''
  createdSchedule.value = null
  
  // Set default dates
  setDefaultDates()
}

// Set default dates (tomorrow for start, with 1 day duration)
const setDefaultDates = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(9, 0, 0, 0) // Set to 9:00 AM
  
  // Format for datetime-local input (YYYY-MM-DDTHH:MM)
  const formatForInput = (date) => {
    return date.toISOString().slice(0, 16)
  }
  
  formData.value.start_date = formatForInput(tomorrow)
  formData.value.duration_days = 1
  calculateEndDate() // Calculate end date based on default values
}

// Watch for start date or duration changes
watch(() => [formData.value.start_date, formData.value.duration_days], () => {
  calculateEndDate()
})

// Initialize
onMounted(() => {
  fetchApprovedCourses()
  setDefaultDates()
})
</script>

<style scoped>
.form-group {
  margin-bottom: 1.5rem;
}

input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  background: transparent;
  bottom: 0;
  color: transparent;
  cursor: pointer;
  height: auto;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: auto;
}

textarea {
  resize: none;
}

/* Custom scrollbar for select dropdown */
select::-webkit-scrollbar {
  width: 8px;
}

select::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

select::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

select::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>