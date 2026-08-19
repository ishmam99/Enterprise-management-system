<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/config/api'
import Swal from 'sweetalert2'

/* 🔹 PROPS FROM SIDEBAR */
const props = defineProps({
  mode: {
    type: String,
    required: true // 'solution' | 'software'
  },
  solutionId: Number,
  softwareId: Number
})

/* 🔹 FORM STATE */
const form = ref({
  success_team_id: '',
  solution_id: '',
  software_id: '',
  assigned_to: '',
  description: ''
})

const loading = ref(false)

/* 🔹 DROPDOWN DATA */
const successTeams = ref([])
const solutions = ref([])
const softwares = ref([])
const users = ref([])

/* 🔹 INIT */
onMounted(async () => {
  await loadDropdowns()

  // Set controlled values coming from sidebar/parent
  if (props.mode === 'solution') {
    form.value.solution_id = props.solutionId
  }

  if (props.mode === 'software') {
    form.value.software_id = props.softwareId
  }
})

/* 🔹 VALIDATION */
const isFormValid = computed(() => {
  return (
    !!form.value.success_team_id &&
    !!form.value.assigned_to &&
    (props.mode === 'solution'
      ? !!form.value.solution_id
      : !!form.value.software_id)
  )
})

/* 🔹 LOAD DROPDOWNS */
const loadDropdowns = async () => {
  try {
    const [teamRes, solRes, softRes, userRes] = await Promise.all([
      api().get('/success-teams'),
      api().get('/solutions'),
      api().get('/softwares'),
      api().get('/users')
    ])

    successTeams.value = teamRes.data.data ?? teamRes.data ?? []
    solutions.value    = solRes.data.data    ?? solRes.data    ?? []
    softwares.value    = softRes.data.data    ?? softRes.data    ?? []
    users.value        = userRes.data.data    ?? userRes.data    ?? []
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
const filteredUsers = computed(() => {
  return users.value.filter(u =>
    !['partner', 'customer-manager'].includes(
      (u.role || '').toLowerCase()
    )
  )
})
/* 🔹 SUBMIT */
const submitForm = async () => {
  if (!isFormValid.value) return

  loading.value = true

  try {
    await api().post('/success-team-tasks', {
      success_team_id: form.value.success_team_id,
      solution_id:
        props.mode === 'solution'
          ? props.solutionId
          : form.value.solution_id,
      software_id:
        props.mode === 'software'
          ? props.softwareId
          : form.value.software_id,
      assigned_to: form.value.assigned_to,
      description: form.value.description
    })

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

    const errorMessage = err.response?.data?.message
      || 'Failed to create task. Please check your input and try again.'

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
    description: ''
  }

  // Re-apply controlled values if needed
  if (props.mode === 'solution') {
    form.value.solution_id = props.solutionId
  }
  if (props.mode === 'software') {
    form.value.software_id = props.softwareId
  }
}
</script>

<template>
  <div class=" py-8 px-4 sm:px-6 lg:px-8">
    <!-- Card -->
    <div class="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
      <!-- Header -->
      <div class="bg-gradient-to-r from-indigo-600 to-indigo-800 px-8 py-7">
        <h1 class="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Create New Task
        </h1>
        <p class="mt-2 text-indigo-100 text-sm md:text-base">
          Assign a task to a success team member
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="submitForm" class="p-8 space-y-7">
        <!-- Success Team -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold text-gray-800">
              Success Team <span class="text-red-500">*</span>
            </span>
          </label>
          <select
            v-model="form.success_team_id"
            class="select select-bordered w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            :class="{ 'border-red-400': !form.success_team_id && !loading }"
          >
            <option value="" disabled>Select success team</option>
            <option v-for="team in successTeams" :key="team.id" :value="team.id">
              {{ team.name }}
            </option>
          </select>
        </div>

        <!-- Solution – shown only in software mode -->
        <div v-if="mode === 'software'" class="form-control">
          <label class="label">
            <span class="label-text font-semibold text-gray-800">
              Solution <span class="text-red-500">*</span>
            </span>
          </label>
          <select
            v-model="form.solution_id"
            class="select select-bordered w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            :class="{ 'border-red-400': !form.solution_id && !loading }"
          >
            <option value="" disabled>Select solution</option>
            <option v-for="s in solutions" :key="s.id" :value="s.id">
              {{ s.name }}
            </option>
          </select>
        </div>

        <!-- Software – shown only in solution mode -->
        <div v-if="mode === 'solution'" class="form-control">
          <label class="label">
            <span class="label-text font-semibold text-gray-800">
              Software <span class="text-red-500">*</span>
            </span>
          </label>
          <select
            v-model="form.software_id"
            class="select select-bordered w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            :class="{ 'border-red-400': !form.software_id && !loading }"
          >
            <option value="" disabled>Select software</option>
            <option v-for="s in softwares" :key="s.id" :value="s.id">
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
          <select
            v-model="form.assigned_to"
            class="select select-bordered w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            :class="{ 'border-red-400': !form.assigned_to && !loading }"
          >
            <option value="" disabled>Select team member</option>
         <option v-for="u in filteredUsers" :key="u.id" :value="u.id">
  {{ u.name }}
</option>

          </select>
        </div>

        <!-- Description -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold text-gray-800">Task Description</span>
          </label>
          <textarea
            v-model="form.description"
            class="textarea textarea-bordered w-full min-h-[140px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
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
