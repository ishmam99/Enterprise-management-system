<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside
      class="w-64 bg-slate-900/90 text-white shadow-xl border-r border-slate-700 backdrop-blur-md px-4 py-6 sticky top-0 h-screen overflow-y-auto"
    >
      <button
        class="flex items-center mb-4 bg-gray-700 text-white hover:bg-indigo-600 rounded-lg px-4 py-2 transition-all duration-300"
        title="Go back"
        @click="goBack"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
          <path d="M4.83582 12L11.0429 18.2071L12.4571 16.7929L7.66424 12L12.4571 7.20712L11.0429 5.79291L4.83582 12ZM10.4857 12L16.6928 18.2071L18.107 16.7929L13.3141 12L18.107 7.20712L16.6928 5.79291L10.4857 12Z"></path>
        </svg>
        <span class="font-semibold text-sm">Back</span>
      </button>

      <hr class="pb-6" />
      <ul class="menu space-y-1">
        <li v-for="(item, index) in sidebarItems" :key="index" class="transition-all duration-200">
          <router-link
            :to="item.path"
            class="w-full text-left px-3 py-2 rounded-lg flex items-center justify-between hover:bg-slate-700/70"
            :class="{ 'bg-blue-600 text-white shadow-md': activeSidebar === item.path }"
          >
            <span>{{ item.label }}</span>
          </router-link>
        </li>
      </ul>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 p-10 flex flex-col overflow-y-auto overflow-x-hidden">
      <Breadcrumb/>
       <section
          id="contacts"
          class="bg-cyan-100 shadow-sm rounded-lg p-6 w-full border border-gray-200 transition-all duration-300 hover:shadow-md"
        >
          <div class="flex items-start justify-between">
            <h2 class="text-xl font-semibold mb-4 flex items-center text-gray-800">
              <div class="bg-cyan-100 p-2 rounded-lg mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-cyan-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              Drafted Proposals
            </h2>
          </div>

          <div class="space-y-3 text-sm bg-gray-50 p-5 rounded-lg border border-gray-100">
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
                      class="px-6 py-4 text-left border-e text-xs font-bold text-emerald-700 uppercase tracking-wider"
                    >
                      <span class="text-lg font-semibold">#</span>
                    </th>
                    <th
                      v-for="field in proposalFields"
                      :key="field.id"
                      class="px-6 py-4 text-left text-xs border-e font-bold text-emerald-700 uppercase tracking-wider"
                    >
                      {{ field.name }}
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-100">
                  <tr v-if="isLoading" class="hover:bg-emerald-50 transition-colors">
                    <td colspan="16" class="px-6 py-8 text-center text-gray-500">
                      <div class="flex items-center justify-center gap-3">
                        <Icon
                          name="eos-icons:loading"
                          class="w-8 h-8 text-emerald-500 animate-spin"
                        />
                        <span class="text-lg">Loading Proposals...</span>
                      </div>
                    </td>
                  </tr>
                  <tr
                    v-else-if="recordsData.length == 0"
                    class="hover:bg-emerald-50 transition-colors"
                  >
                    <td colspan="16" class="px-6 py-12 text-center text-gray-500">
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
                            <Icon
                              name="material-symbols:settings"
                              class="w-5 h-5 text-emerald-600"
                            />
                          </div>
                        </div>
                        <div class="text-center">
                          <h3 class="text-xl font-semibold text-gray-700 mb-2">
                            No Proposals found
                          </h3>
                          <p class="text-gray-500 mb-4">
                            Get started by creating your first Proposal
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr
                    v-else
                    v-for="(lead, index) in recordsData"
                    :key="lead.id"
                    class="hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300"
                  >
                    <td class="px-6 py-4 whitespace-nowrap border-e">
                      <span class="font-semibold text-sm">{{ index + 1 }}</span>
                    </td>
                    <td
                      v-for="field in proposalFields"
                      :key="field.id"
                      class="px-6 py-4 whitespace-nowrap border-e text-sm text-gray-600 font-medium"
                    >
                      <router-link
                        :to="{
                          name: 'crm-Deals-proposalDetails-id',
                          params: { id: lead.id }
                        }"
                        class="hover:underline"
                      >
                       {{ formatValue(lead.values.find((e) => e.field_id == field.id)?.value) }}
                      </router-link>

                      <!-- {{lead.values.find(e=>e.field_id == field.id)?.value }} -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
    </div>

    <!-- Toast -->
    <transition name="fade">
      <div
        v-if="toast.show"
        class="fixed bottom-6 right-6 px-5 py-6 rounded-xl shadow-lg text-white text-sm font-medium animate-fadeIn"
        :class="toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'"
      >
        {{ toast.message }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import api from '@/config/api'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { useDealStore } from '@/stores/dealStore'

const dealStore = useDealStore()
const router = useRouter()
const toast = reactive({ show: false, message: '', type: 'success' })

const showToast = (message, type = 'success') => {
  toast.show = true
  toast.message = message
  toast.type = type
  setTimeout(() => (toast.show = false), 3000)
}

const sidebarItems = [
  { path: '/crm/deals/create-proposal', label: 'Create Proposal' },
  { path: '/crm/deals/draftedProposal', label: 'Drafted Proposal' }
]
const activeSidebar = ref(router.currentRoute.value.path)

const proposals = ref([])
const loading = ref(false)

const goBack = () => router.back()

const proposalFields = ref([])
const fetchProposalFields = async () => {
  const { data } = await api().get('/crm/modules/9/fields')
  proposalFields.value = data.data
}
const isLoading = ref(false)
const recordsData = ref([])
const fetchProposals = async () => {
  try {
    isLoading.value = true
    const { data } = await api().get(`/crm/record-child-get/${dealStore?.deal_id}/Deals-Proposals`)
    recordsData.value = data.data
  } catch (error) {
    console.error('Failed to fetch leads:', error)
    showToast('Failed to fetch leads', 'error')
  } finally {
    isLoading.value = false
  }
}

const formatValue = (val) => {
  // If empty or null
  if (!val) return ''

  // Try to parse JSON arrays like ["A", "B", "C"]
  try {
    const parsed = JSON.parse(val)

    // If parsed array → return nicely formatted list
    if (Array.isArray(parsed)) {
      return parsed.join(', ')
    }
  } catch (e) {
    // not JSON → just return normal string
  }

  return val
}


onMounted(() => {
  fetchProposalFields()
  fetchProposals()
})
</script>


<style scoped>
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
aside::-webkit-scrollbar {
  width: 6px;
}
aside::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}
aside::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}
aside::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>
