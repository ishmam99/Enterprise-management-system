<template>
  <section
    id="msc-software"
    class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
  >
    <!-- Header -->
    <div class="bg-gradient-to-r from-teal-700 to-teal-800 text-white px-6 py-4 flex items-center justify-between">
      <h2 class="text-lg font-semibold flex items-center gap-2">
        <i class="ri-code-box-line"></i>
        MSC Software &amp; Solutions
      </h2>
      <span class="text-sm bg-teal-600 px-3 py-1 rounded-full">
        {{ softwareList.length }} items
      </span>
    </div>

    <!-- Loading State -->
    <div v-if="loadingSoftware" class="p-12 text-center">
      <div class="inline-flex items-center gap-2 text-gray-500">
        <i class="fas fa-spinner fa-spin text-2xl"></i>
        <span>Loading software data...</span>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="softwareError" class="p-12 text-center">
      <div class="bg-red-50 border border-red-200 rounded-lg p-4">
        <i class="ri-error-warning-line text-red-500 text-2xl mb-2"></i>
        <p class="text-red-600">{{ softwareError }}</p>
        <button
          @click="fetchSoftwareSolutions"
          class="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="software in softwareList"
          :key="software.id"
          class="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group relative"
        >
          <div class="p-5">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-xl font-bold text-teal-700">{{ software.name }}</h3>
              <span
                class="text-xs font-semibold px-3 py-1 rounded-full"
                :class="getLevelColor(software.pivot?.level || 'Beginner')"
              >
                {{ software.pivot?.level || 'Beginner' }}
              </span>
            </div>

            <!-- Solutions -->
            <div v-if="software.solutions && software.solutions.length > 0" class="mt-4">
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Solutions
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="solution in software.solutions"
                  :key="solution.id"
                  class="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-full border border-teal-200"
                >
                  {{ solution.name }}
                </span>
              </div>
            </div>

            <div v-else class="mt-4">
              <p class="text-xs text-gray-400 italic">No solutions assigned</p>
            </div>
          </div>

          <!-- Delete Button -->
          <button
            @click="confirmDelete(software)"
            class="absolute top-4 right-4 p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
            title="Delete Software"
          >
            <i class="ri-delete-bin-6-line text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '@/services/api' // Adjust path as needed

// Reactive data
const softwareList = ref([])
const loadingSoftware = ref(true)
const softwareError = ref(null)

// Delete related
const deletingId = ref(null)

// Level color helper
const getLevelColor = (level) => {
  const colors = {
    Beginner: 'bg-green-100 text-green-700',
    Intermediate: 'bg-yellow-100 text-yellow-700',
    Advanced: 'bg-orange-100 text-orange-700',
    Expert: 'bg-red-100 text-red-700',
  }
  return colors[level] || 'bg-gray-100 text-gray-700'
}

// Fetch software
const fetchSoftwareSolutions = async () => {
  loadingSoftware.value = true
  softwareError.value = null

  try {
    const response = await api().get('end-user-software-list')

    if (response.data?.data) {
      softwareList.value = response.data.data
    } else {
      softwareList.value = []
    }
  } catch (error) {
    console.error('Error fetching software solutions:', error)
    softwareError.value = 'Failed to load software data. Please try again.'
    softwareList.value = []
  } finally {
    loadingSoftware.value = false
  }
}

// Confirm before delete
const confirmDelete = (software) => {
  if (confirm(`Are you sure you want to delete "${software.name}"?`)) {
    deleteSoftware(software.id)
  }
}

// Delete software
const deleteSoftware = async (id) => {
  deletingId.value = id

  try {
    await api().delete(`end-user-software-list/${id}`)  // Adjust endpoint if needed

    // Remove from list locally
    softwareList.value = softwareList.value.filter(item => item.id !== id)

    alert('Software deleted successfully!')
  } catch (error) {
    console.error('Error deleting software:', error)
    alert('Failed to delete software. Please try again.')
  } finally {
    deletingId.value = null
  }
}

// Auto fetch on mount
onMounted(() => {
  fetchSoftwareSolutions()
})
</script>
