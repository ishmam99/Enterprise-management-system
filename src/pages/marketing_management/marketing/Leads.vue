<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Leads</h1>
          <p class="text-gray-500 text-sm mt-1">Manage all marketing leads</p>
        </div>
        <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-lg shadow-purple-200 flex items-center gap-2 mt-3 md:mt-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Lead
        </button>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm mb-6">
        <div class="flex flex-wrap gap-3 items-end">
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">Status</label>
            <select class="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option>All Status</option>
              <option>New</option>
              <option>Contacted</option>
              <option>Qualified</option>
              <option>Converted</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">Source</label>
            <select class="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option>All Sources</option>
              <option>Website</option>
              <option>LinkedIn</option>
              <option>Email</option>
              <option>Event</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">Search</label>
            <input type="text" placeholder="Search leads..." class="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 w-48 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
          </div>
          <button class="bg-purple-50 text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-100 transition">Apply</button>
        </div>
      </div>

      <!-- Table -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-100">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="lead in leads" :key="lead.id" class="hover:bg-gray-50 transition">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <img :src="lead.avatar" class="w-8 h-8 rounded-full" />
                    <span class="text-sm font-medium text-gray-900">{{ lead.name }}</span>
                  </div>
                </td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ lead.email }}</span></td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ lead.source }}</span></td>
                <td class="px-6 py-4">
                  <span class="text-xs px-2 py-1 rounded-full" :class="getStatusClass(lead.status)">{{ lead.status }}</span>
                </td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ lead.created }}</span></td>
                <td class="px-6 py-4 text-right">
                  <button class="text-purple-600 hover:text-purple-800 text-sm font-medium">View</button>
                  <button class="text-gray-400 hover:text-gray-600 ml-3 text-sm">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="px-6 py-3 border-t border-gray-100 flex items-center justify-between">
          <p class="text-sm text-gray-500">Showing 1-5 of 24 leads</p>
          <div class="flex gap-2">
            <button class="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">Previous</button>
            <button class="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm">1</button>
            <button class="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">2</button>
            <button class="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">3</button>
            <button class="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const leads = ref([
  { id: 1, name: 'Robert Chen', email: 'robert.chen@boeing.com', source: 'LinkedIn', status: 'Qualified', created: 'Oct 15, 2026', avatar: 'https://i.pravatar.cc/100?img=1' },
  { id: 2, name: 'Maria Rodriguez', email: 'maria.rodriguez@lm.com', source: 'Website', status: 'New', created: 'Oct 14, 2026', avatar: 'https://i.pravatar.cc/100?img=2' },
  { id: 3, name: 'James Wilson', email: 'james.wilson@spacex.com', source: 'Email', status: 'Contacted', created: 'Oct 12, 2026', avatar: 'https://i.pravatar.cc/100?img=3' },
  { id: 4, name: 'Anna Schmidt', email: 'anna.schmidt@siemens.com', source: 'Event', status: 'Qualified', created: 'Oct 10, 2026', avatar: 'https://i.pravatar.cc/100?img=4' },
  { id: 5, name: 'David Kim', email: 'david.kim@airbus.com', source: 'LinkedIn', status: 'Converted', created: 'Oct 8, 2026', avatar: 'https://i.pravatar.cc/100?img=5' }
])

const getStatusClass = (status) => {
  const map = {
    'New': 'bg-blue-100 text-blue-700',
    'Contacted': 'bg-yellow-100 text-yellow-700',
    'Qualified': 'bg-purple-100 text-purple-700',
    'Converted': 'bg-green-100 text-green-700'
  }
  return map[status] || 'bg-gray-100 text-gray-700'
}
</script>