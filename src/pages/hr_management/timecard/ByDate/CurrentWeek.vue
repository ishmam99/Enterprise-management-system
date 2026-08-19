<!-- views/TimecardWeek.vue -->
<template>
  <div class="space-y-6">
    <!-- Header with Week Info -->
    <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
      <div>
        <h2 class="text-xl font-bold text-gray-900">Current Week Timecards</h2>
        <p class="text-gray-600">{{ weekRange }}</p>
      </div>
      <div class="flex items-center space-x-3">
        <button 
          @click="prevWeek" 
          class="btn btn-circle btn-ghost"
          title="Previous Week"
        >
          <i class="ri-arrow-left-line"></i>
        </button>
        <button 
          @click="goToCurrentWeek" 
          class="btn btn-primary btn-outline"
        >
          <i class="ri-calendar-line mr-2"></i> This Week
        </button>
        <button 
          @click="nextWeek" 
          class="btn btn-circle btn-ghost"
          title="Next Week"
        >
          <i class="ri-arrow-right-line"></i>
        </button>
      </div>
    </div>

    <!-- Week Navigation -->
    <div class="card bg-base-100 shadow">
      <div class="card-body p-4">
        <div class="overflow-x-auto">
          <div class="flex space-x-2 min-w-max">
            <button 
              v-for="day in weekDays" 
              :key="day.date"
              @click="selectDay(day)"
              class="btn flex-col h-20 w-24"
              :class="[
                selectedDay === day.date ? 'btn-primary' : 'btn-ghost',
                day.isToday ? 'ring-2 ring-primary ring-offset-2' : ''
              ]"
            >
              <span class="text-lg font-semibold">{{ day.day }}</span>
              <span class="text-sm">{{ day.date }}</span>
              <span class="text-xs opacity-75">{{ day.dayName }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Weekly Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="card-title text-sm">Total Hours</h3>
              <p class="text-2xl font-bold text-primary">{{ weeklyStats.totalHours }} hrs</p>
            </div>
            <i class="ri-time-line text-3xl text-primary opacity-50"></i>
          </div>
          <div class="text-xs text-gray-500 mt-2">Avg: {{ weeklyStats.averageHours }} hrs/day</div>
        </div>
      </div>
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="card-title text-sm">Attendance Rate</h3>
              <p class="text-2xl font-bold text-success">{{ weeklyStats.attendanceRate }}%</p>
            </div>
            <i class="ri-user-line text-3xl text-success opacity-50"></i>
          </div>
          <div class="text-xs text-gray-500 mt-2">{{ weeklyStats.presentDays }} present days</div>
        </div>
      </div>
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="card-title text-sm">Late Arrivals</h3>
              <p class="text-2xl font-bold text-warning">{{ weeklyStats.lateArrivals }}</p>
            </div>
            <i class="ri-alarm-warning-line text-3xl text-warning opacity-50"></i>
          </div>
          <div class="text-xs text-gray-500 mt-2">This week</div>
        </div>
      </div>
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="card-title text-sm">Overtime Hours</h3>
              <p class="text-2xl font-bold text-error">{{ weeklyStats.overtimeHours }} hrs</p>
            </div>
            <i class="ri-flashlight-line text-3xl text-error opacity-50"></i>
          </div>
          <div class="text-xs text-gray-500 mt-2">Total extra hours</div>
        </div>
      </div>
    </div>

    <!-- Daily Timecards -->
    <div class="card bg-base-100 shadow">
      <div class="card-body">
        <h3 class="card-title mb-4">Timecards for {{ selectedDayFormatted }}</h3>
        
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Clock In</th>
                <th>Clock Out</th>
                <th>Regular Hours</th>
                <th>Overtime</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="timecard in dailyTimecards" :key="timecard.id">
                <td>
                  <div class="flex items-center space-x-3">
                    <div class="avatar">
                      <div class="mask mask-squircle w-8 h-8 bg-primary text-white flex items-center justify-center text-xs">
                        {{ getInitials(timecard.name) }}
                      </div>
                    </div>
                    <div>
                      <div class="font-medium">{{ timecard.name }}</div>
                    </div>
                  </div>
                </td>
                <td>{{ timecard.department }}</td>
                <td>{{ timecard.clockIn || '--:--' }}</td>
                <td>{{ timecard.clockOut || '--:--' }}</td>
                <td>{{ timecard.regularHours }} hrs</td>
                <td>
                  <span v-if="timecard.overtime > 0" class="badge badge-error">
                    +{{ timecard.overtime }} hrs
                  </span>
                  <span v-else class="text-gray-400">--</span>
                </td>
                <td>
                  <span :class="getStatusBadgeClass(timecard.status)">
                    {{ timecard.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Weekly Summary Chart -->
    <div class="card bg-base-100 shadow">
      <div class="card-body">
        <h3 class="card-title mb-4">Weekly Summary</h3>
        <div class="overflow-x-auto">
          <div class="min-w-max">
            <div class="flex items-end h-48 space-x-2 pt-8">
              <div 
                v-for="(day, index) in weekSummary" 
                :key="index"
                class="flex-1 flex flex-col items-center"
              >
                <div class="text-xs text-gray-500 mb-2">{{ day.day }}</div>
                <div 
                  class="w-full bg-primary rounded-t transition-all duration-300 hover:opacity-80 cursor-pointer"
                  :style="{ height: (day.hours / 10 * 100) + '%' }"
                  :title="`${day.hours} hours`"
                ></div>
                <div class="text-xs mt-1 font-medium">{{ day.hours }}h</div>
              </div>
            </div>
            <div class="flex justify-between mt-4 pt-4 border-t">
              <div class="text-sm text-gray-600">Mon</div>
              <div class="text-sm text-gray-600">Tue</div>
              <div class="text-sm text-gray-600">Wed</div>
              <div class="text-sm text-gray-600">Thu</div>
              <div class="text-sm text-gray-600">Fri</div>
              <div class="text-sm text-gray-600">Sat</div>
              <div class="text-sm text-gray-600">Sun</div>
            </div>
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

const currentDate = ref(moment())
const selectedDay = ref(moment().format('YYYY-MM-DD'))

// Generate week days
const weekDays = computed(() => {
  const startOfWeek = currentDate.value.clone().startOf('isoWeek')
  const days = []
  
  for (let i = 0; i < 7; i++) {
    const day = startOfWeek.clone().add(i, 'days')
    days.push({
      date: day.format('YYYY-MM-DD'),
      day: day.format('D'),
      dayName: day.format('ddd'),
      fullDate: day.format('MMMM D, YYYY'),
      isToday: day.isSame(moment(), 'day')
    })
  }
  
  return days
})

const weekRange = computed(() => {
  const start = currentDate.value.clone().startOf('isoWeek').format('MMM D')
  const end = currentDate.value.clone().endOf('isoWeek').format('MMM D, YYYY')
  return `${start} - ${end}`
})

const selectedDayFormatted = computed(() => {
  return moment(selectedDay.value).format('dddd, MMMM D, YYYY')
})

// Sample weekly data
const weeklyData = ref({})

onMounted(() => {
  generateSampleData()
  selectedDay.value = moment().format('YYYY-MM-DD')
})

const generateSampleData = () => {
  const employees = [
    { id: 'EMP001', name: 'John Doe', department: 'Engineering' },
    { id: 'EMP002', name: 'Jane Smith', department: 'Marketing' },
    { id: 'EMP003', name: 'Bob Johnson', department: 'Sales' },
    { id: 'EMP004', name: 'Alice Brown', department: 'HR' },
    { id: 'EMP005', name: 'Charlie Wilson', department: 'Engineering' }
  ]

  const startOfWeek = currentDate.value.clone().startOf('isoWeek')
  
  weekDays.value.forEach(day => {
    const dayData = employees.map(emp => {
      const statuses = ['present', 'present', 'present', 'late', 'absent']
      const status = statuses[Math.floor(Math.random() * statuses.length)]
      
      let clockIn, clockOut, regularHours, overtime
      
      if (status === 'present' || status === 'late') {
        clockIn = status === 'late' ? '09:30' : `08:${Math.floor(Math.random() * 30)}`
        clockOut = `17:${Math.floor(Math.random() * 60)}`
        regularHours = 8.0
        overtime = Math.random() > 0.7 ? Math.random() * 2 : 0
      } else {
        clockIn = null
        clockOut = null
        regularHours = 0
        overtime = 0
      }
      
      return {
        ...emp,
        clockIn,
        clockOut,
        regularHours: regularHours.toFixed(1),
        overtime: overtime.toFixed(1),
        status,
        totalHours: (parseFloat(regularHours) + parseFloat(overtime)).toFixed(1)
      }
    })
    
    weeklyData.value[day.date] = dayData
  })
}

const dailyTimecards = computed(() => {
  return weeklyData.value[selectedDay.value] || []
})

const weeklyStats = computed(() => {
  let totalHours = 0
  let presentDays = 0
  let lateArrivals = 0
  let overtimeHours = 0
  let totalDays = 0
  
  Object.values(weeklyData.value).forEach(dayData => {
    totalDays++
    dayData.forEach(employee => {
      totalHours += parseFloat(employee.totalHours || 0)
      if (employee.status === 'present' || employee.status === 'late') {
        presentDays++
      }
      if (employee.status === 'late') {
        lateArrivals++
      }
      overtimeHours += parseFloat(employee.overtime || 0)
    })
  })
  
  const attendanceRate = totalDays > 0 ? Math.round((presentDays / (totalDays * 5)) * 100) : 0
  const averageHours = totalDays > 0 ? (totalHours / (totalDays * 5)).toFixed(1) : 0
  
  return {
    totalHours: totalHours.toFixed(1),
    attendanceRate,
    lateArrivals,
    overtimeHours: overtimeHours.toFixed(1),
    presentDays,
    averageHours
  }
})

const weekSummary = computed(() => {
  return weekDays.value.map(day => {
    const dayData = weeklyData.value[day.date] || []
    const totalHours = dayData.reduce((sum, emp) => sum + parseFloat(emp.totalHours || 0), 0)
    return {
      day: day.dayName,
      hours: totalHours.toFixed(1)
    }
  })
})

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

const selectDay = (day) => {
  selectedDay.value = day.date
}

const prevWeek = () => {
  currentDate.value.subtract(1, 'week')
  generateSampleData()
}

const nextWeek = () => {
  currentDate.value.add(1, 'week')
  generateSampleData()
}

const goToCurrentWeek = () => {
  currentDate.value = moment()
  generateSampleData()
  selectedDay.value = moment().format('YYYY-MM-DD')
}
</script>