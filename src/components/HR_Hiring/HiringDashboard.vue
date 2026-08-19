<!-- src/components/hiring/HiringDashboard.vue -->
<template>
  <div class="min-h-screen bg-slate-100 p-6">
    <div class="px-10 mx-auto">
      <!-- Header -->
      <Header
        :candidate="candidate"
        :current-step-name="currentStepName"
        @back="goBack"
        @view-resume="viewResume"
      />

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-6 text-gray-500">
        Loading candidate...
      </div>

      <template v-else>
        <!-- Progress Bar -->
        <ProgressBar
          :steps="steps"
          :current-status="currentStatus"
          :progress-width="progressWidth"
        />

        <!-- Candidate Details -->
        <CandidateDetails :candidate="candidate" />

        <!-- Job Details -->
        <JobDetails :candidate="candidate" />

        <!-- Interview Feedback -->
        <InterviewFeedback
          :candidate="candidate"
          :is-editing="isEditingFeedback"
          :is-saving="isSavingFeedback"
          :feedback-form="feedbackForm"
          @edit-started="startEditFeedback"
          @edit-cancelled="cancelEditFeedback"
          @save-requested="saveFeedbackData"
        />

        <!-- Selection & Offer -->
        <SelectionOffer
          :candidate="candidate"
          @open-offer-modal="openOfferModal"
          @download-offer="downloadExistingOfferLetter"
        />

        <!-- Access Link -->
        <AccessLink
          :candidate="candidate"
          :has-access-token="hasAccessToken"
          :access-token-expiry="accessTokenExpiry"
          :full-access-link="fullAccessLink"
          :generating="generatingLink"
          :link-copied="linkCopied"
          @generate-link="generateAccessLink"
          @copy-link="copyAccessLink"
        />

        <!-- Verification Data -->
        <VerificationData
          :candidate="candidate"
          :is-editing="isEditingVerification"
          :verification-form="verificationForm"
          :verifying="verifying"
          :reference-checked="referenceChecked"
          :background-verified="backgroundVerified"
          :verification-progress="verificationProgress"
          @edit-started="startEditVerification"
          @edit-cancelled="isEditingVerification = false"
          @save-requested="saveVerificationData"
          @mark-verified="markVerified"
        />

        <!-- Documentation -->
        <Documentation
          :candidate="candidate"
          :documents-verified="documentsVerified"
          :verifying="verifying.documents"
          :is-editing-signature="isEditingSignature"
          :signature-preview="signaturePreview"
          @mark-verified="() => markVerified('documents_verified')"
          @signature-upload="uploadSignature"
          @signature-cancel="cancelSignatureEdit"
          @handle-file="handleSignatureUpload"
        />

        <!-- Final Action -->
        <FinalAction
          :steps="steps"
          :current-status-index="currentStatusIndex"
          :current-status="currentStatus"
          :all-required-completed="allRequiredStepsCompleted"
          @move-to-next="moveToNextStep"
        />
      </template>
    </div>

    <!-- Offer Letter Modal -->
    <OfferLetterModal
      :show="showOfferModal"
      :candidate="candidate"
      :offer-form="offerForm"
      @close="closeOfferModal"
      @save-details="saveOfferDetails"
      @generate-pdf="generateAndDownloadPDF"
      @update-offer-field="handleOfferFieldUpdate"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/config/api'
import Swal from 'sweetalert2'

// Import child components
import Header from './Header.vue'
import ProgressBar from './ProgressBar.vue'
import CandidateDetails from './CandidateDetails.vue'
import JobDetails from './JobDetails.vue'
import InterviewFeedback from './InterviewFeedback.vue'
import SelectionOffer from './SelectionOffer.vue'
import AccessLink from './AccessLink.vue'
import VerificationData from './VerificationData.vue'
import Documentation from './Documentation.vue'
import FinalAction from './FinalAction.vue'
import OfferLetterModal from './OfferLetterModal.vue'

const baseurl = import.meta.env.VITE_BASE_URL
const route = useRoute()
const router = useRouter()
const candidateId = route.params.id

// ===== STATE =====
const loading = ref(false)
const candidate = ref({})
const showOfferModal = ref(false)
const generatingLink = ref(false)
const linkCopied = ref(false)

// Feedback state
const isEditingFeedback = ref(false)
const isSavingFeedback = ref(false)
const feedbackForm = reactive({
  technical_skills: '',
  communication: '',
  cultural_fit: '',
  problem_solving: '',
  overall_comment: '',
  recommendation: '',
  expected_salary: null
})

// Verification state
const isEditingVerification = ref(false)
const verificationForm = reactive({
  address: '', marital_status: '', spouse_name: '', spouse_number: '',
  mother_name: '', father_name: '', parent_name: '', parent_relation: '',
  parent_phone_number: '', siblings_name: '', siblings_relation: '',
  siblings_phone_number: '', reference_one_name: '', reference_one_number: '',
  reference_one_designation: '', reference_one_email: '', reference_two_name: '',
  reference_two_number: '', reference_two_designation: '', reference_two_email: ''
})

const verifying = reactive({ reference: false, background: false, documents: false })

// Signature state
const isEditingSignature = ref(false)
const selectedSignatureFile = ref(null)
const signaturePreview = ref(null)

// Offer form state
const offerForm = reactive({
  company_name: 'Hi-Tech Softsys',
  company_address: 'House # 123, Road # 45, Gulshan Avenue, Dhaka-1212, Bangladesh',
  hr_name: 'Ahsan Ansary',
  hr_title: 'Head of Human Resources',
  candidate_name: '',
  candidate_email: '',
  job_title: '',
  expected_salary: null,
  negotiated_salary: null,
  offering_date: new Date().toISOString().split('T')[0],
  joining_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  employment_type: 'Full-time (Contractual)',
  responsibility: `Design and develop innovative web applications that draw the users' attention.
Write reusable, effective, and scalable JavaScript code.
Build modular and reusable components and libraries.
Implement front-end components with progressive Vue.js framework.
Translate the clients' requirements into technical specifications and develop codes accordingly.
Test, update and optimize the application for performance and security.
Skills: HTML5, CSS3, JavaScript, Vue.js, Laravel, REST APIs, MySQL, Git.`,
  benefits: `Competitive salary package with annual performance review
Two festival bonuses (Eid-ul-Fitr & Eid-ul-Adha)
Contributory Provident Fund after confirmation
Weekly 2 holidays (Friday & Saturday)
Yearly 20 days paid leave, 10 days casual leave, 15 days sick leave
Comprehensive health insurance for employee and immediate family
Subsidized lunch and transportation facilities
Professional development budget for certifications and training
Friendly and inclusive work environment`,
  terms: `This offer is subject to verification of your educational and professional credentials. Employment is at-will and may be terminated by either party with 30 days' written notice during probation period, and 60 days' notice after confirmation. You agree to comply with all company policies, maintain confidentiality of proprietary information, and assign all work product rights to the company. This offer expires within 7 calendar days if not accepted.`,
  firing: `Violating sexual harassment policy
Not following instruction from management
Refuse to work as per company policy
Failure to deliver assigned tasks
Falsifying personal information
Disclosing company internal/proprietary info without permission
Any disciplinary actions
Late more than 3 times/month or 10/year
Absence without prior approval
Taking company data home without permission
Failure to share codes with team
Misleading task hours
Failure to join office without approval
Destroying/deleting official data
Cheating with time card
Misleading task completion
Penalty: 2 months' salary cut + cost of damage (2 months to 2 Crore BDT)`,
  signatory_name: 'Ahsan Ansary',
  signatory_title: 'Head of Human Resources',
  signature_date: new Date().toISOString().split('T')[0]
})

// ===== STEPS & STATUS =====
const steps = [
  { id: 1, label: 'ShortList' },
  { id: 2, label: 'Interview' },
  { id: 3, label: 'Selection & Initial Offer' },
  { id: 4, label: 'Verification' },
  { id: 5, label: 'Documentation' },
  { id: 6, label: 'Joining & Setup' },
  { id: 7, label: 'Probation & Confirmation' }
]

const statusMap = {
  1: '1. ShortList', 2: '2. Interview', 3: '3. Selection & Initial Offer',
  4: '4. Verification', 5: '5. Documentation', 6: '6. Joining & Setup',
  7: '7. Probation & Confirmation', 10: 'Rejected'
}

const currentStatus = computed(() => Number(candidate.value?.status || 1))
const currentStatusIndex = computed(() => {
  const status = currentStatus.value
  if (status === 10) return steps.length - 1
  if (status >= 1 && status <= 7) return status - 1
  return -1
})
const currentStepName = computed(() => {
  const status = currentStatus.value
  if (status === 10) return 'Rejected'
  if (status >= 2 && status <= 7) return statusMap[status]
  return 'Application Received'
})

const progressWidth = computed(() => {
  if (!steps.length) return '0%'
  const totalSteps = steps.length - 1
  const idx = currentStatusIndex.value
  if (idx <= 0) return '0%'
  if (idx >= totalSteps) return '100%'
  return `${(idx / totalSteps) * 100}%`
})

// ===== COMPUTED HELPERS =====
const hasAccessToken = computed(() => {
  const token = candidate.value?.access_token
  return token && token !== 'null' && token !== '' && token !== undefined && token !== null
})
const accessTokenExpiry = computed(() => candidate.value?.access_token_expires_at || null)
const fullAccessLink = computed(() => {
  if (!hasAccessToken.value) return ''
  return `${window.location.origin}/applicant-access/${candidate.value?.access_token}`
})
const referenceChecked = computed(() => candidate.value?.reference_checked || '0')
const backgroundVerified = computed(() => candidate.value?.background_verified || '0')
const documentsVerified = computed(() => candidate.value?.documents_verified || '0')
const verificationProgress = computed(() => {
  let count = 0
  if (referenceChecked.value === '1') count++
  if (backgroundVerified.value === '1') count++
  return Math.round((count / 2) * 100)
})

const allRequiredStepsCompleted = computed(() => {
  const currentIdx = currentStatusIndex.value
  const currentStatusValue = currentStatus.value
  if (currentIdx === steps.length - 1) return false
  if (currentStatusValue === 2) {
    return !!(candidate.value?.technical_skills && candidate.value?.recommendation)
  }
  if (currentStatusValue === 3) return true
  if (currentStatusValue === 4) {
    return referenceChecked.value === '1' && backgroundVerified.value === '1'
  }
  if (currentStatusValue === 5) {
    return candidate.value?.documents_verified === '1' && candidate.value?.signature_uploaded === '1'
  }
  return true
})

// ===== ACTIONS =====
const fetchCandidate = async () => {
  loading.value = true
  try {
    const res = await api().get(`/applied-jobs/${candidateId}`)
    const found = res.data.data
    if (found) {
      candidate.value = found
      // Prefill forms
      offerForm.candidate_name = found.full_name || ''
      offerForm.candidate_email = found.email || ''
      offerForm.job_title = found.job?.title || ''
      offerForm.expected_salary = found.expected_salary || ''
      offerForm.negotiated_salary = found.negotiated_salary || found.expected_salary || ''
      offerForm.offering_date = found.offering_date || new Date().toISOString().split('T')[0]
      offerForm.joining_date = found.joining_date || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

const goBack = () => router.back()
const viewResume = () => {
  if (!candidate.value?.resume) return alert('Resume not available')
  window.open(`${baseurl}/${candidate.value.resume}`, '_blank')
}

// Feedback handlers
const getRatingLabel = (rating) => ({ 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very Good', 5: 'Excellent' }[rating] || '')
const getRecommendationClass = (rec) => ({ 'Hire': 'bg-blue-100 text-blue-700', 'Hold': 'bg-yellow-100 text-yellow-700', 'No Hire': 'bg-red-100 text-red-700' }[rec] || 'bg-gray-100 text-gray-700')
const getRecommendationValue = (rec) => ({ 'Hire': 'hire', 'Hold': 'hold', 'No Hire': 'no_hire' }[rec] || rec)

const startEditFeedback = () => {
  feedbackForm.technical_skills = candidate.value.technical_skills || ''
  feedbackForm.communication = candidate.value.communication || ''
  feedbackForm.cultural_fit = candidate.value.cultural_fit || ''
  feedbackForm.problem_solving = candidate.value.problem_solving || ''
  feedbackForm.overall_comment = candidate.value.overall_comment || ''
  feedbackForm.recommendation = candidate.value.recommendation || ''
  feedbackForm.expected_salary = candidate.value.expected_salary || null
  isEditingFeedback.value = true
}
const cancelEditFeedback = () => { isEditingFeedback.value = false }

const validateFeedbackForm = () => {
  if (!feedbackForm.technical_skills) return 'Technical Skills rating is required'
  if (!feedbackForm.communication) return 'Communication rating is required'
  if (!feedbackForm.cultural_fit) return 'Cultural Fit rating is required'
  if (!feedbackForm.problem_solving) return 'Problem Solving rating is required'
  if (!feedbackForm.overall_comment?.trim()) return 'Overall comment is required'
  if (!feedbackForm.recommendation) return 'Recommendation is required'
  if (!feedbackForm.expected_salary || feedbackForm.expected_salary <= 0) return 'Valid expected salary is required'
  return null
}

const saveFeedbackData = async () => {
  const error = validateFeedbackForm()
  if (error) return Swal.fire({ icon: 'warning', title: 'Validation Error', text: error, confirmButtonColor: '#f59e0b' })
  isSavingFeedback.value = true
  try {
    await api().post(`/applied-jobs/${candidate.value.id}`, {
      technical_skills: feedbackForm.technical_skills,
      communication: feedbackForm.communication,
      cultural_fit: feedbackForm.cultural_fit,
      problem_solving: feedbackForm.problem_solving,
      overall_comment: feedbackForm.overall_comment,
      recommendation: getRecommendationValue(feedbackForm.recommendation),
      expected_salary: feedbackForm.expected_salary,
      _method: "PUT"
    })
    // Update local state
    Object.assign(candidate.value, { ...feedbackForm, recommendation: feedbackForm.recommendation })
    Swal.fire({ icon: 'success', title: 'Success', text: 'Interview feedback updated!', confirmButtonColor: '#4f46e5' })
    isEditingFeedback.value = false
  } catch (err) {
    Swal.fire({ icon: 'error', title: 'Error', text: err.response?.data?.message || 'Failed to update feedback', confirmButtonColor: '#ef4444' })
  } finally {
    isSavingFeedback.value = false
  }
}

// Verification handlers
const startEditVerification = () => {
  Object.keys(verificationForm).forEach(key => { verificationForm[key] = candidate.value[key] || '' })
  isEditingVerification.value = true
}
const saveVerificationData = async () => {
  try {
    await api().post(`/applied-jobs/${candidate.value.id}`, { ...verificationForm, _method: "PUT" })
    Object.keys(verificationForm).forEach(key => { candidate.value[key] = verificationForm[key] })
    isEditingVerification.value = false
    Swal.fire({ icon: 'success', title: 'Success', text: 'Verification data updated!', confirmButtonColor: '#4f46e5' })
  } catch (err) {
    Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to update verification data', confirmButtonColor: '#ef4444' })
  }
}

const markVerified = async (field) => {
  const fieldMap = { reference_checked: 'reference', background_verified: 'background', documents_verified: 'documents' }
  const key = fieldMap[field]
  verifying[key] = true
  try {
    await api().post(`/applied-jobs/${candidate.value.id}`, { [field]: '1', _method: "PUT" })
    candidate.value[field] = '1'
    Swal.fire({ icon: 'success', title: 'Verified!', text: `${field.replace('_', ' ')} marked as verified`, timer: 1500, showConfirmButton: false })
  } catch (err) {
    Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to update verification', confirmButtonColor: '#ef4444' })
  } finally {
    verifying[key] = false
  }
}

// Signature handlers
const handleSignatureUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    selectedSignatureFile.value = file
    signaturePreview.value = URL.createObjectURL(file)
  }
}
const uploadSignature = async () => {
  if (!selectedSignatureFile.value) return Swal.fire({ icon: 'warning', title: 'No File', text: 'Select a signature file first', confirmButtonColor: '#f59e0b' })
  const formData = new FormData()
  formData.append('signature', selectedSignatureFile.value)
  formData.append('_method', 'PUT')
  try {
    await api().post(`/applied-jobs/${candidate.value.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    Swal.fire({ icon: 'success', title: 'Success', text: 'Signature updated!', confirmButtonColor: '#4f46e5' })
    isEditingSignature.value = false
    selectedSignatureFile.value = null
    signaturePreview.value = null
    fetchCandidate()
  } catch (err) {
    Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to update signature', confirmButtonColor: '#ef4444' })
  }
}
const cancelSignatureEdit = () => {
  if (signaturePreview.value) URL.revokeObjectURL(signaturePreview.value)
  signaturePreview.value = null
  selectedSignatureFile.value = null
  isEditingSignature.value = false
}

// Access link handlers
const generateAccessLink = async () => {
  generatingLink.value = true
  try {
    await api().post(`/applied-jobs/${candidateId}/generate-link`)
    Swal.fire({ icon: 'success', title: 'Success', text: 'Access link generated!', timer: 1500, showConfirmButton: false })
    await copyAccessLink()
    fetchCandidate()
  } catch (err) {
    Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to generate link', confirmButtonColor: '#ef4444' })
  } finally {
    generatingLink.value = false
  }
}
const copyAccessLink = async () => {
  try {
    await navigator.clipboard.writeText(fullAccessLink.value)
    linkCopied.value = true
    setTimeout(() => linkCopied.value = false, 3000)
  } catch (err) {
    alert('Failed to copy link. Please copy manually.')
  }
}

// Offer modal handlers
const openOfferModal = () => {
  offerForm.candidate_name = candidate.value.full_name || ''
  offerForm.candidate_email = candidate.value.email || ''
  offerForm.job_title = candidate.value.job?.title || ''
  offerForm.expected_salary = candidate.value.expected_salary || ''
  offerForm.negotiated_salary = candidate.value.negotiated_salary || candidate.value.expected_salary || ''
  offerForm.offering_date = candidate.value.offering_date || new Date().toISOString().split('T')[0]
  offerForm.joining_date = candidate.value.joining_date || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  showOfferModal.value = true
}
const closeOfferModal = () => { showOfferModal.value = false }

const updateCandidateOfferDetails = async () => {
  try {
    await api().post(`/applied-jobs/${candidate.value.id}`, {
      joining_date: offerForm.joining_date,
      negotiated_salary: offerForm.negotiated_salary,
      offering_date: offerForm.offering_date,
      _method: "PUT"
    })
    candidate.value.joining_date = offerForm.joining_date
    candidate.value.negotiated_salary = offerForm.negotiated_salary
    candidate.value.offering_date = offerForm.offering_date
  } catch (err) {
    console.error('Failed to update offer details:', err)
    throw err
  }
}

let saveTimeout = null
const saveOfferDetailsDebounced = (callback, delay = 1500) => {
  if (saveTimeout) clearTimeout(saveTimeout)
  saveTimeout = setTimeout(callback, delay)
}

const handleOfferFieldUpdate = (field, value) => {
  offerForm[field] = value
  saveOfferDetailsDebounced(async () => {
    try {
      await updateCandidateOfferDetails()
    } catch (err) {
      console.error('Auto-save failed:', err)
    }
  })
}

const saveOfferDetails = async () => {
  try {
    await updateCandidateOfferDetails()
    Swal.fire({ icon: 'success', title: 'Saved!', text: 'Offer details updated', timer: 1500, showConfirmButton: false })
  } catch (err) {
    Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to save offer details', confirmButtonColor: '#ef4444' })
  }
}

// PDF Generation (simplified for brevity - keep your existing generateAndDownloadPDF logic here)
const formatListItems = (data) => {
  if (!data) return []
  if (typeof data === 'string') return data.split('\n').filter(l => l.trim())
  return []
}
const formatDate = (dateString) => dateString ? new Date(dateString).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'
const formatNumber = (num) => num ? Number(num).toLocaleString() : '0'
const formatExpiryDate = (dateString) => dateString ? new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A'

const generateAndDownloadPDF = async () => {
  // Keep your existing PDF generation logic here (jsPDF + html2canvas)
  // For brevity, I'm not duplicating the full 200+ line function
  // Just ensure it uses offerForm data and candidate data as before
  await import('jspdf')
  await import('html2canvas')
  // ... your existing PDF code ...
  closeOfferModal()
}

const downloadExistingOfferLetter = async () => {
  if (!candidate.value.offering_date) return alert('No offer letter found. Create one first.')
  // Prefill offerForm and generate PDF
  openOfferModal()
  setTimeout(() => generateAndDownloadPDF(), 100)
}

const moveToNextStep = async () => {
  if (!allRequiredStepsCompleted.value) return
  const currentVal = currentStatus.value
  let newStatus = currentVal + 1
  if (newStatus > 7) return

  // Validation for Verification stage
  if (currentVal === 4 && (referenceChecked.value !== '1' || backgroundVerified.value !== '1')) {
    const missing = []
    if (referenceChecked.value !== '1') missing.push('Reference Check')
    if (backgroundVerified.value !== '1') missing.push('Background Verification')
    return Swal.fire({ icon: 'warning', title: 'Incomplete', html: `<p>Complete: ${missing.join(', ')}</p>`, confirmButtonColor: '#f59e0b' })
  }

  // Validation for Documentation stage
  if (currentVal === 5 && (candidate.value?.documents_verified !== '1' || candidate.value?.signature_uploaded !== '1')) {
    const missing = []
    if (candidate.value?.documents_verified !== '1') missing.push('Document Verification')
    if (candidate.value?.signature_uploaded !== '1') missing.push('Signature Upload')
    return Swal.fire({ icon: 'warning', title: 'Incomplete', html: `<p>Complete: ${missing.join(', ')}</p>`, confirmButtonColor: '#f59e0b' })
  }

  try {
    await api().post(`/applied-jobs/${candidate.value.id}`, { status: newStatus, _method: "PUT" })
    candidate.value.status = newStatus
    Swal.fire({ icon: 'success', title: 'Stage Updated', text: `Moved to ${steps[newStatus - 1].label}`, timer: 2000, showConfirmButton: false })
  } catch (err) {
    Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to update status', confirmButtonColor: '#ef4444' })
  }
}

onMounted(fetchCandidate)
</script>
