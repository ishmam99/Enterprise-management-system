<template>
  <div class="min-h-screen w-5/6 px-10 py-6">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
          <span class="text-2xl">🧭</span>
        </div>
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Navigation</h1>
          <p class="text-gray-500 text-sm">Manage your website menus</p>
        </div>
      </div>
      <RouterLink to="/website_management/navigation/create" class="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-lg shadow-blue-500/30 flex items-center gap-2 mt-3 md:mt-0">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add Menu
      </RouterLink>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gradient-to-r from-blue-50/50 to-cyan-50/50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Label</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-if="menuItems.length === 0">
              <td colspan="5" class="px-6 py-8 text-center text-gray-500">No menu items found</td>
            </tr>
            <tr v-for="item in menuItems" :key="item.id" class="hover:bg-blue-50/50 transition">
              <td class="px-6 py-4"><span class="text-sm font-semibold text-gray-900">{{ item.label }}</span></td>
              <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ item.url }}</span></td>
              <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ item.parent || '-' }}</span></td>
              <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ item.order }}</span></td>
              <td class="px-6 py-4 text-right">
                <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                <button class="text-red-600 hover:text-red-800 ml-3 text-sm font-medium">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const menuItems = ref([
  { id: 1, label: 'Home', url: '/', parent: null, order: 1 },
  { id: 2, label: 'About', url: '/about', parent: null, order: 2 },
  { id: 3, label: 'Services', url: '/services', parent: null, order: 3 },
  { id: 4, label: 'Contact', url: '/contact', parent: null, order: 4 },
  { id: 5, label: 'Careers', url: '/careers', parent: null, order: 5 }
])
</script>