<template>
  <div class="min-h-screen w-4/5 bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">All Meetings</h1>
          <p class="text-gray-500 text-sm mt-1">Schedule and track partner meetings</p>
        </div>
        <div class="flex gap-2 mt-3 md:mt-0">
          <router-link to="/business_management/business/meetings/schedule" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-lg shadow-purple-200 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Schedule Meeting
          </router-link>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-100">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Partner</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Scheduled</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="item in meetings" :key="item.id" class="hover:bg-gray-50 transition">
                <td class="px-6 py-4"><span class="text-sm font-medium text-gray-900">{{ item.title }}</span></td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ getPartnerName(item.partner_id) }}</span></td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ item.scheduled_at }}</span></td>
                <td class="px-6 py-4"><span class="text-sm text-gray-600">{{ item.notes || '-' }}</span></td>
                <td class="px-6 py-4 text-right">
                  <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
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
        <h3 class="text-xl font-bold text-gray-900 mb-2">Delete Meeting?</h3>
        <p class="text-gray-500">Are you sure you want to delete <strong>{{ deleteTarget?.title }}</strong>?</p>
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

const partners = ref([
  { id: 1, name: 'Boeing Aerospace' },
  { id: 2, name: 'Lockheed Martin' },
  { id: 3, name: 'Composite Technologies Inc.' },
  { id: 4, name: 'Global Distribution Partners' }
])

const meetings = ref([
  { id: 1, title: 'Partnership Strategy Review', partner_id: 1, scheduled_at: '2026-10-20 14:00', notes: 'Discuss Q4 collaboration opportunities' },
  { id: 2, title: 'Technical Integration Meeting', partner_id: 3, scheduled_at: '2026-10-22 10:00', notes: 'Review composite specifications' },
  { id: 3, title: 'Quarterly Business Review', partner_id: 2, scheduled_at: '2026-10-25 09:30', notes: 'Performance review and forecasting' },
  { id: 4, title: 'New Market Entry Strategy', partner_id: 4, scheduled_at: '2026-10-28 15:00', notes: 'Discuss European expansion' }
])

const showDeleteModal = ref(false)
const deleteTarget = ref(null)

const getPartnerName = (id) => {
  if (!id) return 'None'
  const partner = partners.value.find(p => p.id === id)
  return partner ? partner.name : 'Unknown'
}

const confirmDelete = (item) => { deleteTarget.value = item; showDeleteModal.value = true }
const deleteItem = () => {
  meetings.value = meetings.value.filter(m => m.id !== deleteTarget.value.id)
  showDeleteModal.value = false
  deleteTarget.value = null
}
</script>