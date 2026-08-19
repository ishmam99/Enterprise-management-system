<template>
  <OverlayLayer v-show="modelValue" @overlay-click="close">
    <CardBoxModal v-show="modelValue" @keydown.esc="close">
      <CardBoxComponentTitle title="Request Engineering Consultation" />
      
      <div class="mb-4">
        <p v-if="selectedService" class="text-sm text-gray-600">
          <span class="font-semibold">Service Interest:</span> {{ selectedService.title }}
        </p>
      </div>

      <div>
        <FormField label="Full Name" help="Enter your full name">
          <FormControl v-model="form.name" type="text" placeholder="John Doe" required />
        </FormField>

        <FormField label="Email Address" help="We'll send confirmation here">
          <FormControl v-model="form.email" type="email" placeholder="john@example.com" required />
        </FormField>

        <FormField label="Company" help="Your organization name">
          <FormControl v-model="form.company" type="text" placeholder="Acme Corporation" required />
        </FormField>

        <FormField label="Job Title" help="Your role or position">
          <FormControl v-model="form.jobTitle" type="text" placeholder="Chief Engineer" required />
        </FormField>

        <FormField label="Phone Number" help="Optional contact number">
          <FormControl v-model="form.phone" type="tel" placeholder="+1 (555) 123-4567" />
        </FormField>

        <FormField label="Service of Interest" help="Select the service you need">
          <select v-model="form.service" class="px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800" required>
            <option value="">Select a service</option>
            <option value="structural">Structural Analysis & Design</option>
            <option value="dynamics">Dynamics & Motion Analysis</option>
            <option value="acoustics">Acoustics & NVH</option>
            <option value="thermal">Thermal & Fluids Analysis</option>
            <option value="digital">Digital Transformation</option>
            <option value="other">Other / Not Sure</option>
          </select>
        </FormField>

        <FormField label="Project Type" help="What type of project are you considering?">
          <div class="space-y-2">
            <label class="flex items-center">
              <input v-model="form.projectType" type="radio" value="new-design" class="mr-2" />
              <span>New Design</span>
            </label>
            <label class="flex items-center">
              <input v-model="form.projectType" type="radio" value="optimization" class="mr-2" />
              <span>Optimization</span>
            </label>
            <label class="flex items-center">
              <input v-model="form.projectType" type="radio" value="troubleshooting" class="mr-2" />
              <span>Troubleshooting / Problem Solving</span>
            </label>
            <label class="flex items-center">
              <input v-model="form.projectType" type="radio" value="other" class="mr-2" />
              <span>Other</span>
            </label>
          </div>
        </FormField>

        <FormField label="Project Description" help="Tell us about your engineering challenge">
          <textarea v-model="form.description" rows="4" class="px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800" placeholder="Describe your project, challenges, and objectives..."></textarea>
        </FormField>

        <FormField label="Timeline" help="When are you planning to start?">
          <select v-model="form.timeline" class="px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800">
            <option value="">Select timeline</option>
            <option value="immediate">Immediate (within 1 month)</option>
            <option value="short">Short-term (1-3 months)</option>
            <option value="medium">Medium-term (3-6 months)</option>
            <option value="long">Long-term (6+ months)</option>
            <option value="planning">Still planning</option>
          </select>
        </FormField>

        <FormField label="Budget Range" help="Approximate budget for this project">
          <select v-model="form.budget" class="px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 bg-white dark:bg-slate-800">
            <option value="">Select range</option>
            <option value="under-10k">Under $10K</option>
            <option value="10k-50k">$10K - $50K</option>
            <option value="50k-100k">$50K - $100K</option>
            <option value="100k-250k">$100K - $250K</option>
            <option value="over-250k">$250K+</option>
          </select>
        </FormField>
      </div>

      <template #footer>
        <BaseButtons>
          <BaseButton label="Cancel" color="info" outline @click="close" />
          <BaseButton label="Submit Request" color="success" @click="submit" />
        </BaseButtons>
      </template>
    </CardBoxModal>
  </OverlayLayer>
</template>

<script setup>
import { ref } from 'vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue'
import OverlayLayer from '@/components/OverlayLayer.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'

defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  selectedService: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const form = ref({
  name: '',
  email: '',
  company: '',
  jobTitle: '',
  phone: '',
  service: '',
  projectType: 'new-design',
  description: '',
  timeline: '',
  budget: ''
})

const close = () => {
  emit('update:modelValue', false)
}

const submit = () => {
  emit('submit', {
    ...form.value,
    serviceId: selectedService.value?.id
  })
  form.value = {
    name: '',
    email: '',
    company: '',
    jobTitle: '',
    phone: '',
    service: '',
    projectType: 'new-design',
    description: '',
    timeline: '',
    budget: ''
  }
  close()
}
</script>
