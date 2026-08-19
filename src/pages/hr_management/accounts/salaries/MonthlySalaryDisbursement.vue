<script setup>
import { ref, computed, onMounted } from 'vue'
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
const loaderCalls = ref(false)
const searchQuery = ref('')
const filteredResults = ref([])
const currentDate = ref(moment())
const salaryDisbursement = ref([])
// Data fetching
const getSalaryDisbursement = async (month, year) => {
  loader.value = true
  try {
    const { data } = await hrmApi.get(`salary-by-month?month=${month}&year=${year}`)
    salaryDisbursement.value = data.data.filter(item => item?.payment_status != 'Paid')
    filteredResults.value = [...salaryDisbursement.value]
  } catch (error) {
    console.error('Error fetching salary data:', error)
  } finally {
    loader.value = false
  }
}

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
  loaderCalls.value = true
  const month = currentDate.value.format('MMMM')
  const year = currentDate.value.format('YYYY')
  getSalaryDisbursement(month, year)
  loaderCalls.value = false
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
    (salary.position?.toLowerCase().includes(query))
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

// PDF Export
const downloadPDF = () => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const data = displayedSalaries.value

  // Calculate totals for PDF (in case they differ from computed)
  const pdfMonthlyTotal = totals.value.monthly
  const pdfNetPayableTotal = totals.value.netPayable

  // Title
  doc.setFontSize(16)
  doc.setTextColor(0, 0, 0)
  doc.setFont('helvetica', 'bold')
  doc.text(`Salary Report - ${currentDate.value.format('MMMM YYYY')}`, 105, 15, { align: 'center' })

  // Summary section
  doc.setFontSize(12)
  doc.text(
    `Total Monthly Salary: ${pdfMonthlyTotal.toLocaleString()} BDT | Total Net Payable: ${pdfNetPayableTotal.toLocaleString()} BDT`,
    105,
    25,  // Position below main title
    { align: 'center' }
  )

  // Employee count
  doc.setFontSize(10)
  doc.text(`Employees: ${data.length}`, 105, 32, { align: 'center' })

  // Table
  autoTable(doc, {
    head: [
      ['#', 'Name', 'ID', 'Position', 'Monthly Salary', 'Hours', 'Rate', 'Days', 'Net Payable']
    ],
    body: data.map((item, index) => [
      index + 1,
      item.employee_name,
      item.employee_uid,
      item.position,
      item.monthly_salary ? parseFloat(item.monthly_salary).toLocaleString('en-US') : '0',
      item.hours || '0',
      item.salary_rate ? parseFloat(item.salary_rate).toFixed(2) : '0.00',
      `${item.total_working_days || '0'} days`,
      item.net_payable ? parseFloat(item.net_payable).toLocaleString('en-US') : '0'
    ]),
    startY: 40,  // Adjusted for the extra summary line
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: 'bold'
    },
    columnStyles: {
      4: { halign: 'right' },  // Monthly Salary
      8: { halign: 'right' }   // Net Payable
    },
    styles: {
      fontSize: 9,
      cellPadding: 3,
      overflow: 'linebreak'
    },
    didDrawPage: (data) => {
      if (data.pageCount === data.pageNumber) {
        const finalY = Math.max(data.cursor.y + 15, 280)

        // Add separator line
        doc.setDrawColor(200, 200, 200)
        doc.setLineWidth(0.5)
        doc.line(15, finalY - 10, 195, finalY - 10)

        // Add grand totals
        doc.setFontSize(12)
        doc.setFont('helvetica', 'bold')

        autoTable(doc, {
          startY: finalY,
          body: [
            [
              {
                content: 'GRAND TOTAL MONTHLY SALARY',
                styles: { fontStyle: 'bold', halign: 'left' }
              },
              {
                content: pdfMonthlyTotal.toLocaleString('en-US') + ' BDT',
                styles: { fontStyle: 'bold', halign: 'right' }
              }
            ],
            [
              {
                content: 'GRAND TOTAL NET PAYABLE',
                styles: { fontStyle: 'bold', halign: 'left' }
              },
              {
                content: pdfNetPayableTotal.toLocaleString('en-US') + ' BDT',
                styles: { fontStyle: 'bold', halign: 'right' }
              }
            ]
          ],
          styles: {
            cellPadding: 5
          },
          margin: { left: 15, right: 15 }
        })
      }
    }
  })

  // Footer
  doc.setFontSize(8)
  doc.setTextColor(100)
  doc.text(
    `Generated on ${moment().format('DD-MM-YYYY HH:mm')}`,
    105,
    doc.internal.pageSize.height - 10,
    { align: 'center' }
  )

     // Add footer
     doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text(
    `Generated on ${moment().format('DD-MM-YYYY HH:mm')}`,
    105,
    doc.internal.pageSize.height - 10,
    { align: "center" }
  );

  doc.save(`salary-report-${currentDate.value.format('YYYY-MM')}.pdf`)
}
const goToDisbursement= (salaryId) => {
  console.log('Received ID:', salaryId)
  // console.log('Received Data:', projectData);

  router.push({
    // path: `/htbis/view-project/${salaryId}`
    path: `/Accounts/Salary/Disbursement/${salaryId}`

  })
}

// Initial load
onMounted(() => {
  monthSetup()
})
</script>

<template>
  <SectionMain class="mx-10">
    <!-- Header -->
    <SectionTitleLineWithButton
    :icon="mdiAccountMultiple"
    class="bg-cyan-500 py-3 rounded-2xl px-3 font-semibold text-white"
    :title="`Monthly Salary Disbursement - ${currentDate.format('MMMM YYYY')}`"
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
    @click="previousMonth"
  />
  <h1 class="text-lg w-32 text-center text-nowrap">
    {{ currentDate.format('MMMM YYYY') }}
  </h1>
  <BaseButton
    color="info"
    label="Next Month"
    :disabled="loaderCalls"
    @click="nextMonth"
  />
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

<CardBox has-table class="w-full overflow-x-auto">
  <table class="w-full min-w-max border border-gray-200 shadow-xl">
    <thead class="bg-blue-600 text-white text-sm">
      <tr>
        <th class="p-3 border text-left">#</th>
        <th class="p-3 border text-left">Name</th>
        <th class="p-3 border text-left">ID</th>
        <th class="p-3 border text-left">Position</th>
        <th class="p-3 border text-right">Monthly</th>
        <th class="p-3 border text-right">Hours</th>
        <th class="p-3 border text-right">Rate</th>
        <th class="p-3 border text-right">Days</th>
        <th class="p-3 border text-right">Net Payable</th>
        <th class="p-3 border text-center">Disbursement</th>
      </tr>
    </thead>

    <tbody class="bg-white">
      <tr v-if="loader">
        <td colspan="10" class="p-6 text-center">
          <div class="flex justify-center items-center gap-2">
            <span class="loading loading-bars"></span>
            Loading...
          </div>
        </td>
      </tr>

      <tr v-else-if="displayedSalaries.length === 0">
        <td colspan="10" class="p-6 text-center text-gray-500">
          No records found
        </td>
      </tr>

      <tr
        v-for="(salary, index) in displayedSalaries"
        :key="salary.id"
        class="border-t hover:bg-blue-50 transition"
      >
        <td class="p-3">{{ index + 1 }}</td>
        <td class="p-3 font-medium">{{ salary.employee_name }}</td>
        <td class="p-3">{{ salary.employee_uid }}</td>
        <td class="p-3">{{ salary.position }}</td>
        <td class="p-3 text-right">{{ salary.monthly_salary?.toLocaleString() }}</td>
        <td class="p-3 text-right">{{ salary.hours }}</td>
        <td class="p-3 text-right">{{ salary.salary_rate }}</td>
        <td class="p-3 text-right">{{ salary.total_working_days }}</td>
        <td class="p-3 text-right font-semibold text-emerald-700">
          {{ salary.net_payable?.toLocaleString() }}
        </td>
        <td class="p-3 text-center">
          <button
            class="bg-teal-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold transition"
            @click="goToDisbursement(salary.id)"
          >
            Disbursement
          </button>
        </td>
      </tr>
    </tbody>
  </table>
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
