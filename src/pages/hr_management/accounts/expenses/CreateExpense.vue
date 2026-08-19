<template>
  <SectionMain class="mx-10">
    <!-- Title Bar Section -->
    <SectionTitleLineWithButton
      :icon="mdiAccountMultiplePlus"
      class="bg-green-500 py-3 rounded-2xl px-3 font-semibold text-white"
      title="Create Expense"
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

    <CardBox class="shadow-lg max-w-full mx-auto p-6 bg-white rounded-xl">
      <form @submit.prevent="submitExpense" class="space-y-6">
        <div class="flex space-x-8">
          <!-- Left Column -->
          <div class="flex-1">
            <div class="flex flex-col">
              <label for="expenseName" class="font-semibold text-lg">Expense Name</label>
              <input
                id="expenseName"
                v-model="expense.name"
                type="text"
                class="mt-2 p-3 border rounded-lg text-base"
                placeholder="Enter expense name"
                required
              />
            </div>

            <div class="flex flex-col">
              <label for="expenseAmount" class="font-semibold text-lg">Amount</label>
              <input
                id="expenseAmount"
                v-model="expense.amount"
                type="number"
                class="mt-2 p-3 border rounded-lg text-base"
                placeholder="Enter amount"
                required
              />
            </div>

            <div class="flex flex-col">
              <label for="expenseFile" class="font-semibold text-lg">File Upload</label>
              <input
                id="expenseFile"
                type="file"
                class="mt-2 p-3 border border-black rounded-lg text-base"
                @change="handleFileChange"
                required
              />
            </div>
          </div>

          <!-- Right Column -->
          <div class="flex-1">
            <div class="flex flex-col">
              <label for="expenseDescription" class="font-semibold text-lg">Description</label>
              <textarea
                id="expenseDescription"
                v-model="expense.description"
                class="mt-2 p-3 border rounded-lg text-base h-32"
                placeholder="Enter description"
                required
              ></textarea>
            </div>

            <div class="flex flex-col mt-3">
              <label for="expenseDate" class="font-semibold text-lg">Date</label>
              <input
                id="expenseDate"
                v-model="expense.date"
                type="date"
                class="mt-2 p-3 border rounded-lg text-base"
                required
              />
            </div>
          </div>
        </div>

        <!-- Centered Submit Button -->
        <div class="flex justify-center">
          <BaseButton
            type="submit"
            :label="'Submit Expense'"
            class="w-auto !bg-blue-500 hover:!bg-blue-400 text-white py-2 px-6 rounded-lg"
          />
        </div>
      </form>

      <!-- Loader -->
      <div v-if="loading" class="flex justify-center items-center mt-4">
        <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-4 border-blue-500"></div>
      </div>
    </CardBox>
  </SectionMain>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import BaseButton from '@/components/BaseButton.vue'

import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'

import { mdiAccountMultiplePlus } from '@mdi/js'
import { useHRM } from '@/composables/useHRM'

const router = useRouter()
const {hrmApi} = useHRM();
// Expense object as a JSON ref
const expense = ref({
  name: '',
  description: '',
  amount: '',
  date: '',
  file: null,
  type: '',
})

// Loading state for the submit button
const loading = ref(false)

// Handle file change
const handleFileChange = (event) => {
  expense.value.file = event.target.files[0]
}

const submitExpense = async () => {
  loading.value = true // Start the loader

  const expenseData = {
    title: expense.value.name,
    description: expense.value.description,
    amount: expense.value.amount,
    date: expense.value.date,
    file: expense.value.file,
    type: 'NA',
  }

  try {
    const response = await hrmApi.post('expense', expenseData)

    resetForm()  // This will clear the form
  } catch (error) {

    console.error(error)
  } finally {
    loading.value = false // Stop the loader after the process is complete
  }
}

const resetForm = () => {
  expense.value.name = ''
  expense.value.description = ''
  expense.value.amount = ''
  expense.value.date = ''
  expense.value.file = null
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
/* Ensure full width for SectionTitleLineWithButton */
.w-full {
  width: 100%;
}

/* Increasing the width of the form */
.max-w-full {
  max-width: 100%; /* Ensure form takes full width */
}

/* Layout of two columns */
.flex-1 {
  flex: 1;
}

.flex {
  display: flex;
}

.space-x-8 {
  margin-right: 2rem;
}

input, textarea, select {
  font-size: 1rem; /* Ensures consistent text size */
}

textarea {
  font-size: 1rem; /* Ensures consistent text size in textarea */
}

button {
  font-size: 1.1rem; /* Slightly bigger button text for better readability */
}

.card-box {
  border-radius: 10px;
}

/* Adjustments for the description box */
textarea {
  height: 8rem; /* Make the description box bigger */
  resize: vertical; /* Allow vertical resizing */
}

/* Adjustments for the submit button */
button {
  width: auto; /* Make the button fit its content */
  padding: 0.5rem 1.5rem; /* Make button smaller */
}

/* Centering the submit button */
.flex.justify-center {
  justify-content: center;
}

/* Title Bar Styles */
.bg-green-500 {
  background-color: #38a169; /* Customize green */
}

.text-2xl {
  font-size: 1.5rem; /* Increase title size */
}

/* Spinner styling for the loader */
.spinner-border {
  border-top-color: transparent;
  border-radius: 50%;
}
</style>

