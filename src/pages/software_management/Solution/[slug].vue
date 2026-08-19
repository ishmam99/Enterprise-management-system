<template>
  <div class="w-full  p-8">
    <div class="w-full mx-auto">
      <!-- Header -->
      <header class="mb-1 text-center">
        <h1 class="text-4xl py-2 md:text-5xl font-bold bg-gradient-to-r from-blue-800 to-slate-800 bg-clip-text text-transparent">
          Solution Details for <span class="text-cyan-700">{{ systemData?.name }}</span>
        </h1>
        <!-- <p class="text-slate-600" v-if="serviceId">Viewing Industry: <span class="font-semibold">{{ systemData.system?.name }}</span></p> -->
      </header>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p class="mt-4 text-slate-600">Loading system data for {{ serviceId }}...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="w-16 h-16 mx-auto mb-4 text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-red-600 mb-2">Error Loading Data</h3>
        <p class="text-slate-600">{{ error }}</p>
        <button @click="getPlanningStats" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Retry
        </button>
      </div>

      <!-- Main Content Grid -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 w-full gap-6 mb-8">
        <!-- System Info Card -->
        <!-- <div class="bg-white rounded-xl shadow-lg p-6 lg:col-span-1 border border-slate-200">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-2xl font-bold text-slate-800 uppercase tracking-wide">{{ systemData.system?.name || serviceId }}</h2>
              <p class="text-slate-500 text-sm">Operational Status: {{ systemData.system?.status === '1' ? 'Active' : 'Inactive' }}</p>
            </div>
          </div>



          <div class="grid grid-cols-2 gap-4">
            <div class="text-center p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p class="text-sm text-blue-700 font-medium mb-1">Last Updated</p>
              <p class="text-blue-900 font-semibold">{{ formatDate(systemData.system?.updated_at) }}</p>
            </div>
            <div class="text-center p-3 bg-green-50 rounded-lg border border-green-100">
              <p class="text-sm text-green-700 font-medium mb-1">Created</p>
              <p class="text-green-900 font-semibold">{{ formatDate(systemData.system?.created_at) }}</p>
            </div>
          </div>
        </div> -->

        <!-- Stats Overview -->
        <div class="bg-white rounded-xl w-full shadow-lg p-6 lg:col-span-2 border border-slate-200">
          <h2 class="text-xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-3">Assigned Industries , Softwares and Registered Customers</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Total Inventory Item -->
            <div class="bg-gradient-to-br from-blue-50 to-white p-5 rounded-xl border border-blue-100 shadow-sm transition-all duration-300 hover:shadow-md">
              <div class="flex justify-between items-start mb-3">
                <h3 class="text-sm font-semibold text-blue-800 uppercase tracking-wide">Assigned Industries</h3>
                <div class="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
              <p class="text-3xl font-bold text-blue-900 mb-2">{{ formatNumber(systemData?.industries?.length || 0) }}</p>
            </div>

            <!-- Total Service Taken -->
            <div class="bg-gradient-to-br from-emerald-50 to-white p-5 rounded-xl border border-emerald-100 shadow-sm transition-all duration-300 hover:shadow-md">
              <div class="flex justify-between items-start mb-3">
                <h3 class="text-sm font-semibold text-emerald-800 uppercase tracking-wide">Assigned Softwares</h3>
                <div class="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
              <p class="text-3xl font-bold text-emerald-900 mb-2">{{ formatNumber(systemData?.softwares?.length || 0) }}</p>
            </div>
            <div class="bg-gradient-to-br from-emerald-50 to-white p-5 rounded-xl border border-emerald-100 shadow-sm transition-all duration-300 hover:shadow-md">
              <div class="flex justify-between items-start mb-3">
                <h3 class="text-sm font-semibold text-emerald-800 uppercase tracking-wide">Registered Customers</h3>
                <div class="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center shadow-sm">
              <i class="ri-group-line text-white text-xl"></i>
                </div>
              </div>
              <p class="text-3xl font-bold text-emerald-900 mb-2">{{ formatNumber(systemData?.customers?.length || 0) }}</p>
            </div>
              <div class="bg-gradient-to-br from-emerald-50 to-white p-5 rounded-xl border border-emerald-100 shadow-sm transition-all duration-300 hover:shadow-md">
              <div class="flex justify-between items-start mb-3">
                <h3 class="text-sm font-semibold text-emerald-800 uppercase tracking-wide">Associated Training Courses</h3>
                <div class="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center shadow-sm">
              <i class="ri-presentation-line text-white text-xl"></i>
                </div>
              </div>
              <p class="text-3xl font-bold text-emerald-900 mb-2">{{ formatNumber(systemData?.trainings?.length || 0) }}</p>
            </div>

          </div>
        </div>
        <div class="px-3 py-2 bg-sky-400 rounded-xl shadow-lg space-y-2">
          <h1 class="text-2xl text-white font-semibold underline">Softwares Assigned :</h1>
          <div class="grid grid-cols-4 gap-3" >
          <div v-for="software in systemData?.softwares" :key="software.id" class="rounded-2xl bg-pink-500 flex justify-center items-center p-2 text-white">
              <p>{{ software.name }}</p>
          </div>
        </div>
        </div>
        <div class="px-3 py-2 bg-amber-400 rounded-xl shadow-lg space-y-2">
          <h1 class="text-2xl text-white font-semibold underline">Industries Assigned :</h1>
          <div class="grid grid-cols-3 gap-3" >
          <div v-for="industry in systemData?.industries" :key="industry.id" class="rounded-2xl bg-gray-500 flex justify-center items-center p-2 text-center text-white">
              <p class="text-nowrap">{{ industry.name }}</p>
          </div>
        </div>
        </div>
        <div class="px-3 py-2 col-span-2 bg-green-400 rounded-xl shadow-lg space-y-2">
          <h1 class="text-2xl text-white font-semibold underline">Customers Assigned :</h1>
            <div class="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100">
      <table class="min-w-full text-sm text-gray-700 table-zebra">
        <thead class="bg-emerald-600 text-white text-left">
          <tr>
            <th class="py-3 border-e px-4">#</th>
            <th class="py-3 border-e px-4">Name</th>
            <th class="py-3 border-e px-4">Email</th>
            <th class="py-3 border-e px-4">Role</th>
            <th class="py-3 border-e px-4">Status</th>
            <th class="py-3 border-e px-4 text-right">Last Active</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(customer, index) in systemData?.customers"
            :key="customer.id"
            class="border-b border-gray-100 hover:bg-gray-50 transition"
          >
            <td class="py-3 border-e px-4">{{ index + 1 }}</td>
            <td class="py-3 border-e px-4 font-semibold">{{ customer.user.name }}</td>
            <td class="py-3 border-e px-4">{{customer.user.email }}</td>
            <td class="py-3 border-e px-4 capitalize">{{ customer.user.role }}</td>
            <td class="py-3 border-e px-4">
              <span
                :class="[
                  'px-3 py-1 rounded-full text-xs font-semibold',
                 customer.user.status === 'active'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-gray-200 text-gray-600',
                ]"
              >
                {{ customer.status }}
              </span>
            </td>
            <td class="py-3 px-4 text-right text-gray-500">{{ customer.lastActive }}</td>
          </tr>
          <tr v-if="systemData?.customers === 0">
            <td colspan="6" class="text-center py-6 text-gray-400">No customers found</td>
          </tr>
        </tbody>
      </table>
    </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Convert slug back to normal text for display
const serviceId = computed(() => {
  const slug = route.params.slug || ''
  return slug.replace(/-/g, ' ')
})

// Extract system_id from slug or query parameters
const systemId = computed(() => {
  // Option 1: If slug contains the ID (e.g., "system-5" or "5-tv-displays")
  const slug = route.params.slug || ''
  const idFromSlug = slug.match(/\d+/)
  if (idFromSlug) {
    return parseInt(idFromSlug[0])
  }

  // Option 2: From query parameters
  if (route.query.system_id) {
    return parseInt(route.query.system_id)
  }

  // Option 3: From route params directly
  if (route.params.system_id) {
    return parseInt(route.params.system_id)
  }

  // Default fallback
  return 5
})

// Reactive data
const isLoading = ref(true)
const error = ref(null)
const systemData = ref({
  system: null,
  service: 0,
  replacement: 0,
  remodeling: 0,
  maintenance_schedules: 0,
  system_inventories: 0
})

// Format numbers with commas
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// Format date
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'

  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch (error) {
    return 'Invalid Date'
  }
}




// Toast function (mock - replace with actual toast implementation)
const toast = (options) => {
  console.log('Toast:', options)
}

// Fetch planning stats
const getPlanningStats = async () => {
  try {
    isLoading.value = true
    error.value = null

    console.log('Fetching data for system ID:', systemId.value, 'Service ID:', serviceId.value)

    const { data } = await api().get(`solutions/${systemId.value}?softwares=true&industries=true&customers=true&trainings=true`)
    systemData.value = data

    console.log('Fetched planning stats:', systemData.value)
  } catch (error) {
    console.error('Error fetching planning stats:', error)
    error.value = 'Failed to load system data. Please try again.'
    toast({
      title: 'Error',
      description: 'Failed to load system data',
      variant: 'destructive'
    })
  } finally {
    isLoading.value = false
  }
}

// Watch for route changes to reload data
watch(() => route.params.slug, () => {
  if (route.params.slug) {
    getPlanningStats()
  }
})

onMounted(() => {
  getPlanningStats()
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
}

/* Custom scrollbar for the table */
.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #c5c5c5;
  border-radius: 10px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Loading spinner */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
