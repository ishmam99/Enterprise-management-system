<template>
  <div class="min-h-screen bg-gray-50 py-2">
    <div class="max-w-7xl mx-auto">
      <!-- Header with Search/Filters -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <!-- Left: Title and Description -->
        <div class="lg:flex-1">
          <h1 class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Unresolved Tickets
          </h1>
           <h1 class="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Location Name: {{ route.query.name }}
          </h1>
          <p class="text-gray-600 text-sm mt-1 flex items-center">
            <svg class="w-4 h-4 mr-1 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
            </svg>
            Manage and resolve unresolved customer support tickets
          </p>
        </div>

        <!-- Right: Search and Filters -->
        <div class="flex-1 lg:flex lg:items-center lg:justify-end space-x-3">
          <!-- Search -->
          <div class="relative flex-1 lg:max-w-xs">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-4 w-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input v-model="searchQuery" type="text" placeholder="Search tickets..."
              class="block w-full pl-10 pr-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm bg-white shadow-sm">
          </div>

          <!-- Filters -->
          <div class="flex space-x-2">
            <select v-model="filters.priority"
              class="px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm bg-white shadow-sm appearance-none pr-8">
              <option value="all">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <select v-model="filters.type"
              class="px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm bg-white shadow-sm appearance-none pr-8">
              <option value="all">All Types</option>
              <option value="Technical">Technical</option>
              <option value="Billing">Billing</option>
              <option value="Feature">Feature</option>
              <option value="Bug">Bug</option>
              <option value="Account">Account</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="inline-flex flex-col items-center">
          <svg class="animate-spin h-10 w-10 text-purple-600" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
          <p class="text-gray-600 mt-3 text-sm font-medium">Loading tickets...</p>
        </div>
      </div>

      <!-- Tickets Table -->
      <div v-else-if="filteredTickets.length > 0" class="overflow-x-auto bg-white rounded-xl shadow-lg border border-purple-100">
        <table class="min-w-full divide-y divide-gray-200 table-zebra">
          <thead>
            <tr class="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <th class="px-4 border-e py-3 text-left text-xs font-semibold uppercase tracking-wider">Ticket #</th>
              <th class="px-4 border-e py-3 text-left text-xs font-semibold uppercase tracking-wider">Subject</th>
              <th class="px-4 border-e py-3 text-left text-xs font-semibold uppercase tracking-wider">Type</th>
              <th class="px-4 border-e py-3 text-left text-xs font-semibold uppercase tracking-wider">Priority</th>
              <th class="px-4 border-e py-3 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
              <th class="px-4 border-e py-3 text-left text-xs font-semibold uppercase tracking-wider">Customer</th>
              <th class="px-4 border-e py-3 text-left text-xs font-semibold uppercase tracking-wider">User</th>
              <th class="px-4 border-e py-3 text-left text-xs font-semibold uppercase tracking-wider">User Email</th>
              <th class="px-4 border-e py-3 text-left text-xs font-semibold uppercase tracking-wider">Attachment</th>
              <th class="px-4 border-e py-3 text-left text-xs font-semibold uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 bg-white">
            <tr v-for="ticket in filteredTickets" :key="ticket.id"
              class="hover:bg-purple-50 transition-colors">

              <td class="px-4 border-e py-3 text-sm font-semibold text-purple-700">#{{ ticket.id }}</td>
              <td class="px-4 border-e py-3">
                <div class="text-sm font-medium text-gray-800">{{ ticket.subject }}</div>
                <div class="text-gray-500 text-xs line-clamp-1 mt-1">{{ ticket.description }}</div>
              </td>
              <td class="px-4 border-e py-3">
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ ticket.issue_type }}
                </span>
              </td>
              <td class="px-4 border-e py-3">
                <span :class="[
                  'px-2.5 py-1 rounded-full text-xs font-medium',
                  ticket.priority_level === 'High' ? 'bg-red-100 text-red-700 border border-red-200' :
                  ticket.priority_level === 'Medium' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                  'bg-green-100 text-green-700 border border-green-200'
                ]">
                  {{ ticket.priority_level }}
                </span>
              </td>
              <td class="px-4 border-e py-3">
                <span :class="getStatusClass(ticket.status)" class="px-2.5 py-1 rounded-full text-xs font-medium">
                  {{ getStatusText(ticket.status) }}
                </span>
              </td>
              <td class="px-4 border-e py-3 text-sm text-gray-700">{{ ticket?.customer?.user?.name|| 'N/A' }}</td>

               <td class="px-4 border-e py-3">
                <div class="max-w-[120px]">
                  <span class="text-sm text-gray-700 truncate block" :title="ticket.end_user.user.name || 'N/A'">
                    {{ ticket.end_user.user.name || 'N/A' }}
                  </span>
                </div>
              </td>
              <td class="px-4 border-e py-3 text-sm text-gray-700">{{ ticket.end_user.user.email || 'N/A' }}</td>
              <td class="px-4 border-e py-3">
                <div v-if="ticket.attachment" class="flex justify-center">
                  <img :src="ticket.attachment" alt="Attachment"
                    class="w-12 h-12 object-cover rounded-lg border border-purple-200 hover:border-purple-400 transition-colors cursor-pointer"
                    @click="openImage(ticket.attachment)" />
                </div>
                <div v-else class="text-gray-400 text-xs italic text-center">No File</div>
              </td>

              <!-- Actions -->
              <td class="px-4 border-e py-3">
                <button @click="viewTicket(ticket)"
                  class="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-colors">
                  View Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="inline-flex flex-col items-center">
          <div class="w-20 h-20 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg class="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900">No unresolved tickets</h3>
          <p class="mt-1 text-sm text-gray-600">All tickets have been resolved! Great job!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import Swal from 'sweetalert2'
import api from '@/config/api'
import { useAuthStore } from '@/stores/AuthStore'
import { useRoute } from 'vue-router'

const isLoading = ref(true)
const unresolvedTickets = ref([])
const searchQuery = ref('')
const authStore = useAuthStore()

const route = useRoute()
const filters = reactive({
  priority: 'all',
  type: 'all'
})
const updatingId = ref(null)

const fetchTickets = async () => {
  isLoading.value = true
  try {
    const response = await api().get(`/customer-support?type=online&status=0&customer_id=${route.query.id}`)
    unresolvedTickets.value = response.data.data || []
  } catch (error) {
    Swal.fire('Error', 'Failed to load tickets.', 'error')
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchTickets)

const filteredTickets = computed(() => {
  return unresolvedTickets.value.filter(ticket => {
    const search = searchQuery.value.toLowerCase()
    const matchesSearch = ticket.subject?.toLowerCase().includes(search) ||
                         ticket.description?.toLowerCase().includes(search)
    const matchesPriority = filters.priority === 'all' || ticket.priority_level === filters.priority
    const matchesType = filters.type === 'all' || ticket.issue_type === filters.type
    return matchesSearch && matchesPriority && matchesType
  })
})

const viewTicket = (ticket) => {
  Swal.fire({
    title: `<strong>${ticket.subject}</strong>`,
    html: `
      <div class="text-left space-y-2">
        <p><strong>Ticket ID:</strong> #${ticket.id}</p>
        <p><strong>Type:</strong> ${ticket.issue_type}</p>
        <p><strong>Priority:</strong> ${ticket.priority_level}</p>
        <p><strong>Status:</strong> <span class="font-bold">${getStatusText(ticket.status)}</span></p>
        <p><strong>Customer:</strong> ${ticket.user?.name || 'N/A'}</p>
        <hr class="my-3">
        <p class="whitespace-pre-wrap">${ticket.description}</p>
      </div>
    `,
    icon: 'info',
    width: '600px'
  })
}

const openImage = (url) => {
  window.open(url, '_blank')
}

const updateTicketStatus = async (ticketId, newStatus) => {
  if (updatingId.value === ticketId) return

  const ticket = unresolvedTickets.value.find(t => t.id === ticketId)
  if (ticket) ticket.status = newStatus
  updatingId.value = ticketId

  try {
    await api().post(`/customer-support-status-update/${ticketId}`, {
      status: 1,
      _method: 'put'
    })

    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: `Ticket #${ticketId} updated successfully.`,
      timer: 2000,
      showConfirmButton: false
    })

  } catch (error) {
    await fetchTickets()
    Swal.fire('Error', 'Failed to update status. Please try again.', 'error')
  } finally {
    updatingId.value = null
  }
}

// Helper functions
const getStatusText = (status) => {
  return { 0: 'Unresolved', 2: 'In Progress', 3: 'Approved', 4: 'Rejected' }[status] || 'Unknown'
}

const getStatusClass = (status) => {
  const classes = {
    1: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    2: 'bg-blue-100 text-blue-800 border border-blue-200',
    3: 'bg-green-100 text-green-800 border border-green-200',
    4: 'bg-red-100 text-red-800 border border-red-200'
  }
  return classes[status] || 'bg-gray-100 text-gray-800 border border-gray-200'
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>