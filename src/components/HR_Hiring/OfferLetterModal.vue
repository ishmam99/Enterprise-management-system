<!-- src/components/hiring/OfferLetterModal.vue -->
<template>
  <Teleport to="body">
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 class="text-2xl font-bold text-indigo-600">Create Offer Letter</h2>
          <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>

        <div class="p-6 space-y-6">
          <!-- Candidate Info Section -->
          <div class="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg">
            <h3 class="font-semibold text-indigo-800 mb-3">Personal Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-medium text-gray-700 block mb-1">Candidate Name *</label>
                <input v-model="offerForm.candidate_name" @input="onFieldChange('candidate_name', $event.target.value)" class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
              </div>
              <div>
                <label class="text-sm font-medium text-gray-700 block mb-1">Email *</label>
                <input v-model="offerForm.candidate_email" @input="onFieldChange('candidate_email', $event.target.value)" class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
              </div>
            </div>
          </div>

          <!-- Job & Compensation Section -->
          <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
            <h3 class="font-semibold text-green-800 mb-3">Job & Compensation Details</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-medium text-gray-700 block mb-1">Job Title *</label>
                <input v-model="offerForm.job_title" @input="onFieldChange('job_title', $event.target.value)" class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
              </div>
              <div>
                <label class="text-sm font-medium text-gray-700 block mb-1">Employment Type</label>
                <select v-model="offerForm.employment_type" @change="onFieldChange('employment_type', $event.target.value)" class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                  <option>Full-time (Permanent)</option><option>Full-time (Contractual)</option><option>Part-time</option><option>Internship</option><option>Consultant</option>
                </select>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-700 block mb-1">Negotiated Salary (Offered) *</label>
                <div class="relative">
                  <span class="absolute left-3 top-2 text-gray-500">BDT</span>
                  <input v-model.number="offerForm.negotiated_salary" @change="onFieldChange('negotiated_salary', $event.target.value)" type="number" class="w-full pl-12 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="0">
                </div>
              </div>
            </div>
          </div>

          <!-- Dates Section -->
          <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
            <h3 class="font-semibold text-purple-800 mb-3">Offer Timeline</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-medium text-gray-700 block mb-1">Offering Date *</label>
                <input v-model="offerForm.offering_date" @change="onFieldChange('offering_date', $event.target.value)" type="date" class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
              </div>
              <div>
                <label class="text-sm font-medium text-gray-700 block mb-1">Joining Date *</label>
                <input v-model="offerForm.joining_date" @change="onFieldChange('joining_date', $event.target.value)" type="date" class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
              </div>
            </div>
          </div>

          <!-- Textareas for responsibilities, benefits, terms, firing -->
          <div v-for="field in textFields" :key="field.key">
            <label class="text-sm font-medium text-gray-700 block mb-1">{{ field.label }}</label>
            <textarea v-model="offerForm[field.key]" @input="onFieldChange(field.key, $event.target.value)" :rows="field.rows" class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-mono text-sm" :placeholder="field.placeholder"></textarea>
          </div>
        </div>

        <div class="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex justify-end gap-3">
          <button @click="$emit('close')" class="px-4 py-2 border rounded-lg hover:bg-gray-100">Cancel</button>
          <button @click="$emit('save-details')" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">💾 Save Changes</button>
          <button @click="$emit('generate-pdf')" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2">📄 Generate PDF</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  show: { type: Boolean, required: true },
  candidate: { type: Object, required: true },
  offerForm: { type: Object, required: true }
})
defineEmits(['close', 'save-details', 'generate-pdf', 'update-offer-field'])

const textFields = [
  { key: 'responsibility', label: 'Key Responsibilities', rows: 4, placeholder: 'List responsibilities line by line...' },
  { key: 'benefits', label: 'Benefits & Perks', rows: 3, placeholder: 'List benefits line by line...' },
  { key: 'terms', label: 'Employment Terms', rows: 3, placeholder: 'Terms and conditions...' },
  { key: 'firing', label: 'Termination & Penalty Clauses', rows: 6, placeholder: 'Termination conditions...' }
]

const onFieldChange = (field, value) => {
  props.offerForm[field] = value
  // Debounced update handled by parent via emit
  // emit('update-offer-field', field, value) // optional for auto-save
}
</script>
