<template>
  <div class="px-4 py-6 w-full mx-auto">
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-800">{{ pageTitle }}</h1>
      <p class="text-gray-500 text-sm mt-1">Manage your training enrollments</p>
    </div>

  

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      <span class="ml-2 text-gray-500">Loading enrollments...</span>
    </div>

    <!-- Table -->
    <div v-else class="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <table class="min-w-full divide-y divide-gray-200 table-auto">
        <thead class="bg-sky-100">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">#</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Course Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Code</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Enrollment Details</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Solution</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Level</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Price</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Status</th>
            <th v-if="isActivePage" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(enrollment, index) in enrollments" :key="enrollment.id" class="even:bg-gray-50 hover:bg-gray-100 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
              {{ index + 1 }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
              {{ enrollment.training_course?.name || 'N/A' }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 border-r border-gray-200">
              {{ enrollment.training_course?.code || 'N/A' }}
            </td>
            <td class="px-6 py-4 border-r border-gray-200">
              <div class="flex flex-col gap-1">
                <!-- Training Type Badge -->
                <span :class="getTrainingTypeBadgeClass(enrollment.training_type)">
                  {{ enrollment.training_type?.toUpperCase() || 'N/A' }}
                </span>
                
                <!-- Group Type Data -->
                <div v-if="enrollment.training_type === 'group'" class="text-xs text-gray-600 mt-1">
                  <div class="flex items-center gap-1">
                    <i class="ri-calendar-line text-gray-400"></i>
                    <span>Course Schedule: {{ enrollment.training_course_schedule?.date || 'TBD' }}</span>
                  </div>
                </div>
                <div class="flex items-center gap-1">
                    <i class="ri-calendar-line text-gray-400 "></i>
                    <span class="text-xs text-gray-600 mt-1 space-y-1">Preferred Start Date: {{ formatDate(enrollment.preferred_start_date) || "Not Available" }}</span>
                  </div>
                <!-- Company Type Data -->
                <div v-if="enrollment.training_type === 'company'" class="text-xs text-gray-600 mt-1 space-y-1">
                  
                  <div class="flex items-center gap-1">
                    <i class="ri-group-line text-gray-400"></i>
                    <span>Participants: {{ enrollment.number_of_participants || 1 }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <i class="ri-building-line text-gray-400"></i>
                    <span>{{ enrollment.organization || 'N/A' }}</span>
                  </div>
                </div>
                
                <!-- Individual Type - No extra data -->
                <div v-if="enrollment.training_type === 'individual'" class="text-xs text-gray-400 mt-1">
                  <span>Standard enrollment</span>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 border-r border-gray-200">
              {{ getSolutionName(enrollment) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 border-r border-gray-200">
              {{ enrollment.training_course?.level || 'N/A' }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 border-r border-gray-200">
              ${{ formatPrice(getCoursePrice(enrollment)) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap border-r border-gray-200">
              <span :class="statusBadgeClass(enrollment.status)" class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full">
                {{ formatStatus(enrollment.status) }}
              </span>
            </td>
            <td v-if="isActivePage && enrollment.payment_status == 'pending'" class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
              <button
                @click="openPaymentModal(enrollment)"
                :disabled="processingPayment"
                class="inline-flex items-center px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i class="ri-bank-card-line mr-1"></i> 
                {{ processingPayment ? 'Processing...' : 'Pay' }}
              </button>
             </td>

             <td v-else class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
              <span :class="statusBadgeClass(enrollment.status)" class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full">
                {{ enrollment.payment_status.toUpperCase() || "N/A" }}
              </span>
             </td>
           </tr>
          <tr v-if="enrollments.length === 0">
            <td :colspan="isActivePage ? 9 : 8" class="px-6 py-12 text-center text-gray-500">
              <div class="flex flex-col items-center">
                <i class="ri-inbox-line text-4xl text-gray-300 mb-2"></i>
                <p>No enrollments found with status: {{ route.params.status }}</p>
              </div>
             </td>
           </tr>
        </tbody>
      </table>
    </div>

    <!-- Mock Payment Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closePaymentModal"></div>

        <!-- Modal Panel -->
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                <i class="ri-bank-card-line text-blue-600 text-xl"></i>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Complete Your Payment (Demo)
                </h3>
                <div class="mt-4 space-y-3 border-t border-gray-100 pt-4">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-500">Course:</span>
                    <span class="font-medium text-gray-900">{{ selectedEnrollment?.training_course?.name || 'N/A' }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-500">Course Code:</span>
                    <span class="font-medium text-gray-900">{{ selectedEnrollment?.training_course?.code || 'N/A' }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-500">Student Name:</span>
                    <span class="font-medium text-gray-900">{{ selectedEnrollment?.user?.name || 'N/A' }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-500">Email:</span>
                    <span class="font-medium text-gray-900">{{ selectedEnrollment?.user?.email || 'N/A' }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-500">Enrollment Type:</span>
                    <span class="font-medium text-gray-900">{{ selectedEnrollment?.training_type?.toUpperCase() || 'N/A' }}</span>
                  </div>
                  
                  <!-- Group Type Specific Fields -->
                  <div v-if="selectedEnrollment?.training_type === 'group'" class="flex justify-between text-sm">
                    <span class="text-gray-500">Schedule Date:</span>
                    <span class="font-medium text-gray-900">{{ selectedEnrollment?.training_course_schedule?.date || 'N/A' }}</span>
                  </div>
                  
                  <!-- Company Type Specific Fields -->
                  <div v-if="selectedEnrollment?.training_type === 'company'">
                    <div class="flex justify-between text-sm mb-2">
                      <span class="text-gray-500">Organization:</span>
                      <span class="font-medium text-gray-900">{{ selectedEnrollment?.organization || 'N/A' }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-500">Number of Participants:</span>
                      <span class="font-medium text-gray-900">{{ selectedEnrollment?.number_of_participants || 1 }}</span>
                    </div>
                  </div>
                  
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-500">Enrollment ID:</span>
                    <span class="font-medium text-gray-900">{{ selectedEnrollment?.id || 'N/A' }}</span>
                  </div>
                  
                  <!-- Mock Payment Form -->
                  <div class="mt-4 pt-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Card Details (Demo)</label>
                    <div class="border border-gray-300 rounded-md p-3 bg-gray-50">
                      <div class="space-y-3">
                        <div>
                          <label class="block text-xs text-gray-500 mb-1">Card Number</label>
                          <input 
                            v-model="mockCard.number"
                            type="text" 
                            placeholder="4242 4242 4242 4242"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                          <div>
                            <label class="block text-xs text-gray-500 mb-1">Expiry Date</label>
                            <input 
                              v-model="mockCard.expiry"
                              type="text" 
                              placeholder="MM/YY"
                              class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label class="block text-xs text-gray-500 mb-1">CVC</label>
                            <input 
                              v-model="mockCard.cvc"
                              type="text" 
                              placeholder="123"
                              class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        <div>
                          <label class="block text-xs text-gray-500 mb-1">Cardholder Name</label>
                          <input 
                            v-model="mockCard.name"
                            type="text" 
                            :placeholder="selectedEnrollment?.user?.name || 'John Doe'"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="text-xs text-gray-400 mt-2">
                      <i class="ri-information-line"></i> Demo mode - Any test card works. No actual charge.
                    </div>
                  </div>
                  
                  <div class="flex justify-between text-base font-semibold pt-2 border-t border-gray-200 mt-2">
                    <span>Total Amount:</span>
                    <span class="text-green-600">${{ formatPrice(getCoursePrice(selectedEnrollment)) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse">
            <button 
              type="button" 
              @click="processMockPayment" 
              :disabled="processingPayment"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="processingPayment" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ processingPayment ? 'Processing Payment...' : `Pay $${formatPrice(getCoursePrice(selectedEnrollment))}` }}
            </button>
            <button type="button" @click="closePaymentModal" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/AuthStore'
import Swal from 'sweetalert2'
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const authStore = useAuthStore()
const route = useRoute()

// State
const loading = ref(false)
const enrollments = ref([])
const isModalOpen = ref(false)
const selectedEnrollment = ref(null)
const processingPayment = ref(false)

// Mock card data
const mockCard = ref({
  number: '4242 4242 4242 4242',
  expiry: '12/28',
  cvc: '123',
  name: ''
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Computed page title based on status
const pageTitle = computed(() => {
  const status = route.params.status
  if (status === 'approved') return 'My Pending Payments'
  if (status === 'active') return 'My Active Enrollments'
  return 'My Enrollments'
})

// Check if current page is active (needs action column)
const isActivePage = computed(() => route.params.status === 'approved')

// Helper: Get training type badge class
const getTrainingTypeBadgeClass = (type) => {
  switch (type) {
    case 'group':
      return 'flex justify-center bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium inline-block'
    case 'company':
      return 'flex justify-center bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-medium inline-block'
    case 'individual':
      return 'flex justify-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium inline-block'
    default:
      return 'flex justify-center bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium inline-block'
  }
}

// Helper: Get solution name from training course data
const getSolutionName = (enrollment) => {
  const course = enrollment.training_course
  if (course?.analysis) return course.analysis
  if (course?.solution_id) return `Solution ${course.solution_id}`
  return 'General'
}

// Helper: Get course price
const getCoursePrice = (enrollment) => {
  if (enrollment?.course_price) return parseFloat(enrollment.course_price)
  return 0
}

// Format price to 2 decimal places
const formatPrice = (price) => {
  return Number(price).toFixed(2)
}

// Format status for display
const formatStatus = (status) => {
  if (!status) return 'Unknown'
  return status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')
}

// Status badge color classes
const statusBadgeClass = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'approved':
      return 'bg-blue-100 text-blue-800'
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'completed':
      return 'bg-gray-100 text-gray-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Fetch enrollments from API
const fetchEnrollment = async () => {
  loading.value = true
  try {
    const statusParam = route.params.status
    if (!statusParam) return
    
    const response = await api().get("/training-requests", {
      params: { status: statusParam }
    })
    enrollments.value = response.data?.data?.data || response.data?.data || []
    console.log(`Fetched ${enrollments.value.length} enrollments for status: ${statusParam}`)
  } catch (err) {
    console.error("Error fetching enrollments:", err)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to load enrollments. Please try again later.',
      confirmButtonColor: '#3085d6'
    })
    enrollments.value = []
  } finally {
    loading.value = false
  }
}

// Mock API: Create training enrollment
const createTrainingEnrollment = async (transactionId) => {
    const amountPaid = getCoursePrice(selectedEnrollment.value) * 
    (selectedEnrollment.value.number_of_participants || 1)
  const payload = {
    end_user_id: authStore?.user?.profile?.id,
    training_request_id: selectedEnrollment.value.id,
    training_course_schedule_id: selectedEnrollment.value.training_course_schedule?.id,
    amount_paid: amountPaid,
    transaction_id: transactionId,
    status: 1 
  }
  
  try {
    const response = await api().post('/training-enrollment', payload)
    return response.data
  } catch (error) {
    console.error('Error creating training enrollment:', error)
    throw new Error('Failed to create enrollment record')
  }
}

// Mock API: Update training request payment status
const updateTrainingRequestPayment = async (transactionId) => {
  const amountPaid = getCoursePrice(selectedEnrollment.value) * 
    (selectedEnrollment.value.number_of_participants || 1)
  
  const payload = {
    // _method: "PUT",
    amount: amountPaid,
    payment_reference: transactionId,
    
  }
  
  try {
    const response = await api().post(`/training-requests/${selectedEnrollment.value.id}/payment`, payload)
    return response.data
  } catch (error) {
    console.error('Error updating payment status:', error)
    throw new Error('Failed to update payment status')
  }
}

// Process Mock Payment (No real Stripe integration)
const processMockPayment = async () => {
  processingPayment.value = true
  
  // Simulate payment processing delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  try {
    const amount = getCoursePrice(selectedEnrollment.value) * 
      (selectedEnrollment.value.number_of_participants || 1)
    
    // Generate a mock transaction ID
    const transactionId = `mock_txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Step 1: Create training enrollment record
    await createTrainingEnrollment(transactionId)
    
    // Step 2: Update training request payment status
    await updateTrainingRequestPayment(transactionId)
    
    // Show success message
    Swal.fire({
      icon: 'success',
      title: 'Payment Successful! (Demo)',
      html: `
        <div class="text-left">
          <p class="mb-2">Your payment of <strong>$${formatPrice(amount)}</strong> for <strong>${selectedEnrollment.value?.training_course?.name}</strong> has been completed successfully.</p>
          <p class="text-sm text-gray-600 mt-2">Transaction ID: <span class="font-mono text-xs">${transactionId}</span></p>
          <div class="mt-3 p-2 bg-blue-50 rounded text-xs text-blue-700">
            <i class="ri-information-line"></i> This is a demo transaction. No actual payment was processed.
          </div>
        </div>
      `,
      confirmButtonText: 'Great!',
      confirmButtonColor: '#3b82f6'
    })
    
    // Close modal and refresh enrollments
    closePaymentModal()
    await fetchEnrollment()
    
  } catch (error) {
    console.error('Payment error:', error)
    Swal.fire({
      icon: 'error',
      title: 'Payment Failed',
      text: error.message || 'Something went wrong. Please try again.',
      confirmButtonColor: '#d33'
    })
  } finally {
    processingPayment.value = false
  }
}

const openPaymentModal = (enrollment) => {
  selectedEnrollment.value = enrollment
  mockCard.value.name = enrollment.user?.name || ''
  isModalOpen.value = true
}

const closePaymentModal = () => {
  isModalOpen.value = false
  selectedEnrollment.value = null
  mockCard.value = {
    number: '4242 4242 4242 4242',
    expiry: '12/28',
    cvc: '123',
    name: ''
  }
}

// Watch for status param changes
watch(() => route.params.status, (newStatus, oldStatus) => {
  if (newStatus !== oldStatus) {
    fetchEnrollment()
  }
})

// Initial fetch
onMounted(() => {
  fetchEnrollment()
})
</script>

<style scoped>
/* No Stripe-specific styles needed */
</style>