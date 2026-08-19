<template>
  <div class="min-h-screen w-full bg-gradient-to-br from-emerald-50 to-white py-10 px-4">
    <!-- Container -->
    <div class=" mx-16">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl sm:text-4xl font-bold text-emerald-700 mb-2">
          ➕ Add New Customer
        </h1>
        <p class="text-gray-600 text-sm sm:text-base">
          Fill out the form below to create a new Customer account.
        </p>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 transition hover:shadow-xl">
        <form @submit.prevent="submitForm" class="space-y-8">
          <!-- Row 1 -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Enter full name"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                v-model="form.email"
                type="email"
                placeholder="Enter email"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 outline-none transition"
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
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white text-gray-800 focus:ring-2 focus:ring-emerald-500 outline-none transition"
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
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-emerald-500 outline-none transition"
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
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 outline-none transition"
              />
            </div>

          </div>

          <!-- Address -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <textarea
              v-model="form.address"
              rows="3"
              placeholder="Enter full address"
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 outline-none resize-none transition"
            ></textarea>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              v-model="form.password"
              type="password"
              placeholder="Enter password"
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 outline-none transition"
              required
            />
          </div>

          <!-- Hidden Role -->
          <input type="hidden" v-model="form.role" value="user" />

          <!-- Buttons -->
          <div class="flex flex-col sm:flex-row justify-end gap-4 pt-6">
            <button
              type="button"
              @click="resetForm"
              class="w-full sm:w-auto px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
            >
              Reset
            </button>
            <button
              type="submit"
              class="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-lg shadow-md hover:bg-emerald-700 transition"
            >
              Save Customer
            </button>
          </div>
        </form>
      </div>

      <!-- Success Message -->
      <transition name="fade">
        <div
          v-if="successMessage"
          class="mt-8 bg-emerald-100 border border-emerald-300 text-emerald-700 px-4 py-3 rounded-lg shadow-sm text-center animate-fadeIn"
        >
          {{ successMessage }}
        </div>
      </transition>
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

  password: '',
  role: 'user',
})

const successMessage = ref('')

const submitForm = async() => {
  if (!form.value.name || !form.value.email || !form.value.dob || !form.value.gender || !form.value.password) {
    alert('⚠️ Please fill all required fields.')
    return
    }
    const response = await api().post('customers',form.value)
    if(response)
    successMessage.value = `✅ Customer "${form.value.name}" added successfully!`
  resetForm()

  setTimeout(() => {
    successMessage.value = ''
  }, 3000)
}

const resetForm = () => {
  form.value = {
    name: '',
    email: '',
    gender: '',
    dob: '',
    phone: '',
    address: '',

    password: '',
    role: 'user',
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
