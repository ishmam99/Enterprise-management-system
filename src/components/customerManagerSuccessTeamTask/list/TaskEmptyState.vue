<script setup>
defineProps({
  hasFilters: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['create-task', 'reset-filters', 'refresh'])
</script>

<template>
  <div class="text-center py-16">
    <div class="max-w-md mx-auto">
      <div
        class="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <i class="fas fa-puzzle-piece text-gray-400 text-3xl"></i>
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-2">No tasks found</h3>
      <p class="text-gray-600 mb-8">
        {{ hasFilters
          ? 'Try adjusting your filters or search query to find what you\'re looking for.'
          : 'Get started by creating your first task to manage your success team assignments.' }}
      </p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center">

        <button
          class="px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 justify-center bg-gray-100 text-gray-700 hover:bg-gray-200"
          @click="$emit('refresh')">
          <i class="fas fa-sync-alt"></i>
          Refresh
        </button>
      </div>
    </div>
  </div>
</template>
