<template>
  <div class="min-h-screen w-5/6 bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex items-center gap-3 mb-6">
        <router-link to="/business_management/business/partners" class="text-gray-400 hover:text-gray-600 transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </router-link>
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Add New Partner</h1>
          <p class="text-gray-500 text-sm mt-1">Create a new business development partner</p>
        </div>
      </div>

      <div class="bg-green-50 rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <form @submit.prevent="savePartner" class="p-6 space-y-6">
          <!-- Form Fields -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Partner Name *</label>
              <input type="text" v-model="form.name" required class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" placeholder="e.g. Boeing Aerospace">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Type *</label>
              <select v-model="form.type" required class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition">
                <option value="">Select type...</option>
                <option value="Strategic">Strategic</option>
                <option value="Technology">Technology</option>
                <option value="Distribution">Distribution</option>
                <option value="Channel">Channel</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" v-model="form.email" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" placeholder="partner@example.com">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="text" v-model="form.phone" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" placeholder="(555) 123-4567">
            </div>
          </div>

          <!-- Notes -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
            <textarea v-model="form.notes" rows="3" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition" placeholder="Any additional information..."></textarea>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
            <router-link to="/business_management/business/partners" class="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition font-medium text-center">
              Cancel
            </router-link>
            <button type="submit" class="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl transition shadow-lg shadow-purple-200 flex items-center justify-center gap-2 font-medium" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Create Partner</span>
              <span v-else class="flex items-center gap-2">
                <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccess" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="showSuccess = false">
      <div class="bg-white rounded-2xl max-w-md w-full p-8 text-center shadow-2xl">
        <div class="text-6xl mb-4">🎉</div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">Partner Created!</h3>
        <p class="text-gray-600">Partner has been successfully created.</p>
        <div class="mt-6 flex flex-col gap-3">
          <router-link to="/business_management/business/partners" class="bg-purple-600 text-white px-6 py-2.5 rounded-xl hover:bg-purple-700 transition shadow-lg shadow-purple-200">
            View All Partners
          </router-link>
          <router-link to="/business_management/business/partners/create" class="text-purple-600 hover:text-purple-700 font-medium">
            Add Another Partner
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isSubmitting = ref(false)
const showSuccess = ref(false)

const form = ref({
  name: '',
  type: '',
  email: '',
  phone: '',
  notes: ''
})

const savePartner = async () => {
  isSubmitting.value = true
  await new Promise(resolve => setTimeout(resolve, 1200))
  isSubmitting.value = false
  showSuccess.value = true
  // In real app: API call here
}
</script>