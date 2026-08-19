<template>
  <div class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6">
    <div class="flex items-center justify-between relative">
      <div class="absolute top-5 left-6 right-6 h-1.5 bg-slate-100 rounded-full"></div>

      <div
        class="absolute top-5 left-6 h-1.5 rounded-full transition-all duration-700 ease-out"
        :style="{
          width: progressWidth,
          background: 'linear-gradient(90deg, #10b981 0%, #22c55e 50%, #10b981 100%)'
        }"
      ></div>

      <div
        v-for="(step, index) in steps"
        :key="step.id"
        @click="$emit('step-click', step.id)"
        class="relative z-10 flex flex-col items-center w-full group cursor-pointer"
      >
        <div
          class="h-11 w-11 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300"
          :class="getStepCircleClass(step.id)"
        >
          <span :class="{ 'animate-pulse': currentStatus === step.id }">
            {{ index + 1 }}
          </span>
        </div>

        <span
          class="mt-3 text-xs font-semibold text-center transition-all duration-300 px-2 py-1 rounded-md"
          :class="getStepLabelClass(step.id)"
        >
          {{ step.label }}
        </span>

        <div class="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-lg">
          {{ getStepTooltip(step.id) }}
          <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 border-4 border-transparent border-t-slate-800"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  steps: { type: Array, required: true },
  currentStatus: { type: Number, required: true },
  progressWidth: { type: String, required: true }
})

defineEmits(['step-click'])

const handleStepClick = (id) => {
  // Only allow clicking steps that are already reached or completed
  if (id <= props.currentStatus) {
    emit('step-click', id)
  }
}

const getStepState = (stepId) => {
  if (props.currentStatus > stepId) return 'completed'
  if (props.currentStatus === stepId) return 'current'
  return 'incomplete'
}

const getStepCircleClass = (stepId) => {
  const state = getStepState(stepId)
  if (state === 'completed') return 'bg-emerald-500 text-white border-3 border-emerald-600 shadow-md scale-105'
  if (state === 'current') return 'bg-amber-400 text-amber-900 border-3 border-amber-500 ring-4 ring-amber-100 scale-110'
  return 'bg-red-100 text-red-400 border-3 border-red-200'
}

const getStepLabelClass = (stepId) => {
  const state = getStepState(stepId)
  if (state === 'completed') return 'text-emerald-700 bg-emerald-50'
  if (state === 'current') return 'text-amber-800 bg-amber-50 font-bold'
  return 'text-red-400 bg-red-50'
}

const getStepTooltip = (stepId) => {
  const state = getStepState(stepId)
  const step = props.steps.find(s => s.id === stepId)
  if (state === 'completed') return `✓ ${step?.label} (Done)`
  if (state === 'current') return `● ${step?.label} (Current)`
  return `○ ${step?.label} (Locked)`
}
</script>

<style scoped>
.border-3 { border-width: 3px; }
.animate-pulse { animation: pulse 2s infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
</style>
