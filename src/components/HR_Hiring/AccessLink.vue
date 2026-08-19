<!-- src/components/hiring/AccessLink.vue -->
<template>
  <div class="bg-white rounded-2xl shadow-md p-6 mb-6">
    <h3 class="text-lg font-semibold mb-4">Candidate Access Link</h3>
    <div v-if="!hasAccessToken" class="space-y-3">
      <p class="text-sm text-gray-600">No access link generated yet. Generate a temporary link for the candidate to track their application status.</p>
      <button @click="$emit('generate-link')" :disabled="generating" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2">
        <span v-if="generating" class="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
        🔗 Generate Temporary Link
      </button>
    </div>
    <div v-else class="space-y-3">
      <div class="bg-blue-50 rounded-lg p-4">
        <div class="mb-3">
          <p class="text-xs text-gray-500 uppercase tracking-wide">Access Link</p>
          <p class="text-sm font-mono text-gray-700 break-all">{{ fullAccessLink }}</p>
        </div>
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p class="text-xs text-gray-500">Valid Until</p>
            <p class="text-sm font-semibold text-gray-800">{{ formatExpiryDate(accessTokenExpiry) }}</p>
          </div>
          <div class="flex gap-2">
            <button @click="$emit('copy-link')" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2">📋 Copy Access Link</button>
            <button @click="$emit('generate-link')" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2">🔄 Regenerate</button>
          </div>
        </div>
      </div>
      <div v-if="linkCopied" class="text-sm text-green-600">✓ Link copied to clipboard!</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  candidate: { type: Object, required: true },
  hasAccessToken: { type: Boolean, required: true },
  accessTokenExpiry: { type: [String, null], required: true },
  fullAccessLink: { type: String, required: true },
  generating: { type: Boolean, required: true },
  linkCopied: { type: Boolean, required: true }
})
defineEmits(['generate-link', 'copy-link'])
const formatExpiryDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A'
</script>
