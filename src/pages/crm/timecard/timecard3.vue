<template>
  <div class="w-11/12 mx-auto py-6 px-10 space-y-6">
    <!-- ================= HEADER ================= -->
    <div
      class="bg-gradient-to-r from-cyan-500 to-sky-500 rounded-2xl px-6 py-5 shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4"
    >
      <!-- Left -->
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow">
          ⏱️
        </div>

        <div>
          <h2 class="text-2xl font-semibold text-white">Sales Timecard Entry</h2>
          <p class="text-sm text-cyan-100">
            {{ todayFormatted }}
          </p>
        </div>
      </div>

      <div
        class="flex items-center gap-3 bg-white/20 backdrop-blur px-4 py-2 rounded-xl text-white"
      >
        <button
          @click="prevWeek"
          class="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-sm font-semibold"
        >
          ◀ Prev
        </button>

        <div class="font-semibold text-sm whitespace-nowrap">
          {{ weekRangeText }}
        </div>

        <button
          @click="nextWeek"
          class="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-sm font-semibold"
        >
          Next ▶
        </button>
      </div>

      <!-- Right -->
      <div class="flex items-center gap-4">
        <!-- Live Login Time -->
        <!-- <div
          v-if="isLoggedIn"
          class="bg-white/20 backdrop-blur px-4 py-2 rounded-xl text-white text-sm font-semibold"
        >
          Today’s Login Time:
          <span class="ml-1 font-bold">{{ liveLoginTime }}</span>
        </div> -->

        <!-- Login / Logout Button -->
        <button
          class="px-6 py-2 rounded-xl font-semibold text-white transition flex items-center justify-center gap-2"
          :class="
            isLoggedIn ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-500 hover:bg-emerald-600'
          "
          :disabled="loginLoading || logoutLoading"
          @click="toggleLogin"
        >
          <span
            v-if="loginLoading || logoutLoading"
            class="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
          ></span>
          {{ isLoggedIn ? 'Logout' : 'Login' }}
        </button>
      </div>
    </div>

    <!-- ================= TOP FORM ================= -->
    <div class="bg-white rounded-2xl shadow border p-5 space-y-4">
      <!-- Row 1 -->
      <div
        class="grid gap-4 items-end"
        :class="{
          'grid-cols-4': selectedWorkType?.accountSelect,
          'grid-cols-3': !selectedWorkType?.accountSelect
        }"
      >
        <!-- Date -->
        <div>
          <label class="text-xs font-semibold text-gray-600">Date</label>
          <input type="date" v-model="form.date" class="w-full border rounded-lg px-3 py-2" />
        </div>

        <!-- Work Type -->
        <div>
          <label class="text-xs font-semibold text-gray-600">Work Type</label>
          <select v-model="form.workTypeId" class="w-full border rounded-lg px-3 py-2">
            <option value="">Select</option>
            <option v-for="wt in workTypes" :key="wt.id" :value="wt.id">
              {{ wt.name }}
            </option>
          </select>
        </div>

        <!-- Account -->
        <div v-if="selectedWorkType?.accountSelect">
          <label class="text-xs font-semibold text-gray-600">Select Account</label>
          <select v-model="form.record_id" class="w-full border rounded-lg px-3 py-2">
            <option value="">Select</option>
            <option v-for="r in recordList" :key="r.id" :value="r.id">
              {{ r.values?.find((v) => v.field?.label === 'Company Name')?.value }}
            </option>
          </select>
        </div>

        <!-- Activity -->
        <div>
          <label class="text-xs font-semibold text-gray-600">Activity Type</label>
          <select v-model="form.activity" class="w-full border rounded-lg px-3 py-2">
            <option value="">Select</option>
            <option v-for="a in selectedWorkType?.activities || []" :key="a">
              {{ a }}
            </option>
          </select>
        </div>
      </div>

      <!-- Row 2 -->
      <div class="grid grid-cols-2 md:grid-cols-4 items-end gap-4">
        <div>
          <label class="text-xs font-semibold text-gray-600">Hours</label>
          <input
            type="number"
            min="0"
            v-model="form.hours"
            class="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label class="text-xs font-semibold text-gray-600">Minutes</label>
          <input
            type="number"
            min="0"
            max="59"
            v-model="form.minutes"
            class="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div class="md:col-span-2">
          <button
            @click="submitEntry"
            class="w-full bg-emerald-600 text-white rounded-lg py-2.5 font-semibold"
          >
            Submit
          </button>
        </div>
      </div>
    </div>

    <!-- ================= TABLE ================= -->
    <div class="bg-white rounded-2xl shadow border overflow-hidden">
      <table class="w-full text-sm border-collapse">
        <!-- ================= HEADER ================= -->
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="p-3 text-left border-e">Day</th>
            <th class="p-3 text-left border-e">Date</th>
            <th class="p-3 text-left border-e">Login / Logout</th>
            <th class="p-3 text-left border-e">Work Type</th>
            <th class="p-3 text-left border-e">Account</th>
            <th class="p-3 text-left border-e">Activity</th>
            <th class="p-3 text-left border-e">Working Time</th>
            <th class="p-3 text-left">Total</th>
          </tr>
        </thead>

        <!-- ================= BODY ================= -->
        <tbody>
  <!-- Skeleton Loader for Full Week -->
  <template v-if="loadingEntries">
    <tr v-for="day in 7" :key="day">
      <!-- Day -->
      <td class="border-e py-4 text-center">
        <div class="h-6 w-20 bg-gray-200 rounded animate-pulse mx-auto"></div>
      </td>

      <!-- Date -->
      <td class="border-e py-4 text-center">
        <div class="h-6 w-24 bg-gray-200 rounded animate-pulse mx-auto"></div>
      </td>

      <!-- Attendance -->
      <td class="border-e py-4 px-2">
        <div class="flex gap-2 flex-wrap">
          <div class="h-5 w-16 bg-gray-300 rounded animate-pulse"></div>
          <div class="h-5 w-16 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </td>

      <!-- Work Type -->
      <td class="border-e py-4">
        <div class="h-6 w-28 bg-gray-200 rounded animate-pulse mx-auto"></div>
      </td>

      <!-- Account -->
      <td class="border-e py-4">
        <div class="h-6 w-28 bg-gray-200 rounded animate-pulse mx-auto"></div>
      </td>

      <!-- Activity -->
      <td class="border-e py-4">
        <div class="h-6 w-28 bg-gray-200 rounded animate-pulse mx-auto"></div>
      </td>

      <!-- Working Time -->
      <td class="border-e py-4">
        <div class="h-6 w-20 bg-gray-200 rounded animate-pulse mx-auto"></div>
      </td>

      <!-- Total -->
      <td>
        <div class="h-6 w-16 bg-gray-200 rounded animate-pulse mx-auto"></div>
      </td>
    </tr>
  </template>

  <!-- Actual Data -->
  <template v-else v-for="day in weekDays" :key="day.date">
    <tr
      v-for="(row, index) in entriesByDate[day.date] || [null]"
      :key="index"
      class="border-t"
      :class="day.isWeekend ? 'bg-blue-50' : 'bg-white'"
    >
      <!-- Day -->
      <td
        v-if="index === 0"
        :rowspan="entriesByDate[day.date]?.length || 1"
        class="border-e text-center w-24"
        :class="day.isWeekend ? 'bg-indigo-100 text-indigo-700' : 'bg-sky-100 text-sky-700'"
      >
        {{ day.dayName }}
      </td>

      <!-- Date -->
      <td
        v-if="index === 0"
        :rowspan="entriesByDate[day.date]?.length || 1"
        class="border-e text-center text-xs font-semibold"
      >
        {{ day.date }}
      </td>

      <!-- Attendance -->
      <td
        v-if="index === 0"
        :rowspan="entriesByDate[day.date]?.length || 1"
        class="border-e p-1 w-72"
      >
        <template v-if="attendanceByDate[day.date]?.length">
          <div
            v-for="log in attendanceByDate[day.date]"
            :key="log.login_time"
            class="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 mb-1 text-xs shadow-sm hover:bg-gray-100 transition"
          >
            <!-- Login -->
            <div class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3 text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3" />
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
              </svg>
              <span class="text-emerald-600 font-medium">Login: {{ log.login_time }}</span>
            </div>
            |
            <!-- Logout -->
            <div class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3" />
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
              </svg>
              <span class="text-red-600 font-medium">Logout: {{ log.logout_time }}</span>
            </div>
          </div>
        </template>
        <span v-else class="text-gray-400 italic text-xs">No login</span>
      </td>

      <!-- Work entry -->
      <template v-if="row">
        <td class="p-3 border-e">{{ row.workType }}</td>
        <td class="p-3 border-e">{{ row.account || '-' }}</td>
        <td class="p-3 border-e">{{ row.activity }}</td>
        <td class="p-3 border-e">{{ row.time }}</td>
        <td class="p-3 font-bold text-emerald-600">{{ row.total }}</td>
      </template>

      <template v-else>
        <td colspan="5" class="p-4 italic text-gray-400 text-center">No tasks</td>
      </template>
    </tr>
  </template>
</tbody>

      </table>

      <div class="flex justify-end p-4 bg-gray-50">
        <div class="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-bold">
          Total Week Hours: {{ weekTotal }} hrs
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import api from '@/config/api'
import { useAuthStore } from '@/stores/AuthStore'

const loadingEntries = ref(false)
const authStore = useAuthStore()
authStore.sidebarOpen = false
const workTypes = [
  {
    id: 1,
    accountSelect: true,
    name: 'Account Work',
    activities: [
      'Engineering Service',
      'Business Development',
      'Client Communication',
      'Email Communication',
      'Sales Process',
      'Lead Follow-up',
      'Account Review',
      'Training Service',
      'Technical Support',
      'Marketing Support',
      'Customer Success / Renewal'
    ]
  },
  {
    id: 2,
    accountSelect: false,
    name: 'Accounting',
    activities: ['Salary Processing', 'Payroll Review', 'General Accounting']
  },
  {
    id: 3,
    accountSelect: false,
    name: 'Finance',
    activities: ['Tax', 'Budget Planning', 'Cash Flow Management', 'Compliance & Audit Support']
  },
  {
    id: 4,
    accountSelect: false,
    name: 'HR',
    activities: [
      'Hiring / Recruitment',
      'Interview Coordination',
      'Onboarding',
      'Employee Management',
      'Attendance & Leave Management',
      'Performance Review',
      'HR Documentation'
    ]
  },
  {
    id: 5,
    accountSelect: false,
    name: 'Executive Meeting',
    activities: [
      'Weekly Plan Meeting',
      'Weekly Delivery Meeting',
      'Strategy Meeting',
      'Management Review'
    ]
  },
  {
    id: 6,
    accountSelect: false,
    name: 'MS Office Work',
    activities: ['Word', 'Excel', 'PowerPoint']
  }
]

const form = reactive({
  date: '',
  workTypeId: '',
  activity: '',
  record_id: '',
  hours: 0,
  minutes: 0
})

const recordList = ref([])
const entries = ref([])

const selectedWorkType = computed(() => workTypes.find((w) => w.id === form.workTypeId))

const weekTotal = computed(() => {
  return Object.values(entriesByDate.value)
    .flat()
    .reduce((sum, e) => sum + e.totalHour, 0)
})

/* LOGIN / LOGOUT */

const isLoggedIn = ref(false)
const loginLoading = ref(false)
const logoutLoading = ref(false)
const liveLoginTime = ref('')
let timer = null
const loginTime = ref(null)

const toggleLogin = async () => {
  if (!isLoggedIn.value) {
    loginLoading.value = true
    try {
      const date = new Date().toISOString().split('T')[0]
      const time = new Date().toLocaleTimeString('en-GB') // HH:mm:ss

      const res = await api().post('/attendance/login', {
        date,
        login_time: time
      })

      // Save attendance_info_id in authStore
      authStore.attendance_info_id = res.data.attendance_info_id
      authStore.attendance_login_time = new Date().toISOString()

      // Start live clock
      loginTime.value = new Date()
      isLoggedIn.value = true
      startClock()
    } catch (err) {
      console.error('Timecard login failed', err)
    } finally {
      loginLoading.value = false
    }
  } else {
    // LOGOUT
    if (!authStore.attendance_info_id) return

    logoutLoading.value = true
    try {
      const time = new Date().toLocaleTimeString('en-GB')
      await api().post(`/attendance/logout/${authStore.attendance_info_id}`, {
        logout_time: time
      })

      clearInterval(timer)
      liveLoginTime.value = ''
      isLoggedIn.value = false

      // Reset attendance_info_id in store
      authStore.attendance_info_id = null
    } catch (err) {
      console.error('Timecard logout failed', err)
    } finally {
      logoutLoading.value = false
    }
  }
}

const startClock = () => {
  timer = setInterval(() => {
    const diff = Math.floor((new Date() - loginTime.value) / 1000)
    const h = String(Math.floor(diff / 3600)).padStart(2, '0')
    const m = String(Math.floor((diff % 3600) / 60)).padStart(2, '0')
    const s = String(diff % 60).padStart(2, '0')
    liveLoginTime.value = `${h}:${m}:${s}`
  }, 1000)
}

const submitEntry = () => {
  const totalHour = form.hours + form.minutes / 60

  entries.value.push({
    day: new Date(form.date).toLocaleDateString('en-US', { weekday: 'long' }),
    date: form.date,
    workType: selectedWorkType.value?.name,
    account: selectedWorkType.value?.accountSelect ? form.record_id : '',
    activity: form.activity,
    time: `${form.hours}h ${form.minutes}m`,
    total: `${totalHour.toFixed(1)} hrs`,
    totalHour
  })

  form.hours = 0
  form.minutes = 0
}

const loadRecords = async () => {
  const res = await api().get('crm/modules/2/records')
  recordList.value = res.data.data
}

const todayFormatted = computed(() =>
  new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
)

const weekStart = ref(getSaturday(new Date()))

function getSaturday(date) {
  const d = new Date(date)
  const day = d.getDay() // 0 = Sun
  const diff = (day + 1) % 7
  d.setDate(d.getDate() - diff)
  d.setHours(0, 0, 0, 0)
  return d
}

const weekDays = computed(() => {
  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(weekStart.value)
    d.setDate(weekStart.value.getDate() + i)

    return {
      dateObj: d,
      date: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'long' }),
      isWeekend: d.getDay() === 0 || d.getDay() === 6
    }
  })
})

const weekRangeText = computed(() => {
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
  const d = new Date(weekStart.value)
  d.setDate(d.getDate() - 7)
  weekStart.value = d
  loadAttendanceForWeek()
}

const nextWeek = () => {
  const d = new Date(weekStart.value)
  d.setDate(d.getDate() + 7)
  weekStart.value = d
  loadAttendanceForWeek()
}


const entriesByDate = computed(() => {
  // Get the start and end of the current week
  const weekStartDate = weekStart.value
  const weekEndDate = new Date(weekStartDate)
  weekEndDate.setDate(weekStartDate.getDate() + 6)

  return entries.value
    .filter((e) => {
      const entryDate = new Date(e.date)
      return entryDate >= weekStartDate && entryDate <= weekEndDate
    })
    .reduce((acc, e) => {
      if (!acc[e.date]) acc[e.date] = []
      acc[e.date].push(e)
      return acc
    }, {})
})

const attendanceByDate = ref({})

const loadAttendanceForWeek = async () => {
   loadingEntries.value = true
  attendanceByDate.value = {}

  for (const day of weekDays.value) {
    try {
      const res = await api().get(`/attendance?user_id=${authStore.user.id}&date=${day.date}`)
      if (res.data.data.length) {
        // save logs only
        attendanceByDate.value[day.date] = res.data.data[0].attendance_logs.map(log => ({
          login_time: log.login_time.split(' ')[1],   // HH:mm:ss
          logout_time: log.logout_time ? log.logout_time.split(' ')[1] : '-'
        }))
      }
    } catch (err) {
      console.error('Failed to load attendance for', day.date, err)
    }
  }

   loadingEntries.value = false
}

onMounted(() => {
  form.date = new Date().toISOString().split('T')[0]
  loadRecords()
   loadAttendanceForWeek()
  // If store has an attendance_info_id, user is logged in
  if (authStore.attendance_info_id) {
    isLoggedIn.value = true
    loginTime.value = new Date(authStore.attendance_login_time)
    startClock()
  }
})
</script>
