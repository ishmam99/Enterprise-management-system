<template>
   <div class="px-10 bg-white py-5 w-11/12 mx-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div class="mb-4 sm:mb-0">
            <h1 class="text-3xl font-bold text-gray-900">User List</h1>
            <p class="text-gray-600 mt-2">Manage your organization's users</p>
          </div>
          <div class="flex items-center space-x-3">
            <!-- Search Bar -->
            <div class="relative flex-1 sm:flex-initial sm:w-64">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search users..."
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
            </div>

            <!-- Add User Button -->
            <router-link to="/customer/Users/createUsers">
            <button

              class="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add User
            </button>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">{{ users.length }}</h3>
              <p class="text-sm text-gray-600">Total Users</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">{{ activeUsersCount }}</h3>
              <p class="text-sm text-gray-600">Active Users</p>
            </div>
          </div>
        </div>

      </div>



      <!-- Users Table -->
      <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <!-- Table Header -->


        <!-- Users List -->
         <div class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        User List
      </h1>

    <div class="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-100">
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <tr>
        <th class="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Name</th>
        <th class="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Email</th>
        <th class="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Username</th>
        <th class="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Status</th>
        <th class="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Softwares</th>
      </tr>
    </thead>

    <tbody class="divide-y divide-gray-100 bg-white">
      <tr
        v-for="user in paginatedUsers"
        :key="user.id"
        class="hover:bg-indigo-50 transition-colors"
      >
        <!-- Name -->
        <td class="px-6 py-4 flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span class="text-white font-semibold text-sm">
              {{ getUserInitials(user) }}
            </span>
          </div>
          <span class="font-medium text-gray-800">{{ user.user?.name }}</span>
        </td>

        <!-- Email -->
        <td class="px-6 py-4 text-sm text-gray-600">
          {{ user.user?.email }}
        </td>

        <!-- Username -->
        <td class="px-6 py-4 text-sm text-gray-600">
          {{ user.username }}
        </td>

        <!-- Status -->
        <td class="px-6 py-4">
          <span
            :class="[
              'inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold',
              user.status === '1'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            ]"
          >
            {{ user.status === '1' ? 'Active' : 'Inactive' }}
          </span>
        </td>

        <!-- Softwares -->
        <td class="px-6 py-4">
          <div class="flex flex-wrap gap-2">
            <span
              v-if="user.softwares?.length"
              v-for="software in user.softwares"
              :key="software.id"
              class="bg-purple-100 text-purple-800 px-2 py-1 text-xs font-medium rounded-full"
            >
              {{ software.name }}
            </span>
            <span v-else class="text-gray-400 italic text-sm">No software</span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

    </div>
  </div>

        <!-- Empty State -->
        <div v-if="filteredUsers.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-900">No users found</h3>
          <p class="mt-2 text-gray-500">Try adjusting your search or filters</p>
          <button
            @click="clearFilters"
            class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>

        <!-- Pagination -->
        <div v-if="filteredUsers.length > 0" class="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-500">
              Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredUsers.length }} results
            </div>
            <div class="flex items-center space-x-2">
              <button
                @click="previousPage"
                :disabled="currentPage === 1"
                class="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <div class="flex items-center space-x-1">
                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="goToPage(page)"
                  :class="[
                    'px-3 py-1 rounded-lg transition-colors',
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  ]"
                >
                  {{ page }}
                </button>
              </div>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
import api from '@/config/api'
import { ref, reactive, computed, onMounted } from 'vue'



// Data
const users = ref([])
const industries = ref([])
const solutions = ref([])
const softwares = ref([])

// Search and filters
const searchQuery = ref('')
const filters = reactive({
  status: 'all',
  industry: 'all',
  solution: 'all',
  software: 'all'
})

// Pagination
const currentPage = ref(1)
const pageSize = 10

// Selection
const selectedUsers = ref([])
const selectAll = ref(false)
const actionMenuOpen = ref(null)

// Bulk actions
const bulkAction = ref('')

// Computed properties
const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch =
      user.user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesStatus = filters.status === 'all' || user.status === filters.status
    const matchesIndustry = filters.industry === 'all' || user.industry_id === filters.industry
    const matchesSolution = filters.solution === 'all' || user.solution_id === filters.solution
    const matchesSoftware = filters.software === 'all' || user.software_id === filters.software

    return matchesSearch && matchesStatus && matchesIndustry && matchesSolution && matchesSoftware
  })
})

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredUsers.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / pageSize))
const startIndex = computed(() => (currentPage.value - 1) * pageSize)
const endIndex = computed(() => Math.min(startIndex.value + pageSize, filteredUsers.value.length))

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) pages.push(i)
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    }
  }

  return pages
})

// Stats
const activeUsersCount = computed(() => users.value.filter(user => user.status === '1').length)
const adminUsersCount = computed(() => users.value.filter(user => user.role === 'admin').length)

// Helper methods
const getIndustryName = (industryId) => {
  if (!industryId) return 'N/A'
  const industry = industries.value.find(i => i.id === industryId)
  return industry ? industry.name : 'N/A'
}

const getSolutionName = (solutionId) => {
  if (!solutionId) return 'N/A'
  const solution = solutions.value.find(s => s.id === solutionId)
  return solution ? solution.name : 'N/A'
}

const getSoftwareName = (softwareId) => {
  if (!softwareId) return 'N/A'
  const software = softwares.value.find(s => s.id === softwareId)
  return software ? software.name : 'N/A'
}

const getUserInitials = (user) => {
  const name = user.user.name
  const nameParts = name.split(' ')
  if (nameParts.length >= 2) {
    return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`
  }
  return name.charAt(0)
}

const getKnowledgeLevelClass = (level) => {
  switch(level) {
    case 'Beginner': return 'bg-yellow-100 text-yellow-800'
    case 'Intermediate': return 'bg-blue-100 text-blue-800'
    case 'Advanced': return 'bg-green-100 text-green-800'
    case 'Expert': return 'bg-purple-100 text-purple-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

// API methods
const fetchUsers = async () => {
  try {

    const response = await api().get('end-users')
    users.value = response.data.data

    // Mock data based on your API response
    // users.value = [
    //   {
    //     "id": 632,
    //     "username": "vuxalyzage",
    //     "knowledge_level": "Intermediate",
    //     "status": "1",
    //     "user": {
    //       "id": 864,
    //       "name": "Tallulah Oneal",
    //       "email": "kekysa@mailinator.com"
    //     },
    //     "customer_id": null,
    //     "industry_id": 1,
    //     "solution_id": 2,
    //     "software_id": 3
    //   },
    //   {
    //     "id": 633,
    //     "username": "johndoe",
    //     "knowledge_level": "Advanced",
    //     "status": "1",
    //     "user": {
    //       "id": 865,
    //       "name": "John Doe",
    //       "email": "johndoe@example.com"
    //     },
    //     "customer_id": null,
    //     "industry_id": 2,
    //     "solution_id": 1,
    //     "software_id": 2
    //   },
    //   {
    //     "id": 634,
    //     "username": "janedoe",
    //     "knowledge_level": "Beginner",
    //     "status": "0",
    //     "user": {
    //       "id": 866,
    //       "name": "Jane Doe",
    //       "email": "janedoe@example.com"
    //     },
    //     "customer_id": null,
    //     "industry_id": 3,
    //     "solution_id": 3,
    //     "software_id": 1
    //   }
    // ]
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}



// Methods
const toggleActionMenu = (userId) => {
  actionMenuOpen.value = actionMenuOpen.value === userId ? null : userId
}

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedUsers.value = paginatedUsers.value.map(user => user.id)
  } else {
    selectedUsers.value = []
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  filters.status = 'all'
  filters.industry = 'all'
  filters.solution = 'all'
  filters.software = 'all'
  currentPage.value = 1
}

const addUser = () => {
  // Navigate to add user page or open modal
  console.log('Navigate to add user page')
}

const editUser = (user) => {
  // Navigate to edit user page or open modal
  console.log('Edit user:', user)
  actionMenuOpen.value = null
}

const toggleUserStatus = (user) => {
  user.status = user.status === '1' ? '0' : '1'
  actionMenuOpen.value = null
}

const deleteUser = (userId) => {
  if (confirm('Are you sure you want to delete this user?')) {
    users.value = users.value.filter(user => user.id !== userId)
    selectedUsers.value = selectedUsers.value.filter(id => id !== userId)
  }
  actionMenuOpen.value = null
}

const applyBulkAction = () => {
  if (!bulkAction.value || selectedUsers.value.length === 0) return

  switch (bulkAction.value) {
    case 'activate':
      users.value.forEach(user => {
        if (selectedUsers.value.includes(user.id)) {
          user.status = '1'
        }
      })
      break
    case 'deactivate':
      users.value.forEach(user => {
        if (selectedUsers.value.includes(user.id)) {
          user.status = '0'
        }
      })
      break
    case 'delete':
      if (confirm(`Are you sure you want to delete ${selectedUsers.value.length} users?`)) {
        users.value = users.value.filter(user => !selectedUsers.value.includes(user.id))
        selectedUsers.value = []
      }
      break
  }

  bulkAction.value = ''
  selectAll.value = false
}

const exportUsers = () => {
  console.log('Export users:', selectedUsers.value.length > 0 ? selectedUsers.value : 'all')
}

const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const goToPage = (page) => {
  if (page !== '...') currentPage.value = page
}

// Lifecycle
onMounted(async () => {
  await Promise.all([
    fetchUsers(),
    fetchIndustries(),
    fetchSolutions(),
    fetchSoftwares()
  ])

  // Close action menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
      actionMenuOpen.value = null
    }
  })
})
</script>

<style scoped>
/* Custom styles can be added here if needed */
</style>
