<script setup>
import { ref, onMounted, reactive } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import api from '@/config/api'
import Breadcrumb from '@/components/Breadcrumb.vue'

const route = useRoute()
const moduleSlug = 1

const moduleData = ref(null)
const form = ref({})
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

const isLoading = ref(false)
const fetchFields = async () => {
     isLoading.value = true
   try {
     const { data } = await api().get('/crm/modules/1/fields')
     moduleData.value = data.data
   } catch (err) {
    console.error(err);
    alert('Failed to fetch fields');
  } finally {
    isLoading.value = false
  }
}
onMounted(async () => {
   await fetchFields ()
})
const loading = ref(false)
const saveRecord = async () => {
  loading.value = true
  try {
    // Convert form data to array of { field_id, value }
    const payload = moduleData.value.map(field => ({
      field_id: field.id,
      value: form.value[field.name] || null,
    }));

    const { data } = await api().post(`/crm/modules/${moduleSlug}/records`, {
      fields: payload,
    });

    showToast('Record created successfully!');
    form.value = {}; // reset form
  } catch (err) {
    console.error(err);
    alert('Failed to create record');
  } finally {
    loading.value = false
  }
}

</script>



<template>
 <div class="min-h-screen bg-gradient-to-br from-sky-100 via-indigo-100 to-pink-100 p-8 ">
   <Breadcrumb class="mb-2"/>
    <div v-if="isLoading" class="flex justify-center items-center min-h-[60vh]">
      <div class="flex flex-col items-center gap-3">
        <svg
          class="animate-spin h-10 w-10 text-indigo-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
        <p class="text-indigo-600 font-medium">Loading fields...</p>
      </div>
    </div>
   <div
    v-if="moduleData"
    class="flex flex-col items-center"
  >

    <div
      class="w-full  bg-white/60 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/40 p-8 transition-transform duration-300 hover:scale-[1.001]"
    >
      <h2
        class="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-500 to-pink-500 tracking-tight"
      >
        ✨ Create New Leads
      </h2>

     
      <div class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        <div
          v-for="field in moduleData"
          :key="field.id"
          class="flex flex-col bg-white/40 border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
        >
          <label class="block font-semibold mb-2 text-gray-700">
            {{ field.label }}
          </label>

          <input
            v-if="['text', 'email', 'number'].includes(field.type)"
            v-model="form[field.name]"
            :type="field.type"
            class="border border-slate-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all outline-none"
            :placeholder="`Enter ${field.label}`"
          />

          <select
            v-else-if="field.type === 'select'"
            v-model="form[field.name]"
            class="border border-slate-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all outline-none bg-white"
          >
            <option value="" disabled selected>Select {{ field.label }}</option>
            <option
              v-for="opt in field.options"
              :key="opt"
              :value="opt"
              class="capitalize"
            >
              {{ opt }}
            </option>
          </select>

          <input
            v-else-if="['date',].includes(field.type)"
            v-model="form[field.name]"
            :type="field.type"
            class="border border-slate-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all outline-none"
            :placeholder="`Enter ${field.label}`"
          />
        </div>
      </div>

      <button
  @click="saveRecord"
  :disabled="loading"
  class="bg-gradient-to-r w-1/2 from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition-all mt-6 block mx-auto disabled:opacity-70"
>
  <span v-if="loading" class="flex items-center gap-2 justify-center">
    <svg
      class="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      />
    </svg>
    Saving...
  </span>
  <span v-else>Save Record</span>
</button>

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
</style>
