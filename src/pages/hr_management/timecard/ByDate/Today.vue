<!-- views/TimecardToday.vue -->
<template>
  <div class="space-y-6">
    <!-- Header with Date Info -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 class="text-xl font-bold text-gray-900">Today's Timecards</h2>
        <p class="text-gray-600">{{ formatDate(today) }}</p>
      </div>
      <div class="flex items-center space-x-3">
        <div class="stats shadow">
          <div class="stat">
            <div class="stat-title">Total Employees</div>
            <div class="stat-value text-primary">{{ todayStats.total }}</div>
          </div>
          <div class="stat">
            <div class="stat-title">Present</div>
            <div class="stat-value text-success">{{ todayStats.present }}</div>
          </div>
          <div class="stat">
            <div class="stat-title">Absent</div>
            <div class="stat-value text-error">{{ todayStats.absent }}</div>
          </div>
          <div class="stat">
            <div class="stat-title">Late</div>
            <div class="stat-value text-warning">{{ todayStats.late }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="card bg-base-100 shadow">
      <div class="card-body p-6">
        <div class="flex flex-col lg:flex-row gap-4 justify-between">
          <div class="flex flex-col sm:flex-row gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Department</span>
              </label>
              <select v-model="filters.department" class="select select-bordered w-full sm:w-48">
                <option value="">All Departments</option>
                <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
              </select>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Status</span>
              </label>
              <select v-model="filters.status" class="select select-bordered w-full sm:w-48">
                <option value="">All Status</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
                <option value="leave">On Leave</option>
              </select>
            </div>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Search</span>
            </label>
            <div class="relative">
              <input
                v-model="filters.search"
                type="text"
                placeholder="Search employees..."
                class="input input-bordered pl-10 w-full lg:w-64"
              >
              <i class="ri-search-line absolute left-3 top-3 text-gray-400"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Timecards Table -->
    <div class="card bg-base-100 shadow">
      <div class="card-body p-0">
        <div class="overflow-x-auto">
          <table class="table table-zebra">
            <thead>
              <tr class="bg-gray-50">
                <th class="font-semibold">Employee</th>
                <th class="font-semibold">Department</th>
                <th class="font-semibold">Clock In</th>
                <th class="font-semibold">Clock Out</th>
                <th class="font-semibold">Hours Worked</th>
                <th class="font-semibold">Status</th>
                <th class="font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="timecard in filteredTimecards" :key="timecard.id">
                <td>
                  <div class="flex items-center space-x-3">
                    <div class="avatar">
                      <div class="mask mask-squircle w-10 h-10 bg-primary text-white flex items-center justify-center">
                        <span class="font-bold">{{ getInitials(timecard.name) }}</span>
                      </div>
                    </div>
                    <div>
                      <div class="font-medium">{{ timecard.name }}</div>
                      <div class="text-sm text-gray-500">{{ timecard.id }}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="badge badge-outline">{{ timecard.department }}</span>
                </td>
                <td>
                  <div class="flex items-center">
                    <i class="ri-time-line mr-2 text-gray-400"></i>
                    {{ timecard.clockIn || '--:--' }}
                  </div>
                </td>
                <td>
                  <div class="flex items-center">
                    <i class="ri-time-line mr-2 text-gray-400"></i>
                    {{ timecard.clockOut || '--:--' }}
                  </div>
                </td>
                <td>
                  <span :class="{
                    'text-success': timecard.hoursWorked >= 8,
                    'text-warning': timecard.hoursWorked < 8 && timecard.hoursWorked > 0,
                    'text-error': !timecard.hoursWorked
                  }">
                    {{ timecard.hoursWorked || '0.00' }} hrs
                  </span>
                </td>
                <td>
                  <span :class="getStatusBadgeClass(timecard.status)">
                    {{ timecard.status }}
                  </span>
                </td>
                <td>
                  <div class="flex space-x-2">
                    <button
                      @click="editTimecard(timecard)"
                      class="btn btn-ghost btn-sm text-primary"
                      title="Edit"
                    >
                      <i class="ri-edit-line"></i>
                    </button>
                    <button
                      @click="viewDetails(timecard)"
                      class="btn btn-ghost btn-sm text-info"
                      title="View Details"
                    >
                      <i class="ri-eye-line"></i>
                    </button>
                    <button
                      @click="addNote(timecard)"
                      class="btn btn-ghost btn-sm text-warning"
                      title="Add Note"
                    >
                      <i class="ri-chat-new-line"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="filteredTimecards.length === 0" class="text-center py-12">
          <i class="ri-inbox-line text-4xl text-gray-300 mb-4"></i>
          <p class="text-gray-500">No timecards found matching your filters</p>
          <button @click="resetFilters" class="btn btn-link mt-2">Clear Filters</button>
        </div>
      </div>
    </div>

    <!-- Summary -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="card-title">Early Birds</h3>
              <p class="text-2xl font-bold text-success">{{ earlyBirdsCount }}</p>
            </div>
            <i class="ri-sun-line text-4xl text-success opacity-50"></i>
          </div>
        </div>
      </div>
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="card-title">Late Comers</h3>
              <p class="text-2xl font-bold text-warning">{{ lateComersCount }}</p>
            </div>
            <i class="ri-time-line text-4xl text-warning opacity-50"></i>
          </div>
        </div>
      </div>
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="card-title">Avg. Hours</h3>
              <p class="text-2xl font-bold text-primary">{{ averageHours }}</p>
            </div>
            <i class="ri-bar-chart-line text-4xl text-primary opacity-50"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import moment from 'moment'
import Swal from 'sweetalert2'

const today = moment()
const filters = ref({
  department: '',
  status: '',
  search: ''
})

const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Operations', 'Finance']
const timecards = ref([])

// Sample data
const sampleData = [
  { id: 'EMP001', name: 'John Doe', department: 'Engineering', clockIn: '08:30', clockOut: '17:30', hoursWorked: 9, status: 'present' },
  { id: 'EMP002', name: 'Jane Smith', department: 'Marketing', clockIn: '09:15', clockOut: '18:00', hoursWorked: 8.75, status: 'present' },
  { id: 'EMP003', name: 'Bob Johnson', department: 'Sales', clockIn: null, clockOut: null, hoursWorked: 0, status: 'absent' },
  { id: 'EMP004', name: 'Alice Brown', department: 'HR', clockIn: '10:00', clockOut: '19:00', hoursWorked: 9, status: 'late' },
  { id: 'EMP005', name: 'Charlie Wilson', department: 'Engineering', clockIn: '08:45', clockOut: '17:45', hoursWorked: 9, status: 'present' },
  { id: 'EMP006', name: 'Diana Miller', department: 'Operations', clockIn: '08:00', clockOut: '16:30', hoursWorked: 8.5, status: 'present' }
]

onMounted(() => {
  timecards.value = sampleData
})

const formatDate = (date) => {
  return date.format('dddd, MMMM D, YYYY')
}

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const getStatusBadgeClass = (status) => {
  const classes = {
    present: 'badge badge-success',
    absent: 'badge badge-error',
    late: 'badge badge-warning',
    leave: 'badge badge-info'
  }
  return classes[status] || 'badge badge-outline'
}

const filteredTimecards = computed(() => {
  return timecards.value.filter(tc => {
    const matchesDept = !filters.value.department || tc.department === filters.value.department
    const matchesStatus = !filters.value.status || tc.status === filters.value.status
    const matchesSearch = !filters.value.search ||
      tc.name.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      tc.id.toLowerCase().includes(filters.value.search.toLowerCase())

    return matchesDept && matchesStatus && matchesSearch
  })
})

const todayStats = computed(() => {
  const total = timecards.value.length
  const present = timecards.value.filter(tc => tc.status === 'present').length
  const absent = timecards.value.filter(tc => tc.status === 'absent').length
  const late = timecards.value.filter(tc => tc.status === 'late').length

  return { total, present, absent, late }
})

const earlyBirdsCount = computed(() => {
  return timecards.value.filter(tc => {
    if (!tc.clockIn) return false
    const clockInHour = parseInt(tc.clockIn.split(':')[0])
    return clockInHour < 9 && tc.status === 'present'
  }).length
})

const lateComersCount = computed(() => {
  return timecards.value.filter(tc => {
    if (!tc.clockIn) return false
    const clockInHour = parseInt(tc.clockIn.split(':')[0])
    return clockInHour >= 9 && tc.status === 'present'
  }).length
})

const averageHours = computed(() => {
  const presentCards = timecards.value.filter(tc => tc.status === 'present' && tc.hoursWorked > 0)
  if (presentCards.length === 0) return '0.00'
  const totalHours = presentCards.reduce((sum, tc) => sum + tc.hoursWorked, 0)
  return (totalHours / presentCards.length).toFixed(2)
})

const editTimecard = (timecard) => {
  Swal.fire({
    title: `Edit Timecard - ${timecard.name}`,
    html: `
      <div class="text-left space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Clock In</label>
          <input type="time" id="clockIn" class="input input-bordered w-full" value="${timecard.clockIn || ''}">
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Clock Out</label>
          <input type="time" id="clockOut" class="input input-bordered w-full" value="${timecard.clockOut || ''}">
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Status</label>
          <select id="status" class="select select-bordered w-full">
            <option value="present" ${timecard.status === 'present' ? 'selected' : ''}>Present</option>
            <option value="absent" ${timecard.status === 'absent' ? 'selected' : ''}>Absent</option>
            <option value="late" ${timecard.status === 'late' ? 'selected' : ''}>Late</option>
            <option value="leave" ${timecard.status === 'leave' ? 'selected' : ''}>On Leave</option>
          </select>
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Save Changes',
    preConfirm: () => {
      const clockIn = document.getElementById('clockIn').value
      const clockOut = document.getElementById('clockOut').value
      const status = document.getElementById('status').value

      if (clockIn && clockOut) {
        const start = moment(clockIn, 'HH:mm')
        const end = moment(clockOut, 'HH:mm')
        const hours = end.diff(start, 'hours', true)

        return { clockIn, clockOut, status, hoursWorked: hours.toFixed(2) }
      }

      return { clockIn, clockOut, status, hoursWorked: timecard.hoursWorked }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const idx = timecards.value.findIndex(tc => tc.id === timecard.id)
      if (idx !== -1) {
        timecards.value[idx] = { ...timecards.value[idx], ...result.value }
        Swal.fire('Updated!', 'Timecard has been updated.', 'success')
      }
    }
  })
}

const viewDetails = (timecard) => {
  Swal.fire({
    title: `Timecard Details - ${timecard.name}`,
    html: `
      <div class="text-left space-y-3">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-gray-600">Employee ID</label>
            <p class="font-medium">${timecard.id}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Department</label>
            <p class="font-medium">${timecard.department}</p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-gray-600">Clock In</label>
            <p class="font-medium">${timecard.clockIn || '--:--'}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Clock Out</label>
            <p class="font-medium">${timecard.clockOut || '--:--'}</p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-gray-600">Hours Worked</label>
            <p class="font-medium">${timecard.hoursWorked || '0.00'} hours</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-600">Status</label>
            <span class="${getStatusBadgeClass(timecard.status)}">${timecard.status}</span>
          </div>
        </div>
      </div>
    `,
    confirmButtonText: 'Close'
  })
}

const addNote = (timecard) => {
  Swal.fire({
    title: `Add Note for ${timecard.name}`,
    input: 'textarea',
    inputLabel: 'Note',
    inputPlaceholder: 'Enter your note here...',
    showCancelButton: true,
    confirmButtonText: 'Add Note'
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      Swal.fire('Note Added!', 'The note has been saved.', 'success')
    }
  })
}

const resetFilters = () => {
  filters.value = {
    department: '',
    status: '',
    search: ''
  }
}
</script>
