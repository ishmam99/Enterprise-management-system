<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">All Tasks</h1>
          <p class="text-gray-500 text-sm mt-1">Manage all tasks across projects</p>
        </div>
        <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-lg shadow-purple-200 flex items-center gap-2 mt-3 md:mt-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Task
        </button>
      </div>

      <!-- Task Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
          <p class="text-2xl font-bold text-gray-900">12</p>
          <p class="text-xs text-gray-400">Total Tasks</p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
          <p class="text-2xl font-bold text-orange-600">4</p>
          <p class="text-xs text-gray-400">In Progress</p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
          <p class="text-2xl font-bold text-green-600">3</p>
          <p class="text-xs text-gray-400">Completed</p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
          <p class="text-2xl font-bold text-red-600">2</p>
          <p class="text-xs text-gray-400">Overdue</p>
        </div>
      </div>

      <!-- Table -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-100">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Task</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned To</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="task in tasks" :key="task.id" class="hover:bg-gray-50 transition">
                <td class="px-6 py-4">
                  <p class="text-sm font-medium text-gray-900">{{ task.title }}</p>
                </td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ task.project }}</span></td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ task.assignedTo }}</span></td>
                <td class="px-6 py-4">
                  <span class="text-xs px-2 py-1 rounded-full" :class="getPriorityClass(task.priority)">{{ task.priority }}</span>
                </td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ task.dueDate }}</span></td>
                <td class="px-6 py-4">
                  <span class="text-xs px-2 py-1 rounded-full" :class="getStatusClass(task.status)">{{ task.status }}</span>
                </td>
                <td class="px-6 py-4 text-right">
                  <button class="text-purple-600 hover:text-purple-800 text-sm font-medium">View</button>
                  <button class="text-gray-400 hover:text-gray-600 ml-3 text-sm">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tasks = ref([
  { id: 1, title: 'Review composite material specs', project: 'Aerospace Alpha', assignedTo: 'John Smith', priority: 'High', dueDate: 'Today, 3:00 PM', status: 'In Progress' },
  { id: 2, title: 'Update project timeline', project: 'Aerospace Alpha', assignedTo: 'Sarah Johnson', priority: 'Medium', dueDate: 'Tomorrow, 10:00 AM', status: 'In Progress' },
  { id: 3, title: 'Prepare weekly status report', project: 'Defense System', assignedTo: 'Mike Lee', priority: 'Low', dueDate: 'Oct 15, 9:00 AM', status: 'Pending' },
  { id: 4, title: 'Client presentation preparation', project: 'Medical Imaging', assignedTo: 'Emily Davis', priority: 'High', dueDate: 'Oct 12, 12:00 PM', status: 'Overdue' },
  { id: 5, title: 'Quality testing documentation', project: 'Aerospace Alpha', assignedTo: 'Lisa Chen', priority: 'Medium', dueDate: 'Oct 10, 5:00 PM', status: 'Completed' }
])

const getPriorityClass = (priority) => {
  const map = { 'High': 'bg-red-100 text-red-700', 'Medium': 'bg-orange-100 text-orange-700', 'Low': 'bg-blue-100 text-blue-700' }
  return map[priority] || 'bg-gray-100 text-gray-700'
}

const getStatusClass = (status) => {
  const map = { 'In Progress': 'bg-blue-100 text-blue-700', 'Pending': 'bg-yellow-100 text-yellow-700', 'Completed': 'bg-green-100 text-green-700', 'Overdue': 'bg-red-100 text-red-700' }
  return map[status] || 'bg-gray-100 text-gray-700'
}
</script>