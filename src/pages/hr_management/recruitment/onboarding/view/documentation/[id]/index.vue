<template>
  <div class="min-h-screen bg-slate-100 p-6">
    <div class="max-w-4xl mx-auto">

      <!-- Header -->
      <div class="bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 rounded-2xl shadow-lg mb-6">
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

        <!-- Documentation Details -->
        <div class="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h3 class="text-lg font-semibold mb-4">Documentation Details</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div><strong>Job Title:</strong> {{ candidate.job?.title || 'N/A' }}</div>
            <div><strong>Department:</strong> {{ candidate.job?.department || 'N/A' }}</div>
            <div><strong>Job Type:</strong> {{ candidate.job?.job_type || 'N/A' }}</div>
            <div><strong>Location Type:</strong> {{ candidate.job?.location_type || 'N/A' }}</div>
            <div><strong>Base Country:</strong> {{ candidate.job?.base_country || 'N/A' }}</div>

            <div>
              <strong>Resume:</strong>
              <span v-if="candidate.resume">
                <a :href="candidate.resume" target="_blank" class="text-blue-600 underline">
                  View Resume
                </a>
              </span>
              <span v-else>N/A</span>
            </div>
          </div>
        </div>

        <!-- NDA -->
        <div class="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h3 class="text-lg font-semibold mb-4">Signing NDA</h3>

          <div class="flex justify-between items-center">
            <p class="text-gray-700">Candidate signed NDA.</p>

            <span
              :class="[
                'px-3 py-1 rounded-full text-sm font-medium',
                documentationSteps.nda
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-500'
              ]"
            >
              {{ documentationSteps.nda ? 'Completed' : 'Pending' }}
            </span>
          </div>

          <button
            class="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            :disabled="documentationSteps.nda"
            @click="markDocStep('nda')"
          >
            Mark NDA Signed
          </button>
        </div>

        <!-- Contract -->
        <div class="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h3 class="text-lg font-semibold mb-4">Employment Contract</h3>

          <div class="flex justify-between items-center">
            <p class="text-gray-700">Contract signed.</p>

            <span
              :class="[
                'px-3 py-1 rounded-full text-sm font-medium',
                documentationSteps.contract
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-500'
              ]"
            >
              {{ documentationSteps.contract ? 'Completed' : 'Pending' }}
            </span>
          </div>

          <button
            class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            :disabled="documentationSteps.contract"
            @click="markDocStep('contract')"
          >
            Mark Contract Signed
          </button>
        </div>

        <!-- Policies -->
        <div class="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h3 class="text-lg font-semibold mb-4">Company Policies</h3>

          <div class="flex justify-between items-center">
            <p class="text-gray-700">Policies accepted.</p>

            <span
              :class="[
                'px-3 py-1 rounded-full text-sm font-medium',
                documentationSteps.policies
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-500'
              ]"
            >
              {{ documentationSteps.policies ? 'Completed' : 'Pending' }}
            </span>
          </div>

          <button
            class="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
            :disabled="documentationSteps.policies"
            @click="markDocStep('policies')"
          >
            Mark Policies Accepted
          </button>
        </div>

        <!-- Stepper -->
        <div class="flex justify-between items-center mb-6">
          <template v-for="(step, index) in steps" :key="index">
            <div class="flex-1 flex items-center">
              <div
                :class="[
                  'w-8 h-8 flex items-center justify-center rounded-full text-white font-bold',
                  stepIndex >= index ? 'bg-red-500' : 'bg-gray-300'
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
                  stepIndex > index ? 'bg-red-500' : 'bg-gray-300'
                ]"
              ></div>
            </div>
          </template>
        </div>

        <!-- Final Action -->
        <div class="bg-white rounded-2xl shadow-md p-6">
          <h3 class="text-lg font-semibold mb-4">Final Action</h3>

          <button
            :disabled="!allDocsDone"
            @click="completeDocumentation"
            class="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            Move to Joining & Setup
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

const documentationSteps = reactive({
  nda: false,
  contract: false,
  policies: false
})

const steps = [
  'Selection & Offer',
  'Verification',
  'Documentation',
  'Joining & Setup',
  'Probation & Confirmation'
]

const stepIndex = ref(2)

/* Fetch */
const fetchCandidate = async () => {
  loading.value = true
  try {
    const res = await api().get('/applied-jobs')
    const found = res.data.data.find(i => i.id == candidateId)

    if (found) {
      candidate.value = found

      documentationSteps.nda = found.status >= 3
      documentationSteps.contract = found.status >= 3
      documentationSteps.policies = found.status >= 3
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

/* Computed */
const allDocsDone = computed(() => {
  return (
    documentationSteps.nda &&
    documentationSteps.contract &&
    documentationSteps.policies
  )
})

/* Mark */
const markDocStep = (step) => {
  documentationSteps[step] = true
}

/* Update */
const updateStatus = async () => {
  try {
    const payload = { ...candidate.value, status: '4' }
    await api().put(`/applied-jobs/${candidate.value.id}`, payload)
    console.log('Moved to Joining')
  } catch (e) {
    console.error(e)
  }
}

/* Final */
const completeDocumentation = async () => {
  if (!allDocsDone.value) return
  await updateStatus()
}

onMounted(fetchCandidate)
</script>