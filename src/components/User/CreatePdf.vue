<template>
  <section id="view-resume" class="rounded-xl shadow-sm border m-2 border-gray-200 overflow-hidden">
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
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
            <h1 class="text-2xl font-bold text-gray-900">Generate Resume</h1>
            <div class="space-x-2">
                                  <button @click="handleEditResume"
                      class="inline-flex items-center px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                     <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M9.24264 18.9967H21V20.9967H3V16.754L12.8995 6.85453L17.1421 11.0972L9.24264 18.9967ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z"></path></svg>
                      Edit Resume
                    </button>
              <button @click="previewPDF"
                class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"
                  fill="currentColor">
                  <path
                    d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z">
                  </path>
                </svg>
                Preview Resume
              </button>
              <button @click="openSaveModal"
                class="inline-flex items-center px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"
                  fill="currentColor">
                  <path
                    d="M18 19H19V6.82843L17.1716 5H16V9H7V5H5V19H6V12H18V19ZM4 3H18L20.7071 5.70711C20.8946 5.89464 21 6.149 21 6.41421V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM8 14V19H16V14H8Z">
                  </path>
                </svg>
                Save Resume
              </button>
              <button @click="downloadPDF"
                class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download as PDF
              </button>
              <button @click="togglePrint"
                class="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print
              </button>

            </div>
          </div>
          <div v-if="pdfPreviewUrl" class="mb-6">
            <div class="bg-white rounded-xl shadow-lg p-4">
              <div class="flex justify-between items-center mb-2">
                <h2 class="text-lg font-semibold">PDF Preview</h2>
                <button @click="pdfPreviewUrl = null" class="text-red-500 text-sm hover:underline">
                  Close
                </button>
              </div>

              <iframe :src="pdfPreviewUrl" class="w-full h-[600px] border rounded-lg"></iframe>
            </div>
          </div>
          <!-- Resume Card -->
          <div v-else class="bg-white rounded-xl shadow-lg overflow-hidden">
            <!-- Profile Header -->
            <div class="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-10 text-white">
              <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
                <!-- Avatar -->
                <div class="flex-shrink-0">
                  <div
                    class="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                    <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                </div>

                <!-- Personal Info -->
                <div class="text-center md:text-left">
                  <h1 class="text-3xl font-bold">{{ authStore?.user?.name || 'User' }}</h1>
                  <p class="text-xl text-blue-100 mt-1">
                    {{ professionalReferences[0]?.designation || 'Professional' }}
                  </p>
                  <div class="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                    <div v-if="authStore?.user?.email" class="flex items-center text-sm">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span class="ml-1">{{ authStore?.user?.email }}</span>


                    </div>




                    <div v-if="professionalReferences[0]?.phone" class="flex items-center text-sm">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span class="ml-1">{{ professionalReferences[0].phone }}</span>
                    </div>
                    <div v-if="professionalReferences[0]?.company_name" class="flex items-center text-sm">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
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
                <h2 class="text-xl font-semibold text-gray-900 border-b-2 border-blue-500 pb-2 mb-4">
                  Professional Summary
                </h2>
                <p class="text-gray-700 leading-relaxed">{{ professionalSummary.summary }}</p>

                <!-- Stats -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div v-if="professionalSummary.experience_in_years" class="bg-gray-50 rounded-lg p-3 text-center">
                    <p class="text-2xl font-bold text-blue-600">
                      {{ professionalSummary.experience_in_years }}+
                    </p>
                    <p class="text-sm text-gray-600">Years Experience</p>
                  </div>
                  <div v-if="professionalSummary.client_served" class="bg-gray-50 rounded-lg p-3 text-center">
                    <p class="text-2xl font-bold text-blue-600">
                      {{ professionalSummary.client_served }}+
                    </p>
                    <p class="text-sm text-gray-600">Clients Served</p>
                  </div>
                  <div v-if="professionalSummary.project_completed" class="bg-gray-50 rounded-lg p-3 text-center">
                    <p class="text-2xl font-bold text-blue-600">
                      {{ professionalSummary.project_completed }}+
                    </p>
                    <p class="text-sm text-gray-600">Projects Completed</p>
                  </div>
                </div>
              </div>

              <!-- Work Experience -->
              <div v-if="workExperiences.length > 0" class="mb-8">
                <h2 class="text-xl font-semibold text-gray-900 border-b-2 border-blue-500 pb-2 mb-4">
                  Work Experience
                </h2>
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
                <h2 class="text-xl font-semibold text-gray-900 border-b-2 border-blue-500 pb-2 mb-4">
                  Education
                </h2>
                <div v-for="(edu, index) in educationList" :key="edu.id" class="mb-4 last:mb-0">
                  <div class="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h3 class="text-lg font-semibold text-gray-800">{{ edu.field_of_study }}</h3>
                      <p class="text-gray-600">{{ edu.institute_name }}</p>
                    </div>
                    <p class="text-sm text-gray-500 mt-1 md:mt-0">
                      {{ edu.start_year }} - {{ edu.end_year }}
                    </p>
                  </div>
                  <p v-if="edu.result" class="text-sm text-gray-600 mt-1">
                    Result: {{ edu.result }}
                  </p>
                </div>
              </div>

              <!-- Skills from Professional Summary -->
              <div v-if="professionalSummary?.skills && professionalSummary.skills.length > 0" class="mb-8">
                <h2 class="text-xl font-semibold text-gray-900 border-b-2 border-blue-500 pb-2 mb-4">
                  Skills
                </h2>
                <div class="flex flex-wrap gap-2">
                  <span v-for="(skill, index) in professionalSummary.skills" :key="index"
                    class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {{ skill }}
                  </span>
                </div>
              </div>

              <!-- General Skills -->
              <div v-if="generalSkills.length > 0" class="mb-8">
                <h2 class="text-xl font-semibold text-gray-900 border-b-2 border-blue-500 pb-2 mb-4">
                  General Skills
                </h2>
                <div class="space-y-4">
                  <div v-for="skill in generalSkills" :key="skill.id"
                    class="border-b border-gray-200 pb-3 last:border-0">
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
                <h2 class="text-xl font-semibold text-gray-900 border-b-2 border-blue-500 pb-2 mb-4">
                  Software Skills
                </h2>
                <div class="space-y-4">
                  <div v-for="software in softwareSkills" :key="software.id"
                    class="border-b border-gray-200 pb-3 last:border-0">
                    <div class="flex justify-between items-start mb-2">
                      <div>
                        <h3 class="text-lg font-semibold text-gray-800">{{ software.name }}</h3>
                        <div v-if="software.solutions?.length" class="mt-2">
                          <p class="text-sm text-gray-600 font-medium">Solutions:</p>
                          <div class="flex flex-wrap gap-1 mt-1">
                            <span v-for="solution in software.solutions" :key="solution.id"
                              class="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
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
                <h2 class="text-xl font-semibold text-gray-900 border-b-2 border-blue-500 pb-2 mb-4">
                  Professional References
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div v-for="ref in professionalReferences" :key="ref.id" class="bg-gray-50 rounded-lg p-4">
                    <h3 class="text-lg font-semibold text-gray-800">{{ ref.name }}</h3>
                    <p class="text-blue-600 text-sm">{{ ref.designation }}</p>
                    <p v-if="ref.company_name" class="text-gray-600 text-sm mt-1">
                      {{ ref.company_name }}
                    </p>
                    <p v-if="ref.email" class="text-gray-500 text-sm mt-1">{{ ref.email }}</p>
                    <p v-if="ref.phone" class="text-gray-500 text-sm">{{ ref.phone }}</p>
                    <p v-if="ref.note" class="text-gray-700 text-sm mt-2 italic">
                      "{{ ref.note }}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ================= SAVE RESUME MODAL ================= -->
    <Transition name="modal">
      <div v-if="showSaveModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">

        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeSaveModal"></div>

        <!-- Modal Card -->
        <div class="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 z-10">

          <h2 class="text-lg font-bold mb-4">Save Resume</h2>

          <!-- Input -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Name <span class="text-red-500">*</span>
            </label>
            <input v-model="resumeName" type="text" placeholder="e.g. Frontend Developer CV"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
          </div>

          <!-- Actions -->
          <div class="flex gap-3">
            <button @click="closeSaveModal" :disabled="saving"
              class="flex-1 border border-gray-300 rounded-lg py-2 text-sm hover:bg-gray-50">
              Cancel
            </button>

            <button @click="handleSaveResume" :disabled="saving"
              class="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm flex items-center justify-center gap-2">
              <svg v-if="saving" class="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
              </svg>
              {{ saving ? 'Saving...' : 'Save' }}
            </button>
          </div>

        </div>
      </div>
    </Transition>
    <!-- ================= END MODAL ================= -->
  </section>
</template>

<script setup>
import api from '@/config/api'
import { useAuthStore } from '@/stores/AuthStore'
import { ref, onMounted } from 'vue'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import Swal from 'sweetalert2'
import { useResumeViewStore } from '@/stores/ResumeViewStore'

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
const pdfPreviewUrl = ref(null)

const resumeViewStore = useResumeViewStore()

const handleEditResume = () => {
  // Navigate to edit view with personal information section
  resumeViewStore.navigateToEdit('personal-information')
  
  // Optional: Scroll to the section after a short delay
  setTimeout(() => {
    const element = document.getElementById('personal-information')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, 100)
}

// ---------------- FETCH FUNCTION ----------------
const fetchResumeData = async () => {
  loading.value = true
  error.value = null

  try {
    const [referencesRes, skillsRes, summaryRes, educationRes, softwareRes, experiencesRes] =
      await Promise.all([
        api().get('/professional-references', { params: { user_id: userId.value } }),
        api().get('/general-skill-by-user', { params: { user_id: userId.value } }),
        api().get('/professional-summary', { params: { user_id: userId.value } }),
        api().get('/user-education', { params: { user_id: userId.value } }),
        api().get('/end-user-software-list', { params: { user_id: userId.value } }),
        api().get('/user-experiences', { params: { user_id: userId.value, with: 'user' } })
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

// ---------------- PDF DOWNLOAD FUNCTION ----------------

const previewPDF = () => {
  if (pdfPreviewUrl.value) {
    URL.revokeObjectURL(pdfPreviewUrl.value)
  }

  const doc = generatePDF()
  const blob = doc.output('blob')
  pdfPreviewUrl.value = URL.createObjectURL(blob)
}

const downloadPDF = () => {
  const doc = generatePDF()
  doc.save(`${authStore?.user?.name || 'Resume'}_CV.pdf`)
}
const generatePDF = () => {
  const doc = new jsPDF()
  let yPos = 20
  const margin = 20
  const pageHeight = 280

  const checkPage = (currentY, needed = 10) => {
    if (currentY + needed > pageHeight) {
      doc.addPage()
      return 20
    }
    return currentY
  }

  // ===== HEADER =====
  doc.setFillColor(37, 99, 235)
  doc.rect(0, 0, 210, 45, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text(authStore?.user?.name || 'Professional Name', margin, 22)

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text(`Email: ${authStore?.user?.email || 'Professional Email'}`, margin, 30)

  yPos = 55
  doc.setTextColor(0, 0, 0)

  // ===== SECTION TITLE =====
  const sectionTitle = (title) => {
    yPos = checkPage(yPos, 15)
    doc.setFontSize(13)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(37, 99, 235)
    doc.text(title, margin, yPos)
    yPos += 6

    doc.setDrawColor(200)
    doc.line(margin, yPos, 190, yPos)
    yPos += 6
  }

  // ===== SUMMARY =====
  if (professionalSummary.value?.summary) {
    sectionTitle('Professional Summary')

    doc.setFontSize(10)
    doc.setTextColor(75, 85, 99)
    const text = doc.splitTextToSize(professionalSummary.value.summary, 170)
    doc.text(text, margin, yPos)
    yPos += text.length * 5 + 6
  }

  // ===== WORK EXPERIENCE =====
  if (workExperiences.value?.length) {
    sectionTitle('Work Experience')

    workExperiences.value.forEach((exp) => {
      yPos = checkPage(yPos, 20)

      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(31, 41, 55)
      doc.text(exp.position || '', margin, yPos)

      doc.setFontSize(10)
      doc.setTextColor(37, 99, 235)
      doc.text(exp.company_name || '', margin, yPos + 5)

      doc.setFontSize(9)
      doc.setTextColor(107, 114, 128)
      doc.text(
        `${exp.start_date} - ${exp.is_current === '1' ? 'Present' : exp.end_date}`,
        190,
        yPos,
        { align: 'right' }
      )

      yPos += 10

      const resp = doc.splitTextToSize(exp.responsibilities || '', 170)
      doc.setTextColor(75, 85, 99)
      doc.text(resp, margin, yPos)
      yPos += resp.length * 5 + 6
    })
  }

  // ===== EDUCATION =====
  if (educationList.value?.length) {
    sectionTitle('Education')

    educationList.value.forEach((edu) => {
      yPos = checkPage(yPos, 15)

      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.text(edu.field_of_study || '', margin, yPos)

      doc.setFontSize(10)
      doc.setTextColor(75, 85, 99)
      doc.text(edu.institute_name || '', margin, yPos + 5)

      doc.setFontSize(9)
      doc.setTextColor(107, 114, 128)
      doc.text(`${edu.start_year} - ${edu.end_year}`, 190, yPos, {
        align: 'right'
      })

      yPos += 12
    })
  }

  // ===== SKILLS =====
  if (professionalSummary.value?.skills?.length) {
    sectionTitle('Skills')

    const skills = professionalSummary.value.skills.join(', ')
    const split = doc.splitTextToSize(skills, 170)

    doc.setFontSize(10)
    doc.setTextColor(55, 65, 81)
    doc.text(split, margin, yPos)
    yPos += split.length * 5 + 6
  }

  // ===== GENERAL SKILLS =====
  if (generalSkills.value?.length) {
    sectionTitle('General Skills')

    autoTable(doc, {
      startY: yPos,
      head: [['Skill', 'Competencies', 'Level']],
      body: generalSkills.value.map((s) => [
        s.name,
        s.competencies?.join(', ') || '-',
        s.proficiency_level || '-'
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [37, 99, 235] },
      margin: { left: margin, right: margin }
    })

    yPos = doc.lastAutoTable.finalY + 10
  }

  // ===== SOFTWARE SKILLS =====
  if (softwareSkills.value?.length) {
    sectionTitle('Software Skills')

    autoTable(doc, {
      startY: yPos,
      head: [['Software', 'Tools', 'Level']],
      body: softwareSkills.value.map((s) => [
        s.name,
        s.solutions?.map((sol) => sol.name).join(', ') || '-',
        s.pivot?.level || '-'
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [124, 58, 237] },
      margin: { left: margin, right: margin }
    })

    yPos = doc.lastAutoTable.finalY + 10
  }

  // ===== REFERENCES =====
  if (professionalReferences.value?.length) {
    sectionTitle('Professional References')

    autoTable(doc, {
      startY: yPos,
      head: [['Name', 'Designation', 'Company', 'Contact']],
      body: professionalReferences.value.map((ref) => [
        ref.name,
        ref.designation,
        ref.company_name || '-',
        `${ref.email || ''} ${ref.phone || ''}`
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [16, 185, 129] },
      margin: { left: margin, right: margin }
    })

    yPos = doc.lastAutoTable.finalY + 10
  }

  // ===== FOOTER =====
  const pages = doc.getNumberOfPages()
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i)

    doc.setDrawColor(200)
    doc.line(margin, 282, 190, 282)

    doc.setFontSize(8)
    doc.setTextColor(150)
    doc.text('Generated by Hi-Tech SoftSys', margin, 288)
    doc.text(`Page ${i} of ${pages}`, 190, 288, { align: 'right' })
  }

  return doc
}
const togglePrint = () => {
  window.print()
}

const showSaveModal = ref(false)
const saving = ref(false)
const resumeName = ref('')

const openSaveModal = () => {
  resumeName.value = ''
  showSaveModal.value = true
}

const closeSaveModal = () => {
  if (saving.value) return
  showSaveModal.value = false
}

const handleSaveResume = async () => {
  if (!resumeName.value.trim()) {
    Swal.fire({
      icon: 'warning',
      title: 'Name required',
      text: 'Please enter a resume name',
    })
    return
  }

  saving.value = true

  try {
    const payload = {
      title: resumeName.value,
      template: 'default', // 🔥 change if you have multiple templates

      resume: {
        user_id: userId.value,

        professional_summary: professionalSummary.value,
        work_experiences: workExperiences.value,
        education: educationList.value,
        general_skills: generalSkills.value,
        software_skills: softwareSkills.value,
        professional_references: professionalReferences.value,
      }
    }

    console.log('Sending Payload:', payload) // 🔍 debug

    await api().post('/user-resumes', payload)

    showSaveModal.value = false

    await Swal.fire({
      icon: 'success',
      title: 'Saved Resume',
      text: 'Your resume has been saved successfully!',
      confirmButtonColor: '#2563eb',
    })

  } catch (err) {
    console.error('Save Resume Error:', err)

    Swal.fire({
      icon: 'error',
      title: 'Failed',
      text: err?.response?.data?.message || 'Something went wrong',
    })
  } finally {
    saving.value = false
  }
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
