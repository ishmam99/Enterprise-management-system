<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import moment from 'moment'
// import jsPDF from 'jspdf'
// import autoTable from 'jspdf-autotable'
import { debounce } from 'lodash'
import SectionMain from "@/components/SectionMain.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { mdiAccountMultiple, mdiEye, mdiCloseBox, mdiClipboardEdit } from "@mdi/js";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxComponentTitle from "@/components/CardBoxComponentTitle.vue";
import FormControl from "@/components/FormControl.vue";
import { useHRM } from '@/composables/useHRM'

// State
const { hrmApi } = useHRM()
const router = useRouter()
const loader = ref(false)
const searchQuery = ref('')
const filteredResults = ref([])
const currentDate = ref(moment())
const salaryDisbursement = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(10)
const loaderCalls = ref(false)
// Data fetching
const getSalaryDisbursement = async (month, year) => {
  loader.value = true
  try {
    const { data } = await hrmApi.get(`salary-by-month?month=${month}&year=${year}`)
    salaryDisbursement.value = data.data
    filteredResults.value = [...salaryDisbursement.value]
  } catch (error) {
    console.error('Error fetching salary data:', error)
  } finally {
    loader.value = false
  }
}

// Month navigation
// Month navigation
const previousMonth = () => {
  currentDate.value = moment(currentDate.value).subtract(1, 'month')
  monthSetup()
}

const nextMonth = () => {
  currentDate.value = moment(currentDate.value).add(1, 'month')
  monthSetup()
}

const monthSetup = () => {
  const month = currentDate.value.format('MMMM')
  const year = currentDate.value.format('YYYY')
  getSalaryDisbursement(month, year)
}

// Search functionality
const filterResults = debounce(() => {
  if (!searchQuery.value) {
    filteredResults.value = [...salaryDisbursement.value]
    return
  }

  const query = searchQuery.value.toLowerCase()
  filteredResults.value = salaryDisbursement.value.filter(salary => 
    (salary.employee_name?.toLowerCase().includes(query)) ||
    (salary.employee_uid?.toLowerCase().includes(query)) ||
    (salary.position?.toLowerCase().includes(query)) ||
    (salary.account_no?.toLowerCase().includes(query))
  )
}, 300)

// Computed properties
const displayedSalaries = computed(() => 
  searchQuery.value ? filteredResults.value : salaryDisbursement.value
)

const totals = computed(() => {
  return displayedSalaries.value.reduce((acc, salary) => {
    acc.monthly += parseFloat(salary?.monthly_salary) || 0
    acc.netPayable += parseFloat(salary?.net_payable) || 0
    return acc
  }, { monthly: 0, netPayable: 0 })
})

const paymentStats = computed(() => {
  return displayedSalaries.value.reduce((stats, salary) => {
    salary.payment_status === 'Paid' ? stats.paid++ : stats.pending++
    return stats
  }, { paid: 0, pending: 0 })
})

// PDF Export
const downloadPDF = () => {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
  const data = displayedSalaries.value

  const pdfMonthlyTotal = totals.value.monthly
  const pdfNetPayableTotal = totals.value.netPayable
  
  // Title
  doc.setFontSize(16)
  doc.setTextColor(0, 0, 0)
  doc.setFont('helvetica', 'bold')
  doc.text(`Monthly Payment Status - ${currentDate.value.format('MMMM YYYY')}`, 148, 10, { align: 'center' })

   // Summary section
   doc.setFontSize(12)
  doc.text(
    `Total Monthly Salary: ${pdfMonthlyTotal.toLocaleString()} BDT | Total Net Payable: ${pdfNetPayableTotal.toLocaleString()} BDT`,
    148,
    18,  // Position below main title
    { align: 'center' }
  )

  // Summary
  doc.setFontSize(10)
  doc.text(`Total Employees: ${data.length} | Paid: ${paymentStats.value.paid} | Pending: ${paymentStats.value.pending}`, 148, 25, { align: 'center' })

  // Table
  autoTable(doc, {
    head: [
      ['#', 'Name', 'Employee ID', 'A/C No', 'Payment Type', 'Month', 'Designation', 
       'Monthly Salary', 'Hours', 'Rate', 'Working Days', 'Net Payable', 'Payment Date', 'Status']
    ],
    body: data.map((item, index) => [
      index + 1,
      item.employee_name,
      item.employee_uid,
      item.account_no || 'N/A',
      item.payment_type || 'N/A',
      `${item.salary_month} ${item.salary_year}`,
      item.position,
      item.monthly_salary?.toLocaleString(),
      item.hours,
      item.salary_rate,
      item.total_working_days,
      item.net_payable?.toLocaleString(),
      item.payment_date || 'N/A',
      item.payment_status || 'Pending'
    ]),
    startY: 30,
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: 'bold'
    },
    columnStyles: {
      7: { halign: 'right' },  // Monthly Salary
      11: { halign: 'right' }  // Net Payable
    },
    styles: {
      fontSize: 8,
      cellPadding: 3,
      overflow: 'linebreak'
    },
    didDrawPage: (data) => {
      if (data.pageCount === data.pageNumber) {
        const finalY = Math.max(data.cursor.y + 10, 180)
        
        // Add totals
        doc.setFontSize(10)
        doc.setFont('helvetica', 'bold')
        doc.text(`Total Monthly Salary: ${totals.value.monthly.toLocaleString()} BDT`, 20, finalY)
        doc.text(`Total Net Payable: ${totals.value.netPayable.toLocaleString()} BDT`, 20, finalY + 8)
      }
    }
  })

     // Add footer
     doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text(
    `Generated on ${moment().format('DD-MM-YYYY HH:mm')}`,
    148,
    doc.internal.pageSize.height - 10,
    { align: "center" }
  );

  doc.save(`payment-status-${currentDate.value.format('YYYY-MM')}.pdf`)
}

// Initial load
onMounted(monthSetup)
</script>

<template>
  <SectionMain class="mx-10">
        <!-- Header -->
        <SectionTitleLineWithButton
        :icon="mdiAccountMultiple"
        class="bg-cyan-500 py-3 rounded-2xl px-3 font-semibold text-white"
        :title="`Monthly Payment Status - ${currentDate.format('MMMM YYYY')}`"
        main
      >
        <div class="text-left flex items-center mb-2 gap-2">
          <p
            class="flex gap-1 items-center rounded-full ps-2 pr-3 py-1 cursor-pointer text-white bg-[#4653dd] hover:bg-[#4653dde7]"
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
          <button
          class="flex gap-1 items-center rounded-full ps-2 pr-3 py-1 cursor-pointer text-white bg-green-600 hover:bg-green-700"
            @click="downloadPDF"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
            >
              <path d="M12 16L16 11H13V4H11V11H8L12 16ZM21 18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18V15H5V17H19V15H21V18Z"></path>
            </svg>
            Generate Report
          </button>
        </div>
        
      </SectionTitleLineWithButton>

      <SectionTitleLineWithButton
      class="bg-teal-500 py-2 flex gap-3 items-center !justify-center rounded-2xl px-3 font-semibold text-white"
    >
      <BaseButton
        color="warning"
        :disabled="loaderCalls"
        label="Prev Month"
        @click="previousMonth()"
      />
      <h1 class="text-lg w-32 text-center text-nowrap">
        {{ moment(currentDate).format('MMMM YYYY') }}
      </h1>
      <BaseButton color="info" label="Next Month" :disabled="loaderCalls" @click="nextMonth()" />
    </SectionTitleLineWithButton>
    
        <div class="flex justify-center gap-3 mb-6">
          <FormControl
             v-model="searchQuery" 
             class="w-full"
             type="text"
             placeholder="Search by Employee Name..."
            @input="filterResults"
          />
          <BaseButton class="w-1/6" color="info" label="Search" @click="filterResults" />
          <BaseButton 
            v-if="searchQuery"
            class="w-1/6" 
            color="danger" 
            label="Clear" 
            @click="searchQuery = ''" 
          />
        </div>

    <!-- Data Table -->
    <CardBox has-table>
      <div class="overflow-x-auto">
        <table class="w-full border-2 border-gray-200 shadow-xl">
          <thead class="bg-blue-500 text-white">
            <tr>
              <th class="p-2 border">#</th>
              <th class="p-2 border">Name</th>
              <th class="p-2 border">Employee ID</th>
              <th class="p-2 border">A/C No</th>
              <th class="p-2 border">Payment Type</th>
              <th class="p-2 border">Month</th>
              <th class="p-2 border">Designation</th>
              <th class="p-2 border text-right">Monthly Salary</th>
              <th class="p-2 border text-right">Hours</th>
              <th class="p-2 border text-right">Rate</th>
              <th class="p-2 border text-right">Working Days</th>
              <th class="p-2 border text-right">Net Payable</th>
              <th class="p-2 border">Payment Date</th>
              <th class="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loader">
              <td colspan="14" class="p-4 text-center">
                <div class="flex justify-center items-center gap-2">
                  <span class="loading loading-bars"></span>
                  Loading...
                </div>
              </td>
            </tr>
            <tr v-else-if="displayedSalaries.length === 0">
              <td colspan="14" class="p-4 text-center">No records found</td>
            </tr>
            <tr 
              v-for="(salary, index) in displayedSalaries" 
              :key="salary.id"
              :class="{'bg-red-50': salary.payment_status !== 'Paid'}"
              class="border-t hover:bg-gray-50"
            >
              <td class="p-2 border">{{ index + 1 }}</td>
              <td class="p-2 border">{{ salary.employee_name }}</td>
              <td class="p-2 border">{{ salary.employee_uid }}</td>
              <td class="p-2 border">{{ salary.account_no || 'N/A' }}</td>
              <td class="p-2 border">{{ salary.payment_type || 'N/A' }}</td>
              <td class="p-2 border">{{ salary.salary_month }} {{ salary.salary_year }}</td>
              <td class="p-2 border">{{ salary.position }}</td>
              <td class="p-2 border text-right">{{ salary.monthly_salary?.toLocaleString() }}</td>
              <td class="p-2 border text-right">{{ salary.hours }}</td>
              <td class="p-2 border text-right">{{ salary.salary_rate }}</td>
              <td class="p-2 border text-right">{{ salary.total_working_days }}</td>
              <td class="p-2 border text-right">{{ salary.net_payable?.toLocaleString() }}</td>
              <td class="p-2 border">{{ salary.payment_date || 'N/A' }}</td>
              <td class="p-2 border font-semibold" 
                  :class="{'text-green-600': salary.payment_status === 'Paid', 'text-red-600': salary.payment_status !== 'Paid'}">
                {{ salary.payment_status || 'Pending' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </CardBox>

    <!-- Totals -->
    <div class="mt-4 bg-gray-100 p-4 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="text-center">
        <div class="font-bold">Employees</div>
        <div class="text-xl">{{ displayedSalaries.length }}</div>
      </div>
      <div class="text-center">
        <div class="font-bold">Total Monthly Salary</div>
        <div class="text-xl">{{ totals.monthly.toLocaleString() }} BDT</div>
      </div>
      <div class="text-center">
        <div class="font-bold">Total Net Payable</div>
        <div class="text-xl">{{ totals.netPayable.toLocaleString() }} BDT</div>
      </div>
    </div>
  </SectionMain>
</template>