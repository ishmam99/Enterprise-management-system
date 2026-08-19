<template>
  <div class="min-h-screen bg-base-200 p-6">
    <!-- Header -->
    <div class="max-w-6xl mx-auto mb-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold flex items-center gap-2">
          <i class="ri-calendar-event-line text-primary"></i>
          Employee Timecard
        </h1>
        <span class="badge badge-info gap-2">
          <i class="ri-time-line"></i>
          Upcoming
        </span>
      </div>
    </div>

    <!-- Upcoming Shifts -->
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="shift in upcoming"
        :key="shift.date"
        class="card bg-base-100 shadow-xl"
      >
        <div class="card-body">
          <h2 class="card-title flex items-center gap-2">
            <i class="ri-briefcase-4-line text-secondary"></i>
            {{ shift.title }}
          </h2>

          <div class="mt-4 space-y-2">
            <p class="flex items-center gap-2">
              <i class="ri-calendar-line"></i>
              <span class="font-semibold">Date:</span> {{ shift.date }}
            </p>
            <p class="flex items-center gap-2">
              <i class="ri-login-circle-line"></i>
              <span class="font-semibold">Start:</span> {{ shift.start }}
            </p>
            <p class="flex items-center gap-2">
              <i class="ri-logout-circle-line"></i>
              <span class="font-semibold">End:</span> {{ shift.end }}
            </p>
            <p class="flex items-center gap-2">
              <i class="ri-map-pin-line"></i>
              <span class="font-semibold">Location:</span> {{ shift.location }}
            </p>
          </div>

          <div class="divider"></div>

          <div class="flex gap-2">
            <button class="btn btn-sm btn-primary btn-outline">
              <i class="ri-eye-line"></i>
              View
            </button>
            <button class="btn btn-sm btn-error btn-outline">
              <i class="ri-close-circle-line"></i>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-if="upcoming.length === 0"
      class="max-w-6xl mx-auto mt-20 text-center"
    >
      <i class="ri-calendar-off-line text-6xl text-base-content/40"></i>
      <p class="mt-4 text-lg font-semibold">No upcoming schedules</p>
      <p class="text-base-content/60">You have no future timecards planned.</p>
    </div>

    <!-- Footer -->
    <div class="max-w-6xl mx-auto mt-8 text-center text-sm text-base-content/60">
      <p>Timecard system · Upcoming schedules view</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Static demo data
const upcoming = ref([
  {
    title: 'Morning Shift',
    date: '2026-01-12',
    start: '09:00 AM',
    end: '05:00 PM',
    location: 'Head Office'
  },
  {
    title: 'Support Shift',
    date: '2026-01-13',
    start: '10:00 AM',
    end: '06:00 PM',
    location: 'Remote'
  },
  {
    title: 'Weekend Shift',
    date: '2026-01-15',
    start: '08:00 AM',
    end: '02:00 PM',
    location: 'Branch Office'
  }
])
</script>

<style scoped>
/* Static upcoming page – styling handled by Tailwind & DaisyUI */
</style>
