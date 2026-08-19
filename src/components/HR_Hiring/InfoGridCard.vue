<template>
  <div class="bg-white rounded-2xl shadow-md p-6 mb-6">
    <h3 class="text-lg font-semibold mb-4">{{ title }}</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
      <div v-for="(value, label) in items" :key="label">
        <strong class="font-medium">{{ label }}:</strong> {{ value || 'N/A' }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['title', 'items']);
</script>
