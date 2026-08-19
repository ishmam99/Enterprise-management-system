<template>
  <div class="px-10 bg-white py-5 w-3/4 mx-auto">
    <div class="bg-teal-700 rounded-t-2xl text-white px-6 py-4">
      <h1 class="text-2xl font-semibold">Create Offerp</h1>
      <p class="text-gray-300">Fill out the form below to create a new event</p>
    </div>

    <hr />
    <div class="bg-white rounded-xl p-5 w-full shadow-md mt-5">
      <form @submit.prevent="createTraining">
        <div class="py-5 space-y-7 mt-5">
          <!-- Event Type and Platform Fields -->
          <div class="flex items-center justify-center gap-5">
            <div class="relative mb-3 w-1/2">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                C1. Select Event <span class="text-red-500">*</span>
              </label>
              <select
                v-model="training.event_type"
                class="select select-bordered w-full rounded-xl border-2 px-3 py-1 leading-[1.6] outline transition-all duration-200 ease-linear focus:border-teal-500"
                required
              >
                <option value="" disabled>Select Event Type</option>
                <option value="company">To a Company</option>
                <option value="group">To a Group</option>
                <option value="individual">To a Individual</option>
              </select>
            </div>
            <div class="relative mb-3 w-1/2">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                C2. Training Platform <span class="text-red-500">*</span>
              </label>
              <select
                v-model="training.training_platform"
                class="select select-bordered w-full rounded-xl border-2 px-3 py-1 leading-[1.6] outline transition-all duration-200 ease-linear focus:border-teal-500"
                required
              >
                <option value="" disabled>Select Platform</option>
                <option value="online">Online</option>
                <option value="onsite">Onsite</option>
                <option value="seminar">Seminar</option>
                <option value="conference">Conference</option>
              </select>
            </div>
          </div>

          <!-- Industry and Solution Fields -->
          <div class="flex items-center justify-center gap-5">
            <div class="relative mb-3 w-1/2">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                C3. Industry <span class="text-red-500">*</span>
              </label>
              <select
                v-model="training.industry_id"
                class="select select-bordered w-full rounded-xl border-2 px-3 py-3 leading-[1.6] outline transition-all duration-200 ease-linear focus:border-teal-500"
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

            <div class="relative mb-3 w-1/2">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                C4. Solution <span class="text-red-500">*</span>
              </label>
              <select
                v-model="training.solution_id"
                class="select select-bordered w-full rounded-xl border-2 px-3 py-3 leading-[1.6] outline transition-all duration-200 ease-linear focus:border-teal-500"
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

          <!-- Software and Training Fields -->
          <div class="flex items-center justify-center gap-5">
            <div class="relative mb-3 w-1/2">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                C5. Software <span class="text-red-500">*</span>
              </label>
              <select
                v-model="training.software_id"
                class="select select-bordered w-full rounded-xl border-2 px-3 py-3 leading-[1.6] outline transition-all duration-200 ease-linear focus:border-teal-500"
                required
                :disabled="loadingSoftwareSkills"
              >
                <option value="" disabled>Select Software</option>
                <option v-for="software in softwareSkills" :key="software.id" :value="software.id">
                  {{ software.name }}
                </option>
              </select>
              <div v-if="loadingSoftwareSkills" class="absolute right-3 top-10">
                <span class="loading loading-spinner loading-xs"></span>
              </div>
            </div>

            <div class="relative mb-3 w-1/2">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                C6. Training <span class="text-red-500">*</span>
              </label>
              <select
                v-model="training.training_id"
                class="select select-bordered w-full rounded-xl border-2 px-3 py-3 leading-[1.6] outline transition-all duration-200 ease-linear focus:border-teal-500"
                required
                :disabled="loadingTrainings"
              >
                <option value="" disabled>Select Training</option>
                <option v-for="trainingItem in trainings" :key="trainingItem.id" :value="trainingItem.id">
                  {{ trainingItem.title }}
                </option>
              </select>
              <div v-if="loadingTrainings" class="absolute right-3 top-10">
                <span class="loading loading-spinner loading-xs"></span>
              </div>
            </div>
          </div>

          <!-- Date and Location Fields -->
          <div class="flex items-center justify-center gap-5">
            <div class="relative mb-3 w-1/2">
              <input
                type="date"
                class="peer block min-h-[auto] w-full rounded-xl border-2 px-3 py-[0.32rem] leading-[1.6] outline transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary placeholder:opacity-100 motion-reduce:transition-none"
                v-model="training.start_date"
                required
              />
              <label
                class="absolute left-3 top-[-4px] mb-0 font-semibold z-10 text-xl px-2 origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-gray-900 transition-all duration-200 ease-out bg-white peer-focus:text-primary -translate-y-[0.9rem] scale-[0.8] motion-reduce:transition-none dark:peer-focus:text-primary"
                >C7. Start Date <span class="text-red-500">*</span>
              </label>
            </div>

            <div class="relative mb-3 w-1/2">
              <input
                type="date"
                class="peer block min-h-[auto] w-full rounded-xl border-2 px-3 py-[0.32rem] leading-[1.6] outline transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary placeholder:opacity-100 motion-reduce:transition-none"
                v-model="training.end_date"
                required
              />
              <label
                class="absolute left-3 top-[-4px] mb-0 font-semibold z-10 text-xl px-2 origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-gray-900 transition-all duration-200 ease-out bg-white peer-focus:text-primary -translate-y-[0.9rem] scale-[0.8] motion-reduce:transition-none dark:peer-focus:text-primary"
                >C8. End Date <span class="text-red-500">*</span>
              </label>
            </div>

            <div class="relative mb-3 w-full">
              <input
                type="text"
                class="peer block min-h-[auto] w-full rounded-xl border-2 px-3 py-[0.32rem] leading-[1.6] outline transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary placeholder:opacity-100 motion-reduce:transition-none"
                v-model="training.event_location"
                placeholder="Enter event location"
                required
              />
              <label
                class="absolute left-3 top-[-4px] mb-0 font-semibold z-10 text-xl px-2 origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-gray-900 transition-all duration-200 ease-out bg-white peer-focus:text-primary -translate-y-[0.9rem] scale-[0.8] motion-reduce:transition-none dark:peer-focus:text-primary"
                >C9. Event Location
              </label>
            </div>
          </div>

          <button
            type="submit"
            class="w-full h-12 bg-teal-800 text-white font-bold rounded-2xl hover:bg-teal-700 transition flex items-center justify-center gap-2"
            :disabled="loading"
          >
            <span v-if="loading" class="loading loading-spinner loading-sm"></span>
            <span>{{ loading ? 'Creating...' : 'Create Offer' }}</span>
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
  event_type: '',
  training_platform: '',
  industry_id: '',
  solution_id: '',
  software_id: '',
  training_id: '',
  start_date: '',
  end_date: '',
  event_location: ''
})

const industries = ref([])
const solutions = ref([])
const softwareSkills = ref([])
const trainings = ref([])

const loading = ref(false)
const loadingIndustries = ref(false)
const loadingSolutions = ref(false)
const loadingSoftwareSkills = ref(false)
const loadingTrainings = ref(false)

// Fetch industries
const fetchIndustries = async () => {
  loadingIndustries.value = true
  try {
    const response = await api().get('industries', {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })
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
    const response = await api().get('solutions', {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })
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

// Fetch software skills
const fetchSoftwareSkills = async () => {
  loadingSoftwareSkills.value = true
  try {
    const response = await api().get('software-skills', {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })
    softwareSkills.value = response.data.data || response.data
  } catch (error) {
    console.error('Error fetching software skills:', error)
    toast({
      title: 'Error',
      description: 'Failed to load software skills',
      variant: 'destructive'
    })
  } finally {
    loadingSoftwareSkills.value = false
  }
}

// Fetch trainings
const fetchTrainings = async () => {
  loadingTrainings.value = true
  try {
    const response = await api().get('trainings', {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })
    trainings.value = response.data.data || response.data
  } catch (error) {
    console.error('Error fetching trainings:', error)
    toast({
      title: 'Error',
      description: 'Failed to load trainings',
      variant: 'destructive'
    })
  } finally {
    loadingTrainings.value = false
  }
}

const createTraining = async () => {
  // Validation
  if (!training.event_type) {
    toast({
      title: 'Error',
      description: 'Please select event type',
      variant: 'destructive'
    })
    return
  }

  if (!training.training_platform) {
    toast({
      title: 'Error',
      description: 'Please select training platform',
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

  if (!training.training_id) {
    toast({
      title: 'Error',
      description: 'Please select training',
      variant: 'destructive'
    })
    return
  }

  if (!training.start_date) {
    toast({
      title: 'Error',
      description: 'Please select start date',
      variant: 'destructive'
    })
    return
  }

  if (!training.end_date) {
    toast({
      title: 'Error',
      description: 'Please select end date',
      variant: 'destructive'
    })
    return
  }

  if (!training.event_location?.trim()) {
    toast({
      title: 'Error',
      description: 'Please enter event location',
      variant: 'destructive'
    })
    return
  }

  // Date validation
  const startDate = new Date(training.start_date)
  const endDate = new Date(training.end_date)

  if (endDate < startDate) {
    toast({
      title: 'Error',
      description: 'End date cannot be before start date',
      variant: 'destructive'
    })
    return
  }

  loading.value = true

  try {
    const data = await api().post('training-offer', {
      event_type: training.event_type,
      training_platform: training.training_platform,
      industry_id: training.industry_id,
      solution_id: training.solution_id,
      software_id: training.software_id,
      training_id: training.training_id,
      start_date: training.start_date,
      end_date: training.end_date,
      event_location: training.event_location.trim()
    }, {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })

    Swal.fire({
      title: 'Success!',
      text: 'Offer Created Successfully',
      icon: 'success'
    })

    // Reset form
    training.event_type = ''
    training.training_platform = ''
    training.industry_id = ''
    training.solution_id = ''
    training.software_id = ''
    training.training_id = ''
    training.start_date = ''
    training.end_date = ''
    training.event_location = ''
  } catch (error) {
    console.error(error)
    Swal.fire({
      title: 'Error!',
      text: error.response?.data?.message || 'Failed to create offer. Please try again.',
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
  fetchSoftwareSkills()
  fetchTrainings()
})
</script>
