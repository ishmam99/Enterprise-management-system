<template>
  <div class="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">

    <!-- Header -->
    <div class="mx-auto mb-10 text-center">
      <h1 class="text-4xl font-bold text-indigo-900 mb-3">
        Create Job Opening
      </h1>
      <p class="text-lg text-indigo-700">
        Post a new job vacancy
      </p>
    </div>

    <div class="mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div class="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-5">
        <h2 class="text-2xl font-semibold text-white">
          Job Posting Details
        </h2>
      </div>

      <form @submit.prevent="submitForm" class="p-8 space-y-8">

        <!-- Department -->
        <div>
          <label class="form-label">Department *</label>
          <select v-model="form.department_id" class="form-input">
            <option value="" disabled>Select Department</option>
            <option v-for="d in departments" :key="d.id" :value="d.id">
              {{ d.name }}
            </option>
          </select>
        </div>

        <!-- Position -->
        <div>
          <label class="form-label">Position *</label>
          <select v-model="form.position_id" class="form-input">
            <option value="" disabled>Select Position</option>
            <option v-for="p in positions" :key="p.id" :value="p.id">
              {{ p.title }}
            </option>
          </select>
        </div>

        <!-- Title & Job Type -->
        <div class="grid grid-cols-2 gap-8">
          <div>
            <label class="form-label">Job Title *</label>
            <input v-model="form.title" class="form-input" placeholder="Senior Laravel Developer" />
          </div>
          <div>
            <label class="form-label">Job Type *</label>
            <select v-model="form.job_type" class="form-input">
              <option disabled value="">Select Job Type</option>
              <option>Full-time</option>
              <option>Part-time</option>
            </select>
          </div>
        </div>

        <!-- Location -->
        <div class="grid grid-cols-2 gap-8">
          <div>
            <label class="form-label">Location Type *</label>
            <select v-model="form.location_type" class="form-input">
              <option disabled value="">Select Location</option>
              <option>Remote</option>
              <option>On-site</option>
              <option>Hybrid</option>
            </select>
          </div>
          <div>
            <label class="form-label">Base Country *</label>
            <input v-model="form.base_country" class="form-input" placeholder="Bangladesh" />
          </div>
        </div>

        <!-- Experience & Deadline -->
        <div class="grid grid-cols-2 gap-8">
          <div>
            <label class="form-label">Required Experience *</label>
            <input v-model="form.required_experience" class="form-input" placeholder="3+ years" />
          </div>
          <div>
            <label class="form-label">Application Deadline *</label>
            <input v-model="form.deadline" type="datetime-local" class="form-input" />
          </div>
        </div>

        <!-- Description -->
        <div>
          <label class="form-label">Job Description *</label>
          <textarea v-model="form.description" rows="4" class="form-input"
            placeholder="Job description"></textarea>
        </div>

        <!-- Requirements -->
        <div>
          <label class="form-label">Requirements</label>
          <div v-for="(r, i) in form.requirements" :key="i" class="flex gap-2 mb-2">
            <input v-model="form.requirements[i]" class="form-input flex-1" placeholder="Requirement" />
            <button type="button" @click="form.requirements.splice(i,1)">❌</button>
          </div>
          <button @click="form.requirements.push('')" type="button" class="text-indigo-600 text-sm">
            + Add Requirement
          </button>
        </div>

        <!-- Responsibilities -->
        <div>
          <label class="form-label">Key Responsibilities</label>
          <div v-for="(r, i) in form.key_responsibilities" :key="i" class="mb-2">
            <input v-model="form.key_responsibilities[i]" class="form-input" placeholder="Responsibility" />
          </div>
          <button @click="form.key_responsibilities.push('')" type="button"
            class="text-indigo-600 text-sm">+ Add</button>
        </div>

        <!-- Skills / Software -->
        <div class="grid grid-cols-2 gap-8">
          <div>
            <label class="form-label">Key Skills</label>
            <div v-for="(s,i) in form.key_skills" :key="i">
              <input v-model="form.key_skills[i]" class="form-input mb-2" placeholder="Skill" />
            </div>
            <button @click="form.key_skills.push('')" type="button" class="text-indigo-600 text-sm">+ Add</button>
          </div>

          <div>
            <label class="form-label">Primary Software</label>
            <div v-for="(s,i) in form.primary_software" :key="i">
              <input v-model="form.primary_software[i]" class="form-input mb-2" placeholder="Software" />
            </div>
            <button @click="form.primary_software.push('')" type="button" class="text-indigo-600 text-sm">+ Add</button>
          </div>
        </div>

        <!-- Salary & Vacancies -->
        <div class="grid grid-cols-3 gap-8">
          <div>
            <label class="form-label">Min Salary</label>
            <input v-model="form.salary_min" type="number" class="form-input" placeholder="Min Salary" />
          </div>
          <div>
            <label class="form-label">Max Salary</label>
            <input v-model="form.salary_max" type="number" class="form-input" placeholder="Max Salary" />
          </div>
          <div>
            <label class="form-label">Vacancies</label>
            <input v-model="form.number_of_vacancies" type="number" class="form-input" placeholder="Vacancies" />
          </div>
        </div>

        <!-- Status -->
        <div class="flex gap-6">
          <label class="form-label">
            <input type="radio" v-model="form.status" :value="1" /> Active
          </label>
          <label class="form-label">
            <input type="radio" v-model="form.status" :value="0" /> Inactive
          </label>
        </div>

        <button class="btn-primary w-full" :disabled="loading">
          {{ loading ? 'Publishing...' : 'Publish Job' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import api from '@/config/api'
import Swal from 'sweetalert2'

const departments = ref([])
const positions = ref([])
const loading = ref(false)

const form = reactive({
  department_id: '',
  position_id: '',
  title: '',
  description: '',
  job_type: '',
  location_type: '',
  base_country: '',
  required_experience: '',
  requirements: [''],
  key_responsibilities: [''],
  required_qualifications: [''],
  key_skills: [''],
  primary_software: [''],
  deadline: '',
  number_of_vacancies: 1,
  salary_min: null,
  salary_max: null,
  status: 0,
})

const fetchDepartments = async () => {
  const res = await api().get('/department')
  departments.value = res.data.data
}

const fetchPositions = async () => {
  const res = await api().get('/positions')
  positions.value = res.data.data
}

onMounted(() => {
  fetchDepartments()
  fetchPositions()
})

const submitForm = async () => {
  loading.value = true
  try {
    await api().post('/jobs-offer', form)
    Swal.fire('Success', 'Job created successfully', 'success')
  } catch (e) {
    Swal.fire('Error', 'Something went wrong', 'error')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.form-label {
  @apply block mb-2 font-semibold text-gray-700;
}
.form-input {
  @apply w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500;
}
.form-error {
  @apply text-sm text-red-600 mt-1;
}
.btn-primary {
  @apply bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700;
}
</style>