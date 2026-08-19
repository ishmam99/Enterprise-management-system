<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import CardBox from '@/components/CardBox.vue'
import * as chartConfig from '@/components/Charts/chart.config.js'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
// import { useStore } from '@/stores/store.js'

import { useHRM } from '@/composables/useHRM'
import BaseButton from '@/components/BaseButton.vue'
import FormControl from '@/components/FormControl.vue'
import Pagination from '@/components/Pagination.vue'

const { hrmApi } = useHRM()

// const $toast = useToast()
const employeeList = ref([])

// const store = useStore()
const router = useRouter()

// State
const filteredResults = ref([])    // filtered data after search
const loader = ref(false)
const modalOneActive = ref(false)
const employeeIdToDelete = ref(null)
const chartData = ref(null)
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const loading = ref(false)

// Fill chart data (optional)
const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData()
}

// Fetch all employees
const getAllEmployee = async () => {
  loader.value = true
  try {
    const { data } = await hrmApi.get('employee')
    storedata.employeeList = data.data
  } catch (error) {
    console.error(error, 'Error fetching employees')
  } finally {
    loader.value = false
  }
}

// Pagination
const paginatedEmployees = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredResults.value.slice(start, end)
})

const confirmDelete = (id) => {
  employeeIdToDelete.value = id
  modalOneActive.value = true
}

// delete employee api
const handleConfirmDelete = async () => {
  loading.value = true

  if (employeeIdToDelete.value) {
    try {
      const { data } = await api().delete(`/employee/${employeeIdToDelete.value}`)
      $toast.success('User Deleted Successfully')
      getAllEmployee()
    } catch (error) {
      $toast.error('Error! User Not Deleted')
    }
    loading.value = false

    modalOneActive.value = false
  }
}

// employee searching function
const filterResults = () => {
  const query = searchQuery.value.toLowerCase()
  filteredResults.value = employeeList.value.filter((employee) => {
    return (
      employee.first_name.toLowerCase().includes(query) ||
      employee.last_name.toLowerCase().includes(query) ||
      employee.position_name.toLowerCase().includes(query)
    )
  })
  currentPage.value = 1 // reset page when searching
}

// Back button
const goBack = () => router.back()

onMounted(() => {
  fillChartData()
  getAllEmployee()
})

watch(currentPage, (newPage) => {
  console.log('Current page changed:', newPage)
})

// watch(
//   () => store.employeeList,
//   (newList) => {
//     filteredResults.value = newList
//   }
// )

watch(searchQuery, () => {
  filterResults()
})
</script>

<template>
  <SectionMain class="mx-10">
    <!-- Header -->
    <SectionTitleLineWithButton
      :icon="mdiAccountMultiple"
      class="bg-cyan-500 py-3 rounded-2xl px-3 font-semibold text-white"
      title="Employee Payment Status"
      main
    >
      <div class="text-left flex items-center mb-2">
        <p
          class="flex gap-1 items-center rounded-full ps-2 pr-3 py-1 cursor-pointer text-white bg-[#4653dd]"
          @click="goBack"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20ZM12 11H16V13H12V16L8 12L12 8V11Z"></path>
          </svg>
          Back
        </p>
      </div>
    </SectionTitleLineWithButton>

    <!-- Search -->
    <div class="flex justify-center gap-3 mb-6">
      <FormControl
        v-model="searchQuery"
        class="w-full focus:outline-none"
        type="text"
        placeholder="Enter Employee Name"
      />
      <BaseButton class="w-1/6" color="info" label="Search" @click="filterResults" />
    </div>

<!-- Employee Table -->
<CardBox has-table class="overflow-x-auto rounded-lg shadow-lg">
  <table class="min-w-full divide-y divide-gray-200 border border-gray-200">
    <thead class="bg-blue-500 text-white text-sm uppercase tracking-wide">
      <tr>
        <th class="px-4 py-3 text-left">Employee Name</th>
        <th class="px-4 py-3 text-left">Email</th>
        <th class="px-4 py-3 text-left">Department</th>
        <th class="px-4 py-3 text-left">Country</th>
        <th class="px-4 py-3 text-left">Designation</th>
        <th class="px-4 py-3 text-left">Joined Date</th>
        <th class="px-4 py-3 text-left">Status</th>
        <th class="px-4 py-3 text-left">Left At</th>
        <th class="px-4 py-3 text-left">Job Type</th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      <!-- Loader Row -->
      <tr v-if="loader">
        <td colspan="10" class="text-center py-10">
          <span class="loading loading-bars mr-2"></span> Loading...
        </td>
      </tr>

      <!-- Employee Rows -->
      <tr v-for="emp in paginatedEmployees" :key="emp.id"
          class="hover:bg-gray-50 transition-colors duration-200">
        <td class="px-4 py-2">
          <p class="font-semibold text-blue-600 text-sm">{{ emp.first_name }} {{ emp.last_name }}</p>
          <p class="text-xs text-gray-500 font-medium">ID: {{ emp.employee_uid }}</p>
        </td>
        <td class="px-4 py-2 text-sm text-gray-700">{{ emp.email }}</td>
        <td class="px-4 py-2 text-sm text-gray-700">{{ emp.department_name }}</td>
        <td class="px-4 py-2 text-sm text-gray-700">{{ emp.hired_form || 'N/A' }}</td>
        <td class="px-4 py-2 text-sm text-gray-700">{{ emp.position_name }}</td>
        <td class="px-4 py-2 text-sm text-gray-700">{{ emp.joined_at }}</td>
        <td class="px-4 py-2">
          <span
            :class="emp.status === 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
            class="px-2 py-1 text-xs font-semibold rounded-full">
            {{ emp.status === 0 ? 'Current' : 'Discontinued' }}
          </span>
        </td>
        <td class="px-4 py-2 text-sm text-gray-700">{{ emp.status === 1 ? emp.left_at : 'N/A' }}</td>
        <td class="px-4 py-2 text-sm text-gray-700">{{ emp.type }}</td>
      </tr>

      <!-- Empty State -->
      <tr v-if="!loader && filteredResults.length === 0">
        <td colspan="10" class="text-center py-6 text-gray-500">No employees found</td>
      </tr>
    </tbody>
  </table>
</CardBox>


    <!-- Pagination -->
    <Pagination
      v-model="currentPage"
      :itemsPerPage="itemsPerPage"
      :totalItems="filteredResults.length"
    />
  </SectionMain>
</template>
