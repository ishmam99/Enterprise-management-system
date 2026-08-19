<!-- src/components/hiring/InterviewFeedback.vue -->
<template>
  <div class="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-2xl shadow-lg p-8 mb-6 border border-indigo-100">
    <!-- Header with Gradient -->
    <div class="bg-gradient-to-r from-indigo-500 to-blue-400 rounded-xl p-6 mb-8 text-white shadow-md">
      <h2 class="text-3xl font-bold">2. Interview Feedback</h2>
      <p class="text-indigo-100 mt-2">Candidate Evaluation & Assessment Results</p>
    </div>

    <!-- View Mode -->
    <div v-if="!isEditing">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div v-for="(label, key) in ratingFields" :key="key" class="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-lg border-l-4 border-indigo-500 hover:shadow-md transition-shadow">
          <span class="text-indigo-600 text-xs font-bold uppercase tracking-wider">{{ label }}</span>
          <div class="mt-3">
            <div class="flex items-center justify-between mb-2">
              <span class="text-2xl font-bold text-gray-900">{{ candidate[key] || 'N/A' }}</span>
              <span class="text-gray-500 text-sm">/5</span>
            </div>
            <p class="text-indigo-600 text-xs font-semibold mb-3">{{ getRatingLabel(candidate[key]) }}</p>
            <!-- Progress Bar -->
            <div class="w-full h-3 bg-gray-300 rounded-full overflow-hidden shadow-sm">
              <div
                class="h-full transition-all duration-500 rounded-full"
                :style="{
                  width: candidate[key] ? (candidate[key] / 5 * 100) + '%' : '0%',
                  backgroundColor: getRatingBarColorHex(Number(candidate[key]))
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-r from-indigo-100 to-blue-100 rounded-lg p-1 mb-6"></div>

      <div class="mb-6">
        <h4 class="text-md font-semibold text-gray-800 mb-3 flex items-center">
          <span class="inline-block w-2 h-8 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full mr-3"></span>
          Overall Comment
        </h4>
        <div class="bg-gradient-to-br from-indigo-50 to-cyan-50 p-4 rounded-lg border-l-4 border-indigo-400">
          <p class="text-gray-700 leading-relaxed">{{ candidate.overall_comment || '📋 No comment provided' }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition-shadow">
          <span class="text-blue-600 text-xs font-bold uppercase tracking-wider">Recommendation</span>
          <p class="mt-2 inline-block px-4 py-2 rounded-full text-sm font-semibold" :class="getRecommendationClass(candidate.recommendation)">
            {{ candidate.recommendation || '⚪ Pending' }}
          </p>
        </div>
        <div class="bg-gradient-to-br from-cyan-50 to-teal-50 p-4 rounded-lg border-l-4 border-cyan-500 hover:shadow-md transition-shadow">
          <span class="text-cyan-600 text-xs font-bold uppercase tracking-wider">Expected Salary</span>
          <p class="text-2xl font-bold text-gray-900 mt-2">{{ candidate.expected_salary ? 'BDT ' + formatNumber(candidate.expected_salary) : 'N/A' }}</p>
        </div>
      </div>

      <div class="flex gap-2 mt-6">
        <button @click="$emit('edit-started')" class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all font-semibold shadow-md hover:shadow-lg transform hover:scale-105">
          ✏️ Edit Feedback
        </button>
      </div>
    </div>

    <!-- Edit Mode -->
    <div v-else class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="(label, key) in ratingFields" :key="key">
          <label class="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">{{ label }} <span class="text-red-500">*</span></label>
          <select v-model="feedbackForm[key]" class="w-full px-4 py-3 border-2 border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white">
            <option disabled value="">Select rating</option>
            <option v-for="n in 5" :key="n" :value="n">{{ n }} - {{ getRatingLabel(n) }}</option>
          </select>
        </div>
      </div>

      <div>
        <label class="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Overall Comment <span class="text-red-500">*</span></label>
        <textarea v-model="feedbackForm.overall_comment" rows="4" placeholder="Provide detailed feedback about the candidate..." class="w-full px-4 py-3 border-2 border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"></textarea>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Recommendation <span class="text-red-500">*</span></label>
          <select v-model="feedbackForm.recommendation" class="w-full px-4 py-3 border-2 border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white">
            <option disabled value="">Select recommendation</option>
            <option>Hire</option>
            <option>Hold</option>
            <option>No Hire</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Expected Salary (BDT) <span class="text-red-500">*</span></label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">৳</span>
            <input v-model.number="feedbackForm.expected_salary" type="number" min="0" step="1000" placeholder="Enter expected salary" class="w-full px-4 py-3 pl-8 border-2 border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" />
          </div>
        </div>
      </div>

      <div class="flex gap-3 pt-2">
        <button @click="$emit('save-requested')" :disabled="isSaving" class="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-semibold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
          <span v-if="isSaving" class="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></span>
          <span v-if="isSaving">Saving...</span>
          <span v-else>💾 Save Feedback</span>
        </button>
        <button @click="$emit('edit-cancelled')" class="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all font-semibold shadow-md hover:shadow-lg">
          ❌ Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  candidate: { type: Object, required: true },
  isEditing: { type: Boolean, required: true },
  isSaving: { type: Boolean, required: true },
  feedbackForm: { type: Object, required: true }
})
defineEmits(['edit-started', 'edit-cancelled', 'save-requested'])

const ratingFields = { technical_skills: 'Technical Skills', communication: 'Communication', cultural_fit: 'Cultural Fit', problem_solving: 'Problem Solving' }
const ratingColors = { 1: '#ef4444', 2: '#f97316', 3: '#eab308', 4: '#4ade80', 5: '#16a34a' }
const getRatingLabel = (r) => ({ 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very Good', 5: 'Excellent' }[r] || '')
const getRatingBarColorHex = (rating) => ratingColors[rating] || '#d1d5db'
const getRecommendationClass = (rec) => ({
  'Hire': 'bg-green-100 text-green-700 font-semibold',
  'Hold': 'bg-yellow-100 text-yellow-700 font-semibold',
  'No Hire': 'bg-red-100 text-red-700 font-semibold'
}[rec] || 'bg-gray-100 text-gray-600 font-semibold')
const formatNumber = (n) => n ? Number(n).toLocaleString() : '0'
</script>
