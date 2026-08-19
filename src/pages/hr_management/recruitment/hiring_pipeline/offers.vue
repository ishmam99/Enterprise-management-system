<template>
  <div class="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
    <!-- Header -->
    <div class="mx-auto mb-10 flex justify-between items-start">
      <div>
        <h1 class="text-4xl font-bold text-indigo-900 mb-3">Offer Management</h1>
        <p class="text-lg text-indigo-700">Create and manage job offers for selected candidates</p>
      </div>
      <button class="btn-primary shadow-lg flex items-center gap-2" @click="openModal = true">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Create Offer
      </button>
    </div>

    <!-- Offers Table -->
    <div class="mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
            <tr>
              <th class="th">Candidate</th>
              <th class="th">Position</th>
              <th class="th">Salary</th>
              <th class="th">Joining Date</th>
              <th class="th text-center">Offer Status</th>
              <th class="th text-center">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="offer in offers" :key="offer.id" class="hover:bg-indigo-50 transition">
              <td class="td font-medium">{{ offer.candidate }}</td>
              <td class="td">{{ offer.position }}</td>
              <td class="td">৳ {{ offer.salary }}</td>
              <td class="td">{{ offer.joiningDate }}</td>
              <td class="td text-center">
                <span class="px-3 py-1 text-xs font-medium rounded-full" :class="statusClass(offer.status)">{{ offer.status }}</span>
              </td>
              <td class="td text-center">
                <div class="flex justify-center gap-3">
                  <button class="text-blue-600 hover:text-blue-800">View</button>
                  <button class="text-green-600 hover:text-green-800">Send</button>
                  <button class="text-red-600 hover:text-red-800">Withdraw</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="offers.length === 0" class="text-center py-12 text-gray-500">
          No offers created
        </div>
      </div>
    </div>

    <!-- Create Offer Modal -->
    <div v-if="openModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl w-full max-w-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Create Job Offer</h2>
        <div class="grid grid-cols-1 gap-4">
          <input v-model="form.candidate" placeholder="Candidate Name" class="form-input" />
          <input v-model="form.position" placeholder="Position" class="form-input" />
          <input v-model="form.salary" type="number" placeholder="Salary" class="form-input" />
          <input v-model="form.joiningDate" type="date" class="form-input" />
          <select v-model="form.type" class="form-input">
            <option disabled value="">Employment Type</option>
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Contract</option>
          </select>
          <textarea v-model="form.notes" rows="3" placeholder="Offer notes (optional)" class="form-input"></textarea>
        </div>
        <div class="flex justify-end gap-3 mt-6">
          <button class="px-6 py-3 rounded-xl border" @click="openModal = false">Cancel</button>
          <button class="btn-primary" @click="createOffer">Save Offer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const openModal = ref(false)

const offers = ref([
  { id: 1, candidate: 'John Doe', position: 'Frontend Developer', salary: 60000, joiningDate: '2026-02-01', status: 'Draft' },
  { id: 2, candidate: 'Jane Smith', position: 'Backend Developer', salary: 75000, joiningDate: '2026-02-10', status: 'Sent' }
])

const form = ref({ candidate: '', position: '', salary: '', joiningDate: '', type: '', notes: '' })

const createOffer = () => {
  offers.value.push({ id: Date.now(), ...form.value, status: 'Draft' })
  form.value = { candidate: '', position: '', salary: '', joiningDate: '', type: '', notes: '' }
  openModal.value = false
}

const statusClass = status => {
  if (status === 'Draft') return 'bg-gray-100 text-gray-800'
  if (status === 'Sent') return 'bg-blue-100 text-blue-800'
  if (status === 'Accepted') return 'bg-green-100 text-green-800'
  return 'bg-red-100 text-red-800'
}
</script>

<style scoped>
.form-input {
  @apply w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all;
}
.th { @apply px-6 py-4 text-left text-sm font-semibold; }
.td { @apply px-6 py-5 text-gray-700; }
.btn-primary { @apply bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-md; }
</style>