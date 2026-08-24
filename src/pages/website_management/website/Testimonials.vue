<template>
  <div class="min-h-screen w-5/6 px-10 py-6">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
          <span class="text-2xl">💬</span>
        </div>
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Testimonials</h1>
          <p class="text-gray-500 text-sm">Manage client testimonials</p>
        </div>
      </div>
      <RouterLink to="/website_management/testimonials/create" class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-lg shadow-green-500/30 flex items-center gap-2 mt-3 md:mt-0">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add Testimonial
      </RouterLink>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gradient-to-r from-green-50/50 to-emerald-50/50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-if="testimonials.length === 0">
              <td colspan="5" class="px-6 py-8 text-center text-gray-500">No testimonials found</td>
            </tr>
            <tr v-for="item in testimonials" :key="item.id" class="hover:bg-green-50/50 transition">
              <td class="px-6 py-4"><span class="text-sm font-semibold text-gray-900">{{ item.name }}</span></td>
              <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ item.company }}</span></td>
              <td class="px-6 py-4"><span class="text-sm text-yellow-500">{{ '★'.repeat(item.rating) }}{{ '☆'.repeat(5 - item.rating) }}</span></td>
              <td class="px-6 py-4">
                <span class="text-xs px-3 py-1 rounded-full font-medium" :class="item.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">{{ item.is_active ? 'Active' : 'Inactive' }}</span>
              </td>
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

const testimonials = ref([
  { id: 1, name: 'John Smith', company: 'Boeing', rating: 5, is_active: true },
  { id: 2, name: 'Sarah Johnson', company: 'Lockheed Martin', rating: 5, is_active: true },
  { id: 3, name: 'Mike Lee', company: 'SpaceX', rating: 4, is_active: true },
  { id: 4, name: 'Anna Schmidt', company: 'Siemens', rating: 5, is_active: false }
])
</script>