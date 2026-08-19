<template>
  <div class="p-6 w-4/5 bg-gray-50 min-h-screen mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold bg-sky-600 text-white px-6 py-3 rounded-t-lg shadow-md">
        👥 Customer List (By Solution)
      </h2>

      <router-link
        to="/customer_management/list_customers/bySolutionCustomers"
        class="btn btn-outline btn-sm flex items-center gap-2 border-sky-500 text-sky-600 hover:bg-sky-600 hover:text-white"
      >
        <i class="ri-arrow-left-line"></i>
        Back to Solution List
      </router-link>
    </div>

    <!-- Search & Filter -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div class="relative w-full sm:w-1/3 mb-4 sm:mb-0">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search customer name or email..."
          class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
        />
        <i class="ri-search-line absolute left-3 top-3 text-gray-400 text-lg"></i>
      </div>

      <select
        v-model="filterType"
        class="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-sky-500 outline-none"
      >
        <option value="">All Types</option>
        <option value="individual">Individual</option>
        <option value="organization">Organization</option>
      </select>
    </div>

    <!-- Customer Table -->
    <div class="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-100">
      <table class="min-w-full text-sm text-gray-700 table-zebra">
        <thead class="bg-sky-600 text-white text-left">
          <tr>
            <th class="py-3 border-e px-4">#</th>
            <th class="py-3 border-e px-4">Customer Name</th>
            <th class="py-3 border-e px-4">Email</th>
            <th class="py-3 border-e px-4">Type</th>
            <th class="py-3 border-e px-4">License Count</th>
            <th class="py-3 border-e px-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(customer, index) in filteredCustomers"
            :key="customer.id"
            class="border-b border-gray-100 hover:bg-gray-50 transition"
          >
            <td class="py-3 border-e px-4">{{ index + 1 }}</td>
            <td class="py-3 border-e px-4 font-semibold">{{ customer.name }}</td>
            <td class="py-3 border-e px-4">{{ customer.email }}</td>
            <td class="py-3 border-e px-4 capitalize">{{ customer.type }}</td>
            <td class="py-3 border-e px-4 text-center">{{ customer.licenses }}</td>

            <td class="py-3 px-4 text-center">
              <router-link
                to="/customer_management/customer_creation/customerView"
                class="btn btn-info btn-sm text-white gap-2"
              >
                <i class="ri-user-line"></i>
                View Profile
              </router-link>
            </td>
          </tr>

          <tr v-if="filteredCustomers.length === 0">
            <td colspan="6" class="text-center py-6 text-gray-400">
              No customers found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const filterType = ref('')

const customers = ref([
  {
    id: 1,
    name: 'Md. Tasrif',
    email: 'tasrif12@gmail.com',
    type: 'organization',
    licenses: 3,
  },
  {
    id: 2,
    name: 'Rayan Hasif',
    email: 'hasif12@yahoo.com',
    type: 'individual',
    licenses: 1,
  },
  {
    id: 3,
    name: 'Md. Samiul Hoque',
    email: 'samiul@gmail.com',
    type: 'organization',
    licenses: 4,
  },
  {
    id: 4,
    name: 'Nafis Hasan',
    email: 'hasan23@gmail.com',
    type: 'individual',
    licenses: 2,
  },
])

const filteredCustomers = computed(() => {
  return customers.value.filter(customer => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesType = filterType.value
      ? customer.type === filterType.value
      : true

    return matchesSearch && matchesType
  })
})
</script>
