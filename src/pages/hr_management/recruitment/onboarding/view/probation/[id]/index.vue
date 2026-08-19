<template>
  <div class="min-h-screen bg-slate-100 p-6">
    <div class="max-w-4xl mx-auto">
<!-- Header -->
      <div class="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 rounded-2xl shadow-lg mb-6">
        <h1 class="text-3xl font-bold">{{ steps[stepIndex] }}</h1>
        <p class="text-sm opacity-90">Candidate: {{ candidate.name }}</p>
      </div>
      <!-- Stepper -->
      <div class="flex justify-between items-center mb-6">
        <template v-for="(step, index) in steps" :key="index">
          <div class="flex-1 flex items-center">
            <!-- Step Circle -->
            <div
              :class="[
                'w-8 h-8 flex items-center justify-center rounded-full text-white font-bold',
                stepIndex >= index ? 'bg-indigo-600' : 'bg-gray-300'
              ]"
            >
              {{ index + 1 }}
            </div>

            <!-- Step Label -->
            <div class="ml-2 text-sm font-medium text-gray-700">
              {{ step }}
            </div>

            <!-- Connector Line -->
            <div
              v-if="index < steps.length - 1"
              :class="[
                'flex-1 h-1',
                stepIndex > index ? 'bg-indigo-600' : 'bg-gray-300'
              ]"
            ></div>
          </div>
        </template>
      </div>

      

      <!-- Step Status -->
      <div class="bg-white rounded-2xl shadow-md p-6 mb-6">
        <h3 class="text-lg font-semibold mb-4">Progress</h3>
        <ul class="space-y-4">
          <li class="flex items-center gap-4">
            <span :class="stepClass('Interview')"></span>
            Interview Cleared
          </li>
          <li class="flex items-center gap-4">
            <span :class="stepClass('Offer')"></span>
            Offer Letter Issued
          </li>
          <li class="flex items-center gap-4">
            <span :class="stepClass('Accepted')"></span>
            Candidate Accepted
          </li>
        </ul>
      </div>

      <!-- Actions -->
      <div class="bg-white rounded-2xl shadow-md p-6">
        <h3 class="text-lg font-semibold mb-4">Actions</h3>
        <div class="flex flex-wrap gap-3">
          <button
            @click="markStep('Interview')"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Mark Interview Cleared
          </button>
          <button
            @click="markStep('Offer')"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Mark Offer Issued
          </button>
          <button
            @click="markStep('Accepted')"
            class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Mark Candidate Accepted
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { reactive, ref } from 'vue'

// Mock: Candidate data
const route = useRoute()
const candidateId = route.params.id || 1

const candidate = reactive({
  id: candidateId,
  name: candidateId == 1 ? 'John Doe' : 'Candidate ' + candidateId,
  steps: {
    Interview: true,
    Offer: false,
    Accepted: false
  }
})

// Step navigation
const steps = [
  'Selection & Offer',
  'Verification',
  'Documentation',
  'Joining & Setup',
  'Probation & Confirmation'
]

// Current step index (Selection & Offer = 0)
const stepIndex = ref(0)

// Mark step complete
const markStep = (step) => {
  candidate.steps[step] = true
}

// Step indicator classes
const stepClass = (step) => {
  return [
    'w-4 h-4 rounded-full',
    candidate.steps[step] ? 'bg-green-500' : 'bg-gray-300'
  ].join(' ')
}
</script>