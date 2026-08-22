<template>
  <div class="min-h-screen w-5/6 bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
    <div class=" mx-auto">
      <div class="flex items-center gap-3 mb-6">
        <RouterLink to="/project_management/expenses" class="text-gray-400 hover:text-gray-600 transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </RouterLink>
        <div>
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/30">
              <span class="text-2xl">💰</span>
            </div>
            <div>
              <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Add Expense</h1>
              <p class="text-gray-500 text-sm">Record a new project expense</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
        <form @submit.prevent="saveExpense" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title <span class="text-red-500">*</span></label>
            <input type="text" v-model="form.title" required class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition" placeholder="Expense title">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Project <span class="text-red-500">*</span></label>
            <select v-model="form.project_id" required class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition">
              <option value="">Select project...</option>
              <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Amount ($) <span class="text-red-500">*</span></label>
            <input type="number" step="0.01" v-model="form.amount" required class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition" placeholder="e.g. 4200">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Date <span class="text-red-500">*</span></label>
            <input type="date" v-model="form.date" required class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition">
          </div>
          <div class="flex gap-3 pt-4 border-t border-gray-100">
            <RouterLink to="/project_management/expenses" class="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition text-center font-medium">Cancel</RouterLink>
            <button type="submit" class="flex-1 bg-gradient-to-r from-red-600 to-rose-600 text-white py-3 rounded-xl hover:from-red-700 hover:to-rose-700 transition shadow-lg shadow-red-500/30 font-medium">Add Expense</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const projects = ref([
  { id: 1, name: 'Aerospace Project Alpha' },
  { id: 2, name: 'Defense System Integration' }
])

const form = ref({
  title: '',
  project_id: '',
  amount: '',
  date: new Date().toISOString().split('T')[0]
})

const saveExpense = async () => {
  await new Promise(resolve => setTimeout(resolve, 800))
  router.push('/project_management/expenses')
}
</script>