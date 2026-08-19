<template>
  <div class="px-2 bg-white py-5 w-11/12 mx-auto">
    <div class="bg-yellow-700 rounded-t-2xl text-white px-6 py-4">
      <h1 class="text-2xl font-semibold">Pending courses</h1>
      <p class="text-gray-300">All pending training schedule</p>
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
        <span class="ml-2 text-gray-600">Loading pending trainings...</span>
      </div>

      <!-- Table -->
      <div v-else class="overflow-x-auto">
        <table class="table table-auto w-full border-collapse border border-gray-200">
          <thead class="bg-teal-50">
            <tr>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">ID</th>
              <!-- <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Trainer</th> -->
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Course Title</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Start Date</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">End Date</th>
              <!-- <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Days</th> -->
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Status</th>
              <!-- <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Actions</th> -->
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in filteredTrainings"
              :key="item.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <!-- ID from trainer_schedule record -->
              <td class="border border-gray-300 px-4 py-3 text-gray-600">{{ item.id }}</td>
              
              <!-- Trainer Info -->
              <!-- <td class="border border-gray-300 px-4 py-3">
                <div class="font-medium text-gray-900">{{ item.trainer_id?.name || 'N/A' }}</div>
                <div class="text-sm text-gray-500">{{ item.trainer_id?.email || 'N/A' }}</div>
              </td> -->
              
              <!-- Course Info -->
              <td class="border border-gray-300 px-4 py-3">
                <div class="font-medium text-gray-900">{{ item.training_courses?.title || 'N/A' }}</div>
                <div class="text-sm text-gray-500">{{ item.training_courses?.course_code || 'N/A' }}</div>
                <div class="text-xs text-gray-400 mt-1">ID: {{ item.training_courses?.course_id || 'N/A' }}</div>
              </td>
              
              <!-- Start Date -->
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ formatDate(item.start_date) }}
              </td>
              
              <!-- End Date -->
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ formatDate(item.end_date) }}
              </td>
              
              <!-- Days -->
              <!-- <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ item.days || 'N/A' }}
              </td> -->
              
              <!-- Status -->
              <td class="border border-gray-300 px-4 py-3">
                <span
                  class="px-2 py-1 rounded-full text-xs font-medium capitalize"
                  :class="{
                    'bg-yellow-100 text-yellow-800': item.status === '0' || item.status === 0,
                    'bg-green-100 text-green-800': item.status === '1' || item.status === 1,
                    'bg-red-100 text-red-800': item.status === '2' || item.status === 2
                  }"
                >
                  {{ getStatusText(item.status) }}
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
                    v-if="item.status === '0' || item.status === 0"
                    @click="approveSchedule(item)"
                    class="px-3 py-2 rounded-md shadow-md bg-green-600 text-white text-sm hover:bg-green-700 transition-colors"
                    :disabled="actionLoading"
                  >
                    <span v-if="actionLoading && approvingId === item.id" class="loading loading-spinner loading-xs mr-1"></span>
                    {{ actionLoading && approvingId === item.id ? 'Approving...' : 'Approve' }}
                  </button> -->
                  
                  <!-- Reject Button -->
                  <!-- <button
                    v-if="item.status === '0' || item.status === 0"
                    @click="rejectSchedule(item)"
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
          <p class="mt-4 text-lg">No pending training schedules found</p>
          <p class="text-sm">All pending schedules have been processed</p>
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

    <!-- Schedule Details Modal -->
    <div v-if="selectedSchedule" class="modal modal-open">
      <div class="modal-box max-w-4xl">
        <div class="flex justify-between items-center mb-6">
          <h3 class="font-bold text-lg">Training Schedule Details</h3>
          <button @click="selectedSchedule = null" class="btn btn-sm btn-circle">✕</button>
        </div>

        <!-- Trainer Info Section -->
        <div class="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 class="font-semibold text-gray-700 mb-3">Trainer Information</h4>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="font-medium text-gray-600 text-sm">Name:</label>
              <p class="text-gray-900">{{ selectedSchedule.trainer_id?.name || 'N/A' }}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600 text-sm">Email:</label>
              <p class="text-gray-900">{{ selectedSchedule.trainer_id?.email || 'N/A' }}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600 text-sm">Schedule ID:</label>
              <p class="text-gray-900">{{ selectedSchedule.id }}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600 text-sm">Status:</label>
              <span
                class="px-2 py-1 rounded-full text-xs font-medium capitalize"
                :class="{
                  'bg-yellow-100 text-yellow-800': selectedSchedule.status === '0' || selectedSchedule.status === 0,
                  'bg-green-100 text-green-800': selectedSchedule.status === '1' || selectedSchedule.status === 1,
                  'bg-red-100 text-red-800': selectedSchedule.status === '2' || selectedSchedule.status === 2
                }"
              >
                {{ getStatusText(selectedSchedule.status) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Schedule Dates Section -->
        <div class="mb-6">
          <h4 class="font-semibold text-gray-700 mb-3">Schedule Information</h4>
          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="font-medium text-gray-600 text-sm">Start Date:</label>
              <p class="text-gray-900">{{ formatDate(selectedSchedule.start_date) }}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600 text-sm">End Date:</label>
              <p class="text-gray-900">{{ formatDate(selectedSchedule.end_date) }}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600 text-sm">Duration:</label>
              <p class="text-gray-900">{{ selectedSchedule.days || 'N/A' }} day(s)</p>
            </div>
          </div>
        </div>

        <!-- Course Info Section -->
        <div class="mb-6">
          <h4 class="font-semibold text-gray-700 mb-3">Course Information</h4>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="font-medium text-gray-600 text-sm">Course Title:</label>
              <p class="text-gray-900">{{ selectedSchedule.training_courses?.title || 'N/A' }}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600 text-sm">Course Code:</label>
              <p class="text-gray-900">{{ selectedSchedule.training_courses?.course_code || 'N/A' }}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600 text-sm">Course ID:</label>
              <p class="text-gray-900">{{ selectedSchedule.training_courses?.course_id || 'N/A' }}</p>
            </div>
            <div>
              <label class="font-medium text-gray-600 text-sm">Training Type:</label>
              <p class="text-gray-900 capitalize">{{ selectedSchedule.training_courses?.training_type || 'N/A' }}</p>
            </div>
          </div>
        </div>

        <!-- Technical Details -->
        <div class="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label class="font-medium text-gray-600 text-sm">Industry:</label>
            <p class="text-gray-900">{{ getIndustryName(selectedSchedule.training_courses?.industry_id) }}</p>
          </div>
          <div>
            <label class="font-medium text-gray-600 text-sm">Solution:</label>
            <p class="text-gray-900">{{ getSolutionName(selectedSchedule.training_courses?.solution_id) }}</p>
          </div>
          <div>
            <label class="font-medium text-gray-600 text-sm">Software:</label>
            <p class="text-gray-900">{{ getSoftwareName(selectedSchedule.training_courses?.software_id) }}</p>
          </div>
          <div>
            <label class="font-medium text-gray-600 text-sm">Training Level:</label>
            <p class="text-gray-900 capitalize">{{ selectedSchedule.training_courses?.training_level || 'N/A' }}</p>
          </div>
          <div>
            <label class="font-medium text-gray-600 text-sm">Course Duration:</label>
            <p class="text-gray-900 capitalize">{{ selectedSchedule.training_courses?.duration || 'N/A' }}</p>
          </div>
          <div>
            <label class="font-medium text-gray-600 text-sm">Course Status:</label>
            <span
              class="px-2 py-1 rounded-full text-xs font-medium capitalize"
              :class="{
                'bg-yellow-100 text-yellow-800': selectedSchedule.training_courses?.status === '0' || selectedSchedule.training_courses?.status === 0,
                'bg-green-100 text-green-800': selectedSchedule.training_courses?.status === '1' || selectedSchedule.training_courses?.status === 1
              }"
            >
              {{ getCourseStatusText(selectedSchedule.training_courses?.status) }}
            </span>
          </div>
        </div>

        <!-- Description -->
        <div class="mb-6">
          <label class="font-medium text-gray-600 text-sm">Description:</label>
          <p class="text-gray-900 mt-2 p-3 bg-gray-50 rounded-lg min-h-[60px]">
            {{ selectedSchedule.training_courses?.description || 'No description provided' }}
          </p>
        </div>

        <!-- Notes -->
        <div v-if="selectedSchedule.notes" class="mb-6">
          <label class="font-medium text-gray-600 text-sm">Schedule Notes:</label>
          <p class="text-gray-900 mt-2 p-3 bg-blue-50 rounded-lg min-h-[60px]">
            {{ selectedSchedule.notes }}
          </p>
        </div>

        <!-- Dates -->
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label class="font-medium text-gray-600 text-sm">Schedule Created:</label>
            <p class="text-gray-900">{{ formatDate(selectedSchedule.created_at) }}</p>
          </div>
          <div>
            <label class="font-medium text-gray-600 text-sm">Course Updated:</label>
            <p class="text-gray-900">{{ formatDate(selectedSchedule.training_courses?.updated_at) }}</p>
          </div>
        </div>

        <!-- Modal Actions -->
        <div class="modal-action">
          <button class="btn btn-ghost" @click="selectedSchedule = null">Close</button>
          <div v-if="selectedSchedule.status === '0' || selectedSchedule.status === 0" class="flex gap-2">
            <button
              @click="approveSchedule(selectedSchedule)"
              class="btn btn-success text-white"
              :disabled="actionLoading"
            >
              <span v-if="actionLoading && approvingId === selectedSchedule.id" class="loading loading-spinner loading-xs mr-2"></span>
              Approve Schedule
            </button>
            <button
              @click="rejectSchedule(selectedSchedule)"
              class="btn btn-warning text-white"
              :disabled="actionLoading"
            >
              <span v-if="actionLoading && rejectingId === selectedSchedule.id" class="loading loading-spinner loading-xs mr-2"></span>
              Reject Schedule
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
const schedules = ref([])
const industries = ref([])
const solutions = ref([])
const softwares = ref([])
const selectedSchedule = ref(null)
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

// Fetch schedules - ONLY PENDING (status 0)
const fetchSchedules = async () => {
  loading.value = true
  try {
    const response = await api().get('trainer-schedule', 
    {
      params: {
        per_page: itemsPerPage.value,
        page: currentPage.value,
        status: 0,
        with: 'trainer,training_courses.industry,training_courses.solution,training_courses.software'
      }
    })
    
    // Filter for status 0 if API doesn't filter
    const allSchedules = response.data.data.data || response.data.data
    schedules.value = allSchedules.filter(schedule => schedule.status == '0' || schedule.status == 0)
    meta.value = response.data.meta
    
    console.log('Fetched schedules:', schedules.value) // Debug log
  } catch (error) {
    console.error('Error fetching pending schedules:', error)
    toast({
      title: 'Error',
      description: 'Failed to load pending training schedules',
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
    fetchSchedules()
  }
}

// Format date
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch (error) {
    return 'Invalid date'
  }
}

// Format date with time
const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A'
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
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

// Filter schedules (client-side filtering for date range and search)
const filteredTrainings = computed(() => {
  let filtered = schedules.value

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
      
      // Search in course info - CHANGED: training_courses instead of training_course
      if (item.training_courses?.title?.toLowerCase().includes(searchLower) ||
          item.training_courses?.course_code?.toLowerCase().includes(searchLower) ||
          item.training_courses?.course_id?.toLowerCase().includes(searchLower)) {
        return true
      }
      
      // Search in related data by name
      if (getIndustryName(item.training_courses?.industry_id).toLowerCase().includes(searchLower) ||
          getSolutionName(item.training_courses?.solution_id).toLowerCase().includes(searchLower) ||
          getSoftwareName(item.training_courses?.software_id).toLowerCase().includes(searchLower)) {
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

// Approve schedule
const approveSchedule = async (item) => {
  approvingId.value = item.id
  actionLoading.value = true
  
  try {
    // Update the trainer-schedule status to approved (status = 1)
    await api().put(`trainer-schedule/${item.id}`, {
      status: 1
    })

    // Refresh the list
    await fetchSchedules()
    
    // Close modal if open
    if (selectedSchedule.value?.id === item.id) {
      selectedSchedule.value = null
    }

    Swal.fire({
      title: 'Approved!',
      text: 'Training schedule has been approved successfully.',
      icon: 'success',
      timer: 2000
    })
  } catch (error) {
    console.error('Error approving schedule:', error)
    toast({
      title: 'Error',
      description: 'Failed to approve schedule. Please try again.',
      variant: 'destructive'
    })
  } finally {
    approvingId.value = null
    actionLoading.value = false
  }
}

// Reject schedule
const rejectSchedule = async (item) => {
  rejectingId.value = item.id
  actionLoading.value = true
  
  try {
    const { value: reason } = await Swal.fire({
      title: 'Reject Schedule',
      input: 'textarea',
      inputLabel: 'Reason for rejection',
      inputPlaceholder: 'Please provide a reason for rejecting this schedule...',
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
      // Update the trainer-schedule status to rejected (status = 2)
      await api().put(`trainer-schedule/${item.id}`, {
        status: 2,
        rejection_reason: reason
      })

      // Refresh the list
      await fetchSchedules()
      
      // Close modal if open
      if (selectedSchedule.value?.id === item.id) {
        selectedSchedule.value = null
      }

      Swal.fire({
        title: 'Rejected!',
        text: 'Training schedule has been rejected.',
        icon: 'success',
        timer: 2000
      })
    }
  } catch (error) {
    console.error('Error rejecting schedule:', error)
    toast({
      title: 'Error',
      description: 'Failed to reject schedule. Please try again.',
      variant: 'destructive'
    })
  } finally {
    rejectingId.value = null
    actionLoading.value = false
  }
}

// View details
const viewDetails = (item) => {
  selectedSchedule.value = item
}

// Fetch data on component mount
onMounted(() => {
  fetchSchedules()
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