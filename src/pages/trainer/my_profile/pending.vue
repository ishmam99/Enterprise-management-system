<template>
  <div class="px-2 bg-white py-5 w-11/12 mx-auto">
    <!-- Header Section -->
    <div class="max-w-7xl mx-auto mb-8">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Pending Software Expertise
          </h1>
          <p class="text-gray-600">View and manage all software expertise records</p>
        </div>
        
        <!-- Stats Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div class="bg-white rounded-xl p-3 border border-blue-100 shadow-sm">
            <p class="text-xs text-blue-600 font-medium">Total Records</p>
            <p class="text-2xl font-bold text-gray-800">{{ totalRecords }}</p>
          </div>
          <div class="bg-white rounded-xl p-3 border border-green-100 shadow-sm">
            <p class="text-xs text-green-600 font-medium">Basic Level</p>
            <p class="text-2xl font-bold text-gray-800">{{ basicCount }}</p>
          </div>
          <div class="bg-white rounded-xl p-3 border border-yellow-100 shadow-sm">
            <p class="text-xs text-yellow-600 font-medium">Intermediate</p>
            <p class="text-2xl font-bold text-gray-800">{{ intermediateCount }}</p>
          </div>
          <div class="bg-white rounded-xl p-3 border border-purple-100 shadow-sm">
            <p class="text-xs text-purple-600 font-medium">Advanced</p>
            <p class="text-2xl font-bold text-gray-800">{{ advancedCount }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto">
      <!-- Filters & Actions -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 md:p-6 mb-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <!-- Search -->
          <div class="relative flex-1 max-w-md">
            <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <i class="fas fa-search"></i>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by software, industry, or solution..."
              class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <!-- Filters -->
          <div class="flex flex-wrap gap-3">
            <!-- Level Filter -->
            <div class="relative">
              <select
                v-model="levelFilter"
                class="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none pr-8"
              >
                <option value="all">All Levels</option>
                <option value="basic">Basic</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <i class="fas fa-chevron-down text-gray-400"></i>
              </div>
            </div>
            
            <!-- Status Filter -->
            <!-- <div class="relative">
              <select
                v-model="statusFilter"
                class="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none pr-8"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <i class="fas fa-chevron-down text-gray-400"></i>
              </div>
            </div> -->
            
            <!-- Refresh Button -->
            <!-- <button
              @click="fetchData"
              class="px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
              :disabled="loading"
            >
              <i class="fas fa-redo" :class="{ 'animate-spin': loading }"></i>
              <span class="hidden md:inline">Refresh</span>
            </button> -->
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <div class="text-center">
          <div class="inline-block mb-4">
            <div class="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Loading Expertise Data</h3>
          <p class="text-gray-600">Please wait while we fetch your records...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <div class="text-center">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-exclamation-triangle text-red-600 text-2xl"></i>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Error Loading Data</h3>
          <p class="text-gray-600 mb-4">{{ error }}</p>
          <button
            @click="fetchData"
            class="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>

      <!-- Table -->
      <div v-else class="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <!-- Table Header -->
        <div class="p-4 md:p-6 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-xl font-bold text-gray-800">Expertise Records</h2>
              <p class="text-gray-600 text-sm mt-1">
                Showing {{ filteredData.length }} of {{ totalRecords }} records
              </p>
            </div>
            <div class="text-sm text-gray-500">
              <i class="fas fa-calendar-alt mr-2"></i>
              Last updated: {{ lastUpdated }}
            </div>
          </div>
        </div>

        <!-- Table Content -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 yable-zebra">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 border-e py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-industry"></i>
                    Industry
                  </div>
                </th>
                <th scope="col" class="px-6 border-e py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-cogs"></i>
                    Solution
                  </div>
                </th>
                <th scope="col" class="px-6 border-e py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-code"></i>
                    Software
                  </div>
                </th>
                <th scope="col" class="px-6 border-e py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-chart-line"></i>
                    Level
                  </div>
                </th>
                <!-- <th scope="col" class="px-6 border-e py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-tag"></i>
                    Status
                  </div>
                </th> -->
                <!-- <th scope="col" class="px-6 border-e py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-calendar"></i>
                    Created
                  </div>
                </th> -->
                <th scope="col" class="px-6 border-e py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-cog"></i>
                    Actions
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr 
                v-for="item in paginatedData" 
                :key="item.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <!-- Industry -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                      <i class="fas fa-industry text-blue-600 text-sm"></i>
                    </div>
                    <div>
                      <div class="font-medium text-gray-900">
                        {{ item.industry.name }}
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Solution -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                      <i class="fas fa-cogs text-green-600 text-sm"></i>
                    </div>
                    <div>
                      <div class="font-medium text-gray-900">
                        {{ item.solution.name }}
                      </div>
                      
                    </div>
                  </div>
                </td>

                <!-- Software -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                      <i class="fas fa-code text-purple-600 text-sm"></i>
                    </div>
                    <div>
                      <div class="font-medium text-gray-900">
                        {{ item.software.name }}
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Level -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="[
                    'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                    item.levels.toLowerCase() === 'basic' ? 'bg-green-100 text-green-800' :
                    item.levels.toLowerCase() === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-purple-100 text-purple-800'
                  ]">
                    <i :class="[
                      'fas mr-1',
                      item.levels.toLowerCase() === 'basic' ? 'fa-seedling' :
                      item.levels.toLowerCase() === 'intermediate' ? 'fa-chart-bar' :
                      'fa-crown'
                    ]"></i>
                    {{ item.levels }}
                  </span>
                </td>

                <!-- Status -->
                <!-- <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="[
                    'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                    item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    item.status === 'approved' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  ]">
                    <i :class="[
                      'fas mr-1',
                      item.status === 'pending' ? 'fa-clock' :
                      item.status === 'approved' ? 'fa-check-circle' :
                      'fa-times-circle'
                    ]"></i>
                    {{ item.status.charAt(0).toUpperCase() + item.status.slice(1) }}
                  </span>
                </td> -->

                <!-- Created Date -->
                <!-- <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatDate(item.created_at) }}</div>
                  <div class="text-xs text-gray-500">{{ formatTime(item.created_at) }}</div>
                </td> -->

                <!-- Actions -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-2">
                    <!-- View Button -->
                    <button
                      @click="viewDetails(item)"
                      class="inline-flex items-center p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <i class="fas fa-eye"></i>
                    </button>
                    
                    <!-- Edit Button -->
                    <button
                      @click="editItem(item)"
                      class="inline-flex items-center p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    
                    <!-- Status Actions -->
                    <!-- <template v-if="item.status === 'pending'">
                      <button
                        @click="updateStatus(item.id, 'approved')"
                        class="inline-flex items-center p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                        title="Approve"
                      >
                        <i class="fas fa-check"></i>
                      </button>
                      <button
                        @click="updateStatus(item.id, 'rejected')"
                        class="inline-flex items-center p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                        title="Reject"
                      >
                        <i class="fas fa-times"></i>
                      </button>
                    </template> -->
                    
                    <!-- Delete Button -->
                    <button
                      @click="deleteItem(item.id)"
                      class="inline-flex items-center p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="filteredData.length === 0" class="text-center py-12">
          <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-inbox text-gray-400 text-3xl"></i>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">No records found</h3>
          <p class="text-gray-600 mb-4">Try adjusting your search or filters</p>
          <button
            @click="resetFilters"
            class="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>

        <!-- Pagination -->
        <div v-if="filteredData.length > 0" class="px-4 md:px-6 py-4 border-t border-gray-200">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4">
            <div class="text-sm text-gray-700">
              Showing <span class="font-medium">{{ startItem }}</span> to 
              <span class="font-medium">{{ endItem }}</span> of 
              <span class="font-medium">{{ filteredData.length }}</span> results
            </div>
            
            <div class="flex items-center gap-2">
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                :class="[
                  'px-3 py-2 rounded-lg border',
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                ]"
              >
                <i class="fas fa-chevron-left"></i>
              </button>
              
              <div class="flex items-center gap-1">
                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="currentPage = page"
                  :class="[
                    'px-3 py-2 rounded-lg border',
                    currentPage === page
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                  ]"
                >
                  {{ page }}
                </button>
                
                <span v-if="totalPages > 5 && currentPage < totalPages - 2" class="px-2 text-gray-500">
                  ...
                </span>
                
                <button
                  v-if="totalPages > 5 && currentPage < totalPages - 2"
                  @click="currentPage = totalPages"
                  :class="[
                    'px-3 py-2 rounded-lg border',
                    currentPage === totalPages
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                  ]"
                >
                  {{ totalPages }}
                </button>
              </div>
              
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                :class="[
                  'px-3 py-2 rounded-lg border',
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                ]"
              >
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
            
            <!-- Items per page -->
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-700">Show:</span>
              <select
                v-model="itemsPerPage"
                class="px-6 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import api from '@/config/api'
import Swal from 'sweetalert2'

// Data
const expertiseData = ref([])
const industries = ref([])
const solutions = ref([])
const softwares = ref([])

// UI State
const loading = ref(false)
const error = ref('')

// Filters
const searchQuery = ref('')
const levelFilter = ref('all')
const statusFilter = ref('all')

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Fetch data from API
const fetchData = async () => {
  loading.value = true
  error.value = ''
  
  try {
    // Fetch all data in parallel
    const [expertiseResponse, industriesResponse, solutionsResponse, softwaresResponse] = await Promise.all([
      api().get('/software-level'),
      api().get('/industries'),
      api().get('/solutions'),
      api().get('/softwares')
    ])
    
    // Handle response structures
    expertiseData.value = expertiseResponse.data.data || expertiseResponse.data
    industries.value = industriesResponse.data.data || industriesResponse.data
    solutions.value = solutionsResponse.data.data || solutionsResponse.data
    softwares.value = softwaresResponse.data.data || softwaresResponse.data
    
  } catch (err) {
    console.error('Error fetching data:', err)
    error.value = 'Failed to load expertise data. Please try again.'
  } finally {
    loading.value = false
  }
}

// Computed properties
const totalRecords = computed(() => expertiseData.value.length)

const basicCount = computed(() => {
  return expertiseData.value.filter(item => 
    item.levels.toLowerCase() === 'basic'
  ).length
})

const intermediateCount = computed(() => {
  return expertiseData.value.filter(item => 
    item.levels.toLowerCase() === 'intermediate'
  ).length
})

const advancedCount = computed(() => {
  return expertiseData.value.filter(item => 
    item.levels.toLowerCase() === 'advanced'
  ).length
})

const filteredData = computed(() => {
  let filtered = expertiseData.value

  // Apply level filter
  if (levelFilter.value !== 'all') {
    filtered = filtered.filter(item => 
      item.levels.toLowerCase() === levelFilter.value
    )
  }

  // Apply status filter
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(item => item.status === statusFilter.value)
  }

  // Apply search
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(item => {
      const industryName = getIndustryName(item.industry_id).toLowerCase()
      const solutionName = getSolutionName(item.solution_id).toLowerCase()
      const softwareName = getSoftwareName(item.software_id).toLowerCase()
      const level = item.levels.toLowerCase()
      
      return (
        industryName.includes(query) ||
        solutionName.includes(query) ||
        softwareName.includes(query) ||
        level.includes(query)
      )
    })
  }

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPerPage.value)
})

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredData.value.slice(start, end)
})

const startItem = computed(() => {
  return (currentPage.value - 1) * itemsPerPage.value + 1
})

const endItem = computed(() => {
  const end = currentPage.value * itemsPerPage.value
  return Math.min(end, filteredData.value.length)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  
  if (total <= 5) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (currentPage.value <= 3) {
      pages.push(1, 2, 3, 4, 5)
    } else if (currentPage.value >= total - 2) {
      pages.push(total - 4, total - 3, total - 2, total - 1, total)
    } else {
      pages.push(
        currentPage.value - 2,
        currentPage.value - 1,
        currentPage.value,
        currentPage.value + 1,
        currentPage.value + 2
      )
    }
  }
  
  return pages
})

const lastUpdated = computed(() => {
  return new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})

// Helper functions
const getIndustryName = (id) => {
  const industry = industries.value.find(ind => ind.id == id)
  return industry ? industry.name : `Industry #${id}`
}

const getSolutionName = (id) => {
  const solution = solutions.value.find(sol => sol.id == id)
  return solution ? solution.name : `Solution #${id}`
}

const getSoftwareName = (id) => {
  const software = softwares.value.find(soft => soft.id == id)
  return software ? software.name : `Software #${id}`
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatTime = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Action functions
const viewDetails = (item) => {
  Swal.fire({
    title: 'Expertise Details',
    html: `
      <div class="text-left space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <span class="font-medium text-gray-700">Industry:</span>
            <p class="text-gray-900">${getIndustryName(item.industry_id)}</p>
          </div>
          <div>
            <span class="font-medium text-gray-700">Solution:</span>
            <p class="text-gray-900">${getSolutionName(item.solution_id)}</p>
          </div>
          <div>
            <span class="font-medium text-gray-700">Software:</span>
            <p class="text-gray-900">${getSoftwareName(item.software_id)}</p>
          </div>
          <div>
            <span class="font-medium text-gray-700">Level:</span>
            <p class="text-gray-900">${item.levels}</p>
          </div>
          <div>
            <span class="font-medium text-gray-700">Status:</span>
            <p class="text-gray-900">${item.status.charAt(0).toUpperCase() + item.status.slice(1)}</p>
          </div>
          <div>
            <span class="font-medium text-gray-700">Created:</span>
            <p class="text-gray-900">${formatDate(item.created_at)} ${formatTime(item.created_at)}</p>
          </div>
        </div>
      </div>
    `,
    confirmButtonText: 'Close',
    confirmButtonColor: '#3b82f6',
    width: '600px'
  })
}

const editItem = (item) => {
  Swal.fire({
    title: 'Edit Expertise',
    text: 'This feature is coming soon!',
    icon: 'info',
    confirmButtonColor: '#3b82f6'
  })
}

const updateStatus = async (id, status) => {
  const action = status === 'approved' ? 'approve' : 'reject'
  const result = await Swal.fire({
    title: `${action.charAt(0).toUpperCase() + action.slice(1)} this record?`,
    text: 'This action cannot be undone.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: status === 'approved' ? '#10b981' : '#ef4444',
    cancelButtonColor: '#6b7280',
    confirmButtonText: `Yes, ${action} it`
  })

  if (result.isConfirmed) {
    try {
      await api().patch(`/software-level/${id}`, { status })
      
      // Update local state
      const index = expertiseData.value.findIndex(item => item.id === id)
      if (index !== -1) {
        expertiseData.value[index].status = status
      }
      
      Swal.fire({
        title: 'Success!',
        text: `Record ${action}ed successfully.`,
        icon: 'success',
        confirmButtonColor: '#3b82f6'
      })
    } catch (err) {
      console.error('Error updating status:', err)
      Swal.fire({
        title: 'Error',
        text: 'Failed to update status. Please try again.',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      })
    }
  }
}

const deleteItem = async (id) => {
  const result = await Swal.fire({
    title: 'Delete this record?',
    text: 'This action cannot be undone.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Yes, delete it'
  })

  if (result.isConfirmed) {
    try {
      await api().delete(`/software-level/${id}`)
      
      // Remove from local state
      expertiseData.value = expertiseData.value.filter(item => item.id !== id)
      
      Swal.fire({
        title: 'Deleted!',
        text: 'Record has been deleted.',
        icon: 'success',
        confirmButtonColor: '#3b82f6'
      })
    } catch (err) {
      console.error('Error deleting record:', err)
      Swal.fire({
        title: 'Error',
        text: 'Failed to delete record. Please try again.',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      })
    }
  }
}

const resetFilters = () => {
  searchQuery.value = ''
  levelFilter.value = 'all'
  statusFilter.value = 'all'
  currentPage.value = 1
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// Watch items per page change
watch(itemsPerPage, () => {
  currentPage.value = 1
})

// Lifecycle
onMounted(() => {
  fetchData()
})
</script>

<style scoped>
/* Custom scrollbar */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* Smooth transitions */
select, input, button {
  transition: all 0.2s ease;
}

/* Table row hover effect */
tbody tr:hover {
  background-color: #f9fafb;
}

/* Loading animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>