<template>
  <SectionMain class="mx-10">
    <SectionTitleLineWithButton
      :icon="mdiAccountMultiplePlus"
      class="bg-green-500 py-3 rounded-2xl px-3 font-semibold text-white"
      title="Approved Expenses"
      main
    >
      <div class="text-left flex items-center mb-2">
        <p
          class="flex gap-1 items-center rounded-full ps-2 pr-3 py-1 cursor-pointer text-white bg-[#4653dd]"
          @click="goBack"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path
              d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20ZM12 11H16V13H12V16L8 12L12 8V11Z"
            ></path>
          </svg>
          Back
        </p>
      </div>
    </SectionTitleLineWithButton>

    <div class="space-y-4 mt-6">
      <div v-if="filteredExpenses.length > 0">
        <table class="w-full table-auto bg-white">
          <thead>
            <tr>
              <th class="border px-4 py-2">Title</th>
              <th class="border px-4 py-2">Description</th>
              <th class="border px-4 py-2">Amount</th>
              <th class="border px-4 py-2">File</th>
              <th class="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="expense in filteredExpenses" :key="expense.id">
              <td class="border px-4 py-2">{{ expense.title }}</td>
              <td class="border px-4 py-2">{{ expense.description }}</td>
              <td class="border px-4 py-2">{{ expense.amount }}</td>
              <td class="border px-4 py-2">
                <a v-if="expense.file" :href="expense.file" target="_blank" class="text-sm text-blue-500">View File</a>
                <span v-else>N/A</span>
              </td>
              <td class="border px-4 py-2">{{ expense.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="text-center py-10">No approved expenses available.</div>
    </div>
  </SectionMain>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import { mdiAccountMultiplePlus } from '@mdi/js'

import { useHRM } from '@/composables/useHRM'
import api from '@/config/api'
const router = useRouter()
const { hrmApi } = useHRM()
// Reactive variable to hold expenses data
const expenses = ref([])

// Reactive variable for filtered expenses
const filteredExpenses = ref([])

// Loading indicator (optional)
const loading = ref(false)

// Fetch Expenses from API
const fetchExpenses = async () => {
  loading.value = true
  try {
    const response = await hrmApi.get('expense') // Assuming API endpoint is 'expense'
    expenses.value = response.data.data // Set the expenses data

    // Filter expenses to only show those with status 1 (Approved)
    filteredExpenses.value = expenses.value.filter(expense => expense.status === 1)
  } catch (error) {
    $toast.error('Failed to fetch expenses!')
    console.error(error)
  }
  loading.value = false
}

// Call fetchExpenses when component is mounted
onMounted(() => {
  fetchExpenses()
})

// Go back to previous page
const goBack = () => {
  router.back()
}
</script>

<style scoped>
/* Flexbox layout for horizontal fields */
.flex-1 {
  flex: 1;
}

.flex {
  display: flex;
  gap: 20px; /* Spacing between each field */
}

.text-lg {
  font-size: 1.125rem;
}

.text-sm {
  font-size: 0.875rem;
}

/* Ensure text overflow is managed in case of long text */
.overflow-hidden {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
