<template>
  <div class="p-6 min-h-screen w-4/5 bg-gray-50">
    <!-- Header -->
    <div class="flex flex-col gap-4 mb-6">
      <!-- Title Section -->
      <div
        class="bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 rounded-2xl shadow-xl p-6 w-full relative overflow-hidden"
      >
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-10">
          <!-- <div class="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-full"></div> -->
          <div class="absolute -bottom-8 -left-8 w-32 h-32 bg-white rounded-full"></div>
          <div class="absolute top-1/2 right-1/4 w-16 h-16 bg-white rounded-full"></div>
        </div>

        <div class="relative z-10 flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="bg-white bg-opacity-20 p-3 rounded-2xl shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-white mb-1 drop-shadow-lg">Create New User</h1>
              <p class="text-blue-100 text-sm font-medium">
                Add a new user to the system with appropriate permissions and access
              </p>
            </div>
          </div>
          <button
            @click="openImportModal"
            class="bg-emerald-500 hover:bg-emerald-600 flex items-center gap-1 rounded-lg text-lg px-3 py-1.5 font-semibold hover:bg-cyan-700 text-white transition-all duration-300 shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="currentColor"
            >
              <path
                d="M2.85858 2.87732L15.4293 1.0815C15.7027 1.04245 15.9559 1.2324 15.995 1.50577C15.9983 1.52919 16 1.55282 16 1.57648V22.4235C16 22.6996 15.7761 22.9235 15.5 22.9235C15.4763 22.9235 15.4527 22.9218 15.4293 22.9184L2.85858 21.1226C2.36593 21.0522 2 20.6303 2 20.1327V3.86727C2 3.36962 2.36593 2.9477 2.85858 2.87732ZM4 4.73457V19.2654L14 20.694V3.30599L4 4.73457ZM17 19H20V4.99997H17V2.99997H21C21.5523 2.99997 22 3.44769 22 3.99997V20C22 20.5523 21.5523 21 21 21H17V19ZM10.2 12L13 16H10.6L9 13.7143L7.39999 16H5L7.8 12L5 7.99997H7.39999L9 10.2857L10.6 7.99997H13L10.2 12Z"
              ></path>
            </svg>
            Import from Excel
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="mx-auto">
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <!-- Success Message -->
        <div v-if="showSuccess" class="m-6 p-4 bg-green-50 border border-green-200 rounded-xl">
          <div class="flex items-center">
            <svg
              class="w-5 h-5 text-green-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span class="text-green-800 font-medium">User added successfully!</span>
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="p-6 space-y-8">
          <!-- Personal Information -->
          <div
            class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100"
          >
            <div class="flex items-center mb-6">
              <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                <svg
                  class="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-800">Personal Information</h3>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input
                  v-model="userForm.firstName"
                  type="text"
                  required
                  class="w-full px-4 py-3 border-0 bg-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
                  placeholder="Enter first name"
                />
                <p v-if="errors.firstName" class="text-red-600 text-sm mt-2 flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {{ errors.firstName }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input
                  v-model="userForm.lastName"
                  type="text"
                  required
                  class="w-full px-4 py-3 border-0 bg-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
                  placeholder="Enter last name"
                />
                <p v-if="errors.lastName" class="text-red-600 text-sm mt-2 flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {{ errors.lastName }}
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  v-model="userForm.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border-0 bg-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
                  placeholder="user@company.com"
                />
                <p v-if="errors.email" class="text-red-600 text-sm mt-2 flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {{ errors.email }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Username *</label>
                <input
                  v-model="userForm.username"
                  type="text"
                  required
                  class="w-full px-4 py-3 border-0 bg-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
                  placeholder="Enter username"
                />
                <p v-if="errors.username" class="text-red-600 text-sm mt-2 flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {{ errors.username }}
                </p>
              </div>
            </div>

            <div class="mt-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Knowledge Level *</label>
              <select
                v-model="userForm.knowledgeLevel"
                required
                class="w-full px-4 py-3 border-0 bg-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
              >
                <option value="">Select Knowledge Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
              <p v-if="errors.knowledgeLevel" class="text-red-600 text-sm mt-2 flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {{ errors.knowledgeLevel }}
              </p>
            </div>
          </div>

          <!-- Customer Information -->
          <div
            class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100"
          >
            <div class="flex items-center mb-6">
              <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                <svg
                  class="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-800">Customer Information</h3>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Customer *</label>
              <select
                v-model="userForm.customerId"
                required
                :disabled="loadingCustomers"
                class="w-full px-4 py-3 border-0 bg-white rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-300"
              >
                <option value="">Select Customer</option>
                <option v-for="customer in customers" :key="customer.id" :value="customer.id">
                  {{ customer?.user?.name }}
                </option>
              </select>
              <div v-if="loadingCustomers" class="text-sm text-gray-500 mt-2 flex items-center">
                <span class="loading loading-spinner loading-xs mr-2 text-green-500"></span>
                Loading customers...
              </div>
              <p v-if="errors.customerId" class="text-red-600 text-sm mt-2 flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {{ errors.customerId }}
              </p>
            </div>
          </div>

          <!-- Solution & Software -->
          <div
            class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100"
          >
            <div class="flex items-center mb-6">
              <div class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                <svg
                  class="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-800">Solution & Software Access</h3>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Solution -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Solution *</label>
                <select
                  v-model="userForm.solutionId"
                  @change="onSolutionChange"
                  required
                  :disabled="loadingSolutions"
                  class="w-full px-4 py-3 border-0 bg-white rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300"
                >
                  <option value="">Select Solution</option>
                  <option v-for="solution in solutions" :key="solution.id" :value="solution.id">
                    {{ solution.solution_name }}
                  </option>
                </select>
                <div v-if="loadingSolutions" class="text-sm text-gray-500 mt-2 flex items-center">
                  <span class="loading loading-spinner loading-xs mr-2 text-purple-500"></span>
                  Loading solutions...
                </div>
                <p v-if="errors.solutionId" class="text-red-600 text-sm mt-2 flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {{ errors.solutionId }}
                </p>
              </div>

              <!-- Software -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Software *</label>

                <div v-if="loadingSoftware" class="text-sm text-gray-500 mt-2 flex items-center">
                  <span class="loading loading-spinner loading-xs mr-2 text-purple-500"></span>
                  Loading software...
                </div>

                <div
                  v-else
                  class="border-0 bg-white rounded-xl shadow-sm p-4 max-h-48 overflow-y-auto space-y-3"
                >
                  <div
                    v-for="soft in availableSoftware"
                    :key="soft.id"
                    class="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  >
                    <input
                      type="checkbox"
                      :id="'software-' + soft.id"
                      :value="soft.id"
                      v-model="userForm.softwareIds"
                      class="rounded border-gray-300 text-purple-600 focus:ring-purple-500 transform scale-110"
                    />
                    <label
                      :for="'software-' + soft.id"
                      class="text-sm text-gray-700 cursor-pointer select-none flex-1"
                    >
                      {{ soft.name }}
                    </label>
                  </div>
                </div>

                <p v-if="errors.softwareIds" class="text-red-600 text-sm mt-2 flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {{ errors.softwareIds }}
                </p>

                <div
                  v-if="userForm.softwareIds.length"
                  class="mt-3 p-3 bg-purple-50 rounded-lg border border-purple-200"
                >
                  <span class="text-purple-700 text-sm font-medium">
                    Selected: {{ userForm.softwareIds.length }} software package(s)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Submit Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="flex-1 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-lg"
            >
              <span v-if="!isSubmitting" class="flex items-center justify-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Create User
              </span>
              <span v-else class="flex items-center justify-center">
                <span class="loading loading-spinner loading-sm mr-2"></span>
                Creating User...
              </span>
            </button>
            <button
              type="button"
              @click="resetForm"
              class="flex-1 px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span class="flex items-center justify-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Reset Form
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- IMPORT EXCEL MODAL -->
    <div
      v-if="showImportModal"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div class="bg-white w-full max-w-md rounded-xl shadow-2xl animate-fadeIn">
        <!-- Header -->
        <div class="px-6 py-4 border-b flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-800">Import Users from Excel File</h2>
          <button @click="closeImportModal" class="text-2xl text-red-500 hover:text-red-600">&times;</button>
        </div>

        <!-- Body -->
        <div class="px-6 py-5 space-y-4">
          <label class="text-sm font-medium text-gray-700"> Select Excel File (.xls, .xlsx) </label>

          <input
            type="file"
            accept=".xls,.xlsx"
            @change="handleFileChange"
            class="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 border-t rounded-b-xl bg-gray-50 flex justify-end gap-3">
          <button
            @click="closeImportModal"
            class="px-4 py-2 bg-red-200 rounded-lg hover:bg-red-300"
          >
            Cancel
          </button>

          <button
            @click="submitImport"
            :disabled="importLoading"
            class="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 flex items-center gap-2"
          >
            <span v-if="!importLoading">Upload &amp; Import</span>

            <span v-else class="flex items-center gap-2">
              <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  class="opacity-20"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-80"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Uploading…
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import api from '@/config/api'
import Swal from 'sweetalert2'

const authStore = useAuthStore()

const userForm = reactive({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  knowledgeLevel: 'Intermediate',
  customerId: '',
  solutionId: '',
  softwareIds: []
})

const customers = ref([])
const solutions = ref([])
const availableSoftware = ref([])
const loadingCustomers = ref(false)
const loadingSolutions = ref(false)
const loadingSoftware = ref(false)
const errors = reactive({})
const showSuccess = ref(false)
const isSubmitting = ref(false)

// ✅ Fetch customers
const fetchCustomers = async () => {
  loadingCustomers.value = true
  try {
    const response = await api().get('/customers?&with=user', {
      // Add headers if needed
    })
    customers.value = response.data.data || response.data
  } catch (err) {
    console.error('Error fetching customers:', err)
  } finally {
    loadingCustomers.value = false
  }
}

// ✅ Fetch solutions with softwares together
const fetchSolutions = async () => {
  loadingSolutions.value = true
  try {
    const response = await api().get('/customer-solution?softwares=true', {
      // Add headers if needed
    })
    solutions.value = response.data || []
  } catch (err) {
    console.error('Error fetching solutions:', err)
  } finally {
    loadingSolutions.value = false
  }
}

// ✅ When a solution is selected
const onSolutionChange = () => {
  userForm.softwareIds = []
  const selected = solutions.value.find((s) => s.id === userForm.solutionId)
  availableSoftware.value = selected?.softwares || []
}

// ✅ Validate & Submit
const validateForm = () => {
  Object.keys(errors).forEach((key) => delete errors[key])
  let valid = true
  if (!userForm.firstName.trim()) (errors.firstName = 'First name required'), (valid = false)
  if (!userForm.lastName.trim()) (errors.lastName = 'Last name required'), (valid = false)
  if (!userForm.email.trim()) (errors.email = 'Email required'), (valid = false)
  if (!userForm.username.trim()) (errors.username = 'Username required'), (valid = false)
  if (!userForm.customerId) (errors.customerId = 'Select a customer'), (valid = false)
  if (!userForm.solutionId) (errors.solutionId = 'Select a solution'), (valid = false)
  if (!userForm.softwareIds.length)
    (errors.softwareIds = 'Select at least one software'), (valid = false)
  return valid
}

const handleSubmit = async () => {
  if (!validateForm()) return
  isSubmitting.value = true
  try {
    const payload = {
      name: `${userForm.firstName} ${userForm.lastName}`,
      username: userForm.username,
      email: userForm.email,
      knowledge_level: userForm.knowledgeLevel,
      customer_id: userForm.customerId, // Add customer_id to payload
      software_id: userForm.softwareIds,
      status: 0
    }
    await api().post('end-users', payload, {
      // Add headers if needed
    })
    showSuccess.value = true
    setTimeout(() => resetForm(), 2000)
  } catch (err) {
    console.error('Error submitting:', err)
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  Object.assign(userForm, {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    knowledgeLevel: 'Intermediate',
    customerId: '',
    solutionId: '',
    softwareIds: []
  })
  availableSoftware.value = []
}

// ===== IMPORT EXCEL =====
const showImportModal = ref(false)
const importFile = ref(null)
const importLoading = ref(false)

const openImportModal = () => {
  importFile.value = null
  showImportModal.value = true
}

const closeImportModal = () => {
  showImportModal.value = false
  importFile.value = null
}

const handleFileChange = (e) => {
  importFile.value = e.target.files[0]
}

const submitImport = async () => {
  if (!importFile.value) {
    Swal.fire('Error', 'Please select an Excel file', 'error')
    return
  }

  importLoading.value = true

  try {
    const formData = new FormData()
    formData.append('file', importFile.value)

    await api().post('/end-users/import', formData)

    Swal.fire('Success', 'Excel imported successfully!', 'success')
    closeImportModal()
  } catch (e) {
    console.error(e)
    Swal.fire('Error', 'Excel import failed', 'error')
  } finally {
    importLoading.value = false
  }
}

onMounted(() => {
  fetchCustomers()
  fetchSolutions()
})
</script>

<style scoped>
/* Custom scrollbar for software list */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
