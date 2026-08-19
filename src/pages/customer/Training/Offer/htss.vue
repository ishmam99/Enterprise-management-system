<template>
  <div class="px-10 bg-white py-5 w-11/12 mx-auto">
    <div class="bg-teal-700 rounded-t-2xl text-white px-6 py-4">
      <h1 class="text-2xl font-semibold">Offer Approvals</h1>
      <p class="text-gray-300">Review and approve pending offers</p>
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
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">ID</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Event Type</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Platform</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Industry</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Solution</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Software</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Training</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Start Date</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">End Date</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Location</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Status</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="offer in paginatedOffers"
              :key="offer.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="border border-gray-300 px-4 py-3 text-gray-600">{{ offer.id }}</td>

              <!-- Event Type -->
              <td class="border border-gray-300 px-4 py-3">
                <span
                  class="px-2 py-1 rounded-full text-xs font-medium capitalize"
                  :class="{
                    'bg-teal-100 text-teal-800': offer.trainingEvent?.training_type === 'online',
                    'bg-orange-100 text-orange-800': offer.trainingEvent?.training_type === 'onsite',
                    'bg-pink-100 text-pink-800': offer.trainingEvent?.training_type === 'seminar',
                    'bg-indigo-100 text-indigo-800': offer.trainingEvent?.training_type === 'conference'
                  }"
                >
                  {{ offer.trainingEvent?.training_type ?? 'N/A' }}
                </span>
              </td>

              <!-- Platform -->
              <td class="border border-gray-300 px-4 py-3">
                <span class="px-2 py-1 rounded-full text-xs font-medium capitalize bg-teal-100 text-teal-800">
                  {{ offer.trainingEvent?.platform ?? 'N/A' }}
                </span>
              </td>

              <!-- Industry -->
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ offer.industry_name ?? offer.trainingEvent?.training_course?.industry?.name ?? 'N/A' }}
              </td>

              <!-- Solution -->
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ offer.solution_name ?? offer.trainingEvent?.training_course?.solution?.name ?? 'N/A' }}
              </td>

              <!-- Software -->
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ offer.software_name ?? offer.trainingEvent?.training_course?.software?.name ?? 'N/A' }}
              </td>

              <!-- Training Title & Code -->
              <td class="border border-gray-300 px-4 py-3">
                <div class="font-medium text-gray-900 text-sm">
                  {{ offer.trainingCourse ?? offer.trainingEvent?.training_course?.title ?? 'N/A' }}
                </div>
                <div class="text-xs text-gray-500">
                  {{ offer.trainingEvent?.training_course?.course_code ?? 'N/A' }}
                </div>
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
                {{ offer.location ?? 'N/A' }}
              </td>

              <!-- Status -->
              <td class="border border-gray-300 px-4 py-3">
                <span
                  class="px-2 py-1 rounded-full text-xs font-medium capitalize"
                  :class="{
                    'bg-yellow-100 text-yellow-800': offer.status === 'pending' || offer.status === '2',
                    'bg-green-100 text-green-800': offer.status === 'approved',
                    'bg-red-100 text-red-800': offer.status === 'rejected'
                  }"
                >
                  {{ statusText(offer.status) }}
                </span>
              </td>

              <!-- Actions -->
              <td class="border border-gray-300 px-4 py-3">
                <div class="flex gap-2">
                  <button
                    v-if="offer.status === 'pending' || offer.status === '2'"
                    @click="approveOffer(offer.id)"
                    class="btn btn-success btn-sm rounded-lg text-white"
                    :disabled="actionLoading"
                  >
                    <svg v-if="actionLoading && approvingId === offer.id" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v4m0 12v4m8-8h-4M6 12H2"></path>
                    </svg>
                    <span v-else>Approve</span>
                  </button>

                  <button
                    v-if="offer.status === 'pending' || offer.status === '2'"
                    @click="rejectOffer(offer.id)"
                    class="btn btn-error btn-sm rounded-lg text-white"
                    :disabled="actionLoading"
                  >
                    <svg v-if="actionLoading && rejectingId === offer.id" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v4m0 12v4m8-8h-4M6 12H2"></path>
                    </svg>
                    <span v-else>Reject</span>
                  </button>

                  <button @click="viewDetails(offer)" class="btn btn-info btn-sm rounded-lg text-white">
                    View
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="filteredOffers.length === 0 && !loading" class="text-center py-8 text-gray-500">
          <p class="mt-4 text-lg">No offers found</p>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="filteredOffers.length > 0" class="flex justify-between items-center mt-6">
        <div class="text-sm text-gray-600">
          Showing {{ paginatedOffers.length }} of {{ filteredOffers.length }} records
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

    <!-- Modal -->
    <div v-if="selectedOffer" class="modal modal-open">
      <div class="modal-box max-w-4xl">
        <h3 class="font-bold text-lg mb-4">Offer Details</h3>
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label class="font-semibold text-gray-700">Event Type:</label>
            <p class="text-gray-900 capitalize">{{ selectedOffer.trainingEvent?.training_type ?? 'N/A' }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Platform:</label>
            <p class="text-gray-900 capitalize">{{ selectedOffer.trainingEvent?.platform ?? 'N/A' }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Industry:</label>
            <p class="text-gray-900">{{ selectedOffer.industry_name ?? selectedOffer.trainingEvent?.training_course?.industry?.name ?? 'N/A' }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Solution:</label>
            <p class="text-gray-900">{{ selectedOffer.solution_name ?? selectedOffer.trainingEvent?.training_course?.solution?.name ?? 'N/A' }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Software:</label>
            <p class="text-gray-900">{{ selectedOffer.software_name ?? selectedOffer.trainingEvent?.training_course?.software?.name ?? 'N/A' }}</p>
          </div>
          <div>
            <label class="font-semibold text-gray-700">Training:</label>
            <p class="text-gray-900">{{ selectedOffer.trainingCourse ?? selectedOffer.trainingEvent?.training_course?.title ?? 'N/A' }}</p>
            <p class="text-sm text-gray-500">{{ selectedOffer.trainingEvent?.training_course?.course_code ?? 'N/A' }}</p>
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
            <label class="font-semibold text-gray-700">Location:</label>
            <p class="text-gray-900">{{ selectedOffer.location ?? 'N/A' }}</p>
          </div>
        </div>

        <div class="mb-6">
          <label class="font-semibold text-gray-700">Status:</label>
          <span
            class="px-2 py-1 rounded-full text-xs font-medium capitalize ml-2"
            :class="{
              'bg-yellow-100 text-yellow-800': (selectedOffer.status === 'pending' || selectedOffer.status === '2'),
              'bg-green-100 text-green-800': selectedOffer.status === 'approved',
              'bg-red-100 text-red-800': selectedOffer.status === 'rejected'
            }"
          >
            {{ statusText(selectedOffer.status) }}
          </span>
        </div>

        <div class="modal-action">
          <button class="btn" @click="selectedOffer = null">Close</button>
          <div v-if="selectedOffer.status === 'pending' || selectedOffer.status === '2'" class="flex gap-2">
            <button @click="approveOffer(selectedOffer.id)" class="btn btn-success text-white" :disabled="actionLoading">Approve</button>
            <button @click="rejectOffer(selectedOffer.id)" class="btn btn-error text-white" :disabled="actionLoading">Reject</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from '@/components/ui/toast/use-toast'
import { useAuthStore } from '@/stores/AuthStore'
import { ref, onMounted, computed } from 'vue'
import api from '@/config/api'

const authStore = useAuthStore()
const { toast } = useToast()

// Reactive state
const offers = ref([])
const selectedOffer = ref(null)
const loading = ref(false)
const actionLoading = ref(false)
const approvingId = ref(null)
const rejectingId = ref(null)
const currentPage = ref(1)
const itemsPerPage = 10

// Fetch offers
const fetchOffers = async () => {
  loading.value = true
  try {
    const response = await api().get('training-offer', {
      headers: { Authorization: `Bearer ${authStore.token}` }
    })
    offers.value = response.data.data || response.data || []
  } catch (error) {
    console.error('Error fetching offers:', error)
    toast({ title: 'Error', description: 'Failed to load offers', variant: 'destructive' })
  } finally {
    loading.value = false
  }
}

// Helper: format status (your API uses numbers sometimes)
const statusText = (status) => {
  if (status === '2' || status === 'pending') return 'pending'
  if (status === 'approved') return 'approved'
  if (status === 'rejected') return 'rejected'
  return status ?? 'unknown'
}

// Date formatter
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

// Computed: filtered (you can add filters later)
const filteredOffers = computed(() => offers.value)

// Computed: paginated
const paginatedOffers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredOffers.value.slice(start, end)
})

// Actions
const approveOffer = async (offerId) => {
  approvingId.value = offerId
  actionLoading.value = true
  try {
    await api().patch(`offers/${offerId}/approve`, {}, {
      headers: { Authorization: `Bearer ${authStore.token}` }
    })
    toast({ title: 'Success', description: 'Offer approved', variant: 'default' })

    const offer = offers.value.find(o => o.id === offerId)
    if (offer) offer.status = 'approved'
    if (selectedOffer.value?.id === offerId) selectedOffer.value.status = 'approved'
  } catch (err) {
    toast({ title: 'Error', description: 'Failed to approve offer', variant: 'destructive' })
  } finally {
    actionLoading.value = false
    approvingId.value = null
  }
}

const rejectOffer = async (offerId) => {
  rejectingId.value = offerId
  actionLoading.value = true
  try {
    await api().patch(`offers/${offerId}/reject`, {}, {
      headers: { Authorization: `Bearer ${authStore.token}` }
    })
    toast({ title: 'Success', description: 'Offer rejected', variant: 'default' })

    const offer = offers.value.find(o => o.id === offerId)
    if (offer) offer.status = 'rejected'
    if (selectedOffer.value?.id === offerId) selectedOffer.value.status = 'rejected'
  } catch (err) {
    toast({ title: 'Error', description: 'Failed to reject offer', variant: 'destructive' })
  } finally {
    actionLoading.value = false
    rejectingId.value = null
  }
}

const viewDetails = (offer) => {
  selectedOffer.value = { ...offer } // shallow clone to avoid mutating original
}

onMounted(() => {
  fetchOffers()
})
</script>
