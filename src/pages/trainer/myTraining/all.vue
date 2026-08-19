<template>
  <div class="w-full min-h-screen mx-auto px-10 py-4">
    <!-- Header with Search in same row -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
      <!-- Left: Title and Description -->
      <div class="lg:flex-1">
        <h1 class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          All Training Offers List
        </h1>
        <p class="text-gray-600 text-sm mt-1">Review Training Offers</p>
      </div>

      <!-- Right: Search -->
      <div class="flex-1 lg:flex lg:items-center lg:justify-end">
        <div class="relative flex-1 lg:max-w-xs">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-4 w-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name or email..."
            class="w-full pl-10 pr-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm bg-white shadow-sm outline-none transition"
          />
        </div>
      </div>
    </div>

    <!-- Table Card -->
    <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-purple-100">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <tr>
              <th class="py-3 px-4 border-e text-left text-xs font-semibold uppercase">#</th>
              <th class="py-3 px-4 border-e text-left text-xs font-semibold uppercase">Training Course Name</th>
              <th class="py-3 px-4 border-e text-left text-xs font-semibold uppercase">Trainer Name</th>
              <th class="py-3 px-4 border-e text-left text-xs font-semibold uppercase">Industry</th>
              <th class="py-3 px-4 border-e text-left text-xs font-semibold uppercase">Solution</th>
              <th class="py-3 px-4 border-e text-left text-xs font-semibold uppercase">Software</th>
              <th class="py-3 px-4 border-e text-center text-xs font-semibold uppercase">Duration</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="(training, index) in customers"
              :key="training.id"
              class="hover:bg-purple-50 transition-colors"
            >
              <td class="py-3 px-4 border-e font-medium text-sm">{{ index + 1 }}</td>
              <td class="py-3 px-4 border-e">
                <div class="font-semibold text-gray-800 text-sm">{{ training.event?.training_course.title }}</div>
              </td>
              <td class="py-3 px-4 border-e text-gray-600 text-sm truncate max-w-[150px]" :title="training.event?.trainer?.user?.name">
                {{ training.event?.trainer?.user?.name }}
              </td>
              <td class="py-3 px-4 border-e text-gray-600 text-sm truncate max-w-[120px]" :title="training.event?.training_course?.industry?.name">
                {{ training.event?.training_course?.industry?.name }}
              </td>
              <td class="py-3 px-4 border-e text-sm truncate max-w-[120px]" :title="training.event?.training_course?.solution?.name">
                {{ training.event?.training_course?.solution?.name }}
              </td>
              <td class="py-3 px-4 border-e text-sm truncate max-w-[120px]" :title="training.event?.training_course?.software?.name">
                {{ training.event?.training_course?.software?.name }}
              </td>
              <td class="py-3 px-4 border-e text-center">
                <div class="flex flex-col gap-1 items-center">
                  <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded whitespace-nowrap">
                    Start: {{ formatDate(training.start_date) }}
                  </span>
                  <span class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded whitespace-nowrap">
                    End: {{ formatDate(training.end_date) }}
                  </span>
                </div>
              </td>
            </tr>

            <!-- Empty State -->
            <tr v-if="customers.length === 0">
              <td colspan="7" class="text-center py-8 text-gray-400">
                <svg class="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                </svg>
                <p class="text-sm">No training offers found</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="meta && customers.length > 0" class="bg-gray-50 px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200">
        <div class="text-xs text-gray-600">
          Showing {{ meta.from }} - {{ meta.to }} of {{ meta.total }} records
        </div>
        <div class="flex gap-1">
          <button
            v-for="link in meta.links"
            :key="link.label"
            @click="currentPage = link.page || currentPage; getTraining()"
            :class="[
              'px-3 py-1.5 rounded text-sm font-medium transition',
              link.active
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow'
                : 'bg-white text-purple-700 border border-purple-300 hover:bg-purple-50',
            ]"
            v-html="link.label"
          />
        </div>
      </div>
    </div>

    <!-- Success Toast -->
    <div
      v-if="toastMessage"
      class="fixed bottom-4 right-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50"
    >
      <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
      </svg>
      <span class="text-sm font-medium">{{ toastMessage }}</span>
    </div>
  </div>
</template>

<script setup>
import api from '@/config/api'
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const searchQuery = ref('')
const currentPage = ref(1)
const customers = ref([])
const meta = ref(null)
const toastMessage = ref('')
const route = useRoute()

// Helper function to format dates
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Fetch customers (only pending ones + optional industry filter)
const getTraining = async () => {
  try {
    const { data } = await api().get(
      `training-offer?with=event.trainer.user,event.trainingCourse.software,event.trainingCourse.industry,event.trainingCourse.solution&per_page=20&page=${currentPage.value}&search=${encodeURIComponent(searchQuery.value)}`
    )
    customers.value = data.data.data
    meta.value = data.data
  } catch (err) {
    console.error(err)
  }
}

// Debounced search
const debounce = (fn, delay = 500) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}

watch(searchQuery, debounce(() => {
  currentPage.value = 1
  getTraining()
}, 500))

onMounted(() => {
  getTraining()
})
</script>

<style scoped>
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
