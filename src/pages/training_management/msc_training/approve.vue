<template>
  <div class="px-2 bg-white py-5 w-11/12 mx-auto">
    <div class="bg-teal-700 rounded-t-2xl text-white px-6 py-4">
      <h1 class="text-2xl font-semibold">Pending MSC Training List</h1>
      <p class="text-gray-300">Review and approve MSC training programs</p>
    </div>

    <div class="bg-white rounded-xl p-5 w-full shadow-md mt-5">
      <!-- Filters and Search -->
      <div class="flex justify-between items-center mb-6">
        <div class="flex gap-4">
          <!-- Status Filter -->
          <select v-model="filters.status" class="select select-bordered select-sm rounded-lg">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="posted">Posted</option>
          </select>

          <!-- Training Type Filter -->
          <select v-model="filters.training_type" class="select select-bordered select-sm rounded-lg">
            <option value="">All Types</option>
            <option value="technical">Technical</option>
            <option value="soft_skills">Soft Skills</option>
            <option value="leadership">Leadership</option>
            <option value="compliance">Compliance</option>
          </select>
        </div>

        <!-- Search -->
        <div class="relative">
          <input
            type="text"
            v-model="filters.search"
            placeholder="Search MSC trainings..."
            class="input input-bordered input-sm rounded-lg pl-10 w-64"
          />
          <span class="absolute left-3 top-2">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </span>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-8">
        <span class="loading loading-spinner loading-lg text-teal-600"></span>
        <span class="ml-2 text-gray-600">Loading MSC trainings...</span>
      </div>

      <!-- Table -->
      <div v-else class="overflow-x-auto">
        <table class="table table-auto w-full border-collapse border border-gray-200">
          <thead class="bg-teal-50">
            <tr>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">ID</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Training Title</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Training Type</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Department</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Trainer</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Level</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Duration</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Participants</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Status</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="training in filteredTrainings"
              :key="training.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="border border-gray-300 px-4 py-3 text-gray-600">{{ training.id }}</td>
              <td class="border border-gray-300 px-4 py-3">
                <div class="font-medium text-gray-900">{{ training.title }}</div>
                <div class="text-sm text-gray-500">{{ training.code }}</div>
              </td>
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                <span class="px-2 py-1 rounded-full text-xs font-medium capitalize"
                  :class="{
                    'bg-blue-100 text-blue-800': training.type === 'technical',
                    'bg-green-100 text-green-800': training.type === 'soft_skills',
                    'bg-purple-100 text-purple-800': training.type === 'leadership',
                    'bg-orange-100 text-orange-800': training.type === 'compliance'
                  }">
                  {{ training.type.replace('_', ' ') }}
                </span>
              </td>
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ training.department }}
              </td>
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ training.trainer }}
              </td>
              <td class="border border-gray-300 px-4 py-3">
                <span
                  class="px-2 py-1 rounded-full text-xs font-medium capitalize"
                  :class="{
                    'bg-blue-100 text-blue-800': training.level === 'basic',
                    'bg-yellow-100 text-yellow-800': training.level === 'intermediate',
                    'bg-red-100 text-red-800': training.level === 'advanced'
                  }"
                >
                  {{ training.level }}
                </span>
              </td>
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ training.duration }} days
              </td>
              <td class="border border-gray-300 px-4 py-3 text-gray-600 text-center">
                {{ training.participants }}
              </td>
              <td class="border border-gray-300 px-4 py-3">
                <span
                  class="px-2 py-1 rounded-full text-xs font-medium capitalize"
                  :class="{
                    'bg-yellow-100 text-yellow-800': training.status == 0,
                    'bg-green-100 text-green-800': training.status == 1,
                    'bg-blue-100 text-blue-800': training.status == 2,
                    'bg-red-100 text-red-800': training.status == 3
                  }"
                >
                  {{ training.status == 0 ? 'pending' : training.status == 1 ? 'approved' : training.status == 2 ? 'completed' : 'cancelled' }}
                </span>
              </td>
              <td class="border border-gray-300 px-4 py-3">
                <div class="flex gap-2">
                  <!-- Approve Button -->
                  <button
                    v-if="training.status === 0"
                    @click="approveTraining(training.id)"
                    class="btn btn-success btn-sm rounded-lg text-white"
                    :disabled="actionLoading"
                  >
                    <svg v-if="actionLoading && approvingId === training.id" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v4m0 12v4m8-8h-4M6 12H2"></path>
                    </svg>
                    <span v-else>Approve</span>
                  </button>

                  <!-- Reject Button -->
                  <button
                    v-if="training.status === 0"
                    @click="rejectTraining(training.id)"
                    class="btn btn-error btn-sm rounded-lg text-white"
                    :disabled="actionLoading"
                  >
                    <svg v-if="actionLoading && rejectingId === training.id" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v4m0 12v4m8-8h-4M6 12H2"></path>
                    </svg>
                    <span v-else>Reject</span>
                  </button>

                  <!-- View Details -->
                  <button
                    @click="viewDetails(training)"
                    class="btn btn-info btn-sm rounded-lg text-white"
                  >
                    View
                  </button>

                  <!-- Delete Button -->
                  <button
                    @click="confirmDelete(training)"
                    class="btn btn-error btn-sm rounded-lg text-white bg-red-600 border-red-600"
                    :disabled="deletingId === training.id"
                  >
                    <svg v-if="deletingId === training.id" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v4m0 12v4m8-8h-4M6 12H2"></path>
                    </svg>
                    <span v-else>Delete</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="filteredTrainings.length === 0" class="text-center py-8 text-gray-500">
          <svg class="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <p class="mt-4 text-lg">No MSC training records found</p>
          <p class="text-sm">Try adjusting your filters or search terms</p>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="filteredTrainings.length > 0" class="flex justify-between items-center mt-6">
        <div class="text-sm text-gray-600">
          Showing {{ filteredTrainings.length }} of {{ mockTrainings.length }} records
        </div>
        <div class="join">
          <button class="join-item btn btn-sm">1</button>
        </div>
      </div>
    </div>

    <!-- Training Details Modal -->
    <div v-if="selectedTraining" class="modal modal-open">
      <div class="modal-box max-w-4xl">
        <h3 class="font-bold text-lg mb-4">MSC Training Details</h3>

        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label class="font-semibold text-gray-700">Training Title:</label>
            <p class="text-gray-900">{{ selectedTraining.title }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Training Code:</label>
            <p class="text-gray-900">{{ selectedTraining.code }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Training Type:</label>
            <p class="text-gray-900 capitalize">{{ selectedTraining.type.replace('_', ' ') }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Department:</label>
            <p class="text-gray-900">{{ selectedTraining.department }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Trainer:</label>
            <p class="text-gray-900">{{ selectedTraining.trainer }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Training Level:</label>
            <p class="text-gray-900 capitalize">{{ selectedTraining.level }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Duration:</label>
            <p class="text-gray-900">{{ selectedTraining.duration }} days</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Max Participants:</label>
            <p class="text-gray-900">{{ selectedTraining.participants }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Location:</label>
            <p class="text-gray-900">{{ selectedTraining.location }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Status:</label>
            <span
              class="px-2 py-1 rounded-full text-xs font-medium capitalize"
              :class="{
                'bg-yellow-100 text-yellow-800': selectedTraining.status === 0,
                'bg-green-100 text-green-800': selectedTraining.status === 1,
                'bg-blue-100 text-blue-800': selectedTraining.status === 2,
                'bg-red-100 text-red-800': selectedTraining.status === 3
              }"
            >
              {{ selectedTraining.status === 0 ? 'pending' : selectedTraining.status === 1 ? 'approved' : selectedTraining.status === 2 ? 'completed' : 'cancelled' }}
            </span>
          </div>
        </div>

        <div class="mb-6">
          <label class="font-semibold text-gray-700">Description:</label>
          <p class="text-gray-900 mt-2">{{ selectedTraining.description }}</p>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label class="font-semibold text-gray-700">Start Date:</label>
            <p class="text-gray-900">{{ formatDate(selectedTraining.start_date) }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">End Date:</label>
            <p class="text-gray-900">{{ formatDate(selectedTraining.end_date) }}</p>
          </div>
        </div>

        <div class="modal-action">
          <button class="btn" @click="selectedTraining = null">Close</button>
          <div class="flex gap-2">
            <button
              v-if="selectedTraining.status === 0"
              @click="approveTraining(selectedTraining.id)"
              class="btn btn-success text-white"
              :disabled="actionLoading"
            >
              Approve
            </button>
            <button
              v-if="selectedTraining.status === 0"
              @click="rejectTraining(selectedTraining.id)"
              class="btn btn-error text-white"
              :disabled="actionLoading"
            >
              Reject
            </button>
            <button
              @click="confirmDelete(selectedTraining)"
              class="btn btn-error text-white bg-red-600 border-red-600"
              :disabled="actionLoading"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from '@/components/ui/toast/use-toast'
import { useAuthStore } from '@/stores/AuthStore'
import { ref, onMounted, computed, reactive } from 'vue'
import Swal from 'sweetalert2'

const authStore = useAuthStore()
const { toast } = useToast()

// Mock MSC Training Data
const mockTrainings = ref([
 
  {
    id: 1,
    title: "Technical Writing Excellence",
    code: "MSC-TECH-002",
    type: "technical",
    department: "Engineering",
    trainer: "Prof. Michael Chen",
    level: "intermediate",
    duration: 3,
    participants: 30,
    location: "Training Room B",
    description: "Enhance technical documentation skills including report writing, documentation standards, and communication with technical and non-technical audiences.",
    start_date: "2024-03-01",
    end_date: "2024-03-03",
    status: 0 // pending
  },
 
  {
    id: 2,
    title: "Project Management Professional",
    code: "MSC-TECH-005",
    type: "technical",
    department: "Project Management",
    trainer: "Mr. Robert Brown",
    level: "advanced",
    duration: 4,
    participants: 20,
    location: "Executive Boardroom",
    description: "Advanced project management methodologies, tools, and techniques for experienced project managers preparing for professional certification.",
    start_date: "2024-04-05",
    end_date: "2024-04-08",
    status: 0 // pending
  },
  
])

// Data
const trainings = ref([])
const selectedTraining = ref(null)
const loading = ref(false)
const actionLoading = ref(false)
const approvingId = ref(null)
const rejectingId = ref(null)
const deletingId = ref(null)

// Filters
const filters = reactive({
  status: '',
  training_type: '',
  search: ''
})

// Fetch trainings (mock data)
const fetchTrainings = async () => {
  loading.value = true
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    trainings.value = mockTrainings.value
  } catch (error) {
    console.error('Error fetching trainings:', error)
    toast({
      title: 'Error',
      description: 'Failed to load MSC trainings',
      variant: 'destructive'
    })
  } finally {
    loading.value = false
  }
}

// Format date
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Filter trainings
const filteredTrainings = computed(() => {
  let filtered = trainings.value

  // Filter by status
  if (filters.status) {
    filtered = filtered.filter(training => {
      if (filters.status === 'pending') return training.status === 0
      if (filters.status === 'approved') return training.status === 1
      if (filters.status === 'posted') return training.status === 2
      return true
    })
  }

  // Filter by training type
  if (filters.training_type) {
    filtered = filtered.filter(training => training.type === filters.training_type)
  }

  // Filter by search
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(training =>
      training.title.toLowerCase().includes(searchLower) ||
      training.code.toLowerCase().includes(searchLower) ||
      training.department.toLowerCase().includes(searchLower) ||
      training.trainer.toLowerCase().includes(searchLower)
    )
  }

  return filtered
})

// Delete training function
const deleteTraining = async (trainingId) => {
  deletingId.value = trainingId
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Remove from local state
    trainings.value = trainings.value.filter(training => training.id !== trainingId)
    mockTrainings.value = mockTrainings.value.filter(training => training.id !== trainingId)

    // Close modal if the deleted training was selected
    if (selectedTraining.value && selectedTraining.value.id === trainingId) {
      selectedTraining.value = null
    }

    toast({
      title: 'Success',
      description: 'MSC training deleted successfully',
      variant: 'default'
    })

  } catch (error) {
    console.error('Error deleting training:', error)
    toast({
      title: 'Error',
      description: 'Failed to delete MSC training',
      variant: 'destructive'
    })
  } finally {
    deletingId.value = null
  }
}

// Confirm delete with SweetAlert
const confirmDelete = (training) => {
  Swal.fire({
    title: 'Are you sure?',
    text: `You are about to delete "${training.title}". This action cannot be undone.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteTraining(training.id)
    }
  })
}

// Actions
const approveTraining = async (trainingId) => {
  approvingId.value = trainingId
  actionLoading.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Update local state
    const training = trainings.value.find(t => t.id === trainingId)
    if (training) {
      training.status = 1
    }

    // Update mock data
    const mockTraining = mockTrainings.value.find(t => t.id === trainingId)
    if (mockTraining) {
      mockTraining.status = 1
    }

    toast({
      title: 'Success',
      description: 'MSC training approved successfully',
      variant: 'default'
    })

    // Close modal if open
    if (selectedTraining.value && selectedTraining.value.id === trainingId) {
      selectedTraining.value.status = 1
    }

  } catch (error) {
    console.error('Error approving training:', error)
    toast({
      title: 'Error',
      description: 'Failed to approve MSC training',
      variant: 'destructive'
    })
  } finally {
    actionLoading.value = false
    approvingId.value = null
  }
}

const rejectTraining = async (trainingId) => {
  rejectingId.value = trainingId
  actionLoading.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Update local state
    const training = trainings.value.find(t => t.id === trainingId)
    if (training) {
      training.status = 3
    }

    // Update mock data
    const mockTraining = mockTrainings.value.find(t => t.id === trainingId)
    if (mockTraining) {
      mockTraining.status = 3
    }

    toast({
      title: 'Success',
      description: 'MSC training rejected successfully',
      variant: 'default'
    })

    // Close modal if open
    if (selectedTraining.value && selectedTraining.value.id === trainingId) {
      selectedTraining.value.status = 3
    }

  } catch (error) {
    console.error('Error rejecting training:', error)
    toast({
      title: 'Error',
      description: 'Failed to reject MSC training',
      variant: 'destructive'
    })
  } finally {
    actionLoading.value = false
    rejectingId.value = null
  }
}

const viewDetails = (training) => {
  selectedTraining.value = training
}

// Fetch data on component mount
onMounted(() => {
  fetchTrainings()
})
</script>