<template>
  <div class="bg-white rounded-2xl shadow-md p-6 mb-6">
    <h3 class="text-lg font-semibold mb-4">Candidate Access Link</h3>
    <div v-if="!hasToken" class="space-y-3">
      <p class="text-sm text-gray-600">No access link generated yet.</p>
      <button @click="$emit('generate')" :disabled="loading" class="px-4 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50">
        🔗 Generate Temporary Link
      </button>
    </div>
    <div v-else class="space-y-3">
      <div class="bg-blue-50 rounded-lg p-4">
        <p class="text-xs text-gray-500 uppercase">Access Link</p>
        <p class="text-sm font-mono text-gray-700 break-all">{{ fullLink }}</p>
        <div class="flex gap-2 mt-4">
          <button @click="$emit('copy')" class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm">📋 Copy</button>
          <button @click="$emit('generate')" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm">🔄 Regenerate</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['hasToken', 'fullLink', 'loading']);
defineEmits(['generate', 'copy']);
</script>
