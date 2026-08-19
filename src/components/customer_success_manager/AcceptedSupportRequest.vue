<template>
  <div class="min-h-screen bg-gray-50 py-2">
    <div class="max-w-7xl mx-auto">
      <!-- Header with Search/Filters in same row -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <!-- Left: Title and Description -->
        <div class="lg:flex-1">
          <h1 class="text-2xl font-bold text-gray-900">Accepted Support Requests</h1>
          <p class="text-gray-600 text-sm mt-1">Manage and track all support requests with ease</p>
        </div>

        <!-- Right: Search and Filters -->
        <div class="flex-1 lg:flex lg:items-center lg:justify-end space-x-3">
          <!-- Search -->
          <div class="relative flex-1 lg:max-w-xs">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              id="search"
              v-model="filters.search"
              type="text"
              placeholder="Search tickets..."
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white shadow-sm"
            >
          </div>

          <!-- Filters -->
          <div class="flex space-x-2">
            <div class="relative">
              <select
                v-model="filters.priority"
                class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white shadow-sm appearance-none pr-8"
              >
                <option value="all">All Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>

            <div class="relative">
              <select
                v-model="filters.issue_type"
                class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white shadow-sm appearance-none pr-8"
              >
                <option value="all">All Types</option>
                <option value="Technical">Technical</option>
                <option value="Billing">Billing</option>
                <option value="Account">Account</option>
                <option value="Feature">Feature Request</option>
                <option value="Bug">Bug Report</option>
                <option value="General">General Inquiry</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-gray-600">Total Tickets</p>
              <p class="text-xl font-bold text-gray-900">{{ stats.total }}</p>
            </div>
            <div class="p-2 bg-blue-100 rounded-lg">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-gray-600">Open</p>
              <p class="text-xl font-bold text-gray-900">{{ stats.open }}</p>
            </div>
            <div class="p-2 bg-green-100 rounded-lg">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-4 border-l-4 border-orange-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-gray-600">In Progress</p>
              <p class="text-xl font-bold text-gray-900">{{ stats.inProgress }}</p>
            </div>
            <div class="p-2 bg-orange-100 rounded-lg">
              <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-gray-600">Resolved</p>
              <p class="text-xl font-bold text-gray-900">{{ stats.resolved }}</p>
            </div>
            <div class="p-2 bg-purple-100 rounded-lg">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Tickets Table -->
      <div class="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-200">
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ticket Details
                </th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Company & Location
                </th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Priority & Type
                </th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr
                v-for="ticket in filteredTickets"
                :key="ticket.ticket_number"
                class="hover:bg-gray-50 transition-colors"
              >
                <!-- Ticket Details -->
                <td class="px-4 py-3">
                  <div>
                    <div class="flex items-center">
                      <span class="text-xs font-medium text-gray-900 bg-blue-100 px-2 py-1 rounded">
                        #{{ ticket.ticket_number }}
                      </span>
                    </div>
                    <div class="mt-2">
                      <h4 class="text-sm font-semibold text-gray-900">{{ ticket.subject }}</h4>
                      <p class="text-sm text-gray-600 mt-1 line-clamp-2">{{ ticket.description }}</p>
                    </div>
                    <div class="mt-2 text-xs text-gray-500">
                      Created: {{ formatDate(ticket.created_at) }}
                    </div>
                  </div>
                </td>

                <!-- Company & Location -->
                <td class="px-4 py-3">
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ ticket.company_name }}</p>
                    <p class="text-sm text-gray-600 mt-1">{{ ticket.location }}</p>
                  </div>
                </td>

                <!-- Priority & Type -->
                <td class="px-4 py-3">
                  <div class="space-y-2">
                    <span
                      :class="[
                        'inline-flex items-center px-2 py-1 rounded text-xs font-medium',
                        priorityBadgeClass(ticket.priority_level)
                      ]"
                    >
                      {{ ticket.priority_level }}
                    </span>
                    <div>
                      <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {{ ticket.issue_type }}
                      </span>
                    </div>
                  </div>
                </td>

                <!-- Status -->
                <td class="px-4 py-3">
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-1 rounded text-xs font-medium',
                      statusBadgeClass(ticket.status)
                    ]"
                  >
                    {{ getStatusText(ticket.status) }}
                  </span>
                </td>

                <!-- Actions -->
                <td class="px-4 py-3">
                  <div class="flex items-center space-x-2">
                    <button
                      @click="viewTicket(ticket)"
                      class="text-blue-600 hover:text-blue-900 transition-colors p-1 rounded"
                      title="View Details"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button
                      @click="editTicket(ticket)"
                      class="text-green-600 hover:text-green-900 transition-colors p-1 rounded"
                      title="Edit Ticket"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      @click="deleteTicket(ticket)"
                      class="text-red-600 hover:text-red-900 transition-colors p-1 rounded"
                      title="Delete Ticket"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="filteredTickets.length === 0" class="text-center py-8">
          <svg class="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 class="text-base font-medium text-gray-900 mb-1">No tickets found</h3>
          <p class="text-sm text-gray-600 mb-4">No support tickets match your current filters.</p>
          <button
            @click="clearFilters"
            class="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>

        <!-- Pagination -->
        <div v-if="filteredTickets.length > 0" class="bg-gray-50 px-4 py-3 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700">
              Showing <span class="font-medium">{{ filteredTickets.length }}</span> tickets
            </div>
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

const filters = reactive({
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

// Sample data - replace with API call
const sampleTickets = [
  {
    ticket_number: '1123a',
    company_name: 'Abcd',
    location: 'Test',
    issue_type: 'Technical',
    priority_level: 'High',
    subject: 'Unable to login',
    description: 'User reports that they cannot login to the system with correct credentials.',
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
    description: 'Customer noticed incorrect charges on their monthly invoice.',
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
    description: 'User would like to have a dark mode option in the application.',
    status: 3,
    created_at: new Date(Date.now() - 172800000).toISOString()
  },
  {
    ticket_number: '1126d',
    company_name: 'Global Inc',
    location: 'London',
    issue_type: 'Bug',
    priority_level: 'Urgent',
    subject: 'System crash on save',
    description: 'Application crashes when trying to save large files.',
    status: 1,
    created_at: new Date(Date.now() - 259200000).toISOString()
  }
]

const filteredTickets = computed(() => {
  let filtered = tickets.value

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

const priorityBadgeClass = (priority) => {
  const classes = {
    'Low': 'bg-green-100 text-green-800',
    'Medium': 'bg-yellow-100 text-yellow-800',
    'High': 'bg-orange-100 text-orange-800',
    'Urgent': 'bg-red-100 text-red-800'
  }
  return classes[priority] || 'bg-gray-100 text-gray-800'
}

const statusBadgeClass = (status) => {
  const classes = {
    1: 'bg-blue-100 text-blue-800',
    2: 'bg-yellow-100 text-yellow-800',
    3: 'bg-green-100 text-green-800',
    4: 'bg-gray-100 text-gray-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

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

const refreshTickets = async () => {
  try {
    // Replace with actual API call
    // const response = await api().get('issue-tickets')
    // tickets.value = response.data

    // Using sample data for demonstration
    tickets.value = [...sampleTickets]
    updateStats()
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
  filters.priority = 'all'
  filters.issue_type = 'all'
  filters.search = ''
}

const viewTicket = (ticket) => {
  Swal.fire({
    title: `Ticket #${ticket.ticket_number}`,
    html: `
      <div class="text-left">
        <p><strong>Company:</strong> ${ticket.company_name}</p>
        <p><strong>Location:</strong> ${ticket.location}</p>
        <p><strong>Issue Type:</strong> ${ticket.issue_type}</p>
        <p><strong>Priority:</strong> ${ticket.priority_level}</p>
        <p><strong>Status:</strong> ${getStatusText(ticket.status)}</p>
        <p><strong>Subject:</strong> ${ticket.subject}</p>
        <p><strong>Description:</strong> ${ticket.description}</p>
        <p><strong>Created:</strong> ${formatDate(ticket.created_at)}</p>
      </div>
    `,
    confirmButtonText: 'Close'
  })
}

const editTicket = (ticket) => {
  Swal.fire({
    title: 'Edit Ticket',
    text: 'Edit functionality would be implemented here.',
    icon: 'info',
    confirmButtonText: 'OK'
  })
}

const deleteTicket = async (ticket) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: `You are about to delete ticket #${ticket.ticket_number}. This action cannot be undone.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  })

  if (result.isConfirmed) {
    try {
      // Replace with actual API call
      // await api().delete(`issue-ticket/${ticket.ticket_number}`)

      tickets.value = tickets.value.filter(t => t.ticket_number !== ticket.ticket_number)
      updateStats()

      Swal.fire('Deleted!', 'The ticket has been deleted.', 'success')
    } catch (error) {
      console.error('Error deleting ticket:', error)
      Swal.fire('Error', 'Failed to delete ticket.', 'error')
    }
  }
}

onMounted(() => {
  refreshTickets()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>