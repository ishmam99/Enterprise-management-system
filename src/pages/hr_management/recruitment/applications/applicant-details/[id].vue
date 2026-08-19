<template>
  <div class="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
    <!-- Header -->
    <div class="max-w-5xl mx-auto mb-10 flex justify-between items-start">
      <div>
        <h1 class="text-4xl font-bold text-indigo-900 mb-3">Applicant Details</h1>
        <p class="text-lg text-indigo-700">Complete application profile</p>
      </div>
      <button @click="goBack" class="btn-secondary">
        ← Back to Applications
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-16">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
      <p class="text-xl text-gray-500">Loading applicant details...</p>
    </div>

    <!-- Main Content -->
    <div v-else-if="applicant" class="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left Column: Profile & Actions -->
      <div class="lg:col-span-1 space-y-8">
        <!-- Profile Card -->
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div class="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-10 text-center">
            <div class="w-32 h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center text-white text-5xl font-bold backdrop-blur-sm">
              {{ getInitial(applicant.full_name) }}
            </div>
            <h2 class="text-3xl font-bold text-white mt-6">{{ applicant.full_name }}</h2>
            <p class="text-white/90 text-lg mt-2">{{ applicant.email }}</p>
          </div>

          <div class="p-8 space-y-6">
            <div>
              <p class="text-sm text-gray-600">Contact Number</p>
              <p class="font-medium text-lg">{{ applicant.contact || 'Not provided' }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Emergency Contact</p>
              <p class="font-medium text-lg">{{ applicant.emergency_contact || 'Not provided' }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">System</p>
              <p class="font-medium text-lg">{{ applicant.system || 'Not specified' }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Applied On</p>
              <p class="font-medium text-lg">{{ formatDate(applicant.created_at) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Application ID</p>
              <p class="font-medium text-lg text-indigo-600">#{{ applicant.id }}</p>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="bg-white rounded-2xl shadow-xl p-8 space-y-4">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Application Actions</h3>
          <button @click="shortlist" class="w-full btn-primary py-3 text-lg">
            Shortlist Candidate
          </button>
          <button @click="scheduleInterview" class="w-full btn-primary py-3 text-lg">
            Schedule Interview
          </button>
          <button v-if="applicant.resume" @click="downloadResume" class="w-full btn-secondary py-3 text-lg flex items-center justify-center gap-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Resume
          </button>
          <button v-else class="w-full btn-secondary py-3 text-lg flex items-center justify-center gap-3 opacity-50 cursor-not-allowed">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            No Resume Uploaded
          </button>
          <button @click="reject" class="w-full bg-red-100 text-red-700 hover:bg-red-200 py-3 rounded-xl font-medium text-lg transition-all">
            Reject Application
          </button>
        </div>
      </div>

      <!-- Right Column: All Information in One Unified Section -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
          <!-- Section Header -->
          <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
            <h2 class="text-2xl font-bold text-gray-800">Application Details</h2>
            <div class="flex items-center gap-4 mt-2">
              <span class="px-4 py-1.5 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                Status: New Application
              </span>
              <span class="text-sm text-gray-600">
                Last updated: {{ formatDateTime(applicant.updated_at) }}
              </span>
            </div>
          </div>

          <!-- Main Content Grid -->
          <div class="p-8">
            <!-- Top Info Row -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <!-- Education Information -->
              <div class="space-y-6">
                <h3 class="text-xl font-semibold text-gray-800 flex items-center gap-2 pb-3 border-b border-gray-200">
                  <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                  </svg>
                  Education Background
                </h3>
                
                <div class="space-y-4">
                  <div>
                    <p class="text-sm text-gray-600 mb-1">Highest Education Level</p>
                    <div class="flex items-center gap-2">
                      <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p class="text-lg font-medium text-gray-900">{{ applicant.highest_education || 'Not specified' }}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p class="text-sm text-gray-600 mb-1">University / Institution</p>
                    <div class="flex items-center gap-2">
                      <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <p class="text-lg font-medium text-gray-900">{{ applicant.university || 'Not specified' }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Technical Information -->
              <div class="space-y-6">
                <h3 class="text-xl font-semibold text-gray-800 flex items-center gap-2 pb-3 border-b border-gray-200">
                  <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                  Technical Information
                </h3>
                
                <div class="space-y-4">
                  <div>
                    <p class="text-sm text-gray-600 mb-2">Operating System</p>
                    <span class="inline-block px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium">
                      {{ applicant.system || 'Not specified' }}
                    </span>
                  </div>
                  
                  <div>
                    <p class="text-sm text-gray-600 mb-2">Software Experience</p>
                    <div v-if="applicant.software" class="flex items-center gap-2">
                      <span class="inline-block px-4 py-2 bg-indigo-100 text-indigo-800 rounded-lg font-medium">
                        {{ applicant.software.name }}
                      </span>
                      <span :class="['px-3 py-1 rounded-full text-xs font-semibold', 
                        applicant.software.status === '1' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800']">
                        {{ applicant.software.status === '1' ? 'Active' : 'Inactive' }}
                      </span>
                    </div>
                    <div v-else-if="applicant.softwares">
                      <span class="inline-block px-4 py-2 bg-indigo-100 text-indigo-800 rounded-lg font-medium">
                        {{ applicant.softwares }}
                      </span>
                    </div>
                    <p v-else class="text-gray-500 italic text-sm">No software experience specified</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Additional Details Section -->
            <div class="border-t border-gray-200 pt-8">
              <h3 class="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Additional Information & Notes
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Industry & Resume -->
                <div class="space-y-6">
                  <div v-if="applicant.industry_name">
                    <p class="text-sm text-gray-600 mb-2">Industry Preference</p>
                    <div class="flex items-center gap-2">
                      <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span class="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium">
                        {{ applicant.industry_name }}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <p class="text-sm text-gray-600 mb-2">Resume Status</p>
                    <div v-if="applicant.resume" class="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div class="flex items-center gap-3">
                        <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <div>
                          <p class="font-medium text-blue-900">Resume Available</p>
                          <p class="text-xs text-blue-700">PDF Document</p>
                        </div>
                      </div>
                      <button @click="viewResume" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Preview
                      </button>
                    </div>
                    <div v-else class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p class="text-gray-600">No resume uploaded</p>
                    </div>
                  </div>
                </div>

                <!-- Timeline & Notes -->
                <div class="space-y-6">
                  <div>
                    <p class="text-sm text-gray-600 mb-2">Application Timeline</p>
                    <div class="space-y-2">
                      <div class="flex items-center justify-between">
                        <span class="text-gray-700">Submitted:</span>
                        <span class="font-medium">{{ formatDate(applicant.created_at) }}</span>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-gray-700">Last Updated:</span>
                        <span class="font-medium">{{ formatDate(applicant.updated_at) }}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                    <div class="flex items-start gap-2">
                      <svg class="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <div>
                        <p class="text-sm font-medium text-yellow-800 mb-1">Review Note</p>
                        <p class="text-xs text-yellow-700">Application is pending initial screening. Contact information has been verified.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Stats at Bottom -->
            <div class="mt-8 pt-6 border-t border-gray-200">
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="text-center p-3 bg-gray-50 rounded-lg">
                  <p class="text-sm text-gray-600">Contact Info</p>
                  <p class="text-base font-medium text-gray-900">{{ applicant.contact ? '✓ Provided' : 'Missing' }}</p>
                </div>
                <div class="text-center p-3 bg-gray-50 rounded-lg">
                  <p class="text-sm text-gray-600">Education</p>
                  <p class="text-base font-medium text-gray-900">{{ applicant.highest_education ? '✓ Provided' : 'Missing' }}</p>
                </div>
                <div class="text-center p-3 bg-gray-50 rounded-lg">
                  <p class="text-sm text-gray-600">Technical Info</p>
                  <p class="text-base font-medium text-gray-900">{{ applicant.system ? '✓ Provided' : 'Missing' }}</p>
                </div>
                <div class="text-center p-3 bg-gray-50 rounded-lg">
                  <p class="text-sm text-gray-600">Resume</p>
                  <p class="text-base font-medium text-gray-900">{{ applicant.resume ? '✓ Uploaded' : 'Not yet' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Not Found State -->
    <div v-else class="text-center py-16">
      <div class="w-24 h-24 mx-auto mb-6 text-gray-400">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">Applicant Not Found</h3>
      <p class="text-gray-600 mb-6">The requested applicant details could not be loaded.</p>
      <button @click="goBack" class="btn-secondary px-6 py-3">
        Return to Applications
      </button>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import api from '@/config/api'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const applicant = ref(null)
const loading = ref(false)

const getInitial = (name) => {
  if (!name) return '?';
  return name.charAt(0).toUpperCase();
}

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

const formatDateTime = (dateStr) => {
  if (!dateStr) return 'N/A';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const goBack = () => {
  router.push('/hr_management/recruitment/applications')
}

const shortlist = () => {
  if (confirm('Are you sure you want to shortlist this candidate?')) {
    alert('Candidate shortlisted!')
    // Add API call to update status
  }
}

const scheduleInterview = () => {
  alert('Opening interview scheduler...')
  // Implement interview scheduling
}

const downloadResume = () => {
  if (applicant.value?.resume) {
    alert('Downloading resume PDF...')
    // Implement resume download
  }
}

const viewResume = () => {
  if (applicant.value?.resume) {
    alert('Viewing resume...')
    // Implement resume viewer
  }
}

const reject = () => {
  if (confirm('Are you sure you want to reject this application?')) {
    alert('Application rejected')
    // Add API call to update status
  }
}

const getApplicantDetails = async () => {
  loading.value = true;
  try {
    const applicantId = route.params.id;
    const { data } = await api().get(`applied-jobs/${applicantId}`);
    applicant.value = data.data || data;
    console.log('Applicant details loaded:', applicant.value);
  } catch (error) {
    console.error('Error loading applicant details:', error);
    alert('Failed to load applicant details. Please try again.');
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getApplicantDetails();
})
</script>

<style scoped>
.btn-primary {
  @apply bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transform hover:scale-105 transition-all shadow-md;
}

.btn-secondary {
  @apply bg-gray-200 text-gray-800 rounded-xl font-medium hover:bg-gray-300 transition-all;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c7d2fe;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a5b4fc;
}
</style>