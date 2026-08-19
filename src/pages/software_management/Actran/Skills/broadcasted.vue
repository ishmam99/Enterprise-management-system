<script setup>
import { ref, onMounted, computed } from 'vue'
import Swal from 'sweetalert2'

// Reactive state
const loading = ref(false)
const broadcasts = ref([])
const searchQuery = ref('')
const sortBy = ref('broadcast_date')
const sortOrder = ref('desc')
const selectedStatus = ref('all')

// Mock data for broadcasted skills
const mockBroadcastData = [
  { 
    id: 1, 
    job_name: 'Frontend Development (Vue.js)', 
    status: 'active',
    broadcast_date: '2024-01-20',
    expiry_date: '2024-02-20',
    applicants: 12,
    views: 45,
    category: 'Development',
    budget: '$5,000',
    duration: '3 months'
  },
  { 
    id: 2, 
    job_name: 'Backend API Integration', 
    status: 'active',
    broadcast_date: '2024-01-19',
    expiry_date: '2024-02-19',
    applicants: 8,
    views: 32,
    category: 'Development',
    budget: '$3,500',
    duration: '2 months'
  },
  { 
    id: 3, 
    job_name: 'UI/UX Design', 
    status: 'completed',
    broadcast_date: '2024-01-15',
    expiry_date: '2024-02-15',
    applicants: 15,
    views: 67,
    category: 'Design',
    budget: '$4,200',
    duration: '1 month'
  },
  { 
    id: 4, 
    job_name: 'Database Optimization', 
    status: 'active',
    broadcast_date: '2024-01-18',
    expiry_date: '2024-02-18',
    applicants: 6,
    views: 28,
    category: 'Database',
    budget: '$2,800',
    duration: '1 month'
  },
  { 
    id: 5, 
    job_name: 'Mobile App Development', 
    status: 'expired',
    broadcast_date: '2024-01-10',
    expiry_date: '2024-02-10',
    applicants: 20,
    views: 89,
    category: 'Development',
    budget: '$6,000',
    duration: '4 months'
  },
  { 
    id: 6, 
    job_name: 'DevOps Engineering', 
    status: 'active',
    broadcast_date: '2024-01-22',
    expiry_date: '2024-02-22',
    applicants: 9,
    views: 35,
    category: 'Infrastructure',
    budget: '$4,500',
    duration: '3 months'
  }
]

// Computed properties
const filteredBroadcasts = computed(() => {
  let filtered = broadcasts.value.filter(broadcast => 
    broadcast.job_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    broadcast.category.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
  
  // Filter by status
  if (selectedStatus.value !== 'all') {
    filtered = filtered.filter(broadcast => broadcast.status === selectedStatus.value)
  }
  
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

const broadcastCount = computed(() => broadcasts.value.length)

const statusCounts = computed(() => {
  const counts = {
    all: broadcasts.value.length,
    active: broadcasts.value.filter(b => b.status === 'active').length,
    completed: broadcasts.value.filter(b => b.status === 'completed').length,
    expired: broadcasts.value.filter(b => b.status === 'expired').length
  }
  return counts
})

const totalApplicants = computed(() => {
  return broadcasts.value.reduce((sum, broadcast) => sum + broadcast.applicants, 0)
})

const totalViews = computed(() => {
  return broadcasts.value.reduce((sum, broadcast) => sum + broadcast.views, 0)
})

// Methods
const fetchBroadcasts = async () => {
  loading.value = true
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Uncomment when API is ready:
    // const { data } = await api().get('get-broadcasts')
    // broadcasts.value = data.data
    
    broadcasts.value = mockBroadcastData
  } catch (error) {
    showError('Failed to load broadcasts', error.message)
  } finally {
    loading.value = false
  }
}

const endBroadcast = async (broadcast) => {
  try {
    const result = await Swal.fire({
      title: 'End Broadcast?',
      html: `Are you sure you want to end the broadcast for <strong>"${broadcast.job_name}"</strong>? This will stop receiving new applications.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, End Broadcast!',
      cancelButtonText: 'Keep Active',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#10b981'
    })

    if (!result.isConfirmed) return

    // API call would go here:
    // await api().post(`end-broadcast/${broadcast.id}`)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Update status locally
    const index = broadcasts.value.findIndex(b => b.id === broadcast.id)
    if (index !== -1) {
      broadcasts.value[index].status = 'completed'
    }
    
    await Swal.fire({
      icon: 'success',
      title: 'Broadcast Ended!',
      text: `"${broadcast.job_name}" is no longer accepting applications.`,
      showConfirmButton: false,
      timer: 2000
    })
    
  } catch (error) {
    showError('Failed to end broadcast', error.response?.data?.message || error.message)
  }
}

const renewBroadcast = async (broadcast) => {
  try {
    const result = await Swal.fire({
      title: 'Renew Broadcast?',
      html: `Do you want to renew the broadcast for <strong>"${broadcast.job_name}"</strong> for another 30 days?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Renew!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#6b7280'
    })

    if (!result.isConfirmed) return

    // API call would go here:
    // await api().post(`renew-broadcast/${broadcast.id}`)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Update locally
    const index = broadcasts.value.findIndex(b => b.id === broadcast.id)
    if (index !== -1) {
      const newExpiry = new Date()
      newExpiry.setDate(newExpiry.getDate() + 30)
      broadcasts.value[index].status = 'active'
      broadcasts.value[index].expiry_date = newExpiry.toISOString().split('T')[0]
    }
    
    await Swal.fire({
      icon: 'success',
      title: 'Broadcast Renewed!',
      text: `"${broadcast.job_name}" is now active for another 30 days.`,
      showConfirmButton: false,
      timer: 2000
    })
    
  } catch (error) {
    showError('Failed to renew broadcast', error.response?.data?.message || error.message)
  }
}

const viewApplicants = (broadcast) => {
  Swal.fire({
    title: `Applicants for "${broadcast.job_name}"`,
    html: `
      <div class="text-left">
        <p class="mb-2"><strong>Total Applicants:</strong> ${broadcast.applicants}</p>
        <p class="mb-4"><strong>Total Views:</strong> ${broadcast.views}</p>
        <div class="bg-gray-100 p-3 rounded">
          <p class="text-sm text-gray-600">Applicant details would be shown here in a real implementation.</p>
        </div>
      </div>
    `,
    confirmButtonColor: '#3b82f6',
    confirmButtonText: 'Close'
  })
}

const exportBroadcasts = () => {
  Swal.fire({
    icon: 'success',
    title: 'Export Started!',
    text: 'Your broadcast list is being prepared for download.',
    showConfirmButton: false,
    timer: 1500
  })
}

const showError = (title, message) => {
  Swal.fire({
    icon: 'error',
    title,
    text: message,
    confirmButtonColor: '#3b82f6'
  })
}

const toggleSort = (field) => {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = field
    sortOrder.value = 'desc'
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getStatusBadgeClass = (status) => {
  const classes = {
    active: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    expired: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const isExpiringSoon = (expiryDate) => {
  const expiry = new Date(expiryDate)
  const today = new Date()
  const diffTime = expiry - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays <= 3 && diffDays > 0
}

// Lifecycle
onMounted(fetchBroadcasts)
</script>

<template>
  <div class="container mx-auto p-4 max-w-7xl">
    <!-- Header -->
    <div class="bg-blue-700 text-white p-6 mb-6 rounded-lg shadow-md">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold mb-2">Broadcasted Skills</h1>
          <p class="text-blue-100">Manage and monitor all broadcasted skills and their performance</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="bg-blue-600 px-3 py-1 rounded-full text-sm font-medium">
            {{ broadcastCount }} total
          </span>
          <button 
            @click="exportBroadcasts"
            class="btn btn-outline text-white border-white hover:bg-blue-600"
            :disabled="loading || !broadcasts.length"
          >
            Export List
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <!-- <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
        <div class="text-sm text-gray-600">Total Broadcasts</div>
        <div class="text-2xl font-bold text-gray-800">{{ broadcastCount }}</div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
        <div class="text-sm text-gray-600">Active Broadcasts</div>
        <div class="text-2xl font-bold text-gray-800">{{ statusCounts.active }}</div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
        <div class="text-sm text-gray-600">Total Applicants</div>
        <div class="text-2xl font-bold text-gray-800">{{ totalApplicants }}</div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500">
        <div class="text-sm text-gray-600">Total Views</div>
        <div class="text-2xl font-bold text-gray-800">{{ totalViews }}</div>
      </div>
    </div> -->

    <!-- Search and Filters -->
    <div class="bg-white p-4 rounded-lg shadow-md mb-6">
      <div class="flex flex-col lg:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search broadcasts or categories..."
            class="input input-bordered w-full"
          />
        </div>
        <div class="flex gap-2 flex-wrap">
          <select v-model="selectedStatus" class="select select-bordered select-sm">
            <option value="all">All Status ({{ statusCounts.all }})</option>
            <option value="active">Active ({{ statusCounts.active }})</option>
            <option value="completed">Completed ({{ statusCounts.completed }})</option>
            <option value="expired">Expired ({{ statusCounts.expired }})</option>
          </select>
          <button 
            @click="toggleSort('job_name')"
            class="btn btn-outline btn-sm"
          >
            Name 
            <span v-if="sortBy === 'job_name'" class="ml-1">
              {{ sortOrder === 'asc' ? '↑' : '↓' }}
            </span>
          </button>
          <button 
            @click="toggleSort('broadcast_date')"
            class="btn btn-outline btn-sm"
          >
            Date 
            <span v-if="sortBy === 'broadcast_date'" class="ml-1">
              {{ sortOrder === 'desc' ? '↑' : '↓' }}
            </span>
          </button>
          <button 
            @click="toggleSort('applicants')"
            class="btn btn-outline btn-sm"
          >
            Applicants 
            <span v-if="sortBy === 'applicants'" class="ml-1">
              {{ sortOrder === 'desc' ? '↑' : '↓' }}
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center p-12">
      <div class="text-center">
        <span class="loading loading-spinner loading-lg text-blue-600 mb-4"></span>
        <p class="text-gray-600">Loading broadcasts...</p>
      </div>
    </div>

    <!-- Broadcasts Table -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr class="bg-blue-700 text-white">
              <th class="p-4 text-left font-semibold">Skill Name</th>
              <th class="p-4 text-left font-semibold">Category</th>
              <th class="p-4 text-left font-semibold">Budget/Duration</th>
              <th class="p-4 text-left font-semibold">Dates</th>
              <!-- <th class="p-4 text-left font-semibold">Performance</th> -->
              <th class="p-4 text-left font-semibold">Status</th>
              <th class="p-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="broadcast in filteredBroadcasts" 
              :key="broadcast.id" 
              class="border-b hover:bg-blue-50 transition-colors"
            >
              <td class="p-4">
                <div class="font-medium text-gray-900">{{ broadcast.job_name }}</div>
                <div class="text-xs text-gray-500 mt-1">ID: {{ broadcast.id }}</div>
              </td>
              <td class="p-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ broadcast.category }}
                </span>
              </td>
              <td class="p-4">
                <div class="font-semibold text-gray-900">{{ broadcast.budget }}</div>
                <div class="text-sm text-gray-500">{{ broadcast.duration }}</div>
              </td>
              <td class="p-4">
                <div class="text-sm">
                  <div class="text-gray-600">From: {{ formatDate(broadcast.broadcast_date) }}</div>
                  <div :class="['font-medium', isExpiringSoon(broadcast.expiry_date) ? 'text-orange-600' : 'text-gray-600']">
                    To: {{ formatDate(broadcast.expiry_date) }}
                    <span v-if="isExpiringSoon(broadcast.expiry_date)" class="text-xs text-orange-500 ml-1">(Soon)</span>
                  </div>
                </div>
              </td>
              <!-- <td class="p-4">
                <div class="text-sm">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="font-medium">👥 {{ broadcast.applicants }} applicants</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="font-medium">👀 {{ broadcast.views }} views</span>
                  </div>
                </div>
              </td> -->
              <td class="p-4">
                <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', getStatusBadgeClass(broadcast.status)]">
                  {{ broadcast.status.charAt(0).toUpperCase() + broadcast.status.slice(1) }}
                </span>
              </td>
              <td class="p-4">
                <div class="flex justify-center gap-2">
                  <button
                    @click="viewApplicants(broadcast)"
                    class="btn btn-sm btn-info text-white px-3"
                    title="View applicants"
                  >
                    View
                  </button>
                  <button
                    v-if="broadcast.status === 'active'"
                    @click="endBroadcast(broadcast)"
                    class="btn btn-sm btn-error text-white px-3"
                    title="End broadcast"
                  >
                    End
                  </button>
                  <button
                    v-if="broadcast.status === 'expired'"
                    @click="renewBroadcast(broadcast)"
                    class="btn btn-sm btn-success text-white px-3"
                    title="Renew broadcast"
                  >
                    Renew
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="!filteredBroadcasts.length">
              <td colspan="7" class="p-8 text-center">
                <div class="text-gray-500">
                  <template v-if="searchQuery || selectedStatus !== 'all'">
                    No broadcasts found matching your criteria
                  </template>
                  <template v-else>
                    No broadcasts found
                  </template>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Additional Info -->
    <!-- <div class="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-blue-800">
            Broadcast Management Guide
          </h3>
          <div class="mt-2 text-sm text-blue-700">
            <ul class="list-disc list-inside space-y-1">
              <li><strong>Active:</strong> Currently accepting applications</li>
              <li><strong>Completed:</strong> Manually ended by admin</li>
              <li><strong>Expired:</strong> Automatically ended after expiry date</li>
              <li>Expiring broadcasts (within 3 days) are highlighted in orange</li>
              <li>Use "Renew" to extend expired broadcasts for another 30 days</li>
            </ul>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>