<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar (unchanged) -->
    <aside
      class="w-64 bg-slate-900/90 text-white shadow-xl border-r border-slate-700 backdrop-blur-md px-4 py-6 sticky top-0 h-screen overflow-y-auto"
    >
      <!-- <h2 class="text-lg font-semibold mb-6 px-4 tracking-wide">📂 Related List</h2> -->
         <button
        class="flex items-center mb-4 bg-gray-700 text-white hover:bg-indigo-600 rounded-lg px-4 py-2 transition-all duration-300"
        title="Go back"
        @click="goBack"
      >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M4.83582 12L11.0429 18.2071L12.4571 16.7929L7.66424 12L12.4571 7.20712L11.0429 5.79291L4.83582 12ZM10.4857 12L16.6928 18.2071L18.107 16.7929L13.3141 12L18.107 7.20712L16.6928 5.79291L10.4857 12Z"></path></svg>
        <span class="font-semibold text-sm ">{{ route.query.deal_name|| 'Back' }}</span>
      </button>

      <hr class="pb-6"/>
      <ul class="menu space-y-1">
<li v-for="(item, index) in sidebarItems" :key="index" class="transition-all duration-200">
  <router-link
    :to="item.path"
    class="w-full text-left px-3 py-2 rounded-lg flex items-center justify-between hover:bg-slate-700/70"
    :class="{ 'bg-blue-600 text-white shadow-md': activeSidebar === item.path }"
  >
    <span>{{ item.label }}</span>
    <span
      v-if="item.count"
      class="ml-2 text-xs font-medium bg-blue-500/80 text-white px-2 py-0.5 rounded-full"
    >
      {{ item.count }}
    </span>
  </router-link>
</li>

      </ul>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-pink-50 py-6 px-6">
    <Breadcrumb class="mb-6" />

    <!-- {{ dealStore }} -->

    <div
      class=" mx-auto bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-white/40 transition-all hover:shadow-[0_0_50px_-10px_rgba(99,102,241,0.2)]"
    >
      <h2
        class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 text-center mb-10 tracking-tight"
      >
        Create Proposal
      </h2>

      <!-- Forwarding Letter -->
      <div class="mb-10">
        <label class="block text-gray-700 font-semibold mb-2">Forwarding Letter</label>
        <textarea
          v-model="form.forwarding_letter"
          rows="6"
          placeholder="Write your forwarding letter here..."
          class="w-full border border-gray-200 rounded-2xl p-4 focus:outline-none focus:ring-4 focus:ring-indigo-100 shadow-sm bg-white/60 backdrop-blur-sm transition-all"
        ></textarea>
      </div>

      <!-- Deal Info Section -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 bg-gradient-to-r from-indigo-50 via-teal-50 to-sky-50 border border-gray-100 rounded-2xl p-6 mb-10 shadow-inner"
      >
        <div
          v-for="(item, index) in dealInfo"
          :key="index"
          class="p-5 rounded-2xl bg-white/50 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-[2px] transition-all"
        >
          <p class="text-sm text-indigo-600 font-semibold mb-1">{{ item.label }}</p>
          <p class="text-gray-800 font-medium">{{ item.value || '—' }}</p>
        </div>
      </div>

      <!-- Proposal Amount -->
      <div class="mb-10">
        <label class="block text-gray-700 font-semibold mb-2">Proposal Amount</label>
        <input
          v-model="form.proposal_amount"
          type="number"
          placeholder="Enter proposal amount..."
          class="w-full border border-gray-200 rounded-2xl p-4 focus:outline-none focus:ring-4 focus:ring-indigo-100 shadow-sm bg-white/60 backdrop-blur-sm transition-all"
        />
      </div>

      <!-- Terms and Conditions -->
      <section class="mb-10">
        <h3 class="text-lg font-semibold text-gray-700 mb-3">Terms and Conditions</h3>
        <div class="flex gap-3 mb-4">
          <input
            v-model="newTerm"
            type="text"
            placeholder="Enter a term..."
            class="flex-1 border border-gray-200 rounded-xl p-3 bg-white/70 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-indigo-100 transition"
          />
          <button
            @click="addTerm"
            class="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl shadow-md hover:shadow-lg hover:scale-[1.03] transition"
          >
            Add
          </button>
        </div>

        <ul class="space-y-2">
          <li
            v-for="(term, index) in form.terms_and_conditions"
            :key="index"
            class="flex justify-between items-center bg-white/70 px-4 py-2.5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
          >
            <span class="text-gray-700">{{ index + 1 }}. {{ term }}</span>
            <button
              @click="removeTerm(index)"
              class="text-red-500 hover:text-red-600 transition text-sm font-medium"
            >
              Remove
            </button>
          </li>
        </ul>
      </section>

      <!-- Special Terms -->
      <section class="mb-10">
        <h3 class="text-lg font-semibold text-gray-700 mb-3">Special Terms and Conditions</h3>
        <div class="flex gap-3 mb-4">
          <input
            v-model="newSpecial"
            type="text"
            placeholder="Enter a special condition..."
            class="flex-1 border border-gray-200 rounded-xl p-3 bg-white/70 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-pink-100 transition"
          />
          <button
            @click="addSpecial"
            class="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl shadow-md hover:shadow-lg hover:scale-[1.03] transition"
          >
            Add
          </button>
        </div>

        <ul class="space-y-2">
          <li
            v-for="(special, index) in form.special_terms_and_conditions"
            :key="index"
            class="flex justify-between items-center bg-white/70 px-4 py-2.5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
          >
            <span class="text-gray-700">{{ index + 1 }}. {{ special }}</span>
            <button
              @click="removeSpecial(index)"
              class="text-red-500 hover:text-red-600 transition text-sm font-medium"
            >
              Remove
            </button>
          </li>
        </ul>
      </section>
          <div class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        <div
          v-for="field in moduleData"
          :key="field.id"
          class="flex flex-col bg-white/40 border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
        >
          <label class="block font-semibold mb-2 text-gray-700">
            {{ field.label }}
          </label>

<input
  v-if="['text', 'email', 'number'].includes(field.type) && !['company_name', 'parent_company_name'].includes(field.name)"
  v-model="form[field.name]"
  :type="field.type"
  class="border border-slate-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all outline-none"
  :placeholder="`Enter ${field.label}`"
/>


<input
  v-else-if="field.name === 'company_name'"
  :value="route.query.company_name"
  type="text"
  disabled
  class="border border-slate-300 bg-gray-100 text-gray-700 rounded-lg p-2 w-full cursor-not-allowed"
/>


<input
  v-else-if="field.name === 'parent_company_name'"
  :value="route.query.parent_company"
  type="text"
  disabled
  class="border border-slate-300 bg-gray-100 text-gray-700 rounded-lg p-2 w-full cursor-not-allowed"
/>

          <select
            v-else-if="field.type === 'select'"
            v-model="form[field.name]"
            class="border border-slate-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all outline-none bg-white"
          >
            <option value="" disabled selected>Select {{ field.label }}</option>
            <option
              v-for="opt in field.options"
              :key="opt"
              :value="opt"
              class="capitalize"
            >
              {{ opt }}
            </option>
          </select>

          <input
            v-else-if="['date',].includes(field.type)"
            v-model="form[field.name]"
            :type="field.type"
            class="border border-slate-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all outline-none"
            :placeholder="`Enter ${field.label}`"
          />
        </div>
      </div>
      <!-- Submit Button -->
      <div class="text-center mt-10">
        <button
          @click="saveProposal"
          :disabled="loading"
          class="relative inline-flex items-center justify-center bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 text-white font-semibold rounded-2xl px-10 py-3 shadow-md hover:shadow-lg hover:scale-[1.03] transition disabled:opacity-60"
        >
          <span v-if="loading" class="absolute left-5 animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
          <span>{{ loading ? 'Saving...' : 'Save Proposal' }}</span>
        </button>
      </div>
    </div>
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
import { useAuthStore } from '@/stores/AuthStore'
import { ref, onMounted, computed, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { useDealStore } from '@/stores/dealStore'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const dealStore = useDealStore()
authStore.sidebarOpen = false
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

const sidebarItems = [
  { path: '/sales_management/deals/createproposal', label: 'Create Proposal' },
  { path: '/sales_management/deals/draftedProposal', label: 'Drafted Proposal' }
]

const activeSidebar = ref(router.currentRoute.value.path)

watch(
  () => router.currentRoute.value.path,
  (newPath) => {
    activeSidebar.value = newPath
  }
)


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

const form = ref({
  forwarding_letter: '',
  proposal_amount: '',
  terms_and_conditions: [],
  special_terms_and_conditions: [],
  deal_name :dealStore.deal_name ,
  software_area :  dealStore.software_area ,
  software_name: dealStore.software_name,
  industry : dealStore.industry ,
  service_type :  dealStore.service_type ,
  account_id : dealStore.account_id,
  status : 0
})
const isLoading = ref(false)
const moduleData = ref()
const fetchFields = async () => {
  isLoading.value = true
  try {
    const { data } = await api().get('/crm/modules/9/fields')
    const keys = [
      'forwarding_letter',
      'proposal_amount',
      'terms_and_conditions',
      'special_terms_and_conditions',
      'deal_name',
      'software_area',
      'software_name',
      'industry',
      'service_type',
      'account_id',
      'status'
    ]

    moduleData.value = data.data.filter(e => !keys.includes(e.name))

    console.log(moduleData.value)
  } catch (err) {
    console.error(err)
    showToast('❌ Failed to fetch fields', 'error')
  } finally {
    isLoading.value = false
  }
}





const newTerm = ref('')
const newSpecial = ref('')


const dealInfo = computed(() => [
  { label: 'Deal Name', value: dealStore.deal_name },
  { label: 'Software Area', value: dealStore.software_area },
  { label: 'Software Name', value: dealStore.software_name },
  { label: 'Industry', value: dealStore.industry },
  { label: 'Service Type', value: dealStore.service_type }
])

const addTerm = () => {
  if (newTerm.value.trim()) {
    form.value.terms_and_conditions.push(newTerm.value)
    newTerm.value = ''
  }
}
const removeTerm = (index) => form.value.terms_and_conditions.splice(index, 1)

const addSpecial = () => {
  if (newSpecial.value.trim()) {
    form.value.special_terms_and_conditions.push(newSpecial.value)
    newSpecial.value = ''
  }
}
const removeSpecial = (index) => form.value.special_terms_and_conditions.splice(index, 1)
const loading = ref(false)
const saveProposal = async () => {
  loading.value = true
  try {
    const payload = {
      deal_id: dealStore.deal_id,
      account_id: dealStore.account_id,
      ...form.value,
      deal_name: dealStore.deal_name,
      software_name: dealStore.software_name,
      industry: dealStore.industry,
      service_type: dealStore.service_type,
      software_area: dealStore.software_area,
      status: 0,
    }

    await api().post('/proposalzz', payload)
    showToast('✅ Proposal created successfully!', 'success')
  } catch (err) {
    console.error(err)
      showToast('❌ Failed to create proposal', 'error')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchFields()
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
