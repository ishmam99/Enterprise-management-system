<template>
  <div class="p-6 w-4/5 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 min-h-screen mx-auto">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        All Training Offers List
      </h1>
      <p class="text-gray-600 mt-2">Review Training Offers</p>
    </div>

    <!-- Search & Filter -->
    <div class="flex flex-col md:flex-row gap-4 mb-8">
      <div class="relative flex-1 max-w-md">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name or email..."
          class="w-full pl-12 pr-6 py-3 rounded-xl border border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition"
        />
        <i class="fas fa-search absolute left-4 top-4 text-purple-400"></i>
      </div>

      <!-- <select
        v-model="selectedIndustry"
        @change="getTraining()"
        class="px-6 py-3 rounded-xl border border-purple-200 bg-white focus:ring-4 focus:ring-purple-100 outline-none"
      >
        <option value="">All Industries</option>
        <option v-for="industry in industries" :key="industry.id" :value="industry.id">
          {{ industry.name }}
        </option>
      </select> -->
    </div>

    <!-- Table Card -->
    <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <tr>
              <th class="py-4 px-6 text-left">#</th>
              <th class="py-4 px-6 text-left">Training Course Name</th>
              <th class="py-4 px-6 text-left">Trainer Name</th>
              <th class="py-4 px-6 text-left">Industry</th>
              <th class="py-4 px-6 text-left">Solution</th>
              <th class="py-4 px-6 text-left">Software</th>
              <th class="py-4 px-6 text-center">Duration</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="(training, index) in customers"
              :key="training.id"
              class="hover:bg-purple-50 transition-all duration-200"
            >
              <td class="py-5 px-6 font-medium">{{ index + 1 }}</td>
              <td class="py-5 px-6">
                <div class="font-semibold text-gray-800">{{ training.event?.training_course.title }}</div>
              </td>
              <td class="py-5 px-6 text-gray-600">{{ training.event?.trainer?.user?.name }}</td>
              <td class="py-5 px-6 text-gray-600">{{training.event?.training_course?.industry?.name }}</td>
              <td class="py-5 px-6">
                {{training.event?.training_course?.solution?.name }}
              </td>
              <td class="py-5 px-6">
                {{training.event?.training_course?.software?.name }}
              </td>
              <td class="py-5 px-6 text-center">
              <div class="badge badge-info px-2 text-white"> Start : {{ training.start_date }}</div>
              <div class="badge badge-error px-2 text-white"> End : {{ training.end_date }}</div>
              </td>
            </tr>

            <!-- Empty State -->
            <tr v-if="customers.length === 0">
              <td colspan="7" class="text-center py-16 text-gray-400 text-lg">
                <i class="fas fa-inbox text-5xl mb-4 block"></i>
                No pending customer requests found
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="meta && customers.length > 0" class="bg-gray-50 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="text-sm text-gray-600">
          Showing {{ meta.from }} - {{ meta.to }} of {{ meta.total }} records
        </div>
        <div class="flex gap-2">
          <button
            v-for="link in meta.links"
            :key="link.label"
            @click="currentPage = link.page || currentPage; getTraining()"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition',
              link.active
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                : 'bg-white text-purple-700 border border-purple-300 hover:bg-purple-50',
            ]"
            v-html="link.label"
          />
        </div>
      </div>
    </div>

    <!-- Success Toast -->
    <div
      v-if="toastMessage"
      class="fixed bottom-8 right-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce-in z-50"
    >
      <i class="fas fa-check-circle text-2xl"></i>
      <span class="font-semibold">{{ toastMessage }}</span>
    </div>
  </div>
</template>

<script setup>
import api from '@/config/api'
import { _ } from 'numeral'
import { ref, watch, onMounted } from 'vue'

const searchQuery = ref('')
const currentPage = ref(1)
const customers = ref([])
const meta = ref(null)
const selectedIndustry = ref('')
const toastMessage = ref('')
const industries = ref([])
// Fetch customers (only pending ones + optional industry filter)
const getTraining = async () => {
  let industryFilter = ''
  if (selectedIndustry.value) {
    industryFilter = `&industry_id=${selectedIndustry.value}}`
  }

  try {
    const { data } = await api().get(
      `training-offer?with=event.trainer.user,event.trainingCourse.software,event.trainingCourse.industry,event.trainingCourse.solution${industryFilter}&per_page=20&page=${currentPage.value}&search=${encodeURIComponent(searchQuery.value)}`
    )
    customers.value = data.data.data
    meta.value = data.data
  } catch (err) {
    console.error(err)
  }
}

// Debounced search
const debounce = (fn, delay = 500) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}

watch(searchQuery, debounce(() => {
  currentPage.value = 1
  getTraining()
}, 500))
onMounted(() => {

  getTraining()
})
</script>

<style scoped>
.animate-bounce-in {
  animation: bounceIn 0.6s ease-out;
}

@keyframes bounceIn {
  0% { opacity: 0; transform: scale(0.3); }
  50% { opacity: 1; transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); }
}
</style>
