<template>
  <div class="p-6 w-4/5 bg-gray-50 min-h-screen mx-auto">
    <!-- Header -->
    <p class="text-2xl font-bold bg-emerald-600 text-white text-center rounded-t-lg py-3 mb-6 shadow-md">
      👥 By Customer List
    </p>

    <!-- Search & Filter -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div class="relative w-full sm:w-1/3 mb-4 sm:mb-0">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search customer..."
          class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
        />
        <i class="fa fa-search absolute left-3 top-3 text-gray-400"></i>
      </div>

      <select
        v-model="filterIndustry"
        class="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
      >
        <option value="">All Industries</option>
        <option value="Aerospace">Aerospace</option>
        <option value="Automotive">Automotive</option>
        <option value="Defense">Defense</option>
        <option value="Industrial Machinery">Industrial Machinery</option>
      </select>
    </div>

    <!-- Customer Table -->
    <div class="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-100">
      <table class="min-w-full text-sm text-gray-700">
        <thead class="bg-emerald-600 text-white text-left">
          <tr>
            <th class="py-3 px-4 border-e">#</th>
            <th class="py-3 px-4 border-e">Customer Name</th>
            <th class="py-3 px-4 border-e">Email</th>
            <th class="py-3 px-4 border-e">Industry</th>
            <th class="py-3 px-4 border-e">Software Purchased</th>
            <th class="py-3 px-4 border-e text-center">Licenses</th>
            <th class="py-3 px-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(customer, index) in filteredCustomers"
            :key="customer.id"
            class="border-b border-gray-100 hover:bg-gray-50 transition"
          >
            <td class="py-3 px-4 border-e">{{ index + 1 }}</td>
            <td class="py-3 px-4 border-e font-semibold">{{ customer.name }}</td>
            <td class="py-3 px-4 border-e">{{ customer.email }}</td>
            <td class="py-3 px-4 border-e">{{ customer.industry }}</td>
            <td class="py-3 px-4 border-e">{{ customer.software }}</td>
            <td class="py-3 px-4 border-e text-center">{{ customer.licenses }}</td>

            <td class="py-3 px-4 text-center">
              <router-link
                to="/customer_management/customer_creation/customerView"
                class="btn btn-info text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
              >
                View Profile
              </router-link>
            </td>
          </tr>

          <tr v-if="filteredCustomers.length === 0">
            <td colspan="7" class="text-center py-6 text-gray-400">No customers found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const filterIndustry = ref('')

const customers = ref([
  {
    id: 1,
    name: 'Md. Tasrif',
    email: 'tasrif12@gmail.com',
    industry: 'Aerospace',
    software: 'MSC Nastran',
    licenses: 8,
  },
  {
    id: 2,
    name: 'Rayan Hasif',
    email: 'hasif12@yahoo.com',
    industry: 'Automotive',
    software: 'Adams Motion',
    licenses: 5,
  },
  {
    id: 3,
    name: 'Md. Samiul Hoque',
    email: 'samiul@gmail.com',
    industry: 'Defense',
    software: 'Simufact Forming',
    licenses: 10,
  },
  {
    id: 4,
    name: 'Nafis Hasan',
    email: 'hasan23@gmail.com',
    industry: 'Industrial Machinery',
    software: 'Patran',
    licenses: 12,
  },
])

const filteredCustomers = computed(() => {
  return customers.value.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesIndustry = filterIndustry.value
      ? customer.industry === filterIndustry.value
      : true
    return matchesSearch && matchesIndustry
  })
})
</script>

<style scoped>
tr {
  transition: background-color 0.2s ease;
}
</style>
