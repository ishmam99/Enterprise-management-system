<template>
  <div class="p-6 min-h-screen w-4/5 bg-gray-50">
    <!-- Header -->
    <div class="flex flex-col gap-4 mb-6">
      <!-- Title Section -->
      <div class="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-2xl shadow-xl p-6 w-full relative overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-full"></div>
          <div class="absolute -bottom-8 -left-8 w-32 h-32 bg-white rounded-full"></div>
          <div class="absolute top-1/2 right-1/4 w-16 h-16 bg-white rounded-full"></div>
        </div>
        
        <div class="relative z-10 flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="bg-white bg-opacity-20 p-3 rounded-2xl shadow-lg">
              <span class="text-2xl">🕓</span>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-white mb-1 drop-shadow-lg">
                Users List By Solution
              </h1>
              <p class="text-purple-100 text-sm font-medium">
                Manage and view users organized by solution packages
              </p>
            </div>
          </div>
          <div class="hidden sm:block bg-white bg-opacity-20 px-4 py-2 rounded-xl">
            <span class="text-white font-semibold text-lg">{{ meta?.total || 0 }}</span>
            <span class="text-purple-100 text-sm ml-1">Total</span>
          </div>
        </div>
      </div>

      <!-- Search and Controls -->
      <div v-if="selectedSolution" class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <!-- Stats Cards -->
        <div class="flex space-x-3">
          <div class="bg-white px-4 py-2 rounded-xl shadow-md border border-gray-100">
            <span class="text-gray-600 text-sm">Showing</span>
            <span class="font-bold text-purple-600 ml-1">{{ users?.length || 0 }}</span>
          </div>
          <div class="bg-white px-4 py-2 rounded-xl shadow-md border border-gray-100">
            <span class="text-gray-600 text-sm">Page</span>
            <span class="font-bold text-purple-600 ml-1">{{ currentPage }}</span>
          </div>
        </div>

        <!-- Search and Filter -->
        <div class="flex flex-col sm:flex-row gap-4 items-center">
          <!-- Search -->
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search users by name or email..."
              class="pl-12 pr-4 py-3 w-full sm:w-80 border-0 bg-white rounded-xl shadow-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 text-gray-700 placeholder-gray-400"
            />
            <i class="fa fa-search absolute left-4 top-3.5 text-purple-500"></i>
            <div class="absolute right-3 top-2.5">
              <div class="w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
            </div>
          </div>

          <!-- Solution Select and Back Button -->
          <div class="flex gap-3">
            <button 
              @click="selectedSolution = null; getUsers(false)"
              class="px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
            >
              <i class="ri-arrow-left-double-fill mr-2"></i>
              Back to Solutions
            </button>
            
            <select
              v-model="selectedSolution"
              class="px-4 py-3 border-0 bg-white rounded-xl shadow-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 text-gray-700"
              @change="getUsers(true)"
            >
              <option value="">All Solutions</option>
              <option v-for="solution in solutions" :key="solution.id" :value="solution.name">
                {{ solution.name }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Solution List View -->
      <div v-else class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <!-- Stats Cards -->
        <div class="flex space-x-3">
          <div class="bg-white px-4 py-2 rounded-xl shadow-md border border-gray-100">
            <span class="text-gray-600 text-sm">Solutions</span>
            <span class="font-bold text-purple-600 ml-1">{{ users?.length || 0 }}</span>
          </div>
          <div class="bg-white px-4 py-2 rounded-xl shadow-md border border-gray-100">
            <span class="text-gray-600 text-sm">Page</span>
            <span class="font-bold text-purple-600 ml-1">{{ currentPage }}</span>
          </div>
        </div>

        <!-- Search -->
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search solutions..."
            class="pl-12 pr-4 py-3 w-full sm:w-80 border-0 bg-white rounded-xl shadow-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 text-gray-700 placeholder-gray-400"
          />
          <i class="fa fa-search absolute left-4 top-3.5 text-purple-500"></i>
          <div class="absolute right-3 top-2.5">
            <div class="w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Table Container -->
    <div class="overflow-x-auto bg-white rounded-2xl shadow-xl border border-gray-100">
      <!-- User List Table -->
      <div v-if="selectedSolution">
        <table class="min-w-full text-sm text-gray-700">
          <thead class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-left">
            <tr>
              <th class="py-4 border-e border-purple-500 px-6 font-semibold text-sm uppercase tracking-wider">#</th>
              <th class="py-4 border-e border-purple-500 px-6 font-semibold text-sm uppercase tracking-wider">Name</th>
              <th class="py-4 border-e border-purple-500 px-6 font-semibold text-sm uppercase tracking-wider">Email</th>
              <th class="py-4 border-e border-purple-500 px-6 font-semibold text-sm uppercase tracking-wider">Solution</th>
              <th class="py-4 border-e border-purple-500 px-6 font-semibold text-sm uppercase tracking-wider">Status</th>
              <th class="py-4 border-e border-purple-500 px-6 font-semibold text-sm uppercase tracking-wider text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="users.length === 0">
              <td colspan="6" class="text-center py-12 text-gray-400">
                <div class="flex flex-col items-center">
                  <span class="text-4xl mb-2">👥</span>
                  <p class="text-lg">No users found</p>
                  <p class="text-sm text-gray-500 mt-1">Try adjusting your search criteria</p>
                </div>
              </td>
            </tr>
            <tr 
              v-for="(req, index) in users" 
              :key="req.id"
              class="border-b border-gray-100 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-200"
            >
              <td class="py-4 border-e px-6 font-medium text-gray-900">{{ index + 1 }}</td>
              <td class="py-4 border-e px-6 font-semibold text-gray-800">
                <div class="flex items-center">
                  <span class="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  {{ req.user?.name }}
                </div>
              </td>
              <td class="py-4 border-e px-6 text-gray-600">{{ req.user?.email }}</td>
              <td class="py-4 border-e px-6">
                <span class="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 rounded-full text-xs font-semibold border border-purple-200">
                  {{ selectedSolution }}
                </span>
              </td>
              <td class="py-4 border-e px-6">
                <span :class="[
                  'px-3 py-1.5 rounded-full text-xs font-semibold border',
                  req.status == 0
                    ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                    : req.status == 1
                      ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                      : 'bg-red-100 text-red-700 border-red-200',
                ]">
                  {{ req.status == 0 ? 'Pending' : req.status == 1 ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="py-4 border-e px-6">
                <div class="flex justify-center gap-2">
                  <button 
                    v-if="req.status === 0" 
                    @click="approveRequest(req)"
                    class="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm font-semibold rounded-xl hover:from-emerald-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-md"
                  >
                    Approve
                  </button>
                  <router-link 
                    :to="'/user_management/user/details/'+req.id" 
                    class="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-md flex items-center"
                  >
                    <i class="ri-eye-line mr-1"></i>
                    View
                  </router-link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Solution List Table -->
      <div v-else>
        <table class="min-w-full text-sm text-gray-700">
          <thead class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-left">
            <tr>
              <th class="py-4 border-e border-purple-500 px-6 font-semibold text-sm uppercase tracking-wider">#</th>
              <th class="py-4 border-e border-purple-500 px-6 font-semibold text-sm uppercase tracking-wider">Solution Name</th>
              <th class="py-4 border-e border-purple-500 px-6 font-semibold text-sm uppercase tracking-wider">Users Count</th>
              <th class="py-4 border-e border-purple-500 px-6 font-semibold text-sm uppercase tracking-wider text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="users.length === 0">
              <td colspan="4" class="text-center py-12 text-gray-400">
                <div class="flex flex-col items-center">
                  <span class="text-4xl mb-2">💼</span>
                  <p class="text-lg">No solutions found</p>
                  <p class="text-sm text-gray-500 mt-1">Try adjusting your search criteria</p>
                </div>
              </td>
            </tr>
            <tr 
              v-for="(req, index) in users" 
              :key="req.id"
              class="border-b border-gray-100 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-200"
            >
              <td class="py-4 border-e px-6 font-medium text-gray-900">{{ index + 1 }}</td>
              <td class="py-4 border-e px-6 font-semibold text-gray-800">
                <div class="flex items-center">
                  <span class="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  {{ req.name }}
                </div>
              </td>
              <td class="py-4 border-e px-6">
                <span class="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 rounded-full text-sm font-semibold border border-purple-200">
                  {{ req.total }} users
                </span>
              </td>
              <td class="py-4 border-e px-6 text-center">
                <button 
                  @click="selectedSolution = req.name; getUsers(true)"
                  class="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center mx-auto"
                >
                  <i class="ri-list-check mr-2"></i>
                  View Users
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="users.length > 0 && meta" class="flex flex-col sm:flex-row justify-between items-center px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div class="text-sm text-gray-600 mb-3 sm:mb-0">
          Showing {{ meta?.from }} to {{ meta?.to }} of {{ meta?.total }} records
        </div>
        <div class="flex space-x-1">
          <button 
            v-for="link in meta?.links" 
            :key="link.label" 
            class="px-4 py-2 rounded-lg font-medium transition-all duration-200"
            :class="currentPage == link.page 
              ? 'bg-purple-500 text-white shadow-md' 
              : 'bg-white text-purple-600 border border-purple-200 hover:bg-purple-50'"
            @click="currentPage = link.page, getUsers(!!selectedSolution)"
          >
            <p v-html="link.label"></p>
          </button>
        </div>
      </div>
    </div>

    <!-- Toast Message -->
    <div v-if="toastMessage"
      class="fixed bottom-6 right-6 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg animate-fadeIn z-50 font-semibold">
      <div class="flex items-center">
        <i class="ri-checkbox-circle-fill mr-2"></i>
        {{ toastMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '@/config/api'
import { ref, watch, onMounted } from 'vue'

const selectedRequest = ref()
const searchQuery = ref('')
const currentPage = ref(1)
const users = ref([])
const meta = ref()
const selectedSolution = ref("")
const solutions = ref([])
const toastMessage = ref("")

const getUsers = async (type) => {
  let indStr = ''
  let groupBy = ''
  if (selectedSolution.value) {
    indStr = '&relation=solutions&relation_field=name&relation_value='+ selectedSolution.value
  }
  if(type == false)
  {
    groupBy = '&group_by=solutions.name'
  }
  else
   groupBy = `&per_page=20&page=${currentPage.value}&search=${encodeURIComponent(searchQuery.value)}`
  const { data } = await api().get(
    `end-users?with=solutions,user${groupBy}${indStr}`
  )
  users.value = data.data.data || data.data
  meta.value = data.data
  console.log(users.value)
}

// --- Debounce utility ---
const debounce = (fn, delay = 500) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

// Watch searchQuery with debounce
watch(searchQuery, debounce(() => {
  currentPage.value = 1 // reset page on new search
  getUsers(!!selectedSolution.value)
}, 500))

const getSolutions = async() => {
  const {data} = await api().get('solutions')
  solutions.value = data.data
}

const approveRequest = (req) => {
  // Add your approval logic here
  toastMessage.value = `User ${req.user?.name} approved successfully!`
  setTimeout(() => {
    toastMessage.value = ""
  }, 3000)
}

onMounted(() => {
  getSolutions()
  getUsers(false)
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

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
</style>