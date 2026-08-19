<template>
  <div class="p-6 w-4/5 bg-gray-50 min-h-screen mx-auto">
    <!-- Header -->
    <p class="text-2xl font-bold bg-sky-600 text-white text-center rounded-t-lg py-3 mb-6 shadow-md">
      💻  Current Year Closing deal
    </p>

    <!-- Search & Filter -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div class="relative w-full sm:w-1/3 mb-4 sm:mb-0">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by software name..."
          class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
        />
        <i class="ri-search-line absolute left-3 top-3 text-gray-400 text-lg"></i>
      </div>

      <select
        v-model="filterCategory"
        class="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-sky-500 outline-none"
      >
        <option value="">All Categories</option>
        <option value="simulation">Simulation</option>
        <option value="design">Design</option>
        <option value="analysis">Analysis</option>
      </select>
    </div>

    <!-- Software Table -->
    <div class="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-100">
      <table class="min-w-full text-sm text-gray-700 table-zebra">
        <thead class="bg-sky-600 text-white text-left">
          <tr>
            <th class="py-3 border-e px-4">#</th>
            <th class="py-3 border-e px-4">Software Name</th>
            <th class="py-3 border-e px-4">Category</th>
            <th class="py-3 border-e px-4">Total Licenses</th>
            <th class="py-3 border-e px-4">Purchase Date</th>
            <th class="py-3 border-e px-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(software, index) in filteredSoftware"
            :key="software.id"
            class="border-b border-gray-100 hover:bg-gray-50 transition"
          >
            <td class="py-3 border-e px-4">{{ index + 1 }}</td>
            <td class="py-3 border-e px-4 font-semibold">{{ software.name }}</td>
            <td class="py-3 border-e px-4 capitalize">{{ software.category }}</td>
            <td class="py-3 border-e px-4">{{ software.licenses }}</td>
            <td class="py-3 border-e px-4">{{ software.purchase_date }}</td>

            <td class="py-3 px-4 text-center">
              <router-link
                to="/customer_management/list_customers/bySoftwareCustomers"
                class="btn btn-info btn-sm text-white gap-2"
              >
                <i class="ri-group-line"></i>
                Customer List
              </router-link>
            </td>
          </tr>

          <tr v-if="filteredSoftware.length === 0">
            <td colspan="6" class="text-center py-6 text-gray-400">
              No software found
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
const filterCategory = ref('')

const softwareList = ref([
  {
    id: 1,
    name: 'MSC Nastran',
    category: 'analysis',
    licenses: 12,
    purchase_date: '2024-08-12',
  },
  {
    id: 2,
    name: 'Adams',
    category: 'simulation',
    licenses: 9,
    purchase_date: '2024-06-30',
  },
  {
    id: 3,
    name: 'Simufact Forming',
    category: 'simulation',
    licenses: 5,
    purchase_date: '2024-07-15',
  },
  {
    id: 4,
    name: 'Patran',
    category: 'design',
    licenses: 7,
    purchase_date: '2024-09-02',
  },
])

const filteredSoftware = computed(() => {
  return softwareList.value.filter(software => {
    const matchesSearch = software.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())

    const matchesCategory = filterCategory.value
      ? software.category === filterCategory.value
      : true

    return matchesSearch && matchesCategory
  })
})
</script>
