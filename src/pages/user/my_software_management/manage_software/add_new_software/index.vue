<script setup>
import { ref } from 'vue'

const softwareOptions = [
  'Actran',
  'CAEfatigue',
  'Cradle CFD',
  'MSC Apex',
  'Marc',
  'Patran',
  'MSC Nastran',
  'MSC CoSim'
]

const form = ref({
  software: '',
  startDate: '',
  expirationDate: ''
})

const handleSubmit = () => {
  console.log('Form submitted:', form.value)
  // Add your form submission logic here
}
</script>

<template>
  <div class="px-4 bg-white py-5 w-3/4 mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6 bg-teal-700 text-white px-6 py-4">
      <h1 class="text-2xl font-semibold">Add New Software</h1>

    </div>





      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Software Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Select Software</label>
          <select
            v-model="form.software"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>Select software</option>
            <option v-for="software in softwareOptions" :key="software" :value="software">
              {{ software }}
            </option>
          </select>
        </div>

        <!-- Start Date -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
          <input
            type="date"
            v-model="form.startDate"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
        </div>

        <!-- Expiration Date -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Expiration Date</label>
          <input
            type="date"
            v-model="form.expirationDate"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
        </div>

        <!-- Save Button -->
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Save
        </button>
      </form>
    </div>

</template>
