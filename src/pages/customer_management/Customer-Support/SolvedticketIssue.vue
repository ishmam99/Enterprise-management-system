<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Solved Tickets</h1>
          <p class="text-gray-600 mt-2 flex items-center">
            <svg class="w-5 h-5 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
            </svg>
            Manage and resolve pending customer issues
          </p>
        </div>
        <div class="flex items-center space-x-4">
          <button
            @click="$router.push('/create-ticket')"
            class="flex items-center px-5 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Ticket
          </button>
          <button
            @click="$router.back()"
            class="flex items-center px-4 py-2 text-gray-600 hover:text-purple-700 transition-colors border border-gray-300 hover:border-purple-400 rounded-lg"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-purple-100">
        <div class="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div class="flex-1">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search tickets..."
                class="block w-full pl-10 pr-3 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-purple-50"
              >
            </div>
          </div>

          <div class="flex flex-wrap gap-4">
            <div class="relative">
              <select
                v-model="filters.priority"
                class="px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-purple-50 appearance-none pr-10"
              >
                <option value="all">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>

            <div class="relative">
              <select
                v-model="filters.type"
                class="px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-purple-50 appearance-none pr-10"
              >
                <option value="all">All Types</option>
                <option value="Technical">Technical</option>
                <option value="Billing">Billing</option>
                <option value="Feature">Feature</option>
                <option value="Bug">Bug</option>
                <option value="Account">Account</option>
                <option value="Other">Other</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-20">
        <div class="inline-flex flex-col items-center">
          <div class="relative">
            <svg class="animate-spin h-12 w-12 text-purple-600" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </div>
          <p class="text-gray-600 mt-4 font-medium">Loading tickets...</p>
        </div>
      </div>

      <!-- Tickets Table -->
      <div v-else-if="filteredTickets.length > 0" class="overflow-x-auto bg-white rounded-2xl shadow-xl border border-purple-100">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr class="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
              <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider rounded-tl-2xl">Ticket #</th>
              <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Subject</th>
              <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Type</th>
              <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Priority</th>
              <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Status</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Customer</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">User</th>
              <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">User Email</th>
              <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Attachment</th>
              <th class="px-6 py-4 text-center text-sm font-semibold tracking-wider rounded-tr-2xl">Action</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-100 bg-white">
            <tr
              v-for="(ticket, index) in filteredTickets"
              :key="index"
              class="hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-300"
            >
              <!-- Ticket ID -->
              <td class="px-6 py-4 text-sm font-bold text-purple-700">#{{ ticket.id }}</td>

              <!-- Subject -->
              <td class="px-6 py-4">
                <div class="text-sm font-semibold text-gray-800">{{ ticket.subject }}</div>
                <div class="text-gray-500 text-xs line-clamp-1 mt-1">{{ ticket.description }}</div>
              </td>

              <!-- Issue Type -->
              <td class="px-6 py-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ ticket.issue_type }}
                </span>
              </td>

              <!-- Priority -->
              <td class="px-6 py-4">
                <span
                  :class="[
                    'px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm',
                    ticket.priority_level === 'High'
                      ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border border-red-200'
                      : ticket.priority_level === 'Medium'
                      ? 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border border-yellow-200'
                      : 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200'
                  ]"
                >
                  {{ ticket.priority_level }}
                </span>
              </td>

              <!-- Status -->
              <td class="px-6 py-4">
                <span
                  :class="[
                    'px-3 py-1.5 rounded-full text-xs font-semibold',
                    ticket.status == 1
                      ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200'
                      : 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 border border-gray-200'
                  ]"
                >
                  {{ ticket.status == 1 ? 'Solved' : 'Closed' }}
                </span>
              </td>

             <td class="px-6 py-4 text-sm font-medium text-gray-700">{{ ticket?.customer?.user?.name|| 'N/A' }}</td>
              <td class="px-6 py-4 text-sm text-gray-700">{{ ticket.end_user.user.name || 'N/A' }}</td>
              <td class="px-6 py-4 text-sm text-gray-700">{{ ticket.end_user.user.email || 'N/A' }}</td>

              <!-- Attachment -->
              <td class="px-6 py-4">
                <div v-if="ticket.attachment" class="flex justify-center">
                  <div class="relative group">
                    <img
                      :src="ticket.attachment"
                      alt="Attachment"
                      class="w-16 h-16 object-cover rounded-xl border-2 border-purple-200 group-hover:border-purple-400 transition-all duration-300"
                    />
                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-xl transition-all duration-300 flex items-center justify-center">
                      <svg class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div v-else class="text-gray-400 text-xs italic text-center">No File</div>
              </td>

              <!-- Action -->
              <td class="px-6 py-4 text-center">
                <button
                  @click="viewTicket(ticket)"
                  class="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white text-sm font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  View Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <div class="inline-flex flex-col items-center max-w-md">
          <div class="relative mb-6">
            <div class="w-24 h-24 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full flex items-center justify-center">
              <svg class="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900">No resolved tickets</h3>
          <!-- <p class="mt-2 text-gray-600">All tickets have been resolved! Great job!</p> -->
          <button
            @click="$router.push('/create-ticket')"
            class="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Create New Ticket
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UnresolvedTickets',
  data() {
    return {
      isLoading: false,
      searchQuery: '',
      filters: {
        priority: 'all',
        type: 'all'
      },
      tickets: [
        // Your ticket data would go here
      ]
    }
  },
  computed: {
    filteredTickets() {
      // Your filtering logic would go here
      return this.tickets
    }
  },
  methods: {
    viewTicket(ticket) {
      // Your view ticket logic would go here
      console.log('Viewing ticket:', ticket)
    }
  }
}
</script>



<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

import Swal from 'sweetalert2'
import api from '@/config/api'
import { useAuthStore } from '@/stores/AuthStore'
const authStore = useAuthStore()
const isLoading = ref(true)
const unresolvedTickets = ref([])
const searchQuery = ref('')
const filters = reactive({
  priority: 'all',
  type: 'all'
})

// ✅ Fetch tickets from backend
const fetchTickets = async () => {
  isLoading.value = true
  try {
    // const response = await api().get('/customer-support?type=online&status=1')
    const response = authStore.role !== 'customer-manager' ? await api().get(`/customer-support?type=online&status=1`) : await api().get(`/customer-support?company_id=${authStore.companyId}&type=online&status=1`)
    unresolvedTickets.value = response.data.data || []
  } catch (error) {
    console.error('Error fetching tickets:', error)

  } finally {
    isLoading.value = false
  }
}

onMounted(fetchTickets)

const filteredTickets = computed(() => {
  return unresolvedTickets.value.filter(ticket => {
    const matchesSearch =
      ticket.subject?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      ticket.description?.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesPriority =
      filters.priority === 'all' || ticket.priority_level === filters.priority

    const matchesType =
      filters.type === 'all' || ticket.issue_type === filters.type

    return matchesSearch && matchesPriority && matchesType
  })
})

const viewTicket = (ticket) => {
  Swal.fire({
    title: ticket.subject,
    html: `
      <p><strong>Type:</strong> ${ticket.issue_type}</p>
      <p><strong>Priority:</strong> ${ticket.priority_level}</p>
      <p><strong>Status:</strong> ${ticket.status === 1 ? 'Open' : 'Closed'}</p>
      <hr/>
      <p>${ticket.description}</p>
    `,
    icon: 'info'
  })
}
</script>
<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom scrollbar for the table */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(to right, #8b5cf6, #6366f1);
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to right, #7c3aed, #4f46e5);
}
</style>
