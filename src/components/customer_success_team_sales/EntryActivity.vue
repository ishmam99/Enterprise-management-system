<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-6xl">
      <div class="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">

        <!-- Header -->
        <div class="bg-gradient-to-r from-indigo-600 to-indigo-800 px-6 py-5">
          <h1 class="text-2xl font-bold text-white">
            Log New Activity
          </h1>
          <p class="mt-1 text-indigo-100 text-sm">
            Record calls, meetings, emails, site visits, etc.
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="submitActivity" class="p-6 space-y-6">

          <!-- Activity Type -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
               Type <span class="text-red-500">*</span>
            </label>
            <select
              v-model="form.type"
              required
              class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 bg-white"
            >
              <option value="" disabled>Select type</option>
              <option>Summary of Activities</option>
              <option>Key Outcomes</option>
            </select>
          </div>

          <!-- Date -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Activity Date <span class="text-red-500">*</span>
            </label>
            <input
              type="date"
              v-model="form.date"
              required
              class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3"
            />
          </div>

          <!-- Activity Description (Rich Text) -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Activity Details / Notes <span class="text-red-500">*</span>
            </label>

            <div
              class="border border-gray-300 rounded-lg overflow-hidden
                     focus-within:border-indigo-500
                     focus-within:ring-1
                     focus-within:ring-indigo-500"
            >
              <QuillEditor
                v-model:content="form.activity"
                contentType="html"
                theme="snow"
                placeholder="Write details here... use bold, lists, bullet points etc."
                class="min-h-[180px]"
              />
            </div>
          </div>

          <!-- Submit -->
          <div class="flex justify-end pt-4">
            <button
              type="submit"
              :disabled="loading"
              class="inline-flex items-center px-6 py-3 rounded-lg
                     text-white bg-indigo-600 hover:bg-indigo-700
                     focus:outline-none focus:ring-2 focus:ring-offset-2
                     focus:ring-indigo-500 disabled:opacity-50"
            >
              <span v-if="loading">Saving...</span>
              <span v-else>Save Activity</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Message -->
      <div
        v-if="message"
        class="mt-6 text-center font-medium"
        :class="messageType === 'success' ? 'text-green-600' : 'text-red-600'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/config/api'

// Quill
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const route = useRoute()

const form = ref({
  type: '',
  date: new Date().toISOString().split('T')[0],
  activity: '', // HTML string
  customer_id: ''
})

const loading = ref(false)
const message = ref('')
const messageType = ref('')

const customerId = computed(() => route.params.name || '')

// Optional: load customer
const customer = ref(null)
const getCustomer = async (id) => {
  if (!id) return
  try {
    const res = await api().get(`/customers/${id}`)
    customer.value = res.data.data
  } catch (err) {
    console.error('Customer load failed', err)
  }
}

const submitActivity = async () => {
  loading.value = true
  message.value = ''

  try {
    await api().post('/monthly-csm-activity', {
      type: form.value.type,
      date: form.value.date,
      activity: form.value.activity, // HTML
      customer_id: customerId.value
    })

    form.value.type = ''
    form.value.activity = ''

    message.value = 'Activity recorded successfully!'
    messageType.value = 'success'
  } catch (error) {
    message.value =
      error.response?.data?.message || 'Failed to save activity'
    messageType.value = 'error'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getCustomer(customerId.value)
})
</script>

<style>
/* Make Quill blend nicely with Tailwind */
.ql-container {
  font-family: inherit;
  min-height: 160px;
}

.ql-editor {
  min-height: 160px;
  line-height: 1.6;
}
</style>
