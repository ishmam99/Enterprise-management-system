<script setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'

const loading = ref(false)
const trainings = ref([])

// ✅ Mock data (replace with API data later)
const mockData = [
  { id: 1, title: 'MSC Training Batch 01', status: 'Completed' },
  { id: 2, title: 'MSC Training Batch 02', status: 'Ongoing' },
  { id: 3, title: 'MSC Advanced Workshop', status: 'Pending' },
  { id: 4, title: 'MSC Technical Session - Chittagong', status: 'Completed' },
  { id: 5, title: 'MSC Skill Development', status: 'Ongoing' }
]

// Fetch trainings
const fetchTrainings = async () => {
  loading.value = true
  try {
    // const { data } = await api().get('get-msc-trainings')
    // trainings.value = data.data
    trainings.value = mockData
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Failed to load trainings',
      text: error.message,
      confirmButtonColor: '#3abff8'
    })
  } finally {
    loading.value = false
  }
}

// View training details
const viewDetails = (training) => {
  Swal.fire({
    title: 'Training Details',
    html: `
      <div class="text-left">
        <div class="mb-4">
          <h3 class="font-bold text-lg mb-2">Title:</h3>
          <p class="text-gray-700 text-lg font-semibold">${training.title}</p>
        </div>
        <div class="mb-4">
          <h3 class="font-bold text-lg mb-2">Status:</h3>
          <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            training.status === 'Completed'
              ? 'bg-green-100 text-green-800'
              : training.status === 'Ongoing'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-yellow-100 text-yellow-800'
          }">
            ${training.status}
          </span>
        </div>
        <div class="bg-gray-100 p-3 rounded">
          <p class="text-sm text-gray-600">
            Detailed information about this training batch, including instructors, schedule, and participants, can be displayed here.
          </p>
        </div>
      </div>
    `,
    width: '500px',
    confirmButtonColor: '#3abff8',
    confirmButtonText: 'Close'
  })
}

onMounted(fetchTrainings)
</script>

<template>
  <div class="container mx-auto p-4">
    <!-- Header -->
    <div class="flex items-center justify-between bg-teal-700 text-white p-4 mb-4 rounded-lg">
      <h1 class="text-xl font-bold">MSC Training List ({{ trainings.length }})</h1>
    </div>

    <!-- Loading Spinner -->
    <div v-if="loading" class="flex justify-center p-8">
      <span class="loading loading-spinner loading-lg text-teal-600"></span>
    </div>

    <!-- Training Table -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <table class="table w-full">
        <thead>
          <tr class="bg-teal-700 text-white">
            <th class="p-3 border-e">Training Name</th>
            <th class="p-3 border-e">Status</th>
            <th class="p-3 border-e">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="training in trainings" :key="training.id" class="border-b hover:bg-gray-50">
            <td class="p-3 border-e text-gray-900 font-medium text-lg">{{ training.title }}</td>
            <td class="p-3 border-e">
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                :class="training.status === 'Completed' 
                  ? 'bg-green-100 text-green-800' 
                  : training.status === 'Ongoing' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-yellow-100 text-yellow-800'"
              >
                {{ training.status }}
              </span>
            </td>
            <td class="p-3 border-e">
              <button
                @click="viewDetails(training)"
                class="text-teal-600 hover:text-teal-800 text-sm flex items-center gap-1"
              >
                View Details
              </button>
            </td>
          </tr>
          <tr v-if="!trainings.length">
            <td colspan="3" class="p-4 text-center text-gray-500">
              No trainings found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
