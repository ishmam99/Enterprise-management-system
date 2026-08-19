<template>
  <div class="p-6 min-h-screen w-4/5 bg-gray-50">
    <!-- Header -->
    <div class="flex flex-col gap-4 mb-6">
      <div class="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl shadow-xl p-6 w-full relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-full"></div>
          <div class="absolute -bottom-8 -left-8 w-32 h-32 bg-white rounded-full"></div>
        </div>

        <div class="relative z-10 flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="bg-white bg-opacity-20 p-3 rounded-2xl shadow-lg">
              <span class="text-2xl">⏱️</span>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-white mb-1 drop-shadow-lg">
                This Week Sales Person Timecard List
              </h1>
              <p class="text-indigo-100 text-sm font-medium">
                View and review sales team timecard logs across multiple accounts
              </p>
            </div>
          </div>
          <div class="hidden sm:block bg-white bg-opacity-20 px-4 py-2 rounded-xl">
            <span class="text-white font-semibold text-lg">{{ timecards.length }}</span>
            <span class="text-indigo-100 text-sm ml-1">Records</span>
          </div>
        </div>
      </div>

      <!-- Employee Selector -->
      <div class="flex items-center space-x-4">
        <div class="bg-white px-4 py-2 rounded-xl shadow-md border border-gray-100">
          <span class="text-gray-600 text-sm mr-3">Select Sales Rep:</span>
          <select
            v-model="selectedEmployee"
            class="bg-transparent border-0 outline-none text-blue-600 font-semibold focus:ring-0"
          >
            <option value="">All Sales Reps</option>
            <option
              v-for="employee in employees"
              :key="employee.id"
              :value="employee.id"
            >
              {{ employee.name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white rounded-2xl shadow-xl border border-gray-100">
      <table class="min-w-full text-sm text-gray-700">
        <thead class="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-left">
          <tr>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">#</th>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Sales Rep</th>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Role</th>

            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Date</th>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Account Name</th>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Allocated Hours</th>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Total Hours</th>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Sales Activity</th>
            <th class="py-4 border-e border-indigo-500 px-6 font-semibold uppercase tracking-wider">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(row, index) in timecards"
            :key="row.id"
            class="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200"
          >
            <td class="py-4 border-e px-6 font-medium text-gray-900">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
            <td class="py-4 border-e px-6 font-semibold flex items-center">
              <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              {{ row.user.name }}
            </td>
            <td class="py-4 border-e px-6 text-gray-700">{{ row.user.role }}</td>
              <td class="py-4 border-e px-6 text-nowrap text-gray-700">{{ row.date }}</td>
            <td class="py-4 border-e px-6">
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="time in row.times"
                  :key="time.id"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-1"

                >
                  {{ time.account.name }}
                 
                </span>
              </div>
            </td>
            <td class="py-4 border-e px-6">
              <div
                  v-for="time in row.times"
                  :key="time.id"
                  class=" items-center px-2 py-1 rounded-full text-xs font-medium mb-1"

                >{{ time.total_hours }}
                  <!-- {{ time.account.name }} -->


              </div>
            </td>

            <td class="py-4 border-e px-6 text-gray-900 font-semibold">{{ row.total_working_hours }}</td>
            <td class="py-4 border-e px-6 text-gray-700 max-w-xs truncate" :title="row.description">   <div
                  v-for="timeData in row.times"
                  :key="timeData.id"
                  class=" items-center px-2 py-1 rounded-full text-xs font-medium mb-1"

                >{{ timeData.type_of_work }}
                  <!-- {{ time.account.name }} -->


              </div></td>
            <td class="py-4 border-e px-6 text-gray-900 font-semibold">
                <button

                class="px-5 py-2.5 flex gap-3 rounded-xl shadow-md bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
                :disabled="loading == row?.id" @click="updateTimeCard(row)"
                >

                <div v-if="loading==row?.id" class="animate-spin">
                    <i class="ri-loader-4-line"></i>
                </div>

                Approve
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div v-if="timecards.length > 0" class="flex flex-col sm:flex-row justify-between items-center px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div class="text-sm text-gray-600 mb-3 sm:mb-0">
          Showing {{ meta?.from }} to {{ meta?.to }} of {{ meta?.total }} records
        </div>
        <div class="flex space-x-1">


          <button
            v-for="page in meta?.links"
            :key="page"
            class="px-4 py-2 rounded-lg font-medium transition-all duration-200"
            :class="page.active
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'"
            @click="currentPage = page , fetchTimeCards()"
          >
          <span v-html="page.label"></span>

          </button>


        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { time } from 'echarts'
import moment from 'moment'
import { ref, computed, watch, onMounted } from 'vue'

// Sales team data with sales roles
const employees = ref([
])
const meta = ref()

const startDate = moment().startOf('week').format('YYYY-MM-DD')
const endDate = moment().endOf('week').format('YYYY-MM-DD')
const loading  = ref('')
// All timecards data with multiple accounts per sales rep
const timecards = ref([])

const selectedEmployee = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(20)

const fetchTimeCards = async()=>{
  const  {data} = await api().get('attendance?status=0&per_page='+itemsPerPage.value+'&start_date='+startDate+'&end_date='+endDate)
  timecards.value = data.data
  meta.value = data.meta

}
const updateTimeCard =  async(time) => {

  loading.value = time.id
  const {data} = await api().post('attendance/'+time.id,{
    _method:'PUT',
    status : 1,
    date:time.date,
    user_id:time.user_id
  })
  console.log(data.status)
  if(data.status)
  {
    loading.value = ''
    fetchTimeCards()
  }
}
// Watch for employee changes and reset to page 1
watch(selectedEmployee, () => {
  currentPage.value = 1
})
onMounted(()=>{
  fetchTimeCards()
})
</script>

<style scoped>
.overflow-x-auto::-webkit-scrollbar { height: 8px; }
.overflow-x-auto::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
.overflow-x-auto::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 4px; }
.overflow-x-auto::-webkit-scrollbar-thumb:hover { background: #a8a8a8; }
</style>
