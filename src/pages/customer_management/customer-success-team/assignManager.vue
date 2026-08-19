<template>
  <div class="p-6 w-4/5 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 min-h-screen mx-auto">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        Active Customers List
      </h1>
      <p class="text-gray-600 mt-2">Review and assign customer success manager</p>
    </div>
    <!-- Search & Filter -->
    <div class="flex flex-col md:flex-row gap-4 mb-8">
      <div class="relative flex-1 max-w-md">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name or email..."
          class="w-full pl-12 pr-6 py-3 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition"
        />
        <i class="fas fa-search absolute left-4 top-4 text-purple-400"></i>
      </div>
      <select
        v-model="selectedIndustry"
        @change="getCustomers()"
        class="px-6 py-3 rounded-xl border border-purple-200 bg-white focus:ring-4 focus:ring-purple-100 outline-none"
      >
        <option value="">All Industries</option>
        <option v-for="industry in industries" :key="industry.id" :value="industry.id">
          {{ industry.name }}
        </option>
      </select>
    </div>
    <!-- Mass Assign Buttons -->
    <div class="flex gap-4 mb-8">
    <button
    v-if="authStore?.user?.role === 'customer-director'"
    @click="openMassAssignModal('manager')"
    :disabled="selectedIds.length === 0"
    class="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-md
            hover:shadow-lg transform hover:scale-105 transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
    Mass Assign Success Manager
    </button>

    </div>
    <!-- Table Card -->
    <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <tr>
              <th
                 v-if="authStore?.user?.role === 'customer-director'"
               class="py-4 px-6 text-left">
                <input type="checkbox" @click="toggleAll" class="rounded border-gray-300" />
              </th>
              <th class="py-4 px-6 text-left">#</th>
              <th class="py-4 px-6 text-left">Customer Name</th>
              <th class="py-4 px-6 text-left">Email</th>
              <!-- <th class="py-4 px-6 text-left">Phone</th> -->
              <th class="py-4 px-6 text-left">Industry</th>
              <th class="py-4 px-6 text-left">Assigned to</th>
              <!-- <th class="py-4 px-6 text-left">Executive</th> -->
              <th class="py-4 px-6 text-left">Status</th>
              <!-- <th class="py-4 px-6 text-center">Actions</th> -->
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="(customer, index) in customers"
              :key="customer.id"
              class="hover:bg-purple-50 transition-all duration-200"
            >
              <td    v-if="authStore?.user?.role === 'customer-director'" class="py-4 px-4">
                <input type="checkbox" v-model="selectedIds" :value="customer.id" class="rounded border-gray-300" />
              </td>
              <td class="py-4 px-4 font-medium">{{ index + 1 }}</td>
              <td class="py-4 px-4">
                <div class="font-semibold text-gray-800">{{ customer.user?.name }}</div>
              </td>
              <td class="py-4 px-4 text-gray-600">{{ customer.user?.email }}</td>
              <!-- <td class="py-4 px-4 text-gray-600">{{ customer.phone }}</td> -->
              <td class="py-4 px-4">
                <span class="text-purple-700 font-medium">
                  {{ customer.industry?.name || '—' }}
                </span>
              </td>
              <td class="py-4 px-4 text-gray-600 font-bold">{{ getManagerName(customer) || 'Unassigned' }}</td>
              <td class="py-4 px-4">
                <span
                  :class="[
                    'px-4 py-2 rounded-full text-xs font-bold tracking-wide',
                    customer.status == 0
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-emerald-100 text-emerald-700',
                  ]"
                >
                  {{ customer.status == 0 ? 'Pending' : 'Approved' }}
                </span>
              </td>
              <!-- <td class="py-1 px-6 text-center">
                <div class="flex justify-center gap-3"> -->
                  <!-- Approve Button - Only show when pending -->
                  <!-- <button
                     v-if="authStore?.user?.role === 'customer-director'"

                    @click="approveRequest(customer)"
                    class="px-5 py-2 bg-gradient-to-r text-nowrap from-red-500 to-pink-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                   <i class="ri-prohibited-2-line"></i> Make Inactive
                  </button> -->
                  <!-- View Details -->
                  <!-- <router-link
                    :to="{ name: 'customer_management-CustomerDetails-id', params: { id: customer.id } }"
                    class="px-5 text-nowrap py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    <i class="fas fa-eye"></i> View
                  </router-link> -->
                <!-- </div>
              </td> -->
            </tr>
            <!-- Empty State -->
            <tr v-if="customers.length === 0">
            <td colspan="10" class="text-center py-16">
                <div class="flex flex-col items-center justify-center text-gray-400 text-lg">
                <i class="fas fa-inbox text-5xl mb-4"></i>
                <span>No pending customer requests found</span>
                </div>
            </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Pagination -->
      <div v-if="meta && customers.length > 0" class="bg-gray-50 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="text-sm text-gray-600">
          Showing {{ meta.from }} - {{ meta.to }} of {{ meta.total }} records
        </div>
        <div class="flex gap-2">
          <button
            v-for="link in meta.links"
            :key="link.label"
            @click="currentPage = link.page || currentPage; getCustomers()"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition',
              link.active
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                : 'bg-white text-purple-700 border border-purple-300 hover:bg-purple-50',
            ]"
            v-html="link.label"
          />
        </div>
      </div>
    </div>
    <!-- Success Toast -->
    <div
      v-if="toastMessage"
      class="fixed bottom-8 right-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce-in z-50"
    >
      <i class="fas fa-check-circle text-2xl"></i>
      <span class="font-semibold">{{ toastMessage }}</span>
    </div>
    <!-- Mass Assign Modal -->
    <div v-if="showMassAssignModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Assign {{ selectedAssignRole.toUpperCase() }}</h2>
          <button @click="closeMassAssign" class="text-gray-500 hover:text-gray-700">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>
        <select
          v-model="assignUserId"
          class="w-full px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none mb-6"
        >
          <option value="">Select User</option>
          <option v-for="user in selectedAssignRole === 'manager' ? managers : executives" :key="user.id" :value="user.id">
            {{ user.name }}
          </option>
        </select>
        <div class="flex justify-end gap-4">
          <button @click="closeMassAssign" class="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl">Cancel</button>
          <button
            @click="submitMassAssign"
            :disabled="assignLoading"
            class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-md"
          >
            {{ assignLoading ? 'Assigning...' : 'Assign' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import api from '@/config/api'
import { useAuthStore } from '@/stores/AuthStore'
import { ref, watch, onMounted } from 'vue'

const searchQuery = ref('')
const currentPage = ref(1)
const customers = ref([])
const meta = ref(null)
const selectedIndustry = ref('')
const toastMessage = ref('')
const industries = ref([])
const selectedIds = ref([])
const showMassAssignModal = ref(false)
const selectedAssignRole = ref('')
const assignUserId = ref('')
const assignLoading = ref(false)
const executives = ref([])
const managers = ref([])

const authStore = useAuthStore()
// Fetch customers (only active ones + optional industry filter)
const getCustomers = async () => {
  let industryFilter = ''
  if (selectedIndustry.value) {
    industryFilter = `&industry_id=${selectedIndustry.value}`
  }
  try {
    const { data } = await api().get(
      `customers?status=1&with=user,assignedUsers.user,industry${industryFilter}&per_page=20&page=${currentPage.value}&search=${encodeURIComponent(searchQuery.value)}`
    )
    customers.value = data.data.data
    meta.value = data.data
  } catch (err) {
    console.error(err)
  }
}


const isAlreadyAssigned = (customerId, userId, role) => {
  const customer = customers.value.find(c => c.id === customerId)
  if (!customer) return false

  return customer.assigned_users?.some(
    a => a.role === role && a.user_id == userId
  )
}



// Make inactive customer → change status to 2
const approveRequest = async (customer) => {
  try {
    await api().post(`/customers/${customer.id}`, { status: 2, _method: 'PUT' })
    getCustomers();
    // Remove from list
    customers.value = customers.value.filter(c => c.id !== customer.id)
    // Show toast
    toastMessage.value = `${customer.user.name} has been made inactive!`
    setTimeout(() => (toastMessage.value = ''), 4000)


  } catch (err) {
    alert('Failed to make customer inactive')
  }
}

// Debounced search
const debounce = (fn, delay = 500) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}
watch(searchQuery, debounce(() => {
  currentPage.value = 1
  getCustomers()
}, 500))

const getIndustries = async () => {
  const { data } = await api().get('industries')
  industries.value = data.data
}

const getManagerName = (customer) => {
  const manager = customer.assigned_users?.find(a => a.role === 'customer-success-manager')
  return manager?.user?.name || 'Unassigned'
}


// const getExecutiveName = (customer) => {
//   const exec = customer.assignments?.find(a => a.role === 'customer-executive')
//   return exec?.user?.name || null
// }

// const fetchExecutives = async () => {
//   try {
//     const { data } = await api().get(
//       `/users?where=[{"column":"role","operator":"=","value":"customer-executive"}]`
//     )
//     executives.value = data.data
//   } catch (e) { console.log(e) }
// }

const fetchManagers = async () => {
  try {
    const { data } = await api().get(
      `/users?where=[{"column":"role","operator":"=","value":"customer-success-manager"}]`
    )
    managers.value = data.data
  } catch (e) { console.log(e) }
}

const openMassAssignModal = async (roleType) => {
  if (selectedIds.value.length === 0) {
    alert('Please select at least one customer')
    return
  }
  selectedAssignRole.value = roleType
  assignUserId.value = ''
  showMassAssignModal.value = true

  if (roleType === 'manager') {
    await fetchManagers()
  } else {
    await fetchExecutives()
  }
}

const closeMassAssign = () => {
  showMassAssignModal.value = false
}

const submitMassAssign = async () => {
  if (!assignUserId.value || selectedIds.value.length === 0) return

  const roleMap = {
    manager: {
      role: 'customer-success-manager',
      permission: 'edit'
    }
  }

  const { role, permission } = roleMap[selectedAssignRole.value]

  // CHECK ALREADY ASSIGNED
  const alreadyAssigned = selectedIds.value.some(id =>
    isAlreadyAssigned(id, assignUserId.value, role)
  )

  if (alreadyAssigned) {
    toastMessage.value = '❌ Cannot assign: already assigned to selected customer(s)'
    setTimeout(() => (toastMessage.value = ''), 4000)
    return
  }

  assignLoading.value = true

  try {
    await Promise.all(
      selectedIds.value.map(id =>
        api().post(`/assign-customer/${id}`, {
          user_id: assignUserId.value,
          role,
          permission_level: permission
        })
      )
    )

    toastMessage.value = '✅ Mass assign successful!'
    setTimeout(() => (toastMessage.value = ''), 4000)
    showMassAssignModal.value = false
    selectedIds.value = []
    getCustomers()
  } catch (e) {
    toastMessage.value = '❌ Mass assign failed'
    setTimeout(() => (toastMessage.value = ''), 4000)
  } finally {
    assignLoading.value = false
  }
}

const toggleAll = (e) => {
  if (e.target.checked) {
    selectedIds.value = customers.value.map(c => c.id)
  } else {
    selectedIds.value = []
  }
}

onMounted(() => {
  getIndustries()
  getCustomers()
})
</script>
<style scoped>
.animate-bounce-in {
  animation: bounceIn 0.6s ease-out;
}
@keyframes bounceIn {
  0% { opacity: 0; transform: scale(0.3); }
  50% { opacity: 1; transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); }
}
</style>
