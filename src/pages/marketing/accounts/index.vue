<template>
  <div class="accounts-management-dashboard overflow-hidden">
    <Breadcrumb />
    <!-- Header Section with Gradient Background -->
    <div class="mb-8 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-700 rounded-2xl p-8 text-white shadow-2xl">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-4xl font-bold mb-2 text-white">Accounts</h1>
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
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-gradient-to-br from-violet-50 to-violet-100 p-6 rounded-2xl shadow-lg border border-violet-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-violet-500 to-violet-600 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:account-balance" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-violet-700 text-sm font-semibold">Total Accounts</h3>
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

      <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl shadow-lg border border-purple-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:trending-up" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-purple-700 text-sm font-semibold">Active Accounts</h3>
        </div>
        <p class="text-3xl font-bold text-purple-800 mb-2">
          <span class="text-purple-600 font-bold flex gap-1">
            <count-up :end-val="stats?.activeAccounts || 0"></count-up>
          </span>
        </p>
        <div class="w-full bg-purple-200 rounded-full h-2">
          <div class="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style="width: 85%"></div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-fuchsia-50 to-fuchsia-100 p-6 rounded-2xl shadow-lg border border-fuchsia-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:attach-money" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-fuchsia-700 text-sm font-semibold">Total Revenue</h3>
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

      <div class="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-2xl shadow-lg border border-pink-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-pink-500 to-pink-600 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:star" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-pink-700 text-sm font-semibold">VIP Accounts</h3>
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

    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl shadow-lg border border-purple-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:trending-up" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-purple-700 text-sm font-semibold">Active Accounts</h3>
        </div>
        <p class="text-3xl font-bold text-purple-800 mb-2">
          <span class="text-purple-600 font-bold flex gap-1">
            <count-up :end-val="stats?.activeAccounts || 0"></count-up>
          </span>
        </p>
        <div class="w-full bg-purple-200 rounded-full h-2">
          <div class="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style="width: 85%"></div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-fuchsia-50 to-fuchsia-100 p-6 rounded-2xl shadow-lg border border-fuchsia-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:attach-money" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-fuchsia-700 text-sm font-semibold">Total Revenue</h3>
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

      <div class="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-2xl shadow-lg border border-pink-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-pink-500 to-pink-600 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:star" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-pink-700 text-sm font-semibold">VIP Accounts</h3>
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
    </div>
    <!-- Accounts Table Section -->
    <div class="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden">
      <!-- <div class="bg-gradient-to-r from-violet-50 to-purple-100 border-b border-violet-200 px-8 py-6">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div class="flex items-center gap-4">
            <h2 class="text-xl font-bold text-violet-800 flex items-center gap-2">
              <Icon name="material-symbols:account-balance" class="text-violet-600 w-6 h-6" />
              Account Database
            </h2>
            <div class="flex items-center gap-2">
              <select class="bg-white border border-violet-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500">
                <option>All Accounts</option>
                <option>Active Accounts</option>
                <option>Inactive Accounts</option>
                <option>VIP Accounts</option>
                <option>Enterprise Accounts</option>
              </select>
              <Icon name="material-symbols:filter-list" class="text-violet-600 w-5 h-5" />
            </div>
          </div>
          
          <div class="flex items-center gap-3">
            <button class="bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center gap-2">
              Bulk Actions
              <Icon name="material-symbols:keyboard-arrow-down" class="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-4">
          <div class="text-gray-600">
            Total Records: <span class="font-semibold text-violet-700">{{ accounts.length }}</span>
          </div>
          <div class="flex items-center gap-3">
            <select class="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
              <option>25 Per Page</option>
              <option>50 Per Page</option>
              <option>100 Per Page</option>
            </select>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <span>1 - {{ accounts.length }}</span>
              <div class="flex gap-1">
                <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Icon name="material-symbols:keyboard-arrow-left" class="w-4 h-4" />
                </button>
                <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Icon name="material-symbols:keyboard-arrow-right" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> -->

      <!-- Table Content -->
      <!-- <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gradient-to-r from-violet-50 to-purple-50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-bold text-violet-700 uppercase tracking-wider">
                <input type="checkbox" class="rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
              </th>
              <th class="px-6 py-4 text-left text-xs font-bold text-violet-700 uppercase tracking-wider">Account</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-violet-700 uppercase tracking-wider">Type</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-violet-700 uppercase tracking-wider">Industry</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-violet-700 uppercase tracking-wider">Phone</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-violet-700 uppercase tracking-wider">Email</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-violet-700 uppercase tracking-wider">Website</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-violet-700 uppercase tracking-wider">Status</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-violet-700 uppercase tracking-wider">Created</th>
              <th class="px-6 py-4 text-right text-xs font-bold text-violet-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-100">
            <tr v-if="isLoading" class="hover:bg-violet-50 transition-colors">
              <td colspan="10" class="px-6 py-8 text-center text-gray-500">
                <div class="flex items-center justify-center gap-3">
                  <Icon name="eos-icons:loading" class="w-8 h-8 text-violet-500 animate-spin" />
                  <span class="text-lg">Loading accounts...</span>
                </div>
              </td>
            </tr>
            <tr v-else-if="accounts.length === 0" class="hover:bg-violet-50 transition-colors">
              <td colspan="10" class="px-6 py-12 text-center text-gray-500">
                <div class="flex flex-col items-center gap-4">
                  <div class="relative">
                    <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                      <Icon name="material-symbols:account-balance" class="w-12 h-12 text-gray-400" />
                    </div>
                    <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                      <Icon name="material-symbols:settings" class="w-5 h-5 text-violet-600" />
                    </div>
                  </div>
                  <div class="text-center">
                    <h3 class="text-xl font-semibold text-gray-700 mb-2">No accounts found</h3>
                    <p class="text-gray-500 mb-4">Get started by creating your first account</p>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-else v-for="account in accounts" :key="account.id" class="hover:bg-gradient-to-r hover:from-violet-50 hover:to-purple-50 transition-all duration-300">
              <td class="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" class="rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <router-link to="/sales_management/accounts/accountsDetails" class="flex items-center">
                  <div class="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    <img v-if="account.logo" :src="account.logo" :alt="account.name" class="w-12 h-12 rounded-lg object-cover" />
                    <span v-else>{{ account.name?.charAt(0)?.toUpperCase() || 'A' }}</span>
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-semibold text-gray-900">{{ account.name }}</div>
                    <div class="text-sm text-gray-500">{{ account.address?.city }}, {{ account.address?.state }}</div>
                  </div>
                </router-link>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                <span :class="{
                  'px-2 py-1 text-xs rounded-full font-semibold': true,
                  'bg-violet-100 text-violet-800': account.type === 'Customer',
                  'bg-purple-100 text-purple-800': account.type === 'Partner',
                  'bg-fuchsia-100 text-fuchsia-800': account.type === 'Vendor',
                  'bg-pink-100 text-pink-800': account.type === 'Enterprise'
                }">
                  {{ account.type }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                {{ account.industry }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                {{ account.phone }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                <span class="text-blue-600 hover:text-blue-800 cursor-pointer">{{ account.email }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                <a v-if="account.website" :href="account.website" target="_blank" class="text-blue-600 hover:text-blue-800 cursor-pointer">
                  {{ account.website.replace(/^https?:\/\//, '') }}
                </a>
                <span v-else class="text-gray-400">-</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="{
                  'px-3 py-2 text-xs rounded-full font-semibold shadow-sm': true,
                  'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200': account.status === 'Active',
                  'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-200': account.status === 'Inactive',
                  'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-200': account.status === 'Pending',
                  'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200': account.status === 'Suspended'
                }">
                  {{ account.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                {{ new Date(account.createdAt).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end gap-2">
                  <button class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    <Icon name="material-symbols:visibility" class="w-4 h-4" />
                  </button>
                  <button class="bg-gradient-to-r from-violet-500 to-violet-600 text-white px-3 py-2 rounded-lg hover:from-violet-600 hover:to-violet-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    <Icon name="material-symbols:edit" class="w-4 h-4" />
                  </button>
                  <button class="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    <Icon name="material-symbols:delete" class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div> -->
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
