<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-6">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Settings</h1>
      <p class="text-gray-500 text-sm mb-6">Configure your marketing module</p>

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
              <div><label class="block text-sm font-medium text-gray-700 mb-1">Module Name</label><input type="text" value="Marketing Management" class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"></div>
              <div><label class="block text-sm font-medium text-gray-700 mb-1">Default Campaign Duration</label><select class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"><option>30 Days</option><option>60 Days</option><option>90 Days</option></select></div>
              <div><label class="block text-sm font-medium text-gray-700 mb-1">Currency</label><select class="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"><option>USD ($)</option><option>EUR (€)</option></select></div>
            </div>
          </div>

          <div v-show="activeTab === 'channels'">
            <div class="space-y-3">
              <div v-for="channel in channels" :key="channel.name" class="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ channel.name }}</p>
                  <p class="text-xs text-gray-500">{{ channel.status }}</p>
                </div>
                <div class="relative inline-block w-12 h-6">
                  <input type="checkbox" class="sr-only peer" :checked="channel.enabled">
                  <div class="w-12 h-6 bg-gray-200 rounded-full peer-checked:bg-purple-600 transition"></div>
                  <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-6"></div>
                </div>
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
  { id: 'channels', name: 'Channels' },
  { id: 'notifications', name: 'Notifications' }
])

const channels = ref([
  { name: 'Email Marketing', status: 'Connected', enabled: true },
  { name: 'LinkedIn', status: 'Connected', enabled: true },
  { name: 'Google Ads', status: 'Connected', enabled: true },
  { name: 'Facebook Ads', status: 'Disconnected', enabled: false }
])

const notifications = ref([
  { name: 'Campaign Launched', description: 'When a new campaign goes live', enabled: true },
  { name: 'Lead Captured', description: 'When a new lead is captured', enabled: true },
  { name: 'Campaign Performance', description: 'Weekly performance summary', enabled: false }
])
</script>