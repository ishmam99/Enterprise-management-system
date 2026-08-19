<template>
  <SectionMain class="mx-10">
    <Loader v-if="loaderCalls == true" />
    <SectionTitleLineWithButton
      :icon="mdiAccountMultiplePlus"
      class="bg-green-500 py-3 rounded-2xl px-3 font-semibold text-white"
      title="Manually Generate Salary"
      main
    >
      <div class="text-left flex items-center mb-2">
        <p
          class="flex gap-1 items-center rounded-full ps-2 pr-3 py-1 cursor-pointer text-white bg-[#4653dd]"
          @click="goBack"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path
              d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20ZM12 11H16V13H12V16L8 12L12 8V11Z"
            ></path></svg          >Back
        </p>
      </div>
    </SectionTitleLineWithButton>

    <CardBox form @submit.prevent="handleSubmit()" class="shadow-2xl">

      <div class="grid grid-cols-4 w-full py-3 gap-4">

        <div class="space-y-1">

       <label for="uid" class="font-bold">Select Department</label>

          <select
            id="department"
            v-model="form.department_id"
            name="department"
            class="rounded py-3 w-full"
            placeholder="Select Department"
          >

            <option
              v-for="department in selectDepartment"
              :key="department.department_id"
              :value="department.department_id"
            >
              {{ department.department_name }}
            </option>
          </select>
        </div>
     <div class="space-y-1">

       <label for="uid" class="font-bold">Select Employee Name</label>
        <select id="role"  v-model="form.employee_id" name="role" class="rounded py-3 w-full">
          <option value="">Select Employee</option>
            <option v-if="employeeList.length > 0" v-for="employee in employeeList.filter(e=>e.department_id == form.department_id)" :key="employee.id" :value="employee.id">
              {{ employee.first_name }} {{ employee.last_name }}
            </option>
          </select>
        </div>
      <div class="space-y-1">

       <label for="uid" class="font-bold">Select Month</label>
        <select id="role" v-model="form.salary_month" name="role" class="rounded py-3 w-full">
          <option value="">Select Month</option>
            <option v-for="month in months" :key="month.id" :value="month.label">
              {{ month.label }}
            </option>
          </select>
        </div>
        <div class="space-y-1">

       <label for="uid" class="font-bold">Enter Year</label>

         <input
            id="salary"
            v-model="form.salary_year"
            maxlength="4"
            minlength="4"
            type="number"
            name="salary"
            class="py-3 rounded w-full"
            placeholder="Enter Year"
          />
        </div>

        <div class="space-y-1">

       <label for="uid" class="font-bold">Enter Month Working Days</label>
          <input
            id="salary"
            v-model="form.total_working_days"

            type="number"
            name="salary"
            class="py-3 rounded w-full"
            placeholder="Working days"
          />
        </div>
        <div class="space-y-1">

       <label for="uid" class="font-bold">Enter Total Hours</label>
          <input
            id="salary"
            v-model="form.salary_hour"

            type="number"
            name="salary"
            class="py-3 rounded w-full"
            placeholder="Enter Total Hours"
          />
        </div>
        <div class="space-y-1">

       <label for="uid" class="font-bold">Enter Total Task Hours</label>
          <input
            id="salary"
            v-model="form.hours"

            type="number"
            name="salary"
            class="py-3 rounded w-full"
            placeholder="Enter Total Task Hours"
          />
        </div>
        <div class="space-y-1">

       <label for="uid" class="font-bold">Enter Hourly Rate</label>
          <input
            id="salary"
            v-model="form.salary_rate"

            type="number"
            name="salary"
            class="py-3 rounded w-full"
            placeholder="Enter Hourly Rate"
          />
        </div>
        <div class="space-y-1">

       <label for="uid" class="font-bold">Employees Salary</label>
          <input
            id="salary"
            v-model="form.monthly_salary"

            type="number"
            name="salary"
            class="py-3 rounded w-full"
            placeholder="Employees Salary"
          />
        </div>
        <div class="space-y-1">

       <label for="uid" class="font-bold">Enter Payable Amount</label>
          <input
            id="salary"
            v-model="form.net_payable"

            type="number"
            name="salary"
            class="py-3 rounded w-full"
            placeholder="Enter Payable Amount"
          />
        </div>
        <div class="space-y-1">

       <label for="uid" class="font-bold">Enter Paid Amount</label>
          <input
            id="salary"
            v-model="form.total_salary"

            type="number"
            name="salary"
            class="py-3 rounded w-full"
            placeholder="Enter Paid Amount"
          />
        </div>
        <div class="space-y-1">

       <label for="uid" class="font-bold">Enter Payment Type</label>
           <select id="role" v-model="form.payment_type" name="role" class="rounded py-3 w-full">
          <option value="">Select Payment Types</option>
          <option value="DBBL">DBBL</option>
          <option value="Check Deposite">Check Deposite</option>
          <option value="Bkash">Bkash</option>
          <option value="Nagad">Nagad</option>
          <option value="Other">Other</option>

          </select>
        </div>
        <div class="space-y-1">

       <label for="uid" class="font-bold">Enter Account NO</label>
          <input
            id="salary"
            v-model="form.account_no"

            type="text"
            name="salary"
            class="py-3 rounded w-full"
            placeholder="Enter Account NO"
          />
        </div>
        <div class="space-y-1">

       <label for="uid" class="font-bold">Enter Payment Date</label>
          <input
            id="salary"
            v-model="form.payment_date"

            type="date"
            name="salary"
            class="py-3 rounded w-full"
            placeholder="Enter Payment Date"
          />
        </div>
        <div class="space-y-1">

       <label for="uid" class="font-bold">Select Payment By</label>
          <select id="role"  v-model="form.payment_by" name="role" class="rounded py-3 w-full">
          <option value="">Select Employee</option>
            <option v-if="employeeList.length > 0" v-for="employee in employeeList.filter(e=>e.department_name == 'HRA')" :key="employee.id" :value="employee.user_id">
              {{ employee.first_name }} {{ employee.last_name }}
            </option>
          </select>
        </div>
        <div class="space-y-1">

       <label for="uid" class="font-bold">Enter Payment Status</label>
          <select id="role" v-model="form.payment_status" name="role" class="rounded py-3 w-full">
          <option value="">Select Payment Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Paid">Paid</option>
          </select>
        </div>
      </div>



      <template #footer>
        <div class="flex w-full gap-5 justify-center px-5">
          <button
            @click="generateSalary()"
            class="px-2 w-32 py-2 bg-blue-600 text-white justify-center rounded flex gap-2 items-center"
          >
            <svg
              v-if="loading"
              xmlns="http://www.w3.org/2000/svg"
              class="animate-spin !m-0 w-5 h-5"
              viewBox="0 0 24 24"
              fill="rgba(255,255,255,1)"
            >
              <path
                d="M18.364 5.63604L16.9497 7.05025C15.683 5.7835 13.933 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12H21C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.4853 3 16.7353 4.00736 18.364 5.63604Z"
              ></path></svg            >Submit
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
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import Loader from '@/components/Loader.vue'
import { useRouter } from 'vue-router'
import moment from 'moment'

const $toast = useToast()
const loaderCalls = ref(false)
const loading = ref(false)
const selectDepartment = ref([])
const selectPosition = ref([])
const router = useRouter()
const employeeList = ref([])
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


const department_list = async () => {
  try {
    const { data } = await api().get('department')
    selectDepartment.value = data.data
  } catch (error) {
    console.error(error.message)
  }
}

const employeeReport = ref()
const form = ref({

  employee_id: '',
  salary_month: '',
  salary_year: '',
  salary_hour: '',
  salary_rate: '',
  total_salary: '',
  monthly_salary: '',
  net_payable: '',
  payment_by: '',
  total_working_days: '',
  hours: '',
  account_no: '',
  payment_type: '',
  payment_date: '',
  payment_status: '',


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



const getAllEmployee = async () => {
  try {
    const { data } = await api().get('employee')
    employeeList.value = data.data
  } catch (error) {
    console.error(error, 'here the error ')
  }
}

const generateSalary = async () => {

  try {
    const { data } = await api().post('employee-salary', form.value)
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
})
</script>
