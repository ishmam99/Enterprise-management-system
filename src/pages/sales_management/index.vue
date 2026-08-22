<template>
  <div class="sales-management-dashboard p-6 mt-2">
    <!-- Header Section with Gradient Background -->
    <div class="mb-8 bg-[#acdbe163] rounded-2xl p-8 text-slate-700 shadow-2xl">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-4xl font-bold mb-2 ">Vermont Composite Sales Management System Dashboard</h1>
          <p class="text-blue-600 text-lg">Track your sales performance and manage leads effectively</p>
        </div>
        <div class="text-right">
          <p class="text-3xl font-bold text-slate-700 capitalize">{{ authStore?.user?.name ? authStore?.user?.name : 'Sales' }}, 
            {{ authStore?.role == 'manager-cs' ? 'Customer Success Manager' : authStore?.role == 'executive-cs' ? 'Customer Success Executive' : authStore?.role }}</p>
          <p class="text-blue-600">Welcome back!</p>
        </div>
      </div>
    </div>
    
    <!-- Toast Notification -->
    <div v-if="toast.show"
      :class="`fixed top-4 right-4 z-50 px-6 py-3 rounded-xl shadow-2xl text-white transform transition-all duration-300 ${
        toast.type === 'success'
          ? 'bg-gradient-to-r from-green-500 to-emerald-600'
          : 'bg-gradient-to-r from-red-500 to-rose-600'
      }`">
      {{ toast?.message }}
    </div>
    
    <!-- Stats Cards with Enhanced Design -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:inventory" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-blue-700 text-sm font-semibold">Total Leads</h3>
        </div>
        <p class="text-3xl font-bold text-blue-800 mb-2">
          <span class="text-blue-600 font-bold flex gap-1">
            <count-up :end-val="statsData.Leads"></count-up> +
          </span>
        </p>
        <div class="w-full bg-blue-200 rounded-full h-2">
          <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style="width: 75%"></div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-sky-50 to-sky-100 p-6 rounded-2xl shadow-lg border border-sky-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-sky-500 to-sky-600 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:local-shipping" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-sky-700 text-sm font-semibold">Accounts</h3>
        </div>
        <p class="text-3xl font-bold text-sky-800 mb-2">
          <span class="text-sky-600 font-bold flex gap-1">
            <count-up :end-val="statsData.Accounts"></count-up> +
          </span>
        </p>
        <div class="w-full bg-sky-200 rounded-full h-2">
          <div class="bg-gradient-to-r from-sky-500 to-sky-600 h-2 rounded-full" style="width: 85%"></div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-blue-50/80 to-blue-100/80 p-6 rounded-2xl shadow-lg border border-blue-200/80 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-blue-500/80 to-blue-600/80 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:store" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-blue-700/80 text-sm font-semibold">Deals</h3>
        </div>
        <p class="text-3xl font-bold text-blue-800/80 mb-2">
          <span class="text-blue-600/80 font-bold flex gap-1">
            <count-up :end-val="statsData.Deals"></count-up> +
          </span>
        </p>
        <div class="w-full bg-blue-200/80 rounded-full h-2">
          <div class="bg-gradient-to-r from-blue-500/80 to-blue-600/80 h-2 rounded-full" style="width: 65%"></div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-sky-50 to-sky-100 p-6 rounded-2xl shadow-lg border border-sky-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-sky-500 to-sky-600 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:menu" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-sky-700 text-sm font-semibold">Contacts</h3>
        </div>
        <p class="text-3xl font-bold text-sky-800 mb-2">
          <span class="text-sky-600 font-bold flex gap-1">
            <count-up :end-val="statsData.Contacts"></count-up> +
          </span>
        </p>
        <div class="w-full bg-sky-200 rounded-full h-2">
          <div class="bg-gradient-to-r from-sky-500 to-sky-600 h-2 rounded-full" style="width: 90%"></div>
        </div>
      </div>

        <div class="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-2xl shadow-lg border border-cyan-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-cyan-500 to-cyan-600 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:menu" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-cyan-700 text-sm font-semibold">Proposals</h3>
        </div>
        <p class="text-3xl font-bold text-cyan-800 mb-2">
          <span class="text-cyan-600 font-bold flex gap-1">
            <count-up :end-val="statsData.Proposals"></count-up> +
          </span>
        </p>
        <div class="w-full bg-cyan-200 rounded-full h-2">
          <div class="bg-gradient-to-r from-cyan-500 to-cyan-600 h-2 rounded-full" style="width: 90%"></div>
        </div>
      </div>
    </div>


    <!-- Quick Actions with Enhanced Cards -->
    <div class="grid grid-cols-1 grid-cols-4 gap-6">
      <router-link
        to="/sales_management/leads"
        class="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg border border-blue-200 hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2 hover:scale-105"
      >
        <div class="flex items-center gap-4">
          <div class="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
            <Icon name="material-symbols:add" class="text-white w-8 h-8" />
          </div>
          <div>
            <h3 class="font-bold text-gray-900 text-lg mb-1">Manage Leads</h3>
            <p class="text-gray-600">View/manage Leads</p>
          </div>
        </div>
      </router-link>

      
      <router-link
        to="/sales_management/accounts"
        class="bg-gradient-to-br from-sky-50 to-sky-100 p-8 rounded-2xl shadow-lg border border-sky-200 hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2 hover:scale-105"
      >
        <div class="flex items-center gap-4">
          <div class="bg-gradient-to-br from-sky-500 to-sky-600 p-4 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
            <Icon name="material-symbols:category" class="text-white w-8 h-8" />
          </div>
          <div>
            <h3 class="font-bold text-gray-900 text-lg mb-1">Product Accounts</h3>
            <p class="text-gray-600">View/manage accounts</p>
          </div>
        </div>
      </router-link>

      <router-link
        to="/sales_management/contact"
        class="bg-gradient-to-br from-sky-50 to-sky-100 p-8 rounded-2xl shadow-lg border border-sky-200 hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2 hover:scale-105"
      >
        <div class="flex items-center gap-4">
          <div class="bg-gradient-to-br from-sky-500 to-sky-600 p-4 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
            <Icon name="material-symbols:inventory-2" class="text-white w-8 h-8" />
          </div>
          <div>
            <h3 class="font-bold text-gray-900 text-lg mb-1">Manage Contacts</h3>
            <p class="text-gray-600">View/manage contacts</p>
          </div>
        </div>
      </router-link>

            <router-link
        to="/sales_management/deals"
        class="bg-gradient-to-br from-cyan-50 to-cyan-100 p-8 rounded-2xl shadow-lg border border-cyan-200 hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2 hover:scale-105"
      >
        <div class="flex items-center gap-4">
          <div class="bg-gradient-to-br from-cyan-500 to-cyan-600 p-4 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
            <Icon name="material-symbols:inventory-2" class="text-white w-8 h-8" />
          </div>
          <div>
            <h3 class="font-bold text-gray-900 text-lg mb-1">Manage Deals</h3>
            <p class="text-gray-600">View/manage deals</p>
          </div>
        </div>
      </router-link>

    </div>
        <!-- Quick Actions with Enhanced Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">



      <router-link
        to="/sales_management/proposal"
        class="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg border border-blue-200 hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2 hover:scale-105"
      >
        <div class="flex items-center gap-4">
          <div class="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
            <Icon name="material-symbols:add" class="text-white w-8 h-8" />
          </div>
          <div>
            <h3 class="font-bold text-gray-900 text-lg mb-1">Manage Proposals</h3>
            <p class="text-gray-600">View/manage Proposals</p>
          </div>
        </div>
      </router-link>

           <router-link
        to="/sales_management/contracts"
        class="bg-gradient-to-br from-sky-50 to-sky-100 p-8 rounded-2xl shadow-lg border border-sky-200 hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2 hover:scale-105"
      >
        <div class="flex items-center gap-4">
          <div class="bg-gradient-to-br from-sky-500 to-sky-600 p-4 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
            <Icon name="material-symbols:inventory-2" class="text-white w-8 h-8" />
          </div>
          <div>
            <h3 class="font-bold text-gray-900 text-lg mb-1">Manage Contracts</h3>
            <p class="text-gray-600">View/manage contracts</p>
          </div>
        </div>
      </router-link>

      <router-link
        to="/sales_management/proposal"
        class="bg-gradient-to-br from-cyan-50 to-cyan-100 p-8 rounded-2xl shadow-lg border border-cyan-200 hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2 hover:scale-105"
      >
        <div class="flex items-center gap-4">
          <div class="bg-gradient-to-br from-cyan-500 to-cyan-600 p-4 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
            <Icon name="material-symbols:add" class="text-white w-8 h-8" />
          </div>
          <div>
            <h3 class="font-bold text-gray-900 text-lg mb-1">Manage Projects</h3>
            <p class="text-gray-600">View/manage projects</p>
          </div>
        </div>
      </router-link>

    </div>

            <!-- Quick Actions with Enhanced Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">

 

    </div>
  </div>
</template>

<script setup>
import CountUp from "vue-countup-v3";
import { ref, onMounted, computed, reactive } from 'vue'
import api from "@/config/api";
import { useAuthStore } from "@/stores/AuthStore";


const authStore = useAuthStore()
authStore.toggleSidebar(false)
authStore.sidebarOpen = true;
const statsData = ref({
  Leads: 0,
  Accounts: 0,
  Contacts: 0,
  Deals: 0,
  Notes: 0,
  Proposals: 0,
  "Next Step Summary": 0
})

const fetchFields = async () => {
  const { data } = await api().get('/crm/stats')

  data.forEach(item => {
    statsData.value[item.module_name] = Number(item.total_records)
  })
}



const isLoading = ref(false)
const toast = reactive({
  show: false,
  message: '',
  type: 'success'
})



// Simulate API loading
onMounted(() => {
  isLoading.value = true
  fetchFields()
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})
</script>
   <style scoped>
   /* Enhanced Sales Management Dashboard Styles */
.sales-management-dashboard {
  @apply p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen;
}

/* Custom animations and effects */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Apply animations to elements */
.sales-management-dashboard > * {
  animation: fadeInUp 0.6s ease-out;
}

.sales-management-dashboard > *:nth-child(2) {
  animation-delay: 0.1s;
}

.sales-management-dashboard > *:nth-child(3) {
  animation-delay: 0.2s;
}

.sales-management-dashboard > *:nth-child(4) {
  animation-delay: 0.3s;
}

/* Enhanced hover effects */
.hover\:shadow-2xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Custom scrollbar for table */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to right, #2563eb, #7c3aed);
}

/* Enhanced focus states */
button:focus, a:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Custom gradient text effect */
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Enhanced card shadows */
.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Responsive design improvements */
@media (max-width: 768px) {
  .sales-management-dashboard {
    @apply p-4;
  }

  .bg-gradient-to-r.from-blue-600.via-purple-600.to-indigo-700 {
    @apply p-6;
  }

  .bg-gradient-to-r.from-blue-600.via-purple-600.to-indigo-700 h1 {
    @apply text-2xl;
  }

  .bg-gradient-to-r.from-blue-600.via-purple-600.to-indigo-700 p {
    @apply text-base;
  }
}

/* Loading animation enhancement */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Status badge enhancements */
.status-active {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.4);
}

.status-inactive {
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(107, 114, 128, 0.4);
}
   </style>
