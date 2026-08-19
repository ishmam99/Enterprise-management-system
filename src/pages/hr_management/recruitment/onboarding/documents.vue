<template>
  <div class="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
    <!-- Header -->
    <div class="mx-auto mb-10 flex justify-between items-start">
      <div>
        <h1 class="text-4xl font-bold text-indigo-900 mb-3">Documents</h1>
        <p class="text-lg text-indigo-700">Manage employee and onboarding documents</p>
      </div>
      <button 
        class="btn-primary shadow-lg flex items-center gap-2" 
        @click="openModal = true"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Upload Document
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="stat-card">
        <p class="stat-label">Total Documents</p>
        <p class="stat-value">{{ documents.length }}</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">Verified</p>
        <p class="stat-value text-green-600">{{ verifiedCount }}</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">Pending</p>
        <p class="stat-value text-yellow-600">{{ pendingCount }}</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">This Month</p>
        <p class="stat-value">{{ thisMonthCount }}</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="mx-auto bg-white rounded-2xl shadow-xl p-6 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      <input v-model="filters.search" placeholder="Search employee" class="form-input" />
      <select v-model="filters.type" class="form-input">
        <option value="">All Document Types</option>
        <option>ID Proof</option>
        <option>Resume</option>
        <option>Offer Letter</option>
        <option>NDA</option>
        <option>Certificate</option>
      </select>
      <select v-model="filters.status" class="form-input">
        <option value="">All Status</option>
        <option>Pending</option>
        <option>Verified</option>
        <option>Rejected</option>
      </select>
      <input v-model="filters.date" type="date" class="form-input" />
    </div>

    <!-- Documents Table -->
    <div class="mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
            <tr>
              <th class="th">Employee</th>
              <th class="th">Document Type</th>
              <th class="th">File Name</th>
              <th class="th">Uploaded On</th>
              <th class="th text-center">Status</th>
              <th class="th text-center">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr 
              v-for="doc in filteredDocuments" 
              :key="doc.id" 
              class="hover:bg-indigo-50 transition"
            >
              <td class="td font-medium">{{ doc.employee }}</td>
              <td class="td">{{ doc.type }}</td>
              <td class="td">{{ doc.file }}</td>
              <td class="td">{{ doc.date }}</td>
              <td class="td text-center">
                <span 
                  :class="statusClass(doc.status)" 
                  class="px-3 py-1 text-xs font-medium rounded-full"
                >
                  {{ doc.status }}
                </span>
              </td>
              <td class="td text-center">
                <div class="flex justify-center gap-3">
                  <button class="text-blue-600 hover:text-blue-800">View</button>
                  <button class="text-green-600 hover:text-green-800">Verify</button>
                  <button class="text-red-600 hover:text-red-800">Reject</button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredDocuments.length === 0">
              <td colspan="6" class="text-center py-12 text-gray-500">
                No documents found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Upload Modal -->
    <div 
      v-if="openModal" 
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-2xl w-full max-w-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Upload Document</h2>

        <div class="grid grid-cols-1 gap-4">
          <input v-model="form.employee" placeholder="Employee Name" class="form-input" />
          <select v-model="form.type" class="form-input">
            <option disabled value="">Document Type</option>
            <option>ID Proof</option>
            <option>Resume</option>
            <option>Offer Letter</option>
            <option>NDA</option>
            <option>Certificate</option>
          </select>
          <input type="file" class="form-input" />
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <button 
            class="px-6 py-3 rounded-xl border" 
            @click="openModal = false"
          >
            Cancel
          </button>
          <button class="btn-primary" @click="uploadDocument">
            Upload
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const openModal = ref(false)

const documents = ref([
  {
    id: 1,
    employee: 'Ayesha Rahman',
    type: 'ID Proof',
    file: 'nid.pdf',
    date: '2026-01-03',
    status: 'Verified'
  },
  {
    id: 2,
    employee: 'Tanvir Hasan',
    type: 'NDA',
    file: 'nda_signed.pdf',
    date: '2026-01-05',
    status: 'Pending'
  }
])

const filters = ref({
  search: '',
  type: '',
  status: '',
  date: ''
})

const form = ref({
  employee: '',
  type: ''
})

const filteredDocuments = computed(() => {
  return documents.value.filter(d => {
    return (
      (!filters.value.search || d.employee.toLowerCase().includes(filters.value.search.toLowerCase())) &&
      (!filters.value.type || d.type === filters.value.type) &&
      (!filters.value.status || d.status === filters.value.status) &&
      (!filters.value.date || d.date === filters.value.date)
    )
  })
})

const verifiedCount = computed(() => documents.value.filter(d => d.status === 'Verified').length)
const pendingCount = computed(() => documents.value.filter(d => d.status === 'Pending').length)
const thisMonthCount = computed(() => documents.value.length)

function uploadDocument() {
  documents.value.push({
    id: Date.now(),
    employee: form.value.employee,
    type: form.value.type,
    file: 'uploaded_file.pdf',
    date: new Date().toISOString().split('T')[0],
    status: 'Pending'
  })

  form.value = { employee: '', type: '' }
  openModal.value = false
}

function statusClass(status) {
  if (status === 'Pending') return 'bg-yellow-100 text-yellow-700'
  if (status === 'Verified') return 'bg-green-100 text-green-700'
  if (status === 'Rejected') return 'bg-red-100 text-red-700'
  return 'bg-gray-100 text-gray-700'
}
</script>

<style scoped>
.form-input {
  @apply w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all;
}
.th { @apply px-6 py-4 text-left text-sm font-semibold; }
.td { @apply px-6 py-5 text-gray-700; }
.stat-card { @apply bg-white rounded-2xl shadow p-4; }
.stat-label { @apply text-sm text-gray-500; }
.stat-value { @apply text-2xl font-semibold; }
.btn-primary { @apply bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-md; }
</style>