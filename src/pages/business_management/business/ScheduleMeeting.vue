<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-6">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center gap-3 mb-6">
        <router-link to="/business_management/business/meetings" class="text-gray-400 hover:text-gray-600 transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </router-link>
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Schedule Meeting</h1>
          <p class="text-gray-500 text-sm mt-1">Schedule a new meeting with a partner</p>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <form @submit.prevent="saveItem" class="p-6 space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input type="text" v-model="form.title" required class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" placeholder="e.g. Partnership Strategy Review">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Partner</label>
            <select v-model="form.partner_id" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition">
              <option :value="null">Select partner...</option>
              <option v-for="partner in partners" :key="partner.id" :value="partner.id">{{ partner.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Scheduled Date & Time *</label>
            <input type="datetime-local" v-model="form.scheduled_at" required class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea v-model="form.notes" rows="3" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition" placeholder="Meeting notes..."></textarea>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
            <router-link to="/business_management/business/meetings" class="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition font-medium text-center">Cancel</router-link>
            <button type="submit" class="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl transition shadow-lg shadow-purple-200 font-medium">Schedule Meeting</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const partners = ref([
  { id: 1, name: 'Boeing Aerospace' },
  { id: 2, name: 'Lockheed Martin' },
  { id: 3, name: 'Composite Technologies Inc.' },
  { id: 4, name: 'Global Distribution Partners' }
])

const form = ref({ title: '', partner_id: null, scheduled_at: '', notes: '' })

const saveItem = async () => {
  await new Promise(resolve => setTimeout(resolve, 600))
  // In real app: API call here
}
</script>