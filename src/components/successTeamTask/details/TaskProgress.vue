<!-- src/components/tasks/TaskProgress.vue -->
<script setup>
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const formatDateOnly = (date) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const progressPercentage = () => {
  if (!props.task.outputs || props.task.outputs.length === 0) return 0
  const completed = props.task.outputs.filter(o => o.status === '1').length
  return Math.round((completed / props.task.outputs.length) * 100)
}
</script>

<template>
  <div class="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
    <div class="flex items-center gap-3 mb-8">
      <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
        <i class="fas fa-chart-line text-white text-xl"></i>
      </div>
      <div>
        <h2 class="text-xl font-bold text-gray-900">Progress Tracking</h2>
        <p class="text-sm text-gray-500">Task completion overview</p>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="mb-8">
      <div class="flex justify-between items-center mb-3">
        <span class="font-medium text-gray-700">Task Completion</span>
        <span class="font-bold text-gray-900 text-lg">{{ progressPercentage() }}%</span>
      </div>
      <div class="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          class="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-1000"
          :style="{ width: progressPercentage() + '%' }"
        ></div>
      </div>
    </div>

    <!-- Stats -->
    <div class="space-y-4">
      <div class="flex justify-between items-center p-4 rounded-xl hover:bg-gray-50 transition-colors">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <i class="fas fa-list-check text-blue-500"></i>
          </div>
          <span class="text-gray-700">Total Updates</span>
        </div>
        <span class="font-bold text-gray-900 text-lg">{{ task.outputs?.length || 0 }}</span>
      </div>

      <div class="flex justify-between items-center p-4 rounded-xl hover:bg-gray-50 transition-colors">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
            <i class="fas fa-check-circle text-emerald-500"></i>
          </div>
          <span class="text-gray-700">Resolved</span>
        </div>
        <span class="font-bold text-gray-900 text-lg">{{ task.outputs?.filter(o => o.status === '1').length || 0 }}</span>
      </div>

      <div class="flex justify-between items-center p-4 rounded-xl hover:bg-gray-50 transition-colors">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
            <i class="fas fa-clock text-amber-500"></i>
          </div>
          <span class="text-gray-700">Pending</span>
        </div>
        <span class="font-bold text-gray-900 text-lg">{{ task.outputs?.filter(o => o.status === '0').length || 0 }}</span>
      </div>

      <div v-if="task.completed_at" class="flex justify-between items-center p-4 rounded-xl hover:bg-gray-50 transition-colors">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
            <i class="fas fa-flag-checkered text-purple-500"></i>
          </div>
          <span class="text-gray-700">Completed On</span>
        </div>
        <span class="font-medium text-gray-900">{{ formatDateOnly(task.completed_at) }}</span>
      </div>
    </div>
  </div>
</template>
