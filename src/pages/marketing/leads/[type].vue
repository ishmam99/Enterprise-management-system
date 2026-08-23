<script setup>
import { ref, onMounted, reactive, watch } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import Breadcrumb from '@/components/Breadcrumb.vue'
import api from '@/config/api'
import { useRoute } from 'vue-router'
import moment from 'moment'

const authStore = useAuthStore()
authStore.sidebarOpen = true

const currentPage = ref(1)
const totalPages = ref(1)
const perPage = ref(20)
const route = useRoute()
const fields = ref([])
const leads = ref([])
const isLoading = ref(true)
const startDate = ref('')
const endDate = ref('')

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

// Fetch fields (column headers)
const fetchFields = async () => {
  try {
    const { data } = await api().get('/crm/modules/1/fields')
    fields.value = data.data
  } catch (error) {
    console.error('Failed to fetch fields:', error)
  }
}

// Build API URL dynamically based on route
const buildApiUrl = () => {
  const base = '/crm/modules/1/records'
  const params = new URLSearchParams()

  params.append('page', currentPage.value)
  params.append('per_page', perPage.value)

  const type = route.params.type

  // 1. DATE-BASED FILTERS
  if (['today', 'thisWeek', 'nextWeek', 'lastWeek', 'thisMonth', 'nextMonth', 'lastMonth'].includes(type)) {
    params.append('date_field', 'call_schedule_date')
    params.append('start_date', startDate.value)
    params.append('end_date', endDate.value)
  }

  // 2. LEAD STATUS (lead_to_prospect_to_potential)
  else if (['initialLead', 'prospect', 'potentialNominee', 'potential', 'highlyPotential'].includes(type)) {
    const statusMap = {
      initialLead: 'Initial Lead',
      prospect: 'Prospect',
      potentialNominee: 'Potential Nominee',
      potential: 'Potential',
      highlyPotential: 'Highly Potential'
    }
    params.append('field', 'lead_to_prospect_to_potential')
    params.append('value', statusMap[type])
  }

  // 3. LEAD PRIORITY
  else if (type && ['bronze', 'silver', 'gold', 'diamond', 'platinum'].includes(type)) {
    params.append('field', 'lead_priority')
    params.append('value', type.charAt(0).toUpperCase() + type.slice(1)) // Capitalize
  }

  return `${base}?${params.toString()}`
}

// Set date range based on route
const setDateRange = () => {
  const type = route.params.type
  const now = moment()

  switch (type) {
    case 'today':
      startDate.value = now.format('YYYY-MM-DD')
      endDate.value = now.format('YYYY-MM-DD')
      break

    case 'thisWeek':
      startDate.value = now.clone().startOf('week').format('YYYY-MM-DD')
      endDate.value = now.clone().endOf('week').format('YYYY-MM-DD')
      break

    case 'nextWeek':
      startDate.value = now.clone().add(1, 'week').startOf('week').format('YYYY-MM-DD')
      endDate.value = now.clone().add(1, 'week').endOf('week').format('YYYY-MM-DD')
      break

    case 'lastWeek':
      startDate.value = now.clone().subtract(1, 'week').startOf('week').format('YYYY-MM-DD')
      endDate.value = now.clone().subtract(1, 'week').endOf('week').format('YYYY-MM-DD')
      break

    case 'thisMonth':
      startDate.value = now.clone().startOf('month').format('YYYY-MM-DD')
      endDate.value = now.clone().endOf('month').format('YYYY-MM-DD')
      break

    case 'nextMonth':
      startDate.value = now.clone().add(1, 'month').startOf('month').format('YYYY-MM-DD')
      endDate.value = now.clone().add(1, 'month').endOf('month').format('YYYY-MM-DD')
      break

    case 'lastMonth':
      startDate.value = now.clone().subtract(1, 'month').startOf('month').format('YYYY-MM-DD')
      endDate.value = now.clone().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
      break

    default:
      startDate.value = ''
      endDate.value = ''
  }
}

// Fetch leads
const fetchLeads = async (page = 1) => {
  try {
    isLoading.value = true
    currentPage.value = page

    const url = buildApiUrl()
    const { data } = await api().get(url)

    leads.value = data.data || []
    totalPages.value = data.meta?.last_page || 1
  } catch (error) {
    console.error('Failed to fetch leads:', error)
    showToast('Failed to fetch leads', 'error')
    leads.value = []
  } finally {
    isLoading.value = false
  }
}

// Watch route change
watch(
  () => route.params.type,
  () => {
    currentPage.value = 1
    setDateRange()
    fetchLeads(1)
  },
  { immediate: true }
)

// Watch perPage change
watch(perPage, () => {
  currentPage.value = 1
  fetchLeads(1)
})

// Pagination
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
    fetchLeads(page)
  }
}

// Initial load
onMounted(async () => {
  setDateRange()
  await fetchFields()
  await fetchLeads(1)
})
</script>

<template>
  <div class="bg-gray-50 min-h-screen py-8">
    <div class="container mx-auto">
      <Breadcrumb title="Leads" />

      <!-- Card -->
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <!-- Header controls -->
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Leads</h2>
          <div class="flex gap-4">
            <div class="flex items-center gap-3">
              <label for="perPage" class="text-sm text-gray-600">Per Page:</label>
              <select
                id="perPage"
                v-model="perPage"
                class="border rounded-lg px-8 py-1.5 text-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              >
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
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
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 table-zebra">
            <thead class="bg-gradient-to-r from-emerald-50 to-teal-50">
              <tr>
                <th
                  class="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider"
                >
                  <input
                    type="checkbox"
                    class="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                </th>
                <th
                  v-for="field in fields"
                  :key="field.id"
                  class="px-6 py-4 text-left text-xs border-e font-bold text-emerald-700 uppercase tracking-wider"
                >
                  {{ field.name }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-100">
              <tr v-if="leads.length === 0 && !isLoading">
                <td :colspan="fields.length + 1" class="px-6 py-12 text-center text-gray-500">
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
                      <p class="text-gray-500 mb-4">Try adjusting filters or create a new lead</p>
                      <router-link
                        to="/sales_management/leads/createLeads"
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
                v-for="lead in leads"
                :key="lead.id"
                class="hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    class="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                </td>
                <td
                  v-for="field in fields"
                  :key="field.id"
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium"
                >
                  <router-link
                    :to="{
                      name: 'sales_management-leads-leadsDetails-id',
                      params: { id: lead.id }
                    }"
                    class="hover:underline hover:text-emerald-600"
                  >
                    {{ lead.values.find(e => e.field_id == field.id)?.value || '-' }}
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="flex justify-between items-center mt-6">
          <p class="text-sm text-gray-600">
            Showing page <span class="font-semibold">{{ currentPage }}</span> of
            <span class="font-semibold">{{ totalPages }}</span>
          </p>

          <div class="flex items-center gap-2">
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-4 py-2 rounded-lg border text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>

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
</template>

<style scoped>
/* Keep all your existing styles */
.table-zebra tr:nth-child(even) {
  background-color: #f9fafb8e;
}

tbody tr:nth-child(odd) td {
  background-color: #f8fcff7e;
}

tbody tr:nth-child(even) td {
  background-color: #e5f6ff;
  border: 0.5px solid #909aa146;
}

tbody tr:hover td {
  background-color: #bdeeff;
  transition: background-color 0.25s ease;
  border: 0.5px solid #909aa146;
}

tbody tr td,
tbody tr th {
  border: 0.5px solid #909aa146;
}
</style>
