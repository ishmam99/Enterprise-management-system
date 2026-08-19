<template>
  <div class="px-2 bg-white py-5 w-3/4 mx-auto">
    <div class="bg-teal-700 rounded-t-2xl text-white px-6 py-4">
      <h1 class="text-2xl font-semibold">Create Offer</h1>
      <p class="text-gray-300">Fill out the form below to create a new event</p>
    </div>

    <hr />
    <div class="bg-white rounded-xl p-5 w-full shadow-md mt-5">
      <form @submit.prevent="createTraining">
        <div class="py-5 space-y-7 mt-5">
          <!-- Event Selection Field -->
          <div class="flex items-center justify-center gap-5">
            <div class="relative mb-3 w-full">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                C1. Select Event <span class="text-red-500">*</span>
              </label>
              <select
                v-model="training.training_event_id"

                class="select  w-full outline rounded-xl  px-3 py-1  leading-[1.6]  transition-all duration-200 ease-linear focus:border-teal-500"
                required   :disabled="loadingEvents"
                  @change="onEventChange"

              >
                <option value="" disabled>Select Event</option>
                <option v-for="event in trainingEvents" :key="event.id" :value="event.id">
                  {{ event.trainingCourse?.course_id }} - {{ event.training_type }}
                </option>
              </select>
              <div v-if="loadingEvents" class="absolute right-3 top-10">
                <span class="loading loading-spinner loading-xs"></span>
              </div>
            </div>
          </div>

          <!-- Event Type and Platform Fields -->
          <div class="flex items-center justify-center gap-5">
            <div class="relative mb-3 w-1/2">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                C2. Training Platform <span class="text-red-500">*</span>
              </label>
              <select
                v-model="training.training_platform"
                class="select select-bordered w-full rounded-xl border-2 px-3 py-1 leading-[1.6] outline transition-all duration-200 ease-linear focus:border-teal-500"
                required
                :disabled="!training.training_event_id"
              >
                <option value="" disabled>Select Platform</option>
                <option value="online">Online</option>
                <option value="onsite">Onsite</option>
                <option value="seminar">Seminar</option>
                <option value="conference">Conference</option>
              </select>
            </div>
            <div class="relative mb-3 w-1/2">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                C3. Software <span class="text-red-500">*</span>
              </label>
              <select
                v-model="training.software_id"
                class="select select-bordered w-full rounded-xl border-2 px-3 py-1 leading-[1.6] outline transition-all duration-200 ease-linear focus:border-teal-500"
                required
                :disabled="true"
              >
                <option value="" disabled>Select Software</option>
                <option v-for="software in softwares" :key="software.id" :value="software.id">
                  {{ software.name }}
                </option>
              </select>
            </div>
          </div>

          <!-- Industry and Solution Fields -->
          <div class="flex items-center justify-center gap-5">
            <div class="relative mb-3 w-1/2">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                C4. Industry <span class="text-red-500">*</span>
              </label>
              <select
                v-model="training.industry_id"
                class="select select-bordered w-full rounded-xl border-2 px-3 py-1 leading-[1.6] outline transition-all duration-200 ease-linear focus:border-teal-500"
                required
                :disabled="true"
              >
                <option value="" disabled>Select Industry</option>
                <option v-for="industry in industries" :key="industry.id" :value="industry.id">
                  {{ industry.name }}
                </option>
              </select>
            </div>

            <div class="relative mb-3 w-1/2">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                C5. Solution <span class="text-red-500">*</span>
              </label>
              <select
                v-model="training.solution_id"
                class="select select-bordered w-full rounded-xl border-2 px-3 py-1 leading-[1.6] outline transition-all duration-200 ease-linear focus:border-teal-500"
                required
                :disabled="true"
              >
                <option value="" disabled>Select Solution</option>
                <option v-for="solution in solutions" :key="solution.id" :value="solution.id">
                  {{ solution.name }}
                </option>
              </select>
            </div>
          </div>

          <!-- Price and Available Seats Fields -->
          <div class="flex items-center justify-center gap-5">
            <div class="relative mb-3 w-1/2">
              <input
                type="number"
                class="peer block min-h-[auto] w-full rounded-xl border-2  px-3 py-[0.32rem] leading-[1.6]  transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary placeholder:opacity-100 motion-reduce:transition-none"
                v-model="training.price"
                placeholder="Enter price"
                required
                :disabled="!training.training_event_id"
                min="0"
                step="0.01"
              />
              <label
                class="absolute left-3 top-[-4px] mb-0 font-semibold z-10 text-xl px-2 origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-gray-900 transition-all duration-200 ease-out bg-white peer-focus:text-primary -translate-y-[0.9rem] scale-[0.8] motion-reduce:transition-none dark:peer-focus:text-primary"
                >C6. Price <span class="text-red-500">*</span>
              </label>
            </div>

            <div class="relative mb-3 w-1/2">
              <input
                type="number"
                class="peer block min-h-[auto] w-full rounded-xl border-2 px-3 py-[0.32rem] leading-[1.6]  transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary placeholder:opacity-100 motion-reduce:transition-none"
                v-model="training.available_seats"
                placeholder="Enter available seats"
                required
                :disabled="!training.training_event_id"
                min="1"
              />
              <label
                class="absolute left-3 top-[-4px] mb-0 font-semibold z-10 text-xl px-2 origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-gray-900 transition-all duration-200 ease-out bg-white peer-focus:text-primary -translate-y-[0.9rem] scale-[0.8] motion-reduce:transition-none dark:peer-focus:text-primary"
                >C7. Available Seats <span class="text-red-500">*</span>
              </label>
            </div>
          </div>

          <!-- Instructor Field -->
          <div class="flex items-center justify-center gap-5">
            <div class="relative mb-3 w-full">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                C8. Instructor <span class="text-red-500">*</span>
              </label>
              <select
                v-model="training.instructor_id"
                class="select select-bordered w-full rounded-xl border-2 px-3 py-1 leading-[1.6] outline transition-all duration-200 ease-linear focus:border-teal-500"
                required
                :disabled="true"
              >
                <option value="" disabled>Select Instructor</option>
                <option v-for="instructor in instructors" :key="instructor.id" :value="instructor.id">
                  {{ instructor.user?.name }}
                </option>
              </select>
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
                :disabled="!training.training_event_id"
              />
              <label
                class="absolute left-3 top-[-4px] mb-0 font-semibold z-10 text-xl px-2 origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-gray-900 transition-all duration-200 ease-out bg-white peer-focus:text-primary -translate-y-[0.9rem] scale-[0.8] motion-reduce:transition-none dark:peer-focus:text-primary"
                >C9. Start Date <span class="text-red-500">*</span>
              </label>
            </div>

            <div class="relative mb-3 w-1/2">
              <input
                type="date"
                class="peer block min-h-[auto] w-full rounded-xl border-2 px-3 py-[0.32rem] leading-[1.6] outline transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary placeholder:opacity-100 motion-reduce:transition-none"
                v-model="training.end_date"
                required
                :disabled="!training.training_event_id"
              />
              <label
                class="absolute left-3 top-[-4px] mb-0 font-semibold z-10 text-xl px-2 origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-gray-900 transition-all duration-200 ease-out bg-white peer-focus:text-primary -translate-y-[0.9rem] scale-[0.8] motion-reduce:transition-none dark:peer-focus:text-primary"
                >C10. End Date <span class="text-red-500">*</span>
              </label>
            </div>

            <div class="relative mb-3 w-full">
              <input
                type="text"
                class="peer block min-h-[auto] w-full rounded-xl border-2 px-3 py-[0.32rem] leading-[1.6] outline transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary placeholder:opacity-100 motion-reduce:transition-none"
                v-model="training.location"
                placeholder="Enter event location"
                required
                :disabled="!training.training_event_id"
              />
              <label
                class="absolute left-3 top-[-4px] mb-0 font-semibold z-10 text-xl px-2 origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-gray-900 transition-all duration-200 ease-out bg-white peer-focus:text-primary -translate-y-[0.9rem] scale-[0.8] motion-reduce:transition-none dark:peer-focus:text-primary"
                >C11. Event Location <span class="text-red-500">*</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            class="w-full h-12 bg-teal-800 text-white font-bold rounded-2xl hover:bg-teal-700 transition flex items-center justify-center gap-2"
            :disabled="loading || !training.training_event_id"
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
  training_event_id: '', // Changed from event_id to training_event_id
  training_platform: '',
  industry_id: '',
  solution_id: '',
  software_id: '',
  training_id: '',
  instructor_id: '',
  price: '',
  available_seats: '',
  start_date: '',
  end_date: '',
  location: ''
})

const trainingEvents = ref([])
const industries = ref([])
const solutions = ref([])
const softwares = ref([])
const instructors = ref([])

const loading = ref(false)
const loadingEvents = ref(false)
const loadingIndustries = ref(false)
const loadingSolutions = ref(false)
const loadingSoftwares = ref(false)
const loadingInstructors = ref(false)

// Format date for display
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Fetch training events
const fetchTrainingEvents = async () => {
  loadingEvents.value = true
  try {
    const response = await api().get('training-event')
    trainingEvents.value = response.data.data.filter(e => e.status == 2) || response.data.filter(e => e.status == 2)
  } catch (error) {
    console.error('Error fetching training events:', error)
    toast({
      title: 'Error',
      description: 'Failed to load training events',
      variant: 'destructive'
    })
  } finally {
    loadingEvents.value = false
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

// Fetch instructors
const fetchInstructors = async () => {
  loadingInstructors.value = true
  try {
    const response = await api().get('trainer?with=user')
    instructors.value = response.data.data || response.data
  } catch (error) {
    console.error('Error fetching instructors:', error)
    toast({
      title: 'Error',
      description: 'Failed to load instructors',
      variant: 'destructive'
    })
  } finally {
    loadingInstructors.value = false
  }
}

// Handle event selection change
const onEventChange = () => {
  if (!training.training_event_id) return

  // Find the selected event
  const selectedEvent = trainingEvents.value.find(event => event.id == training.training_event_id)
  if (!selectedEvent) return

  console.log('Selected Event:', selectedEvent) // Debug log

  // Auto-populate fields based on the selected event
  if (selectedEvent.trainingCourse) {
    const trainingCourse = selectedEvent.trainingCourse

    // Populate industry, solution, software, and training IDs
    training.industry_id = trainingCourse.industry_id
    training.solution_id = trainingCourse.solution_id
    training.software_id = trainingCourse.software_id
    training.training_id = trainingCourse.id

    // Populate dates from the event
    training.start_date = selectedEvent.start_date
    training.end_date = selectedEvent.end_date

    // Set default values for other fields
    training.training_platform = selectedEvent.training_type || 'online'
    training.location = selectedEvent.location || ''

    // Set default price and seats (you can set default values here)
    training.price = selectedEvent.price || ''
    training.available_seats = selectedEvent.available_seats || ''

    // You might need to set instructor based on trainer_id
    if (selectedEvent.trainer_id) {
      training.instructor_id = selectedEvent.trainer_id
    }
  }
}

const createTraining = async () => {
  // Validation
  if (!training.training_event_id) {
    toast({
      title: 'Error',
      description: 'Please select an event',
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

  if (!training.instructor_id) {
    toast({
      title: 'Error',
      description: 'Please select instructor',
      variant: 'destructive'
    })
    return
  }

  if (!training.price || training.price <= 0) {
    toast({
      title: 'Error',
      description: 'Please enter a valid price',
      variant: 'destructive'
    })
    return
  }

  if (!training.available_seats || training.available_seats < 1) {
    toast({
      title: 'Error',
      description: 'Please enter valid number of available seats',
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

  if (!training.location?.trim()) {
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
      training_event_id: training.training_event_id,
      training_platform: training.training_platform,
      industry_id: training.industry_id,
      solution_id: training.solution_id,
      software_id: training.software_id,
      training_id: training.training_id,
      instructor_id: training.instructor_id,
      price: parseFloat(training.price),
      available_seats: parseInt(training.available_seats),
      start_date: training.start_date,
      end_date: training.end_date,
      location: training.location.trim()
    })

    Swal.fire({
      title: 'Success!',
      text: 'Offer Created Successfully',
      icon: 'success'
    })

    // Reset form
    Object.keys(training).forEach(key => {
      training[key] = ''
    })
  } catch (error) {
    console.error('Error creating offer:', error)
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
  fetchTrainingEvents()
  fetchIndustries()
  fetchSolutions()
  fetchSoftwares()
  fetchInstructors()
})
</script>
