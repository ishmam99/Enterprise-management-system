<template>
  <div class="px-2 bg-white py-5 w-11/12 mx-auto">
    <div class="bg-teal-700 rounded-t-2xl text-white px-6 py-4">
      <h1 class="text-2xl font-semibold">Approved courses</h1>
      <p class="text-gray-300">All approved training requests</p>
    </div>

    <div class="bg-white rounded-xl p-5 w-full shadow-md mt-5">
      <!-- Filters and Search -->
      <div class="flex justify-between items-center mb-6">
        <div class="flex gap-4">
          <!-- Status Filter (hidden since we only show pending) -->
          <!-- <select v-model="filters.status" class="select select-bordered select-sm rounded-lg">
            <option value="">All Status</option>
            <option value="0">Pending</option>
            <option value="1">Approved</option>
            <option value="2">Rejected</option>
          </select> -->

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
        <span class="ml-2 text-gray-600">Loading pending trainings...</span>
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
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Type</th>
              <!-- <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Actions</th> -->
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in filteredTrainings"
              :key="item.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <!-- ID from trainer_course record -->
              <td class="border border-gray-300 px-4 py-3 text-gray-600">{{ item.id }}</td>
              
              <!-- Course Info -->
              <td class="border border-gray-300 px-4 py-3">
                <div class="font-medium text-gray-900">{{ item.training_course?.title || 'N/A' }}</div>
                <div class="text-sm text-gray-500">{{ item.training_course?.course_code || 'N/A' }}</div>
                <div class="text-xs text-gray-400 mt-1">ID: {{ item.training_course?.course_id || 'N/A' }}</div>
              </td>
              
              <!-- Industry -->
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ getIndustryName(item.training_course?.industry_id) }}
              </td>
              
              <!-- Solution -->
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ getSolutionName(item.training_course?.solution_id) }}
              </td>
              
              <!-- Software -->
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ getSoftwareName(item.training_course?.software_id) }}
              </td>
              
              <!-- Level -->
              <td class="border border-gray-300 px-4 py-3">
                <span
                  class="px-2 py-1 rounded-full text-xs font-medium capitalize"
                  :class="{
                    'bg-blue-100 text-blue-800': item.training_course?.training_level === 'Basic' || item.training_course?.training_level?.toLowerCase() === 'basic',
                    'bg-yellow-100 text-yellow-800': item.training_course?.training_level === 'Intermediate' || item.training_course?.training_level?.toLowerCase() === 'intermediate',
                    'bg-red-100 text-red-800': item.training_course?.training_level === 'Advanced' || item.training_course?.training_level?.toLowerCase() === 'advance'
                  }"
                >
                  {{ item.training_course?.training_level || 'N/A' }}
                </span>
              </td>
              
              <!-- Duration -->
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ item.training_course?.duration || 'N/A' }}
              </td>
              
              <!-- Training Type -->
              <td class="border border-gray-300 px-4 py-3">
                <span
                  class="px-2 py-1 rounded-full text-xs font-medium capitalize"
                  :class="{
                    'bg-purple-100 text-purple-800': item.training_course?.training_type === 'Online',
                    'bg-indigo-100 text-indigo-800': item.training_course?.training_type === 'Onsite',
                    'bg-gray-100 text-gray-800': !item.training_course?.training_type
                  }"
                >
                  {{ item.training_course?.training_type || 'N/A' }}
                </span>
              </td>
              
              <!-- Actions -->
              <!-- <td class="border border-gray-300 px-4 py-3">
                <div class="flex gap-2"> -->
                  <!-- View Details -->
                  <!-- <button
                    @click="viewDetails(item)"
                    class="px-3 py-2 rounded-md shadow-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors"
                  >
                    View
                  </button> -->
                  
                  <!-- Approve Button -->
                  <!-- <button
                    @click="approveRequest(item)"
                    class="px-3 py-2 rounded-md shadow-md bg-green-600 text-white text-sm hover:bg-green-700 transition-colors"
                    :disabled="actionLoading"
                  >
                    <span v-if="actionLoading && approvingId === item.id" class="loading loading-spinner loading-xs mr-1"></span>
                    {{ actionLoading && approvingId === item.id ? 'Approving...' : 'Approve' }}
                  </button> -->
                  
                  <!-- Reject Button -->
                  <!-- <button
                    @click="rejectRequest(item)"
                    class="px-3 py-2 rounded-md shadow-md bg-orange-600 text-white text-sm hover:bg-orange-700 transition-colors"
                    :disabled="actionLoading"
                  >
                    <span v-if="actionLoading && rejectingId === item.id" class="loading loading-spinner loading-xs mr-1"></span>
                    {{ actionLoading && rejectingId === item.id ? 'Rejecting...' : 'Reject' }}
                  </button>
                </div>
              </td> -->
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="filteredTrainings.length === 0 && !loading" class="text-center py-8 text-gray-500">
          <svg class="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <p class="mt-4 text-lg">No pending training requests found</p>
          <p class="text-sm">All pending requests have been processed</p>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="filteredTrainings.length > 0 && meta" class="flex justify-between items-center mt-6">
        <div class="text-sm text-gray-600">
          Showing {{ meta.from || 0 }} to {{ meta.to || 0 }} of {{ meta.total }} pending requests
        </div>
        <div class="join">
          <button 
            v-for="link in meta.links" 
            :key="link.label" 
            class="join-item btn btn-sm"
            :class="{
              'btn-active': link.active,
              'btn-disabled': !link.url
            }"
            @click="handlePageChange(link.url)"
            v-html="link.label"
          ></button>
        </div>
      </div>
    </div>

    <!-- Training Details Modal -->
    <div v-if="selectedTraining" class="modal modal-open">
      <div class="modal-box max-w-4xl">
        <div class="flex justify-between items-center mb-6">
          <h3 class="font-bold text-lg">Training Request Details</h3>
          <button @click="selectedTraining = null" class="btn btn-sm btn-circle">✕</button>
        </div>

        <!-- Trainer Info Section -->
        <div class="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 class="font-semibold text-gray-700 mb-3">Trainer Information</h4>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="font-medium text-gray-600 text-sm">Name:</label>
              <p class="text-gray-900">{{ selectedTraining.trainer_id?.name || 'N/A' }}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600 text-sm">Email:</label>
              <p class="text-gray-900">{{ selectedTraining.trainer_id?.email || 'N/A' }}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600 text-sm">Request ID:</label>
              <p class="text-gray-900">{{ selectedTraining.id }}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600 text-sm">Request Status:</label>
              <span class="px-2 py-1 rounded-full text-xs font-medium capitalize bg-yellow-100 text-yellow-800">
                Pending
              </span>
            </div>
          </div>
        </div>

        <!-- Course Info Section -->
        <div class="mb-6">
          <h4 class="font-semibold text-gray-700 mb-3">Course Information</h4>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="font-medium text-gray-600 text-sm">Course Title:</label>
              <p class="text-gray-900">{{ selectedTraining.training_course?.title || 'N/A' }}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600 text-sm">Course Code:</label>
              <p class="text-gray-900">{{ selectedTraining.training_course?.course_code || 'N/A' }}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600 text-sm">Course ID:</label>
              <p class="text-gray-900">{{ selectedTraining.training_course?.course_id || 'N/A' }}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600 text-sm">Training Type:</label>
              <p class="text-gray-900 capitalize">{{ selectedTraining.training_course?.training_type || 'N/A' }}</p>
            </div>
          </div>
        </div>

        <!-- Technical Details -->
        <div class="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label class="font-medium text-gray-600 text-sm">Industry:</label>
            <p class="text-gray-900">{{ getIndustryName(selectedTraining.training_course?.industry_id) }}</p>
          </div>
          <div>
            <label class="font-medium text-gray-600 text-sm">Solution:</label>
            <p class="text-gray-900">{{ getSolutionName(selectedTraining.training_course?.solution_id) }}</p>
          </div>
          <div>
            <label class="font-medium text-gray-600 text-sm">Software:</label>
            <p class="text-gray-900">{{ getSoftwareName(selectedTraining.training_course?.software_id) }}</p>
          </div>
          <div>
            <label class="font-medium text-gray-600 text-sm">Training Level:</label>
            <p class="text-gray-900 capitalize">{{ selectedTraining.training_course?.training_level || 'N/A' }}</p>
          </div>
          <div>
            <label class="font-medium text-gray-600 text-sm">Duration:</label>
            <p class="text-gray-900 capitalize">{{ selectedTraining.training_course?.duration || 'N/A' }}</p>
          </div>
          <div>
            <label class="font-medium text-gray-600 text-sm">Course Status:</label>
            <span
              class="px-2 py-1 rounded-full text-xs font-medium capitalize"
              :class="{
                'bg-yellow-100 text-yellow-800': selectedTraining.training_course?.status === '0' || selectedTraining.training_course?.status === 0,
                'bg-green-100 text-green-800': selectedTraining.training_course?.status === '1' || selectedTraining.training_course?.status === 1
              }"
            >
              {{ getCourseStatusText(selectedTraining.training_course?.status) }}
            </span>
          </div>
        </div>

        <!-- Description -->
        <div class="mb-6">
          <label class="font-medium text-gray-600 text-sm">Description:</label>
          <p class="text-gray-900 mt-2 p-3 bg-gray-50 rounded-lg min-h-[60px]">
            {{ selectedTraining.training_course?.description || 'No description provided' }}
          </p>
        </div>

        <!-- Dates -->
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label class="font-medium text-gray-600 text-sm">Request Created:</label>
            <p class="text-gray-900">{{ formatDate(selectedTraining.created_at) }}</p>
          </div>
          <div>
            <label class="font-medium text-gray-600 text-sm">Course Updated:</label>
            <p class="text-gray-900">{{ formatDate(selectedTraining.training_course?.updated_at) }}</p>
          </div>
        </div>

        <!-- Modal Actions -->
        <div class="modal-action">
          <button class="btn btn-ghost" @click="selectedTraining = null">Close</button>
          <div class="flex gap-2">
            <button
              @click="approveRequest(selectedTraining)"
              class="btn btn-success text-white"
              :disabled="actionLoading"
            >
              <span v-if="actionLoading && approvingId === selectedTraining.id" class="loading loading-spinner loading-xs mr-2"></span>
              Approve Request
            </button>
            <button
              @click="rejectRequest(selectedTraining)"
              class="btn btn-warning text-white"
              :disabled="actionLoading"
            >
              <span v-if="actionLoading && rejectingId === selectedTraining.id" class="loading loading-spinner loading-xs mr-2"></span>
              Reject Request
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
import { ref, onMounted, computed, reactive, watch } from 'vue'
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
const rejectingId = ref(null)
const currentPage = ref(1)
const itemsPerPage = ref(10)
const meta = ref()

// Filters
const filters = reactive({
  date_range: '',
  search: ''
})

// Helper function to get status text
const getStatusText = (status) => {
  switch (String(status)) {
    case '0': return 'Pending'
    case '1': return 'Approved'
    case '2': return 'Rejected'
    default: return 'Unknown'
  }
}

// Helper function to get course status text
const getCourseStatusText = (status) => {
  switch (String(status)) {
    case '0': return 'Inactive'
    case '1': return 'Active'
    default: return 'Unknown'
  }
}

// Fetch trainings - ONLY PENDING (status 0)
const fetchTrainings = async () => {
  loading.value = true
  try {
    const response = await api().get('trainer-course', 
    {
      params: {
        per_page: itemsPerPage.value,
        page: currentPage.value,
        status: 1 
      }
    })
    
    trainings.value = (response.data.data.data || response.data.data).filter(e => e.status == 1)
    meta.value = response.data.meta
  } catch (error) {
    console.error('Error fetching pending trainings:', error)
    toast({
      title: 'Error',
      description: 'Failed to load pending training requests',
      variant: 'destructive'
    })
  } finally {
    loading.value = false
  }
}

// Fetch reference data (industries, solutions, softwares)
const fetchReferenceData = async () => {
  try {
    // Fetch all reference data in parallel
    const [industriesRes, solutionsRes, softwaresRes] = await Promise.all([
      api().get('industries'),
      api().get('solutions'),
      api().get('software-skills')
    ])

    // Handle different API response structures
    industries.value = industriesRes.data.data || industriesRes.data || []
    solutions.value = solutionsRes.data.data || solutionsRes.data || []
    softwares.value = softwaresRes.data.data || softwaresRes.data || []
    
  } catch (error) {
    console.error('Error fetching reference data:', error)
    toast({
      title: 'Warning',
      description: 'Failed to load reference data. Some information may not display correctly.',
      variant: 'warning'
    })
  }
}

// Helper functions to get names from IDs
const getIndustryName = (industryId) => {
  if (!industryId) return 'N/A'
  const industry = industries.value.find(ind => ind.id == industryId)
  return industry?.name || `ID: ${industryId}`
}

const getSolutionName = (solutionId) => {
  if (!solutionId) return 'N/A'
  const solution = solutions.value.find(sol => sol.id == solutionId)
  return solution?.name || `ID: ${solutionId}`
}

const getSoftwareName = (softwareId) => {
  if (!softwareId) return 'N/A'
  const software = softwares.value.find(soft => soft.id == softwareId)
  return software?.name || `ID: ${softwareId}`
}

// Handle page change
const handlePageChange = (url) => {
  if (!url) return
  
  const urlObj = new URL(url)
  const page = urlObj.searchParams.get('page')
  if (page) {
    currentPage.value = parseInt(page)
    fetchTrainings()
  }
}

// Format date
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (error) {
    return 'Invalid date'
  }
}

// Filter trainings (client-side filtering for date range and search)
const filteredTrainings = computed(() => {
  let filtered = trainings.value

  // Filter by date range
  if (filters.date_range) {
    const now = new Date()
    filtered = filtered.filter(item => {
      const createdDate = new Date(item.created_at)
      switch (filters.date_range) {
        case 'today':
          return createdDate.toDateString() === now.toDateString()
        case 'week':
          const weekAgo = new Date()
          weekAgo.setDate(now.getDate() - 7)
          return createdDate >= weekAgo
        case 'month':
          const monthAgo = new Date()
          monthAgo.setMonth(now.getMonth() - 1)
          return createdDate >= monthAgo
        default:
          return true
      }
    })
  }

  // Filter by search
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(item => {
      // Search in trainer info
      if (item.trainer_id?.name?.toLowerCase().includes(searchLower) ||
          item.trainer_id?.email?.toLowerCase().includes(searchLower)) {
        return true
      }
      
      // Search in course info
      if (item.training_course?.title?.toLowerCase().includes(searchLower) ||
          item.training_course?.course_code?.toLowerCase().includes(searchLower) ||
          item.training_course?.course_id?.toLowerCase().includes(searchLower)) {
        return true
      }
      
      // Search in related data by name
      if (getIndustryName(item.training_course?.industry_id).toLowerCase().includes(searchLower) ||
          getSolutionName(item.training_course?.solution_id).toLowerCase().includes(searchLower) ||
          getSoftwareName(item.training_course?.software_id).toLowerCase().includes(searchLower)) {
        return true
      }
      
      return false
    })
  }

  return filtered
})

// Watch filters for changes
watch([() => filters.date_range], () => {
  currentPage.value = 1 // Reset to first page when filters change
  // No need to refetch from API for client-side filters
})

// Approve training request
const approveRequest = async (item) => {
  approvingId.value = item.id
  actionLoading.value = true
  
  try {
    // Update the trainer-course status to approved (status = 1)
    await api().put(`trainer-course/${item.id}`, {
      status: 1
    })

    // Refresh the list
    await fetchTrainings()
    
    // Close modal if open
    if (selectedTraining.value?.id === item.id) {
      selectedTraining.value = null
    }

    Swal.fire({
      title: 'Approved!',
      text: 'Training request has been approved successfully.',
      icon: 'success',
      timer: 2000
    })
  } catch (error) {
    console.error('Error approving request:', error)
    toast({
      title: 'Error',
      description: 'Failed to approve request. Please try again.',
      variant: 'destructive'
    })
  } finally {
    approvingId.value = null
    actionLoading.value = false
  }
}

// Reject training request
const rejectRequest = async (item) => {
  rejectingId.value = item.id
  actionLoading.value = true
  
  try {
    const { value: reason } = await Swal.fire({
      title: 'Reject Request',
      input: 'textarea',
      inputLabel: 'Reason for rejection',
      inputPlaceholder: 'Please provide a reason for rejecting this request...',
      inputAttributes: {
        'aria-label': 'Type your rejection reason here'
      },
      showCancelButton: true,
      confirmButtonText: 'Reject',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value) {
          return 'Please provide a reason for rejection'
        }
      }
    })

    if (reason) {
      // Update the trainer-course status to rejected (status = 2)
      await api().put(`trainer-course/${item.id}`, {
        status: 2,
        rejection_reason: reason
      })

      // Refresh the list
      await fetchTrainings()
      
      // Close modal if open
      if (selectedTraining.value?.id === item.id) {
        selectedTraining.value = null
      }

      Swal.fire({
        title: 'Rejected!',
        text: 'Training request has been rejected.',
        icon: 'success',
        timer: 2000
      })
    }
  } catch (error) {
    console.error('Error rejecting request:', error)
    toast({
      title: 'Error',
      description: 'Failed to reject request. Please try again.',
      variant: 'destructive'
    })
  } finally {
    rejectingId.value = null
    actionLoading.value = false
  }
}

// View details
const viewDetails = (item) => {
  selectedTraining.value = item
}

// Fetch data on component mount
onMounted(() => {
  fetchTrainings()
  fetchReferenceData()
})
</script>

<style scoped>
.table th, .table td {
  vertical-align: middle;
}

.modal-box {
  max-height: 85vh;
  overflow-y: auto;
}
</style>