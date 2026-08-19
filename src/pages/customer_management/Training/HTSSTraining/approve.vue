<template>
  <div class="px-10 bg-white py-5 w-11/12 mx-auto">
    <div class="bg-teal-700 rounded-t-2xl text-white px-6 py-4">
      <h1 class="text-2xl font-semibold">Training List</h1>
      <p class="text-gray-300">Review and approve training requests</p>
    </div>

    <div class="bg-white rounded-xl p-5 w-full shadow-md mt-5">
      <!-- Filters and Search -->
      <div class="flex justify-between items-center mb-6">
        <div class="flex gap-4">
          <!-- Status Filter -->
          <!-- <select v-model="filters.status" class="select select-bordered select-sm rounded-lg">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select> -->

          <!-- Date Filter -->
          <!-- <select v-model="filters.date_range" class="select select-bordered select-sm rounded-lg">
            <option value="">All Dates</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select> -->
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
              <!-- <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Start Date</th> -->
              <!-- <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">End Date</th> -->
              <!-- <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Status</th> -->
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
                <div class="font-medium text-gray-900">{{ training.title }}</div>
                <div class="text-sm text-gray-500">{{ training.course_code }}</div>
              </td>
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ training.industry?.name }}
              </td>
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ training.solution?.name }}
              </td>
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ training.software?.name }}
              </td>
              <td class="border border-gray-300 px-4 py-3">
                <span
                  class="px-2 py-1 rounded-full text-xs font-medium capitalize"
                  :class="{
                    'bg-blue-100 text-blue-800': training.training_level === 'basic',
                    'bg-yellow-100 text-yellow-800': training.training_level === 'intermediate',
                    'bg-red-100 text-red-800': training.training_level === 'advanced'
                  }"
                >
                  {{ training.training_level }}
                </span>
              </td>
              <td class="border border-gray-300 px-4 py-3 text-gray-600 capitalize">
                {{ training.duration}}
              </td>
              <!-- <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ formatDate(training.start_date) }}
              </td>
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ formatDate(training.end_date) }}
              </td> -->
              <!-- <td class="border border-gray-300 px-4 py-3">
                <span
                  class="px-2 py-1 rounded-full text-xs font-medium capitalize"
                  :class="{
                    'bg-yellow-100 text-yellow-800': training.status === 'pending',
                    'bg-green-100 text-green-800': training.status === 'approved',
                    'bg-red-100 text-red-800': training.status === 'rejected'
                  }"
                >
                  {{ training.status }}
                </span>
              </td> -->
              <td class="border border-gray-300 px-4 py-3">
                <div class="flex gap-2">

                  <!-- View Details -->
                  <button
                    @click="viewDetails(training)"
                    class="px-3 py-2 rounded-md shadow-md bg-blue-600 text-white text-sm"
                  >
                    View
                  </button>
                  <!-- <button
                  class="px-3 py-2 rounded-md shadow-md bg-green-600 text-white text-sm"
                  @click="statusUpdate(training)"
                >
                  Approve
                </button> -->
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="filteredTrainings.length == 0" class="text-center py-8 text-gray-500">
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
          Showing {{ filteredTrainings.length  }} of {{ meta.total }} records from {{ meta.from }} to {{ meta.to }}
        </div>
        <div class="join">

          <button v-for="link in meta.links" :key="link.label" class="join-item btn btn-sm btn-active" @click="currentPage = link.page,fetchTrainings()"><p v-html="link.label"></p></button>

        </div>
      </div>
    </div>

    <!-- Training Details Modal -->
    <div v-if="selectedTraining" class="modal modal-open">
      <div class="modal-box max-w-4xl">
        <h3 class="font-bold text-lg mb-4">Training Details</h3>

        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label class="font-semibold text-gray-700">Course Title:</label>
            <p class="text-gray-900">{{ selectedTraining.title }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Course ID:</label>
            <p class="text-gray-900">{{ selectedTraining.course_code }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Industry:</label>
            <p class="text-gray-900">{{ getIndustryName(selectedTraining.industry_id) }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Solution:</label>
            <p class="text-gray-900">{{ getSolutionName(selectedTraining.solution_id) }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Software:</label>
            <p class="text-gray-900">{{ getSoftwareName(selectedTraining.software_id) }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Training Level:</label>
            <p class="text-gray-900 capitalize">{{ selectedTraining.training_level }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Duration:</label>
            <p class="text-gray-900 capitalize">{{ selectedTraining.course_duration?.replace('_', ' ') }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Status:</label>
            <span
              class="px-2 py-1 rounded-full text-xs font-medium capitalize"
              :class="{
                'bg-yellow-100 text-yellow-800': selectedTraining.status === 'pending',
                'bg-green-100 text-green-800': selectedTraining.status === 'approved',
                'bg-red-100 text-red-800': selectedTraining.status === 'rejected'
              }"
            >
              {{ selectedTraining.status }}
            </span>
          </div>
        </div>

        <div class="mb-6">
          <label class="font-semibold text-gray-700">Description:</label>
          <p class="text-gray-900 mt-2">{{ selectedTraining.description }}</p>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label class="font-semibold text-gray-700">Start Date:</label>
            <p class="text-gray-900">{{ formatDate(selectedTraining.start_date) }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">End Date:</label>
            <p class="text-gray-900">{{ formatDate(selectedTraining.end_date) }}</p>
          </div>
        </div>

        <div class="modal-action">
          <button class="btn" @click="selectedTraining = null">Close</button>
          <div v-if="selectedTraining.status === 'pending'" class="flex gap-2">
            <button
              @click="approveTraining(selectedTraining.id)"
              class="btn btn-success text-white"
              :disabled="actionLoading"
            >
              Approve
            </button>
            <button
              @click="rejectTraining(selectedTraining.id)"
              class="btn btn-error text-white"
              :disabled="actionLoading"
            >
              Reject
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
const softwareSkills = ref([])
const selectedTraining = ref(null)
const loading = ref(false)
const actionLoading = ref(false)
const approvingId = ref(null)
const rejectingId = ref(null)
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
    const {data} = await api().get('training-course?with=software,solution,industry&status=0&page='+currentPage.value+'&per_page='+itemsPerPage.value)

    trainings.value = data.data.data

    meta.value = data.data
    // currentPage.value = meta.value.current_page
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

// Fetch industries, solutions, and software skills for name resolution
const fetchReferenceData = async () => {
  try {
    const [industriesRes, solutionsRes, softwareRes] = await Promise.all([
      api().get('industries', { headers: { 'Authorization': `Bearer ${authStore.token}` } }),
      api().get('solutions', { headers: { 'Authorization': `Bearer ${authStore.token}` } }),
      api().get('software-skills', { headers: { 'Authorization': `Bearer ${authStore.token}` } })
    ])

    industries.value = industriesRes.data.data || industriesRes.data
    solutions.value = solutionsRes.data.data || solutionsRes.data
    softwareSkills.value = softwareRes.data.data || softwareRes.data
  } catch (error) {
    console.error('Error fetching reference data:', error)
  }
}

// Helper functions to get names from IDs
const getIndustryName = (industryId) => {
  const industry = industries.value.find(ind => ind.id === industryId)
  return industry?.name || 'N/A'
}

const getSolutionName = (solutionId) => {
  const solution = solutions.value.find(sol => sol.id === solutionId)
  return solution?.name || 'N/A'
}

const getSoftwareName = (softwareId) => {
  const software = softwareSkills.value.find(soft => soft.id === softwareId)
  return software?.name || 'N/A'
}

// Format date
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Filter trainings
const filteredTrainings = computed(() => {
  let filtered = trainings.value

  // // Filter by status
  // if (filters.status) {
  //   filtered = filtered.filter(training => training.status === filters.status)
  // }


  // Filter by date range
  if (filters.date_range) {
    const now = new Date()
    filtered = filtered.filter(training => {
      const startDate = new Date(training.start_date)
      switch (filters.date_range) {
        case 'today':
          return startDate.toDateString() === now.toDateString()
        case 'week':
        {  const weekAgo = new Date(now.setDate(now.getDate() - 7))
          return startDate >= weekAgo}
        case 'month':
          {const monthAgo = new Date(now.setMonth(now.getMonth() - 1))
          return startDate >= monthAgo}
        default:
          return true
      }
    })
  }

  // Filter by search
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(training =>
      training.title.toLowerCase().includes(searchLower) ||
      training.course_code.toLowerCase().includes(searchLower) ||
      getIndustryName(training.industry_id).toLowerCase().includes(searchLower) ||
      getSolutionName(training.solution_id).toLowerCase().includes(searchLower)
    )
  }

  return filtered
})

const statusUpdate = async (training) => {
  try {
    const payload = {
      industry_id: training.industry.id,
      solution_id: training.solution.id,
      software_id: training.software.id,
      training_level: training.training_level,
      title: training.title,
      course_id: training.course_id,
      course_code: training.course_code,
      description: training.description,
      duration: training.duration,
      status: 1,
      _method: "PUT"
    }

    // Add optional fields if they exist
    if (training.customer_id) payload.customer_id = training.customer_id
    if (training.training_type) payload.training_type = training.training_type

    await api().post(
      `training-course/${training.id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      }
    )

    fetchTrainings()

    Swal.fire({
      title: 'Approved!',
      text: `Training has been Approved.`,
      icon: 'success'
    })
  } catch (error) {
    console.error('Error updating status:', error)
    Swal.fire({
      title: 'Error',
      text: 'Failed to Approve. Please try again.',
      icon: 'error'
    })
  }
}


// Actions
const approveTraining = async (trainingId) => {
  approvingId.value = trainingId
  actionLoading.value = true

  try {
    await api().patch(`trainings/${trainingId}/approve`, {}, {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })

    toast({
      title: 'Success',
      description: 'Training approved successfully',
      variant: 'default'
    })

    // Update local state
    const training = trainings.value.find(t => t.id === trainingId)
    if (training) {
      training.status = 'approved'
    }

    // Close modal if open
    if (selectedTraining.value && selectedTraining.value.id === trainingId) {
      selectedTraining.value.status = 'approved'
    }
  } catch (error) {
    console.error('Error approving training:', error)
    toast({
      title: 'Error',
      description: 'Failed to approve training',
      variant: 'destructive'
    })
  } finally {
    actionLoading.value = false
    approvingId.value = null
  }
}

const rejectTraining = async (trainingId) => {
  rejectingId.value = trainingId
  actionLoading.value = true

  try {
    await api().patch(`trainings/${trainingId}/reject`, {}, {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })

    toast({
      title: 'Success',
      description: 'Training rejected successfully',
      variant: 'default'
    })

    // Update local state
    const training = trainings.value.find(t => t.id === trainingId)
    if (training) {
      training.status = 'rejected'
    }

    // Close modal if open
    if (selectedTraining.value && selectedTraining.value.id === trainingId) {
      selectedTraining.value.status = 'rejected'
    }
  } catch (error) {
    console.error('Error rejecting training:', error)
    toast({
      title: 'Error',
      description: 'Failed to reject training',
      variant: 'destructive'
    })
  } finally {
    actionLoading.value = false
    rejectingId.value = null
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
