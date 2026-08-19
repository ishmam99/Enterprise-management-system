<template>
  <div class="px-2 bg-white py-5 w-3/4 mx-auto">
    <div class="bg-teal-700 rounded-t-2xl text-white px-6 py-4">
      <h1 class="text-2xl font-semibold">Create Training Courses</h1>
      <p class="text-gray-300">Fill out the form below to create a new training course</p>
    </div>

    <hr />
    <div class="bg-white rounded-xl p-5 w-full shadow-md mt-5">
      <form @submit.prevent="createTraining">
        <div class="flex items-center justify-center gap-5">
          <!-- Industry Field -->
          <div class="relative mb-3 w-1/2">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              A1. Industry <span class="text-red-500">*</span>
            </label>
            <select
              v-model="training.industry_id"
              @change="generateCourseDetails"
              class="select select-bordered w-full rounded-xl border-2 px-3 py-1 leading-[1.6] outline transition-all duration-200 ease-linear focus:border-teal-500"
              required
              :disabled="loadingIndustries"
            >
              <option value="" disabled>Select Industry</option>
              <option v-for="industry in industries" :key="industry.id" :value="industry.id">
                {{ industry.name }}
              </option>
            </select>
            <div v-if="loadingIndustries" class="absolute right-3 top-10">
              <span class="loading loading-spinner loading-xs"></span>
            </div>
          </div>

          <!-- Solution Field -->
          <div class="relative mb-3 w-1/2">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              A2. Solution <span class="text-red-500">*</span>
            </label>
            <select
              v-model="training.solution_id"
              @change="generateCourseDetails"
              class="select select-bordered w-full rounded-xl border-2 px-3 py-1 leading-[1.6] outline transition-all duration-200 ease-linear focus:border-teal-500"
              required
              :disabled="loadingSolutions"
            >
              <option value="" disabled>Select Solution</option>
              <option v-for="solution in solutions" :key="solution.id" :value="solution.id">
                {{ solution.name }}
              </option>
            </select>
            <div v-if="loadingSolutions" class="absolute right-3 top-10">
              <span class="loading loading-spinner loading-xs"></span>
            </div>
          </div>

          <!-- Software Field -->
          <div class="relative mb-3 w-1/2">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              A3. Software <span class="text-red-500">*</span>
            </label>
            <select
              v-model="training.software_id"
              @change="generateCourseDetails"
              class="select select-bordered w-full rounded-xl border-2 px-3 py-1 leading-[1.6] outline transition-all duration-200 ease-linear focus:border-teal-500"
              required
              :disabled="loadingSoftwares"
            >
              <option value="" disabled>Select Software</option>
              <option v-for="software in softwares" :key="software.id" :value="software.id">
                {{ software.name }}
              </option>
            </select>
            <div v-if="loadingSoftwares" class="absolute right-3 top-10">
              <span class="loading loading-spinner loading-xs"></span>
            </div>
          </div>
        </div>

        <!-- Training Level Field -->
        <div class="flex items-center justify-center gap-5">
          <div class="relative mb-3 w-1/2">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              A4. Training Level <span class="text-red-500">*</span>
            </label>
            <select
              v-model="training.training_level"
              @change="generateCourseDetails"
              class="select select-bordered w-full rounded-xl border-2 px-3 py-1 leading-[1.6] outline transition-all duration-200 ease-linear focus:border-teal-500"
              required
            >
              <option value="" disabled>Select Training Level</option>
              <option value="basic">Basic</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          
          <!-- Course Duration Field -->
          <div class="relative mb-3 w-1/2">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              A5. Course Duration <span class="text-red-500">*</span>
            </label>
            <select
              v-model="training.duration"
              @change="handleDurationChange"
              class="select select-bordered w-full rounded-xl border-2 px-3 py-1 leading-[1.6] outline transition-all duration-200 ease-linear focus:border-teal-500"
              required
            >
              <option value="" disabled>Select Duration</option>
              <option value="half_day">Half Day</option>
              <option value="1_day">1 Day</option>
              <option value="2_days">2 Days</option>
              <option value="3_days">3 Days</option>
              <option value="custom">Custom</option>
            </select>
          </div>
        </div>

        <!-- Custom Duration Input -->
        <div v-if="showCustomDuration" class="flex items-center justify-center gap-5">
          <div class="relative mb-3 w-1/2">
            <input
              type="text"
              v-model="training.custom_duration"
              @input="validateCustomDuration"
              class="peer block min-h-[auto] w-full rounded-xl border-2 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary placeholder:opacity-100 motion-reduce:transition-none"
              placeholder="Enter custom duration (e.g., 5 days, 2 weeks, 1 month)"
              required
            />
            <label
              class="absolute left-3 top-[-4px] mb-0 font-semibold z-10 text-xl px-2 origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-gray-900 transition-all duration-200 ease-out bg-white peer-focus:text-primary -translate-y-[0.9rem] scale-[0.8] motion-reduce:transition-none"
            >
              Custom Duration <span class="text-red-500">*</span>
            </label>
            <div v-if="customDurationError" class="text-red-500 text-xs mt-1 ml-1">
              {{ customDurationError }}
            </div>
          </div>
          <div class="w-1/2"></div> <!-- Spacer for alignment -->
        </div>

        <div class="py-5 space-y-7 mt-5">
          <!-- Title Field -->
          <div class="flex items-center justify-center gap-5">
            <div class="relative mb-3 w-full">
              <input
                type="text"
                class="peer block min-h-[auto] w-full rounded-xl border-2 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary placeholder:opacity-100 motion-reduce:transition-none bg-gray-50"
                v-model="training.title"
                readonly
                required
              />
              <label
                class="absolute left-3 top-[-4px] mb-0 font-semibold z-10 text-xl px-2 origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-gray-900 transition-all duration-200 ease-out bg-white peer-focus:text-primary -translate-y-[0.9rem] scale-[0.8] motion-reduce:transition-none dark:peer-focus:text-primary"
                >A6. Course Title <span class="text-gray-500">(Auto Generated)</span>
              </label>
            </div>
            <div class="relative mb-3 w-full">
              <input
                type="text"
                class="peer block min-h-[auto] w-full rounded-xl border-2 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary placeholder:opacity-100 motion-reduce:transition-none bg-gray-50"
                v-model="training.course_id"
                readonly
                required
              />
              <label
                class="absolute left-3 top-[-4px] mb-0 font-semibold z-10 text-xl px-2 origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-gray-900 transition-all duration-200 ease-out bg-white peer-focus:text-primary -translate-y-[0.9rem] scale-[0.8] motion-reduce:transition-none dark:peer-focus:text-primary"
                >A7. Course ID <span class="text-gray-500">(Auto Generated)</span>
              </label>
            </div>
          </div>

          <!-- Description Field -->
          <div class="flex items-center justify-center gap-5">
            <div class="relative mb-3 w-full">
              <textarea
                class="peer block min-h-[100px] w-full rounded-xl border-2 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary placeholder:opacity-100 motion-reduce:transition-none resize-none"
                v-model="training.description"
                required
                placeholder="Enter course description"
              ></textarea>
              <label
                class="absolute left-3 top-[-4px] mb-0 font-semibold z-10 text-xl px-2 origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-gray-900 transition-all duration-200 ease-out bg-white peer-focus:text-primary -translate-y-[0.9rem] scale-[0.8] motion-reduce:transition-none dark:peer-focus:text-primary"
                >A8. Description <span class="text-red-500">*</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            class="w-full h-12 bg-teal-800 text-white font-bold rounded-2xl hover:bg-teal-700 transition flex items-center justify-center gap-2"
            :disabled="loading"
          >
            <span v-if="loading" class="loading loading-spinner loading-sm"></span>
            <span>{{ loading ? 'Creating...' : 'Create Training Course' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useToast } from '@/components/ui/toast/use-toast'
import { useAuthStore } from '@/stores/AuthStore'
import { ref, onMounted, reactive } from 'vue'
import Swal from 'sweetalert2'
import api from '@/config/api'

const authStore = useAuthStore()
const { toast } = useToast()

const training = reactive({
  title: '',
  description: '',
  industry_id: '',
  solution_id: '',
  solution_name: '',
  software_id: '',
  software_name: '',
  training_level: '',
  duration: '',
  custom_duration: '',
  course_id: ''
})

const industries = ref([])
const solutions = ref([])
const softwares = ref([])

const loading = ref(false)
const loadingIndustries = ref(false)
const loadingSolutions = ref(false)
const loadingSoftwares = ref(false)
const showCustomDuration = ref(false)
const customDurationError = ref('')

// Handle duration selection change
const handleDurationChange = () => {
  if (training.duration === 'custom') {
    showCustomDuration.value = true
    training.custom_duration = ''
  } else {
    showCustomDuration.value = false
    training.custom_duration = ''
    customDurationError.value = ''
  }
}

// Validate custom duration input
const validateCustomDuration = () => {
  if (!training.custom_duration.trim()) {
    customDurationError.value = 'Custom duration is required'
    return false
  }
  
  if (training.custom_duration.length < 2) {
    customDurationError.value = 'Duration should be at least 2 characters'
    return false
  }
  
  if (training.custom_duration.length > 50) {
    customDurationError.value = 'Duration should not exceed 50 characters'
    return false
  }
  
  // Check for valid duration format (letters, numbers, spaces, and common time units)
  const validPattern = /^[a-zA-Z0-9\s\-_]+$/
  if (!validPattern.test(training.custom_duration)) {
    customDurationError.value = 'Duration contains invalid characters'
    return false
  }
  
  customDurationError.value = ''
  return true
}

// Helper function to get industry abbreviation
const getIndustryAbbreviation = (industryName) => {
  if (!industryName) return ''
  
  // Remove special characters and split into words
  const words = industryName.replace(/[&]/g, 'and').split(/[\s]+/)
  
  if (words.length === 1) {
    // Single word - take first 2 letters
    return words[0].substring(0, 2).toUpperCase()
  } else {
    // Multiple words - take first letter of first two words
    return words.slice(0, 2).map(word => word[0].toUpperCase()).join('')
  }
}

// Helper function to get solution abbreviation
const getSolutionAbbreviation = (solutionName) => {
  if (!solutionName) return ''
  
  const words = solutionName.split(/[\s]+/)
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase()
  } else {
    return words.map(word => word[0].toUpperCase()).join('')
  }
}

// Helper function to get software abbreviation
const getSoftwareAbbreviation = (softwareName) => {
  if (!softwareName) return ''
  
  // For software, take first 3 letters and make uppercase
  return softwareName.substring(0, 3).toUpperCase()
}

// Helper function to get level code
const getLevelCode = (trainingLevel) => {
  switch(trainingLevel) {
    case 'basic': return '101'
    case 'intermediate': return '201'
    case 'advanced': return '301'
    default: return '101'
  }
}

// Generate course title and ID
const generateCourseDetails = () => {
  const industry = industries.value.find(ind => ind.id === training.industry_id)
  const solution = solutions.value.find(sol => sol.id === training.solution_id)
  const software = softwares.value.find(soft => soft.id === training.software_id)

  if (industry && solution && software && training.training_level) {
    // Store solution and software names for API submission
    training.solution_name = solution.name
    training.software_name = software.name

    // Generate Course Title
    training.title = `${getIndustryAbbreviation(industry.name)}_${solution.name}_${software.name}_${training.training_level.charAt(0).toUpperCase() + training.training_level.slice(1)}`

    // Generate Course ID
    const industryAbbr = getIndustryAbbreviation(industry.name)
    const solutionAbbr = getSolutionAbbreviation(solution.name).replace(/\s/g, '')
    const softwareAbbr = getSoftwareAbbreviation(software.name)
    const levelCode = getLevelCode(training.training_level)
    
    training.course_id = `${industryAbbr}-${solutionAbbr}-${softwareAbbr}-${levelCode}`
  } else {
    // Clear if any required field is missing
    if (!industry || !solution || !software || !training.training_level) {
      training.title = ''
      training.course_id = ''
      training.solution_name = ''
      training.software_name = ''
    }
  }
}

// Fetch industries
const fetchIndustries = async () => {
  loadingIndustries.value = true
  try {
    const response = await api().get('industries')
    industries.value = response.data.data || response.data
  } catch (error) {
    console.error('Error fetching industries:', error)
    toast({
      title: 'Error',
      description: 'Failed to load industries',
      variant: 'destructive'
    })
  } finally {
    loadingIndustries.value = false
  }
}

// Fetch solutions
const fetchSolutions = async () => {
  loadingSolutions.value = true
  try {
    const response = await api().get('solutions')
    solutions.value = response.data.data || response.data
  } catch (error) {
    console.error('Error fetching solutions:', error)
    toast({
      title: 'Error',
      description: 'Failed to load solutions',
      variant: 'destructive'
    })
  } finally {
    loadingSolutions.value = false
  }
}

// Fetch softwares
const fetchSoftwares = async () => {
  loadingSoftwares.value = true
  try {
    const response = await api().get('softwares')
    softwares.value = response.data.data || response.data
  } catch (error) {
    console.error('Error fetching softwares:', error)
    toast({
      title: 'Error',
      description: 'Failed to load softwares',
      variant: 'destructive'
    })
  } finally {
    loadingSoftwares.value = false
  }
}

const createTraining = async () => {
  // Validation
  if (!training.title.trim()) {
    toast({
      title: 'Error',
      description: 'Please enter training title',
      variant: 'destructive'
    })
    return
  }

  if (!training.description.trim()) {
    toast({
      title: 'Error',
      description: 'Please enter training description',
      variant: 'destructive'
    })
    return
  }

  if (!training.industry_id) {
    toast({
      title: 'Error',
      description: 'Please select industry',
      variant: 'destructive'
    })
    return
  }

  if (!training.solution_id) {
    toast({
      title: 'Error',
      description: 'Please select solution',
      variant: 'destructive'
    })
    return
  }

  if (!training.software_id) {
    toast({
      title: 'Error',
      description: 'Please select software',
      variant: 'destructive'
    })
    return
  }

  if (!training.training_level) {
    toast({
      title: 'Error',
      description: 'Please select training level',
      variant: 'destructive'
    })
    return
  }

  if (!training.duration) {
    toast({
      title: 'Error',
      description: 'Please select course duration',
      variant: 'destructive'
    })
    return
  }

  // Custom duration validation
  if (training.duration === 'custom') {
    if (!training.custom_duration.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter custom duration',
        variant: 'destructive'
      })
      return
    }
    
    if (!validateCustomDuration()) {
      toast({
        title: 'Error',
        description: 'Please fix custom duration errors',
        variant: 'destructive'
      })
      return
    }
  }

  loading.value = true

  try {
    // Prepare duration value - use custom duration if selected
    const finalDuration = training.duration === 'custom' ? training.custom_duration : training.duration

    const response = await api().post('training-course', {
      industry_id: training.industry_id,
      solution_id: training.solution_id,
      solution_name: training.solution_name,
      software_id: training.software_id,
      software_name: training.software_name,
      training_level: training.training_level,
      duration: finalDuration,
      title: training.title.trim(),
      course_id: training.course_id,
      description: training.description.trim()
    })

    Swal.fire({
      title: 'Success!',
      text: 'Training Course Created Successfully',
      icon: 'success'
    })

    // Reset form
    training.title = ''
    training.description = ''
    training.industry_id = ''
    training.solution_id = ''
    training.solution_name = ''
    training.software_id = ''
    training.software_name = ''
    training.training_level = ''
    training.duration = ''
    training.custom_duration = ''
    training.course_id = ''
    showCustomDuration.value = false
    customDurationError.value = ''
    
  } catch (error) {
    console.error('Error creating training course:', error)
    Swal.fire({
      title: 'Error!',
      text: error.response?.data?.message || 'Failed to create training course. Please try again.',
      icon: 'error'
    })
  } finally {
    loading.value = false
  }
}

// Fetch all data on component mount
onMounted(() => {
  fetchIndustries()
  fetchSolutions()
  fetchSoftwares()
})
</script>