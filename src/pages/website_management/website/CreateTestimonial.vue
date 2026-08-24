<template>
  <div class="min-h-screen w-5/6 px-10 py-6">
    <div class="flex items-center gap-3 mb-6">
      <RouterLink to="/website_management/testimonials" class="text-gray-400 hover:text-gray-600 transition">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </RouterLink>
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
          <span class="text-2xl">💬</span>
        </div>
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Add Testimonial</h1>
          <p class="text-gray-500 text-sm">Create a new client testimonial</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
      <form @submit.prevent="saveTestimonial" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Name <span class="text-red-500">*</span></label>
          <input type="text" v-model="form.name" required class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition" placeholder="Client name">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Company</label>
          <input type="text" v-model="form.company" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition" placeholder="Company name">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Content <span class="text-red-500">*</span></label>
          <textarea v-model="form.content" rows="4" required class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition" placeholder="Write the testimonial..."></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Rating</label>
          <select v-model="form.rating" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition">
            <option value="5">⭐⭐⭐⭐⭐ (5)</option>
            <option value="4">⭐⭐⭐⭐ (4)</option>
            <option value="3">⭐⭐⭐ (3)</option>
            <option value="2">⭐⭐ (2)</option>
            <option value="1">⭐ (1)</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select v-model="form.is_active" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition">
            <option :value="true">Active</option>
            <option :value="false">Inactive</option>
          </select>
        </div>
        <div class="flex gap-3 pt-4 border-t border-gray-100">
          <RouterLink to="/website_management/testimonials" class="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition text-center font-medium">Cancel</RouterLink>
          <button type="submit" class="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition shadow-lg shadow-green-500/30 font-medium" :disabled="isSubmitting">
            {{ isSubmitting ? 'Saving...' : 'Save Testimonial' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isSubmitting = ref(false)

const form = ref({
  name: '',
  company: '',
  content: '',
  rating: 5,
  is_active: true
})

const saveTestimonial = async () => {
  isSubmitting.value = true
  await new Promise(resolve => setTimeout(resolve, 800))
  isSubmitting.value = false
  router.push('/website_management/testimonials')
}
</script>