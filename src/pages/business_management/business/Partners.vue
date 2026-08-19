<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">All Partners</h1>
          <p class="text-gray-500 text-sm mt-1">Manage your business development partners</p>
        </div>
        <div class="flex gap-2 mt-3 md:mt-0">
          <router-link to="/business_management/business/partners/create" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-lg shadow-purple-200 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Partner
          </router-link>
          <button class="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold transition border border-gray-200 shadow-sm">
            <i class="fa-solid fa-download"></i> Export
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm mb-6">
        <div class="flex flex-wrap gap-3 items-end">
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">Type</label>
            <select v-model="filters.type" class="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option value="">All Types</option>
              <option value="Strategic">Strategic</option>
              <option value="Technology">Technology</option>
              <option value="Distribution">Distribution</option>
              <option value="Channel">Channel</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">Search</label>
            <input v-model="filters.search" type="text" placeholder="Search partners..." class="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 w-48 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
          </div>
          <button @click="applyFilters" class="bg-purple-50 text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-100 transition">Apply</button>
          <button @click="resetFilters" class="text-gray-400 text-sm hover:text-gray-600">Clear</button>
        </div>
      </div>

      <!-- Table -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-100">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-if="filteredPartners.length === 0">
                <td colspan="6" class="px-6 py-8 text-center text-gray-500">No partners found</td>
              </tr>
              <tr v-for="partner in filteredPartners" :key="partner.id" class="hover:bg-gray-50 transition">
                <td class="px-6 py-4"><span class="text-sm font-medium text-gray-900">{{ partner.name }}</span></td>
                <td class="px-6 py-4">
                  <span class="text-xs px-2 py-1 rounded-full" :class="getTypeClass(partner.type)">{{ partner.type }}</span>
                </td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ partner.email || '-' }}</span></td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ partner.phone || '-' }}</span></td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ partner.createdAt }}</span></td>
                <td class="px-6 py-4 text-right">
                  <router-link :to="`/business_management/business/partners/edit/${partner.id}`" class="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</router-link>
                  <button @click="confirmDelete(partner)" class="text-red-600 hover:text-red-800 ml-3 text-sm font-medium">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="px-6 py-3 border-t border-gray-100 flex items-center justify-between">
          <p class="text-sm text-gray-500">Showing {{ filteredPartners.length }} of {{ partners.length }} partners</p>
          <div class="flex gap-2">
            <button class="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">Previous</button>
            <button class="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm">1</button>
            <button class="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">2</button>
            <button class="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="showDeleteModal = false">
      <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl text-center">
        <div class="text-5xl mb-4">🗑️</div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Delete Partner?</h3>
        <p class="text-gray-500">Are you sure you want to delete <strong>{{ deleteTarget?.name }}</strong>? This action cannot be undone.</p>
        <div class="flex gap-3 mt-6">
          <button @click="showDeleteModal = false" class="flex-1 border border-gray-200 text-gray-700 py-2 rounded-xl hover:bg-gray-50 transition">Cancel</button>
          <button @click="deletePartner" class="flex-1 bg-red-600 text-white py-2 rounded-xl hover:bg-red-700 transition">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Mock data
const partners = ref([
  { id: 1, name: 'Boeing Aerospace', type: 'Strategic', email: 'partners@boeing.com', phone: '(206) 555-0123', createdAt: '2026-10-15' },
  { id: 2, name: 'Lockheed Martin', type: 'Strategic', email: 'bd@lockheed.com', phone: '(301) 555-0456', createdAt: '2026-10-12' },
  { id: 3, name: 'Composite Technologies Inc.', type: 'Technology', email: 'info@composite-tech.com', phone: '(617) 555-0789', createdAt: '2026-10-10' },
  { id: 4, name: 'Global Distribution Partners', type: 'Distribution', email: 'sales@gdp.com', phone: '(212) 555-0147', createdAt: '2026-10-08' },
  { id: 5, name: 'Aero Supply Chain Solutions', type: 'Channel', email: 'info@aerosupply.com', phone: '(404) 555-0369', createdAt: '2026-10-05' }
])

const filters = ref({ type: '', search: '' })
const showDeleteModal = ref(false)
const deleteTarget = ref(null)

const filteredPartners = computed(() => {
  return partners.value.filter(p => {
    const matchType = !filters.value.type || p.type === filters.value.type
    const matchSearch = !filters.value.search || p.name.toLowerCase().includes(filters.value.search.toLowerCase()) || (p.email && p.email.toLowerCase().includes(filters.value.search.toLowerCase()))
    return matchType && matchSearch
  })
})

const confirmDelete = (partner) => {
  deleteTarget.value = partner
  showDeleteModal.value = true
}

const deletePartner = () => {
  partners.value = partners.value.filter(p => p.id !== deleteTarget.value.id)
  showDeleteModal.value = false
  deleteTarget.value = null
}

const applyFilters = () => {}
const resetFilters = () => { filters.value = { type: '', search: '' } }

const getTypeClass = (type) => {
  const map = {
    'Strategic': 'bg-purple-100 text-purple-700',
    'Technology': 'bg-blue-100 text-blue-700',
    'Distribution': 'bg-green-100 text-green-700',
    'Channel': 'bg-orange-100 text-orange-700'
  }
  return map[type] || 'bg-gray-100 text-gray-700'
}
</script>