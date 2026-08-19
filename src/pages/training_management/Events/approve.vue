<template>
  <div class="px-2 bg-white py-5 w-11/12 mx-auto">
    <div class="bg-teal-700 rounded-t-2xl text-white px-6 py-4">
      <h1 class="text-2xl font-semibold">Training List</h1>
      <p class="text-gray-300">Review and approve list training requests</p>
    </div>

    <div class="bg-white rounded-xl p-5 w-full shadow-md mt-5">
      <!-- Filters and Search -->
      <div class="flex justify-between items-center mb-6">
        <div class="flex gap-4">
          <!-- Date Filter -->
          <select v-model="filters.date_range" class="select select-bordered select-sm rounded-lg">
            <option value="">All Dates</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>

        <!-- Search -->
        <div class="relative">
          <input
            type="text"
            v-model="filters.search"
            placeholder="Search trainings..."
            class="input input-bordered input-sm rounded-lg pl-10 w-64"
          />
          <span class="absolute left-3 top-2">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </span>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-8">
        <span class="loading loading-spinner loading-lg text-teal-600"></span>
        <span class="ml-2 text-gray-600">Loading trainings...</span>
      </div>

      <!-- Table -->
      <div v-else class="overflow-x-auto">
        <table class="table table-auto w-full border-collapse border border-gray-200">
          <thead class="bg-teal-50">
            <tr>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">ID</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Course Title</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Industry</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Solution</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Software</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Level</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Duration</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Training Type</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Status</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="training in filteredTrainings"
              :key="training.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="border border-gray-300 px-4 py-3 text-gray-600">{{ training.id }}</td>
              <td class="border border-gray-300 px-4 py-3">
                <div class="font-medium text-gray-900">{{ getTrainingCourse(training).title }}</div>
                <div class="text-sm text-gray-500">{{ getTrainingCourse(training).course_id }}</div>
              </td>
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ (training.analysis) }}
              </td>
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ getSolutionName(training) }}
              </td>
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ getSoftwareName(training) }}
              </td>
              <td class="border border-gray-300 px-4 py-3">
                <span
                  class="px-2 py-1 rounded-full text-xs font-medium capitalize"
                  :class="{
                    'bg-blue-100 text-blue-800': getTrainingCourse(training).training_level?.toLowerCase() === 'basic',
                    'bg-yellow-100 text-yellow-800': getTrainingCourse(training).training_level?.toLowerCase() === 'intermediate',
                    'bg-red-100 text-red-800': getTrainingCourse(training).training_level?.toLowerCase() === 'advanced'
                  }"
                >
                  {{ getTrainingCourse(training).training_level }}
                </span>
              </td>
              <td class="border border-gray-300 px-4 py-3 text-gray-600 capitalize">
                {{ getTrainingCourse(training).duration?.replace('_', ' ') }}
              </td>
              <td class="border border-gray-300 px-4 py-3 text-gray-600 capitalize">                
                <div class="font-medium text-gray-900">{{ training.training_type }}</div>
                <div class="text-sm text-gray-500">{{ training.platform }}</div>
              </td>
              <td class="border border-gray-300 px-4 py-3">
                <span
                  class="px-2 py-1 rounded-full text-xs font-medium capitalize"
                  :class="{
                    'bg-yellow-100 text-yellow-800': training.status === '0' || training.status === 'pending',
                    'bg-green-100 text-green-800': training.status === '1' || training.status === 'approved',
                    'bg-red-100 text-red-800': training.status === '2' || training.status === 'rejected'
                  }"
                >
                  {{ getStatusText(training.status) }}
                </span>
              </td>
              <td class="border border-gray-300 px-4 py-3">
                <div class="flex gap-2">
                   <!-- View Details -->
                  <button
                    @click="viewDetails(training)"
                    class="px-3 py-2 rounded-md shadow-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors"
                  >
                    View
                  </button>
                  <!-- Approve Button -->
                  <button
                    class="px-3 py-2 rounded-md shadow-md bg-green-600 text-white text-sm hover:bg-green-700 transition-colors"
                    @click="statusUpdate(training)"
                    :disabled="actionLoading"
                  >
                    <span v-if="actionLoading && approvingId === training.id" class="loading loading-spinner loading-xs"></span>
                    Approve
                  </button>

                  <!-- Delete Button -->
                  <button
                    @click="deleteTraining(training.id)"
                    class="px-3 py-2 rounded-md shadow-md bg-red-600 text-white text-sm hover:bg-red-700 transition-colors"
                    :disabled="actionLoading"
                  >
                    <span v-if="actionLoading && deletingId === training.id" class="loading loading-spinner loading-xs"></span>
                    Delete
                  </button>

                 
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="filteredTrainings.length === 0" class="text-center py-8 text-gray-500">
          <svg class="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <p class="mt-4 text-lg">No training records found</p>
          <p class="text-sm">Try adjusting your filters or search terms</p>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="filteredTrainings.length > 0 && meta" class="flex justify-between items-center mt-6">
        <div class="text-sm text-gray-600">
          Showing {{ filteredTrainings.length }} of {{ meta.total }} records from {{ meta.from }} to {{ meta.to }}
        </div>
        <div class="join">
          <button v-for="link in meta.links" :key="link.label" class="join-item btn btn-sm" :class="{'btn-active': link.active}" @click="handlePagination(link)">
            <p v-html="link.label"></p>
          </button>
        </div>
      </div>
    </div>

    <!-- Training Details Modal -->
    <div v-if="selectedTraining" class="modal modal-open">
      <div class="modal-box max-w-4xl">
        <h3 class="font-bold text-lg mb-4">Training Details</h3>

        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label class="font-semibold text-gray-700">Training ID:</label>
            <p class="text-gray-900">{{ selectedTraining.id }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Course Title:</label>
            <p class="text-gray-900">{{ getTrainingCourse(selectedTraining).title }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Course ID:</label>
            <p class="text-gray-900">{{ getTrainingCourse(selectedTraining).course_id }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Analysis:</label>
            <p class="text-gray-900">{{ getIndustryName(selectedTraining) }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Solution:</label>
            <p class="text-gray-900">{{ getSolutionName(selectedTraining) }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Software:</label>
            <p class="text-gray-900">{{ getSoftwareName(selectedTraining) }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Training Level:</label>
            <p class="text-gray-900 capitalize">{{ getTrainingCourse(selectedTraining).training_level }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Duration:</label>
            <p class="text-gray-900 capitalize">{{ getTrainingCourse(selectedTraining).duration?.replace('_', ' ') }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Training Type:</label>
            <p class="text-gray-900 capitalize">{{ selectedTraining.training_type }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Platform:</label>
            <p class="text-gray-900">{{ selectedTraining.platform || 'N/A' }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Status:</label>
            <span
              class="px-2 py-1 rounded-full text-xs font-medium capitalize"
              :class="{
                'bg-yellow-100 text-yellow-800': selectedTraining.status === '0',
                'bg-green-100 text-green-800': selectedTraining.status === '1',
                'bg-red-100 text-red-800': selectedTraining.status === '2'
              }"
            >
              {{ getStatusText(selectedTraining.status) }}
            </span>
          </div>
        </div>

        <div class="mb-6">
          <label class="font-semibold text-gray-700">Description:</label>
          <p class="text-gray-900 mt-2">{{ getTrainingCourse(selectedTraining).description || 'No description available' }}</p>
        </div>

        <div class="modal-action">
          <button class="btn" @click="selectedTraining = null">Close</button>
          <div v-if="selectedTraining.status === '0'" class="flex gap-2">
            <button
              @click="statusUpdate(selectedTraining)"
              class="btn btn-success text-white"
              :disabled="actionLoading"
            >
              Approve
            </button>
            <button
              @click="deleteTraining(selectedTraining.id)"
              class="btn btn-error text-white"
              :disabled="actionLoading"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from '@/components/ui/toast/use-toast'
import { useAuthStore } from '@/stores/AuthStore'
import { ref, onMounted, computed, reactive } from 'vue'
import Swal from 'sweetalert2'
import api from '@/config/api'

const authStore = useAuthStore()
const { toast } = useToast()

// Data
const trainings = ref([])
const industries = ref([])
const solutions = ref([])
const softwares = ref([])
const selectedTraining = ref(null)
const loading = ref(false)
const actionLoading = ref(false)
const approvingId = ref(null)
const deletingId = ref(null)
const currentPage = ref(1)
const itemsPerPage = ref(10)
const meta = ref()

// Filters
const filters = reactive({
  status: '',
  date_range: '',
  search: ''
})

// Fetch trainings
const fetchTrainings = async () => {
  loading.value = true
  try {
    const response = await api().get(`training-event`)
    console.log('API Response:', response.data) 
    trainings.value = response.data.data.filter(e => e.status == 0)
    meta.value = response.data.meta
  } catch (error) {
    console.error('Error fetching trainings:', error)
    toast({
      title: 'Error',
      description: 'Failed to load trainings',
      variant: 'destructive'
    })
  } finally {
    loading.value = false
  }
}

// Fetch industries, solutions, and softwares for name resolution
const fetchReferenceData = async () => {
  try {
    const [industriesRes, solutionsRes, softwaresRes] = await Promise.all([
      api().get('industries'),
      api().get('solutions'),
      api().get('softwares')
    ])

    industries.value = industriesRes.data.data || industriesRes.data
    solutions.value = solutionsRes.data.data || solutionsRes.data
    softwares.value = softwaresRes.data.data || softwaresRes.data
  } catch (error) {
    console.error('Error fetching reference data:', error)
  }
}

// Helper function to get training course data
const getTrainingCourse = (training) => {
  return training.trainingCourse || training
}

// Helper functions to get names
const getIndustryName = (training) => {
  const trainingCourse = getTrainingCourse(training)
  const industry = industries.value.find(ind => ind.id == trainingCourse.industry_id)
  return industry?.name || 'N/A'
}

const getSolutionName = (training) => {
  const trainingCourse = getTrainingCourse(training)
  const solution = solutions.value.find(sol => sol.id == trainingCourse.solution_id)
  return solution?.name || 'N/A'
}

const getSoftwareName = (training) => {
  const trainingCourse = getTrainingCourse(training)
  const software = softwares.value.find(soft => soft.id == trainingCourse.software_id)
  return software?.name || 'N/A'
}

// Helper function to convert status codes to text
const getStatusText = (status) => {
  switch(status) {
    case '0': return 'pending'
    case '1': return 'approved'
    case '2': return 'rejected'
    default: return status
  }
}

// Handle pagination
const handlePagination = (link) => {
  if (link.url && !link.active) {
    const url = new URL(link.url)
    currentPage.value = parseInt(url.searchParams.get('page')) || 1
    fetchTrainings()
  }
}

// Filter trainings
const filteredTrainings = computed(() => {
  let filtered = trainings.value

  // Filter by status
  if (filters.status) {
    filtered = filtered.filter(training => {
      const statusText = getStatusText(training.status)
      return statusText === filters.status
    })
  }

  // Filter by search
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(training => {
      const trainingCourse = getTrainingCourse(training)
      return (
        trainingCourse.title.toLowerCase().includes(searchLower) ||
        trainingCourse.course_id.toLowerCase().includes(searchLower) ||
        getIndustryName(training).toLowerCase().includes(searchLower) ||
        getSolutionName(training).toLowerCase().includes(searchLower) ||
        getSoftwareName(training).toLowerCase().includes(searchLower)
      )
    })
  }

  return filtered
})

// Delete training
const deleteTraining = async (trainingId) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  })

  if (!result.isConfirmed) return

  deletingId.value = trainingId
  actionLoading.value = true

  try {
    await api().delete(`training-event/${trainingId}`)

    toast({
      title: 'Success',
      description: 'Training deleted successfully',
      variant: 'default'
    })

    // Remove from local state
    trainings.value = trainings.value.filter(t => t.id !== trainingId)

    // Close modal if open
    if (selectedTraining.value && selectedTraining.value.id === trainingId) {
      selectedTraining.value = null
    }
  } catch (error) {
    console.error('Error deleting training:', error)
    toast({
      title: 'Error',
      description: 'Failed to delete training',
      variant: 'destructive'
    })
  } finally {
    actionLoading.value = false
    deletingId.value = null
  }
}

const statusUpdate = async (training) => {
  approvingId.value = training.id
  actionLoading.value = true

  try {
    const payload = {
      training_type: training.training_type,
      platform: training.platform.trim(),
      industry_id: training.industry_id,
      solution_id: training.solution_id,
      software_id: training.software_id,
      training_course_id: training.trainingCourse.id,
      trainer_id: training.trainer_id,
      status: 1, 
      _method: "PUT"
    }

    await api().post(
      `training-event/${training.id}`,
      payload,
     
    )

    fetchTrainings()

    Swal.fire({
      title: 'Approved!',
      text: `Training has been Approved.`,
      icon: 'success'
    })

    // Close modal if open
    if (selectedTraining.value && selectedTraining.value.id === training.id) {
      selectedTraining.value = null
    }
  } catch (error) {
    console.error('Error updating status:', error)
    Swal.fire({
      title: 'Error',
      text: 'Failed to Approve. Please try again.',
      icon: 'error'
    })
  } finally {
    actionLoading.value = false
    approvingId.value = null
  }
}

const viewDetails = (training) => {
  selectedTraining.value = training
}

// Fetch data on component mount
onMounted(() => {
  fetchTrainings()
  fetchReferenceData()
})
</script>