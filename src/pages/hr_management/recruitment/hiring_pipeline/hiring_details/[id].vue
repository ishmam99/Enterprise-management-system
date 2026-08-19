<template>
  <div class="min-h-screen bg-slate-100 p-6 relative">
    <div class="px-10 mx-auto">
      <Header
        :candidate="candidate"
        :current-step-name="currentStepName"
        @back="goBack"
        @view-resume="viewResume"
      />

      <div v-if="loading" class="text-center py-6 text-gray-500">
        Loading candidate...
      </div>

      <template v-else>
        <ProgressBar
          :steps="steps"
          :current-status="currentStatus"
          :progress-width="progressWidth"
          @step-click="handleManualScroll"
        />

        <div ref="section_1">
          <CandidateDetails :candidate="candidate" />
        </div>

        <div ref="section_2">
          <InterviewFeedback
            :candidate="candidate"
            :is-editing="isEditingFeedback"
            :is-saving="isSavingFeedback"
            :feedback-form="feedbackForm"
            @edit-started="startEditFeedback"
            @edit-cancelled="cancelEditFeedback"
            @save-requested="saveFeedbackData"
          />
        </div>

        <div ref="section_3">
          <SelectionOffer
            :candidate="candidate"
            @open-offer-modal="openOfferModal"
            @download-offer="downloadExistingOfferLetter"
            :has-access-token="hasAccessToken"
            :access-token-expiry="accessTokenExpiry"
            :full-access-link="fullAccessLink"
            :generating="generatingLink"
            :link-copied="linkCopied"
            @generate-link="generateAccessLink"
            @copy-link="copyAccessLink"
          />
        </div>

        <div ref="section_4">
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
        </div>

        <div ref="section_5">
     <Documentation
  :candidate="candidate"
  :verifying="verifying.documents"
  :is-editing-signature="isEditingSignature"
  :signature-preview="signaturePreview"
  :base-url="baseurl"
  @verify-docs="markVerified"
  @handle-file="handleSignatureUpload"
  @save-signature="uploadSignature"
  @cancel-signature="cancelSignatureEdit"
  @start-edit-signature="isEditingSignature = true"
/>
        </div>

        <div ref="section_6">
          <FinalAction
            :steps="steps"
            :current-status-index="currentStatusIndex"
            :current-status="currentStatus"
            :all-required-completed="allRequiredStepsCompleted"
            @move-to-next="moveToNextStep"
          />
        </div>
      </template>
    </div>

    <OfferLetterModal
      :show="showOfferModal"
      :candidate="candidate"
      :offer-form="offerForm"
      @close="closeOfferModal"
      @save-details="saveOfferDetails"
      @generate-pdf="generateAndDownloadPDF"
      @update-offer-field="handleOfferFieldUpdate"
    />

<transition name="fade">
  <button
    v-if="showBackToTop"
    @click="scrollToTop"
    class="fixed bottom-8 right-8 px-5 py-3 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white rounded-full shadow-[0_10px_25px_-5px_rgba(124,58,237,0.5)] hover:shadow-[0_20px_35px_-5px_rgba(124,58,237,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 z-50 flex items-center gap-2 group border border-white/20 backdrop-blur-sm"
  >
    <div class="bg-white/20 p-1.5 rounded-full group-hover:bg-white/30 transition-colors">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 group-hover:-translate-y-1 transition-transform duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </div>

    <span class="text-sm font-bold tracking-wide uppercase drop-shadow-sm">
      Back to top
    </span>
  </button>
</transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/config/api'
import Swal from 'sweetalert2'

// Child Imports
import Header from '@/Components/HR_Hiring/Header.vue'
import ProgressBar from '@/Components/HR_Hiring/ProgressBar.vue'
import CandidateDetails from '@/Components/HR_Hiring/CandidateDetails.vue'
import InterviewFeedback from '@/Components/HR_Hiring/InterviewFeedback.vue'
import SelectionOffer from '@/Components/HR_Hiring/SelectionOffer.vue'
import VerificationData from '@/Components/HR_Hiring/VerificationData.vue'
import Documentation from '@/Components/HR_Hiring/Documentation.vue'
import FinalAction from '@/Components/HR_Hiring/FinalAction.vue'
import OfferLetterModal from '@/Components/HR_Hiring/OfferLetterModal.vue'

const route = useRoute()
const router = useRouter()
const candidateId = route.params.id
const baseurl = import.meta.env.VITE_BASE_URL

// Section Refs
const section_1 = ref(null)
const section_2 = ref(null)
const section_3 = ref(null)
const section_4 = ref(null)
const section_5 = ref(null)
const section_6 = ref(null)

// State
const loading = ref(false)
const candidate = ref({})
const showOfferModal = ref(false)
const showBackToTop = ref(false)
const isEditingFeedback = ref(false)
const isSavingFeedback = ref(false)
const isEditingVerification = ref(false)
const isEditingSignature = ref(false)

// Forms
const feedbackForm = reactive({ technical_skills: '', communication: '', cultural_fit: '', problem_solving: '', overall_comment: '', recommendation: '', expected_salary: null })
const verificationForm = reactive({ address: '', marital_status: '', spouse_name: '', spouse_number: '', mother_name: '', father_name: '', parent_name: '', parent_relation: '', parent_phone_number: '', siblings_name: '', siblings_relation: '', siblings_phone_number: '', reference_one_name: '', reference_one_number: '', reference_one_designation: '', reference_one_email: '', reference_two_name: '', reference_two_number: '', reference_two_designation: '', reference_two_email: '' })
const verifying = reactive({ reference: false, background: false, documents: false })
const offerForm = reactive({ company_name: 'Hi-Tech Softsys', candidate_name: '', job_title: '', negotiated_salary: null, offering_date: '', joining_date: '' /* ... rest of your static fields */ })

const steps = [
  { id: 1, label: 'ShortList' },
  { id: 2, label: 'Interview' },
  { id: 3, label: 'Selection & Initial Offer' },
  { id: 4, label: 'Verification' },
  { id: 5, label: 'Documentation' },
  { id: 6, label: 'Joining & Setup' },
  { id: 7, label: 'Probation & Confirmation' }
]

// Computed
const currentStatus = computed(() => Number(candidate.value?.status || 1))
const currentStatusIndex = computed(() => (currentStatus.value === 10 ? steps.length - 1 : currentStatus.value - 1))
const currentStepName = computed(() => currentStatus.value === 10 ? 'Rejected' : steps[currentStatusIndex.value]?.label || 'Pending')
const progressWidth = computed(() => `${(currentStatusIndex.value / (steps.length - 1)) * 100}%`)
const referenceChecked = computed(() => candidate.value?.reference_checked || '0')
const backgroundVerified = computed(() => candidate.value?.background_verified || '0')
const documentsVerified = computed(() => candidate.value?.documents_verified || '0')

const allRequiredStepsCompleted = computed(() => {
  if (currentStatus.value === 2) return !!(candidate.value?.technical_skills && candidate.value?.recommendation)
  if (currentStatus.value === 4) return referenceChecked.value === '1' && backgroundVerified.value === '1'
  if (currentStatus.value === 5) return candidate.value?.documents_verified === '1' && candidate.value?.signature_uploaded === '1'
  return true
})

// Scroll Logic
const handleManualScroll = (stepId) => {
  const refMap = { 1: section_1, 2: section_2, 3: section_3, 4: section_4, 5: section_5, 6: section_6, 7: section_6 }
  const target = refMap[stepId]?.value
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
const handleScroll = () => { showBackToTop.value = window.scrollY > 400 }

// Actions
const fetchCandidate = async () => {
  loading.value = true
  try {
    const res = await api().get(`/applied-jobs/${candidateId}`)
    candidate.value = res.data.data
    await nextTick()
    handleManualScroll(currentStatus.value)
  } catch (e) { console.error(e) } finally { loading.value = false }
}

const moveToNextStep = async () => {
  if (!allRequiredStepsCompleted.value) return
  const newStatus = currentStatus.value + 1
  try {
    await api().post(`/applied-jobs/${candidate.value.id}`, { status: newStatus, _method: "PUT" })
    candidate.value.status = newStatus
    Swal.fire({ icon: 'success', title: 'Stage Updated', timer: 1500, showConfirmButton: false })
    await nextTick()
    handleManualScroll(newStatus)
  } catch (err) { Swal.fire({ icon: 'error', title: 'Error' }) }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  fetchCandidate()
})
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

// Placeholder methods to keep code running
const goBack = () => router.back()
const viewResume = () => window.open(`${baseurl}/${candidate.value.resume}`, '_blank')
const startEditFeedback = () => { isEditingFeedback.value = true }
const openOfferModal = () => { showOfferModal.value = true }
const closeOfferModal = () => { showOfferModal.value = false }
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s, transform 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(20px); }
</style>
