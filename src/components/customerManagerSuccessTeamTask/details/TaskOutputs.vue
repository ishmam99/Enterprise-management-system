<!-- src/components/tasks/TaskOutputs.vue -->
<script setup>
import { ref } from 'vue'
import api from '@/config/api'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['refresh', 'task-updated'])

const newOutput = ref('')
const submittingOutput = ref(false)

const formatDate = (date) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const addOutput = async () => {
  if (!newOutput.value.trim()) return

  submittingOutput.value = true
  try {
    const res = await api().post(`/success-team-task-outputs`, {
      success_team_task_id: props.task.id,
      output: newOutput.value.trim()
    })

    // Update outputs array
    props.task.outputs = [res.data.data || res.data, ...props.task.outputs]
    newOutput.value = ''

    // Update task status to "in progress" if it's pending
    if (props.task.status === 'pending') {
      await updateStatus('in_progress')
    }

    showNotification('Update added successfully', 'success')
  } catch (err) {
    alert('Failed to add update')
  } finally {
    submittingOutput.value = false
  }
}

const updateStatus = async (newStatus) => {
  try {
    await api().put(`/success-team-tasks/${props.task.id}`, {
      status: newStatus
    })
    emit('task-updated', { status: newStatus })
  } catch (err) {
    alert('Failed to update status')
  }
}

const deleteOutput = async (outputId, index) => {
  if (!confirm('Are you sure you want to delete this update?')) return

  try {
    await api().delete(`/success-team-task-outputs/${outputId}`)
    props.task.outputs.splice(index, 1)
    showNotification('Update deleted successfully', 'success')
  } catch (err) {
    alert('Failed to delete update')
  }
}

const toggleOutputStatus = async (output) => {
  try {
    const newStatus = output.status === '1' ? '0' : '1'
    await api().put(`/success-team-task-outputs/${output.id}`, {
      status: newStatus
    })
    output.status = newStatus
    showNotification('Update status updated', 'success')
  } catch (err) {
    alert('Failed to update update status')
  }
}

const showNotification = (message, type) => {
  // Notification implementation
}
</script>

<template>
  <div class="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
          <i class="fas fa-history text-white text-xl"></i>
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900">Task Updates & Outputs</h2>
          <p class="text-sm text-gray-500">Track progress and add updates</p>
        </div>
      </div>
      <span class="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
        {{ task.outputs?.length || 0 }} updates
      </span>
    </div>

 
   

    <!-- Outputs List -->
    <div v-if="task.outputs && task.outputs.length > 0" class="space-y-4">
      <div
        v-for="(output, index) in task.outputs"
        :key="output.id"
        class="p-6 rounded-xl border transition-all duration-200 hover:shadow-sm"
        :class="{
          'bg-emerald-50 border-emerald-200': output.status === '1',
          'bg-white border-gray-200': output.status === '0'
        }"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-3">
            <button
              @click="toggleOutputStatus(output)"
              class="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              :class="{
                'bg-emerald-100 text-emerald-600 hover:bg-emerald-200': output.status === '1',
                'bg-gray-100 text-gray-400 hover:bg-gray-200': output.status === '0'
              }"
              :title="output.status === '1' ? 'Mark as pending' : 'Mark as resolved'"
            >
              <i v-if="output.status === '1'" class="fas fa-check text-sm"></i>
              <i v-else class="fas fa-circle text-xs"></i>
            </button>
            <div>
              <div class="font-medium" :class="output.status === '1' ? 'text-emerald-700' : 'text-gray-700'">
                {{ output.status === '1' ? 'Resolved' : 'Pending' }}
              </div>
              <div class="text-sm text-gray-500">{{ formatDate(output.date) }}</div>
            </div>
          </div>
          <!-- <button
            @click="deleteOutput(output.id, index)"
            class="w-8 h-8 rounded-full flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
            title="Delete"
          >
            <i class="fas fa-trash text-sm"></i>
          </button> -->
        </div>
        <div class="pl-11">
          <p class="text-gray-700 leading-relaxed whitespace-pre-wrap">{{ output.output }}</p>
          <div class="text-xs text-gray-400 mt-3 flex items-center gap-2">
            <i class="fas fa-clock"></i>
            Last updated: {{ formatDate(output.updated_at) }}
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
        <i class="fas fa-inbox text-gray-400 text-2xl"></i>
      </div>
      <p class="text-gray-500">No updates yet. Add the first update to track progress.</p>
    </div>
  </div>
</template>
