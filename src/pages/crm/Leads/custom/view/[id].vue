<script setup>
import { ref, onMounted, reactive, watch, computed } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import Breadcrumb from '@/components/Breadcrumb.vue'
import api from '@/config/api'
import { useRoute, useRouter } from 'vue-router'
import Swal from "sweetalert2";

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
authStore.sidebarOpen = true
const views = ref([])
const selectedView = ref('all')
const currentPage = ref(1)
const perPage = ref(10)
const totalPages = ref(1)
const totalAccounts = ref(0)
const fields = ref([])
const leads = ref([])
const stats = ref({})
const isLoading = ref(true)
const getAssignments = ref([])
const toast = reactive({
  show: false,
  message: '',
  type: 'success'
})

const showToast = (message, type = 'success') => {
  toast.show = true
  toast.message = message
  toast.type = type
  setTimeout(() => (toast.show = false), 3000)
}
const fetchFields = async () => {
  const { data } = await api().get('/crm/modules/1/fields')
  fields.value = data.data
}
const fetchLeads = async (page = 1) => {
  try {
    isLoading.value = true
    
      const { data } = await api().get(
        `/crm/modules/1/records?page=${page}&per_page=${perPage.value}&custom_view_id=${route.params.id}`
      )
      leads.value = data.data
      currentPage.value = data.current_page
      totalPages.value = data.last_page
      totalAccounts.value = data.total
      getAssignments.value = data.assignments
    
  } catch (error) {
    console.error('Failed to fetch leads:', error)
    showToast('Failed to fetch leads', 'error')
  } finally {
    isLoading.value = false
  }
}

const getViews = async () => {
  const { data } = await api().get('/crm/my-custom-views')
  views.value = data
}

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return

  fetchLeads(page)
}
watch(perPage, () => {
  fetchLeads(1)
})

//mass update by Rasik 😎
const showMassModal = ref(false)
const selectedField = ref(null)
const fieldValue = ref(null)
const selectedIds = ref([])

const openMassUpdate = () => {
  selectedField.value = null
  fieldValue.value = null
  showMassModal.value = true
}

const closeMassUpdate = () => {
  showMassModal.value = false
  selectedIds.value = []
}

const toggleSelection = (id, event) => {
  if (event.target.checked) {
    if (!selectedIds.value.includes(id)) {
      selectedIds.value.push(id)
    }
  } else {
    selectedIds.value = selectedIds.value.filter((e) => e !== id)
  }
}

const toggleAll = (event) => {
  if (event.target.checked) {
    selectedIds.value = leads.value.map((e) => e.id)
  } else {
    selectedIds.value = []
  }
}

const isUpdating = ref(false)
const submitMassUpdate = async () => {
  isUpdating.value = true
  if (!selectedField.value) {
    showToast('Please select a field', 'error')
    return
  }

  const payload = {
    record_ids: selectedIds.value,
    field_id: selectedField.value.id,
    value: fieldValue.value
  }

  try {
    await api().post('/crm/bulk-update-records', payload)
    showToast('Mass update successful')

    closeMassUpdate()
    fetchLeads(currentPage.value)
    selectedIds.value = []
  } catch (e) {
    showToast('Mass update failed', 'error')
  } finally {
    isUpdating.value = false
  }
}

//mass assign by Rasik 😎
const getManagerName = (lead) => {
  const manager = lead.assignments?.find((a) => a.role === 'sales-manager')
  return manager?.user?.name || null
}

const getExecutiveName = (lead) => {
  const exec = lead.assignments?.find((a) => a.role === 'sales-executive')
  return exec?.user?.name || null
}
const showMassAssignModal = ref(false)
const selectedAssignRole = ref('') // 'manager' or 'executive'
const assignUserId = ref('')
const assignLoading = ref(false)

const executives = ref([])
const managers = ref([])

const fetchExecutives = async () => {
  try {
    const { data } = await api().get(
      `/users?where=[{"column":"role","operator":"=","value":"sales-executive"}]`
    )
    executives.value = data.data
  } catch (e) {
    console.log(e)
  }
}

const fetchManagers = async () => {
  try {
    const { data } = await api().get(
      `/users?where=[{"column":"role","operator":"=","value":"sales-manager"}]`
    )
    managers.value = data.data
  } catch (e) {
    console.log(e)
  }
}

const openMassAssignModal = async (roleType) => {
  // roleType = "manager" OR "executive"
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
  selectedIds.value = []
}

const submitMassAssign = async () => {
  if (!assignUserId.value) return

  assignLoading.value = true

  // Correct role + permission mapping
  const roleMap = {
    manager: {
      role: 'sales-manager',
      permission: 'edit'
    },
    executive: {
      role: 'sales-executive',
      permission: 'view'
    }
  }

  const payload = {
    record_ids: selectedIds.value,
    user_id: assignUserId.value,
    role: roleMap[selectedAssignRole.value].role,
    permission_level: roleMap[selectedAssignRole.value].permission
  }

  try {
    await api().post('/crm/assign-records', payload)

    showToast('Mass assign successful!')
    showMassAssignModal.value = false
    selectedIds.value = []
    fetchLeads(currentPage.value)
  } catch (e) {
    showToast('Mass assign failed', 'error')
  } finally {
    assignLoading.value = false
  }
}

const confirmDelete = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "This view will be permanently deleted.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, delete it!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      await api().delete(`/crm/custom-view-delete/${route.params.id}`);

      Swal.fire({
        title: "Deleted!",
        text: "Your custom view has been deleted.",
        icon: "success",
        timer: 1300,
        showConfirmButton: false
      });
     await router.push('/crm/leads/custom')
    }
  });
};

onMounted(async () => {
  await Promise.all([fetchFields(), fetchLeads(), fetchExecutives(), fetchManagers(), getViews()])
})
</script>

<template>
  <div class="bg-gray-50 min-h-screen p-4">
    <div class="container mx-auto">
      <Breadcrumb title="Leads" />

      <!-- Card -->
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <!-- Header controls -->
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div class="flex gap-2 items-center">
            <h2 class="text-2xl font-bold text-gray-800 mb-1">{{route.query.name}}</h2>
            <!-- <select
              v-model="selectedView"
              @change="fetchLeads()"
              class="border rounded px-2 py-1 text-sm"
            >
              <option value="all">All</option>
              <option v-for="view in views" :key="view.id" :value="view">{{ view.name }}</option>
            </select> -->
          </div>

          <div class="flex items-center gap-2">
            <div class="grid grid-cols-5 gap-2">
              <router-link to="/crm/leads/create" class="btn btn-sm btn-primary text-white">
                Create New Lead
              </router-link>
              <button
                class="bg-sky-600 px-2 rounded text-sm font-semibold hover:bg-sky-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                @click="openMassUpdate"
                :disabled="selectedIds.length === 0"
              >
                Mass Update
              </button>
              <button
                class="bg-teal-600 px-2 py-1 rounded text-sm font-semibold hover:bg-teal-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                @click="openMassAssignModal('manager')"
                :disabled="selectedIds.length === 0"
              >
                Mass Assign Manager
              </button>

              <button
                class="bg-sky-600 px-2 py-1 rounded text-sm font-semibold hover:bg-sky-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                @click="openMassAssignModal('executive')"
                :disabled="selectedIds.length === 0"
              >
                Mass Assign Executive
              </button>
               <button
                class="bg-red-600 px-2 rounded text-sm font-semibold hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                 @click="confirmDelete()"
              >
                Delete
              </button>
            </div>
          </div>
          <!-- <div class="flex items-center gap-2">
            <select
              id="perPage"
              v-model="perPage"
              class="border rounded-lg pe-7 py-1 text-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <label for="perPage" class="text-sm text-gray-600">Per Page</label>
          </div> -->
        </div>

        <!-- MASS ASSIGN MODAL -->
        <div
          v-if="showMassAssignModal"
          class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          <div class="bg-white w-full max-w-lg rounded-xl shadow-2xl animate-fadeIn">
            <!-- Header -->
            <div class="px-6 py-4 border-b flex justify-between items-center">
              <h2 class="text-xl font-semibold text-gray-800">
                Assign {{ selectedAssignRole === 'manager' ? 'Manager' : 'Executive' }}
              </h2>
              <button @click="closeMassAssign" class="text-xl">&times;</button>
            </div>

            <!-- Body -->
            <div class="px-6 py-5 space-y-4">
              <label class="text-sm font-medium text-gray-700"
                >Select {{ selectedAssignRole === 'manager' ? 'Manager' : 'Executive' }}</label
              >

              <select
                v-model="assignUserId"
                class="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="" disabled>
                  Select {{ selectedAssignRole === 'manager' ? 'Manager' : 'Executive' }}
                </option>

                <option
                  v-for="user in selectedAssignRole === 'manager' ? managers : executives"
                  :key="user.id"
                  :value="user.id"
                >
                  {{ user.name }} — {{ user.email }}
                </option>
              </select>
            </div>

            <!-- Footer -->
            <div class="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3">
              <button
                @click="closeMassAssign"
                class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                @click="submitMassAssign"
                :disabled="!assignUserId || assignLoading"
                class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2"
              >
                <span v-if="!assignLoading">Assign</span>

                <span v-else class="flex items-center gap-2">
                  <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      class="opacity-20"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    />
                    <path
                      class="opacity-80"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Assigning…
                </span>
              </button>
            </div>
          </div>
        </div>

        <!-- Loader -->
        <div v-if="isLoading" class="flex justify-center items-center py-16">
          <div
            class="animate-spin rounded-full h-10 w-10 border-4 border-yellow-500 border-t-transparent"
          ></div>
        </div>

        <!-- Table -->
        <!-- Table Content -->
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 table-zebra">
            <thead class="bg-gradient-to-r from-emerald-50 to-teal-50">
              <tr>
                <th
                  class="px-6 py-4 text-left border-x font-bold text-emerald-700 uppercase tracking-wider"
                >
                  <input
                    type="checkbox"
                    class="w-4 h-4 cursor-pointer"
                    :checked="selectedIds.length === leads.length"
                    @change="toggleAll($event)"
                  />
                </th>
                <th
                  class="px-6 py-4 text-left border-x font-bold text-xs text-emerald-700 uppercase tracking-wider"
                >
                  Assigned Person
                </th>
                <th
                  v-for="field in fields"
                  :key="field.id"
                  class="px-6 py-4 text-nowrap text-left text-xs border-e font-bold text-emerald-700 uppercase tracking-wider"
                >
                  {{ field.label }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-100">
              <tr v-if="isLoading" class="hover:bg-emerald-50 transition-colors">
                <td colspan="16" class="px-6 py-8 text-center text-gray-500">
                  <div class="flex items-center justify-center gap-3">
                    <Icon name="eos-icons:loading" class="w-8 h-8 text-emerald-500 animate-spin" />
                    <span class="text-lg">Loading leads...</span>
                  </div>
                </td>
              </tr>
              <tr v-else-if="leads.length === 0" class="hover:bg-emerald-50 transition-colors">
                <td colspan="10" class="px-6 py-12 text-center text-gray-500">
                  <div class="flex flex-col items-center gap-4">
                    <div class="relative">
                      <div
                        class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center"
                      >
                        <Icon name="material-symbols:person" class="w-12 h-12 text-gray-400" />
                      </div>
                      <div
                        class="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center"
                      >
                        <Icon name="material-symbols:settings" class="w-5 h-5 text-emerald-600" />
                      </div>
                    </div>
                    <div class="text-center">
                      <h3 class="text-xl font-semibold text-gray-700 mb-2">No leads found</h3>
                      <p class="text-gray-500 mb-4">Get started by creating your first Lead</p>
                      <router-link
                        to="/crm/leads/create"
                        class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 mx-auto"
                      >
                        <Icon name="material-symbols:add" class="w-5 h-5" />
                        + Create Lead
                      </router-link>
                    </div>
                  </div>
                </td>
              </tr>
              <tr
                v-else
                v-for="(lead, index) in leads"
                :key="lead.id"
                class="hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    class="w-4 h-4 cursor-pointer"
                    :value="lead.id"
                    :checked="selectedIds.includes(lead.id)"
                    @change="toggleSelection(lead.id, $event)"
                  />
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                  <div class="flex flex-col gap-1 p-1">
                    <span class="border px-2 rounded border-emerald-500 text-emerald-500">
                      Manager: {{ getManagerName(lead) || 'Not Assigned' }}</span
                    >
                    <span class="border px-2 rounded text-violet-500 border-violet-500"
                      >Executive: {{ getExecutiveName(lead) || 'Not Assigned' }}</span
                    >
                  </div>
                </td>
                <!-- <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                  {{ getExecutiveName(lead) || 'Not Assigned' }}
                </td> -->
                <td
                  v-for="field in fields"
                  :key="field.id"
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium"
                >
                  <router-link
                    :to="{
                      name: 'crm-Leads-leadsDetails-id',
                      params: { id: lead.id }
                    }"
                    class="hover:underline"
                  >
                    {{ lead.values.find((e) => e.field_id == field.id)?.value }}
                  </router-link>

                  <!-- {{lead.values.find(e=>e.field_id == field.id)?.value }} -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="flex justify-between items-center mt-6">
          <p class="text-sm text-gray-600">
            Showing page <span class="font-semibold">{{ currentPage }}</span> of
            <span class="font-semibold">{{ totalPages }} || Total Leads {{ totalAccounts }}</span>
          </p>

          <div class="flex items-center gap-2">
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-4 py-2 rounded-lg border text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>

            <!-- <button
              v-for="page in totalPages"
              :key="page"
              @click="goToPage(page)"
              class="px-3 py-1 rounded-lg text-sm font-medium"
              :class="page === currentPage ? 'bg-cyan-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
            >
              {{ page }}
            </button> -->

            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 rounded-lg border text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- MASS UPDATE MODAL -->
  <div
    v-if="showMassModal"
    class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-lg animate-fadeIn">
      <!-- HEADER -->
      <div class="px-6 py-4 border-b flex justify-between items-center">
        <h2 class="text-xl font-semibold text-gray-800">Mass Update Records</h2>
        <button @click="closeMassUpdate" class="text-gray-500 hover:text-gray-700 text-xl">
          &times;
        </button>
      </div>

      <!-- BODY -->
      <div class="px-6 py-5 space-y-4">
        <!-- Field Dropdown -->
        <div>
          <label class="text-sm font-medium text-gray-700">Select Field</label>
          <select
            v-model="selectedField"
            class="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option disabled value="">-- Choose Field --</option>
            <option v-for="field in fields" :key="field.id" :value="field">
              {{ field.label }}
            </option>
          </select>
        </div>

        <!-- Dynamic Input -->
        <div v-if="selectedField">
          <label class="text-sm font-medium text-gray-700">Value</label>

          <!-- Text / Number -->
          <input
            v-if="selectedField.type === 'text' || selectedField.type === 'number'"
            v-model="fieldValue"
            :type="selectedField.type"
            class="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <!-- Select -->
          <select
            v-if="selectedField.type === 'select'"
            v-model="fieldValue"
            class="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option disabled value="">Select…</option>
            <option v-for="o in selectedField.options" :key="o" :value="o">
              {{ o }}
            </option>
          </select>

          <!-- Date -->
          <input
            v-if="selectedField.type === 'date'"
            v-model="fieldValue"
            type="date"
            class="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <!-- FOOTER -->
      <div class="px-6 py-4 border-t flex justify-end space-x-3 bg-gray-50 rounded-b-xl">
        <button
          @click="closeMassUpdate"
          class="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          Cancel
        </button>
        <button
          @click="submitMassUpdate"
          :disabled="isUpdating"
          class="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <span v-if="!isUpdating">Update Records</span>

          <!-- Loader -->
          <span v-else class="flex items-center gap-2">
            <svg
              class="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Updating…
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Enhanced Accounts Management Dashboard Styles */
.accounts-management-dashboard {
  @apply p-6 bg-gradient-to-br from-gray-50 to-violet-50 min-h-screen;
}

/* Custom animations and effects */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.25s ease-out;
}

/* Apply animations to elements */
.accounts-management-dashboard > * {
  animation: fadeInUp 0.6s ease-out;
}

.accounts-management-dashboard > *:nth-child(2) {
  animation-delay: 0.1s;
}

.accounts-management-dashboard > *:nth-child(3) {
  animation-delay: 0.2s;
}

.accounts-management-dashboard > *:nth-child(4) {
  animation-delay: 0.3s;
}

/* Enhanced hover effects */
.hover\:shadow-2xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Custom scrollbar for table */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(to right, #8b5cf6, #a855f7);
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to right, #7c3aed, #9333ea);
}

/* Enhanced focus states */
button:focus,
a:focus,
input:focus,
select:focus {
  outline: 2px solid #8b5cf6;
  outline-offset: 2px;
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Custom gradient text effect */
.gradient-text {
  background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Enhanced card shadows */
.shadow-xl {
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Responsive design improvements */
@media (max-width: 768px) {
  .accounts-management-dashboard {
    @apply p-4;
  }

  .bg-gradient-to-r.from-violet-600.via-purple-600.to-fuchsia-700 {
    @apply p-6;
  }

  .bg-gradient-to-r.from-violet-600.via-purple-600.to-fuchsia-700 h1 {
    @apply text-2xl;
  }

  .bg-gradient-to-r.from-violet-600.via-purple-600.to-fuchsia-700 p {
    @apply text-base;
  }
}

/* Loading animation enhancement */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Status badge enhancements */
.status-active {
  background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.4);
}

.status-inactive {
  background: linear-gradient(135deg, #ef4444 0%, #f43f5e 100%);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(239, 68, 68, 0.4);
}

.status-pending {
  background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(245, 158, 11, 0.4);
}

.status-suspended {
  background: linear-gradient(135deg, #6b7280 0%, #475569 100%);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(107, 114, 128, 0.4);
}

.table-zebra tr:nth-child(even) {
  background-color: #f9fafb8e;
}
/* ✨ Alternate row background (striped look) */
tbody tr:nth-child(odd) td {
  background-color: #f8fcff7e; /* very light cyan */
}

tbody tr:nth-child(even) td {
  background-color: #e5f6ff; /* soft blue tint */
  border: 0.5px solid #909aa146;
}

/* Optional hover glow */
tbody tr:hover td {
  background-color: #bdeeff;
  transition: background-color 0.25s ease;
  border: 0.5px solid #909aa146;
}
tbody tr td {
  border: 0.5px solid #909aa146;
}
tbody tr th {
  border: 0.5px solid #909aa146;
}
</style>
