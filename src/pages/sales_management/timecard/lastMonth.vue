<template>
  <div class="w-11/12 mx-auto pt-6 px-10 space-y-4 min-h-screen">
    <!-- HEADER -->
    <div
      class="bg-gradient-to-r from-cyan-500 to-sky-500 rounded-2xl px-6 py-2 shadow-lg flex items-center justify-between mb-6">

      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-inner">
          ⏱️
        </div>
        <div>
          <h2 class="text-2xl font-bold text-white tracking-tight">
            Sales Timecard Entry</h2>
          <p class="text-xs text-indigo-100 font-medium opacity-90">
            Today: {{ todayFormatted }}
          </p>
        </div>
      </div>

      <div class="flex items-center bg-white/10 p-1 rounded-xl backdrop-blur-md border border-white/20 shadow-sm">
        <button @click="changeMonth(-1)"
          class="px-4 py-1 text-white border hover:bg-white/20 rounded-lg transition-all active:scale-95 font-bold"
          title="Previous Month">
          ◀ Prev
        </button>

        <button @click="jumpToCurrentMonth"
          class="px-6 py-1 text-white font-extrabold min-w-[180px] text-center hover:text-indigo-200 transition-colors uppercase tracking-wider"
          title="Jump to Current Month">
          {{ monthRangeLabel }}
        </button>

        <button @click="changeMonth(1)"
          class="px-4 py-1 text-white border hover:bg-white/20 rounded-lg transition-all active:scale-95 font-bold"
          title="Next Month">
          Next ▶
        </button>
      </div>


    </div>
    <!-- {{ timesByDate }} -->
    <!-- TABLE -->
    <div class="w-full overflow-x-auto overflow-y-hidden">
      <table class="min-w-full border-collapse text-xs">
        <!-- GROUP HEADER -->
        <thead>
          <tr class="text-center font-bold">
            <th colspan="3" class="border p-2 bg-blue-50">Login / Logout</th>
            <th colspan="6" class="border p-2 bg-green-50">Task / Work Entry</th>
            <th colspan="3" class="border p-2 bg-purple-50">Approval</th>
          </tr>

          <!-- COLUMN HEADER -->
          <tr>
            <th class="border p-2 bg-blue-50">Day</th>
            <th class="border p-2 bg-blue-50">Date</th>
            <th class="border p-2 bg-blue-50">Login / Logout</th>

            <th class="border p-2 bg-green-50">Work Type</th>
            <th class="border p-2 bg-green-50">Account</th>
            <th class="border p-2 bg-green-50">Activity</th>
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
              :class="!isToday(day.date) ? 'opacity-50 pointer-events-none' : ''">
              <!-- DAY -->
              <td v-if="index === 0" :rowspan="entriesByDate[day.date]?.length || 1" class="border p-2 font-semibold">
                {{ day.name }}
              </td>

              <!-- DATE -->
              <td v-if="index === 0" :rowspan="entriesByDate[day.date]?.length || 1" class="border p-2 w-20">
                {{ day.date }}
              </td>

              <!-- LOGIN / LOGOUT -->
              <td v-if="index === 0" :rowspan="entriesByDate[day.date]?.length || 1" class="border p-2 space-y-2 w-32">
                <button v-if="isToday(day.date)"
                  class="w-full py-1 rounded text-white font-semibold disabled:opacity-50"
                  :class="isLoggedInByDate[day.date] ? 'bg-red-500' : 'bg-emerald-600'"
                  :disabled="attendanceLoading || saveLoadingByDate[day.date]" @click="toggleLogin(day.date)">
                  <span v-if="attendanceLoading">Loading...</span>
                  <span v-else-if="loginLoading[day.date]">Processing...</span>
                  <span v-else>
                    {{ isLoggedInByDate[day.date] ? 'Logout' : 'Login' }}
                  </span>
                </button>

                <div v-for="log in attendanceByDate[day.date] || []" :key="log.login_time"
                  class="text-center flex flex-col items-center text-sm">
                  <span class="text-green-600">Login: {{ log.login_time }}</span>
                  <span class="text-red-600">Logout: {{ log.logout_time }}</span>
                </div>
              </td>

              <!-- TASK / WORK ENTRY (API DATA + INPUTS) -->
              <td class="border p-1" colspan="6">
                <!-- SAVED TIMES (API DATA) -->
                <div v-if="timesByDate[day.date]?.length" class="space-y-1 mb-2 text-[11px]">
                  <div v-for="(t, i) in timesByDate[day.date]" :key="i"
                    class="grid grid-cols-6 gap-1 bg-gray-50 p-1 rounded">
                    <div class="border rounded">{{ t.type_of_work }}</div>
                    <div class="truncate border rounded">{{ t.account?.name || '—' }}</div>
                    <div class="border rounded">{{ t?.activity || '—' }}</div>

                    <!-- HOURS -->
                    <div class="text-center border rounded">
                      {{ parseHourMinute(t.total_hours).hours }} Hours
                    </div>

                    <!-- MINUTES -->
                    <div class="text-center border rounded">
                      {{ parseHourMinute(t.total_hours).minutes.toString().padStart(2, '0') }} Minutes
                    </div>

                    <!-- <div class="text-center text-green-600 font-semibold">Saved</div> -->
                  </div>

                  <!-- TOTAL -->
                  <div class="grid grid-cols-6 gap-1 bg-emerald-50 p-1 rounded font-semibold">
                    <div class="col-span-3 text-right"></div>
                    <div class="text-center border rounded">
                      {{ totalTimeByDate[day.date]?.hours || 0 }} Hours
                    </div>
                    <div class="text-center border rounded">
                      {{ totalTimeByDate[day.date]?.minutes?.toString().padStart(2, '0') || '00' }} Minutes
                    </div>
                    <div></div>
                  </div>
                </div>


                <!-- INPUT ROW (UNCHANGED LOGIC) -->
                <div class="grid grid-cols-6 gap-1">
                  <!-- WORK TYPE -->
                  <select v-model="getRowForm(day.date).workTypeId" class="w-full border rounded px-2 py-1"
                    :disabled="!isToday(day.date)">
                    <option value="">Select</option>
                    <option v-for="w in workTypes" :key="w.id" :value="w.id">
                      {{ w.name }}
                    </option>
                  </select>

                  <!-- ACCOUNT -->
                  <select v-if="selectedWorkType(day.date)?.accountSelect" v-model="getRowForm(day.date).record_id"
                    class="w-full border rounded px-2 py-1" :disabled="!isToday(day.date)">
                    <option value="">Select</option>
                    <option v-for="r in recordList" :key="r.id" :value="r.id">
                      {{r.values?.find(v => v.field?.label === 'Company Name')?.value}}
                    </option>
                  </select>
                  <div v-else></div>

                  <!-- ACTIVITY -->
                  <select v-model="getRowForm(day.date).activity" class="w-full border rounded px-2 py-1"
                    :disabled="!isToday(day.date)">
                    <option value="">Select</option>
                    <option v-for="a in selectedWorkType(day.date)?.activities || []" :key="a">
                      {{ a }}
                    </option>
                  </select>

                  <!-- HOURS -->
                  <input type="number" min="0" v-model="getRowForm(day.date).hours"
                    class="w-full border rounded px-2 py-1 text-center" :disabled="!isToday(day.date)" />

                  <!-- MINUTES -->
                  <input type="number" min="0" max="59" v-model="getRowForm(day.date).minutes"
                    class="w-full border rounded px-2 py-1 text-center" :disabled="!isToday(day.date)" />

                  <!-- SAVE -->
                  <button class="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded disabled:opacity-50"
                    :disabled="!isToday(day.date) || attendanceLoading || saveLoadingByDate[day.date]"
                    @click="submitEntry(day.date)">
                    <span v-if="saveLoadingByDate[day.date]">Saving...</span>
                    <span v-else>Save</span>
                  </button>
                </div>
              </td>

              <!-- APPROVALS -->
              <!-- EMPLOYEE -->
              <td class="border text-center ">
                <div class="flex flex-col items-center justify-around gap-1">
                  <span>
                    {{ getDayApprovals(entriesByDate[day.date]?.[0])?.employee ? '✔' : '—' }}
                  </span>

                  <!-- Approve button -->
                  <button v-if="entriesByDate[day.date]?.[0]?.id && entriesByDate[day.date][0].status === '0'"
                    class="bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 rounded text-xs"
                    :disabled="attendanceLoadingById[entriesByDate[day.date][0].id]"
                    @click="approveEmployee(entriesByDate[day.date][0])">
                    <span v-if="attendanceLoadingById[entriesByDate[day.date][0].id]">Approving...</span>
                    <span v-else>Approve</span>
                  </button>
                </div>
              </td>



              <!-- MANAGER -->
              <td class="border text-center">
                {{ getDayApprovals(entriesByDate[day.date]?.[0])?.manager ? '✔' : '—' }}
              </td>

              <!-- HR -->
              <td class="border text-center">
                {{ getDayApprovals(entriesByDate[day.date]?.[0])?.hr ? '✔' : '—' }}
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

/* ================= STATE & CONFIG ================= */
const authStore = useAuthStore()
const saveLoadingByDate = reactive({})
const attendanceLoading = ref(true)
const loginLoading = reactive({})
const attendanceLoadingById = reactive({})

const todayISO = new Date().toISOString().split('T')[0]

// UNLOCKED: Allowing editing for any day in the month
const isToday = (date) => true

const entries = ref([])
const attendanceByDate = ref({})
const timesByDate = ref({})
const isLoggedInByDate = reactive({})
const recordList = ref([])
const rowForms = reactive({})

/* ================= MONTH NAVIGATION (DEFAULT TO LAST MONTH) ================= */
const initDate = new Date()
// Set to the first day of PREVIOUS month
initDate.setMonth(initDate.getMonth() - 1, 1)
const currentMonthDate = ref(initDate)

const changeMonth = (offset) => {
  const d = new Date(currentMonthDate.value)
  d.setMonth(d.getMonth() + offset)
  currentMonthDate.value = d
  loadAttendanceForMonth()
}

const jumpToCurrentMonth = () => {
  currentMonthDate.value = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  loadAttendanceForMonth()
}

// Generates the days for the template loop
const days = computed(() => {
  const year = currentMonthDate.value.getFullYear()
  const month = currentMonthDate.value.getMonth()
  const date = new Date(year, month, 1)
  const result = []
  while (date.getMonth() === month) {
    const d = new Date(date)
    result.push({
      date: d.toISOString().split('T')[0],
      name: d.toLocaleDateString('en-US', { weekday: 'long' })
    })
    date.setDate(date.getDate() + 1)
  }
  return result
})

const monthRangeLabel = computed(() => {
  return currentMonthDate.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const todayFormatted = computed(() =>
  new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
)

/* ================= WORK TYPES ================= */
const workTypes = [
  { id: 1, accountSelect: true, name: 'Account Work', activities: ['Engineering Service', 'Business Development', 'Client Communication', 'Email Communication', 'Sales Process', 'Lead Follow-up', 'Account Review', 'Training Service', 'Technical Support', 'Marketing Support', 'Customer Success / Renewal'] },
  { id: 2, accountSelect: false, name: 'Accounting', activities: ['Salary Processing', 'Payroll Review', 'General Accounting'] },
  { id: 3, accountSelect: false, name: 'Finance', activities: ['Tax', 'Budget Planning', 'Cash Flow Management', 'Compliance & Audit Support'] },
  { id: 4, accountSelect: false, name: 'HR', activities: ['Hiring / Recruitment', 'Interview Coordination', 'Onboarding', 'Employee Management', 'Attendance & Leave Management', 'Performance Review', 'HR Documentation'] },
  { id: 5, accountSelect: false, name: 'Executive Meeting', activities: ['Weekly Plan Meeting', 'Weekly Delivery Meeting', 'Strategy Meeting', 'Management Review'] },
  { id: 6, accountSelect: false, name: 'MS Office Work', activities: ['Word', 'Excel', 'PowerPoint'] }
]

/* ================= DATA FETCHING ================= */
const loadRecords = async () => {
  const res = await api().get('crm/modules/2/records')
  recordList.value = res.data.data
}

const processResponse = (date, data) => {
  if (data && data.length) {
    const attendance = data[0]
    attendanceByDate.value[date] = attendance.attendance_logs.map(log => ({
      login_time: log.login_time.split(' ')[1],
      logout_time: log.logout_time ? log.logout_time.split(' ')[1] : '-'
    }))

    const lastLog = attendance.attendance_logs[attendance.attendance_logs.length - 1]
    isLoggedInByDate[date] = !!(lastLog && !lastLog.logout_time)

    // Sync globals ONLY if the date is actually Today's real date
    if (date === todayISO && isLoggedInByDate[date]) {
      authStore.attendance_info_id = attendance.id
      authStore.login_id = attendance.id
    }

    timesByDate.value[date] = attendance.times || []
    entries.value = entries.value.filter(e => e.date !== date)
    entries.value.push(attendance)
  } else {
    attendanceByDate.value[date] = []
    timesByDate.value[date] = []
    isLoggedInByDate[date] = false
    entries.value = entries.value.filter(e => e.date !== date)
    entries.value.push({ date, id: null, status: '0', times: [] })
  }
}

const loadAttendanceForMonth = async () => {
  attendanceLoading.value = true
  try {
    // Parallel load for all days in the selected month
    await Promise.all(days.value.map(async (day) => {
      const res = await api().get(`/attendance?user_id=${authStore.user.id}&date=${day.date}`)
      processResponse(day.date, res.data.data)
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
  saveLoadingByDate[date] = true
  const f = getRowForm(date)
  try {
    // Find the specific attendance record for the date being edited
    const dayAttendance = entries.value.find(e => e.date === date)
    const attendanceId = dayAttendance?.id || authStore.login_id

    await api().post('/attendance-time', {
      attendance_id: attendanceId,
      type_of_work: selectedWorkType(date)?.name || '',
      record_id: f.record_id || null,
      activity: f.activity,
      hour: f.hours || 0,
      minute: f.minutes || 0,
      status: 0
    })
    rowForms[date] = { date, workTypeId: '', record_id: '', activity: '', hours: '', minutes: '', status: 0 }
    Swal.fire({ icon: 'success', title: 'Saved', timer: 1000, showConfirmButton: false })
    await loadAttendanceForMonth()
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
    } else {
      const dayAttendance = entries.value.find(e => e.date === date)
      const logoutId = dayAttendance?.id || authStore.attendance_info_id
      await api().post(`/attendance/logout/${logoutId}`, { logout_time: time })
      isLoggedInByDate[date] = false
    }
    await loadAttendanceForMonth()
  } catch (e) {
    console.error(e)
  } finally {
    loginLoading[date] = false
  }
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
  return entries.value.reduce((acc, e) => {
    if (!acc[e.date]) acc[e.date] = []
    acc[e.date].push(e)
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

onMounted(() => {
  loadRecords()
  loadAttendanceForMonth()
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
