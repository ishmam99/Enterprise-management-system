<template>
  <section
    id="resume-summary"
    class="rounded-xl shadow-sm border m-2 border-gray-200"
  >
    <!-- Header -->
    <div class="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 flex justify-between items-center">
      <h2 class="text-lg font-semibold flex items-center gap-2">
        <i class="ri-file-text-line"></i>
        Professional Summary
      </h2>

      <button
        @click="openSummaryModal"
        class="bg-white text-purple-600 px-4 py-2 rounded-lg text-sm"
      >
        Edit
      </button>
    </div>

    <!-- Loader -->
    <div v-if="loadingSummary" class="p-10 text-center">
      <i class="fas fa-spinner fa-spin text-2xl text-gray-500"></i>
    </div>

    <!-- Content -->
    <div v-else class="p-6">
      <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
        <p class="text-gray-700 leading-relaxed mb-4">
          {{ resumeSummary.summary }}
        </p>

        <div class="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-purple-200 text-center">
          <div>
            <div class="text-2xl font-bold text-purple-600">
              {{ resumeSummary.experience_in_years }}+
            </div>
            <div class="text-xs text-gray-500">Years Experience</div>
          </div>

          <div>
            <div class="text-2xl font-bold text-purple-600">
              {{ resumeSummary.project_completed }}+
            </div>
            <div class="text-xs text-gray-500">Projects Completed</div>
          </div>

          <div>
            <div class="text-2xl font-bold text-purple-600">
              {{ resumeSummary.client_served }}+
            </div>
            <div class="text-xs text-gray-500">Clients Served</div>
          </div>
        </div>

        <div class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="(skill, idx) in resumeSummary.skills"
            :key="idx"
            class="text-xs bg-white border border-purple-200 px-3 py-1 rounded-full text-purple-700 flex items-center gap-1"
          >
            🏆 {{ skill }}
          </span>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showSummaryModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white w-full max-w-lg rounded-xl p-6 max-h-[90vh] overflow-y-auto">
        <h2 class="text-xl font-bold mb-4">Edit Summary</h2>

        <div class="space-y-4">
          <!-- Summary Textarea -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
            <textarea
              v-model="summaryForm.summary"
              class="w-full border rounded-lg p-3"
              rows="3"
              placeholder="Write a compelling professional summary..."
            />
          </div>

          <!-- Years Experience -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Years Experience</label>
            <input
              v-model="summaryForm.experience_in_years"
              type="number"
              placeholder="Years Experience"
              class="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <!-- Projects Completed -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Projects Completed</label>
            <input
              v-model="summaryForm.project_completed"
              type="number"
              placeholder="Projects Completed"
              class="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <!-- Clients Served -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Clients Served</label>
            <input
              v-model="summaryForm.client_served"
              type="number"
              placeholder="Clients Served"
              class="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <!-- Skills Section with Individual Addition -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Skills</label>

            <!-- Individual Skill Input -->
            <div class="flex gap-2 mb-3">
              <input
                v-model="newSkill"
                @keyup.enter="addSkill"
                placeholder="Enter a skill"
                class="flex-1 border rounded-lg px-3 py-2"
              />
              <button
                @click="addSkill"
                class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Add Skill
              </button>
            </div>

            <!-- Skills Tags -->
            <div class="flex flex-wrap gap-2 mb-3 min-h-[80px] border rounded-lg p-3 bg-gray-50">
              <div
                v-for="(skill, idx) in summaryForm.skills"
                :key="idx"
                class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
              >
                <span>🏆 {{ skill }}</span>
                <button
                  @click="removeSkill(idx)"
                  class="hover:text-red-600 focus:outline-none"
                  type="button"
                >
                  <i class="fas fa-times-circle text-xs"></i>
                </button>
              </div>
              <div v-if="summaryForm.skills.length === 0" class="text-gray-400 text-sm">
                No skills added yet. Add your skills above.
              </div>
            </div>

            <!-- Quick Suggestions -->
            <div class="mt-2">
              <label class="block text-xs text-gray-500 mb-1">Quick Suggestions:</label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="suggestion in skillSuggestions"
                  :key="suggestion"
                  @click="addSkillSuggestion(suggestion)"
                  class="text-xs bg-gray-100 hover:bg-purple-100 text-gray-700 px-2 py-1 rounded-full transition"
                  type="button"
                >
                  + {{ suggestion }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <button
            @click="closeModal"
            class="px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            @click="updateSummary"
            :disabled="savingSummary"
            class="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition disabled:opacity-50"
          >
            <i v-if="savingSummary" class="fas fa-spinner fa-spin"></i>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import api from '@/config/api'
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'

const resumeSummary = ref({})
const loadingSummary = ref(false)
const showSummaryModal = ref(false)
const savingSummary = ref(false)
const newSkill = ref('')

const summaryForm = ref({
  summary: '',
  experience_in_years: '',
  client_served: '',
  project_completed: '',
  skills: []
})

// Quick skill suggestions
const skillSuggestions = [
  'JavaScript',
  'Vue.js',
  'React',
  'Node.js',
  'Python',
  'UI/UX Design',
  'Project Management',
  'Team Leadership',
  'Agile Methodology',
  'API Development'
]

/* ================= SKILLS MANAGEMENT ================= */
const addSkill = () => {
  const skill = newSkill.value.trim()
  if (skill && !summaryForm.value.skills.includes(skill)) {
    summaryForm.value.skills.push(skill)
    newSkill.value = ''
  } else if (summaryForm.value.skills.includes(skill)) {
    Swal.fire('Info', 'This skill is already added', 'info')
  } else if (!skill) {
    Swal.fire('Info', 'Please enter a skill', 'info')
  }
}

const addSkillSuggestion = (suggestion) => {
  if (!summaryForm.value.skills.includes(suggestion)) {
    summaryForm.value.skills.push(suggestion)
  }
}

const removeSkill = (index) => {
  summaryForm.value.skills.splice(index, 1)
}

/* ================= FETCH ================= */
const fetchSummary = async () => {
  loadingSummary.value = true
  try {
    const res = await api().get('/professional-summary')
    resumeSummary.value = res.data.data || {}
  } catch (err) {
    console.log(err)
  } finally {
    loadingSummary.value = false
  }
}

/* ================= OPEN MODAL ================= */
const openSummaryModal = () => {
  summaryForm.value = {
    summary: resumeSummary.value.summary || '',
    experience_in_years: resumeSummary.value.experience_in_years || '',
    client_served: resumeSummary.value.client_served || '',
    project_completed: resumeSummary.value.project_completed || '',
    skills: [...(resumeSummary.value.skills || [])]
  }
  newSkill.value = ''
  showSummaryModal.value = true
}

const closeModal = () => {
  showSummaryModal.value = false
  newSkill.value = ''
}

/* ================= UPDATE ================= */
const updateSummary = async () => {
  if (!summaryForm.value.summary) {
    return Swal.fire('Error', 'Summary is required', 'error')
  }

  savingSummary.value = true

  try {
    await api().post('/professional-summary/' + resumeSummary.value.id, {
      ...summaryForm.value,
      _method:'PUT',
      skills: summaryForm.value.skills
    })

    Swal.fire('Success', 'Summary updated successfully!', 'success')
    closeModal()
    fetchSummary()
  } catch (err) {
    Swal.fire('Error', 'Something went wrong', 'error')
    console.error(err)
  } finally {
    savingSummary.value = false
  }
}

onMounted(() => {
  fetchSummary()
})
</script>

<style scoped>
/* Smooth transitions */
button {
  transition: all 0.2s ease;
}

/* Custom scrollbar for modal */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>
