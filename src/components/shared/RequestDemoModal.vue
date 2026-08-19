<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <Transition
          enter-active-class="transition-all duration-300"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-200"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="modelValue"
            class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            <!-- Modal Header -->
            <div class="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white p-6 md:p-8 relative overflow-hidden">
              <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGgxMnYxMkg0OHYxMkgzNnYtMTJoMTJ2LTEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
              
              <div class="relative flex items-start justify-between">
                <div>
                  <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-4">
                    <svg class="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                    <span class="text-blue-200 text-sm font-semibold">Free Demo</span>
                  </div>
                  <h2 class="text-3xl md:text-4xl font-bold mb-2">
                    Request a Free Demonstration
                  </h2>
                  <p class="text-blue-200">
                    Experience MSC Software solutions firsthand - No commitment required
                  </p>
                </div>
                <button
                  @click="closeModal"
                  class="flex-shrink-0 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Modal Body - Scrollable -->
            <div class="overflow-y-auto max-h-[calc(90vh-200px)] p-6 md:p-8">
              <form @submit.prevent="submitForm" class="space-y-6">
                <!-- Personal Information -->
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Personal Information
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        First Name <span class="text-red-500">*</span>
                      </label>
                      <input
                        v-model="formData.firstName"
                        type="text"
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        Last Name <span class="text-red-500">*</span>
                      </label>
                      <input
                        v-model="formData.lastName"
                        type="text"
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                </div>

                <!-- Contact Information -->
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    Contact Information
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        Email <span class="text-red-500">*</span>
                      </label>
                      <input
                        v-model="formData.email"
                        type="email"
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="john.doe@company.com"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number <span class="text-red-500">*</span>
                      </label>
                      <input
                        v-model="formData.phone"
                        type="tel"
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                <!-- Company Information -->
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    Company Information
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        Company Name <span class="text-red-500">*</span>
                      </label>
                      <input
                        v-model="formData.company"
                        type="text"
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Your Company Inc."
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        Industry <span class="text-red-500">*</span>
                      </label>
                      <select
                        v-model="formData.industry"
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                      >
                        <option value="">Select Industry</option>
                        <option value="aerospace">Aerospace</option>
                        <option value="automotive">Automotive</option>
                        <option value="consumer-products">Consumer Products</option>
                        <option value="defense">Defense</option>
                        <option value="electronics">Electronics</option>
                        <option value="energy">Energy</option>
                        <option value="heavy-equipment">Heavy Equipment</option>
                        <option value="machinery">Machinery</option>
                        <option value="medical">Medical</option>
                        <option value="packaging">Packaging</option>
                        <option value="rail">Rail</option>
                        <option value="shipbuilding">Shipbuilding</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div class="mt-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <textarea
                      v-model="formData.address"
                      rows="2"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                      placeholder="Company address (optional)"
                    ></textarea>
                  </div>
                </div>

                <!-- Product Selection -->
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                    </svg>
                    MSC Software Products (Select all that apply)
                  </h3>
                  <div class="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <label
                      v-for="product in products"
                      :key="product"
                      class="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        :value="product"
                        v-model="formData.selectedProducts"
                        class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span class="text-sm font-medium text-gray-700">{{ product }}</span>
                    </label>
                  </div>
                  <p class="text-xs text-gray-500 mt-2">Selected: {{ formData.selectedProducts.length }} products</p>
                </div>

                <!-- Service Type -->
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    Services Interested In
                  </h3>
                  <div class="space-y-3">
                    <label
                      v-for="service in services"
                      :key="service.value"
                      class="flex items-start gap-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-transparent hover:border-blue-400 transition-all cursor-pointer"
                      :class="formData.selectedServices.includes(service.value) ? 'border-blue-500 bg-blue-100' : ''"
                    >
                      <input
                        type="checkbox"
                        :value="service.value"
                        v-model="formData.selectedServices"
                        class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 mt-0.5"
                      />
                      <div>
                        <span class="font-semibold text-gray-900">{{ service.name }}</span>
                        <p class="text-sm text-gray-600 mt-1">{{ service.description }}</p>
                      </div>
                    </label>
                  </div>
                </div>

                <!-- Analysis Type -->
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                    Type of Analysis Needed
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label
                      v-for="analysis in analysisTypes"
                      :key="analysis"
                      class="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        :value="analysis"
                        v-model="formData.analysisTypes"
                        class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                      />
                      <span class="text-sm font-medium text-gray-700">{{ analysis }}</span>
                    </label>
                  </div>
                </div>

                <!-- Preferred Demo Format -->
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                    Preferred Demo Format
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label
                      v-for="format in demoFormats"
                      :key="format.value"
                      class="flex items-center gap-3 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-transparent hover:border-green-400 transition-all cursor-pointer"
                      :class="formData.demoFormat === format.value ? 'border-green-500 bg-green-100' : ''"
                    >
                      <input
                        type="radio"
                        :value="format.value"
                        v-model="formData.demoFormat"
                        class="w-4 h-4 text-green-600 border-gray-300 focus:ring-2 focus:ring-green-500"
                      />
                      <div>
                        <div class="font-semibold text-gray-900 text-sm">{{ format.name }}</div>
                        <div class="text-xs text-gray-600">{{ format.duration }}</div>
                      </div>
                    </label>
                  </div>
                </div>

                <!-- Additional Information -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Additional Comments / Requirements
                  </label>
                  <textarea
                    v-model="formData.comments"
                    rows="4"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                    placeholder="Tell us about your specific needs, timeline, or any questions you have..."
                  ></textarea>
                </div>

                <!-- Privacy Consent -->
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <label class="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      v-model="formData.consent"
                      required
                      class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 mt-0.5"
                    />
                    <span class="text-sm text-gray-700">
                      I acknowledge that the information I provide might be used by Hi-Tech SoftSys for contacting me with personalized product offerings, training programs, and technical support. <span class="text-red-500">*</span>
                    </span>
                  </label>
                </div>

                <!-- Form Actions -->
                <div class="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    class="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                    <span>Submit Request</span>
                  </button>
                  <button
                    type="button"
                    @click="closeModal"
                    class="px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  industry: '',
  address: '',
  selectedProducts: [],
  selectedServices: [],
  analysisTypes: [],
  demoFormat: 'online',
  comments: '',
  consent: false
})

const products = [
  'MSC Nastran',
  'Patran',
  'Marc',
  'Dytran',
  'MSC Apex',
  'Actran',
  'Adams',
  'CAEfatigue',
  'MSC CoSim',
  'Digimat',
  'Easy5',
  'Simufact',
  'Cradle CFD',
  'MSC One',
  'MaterialCenter',
  'SimManager'
]

const services = [
  {
    value: 'software-sales',
    name: 'Software Sales',
    description: 'MSC Software licensing and purchase'
  },
  {
    value: 'engineering-services',
    name: 'Engineering Services',
    description: 'FEA, CFD, and analysis consulting'
  },
  {
    value: 'training',
    name: 'Training Services',
    description: 'On-site, online, and certification programs'
  },
  {
    value: 'technical-support',
    name: 'Technical Support',
    description: '24/7 software support and troubleshooting'
  }
]

const analysisTypes = [
  'Structural Analysis',
  'Thermal Analysis',
  'CFD Analysis',
  'Crash & Impact',
  'Fatigue & Durability',
  'Acoustics & NVH',
  'Multibody Dynamics',
  'Optimization',
  'Virtual Manufacturing',
  'Materials Engineering (ICME)'
]

const demoFormats = [
  { value: 'online', name: 'Online Demo', duration: '30-60 mins' },
  { value: 'onsite', name: 'On-Site Demo', duration: '2-4 hours' },
  { value: 'recorded', name: 'Recorded Demo', duration: 'On-demand' }
]

const closeModal = () => {
  emit('update:modelValue', false)
}

const submitForm = () => {
  // Validate that at least one product is selected
  if (formData.value.selectedProducts.length === 0) {
    alert('Please select at least one MSC Software product')
    return
  }

  // Validate that at least one service is selected
  if (formData.value.selectedServices.length === 0) {
    alert('Please select at least one service you are interested in')
    return
  }

  console.log('Demo Request Submitted:', formData.value)
  
  // Emit the form data to parent
  emit('submit', { ...formData.value })
  
  // Show success message
  alert('Thank you for your interest! Our team will contact you shortly to schedule your free demonstration.')
  
  // Reset form
  resetForm()
  closeModal()
}

const resetForm = () => {
  formData.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    address: '',
    selectedProducts: [],
    selectedServices: [],
    analysisTypes: [],
    demoFormat: 'online',
    comments: '',
    consent: false
  }
}

// Prevent body scroll when modal is open
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
/* Custom scrollbar for product list */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #94a3b8;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
</style>

