<template>
  <div class="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
    <!-- Header -->
    <div class=" mx-auto mb-10 flex justify-between items-start">
      <div>
        <h1 class="text-4xl font-bold text-indigo-900 mb-3">Positions Management</h1>
        <p class="text-lg text-indigo-700">
          View and manage all positions in the organizational structure
        </p>
      </div>
      <router-link to="/hr_management/recruitment/organization/create-position" class="btn-primary shadow-lg flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        New Position
      </router-link>
    </div>

    <!-- Filters & Search -->
    <div class=" mx-auto mb-8 bg-white rounded-2xl shadow-md p-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label class="form-label">Search Position</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="e.g. HR Manager, Accountant..."
            class="form-input"
          />
        </div>
        <div>
          <label class="form-label">Department</label>
          <select v-model="filterDepartment" class="form-input" :disabled="loadingDepartments">
            <option value="">{{ loadingDepartments ? 'Loading...' : 'All Departments' }}</option>
            <option v-for="dept in departments" :key="dept.id" :value="dept.id">
              {{ dept.name }}
            </option>
          </select>
        </div>
        <div>
          <label class="form-label">Status</label>
          <select v-model="filterStatus" class="form-input">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="vacant">Vacant</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Positions Table -->
    <div class=" mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
            <tr>
              <th class="px-6 py-4 text-left text-sm font-semibold">Position Title</th>
              <th class="px-6 py-4 text-left text-sm font-semibold">Department</th>
              <th class="px-6 py-4 text-left text-sm font-semibold">Level</th>
              <th class="px-6 py-4 text-center text-sm font-semibold">Employment Type</th>
              <th class="px-6 py-4 text-center text-sm font-semibold">Status</th>
              <th class="px-6 py-4 text-center text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <!-- Loading State -->
            <tr v-if="loading">
              <td colspan="6" class="px-6 py-12 text-center">
                <div class="flex flex-col items-center justify-center">
                  <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600 mb-4"></div>
                  <p class="text-gray-600">Loading positions...</p>
                </div>
              </td>
            </tr>

            <!-- Positions List -->
            <tr v-else v-for="position in filteredPositions" :key="position.id" class="hover:bg-indigo-50 transition">
              <td class="px-6 py-5">
                <div class="font-medium text-gray-900">{{ position.title }}</div>
              </td>
              <td class="px-6 py-5 text-gray-600">{{ position.department?.name || 'N/A' }}</td>
              <td class="px-6 py-5 text-gray-600">{{ position.level || 'N/A' }}</td>
              <td class="px-6 py-5 text-center text-gray-600">{{ position.employment_type || 'N/A' }}</td>
              <td class="px-6 py-5 text-center">
                <span
                  class="px-3 py-1 text-xs font-medium rounded-full"
                  :class="statusClass(position.status)"
                >
                  {{ statusText(position.status) }}
                </span>
              </td>
              <td class="px-6 py-5 text-center">
                <div class="flex justify-center gap-3">
                  <button @click="openViewModal(position)" class="text-indigo-600 hover:text-indigo-800" title="View">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button @click="openEditModal(position)" class="text-blue-600 hover:text-blue-800" title="Edit">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button @click="confirmDelete(position)" class="text-red-600 hover:text-red-800" title="Delete">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <tr v-if="!loading && filteredPositions.length === 0">
          <td colspan="6" class="px-6 py-12 text-center">
            <p class="text-gray-500 text-lg">No positions found matching your filters.</p>
          </td>
        </tr>
      </div>
    </div>

    <!-- View Modal -->
    <div v-if="showViewModal" class="fixed inset-0 z-50 overflow-y-auto" @click.self="closeViewModal">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div class="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75" @click="closeViewModal"></div>

        <!-- Modal panel -->
        <div class="inline-block w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl">
          <!-- Modal Header -->
          <div class="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-6 text-white">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3 class="text-3xl font-bold mb-2">{{ selectedPosition?.title }}</h3>
                <div class="flex flex-wrap gap-3 mt-3">
                  <span class="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {{ selectedPosition?.department?.name || 'N/A' }}
                  </span>
                  <span class="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ selectedPosition?.level || 'N/A' }}
                  </span>
                  <span class="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M9 9h.01M15 9h.01M12 3v1m0 16v1m8.485-1.515l-.687-.687m-15.596 0l.687.687M5 12H4m16 0h-1" />
                    </svg>
                    {{ selectedPosition?.employment_type || 'N/A' }}
                  </span>
                  <span class="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                    :class="statusClass(selectedPosition?.status)">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ statusText(selectedPosition?.status) }}
                  </span>
                </div>
              </div>
              <button @click="closeViewModal" class="ml-4 text-white hover:text-gray-200 transition-colors">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Modal Body -->
          <div class="px-8 py-6 max-h-[70vh] overflow-y-auto">
            <!-- Description -->
            <div class="mb-8">
              <h4 class="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div class="w-1 h-8 bg-indigo-600 rounded"></div>
                Description
              </h4>
              <p class="text-gray-700 text-lg leading-relaxed">{{ selectedPosition?.description || 'No description available' }}</p>
            </div>

            <!-- Details Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <h5 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Department
                </h5>
                <p class="text-gray-700 text-lg">{{ selectedPosition?.department?.name || 'N/A' }}</p>
              </div>
              <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <h5 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Level
                </h5>
                <p class="text-gray-700 text-lg">{{ selectedPosition?.level || 'N/A' }}</p>
              </div>
              <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <h5 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M9 9h.01M15 9h.01M12 3v1m0 16v1m8.485-1.515l-.687-.687m-15.596 0l.687.687M5 12H4m16 0h-1" />
                  </svg>
                  Employment Type
                </h5>
                <p class="text-gray-700 text-lg">{{ selectedPosition?.employment_type || 'N/A' }}</p>
              </div>
              <div class="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-200">
                <h5 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Status
                </h5>
                <span
                  class="px-3 py-1 text-sm font-medium rounded-full inline-block"
                  :class="statusClass(selectedPosition?.status)"
                >
                  {{ statusText(selectedPosition?.status) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="bg-gray-50 px-8 py-6 border-t border-gray-200 flex justify-end gap-4">
            <button @click="closeViewModal" class="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
              Close
            </button>
            <button @click="openEditModal(selectedPosition)" class="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
              Edit Position
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 z-50 overflow-y-auto" @click.self="closeEditModal">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div class="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75" @click="closeEditModal"></div>

        <!-- Modal panel -->
        <div class="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl">
          <!-- Modal Header -->
          <div class="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-5 text-white">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-semibold">Edit Position</h2>
              <button @click="closeEditModal" class="text-white hover:text-gray-200 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Edit Form -->
          <form @submit.prevent="updatePosition" class="p-8 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="form-label">
                  <span class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Position Title <span class="text-red-500">*</span>
                  </span>
                </label>
                <input
                  v-model="editForm.title"
                  type="text"
                  class="form-input"
                  :class="{ 'border-red-500': editErrors.title }"
                />
                <p v-if="editErrors.title" class="form-error">{{ editErrors.title }}</p>
              </div>

              <div>
                <label class="form-label">
                  <span class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Department <span class="text-red-500">*</span>
                  </span>
                </label>
                <select v-model="editForm.department" class="form-input" :class="{ 'border-red-500': editErrors.department }" :disabled="loadingDepartments">
                  <option value="" disabled>{{ loadingDepartments ? 'Loading...' : 'Select Department' }}</option>
                  <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                    {{ dept.name }}
                  </option>
                </select>
                <p v-if="editErrors.department" class="form-error">{{ editErrors.department }}</p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="form-label">
                  <span class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Level <span class="text-red-500">*</span>
                  </span>
                </label>
                <select v-model="editForm.level" class="form-input" :class="{ 'border-red-500': editErrors.level }">
                  <option value="" disabled>Select Level</option>
                  <option>Junior</option>
                  <option>Mid-level</option>
                  <option>Senior</option>
                  <option>Lead</option>
                  <option>Principal</option>
                  <option>Manager</option>
                  <option>Director</option>
                </select>
                <p v-if="editErrors.level" class="form-error">{{ editErrors.level }}</p>
              </div>

              <div>
                <label class="form-label">
                  <span class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M9 9h.01M15 9h.01M12 3v1m0 16v1m8.485-1.515l-.687-.687m-15.596 0l.687.687M5 12H4m16 0h-1" />
                    </svg>
                    Employment Type <span class="text-red-500">*</span>
                  </span>
                </label>
                <select v-model="editForm.employment_type" class="form-input" :class="{ 'border-red-500': editErrors.employment_type }">
                  <option value="" disabled>Select Type</option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Freelance</option>
                  <option>Internship</option>
                </select>
                <p v-if="editErrors.employment_type" class="form-error">{{ editErrors.employment_type }}</p>
              </div>
            </div>

            <div>
              <label class="form-label">
                <span class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Description <span class="text-red-500">*</span>
                </span>
              </label>
              <textarea
                v-model="editForm.description"
                rows="6"
                class="form-input resize-none"
                :class="{ 'border-red-500': editErrors.description }"
              />
              <p v-if="editErrors.description" class="form-error">{{ editErrors.description }}</p>
            </div>

            <div>
              <label class="form-label mb-4">
                <span class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Position Status
                </span>
              </label>
              <div class="flex items-center gap-10">
                <label class="flex items-center gap-3 cursor-pointer">
                  <input type="radio" :value="1" v-model="editForm.status" class="w-5 h-5 text-indigo-600 focus:ring-indigo-500" />
                  <span class="text-lg font-medium text-gray-700">Active</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer">
                  <input type="radio" :value="0" v-model="editForm.status" class="w-5 h-5 text-indigo-600 focus:ring-indigo-500" />
                  <span class="text-lg font-medium text-gray-700">Inactive</span>
                </label>
              </div>
            </div>

            <div class="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <button type="button" @click="closeEditModal" class="btn-secondary">
                Cancel
              </button>
              <button type="submit" class="btn-primary shadow-lg" :disabled="editLoading">
                {{ editLoading ? 'Updating...' : 'Update Position' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <transition name="fade">
      <div
        v-if="toast.show"
        class="fixed bottom-6 right-6 px-6 py-4 rounded-xl shadow-2xl text-white text-base font-medium z-50 flex items-center gap-3 min-w-[300px]"
        :class="toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'"
      >
        <svg v-if="toast.type === 'success'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <span>{{ toast.message }}</span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import api from '@/config/api'
import Swal from 'sweetalert2'

const positions = ref([])
const departments = ref([])
const loading = ref(false)
const loadingDepartments = ref(false)

const searchQuery = ref('')
const filterDepartment = ref('')
const filterStatus = ref('')

// View Modal
const showViewModal = ref(false)
const selectedPosition = ref(null)

// Edit Modal
const showEditModal = ref(false)
const editForm = reactive({
  id: null,
  title: '',
  department: '',
  level: '',
  employment_type: '',
  description: '',
  status: 1,
})
const editErrors = reactive({})
const editLoading = ref(false)

// Toast
const toast = reactive({
  show: false,
  message: '',
  type: 'success'
})

const showToast = (message, type = 'success') => {
  toast.show = true
  toast.message = message
  toast.type = type
  setTimeout(() => (toast.show = false), 3000)
}

// Fetch positions from API
const fetchPositions = async () => {
  loading.value = true
  try {
    const response = await api().get('positions', {
      params: {
        per_page: 100, // Fetch all positions, adjust as needed
        with: 'department' // Load department relationship
      }
    })

    // Handle different response structures
    const positionData = response.data?.data || response.data || []

    // Transform positions to include department relationship
    positions.value = positionData.map(pos => ({
      ...pos,
      status: pos.status == 1 || pos.status === "1" ? 'active' : 'inactive',
      // Ensure department_id is properly set
      department_id: pos.department_id || pos.department?.id
    }))
  } catch (error) {
    console.error('Error fetching positions:', error)
    positions.value = []
  } finally {
    loading.value = false
  }
}

// Fetch departments from API
const fetchDepartments = async () => {
  loadingDepartments.value = true
  try {
    const response = await api().get('active-department')

    // Handle different response structures
    const departmentData = response.data?.data || response.data || []

    // Filter only active departments (status === "1" or 1)
    departments.value = departmentData.filter(dept => dept.status == 1 || dept.status === "1")
  } catch (error) {
    console.error('Error fetching departments:', error)
    departments.value = []
  } finally {
    loadingDepartments.value = false
  }
}

// Fetch data on component mount
onMounted(() => {
  fetchPositions()
  fetchDepartments()
})

const filteredPositions = computed(() => {
  if (!positions.value.length) return []

  return positions.value.filter(pos => {
    // Search filter
    const matchesSearch = !searchQuery.value ||
                          pos.title?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          pos.department?.name?.toLowerCase().includes(searchQuery.value.toLowerCase())

    // Department filter - convert both to strings for reliable comparison
    // Handle null/undefined department_id
    const posDeptId = pos.department_id || pos.department?.id
    const matchesDept = !filterDepartment.value ||
                        String(posDeptId) === String(filterDepartment.value)

    // Status filter
    const matchesStatus = !filterStatus.value ||
                         pos.status === filterStatus.value

    return matchesSearch && matchesDept && matchesStatus
  })
})

const statusClass = (status) => {
  if (status === 'active' || status == 1 || status === "1") return 'bg-green-100 text-green-800'
  return 'bg-gray-100 text-gray-800'
}

const statusText = (status) => {
  if (status === 'active' || status == 1 || status === "1") return 'Active'
  return 'Inactive'
}

// View Modal Functions
const openViewModal = (position) => {
  selectedPosition.value = position
  showViewModal.value = true
}

const closeViewModal = () => {
  showViewModal.value = false
  selectedPosition.value = null
}

// Edit Modal Functions
const openEditModal = (position) => {
  selectedPosition.value = position
  editForm.id = position.id
  editForm.title = position.title || ''
  editForm.department = position.department_id || position.department?.id || ''
  editForm.level = position.level || ''
  editForm.employment_type = position.employment_type || ''
  editForm.description = position.description || ''
  editForm.status = position.status == 1 || position.status === "1" || position.status === 'active' ? 1 : 0
  showEditModal.value = true
  showViewModal.value = false
}

const closeEditModal = () => {
  showEditModal.value = false
  selectedPosition.value = null
  Object.keys(editErrors).forEach(key => delete editErrors[key])
  editForm.id = null
  editForm.title = ''
  editForm.department = ''
  editForm.level = ''
  editForm.employment_type = ''
  editForm.description = ''
  editForm.status = 1
}

const updatePosition = async () => {
  // Clear previous errors
  Object.keys(editErrors).forEach(key => delete editErrors[key])

  // Validation
  if (!editForm.title.trim()) editErrors.title = 'Position title is required'
  if (!editForm.department) editErrors.department = 'Please select a department'
  if (!editForm.level) editErrors.level = 'Level is required'
  if (!editForm.employment_type) editErrors.employment_type = 'Employment type is required'
  if (!editForm.description.trim()) editErrors.description = 'Description is required'

  if (Object.keys(editErrors).length > 0) return

  // Prepare API payload
  const payload = {
    department_id: editForm.department,
    title: editForm.title,
    level: editForm.level,
    employment_type: editForm.employment_type,
    description: editForm.description,
    status: editForm.status
  }

  editLoading.value = true
  try {
    // Prepare API payload
    const updatePayload = {
      department_id: Number(editForm.department) || editForm.department,
      title: editForm.title.trim(),
      level: editForm.level,
      employment_type: editForm.employment_type,
      description: editForm.description.trim(),
      status: Number(editForm.status) || editForm.status
    }

    console.log('Updating position:', editForm.id, updatePayload)

    // Use POST with _method: 'PUT' (Laravel method spoofing pattern used in this codebase)
    const response = await api().post(`positions/${editForm.id}`, {
      ...updatePayload,
      _method: 'PUT'
    })

    console.log('Update response:', response.data)

    // Success - refresh positions list to get updated data from server
    showToast('Position updated successfully!', 'success')

    // Refresh positions list to get latest data from server
    await fetchPositions()

    // Close modal
    closeEditModal()
  } catch (error) {
    console.error('Error updating position:', error)
    console.error('Error response:', error.response?.data)
    console.error('Error status:', error.response?.status)
    const errorMessage = error.response?.data?.message ||
                         error.response?.data?.error ||
                         error.message ||
                         'Failed to update position. Please try again.'
    showToast(errorMessage, 'error')
  } finally {
    editLoading.value = false
  }
}

// Delete Functions
const confirmDelete = async (position) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: `Do you want to delete "${position.title}"? This action cannot be undone.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  })

  if (result.isConfirmed) {
    await deletePosition(position.id)
  }
}

const deletePosition = async (positionId) => {
  try {
    await api().delete(`positions/${positionId}`)

    // Success
    showToast('Position deleted successfully!', 'success')

    // Refresh positions list
    await fetchPositions()
  } catch (error) {
    console.error('Error deleting position:', error)
    const errorMessage = error.response?.data?.message || 'Failed to delete position. Please try again.'
    showToast(errorMessage, 'error')
  }
}
</script>

<style scoped>
.form-label {
  @apply block mb-2 text-sm font-semibold text-gray-700;
}

.form-input {
  @apply w-full px-4 py-3 border border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all;
}

.btn-primary {
  @apply bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transform hover:scale-105 transition-all shadow-md flex items-center;
}

.btn-primary:disabled {
  @apply opacity-50 cursor-not-allowed;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
