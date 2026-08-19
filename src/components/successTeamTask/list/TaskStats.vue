
<script setup>
defineProps({
  stats: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Total Tasks</p>
          <p class="text-2xl font-bold text-gray-900 mt-1">{{ stats.total }}</p>
        </div>
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
          <i class="fas fa-tasks text-blue-600 text-xl"></i>
        </div>
      </div>
      <div class="mt-4 text-xs text-gray-500">
        <span class="flex items-center gap-1">
          <i class="fas fa-arrow-up text-emerald-500"></i>
          <span class="text-emerald-600 font-medium">{{ stats.completed }}</span> completed
        </span>
      </div>
    </div>

    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">In Progress</p>
          <p class="text-2xl font-bold text-blue-600 mt-1">{{ stats.inProgress }}</p>
        </div>
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
          <i class="fas fa-spinner text-blue-500 text-xl"></i>
        </div>
      </div>
      <div class="mt-4 text-xs text-gray-500">
        Currently active tasks
      </div>
    </div>

    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Pending</p>
          <p class="text-2xl font-bold text-amber-600 mt-1">{{ stats.pending }}</p>
        </div>
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
          <i class="fas fa-clock text-amber-500 text-xl"></i>
        </div>
      </div>
      <div class="mt-4 text-xs text-gray-500">
        Awaiting assignment or start
      </div>
    </div>

    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Completion Rate</p>
          <p class="text-2xl font-bold text-emerald-600 mt-1">{{ stats.completionRate }}%</p>
        </div>
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center">
          <i class="fas fa-check-circle text-emerald-500 text-xl"></i>
        </div>
      </div>
      <div class="mt-4">
        <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            class="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
            :style="{ width: stats.completionRate + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
