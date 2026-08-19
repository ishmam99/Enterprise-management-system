<template>
  <div class="p-6 space-y-6">

    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold">Last Week</h2>
        <p class="text-sm text-gray-500">
          {{ lastWeekLabel }}
        </p>
      </div>

      <button class="btn btn-outline btn-sm">
        <i class="ri-download-line"></i>
        Export
      </button>
    </div>

    <!-- Timecard by Date -->
    <div
      v-for="(records, date) in groupedTimecards"
      :key="date"
      class="card bg-base-100 shadow"
    >
      <div class="card-body">

        <!-- Date Header -->
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold text-lg">
            {{ formatDate(date) }}
          </h3>
          <span class="badge badge-outline">
            {{ records.length }} Entries
          </span>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="table table-sm">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Hours</th>
                <th>Status</th>
                <th class="text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in records" :key="item.id">
                <td class="font-medium">{{ item.employee }}</td>
                <td>{{ item.checkIn }}</td>
                <td>{{ item.checkOut }}</td>
                <td>{{ item.hours }}</td>

                <td>
                  <span
                    class="badge"
                    :class="statusClass(item.status)"
                  >
                    {{ item.status }}
                  </span>
                </td>

                <td class="text-right">
                  <button
                    class="btn btn-ghost btn-xs"
                    @click="viewDetails(item)"
                  >
                    <i class="ri-eye-line text-lg"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>

    <!-- Empty -->
    <div
      v-if="Object.keys(groupedTimecards).length === 0"
      class="text-center py-16 text-gray-400"
    >
      <i class="ri-calendar-2-line text-4xl"></i>
      <p class="mt-2">No timecards from last week</p>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import moment from 'moment'
import Swal from 'sweetalert2'

/* Last week range (Mon–Sun) */
const startOfLastWeek = moment()
  .subtract(1, 'week')
  .startOf('isoWeek')

const endOfLastWeek = moment()
  .subtract(1, 'week')
  .endOf('isoWeek')

const lastWeekLabel = `${startOfLastWeek.format('DD MMM')} - ${endOfLastWeek.format('DD MMM YYYY')}`

/* Dummy data */
const timecards = [
  {
    id: 1,
    date: startOfLastWeek.clone().add(1, 'day').format('YYYY-MM-DD'),
    employee: 'Ashraful Hider',
    checkIn: '09:10 AM',
    checkOut: '06:00 PM',
    hours: '8.8',
    status: 'Approved',
  },
  {
    id: 2,
    date: startOfLastWeek.clone().add(2, 'day').format('YYYY-MM-DD'),
    employee: 'Rahim Uddin',
    checkIn: '09:30 AM',
    checkOut: '05:40 PM',
    hours: '8.1',
    status: 'Pending',
  },
  {
    id: 3,
    date: startOfLastWeek.clone().add(4, 'day').format('YYYY-MM-DD'),
    employee: 'Karim Mia',
    checkIn: '10:05 AM',
    checkOut: '06:20 PM',
    hours: '7.9',
    status: 'Rejected',
  },
]

/* Group by date */
const groupedTimecards = computed(() => {
  return timecards
    .filter(t =>
      moment(t.date).isBetween(
        startOfLastWeek,
        endOfLastWeek,
        'day',
        '[]'
      )
    )
    .reduce((acc, cur) => {
      acc[cur.date] = acc[cur.date] || []
      acc[cur.date].push(cur)
      return acc
    }, {})
})

/* Helpers */
const formatDate = date =>
  moment(date).format('dddd, DD MMM YYYY')

const statusClass = status => {
  if (status === 'Approved') return 'badge-success'
  if (status === 'Pending') return 'badge-warning'
  if (status === 'Rejected') return 'badge-error'
  return 'badge-ghost'
}

/* Action */
const viewDetails = item => {
  Swal.fire({
    title: 'Timecard Details',
    html: `
      <div class="text-left space-y-1">
        <p><b>Employee:</b> ${item.employee}</p>
        <p><b>Date:</b> ${formatDate(item.date)}</p>
        <p><b>Check In:</b> ${item.checkIn}</p>
        <p><b>Check Out:</b> ${item.checkOut}</p>
        <p><b>Hours:</b> ${item.hours}</p>
        <p><b>Status:</b> ${item.status}</p>
      </div>
    `,
    confirmButtonText: 'Close',
  })
}
</script>
