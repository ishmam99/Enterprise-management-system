<template>
  <div class="p-6 w-4/5 bg-gray-50 min-h-screen mx-auto">
    <!-- Header -->
    <p class="text-2xl font-bold bg-emerald-600 text-white text-center rounded-t-lg py-3 mb-6 shadow-md">
      📚 Training Courses By Software
    </p>

    <!-- Search & Filter -->
    <div v-if="selectedSoftware" class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div class="relative w-full sm:w-1/3 mb-4 sm:mb-0">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by course name..."
          class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
        />
        <i class="fa fa-search absolute left-3 top-3 text-gray-400"></i>
      </div>
      <div class="flex justify-between gap-3 items-center">
        <button class="btn btn-warning" @click="selectedSoftware = null, getTrainingCourses(false)">
          <i class="ri-arrow-left-double-fill"></i>
          Back to Software List
        </button>
        <select
          v-model="selectedSoftware"
          class="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
          @change="getTrainingCourses(true)"
        >
          <option value="">All</option>
          <option v-for="software in softwares" :key="software.id" :value="software.id">
            {{ software.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Training Courses Table -->
    <div v-if="selectedSoftware" class="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-100">
      <table class="min-w-full text-sm text-gray-700 table-zebra">
        <thead class="bg-emerald-600 text-white text-left">
          <tr>
            <th class="py-3 border-e px-4">#</th>
            <th class="py-3 border-e px-4">Course Name</th>
            <th class="py-3 border-e px-4">Training Level</th>
            <th class="py-3 border-e px-4">Duration</th>
            <th class="py-3 border-e px-4">Software</th>
            <th class="py-3 border-e px-4">Status</th>
            <!-- <th class="py-3 border-e px-4 text-center">Action</th> -->
          </tr>
        </thead>

        <tbody>
          <tr v-if="trainingCourses.length === 0">
            <td colspan="7" class="text-center py-6 text-gray-400">No training courses found</td>
          </tr>
          <tr
            v-for="(course, index) in trainingCourses"
            :key="course.id"
            class="border-b border-gray-100 hover:bg-gray-50 transition"
          >
            <td class="py-3 border-e px-4">{{ index + 1 }}</td>
            <td class="py-3 border-e px-4 font-semibold">{{ course.title }}</td>
            <td class="py-3 border-e px-4">{{ course.training_level }}</td>
            <td class="py-3 border-e px-4">{{ course.duration }}</td>
            <td class="py-3 border-e px-4">{{ course.software?.name }}</td>
            <td class="py-3 border-e px-4">
              <span
                :class="[
                  'px-3 py-1 rounded-full text-xs font-semibold',
                  course.status == 0
                    ? 'bg-yellow-100 text-yellow-700'
                    : course.status == 1
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-red-100 text-red-700',
                ]"
              >
                {{ getStatusText(course.status) }}
              </span>
            </td>

            <td class="py-3 px-4 text-center flex justify-center gap-3">
              <button
                v-if="course.status === 0"
                @click="approveCourse(course)"
                class="px-3 py-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
              >
                Approve
              </button>
              <!-- <router-link
                v-if="course.id"
                :to="{ name: 'training_course_management-id', params: { id: course.id }, query: course }"
                class="px-3 py-1 text-white btn btn-info rounded-lg hover:bg-blue-100 transition"
                @click="viewDetails(course)"
              >
                View
              </router-link> -->
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="trainingCourses.length > 0 && meta" class="flex px-4 py-2 justify-between items-center mt-6">
        <div class="text-sm text-gray-600">
          Showing {{ trainingCourses.length }} of {{ meta.total }} records from {{ meta.from }} to {{ meta.to }}
        </div>
        <div class="bg-cyan-500 space-x-1 px-2 rounded-md py-1">
          <button
            v-for="link in meta.links"
            :key="link.label"
            class="p-3 btn btn-info rounded-md"
            :class="currentPage == link.page ? 'bg-blue-500 text-white' : 'bg-white text-blue-800'"
            @click="currentPage = link.page, getTrainingCourses(true)"
          >
            <p v-html="link.label"></p>
          </button>
        </div>
      </div>
    </div>

    <!-- Software List Table -->
    <div v-else class="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-100">
      <table class="min-w-full text-sm text-gray-700 table-zebra">
        <thead class="bg-emerald-600 text-white text-left">
          <tr>
            <th class="py-3 border-e px-4">#</th>
            <th class="py-3 border-e px-4">Software Name</th>
            <th class="py-3 border-e px-4">Number Of Training Courses</th>
            <th class="py-3 border-e px-4">View List</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(software, index) in softwareStats"
            :key="software.id"
            class="border-b border-gray-100 hover:bg-gray-50 transition"
          >
            <td class="py-3 border-e px-4">{{ index + 1 }}</td>
            <td class="py-3 border-e px-4 font-semibold">{{ software.software?.name }}</td>
            <td class="py-3 border-e px-4">{{ software.total }}</td>
            <td class="py-3 border-e px-4">
              <button
                class="btn btn-info text-white"
                @click="selectedSoftware = software.software_id, getTrainingCourses(true)"
              >
                View Courses
              </button>
            </td>
          </tr>

          <tr v-if="softwareStats.length === 0">
            <td colspan="4" class="text-center py-6 text-gray-400">No software found</td>
          </tr>
        </tbody>
      </table>
      <div v-if="softwareStats.length > 0 && meta" class="flex px-4 py-2 justify-between items-center mt-6">
        <div class="text-sm text-gray-600">
          Showing {{ softwareStats.length }} of {{ meta.total }} records from {{ meta.from }} to {{ meta.to }}
        </div>
        <div class="bg-cyan-500 space-x-1 px-2 rounded-md py-1">
          <button
            v-for="link in meta.links"
            :key="link.label"
            class="p-3 btn btn-info rounded-md"
            :class="currentPage == link.page ? 'bg-blue-500 text-white' : 'bg-white text-blue-800'"
            @click="currentPage = link.page, getTrainingCourses(false)"
          >
            <p v-html="link.label"></p>
          </button>
        </div>
      </div>
    </div>

    <!-- View Details Modal -->
    <div v-if="selectedCourse" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow-2xl w-[90%] sm:w-[500px] p-6 relative">
        <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-600" @click="selectedCourse = null">
          <i class="fa fa-times"></i>
        </button>

        <h2 class="text-xl font-bold text-emerald-700 mb-3">{{ selectedCourse.name }}</h2>
        <p><strong>Description:</strong> {{ selectedCourse.description }}</p>
        <p><strong>Duration:</strong> {{ selectedCourse.duration }}</p>
        <p><strong>Software:</strong> {{ selectedCourse.software?.name }}</p>
        <p><strong>Status:</strong> {{ getStatusText(selectedCourse.status) }}</p>
        <p class="mt-3 text-gray-700">{{ selectedCourse.notes || 'No additional notes' }}</p>
      </div>
    </div>

    <!-- Toast Message -->
    <div
      v-if="toastMessage"
      class="fixed bottom-6 right-6 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fadeIn"
    >
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup>
import api from '@/config/api'
import { ref, watch, onMounted } from 'vue'

const selectedCourse = ref()
const searchQuery = ref('')
const currentPage = ref(1)
const trainingCourses = ref([])
const softwareStats = ref([])
const meta = ref()
const selectedSoftware = ref("")
const softwares = ref([])
const toastMessage = ref('')

const getSoftwares = async () => {
  const { data } = await api().get('softwares')
  softwares.value = data.data
}

const getTrainingCourses = async (showCourses) => {
  try {
    let queryParams = ''
    
    if (showCourses) {
      // Show training courses for selected software
      let whereClause = `[{"column":"software_id","operator":"=","value":"${selectedSoftware.value}"}]`
      
      queryParams = `?per_page=20&page=${currentPage.value}&where=${whereClause}&with=software&search=${searchQuery.value}`
      
      const { data } = await api().get(`training-course${queryParams}`)
      trainingCourses.value = data.data.data
      meta.value = data.meta
    } else {
      // Show software statistics (grouped by software)
      queryParams = `?group_by=software_id&with=software`
      
      const { data } = await api().get(`training-course${queryParams}`)
      softwareStats.value = data.data
      
    }
  } catch (error) {
    console.error('Error fetching training courses:', error)
    toastMessage.value = 'Failed to load training courses'
    setTimeout(() => { toastMessage.value = '' }, 3000)
  }
}

const getStatusText = (status) => {
  const statusMap = {
    0: 'Pending',
    1: 'Active',
    2: 'Inactive'
  }
  return statusMap[status] || 'Unknown'
}

const approveCourse = async (course) => {
  try {
    await api().put(`training-course/${course.id}`, { status: 1 })
    course.status = 1
    toastMessage.value = 'Course approved successfully'
    setTimeout(() => { toastMessage.value = '' }, 3000)
  } catch (error) {
    console.error('Error approving course:', error)
    toastMessage.value = 'Failed to approve course'
    setTimeout(() => { toastMessage.value = '' }, 3000)
  }
}

const viewDetails = (course) => {
  selectedCourse.value = course
}

// --- Debounce utility ---
const debounce = (fn, delay = 500) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

// Watch searchQuery with debounce
watch(searchQuery, debounce(() => {
  currentPage.value = 1 // reset page on new search
  if (selectedSoftware.value) {
    getTrainingCourses(true)
  }
}, 500))

onMounted(() => {
  getSoftwares()
  getTrainingCourses(false)
})
</script>

<style scoped>
tr {
  transition: background-color 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
</style>