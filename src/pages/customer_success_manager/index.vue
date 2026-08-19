<template>
  <div class="w-4/5 mx-auto">
    <!-- Header Section -->
    <div class="mb-6">
      <div
        class="px-10 m-4 pt-8 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-bg-gray-400 border rounded-2xl text-gray-900 shadow-xl"
      >
        <div>
          <h1 class="text-3xl font-bold tracking-tight drop-shadow-sm">
          All Overview
          </h1>
          <p class="text-indigo-800 mt-1">
            Welcome back,
            <span class="font-medium text-yellow-700 animate-pulse">{{ authStore?.user?.name }}</span>
          </p>
        </div>
        <div class="relative">
          <div
            class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-lg blur opacity-75"
          ></div>

        </div>
      </div>
    </div>

    <!-- Stats Cards Section -->
    <div class="px-10 py-6 mx-auto">
      <!-- Youth Summary Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Total Users Card -->
        <div
          class="relative px-5 py-8 rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br from-purple-500 to-indigo-600 text-white"
        >
          <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full"></div>
          <div class="absolute bottom-0 left-0 -mb-4 -ml-4 w-16 h-16 bg-white/5 rounded-full"></div>
          <div class="flex items-start justify-between relative z-10">
            <div>
              <h3 class="text-purple-100 text-sm font-medium">Total Locations</h3>
              <p class="text-4xl font-bold text-white mt-1">
                <count-up :end-val="stats.locations"></count-up>
              </p>
            </div>
            <div class="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center">
            <div class="w-full bg-white/20 rounded-full h-2">
              <div class="bg-green-300 h-2 rounded-full" style="width: 75%"></div>
            </div>
          </div>
        </div>

        <!-- Total Training Courses Card -->
        <div
          class="relative px-5 py-8 rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br from-teal-500 to-cyan-600 text-white"
        >
          <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full"></div>
          <div class="absolute bottom-0 left-0 -mb-4 -ml-4 w-16 h-16 bg-white/5 rounded-full"></div>
          <div class="flex items-start justify-between relative z-10">
            <div>
              <h3 class="text-teal-100 text-sm font-medium">Total Team Members</h3>
              <p class="text-4xl font-bold text-white mt-1">
                <count-up :end-val="stats.members"></count-up>
              </p>
            </div>
            <div class="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center">
            <div class="w-full bg-white/20 rounded-full h-2">
              <div class="bg-yellow-300 h-2 rounded-full" style="width: 60%"></div>
            </div>
          </div>
        </div>

        <!-- Total Software Card -->
        <div
          class="relative px-5 py-8 rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br from-amber-500 to-orange-600 text-white"
        >
          <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full"></div>
          <div class="absolute bottom-0 left-0 -mb-4 -ml-4 w-16 h-16 bg-white/5 rounded-full"></div>
          <div class="flex items-start justify-between relative z-10">
            <div>
              <h3 class="text-amber-100 text-sm font-medium">Total Tasks</h3>
              <p class="text-4xl font-bold text-white mt-1">
                <count-up :end-val="stats.tasks"></count-up>
              </p>
            </div>
            <div class="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center">
            <div class="w-full bg-white/20 rounded-full h-2">
              <div class="bg-pink-300 h-2 rounded-full" style="width: 45%"></div>
            </div>
          </div>
        </div>


        <!-- Total Solution Card -->
        <div
          class="relative px-5 py-8 rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br from-rose-500 to-pink-600 text-white"
        >
          <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full"></div>
          <div class="absolute bottom-0 left-0 -mb-4 -ml-4 w-16 h-16 bg-white/5 rounded-full"></div>
          <div class="flex items-start justify-between relative z-10">
            <div>
              <h3 class="text-rose-100 text-sm font-medium">Generated Activity Reports</h3>
              <p class="text-4xl font-bold text-white mt-1">
                <count-up :end-val="stats?.reports"></count-up>
              </p>
            </div>
            <div class="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center">
            <div class="w-full bg-white/20 rounded-full h-2">
              <div class="bg-blue-300 h-2 rounded-full" style="width: 80%"></div>
            </div>
          </div>
        </div>

      </div>
          <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div class="px-8 py-6 border-b border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-xl font-bold text-gray-900">Activity Logs</h2>
              <p class="text-sm text-gray-600 mt-1">Detailed breakdown of all activities for the reporting period</p>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-500">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              {{ report?.period }}
            </div>
          </div>
        </div>

        <div class="p-8">

          <div v-if="groupedOutputs.length" class="space-y-8">
            <div
              v-for="group in groupedOutputs"
              :key="group.id"
              class="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <!-- Task Header -->
              <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900 text-lg">{{ group.description }}</h3>
                      <div class="flex flex-wrap items-center gap-3 mt-1">
                        <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                          </svg>
                          {{ group.task_type }}
                        </span>
                        <span class="text-sm text-gray-600">
                          <span class="text-gray-500">Assigned to:</span>
                          <span class="font-medium ml-1">{{ group.assigned_person?.name }}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <span class="px-4 py-1.5 rounded-full text-sm font-medium capitalize"
                    :class="group.task_status === 'pending'
                      ? 'bg-amber-100 text-amber-800'
                      : group.task_status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'">
                    {{ group.task_status }}
                  </span>
                </div>
              </div>

              <!-- Activity Table -->
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                      <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Activity Output</th>
                      <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                      <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Completed On</th>
                      <!-- <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th> -->
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    <tr v-for="output in group.outputs" :key="output.id" class="hover:bg-gray-50 transition-colors">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="w-2 h-2 rounded-full bg-primary mr-2"></div>
                          <span class="text-sm font-medium text-gray-900">{{ formatDate(output.date) }}</span>
                        </div>
                      </td>
                      <td class="px-6 py-4">
                        <div class="max-w-lg">
                          <p class="text-sm text-gray-900">{{ output.output }}</p>
                          <p class="text-xs text-gray-500 mt-1">
                            Updated: {{ formatDateTime(output.updated_at) }}
                          </p>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                          :class="output.status === '1'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'">
                          <span class="w-1.5 h-1.5 rounded-full mr-1.5"
                            :class="output.status === '1' ? 'bg-green-500' : 'bg-gray-500'"></span>
                          {{ output.status === '1' ? 'Completed' : 'Pending' }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div v-if="output.completed_at" class="flex items-center text-sm text-gray-900">
                          <svg class="w-4 h-4 mr-1.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          {{ formatDate(output.completed_at) }}
                        </div>
                        <span v-else class="text-sm text-gray-400">—</span>
                      </td>
                    <!--    <td class="px-6 py-4 whitespace-nowrap">
                       <button
                          @click="viewActivityDetails(output)"
                          class="text-primary hover:text-primary-dark text-sm font-medium flex items-center gap-1">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                          </svg>
                          View Details
                        </button>
                      </td>-->
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-12">
            <div class="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No Activities Found</h3>
            <p class="text-gray-600 max-w-md mx-auto">
              There are no activity logs recorded for the {{ report?.period }} reporting period.
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { watch, ref, onMounted } from 'vue';
import { useAuthStore } from '/src/stores/AuthStore';
import { useRouter, useRoute } from 'vue-router';
// import BarChart from '@/components/BarChart.vue';
// import dbimg from '/src/assets/images/scm_management.png';
// import { useLiveClock } from '@/composables/useLiveClock';
import CountUp from "vue-countup-v3";
import { useCustomerSuccessManagerStore } from './stores/customerSuccessManagerStore';

// const { currentTime } = useLiveClock();
const authStore = useAuthStore()
const route = useRoute();
const router = useRouter();
const store = useCustomerSuccessManagerStore();
const stats = ref({
  locations : 0,
  members : 0,
  tasks : 0,
  reports : 0
})
const groupedOutputs = ref([])
const formatDate = (dateString) => {
  if (!dateString) return '—'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return '—'
  const date = new Date(dateTimeString)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
const getStats = async()=>{
  const companyData = await api().get('success-teams/'+authStore.team_id)
  const tasks = await api().get('success-team-tasks?with=outputs,assignedPerson&success_team_id='+authStore.team_id)
  const reports = await api().get('success-team-activity-reports?success_team_id='+authStore.team_id)
  console.log( tasks.data?.data)
  groupedOutputs.value = tasks.data?.data
  stats.value.locations = companyData.data.company.customers.length
  stats.value.members = companyData.data.members.length
  stats.value.tasks = tasks.data.total
  stats.value.reports = reports.data.total
  store.setCurrentSubMenu('')
}
watch(()=>authStore.team_id,()=>{
    getStats()
})
// Run charts when component mounts AND when tab becomes active
onMounted( () => {

getStats()
})

</script>

<style scoped>
/* Smooth transitions for all interactive elements */
button, [class*="hover:"], [class*="group-hover:"] {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>
