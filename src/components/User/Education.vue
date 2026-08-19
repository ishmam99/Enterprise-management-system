<template>
  <section
    id="my-education"
    class="rounded-xl shadow-sm border m-2 border-gray-200 overflow-hidden"
  >
    <div
      class="px-6 py-4 border-b border-gray-200 flex justify-between items-center"
      :class="activeSidebar === 'my-education' ? 'bg-blue-600 text-white' : 'bg-emerald-500 text-white'"
    >
      <h2 class="text-lg font-semibold flex items-center gap-2">
        <span
          class="w-2 h-6 bg-blue-600 rounded-full"
          :class="activeSidebar === 'my-education' ? 'bg-white text-white' : ''"
        ></span>
        My Education
      </h2>

      <button
        @click="openEducationModal"
        :class="
          activeSidebar === 'my-education'
            ? 'bg-white text-blue-600 hover:bg-slate-100'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        "
        class="text-sm px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
      >
        <i class="ri-add-line"></i>
        Add Education
      </button>
    </div>

    <!-- Loader -->
    <div v-if="loadingEducation" class="p-10 text-center">
      <i class="fas fa-spinner fa-spin text-2xl text-gray-500"></i>
    </div>

    <!-- List -->
    <div v-else class="p-6 space-y-4">
      <div
        v-for="edu in educationList"
        :key="edu.id"
        class="flex gap-4 p-4 border items-center justify-between border-gray-100 rounded-xl hover:bg-gray-50 transition"
      >
        <div class="flex gap-4 items-center">
          <div class="bg-blue-100 text-blue-600 p-3 rounded-lg h-fit text-xl">🎓</div>

          <div>
            <h3 class="font-bold text-gray-800">
              {{ edu.field_of_study }}
            </h3>

            <p class="text-sm text-gray-600">
              {{ edu.institute_name }}
            </p>

            <div class="flex gap-3 mt-2">
              <span class="text-xs font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                {{ edu.start_year }} - {{ edu.end_year }}
              </span>

              <span class="text-xs font-semibold bg-green-50 text-green-700 px-2 py-0.5 rounded">
                Result: {{ edu.result }}
              </span>
            </div>
          </div>
        </div>

        <div class="flex gap-2">
          <button @click="editEducation(edu)" class="text-blue-600 hover:text-blue-800">
            <i class="ri-edit-line text-2xl"></i>
          </button>

          <button @click="deleteEducation(edu.id)" class="text-red-600 hover:text-red-800">
            <i class="ri-delete-bin-line text-2xl"></i>
          </button>
        </div>
      </div>
    </div>
    <!-- Education Modal -->
    <div
      v-if="showEducationModal"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white w-full max-w-lg rounded-xl shadow-xl p-6">
        <h2 class="text-xl font-bold mb-6">
          {{ isEditMode ? 'Edit Education' : 'Add Education' }}
        </h2>

        <div class="space-y-4">
          <div>
            <label class="text-sm font-medium text-gray-600">Institute Name</label>
            <input
              v-model="educationForm.institute_name"
              class="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label class="text-sm font-medium text-gray-600">Field of Study</label>
            <input
              v-model="educationForm.field_of_study"
              class="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label class="text-sm font-medium text-gray-600">Result</label>
            <input v-model="educationForm.result" class="w-full border rounded-lg px-3 py-2 mt-1" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium text-gray-600">Start Year</label>
              <select
                v-model="educationForm.start_year"
                class="w-full border rounded-lg px-3 py-2 mt-1"
              >
                <option value="">Select</option>
                <option v-for="year in years" :key="year">{{ year }}</option>
              </select>
            </div>

            <div>
              <label class="text-sm font-medium text-gray-600">End Year</label>
              <select
                v-model="educationForm.end_year"
                class="w-full border rounded-lg px-3 py-2 mt-1"
              >
                <option value="">Select</option>
                <option v-for="year in years" :key="year">{{ year }}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <button @click="closeEducationModal" class="px-4 py-2 border rounded-lg">Cancel</button>

          <button
            @click="submitEducation"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <i v-if="savingEducation" class="fas fa-spinner fa-spin"></i>
            {{ isEditMode ? 'Update' : 'Save' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import api from '@/config/api'
import Swal from 'sweetalert2'
import { onMounted, ref, defineProps } from 'vue'

defineProps({
  activeSidebar: String,
  userData: Object
})

const educationList = ref([])
const loadingEducation = ref(false)
const isEditMode = ref(false)
const editingId = ref(null)
const showEducationModal = ref(false)
const savingEducation = ref(false)

const educationForm = ref({
  institute_name: '',
  field_of_study: '',
  result: '',
  start_year: '',
  end_year: '',
  status: 0
})

const openEducationModal = () => {
  isEditMode.value = false
  editingId.value = null

  educationForm.value = {
    institute_name: '',
    field_of_study: '',
    result: '',
    start_year: '',
    end_year: '',
    status: 1
  }

  showEducationModal.value = true
}

const closeEducationModal = () => {
  showEducationModal.value = false
}

const editEducation = (edu) => {
  isEditMode.value = true
  editingId.value = edu.id

  educationForm.value = {
    institute_name: edu.institute_name,
    field_of_study: edu.field_of_study,
    result: edu.result,
    start_year: edu.start_year,
    end_year: edu.end_year,
    status: edu.status || 1
  }

  showEducationModal.value = true
}

const submitEducation = async () => {
  savingEducation.value = true

  try {
    if (isEditMode.value) {
      await api().post(`/user-education/${editingId.value}`, {
        ...educationForm.value,
        _method: 'PUT'
      })
    } else {
      await api().post('/user-education', educationForm.value)
    }

    showEducationModal.value = false
    fetchEducation()
  } catch (err) {
    console.log(err)
  } finally {
    savingEducation.value = false
  }
}
const fetchEducation = async () => {
  loadingEducation.value = true

  try {
    const res = await api().get('/user-education')

    educationList.value = res.data.data || []

    // sidebarItems.value.find(i => i.key === 'my-education').count =
    //   educationList.value.length
  } catch (err) {
    console.log(err)
  } finally {
    loadingEducation.value = false
  }
}

const deleteEducation = async (id) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'This will delete the education record.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  })

  if (!result.isConfirmed) return

  try {
    await api().delete(`/user-education/${id}`)

    Swal.fire('Deleted!', 'Education removed.', 'success')

    fetchEducation()
  } catch (err) {
    Swal.fire('Error!', 'Something went wrong.', 'error')
  }
}

const years = []

for (let i = 1990; i <= new Date().getFullYear(); i++) {
  years.push(i)
}

onMounted(() => {
  fetchEducation()
})
</script>

<style lang="scss" scoped></style>
