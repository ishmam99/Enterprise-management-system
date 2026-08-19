<template>
  <div class="p-6 min-h-screen w-4/5 bg-gray-50">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-3 sm:mb-0">
        👥 Skill List
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
            <th class="py-3 border-e px-4">Skill Name</th>
            <th class="py-3 border-e px-4">Description</th>

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
            <td class="py-3 border-e px-4">{{ user.description }}</td>



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
  { id: 1, name: 'Communication Skills', description: 'The ability to clearly express ideas, listen actively, and adapt your message for different audiences. It’s key in teamwork, leadership, and customer relations.' },
  { id: 2, name: 'Problem-Solving', description: 'The skill of identifying issues, analyzing possible solutions, and implementing the best one. It shows creativity and critical thinking in handling challenges.' },
  { id: 3, name: 'Time Management', description: 'Organizing and prioritizing tasks effectively to meet deadlines and increase productivity. It helps reduce stress and improve work quality.' },
  { id: 4, name: 'Adaptability', description: 'Being flexible and open to change in new or uncertain situations. It helps you stay relevant and resilient in fast-changing environments.' },
  { id: 5, name: 'Team Work', description: 'Working collaboratively with others toward a shared goal. It requires cooperation, empathy, and conflict resolution abilities.' },
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
