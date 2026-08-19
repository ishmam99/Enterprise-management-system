<template>
  <div class="min-h-screen bg-slate-100 pt-24 pb-12">
    <div class="max-w-7xl mx-auto">

      <!-- Header -->
      <div class="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-2xl shadow-lg mb-6">
        <h1 class="text-3xl font-bold">{{ job?.title || 'Job Details' }}</h1>
        <p class="text-sm opacity-90 mt-1">
          {{ job?.job_type }} • {{ job?.location_type }}
        </p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-10 text-gray-500">
        Loading job details...
      </div>

      <!-- Job Not Found -->
      <div v-else-if="!job" class="text-center py-10 text-red-500">
        Job not found
      </div>

      <!-- Job Content -->
      <div v-else class="space-y-6">

        <!-- Description -->
        <div class="bg-white p-6 rounded-xl shadow">
          <h2 class="text-xl font-semibold mb-2">Description</h2>
          <p class="text-gray-600">{{ job.description }}</p>
        </div>

        <!-- Info Grid -->
        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-white p-4 rounded-xl shadow">
            <p><strong>Experience:</strong> {{ job.required_experience }}</p>
            <p><strong>Country:</strong> {{ job.base_country }}</p>
            <p><strong>Vacancies:</strong> {{ job.number_of_vacancies }}</p>
          </div>
          <div class="bg-white p-4 rounded-xl shadow">
            <p><strong>Salary:</strong> ${{ job.salary_min }} - ${{ job.salary_max }}</p>
            <p><strong>Deadline:</strong> {{ formatDate(job.deadline) }}</p>
          </div>
        </div>

        <!-- Requirements -->
        <div class="bg-white p-6 rounded-xl shadow">
          <h2 class="text-xl font-semibold mb-3">Requirements</h2>
          <ul class="list-disc pl-5 space-y-1">
            <li v-for="(item, i) in parseJSON(job.requirements)" :key="i">{{ item }}</li>
          </ul>
        </div>

        <!-- Qualifications -->
        <div class="bg-white p-6 rounded-xl shadow">
          <h2 class="text-xl font-semibold mb-3">Qualifications</h2>
          <ul class="list-disc pl-5 space-y-1">
            <li v-for="(item, i) in parseJSON(job.required_qualifications)" :key="i">{{ item }}</li>
          </ul>
        </div>

        <!-- Skills -->
        <div class="bg-white p-6 rounded-xl shadow">
          <h2 class="text-xl font-semibold mb-3">Key Skills</h2>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(skill, i) in parseJSON(job.key_skills)" :key="i"
              class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
            >{{ skill }}</span>
          </div>
        </div>

        <!-- Software -->
        <div class="bg-white p-6 rounded-xl shadow">
          <h2 class="text-xl font-semibold mb-3">Primary Software</h2>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(soft, i) in parseJSON(job.primary_software)" :key="i"
              class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
            >{{ soft }}</span>
          </div>
        </div>

        <!-- Apply Button -->
        <div class="text-center pt-4">
          <button
            @click="openModal"
            :disabled="applied"
            :class="[
              'px-8 py-3 rounded-xl shadow-lg font-semibold text-white transition-all duration-200',
              applied
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 hover:shadow-xl hover:-translate-y-0.5'
            ]"
          >
            <span v-if="applied" class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Applied
            </span>
            <span v-else>Apply Now</span>
          </button>
        </div>

      </div>
    </div>

    <!-- ==================== MODAL ==================== -->
    <Transition name="modal">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">

        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeModal" />

        <!-- Modal Card -->
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto z-10">

          <!-- Modal Header -->
          <div class="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-t-2xl">
            <div class="flex justify-between items-start">
              <div>
                <h2 class="text-xl font-bold text-white">Apply for Position</h2>
                <p class="text-green-100 text-sm mt-1">{{ job?.title }}</p>
              </div>
              <button
                @click="closeModal"
                class="text-white/70 hover:text-white transition-colors ml-4 mt-0.5"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Modal Body -->
          <div class="p-6 space-y-4">

            <!-- Full Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Full Name <span class="text-red-500">*</span></label>
              <input
                v-model="form.full_name"
                type="text"
                placeholder="John Doe"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email Address <span class="text-red-500">*</span></label>
              <input
                v-model="form.email"
                type="email"
                placeholder="john@example.com"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
            </div>

            <!-- Contact & Emergency Contact side by side -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Contact <span class="text-red-500">*</span></label>
                <input
                  v-model="form.contact"
                  type="tel"
                  placeholder="017XXXXXXXX"
                  class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Emergency Contact <span class="text-red-500">*</span></label>
                <input
                  v-model="form.emergency_contact"
                  type="tel"
                  placeholder="018XXXXXXXX"
                  class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <!-- Highest Education -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Highest Education <span class="text-red-500">*</span></label>
              <input
                v-model="form.highest_education"
                type="text"
                placeholder="BSc in Computer Science"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
            </div>

            <!-- University -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">University / Institution <span class="text-red-500">*</span></label>
              <input
                v-model="form.university"
                type="text"
                placeholder="Dhaka University"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
            </div>

            <!-- Resume Upload -->
<div>
  <label class="block text-sm font-medium text-gray-700 mb-1">
    Upload Resume <span class="text-red-500">*</span>
  </label>
  <input
    type="file"
    accept=".pdf,.doc,.docx"
    @change="handleFileUpload"
    class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
  />
  <p v-if="form.resume" class="text-xs text-gray-500 mt-1">
    Selected: {{ form.resume.name }}
  </p>
</div>

            <!-- Error message -->
            <p v-if="formError" class="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {{ formError }}
            </p>

          </div>

          

          <!-- Modal Footer -->
          <div class="px-6 pb-6 flex gap-3">
            <button
              @click="closeModal"
              :disabled="submitting"
              class="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              @click="submitApplication"
              :disabled="submitting"
              class="flex-1 px-4 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              <svg v-if="submitting" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              {{ submitting ? 'Submitting...' : 'Submit Application' }}
            </button>
          </div>

        </div>
      </div>
    </Transition>
    <!-- ==================== END MODAL ==================== -->

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/config/api'
import Swal from 'sweetalert2'

const route = useRoute()
const jobId = route.params.id

const job = ref(null)
const loading = ref(false)

// Modal state
const showModal = ref(false)
const submitting = ref(false)
const applied = ref(false)
const formError = ref('')

const form = ref({
  full_name: '',
  email: '',
  contact: '',
  emergency_contact: '',
  highest_education: '',
  university: '',
  resume: null, // 👈 ADD THIS
})

/* ---------------- Modal Controls ---------------- */
const openModal = () => {
  formError.value = ''
  showModal.value = true
}

const closeModal = () => {
  if (submitting.value) return
  showModal.value = false
}

const handleFileUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    form.value.resume = file
  }
}

/* ---------------- Validation ---------------- */
const validateForm = () => {
  const { full_name, email, contact, emergency_contact, highest_education, university } = form.value
  if (!full_name.trim()) return 'Full name is required.'
  if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) return 'A valid email is required.'
  if (!contact.trim()) return 'Contact number is required.'
  if (!emergency_contact.trim()) return 'Emergency contact is required.'
  if (!highest_education.trim()) return 'Highest education is required.'
  if (!university.trim()) return 'University / Institution is required.'
  if (!form.value.resume) return 'Resume is required.'
  return null
}

/* ---------------- Submit ---------------- */
const submitApplication = async () => {
  formError.value = ''
  const validationError = validateForm()
  if (validationError) {
    formError.value = validationError
    return
  }

  submitting.value = true

  try {
    await api().post('/applied-jobs', {
      ...form.value,
      job_id: jobId,
    })

    showModal.value = false
    applied.value = true

    await Swal.fire({
      icon: 'success',
      title: 'Application Submitted!',
      text: 'Your application has been sent successfully. Good luck! 🎉',
      confirmButtonColor: '#16a34a',
      confirmButtonText: 'Great, thanks!',
      customClass: {
        popup: 'rounded-2xl',
      },
    })

  } catch (err) {
    console.error(err)
    const msg = err?.response?.data?.message || 'Something went wrong. Please try again.'
    formError.value = msg
  } finally {
    submitting.value = false
  }
}

/* ---------------- Fetch Job ---------------- */
const fetchJob = async () => {
  loading.value = true
  try {
    const { data } = await api().get(`job-public/${jobId}`)
    job.value = data.data
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

/* ---------------- Helpers ---------------- */
const parseJSON = (data) => {
  try { return JSON.parse(data) } catch { return [] }
}

const formatDate = (date) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString()
}

onMounted(fetchJob)
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}
.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .relative {
  transform: scale(0.95) translateY(10px);
  opacity: 0;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>