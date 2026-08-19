<template>
  <div class="p-6 w-4/5 bg-gray-50 min-h-screen mx-auto">
    <!-- Header -->
    <p class="text-2xl font-bold bg-emerald-600 text-white text-center rounded-t-lg py-3 mb-6 shadow-md">
      🧩 Current Quarter List
    </p>
   <div class="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-100">


      <table class="table table-zebra min-w-full divide-y divide-gray-200">
        <thead class="bg-emerald-600 text-white ">
          <tr >
            <th class="px-4 py-3 border border-e border-gray-100 text-left text-sm font-bold ">Deal ID</th>
            <th class="px-4 py-3 border border-e border-gray-100 text-left text-sm font-bold ">Customer Name</th>
            <th class="px-4 py-3 border border-e border-gray-100 text-left text-sm font-bold ">Start Date</th>
            <th class="px-4 py-3 border border-e border-gray-100 text-left text-sm font-bold">End Date</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="deal in deals" :key="deal.id" class="hover:bg-gray-50">
            <td class="px-4 py-3 text-sm border border-e border-gray-200 text-gray-700">{{ deal.id }}</td>
            <td class="px-4 py-3 text-sm border border-e border-gray-200 text-gray-700">{{ deal.customer }}</td>
            <td class="px-4 py-3 text-sm border border-e border-gray-200 text-gray-700">{{ deal.start }}</td>
            <td class="px-4 py-3 text-sm border border-e border-gray-200 text-gray-700">{{ deal.end }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>


</template>

<script setup>
import { ref } from 'vue'

const deals = ref([
  { id: 'D-001', customer: 'John Doe', start: '2025-01-10', end: '2025-02-10' },
  { id: 'D-002', customer: 'Sarah Connor', start: '2025-02-01', end: '2025-04-01' },
  { id: 'D-003', customer: 'Michael Smith', start: '2025-03-15', end: '2025-06-15' },
  { id: 'D-004', customer: 'Emma Watson', start: '2025-01-20', end: '2025-02-20' },
  { id: 'D-005', customer: 'Robert Brown', start: '2025-04-05', end: '2025-08-05' }
])
</script>

<style scoped>
</style>
