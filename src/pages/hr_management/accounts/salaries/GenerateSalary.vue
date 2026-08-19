<template>
  <SectionMain class="mx-10">

    <!-- Header -->
    <SectionTitleLineWithButton
      :icon="mdiAccountMultiplePlus"
      class="relative overflow-hidden rounded-3xl px-6 py-6 text-white
             bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500
             shadow-2xl"
      title="Generate Salary"
      main
    >
      <!-- Decorative blur -->
      <div class="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>

      <div class="relative flex gap-4 mt-3">
        <router-link
          to="/hr_management/accounts/salaries/ManualEntry"
          class="flex items-center gap-2 px-5 py-2 rounded-full
                bg-white/20 backdrop-blur-md hover:bg-white/30 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Manual Entry
        </router-link>

        <button
          @click="goBack"
          class="flex items-center gap-2 px-5 py-2.5 rounded-full
                bg-white/10 backdrop-blur-sm border border-white/20
                hover:bg-white/20 hover:border-white/30
                active:scale-[0.98] transition-all duration-200
                text-white font-medium shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Back
        </button>
      </div>
    </SectionTitleLineWithButton>

    <!-- Main Card -->
    <CardBox class="mt-8 rounded-3xl shadow-2xl bg-white/80 backdrop-blur-xl">

      <!-- Filters -->
      <div
        class="grid grid-cols-1 md:grid-cols-5 gap-6 p-6 rounded-2xl bg-gradient-to-br from-slate-50 via-white to-slate-50 border border-slate-200 shadow-sm"
      >
        <!-- Department -->
        <div class="space-y-2">
          <label class="text-sm font-semibold text-slate-700 tracking-wide">Department</label>
          <select
            v-model="form.department_id"
            class="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-slate-400 text-slate-700 shadow-sm hover:border-slate-400"
          >
            <option value="" class="text-slate-400">Select Department</option>
            <option
              v-for="d in selectDepartment"
              :key="d.department_id"
              :value="d.department_id"
              class="text-slate-700"
            >
              {{ d.department_name }}
            </option>
          </select>
        </div>

        <!-- Employee -->
        <div class="space-y-2">
          <label class="text-sm font-semibold text-slate-700 tracking-wide">Employee</label>
          <select
            v-model="form.employee"
            class="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-slate-400 text-slate-700 shadow-sm hover:border-slate-400"
          >
            <option value="" class="text-slate-400">Select Employee</option>
            <option
              v-for="e in employeeList.filter(x => x.department_id == form.department_id)"
              :key="e.id"
              :value="e"
              class="text-slate-700"
            >
              {{ e.first_name }} {{ e.last_name }}
            </option>
          </select>
        </div>

        <!-- Month -->
        <div class="space-y-2">
          <label class="text-sm font-semibold text-slate-700 tracking-wide">Month</label>
          <select
            v-model="form.month"
            class="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-slate-400 text-slate-700 shadow-sm hover:border-slate-400"
          >
            <option value="" class="text-slate-400">Select Month</option>
            <option
              v-for="m in months"
              :key="m.id"
              :value="m.label"
              class="text-slate-700"
            >
              {{ m.label }}
            </option>
          </select>
        </div>

        <!-- Year -->
        <div class="space-y-2">
          <label class="text-sm font-semibold text-slate-700 tracking-wide">Year</label>
          <input
            v-model="form.year"
            type="number"
            placeholder="Enter year (e.g., 2024)"
            class="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-slate-400 text-slate-700 shadow-sm hover:border-slate-400"
          />
        </div>

        <!-- Holidays -->
        <div class="space-y-2">
          <label class="text-sm font-semibold text-slate-700 tracking-wide">Holidays</label>
          <input
            v-model="form.holidays"
            type="number"
            placeholder="Number of holidays"
            class="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-slate-400 text-slate-700 shadow-sm hover:border-slate-400"
          />
        </div>
      </div>

      <!-- Action -->
      <div class="flex justify-end mt-6">
        <button
          @click="getEmployeeReport()"
          class="px-8 py-3 rounded-2xl text-white font-semibold
                 bg-gradient-to-r from-blue-600 to-indigo-600
                 hover:scale-105 transition shadow-xl"
        >
          Get Salary Info
        </button>
      </div>

      <!-- Attendance -->
      <div v-if="employeeReport && form.employee" class="mt-10 space-y-8">

        <h2 class="section-title">
          📊 Attendance Overview
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="stat-card blue">Attendance {{ employeeReport.total_attendance }}</div>
          <div class="stat-card blue">Leaves {{ employeeReport.total_leave }}</div>
          <div class="stat-card blue">Working Days {{ getMonthsWorkingDays }}</div>
          <div class="stat-card blue">Holidays {{ form.holidays }}</div>
          <div class="stat-card blue">Login Hours {{ employeeReport.formatted_total }}</div>
          <div class="stat-card blue">Task Hours {{ employeeReport.total_task_hours }}</div>
          <div class="stat-card blue">
            Monthly Hours {{ (getMonthsWorkingDays - form.holidays) * 8 }}
          </div>
        </div>

        <!-- Salary -->
        <h2 class="section-title">
          💰 Salary Breakdown
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="stat-card green">Basic {{ form.employee.salary }} TK</div>
          <div class="stat-card green">Type {{ form.employee.salary_type }}</div>
          <div class="stat-card green">Hourly {{ form.hourly_salary }} TK</div>
          <div class="stat-card green">Total {{ form.salary }} TK</div>

          <div class="md:col-span-4 bg-emerald-100 rounded-2xl p-5">
            <label class="font-bold text-gray-700">Final Salary</label>
            <input
              v-model="form.salary"
              type="number"
              class="mt-3 w-1/4 input-glass"
            />
          </div>
        </div>
      </div>

      <!-- Footer -->
      <template #footer>
        <div class="flex justify-center py-8">
          <button
            @click="generateSalary()"
            class="px-12 py-4 rounded-2xl text-white font-bold text-lg
                   bg-gradient-to-r from-emerald-600 to-green-600
                   hover:scale-105 transition shadow-2xl"
          >
             Generate Salary
          </button>
        </div>
      </template>
    </CardBox>
  </SectionMain>
</template>


<script setup>
import { computed, onMounted, ref } from 'vue'
import { mdiAccount, mdiAccountMultiplePlus, mdiArrowLeft } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'

import { useHRM } from '@/composables/useHRM'

// import { useToast } from 'vue-toast-notification'
// import 'vue-toast-notification/dist/theme-sugar.css'
// import Loader from '@/components/Loader.vue'
import { useRouter } from 'vue-router'
import moment from 'moment'
import { Link } from 'lucide-vue-next'
import api from '@/config/api'

// const $toast = useToast()
const loaderCalls = ref(false)
const loading = ref(false)
const selectDepartment = ref([])
const selectPosition = ref([])
const router = useRouter()
const employeeList = ref([])

const { hrmApi } = useHRM()

// Back button
const goBack = () => {
  router.back()
}

const months = [
  { id: 1, label: 'January' },
  { id: 2, label: 'February' },
  { id: 3, label: 'March' },
  { id: 4, label: 'April' },
  { id: 5, label: 'May' },
  { id: 6, label: 'June' },
  { id: 7, label: 'July' },
  { id: 8, label: 'August' },
  { id: 9, label: 'September' },
  { id: 10, label: 'October' },
  { id: 11, label: 'November' },
  { id: 12, label: 'December' }
]

const position_list = async () => {
  try {
    const { data } = await hrmApi.get('position')
    selectPosition.value = data.data
  } catch (error) {
    console.error(error.message)
  }
}

const department_list = async () => {
  try {
    const { data } = await hrmApi.get('department')
    selectDepartment.value = data.data
  } catch (error) {
    console.error(error.message)
  }
}

const selectRoles = [
  { id: 1, label: 'Employee', value: 'employee' },
  { id: 2, label: 'Project Manager', value: 'project_manager' }
]

const selectCountry = [
  { id: 1, label: 'USA'},
  { id: 2, label: 'Bangladesh'}
]

const selectSalaryType = [
  { id: 1, label: 'Hourly' },
  { id: 2, label: 'Daily' },
  { id: 3, label: 'Weekly' },
  { id: 4, label: 'Monthly' },
]
const getMonthsWorkingDays = computed(() => {
  const daysInMonth = moment((`${form.value.year}-${form.value.month}`)).daysInMonth()
  let workingDays = 0
  console.log(daysInMonth)
  for (let day = 1; day <= daysInMonth; day++) {
    const date =moment((`${form.value.year}-${form.value.month}-${day}`))
    const dayOfWeek = date.day()

    // Skip Friday (5) and Thursday (4)
    if (dayOfWeek !== 5 && dayOfWeek !== 4) {
      workingDays++
    }
  }

  return workingDays
})
const employeeType = [
  { id: 1, label: 'Full-Time' },
  { id: 2, label: 'Part-Time' },
  { id: 3, label: 'Consultant' },
  { id: 4, label: 'Sub-Contractor' },
]
const employeeReport = ref()
const form = ref({
  first_name: '',
  employee:null,
  last_name: '',
  email: '',
  role: '',
  type: '',
  employee_uid: '',
  department_id: '',
  position_id: '',
  designation: 'test',
  joined_at: '',
  hired_form: '',
  hourly_salary: 0,
  net_payable: 0,
  salary_type: '',
  salary: 0,
  holidays:0,
  month: moment().month() ,
  year: moment().year(),
})

const resetForm = () => {
  form.value = {
    first_name: '',
    last_name: '',
    email: '',
    role: '',
    type: '',
    employee_uid: '',
    department_id: '',
    position_id: '',
    hired_form: '',
    salary_type: '',
    salary: 0,

    designation: 'test'
  }
}

const handleSubmit = async () => {
  loading.value = true
  try {
    const response = await api().post('employee', form.value)
    let instance = $toast.success('New Employee Added!')

    resetForm()
    instance.success
  } catch (error) {
    let instance = $toast.error('Failed!')
    console.error(error, 'here the error ')
    instance.error
  }
  loading.value = false
}

const getEmployeeReport = async (id) => {
  let startDate = moment(`${form.value.year}-${form.value.month}`).startOf('month').format('YYYY-MM-DD')
  let endDate = moment(`${form.value.year}-${form.value.month}`).endOf('month').format('YYYY-MM-DD')
  try {
    const { data } = await hrmApi.get(
      `month-report-of-user/${form.value.employee.user_id}/${startDate}/${endDate}`
    )
    employeeReport.value = data
    form.value.hourly_salary = Math.round(form.value.employee.salary / ((getMonthsWorkingDays.value-form.value.holidays)*(form.value.employee.type === 'Full-Time' ? 8 : form.value.employee.type === 'Part-Time' ? 4 : 0)))


    form.value.salary = Math.round((employeeReport.value.total_login_hours + (employeeReport.value.total_leave * (form.value.employee.type === 'Full-Time' ? 8 : form.value.employee.type === 'Part-Time' ? 4 : 0))) * (form.value.employee.salary / ((getMonthsWorkingDays.value - form.value.holidays) * (form.value.employee.type === 'Full-Time' ? 8 : form.value.employee.type === 'Part-Time' ? 4 : 0))))
    form.value.net_payable = form.value.salary
  } catch (error) {
    console.error(error, 'here the error ')
  }
}


const getAllEmployee = async () => {
  try {
    const { data } = await hrmApi.get('employee')
    employeeList.value = data.data
  } catch (error) {
    console.error(error, 'here the error ')
  }
}

const generateSalary = async () => {
  let salaryData = {
    employee_id: form.value.employee.id,
    salary_month: form.value.month,
    salary_year: form.value.year,
    salary_hour : employeeReport.value.total_login_hours,
    salary_rate : form.value.hourly_salary,
    total_salary :  form.value.salary,
    monthly_salary :  form.value.employee.salary,
    net_payable: form.value.net_payable,
    total_working_days: employeeReport.value.total_attendance,
    hours: employeeReport.value.total_task_hours,

  }
  try {
    const { data } = await hrmApi.post('employee-salary', salaryData)
    let instance = $toast.success('Salary Generated!')
    resetForm()
    instance.success
  } catch (error) {
    let instance = $toast.error('Failed!')
    console.error(error, 'here the error ')
    instance.error
  }
}
onMounted(async () => {
  getAllEmployee()
  department_list()
  position_list()
})
</script>
<style>
.input-glass {
  @apply w-full rounded-xl px-4 py-3
         bg-white/70 backdrop-blur-md
         border border-white
         focus:ring-2 focus:ring-blue-300
         outline-none;
}

.section-title {
  @apply text-2xl font-extrabold text-gray-700
         border-b pb-2;
}

.stat-card {
  @apply rounded-2xl p-5 text-lg font-semibold
         shadow-lg hover:shadow-xl transition
         hover:-translate-y-1;
}

.stat-card.blue {
  @apply bg-gradient-to-br from-blue-100 to-blue-200 text-blue-900;
}

.stat-card.green {
  @apply bg-gradient-to-br from-emerald-100 to-green-200 text-green-900;
}

</style>
