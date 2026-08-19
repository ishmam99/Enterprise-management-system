<template>
    <section
    id="view-resume"
    class="rounded-xl shadow-sm border m-2 border-gray-200 overflow-hidden"
  >
  <div class="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- Loading State -->
      <div v-if="loading" class="bg-white rounded-xl shadow-lg p-12 text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p class="text-gray-600">Loading resume data...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-white rounded-xl shadow-lg p-12 text-center">
        <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-red-600 mb-4">{{ error }}</p>
        <button @click="fetchResumeData" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Try Again
        </button>
      </div>

      <!-- Resume Content -->
      <div v-else>
        <!-- Header with action buttons -->
        <div class="mb-6 flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900">Resume Viewer</h1>
          <div class="space-x-3">
            <!-- <button
              @click="downloadPDF"
              class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </button> -->
            <!-- <button
              @click="togglePrint"
              class="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print
            </button> -->
          </div>
        </div>

        <!-- Resume Card -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <!-- Profile Header -->
          <div class="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-10 text-white">
            <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
              <!-- Avatar -->
              <div class="flex-shrink-0">
                <div class="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                  <!-- <img
                    v-if="professionalReferences[0]?.image"
                    :src="professionalReferences[0].image"
                    :alt="professionalReferences[0]?.name"
                    class="w-full h-full object-cover"
                  /> -->
                  <svg  class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </div>

              <!-- Personal Info -->
              <div class="text-center md:text-left">
                <h1 class="text-3xl font-bold">{{ authStore?.user?.name || 'User' }}</h1>
                <p class="text-xl text-blue-100 mt-1">{{ professionalReferences[0]?.designation || 'Professional' }}</p>
                <div class="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                  <div v-if="professionalReferences[0]?.email" class="flex items-center text-sm">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span class="ml-1">{{ authStore?.user?.email }}</span>
                  </div>
                  <div v-if="professionalReferences[0]?.phone" class="flex items-center text-sm">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span class="ml-1">{{ professionalReferences[0].phone }}</span>
                  </div>
                  <div v-if="professionalReferences[0]?.company_name" class="flex items-center text-sm">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span class="ml-1">{{ professionalReferences[0].company_name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Content Sections -->
          <div class="p-8">
            <!-- Professional Summary -->
            <div v-if="professionalSummary" class="mb-8">
              <h2 class="text-xl font-semibold text-gray-900 border-b-2 border-blue-500 pb-2 mb-4">Professional Summary</h2>
              <p class="text-gray-700 leading-relaxed">{{ professionalSummary.summary }}</p>

              <!-- Stats -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div v-if="professionalSummary.experience_in_years" class="bg-gray-50 rounded-lg p-3 text-center">
                  <p class="text-2xl font-bold text-blue-600">{{ professionalSummary.experience_in_years }}+</p>
                  <p class="text-sm text-gray-600">Years Experience</p>
                </div>
                <div v-if="professionalSummary.client_served" class="bg-gray-50 rounded-lg p-3 text-center">
                  <p class="text-2xl font-bold text-blue-600">{{ professionalSummary.client_served }}+</p>
                  <p class="text-sm text-gray-600">Clients Served</p>
                </div>
                <div v-if="professionalSummary.project_completed" class="bg-gray-50 rounded-lg p-3 text-center">
                  <p class="text-2xl font-bold text-blue-600">{{ professionalSummary.project_completed }}+</p>
                  <p class="text-sm text-gray-600">Projects Completed</p>
                </div>
              </div>
            </div>

            <!-- Work Experience -->
            <div v-if="workExperiences.length > 0" class="mb-8">
              <h2 class="text-xl font-semibold text-gray-900 border-b-2 border-blue-500 pb-2 mb-4">Work Experience</h2>
              <div v-for="(exp, index) in workExperiences" :key="exp.id" class="mb-6 last:mb-0">
                <div class="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-800">{{ exp.position }}</h3>
                    <p class="text-blue-600 font-medium">{{ exp.company_name }}</p>
                  </div>
                  <p class="text-sm text-gray-500 mt-1 md:mt-0">
                    {{ exp.start_date }} - {{ exp.is_current === '1' ? 'Present' : exp.end_date }}
                  </p>
                </div>
                <p class="text-gray-700 mt-2">{{ exp.responsibilities }}</p>
                <p v-if="exp.location" class="text-sm text-gray-500 mt-1">{{ exp.location }}</p>
              </div>
            </div>

            <!-- Education -->
            <div v-if="educationList.length > 0" class="mb-8">
              <h2 class="text-xl font-semibold text-gray-900 border-b-2 border-blue-500 pb-2 mb-4">Education</h2>
              <div v-for="(edu, index) in educationList" :key="edu.id" class="mb-4 last:mb-0">
                <div class="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-800">{{ edu.field_of_study }}</h3>
                    <p class="text-gray-600">{{ edu.institute_name }}</p>
                  </div>
                  <p class="text-sm text-gray-500 mt-1 md:mt-0">{{ edu.start_year }} - {{ edu.end_year }}</p>
                </div>
                <p v-if="edu.result" class="text-sm text-gray-600 mt-1">Result: {{ edu.result }}</p>
              </div>
            </div>

            <!-- Skills from Professional Summary -->
            <div v-if="professionalSummary?.skills && professionalSummary.skills.length > 0" class="mb-8">
              <h2 class="text-xl font-semibold text-gray-900 border-b-2 border-blue-500 pb-2 mb-4">Skills</h2>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(skill, index) in professionalSummary.skills"
                  :key="index"
                  class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {{ skill }}
                </span>
              </div>
            </div>

            <!-- General Skills -->
            <div v-if="generalSkills.length > 0" class="mb-8">
              <h2 class="text-xl font-semibold text-gray-900 border-b-2 border-blue-500 pb-2 mb-4">General Skills</h2>
              <div class="space-y-4">
                <div v-for="skill in generalSkills" :key="skill.id" class="border-b border-gray-200 pb-3 last:border-0">
                  <div class="flex justify-between items-start mb-2">
                    <div>
                      <h3 class="text-lg font-semibold text-gray-800">{{ skill.name }}</h3>
                      <p v-if="skill.competencies?.length" class="text-sm text-gray-600 mt-1">
                        Competencies: {{ skill.competencies.join(', ') }}
                      </p>
                    </div>
                    <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      {{ skill.proficiency_level }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Software Skills -->
            <div v-if="softwareSkills.length > 0" class="mb-8">
              <h2 class="text-xl font-semibold text-gray-900 border-b-2 border-blue-500 pb-2 mb-4">Software Skills</h2>
              <div class="space-y-4">
                <div v-for="software in softwareSkills" :key="software.id" class="border-b border-gray-200 pb-3 last:border-0">
                  <div class="flex justify-between items-start mb-2">
                    <div>
                      <h3 class="text-lg font-semibold text-gray-800">{{ software.name }}</h3>
                      <div v-if="software.solutions?.length" class="mt-2">
                        <p class="text-sm text-gray-600 font-medium">Solutions:</p>
                        <div class="flex flex-wrap gap-1 mt-1">
                          <span
                            v-for="solution in software.solutions"
                            :key="solution.id"
                            class="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
                          >
                            {{ solution.name }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                      {{ software.pivot?.level || 'Not Specified' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Professional References -->
            <div v-if="professionalReferences.length > 0" class="mb-8">
              <h2 class="text-xl font-semibold text-gray-900 border-b-2 border-blue-500 pb-2 mb-4">Professional References</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="ref in professionalReferences" :key="ref.id" class="bg-gray-50 rounded-lg p-4">
                  <h3 class="text-lg font-semibold text-gray-800">{{ ref.name }}</h3>
                  <p class="text-blue-600 text-sm">{{ ref.designation }}</p>
                  <p v-if="ref.company_name" class="text-gray-600 text-sm mt-1">{{ ref.company_name }}</p>
                  <p v-if="ref.email" class="text-gray-500 text-sm mt-1">{{ ref.email }}</p>
                  <p v-if="ref.phone" class="text-gray-500 text-sm">{{ ref.phone }}</p>
                  <p v-if="ref.note" class="text-gray-700 text-sm mt-2 italic">"{{ ref.note }}"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </section>
</template>

<script setup>
import api from '@/config/api'
import { useAuthStore } from '@/stores/AuthStore'
import { ref, onMounted } from 'vue'



const loading = ref(true)
const error = ref(null)
const userId = ref('909')

// Data stores
const professionalReferences = ref([])
const generalSkills = ref([])
const professionalSummary = ref(null)
const educationList = ref([])
const softwareSkills = ref([])
const workExperiences = ref([])
const authStore = useAuthStore()
// ---------------- FETCH FUNCTION ----------------
const fetchResumeData = async () => {
  loading.value = true
  error.value = null

  try {
    const [
      referencesRes,
      skillsRes,
      summaryRes,
      educationRes,
      softwareRes,
      experiencesRes
    ] = await Promise.all([
      api().get('/professional-references', { params: { user_id: userId.value } }),
      api().get('/general-skill-by-user', { params: { user_id: userId.value } }),
      api().get('/professional-summary', { params: { user_id: userId.value } }),
      api().get('/user-education', { params: { user_id: userId.value } }),
      api().get('/end-user-software-list', { params: { user_id: userId.value } }),
      api().get('/user-experiences', { params: { user_id: userId.value } })
    ])


    professionalReferences.value = referencesRes.data?.data || []
    generalSkills.value = skillsRes.data?.data || []
    professionalSummary.value = summaryRes.data?.data || null
    educationList.value = educationRes.data?.data || []
    softwareSkills.value = softwareRes.data?.data || []
    workExperiences.value = experiencesRes.data?.data || []

  } catch (err) {
    console.error('Error fetching resume data:', err)
    error.value = 'Failed to load resume data. Please check your connection and try again.'
  } finally {
    loading.value = false
  }
}


const downloadPDF = () => {
  alert('PDF download functionality would be implemented here using libraries like jsPDF or html2pdf')
}

const togglePrint = () => {
  window.print()
}


onMounted(() => {
  fetchResumeData()
})
</script>

<style scoped>
/* Print styles */
@media print {
  button {
    display: none !important;
  }

  .bg-gradient-to-r {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .shadow-lg {
    box-shadow: none !important;
  }

  body {
    padding: 0;
    margin: 0;
  }

  .min-h-screen {
    min-height: auto !important;
  }
}

/* Animation for loading spinner */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
