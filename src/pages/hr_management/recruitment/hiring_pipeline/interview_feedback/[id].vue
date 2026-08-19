<template>
  <div class="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
    <!-- Back Button -->
    <button @click="goBack" class="mb-6 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
      </svg>
      Back
    </button>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p class="mt-4 text-indigo-600">Loading...</p>
      </div>
    </div>

    <div v-else>
      <!-- Header -->
      <div class="mx-auto mb-10">
        <h1 class="text-4xl font-bold text-indigo-900 mb-3">Interview Feedback</h1>
        <p class="text-lg text-indigo-700">Provide and review candidate interview feedback</p>
      </div>

      <!-- Candidate Info -->
      <div class="mx-auto mb-8 bg-white rounded-2xl shadow-md p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <p class="text-xs text-gray-500 mb-1">Candidate</p>
          <p class="font-semibold text-gray-900">{{ candidate.full_name }}</p>
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-1">Position</p>
          <p class="font-semibold text-gray-900">{{ candidate.job?.title || 'N/A' }}</p>
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-1">Department</p>
          <p class="font-semibold text-gray-900">{{ candidate.job?.department || 'N/A' }}</p>
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-1">Interviewer</p>
          <p class="font-semibold text-gray-900">{{ candidate.interviewer || 'Current User' }}</p>
        </div>
      </div>

      <!-- Check if feedback exists in application.value -->
      <div v-if="hasExistingFeedback" class="mx-auto mb-10">
        <!-- Feedback Status Message with Edit Button -->
        <div class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-lg flex justify-between items-center">
          <div class="flex items-center">
            <svg class="h-5 w-5 text-blue-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"></path>
            </svg>
            <div>
              <p class="text-blue-700 font-medium">Feedback already submitted</p>
              <p class="text-blue-600 text-sm">You can edit the existing feedback below</p>
            </div>
          </div>
          <button @click="enableEditMode"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
              </path>
            </svg>
            Edit Feedback
          </button>
        </div>

        <!-- Display Existing Feedback (View Mode) -->
        <div v-if="!isEditing" class="bg-white rounded-2xl shadow-xl p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Current Feedback
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p class="text-sm text-gray-500 mb-1">Technical Skills</p>
              <p class="text-lg font-semibold text-gray-900">{{ existingFeedback.technical_skills }}/5</p>
              <p class="text-sm text-gray-600">{{ getRatingLabel(existingFeedback.technical_skills) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 mb-1">Communication</p>
              <p class="text-lg font-semibold text-gray-900">{{ existingFeedback.communication }}/5</p>
              <p class="text-sm text-gray-600">{{ getRatingLabel(existingFeedback.communication) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 mb-1">Problem Solving</p>
              <p class="text-lg font-semibold text-gray-900">{{ existingFeedback.problem_solving }}/5</p>
              <p class="text-sm text-gray-600">{{ getRatingLabel(existingFeedback.problem_solving) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 mb-1">Cultural Fit</p>
              <p class="text-lg font-semibold text-gray-900">{{ existingFeedback.cultural_fit }}/5</p>
              <p class="text-sm text-gray-600">{{ getRatingLabel(existingFeedback.cultural_fit) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 mb-1">Expected Salary</p>
              <p class="text-lg font-semibold text-gray-900">{{ existingFeedback.expected_salary ? '$' +
                formatSalary(existingFeedback.expected_salary) : 'N/A' }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 mb-1">Recommendation</p>
              <p class="inline-block px-3 py-1 rounded-full text-sm font-medium"
                :class="getRecommendationClass(existingFeedback.recommendation)">
                {{ existingFeedback.recommendation || 'N/A' }}
              </p>
            </div>
          </div>

          <div class="mb-6">
            <p class="text-sm text-gray-500 mb-1">Overall Comment</p>
            <div class="bg-gray-50 rounded-lg p-4">
              <p class="text-gray-700">{{ existingFeedback.overall_comment || 'No comment provided' }}</p>
            </div>
          </div>

          <div v-if="existingFeedback.updated_at" class="text-sm text-gray-500 border-t pt-4">
            <p>Last updated: {{ formatDate(existingFeedback.updated_at, true) }}</p>
          </div>
        </div>

        <!-- Edit Feedback Form -->
        <div v-else class="bg-white rounded-2xl shadow-xl p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
              </path>
            </svg>
            Edit Feedback
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="form-label">Technical Skills <span class="text-red-500">*</span></label>
              <select v-model="editForm.technical" class="form-input" required>
                <option disabled value="">Select rating</option>
                <option v-for="n in 5" :key="n" :value="n">{{ n }} - {{ getRatingLabel(n) }}</option>
              </select>
            </div>
            <div>
              <label class="form-label">Communication <span class="text-red-500">*</span></label>
              <select v-model="editForm.communication" class="form-input" required>
                <option disabled value="">Select rating</option>
                <option v-for="n in 5" :key="n" :value="n">{{ n }} - {{ getRatingLabel(n) }}</option>
              </select>
            </div>
            <div>
              <label class="form-label">Problem Solving <span class="text-red-500">*</span></label>
              <select v-model="editForm.problemSolving" class="form-input" required>
                <option disabled value="">Select rating</option>
                <option v-for="n in 5" :key="n" :value="n">{{ n }} - {{ getRatingLabel(n) }}</option>
              </select>
            </div>
            <div>
              <label class="form-label">Cultural Fit <span class="text-red-500">*</span></label>
              <select v-model="editForm.cultureFit" class="form-input" required>
                <option disabled value="">Select rating</option>
                <option v-for="n in 5" :key="n" :value="n">{{ n }} - {{ getRatingLabel(n) }}</option>
              </select>
            </div>
            <div>
              <label class="form-label">Expected Salary <span class="text-red-500">*</span></label>
              <div class="relative">
                <span class="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input v-model.number="editForm.expectedSalary" type="number" placeholder="Enter expected salary"
                  class="form-input pl-8" required min="0" step="1000" />
              </div>
            </div>
          </div>

          <div class="mt-6">
            <label class="form-label">Overall Comment <span class="text-red-500">*</span></label>
            <textarea v-model="editForm.comment" rows="4" placeholder="Write your feedback..." class="form-input"
              required></textarea>
          </div>

          <div class="mt-6">
            <label class="form-label">Recommendation <span class="text-red-500">*</span></label>
            <select v-model="editForm.recommendation" class="form-input" required>
              <option disabled value="">Select recommendation</option>
              <option>Strong Hire</option>
              <option>Hire</option>
              <option>Hold</option>
              <option>Reject</option>
            </select>
          </div>

          <div class="flex justify-end gap-3 mt-8">
            <button class="px-6 py-3 rounded-xl border hover:bg-gray-50 transition" @click="cancelEdit">
              Cancel
            </button>
            <button class="btn-primary" @click="updateFeedback" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
                Updating...
              </span>
              <span v-else>Update Feedback</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Feedback Form - Only show if no existing feedback -->
      <div v-else class="mx-auto mb-10 bg-white rounded-2xl shadow-xl p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Submit Feedback</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="form-label">Technical Skills <span class="text-red-500">*</span></label>
            <select v-model="form.technical" class="form-input" required>
              <option disabled value="">Select rating</option>
              <option v-for="n in 5" :key="n" :value="n">{{ n }} - {{ getRatingLabel(n) }}</option>
            </select>
          </div>
          <div>
            <label class="form-label">Communication <span class="text-red-500">*</span></label>
            <select v-model="form.communication" class="form-input" required>
              <option disabled value="">Select rating</option>
              <option v-for="n in 5" :key="n" :value="n">{{ n }} - {{ getRatingLabel(n) }}</option>
            </select>
          </div>
          <div>
            <label class="form-label">Problem Solving <span class="text-red-500">*</span></label>
            <select v-model="form.problemSolving" class="form-input" required>
              <option disabled value="">Select rating</option>
              <option v-for="n in 5" :key="n" :value="n">{{ n }} - {{ getRatingLabel(n) }}</option>
            </select>
          </div>
          <div>
            <label class="form-label">Cultural Fit <span class="text-red-500">*</span></label>
            <select v-model="form.cultureFit" class="form-input" required>
              <option disabled value="">Select rating</option>
              <option v-for="n in 5" :key="n" :value="n">{{ n }} - {{ getRatingLabel(n) }}</option>
            </select>
          </div>
          <div>
            <label class="form-label">Expected Salary <span class="text-red-500">*</span></label>
            <div class="relative">
              <span class="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input v-model.number="form.expectedSalary" type="number" placeholder="Enter expected salary"
                class="form-input pl-8" required min="0" step="1000" />
            </div>
          </div>
        </div>

        <div class="mt-6">
          <label class="form-label">Overall Comment <span class="text-red-500">*</span></label>
          <textarea v-model="form.comment" rows="4" placeholder="Write your feedback..." class="form-input"
            required></textarea>
        </div>

        <div class="mt-6">
          <label class="form-label">Recommendation <span class="text-red-500">*</span></label>
          <select v-model="form.recommendation" class="form-input" required>
            <option disabled value="">Select recommendation</option>
            <option>Hire</option>
            <option>Hold</option>
            <option>No Hire</option>
          </select>
        </div>

        <div class="flex justify-end gap-3 mt-8">
          <button class="px-6 py-3 rounded-xl border hover:bg-gray-50 transition" @click="resetForm">Reset</button>
          <button class="btn-primary" @click="submitFeedback" :disabled="isSubmitting">
            <span v-if="isSubmitting" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
              Submitting...
            </span>
            <span v-else>Submit Feedback</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import api from '@/config/api'
import { useRoute, useRouter } from 'vue-router'

const application = ref(null)
const loading = ref(false)
const isSubmitting = ref(false)
const isEditing = ref(false)

const route = useRoute()
const router = useRouter()
const applicationId = route.params.id

const candidate = ref({
  full_name: '',
  job: null,
  interviewer: 'Current User'
})

const form = ref({
  technical: '',
  communication: '',
  problemSolving: '',
  cultureFit: '',
  comment: '',
  recommendation: '',
  expectedSalary: null
})

const editForm = ref({
  technical: '',
  communication: '',
  problemSolving: '',
  cultureFit: '',
  comment: '',
  recommendation: '',
  expectedSalary: null
})

// Check if feedback exists in the application data
const hasExistingFeedback = computed(() => {
  if (!application.value?.data) return false

  const data = application.value.data
  // Check if all feedback fields are filled (complete feedback)
  const hasAllFields = !!(data.technical_skills &&
    data.communication &&
    data.problem_solving &&
    data.cultural_fit &&
    data.overall_comment &&
    data.recommendation &&
    data.expected_salary)

  // Check if any feedback fields are present (partial or complete)
  const hasAnyFields = !!(data.technical_skills ||
    data.communication ||
    data.problem_solving ||
    data.cultural_fit ||
    data.overall_comment ||
    data.recommendation ||
    data.expected_salary)

  // For the purpose of showing the view/edit mode, we consider any feedback as existing
  return hasAnyFields
})

// Extract existing feedback from application data
const existingFeedback = computed(() => {
  if (!application.value?.data) return {}

  return {
    technical_skills: application.value.data.technical_skills,
    communication: application.value.data.communication,
    problem_solving: application.value.data.problem_solving,
    cultural_fit: application.value.data.cultural_fit,
    overall_comment: application.value.data.overall_comment,
    recommendation: application.value.data.recommendation,
    expected_salary: application.value.data.expected_salary,
    created_at: application.value.data.created_at,
    updated_at: application.value.data.updated_at
  }
})

// Helper functions
const getRatingLabel = (rating) => {
  const labels = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent'
  }
  return labels[rating] || ''
}

const getRecommendationClass = (recommendation) => {
  const classes = {
    'Strong Hire': 'bg-green-100 text-green-700',
    'Hire': 'bg-blue-100 text-blue-700',
    'Hold': 'bg-yellow-100 text-yellow-700',
    'Reject': 'bg-red-100 text-red-700'
  }
  return classes[recommendation] || 'bg-gray-100 text-gray-700'
}

const formatSalary = (salary) => {
  if (!salary) return 'N/A'
  return salary.toLocaleString()
}

const formatDate = (dateString, includeTime = false) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  if (includeTime) {
    return date.toLocaleString()
  }
  return date.toLocaleDateString()
}

const resetForm = () => {
  form.value = {
    technical: '',
    communication: '',
    problemSolving: '',
    cultureFit: '',
    comment: '',
    recommendation: '',
    expectedSalary: null
  }
}

const enableEditMode = () => {
  // Populate edit form with existing data
  editForm.value = {
    technical: existingFeedback.value.technical_skills || '',
    communication: existingFeedback.value.communication || '',
    problemSolving: existingFeedback.value.problem_solving || '',
    cultureFit: existingFeedback.value.cultural_fit || '',
    comment: existingFeedback.value.overall_comment || '',
    recommendation: existingFeedback.value.recommendation || '',
    expectedSalary: existingFeedback.value.expected_salary || null
  }
  isEditing.value = true
}

const cancelEdit = () => {
  isEditing.value = false
}

const validateFormData = (formData) => {
  if (!formData.technical) return 'Technical Skills rating is required'
  if (!formData.communication) return 'Communication rating is required'
  if (!formData.problemSolving) return 'Problem Solving rating is required'
  if (!formData.cultureFit) return 'Cultural Fit rating is required'
  if (!formData.comment) return 'Comment is required'
  if (!formData.recommendation) return 'Recommendation is required'
  if (!formData.expectedSalary || formData.expectedSalary <= 0) return 'Valid expected salary is required'
  return null
}

const fetchApplication = async () => {
  loading.value = true
  try {
    const response = await api().get(`/applied-jobs/${applicationId}`)
    application.value = response.data

    candidate.value = {
      full_name: application.value.data.full_name || 'N/A',
      job: application.value.data.job,
      interviewer: 'Current User'
    }

  } catch (error) {
    console.error('Error fetching application:', error)
  } finally {
    loading.value = false
  }
}

const submitFeedback = async () => {
  // Check if feedback already exists
  if (hasExistingFeedback.value) {
    alert('Feedback has already been submitted for this application. Please use the edit option to make changes.')
    return
  }

  const validationError = validateFormData(form.value)
  if (validationError) {
    alert(validationError)
    return
  }

  isSubmitting.value = true

  try {
    const payload = {
      _method: 'PUT',
      technical_skills: form.value.technical,
      communication: form.value.communication,
      problem_solving: form.value.problemSolving,
      cultural_fit: form.value.cultureFit,
      overall_comment: form.value.comment,
      recommendation: getStatusFromRecommendation(form.value.recommendation),
      expected_salary: form.value.expectedSalary,
      status: 3
    }

    await api().post(`/applied-jobs/${applicationId}`, payload)


    await fetchApplication()

    // Reset form
    resetForm()

    alert('Feedback submitted successfully!')

  } catch (error) {
    console.error('Error submitting feedback:', error)
    alert(error.response?.data?.message || 'Failed to submit feedback. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

const updateFeedback = async () => {
  const validationError = validateFormData(editForm.value)
  if (validationError) {
    alert(validationError)
    return
  }

  isSubmitting.value = true

  try {
    const payload = {
      _method: 'PUT',
      technical_skills: editForm.value.technical,
      communication: editForm.value.communication,
      problem_solving: editForm.value.problemSolving,
      cultural_fit: editForm.value.cultureFit,
      overall_comment: editForm.value.comment,
      recommendation: getStatusFromRecommendation(editForm.value.recommendation),
      expected_salary: editForm.value.expectedSalary,
      status: 3
    }

    await api().post(`/applied-jobs/${applicationId}`, payload)

    // Refresh the application data to get the updated feedback
    await fetchApplication()

    // Exit edit mode
    isEditing.value = false

    alert('Feedback updated successfully!')

  } catch (error) {
    console.error('Error updating feedback:', error)
    alert(error.response?.data?.message || 'Failed to update feedback. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

const getStatusFromRecommendation = (recommendation) => {
  const statusMap = {
    'Hire': 'hire',
    'No Hire': 'no_hire',
    'Hold': 'hold'
  }
  return statusMap[recommendation] || 'pending'
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  if (applicationId) {
    fetchApplication()
  } else {
    console.error('No application ID provided')
  }
})
</script>

<style scoped>
.form-label {
  @apply block mb-2 text-sm font-semibold text-gray-700;
}

.form-input {
  @apply w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all;
}

.btn-primary {
  @apply bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed;
}

.badge {
  @apply px-3 py-1 rounded-full bg-gray-100 text-gray-700;
}
</style>