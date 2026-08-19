<!-- src/components/hiring/CandidateDetails.vue -->
<template>
  <!-- Candidate and Job Details Section -->
  <div class="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-lg p-8 mb-6 border border-blue-100">
    <!-- Header with Gradient -->
    <div class="bg-orange-700 rounded-xl p-6 mb-8 text-white shadow-md">
      <h2 class="text-3xl font-bold">1. Shortlist</h2>
      <p class="text-blue-100 mt-2">Candidate Screening & Evaluation</p>
    </div>

    <!-- Candidate Details Section -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <span class="inline-block w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full mr-3"></span>
        1(a). Candidate Details
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-2">
        <div class="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition-shadow">
          <span class="text-blue-600 text-xs font-bold uppercase tracking-wider">Email</span>
          <span class="text-gray-900 font-semibold block mt-1">{{ candidate.email || 'N/A' }}</span>
        </div>
        <div class="bg-gradient-to-br from-cyan-50 to-teal-50 p-4 rounded-lg border-l-4 border-cyan-500 hover:shadow-md transition-shadow">
          <span class="text-cyan-600 text-xs font-bold uppercase tracking-wider">Contact</span>
          <span class="text-gray-900 font-semibold block mt-1">{{ candidate.contact || 'N/A' }}</span>
        </div>
        <div class="bg-gradient-to-br from-teal-50 to-emerald-50 p-4 rounded-lg border-l-4 border-teal-500 hover:shadow-md transition-shadow">
          <span class="text-teal-600 text-xs font-bold uppercase tracking-wider">Emergency Contact</span>
          <span class="text-gray-900 font-semibold block mt-1">{{ candidate.emergency_contact || 'N/A' }}</span>
        </div>
        <div class="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-lg border-l-4 border-emerald-500 hover:shadow-md transition-shadow">
          <span class="text-emerald-600 text-xs font-bold uppercase tracking-wider">Highest Education</span>
          <span class="text-gray-900 font-semibold block mt-1">{{ candidate.highest_education || 'N/A' }}</span>
        </div>
        <div class="bg-gradient-to-br from-green-50 to-lime-50 p-4 rounded-lg border-l-4 border-green-500 hover:shadow-md transition-shadow">
          <span class="text-green-600 text-xs font-bold uppercase tracking-wider">University</span>
          <span class="text-gray-900 font-semibold block mt-1">{{ candidate.university || 'N/A' }}</span>
        </div>
        <div class="bg-gradient-to-br from-lime-50 to-yellow-50 p-4 rounded-lg border-l-4 border-lime-500 hover:shadow-md transition-shadow">
          <span class="text-lime-600 text-xs font-bold uppercase tracking-wider">Department</span>
          <span class="text-gray-900 font-semibold block mt-1">{{ candidate.job?.department || 'N/A' }}</span>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div class="bg-gradient-to-r from-transparent via-gray-300 to-transparent my-8 h-1 rounded"></div>

    <!-- Job Details Section -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <span class="inline-block w-2 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full mr-3"></span>
        1(b). Job Details
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ml-2">
        <div class="bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-lg border-l-4 border-green-500 hover:shadow-md transition-shadow">
          <span class="text-green-600 text-xs font-bold uppercase tracking-wider">Job Title</span>
          <span class="text-gray-900 font-semibold block mt-1">{{ candidate.job?.title || 'N/A' }}</span>
        </div>
        <div class="bg-gradient-to-br from-teal-50 to-cyan-50 p-4 rounded-lg border-l-4 border-teal-500 hover:shadow-md transition-shadow">
          <span class="text-teal-600 text-xs font-bold uppercase tracking-wider">Job Type</span>
          <span class="text-gray-900 font-semibold block mt-1">{{ candidate.job?.job_type || 'N/A' }}</span>
        </div>
        <div class="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-lg border-l-4 border-cyan-500 hover:shadow-md transition-shadow">
          <span class="text-cyan-600 text-xs font-bold uppercase tracking-wider">Location</span>
          <span class="text-gray-900 font-semibold block mt-1">{{ candidate.job?.base_country || 'N/A' }}</span>
        </div>
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition-shadow">
          <span class="text-blue-600 text-xs font-bold uppercase tracking-wider">Required Experience</span>
          <span class="text-gray-900 font-semibold block mt-1">{{ candidate.job?.required_experience || 'N/A' }}</span>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div class="bg-gradient-to-r from-transparent via-gray-300 to-transparent my-8 h-1 rounded"></div>

    <!-- Resume Section -->
    <div>
      <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <span class="inline-block w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-3"></span>
        1(c). Resume
      </h3>
      <div class="ml-2">
        <div v-if="candidate.resume" class="flex items-center gap-4">
          <div class="flex flex-col gap-2">
            <div class="bg-gradient-to-r from-purple-100 to-pink-100 inline-block px-3 py-1 rounded-full text-sm font-semibold text-purple-700">
              📄 Resume Document
            </div>
            <a
              :href="`${baseurl}/${candidate.resume}`"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8m0 8l-9-2m9 2l9-2m-9-8l9 18m-9-18L3 7m9 0v8m0-8L3 7" />
              </svg>
              View Resume
            </a>
          </div>
        </div>
        <div v-else class="bg-gradient-to-r from-gray-100 to-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300 text-gray-500 italic text-center">
          📋 No resume uploaded
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const baseurl = import.meta.env.VITE_BASE_URL
defineProps({ candidate: { type: Object, required: true } })
</script>
