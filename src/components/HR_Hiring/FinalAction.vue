<!-- src/components/hiring/FinalAction.vue -->
<template>
  <div class="bg-white rounded-2xl shadow-md p-6" v-if="currentStatusIndex < steps.length - 1 && currentStatus != 10 && currentStatus >= 1">
    <h3 class="text-lg font-semibold mb-4">Final Action</h3>
    <div v-if="!allRequiredCompleted && currentStatusIndex < steps.length - 1" class="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
      <p class="text-sm text-yellow-800 flex items-center gap-2">
        <span>⚠️</span><span>Complete all required fields above to proceed to next stage</span>
      </p>
    </div>
    <button :disabled="!allRequiredCompleted" @click="$emit('move-to-next')" class="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
      Move to {{ steps[currentStatusIndex + 1]?.label }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  steps: { type: Array, required: true },
  currentStatusIndex: { type: Number, required: true },
  currentStatus: { type: Number, required: true },
  allRequiredCompleted: { type: Boolean, required: true }
})
defineEmits(['move-to-next'])
</script>
