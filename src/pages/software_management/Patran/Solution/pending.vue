<script setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'

const loading = ref(false)
const pendingProjects = ref([])

// ✅ Mock data for pending projects
const mockData = [
  { 
    id: 1, 
    project_name: 'E-commerce Platform Development',
    client: 'TechCorp Inc.',
    budget: '$15,000',
    duration: '3 months',
    applicants: 12,
    status: 'pending',
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
    status: 'pending',
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
    status: 'pending',
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
    status: 'pending',
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
    status: 'pending',
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
    status: 'pending',
    posted_date: '2024-01-15',
    expiry_date: '2024-02-15'
  }
]

// Fetch pending projects
const fetchPendingProjects = async () => {
  loading.value = true
  try {
    // Uncomment this when API is ready
    // const { data } = await api().get('get-pending-projects')
    // pendingProjects.value = data.data

    // ✅ Using mock data for now
    pendingProjects.value = mockData
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Failed to load pending projects',
      text: error.message,
      confirmButtonColor: '#3abff8'
    })
  } finally {
    loading.value = false
  }
}

// Approve project
const approveProject = async (id) => {
  try {
    const project = pendingProjects.value.find(p => p.id === id)
    
    const result = await Swal.fire({
      title: 'Approve Project?',
      html: `
        <div class="text-left">
          <p>Are you sure you want to approve this project for broadcasting?</p>
          <div class="mt-3 bg-blue-50 p-3 rounded">
            <p><strong>Project:</strong> ${project.project_name}</p>
            <p><strong>Client:</strong> ${project.client}</p>
            <p><strong>Budget:</strong> ${project.budget} | <strong>Duration:</strong> ${project.duration}</p>
          </div>
          <p class="text-sm text-gray-600 mt-2">This will make the project visible to freelancers and start accepting applications.</p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3abff8',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Approve Project!',
      cancelButtonText: 'Cancel'
    })

    if (!result.isConfirmed) return

    // await api().post(`approve-project/${id}`)

    Swal.fire({
      icon: 'success',
      title: 'Project Approved!',
      html: `
        <div class="text-center">
          <p>The project has been approved successfully!</p>
          <div class="mt-3 bg-green-50 p-3 rounded">
            <p><strong>${project.project_name}</strong></p>
            <p>Now accepting applications from freelancers</p>
          </div>
        </div>
      `,
      showConfirmButton: false,
      timer: 2000
    })

    // ✅ Remove the approved project from the list
    pendingProjects.value = pendingProjects.value.filter(project => project.id !== id)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Approval Failed',
      text: error.response?.data?.message || error.message,
      confirmButtonColor: '#3abff8'
    })
  }
}

// Reject project
const rejectProject = async (id) => {
  try {
    const project = pendingProjects.value.find(p => p.id === id)
    
    const { value: reason } = await Swal.fire({
      title: 'Reject Project',
      html: `
        <div class="text-left mb-4">
          <p>Please provide a reason for rejecting this project:</p>
          <div class="bg-blue-50 p-3 rounded mt-2">
            <p><strong>Project:</strong> ${project.project_name}</p>
            <p><strong>Client:</strong> ${project.client}</p>
          </div>
        </div>
      `,
      input: 'textarea',
      inputLabel: 'Rejection Reason',
      inputPlaceholder: 'Enter the reason for rejection...',
      inputAttributes: {
        'aria-label': 'Enter the reason for rejection'
      },
      showCancelButton: true,
      confirmButtonText: 'Reject Project',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      inputValidator: (value) => {
        if (!value) {
          return 'Please provide a rejection reason'
        }
      }
    })

    if (!reason) return

    // await api().post(`reject-project/${id}`, { reason })

    Swal.fire({
      icon: 'info',
      title: 'Project Rejected',
      html: `
        <div class="text-center">
          <p>The project has been rejected.</p>
          <div class="mt-3 bg-red-50 p-3 rounded">
            <p><strong>Reason:</strong> ${reason}</p>
          </div>
        </div>
      `,
      showConfirmButton: false,
      timer: 3000
    })

    // ✅ Remove the rejected project from the list
    pendingProjects.value = pendingProjects.value.filter(project => project.id !== id)
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Rejection Failed',
      text: error.response?.data?.message || error.message,
      confirmButtonColor: '#3abff8'
    })
  }
}

// View project details
const viewProjectDetails = (project) => {
  Swal.fire({
    title: 'Project Details',
    html: `
      <div class="text-left">
        <div class="mb-4">
          <h3 class="font-bold text-lg mb-2">Project:</h3>
          <p class="text-gray-700">${project.project_name}</p>
        </div>
        
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Client:</strong><br>
            ${project.client}
          </div>
          <div>
            <strong>Status:</strong><br>
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              ${project.status}
            </span>
          </div>
          <div>
            <strong>Budget:</strong><br>
            ${project.budget}
          </div>
          <div>
            <strong>Duration:</strong><br>
            ${project.duration}
          </div>
          <div>
            <strong>Posted Date:</strong><br>
            ${new Date(project.posted_date).toLocaleDateString()}
          </div>
          <div>
            <strong>Expiry Date:</strong><br>
            ${new Date(project.expiry_date).toLocaleDateString()}
          </div>
        </div>
        
        <div class="bg-gray-100 p-3 rounded">
          <p class="text-sm text-gray-600">Full project requirements, scope, and technical specifications would be shown here in the actual implementation.</p>
        </div>
      </div>
    `,
    width: '600px',
    confirmButtonColor: '#3abff8',
    confirmButtonText: 'Close'
  })
}

onMounted(fetchPendingProjects)
</script>

<template>
  <div class="container mx-auto p-4">
    <!-- Header -->
    <div class="flex items-center justify-between bg-yellow-600 text-white p-4 mb-4 rounded-lg">
      <h1 class="text-xl font-bold">Pending Projects ({{ pendingProjects.length }})</h1>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center p-8">
      <span class="loading loading-spinner loading-lg text-yellow-600"></span>
    </div>

    <!-- Pending Projects Table -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <table class="table w-full">
        <thead>
          <tr class="bg-yellow-600 text-white">
            <th class="p-3 border-e">Project Details</th>
            <th class="p-3 border-e">Client</th>
            <th class="p-3 border-e">Budget/Duration</th>
            <th class="p-3 border-e">Status</th>
            <th class="p-3 border-e">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in pendingProjects" :key="project.id" class="border-b hover:bg-gray-50">
            <td class="p-3 border-e">
              <div class="font-medium text-gray-900">{{ project.project_name }}</div>
              <div class="flex items-center gap-2 mt-1">
                <button 
                  @click="viewProjectDetails(project)"
                  class="text-yellow-600 hover:text-yellow-800 text-sm flex items-center gap-1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  View Details
                </button>
              </div>
            </td>
            <td class="p-3 border-e">
              <div class="font-medium">{{ project.client }}</div>
              <div class="text-sm text-gray-600">
                Posted: {{ new Date(project.posted_date).toLocaleDateString() }}
              </div>
            </td>
            <td class="p-3 border-e">
              <div class="font-semibold text-green-600">{{ project.budget }}</div>
              <div class="text-sm text-gray-600">{{ project.duration }}</div>
            </td>
            <td class="p-3 border-e">
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                ⏳ {{ project.status }}
              </span>
            </td>
            <td class="p-3 border-e">
              <div class="flex gap-2">
                <button
                  @click="approveProject(project.id)"
                  class="btn btn-sm text-white btn-success flex-1"
                >
                  Approve
                </button>
                <button
                  @click="rejectProject(project.id)"
                  class="btn btn-sm text-white btn-error flex-1"
                >
                  Reject
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="!pendingProjects.length">
            <td colspan="5" class="p-4 text-center text-gray-500">
              No pending projects found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>