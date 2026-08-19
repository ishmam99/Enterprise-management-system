<template>
  <div class="bg-white border border-gray-200 rounded-xl shadow-sm mb-6 overflow-hidden">

    <!-- Top Bar - Formal & Colorful -->
    <div class="flex flex-wrap items-center justify-between gap-4 px-6 py-8 border-b"
         :style="{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }">

      <!-- Title Section -->
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 flex items-center justify-center rounded-lg bg-white bg-opacity-20 text-white text-xl backdrop-blur-sm">
          <i class="fas fa-clipboard-list"></i>
        </div>

        <div>
          <p class="text-xl font-semibold text-white text-opacity-90 uppercase tracking-wide">
            Current Hiring Status : <span class="text-2xl font-semibold text-white"></span> {{ currentStepName }}
          </p>

        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3">
        <button
          @click="$emit('back')"
          class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition backdrop-blur-sm border border-white border-opacity-30"
        >
          <i class="fas fa-arrow-left text-xs"></i>
          Back
        </button>

        <button
          v-if="candidate?.resume"
          @click="$emit('view-resume')"
          class="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold bg-white text-purple-700 rounded-lg shadow hover:bg-opacity-90 transition"
        >
          <i class="fas fa-file-alt text-xs"></i>
          View Resume
        </button>
      </div>
    </div>

    <!-- Candidate Info - Colorful Accents -->
 <div
  v-if="candidate?.full_name"
  class="flex flex-wrap items-center justify-between gap-6 px-8 py-6 bg-white border border-gray-200 rounded-lg shadow-sm"
>
  <div class="flex items-center gap-5">
    <div class="w-14 h-14 flex items-center justify-center rounded-full bg-slate-800 text-white text-lg font-medium tracking-wider shadow-inner">
      {{ getInitials(candidate.full_name) }}
    </div>

    <div class="space-y-1">
      <h2 class="text-xl font-bold text-slate-900 tracking-tight">
        {{ candidate.full_name }}
      </h2>

      <div class="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-slate-500">
        <span v-if="candidate.email" class="flex items-center gap-2">
          <i class="far fa-envelope text-slate-400"></i>
          <span class="hover:text-slate-800 transition-colors cursor-default">{{ candidate.email }}</span>
        </span>

        <span v-if="candidate.contact" class="flex items-center gap-2">
          <i class="fas fa-phone-alt text-slate-400 text-xs"></i>
          <span>{{ candidate.contact }}</span>
        </span>
      </div>
    </div>
  </div>

  <div class="flex items-center">
    <div class="hidden sm:block h-12 w-px bg-gray-200 mr-8"></div>

    <div class="text-left sm:text-right">
      <p class="text-[10px] uppercase font-bold tracking-[0.1em] text-slate-400 mb-1">
        Position Applied
      </p>

      <p class="text-base font-bold text-slate-800">
        {{ candidate.job?.title || 'Not Specified' }}
      </p>

      <div class="inline-flex items-center mt-1 px-2 py-0.5 rounded bg-slate-100 text-[11px] font-semibold text-slate-600 uppercase tracking-wide">
        {{ candidate.job?.department || 'Operations' }}
      </div>
    </div>
  </div>
</div>

  </div>
</template>

<script setup>
const props = defineProps({
  candidate: { type: Object, required: true },
  currentStepName: { type: String, required: true }
})
defineEmits(['back', 'view-resume'])

const getInitials = (name) => {
  if (!name) return '?'
  return name
    .split(' ')
    .map(part => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
</script>
