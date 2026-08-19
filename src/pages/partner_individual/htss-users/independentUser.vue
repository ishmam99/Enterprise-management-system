<template>
  <div v-if="!showUserDetails" class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8">
    <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Independent Users
          </h1>
          <p class="text-gray-600 mt-2 flex items-center">
            <i class="ri-user-line ri-lg mr-2 text-purple-500"></i>
            Users not associated with any company/customer
          </p>
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
              <input v-model="searchQuery" type="text" placeholder="Search users..."
                class="block w-full pl-10 pr-3 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-purple-50">
            </div>
          </div>

          <div class="flex flex-wrap gap-4">
            <div class="relative">
              <select v-model="selectedRole"
                class="px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-purple-50 appearance-none pr-10"
                @change="getIndependentUsers()">
                <option value="">All Roles</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
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
          <p class="text-gray-600 mt-4 font-medium">Loading independent users...</p>
        </div>
      </div>

      <!-- Users Table -->
      <div v-else-if="users.length > 0"
        class="overflow-x-auto bg-white rounded-2xl shadow-xl border border-purple-100">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr class="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
              <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider rounded-tl-2xl">#</th>
              <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">User ID</th>
              <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Name</th>
              <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Email</th>
              <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Role</th>
              <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Email Verified</th>
              <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Created At</th>
              <th class="px-6 py-4 text-center text-sm font-semibold tracking-wider rounded-tr-2xl">Actions</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-100 bg-white">
            <tr v-for="(user, index) in users" :key="user.id"
              class="hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-300">
              <!-- Index -->
              <td class="px-6 py-4 text-sm font-bold text-purple-700">{{ (currentPage - 1) * perPage + index + 1 }}</td>

              <!-- User ID -->
              <td class="px-6 py-4 text-sm text-gray-700">{{ user.id }}</td>

              <!-- Name -->
              <td class="px-6 py-4">
                <div class="text-sm font-semibold text-gray-800">{{ user.name }}</div>
              </td>

              <!-- Email -->
              <td class="px-6 py-4 text-sm text-gray-700">{{ user.email }}</td>

              <!-- Role -->
              <td class="px-6 py-4">
                <span :class="[
                  'px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm',
                  user.role === 'admin'
                    ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border border-red-200'
                    : user.role === 'manager'
                    ? 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 border border-orange-200'
                    : 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200'
                ]">
                  {{ user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'N/A' }}
                </span>
              </td>

              <!-- Email Verified -->
              <td class="px-6 py-4">
                <span :class="[
                  'px-3 py-1.5 rounded-full text-xs font-semibold',
                  user.email_verified_at
                    ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200'
                    : 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border border-yellow-200'
                ]">
                  {{ user.email_verified_at ? 'Verified' : 'Pending' }}
                </span>
              </td>

              <!-- Created At -->
              <td class="px-6 py-4 text-sm text-gray-700">{{ formatDate(user.created_at) }}</td>

              <!-- Actions -->
              <td class="px-6 py-4 text-center">
                <div class="flex justify-center space-x-2">
                  <button @click="viewUserDetails(user)"
                    class="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white text-sm font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                    View Details
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div v-if="meta && meta.total > perPage" class="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div class="text-sm text-gray-600 mb-4 sm:mb-0">
              Showing {{ meta.from }} to {{ meta.to }} of {{ meta.total }} results
            </div>
            <div class="flex space-x-1">
              <button v-for="link in meta.links" :key="link.label" @click="link.url && handlePagination(link)"
                :disabled="!link.url || link.active" :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                  link.active
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md'
                    : link.url
                      ? 'bg-white text-purple-600 border border-purple-200 hover:bg-purple-50 hover:shadow-md'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                ]" v-html="link.label"></button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <div class="inline-flex flex-col items-center max-w-md">
          <div class="relative mb-6">
            <div
              class="w-24 h-24 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full flex items-center justify-center">
              <i class="ri-user-search-line text-4xl text-purple-500"></i>
            </div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900">No independent users found</h3>
          <p class="mt-2 text-gray-600">All users are currently associated with companies</p>
          <button @click="clearFilters"
            class="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- User Details View -->
  <div v-else class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Back Button -->
      <div class="mb-6">
        <button @click="showUserDetails = false; selectedUser = null"
          class="flex items-center px-4 py-2 text-gray-600 hover:text-purple-700 transition-colors border border-gray-300 hover:border-purple-400 rounded-lg">
          <i class="ri-arrow-left-line ri-lg mr-2"></i>
          Back to Users
        </button>
      </div>

      <!-- User Details Card -->
      <div class="bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold">{{ selectedUser.name }}</h1>
              <p class="text-purple-100 mt-1">{{ selectedUser.email }}</p>
            </div>
            <div class="text-right">
              <span :class="[
                'px-3 py-1 rounded-full text-xs font-semibold',
                selectedUser.email_verified_at
                  ? 'bg-green-500 text-white'
                  : 'bg-yellow-500 text-white'
              ]">
                {{ selectedUser.email_verified_at ? 'Verified' : 'Pending Verification' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Account Information -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              <i class="ri-account-circle-line mr-2 text-purple-500"></i>
              Account Information
            </h3>
            
            <div class="space-y-3">
              <div>
                <label class="text-sm font-medium text-gray-500">User ID</label>
                <p class="text-gray-900">{{ selectedUser.id }}</p>
              </div>
              
              <div>
                <label class="text-sm font-medium text-gray-500">Name</label>
                <p class="text-gray-900">{{ selectedUser.name }}</p>
              </div>
              
              <div>
                <label class="text-sm font-medium text-gray-500">Email</label>
                <p class="text-gray-900">{{ selectedUser.email }}</p>
              </div>
              
              <div>
                <label class="text-sm font-medium text-gray-500">Role</label>
                <p class="text-gray-900">
                  <span :class="[
                    'px-2 py-1 rounded-full text-xs font-semibold',
                    selectedUser.role === 'admin'
                      ? 'bg-red-100 text-red-700'
                      : selectedUser.role === 'manager'
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-blue-100 text-blue-700'
                  ]">
                    {{ selectedUser.role ? selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1) : 'N/A' }}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <!-- Status Information -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              <i class="ri-information-line mr-2 text-purple-500"></i>
              Status Information
            </h3>
            
            <div class="space-y-3">
              <div>
                <label class="text-sm font-medium text-gray-500">Email Verification</label>
                <p class="text-gray-900">{{ selectedUser.email_verified_at ? 'Verified' : 'Not Verified' }}</p>
              </div>
              
              <div>
                <label class="text-sm font-medium text-gray-500">Verification Date</label>
                <p class="text-gray-900">{{ selectedUser.email_verified_at ? formatDate(selectedUser.email_verified_at) : 'N/A' }}</p>
              </div>
              
              <div>
                <label class="text-sm font-medium text-gray-500">Account Created</label>
                <p class="text-gray-900">{{ formatDate(selectedUser.created_at) }}</p>
              </div>
              
              <div>
                <label class="text-sm font-medium text-gray-500">Last Updated</label>
                <p class="text-gray-900">{{ formatDate(selectedUser.updated_at) }}</p>
              </div>
            </div>
          </div>

          <!-- Company Association -->
          <div class="md:col-span-2 space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              <i class="ri-building-line mr-2 text-purple-500"></i>
              Company Association
            </h3>
            
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div class="flex items-center">
                <i class="ri-information-line text-yellow-500 ri-lg mr-3"></i>
                <div>
                  <p class="text-yellow-800 font-medium">Independent User</p>
                  <p class="text-yellow-600 text-sm">This user is not associated with any company</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div class="flex space-x-3">
            <button
              @click="showUserDetails = false"
              class="px-6 py-2 bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import api from '@/config/api'
import { useAuthStore } from '@/stores/AuthStore'

const router = useRouter()
const isLoading = ref(true)
const users = ref([])
const selectedUser = ref(null)
const showUserDetails = ref(false)
const searchQuery = ref('')
const selectedRole = ref('')
const currentPage = ref(1)
const perPage = 20
const meta = ref(null)

// Fetch independent users using the same API structure
const getIndependentUsers = async () => {
  isLoading.value = true
  try {
    const authStore = useAuthStore()
    const companyId = authStore.companyId

    // First, fetch all users with optional search and pagination
    const response = await api().get('users', {
      params: {
        per_page: perPage,
        page: currentPage.value,
        search: encodeURIComponent(searchQuery.value),
        where: JSON.stringify([{ column: 'company_id', operator: '=', value: companyId }]) 
      }
    })

    const allUsers = response.data.data.data || []

    // Fetch customers to cross-reference
    const customersResponse = await api().get('customers', {
      params: {
        where: JSON.stringify([{ column: 'company_id', operator: '=', value: companyId }]),
        with: 'user'
      }
    })
    const customers = customersResponse.data.data.data || []

    // Get user IDs associated with customers
    const customerUserIds = customers.map(customer => customer.user_id).filter(id => id)

    // Filter users to only those not associated with any customer
    users.value = allUsers.filter(user => !customerUserIds.includes(user.id))

    // Apply role filter if needed
    if (selectedRole.value) {
      users.value = users.value.filter(user => user.role === selectedRole.value)
    }

    meta.value = response.data.data
    meta.value.total = users.value.length

  } catch (error) {
    console.error('Error fetching independent users:', error)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to fetch independent users. Please try again.',
      confirmButtonColor: '#8b5cf6'
    })
  } finally {
    isLoading.value = false
  }
}


onMounted(() => {
  getIndependentUsers()
})

// Debounce search
const debounce = (fn, delay = 500) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

watch(searchQuery, debounce(() => {
  currentPage.value = 1
  getIndependentUsers()
}, 500))

watch(selectedRole, () => {
  currentPage.value = 1
  getIndependentUsers()
})

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const viewUserDetails = (user) => {
  selectedUser.value = user
  showUserDetails.value = true
}

const assignToCompany = (user) => {
  Swal.fire({
    title: 'Assign to Company',
    text: `Assign ${user.name} to a company?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#10b981',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Yes, Assign!'
  }).then((result) => {
    if (result.isConfirmed) {
      // Implement assign to company functionality
      Swal.fire({
        title: 'Select Company',
        text: 'This would open a company selection dialog in a real application',
        icon: 'info',
        confirmButtonColor: '#8b5cf6'
      })
    }
  })
}

const editUser = (user) => {
  // Implement edit user functionality
  Swal.fire({
    title: 'Edit User',
    text: `This would open a form to edit ${user.name}`,
    icon: 'info',
    confirmButtonColor: '#8b5cf6'
  })
}

const handlePagination = (link) => {
  if (link.page) {
    currentPage.value = link.page
    getIndependentUsers()
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedRole.value = ''
  currentPage.value = 1
  getIndependentUsers()
}
</script>

<style scoped>
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