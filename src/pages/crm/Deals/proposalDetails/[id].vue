<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar (unchanged) -->
    <aside
      class="w-64 bg-slate-900/90 text-white shadow-xl border-r border-slate-700 backdrop-blur-md px-4 py-6 sticky top-0 h-screen overflow-y-auto"
    >
      <!-- <h2 class="text-lg font-semibold mb-6 px-4 tracking-wide">📂 Related List</h2> -->
      <button
        class="flex items-center w-full justify-center gap-2 mb-4 bg-gray-700 text-white hover:bg-indigo-600 rounded-lg py-2 transition-all duration-300"
        title="Go back"
        @click="goBack"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="currentColor"
        >
          <path
            d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"
          ></path>
        </svg>
        <span class="font-semibold text-sm">All Drafted Proposals</span>
      </button>

      <hr class="pb-6" />
      <div class="mb-6">
        Current Proposal: <br />
        {{ singleLeads.find((a) => a.field?.name === 'deal_name')?.value || 'Loading...' }}
      </div>
      <ul class="space-y-1">
        <li v-for="(item, index) in sidebarItems" :key="index" class="transition-all duration-200">
          <button
            class="w-full text-left py-2 rounded-lg hover:px-2 flex items-center justify-between hover:bg-slate-700/70"
            :class="{ 'bg-blue-600 text-white shadow-md px-2': activeSidebar === item.key }"
            @click="scrollToSection(item.key)"
          >
            <span>{{ item.label }}</span>
            <span
              v-if="item.count"
              class="ml-2 text-xs font-medium bg-blue-500/80 text-white px-2 py-0.5 rounded-full"
            >
              {{ item.count }}
            </span>
          </button>
        </li>
      </ul>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
      <!-- Header -->
      <div class="bg-white shadow-sm px-8 py-5 border-b border-gray-200">
        <h1 class="text-3xl text-center border-b-2 py-1 mb-2 font-bold text-blue-600">
          Accounts Dashboard
        </h1>
        <div class="flex items-center justify-between">
          <div class="text-xl font-semibold">
            <p class="text-gray-600 mt-1 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-4 0H9m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v12m4 0V9m0 12h4m-4 0V9m4 0h2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4m-4 0v12m4-12h2"
                />
              </svg>
              Deal Name:
              {{ singleLeads.find((a) => a.field?.name === 'deal_name')?.value || 'N/A' }}
            </p>
            <p class="text-gray-600 mt-1 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-4 0H9m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v12m4 0V9m0 12h4m-4 0V9m4 0h2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4m-4 0v12m4-12h2"
                />
              </svg>
              Proposal Name:
              {{ singleLeads.find((a) => a.field?.name === 'parent_company')?.value || 'N/A' }}
            </p>
          </div>
          <button
            class="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg px-4 py-2 transition-all duration-300"
            title="Go back"
            @click="goBack"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"
              ></path>
            </svg>
            <span class="font-medium">Back</span>
          </button>
        </div>
      </div>

      <!-- Upper Account Section -->
      <div
        :id="'overview'"
        class="bg-blue-100 shadow-sm rounded-lg p-6 mx-8 my-6 border border-gray-200"
      >
        <!-- Tabs -->
        <div class="flex items-center border-b mb-6 bg-gray-50 px-4 pt-4 rounded-t-lg">
          <button
            v-for="tab in tabs"
            :key="tab"
            class="px-6 py-3 text-sm font-medium rounded-t-lg transition-all mx-1"
            :class="
              overviewTab === tab
                ? 'bg-white border-t border-l border-r border-gray-200 text-blue-600 font-semibold'
                : 'text-gray-500 hover:text-gray-700'
            "
            @click="overviewTab = tab"
          >
            {{ tab }}
          </button>
          <span
            class="ml-auto text-xs text-gray-500 flex items-center bg-white py-1.5 px-3 rounded border border-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1 text-amber-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Last Update: <span class="ml-1 font-medium">4 day(s) ago</span>
          </span>
        </div>

        <!-- Overview Tab -->
        <div v-if="overviewTab === 'Overview'" class="space-y-4 text-sm">
          <div class="bg-white rounded-b-xl shadow-md border border-gray-200 p-6">
            <!-- Loading State -->
            <div v-if="isLoading" class="flex justify-center items-center min-h-[30vh]">
              <svg
                class="animate-spin h-8 w-8 text-blue-600"
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
                />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span class="ml-3 text-gray-600 font-medium">Loading record details...</span>
            </div>

            <!-- Data Display -->
            <div v-else class="grid md:grid-cols-3 gap-6">
              <div
                v-for="item in singleLeads"
                :key="item.id"
                class="flex flex-col bg-gradient-to-r from-blue-50 to-indigo-50 border border-gray-200 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-all"
              >
                <div class="flex justify-between items-start">
                  <div>
                    <p class="text-sm font-semibold text-indigo-700 mb-1">
                      {{ item.field.label }}
                    </p>
                  </div>

                  <div class="flex gap-2">
                    <button
                      v-if="editingId !== item.id"
                      @click="startEdit(item)"
                      class="text-indigo-600 hover:text-indigo-800 transition"
                      title="Edit"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="currentColor"
                      >
                        <path
                          d="M16.7574 2.99678L9.29145 10.4627L9.29886 14.7099L13.537 14.7024L21 7.23943V19.9968C21 20.5491 20.5523 20.9968 20 20.9968H4C3.44772 20.9968 3 20.5491 3 19.9968V3.99678C3 3.4445 3.44772 2.99678 4 2.99678H16.7574ZM20.4853 2.09729L21.8995 3.5115L12.7071 12.7039L11.2954 12.7064L11.2929 11.2897L20.4853 2.09729Z"
                        />
                      </svg>
                    </button>

                    <button
                      v-else
                      class="text-red-500 hover:text-red-700 transition font-bold"
                      title="Cancel"
                      @click="cancelEdit"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <!-- Normal Display -->
                <div v-if="editingId !== item.id" class="mt-1">
                  <p class="text-gray-900 text-lg font-medium break-words">
                    {{ item.value || '—' }}
                  </p>
                </div>

                <!-- Inline Edit Mode -->
                <div v-else class="mt-2 space-y-3">
                  <div>
                    <!-- Text -->
                    <input
                      v-if="item.field.type === 'text'"
                      v-model="editValue"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
                    />

                    <!-- Date -->
                    <input
                      v-else-if="item.field.type === 'date'"
                      v-model="editValue"
                      type="date"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
                    />

                    <!-- Dropdown -->
                    <select
                      v-else-if="item.field.type === 'select'"
                      v-model="editValue"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
                    >
                      <option disabled value="">Select option</option>
                      <option v-for="(opt, i) in item.field.options" :key="i" :value="opt">
                        {{ opt }}
                      </option>
                    </select>
                  </div>

                  <div class="flex justify-end gap-2">
                    <button
                      class="px-3 py-1.5 text-sm rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      @click="cancelEdit"
                    >
                      Cancel
                    </button>
                    <button
                      @click="saveEdit(item)"
                      class="px-4 py-1.5 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60 flex items-center gap-2"
                      :disabled="saving"
                    >
                      <svg
                        v-if="saving"
                        class="animate-spin h-4 w-4 text-white"
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
                        />
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      <span>{{ saving ? 'Saving...' : 'Save' }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty state -->
            <div
              v-if="!isLoading && singleLeads.length === 0"
              class="text-center py-12 text-gray-500"
            >
              No data found for this record.
            </div>
          </div>
        </div>

        <!-- Timeline Tab -->
        <div v-else-if="overviewTab === 'Timeline'" class="space-y-3 text-center py-8">
          <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12 mx-auto text-gray-400 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p class="text-gray-600">Timeline data will appear here...</p>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script setup>
import api from '@/config/api'
import { useAuthStore } from '@/stores/AuthStore'
import { ref, onMounted, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
authStore.sidebarOpen = false
const showModal = ref(false)
const tabs = ['Overview']
const overviewTab = ref('Overview')

const sidebarItems = [
  { key: 'overview', label: 'Overview' },

]


const activeSidebar = ref('overview')



const scrollToSection = (sectionId) => {
  activeSidebar.value = sectionId
  const element = document.getElementById(sectionId)
  const container = document.querySelector('.flex-1.flex.flex-col.overflow-y-auto')

  if (element && container) {
    const headerOffset = 100
    const elementPosition = element.offsetTop
    const offsetPosition = elementPosition - headerOffset

    container.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })

    element.classList.add('ring-2', 'ring-blue-400', 'ring-opacity-70')
    setTimeout(() => {
      element.classList.remove('ring-2', 'ring-blue-400', 'ring-opacity-70')
    }, 2000)
  }
}

const goBack = () => {
  router.back()
}

const accounts = ref([])
const isLoading = ref(true)
const currentPage = ref(1)
const perPage = ref(20)
const totalPages = ref(1)
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

const singleLeads = ref([])
const editingId = ref(null)
const editValue = ref('')
const saving = ref(false)

const fetchSingleLeads = async () => {
  try {
    isLoading.value = true
    const { data } = await api().get(`/crm/record-values/${route.params.id}`)
    singleLeads.value = data.values || []
  } catch (err) {
    console.error('Error fetching leads:', err)
  } finally {
    isLoading.value = false
  }
}

// Start editing
const startEdit = (item) => {
  editingId.value = item.id
  editValue.value = item.value || ''
}

// Cancel editing
const cancelEdit = () => {
  editingId.value = null
  editValue.value = ''
}

// Save changes
const saveEdit = async (item) => {
  saving.value = true
  try {
    await api().post(`/crm/record-values/${item.id}`, {
      value: editValue.value,
      _method: 'PUT'
    })

    // Update local array
    const index = singleLeads.value.findIndex((v) => v.id === item.id)
    if (index !== -1) singleLeads.value[index].value = editValue.value

    cancelEdit()
  } catch (err) {
    console.error('Failed to update:', err)
  } finally {
    saving.value = false
  }
}

const form = ref({
  companyName: route.query.name || '',
  industry: route.query.industry || '',
  title: '',
  email: '',
  phone: '',
  phone1: '',
  mobile: '',
  mobile1: '',
  firstName: '',
  lastName: ''
})


const editableTitle = ref(false)

const makeTitleEditable = () => {
  editableTitle.value = true
}

const handleSubmit = () => {
  console.log('Form Submitted:', form.value)
  closeModal()
}

const closeModal = () => {
  showModal.value = false
  editableTitle.value = false
  Object.keys(form.value).forEach((k) => (form.value[k] = ''))
  form.value.companyName = route.query.name
  form.value.industry = route.query.industry
}

const resetForm = () => {
  form.value = {
    companyName: route.query.name || '',
    industry: route.query.industry || '',
    title: '',
    email: '',
    phone: '',
    phone1: '',
    mobile: '',
    mobile1: '',
    firstName: '',
    lastName: ''
  }
}

const leads = ref([])
const fields = ref([])
const contactFields = ref([])
const dealFields = ref([])

const fetchFields = async () => {
  const { data } = await api().get('/crm/modules/2/fields')
  fields.value = data.data
}
const fetchContactFields = async () => {
  const { data } = await api().get('/crm/modules/3/fields')
  contactFields.value = data.data
}
const fetchDealFields = async () => {
  const { data } = await api().get('/crm/modules/5/fields')
  dealFields.value = data.data
}
const fetchLeads = async (page = 1) => {
  try {
    isLoading.value = true
    // Mock data for demonstration - replace with actual API call

    const { data } = await api().get(
      `/crm/modules/2/records?page=${page}&per_page=${perPage.value}`
    )
    leads.value = data.data.filter((e) => e.id == route.params.id)
  } catch (error) {
    console.error('Failed to fetch leads:', error)
    showToast('Failed to fetch leads', 'error')
  } finally {
    isLoading.value = false
  }
}

const recordsData = ref([])
const fetchContacts = async () => {
  try {
    isLoading.value = true
    const { data } = await api().get(`/crm/record-child-get/${route.params.id}/Accounts-Contacts`)
    recordsData.value = data.data
  } catch (error) {
    console.error('Failed to fetch leads:', error)
    showToast('Failed to fetch leads', 'error')
  } finally {
    isLoading.value = false
  }
}

const moduleSlug = 8
const showForm = ref(false)
const moduleData2 = ref(null)
const loading = ref(false)
const addNotes = () => {
  showForm.value = !showForm.value
}
const fetchNotesFields = async () => {
  isLoading.value = true
  try {
    const { data } = await api().get(`/crm/modules/${moduleSlug}/fields`)
    moduleData2.value = data.data || []
  } catch (err) {
    console.error(err)
    alert('Failed to fetch fields')
  } finally {
    isLoading.value = false
  }
}

const notesData = ref([])
const fetchNotes = async () => {
  try {
    isLoading.value = true
    const { data } = await api().get(`/crm/record-child-get/${route.params.id}/Accounts-Notes`)
    notesData.value = data.data
  } catch (error) {
    console.error('Failed to fetch leads:', error)
    showToast('Failed to fetch leads', 'error')
  } finally {
    isLoading.value = false
  }
}

const visibleFields = computed(() => moduleData2.value.filter((field) => field.type !== 'date'))

const parent_id = route.params.id
const saveRecord = async () => {
  loading.value = true
  try {
    const payload = moduleData2.value.map((field) => ({
      field_id: field.id,
      value: form.value[field.name] || null
    }))
    const dateField = moduleData2.value.find((f) => f.type === 'date')
    if (dateField) {
      payload.push({
        field_id: dateField.id,
        value: new Date().toISOString().split('T')[0]
      })
    }

    const { data } = await api().post(`/crm/modules/${moduleSlug}/records`, {
      fields: payload
    })

    if (data) {
      await api().post(`/crm/record-child-create`, {
        parent_record_id: parent_id,
        child_record_id: data.id
      })
    }
    showToast('Note created successfully!')
    showForm.value = false
    await fetchNotesFields()
    await fetchNotes()
    form.value = {}
  } catch (err) {
    console.error(err)
    alert('Failed to create record')
  } finally {
    loading.value = false
  }
}


const dealsData = ref([])
const fetchDeals = async () => {
  try {
    isLoading.value = true
    const { data } = await api().get(`/crm/record-child-get/${route.params.id}/Accounts-Deals`)
    dealsData.value = data.data
  } catch (error) {
    console.error('Failed to fetch leads:', error)
    showToast('Failed to fetch leads', 'error')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchSingleLeads()
  fetchFields()
  fetchLeads()
  fetchNotes()
  fetchNotesFields()
  fetchContactFields()
  fetchContacts()
  fetchDealFields()
  fetchDeals()
  if (route.hash) {
    const sectionId = route.hash.replace('#', '')
    setTimeout(() => {
      scrollToSection(sectionId)
    }, 100)
  }
})
</script>

<style scoped>
.input-field {
  @apply w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all;
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
