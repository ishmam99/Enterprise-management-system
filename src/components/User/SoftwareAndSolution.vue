<template>
  <section
    id="msc-software"
    class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
  >
    <div class="bg-gradient-to-r flex items-center justify-between from-teal-700 to-teal-800 text-white px-6 py-4">
      <h2 class="text-lg font-semibold flex items-center gap-2">
        <i class="ri-code-box-line"></i>
        MSC Software &amp; Solutions
      </h2>
      <div class="flex gap-2 items-center">
        <button class="btn btn-sm btn-primary text-white" @click="openSoftwareModal">+ Add Software</button>
        <button class="btn btn-sm btn-neutral text-white" @click="openSolutionModal">+ Add Solution</button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loadingSoftware" class="p-12 text-center">
      <div class="inline-flex items-center gap-2 text-gray-500">
        <i class="fas fa-spinner fa-spin text-2xl"></i>
        <span>Loading software data...</span>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="softwareError" class="p-12 text-center">
      <div class="bg-red-50 border border-red-200 rounded-lg p-4">
        <i class="ri-error-warning-line text-red-500 text-2xl mb-2"></i>
        <p class="text-red-600">{{ softwareError }}</p>
        <button
          @click="fetchSoftwareSolutions"
          class="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>

    <!-- Content -->
    <div v-else>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="software in softwareList"
            :key="software.id"
            class="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div class="p-5">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-xl font-bold text-teal-700">{{ software.name }}</h3>
                <div class="flex items-center gap-2">
                  <span
                    class="text-xs font-semibold px-3 py-1 rounded-full"
                    :class="getLevelColor(software.pivot?.level || 'Beginner')"
                  >
                    {{ software.pivot?.level || 'Beginner' }}
                  </span>
                  <button
                    @click="handleDelete(software.id)"
                    class="text-red-500 hover:text-red-700 transition"
                    title="Delete"
                  >
                    <i class="ri-delete-bin-6-line text-lg"></i>
                  </button>
                </div>
              </div>

              <div v-if="software.solutions && software.solutions.length > 0" class="mt-4">
                <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Solutions</p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="solution in software.solutions"
                    :key="solution.id"
                    class="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-full border border-teal-200"
                  >
                    {{ solution.name }}
                  </span>
                </div>
              </div>
              <div v-else class="mt-4">
                <p class="text-xs text-gray-400 italic">No solutions assigned</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── ADD SOFTWARE MODAL ── -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div
          v-if="showSoftwareModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          @click.self="closeSoftwareModal"
        >
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

          <!-- Modal Box -->
          <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10 overflow-hidden">
            <!-- Modal Header -->
            <div class="bg-gradient-to-r from-teal-700 to-teal-800 text-white px-6 py-4 flex items-center justify-between">
              <h2 class="text-lg font-semibold flex items-center gap-2">
                <i class="ri-add-box-line"></i> Add Software
              </h2>
              <button @click="closeSoftwareModal" class="hover:bg-white/20 rounded-lg p-1 transition">
                <i class="ri-close-line text-xl"></i>
              </button>
            </div>

            <!-- Modal Body -->
            <div class="p-6 space-y-4">
              <!-- Software Select -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Available Software <span class="text-red-500">*</span></span>
                </label>
                <select
                  v-model="selectedSoftwareId"
                  class="select select-bordered w-full"
                  :disabled="fetchSoftwareLoading || softwareSubmitLoading"
                >
                  <option value="" disabled>Select a software</option>
                  <option v-for="s in softwareOptions" :key="s.id" :value="s.id">{{ s.name }}</option>
                </select>
                <div v-if="fetchSoftwareLoading" class="mt-2 text-sm text-gray-500 flex items-center gap-1">
                  <span class="loading loading-spinner loading-xs"></span> Loading software options...
                </div>
                <div v-if="!fetchSoftwareLoading && softwareOptions.length === 0" class="mt-2 text-sm text-gray-400 italic">
                  No software options available
                </div>
              </div>

              <!-- Level Select -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Software Level <span class="text-red-500">*</span></span>
                </label>
                <select
                  v-model="selectedLevel"
                  class="select select-bordered w-full"
                  :disabled="softwareSubmitLoading"
                >
                  <option value="" disabled>Select software level</option>
                  <option v-for="lvl in levelOptions" :key="lvl.value" :value="lvl.value">{{ lvl.label }}</option>
                </select>
              </div>

              <!-- Submit -->
              <div class="pt-2">
                <button
                  @click="submitSoftwareSelection"
                  class="w-full h-12 bg-teal-800 text-white font-bold rounded-lg hover:bg-teal-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
                  :disabled="softwareSubmitLoading || !selectedSoftwareId || !selectedLevel"
                >
                  <span v-if="softwareSubmitLoading" class="loading loading-spinner loading-xs"></span>
                  {{ softwareSubmitLoading ? 'Submitting...' : 'Submit Selection' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ── ADD SOLUTION MODAL ── -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div
          v-if="showSolutionModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          @click.self="closeSolutionModal"
        >
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

          <!-- Modal Box -->
          <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10 overflow-hidden">
            <!-- Modal Header -->
            <div class="bg-gradient-to-r from-teal-700 to-teal-800 text-white px-6 py-4 flex items-center justify-between">
              <h2 class="text-lg font-semibold flex items-center gap-2">
                <i class="ri-puzzle-line"></i> Add Solution
              </h2>
              <button @click="closeSolutionModal" class="hover:bg-white/20 rounded-lg p-1 transition">
                <i class="ri-close-line text-xl"></i>
              </button>
            </div>

            <!-- Modal Body -->
            <div class="p-6 space-y-4">
              <!-- Solution Select -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Available Solution <span class="text-red-500">*</span></span>
                </label>
                <select
                  v-model="selectedSolutionId"
                  class="select select-bordered w-full"
                  :disabled="fetchSolutionLoading || solutionSubmitLoading"
                >
                  <option value="" disabled>Select a solution</option>
                  <option v-for="sol in solutionOptions" :key="sol.id" :value="sol.id">{{ sol.name }}</option>
                </select>
                <div v-if="fetchSolutionLoading" class="mt-2 text-sm text-gray-500 flex items-center gap-1">
                  <span class="loading loading-spinner loading-xs"></span> Loading solution options...
                </div>
                <div v-if="!fetchSolutionLoading && solutionOptions.length === 0" class="mt-2 text-sm text-gray-400 italic">
                  No solution options available
                </div>
              </div>

              <!-- Submit -->
              <div class="pt-2">
                <button
                  @click="submitSolutionSelection"
                  class="w-full h-12 bg-teal-800 text-white font-bold rounded-lg hover:bg-teal-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
                  :disabled="solutionSubmitLoading || !selectedSolutionId"
                >
                  <span v-if="solutionSubmitLoading" class="loading loading-spinner loading-xs"></span>
                  {{ solutionSubmitLoading ? 'Submitting...' : 'Submit Selection' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/config/api'
import Swal from 'sweetalert2'

// ─── Main list state ───────────────────────────────────────────
const softwareList = ref([])
const loadingSoftware = ref(false)
const softwareError = ref(null)

const sidebarItems = ref([
  { key: 'view-resume',          label: 'View Resume',              count: null },
  { key: 'personal-information', label: 'Personal Information',     count: null },
  { key: 'my-education',         label: 'My Education',             count: null },
  { key: 'my-experience',        label: 'My Experience',            count: null },
  { key: 'msc-software',         label: 'MSc Software and Solutions', count: null },
  { key: 'my-references',        label: 'My References',            count: 3 },
  { key: 'general-skills',       label: 'General Skills',           count: 6 },
  { key: 'resume-summary',       label: 'Resume Summary',           count: null },
])

// ─── Add Software modal state ──────────────────────────────────
const showSoftwareModal     = ref(false)
const selectedSoftwareId    = ref('')
const selectedLevel         = ref('')
const softwareOptions       = ref([])
const fetchSoftwareLoading  = ref(false)
const softwareSubmitLoading = ref(false)

const levelOptions = [
  { value: 'Beginner',     label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'advance',      label: 'Advance' },
]

const openSoftwareModal = async () => {
  showSoftwareModal.value = true
  await fetchSoftwareOptions()
}

const closeSoftwareModal = () => {
  showSoftwareModal.value  = false
  selectedSoftwareId.value = ''
  selectedLevel.value      = ''
}

const fetchSoftwareOptions = async () => {
  fetchSoftwareLoading.value = true
  try {
    const res = await api().get('softwares')
    softwareOptions.value = res.data.data || []
  } catch {
    Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch software options', confirmButtonColor: '#3abff8' })
  } finally {
    fetchSoftwareLoading.value = false
  }
}

const submitSoftwareSelection = async () => {
  if (!selectedSoftwareId.value) {
    return Swal.fire({ icon: 'error', title: 'Error', text: 'Please select a software', confirmButtonColor: '#3abff8' })
  }
  if (!selectedLevel.value) {
    return Swal.fire({ icon: 'error', title: 'Error', text: 'Please select a software level', confirmButtonColor: '#3abff8' })
  }

  softwareSubmitLoading.value = true
  try {
    await api().post('end-user-software-add', {
      software_id: selectedSoftwareId.value,
      level:       selectedLevel.value,
    })

    await Swal.fire({ icon: 'success', title: 'Success', text: 'Software added successfully!', confirmButtonColor: '#3abff8' })
    closeSoftwareModal()
    fetchSoftwareSolutions() // refresh list
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Error', text: error.response?.data?.message || 'Failed to add software', confirmButtonColor: '#3abff8' })
  } finally {
    softwareSubmitLoading.value = false
  }
}

// ─── Add Solution modal state ──────────────────────────────────
const showSolutionModal     = ref(false)
const selectedSolutionId    = ref('')
const solutionOptions       = ref([])
const fetchSolutionLoading  = ref(false)
const solutionSubmitLoading = ref(false)

const openSolutionModal = async () => {
  showSolutionModal.value = true
  await fetchSolutionOptions()
}

const closeSolutionModal = () => {
  showSolutionModal.value  = false
  selectedSolutionId.value = ''
}

const fetchSolutionOptions = async () => {
  fetchSolutionLoading.value = true
  try {
    const res = await api().get('solutions')
    solutionOptions.value = res.data.data || []
  } catch {
    Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch solution options', confirmButtonColor: '#3abff8' })
  } finally {
    fetchSolutionLoading.value = false
  }
}

const submitSolutionSelection = async () => {
  if (!selectedSolutionId.value) {
    return Swal.fire({ icon: 'error', title: 'Error', text: 'Please select a solution', confirmButtonColor: '#3abff8' })
  }

  solutionSubmitLoading.value = true
  try {
    await api().post('end-user-solution-add', { solution_id: selectedSolutionId.value })

    await Swal.fire({ icon: 'success', title: 'Success', text: 'Solution added successfully!', confirmButtonColor: '#3abff8' })
    closeSolutionModal()
    fetchSoftwareSolutions() // refresh list
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Error', text: error.response?.data?.message || 'Failed to add solution', confirmButtonColor: '#3abff8' })
  } finally {
    solutionSubmitLoading.value = false
  }
}

// ─── Main list helpers ─────────────────────────────────────────
const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'This will delete the software!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e3342f',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Yes, delete it!',
  })

  if (!result.isConfirmed) return

  try {
    await api().delete(`/software/${id}`)
    softwareList.value = softwareList.value.filter(item => item.id !== id)
    Swal.fire('Deleted!', 'Software has been removed.', 'success')
  } catch {
    Swal.fire('Error!', 'Delete failed.', 'error')
  }
}

const getLevelColor = (level) => {
  switch (level.toLowerCase()) {
    case 'expert':       return 'bg-purple-100 text-purple-700'
    case 'advanced':     return 'bg-blue-100 text-blue-700'
    case 'advance':      return 'bg-blue-100 text-blue-700'
    case 'intermediate': return 'bg-yellow-100 text-yellow-700'
    case 'beginner':     return 'bg-green-100 text-green-700'
    default:             return 'bg-gray-100 text-gray-700'
  }
}

const fetchSoftwareSolutions = async () => {
  loadingSoftware.value = true
  softwareError.value   = null
  try {
    const response = await api().get('end-user-software-list')
    if (response.data?.data) {
      softwareList.value = response.data.data
      const item = sidebarItems.value.find(i => i.key === 'msc-software')
      if (item) item.count = softwareList.value.length
    } else {
      softwareList.value = []
    }
  } catch {
    softwareError.value = 'Failed to load software data. Please try again.'
    softwareList.value  = []
  } finally {
    loadingSoftware.value = false
  }
}

onMounted(fetchSoftwareSolutions)
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css');
/* Modal transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.96);
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
section { animation: fadeInUp 0.5s ease-out; }


</style>