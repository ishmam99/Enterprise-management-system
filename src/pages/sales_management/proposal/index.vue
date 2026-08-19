<template>
  <div class="accounts-management-dashboard overflow-hidden">
    <Breadcrumb />
    <!-- Header Section with Gradient Background -->
    <div class="mb-8 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-700 rounded-2xl p-8 text-white shadow-2xl">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-4xl font-bold mb-2 text-white">Proposal</h1>
        </div>
        <div class="text-right">
          <p class="text-3xl font-bold text-white">{{ authStore?.user?.name ? authStore?.user?.name : 'Sales' }}, {{ authStore?.role ? authStore?.role : 'Director' }}</p>
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
      {{ toast.message }}
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div class="bg-gradient-to-br from-violet-50 to-violet-100 p-6 rounded-2xl shadow-lg border border-violet-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-violet-500 to-violet-600 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:account-balance" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-violet-700 text-sm font-semibold">Total Qualification</h3>
        </div>
        <p class="text-3xl font-bold text-violet-800 mb-2">
          <span class="text-violet-600 font-bold flex gap-1">
            <count-up :end-val="stats?.totalAccounts || 0"></count-up>
          </span>
        </p>
        <div class="w-full bg-violet-200 rounded-full h-2">
          <div class="bg-gradient-to-r from-violet-500 to-violet-600 h-2 rounded-full" style="width: 75%"></div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-2xl shadow-lg border border-emerald-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:trending-up" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-emerald-700 text-sm font-semibold">Total Need Analysis</h3>
        </div>
        <p class="text-3xl font-bold text-emerald-800 mb-2">
          <span class="text-emerald-600 font-bold flex gap-1">
            <count-up :end-val="stats?.activeAccounts || 0"></count-up>
          </span>
        </p>
        <div class="w-full bg-emerald-200 rounded-full h-2">
          <div class="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full" style="width: 85%"></div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-fuchsia-50 to-fuchsia-100 p-6 rounded-2xl shadow-lg border border-fuchsia-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:attach-money" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-fuchsia-700 text-sm font-semibold">Total Value Proposition</h3>
        </div>
        <p class="text-3xl font-bold text-fuchsia-800 mb-2">
          <span class="text-fuchsia-600 font-bold flex gap-1">
            $<count-up :end-val="stats?.totalRevenue || 0"></count-up>
          </span>
        </p>
        <div class="w-full bg-fuchsia-200 rounded-full h-2">
          <div class="bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 h-2 rounded-full" style="width: 65%"></div>
        </div>
      </div>

     
    </div>

     <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div class="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-2xl shadow-lg border border-teal-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-teal-500 to-teal-600 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:star" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-teal-700 text-sm font-semibold">Total Identify Decision Makers</h3>
        </div>
        <p class="text-3xl font-bold text-teal-800 mb-2">
          <span class="text-teal-600 font-bold flex gap-1">
            <count-up :end-val="stats?.vipAccounts || 0"></count-up>
          </span>
        </p>
        <div class="w-full bg-teal-200 rounded-full h-2">
          <div class="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full" style="width: 90%"></div>
        </div>
      </div>
     <div class="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-2xl shadow-lg border border-pink-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-pink-500 to-pink-600 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:star" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-pink-700 text-sm font-semibold">Total Negotiation/Review </h3>
        </div>
        <p class="text-3xl font-bold text-pink-800 mb-2">
          <span class="text-pink-600 font-bold flex gap-1">
            <count-up :end-val="stats?.vipAccounts || 0"></count-up>
          </span>
        </p>
        <div class="w-full bg-pink-200 rounded-full h-2">
          <div class="bg-gradient-to-r from-pink-500 to-pink-600 h-2 rounded-full" style="width: 90%"></div>
        </div>
      </div>
     <div class="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-2xl shadow-lg border border-cyan-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-cyan-500 to-cyan-600 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:star" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-cyan-700 text-sm font-semibold">Total Closed </h3>
        </div>
        <p class="text-3xl font-bold text-cyan-800 mb-2">
          <span class="text-cyan-600 font-bold flex gap-1">
            <count-up :end-val="stats?.vipAccounts || 0"></count-up>
          </span>
        </p>
        <div class="w-full bg-cyan-200 rounded-full h-2">
          <div class="bg-gradient-to-r from-cyan-500 to-cyan-600 h-2 rounded-full" style="width: 90%"></div>
        </div>
      </div>
     </div>


    <!-- Quick Actions Section -->
    <!-- <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <NuxtLink to="/admin/sales_management/accounts/add" class="bg-gradient-to-br from-violet-50 to-violet-100 p-6 rounded-2xl shadow-lg border border-violet-200 hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2 hover:scale-105">
        <div class="flex items-center gap-4">
          <div class="bg-gradient-to-br from-violet-500 to-violet-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Icon name="material-symbols:add-circle" class="text-white w-8 h-8" />
          </div>
          <div>
            <h3 class="text-lg font-bold text-violet-800 mb-2">Create New Account</h3>
            <p class="text-violet-600 text-sm">Add new customer or partner accounts</p>
          </div>
        </div>
      </NuxtLink>

      <NuxtLink to="/admin/sales_management/accounts/import" class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl shadow-lg border border-purple-200 hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2 hover:scale-105">
        <div class="flex items-center gap-4">
          <div class="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Icon name="material-symbols:upload-file" class="text-white w-8 h-8" />
          </div>
          <div>
            <h3 class="text-lg font-bold text-purple-800 mb-2">Import Accounts</h3>
            <p class="text-purple-600 text-sm">Bulk import accounts from CSV/Excel</p>
          </div>
        </div>
      </NuxtLink>

      <NuxtLink to="/admin/sales_management/accounts/analytics" class="bg-gradient-to-br from-fuchsia-50 to-fuchsia-100 p-6 rounded-2xl shadow-lg border border-fuchsia-200 hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2 hover:scale-105">
        <div class="flex items-center gap-4">
          <div class="bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Icon name="material-symbols:analytics" class="text-white w-8 h-8" />
          </div>
          <div>
            <h3 class="text-lg font-bold text-fuchsia-800 mb-2">Account Analytics</h3>
            <p class="text-fuchsia-600 text-sm">View account performance metrics</p>
          </div>
        </div>
      </NuxtLink>
    </div> -->
  </div>
</template>

<script setup>
import CountUp from "vue-countup-v3";
import { ref, onMounted, reactive } from 'vue'
import { useAuthStore } from "@/stores/AuthStore";
import Breadcrumb from "@/components/Breadcrumb.vue";

const authStore = useAuthStore()
authStore.sidebarOpen = true

const accounts = ref([])
const stats = ref({})
const isLoading = ref(true)
const toast = reactive({
  show: false,
  message: '',
  type: 'success'
})

const showToast = (message, type = 'success') => {
  toast.show = true
  toast.message = message
  toast.type = type
  setTimeout(() => toast.show = false, 3000)
}

const fetchAccounts = async () => {
  try {
    isLoading.value = true
    // Mock data for demonstration - replace with actual API call
    const mockAccounts = [
      {
        id: 1,
        name: 'Tech Solutions Inc',
        type: 'Customer',
        industry: 'Technology',
        phone: '+1 (555) 123-4567',
        email: 'contact@techsolutions.com',
        website: 'https://techsolutions.com',
        status: 'Active',
        createdAt: '2024-01-15',
        logo: null,
        address: {
          city: 'San Francisco',
          state: 'CA'
        }
      },
      {
        id: 2,
        name: 'Global Partners Ltd',
        type: 'Partner',
        industry: 'Consulting',
        phone: '+1 (555) 987-6543',
        email: 'info@globalpartners.com',
        website: 'https://globalpartners.com',
        status: 'Active',
        createdAt: '2024-01-10',
        logo: null,
        address: {
          city: 'New York',
          state: 'NY'
        }
      },
      {
        id: 3,
        name: 'Enterprise Solutions',
        type: 'Enterprise',
        industry: 'Software',
        phone: '+1 (555) 456-7890',
        email: 'sales@enterprisesolutions.com',
        website: 'https://enterprisesolutions.com',
        status: 'Active',
        createdAt: '2024-01-05',
        logo: null,
        address: {
          city: 'Austin',
          state: 'TX'
        }
      }
    ]
    
    accounts.value = mockAccounts
    stats.value = {
      totalAccounts: mockAccounts.length,
      activeAccounts: mockAccounts.filter(a => a.status === 'Active').length,
      totalRevenue: 1250000,
      vipAccounts: mockAccounts.filter(a => a.type === 'Enterprise').length
    }
  } catch (error) {
    console.error('Failed to fetch accounts:', error)
    showToast('Failed to fetch accounts', 'error')
  } finally {
    isLoading.value = false
  }
}

// Fetch when component mounts
onMounted(async () => {
  await fetchAccounts()
})
</script>

<style scoped>
/* Enhanced Accounts Management Dashboard Styles */
.accounts-management-dashboard {
  @apply p-6 bg-gradient-to-br from-gray-50 to-violet-50 min-h-screen;
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
.accounts-management-dashboard > * {
  animation: fadeInUp 0.6s ease-out;
}

.accounts-management-dashboard > *:nth-child(2) {
  animation-delay: 0.1s;
}

.accounts-management-dashboard > *:nth-child(3) {
  animation-delay: 0.2s;
}

.accounts-management-dashboard > *:nth-child(4) {
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
  background: linear-gradient(to right, #8b5cf6, #a855f7);
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to right, #7c3aed, #9333ea);
}

/* Enhanced focus states */
button:focus, a:focus, input:focus, select:focus {
  outline: 2px solid #8b5cf6;
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
  background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
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
  .accounts-management-dashboard {
    @apply p-4;
  }
  
  .bg-gradient-to-r.from-violet-600.via-purple-600.to-fuchsia-700 {
    @apply p-6;
  }
  
  .bg-gradient-to-r.from-violet-600.via-purple-600.to-fuchsia-700 h1 {
    @apply text-2xl;
  }
  
  .bg-gradient-to-r.from-violet-600.via-purple-600.to-fuchsia-700 p {
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
  background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.4);
}

.status-inactive {
  background: linear-gradient(135deg, #ef4444 0%, #f43f5e 100%);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(239, 68, 68, 0.4);
}

.status-pending {
  background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(245, 158, 11, 0.4);
}

.status-suspended {
  background: linear-gradient(135deg, #6b7280 0%, #475569 100%);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(107, 114, 128, 0.4);
}
</style>
