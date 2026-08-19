<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Board View</h1>
          <p class="text-gray-500 text-sm mt-1">Kanban-style task management</p>
        </div>
        <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-lg shadow-purple-200 flex items-center gap-2 mt-3 md:mt-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Task
        </button>
      </div>

      <!-- Kanban Columns -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div v-for="column in boardColumns" :key="column.title" class="bg-gray-100 rounded-2xl p-4 min-h-[400px]">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-gray-700">{{ column.title }}</h3>
            <span class="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">{{ column.tasks.length }}</span>
          </div>
          <div class="space-y-2">
            <div v-for="task in column.tasks" :key="task.id" class="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition cursor-pointer">
              <p class="text-sm font-medium text-gray-900">{{ task.title }}</p>
              <p class="text-xs text-gray-500">{{ task.project }}</p>
              <div class="flex items-center justify-between mt-2">
                <span class="text-xs px-2 py-0.5 rounded-full" :class="getPriorityClass(task.priority)">{{ task.priority }}</span>
                <span class="text-xs text-gray-400">{{ task.assignedTo }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const boardColumns = ref([
  {
    title: 'To Do',
    tasks: [
      { id: 1, title: 'Design review meeting', project: 'Aerospace Alpha', priority: 'Medium', assignedTo: 'Sarah' },
      { id: 2, title: 'Update documentation', project: 'Defense System', priority: 'Low', assignedTo: 'Mike' }
    ]
  },
  {
    title: 'In Progress',
    tasks: [
      { id: 3, title: 'Composite material testing', project: 'Composite Research', priority: 'High', assignedTo: 'John' },
      { id: 4, title: 'Prototype assembly', project: 'Aerospace Alpha', priority: 'High', assignedTo: 'Emily' },
      { id: 5, title: 'Quality inspection prep', project: 'Medical Imaging', priority: 'Medium', assignedTo: 'Lisa' }
    ]
  },
  {
    title: 'In Review',
    tasks: [
      { id: 6, title: 'Client feedback review', project: 'Space Component', priority: 'Medium', assignedTo: 'David' }
    ]
  },
  {
    title: 'Done',
    tasks: [
      { id: 7, title: 'Initial design phase', project: 'Aerospace Alpha', priority: 'High', assignedTo: 'John' },
      { id: 8, title: 'Material sourcing', project: 'Defense System', priority: 'Medium', assignedTo: 'Lisa' }
    ]
  }
])

const getPriorityClass = (priority) => {
  const map = { 'High': 'bg-red-100 text-red-700', 'Medium': 'bg-orange-100 text-orange-700', 'Low': 'bg-blue-100 text-blue-700' }
  return map[priority] || 'bg-gray-100 text-gray-700'
}
</script>