<template>
  <div class="w-4/5 mx-auto bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-100/30">
    <!-- Header Section -->
    <div class="bg-white/90 backdrop-blur-xl border-b border-white/20 shadow-sm top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
         <div class="flex-1">
          <div class="w-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6">
            <div class="flex items-center gap-5">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl shadow-lg blur-sm"></div>
                <div class="relative p-4 bg-white/20 backdrop-blur-sm rounded-2xl shadow-xl">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                </div>
              </div>
              <div class="space-y-2">
                <h1 class="text-3xl lg:text-4xl font-bold text-white">
                  {{ props.activeTab }} {{ props.activeTab !== 'All' ? '' : '' }} Overview
                </h1>
              </div>
            </div>
          </div>
        </div>
          
          <div v-if="props.activeTab !== 'All'" class="flex-shrink-0">
            <button 
              @click="$emit('setTab','All')"
              class="group relative inline-flex items-center px-8 py-4 text-base font-semibold rounded-2xl bg-white text-gray-700 shadow-lg border border-gray-200/80 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 hover:border-indigo-400 hover:scale-105"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              <div class="absolute inset-0 rounded-2xl bg-white/80 backdrop-blur-sm"></div>
              <div class="relative z-10 flex items-center">
                <svg class="w-5 h-5 mr-3 text-indigo-600 group-hover:text-purple-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                Back to Dashboard
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- All Dashboard View -->
      <div v-if="props.activeTab === 'All'" class="space-y-10">
        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Total Training Courses Card -->
          <div class="group relative bg-gradient-to-br from-white to-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-700">
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
            <div class="relative z-10 flex items-center justify-between">
              <div class="space-y-4">
                <p class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Training Courses</p>
                <p class="text-4xl font-bold text-gray-900">
                  <count-up :end-val="dbStats?.bid_forms" class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"/>
                </p>
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                  <span class="text-sm text-gray-500 font-medium">Active courses</span>
                </div>
              </div>
              <div class="p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl shadow-inner">
                <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Total Training Events Card -->
          <div class="group relative bg-gradient-to-br from-white to-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-700">
            <div class="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-teal-500 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
            <div class="relative z-10 flex items-center justify-between">
              <div class="space-y-4">
                <p class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Training Events</p>
                <p class="text-4xl font-bold text-gray-900">
                  <count-up :end-val="dbStats?.purchases" class="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent"/>
                </p>
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full shadow-lg shadow-blue-400/50"></div>
                  <span class="text-sm text-gray-500 font-medium">Scheduled</span>
                </div>
              </div>
              <div class="p-4 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl shadow-inner">
                <svg class="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Total Offered Courses Card -->
          <div class="group relative bg-gradient-to-br from-white to-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-700">
            <div class="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-amber-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
            <div class="relative z-10 flex items-center justify-between">
              <div class="space-y-4">
                <p class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Offered Courses</p>
                <p class="text-4xl font-bold text-gray-900">
                  <count-up :end-val="dbStats?.vendors_status_2" class="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent"/>
                </p>
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse shadow-lg shadow-amber-400/50"></div>
                  <span class="text-sm text-gray-500 font-medium">Available</span>
                </div>
              </div>
              <div class="p-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl shadow-inner">
                <svg class="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Active Trainers Card -->
          <div class="group relative bg-gradient-to-br from-white to-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-700">
            <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
            <div class="relative z-10 flex items-center justify-between">
              <div class="space-y-4">
                <p class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Active Trainers</p>
                <p class="text-4xl font-bold text-gray-900">
                  <count-up :end-val="dbStats?.vendors_status_3" class="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"/>
                </p>
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
                  <span class="text-sm text-gray-500 font-medium">Online</span>
                </div>
              </div>
              <div class="p-4 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl shadow-inner">
                <svg class="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-gradient-to-br from-white to-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-10">
          <div class="flex items-center justify-between mb-12">
            <div class="flex items-center gap-4">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg blur-sm opacity-75"></div>
                <div class="relative p-4 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl shadow-xl">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
              </div>
              <div class="space-y-2">
                <h3 class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Quick Actions</h3>
                <p class="text-gray-600 text-lg">Frequently used actions at your fingertips</p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <router-link
              to="/training_management/Events/create"
              class="group relative bg-gradient-to-br from-white to-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-8 hover:shadow-2xl hover:-translate-y-2 hover:border-emerald-300/80 transition-all duration-500 overflow-hidden"
            >
              <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="relative z-10 flex flex-col items-center text-center space-y-4">
                <div class="p-5 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                <span class="font-bold text-gray-800 text-lg group-hover:text-emerald-700 transition-colors">Create Training Event</span>
                <span class="text-gray-500 text-sm leading-relaxed">Schedule new training sessions and manage events</span>
              </div>
            </router-link>

            <router-link
              to="/training_management/HTSSTraining/create"
              class="group relative bg-gradient-to-br from-white to-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-8 hover:shadow-2xl hover:-translate-y-2 hover:border-amber-300/80 transition-all duration-500 overflow-hidden"
            >
              <div class="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="relative z-10 flex flex-col items-center text-center space-y-4">
                <div class="p-5 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                </div>
                <span class="font-bold text-gray-800 text-lg group-hover:text-amber-700 transition-colors">Create Training Course</span>
                <span class="text-gray-500 text-sm leading-relaxed">Add new course curriculum and learning materials</span>
              </div>
            </router-link>

            <router-link
              to="/training_management/Trainer/create"
              class="group relative bg-gradient-to-br from-white to-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-8 hover:shadow-2xl hover:-translate-y-2 hover:border-violet-300/80 transition-all duration-500 overflow-hidden"
            >
              <div class="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="relative z-10 flex flex-col items-center text-center space-y-4">
                <div class="p-5 bg-gradient-to-br from-violet-100 to-purple-100 rounded-2xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-10 h-10 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <span class="font-bold text-gray-800 text-lg group-hover:text-violet-700 transition-colors">Create Trainer</span>
                <span class="text-gray-500 text-sm leading-relaxed">Add new instructor profiles and expertise</span>
              </div>
            </router-link>

            <router-link
              to="/training_management/Offer/create"
              class="group relative bg-gradient-to-br from-white to-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-8 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-300/80 transition-all duration-500 overflow-hidden"
            >
              <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="relative z-10 flex flex-col items-center text-center space-y-4">
                <div class="p-5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </div>
                <span class="font-bold text-gray-800 text-lg group-hover:text-blue-700 transition-colors">Create Offer</span>
                <span class="text-gray-500 text-sm leading-relaxed">Create and manage training offers</span>
              </div>
            </router-link>
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
import CountUp from "vue-countup-v3";
import { useTrainingStore } from './stores/trainingStore';

const authStore = useAuthStore()
const route = useRoute();
const router = useRouter();
const store = useTrainingStore();
const props = defineProps({
  activeTab: {
    type: String,
    default: ''
  }
})
defineEmits(['setTab'])

const softwares = [
  'Actran', 'CAEfatigue', 'Cradle CFD', 'MSC Apex', 'Dytran', 
  'Marc', 'Patran', 'MSC Nastran', 'MSC CoSim'
]

// Color mapping for tabs
const tabColors = [
  { bg: 'from-blue-500 to-cyan-600', text: 'text-blue-700', dot: 'bg-blue-500', hover: 'bg-blue-500/10' },
  { bg: 'from-emerald-500 to-green-600', text: 'text-emerald-700', dot: 'bg-emerald-500', hover: 'bg-emerald-500/10' },
  { bg: 'from-purple-500 to-violet-600', text: 'text-purple-700', dot: 'bg-purple-500', hover: 'bg-purple-500/10' },
  { bg: 'from-amber-500 to-orange-600', text: 'text-amber-700', dot: 'bg-amber-500', hover: 'bg-amber-500/10' },
  { bg: 'from-rose-500 to-pink-600', text: 'text-rose-700', dot: 'bg-rose-500', hover: 'bg-rose-500/10' },
  { bg: 'from-indigo-500 to-blue-600', text: 'text-indigo-700', dot: 'bg-indigo-500', hover: 'bg-indigo-500/10' },
  { bg: 'from-teal-500 to-cyan-600', text: 'text-teal-700', dot: 'bg-teal-500', hover: 'bg-teal-500/10' },
  { bg: 'from-lime-500 to-green-600', text: 'text-lime-700', dot: 'bg-lime-500', hover: 'bg-lime-500/10' },
  { bg: 'from-fuchsia-500 to-purple-600', text: 'text-fuchsia-700', dot: 'bg-fuchsia-500', hover: 'bg-fuchsia-500/10' }
]

const getActiveTabClass = (index) => {
  const color = tabColors[index % tabColors.length];
  return `bg-gradient-to-r ${color.bg} text-white shadow-lg`;
}

const getInactiveTabClass = (index) => {
  const color = tabColors[index % tabColors.length];
  return `text-gray-600 hover:text-gray-900 bg-white/50 hover:bg-white/80`;
}

const getActiveTabBorderClass = (index) => {
  const color = tabColors[index % tabColors.length];
  return `bg-gradient-to-r ${color.bg.split(' ')[1]} ${color.bg.split(' ')[3]}`;
}

const getTabDotClass = (index) => {
  const color = tabColors[index % tabColors.length];
  return color.dot;
}

const getHoverTabClass = (index) => {
  const color = tabColors[index % tabColors.length];
  return color.hover;
}

const dbStats = ref()

// const fetchDbStats = async () => {
//   try {
//     const { data } = await api().get('supply-chain-director-stats');
//     dbStats.value = data;
//   } catch (error) {
//     console.error('Error fetching dashboard stats:', error);
//   }
// }

onMounted(async () => {
  store.setCurrentSubMenu('')
  // fetchDbStats();
})
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Enhanced smooth transitions */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Custom gradient animations */
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}

/* Custom scrollbar for tabs */
.tabs-container {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.tabs-container::-webkit-scrollbar {
  height: 6px;
}

.tabs-container::-webkit-scrollbar-track {
  background: transparent;
}

.tabs-container::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

.tabs-container::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.8);
}
</style>