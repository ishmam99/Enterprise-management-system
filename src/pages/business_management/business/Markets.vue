<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">All Markets</h1>
          <p class="text-gray-500 text-sm mt-1">Manage target markets and regions</p>
        </div>
        <div class="flex gap-2 mt-3 md:mt-0">
          <router-link to="/business_management/business/markets/create" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-lg shadow-purple-200 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Market
          </router-link>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-100">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Market Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Region Details</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="item in markets" :key="item.id" class="hover:bg-gray-50 transition">
                <td class="px-6 py-4"><span class="text-sm font-medium text-gray-900">{{ item.name }}</span></td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ item.region_details || '-' }}</span></td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ item.createdAt }}</span></td>
                <td class="px-6 py-4 text-right">
                  <router-link :to="`/business_management/business/markets/edit/${item.id}`" class="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</router-link>
                  <button @click="confirmDelete(item)" class="text-red-600 hover:text-red-800 ml-3 text-sm font-medium">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="showDeleteModal = false">
      <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl text-center">
        <div class="text-5xl mb-4">🗑️</div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Delete Market?</h3>
        <p class="text-gray-500">Are you sure you want to delete <strong>{{ deleteTarget?.name }}</strong>?</p>
        <div class="flex gap-3 mt-6">
          <button @click="showDeleteModal = false" class="flex-1 border border-gray-200 text-gray-700 py-2 rounded-xl hover:bg-gray-50 transition">Cancel</button>
          <button @click="deleteItem" class="flex-1 bg-red-600 text-white py-2 rounded-xl hover:bg-red-700 transition">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const markets = ref([
  { id: 1, name: 'North America', region_details: 'US, Canada, Mexico', createdAt: '2026-10-15' },
  { id: 2, name: 'Europe', region_details: 'UK, Germany, France, Italy', createdAt: '2026-10-12' },
  { id: 3, name: 'Asia-Pacific', region_details: 'China, Japan, Australia, Singapore', createdAt: '2026-10-10' },
  { id: 4, name: 'Middle East', region_details: 'UAE, Saudi Arabia, Qatar', createdAt: '2026-10-08' },
  { id: 5, name: 'South America', region_details: 'Brazil, Argentina, Chile', createdAt: '2026-10-05' },
  { id: 6, name: 'Africa', region_details: 'South Africa, Nigeria, Kenya', createdAt: '2026-10-01' }
])

const showDeleteModal = ref(false)
const deleteTarget = ref(null)

const confirmDelete = (item) => { deleteTarget.value = item; showDeleteModal.value = true }
const deleteItem = () => {
  markets.value = markets.value.filter(m => m.id !== deleteTarget.value.id)
  showDeleteModal.value = false
  deleteTarget.value = null
}
</script>