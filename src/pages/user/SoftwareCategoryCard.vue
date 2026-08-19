<template>
  <div class="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div class="flex items-center justify-between mb-4">
      <div :class="`p-3 rounded-xl ${category.color}`">
        <i :class="`${category.icon} text-white text-xl`"></i>
      </div>
      <span class="text-2xl font-bold text-gray-800">{{ category.count }}</span>
    </div>
    <h4 class="text-lg font-semibold text-gray-800 mb-2">{{ category.name }}</h4>
    <p class="text-sm text-gray-500">Software solutions available</p>
  </div>
</template>

<script setup>
defineProps({
  category: Object
});
</script>
