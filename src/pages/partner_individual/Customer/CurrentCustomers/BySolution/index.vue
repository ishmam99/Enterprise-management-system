<template>
  <div class="p-6 w-4/5 bg-gray-50 min-h-screen mx-auto">
    <!-- Header -->
    <p class="text-2xl font-bold bg-emerald-600 text-white text-center rounded-t-lg py-3 mb-6 shadow-md">
      🕓  Customers List By Solution
    </p>

    <!-- Search & Filter -->
    <div v-if="selectedIndustry"  class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div  class="relative w-full sm:w-1/3 mb-4 sm:mb-0">
        <input
        v-model="searchQuery"  type="text" placeholder="Search by user..."
          class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
         />
        <i class="fa fa-search absolute left-3 top-3 text-gray-400"></i>
      </div>
      <div class="flex justify-between gap-3 items-center">

      <button class="btn btn-warning" @click="selectedIndustry = null,getCustomers(false)">
        <i class="ri-arrow-left-double-fill"></i>
        Back to Industry List</button>
      <select
       v-model="selectedIndustry"
        class="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
        @change="getCustomers()">
        <option value="">All</option>
        <option v-for="industry  in industries" :key="industry" :value="industry.id">{{ industry.name }}</option>

      </select>
    </div>
    </div>

    <!-- Requests Table -->
       <div v-if="selectedIndustry" class="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-100">

      <table class="min-w-full text-sm text-gray-700 table-zebra">
        <thead class="bg-emerald-600 text-white text-left">
          <tr>
            <th class="py-3 border-e px-4">#</th>
            <th class="py-3 border-e px-4">Name</th>
            <th class="py-3 border-e px-4">Email</th>
            <th class="py-3 border-e px-4">Phone No</th>
            <th class="py-3 border-e px-4">Industry</th>
            <!-- <th class="py-3 border-e px-4">Gender</th> -->
            <th class="py-3 border-e px-4">Status</th>
            <th class="py-3 border-e px-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
            <tr v-if="customers.length === 0">
            <td colspan="6" class="text-center py-6 text-gray-400">No customers found</td>
          </tr>
          <tr v-for="(req, index) in customers" :key="req.id"
            class="border-b border-gray-100 hover:bg-gray-50 transition">
            <td class="py-3 border-e px-4">{{ index + 1 }}</td>
            <td class="py-3 border-e px-4 font-semibold">{{ req.user?.name }}</td>
            <td class="py-3 border-e px-4">{{ req.user?.email }}</td>
            <td class="py-3 border-e px-4">{{ req.phone }}</td>
            <td class="py-3 border-e px-4">{{ req.industry?.name }}</td>
            <!-- <td class="py-3 border-e px-4">{{ req.gender }}</td> -->
            <td class="py-3 border-e px-4">
              <span :class="[
                'px-3 py-1 rounded-full text-xs font-semibold',
                req.status == 0
                  ? 'bg-yellow-100 text-yellow-700'
                  : req.status == 1
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-red-100 text-red-700',
              ]">
                {{ req.status }}
              </span>
            </td>

            <td class="py-3 px-4 text-center flex justify-center gap-3">
              <button v-if="req.status === 'pending'" @click="approveRequest(req)"
                class="px-3 py-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
                Approve
              </button>
              <!-- <button
                v-if="req.status === 'pending'"
                @click="rejectRequest(req)"
                class="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Reject
              </button> -->
              <!-- <button class="px-3 py-1 text-white btn btn-info rounded-lg hover:bg-blue-100 transition" @click="viewDetails(req)">
                View
              </button> -->
              <router-link v-if="req.id" :to="{name:'partner-Customer-CurrentCustomers-BySolution-id',params:{id:req.id},query:req}" class="px-3 py-1 text-white btn btn-info rounded-lg hover:bg-blue-100 transition" @click="viewDetails(req)">
                View
              </router-link>
            </td>
          </tr>


        </tbody>
      </table>
       <div v-if="customers.length > 0 && meta" class="flex px-4 py-2 justify-between items-center mt-6">
        <div class="text-sm text-gray-600">
          Showing {{ customers.length  }} of {{ meta.total }} records from {{ meta.from }} to {{ meta.to }}
        </div>
        <div class=" bg-cyan-500 space-x-1 px-2 rounded-md py-1">

          <button v-for="link in meta.links" :key="link.label" class="p-3 btn btn-info rounded-md" :class="currentPage == link.page ? 'bg-blue-500 text-white':'bg-white text-blue-800'" @click="currentPage = link.page,getCustomers()"><p v-html="link.label"></p></button>

        </div>
      </div>
    </div>
    <div v-else class="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-100">

      <table class="min-w-full text-sm text-gray-700 table-zebra">
        <thead class="bg-emerald-600 text-white text-left">
          <tr>
            <th class="py-3 border-e px-4">#</th>
            <th class="py-3 border-e px-4">Solution Name</th>
            <th class="py-3 border-e px-4">Number Of Customers</th>
            <th class="py-3 border-e px-4">View List</th>

          </tr>
        </thead>

        <tbody>
          <tr v-for="(req, index) in customers" :key="req.id"
            class="border-b border-gray-100 hover:bg-gray-50 transition">
            <td class="py-3 border-e px-4">{{ index + 1 }}</td>
            <td class="py-3 border-e px-4 font-semibold">{{ req.industry?.name }}</td>
            <td class="py-3 border-e px-4">{{ req.total}}</td>
            <td class="py-3 border-e px-4"><button class="btn btn-info text-white" @click="selectedIndustry = req.industry_id,getCustomers(true)">View List</button></td>

          </tr>

          <tr v-if="customers.length === 0">
            <td colspan="6" class="text-center py-6 text-gray-400">No seminar requests found</td>
          </tr>
        </tbody>
      </table>
       <div v-if="customers.length > 0 && meta" class="flex px-4 py-2 justify-between items-center mt-6">
        <div class="text-sm text-gray-600">
          Showing {{ customers.length  }} of {{ meta.total }} records from {{ meta.from }} to {{ meta.to }}
        </div>
        <div class=" bg-cyan-500 space-x-1 px-2 rounded-md py-1">

          <button v-for="link in meta.links" :key="link.label" class="p-3 btn btn-info rounded-md" :class="currentPage == link.page ? 'bg-blue-500 text-white':'bg-white text-blue-800'" @click="currentPage = link.page,getCustomers()"><p v-html="link.label"></p></button>

        </div>
      </div>
    </div>

    <!-- View Details Modal -->
    <div v-if="selectedRequest" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow-2xl w-[90%] sm:w-[500px] p-6 relative">
        <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-600" @click="selectedRequest = null">
          <i class="fa fa-times"></i>
        </button>

        <h2 class="text-xl font-bold text-emerald-700 mb-3">
          {{ selectedRequest.name }}
        </h2>
        <p><strong>Requested By:</strong> {{ selectedRequest.phone_no }}</p>
        <p><strong>Date:</strong> {{ selectedRequest.date_of_birth }}</p>
        <p><strong>Date:</strong> {{ selectedRequest.gender }}</p>
        <p><strong>Status:</strong> {{ selectedRequest.status }}</p>
        <p class="mt-3 text-gray-700">{{ selectedRequest.description }}</p>
      </div>
    </div>

    <!-- Toast Message -->
    <div v-if="toastMessage"
      class="fixed bottom-6 right-6 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fadeIn">
      {{ toastMessage }}
    </div>
  </div>
</template>
<script setup>
import api from '@/config/api'
import { ref, watch, onMounted } from 'vue'
const selectedRequest = ref()
const searchQuery = ref('')
const currentPage = ref(1)
const customers = ref([])
const meta = ref()
const selectedIndustry = ref("")
const industries = ref([])
const getIndustries = async() => {
  const {data} = await api().get('industries')
  industries.value = data.data
}
const getCustomers = async (type) => {
  let indStr = ''
  let groupBy = ''
  if (selectedIndustry.value) {
    indStr = ',{"column":"industry_id","operator":"=","value":"'+ selectedIndustry.value+'"}'
  }
  if(type == false)
  {
    groupBy = '&group_by=industry_id'
  }
  else
   groupBy = `&per_page=20&page=${currentPage.value}&search=${encodeURIComponent(searchQuery.value)}`
  const { data } = await api().get(
    `customers?with=industry,user${groupBy}&where=[{"column":"status","operator":"=","value":"1"}${indStr}]`
  )
  customers.value = data.data.data || data.data
  meta.value = data.meta
  console.log(customers.value)
}

// --- Debounce utility ---
const debounce = (fn, delay = 500) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

// Watch searchQuery with debounce
watch(searchQuery, debounce(() => {
  currentPage.value = 1 // reset page on new search
  getCustomers()
}, 500))

onMounted(() => {
  getIndustries()
  getCustomers(false)
})
</script>
<style scoped>
tr {
  transition: background-color 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
</style>
