<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<!-- Header -->
<div class="mb-8">
  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-xl text-white">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Today's Requests List</h1>
      <p class="mt-2 text-indigo-100">Manage and track all support requests with ease</p>
    </div>
    <div class="flex flex-wrap items-center gap-3">
      <button
        @click="refreshTickets"
        class="flex items-center px-5 py-2.5 bg-white/20 backdrop-blur-sm text-white font-medium rounded-xl hover:bg-white/30 transition-all duration-200 transform hover:scale-105 shadow-md"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Refresh
      </button>
      <!-- <button
        @click="$router.push('/customer/Customer-Support/onsite/CreateSupportRequest')"
        class="flex items-center px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-500 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        New Ticket
      </button> -->
    </div>
  </div>
</div>

<!-- Filters and Search -->
<div class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-6 border border-white/30 ring-1 ring-black/5">
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
        <svg class="w-6 h-6 text-indigo-500 absolute left-4 top-3.5 transition-transform group-focus-within:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <div class="absolute inset-0 rounded-xl ring-2 ring-transparent group-focus-within:ring-indigo-300 opacity-50 pointer-events-none"></div>
      </div>
    </div>
  </div>
</div>


      <!-- Tickets Table -->
      <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-200">
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ticket Details
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Company & Location
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Priority & Type
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
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
                <td class="px-6 py-4">
                  <div>
                    <div class="flex items-center">
                      <span class="text-sm font-medium text-gray-900 bg-blue-100 px-2 py-1 rounded">
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
                <td class="px-6 py-4">
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ ticket.company_name }}</p>
                    <p class="text-sm text-gray-600 mt-1">{{ ticket.location }}</p>
                  </div>
                </td>

                <!-- Priority & Type -->
                <td class="px-6 py-4">
                  <div class="space-y-2">
                    <span
                      :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        priorityBadgeClass(ticket.priority_level)
                      ]"
                    >
                      {{ ticket.priority_level }}
                    </span>
                    <div>
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {{ ticket.issue_type }}
                      </span>
                    </div>
                  </div>
                </td>

                <!-- Status -->
                <td class="px-6 py-4">
                  <span
                    :class="[
                      'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                      statusBadgeClass(ticket.status)
                    ]"
                  >
                    {{ getStatusText(ticket.status) }}
                  </span>
                </td>

                <!-- Actions -->
                <td class="px-6 py-4">
                  <div class="flex items-center space-x-2">
                    <button
                      @click="viewTicket(ticket)"
                      class="text-blue-600 hover:text-blue-900 transition-colors p-1 rounded"
                      title="View Details"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button
                      @click="editTicket(ticket)"
                      class="text-green-600 hover:text-green-900 transition-colors p-1 rounded"
                      title="Edit Ticket"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      @click="deleteTicket(ticket)"
                      class="text-red-600 hover:text-red-900 transition-colors p-1 rounded"
                      title="Delete Ticket"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div v-if="filteredTickets.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
          <p class="text-gray-600 mb-4">No support tickets match your current filters.</p>
          <button
            @click="clearFilters"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>

        <!-- Pagination -->
        <div v-if="filteredTickets.length > 0" class="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700">
              Showing <span class="font-medium">{{ filteredTickets.length }}</span> of <span class="font-medium">{{ tickets.length }}</span> tickets
            </div>
            <div class="flex items-center space-x-2">
              <button
                @click="previousPage"
                :disabled="currentPage === 1"
                class="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span class="text-sm text-gray-700">
                Page {{ currentPage }}
              </span>
              <button
                @click="nextPage"
                :disabled="currentPage * itemsPerPage >= filteredTickets.length"
                class="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
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
const currentPage = ref(1)
const itemsPerPage = 10

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
    //tickets.value = [...sampleTickets]
    updateStats()

    // Swal.fire({
    //   icon: 'success',
    //   title: 'Refreshed!',
    //   text: 'Ticket list has been updated.',
    //   timer: 1500,
    //   showConfirmButton: false
    // })
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
      const  {data} = await api().get('customer-support?status=2&type=onsite')
      tickets.value = data.data

      tickets.value = tickets.value.filter(t => t.ticket_number !== ticket.ticket_number)
      updateStats()

      Swal.fire('Deleted!', 'The ticket has been deleted.', 'success')
    } catch (error) {
      console.error('Error deleting ticket:', error)
      Swal.fire('Error', 'Failed to delete ticket.', 'error')
    }
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
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
