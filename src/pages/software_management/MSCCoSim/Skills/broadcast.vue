<script setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'

const loading = ref(false)
const bids = ref([])

// ✅ Mock data
const mockData = [
  { id: 1, job_name: 'Frontend Development (Vue.js)', status: 2 },
  { id: 2, job_name: 'Backend API Integration', status: 2 },
  { id: 3, job_name: 'UI/UX Design', status: 2 },
  { id: 4, job_name: 'Database Optimization', status: 2 },
]

// Fetch pending bids (skills)
const fetchBids = async () => {
  loading.value = true
  try {
    // Uncomment this when API is ready
    // const { data } = await api().get('get-bid-form')
    // bids.value = data.data.filter(e => e.status == 2)

    // ✅ Using mock data for now
    bids.value = mockData
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Failed to load skills',
      text: error.message,
      confirmButtonColor: '#3abff8'
    })
  } finally {
    loading.value = false
  }
}

// Approve skill
const approveSkill = async (id) => {
  try {
    const result = await Swal.fire({
      title: 'Approve Skill?',
      text: 'Do you want to approve this skill?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3abff8',
      cancelButtonColor: '#d33'
    })

    if (!result.isConfirmed) return

    // await api().post(`update-status/${id}`, { status: 3 })

    Swal.fire({
      icon: 'success',
      title: 'Skill Approved!',
      showConfirmButton: false,
      timer: 1500
    })

    // ✅ Remove the approved skill from the list
    bids.value = bids.value.filter(bid => bid.id !== id)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Approval Failed',
      text: error.response?.data?.message || error.message,
      confirmButtonColor: '#3abff8'
    })
  }
}

onMounted(fetchBids)
</script>

<template>
  <div class="container mx-auto p-4">
    <!-- Header -->
    <div class="flex items-center justify-between bg-teal-700 text-white p-4 mb-4 rounded-lg">
      <h1 class="text-xl font-bold">Skill Broadcast ({{ bids.length }})</h1>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center p-8">
      <span class="loading loading-spinner loading-lg text-teal-600"></span>
    </div>

    <!-- Skills Table -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <table class="table w-full">
        <thead>
          <tr class="bg-teal-700 text-white">
            <th class="p-3 border-e">Skill Name</th>
            <th class="p-3 border-e">Broadcast</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="bid in bids" :key="bid.id" class="border-b hover:bg-gray-50">
            <td class="p-3 border-e font-medium">{{ bid.job_name }}</td>
            <td class="p-3 border-e">
              <button
                @click="approveSkill(bid.id)"
                class="btn btn-sm text-white btn-primary w-full"
              >
                Broadcast
              </button>
            </td>
          </tr>
          <tr v-if="!bids.length">
            <td colspan="2" class="p-4 text-center text-gray-500">
              No pending skills found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
