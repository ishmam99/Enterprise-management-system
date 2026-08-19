<template>
  <div class="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
    <!-- Header -->
    <div class="mx-auto mb-10">
      <h1 class="text-4xl font-bold text-indigo-900 mb-3">Interview Feedback ss {{ applicationId }}</h1>
      <p class="text-lg text-indigo-700">Provide and review candidate interview feedback</p>
    </div>

    <!-- Candidate Info -->
    <div class="mx-auto mb-8 bg-white rounded-2xl shadow-md p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <p class="text-xs text-gray-500 mb-1">Candidate</p>
        <p class="font-semibold text-gray-900">{{ candidate.name }}</p>
      </div>
      <div>
        <p class="text-xs text-gray-500 mb-1">Position</p>
        <p class="font-semibold text-gray-900">{{ candidate.position }}</p>
      </div>
      <div>
        <p class="text-xs text-gray-500 mb-1">Interviewer</p>
        <p class="font-semibold text-gray-900">{{ candidate.interviewer }}</p>
      </div>
    </div>

    <!-- Feedback Form -->
    <div class="mx-auto mb-10 bg-white rounded-2xl shadow-xl p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">Submit Feedback</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="form-label">Technical Skills</label>
          <select v-model="form.technical" class="form-input">
            <option disabled value="">Select rating</option>
            <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>
        <div>
          <label class="form-label">Communication</label>
          <select v-model="form.communication" class="form-input">
            <option disabled value="">Select rating</option>
            <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>
        <div>
          <label class="form-label">Problem Solving</label>
          <select v-model="form.problemSolving" class="form-input">
            <option disabled value="">Select rating</option>
            <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>
        <div>
          <label class="form-label">Cultural Fit</label>
          <select v-model="form.cultureFit" class="form-input">
            <option disabled value="">Select rating</option>
            <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>
      </div>

      <div class="mt-6">
        <label class="form-label">Overall Comment</label>
        <textarea v-model="form.comment" rows="4" placeholder="Write your feedback..." class="form-input"></textarea>
      </div>

      <div class="mt-6">
        <label class="form-label">Recommendation</label>
        <select v-model="form.recommendation" class="form-input">
          <option disabled value="">Select recommendation</option>
          <option>Strong Hire</option>
          <option>Hire</option>
          <option>Hold</option>
          <option>Reject</option>
        </select>
      </div>

      <div class="flex justify-end gap-3 mt-8">
        <button class="px-6 py-3 rounded-xl border">Reset</button>
        <button class="btn-primary" @click="submitFeedback">Submit Feedback</button>
      </div>
    </div>

    <!-- Previous Feedback -->
    <div class="mx-auto bg-white rounded-2xl shadow-xl p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">Previous Feedback</h2>

      <div v-if="feedbackList.length === 0" class="text-gray-500 text-center py-8">
        No feedback submitted yet
      </div>

      <div v-for="item in feedbackList" :key="item.id"
        class="border border-gray-200 rounded-xl p-5 mb-4 hover:bg-indigo-50 transition">
        <div class="flex justify-between mb-2">
          <p class="font-semibold text-gray-900">{{ item.interviewer }}</p>
          <span class="text-xs text-gray-500">{{ item.date }}</span>
        </div>
        <p class="text-gray-700 mb-3">{{ item.comment }}</p>
        <div class="flex flex-wrap gap-2 text-xs">
          <span class="badge">Tech: {{ item.technical }}</span>
          <span class="badge">Comm: {{ item.communication }}</span>
          <span class="badge">PS: {{ item.problemSolving }}</span>
          <span class="badge">Fit: {{ item.cultureFit }}</span>
          <span class="badge bg-indigo-100 text-indigo-700">{{ item.recommendation }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import api from '@/config/api'
import { useRoute } from 'vue-router'

const application = ref([])
const loading = ref(false)


const route = useRoute()
const applicationId = route.params.id

const fetchApplication = async () => {
  loading.value = true
  try {
    const response = await api().get(`/applied-jobs/${applicationId}`)
    application.value = response.data.data
  } catch (error) {
    console.error('Error fetching candidates:', error)
  } finally {
    loading.value = false
  }
}

const candidate = ref({
  name: 'John Doe',
  position: 'Frontend Developer',
  interviewer: 'HR Manager'
})

const form = ref({
  technical: '',
  communication: '',
  problemSolving: '',
  cultureFit: '',
  comment: '',
  recommendation: ''
})

const feedbackList = ref([
  {
    id: 1,
    interviewer: 'Tech Lead',
    date: '2026-01-05',
    technical: 4,
    communication: 4,
    problemSolving: 3,
    cultureFit: 4,
    comment: 'Good fundamentals, needs improvement in system design.',
    recommendation: 'Hire'
  }
])

const submitFeedback = () => {
  feedbackList.value.unshift({
    id: Date.now(),
    interviewer: candidate.value.interviewer,
    date: new Date().toISOString().split('T')[0],
    ...form.value
  })

  form.value = {
    technical: '',
    communication: '',
    problemSolving: '',
    cultureFit: '',
    comment: '',
    recommendation: ''
  }
}

onMounted(fetchApplication)
</script>

<style scoped>
.form-label {
  @apply block mb-2 text-sm font-semibold text-gray-700;
}

.form-input {
  @apply w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all;
}

.btn-primary {
  @apply bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-md;
}

.badge {
  @apply px-3 py-1 rounded-full bg-gray-100 text-gray-700;
}
</style>