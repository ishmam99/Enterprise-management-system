<template>
  <div class="min-h-screen bg-slate-100 p-6">
    <div class="max-w-6xl mx-auto">

      <!-- Header -->
      <div class="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 rounded-2xl shadow-lg mb-6">
        <h1 class="text-3xl font-bold">Probation & Confirmation</h1>
        <p class="text-sm opacity-90">Employee Candidates List</p>
      </div>

      <!-- Table -->
      <div class="bg-white rounded-2xl shadow-md p-6">
        <h3 class="text-lg font-semibold mb-4">Candidates</h3>

        <!-- Loading -->
        <div v-if="loading" class="text-center py-6 text-gray-500">
          Loading candidates...
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-100 text-gray-600 text-sm">
                <th class="p-3">Name</th>
                <!-- <th class="p-3">Position</th> -->
                <th class="p-3">Status</th>
                <th class="p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="candidate in candidates"
                :key="candidate.id"
                class="border-b hover:bg-slate-50"
              >
                <!-- Name -->
                <td class="p-3 font-medium">
                  {{ candidate.full_name }}
                </td>

                <!-- Position (fallback logic) -->
                <!-- <td class="p-3">
                  {{
                    candidate.industry?.name ||
                    candidate.industry_name ||
                    candidate.software?.name ||
                    'N/A'
                  }}
                </td> -->

                <!-- Status -->
                <td class="p-3">
                  <span
                    :class="statusClass(candidate.status)"
                    class="px-2 py-1 rounded-full text-sm"
                  >
                    {{ statusText(candidate.status) }}
                  </span>
                </td>

                <!-- Action -->
                <td class="p-3 text-center">
                  <router-link
                    :to="{ name: 'hr_management-recruitment-onboarding-view-selection-id', params: { id: candidate.id } }"
                    class="px-5 text-nowrap py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    <i class="fas fa-eye"></i> View
                  </router-link>
                </td>
              </tr>

              <!-- Empty -->
              <tr v-if="candidates.length === 0">
                <td colspan="4" class="text-center py-6 text-gray-400">
                  No candidates found
                </td>
              </tr>
            </tbody>

          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/config/api'

const candidates = ref([])
const loading = ref(false)

/* ---------------- Fetch API ---------------- */
const fetchCandidates = async () => {
  loading.value = true
  try {
    const response = await api().get('/applied-jobs')
    candidates.value = response.data.data.filter(e=> e.status==5)
  } catch (error) {
    console.error('Error fetching candidates:', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchCandidates)

/* ---------------- Status Mapping ---------------- */
// Customize based on your backend meaning
const statusText = (status) => {
  switch (status) {
    case '1': return 'Selection & Offer'
    case '2': return 'Verification'
    case '3': return 'Documentation'
    case '4': return 'Joining & Setup'
    case '5': return 'Probation & Confirmation'
    default: return 'Unknown'
  }
}

const statusClass = (status) => {
  switch (status) {
    case '1': return 'bg-blue-100 text-blue-600'
    case '2': return 'bg-yellow-100 text-yellow-600'
    case '3': return 'bg-red-100 text-red-600'
    case '4': return 'bg-green-100 text-green-600'
    case '5': return 'bg-purple-100 text-green-600'

    default: return 'bg-gray-100 text-gray-500'
  }
}
</script>