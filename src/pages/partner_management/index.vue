<template>
<div class="w-4/5 mx-auto ">
    <div>
    <!-- <img :src="dbimg" alt="Youth Management Dashboard Header" class="w-full h-48 object-cover rounded-b-lg mb-2 transition-all duration-500 hover:scale-[1.01]"> -->
    <div class=" px-10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 tracking-tight">{{ props.activeTab }} {{ props.activeTab != 'All' ? '' : '' }} Overview</h1>
            <p class="text-gray-500 mt-1">Welcome back, <span class="font-medium text-indigo-600 animate-pulse">{{ authStore?.user?.name }}</span></p>
          </div>
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur opacity-25"></div>

          </div>
        </div>
  </div>
  <!-- {{ dbStats.user_programs }} -->
  <div  class="px-10 py-6 mx-auto ">
    <!-- Youth Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
      <!-- Active Youth Card -->
      <div
        class="relative px-5 py-8 rounded-xl shadow-md overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-indigo-100 to-indigo-50 border border-indigo-200"
      >
        <div class="flex items-start justify-between">
          <div>
            <h3 class="text-indigo-800 text-sm font-medium">Total Partners</h3>
            <p class="text-3xl font-bold text-indigo-900 mt-1">
              <count-up :end-val="dbStats?.partners"></count-up>
            </p>
          </div>
          <div class="p-2 bg-indigo-100 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
        <!-- <p class="text-xs text-indigo-600 mt-2">12 new this month</p> -->
      </div>

      <!-- Programs Running Card -->
      <div
        class="relative px-5 py-8 rounded-xl shadow-md overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-teal-100 to-teal-50 border border-teal-200"
      >
        <div class="flex items-start justify-between">
          <div>
            <h3 class="text-teal-800 text-sm font-medium">Total Softwares</h3>
            <p class="text-3xl font-bold text-teal-900 mt-1">
              <count-up :end-val="dbStats?.softwares"></count-up>
            </p>
          </div>
          <div class="p-2 bg-teal-100 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        </div>
        <!-- <p class="text-xs text-teal-600 mt-2">3 programs starting soon</p> -->
      </div>

      <!-- Attendance Rate Card -->
      <div
        class="relative px-5 py-8 rounded-xl shadow-md overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-200"
      >
        <div class="flex items-start justify-between">
          <div>
            <h3 class="text-amber-800 text-sm font-medium">Total Solutions</h3>
            <p class="text-3xl font-bold text-amber-900 mt-1">
              <count-up :end-val="dbStats?.solutions"></count-up>
            </p>
          </div>
          <div class="p-2 bg-amber-100 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
        <!-- <p class="text-xs text-amber-600 mt-2">5% increase from last month</p> -->
      </div>

       <!-- Attendance Rate Card -->
      <div
        class="relative px-5 py-8 rounded-xl shadow-md overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-cyan-100 to-cyan-50 border border-cyan-200"
      >
        <div class="flex items-start justify-between">
          <div>
            <h3 class="text-cyan-800 text-sm font-medium">Total Customers</h3>
            <p class="text-3xl font-bold text-cyan-900 mt-1">
              <count-up :end-val="dbStats?.customers"></count-up>
            </p>
          </div>
          <div class="p-2 bg-cyan-100 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
        <!-- <p class="text-xs text-cyan-600 mt-2">5% increase from last month</p> -->
      </div>
    </div>



    <!-- <BarChart class="mt-8" /> -->
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
import { usePMStore } from './stores/pmStore';

// const { currentTime } = useLiveClock();
const authStore = useAuthStore()
const route = useRoute();
const router = useRouter();
const store = usePMStore();
const props = defineProps({
  activeTab: {
    type: String,
    default: ''
  }
})
defineEmits(['setTab'])
const softwares = [
  'Actran',
'CAEfatigue','Cradle CFD','MSC Apex','Dytran','Marc','Patran','MSC Nastran','MSC CoSim']
const dbStats = ref({
  partners : 1,
  softwares: 13,
  solutions : 16,
  industries : 12,
  customers: 212
})
const fetchDbStats = async () => {
  try {
    const { data } = await api().get('partner-management-stats');
    dbStats.value = data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
  }
}



onMounted(() => {
  console.log('hello')
  // fetchDbStats();
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
