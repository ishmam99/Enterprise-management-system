<template>
  <SectionMain class="mx-10">
    <!-- Page Title and Navigation -->
    <SectionTitleLineWithButton
      :icon="mdiAccountMultiple"
      class="bg-cyan-500 py-2 rounded-2xl px-4 font-semibold text-white shadow-lg"
      title="Employee Payment History Details"
      main
    >
      <div class="text-left flex items-center mb-2">
        <button
          class="flex gap-1 items-center rounded-full ps-2 pr-3 py-1 cursor-pointer text-white bg-[#4653dd] hover:bg-[#3a46c2] transition-all"
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
            ></path>
          </svg>
          Back
        </button>
      </div>
    </SectionTitleLineWithButton>
    <!-- {{ employeePaymentStatus }} -->
    <!-- Employee Details Card -->
    <CardBox class="mb-6 bg-white rounded-xl shadow-md overflow-hidden">
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <p class="text-sm text-gray-500 font-medium">Employee Name</p>
            <p class="text-lg font-semibold text-gray-800">
              {{ employeeDataList.first_name + ' ' + employeeDataList.last_name }}
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500 font-medium">Employee ID</p>
            <p class="text-lg font-semibold text-gray-800">{{ employeeDataList.employee_uid }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 font-medium">Designation</p>
            <p class="text-lg font-semibold text-gray-800">{{ employeeDataList.position_name }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 font-medium">Department</p>
            <p class="text-lg font-semibold text-gray-800">
              {{ employeeDataList.department_name }}
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500 font-medium">Salary</p>
            <p class="text-lg font-semibold text-gray-800">
              {{ employeeDataList.salary }} ({{ employeeDataList.salary_type }})
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500 font-medium">Joined At</p>
            <p class="text-lg font-semibold text-gray-800">{{ employeeDataList.joined_at }}</p>
          </div>
        </div>
      </div>
    </CardBox>

    <!-- Payment History Table -->
    <CardBox class="bg-white rounded-xl shadow-md overflow-hidden">
      <div class="p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Payment History</h2>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-blue-500 text-white">
            <tr>
              <th class="px-4 py-3 text-left font-semibold uppercase tracking-wider">Month/Year</th>
              <th class="px-4 py-3 text-left font-semibold uppercase tracking-wider">
                Payment Details
              </th>
              <th class="px-4 py-3 text-left font-semibold uppercase tracking-wider">
                Working Days/Hours
              </th>
              <th class="px-4 py-3 text-left font-semibold uppercase tracking-wider">
                Salary Calculation
              </th>
              <th class="px-4 py-3 text-left font-semibold uppercase tracking-wider">
                Payment Info
              </th>
              <th class="px-4 py-3 text-left font-semibold uppercase tracking-wider">Status</th>
              <th class="px-4 py-3 text-left font-semibold uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="loader">
              <td class="text-center animate-pulse" colspan="10">
                <div
                  class="py-10 flex items-center justify-center gap-2 text-xl font-semibold mx-auto"
                >
                  <span class="loading loading-bars"></span>
                  <span>Loading...</span>
                </div>
              </td>
            </tr>
            <tr v-else-if="employeePaymentStatus.length == 0">
              <td class="text-center animate-pulse" colspan="10">
                <div
                  class="py-10 flex items-center justify-center gap-2 text-xl font-semibold mx-auto"
                >
                  No Data
                </div>
              </td>
            </tr>
            <tr
              class="hover:bg-gray-50 transition-all"
              v-for="(payment, idx) in employeePaymentStatus"
              :key="idx"
            >
              <!-- Month/Year Column -->
              <td class="px-4 py-4">
                <div class="font-medium text-gray-900">
                  {{ payment.salary_month }} {{ payment.salary_year }}
                </div>
                <div class="text-sm text-gray-500">
                  Payment Date: {{ payment.payment_date || 'N/A' }}
                </div>
              </td>

              <!-- Payment Details Column -->
              <td class="px-4 py-4">
                <div class="text-sm">
                  <span class="font-medium">Employee ID:</span> {{ payment.employee_uid }}
                </div>
                <div class="text-sm">
                  <span class="font-medium">Name:</span> {{ payment.employee_name }}
                </div>
              </td>

              <!-- Working Days/Hours Column -->
              <td class="px-4 py-4">
                <div class="text-sm">
                  <span class="font-medium">Days:</span> {{ payment.total_working_days }}
                </div>
                <div class="text-sm">
                  <span class="font-medium">Hours:</span> {{ payment.hours }}
                </div>
                <div class="text-sm">
                  <span class="font-medium">Hourly Rate:</span> {{ payment.salary_rate }}
                </div>
              </td>

              <!-- Salary Calculation Column -->
              <td class="px-4 py-4">
                <div class="text-sm">
                  <span class="font-medium">Monthly Salary:</span> {{ payment.monthly_salary }}
                </div>
                <div class="text-sm">
                  <span class="font-medium">Calculated Salary:</span> {{ payment.total_salary }}
                </div>
                <div class="text-sm">
                  <span class="font-medium">Hourly Salary:</span> {{ payment.salary_hour }}
                </div>
              </td>

              <!-- Payment Info Column -->
              <td class="px-4 py-4">
                <div class="text-sm">
                  <span class="font-medium">Account:</span> {{ payment.account_no || 'N/A' }}
                </div>
                <div class="text-sm">
                  <span class="font-medium">Method:</span> {{ payment.payment_type || 'N/A' }}
                </div>
                <div class="text-sm">
                  <span class="font-medium">Paid By:</span> {{ payment.payment_by || 'N/A' }}
                </div>
              </td>

              <!-- Status Column -->
              <td class="px-4 py-4">
                <span
                  :class="getStatusClasses(payment.payment_status)"
                  class="inline-flex items-center px-6 py-1 rounded-full font-semibold"
                >
                  {{ payment.payment_status || 'Pending' }}
                </span>
              </td>
              <!-- Status Column -->
              <td class="px-4 py-4 text-center">
                <div class="flex gap-2 justify-center items-center">
                  <router-link
                    :to="{ name: 'Accounts_Salary_Disbursement', params: { salaryId: payment.id } }"
                    class="text-white bg-sky-500 px-6 py-1 font-semibold rounded-full hover:text-gray-200 transition-all duration-300"
                  >
                    Edit
                  </router-link>
                  <button
                    class="text-white bg-red-500 px-6 py-1 font-semibold rounded-full hover:text-gray-200 transition-all duration-300"
                    @click="deletePayment(payment.id)"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </CardBox>
  </SectionMain>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { mdiAccountMultiple } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import CardBox from '@/components/CardBox.vue'
import Swal from 'sweetalert2'
import { useHRM } from '@/composables/useHRM'

const { hrmApi } = useHRM()
const router = useRouter()
const route = useRoute()
const loader = ref(false)
const employeeDataList = ref({})
const paymentHistory = ref([])
const employeeId = ref(route.params.id)
const employeePaymentStatus = ref([])
const getEmployeePaymentStatus = async () => {
  loader.value = true
  try {
    const { data } = await hrmApi.get(`employee-all-salary/${employeeId.value}`)
    employeePaymentStatus.value = data.data
  } catch (error) {
    console.error(error, 'Error fetching salary disbursement data')
  } finally {
    loader.value = false
  }
}

// Fetch employee data
const getAllEmployee = async () => {
  try {
    const { data } = await hrmApi.get(`employee/${employeeId.value}`)
    employeeDataList.value = data
  } catch (error) {
    console.error('Error fetching employee data:', error)
  }
}

const deletePayment = async (paymentId) => {
  try {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })

    if (result.isConfirmed) {
      await api().delete(`employee-salary/${paymentId}`)

      Swal.fire('Deleted!', 'The payment record has been deleted.', 'success')

      // Refresh the payment status list
      getEmployeePaymentStatus()
    }
  } catch (error) {
    console.error('Error deleting payment:', error)
    Swal.fire('Error!', 'There was an error deleting the payment record.', 'error')
  }
}

const getStatusClasses = (status) => {
  switch (status) {
    case 'Paid':
      return 'bg-green-500 text-white'
    case 'Pending':
      return 'bg-yellow-500 text-white'
    case 'Rejected':
      return 'bg-red-500 text-white'
    default:
      return 'bg-gray-500 text-white'
  }
}

// Go back to the previous page
const goBack = () => {
  router.back()
}

onMounted(() => {
  getAllEmployee()
  getEmployeePaymentStatus()
})
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #0000002a;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
