<template>
  <div
    class="min-h-screen text-gray-800 bg-gradient-to-br from-cyan-50 via-blue-50 to-violet-50 relative overflow-hidden p-8"
  >
    <!-- Ambient gradient orbs -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute w-[500px] h-[500px] bg-cyan-300/30 blur-3xl rounded-full top-[-100px] left-[-100px] animate-pulse"
      ></div>
      <div
        class="absolute w-[400px] h-[400px] bg-violet-400/30 blur-3xl rounded-full bottom-[-150px] right-[-150px] animate-pulse"
      ></div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-10 relative z-10">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-4">
          <img
            :src="logoSrc"
            alt="Hi Tech Softsys"
            class="w- h-14 rounded-xl object-cover shadow-lg ring-2 ring-cyan-400/50"
          />

          <div>
            <h1
              class="text-3xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600 bg-clip-text text-transparent"
            >
              Convert Leads
              <span class="text-sm font-normal text-gray-500"
                >({{ leadId }} -
                {{ leads[0]?.values.find(e => e.field?.name == 'company_name')?.value || 'N/A' }})</span
              >
            </h1>
            <p class="text-sm text-gray-500 mt-1">
              Convert this lead into an Account in your Vermont Composite system
            </p>
          </div>
        </div>

        <div class="hidden sm:flex items-center gap-3">
          <button
            class="text-sm px-3 py-1.5 rounded-md bg-gradient-to-r from-cyan-100 to-violet-100 text-cyan-800 border border-cyan-200 hover:from-cyan-200 hover:to-violet-200 transition"
            @click="goBack"
          >
            Back
          </button>
        </div>
      </div>

      <!-- Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Main content -->
        <main class="lg:col-span-9">
          <div
            class="bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-cyan-100/50 shadow-xl shadow-cyan-100/50 hover:shadow-violet-100/60 transition"
          >
            <!-- Create new account -->
            <div class="space-y-5">
              <div class="flex flex-col sm:flex-row sm:items-center sm:gap-6">
                <div class="flex items-center gap-3">
                  <span class="text-sm text-gray-600">Create New Account</span>
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-md bg-gradient-to-r from-cyan-100 to-violet-100 text-cyan-800 text-sm font-medium shadow-inner"
                  >
                   {{ leads[0]?.values.find(e => e.field?.name == 'company_name')?.value || 'N/A' }}
                  </span>
                </div>
              </div>

              <hr class="my-2 border-slate-200/50" />

              <!-- Create Account checkbox -->
              <label class="inline-flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  v-model="createDeal"
                  class="form-checkbox h-4 w-4 text-cyan-600 rounded focus:ring-cyan-400"
                />
                <span>Create a new Account for this Lead.</span>
              </label>

              <!-- Owner / Notify -->
              <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm text-gray-600 mb-2">Owner of the New Records</label>
                  <div class="flex items-center gap-3">
                    <input
                      v-model="owner"
                      type="text"
                      placeholder="Select owner"
                      class="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400/50 shadow-sm"
                    />
                    <button
                      class="p-2 bg-gradient-to-r from-cyan-50 to-violet-50 border rounded-md text-cyan-700 hover:from-cyan-100 hover:to-violet-100 transition"
                      @click="pickOwner"
                      title="Assign owner"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5.121 17.804A13.937 13.937 0 0112 15c2.761 0 5.291.86 7.379 2.326M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- <label class="inline-flex items-start gap-2 text-sm text-gray-700 mt-6 sm:mt-0">
                  <input type="checkbox" v-model="notifyOwner" class="form-checkbox h-4 w-4 text-cyan-600 rounded focus:ring-cyan-400" />
                  <span>Notify record owner (Account and Contact).</span>
                </label> -->
              </div>

              <!-- Buttons -->
              <div class="mt-8 flex items-center gap-4">
                <button
                  class="px-6 py-2.5 rounded-lg text-white font-semibold bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 shadow-md hover:shadow-lg transition"
                  :disabled="isLoading"
                  @click="saveRecord"
                >
                  <span v-if="isLoading" class="flex items-center gap-2 justify-center">
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
                      />
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Saving...
                  </span>
                  <span v-else>Convert to Accounts</span>
                </button>

                <button
                  class="px-5 py-2.5 rounded-lg border bg-white/60 text-slate-700 hover:bg-slate-100 transition font-medium"
                  @click="onCancel"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
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

<script setup>
import api from '@/config/api'
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const logoSrc = '/logo.png'

const leadId = ref(route.params.id)
const leadName = ref(route.query.name)
const selectedAccount = ref(route.query.name)
const selectedContact = ref(route.query.name)
const goBack = () => {
  router.go(-1)
}
const createDeal = ref(false)
const owner = ref('Vermont Composite')
const notifyOwner = ref(true)

function pickOwner() {
  const options = ['HTSS', 'Rasik', 'Admin', 'Sales Manager']
  const idx = (options.indexOf(owner.value) + 1) % options.length
  owner.value = options[idx]
}

function onConvert() {
  const payload = {
    leadId: leadId.value,
    leadName: leadName.value,
    createDeal: createDeal.value,
    owner: owner.value,
    notifyOwner: notifyOwner.value,
    account: selectedAccount.value,
    contact: selectedContact.value
  }
  console.log('Converting lead with payload:', payload)
  alert('Lead converted. Check Accounts page now.')
}

function onCancel() {
  if (window?.history?.length > 1) {
    window.history.back()
  } else {
    createDeal.value = false
    owner.value = 'HTSS'
    notifyOwner.value = true
  }
}

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

const leads = ref([])
const fields = ref([])
const isLoading = ref(false)
const perPage = ref(20)
const fetchFields = async () => {
  const { data } = await api().get('/crm/modules/1/fields')
  fields.value = data.data
}
const fetchLeads = async (page = 1) => {
  try {
    isLoading.value = true
    // Mock data for demonstration - replace with actual API call

    const { data } = await api().get(
      `/crm/modules/1/records?page=${page}&per_page=${perPage.value}`
    )
    leads.value = data.data.filter((e) => e.id == route.params.id)
  } catch (error) {
    console.error('Failed to fetch leads:', error)
    showToast('Failed to fetch leads', 'error')
  } finally {
    isLoading.value = false
  }
}

const saveRecord = async () => {
  isLoading.value = true
  try {
    const { data } = await api().post(`/crm/convert-to-accounts/${route.params.id}`)

    showToast('Leads converted successfully!')
  } catch (err) {
    console.error(err)
    showToast('Error')
    alert('Failed to create record')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchFields()
  fetchLeads()
})
</script>
