<template>
  <div class="px-10 bg-white py-5 w-3/4 mx-auto">
    <div class="bg-teal-700 rounded-t-2xl text-white px-6 py-4">
      <h1 class="text-2xl font-semibold">Create Event</h1>
      <p class="text-gray-300">Fill out the form below to create a new event</p>
    </div>

    <hr />
    <div class="bg-white rounded-xl p-5 w-full shadow-md mt-5">
      <form @submit.prevent="createEvent">
        <div class="py-5 space-y-7 mt-5">
          <!-- Training Course Field - Moved to top -->
          <div class="flex items-center justify-center gap-5">
            <div class="relative mb-3 w-full">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                B1. Training Course <span class="text-red-500">*</span>
              </label>
              <select
                v-model="event.training_course_id"
                @change="onCourseChange"
                class="select select-bordered w-full rounded-xl border-2 px-3 py-3 leading-[1.6] outline transition-all duration-200 ease-linear focus:border-teal-500"
                required
                :disabled="loadingTrainingCourses"
              >
                <option value="" disabled>Select Training Course</option>
                <option v-for="course in trainingCourses" :key="course.id" :value="course.id">
                  {{ course.title }} ({{ course.course_id }})
                </option>
              </select>
              <div v-if="loadingTrainingCourses" class="absolute right-3 top-10">
                <span class="loading loading-spinner loading-xs"></span>
              </div>
            </div>
          </div>

          <!-- Auto-populated fields (readonly) -->
          <div class="flex items-center justify-center gap-5">
            <div class="relative mb-3 w-1/2">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                B2. Industry <span class="text-gray-500">(Auto Selected)</span>
              </label>
              <input
                type="text"
                class="peer block min-h-[auto] w-full rounded-xl border-2 px-3 py-[0.32rem] leading-[1.6] outline transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary placeholder:opacity-100 motion-reduce:transition-none bg-gray-50"
                :value="selectedCourse?.industry?.name || ''"
                readonly
              />
            </div>

            <div class="relative mb-3 w-1/2">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                B3. Solution <span class="text-gray-500">(Auto Selected)</span>
              </label>
              <input
                type="text"
                class="peer block min-h-[auto] w-full rounded-xl border-2 px-3 py-[0.32rem] leading-[1.6] outline transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary placeholder:opacity-100 motion-reduce:transition-none bg-gray-50"
                :value="selectedCourse?.solution?.name || ''"
                readonly
              />
            </div>
          </div>

          <!-- Auto-populated software field -->
          <div class="flex items-center justify-center gap-5">
            <div class="relative mb-3 w-full">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                B4. Software <span class="text-gray-500">(Auto Selected)</span>
              </label>
              <input
                type="text"
                class="peer block min-h-[auto] w-full rounded-xl border-2 px-3 py-[0.32rem] leading-[1.6] outline transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary placeholder:opacity-100 motion-reduce:transition-none bg-gray-50"
                :value="selectedCourse?.software?.name || ''"
                readonly
              />
            </div>
          </div>

          <!-- Training Type and Platform Fields -->
          <div class="flex items-center justify-center gap-5">
            <div class="relative mb-3 w-1/2">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                B5. Training Type <span class="text-red-500">*</span>
              </label>
              <select
                v-model="event.training_type"
                class="select select-bordered w-full rounded-xl border-2 px-3 py-3 leading-[1.6] outline transition-all duration-200 ease-linear focus:border-teal-500"
                required
              >
                <option value="" disabled>Select Training Type</option>
                <option value="online">Online</option>
                <option value="onsite">Onsite</option>
                <option value="seminar">Seminar</option>
                <option value="conference">Conference</option>
              </select>
            </div>
            <div class="relative mb-3 w-1/2">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                B6. Platform <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                class="peer block min-h-[auto] w-full rounded-xl border-2 px-3 py-[0.32rem] leading-[1.6] outline transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary placeholder:opacity-100 motion-reduce:transition-none"
                v-model="event.platform"
                required
                placeholder="Enter platform"
              />
            </div>
          </div>

          <!-- Instructor Field -->
          <div class="flex items-center justify-center gap-5">
            <div class="relative mb-3 w-full">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                B7. Instructor <span class="text-red-500">*</span>
              </label>
              <select
                v-model="event.trainer_id"
                class="select select-bordered w-full rounded-xl border-2 px-3 py-3 leading-[1.6] outline transition-all duration-200 ease-linear focus:border-teal-500"
                required
                :disabled="loadingTrainers"
              >
                <option value="" disabled>Select Instructor</option>
                <option v-for="trainer in trainers" :key="trainer.id" :value="trainer.id">
                  {{ trainer.user.name }} - {{ trainer.expertise_area }}
                </option>
              </select>
              <div v-if="loadingTrainers" class="absolute right-3 top-10">
                <span class="loading loading-spinner loading-xs"></span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            class="w-full h-12 bg-teal-800 text-white font-bold rounded-2xl hover:bg-teal-700 transition flex items-center justify-center gap-2"
            :disabled="loading"
          >
            <span v-if="loading" class="loading loading-spinner loading-sm"></span>
            <span>{{ loading ? 'Creating...' : 'Create Event' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useToast } from '@/components/ui/toast/use-toast'
import { useAuthStore } from '@/stores/AuthStore'
import { ref, onMounted, reactive, computed } from 'vue'
import Swal from 'sweetalert2'
import api from '@/config/api'

const authStore = useAuthStore()
const { toast } = useToast()

const event = reactive({
  training_type: '',
  platform: '',
  industry_id: '',
  solution_id: '',
  software_id: '',
  training_course_id: '',
  trainer_id: ''
})

const trainingCourses = ref([])
const trainers = ref([])

const loading = ref(false)
const loadingTrainingCourses = ref(false)
const loadingTrainers = ref(false)

// Computed property to get selected course details
const selectedCourse = computed(() => {
  if (!event.training_course_id) return null
  return trainingCourses.value.find(course => course.id === event.training_course_id)
})

// Handler for course selection change
const onCourseChange = () => {
  if (selectedCourse.value) {
    // Auto-populate the IDs from the selected course
    event.industry_id = selectedCourse.value.industry?.id || ''
    event.solution_id = selectedCourse.value.solution?.id || ''
    event.software_id = selectedCourse.value.software?.id || ''
  } else {
    // Clear the IDs if no course is selected
    event.industry_id = ''
    event.solution_id = ''
    event.software_id = ''
  }
}

// Fetch training courses
const fetchTrainingCourses = async () => {
  loadingTrainingCourses.value = true
  try {
    const response = await api().get('training-course', {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })
    const allCourses = response.data.data || response.data
    trainingCourses.value = allCourses.filter(course => course.status == 1)
  } catch (error) {
    console.error('Error fetching training courses:', error)
    toast({
      title: 'Error',
      description: 'Failed to load training courses',
      variant: 'destructive'
    })
  } finally {
    loadingTrainingCourses.value = false
  }
}

// Fetch trainers
const fetchTrainers = async () => {
  loadingTrainers.value = true
  try {
    const response = await api().get('trainer', {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })
    trainers.value = response.data.data || response.data
  } catch (error) {
    console.error('Error fetching trainers:', error)
    toast({
      title: 'Error',
      description: 'Failed to load trainers',
      variant: 'destructive'
    })
  } finally {
    loadingTrainers.value = false
  }
}

const createEvent = async () => {
  // Validation
  if (!event.training_course_id) {
    toast({
      title: 'Error',
      description: 'Please select training course',
      variant: 'destructive'
    })
    return
  }

  if (!event.training_type) {
    toast({
      title: 'Error',
      description: 'Please select training type',
      variant: 'destructive'
    })
    return
  }

  if (!event.platform.trim()) {
    toast({
      title: 'Error',
      description: 'Please enter platform',
      variant: 'destructive'
    })
    return
  }

  if (!event.trainer_id) {
    toast({
      title: 'Error',
      description: 'Please select instructor',
      variant: 'destructive'
    })
    return
  }

  // Validate that course data is properly loaded
  if (!selectedCourse.value) {
    toast({
      title: 'Error',
      description: 'Please select a valid training course',
      variant: 'destructive'
    })
    return
  }

  loading.value = true

  try {
    const response = await api().post('training-event', {
      training_type: event.training_type,
      platform: event.platform.trim(),
      industry_id: event.industry_id,
      solution_id: event.solution_id,
      software_id: event.software_id,
      training_course_id: event.training_course_id,
      trainer_id: event.trainer_id
    }, {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })

    Swal.fire({
      title: 'Success!',
      text: 'Event Created Successfully',
      icon: 'success'
    })

    // Reset form
    event.training_type = ''
    event.platform = ''
    event.industry_id = ''
    event.solution_id = ''
    event.software_id = ''
    event.training_course_id = ''
    event.trainer_id = ''

  } catch (error) {
    console.error('Error creating event:', error)
    Swal.fire({
      title: 'Error!',
      text: error.response?.data?.message || 'Failed to create event. Please try again.',
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
