<script setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'

const loading = ref(false)
const trainings = ref([])

// ✅ Mock data for MSC
const mockData = [
  { id: 1, title: 'MSC Training Batch 01', status: 'Pending' },
  { id: 2, title: 'MSC Advanced Workshop', status: 'Ongoing' },
  { id: 3, title: 'MSC Skill Development', status: 'Completed' }
]

// Fetch MSC trainings
const fetchTrainings = async () => {
  loading.value = true
  try {
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

const broadcastTraining = async (training) => {
  const result = await Swal.fire({
    title: 'Broadcast Training?',
    html: `<div class="text-left">
            <p>Are you sure you want to broadcast this training?</p>
            <div class="mt-3 bg-blue-50 p-3 rounded">
              <p><strong>Training:</strong> ${training.title}</p>
            </div>
           </div>`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3abff8',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Yes, Broadcast!',
    cancelButtonText: 'Cancel'
  })

  if (!result.isConfirmed) return

  Swal.fire({
    icon: 'success',
    title: 'Broadcast Sent!',
    html: `<p>The training <strong>${training.title}</strong> has been broadcast successfully.</p>`,
    showConfirmButton: false,
    timer: 2000
  })
}

onMounted(fetchTrainings)
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="flex items-center justify-between bg-teal-700 text-white p-4 mb-4 rounded-lg">
      <h1 class="text-xl font-bold">MSC Training Broadcast ({{ trainings.length }})</h1>
    </div>

    <div v-if="loading" class="flex justify-center p-8">
      <span class="loading loading-spinner loading-lg text-teal-600"></span>
    </div>

    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <table class="table w-full">
        <thead>
          <tr class="bg-teal-700 text-white">
            <th class="p-3 border-e">Training Name</th>
            <th class="p-3 border-e">Status</th>
            <th class="p-3 border-e">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="training in trainings" :key="training.id" class="border-b hover:bg-gray-50">
            <td class="p-3 border-e text-gray-900 font-medium text-lg">{{ training.title }}</td>
            <td class="p-3 border-e">
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                :class="training.status === 'Ongoing' ? 'bg-blue-100 text-blue-800' : training.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'"
              >
                {{ training.status }}
              </span>
            </td>
            <td class="p-3 border-e">
              <button
                @click="broadcastTraining(training)"
                class="btn btn-sm text-white btn-info flex-1"
              >
                Broadcast
              </button>
            </td>
          </tr>
          <tr v-if="!trainings.length">
            <td colspan="3" class="p-4 text-center text-gray-500">
              No trainings available for broadcast
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
