<script setup>
import { ref, onMounted, reactive, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/config/api'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()
authStore.sidebarOpen = false
const route = useRoute()
const router = useRouter()
const moduleSlug = 5

const moduleData = ref(null)
const form = ref({})
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

const isLoading = ref(false)
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

// ===== Fetch Data for Dropdowns =====
const softwareData = ref([])
const industryData = ref([])
const solutionData = ref([])

const fetchSoftwares = async () => {
  try {
    const { data } = await api().get('/softwares')
    softwareData.value = data.data
  } catch (err) {
    console.error(err)
    alert('Failed to fetch softwares')
  }
}

const fetchIndustry = async () => {
  try {
    const { data } = await api().get('/industries')
    industryData.value = data.data
  } catch (err) {
    console.error(err)
    alert('Failed to fetch industries')
  }
}

const fetchSolution = async () => {
  try {
    const { data } = await api().get('/solutions')
    solutionData.value = data
  } catch (err) {
    console.error(err)
    alert('Failed to fetch solutions')
  }
}

// ===== Filtered Fields =====
const filteredFields = computed(() => {
  return moduleData.value ? moduleData.value.filter(f => f.unique == 0) : []
})

// 🧩 Auto Deal Name (reactive computed)
const dealName = computed(() => {
  const company = route.query.company_name ? route.query.company_name.split(' ').slice(0, 2).join(' ') : ''
  const serviceArea = form.value.service_area_name || ''
  const serviceType = form.value.service_type || ''
  const software = form.value.software_name || ''
  if (!company && !serviceArea && !serviceType && !software) return ''
  return `${company}_${serviceArea}_${serviceType}_${software}`.replace(/_+/g, '_')
})

// Watch and update Deal Name field when dependencies change
watch(dealName, (newVal) => {
  form.value.deal_name = newVal
})

const loading = ref(false)
const parent_id = route.query.parent_id

const saveRecord = async () => {
  loading.value = true
  try {
    // Build payload
    const payload = moduleData.value.map((field) => ({
      field_id: field.id,
      value: form.value[field.name] || null
    }))

    // Add company info
    const company_name = moduleData.value.find(f => f.name === 'company_name')
    if (company_name) {
      payload.push({
        field_id: company_name.id,
        value: route.query.company_name
      })
    }

    const parent_company_name = moduleData.value.find(f => f.name === 'parent_company_name')
    if (parent_company_name) {
      payload.push({
        field_id: parent_company_name.id,
        value: route.query.parent_company
      })
    }

        const account_id_field = moduleData.value.find(f => f.name === 'account_id')
    if (account_id_field && route.query.parent_id) {
      payload.push({
        field_id: account_id_field.id,
        value: route.query.parent_id
      })
    }

    // API call
    const { data } = await api().post(`/crm/modules/${moduleSlug}/records`, { fields: payload })

    if (data) {
      await api().post(`/crm/record-child-create`, {
        parent_record_id: parent_id,
        child_record_id: data.id
      })
    }

    showToast('Record created successfully!')
    form.value = {}
    router.push('/sales_management/accounts')
  } catch (err) {
    console.error(err)
    alert('Failed to create record')
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await Promise.all([fetchFields(), fetchIndustry(), fetchSoftwares(), fetchSolution()])
})
</script>


<template>
  <div class="min-h-screen bg-gradient-to-br from-sky-100 via-indigo-100 to-pink-100 p-8">
    <Breadcrumb class="mb-2" />
    <!-- Show loader when fetching fields -->
    <div v-if="isLoading" class="flex justify-center items-center min-h-[60vh]">
      <div class="flex flex-col items-center gap-3">
        <svg
          class="animate-spin h-10 w-10 text-indigo-600"
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
        <p class="text-indigo-600 font-medium">Loading fields...</p>
      </div>
    </div>
    <div v-if="moduleData" class="flex flex-col items-center">
      <div
        class="w-full bg-white/60 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/40 p-8 transition-transform duration-300 hover:scale-[1.001]"
      >
        <h2
          class="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-500 to-pink-500 tracking-tight"
        >
          ✨ Create New Deal
        </h2>

        <div class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
         <div
  v-for="field in filteredFields"
  :key="field.id"
  class="flex flex-col bg-white/40 border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
>
  <label class="block font-semibold mb-2 text-gray-700">
    {{ field.label }}
  </label>

  <!-- Text, Email, Number -->
  <input
    v-if="['text', 'email', 'number'].includes(field.type) &&
           !['company_name', 'parent_company_name', 'deal_name'].includes(field.name)"
    v-model="form[field.name]"
    :type="field.type"
    class="border border-slate-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all outline-none"
    :placeholder="`Enter ${field.label}`"
  />

<!-- Deal Name (auto-generated) -->
<div v-else-if="field.name === 'deal_name'">
  <input
    :value="dealName"
    disabled
    class="border border-slate-300 bg-gray-100 text-gray-700 rounded-lg p-2 w-full cursor-not-allowed"
  />
  <!-- ✅ Live preview below -->
  <p v-if="dealName" class="text-xs text-gray-600 mt-1 italic text-center">
    Preview: <span class="font-medium text-indigo-600">{{ dealName }}</span>
  </p>
</div>

  <!-- Company Name (disabled) -->
  <input
    v-else-if="field.name === 'company_name'"
    :value="route.query.company_name"
    type="text"
    disabled
    class="border border-slate-300 bg-gray-100 text-gray-700 rounded-lg p-2 w-full cursor-not-allowed"
  />

  <!-- Parent Company (disabled) -->
  <input
    v-else-if="field.name === 'parent_company_name'"
    :value="route.query.parent_company"
    type="text"
    disabled
    class="border border-slate-300 bg-gray-100 text-gray-700 rounded-lg p-2 w-full cursor-not-allowed"
  />

  <!-- Industry Dropdown -->
  <select
    v-else-if="field.name === 'industry_name'"
    v-model="form[field.name]"
    class="border border-slate-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-400 transition-all bg-white"
  >
    <option value="" disabled selected>Select Industry</option>
    <option v-for="industry in industryData" :key="industry.id" :value="industry.name">
      {{ industry.name }}
    </option>
  </select>

  <!-- Software Dropdown -->
  <select
    v-else-if="field.name === 'software_name'"
    v-model="form[field.name]"
    class="border border-slate-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-400 transition-all bg-white"
  >
    <option value="" disabled selected>Select Software</option>
    <option v-for="software in softwareData" :key="software.id" :value="software.name">
      {{ software.name }}
    </option>
  </select>

  <!-- Service Area Dropdown -->
  <select
    v-else-if="field.name === 'service_area'"
    v-model="form[field.name]"
    class="border border-slate-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-400 transition-all bg-white"
  >
    <option value="" disabled selected>Select Service Area</option>
    <option v-for="solution in solutionData" :key="solution.id" :value="solution.name">
      {{ solution.name }}
    </option>
  </select>

  <!-- Generic Selects -->
  <select
    v-else-if="field.type === 'select'"
    v-model="form[field.name]"
    class="border border-slate-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-400 transition-all bg-white"
  >
    <option value="" disabled selected>Select {{ field.label }}</option>
    <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
  </select>

  <!-- Date -->
  <input
    v-else-if="field.type === 'date'"
    v-model="form[field.name]"
    type="date"
    class="border border-slate-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all outline-none"
  />
</div>

        </div>

        <button
          @click="saveRecord"
          :disabled="loading"
          class="bg-gradient-to-r w-1/2 from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition-all mt-6 block mx-auto disabled:opacity-70"
        >
          <span v-if="loading" class="flex items-center gap-2 justify-center">
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
          <span v-else>Save Record</span>
        </button>
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

<style scoped>
/* Smooth fade-in effect */
div[v-if='moduleData'] {
  animation: fadeIn 0.6s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
