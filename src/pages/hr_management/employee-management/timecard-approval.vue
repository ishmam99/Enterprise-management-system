<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import moment from 'moment'
import Swal from 'sweetalert2'
import { mdiTimerSettingsOutline, mdiEye } from '@mdi/js'

import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import { useHRM } from '@/composables/useHRM'

/* -------------------- setup -------------------- */
const { hrmApi } = useHRM()
const route = useRoute()
const router = useRouter()

moment.updateLocale('en', { week: { dow: 6 } })

/* -------------------- state -------------------- */
const currentDate = ref(moment().format('YYYY-MM-DD'))
const attendanceList = ref([])
const selectedData = ref(null)
const selectedEmployee = ref(null)

const ldng = ref(false)
const loaderCalls = ref(false)

/* -------------------- navigation -------------------- */
const goBack = () => router.back()

const previousWeek = () => {
  currentDate.value = moment(currentDate.value).subtract(7, 'days').format('YYYY-MM-DD')
  getAttendance()
}

const nextWeek = () => {
  currentDate.value = moment(currentDate.value).add(7, 'days').format('YYYY-MM-DD')
  getAttendance()
}

/* -------------------- api -------------------- */
const getEmployee = async () => {
  try {
    const { data } = await hrmApi.get(`employee/${route.params.id}`)
    selectedEmployee.value = data.data
  } catch (e) {
    console.error(e)
  }
}

const getAttendance = async () => {
  ldng.value = true
  try {
    const { data } = await hrmApi.get(
      `task-list-by-range?user_id=${route.params.id}&start_date=${moment(currentDate.value)
        .startOf('week')
        .format('YYYY-MM-DD')}&end_date=${moment(currentDate.value)
        .endOf('week')
        .format('YYYY-MM-DD')}`
    )
    attendanceList.value = data.data
  } catch (e) {
    Swal.fire('Error', 'Failed to load attendance', 'error')
  } finally {
    ldng.value = false
  }
}

/* -------------------- helpers -------------------- */
const formatTaskSummary = (summary) => {
  if (!summary) return 'No summary'
  if (typeof summary === 'object') {
    return Object.entries(summary)
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ')
  }
  return summary
}

const statusClass = (status, type) => {
  const base = 'font-semibold'
  if (type === 'pm')
    return `${base} ${status >= 1 ? 'text-green-500' : 'text-gray-500'}`
  return `${base} ${status === 3 ? 'text-green-500' : status === 4 ? 'text-red-500' : 'text-gray-500'}`
}

const statusText = (status, type) => {
  if (type === 'pm') return status >= 1 ? 'Approved' : 'Pending'
  return status === 3 ? 'Approved' : status === 4 ? 'Declined' : 'Pending'
}

/* -------------------- actions -------------------- */
const updateTaskStatus = async (taskId, status, index) => {
  const confirm = await Swal.fire({
    title: 'Confirm action',
    icon: 'question',
    showCancelButton: true
  })
  if (!confirm.isConfirmed) return

  const old = selectedData.value.attendance_tasks[index].status
  selectedData.value.attendance_tasks[index].status = status

  try {
    await hrmApi.post(`attendance-task-approval/${taskId}`, { status })
    Swal.fire('Success', 'Task updated', 'success')
  } catch {
    selectedData.value.attendance_tasks[index].status = old
    Swal.fire('Error', 'Update failed', 'error')
  }
}

const updateTimecardStatus = async (id) => {
  const confirm = await Swal.fire({
    title: 'Approve timecard?',
    icon: 'question',
    showCancelButton: true
  })
  if (!confirm.isConfirmed) return

  try {
    await hrmApi.post(`attendance-approve/${id}`, { status: 1 })
    selectedData.value.status = '1'
    Swal.fire('Success', 'Timecard approved', 'success')
  } catch {
    Swal.fire('Error', 'Approval failed', 'error')
  }
}

/* -------------------- lifecycle -------------------- */
onMounted(async () => {
  await getEmployee()
  await getAttendance()
})
</script>

<template>
  <SectionMain class="w-full px-20">
    <SectionTitleLineWithButton
      :icon="mdiTimerSettingsOutline"
      class="bg-cyan-500 py-3 rounded-2xl px-3 font-semibold text-white"
      :title="selectedEmployee
        ? `Name: ${selectedEmployee.first_name} ${selectedEmployee.last_name}, Department: ${selectedEmployee.department_name}`
        : 'Loading...'"
      main
    >
      <p class="bg-indigo-600 px-3 py-1 rounded cursor-pointer" @click="goBack">← Back</p>
    </SectionTitleLineWithButton>

    <!-- Week Navigation -->
    <SectionTitleLineWithButton class="bg-teal-500 py-3 rounded-2xl flex justify-center gap-4 text-white">
      <BaseButton label="Prev Week" color="warning" @click="previousWeek" />
      <span>
        {{ moment(currentDate).startOf('week').format('MMMM Do YYYY') }} -
        {{ moment(currentDate).endOf('week').format('MMMM Do YYYY') }}
      </span>
      <BaseButton label="Next Week" color="info" @click="nextWeek" />
    </SectionTitleLineWithButton>

    <!-- Weekly Table -->
    <table v-if="!selectedData" class="w-full bg-slate-100 rounded mt-4">
      <thead class="bg-blue-500 text-white">
        <tr>
          <th>Date</th>
          <th>Total Hours</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="ldng">
          <td colspan="4" class="text-center py-6">Loading...</td>
        </tr>

        <tr v-for="t in attendanceList" :key="t.date">
          <td>{{ t.date }} ({{ moment(t.date).format('dddd') }})</td>
          <td>{{ t.hour_sum || 0 }} hrs</td>
          <td>
            <span :class="t.status == 1 ? 'text-green-500' : 'text-yellow-500'">
              {{ t.status == 1 ? 'Approved' : 'Pending' }}
            </span>
          </td>
          <td>
            <BaseButton label="View" :icon="mdiEye" color="info" @click="selectedData = t" />
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Details View -->
    <div v-else class="mt-6 bg-white p-4 rounded">
      <h2 class="text-xl font-bold">{{ selectedData.date }}</h2>
      <p>Total Hours: {{ selectedData.hour_sum }}</p>

      <button
        v-if="selectedData.status == 0"
        class="btn btn-accent mt-2"
        @click="updateTimecardStatus(selectedData.id)"
      >
        Approve Timecard
      </button>

      <table class="w-full mt-4 border">
        <thead class="bg-blue-500 text-white">
          <tr>
            <th>#</th>
            <th>Task</th>
            <th>Summary</th>
            <th>Hours</th>
            <th>PM</th>
            <th>HR</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(task, i) in selectedData.attendance_tasks" :key="task.id">
            <td>{{ i + 1 }}</td>
            <td>{{ task.task?.task_name }}</td>
            <td>{{ formatTaskSummary(task.task_summary) }}</td>
            <td>{{ task.hour }}</td>
            <td :class="statusClass(task.status, 'pm')">{{ statusText(task.status, 'pm') }}</td>
            <td :class="statusClass(task.status, 'hr')">{{ statusText(task.status, 'hr') }}</td>
            <td class="flex gap-2">
              <button class="btn btn-accent" @click="updateTaskStatus(task.id, 3, i)">Approve</button>
              <button class="btn btn-error" @click="updateTaskStatus(task.id, 4, i)">Decline</button>
            </td>
          </tr>
        </tbody>
      </table>

      <BaseButton label="Back" class="mt-4" @click="selectedData = null" />
    </div>
  </SectionMain>
</template>

<style scoped>
.btn {
  @apply px-3 py-1 rounded text-white text-sm;
}
.btn-accent {
  @apply bg-green-500 hover:bg-green-600;
}
.btn-error {
  @apply bg-red-500 hover:bg-red-600;
}
table th,
table td {
  @apply border p-2;
}
</style>
