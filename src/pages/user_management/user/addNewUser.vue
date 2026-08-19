<template>
  <div class="p-6 w-4/5 bg-gray-50 min-h-screen mx-auto">
    <!-- Header -->
    <p class="text-2xl font-bold bg-emerald-600 text-white text-center rounded-t-lg py-3 mb-6 shadow-md">
      ➕ Add New User
    </p>

    <!-- Form Card -->
    <div class="bg-white shadow-md rounded-xl p-8 border border-gray-100">
      <form @submit.prevent="submitForm" class="space-y-6">
        <!-- Row 1 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Enter full name"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="Enter email"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
          </div>
        </div>

        <!-- Row 2 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <select
              v-model="form.gender"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            >
              <option disabled value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
            <input
              v-model="form.dob"
              type="date"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
          </div>
        </div>

        <!-- Row 3 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              v-model="form.phone"
              type="text"
              placeholder="Enter phone number"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              v-model="form.status"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            >
              <option disabled value="">Select status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <!-- Row 4 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <textarea
            v-model="form.address"
            rows="3"
            placeholder="Enter full address"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
          ></textarea>
        </div>

        <!-- Row 5 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="Enter password"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            required
          />
        </div>

        <!-- Hidden Role -->
        <input type="hidden" v-model="form.role" value="user" />

        <!-- Action Buttons -->
        <div class="flex justify-end gap-4 pt-4">
          <button
            type="button"
            @click="resetForm"
            class="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Reset
          </button>

          <button
            type="submit"
            class="px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 shadow-md transition"
          >
            Save User
          </button>
        </div>
      </form>
    </div>

    <!-- Success Message -->
    <div
      v-if="successMessage"
      class="mt-6 bg-emerald-100 border border-emerald-300 text-emerald-700 px-4 py-3 rounded-lg shadow-sm text-center"
    >
      {{ successMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  gender: '',
  dob: '',
  phone: '',
  address: '',
  status: '',
  password: '',
  role: 'user', // default role
})

const successMessage = ref('')

const submitForm = () => {
  if (!form.value.name || !form.value.email || !form.value.dob || !form.value.gender || !form.value.password) {
    alert('Please fill all required fields.')
    return
  }

  console.log('New User Data:', form.value)
  successMessage.value = `✅ User "${form.value.name}" added successfully!`
  resetForm()
}

const resetForm = () => {
  form.value = {
    name: '',
    email: '',
    gender: '',
    dob: '',
    phone: '',
    address: '',
    status: '',
    password: '',
    role: 'user',
  }
}
</script>
