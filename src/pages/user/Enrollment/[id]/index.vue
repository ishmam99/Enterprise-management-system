<script setup>
import api from '@/config/api'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const error = ref(null)
const offer = ref(null)
const submitting = ref(false)

const fetchOffer = async () => {
  try {
    loading.value = true
    const id = route.params.id
    const response = await api().get(`training-offer/${id}?with=event.trainingCourse.software,event.trainingCourse.industry,event.trainingCourse.solution`)

    const apiData = response.data?.data
    if (!apiData) {
      error.value = 'Training offer not found.'
      return
    }

    offer.value = apiData
    console.log('Offer data:', offer.value)
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load training details.'
    console.error(err)
    
    // Show error using Swal
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.value,
      confirmButtonColor: '#4f46e5',
      confirmButtonText: 'Try Again'
    }).then(() => {
      router.go(-1)
    })
  } finally {
    loading.value = false
  }
}

const submitEnrollment = async () => {
  try {
    submitting.value = true
    
    const enrollmentData = {
      training_offer_id: offer.value.id,
      amount: offer.value.price
    }

    console.log('Submitting enrollment:', enrollmentData)

    const response = await api().post('end-user-trainings', enrollmentData)
    
    console.log('Enrollment response:', response.data)
    
    // Update available seats locally by reducing 1
    if (offer.value.available_seats > 0) {
      offer.value.available_seats -= 1
    }
    
    // Show success message with updated seat count
    await Swal.fire({
      icon: 'success',
      title: 'Enrollment Submitted!',
      html: `
        <div class="text-left">
          <p>Your enrollment has been successfully submitted.</p>
          <p class="mt-2 text-sm text-gray-600">Remaining seats: <strong>${offer.value.available_seats}</strong></p>
        </div>
      `,
      confirmButtonColor: '#10b981',
      confirmButtonText: 'Continue'
    })
    
    // If payment is required, redirect to payment gateway
    if (response.data.payment_url) {
      await Swal.fire({
        title: 'Redirecting to Payment',
        html: `
          <div class="text-left">
            <p>You will be redirected to complete your payment.</p>
            <p class="mt-2 text-sm text-gray-600">Remaining seats reserved: <strong>${offer.value.available_seats}</strong></p>
          </div>
        `,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#4f46e5',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Proceed to Payment',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = response.data.payment_url
        }
      })
    } else {
      // Refresh the page to get latest data from server
      fetchOffer()
    }
    
  } catch (err) {
    console.error('Enrollment error:', err)
    
    // Show error using Swal
    await Swal.fire({
      icon: 'error',
      title: 'Enrollment Failed',
      text: err.response?.data?.message || 'Failed to submit enrollment. Please try again.',
      confirmButtonColor: '#4f46e5',
      confirmButtonText: 'OK'
    })
  } finally {
    submitting.value = false
  }
}

const handleEnrollment = async () => {
  // Check if seats are available
  if (offer.value.available_seats <= 0) {
    await Swal.fire({
      icon: 'error',
      title: 'No Seats Available',
      text: 'Sorry, all seats for this training have been taken.',
      confirmButtonColor: '#4f46e5',
      confirmButtonText: 'OK'
    })
    return
  }

  // Check if terms are agreed
  const termsCheckbox = document.getElementById('terms')
  if (!termsCheckbox.checked) {
    await Swal.fire({
      icon: 'warning',
      title: 'Terms Required',
      text: 'Please agree to the Terms & Conditions and Privacy Policy to continue.',
      confirmButtonColor: '#4f46e5',
      confirmButtonText: 'OK'
    })
    return
  }

  // Show confirmation dialog before submitting
  const result = await Swal.fire({
    title: 'Confirm Enrollment',
    html: `
      <div class="text-left">
        <p class="mb-2">You are about to enroll in:</p>
        <p class="font-bold text-indigo-600">${offer.value.event?.trainingCourse?.title || 'Training Course'}</p>
        <p class="mt-2 text-sm text-gray-600">Fee: <span class="font-bold">$${offer.value.price}</span></p>
        <p class="text-sm text-gray-600">Location: ${offer.value.location}</p>
        <p class="text-sm text-gray-600">Duration: ${new Date(offer.value.start_date).toLocaleDateString('en-GB')} → ${new Date(offer.value.end_date).toLocaleDateString('en-GB')}</p>
        <p class="mt-3 text-sm text-orange-600 font-semibold">After enrollment, only <strong>${offer.value.available_seats - 1}</strong> seats will remain!</p>
      </div>
    `,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#4f46e5',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Yes, Enroll Now!',
    cancelButtonText: 'Cancel',
    reverseButtons: true
  })

  if (result.isConfirmed) {
    await submitEnrollment()
  }
}

onMounted(fetchOffer)
</script>

<template>
  <div class="px-10 bg-white py-5 w-11/12 mx-auto">
    <div class="max-w-6xl mx-auto">
      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-32">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
        <p class="mt-6 text-lg text-gray-600 font-medium">Loading training details...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="max-w-md mx-auto mt-20">
        <div class="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
          <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <p class="text-xl font-bold text-red-800">Oops! Something went wrong</p>
          <p class="mt-2 text-red-700">{{ error }}</p>
          <button @click="router.go(-1)" class="mt-6 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition shadow-lg">
            ← Go Back
          </button>
        </div>
      </div>

      <!-- Main Content -->
      <div v-else-if="offer" class="grid lg:grid-cols-3 gap-10">
        <!-- Left Sidebar: Course Card -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <!-- Header Gradient -->
            <div class="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 text-white">
              <div class="flex items-center gap-3 mb-4">
                <div class="p-3 bg-white/20 rounded-xl">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                  </svg>
                </div>
                <span class="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">Limited Seats</span>
              </div>
              <h1 class="text-3xl font-bold">Enroll Now</h1>
              <p class="mt-3 text-white/90 text-lg">Only {{ offer.available_seats }} seats remaining!</p>
            </div>

            <!-- Course Details -->
            <div class="p-8 space-y-6">
              <div>
                <h2 class="text-2xl font-bold text-gray-800 leading-tight">
                  {{ offer.event?.trainingCourse?.title || 'Training Course' }}
                </h2>
                <div class="flex items-center gap-2 mt-3">
                  <span v-if="offer.event?.trainingCourse?.solution" class="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                    {{ offer.event.trainingCourse.solution.name }}
                  </span>
                  <span v-if="offer.event?.trainingCourse?.software" class="px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                    {{ offer.event.trainingCourse.software.name }}
                  </span>
                </div>
                <p v-if="offer.event?.trainingCourse?.industry" class="text-sm text-gray-500 mt-2">
                  Industry: {{ offer.event.trainingCourse.industry.name }}
                </p>
              </div>

              <div class="space-y-4 text-base">
                <div class="flex justify-between items-center py-3 border-b border-gray-100">
                  <span class="text-gray-600 flex items-center gap-2">
                    📍 Location
                  </span>
                  <span class="font-semibold text-gray-800">{{ offer.location }}</span>
                </div>

                <div class="flex justify-between items-center py-3 border-b border-gray-100">
                  <span class="text-gray-600 flex items-center gap-2">
                    <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    Duration
                  </span>
                  <span class="font-semibold">
                    {{ new Date(offer.start_date).toLocaleDateString('en-GB') }} → {{ new Date(offer.end_date).toLocaleDateString('en-GB') }}
                  </span>
                </div>

                <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 text-center">
                  <p class="text-gray-600 text-sm">Course Fee</p>
                  <p class="text-5xl font-bold text-indigo-600 mt-2">${{ offer.price }}</p>
                  <p class="text-sm text-gray-500 mt-2">per participant</p>
                </div>

                <div 
                  :class="[
                    'border-2 rounded-xl p-4 text-center transition-all duration-300',
                    offer.available_seats <= 5 
                      ? 'bg-red-50 border-red-200' 
                      : offer.available_seats <= 10 
                      ? 'bg-orange-50 border-orange-200'
                      : 'bg-green-50 border-green-200'
                  ]"
                >
                  <p class="text-3xl font-black" :class="[
                    offer.available_seats <= 5 ? 'text-red-600' : 
                    offer.available_seats <= 10 ? 'text-orange-600' : 'text-green-600'
                  ]">
                    {{ offer.available_seats }}
                  </p>
                  <p class="text-sm font-medium" :class="[
                    offer.available_seats <= 5 ? 'text-red-700' : 
                    offer.available_seats <= 10 ? 'text-orange-700' : 'text-green-700'
                  ]">
                    <span v-if="offer.available_seats <= 3">Almost Full! – </span>
                    <span v-else-if="offer.available_seats <= 10">Limited Seats – </span>
                    Seats Left
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side: Enrollment Action -->
        <div class="lg:col-span-2">
          <div class="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-10">
            <h2 class="text-4xl font-bold text-gray-800 mb-2">Secure Your Seat Today</h2>
            <p class="text-lg text-gray-600 mb-6">One-click enrollment with your account details</p>

            <!-- Enrollment Summary -->
            <div class="bg-gray-50 rounded-2xl p-6 mb-8">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Enrollment Summary</h3>
              <div class="space-y-3 text-sm">
                <p><span class="font-medium text-gray-600">Course:</span> {{ offer.event?.trainingCourse?.title || 'Training Course' }}</p>
                <p><span class="font-medium text-gray-600">Price:</span> ${{ offer.price }}</p>
                <p><span class="font-medium text-gray-600">Location:</span> {{ offer.location }}</p>
                <p><span class="font-medium text-gray-600">Duration:</span> {{ new Date(offer.start_date).toLocaleDateString('en-GB') }} → {{ new Date(offer.end_date).toLocaleDateString('en-GB') }}</p>
                <p><span class="font-medium text-gray-600">Available Seats:</span> {{ offer.available_seats }}</p>
              </div>
            </div>

            <!-- Terms Agreement -->
            <div class="mb-8 p-6 bg-blue-50 rounded-2xl border border-blue-200">
              <div class="flex items-start">
                <input type="checkbox" id="terms" required class="w-5 h-5 text-indigo-600 rounded-lg focus:ring-indigo-500 mt-1" />
                <label for="terms" class="ml-3 text-gray-700">
                  I agree to the <a href="#" class="text-indigo-600 font-bold hover:underline">Terms & Conditions</a> and
                  <a href="#" class="text-indigo-600 font-bold hover:underline">Privacy Policy</a> *
                </label>
              </div>
            </div>

            <!-- Enrollment Button -->
            <div class="mt-10">
              <button 
                @click="handleEnrollment"
                :disabled="submitting || offer.available_seats <= 0"
                class="w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-bold text-xl py-6 rounded-2xl shadow-xl transform hover:scale-105 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span v-if="submitting">Processing...</span>
                <span v-else-if="offer.available_seats <= 0">Fully Booked</span>
                <span v-else>
                  Complete Enrollment
                  <span class="ml-3">→</span>
                </span>
              </button>
            </div>

            <p class="text-center text-sm text-gray-500 mt-6">
              <svg class="w-5 h-5 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
              </svg>
              Secure payment • Instant confirmation • Money-back guarantee
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>