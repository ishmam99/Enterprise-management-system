<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
    <div class="">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Request for a Free Demonstration
        </h1>
        <p class="text-sm text-gray-600">
          Please Submit Your Details Information
        </p>
      </div>

      <!-- Contact Form -->
      <div class="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mx-[350px] ">
        <!-- Form Header -->
        <div class="bg-[#0b294b] text-white py-6 px-8">
          <h2 class="text-2xl font-bold">Contact Information</h2>
          <p class="text-blue-200 mt-2 text-sm">Fill out the form below and we'll get back to you shortly</p>
        </div>


    <!-- Form Content -->
<form class="p-8 text-sm" @submit.prevent="submitForm">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    <!-- First Name -->
    <div>
      <label for="firstName" class="block text-sm font-semibold text-gray-700 mb-2">
        First Name *
      </label>
      <input
        id="firstName"
        v-model="form.firstName"
        type="text"
        placeholder="Your Name"
        class="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 placeholder:text-gray-400"
        required
      />
    </div>

    <!-- Last Name -->
    <div>
      <label for="lastName" class="block text-sm font-semibold text-gray-700 mb-2">
        Last Name *
      </label>
      <input
        id="lastName"
        v-model="form.lastName"
        type="text"
        placeholder="Your Last Name"
        class="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 placeholder:text-gray-400"
        required
      />
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    <!-- Email -->
    <div>
      <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
        Email *
      </label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        placeholder="Your Email"
        class="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 placeholder:text-gray-400"
        required
      />
    </div>

    <!-- Phone No -->
    <div>
      <label for="phone" class="block text-sm font-semibold text-gray-700 mb-2">
        Phone No *
      </label>
      <input
        id="phone"
        v-model="form.phone"
        type="tel"
        placeholder="Your Phone No"
        class="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 placeholder:text-gray-400"
        required
      />
    </div>
  </div>

  <!-- Company Name -->
  <div class="mb-6">
    <label for="company" class="block text-sm font-semibold text-gray-700 mb-2">
      Company Name *
    </label>
    <input
      id="company"
      v-model="form.company"
      type="text"
      placeholder="Your Company Name"
      class="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 placeholder:text-gray-400"
      required
    />
  </div>

  <!-- Address -->
  <div class="mb-6">
    <label for="address" class="block text-sm font-semibold text-gray-700 mb-2">
      Address *
    </label>
    <textarea
      id="address"
      v-model="form.address"
      rows="2"
      placeholder="Address with City and State"
      class="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 resize-none placeholder:text-gray-400"
      required
    ></textarea>
  </div>

  <!-- Description -->
  <div class="mb-8">
    <label for="description" class="block text-sm font-semibold text-gray-700 mb-2">
      Description *
    </label>
    <textarea
      id="description"
      v-model="form.description"
      rows="4"
      placeholder="Please describe your requirements or any specific needs"
      class="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 resize-none placeholder:text-gray-400"
      required
    ></textarea>
  </div>

  <!-- Submit Button -->
  <div class="flex justify-center">
    <button
      type="submit"
      class="bg-[#0b294b] hover:bg-blue-800 text-white font-semibold py-4 px-12 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg text-sm"
    >
      <span class="flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        Submit Request
      </span>
    </button>
  </div>
</form>

      </div>

      <!-- Additional Info -->
      <div class="mt-8 text-center text-gray-600">
        <p class="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Your information is secure and will never be shared with third parties
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  address: '',
  description: ''
})

const submitForm = () => {
  // Handle form submission here
  console.log('Form submitted:', form.value)
  // You can add API call or form processing logic here
  alert('Thank you for your request! We will contact you shortly.')

  // Reset form
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    description: ''
  }
}
</script>

<style scoped>
/* Custom styles for better form appearance */
input:focus, textarea:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}
</style>
