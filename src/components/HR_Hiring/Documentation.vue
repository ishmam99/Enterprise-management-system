<template>
  <div class=" rounded-2xl shadow-md p-6 mb-6 bg-teal-50">
     <div class="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 mb-8 text-white shadow-md">
  <h2 class="text-3xl font-bold">5. Documentation</h2>
  <p class="text-indigo-100 mt-2">Upload and verify candidate documentation</p>
</div>

    <button
      v-if="candidate.documents_verified !== '1'"
      @click="$emit('verify-docs', 'documents_verified')"
      :disabled="verifying"
      class="w-52 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 text-sm transition"
    >
      <span v-if="verifying" class="inline-block animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent mr-1"></span>
      Mark Documents Received & Verified
    </button>
    <div v-else class="text-left text-green-600 text-sm font-medium flex items-center gap-1">
      <span class="text-lg">✓</span> Received & Verified
    </div>

    <div class="mt-6 border-t pt-4">
      <h4 class="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        ✍️ Signature
        <span :class="candidate.signature_uploaded === '1' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'"
              class="px-2 py-0.5 rounded-full text-xs font-medium transition-colors">
          {{ candidate.signature_uploaded === '1' ? 'Uploaded ✓' : 'Not Uploaded' }}
        </span>
      </h4>

      <div v-if="isEditingSignature" class="space-y-3 bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300">
        <input
          type="file"
          @change="(e) => $emit('handle-file', e)"
          accept="image/*"
          class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />

        <div v-if="signaturePreview" class="mt-2">
          <p class="text-xs text-gray-500 mb-1">Preview:</p>
          <img :src="signaturePreview" class="h-24 border rounded-md shadow-sm bg-white p-2 object-contain" />
        </div>

        <div class="flex gap-2 pt-2">
          <button @click="$emit('save-signature')" class="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
            💾 Save Signature
          </button>
          <button @click="$emit('cancel-signature')" class="px-4 py-2 bg-gray-400 text-white rounded-lg text-sm font-medium hover:bg-gray-500">
            ❌ Cancel
          </button>
        </div>
      </div>

      <div v-else class="flex flex-col items-start">
        <div v-if="candidate.signature_uploaded === '1'" class="mt-3">
          <img :src="`${baseUrl}/${candidate.signature_path}`"
               @error="(e) => e.target.src = 'https://placehold.co/200x100?text=Signature+Error'"
               class="h-24 border rounded-md shadow-sm bg-white p-2 object-contain" />
        </div>
        <div v-else class="text-sm text-red-500 mt-2">
          ❌ Signature not uploaded yet.
        </div>

        <button @click="$emit('start-edit-signature')"
                class="mt-4 px-4 py-1.5 border border-indigo-600 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-50 transition">
          {{ candidate.signature_uploaded === '1' ? '✏️ Update Signature' : '➕ Add Signature' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  candidate: { type: Object, required: true },
  verifying: { type: Boolean, default: false },
  isEditingSignature: { type: Boolean, default: false },
  signaturePreview: { type: [String, null], default: null },
  baseUrl: { type: String, required: true }
});

defineEmits([
  'verify-docs',
  'handle-file',
  'save-signature',
  'cancel-signature',
  'start-edit-signature'
]);
</script>
