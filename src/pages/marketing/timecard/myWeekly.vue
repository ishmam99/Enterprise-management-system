<template>
  <div class="w-11/12 mx-auto pt-6 px-10 space-y-4 min-h-screen">
    <!-- HEADER -->
    <div
      class="bg-gradient-to-r from-cyan-500 to-sky-500 rounded-2xl px-6 py-2 shadow flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow">
          ⏱️
        </div>
        <div>
          <h2 class="text-2xl font-semibold text-white">Sales Timecard Entry</h2>
          <p class="text-sm text-cyan-100">Today: {{ todayFormatted }}</p>
        </div>
      </div>

      <div class="flex items-center bg-white/20 p-1 rounded-xl backdrop-blur-sm border border-white/30">
        <button @click="prevWeek" class="px-3 py-1 border text-white hover:bg-white/20 rounded-lg transition">
          ◀ Prev
        </button>

        <button @click="jumpToCurrent"
          class="px-4 py-1 text-white font-bold min-w-[180px] hover:bg-white/10 rounded-lg">
          {{ weekRangeLabel }}
        </button>

        <button @click="nextWeek" class="px-3 py-1 border text-white hover:bg-white/20 rounded-lg transition">
          Next ▶
        </button>
      </div>
    </div>
    <!-- {{ timesByDate }} -->
    <!-- TABLE -->
    <div class="w-full overflow-x-auto overflow-y-hidden">
      <table class="min-w-max border-collapse text-xs">
        <!-- GROUP HEADER -->
        <thead>
          <tr class="text-center font-bold">
            <th colspan="4" class="border p-2 bg-blue-50">Login / Logout</th>
            <th colspan="9" class="border p-2 bg-green-50">Task / Work Entry</th>
            <th colspan="3" class="border p-2 bg-purple-50">Approval</th>
          </tr>

          <!-- COLUMN HEADER -->
          <tr>
            <th class="border p-2 bg-blue-50">Day</th>
            <th class="border p-2 bg-blue-50">Date</th>
            <th class="border p-2 bg-blue-50">Login / Logout</th>
            <th class="border p-2 bg-blue-50 text-nowrap">Total Login <br> Time</th>

            <th class="border p-2 bg-green-50">Department</th>
            <th class="border p-2 bg-green-50">Account</th>
            <th class="border p-2 bg-green-50">Task Type</th>
            <th class="border p-2 bg-green-50">Task Name</th>
            <th class="border p-2 bg-green-50">Description</th>
            <th class="border p-2 bg-green-50">Output</th>
            <th class="border p-2 bg-green-50">Hours</th>
            <th class="border p-2 bg-green-50">Minutes</th>
            <th class="border p-2 bg-green-50">Save</th>

            <th class="border p-2 bg-purple-50">Employee</th>
            <th class="border p-2 bg-purple-50">Manager</th>
            <th class="border p-2 bg-purple-50">HR</th>
          </tr>
        </thead>

        <tbody>
          <template v-for="day in days" :key="day.date">
            <tr v-for="(entry, index) in entriesByDate[day.date] || [{}]" :key="index"
              :class="!isToday(day.date) ? 'opacity-50 pointer-events-none' : '' || todayRingClass(day.date)">
              <!-- DAY -->
              <td v-if="index === 0" :rowspan="entriesByDate[day.date]?.length || 1" class="border p-2 font-semibold">
                {{ day.name }}
              </td>

              <!-- DATE -->
              <td v-if="index === 0" :rowspan="entriesByDate[day.date]?.length || 1" class="border p-2 w-22">
                {{ day.date }}
              </td>

              <!-- LOGIN / LOGOUT -->
              <td v-if="index === 0" :rowspan="entriesByDate[day.date]?.length || 1" class="border p-2 space-y-2 w-32">
                <span class="text-center flex flex-col items-center text-xs text-red-600"
                  v-if="!(attendanceByDate[day.date]?.length)">
                  Absent
                </span>

                <div v-for="log in attendanceByDate[day.date] || []" :key="log.login_time"
                  class="text-center flex flex-col items-center text-xs">
                  <span class="text-green-600">Login: {{ formatTo12Hour(log.login_time) }}</span>
                  <span class="text-red-600">Logout: {{ formatTo12Hour(log.logout_time) }}</span>
                </div>
              </td>
              <td v-if="index === 0" :rowspan="entriesByDate[day.date]?.length || 1" class="border p-2 text-center">
                <div class="font-semibold">
                  {{ getTotalLoginTime(day.date).hours }} h
                  {{ getTotalLoginTime(day.date).minutes.toString().padStart(2, '0') }} m
                </div>
              </td>


              <!-- TASK / WORK ENTRY (API DATA + INPUTS) -->
              <td class="border p-1 w-10">
                <!-- SAVED TIMES (API DATA) -->
                <div v-if="timesByDate[day.date]?.length" class="space-y-1 mb-2 ">
                  <div v-for="(t, i) in timesByDate[day.date]" :key="i" class="  gap-1 bg-gray-50 p-1 rounded">
                    <div class="border rounded truncate ">{{ t.type_of_work }}</div>


                    <!-- <div class="text-center text-green-600 font-semibold">Saved</div> -->
                  </div>


                </div>
                <div :class="timesByDate[day.date]?.length == 0 ? 'py-0' : 'py-7'"></div>
                <!-- INPUT ROW (UNCHANGED LOGIC) -->
                <div class="  gap-1">
                  <!-- WORK TYPE -->
                  <select v-model="getRowForm(day.date).workTypeId" class="w-full border rounded text-xs px-2 py-1"
                    :disabled="!isToday(day.date)">
                    <option value="" selected disabled>Select Dept.</option>
                    <option v-for="w in workTypes" :key="w.id" :value="w.id">
                      {{ w.name }}
                    </option>
                  </select>

                </div>


              </td>

              <td class="border p-1">
                <!-- SAVED TIMES (API DATA) -->
                <div v-if="timesByDate[day.date]?.length" class="space-y-1 mb-2 ">
                  <div v-for="(t, i) in timesByDate[day.date]" :key="i" class="grid  gap-1 bg-gray-50 p-1 rounded">
                    <div class="truncate border rounded">{{ t.account?.name || '—' }}</div>


                    <!-- <div class="text-center text-green-600 font-semibold">Saved</div> -->
                  </div>


                </div>
                <div :class="timesByDate[day.date]?.length == 0 ? 'py-0' : 'py-7'"></div>
                <!-- INPUT ROW (UNCHANGED LOGIC) -->
                <div class="grid  gap-1">

                  <!-- ACCOUNT -->
                  <select v-model="getRowForm(day.date).record_id" class="w-full border rounded text-xs px-2 py-1"
                    :disabled="!isToday(day.date)">
                    <option value="" selected disabled>Select Account</option>
                    <option v-for="r in recordList" :key="r.id" :value="r.id">
                      {{r.values?.find((v) => v.field?.label === 'Company Name')?.value}}
                    </option>
                  </select>


                </div>
              </td>

              <!-- TASK / WORK ENTRY (API DATA + INPUTS) -->
              <td class="border p-1">
                <!-- SAVED TIMES (API DATA) -->
                <div v-if="timesByDate[day.date]?.length" class="space-y-1 mb-2 ">
                  <div v-for="(t, i) in timesByDate[day.date]" :key="i" class=" gap-1 bg-gray-50 p-1 rounded">
                    <div class="border rounded truncate ">{{ t?.activity || '—' }}</div>


                    <!-- <div class="text-center text-green-600 font-semibold">Saved</div> -->
                  </div>


                </div>
                <div :class="timesByDate[day.date]?.length == 0 ? 'py-0' : 'py-7'"></div>
                <!-- INPUT ROW (UNCHANGED LOGIC) -->
                <div class=" gap-1">

                  <!-- ACTIVITY -->
                  <select v-model="getRowForm(day.date).activity" class="w-full border rounded px-2 py-1 text-xs"
                    :disabled="!isToday(day.date)">
                    <option value="" selected disabled>Select Task Type</option>
                    <option v-for="a in selectedWorkType(day.date)?.activities || []" :key="a">
                      {{ a }}
                    </option>
                  </select>


                </div>
              </td>

              <!-- TASK / WORK ENTRY (API DATA + INPUTS) -->
              <td class="border p-1">
                <!-- SAVED TIMES (API DATA) -->
                <div v-if="timesByDate[day.date]?.length" class="space-y-1 mb-2 ">
                  <div v-for="(t, i) in timesByDate[day.date]" :key="i" class="gap-1 bg-gray-50 p-1 rounded">

                    <div class="border rounded truncate ">{{ t?.task_name || '—' }}</div>


                    <!-- <div class="text-center text-green-600 font-semibold">Saved</div> -->
                  </div>


                </div>
                <div :class="timesByDate[day.date]?.length == 0 ? 'py-0' : 'py-7'"></div>
                <!-- INPUT ROW (UNCHANGED LOGIC) -->
                <div class=" gap-1">


                  <!-- HOURS -->
                  <input type="text" placeholder="task name" v-model="getRowForm(day.date).task_name"
                    class="w-full border rounded px-2 py-1 text-center text-xs" :disabled="!isToday(day.date)" />



                </div>
              </td>

              <!-- TASK / WORK ENTRY (API DATA + INPUTS) -->
              <td class="border p-1">
                <!-- SAVED TIMES (API DATA) -->
                <div v-if="timesByDate[day.date]?.length" class="space-y-1 mb-2 ">
                  <div v-for="(t, i) in timesByDate[day.date]" :key="i" class=" gap-1 bg-gray-50 p-1 rounded">

                    <div class="border rounded truncate ">{{ t?.description || '—' }}</div>


                    <!-- <div class="text-center text-green-600 font-semibold">Saved</div> -->
                  </div>

                </div>
                <div :class="timesByDate[day.date]?.length == 0 ? 'py-0' : 'py-7'"></div>
                <!-- INPUT ROW (UNCHANGED LOGIC) -->
                <div class=" gap-1">

                  <!-- Description -->
                  <input type="text" rows="2" placeholder="description" v-model="getRowForm(day.date).description"
                    class="w-full border rounded px-2 py-1 text-center text-xs" :disabled="!isToday(day.date)">


                </div>
              </td>

              <!-- TASK / WORK ENTRY (API DATA + INPUTS) -->
              <td class="border p-1">
                <!-- SAVED TIMES (API DATA) -->
                <div v-if="timesByDate[day.date]?.length" class="space-y-1 mb-2">
                  <div v-for="(t, i) in timesByDate[day.date]" :key="i" class=" gap-1 bg-gray-50 p-1 rounded">

                    <div class="border rounded truncate ">{{ t?.output || '—' }}</div>

                    <!-- <div class="text-center text-green-600 font-semibold">Saved</div> -->
                  </div>

                </div>
                <div :class="timesByDate[day.date]?.length == 0 ? 'py-0' : 'py-7'"></div>
                <!-- INPUT ROW (UNCHANGED LOGIC) -->
                <div class=" gap-1">

                  <!-- Output -->
                  <input type="text" placeholder="output" v-model="getRowForm(day.date).output"
                    class="w-full border rounded px-2 py-1 text-center text-xs" :disabled="!isToday(day.date)" />

                </div>
              </td>

              <!-- TASK / WORK ENTRY (API DATA + INPUTS) -->
              <td class="border p-1" colspan="2">
                <!-- SAVED TIMES (API DATA) -->
                <div v-if="timesByDate[day.date]?.length" class="space-y-1 mb-2 ">
                  <div v-for="(t, i) in timesByDate[day.date]" :key="i"
                    class="grid grid-cols-2 gap-1 bg-gray-50 p-1 rounded">

                    <!-- HOURS -->
                    <div class="text-center border rounded flex items-center justify-center">
                      {{ parseHourMinute(t.total_hours).hours }} Hours
                    </div>

                    <!-- MINUTES -->
                    <div class="text-center border rounded flex items-center justify-center">
                      {{ parseHourMinute(t.total_hours).minutes.toString().padStart(2, '0') }}
                      Minutes
                    </div>

                    <!-- <div class="text-center text-green-600 font-semibold">Saved</div> -->
                  </div>

                  <!-- TOTAL -->
                  <div class="w-full flex items-center justify-center">Total</div>

                  <div class="grid grid-cols-2 gap-1 bg-red-100 p-1 rounded font-semibold]">
                    <div class="col-span-6 text-right"></div>
                    <div class="text-center border border-red-600 rounded">
                      {{ totalTimeByDate[day.date]?.hours || 0 }} Hours
                    </div>
                    <div class="text-center border border-red-600 rounded">
                      {{ totalTimeByDate[day.date]?.minutes?.toString().padStart(2, '0') || '00' }}
                      Minutes
                    </div>
                    <div></div>
                  </div>
                </div>

                <!-- INPUT ROW (UNCHANGED LOGIC) -->
                <div class="grid grid-cols-2 gap-1">

                  <!-- HOURS -->
                  <input type="number" min="0" placeholder="hours" v-model="getRowForm(day.date).hours"
                    class="w-full border rounded px-2 py-1 text-center text-xs" :disabled="!isToday(day.date)" />

                  <!-- MINUTES -->
                  <input type="number" min="0" max="59" placeholder="minutes" v-model="getRowForm(day.date).minutes"
                    class="w-full border rounded px-2 py-1 text-center text-xs" :disabled="!isToday(day.date)" />

                </div>
              </td>

              <!-- TASK / WORK ENTRY (API DATA + INPUTS) -->
              <td class="border p-1">

                <div class=" gap-1 w-[100px]">
                  <!-- SAVE -->
                  <button
                    class="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded disabled:opacity-50 w-full"
                    :disabled="!isToday(day.date) || attendanceLoading || saveLoadingByDate[day.date]
                      " @click="submitEntry(day.date)">
                    <span v-if="saveLoadingByDate[day.date]">Saving...</span>
                    <span v-else>Save</span>
                  </button>
                </div>
              </td>


              <!-- APPROVALS -->
              <!-- EMPLOYEE -->
              <td class="border text-center">
                <div class="flex flex-col items-center justify-around gap-1">
                  <span>
                    {{
                      getDayApprovals(entriesByDate[day.date]?.[0])?.employee ? 'Approved' : 'Pending'
                    }}
                  </span>

                  <!-- Approve button -->
                  <button v-if="
                    entriesByDate[day.date]?.[0]?.id && entriesByDate[day.date][0].status === '0'
                  " class="bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 rounded text-xs"
                    :disabled="attendanceLoadingById[entriesByDate[day.date][0].id]"
                    @click="approveEmployee(entriesByDate[day.date][0])">
                    <span v-if="attendanceLoadingById[entriesByDate[day.date][0].id]">Approving...</span>
                    <span v-else>Approve</span>
                  </button>
                </div>
              </td>

              <!-- MANAGER -->
              <td class="border text-center">
                {{ getDayApprovals(entriesByDate[day.date]?.[0])?.manager ? 'Approved' : 'Pending' }}
              </td>

              <!-- HR -->
              <td class="border text-center">
                {{ getDayApprovals(entriesByDate[day.date]?.[0])?.hr ? 'Approved' : 'Pending' }}
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import api from '@/config/api'
import { useAuthStore } from '@/stores/AuthStore'
import Swal from 'sweetalert2'

/* ================= STATE ================= */
const authStore = useAuthStore()
const saveLoadingByDate = reactive({})
const attendanceLoading = ref(true)
const loginLoading = reactive({})
const attendanceLoadingById = reactive({})

const todayISO = new Date().toISOString().split('T')[0]
// Master key: Set to true so user can edit any day in the range
const isToday = (date) => true

const entries = ref([])
const attendanceByDate = ref({})
const timesByDate = ref({})
const isLoggedInByDate = reactive({})
const recordList = ref([])
const rowForms = reactive({})

/* ================= WORK TYPES ================= */
const workTypes = [
  { id: 1, accountSelect: true, name: 'Account Work', activities: ['Engineering Service', 'Business Development', 'Client Communication', 'Email Communication', 'Sales Process', 'Lead Follow-up', 'Account Review', 'Training Service', 'Technical Support', 'Marketing Support', 'Customer Success / Renewal'] },
  { id: 2, accountSelect: false, name: 'Accounting', activities: ['Salary Processing', 'Payroll Review', 'General Accounting'] },
  { id: 3, accountSelect: false, name: 'Finance', activities: ['Tax', 'Budget Planning', 'Cash Flow Management', 'Compliance & Audit Support'] },
  { id: 4, accountSelect: false, name: 'HR', activities: ['Hiring / Recruitment', 'Interview Coordination', 'Onboarding', 'Employee Management', 'Attendance & Leave Management', 'Performance Review', 'HR Documentation'] },
  { id: 5, accountSelect: false, name: 'Executive Meeting', activities: ['Weekly Plan Meeting', 'Weekly Delivery Meeting', 'Strategy Meeting', 'Management Review'] },
  { id: 6, accountSelect: false, name: 'MS Office Work', activities: ['Word', 'Excel', 'PowerPoint'] }
]

/* ================= DYNAMIC WEEK NAVIGATION ================= */
function getSaturday(date) {
  const d = new Date(date)
  const diff = (d.getDay() + 1) % 7
  d.setDate(d.getDate() - diff)
  d.setHours(0, 0, 0, 0)
  return d
}
// Default to LAST WEEK: Get this Saturday, then subtract 7 days
const initialDate = getSaturday(new Date())
initialDate.setDate(initialDate.getDate() - 7)
const currentWeekStart = ref(initialDate)

const nextWeek = () => {
  currentWeekStart.value = new Date(currentWeekStart.value.setDate(currentWeekStart.value.getDate() + 7))
  loadAttendanceForWeek()
}

const prevWeek = () => {
  currentWeekStart.value = new Date(currentWeekStart.value.setDate(currentWeekStart.value.getDate() - 7))
  loadAttendanceForWeek()
}

const jumpToCurrent = () => {
  currentWeekStart.value = getSaturday(new Date())
  loadAttendanceForWeek()
}

const getTotalLoginTime = (date) => {
  const logs = attendanceByDate.value[date] || []

  let totalMinutes = 0

  logs.forEach(log => {
    if (!log.login_time || !log.logout_time || log.logout_time === '-') return

    const login = new Date(`1970-01-01T${log.login_time}`)
    const logout = new Date(`1970-01-01T${log.logout_time}`)

    if (logout > login) {
      totalMinutes += (logout - login) / 60000
    }
  })

  const hours = Math.floor(totalMinutes / 60)
  const minutes = Math.round(totalMinutes % 60)

  return { hours, minutes }
}

const weekDays = computed(() =>
  Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(currentWeekStart.value)
    d.setDate(d.getDate() + i)
    return {
      date: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'long' })
    }
  })
)

const weekRangeLabel = computed(() => {
  const start = currentWeekStart.value
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  const options = { month: 'short', day: 'numeric' }
  return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}, ${end.getFullYear()}`
})

const days = computed(() => weekDays.value.map(d => ({ date: d.date, name: d.dayName })))

/* ================= DATA FETCHING (OPTIMIZED) ================= */
const loadRecords = async () => {
  const res = await api().get('crm/modules/2/records')
  recordList.value = res.data.data
}

const processAttendanceResponse = (date, data) => {
  if (data && data.length) {
    const attendance = data[0]
    attendanceByDate.value[date] = attendance.attendance_logs.map(log => ({
      login_time: log.login_time.split(' ')[1],
      logout_time: log.logout_time ? log.logout_time.split(' ')[1] : '-'
    }))

    const lastLog = attendance.attendance_logs[attendance.attendance_logs.length - 1]
    if (lastLog && !lastLog.logout_time) {
      isLoggedInByDate[date] = true
      // Only sync global IDs if it's the actual current day
      if (date === new Date().toISOString().split('T')[0]) {
        authStore.attendance_info_id = attendance.id
        authStore.login_id = attendance.id
      }
    } else {
      isLoggedInByDate[date] = false
    }
    timesByDate.value[date] = attendance.times || []
    entries.value = entries.value.filter(e => e.date !== date)
    entries.value.push(attendance)
  } else {
    attendanceByDate.value[date] = []
    timesByDate.value[date] = []
    isLoggedInByDate[date] = false
    entries.value = entries.value.filter(e => e.date !== date)
    entries.value.push({ date: date, id: null, status: '0', times: [] })
  }
}

const loadAttendanceForWeek = async () => {
  attendanceLoading.value = true
  try {
    const today = new Date().toISOString().split('T')[0]
    const hasToday = weekDays.value.some(d => d.date === today)
    let otherDays = [...weekDays.value]

    if (hasToday) {
      // Fetch Today first for perceived speed
      const todayRes = await api().get(`/attendance?user_id=${authStore.user.id}&date=${today}`)
      processAttendanceResponse(today, todayRes.data.data)
      otherDays = weekDays.value.filter(day => day.date !== today)
    }

    // Fetch the rest in parallel
    await Promise.all(otherDays.map(async (day) => {
      const res = await api().get(`/attendance?user_id=${authStore.user.id}&date=${day.date}`)
      processAttendanceResponse(day.date, res.data.data)
    }))
  } catch (error) {
    console.error('Fetch error:', error)
  } finally {
    attendanceLoading.value = false
  }
}

/* ================= ACTIONS ================= */
const getRowForm = (date) => {
  if (!rowForms[date]) {
    rowForms[date] = { date, workTypeId: '', record_id: '', activity: '', hours: '', minutes: '', status: 0 }
  }
  return rowForms[date]
}

const selectedWorkType = (date) => {
  const f = getRowForm(date)
  return workTypes.find((w) => w.id == f.workTypeId)
}

const submitEntry = async (date) => {
  if (saveLoadingByDate[date]) return

  // Find the attendance ID for this specific date from our entries list
  const dayEntry = entries.value.find(e => e.date === date);
  const currentAttendanceId = dayEntry?.id;

  if (!currentAttendanceId) {
    Swal.fire({
      icon: 'error',
      title: 'Login required',
      text: 'No active attendance record found for this date. Please Login first.'
    })
    return
  }

  saveLoadingByDate[date] = true
  const f = getRowForm(date)

  try {
    await api().post('/attendance-time', {
      attendance_id: currentAttendanceId, // Using ID from API
      type_of_work: selectedWorkType(date)?.name || '',
      record_id: f.record_id || null,
      activity: f.activity,
      hour: f.hours || 0,
      minute: f.minutes || 0,
      task_name: f.task_name,
      description: f.description,
      output: f.output,
      status: 0
    })

    // ... reset form logic ...
    rowForms[date] = {
      date, workTypeId: '', record_id: '', activity: '',
      hours: '', minutes: '', task_name: '', description: '', output: '', status: 0
    }

    Swal.fire({ icon: 'success', title: 'Saved', timer: 1200, showConfirmButton: false })
    await loadAttendanceForWeek()
  } finally {
    saveLoadingByDate[date] = false
  }
}

const toggleLogin = async (date) => {
  if (loginLoading[date]) return
  loginLoading[date] = true
  try {
    const time = new Date().toLocaleTimeString('en-GB')
    if (!isLoggedInByDate[date]) {
      const res = await api().post('/attendance/login', { date, login_time: time })
      isLoggedInByDate[date] = true
      authStore.attendance_info_id = res.data.attendance_info_id
      authStore.login_id = res.data.attendance_id
    } else {
      await api().post(`/attendance/logout/${authStore.attendance_info_id}`, { logout_time: time })
      isLoggedInByDate[date] = false
      authStore.attendance_info_id = null
    }
    await loadAttendanceForWeek()
  } catch (e) {
    console.error(e)
  } finally {
    loginLoading[date] = false
  }
}

const formatTo12Hour = (time) => {
  if (!time || time === '-') return time
  const [hours, minutes] = time.split(':')
  const h = parseInt(hours)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 || 12
  return `${h12.toString().padStart(2, '0')}:${minutes} ${ampm}`
}

const approveEmployee = async (attendance) => {
  if (!attendance?.id) return
  const id = attendance.id
  attendanceLoadingById[id] = true
  try {
    await api().post(`status-update-attendance/${id}`, { _method: 'PUT', status: 1 })
    attendance.status = '1'
  } catch (err) {
    console.error(err)
  } finally {
    attendanceLoadingById[id] = false
  }
}

/* ================= COMPUTED ================= */
const entriesByDate = computed(() => {
  const start = currentWeekStart.value
  const end = new Date(start); end.setDate(start.getDate() + 6)
  return entries.value.reduce((acc, e) => {
    const d = new Date(e.date)
    if (d >= start && d <= end) {
      if (!acc[e.date]) acc[e.date] = []
      acc[e.date].push(e)
    }
    return acc
  }, {})
})

const totalTimeByDate = computed(() => {
  const map = {}
  for (const [date, times] of Object.entries(timesByDate.value)) {
    let totalMinutes = 0
    times.forEach(t => {
      if (t.total_hours) totalMinutes += Math.round(parseFloat(t.total_hours) * 60)
      else if (t.total_minute) totalMinutes += parseInt(t.total_minute)
    })
    map[date] = { hours: Math.floor(totalMinutes / 60), minutes: totalMinutes % 60 }
  }
  return map
})

const parseHourMinute = (h) => {
  const totalMinutes = Math.round(parseFloat(h || 0) * 60)
  return { hours: Math.floor(totalMinutes / 60), minutes: totalMinutes % 60 }
}

const getDayApprovals = (attendance) => {
  if (!attendance) return { employee: false, manager: false, hr: false }
  const status = parseInt(attendance.status || 0)
  return { employee: status >= 1, manager: status >= 2, hr: status >= 3 }
}

const todayFormatted = computed(() =>
  new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
)
const todayRingClass = (date) =>
  isToday(date) ? '' : ''

const weekStart = ref(getSaturday(new Date()))





onMounted(() => {
  loadRecords()
  loadAttendanceForWeek()
})
</script>

<!-- const weekRangeText = computed(() => {
  const start = weekStart.value
  const end = new Date(start)
  end.setDate(start.getDate() + 6)

  const format = (d) =>
    d.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })

  return `${format(start)} - ${format(end)}`
})

const prevWeek = () => {
  weekStart.value.setDate(weekStart.value.getDate() - 7)
  loadAttendanceForWeek()
}

const nextWeek = () => {
  weekStart.value.setDate(weekStart.value.getDate() + 7)
  loadAttendanceForWeek()
}

/* ================= INIT ================= */ -->
