<template>
  <div class="min-h-screen bg-gradient-to-br from-sky-100 via-indigo-100 to-pink-100 p-8">
    <!-- <Breadcrumb class="mb-4" /> -->

    <div class="max-w-5xl mx-auto bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-10">

      <h2 class="text-3xl font-bold text-center mb-6 text-indigo-600">
        Assign User
      </h2>

      <div class="space-y-4">
        <input v-model="form.name" type="text" placeholder="Name"
          class="input" />

        <input v-model="form.email" type="email" placeholder="Email"
          class="input" />

        <select v-model="form.module" class="input">
          <option value="" disabled>Select Module</option>
          <option value="crm">CRM</option>
          <option value="sales">Sales</option>
          <option value="marketing">Marketing</option>
        </select>

        <select v-model="form.role" class="input">
          <option value="" disabled>Select Role</option>
          <option value="director">Director</option>
          <option value="manager">Manager</option>
          <option value="executive">Executive</option>
        </select>

        <input v-model="form.password" type="password" placeholder="Password"
          class="input" />

        <button
          @click="saveUser"
          :disabled="loading"
          class="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-70"
        >
          {{ loading ? 'Creating...' : 'Create User' }}
        </button>
      </div>
    </div>

    <!-- Toast -->
    <transition name="fade">
      <div
        v-if="toast.show"
        class="fixed bottom-6 right-6 px-5 py-4 rounded-xl text-white shadow-lg"
        :class="toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'"
      >
        {{ toast.message }}
      </div>
    </transition>
  </div>
</template>


<script setup>
import { ref, reactive } from 'vue'
import api from '@/config/api'
import Breadcrumb from '@/components/Breadcrumb.vue'

const loading = ref(false)

const form = ref({
  name: '',
  email: '',
  module: '',
  role: '',
  password: ''
})

const toast = reactive({
  show: false,
  message: '',
  type: 'success'
})

const showToast = (message, type = 'success') => {
  toast.show = true
  toast.message = message
  toast.type = type
  setTimeout(() => (toast.show = false), 3000)
}

const saveUser = async () => {
  loading.value = true
  try {
    const moduleRole = `${form.value.module}-${form.value.role}`

    await api().post('/register', {
      name: form.value.name,
      email: form.value.email,
      role: moduleRole,  
      password: form.value.password
    })

    showToast('User created successfully')
    form.value = {
      name: '',
      email: '',
      module: '',
      role: '',
      password: ''
    }
  } catch (err) {
    console.error(err)
    showToast(
      err?.response?.data?.message || 'Failed to create user',
      'error'
    )
  } finally {
    loading.value = false
  }
}

</script>
<style scoped>
.input {
  @apply w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
