<template>
  <div class="px-2 w-11/12 mx-auto bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
    <!-- Header Section -->
    <div class="max-w-6xl mx-auto mb-10">
      <div class="text-center">
        <!-- Decorative Elements -->
        <!-- <div class="relative inline-block mb-6">
          <div class="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-20"></div>
          <div class="relative bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl shadow-2xl">
            <i class="fas fa-laptop-code text-white text-4xl"></i>
          </div>
        </div> -->

        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Add <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Software Expertise</span>
        </h1>

        <!-- <div class="max-w-2xl mx-auto">
          <p class="text-lg text-gray-600 mb-6">
            Select your solution and industry, then customize expertise levels for each software
          </p> -->

          <!-- Progress Steps -->
          <!-- <div class="flex items-center justify-center gap-4 mb-8">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold shadow-lg">
                1
              </div>
              <span class="text-sm font-medium text-gray-700">Solution</span>
            </div>
            <div class="h-0.5 w-12 bg-gradient-to-r from-green-200 to-blue-200"></div>
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-lg">
                2
              </div>
              <span class="text-sm font-medium text-gray-700">Industry</span>
            </div>
            <div class="h-0.5 w-12 bg-gradient-to-r from-blue-200 to-purple-200"></div>
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
                3
              </div>
              <span class="text-sm font-medium text-gray-700">Software</span>
            </div>
          </div> -->
        <!-- </div> -->
      </div>
    </div>

    <!-- Main Form Card -->
    <div class="max-w-6xl mx-auto">
      <div class="relative">
        <!-- Decorative Background -->
        <div class="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-2xl opacity-50"></div>
        <div class="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-r from-pink-200 to-orange-200 rounded-full blur-2xl opacity-50"></div>

        <!-- Form Container -->
        <div class="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 overflow-hidden">
          <!-- Form Header -->
          <div class="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-2xl font-bold text-white">Configure Your Skills</h2>
                <p class="text-blue-100 mt-1">Fill in your expertise details below</p>
              </div>
              <div class="hidden md:block">
                <div class="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                  <i class="fas fa-star text-yellow-300 text-xl"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- Form Content -->
          <div class="p-6 md:p-8">
            <form @submit.prevent="submitExpertise" class="space-y-8">
              <!-- Solution & Industry Section -->
              <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Solution Card -->
                  <div class="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-5 border-2 border-emerald-100 shadow-lg">
                    <div class="flex items-center gap-3 mb-4">
                      <div class="bg-gradient-to-r from-emerald-500 to-green-500 p-3 rounded-xl shadow-lg">
                        <i class="fas fa-cogs text-white text-lg"></i>
                      </div>
                      <div>
                        <h3 class="font-bold text-gray-800 text-lg flex items-center gap-2">
                          Solution <span class="text-red-500">*</span>
                        </h3>
                        <p class="text-sm text-emerald-600">Select your solution</p>
                      </div>
                    </div>

                    <div class="relative">
                      <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
                        <i class="fas fa-search"></i>
                      </div>
                      <select
                        v-model="form.solution_id"
                        @change="onSolutionChange"
                        class="w-full pl-10 pr-4 py-3 bg-white border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all duration-200 appearance-none"
                        :disabled="loadingSolutions"
                        required
                      >
                        <option value="" disabled class="text-gray-400">Choose solution...</option>
                        <option v-for="solution in solutions" :key="solution.id" :value="solution.id" class="py-2">
                          {{ solution.name }}
                        </option>
                      </select>

                      <div v-if="loadingSolutions" class="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div class="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    </div>
                  </div>

                  <!-- Industry Card -->
                  <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border-2 border-blue-100 shadow-lg">
                    <div class="flex items-center gap-3 mb-4">
                      <div class="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-xl shadow-lg">
                        <i class="fas fa-industry text-white text-lg"></i>
                      </div>
                      <div>
                        <h3 class="font-bold text-gray-800 text-lg flex items-center gap-2">
                          Industry <span class="text-red-500">*</span>
                        </h3>
                        <p class="text-sm text-blue-600">Select your industry</p>
                      </div>
                    </div>

                    <div class="relative">
                      <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                        <i class="fas fa-building"></i>
                      </div>
                      <select
                        v-model="form.industry_id"
                        class="w-full pl-10 pr-4 py-3 bg-white border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 appearance-none"
                        :disabled="!form.solution_id"
                        required
                      >
                        <option value="" disabled class="text-gray-400">Choose industry...</option>
                        <option v-for="industry in solutionIndustries" :key="industry.id" :value="industry.id" class="py-2">
                          {{ industry.name }}
                        </option>
                      </select>

                      <div v-if="!form.solution_id" class="mt-2 text-sm text-blue-500 flex items-center gap-2">
                        <i class="fas fa-lock"></i>
                        <span>Select solution first</span>
                      </div>
                      <div v-if="form.solution_id && solutionIndustries.length === 0" class="mt-2 text-sm text-amber-600 flex items-center gap-2">
                        <i class="fas fa-exclamation-circle"></i>
                        <span>No industries available</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Connection Line -->
                <div class="flex items-center justify-center">
                  <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                      <div class="w-full border-t-2 border-dashed border-blue-200"></div>
                    </div>
                    <div class="relative flex justify-center">
                      <span class="bg-white px-4 text-sm text-gray-500">
                        <i class="fas fa-arrow-right text-purple-500 mr-2"></i>
                        Connected Fields
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Software Section -->
              <div class="space-y-6">
                <!-- Software Header -->
                <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-5 border-2 border-purple-100">
                  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div class="flex items-center gap-3">
                      <div class="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl shadow-lg">
                        <i class="fas fa-code text-white text-lg"></i>
                      </div>
                      <div>
                        <h3 class="font-bold text-gray-800 text-lg">Software & Expertise Level</h3>
                        <p class="text-sm text-purple-600">Add software with individual skill levels</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      @click="addSoftwareRow"
                      class="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-5 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                      :disabled="!form.solution_id || solutionSoftwares.length === 0"
                    >
                      <i class="fas fa-plus"></i>
                      Add Software
                    </button>
                  </div>
                </div>

                <!-- Software Rows -->
                <div v-if="softwareRows.length > 0" class="space-y-4">
                  <div v-for="(row, index) in softwareRows" :key="index" class="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border-2 border-gray-100 hover:border-purple-200 shadow-md hover:shadow-lg transition-all duration-300">
                    <div class="flex items-center justify-between mb-5">
                      <div class="flex items-center gap-3">
                        <div class="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                          <i class="fas fa-laptop text-white text-sm"></i>
                        </div>
                        <div>
                          <h4 class="font-bold text-gray-800">Software {{ index + 1 }}</h4>
                          <p class="text-xs text-gray-500">Configure skill level</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        @click="removeSoftwareRow(index)"
                        class="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors duration-200"
                        v-if="softwareRows.length > 1"
                        title="Remove software"
                      >
                        <i class="fas fa-times text-lg"></i>
                      </button>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <!-- Software Selection -->
                      <div class="space-y-2">
                        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700">
                          <i class="fas fa-cube text-purple-500"></i>
                          Software <span class="text-red-500">*</span>
                        </label>
                        <select
                          v-model="row.software_id"
                          @change="onSoftwareChange(index)"
                          class="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all duration-200"
                          :disabled="!form.solution_id"
                          required
                        >
                          <option value="" disabled class="text-gray-400">Select software...</option>
                          <option
                            v-for="software in availableSoftwares"
                            :key="software.id"
                            :value="software.id"
                            :disabled="isSoftwareSelected(software.id, index)"
                            class="py-2"
                          >
                            {{ software.name }}
                            <template v-if="isSoftwareSelected(software.id, index)">
                              <span class="text-red-400">(Already selected)</span>
                            </template>
                          </option>
                        </select>
                      </div>

                      <!-- Expertise Level -->
                      <div class="space-y-2">
                        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700">
                          <i class="fas fa-chart-line text-orange-500"></i>
                          Expertise Level <span class="text-red-500">*</span>
                        </label>
                        <div class="grid grid-cols-3 gap-3">
                          <div v-for="level in expertiseLevels" :key="level.value">
                            <input
                              type="radio"
                              :id="`level-${index}-${level.value}`"
                              v-model="row.level"
                              :value="level.value"
                              class="hidden peer"
                              :disabled="!row.software_id"
                              required
                            />
                            <label
                              :for="`level-${index}-${level.value}`"
                              class="block p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 peer-checked:scale-105 peer-checked:shadow-lg"
                              :class="[
                                row.level === level.value
                                  ? level.value === 'basic'
                                    ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 shadow-blue-100'
                                    : level.value === 'intermediate'
                                    ? 'border-green-500 bg-gradient-to-br from-green-50 to-green-100 text-green-700 shadow-green-100'
                                    : 'border-purple-500 bg-gradient-to-br from-purple-50 to-purple-100 text-purple-700 shadow-purple-100'
                                  : 'border-gray-200 hover:border-gray-300 bg-white',
                                !row.software_id ? 'opacity-50 cursor-not-allowed grayscale' : ''
                              ]"
                            >
                              <div class="flex flex-col items-center gap-2">
                                <div class="w-10 h-10 rounded-full flex items-center justify-center mb-1"
                                  :class="[
                                    level.value === 'basic' ? 'bg-blue-100 text-blue-600'
                                    : level.value === 'intermediate' ? 'bg-green-100 text-green-600'
                                    : 'bg-purple-100 text-purple-600'
                                  ]"
                                >
                                  <i :class="[level.icon, 'text-lg']"></i>
                                </div>
                                <span class="font-bold text-sm">{{ level.label }}</span>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Selected Software Preview -->
                    <div v-if="row.software_id" class="mt-6 pt-5 border-t border-gray-100">
                      <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div class="flex items-center gap-3">
                          <div class="bg-gradient-to-r from-purple-100 to-pink-100 p-2 rounded-lg">
                            <i class="fas fa-check-circle text-purple-600"></i>
                          </div>
                          <div>
                            <p class="text-sm text-gray-500">Selected Software</p>
                            <p class="font-bold text-gray-800 text-lg">{{ getSoftwareName(row.software_id) }}</p>
                          </div>
                        </div>

                        <div :class="[
                          'px-4 py-2 rounded-full font-bold text-sm shadow-sm',
                          row.level === 'basic'
                            ? 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border border-blue-200'
                            : row.level === 'intermediate'
                            ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200'
                            : row.level === 'advanced'
                            ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200'
                            : 'bg-gray-100 text-gray-700 border border-gray-200'
                        ]">
                          <i class="fas fa-trophy mr-2"></i>
                          {{ row.level ? getLevelLabel(row.level) + ' Level' : 'No Level Selected' }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Empty State -->
                <div v-if="softwareRows.length === 0" class="text-center py-12 border-3 border-dashed border-gray-200 rounded-2xl bg-gradient-to-br from-gray-50 to-white/50">
                  <div class="inline-block mb-4">
                    <div class="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full shadow-lg">
                      <i class="fas fa-laptop-code text-white text-3xl"></i>
                    </div>
                  </div>
                  <h4 class="text-xl font-bold text-gray-800 mb-2">No Software Added Yet</h4>
                  <p class="text-gray-600 mb-4 max-w-md mx-auto">Click "Add Software" to start building your expertise profile</p>
                  <div class="text-sm text-gray-500 flex items-center justify-center gap-2">
                    <i class="fas fa-lightbulb text-yellow-500"></i>
                    <span>Each software can have different expertise levels</span>
                  </div>
                </div>
              </div>

              <!-- Form Actions -->
              <div class="pt-6 border-t border-gray-100">
                <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                  <button
                    type="button"
                    @click="resetForm"
                    class="group px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-all duration-200 flex items-center gap-2"
                    :disabled="submitting"
                  >
                    <i class="fas fa-redo group-hover:rotate-180 transition-transform duration-500"></i>
                    Clear Form
                  </button>

                  <div class="flex flex-col md:flex-row items-center gap-4">
                    <!-- Messages -->
                    <div v-if="error" class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-100 to-pink-100 rounded-lg border border-red-200">
                      <i class="fas fa-exclamation-triangle text-red-600"></i>
                      <span class="text-red-700 font-medium">{{ error }}</span>
                    </div>

                    <div v-if="success" class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border border-green-200">
                      <i class="fas fa-check-circle text-green-600"></i>
                      <span class="text-green-700 font-medium">Saved Successfully!</span>
                    </div>

                    <!-- Submit Button -->
                    <button
                      type="submit"
                      :disabled="submitting || !isFormValid"
                      class="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-3"
                      :class="[
                        !isFormValid || submitting ? 'opacity-50 cursor-not-allowed' : ''
                      ]"
                    >
                      <span v-if="submitting" class="flex items-center gap-2">
                        <i class="fas fa-spinner fa-spin"></i>
                        Processing...
                      </span>
                      <span v-else class="flex items-center gap-2">
                        <i class="fas fa-save"></i>
                        Save Expertise
                        <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-200"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import api from '@/config/api'
import Swal from 'sweetalert2'

// Form state
const form = reactive({
  solution_id: '',
  industry_id: ''
})

// Data from API
const solutions = ref([]) // All solutions with industries and softwares
const solutionIndustries = ref([]) // Industries for selected solution
const solutionSoftwares = ref([]) // Softwares for selected solution

// UI State
const loadingSolutions = ref(false)
const submitting = ref(false)
const error = ref('')
const success = ref(false)

// Software rows (each with software_id and level)
const softwareRows = ref([
  { software_id: '', level: '' }
])

// Expertise levels
const expertiseLevels = [
  { value: 'basic', label: 'Basic', icon: 'fas fa-seedling' },
  { value: 'intermediate', label: 'Intermediate', icon: 'fas fa-chart-bar' },
  { value: 'advanced', label: 'Advanced', icon: 'fas fa-crown' }
]

// Fetch solutions with industries and softwares from API
const fetchSolutionsWithRelations = async () => {
  loadingSolutions.value = true
  try {
    const response = await api().get('solutions?with=industries,softwares')

    // Handle response structure
    if (response.data.data && Array.isArray(response.data.data)) {
      solutions.value = response.data.data
    } else if (Array.isArray(response.data)) {
      solutions.value = response.data
    } else {
      solutions.value = []
      console.error('Unexpected API response structure:', response.data)
    }

    console.log('Loaded solutions with relations:', solutions.value)

  } catch (err) {
    console.error('Error fetching solutions with relations:', err)
    error.value = 'Failed to load solutions. Please try again.'
    solutions.value = []
  } finally {
    loadingSolutions.value = false
  }
}

// Handle solution change
const onSolutionChange = () => {
  console.log('Solution changed to:', form.solution_id)

  // Reset dependent fields
  form.industry_id = ''
  solutionIndustries.value = []
  solutionSoftwares.value = []
  softwareRows.value = [{ software_id: '', level: '' }]
  error.value = ''
  success.value = false

  // Get industries and softwares for the selected solution
  updateSolutionData()
}

// Update industries and softwares based on selected solution
const updateSolutionData = () => {
  if (!form.solution_id) {
    solutionIndustries.value = []
    solutionSoftwares.value = []
    return
  }

  // Find the selected solution
  const selectedSolution = solutions.value.find(sol => sol.id == form.solution_id)

  if (selectedSolution) {
    // Set industries for this solution
    solutionIndustries.value = selectedSolution.industries || []

    // Set softwares for this solution
    solutionSoftwares.value = selectedSolution.softwares || []

    console.log(`Solution "${selectedSolution.name}":`, {
      industries: solutionIndustries.value,
      softwares: solutionSoftwares.value
    })
  } else {
    solutionIndustries.value = []
    solutionSoftwares.value = []
  }
}

// Computed: Get available softwares (excluding already selected ones)
const availableSoftwares = computed(() => {
  // Get all selected software IDs (except the current row being edited)
  const selectedIds = softwareRows.value
    .map(row => row.software_id)
    .filter(id => id !== '')

  // Filter out already selected softwares
  return solutionSoftwares.value.filter(software =>
    !selectedIds.includes(software.id.toString())
  )
})

// Check if a software is already selected
const isSoftwareSelected = (softwareId, currentIndex) => {
  return softwareRows.value.some((row, index) =>
    index !== currentIndex && row.software_id == softwareId
  )
}

// Get software name by ID
const getSoftwareName = (softwareId) => {
  const software = solutionSoftwares.value.find(s => s.id == softwareId)
  return software ? software.name : `Software #${softwareId}`
}

// Get level label
const getLevelLabel = (levelValue) => {
  const level = expertiseLevels.find(l => l.value === levelValue)
  return level ? level.label : ''
}

// Add a new software row
const addSoftwareRow = () => {
  if (availableSoftwares.value.length > 0) {
    softwareRows.value.push({ software_id: '', level: '' })
  } else {
    Swal.fire({
      title: 'No More Software',
      text: 'All available software have been selected.',
      icon: 'info',
      confirmButtonColor: '#3b82f6'
    })
  }
}

// Remove a software row
const removeSoftwareRow = (index) => {
  if (softwareRows.value.length > 1) {
    softwareRows.value.splice(index, 1)
  }
}

// Handle software change in a row
const onSoftwareChange = (index) => {
  // Clear level when software changes
  softwareRows.value[index].level = ''
}

// Form validation
const isFormValid = computed(() => {
  // Check if solution and industry are selected
  if (!form.solution_id || !form.industry_id) return false

  // Check if at least one software row is filled
  if (softwareRows.value.length === 0) return false

  // Check each software row
  return softwareRows.value.every(row =>
    row.software_id && row.level
  )
})

// Reset form
const resetForm = () => {
  form.solution_id = ''
  form.industry_id = ''
  solutionIndustries.value = []
  solutionSoftwares.value = []
  softwareRows.value = [{ software_id: '', level: '' }]
  error.value = ''
  success.value = false
}

// Submit form
const submitExpertise = async () => {
  if (!isFormValid.value) {
    error.value = 'Please fill all required fields and ensure each software has an expertise level.'
    return
  }

  submitting.value = true
  error.value = ''
  success.value = false

  try {
    // Prepare items array - one item per software row
    const items = softwareRows.value.map(row => ({
      industry_id: parseInt(form.industry_id),
      solution_id: parseInt(form.solution_id),
      software_id: parseInt(row.software_id),
      levels: row.level.charAt(0).toUpperCase() + row.level.slice(1)
    }))

    console.log('Submitting items:', items)

    // Make single POST request with items array
    const response = await api().post('/software-level', { items })

    console.log('Submission response:', response.data)

    // Show success message
    success.value = true

    Swal.fire({
      title: 'Success!',
      text: `${items.length} expertise record(s) saved successfully.`,
      icon: 'success',
      confirmButtonColor: '#3b82f6'
    })

    // Reset form after successful submission
    resetForm()

  } catch (err) {
    console.error('Error submitting expertise:', err)
    console.error('Error details:', err.response?.data)

    // Show specific error from API response if available
    if (err.response?.data?.errors?.items) {
      error.value = err.response.data.errors.items[0]
    } else if (err.response?.data?.message) {
      error.value = err.response.data.message
    } else {
      error.value = 'Failed to save expertise. Please try again.'
    }

    Swal.fire({
      title: 'Error',
      text: error.value,
      icon: 'error',
      confirmButtonColor: '#ef4444'
    })
  } finally {
    submitting.value = false
  }
}

// Initialize data on component mount
onMounted(() => {
  fetchSolutionsWithRelations()
})
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #8b5cf6, #6366f1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #7c3aed, #4f46e5);
}

/* Smooth transitions */
select, button, label, input[type="radio"] + label {
  transition: all 0.2s ease-in-out;
}

/* Pulse animation for active elements */
@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
}

.pulse {
  animation: pulse 2s infinite;
}

/* Glow effect on focus */
select:focus, button:focus {
  animation: pulse 2s infinite;
}

/* Smooth fade in for new rows */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
