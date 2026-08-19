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
                <i class="ri-calendar-line text-xs mr-1"></i>
                {{ weekRangeText }}
              </span>
            </div>
          </div>
        </div>

        <!-- Right - Week Navigation -->
        <div class="flex gap-2" v-if="!dateFilter || dateFilter === 'this_week'">
          <button
            @click="prevWeek"
            class="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors flex items-center gap-1 text-sm"
          >
            <i class="ri-arrow-left-s-line"></i>
            Previous Week
          </button>
          <button
            @click="nextWeek"
            class="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors flex items-center gap-1 text-sm"
          >
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

    <!-- ================= TABLE ================= -->
    <div class="bg-white rounded-xl shadow border overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse border border-gray-300">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                <div class="flex items-center gap-1">
                  <i class="ri-calendar-line"></i>
                  Day
                </div>
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                <div class="flex items-center gap-1">
                  <i class="ri-calendar-event-line"></i>
                  Date
                </div>
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                <div class="flex items-center gap-1">
                  <i class="ri-login-circle-line"></i>
                  Attendance
                </div>
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                <div class="flex items-center gap-1">
                  <i class="ri-briefcase-line"></i>
                  Department Name
                </div>
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                <div class="flex items-center gap-1">
                  <i class="ri-building-line"></i>
                  Account
                </div>
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                <div class="flex items-center gap-1">
                  <i class="ri-list-check"></i>
                  Task Type
                </div>
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                <div class="flex items-center gap-1">
                  <i class="ri-task-line"></i>
                  Task Name
                </div>
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                <div class="flex items-center gap-1">
                  <i class="ri-file-text-line"></i>
                  Description
                </div>
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                <div class="flex items-center gap-1">
                  <i class="ri-file-download-line"></i>
                  Output
                </div>
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                <div class="flex items-center gap-1">
                  <i class="ri-timer-line"></i>
                  Hours
                </div>
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                <div class="flex items-center gap-1">
                  <i class="ri-time-line"></i>
                  Total hour
                </div>
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                <div class="flex items-center gap-1">
                  <i class="ri-user-line"></i>
                  Employee
                </div>
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                <div class="flex items-center gap-1">
                  <i class="ri-user-star-line"></i>
                  Manager
                </div>
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                <div class="flex items-center gap-1">
                  <i class="ri-settings-3-line"></i>
                  HR
                </div>
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                <div class="flex items-center gap-1">
                  <i class="ri-edit-line"></i>
                  Action
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <!-- LOADING STATE -->
            <tr v-if="loading">
              <td colspan="15" class="px-4 py-8 border border-gray-300">
                <div class="flex flex-col items-center justify-center">
                  <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600 mb-4"></div>
                  <p class="text-sm text-gray-600">Loading attendance data...</p>
                </div>
              </td>
            </tr>

            <!-- DATA ROWS -->
            <template v-else>
              <template v-for="day in days" :key="day.date">
                <!-- If no attendance for this day -->
                <tr v-if="!attendanceByDate[day.date]" class="hover:bg-gray-50">
                  <td class="px-4 py-3 whitespace-nowrap border border-gray-300">
                    <div class="flex flex-col">
                      <span class="font-bold text-gray-900">{{ day.name }}</span>
                      <span class="text-xs text-gray-500">{{ formatDate(day.date) }}</span>
                    </div>
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap border border-gray-300">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {{ day.date }}
                    </span>
                  </td>
                  <td colspan="13" class="px-4 py-3 text-center text-gray-500 border border-gray-300">
                    No attendance data for this day
                  </td>
                </tr>

                <!-- If there's attendance data for this day -->
                <template v-else>
                  <!-- Show each time entry as separate row -->
                  <tr
                    v-for="(timeEntry, timeIndex) in attendanceByDate[day.date]?.times || []"
                    :key="`${day.date}-${timeEntry.id || timeIndex}`"
                    :class="{
                      'bg-yellow-50 hover:bg-yellow-100': attendanceByDate[day.date]?.status === '0',
                      'bg-blue-50 hover:bg-blue-100': attendanceByDate[day.date]?.status === '1',
                      'bg-orange-50 hover:bg-orange-100': attendanceByDate[day.date]?.status === '2',
                      'bg-green-50 hover:bg-green-100': attendanceByDate[day.date]?.status === '3',
                      'hover:bg-gray-50': true
                    }"
                  >
                    <!-- DAY (with rowspan) -->
                    <td
                      v-if="timeIndex === 0"
                      :rowspan="Math.max(1, attendanceByDate[day.date]?.times?.length || 0)"
                      class="px-4 py-3 whitespace-nowrap border border-gray-300"
                    >
                      <div class="flex flex-col">
                        <span class="font-bold text-gray-900">{{ day.name }}</span>
                        <span class="text-xs text-gray-500">{{ formatDate(day.date) }}</span>
                      </div>
                    </td>

                    <!-- DATE (with rowspan) -->
                    <td
                      v-if="timeIndex === 0"
                      :rowspan="Math.max(1, attendanceByDate[day.date]?.times?.length || 0)"
                      class="px-4 py-3 whitespace-nowrap border border-gray-300"
                    >
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {{ day.date }}
                      </span>
                    </td>

                    <!-- ATTENDANCE (with rowspan) -->
                    <td
                      v-if="timeIndex === 0"
                      :rowspan="Math.max(1, attendanceByDate[day.date]?.times?.length || 0)"
                      class="px-4 py-3 whitespace-nowrap border border-gray-300"
                    >
                      <div v-if="attendanceByDate[day.date]?.attendance_logs?.length" class="space-y-1">
                        <div class="flex items-center gap-2">
                          <div class="group relative">
                            <div class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 gap-1">
                              <i class="ri-login-box-line"></i>
                              {{ getFirstLoginTime(day.date) }}
                            </div>
                            <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                              <div class="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                                First login: {{ getFirstLoginTime(day.date) }}
                              </div>
                            </div>
                          </div>

                          <div class="group relative">
                            <div class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 gap-1">
                              <i class="ri-logout-box-line"></i>
                              {{ getLastLogoutTime(day.date) }}
                            </div>
                            <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                              <div class="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                                Last logout: {{ getLastLogoutTime(day.date) }}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="text-xs text-gray-500">
                          {{ attendanceByDate[day.date]?.attendance_logs?.length || 0 }} sessions
                        </div>
                      </div>
                      <div v-else>
                        <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          No attendance
                        </span>
                      </div>
                    </td>

                    <!-- DEPARTMENT NAME -->
                    <td class="px-4 py-3 whitespace-nowrap border border-gray-300">
                      <div v-if="editingId !== timeEntry.id" class="flex items-center gap-2">
                        <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                          {{ timeEntry.type_of_work || 'Not specified' }}
                        </span>
                      </div>
                      <input
                        v-else
                        v-model="editForm.type_of_work"
                        type="text"
                        class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Department Name"
                      />
                    </td>

                    <!-- ACCOUNT -->
                    <td class="px-4 py-3 whitespace-nowrap border border-gray-300">
                      <div v-if="timeEntry.account?.name" class="flex flex-col">
                        <span class="font-medium text-gray-900">{{ timeEntry.account.name }}</span>
                        <span v-if="timeEntry.notes" class="text-xs text-gray-500 truncate max-w-xs">
                          {{ timeEntry.notes }}
                        </span>
                      </div>
                      <span v-else class="text-gray-500">—</span>
                    </td>

                    <!-- TASK TYPE -->
                    <td class="px-4 py-3 whitespace-nowrap border border-gray-300">
                      <div v-if="editingId !== timeEntry.id">
                        <div v-if="timeEntry.activity" class="flex flex-col">
                          <span class="font-medium text-gray-900">{{ timeEntry.activity }}</span>
                        </div>
                        <span v-else class="text-gray-500">—</span>
                      </div>
                      <input
                        v-else
                        v-model="editForm.activity"
                        type="text"
                        class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Task Type"
                      />
                    </td>

                    <!-- TASK NAME -->
                    <td class="px-4 py-3 whitespace-nowrap border border-gray-300">
                      <span v-if="editingId !== timeEntry.id" class="font-medium text-gray-900">{{ timeEntry.task_name || '—' }}</span>
                      <input
                        v-else
                        v-model="editForm.task_name"
                        type="text"
                        class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Task Name"
                      />
                    </td>

                    <!-- DESCRIPTION -->
                    <td class="px-4 py-3 border border-gray-300">
                      <div v-if="editingId !== timeEntry.id">
                        <div v-if="timeEntry.description" class="text-sm text-gray-700 max-w-xs truncate" :title="timeEntry.description">
                          {{ timeEntry.description }}
                        </div>
                        <span v-else class="text-gray-500">—</span>
                      </div>
                      <textarea
                        v-else
                        v-model="editForm.description"
                        rows="2"
                        class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Description"
                      ></textarea>
                    </td>

                    <!-- OUTPUT -->
                    <td class="px-4 py-3 border border-gray-300">
                      <div v-if="editingId !== timeEntry.id">
                        <div v-if="timeEntry.output" class="text-sm text-gray-700 max-w-xs truncate" :title="timeEntry.output">
                          {{ timeEntry.output }}
                        </div>
                        <span v-else class="text-gray-500">—</span>
                      </div>
                      <textarea
                        v-else
                        v-model="editForm.output"
                        rows="2"
                        class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Output"
                      ></textarea>
                    </td>

                    <!-- HOURS -->
                    <td class="px-4 py-3 whitespace-nowrap border border-gray-300">
                      <div v-if="editingId !== timeEntry.id">
                        <div class="font-bold text-lg text-gray-900">
                          {{ timeEntry.total_hours || '0.00' }}
                        </div>
                        <div class="text-xs text-gray-500">
                          {{ timeEntry.total_minute || '0' }} minutes
                        </div>
                      </div>
                      <input
                        v-else
                        v-model="editForm.total_hours"
                        type="number"
                        step="0.01"
                        min="0"
                        class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Hours"
                      />
                    </td>

                    <!-- TOTAL HOUR (with rowspan) -->
                    <td
                      v-if="timeIndex === 0"
                      :rowspan="Math.max(1, attendanceByDate[day.date]?.times?.length || 0)"
                      class="px-4 py-3 whitespace-nowrap border border-gray-300"
                    >
                      <div class="font-bold text-lg text-gray-900">
                        {{ getTotalHoursForDay(day.date) }}
                      </div>
                      <div class="text-xs text-gray-500">
                        {{ getTotalMinutesForDay(day.date) }} minutes
                      </div>
                    </td>

                    <!-- EMPLOYEE (with rowspan) -->
                    <td
                      v-if="timeIndex === 0"
                      :rowspan="Math.max(1, attendanceByDate[day.date]?.times?.length || 0)"
                      class="px-4 py-3 whitespace-nowrap border border-gray-300"
                    >
                      <span :class="getEmployeeStatusClass(attendanceByDate[day.date]?.status)">
                        {{ getEmployeeStatus(attendanceByDate[day.date]?.status) }}
                      </span>
                    </td>

                    <!-- MANAGER (with rowspan) -->
                    <td
                      v-if="timeIndex === 0"
                      :rowspan="Math.max(1, attendanceByDate[day.date]?.times?.length || 0)"
                      class="px-4 py-3 whitespace-nowrap border border-gray-300"
                    >
                      <span :class="getManagerStatusClass(attendanceByDate[day.date]?.status)">
                        {{ getManagerStatus(attendanceByDate[day.date]?.status) }}
                      </span>
                    </td>

                    <!-- HR (with rowspan) -->
                    <td
                      v-if="timeIndex === 0"
                      :rowspan="Math.max(1, attendanceByDate[day.date]?.times?.length || 0)"
                      class="px-4 py-3 whitespace-nowrap border border-gray-300"
                    >
                      <div>
                        <!-- Always show Approve button if there's attendance data -->
                        <button
                          v-if="attendanceByDate[day.date]"
                          @click="confirmApprove(attendanceByDate[day.date])"
                          class="inline-flex items-center px-4 py-2 rounded text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          :disabled="approvingId === attendanceByDate[day.date]?.id || attendanceByDate[day.date]?.status === '3'"
                        >
                          <i v-if="approvingId !== attendanceByDate[day.date]?.id && attendanceByDate[day.date]?.status !== '3'"
                            class="ri-check-line mr-2"></i>
                          <i v-else-if="approvingId === attendanceByDate[day.date]?.id"
                            class="ri-loader-4-line animate-spin mr-2"></i>
                          <i v-else-if="attendanceByDate[day.date]?.status === '3'"
                            class="ri-check-double-line mr-2"></i>
                          {{ approvingId === attendanceByDate[day.date]?.id ? 'Approving...' :
                            attendanceByDate[day.date]?.status === '3' ? 'Approved' : 'Approve' }}
                        </button>

                        <!-- Show if no attendance data -->
                        <span v-else class="text-sm text-gray-500">No attendance</span>
                      </div>
                    </td>

                    <!-- ACTION -->
                    <td class="px-4 py-3 whitespace-nowrap border border-gray-300">
                      <div v-if="editingId !== timeEntry.id">
                        <button
                          @click="startEdit(timeEntry)"
                          class="inline-flex items-center px-3 py-1.5 rounded text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                          title="Edit"
                        >
                          <i class="ri-edit-line mr-1"></i>
                          Edit
                        </button>
                      </div>
                      <div v-else class="flex gap-1">
                        <button
                          @click="saveEdit(timeEntry, day.date)"
                          :disabled="updatingId === timeEntry.id"
                          class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50"
                          title="Save"
                        >
                          <i v-if="updatingId !== timeEntry.id" class="ri-save-line"></i>
                          <i v-else class="ri-loader-4-line animate-spin"></i>
                        </button>
                        <button
                          @click="cancelEdit"
                          :disabled="updatingId === timeEntry.id"
                          class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-600 text-white hover:bg-gray-700 transition-colors disabled:opacity-50"
                          title="Cancel"
                        >
                          <i class="ri-close-line"></i>
                        </button>
                      </div>
                    </td>
                  </tr>

                  <!-- If there are no time entries but there is attendance data -->
                  <tr
                    v-if="(!attendanceByDate[day.date]?.times || attendanceByDate[day.date]?.times.length === 0) && attendanceByDate[day.date]"
                    :class="{
                      'bg-yellow-50 hover:bg-yellow-100': attendanceByDate[day.date]?.status === '0',
                      'bg-blue-50 hover:bg-blue-100': attendanceByDate[day.date]?.status === '1',
                      'bg-orange-50 hover:bg-orange-100': attendanceByDate[day.date]?.status === '2',
                      'bg-green-50 hover:bg-green-100': attendanceByDate[day.date]?.status === '3',
                      'hover:bg-gray-50': true
                    }"
                  >
                    <td class="px-4 py-3 whitespace-nowrap border border-gray-300">
                      <div class="flex flex-col">
                        <span class="font-bold text-gray-900">{{ day.name }}</span>
                        <span class="text-xs text-gray-500">{{ formatDate(day.date) }}</span>
                      </div>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap border border-gray-300">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {{ day.date }}
                      </span>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap border border-gray-300">
                      <div v-if="attendanceByDate[day.date]?.attendance_logs?.length" class="space-y-1">
                        <div class="flex items-center gap-2">
                          <div class="group relative">
                            <div class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 gap-1">
                              <i class="ri-login-box-line"></i>
                              {{ getFirstLoginTime(day.date) }}
                            </div>
                          </div>
                          <div class="group relative">
                            <div class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 gap-1">
                              <i class="ri-logout-box-line"></i>
                              {{ getLastLogoutTime(day.date) }}
                            </div>
                          </div>
                        </div>
                        <div class="text-xs text-gray-500">
                          {{ attendanceByDate[day.date]?.attendance_logs?.length || 0 }} sessions
                        </div>
                      </div>
                      <div v-else>
                        <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          No attendance
                        </span>
                      </div>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-gray-500 border border-gray-300">—</td>
                    <td class="px-4 py-3 whitespace-nowrap text-gray-500 border border-gray-300">—</td>
                    <td class="px-4 py-3 whitespace-nowrap text-gray-500 border border-gray-300">—</td>
                    <td class="px-4 py-3 whitespace-nowrap text-gray-500 border border-gray-300">—</td>
                    <td class="px-4 py-3 whitespace-nowrap text-gray-500 border border-gray-300">—</td>
                    <td class="px-4 py-3 whitespace-nowrap text-gray-500 border border-gray-300">—</td>
                    <td class="px-4 py-3 whitespace-nowrap text-gray-500 border border-gray-300">—</td>
                    <td class="px-4 py-3 whitespace-nowrap border border-gray-300">
                      <div class="font-bold text-lg text-gray-900">
                        {{ getTotalHoursForDay(day.date) }}
                      </div>
                      <div class="text-xs text-gray-500">
                        {{ getTotalMinutesForDay(day.date) }} minutes
                      </div>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap border border-gray-300">
                      <span :class="getEmployeeStatusClass(attendanceByDate[day.date]?.status)">
                        {{ getEmployeeStatus(attendanceByDate[day.date]?.status) }}
                      </span>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap border border-gray-300">
                      <span :class="getManagerStatusClass(attendanceByDate[day.date]?.status)">
                        {{ getManagerStatus(attendanceByDate[day.date]?.status) }}
                      </span>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap border border-gray-300">
                      <div>
                        <button
                          @click="confirmApprove(attendanceByDate[day.date])"
                          class="inline-flex items-center px-4 py-2 rounded text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          :disabled="approvingId === attendanceByDate[day.date]?.id || attendanceByDate[day.date]?.status === '3'"
                        >
                          <i v-if="approvingId !== attendanceByDate[day.date]?.id && attendanceByDate[day.date]?.status !== '3'"
                            class="ri-check-line mr-2"></i>
                          <i v-else-if="approvingId === attendanceByDate[day.date]?.id"
                            class="ri-loader-4-line animate-spin mr-2"></i>
                          <i v-else-if="attendanceByDate[day.date]?.status === '3'"
                            class="ri-check-double-line mr-2"></i>
                          {{ approvingId === attendanceByDate[day.date]?.id ? 'Approving...' :
                            attendanceByDate[day.date]?.status === '3' ? 'Approved' : 'Approve' }}
                        </button>
                      </div>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap border border-gray-300">
                      <span class="text-gray-500">—</span>
                    </td>
                  </tr>
                </template>
              </template>

              <!-- EMPTY STATE -->
              <tr v-if="!loading && Object.keys(attendanceByDate).length === 0">
                <td colspan="15" class="px-4 py-12 text-center border border-gray-300">
                  <div class="flex flex-col items-center justify-center">
                    <i class="ri-inbox-line text-4xl text-gray-400 mb-4"></i>
                    <p class="text-lg font-medium text-gray-900 mb-2">No attendance records found</p>
                    <p class="text-sm text-gray-500 mb-4">No attendance data available for this week</p>
                    <button @click="loadDataForWeek" class="inline-flex items-center px-4 py-2 rounded text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors">
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
import api from '@/config/api'

/* ================= ROUTE & PARAMS ================= */
const route = useRoute()
const userId = ref(route.params.id)
const employeeName = ref(route.query.name || '')
const dateFilter = ref(route.query.date_filter || null)

/* ================= STATE ================= */
const weekStart = ref(getInitialDateRange())
const dateRange = ref(getDateRangeFromFilter())
const attendanceByDate = ref({})
const approvingId = ref(null)
const loading = ref(true)
const editingId = ref(null)
const editForm = ref({})
const updatingId = ref(null)

/* ================= DATE RANGE HELPERS ================= */
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
  // Default: current week
  const start = getSaturday(now)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  return { start, end }
}

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

/* ================= DATE HELPERS ================= */
function getSaturday(date) {
  const d = new Date(date)
  const diff = (d.getDay() + 1) % 7
  d.setDate(d.getDate() - diff)
  d.setHours(0, 0, 0, 0)
  return d
}

const prevWeek = () => {
  const newDate = new Date(weekStart.value)
  newDate.setDate(newDate.getDate() - 7)
  weekStart.value = newDate
  // Update dateRange if using this_week filter
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
  // Update dateRange if using this_week filter
  if (dateFilter.value === 'this_week' || !dateFilter.value) {
    dateRange.value = {
      start: new Date(newDate),
      end: new Date(newDate)
    }
    dateRange.value.end.setDate(dateRange.value.end.getDate() + 6)
  }
  loadDataForWeek()
}

const formatDate = (date) => {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

/* ================= STATUS HELPERS ================= */
const getStatusText = (status) => {
  switch (status) {
    case '0':
      return 'Pending'
    case '1':
      return 'Employee Approved'
    case '2':
      return 'Manager Approved'
    case '3':
      return 'HR Approval'
    default:
      return 'No Data'
  }
}

const getStatusTooltip = (status) => {
  switch (status) {
    case '0': return 'Awaiting employee submission'
    case '1': return 'Submitted by employee, awaiting manager approval'
    case '2': return 'Approved by manager'
    case '3': return 'Approved by HR'
    default: return 'No attendance data'
  }
}

const getStatusBadgeClass = (status) => {
  switch (status) {
    case '0':
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800'
    case '1':
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'
    case '2':
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800'
    case '3':
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'
    default:
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800'
  }
}

const getEmployeeStatus = (status) => {
  if (status === '0') return 'Pending'
  if (status === '1' || status === '2' || status === '3') return 'Approved'
  return 'Pending'
}

const getManagerStatus = (status) => {
  if (status === '0' || status === '1') return 'Pending'
  if (status === '2' || status === '3') return 'Approved'
  return 'Pending'
}

const getEmployeeStatusClass = (status) => {
  const empStatus = getEmployeeStatus(status)
  return empStatus === 'Approved'
    ? 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'
    : 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800'
}

const getManagerStatusClass = (status) => {
  const mgrStatus = getManagerStatus(status)
  return mgrStatus === 'Approved'
    ? 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'
    : 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800'
}

/* ================= ATTENDANCE HELPERS ================= */
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

const getTotalHoursForDay = (date) => {
  const attendance = attendanceByDate.value[date]
  if (!attendance?.times || !Array.isArray(attendance.times)) return '0.00'

  const total = attendance.times.reduce((sum, timeEntry) => {
    return sum + parseFloat(timeEntry.total_hours || 0)
  }, 0)

  return total.toFixed(2)
}

const getTotalMinutesForDay = (date) => {
  const attendance = attendanceByDate.value[date]
  if (!attendance?.times || !Array.isArray(attendance.times)) return '0'

  const total = attendance.times.reduce((sum, timeEntry) => {
    return sum + parseInt(timeEntry.total_minute || 0)
  }, 0)

  return total.toString()
}

/* ================= EDIT FUNCTIONS ================= */
const startEdit = (timeEntry) => {
  editingId.value = timeEntry.id
  editForm.value = {
    type_of_work: timeEntry.type_of_work || '',
    activity: timeEntry.activity || '',
    task_name: timeEntry.task_name || '',
    description: timeEntry.description || '',
    output: timeEntry.output || '',
    total_hours: timeEntry.total_hours || '0.00'
  }
}

const cancelEdit = () => {
  editingId.value = null
  editForm.value = {}
}

const saveEdit = async (timeEntry, date) => {
  try {
    updatingId.value = timeEntry.id

    // Get the attendance record
    const attendance = attendanceByDate.value[date]
    if (!attendance) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Attendance record not found',
      })
      return
    }

    // Find the time entry index
    const timeIndex = attendance.times.findIndex(t => t.id === timeEntry.id)
    if (timeIndex === -1) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Time entry not found',
      })
      return
    }

    // Calculate total_minute from total_hours
    const totalHours = parseFloat(editForm.value.total_hours || 0)
    const totalMinutes = Math.round(totalHours * 60)

    // Update the time entry in the times array
    const updatedTimes = [...attendance.times]
    updatedTimes[timeIndex] = {
      ...updatedTimes[timeIndex],
      type_of_work: editForm.value.type_of_work || updatedTimes[timeIndex].type_of_work,
      activity: editForm.value.activity || updatedTimes[timeIndex].activity,
      task_name: editForm.value.task_name || updatedTimes[timeIndex].task_name,
      description: editForm.value.description || updatedTimes[timeIndex].description,
      output: editForm.value.output || updatedTimes[timeIndex].output,
      total_hours: totalHours.toFixed(2),
      total_minute: totalMinutes.toString()
    }

    // Update the attendance record via API
    const { data } = await api().post(`attendance/${attendance.id}`, {
      _method: 'PUT',
      date: attendance.date,
      user_id: attendance.user_id,
      status: attendance.status,
      times: updatedTimes.map(t => ({
        id: t.id,
        type_of_work: t.type_of_work,
        activity: t.activity,
        task_name: t.task_name,
        description: t.description,
        output: t.output,
        total_hours: t.total_hours,
        total_minute: t.total_minute,
        account_id: t.account?.id || null,
        notes: t.notes || null,
        status: t.status || '0'
      }))
    })

    if (data.status || data) {
      // Reload the attendance data
      await loadAttendanceForWeek()

      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Time entry has been updated successfully',
        timer: 2000,
        showConfirmButton: false
      })

      editingId.value = null
      editForm.value = {}
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update time entry',
      })
    }
  } catch (error) {
    console.error('Error updating time entry:', error)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response?.data?.message || 'Failed to update time entry',
    })
  } finally {
    updatingId.value = null
  }
}

/* ================= API FUNCTIONS ================= */
const loadAttendanceForWeek = async () => {
  loading.value = true
  attendanceByDate.value = {}

  for (const day of days.value) {
    try {
      const res = await api().get(`/attendance?user_id=${userId.value}&date=${day.date}`)

      if (res.data.data.length > 0) {
        const attendance = res.data.data[0]
        // Set employee name from first response
        if (attendance.user?.name && !employeeName.value) {
          employeeName.value = attendance.user.name
        }
        attendanceByDate.value[day.date] = attendance
      }
    } catch (error) {
      console.error(`Error loading attendance for ${day.date}:`, error)
    }
  }

  loading.value = false
}

// Approve function - sets status to 3 (HR Approval)
const approveAttendance = async (attendance) => {
  try {
    approvingId.value = attendance.id

    const { data } = await api().post(`attendance/${attendance.id}`, {
      _method: 'PUT',
      status: 3, // HR Approval
      date: attendance.date,
      user_id: attendance.user_id
    })

    if (data.status) {
      // Update the attendance status in local data
      attendanceByDate.value[attendance.date].status = '3'

      Swal.fire({
        icon: 'success',
        title: 'Approved!',
        text: 'Attendance has been approved by HR',
        timer: 2000,
        showConfirmButton: false
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to approve attendance',
      })
    }
  } catch (error) {
    console.error('Error approving attendance:', error)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to approve attendance. Please try again.',
    })
  } finally {
    approvingId.value = null
  }
}

/* ================= CONFIRMATION DIALOG ================= */
const confirmApprove = (attendance) => {
  const currentStatus = getStatusText(attendance.status)

  Swal.fire({
    title: 'Approve Attendance?',
    html: `
      <div class="text-left">
        <p>Approve attendance for <strong>${formatDate(attendance.date)}</strong>?</p>
        <p class="text-sm text-gray-600 mt-2">Current status: <span class="${getStatusBadgeClass(attendance.status)}">${currentStatus}</span></p>
        <p class="text-sm text-gray-600">This will change status to <strong>HR Approval</strong>.</p>
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

const loadDataForWeek = () => {
  loadAttendanceForWeek()
}

/* ================= WATCHERS ================= */
// Watch for route parameter changes (user ID)
watch(() => route.params.id, (newId) => {
  if (newId) {
    const oldId = userId.value
    userId.value = newId

    // Only reload if the user ID actually changed
    if (oldId !== newId) {
      employeeName.value = route.query.name || ''
      attendanceByDate.value = {} // Clear previous data
      loading.value = true
      loadDataForWeek()
    }
  }
}, { immediate: false })

// Watch for route query changes (date_filter)
watch(() => route.query.date_filter, (newFilter) => {
  dateFilter.value = newFilter || null
  weekStart.value = getInitialDateRange()
  dateRange.value = getDateRangeFromFilter()
  loadDataForWeek()
}, { immediate: false })

// Watch for employee name changes in query
watch(() => route.query.name, (newName) => {
  if (newName) {
    employeeName.value = newName
  }
}, { immediate: false })

/* ================= INIT ================= */
onMounted(() => {
  if (!userId.value) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No user ID provided',
    })
    return
  }

  loadDataForWeek()
})
</script>
