<template>
  <div 
    class="relative w-full overflow-hidden py-2 md:py-8"
    :class="[
      variant === 'light' ? 'bg-white' : 
      variant === 'glass' ? 'bg-white/5 backdrop-blur-sm' : 
      'bg-slate-900/95'
    ]"
  >
    <!-- Edge fade overlays -->
    <div 
      class="absolute inset-y-0 left-0 w-24 md:w-32 z-10 pointer-events-none"
      :class="[
        variant === 'light' ? 'bg-gradient-to-r from-white via-white/80 to-transparent' : 
        variant === 'glass' ? 'bg-gradient-to-r from-slate-900/30 via-slate-900/20 to-transparent' : 
        'bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent'
      ]"
    ></div>
    <div 
      class="absolute inset-y-0 right-0 w-24 md:w-32 z-10 pointer-events-none"
      :class="[
        variant === 'light' ? 'bg-gradient-to-l from-white via-white/80 to-transparent' : 
        variant === 'glass' ? 'bg-gradient-to-l from-slate-900/30 via-slate-900/20 to-transparent' : 
        'bg-gradient-to-l from-slate-900 via-slate-900/80 to-transparent'
      ]"
    ></div>
    
    <!-- Marquee Track -->
    <div 
      class="marquee-track flex whitespace-nowrap"
      :class="{ 'hover:opacity-80 transition-opacity duration-700': hoverPause }"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div 
        class="marquee-content flex items-center gap-6 md:gap-10"
        :style="{
          animationDuration: duration,
          animationPlayState: isPaused ? 'paused' : 'running'
        }"
      >
        <span 
          v-for="(item, index) in duplicatedItems" 
          :key="index"
          class="text-sm md:text-base lg:text-sm font-medium tracking-wider uppercase whitespace-nowrap"
          :class="[
            variant === 'light' ? 'text-slate-800' : 'text-slate-200',
            'hover:text-blue-400 transition-colors duration-300'
          ]"
        >
          {{ item }}
          <span 
            v-if="index < duplicatedItems.length - 1" 
            class="mx-4 md:mx-4 select-none"
            :class="variant === 'light' ? 'text-blue-600/60' : 'text-blue-400/60'"
          >
            ◆
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    validator: (value) => Array.isArray(value) && value.length > 0
  },
  speed: {
    type: String,
    default: '35s',
    validator: (value) => /^\d+(\.\d+)?s$/.test(value)
  },
  direction: {
    type: String,
    default: 'right-to-left',
    validator: (value) => ['right-to-left', 'left-to-right'].includes(value)
  },
  separator: {
    type: String,
    default: '◆',
    validator: (value) => value && value.length <= 3
  },
  variant: {
    type: String,
    default: 'dark',
    validator: (value) => ['dark', 'light', 'glass'].includes(value)
  },
  hoverPause: {
    type: Boolean,
    default: true
  }
})

const isPaused = ref(false)

// Duplicate items 3 times for seamless loop
const duplicatedItems = computed(() => {
  return [...props.items, ...props.items, ...props.items]
})

const duration = computed(() => {
  // Use the speed prop directly
  return props.speed
})

const handleMouseEnter = () => {
  if (props.hoverPause) {
    isPaused.value = true
  }
}

const handleMouseLeave = () => {
  if (props.hoverPause) {
    isPaused.value = false
  }
}
</script>

<style scoped>
.marquee-track {
  overflow: hidden;
  position: relative;
  width: 100%;
}

.marquee-content {
  display: flex;
  align-items: center;
  gap: 3rem;
  animation: marqueeScroll var(--marquee-duration, 35s) linear infinite;
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);
}

@keyframes marqueeScroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.333%);
  }
}

/* Smooth rendering */
.marquee-content {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .marquee-content {
    animation: none !important;
  }
  .hover\:opacity-80:hover {
    opacity: 1 !important;
  }
}

/* Responsive gaps */
@media (max-width: 640px) {
  .marquee-content {
    gap: 2rem;
  }
}
</style>