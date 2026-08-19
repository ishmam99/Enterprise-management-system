<template>
  <OverlayLayer v-show="modelValue" @overlay-click="close">
    <CardBoxModal v-show="modelValue" @keydown.esc="close">
      <CardBoxComponentTitle :title="modalTitle || 'Request Training Enrollment'" />
      
      <div class="mb-4" v-if="selectedProgram">
        <p class="text-sm text-gray-600">
          <span class="font-semibold">Selected Program:</span> {{ getProgramDisplayName() }}
        </p>
        <p v-if="selectedProgram.code" class="text-sm text-gray-600 mt-1">
          <span class="font-semibold">Course Code:</span> {{ selectedProgram.code }}
        </p>
        <p v-if="selectedProgram.duration" class="text-sm text-gray-600 mt-1">
          <span class="font-semibold">Duration:</span> {{ selectedProgram.duration }}
        </p>
        <p v-if="selectedProgram.level" class="text-sm text-gray-600 mt-1">
          <span class="font-semibold">Level:</span> {{ selectedProgram.level }}
        </p>
      </div>

      <div>
        <FormField label="Full Name" help="Enter your full name">
          <FormControl v-model="form.name" type="text" placeholder="John Doe" required />
        </FormField>

        <FormField label="Email Address" help="We'll send enrollment confirmation here">
          <FormControl v-model="form.email" type="email" placeholder="john@example.com" required />
        </FormField>

        <FormField label="Phone Number" help="Optional, for urgent communications">
          <FormControl v-model="form.phone" type="tel" placeholder="+1 (555) 000-0000" />
        </FormField>

        <FormField label="Organization" help="Your company or institution">
          <FormControl v-model="form.organization" type="text" placeholder="Acme Corporation" required />
        </FormField>

        <FormField label="Job Title" help="Your role or position">
          <FormControl v-model="form.jobTitle" type="text" placeholder="Senior Engineer" required />
        </FormField>

        <FormField label="Experience Level" help="Your familiarity with MSC Software">
          <select v-model="form.experienceLevel" class="px-3 py-2 max-w-full focus:ring focus:outline-none border border-gray-300 rounded-lg w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800" required>
            <option value="">Select an option</option>
            <option value="beginner">Beginner - New to MSC Software</option>
            <option value="intermediate">Intermediate - Some experience</option>
            <option value="advanced">Advanced - Extensive experience</option>
          </select>
        </FormField>

        <FormField label="Training Format" help="Select your preferred training delivery method">
          <div class="space-y-2">
            <label class="flex items-center cursor-pointer">
              <input v-model="form.format" type="radio" value="online" class="mr-2 w-4 h-4 text-purple-600" />
              <span class="text-gray-700">Online - Live virtual sessions</span>
            </label>
            <label class="flex items-center cursor-pointer">
              <input v-model="form.format" type="radio" value="onsite" class="mr-2 w-4 h-4 text-purple-600" />
              <span class="text-gray-700">On-Site - At our facility or yours</span>
            </label>
            <label class="flex items-center cursor-pointer">
              <input v-model="form.format" type="radio" value="hybrid" class="mr-2 w-4 h-4 text-purple-600" />
              <span class="text-gray-700">Hybrid - Combination of both</span>
            </label>
          </div>
        </FormField>

        <FormField label="Preferred Start Date" help="When would you like to begin?">
          <FormControl v-model="form.preferredDate" type="date" />
        </FormField>

        <FormField label="Number of Participants" help="How many people will be attending?">
          <FormControl v-model="form.participants" type="number" min="1" placeholder="1" />
        </FormField>

        <FormField label="Additional Comments or Questions">
          <textarea v-model="form.comments" rows="3" class="px-3 py-2 max-w-full focus:ring focus:outline-none border border-gray-300 rounded-lg w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800" placeholder="Any specific training goals, questions, or special requirements?"></textarea>
        </FormField>
      </div>

      <template #footer>
        <BaseButtons>
          <BaseButton label="Cancel" color="info" outline @click="close" />
          <BaseButton label="Submit Enrollment Request" color="success" @click="submit" :disabled="!isFormValid" />
        </BaseButtons>
      </template>
    </CardBoxModal>
  </OverlayLayer>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue'
import OverlayLayer from '@/components/OverlayLayer.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  selectedProgram: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const form = ref({
  name: '',
  email: '',
  phone: '',
  organization: '',
  jobTitle: '',
  experienceLevel: '',
  format: 'online',
  preferredDate: '',
  participants: 1,
  comments: ''
})

// Helper function to get program display name
const getProgramDisplayName = () => {
  if (!props.selectedProgram) return 'Training Program'
  return props.selectedProgram.name || props.selectedProgram.title || 'MSC Software Training'
}

// Computed with guaranteed string return
const modalTitle = computed(() => {
  // Always return a string, never undefined
  if (props.selectedProgram) {
    const programName = props.selectedProgram.name || props.selectedProgram.title
    if (programName && typeof programName === 'string') {
      return `Enroll in: ${programName}`
    }
  }
  return 'Request Training Enrollment'
})

// Debug watcher to see what's happening
watch(() => props.selectedProgram, (newVal) => {
  console.log('Selected Program changed:', newVal)
  console.log('Modal title:', modalTitle.value)
}, { immediate: true, deep: true })

const isFormValid = computed(() => {
  return !!(form.value.name && 
         form.value.email && 
         form.value.organization && 
         form.value.jobTitle &&
         form.value.experienceLevel)
})

const close = () => {
  emit('update:modelValue', false)
}

const submit = () => {
  if (!isFormValid.value) return
  
  const submissionData = {
    ...form.value,
    programId: props.selectedProgram?.id,
    programName: props.selectedProgram?.name || props.selectedProgram?.title,
    programCode: props.selectedProgram?.code,
    programLevel: props.selectedProgram?.level,
    trainingType: props.selectedProgram?.trainingType,
    submittedAt: new Date().toISOString()
  }
  
  console.log('Submitting enrollment:', submissionData)
  emit('submit', submissionData)
  
  // Reset form
  form.value = {
    name: '',
    email: '',
    phone: '',
    organization: '',
    jobTitle: '',
    experienceLevel: '',
    format: 'online',
    preferredDate: '',
    participants: 1,
    comments: ''
  }
  
  close()
}
</script>

<style scoped>
/* Add any custom styles here */
</style>