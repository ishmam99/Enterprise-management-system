oh no. you removed view details button. btw i keep your previous  response.

<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8">
    <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Solved Tickets
          </h1>
          <p class="text-gray-600 mt-2 flex items-center">
            <i class="ri-information-line ri-lg mr-2 text-purple-500"></i>
            Review and manage resolved customer issues
          </p>
        </div>
        <div class="flex items-center space-x-4">
          <button
            @click="$router.push('/create-ticket')"
            class="flex items-center px-5 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <i class="ri-add-line ri-lg mr-2"></i>
            New Ticket
          </button>
          <button
            @click="$router.back()"
            class="flex items-center px-4 py-2 text-gray-600 hover:text-purple-700 transition-colors border border-gray-300 hover:border-purple-400 rounded-lg"
          >
            <i class="ri-arrow-left-line ri-lg mr-2"></i>
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
                <i class="ri-search-line text-purple-500"></i>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search solved tickets..."
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
                <i class="ri-arrow-down-s-line text-purple-500"></i>
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
                <i class="ri-arrow-down-s-line text-purple-500"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-20">
        <div class="inline-flex flex-col items-center">
          <div class="relative">
            <i class="ri-loader-4-line animate-spin text-4xl text-purple-600"></i>
          </div>
          <p class="text-gray-600 mt-4 font-medium">Loading solved tickets...</p>
        </div>
      </div>

      <!-- Main Content Area -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Tickets List -->
        <div class="lg:col-span-3">
          <!-- Tickets Table -->
          <div v-if="filteredTickets.length > 0" class="overflow-x-auto bg-white rounded-2xl shadow-xl border border-purple-100">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white">
                  <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider rounded-tl-2xl">Ticket #</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Subject</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Type</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Priority</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Status</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Customer</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">End User</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Attachment</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider rounded-tr-2xl">Action</th>
                </tr>
              </thead>

              <tbody class="divide-y divide-gray-100 bg-white">
                <tr
                  v-for="ticket in filteredTickets"
                  :key="ticket.id"
                  class="hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 cursor-pointer"
                  :class="{ 'bg-green-50': selectedTicket?.id === ticket.id }"
                  @click="selectTicket(ticket)"
                >
                  <!-- Ticket ID -->
                  <td class="px-6 py-4 text-sm font-bold text-green-700">#{{ ticket.id }}</td>

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
                        getPriorityClasses(ticket.priority_level)
                      ]"
                    >
                      {{ ticket.priority_level }}
                    </span>
                  </td>

                  <!-- Status -->
                  <td class="px-6 py-4">
                    <span
                      :class="getStatusClass(ticket.status)"
                      class="px-3 py-1.5 rounded-full text-xs font-bold"
                    >
                      {{ getStatusText(ticket.status) }}
                    </span>
                  </td>

                  <!-- Customer -->
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-700">
                      <div class="font-medium">{{ ticket.customer?.user?.name || 'N/A' }}</div>
                      <div class="text-xs text-gray-500">{{ ticket.customer?.user?.email || '' }}</div>
                    </div>
                  </td>

                  <!-- End User -->
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-700">
                      <div class="font-medium">{{ ticket.end_user?.user?.name || 'N/A' }}</div>
                      <div class="text-xs text-gray-500">{{ ticket.end_user?.user?.email || '' }}</div>
                    </div>
                  </td>

                  <!-- Attachment -->
                  <td class="px-6 py-4">
                    <div v-if="ticket.attachment" class="flex justify-center">
                      <div class="relative group">
                        <img
                          :src="getFullAttachmentUrl(ticket.attachment)"
                          alt="Attachment"
                          class="w-12 h-12 object-cover rounded-lg border-2 border-green-200 group-hover:border-green-400 transition-all duration-300"
                          @error="handleImageError"
                        />
                        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-300 flex items-center justify-center">
                          <i class="ri-eye-line text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
                        </div>
                      </div>
                    </div>
                    <div v-else class="text-gray-400 text-xs italic text-center">No File</div>
                  </td>

                  <!-- Action -->
                  <td class="px-6 py-4">
                    <button
                      @click.stop="selectTicket(ticket)"
                      class="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
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
                <div class="w-24 h-24 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                  <i class="ri-checkbox-circle-line text-4xl text-green-500"></i>
                </div>
                <div class="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <i class="ri-check-line text-white text-sm"></i>
                </div>
              </div>
              <h3 class="text-2xl font-bold text-gray-900">No solved tickets found</h3>
              <p class="mt-2 text-gray-600">No solved tickets match your current filters</p>
              <button
                @click="clearFilters"
                class="mt-6 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        <!-- Ticket Details Sidebar -->
        <div class="lg:col-span-1">
          <div v-if="selectedTicket" class="bg-white rounded-2xl shadow-xl border border-green-100 sticky top-8">
            <!-- Header -->
            <div class="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-2xl">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-bold">Ticket Details</h2>
                <button
                  @click="selectedTicket = null"
                  class="p-2 hover:bg-green-500 rounded-lg transition-colors"
                >
                  <i class="ri-close-line text-lg"></i>
                </button>
              </div>
              <div class="flex items-center space-x-4">
                <div class="text-2xl font-bold text-white">#{{ selectedTicket.id }}</div>
                <span
                  :class="getStatusClass(selectedTicket.status)"
                  class="px-3 py-1 rounded-full text-xs font-semibold text-white"
                >
                  {{ getStatusText(selectedTicket.status) }}
                </span>
              </div>
              <div class="mt-2 flex items-center text-green-100 text-sm">
                <i class="ri-check-double-line mr-1"></i>
                This ticket has been resolved
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              <!-- Subject & Description -->
              <div>
                <h3 class="text-sm font-semibold text-gray-500 mb-2 flex items-center">
                  <i class="ri-chat-1-line mr-2 text-green-500"></i>
                  SUBJECT
                </h3>
                <p class="text-lg font-semibold text-gray-900">{{ selectedTicket.subject }}</p>
              </div>

              <div>
                <h3 class="text-sm font-semibold text-gray-500 mb-2 flex items-center">
                  <i class="ri-file-text-line mr-2 text-green-500"></i>
                  DESCRIPTION
                </h3>
                <p class="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg">{{ selectedTicket.description }}</p>
              </div>

              <!-- Quick Info Grid -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <h3 class="text-sm font-semibold text-gray-500 mb-2 flex items-center">
                    <i class="ri-tag-line mr-2 text-green-500"></i>
                    TYPE
                  </h3>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ selectedTicket.issue_type }}
                  </span>
                </div>

                <div>
                  <h3 class="text-sm font-semibold text-gray-500 mb-2 flex items-center">
                    <i class="ri-alarm-warning-line mr-2 text-green-500"></i>
                    PRIORITY
                  </h3>
                  <span
                    :class="[
                      'px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm',
                      getPriorityClasses(selectedTicket.priority_level)
                    ]"
                  >
                    {{ selectedTicket.priority_level }}
                  </span>
                </div>
              </div>

              <!-- Resolution Info -->
              <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                <div class="flex items-center mb-2">
                  <i class="ri-checkbox-circle-line text-green-600 text-lg mr-2"></i>
                  <h3 class="text-sm font-semibold text-green-800">RESOLUTION STATUS</h3>
                </div>
                <p class="text-green-700 text-sm">
                  This ticket was successfully resolved and closed.
                </p>
                <div class="mt-2 text-xs text-green-600">
                  <div class="flex justify-between">
                    <span>Final Status:</span>
                    <span class="font-semibold">{{ getStatusText(selectedTicket.status) }}</span>
                  </div>
                </div>
              </div>

              <!-- Customer Information -->
              <div>
                <h3 class="text-sm font-semibold text-gray-500 mb-3 flex items-center">
                  <i class="ri-building-line mr-2 text-green-500"></i>
                  CUSTOMER INFORMATION
                </h3>
                <div class="space-y-3">
                  <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                    <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <i class="ri-building-2-line text-white text-sm"></i>
                    </div>
                    <div class="flex-1">
                      <p class="font-medium text-sm text-gray-900">{{ selectedTicket.customer?.user?.name || 'N/A' }}</p>
                      <p class="text-xs text-gray-500">Customer Organization</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                    <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
                      <i class="ri-user-line text-white text-sm"></i>
                    </div>
                    <div class="flex-1">
                      <p class="font-medium text-sm text-gray-900">{{ selectedTicket.end_user?.user?.name || 'N/A' }}</p>
                      <p class="text-xs text-gray-500">{{ selectedTicket.end_user?.user?.email || 'N/A' }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Product Information -->
              <div v-if="selectedTicket.solution || selectedTicket.software">
                <h3 class="text-sm font-semibold text-gray-500 mb-3 flex items-center">
                  <i class="ri-tools-line mr-2 text-green-500"></i>
                  PRODUCT INFORMATION
                </h3>
                <div class="space-y-2">
                  <div v-if="selectedTicket.solution" class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                    <i class="ri-lightbulb-line text-green-500"></i>
                    <div>
                      <p class="font-medium text-sm">{{ selectedTicket.solution.name }}</p>
                      <p class="text-xs text-gray-500">Solution</p>
                    </div>
                  </div>
                  <div v-if="selectedTicket.software" class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
                    <i class="ri-computer-line text-blue-500"></i>
                    <div>
                      <p class="font-medium text-sm">{{ selectedTicket.software.name }}</p>
                      <p class="text-xs text-gray-500">Software</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Attachment -->
              <div v-if="selectedTicket.attachment">
                <h3 class="text-sm font-semibold text-gray-500 mb-2 flex items-center">
                  <i class="ri-attachment-line mr-2 text-green-500"></i>
                  ATTACHMENT
                </h3>
                <div class="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <img
                    :src="getFullAttachmentUrl(selectedTicket.attachment)"
                    alt="Attachment"
                    class="w-12 h-12 object-cover rounded-lg border border-green-300"
                    @error="handleImageError"
                  />
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">Attachment</p>
                    <p class="text-xs text-gray-500">Click to view</p>
                  </div>
                  <button
                    @click="viewAttachment(selectedTicket.attachment)"
                    class="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                  >
                    <i class="ri-external-link-line"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- No Ticket Selected State -->
          <div v-else class="bg-white rounded-2xl shadow-xl border border-green-100 p-8 text-center">
            <div class="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="ri-ticket-line text-2xl text-green-500"></i>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Select a Ticket</h3>
            <p class="text-gray-600 text-sm">Click on a ticket from the list to view its details</p>
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

const isLoading = ref(true)
const solvedTickets = ref([])
const selectedTicket = ref(null)
const searchQuery = ref('')
const filters = reactive({
  priority: 'all',
  type: 'all'
})

// Fetch solved tickets from API
const fetchTickets = async () => {
  isLoading.value = true
  try {
    const response = await api().get('/customer-support?type=online&status=1')
    solvedTickets.value = response.data.data || []
  } catch (error) {
    console.error('Error fetching solved tickets:', error)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to fetch solved tickets. Please try again.',
      confirmButtonColor: '#10b981'
    })
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchTickets)

const filteredTickets = computed(() => {
  return solvedTickets.value.filter(ticket => {
    const matchesSearch =
      ticket.subject?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      ticket.description?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      ticket.customer?.user?.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      ticket.end_user?.user?.name?.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesPriority =
      filters.priority === 'all' || ticket.priority_level === filters.priority

    const matchesType =
      filters.type === 'all' || ticket.issue_type === filters.type

    return matchesSearch && matchesPriority && matchesType
  })
})

const getPriorityClasses = (priority) => {
  switch (priority) {
    case 'High':
      return 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border border-red-200'
    case 'Medium':
      return 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border border-yellow-200'
    case 'Low':
      return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200'
    default:
      return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 border border-gray-200'
  }
}

const getStatusText = (status) => {
  const statusMap = { 
    0: 'Unresolved', 
    1: 'Solved',
    2: 'In Progress', 
    3: 'Approved', 
    4: 'Rejected' 
  }
  return statusMap[status] || 'Unknown'
}

const getStatusClass = (status) => {
  const classes = {
    0: 'bg-gray-100 text-gray-800 border border-gray-300',
    1: 'bg-green-100 text-green-800 border border-green-300',
    2: 'bg-blue-100 text-blue-800 border border-blue-300',
    3: 'bg-green-100 text-green-800 border border-green-300',
    4: 'bg-red-100 text-red-800 border border-red-300'
  }
  return classes[status] || 'bg-gray-100 text-gray-800 border border-gray-300'
}

const getFullAttachmentUrl = (attachmentPath) => {
  if (!attachmentPath) return ''
  if (attachmentPath.startsWith('http')) return attachmentPath
  return `${import.meta.env.VITE_API_BASE_URL || ''}${attachmentPath}`
}

const handleImageError = (event) => {
  event.target.style.display = 'none'
  event.target.parentElement.innerHTML = `
    <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
      <i class="ri-image-line text-gray-400 text-xl"></i>
    </div>
  `
}

const selectTicket = (ticket) => {
  selectedTicket.value = ticket
}

const viewAttachment = (attachmentUrl) => {
  const fullUrl = getFullAttachmentUrl(attachmentUrl)
  window.open(fullUrl, '_blank')
}


const clearFilters = () => {
  searchQuery.value = ''
  filters.priority = 'all'
  filters.type = 'all'
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(to right, #10b981, #059669);
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to right, #059669, #047857);
}
</style>