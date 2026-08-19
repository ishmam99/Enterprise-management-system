<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold text-gray-800">Companies</h1>
      <button
        @click="openCreateModal"
        class="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition"
      >
        + Create Company
      </button>
    </div>

    <!-- Table Card -->
    <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 border-b">
          <tr class="text-left text-gray-600">
            <!-- <th class="px-4 py-3">ID</th> -->
            <th class="px-4 py-3">Name</th>
            <th class="px-4 py-3">Email</th>
            <th class="px-4 py-3">Phone</th>
            <th class="px-4 py-3">Created</th>
          </tr>
        </thead>

        <tbody>
          <!-- Loading -->
          <tr v-if="loading">
            <td colspan="5" class="text-center py-8 text-gray-500">
              Loading companies...
            </td>
          </tr>

          <!-- Empty -->
          <tr v-else-if="!companies.length">
            <td colspan="5" class="text-center py-10 text-gray-400">
              No companies found
            </td>
          </tr>

          <!-- Data -->
          <tr
            v-for="company in companies"
            :key="company.id"
            class="border-b last:border-0 hover:bg-gray-50"
          >
            <!-- <td class="px-4 py-3">{{ company.id }}</td> -->
            <td class="px-4 py-3 font-medium text-gray-800">
              {{ company.name }}
            </td>
            <td class="px-4 py-3">{{ company.email }}</td>
            <td class="px-4 py-3">{{ company.phone }}</td>
            <td class="px-4 py-3 text-gray-500">
              {{ formatDate(company.created_at) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div
      v-if="meta.last_page > 1"
      class="flex items-center justify-between"
    >
      <p class="text-sm text-gray-500">
        Page {{ meta.current_page }} of {{ meta.last_page }}
      </p>

      <div class="flex gap-2">
        <button
          :disabled="meta.current_page === 1"
          @click="fetchCompanies(meta.current_page - 1)"
          class="px-3 py-1.5 rounded-md border text-sm disabled:opacity-50"
        >
          Previous
        </button>

        <button
          :disabled="meta.current_page === meta.last_page"
          @click="fetchCompanies(meta.current_page + 1)"
          class="px-3 py-1.5 rounded-md border text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      @click.self="closeModal"
    >
      <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold">Create Company</h2>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <label class="text-sm text-gray-600">Company Name</label>
            <input
              v-model="form.name"
              required
              class="w-full mt-1 px-3 py-2 rounded-lg border focus:ring focus:ring-primary/20"
            />
          </div>

          <div>
            <label class="text-sm text-gray-600">Email</label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full mt-1 px-3 py-2 rounded-lg border focus:ring focus:ring-primary/20"
            />
          </div>

          <div>
            <label class="text-sm text-gray-600">Phone</label>
            <input
              v-model="form.phone"
              required
              class="w-full mt-1 px-3 py-2 rounded-lg border focus:ring focus:ring-primary/20"
            />
          </div>

          <div class="flex justify-end gap-2 pt-4">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              :disabled="submitting"
              class="px-4 py-2 rounded-lg bg-primary text-white disabled:opacity-60"
            >
              {{ submitting ? 'Creating...' : 'Create' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const companies = ref([])
const loading = ref(false)
const submitting = ref(false)
const showModal = ref(false)

const meta = ref({
  current_page: 1,
  last_page: 1,
  per_page: 10,
  total: 0
})

const form = ref({
  name: '',
  email: '',
  phone: ''
})

const fetchCompanies = async (page = 1) => {
  loading.value = true
  try {
    const { data } = await api().get(
      `/companies?page=${page}&per_page=${meta.value.per_page}`
    )
    companies.value = data.data.data
    meta.value = data.data
  } finally {
    loading.value = false
  }
}

const submitForm = async () => {
  submitting.value = true
  try {
    await api().post('/companies', form.value)
    closeModal()
    resetForm()
    fetchCompanies(1)
  } finally {
    submitting.value = false
  }
}

const openCreateModal = () => (showModal.value = true)
const closeModal = () => (showModal.value = false)

const resetForm = () => {
  form.value = { name: '', email: '', phone: '' }
}

const formatDate = (date) =>
  new Date(date).toLocaleDateString()

onMounted(fetchCompanies)
</script>
