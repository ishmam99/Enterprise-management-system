<template>
  <div class="w-4/5 mx-auto">
    <!-- Header Section -->
    <div class="mb-6">
      <div
        class="px-10 pt-8 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-500 rounded-2xl text-white shadow-xl"
      >
        <div>
          <h1 class="text-3xl font-bold tracking-tight drop-shadow-sm">
            {{ props.activeTab }} {{ props.activeTab != 'All' ? '' : '' }} Overview
          </h1>
          <p class="text-indigo-100 mt-1">
            Welcome back,
            <span class="font-medium text-yellow-300 animate-pulse">{{ store?.user?.name }}</span>
          </p>
        </div>
        <div class="relative">
          <div
            class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-lg blur opacity-75"
          ></div>
          <div
            v-if="props.activeTab != 'All'"
            class="relative px-4 py-2 bg-white rounded-lg shadow-lg ring-1 ring-white/30"
          >
            <button class="btn bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:from-purple-600 hover:to-indigo-600 hover:shadow-lg" @click="$emit('setTab', 'All')">Back to Dashboard</button>
          </div>
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
              <h3 class="text-purple-100 text-sm font-medium">Total Users</h3>
              <p class="text-4xl font-bold text-white mt-1">
                <count-up :end-val="dbStats?.users"></count-up>
              </p>
            </div>
            <div class="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
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
              <h3 class="text-teal-100 text-sm font-medium">Total Training Courses</h3>
              <p class="text-4xl font-bold text-white mt-1">
                <count-up :end-val="dbStats?.trainings"></count-up>
              </p>
            </div>
            <div class="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
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
              <h3 class="text-amber-100 text-sm font-medium">Total Software</h3>
              <p class="text-4xl font-bold text-white mt-1">
                <count-up :end-val="dbStats?.softwares"></count-up>
              </p>
            </div>
            <div class="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
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
              <h3 class="text-rose-100 text-sm font-medium">Total Solution</h3> 
              <p class="text-4xl font-bold text-white mt-1">
                <count-up :end-val="dbStats?.solutions"></count-up>
              </p>
            </div>
            <div class="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
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

      <!-- Quick Actions Section -->
      <div class="pb-8">
        <div
          class="bg-gradient-to-br from-white to-indigo-50 mt-8 p-8 rounded-3xl shadow-xl border border-indigo-100/50"
        >
          <div class="flex justify-between items-center mb-8">
            <div>
              <h2 class="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
    <i class="ri-flashlight-line text-teal-600 text-2xl"></i>
    Quick Actions
  </h2>
              <!-- <p class="text-sm text-indigo-500 mt-1 font-medium">Frequently used actions at your fingertips</p> -->
            </div>
            <div class="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md">
              <svg
                class="h-5 w-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
            <!-- Add Solution -->
            <router-link
              to="/partner/Customer-Support/UnsolvedticketIssue"
              class="relative flex flex-col items-center justify-center p-5 bg-white rounded-2xl border border-emerald-100 hover:border-emerald-300 shadow-md hover:shadow-lg transition-all duration-300 group overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              <div
        class="p-3 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 text-white group-hover:scale-110 transition"
      >
        <i class="ri-user-add-line text-2xl"></i>
      </div>
              <span class="text-sm font-semibold text-gray-700 group-hover:text-emerald-700 z-10"
                >Unresolved Tickets</span
              >
            </router-link>

            <!-- Add Software -->
            <router-link
              to="/partner/htss-training/Training-List/CompletedTraining"
              class="relative flex flex-col items-center justify-center p-5 bg-white rounded-2xl border border-amber-100 hover:border-amber-300 shadow-md hover:shadow-lg transition-all duration-300 group overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              <div
                class="h-14 w-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:from-amber-500 group-hover:to-amber-700 transition-all duration-300 shadow-sm z-10"
              >
                <svg
                  class="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
              </div>
              <span class="text-sm font-semibold text-gray-700 group-hover:text-amber-700 z-10"
                >Completed Training Lists</span
              >
            </router-link>

            <!-- Create Training Course -->
            <router-link
              to="/partner/htss-users/htssCustomer"
              class="relative flex flex-col items-center justify-center p-5 bg-white rounded-2xl border border-violet-100 hover:border-violet-300 shadow-md hover:shadow-lg transition-all duration-300 group overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-violet-400/5 to-violet-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              <div
                class="h-14 w-14 bg-gradient-to-br from-violet-400 to-violet-600 rounded-xl flex items-center justify-center mb-4 group-hover:from-violet-500 group-hover:to-violet-700 transition-all duration-300 shadow-sm z-10"
              >
                <svg
                  class="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
              </div>
              <span class="text-sm font-semibold text-gray-700 group-hover:text-violet-700 z-10"
                >List By Htss Customer</span
              >
            </router-link>

            <!-- Add User -->
            <router-link
              to="/partner/Customer-Support/onsite/PendingSupportRequests"
              class="relative flex flex-col items-center justify-center p-5 bg-white rounded-2xl border border-blue-100 hover:border-blue-300 shadow-md hover:shadow-lg transition-all duration-300 group overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              <div
                class="h-14 w-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:from-blue-500 group-hover:to-blue-700 transition-all duration-300 shadow-sm z-10"
              >
                <svg
                  class="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
              </div>
              <span class="text-sm font-semibold text-gray-700 group-hover:text-blue-700 z-10"
                >Pending Support Requests</span
              >
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, ref, onMounted } from 'vue'
import { useAuthStore } from '/src/stores/AuthStore'
import { useRouter, useRoute } from 'vue-router'
// import BarChart from '@/components/BarChart.vue';
// import dbimg from '/src/assets/images/scm_management.png';
// import { useLiveClock } from '@/composables/useLiveClock';
import CountUp from 'vue-countup-v3'
import { usePartnerStore } from './stores/partnerStore.js'

// const { currentTime } = useLiveClock();
const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()
const store = usePartnerStore()
const props = defineProps({
  activeTab: {
    type: String,
    default: ''
  }
})
defineEmits(['setTab'])
const softwares = [
  'Actran',
  'CAEfatigue',
  'Cradle CFD',
  'MSC Apex',
  'Dytran',
  'Marc',
  'Patran',
  'MSC Nastran',
  'MSC CoSim'
]
const dbStats = ref({
  softwares:0,
  solutions:0,
  users:0,
  customers:0,
  trainings:0
})
const fetchDbStats = async () => {
  try {
    let softwares = await api().get('softwares?per_page=1')
    let solutions = await api().get('solutions?per_page=1')
    let customers = await api().get('customers?per_page=1')
    let trainings = await api().get('training-course?per_page=1')
    let users = await api().get('end-users?per_page=1')
    dbStats.value.softwares = softwares.data.data.total
    dbStats.value.solutions = solutions.data.data.total
    dbStats.value.users = users.data.data.total
    dbStats.value.customers = customers.data.data.total
    dbStats.value.trainings = trainings.data.data.total
    console.log(dbStats.value)
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
  }
}
// Run charts when component mounts AND when tab becomes active
onMounted(async () => {
  // await nextTick()  // wait until canvas exists
  // if (props.activeTab === 'All')
  // initCharts()
  store.setCurrentSubMenu('')
})

// watch(
//   () => props.activeTab,
//   async (newTab) => {
//     if (newTab === 'All') {
//       await nextTick() // wait for DOM
//       initCharts()
//     }
//   }
// )

onMounted(() => {
  fetchDbStats()
})
</script>

<style scoped>
/* Smooth transitions for all interactive elements */
button,
[class*='hover:'],
[class*='group-hover:'] {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>
