<template>
  <div class="px-2 bg-white py-5 w-11/12 mx-auto">
    <div class="bg-teal-700 rounded-t-2xl text-white px-6 py-4">
      <h1 class="text-2xl font-semibold">Requested Trainers</h1>
      <p class="text-gray-300">Review and approve pending trainer registrations</p>
    </div>

    <div class="bg-white rounded-xl p-5 w-full shadow-md mt-5">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-8">
        <span class="loading loading-spinner loading-lg text-teal-600"></span>
        <span class="ml-2 text-gray-600">Loading trainers...</span>
      </div>

      <!-- Table -->
      <div v-else class="overflow-x-auto">
        <table class="table table-auto w-full border-collapse border border-gray-200">
          <thead class="bg-teal-50">
            <tr>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">ID</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Name</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Email</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Phone</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Expertise</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">LinkedIn</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="trainer in paginatedTrainers" 
              :key="trainer.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="border border-gray-300 px-4 py-3 text-gray-600">{{ trainer.id }}</td>
              
              <!-- Name -->
              <td class="border border-gray-300 px-4 py-3">
                <div class="font-medium text-gray-900">{{ trainer.user.name }}</div>
              </td>

              <!-- Email -->
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  {{ trainer.user.email }}
                </div>
              </td>

              <!-- Phone -->
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  {{ trainer.phone }}
                </div>
              </td>

              <!-- Expertise -->
              <td class="border border-gray-300 px-4 py-3">
                <span class="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ trainer.expertise_area }}
                </span>
              </td>

              <!-- LinkedIn -->
              <td class="border border-gray-300 px-4 py-3">
                <a 
                  v-if="trainer.linkedin_profile" 
                  :href="trainer.linkedin_profile" 
                  target="_blank"
                  class="flex items-center gap-2 text-teal-600 hover:text-teal-800 transition-colors"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  View Profile
                </a>
                <span v-else class="text-gray-400 text-sm">Not provided</span>
              </td>

              <!-- Actions -->
              <td class="border border-gray-300 px-4 py-3">
                <div class="flex gap-2">
               
                  <!-- Approve Button -->
                  <button
                    class="px-3 py-2 rounded-md shadow-md bg-green-600 text-white text-sm hover:bg-green-700 transition-colors"
                    @click="statusUpdate(trainer)"
                    :disabled="actionLoading"
                  >
                    <span v-if="actionLoading && approvingId === trainer.id" class="loading loading-spinner loading-xs"></span>
                    Approve
                  </button>

                 

                  <!-- Delete Button -->
                  <button
                    @click="deleteTrainer(trainer.id)"
                    class="px-3 py-2 rounded-md shadow-md bg-red-600 text-white text-sm hover:bg-red-700 transition-colors"
                    :disabled="actionLoading"
                  >
                    <span v-if="actionLoading && deletingId === trainer.id" class="loading loading-spinner loading-xs"></span>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="filteredTrainers.length === 0" class="text-center py-8 text-gray-500">
          <svg class="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
          </svg>
          <p class="mt-4 text-lg">No trainers found</p>
          <p class="text-sm">Try adjusting your filters or search terms</p>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="filteredTrainers.length > 0" class="flex justify-between items-center mt-6">
        <div class="text-sm text-gray-600">
          Showing {{ Math.min(currentPage * itemsPerPage, filteredTrainers.length) }} of {{ filteredTrainers.length }} trainers
        </div>
        <div class="join">
          <button class="join-item btn btn-sm" :disabled="currentPage === 1" @click="currentPage--">
            Previous
          </button>
          <button class="join-item btn btn-sm btn-active">{{ currentPage }}</button>
          <button class="join-item btn btn-sm" :disabled="currentPage * itemsPerPage >= filteredTrainers.length" @click="currentPage++">
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Trainer Details Modal -->
    <div v-if="selectedTrainer" class="modal modal-open">
      <div class="modal-box max-w-4xl">
        <h3 class="font-bold text-lg mb-4">Trainer Details</h3>
        
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label class="font-semibold text-gray-700">Full Name:</label>
            <p class="text-gray-900">{{ selectedTrainer.user?.name }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Email:</label>
            <p class="text-gray-900">{{ selectedTrainer.user?.email }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Phone:</label>
            <p class="text-gray-900">{{ selectedTrainer.phone }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Expertise Area:</label>
            <p class="text-gray-900">{{ selectedTrainer.expertise_area }}</p>
          </div>
          <div v-if="selectedTrainer.linkedin_profile" class="col-span-2">
            <label class="font-semibold text-gray-700">LinkedIn Profile:</label>
            <a :href="selectedTrainer.linkedin_profile" target="_blank" class="text-teal-600 hover:text-teal-800 break-all">
              {{ selectedTrainer.linkedin_profile }}
            </a>
          </div>
          <div class="col-span-2">
            <label class="font-semibold text-gray-700">Address:</label>
            <p class="text-gray-900">{{ selectedTrainer.address }}</p>
          </div>
        </div>

        <div class="mb-6">
          <label class="font-semibold text-gray-700">Biography:</label>
          <p class="text-gray-900 mt-2 whitespace-pre-line">{{ selectedTrainer.bio }}</p>
        </div>

        <div class="mb-6">
          <label class="font-semibold text-gray-700">Status:</label>
          <span 
            class="px-2 py-1 rounded-full text-xs font-medium capitalize ml-2"
            :class="{
              'bg-yellow-100 text-yellow-800': selectedTrainer.status === 0,
              'bg-green-100 text-green-800': selectedTrainer.status === 1,
              'bg-red-100 text-red-800': selectedTrainer.status === 2
            }"
          >
            {{ selectedTrainer.status === 0 ? 'pending' : selectedTrainer.status === 1 ? 'approved' : 'rejected' }}
          </span>
        </div>

        <div class="modal-action">
          <button class="btn" @click="selectedTrainer = null">Close</button>
          <div class="flex gap-2">
            <button 
              @click="editTrainer(selectedTrainer)" 
              class="btn btn-warning text-white"
              :disabled="actionLoading"
            >
              Edit
            </button>
            <button 
              @click="deleteTrainer(selectedTrainer.id)" 
              class="btn btn-error text-white"
              :disabled="actionLoading"
            >
              Delete
            </button>
            <button 
              v-if="selectedTrainer.status === 0"
              @click="statusUpdate(selectedTrainer)" 
              class="btn btn-success text-white"
              :disabled="actionLoading"
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Trainer Modal -->
    <div v-if="editingTrainer" class="modal modal-open">
      <div class="modal-box max-w-4xl">
        <h3 class="font-bold text-lg mb-4">Edit Trainer</h3>
        
        <form @submit.prevent="updateTrainer">
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Full Name</span>
              </label>
              <input
                type="text"
                v-model="editingTrainer.user.name"
                class="input input-bordered w-full"
                required
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                v-model="editingTrainer.user.email"
                class="input input-bordered w-full"
                required
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Phone</span>
              </label>
              <input
                type="text"
                v-model="editingTrainer.phone"
                class="input input-bordered w-full"
                required
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Expertise Area</span>
              </label>
              <input
                type="text"
                v-model="editingTrainer.expertise_area"
                class="input input-bordered w-full"
                required
              />
            </div>
            <div class="form-control col-span-2">
              <label class="label">
                <span class="label-text font-semibold">LinkedIn Profile</span>
              </label>
              <input
                type="url"
                v-model="editingTrainer.linkedin_profile"
                class="input input-bordered w-full"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div class="form-control col-span-2">
              <label class="label">
                <span class="label-text font-semibold">Address</span>
              </label>
              <textarea
                v-model="editingTrainer.address"
                class="textarea textarea-bordered h-20"
                required
              ></textarea>
            </div>
          </div>

          <div class="form-control mb-6">
            <label class="label">
              <span class="label-text font-semibold">Biography</span>
            </label>
            <textarea
              v-model="editingTrainer.bio"
              class="textarea textarea-bordered h-32"
              required
            ></textarea>
          </div>

          <div class="form-control mb-6">
            <label class="label">
              <span class="label-text font-semibold">Status</span>
            </label>
            <select v-model="editingTrainer.status" class="select select-bordered w-full">
              <option :value="0">Pending</option>
              <option :value="1">Approved</option>
              <option :value="2">Rejected</option>
            </select>
          </div>

          <div class="modal-action">
            <button type="button" class="btn" @click="editingTrainer = null">Cancel</button>
            <button type="submit" class="btn btn-primary" :disabled="actionLoading">
              <span v-if="actionLoading" class="loading loading-spinner loading-sm"></span>
              Update Trainer
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
import { ref, onMounted, computed, reactive, watch } from 'vue'
import Swal from 'sweetalert2'
import api from '@/config/api'

const authStore = useAuthStore()
const { toast } = useToast()

// Data
const trainers = ref([])
const selectedTrainer = ref(null)
const editingTrainer = ref(null)
const loading = ref(false)
const actionLoading = ref(false)
const approvingId = ref(null)
const editingId = ref(null)
const deletingId = ref(null)
const currentPage = ref(1)
const itemsPerPage = 10

// Filters
const filters = reactive({
  status: '',
  expertise_area: '',
  search: ''
})

// Fetch trainers
const fetchTrainers = async () => {
  loading.value = true
  try {
    const response = await api().get('trainer?with=user')
    trainers.value = response.data.data.filter(e => e.status == 0) || response.data.filter(e => e.status == 0)
  } catch (error) {
    console.error('Error fetching trainers:', error)
    toast({
      title: 'Error',
      description: 'Failed to load trainers',
      variant: 'destructive'
    })
  } finally {
    loading.value = false
  }
}

// Filter trainers
const filteredTrainers = computed(() => {
  let filtered = trainers.value

  // Filter by status
  if (filters.status) {
    filtered = filtered.filter(trainer => trainer.status === filters.status)
  }

  // Filter by expertise area
  if (filters.expertise_area) {
    filtered = filtered.filter(trainer => trainer.expertise_area === filters.expertise_area)
  }

  // Filter by search
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(trainer =>
      trainer.user?.name?.toLowerCase().includes(searchLower) ||
      trainer.user?.email?.toLowerCase().includes(searchLower) ||
      trainer.phone?.toLowerCase().includes(searchLower) ||
      trainer.expertise_area?.toLowerCase().includes(searchLower) ||
      trainer.address?.toLowerCase().includes(searchLower)
    )
  }

  return filtered
})

// Paginated trainers
const paginatedTrainers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredTrainers.value.slice(start, end)
})

const statusUpdate = async (trainer) => {
  approvingId.value = trainer.id
  actionLoading.value = true
  
  try {
    const payload = {
      name: trainer.user.name,
      email: trainer.user.email,
      bio: trainer.bio,
      expertise_area: trainer.expertise_area,
      phone: trainer.phone,
      linkedin_profile: trainer.linkedin_profile,
      address: trainer.address,
      status: 1, 
      _method: "PUT"
    }

    await api().post(
      `trainer/${trainer.id}`,
      payload,
  
    )

    fetchTrainers()

    Swal.fire({
      title: 'Approved!',
      text: `Trainer has been approved.`,
      icon: 'success'
    })

    // Close modals if open
    if (selectedTrainer.value && selectedTrainer.value.id === trainer.id) {
      selectedTrainer.value = null
    }
    if (editingTrainer.value && editingTrainer.value.id === trainer.id) {
      editingTrainer.value = null
    }
  } catch (error) {
    console.error('Error updating status:', error)
    Swal.fire({
      title: 'Error',
      text: 'Failed to approve trainer. Please try again.',
      icon: 'error'
    })
  } finally {
    actionLoading.value = false
    approvingId.value = null
  }
}

// Edit trainer
const editTrainer = (trainer) => {
  // Create a deep copy of the trainer object to avoid direct mutation
  editingTrainer.value = JSON.parse(JSON.stringify(trainer))
  selectedTrainer.value = null // Close details modal if open
}

// Update trainer
const updateTrainer = async () => {
  if (!editingTrainer.value) return

  editingId.value = editingTrainer.value.id
  actionLoading.value = true

  try {
    const payload = {
      name: editingTrainer.value.user.name,
      email: editingTrainer.value.user.email,
      bio: editingTrainer.value.bio,
      expertise_area: editingTrainer.value.expertise_area,
      phone: editingTrainer.value.phone,
      linkedin_profile: editingTrainer.value.linkedin_profile,
      address: editingTrainer.value.address,
      status: editingTrainer.value.status,
      _method: "PUT"
    }

    await api().post(
      `trainer/${editingTrainer.value.id}`,
      payload,
  
    )

    toast({
      title: 'Success',
      description: 'Trainer updated successfully',
      variant: 'default'
    })

    // Update local state
    const index = trainers.value.findIndex(t => t.id === editingTrainer.value.id)
    if (index !== -1) {
      trainers.value[index] = { ...trainers.value[index], ...editingTrainer.value }
    }

    editingTrainer.value = null
  } catch (error) {
    console.error('Error updating trainer:', error)
    toast({
      title: 'Error',
      description: 'Failed to update trainer',
      variant: 'destructive'
    })
  } finally {
    actionLoading.value = false
    editingId.value = null
  }
}

// Delete trainer
const deleteTrainer = async (trainerId) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  })

  if (!result.isConfirmed) return

  deletingId.value = trainerId
  actionLoading.value = true

  try {
    await api().delete(`trainer/${trainerId}`)

    toast({
      title: 'Success',
      description: 'Trainer deleted successfully',
      variant: 'default'
    })

    // Remove from local state
    trainers.value = trainers.value.filter(t => t.id !== trainerId)

    // Close modals if open
    if (selectedTrainer.value && selectedTrainer.value.id === trainerId) {
      selectedTrainer.value = null
    }
    if (editingTrainer.value && editingTrainer.value.id === trainerId) {
      editingTrainer.value = null
    }
  } catch (error) {
    console.error('Error deleting trainer:', error)
    toast({
      title: 'Error',
      description: 'Failed to delete trainer',
      variant: 'destructive'
    })
  } finally {
    actionLoading.value = false
    deletingId.value = null
  }
}

const viewDetails = (trainer) => {
  selectedTrainer.value = trainer
}

// Reset current page when filters change
const resetPagination = () => {
  currentPage.value = 1
}

// Watch filters and reset pagination
watch(() => filters, resetPagination, { deep: true })

// Fetch data on component mount
onMounted(() => {
  fetchTrainers()
})
</script>