<script setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'

const loading = ref(false)
const broadcasts = ref([])

// ✅ Mock data for broadcasts
const mockData = [
  { 
    id: 1, 
    project_name: 'E-commerce Platform Development',
    client: 'TechCorp Inc.',
    budget: '$15,000',
    duration: '3 months',
    applicants: 12,
    status: 'active',
    posted_date: '2024-01-20',
    expiry_date: '2024-02-20'
  },
  { 
    id: 2, 
    project_name: 'Mobile App UI/UX Design',
    client: 'Foodie Delivery',
    budget: '$8,000',
    duration: '2 months',
    applicants: 8,
    status: 'active',
    posted_date: '2024-01-19',
    expiry_date: '2024-02-19'
  },
  { 
    id: 3, 
    project_name: 'Database Optimization Project',
    client: 'DataSystems LLC',
    budget: '$6,500',
    duration: '1 month',
    applicants: 5,
    status: 'active',
    posted_date: '2024-01-18',
    expiry_date: '2024-02-18'
  },
  { 
    id: 4, 
    project_name: 'API Integration Framework',
    client: 'ConnectTech Solutions',
    budget: '$12,000',
    duration: '2 months',
    applicants: 15,
    status: 'active',
    posted_date: '2024-01-17',
    expiry_date: '2024-02-17'
  },
  { 
    id: 5, 
    project_name: 'Cloud Migration Setup',
    client: 'Enterprise Cloud Co.',
    budget: '$20,000',
    duration: '4 months',
    applicants: 9,
    status: 'active',
    posted_date: '2024-01-16',
    expiry_date: '2024-02-16'
  },
  { 
    id: 6, 
    project_name: 'Payment System Integration',
    client: 'FinTech Global',
    budget: '$10,000',
    duration: '6 weeks',
    applicants: 11,
    status: 'active',
    posted_date: '2024-01-15',
    expiry_date: '2024-02-15'
  }
]

// Fetch active broadcasts
const fetchBroadcasts = async () => {
  loading.value = true
  try {
    // Uncomment this when API is ready
    // const { data } = await api().get('get-active-broadcasts')
    // broadcasts.value = data.data

    // ✅ Using mock data for now
    broadcasts.value = mockData
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Failed to load broadcasts',
      text: error.message,
      confirmButtonColor: '#3abff8'
    })
  } finally {
    loading.value = false
  }
}

// End broadcast
const endBroadcast = async (id) => {
  try {
    const broadcast = broadcasts.value.find(b => b.id === id)
    
    const result = await Swal.fire({
      title: 'End Broadcast?',
      html: `
        <div class="text-left">
          <p>Are you sure you want to end this broadcast?</p>
          <div class="mt-3 bg-blue-50 p-3 rounded">
            <p><strong>Project:</strong> ${broadcast.project_name}</p>
            <p><strong>Client:</strong> ${broadcast.client}</p>
            <p><strong>Applicants:</strong> ${broadcast.applicants} | <strong>Status:</strong> ${broadcast.status}</p>
          </div>
          <p class="text-sm text-gray-600 mt-2">This will stop receiving new applications.</p>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3abff8',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, End Broadcast!',
      cancelButtonText: 'Keep Active'
    })

    if (!result.isConfirmed) return

    // await api().post(`end-broadcast/${id}`)

    Swal.fire({
      icon: 'success',
      title: 'Broadcast Ended!',
      html: `
        <div class="text-center">
          <p>The broadcast has been ended successfully!</p>
          <div class="mt-3 bg-green-50 p-3 rounded">
            <p><strong>${broadcast.project_name}</strong></p>
            <p>No longer accepting applications</p>
          </div>
        </div>
      `,
      showConfirmButton: false,
      timer: 2000
    })

    // ✅ Remove the ended broadcast from the list
    broadcasts.value = broadcasts.value.filter(broadcast => broadcast.id !== id)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Failed to End Broadcast',
      text: error.response?.data?.message || error.message,
      confirmButtonColor: '#3abff8'
    })
  }
}

// View broadcast details
const viewBroadcastDetails = (broadcast) => {
  Swal.fire({
    title: 'Broadcast Details',
    html: `
      <div class="text-left">
        <div class="mb-4">
          <h3 class="font-bold text-lg mb-2">Project:</h3>
          <p class="text-gray-700">${broadcast.project_name}</p>
        </div>
        
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Client:</strong><br>
            ${broadcast.client}
          </div>
          <div>
            <strong>Status:</strong><br>
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              ${broadcast.status}
            </span>
          </div>
          <div>
            <strong>Budget:</strong><br>
            ${broadcast.budget}
          </div>
          <div>
            <strong>Duration:</strong><br>
            ${broadcast.duration}
          </div>
          <div>
            <strong>Applicants:</strong><br>
            👥 ${broadcast.applicants}
          </div>
          <div>
            <strong>Posted Date:</strong><br>
            ${new Date(broadcast.posted_date).toLocaleDateString()}
          </div>
        </div>
        
        <div class="bg-gray-100 p-3 rounded">
          <p class="text-sm text-gray-600">Full project requirements, scope, and applicant details would be shown here in the actual implementation.</p>
        </div>
      </div>
    `,
    width: '600px',
    confirmButtonColor: '#3abff8',
    confirmButtonText: 'Close'
  })
}

// View applicants
const viewApplicants = (broadcast) => {
  Swal.fire({
    title: `Applicants for ${broadcast.project_name}`,
    html: `
      <div class="text-left">
        <div class="mb-4">
          <p class="text-lg font-semibold">Total Applicants: ${broadcast.applicants}</p>
        </div>
        
        <div class="bg-blue-50 p-4 rounded-lg mb-4">
          <h4 class="font-bold mb-2">Applicant Summary:</h4>
          <div class="grid grid-cols-2 gap-2 text-sm">
            <div>✅ Shortlisted: 3</div>
            <div>⏳ Pending Review: ${broadcast.applicants - 3}</div>
            <div>⭐ Top Rated: 2</div>
            <div>💼 Experienced: 4</div>
          </div>
        </div>
        
        <div class="bg-gray-100 p-3 rounded">
          <p class="text-sm text-gray-600">Detailed applicant list with profiles, ratings, and proposals would be shown here in the actual implementation.</p>
        </div>
      </div>
    `,
    width: '500px',
    confirmButtonColor: '#3abff8',
    confirmButtonText: 'Close'
  })
}

onMounted(fetchBroadcasts)
</script>

<template>
  <div class="container mx-auto p-4">
    <!-- Header -->
    <div class="flex items-center justify-between bg-blue-700 text-white p-4 mb-4 rounded-lg">
      <h1 class="text-xl font-bold">Active Broadcasts ({{ broadcasts.length }})</h1>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center p-8">
      <span class="loading loading-spinner loading-lg text-blue-600"></span>
    </div>

    <!-- Broadcasts Table -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <table class="table w-full">
        <thead>
          <tr class="bg-blue-700 text-white">
            <th class="p-3 border-e">Project Details</th>
            <th class="p-3 border-e">Client</th>
            <th class="p-3 border-e">Budget/Duration</th>
            <th class="p-3 border-e">Applicants</th>
            <th class="p-3 border-e">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="broadcast in broadcasts" :key="broadcast.id" class="border-b hover:bg-gray-50">
            <td class="p-3 border-e">
              <div class="font-medium text-gray-900">{{ broadcast.project_name }}</div>
              <div class="flex items-center gap-2 mt-1">
                <button 
                  @click="viewBroadcastDetails(broadcast)"
                  class="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  View Details
                </button>
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {{ broadcast.status }}
                </span>
              </div>
            </td>
            <td class="p-3 border-e">
              <div class="font-medium">{{ broadcast.client }}</div>
              <div class="text-sm text-gray-600">
                Posted: {{ new Date(broadcast.posted_date).toLocaleDateString() }}
              </div>
            </td>
            <td class="p-3 border-e">
              <div class="font-semibold text-green-600">{{ broadcast.budget }}</div>
              <div class="text-sm text-gray-600">{{ broadcast.duration }}</div>
            </td>
            <td class="p-3 border-e">
              <button 
                @click="viewApplicants(broadcast)"
                class="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                👥 {{ broadcast.applicants }}
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </td>
            <td class="p-3 border-e">
              <button
                @click="endBroadcast(broadcast.id)"
                class="btn btn-sm text-white btn-error w-full"
              >
                End Broadcast
              </button>
            </td>
          </tr>
          <tr v-if="!broadcasts.length">
            <td colspan="5" class="p-4 text-center text-gray-500">
              No active broadcasts found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>