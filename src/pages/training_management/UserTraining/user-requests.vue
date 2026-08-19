<template>
  <div class="training-requests-container">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Training Requests Management</h1>
      <p class="text-gray-600 mt-1">Manage and process training requests from clients</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      <div class="bg-white rounded-lg shadow p-4 border-l-4 border-gray-500">
        <div class="text-sm text-gray-600">Total Requests</div>
        <div class="text-2xl font-bold">{{ stats.total }}</div>
      </div>
      <div class="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
        <div class="text-sm text-gray-600">Pending</div>
        <div class="text-2xl font-bold text-yellow-600">{{ stats.pending }}</div>
      </div>
      <div class="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
        <div class="text-sm text-gray-600">Under Review</div>
        <div class="text-2xl font-bold text-blue-600">{{ stats.under_review }}</div>
      </div>
      <div class="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
        <div class="text-sm text-gray-600">Approved</div>
        <div class="text-2xl font-bold text-green-600">{{ stats.approved }}</div>
      </div>
      <div class="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
        <div class="text-sm text-gray-600">Completed</div>
        <div class="text-2xl font-bold text-purple-600">{{ stats.completed }}</div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow mb-6 p-4">
      <div class="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select v-model="filters.status" @change="fetchRequests" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="under_review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Training Type</label>
          <select v-model="filters.training_type" @change="fetchRequests" class="w-full rounded-md border-gray-300 shadow-sm">
            <option value="">All Types</option>
            <option value="onsite">Onsite</option>
            <option value="online">Online</option>
            <option value="webinar">Webinar</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
          <select v-model="filters.experience_level" @change="fetchRequests" class="w-full rounded-md border-gray-300 shadow-sm">
            <option value="">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input 
            type="text" 
            v-model="filters.search" 
            @input="debouncedSearch"
            placeholder="Search by name, email, organization, course..."
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div class="flex items-end">
          <button @click="resetFilters" class="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
            Reset Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Info</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Details</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Training Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="request in requests" :key="request.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #{{ request.id }}
              </td>
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900">{{ request.full_name }}</div>
                <div class="text-sm text-gray-500">{{ request.email }}</div>
                <div class="text-sm text-gray-500">{{ request.organization }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">{{ request.course_name }}</div>
                <div class="text-sm text-gray-500">Code: {{ request.course_code }}</div>
                <div class="text-sm text-gray-500">Participants: {{ request.number_of_participants }}</div>
              </td>
              <td class="px-6 py-4">
                <span :class="getTrainingTypeBadgeClass(request.training_type)" class="px-2 py-1 text-xs rounded-full">
                  {{ getTrainingTypeLabel(request.training_type) }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span :class="getStatusBadgeClass(request.status)" class="px-2 py-1 text-xs rounded-full">
                  {{ getStatusLabel(request.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(request.created_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button @click="viewRequest(request)" class="text-blue-600 hover:text-blue-900 mr-3">
                  View Details
                </button>
                <button 
                  v-if="request.status === 'pending' || request.status === 'under_review'"
                  @click="openApprovalModal(request)" 
                  class="text-green-600 hover:text-green-900"
                >
                  Process
                </button>
              </td>
            </tr>
            
            <tr v-if="requests.length === 0">
              <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                No training requests found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} results
          </div>
          <div class="flex gap-2">
            <button 
              @click="changePage(pagination.current_page - 1)" 
              :disabled="pagination.current_page === 1"
              class="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <span class="px-3 py-1">
              Page {{ pagination.current_page }} of {{ pagination.last_page }}
            </span>
            <button 
              @click="changePage(pagination.current_page + 1)" 
              :disabled="pagination.current_page === pagination.last_page"
              class="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- View Details Modal -->
    <div v-if="showViewModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click.self="closeViewModal">
      <div class="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-lg bg-white">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-900">Training Request Details</h2>
          <button @click="closeViewModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="overflow-y-auto max-h-[70vh]">
          <div v-if="selectedRequest" class="space-y-6">
            <!-- Personal Information -->
            <div class="border-b pb-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="text-sm text-gray-500">Full Name</label>
                  <p class="font-medium">{{ selectedRequest.full_name }}</p>
                </div>
                <div>
                  <label class="text-sm text-gray-500">Email</label>
                  <p class="font-medium">{{ selectedRequest.email }}</p>
                </div>
                <div>
                  <label class="text-sm text-gray-500">Phone</label>
                  <p class="font-medium">{{ selectedRequest.phone || 'N/A' }}</p>
                </div>
                <div>
                  <label class="text-sm text-gray-500">Organization</label>
                  <p class="font-medium">{{ selectedRequest.organization }}</p>
                </div>
                <div>
                  <label class="text-sm text-gray-500">Job Title</label>
                  <p class="font-medium">{{ selectedRequest.job_title || 'N/A' }}</p>
                </div>
              </div>
            </div>
            
            <!-- Course Information -->
            <div class="border-b pb-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Course Information</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="text-sm text-gray-500">Course Name</label>
                  <p class="font-medium">{{ selectedRequest.course_name }}</p>
                </div>
                <div>
                  <label class="text-sm text-gray-500">Course Code</label>
                  <p class="font-medium">{{ selectedRequest.course_code }}</p>
                </div>
                <div>
                  <label class="text-sm text-gray-500">Training Type</label>
                  <p class="font-medium">{{ getTrainingTypeLabel(selectedRequest.training_type) }}</p>
                </div>
                <div>
                  <label class="text-sm text-gray-500">Experience Level</label>
                  <p class="font-medium">{{ getExperienceLevelLabel(selectedRequest.experience_level) }}</p>
                </div>
                <div>
                  <label class="text-sm text-gray-500">Software</label>
                  <p class="font-medium">{{ selectedRequest.software || 'N/A' }}</p>
                </div>
                <div>
                  <label class="text-sm text-gray-500">Solution Area</label>
                  <p class="font-medium">{{ selectedRequest.solution_area || 'N/A' }}</p>
                </div>
                <div>
                  <label class="text-sm text-gray-500">Course Price</label>
                  <p class="font-medium">{{ selectedRequest.course_price ? formatPrice(selectedRequest.course_price) : 'N/A' }}</p>
                </div>
                <div>
                  <label class="text-sm text-gray-500">Number of Participants</label>
                  <p class="font-medium">{{ selectedRequest.number_of_participants }}</p>
                </div>
              </div>
            </div>
            
            <!-- Training Preferences -->
            <div class="border-b pb-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Training Preferences</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="text-sm text-gray-500">Preferred Format</label>
                  <p class="font-medium">{{ getPreferredFormatLabel(selectedRequest.preferred_format) }}</p>
                </div>
                <div>
                  <label class="text-sm text-gray-500">Preferred Start Date</label>
                  <p class="font-medium">{{ selectedRequest.preferred_start_date ? formatDate(selectedRequest.preferred_start_date) : 'N/A' }}</p>
                </div>
                <div>
                  <label class="text-sm text-gray-500">Time Zone</label>
                  <p class="font-medium">{{ selectedRequest.preferred_timezone || 'N/A' }}</p>
                </div>
              </div>
            </div>
            
            <!-- Additional Information -->
            <div class="border-b pb-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Additional Information</h3>
              <div class="space-y-3">
                <div v-if="selectedRequest.comments">
                  <label class="text-sm text-gray-500">Comments</label>
                  <p class="text-gray-700">{{ selectedRequest.comments }}</p>
                </div>
                <div v-if="selectedRequest.specific_goals">
                  <label class="text-sm text-gray-500">Specific Goals</label>
                  <p class="text-gray-700">{{ selectedRequest.specific_goals }}</p>
                </div>
                <div v-if="selectedRequest.previous_experience">
                  <label class="text-sm text-gray-500">Previous Experience</label>
                  <p class="text-gray-700">{{ selectedRequest.previous_experience }}</p>
                </div>
              </div>
            </div>
            
            <!-- Admin Information (if available) -->
            <div v-if="selectedRequest.admin_notes || selectedRequest.scheduled_date" class="border-b pb-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Administrative Information</h3>
              <div class="grid grid-cols-2 gap-4">
                <div v-if="selectedRequest.admin_notes">
                  <label class="text-sm text-gray-500">Admin Notes</label>
                  <p class="text-gray-700">{{ selectedRequest.admin_notes }}</p>
                </div>
                <div v-if="selectedRequest.scheduled_date">
                  <label class="text-sm text-gray-500">Scheduled Date</label>
                  <p class="font-medium">{{ formatDate(selectedRequest.scheduled_date) }}</p>
                </div>
                <div v-if="selectedRequest.scheduled_time">
                  <label class="text-sm text-gray-500">Scheduled Time</label>
                  <p class="font-medium">{{ selectedRequest.scheduled_time }}</p>
                </div>
                <div v-if="selectedRequest.meeting_link">
                  <label class="text-sm text-gray-500">Meeting Link</label>
                  <a :href="selectedRequest.meeting_link" target="_blank" class="text-blue-600 hover:underline">{{ selectedRequest.meeting_link }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex justify-end gap-3 mt-6 pt-4 border-t">
          <button @click="closeViewModal" class="px-4 py-2 border rounded-md hover:bg-gray-50">
            Close
          </button>
          <button 
            v-if="selectedRequest && (selectedRequest.status === 'pending' || selectedRequest.status === 'under_review')"
            @click="openApprovalModal(selectedRequest)" 
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Process Request
          </button>
        </div>
      </div>
    </div>

    <!-- Approval Modal -->
    <div v-if="showApprovalModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click.self="closeApprovalModal">
      <div class="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-lg bg-white">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-900">Process Training Request</h2>
          <button @click="closeApprovalModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="overflow-y-auto max-h-[70vh]">
          <div v-if="selectedRequest" class="space-y-6">
            <!-- Request Summary -->
            <div class="bg-gray-50 p-4 rounded-lg">
              <h3 class="font-semibold text-gray-900 mb-2">Request Summary</h3>
              <div class="grid grid-cols-2 gap-2 text-sm">
                <div><span class="text-gray-500">Client:</span> {{ selectedRequest.full_name }}</div>
                <div><span class="text-gray-500">Course:</span> {{ selectedRequest.course_name }}</div>
                <div><span class="text-gray-500">Organization:</span> {{ selectedRequest.organization }}</div>
                <div><span class="text-gray-500">Participants:</span> {{ selectedRequest.number_of_participants }}</div>
              </div>
            </div>
            
            <!-- Status Update -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
              <select v-model="approvalForm.status" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="under_review">Under Review</option>
                <option value="approved">Approve</option>
                <option value="rejected">Reject</option>
                <option value="scheduled">Schedule Training</option>
              </select>
            </div>
            
            <!-- Scheduling Information (shown when status is scheduled) -->
            <div v-if="approvalForm.status === 'scheduled'" class="border-t pt-4">
              <h3 class="font-semibold text-gray-900 mb-3">Schedule Information</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Scheduled Date</label>
                  <input type="date" v-model="approvalForm.scheduled_date" class="w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Scheduled Time</label>
                  <input type="time" v-model="approvalForm.scheduled_time" class="w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div class="col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Meeting Link (for online training)</label>
                  <input type="url" v-model="approvalForm.meeting_link" placeholder="https://meet.google.com/..." class="w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div class="col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Location (for onsite training)</label>
                  <input type="text" v-model="approvalForm.location" placeholder="Training venue address" class="w-full rounded-md border-gray-300 shadow-sm" />
                </div>
              </div>
            </div>
            
            <!-- Admin Notes -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Admin Notes</label>
              <textarea 
                v-model="approvalForm.admin_notes" 
                rows="4" 
                placeholder="Add any notes about this request..."
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              ></textarea>
            </div>
            
            <!-- Payment Information -->
            <div class="border-t pt-4">
              <h3 class="font-semibold text-gray-900 mb-3">Payment Information</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                  <select v-model="approvalForm.payment_status" class="w-full rounded-md border-gray-300 shadow-sm">
                    <option value="not_required">Not Required</option>
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="waived">Waived</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Amount Paid</label>
                  <input type="number" step="0.01" v-model="approvalForm.amount_paid" class="w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div class="col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Payment Reference</label>
                  <input type="text" v-model="approvalForm.payment_reference" placeholder="Invoice/Transaction ID" class="w-full rounded-md border-gray-300 shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex justify-end gap-3 mt-6 pt-4 border-t">
          <button @click="closeApprovalModal" class="px-4 py-2 border rounded-md hover:bg-gray-50">
            Cancel
          </button>
          <button @click="updateRequest" :disabled="processing" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
            {{ processing ? 'Processing...' : 'Update Request' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'

// State
const requests = ref([])
const selectedRequest = ref(null)
const showViewModal = ref(false)
const showApprovalModal = ref(false)
const processing = ref(false)

// Filters
const filters = reactive({
  status: '',
  training_type: '',
  experience_level: '',
  search: ''
})

// Pagination
const pagination = reactive({
  current_page: 1,
  last_page: 1,
  per_page: 15,
  total: 0,
  from: 0,
  to: 0
})

// Stats
const stats = reactive({
  total: 0,
  pending: 0,
  under_review: 0,
  approved: 0,
  completed: 0
})

// Approval Form
const approvalForm = reactive({
  status: '',
  admin_notes: '',
  scheduled_date: '',
  scheduled_time: '',
  meeting_link: '',
  location: '',
  payment_status: 'not_required',
  amount_paid: null,
  payment_reference: ''
})

// Debounce function
let searchTimeout
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    pagination.current_page = 1
    fetchRequests()
  }, 500)
}

const fetchRequests = async () => {
  try {
    const params = {
      page: pagination.current_page,
      per_page: pagination.per_page,
      ...filters
    }
    
    const response = await api().get('/training-requests', { params })
    const data = response.data.data
    
    requests.value = data.data
    pagination.current_page = data.current_page
    pagination.last_page = data.last_page
    pagination.per_page = data.per_page
    pagination.total = data.total
    pagination.from = data.from
    pagination.to = data.to
    
    // Fetch stats
    await fetchStats()
  } catch (error) {
    console.error('Error fetching requests:', error)
  }
}

const fetchStats = async () => {
  try {
    const response = await api().get('/training-requests/stats')
    Object.assign(stats, response.data.data)
  } catch (error) {
    console.error('Error fetching stats:', error)
  }
}

const updateRequest = async () => {
  processing.value = true
  try {
    const data = {
      status: approvalForm.status,
      admin_notes: approvalForm.admin_notes,
      reviewed_at: new Date().toISOString(),
      reviewed_by: JSON.parse(localStorage.getItem('user'))?.id
    }
    
    // Add scheduling info if status is scheduled
    if (approvalForm.status === 'scheduled') {
      data.scheduled_date = approvalForm.scheduled_date
      data.scheduled_time = approvalForm.scheduled_time
      data.meeting_link = approvalForm.meeting_link
      data.location = approvalForm.location
    }
    
    // Add payment info
    if (approvalForm.payment_status !== 'not_required') {
      data.payment_status = approvalForm.payment_status
      data.amount_paid = approvalForm.amount_paid
      data.payment_reference = approvalForm.payment_reference
      if (approvalForm.payment_status === 'paid') {
        data.paid_at = new Date().toISOString()
      }
    }
    
    await api().put(`/training-requests/${selectedRequest.value.id}`, data)
    
    // Refresh the list
    await fetchRequests()
    
    // Close modal
    closeApprovalModal()
    closeViewModal()
    
    // Show success message
    alert('Request updated successfully!')
  } catch (error) {
    console.error('Error updating request:', error)
    alert('Failed to update request')
  } finally {
    processing.value = false
  }
}

// Helper functions
const viewRequest = (request) => {
  selectedRequest.value = request
  showViewModal.value = true
}

const openApprovalModal = (request) => {
  selectedRequest.value = request
  approvalForm.status = request.status
  approvalForm.admin_notes = request.admin_notes || ''
  approvalForm.scheduled_date = request.scheduled_date || ''
  approvalForm.scheduled_time = request.scheduled_time || ''
  approvalForm.meeting_link = request.meeting_link || ''
  approvalForm.location = request.location || ''
  approvalForm.payment_status = request.payment_status || 'not_required'
  approvalForm.amount_paid = request.amount_paid || null
  approvalForm.payment_reference = request.payment_reference || ''
  showApprovalModal.value = true
}

const closeViewModal = () => {
  showViewModal.value = false
  selectedRequest.value = null
}

const closeApprovalModal = () => {
  showApprovalModal.value = false
  selectedRequest.value = null
  resetApprovalForm()
}

const resetApprovalForm = () => {
  approvalForm.status = ''
  approvalForm.admin_notes = ''
  approvalForm.scheduled_date = ''
  approvalForm.scheduled_time = ''
  approvalForm.meeting_link = ''
  approvalForm.location = ''
  approvalForm.payment_status = 'not_required'
  approvalForm.amount_paid = null
  approvalForm.payment_reference = ''
}

const resetFilters = () => {
  filters.status = ''
  filters.training_type = ''
  filters.experience_level = ''
  filters.search = ''
  pagination.current_page = 1
  fetchRequests()
}

const changePage = (page) => {
  if (page >= 1 && page <= pagination.last_page) {
    pagination.current_page = page
    fetchRequests()
  }
}

const formatDate = (date) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString()
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}

const getStatusBadgeClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    under_review: 'bg-blue-100 text-blue-800',
    approved: 'bg-green-100 text-green-800',
    scheduled: 'bg-purple-100 text-purple-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800',
    rejected: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getStatusLabel = (status) => {
  const labels = {
    pending: 'Pending',
    under_review: 'Under Review',
    approved: 'Approved',
    scheduled: 'Scheduled',
    completed: 'Completed',
    cancelled: 'Cancelled',
    rejected: 'Rejected'
  }
  return labels[status] || status
}

const getTrainingTypeBadgeClass = (type) => {
  const classes = {
    onsite: 'bg-orange-100 text-orange-800',
    online: 'bg-blue-100 text-blue-800',
    webinar: 'bg-green-100 text-green-800'
  }
  return classes[type] || 'bg-gray-100 text-gray-800'
}

const getTrainingTypeLabel = (type) => {
  const labels = {
    onsite: 'Onsite',
    online: 'Online',
    webinar: 'Webinar'
  }
  return labels[type] || type
}

const getExperienceLevelLabel = (level) => {
  const labels = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced'
  }
  return labels[level] || level
}

const getPreferredFormatLabel = (format) => {
  const labels = {
    online: 'Online',
    onsite: 'Onsite',
    hybrid: 'Hybrid'
  }
  return labels[format] || format
}

// Lifecycle
onMounted(() => {
  fetchRequests()
})
</script>

<style scoped>
.training-requests-container {
  @apply p-6 max-w-[1400px] mx-auto;
}
</style>