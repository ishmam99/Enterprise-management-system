

<template>
  <div class="p-6 min-h-screen w-4/5 bg-gray-50">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
    <div class="mb-4 sm:mb-0">
            <h1 class="text-3xl font-bold text-gray-900">User List</h1>
            <p class="text-gray-600 mt-2">Manage your organization's users</p>
          </div>
      <!-- Search -->
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

    <!-- Table -->
    <div class="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100">
      <div v-if="loading1" class="flex justify-center p-12">
      <div class="text-center">
        <span class="loading loading-spinner loading-lg text-fuchsia-600 mb-4"></span>
        <p class="text-gray-600">Loading inital data...</p>
      </div>
    </div>
      <table v-else class="min-w-full text-sm text-gray-700 table-zebra">
        <thead class="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <tr>
            <th class="py-3 border-e px-4">#</th>
            <th class="py-3 border-e px-4">Name</th>
            <th class="py-3 border-e px-4">Email</th>
            <th class="py-3 border-e px-4">Customer</th>
            <th class="py-3 border-e px-4">Softwares</th>
            <!-- <th class="py-3 border-e px-4 text-right">Last Active</th> -->
          </tr>
        </thead>
        <tbody :class="loading?'blur-sm':''">
          <tr
            v-for="(user, index) in users"
            :key="user.id"
            class="border-b border-gray-100 hover:bg-gray-50 transition"

          >
            <td class="py-3 border-e px-4">{{ index + 1 }}</td>
            <td class="py-3 border-e px-4 font-semibold">
              <router-link :to="'/customer/Users/details/'+user.id" class="text-blye-600 text-xl font-semibold">
              {{ user.user.name }}</router-link></td>
            <td class="py-3 border-e px-4">{{ user.user.email }}</td>
            <td class="py-3 border-e px-4 capitalize">{{ user.customer?.user.name }}</td>
            <td class="py-3 border-e px-4">
            <td class="px-6 py-4">
          <div class="flex flex-wrap gap-2" v-if="user.softwares?.length">
            <span

              v-for="software in user.softwares"
              :key="software.id"
              class="bg-purple-100 text-purple-800 px-2 py-1 text-xs font-medium rounded-full"
            >
              {{ software.name }}
            </span>

          </div>
           <span v-else class="text-gray-400 italic text-sm">No software</span>
        </td>
            </td>
            <!-- <td class="py-3 px-4 text-right text-gray-500">{{ user.lastActive }}</td> -->
          </tr>
          <tr v-if="users?.length === 0">
            <td colspan="6" class="text-center py-6 text-gray-400">No users found</td>
          </tr>
        </tbody>
      </table>
        <div v-if="users?.length > 0 && meta" class="flex px-4 py-2 justify-between items-center mt-6">
        <div class="text-sm text-gray-600">
          Showing {{ users?.length  }} of {{ meta?.total }} records from {{ meta?.from }} to {{ meta?.to }}
        </div>
        <div class=" bg-cyan-500 space-x-1 px-2 rounded-md py-1">

          <button v-for="link in meta?.links" :key="link.label" class="p-3 btn btn-info rounded-md" :class="currentPage == link.page ? 'bg-blue-500 text-white':'bg-white text-blue-800'" @click="currentPage = link.page,getUsers()"><p v-html="link.label"></p></button>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import { useAuthStore } from '@/stores/AuthStore'
import { ref, computed, onMounted, watch } from 'vue'

const authStore = useAuthStore()
const searchQuery = ref('')
const meta = ref()
const users = ref([])
const currentPage = ref(1)
const loading1 = ref(true)
const loading = ref(false)
const getUsers = async()=>{
  loading.value = true
  const {data} = await api().get('end-users?customer_id='+authStore.user.customer.id+'&page='+currentPage.value+'&per_page=20&with=softwares,user,customer.user&search='+searchQuery.value)
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
/* Optional subtle animations */
tr {
  transition: background-color 0.2s ease;
}
</style>
