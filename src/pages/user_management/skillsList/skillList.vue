<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import Swal from 'sweetalert2'

// Reactive state
const loading1 = ref(false)
const loading = ref(false)
const skills = ref([])
const searchQuery = ref('')
const currentPage = ref(1)
const sortBy = ref('job_name')
const sortOrder = ref('asc')
const softwares = ref([])
const selectedSoftware = ref("")
const loadingSoftwares = ref(false)
const perPage = ref(10)
// Methods
const fetchskills = async () => {
  loading.value = true
  try {

    const { data } = await api().get(`software-skills?page=${currentPage.value}&${searchQuery.value?'search='+searchQuery.value+'&':''}${selectedSoftware.value?'software_id='+selectedSoftware.value+'&':''}with=software&per_page=${perPage.value}`)
    // skills.value = data.data.filter(e => e.status == 2)

    skills.value = data
  } catch (error) {
    showError('Failed to load skills', error.message)
  } finally {
    loading.value = false
  }
}

const approveSkill = async (bid) => {
  try {
    const result = await Swal.fire({
      title: 'Approve Skill?',
      html: `Are you sure you want to approve <strong>"${bid.job_name}"</strong>?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Approve!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#6b7280'
    })

    if (!result.isConfirmed) return

    // API call would go here:
    // await api().post(`update-status/${bid.id}`, { status: 3 })

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))

    // Remove from list
    skills.value = skills.value.filter(item => item.id !== bid.id)

    await Swal.fire({
      icon: 'success',
      title: 'Skill Approved!',
      text: `"${bid.job_name}" has been approved successfully.`,
      showConfirmButton: false,
      timer: 2000
    })

  } catch (error) {
    showError('Approval Failed', error.response?.data?.message || error.message)
  }
}

const approveAllSkills = async () => {
  if (!skills.value.length) return

  try {
    const result = await Swal.fire({
      title: 'Approve All Skills?',
      html: `Are you sure you want to approve all <strong>${skills.value.length}</strong> pending skills?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes, Approve All!`,
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#6b7280'
    })

    if (!result.isConfirmed) return

    loading.value = true

    // API call for bulk approval would go here
    // await api().post('bulk-approve-skills', {
    //   ids: skills.value.map(bid => bid.id)
    // })

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Clear all skills
    skills.value = []

    await Swal.fire({
      icon: 'success',
      title: 'All Skills Approved!',
      showConfirmButton: false,
      timer: 2000
    })

  } catch (error) {
    showError('Bulk Approval Failed', error.message)
  } finally {
    loading.value = false
  }
}

const showError = (title, message) => {
  Swal.fire({
    icon: 'error',
    title,
    text: message,
    confirmButtonColor: '#10b981'
  })
}
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
  fetchskills()
}, 500))

const toggleSort = (field) => {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = field
    sortOrder.value = 'asc'
  }
}
const getSoftwares =async() => {
  const {data} =await api().get('softwares')
  softwares.value = data.data
  console.log(data)
}
// Lifecycle
onMounted(async()=>{
  loading1.value = true
  loadingSoftwares.value = true
 await getSoftwares()
 await fetchskills()
 loading1.value = false
 loadingSoftwares.value = false
})
</script>

<template>
  <div class="container mx-auto bg-fuchsia-100 p-4 ">
    <!-- Header -->
    <div class="bg-pink-500 text-white p-6 mb-6 rounded-lg shadow-md">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold mb-2">All Software Skills List</h1>
          <p class="text-fuchsia-100">View , search all software skills from this list</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="bg-fuchsia-600 px-3 py-1 rounded-full text-sm font-medium">
            Total Softwares: {{ softwares.length}}
          </span>
          <span class="bg-fuchsia-600 px-3 py-1 rounded-full text-sm font-medium">
            Total Skills: {{ skills.total}}
          </span>
          <!-- <button
            v-if="skills.length > 0"
            @click="approveAllSkills"
            class="btn btn-success text-white"
            :disabled="loading"
          >
            Approve All
          </button> -->
        </div>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="bg-white p-4 rounded-lg shadow-md mb-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search skills..."
            class="input input-bordered ring w-full"
          />
        </div>
        <div class="flex gap-2">
           <label class="block text-sm font-semibold text-gray-700 mb-2">
            Filter By Software
            </label>
            <select
              v-model="selectedSoftware"

              class="select select-bordered w-full rounded-xl border-2 px-3 py-1 leading-[1.6] outline transition-all duration-200 ease-linear focus:border-fuchsia-500"
              required
              :disabled="loadingSoftwares" @change="fetchskills()"
            >
              <option value="" >All Software</option>
              <option v-for="software in softwares" :key="software.id" :value="software.id">
                {{ software.name }}
              </option>
            </select>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading1" class="flex justify-center p-12">
      <div class="text-center">
        <span class="loading loading-spinner loading-lg text-fuchsia-600 mb-4"></span>
        <p class="text-gray-600">Loading inital data...</p>
      </div>
    </div>

    <!-- Skills Table -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr class="bg-fuchsia-500 text-white">
               <th class="p-4 text-left font-semibold ">Software Name</th> <th class="p-4 text-left font-semibold">Skill Name</th>

              <th class="p-4 text-left font-semibold ">Details</th>
            </tr>
          </thead>
          <tbody :class="loading?'blur-sm':''">
            <tr
              v-for="skill in skills?.data?.data"
              :key="skill.id"
              class="border-b hover:bg-gray-50 transition-colors"
            >
             <td class="p-4">
                  <div class="font-medium text-gray-900">{{ skill.software.name }}</div>

              </td>  <td class="p-4">
                <div class="font-medium text-gray-900">{{ skill.name }}</div>

              </td>

              <td class="p-4">
                  <div class="font-medium text-gray-900"><button class="btn btn-info">view</button></div>

              </td>
            </tr>
            <tr v-if="!skills?.data?.data?.length">
              <td colspan="2" class="p-8 text-center">
                <div class="text-gray-500">
                  <template v-if="searchQuery">
                    No skills found matching "{{ searchQuery }}"
                  </template>
                  <template v-else>
                    No pending skills found
                  </template>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="skills?.data?.data?.length > 0 && skills" class="flex px-4 py-2 justify-between items-center mt-6">
        <div class="text-sm text-gray-600">
          Showing {{ skills?.data?.length  }} of {{ skills?.data?.total }} records from {{ skills.data?.from }} to {{ skills?.data?.to }}
        </div>
        <div class=" bg-cyan-500 space-x-1 px-2 rounded-md py-1">

          <button v-for="link in skills?.data?.links" :key="link.label" class="p-3 btn btn-info rounded-md" :class="currentPage == link.page ? 'bg-blue-500 text-white':'bg-white text-blue-800'" @click="currentPage = link.page,fetchskills()"><p v-html="link.label"></p></button>

        </div>
      </div>
      </div>
    </div>
  </div>
</template>
