<template>
  <div class="min-h-screen w-5/6 px-10 py-6">
    <div class="mx-auto">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
          <span class="text-2xl">⚙️</span>
        </div>
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Site Settings</h1>
          <p class="text-gray-500 text-sm">Manage your website configuration</p>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
        <form @submit.prevent="saveSettings" class="space-y-5">
          <!-- General -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                <input type="text" v-model="form.site_name" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                <input type="text" v-model="form.tagline" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition">
              </div>
            </div>
          </div>

          <!-- SEO -->
          <div class="pt-4 border-t border-gray-100">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                <input type="text" v-model="form.meta_title" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                <textarea v-model="form.meta_description" rows="2" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition"></textarea>
              </div>
            </div>
          </div>

          <!-- Social Links -->
          <div class="pt-4 border-t border-gray-100">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Social Links</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                <input type="url" v-model="form.facebook" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" placeholder="https://facebook.com/...">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Twitter/X</label>
                <input type="url" v-model="form.twitter" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" placeholder="https://twitter.com/...">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                <input type="url" v-model="form.linkedin" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" placeholder="https://linkedin.com/...">
              </div>
            </div>
          </div>

          <div class="flex gap-3 pt-4 border-t border-gray-100">
            <button type="reset" class="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition text-center font-medium">Reset</button>
            <button type="submit" class="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition shadow-lg shadow-purple-500/30 font-medium">Save Settings</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  site_name: 'Vermont Composites',
  tagline: 'Precision Composites for Critical Missions',
  meta_title: 'Vermont Composites - Advanced Composite Manufacturing',
  meta_description: 'Leading provider of composite solutions for aerospace, defense, and medical imaging.',
  facebook: 'https://facebook.com/vermontcomposites',
  twitter: 'https://twitter.com/vermontcomposites',
  linkedin: 'https://linkedin.com/company/vermontcomposites'
})

const saveSettings = () => {
  // Simulate saving
  console.log('Settings saved:', form.value)
  alert('Settings saved successfully!')
}
</script>