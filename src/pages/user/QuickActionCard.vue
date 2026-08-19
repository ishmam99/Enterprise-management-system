<template>
  <router-link
    :to="to"
    class="relative flex flex-col items-center justify-center p-6 bg-white rounded-2xl border-2 border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 group overflow-hidden hover:-translate-y-1"
  >
    <div class="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div :class="`h-16 w-16 bg-${color}-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-${color}-500/20 transition-colors z-10`">
      <i :class="`${icon} text-${color}-600 text-2xl`"></i>
    </div>
    <span :class="`text-lg font-semibold text-gray-800 group-hover:text-${color}-700 z-10 mb-2`">
      {{ title }}
    </span>
    <p class="text-sm text-gray-500 text-center z-10">{{ description }}</p>
  </router-link>
</template>

<script setup>
defineProps({
  to: String,
  title: String,
  icon: String,
  color: String,
  description: String
});
</script>
