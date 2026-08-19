<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/config/api'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/stores/AuthStore'
import { watch } from 'vue'

/* 🔹 PROPS FROM SIDEBAR */
const authStore = useAuthStore()

const selectedSolution = ref()
/* 🔹 FORM STATE */
const form = ref({
  success_team_id: authStore.team_id,
  solution_id: '',
  software_id: '',
  assigned_to: '',
  description: '',
  date: '',
  type: ''
})

const loading = ref(false)
const taskTypes = ['Training', 'Engineering Service', 'Sales Champion']

/* 🔹 DROPDOWN DATA */
const successTeam = ref([])
const solutions = ref([])
const users = ref([])
watch(
  () => selectedSolution.value,
  () => (form.value.solution_id = selectedSolution.value.solution_id)
)
/* 🔹 INIT */
onMounted(async () => {
  await loadDropdowns()
})

/* 🔹 VALIDATION */
const isFormValid = computed(() => {
  return (
    !!form.value.success_team_id &&
    !!form.value.assigned_to &&
    !!form.value.solution_id &&
    !!form.value.software_id
  )
})

/* 🔹 LOAD DROPDOWNS */
const loadDropdowns = async () => {
  try {
    const [teamRes, userRes] = await Promise.all([
      api().get('/success-teams/' + authStore.team_id),

      // api().get('/softwares'),
      api().get('/users')
    ])
    console.log(teamRes)
    let customerIds = teamRes.data.company?.customers.map((e) => e.id)
    console.log(customerIds)
    const solRes = await api().get('customer-solution?customer_ids=' + customerIds)
    console.log(solRes)

    successTeam.value = teamRes.data.data ?? teamRes.data ?? []
    solutions.value = solRes.data.data ?? solRes.data ?? []
    // softwares.value    = softRes.data.data    ?? softRes.data    ?? []
    users.value = userRes.data.data ?? userRes.data ?? []
  } catch (err) {
    console.error('Failed to load dropdown data', err)
    Swal.fire({
      icon: 'error',
      title: 'Loading failed',
      text: 'Could not load required data. Please try again later.',
      confirmButtonColor: '#ef4444'
    })
  }
}

/* 🔹 SUBMIT */
const submitForm = async () => {
  if (!isFormValid.value) return

  loading.value = true

  try {
    await api().post('/success-team-tasks', form.value)

    await Swal.fire({
      icon: 'success',
      title: 'Task Created!',
      text: 'The task has been successfully assigned.',
      confirmButtonText: 'Done',
      confirmButtonColor: '#4f46e5',
      timer: 2200,
      timerProgressBar: true,
      showConfirmButton: false
    })

    resetForm()
  } catch (err) {
    console.error('Task creation failed', err)

    const errorMessage =
      err.response?.data?.message || 'Failed to create task. Please check your input and try again.'

    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: errorMessage,
      confirmButtonColor: '#ef4444'
    })
  } finally {
    loading.value = false
  }
}

/* 🔹 RESET FORM */
const resetForm = () => {
  form.value = {
    success_team_id: '',
    solution_id: '',
    software_id: '',
    assigned_to: '',
    description: '',
    type: '',
    date: ''
  }
}
</script>

<template>
  <div class="py-8 px-4 sm:px-6 lg:px-8">
    <!-- Card -->
    <div class="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
      <!-- Header -->
      <div class="bg-gradient-to-r from-cyan-600 to-indigo-400 px-8 py-7">
        <h1 class="text-2xl md:text-3xl font-bold text-white tracking-tight">Create New Task</h1>
        <p class="mt-2 text-indigo-100 text-sm md:text-base">
          Assign a task to a success team member
        </p>
      </div>

      <!-- Form -->
      <form class="p-8 gap-5 grid grid-cols-2" @submit.prevent="submitForm">
        <!-- Success Team -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold text-gray-800">
              Success Team <span class="text-red-500">*</span>
            </span>
          </label>
            <div v-if="!successTeam.members" class="w-full h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          <select
          v-else
            v-model="form.success_team_id"
            class="border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          >
            <option :value="successTeam?.id">
              {{ successTeam?.name }}
            </option>
          </select>
        </div>

        <!-- Solution – shown only in software mode -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold text-gray-800">
              Solution <span class="text-red-500">*</span>
            </span>
          </label>
           <div v-if="!solutions.length" class="w-full h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          <select
          v-else
            v-model="selectedSolution"
            class="border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          >
            <option value="" disabled>Select solution</option>
            <option v-for="s in solutions" :key="s.id" :value="s">
              {{ s.solution_name }}
            </option>
          </select>
        </div>

        <!-- Software – shown only in solution mode -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold text-gray-800">
              Software <span class="text-red-500">*</span>
            </span>
          </label>
          <div v-if="!solutions.length" class="w-full h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          <select
          v-else
            v-model="form.software_id"
            :disabled="!selectedSolution?.softwares"
            class="border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          >
            <option value="" disabled>Select software</option>
            <option v-for="s in selectedSolution?.softwares" :key="s.id" :value="s.id">
              {{ s.name }}
            </option>
          </select>
        </div>

        <!-- Assigned To -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold text-gray-800">
              Assign To <span class="text-red-500">*</span>
            </span>
          </label>

          <div v-if="!successTeam.members" class="w-full h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          <select
          v-else
            v-model="form.assigned_to"
            class="rounded-lg border-2 border-gray-300 w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          >
            <option value="" disabled>Select team member</option>
            <option
              v-for="u in successTeam.members?.filter(
                (e) =>
                  e.pivot.role != 'Customer Representative' &&
                  e.pivot.role != 'MSC Direct Sales Representative'
              )"
              :key="u.id"
              :value="u.id"
            >
              {{ u.name }}
            </option>
          </select>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold text-gray-800">
              Task type<span class="text-red-500">*</span>
            </span>
          </label>
          <select
            v-model="form.type"
            class="rounded-lg border-2 border-gray-300 w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          >
            <option value="" disabled>Select task type</option>
            <option v-for="u in taskTypes" :key="u" :value="u">
              {{ u }}
            </option>
          </select>
        </div>
        <div class="flex flex-col">
          <p class="label">
            <span class="label-text font-semibold text-gray-800">
              Date <span class="text-red-500">*</span>
            </span>
          </p>
          <input
            v-model="form.date"
            type="date"
            class="px-3 py-2 rounded-lg bg-gray-100 border-gray-300"
          />
        </div>

        <!-- Description -->
        <div class="form-control col-span-2">
          <label class="label">
            <span class="label-text font-semibold text-gray-800">Task Description</span>
          </label>
          <textarea
            v-model="form.description"
            class="border border-gray-300 rounded-lg w-full min-h-[140px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            placeholder="Enter detailed task description..."
          />
        </div>

        <!-- Submit -->
        <div class="pt-4">
          <button
            type="submit"
            class="btn btn-primary w-full md:w-auto px-10 py-3 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            :disabled="!isFormValid || loading"
          >
            <span v-if="loading" class="loading loading-spinner loading-md mr-2"></span>
            {{ loading ? 'Creating...' : 'Create Task' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
select:focus,
textarea:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}
</style>
