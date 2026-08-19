<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-10 text-center">
        <div class="flex items-center justify-center mb-4">
          <i class="ri-file-text-line text-4xl text-indigo-600 mr-3"></i>
          <h1 class="text-4xl font-bold text-gray-800">Submit Your Resume</h1>
        </div>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Share your resume with us for future job opportunities. We'll match your profile with upcoming positions in your field.
        </p>
      </div>

      <!-- Form -->
      <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <!-- Personal Information Section -->
        <div class="mb-10">
          <div class="flex items-center mb-6">
            <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
              <i class="ri-user-line text-indigo-600"></i>
            </div>
            <h2 class="text-2xl font-bold text-gray-800">Personal Information</h2>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Full Name -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Full Name</span>
              </label>
              <input 
                type="text" 
                placeholder="Enter your full name" 
                class="input input-bordered w-full focus:input-primary"
                v-model="formData.full_name"
                :class="{'input-error': errors.full_name}"
              />
              <label class="label" v-if="errors.full_name">
                <span class="label-text-alt text-error">{{ errors.full_name }}</span>
              </label>
            </div>

            <!-- Email -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Email</span>
              </label>
              <input 
                type="email" 
                placeholder="your.email@example.com" 
                class="input input-bordered w-full focus:input-primary"
                v-model="formData.email"
                :class="{'input-error': errors.email}"
              />
              <label class="label" v-if="errors.email">
                <span class="label-text-alt text-error">{{ errors.email }}</span>
              </label>
            </div>

            <!-- Contact -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Contact Number</span>
              </label>
              <input 
                type="tel" 
                placeholder="+880 1XXX-XXXXXX" 
                class="input input-bordered w-full focus:input-primary"
                v-model="formData.contact"
                :class="{'input-error': errors.contact}"
              />
              <label class="label" v-if="errors.contact">
                <span class="label-text-alt text-error">{{ errors.contact }}</span>
              </label>
            </div>

            <!-- Emergency Contact -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Emergency Contact</span>
              </label>
              <input 
                type="tel" 
                placeholder="+880 1XXX-XXXXXX" 
                class="input input-bordered w-full focus:input-primary"
                v-model="formData.emergency_contact"
                :class="{'input-error': errors.emergency_contact}"
              />
              <label class="label" v-if="errors.emergency_contact">
                <span class="label-text-alt text-error">{{ errors.emergency_contact }}</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Professional Information Section -->
        <div class="mb-10">
          <div class="flex items-center mb-6">
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <i class="ri-briefcase-line text-blue-600"></i>
            </div>
            <h2 class="text-2xl font-bold text-gray-800">Professional Information</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- System -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">System</span>
              </label>
              <select 
                class="select select-bordered w-full focus:select-primary"
                v-model="formData.system"
                :class="{'select-error': errors.system}"
              >
                <option value="">Select your system</option>
                <option value="Windows">Windows</option>
                <option value="macOS">macOS</option>
                <option value="Linux">Linux</option>
                <option value="Other">Other</option>
              </select>
              <label class="label" v-if="errors.system">
                <span class="label-text-alt text-error">{{ errors.system }}</span>
              </label>
            </div>

            <!-- Software ID -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Software</span>
              </label>
              <select 
                class="select select-bordered w-full focus:select-primary"
                v-model="formData.software_id"
                :class="{'select-error': errors.software_id}"
              >
                <option value="">Select software</option>
                <option v-for="software in softwareOptions" :key="software.id" :value="software.id">
                  {{ software.name }}
                </option>
              </select>
              <label class="label" v-if="errors.software_id">
                <span class="label-text-alt text-error">{{ errors.software_id }}</span>
              </label>
            </div>

            <!-- Industry ID -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Industry</span>
              </label>
              <select 
                class="select select-bordered w-full focus:select-primary"
                v-model="formData.industry_id"
                :class="{'select-error': errors.industry_id}"
              >
                <option value="">Select industry</option>
                <option v-for="industry in industryOptions" :key="industry.id" :value="industry.id">
                  {{ industry.name }}
                </option>
              </select>
              <label class="label" v-if="errors.industry_id">
                <span class="label-text-alt text-error">{{ errors.industry_id }}</span>
              </label>
            </div>

            <!-- Highest Education -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Highest Education</span>
              </label>
              <select 
                class="select select-bordered w-full focus:select-primary"
                v-model="formData.highest_education"
                :class="{'select-error': errors.highest_education}"
              >
                <option value="">Select education level</option>
                <option value="Secondary School">Secondary School</option>
                <option value="Higher Secondary">Higher Secondary</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="PhD">PhD</option>
                <option value="Other">Other</option>
              </select>
              <label class="label" v-if="errors.highest_education">
                <span class="label-text-alt text-error">{{ errors.highest_education }}</span>
              </label>
            </div>

            <!-- University -->
            <div class="form-control md:col-span-2">
              <label class="label">
                <span class="label-text font-semibold">University</span>
              </label>
              <input 
                type="text" 
                placeholder="Enter your university name" 
                class="input input-bordered w-full focus:input-primary"
                v-model="formData.university"
                :class="{'input-error': errors.university}"
                list="university-list"
              />
              <datalist id="university-list">
                <option>University of Dhaka</option>
                <option>Bangladesh University of Engineering and Technology (BUET)</option>
                <option>University of Chittagong</option>
                <option>Rajshahi University</option>
                <option>North South University (NSU)</option>
                <option>BRAC University</option>
                <option>Independent University, Bangladesh (IUB)</option>
                <option>East West University</option>
                <option>Ahsanullah University of Science and Technology (AUST)</option>
                <option>Stamford University Bangladesh</option>
                <option>Other University</option>
              </datalist>
              <label class="label" v-if="errors.university">
                <span class="label-text-alt text-error">{{ errors.university }}</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Resume & Experience Section -->
        <div class="mb-10">
          <div class="flex items-center mb-6">
            <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <i class="ri-file-pdf-line text-green-600"></i>
            </div>
            <h2 class="text-2xl font-bold text-gray-800">Resume & Experience</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- PDF Resume Upload -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">PDF Resume</span>
              </label>
              <div 
                class="file-upload-area border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-indigo-400 transition-colors"
                @click="triggerFileInput"
                @dragover.prevent="dragover = true"
                @dragleave.prevent="dragover = false"
                @drop.prevent="handleDrop"
                :class="{'border-indigo-400 bg-indigo-50': dragover, 'border-error': errors.resume}"
              >
                <input 
                  type="file" 
                  ref="fileInput"
                  class="hidden" 
                  accept=".pdf"
                  @change="handleFileSelect"
                />
                <i class="ri-upload-cloud-2-line text-4xl text-gray-400 mb-3"></i>
                <p class="font-medium mb-1">Upload your resume (PDF only)</p>
                <p class="text-sm text-gray-500 mb-3">Drag & drop or click to browse</p>
                <div v-if="formData.resumeFile" class="mt-3 p-3 bg-green-50 rounded-lg">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <i class="ri-file-pdf-fill text-red-500 text-xl mr-2"></i>
                      <span class="text-sm font-medium truncate">{{ formData.resumeFile.name }}</span>
                    </div>
                    <button 
                      type="button" 
                      class="btn btn-xs btn-ghost"
                      @click.stop="removeFile"
                    >
                      <i class="ri-close-line"></i>
                    </button>
                  </div>
                  <p class="text-xs text-gray-500 mt-1">{{ (formData.resumeFile.size / 1024).toFixed(2) }} KB</p>
                </div>
              </div>
              <label class="label" v-if="errors.resume">
                <span class="label-text-alt text-error">{{ errors.resume }}</span>
              </label>
            </div>

            <!-- Optional Experience Section -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Experience (Years)</span>
              </label>
              <div class="flex items-center space-x-4">
                <input 
                  type="range" 
                  min="0" 
                  max="30" 
                  class="range range-primary flex-1"
                  v-model="experienceYears"
                />
                <div class="w-20 text-center">
                  <span class="text-2xl font-bold text-indigo-600">{{ experienceYears }}</span>
                  <span class="text-sm text-gray-500 block">years</span>
                </div>
              </div>
              <div class="flex justify-between text-xs text-gray-500 px-2 mt-2">
                <span>0</span>
                <span>5</span>
                <span>10</span>
                <span>15</span>
                <span>20</span>
                <span>25</span>
                <span>30</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Notes -->
        <div class="mb-10">
          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">Additional Notes (Optional)</span>
            </label>
            <textarea 
              class="textarea textarea-bordered h-32 focus:textarea-primary"
              placeholder="Any additional information about your skills, certifications, or career preferences..."
              v-model="formData.additionalNotes"
            ></textarea>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t">
          <div class="text-sm text-gray-600">
            <p><i class="ri-information-line mr-1"></i> Only resume is required. Other fields are optional.</p>
          </div>
          <div class="flex gap-3">
            <button 
              type="button" 
              class="btn btn-outline btn-error"
              @click="resetForm"
            >
              <i class="ri-delete-bin-line mr-2"></i>
              Clear Form
            </button>
            <button 
              type="button" 
              class="btn btn-primary px-8"
              :class="{'loading': isSubmitting}"
              @click="submitForm"
              :disabled="isSubmitting || !formData.resumeFile"
            >
              <i class="ri-send-plane-line mr-2" v-if="!isSubmitting"></i>
              {{ isSubmitting ? 'Submitting...' : 'Submit Resume' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Footer Note -->
      <div class="mt-8 text-center text-gray-600 text-sm">
        <p><i class="ri-shield-check-line mr-1"></i> Your information is secure and will only be used for job matching purposes</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import Swal from 'sweetalert2'
import api from '@/config/api'

// API Configuration
const API_URL = 'http://localhost:3000/api' // Update with your actual API URL
const APPLIED_JOBS_ENDPOINT = `${API_URL}/applied-jobs`

// Form data matching API payload
const formData = reactive({
  full_name: '',
  email: '',
  contact: '',
  emergency_contact: '',
  system: '',
  software_id: '',
  industry_id: '',
  highest_education: '',
  university: '',
  resume: '', // This will hold base64 string
  resumeFile: null, // This holds the actual file object
  additionalNotes: '' // Optional field not in API
})

// Form errors
const errors = reactive({
  full_name: '',
  email: '',
  contact: '',
  emergency_contact: '',
  system: '',
  software_id: '',
  industry_id: '',
  highest_education: '',
  university: '',
  resume: ''
})

// UI State
const dragover = ref(false)
const isSubmitting = ref(false)
const fileInput = ref(null)
const experienceYears = ref(0)

// Dropdown options (you can fetch these from API if available)
const softwareOptions = ref([
  { id: 1, name: 'MSCOne' },
  { id: 2, name: 'MSC Nastran' },
  { id: 3, name: 'Marc' },
  { id: 4, name: 'Patran' },
  { id: 5, name: 'MSC Apex' },
  { id: 6, name: 'Dytran' },
  { id: 7, name: 'MSC CoSim' },
  { id: 8, name: 'Actran' },
  { id: 9, name: 'CAEfatigue' }
])

const industryOptions = ref([
  { id: 1, name: 'Aerospace' },
  { id: 2, name: 'Automotive' },
  { id: 3, name: 'Consumer Products' },
  { id: 4, name: 'Defense' },
  { id: 5, name: 'Electronics' },
  { id: 6, name: 'Energy' },
  { id: 7, name: 'Heavy Equipment' },
  { id: 8, name: 'Machinery' },
  { id: 9, name: 'Medical' },
  { id: 10, name: 'Packaging' },
  { id: 11, name: 'Retail' },
  { id: 12, name: 'Shipbuilding' }
])

// File handling methods
const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileSelect = async (event) => {
  const file = event.target.files[0]
  if (file && file.type === 'application/pdf') {
    formData.resumeFile = file
    errors.resume = ''
    
    // Convert to base64
    try {
      formData.resume = await fileToBase64(file)
    } catch (error) {
      errors.resume = 'Error processing file'
      console.error('Error converting file to base64:', error)
    }
  } else {
    errors.resume = 'Please select a PDF file only'
    Swal.fire({
      icon: 'error',
      title: 'Invalid File',
      text: 'Please select a PDF file only',
      confirmButtonColor: '#4f46e5'
    })
  }
}

const handleDrop = async (event) => {
  dragover.value = false
  const file = event.dataTransfer.files[0]
  if (file && file.type === 'application/pdf') {
    formData.resumeFile = file
    errors.resume = ''
    
    // Convert to base64
    try {
      formData.resume = await fileToBase64(file)
    } catch (error) {
      errors.resume = 'Error processing file'
      console.error('Error converting file to base64:', error)
    }
  } else {
    errors.resume = 'Please drop a PDF file only'
    Swal.fire({
      icon: 'error',
      title: 'Invalid File',
      text: 'Please drop a PDF file only',
      confirmButtonColor: '#4f46e5'
    })
  }
}

const removeFile = () => {
  formData.resumeFile = null
  formData.resume = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// Convert file to base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
      const base64String = reader.result.split(',')[1]
      resolve(base64String)
    }
    reader.onerror = error => reject(error)
  })
}

// Validate form
const validateForm = () => {
  let isValid = true
  
  // Clear previous errors
  Object.keys(errors).forEach(key => errors[key] = '')
  
  // Only validate required fields (resume is required by API)
  if (!formData.resume) {
    errors.resume = 'Resume is required'
    isValid = false
  }
  
  // Validate email format if provided
  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }
  
  // Validate contact numbers if provided
  if (formData.contact && !/^[0-9+\s\-()]{10,}$/.test(formData.contact)) {
    errors.contact = 'Please enter a valid contact number'
    isValid = false
  }
  
  if (formData.emergency_contact && !/^[0-9+\s\-()]{10,}$/.test(formData.emergency_contact)) {
    errors.emergency_contact = 'Please enter a valid emergency contact number'
    isValid = false
  }
  
  return isValid
}

// Prepare payload for API
const preparePayload = () => {
  const payload = {
    full_name: formData.full_name || null,
    email: formData.email || null,
    contact: formData.contact || null,
    emergency_contact: formData.emergency_contact || null,
    system: formData.system || null,
    highest_education: formData.highest_education || null,
    university: formData.university || null,
    resume: formData.resume,
    software_id: formData.software_id ? parseInt(formData.software_id) : null,
    industry_id: formData.industry_id ? parseInt(formData.industry_id) : null
  }
  
  return payload
}

// Form actions
const resetForm = () => {
  Object.assign(formData, {
    full_name: '',
    email: '',
    contact: '',
    emergency_contact: '',
    system: '',
    software_id: '',
    industry_id: '',
    highest_education: '',
    university: '',
    resume: '',
    resumeFile: null,
    additionalNotes: ''
  })
  
  experienceYears.value = 0
  
  Object.keys(errors).forEach(key => errors[key] = '')
  
  removeFile()
  
  Swal.fire({
    icon: 'success',
    title: 'Form Cleared',
    text: 'All form fields have been reset',
    confirmButtonColor: '#4f46e5',
    timer: 1500
  })
}

const submitForm = async () => {
  if (!validateForm()) {
    Swal.fire({
      icon: 'warning',
      title: 'Validation Error',
      text: 'Please check the form for errors',
      confirmButtonColor: '#4f46e5'
    })
    return
  }

  if (!formData.resumeFile) {
    Swal.fire({
      icon: 'error',
      title: 'Missing Resume',
      text: 'Please upload a PDF resume',
      confirmButtonColor: '#4f46e5'
    })
    return
  }

  isSubmitting.value = true

  try {
    // Create FormData object for multipart/form-data
    const formDataToSend = new FormData()
    
    // Append all fields
    if (formData.full_name) formDataToSend.append('full_name', formData.full_name)
    if (formData.email) formDataToSend.append('email', formData.email)
    if (formData.contact) formDataToSend.append('contact', formData.contact)
    if (formData.emergency_contact) formDataToSend.append('emergency_contact', formData.emergency_contact)
    if (formData.system) formDataToSend.append('system', formData.system)
    if (formData.highest_education) formDataToSend.append('highest_education', formData.highest_education)
    if (formData.university) formDataToSend.append('university', formData.university)
    if (formData.software_id) formDataToSend.append('software_id', formData.software_id)
    if (formData.industry_id) formDataToSend.append('industry_id', formData.industry_id)
    
    // Append the file - this is crucial
    formDataToSend.append('resume', formData.resumeFile, formData.resumeFile.name)
    
    // Remove the base64 conversion from file handling methods
    // Update handleFileSelect and handleDrop methods:
    
    console.log('Submitting FormData with file:', formData.resumeFile.name)

    // API call with FormData
    const { data } = await api().post('/applied-jobs', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (data.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your resume has been submitted successfully.',
        confirmButtonColor: '#4f46e5',
        showConfirmButton: true,
        timer: 3000
      })
      
      // Reset form after successful submission
      setTimeout(() => {
        resetForm()
      }, 1000)
    } else {
      throw new Error(data.message || 'Failed to submit resume')
    }
  } catch (error) {
    console.error('API Error:', error)
    
    Swal.fire({
      icon: 'error',
      title: 'Submission Failed',
      text: error.response?.data?.message || error.message || 'An error occurred while submitting your resume. Please try again.',
      confirmButtonColor: '#4f46e5'
    })
  } finally {
    isSubmitting.value = false
  }
}


</script>

<style scoped>
.file-upload-area {
  transition: all 0.3s ease;
}

.range::-webkit-slider-thumb {
  height: 20px;
  width: 20px;
}

.range::-moz-range-thumb {
  height: 20px;
  width: 20px;
}

/* Custom select styling */
select {
  min-height: 48px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
  
  .md\:col-span-2 {
    grid-column: span 1;
  }
}
</style>