<template>
  <div class="container mx-auto p-4">
    <div class="bg-green-700 text-white px-6 py-4 rounded-t-2xl shadow-md mb-4">
      <h1 class="text-2xl font-semibold">Onsite Events List</h1>
    </div>

    <div class="bg-white rounded-b-2xl shadow-md overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">#</th>
            <th class="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">Title</th>
            <th class="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">Location</th>
            <th class="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">Date</th>
            <th class="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">Duration</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(event, index) in events" :key="event.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 text-sm text-gray-900">{{ index + 1 }}</td>
            <td class="px-6 py-4 text-sm text-gray-900 font-medium">{{ event.title }}</td>
            <td class="px-6 py-4 text-sm text-gray-900">{{ event.location }}</td>
            <td class="px-6 py-4 text-sm text-gray-900">{{ event.date }}</td>
            <td class="px-6 py-4 text-sm text-gray-900">{{ event.duration }}</td>
          </tr>

          <tr v-if="!events.length">
            <td colspan="5" class="px-6 py-4 text-center text-gray-500">
              No onsite events found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const events = ref([])

const mockEvents = [
  { id: 1, title: 'Onsite MSC Training', location: 'Dhaka Office', date: '2025-11-25', duration: '2 Days' },
  { id: 2, title: 'HTSS Practical Session', location: 'Chittagong Office', date: '2025-11-28', duration: '1 Day' },
  { id: 3, title: 'Customer Workshop', location: 'Khulna Office', date: '2025-12-01', duration: '1 Day' }
]

onMounted(() => {
  events.value = mockEvents
})
</script>
