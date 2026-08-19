<script setup>
import { ref, onMounted, computed } from 'vue'
import Swal from 'sweetalert2'

// Reactive state
const loading = ref(false)
const bids = ref([])
const searchQuery = ref('')
const sortBy = ref('job_name')
const sortOrder = ref('asc')

// Mock data
const mockData = [
  { id: 1, job_name: 'Frontend Development (Vue.js)', status: 2, created_at: '2024-01-15' },
  { id: 2, job_name: 'Backend API Integration', status: 2, created_at: '2024-01-14' },
  { id: 3, job_name: 'UI/UX Design', status: 2, created_at: '2024-01-13' },
  { id: 4, job_name: 'Database Optimization', status: 2, created_at: '2024-01-12' },
]

// Computed properties
const filteredBids = computed(() => {
  let filtered = bids.value.filter(bid => 
    bid.job_name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
  
  // Sorting
  filtered.sort((a, b) => {
    const aVal = a[sortBy.value]
    const bVal = b[sortBy.value]
    
    if (sortOrder.value === 'asc') {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0
    } else {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0
    }
  })
  
  return filtered
})

const pendingCount = computed(() => bids.value.length)

// Methods
const fetchBids = async () => {
  loading.value = true
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Uncomment when API is ready:
    // const { data } = await api().get('get-bid-form')
    // bids.value = data.data.filter(e => e.status == 2)
    
    bids.value = mockData
  } catch (error) {
    showError('Failed to load skills', error.message)
  } finally {
    loading.value = false
  }
}

const approveSkill = async (bid) => {
  try {
    const result = await Swal.fire({
      title: 'Approve Skill?',
      html: `Are you sure you want to approve <strong>"${bid.job_name}"</strong>?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Approve!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#6b7280'
    })

    if (!result.isConfirmed) return

    // API call would go here:
    // await api().post(`update-status/${bid.id}`, { status: 3 })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Remove from list
    bids.value = bids.value.filter(item => item.id !== bid.id)
    
    await Swal.fire({
      icon: 'success',
      title: 'Skill Approved!',
      text: `"${bid.job_name}" has been approved successfully.`,
      showConfirmButton: false,
      timer: 2000
    })
    
  } catch (error) {
    showError('Approval Failed', error.response?.data?.message || error.message)
  }
}

const approveAllSkills = async () => {
  if (!bids.value.length) return
  
  try {
    const result = await Swal.fire({
      title: 'Approve All Skills?',
      html: `Are you sure you want to approve all <strong>${bids.value.length}</strong> pending skills?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes, Approve All!`,
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#6b7280'
    })

    if (!result.isConfirmed) return

    loading.value = true
    
    // API call for bulk approval would go here
    // await api().post('bulk-approve-skills', { 
    //   ids: bids.value.map(bid => bid.id) 
    // })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Clear all bids
    bids.value = []
    
    await Swal.fire({
      icon: 'success',
      title: 'All Skills Approved!',
      showConfirmButton: false,
      timer: 2000
    })
    
  } catch (error) {
    showError('Bulk Approval Failed', error.message)
  } finally {
    loading.value = false
  }
}

const showError = (title, message) => {
  Swal.fire({
    icon: 'error',
    title,
    text: message,
    confirmButtonColor: '#10b981'
  })
}

const toggleSort = (field) => {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = field
    sortOrder.value = 'asc'
  }
}

// Lifecycle
onMounted(fetchBids)
</script>

<template>
  <div class="container mx-auto p-4 max-w-6xl">
    <!-- Header -->
    <div class="bg-teal-700 text-white p-6 mb-6 rounded-lg shadow-md">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold mb-2">Pending Skills Approval</h1>
          <p class="text-teal-100">Review and approve submitted skills</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="bg-teal-600 px-3 py-1 rounded-full text-sm font-medium">
            {{ pendingCount }} pending
          </span>
          <!-- <button 
            v-if="bids.length > 0"
            @click="approveAllSkills"
            class="btn btn-success text-white"
            :disabled="loading"
          >
            Approve All
          </button> -->
        </div>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="bg-white p-4 rounded-lg shadow-md mb-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search skills..."
            class="input input-bordered w-full"
          />
        </div>
        <div class="flex gap-2">
          <button 
            @click="toggleSort('job_name')"
            class="btn btn-outline btn-sm"
          >
            Sort by Name 
            <span v-if="sortBy === 'job_name'" class="ml-1">
              {{ sortOrder === 'asc' ? '↑' : '↓' }}
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center p-12">
      <div class="text-center">
        <span class="loading loading-spinner loading-lg text-teal-600 mb-4"></span>
        <p class="text-gray-600">Loading pending skills...</p>
      </div>
    </div>

    <!-- Skills Table -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr class="bg-teal-700 text-white">
              <th class="p-4 text-left font-semibold">Skill Name</th>
              <th class="p-4 text-center font-semibold w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="bid in filteredBids" 
              :key="bid.id" 
              class="border-b hover:bg-gray-50 transition-colors"
            >
              <td class="p-4">
                <div class="font-medium text-gray-900">{{ bid.job_name }}</div>
                <div class="text-sm text-gray-500 mt-1">
                  Submitted on {{ bid.created_at }}
                </div>
              </td>
              <td class="p-4">
                <div class="flex justify-center gap-2">
                  <button
                    @click="approveSkill(bid)"
                    class="btn btn-sm btn-success text-white px-4"
                    title="Approve this skill"
                  >
                    Approve
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="!filteredBids.length">
              <td colspan="2" class="p-8 text-center">
                <div class="text-gray-500">
                  <template v-if="searchQuery">
                    No skills found matching "{{ searchQuery }}"
                  </template>
                  <template v-else>
                    No pending skills found
                  </template>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>