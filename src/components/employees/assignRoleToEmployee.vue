<script setup>
import { ref, onMounted } from 'vue'
import api from '@/config/api'
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()
import { watch } from 'vue'


/* -------------------------------
   Role → Department Map
-------------------------------- */
const ROLE_DEPARTMENT_MAP = {
  // Customer Success
  'customer_success_management_manager': 6,
  'customer_success_management_director': 6,
  'customer_success_management_executive': 6,

  // Sales
  'sales-vp': 3,
  'sales-manager': 3,
  'sales-director': 3,
  'sales-executive': 3,

  // CRM
  'crm_vp': 22,
  'crm_manager': 22,
  'crm-director': 22,
  'crm_executive': 22,

  // Training
  'training-vp': 6,
  'training_manager': 6,
  'training_director': 6,
  'training_executive': 6,

  // Software
  'software_management_system_vp': 1 && 2,
  'software_management_system_manager': 1 && 2,
  'software_management_system_director': 1 && 2,
  'software_management_system_executive': 1 && 2,

  // HR
  'hr_vp': 5,
  'hr_manager': 5,
  'hr_director': 5,
  'hr_executive': 5,

  // Marketing / Media
  'media_management_system_vp': 4,
  'media_management_system_manager': 4,
  'media_management_system_director': 4,
  'media_management_system_executive': 4,

  // Accounts
  'accounts_management_system_vp': 6,
  'accounts_management_system_manager': 6,
  'accounts_management_system_director': 6,
  'accounts_management_system_executive': 6,

  // Operation
  'operation_management_system_vp': 6,
  'operation_management_system_manager': 6,
  'operation_management_system_director': 6,
  'operation_management_system_executive': 6,

  // Supply
  'supply_management_system_vp': 6,
  'supply_management_system_manager': 6,
  'supply_management_system_director': 6,
  'supply_management_system_executive': 6,

  // Website
  'website_management_system_vp': 1,
  'website_management_system_manager': 1,
  'website_management_system_director': 1,
  'website_management_system_executive': 1,

  // User Management
  'user_management_system_vp': 6,
  'user_management_system_manager': 6,
  'user_management_system_director': 6,
  'user_management_system_executive': 6,

  // Partner Management
  'partner_management_system_vp': 6,
  'partner_management_system_manager': 6,
  'partner_management_system_director': 6,
  'partner_management_system_executive': 6,

  // Customer Management
  'customer_management_system_vp': 6,
  'customer_management_system_manager': 6,
  'customer_management_system_director': 6,
  'customer_management_system_executive': 6,
}

/* --------------------------------
   Department → Assignable Roles
--------------------------------- */
const DEPARTMENT_ROLE_OPTIONS = {
  6: [ // Customer Success / CRM / Ops / etc
    {
      label: 'Training Manager',
      value: 'training-manager'
    },
    {
      label: 'Training Executive',
      value: 'training-executive'
    }
  ],

  3: [ // Sales
    {
      label: 'Sales Manager',
      value: 'sales-manager'
    },
    {
      label: 'Sales Executive',
      value: 'sales-executive'
    }
  ],

  2: [ // Software / Website
    {
      label: 'Software Manager',
      value: 'software_management_system_manager'
    },
    {
      label: 'Software Executive',
      value: 'software_management_system_executive'
    }
  ],
  2: [ // Software / Website
    {
      label: 'Software Manager',
      value: 'software_management_system_manager'
    },
    {
      label: 'Software Executive',
      value: 'software_management_system_executive'
    }
  ],

  5: [ // HR
    {
      label: 'HR Manager',
      value: 'hr-manager'
    },
    {
      label: 'HR Executive',
      value: 'hr_executive'
    }
  ],

  4: [ // Marketing / Media
    {
      label: 'Marketing Manager',
      value: 'media_management_system_manager'
    },
    {
      label: 'Marketing Executive',
      value: 'media_management_system_executive'
    }
  ],
  22: [ // crm
    {
      label: 'CRM Director',
      value: 'crm-director'
    },
    {
      label: 'CRM Executive',
      value: 'crm-executive',
    }
  ]
}
import { computed } from 'vue'

const roleOptions = computed(() => {
  return DEPARTMENT_ROLE_OPTIONS[form.value.department_id] || []
})


/* -------------------------------
   State
-------------------------------- */
const loading = ref(false)
const loadingEmployees = ref(false)
const successMessage = ref('')
const employees = ref([])




const form = ref({
  department_id: null,
  employee_id: '',
  role: ''
})

/* -------------------------------
   Resolve Department
-------------------------------- */
const resolveDepartmentId = () => {
  return ROLE_DEPARTMENT_MAP[authStore.role] ?? 6 // fallback
}

/* -------------------------------
   Fetch Employees
-------------------------------- */
const fetchEmployees = async () => {
  loadingEmployees.value = true
  try {
    const res = await api().get(
      `employees?department_id=${form.value.department_id}&with=user`
    )
    employees.value = res.data.data || res.data
  } finally {
    loadingEmployees.value = false
  }
}

/* -------------------------------
   Submit
-------------------------------- */
const submitForm = async () => {
  loading.value = true
  try {
    await api().post('set-user-role', {
      user_id: form.value.employee_id,
      role: form.value.role,
      department_id: form.value.department_id
    })
    successMessage.value = '✅ Role assigned successfully'
    form.value.employee_id = ''
    form.value.role = ''
    setTimeout(() => successMessage.value = '', 3000)
  } finally {
    loading.value = false
  }
}
watch(
  () => form.value.department_id,
  () => {
    form.value.role = ''
  }
)
/* -------------------------------
   Init
-------------------------------- */
onMounted(() => {
  form.value.department_id = resolveDepartmentId()
  fetchEmployees()
})
</script>
<template>
  <div class="min-h-screen w-full bg-gradient-to-br from-slate-50 to-white py-8 px-4">
    <div class="mx-10">
      <!-- Header Section -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-200 rounded-full mb-4">
          <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h1 class="text-3xl font-semibold text-blue-800 mb-2 tracking-tight">
          Assign Customer Success Role
        </h1>
        <p class="text-slate-500 text-base">
          Assign roles within your department only
        </p>
      </div>

      <!-- Main Card -->
      <div class="bg-slate-100 rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div class="border-b border-blue-200 bg-slate-400 px-6 py-4">
          <h2 class="text-sm font-medium text-slate-700 uppercase tracking-wider">
            Role Assignment Form
          </h2>
        </div>

        <form @submit.prevent="submitForm" class="p-6 space-y-6">
          <!-- Employee Selection -->
          <div class="space-y-1.5">
            <label class="block text-sm font-medium text-slate-700">
              Select Employee <span class="text-red-500">*</span>
            </label>
            <select
              v-model="form.employee_id"
              :disabled="loadingEmployees"
              class="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors disabled:bg-slate-100 disabled:cursor-not-allowed"
              required
            >
              <option value="" disabled class="text-slate-400">
                {{ loadingEmployees ? 'Loading employees...' : 'Choose an employee' }}
              </option>
              <option
                v-for="emp in employees"
                :key="emp.id"
                :value="emp.user_id"
                class="py-2"
              >
                {{ emp.user?.name }}
              </option>
            </select>
            <p v-if="loadingEmployees" class="text-xs text-slate-500 mt-1">
              Fetching employee list...
            </p>
          </div>

          <!-- Role Selection -->
          <div class="space-y-1.5">
            <label class="block text-sm font-medium text-slate-700">
              Assign Role <span class="text-red-500">*</span>
            </label>
            <select
              v-model="form.role"
              class="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              required
            >
              <option value="" disabled class="text-slate-400">
                Select a role
              </option>
              <option
                v-for="role in roleOptions"
                :key="role.value"
                :value="role.value"
                class="py-2"
              >
                {{ role.label }}
              </option>
            </select>
          </div>

          <!-- Form Actions -->
          <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              @click="resetForm"
              class="px-5 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="loading || !form.employee_id || !form.role"
              class="px-5 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
            >
              <svg v-if="loading" class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? 'Assigning...' : 'Assign Role' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Success Message -->
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          v-if="successMessage"
          class="mt-4 bg-emerald-50 border border-emerald-200 rounded-lg p-4"
          role="alert"
        >
          <div class="flex items-center gap-3">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <p class="text-sm font-medium text-emerald-800">
              {{ successMessage }}
            </p>
          </div>
        </div>
      </transition>

      <!-- Help Text -->
      <p class="text-xs text-slate-400 text-center mt-4">
        Only employees within your department are shown in the list
      </p>
    </div>
  </div>
</template>
