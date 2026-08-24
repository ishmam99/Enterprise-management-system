<template>
  <div class="min-h-screen w-5/6 px-10 py-6">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-600 flex items-center justify-center shadow-lg shadow-fuchsia-500/30">
          <span class="text-2xl">📄</span>
        </div>
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Pages</h1>
          <p class="text-gray-500 text-sm">Manage your website pages</p>
        </div>
      </div>
      <RouterLink to="/website_management/pages/create" class="bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-lg shadow-fuchsia-500/30 flex items-center gap-2 mt-3 md:mt-0">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add Page
      </RouterLink>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gradient-to-r from-fuchsia-50/50 to-pink-50/50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-if="pages.length === 0">
              <td colspan="5" class="px-6 py-8 text-center text-gray-500">No pages found</td>
            </tr>
            <tr v-for="page in pages" :key="page.id" class="hover:bg-fuchsia-50/50 transition">
              <td class="px-6 py-4"><span class="text-sm font-semibold text-gray-900">{{ page.title }}</span></td>
              <td class="px-6 py-4"><span class="text-sm text-gray-600">/{{ page.slug }}</span></td>
              <td class="px-6 py-4">
                <span class="text-xs px-3 py-1 rounded-full font-medium" :class="page.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'">{{ page.status }}</span>
              </td>
              <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ page.updated }}</span></td>
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

const pages = ref([
  { id: 1, title: 'Home', slug: '', status: 'Published', updated: '2026-10-15' },
  { id: 2, title: 'About Us', slug: 'about', status: 'Published', updated: '2026-10-12' },
  { id: 3, title: 'Services', slug: 'services', status: 'Published', updated: '2026-10-10' },
  { id: 4, title: 'Careers', slug: 'careers', status: 'Draft', updated: '2026-10-08' },
  { id: 5, title: 'Contact', slug: 'contact', status: 'Published', updated: '2026-10-05' }
])
</script>