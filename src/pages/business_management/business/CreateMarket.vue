<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-6">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center gap-3 mb-6">
        <router-link to="/business_management/business/markets" class="text-gray-400 hover:text-gray-600 transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </router-link>
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Add New Market</h1>
          <p class="text-gray-500 text-sm mt-1">Create a new target market</p>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <form @submit.prevent="saveItem" class="p-6 space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Market Name *</label>
            <input type="text" v-model="form.name" required class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" placeholder="e.g. North America">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Region Details</label>
            <textarea v-model="form.region_details" rows="3" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition" placeholder="Additional region information..."></textarea>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
            <router-link to="/business_management/business/markets" class="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition font-medium text-center">Cancel</router-link>
            <button type="submit" class="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl transition shadow-lg shadow-purple-200 font-medium">Create Market</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({ name: '', region_details: '' })

const saveItem = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 600))
  // In real app: API call here
}
</script>