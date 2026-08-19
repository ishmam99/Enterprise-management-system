<template>
  <div class="container mx-auto p-4">
    <div class="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-4 rounded-t-2xl shadow-md">
      <h1 class="text-2xl font-semibold">CSTMR Training Offer</h1>
    </div>

    <div class="bg-white p-6 rounded-b-2xl shadow-md mt-2">
      <table class="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead class="bg-gray-100">
          <tr>
            <th class="py-3 px-4 text-left">#</th>
            <th class="py-3 px-4 text-left">Training Name</th>
            <th class="py-3 px-4 text-left">Duration</th>
            <th class="py-3 px-4 text-left">Trainer</th>
            <th class="py-3 px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(training, index) in trainings" :key="training.id" class="border-b hover:bg-gray-50">
            <td class="py-3 px-4">{{ index + 1 }}</td>
            <td class="py-3 px-4">{{ training.name }}</td>
            <td class="py-3 px-4">{{ training.duration }}</td>
            <td class="py-3 px-4">{{ training.trainer }}</td>
            <td class="py-3 px-4 text-center">
              <button
                @click="openPopup(training)"
                class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-sm transition-all duration-200"
              >
                Offer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Offer Popup -->
    <div
      v-if="showPopup"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white rounded-2xl shadow-2xl w-96 p-6 relative">
        <h2 class="text-xl font-semibold text-gray-800 mb-4 text-center">
          Offer Training
        </h2>

        <div class="mb-4">
          <label class="block text-gray-600 text-sm font-medium mb-1">Training</label>
          <p class="text-gray-800 font-medium">{{ selectedTraining.name }}</p>
        </div>

        <div class="mb-4">
          <label class="block text-gray-600 text-sm font-medium mb-1">Trainer</label>
          <p class="text-gray-800 font-medium">{{ selectedTraining.trainer }}</p>
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <button
            @click="showPopup = false"
            class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            @click="confirmOffer"
            class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
          >
            Confirm Offer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showPopup = ref(false)
const selectedTraining = ref({})
const trainings = ref([
  { id: 1, name: 'CSTMR Customer Service 101', duration: '2 Days', trainer: 'Ms. Salma' },
  { id: 2, name: 'CSTMR Complaint Handling', duration: '3 Days', trainer: 'Mr. Kamal' },
  { id: 3, name: 'CSTMR Advanced Techniques', duration: '4 Days', trainer: 'Dr. Nabila' }
])

const openPopup = (training) => {
  selectedTraining.value = training
  showPopup.value = true
}

const confirmOffer = () => {
  alert(`Training "${selectedTraining.value.name}" has been offered.`)
  showPopup.value = false
}
</script>
