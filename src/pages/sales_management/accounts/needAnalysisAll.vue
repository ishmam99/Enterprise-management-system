<script setup>
import { ref, onMounted, reactive, watch } from 'vue'
import { useAuthStore } from "@/stores/AuthStore";
import Breadcrumb from "@/components/Breadcrumb.vue";
import api from "@/config/api";

const authStore = useAuthStore()
authStore.sidebarOpen = true

const accounts = ref([])
const isLoading = ref(true)
const currentPage = ref(1)
const perPage = ref(10)
const totalPages = ref(1)

const toast = reactive({
  show: false,
  message: '',
  type: 'success'
})

const showToast = (message, type = 'success') => {
  toast.show = true
  toast.message = message
  toast.type = type
  setTimeout(() => (toast.show = false), 3000)
}

const fetchAccounts = async (page = 1) => {
  try {
    isLoading.value = true
    const { data } = await api().get(`/accounts?page=${page}&per_page=${perPage.value}`)

    accounts.value = data.data.map(acc => {
      let custom = {}
      try {
        custom = JSON.parse(acc.custom_fields || '{}')
      } catch (err) {
        console.error("Failed to parse custom_fields", err)
      }

      return {
        id: acc.id,
        name: acc.name || custom["Account Name"] || custom["A05 CSTMR Name"] || "N/A",
        type: custom["Account Type"] || custom["A0a CSTMR Type"] || "N/A",
        industry: custom["Industry"] || custom["M01 HTB GRP Industry Name"] || "N/A",
        phone: acc.phone || custom["Phone"] || custom["S02 Accounts Phone-"] || "N/A",
        email: acc.email || custom["S03 Accounts Email"] || "N/A",
        website: custom["Website"] || custom["H02 Customer Website"] || null,
        status: acc.status || custom["Customer Status"] || custom["H03 Account Potential Status"] || "Unknown",
        createdAt: custom["Created Time"] 
          ? new Date((custom["Created Time"] - 25569) * 86400 * 1000)
          : acc.createdAt || new Date(),
        logo: null,
        address: {
          city: custom["B02 City"] || custom["Billing City"] || "-",
          state: custom["B03 State"] || custom["Billing State"] || "-"
        }
      }
    })

    currentPage.value = data.meta?.current_page || 1
    totalPages.value = data.meta?.last_page || 1
  } catch (error) {
    console.error('Failed to fetch accounts:', error)
    showToast('Failed to fetch accounts', 'error')
  } finally {
    isLoading.value = false
  }
}

const goToPage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    fetchAccounts(page)
  }
}

// re-fetch when perPage changes
watch(perPage, () => {
  currentPage.value = 1
  fetchAccounts(1)
})

onMounted(() => fetchAccounts(currentPage.value))
</script>

<template>
  <div class="bg-gray-50 min-h-screen py-8">
    <div class="container mx-auto">
      <Breadcrumb title="Accounts" />

      <!-- Card -->
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <!-- Header controls -->
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Accounts - Need Analysis All</h2>

          <div class="flex items-center gap-3">
            <label for="perPage" class="text-sm text-gray-600">Per Page:</label>
            <select
              id="perPage"
              v-model="perPage"
              class="border rounded-lg px-8 py-1.5 text-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </div>
        </div>

        <!-- Loader -->
        <div v-if="isLoading" class="flex justify-center items-center py-16">
          <div class="animate-spin rounded-full h-10 w-10 border-4 border-yellow-500 border-t-transparent"></div>
        </div>

        <!-- Table -->
        <div v-else class="overflow-x-auto">
          <table class="w-full border-collapse table-zebra">
            <thead>
              <tr class="bg-yellow-50 text-xs uppercase text-gray-600">
                <th class="p-3 text-left border-e">Name</th>
                <th class="p-3 text-left border-e">Type</th>
                <th class="p-3 text-left border-e">Industry</th>
                <th class="p-3 text-left border-e">Phone</th>
                <th class="p-3 text-left border-e">Email</th>
                <th class="p-3 text-left border-e">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="acc in accounts"
                :key="acc.id"
                class="border-b hover:bg-gray-50 transition"
              >
                <td class="p-3 border-e font-medium text-gray-800">
                  <router-link to="/sales_management/accounts/accountsDetails" class="hover:underline">
                    {{ acc.name }}
                  </router-link>
                </td>
                <td class="p-3 border-e">{{ acc.type }}</td>
                <td class="p-3 border-e">{{ acc.industry }}</td>
                <td class="p-3 border-e">{{ acc.phone }}</td>
                <td class="p-3 border-e text-blue-600 hover:underline cursor-pointer">{{ acc.email }}</td>
                <td class="p-3 border-e">
                  <span
                    :class="[
                      'px-2 py-1 rounded-full text-xs font-semibold',
                      acc.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : acc.status === 'Inactive'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-700'
                    ]"
                  >
                    {{ acc.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="flex justify-between items-center mt-6">
          <p class="text-sm text-gray-600">
            Showing page <span class="font-semibold">{{ currentPage }}</span> of <span class="font-semibold">{{ totalPages }}</span>
          </p>

          <div class="flex items-center gap-2">
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-4 py-2 rounded-lg border text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>
<!-- 
            <button
              v-for="page in totalPages"
              :key="page"
              @click="goToPage(page)"
              class="px-3 py-1 rounded-lg text-sm font-medium"
              :class="page === currentPage ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
            >
              {{ page }}
            </button> -->

            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 rounded-lg border text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




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
