<template>
  <div class="min-h-screen bg-slate-100 p-6">
    <div class="max-w-4xl mx-auto">

      <!-- Header -->
      <div class="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-2xl shadow-lg mb-6">
        <h1 class="text-3xl font-bold">{{ steps[stepIndex] }}</h1>
        <p v-if="candidate.full_name" class="text-sm opacity-90">
          Candidate: {{ candidate.full_name }}
        </p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-6 text-gray-500">
        Loading candidate...
      </div>

      <div v-else>

        <!-- Candidate Info -->
        <div class="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h3 class="text-lg font-semibold mb-4">Candidate Info</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div><strong>Email:</strong> {{ candidate.email || 'N/A' }}</div>
            <div><strong>Contact:</strong> {{ candidate.contact || 'N/A' }}</div>
            <div><strong>Highest Education:</strong> {{ candidate.highest_education || 'N/A' }}</div>
            <div><strong>University:</strong> {{ candidate.university || 'N/A' }}</div>
          </div>
        </div>

        <!-- Job Details -->
        <div class="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h3 class="text-lg font-semibold mb-4">Job Details</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div><strong>Job Title:</strong> {{ candidate.job?.title || 'N/A' }}</div>
            <div><strong>Department:</strong> {{ candidate.job?.department || 'N/A' }}</div>
            <div><strong>Job Type:</strong> {{ candidate.job?.job_type || 'N/A' }}</div>
            <div><strong>Location Type:</strong> {{ candidate.job?.location_type || 'N/A' }}</div>
            <div><strong>Base Country:</strong> {{ candidate.job?.base_country || 'N/A' }}</div>
          </div>
        </div>

        <!-- Skills & Qualifications -->
        <div class="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h3 class="text-lg font-semibold mb-4">Skills & Qualifications</h3>
          <div class="space-y-3 text-gray-700">
            <div>
              <strong>Key Skills:</strong>
              <span v-if="candidate.job?.key_skills?.length">
                {{ candidate.job.key_skills.join(', ') }}
              </span>
              <span v-else>N/A</span>
            </div>

            <div>
              <strong>Primary Software:</strong>
              <span v-if="candidate.job?.primary_software?.length">
                {{ candidate.job.primary_software.join(', ') }}
              </span>
              <span v-else>N/A</span>
            </div>

            <div>
              <strong>Required Qualifications:</strong>
              <span v-if="candidate.job?.required_qualifications?.length">
                {{ candidate.job.required_qualifications.join(', ') }}
              </span>
              <span v-else>N/A</span>
            </div>
          </div>
        </div>

        <!-- Reference Check -->
        <div class="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h3 class="text-lg font-semibold mb-4">Reference Check</h3>

          <div class="flex justify-between items-center">
            <p class="text-gray-700">
              Verify previous employer / references.
            </p>

            <span
              :class="[
                'px-3 py-1 rounded-full text-sm font-medium',
                verification.reference
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-500'
              ]"
            >
              {{ verification.reference ? 'Completed' : 'Pending' }}
            </span>
          </div>

          <button
            class="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            :disabled="verification.reference"
            @click="markVerification('reference')"
          >
            Mark Reference Check Done
          </button>
        </div>

        <!-- Background Verification -->
        <div class="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h3 class="text-lg font-semibold mb-4">Background Verification</h3>

          <div class="flex justify-between items-center">
            <p class="text-gray-700">
              Verify identity, education, and legal background.
            </p>

            <span
              :class="[
                'px-3 py-1 rounded-full text-sm font-medium',
                verification.background
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-500'
              ]"
            >
              {{ verification.background ? 'Completed' : 'Pending' }}
            </span>
          </div>

          <button
            class="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            :disabled="verification.background"
            @click="markVerification('background')"
          >
            Mark Background Check Done
          </button>
        </div>

        <!-- Stepper -->
        <div class="flex justify-between items-center mb-6">
          <template v-for="(step, index) in steps" :key="index">
            <div class="flex-1 flex items-center">
              <div
                :class="[
                  'w-8 h-8 flex items-center justify-center rounded-full text-white font-bold',
                  stepIndex >= index ? 'bg-yellow-500' : 'bg-gray-300'
                ]"
              >
                {{ index + 1 }}
              </div>

              <div class="ml-2 text-sm font-medium text-gray-700">
                {{ step }}
              </div>

              <div
                v-if="index < steps.length - 1"
                :class="[
                  'flex-1 h-1',
                  stepIndex > index ? 'bg-yellow-500' : 'bg-gray-300'
                ]"
              ></div>
            </div>
          </template>
        </div>

        <!-- Actions -->
        <div class="bg-white rounded-2xl shadow-md p-6">
          <h3 class="text-lg font-semibold mb-4">Final Action</h3>

          <button
            :disabled="!allVerified"
            @click="completeVerification"
            class="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Move to Documentation
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/config/api'

const route = useRoute()
const candidateId = route.params.id

const loading = ref(false)
const candidate = ref({})

/* Verification states */
const verification = reactive({
  reference: false,
  background: false
})

/* Steps */
const steps = [
  'Selection & Offer',
  'Verification',
  'Documentation',
  'Joining & Setup',
  'Probation & Confirmation'
]

const stepIndex = ref(1)

/* Fetch */
const fetchCandidate = async () => {
  loading.value = true
  try {
    const res = await api().get('/applied-jobs')
    const found = res.data.data.find(i => i.id == candidateId)

    if (found) {
      candidate.value = found

      // optional future backend mapping
      verification.reference = found.reference_checked === 1
      verification.background = found.background_verified === 1
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

/* Computed */
const allVerified = computed(() => {
  return verification.reference && verification.background
})

/* Mark verification */
const markVerification = (type) => {
  verification[type] = true
}

/* Update status */
const updateStatus = async () => {
  try {
    const payload = { ...candidate.value, status: '3' }
    await api().put(`/applied-jobs/${candidate.value.id}`, payload)
    console.log('Moved to Documentation')
  } catch (e) {
    console.error(e)
  }
}

/* Final action */
const completeVerification = async () => {
  if (!allVerified.value) return
  await updateStatus()
}

/* Init */
onMounted(fetchCandidate)
</script>