<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-xl text-white">
          <div>
            <h1 class="text-3xl font-bold tracking-tight">Current Quarter Requests List</h1>
            <p class="mt-2 text-indigo-100">Manage and track all support requests with ease</p>
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <button
              @click="refreshTickets"
              class="flex items-center px-5 py-2.5 bg-white/20 backdrop-blur-sm text-white font-medium rounded-xl hover:bg-white/30 transition-all duration-200 transform hover:scale-105 shadow-md"
            >
              <i class="ri-refresh-line mr-2"></i>
              Refresh
            </button>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-2xl p-6 shadow-lg border border-indigo-200">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-xl flex items-center justify-center mr-4">
              <i class="ri-ticket-line text-indigo-600 text-xl"></i>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ stats.total }}</p>
              <p class="text-sm text-gray-600">Total Tickets</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-lg border border-green-200">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mr-4">
              <i class="ri-time-line text-green-600 text-xl"></i>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ stats.open }}</p>
              <p class="text-sm text-gray-600">Open</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-lg border border-purple-200">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mr-4">
              <i class="ri-progress-4-line text-purple-600 text-xl"></i>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ stats.inProgress }}</p>
              <p class="text-sm text-gray-600">In Progress</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-lg border border-orange-200">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl flex items-center justify-center mr-4">
              <i class="ri-checkbox-circle-line text-orange-600 text-xl"></i>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ stats.resolved }}</p>
              <p class="text-sm text-gray-600">Resolved</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-indigo-100">
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div class="flex flex-col sm:flex-row gap-4 flex-1">
            <!-- Priority Filter -->
            <div class="flex-1 min-w-[140px]">
              <label for="priorityFilter" class="block text-sm font-semibold text-gray-800 mb-2">Priority</label>
              <select
                id="priorityFilter"
                v-model="filters.priority"
                class="w-full px-4 py-2.5 bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all duration-200 font-medium text-gray-800 shadow-sm"
              >
                <option value="all">All Priority</option>
                <option value="Low" class="text-green-600">Low</option>
                <option value="Medium" class="text-yellow-600">Medium</option>
                <option value="High" class="text-orange-600">High</option>
                <option value="Urgent" class="text-red-600 font-bold">Urgent</option>
              </select>
            </div>

            <!-- Issue Type Filter -->
            <div class="flex-1 min-w-[160px]">
              <label for="typeFilter" class="block text-sm font-semibold text-gray-800 mb-2">Issue Type</label>
              <select
                id="typeFilter"
                v-model="filters.issue_type"
                class="w-full px-4 py-2.5 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-200 font-medium text-gray-800 shadow-sm"
              >
                <option value="all">All Types</option>
                <option value="Technical" class="text-indigo-600">Technical</option>
                <option value="Billing" class="text-amber-600">Billing</option>
                <option value="Account" class="text-purple-600">Account</option>
                <option value="Feature" class="text-teal-600">Feature Request</option>
                <option value="Bug" class="text-red-600">Bug Report</option>
                <option value="General" class="text-gray-600">General Inquiry</option>
              </select>
            </div>

            <!-- Status Filter -->
            <div class="flex-1 min-w-[140px]">
              <label for="statusFilter" class="block text-sm font-semibold text-gray-800 mb-2">Status</label>
              <select
                id="statusFilter"
                v-model="filters.status"
                class="w-full px-4 py-2.5 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200 font-medium text-gray-800 shadow-sm"
              >
                <option value="all">All Status</option>
                <option value="1" class="text-blue-600">Open</option>
                <option value="2" class="text-yellow-600">In Progress</option>
                <option value="3" class="text-green-600">Resolved</option>
                <option value="4" class="text-gray-600">Closed</option>
              </select>
            </div>
          </div>

          <!-- Search -->
          <div class="w-full lg:w-80">
            <label for="search" class="block text-sm font-semibold text-gray-800 mb-2">Search Tickets</label>
            <div class="relative group">
              <input
                id="search"
                v-model="filters.search"
                type="text"
                placeholder="Search by ticket ID, subject, or user..."
                class="w-full pl-12 pr-5 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 shadow-inner placeholder-gray-400 font-medium"
              >
              <i class="ri-search-line text-indigo-500 absolute left-4 top-3.5 transition-transform group-focus-within:scale-110"></i>
              <div class="absolute inset-0 rounded-xl ring-2 ring-transparent group-focus-within:ring-indigo-300 opacity-50 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tickets List -->
      <div class="space-y-6">
        <div
          v-for="ticket in filteredTickets"
          :key="ticket.ticket_number"
          class="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
        >
          <!-- Ticket Header -->
          <div class="p-6 border-b border-gray-100">
            <div class="flex justify-between items-start mb-3">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="text-lg font-semibold text-gray-900 line-clamp-1">{{ ticket.subject }}</h3>
                  <span class="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                    #{{ ticket.ticket_number }}
                  </span>
                </div>
                <p class="text-sm text-gray-500">Created: {{ formatDate(ticket.created_at) }}</p>
              </div>
            </div>
            <p class="text-gray-600 text-sm line-clamp-2">{{ ticket.description }}</p>
          </div>

          <!-- Ticket Details -->
          <div class="p-6 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Company & Location -->
              <div class="flex items-center text-sm text-gray-600">
                <i class="ri-building-line text-indigo-500 mr-2"></i>
                <div>
                  <div class="font-medium">{{ ticket.company_name }}</div>
                  <div class="text-xs">{{ ticket.location }}</div>
                </div>
              </div>

              <!-- Priority & Type -->
              <div class="flex items-center text-sm text-gray-600">
                <i class="ri-flag-line text-purple-500 mr-2"></i>
                <div>
                  <div class="font-medium capitalize">{{ ticket.priority_level }}</div>
                  <div class="text-xs">{{ ticket.issue_type }}</div>
                </div>
              </div>

              <!-- Status -->
              <div class="flex items-center text-sm text-gray-600">
                <i class="ri-time-line text-green-500 mr-2"></i>
                <div>
                  <div class="font-medium">{{ getStatusText(ticket.status) }}</div>
                  <div class="text-xs">Status</div>
                </div>
              </div>
            </div>

            <!-- Priority Badge -->
            <div class="flex flex-wrap gap-2">
              <span
                :class="priorityBadgeClass(ticket.priority_level)"
                class="inline-flex items-center px-2 py-1 rounded-full text-xs"
              >
                <i :class="priorityIcons[ticket.priority_level]" class="mr-1"></i>
                {{ ticket.priority_level }}
              </span>
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                <i class="ri-bug-line mr-1"></i>
                {{ ticket.issue_type }}
              </span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
            <div class="flex space-x-3">
              <button
                @click="toggleDetails(ticket.ticket_number)"
                class="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center shadow-lg"
              >
                <i class="ri-eye-line mr-2"></i>
                {{ expandedTicket === ticket.ticket_number ? 'Hide Details' : 'View Details' }}
              </button>
            </div>
          </div>

          <!-- Expanded Details Section -->
          <div 
            v-if="expandedTicket === ticket.ticket_number"
            class="border-t border-gray-200 bg-gray-50 p-6 animate-fade-in"
          >
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Left Column -->
              <div class="space-y-6">
                <!-- Ticket Information -->
                <div>
                  <h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <i class="ri-information-line text-indigo-500 mr-2"></i>
                    Ticket Information
                  </h4>
                  <div class="space-y-3">
                    <div class="flex justify-between items-center p-3 bg-white rounded-lg border">
                      <span class="text-sm text-gray-600">Ticket ID</span>
                      <span class="font-medium">#{{ ticket.ticket_number }}</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-white rounded-lg border">
                      <span class="text-sm text-gray-600">Issue Type</span>
                      <span class="font-medium">{{ ticket.issue_type }}</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-white rounded-lg border">
                      <span class="text-sm text-gray-600">Priority</span>
                      <span class="font-medium capitalize">{{ ticket.priority_level }}</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-white rounded-lg border">
                      <span class="text-sm text-gray-600">Created Date</span>
                      <span class="font-medium">{{ formatDate(ticket.created_at) }}</span>
                    </div>
                  </div>
                </div>

                <!-- Company Information -->
                <div>
                  <h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <i class="ri-building-line text-green-500 mr-2"></i>
                    Company Information
                  </h4>
                  <div class="bg-white rounded-lg p-4 border border-gray-200 space-y-2">
                    <p class="font-medium text-sm">{{ ticket.company_name }}</p>
                    <p class="text-xs text-gray-500">{{ ticket.location || 'No location provided' }}</p>
                  </div>
                </div>
              </div>

              <!-- Right Column -->
              <div class="space-y-6">
                <!-- Status Information -->
                <div>
                  <h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <i class="ri-progress-4-line text-purple-500 mr-2"></i>
                    Status & Progress
                  </h4>
                  <div class="grid grid-cols-2 gap-3">
                    <div class="bg-white rounded-lg p-3 border border-gray-200 text-center">
                      <div class="text-sm font-medium text-gray-600">Current Status</div>
                      <div class="text-lg font-semibold" :class="statusColorClass(ticket.status)">
                        {{ getStatusText(ticket.status) }}
                      </div>
                    </div>
                    <div class="bg-white rounded-lg p-3 border border-gray-200 text-center">
                      <div class="text-sm font-medium text-gray-600">Priority</div>
                      <div class="text-lg font-semibold" :class="priorityColorClass(ticket.priority_level)">
                        {{ ticket.priority_level }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Quick Actions -->
                <div>
                  <h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <i class="ri-flashlight-line text-orange-500 mr-2"></i>
                    Quick Actions
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    <button
                      @click="updateStatus(ticket, 2)"
                      class="px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors"
                    >
                      Mark In Progress
                    </button>
                    <button
                      @click="updateStatus(ticket, 3)"
                      class="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                    >
                      Mark Resolved
                    </button>
                    <button
                      @click="updateStatus(ticket, 4)"
                      class="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      Close Ticket
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Full Description -->
            <div class="mt-6 pt-6 border-t border-gray-200">
              <h4 class="text-sm font-semibold text-gray-700 mb-3">Full Description</h4>
              <p class="text-gray-600 text-sm leading-relaxed bg-white p-4 rounded-lg border border-gray-200">
                {{ ticket.description || 'No detailed description provided for this ticket.' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredTickets.length === 0" class="text-center py-20">
        <div class="inline-flex flex-col items-center max-w-md">
          <div class="relative mb-6">
            <div class="w-24 h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
              <i class="ri-ticket-line text-indigo-500 text-3xl"></i>
            </div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900">No tickets found</h3>
          <p class="mt-2 text-gray-600">No support tickets match your current filters.</p>
          <button
            @click="clearFilters"
            class="mt-6 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="filteredTickets.length > 0" class="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 mt-6">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing <span class="font-medium">{{ filteredTickets.length }}</span> of <span class="font-medium">{{ tickets.length }}</span> tickets
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span class="text-sm text-gray-700 px-4">
              Page {{ currentPage }}
            </span>
            <button
              @click="nextPage"
              :disabled="currentPage * itemsPerPage >= filteredTickets.length"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import Swal from 'sweetalert2'
import api from '@/config/api'

const tickets = ref([])
const currentPage = ref(1)
const itemsPerPage = 10
const expandedTicket = ref(null)

const filters = reactive({
  status: 'all',
  priority: 'all',
  issue_type: 'all',
  search: ''
})

const stats = reactive({
  total: 0,
  open: 0,
  inProgress: 0,
  resolved: 0
})

// Priority configuration
const priorityBadgeClass = (priority) => {
  const classes = {
    'Low': 'bg-green-100 text-green-700',
    'Medium': 'bg-yellow-100 text-yellow-700',
    'High': 'bg-orange-100 text-orange-700',
    'Urgent': 'bg-red-100 text-red-700'
  }
  return classes[priority] || 'bg-gray-100 text-gray-700'
}

const priorityIcons = {
  'Low': 'ri-arrow-down-line',
  'Medium': 'ri-arrow-right-line',
  'High': 'ri-arrow-up-line',
  'Urgent': 'ri-alarm-warning-line'
}

const priorityColorClass = (priority) => {
  const classes = {
    'Low': 'text-green-600',
    'Medium': 'text-yellow-600',
    'High': 'text-orange-600',
    'Urgent': 'text-red-600'
  }
  return classes[priority] || 'text-gray-600'
}

const statusColorClass = (status) => {
  const classes = {
    1: 'text-blue-600',
    2: 'text-yellow-600',
    3: 'text-green-600',
    4: 'text-gray-600'
  }
  return classes[status] || 'text-gray-600'
}

// Sample data - replace with API call
const sampleTickets = [
  {
    ticket_number: '1123a',
    company_name: 'Abcd',
    location: 'Test',
    issue_type: 'Technical',
    priority_level: 'High',
    subject: 'Unable to login',
    description: 'User reports that they cannot login to the system with correct credentials. The issue started occurring after the latest system update. User has tried resetting password but the problem persists.',
    status: 1,
    created_at: new Date().toISOString()
  },
  {
    ticket_number: '1124b',
    company_name: 'XYZ Corp',
    location: 'New York',
    issue_type: 'Billing',
    priority_level: 'Medium',
    subject: 'Invoice discrepancy',
    description: 'Customer noticed incorrect charges on their monthly invoice. The billing amount does not match the services used during the billing period.',
    status: 2,
    created_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    ticket_number: '1125c',
    company_name: 'Tech Solutions',
    location: 'California',
    issue_type: 'Feature',
    priority_level: 'Low',
    subject: 'Feature request - dark mode',
    description: 'User would like to have a dark mode option in the application to reduce eye strain during night-time usage.',
    status: 3,
    created_at: new Date(Date.now() - 172800000).toISOString()
  }
]

const filteredTickets = computed(() => {
  let filtered = tickets.value

  // Apply status filter
  if (filters.status !== 'all') {
    filtered = filtered.filter(ticket => ticket.status.toString() === filters.status)
  }

  // Apply priority filter
  if (filters.priority !== 'all') {
    filtered = filtered.filter(ticket => ticket.priority_level === filters.priority)
  }

  // Apply issue type filter
  if (filters.issue_type !== 'all') {
    filtered = filtered.filter(ticket => ticket.issue_type === filters.issue_type)
  }

  // Apply search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    filtered = filtered.filter(ticket =>
      ticket.ticket_number.toLowerCase().includes(searchTerm) ||
      ticket.subject.toLowerCase().includes(searchTerm) ||
      ticket.description.toLowerCase().includes(searchTerm) ||
      ticket.company_name.toLowerCase().includes(searchTerm)
    )
  }

  return filtered
})

const getStatusText = (status) => {
  const statusMap = {
    1: 'Open',
    2: 'In Progress',
    3: 'Resolved',
    4: 'Closed'
  }
  return statusMap[status] || 'Unknown'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Toggle details view
const toggleDetails = (ticketId) => {
  expandedTicket.value = expandedTicket.value === ticketId ? null : ticketId
}

const refreshTickets = async () => {
  try {
    // Replace with actual API call
    // const response = await api().get('issue-tickets')
    // tickets.value = response.data

    // Using sample data for demonstration
    tickets.value = [...sampleTickets]
    updateStats()

    Swal.fire({
      icon: 'success',
      title: 'Refreshed!',
      text: 'Ticket list has been updated.',
      timer: 1500,
      showConfirmButton: false
    })
  } catch (error) {
    console.error('Error fetching tickets:', error)
    Swal.fire('Error', 'Failed to refresh tickets.', 'error')
  }
}

const updateStats = () => {
  stats.total = tickets.value.length
  stats.open = tickets.value.filter(t => t.status === 1).length
  stats.inProgress = tickets.value.filter(t => t.status === 2).length
  stats.resolved = tickets.value.filter(t => t.status === 3).length
}

const clearFilters = () => {
  filters.status = 'all'
  filters.priority = 'all'
  filters.issue_type = 'all'
  filters.search = ''
}

const viewTicket = (ticket) => {
  toggleDetails(ticket.ticket_number)
}

const editTicket = (ticket) => {
  Swal.fire({
    title: 'Edit Ticket',
    text: 'Edit functionality would be implemented here.',
    icon: 'info',
    confirmButtonText: 'OK'
  })
}

const updateStatus = async (ticket, newStatus) => {
  try {
    // Replace with actual API call
    // await api().put(`issue-tickets/${ticket.ticket_number}`, { status: newStatus })
    
    // Update local state
    const ticketIndex = tickets.value.findIndex(t => t.ticket_number === ticket.ticket_number)
    if (ticketIndex !== -1) {
      tickets.value[ticketIndex].status = newStatus
    }
    
    updateStats()
    
    Swal.fire({
      icon: 'success',
      title: 'Status Updated!',
      text: `Ticket #${ticket.ticket_number} has been updated.`,
      timer: 1500,
      showConfirmButton: false
    })
  } catch (error) {
    console.error('Error updating ticket:', error)
    Swal.fire('Error', 'Failed to update ticket status.', 'error')
  }
}

const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value * itemsPerPage < filteredTickets.value.length) currentPage.value++
}

onMounted(() => {
  refreshTickets()
})
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #6366f1, #8b5cf6);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #4f46e5, #7c3aed);
}
</style>