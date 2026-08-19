<template>
  <div class="p-6 w-4/5 bg-gray-50 min-h-screen mx-auto">
    <!-- Header -->
    <p class="text-2xl font-bold bg-emerald-600 text-white text-center rounded-t-lg py-3 mb-6 shadow-md">
      🎤 Upcoming Training
    </p>

    <!-- Search & Filter -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div class="relative w-full sm:w-1/3 mb-4 sm:mb-0">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search seminars..."
          class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
        />
        <i class="fa fa-search absolute left-3 top-3 text-gray-400"></i>
      </div>

      <select
        v-model="filterStatus"
        class="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
      >
        <option value="">All</option>
        <option value="ongoing">Ongoing</option>
        <option value="upcoming">Upcoming</option>
      </select>
    </div>

    <!-- Seminar Table -->
    <div class="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-100">
      <table class="min-w-full text-sm text-gray-700 table-zbra">
        <thead class="bg-emerald-600 text-white text-left">
          <tr>
            <th class="py-3 border-e px-4">#</th>
            <th class="py-3 border-e px-4">Title</th>
            <th class="py-3 border-e px-4">Speaker</th>
            <th class="py-3 border-e px-4">Date</th>
            <th class="py-3 border-e px-4">Time</th>
            <th class="py-3 border-e px-4">Status</th>
            <th class="py-3 border-e px-4 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(seminar, index) in filteredSeminars"
            :key="seminar.id"
            class="border-b border-gray-100 hover:bg-gray-50 transition"
          >
            <td class="py-3 border-e px-4">{{ index + 1 }}</td>
            <td class="py-3 border-e px-4 font-semibold">{{ seminar.title }}</td>
            <td class="py-3 border-e px-4">{{ seminar.speaker }}</td>
            <td class="py-3 border-e px-4">{{ seminar.date }}</td>
            <td class="py-3 border-e px-4">{{ seminar.time }}</td>
            <td class="py-3 border-e px-4">
              <span
                :class="[
                  'px-3 py-1 rounded-full text-xs font-semibold',
                  seminar.status === 'ongoing'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-yellow-100 text-yellow-700',
                ]"
              >
                {{ seminar.status }}
              </span>
            </td>
            <td class="py-3 px-4 text-right">
              <button
                class="text-emerald-600 hover:text-emerald-800 font-semibold"
                @click="viewDetails(seminar)"
              >
                View
              </button>
            </td>
          </tr>

          <tr v-if="filteredSeminars.length === 0">
            <td colspan="7" class="text-center py-6 text-gray-400">No seminars found</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Seminar Modal -->
    <div
      v-if="selectedSeminar"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl shadow-2xl w-[90%] sm:w-[500px] p-6 relative">
        <button
          class="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          @click="selectedSeminar = null"
        >
          <i class="fa fa-times"></i>
        </button>

        <h2 class="text-xl font-bold text-emerald-700 mb-3">{{ selectedSeminar.title }}</h2>
        <p><strong>Speaker:</strong> {{ selectedSeminar.speaker }}</p>
        <p><strong>Date:</strong> {{ selectedSeminar.date }}</p>
        <p><strong>Time:</strong> {{ selectedSeminar.time }}</p>
        <p><strong>Status:</strong> {{ selectedSeminar.status }}</p>
        <p class="mt-3 text-gray-700">{{ selectedSeminar.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const filterStatus = ref('')
const selectedSeminar = ref(null)

const seminars = ref([
  {
    id: 1,
    title: 'Modern AI and Future Workflows',
    speaker: 'Rasik Ahmed',
    date: '2025-12-18',
    time: '10:00 AM',
    status: 'upcoming',
    description: 'Exploring AI-based automations in modern workplaces and coding practices.',
  },
  {
    id: 2,
    title: 'Advanced Web Security Techniques',
    speaker: 'Nafis Hasan',
    date: '2026-1-25',
    time: '3:00 PM',
    status: 'upcoming',
    description: 'Learn how to secure your web apps with modern authentication and encryption strategies.',
  },
  {
    id: 3,
    title: 'Scaling Vue 3 Applications',
    speaker: 'Tariq Hossain',
    date: '2026-2-14',
    time: '11:00 AM',
    status: 'upcoming',
    description: 'Tips and techniques for building scalable and maintainable Vue 3 applications.',
  },
])

const filteredSeminars = computed(() => {
  return seminars.value.filter(s =>
    (filterStatus.value ? s.status === filterStatus.value : true) &&
    (s.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
     s.speaker.toLowerCase().includes(searchQuery.value.toLowerCase()))
  )
})

const viewDetails = (seminar) => {
  selectedSeminar.value = seminar
}
</script>

<style scoped>
tr {
  transition: background-color 0.2s ease;
}
</style>
