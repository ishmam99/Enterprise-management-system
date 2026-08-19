<template>
  <div class="min-h-screen bg-gradient-to-br from-base-200 via-base-200 to-base-300 p-4 md:p-6">
    <!-- Header -->
    <div class="max-w-7xl mx-auto mb-6">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 class="text-3xl font-bold flex items-center gap-3 mb-2">
            <div class="p-2 rounded-lg bg-primary/10">
              <i class="ri-time-line text-primary text-2xl"></i>
            </div>
            <span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Sales Person Timecard
            </span>
          </h1>
          <p class="text-base-content/60 ml-12">Monitor active work sessions in real-time</p>
        </div>
        <div class="flex items-center gap-3">
          <div class="stat bg-base-100 shadow-lg rounded-box px-4 py-3">
            <div class="stat-value text-lg text-primary font-bold">{{ records.length }}</div>
            <div class="stat-title text-xs">Active</div>
          </div>
          <span class="badge badge-lg badge-warning gap-2 shadow-lg">
            <i class="ri-loader-4-line animate-spin"></i>
            Ongoing
          </span>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="card bg-gradient-to-br from-success/10 to-success/5 border border-success/20 shadow-lg">
          <div class="card-body p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs text-base-content/60 font-medium">Total Running</p>
                <p class="text-2xl font-bold text-success">{{ records.length }}</p>
              </div>
              <div class="p-3 rounded-full bg-success/20">
                <i class="ri-user-line text-success text-xl"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="card bg-gradient-to-br from-info/10 to-info/5 border border-info/20 shadow-lg">
          <div class="card-body p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs text-base-content/60 font-medium">Total Hours</p>
                <p class="text-2xl font-bold text-info">{{ totalHours }}</p>
              </div>
              <div class="p-3 rounded-full bg-info/20">
                <i class="ri-time-line text-info text-xl"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="card bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20 shadow-lg">
          <div class="card-body p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs text-base-content/60 font-medium">Pending Accounts</p>
                <p class="text-2xl font-bold text-warning">{{ pendingAccounts }}</p>
              </div>
              <div class="p-3 rounded-full bg-warning/20">
                <i class="ri-time-pending-line text-warning text-xl"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="card bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 shadow-lg">
          <div class="card-body p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs text-base-content/60 font-medium">Today's Date</p>
                <p class="text-lg font-bold text-primary">{{ todayDate }}</p>
              </div>
              <div class="p-3 rounded-full bg-primary/20">
                <i class="ri-calendar-line text-primary text-xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="max-w-7xl mx-auto mb-6">
      <div class="card bg-base-100 shadow-xl border border-base-300">
        <div class="card-body p-5">
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
    <div class="max-w-7xl mx-auto">
      <div class="card bg-base-100 shadow-2xl border border-base-300">
        <div class="card-body p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="card-title text-2xl">
              <div class="p-2 rounded-lg bg-success/10">
                <i class="ri-play-circle-line text-success text-xl"></i>
              </div>
              <span>Running Employees</span>
            </h2>
            <div class="badge badge-lg badge-ghost gap-2">
              <i class="ri-eye-line"></i>
              Live View
            </div>
          </div>

          <div class="overflow-x-auto rounded-lg border border-base-300">
            <table class="table table-zebra">
              <thead class="bg-base-200">
                <tr>
                  <th class="font-bold text-base-content/80">
                    <i class="ri-calendar-line mr-1"></i>
                    Date
                  </th>
                  <th class="font-bold text-base-content/80">
                    <i class="ri-user-line mr-1"></i>
                    Employee Name
                  </th>
                  <th class="font-bold text-base-content/80">
                    <i class="ri-login-circle-line mr-1"></i>
                    Login Time
                  </th>
                  <th class="font-bold text-base-content/80">
                    <i class="ri-logout-circle-line mr-1"></i>
                    Logout Time
                  </th>
                  <th class="font-bold text-base-content/80">
                    <i class="ri-pause-circle-line mr-1"></i>
                    Break
                  </th>
                  <th class="font-bold text-base-content/80">
                    <i class="ri-time-line mr-1"></i>
                    Total Hours
                  </th>
                  <th class="font-bold text-base-content/80">
                    <i class="ri-folder-line mr-1"></i>
                    Accounts
                  </th>
                  <th class="font-bold text-base-content/80">
                    <i class="ri-checkbox-circle-line mr-1"></i>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in records"
                  :key="item.date + item.employeeName"
                  class="hover:bg-base-200/50 transition-colors"
                >
                  <td>
                    <div class="font-medium">{{ formatDate(item.date) }}</div>
                  </td>
                  <td>
                    <div class="flex items-center gap-2">
                      <div class="avatar placeholder">
                        <div class="bg-primary text-primary-content rounded-full w-8">
                          <span class="text-xs font-bold">
                            {{ getInitials(item.employeeName) }}
                          </span>
                        </div>
                      </div>
                      <span class="font-semibold">{{ item.employeeName }}</span>
                    </div>
                  </td>
                  <td>
                    <div class="flex items-center gap-1">
                      <i class="ri-time-line text-info text-sm"></i>
                      <span class="font-medium">{{ item.in }}</span>
                    </div>
                  </td>
                  <td>
                    <div v-if="item.out" class="flex items-center gap-1">
                      <i class="ri-time-line text-info text-sm"></i>
                      <span class="font-medium">{{ item.out }}</span>
                    </div>
                    <div v-else class="flex items-center gap-1 text-warning">
                      <i class="ri-loader-4-line animate-spin text-sm"></i>
                      <span class="font-medium italic">Running...</span>
                    </div>
                  </td>
                  <td>
                    <span class="badge badge-ghost gap-1">
                      <i class="ri-timer-line"></i>
                      {{ item.break }}
                    </span>
                  </td>
                  <td>
                    <div
                      v-if="item.isRunning"
                      class="flex items-center gap-2 font-bold text-primary"
                    >
                      <div class="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                      <span class="text-lg">{{ item.total }}</span>
                    </div>
                    <span v-else class="font-semibold">{{ item.total }}</span>
                  </td>
                  <td>
                    <div class="flex flex-col gap-2 min-w-[200px]">
                      <div
                        v-for="(account, idx) in item.accounts"
                        :key="idx"
                        class="flex items-center gap-2 p-2 rounded-lg bg-base-200/50 hover:bg-base-200 transition-colors"
                      >
                        <div class="flex-1">
                          <div class="font-semibold text-sm">{{ account.account }}</div>
                          <div class="text-xs text-base-content/60">
                            <i class="ri-time-line mr-1"></i>
                            {{ account.hour }}h
                          </div>
                        </div>
                        <span
                          class="badge badge-sm"
                          :class="
                            account.status === 'Approved'
                              ? 'badge-success'
                              : account.status === 'Pending'
                              ? 'badge-warning'
                              : 'badge-error'
                          "
                        >
                          {{ account.status }}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      class="badge badge-lg gap-2 shadow-md"
                      :class="
                        item.status === 'Running'
                          ? 'badge-success'
                          : item.status === 'Completed'
                          ? 'badge-success'
                          : 'badge-warning'
                      "
                    >
                      <i
                        v-if="item.status === 'Running'"
                        class="ri-loader-4-line animate-spin"
                      ></i>
                      <i v-else-if="item.status === 'Completed'" class="ri-check-line"></i>
                      {{ item.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="records.length === 0" class="text-center py-12">
            <i class="ri-inbox-line text-6xl text-base-content/20 mb-4"></i>
            <p class="text-base-content/60 text-lg">No running employees at the moment</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="max-w-7xl mx-auto mt-8 mb-4">
      <div class="card bg-base-100/50 shadow-lg border border-base-300">
        <div class="card-body p-4">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <div class="flex items-center gap-2 text-base-content/60">
              <i class="ri-information-line"></i>
              <span>Timecard system · Running employees view</span>
            </div>
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-success animate-pulse"></div>
                <span class="text-base-content/60">Active Session</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-warning"></div>
                <span class="text-base-content/60">Pending Approval</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Running employees data
const records = ref([
  {
    date: '2026-01-09',
    employeeName: 'John Doe',
    in: '09:05 AM',
    out: null,
    break: '00:15',
    total: '04:30',
    isRunning: true,
    accounts: [
      { account: 'Project Alpha', hour: 2.5, status: 'Pending' },
      { account: 'Project Beta', hour: 2.0, status: 'Pending' }
    ],
    status: 'Running'
  },
  {
    date: '2026-01-09',
    employeeName: 'Jane Smith',
    in: '08:30 AM',
    out: null,
    break: '00:20',
    total: '05:15',
    isRunning: true,
    accounts: [
      { account: 'Project Gamma', hour: 3.0, status: 'Pending' },
      { account: 'Project Alpha', hour: 2.25, status: 'Pending' }
    ],
    status: 'Running'
  },
  {
    date: '2026-01-09',
    employeeName: 'Mike Johnson',
    in: '09:15 AM',
    out: null,
    break: '00:10',
    total: '03:45',
    isRunning: true,
    accounts: [
      { account: 'Project Beta', hour: 3.75, status: 'Pending' }
    ],
    status: 'Running'
  }
])

// Computed properties
const totalHours = computed(() => {
  const total = records.value.reduce((sum, record) => {
    const hours = parseFloat(record.total.split(':')[0]) || 0
    const minutes = parseFloat(record.total.split(':')[1]) || 0
    return sum + hours + minutes / 60
  }, 0)
  return total.toFixed(1) + 'h'
})

const pendingAccounts = computed(() => {
  return records.value.reduce((count, record) => {
    return count + record.accounts.filter(acc => acc.status === 'Pending').length
  }, 0)
})

const todayDate = computed(() => {
  const today = new Date()
  return today.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
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

let timer

// Update running hours every minute
onMounted(() => {
  timer = setInterval(() => {
    // In a real app, this would update the total hours for running employees
    // For demo purposes, we'll just keep the static data
  }, 60000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<style scoped>
/* Enhanced table styling */
.table thead th {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: hsl(var(--b2));
}

.table tbody tr {
  transition: all 0.2s ease;
}

.table tbody tr:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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
