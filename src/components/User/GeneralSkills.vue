<template>
  <section id="general-skills" class="bg-white rounded-xl shadow-sm border overflow-hidden">

    <!-- HEADER -->
    <div class="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-4 flex justify-between">
      <h2 class="text-lg font-semibold flex items-center gap-2">
        <i class="ri-tools-line"></i>
        General Skills
      </h2>

      <button @click="openModal" class="bg-white/20 hover:bg-white/50 px-3 py-1 rounded text-sm">
        + Add
      </button>
    </div>

    <!-- LOADER -->
    <div v-if="loading" class="p-10 text-center">
      <i class="fas fa-spinner fa-spin text-2xl"></i>
    </div>

    <!-- LIST -->
    <div v-else class="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">

      <div v-for="skill in skillList" :key="skill.id" class="group">

        <div class="bg-gray-50 p-4 rounded-xl border hover:shadow">

          <div class="flex justify-between mb-2">

            <div class="flex gap-2 items-center">
              <!-- <i :class="skill.icon" class="text-emerald-600"></i> -->
              <h3 class="font-semibold">{{ skill.name }}</h3>
            </div>

            <div class="flex gap-2">
              <button @click="editSkill(skill)" class="text-blue-600">
                <i class="ri-edit-line"></i>
              </button>

              <button @click="deleteSkill(skill.id)" class="text-red-600">
                <i class="ri-delete-bin-line"></i>
              </button>
            </div>

          </div>

          <span class="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded">
            {{ skill.proficiency_level }}
          </span>

          <div class="flex flex-wrap gap-2 mt-3">
            <span
              v-for="(c, i) in skill.competencies"
              :key="i"
              class="text-xs border px-2 py-1 rounded"
            >
              {{ c.name || c }}
            </span>
          </div>

        </div>

      </div>

    </div>

    <!-- MODAL -->
    <div v-if="showModal" class="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div class="bg-white w-full max-w-lg p-6 rounded-xl">

        <h2 class="text-lg font-bold mb-4">
          {{ isEditMode ? 'Edit Skill' : 'Add Skill' }}
        </h2>

        <div class="space-y-3">

          <div>
            <label>Name</label>
            <input v-model="form.name" class="w-full border px-3 py-2 rounded" />
          </div>

          <!-- <div>
            <label>Icon (remix class)</label>
            <input v-model="form.icon" class="w-full border px-3 py-2 rounded" />
          </div> -->

          <div>
            <label>Proficiency</label>
            <select v-model="form.proficiency_level" class="w-full border px-3 py-2 rounded">
              <option v-for="l in levels" :key="l">{{ l }}</option>
            </select>
          </div>

          <!-- competencies -->
          <div>
            <label>Competencies</label>

            <div v-for="(c, i) in form.competencies" :key="i" class="flex gap-2 mt-2">

              <input v-model="form.competencies[i]" class="flex-1 border px-3 py-2 rounded" />

              <button @click="removeCompetency(i)" class="text-red-500">✕</button>

            </div>

            <button @click="addCompetency" class="text-sm text-blue-600 mt-2">
              + Add competency
            </button>

          </div>

        </div>

        <div class="flex justify-end gap-3 mt-5">

          <button @click="showModal=false" class="border px-4 py-2 rounded">
            Cancel
          </button>

          <button @click="submitSkill" class="bg-emerald-600 text-white px-4 py-2 rounded flex gap-2 items-center">
            <i v-if="saving" class="fas fa-spinner fa-spin"></i>
            Save
          </button>

        </div>

      </div>

    </div>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/config/api'
import Swal from 'sweetalert2'

const props = defineProps({
  activeSidebar: String
})

/* ---------------- STATE ---------------- */

const skillList = ref([])
const loading = ref(false)

const showModal = ref(false)
const saving = ref(false)

const isEditMode = ref(false)
const editingId = ref(null)

/* form */
const form = ref({
  name: '',
  // icon: '',
  proficiency_level: 'Beginner',
  competencies: ['']
})

const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert']

/* ---------------- FETCH ---------------- */

const fetchSkills = async () => {
  loading.value = true
  try {
    const res = await api().get('/general-skill-by-user')
    skillList.value = res.data.data || []
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}

/* ---------------- ADD ---------------- */

const openModal = () => {
  isEditMode.value = false
  editingId.value = null

  form.value = {
    name: '',
    // icon: '',
    proficiency_level: 'Beginner',
    competencies: ['']
  }

  showModal.value = true
}

/* ---------------- EDIT ---------------- */

const editSkill = (skill) => {
  isEditMode.value = true
  editingId.value = skill.id

  form.value = {
    name: skill.name || '',
    // icon: skill.icon || '',
    proficiency_level: skill.proficiency_level || 'Beginner',
    competencies: skill.competencies?.length
      ? skill.competencies.map(c => c.name || c) // handle id/name
      : ['']
  }

  showModal.value = true
}

/* ---------------- SAVE ---------------- */

const submitSkill = async () => {
  saving.value = true

  try {
    const payload = {
      ...form.value,
      competencies: form.value.competencies.filter(c => c !== '')
    }

    if (isEditMode.value) {
      await api().post(`/general-skills/${editingId.value}`, {
        ...payload,
        _method: 'PUT'
      })
    } else {
      await api().post('/general-skills', payload)
    }

    showModal.value = false
    fetchSkills()

  } catch (e) {
    console.log(e)
  } finally {
    saving.value = false
  }
}

/* ---------------- DELETE ---------------- */

const deleteSkill = async (id) => {
  const res = await Swal.fire({
    title: 'Delete skill?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33'
  })

  if (!res.isConfirmed) return

  try {
    await api().delete(`/general-skills/${id}`)
    Swal.fire('Deleted!', '', 'success')
    fetchSkills()
  } catch (e) {
    Swal.fire('Error!', '', 'error')
  }
}

/* ---------------- COMPETENCIES ---------------- */

const addCompetency = () => {
  form.value.competencies.push('')
}

const removeCompetency = (index) => {
  form.value.competencies.splice(index, 1)
}

/* ---------------- INIT ---------------- */

onMounted(() => {
  fetchSkills()
})
</script>

<style scoped>

</style>