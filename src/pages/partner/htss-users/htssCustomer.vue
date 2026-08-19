<template>
  <div v-if="!showUsersView" class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8">
    <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Customer Management
          </h1>
          <p class="text-gray-600 mt-2 flex items-center">
            <i class="ri-group-line ri-lg mr-2 text-purple-500"></i>
            Manage and view customer information
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
              <input v-model="searchQuery" type="text" placeholder="Search customers..."
                class="block w-full pl-10 pr-3 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-purple-50">
            </div>
          </div>

          <div class="flex flex-wrap gap-4">
            <div class="relative">
              <select v-model="selectedIndustry"
                class="px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-purple-50 appearance-none pr-10"
                @change="getCustomers()">
                <option value="">All Industries</option>
                <option v-for="industry in industries" :key="industry.id" :value="industry.id">
                  {{ industry.name }}
                </option>
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
          <p class="text-gray-600 mt-4 font-medium">Loading customers...</p>
        </div>
      </div>

      <!-- Customers Table -->
      <div v-else-if="customers.length > 0"
        class="overflow-x-auto bg-white rounded-2xl shadow-xl border border-purple-100">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr class="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
              <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider rounded-tl-2xl">#</th>
              <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Customer Name</th>
              <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Email</th>
              <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Phone</th>
              <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Industry</th>
              <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Gender</th>
              <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Status</th>
              <th class="px-6 py-4 text-center text-sm font-semibold tracking-wider rounded-tr-2xl">Actions</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-100 bg-white">
            <tr v-for="(customer, index) in customers" :key="customer.id"
              class="hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-300">
              <!-- Index -->
              <td class="px-6 py-4 text-sm font-bold text-purple-700">{{ (currentPage - 1) * perPage + index + 1 }}</td>

              <!-- Customer Name -->
              <td class="px-6 py-4">
                <div class="text-sm font-semibold text-gray-800">{{ customer.user?.name }}</div>
              </td>

              <!-- Email -->
              <td class="px-6 py-4 text-sm text-gray-700">{{ customer.user?.email }}</td>

              <!-- Phone -->
              <td class="px-6 py-4 text-sm text-gray-700">{{ customer.phone || 'N/A' }}</td>

              <!-- Industry -->
              <td class="px-6 py-4">
                <span v-if="customer.industry?.name"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ customer.industry.name }}
                </span>
                <span v-else class="text-gray-400 text-xs">Not specified</span>
              </td>

              <!-- Gender -->
              <td class="px-6 py-4">
                <span :class="[
                  'px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm',
                  customer.gender === 'male'
                    ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200'
                    : customer.gender === 'female'
                      ? 'bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 border border-pink-200'
                      : 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 border border-gray-200'
                ]">
                  {{ customer.gender ? customer.gender.charAt(0).toUpperCase() + customer.gender.slice(1) : 'N/A' }}
                </span>
              </td>

              <!-- Status -->
              <td class="px-6 py-4">
                <span :class="[
                  'px-3 py-1.5 rounded-full text-xs font-semibold',
                  customer.status == 0
                    ? 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border border-yellow-200'
                    : customer.status == 1
                      ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200'
                      : 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border border-red-200'
                ]">
                  {{ getStatusText(customer.status) }}
                </span>
              </td>

              <!-- Actions -->
              <td class="px-6 py-4 text-center">
                <div class="flex justify-center space-x-2">
                  <button @click="viewUsers(customer)"
                    class="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white text-sm font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                    View Users
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
          <h3 class="text-2xl font-bold text-gray-900">No customers found</h3>
          <p class="mt-2 text-gray-600">No customers match your current filters</p>
          <button @click="clearFilters"
            class="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Users Table View -->
  <div v-else class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8">
    <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Back Button -->
      <div class="mb-6">
        <button @click="showUsersView = false; selectedCustomer = null"
          class="flex items-center px-4 py-2 text-gray-600 hover:text-purple-700 transition-colors border border-gray-300 hover:border-purple-400 rounded-lg">
          <i class="ri-arrow-left-line ri-lg mr-2"></i>
          Back to Customers
        </button>
      </div>

      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Users for {{ selectedCustomer?.user?.name }}
        </h1>
        <p class="text-gray-600 mt-2 flex items-center">
          <i class="ri-user-line ri-lg mr-2 text-purple-500"></i>
          View and manage users for this customer
        </p>
      </div>

      <!-- Users Table -->
      <div class="overflow-x-auto bg-white rounded-2xl shadow-xl border border-purple-100">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr class="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
              <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider rounded-tl-2xl">#</th>
              <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">User ID</th>
              <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Name</th>
              <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Email</th>
              <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Role</th>
              <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Created At</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-100 bg-white">
            <!-- Show the main user from customer data -->
            <tr v-if="selectedCustomer?.user"
              class="hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-300">
              <td class="px-6 py-4 text-sm font-bold text-purple-700">1</td>
              <td class="px-6 py-4 text-sm text-gray-700">{{ selectedCustomer.user.id }}</td>
              <td class="px-6 py-4">
                <div class="text-sm font-semibold text-gray-800">{{ selectedCustomer.user.name }}</div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-700">{{ selectedCustomer.user.email }}</td>
              <td class="px-6 py-4">
                <span :class="[
                  'px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm',
                  selectedCustomer.user.role === 'admin'
                    ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border border-red-200'
                    : selectedCustomer.user.role === 'user'
                      ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200'
                      : 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 border border-gray-200'
                ]">
                  {{ selectedCustomer.user.role ? selectedCustomer.user.role.charAt(0).toUpperCase() + selectedCustomer.user.role.slice(1) : 'N/A' }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-700">{{ formatDate(selectedCustomer.user.created_at) }}</td>
            </tr>

            <!-- Show additional users if available in API response -->
            <tr v-for="(user, index) in additionalUsers" :key="user.id"
              class="hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-300">
              <td class="px-6 py-4 text-sm font-bold text-purple-700">{{ index + 2 }}</td>
              <td class="px-6 py-4 text-sm text-gray-700">{{ user.id }}</td>
              <td class="px-6 py-4">
                <div class="text-sm font-semibold text-gray-800">{{ user.name }}</div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-700">{{ user.email }}</td>
              <td class="px-6 py-4">
                <span :class="[
                  'px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm',
                  user.role === 'admin'
                    ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border border-red-200'
                    : user.role === 'user'
                      ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200'
                      : 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 border border-gray-200'
                ]">
                  {{ user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'N/A' }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-700">{{ formatDate(user.created_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty Users State -->
      <div v-if="!selectedCustomer?.user && additionalUsers.length === 0" class="text-center py-20">
        <div class="inline-flex flex-col items-center max-w-md">
          <div class="relative mb-6">
            <div
              class="w-24 h-24 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full flex items-center justify-center">
              <i class="ri-user-search-line text-4xl text-purple-500"></i>
            </div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900">No users found</h3>
          <p class="mt-2 text-gray-600">This customer doesn't have any users yet</p>
          <button @click="addUser"
            class="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Add User
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Swal from 'sweetalert2'
import api from '@/config/api'

const isLoading = ref(true)
const customers = ref([])
const selectedCustomer = ref(null)
const showUsersView = ref(false)
const additionalUsers = ref([]) // For additional users beyond the main user
const searchQuery = ref('')
const selectedIndustry = ref('')
const industries = ref([])
const currentPage = ref(1)
const perPage = 20
const meta = ref(null)

// Fetch customers from API
const getCustomers = async () => {
  isLoading.value = true
  try {
    let indStr = ''
    if (selectedIndustry.value) {
      indStr = `,{"column":"industry_id","operator":"=","value":"${selectedIndustry.value}"}`
    }

    const response = await api().get(
      `customers?with=user,industry&where=[{"column":"status","operator":"=","value":"0"}${indStr}]&per_page=${perPage}&page=${currentPage.value}&search=${encodeURIComponent(searchQuery.value)}`
    )

    customers.value = response.data.data.data || []
    meta.value = response.data.data
  } catch (error) {
    console.error('Error fetching customers:', error)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to fetch customers. Please try again.',
      confirmButtonColor: '#8b5cf6'
    })
  } finally {
    isLoading.value = false
  }
}

// Fetch additional users for a customer
const fetchUsers = async (customer) => {
  try {
    additionalUsers.value = []
    
  } catch (error) {
    console.error('Error fetching users:', error)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to fetch users. Please try again.',
      confirmButtonColor: '#8b5cf6'
    })
  }
}

// Fetch industries from API
const fetchIndustries = async () => {
  try {
    // Replace with your actual industries API endpoint
    const {data} = await api().get('/industries')
    industries.value = data.data || []
  } catch (error) {
    console.error('Error fetching industries:', error)
    // Fallback to empty array
    industries.value = []
  }
}

onMounted(() => {
  getCustomers()
  fetchIndustries()
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
  getCustomers()
}, 500))

watch(selectedIndustry, () => {
  currentPage.value = 1
  getCustomers()
})

const getStatusText = (status) => {
  switch (status) {
    case 0: return 'Pending'
    case 1: return 'Active'
    case 2: return 'Inactive'
    default: return 'Unknown'
  }
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

const viewUsers = (customer) => {
  selectedCustomer.value = customer
  showUsersView.value = true
  fetchUsers(customer)
}

const addUser = () => {
  // Implement add user functionality based on your API
  Swal.fire({
    title: 'Add User',
    text: 'This would open a form to add a new user in a real application',
    icon: 'info',
    confirmButtonColor: '#8b5cf6'
  })
}

const handlePagination = (link) => {
  if (link.page) {
    currentPage.value = link.page
    getCustomers()
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedIndustry.value = ''
  currentPage.value = 1
  getCustomers()
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