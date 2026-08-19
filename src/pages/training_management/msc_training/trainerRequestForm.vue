<template>
  <div class="px-2 bg-white py-5 w-3/4 mx-auto">
    <div class="bg-teal-700 rounded-t-2xl text-white px-6 py-4">
      <h1 class="text-2xl font-semibold">Trainer Request</h1>
      <p class="text-gray-300">Fill out the form below to submit a trainer request</p>
    </div>

    <hr />
    <div class="bg-white rounded-xl p-5 w-full shadow-md mt-5">
      <form @submit.prevent="submitTrainerRequest">
        <!-- Email Field -->
        <div class="flex items-center justify-center gap-5">
          <div class="relative mb-3 w-full">
            <input
              type="email"
              v-model="trainerRequest.email"
              class="peer block min-h-[auto] w-full rounded-xl border-2 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary placeholder:opacity-100 motion-reduce:transition-none"
              placeholder="Enter your email address"
              required
            />
            <label
              class="absolute left-3 top-[-4px] mb-0 font-semibold z-10 text-xl px-2 origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-gray-900 transition-all duration-200 ease-out bg-white peer-focus:text-primary -translate-y-[0.9rem] scale-[0.8] motion-reduce:transition-none"
            >
              Email Address <span class="text-red-500">*</span>
            </label>
          </div>
        </div>

        <div class="flex items-center justify-center gap-5 mt-6">
          <!-- Industry Field -->
          <div class="relative mb-3 w-1/2">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Industry <span class="text-red-500">*</span>
            </label>
            <select
              v-model="trainerRequest.industry_id"
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
              Solution <span class="text-red-500">*</span>
            </label>
            <select
              v-model="trainerRequest.solution_id"
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
        </div>

        <div class="flex items-center justify-center gap-5">
          <!-- Software Field -->
          <div class="relative mb-3 w-1/2">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Software <span class="text-red-500">*</span>
            </label>
            <select
              v-model="trainerRequest.software_id"
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

          <!-- Years of Experience Field -->
          <div class="relative mb-3 w-1/2">
            <input
              type="number"
              v-model="trainerRequest.years_of_experience"
              min="0"
              max="50"
              class="peer block min-h-[auto] w-full rounded-xl border-2 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary placeholder:opacity-100 motion-reduce:transition-none"
              placeholder="Enter years of experience"
              required
            />
            <label
              class="absolute left-3 top-[-4px] mb-0 font-semibold z-10 text-xl px-2 origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-gray-900 transition-all duration-200 ease-out bg-white peer-focus:text-primary -translate-y-[0.9rem] scale-[0.8] motion-reduce:transition-none"
            >
              Years of Experience <span class="text-red-500">*</span>
            </label>
          </div>
        </div>

        <!-- Experience Description Field -->
        <div class="flex items-center justify-center gap-5 mt-6">
          <div class="relative mb-3 w-full">
            <textarea
              class="peer block min-h-[150px] w-full rounded-xl border-2 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary placeholder:opacity-100 motion-reduce:transition-none resize-none"
              v-model="trainerRequest.experience_description"
              required
              placeholder="Describe your experience with the selected industry, solution, and software..."
              maxlength="1000"
            ></textarea>
            <label
              class="absolute left-3 top-[-4px] mb-0 font-semibold z-10 text-xl px-2 origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-gray-900 transition-all duration-200 ease-out bg-white peer-focus:text-primary -translate-y-[0.9rem] scale-[0.8] motion-reduce:transition-none"
            >
              Experience Description <span class="text-red-500">*</span>
            </label>
            <div class="text-right text-sm text-gray-500 mt-1">
              {{ trainerRequest.experience_description?.length || 0 }}/1000 characters
            </div>
          </div>
        </div>

        <button
          type="submit"
          class="w-full h-12 bg-teal-800 text-white font-bold rounded-2xl hover:bg-teal-700 transition flex items-center justify-center gap-2 mt-6"
          :disabled="loading"
        >
          <span v-if="loading" class="loading loading-spinner loading-sm"></span>
          <span>{{ loading ? 'Submitting...' : 'Submit Trainer Request' }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useToast } from '@/components/ui/toast/use-toast'
import { ref, onMounted, reactive } from 'vue'
import Swal from 'sweetalert2'
import api from '@/config/api'

const { toast } = useToast()

const trainerRequest = reactive({
  email: '',
  industry_id: '',
  solution_id: '',
  software_id: '',
  years_of_experience: '',
  experience_description: ''
})

const industries = ref([])
const solutions = ref([])
const softwares = ref([])

const loading = ref(false)
const loadingIndustries = ref(false)
const loadingSolutions = ref(false)
const loadingSoftwares = ref(false)

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

const submitTrainerRequest = async () => {
  // Validation
  if (!trainerRequest.email.trim()) {
    toast({
      title: 'Error',
      description: 'Please enter your email address',
      variant: 'destructive'
    })
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(trainerRequest.email)) {
    toast({
      title: 'Error',
      description: 'Please enter a valid email address',
      variant: 'destructive'
    })
    return
  }

  if (!trainerRequest.industry_id) {
    toast({
      title: 'Error',
      description: 'Please select industry',
      variant: 'destructive'
    })
    return
  }

  if (!trainerRequest.solution_id) {
    toast({
      title: 'Error',
      description: 'Please select solution',
      variant: 'destructive'
    })
    return
  }

  if (!trainerRequest.software_id) {
    toast({
      title: 'Error',
      description: 'Please select software',
      variant: 'destructive'
    })
    return
  }

  if (!trainerRequest.years_of_experience) {
    toast({
      title: 'Error',
      description: 'Please enter years of experience',
      variant: 'destructive'
    })
    return
  }

  // Validate years of experience
  const years = parseInt(trainerRequest.years_of_experience)
  if (isNaN(years) || years < 0 || years > 50) {
    toast({
      title: 'Error',
      description: 'Years of experience must be between 0 and 50',
      variant: 'destructive'
    })
    return
  }

  if (!trainerRequest.experience_description.trim()) {
    toast({
      title: 'Error',
      description: 'Please enter experience description',
      variant: 'destructive'
    })
    return
  }

  if (trainerRequest.experience_description.length < 50) {
    toast({
      title: 'Error',
      description: 'Experience description should be at least 50 characters',
      variant: 'destructive'
    })
    return
  }

  loading.value = true

  try {
    // Get industry, solution, and software names
    const industry = industries.value.find(ind => ind.id === trainerRequest.industry_id)
    const solution = solutions.value.find(sol => sol.id === trainerRequest.solution_id)
    const software = softwares.value.find(soft => soft.id === trainerRequest.software_id)

    const response = await api().post('trainer-request', {
      email: trainerRequest.email.trim(),
      industry_id: trainerRequest.industry_id,
      industry_name: industry?.name || '',
      solution_id: trainerRequest.solution_id,
      solution_name: solution?.name || '',
      software_id: trainerRequest.software_id,
      software_name: software?.name || '',
      years_of_experience: years,
      experience_description: trainerRequest.experience_description.trim()
    })

    Swal.fire({
      title: 'Success!',
      text: 'Trainer request submitted successfully',
      icon: 'success'
    })

    // Reset form
    trainerRequest.email = ''
    trainerRequest.industry_id = ''
    trainerRequest.solution_id = ''
    trainerRequest.software_id = ''
    trainerRequest.years_of_experience = ''
    trainerRequest.experience_description = ''
    
  } catch (error) {
    console.error('Error submitting trainer request:', error)
    Swal.fire({
      title: 'Error!',
      text: error.response?.data?.message || 'Failed to submit trainer request. Please try again.',
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