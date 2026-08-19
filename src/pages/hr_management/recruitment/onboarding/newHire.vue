<template>
  <div class="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
    <!-- Header -->
    <div class="mx-auto mb-10 flex justify-between items-start">
      <div>
        <h1 class="text-4xl font-bold text-indigo-900 mb-3">New Hires</h1>
        <p class="text-lg text-indigo-700">Track and manage newly joined employees</p>
      </div>
      <button class="btn-primary shadow-lg flex items-center gap-2" @click="openModal = true">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add New Hire
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="stat-card">
        <p class="stat-label">Total New Hires</p>
        <p class="stat-value">{{ newHires.length }}</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">This Month</p>
        <p class="stat-value">{{ thisMonthCount }}</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">Pending Documents</p>
        <p class="stat-value text-yellow-600">{{ pendingDocs }}</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">Completed Onboarding</p>
        <p class="stat-value text-green-600">{{ completedOnboarding }}</p>
      </div>
    </div>

    <!-- Table -->
    <div class="mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
            <tr>
              <th class="th">Employee</th>
              <th class="th">Position</th>
              <th class="th">Department</th>
              <th class="th">Joining Date</th>
              <th class="th text-center">Onboarding Status</th>
              <th class="th text-center">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="hire in newHires" :key="hire.id" class="hover:bg-indigo-50 transition">
              <td class="td font-medium">{{ hire.name }}</td>
              <td class="td">{{ hire.position }}</td>
              <td class="td">{{ hire.department }}</td>
              <td class="td">{{ hire.joiningDate }}</td>
              <td class="td text-center">
                <span class="px-3 py-1 text-xs font-medium rounded-full" :class="statusClass(hire.status)">{{ hire.status }}</span>
              </td>
              <td class="td text-center">
                <div class="flex justify-center gap-3">
                  <button class="text-blue-600 hover:text-blue-800">View</button>
                  <button class="text-green-600 hover:text-green-800">Checklist</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="newHires.length === 0" class="text-center py-12 text-gray-500">
          No new hires found
        </div>
      </div>
    </div>

    <!-- Add New Hire Modal -->
    <div v-if="openModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl w-full max-w-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Add New Hire</h2>

        <div class="grid grid-cols-1 gap-4">
          <input v-model="form.name" placeholder="Employee Name" class="form-input" />
          <input v-model="form.position" placeholder="Position" class="form-input" />
          <input v-model="form.department" placeholder="Department" class="form-input" />
          <input v-model="form.joiningDate" type="date" class="form-input" />
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <button class="px-6 py-3 rounded-xl border" @click="openModal = false">Cancel</button>
          <button class="btn-primary" @click="addHire">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const openModal = ref(false)

const newHires = ref([
  { id: 1, name: 'Ayesha Rahman', position: 'UI/UX Designer', department: 'Design', joiningDate: '2026-01-02', status: 'In Progress' },
  { id: 2, name: 'Tanvir Hasan', position: 'Software Engineer', department: 'Engineering', joiningDate: '2026-01-05', status: 'Completed' }
])

const form = ref({ name: '', position: '', department: '', joiningDate: '' })

const thisMonthCount = computed(() => newHires.value.length)
const pendingDocs = computed(() => newHires.value.filter(h => h.status === 'Pending').length)
const completedOnboarding = computed(() => newHires.value.filter(h => h.status === 'Completed').length)

function addHire() {
  newHires.value.push({ id: Date.now(), ...form.value, status: 'Pending' })
  form.value = { name: '', position: '', department: '', joiningDate: '' }
  openModal.value = false
}

function statusClass(status) {
  if (status === 'Pending') return 'bg-yellow-100 text-yellow-700'
  if (status === 'In Progress') return 'bg-blue-100 text-blue-700'
  return 'bg-green-100 text-green-700'
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