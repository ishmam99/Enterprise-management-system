<template>
  <div class="min-h-screen bg-slate-100 w-full px-10 py-4">
    <!-- HEADER -->
    <div
      class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-6 mb-6 shadow-lg"
    >
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold">Add Development - {{ softwareName }}</h1>
          <p class="text-sm opacity-80">Create your learning roadmap</p>
        </div>

        <button
          @click="router.back()"
          class="bg-white text-indigo-600 hover:bg-slate-100 px-4 py-2 rounded-lg font-medium hover:shadow"
        >
          ← Back
        </button>
      </div>
    </div>

    <!-- FORM -->
    <div class="bg-white rounded-2xl shadow p-6 mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- TITLE -->
        <div class="md:col-span-2">
          <label class="text-sm text-slate-600">Title</label>
          <input v-model="form.title" type="text" class="input" />
        </div>

        <!-- TYPE -->
        <div>
          <label class="text-sm text-slate-600">Type</label>
          <select v-model="form.type" class="input">
            <option value="" selected disabled>Select</option>
            <option value="training">Training</option>
            <option value="self_learning">Self Learning</option>
            <option value="certification">Certification</option>
          </select>
        </div>

        <!-- TRAINING ID -->
        <!-- TRAINING DROPDOWN -->
<div v-if="form.type == 'training'">
  <label class="text-sm text-slate-600">Training Course</label>

  <select v-model="form.training_course_id" class="input">
    <option value="" selected disabled>Select Training</option>

    <option
      v-for="course in trainingCourses"
      :key="course.id"
      :value="course.id"
    >
      {{ course.title }}
    </option>
  </select>

  <p v-if="trainingLoading" class="text-xs text-slate-400 mt-1">
    Loading trainings...
  </p>
  <p v-if="!trainingLoading && trainingCourses.length == 0" class="text-xs text-red-400 mt-1">
  No training found for this software
</p>
</div>

        <!-- START DATE -->
        <div>
          <label class="text-sm text-slate-600">Start Date</label>
          <input v-model="form.start_date" type="date" class="input" />
        </div>

        <!-- END DATE -->
        <div>
          <label class="text-sm text-slate-600">End Date</label>
          <input v-model="form.end_date" type="date" class="input" />
        </div>

        <!-- STATUS -->
        <div>
          <label class="text-sm text-slate-600">Status</label>
         <select v-model="form.status" class="input">
  <option value="" selected disabled>Select Status</option>
  <option value="planned">Planned</option>
  <option value="in_progress">In Progress</option>
  <option value="completed">Completed</option>
  <option value="paused">Paused</option>
</select>
        </div>

        <!-- PRIORITY -->
        <div>
          <label class="text-sm text-slate-600">Priority</label>
          <select v-model="form.priority" class="input">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <!-- HOURS -->
        <div>
          <label class="text-sm text-slate-600">Estimated Hours</label>
          <input v-model="form.estimated_hours" type="number" class="input" />
        </div>

        <!-- REMINDER -->
        <div class="flex items-center gap-2 mt-6">
          <input type="checkbox" v-model="form.is_reminder_enabled" />
          <label class="text-sm text-slate-600">Enable Reminder</label>
        </div>

        <!-- DESCRIPTION -->
        <div class="md:col-span-2">
          <label class="text-sm text-slate-600">Description</label>
          <textarea v-model="form.description" rows="4" cols="4" class="w-full rounded-lg border-slate-100 bg-slate-100"></textarea>
        </div>
      </div>

      <!-- ACTION -->
      <div class="flex justify-center mt-6">
        <button
          @click="submitForm"
          :disabled="loading"
          class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
        >
          <span v-if="loading" class="animate-spin ri-loader-4-line"></span>
          {{ loading ? 'Saving...' : 'Save Development' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/config/api'
import Swal from 'sweetalert2'
import { watch } from 'vue'

const route = useRoute()
const router = useRouter()

// 👇 GET FROM QUERY
const softwareId = computed(() => String(route.query.software_id || ''))
const softwareName = computed(() => route.query.name || 'Software')
const trainingCourses = ref([])
const trainingLoading = ref(false)
const getTrainingCourses = async () => {
  try {
    trainingLoading.value = true

    const { data } = await api().get(`/training-course?software_id=${softwareId.value}`)

    trainingCourses.value = data?.data || []

    // 🔥 filter by software_id
    // trainingCourses.value = allCourses.filter(
    //   c => c.software_id == softwareId.value
    // )

  } catch (err) {
    console.error('Training fetch error:', err)
  } finally {
    trainingLoading.value = false
  }
}

// FORM
const form = ref({
  type: 'training',
  training_course_id: null,
  software_id: softwareId.value,
  title: '',
  description: '',
  start_date: '',
  end_date: '',
  progress: 0,
  status: 'planned',
  priority: 'medium',
  is_reminder_enabled: true,
  estimated_hours: null
})

const resetForm = () => {
  form.value = {
    type: 'training',
    training_course_id: null,
    software_id: softwareId.value,
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    progress: 0,
    status: 'planned',
    priority: 'medium',
    is_reminder_enabled: true,
    estimated_hours: null
  }
}

const loading = ref(false)

// SUBMIT
const submitForm = async () => {
  try {
    loading.value = true

    const payload = {
      ...form.value,
      software_id: softwareId.value,
      is_reminder_enabled: form.value.is_reminder_enabled ? 1 : 0
    }

    await api().post('/end-user-road-maps', payload)

    await Swal.fire({
      icon: 'success',
      title: 'Saved!',
      text: 'Development added successfully',
      confirmButtonColor: '#6366f1'
    })
    resetForm()
    // router.push({
    //   name: 'user-Career-BySoftware-id',
    //   params: { id: softwareId.value },
    //   query: { name: softwareName.value }
    // })

  } catch (err) {
    console.error(err)

    Swal.fire({
      icon: 'error',
      title: 'Failed!',
      text: 'Something went wrong. Please try again.',
      confirmButtonColor: '#ef4444'
    })

  } finally {
    loading.value = false
  }
}

watch(
  () => form.value.type,
  async (val) => {
    if (val == 'training') {
      await getTrainingCourses()
    } else {
      form.value.training_course_id = null
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.input {
  @apply w-full px-4 py-2 mt-1 rounded-xl 
         bg-slate-100 border border-slate-200 shadow 
         text-slate-700 placeholder:text-slate-400
         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
         transition-all duration-200 cursor-pointer;
}

.input:focus {
  @apply bg-white shadow-md;
}
.input:hover {
  @apply border-indigo-300;
}
</style>
