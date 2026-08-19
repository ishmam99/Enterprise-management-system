<script setup>
import { ref, onMounted, watch } from 'vue'
import api from '@/config/api'
import Swal from 'sweetalert2'

const props = defineProps({
  activeSidebar: String,
  userData: Object
})

/* ---------------- STATE ---------------- */

const experienceList = ref([])
const loading = ref(false)

const showModal = ref(false)
const saving = ref(false)

const isEditMode = ref(false)
const editingId = ref(null)

const form = ref({
  company_name: '',
  position: '',
  start_date: '',
  end_date: '',
  is_current: 0, // ✅ use 0/1 for checkboxes to avoid v-model boolean quirks
  location: '',
  responsibilities: '',
  status: 1
})

/* ---------------- API ---------------- */

const fetchExperience = async () => {
  loading.value = true
  try {
    const res = await api().get('/user-experiences')
    experienceList.value = res.data.data || []
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}

/* ---------------- ADD / EDIT ---------------- */

const openModal = () => {
  isEditMode.value = false
  editingId.value = null

  form.value = {
    company_name: '',
    position: '',
    start_date: '',
    end_date: '',
    is_current: 0,
    location: '',
    responsibilities: '',
    status: 1
  }

  showModal.value = true
}

const editExperience = (exp) => {
  isEditMode.value = true
  editingId.value = exp.id

  form.value = {
    company_name: exp.company_name || '',
    position: exp.position || '',
    start_date: exp.start_date || '',
    end_date: exp.end_date || '',
    is_current: exp.is_current == 1 ? 1 : 0, // ✅ force 0/1
    location: exp.location || '',
    responsibilities: exp.responsibilities || '',
    status: exp.status || 1
  }

  showModal.value = true
}

/* ---------------- SAVE ---------------- */

const submitExperience = async () => {
  saving.value = true

  try {
    const payload = {
      ...form.value,
      is_current: form.value.is_current == 1 ? 1 : 0 // ✅ force 0/1
    }

    if (isEditMode.value) {
      await api().post(`/user-experiences/${editingId.value}`, {
        ...payload,
        _method: 'PUT'
      })
    } else {
      await api().post('/user-experiences', payload)
    }

    showModal.value = false

    // reset
    form.value = {
      company_name: '',
      position: '',
      start_date: '',
      end_date: '',
      is_current: 0,
      location: '',
      responsibilities: '',
      status: 1
    }

    isEditMode.value = false
    editingId.value = null

    fetchExperience()

  } catch (e) {
    console.log(e)
  } finally {
    saving.value = false
  }
}

/* ---------------- DELETE ---------------- */

const deleteExperience = async (id) => {
  const res = await Swal.fire({
    title: 'Delete this experience?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    confirmButtonText: 'Yes delete'
  })

  if (!res.isConfirmed) return

  try {
    await api().delete(`/user-experiences/${id}`)
    Swal.fire('Deleted!', '', 'success')
    fetchExperience()
  } catch (e) {
    Swal.fire('Error!', '', 'error')
  }
}

/* ---------------- UTIL ---------------- */

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString()
}

/* ---------------- INIT ---------------- */

watch(() => form.value.is_current, (val) => {
  if (val) {
    form.value.end_date = ''
  }
})
watch(() => form.value.is_current, (val) => {
  if (val == 1) {
    form.value.end_date = ''
  }
})
onMounted(() => {
  fetchExperience()
})
</script>

<template>
  <section id="my-experience" class="bg-white rounded-xl m-2 shadow-sm border border-gray-200 overflow-hidden">

    <!-- HEADER -->
    <div
      class="px-6 py-4 border-b border-gray-200 flex justify-between items-center"
      :class="activeSidebar == 'my-experience' ? 'bg-blue-600 text-white' : 'bg-cyan-500 text-white'"
    >
      <h2 class="text-lg font-semibold flex items-center gap-2">
        <span
          class="w-2 h-6 bg-blue-600 rounded-full"
          :class="activeSidebar == 'my-experience' ? 'bg-white text-white' : ''"
        ></span>
        My Experience
      </h2>

      <button
        @click="openModal"
        :class="
          activeSidebar === 'my-experience'
            ? 'bg-white text-blue-600 hover:bg-slate-100'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        "
        class="text-sm px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
      >
        <i class="ri-add-line"></i>
        Add Experience
      </button>
    </div>

    <!-- LOADER -->
    <div v-if="loading" class="p-10 text-center">
      <i class="fas fa-spinner fa-spin text-2xl text-gray-500"></i>
    </div>

    <!-- TIMELINE -->
    <div v-else class="p-6 space-y-4">

      <div
        v-for="exp in experienceList"
        :key="exp.id"
        class="relative pl-8 before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-blue-600 before:rounded-full after:absolute after:left-[5px] after:top-5 after:w-[2px] after:h-full after:bg-gray-200 last:after:hidden"
      >

        <div class="p-4 border rounded-xl bg-white shadow-sm">

          <div class="flex justify-between">

            <div>
              <h3 class="font-bold text-gray-800">{{ exp.position }}</h3>
              <p class="text-sm text-indigo-600">{{ exp.company_name }}</p>
              <p class="text-xs text-gray-500">{{ exp.location }}</p>

              <p class="text-xs text-gray-400 mt-1">
  {{ formatDate(exp.start_date) }} -
  {{ exp.is_current == 1 ? 'Present' : formatDate(exp.end_date) }}
</p>
            </div>

            <div class="flex gap-2">
              <button @click="editExperience(exp)" class="text-blue-600">
                <i class="ri-edit-line text-2xl"></i>
              </button>

              <button @click="deleteExperience(exp.id)" class="text-red-600">
                <i class="ri-delete-bin-line text-2xl"></i>
              </button>
            </div>

          </div>

          <p class="text-xs text-gray-600 mt-2">
            {{ exp.responsibilities }}
          </p>

        </div>

      </div>

    </div>

    <!-- MODAL -->
    <div v-if="showModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div class="bg-white w-full max-w-lg rounded-xl p-6 shadow-xl">

        <h2 class="text-xl font-bold mb-4">
          {{ isEditMode ? 'Edit Experience' : 'Add Experience' }}
        </h2>

        <div class="space-y-3">

          <div>
            <label class="text-sm">Company</label>
            <input v-model="form.company_name" class="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label class="text-sm">Position</label>
            <input v-model="form.position" class="w-full border rounded px-3 py-2" />
          </div>

         <div class="grid grid-cols-2 gap-4">

  <div>
    <label class="text-sm">Start Date</label>
    <input type="date" v-model="form.start_date" class="w-full border rounded px-3 py-2" />
  </div>

  <!-- SHOW ONLY IF NOT CURRENT -->
  <div v-if="!form.is_current">
    <label class="text-sm">End Date</label>
    <input
  type="date"
  v-model="form.end_date"
  :disabled="form.is_current"
  class="w-full border rounded px-3 py-2 disabled:bg-gray-100"
/>
  </div>

</div>

<div class="flex items-center gap-2 mt-2">
  <input
  type="checkbox"
  v-model="form.is_current"
  :true-value="1"
  :false-value="0"
/>
  <label class="text-sm">Currently Working</label>
</div>

          <div>
            <label class="text-sm">Location</label>
            <input v-model="form.location" class="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label class="text-sm">Responsibilities</label>
            <textarea v-model="form.responsibilities" class="w-full border rounded px-3 py-2"></textarea>
          </div>

          <!-- <div class="flex items-center gap-2">
            <input type="checkbox" v-model="form.is_current" />
            <label class="text-sm">Currently Working</label>
          </div> -->

        </div>

        <div class="flex justify-end gap-3 mt-5">

          <button @click="showModal=false" class="border px-4 py-2 rounded">
            Cancel
          </button>

          <button @click="submitExperience" class="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
            <i v-if="saving" class="fas fa-spinner fa-spin"></i>
            {{ isEditMode ? 'Update' : 'Save' }}
          </button>

        </div>

      </div>

    </div>

  </section>
</template>