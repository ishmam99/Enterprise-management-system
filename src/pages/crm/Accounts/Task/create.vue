<script setup>
import { ref, onMounted, reactive } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import api from '@/config/api'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { useAuthStore } from '@/stores/AuthStore'

const route = useRoute()
const authStore = useAuthStore()
authStore.sidebarOpen = true
const toast = reactive({
  show: false,
  message: '',
  type: 'success'
})


const priorities = ['Low', 'Medium', 'High']

const form = reactive({
  title: '',
  description: '',
  deadline: '',
    priority: '',
})

const submitTask = () => {
  const payload = { ...form }
  console.log('Create Task Payload:', payload)

  // await api.post('/tasks', payload)
}

const showToast = (message, type = 'success') => {
  toast.show = true
  toast.message = message
  toast.type = type
  setTimeout(() => (toast.show = false), 3000)
}
</script>



<template>
 <div class=" min-h-screen bg-gradient-to-br from-sky-100 via-indigo-100 to-pink-100 p-8 ">
   <Breadcrumb class="mb-2"/>
    <!-- Show loader when fetching fields -->
  <div class="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-zinc-100 py-10 rounded-lg">
    <div class="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-10">
      
      <!-- Header -->
      <div class="flex items-start justify-between mb-8">
        <div>
          <h1 class="text-2xl md:text-3xl font-semibold text-gray-800">
            Create Task
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            Define task details, deadline and priority
          </p>
        </div>

        <span class="px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
          Task
        </span>
      </div>

      <!-- Form -->
      <form @submit.prevent="submitTask" class="space-y-6">

        <!-- Title -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            v-model="form.title"
            type="text"
            placeholder="e.g. Design CRM dashboard"
            class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            v-model="form.description"
            rows="4"
            placeholder="Write task details..."
            class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>

        <!-- Deadline & Priority -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <!-- Deadline -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Deadline
            </label>
            <input
              v-model="form.deadline"
              type="date"
              class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

         <!-- Priority -->
<div>
  <label class="block text-sm font-medium text-gray-700 mb-1">
    Priority
  </label>

  <select
    v-model="form.priority"
    class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm
           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
    required
  >
    <option disabled value="">Select priority</option>
    <option value="Low">Low</option>
    <option value="Medium">Medium</option>
    <option value="High">High</option>
  </select>
</div>
        </div>

        <!-- Divider -->
        <div class="pt-4 border-t"></div>

        <!-- Actions -->
        <div class="flex justify-end gap-4">
          <button
            type="button"
            class="px-6 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            class="px-8 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition"
          >
            Create Task
          </button>
        </div>

      </form>
    </div>
  </div>
  <transition name="fade">
      <div
        v-if="toast.show"
        class="fixed bottom-6 right-6 px-5 py-6 rounded-xl shadow-lg text-white text-sm font-medium animate-fadeIn"
        :class="toast.type == 'success' ? 'bg-green-500' : 'bg-red-500'"
      >
        {{ toast.message }}
      </div>
    </transition>
 </div>
</template>

<style scoped>
/* Smooth fade-in effect */
div[ v-if="moduleData" ] {
  animation: fadeIn 0.6s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.form-label {
  @apply block text-sm font-semibold text-gray-700 mb-2;
}

.form-input {
  @apply w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition;
}

.form-textarea {
  @apply w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition resize-none;
}

.priority-btn {
  @apply py-3 rounded-xl text-sm font-semibold transition;
}
</style>
