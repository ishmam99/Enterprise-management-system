<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">All Competitors</h1>
          <p class="text-gray-500 text-sm mt-1">Track and analyze your competition</p>
        </div>
        <div class="flex gap-2 mt-3 md:mt-0">
          <router-link to="/business_management/business/competitors/create" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-lg shadow-purple-200 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Competitor
          </router-link>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-100">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Strengths</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Weaknesses</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="item in competitors" :key="item.id" class="hover:bg-gray-50 transition">
                <td class="px-6 py-4"><span class="text-sm font-medium text-gray-900">{{ item.name }}</span></td>
                <td class="px-6 py-4"><span class="text-sm text-green-600">{{ item.strengths || '-' }}</span></td>
                <td class="px-6 py-4"><span class="text-sm text-red-600">{{ item.weaknesses || '-' }}</span></td>
                <td class="px-6 py-4 text-right">
                  <router-link :to="`/business_management/business/competitors/edit/${item.id}`" class="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</router-link>
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
        <h3 class="text-xl font-bold text-gray-900 mb-2">Delete Competitor?</h3>
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

const competitors = ref([
  { id: 1, name: 'Hexcel Corporation', strengths: 'Strong R&D, global presence', weaknesses: 'Higher pricing, slower lead times' },
  { id: 2, name: 'Spirit AeroSystems', strengths: 'Large production capacity, major primes', weaknesses: 'Less flexible, legacy processes' },
  { id: 3, name: 'Toray Industries', strengths: 'Advanced materials, strong supply chain', weaknesses: 'Limited US presence, long lead times' },
  { id: 4, name: 'Solvay SA', strengths: 'Diverse material portfolio, innovation', weaknesses: 'Complex organization, slow decision-making' }
])

const showDeleteModal = ref(false)
const deleteTarget = ref(null)

const confirmDelete = (item) => { deleteTarget.value = item; showDeleteModal.value = true }
const deleteItem = () => {
  competitors.value = competitors.value.filter(c => c.id !== deleteTarget.value.id)
  showDeleteModal.value = false
  deleteTarget.value = null
}
</script>