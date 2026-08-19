<script setup>
import api from '@/config/api'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()

const loading = ref(true)
const error = ref(null)
const enrollments = ref([])
const pagination = ref({
  current_page: 1,
  last_page: 1,
  per_page: 10,
  total: 0
})

const fetchEnrollments = async (page = 1) => {
  try {
    loading.value = true
    const params = {
      page,
      per_page: pagination.value.per_page,
      with: 'trainingOffer.event.trainingCourse,end_user'
    }

    const response = await api().get('end-user-trainings', { params })
    enrollments.value = response.data.data
    pagination.value = response.data.meta
    
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load enrollments.'
    console.error(err)
    
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.value,
      confirmButtonColor: '#4f46e5'
    })
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

const viewDetails = (enrollment) => {
  // Navigate to enrollment details page
  console.log('View details:', enrollment)
  // router.push(`/enrollments/${enrollment.id}`)
}

const cancelEnrollment = async (enrollment) => {
  const result = await Swal.fire({
    title: 'Cancel Enrollment?',
    html: `Are you sure you want to cancel your enrollment in <strong>${enrollment.training_offer?.event?.training_course?.title || 'this course'}</strong>?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Yes, Cancel',
    cancelButtonText: 'Keep Enrollment'
  })

  if (result.isConfirmed) {
    try {
      await api().delete(`end-user-trainings/${enrollment.id}`)
      
      Swal.fire({
        icon: 'success',
        title: 'Enrollment Cancelled',
        text: 'Your enrollment has been cancelled successfully.',
        confirmButtonColor: '#4f46e5'
      })
      
      fetchEnrollments(pagination.value.current_page)
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Cancellation Failed',
        text: err.response?.data?.message || 'Failed to cancel enrollment.',
        confirmButtonColor: '#4f46e5'
      })
    }
  }
}

const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.last_page) {
    fetchEnrollments(page)
  }
}

onMounted(() => {
  fetchEnrollments()
})
</script>

<template>
  <div class="px-10 bg-white py-5 w-11/12 mx-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
          <div class="text-center md:text-left">
            <h1 class="text-4xl font-bold text-gray-900 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              My Enrolled Courses
            </h1>
            <p class="mt-3 text-lg text-gray-600 max-w-2xl">
              Manage your training courses, track progress, and access learning materials
            </p>
          </div>
          <button 
            @click="router.push('/user/Enrollment/list')"
            class="mt-6 md:mt-0 inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Browse More Courses
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div v-if="enrollments.length > 0" class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-xl">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Enrollments</p>
              <p class="text-2xl font-bold text-gray-900">{{ pagination.total }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-xl">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Upcoming</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ enrollments.filter(e => new Date(e.training_offer?.start_date) > new Date()).length }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
          <div class="flex items-center">
            <div class="p-3 bg-purple-100 rounded-xl">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Completed</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ enrollments.filter(e => new Date(e.training_offer?.end_date) < new Date()).length }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500">
          <div class="flex items-center">
            <div class="p-3 bg-orange-100 rounded-xl">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">In Progress</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ enrollments.filter(e => new Date(e.training_offer?.start_date) <= new Date() && new Date(e.training_offer?.end_date) >= new Date()).length }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <div class="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-600"></div>
        <p class="mt-6 text-lg text-gray-600 font-medium">Loading your enrollments...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-white rounded-2xl shadow-lg p-8 text-center max-w-2xl mx-auto">
        <div class="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-red-800 mb-2">Failed to load enrollments</h3>
        <p class="text-red-700 mb-6">{{ error }}</p>
        <button @click="fetchEnrollments()" class="px-8 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition shadow-lg">
          Try Again
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="enrollments.length === 0" class="bg-white rounded-2xl shadow-lg p-12 text-center max-w-2xl mx-auto">
        <div class="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg class="w-16 h-16 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        <h3 class="text-3xl font-bold text-gray-900 mb-3">No enrollments yet</h3>
        <p class="text-gray-600 text-lg mb-8">Start your learning journey by enrolling in our training courses.</p>
        <button 
          @click="router.push('/trainings')"
          class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Explore Available Courses
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </div>

      <!-- Enrollments Grid -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div 
          v-for="enrollment in enrollments" 
          :key="enrollment.id"
          class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group"
        >
          <!-- Course Header -->
          <div class="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-bold truncate max-w-[200px]">
                    {{ enrollment.training_offer.trainingCourse || 'Training Course' }}
                  </h3>
                  <p class="text-indigo-100 text-sm mt-1">Enrollment #{{ enrollment.id }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Course Details -->
          <div class="p-6">
            <!-- User Info -->
            <div class="flex items-center mb-6 p-4 bg-gray-50 rounded-xl">
              <div class="w-10 h-10 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center">
                <span class="text-white font-bold text-sm">
                  {{ enrollment.end_user?.username?.charAt(0)?.toUpperCase() || 'U' }}
                </span>
              </div>
              <div class="ml-3">
                <p class="text-sm font-semibold text-gray-900">{{ enrollment.end_user?.username || 'User' }}</p>
                <p class="text-xs text-gray-500">Enrolled User</p>
              </div>
            </div>

            <!-- Course Info -->
            <div class="space-y-4">
              <div class="flex items-center justify-between py-2 border-b border-gray-100">
                <span class="text-sm text-gray-600 flex items-center">
                  <svg class="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  </svg>
                  Location
                </span>
                <span class="text-sm font-semibold text-gray-900">{{ enrollment.training_offer?.location || 'Online' }}</span>
              </div>

              <div class="flex items-center justify-between py-2 border-b border-gray-100">
                <span class="text-sm text-gray-600 flex items-center">
                  <svg class="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Start Date
                </span>
                <span class="text-sm font-semibold text-gray-900">{{ formatDate(enrollment.training_offer?.start_date) }}</span>
              </div>

              <div class="flex items-center justify-between py-2 border-b border-gray-100">
                <span class="text-sm text-gray-600 flex items-center">
                  <svg class="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  End Date
                </span>
                <span class="text-sm font-semibold text-gray-900">{{ formatDate(enrollment.training_offer?.end_date) }}</span>
              </div>

              <div class="flex items-center justify-between py-2">
                <span class="text-sm text-gray-600 flex items-center">
                  <svg class="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                  Price
                </span>
                <span class="text-lg font-bold text-indigo-600">{{ formatCurrency(enrollment.training_offer?.price) }}</span>
              </div>
            </div>

            <!-- Actions -->
            <!-- <div class="flex space-x-3 mt-6 pt-6 border-t border-gray-200">
              <button 
                @click="viewDetails(enrollment)"
                class="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-indigo-700 transition-colors duration-200 text-center"
              >
                View Details
              </button>
              <button 
                @click="cancelEnrollment(enrollment)"
                class="flex-1 bg-red-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-red-700 transition-colors duration-200 text-center"
              >
                Cancel
              </button>
            </div> -->
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="pagination.last_page > 1 && enrollments.length > 0" class="flex justify-center items-center space-x-4 mt-8">
        <button
          @click="changePage(pagination.current_page - 1)"
          :disabled="pagination.current_page === 1"
          class="px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          ← Previous
        </button>
        
        <span class="text-sm text-gray-700 font-medium">
          Page {{ pagination.current_page }} of {{ pagination.last_page }}
        </span>
        
        <button
          @click="changePage(pagination.current_page + 1)"
          :disabled="pagination.current_page === pagination.last_page"
          class="px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Next →
        </button>
      </div>
    </div>
  </div>
</template>