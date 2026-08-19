<template>
  <div class="px-2 bg-white py-5 w-11/12 mx-auto">
    <div class="bg-teal-700 rounded-t-2xl text-white px-6 py-4">
      <h1 class="text-2xl font-semibold">Become a Trainer</h1>
      <p class="text-gray-300">Apply to join our team of professional trainers</p>
    </div>

    <!-- Success Message -->
    <div v-if="successMessage" class="mt-5 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
      <span class="block sm:inline">{{ successMessage }}</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3" @click="successMessage = ''">
        <svg class="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
        </svg>
      </span>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="mt-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <span class="block sm:inline">{{ errorMessage }}</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3" @click="errorMessage = ''">
        <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
        </svg>
      </span>
    </div>

    <div class="bg-white rounded-xl p-5 w-full shadow-md mt-5">
      <form @submit.prevent="submitForm" class="space-y-6">
        <!-- Personal Information Section -->
        <div class="border-b border-gray-200 pb-6">
          <h3 class="text-lg font-semibold text-teal-800 mb-4">Personal Information</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Full Name -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Full Name <span class="text-red-500">*</span></span>
              </label>
              <input
                type="text"
                v-model="formData.name"
                class="input input-bordered w-full"
                :class="{ 'input-error': errors.name }"
                placeholder="Enter your full name"
                required
              />
              <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
            </div>

            <!-- Email -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Email Address <span class="text-red-500">*</span></span>
              </label>
              <input
                type="email"
                v-model="formData.email"
                class="input input-bordered w-full"
                :class="{ 'input-error': errors.email }"
                placeholder="Enter your email address"
                required
              />
              <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
            </div>

            <!-- Phone -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Phone Number <span class="text-red-500">*</span></span>
              </label>
              <input
                type="tel"
                v-model="formData.phone"
                class="input input-bordered w-full"
                :class="{ 'input-error': errors.phone }"
                placeholder="Enter your phone number"
                required
              />
              <p v-if="errors.phone" class="text-red-500 text-xs mt-1">{{ errors.phone }}</p>
            </div>

            <!-- Expertise Area -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Expertise Area <span class="text-red-500">*</span></span>
              </label>
              <select
                v-model="formData.expertise_area"
                class="select select-bordered w-full"
                :class="{ 'select-error': errors.expertise_area }"
                required
              >
                <option value="" disabled selected>Select your expertise area</option>
                <option value="Software Development">Software Development</option>
                <option value="Data Science">Data Science</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Project Management">Project Management</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Leadership & Management">Leadership & Management</option>
                <option value="Soft Skills">Soft Skills</option>
                <option value="Technical Writing">Technical Writing</option>
                <option value="Other">Other</option>
              </select>
              <p v-if="errors.expertise_area" class="text-red-500 text-xs mt-1">{{ errors.expertise_area }}</p>
            </div>
          </div>

          <!-- Address -->
          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text font-semibold">Address <span class="text-red-500">*</span></span>
            </label>
            <textarea
              v-model="formData.address"
              class="textarea textarea-bordered h-20"
              :class="{ 'textarea-error': errors.address }"
              placeholder="Enter your complete address"
              required
            ></textarea>
            <p v-if="errors.address" class="text-red-500 text-xs mt-1">{{ errors.address }}</p>
          </div>
        </div>

        <!-- Professional Information Section -->
        <div class="border-b border-gray-200 pb-6">
          <h3 class="text-lg font-semibold text-teal-800 mb-4">Professional Information</h3>
          
          <!-- LinkedIn Profile -->
          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">LinkedIn Profile</span>
            </label>
            <input
              type="url"
              v-model="formData.linkedin_profile"
              class="input input-bordered w-full"
              placeholder="https://linkedin.com/in/yourprofile"
            />
            <p class="text-gray-500 text-xs mt-1">Optional but recommended</p>
          </div>

          <!-- Biography -->
          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text font-semibold">Professional Biography <span class="text-red-500">*</span></span>
            </label>
            <textarea
              v-model="formData.bio"
              class="textarea textarea-bordered h-32"
              :class="{ 'textarea-error': errors.bio }"
              placeholder="Tell us about your professional background, experience, and why you want to become a trainer..."
              required
            ></textarea>
            <p v-if="errors.bio" class="text-red-500 text-xs mt-1">{{ errors.bio }}</p>
            <p class="text-gray-500 text-xs mt-1">Minimum 100 characters</p>
          </div>

          <!-- Years of Experience -->
          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text font-semibold">Years of Experience <span class="text-red-500">*</span></span>
            </label>
            <select
              v-model="formData.years_experience"
              class="select select-bordered w-full"
              :class="{ 'select-error': errors.years_experience }"
              required
            >
              <option value="" disabled selected>Select years of experience</option>
              <option value="1-2">1-2 years</option>
              <option value="3-5">3-5 years</option>
              <option value="6-10">6-10 years</option>
              <option value="10+">10+ years</option>
            </select>
            <p v-if="errors.years_experience" class="text-red-500 text-xs mt-1">{{ errors.years_experience }}</p>
          </div>

          <!-- Training Specialties -->
          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text font-semibold">Training Specialties <span class="text-red-500">*</span></span>
            </label>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
              <label v-for="specialty in trainingSpecialties" :key="specialty" class="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  :value="specialty"
                  v-model="formData.training_specialties"
                  class="checkbox checkbox-sm"
                />
                <span class="text-sm">{{ specialty }}</span>
              </label>
            </div>
            <p v-if="errors.training_specialties" class="text-red-500 text-xs mt-1">{{ errors.training_specialties }}</p>
          </div>
        </div>

        <!-- Availability Section -->
        <div class="border-b border-gray-200 pb-6">
          <h3 class="text-lg font-semibold text-teal-800 mb-4">Availability</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Preferred Training Format -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Preferred Training Format <span class="text-red-500">*</span></span>
              </label>
              <div class="space-y-2">
                <label v-for="format in trainingFormats" :key="format.value" class="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    :value="format.value"
                    v-model="formData.preferred_format"
                    class="radio radio-sm"
                  />
                  <span class="text-sm">{{ format.label }}</span>
                </label>
              </div>
              <p v-if="errors.preferred_format" class="text-red-500 text-xs mt-1">{{ errors.preferred_format }}</p>
            </div>

            <!-- Availability -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Availability <span class="text-red-500">*</span></span>
              </label>
              <div class="space-y-2">
                <label v-for="availability in availabilityOptions" :key="availability.value" class="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    :value="availability.value"
                    v-model="formData.availability"
                    class="checkbox checkbox-sm"
                  />
                  <span class="text-sm">{{ availability.label }}</span>
                </label>
              </div>
              <p v-if="errors.availability" class="text-red-500 text-xs mt-1">{{ errors.availability }}</p>
            </div>
          </div>

          <!-- Hourly Rate -->
          <div class="form-control mt-4 w-1/2">
            <label class="label">
              <span class="label-text font-semibold">Expected Hourly Rate ($) <span class="text-red-500">*</span></span>
            </label>
            <input
              type="number"
              v-model="formData.hourly_rate"
              class="input input-bordered w-full"
              :class="{ 'input-error': errors.hourly_rate }"
              min="0"
              step="5"
              placeholder="50"
              required
            />
            <p v-if="errors.hourly_rate" class="text-red-500 text-xs mt-1">{{ errors.hourly_rate }}</p>
          </div>
        </div>

        <!-- Documents Section -->
        <div class="pb-6">
          <h3 class="text-lg font-semibold text-teal-800 mb-4">Supporting Documents</h3>
          
          <!-- Resume/CV -->
          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">Resume/CV <span class="text-red-500">*</span></span>
            </label>
            <input
              type="file"
              @change="handleFileUpload($event, 'resume')"
              class="file-input file-input-bordered w-full"
              accept=".pdf,.doc,.docx"
              required
            />
            <p class="text-gray-500 text-xs mt-1">PDF, DOC, or DOCX files only (Max: 5MB)</p>
            <p v-if="errors.resume" class="text-red-500 text-xs mt-1">{{ errors.resume }}</p>
          </div>

          <!-- Additional Documents -->
          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text font-semibold">Additional Documents (Optional)</span>
            </label>
            <input
              type="file"
              @change="handleFileUpload($event, 'additional_docs')"
              class="file-input file-input-bordered w-full"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              multiple
            />
            <p class="text-gray-500 text-xs mt-1">Certificates, portfolio, etc. (Max: 10MB total)</p>
          </div>
        </div>

        <!-- Terms and Conditions -->
        <div class="form-control">
          <label class="label cursor-pointer justify-start gap-3">
            <input
              type="checkbox"
              v-model="formData.agree_terms"
              class="checkbox checkbox-sm"
              required
            />
            <span class="label-text">
              I agree to the <a href="#" class="text-teal-600 hover:text-teal-800 underline">Terms and Conditions</a> and 
              <a href="#" class="text-teal-600 hover:text-teal-800 underline">Privacy Policy</a> <span class="text-red-500">*</span>
            </span>
          </label>
          <p v-if="errors.agree_terms" class="text-red-500 text-xs mt-1">{{ errors.agree_terms }}</p>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-center pt-4">
          <button
            type="submit"
            class="btn btn-primary btn-lg min-w-48"
            :class="{ 'loading': isLoading }"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="loading loading-spinner"></span>
            {{ isLoading ? 'Submitting...' : 'Submit Application' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'
import { useAuthStore } from '@/stores/AuthStore'
import Swal from 'sweetalert2'
import api from '@/config/api'

const authStore = useAuthStore()
const { toast } = useToast()

// Form data
const formData = reactive({
  name: '',
  email: '',
  phone: '',
  expertise_area: '',
  address: '',
  linkedin_profile: '',
  bio: '',
  years_experience: '',
  training_specialties: [],
  preferred_format: '',
  availability: [],
  hourly_rate: '',
  resume: null,
  additional_docs: [],
  agree_terms: false
})

// Form state
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const errors = reactive({})

// Options
const trainingSpecialties = ref([
  'Corporate Training',
  'Workshop Facilitation',
  'One-on-One Coaching',
  'Online Courses',
  'Technical Training',
  'Soft Skills Training',
  'Leadership Development',
  'Team Building'
])

const trainingFormats = ref([
  { value: 'in_person', label: 'In-Person' },
  { value: 'virtual', label: 'Virtual/Live Online' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'self_paced', label: 'Self-Paced Content Creation' }
])

const availabilityOptions = ref([
  { value: 'weekdays', label: 'Weekdays' },
  { value: 'weekends', label: 'Weekends' },
  { value: 'evenings', label: 'Evenings' },
  { value: 'flexible', label: 'Flexible' }
])

// File upload handler
const handleFileUpload = (event, field) => {
  const files = event.target.files
  if (!files.length) return

  if (field === 'resume') {
    formData.resume = files[0]
  } else if (field === 'additional_docs') {
    formData.additional_docs = Array.from(files)
  }
}

// Form validation
const validateForm = () => {
  // Clear previous errors
  Object.keys(errors).forEach(key => delete errors[key])

  let isValid = true

  // Required fields validation
  const requiredFields = [
    'name', 'email', 'phone', 'expertise_area', 'address', 'bio',
    'years_experience', 'preferred_format', 'hourly_rate', 'resume'
  ]

  requiredFields.forEach(field => {
    if (!formData[field] || (Array.isArray(formData[field]) && formData[field].length === 0)) {
      errors[field] = `${field.replace('_', ' ')} is required`
      isValid = false
    }
  })

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (formData.email && !emailRegex.test(formData.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }

  // Phone validation
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  if (formData.phone && !phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
    errors.phone = 'Please enter a valid phone number'
    isValid = false
  }

  // Bio length validation
  if (formData.bio && formData.bio.length < 100) {
    errors.bio = 'Biography must be at least 100 characters long'
    isValid = false
  }

  // Training specialties validation
  if (formData.training_specialties.length === 0) {
    errors.training_specialties = 'Please select at least one training specialty'
    isValid = false
  }

  // Availability validation
  if (formData.availability.length === 0) {
    errors.availability = 'Please select your availability'
    isValid = false
  }

  // Hourly rate validation
  if (formData.hourly_rate && formData.hourly_rate < 0) {
    errors.hourly_rate = 'Hourly rate cannot be negative'
    isValid = false
  }

  // Terms agreement validation
  if (!formData.agree_terms) {
    errors.agree_terms = 'You must agree to the terms and conditions'
    isValid = false
  }

  return isValid
}

// Form submission
const submitForm = async () => {
  if (!validateForm()) {
    errorMessage.value = 'Please fix the errors in the form before submitting.'
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    // Create FormData for file upload
    const submitData = new FormData()
    
    // Append form data
    Object.keys(formData).forEach(key => {
      if (key === 'resume' && formData[key]) {
        submitData.append('resume', formData[key])
      } else if (key === 'additional_docs' && formData[key].length > 0) {
        formData[key].forEach(file => {
          submitData.append('additional_docs[]', file)
        })
      } else if (Array.isArray(formData[key])) {
        formData[key].forEach(value => {
          submitData.append(`${key}[]`, value)
        })
      } else if (formData[key] !== null && formData[key] !== undefined) {
        submitData.append(key, formData[key])
      }
    })

    // Add user ID if available
    if (authStore.user?.id) {
      submitData.append('user_id', authStore.user.id)
    }

    // Submit the form
    const response = await api().post('trainer-application', submitData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    // Show success message
    await Swal.fire({
      title: 'Application Submitted!',
      text: 'Your trainer application has been submitted successfully. We will review your application and get back to you soon.',
      icon: 'success',
      confirmButtonColor: '#0d9488',
      confirmButtonText: 'OK'
    })

    // Reset form
    resetForm()
    
    successMessage.value = 'Your application has been submitted successfully!'

  } catch (error) {
    console.error('Error submitting application:', error)
    
    const errorMsg = error.response?.data?.message || 'Failed to submit application. Please try again.'
    
    await Swal.fire({
      title: 'Submission Failed',
      text: errorMsg,
      icon: 'error',
      confirmButtonColor: '#0d9488'
    })
    
    errorMessage.value = errorMsg
  } finally {
    isLoading.value = false
  }
}

// Reset form
const resetForm = () => {
  Object.keys(formData).forEach(key => {
    if (Array.isArray(formData[key])) {
      formData[key] = []
    } else if (typeof formData[key] === 'boolean') {
      formData[key] = false
    } else {
      formData[key] = ''
    }
  })
  formData.additional_docs = []
  formData.resume = null
}
</script>

<style scoped>
.input-error,
.select-error,
.textarea-error {
  border-color: #ef4444;
}

.file-input {
  border: 1px solid #d1d5db;
}

.file-input:focus {
  outline: 2px solid #0d9488;
  outline-offset: 2px;
}
</style>