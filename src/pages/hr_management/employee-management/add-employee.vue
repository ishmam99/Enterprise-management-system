<script setup>
import { onMounted, ref } from 'vue'
import { mdiAccount, mdiAccountMultiplePlus, mdiArrowLeft } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
// import { useToast } from 'vue-toast-notification'
// import 'vue-toast-notification/dist/theme-sugar.css'
// import Loader from '@/components/Loader.vue'
import { useRouter } from 'vue-router'
import { useHRM } from '@/composables/useHRM'
import Swal from 'sweetalert2'

const { hrmApi } = useHRM()
// const $toast = useToast()
const loaderCalls = ref(false)
const loading = ref(false)
const selectDepartment = ref([])
const selectPosition = ref([])
const router = useRouter()

// Back button
const goBack = () => {
  router.back()
}

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

const employeeType = [
  { id: 1, label: 'Full-Time' },
  { id: 2, label: 'Part-Time' },
  { id: 3, label: 'Consultant' },
  { id: 4, label: 'Sub-Contractor' },
]

const form = ref({
  first_name: '',
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
  salary_type: '',
  salary:'',
  status: '2'
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
    salary:'',
    designation: 'test'
  }
}

const handleSubmit = async () => {
  loading.value = true
  try {
    const response = await hrmApi.post('employee', form.value)
      if(response)
      {
        const htssResponse = await api().post('employees',form.value)
      }
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'New Employee Added!',
      confirmButtonColor: '#3085d6'
    })

    resetForm()
  } catch (error) {
    console.error(error, 'here the error ')
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Failed to add employee!',
      confirmButtonColor: '#d33'
    })
  }
  loading.value = false
}


onMounted(async () => {
  department_list()
  position_list()
})
</script>

<template>
  <SectionMain class="mx-10">
    <Loader v-if="loaderCalls == true" />
    <SectionTitleLineWithButton
      :icon="mdiAccountMultiplePlus"
      class="bg-cyan-500 py-3 rounded-2xl px-3 font-semibold text-white"
      title="Add Employee"
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
            ></path></svg
          >Back
        </p>
      </div>
    </SectionTitleLineWithButton>

    <CardBox form @submit.prevent="handleSubmit()" class="shadow-2xl">
      <FormField label="Employee Name">
        <FormControl v-model="form.first_name" :icon="mdiAccount" placeholder="First Name" />
        <FormControl v-model="form.last_name" :icon="mdiAccount" placeholder="Last Name" />
      </FormField>

      <div class="w-full flex gap-4">
        <div class="w-1/3 flex flex-col gap-2">
          <label for="uid" class="font-bold">Employee Uid</label>
          <input
            id="uid"
            v-model="form.employee_uid"
            type="text"
            name="uid"
            class="py-3 rounded"
            placeholder="1000XXX"
          />
        </div>
        <div class="w-1/3 flex flex-col gap-2">
          <label for="email" class="font-bold">Employee Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            name="email"
            class="py-3 rounded"
            placeholder="example@htbbd.com"
          />
        </div>

        <div class="w-1/3 flex flex-col gap-2 mb-4">
          <label for="role" class="font-bold">Roles</label>
          <select id="role" v-model="form.role" name="role" class="rounded py-3">
            <option v-for="role in selectRoles" :key="role.id" :value="role.value">
              {{ role.label }}
            </option>
          </select>
        </div>
      </div>

      <div class="w-full flex gap-4">
        <div class="w-1/3 flex flex-col gap-2">
          <label for="country" class="font-bold">Country</label>
          <select id="country" v-model="form.hired_form" name="country" class="rounded py-3">
            <option v-for="country in selectCountry" :key="country.id" :value="country.label">
              {{ country.label }}
            </option>
          </select>
        </div>
        <div class="w-1/3 flex flex-col gap-2">
          <label for="salaryType" class="font-bold">Salary Type</label>
          <select id="salaryType" v-model="form.salary_type" name="salaryType" class="rounded py-3">
            <option v-for="salaryType in selectSalaryType" :key="salaryType.id" :value="salaryType.label">
              {{ salaryType.label }}
            </option>
          </select>
        </div>

        <div class="w-1/3 flex flex-col gap-2">
          <label for="salary" class="font-bold">Salary</label>
          <input
            id="salary"
            v-model="form.salary"
            type="number"
            name="salary"
            class="py-3 rounded"
            placeholder="salary"
          />
        </div>
      </div>

      <div class="w-full flex gap-4 mt-2">
        <div class="w-1/2 flex flex-col gap-2 mb-4">
          <label for="type" class="font-bold">Employee Type</label>
          <select id="type" v-model="form.type" name="type" class="rounded py-3">
            <option v-for="type in employeeType" :key="type.id" :value="type.label">
              {{ type.label }}
            </option>
          </select>
        </div>

        <div class="w-1/2 flex flex-col gap-2 mb-4">
          <label for="department" class="font-bold">Department</label>
          <select
            id="department"
            v-model="form.department_id"
            name="department"
            class="rounded py-3"
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
      </div>

      <!-- {{ selectDepartment }} -->

      <div class="w-full flex gap-4">
        <div class="w-1/2 flex flex-col gap-2 mb-4">
          <label for="position" class="font-bold">Job Position</label>
          <select id="position" v-model="form.position_id" name="position" class="rounded py-3">
            <option v-for="position in selectPosition" :key="position.id" :value="position.id">
              {{ position.name }}
            </option>
          </select>
        </div>

        <div class="w-1/2 flex flex-col gap-2">
          <label for="date" class="font-bold">Joining Date</label>
          <input v-model="form.joined_at" type="date" class="py-3 rounded" />
        </div>
      </div>

      <template #footer>
        <div class="flex w-full gap-5 justify-center px-5">
          <button
            @click="handleSubmit()"
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
              ></path></svg
            >Submit
          </button>
        </div>
      </template>
    </CardBox>
  </SectionMain>
</template>
