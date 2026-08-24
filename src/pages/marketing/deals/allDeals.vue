<script setup>
import { ref, onMounted, reactive, watch } from 'vue'
import { useAuthStore } from "@/stores/AuthStore";
import Breadcrumb from "@/components/Breadcrumb.vue";
import api from "@/config/api";

const authStore = useAuthStore()
authStore.sidebarOpen = true

const currentPage = ref(1)
const perPage = ref(20)
const totalPages = ref(1)
const fields = ref([])
const leads = ref([])
const totalAccounts = ref(0)
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
const fetchFields = async () => {
  const { data } = await api().get('/crm/modules/5/fields')
  fields.value = data.data
}
const fetchLeads = async (page = 1) => {
  try {
    isLoading.value = true


    const { data } = await api().get(`/crm/modules/5/records?page=${page}&per_page=${perPage.value}`)
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
  <div class="bg-gray-50 min-h-screen py-4">
    <div class="container mx-auto">
      <Breadcrumb title="Accounts" />

      <!-- Card -->
      <div class="bg-white rounded-2xl shadow-lg px-6 py-2">
        <!-- Header controls -->
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <div class="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19.2914 5.99994H20.0002C20.5525 5.99994 21.0002 6.44766 21.0002 6.99994V13.9999C21.0002 14.5522 20.5525 14.9999 20.0002 14.9999H18.0002L13.8319 9.16427C13.3345 8.46797 12.4493 8.16522 11.6297 8.41109L9.14444 9.15668C8.43971 9.3681 7.6758 9.17551 7.15553 8.65524L6.86277 8.36247C6.41655 7.91626 6.49011 7.17336 7.01517 6.82332L12.4162 3.22262C13.0752 2.78333 13.9312 2.77422 14.5994 3.1994L18.7546 5.8436C18.915 5.94571 19.1013 5.99994 19.2914 5.99994ZM5.02708 14.2947L3.41132 15.7085C2.93991 16.1209 2.95945 16.8603 3.45201 17.2474L8.59277 21.2865C9.07284 21.6637 9.77592 21.5264 10.0788 20.9963L10.7827 19.7645C11.2127 19.012 11.1091 18.0682 10.5261 17.4269L7.82397 14.4545C7.09091 13.6481 5.84722 13.5771 5.02708 14.2947ZM7.04557 5H3C2.44772 5 2 5.44772 2 6V13.5158C2 13.9242 2.12475 14.3173 2.35019 14.6464C2.3741 14.6238 2.39856 14.6015 2.42357 14.5796L4.03933 13.1658C5.47457 11.91 7.65103 12.0343 8.93388 13.4455L11.6361 16.4179C12.6563 17.5401 12.8376 19.1918 12.0851 20.5087L11.4308 21.6538C11.9937 21.8671 12.635 21.819 13.169 21.4986L17.5782 18.8531C18.0786 18.5528 18.2166 17.8896 17.8776 17.4146L12.6109 10.0361C12.4865 9.86205 12.2652 9.78636 12.0603 9.84783L9.57505 10.5934C8.34176 10.9634 7.00492 10.6264 6.09446 9.7159L5.80169 9.42313C4.68615 8.30759 4.87005 6.45035 6.18271 5.57524L7.04557 5Z"></path></svg>
            <h2 class="text-2xl font-bold text-gray-800">Deals</h2>
            

          </div>


          <div class="flex flex-col gap-2 items-end justify-center">
            <div class="flex gap-4">
            <div class="flex items-center gap-3">
              <label for="perPage" class="text-sm text-gray-600">Per Page:</label>
              <select id="perPage" v-model="perPage"
                class="border rounded-lg px-8 py-1.5 text-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none">
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
              </select>
            </div>

            <div class="flex items-center gap-2">
              <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
                class="px-4 py-2 rounded-lg border text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                Prev
              </button>

              <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
                class="px-4 py-2 rounded-lg border text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                Next
              </button>
            </div>
          </div>
          <div class="flex items-end gap-2 border-b">
            <p class="text-sm text-gray-600">
              Total Deals: <span class="font-semibold"></span>
              <span class="font-bold">{{ totalAccounts }}</span>
            </p>
            ||
            <p class="text-sm text-gray-600">
              Showing page: <span class="font-semibold">{{ currentPage }}</span> of
              <span class="font-semibold">{{ totalPages }}</span>
            </p>
          </div>
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
                <th class="px-6 py-2 text-left border-x font-bold text-emerald-700 uppercase tracking-wider">
                  #
                </th>
                <th v-for="field in fields" :key="field.id"
                  class="px-6 py-2 text-left text-xs text-nowrap border-e font-bold text-emerald-700 uppercase tracking-wider">
                  {{ field.label }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-100">
              <tr v-if="isLoading" class="hover:bg-emerald-50 transition-colors">
                <td colspan="9" class="px-6 py-8 text-center text-gray-500">
                  <div class="flex items-center justify-center gap-3">
                    <Icon name="eos-icons:loading" class="w-8 h-8 text-emerald-500 animate-spin" />
                    <span class="text-lg">Loading Deals...</span>
                  </div>
                </td>
              </tr>
              <tr v-else-if="leads.length === 0" class="hover:bg-emerald-50 transition-colors">
                <td colspan="9" class="px-6 py-12 text-center text-gray-500">
                  <div class="flex flex-col items-center gap-4">
                    <div class="relative">
                      <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                        <Icon name="material-symbols:person" class="w-12 h-12 text-gray-400" />
                      </div>
                      <div
                        class="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Icon name="material-symbols:settings" class="w-5 h-5 text-emerald-600" />
                      </div>
                    </div>
                    <div class="text-center">
                      <h3 class="text-xl font-semibold text-gray-700 mb-2">No Deals found</h3>
                      <!-- <p class="text-gray-500 mb-4">Get started by creating your first lead</p> -->
                      <!-- <router-link
                        to="/marketing/leads/createLeads"
                        class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 mx-auto"
                      >
                        <Icon name="material-symbols:add" class="w-5 h-5" />
                        + Create Account
                      </router-link> -->
                    </div>
                  </div>
                </td>
              </tr>
              <tr v-else v-for="(lead, index) in leads" :key="lead.id"
                class="hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300">
                <td class="px-6 py-1 whitespace-nowrap">
                  {{ index + 1 }}
                </td>
                <td v-for="field in fields" :key="field.id"
                  class="px-6 py-1 whitespace-nowrap text-sm text-gray-600 font-medium">
                  <router-link :to="{
                    name: 'marketing-deals-dealDetails-id',
                    params: { id: lead.id },

                  }" class="hover:underline">
                    {{lead.values.find((e) => e.field_id == field.id)?.value}}
                  </router-link>

                  <!-- {{lead.values.find(e=>e.field_id == field.id)?.value }} -->
                </td>
              </tr>
            </tbody>
          </table>
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
.accounts-management-dashboard>* {
  animation: fadeInUp 0.6s ease-out;
}

.accounts-management-dashboard>*:nth-child(2) {
  animation-delay: 0.1s;
}

.accounts-management-dashboard>*:nth-child(3) {
  animation-delay: 0.2s;
}

.accounts-management-dashboard>*:nth-child(4) {
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
button:focus,
a:focus,
input:focus,
select:focus {
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

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.table-zebra tr:nth-child(even) {
  background-color: #f9fafb8e;
}

/* ✨ Alternate row background (striped look) */
tbody tr:nth-child(odd) td {
  background-color: #f8fcff7e;
  /* very light cyan */
}

tbody tr:nth-child(even) td {
  background-color: #e5f6ff;
  /* soft blue tint */
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
