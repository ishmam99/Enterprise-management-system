<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8">
      
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Non-Disclosure Agreement (NDA)</h1>
        <p class="text-gray-500 text-sm mt-2">Please review and sign this agreement</p>
      </div>

      <!-- Parties -->
      <div class="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Disclosing Party</label>
          <input v-model="form.disclosing" type="text" class="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Receiving Party</label>
          <input v-model="form.receiving" type="text" class="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>

      <!-- Agreement Content -->
      <div class="space-y-4 text-gray-700 text-sm leading-relaxed mb-6">
        <p>
          This Non-Disclosure Agreement ("Agreement") is entered into between the Disclosing Party and the Receiving Party.
        </p>

        <p>
          The Receiving Party agrees to keep all confidential information strictly confidential and not disclose it to any third party without prior written consent.
        </p>

        <p>
          Confidential information includes, but is not limited to, business plans, technical data, trade secrets, and proprietary information.
        </p>

        <p>
          This Agreement shall remain in effect for a period of:
        </p>
      </div>

      <!-- Duration -->
      <div class="mb-6">
        <input v-model="form.duration" type="text" placeholder="e.g. 2 years" class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500" />
      </div>

      <!-- Signature -->
      <div class="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Disclosing Party Signature</label>
          <input v-model="form.sign1" type="text" class="mt-1 w-full border rounded-lg p-2" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Receiving Party Signature</label>
          <input v-model="form.sign2" type="text" class="mt-1 w-full border rounded-lg p-2" />
        </div>
      </div>

      <!-- Date -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700">Date</label>
        <input v-model="form.date" type="date" class="mt-1 w-full border rounded-lg p-2" />
      </div>

      <!-- Actions -->
      <div class="flex justify-between">
        <button @click="resetForm" class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
          Reset
        </button>
        <button @click="submitForm" class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Submit Agreement
        </button>
      </div>

      <!-- Output -->
      <div v-if="submitted" class="mt-8 p-4 bg-green-100 text-green-700 rounded-lg">
        Agreement submitted successfully!
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  disclosing: '',
  receiving: '',
  duration: '',
  sign1: '',
  sign2: '',
  date: ''
})

const submitted = ref(false)

const submitForm = () => {
  if (!form.disclosing || !form.receiving) {
    alert('Please fill required fields')
    return
  }
  submitted.value = true
}

const resetForm = () => {
  form.disclosing = ''
  form.receiving = ''
  form.duration = ''
  form.sign1 = ''
  form.sign2 = ''
  form.date = ''
  submitted.value = false
}
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}
</style>
