<template>
  <div class="px-10 bg-white py-5 w-11/12 mx-auto">
    <div class="bg-teal-700 rounded-t-2xl text-white px-6 py-4">
      <h1 class="text-2xl font-semibold">Offered Training List</h1>
      <p class="text-gray-300">Review offered training list</p>
    </div>

    <div class="bg-white rounded-xl p-5 w-full shadow-md mt-5">
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
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                ID
              </th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                Training
              </th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                Event Type
              </th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                Platform
              </th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                Industry
              </th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                Solution
              </th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                Software
              </th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                Start Date
              </th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                End Date
              </th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                Location
              </th>
              <!-- <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                Status
              </th> -->
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="offer in filteredOffers"
              :key="offer.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="border border-gray-300 px-4 py-3 text-gray-600">{{ offer.id }}</td>

              <!-- Training -->
              <td class="border border-gray-300 px-4 py-3">
                <div class="font-medium text-gray-900 text-sm">
                  {{ offer.event.training_course.code }}
                </div>
                <!-- <div class="text-xs text-gray-500">{{ getTrainingCode(offer.training_id) }}</div> -->
              </td>
              <!-- Event Type -->
              <td class="border border-gray-300 px-4 py-3">
                <span
                  class="px-2 py-1 rounded-full text-xs font-medium capitalize"
                  :class="{
                    'bg-teal-100 text-teal-800': offer.event.training_type == 'online',
                    'bg-orange-100 text-orange-800': offer.event.training_type == 'onsite',
                    'bg-pink-100 text-pink-800': offer.event.training_type == 'seminar',
                    'bg-indigo-100 text-indigo-800':
                      offer.event.training_type == 'conference'
                  }"
                >
                  {{ offer.event.training_type }}
                </span>
              </td>

              <!-- Training Platform -->
              <td class="border border-gray-300 px-4 py-3">
                <span
                  class="px-2 py-1 rounded-full text-xs font-medium capitalize bg-blue-100 text-blue-800"
                >
                  {{ offer.event.platform }}
                </span>
              </td>

              <!-- Industry -->
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ offer.event.training_course.analysis || 'N/A'  }}
              </td>

              <!-- Solution -->
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ offer.event.training_course.solution.name }}
              </td>

              <!-- Software -->
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ offer.event.training_course.software.name }}
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
                {{ offer.location }}
              </td>

              <!-- Status -->
            <!-- <td class="border border-gray-300 px-4 py-3">
              <span
                class="px-2 py-1 rounded-full text-xs font-medium capitalize"
                :class="{
                  'bg-yellow-100 text-yellow-800': offer.status == 0,
                  'bg-green-100 text-green-800': offer.status == 1,
                  'bg-red-100 text-red-800': offer.status == 2
                }"
              >
                {{
                  offer.status == 1
                    ? 'approved'
                    : offer.status == 2
                    ? 'completed'
                    : 'pending'
                }}
              </span>
            </td> -->

              <!-- Actions -->
              <td class="border border-gray-300 px-4 py-3">
                <div class="flex gap-2">
                  <!-- Approve Button -->

                  <!-- View Details -->
                  <button
                    @click="viewDetails(offer)"
                    class="btn btn-info btn-sm rounded-lg text-white"
                  >
                    View
                  </button>
                  <!-- <router-link
                    :to="{ name: 'training_management-UserTraining-id', params: { id: offer.id } }"
                    class="btn bg-amber-500 btn-sm rounded-lg text-white hover:bg-amber-600"
                  >
                    Enroll Now
                  </router-link> -->
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="filteredOffers.length === 0" class="text-center py-8 text-gray-500">
          <svg
            class="w-16 h-16 mx-auto text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
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
          <button
            class="join-item btn btn-sm"
            :disabled="currentPage * itemsPerPage >= filteredOffers.length"
            @click="currentPage++"
          >
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
            <label class="font-semibold text-gray-700">Event Type:</label>
            <p class="text-gray-900 capitalize">{{ selectedOffer.event_type }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Training Platform:</label>
            <p class="text-gray-900 capitalize">{{ selectedOffer.training_platform }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Industry:</label>
            <p class="text-gray-900">{{ getIndustryName(selectedOffer.industry_id) }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Solution:</label>
            <p class="text-gray-900">{{ getSolutionName(selectedOffer.solution_id) }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Software:</label>
            <p class="text-gray-900">{{ getSoftwareName(selectedOffer.software_id) }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Training:</label>
            <p class="text-gray-900">{{ getTrainingTitle(selectedOffer.training_id) }}</p>
            <p class="text-sm text-gray-500">{{ getTrainingCode(selectedOffer.training_id) }}</p>
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
            <p class="text-gray-900">{{ selectedOffer.event_location }}</p>
          </div>
        </div>

        <div class="mb-6">
          <label class="font-semibold text-gray-700">Status:</label>
          <span
            class="px-2 py-1 rounded-full text-xs font-medium capitalize ml-2"
            :class="{
              'bg-yellow-100 text-yellow-800': selectedOffer.status === 'pending',
              'bg-green-100 text-green-800': selectedOffer.status === 'approved',
              'bg-red-100 text-red-800': selectedOffer.status === 'rejected'
            }"
          >
            {{ selectedOffer.status }}
          </span>
        </div>

        <div class="modal-action">
          <button class="btn" @click="selectedOffer = null">Close</button>
          <div v-if="selectedOffer.status === 'pending'" class="flex gap-2">
            <button
              @click="approveOffer(selectedOffer.id)"
              class="btn btn-success text-white"
              :disabled="actionLoading"
            >
              Approve
            </button>
            <button
              @click="rejectOffer(selectedOffer.id)"
              class="btn btn-error text-white"
              :disabled="actionLoading"
            >
              Reject
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
const softwareSkills = ref([])
const trainings = ref([])
const selectedOffer = ref(null)
const loading = ref(false)
const actionLoading = ref(false)
const approvingId = ref(null)
const rejectingId = ref(null)
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
    const response = await api().get('training-offer?with=event.trainingCourse.software,event.trainingCourse.industry,event.trainingCourse.solution&status=2', {})
    offers.value = response.data.data || response.data
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
    const [industriesRes, solutionsRes, softwareRes, trainingsRes] = await Promise.all([
      api().get('industries', { headers: { Authorization: `Bearer ${authStore.token}` } }),
      api().get('solutions', { headers: { Authorization: `Bearer ${authStore.token}` } }),
      api().get('software-skills', { headers: { Authorization: `Bearer ${authStore.token}` } })
      // api().get('trainings', { headers: { 'Authorization': `Bearer ${authStore.token}` } })
    ])

    industries.value = industriesRes.data.data || industriesRes.data
    solutions.value = solutionsRes.data.data || solutionsRes.data
    softwareSkills.value = softwareRes.data.data || softwareRes.data
    // trainings.value = trainingsRes.data.data || trainingsRes.data
  } catch (error) {
    console.error('Error fetching reference data:', error)
  }
}

// Helper functions to get names from IDs
const getIndustryName = (industryId) => {
  const industry = industries.value.find((ind) => ind.id === industryId)
  return industry?.name || 'N/A'
}

const getSolutionName = (solutionId) => {
  const solution = solutions.value.find((sol) => sol.id === solutionId)
  return solution?.name || 'N/A'
}

const getSoftwareName = (softwareId) => {
  const software = softwareSkills.value.find((soft) => soft.id === softwareId)
  return software?.name || 'N/A'
}

const getTrainingTitle = (trainingId) => {
  const training = trainings.value.find((t) => t.id === trainingId)
  return training?.title || 'N/A'
}

const getTrainingCode = (trainingId) => {
  const training = trainings.value.find((t) => t.id === trainingId)
  return training?.course_code || 'N/A'
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
    filtered = filtered.filter((offer) => offer.status === filters.status)
  }

  // Filter by event type
  if (filters.event_type) {
    filtered = filtered.filter((offer) => offer.event_type === filters.event_type)
  }

  // Filter by platform
  if (filters.training_platform) {
    filtered = filtered.filter((offer) => offer.training_platform === filters.training_platform)
  }

  // Filter by search
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(
      (offer) =>
        getIndustryName(offer.industry_id).toLowerCase().includes(searchLower) ||
        getSolutionName(offer.solution_id).toLowerCase().includes(searchLower) ||
        getSoftwareName(offer.software_id).toLowerCase().includes(searchLower) ||
        getTrainingTitle(offer.training_id).toLowerCase().includes(searchLower) ||
        offer.event_location.toLowerCase().includes(searchLower)
    )
  }

  return filtered
})

// Actions
const approveOffer = async (offerId) => {
  approvingId.value = offerId
  actionLoading.value = true

  try {
    await api().patch(
      `offers/${offerId}/approve`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      }
    )

    toast({
      title: 'Success',
      description: 'Offer approved successfully',
      variant: 'default'
    })

    // Update local state
    const offer = offers.value.find((o) => o.id === offerId)
    if (offer) {
      offer.status = 'approved'
    }

    // Close modal if open
    if (selectedOffer.value && selectedOffer.value.id === offerId) {
      selectedOffer.value.status = 'approved'
    }
  } catch (error) {
    console.error('Error approving offer:', error)
    toast({
      title: 'Error',
      description: 'Failed to approve offer',
      variant: 'destructive'
    })
  } finally {
    actionLoading.value = false
    approvingId.value = null
  }
}

const rejectOffer = async (offerId) => {
  rejectingId.value = offerId
  actionLoading.value = true

  try {
    await api().patch(
      `offers/${offerId}/reject`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      }
    )

    toast({
      title: 'Success',
      description: 'Offer rejected successfully',
      variant: 'default'
    })

    // Update local state
    const offer = offers.value.find((o) => o.id === offerId)
    if (offer) {
      offer.status = 'rejected'
    }

    // Close modal if open
    if (selectedOffer.value && selectedOffer.value.id === offerId) {
      selectedOffer.value.status = 'rejected'
    }
  } catch (error) {
    console.error('Error rejecting offer:', error)
    toast({
      title: 'Error',
      description: 'Failed to reject offer',
      variant: 'destructive'
    })
  } finally {
    actionLoading.value = false
    rejectingId.value = null
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
