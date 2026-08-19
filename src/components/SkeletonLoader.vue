<template>
  <div :class="wrapperClass">
    <div
      v-for="n in lines"
      :key="n"
      class="animate-pulse rounded bg-gray-200 dark:bg-gray-700"
      :style="lineStyle(n)"
    ></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  lines: { type: Number, default: 3 },
  height: { type: String, default: '16px' },
  gap: { type: String, default: '8px' },
  radius: { type: String, default: '6px' },
  randomWidth: { type: Boolean, default: true }
})

const wrapperClass = computed(() => `flex flex-col gap-[${props.gap}]`)

const lineStyle = (n) => {
  const width = props.randomWidth
    ? `${80 + Math.random() * 20}%`
    : '100%'

  return {
    height: props.height,
    width,
    borderRadius: props.radius
  }
}
</script>
