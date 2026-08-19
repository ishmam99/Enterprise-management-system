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
    <!-- Header -->
    <div class="bg-teal-700 rounded-t-2xl text-white px-6 py-4">
      <h1 class="text-2xl font-semibold">Enrolled Training List</h1>
      <p class="text-gray-300">Review your enrolled training courses</p>
    </div>

    <div class="bg-white rounded-xl p-5 w-full shadow-md mt-5">
      <!-- Stats Cards -->
      <div v-if="enrollments.length > 0" class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-600">Total Enrollments</p>
              <p class="text-xl font-bold text-gray-900">{{ pagination.total }}</p>
            </div>
          </div>
        </div>

        <div class="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-600">Upcoming</p>
              <p class="text-xl font-bold text-gray-900">
                {{ enrollments.filter(e => new Date(e.training_offer?.start_date) > new Date()).length }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
          <div class="flex items-center">
            <div class="p-2 bg-purple-100 rounded-lg">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-600">Completed</p>
              <p class="text-xl font-bold text-gray-900">
                {{ enrollments.filter(e => new Date(e.training_offer?.end_date) < new Date()).length }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
          <div class="flex items-center">
            <div class="p-2 bg-orange-100 rounded-lg">
              <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-600">In Progress</p>
              <p class="text-xl font-bold text-gray-900">
                {{ enrollments.filter(e => new Date(e.training_offer?.start_date) <= new Date() && new Date(e.training_offer?.end_date) >= new Date()).length }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-8">
        <span class="loading loading-spinner loading-lg text-teal-600"></span>
        <span class="ml-2 text-gray-600">Loading enrollments...</span>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-8 text-red-600">
        <svg class="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
        </svg>
        <p class="text-lg font-semibold mb-2">Failed to load enrollments</p>
        <p class="text-gray-600 mb-4">{{ error }}</p>
        <button @click="fetchEnrollments()" class="btn btn-error btn-sm text-white">
          Try Again
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="enrollments.length === 0" class="text-center py-12 text-gray-500">
        <svg class="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
        <p class="text-xl font-semibold mb-2">No enrollments found</p>
        <p class="text-gray-600 mb-6">You haven't enrolled in any training courses yet.</p>
        <button
          @click="router.push('/trainings')"
          class="btn bg-teal-600 text-white hover:bg-teal-700"
        >
          Browse Available Courses
        </button>
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
                User
              </th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                Course Name
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
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                Price
              </th>
              <!-- <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                Status
              </th> -->
              <!-- <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                Actions
              </th> -->
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="enrollment in enrollments"
              :key="enrollment.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <!-- ID -->
              <td class="border border-gray-300 px-4 py-3 text-gray-600 font-mono text-sm">
                #{{ enrollment.id }}
              </td>

              <!-- User -->
              <td class="border border-gray-300 px-4 py-3">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                    <span class="text-teal-600 font-bold text-xs">
                      {{ enrollment.end_user?.username?.charAt(0)?.toUpperCase() || 'U' }}
                    </span>
                  </div>
                  <div>
                    <div class="font-medium text-gray-900 text-sm">
                      {{ enrollment.end_user?.username || 'User' }}
                    </div>
                    <!-- <div class="text-xs text-gray-500">ID: {{ enrollment.end_user?.id }}</div> -->
                  </div>
                </div>
              </td>

              <!-- Course Name -->
              <td class="border border-gray-300 px-4 py-3">
                <div class="font-medium text-gray-900 text-sm">
                  {{ enrollment.training_offer.trainingCourse || 'Training Course' }}
                </div>
                <!-- <div class="text-xs text-gray-500 truncate max-w-[200px]">
                  {{ enrollment.training_offer?.event?.training_course?.description || 'No description available' }}
                </div> -->
              </td>

              <!-- Industry -->
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  {{ enrollment.training_offer.industry_name || 'N/A' }}
                </span>
              </td>

              <!-- Solution -->
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  {{ enrollment.training_offer.solution_name || 'N/A' }}
                </span>
              </td>

              <!-- Software -->
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                  {{ enrollment.training_offer.software_name || 'N/A' }}
                </span>
              </td>

              <!-- Start Date -->
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ formatDate(enrollment.training_offer?.start_date) }}
              </td>

              <!-- End Date -->
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ formatDate(enrollment.training_offer?.end_date) }}
              </td>

              <!-- Location -->
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                <span class="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                  {{ enrollment.training_offer?.location || 'Online' }}
                </span>
              </td>

              <!-- Price -->
              <td class="border border-gray-300 px-4 py-3 text-gray-600 font-semibold">
                {{ formatCurrency(enrollment.training_offer?.price) }}
              </td>

              <!-- Status -->
              <!-- <td class="border border-gray-300 px-4 py-3">
                <span
                  class="px-2 py-1 rounded-full text-xs font-medium capitalize"
                  :class="{
                    'bg-yellow-100 text-yellow-800': new Date(enrollment.training_offer?.start_date) > new Date(),
                    'bg-green-100 text-green-800': new Date(enrollment.training_offer?.end_date) < new Date(),
                    'bg-blue-100 text-blue-800': new Date(enrollment.training_offer?.start_date) <= new Date() && new Date(enrollment.training_offer?.end_date) >= new Date()
                  }"
                >
                  {{
                    new Date(enrollment.training_offer?.end_date) < new Date()
                      ? 'completed'
                      : new Date(enrollment.training_offer?.start_date) > new Date()
                      ? 'upcoming'
                      : 'in progress'
                  }}
                </span>
              </td> -->

              <!-- Actions -->
              <!-- <td class="border border-gray-300 px-4 py-3">
                <div class="flex gap-2"> -->
                  <!-- View Details -->
                  <!-- <button
                    @click="viewDetails(enrollment)"
                    class="btn btn-info btn-sm rounded-lg text-white"
                  >
                    View
                  </button> -->
                  <!-- Cancel Enrollment -->
                  <!-- <button
                    v-if="new Date(enrollment.training_offer?.start_date) > new Date()"
                    @click="cancelEnrollment(enrollment)"
                    class="btn btn-error btn-sm rounded-lg text-white"
                  >
                    Cancel
                  </button> -->
                <!-- </div>
              </td> -->
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="enrollments.length > 0" class="flex justify-between items-center mt-6">
        <div class="text-sm text-gray-600">
          Showing {{ enrollments.length }} of {{ pagination.total }} records
        </div>
        <div class="join">
          <button
            class="join-item btn btn-sm"
            :disabled="pagination.current_page === 1"
            @click="changePage(pagination.current_page - 1)"
          >
            Previous
          </button>
          <button class="join-item btn btn-sm btn-active">{{ pagination.current_page }}</button>
          <button
            class="join-item btn btn-sm"
            :disabled="pagination.current_page === pagination.last_page"
            @click="changePage(pagination.current_page + 1)"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
