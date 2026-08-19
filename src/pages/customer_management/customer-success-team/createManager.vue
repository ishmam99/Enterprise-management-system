<template>
  <div class="min-h-screen w-full bg-gradient-to-br from-emerald-50 to-white py-10 px-4">
    <!-- Container -->
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl sm:text-4xl font-bold text-emerald-700 mb-2">
          ➕ Add New Customer Success Manager
        </h1>
        <p class="text-gray-600 text-sm sm:text-base">
          Fill out the form below to create a new Customer Success Manager account.
        </p>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
        <form @submit.prevent="submitForm" class="space-y-8">

          <!-- Row 1 -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Enter full name"
                class="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                v-model="form.email"
                type="email"
                placeholder="Enter email"
                class="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
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
                class="w-full border rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
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
                class="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                required
              />
            </div>
          </div>

          <!-- Phone -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              v-model="form.phone"
              type="text"
              placeholder="Enter phone number"
              class="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <!-- Address -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <textarea
              v-model="form.address"
              rows="3"
              placeholder="Enter full address"
              class="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
            ></textarea>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              v-model="form.password"
              type="password"
              placeholder="Enter password"
              class="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
          </div>

          <!-- Hidden Role -->
          <input type="hidden" v-model="form.role" />

          <!-- Buttons -->
          <div class="flex flex-col sm:flex-row justify-end gap-4 pt-4">
            <button
              type="button"
              @click="resetForm"
              class="px-6 py-2.5 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Reset
            </button>

            <button
              type="submit"
              :disabled="loading"
              class="px-6 py-2.5 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 disabled:opacity-60"
            >
              {{ loading ? 'Saving...' : 'Save Manager' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Success Message -->
      <transition name="fade">
        <div
          v-if="successMessage"
          class="mt-6 bg-emerald-100 border border-emerald-300 text-emerald-700 px-4 py-3 rounded-lg text-center"
        >
          {{ successMessage }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/config/api'

const loading = ref(false)
const successMessage = ref('')

const form = ref({
  name: '',
  email: '',
  gender: '',
  dob: '',
  phone: '',
  address: '',
  password: '',
  role: 'customer-success-manager'
})

const submitForm = async () => {
  if (!form.value.name || !form.value.email || !form.value.gender || !form.value.dob || !form.value.password) {
    alert('⚠️ Please fill all required fields.')
    return
  }

  loading.value = true

  try {
    await api().post('customer-success-managers', form.value)

    successMessage.value = `✅ "${form.value.name}" added successfully!`
    resetForm()

    setTimeout(() => {
      successMessage.value = ''
    }, 3000)

  } catch (error) {
    console.error(error)
    alert('❌ Failed to create Customer Success Manager')
  } finally {
    loading.value = false
  }
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
    role: 'customer-success-manager'
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
