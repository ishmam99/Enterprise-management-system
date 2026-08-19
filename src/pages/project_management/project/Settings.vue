<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-6">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Settings</h1>
      <p class="text-gray-500 text-sm mb-6">Configure your project management module</p>

      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div class="border-b border-gray-100">
          <div class="flex space-x-1 p-4">
            <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
              class="px-4 py-2 rounded-xl text-sm font-medium transition"
              :class="activeTab === tab.id ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'">
              {{ tab.name }}
            </button>
          </div>
        </div>

        <div class="p-6">
          <div v-show="activeTab === 'general'">
            <div class="space-y-4">
              <div><label class="block text-sm font-medium text-gray-700 mb-1">Module Name</label><input type="text" value="Project Management" class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"></div>
              <div><label class="block text-sm font-medium text-gray-700 mb-1">Default View</label><select class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"><option>Overview</option><option>Board</option><option>Timeline</option></select></div>
              <div><label class="block text-sm font-medium text-gray-700 mb-1">Task Priority Levels</label><div class="flex gap-2"><span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">High</span><span class="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">Medium</span><span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Low</span></div></div>
            </div>
          </div>

          <div v-show="activeTab === 'workflows'">
            <div class="space-y-4">
              <div><label class="block text-sm font-medium text-gray-700 mb-1">Task Statuses</label>
                <div class="space-y-2">
                  <div v-for="(status, index) in taskStatuses" :key="index" class="flex items-center gap-2">
                    <span class="text-sm text-gray-600 w-24">{{ status }}</span>
                    <input type="text" class="flex-1 px-3 py-1 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" :value="status">
                    <button class="text-red-400 hover:text-red-600">✕</button>
                  </div>
                </div>
                <button class="mt-2 text-sm text-purple-600 hover:text-purple-700">+ Add Status</button>
              </div>
            </div>
          </div>

          <div v-show="activeTab === 'notifications'">
            <div class="space-y-4">
              <div v-for="notification in notifications" :key="notification.name" class="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ notification.name }}</p>
                  <p class="text-xs text-gray-500">{{ notification.description }}</p>
                </div>
                <div class="relative inline-block w-12 h-6">
                  <input type="checkbox" class="sr-only peer" :checked="notification.enabled">
                  <div class="w-12 h-6 bg-gray-200 rounded-full peer-checked:bg-purple-600 transition"></div>
                  <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-6"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 pt-6 border-t border-gray-100 flex justify-end">
            <button class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl font-semibold transition shadow-lg shadow-purple-200">Save Settings</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('general')
const tabs = ref([
  { id: 'general', name: 'General' },
  { id: 'workflows', name: 'Workflows' },
  { id: 'notifications', name: 'Notifications' }
])

const taskStatuses = ref(['To Do', 'In Progress', 'In Review', 'Done'])

const notifications = ref([
  { name: 'Task Assigned', description: 'When a task is assigned to you', enabled: true },
  { name: 'Task Overdue', description: 'When a task becomes overdue', enabled: true },
  { name: 'Project Update', description: 'Weekly project status update', enabled: false }
])
</script>