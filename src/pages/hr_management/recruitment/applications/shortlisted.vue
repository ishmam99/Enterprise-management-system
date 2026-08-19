<template>
  <div class="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
    <!-- Header -->
    <div class="mx-auto mb-10">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-4xl font-bold text-indigo-900 mb-3 flex items-center gap-3">
            <svg class="w-10 h-10 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.953a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.953c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0L6.007 18.693c-.784.57-1.838-.197-1.54-1.118l1.287-3.953a1 1 0 00-.364-1.118L2.02 9.38c-.784-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.953z"/>
            </svg>
            Shortlisted Candidates
          </h1>
          <p class="text-lg text-indigo-700">Top candidates selected for further evaluation</p>
        </div>
        <router-link 
          to="/hr_management/recruitment/applications"
          class="btn btn-outline btn-primary"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Applications
        </router-link>
      </div>
      
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Shortlisted</p>
              <p class="text-3xl font-bold text-green-600 mt-2">{{ shortlisted.length }}</p>
            </div>
            <div class="p-3 bg-green-100 rounded-full">
              <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.953a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.953c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0L6.007 18.693c-.784.57-1.838-.197-1.54-1.118l1.287-3.953a1 1 0 00-.364-1.118L2.02 9.38c-.784-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.953z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">This Month</p>
              <p class="text-3xl font-bold text-orange-600 mt-2">{{ thisMonthCount }}</p>
            </div>
            <div class="p-3 bg-orange-100 rounded-full">
              <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Scheduled Interviews</p>
              <p class="text-3xl font-bold text-blue-600 mt-2">{{ scheduledInterviewsCount }}</p>
            </div>
            <div class="p-3 bg-blue-100 rounded-full">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Avg. Match Score</p>
              <p class="text-3xl font-bold text-purple-600 mt-2">{{ averageMatchScore }}</p>
            </div>
            <div class="p-3 bg-purple-100 rounded-full">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-16">
      <div class="flex flex-col items-center justify-center gap-4">
        <div class="loading loading-spinner loading-lg text-orange-600"></div>
        <p class="text-xl text-gray-500">Loading shortlisted candidates...</p>
      </div>
    </div>

    <!-- Shortlisted Candidates Grid -->
    <div v-else class="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div 
        v-for="candidate in shortlisted" 
        :key="candidate.id" 
        class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
      >
        <!-- Header with Star Badge -->
        <div class="bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-5 relative">
          <div class="absolute top-3 right-3 bg-white/20 rounded-full p-1">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.953a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.953c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0L6.007 18.693c-.784.57-1.838-.197-1.54-1.118l1.287-3.953a1 1 0 00-.364-1.118L2.02 9.38c-.784-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.953z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-1">{{ candidate.full_name }}</h3>
          <p class="text-white/90 text-sm">
            Applied for: {{ candidate.job?.title || 'Position' }}
          </p>
          <div class="mt-2 flex gap-2">
            <span class="px-2 py-1 bg-white/20 rounded-full text-xs text-white">
              Shortlisted
            </span>
            <span v-if="candidate.has_interview" class="px-2 py-1 bg-green-500/30 rounded-full text-xs text-white">
              Interview Scheduled
            </span>
          </div>
        </div>
        
        <!-- Candidate Info -->
        <div class="p-6 space-y-4">
          <!-- Contact Info -->
          <div class="flex items-center gap-3 text-gray-600">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89-4.26a2 2 0 012.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>{{ candidate.email }}</span>
          </div>
          
          <div class="flex items-center gap-3 text-gray-600">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>{{ candidate.contact || 'Not provided' }}</span>
          </div>
          
          <!-- Education Info -->
          <div class="flex items-start gap-3 text-gray-600">
            <svg class="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
            <div>
              <p class="font-medium">{{ candidate.highest_education || 'Not specified' }}</p>
              <p class="text-sm text-gray-500">{{ candidate.university || '' }}</p>
            </div>
          </div>
          
          <!-- Applied Date -->
          <div class="flex justify-between pt-3 border-t border-gray-100">
            <span class="text-gray-600">Applied</span>
            <span class="font-medium text-gray-800">{{ formatDate(candidate.created_at) }}</span>
          </div>
          
          <!-- System -->
          <div class="flex justify-between">
            <span class="text-gray-600">System</span>
            <span class="font-medium px-2 py-1 bg-gray-100 rounded text-xs">{{ candidate.system || 'N/A' }}</span>
          </div>
          
          <!-- Score -->
          <div class="flex justify-between">
            <span class="text-gray-600">Match Score</span>
            <span class="font-bold text-orange-600 text-xl">
              {{ calculateMatchScore(candidate) }}/100
            </span>
          </div>
          
          <!-- Actions -->
          <div class="pt-4 border-t border-gray-200 flex justify-between gap-2">
            <!-- Schedule Interview Button -->
            <button 
              @click="openScheduleModal(candidate)"
              :disabled="loadingOnInterview[candidate.id] || candidate.has_interview"
              class="btn btn-primary btn-sm flex-1"
              :class="{ 'btn-disabled': candidate.has_interview }"
            >
              <span v-if="loadingOnInterview[candidate.id]" class="loading loading-spinner loading-xs"></span>
              <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ candidate.has_interview ? 'Scheduled' : 'Interview' }}
            </button>
            
            <!-- View Details Button -->
            <router-link 
              :to="`/hr_management/recruitment/applications/applicant-details/${candidate.id}`"
              class="btn btn-outline btn-info btn-sm"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Details
            </router-link>
            
            <!-- Reject Button -->
            <button 
              @click="reject(candidate.id)"
              :disabled="loadingOnReject[candidate.id]"
              class="btn btn-outline btn-error btn-sm"
            >
              <span v-if="loadingOnReject[candidate.id]" class="loading loading-spinner loading-xs"></span>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && shortlisted.length === 0" class="text-center py-16 bg-white rounded-2xl shadow-lg">
      <div class="flex flex-col items-center justify-center gap-6">
        <svg class="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <div>
          <p class="text-2xl font-semibold text-gray-600 mb-2">No candidates shortlisted yet</p>
          <p class="text-gray-500 max-w-md mx-auto">
            Start reviewing applications and shortlist promising candidates for further evaluation.
          </p>
        </div>
        <router-link 
          to="/hr_management/recruitment/applications"
          class="btn btn-primary mt-4"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Go to Applications
        </router-link>
      </div>
    </div>

    <!-- Schedule Interview Modal -->
    <div v-if="showScheduleModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 rounded-t-2xl">
          <h3 class="text-xl font-semibold text-white">Schedule Interview</h3>
          <p class="text-white/90 text-sm">Set interview details for {{ selectedCandidate?.full_name }}</p>
        </div>
        
        <div class="p-6">
          <div v-if="schedulingLoading" class="text-center py-8">
            <div class="loading loading-spinner loading-lg text-blue-600"></div>
            <p class="text-gray-500 mt-4">Scheduling interview...</p>
          </div>
          
          <form v-else @submit.prevent="submitScheduleInterview" class="space-y-4">
            <!-- Date Input -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Interview Date</span>
              </label>
              <input 
                type="date" 
                v-model="scheduleData.scheduled_date"
                required
                class="input input-bordered w-full"
                :min="new Date().toISOString().split('T')[0]"
              />
            </div>
            
            <!-- Time Input -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Interview Time</span>
              </label>
              <input 
                type="time" 
                v-model="scheduleData.scheduled_time"
                required
                class="input input-bordered w-full"
              />
            </div>
            
            <!-- Description Input -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Description</span>
              </label>
              <textarea 
                v-model="scheduleData.description"
                required
                placeholder="Enter interview details, topics to discuss, or notes..."
                class="textarea textarea-bordered w-full h-32"
              ></textarea>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button 
                type="button" 
                @click="closeScheduleModal"
                class="btn btn-outline btn-sm"
                :disabled="schedulingLoading"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                class="btn btn-primary btn-sm"
                :disabled="schedulingLoading"
              >
                <span v-if="schedulingLoading" class="loading loading-spinner loading-xs"></span>
                Schedule Interview
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '@/config/api'
import Swal from 'sweetalert2';
import { onMounted, ref, computed, reactive } from 'vue'

const shortlisted = ref([]);
const loading = ref(false);
const loadingOnInterview = ref({});
const loadingOnReject = ref({});

// Schedule Interview Modal
const showScheduleModal = ref(false);
const selectedCandidate = ref(null);
const schedulingLoading = ref(false);
const scheduleData = reactive({
  scheduled_date: '',
  scheduled_time: '',
  description: ''
});

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

// Calculate match score
const calculateMatchScore = (candidate) => {
  let score = 50;
  
  if (candidate.highest_education) {
    const education = candidate.highest_education.toLowerCase();
    if (education.includes('phd')) score += 20;
    else if (education.includes('master') || education.includes('msc') || education.includes('mba')) score += 15;
    else if (education.includes('bachelor') || education.includes('bsc') || education.includes('ba')) score += 10;
  }
  
  if (candidate.software) score += 15;
  if (candidate.system) score += 10;
  
  return Math.min(Math.max(score, 0), 100);
}

// Computed properties
const thisMonthCount = computed(() => {
  const now = new Date();
  return shortlisted.value.filter(candidate => {
    const shortlistDate = new Date(candidate.updated_at);
    return shortlistDate.getMonth() === now.getMonth() && 
           shortlistDate.getFullYear() === now.getFullYear();
  }).length;
});

const scheduledInterviewsCount = computed(() => {
  return shortlisted.value.filter(c => c.has_interview).length;
});

const averageMatchScore = computed(() => {
  if (shortlisted.value.length === 0) return 0;
  const totalScore = shortlisted.value.reduce((sum, candidate) => {
    return sum + calculateMatchScore(candidate);
  }, 0);
  return Math.round(totalScore / shortlisted.value.length);
});

// Open schedule modal
const openScheduleModal = (candidate) => {
  selectedCandidate.value = candidate;
  
  // Set default values
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  scheduleData.scheduled_date = tomorrow.toISOString().split('T')[0];
  scheduleData.scheduled_time = '14:30';
  scheduleData.description = `Interview for ${candidate.full_name} - ${candidate.job?.title || 'Position'}`;
  
  showScheduleModal.value = true;
};

// Close schedule modal
const closeScheduleModal = () => {
  showScheduleModal.value = false;
  selectedCandidate.value = null;
  schedulingLoading.value = false;
  
  // Reset form data
  scheduleData.scheduled_date = '';
  scheduleData.scheduled_time = '';
  scheduleData.description = '';
};

// Submit schedule interview
const submitScheduleInterview = async () => {
  if (!selectedCandidate.value) return;
  
  schedulingLoading.value = true;
  const candidateId = selectedCandidate.value.id;
  
  try {
    // 1. First, schedule the interview message
    const payload = {
      applied_job_id: candidateId,
      scheduled_date: scheduleData.scheduled_date,
      scheduled_time: scheduleData.scheduled_time,
      description: scheduleData.description
    };
    
    const { data: scheduleResponse } = await api().post('scheduled-messages', payload);
    
    // 2. Then, update the candidate status to 3 (Interview Stage)
    const { data: statusResponse } = await api().post(`applied-job-status/${candidateId}`, {
      status: 3,
      _method: 'PUT'
    });
    
    Swal.fire({
      title: 'Success!',
      text: 'Interview has been scheduled and candidate moved to interview stage.',
      icon: 'success',
      confirmButtonColor: '#10B981',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false
    });
    
    // Refresh the shortlisted candidates list
    await getAllShortlisted();
    
    // Close modal
    closeScheduleModal();
    
  } catch (error) {
    console.error('Schedule interview error:', error);
    
    Swal.fire({
      title: 'Error!',
      text: error.response?.data?.message || 'Failed to schedule interview. Please try again.',
      icon: 'error',
      confirmButtonColor: '#EF4444'
    });
    
  } finally {
    schedulingLoading.value = false;
  }
};

const reject = async(id) => {
  Swal.fire({
    title: 'Reject Candidate?',
    text: 'This will move the candidate to rejected applications.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, reject',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#EF4444',
    cancelButtonColor: '#6B7280',
    focusConfirm: false,
    focusCancel: false,
    allowEscapeKey: true,
    allowEnterKey: true,
    reverseButtons: false,
    showClass: {
      popup: 'animate__animated animate__fadeIn'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOut'
    }
  }).then(async (result) => {
    if (result.isConfirmed) {
      loadingOnReject.value[id] = true;
      
      try {
        const { data } = await api().post(`applied-job-status/${id}`, {
          status: 4, // Rejected status
          _method: 'PUT'
        });
        
        Swal.fire({
          title: 'Rejected!',
          text: 'Candidate has been moved to rejected applications.',
          icon: 'success',
          confirmButtonColor: '#EF4444',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        });
        
        // Refresh the shortlisted candidates
        getAllShortlisted();
      } catch (error) {
        console.error('Reject error:', error);
        Swal.fire({
          title: 'Error!',
          text: error.response?.data?.message || 'Failed to reject candidate. Please try again.',
          icon: 'error',
          confirmButtonColor: '#EF4444'
        });
      } finally {
        loadingOnReject.value[id] = false;
      }
    }
  });
}

const getAllShortlisted = async() => {
  loading.value = true;
  try {
    const { data } = await api().get('applied-jobs');
    
    // Filter for shortlisted applications (status = 2)
    const shortlistedData = data.data.filter(e => e.status == 2);
    
    // Check if candidates have scheduled interviews (you might want to fetch this from your scheduled-messages API)
    // For now, we'll set it to false
    shortlisted.value = shortlistedData.map(candidate => ({
      ...candidate,
      has_interview: false // You can update this by fetching scheduled messages separately
    }));
    
  } catch(error) {
    console.error('Error loading shortlisted applications:', error);
    Swal.fire({
      title: 'Error!',
      text: 'Failed to load shortlisted candidates. Please try again.',
      icon: 'error',
      confirmButtonColor: '#4F46E5'
    });
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getAllShortlisted();
})
</script>