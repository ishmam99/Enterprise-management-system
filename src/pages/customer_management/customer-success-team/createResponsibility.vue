<template>
  <div class="min-h-screen w-full bg-gray-200 to-white py-10 px-4">
    <div class="mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-emerald-700 mb-2">
          Customer Success Team Responsibilities Management
        </h1>
        <p class="text-gray-600">Assign and manage customer success responsibilities across teams</p>
      </div>
       <!-- Assignment Form -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-5 sm:p-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-6">Assign New Responsibilities</h2>

        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- Department Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              1. Select Department <span class="text-red-500">*</span>
            </label>
            <select
              v-model="form.department_id"
              @change="fetchEmployees"
              class="w-full border rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
              required
            >
              <option value="" disabled>Choose a department...</option>
              <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                {{ dept.name }}
              </option>
            </select>
          </div>

          <!-- Employee Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              2. Select Employee <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <select
                v-model="form.employee_id"
                :disabled="!form.department_id || loadingEmployees"
                class="w-full border rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-gray-50 disabled:cursor-not-allowed transition"
                required
              >
                <option value="" disabled>
                  {{ loadingEmployees ? 'Loading employees...' : 'Choose an employee...' }}
                </option>
                <option v-for="emp in employees" :key="emp.id" :value="emp.user_id">
                  {{ emp.user?.name || 'Unnamed Employee' }}
                </option>
              </select>
              <div v-if="loadingEmployees" class="absolute right-3 top-3">
                <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-600"></div>
              </div>
            </div>
          </div>

          <!-- Role Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              3. Assign Role <span class="text-red-500">*</span>
            </label>
            <select
              v-model="form.role"
              class="w-full border rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
              required
            >
              <option value="" disabled>Choose a role...</option>
              <option v-for="role in roleOptions" :key="role" :value="role">
                {{ role }}
              </option>
            </select>
          </div>

          <!-- Error Message -->
          <transition name="fade">
            <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {{ errorMessage }}
            </div>
          </transition>

          <!-- Form Actions -->
          <div class="flex flex-col sm:flex-row justify-end gap-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              @click="resetForm"
              class="px-6 py-2.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition font-medium"
            >
              Reset Form
            </button>

            <button
              type="submit"
              :disabled="loading || !isFormValid"
              class="px-6 py-2.5 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed transition font-medium flex items-center justify-center gap-2"
            >
              <svg v-if="loading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span>{{ loading ? 'Assigning...' : 'Assign Role' }}</span>
            </button>
          </div>
        </form>
      </div>
      <!-- Role Tabs -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
        <div class="border-b border-gray-200">
          <nav class="flex w-full justify-between gap-3 p-2" aria-label="Role tabs">
            <button
               class="px-2 py-1 text-sm font-medium bg-gray-200 rounded transition-colors relative"
              :class="[
                selectedRoleTab === 'all'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
              @click="selectedRoleTab = 'all'"

            >
             All              <span
                v-if="getRoleCount('all') > 0"
                class="ml-2 px-2 py-0.5 text-xs rounded-full"
                :class="selectedRoleTab === role ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'"
              >
                {{ getRoleCount('all') }}
              </span>
            </button>
            <button
              v-for="role in roleOptions"
              :key="role"
              @click="selectedRoleTab = role"
              class="px-2 py-1 text-sm font-medium bg-gray-200 rounded transition-colors relative"
              :class="[
                selectedRoleTab === role
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              {{ role }}
              <span
                v-if="getRoleCount(role) > 0"
                class="ml-2 px-2 py-0.5 text-xs rounded-full"
                :class="selectedRoleTab === role ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'"
              >
                {{ getRoleCount(role) }}
              </span>
            </button>
          </nav>
        </div>

        <!-- Assigned Persons Table -->
        <div class="p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-between">
            <span> {{selectedRoleTab == 'all' ? 'All assigned responsible persons list' : 'Assigned '+ selectedRoleTab+'s' }}</span>
            <span class="text-sm font-normal text-gray-500">
              Total: {{ filteredResponsiblePersons.length }}
            </span>
          </h2>

          <div v-if="loadingResponsible" class="flex justify-center py-12">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          </div>

          <div v-else-if="filteredResponsiblePersons.length === 0" class="text-center py-12 bg-gray-50 rounded-lg">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No assignments yet</h3>
            <p class="mt-1 text-sm text-gray-500">
              No {{ selectedRoleTab }}s have been assigned. Use the form below to assign roles.
            </p>
          </div>

          <div v-else class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned Date
                  </th>
                  <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="person in paginatedPersons" :key="person.id" class="hover:bg-gray-50 transition">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                          <span class="text-emerald-600 font-medium text-sm">
                            {{ getUserInitials(person.user) }}
                          </span>
                        </div>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ person.user?.name || 'Unknown' }}
                        </div>
                        <div class="text-sm text-gray-500">
                          {{ person.user?.email || 'No email' }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ person.department?.name || 'N/A' }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                      {{ person.role }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(person.created_at) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      @click="confirmUnassign(person)"
                      class="text-red-600 hover:text-red-900 transition mr-3"
                      title="Unassign role"
                    >
                      <svg class="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Pagination -->
            <div v-if="filteredResponsiblePersons.length > itemsPerPage" class="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-200">
              <div class="flex-1 flex justify-between sm:hidden">
                <button
                  @click="currentPage--"
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  @click="currentPage++"
                  :disabled="currentPage === totalPages"
                  class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm text-gray-700">
                    Showing
                    <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
                    to
                    <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredResponsiblePersons.length) }}</span>
                    of
                    <span class="font-medium">{{ filteredResponsiblePersons.length }}</span>
                    results
                  </p>
                </div>
                <div>
                  <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      @click="currentPage--"
                      :disabled="currentPage === 1"
                      class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span class="sr-only">Previous</span>
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>

                    <button
                      v-for="page in displayedPages"
                      :key="page"
                      @click="currentPage = page"
                      :class="[
                        page === currentPage
                          ? 'z-10 bg-emerald-50 border-emerald-500 text-emerald-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                      ]"
                    >
                      {{ page }}
                    </button>

                    <button
                      @click="currentPage++"
                      :disabled="currentPage === totalPages"
                      class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span class="sr-only">Next</span>
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      <!-- Success Message -->
      <transition name="slide-up">
        <div
          v-if="successMessage"
          class="fixed bottom-4 right-4 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          {{ successMessage }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import api from '@/config/api'

// ==================== State ====================
const loading = ref(false)
const loadingEmployees = ref(false)
const loadingResponsible = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Data
const departments = ref([])
const employees = ref([])
const responsiblePersons = ref([])

// Role options
const roleOptions = [
  'Customer Success Manager',
  'Customer Success Sales Executive',
  'Customer Success Tech Support',
  'Customer Success Trainer',
  'Customer Success CRM Executive'
]

// Form state
const form = ref({
  department_id: '',
  employee_id: '',
  role: ''
})

// Tab and pagination state
const selectedRoleTab = ref(roleOptions[0])
const currentPage = ref(1)
const itemsPerPage = ref(5)

// ==================== Computed ====================
const isFormValid = computed(() => {
  return form.value.department_id && form.value.employee_id && form.value.role
})

const filteredResponsiblePersons = computed(() => {
  if (!selectedRoleTab.value || selectedRoleTab.value == 'all') return responsiblePersons.value

  return responsiblePersons.value.filter(person => person.role === selectedRoleTab.value)
})

const paginatedPersons = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredResponsiblePersons.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredResponsiblePersons.value.length / itemsPerPage.value)
})

const displayedPages = computed(() => {
  const delta = 2
  const range = []
  const rangeWithDots = []
  let l

  for (let i = 1; i <= totalPages.value; i++) {
    if (i === 1 || i === totalPages.value || (i >= currentPage.value - delta && i <= currentPage.value + delta)) {
      range.push(i)
    }
  }

  range.forEach(i => {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (i - l !== 1) {
        rangeWithDots.push('...')
      }
    }
    rangeWithDots.push(i)
    l = i
  })

  return rangeWithDots
})

// ==================== Methods ====================
const getUserInitials = (user) => {
  if (!user || !user.name) return '?'
  return user.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getRoleCount = (role) => {
  return responsiblePersons.value.filter(person => person.role === role).length
}

const fetchDepartments = async () => {
  try {
    const response = await api().get('department')
    departments.value = response.data.data || response.data
  } catch (error) {
    console.error('Failed to fetch departments:', error)
    errorMessage.value = 'Failed to load departments. Please refresh the page.'
  }
}

const fetchEmployees = async () => {
  if (!form.value.department_id) return

  loadingEmployees.value = true
  employees.value = []
  form.value.employee_id = ''
  errorMessage.value = ''

  try {
    const response = await api().get(`employees?department_id=${form.value.department_id}&with=user`)
    employees.value = response.data.data || response.data

    if (employees.value.length === 0) {
      errorMessage.value = 'No employees found in this department.'
    }
  } catch (error) {
    console.error('Failed to fetch employees:', error)
    errorMessage.value = 'Failed to load employees. Please try again.'
  } finally {
    loadingEmployees.value = false
  }
}

const fetchResponsiblePersons = async () => {
  loadingResponsible.value = true
  try {
    const { data } = await api().get('success-team-roles?with=user.employee.department')
    responsiblePersons.value = data.data || data
  } catch (error) {
    console.error('Failed to fetch responsible persons:', error)
    errorMessage.value = 'Failed to load assignments. Please refresh the page.'
  } finally {
    loadingResponsible.value = false
  }
}

const submitForm = async () => {
  if (!isFormValid.value) return

  loading.value = true
  errorMessage.value = ''

  try {
    await api().post('success-team-roles', {
      user_id: form.value.employee_id,
      role: form.value.role
    })

    successMessage.value = `✅ ${form.value.role} assigned successfully!`

    // Refresh the list
    await fetchResponsiblePersons()

    // Reset form
    resetForm()

    // Auto-hide success message
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (error) {
    console.error('Assignment error:', error)
    errorMessage.value = error.response?.data?.message || 'Failed to assign role. Please try again.'
  } finally {
    loading.value = false
  }
}

const confirmUnassign = (person) => {
  if (confirm(`Are you sure you want to unassign the ${person.role} role from ${person.user?.name}?`)) {
    unassignRole(person.id)
  }
}

const unassignRole = async (id) => {
  try {
    await api().delete(`success-team-roles/${id}`)
    await fetchResponsiblePersons()
    successMessage.value = 'Role unassigned successfully!'

    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (error) {
    console.error('Failed to unassign role:', error)
    errorMessage.value = 'Failed to unassign role. Please try again.'
  }
}

const resetForm = () => {
  form.value = {
    department_id: '',
    employee_id: '',
    role: ''
  }
  employees.value = []
  errorMessage.value = ''
}

// ==================== Watchers ====================
watch(selectedRoleTab, () => {
  currentPage.value = 1
})

// ==================== Lifecycle ====================
onMounted(async () => {
  await Promise.all([
    fetchResponsiblePersons(),
    fetchDepartments()
  ])
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

/* Custom scrollbar for tabs */
.overflow-x-auto {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f1f5f9;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: #cbd5e0;
  border-radius: 20px;
}

/* Table row hover effect */
tbody tr {
  transition: background-color 0.2s ease;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .mx-20 {
    margin-left: 1rem;
    margin-right: 1rem;
  }

  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
}
</style>
