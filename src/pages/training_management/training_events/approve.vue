<template>
  <div class="px-2 bg-white py-5 w-11/12 mx-auto">
    <div class="bg-teal-700 rounded-t-2xl text-white px-6 py-4">
      <h1 class="text-2xl font-semibold">Pending Training Course Schedules</h1>
      <p class="text-gray-300">Manage schedules - approve, edit date & seats, or delete</p>
    </div>

    <div class="bg-white rounded-xl p-5 w-full shadow-md mt-5">
      <!-- Filters and Search -->
      <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div class="flex gap-4">
          <select v-model="filters.date_range" class="select select-bordered select-sm rounded-lg" @change="resetAndFetch">
            <option value="">All Dates</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
        <div class="relative">
          <input
            type="text"
            v-model="filters.search"
            placeholder="Search by course or trainer..."
            class="input input-bordered input-sm rounded-lg pl-10 w-64"
            @input="debouncedSearch"
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
        <span class="ml-2 text-gray-600">Loading schedules...</span>
      </div>

      <!-- Table -->
      <div v-else class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead class="bg-teal-50">
            <tr>
              <th class="px-4 py-3 text-left font-semibold text-gray-700">ID</th>
              <th class="px-4 py-3 text-left font-semibold text-gray-700">Course</th>
              <th class="px-4 py-3 text-left font-semibold text-gray-700">Trainer</th>
              <th class="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
              <th class="px-4 py-3 text-left font-semibold text-gray-700">Available Seats</th>
              <th class="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
              <th class="px-4 py-3 text-center font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="schedule in schedules"
              :key="schedule.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-4 py-3 text-gray-600">{{ schedule.id }}</td>
              <td class="px-4 py-3">
                <div class="font-medium text-gray-900">{{ schedule.training_course?.name }}</div>
                <div class="text-sm text-gray-500">{{ schedule.training_course?.code }}</div>
              </td>
              <td class="px-4 py-3">
                <div class="text-gray-900">{{ schedule.trainer?.name }}</div>
                <div class="text-sm text-gray-500">{{ schedule.trainer?.email }}</div>
              </td>
              <td class="px-4 py-3 text-gray-600">{{ formatDate(schedule.date) }}</td>
              <td class="px-4 py-3">
                <span :class="schedule.available_seats <= 3 ? 'text-red-600 font-bold' : 'text-gray-700'">
                  {{ schedule.available_seats }}
                </span>
              </td>
              <td class="px-4 py-3">
                <span
                  class="px-2 py-1 rounded-full text-xs font-medium"
                  :class="schedule.status == '0' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'"
                >
                  {{ schedule.status == '0' ? 'Pending' : 'Approved' }}
                </span>
              </td>
              <td class="px-4 py-3">
                <div class="flex gap-2 justify-center">
                  <!-- Edit Button -->
                  <button
                    @click="openEditModal(schedule)"
                    class="px-3 py-2 rounded-md shadow-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors"
                    :disabled="actionLoading"
                  >
                    Edit
                  </button>
                  <!-- Approve Button (only for pending) -->
                  <button
                    v-if="schedule.status == '0'"
                    class="px-3 py-2 rounded-md shadow-md bg-green-600 text-white text-sm hover:bg-green-700 transition-colors"
                    @click="approveSchedule(schedule)"
                    :disabled="actionLoading"
                  >
                    <span v-if="actionLoading && approvingId === schedule.id" class="loading loading-spinner loading-xs"></span>
                    <span v-else>Approve</span>
                  </button>
                  <!-- Delete Button -->
                  <button
                    @click="deleteSchedule(schedule.id)"
                    class="px-3 py-2 rounded-md shadow-md bg-red-600 text-white text-sm hover:bg-red-700 transition-colors"
                    :disabled="actionLoading"
                  >
                    <span v-if="actionLoading && deletingId === schedule.id" class="loading loading-spinner loading-xs"></span>
                    <span v-else>Delete</span>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="schedules.length === 0">
              <td colspan="7" class="text-center py-8 text-gray-500">
                No pending schedules found
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination with Previous, Next, and Last Page -->
        <div v-if="total > 0" class="flex justify-between items-center mt-6 flex-wrap gap-4">
          <div class="text-sm text-gray-600">
            Showing {{ from }} to {{ to }} of {{ total }} records
          </div>
          <div class="join">
            <!-- Previous Button -->
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="!prevPageUrl"
              class="join-item btn btn-sm"
              :class="{ 'btn-disabled': !prevPageUrl }"
            >
              Previous
            </button>
            
            <!-- First Page Button -->
            <button
              v-if="currentPage > 2"
              @click="goToPage(1)"
              class="join-item btn btn-sm"
            >
              1
            </button>
            
            <button v-if="currentPage > 3" class="join-item btn btn-sm btn-disabled">...</button>
            
            <!-- Page Number Buttons -->
            <button
              v-for="page in displayedPages"
              :key="page"
              @click="goToPage(page)"
              class="join-item btn btn-sm"
              :class="{ 'btn-active bg-teal-600 text-white': page === currentPage }"
            >
              {{ page }}
            </button>
            
            <button v-if="currentPage < lastPage - 2" class="join-item btn btn-sm btn-disabled">...</button>
            
            <!-- Last Page Button -->
            <button
              v-if="currentPage < lastPage - 1"
              @click="goToPage(lastPage)"
              class="join-item btn btn-sm"
            >
              {{ lastPage }}
            </button>
            
            <!-- Next Button -->
            <button
              @click="goToPage(currentPage + 1)"
              :disabled="!nextPageUrl"
              class="join-item btn btn-sm"
              :class="{ 'btn-disabled': !nextPageUrl }"
            >
              Next
            </button>
          </div>
          
          <!-- Per Page Selector -->
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600">Show:</span>
            <select v-model="perPage" @change="resetToFirstPage" class="select select-bordered select-sm rounded-lg">
              <option :value="10">10</option>
              <option :value="15">15</option>
              <option :value="25">25</option>
              <option :value="50">50</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal (only date and available_seats) -->
    <div v-if="editModalOpen" class="modal modal-open">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">Edit Schedule</h3>
        <p class="text-sm text-gray-500 mb-4">Update date and available seats only</p>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Course</label>
          <input type="text" :value="editForm.courseName" class="w-full px-3 py-2 border rounded-lg bg-gray-100" disabled />
        </div>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Schedule Date *</label>
          <input type="date" v-model="editForm.date" class="w-full px-3 py-2 border rounded-lg" required />
        </div>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Available Seats *</label>
          <input type="number" v-model.number="editForm.available_seats" min="0" class="w-full px-3 py-2 border rounded-lg" required />
        </div>
        
        <div class="modal-action">
          <button class="btn" @click="closeEditModal">Cancel</button>
          <button class="btn btn-primary text-white bg-teal-600 hover:bg-teal-700" @click="submitEdit" :disabled="editLoading">
            <span v-if="editLoading" class="loading loading-spinner loading-xs mr-1"></span>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
import Swal from 'sweetalert2'
import api from '@/config/api'

// Data
const schedules = ref([])
const loading = ref(false)
const actionLoading = ref(false)
const approvingId = ref(null)
const deletingId = ref(null)
const currentPage = ref(1)
const perPage = ref(15)
const total = ref(0)
const from = ref(0)
const to = ref(0)
const lastPage = ref(1)
const nextPageUrl = ref(null)
const prevPageUrl = ref(null)
const firstPageUrl = ref(null)
const lastPageUrl = ref(null)
const editModalOpen = ref(false)
const editLoading = ref(false)
const currentEditId = ref(null)
const searchTimeout = ref(null)

const editForm = reactive({
  id: null,
  date: '',
  available_seats: 0,
  courseName: ''
})

// Filters
const filters = reactive({
  date_range: '',
  search: ''
})

// Computed for displayed page numbers
const displayedPages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(lastPage.value, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// Fetch schedules with pagination and filters
const fetchSchedules = async () => {
  loading.value = true
  try {
    let url = `/admin/training-course-schedules?page=${currentPage.value}&per_page=${perPage.value}&status=0&training_type=group&with=trainer,trainingCourse`
    
    // Add filters if present
    if (filters.date_range) {
      url += `&date_range=${filters.date_range}`
    }
    if (filters.search) {
      url += `&search=${filters.search}`
    }
    
    const response = await api().get(url)
    const responseData = response.data.data
    
    // Filter only pending schedules (status = "0")
    schedules.value = responseData.data
    
    // Update pagination info
    currentPage.value = responseData.current_page
    perPage.value = responseData.per_page
    total.value = responseData.total
    from.value = responseData.from
    to.value = responseData.to
    lastPage.value = responseData.last_page
    nextPageUrl.value = responseData.next_page_url
    prevPageUrl.value = responseData.prev_page_url
    firstPageUrl.value = responseData.first_page_url
    lastPageUrl.value = responseData.last_page_url
    
  } catch (error) {
    console.error('Error fetching schedules:', error)
    Swal.fire({
      title: 'Error',
      text: 'Failed to load schedules',
      icon: 'error'
    })
  } finally {
    loading.value = false
  }
}

// Go to specific page
const goToPage = (page) => {
  if (page < 1 || page > lastPage.value) return
  if (page === currentPage.value) return
  currentPage.value = page
  fetchSchedules()
}

// Reset to first page
const resetToFirstPage = () => {
  currentPage.value = 1
  fetchSchedules()
}

// Reset and fetch
const resetAndFetch = () => {
  currentPage.value = 1
  fetchSchedules()
}

// Debounced search
const debouncedSearch = () => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }
  searchTimeout.value = setTimeout(() => {
    currentPage.value = 1
    fetchSchedules()
  }, 500)
}

// Format date helper
const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

// Delete schedule using DELETE API: /admin/training-course-schedules/{id}
const deleteSchedule = async (scheduleId) => {
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

  deletingId.value = scheduleId
  actionLoading.value = true

  try {
    await api().delete(`/admin/training-course-schedules/${scheduleId}`)
    
    Swal.fire({
      title: 'Deleted!',
      text: 'Schedule has been deleted.',
      icon: 'success'
    })
    
    // Refresh current page
    fetchSchedules()
    
    // Close modal if open for this item
    if (editModalOpen.value && currentEditId.value === scheduleId) {
      closeEditModal()
    }
  } catch (error) {
    console.error('Error deleting schedule:', error)
    Swal.fire({
      title: 'Error',
      text: 'Failed to delete schedule',
      icon: 'error'
    })
  } finally {
    actionLoading.value = false
    deletingId.value = null
  }
}

// Approve schedule (update status to 1 using PUT)
const approveSchedule = async (schedule) => {
  approvingId.value = schedule.id
  actionLoading.value = true

  try {
    // Prepare payload - only updating status to approved (1)
    const payload = {
      training_course_id: schedule.training_course_id,
      date: schedule.date,
      trainer_id: schedule.trainer_id,
      available_seats: schedule.available_seats,
      status: 1,
      _method: 'PUT' 
    }

    await api().post(`/admin/training-course-schedules/${schedule.id}`, payload)

    Swal.fire({
      title: 'Approved!',
      text: `Schedule for "${schedule.training_course?.name}" has been approved.`,
      icon: 'success'
    })

    // Refresh current page
    fetchSchedules()
  } catch (error) {
    console.error('Error approving schedule:', error)
    Swal.fire({
      title: 'Error',
      text: 'Failed to approve schedule. Please try again.',
      icon: 'error'
    })
  } finally {
    actionLoading.value = false
    approvingId.value = null
  }
}

// Open edit modal (only date and available_seats)
const openEditModal = (schedule) => {
  currentEditId.value = schedule.id
  editForm.id = schedule.id
  editForm.date = schedule.date
  editForm.available_seats = schedule.available_seats
  editForm.courseName = schedule.training_course?.name || 'Unknown Course'
  editModalOpen.value = true
}

// Close edit modal
const closeEditModal = () => {
  editModalOpen.value = false
  currentEditId.value = null
  editForm.id = null
  editForm.date = ''
  editForm.available_seats = 0
  editForm.courseName = ''
}

// Submit edit using PUT API: /admin/training-course-schedules/{id}
const submitEdit = async () => {
  if (!editForm.date) {
    Swal.fire({
      title: 'Error',
      text: 'Please select a date',
      icon: 'error'
    })
    return
  }
  
  if (editForm.available_seats < 0) {
    Swal.fire({
      title: 'Error',
      text: 'Available seats cannot be negative',
      icon: 'error'
    })
    return
  }

  editLoading.value = true

  try {
    // Get the original schedule to preserve other fields
    const originalSchedule = schedules.value.find(s => s.id === editForm.id)
    
    if (!originalSchedule) {
      throw new Error('Schedule not found')
    }

    // Prepare payload with all required fields, only updating date and available_seats
    const payload = {
      training_course_id: originalSchedule.training_course_id,
      date: editForm.date,
      trainer_id: originalSchedule.trainer_id,
      available_seats: editForm.available_seats,
      status: originalSchedule.status,
      _method: 'PUT'
    }

    await api().post(`/admin/training-course-schedules/${editForm.id}`, payload)

    Swal.fire({
      title: 'Updated!',
      text: 'Schedule has been updated successfully.',
      icon: 'success'
    })

    // Refresh current page
    fetchSchedules()
    closeEditModal()
  } catch (error) {
    console.error('Error updating schedule:', error)
    Swal.fire({
      title: 'Error',
      text: 'Failed to update schedule',
      icon: 'error'
    })
  } finally {
    editLoading.value = false
  }
}

// Fetch data on mount
onMounted(() => {
  fetchSchedules()
})
</script>

<style scoped>
.table-zebra tbody tr:nth-child(even) {
  background-color: #f9fafb;
}
</style>