<script setup>
import { ref, onMounted, reactive, watch } from 'vue'
import { useAuthStore } from "@/stores/AuthStore";
import Breadcrumb from "@/components/Breadcrumb.vue";
import api from "@/config/api";

const authStore = useAuthStore()
authStore.sidebarOpen = true

const currentPage = ref(1)
const perPage = ref(10)
const totalPages = ref(1)
const totalAccounts = ref(0)
const fields = ref([])
const leads = ref([])
// const stats = ref({})
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
  const {data} = await api().get('/crm/modules/3/fields')
  fields.value = data.data
}
const fetchLeads = async (page=1) => {
  try {
    isLoading.value = true


        const { data } = await api().get(`/crm/modules/3/records?page=${page}&per_page=${perPage.value}`)
        leads.value = data.data
        currentPage.value = data.current_page
         totalPages.value = data.last_page
         totalAccounts.value = data.total
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

<template>
  <div class="bg-gray-50 min-h-screen py-8">
    <div class="container mx-auto">
      <Breadcrumb title="Accounts" />

      <!-- Card -->
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <!-- Header controls -->
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Contacts</h2>

          <div class="flex items-center gap-3">
            <label for="perPage" class="text-sm text-gray-600">Per Page:</label>
            <select
              id="perPage"
              v-model="perPage"
              class="border rounded-lg px-8 py-1.5 text-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            >
              <!-- <option value="5">5</option> -->
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>

        <!-- Loader -->
        <div v-if="isLoading" class="flex justify-center items-center py-16">
          <div class="animate-spin rounded-full h-10 w-10 border-4 border-yellow-500 border-t-transparent"></div>
        </div>

        <!-- Table -->
              <!-- Table Content -->
      <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 table-zebra">
            <thead class="bg-gradient-to-r from-emerald-50 to-teal-50">
              <tr>
                <th
                  class="px-6 py-4 border-x text-left text-xs font-bold text-emerald-700 uppercase tracking-wider"
                >
                 #
                </th>
                <th
                  v-for="field in fields"
                  :key="field.id"
                  class="px-6 py-4 text-nowrap text-left text-xs border-e font-bold text-emerald-700 uppercase tracking-wider"
                >
                  {{ field.label }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-100">
              <tr v-if="isLoading" class="hover:bg-emerald-50 transition-colors">
                <td colspan="16" class="px-6 py-8 text-center text-gray-500">
                  <div class="flex items-center justify-center gap-3">
                    <Icon name="eos-icons:loading" class="w-8 h-8 text-emerald-500 animate-spin" />
                    <span class="text-lg">Loading leads...</span>
                  </div>
                </td>
              </tr>
              <tr v-else-if="leads.length === 0" class="hover:bg-emerald-50 transition-colors">
                <td colspan="16" class="px-6 py-12 text-center text-gray-500">
                  <div class="flex flex-col items-center gap-4">
                    <div class="relative">
                      <div
                        class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center"
                      >
                        <Icon name="material-symbols:person" class="w-12 h-12 text-gray-400" />
                      </div>
                      <div
                        class="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center"
                      >
                        <Icon name="material-symbols:settings" class="w-5 h-5 text-emerald-600" />
                      </div>
                    </div>
                    <div class="text-center">
                      <h3 class="text-xl font-semibold text-gray-700 mb-2">No Accounts found</h3>
                      <!-- <p class="text-gray-500 mb-4">Get started by creating your first lead</p> -->
                      <!-- <router-link
                        to="/sales_management/leads/createLeads"
                        class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 mx-auto"
                      >
                        <Icon name="material-symbols:add" class="w-5 h-5" />
                        + Create Account
                      </router-link> -->
                    </div>
                  </div>
                </td>
              </tr>
              <tr
                v-else
                v-for="(lead, index) in leads"
                :key="lead.id"
                class="hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ index+1 }}
                </td>
                <td
                  v-for="field in fields"
                  :key="field.id"
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium"
                >
                  <router-link
                    :to="{
                      name: 'sales_management-contact-contactDetails-id',
                      params: { id: lead.id },
                      
                    }"
                    class="hover:underline"
                  >
                    {{ lead.values.find((e) => e.field_id == field.id)?.value }}
                  </router-link>

                  <!-- {{lead.values.find(e=>e.field_id == field.id)?.value }} -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="flex justify-between items-center mt-6">
                    <p class="text-sm text-gray-600">
            Showing page <span class="font-semibold">{{ currentPage }}</span> of <span class="font-semibold">{{ totalPages }}  ||  Total Contacts {{ totalAccounts }}</span>
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
</style>
