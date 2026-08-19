<template>
  <div class="px-2 bg-white py-5 w-11/12 mx-auto p-4">
    <!-- Header Section -->
    <div class="bg-gradient-to-r from-teal-600 to-teal-700 rounded-t-2xl text-white px-6 py-6 mb-6">
      <h1 class="text-2xl md:text-3xl font-bold mb-2">Approved Trainer Requests</h1>
      <p class="text-teal-100">Review and approve approved trainer registrations</p>
    </div>

    <!-- Main Content -->
    <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-16">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p class="mt-4 text-gray-600">Loading applications...</p>
        </div>
      </div>

      <!-- Applications Table -->
      <div v-else>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-teal-50">
              <tr>
                <th class="px-6 py-4 text-left font-semibold text-gray-700">ID</th>
                <th class="px-6 py-4 text-left font-semibold text-gray-700">Applicant</th>
                <th class="px-6 py-4 text-left font-semibold text-gray-700">Contact</th>
                <th class="px-6 py-4 text-left font-semibold text-gray-700">Expertise</th>
                <th class="px-6 py-4 text-left font-semibold text-gray-700">Experience</th>
                <th class="px-6 py-4 text-left font-semibold text-gray-700">Applied Date</th>
                <th class="px-6 py-4 text-left font-semibold text-gray-700">Status</th>
                <th class="px-6 py-4 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr 
                v-for="application in paginatedApplications" 
                :key="application.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <!-- ID -->
                <td class="px-6 py-4">
                  <span class="font-mono text-gray-600">#{{ application.id }}</span>
                </td>

                <!-- Applicant Info -->
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="bg-teal-100 w-10 h-10 rounded-full flex items-center justify-center">
                      <svg class="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p class="font-medium text-gray-900">{{ application.name }}</p>
                      <div class="flex items-center gap-2 mt-1">
                        <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd" />
                        </svg>
                        <span class="text-xs text-gray-500">{{ application.industry?.name || 'N/A' }}</span>
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Contact Info -->
                <td class="px-6 py-4">
                  <div class="space-y-1">
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <span class="text-sm text-gray-600">{{ application.email }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span class="text-sm text-gray-600">{{ application.phone }}</span>
                    </div>
                  </div>
                </td>

                <!-- Expertise -->
                <td class="px-6 py-4">
                  <div class="space-y-2">
                    <div class="flex flex-col gap-1">
                      <span class="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {{ application.solution?.name || 'N/A' }}
                      </span>
                      <span class="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {{ application.software?.name || 'N/A' }}
                      </span>
                    </div>
                  </div>
                </td>

                <!-- Experience -->
                <td class="px-6 py-4">
                  <div class="space-y-2">
                    <div class="flex items-center gap-2">
                      <span class="text-sm font-medium text-gray-700">{{ application.experience_year || 0 }} years</span>
                      <div class="flex gap-1">
                        <div 
                          v-for="n in 5" 
                          :key="n"
                          class="w-2 h-2 rounded-full"
                          :class="{
                            'bg-green-500': n <= getExperienceStars(application.experience_year),
                            'bg-gray-200': n > getExperienceStars(application.experience_year)
                          }"
                        ></div>
                      </div>
                    </div>
                    <span class="text-xs text-gray-500">
                      {{ getExperienceLevel(application.experience_year) }}
                    </span>
                  </div>
                </td>

                <!-- Applied Date -->
                <td class="px-6 py-4">
                  <span class="text-sm text-gray-600">{{ formatDate(application.created_at) }}</span>
                </td>

                <!-- Status -->
                <td class="px-6 py-4">
                  <span 
                    class="px-3 py-1 rounded-full text-xs font-medium"
                    :class="{
                      'bg-yellow-100 text-yellow-800': application.status === '0',
                      'bg-green-100 text-green-800': application.status === '1',
                      'bg-red-100 text-red-800': application.status === '2'
                    }"
                  >
                    {{ getStatusText(application.status) }}
                  </span>
                </td>

                <!-- Actions -->
                <td class="px-6 py-4">
                  <div class="flex gap-2">
                    <!-- View Details -->
                    <button
                      @click="viewApplicationDetails(application)"
                      class="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                      title="View Details"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>

                    <!-- Approve -->
                    <button
                      v-if="application.status === '0'"
                      @click="updateApplicationStatus(application.id, '1')"
                      :disabled="actionLoading"
                      class="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors disabled:opacity-50"
                      title="Approve"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </button>

                    <!-- Reject -->
                    <button
                      v-if="application.status === '0'"
                      @click="updateApplicationStatus(application.id, '2')"
                      :disabled="actionLoading"
                      class="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                      title="Reject"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    <!-- Delete -->
                    <button
                      @click="deleteApplication(application.id)"
                      :disabled="actionLoading"
                      class="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="filteredApplications.length === 0" class="text-center py-16">
          <div class="mb-4">
            <svg class="w-16 h-16 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No approved applications found</h3>
          <p class="text-gray-500">There are no approved trainer requests at the moment.</p>
        </div>

        <!-- Pagination -->
        <div v-if="filteredApplications.length > 0" class="flex flex-col sm:flex-row justify-between items-center px-6 py-4 border-t border-gray-100 gap-4">
          <div class="text-sm text-gray-600">
            Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to 
            {{ Math.min(currentPage * itemsPerPage, filteredApplications.length) }} 
            of {{ filteredApplications.length }} applications
          </div>
          <div class="flex gap-2">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span class="px-4 py-2 rounded-lg bg-teal-50 text-teal-600 font-medium">
              Page {{ currentPage }}
            </span>
            <button
              @click="currentPage++"
              :disabled="currentPage * itemsPerPage >= filteredApplications.length"
              class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Application Details Modal -->
    <div v-if="selectedApplication" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-10 mx-auto p-4 max-w-4xl">
        <div class="bg-white rounded-2xl shadow-xl">
          <!-- Modal Header -->
          <div class="flex justify-between items-center px-6 py-4 border-b">
            <h3 class="text-xl font-bold text-gray-900">Application Details</h3>
            <button @click="selectedApplication = null" class="text-gray-400 hover:text-gray-500">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Modal Content -->
          <div class="p-6 space-y-6">
            <!-- Personal Information -->
            <div class="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg>
                Personal Information
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium text-gray-600">Full Name</label>
                  <p class="text-gray-900 font-medium mt-1">{{ selectedApplication.name }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-600">Email</label>
                  <p class="text-gray-900 mt-1">{{ selectedApplication.email }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-600">Phone</label>
                  <p class="text-gray-900 mt-1">{{ selectedApplication.phone }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-600">Address</label>
                  <p class="text-gray-900 mt-1">{{ selectedApplication.address }}</p>
                </div>
              </div>
            </div>

            <!-- Expertise Information -->
            <div class="bg-purple-50 rounded-xl p-6 border border-purple-100">
              <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                Area of Expertise
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="text-sm font-medium text-gray-600">Industry</label>
                  <p class="text-gray-900 font-medium mt-1">{{ selectedApplication.industry?.name || 'N/A' }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-600">Solution</label>
                  <p class="text-gray-900 mt-1">{{ selectedApplication.solution?.name || 'N/A' }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-600">Software</label>
                  <p class="text-gray-900 mt-1">{{ selectedApplication.software?.name || 'N/A' }}</p>
                </div>
              </div>
            </div>

            <!-- Experience Information -->
            <div class="bg-green-50 rounded-xl p-6 border border-green-100">
              <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
                </svg>
                Professional Experience
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium text-gray-600">Years of Experience</label>
                  <div class="flex items-center gap-3 mt-1">
                    <span class="text-lg font-bold text-gray-900">{{ selectedApplication.experience_year || 0 }} years</span>
                    <div class="flex gap-1">
                      <div 
                        v-for="n in 5" 
                        :key="n"
                        class="w-3 h-3 rounded-full"
                        :class="{
                          'bg-green-500': n <= getExperienceStars(selectedApplication.experience_year),
                          'bg-gray-200': n > getExperienceStars(selectedApplication.experience_year)
                        }"
                      ></div>
                    </div>
                  </div>
                  <p class="text-sm text-gray-500 mt-1">
                    Level: {{ getExperienceLevel(selectedApplication.experience_year) }}
                  </p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-600">Applied Date</label>
                  <p class="text-gray-900 mt-1">{{ formatDate(selectedApplication.created_at) }}</p>
                </div>
              </div>
            </div>

            <!-- Status -->
            <div class="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
              <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
                Application Status
              </h4>
              <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <span 
                  class="px-4 py-2 rounded-full text-sm font-medium inline-flex items-center gap-2 w-fit"
                  :class="{
                    'bg-yellow-100 text-yellow-800': selectedApplication.status === '0',
                    'bg-green-100 text-green-800': selectedApplication.status === '1',
                    'bg-red-100 text-red-800': selectedApplication.status === '2'
                  }"
                >
                  <svg v-if="selectedApplication.status === '0'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                  </svg>
                  <svg v-if="selectedApplication.status === '1'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <svg v-if="selectedApplication.status === '2'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                  {{ getStatusText(selectedApplication.status) }}
                </span>
                <div class="text-sm text-gray-600">
                  Applied on: {{ formatDate(selectedApplication.created_at) }}
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Actions -->
          <div class="flex justify-between items-center px-6 py-4 border-t">
            <button 
              @click="selectedApplication = null" 
              class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Close
            </button>
            <div class="flex gap-2" v-if="selectedApplication.status === '0'">
              <button 
                @click="updateApplicationStatus(selectedApplication.id, '2')"
                :disabled="actionLoading"
                class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Reject
              </button>
              <button 
                @click="updateApplicationStatus(selectedApplication.id, '1')"
                :disabled="actionLoading"
                class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from '@/components/ui/toast/use-toast'
import { ref, onMounted, computed } from 'vue'
import Swal from 'sweetalert2'
import api from '@/config/api'

const { toast } = useToast()

// Data
const applications = ref([])
const selectedApplication = ref(null)
const loading = ref(false)
const actionLoading = ref(false)
const currentPage = ref(1)
const itemsPerPage = 10

// Helper functions
const getExperienceLevel = (years) => {
  const yearsNum = parseInt(years) || 0
  if (yearsNum < 1) return 'Beginner'
  if (yearsNum <= 3) return 'Junior'
  if (yearsNum <= 7) return 'Intermediate'
  if (yearsNum <= 15) return 'Senior'
  return 'Expert'
}

const getExperienceStars = (years) => {
  const yearsNum = parseInt(years) || 0
  if (yearsNum < 1) return 1
  if (yearsNum <= 2) return 2
  if (yearsNum <= 4) return 3
  if (yearsNum <= 8) return 4
  return 5
}

const getStatusText = (status) => {
  switch(status) {
    case '0': return 'Pending'
    case '1': return 'Approved'
    case '2': return 'Rejected'
    default: return 'Unknown'
  }
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

// Fetch applications
const fetchApplications = async () => {
  loading.value = true
  try {
    const response = await api().get('trainer-request-form')
    applications.value = response.data?.data.filter(e => e.status == 1) 
  } catch (error) {
    console.error('Error fetching applications:', error)
    toast({
      title: 'Error',
      description: 'Failed to load applications',
      variant: 'destructive'
    })
  } finally {
    loading.value = false
  }
}

// Filter applications (show only pending applications)
const filteredApplications = computed(() => {
  return applications.value.filter(app => app.status === '0')
})

// Paginated applications
const paginatedApplications = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredApplications.value.slice(start, end)
})

// View application details
const viewApplicationDetails = (application) => {
  selectedApplication.value = application
}

// Update application status
const updateApplicationStatus = async (applicationId, status) => {
  const statusText = getStatusText(status)
  const result = await Swal.fire({
    title: `${status === '1' ? 'Approve' : 'Reject'} Application?`,
    text: `Are you sure you want to ${status === '1' ? 'approve' : 'reject'} this application?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: status === '1' ? '#10b981' : '#ef4444',
    cancelButtonColor: '#6b7280',
    confirmButtonText: `Yes, ${status === '1' ? 'approve' : 'reject'} it!`,
    cancelButtonText: 'Cancel'
  })

  if (!result.isConfirmed) return

  actionLoading.value = true

  try {
    await api().put(`trainer-request-form/${applicationId}`, {
      status: status
    })

    // Update local state
    const index = applications.value.findIndex(app => app.id === applicationId)
    if (index !== -1) {
      applications.value[index].status = status
    }

    toast({
      title: 'Success',
      description: `Application ${statusText} successfully`,
      variant: 'default'
    })

    // Close modal if open
    if (selectedApplication.value && selectedApplication.value.id === applicationId) {
      selectedApplication.value = null
    }
  } catch (error) {
    console.error('Error updating application status:', error)
    toast({
      title: 'Error',
      description: `Failed to ${status === '1' ? 'approve' : 'reject'} application`,
      variant: 'destructive'
    })
  } finally {
    actionLoading.value = false
  }
}

// Delete application
const deleteApplication = async (applicationId) => {
  const result = await Swal.fire({
    title: 'Delete Application?',
    text: 'This action cannot be undone.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  })

  if (!result.isConfirmed) return

  actionLoading.value = true

  try {
    await api().delete(`trainer-request-form/${applicationId}`)

    // Remove from local state
    applications.value = applications.value.filter(app => app.id !== applicationId)

    toast({
      title: 'Success',
      description: 'Application deleted successfully',
      variant: 'default'
    })

    // Close modal if open
    if (selectedApplication.value && selectedApplication.value.id === applicationId) {
      selectedApplication.value = null
    }
  } catch (error) {
    console.error('Error deleting application:', error)
    toast({
      title: 'Error',
      description: 'Failed to delete application',
      variant: 'destructive'
    })
  } finally {
    actionLoading.value = false
  }
}

// Fetch data on component mount
onMounted(() => {
  fetchApplications()
})
</script>

<style scoped>
/* Smooth transitions */
tr {
  transition: background-color 0.2s ease;
}

button {
  transition: all 0.2s ease;
}

/* Modal backdrop */
.fixed {
  backdrop-filter: blur(4px);
}
</style>