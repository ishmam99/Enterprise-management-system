<template>
  <div class="px-4 md:px-16 py-6 w-full mx-auto">
    <!-- Customer Solutions List -->
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="bg-gradient-to-r from-teal-700 to-teal-800 text-white px-6 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-semibold">Customer Solutions</h1>
          <div class="flex items-center space-x-3">
            <span class="bg-teal-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {{ solutions.length }} Solutions
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
              placeholder="Search by solution or customer..."
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
              @click="showAddModal = true"
              class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition flex items-center gap-2"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Solution
            </button>

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
          <p class="mt-2 text-gray-500">Loading solutions...</p>
        </div>

        <!-- No Data State -->
        <div v-else-if="filteredSolutions.length === 0" class="text-center py-12 bg-gray-50 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <p class="mt-2 text-gray-500">No solutions found. Add your first solution above.</p>
        </div>

        <!-- Solutions Table -->
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 table-zebra">
            <thead class="bg-emerald-50">
              <tr>
                <th scope="col" class="px-6 py-3 border-e text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" class="px-6 py-3 border-e text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Solution
                </th>
                <th scope="col" class="px-6 py-3 border-e text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" class="px-6 py-3 border-e text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Software Products
                </th>
                <th scope="col" class="px-6 py-3 border-e text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" class="px-6 py-3 border-e text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th scope="col" class="px-6 py-3 border-e text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="solution in paginatedSolutions" :key="solution.id" class="hover:bg-gray-50 transition">
                <!-- ID -->
                <td class="px-6 py-4 border-e border-slate-200 whitespace-nowrap text-sm text-gray-500">
                  #{{ solution.id }}
                </td>

                <!-- Solution Name with Edit -->
                <td class="px-6 py-4 border-e border-slate-200">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span class="text-purple-600 font-medium text-sm">
                        {{ getInitials(solution.solution_name) }}
                      </span>
                    </div>
                    <div class="ml-3">
                      <div v-if="!solution.editing" class="text-sm font-medium text-gray-900">
                        {{ solution.solution_name }}
                      </div>
                      <input
                        v-else
                        v-model="solution.editName"
                        type="text"
                        class="text-sm font-medium text-gray-900 border border-gray-300 rounded-lg px-3 py-1 w-full"
                        @keyup.enter="updateSolution(solution)"
                        @keyup.escape="cancelEdit(solution)"
                      />
                    </div>
                  </div>
                </td>

                <!-- Customer Info -->
                <td class="px-6 py-4 border-e border-slate-200">
                  <div v-if="solution.customer" class="text-sm">
                    <div class="font-medium text-gray-900">
                      {{ solution.customer.user?.name || 'N/A' }}
                    </div>
                    <div class="text-xs text-gray-500">
                      {{ solution.customer.user?.email || 'No email' }}
                    </div>
                    <div class="text-xs text-gray-400">
                      ID: {{ solution.customer_id }}
                    </div>
                  </div>
                  <div v-else class="text-sm text-gray-400">
                    No customer assigned
                  </div>
                </td>

                <!-- Software Products -->
                <td class="px-6 py-4 border-e border-slate-200">
                  <div class="flex flex-col gap-1">
                    <div class="flex flex-wrap gap-1 max-w-xs">
                      <span
                        v-for="software in solution.softwares"
                        :key="software.id"
                        class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
                        :title="software.name"
                      >
                        {{ software.name }}
                      </span>
                      <span v-if="!solution.softwares?.length" class="text-xs text-gray-400">
                        No software
                      </span>
                    </div>
                    <span v-if="solution.softwares?.length" class="text-xs text-gray-500 mt-1">
                      {{ solution.softwares.length }} software{{ solution.softwares.length !== 1 ? 's' : '' }}
                    </span>
                  </div>
                </td>

                <!-- Status -->
                <td class="px-6 py-4 border-e border-slate-200 whitespace-nowrap">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="solution.status === '0' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                  >
                    {{ solution.status === '0' ? 'Active' : 'Inactive' }}
                  </span>
                </td>

                <!-- Created Date -->
                <td class="px-6 py-4 border-e border-slate-200 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(solution.created_at) }}
                </td>

                <!-- Actions -->
                <td class="px-6 py-4 border-e border-slate-200 whitespace-nowrap text-right text-sm font-medium">
                  <!-- Edit buttons -->
                  <!-- <button
                    v-if="!solution.editing"
                    @click="enableEdit(solution)"
                    class="text-teal-600 hover:text-teal-900 mr-3"
                    title="Edit solution"
                  >
                    <svg class="h-5 w-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button> -->

                  <!-- <button
                    v-if="solution.editing"
                    @click="updateSolution(solution)"
                    class="text-green-600 hover:text-green-900 mr-3"
                    title="Save changes"
                  >
                    <svg class="h-5 w-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </button> -->

                  <!-- <button
                    v-if="solution.editing"
                    @click="cancelEdit(solution)"
                    class="text-gray-600 hover:text-gray-900 mr-3"
                    title="Cancel"
                  >
                    <svg class="h-5 w-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button> -->

                  <!-- View Details -->
                  <button
                    @click="viewDetails(solution)"
                    class="text-blue-600 hover:text-blue-900 mr-3"
                    title="View details"
                  >
                    <svg class="h-5 w-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>

                  <!-- Delete -->
                  <!-- <button
                    v-if="!solution.editing"
                    @click="confirmDelete(solution)"
                    class="text-red-600 hover:text-red-900"
                    title="Delete solution"
                  >
                    <svg class="h-5 w-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button> -->
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
                  <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredSolutions.length) }}</span>
                  of
                  <span class="font-medium">{{ filteredSolutions.length }}</span>
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

    <!-- Add Solution Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4" @click="showAddModal = false">
      <div class="relative mx-auto p-6 border w-full max-w-md shadow-lg rounded-lg bg-white" @click.stop>
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold text-gray-900">Add New Solution</h3>
          <button @click="showAddModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="addSolution" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Solution Name <span class="text-red-500">*</span>
            </label>
            <input
              v-model="newSolution.name"
              type="text"
              required
              placeholder="Enter solution name"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              v-model="newSolution.description"
              rows="3"
              placeholder="Enter solution description"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              v-model="newSolution.status"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
            >
              <option value="0">Active</option>
              <option value="1">Inactive</option>
            </select>
          </div>

          <div class="flex justify-end gap-3 pt-4">
            <button
              type="button"
              @click="showAddModal = false"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="addLoading"
              class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition disabled:opacity-50 flex items-center gap-2"
            >
              <svg v-if="addLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              {{ addLoading ? 'Adding...' : 'Add Solution' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Details Modal -->
    <div v-if="showDetailsModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4" @click="closeModal">
      <div class="relative mx-auto p-6 border w-full max-w-2xl shadow-lg rounded-lg bg-white" @click.stop>
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold text-gray-900">Solution Details</h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div v-if="selectedSolution" class="space-y-4">
          <!-- Solution Info -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-700 mb-2">Solution Information</h4>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-xs text-gray-500">Solution ID</p>
                <p class="text-sm font-medium">#{{ selectedSolution.id }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500">Solution Name</p>
                <p class="text-sm font-medium">{{ selectedSolution.solution_name }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500">Status</p>
                <p class="text-sm">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="selectedSolution.status === '0' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'">
                    {{ selectedSolution.status === '0' ? 'Active' : 'Inactive' }}
                  </span>
                </p>
              </div>
              <div>
                <p class="text-xs text-gray-500">Created</p>
                <p class="text-sm">{{ formatDate(selectedSolution.created_at) }}</p>
              </div>
            </div>
          </div>

          <!-- Customer Details -->
          <div v-if="selectedSolution.customer" class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-700 mb-2">Customer Details</h4>
            <div class="space-y-2">
              <div class="flex items-start">
                <div class="w-24 text-xs text-gray-500">Name:</div>
                <div class="text-sm font-medium flex-1">{{ selectedSolution.customer.user?.name }}</div>
              </div>
              <div class="flex items-start">
                <div class="w-24 text-xs text-gray-500">Email:</div>
                <div class="text-sm flex-1">{{ selectedSolution.customer.user?.email }}</div>
              </div>
              <div class="flex items-start">
                <div class="w-24 text-xs text-gray-500">Phone:</div>
                <div class="text-sm flex-1">{{ selectedSolution.customer.phone }}</div>
              </div>
              <div class="flex items-start">
                <div class="w-24 text-xs text-gray-500">Address:</div>
                <div class="text-sm flex-1">{{ selectedSolution.customer.address }}</div>
              </div>
              <div class="flex items-start">
                <div class="w-24 text-xs text-gray-500">Customer ID:</div>
                <div class="text-sm">#{{ selectedSolution.customer_id }}</div>
              </div>
            </div>
          </div>

          <!-- Software Products -->
          <div v-if="selectedSolution.softwares?.length" class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-700 mb-2">Software Products ({{ selectedSolution.softwares.length }})</h4>
            <div class="grid grid-cols-2 gap-2">
              <div v-for="software in selectedSolution.softwares" :key="software.id" class="p-2 bg-white rounded-lg border border-gray-200">
                <p class="text-sm font-medium text-gray-900">{{ software.name }}</p>
                <p class="text-xs text-gray-500">ID: {{ software.id }}</p>
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
const solutions = ref([])
const loading = ref(false)
const addLoading = ref(false)
const searchQuery = ref('')
const statusFilter = ref('all')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const showAddModal = ref(false)
const showDetailsModal = ref(false)
const selectedSolution = ref(null)

// New solution form
const newSolution = ref({
  name: '',
  description: '',
  status: '0'
})

// Computed Properties
const filteredSolutions = computed(() => {
  return solutions.value.filter(solution => {
    // Search filter
    const matchesSearch = !searchQuery.value ||
      solution.solution_name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      solution.customer?.user?.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      solution.softwares?.some(s => s.name.toLowerCase().includes(searchQuery.value.toLowerCase()))

    // Status filter
    const matchesStatus = statusFilter.value === 'all' ||
      solution.status === statusFilter.value

    return matchesSearch && matchesStatus
  })
})

const paginatedSolutions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredSolutions.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredSolutions.value.length / itemsPerPage.value)
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
const getInitials = (name) => {
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

const fetchSolutions = async () => {
  loading.value = true
  try {
    const response = await api().get('/customer-solution?company_id=' + authStore.companyId)
    // Add editing state to each solution
    solutions.value = (response.data || []).map(solution => ({
      ...solution,
      editing: false,
      editName: solution.solution_name,
      originalName: solution.solution_name
    }))
  } catch (error) {
    console.error('Error fetching solutions:', error)
    toast({
      title: 'Error',
      description: 'Failed to fetch solutions.',
      variant: 'destructive'
    })
  } finally {
    loading.value = false
  }
}

const addSolution = async () => {
  if (!newSolution.value.name.trim()) {
    toast({
      title: 'Error',
      description: 'Solution name cannot be empty!',
      variant: 'destructive'
    })
    return
  }

  addLoading.value = true
  try {
    const response = await api().post('/solutions', newSolution.value)

    // Refresh the list
    await fetchSolutions()

    toast({
      title: 'Success',
      description: 'Solution added successfully!'
    })

    // Reset form and close modal
    newSolution.value = { name: '', description: '', status: '0' }
    showAddModal.value = false
  } catch (error) {
    console.error('Error adding solution:', error)
    toast({
      title: 'Error',
      description: error.response?.data?.message || 'Failed to add solution.',
      variant: 'destructive'
    })
  } finally {
    addLoading.value = false
  }
}

const enableEdit = (solution) => {
  // Reset editing state for all solutions
  solutions.value.forEach(s => {
    if (s.id !== solution.id) {
      s.editing = false
    }
  })

  solution.editing = true
  solution.editName = solution.solution_name
  solution.originalName = solution.solution_name
}

const cancelEdit = (solution) => {
  solution.editing = false
  solution.editName = solution.originalName
}

const updateSolution = async (solution) => {
  if (!solution.editName.trim()) {
    toast({
      title: 'Error',
      description: 'Solution name cannot be empty!',
      variant: 'destructive'
    })
    return
  }

  try {
    await api().put(`/solutions/${solution.id}`, {
      name: solution.editName
    })

    solution.solution_name = solution.editName
    solution.originalName = solution.editName
    solution.editing = false

    toast({
      title: 'Success',
      description: 'Solution updated successfully!'
    })
  } catch (error) {
    console.error('Error updating solution:', error)
    toast({
      title: 'Error',
      description: 'Failed to update solution.',
      variant: 'destructive'
    })
  }
}

const viewDetails = (solution) => {
  selectedSolution.value = solution
  showDetailsModal.value = true
}

const closeModal = () => {
  showDetailsModal.value = false
  selectedSolution.value = null
}

const confirmDelete = (solution) => {
  Swal.fire({
    title: 'Are you sure?',
    text: `You are about to delete "${solution.solution_name}". This action cannot be undone.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#0d9488',
    confirmButtonText: 'Yes, delete it!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      await deleteSolution(solution.id)
    }
  })
}

const deleteSolution = async (id) => {
  try {
    await api().delete(`/solutions/${id}`)

    // Remove from local list
    solutions.value = solutions.value.filter(s => s.id !== id)

    Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      text: 'Solution has been deleted.',
      confirmButtonColor: '#0d9488'
    })
  } catch (error) {
    console.error('Error deleting solution:', error)
    toast({
      title: 'Error',
      description: 'Failed to delete solution.',
      variant: 'destructive'
    })
  }
}

const exportToCSV = () => {
  // Prepare data for export
  const exportData = filteredSolutions.value.map(solution => ({
    'Solution ID': solution.id,
    'Solution Name': solution.solution_name,
    'Status': solution.status === '0' ? 'Active' : 'Inactive',
    'Customer Name': solution.customer?.user?.name || 'N/A',
    'Customer Email': solution.customer?.user?.email || 'N/A',
    'Customer Phone': solution.customer?.phone || 'N/A',
    'Software Products': solution.softwares?.map(s => s.name).join(', ') || 'None',
    'Created Date': formatDate(solution.created_at)
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
  link.setAttribute('download', 'solutions_export.csv')
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Watch for filter changes to reset pagination
watch([searchQuery, statusFilter], () => {
  currentPage.value = 1
})

// Lifecycle
onMounted(() => {
  fetchSolutions()
})
</script>
