<template>
  <div class="p-6 w-4/5 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 min-h-screen mx-auto">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        In-Active Customer List
      </h1>
      <p class="text-gray-600 mt-2">Review and approve pending customer accounts</p>
    </div>

    <!-- Search & Filter -->
    <div class="flex flex-col md:flex-row gap-4 mb-8">
      <div class="relative flex-1 max-w-md">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name or email..."
          class="w-full pl-12 pr-6 py-3 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition"
        />
        <i class="fas fa-search absolute left-4 top-4 text-purple-400"></i>
      </div>

      <select
        v-model="selectedIndustry"
        @change="getCustomers()"
        class="px-6 py-3 rounded-xl border border-purple-200 bg-white focus:ring-4 focus:ring-purple-100 outline-none"
      >
        <option value="">All Industries</option>
        <option v-for="industry in industries" :key="industry.id" :value="industry.id">
          {{ industry.name }}
        </option>
      </select>
    </div>

    <!-- Table Card -->
    <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100">
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full ">
          <thead class="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <tr>
              <th class="py-4 px-6 text-left">#</th>
              <th class="py-4 px-6 text-left">Customer Name</th>
              <th class="py-4 px-6 text-left">Email</th>
              <th class="py-4 px-6 text-left">Phone</th>
              <th class="py-4 px-6 text-left">Industry</th>
              <th class="py-4 px-6 text-left">Status</th>
              <th class="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="(customer, index) in customers"
              :key="customer.id"
              class="hover:bg-purple-50 transition-all duration-200"
            >
              <td class="py-1 px-6 font-medium">{{ index + 1 }}</td>
              <td class="py-1 px-6">
                <div class="font-semibold text-gray-800">{{ customer.user?.name }}</div>
              </td>
              <td class="py-1 px-6 text-gray-600">{{ customer.user?.email }}</td>
              <td class="py-1 px-6 text-gray-600">{{ customer.phone }}</td>
              <td class="py-1 px-6">
                <span class="text-purple-700 font-medium">
                  {{ customer.industry?.name || '—' }}
                </span>
              </td>
              <td class="py-1 px-6">
                <span
                  :class="[
                    'px-4 py-2 rounded-full text-xs font-bold tracking-wide',
                    customer.status == 2
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-emerald-100 text-emerald-700',
                  ]"
                >
                  {{ customer.status == 2 ? 'Inactive' : 'Approved' }}
                </span>
              </td>
              <td class="py-1 px-6 text-center">
                <div class="flex justify-center gap-3">
                  <!-- Approve Button - Only show when pending -->
                  <button
                    v-if="customer.status == 1"
                    @click="approveRequest(customer)"
                    class="px-5 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                   <i class="ri-prohibited-2-line"></i> Make Inactive
                  </button>

                  <!-- View Details -->
                  <router-link
                    :to="{ name: 'customer_management-CustomerDetails-id', params: { id: customer.id } }"
                    class="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    <i class="fas fa-eye"></i> View
                  </router-link>
                </div>
              </td>
            </tr>

            <!-- Empty State -->
            <tr v-if="customers.length === 0">
            <td colspan="10" class="text-center py-16">
              <div class="flex flex-col items-center justify-center text-gray-400 text-lg">
                <i class="fas fa-inbox text-5xl mb-4"></i>
                <span>No inactive customer found</span>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="meta && customers.length > 0" class="bg-gray-50 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="text-sm text-gray-600">
          Showing {{ meta.from }} - {{ meta.to }} of {{ meta.total }} records
        </div>
        <div class="flex gap-2">
          <button
            v-for="link in meta.links"
            :key="link.label"
            @click="currentPage = link.page || currentPage; getCustomers()"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition',
              link.active
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                : 'bg-white text-purple-700 border border-purple-300 hover:bg-purple-50',
            ]"
            v-html="link.label"
          />
        </div>
      </div>
    </div>

    <!-- Success Toast -->
    <div
      v-if="toastMessage"
      class="fixed bottom-8 right-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce-in z-50"
    >
      <i class="fas fa-check-circle text-2xl"></i>
      <span class="font-semibold">{{ toastMessage }}</span>
    </div>
  </div>
</template>

<script setup>
import api from '@/config/api'
import { useAuthStore } from '@/stores/AuthStore'
import { _ } from 'numeral'
import { ref, watch, onMounted } from 'vue'

const searchQuery = ref('')
const currentPage = ref(1)
const customers = ref([])
const meta = ref(null)
const selectedIndustry = ref('')
const toastMessage = ref('')
const industries = ref([])
const authStore = useAuthStore()
// Fetch customers (only pending ones + optional industry filter)
const getCustomers = async () => {
  let industryFilter = ''
  if (selectedIndustry.value) {
    industryFilter = `&industry_id=${selectedIndustry.value}}`
  }

  try {
    const url =
      authStore.role == "customer-manager"
        ? `customers?status=2&with=user,industry${industryFilter}&per_page=20&page=${currentPage.value}&search=${encodeURIComponent(searchQuery.value)}&company_id=${authStore.companyId}`
        : `customers?status=2&with=user,industry${industryFilter}&per_page=20&page=${currentPage.value}&search=${encodeURIComponent(searchQuery.value)}`
    const { data } = await api().get(url)
    customers.value = data.data.data
    meta.value = data.data
  } catch (err) {
    console.error(err)
  }
}

// Approve customer → change status to 1
const approveRequest = async (customer) => {
  try {
    await api().post(`/customers/${customer.id}`, { status: 1 , _method: 'PUT'})

    // Instantly update UI
    customer.status = 1

    // Show toast
    toastMessage.value = `${customer.user.name} has been inactive!`
    setTimeout(() => (toastMessage.value = ''), 4000)
  } catch (err) {
    alert('Failed to approve customer')
  }
}

// Debounced search
const debounce = (fn, delay = 500) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}

watch(searchQuery, debounce(() => {
  currentPage.value = 1
  getCustomers()
}, 500))
const getIndustries = async() => {
  const {data} = await api().get('industries')
  industries.value = data.data
}
onMounted(() => {
  getIndustries()
  getCustomers()
})
</script>

<style scoped>
.animate-bounce-in {
  animation: bounceIn 0.6s ease-out;
}

@keyframes bounceIn {
  0% { opacity: 0; transform: scale(0.3); }
  50% { opacity: 1; transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); }
}
</style>
