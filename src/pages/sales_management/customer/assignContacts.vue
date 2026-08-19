<script setup>
import { ref, onMounted, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/config/api'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { useAuthStore } from '@/stores/AuthStore'
import Swal from 'sweetalert2'

const authStore = useAuthStore()
// authStore.sidebarOpen = true
const route = useRoute()
const moduleSlug = 3

const moduleData = ref([])
const recordsData = ref([])
const dealsContactData = ref([])
const selectedContacts = ref(new Set())
const isLoading = ref(false)
const loading = ref(false)

// Toast handling
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

// ✅ Fetch module fields
const fetchFields = async () => {
  isLoading.value = true
  try {
    const { data } = await api().get(`/crm/modules/${moduleSlug}/fields`)
    moduleData.value = data.data
  } catch (err) {
    console.error(err)
    alert('Failed to fetch fields')
  } finally {
    isLoading.value = false
  }
}

// ✅ Fetch account contacts
const fetchContacts = async () => {
  try {
    isLoading.value = true
    const { data } = await api().get(
      `/crm/record-child-get/${route.query.account_id}/Accounts-Contacts`
    )
    recordsData.value = data.data || []
  } catch (error) {
    console.error('Failed to fetch contacts:', error)
    showToast('Failed to fetch contacts', 'error')
  } finally {
    isLoading.value = false
  }
}

// ✅ Fetch deal contacts
const fetchDealContacts = async () => {
  try {
    isLoading.value = true
    const { data } = await api().get(
      `/crm/record-child-get/${route.query.deal_id}/Deals-Contacts`
    )
    dealsContactData.value = data.data || []
  } catch (error) {
    console.error('Failed to fetch deal contacts:', error)
    showToast('Failed to fetch deal contacts', 'error')
  } finally {
    isLoading.value = false
  }
}

const getAccountContactType = (lead) => {
  const type = lead.values.find(v => v.field.name === "account_contact_type")
  return type?.value || null
}



// ✅ Computed: IDs already assigned to deal
const alreadyAssignedIds = computed(() =>
  new Set(dealsContactData.value.map((d) => d.id))
)

// ✅ Handle checkbox toggle
const toggleContact = (contactId) => {
  if (alreadyAssignedIds.value.has(contactId)) return
  if (selectedContacts.value.has(contactId)) {
    selectedContacts.value.delete(contactId)
  } else {
    selectedContacts.value.add(contactId)
  }
}

const accountType = (contact) => {
  return contact.values.find(v => v.field?.name === "account_contact_type")?.value || null
}

// ✅ Assign selected contacts
const saveRecord = async () => {
  if (selectedContacts.value.size === 0) {
    showToast('No contacts selected', 'error')
    return
  }

  loading.value = true
  try {
    const parent_id = route.query.account_id
    const deal_id = route.query.deal_id

    for (const contactId of selectedContacts.value) {
      await api().post(`/crm/record-child-create`, {
        parent_record_id: deal_id, // ✅ Deal as parent
        child_record_id: contactId
      })
    }

    showToast('Contacts assigned successfully!')
    selectedContacts.value.clear()
    await fetchDealContacts() // Refresh assigned list
  } catch (err) {
    console.error(err)
    alert('Failed to assign contacts')
  } finally {
    loading.value = false
  }
}


const assignToCustomer = async (contact) => {
  // 1. Ask for confirmation first
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "Do you want to assign this contact as a Customer?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, assign it!'
  })

  // 2. If user cancels, stop execution here
  if (!result.isConfirmed) return

  // --- EXISTING LOGIC STARTS HERE ---
  const field = moduleData.value.find(f => f.name === "account_contact_type")
  if (!field) return
  console.log(contact);

  const existing = contact.values.find(v => v.field?.name === "account_contact_type")

  // CREATE if empty / null
  if (!existing) {
    const { data } = await api().post(`/crm/create-values/${contact.id}`, {
      field_id: field.id,
      value: "Customer"
    })

    contact.values.push({
      ...data.data,
      field: field
    })
  }

  // UPDATE if exists
  else {
    await api().post(`/crm/record-values/${existing.id}`, {
      value: "Customer",
      _method: "PUT"
    })

    existing.value = "Customer"
  }

  // Success Alert
  Swal.fire({
    icon: 'success',
    title: 'Assigned!',
    text: 'Contact assigned to customer.',
    timer: 1200,
    showConfirmButton: false
  })
}


const removeFromCustomer = async (contact) => {
  // 1. Ask for confirmation first
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "Do you want to remove this contact from Customers?",
    icon: 'warning', // Warning icon for destructive/removal actions
    showCancelButton: true,
    confirmButtonColor: '#d33', // Red color for removal
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, remove it!'
  })

  // 2. If user cancels, stop execution here
  if (!result.isConfirmed) return

  // --- EXISTING LOGIC STARTS HERE ---
  const existing = contact.values.find(v => v.field?.name === "account_contact_type")
  if (!existing) return

  await api().post(`/crm/record-values/${existing.id}`, {
    value: "Not Customer",
    _method: "PUT"
  })

  existing.value = "Not Customer"

  // Success Alert
  Swal.fire({
    icon: 'success',
    title: 'Removed!',
    text: 'Contact removed from customer.',
    timer: 1200,
    showConfirmButton: false
  })
}

onMounted(async () => {
  await fetchFields()
  await fetchContacts()
  await fetchDealContacts()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-sky-100 via-indigo-100 to-pink-100 p-8">
    <Breadcrumb class="mb-2" />

    <!-- Contacts Section -->
    <section
      id="contacts"
      class="bg-cyan-100 shadow-sm rounded-lg p-6 w-full border border-gray-200 transition-all duration-300 hover:shadow-md"
    >
      <div class="flex items-start justify-between mb-4">
        <h2 class="text-xl font-semibold flex items-center text-gray-800">
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
          Assign Contacts
        </h2>
      </div>

      <div class="space-y-3 text-sm bg-gray-50 p-5 rounded-lg border border-gray-100">
        <!-- Loading Spinner -->
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
                <th class="px-6 py-4 border-x text-left text-xs font-bold text-emerald-700 uppercase">
                  Action
                </th>
                <th
                  v-for="field in moduleData"
                  :key="field.id"
                  class="px-6 py-4 text-nowrap text-left text-xs border-e font-bold text-emerald-700 uppercase tracking-wider"
                >
                  {{ field.label }}
                </th>
                <th class="px-6 py-4"></th>
              </tr>
            </thead>

            <tbody class="bg-white divide-y divide-gray-100">
              <tr
                v-for="lead in recordsData"
                :key="lead.id"
                :class="[
                  'transition-all duration-300',
                  alreadyAssignedIds.has(lead.id)
                    ? 'bg-emerald-50 opacity-75'
                    : 'hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50'
                ]"
              >
              
                                <!-- Customer Assignment Column -->
<td class="px-6 py-4 whitespace-nowrap text-sm">
  <!-- If Customer → show REMOVE -->
  <template v-if="getAccountContactType(lead) === 'Customer'">
    <button
      class="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded font-semibold hover:underline"
      @click="removeFromCustomer(lead, 'Not Customer')"
    >
      Remove from Customer
    </button>
  </template>

  <!-- If Null OR Not Customer → show ASSIGN -->
  <template v-else>
    <button
      class="bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 rounded font-semibold hover:underline"
      @click="assignToCustomer(lead, 'Customer')"
    >
      Assign to Customer
    </button>
  </template>
</td>

                <td
                  v-for="field in moduleData"
                  :key="field.id"
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium"
                >
                  {{ lead.values.find((e) => e.field_id == field.id)?.value }}
                </td>

                <td v-if="alreadyAssignedIds.has(lead.id)" class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium"
                  >
                    ✅ Already Assigned
                  </span>
                </td>




              </tr>
            </tbody>
          </table>
        </div>

        <!-- Assign Button -->
        <!-- <div class="flex justify-end mt-6">
          <button
            @click="saveRecord"
            :disabled="loading || selectedContacts.size === 0"
            class="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="animate-pulse">Assigning...</span>
            <span v-else>Assign Selected</span>
          </button>
        </div> -->
      </div>
    </section>
      <transition name="fade">
      <div
        v-if="toast.show"
        class="fixed bottom-6 right-6 px-5 py-6 rounded-xl shadow-lg text-white text-sm font-medium animate-fadeIn"
        :class="toast.type == 'success' ? 'bg-green-500' : 'bg-red-500'"
      >
        {{ toast.message }}
      </div>
    </transition>
  </div>
</template>

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
</style>