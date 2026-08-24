<template>
  <div class="leads-management-dashboard overflow-hidden p">
    <Breadcrumb />
    <!-- Header Section with Gradient Background -->
    <div class="mb-8 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 rounded-2xl p-8 text-white shadow-2xl">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-4xl font-bold mb-2 text-white">Leads</h1>
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
      <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-2xl shadow-lg border border-emerald-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:person-add" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-emerald-700 text-sm font-semibold">Total Leads</h3>
        </div>
        <p class="text-3xl font-bold text-emerald-800 mb-2">
          <span class="text-emerald-600 font-bold flex gap-1">
            <count-up :end-val="leads.length "></count-up>
          </span>
        </p>
        <div class="w-full bg-emerald-200 rounded-full h-2">
          <div class="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full" style="width: 75%"></div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:trending-up" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-blue-700 text-sm font-semibold">Active Leads</h3>
        </div>
        <p class="text-3xl font-bold text-blue-800 mb-2">
          <span class="text-blue-600 font-bold flex gap-1">
            <count-up :end-val="stats?.activeLeads || 8"></count-up>
          </span>
        </p>
        <div class="w-full bg-blue-200 rounded-full h-2">
          <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style="width: 85%"></div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl shadow-lg border border-purple-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:phone" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-purple-700 text-sm font-semibold">Contacted</h3>
        </div>
        <p class="text-3xl font-bold text-purple-800 mb-2">
          <span class="text-purple-600 font-bold flex gap-1">
            <count-up :end-val="stats?.contactedLeads || 6"></count-up>
          </span>
        </p>
        <div class="w-full bg-purple-200 rounded-full h-2">
          <div class="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style="width: 65%"></div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:conversion-path" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-orange-700 text-sm font-semibold">Converted</h3>
        </div>
        <p class="text-3xl font-bold text-orange-800 mb-2">
          <span class="text-orange-600 font-bold flex gap-1">
            <count-up :end-val="stats?.convertedLeads || 3"></count-up>
          </span>
        </p>
        <div class="w-full bg-orange-200 rounded-full h-2">
          <div class="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full" style="width: 90%"></div>
        </div>
      </div>
    </div>

    <!-- Leads Table Section -->
    <div class="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden">
      <!-- Table Header with Actions -->
      <div class="bg-gradient-to-r from-emerald-50 to-teal-100 border-b border-emerald-200 px-8 py-6">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div class="flex items-center gap-4">
            <h2 class="text-xl font-bold text-emerald-800 flex items-center gap-2">
              <Icon name="material-symbols:person-search" class="text-emerald-600 w-6 h-6" />
              Sales Leads
            </h2>
            <!-- <div class="flex items-center gap-2">
              <select class="bg-white border border-emerald-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option>ELH-ALL</option>
                <option>ELH-Active</option>
                <option>ELH-Contacted</option>
                <option>ELH-Converted</option>
              </select>
              <Icon name="material-symbols:filter-list" class="text-emerald-600 w-5 h-5" />
            </div> -->
          </div>

          <div class="flex items-center gap-3">
            <!-- <button class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2">
              <Icon name="material-symbols:add" class="w-5 h-5" />
              + Create New Lead
            </button> -->
              <!-- <button class="bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center gap-2">
                Bulk Actions
                <Icon name="material-symbols:keyboard-arrow-down" class="w-5 h-5" />
              </button> -->
          </div>
        </div>

        <!-- Records Info and Pagination -->
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-4">
          <div class="text-gray-600">
            Total Records: <span class="font-semibold text-emerald-700">{{ leads.length }}</span>
          </div>
          <div class="flex items-center gap-3">
             <div class="flex items-center gap-3">
              <label for="perPage" class="text-sm text-gray-600">Per Page:</label>
              <select
                id="perPage"
                v-model="perPage"
                class="border rounded-lg px-8 py-1.5 text-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <!-- <span>1-{{ leads.length }}</span> -->
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
      </div>

      <!-- Table Content -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gradient-to-r from-emerald-50 to-teal-50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-bold border-e text-emerald-700 uppercase tracking-wider">
                #
              </th>
              <th v-for="field in fields" :key="field.id" class="px-6 text-nowrap py-4 border-e text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">{{ field.label }}</th>
           
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-100">
            <tr v-if="isLoading" class="hover:bg-emerald-50 transition-colors">
              <td colspan="16" class="px-6 py-8 text-center text-gray-500">
                <div class="flex items-center justify-center gap-3">
                  <Icon name="eos-icons:loading" class="w-8 h-8 text-emerald-500 animate-spin" />
                  <span class="loading loading-spinner"></span>
                  <span class="text-lg">Loading leads...</span>
                </div>
              </td>
            </tr>
            <tr v-else-if="leads.length === 0" class="hover:bg-emerald-50 transition-colors">
              <td colspan="16" class="px-6 py-12 text-center text-gray-500">
                <div class="flex flex-col items-center gap-4">
                  <div class="relative">
                    <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                      <Icon name="material-symbols:person" class="w-12 h-12 text-gray-400" />
                    </div>
                    <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Icon name="material-symbols:settings" class="w-5 h-5 text-emerald-600" />
                    </div>
                  </div>
                  <div class="text-center">
                    <h3 class="text-xl font-semibold text-gray-700 mb-2">No leads found</h3>
                    <p class="text-gray-500 mb-4">Get started by creating your first lead</p>
                    <router-link to="/marketing/leads/createLeads" class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 mx-auto">
                      <Icon name="material-symbols:add" class="w-5 h-5" />
                      + Create Lead
                    </router-link>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-else v-for="(lead, index) in leads" :key="lead.id" class="hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300">
              <td class="px-6 py-4 whitespace-nowrap">
                {{ index+1 }}
              </td>
               <td v-for="field in fields" :key="field.id" class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                <router-link
                    :to="{
                      name: 'marketing-leads-leadsDetails-id',
                      params: { id: lead.id },
                      
                    }"
                    class="hover:underline"
                  >
                    {{ lead.values.find((e) => e.field_id == field.id)?.value }}
                  </router-link>
              </td>

            </tr>
          </tbody>
        </table>
        
      </div >
              <div class="flex justify-between items-center mt-6 p-2">
                    <p class="text-sm text-gray-600">
            Showing page <span class="font-semibold">{{ currentPage }}</span> of <span class="font-semibold">{{ totalPages }}  ||  Total Leads {{ totalAccounts }}</span>
          </p>

          <div class="flex items-center gap-2">
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-4 py-2 rounded-lg border text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>

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
</template>

<script setup>
import CountUp from "vue-countup-v3";
import { ref, onMounted, reactive, watch } from 'vue'
import { useAuthStore } from "@/stores/AuthStore";
import Breadcrumb from "@/components/Breadcrumb.vue";
import api from "@/config/api";
// import { useApi } from '@/composables/useApi'

const authStore = useAuthStore()
authStore.sidebarOpen = true;

const currentPage = ref(1)
const perPage = ref(10)
const totalPages = ref(1)
const fields = ref([])
const leads = ref([])
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
const fetchFields = async()=>{
  const {data} = await api().get('/crm/modules/1/fields')
  fields.value = data.data
}
const fetchLeads = async (page=1) => {
  try {
    isLoading.value = true

    
        const { data } = await api().get(`/crm/modules/1/records?page=${page}&per_page=${perPage.value}`)
        if(data)
      {
         leads.value = data.data
      }
      

  } catch (error) {
    console.error('Failed to fetch leads:', error)
    showToast('Failed to fetch leads', 'error')
  } finally {
    isLoading.value = false
  }
}
const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return

  fetchLeads(page)
}


watch(perPage, () => {
  fetchLeads(1)
})

// Fetch when component mounts
onMounted(async () => {
  await fetchFields()
  await fetchLeads()
})
</script>

<style scoped>
/* Enhanced Leads Management Dashboard Styles */
.leads-management-dashboard {
  @apply p-6 bg-gradient-to-br from-gray-50 to-emerald-50 min-h-screen;
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
.leads-management-dashboard > * {
  animation: fadeInUp 0.6s ease-out;
}

.leads-management-dashboard > *:nth-child(2) {
  animation-delay: 0.1s;
}

.leads-management-dashboard > *:nth-child(3) {
  animation-delay: 0.2s;
}

.leads-management-dashboard > *:nth-child(4) {
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
  background: linear-gradient(to right, #10b981, #14b8a6);
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to right, #059669, #0d9488);
}

/* Enhanced focus states */
button:focus, a:focus, input:focus, select:focus {
  outline: 2px solid #10b981;
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
  background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
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
  .leads-management-dashboard {
    @apply p-4;
  }

  .bg-gradient-to-r.from-emerald-600.via-teal-600.to-cyan-700 {
    @apply p-6;
  }

  .bg-gradient-to-r.from-emerald-600.via-teal-600.to-cyan-700 h1 {
    @apply text-2xl;
  }

  .bg-gradient-to-r.from-emerald-600.via-teal-600.to-cyan-700 p {
    @apply text-base;
  }
}

.table-zebra tr:nth-child(even) {
  background-color: #f9fafb8e;
}
/* ✨ Alternate row background (striped look) */
tbody tr:nth-child(odd) td {
  background-color: #f8fcff7e; /* very light cyan */
}

tbody tr:nth-child(even) td {
  background-color: #e5f6ff; /* soft blue tint */
  border: 0.5px solid #909aa146;
}

/* Optional hover glow */
tbody tr:hover td {
  background-color: #bdeeff;
  transition: background-color 0.25s ease;
  border: 0.5px solid #909aa146;
}
tbody tr td {

  border: 0.5px solid #909aa146;
}
tbody tr th {

  border: 0.5px solid #909aa146;
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

.status-contacted {
  background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.4);
}

.status-qualified {
  background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(139, 92, 246, 0.4);
}

.status-converted {
  background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(245, 158, 11, 0.4);
}
</style>
