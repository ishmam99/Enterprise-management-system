<template>
  <div class="px-10 bg-white py-5 w-11/12 mx-auto">
    <!-- Header Section -->
    <div class="mb-8 text-center">
      <h1 class="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
List of User by software     </h1>
      <p class="text-gray-600 max-w-2xl mx-auto">
        Browse and manage users by software with this interactive dashboard
      </p>
    </div>

    <!-- software Selection Card -->
    <div class="bg-white rounded-2xl shadow-lg p-6 mb-8 max-w-2xl mx-auto border border-indigo-100">
      <div class="flex items-center mb-4">
        <div class="bg-indigo-100 p-2 rounded-lg mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-800">Filter by software</h2>
      </div>

      <label class="block text-lg font-medium text-gray-700 mb-3">Select software</label>
      <div class="relative">
        <select
          v-model="selectedsoftware"
          @change="fetchEndUsers"
          class="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none appearance-none bg-white pr-10"
        >
          <option value="" disabled>Choose a software...</option>
          <option
            v-for="software in softwares"
            :key="software.id"
            :value="software.id"
          >
            {{ software.software.name }}
          </option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="max-w-6xl mx-auto">
      <!-- Loader -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        <span class="ml-3 text-indigo-700 font-medium">Loading users...</span>
      </div>

      <!-- Data Table -->
      <div v-else-if="endUsers.length" class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <div class="px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600">
          <h2 class="text-xl font-bold text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            Users ({{ endUsers.length }})
          </h2>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Software(s)</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="(user, index) in endUsers"
                :key="user.id"
                class="hover:bg-indigo-50 transition-all duration-200"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-8 w-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {{ index + 1 }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ user.user?.name }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-700">{{ user.user?.email }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-700 font-medium">{{ user.username }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                      user.status === '1'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800',
                    ]"
                  >
                    <span :class="[
                      'h-2 w-2 rounded-full mr-1.5',
                      user.status === '1' ? 'bg-green-500' : 'bg-red-500'
                    ]"></span>
                    {{ user.status === '1' ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="software in user.softwares"
                      :key="software.id"
                      class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 border border-purple-200"
                    >
                      {{ software.name }}
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- No Data State -->
      <div v-else class="text-center py-12">
        <div class="max-w-md mx-auto">
          <div class="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full p-4 w-24 h-24 mx-auto flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">No users found</h3>
          <p class="text-gray-500 mb-6">Select a different software or check back later for updates.</p>
          <button
            @click="selectedsoftware = ''"
            class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
            </svg>
            Clear Selection
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '@/config/api'
import { ref, onMounted } from 'vue'

const softwares = ref([])
const endUsers = ref([])
const selectedsoftware = ref('')
const loading = ref(false)

// ✅ Fetch softwares for dropdown
const fetchsoftwares = async () => {
  try {
    const response = await api().get('/customer-software')
    // 👇 FIX: Directly assign response.data if API returns array
    softwares.value = response.data || []
    console.log('softwares loaded:', softwares.value)
  } catch (error) {
    console.error('Error fetching softwares:', error)
    softwares.value = []
  }
}

// ✅ Fetch end users for selected software
const fetchEndUsers = async () => {
  if (!selectedsoftware.value) return
  loading.value = true
  try {
    // Make sure the query parameter is correct for your backend
    const response = await api().get(`/end-users?software_id=${selectedsoftware.value}`)
    endUsers.value = response.data.data || []
    console.log('End users loaded:', endUsers.value)
  } catch (error) {
    console.error('Error fetching end users:', error)
    endUsers.value = []
  } finally {
    loading.value = false
  }
}

onMounted(fetchsoftwares)
</script>
