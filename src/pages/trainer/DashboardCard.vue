<template>
  <div
    class="relative p-6 rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
    :class="`bg-gradient-to-br from-${color}-50 to-${color}-100 border border-${color}-200`"
  >
    <div class="flex items-start justify-between">
      <div>
        <h3 :class="`text-${color}-800 text-sm font-semibold uppercase tracking-wide`">
          {{ title }}
        </h3>
        <p :class="`text-3xl font-bold text-${color}-900 mt-2`">
          <count-up :end-val="value"></count-up>
        </p>
        <p :class="`text-xs text-${color}-600 mt-2`">{{ description }}</p>
      </div>
      <div :class="`p-3 bg-${color}-100 rounded-xl`">
        <i :class="`${icon} text-${color}-600 text-xl`"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import CountUp from "vue-countup-v3";

defineProps({
  title: String,
  value: Number,
  icon: String,
  color: String,
  description: String
});
</script>
