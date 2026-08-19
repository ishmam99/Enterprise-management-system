<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-6">
    <!-- ================= HEADER ================= -->
    <div class="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-xl mb-6 p-6 text-white">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <!-- Left -->
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow">
            <i class="ri-dashboard-line text-2xl text-purple-600"></i>
          </div>
          <div>
            <h1 class="text-2xl md:text-3xl font-bold">HR Timecard Dashboard</h1>
            <div class="flex items-center gap-2 mt-1">
              <i class="ri-user-line text-sm"></i>
              <p class="text-sm opacity-90">{{ employeeName || 'Loading...' }}</p>
              <span class="px-2 py-1 bg-white/20 rounded text-xs">
                <i class="ri-building-4-line text-xs mr-1"></i>
                {{ departmentName || 'Department' }}
              </span>
              <span class="px-2 py-1 bg-white/20 rounded text-xs">
                <i class="ri-calendar-line text-xs mr-1"></i>
                {{ weekRangeText }}
              </span>
            </div>
          </div>
        </div>

        <!-- Right - Week Navigation -->
        <div class="flex gap-2" v-if="!dateFilter || dateFilter === 'this_week'">
          <button @click="prevWeek"
            class="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors flex items-center gap-1 text-sm">
            <i class="ri-arrow-left-s-line"></i>
            Previous Week
          </button>
          <button @click="nextWeek"
            class="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors flex items-center gap-1 text-sm">
            Next Week
            <i class="ri-arrow-right-s-line"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- ================= STATS CARDS ================= -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <!-- Total Days Card -->
      <div class="bg-white rounded-xl shadow border p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 flex items-center gap-1">
              <i class="ri-calendar-check-line"></i>
              Total Days
            </p>
            <p v-if="!loading" class="text-2xl font-bold text-gray-800 mt-1">{{ stats.totalDays }}</p>
            <div v-else class="h-7 w-16 bg-gray-200 rounded animate-pulse mt-1"></div>
          </div>
          <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <i class="ri-calendar-line text-xl text-blue-600"></i>
          </div>
        </div>
      </div>

      <!-- Pending HR Approval Card -->
      <div class="bg-white rounded-xl shadow border p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 flex items-center gap-1">
              <i class="ri-time-line"></i>
              Pending HR Approval
            </p>
            <p v-if="!loading" class="text-2xl font-bold text-orange-600 mt-1">{{ stats.pendingHR }}</p>
            <div v-else class="h-7 w-16 bg-gray-200 rounded animate-pulse mt-1"></div>
          </div>
          <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <i class="ri-time-line text-xl text-orange-600"></i>
          </div>
        </div>
      </div>

      <!-- HR Approved Card -->
      <div class="bg-white rounded-xl shadow border p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 flex items-center gap-1">
              <i class="ri-check-double-line"></i>
              HR Approved
            </p>
            <p v-if="!loading" class="text-2xl font-bold text-green-600 mt-1">{{ stats.hrApproved }}</p>
            <div v-else class="h-7 w-16 bg-gray-200 rounded animate-pulse mt-1"></div>
          </div>
          <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <i class="ri-check-double-line text-xl text-green-600"></i>
          </div>
        </div>
      </div>

      <!-- Total Hours Card -->
      <div class="bg-white rounded-xl shadow border p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 flex items-center gap-1">
              <i class="ri-timer-line"></i>
              Total Hours
            </p>
            <div v-if="!loading">
              <p class="text-2xl font-bold text-purple-600 mt-1">{{ stats.totalHours.toFixed(1) }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ stats.totalMinutes }} minutes</p>
            </div>
            <div v-else>
              <div class="h-7 w-16 bg-gray-200 rounded animate-pulse mt-1"></div>
              <div class="h-3 w-12 bg-gray-200 rounded animate-pulse mt-1"></div>
            </div>
          </div>
          <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <i class="ri-timer-line text-xl text-purple-600"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= ENHANCED TABLE DESIGN ================= -->
    <div class="bg-white rounded-xl shadow-lg border overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full border-collapse text-sm">
          <!-- GROUP HEADER -->
          <thead>
            <tr class="text-center font-bold">
              <th colspan="4" class="border p-3 bg-blue-50 text-blue-700">
                <div class="flex items-center justify-center gap-2">
                  <!-- <i class="ri-calendar-event-line"></i> -->
                  Login Details
                </div>
              </th>
              <th colspan="8" class="border p-3 bg-green-50 text-green-700">
                <div class="flex items-center justify-center gap-2">
                  <!-- <i class="ri-task-line"></i> -->
                  Task / Work Details
                </div>
              </th>
              <th colspan="4" class="border p-3 bg-purple-50 text-purple-700">
                <div class="flex items-center justify-center gap-2">
                  <!-- <i class="ri-check-double-line"></i> -->
                  Approval Status
                </div>
              </th>
            </tr>

            <tr>
              <th class="border p-3 bg-blue-50 text-left">Day</th>
              <th class="border p-3 bg-blue-50 text-left">Date</th>
              <th class="border p-3 bg-blue-50 text-left">Login/Logout</th>
              <th class="border p-3 bg-blue-50 text-left">Total Login Time</th>

              <th class="border p-3 bg-green-50 text-left">Department</th>
              <th class="border p-3 bg-green-50 text-left">Activity</th>
              <th class="border p-3 bg-green-50 text-left">Account Name</th>
              <th class="border p-3 bg-green-50 text-left">Description</th>
              <th class="border p-3 bg-green-50 text-left">Output</th>
              <th class="border p-3 bg-green-50 text-left">Hours</th>
              <th class="border p-3 bg-green-50 text-left">Minutes</th>
              <th class="border p-3 bg-green-50 text-left">Total Task Time</th>



              <th class="border p-3 bg-purple-50 text-left">Employee</th>
              <th class="border p-3 bg-purple-50 text-left">Manager</th>
              <th class="border p-3 bg-purple-50 text-left">HR Action</th>
            </tr>

            <!-- TIME SPENT SUB-HEADER -->
            <!-- <tr>
              <th colspan="9" class="border p-2 bg-green-50"></th>
              <th class="border p-2 bg-green-50 text-center">Hours</th>
              <th class="border p-2 bg-green-50 text-center">Minutes</th>
              <th colspan="3" class="border p-2 bg-green-50"></th>
            </tr> -->
          </thead>

          <tbody>
            <!-- LOADING STATE -->
            <tr v-if="loading">
              <td colspan="16" class="px-4 py-8 border">
                <div class="flex flex-col items-center justify-center">
                  <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600 mb-4"></div>
                  <p class="text-sm text-gray-600">Loading attendance data...</p>
                </div>
              </td>
            </tr>

            <!-- DATA ROWS -->
            <template v-else>
              <template v-for="day in days" :key="day.date">
                <template v-for="(timeEntry, timeIndex) in attendanceByDate[day.date]?.times || [{}]"
                  :key="timeEntry.id || timeIndex">
                  <tr :class="[
                    'hover:bg-gray-50 transition-colors',
                    attendanceByDate[day.date]?.status === '0' ? 'bg-yellow-50' :
                      attendanceByDate[day.date]?.status === '1' ? 'bg-blue-50' :
                        attendanceByDate[day.date]?.status === '2' ? 'bg-orange-50' :
                          attendanceByDate[day.date]?.status === '3' ? 'bg-green-50' : ''
                  ]">
                    <!-- DAY (with rowspan) -->
                    <td v-if="timeIndex === 0" :rowspan="Math.max(1, attendanceByDate[day.date]?.times?.length || 1)"
                      class="border p-3 font-semibold">
                      <div class="flex flex-col items-start">
                        <span class="text-lg font-bold text-gray-900">{{ day.shortName }}</span>
                        <span class="text-xs text-gray-500">{{ day.name }}</span>
                      </div>
                    </td>

                    <!-- DATE (with rowspan) -->
                    <td v-if="timeIndex === 0" :rowspan="Math.max(1, attendanceByDate[day.date]?.times?.length || 1)"
                      class="border p-3">
                      <span
                        class="inline-flex items-center px-3 py-1 rounded-xl text-nowrap text-sm font-medium bg-blue-100 text-blue-800">
                        {{ day.date }}
                      </span>
                    </td>

                    <!-- ATTENDANCE TIME (with rowspan) -->
                    <td v-if="timeIndex === 0" :rowspan="Math.max(1, attendanceByDate[day.date]?.times?.length || 1)"
                      class="border p-3">
                      <div v-if="attendanceByDate[day.date]?.attendance_logs?.length" class="space-y-2">
                        <div class="space-y-2">
                          <div v-for="(log, idx) in attendanceByDate[day.date]?.attendance_logs" :key="idx"
                            class="border-l-2 border-blue-400 pl-2">
                            <div class="flex items-center gap-2 text-sm">
                              <span class="font-medium text-gray-700">Session {{ idx + 1 }}:</span>
                              <span class="text-green-600 font-medium">{{ (log.login_time) }}</span>
                              <span class="text-gray-400">→</span>
                              <span class="text-red-600 font-medium">{{ (log.logout_time) }}</span>
                            </div>
                          </div>
                        </div>
                        <div class="text-xs text-gray-500 mt-2 pt-2 border-t">
                          Total: {{ attendanceByDate[day.date]?.attendance_logs?.length || 0 }} session(s)
                        </div>
                      </div>
                      <div v-else class="text-gray-400">
                        <i class="ri-time-line mr-1"></i>
                        No attendance
                      </div>
                    </td>

                    <!-- TOTAL LOGIN TIME (with rowspan) -->
                    <td v-if="timeIndex === 0" :rowspan="Math.max(1, attendanceByDate[day.date]?.times?.length || 1)"
                      class="border p-3 text-center">
                      <div class="font-bold text-lg text-gray-900">
                        {{ getTotalLoginTime(day.date).hours }}h
                        {{ getTotalLoginTime(day.date).minutes.toString().padStart(2, '0') }}m
                      </div>
                    </td>


                    <!-- Department -->
                    <td class="border p-2">
                      <div class="flex flex-col">
                        <span class="font-medium text-center text-gray-900">{{ timeEntry.type_of_work ?? '---' }}</span>
                      </div>

                    </td>

                    <!-- Activity -->
                    <td class="border p-2">
                      <div class="flex flex-col">
                        <span class="font-medium text-gray-900">{{ timeEntry.activity ?? "--" }}</span>
                      </div>

                    </td>

                    <!-- Account NAME -->
                    <td class="border p-2">
                      <span class="font-medium text-gray-900">{{ timeEntry.efficiency ?? "--" }}</span>
                    </td>

                    <!-- DESCRIPTION -->
                    <td class="border p-2">
                      <div v-if="timeEntry.description" class="text-sm text-gray-700 max-w-xs truncate"
                        :title="timeEntry.description">
                        {{ timeEntry.description }}
                      </div>
                      <span v-else class="text-gray-400">—</span>
                    </td>

                    <!-- OUTPUT -->
                    <td class="border p-2">
                      <div v-if="timeEntry.output" class="text-sm text-gray-700 max-w-xs truncate"
                        :title="timeEntry.output">
                        {{ timeEntry.output }}
                      </div>
                      <span v-else class="text-gray-400">—</span>
                    </td>

                    <!-- HOURS -->
                    <td class="border p-2 text-center">
                      <div v-if="timeEntry.total_hours || timeEntry.total_hours === 0"
                        class="bg-gray-50 p-2 rounded-lg">
                        <span class="font-bold text-gray-900">{{ timeEntry.total_hours || 0 }} Hours</span>
                      </div>
                      <div v-else class="py-4">
                        <span class="text-gray-400">—</span>
                      </div>
                    </td>

                    <!-- MINUTES -->
                    <td class="border p-2 text-center">
                      <div v-if="timeEntry.total_minute || timeEntry.total_minute === 0"
                        class="bg-gray-50 p-2 rounded-lg">
                        <span class="font-bold text-gray-900">{{ (timeEntry.total_minute || 0).toString().padStart(2,
                          '0') }} Minutes</span>
                      </div>
                      <div v-else class="py-4">
                        <span class="text-gray-400">—</span>
                      </div>
                    </td>
                    <!-- total -->
                    <!-- TOTAL TASK TIME (calculated from all tasks) -->
                    <td v-if="timeIndex === 0" :rowspan="Math.max(1, attendanceByDate[day.date]?.times?.length || 1)"
                      class="border p-3 text-center">
                      <div class="font-bold text-lg text-purple-900">
                        {{ calculateDailyTotalTime(attendanceByDate[day.date]?.times) }}
                      </div>
                    </td>


                    <!-- EMPLOYEE APPROVAL STATUS (with rowspan) -->
                    <td v-if="timeIndex === 0" :rowspan="Math.max(1, attendanceByDate[day.date]?.times?.length || 1)"
                      class="border p-3 text-center">
                      <div class="flex flex-col items-center gap-1">
                        <span :class="getEmployeeStatusClass(attendanceByDate[day.date]?.status)">
                          {{ getEmployeeStatusText(attendanceByDate[day.date]?.status) }}
                        </span>
                        <!-- <div class="text-xs text-gray-500 mt-1">
                          {{ getEmployeeStatusTooltip(attendanceByDate[day.date]?.status) }}
                        </div> -->
                      </div>
                    </td>

                    <!-- MANAGER APPROVAL STATUS (with rowspan) - REMOVED APPROVE BUTTON -->
                    <td v-if="timeIndex === 0" :rowspan="Math.max(1, attendanceByDate[day.date]?.times?.length || 1)"
                      class="border p-3 text-center">
                      <div class="flex flex-col items-center gap-1">
                        <span :class="getManagerStatusClass(attendanceByDate[day.date]?.status)">
                          {{ getManagerStatusText(attendanceByDate[day.date]?.status) }}
                        </span>
                        <!-- <div class="text-xs text-gray-500 mt-1">
                          {{ getManagerStatusTooltip(attendanceByDate[day.date]?.status) }}
                        </div> -->
                      </div>
                    </td>

                    <!-- HR ACTION (with rowspan) - ONLY HR HAS APPROVE BUTTON -->
                    <td v-if="timeIndex === 0" :rowspan="Math.max(1, attendanceByDate[day.date]?.times?.length || 1)"
                      class="border p-3 text-center">
                      <div>
                        <!-- Show Approve button only if status is not already HR Approved (3) -->
                        <button v-if="attendanceByDate[day.date]?.status !== '3'"
                          @click="confirmApprove(attendanceByDate[day.date])"
                          class="inline-flex items-center px-4 py-2 rounded text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          :disabled="approvingId === attendanceByDate[day.date]?.id">
                          <div class="flex items-center gap-2">
                            <i v-if="approvingId === attendanceByDate[day.date]?.id"
                              class="ri-loader-4-line animate-spin"></i>
                            <i v-else class="ri-check-line"></i>
                            {{ approvingId === attendanceByDate[day.date]?.id ? 'Approving...' : 'Approve' }}
                          </div>
                        </button>

                        <!-- Show Approved badge if already HR approved -->
                        <div v-else class="flex flex-col items-center gap-1">
                          <span
                            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            <i class="ri-check-double-line mr-1"></i>
                            HR Approved
                          </span>
                          <div class="text-xs text-gray-500">
                            {{ formatApprovalDate(attendanceByDate[day.date]) }}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </template>

                <!-- EMPTY STATE FOR DAY (when attendance exists but no time entries) -->
                <tr
                  v-if="(!attendanceByDate[day.date]?.times || attendanceByDate[day.date]?.times.length === 0) && attendanceByDate[day.date]"
                  :class="[
                    'hover:bg-gray-50',
                    attendanceByDate[day.date]?.status === '0' ? 'bg-yellow-50' :
                      attendanceByDate[day.date]?.status === '1' ? 'bg-blue-50' :
                        attendanceByDate[day.date]?.status === '2' ? 'bg-orange-50' :
                          attendanceByDate[day.date]?.status === '3' ? 'bg-green-50' : ''
                  ]">
                  <td class="border p-3 font-semibold">
                    <div class="flex flex-col items-start">
                      <span class="text-lg font-bold text-gray-900">{{ day.shortName }}</span>
                      <span class="text-xs text-gray-500">{{ day.name }}</span>
                    </div>
                  </td>
                  <td class="border p-3">
                    <span
                      class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {{ day.date }}
                    </span>
                  </td>
                  <td class="border p-3">
                    <div v-if="attendanceByDate[day.date]?.attendance_logs?.length" class="space-y-2">
                      <div class="space-y-2">
                        <div v-for="(log, idx) in attendanceByDate[day.date]?.attendance_logs" :key="idx"
                          class="border-l-2 border-blue-400 pl-2">
                          <div class="flex items-center gap-2 text-sm">
                            <span class="font-medium text-gray-700">Session {{ idx + 1 }}:</span>
                            <span class="text-green-600 font-medium">{{ formatTime(log.login_time) }}</span>
                            <span class="text-gray-400">→</span>
                            <span class="text-red-600 font-medium">{{ formatTime(log.logout_time) }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="text-xs text-gray-500 mt-2 pt-2 border-t">
                        Total: {{ attendanceByDate[day.date]?.attendance_logs?.length || 0 }} session(s)
                      </div>
                    </div>
                    <div v-else class="text-gray-400">
                      <i class="ri-time-line mr-1"></i>
                      No attendance
                    </div>
                  </td>
                  <td class="border p-3 text-center">
                    <div class="font-bold text-lg text-gray-900">
                      {{ getTotalLoginTime(day.date).hours }}h
                      {{ getTotalLoginTime(day.date).minutes.toString().padStart(2, '0') }}m
                    </div>
                  </td>
                  <td colspan="7" class="border p-3 text-center text-gray-500">
                    No work entries for this day
                  </td>
                  <td class="border p-3 text-center">
                    <div class="flex flex-col items-center gap-1">
                      <span :class="getEmployeeStatusClass(attendanceByDate[day.date]?.status)">
                        {{ getEmployeeStatusText(attendanceByDate[day.date]?.status) }}
                      </span>
                    </div>
                  </td>
                  <!-- <td class="border p-3 text-center">
                    <div class="flex flex-col items-center gap-1">
                      <span :class="getManagerStatusClass(attendanceByDate[day.date]?.status)">
                        {{ getManagerStatusText(attendanceByDate[day.date]?.status) }}
                      </span>
                    </div>
                  </td> -->
                  <td class="border p-3 text-center">
                    <div>
                      <!-- <button v-if="attendanceByDate[day.date]?.status !== '3'"
                        @click="confirmApprove(attendanceByDate[day.date])"
                        class="inline-flex items-center px-4 py-2 rounded text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        :disabled="approvingId === attendanceByDate[day.date]?.id">
                        <div class="flex items-center gap-2">
                          <i v-if="approvingId === attendanceByDate[day.date]?.id"
                            class="ri-loader-4-line animate-spin"></i>
                          <i v-else class="ri-check-line"></i>
                          {{ approvingId === attendanceByDate[day.date]?.id ? 'Approving...' : 'Approve' }}
                        </div>
                      </button> -->
                      <!-- <div  class="flex flex-col items-center gap-1">
                        <span
                          class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          <i class="ri-check-double-line mr-1"></i>
                          HR Approved
                        </span>
                      </div> -->
                    </div>
                  </td>
                </tr>
              </template>

              <!-- EMPTY STATE FOR WEEK -->
              <tr v-if="!loading && Object.keys(attendanceByDate).length === 0">
                <td colspan="15" class="px-4 py-12 text-center border">
                  <div class="flex flex-col items-center justify-center">
                    <i class="ri-inbox-line text-4xl text-gray-400 mb-4"></i>
                    <p class="text-lg font-medium text-gray-900 mb-2">No attendance records found</p>
                    <p class="text-sm text-gray-500 mb-4">No attendance data available for this week</p>
                    <button @click="loadDataForWeek"
                      class="inline-flex items-center px-4 py-2 rounded text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors">
                      <i class="ri-refresh-line mr-2"></i>
                      Refresh Data
                    </button>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import Swal from 'sweetalert2'
import moment from 'moment'
import api from '@/config/api'
import { useHRM } from '@/composables/useHRM'

/* ================= ROUTE & PARAMS ================= */
const route = useRoute()
const userId = ref(route.params.userId)
const departmentName = ref(decodeURIComponent(route.params.departmentName || ''))
const employeeName = ref(route.query.name || '')
const dateFilter = ref(route.query.date_filter || null)
const { hrmApi } = useHRM()

/* ================= STATE ================= */
const weekStart = ref(getInitialDateRange())
const dateRange = ref(getDateRangeFromFilter())
const attendanceByDate = ref({})
const approvingId = ref(null)
const loading = ref(true)

/* ================= COMPUTED ================= */
const days = computed(() => {
  if (dateFilter.value === 'today') {
    const today = new Date()
    return [{
      date: today.toISOString().split('T')[0],
      name: today.toLocaleDateString('en-US', { weekday: 'long' }),
      shortName: today.toLocaleDateString('en-US', { weekday: 'short' })
    }]
  } else if (dateFilter.value === 'this_month') {
    const start = dateRange.value.start
    const end = dateRange.value.end
    const daysArray = []
    const current = new Date(start)
    while (current <= end) {
      daysArray.push({
        date: current.toISOString().split('T')[0],
        name: current.toLocaleDateString('en-US', { weekday: 'long' }),
        shortName: current.toLocaleDateString('en-US', { weekday: 'short' })
      })
      current.setDate(current.getDate() + 1)
    }
    return daysArray
  } else {
    // Default: week view
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(weekStart.value)
      d.setDate(d.getDate() + i)
      return {
        date: d.toISOString().split('T')[0],
        name: d.toLocaleDateString('en-US', { weekday: 'long' }),
        shortName: d.toLocaleDateString('en-US', { weekday: 'short' })
      }
    })
  }
})

const calculateDailyTotalTime = (times) => {
  if (!times || !Array.isArray(times) || times.length === 0) {
    return '0h 00m'
  }

  let totalMinutes = 0

  times.forEach(task => {
    const hours = parseInt(task.total_hours) || 0
    const minutes = parseInt(task.total_minute) || 0
    totalMinutes += (hours * 60) + minutes
  })

  const totalHours = Math.floor(totalMinutes / 60)
  const remainingMinutes = totalMinutes % 60

  return `${totalHours}h ${remainingMinutes.toString().padStart(2, '0')}m`
}

const stats = computed(() => {
  const attendanceData = Object.values(attendanceByDate.value)

  // Calculate total hours and minutes from times array
  let totalHours = 0
  let totalMinutes = 0

  attendanceData.forEach(attendance => {
    if (attendance.times && Array.isArray(attendance.times)) {
      attendance.times.forEach(timeEntry => {
        totalHours += parseFloat(timeEntry.total_hours || 0)
        totalMinutes += parseInt(timeEntry.total_minute || 0)
      })
    }
  })

  return {
    totalDays: attendanceData.length,
    pendingHR: attendanceData.filter(a => a.status !== '3').length,
    hrApproved: attendanceData.filter(a => a.status === '3').length,
    totalHours: totalHours,
    totalMinutes: totalMinutes
  }
})

const weekRangeText = computed(() => {
  if (dateFilter.value === 'today') {
    const today = new Date()
    return today.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  } else if (dateFilter.value === 'this_week') {
    const start = weekStart.value
    const end = new Date(start)
    end.setDate(start.getDate() + 6)

    const format = (d) =>
      d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })

    return `${format(start)} - ${format(end)}`
  } else if (dateFilter.value === 'this_month') {
    const start = dateRange.value.start
    const end = dateRange.value.end

    const format = (d) =>
      d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })

    return `${format(start)} - ${format(end)}`
  }

  // Default: current week
  const start = weekStart.value
  const end = new Date(start)
  end.setDate(start.getDate() + 6)

  const format = (d) =>
    d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })

  return `${format(start)} - ${format(end)}`
})

/* ================= DATE & TIME FUNCTIONS ================= */
const formatTime = (datetime) => {
  if (!datetime) return '—'

  // Handle if datetime is just a time string (HH:mm:ss or HH:mm)
  if (typeof datetime === 'string' && !datetime.includes('T') && !datetime.includes('-')) {
    // Parse time-only string
    const parts = datetime.split(':')
    if (parts.length >= 2) {
      const hours = parseInt(parts[0], 10)
      const minutes = parseInt(parts[1], 10)
      const today = new Date()
      today.setHours(hours, minutes, 0)
      return today.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    }
  }

  // Handle full datetime strings
  const date = new Date(datetime)
  if (isNaN(date.getTime())) return '—'

  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
}

const getFirstLoginTime = (date) => {
  const logs = attendanceByDate.value[date]?.attendance_logs
  return logs?.length ? formatTime(logs[0].login_time) : '—'
}

const getLastLogoutTime = (date) => {
  const logs = attendanceByDate.value[date]?.attendance_logs
  if (!logs?.length) return '—'

  for (let i = logs.length - 1; i >= 0; i--) {
    if (logs[i].logout_time) {
      return formatTime(logs[i].logout_time)
    }
  }
  return '—'
}

const getTotalLoginTime = (date) => {
  const logs = attendanceByDate.value?.[date]?.attendance_logs || []

  if (!logs.length) {
    return { hours: 0, minutes: 0 }
  }

  let totalMinutes = 0

  const parseTimeToMinutes = (timeStr) => {
    if (!timeStr) return null

    try {
      const [time, modifier] = timeStr.trim().split(' ')
      let [hours, minutes] = time.split(':').map(Number)

      if (isNaN(hours) || isNaN(minutes)) return null

      // Convert to 24h format
      if (modifier === 'PM' && hours !== 12) hours += 12
      if (modifier === 'AM' && hours === 12) hours = 0

      return hours * 60 + minutes
    } catch (e) {
      console.error('Time parse error:', timeStr)
      return null
    }
  }

  logs.forEach(log => {
    const loginMin = parseTimeToMinutes(log.login_time)
    const logoutMin = parseTimeToMinutes(log.logout_time)

    if (loginMin === null || logoutMin === null) return

    let diff = logoutMin - loginMin

    // Handle overnight shift (VERY IMPORTANT)
    if (diff < 0) {
      diff += 24 * 60
    }

    totalMinutes += diff
  })

  return {
    hours: Math.floor(totalMinutes / 60),
    minutes: totalMinutes % 60
  }
}
const formatDate = (date) => {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const formatApprovalDate = (attendance) => {
  if (!attendance?.updated_at) return ''
  const date = new Date(attendance.updated_at)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

/* ================= STATUS FUNCTIONS ================= */
const getEmployeeStatusText = (status) => {
  switch (status) {
    case '0': return 'Pending'
    case '1': return 'Approved'
    case '2': return 'Approved'
    case '3': return 'Approved'
    default: return 'Pending'
  }
}

const getEmployeeStatusTooltip = (status) => {
  switch (status) {
    case '0': return 'Awaiting employee submission'
    case '1': return 'Submitted by employee'
    case '2': return 'Submitted by employee'
    case '3': return 'Submitted by employee'
    default: return 'No data'
  }
}

const getManagerStatusText = (status) => {
  switch (status) {
    case '0': return 'Pending'
    case '1': return 'Pending'
    case '2': return 'Approved'
    case '3': return 'Approved'
    default: return 'Pending'
  }
}

const getManagerStatusTooltip = (status) => {
  switch (status) {
    case '0': return 'Awaiting manager approval'
    case '1': return 'Awaiting manager approval'
    case '2': return 'Approved by manager'
    case '3': return 'Approved by manager'
    default: return 'No data'
  }
}

const getEmployeeStatusClass = (status) => {
  const empStatus = getEmployeeStatusText(status)
  return empStatus === 'Approved'
    ? 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800'
    : 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800'
}

const getManagerStatusClass = (status) => {
  const mgrStatus = getManagerStatusText(status)
  return mgrStatus === 'Approved'
    ? 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800'
    : 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800'
}

/* ================= WEEK NAVIGATION ================= */
const prevWeek = () => {
  const newDate = new Date(weekStart.value)
  newDate.setDate(newDate.getDate() - 7)
  weekStart.value = newDate
  if (dateFilter.value === 'this_week' || !dateFilter.value) {
    dateRange.value = {
      start: new Date(newDate),
      end: new Date(newDate)
    }
    dateRange.value.end.setDate(dateRange.value.end.getDate() + 6)
  }
  loadDataForWeek()
}

const nextWeek = () => {
  const newDate = new Date(weekStart.value)
  newDate.setDate(newDate.getDate() + 7)
  weekStart.value = newDate
  if (dateFilter.value === 'this_week' || !dateFilter.value) {
    dateRange.value = {
      start: new Date(newDate),
      end: new Date(newDate)
    }
    dateRange.value.end.setDate(dateRange.value.end.getDate() + 6)
  }
  loadDataForWeek()
}


/* ================= API FUNCTIONS ================= */
const loadAttendanceForWeek = async () => {
  loading.value = true
  attendanceByDate.value = {}

  try {
    // Get date range for the current view
    const startDate = days.value[0]?.date
    const endDate = days.value[days.value.length - 1]?.date

    if (!startDate || !endDate) {
      console.error('Invalid date range')
      loading.value = false
      return
    }

    console.log(`Fetching timecard for user ${userId.value} from ${startDate} to ${endDate}`)

    // Single API call with user_id, start_date, end_date
    const res = await hrmApi.get(`/timecard-info-of-user/${userId.value}/${startDate}/${endDate}`)

    if (res.data.data && res.data.data.length > 0) {
      // The API returns an array of attendance records
      res.data.data.forEach(attendance => {
        // Transform the API response to match our expected format
        const date = attendance.date

        // Transform attendance_tasks data to times array format
        const times = (attendance.attendance_tasks || []).map(task => ({
          id: task.id,
          total_hours: parseInt(task.hour) || 0,
          total_minute: parseInt(task.minute) || 0,
          login_time: '',
          logout_time: '',
          activity: task.activity || 'Work',
          record_id: task.record_id || '',
          type_of_work: task.type_of_work || '',
          efficiency: task.efficiency || '',
          // prefer explicit names when available, otherwise resolve via productList
          product: task.project_name || task.product_name || (task.product_id ? `Product ${task.product_id}` : ''),
          module: { name: task.module_name || (task.module_id ? `Module ${task.module_id}` : '') },
          major_task: task.major_task || '',
          major_sub_task: task.major_sub_task || '',
          description: task.description || task.output_summary || '',
          total_task_time: attendance.total_task_time,
          output: task.output_summary || ''
        }))

        // Transform attendance logs (login/logout records) from timecard data
        const attendance_logs = (attendance.timecard || []).map(tc => ({
          login_time: tc.login_time,
          logout_time: tc.logout_time
        }))

        // Build the attendance object for this date
        attendanceByDate.value[date] = {
          id: attendance.id,
          date: attendance.date,
          day: attendance.day,
          user_id: attendance.user_id,
          user_name: attendance.user_name,
          department: attendance.department,
          status: attendance.status,
          total_task_time: attendance.total_task_time,
          times: times,
          attendance_logs: attendance_logs,
          total_working_hours: attendance.total_time_worked,
          updated_at: new Date().toISOString()
        }

        // Set employee name if not already set
        if (attendance.user_name && !employeeName.value) {
          employeeName.value = attendance.user_name
        }

        console.log(`Loaded attendance for ${date}:`, attendanceByDate.value[date])
      })
    } else {
      console.log('No timecard data found for this date range')
    }
  } catch (error) {
    console.error('Error loading attendance for week:', error)
  } finally {
    loading.value = false
  }
}

const formatTaskTime = (timeStr) => {
  if (!timeStr) return '0h 00m'

  const match = timeStr.match(/(\d+)\s*Hours?\s*(\d+)\s*Min/i)

  if (!match) return timeStr

  const hours = parseInt(match[1])
  const minutes = parseInt(match[2])

  return `${hours}h ${minutes.toString().padStart(2, '0')}m`
}

const approveAttendance = async (attendance) => {
  try {
    approvingId.value = attendance.id

    const { data } = await hrmApi.post(`/timecard-approve/${attendance.id}`, {
      status: '3', // HR Approval (send as string)
      date: attendance.date,
      user_id: attendance.user_id
    })

    console.log('Approve response:', data)

    // Check if response indicates success (any message field means success)
    const isSuccess = data && (data.success === true || data.message || data.data)

    if (isSuccess) {
      // Show success dialog
      Swal.fire({
        icon: 'success',
        title: 'Approved!',
        text: 'Timecard has been approved by HR',
        timer: 2000,
        showConfirmButton: false
      })

      // Reload attendance data from server to confirm the change persisted
      console.log('Reloading attendance data after approval...')
      await loadAttendanceForWeek()
    } else {
      console.warn('Unexpected response format:', data)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to approve timecard',
      })
    }
  } catch (error) {
    console.error('Error approving timecard:', error)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to approve timecard. Please try again.',
    })
  } finally {
    approvingId.value = null
  }
}

const confirmApprove = (attendance) => {
  const currentStatus = getStatusText(attendance.status)

  Swal.fire({
    title: 'Approve Attendance?',
    html: `
      <div class="text-left">
        <p>Approve attendance for <strong>${formatDate(attendance.date)}</strong>?</p>
        <p class="text-sm text-gray-600 mt-2">Current status: <span class="${getStatusBadgeClass(attendance.status)}">${currentStatus}</span></p>
        <p class="text-sm text-gray-600">This will change status to <strong>HR Approved</strong>.</p>
      </div>
    `,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, Approve',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#10b981',
  }).then((result) => {
    if (result.isConfirmed) {
      approveAttendance(attendance)
    }
  })
}

const loadDataForWeek = async () => {
  await loadAttendanceForWeek()
}

/* ================= HELPER FUNCTIONS ================= */
function getStatusText(status) {
  switch (status) {
    case '0': return 'Pending'
    case '1': return 'Employee Approved'
    case '2': return 'Manager Approved'
    case '3': return 'HR Approved'
    default: return 'No Data'
  }
}

/* ================= TOTAL TIME CALCULATION FUNCTIONS ================= */

/**
 * Calculate total time for a single task (combines hours and minutes)
 */
const calculateTotalTimeForTask = (hours, minutes) => {
  const totalHours = parseFloat(hours || 0)
  const totalMinutes = parseInt(minutes || 0)

  // Convert everything to minutes for accurate calculation
  let totalMinutesCombined = (totalHours * 60) + totalMinutes

  // Convert back to hours and minutes
  const finalHours = Math.floor(totalMinutesCombined / 60)
  const finalMinutes = totalMinutesCombined % 60

  return {
    hours: finalHours,
    minutes: finalMinutes,
    decimalHours: totalMinutesCombined / 60
  }
}

/**
 * Calculate daily total for the summary row
 */
const calculateDailyTaskTotal = (date) => {
  const attendance = attendanceByDate.value[date]
  if (!attendance?.times || !Array.isArray(attendance.times) || attendance.times.length === 0) {
    return { totalHours: 0, totalMinutes: 0, taskCount: 0, decimalHours: 0 }
  }

  let totalMinutes = 0
  attendance.times.forEach(task => {
    totalMinutes += (parseFloat(task.total_hours || 0) * 60)
    totalMinutes += parseInt(task.total_minute || 0)
  })

  return {
    totalHours: Math.floor(totalMinutes / 60),
    totalMinutes: totalMinutes % 60,
    taskCount: attendance.times.length,
    decimalHours: totalMinutes / 60
  }
}

function getStatusBadgeClass(status) {
  switch (status) {
    case '0': return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800'
    case '1': return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'
    case '2': return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800'
    case '3': return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'
    default: return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800'
  }
}

/* ================= WATCHERS ================= */
watch(() => route.params.userId, (newId) => {
  if (newId) {
    const oldId = userId.value
    userId.value = newId
    if (oldId !== newId) {
      employeeName.value = route.query.name || ''
      attendanceByDate.value = {}
      loading.value = true
      loadDataForWeek()
    }
  }
}, { immediate: false })

watch(() => route.params.departmentName, (newDeptName) => {
  if (newDeptName) {
    departmentName.value = decodeURIComponent(newDeptName)
  }
}, { immediate: false })

watch(() => route.query.date_filter, (newFilter) => {
  dateFilter.value = newFilter || null
  weekStart.value = getInitialDateRange()
  dateRange.value = getDateRangeFromFilter()
  loadDataForWeek()
}, { immediate: false })

watch(() => route.query.name, (newName) => {
  if (newName) {
    employeeName.value = newName
  }
}, { immediate: false })

/* ================= INIT ================= */
onMounted(async () => {
  if (!userId.value) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No user ID provided',
    })
    return
  }
  // await loadRecords()
  await loadDataForWeek()
})

function getInitialDateRange() {
  if (dateFilter.value === 'today') {
    return new Date()
  } else if (dateFilter.value === 'this_week') {
    return getSaturday(new Date())
  } else if (dateFilter.value === 'this_month') {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  }
  return getSaturday(new Date())
}

function getDateRangeFromFilter() {
  const now = new Date()
  if (dateFilter.value === 'today') {
    const today = new Date(now)
    today.setHours(0, 0, 0, 0)
    return {
      start: today,
      end: new Date(today)
    }
  } else if (dateFilter.value === 'this_week') {
    const start = getSaturday(now)
    const end = new Date(start)
    end.setDate(start.getDate() + 6)
    return { start, end }
  } else if (dateFilter.value === 'this_month') {
    const start = new Date(now.getFullYear(), now.getMonth(), 1)
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    return { start, end }
  }
  const start = getSaturday(now)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  return { start, end }
}

function getSaturday(date) {
  const d = new Date(date)
  const diff = (d.getDay() + 1) % 7
  d.setDate(d.getDate() - diff)
  d.setHours(0, 0, 0, 0)
  return d
}
</script>

<style scoped>
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thumb-gray-300::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 3px;
}

.scrollbar-thumb-gray-300::-webkit-scrollbar-track {
  background-color: #f3f4f6;
}
</style>
