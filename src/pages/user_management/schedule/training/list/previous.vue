<template>
  <div class="p-6 w-4/5 bg-gray-50 min-h-screen mx-auto">
    <!-- Header -->
    <p class="text-2xl font-bold bg-emerald-600 text-white text-center rounded-t-lg py-3 mb-6 shadow-md">
      🎤 Previous Training
    </p>

    <!-- Search & Filter -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div class="relative w-full sm:w-1/3 mb-4 sm:mb-0">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search trainings..."
          class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
        />
        <i class="fa fa-search absolute left-3 top-3 text-gray-400"></i>
      </div>

      <!-- Industry Filter -->
      <div class="flex gap-2">
        <select
          v-model="selectedIndustry"
          class="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
        >
          <option value="">All Industries</option>
          <option v-for="industry in industries" :key="industry.id" :value="industry.id">
            {{ industry.name }}
          </option>
        </select>

        <select
          v-model="selectedSolution"
          class="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
        >
          <option value="">All Solutions</option>
          <option v-for="solution in solutions" :key="solution.id" :value="solution.id">
            {{ solution.name }}
          </option>
        </select>

        <select
          v-model="selectedSoftware"
          class="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
        >
          <option value="">All Software</option>
          <option v-for="skill in softwareSkills" :key="skill.id" :value="skill.software_id">
            {{ skill.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-10">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      <p class="mt-2 text-gray-600">Loading trainings...</p>
    </div>

    <!-- Seminar Table -->
    <div v-else class="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-100">
      <table class="min-w-full text-sm text-gray-700">
        <thead class="bg-emerald-600 text-white text-left">
          <tr>
            <th class="py-3 border-e px-4">#</th>
            <th class="py-3 border-e px-4">Training Title</th>
            <th class="py-3 border-e px-4">Software</th>
            <th class="py-3 border-e px-4">Industry</th>
            <th class="py-3 border-e px-4">Solution</th>
            <th class="py-3 border-e px-4">Location</th>
            <th class="py-3 border-e px-4">Duration</th>
            <th class="py-3 border-e px-4">Price</th>
            <th class="py-3 border-e px-4">Available Seats</th>
            <th class="py-3 border-e px-4 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(training, index) in filteredTrainings"
            :key="training.id"
            class="border-b border-gray-100 hover:bg-gray-50 transition"
          >
            <td class="py-3 border-e px-4">{{ index + 1 }}</td>
            <td class="py-3 border-e px-4 font-semibold">
              {{ training.event?.training_course?.title || 'N/A' }}
            </td>
            <td class="py-3 border-e px-4">
              {{ training.event?.training_course?.software?.name || 'N/A' }}
            </td>
            <td class="py-3 border-e px-4">
              {{ training.event?.training_course?.industry?.name || 'N/A' }}
            </td>
            <td class="py-3 border-e px-4">
              {{ training.event?.training_course?.solution?.name || 'N/A' }}
            </td>
            <td class="py-3 border-e px-4">{{ training.location || 'N/A' }}</td>
            <td class="py-3 border-e px-4">
              {{ training.event?.training_course?.duration || 'N/A' }}
            </td>
            <td class="py-3 border-e px-4">${{ training.price || '0' }}</td>
            <td class="py-3 border-e px-4">{{ training.available_seats || '0' }}</td>
            <td class="py-3 px-4 text-right">
              <button
                class="text-emerald-600 hover:text-emerald-800 font-semibold"
                @click="viewDetails(training)"
              >
                View
              </button>
            </td>
          </tr>

          <tr v-if="filteredTrainings.length === 0">
            <td colspan="10" class="text-center py-6 text-gray-400">No trainings found</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Training Modal -->
    <div
      v-if="selectedTraining"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      @click.self="selectedTraining = null"
    >
      <div class="bg-white rounded-xl shadow-2xl w-[90%] sm:w-[600px] p-6 relative max-h-[80vh] overflow-y-auto">
        <button
          class="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          @click="selectedTraining = null"
        >
          <i class="fa fa-times"></i>
        </button>

        <h2 class="text-xl font-bold text-emerald-700 mb-4">
          {{ selectedTraining.event?.training_course?.title }}
        </h2>

        <div class="space-y-3">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">Course ID</p>
              <p class="font-medium">{{ selectedTraining.event?.training_course?.course_id || 'N/A' }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Training Level</p>
              <p class="font-medium">{{ selectedTraining.event?.training_course?.training_level || 'N/A' }}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">Software</p>
              <p class="font-medium">{{ selectedTraining.event?.training_course?.software?.name || 'N/A' }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Industry</p>
              <p class="font-medium">{{ selectedTraining.event?.training_course?.industry?.name || 'N/A' }}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">Solution</p>
              <p class="font-medium">{{ selectedTraining.event?.training_course?.solution?.name || 'N/A' }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Training Type</p>
              <p class="font-medium">{{ selectedTraining.event?.training_type || 'N/A' }}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">Start Date</p>
              <p class="font-medium">{{ formatDate(selectedTraining.start_date) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">End Date</p>
              <p class="font-medium">{{ formatDate(selectedTraining.end_date) }}</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">Location</p>
              <p class="font-medium">{{ selectedTraining.location }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Price</p>
              <p class="font-medium">${{ selectedTraining.price }}</p>
            </div>
          </div>

          <div>
            <p class="text-sm text-gray-500">Available Seats</p>
            <p class="font-medium">{{ selectedTraining.available_seats }}</p>
          </div>

          <div v-if="selectedTraining.event?.training_course?.description">
            <p class="text-sm text-gray-500">Description</p>
            <p class="mt-1 text-gray-700">{{ selectedTraining.event.training_course.description }}</p>
          </div>

          <div class="mt-4 flex justify-end">
            <button
              class="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
              @click="registerForTraining(selectedTraining)"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '@/config/api'
import { ref, computed, onMounted } from 'vue'


const searchQuery = ref('')
const selectedIndustry = ref('')
const selectedSolution = ref('')
const selectedSoftware = ref('')
const selectedTraining = ref(null)

// Data refs
const trainings = ref([])
const industries = ref([])
const solutions = ref([])
const softwareSkills = ref([])
const loading = ref(true)



// Fetch data on mount
onMounted(async () => {
  await Promise.all([
    fetchTrainings(),
    fetchIndustries(),
    fetchSolutions(),
    fetchSoftwareSkills()
  ])
  loading.value = false
})

// API methods
const fetchTrainings = async () => {
  try {
    const response = await api().get('/training-offer?with=event.trainingCourse.software,event.trainingCourse.industry,event.trainingCourse.solution&status=1')
    if (response.data.success) {
      trainings.value = response.data.data
    }
  } catch (error) {
    console.error('Error fetching trainings:', error)
  }
}

const fetchIndustries = async () => {
  try {
    const response = await api().get('/industries')
    if (response.data.success) {
      industries.value = response.data.data
    }
  } catch (error) {
    console.error('Error fetching industries:', error)
  }
}

const fetchSolutions = async () => {
  try {
    const response = await api().get('/solutions')
    if (response.data.success) {
      solutions.value = response.data.data
    }
  } catch (error) {
    console.error('Error fetching solutions:', error)
  }
}

const fetchSoftwareSkills = async () => {
  try {
    const response = await api().get('/software-skills')
    if (response.data.success) {
      softwareSkills.value = response.data.data
    }
  } catch (error) {
    console.error('Error fetching software skills:', error)
  }
}

// Filtered trainings based on search and filters
const filteredTrainings = computed(() => {
  return trainings.value.filter(training => {
    const course = training.event?.training_course
    const matchesSearch = searchQuery.value === '' ||
      (course?.title?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
       course?.software?.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
       course?.industry?.name?.toLowerCase().includes(searchQuery.value.toLowerCase()))

    const matchesIndustry = !selectedIndustry.value ||
      course?.industry_id === selectedIndustry.value

    const matchesSolution = !selectedSolution.value ||
      course?.solution_id === selectedSolution.value

    const matchesSoftware = !selectedSoftware.value ||
      course?.software_id === selectedSoftware.value

    return matchesSearch && matchesIndustry && matchesSolution && matchesSoftware
  })
})

// Helper methods
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const viewDetails = (training) => {
  selectedTraining.value = training
}

const registerForTraining = (training) => {
  // Implement registration logic here
  console.log('Registering for training:', training.id)
  // You can show a registration form or redirect to registration page
  alert('Registration functionality to be implemented')
}
</script>

<style scoped>
tr {
  transition: background-color 0.2s ease;
}
</style>
