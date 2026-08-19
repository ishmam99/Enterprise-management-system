<!-- src/components/tasks/TaskHeader.vue -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/config/api'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['refresh', 'edit-task'])
const router = useRouter()

const formatDate = (date) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const statusConfig = {
  pending: {
    label: 'Pending',
    textColor: 'text-amber-700',
    bgColor: 'bg-amber-50',
    dotColor: 'bg-amber-500'
  },
  in_progress: {
    label: 'In Progress',
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50',
    dotColor: 'bg-blue-500'
  },
  completed: {
    label: 'Completed',
    textColor: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    dotColor: 'bg-emerald-500'
  }
}

const getStatusConfig = (status) => {
  return statusConfig[status?.toLowerCase()] || statusConfig.pending
}

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' }
]

const updateStatus = async (newStatus) => {
  try {
    await api().put(`/success-team-tasks/${props.task.id}`, {
      status: newStatus,
      completed_at: newStatus === 'completed' ? new Date().toISOString() : null
    })
    emit('refresh')
  } catch (err) {
    alert('Failed to update status')
  }
}

const copyTaskDetails = () => {
  const details = `
Task: ${props.task.solution?.name}
Software: ${props.task.software?.name}
Assignee: ${props.task.assigned_person?.name}
Status: ${getStatusConfig(props.task.status).label}
Description: ${props.task.description}
  `.trim()

  navigator.clipboard.writeText(details)
    .then(() => {
      showNotification('Task details copied to clipboard', 'success')
    })
}

const showNotification = (message, type) => {
  const notification = document.createElement('div')
  notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 ${type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-blue-50 text-blue-800 border border-blue-200'
    }`
  notification.innerHTML = `
    <div class="flex items-center gap-3">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
      <span>${message}</span>
    </div>
  `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.opacity = '0'
    notification.style.transform = 'translateX(100%)'
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 3000)
}
</script>

<template>
  <div class="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
    <div class="flex-1">
      <div class="flex items-center gap-3 mb-4">
        <button @click="router.back()"
          class="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600">
          <i class="fas fa-arrow-left"></i>
        </button>
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Task Details</h1>
          <div class="flex items-center gap-4 mt-2">
            <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
              :class="[getStatusConfig(task.status).bgColor, getStatusConfig(task.status).textColor]">
              <span class="w-2 h-2 rounded-full" :class="getStatusConfig(task.status).dotColor"></span>
              {{ getStatusConfig(task.status).label }}
            </span>
            <span class="text-sm text-gray-500">Task ID: {{ task.id }}</span>
            <span class="text-sm text-gray-500 flex items-center gap-1">
              <i class="fas fa-calendar"></i>
              Created {{ formatDate(task.created_at) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row gap-3">
     
      <!-- Actions Dropdown -->
      <div class="relative group">
        <button
          class="px-4 py-2.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors font-medium text-gray-700 shadow-sm hover:shadow-md flex items-center gap-2">
          <i class="fas fa-ellipsis-h"></i>
          Actions
        </button>
        <div
          class="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">

          <button @click="copyTaskDetails"
            class="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700">
            <i class="fas fa-copy text-gray-400"></i>
            Copy Details
          </button>
          <button @click="window.print()"
            class="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700">
            <i class="fas fa-print text-gray-400"></i>
            Print
          </button>
          <div class="border-t border-gray-100 my-2"></div>
          <button @click="router.push('/customer_management/team-tasks/list')"
            class="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700">
            <i class="fas fa-list text-gray-400"></i>
            Back to List
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
