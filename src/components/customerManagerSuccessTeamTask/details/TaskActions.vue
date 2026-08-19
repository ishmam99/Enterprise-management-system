<!-- src/components/tasks/TaskActions.vue -->
<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['refresh'])

const router = useRouter()

const deleteTask = async () => {
  if (confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
    try {
      // You'll need to import api and implement delete
      // await api().delete(`/success-team-tasks/${task.value.id}`)
      router.push('/assignments')
    } catch (err) {
      alert('Failed to delete task')
    }
  }
}

const copyTaskDetails = () => {
  const details = `
Task: ${props.task.solution?.name}
Software: ${props.task.software?.name}
Assignee: ${props.task.assigned_person?.name}
Description: ${props.task.description}
  `.trim()

  navigator.clipboard.writeText(details)
    .then(() => {
      // Show notification
    })
}
</script>

<template>
  <div class="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 shadow-sm border border-blue-100">
    <div class="flex items-center gap-3 mb-8">
      <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
        <i class="fas fa-bolt text-white text-xl"></i>
      </div>
      <div>
        <h2 class="text-xl font-bold text-gray-900">Quick Actions</h2>
        <p class="text-sm text-gray-500">Common actions for this task</p>
      </div>
    </div>

    <div class="space-y-3">
      <button
        @click="$emit('edit-task')"
        class="w-full px-4 py-3.5 rounded-xl bg-white hover:bg-gray-50 transition-colors text-left flex items-center gap-3 group border border-gray-200"
      >
        <div class="w-10 h-10 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors flex items-center justify-center">
          <i class="fas fa-edit text-blue-500"></i>
        </div>
        <div>
          <div class="font-medium text-gray-900">Edit Task Details</div>
          <div class="text-sm text-gray-500">Modify task information</div>
        </div>
      </button>

      <button
        @click="$emit('add-followup')"
        class="w-full px-4 py-3.5 rounded-xl bg-white hover:bg-gray-50 transition-colors text-left flex items-center gap-3 group border border-gray-200"
      >
        <div class="w-10 h-10 rounded-lg bg-emerald-50 group-hover:bg-emerald-100 transition-colors flex items-center justify-center">
          <i class="fas fa-comment-medical text-emerald-500"></i>
        </div>
        <div>
          <div class="font-medium text-gray-900">Add Follow-up Note</div>
          <div class="text-sm text-gray-500">Quick update template</div>
        </div>
      </button>

      <button
        @click="copyTaskDetails"
        class="w-full px-4 py-3.5 rounded-xl bg-white hover:bg-gray-50 transition-colors text-left flex items-center gap-3 group border border-gray-200"
      >
        <div class="w-10 h-10 rounded-lg bg-amber-50 group-hover:bg-amber-100 transition-colors flex items-center justify-center">
          <i class="fas fa-copy text-amber-500"></i>
        </div>
        <div>
          <div class="font-medium text-gray-900">Copy Task Details</div>
          <div class="text-sm text-gray-500">Copy to clipboard</div>
        </div>
      </button>

      <div class="pt-6 mt-6 border-t border-blue-100">
        <button
          @click="deleteTask"
          class="w-full px-4 py-3.5 rounded-xl bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 transition-all text-left flex items-center gap-3 group border border-red-200"
        >
          <div class="w-10 h-10 rounded-lg bg-red-100 group-hover:bg-red-200 transition-colors flex items-center justify-center">
            <i class="fas fa-trash text-red-500"></i>
          </div>
          <div>
            <div class="font-medium text-red-700">Delete Task</div>
            <div class="text-sm text-red-500">Remove permanently</div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
