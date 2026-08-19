<!-- src/components/tasks/TaskOverview.vue -->
<script setup>
import { ref, defineEmits } from 'vue'
import TaskEditForm from './TaskEditForm.vue'

const props = defineProps({
  task: {
    type: Object,
    required: true,

  },
   editing : Boolean
})

const emit = defineEmits(['refresh', 'task-updated' ,'editing-task'])

const formatDate = (date) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// const editing = ref(false)

const handleTaskUpdated = () => {
  // props.editing = false
  emit('refresh')
}

const handleCancelTaskEdit = () => {
  // props.editing = false
  emit('editing-task')
}
</script>

<template>
  <div class="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
          <i class="fas fa-info-circle text-white text-xl"></i>
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900">Task Overview</h2>
          <p class="text-sm text-gray-500">Comprehensive task information</p>
        </div>
      </div>
      <div class="text-sm text-gray-500">
        Last updated: {{ formatDate(task.updated_at) }}
      </div>
    </div>
   
    <TaskEditForm
      v-if="props.editing"
      :task="task"
      @cancel="handleCancelTaskEdit"
      @saved="handleTaskUpdated"
    />

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 class="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">Basic Information</h3>
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Solution</label>
            <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <i class="fas fa-puzzle-piece text-white"></i>
              </div>
              <span class="font-medium text-gray-900">{{ task.solution?.name || '—' }}</span>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Software</label>
            <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <i class="fas fa-desktop text-white"></i>
              </div>
              <span class="font-medium text-gray-900">{{ task.software?.name || '—' }}</span>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Success Team</label>
            <div class="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div class="font-medium text-gray-900">{{ task.success_team?.name || '—' }}</div>
              <div class="text-sm text-gray-500 mt-1">Created by: {{ task.user?.name || '—' }}</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">Assignment</h3>
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
            <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div class="relative">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-semibold">
                  {{ task.assigned_person?.name?.charAt(0) || '?' }}
                </div>
                <div class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                  <i class="fas fa-check text-white text-xs"></i>
                </div>
              </div>
              <div class="flex-1">
                <div class="font-medium text-gray-900">{{ task.assigned_person?.name || 'Unassigned' }}</div>
                <div class="text-sm text-gray-500">{{ task.assigned_person?.role || '—' }}</div>
                <div class="text-sm text-gray-400 truncate">{{ task.assigned_person?.email || '—' }}</div>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Created By</label>
            <div class="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div class="font-medium text-gray-900">{{ task.user?.name || '—' }}</div>
              <div class="text-sm text-gray-500">{{ task.user?.role || '—' }}</div>
              <div class="text-sm text-gray-400">{{ task.user?.email || '—' }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Description -->
    <div class="mt-8 pt-8 border-t border-gray-100">
      <label class="block text-lg font-semibold text-gray-800 mb-4">Description</label>
      <div class="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 min-h-[120px]">
        <p class="text-gray-700 leading-relaxed whitespace-pre-wrap">{{ task.description || 'No description provided' }}</p>
      </div>
    </div>

    <!-- Edit Button -->
    <div class="mt-6 flex justify-end">
      <button
        v-if="!props.editing"
        @click="handleCancelTaskEdit"
        class="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors font-medium flex items-center gap-2"
      >
        <i class="fas fa-edit"></i>
        Edit Task Details
      </button>
    </div>
  </div>
</template>
