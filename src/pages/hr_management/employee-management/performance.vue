<template>
  <SectionMain class="mx-10">
    <!-- Header with Back Button -->
    <SectionTitleLineWithButton
      :icon="mdiPoll"
      title="Employee Performance List"
      class="bg-cyan-500 py-3 rounded-2xl px-3 font-semibold text-white"
      main
    >
      <div class="flex items-center mb-2">
        <button
          class="flex gap-1 items-center rounded-full ps-2 pr-3 py-1
                 text-white bg-[#4653dd] hover:bg-[#3b47c6]"
          @click="goBack"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="currentColor"
          >
            <path
              d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20ZM12 11H16V13H12V16L8 12L12 8V11Z"
            />
          </svg>
          Back
        </button>
      </div>
    </SectionTitleLineWithButton>

<CardBox class="w-full overflow-x-auto">
  <table class="w-full border-collapse">
    <thead>
      <tr class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <th class="px-4 py-3 text-left text-sm font-semibold">
          Employee ID
        </th>
        <th class="px-4 py-3 text-left text-sm font-semibold">
          Employee Name
        </th>
        <th class="px-4 py-3 text-left text-sm font-semibold">
          Working On
        </th>
        <th class="px-4 py-3 text-center text-sm font-semibold">
          Status
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="(time, index) in timeCard"
        :key="time.id"
        class="border-b last:border-none
               hover:bg-indigo-50
               transition"
        :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
      >
        <td class="px-4 py-3 text-sm text-gray-700 font-medium">
          {{ time.Employeeid }}
        </td>

        <td class="px-4 py-3 text-sm text-gray-800">
          {{ time.name }}
        </td>

        <td class="px-4 py-3 text-sm text-gray-600">
          {{ time.workingOn }}
        </td>

        <td class="px-4 py-3 text-center">
          <span
            class="inline-flex items-center px-3 py-1 rounded-full
                   text-xs font-semibold"
            :class="statusClass(time.Status)"
          >
            {{ time.Status }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</CardBox>

  </SectionMain>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { mdiPoll } from '@mdi/js'

import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import CardBox from '@/components/CardBox.vue'

const router = useRouter()

const goBack = () => {
  router.back()
}

const timeCard = ref([
  {
    id: 1,
    Employeeid: '001',
    name: 'Mohammad',
    workingOn: 'Employee Dashboard Project',
    Status: 'Ongoing'
  },
  {
    id: 2,
    Employeeid: '002',
    name: 'Abdullah',
    workingOn: 'HR Management System',
    Status: 'Ongoing'
  },
  {
    id: 3,
    Employeeid: '003',
    name: 'Rahim',
    workingOn: 'Attendance Module',
    Status: 'Completed'
  },
  {
    id: 4,
    Employeeid: '004',
    name: 'Karim',
    workingOn: 'Payroll Integration',
    Status: 'Pending'
  }
])

const statusClass = (status) => {
  if (status === 'Completed') return 'bg-green-100 text-green-700'
  if (status === 'Pending') return 'bg-yellow-100 text-yellow-700'
  return 'bg-blue-100 text-blue-700'
}

onMounted(() => {
  // future API call goes here
})
</script>
