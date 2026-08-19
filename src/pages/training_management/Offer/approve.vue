<template>
  <div class="px-2 bg-white py-5 w-11/12 mx-auto">
    <div class="bg-teal-700 rounded-t-2xl text-white px-6 py-4">
      <h1 class="text-2xl font-semibold">Offer Approvals</h1>
      <p class="text-gray-300">Review and approve pending offers</p>
    </div>

    <div class="bg-white rounded-xl p-5 w-full shadow-md mt-5">
      <!-- Filters and Search -->
      <div class="flex justify-between items-center mb-6">
        <div class="flex gap-4">
          <!-- Status Filter -->
          <!-- <select v-model="filters.status" class="select select-bordered select-sm rounded-lg">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select> -->

          <!-- Event Type Filter -->
          <!-- <select v-model="filters.event_type" class="select select-bordered select-sm rounded-lg">
            <option value="">All Event Types</option>
            <option value="company">Company</option>
            <option value="group">Group</option>
            <option value="individual">Individual</option>
          </select> -->

          <!-- Platform Filter -->
          <!-- <select v-model="filters.training_platform" class="select select-bordered select-sm rounded-lg">
            <option value="">All Platforms</option>
            <option value="online">Online</option>
            <option value="onsite">Onsite</option>
            <option value="seminar">Seminar</option>
            <option value="conference">Conference</option>
          </select> -->
        </div>

        <!-- Search -->
        <div class="relative">
          <input
            type="text"
            v-model="filters.search"
            placeholder="Search offers..."
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
        <span class="ml-2 text-gray-600">Loading offers...</span>
      </div>

      <!-- Table -->
      <div v-else class="overflow-x-auto">
        <table class="table table-auto w-full border-collapse border border-gray-200">
          <thead class="bg-teal-50">
            <tr>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">ID</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Event Type</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Platform</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Analysis</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Solution</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Software</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Price</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Seats</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Start Date</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">End Date</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Location</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Status</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="offer in filteredOffers" 
              :key="offer.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="border border-gray-300 px-4 py-3 text-gray-600">{{ offer.id }}</td>
              
              <!-- Event Type -->
              <td class="border border-gray-300 px-4 py-3">
                <span class="px-2 py-1 rounded-full text-xs font-medium capitalize"
                  :class="{
                    'bg-blue-100 text-blue-800': offer.event_type === 'company',
                    'bg-green-100 text-green-800': offer.event_type === 'group',
                    'bg-purple-100 text-purple-800': offer.event_type === 'individual'
                  }"
                >
                  {{ offer.event.training_type || 'N/A' }}
                </span>
              </td>

              <!-- Training Platform -->
              <td class="border border-gray-300 px-4 py-3">
                <span class="px-2 py-1 rounded-full text-xs font-medium capitalize"
                  :class="{
                    'bg-teal-100 text-teal-800': offer.training_platform === 'online',
                    'bg-orange-100 text-orange-800': offer.training_platform === 'onsite',
                    'bg-pink-100 text-pink-800': offer.training_platform === 'seminar',
                    'bg-indigo-100 text-indigo-800': offer.training_platform === 'conference'
                  }"
                >
                  {{ offer.event.platform || 'N/A' }}
                </span>
              </td>

              <!-- Industry -->
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ offer.event.training_course.analysis || 'N/A' }}
              </td>

              <!-- Solution -->
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ offer.event.training_course.solution.name }}
              </td>

              <!-- Software -->
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ offer.event.training_course.software.name }}
              </td>

              <!-- Price -->
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                ${{ offer.price || '0.00' }}
              </td>

              <!-- Available Seats -->
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ offer.available_seats || '0' }}
              </td>

              <!-- Dates -->
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ formatDate(offer.start_date) }}
              </td>
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ formatDate(offer.end_date) }}
              </td>

              <!-- Location -->
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ offer.location || 'N/A' }}
              </td>

              <!-- Status -->
              <td class="border border-gray-300 px-4 py-3">
                <span 
                  class="px-2 py-1 rounded-full text-xs font-medium capitalize"
                  :class="{
                    'bg-yellow-100 text-yellow-800': offer.status === 'pending' || offer.status === '0',
                    'bg-green-100 text-green-800': offer.status === 'approved' || offer.status === '1',
                    'bg-red-100 text-red-800': offer.status === 'rejected' || offer.status === '2'
                  }"
                >
                  {{ getStatusText(offer.status) }}
                </span>
              </td>

              <!-- Actions -->
              <td class="border border-gray-300 px-4 py-3">
                <div class="flex gap-2">
                  <!-- View Details -->
                  <button
                    @click="viewDetails(offer)"
                    class="px-3 py-2 rounded-md shadow-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors"
                  >
                    View
                  </button>
                  <!-- Approve Button -->
                  <button
                    class="px-3 py-2 rounded-md shadow-md bg-green-600 text-white text-sm hover:bg-green-700 transition-colors"
                    @click="statusUpdate(offer)"
                    :disabled="actionLoading"
                  >
                    <span v-if="actionLoading && approvingId === offer.id" class="loading loading-spinner loading-xs"></span>
                    Approve
                  </button>

                  <!-- Delete Button -->
                  <button
                    @click="deleteOffer(offer.id)"
                    class="px-3 py-2 rounded-md shadow-md bg-red-600 text-white text-sm hover:bg-red-700 transition-colors"
                    :disabled="actionLoading"
                  >
                    <span v-if="actionLoading && deletingId === offer.id" class="loading loading-spinner loading-xs"></span>
                    Delete
                  </button>

                  
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="filteredOffers.length === 0" class="text-center py-8 text-gray-500">
          <svg class="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <p class="mt-4 text-lg">No offers found</p>
          <p class="text-sm">Try adjusting your filters or search terms</p>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="filteredOffers.length > 0" class="flex justify-between items-center mt-6">
        <div class="text-sm text-gray-600">
          Showing {{ filteredOffers.length }} of {{ offers.length }} records
        </div>
        <div class="join">
          <button class="join-item btn btn-sm" :disabled="currentPage === 1" @click="currentPage--">
            Previous
          </button>
          <button class="join-item btn btn-sm btn-active">{{ currentPage }}</button>
          <button class="join-item btn btn-sm" :disabled="currentPage * itemsPerPage >= filteredOffers.length" @click="currentPage++">
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Offer Details Modal -->
    <div v-if="selectedOffer" class="modal modal-open">
      <div class="modal-box max-w-4xl">
        <h3 class="font-bold text-lg mb-4">Offer Details</h3>
        
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label class="font-semibold text-gray-700">Offer ID:</label>
            <p class="text-gray-900">{{ selectedOffer.id }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Event Type:</label>
            <p class="text-gray-900 capitalize">{{ selectedOffer.event_type || 'N/A' }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Training Platform:</label>
            <p class="text-gray-900 capitalize">{{ selectedOffer.training_platform || 'N/A' }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Industry:</label>
            <p class="text-gray-900">{{ getIndustryName(selectedOffer) }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Solution:</label>
            <p class="text-gray-900">{{ getSolutionName(selectedOffer) }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Software:</label>
            <p class="text-gray-900">{{ getSoftwareName(selectedOffer) }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Training:</label>
            <p class="text-gray-900">{{ getTrainingTitle(selectedOffer) }}</p>
            <p class="text-sm text-gray-500">{{ getTrainingCode(selectedOffer) }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Instructor:</label>
            <p class="text-gray-900">{{ getInstructorName(selectedOffer) }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Price:</label>
            <p class="text-gray-900">${{ selectedOffer.price || '0.00' }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Available Seats:</label>
            <p class="text-gray-900">{{ selectedOffer.available_seats || '0' }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Start Date:</label>
            <p class="text-gray-900">{{ formatDate(selectedOffer.start_date) }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">End Date:</label>
            <p class="text-gray-900">{{ formatDate(selectedOffer.end_date) }}</p>
          </div>
          <div class="col-span-2">
            <label class="font-semibold text-gray-700">Event Location:</label>
            <p class="text-gray-900">{{ selectedOffer.location || 'N/A' }}</p>
          </div>
        </div>

        <div class="mb-6">
          <label class="font-semibold text-gray-700">Status:</label>
          <span 
            class="px-2 py-1 rounded-full text-xs font-medium capitalize ml-2"
            :class="{
              'bg-yellow-100 text-yellow-800': selectedOffer.status === 'pending' || selectedOffer.status === '0',
              'bg-green-100 text-green-800': selectedOffer.status === 'approved' || selectedOffer.status === '1',
              'bg-red-100 text-red-800': selectedOffer.status === 'rejected' || selectedOffer.status === '2'
            }"
          >
            {{ getStatusText(selectedOffer.status) }}
          </span>
        </div>

        <div class="modal-action">
          <button class="btn" @click="selectedOffer = null">Close</button>
          <div class="flex gap-2">
            <button 
              @click="statusUpdate(selectedOffer)" 
              class="btn btn-success text-white"
              :disabled="actionLoading"
            >
              Approve
            </button>
            <button 
              @click="deleteOffer(selectedOffer.id)" 
              class="btn btn-error text-white"
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
import api from '@/config/api'

const authStore = useAuthStore()
const { toast } = useToast()

// Data
const offers = ref([])
const industries = ref([])
const solutions = ref([])
const softwares = ref([])
const trainings = ref([])
const instructors = ref([])
const selectedOffer = ref(null)
const loading = ref(false)
const actionLoading = ref(false)
const approvingId = ref(null)
const deletingId = ref(null)
const currentPage = ref(1)
const itemsPerPage = 10

// Filters
const filters = reactive({
  status: '',
  event_type: '',
  training_platform: '',
  search: ''
})

// Fetch offers
const fetchOffers = async () => {
  loading.value = true
  try {
    const response = await api().get('training-offer?with=event.trainingCourse.software,event.trainingCourse.industry,event.trainingCourse.solution')
    console.log('Offers API Response:', response.data) // Debug log
    
    // Filter offers and ensure nested data exists
    offers.value = (response.data.data || response.data)
      .filter(e => e.status == 0)
      .map(offer => {
        // Ensure nested objects exist to prevent errors
        if (offer.event?.trainingCourse) {
          offer.event.trainingCourse.software = offer.event.trainingCourse.software || {}
          offer.event.trainingCourse.industry = offer.event.trainingCourse.industry || {}
          offer.event.trainingCourse.solution = offer.event.trainingCourse.solution || {}
        }
        return offer
      })
    
    console.log('Processed offers:', offers.value) // Debug log to verify data
    
  } catch (error) {
    console.error('Error fetching offers:', error)
    toast({
      title: 'Error',
      description: 'Failed to load offers',
      variant: 'destructive'
    })
  } finally {
    loading.value = false
  }
}

// Fetch reference data
const fetchReferenceData = async () => {
  try {
    const [industriesRes, solutionsRes, softwaresRes, trainersRes] = await Promise.all([
      api().get('industries'),
      api().get('solutions'),
      api().get('softwares'),
      api().get('trainer?with=user')
    ])

    industries.value = industriesRes.data.data || industriesRes.data
    solutions.value = solutionsRes.data.data || solutionsRes.data
    softwares.value = softwaresRes.data.data || softwaresRes.data
    instructors.value = trainersRes.data.data || trainersRes.data
    
    console.log('Reference Data:', {
      industries: industries.value,
      solutions: solutions.value,
      softwares: softwares.value,
      instructors: instructors.value
    }) // Debug log
  } catch (error) {
    console.error('Error fetching reference data:', error)
  }
}

// Helper functions to get names from IDs
const getIndustryName = (offer) => {
  // Check if industry relationship exists
  if (offer.industry?.name) return offer.industry.name
  
  // Fallback to ID lookup
  const industry = industries.value.find(ind => ind.id == offer.industry_id)
  return industry?.name || 'N/A'
}

const getSolutionName = (offer) => {
  // Check if solution relationship exists
  if (offer.solution?.name) return offer.solution.name
  
  // Fallback to ID lookup
  const solution = solutions.value.find(sol => sol.id == offer.solution_id)
  return solution?.name || 'N/A'
}

const getSoftwareName = (offer) => {
  // Check if software relationship exists
  if (offer.software?.name) return offer.software.name
  
  // Fallback to ID lookup
  const software = softwares.value.find(soft => soft.id == offer.software_id)
  return software?.name || 'N/A'
}

const getTrainingTitle = (offer) => {
  // Check if training relationship exists
  if (offer.training?.title) return offer.training.title
  if (offer.trainingCourse?.title) return offer.trainingCourse.title
  
  // Fallback to ID lookup
  const training = trainings.value.find(t => t.id == offer.training_id)
  return training?.title || 'N/A'
}

const getTrainingCode = (offer) => {
  // Check if training relationship exists
  if (offer.training?.course_id) return offer.training.course_id
  if (offer.trainingCourse?.course_id) return offer.trainingCourse.course_id
  
  // Fallback to ID lookup
  const training = trainings.value.find(t => t.id == offer.training_id)
  return training?.course_id || 'N/A'
}

const getInstructorName = (offer) => {
  // Check if instructor relationship exists
  if (offer.instructor?.user?.name) return offer.instructor.user.name
  if (offer.trainer?.user?.name) return offer.trainer.user.name
  
  // Fallback to ID lookup
  const instructor = instructors.value.find(inst => inst.id == offer.instructor_id)
  return instructor?.user?.name || 'N/A'
}

// Convert status codes to text
const getStatusText = (status) => {
  switch(status) {
    case '0': return 'pending'
    case '1': return 'approved'
    case '2': return 'rejected'
    default: return status
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

// Filter offers
const filteredOffers = computed(() => {
  let filtered = offers.value

  // Filter by status
  if (filters.status) {
    filtered = filtered.filter(offer => {
      const statusText = getStatusText(offer.status)
      return statusText === filters.status
    })
  }

  // Filter by event type
  if (filters.event_type) {
    filtered = filtered.filter(offer => offer.event_type === filters.event_type)
  }

  // Filter by platform
  if (filters.training_platform) {
    filtered = filtered.filter(offer => offer.training_platform === filters.training_platform)
  }

  // Filter by search
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(offer =>
      getIndustryName(offer).toLowerCase().includes(searchLower) ||
      getSolutionName(offer).toLowerCase().includes(searchLower) ||
      getSoftwareName(offer).toLowerCase().includes(searchLower) ||
      getTrainingTitle(offer).toLowerCase().includes(searchLower) ||
      (offer.location && offer.location.toLowerCase().includes(searchLower))
    )
  }

  return filtered
})

// Delete offer
const deleteOffer = async (offerId) => {
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

  deletingId.value = offerId
  actionLoading.value = true

  try {
    await api().delete(`training-offer/${offerId}`)

    toast({
      title: 'Success',
      description: 'Offer deleted successfully',
      variant: 'default'
    })

    // Remove from local state
    offers.value = offers.value.filter(o => o.id !== offerId)

    // Close modal if open
    if (selectedOffer.value && selectedOffer.value.id === offerId) {
      selectedOffer.value = null
    }
  } catch (error) {
    console.error('Error deleting offer:', error)
    toast({
      title: 'Error',
      description: 'Failed to delete offer',
      variant: 'destructive'
    })
  } finally {
    actionLoading.value = false
    deletingId.value = null
  }
}

const statusUpdate = async (offer) => {
  approvingId.value = offer.id
  actionLoading.value = true

  try {
    const payload = {
      training_event_id: offer.event.id, 
      training_platform: offer.training_platform,
      industry_id: offer.industry_id,
      solution_id: offer.solution_id,
      software_id: offer.software_id,
      training_id: offer.training_id,
      instructor_id: offer.instructor_id,
      price: offer.price,
      available_seats: offer.available_seats,
      start_date: offer.start_date,
      end_date: offer.end_date,
      location: offer.location,
      status: 1, 
      _method: "PUT"
    }

    await api().post(
      `training-offer/${offer.id}`,
      payload
    )

    fetchOffers()

    Swal.fire({
      title: 'Approved!',
      text: `Offer has been Approved.`,
      icon: 'success'
    })

    // Close modal if open
    if (selectedOffer.value && selectedOffer.value.id === offer.id) {
      selectedOffer.value = null
    }
  } catch (error) {
    console.error('Error updating status:', error)
    Swal.fire({
      title: 'Error',
      text: 'Failed to Approve. Please try again.',
      icon: 'error'
    })
  } finally {
    actionLoading.value = false
    approvingId.value = null
  }
}

const viewDetails = (offer) => {
  selectedOffer.value = offer
}

// Fetch data on component mount
onMounted(() => {
  fetchOffers()
  fetchReferenceData()
})
</script>