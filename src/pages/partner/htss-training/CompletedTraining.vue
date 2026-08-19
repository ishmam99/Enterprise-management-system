<template>
  <div class=" px-4 py-6 w-full mx-auto ">
    <!-- Header -->
    <div class="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-t-2xl text-white px-6 py-5 shadow-lg">
      <h1 class="text-3xl font-bold">🎯Completed Training Lists</h1>
      <p class="text-teal-100 mt-1">Manage and organize your training programs</p>
    </div>

    <div class="">
      <!-- Solution & Software Section -->
      <div class="my-8 bg-white rounded-2xl p-6 shadow-lg border border-teal-100">
        <div class="flex items-center mb-6">
          <div class="w-2 h-8 bg-gradient-to-b from-teal-500 to-emerald-500 rounded-full mr-3"></div>
          <h3 class="text-xl font-bold text-gray-800">🔧 Select Solution and Software</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Solution -->
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
            <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Solution *
            </label>
            <select v-model="userForm.solutionId" @change="onSolutionChange" required
              :disabled="loadingSolutions"
              class="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white shadow-sm">
              <option value="" class="text-gray-400">🎯 Select Solution</option>
              <option v-for="solution in solutions" :key="solution.id" :value="solution.id" class="py-2">
                🚀 {{ solution?.name }}
              </option>
            </select>
            <div v-if="loadingSolutions" class="flex items-center text-sm text-blue-600 mt-2">
              <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              Loading solutions...
            </div>
            <p v-if="errors.solutionId" class="text-red-500 text-sm mt-2 flex items-center">
              ⚠️ {{ errors.solutionId }}
            </p>
          </div>

          <!-- Software -->
          <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
            <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <span class="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Software *
            </label>

            <div v-if="loadingSoftware" class="flex items-center text-sm text-purple-600">
              <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600 mr-2"></div>
              Loading software...
            </div>

            <div v-else class="space-y-3">
              <select
                v-model="userForm.softwareId"
                :disabled="!userForm.solutionId || availableSoftware.length === 0"
                class="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white shadow-sm"
              >
                <option value="" class="text-gray-400">💻 Select Software</option>
                <option
                  v-for="soft in availableSoftware"
                  :key="soft.id"
                  :value="soft.id"
                  class="py-2"
                >
                  💻 {{ soft.name }}
                </option>
              </select>

              <div v-if="!userForm.solutionId" class="text-sm text-purple-600 bg-purple-50 p-3 rounded-lg">
                🔄 Please select a solution first to see available software
              </div>
              <div v-else-if="availableSoftware.length === 0" class="text-sm text-purple-600 bg-purple-50 p-3 rounded-lg">
                📭 No software available for the selected solution
              </div>
            </div>

            <p v-if="errors.softwareId" class="text-red-500 text-sm mt-2 flex items-center">
              ⚠️ {{ errors.softwareId }}
            </p>

            <div v-if="userForm.softwareId" class="mt-3 text-sm font-medium text-purple-700 bg-purple-100 px-3 py-2 rounded-lg inline-flex items-center">
              <span class="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              ✅ Selected: {{ getSelectedSoftwareName() }}
            </div>
          </div>
        </div>

<!-- Filter Actions -->
<div class="mt-6 flex gap-4 justify-end">
  <button
    @click="resetFilters"
    class="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
  >
    🔄 Reset Filters
  </button>
</div>

      </div>

      <!-- Trainings Table -->
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-teal-100">
        <!-- Table Header -->
        <div class="bg-gradient-to-r from-teal-500 to-emerald-600 px-6 py-4">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-white flex items-center">
              📊 Training Programs
              <span class="ml-2 bg-white/20 px-2 py-1 rounded-full text-sm">
                {{ filteredTrainings.length }} items
              </span>
            </h2>
            <div class="text-teal-100 flex items-center">
              <span class="mr-2">🎯</span>
              {{ getFilterStatusText() }}
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loadingTrainings" class="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <h3 class="text-xl font-bold text-gray-600 mb-2">Loading trainings...</h3>
          <p class="text-gray-500">Please wait while we fetch the training data</p>
        </div>

        <!-- Table Content -->
        <div v-else class="overflow-x-auto">
           <div class="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-teal-400 scrollbar-track-gray-100">
   <table class="min-w-full table-fixed border-collapse">

            <thead>
              <tr class="bg-gradient-to-r from-teal-50 to-emerald-50">
                <th class="p-4 border-r border-teal-200 text-left text-teal-800 font-bold text-sm uppercase tracking-wider">
                  🆔 ID
                </th>
                <th class="p-4 border-r border-teal-200 text-left text-teal-800 font-bold text-sm uppercase tracking-wider">
                  📝 Title
                </th>
                <th class="p-4 border-r border-teal-200 text-left text-teal-800 font-bold text-sm uppercase tracking-wider">
                  🏢 Industry
                </th>
                <th class="p-4 border-r border-teal-200 text-left text-teal-800 font-bold text-sm uppercase tracking-wider">
                  🚀 Solution
                </th>
                <th class="p-4 border-r border-teal-200 text-left text-teal-800 font-bold text-sm uppercase tracking-wider">
                  💻 Software
                </th>
                <th class="p-4 border-r border-teal-200 text-left text-teal-800 font-bold text-sm uppercase tracking-wider">
                  📊 Level
                </th>
                <th class="p-4 border-r border-teal-200 text-left text-teal-800 font-bold text-sm uppercase tracking-wider">
                  📋 Description
                </th>

                <th class="p-4 border-r border-teal-200 text-left text-teal-800 font-bold text-sm uppercase tracking-wider">
                  ✅ Approval
                </th>
                <th class="p-4 border-r border-teal-200 text-left text-teal-800 font-bold text-sm uppercase tracking-wider">
                  🌐 Post Status
                </th>
                <th class="p-4 text-left text-teal-800 font-bold text-sm uppercase tracking-wider">
                  ⚡ Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(training, index) in filteredTrainings"
                :key="training.id"
                class="border-b border-teal-100 transition-all duration-300 hover:shadow-md"
                :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
              >
                <td class="p-4 border-r border-teal-100 font-mono font-bold text-blue-600">
                  #{{ training.id }}
                </td>
                <td class="px-4 py-2 text-gray-700 text-sm break-words whitespace-normal">

                  <div class="font-semibold text-gray-800 flex items-center">
                    {{ training.title }}
                  </div>
                </td>
                <td class="p-4 border-r border-teal-100">
                  <span class="text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    {{ getCustomerName(training.customer_id) }}
                  </span>
                </td>
                <td class="p-4 border-r border-teal-100">
                  <span class="text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {{ getSolutionName(training.solution_id) }}
                  </span>
                </td>
                <td class="p-4 border-r border-teal-100">
                  <span class="text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {{ getSoftwareSkillName(training.software_id) }}
                  </span>
                </td>
                <td class="p-4 border-r border-teal-100">
                  <span :class="`px-3 py-1 rounded-full text-sm font-bold ${
                    training.training_level === 'Beginner' ? 'bg-green-100 text-green-800' :
                    training.training_level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`">
                    {{ training.training_level || 'Beginner' }}
                  </span>
                </td>
                <td class="p-4 border-r border-teal-100 max-w-xs">
                  <div class="text-gray-600 text-sm truncate" :title="training.description">
                    {{ training.description || 'No description' }}
                  </div>
                </td>

           <td class="p-4 border-r border-teal-100">
  <span
    :class="[
      'px-3 py-2 rounded-full text-xs font-bold flex items-center justify-center w-32 border',
      training.status == 1
        ? 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border-blue-200'
        : training.status == 2
        ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200'
        : training.status == 3
        ? 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border-yellow-200'
        : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border-red-200'
    ]"
  >
    <span
      class="w-2 h-2 rounded-full mr-2"
      :class="{
        'bg-blue-500': training.status == 1,
        'bg-green-500': training.status == 2,
        'bg-yellow-500': training.status == 3,
        'bg-red-500': ![1,2,3].includes(training.status)
      }"
    ></span>
    {{
      training.status == 1
        ? 'Planned'
        : training.status == 2
        ? 'Completed'
        : training.status == 3
        ? 'Certification Requested'
        : 'Pending'
    }}
  </span>
</td>

                <td class="p-4 border-r border-teal-100">
                  <span :class="`px-3 py-2 rounded-full text-xs font-bold flex items-center justify-center w-24 ${
                    training.training_post_status === 'published' ? 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border border-blue-200' :
                    training.training_post_status === 'draft' ? 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 border border-gray-200' :
                    'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 border border-orange-200'
                  }`">
                    <span class="w-2 h-2 rounded-full mr-2" :class="{
                      'bg-blue-500': training.training_post_status === 'published',
                      'bg-gray-500': training.training_post_status === 'draft',
                      'bg-orange-500': training.training_post_status !== 'published' && training.training_post_status !== 'draft'
                    }"></span>
                    {{ training.training_post_status || 'draft' }}
                  </span>
                </td>
             <td class="p-4">
  <div class="flex gap-2 flex-wrap">
    <!-- Plan Button -->
    <button
      @click="statusUpdate(training.id, 1)"
      :disabled="training.status == 1"
      class="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-xl text-sm font-semibold
      transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center"
    >
      {{ training.status == 1 ? 'Planned' : 'Plan Training' }}
    </button>

    <!-- Completed Button -->
    <button
      @click="statusUpdate(training.id, 2)"
      :disabled="training.status == 2"
      class="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl text-sm font-semibold
      transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center"
    >
      {{ training.status == 2 ? 'Completed' : 'Complete Training' }}
    </button>

    <!-- Request Certification -->
    <button
      @click="statusUpdate(training.id, 3)"
      :disabled="training.status == 3"
      class="px-4 py-2 bg-gradient-to-r from-yellow-500 to-cyan-600 text-white rounded-xl text-sm font-semibold
      transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center"
    >
      {{ training.status == 3 ? 'Requested' : 'Request Certification' }}
    </button>
  </div>
</td>

              </tr>
            </tbody>
          </table>
</div>
          <!-- Empty State -->
          <div v-if="filteredTrainings.length === 0 && !loadingTrainings" class="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50">
            <div class="text-8xl mb-6 opacity-50">📚</div>
            <h3 class="text-2xl font-bold text-gray-600 mb-3">No trainings found</h3>
            <p class="text-gray-500 text-lg max-w-md mx-auto">
              {{ getEmptyStateMessage() }}
            </p>
            <button
              @click="resetFilters"
              class="mt-6 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-teal-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🔄 Reset Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '@/config/api'
import Swal from 'sweetalert2'
import { watch } from 'vue'
import { ref, reactive, computed, onMounted } from 'vue'

// Mock data for solutions with softwares
const mockSolutions = [
  {
    id: 2,
    name: 'Structural Analysis',
    softwares: [
      { id: 1, name: "Patran" },
      { id: 2, name: "Nastran" }
    ]
  },
  {
    id: 3,
    name: 'CFD Analysis',
    softwares: [
      { id: 3, name: "Fluent" },
      { id: 4, name: "CFX" }
    ]
  }
]

// Mock data for trainings - Updated to match actual API response structure
const mockTrainings = [
  {
    id: 5800,
    industry_id: "9",
    solution_id: "16",
    software_id: "12",
    customer_id: null,
    training_type: null,
    training_level: "intermediate",
    title: "FA_Fluids_Actran_Intermediate",
    course_id: "FA-FL-ACT-201",
    course_code: null,
    description: "Autem enim error sit",
    duration: "5 days",
    status: "1",
    created_at: "2025-11-09T14:35:25.000000Z",
    updated_at: "2025-11-09T14:35:41.000000Z"
  },
  {
    id: 5801,
    industry_id: "9",
    solution_id: "2",
    software_id: "2",
    customer_id: null,
    training_type: null,
    training_level: "beginner",
    title: "Structural Analysis Basics",
    course_id: "STR-ANL-BAS-101",
    course_code: null,
    description: "Basic structural analysis training",
    duration: "3 days",
    status: "1",
    created_at: "2025-11-09T14:35:25.000000Z",
    updated_at: "2025-11-09T14:35:41.000000Z"
  }
]

// Mock customers data
const mockCustomers = [
  { id: 1, name: 'Aerospace Company' },
  { id: 2, name: 'Automotive Industry' },
  { id: 3, name: 'Marine Engineering' }
]

// Reactive data
const solutions = ref([])
const trainings = ref([])
const loadingSolutions = ref(false)
const loadingSoftware = ref(false)
const loadingTrainings = ref(false)
const actionLoading = ref(false)
const availableSoftware = ref([])
const isFilterApplied = ref(false)

// Form and errors
const userForm = reactive({
  solutionId: '',
  softwareId: ''
})

const errors = reactive({
  solutionId: '',
  softwareId: ''
})

// Computed property for filtered trainings with proper data type handling
const filteredTrainings = computed(() => {
  if (!isFilterApplied.value) {
    return trainings.value
  }

  return trainings.value.filter(training => {
    // Convert both values to numbers for comparison
    const trainingSolutionId = parseInt(training.solution_id)
    const trainingSoftwareId = parseInt(training.software_id)
    const selectedSolutionId = parseInt(userForm.solutionId)
    const selectedSoftwareId = parseInt(userForm.softwareId)

    const matchesSolution = trainingSolutionId === selectedSolutionId
    const matchesSoftware = trainingSoftwareId === selectedSoftwareId

    console.log('Filtering:', {
      training: {
        id: training.id,
        solution_id: training.solution_id,
        software_id: training.software_id
      },
      filter: {
        solutionId: userForm.solutionId,
        softwareId: userForm.softwareId
      },
      matchesSolution,
      matchesSoftware
    })

    return matchesSolution && matchesSoftware
  })
})

// Fetch solutions
const fetchSolutions = async () => {
  loadingSolutions.value = true
  try {
    const response = await api().get("/end-user-solution-list?with=softwares", {})
    solutions.value = response.data.data || []
    console.log('Fetched solutions:', solutions.value)
  } catch (err) {
    console.error("Error fetching solutions:", err)
    // Fallback to mock data
    solutions.value = mockSolutions
  } finally {
    loadingSolutions.value = false
  }
}

// Fetch trainings
const fetchTrainings = async (filters = {}) => {
  loadingTrainings.value = true
  try {
    let apiUrl = `/training-course?per_page=15`

    // Build where clause for filtering
    const whereClause = []

    if (filters.solutionId) {
      whereClause.push({
        column: 'solution_id',
        operator: '=',
        value: filters.solutionId.toString()
      })
    }

    if (filters.softwareId) {
      whereClause.push({
        column: 'software_id',
        operator: '=',
        value: filters.softwareId.toString()
      })
    }

    if (whereClause.length > 0) {
      apiUrl += `&where=${encodeURIComponent(JSON.stringify(whereClause))}`
    }

    console.log('Fetching trainings with URL:', apiUrl)

    const response = await api().get(apiUrl)

    // 🔍 DEBUG: Log the entire response to see the structure
    console.log('Full API Response:', response)
    console.log('Response data:', response.data)
    console.log('Response data.data:', response.data?.data)

    // Handle different API response structures
    if (response.data && response.data.data) {
      // Check if data is nested or direct
      const responseData = response.data.data

      if (Array.isArray(responseData)) {
        trainings.value = responseData
        console.log('Trainings set as direct array:', trainings.value)
      } else if (responseData.data && Array.isArray(responseData.data)) {
        // Handle nested data structure
        trainings.value = responseData.data
        console.log('Trainings set from nested data.data:', trainings.value)
      } else if (responseData.items && Array.isArray(responseData.items)) {
        // Handle items structure
        trainings.value = responseData.items
        console.log('Trainings set from items:', trainings.value)
      } else {
        console.warn('Unexpected data structure:', responseData)
        trainings.value = []
      }
    } else {
      console.warn('No data found in response')
      trainings.value = []
    }

  } catch (err) {
    console.error('Error fetching trainings:', err)
    // Fallback to mock data for testing
    trainings.value = mockTrainings.filter(training => {
      if (filters.solutionId && filters.softwareId) {
        return training.solution_id === filters.solutionId.toString() &&
               training.software_id === filters.softwareId.toString()
      }
      return true
    })
  } finally {
    loadingTrainings.value = false
  }
}

// ✅ FIXED: Handle solution change with proper data type conversion
const onSolutionChange = () => {
  loadingSoftware.value = true
  userForm.softwareId = ''

  if (userForm.solutionId) {
    const selectedSolutionId = parseInt(userForm.solutionId)
    const selectedSolution = solutions.value.find(s => s.id === selectedSolutionId)
    availableSoftware.value = selectedSolution?.softwares || []
    console.log('Available software for solution:', selectedSolutionId, availableSoftware.value)
  } else {
    availableSoftware.value = []
  }

  setTimeout(() => {
    loadingSoftware.value = false
  }, 500)
}

// Automatically fetch trainings when software changes
watch(
  () => userForm.softwareId,
  (newVal) => {
    if (userForm.solutionId && newVal) {
      isFilterApplied.value = true
      fetchTrainings({
        solutionId: userForm.solutionId,
        softwareId: newVal
      })
    }
  }
)

// ✅ FIXED: Reset filters
const resetFilters = () => {
  userForm.solutionId = ''
  userForm.softwareId = ''
  availableSoftware.value = []
  isFilterApplied.value = false
  errors.solutionId = ''
  errors.softwareId = ''

  console.log('Filters reset, fetching all trainings')
  fetchTrainings() // Fetch all trainings without filters
}

// ✅ FIXED: Utility functions with proper data type handling
const getCustomerName = (customerId) => {
  if (!customerId) return 'Not specified'
  const customer = mockCustomers.find(c => c.id === parseInt(customerId))
  return customer ? customer.name : 'Unknown'
}

const getSolutionName = (solutionId) => {
  if (!solutionId) return 'Unknown'
  const solution = solutions.value.find(s => s.id === parseInt(solutionId))
  return solution ? solution.name : 'Unknown'
}

const getSoftwareSkillName = (softwareId) => {
  if (!softwareId) return 'Unknown'

  for (const solution of solutions.value) {
    const software = solution.softwares.find(s => s.id === parseInt(softwareId))
    if (software) return software.name
  }
  return 'Unknown'
}

const getSelectedSoftwareName = () => {
  if (!userForm.softwareId) return ''

  const softwareId = parseInt(userForm.softwareId)
  for (const solution of solutions.value) {
    const software = solution.softwares.find(s => s.id === softwareId)
    if (software) return software.name
  }
  return 'Unknown'
}

const getFilterStatusText = () => {
  if (!isFilterApplied.value) return 'All trainings'

  const solutionName = getSolutionName(parseInt(userForm.solutionId))
  const softwareName = getSelectedSoftwareName()

  return `Filtered: ${solutionName} - ${softwareName}`
}

const getEmptyStateMessage = () => {
  if (!isFilterApplied.value) {
    return 'There are no trainings available at the moment.'
  }

  const solutionName = getSolutionName(parseInt(userForm.solutionId))
  const softwareName = getSelectedSoftwareName()

  return `No trainings found for ${solutionName} - ${softwareName}. Try adjusting your filters.`
}

// ✅ FIXED: Format date safely
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch (error) {
    return 'Invalid date'
  }
}

// ✅ FIXED: Get training level display text
const getTrainingLevel = (level) => {
  if (!level) return 'Beginner'
  return level.charAt(0).toUpperCase() + level.slice(1)
}

// ✅ FIXED: Get level class
const getLevelClass = (level) => {
  const levelStr = level ? level.toLowerCase() : 'beginner'

  if (levelStr.includes('beginner')) return 'bg-green-100 text-green-800'
  if (levelStr.includes('intermediate')) return 'bg-yellow-100 text-yellow-800'
  if (levelStr.includes('advanced')) return 'bg-red-100 text-red-800'

  return 'bg-green-100 text-green-800' // default
}

const statusUpdate = async (trainingId, newStatus) => {
  actionLoading.value = true
  try {
    // Find current training object
    const training = trainings.value.find(t => t.id === trainingId)
    if (!training) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Training not found in list.',
        confirmButtonText: 'OK'
      })
      return
    }

    // Build full payload expected by backend
    const payload = {
      _method: 'put',
      industry_id: training.industry_id,
      solution_id: training.solution_id,
      software_id: training.software_id,
      training_level: training.training_level,
      title: training.title,
      status: newStatus,
    }

    // Send PUT update request
    const response = await api().post(`/training-course/${trainingId}`, payload)

    if (response.data?.message) {
      training.status = newStatus // update UI immediately
      Swal.fire({
        icon: 'success',
        title: 'Status Updated',
        text: `Training status updated successfully.`,
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: response.data?.message || 'Something went wrong while updating status.',
        confirmButtonText: 'OK'
      })
    }
  } catch (error) {
    console.error('Error updating status:', error)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to update training status.',
      confirmButtonText: 'OK'
    })
  } finally {
    actionLoading.value = false
  }
}




const openEditModal = (training) => {
  console.log('Open edit modal for training:', training)
}

const deleteTraining = async (trainingId) => {
  if (confirm('Are you sure you want to delete this training?')) {
    try {
      trainings.value = trainings.value.filter(t => t.id !== trainingId)
      console.log(`Training ${trainingId} deleted`)
    } catch (err) {
      console.error("Error deleting training:", err)
    }
  }
}

// Initialize
onMounted(() => {
  console.log('Component mounted, fetching initial data...')
  fetchSolutions()
  fetchTrainings()
})
</script>


<style scoped>
.loading {
  display: inline-block;
}

/* Custom scrollbar for better UX */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
