<template>
  <div class="p-6 min-h-screen w-4/5 bg-gray-50">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-3 sm:mb-0">
        👥 User Skill List
      </h1>

      <!-- Search -->
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search users..."
          class="pl-10 pr-4 py-2 w-72 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition"
        />
        <i class="fa fa-search absolute left-3 top-3 text-gray-400"></i>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100">
      <table class="min-w-full text-sm text-gray-700 table-zebra">
        <thead class="bg-emerald-600 text-white text-left">
          <tr>
            <th class="py-3 border-e px-4">#</th>
            <th class="py-3 border-e px-4">Name</th>
            <th class="py-3 border-e px-4">Email</th>
            <th class="py-3 border-e px-4">Skill</th>

          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, index) in filteredUsers"
            :key="user.id"
            class="border-b border-gray-100 hover:bg-gray-50 transition"
          >
            <td class="py-3 border-e px-4">{{ index + 1 }}</td>
            <td class="py-3 border-e px-4 font-semibold">{{ user.name }}</td>
            <td class="py-3 border-e px-4">{{ user.email }}</td>
            <td class="py-3 border-e px-4 capitalize">{{ user.skill }}</td>


          </tr>
          <tr v-if="filteredUsers.length === 0">
            <td colspan="6" class="text-center py-6 text-gray-400">No users found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')

const users = ref([
  { id: 1, name: 'Rais Ahmed', email: 'rais@hitechsoftsys.com', skill: 'Communication Skills' },
  { id: 2, name: 'Nafis Hasan', email: 'nafis@hitechsoftsys.com', skill: 'Problem-Solving' },
  { id: 3, name: 'Ayesha Rahman', email: 'ayesha@hitechsoftsys.com', skill: 'Time Management' },
  { id: 4, name: 'Tariq Hossain', email: 'tariq@hitechsoftsys.com', skill: 'Adaptability' },
  { id: 5, name: 'Rais Ahmed', email: 'rais@hitechsoftsys.com', skill: 'Team Work' },

])

const filteredUsers = computed(() => {
  return users.value.filter(user =>
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>

<style scoped>
/* Optional subtle animations */
tr {
  transition: background-color 0.2s ease;
}
</style>
