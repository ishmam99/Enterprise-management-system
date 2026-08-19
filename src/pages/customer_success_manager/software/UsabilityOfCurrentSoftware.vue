<template>
  <div class="px-4 md:px-16 py-6 w-full mx-auto">
    <!-- Customer Software List -->
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="bg-gradient-to-r from-teal-700 to-teal-800 text-white px-6 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-semibold">Usability Of Current Software</h1>
          <div class="flex items-center space-x-3">
            <span class="bg-teal-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {{ customerSoftware.length }} Assignments
            </span>
          </div>
        </div>
      </div>

      <div class="p-6">
        <!-- Search and Filter -->
        <div class="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
          <div class="relative flex-1 max-w-md">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by customer or software..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
            />
            <svg
              class="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div class="flex gap-2">
            <select
              v-model="statusFilter"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
            >
              <option value="all">All Status</option>
              <option value="0">Active</option>
              <option value="1">Inactive</option>
            </select>

            <button
              @click="exportToCSV"
              class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition flex items-center gap-2"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
          <p class="mt-2 text-gray-500">Loading assignments...</p>
        </div>

        <!-- No Data State -->
        <div v-else-if="filteredData.length === 0" class="text-center py-12 bg-gray-50 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="mt-2 text-gray-500">No software assignments found.</p>
        </div>

        <!-- Data Table -->
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 border border-slate-100 table-zebra">
            <thead class="bg-emerald-50">
              <tr>
                <th scope="col" class="px-6 py-3 border-e text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" class="px-6 py-3 border-e text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Software
                </th>
                <th scope="col" class="px-6 py-3 border-e text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" class="px-6 py-3 border-e text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usability
                </th>
                <th scope="col" class="px-6 py-3 border-e text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" class="px-6 py-3 border-e text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(item, index) in paginatedData" :key="item.id" class="hover:bg-gray-50 transition">
                <!-- ID -->
                <td class="px-6 py-4 border-e border-slate-200 whitespace-nowrap text-sm text-gray-500">
                  #{{ index+1}}
                </td>

                <!-- Software Info -->
                <td class="px-6 py-4 border-e border-slate-200">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span class="text-blue-600 font-medium text-sm">
                        {{ getSoftwareInitials(item.software?.name) }}
                      </span>
                    </div>
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-900">
                        {{ item.software?.name || 'N/A' }}
                      </div>
                      <div class="text-xs text-gray-500">
                        ID: {{ item.software_id }}
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Customer Info -->
                <td class="px-6 py-4 border-e border-slate-200">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 bg-teal-100 rounded-full flex items-center justify-center">
                      <span class="text-teal-600 font-medium text-sm">
                        {{ getCustomerInitials(item.customer?.user?.name) }}
                      </span>
                    </div>
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-900">
                        {{ item.customer?.user?.name || 'N/A' }}
                      </div>
                      <div class="text-xs text-gray-500">
                        {{ item.customer?.user?.email || 'No email' }}
                      </div>
                      <div class="text-xs text-gray-400">
                        {{ item.customer?.phone || 'No phone' }}
                      </div>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-4 border-e border-slate-200 whitespace-nowrap">
                  <!-- VIEW MODE -->
                  <div v-if="!item.isEditing">
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                      <div class="h-2.5 rounded-full transition-all duration-300"
                        :class="getProgressBarColor(item.usability)" :style="{ width: Number(item.usability) + '%' }">
                      </div>
                    </div>
                    
                    <div class="flex items-center justify-between mt-1">
                      <span class="text-xs text-gray-500">
                        {{ item.usabilityValue }}%
                      </span>

                      <button
                        @click="startEdit(item)"
                        class="text-xs text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                  </div>

                  <!-- EDIT MODE -->
                  <div v-else class="space-y-2 min-w-[200px]">
                    <!-- Slider for 1-100 selection -->
                    <div class="flex items-center gap-3">
                      <span class="text-xs text-gray-500 w-8">1</span>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        step="1"
                        v-model.number="item.tempUsability"
                        class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                      />
                      <span class="text-xs text-gray-500 w-8 text-right">100</span>
                    </div>
                    
                    <!-- Value display and action buttons -->
                    <div class="flex items-center justify-between gap-2">
                      <div class="text-sm font-semibold text-teal-700 bg-teal-50 px-2 py-1 rounded min-w-[60px] text-center">
                        {{ item.tempUsability }}%
                      </div>
                      
                      <div class="flex gap-1">
                        <button
                          @click="saveUsability(item)"
                          :disabled="item.isSaving"
                          class="bg-green-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition"
                        >
                          <svg
                            v-if="item.isSaving"
                            class="animate-spin h-3 w-3"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              class="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="white"
                              stroke-width="4"
                              fill="none"
                            />
                            <path
                              class="opacity-75"
                              fill="white"
                              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a10 10 0 00-10 10h4z"
                            />
                          </svg>
                          {{ item.isSaving ? 'Saving...' : 'Save' }}
                        </button>

                        <button
                          @click="cancelEdit(item)"
                          class="bg-gray-600 text-white hover:bg-gray-500 px-2 py-1 rounded text-xs transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Status -->
                <td class="px-6 py-4 border-e border-slate-200 whitespace-nowrap">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="item.status === '0' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                  >
                    {{ item.status === '0' ? 'Active' : 'Inactive' }}
                  </span>
                </td>

                <!-- Actions -->
                <td class="px-6 py-4 border-e border-slate-200 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    @click="viewDetails(item)"
                    class="text-teal-600 flex items-center gap-1 hover:text-teal-900 mr-3"
                    title="View details"
                  >
                    <svg class="h-5 w-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg> View Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Pagination -->
          <div class="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-200">
            <div class="flex-1 flex justify-between sm:hidden">
              <button
                @click="currentPage--"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                @click="currentPage++"
                :disabled="currentPage === totalPages"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  Showing
                  <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
                  to
                  <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredData.length) }}</span>
                  of
                  <span class="font-medium">{{ filteredData.length }}</span>
                  results
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    @click="currentPage--"
                    :disabled="currentPage === 1"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span class="sr-only">Previous</span>
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </button>

                  <button
                    v-for="page in displayedPages"
                    :key="page"
                    @click="currentPage = page"
                    :class="[
                      page === currentPage
                        ? 'z-10 bg-teal-50 border-teal-500 text-teal-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                    ]"
                  >
                    {{ page }}
                  </button>

                  <button
                    @click="currentPage++"
                    :disabled="currentPage === totalPages"
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span class="sr-only">Next</span>
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Details Modal -->
    <div v-if="showDetailsModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4" @click="closeModal">
      <div class="relative mx-auto p-6 border w-full max-w-2xl shadow-lg rounded-lg bg-white" @click.stop>
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold text-gray-900">Assignment Details</h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div v-if="selectedItem" class="space-y-4">
          <!-- Assignment Info -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-700 mb-2">Assignment Information</h4>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-xs text-gray-500">Assignment ID</p>
                <p class="text-sm font-medium">#{{ selectedItem.id }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500">Status</p>
                <p class="text-sm">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="selectedItem.status === '0' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'">
                    {{ selectedItem.status === '0' ? 'Active' : 'Inactive' }}
                  </span>
                </p>
              </div>
              <div>
                <p class="text-xs text-gray-500">Assigned Date</p>
                <p class="text-sm">{{ formatDate(selectedItem.created_at) }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500">Last Updated</p>
                <p class="text-sm">{{ formatDate(selectedItem.updated_at) }}</p>
              </div>
            </div>
          </div>

          <!-- Customer Details -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-700 mb-2">Customer Details</h4>
            <div class="space-y-2">
              <div class="flex items-center">
                <div class="w-24 text-xs text-gray-500">Name:</div>
                <div class="text-sm font-medium">{{ selectedItem.customer?.user?.name }}</div>
              </div>
              <div class="flex items-center">
                <div class="w-24 text-xs text-gray-500">Email:</div>
                <div class="text-sm">{{ selectedItem.customer?.user?.email }}</div>
              </div>
              <div class="flex items-center">
                <div class="w-24 text-xs text-gray-500">Phone:</div>
                <div class="text-sm">{{ selectedItem.customer?.phone }}</div>
              </div>
              <div class="flex items-start">
                <div class="w-24 text-xs text-gray-500">Address:</div>
                <div class="text-sm flex-1">{{ selectedItem.customer?.address }}</div>
              </div>
              <div class="flex items-center">
                <div class="w-24 text-xs text-gray-500">Customer ID:</div>
                <div class="text-sm">#{{ selectedItem.customer_id }}</div>
              </div>
            </div>
          </div>

          <!-- Software Details -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-700 mb-2">Software Details</h4>
            <div class="space-y-2">
              <div class="flex items-center">
                <div class="w-24 text-xs text-gray-500">Name:</div>
                <div class="text-sm font-medium">{{ selectedItem.software?.name }}</div>
              </div>
              <div class="flex items-center">
                <div class="w-24 text-xs text-gray-500">Software ID:</div>
                <div class="text-sm">#{{ selectedItem.software_id }}</div>
              </div>
              <div class="flex items-center">
                <div class="w-24 text-xs text-gray-500">Status:</div>
                <div class="text-sm">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="selectedItem.software?.status === '0' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'">
                    {{ selectedItem.software?.status === '0' ? 'Active' : 'Inactive' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end gap-3">
          <button @click="closeModal" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import api from '@/config/api'
import { useToast } from '@/components/ui/toast/use-toast'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/stores/AuthStore'

const { toast } = useToast()
const authStore = useAuthStore()

// State
const customerSoftware = ref([])
const loading = ref(false)
const searchQuery = ref('')
const statusFilter = ref('all')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const showDetailsModal = ref(false)
const selectedItem = ref(null)

// Computed Properties
const filteredData = computed(() => {
  return customerSoftware.value.filter(item => {
    // Search filter
    const matchesSearch = !searchQuery.value ||
      item.customer?.user?.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.customer?.user?.email?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.software?.name?.toLowerCase().includes(searchQuery.value.toLowerCase())

    // Status filter
    const matchesStatus = statusFilter.value === 'all' ||
      item.status === statusFilter.value

    return matchesSearch && matchesStatus
  })
})

const prepareData = (data) => {
  return data.map(e => ({
    ...e,
    usabilityValue: Number(e.usability || 0),
    tempUsability: Number(e.usability || 0),
    isEditing: false,
    isSaving: false
  }))
}

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredData.value.slice(start, end)
})
const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPerPage.value)
})

const displayedPages = computed(() => {
  const delta = 2
  const range = []
  const rangeWithDots = []
  let l

  for (let i = 1; i <= totalPages.value; i++) {
    if (i === 1 || i === totalPages.value || (i >= currentPage.value - delta && i <= currentPage.value + delta)) {
      range.push(i)
    }
  }

  range.forEach(i => {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (i - l !== 1) {
        rangeWithDots.push('...')
      }
    }
    rangeWithDots.push(i)
    l = i
  })

  return rangeWithDots
})

// Methods
const getCustomerInitials = (name) => {
  if (!name) return '?'
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const getSoftwareInitials = (name) => {
  if (!name) return '?'
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const fetchCustomerSoftware = async () => {
  loading.value = true
  try {
    const response = await api().get('/customer-software?company_id=' + authStore.companyId)
    customerSoftware.value = prepareData(response.data || [])
  } catch (error) {
    console.error('Error fetching customer software:', error)
    toast({
      title: 'Error',
      description: 'Failed to fetch customer software assignments.',
      variant: 'destructive'
    })
  } finally {
    loading.value = false
  }
}

const viewDetails = (item) => {
  selectedItem.value = item
  showDetailsModal.value = true
}

const closeModal = () => {
  showDetailsModal.value = false
  selectedItem.value = null
}

const editAssignment = (item) => {
  toast({
    title: 'Info',
    description: 'Edit functionality coming soon'
  })
}

const confirmDelete = (item) => {
  Swal.fire({
    title: 'Are you sure?',
    text: `You are about to delete the software assignment for ${item.software?.name}. This action cannot be undone.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#0d9488',
    confirmButtonText: 'Yes, delete it!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      await deleteAssignment(item.id)
    }
  })
}

const deleteAssignment = async (id) => {
  try {
    await api().delete(`/customer-software/${id}`)

    // Remove from local list
    customerSoftware.value = customerSoftware.value.filter(item => item.id !== id)

    Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      text: 'Assignment has been deleted.',
      confirmButtonColor: '#0d9488'
    })
  } catch (error) {
    console.error('Error deleting assignment:', error)
    toast({
      title: 'Error',
      description: 'Failed to delete assignment.',
      variant: 'destructive'
    })
  }
}


const exportToCSV = () => {
  // Prepare data for export
  const exportData = filteredData.value.map(item => ({
    'Assignment ID': item.id,
    'Customer Name': item.customer?.user?.name || 'N/A',
    'Customer Email': item.customer?.user?.email || 'N/A',
    'Customer Phone': item.customer?.phone || 'N/A',
    'Software Name': item.software?.name || 'N/A',
    'Software ID': item.software_id,
    'Status': item.status === '0' ? 'Active' : 'Inactive',
    'Assigned Date': formatDate(item.created_at)
  }))

  // Convert to CSV
  const headers = Object.keys(exportData[0] || {})
  const csvContent = [
    headers.join(','),
    ...exportData.map(row => headers.map(header => JSON.stringify(row[header] || '')).join(','))
  ].join('\n')

  // Download CSV
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', 'customer_software_export.csv')
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Watch for filter changes to reset pagination
watch([searchQuery, statusFilter], () => {
  currentPage.value = 1
})

const startEdit = (item) => {
  item.isEditing = true
  item.tempUsability = item.usabilityValue
}

const cancelEdit = (item) => {
  item.isEditing = false
  item.tempUsability = item.usabilityValue
}

const saveUsability = async (item) => {
  item.isSaving = true

  try {
    await api().post(`customer-software/${item.id}`, {
      _method: 'PUT',
      usability: item.tempUsability
    })

    item.usabilityValue = item.tempUsability
    item.usability = item.tempUsability
    item.isEditing = false

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: 'Usability updated successfully.',
      confirmButtonColor: '#0d9488',
      timer: 1500,
      showConfirmButton: false
    })

  } catch (error) {
    console.error(error)

    Swal.fire({
      icon: 'error',
      title: 'Failed!',
      text: 'Could not update usability.',
      confirmButtonColor: '#dc2626'
    })

  } finally {
    item.isSaving = false
  }
}

const getProgressBarColor = (percentage) => {
  if (Number(percentage) < 40) return 'bg-red-500'
  if (Number(percentage) >= 40 && Number(percentage) < 70) return 'bg-yellow-500'
  return 'bg-green-500'
}

// Lifecycle
onMounted(() => {
  fetchCustomerSoftware()
})
</script>