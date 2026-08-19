<template>
  <div class="p-6 w-4/5 bg-gray-50 min-h-screen mx-auto">
    <!-- Header -->
    <p class="text-2xl font-bold bg-emerald-600 text-white text-center rounded-t-lg py-3 mb-6 shadow-md">
      🧩 Current Quarter Closing deal
    </p>

    <!-- Search & Filter -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div class="relative w-full sm:w-1/3 mb-4 sm:mb-0">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by solution..."
          class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
        />
        <i class="fa fa-search absolute left-3 top-3 text-gray-400"></i>
      </div>

      <select
        v-model="filterStatus"
        class="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="maintenance">Maintenance</option>
        <option value="deprecated">Deprecated</option>
      </select>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-100">
      <table class="min-w-full text-sm text-gray-700">
        <thead class="bg-emerald-600 text-white text-left">
          <tr>
            <th class="py-3 px-4 border-e">#</th>
            <th class="py-3 px-4 border-e">Solution Name</th>
            <th class="py-3 px-4 border-e">Software Type</th>
            <th class="py-3 px-4 border-e text-center">Licenses</th>
            <th class="py-3 px-4 border-e text-center">Status</th>
            <th class="py-3 px-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(solution, index) in filteredSolutions"
            :key="solution.id"
            class="border-b border-gray-100 hover:bg-gray-50 transition"
          >
            <td class="py-3 px-4 border-e">{{ index + 1 }}</td>
            <td class="py-3 px-4 border-e font-semibold">{{ solution.name }}</td>
            <td class="py-3 px-4 border-e">{{ solution.type }}</td>
            <td class="py-3 px-4 border-e text-center">{{ solution.licenses }}</td>
            <td
              class="py-3 px-4 border-e text-center"
              :class="{
                'text-green-600 font-semibold': solution.status === 'active',
                'text-yellow-600 font-semibold': solution.status === 'maintenance',
                'text-red-600 font-semibold': solution.status === 'deprecated',
              }"
            >
              {{ solution.status }}
            </td>
            <td class="py-3 px-4 text-center">
              <router-link
                to="/customer_management/list_customers/bySolutionCustomers"
                class="btn btn-info text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
              >
                Customer List
              </router-link>
            </td>
          </tr>

          <tr v-if="filteredSolutions.length === 0">
            <td colspan="6" class="text-center py-6 text-gray-400">
              No solutions found
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
const filterStatus = ref('')

const solutions = ref([
  { id: 1, name: 'Linear Static', type: 'Structural Analysis', licenses: 12, status: 'active' },
  { id: 2, name: 'Vibration Analysis', type: 'Dynamic Simulation', licenses: 8, status: 'maintenance' },
  { id: 3, name: 'Geometry Cleanup', type: 'Pre-Processing', licenses: 20, status: 'active' },
  { id: 4, name: 'Speaker/Audio Simulation', type: 'Acoustic Analysis', licenses: 5, status: 'deprecated' },
])

const filteredSolutions = computed(() => {
  return solutions.value.filter((solution) => {
    const matchesSearch = solution.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = filterStatus.value ? solution.status === filterStatus.value : true
    return matchesSearch && matchesStatus
  })
})
</script>

<style scoped>
tr {
  transition: background-color 0.2s ease;
}
</style>
