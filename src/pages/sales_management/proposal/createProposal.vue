<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-pink-50 py-12 px-6">
    <Breadcrumb class="mb-6" />

    <div
      class="max-w-7xl mx-auto bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-white/40 transition-all hover:shadow-[0_0_50px_-10px_rgba(99,102,241,0.2)]"
    >
      <h2
        class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 text-center mb-10 tracking-tight"
      >
        Create Proposal
      </h2>

      <!-- Forwarding Letter -->
      <div class="mb-10">
        <label class="block text-gray-700 font-semibold mb-2">Forwarding Letter</label>
        <textarea
          v-model="form.forwarding_letter"
          rows="6"
          placeholder="Write your forwarding letter here..."
          class="w-full border border-gray-200 rounded-2xl p-4 focus:outline-none focus:ring-4 focus:ring-indigo-100 shadow-sm bg-white/60 backdrop-blur-sm transition-all"
        ></textarea>
      </div>

      <!-- Deal Info Section -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 bg-gradient-to-r from-indigo-50 via-teal-50 to-sky-50 border border-gray-100 rounded-2xl p-6 mb-10 shadow-inner"
      >
        <div
          v-for="(item, index) in dealInfo"
          :key="index"
          class="p-5 rounded-2xl bg-white/50 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-[2px] transition-all"
        >
          <p class="text-sm text-indigo-600 font-semibold mb-1">{{ item.label }}</p>
          <p class="text-gray-800 font-medium">{{ item.value || '—' }}</p>
        </div>
      </div>

      <!-- Proposal Amount -->
      <div class="mb-10">
        <label class="block text-gray-700 font-semibold mb-2">Proposal Amount</label>
        <input
          v-model="form.amount"
          type="number"
          placeholder="Enter proposal amount..."
          class="w-full border border-gray-200 rounded-2xl p-4 focus:outline-none focus:ring-4 focus:ring-indigo-100 shadow-sm bg-white/60 backdrop-blur-sm transition-all"
        />
      </div>

      <!-- Terms and Conditions -->
      <section class="mb-10">
        <h3 class="text-lg font-semibold text-gray-700 mb-3">Terms and Conditions</h3>
        <div class="flex gap-3 mb-4">
          <input
            v-model="newTerm"
            type="text"
            placeholder="Enter a term..."
            class="flex-1 border border-gray-200 rounded-xl p-3 bg-white/70 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-indigo-100 transition"
          />
          <button
            @click="addTerm"
            class="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl shadow-md hover:shadow-lg hover:scale-[1.03] transition"
          >
            Add
          </button>
        </div>

        <ul class="space-y-2">
          <li
            v-for="(term, index) in form.terms"
            :key="index"
            class="flex justify-between items-center bg-white/70 px-4 py-2.5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
          >
            <span class="text-gray-700">{{ index + 1 }}. {{ term }}</span>
            <button
              @click="removeTerm(index)"
              class="text-red-500 hover:text-red-600 transition text-sm font-medium"
            >
              Remove
            </button>
          </li>
        </ul>
      </section>

      <!-- Special Terms -->
      <section class="mb-10">
        <h3 class="text-lg font-semibold text-gray-700 mb-3">Special Terms and Conditions</h3>
        <div class="flex gap-3 mb-4">
          <input
            v-model="newSpecial"
            type="text"
            placeholder="Enter a special condition..."
            class="flex-1 border border-gray-200 rounded-xl p-3 bg-white/70 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-pink-100 transition"
          />
          <button
            @click="addSpecial"
            class="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl shadow-md hover:shadow-lg hover:scale-[1.03] transition"
          >
            Add
          </button>
        </div>

        <ul class="space-y-2">
          <li
            v-for="(special, index) in form.special_terms"
            :key="index"
            class="flex justify-between items-center bg-white/70 px-4 py-2.5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
          >
            <span class="text-gray-700">{{ index + 1 }}. {{ special }}</span>
            <button
              @click="removeSpecial(index)"
              class="text-red-500 hover:text-red-600 transition text-sm font-medium"
            >
              Remove
            </button>
          </li>
        </ul>
      </section>

      <!-- Submit Button -->
      <div class="text-center mt-10">
        <button
          @click="saveProposal"
          :disabled="loading"
          class="relative inline-flex items-center justify-center bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 text-white font-semibold rounded-2xl px-10 py-3 shadow-md hover:shadow-lg hover:scale-[1.03] transition disabled:opacity-60"
        >
          <span v-if="loading" class="absolute left-5 animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
          <span>{{ loading ? 'Saving...' : 'Save Proposal' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/config/api'
import Breadcrumb from '@/components/Breadcrumb.vue'

const route = useRoute()
const loading = ref(false)
const newTerm = ref('')
const newSpecial = ref('')

const form = ref({
  forwarding_letter: '',
  amount: '',
  terms: [],
  special_terms: []
})

const dealInfo = computed(() => [
  { label: 'Deal Name', value: route.query.deal_name },
  { label: 'Software Area', value: route.query.service_area_name },
  { label: 'Software Name', value: route.query.software_name },
  { label: 'Industry', value: route.query.industry_name },
  { label: 'Service Type', value: route.query.service_type }
])

const addTerm = () => {
  if (newTerm.value.trim()) {
    form.value.terms.push(newTerm.value)
    newTerm.value = ''
  }
}
const removeTerm = (index) => form.value.terms.splice(index, 1)

const addSpecial = () => {
  if (newSpecial.value.trim()) {
    form.value.special_terms.push(newSpecial.value)
    newSpecial.value = ''
  }
}
const removeSpecial = (index) => form.value.special_terms.splice(index, 1)

const saveProposal = async () => {
  loading.value = true
  try {
    const payload = {
      parent_id: route.query.parent_id,
      ...form.value,
      deal_name: route.query.deal_name,
      software_name: route.query.software_name,
      industry_name: route.query.industry_name,
      service_type: route.query.service_type,
      service_area_name: route.query.service_area_name
    }

    await api().post('/crm/proposal-create', payload)
    alert('✅ Proposal created successfully!')
  } catch (err) {
    console.error(err)
    alert('❌ Failed to create proposal')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
textarea {
  resize: none;
}
</style>
