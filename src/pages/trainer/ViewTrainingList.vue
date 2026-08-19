<template>
  <div class="px-10 bg-gradient-to-br from-gray-50 to-blue-50 py-5 mx-auto min-h-screen">
    <!-- Header -->
    <div class="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-t-2xl text-white px-6 py-5 shadow-lg">
      <h1 class="text-3xl font-bold">🎯 Training Lists</h1>
      <p class="text-teal-100 mt-1">Manage and organize your training programs</p>
    </div>

    <div class="p-10">
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
                🚀 {{ solution.solution_name }}
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

            <div
              v-else
              class="border-2 border-purple-200 rounded-xl p-4 max-h-40 overflow-y-auto space-y-3 bg-white shadow-inner"
            >
              <div
                v-for="soft in availableSoftware"
                :key="soft.id"
                class="flex items-center gap-3 p-2 hover:bg-purple-50 rounded-lg transition-colors duration-200"
              >
                <input
                  type="checkbox"
                  :id="'software-' + soft.id"
                  :value="soft.id"
                  v-model="userForm.softwareIds"
                  class="rounded-lg border-2 border-purple-300 text-purple-600 focus:ring-2 focus:ring-purple-500 transform hover:scale-110 transition-transform duration-200"
                />
                <label
                  :for="'software-' + soft.id"
                  class="text-sm font-medium text-gray-700 cursor-pointer select-none flex items-center"
                >
                  <span class="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-2"></span>
                  💻 {{ soft.name }}
                </label>
              </div>
            </div>

            <p v-if="errors.softwareIds" class="text-red-500 text-sm mt-2 flex items-center">
              ⚠️ {{ errors.softwareIds }}
            </p>

            <div v-if="userForm.softwareIds.length" class="mt-3 text-sm font-medium text-purple-700 bg-purple-100 px-3 py-2 rounded-lg inline-flex items-center">
              <span class="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              ✅ Selected: {{ userForm.softwareIds.length }} software
            </div>
          </div>
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
              Filtered results
            </div>
          </div>
        </div>

        <!-- Table Content -->
        <div class="overflow-x-auto">
          <table class="min-w-full">
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
                  📅 Available Date
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
                <td class="p-4 border-r border-teal-100">
                  <div class="font-semibold text-gray-800 flex items-center">

                    {{ training.title }}
                  </div>
                </td>
                <td class="p-4 border-r border-teal-100">
                  <span class=" text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  {{ getCustomerName(training.customer_id) }}
                  </span>
                </td>
                <td class="p-4 border-r border-teal-100">
                  <span class=" text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                     {{ getSolutionName(training.solution_id) }}
                  </span>
                </td>
                <td class="p-4 border-r border-teal-100">
                  <span class=" text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
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
                  <span class=" text-teal-800 px-3 py-1 rounded-lg text-sm font-medium">
                    {{ formatDate(training.training_content_available_date) }}
                  </span>
                </td>
                <td class="p-4 border-r border-teal-100">
                  <span :class="`px-3 py-2 rounded-full text-xs font-bold flex items-center justify-center w-24 ${
                    training.training_approval_status === 'approved' ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200' :
                    training.training_approval_status === 'pending' ? 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border border-yellow-200' :
                    'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border border-red-200'
                  }`">
                    <span class="w-2 h-2 rounded-full mr-2" :class="{
                      'bg-green-500': training.training_approval_status === 'approved',
                      'bg-yellow-500': training.training_approval_status === 'pending',
                      'bg-red-500': training.training_approval_status !== 'approved' && training.training_approval_status !== 'pending'
                    }"></span>
                    {{ training.training_approval_status || 'pending' }}
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
                    <!-- Approve Button -->
                    <button
                      v-if="training.training_approval_status !== 'approved'"
                      @click="statusUpdate(training.id)"
                      class="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl text-sm font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 disabled:transform-none flex items-center"
                      :disabled="actionLoading"
                    >
                      <span v-if="actionLoading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                      ✅ Approve
                    </button>

                    <!-- Edit Button -->
                    <button
                      @click="openEditModal(training)"
                      class="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl text-sm font-semibold hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center"
                    >
                      ✏️ Edit
                    </button>

                    <!-- Delete Button -->
                    <button
                      @click="deleteTraining(training.id)"
                      class="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl text-sm font-semibold hover:from-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Empty State -->
          <div v-if="filteredTrainings.length === 0" class="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50">
            <div class="text-8xl mb-6 opacity-50">📚</div>
            <h3 class="text-2xl font-bold text-gray-600 mb-3">No trainings found</h3>
            <p class="text-gray-500 text-lg max-w-md mx-auto">
              There are no trainings to display for the selected criteria. Try adjusting your filters.
            </p>
            <button class="mt-6 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-teal-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              🔄 Reset Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

// Mock data for solutions with softwares
const mockSolutions = [
  {
    id: 1,
    solution_name: 'CAD Design',
    softwares: [
      { id: 1, name: 'AutoCAD' },
      { id: 2, name: 'SolidWorks' },
      { id: 3, name: 'Fusion 360' }
    ]
  },
  {
    id: 2,
    solution_name: 'BIM Modeling',
    softwares: [
      { id: 4, name: 'Revit' },
      { id: 5, name: 'ArchiCAD' },
      { id: 6, name: 'Navisworks' }
    ]
  },
  {
    id: 3,
    solution_name: '3D Visualization',
    softwares: [
      { id: 7, name: '3ds Max' },
      { id: 8, name: 'Blender' },
      { id: 9, name: 'SketchUp' }
    ]
  }
]

// Mock data for trainings
const mockTrainings = [
  {
    id: 1,
    title: 'AutoCAD Basic Training',
    customer_id: 1,
    solution_id: 1,
    software_id: 1,
    training_level: 'Beginner',
    description: 'Learn the fundamentals of AutoCAD for 2D drafting',
    training_content_available_date: '2024-01-15',
    training_approval_status: 'approved',
    training_post_status: 'published'
  },
  {
    id: 2,
    title: 'Revit Architecture Advanced',
    customer_id: 2,
    solution_id: 2,
    software_id: 4,
    training_level: 'Advanced',
    description: 'Advanced architectural modeling techniques in Revit',
    training_content_available_date: '2024-02-01',
    training_approval_status: 'pending',
    training_post_status: 'draft'
  },
  {
    id: 3,
    title: 'SolidWorks Mechanical Design',
    customer_id: 1,
    solution_id: 1,
    software_id: 2,
    training_level: 'Intermediate',
    description: 'Mechanical part and assembly design in SolidWorks',
    training_content_available_date: '2024-01-20',
    training_approval_status: 'approved',
    training_post_status: 'published'
  },
  {
    id: 4,
    title: 'Blender 3D Modeling',
    customer_id: 3,
    solution_id: 3,
    software_id: 8,
    training_level: 'Beginner',
    description: 'Introduction to 3D modeling with Blender',
    training_content_available_date: '2024-02-10',
    training_approval_status: 'rejected',
    training_post_status: 'draft'
  }
]

// Mock customers data
const mockCustomers = [
  { id: 1, name: 'Architecture Firm' },
  { id: 2, name: 'Construction Company' },
  { id: 3, name: 'Engineering Corp' }
]

// Reactive data
const solutions = ref([])
const trainings = ref([])
const loadingSolutions = ref(false)
const loadingSoftware = ref(false)
const actionLoading = ref(false)
const availableSoftware = ref([])

// Form and errors
const userForm = reactive({
  solutionId: '',
  softwareIds: []
})

const errors = reactive({
  solutionId: '',
  softwareIds: ''
})

// Computed property for filtered trainings
const filteredTrainings = computed(() => {
  if (!userForm.solutionId && userForm.softwareIds.length === 0) {
    return trainings.value
  }

  return trainings.value.filter(training => {
    const matchesSolution = !userForm.solutionId || training.solution_id === parseInt(userForm.solutionId)
    const matchesSoftware = userForm.softwareIds.length === 0 ||
      userForm.softwareIds.includes(training.software_id)

    return matchesSolution && matchesSoftware
  })
})

// ✅ Fetch solutions with softwares together
const fetchSolutions = async () => {
  loadingSolutions.value = true
  try {
    // Try API call first
    const response = await api().get("/customer-solution?softwares=true", {})
    solutions.value = response.data || []
  } catch (err) {
    console.error("Error fetching solutions:", err)
    // Fallback to mock data
    solutions.value = mockSolutions
  } finally {
    loadingSolutions.value = false
  }
}

// Fetch trainings
const fetchTrainings = async () => {
  try {
    // In real implementation, you would call your API here
    // const response = await api().get("/trainings")
    // trainings.value = response.data || []

    // Using mock data for demonstration
    trainings.value = mockTrainings
  } catch (err) {
    console.error("Error fetching trainings:", err)
    // Fallback to mock data
    trainings.value = mockTrainings
  }
}

// Handle solution change
const onSolutionChange = () => {
  loadingSoftware.value = true
  userForm.softwareIds = []

  if (userForm.solutionId) {
    const selectedSolution = solutions.value.find(s => s.id === parseInt(userForm.solutionId))
    availableSoftware.value = selectedSolution?.softwares || []
  } else {
    availableSoftware.value = []
  }

  setTimeout(() => {
    loadingSoftware.value = false
  }, 500)
}

// Utility functions
const getCustomerName = (customerId) => {
  const customer = mockCustomers.find(c => c.id === customerId)
  return customer ? customer.name : 'Unknown'
}

const getSolutionName = (solutionId) => {
  const solution = solutions.value.find(s => s.id === solutionId)
  return solution ? solution.solution_name : 'Unknown'
}

const getSoftwareSkillName = (softwareId) => {
  for (const solution of solutions.value) {
    const software = solution.softwares.find(s => s.id === softwareId)
    if (software) return software.name
  }
  return 'Unknown'
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Action functions
const statusUpdate = async (trainingId) => {
  actionLoading.value = true
  try {
    // API call to update status
    // await api().patch(`/trainings/${trainingId}`, { training_approval_status: 'approved' })

    // Update local state
    const training = trainings.value.find(t => t.id === trainingId)
    if (training) {
      training.training_approval_status = 'approved'
    }

    console.log(`Training ${trainingId} approved`)
  } catch (err) {
    console.error("Error updating training status:", err)
  } finally {
    actionLoading.value = false
  }
}

const openEditModal = (training) => {
  console.log('Open edit modal for training:', training)
  // Implement edit modal logic here
}

const deleteTraining = async (trainingId) => {
  if (confirm('Are you sure you want to delete this training?')) {
    try {
      // API call to delete training
      // await api().delete(`/trainings/${trainingId}`)

      // Update local state
      trainings.value = trainings.value.filter(t => t.id !== trainingId)

      console.log(`Training ${trainingId} deleted`)
    } catch (err) {
      console.error("Error deleting training:", err)
    }
  }
}

// Initialize
onMounted(() => {
  fetchSolutions()
  fetchTrainings()
})
</script>

<style scoped>
.loading {
  display: inline-block;
}
</style>
