<template>
  <div class="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
    <!-- Header -->
    <div class="max-w-5xl mx-auto mb-10 flex justify-between items-start">
      <div>
        <h1 class="text-4xl font-bold text-indigo-900 mb-3">Applicant Details</h1>
        <p class="text-lg text-indigo-700">Full profile and resume review</p>
      </div>
      <router-link to="hr_management/recruitment/applications/all" class="btn-secondary">
        ← Back to Applications
      </router-link>
    </div>

    <!-- Main Content -->
    <div class="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left Column: Profile & Actions -->
      <div class="lg:col-span-1 space-y-8">
        <!-- Profile Card -->
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div class="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-10 text-center">
            <div class="w-32 h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center text-white text-5xl font-bold backdrop-blur-sm">
              {{ candidate.name.charAt(0) }}
            </div>
            <h2 class="text-3xl font-bold text-white mt-6">{{ candidate.name }}</h2>
            <p class="text-white/90 text-xl mt-2">{{ candidate.position }}</p>
          </div>

          <div class="p-8 space-y-6">
            <div>
              <p class="text-sm text-gray-600">Email</p>
              <p class="font-medium text-lg">{{ candidate.email }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Phone</p>
              <p class="font-medium text-lg">{{ candidate.phone }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Location</p>
              <p class="font-medium text-lg">{{ candidate.location }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Applied On</p>
              <p class="font-medium text-lg">{{ formatDate(candidate.applied_on) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Match Score</p>
              <div class="flex items-center gap-3">
                <span class="text-3xl font-bold text-indigo-600">{{ candidate.score }}</span>
                <span class="text-gray-500">/ 100</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="bg-white rounded-2xl shadow-xl p-8 space-y-4">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Actions</h3>
          <button @click="shortlist" class="w-full btn-primary py-3 text-lg">
            Shortlist Candidate
          </button>
          <button @click="scheduleInterview" class="w-full btn-primary py-3 text-lg">
            Schedule Interview
          </button>
          <button @click="downloadResume" class="w-full btn-secondary py-3 text-lg flex items-center justify-center gap-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Resume
          </button>
          <button @click="reject" class="w-full bg-red-100 text-red-700 hover:bg-red-200 py-3 rounded-xl font-medium text-lg transition-all">
            Reject Application
          </button>
        </div>
      </div>

      <!-- Right Column: Resume & Details -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Application Status -->
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-2xl font-semibold text-gray-800">Current Status</h3>
            <span class="px-6 py-2 rounded-full text-lg font-semibold bg-blue-100 text-blue-800">
              New Application
            </span>
          </div>
          <p class="text-gray-600">This candidate has submitted their application and is awaiting review.</p>
        </div>

        <!-- Summary / Cover Letter -->
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <h3 class="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
            <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Cover Letter / Summary
          </h3>
          <p class="text-gray-700 leading-relaxed text-lg">
            {{ candidate.cover_letter }}
          </p>
        </div>

        <!-- Experience -->
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <h3 class="text-2xl font-semibold text-gray-800 mb-6">Work Experience</h3>
          <div v-for="exp in candidate.experience" :key="exp.id" class="mb-8 last:mb-0 pb-8 last:pb-0 border-b last:border-0 border-gray-200">
            <div class="flex justify-between items-start">
              <div>
                <h4 class="text-xl font-semibold text-gray-900">{{ exp.title }}</h4>
                <p class="text-indigo-600 font-medium">{{ exp.company }} • {{ exp.location }}</p>
              </div>
              <span class="text-gray-500">{{ exp.period }}</span>
            </div>
            <ul class="mt-4 space-y-2">
              <li v-for="point in exp.responsibilities" :key="point" class="flex items-start gap-3 text-gray-700">
                <span class="text-indigo-600 mt-1.5">•</span>
                {{ point }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Education -->
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <h3 class="text-2xl font-semibold text-gray-800 mb-6">Education</h3>
          <div v-for="edu in candidate.education" :key="edu.id" class="mb-6 last:mb-0">
            <h4 class="text-xl font-semibold text-gray-900">{{ edu.degree }}</h4>
            <p class="text-indigo-600 font-medium">{{ edu.school }} • {{ edu.year }}</p>
            <p class="text-gray-600 mt-2">{{ edu.description }}</p>
          </div>
        </div>

        <!-- Skills -->
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <h3 class="text-2xl font-semibold text-gray-800 mb-6">Skills</h3>
          <div class="flex flex-wrap gap-3">
            <span v-for="skill in candidate.skills" :key="skill" class="px-5 py-2 bg-indigo-100 text-indigo-800 rounded-full font-medium">
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Mock detailed candidate data
const candidate = ref({
  id: 1,
  name: 'Sarah Johnson',
  email: 'sarah.j@example.com',
  phone: '+1 (555) 123-4567',
  location: 'New York, NY',
  position: 'Finance Manager',
  applied_on: '2026-01-02',
  score: 92,
  cover_letter: `Dear Hiring Manager,

I am excited to apply for the Finance Manager position at your company. With over 8 years of progressive experience in financial planning, budgeting, and team leadership, I have consistently delivered strong results in fast-paced environments.

In my current role at Global Finance Corp, I manage a $45M annual budget and lead a team of 6 analysts. I successfully reduced operational costs by 18% through process optimization while improving reporting accuracy.

I am particularly drawn to your company's commitment to innovation and growth, and I am confident my strategic mindset and analytical expertise would add significant value to your finance team.

Thank you for considering my application. I look forward to discussing how I can contribute to your continued success.

Best regards,
Sarah Johnson`,

  experience: [
    {
      id: 1,
      title: 'Senior Financial Analyst',
      company: 'Global Finance Corp',
      location: 'New York, NY',
      period: '2022 – Present',
      responsibilities: [
        'Lead annual budgeting and quarterly forecasting for $45M portfolio',
        'Develop financial models to support strategic decision-making',
        'Manage and mentor team of 6 junior analysts',
        'Reduced department costs by 18% through process improvements'
      ]
    },
    {
      id: 2,
      title: 'Financial Analyst',
      company: 'TechStart Solutions',
      location: 'San Francisco, CA',
      period: '2018 – 2022',
      responsibilities: [
        'Prepared monthly financial reports for executive leadership',
        'Conducted variance analysis and identified cost-saving opportunities',
        'Collaborated with cross-functional teams on pricing strategies'
      ]
    }
  ],

  education: [
    {
      id: 1,
      degree: 'Master of Business Administration (MBA)',
      school: 'Harvard Business School',
      year: '2017 – 2019',
      description: 'Concentration in Finance and Strategy'
    },
    {
      id: 2,
      degree: 'Bachelor of Science in Finance',
      school: 'University of California, Berkeley',
      year: '2013 – 2017',
      description: 'Graduated Magna Cum Laude'
    }
  ],

  skills: ['Financial Modeling', 'Budgeting & Forecasting', 'Team Leadership', 'SQL', 'Excel Advanced', 'Power BI', 'Risk Management', 'GAAP', 'Strategic Planning']
})

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const goBack = () => {
  // In real app: router.go(-1) or router.push('/applications')
  alert('Going back to applications list')
}

const shortlist = () => alert('Candidate shortlisted!')
const scheduleInterview = () => alert('Opening interview scheduler...')
const downloadResume = () => alert('Downloading resume PDF...')
const reject = () => {
  if (confirm('Are you sure you want to reject this candidate?')) {
    alert('Candidate rejected')
  }
}
</script>

<style scoped>
.btn-primary {
  @apply bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transform hover:scale-105 transition-all shadow-md;
}

.btn-secondary {
  @apply bg-gray-200 text-gray-800 rounded-xl font-medium hover:bg-gray-300 transition-all;
}
</style>
