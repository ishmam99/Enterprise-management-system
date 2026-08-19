<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Enrollment by Our Users</h1>
            <p class="text-gray-600 mt-2">Manage all training enrollments for your users</p>
          </div>

          <div class="mt-4 sm:mt-0 flex items-center space-x-4">
            <!-- Search Bar -->
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input v-model="searchQuery" type="text" placeholder="Search enrollments..."
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-lg">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-2xl font-bold text-gray-900">{{ enrollments.length }}</h3>
              <p class="text-sm text-gray-600">Total Enrollments</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-lg">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-2xl font-bold text-gray-900">{{ activeEnrollmentsCount }}</h3>
              <p class="text-sm text-gray-600">Active Enrollments</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Enrollments Table -->
      <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">User</th>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Email</th>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Username</th>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Training Course</th>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Dates</th>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Location</th>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="enrollment in paginatedEnrollments" :key="enrollment.id"
                class="hover:bg-indigo-50 transition-colors">
                <!-- User Name + Avatar -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span class="text-white font-semibold text-sm">
                        {{ getInitials(enrollment.endUser.user.name) }}
                      </span>
                    </div>
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-900">{{ enrollment.endUser.user.name }}</div>
                    </div>
                  </div>
                </td>

                <!-- Email -->
                <td class="px-6 py-4 text-sm text-gray-600">{{ enrollment.endUser.user.email }}</td>

                <!-- Username -->
                <td class="px-6 py-4 text-sm text-gray-600">{{ enrollment.endUser.username }}</td>

                <!-- Training Course Title -->
                <td class="px-6 py-4 text-sm text-gray-900 font-medium">
                  {{ enrollment.trainingOffer.event.training_course.title }}
                </td>

                <!-- Dates -->
                <td class="px-6 py-4 text-sm text-gray-600">
                  {{ formatDate(enrollment.trainingOffer.start_date) }} – {{ formatDate(enrollment.trainingOffer.end_date) }}
                </td>

                <!-- Location -->
                <td class="px-6 py-4 text-sm text-gray-600">
                  <span class="capitalize">{{ enrollment.trainingOffer.location }}</span>
                </td>

                <!-- Status -->
                <td class="px-6 py-4">
                  <span :class="[
                    'inline-flex px-3 py-1 rounded-full text-xs font-semibold',
                    enrollment.status === '1' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  ]">
                    {{ enrollment.status === '1' ? 'Active' : 'Inactive' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="filteredEnrollments.length === 0" class="text-center py-16">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-900">No enrollments found</h3>
          <p class="mt-2 text-gray-500">Try adjusting your search query</p>
        </div>

        <!-- Pagination -->
        <div v-if="filteredEnrollments.length > 0"
          class="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredEnrollments.length }} results
          </div>
          <div class="flex space-x-2">
            <button @click="previousPage" :disabled="currentPage === 1"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50">
              Previous
            </button>
            <button v-for="page in visiblePages" :key="page" @click="goToPage(page)"
              :class="[currentPage === page ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100', 'px-3 py-2 rounded-md text-sm font-medium border border-gray-300']">
              {{ page }}
            </button>
            <button @click="nextPage" :disabled="currentPage === totalPages"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '@/config/api'
import { useAuthStore } from '@/stores/AuthStore'
import { ref, computed, onMounted } from 'vue'

const authStore = useAuthStore()

// Reactive state
const enrollments = ref([])
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = 10

// Fetch data
const fetchEnrollments = async () => {
  try {
    const { data } = await api().get(`/training-enrollment?customer_id=${authStore.user.customer.id}`)
    enrollments.value = data.data // API returns { data: [...] }
  } catch (error) {
    console.error('Error fetching enrollments:', error)
  }
}

// Computed
const filteredEnrollments = computed(() => {
  if (!searchQuery.value) return enrollments.value

  const query = searchQuery.value.toLowerCase()
  return enrollments.value.filter(e => {
    const user = e.endUser.user
    const course = e.trainingOffer.event.training_course
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      e.endUser.username.toLowerCase().includes(query) ||
      course.title.toLowerCase().includes(query)
    )
  })
})

const paginatedEnrollments = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredEnrollments.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(filteredEnrollments.value.length / pageSize))
const startIndex = computed(() => (currentPage.value - 1) * pageSize)
const endIndex = computed(() => Math.min(startIndex.value + pageSize, filteredEnrollments.value.length))
const activeEnrollmentsCount = computed(() => enrollments.value.filter(e => e.status === '1').length)

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    if (currentPage.value <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    } else if (currentPage.value >= total - 3) {
      pages.push(1); pages.push('...')
      for (let i = total - 4; i <= total; i++) pages.push(i)
    } else {
      pages.push(1); pages.push('...')
      for (let i = currentPage.value - 1; i <= currentPage.value + 1; i++) pages.push(i)
      pages.push('...'); pages.push(total)
    }
  }
  return pages
})

// Helpers
const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A'
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// Pagination actions
const previousPage = () => currentPage.value > 1 && currentPage.value--
const nextPage = () => currentPage.value < totalPages.value && currentPage.value++
const goToPage = (page) => { if (page !== '...') currentPage.value = page }

// Lifecycle
onMounted(() => {
  fetchEnrollments()
})
</script>
