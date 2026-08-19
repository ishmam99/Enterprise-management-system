<!-- src/components/tasks/TaskTimeline.vue -->
<script setup>
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const formatDate = (date) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const timelineData = () => {
  const events = []

  // Task creation
  events.push({
    id: 'created',
    date: props.task.created_at,
    title: 'Task Created',
    description: 'Task was created and assigned',
    icon: 'fas fa-tasks',
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-50'
  })

  // First output
  if (props.task.outputs && props.task.outputs.length > 0) {
    const firstOutput = props.task.outputs[props.task.outputs.length - 1] // Oldest first
    events.push({
      id: 'last-update',
      date: firstOutput.created_at,
      title: 'Latest Update',
      description: firstOutput.output,
      icon: 'fas fa-comment',
      iconColor: 'text-emerald-500',
      bgColor: 'bg-emerald-50'
    })
  }

  // Task completion (if applicable)
  if (props.task.completed_at) {
    events.push({
      id: 'completed',
      date: props.task.completed_at,
      title: 'Task Completed',
      description: 'Task marked as completed',
      icon: 'fas fa-check-circle',
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50'
    })
  }

  // Sort by date
  return events.sort((a, b) => new Date(a.date) - new Date(b.date))
}
</script>

<template>
  <div class="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
    <div class="flex items-center gap-3 mb-8">
      <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
        <i class="fas fa-stream text-white text-xl"></i>
      </div>
      <div>
        <h2 class="text-xl font-bold text-gray-900">Task Timeline</h2>
        <p class="text-sm text-gray-500">Key events and milestones</p>
      </div>
    </div>

    <div class="space-y-6">
      <div v-for="(event, index) in timelineData()" :key="event.id" class="relative pl-12">
        <!-- Vertical line -->
        <div
          v-if="index < timelineData().length - 1"
          class="absolute left-6 top-8 bottom-0 w-0.5 bg-gradient-to-b from-gray-200 to-transparent"
        ></div>

        <!-- Icon -->
        <div class="absolute left-0 top-0 w-12 h-12 rounded-xl flex items-center justify-center z-10" :class="event.bgColor">
          <i :class="[event.icon, event.iconColor, 'text-lg']"></i>
        </div>

        <!-- Content -->
        <div class="pb-6 last:pb-0">
          <div class="font-semibold text-gray-900">{{ event.title }}</div>
          <div class="text-sm text-gray-500 mt-1">{{ formatDate(event.date) }}</div>
          <div class="text-sm text-gray-600 mt-2 leading-relaxed">{{ event.description }}</div>
        </div>
      </div>

      <div v-if="timelineData().length === 0" class="text-center py-8">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <i class="fas fa-history text-gray-400 text-xl"></i>
        </div>
        <p class="text-gray-500">No timeline events yet</p>
      </div>
    </div>
  </div>
</template>
