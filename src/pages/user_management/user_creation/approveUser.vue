<template>
  <div class="p-6 min-h-screen w-4/5 bg-gray-50">
    <!-- Header -->
    <div class="flex flex-col gap-4 mb-6">
      <!-- Title Section -->
      <div class="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl shadow-xl p-6 w-full relative overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-full"></div>
          <div class="absolute -bottom-8 -left-8 w-32 h-32 bg-white rounded-full"></div>
          <div class="absolute top-1/2 right-1/4 w-16 h-16 bg-white rounded-full"></div>
        </div>
        
        <div class="relative z-10 flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="bg-white bg-opacity-20 p-3 rounded-2xl shadow-lg">
              <span class="text-2xl">👥</span>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-white mb-1 drop-shadow-lg">
                Approve Users
              </h1>
              <p class="text-blue-100 text-sm font-medium">
                Review and approve pending user registrations
              </p>
            </div>
          </div>
          <div class="hidden sm:block bg-white bg-opacity-20 px-4 py-2 rounded-xl">
            <span class="text-white font-semibold text-lg">{{ meta?.total || 0 }}</span>
            <span class="text-blue-100 text-sm ml-1">Pending</span>
          </div>
        </div>
      </div>

      <!-- Search and Controls -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <!-- Stats Cards -->
        <div class="flex space-x-3">
          <div class="bg-white px-4 py-2 rounded-xl shadow-md border border-gray-100">
            <span class="text-gray-600 text-sm">Showing</span>
            <span class="font-bold text-blue-600 ml-1">{{ users?.length || 0 }}</span>
          </div>
          <div class="bg-white px-4 py-2 rounded-xl shadow-md border border-gray-100">
            <span class="text-gray-600 text-sm">Page</span>
            <span class="font-bold text-blue-600 ml-1">{{ currentPage }}</span>
          </div>
        </div>

        <!-- Search -->
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search users by name or email..."
            class="pl-12 pr-4 py-3 w-full sm:w-80 border-0 bg-white rounded-xl shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 text-gray-700 placeholder-gray-400"
          />
          <i class="fa fa-search absolute left-4 top-3.5 text-blue-500"></i>
          <div class="absolute right-3 top-2.5">
            <div class="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white rounded-2xl shadow-xl border border-gray-100">
      <div v-if="loading1" class="flex justify-center p-12">
        <div class="text-center">
          <span class="loading loading-spinner loading-lg text-blue-600 mb-4"></span>
          <p class="text-gray-600">Loading initial data...</p>
        </div>
      </div>
      <table v-else class="min-w-full text-sm text-gray-700">
        <thead class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-left">
          <tr>
            <th class="py-4 border-e border-blue-500 px-6 font-semibold text-sm uppercase tracking-wider">#</th>
            <th class="py-4 border-e border-blue-500 px-6 font-semibold text-sm uppercase tracking-wider">Name</th>
            <th class="py-4 border-e border-blue-500 px-6 font-semibold text-sm uppercase tracking-wider">Email</th>
            <th class="py-4 border-e border-blue-500 px-6 font-semibold text-sm uppercase tracking-wider">Customer</th>
            <th class="py-4 border-e border-blue-500 px-6 font-semibold text-sm uppercase tracking-wider ">Action</th>
          </tr>
        </thead>
        <tbody :class="loading?'blur-sm':''">
          <tr
            v-for="(user, index) in users"
            :key="user.id"
            class="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
          >
            <td class="py-4 border-e px-6 font-medium text-gray-900">{{ index + 1 }}</td>
            <td class="py-4 border-e px-6 font-semibold">
              <router-link 
                :to="'/user_management/user/details/'+user.id" 
                class="text-blue-700 hover:text-blue-900 transition-colors duration-200 flex items-center"
              >
                <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                {{ user.user.name }}
              </router-link>
            </td>
            <td class="py-4 border-e px-6 text-gray-600">{{ user.user.email }}</td>
            <td class="py-4 border-e px-6 capitalize text-gray-700">{{ user.customer?.user.name }}</td>
            <td class="py-4 border-e px-6">
              <button
                v-if="user.status == 0 || user.status == 'pending'"
                class="px-5 py-2.5 rounded-xl shadow-md bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                @click="statusUpdate(user)"
                :disabled="actionLoading"
              >
                <span v-if="actionLoading && approvingId === user.id" class="loading loading-spinner loading-xs mr-2"></span>
                {{ actionLoading && approvingId === user.id ? 'Approving...' : 'Approve' }}
              </button>
            </td>
          </tr>
          <tr v-if="users?.length === 0">
            <td colspan="5" class="text-center py-12 text-gray-400">
              <div class="flex flex-col items-center">
                <span class="text-4xl mb-2">👥</span>
                <p class="text-lg">No pending users found</p>
                <p class="text-sm text-gray-500 mt-1">All users have been approved or try adjusting your search</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- Pagination -->
      <div v-if="users?.length > 0 && meta" class="flex flex-col sm:flex-row justify-between items-center px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div class="text-sm text-gray-600 mb-3 sm:mb-0">
          Showing {{ meta?.from }} to {{ meta?.to }} of {{ meta?.total }} records
        </div>
        <div class="flex space-x-1">
          <button 
            v-for="link in meta?.links" 
            :key="link.label" 
            class="px-4 py-2 rounded-lg font-medium transition-all duration-200"
            :class="currentPage == link.page 
              ? 'bg-blue-500 text-white shadow-md' 
              : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'"
            @click="currentPage = link.page, getUsers()"
          >
            <p v-html="link.label"></p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import { ref, computed, onMounted, watch } from 'vue'
import Swal from 'sweetalert2'

const actionLoading = ref(false)
const approvingId = ref(null)
const searchQuery = ref('')
const meta = ref()
const users = ref([])
const currentPage = ref(1)
const loading1 = ref(true)
const loading = ref(false)
const originalUsersData = ref({})

const getUsers = async()=>{
  loading.value = true
  const {data} = await api().get('end-users?page='+currentPage.value+'&per_page=20&with=user,customer.user&status=0&search='+searchQuery.value)
  users.value = data.data.data
  meta.value = data.data
  loading.value = false
}

const debounce = (fn, delay = 500) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

const statusUpdate = async (user) => {
  actionLoading.value = true
  approvingId.value = user.id

  try {
    const payload = {
      name: user.user.name,
      email: user.user.email,
      status: 1,
      _method: "PUT"
    }

    console.log('Sending payload with original data:', payload)

    await api().post(`end-users/${user.id}`, payload)

    // Refresh the data to get the updated status
    await getUsers()

    Swal.fire({
      title: 'Approved!',
      text: `${user.user.name} has been approved successfully.`,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false
    })

  } catch (error) {
    console.error('Error updating status:', error)

    let errorMessage = 'Failed to approve user. Please try again.'
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message
    } else if (error.response?.data?.errors) {
      errorMessage = Object.values(error.response.data.errors).flat().join(', ')
    }

    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error'
    })
  } finally {
    actionLoading.value = false
    approvingId.value = null
  }
}

// Watch searchQuery with debounce
watch(searchQuery, debounce(() => {
  currentPage.value = 1 // reset page on new search
  getUsers()
}, 500))

onMounted(async()=>{
 await getUsers()
 loading1.value = false
})
</script>

<style scoped>
/* Custom scrollbar for better appearance */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>