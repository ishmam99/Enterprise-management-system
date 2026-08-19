<script setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'

const loading = ref(false)
const industries = ref([])

// ✅ Mock data for industries
const mockData = [
  { id: 4, industry_name: 'Education & E-Learning', status: 2 },
  { id: 5, industry_name: 'E-Commerce & Retail', status: 2 },
  { id: 6, industry_name: 'Manufacturing & Engineering', status: 2 },
  { id: 7, industry_name: 'Real Estate & Construction', status: 2 },
  { id: 8, industry_name: 'Hospitality & Tourism', status: 2 }
]

// Fetch pending industries
const fetchIndustries = async () => {
  loading.value = true
  try {
    // Uncomment this when API is ready
    // const { data } = await api().get('get-pending-industries')
    // industries.value = data.data.filter(e => e.status == 2)

    // ✅ Using mock data for now
    industries.value = mockData
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Failed to load industries',
      text: error.message,
      confirmButtonColor: '#3abff8'
    })
  } finally {
    loading.value = false
  }
}

// Approve industry
const approveIndustry = async (id) => {
  try {
    const industry = industries.value.find(ind => ind.id === id)
    
    const result = await Swal.fire({
      title: 'Approve Industry?',
      html: `
        <div class="text-left">
          <p>Are you sure you want to approve this industry?</p>
          <div class="mt-3 bg-blue-50 p-3 rounded">
            <p><strong>Industry:</strong> ${industry.industry_name}</p>
          </div>
          <p class="text-sm text-gray-600 mt-2">This will make the industry available for users to select.</p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3abff8',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Approve Industry!',
      cancelButtonText: 'Cancel'
    })

    if (!result.isConfirmed) return

    // await api().post(`approve-industry/${id}`, { status: 3 })

    Swal.fire({
      icon: 'success',
      title: 'Industry Approved!',
      html: `
        <div class="text-center">
          <p>The industry has been approved successfully!</p>
          <div class="mt-3 bg-green-50 p-3 rounded">
            <p><strong>${industry.industry_name}</strong></p>
            <p class="text-sm text-gray-600">Now available for user selection</p>
          </div>
        </div>
      `,
      showConfirmButton: false,
      timer: 2000
    })

    // ✅ Remove the approved industry from the list
    industries.value = industries.value.filter(industry => industry.id !== id)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Approval Failed',
      text: error.response?.data?.message || error.message,
      confirmButtonColor: '#3abff8'
    })
  }
}

// View industry details
const viewIndustryDetails = (industry) => {
  Swal.fire({
    title: 'Industry Details',
    html: `
      <div class="text-left">
        <div class="mb-4">
          <h3 class="font-bold text-lg mb-2">Industry:</h3>
          <p class="text-gray-700 text-lg font-semibold">${industry.industry_name}</p>
        </div>
        
        <div class="bg-gray-100 p-3 rounded">
          <p class="text-sm text-gray-600">
            Industry category details and description would be shown here in the actual implementation.
            This includes sector information, related skills, and market data.
          </p>
        </div>
      </div>
    `,
    width: '500px',
    confirmButtonColor: '#3abff8',
    confirmButtonText: 'Close'
  })
}

onMounted(fetchIndustries)
</script>

<template>
  <div class="container mx-auto p-4">
    <!-- Header -->
    <div class="flex items-center justify-between bg-teal-700 text-white p-4 mb-4 rounded-lg">
      <h1 class="text-xl font-bold">Industry Broadcast ({{ industries.length }})</h1>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center p-8">
      <span class="loading loading-spinner loading-lg text-teal-600"></span>
    </div>

    <!-- Industries Table -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <table class="table w-full">
        <thead>
          <tr class="bg-teal-700 text-white">
            <th class="p-3 border-e">Industry Details</th>
            <th class="p-3 border-e">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="industry in industries" :key="industry.id" class="border-b hover:bg-gray-50">
            <td class="p-3 border-e">
              <div class="font-medium text-gray-900 text-lg">{{ industry.industry_name }}</div>
              <button 
                @click="viewIndustryDetails(industry)"
                class="text-teal-600 hover:text-teal-800 text-sm mt-1 flex items-center gap-1"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                View Details
              </button>
            </td>
            <td class="p-3 border-e">
              <button
                @click="approveIndustry(industry.id)"
                class="btn btn-sm text-white btn-info w-full"
              >
                Broadcast
              </button>
            </td>
          </tr>
          <tr v-if="!industries.length">
            <td colspan="2" class="p-4 text-center text-gray-500">
              No pending industries found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>