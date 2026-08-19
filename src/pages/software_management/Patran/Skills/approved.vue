<script setup>
import { ref, onMounted, computed } from 'vue'
import Swal from 'sweetalert2'

// Reactive state
const loading = ref(false)
const approvedSkills = ref([])
const searchQuery = ref('')
const sortBy = ref('approved_date')
const sortOrder = ref('desc')

// Mock data for approved skills
const mockApprovedData = [
  { 
    id: 1, 
    job_name: 'Frontend Development (Vue.js)', 
    status: 3, 
    approved_date: '2024-01-20',
    approved_by: 'Admin User',
    category: 'Development'
  },
  { 
    id: 2, 
    job_name: 'Backend API Integration', 
    status: 3, 
    approved_date: '2024-01-19',
    approved_by: 'Admin User',
    category: 'Development'
  },
  { 
    id: 3, 
    job_name: 'UI/UX Design', 
    status: 3, 
    approved_date: '2024-01-18',
    approved_by: 'Manager',
    category: 'Design'
  },
  { 
    id: 4, 
    job_name: 'Database Optimization', 
    status: 3, 
    approved_date: '2024-01-17',
    approved_by: 'Admin User',
    category: 'Database'
  },
  { 
    id: 5, 
    job_name: 'Mobile App Development', 
    status: 3, 
    approved_date: '2024-01-16',
    approved_by: 'Manager',
    category: 'Development'
  },
  { 
    id: 6, 
    job_name: 'DevOps Engineering', 
    status: 3, 
    approved_date: '2024-01-15',
    approved_by: 'Admin User',
    category: 'Infrastructure'
  }
]

// Computed properties
const filteredSkills = computed(() => {
  let filtered = approvedSkills.value.filter(skill => 
    skill.job_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    skill.category.toLowerCase().includes(searchQuery.value.toLowerCase())
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

const approvedCount = computed(() => approvedSkills.value.length)

const categories = computed(() => {
  const uniqueCategories = [...new Set(approvedSkills.value.map(skill => skill.category))]
  return uniqueCategories.sort()
})

// Methods
const fetchApprovedSkills = async () => {
  loading.value = true
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Uncomment when API is ready:
    // const { data } = await api().get('get-approved-skills')
    // approvedSkills.value = data.data.filter(e => e.status == 3)
    
    approvedSkills.value = mockApprovedData
  } catch (error) {
    showError('Failed to load approved skills', error.message)
  } finally {
    loading.value = false
  }
}

const revokeSkill = async (skill) => {
  try {
    const result = await Swal.fire({
      title: 'Revoke Skill?',
      html: `Are you sure you want to revoke <strong>"${skill.job_name}"</strong>? This will move it back to pending status.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Revoke!',
      cancelButtonText: 'Keep Approved',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#10b981'
    })

    if (!result.isConfirmed) return

    // API call would go here:
    // await api().post(`update-status/${skill.id}`, { status: 2 })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Remove from approved list
    approvedSkills.value = approvedSkills.value.filter(item => item.id !== skill.id)
    
    await Swal.fire({
      icon: 'success',
      title: 'Skill Revoked!',
      text: `"${skill.job_name}" has been moved back to pending status.`,
      showConfirmButton: false,
      timer: 2000
    })
    
  } catch (error) {
    showError('Revoke Failed', error.response?.data?.message || error.message)
  }
}

const exportApprovedSkills = () => {
  // In a real app, this would generate a CSV or Excel file
  Swal.fire({
    icon: 'success',
    title: 'Export Started!',
    text: 'Your approved skills list is being prepared for download.',
    showConfirmButton: false,
    timer: 1500
  })
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

// Lifecycle
onMounted(fetchApprovedSkills)
</script>

<template>
  <div class="container mx-auto p-4 max-w-7xl">
    <!-- Header -->
    <div class="bg-green-700 text-white p-6 mb-6 rounded-lg shadow-md">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold mb-2">Approved Skills</h1>
          <p class="text-green-100">Manage and review approved skills in the system</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="bg-green-600 px-3 py-1 rounded-full text-sm font-medium">
            {{ approvedCount }} approved
          </span>
          <button 
            @click="exportApprovedSkills"
            class="btn btn-outline text-white border-white hover:bg-green-600"
            :disabled="loading || !approvedSkills.length"
          >
            Export List
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <!-- <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
        <div class="text-sm text-gray-600">Total Approved</div>
        <div class="text-2xl font-bold text-gray-800">{{ approvedCount }}</div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
        <div class="text-sm text-gray-600">Categories</div>
        <div class="text-2xl font-bold text-gray-800">{{ categories.length }}</div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
        <div class="text-sm text-gray-600">This Month</div>
        <div class="text-2xl font-bold text-gray-800">{{ approvedSkills.filter(s => new Date(s.approved_date).getMonth() === new Date().getMonth()).length }}</div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500">
        <div class="text-sm text-gray-600">Last Approved</div>
        <div class="text-sm font-semibold text-gray-800" v-if="approvedSkills.length">
          {{ formatDate(approvedSkills[0]?.approved_date) }}
        </div>
        <div class="text-sm text-gray-500" v-else>N/A</div>
      </div>
    </div> -->

    <!-- Search and Filters -->
    <div class="bg-white p-4 rounded-lg shadow-md mb-6">
      <div class="flex flex-col lg:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search skills or categories..."
            class="input input-bordered w-full"
          />
        </div>
        <div class="flex gap-2 flex-wrap">
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
            @click="toggleSort('approved_date')"
            class="btn btn-outline btn-sm"
          >
            Date 
            <span v-if="sortBy === 'approved_date'" class="ml-1">
              {{ sortOrder === 'desc' ? '↑' : '↓' }}
            </span>
          </button>
          <button 
            @click="toggleSort('category')"
            class="btn btn-outline btn-sm"
          >
            Category 
            <span v-if="sortBy === 'category'" class="ml-1">
              {{ sortOrder === 'asc' ? '↑' : '↓' }}
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center p-12">
      <div class="text-center">
        <span class="loading loading-spinner loading-lg text-green-600 mb-4"></span>
        <p class="text-gray-600">Loading approved skills...</p>
      </div>
    </div>

    <!-- Skills Table -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr class="bg-green-700 text-white">
              <th class="p-4 text-left font-semibold">Skill Name</th>
              <th class="p-4 text-left font-semibold">Category</th>
              <th class="p-4 text-left font-semibold">Approved Date</th>
              <th class="p-4 text-left font-semibold">Approved By</th>
              <th class="p-4 text-center font-semibold w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="skill in filteredSkills" 
              :key="skill.id" 
              class="border-b hover:bg-green-50 transition-colors"
            >
              <td class="p-4">
                <div class="font-medium text-gray-900">{{ skill.job_name }}</div>
              </td>
              <td class="p-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ skill.category }}
                </span>
              </td>
              <td class="p-4">
                <div class="text-sm text-gray-600">{{ formatDate(skill.approved_date) }}</div>
              </td>
              <td class="p-4">
                <div class="text-sm text-gray-600">{{ skill.approved_by }}</div>
              </td>
              <td class="p-4">
                <div class="flex justify-center gap-2">
                  <button
                    @click="revokeSkill(skill)"
                    class="btn btn-sm btn-error text-white px-3"
                    title="Revoke this skill"
                  >
                    Revoke
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="!filteredSkills.length">
              <td colspan="5" class="p-8 text-center">
                <div class="text-gray-500">
                  <template v-if="searchQuery">
                    No approved skills found matching "{{ searchQuery }}"
                  </template>
                  <template v-else>
                    No approved skills found
                  </template>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Additional Info -->
    <!-- <div class="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-yellow-800">
            Approved Skills Management
          </h3>
          <div class="mt-2 text-sm text-yellow-700">
            <p>Revoking a skill will move it back to pending status for review. This action can be undone by re-approving the skill.</p>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>