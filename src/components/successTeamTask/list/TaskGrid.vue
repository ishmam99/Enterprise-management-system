
<script setup>
import { formatRelativeDate, getStatusConfig, getOutputSummary } from './taskUtils'

const props = defineProps({
  assignments: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['view-details', 'edit-task', 'delete-task'])
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="task in assignments"
      :key="task.id"
      class="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
    >
      <div class="px-6 pt-6">
        <div class="flex items-center justify-between mb-4">
          <span
            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
            :class="[getStatusConfig(task.status).bgColor, getStatusConfig(task.status).textColor]"
          >
            <span class="w-2 h-2 rounded-full" :class="getStatusConfig(task.status).dotColor"></span>
            {{ getStatusConfig(task.status).label }}
          </span>
          <div class="relative group">
            <button class="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
              <i class="fas fa-ellipsis-v"></i>
            </button>
            <div class="absolute right-0 top-full mt-2 w-48 rounded-xl bg-white shadow-lg border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <button
                class="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700"
                @click="$emit('view-details', task.id)"
              >
                <i class="fas fa-eye text-gray-400"></i>
                View Details
              </button>
              <button
                class="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700"
                @click="$emit('edit-task', task.id)"
              >
                <i class="fas fa-edit text-gray-400"></i>
                Edit
              </button>
              <button
                class="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center gap-2 text-red-600"
                @click="$emit('delete-task', task.id, task.solution?.name)"
              >
                <i class="fas fa-trash text-red-400"></i>
                Delete
              </button>
            </div>
          </div>
        </div>

        <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
          {{ task.solution?.name || 'Unnamed Task' }}
        </h3>
        <p class="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {{ task.description || 'No description provided' }}
        </p>
      </div>

      <div class="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
              <i class="fas fa-desktop text-emerald-500"></i>
            </div>
            <div>
              <div class="text-sm font-medium text-gray-900">{{ task.software?.name || 'No software' }}</div>
              <div class="text-xs text-gray-500">Software</div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
              <i class="fas fa-user text-blue-500"></i>
            </div>
            <div>
              <div class="text-sm font-medium text-gray-900">{{ task.assigned_person?.name || 'Unassigned' }}</div>
              <div class="text-xs text-gray-500">{{ task.assigned_person?.role || 'No role' }}</div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center">
              <i class="fas fa-calendar text-amber-500"></i>
            </div>
            <div>
              <div class="text-sm font-medium text-gray-900">{{ formatRelativeDate(task.created_at) }}</div>
              <div class="text-xs text-gray-500">Created</div>
            </div>
          </div>
        </div>

        <div class="mt-4 pt-4 border-t border-gray-200">
          <div class="flex justify-between items-center mb-2">
            <span class="text-xs font-medium text-gray-600">Latest Update</span>
            <span class="text-xs text-gray-500 flex items-center gap-1">
              <i class="fas fa-list"></i>
              {{ task.outputs?.length || 0 }}
            </span>
          </div>
          <p class="text-xs text-gray-600 truncate italic">
            {{ getOutputSummary(task.outputs) }}
          </p>
        </div>
      </div>

      <div class="px-6 py-4 bg-white border-t border-gray-100">
        <div class="flex justify-between items-center">
          <button
            class="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
            @click="$emit('view-details', task.id)"
          >
            View Details
            <i class="fas fa-arrow-right text-xs"></i>
          </button>
          <div class="flex items-center gap-2 text-xs text-gray-500">
            <i class="fas fa-users"></i>
            {{ task.success_team?.name || '—' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

.group:hover .group-hover\:visible {
  visibility: visible;
}
</style>
