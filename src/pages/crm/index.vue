<template>
  <div class="sales-management-dashboard p-6">
    <!-- Header Section with Gradient Background -->
    <div class="mb-8 bg-gradient-to-r from-sky-600 via-emerald-600 to-cyan-700/80 rounded-2xl p-8 text-white shadow-2xl">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-4xl font-bold mb-2 text-white">HTSS CRM Dashboard</h1>
          <p class="text-blue-100 text-lg">Monitor key CRM insights and manage your workflow effortlessly.</p>
        </div>
        <div class="text-right">
          <p class="text-3xl font-bold text-white capitalize">{{ authStore?.user?.name ? authStore?.user?.name : 'CRM' }}, {{ authStore?.role ? authStore?.role : 'Director' }}</p>
          <p class="text-blue-100">Welcome back!</p>
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
    <div class="grid grid-cols-1 md:grid-cols-23 lg:grid-cols-3 gap-6 mb-8">
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

      <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-2xl shadow-lg border border-emerald-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:local-shipping" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-emerald-700 text-sm font-semibold">Accounts</h3>
        </div>
        <p class="text-3xl font-bold text-emerald-800 mb-2">
          <span class="text-emerald-600 font-bold flex gap-1">
            <count-up :end-val="statsData.Accounts"></count-up> +
          </span>
        </p>
        <div class="w-full bg-emerald-200 rounded-full h-2">
          <div class="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full" style="width: 85%"></div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-2xl shadow-lg border border-cyan-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-gradient-to-br from-cyan-500 to-cyan-600 p-3 rounded-xl shadow-lg">
            <Icon name="material-symbols:menu" class="text-white w-6 h-6" />
          </div>
          <h3 class="text-cyan-700 text-sm font-semibold">Products</h3>
        </div>
        <p class="text-3xl font-bold text-cyan-800 mb-2">
          <span class="text-cyan-600 font-bold flex gap-1">
            <count-up :end-val="statsData.Products ? statsData.Products : '22'"></count-up> +
          </span>
        </p>
        <div class="w-full bg-cyan-200 rounded-full h-2">
          <div class="bg-gradient-to-r from-cyan-500 to-cyan-600 h-2 rounded-full" style="width: 90%"></div>
        </div>
      </div>
    </div>

    <div class="flex gap-4 ">
      <!-- Leads -->
  <div class="bg-gray-50  text-xs p-4 w-1/2">
    <div class="container mx-auto">

      <!-- Card -->
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <!-- Header controls -->
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Leads</h2>
          <div class="flex gap-4">
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
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
            <div v-if="authStore.role != 'crm-executive'">
              <router-link
                to="/crm/leads/create"
                class="btn btn-sm btn-primary text-white"
                >Create New Leads
                </router-link
              >
            </div>
          </div>
        </div>

        <!-- Loader -->
        <div v-if="isLoading" class="flex justify-center items-center py-16">
          <div
            class="animate-spin rounded-full h-10 w-10 border-4 border-yellow-500 border-t-transparent"
          ></div>
        </div>

        <!-- Table -->
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 table-zebra">
            <thead class="bg-gradient-to-r from-emerald-50 to-teal-50">
              <tr>
                <th
                  class="px-6 py-4 border-e text-center text-xl font-bold text-emerald-700 uppercase tracking-wider"
                >
                  #
                </th>
                <th
                  v-for="field in fields"
                  :key="field.id"
                  class="px-6 py-4 text-left text-xs text-nowrap border-e font-bold text-emerald-700 uppercase tracking-wider"
                >
                  {{ field.label }}
                </th>
                <th
                  class="px-6 py-4 border-e text-center text-xl font-bold text-emerald-700 uppercase tracking-wider"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="text-red-600 transform transition duration-500 hover:scale-125" fill="currentColor"><path d="M7 6V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7ZM13.4142 13.9997L15.182 12.232L13.7678 10.8178L12 12.5855L10.2322 10.8178L8.81802 12.232L10.5858 13.9997L8.81802 15.7675L10.2322 17.1817L12 15.4139L13.7678 17.1817L15.182 15.7675L13.4142 13.9997ZM9 4V6H15V4H9Z"></path></svg>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-100">
              <tr v-if="isLoading" class="hover:bg-emerald-50 transition-colors">
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                  <div class="flex items-center justify-center gap-3">
                    <Icon name="eos-icons:loading" class="w-8 h-8 text-emerald-500 animate-spin" />
                    <span class="text-lg">Loading leads...</span>
                  </div>
                </td>
              </tr>
              <tr v-else-if="leads.length === 0" class="hover:bg-emerald-50 transition-colors">
                <td colspan="5" class="px-6 py-12 text-center text-gray-500">
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
                      <h3 class="text-xl font-semibold text-gray-700 mb-2">No leads found</h3>
                      <p class="text-gray-500 mb-4">Get started by creating your first lead</p>
                      <router-link
                        to="/crm/leads/create"
                        class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 mx-auto"
                      >
                        <Icon name="material-symbols:add" class="w-5 h-5" />
                        + Create Lead
                      </router-link>
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
                      name: 'crm-Leads-leadsDetails-id',
                      params: { id: lead.id },

                    }"
                    class="hover:underline"
                  >
                    {{ lead.values.find((e) => e.field_id == field.id)?.value }}
                  </router-link>

                  <!-- {{lead.values.find(e=>e.field_id == field.id)?.value }} -->
                </td>
                 <td class="px-6 py-4 whitespace-nowrap">
                  <button @click="deleteRecord(lead.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="text-red-600 transform transition duration-500 hover:scale-125" fill="currentColor"><path d="M7 6V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7ZM13.4142 13.9997L15.182 12.232L13.7678 10.8178L12 12.5855L10.2322 10.8178L8.81802 12.232L10.5858 13.9997L8.81802 15.7675L10.2322 17.1817L12 15.4139L13.7678 17.1817L15.182 15.7675L13.4142 13.9997ZM9 4V6H15V4H9Z"></path></svg>
                  </button>
                </td>


              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="flex justify-between items-center mt-6">
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
  </div>


  <!-- Accounts -->
 <div class="bg-gray-50  text-xs p-4 w-1/2">
    <div class="container mx-auto">

      <!-- Card -->
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <!-- Header controls -->
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Accounts</h2>
          <div class="flex gap-4">
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
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
            <div v-if="authStore.role != 'crm-executive'">
              <router-link
                to="/crm/accounts/create"
                class="btn btn-sm btn-success text-white"
                >Create New Account
                </router-link
              >
            </div>
          </div>
        </div>

        <!-- Loader -->
        <div v-if="isLoading2" class="flex justify-center items-center py-16">
          <div
            class="animate-spin rounded-full h-10 w-10 border-4 border-yellow-500 border-t-transparent"
          ></div>
        </div>

        <!-- Table -->
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 table-zebra">
            <thead class="bg-gradient-to-r from-emerald-50 to-teal-50">
              <tr>
                <th
                  class="px-6 py-4 border-e text-center text-xl font-bold text-emerald-700 uppercase tracking-wider"
                >
                  #
                </th>
                <th
                  v-for="field in fields"
                  :key="field.id"
                  class="px-6 py-4 text-left text-xs text-nowrap border-e font-bold text-emerald-700 uppercase tracking-wider"
                >
                  {{ field.label }}
                </th>
                <th
                  class="px-6 py-4 border-e text-center text-xl font-bold text-emerald-700 uppercase tracking-wider"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="text-red-600 transform transition duration-500 hover:scale-125" fill="currentColor"><path d="M7 6V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7ZM13.4142 13.9997L15.182 12.232L13.7678 10.8178L12 12.5855L10.2322 10.8178L8.81802 12.232L10.5858 13.9997L8.81802 15.7675L10.2322 17.1817L12 15.4139L13.7678 17.1817L15.182 15.7675L13.4142 13.9997ZM9 4V6H15V4H9Z"></path></svg>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-100">
              <tr v-if="isLoading2" class="hover:bg-emerald-50 transition-colors">
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                  <div class="flex items-center justify-center gap-3">
                    <Icon name="eos-icons:loading" class="w-8 h-8 text-emerald-500 animate-spin" />
                    <span class="text-lg">Loading accounts...</span>
                  </div>
                </td>
              </tr>
              <tr v-else-if="accounts.length === 0" class="hover:bg-emerald-50 transition-colors">
                <td colspan="5" class="px-6 py-12 text-center text-gray-500">
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
                      <h3 class="text-xl font-semibold text-gray-700 mb-2">No accounts found</h3>
                      <p class="text-gray-500 mb-4">Get started by creating your first account</p>
                      <router-link
                        to="/crm/accounts/create"
                        class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 mx-auto"
                      >
                        <Icon name="material-symbols:add" class="w-5 h-5" />
                        + Create Account
                      </router-link>
                    </div>
                  </div>
                </td>
              </tr>
              <tr
                v-else
                v-for="(account, index) in accounts"
                :key="account.id"
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
                      name: 'crm-Accounts-accountsDetails-id',
                      params: { id: account.id },

                    }"
                    class="hover:underline"
                  >
                    {{ account.values.find((e) => e.field_id == field.id)?.value }}
                  </router-link>

                  <!-- {{lead.values.find(e=>e.field_id == field.id)?.value }} -->
                </td>
                 <td class="px-6 py-4 whitespace-nowrap">
                  <button @click="deleteRecord2(account.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="text-red-600 transform transition duration-500 hover:scale-125" fill="currentColor"><path d="M7 6V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7ZM13.4142 13.9997L15.182 12.232L13.7678 10.8178L12 12.5855L10.2322 10.8178L8.81802 12.232L10.5858 13.9997L8.81802 15.7675L10.2322 17.1817L12 15.4139L13.7678 17.1817L15.182 15.7675L13.4142 13.9997ZM9 4V6H15V4H9Z"></path></svg>
                  </button>
                </td>


              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="flex justify-between items-center mt-6">
          <p class="text-sm text-gray-600">
            Showing page <span class="font-semibold">{{ currentPage2 }}</span> of <span class="font-semibold">{{ totalPages2 }}  ||  Total Accounts {{ totalAccounts2 }}</span>
          </p>

          <div class="flex items-center gap-2">
            <button
              @click="goToPage2(currentPage2 - 1)"
              :disabled="currentPage2 === 1"
              class="px-4 py-2 rounded-lg border text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>

            <button
              @click="goToPage2(currentPage2 + 1)"
              :disabled="currentPage2 === totalPages2"
              class="px-4 py-2 rounded-lg border text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

    </div>




  </div>
</template>

<script setup>
import CountUp from "vue-countup-v3";
import { ref, onMounted, reactive, watch } from 'vue'
import api from "@/config/api";
import { useAuthStore } from "@/stores/AuthStore";
import Swal from 'sweetalert2'

const authStore = useAuthStore()
authStore.toggleSidebar(false)
const statsData = ref({
  Leads: 0,
  Accounts: 0,
  Contacts: 0,
  Deals: 0,
  Notes: 0,
  Proposals: 0,
  "Next Step Summary": 0
})

const fetchStats = async () => {
  const { data } = await api().get('/crm/stats')

  data.forEach(item => {
    statsData.value[item.module_name] = Number(item.total_records)
  })
}

const isLoading = ref(false)
const isLoading2 = ref(false)
const toast = reactive({
  show: false,
  message: '',
  type: 'success'
})

authStore.sidebarOpen = true
const currentPage = ref(1)
const currentPage2 = ref(1)
const totalPages = ref(1)
const totalPages2 = ref(1)
const perPage = ref(5)
const totalAccounts = ref(0)
const totalAccounts2 = ref(0)
const fields = ref([])
const leads = ref([])
const accounts = ref([])

const showToast = (message, type = 'success') => {
  toast.show = true
  toast.message = message
  toast.type = type
  setTimeout(() => (toast.show = false), 3000)
}
const fetchFields = async () => {
  try {
    isLoading.value = true
    isLoading2.value = true
      const { data } = await api().get('/crm/modules/1/fields')
  fields.value = data.data.filter(e=>e.order != null)
  } catch (error) {
    console.error('Failed to fetch fields:', error)
    showToast('Failed to fetch fields', 'error')
  } finally {
    isLoading.value = false
    isLoading2.value = false
  }

}
const fetchLeads = async (page=1) => {
  try {
    isLoading.value = true
        const { data } = await api().get(`/crm/modules/1/records?page=${page}&per_page=${perPage.value}`)
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
const fetchAccounts = async (page=1) => {
  try {
    isLoading2.value = true
        const { data } = await api().get(`/crm/modules/2/records?page=${page}&per_page=${perPage.value}`)
         accounts.value = data.data
         currentPage2.value = data.current_page
         totalPages2.value = data.last_page
         totalAccounts2.value = data.total
  } catch (error) {
    console.error('Failed to fetch leads:', error)
    showToast('Failed to fetch leads', 'error')
  } finally {
    isLoading2.value = false
  }
}


const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return

  fetchLeads(page)
}
const goToPage2 = (page) => {
  if (page < 1 || page > totalPages2.value) return

  fetchAccounts(page)
}


watch(perPage, () => {
  fetchLeads(1)
  fetchAccounts(1)
})

const deleteRecord = async (id) => {
  const confirmation = await Swal.fire({
    title: "Are you sure?",
    text: "This record will be permanently deleted.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (!confirmation.isConfirmed) return;

  try {
    // API DELETE
    await api().delete(`/crm/record/${id}`);

    // Success Alert
    Swal.fire({
      title: "Deleted!",
      text: "Record has been deleted.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });

    // Refresh list
    await fetchLeads();
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Error!",
      text: "Failed to delete the record.",
      icon: "error",
    });
  }
};

const deleteRecord2 = async (id) => {
  const confirmation = await Swal.fire({
    title: "Are you sure?",
    text: "This record will be permanently deleted.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (!confirmation.isConfirmed) return;

  try {
    // API DELETE
    await api().delete(`/crm/record/${id}`);

    // Success Alert
    Swal.fire({
      title: "Deleted!",
      text: "Record has been deleted.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });

    // Refresh list
    await fetchAccounts();
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Error!",
      text: "Failed to delete the record.",
      icon: "error",
    });
  }
};



// Simulate API loading
onMounted(async () => {
  isLoading.value = true
    fetchStats()
    fetchFields()
    fetchLeads()
    fetchAccounts()
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
