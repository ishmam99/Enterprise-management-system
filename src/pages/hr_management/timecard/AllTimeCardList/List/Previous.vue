<template>
  <div class="min-h-screen bg-gradient-to-br from-base-200 via-base-200 to-base-300 p-2 md:p-4">
    <!-- Header -->
    <div class="w-full mb-4">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-4">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold flex items-center gap-2 mb-1">
            <div class="p-1.5 rounded-lg bg-primary/10">
              <i class="ri-history-line text-primary text-xl md:text-2xl"></i>
            </div>
            <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Employee Timecard
            </span>
          </h1>
          <p class="text-sm text-base-content/60 ml-10">View and manage historical timecard records</p>
        </div>
        <div class="flex items-center gap-3">
          <div class="stat bg-base-100 shadow-lg rounded-box px-4 py-3">
            <div class="stat-value text-lg text-info font-bold">{{ records.length }}</div>
            <div class="stat-title text-xs">Records</div>
          </div>
          <span class="badge badge-lg badge-neutral gap-2 shadow-lg">
            <i class="ri-archive-line"></i>
            Previous
          </span>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <div class="card bg-gradient-to-br from-info/10 to-info/5 border border-info/20 shadow-lg">
          <div class="card-body p-3">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs text-base-content/60 font-medium">Total Records</p>
                <p class="text-2xl font-bold text-info">{{ records.length }}</p>
              </div>
              <div class="p-2 rounded-full bg-info/20">
                <i class="ri-file-list-3-line text-info text-lg"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="card bg-gradient-to-br from-success/10 to-success/5 border border-success/20 shadow-lg">
          <div class="card-body p-3">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs text-base-content/60 font-medium">Completed</p>
                <p class="text-2xl font-bold text-success">{{ completedCount }}</p>
              </div>
              <div class="p-2 rounded-full bg-success/20">
                <i class="ri-checkbox-circle-line text-success text-lg"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="card bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20 shadow-lg">
          <div class="card-body p-3">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs text-base-content/60 font-medium">Pending Accounts</p>
                <p class="text-2xl font-bold text-warning">{{ pendingAccounts }}</p>
              </div>
              <div class="p-2 rounded-full bg-warning/20">
                <i class="ri-time-pending-line text-warning text-lg"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="card bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 shadow-lg">
          <div class="card-body p-3">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs text-base-content/60 font-medium">Total Hours</p>
                <p class="text-2xl font-bold text-primary">{{ totalHours }}</p>
              </div>
              <div class="p-2 rounded-full bg-primary/20">
                <i class="ri-time-line text-primary text-lg"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="w-full mb-4">
      <div class="card bg-base-100 shadow-xl border border-base-300">
        <div class="card-body p-3 md:p-4">
          <div class="flex flex-col md:flex-row gap-4 items-end">
            <div class="form-control flex-1">
              <label class="label pb-2">
                <span class="label-text font-semibold">
                  <i class="ri-calendar-line mr-1"></i>
                  From Date
                </span>
              </label>
              <input type="date" class="input input-bordered input-primary focus:input-primary w-full" />
            </div>
            <div class="form-control flex-1">
              <label class="label pb-2">
                <span class="label-text font-semibold">
                  <i class="ri-calendar-line mr-1"></i>
                  To Date
                </span>
              </label>
              <input type="date" class="input input-bordered input-primary focus:input-primary w-full" />
            </div>
            <div class="form-control">
              <button class="btn btn-primary gap-2 shadow-lg hover:shadow-xl transition-all">
                <i class="ri-filter-3-line"></i>
                Apply Filter
              </button>
            </div>
            <div class="form-control">
              <button class="btn btn-ghost gap-2">
                <i class="ri-refresh-line"></i>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="w-full">
      <div class="card bg-base-100 shadow-2xl border border-base-300">
        <div class="card-body p-2 md:p-3">
          <div class="flex items-center justify-between mb-3">
            <h2 class="card-title text-xl md:text-2xl">
              <div class="p-2 rounded-lg bg-info/10">
                <i class="ri-file-list-3-line text-info text-xl"></i>
              </div>
              <span>Previous Timecards</span>
            </h2>
            <div class="badge badge-lg badge-ghost gap-2">
              <i class="ri-archive-line"></i>
              Archived Records
            </div>
          </div>

          <div class="overflow-x-auto rounded-lg border border-base-300">
            <table class="table table-zebra table-compact w-full" style="table-layout: auto; width: 100%;">
              <thead>
                <tr class="bg-primary text-primary-content">
                  <th class="font-bold text-white text-center" style="width: 50px;">#</th>
                  <th class="font-bold text-white" style="min-width: 150px;">EMPLOYEE NAME</th>
                  <th class="font-bold text-white" style="min-width: 120px;">ROLE</th>
                  <th class="font-bold text-white" style="min-width: 110px;">DATE</th>
                  <th class="font-bold text-white" style="min-width: 150px;">ACCOUNT NAME</th>
                  <th class="font-bold text-white text-center" style="min-width: 120px;">ALLOCATED HOURS</th>
                  <th class="font-bold text-white text-center" style="min-width: 100px;">TOTAL HOURS</th>
                  <th class="font-bold text-white" style="min-width: 150px;">SALES ACTIVITY</th>
                  <th class="font-bold text-white text-center" style="min-width: 120px;">STATUS</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(item, index) in records" :key="item.date + item.employeeName + index">
                  <tr
                    v-for="(account, accountIdx) in item.accounts"
                    :key="`${item.date}-${item.employeeName}-${accountIdx}`"
                    class="hover:bg-base-200/50 transition-colors"
                  >
                    <!-- Row Number (only show for first account) -->
                    <td v-if="accountIdx === 0" :rowspan="item.accounts.length" class="font-medium text-center">
                      {{ index + 1 }}
                    </td>
                    <!-- Employee Name (only show for first account) -->
                    <td v-if="accountIdx === 0" :rowspan="item.accounts.length">
                      <div class="flex items-center gap-2">
                        <div class="avatar placeholder">
                          <div class="bg-primary text-primary-content rounded-full w-7 h-7">
                            <span class="text-xs font-bold">
                              {{ getInitials(item.employeeName) }}
                            </span>
                          </div>
                        </div>
                        <span class="font-semibold text-sm">{{ item.employeeName }}</span>
                      </div>
                    </td>
                    <!-- Role (only show for first account) -->
                    <td v-if="accountIdx === 0" :rowspan="item.accounts.length">
                      <span class="badge badge-ghost badge-sm">{{ item.role }}</span>
                    </td>
                    <!-- Date (only show for first account) -->
                    <td v-if="accountIdx === 0" :rowspan="item.accounts.length">
                      <div class="font-medium text-sm">{{ formatDate(item.date) }}</div>
                    </td>
                    <!-- Account Name -->
                    <td>
                      <span class="font-medium text-sm">{{ account.account }}</span>
                    </td>
                    <!-- Allocated Hours -->
                    <td class="text-center">
                      <span class="font-medium">{{ account.hour.toFixed(2) }}</span>
                    </td>
                    <!-- Total Hours (only show for first account) -->
                    <td v-if="accountIdx === 0" :rowspan="item.accounts.length" class="text-center">
                      <span class="font-bold">{{ calculateTotalHours(item.accounts) }}</span>
                    </td>
                    <!-- Sales Activity -->
                    <td>
                      <span class="text-sm">{{ account.activity || 'Work' }}</span>
                    </td>
                    <!-- Status (only show for first account) -->
                    <td v-if="accountIdx === 0" :rowspan="item.accounts.length" class="text-center">
                      <span
                        class="badge badge-success badge-sm gap-1 shadow-md rounded-full"
                      >
                        <i class="ri-check-line text-xs"></i>
                        Approved
                      </span>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>

          <div v-if="records.length === 0" class="text-center py-12">
            <i class="ri-inbox-line text-6xl text-base-content/20 mb-4"></i>
            <p class="text-base-content/60 text-lg">No previous records found</p>
          </div>

          <!-- Pagination -->
          <div v-if="records.length > 0" class="flex items-center justify-between mt-4 pt-3 border-t border-base-300">
            <div class="text-sm text-base-content/60">
              Showing <span class="font-semibold text-base-content">1</span> to
              <span class="font-semibold text-base-content">{{ totalRecords }}</span> of
              <span class="font-semibold text-base-content">{{ totalRecords }}</span> records
            </div>
            <div class="flex items-center gap-2">
              <button class="btn btn-sm btn-ghost" :disabled="currentPage === 1">
                <i class="ri-arrow-left-s-line"></i>
                Previous
              </button>
              <button class="btn btn-sm btn-primary">{{ currentPage }}</button>
              <button class="btn btn-sm btn-ghost" :disabled="currentPage >= totalPages">
                Next
                <i class="ri-arrow-right-s-line"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="w-full mt-4 mb-2">
      <div class="card bg-base-100/50 shadow-lg border border-base-300">
        <div class="card-body p-3">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <div class="flex items-center gap-2 text-base-content/60">
              <i class="ri-information-line"></i>
              <span>Timecard system · Previous records view</span>
            </div>
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-success"></div>
                <span class="text-base-content/60">Completed</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-warning"></div>
                <span class="text-base-content/60">Pending Approval</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-success"></div>
                <span class="text-base-content/60">Approved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Previous/Completed employees data
const records = ref([
  {
    date: '2026-01-08',
    employeeName: 'John Doe',
    role: 'developer',
    in: '09:05 AM',
    out: '05:30 PM',
    break: '00:30',
    total: '07:55',
    accounts: [
      { account: 'Project Alpha', hour: 4.0, activity: 'Development', status: 'Approved' },
      { account: 'Project Alpha', hour: 4.0, activity: 'Code Review', status: 'Approved' }
    ],
    status: 'Completed'
  },
  {
    date: '2026-01-07',
    employeeName: 'Jane Smith',
    role: 'designer',
    in: '09:10 AM',
    out: '05:10 PM',
    break: '00:20',
    total: '07:40',
    accounts: [
      { account: 'Project Alpha', hour: 5.0, activity: 'UI Design', status: 'Approved' },
      { account: 'Project Gamma', hour: 2.67, activity: 'Prototyping', status: 'Approved' }
    ],
    status: 'Completed'
  },
  {
    date: '2026-01-06',
    employeeName: 'John Doe',
    role: 'developer',
    in: '09:20 AM',
    out: '04:45 PM',
    break: '00:15',
    total: '07:10',
    accounts: [
      { account: 'Project Beta', hour: 2.0, activity: 'Meeting', status: 'Approved' },
      { account: 'Project Beta', hour: 0.75, activity: 'Planning', status: 'Approved' },
      { account: 'Project Beta', hour: 4.35, activity: 'Backend Work', status: 'Approved' }
    ],
    status: 'Completed'
  },
  {
    date: '2026-01-05',
    employeeName: 'Mike Johnson',
    role: 'manager',
    in: '08:30 AM',
    out: '05:00 PM',
    break: '00:30',
    total: '08:00',
    accounts: [
      { account: 'Project Gamma', hour: 3.5, activity: 'Team Meeting', status: 'Approved' },
      { account: 'Project Gamma', hour: 4.5, activity: 'Project Planning', status: 'Approved' }
    ],
    status: 'Completed'
  }
])

// Helper function to calculate total hours from accounts
const calculateTotalHours = (accounts) => {
  const total = accounts.reduce((sum, acc) => sum + acc.hour, 0)
  return total.toFixed(2)
}

// Computed properties
const completedCount = computed(() => {
  return records.value.filter(record => record.status === 'Completed').length
})

const pendingAccounts = computed(() => {
  return records.value.reduce((count, record) => {
    return count + record.accounts.filter(acc => acc.status === 'Pending').length
  }, 0)
})

const totalHours = computed(() => {
  const total = records.value.reduce((sum, record) => {
    return sum + record.accounts.reduce((accSum, acc) => accSum + acc.hour, 0)
  }, 0)
  return total.toFixed(1) + 'h'
})

// Pagination
const currentPage = ref(1)
const recordsPerPage = 10

const totalRecords = computed(() => {
  return records.value.reduce((sum, record) => sum + record.accounts.length, 0)
})

const totalPages = computed(() => {
  return Math.ceil(totalRecords.value / recordsPerPage)
})

// Helper functions
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const getInitials = (name) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
</script>

<style scoped>
/* Enhanced table styling */
.table thead th {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
}

.table tbody td {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
}

.table tbody tr {
  transition: all 0.2s ease;
}

.table tbody tr:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* Compact table styling */
.table-compact th,
.table-compact td {
  padding: 0.5rem 0.5rem;
}

/* Smooth animations */
@keyframes pulse-glow {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse-glow {
  animation: pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Card hover effects */
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
}

/* Badge enhancements */
.badge {
  transition: all 0.2s ease;
}

.badge:hover {
  transform: scale(1.05);
}

/* Gradient text animation */
@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.bg-gradient-to-r {
  background-size: 200% auto;
  animation: gradient-shift 3s ease infinite;
}
</style>
