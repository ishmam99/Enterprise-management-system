<template>
  <div class="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
    <!-- Header -->
    <div class="mx-auto mb-10">
      <div class="flex justify-between items-start">
        <div>
          <h1 class="text-4xl font-bold text-indigo-900 mb-3">Job Openings</h1>
          <p class="text-lg text-indigo-700">
            Manage and track all active job postings across the organization
          </p>
        </div>
        <router-link
          to="/job-openings/create"
          class="btn-primary shadow-lg inline-flex items-center gap-3"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Create New Opening
        </router-link>
      </div>
    </div>

    <!-- Job Openings List -->
    <div class="mx-auto">
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div class="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-5">
          <h2 class="text-2xl font-semibold text-white">Job Openings</h2>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-8 py-4 text-left text-sm font-semibold text-gray-700">Position</th>
                <th class="px-8 py-4 text-left text-sm font-semibold text-gray-700">Department</th>
                <th class="px-8 py-4 text-left text-sm font-semibold text-gray-700">Vacancies</th>
                <th class="px-8 py-4 text-left text-sm font-semibold text-gray-700">Job Type</th>
                <th class="px-8 py-4 text-left text-sm font-semibold text-gray-700">Location</th>
                <th class="px-8 py-4 text-left text-sm font-semibold text-gray-700">Salary (USD)</th>
                <th class="px-8 py-4 text-left text-sm font-semibold text-gray-700">Posted On</th>
                <th class="px-8 py-4 text-left text-sm font-semibold text-gray-700">Deadline</th>
                <th class="px-8 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th class="px-8 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="job in jobOpenings" :key="job.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-8 py-5 text-base font-medium text-gray-900">{{ job.title }}</td>
                <td class="px-8 py-5 text-base text-gray-600">{{ getDepartmentName(job.department_id) }}</td>
                <td class="px-8 py-5 text-base text-gray-600">{{ job.number_of_vacancies }}</td>
                <td class="px-8 py-5">
                  <span class="px-3 py-1 rounded-full text-xs font-medium" :class="jobTypeClass(job.job_type)">
                    {{ job.job_type }}
                  </span>
                </td>
                <td class="px-8 py-5 text-base text-gray-600">
                  {{ job.location_type }}
                  <span v-if="job.base_country">({{ job.base_country }})</span>
                </td>
                <td class="px-8 py-5 text-base text-gray-600">
                  ${{ job.salary_min }} - ${{ job.salary_max }}
                </td>
                <td class="px-8 py-5 text-base text-gray-600">
                  {{ job.published_at ? formatDate(job.published_at) : 'Not published' }}
                </td>
                <td class="px-8 py-5 text-base text-gray-600">
                  {{ job.deadline ? formatDate(job.deadline) : 'No deadline' }}
                </td>
                <td class="px-8 py-5">
                  <span
                    class="px-4 py-1 rounded-full text-xs font-semibold"
                    :class="statusClass(job.status)"
                  >
                    {{ statusText(job.status) }}
                  </span>
                </td>
                <td class="px-8 py-5 text-center">
                  <div class="flex items-center justify-center gap-4">
                    <!-- <button
                      @click="viewDetails(job.id)"
                      class="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                    >
                      View
                    </button> -->

                    <button
                      v-if="job.status !== '0'"
                      @click="togglePublish(job.id, job.status)"
                      class="font-medium text-sm"
                      :class="job.status === '2' ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'"
                    >
                      {{ job.status === '2' ? 'Unpublish' : 'Publish' }}
                    </button>

                    <span v-else class="text-gray-500 text-sm">Pending</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Loading State -->
          <div v-if="loading" class="text-center py-16">
            <p class="text-xl text-gray-500">Loading job openings...</p>
          </div>

          <!-- Empty State -->
          <div v-if="!loading && jobOpenings.length === 0" class="text-center py-16">
            <svg class="mx-auto w-20 h-20 text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-2m3 2v-2m-9-8h12M5 12h14M5 8h14" />
            </svg>
            <p class="text-xl text-gray-500">No job openings posted yet.</p>
            <router-link to="/job-openings/create" class="mt-6 inline-block btn-primary">
              Create Your First Job Opening
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '@/config/api'
import { ref, onMounted } from 'vue'


const jobOpenings = ref([])
const departments = ref([])
const loading = ref(true)

// Fetch departments and jobs
const fetchData = async () => {
  try {
    loading.value = true

    const [deptRes, jobsRes] = await Promise.all([
      api().get('/department'),
      api().get('/jobs-offer')
    ])

    // Assuming /department returns { data: [{ id: "1", name: "Engineering" }, ...] } or direct array
    departments.value = Array.isArray(deptRes.data) ? deptRes.data : deptRes.data.data || []

    // Jobs are inside response.data.data
    const rawJobs = (jobsRes.data?.data || []).filter(e => e.status !== "0")

    jobOpenings.value = rawJobs.map(job => ({
      ...job,
      // Parse JSON strings
      requirements: parseJsonArray(job.requirements),
      key_responsibilities: parseJsonArray(job.key_responsibilities || '[]'),
      required_qualifications: parseJsonArray(job.required_qualifications),
      key_skills: parseJsonArray(job.key_skills),
      primary_software: parseJsonArray(job.primary_software),
      // Convert string numbers
      number_of_vacancies: parseInt(job.number_of_vacancies) || 0,
      salary_min: parseInt(job.salary_min) || 0,
      salary_max: parseInt(job.salary_max) || 0,
      department_id: job.department_id, // keep as string or convert if needed
      position_id: job.position_id,
    }))

  } catch (error) {
    console.error('Failed to fetch data:', error)
    alert('Failed to load job openings. Please try again.')
  } finally {
    loading.value = false
  }
}

// Safe JSON parser for stringified arrays
const parseJsonArray = (str) => {
  if (!str || str === 'null') return []
  try {
    return JSON.parse(str)
  } catch {
    return []
  }
}

// Map department_id (string) to name
const getDepartmentName = (deptId) => {
  if (!deptId) return 'Unknown'
  const dept = departments.value.find(d => String(d.id) === String(deptId))
  return dept ? dept.name : 'Unknown Department'
}

// Job type badge
const jobTypeClass = (type) => {
  const map = {
    'Full-time': 'bg-blue-100 text-blue-800',
    'Part-time': 'bg-purple-100 text-purple-800',
    'Contract': 'bg-orange-100 text-orange-800',
    'Remote': 'bg-green-100 text-green-800',
    'Hybrid': 'bg-indigo-100 text-indigo-800',
  }
  return map[type] || 'bg-gray-100 text-gray-800'
}

// Status handling
const statusText = (status) => {
  switch (status) {
    case '0': return 'Pending'
    case '1': return 'Draft'
    case '2': return 'Published'
    default: return 'Unknown'
  }
}

const statusClass = (status) => {
  switch (status) {
    case '0': return 'bg-red-100 text-red-800'
    case '1': return 'bg-yellow-100 text-yellow-800'
    case '2': return 'bg-green-100 text-green-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

// Format ISO date
const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const viewDetails = (id) => {
  alert(`Viewing job ID: ${id}`)
  // router.push(`/job-openings/${id}`)
}

const togglePublish = async (id, currentStatus) => {
  const action = currentStatus === '2' ? 'unpublish' : 'publish'
  if (!confirm(`Are you sure you want to ${action} this job?`)) return

  try {
    await api().post(`/publish-job/${id}`, {
      _method: 'PUT',
      status: currentStatus === '2' ? '1' : '2'
    })

    // Toggle between Draft (1) and Published (2)
    const job = jobOpenings.value.find(j => j.id === id)
    if (job) {
      job.status = job.status === '2' ? '1' : '2'
    }

    alert(`Job ${job.status === '2' ? 'published' : 'unpublished (set to draft)'}.`)
  } catch (error) {
    console.error('Publish failed:', error)
    alert('Failed to update job status.')
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.btn-primary {
  @apply bg-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-indigo-700 transform hover:scale-105 transition-all shadow-md;
}
</style>
