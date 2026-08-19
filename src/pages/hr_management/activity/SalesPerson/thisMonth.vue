<template>
  <div class="p-6 min-h-screen w-4/5 bg-gray-50">
    <!-- Header -->
    <div class="flex flex-col gap-4 mb-6">
      <div class="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl shadow-xl p-6 w-full relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-full"></div>
          <div class="absolute -bottom-8 -left-8 w-32 h-32 bg-white rounded-full"></div>
        </div>

        <div class="relative z-10 flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="bg-white bg-opacity-20 p-3 rounded-2xl shadow-lg">
              <span class="text-2xl">⏱️</span>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-white mb-1 drop-shadow-lg">
                Employee Timecards
              </h1>
              <p class="text-indigo-100 text-sm font-medium">
                View individual employee timecard details
              </p>
            </div>
          </div>
          <div class="hidden sm:block bg-white bg-opacity-20 px-4 py-2 rounded-xl">
            <span class="text-white font-semibold text-lg">{{ filteredTimecards.length }}</span>
            <span class="text-indigo-100 text-sm ml-1">Records</span>
          </div>
        </div>
      </div>

      <!-- Employee Selector -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="flex items-center space-x-4">
          <div class="bg-white px-4 py-3 rounded-xl shadow-md border border-gray-100 min-w-64">
            <label class="block text-sm text-gray-600 mb-2 font-medium">Select Employee</label>
            <select 
              v-model="selectedEmployee" 
              class="w-full bg-transparent border-0 outline-none text-blue-600 font-semibold focus:ring-0 text-lg"
            >
              <option value="">All Employees</option>
              <option 
                v-for="employee in employees" 
                :key="employee.id" 
                :value="employee.id"
              >
                {{ employee.name }}
              </option>
            </select>
          </div>

          <!-- Selected Employee Info -->
          <div v-if="selectedEmployee" class="bg-white px-4 py-3 rounded-xl shadow-md border border-gray-100">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-bold">
                  {{ getEmployeeInitials(selectedEmployee) }}
                </span>
              </div>
              <div>
                <p class="text-sm font-semibold text-gray-900">{{ getEmployeeName(selectedEmployee) }}</p>
                <p class="text-xs text-gray-500">{{ getEmployeePosition(selectedEmployee) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Summary Stats -->
        <div class="flex space-x-3">
          <div class="bg-white px-4 py-3 rounded-xl shadow-md border border-gray-100 text-center">
            <p class="text-gray-600 text-sm">Total Records</p>
            <p class="text-2xl font-bold text-blue-600">{{ filteredTimecards.length }}</p>
          </div>
          <div class="bg-white px-4 py-3 rounded-xl shadow-md border border-gray-100 text-center">
            <p class="text-gray-600 text-sm">Total Hours</p>
            <p class="text-2xl font-bold text-green-600">{{ totalHours }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white rounded-2xl shadow-xl border border-gray-100">
      <table class="min-w-full text-sm text-gray-700">
        <thead class="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-left">
          <tr>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">#</th>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Date</th>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Day</th>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Check In</th>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Check Out</th>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Total Hours</th>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Status</th>
            <th class="py-4 px-6 font-semibold uppercase tracking-wider">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(row, index) in filteredTimecards"
            :key="row.id"
            class="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200"
          >
            <td class="py-4 border-e px-6 font-medium text-gray-900">{{ index + 1 }}</td>
            <td class="py-4 border-e px-6 text-gray-700 font-medium">{{ row.date }}</td>
            <td class="py-4 border-e px-6 text-gray-600">{{ getDayOfWeek(row.date) }}</td>
            <td class="py-4 border-e px-6">
              <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
                {{ row.checkin }}
              </span>
            </td>
            <td class="py-4 border-e px-6">
              <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium">
                {{ row.checkout }}
              </span>
            </td>
            <td class="py-4 border-e px-6">
              <span class="text-gray-900 font-bold text-lg text-green-600">{{ row.hours }}</span>
            </td>
            <td class="py-4 border-e px-6">
              <span 
                class="px-3 py-1 rounded-full text-xs font-medium"
                :class="{
                  'bg-green-100 text-green-800': row.status === 'approved',
                  'bg-yellow-100 text-yellow-800': row.status === 'pending',
                  'bg-red-100 text-red-800': row.status === 'rejected'
                }"
              >
                {{ row.status }}
              </span>
            </td>
            <td class="py-4 px-6">
              <div class="flex space-x-2">
                <button 
                  v-if="row.status === 'pending'"
                  @click="approveTimecard(row.id)"
                  class="px-4 py-2 rounded-xl shadow-md bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
                >
                  Approve
                </button>
                <button 
                  v-if="row.status === 'pending'"
                  @click="rejectTimecard(row.id)"
                  class="px-4 py-2 rounded-xl shadow-md bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-semibold hover:from-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                >
                  Reject
                </button>
                <button 
                  v-if="row.status !== 'pending'"
                  @click="viewDetails(row)"
                  class="px-4 py-2 rounded-xl shadow-md bg-gradient-to-r from-gray-500 to-gray-600 text-white text-sm font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105"
                >
                  View
                </button>
              </div>
            </td>
          </tr>
          
          <!-- Empty State -->
          <tr v-if="filteredTimecards.length === 0">
            <td colspan="8" class="text-center py-12 text-gray-400">
              <div class="flex flex-col items-center">
                <span class="text-4xl mb-2">⏱️</span>
                <p class="text-lg">No timecard records found</p>
                <p class="text-sm text-gray-500 mt-1">
                  {{ selectedEmployee ? 'No records for selected employee' : 'Select an employee to view records' }}
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Employees data
const employees = ref([
  { id: 1, name: 'John Doe', position: 'Frontend Developer' },
  { id: 2, name: 'Mary Smith', position: 'UX Designer' },
  { id: 3, name: 'Aziz Rahman', position: 'Backend Developer' },
  { id: 4, name: 'Lisa Brown', position: 'Project Manager' },
  { id: 5, name: 'Kamal Hossain', position: 'DevOps Engineer' }
])

// All timecards data
const timecards = ref([
  // John Doe's timecards
  { id: 1, employeeId: 1, date: '2025-11-25', checkin: '09:00 AM', checkout: '05:00 PM', hours: '8.0h', status: 'pending' },
  { id: 2, employeeId: 1, date: '2025-11-24', checkin: '08:45 AM', checkout: '05:15 PM', hours: '8.5h', status: 'approved' },
  { id: 3, employeeId: 1, date: '2025-11-21', checkin: '09:30 AM', checkout: '04:45 PM', hours: '7.25h', status: 'approved' },
  { id: 4, employeeId: 1, date: '2025-11-20', checkin: '08:30 AM', checkout: '05:30 PM', hours: '9.0h', status: 'approved' },
  { id: 5, employeeId: 1, date: '2025-11-19', checkin: '09:15 AM', checkout: '06:00 PM', hours: '8.75h', status: 'approved' },
  { id: 6, employeeId: 1, date: '2025-11-18', checkin: '09:00 AM', checkout: '05:00 PM', hours: '8.0h', status: 'approved' },
  { id: 7, employeeId: 1, date: '2025-11-17', checkin: '08:45 AM', checkout: '04:45 PM', hours: '8.0h', status: 'approved' },
  { id: 8, employeeId: 1, date: '2025-11-14', checkin: '09:30 AM', checkout: '05:30 PM', hours: '8.0h', status: 'approved' },
  { id: 9, employeeId: 1, date: '2025-11-13', checkin: '08:00 AM', checkout: '04:00 PM', hours: '8.0h', status: 'approved' },
  { id: 10, employeeId: 1, date: '2025-11-12', checkin: '09:00 AM', checkout: '06:00 PM', hours: '9.0h', status: 'approved' },

  // Mary Smith's timecards
  { id: 11, employeeId: 2, date: '2025-11-25', checkin: '10:00 AM', checkout: '06:30 PM', hours: '8.5h', status: 'pending' },
  { id: 12, employeeId: 2, date: '2025-11-24', checkin: '09:45 AM', checkout: '06:00 PM', hours: '8.25h', status: 'approved' },
  { id: 13, employeeId: 2, date: '2025-11-21', checkin: '10:30 AM', checkout: '05:45 PM', hours: '7.25h', status: 'approved' },
  { id: 14, employeeId: 2, date: '2025-11-20', checkin: '09:30 AM', checkout: '06:30 PM', hours: '9.0h', status: 'approved' },
  { id: 15, employeeId: 2, date: '2025-11-19', checkin: '10:15 AM', checkout: '07:00 PM', hours: '8.75h', status: 'approved' },
  { id: 16, employeeId: 2, date: '2025-11-18', checkin: '10:00 AM', checkout: '06:00 PM', hours: '8.0h', status: 'approved' },
  { id: 17, employeeId: 2, date: '2025-11-17', checkin: '09:45 AM', checkout: '05:45 PM', hours: '8.0h', status: 'approved' },
  { id: 18, employeeId: 2, date: '2025-11-14', checkin: '10:30 AM', checkout: '06:30 PM', hours: '8.0h', status: 'approved' },
  { id: 19, employeeId: 2, date: '2025-11-13', checkin: '09:00 AM', checkout: '05:00 PM', hours: '8.0h', status: 'approved' },
  { id: 20, employeeId: 2, date: '2025-11-12', checkin: '10:00 AM', checkout: '07:00 PM', hours: '9.0h', status: 'approved' },

  // Aziz Rahman's timecards
  { id: 21, employeeId: 3, date: '2025-11-25', checkin: '08:30 AM', checkout: '04:00 PM', hours: '7.5h', status: 'pending' },
  { id: 22, employeeId: 3, date: '2025-11-24', checkin: '08:15 AM', checkout: '04:15 PM', hours: '8.0h', status: 'approved' },
  { id: 23, employeeId: 3, date: '2025-11-21', checkin: '09:00 AM', checkout: '03:45 PM', hours: '6.75h', status: 'approved' },
  { id: 24, employeeId: 3, date: '2025-11-20', checkin: '08:00 AM', checkout: '04:30 PM', hours: '8.5h', status: 'approved' },
  { id: 25, employeeId: 3, date: '2025-11-19', checkin: '08:45 AM', checkout: '05:00 PM', hours: '8.25h', status: 'approved' },
  { id: 26, employeeId: 3, date: '2025-11-18', checkin: '08:30 AM', checkout: '04:00 PM', hours: '7.5h', status: 'approved' },
  { id: 27, employeeId: 3, date: '2025-11-17', checkin: '08:15 AM', checkout: '03:45 PM', hours: '7.5h', status: 'approved' },
  { id: 28, employeeId: 3, date: '2025-11-14', checkin: '09:00 AM', checkout: '04:00 PM', hours: '7.0h', status: 'approved' },
  { id: 29, employeeId: 3, date: '2025-11-13', checkin: '08:00 AM', checkout: '03:30 PM', hours: '7.5h', status: 'approved' },
  { id: 30, employeeId: 3, date: '2025-11-12', checkin: '08:30 AM', checkout: '05:00 PM', hours: '8.5h', status: 'approved' },

  // Lisa Brown's timecards
  { id: 31, employeeId: 4, date: '2025-11-25', checkin: '09:15 AM', checkout: '05:10 PM', hours: '7.9h', status: 'pending' },
  { id: 32, employeeId: 4, date: '2025-11-24', checkin: '09:00 AM', checkout: '05:30 PM', hours: '8.5h', status: 'approved' },
  { id: 33, employeeId: 4, date: '2025-11-21', checkin: '09:45 AM', checkout: '04:45 PM', hours: '7.0h', status: 'approved' },
  { id: 34, employeeId: 4, date: '2025-11-20', checkin: '08:45 AM', checkout: '05:45 PM', hours: '9.0h', status: 'approved' },
  { id: 35, employeeId: 4, date: '2025-11-19', checkin: '09:30 AM', checkout: '06:15 PM', hours: '8.75h', status: 'approved' },
  { id: 36, employeeId: 4, date: '2025-11-18', checkin: '09:15 AM', checkout: '05:10 PM', hours: '7.9h', status: 'approved' },
  { id: 37, employeeId: 4, date: '2025-11-17', checkin: '09:00 AM', checkout: '05:00 PM', hours: '8.0h', status: 'approved' },
  { id: 38, employeeId: 4, date: '2025-11-14', checkin: '09:45 AM', checkout: '05:45 PM', hours: '8.0h', status: 'approved' },
  { id: 39, employeeId: 4, date: '2025-11-13', checkin: '08:15 AM', checkout: '04:15 PM', hours: '8.0h', status: 'approved' },
  { id: 40, employeeId: 4, date: '2025-11-12', checkin: '09:15 AM', checkout: '06:15 PM', hours: '9.0h', status: 'approved' },

  // Kamal Hossain's timecards
  { id: 41, employeeId: 5, date: '2025-11-25', checkin: '09:00 AM', checkout: '04:45 PM', hours: '7.75h', status: 'pending' },
  { id: 42, employeeId: 5, date: '2025-11-24', checkin: '08:45 AM', checkout: '05:00 PM', hours: '8.25h', status: 'approved' },
  { id: 43, employeeId: 5, date: '2025-11-21', checkin: '09:30 AM', checkout: '04:00 PM', hours: '6.5h', status: 'approved' },
  { id: 44, employeeId: 5, date: '2025-11-20', checkin: '08:30 AM', checkout: '05:15 PM', hours: '8.75h', status: 'approved' },
  { id: 45, employeeId: 5, date: '2025-11-19', checkin: '09:15 AM', checkout: '05:45 PM', hours: '8.5h', status: 'approved' },
  { id: 46, employeeId: 5, date: '2025-11-18', checkin: '09:00 AM', checkout: '04:45 PM', hours: '7.75h', status: 'approved' },
  { id: 47, employeeId: 5, date: '2025-11-17', checkin: '08:45 AM', checkout: '04:30 PM', hours: '7.75h', status: 'approved' },
  { id: 48, employeeId: 5, date: '2025-11-14', checkin: '09:30 AM', checkout: '05:30 PM', hours: '8.0h', status: 'approved' },
  { id: 49, employeeId: 5, date: '2025-11-13', checkin: '08:00 AM', checkout: '03:45 PM', hours: '7.75h', status: 'approved' },
  { id: 50, employeeId: 5, date: '2025-11-12', checkin: '09:00 AM', checkout: '06:00 PM', hours: '9.0h', status: 'approved' }
])

const selectedEmployee = ref(1) // Default to first employee

// Computed properties
const filteredTimecards = computed(() => {
  if (!selectedEmployee.value) {
    return timecards.value
  }
  return timecards.value.filter(timecard => timecard.employeeId === parseInt(selectedEmployee.value))
})

const totalHours = computed(() => {
  const total = filteredTimecards.value.reduce((sum, timecard) => {
    const hours = parseFloat(timecard.hours)
    return sum + hours
  }, 0)
  return total.toFixed(1) + 'h'
})

// Methods
const getEmployeeName = (employeeId) => {
  const employee = employees.value.find(emp => emp.id === parseInt(employeeId))
  return employee ? employee.name : ''
}

const getEmployeePosition = (employeeId) => {
  const employee = employees.value.find(emp => emp.id === parseInt(employeeId))
  return employee ? employee.position : ''
}

const getEmployeeInitials = (employeeId) => {
  const employee = employees.value.find(emp => emp.id === parseInt(employeeId))
  if (!employee) return ''
  return employee.name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const getDayOfWeek = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { weekday: 'long' })
}

const approveTimecard = (timecardId) => {
  const timecard = timecards.value.find(tc => tc.id === timecardId)
  if (timecard) {
    timecard.status = 'approved'
    alert(`Timecard for ${getEmployeeName(timecard.employeeId)} on ${timecard.date} has been approved!`)
  }
}

const rejectTimecard = (timecardId) => {
  const timecard = timecards.value.find(tc => tc.id === timecardId)
  if (timecard) {
    timecard.status = 'rejected'
    alert(`Timecard for ${getEmployeeName(timecard.employeeId)} on ${timecard.date} has been rejected!`)
  }
}

const viewDetails = (timecard) => {
  const employee = employees.value.find(emp => emp.id === timecard.employeeId)
  alert(`Timecard Details:\n\nEmployee: ${employee.name}\nPosition: ${employee.position}\nDate: ${timecard.date}\nDay: ${getDayOfWeek(timecard.date)}\nCheck In: ${timecard.checkin}\nCheck Out: ${timecard.checkout}\nTotal Hours: ${timecard.hours}\nStatus: ${timecard.status}`)
}
</script>

<style scoped>
.overflow-x-auto::-webkit-scrollbar { height: 8px; }
.overflow-x-auto::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
.overflow-x-auto::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 4px; }
.overflow-x-auto::-webkit-scrollbar-thumb:hover { background: #a8a8a8; }
</style>