<script setup>
import api from '@/config/api'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const error = ref(null)
const offer = ref(null)

const fetchOffer = async () => {
  try {
    loading.value = true
    const id = route.params.id
    const response = await api().get(`training-offer/${id}`)

    const apiData = response.data?.data
    if (!apiData) {
      error.value = 'Training offer not found.'
      return
    }

    offer.value = apiData
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load training details.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const submitEnrollment = () => {
  alert('Enrollment successful! Redirecting to payment gateway...')
}

onMounted(fetchOffer)
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
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
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 0 009 10.172V5L8 4z"></path>
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
                <h2 class="text-2xl font-bold text-gray-800 leading-tight">{{ offer.trainingCourse }}</h2>
                <div class="flex items-center gap-2 mt-3">
                  <span class="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">{{ offer.solution_name }}</span>
                  <span class="px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">{{ offer.software_name }}</span>
                </div>
                <p class="text-sm text-gray-500 mt-2">Industry: {{ offer.industry_name }}</p>
              </div>

              <div class="space-y-4 text-base">
                <div class="flex justify-between items-center py-3 border-b border-gray-100">
                  <span class="text-gray-600 flex items-center gap-2">
                    <svg class="w-5 h-5 text-indigo-600">Location</svg>
                    Location
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

                <div class="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 text-center">
                  <p class="text-3xl font-black text-orange-600">{{ offer.available_seats }}</p>
                  <p class="text-sm font-medium text-orange-700">Seats Left – Act Fast!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side: Enrollment Form -->
        <div class="lg:col-span-2">
          <div class="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-10">
            <h2 class="text-4xl font-bold text-gray-800 mb-2">Secure Your Seat Today</h2>
            <p class="text-lg text-gray-600 mb-10">Fill in your details to complete enrollment</p>

            <form @submit.prevent="submitEnrollment" class="space-y-8">
              <div class="grid md:grid-cols-2 gap-8">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input type="text" required placeholder="John Doe"
                    class="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition" />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <input type="email" required placeholder="john@example.com"
                    class="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition" />
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-8 mt-8">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                  <input type="tel" required placeholder="+880 1xxx xxxxxx"
                    class="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition" />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Company / Organization</label>
                  <input type="text" placeholder="Acme Engineering Ltd (optional)"
                    class="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition" />
                </div>
              </div>

              <div class="mt-8">
                <label class="block text-sm font-semibold text-gray-700 mb-2">Special Requirements (Optional)</label>
                <textarea rows="4" placeholder="Any dietary needs, accessibility requirements, or special requests..."
                  class="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition resize-none"></textarea>
              </div>

              <div class="mt-8 flex items-center">
                <input type="checkbox" id="terms" required class="w-5 h-5 text-indigo-600 rounded-lg focus:ring-indigo-500" />
                <label for="terms" class="ml-3 text-gray-700">
                  I agree to the <a href="#" class="text-indigo-600 font-bold hover:underline">Terms & Conditions</a> and
                  <a href="#" class="text-indigo-600 font-bold hover:underline">Privacy Policy</a> *
                </label>
              </div>

              <div class="mt-10">
                <button type="submit"
                  class="w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-bold text-xl py-6 rounded-2xl shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
                  Complete Enrollment – Pay ${{ offer.price }} Now
                  <span class="ml-3">→</span>
                </button>
              </div>

              <p class="text-center text-sm text-gray-500 mt-6">
                <svg class="w-5 h-5 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
                </svg>
                Secure payment • Instant confirmation • Money-back guarantee
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional: Add subtle animation on load */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
