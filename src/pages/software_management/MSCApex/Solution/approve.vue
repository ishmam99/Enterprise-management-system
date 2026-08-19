<script setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'

const loading = ref(false)
const solutions = ref([])

// ✅ Mock data for solutions
const mockData = [
  { 
    id: 1, 
    solution_name: 'E-commerce Platform with Vue.js & Node.js',
    freelancer: 'John Smith',
    rating: 4.8,
    budget: '$5,000',
    timeline: '3 months',
    status: 2 
  },
  { 
    id: 2, 
    solution_name: 'Mobile App UI/UX Design - Food Delivery',
    freelancer: 'Sarah Johnson',
    rating: 4.9,
    budget: '$3,200',
    timeline: '6 weeks',
    status: 2 
  },
  { 
    id: 3, 
    solution_name: 'Database Optimization & Performance Tuning',
    freelancer: 'Mike Chen',
    rating: 4.7,
    budget: '$2,500',
    timeline: '2 weeks',
    status: 2 
  },
  { 
    id: 4, 
    solution_name: 'API Integration Framework with React',
    freelancer: 'Alex Rodriguez',
    rating: 4.6,
    budget: '$4,000',
    timeline: '1 month',
    status: 2 
  },
  { 
    id: 5, 
    solution_name: 'Cloud Migration to AWS - Complete Setup',
    freelancer: 'Emily Watson',
    rating: 4.9,
    budget: '$6,000',
    timeline: '2 months',
    status: 2 
  },
  { 
    id: 6, 
    solution_name: 'Payment Gateway Integration Solution',
    freelancer: 'David Kim',
    rating: 4.5,
    budget: '$2,800',
    timeline: '3 weeks',
    status: 2 
  }
]

// Fetch pending solutions
const fetchSolutions = async () => {
  loading.value = true
  try {
    // Uncomment this when API is ready
    // const { data } = await api().get('get-pending-solutions')
    // solutions.value = data.data.filter(e => e.status == 2)

    // ✅ Using mock data for now
    solutions.value = mockData
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Failed to load solutions',
      text: error.message,
      confirmButtonColor: '#3abff8'
    })
  } finally {
    loading.value = false
  }
}

// Approve solution
const approveSolution = async (id) => {
  try {
    const solution = solutions.value.find(s => s.id === id)
    
    const result = await Swal.fire({
      title: 'Approve Solution?',
      html: `
        <div class="text-left">
          <p>Are you sure you want to approve this solution?</p>
          <div class="mt-3 bg-blue-50 p-3 rounded">
            <p><strong>Solution:</strong> ${solution.solution_name}</p>
            <p><strong>Freelancer:</strong> ${solution.freelancer}</p>
            <p><strong>Budget:</strong> ${solution.budget} | <strong>Timeline:</strong> ${solution.timeline}</p>
          </div>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3abff8',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Approve Solution!',
      cancelButtonText: 'Cancel'
    })

    if (!result.isConfirmed) return

    // await api().post(`approve-solution/${id}`, { status: 3 })

    Swal.fire({
      icon: 'success',
      title: 'Solution Approved!',
      html: `
        <div class="text-center">
          <p>The solution has been approved successfully!</p>
          <div class="mt-3 bg-green-50 p-3 rounded">
            <p><strong>${solution.solution_name}</strong></p>
            <p>by ${solution.freelancer}</p>
          </div>
        </div>
      `,
      showConfirmButton: false,
      timer: 2000
    })

    // ✅ Remove the approved solution from the list
    solutions.value = solutions.value.filter(solution => solution.id !== id)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Approval Failed',
      text: error.response?.data?.message || error.message,
      confirmButtonColor: '#3abff8'
    })
  }
}

// View solution details
const viewSolutionDetails = (solution) => {
  Swal.fire({
    title: 'Solution Details',
    html: `
      <div class="text-left">
        <div class="mb-4">
          <h3 class="font-bold text-lg mb-2">Solution:</h3>
          <p class="text-gray-700">${solution.solution_name}</p>
        </div>
        
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Freelancer:</strong><br>
            ${solution.freelancer}
          </div>
          <div>
            <strong>Rating:</strong><br>
            ⭐ ${solution.rating}/5.0
          </div>
          <div>
            <strong>Budget:</strong><br>
            ${solution.budget}
          </div>
          <div>
            <strong>Timeline:</strong><br>
            ${solution.timeline}
          </div>
        </div>
        
        <div class="bg-gray-100 p-3 rounded">
          <p class="text-sm text-gray-600">Full proposal details and technical specifications would be shown here in the actual implementation.</p>
        </div>
      </div>
    `,
    width: '600px',
    confirmButtonColor: '#3abff8',
    confirmButtonText: 'Close'
  })
}

onMounted(fetchSolutions)
</script>

<template>
  <div class="container mx-auto p-4">
    <!-- Header -->
    <div class="flex items-center justify-between bg-teal-700 text-white p-4 mb-4 rounded-lg">
      <h1 class="text-xl font-bold">Solution Approval ({{ solutions.length }})</h1>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center p-8">
      <span class="loading loading-spinner loading-lg text-teal-600"></span>
    </div>

    <!-- Solutions Table -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <table class="table w-full">
        <thead>
          <tr class="bg-teal-700 text-white">
            <th class="p-3 border-e">Solution Details</th>
            <th class="p-3 border-e">Freelancer</th>
            <th class="p-3 border-e">Budget/Timeline</th>
            <th class="p-3 border-e">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="solution in solutions" :key="solution.id" class="border-b hover:bg-gray-50">
            <td class="p-3 border-e">
              <div class="font-medium text-gray-900">{{ solution.solution_name }}</div>
              <button 
                @click="viewSolutionDetails(solution)"
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
              <div class="font-medium">{{ solution.freelancer }}</div>
              <div class="flex items-center gap-1 text-sm text-gray-600">
                <span>⭐ {{ solution.rating }}</span>
              </div>
            </td>
            <td class="p-3 border-e">
              <div class="font-semibold text-green-600">{{ solution.budget }}</div>
              <div class="text-sm text-gray-600">{{ solution.timeline }}</div>
            </td>
            <td class="p-3 border-e">
              <button
                @click="approveSolution(solution.id)"
                class="btn btn-sm text-white btn-success w-full"
              >
                Approve
              </button>
            </td>
          </tr>
          <tr v-if="!solutions.length">
            <td colspan="4" class="p-4 text-center text-gray-500">
              No pending solutions found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>