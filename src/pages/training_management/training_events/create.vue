<template>
  <div class="min-h-screen w-full bg-gradient-to-br from-slate-50 to-gray-100 py-8">
    <div class="w-full px-4 md:px-8">
      <!-- Modern Card Header -->
      <div class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-2xl text-white px-8 py-6 shadow-lg">
        <div class="flex items-center gap-3">
          <div class="p-2 bg-white/20 rounded-xl">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold tracking-tight">Create Training Session</h1>
            <p class="text-purple-100 mt-1">Fill out the form below to create a new training session</p>
          </div>
        </div>
      </div>

      <!-- Form Container -->
      <div class="mt-6 bg-white rounded-2xl shadow-xl overflow-hidden">
        <form @submit.prevent="submitForm" class="p-6 md:p-8">
          <!-- Two Column Layout -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-8">
            
            <!-- 1. Course Analysis -->
            <div class="space-y-2">
              <label class="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <span class="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">1</span>
                Course Analysis <span class="text-red-500">*</span>
              </label>
              <select
                v-model="formData.analysis"
                @change="onAnalysisChange"
                class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 bg-gray-50 hover:bg-white"
                required
              >
                <option value="" disabled>Select Analysis</option>
                <option v-for="analysis in uniqueAnalyses" :key="analysis" :value="analysis">
                  {{ analysis }}
                </option>
              </select>
            </div>

            <!-- 2. Training Course Type -->
            <div class="space-y-2">
              <label class="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <span class="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">2</span>
                Training Course Type <span class="text-red-500">*</span>
              </label>
              <div class="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  @click="selectCourseType('Basic')"
                  :class="['px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200', formData.courseType === 'Basic' ? 'bg-indigo-600 text-white shadow-md scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200']"
                >
                  Basic
                </button>
                <button
                  type="button"
                  @click="selectCourseType('Advanced')"
                  :class="['px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200', formData.courseType === 'Advanced' ? 'bg-purple-600 text-white shadow-md scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200']"
                >
                  Advanced
                </button>
                <button
                  type="button"
                  @click="selectCourseType('Lunch & Learn')"
                  :class="['px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200', formData.courseType === 'Lunch & Learn' ? 'bg-pink-500 text-white shadow-md scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200']"
                >
                  Lunch & Learn
                </button>
              </div>
            </div>

            <!-- 4. Select Course -->
            <div :class="['space-y-2', !showCourseLevel && 'md:col-span-2']">
              <label class="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <span class="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">4</span>
                Select Course <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <select
                  v-model="formData.selectedCourseId"
                  @change="onCourseSelectionChange"
                  class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 bg-gray-50 hover:bg-white"
                  required
                  :disabled="loadingCourses"
                >
                  <option value="" disabled>Select Course</option>
                  <option v-for="course in filteredCourses" :key="course.id" :value="course.id">
                    {{ course.name }} ({{ course.code || course.id }}) - {{ course.duration }}
                  </option>
                </select>
                <div v-if="loadingCourses" class="absolute right-3 top-1/2 -translate-y-1/2">
                  <div class="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
            </div>

            <!-- Course Details Card (Spans both columns) -->
            <div v-if="selectedCourse" class="md:col-span-2">
              <div class="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-xl p-5 border border-indigo-100">
                <h3 class="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Course Details
                </h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div class="bg-white/60 rounded-lg p-2">
                    <p class="text-xs text-gray-500">Software</p>
                    <p class="font-semibold text-gray-800">{{ selectedCourse.software?.name || 'N/A' }}</p>
                  </div>
                  <div class="bg-white/60 rounded-lg p-2">
                    <p class="text-xs text-gray-500">Solution</p>
                    <p class="font-semibold text-gray-800">{{ selectedCourse.solution?.name || 'N/A' }}</p>
                  </div>
                  <div class="bg-white/60 rounded-lg p-2">
                    <p class="text-xs text-gray-500">Duration</p>
                    <p class="font-semibold text-gray-800">{{ selectedCourse.duration || 'N/A' }}</p>
                  </div>
                 
                  <div class="col-span-2 md:col-span-4 bg-white/60 rounded-lg p-2">
                    <p class="text-xs text-gray-500">Description</p>
                    <p class="text-sm text-gray-700">{{ selectedCourse.short_description || 'N/A' }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 5. Select Instructor -->
            <div class="space-y-2">
              <label class="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <span class="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">5</span>
                Instructor/Trainer <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <select
                  v-model="formData.trainerId"
                  class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 bg-gray-50 hover:bg-white"
                  required
                  :disabled="loadingTrainers"
                >
                  <option value="" disabled>Select Instructor</option>
                  <option v-for="trainer in trainers" :key="trainer.user.id" :value="trainer.user.id">
                    👨‍🏫 {{ trainer.user?.name || trainer.name }} - {{ trainer.expertise_area || 'Expert' }}
                  </option>
                </select>
                <div v-if="loadingTrainers" class="absolute right-3 top-1/2 -translate-y-1/2">
                  <div class="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
            </div>

            <!--  Date -->
            <div class="space-y-2">
              <label class="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <span class="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">6</span>
                Date <span class="text-red-500">*</span>
              </label>
              <input
                type="date"
                v-model="formData.startDate"
                @change="onStartDateChange"
                class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 bg-gray-50 hover:bg-white"
                required
                :min="minDate"
              />
            </div>

           
            <!-- 8. Available Seats -->
            <div class="md:col-span-2 space-y-2">
              <label class="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <span class="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">8</span>
                Available Seats <span class="text-red-500">*</span>
              </label>
              <div class="flex items-center gap-4 bg-gray-50 rounded-xl p-1 border-2 border-gray-200">
                <button
                  type="button"
                  @click="decrementSeats"
                  class="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-bold hover:from-red-600 hover:to-rose-600 transition-all transform hover:scale-105 shadow-md"
                >
                  −
                </button>
                <input
                  type="number"
                  v-model="formData.availableSeats"
                  class="flex-1 text-center text-2xl font-bold bg-transparent focus:outline-none"
                  required
                  min="1"
                  max="100"
                />
                <button
                  type="button"
                  @click="incrementSeats"
                  class="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold hover:from-emerald-600 hover:to-teal-600 transition-all transform hover:scale-105 shadow-md"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="mt-10">
            <button
              type="submit"
              class="w-full h-14 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3 text-lg"
              :disabled="loading"
            >
              <svg v-if="loading" class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ loading ? 'Creating Session...' : '✨ Create Training Session ✨' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import Swal from 'sweetalert2'

// Import your API utility - adjust the path as needed
// import { api } from '@/utils/api'

// Form Data
const formData = ref({
  analysis: '',
  courseType: '',
  selectedCourseId: '',
  trainerId: '',
  startDate: '',
  endDate: '',
  availableSeats: 10
})

// State variables
const allCourses = ref([])
const trainers = ref([])
const loading = ref(false)
const loadingCourses = ref(false)
const loadingTrainers = ref(false)

// Computed: Get unique analyses from courses
const uniqueAnalyses = computed(() => {
  const analyses = new Set()
  allCourses.value.forEach(course => {
    if (course.analysis) {
      analyses.add(course.analysis)
    }
  })
  return Array.from(analyses).sort()
})

// Computed: Show course level dropdown (only for Basic/Advanced) - REMOVED since we don't need it
const showCourseLevel = computed(() => {
  return false // Course level is now determined by the course type selection
})

// Computed: Get course type mapping based on selection
const getCourseTypeMapping = computed(() => {
  if (formData.value.courseType === 'Lunch & Learn') {
    return 'online'
  } else if (formData.value.courseType === 'Basic' || formData.value.courseType === 'Advanced') {
    return 'onsite'
  }
  return ''
})

// Computed: Filter courses based on selections
const filteredCourses = computed(() => {
  let filtered = [...allCourses.value]

  // Filter by analysis
  if (formData.value.analysis) {
    filtered = filtered.filter(course => course.analysis === formData.value.analysis)
  }

  // Filter by course type (onsite/online) based on Training Course Type selection
  const targetCourseType = getCourseTypeMapping.value
  if (targetCourseType) {
    filtered = filtered.filter(course => course.type === targetCourseType)
  }

  // Filter by course level for Basic/Advanced selections
  if (formData.value.courseType === 'Basic') {
    filtered = filtered.filter(course => course.level?.toLowerCase() === 'beginner')
  } else if (formData.value.courseType === 'Advanced') {
    filtered = filtered.filter(course => course.level?.toLowerCase() === 'advanced')
  }
  // For 'Lunch & Learn', no level filtering needed

  return filtered
})

// Computed: Get selected course details
const selectedCourse = computed(() => {
  if (!formData.value.selectedCourseId) return null
  return allCourses.value.find(course => course.id === formData.value.selectedCourseId)
})

// Min date for date picker (today)
const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

// Event Handlers
const selectCourseType = (type) => {
  formData.value.courseType = type
  // Clear selected course when type changes
  formData.value.selectedCourseId = ''
}

const onAnalysisChange = () => {
  formData.value.selectedCourseId = ''
}

const onCourseSelectionChange = () => {
  console.log('Selected course:', selectedCourse.value)
}

const onStartDateChange = () => {
  if (formData.value.endDate && formData.value.endDate < formData.value.startDate) {
    formData.value.endDate = ''
  }
}

const incrementSeats = () => {
  if (formData.value.availableSeats < 100) {
    formData.value.availableSeats++
  }
}

const decrementSeats = () => {
  if (formData.value.availableSeats > 1) {
    formData.value.availableSeats--
  }
}

// Fetch training courses from API
const fetchTrainingCourses = async () => {
  loadingCourses.value = true
  try {
    const response = await api().get('/training-course?with=software,solution')
    
    // Handle different response structures
    let courses = []
    if (response.data?.data) {
      courses = response.data.data
    } else if (Array.isArray(response.data)) {
      courses = response.data
    } else if (response.data?.courses) {
      courses = response.data.courses
    } else {
      courses = []
    }
    
    // Filter only active courses (status == 2)
    allCourses.value = courses.filter(course => course.status == 2 || course.status === '2')
    
    console.log('Fetched courses:', allCourses.value)
  } catch (error) {
    console.error('Error fetching training courses:', error)
    Swal.fire({
      title: 'Error!',
      text: error.response?.data?.message || 'Failed to load training courses',
      icon: 'error'
    })
  } finally {
    loadingCourses.value = false
  }
}

// Fetch trainers from API
const fetchTrainers = async () => {
  loadingTrainers.value = true
  try {
    const response = await api().get('/trainer?with=user')
    
    // Handle different response structures
    let trainersList = []
    if (response.data?.data) {
      trainersList = response.data.data
    } else if (Array.isArray(response.data)) {
      trainersList = response.data
    } else if (response.data?.trainers) {
      trainersList = response.data.trainers
    } else {
      trainersList = []
    }
    
    trainers.value = trainersList
    console.log('Fetched trainers:', trainers.value)
  } catch (error) {
    console.error('Error fetching trainers:', error)
    Swal.fire({
      title: 'Error!',
      text: error.response?.data?.message || 'Failed to load trainers',
      icon: 'error'
    })
  } finally {
    loadingTrainers.value = false
  }
}

// Submit form
const submitForm = async () => {
  // Validation
  if (!formData.value.analysis) {
    Swal.fire({ title: 'Error!', text: 'Please select course analysis', icon: 'error' })
    return
  }
  if (!formData.value.courseType) {
    Swal.fire({ title: 'Error!', text: 'Please select course type', icon: 'error' })
    return
  }
  if (!formData.value.selectedCourseId) {
    Swal.fire({ title: 'Error!', text: 'Please select a course', icon: 'error' })
    return
  }
  if (!formData.value.trainerId) {
    Swal.fire({ title: 'Error!', text: 'Please select instructor', icon: 'error' })
    return
  }
  if (!formData.value.startDate) {
    Swal.fire({ title: 'Error!', text: 'Please select  date', icon: 'error' })
    return
  }


  if (!formData.value.availableSeats || formData.value.availableSeats < 1) {
    Swal.fire({ title: 'Error!', text: 'Please enter valid number of seats', icon: 'error' })
    return
  }

  loading.value = true

  // Get selected course details
  const selectedCourseData = selectedCourse.value
  
  // Prepare request body
  const requestBody = {
    training_course_id: formData.value.selectedCourseId,
    trainer_id: formData.value.trainerId,
    date: formData.value.startDate,
    available_seats: formData.value.availableSeats,
  }

  try {
    const response = await api().post('/admin/training-course-schedules', requestBody)
    
    Swal.fire({
      title: 'Success!',
      text: 'Training session created successfully',
      icon: 'success',
      confirmButtonColor: '#6366f1'
    })
    
    // Reset form after successful submission
    formData.value = {
      analysis: '',
      courseType: '',
      selectedCourseId: '',
      trainerId: '',
      startDate: '',
      endDate: '',
      availableSeats: 10
    }
  } catch (error) {
    console.error('Error creating training session:', error)
    Swal.fire({
      title: 'Error!',
      text: error.response?.data?.message || 'Failed to create training session',
      icon: 'error'
    })
  } finally {
    loading.value = false
  }
}

// Fetch all data on component mount
onMounted(() => {
  fetchTrainingCourses()
  fetchTrainers()
})
</script>

<style scoped>
/* Hide number input arrows */
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
}
</style>