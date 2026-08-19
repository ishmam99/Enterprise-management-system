<!-- InterviewModal.vue or add as component in same file -->
<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <div class="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
        <h2 class="text-xl font-semibold">
          {{ interview ? 'Edit Interview' : 'Schedule New Interview' }}
        </h2>
        <button @click="$emit('close')" class="p-2 hover:bg-gray-100 rounded-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Candidate Information -->
          <div class="space-y-4">
            <h3 class="font-medium text-gray-700">Candidate Information</h3>
            <div>
              <label class="form-label">Full Name *</label>
              <input v-model="form.candidate" placeholder="Candidate Name" class="form-input" required />
            </div>
            <div>
              <label class="form-label">Email Address *</label>
              <input v-model="form.email" type="email" placeholder="candidate@email.com" class="form-input" required />
            </div>
            <div>
              <label class="form-label">Phone Number</label>
              <input v-model="form.phone" placeholder="+1 (555) 123-4567" class="form-input" />
            </div>
          </div>

          <!-- Position Information -->
          <div class="space-y-4">
            <h3 class="font-medium text-gray-700">Position Information</h3>
            <div>
              <label class="form-label">Position *</label>
              <select v-model="form.position" class="form-input" required>
                <option value="">Select Position</option>
                <option v-for="p in positions" :key="p">{{ p }}</option>
              </select>
            </div>
            <div>
              <label class="form-label">Interview Type *</label>
              <select v-model="form.type" class="form-input" required>
                <option value="">Select Type</option>
                <option>Technical</option>
                <option>HR</option>
                <option>Managerial</option>
                <option>Final Round</option>
                <option>Phone Screen</option>
              </select>
            </div>
          </div>

          <!-- Interview Details -->
          <div class="space-y-4">
            <h3 class="font-medium text-gray-700">Interview Details</h3>
            <div>
              <label class="form-label">Interviewer *</label>
              <select v-model="form.interviewer" class="form-input" required>
                <option value="">Select Interviewer</option>
                <option v-for="i in interviewers" :key="i">{{ i }}</option>
              </select>
            </div>
            <div>
              <label class="form-label">Date *</label>
              <input type="date" v-model="form.date" class="form-input" required />
            </div>
          </div>

          <!-- Time & Duration -->
          <div class="space-y-4">
            <h3 class="font-medium text-gray-700">Time & Location</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="form-label">Start Time *</label>
                <input type="time" v-model="form.time" class="form-input" required />
              </div>
              <div>
                <label class="form-label">Duration (mins) *</label>
                <select v-model="form.duration" class="form-input" required>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                  <option value="120">2 hours</option>
                </select>
              </div>
            </div>
            <div>
              <label class="form-label">Location *</label>
              <select v-model="form.location" class="form-input" required>
                <option value="">Select Location</option>
                <option>Conference Room A</option>
                <option>Conference Room B</option>
                <option>Board Room</option>
                <option>HR Office</option>
                <option>Design Studio</option>
                <option>Virtual (Zoom)</option>
                <option>Virtual (Teams)</option>
              </select>
            </div>
          </div>

          <!-- Notes -->
          <div class="md:col-span-2 space-y-4">
            <h3 class="font-medium text-gray-700">Additional Information</h3>
            <div>
              <label class="form-label">Notes / Instructions</label>
              <textarea v-model="form.notes" placeholder="Add any special instructions or notes for the interview..."
                class="form-input min-h-[100px]"></textarea>
            </div>
          </div>
        </div>
      </div>

      <div class="sticky bottom-0 bg-white border-t p-6 flex justify-end gap-3">
        <button @click="$emit('close')" class="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition">
          Cancel
        </button>
        <button @click="handleSave" class="btn-primary">
          {{ interview ? 'Update' : 'Schedule' }} Interview
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  interview: Object
})

const emit = defineEmits(['close', 'save'])

const positions = ['Frontend Developer', 'Backend Developer', 'UI/UX Designer', 'HR Manager', 'Sales Executive', 'Data Analyst']
const interviewers = ['Sarah Johnson', 'Michael Chen', 'Lisa Thompson', 'David Miller', 'Maria Garcia', 'Thomas White']

const form = ref({
  candidate: '',
  email: '',
  phone: '',
  position: '',
  type: '',
  interviewer: '',
  date: '',
  time: '',
  duration: '60',
  location: '',
  notes: ''
})

watch(() => props.interview, (newInterview) => {
  if (newInterview) {
    form.value = { ...newInterview }
  } else {
    form.value = {
      candidate: '',
      email: '',
      phone: '',
      position: '',
      type: '',
      interviewer: '',
      date: '',
      time: '',
      duration: '60',
      location: '',
      notes: ''
    }
  }
}, { immediate: true })

const handleSave = () => {
  // Basic validation
  if (!form.value.candidate || !form.value.position || !form.value.date || !form.value.time) {
    alert('Please fill in all required fields')
    return
  }

  emit('save', form.value)
}
</script>
