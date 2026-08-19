<template>
  <div class="p-6 w-full space-y-6">
    <!-- Header -->
    <div class="flex items-center bg-violet-500 py-3 px-5 rounded-md  justify-between mb-6">
      <h1 class="text-2xl font-semibold text-white">Apply for new Training Course</h1>
    </div>

    <!-- Card -->
    <div class="bg-white shadow grid grid-cols-3 rounded-2xl p-6 space-x-6">
      <!-- Industry -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Industry</label>
        <select v-model="form.industry" @change="onChange" class="w-full border rounded-lg px-3 py-2">
          <option value="" disabled>Select Industry</option>
          <option v-for="i in industries" :key="i.id" :value="i">{{ i.name }}</option>
        </select>
      </div>

      <!-- Solution -->
      <div >
        <label class="block text-sm font-medium text-gray-700 mb-1">Solution</label>
        <select v-model="form.solution" @change="onChange" class="w-full border rounded-lg px-3 py-2">
          <option value="" disabled>Select Solution</option>
          <option v-for="s in solutions" :key="s.id" :value="s">{{ s.name }}</option>
        </select>
      </div>

      <!-- Software -->
      <div >
        <label class="block text-sm font-medium text-gray-700 mb-1">Software</label>
        <select v-model="form.software" @change="onChange" class="w-full border rounded-lg px-3 py-2">
          <option value="" disabled>Select Software</option>
          <option v-for="sw in softwares" :key="sw.id" :value="sw">{{ sw.name }}</option>
        </select>
      </div>


    </div>

    <div class="flex justify-end">
      <button @click="getCourses()" class="px-5 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700">
       Get Training Course
      </button>
    </div>
    <table class="table table-auto w-full border-collapse border border-gray-200">
          <thead class="bg-teal-50">
            <tr>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">ID</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Course Title</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Industry</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Solution</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Software</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Level</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Duration</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Status</th>
              <th class="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="training in courses"
              :key="training.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="border border-gray-300 px-4 py-3 text-gray-600">{{ training.id }}</td>
              <td class="border border-gray-300 px-4 py-3">
                <div class="font-medium text-gray-900">{{ training.title }}</div>
                <div class="text-sm text-gray-500">{{ training.course_code }}</div>
              </td>
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ training.industry.name }}
              </td>
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ training.solution.name }}
              </td>
              <td class="border border-gray-300 px-4 py-3 text-gray-600">
                {{ training.software.name }}
              </td>
                <td class="border border-gray-300 px-4 py-3">
              <span
                class="px-2 py-1 rounded-full text-xs font-medium capitalize"
                :class="{
                  'bg-blue-100 text-blue-800': training.training_level === 'Basic' || training.training_level === 'basic',
                  'bg-yellow-100 text-yellow-800': training.training_level === 'intermediate' || training.training_level === 'Intermidiate',
                  'bg-red-100 text-red-800': training.training_level === 'advanced' || training.training_level === 'Advance'
                }"
              >
                {{ training.training_level }}
              </span>
            </td>
              <td class="border border-gray-300 px-4 py-3 text-gray-600 capitalize">
                {{ training.duration}}
              </td>

              <td class="border border-gray-300 px-4 py-3">
              <span
                class="px-2 py-1 rounded-full text-xs font-medium capitalize"
                :class="{
                  'bg-yellow-100 text-yellow-800': training.status == 0,
                  'bg-green-100 text-green-800': training.status == 1,
                  'bg-red-100 text-blue-800': training.status == 2,
                  'bg-red-100 text-red-800': training.status == 3
                }"
              >
                {{ training.status == 0 ? 'pending' : training.status == 1 ? 'approved' : training.status == 2 ? 'posted' : 'rejected'  }}
              </span>
            </td>
              <td class="border border-gray-300 px-4 py-3">
                <div class="flex gap-2">


                  <!-- View Details -->
                  <button
                    @click="viewDetails(training)"
                    class="btn btn-info btn-sm rounded-lg text-white"
                  >
                    View Details
                  </button>

                  <!-- Delete Button -->
                   <div v-if="checkCourse(training.id)" class="btn btn-success btn-sm rounded-lg text-white">
                      Applied <i class="ri-check-double-fill"></i>
                   </div>
                  <button
                   v-else
                    @click="applyToCourse(training)"
                    class="btn btn-error btn-sm rounded-lg text-white bg-red-600 border-red-600"
                    :disabled="applying === training.id"
                  >
                    <svg v-if="applying === training.id" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v4m0 12v4m8-8h-4M6 12H2"></path>
                    </svg>
                    <span v-else>Apply</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
  </div>
</template>

<script setup>
import api from '@/config/api'
import { useAuthStore } from '@/stores/AuthStore'
import Swal from 'sweetalert2'
import { onMounted, ref } from 'vue'

const auth = useAuthStore()
const industries = ref([])
const solutions = ref([])
const softwares = ref([])
const courses = ref([])
const myCourses = ref([])
const form = ref({
  industry: '',
  solution: '',
  software: ''
})
const applying = ref()

const getMySoftwares = async()=>{
  const {data} = await   api().get('/software-level?status=1')
  industries.value = data.data.map(e=>e.industry)
  solutions.value = data.data.map(e=>e.solution)
  softwares.value = data.data.map(e=>e.software)
  console.log(industries.value)
}
const getCourses = async() => {
  const {data} = await api().get('training-course',
  {
    params :{
    software_id:form.value.software,
    solution_id:form.value.solution,
    industry_id:form.value.industry,
    with:'software,solution,industry'
  }
})
courses.value = data.data
console.log(courses.value)
}
const applyToCourse = async(training) => {
try{  applying.value = training.id
  const response = await api().post('trainer-course',{
   items:[ {trainer_id : auth.user.id,
    training_course_id : training.id}]
  })
  if(response)
  {
    applying.value = null
     Swal.fire({
      title: 'Applied!',
      text: 'You have applied to the course successfully.',
      icon: 'success',
      timer: 1500,
    })
  }
}
catch(error)
{
   Swal.fire({
      title: 'Error!',
      text: 'Failed to apply to the course.',
      icon: 'error'
    })
}
}
const checkCourse = (id) => {

  let found =  myCourses.value.find(e=>e == id)

  if(found)
  return true
  else
  return false
}
const getMyCourses = async() => {
  const {data} = await api().get('trainer-course?trainer_id='+auth.user.id)
  myCourses.value = data.data.map(e=>e.training_course.id)
  console.log(myCourses.value )
}
onMounted(()=>{
  getMySoftwares()
  getMyCourses()
})
</script>

<style scoped>
</style>
