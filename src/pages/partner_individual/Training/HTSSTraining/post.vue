<template>
  <div class="px-0 bg-white py-5 w-3/4 mx-auto">
    <div class="bg-teal-700 rounded-t-2xl text-white px-6 py-4">
      <h1 class="text-2xl font-semibold">Post Trainings</h1>
    </div>

    <hr />
    <div class="bg-white rounded-xl p-5 w-full shadow-md mt-5">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-10">
        <span class="loading loading-spinner loading-lg text-teal-700"></span>
        <span class="ml-3 text-gray-600">Loading trainings...</span>
      </div>

      <!-- Trainings Table -->
      <div v-else class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr class="bg-teal-50 text-teal-900">
              <th class="p-2 border-e text-left">ID</th>
              <th class="p-2 border-e text-left">Title</th>
              <th class="p-2 border-e text-left">Customer</th>
              <th class="p-2 border-e text-left">Solution</th>
              <th class="p-2 border-e text-left">Software Skill</th>
              <th class="p-2 border-e text-left">Description</th>
              <th class="p-2 border-e text-left">Start Date</th>
              <th class="p-2 border-e text-left">End Date</th>
              <th class="p-2 border-e text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="training in trainings" :key="training.id" class="hover:bg-gray-50">
              <td class="py-4 p-2 border-e">{{ training.id }}</td>
              <td class="py-4 p-2 border-e font-semibold">{{ training.title }}</td>
              <td class="py-4 p-2 border-e">{{ getCustomerName(training.customer_id) }}</td>
              <td class="py-4 p-2 border-e">{{ getSolutionName(training.solution_id) }}</td>
              <td class="py-4 p-2 border-e">{{ getSoftwareSkillName(training.software_id) }}</td>
              <td class="max-w-xs truncate">{{ training.description || 'No description' }}</td>
              <td class="py-4 p-2 border-e">{{ formatDate(training.start_date) }}</td>
              <td class="py-4 p-2 border-e">{{ formatDate(training.end_date) }}</td>
              <td>
                <div class="flex gap-2">
                  <!-- Post Button -->
                  <button 
                    v-if="training.status !== 1"
                    @click="statusUpdate(training.id)"
                    class="btn btn-sm btn-success text-white"
                    :disabled="actionLoading"
                  >
                    <span v-if="actionLoading" class="loading loading-spinner loading-xs"></span>
                    Post
                  </button>

                  <!-- Edit Button -->
                  <button 
                    @click="openEditModal(training)"
                    class="btn btn-sm btn-info text-white"
                  >
                    Edit
                  </button>

                  <!-- Delete Button -->
                  <button 
                    @click="deleteTraining(training.id)"
                    class="btn btn-sm btn-error text-white"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="trainings.length === 0" class="text-center py-10">
          <div class="text-gray-400 text-6xl mb-4">📚</div>
          <h3 class="text-lg font-semibold text-gray-600">No trainings found</h3>
          <p class="text-gray-500">There are no trainings to display at the moment.</p>
        </div>
      </div>
    </div>

    <!-- Edit Training Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl w-full max-w-2xl p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-gray-800">Edit Training</h2>
          <button @click="closeEditModal" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="updateTraining">
          <div class="space-y-4">
            <!-- Title -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Title <span class="text-red-500">*</span></span>
              </label>
              <input
                type="text"
                class="input input-bordered w-full"
                v-model="editForm.title"
                placeholder="Enter training title"
                required
              />
            </div>

            <!-- Description -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Description <span class="text-red-500">*</span></span>
              </label>
              <textarea
                class="textarea textarea-bordered w-full h-24"
                v-model="editForm.description"
                placeholder="Enter training description"
                required
              ></textarea>
            </div>

            <!-- Dropdown Fields -->
            <div class="grid grid-cols-2 gap-4">
              <!-- Customer -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Customer <span class="text-red-500">*</span></span>
                </label>
                <select
                  v-model="editForm.customer_id"
                  class="select select-bordered w-full"
                  required
                >
                  <option value="" disabled>Select Customer</option>
                  <option v-for="customer in customers" :key="customer.id" :value="customer.id">
                    {{ customer.name }}
                  </option>
                </select>
              </div>

              <!-- Solution -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Solution <span class="text-red-500">*</span></span>
                </label>
                <select
                  v-model="editForm.solution_id"
                  class="select select-bordered w-full"
                  required
                >
                  <option value="" disabled>Select Solution</option>
                  <option v-for="solution in solutions" :key="solution.id" :value="solution.id">
                    {{ solution.name }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Software Skill -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Software Skill <span class="text-red-500">*</span></span>
              </label>
              <select
                v-model="editForm.software_id"
                class="select select-bordered w-full"
                required
              >
                <option value="" disabled>Select Software Skill</option>
                <option v-for="skill in softwareSkills" :key="skill.id" :value="skill.id">
                  {{ skill.name }} ({{ skill.category }})
                </option>
              </select>
            </div>

            <!-- Date Fields -->
            <div class="grid grid-cols-2 gap-4">
              <!-- Start Date -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Start Date <span class="text-red-500">*</span></span>
                </label>
                <input
                  type="date"
                  class="input input-bordered w-full"
                  v-model="editForm.start_date"
                  required
                />
              </div>

              <!-- End Date -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">End Date <span class="text-red-500">*</span></span>
                </label>
                <input
                  type="date"
                  class="input input-bordered w-full"
                  v-model="editForm.end_date"
                  required
                />
              </div>
            </div>
          </div>

          <div class="flex gap-3 mt-6">
            <button
              type="button"
              @click="closeEditModal"
              class="btn btn-outline flex-1"
              :disabled="updateLoading"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary flex-1 bg-teal-700 text-white hover:bg-teal-600"
              :disabled="updateLoading"
            >
              <span v-if="updateLoading" class="loading loading-spinner loading-sm"></span>
              {{ updateLoading ? 'Updating...' : 'Update' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from '@/components/ui/toast/use-toast'
import { useAuthStore } from '@/stores/AuthStore'
import { ref, onMounted, reactive } from 'vue'
import Swal from 'sweetalert2'
import api from '@/config/api'

const authStore = useAuthStore()
const { toast } = useToast()

const trainings = ref([])
const customers = ref([])
const solutions = ref([])
const softwareSkills = ref([])

const loading = ref(false)
const actionLoading = ref(false)
const showEditModal = ref(false)
const updateLoading = ref(false)

// Edit form data
const editForm = reactive({
  id: null,
  title: '',
  description: '',
  customer_id: '',
  solution_id: '',
  software_id: '',
  start_date: '',
  end_date: ''
})

// Format date for display
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Get customer name by ID
const getCustomerName = (customerId) => {
  const customer = customers.value.find(c => c.id == customerId)
  return customer ? customer.user.name : 'Unknown Customer'
}

// Get solution name by ID
const getSolutionName = (solutionId) => {
  const solution = solutions.value.find(s => s.id == solutionId)
  return solution ? solution.name : 'Unknown Solution'
}

// Get software skill name by ID
const getSoftwareSkillName = (softwareId) => {
  const skill = softwareSkills.value.find(s => s.id == softwareId)
  return skill ? skill.name : 'Unknown Skill'
}

// Fetch all data
const fetchAllData = async () => {
  loading.value = true
  try {
    // Fetch trainings
    const trainingsResponse = await api().get('trainings', {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })
    trainings.value = trainingsResponse.data.filter((e) => e.status == 1)

    // Fetch customers
    const customersResponse = await api().get('customers', {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })
    customers.value = customersResponse.data.data || customersResponse.data

    // Fetch solutions
    const solutionsResponse = await api().get('solutions', {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })
    solutions.value = solutionsResponse.data.data || solutionsResponse.data

    // Fetch software skills
    const skillsResponse = await api().get('software-skills', {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })
    softwareSkills.value = skillsResponse.data.data || skillsResponse.data

  } catch (error) {
    console.error('Error fetching data:', error)
    toast({
      title: 'Error',
      description: 'Failed to load data',
      variant: 'destructive'
    })
  } finally {
    loading.value = false
  }
}

// Open edit modal
const openEditModal = (training) => {
  editForm.id = training.id
  editForm.title = training.title
  editForm.description = training.description || ''
  editForm.customer_id = training.customer_id
  editForm.solution_id = training.solution_id
  editForm.software_id = training.software_id
  editForm.start_date = training.start_date ? training.start_date.split('T')[0] : ''
  editForm.end_date = training.end_date ? training.end_date.split('T')[0] : ''
  showEditModal.value = true
}

// Close edit modal
const closeEditModal = () => {
  showEditModal.value = false
  // Reset form
  editForm.id = null
  editForm.title = ''
  editForm.description = ''
  editForm.customer_id = ''
  editForm.solution_id = ''
  editForm.software_id = ''
  editForm.start_date = ''
  editForm.end_date = ''
}

// Update training
const updateTraining = async () => {
  if (!editForm.title.trim() || !editForm.description.trim() || 
      !editForm.customer_id || !editForm.solution_id || !editForm.software_id ||
      !editForm.start_date || !editForm.end_date) {
    toast({
      title: 'Error',
      description: 'Please fill in all required fields',
      variant: 'destructive'
    })
    return
  }

  // Date validation
  const startDate = new Date(editForm.start_date)
  const endDate = new Date(editForm.end_date)
  
  if (endDate < startDate) {
    toast({
      title: 'Error',
      description: 'End date cannot be before start date',
      variant: 'destructive'
    })
    return
  }

  updateLoading.value = true

  try {
    await api().post(`trainings/${editForm.id}`, {
      title: editForm.title.trim(),
      description: editForm.description.trim(),
      customer_id: editForm.customer_id,
      solution_id: editForm.solution_id,
      software_id: editForm.software_id,
      start_date: editForm.start_date,
      end_date: editForm.end_date,
      _method: 'PUT'
    })

    toast({
      title: 'Success',
      description: 'Training updated successfully',
      variant: 'default'
    })

    // Close modal and refresh data
    closeEditModal()
    await fetchAllData()
  } catch (error) {
    console.error('Error updating training:', error)
    toast({
      title: 'Error',
      description: error.response?.data?.message || 'Failed to update training',
      variant: 'destructive'
    })
  } finally {
    updateLoading.value = false
  }
}

// Approve training
// const approveTraining = async (id) => {
//   actionLoading.value = true
//   try {
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: 'This training will be approved.',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#10b981',
//       cancelButtonColor: '#6b7280',
//       confirmButtonText: 'Yes, approve it!'
//     })

//     if (result.isConfirmed) {
//       await api().post(`trainings/${id}`, {
//         status: 1,
//         _method: 'PUT'
//       })

//       Swal.fire({
//         title: 'Approved!',
//         text: 'Training has been approved successfully.',
//         icon: 'success'
//       })

//       // Refresh the list
//       await fetchAllData()
//     }
//   } catch (error) {
//     console.error('Error approving training:', error)
//     Swal.fire({
//       title: 'Error!',
//       text: error.response?.data?.message || 'Failed to approve training. Please try again.',
//       icon: 'error'
//     })
//   } finally {
//     actionLoading.value = false
//   }
// }

// Delete training
const deleteTraining = async (id) => {
  try {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!'
    })

    if (result.isConfirmed) {
      await api().delete(`trainings/${id}`)

      Swal.fire(
        'Deleted!',
        'Training has been deleted.',
        'success'
      )

      // Refresh the list
      await fetchAllData()
    }
  } catch (error) {
    console.error('Error deleting training:', error)
    toast({
      title: 'Error',
      description: error.response?.data?.message || 'Failed to delete training',
      variant: 'destructive'
    })
  }
}

const statusUpdate = async (id) => {
  try {
    await api().post(
      `trainings/${id}`,
      { status: 2,
        _method: 'PUT'
       },
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      }
    )

    fetchAllData()

    Swal.fire({
      title: 'Posted!',
      text: `Training has been Posted.`,
      icon: 'success'
    })
  } catch (error) {
    console.error(error)
    Swal.fire({
      title: 'Error',
      text: 'Failed to Post. Please try again.',
      icon: 'error'
    })
  }
}

// Fetch all data on component mount
onMounted(() => {
  fetchAllData()
})
</script>