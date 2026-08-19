<template>
  <div class="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
    <!-- Header -->
    <div class="mx-auto mb-10">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-4xl font-bold text-indigo-900 mb-3 flex items-center gap-3">
            <svg class="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Interview Stage
          </h1>
          <p class="text-lg text-indigo-700">Candidates currently in interview process</p>
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
              <p class="text-sm font-medium text-gray-600">Total in Interviews</p>
              <p class="text-3xl font-bold text-purple-600 mt-2">{{ interviews.length }}</p>
            </div>
            <div class="p-3 bg-purple-100 rounded-full">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Today's Interviews</p>
              <p class="text-3xl font-bold text-green-600 mt-2">{{ todaysInterviewsCount }}</p>
            </div>
            <div class="p-3 bg-green-100 rounded-full">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">This Week</p>
              <p class="text-3xl font-bold text-blue-600 mt-2">{{ thisWeekCount }}</p>
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
              <p class="text-sm font-medium text-gray-600">Avg. Interview Score</p>
              <p class="text-3xl font-bold text-orange-600 mt-2">{{ averageInterviewScore }}/10</p>
            </div>
            <div class="p-3 bg-orange-100 rounded-full">
              <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div class="loading loading-spinner loading-lg text-purple-600"></div>
        <p class="text-xl text-gray-500">Loading interview candidates...</p>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="interviews.length === 0" class="text-center py-16 bg-white rounded-2xl shadow-lg">
      <div class="flex flex-col items-center justify-center gap-6">
        <svg class="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <div>
          <p class="text-2xl font-semibold text-gray-600 mb-2">No candidates in interview stage</p>
          <p class="text-gray-500 max-w-md mx-auto">
            Candidates will appear here once they have been scheduled for interviews.
          </p>
        </div>
        <router-link 
          to="/hr_management/recruitment/applications/shortlisted"
          class="btn btn-primary mt-4"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Schedule Interviews
        </router-link>
      </div>
    </div>

    <!-- Interview Cards -->
    <div v-else class="mx-auto space-y-8">
      <div v-for="candidate in interviews" :key="candidate.id" class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-5 flex justify-between items-center">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {{ getInitial(candidate.full_name) }}
            </div>
            <div>
              <h3 class="text-2xl font-semibold text-white">{{ candidate.full_name }}</h3>
              <p class="text-white/90 text-sm">{{ candidate.email }}</p>
            </div>
          </div>
          <span class="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
            Interview Round
          </span>
        </div>
        
        <!-- Main Content -->
        <div class="p-8">
          <!-- First Row: Basic Info -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="space-y-2">
              <p class="text-gray-600 text-sm">Applied Position</p>
              <p class="font-semibold text-lg text-gray-900">
                {{ candidate.job?.title || 'Position not specified' }}
              </p>
            </div>
            
            <div class="space-y-2">
              <p class="text-gray-600 text-sm">Contact Number</p>
              <p class="font-semibold text-lg text-gray-900">{{ candidate.contact || 'Not provided' }}</p>
            </div>
            
            <div class="space-y-2">
              <p class="text-gray-600 text-sm">System</p>
              <p class="font-semibold">
                <span class="px-3 py-1 bg-gray-100 rounded-full text-sm">{{ candidate.system || 'N/A' }}</span>
              </p>
            </div>
          </div>
          
          <!-- Second Row: Education & Applied Date -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="space-y-2">
              <p class="text-gray-600 text-sm">Education</p>
              <div>
                <p class="font-semibold text-gray-900">{{ candidate.highest_education || 'Not specified' }}</p>
                <p class="text-gray-500 text-sm">{{ candidate.university || '' }}</p>
              </div>
            </div>
            
            <div class="space-y-2">
              <p class="text-gray-600 text-sm">Applied Date</p>
              <p class="font-semibold text-gray-900">{{ formatDate(candidate.created_at) }}</p>
            </div>
          </div>
          
          <!-- Third Row: Emergency Contact & Software -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <p class="text-gray-600 text-sm">Emergency Contact</p>
              <p class="font-semibold text-gray-900">{{ candidate.emergency_contact || 'Not provided' }}</p>
            </div>
            
            <div class="space-y-2">
              <p class="text-gray-600 text-sm">Software Skills</p>
              <p class="font-semibold text-gray-900">
                <span v-if="candidate.software" class="flex items-center gap-2">
                  <div v-if="candidate.software.image" class="w-6 h-6">
                    <img :src="candidate.software.image" :alt="candidate.software.name" class="w-full h-full object-cover rounded">
                  </div>
                  {{ candidate.software.name }}
                </span>
                <span v-else class="text-gray-500">{{ candidate.softwares || 'Not specified' }}</span>
              </p>
            </div>
          </div>
          
          <!-- Interview Schedule Info (You can fetch this from scheduled-messages API) -->
          <div class="mt-8 pt-8 border-t border-gray-200">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm mb-2">Interview Status</p>
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <p class="font-semibold text-green-600">Scheduled for Interview</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-gray-600 text-sm mb-2">Shortlisted On</p>
                <p class="font-semibold text-gray-900">{{ formatDate(candidate.updated_at) }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Footer Actions -->
        <div class="px-8 py-5 bg-gray-50 flex justify-end gap-4 border-t border-gray-200">
          <router-link 
            :to="`/hr_management/recruitment/applications/applicant-details/${candidate.id}`"
            class="btn btn-outline btn-info"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Details
          </router-link>
          <button @click="offerJob(candidate.id)" class="btn btn-success">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Make Offer
          </button>
          <button @click="reject(candidate.id)" class="btn btn-error">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Reject
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '@/config/api'
import Swal from 'sweetalert2';
import { onMounted, ref, computed } from 'vue'

const interviews = ref([]);
const loading = ref(false);

const getInitial = (name) => {
  if (!name) return '?';
  return name.charAt(0).toUpperCase();
}

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

// Computed properties
const todaysInterviewsCount = computed(() => {
  const today = new Date().toISOString().split('T')[0];
  // This would need to be calculated based on your scheduled interviews data
  // For now, return a static value
  return 0;
});

const thisWeekCount = computed(() => {
  // This would need to be calculated based on your scheduled interviews data
  // For now, return interviews from the last 7 days
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  return interviews.value.filter(candidate => {
    const candidateDate = new Date(candidate.updated_at);
    return candidateDate >= oneWeekAgo;
  }).length;
});

const averageInterviewScore = computed(() => {
  // This would come from your interview feedback system
  // For now, return a placeholder
  return 7;
});

const offerJob = (id) => {
  Swal.fire({
    title: 'Make Job Offer?',
    text: 'This will move the candidate to job offer stage.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, make offer',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#10B981',
    cancelButtonColor: '#6B7280',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Offer Prepared!',
        text: 'Job offer has been prepared for the candidate.',
        icon: 'success',
        confirmButtonColor: '#10B981'
      });
    }
  });
}

const reject = (id) => {
  Swal.fire({
    title: 'Reject Candidate?',
    text: 'This will move the candidate to rejected applications.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, reject',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#EF4444',
    cancelButtonColor: '#6B7280',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Rejected!',
        text: 'Candidate has been moved to rejected applications.',
        icon: 'success',
        confirmButtonColor: '#EF4444'
      });
    }
  });
}

const getAllInterviews = async() => {
  loading.value = true;
  try {
    const { data } = await api().get('applied-jobs');
    // Filter for interview stage applications (status = 3)
    interviews.value = data.data.filter(e => e.status == 3);
  } catch(error) {
    console.error('Error loading interview applications:', error);
    Swal.fire({
      title: 'Error!',
      text: 'Failed to load interview candidates. Please try again.',
      icon: 'error',
      confirmButtonColor: '#4F46E5'
    });
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getAllInterviews();
})
</script>