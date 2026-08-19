<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-2xl font-semibold mb-6">
      Create Activity Report
    </h1>

    <form @submit.prevent="submit" class="space-y-6">

      <!-- Success Team -->
      <div>
        <label class="block text-sm font-medium mb-1">
          Success Team
        </label>
        <select
          v-model="form.success_team_id"
          class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
        >
          <option value="" disabled>Select team</option>
          <option
            v-for="team in successTeams"
            :key="team.id"
            :value="team.id"
          >
            {{ team.name }}
          </option>
        </select>
        <p v-if="errors.success_team_id" class="text-red-500 text-sm mt-1">
          {{ errors.success_team_id }}
        </p>
      </div>

      <!-- Period -->
      <div>
        <label class="block text-sm font-medium mb-1">
          Period
        </label>

        <div class="grid grid-cols-2 gap-3">
          <select v-model="month" class="border rounded-lg px-3 py-2">
            <option value="" disabled>Month</option>
            <option v-for="m in months" :key="m">{{ m }}</option>
          </select>

          <select v-model="year" class="border rounded-lg px-3 py-2">
            <option value="" disabled>Year</option>
            <option v-for="y in years" :key="y">{{ y }}</option>
          </select>
        </div>

        <p v-if="errors.period" class="text-red-500 text-sm mt-1">
          {{ errors.period }}
        </p>
      </div>

      <!-- Status -->
      <div>
        <label class="block text-sm font-medium mb-1">
          Status
        </label>
        <select
          v-model="form.status"
          class="w-full border rounded-lg px-3 py-2"
        >
          <option :value="0">Draft</option>
          <option :value="1">Submitted</option>
          <option :value="2">Approved</option>
        </select>
      </div>

      <!-- Actions -->
      <div class="flex gap-3">
        <button
          type="submit"
          :disabled="loading"
          class="bg-primary text-white px-5 py-2 rounded-lg hover:opacity-90 disabled:opacity-60"
        >
          {{ loading ? 'Creating...' : 'Create Report' }}
        </button>

        <button
          type="button"
          @click="$router.back()"
          class="border px-5 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>

      <p v-if="serverError" class="text-red-600 text-sm">
        {{ serverError }}
      </p>
    </form>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/AuthStore'
import { ref, computed, onMounted } from 'vue'

const loading = ref(false)
const errors = ref({})
const serverError = ref('')
const authStore = useAuthStore()
const successTeams = ref([])

const form = ref({
  success_team_id: authStore.team_id,
  status: 0
})

const month = ref('')
const year = ref('')

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i)

const period = computed(() => {
  if (!month.value || !year.value) return ''
  return `${month.value}-${year.value}`
})

onMounted(async () => {
  const { data } = await api().get('/my-success-team')
  successTeams.value = data.data.data ?? []
})

const submit = async () => {
  errors.value = {}
  serverError.value = ''

  if (!period.value) {
    errors.value.period = 'Please select month and year'
    return
  }

  loading.value = true

  try {
    await api().post('/success-team-activity-reports', {
      success_team_id: form.value.success_team_id,
      period: period.value,
      status: form.value.status
    })

    // redirect after success
    window.$toast?.success('Activity report created')
    history.back()

  } catch (e) {
    if (e.response?.status === 422) {
      errors.value = e.response.data.errors || {}
      serverError.value = e.response.data.message || ''
    } else {
      serverError.value = 'Something went wrong'
    }
  } finally {
    loading.value = false
  }
}
</script>
