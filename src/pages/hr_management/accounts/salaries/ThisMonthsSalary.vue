<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
// import "vue3-circle-progress/dist/circle-progress.css";
import CardBox from "@/components/CardBox.vue";
import * as chartConfig from "@/components/Charts/chart.config.js";
import SectionMain from "@/components/SectionMain.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBoxComponentTitle from "@/components/CardBoxComponentTitle.vue";
import { mdiAccountMultiple, mdiEye, mdiCloseBox, mdiClipboardEdit } from "@mdi/js";
// import { useStore } from "@/stores/store.js";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
// import Pagination from "@/components/Pagination.vue";
// import { useToast } from "vue-toast-notification";
import FormControl from "@/components/FormControl.vue";
import moment from "moment";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
import { debounce } from 'lodash';
import { useHRM } from '@/composables/useHRM'
const { hrmApi } = useHRM()

// const $toast = useToast();
const loading = ref(false);
// const store = useStore();
const router = useRouter();
const loader = ref(false);
const employeeIdToDelete = ref(null);
const chartData = ref(null);
const searchQuery = ref("");
const filteredResults = ref([]);
const employeeList = ref([]);
const currentPage = ref(1);

const downloadPDF = () => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  // Get the data to export (filtered or full list)
  const dataToExport = searchQuery.value ? filteredResults.value : thisMonthSalary.value;

  // Calculate totals - using the same computation as in your UI
  const pdfTotal = dataToExport.reduce((sum, salary) => {
    return sum + (parseFloat(salary?.total_salary) || 0);
  }, 0);

  const paidCount = dataToExport.filter(s => s?.payment_status).length;
  const pendingCount = dataToExport.length - paidCount;

  // Add title
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.text(
    `Monthly Salary Report: ${moment().format('MMMM YYYY')}`,
    105,  // Center horizontally
    15,
    { align: "center" }
  );

  // Add subtitles with proper vertical spacing
  doc.setFontSize(12);
  doc.text(
    `Total Salary: ${pdfTotal.toLocaleString()} BDT`,
    105,
    25,  // Moved down to avoid overlap
    { align: "center" }
  );

  doc.setFontSize(10);
  doc.text(
    `Active Employees: ${dataToExport.length} (Paid: ${paidCount} | Pending: ${pendingCount})`,
    105,
    32,  // Proper vertical spacing
    { align: "center" }
  );

  // Table columns
  const tableColumn = [
    "#",
    "ID",
    "Employee Name",
    "Month",
    "Hours",
    "Rate (BDT)",
    "Amount (BDT)",
    "Status",
    "Paid On (Date)",
    "Paid By"
  ];

  // Table rows with proper formatting
  const tableRows = dataToExport.map((salary, index) => [
    index+1,
    salary?.employee_uid || "-",
    salary?.employee_name || "-",
    salary?.salary_month || "-",
    salary?.salary_hour ? Number(salary.salary_hour).toFixed(2) : "0.00",
    salary?.salary_rate ? Number(salary.salary_rate).toFixed(2) : "0.00",
    salary?.total_salary ? Number(salary.total_salary).toLocaleString('en-US') : "0",
    salary?.payment_status ? "Paid" : "Pending",
    salary?.payment_date ? moment(salary.payment_date).format('DD-MM-YYYY') : "-",
    salary?.payment_by || "-"
  ]);

  // Add the table
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 40,  // Adjusted to account for headers
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: 'bold'
    },
    columnStyles: {
      4: { halign: 'right' },  // Rate column
      5: { halign: 'right' }   // Amount column
    },
    styles: {
      fontSize: 9,
      cellPadding: 3,
      overflow: 'linebreak'
    },
    didDrawPage: function(data) {
      // Only add footer on last page
      if (data.pageCount === data.pageNumber) {
        const finalY = Math.max(data.cursor.y + 10, 280);

        // Add summary section
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        doc.line(15, finalY - 8, 195, finalY - 8);

        // Add grand total
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 100, 0);  // Green color for total

        autoTable(doc, {
          startY: finalY,
          body: [
            [
              {
                content: 'GRAND TOTAL',
                styles: { fontStyle: 'bold', halign: 'left', fontSize: 12 }
              },
              {
                content: pdfTotal.toLocaleString('en-US') + ' BDT',
                styles: { fontStyle: 'bold', halign: 'right', fontSize: 12 }
              }
            ]
          ],
          styles: {
            cellPadding: 4
          },
          margin: { left: 15, right: 15 }
        });
      }
    }
  });

  // Add footer
  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text(
    `Generated on ${moment().format('DD-MM-YYYY HH:mm')}`,
    105,
    doc.internal.pageSize.height - 10,
    { align: "center" }
  );

  // Save the PDF
  doc.save(`salary-report-${moment().format('YYYY-MM')}.pdf`);
};

const thisMonthSalary = ref([]);
const getThisMonthSalary = async () => {
  loader.value = true;
  try {
    const { data } = await hrmApi.get("current-month-salary");
      thisMonthSalary.value = data.data;

    // Compare and add missing employees
      console.log('Employee List:', employeeList.value);
      employeeList.value.map(employee => {
        const exists = thisMonthSalary.value.some(salary => salary.employee_id == employee.id);
        console.log('Employee Exists:', exists,employee);
        if (!exists) {
          thisMonthSalary.value.push({
            employee_uid: employee.employee_uid,
            employee_name: employee.first_name+' '+employee.last_name,
            status: 0,
            salary_month: moment().subtract(1,'M').format('MMMM'),
            salary: employee.salary || 0,
            // Add any other required default fields
          });
        }

      });
    console.log(thisMonthSalary.value);
  } catch (error) {
    console.error(error, "Error fetching salary disbursement data");
  } finally {
    loader.value = false;
  }
};

// Search functionality
const filterResults = debounce(() => {
  if (!searchQuery.value) {
    filteredResults.value = [...thisMonthSalary.value]
    return
  }

  const query = searchQuery.value.toLowerCase()
  filteredResults.value = thisMonthSalary.value.filter(salary =>
    (salary.employee_name?.toLowerCase().includes(query)) ||
    (salary.employee_uid?.toLowerCase().includes(query)) ||
    (salary.position?.toLowerCase().includes(query))
  )
}, 300)

// const filterResults = () => {
//   if (!searchQuery.value) {
//     filteredResults.value = [...thisMonthSalary.value]; // Copy the original array
//     return;
//   }

//   const query = searchQuery.value.toLowerCase();
//   filteredResults.value = thisMonthSalary.value.filter((salary) => {
//     return (
//       (salary.employee_uid && salary.employee_uid.toLowerCase().includes(query)) ||
//       (salary.employee_name && salary.employee_name.toLowerCase().includes(query)) ||
//       (salary.salary_month && salary.salary_month.toLowerCase().includes(query)) ||
//       (salary.payment_by && salary.payment_by.toLowerCase().includes(query))
//     );
//   });
// };

// Add a computed property for displayed data
const displayedSalaries = computed(() => {
  return searchQuery.value ? filteredResults.value : thisMonthSalary.value;
});

const totalSalarySum = computed(() => {
  return displayedSalaries.value.reduce((sum, salary) => {
    return sum + (parseFloat(salary?.total_salary) || 0);
  }, 0);
});



const paymentStats = computed(() => {
  return displayedSalaries.value.reduce((stats, salary) => {
    salary?.payment_status ? stats.paid++ : stats.pending++;
    return stats;
  }, { paid: 0, pending: 0 });
});



watch(searchQuery, debounce(() => {
  filterResults();
}, 300));

// back routes
const goBack = () => {
  router.back();
};
// View Projects
const goToDisbursement= (salaryId) => {
  console.log('Received ID:', salaryId)
  // console.log('Received Data:', projectData);

  router.push({
    // path: `/htbis/view-project/${salaryId}`
    path: `/Accounts/Salary/Disbursement/${salaryId}`

  })
}
const getAllEmployee = async () => {
  try {
    const { data } = await hrmApi.get('employee')
    employeeList.value = data.data.filter(e => e.status == 0)
    // console.log('Employee List:', employeeList.value);
  } catch (error) {
    console.error(error, 'here the error ')
  }
}
onMounted(async () => {
 await getAllEmployee()
 await getThisMonthSalary();

});

watch(currentPage, (newPage) => {
  console.log("Current page changed:", newPage);
});
</script>

<template>
  <SectionMain class="mx-10">
    <SectionTitleLineWithButton
    :icon="mdiAccountMultiple"
    class="bg-cyan-500 py-3 rounded-2xl px-3 font-semibold text-white"
    :title="`This Months Salary : Active Employees (${ employeeList.length })`"
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

  <div class="flex justify-center gap-3 mb-6">
    <FormControl
      v-model="searchQuery"
      class="w-full"
      type="text"
      placeholder="Search by Employee Name..."
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

<CardBox class="w-full overflow-x-auto" has-table>
  <table class="w-full min-w-max border-2 border-gray-200 shadow-xl">

        <thead class="border-2 bg-blue-500 text-white text-sm">
          <tr>
            <th class="border-e px-2 py-3">Employee ID</th>
            <th class="border-e px-2 py-3">Employee Name</th>
            <!-- <th class="border-e px-2 py-3">Employee ID</th> -->
            <th class="border-e px-2 py-3">Salary Month</th>
            <th class="border-e px-2 py-3">Salary Hour</th>
            <th class="border-e px-2 py-3">Salary Rate</th>
            <th class="border-e px-2 py-3">Total Salary</th>
            <th class="border-e px-2 py-3">Status of payment</th>
            <th class="border-e px-2 py-3">Payment Date</th>
            <th class="border-e px-2 py-3">Payment By</th>
            <th class="border-e px-2 py-3">Disbursement</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loader">
            <td colspan="20" class="text-center py-10">
              <div class="flex items-center justify-center">
                <span class="loading loading-bars"></span>
                <span>Loading...</span>
              </div>
            </td>
          </tr>
          <tr v-for="(salary, index) in displayedSalaries" :key="salary.id" :class="salary.status == 0 ? '!bg-white-100' : '!bg-white'" class="border border-white">
            <td data-label="Employee Id">
              <p class="text-sm">
                {{ salary?.employee_uid }}
              </p>
            </td>
            <td data-label="Employee name">
              <p class="text-sm">
                {{ salary?.employee_name }}
              </p>
            </td>
            <td data-label="salary Month">
              <p class="text-sm">
                {{ salary?.salary_month }}
              </p>
            </td>
            <td data-label="Salary Hour">
              <p class="text-sm">
                {{ salary?.salary_hour }}
              </p>
            </td>
            <td data-label="Salary Rate">
              <p class="text-sm">
                {{ salary?.salary_rate }}
              </p>
            </td>
            <td data-label="Total Salary">
              <p class="text-sm">
                {{ salary?.total_salary }}
              </p>
            </td>
            <td data-label="Status of payment">
              <p class="text-sm">
                {{ salary?.payment_status ? "Paid" : "pending" }}
              </p>
            </td>
            <td data-label="Payment Date">
              <p class="text-sm">
                {{ salary?.payment_date ? salary?.payment_date : "N/A" }}
              </p>
            </td>
            <td data-label="Payment By">
              <p class="text-sm">
                {{ salary?.payment_by ? salary?.payment_by : "N/A" }}
              </p>
            </td>
            <td data-label="Payment By" class="flex justify-center items-center ">

              <div class="text-sm" v-if="salary.status == 0">
                <p class="bg-orange-500 text-white py-2 px-2 font-semibold rounded-md hover:bg-green-600 transition text-nowrap">
                  Salary Not Generated
                </p>
              </div>
              <div class="text-sm" v-else>
                <button
                type="button"
                class="bg-teal-500  text-white py-2 cursor-pointer px-2 font-semibold rounded-md hover:bg-green-600 transition text-nowrap"
                 @click="goToDisbursement(salary.id)"
              >
                Disbursement
              </button>

              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </CardBox>

    <div
      :class="{
      'bg-green-100': paymentStats.pending == 0,
      'bg-yellow-100': paymentStats.pending > 0
    }" class="flex justify-between mt-4 p-4 rounded-lg shadow">
      <div class="text-lg">
        <span class="font-bold">Paid:</span> {{ paymentStats.paid }} |
        <span class="font-bold">Pending:</span> {{ paymentStats.pending }}
      </div>
      <div class="text-xl font-bold">
        Total Salary: {{ totalSalarySum.toLocaleString() }} (BDT)
      </div>
    </div>


  </SectionMain>
</template>
