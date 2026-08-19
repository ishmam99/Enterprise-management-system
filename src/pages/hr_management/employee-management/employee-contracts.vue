<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import api from '@/config/api'

/* ---------------- state ---------------- */

const employees = ref([])
const loading = ref(false)
const search = ref('')

const currentPage = ref(1)
const perPage = ref(10)

/* ---------------- api ---------------- */

const fetchEmployees = async () => {
  loading.value = true
  try {
    const { data } = await api().get('employees')
    employees.value = data.data
  } catch (error) {
    console.error('Error fetching employees:', error)
  } finally {
    loading.value = false
  }
}

/* ---------------- computed ---------------- */

const filteredEmployees = computed(() => {
  if (!search.value) return employees.value

  return employees.value.filter(emp =>
    [
      emp.first_name,
      emp.last_name,
      emp.email
    ]
      .join(' ')
      .toLowerCase()
      .includes(search.value.toLowerCase())
  )
})

const totalPages = computed(() =>
  Math.ceil(filteredEmployees.value.length / perPage.value)
)

const paginatedEmployees = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return filteredEmployees.value.slice(start, start + perPage.value)
})

/* ---------------- methods ---------------- */

const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}

/* ---------------- lifecycle ---------------- */

watch(search, () => {
  currentPage.value = 1
})

onMounted(fetchEmployees)
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-6xl mx-auto">

      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow-md mb-6">
        <h1 class="text-3xl font-bold">Employee List</h1>
        <p class="text-sm opacity-90">All Active Employees</p>
      </div>

      <!-- Search -->
      <div class="mb-4">
        <input
          v-model="search"
          type="text"
          placeholder="Search employee..."
          class="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <!-- Table -->
      <div class="bg-white shadow-md rounded-xl overflow-x-auto">
        <table class="w-full text-sm">
          
          <!-- Head -->
          <thead class="bg-indigo-600 text-white">
            <tr>
              <th class="p-3 text-left">Name</th>
              <th class="p-3 text-left">Email</th>
              <th class="p-3 text-left">Action</th>
            </tr>
          </thead>

          <!-- Body -->
          <tbody>

            <!-- Loading -->
            <tr v-if="loading">
              <td colspan="3" class="p-6 text-center">
                Loading...
              </td>
            </tr>

            <!-- Data -->
            <tr
              v-for="emp in paginatedEmployees"
              :key="emp.id"
              class="border-t hover:bg-gray-50"
            >
              <td class="p-3 font-medium">
                {{ emp.first_name }} {{ emp.last_name }}
              </td>

              <td class="p-3">
                {{ emp.email }}
              </td>

              <td class="p-3">
                <router-link
                  :to="{ name: 'hr_management-employee-management-viewContracts-id', params: { id: emp.id } }"
                  class="px-5 text-nowrap py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <i class="fas fa-eye"></i> View Contracts
                </router-link>
              </td>
            </tr>

            <!-- Empty -->
            <tr v-if="!loading && filteredEmployees.length === 0">
              <td colspan="3" class="p-6 text-center text-gray-500">
                No employees found
              </td>
            </tr>

          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center items-center gap-2 mt-6">
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
        >
          Prev
        </button>

        <span class="px-4 py-2 font-semibold">
          Page {{ currentPage }} of {{ totalPages }}
        </span>

        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>

    </div>
  </div>
</template>

<style>
body {
  font-family: 'Inter', sans-serif;
}
</style>