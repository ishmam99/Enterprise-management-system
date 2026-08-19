<script setup>
import { ref, reactive, onMounted } from 'vue'
import api from '@/config/api'
import Breadcrumb from '@/components/Breadcrumb.vue'

const selectedRole = ref('sales-executive')
const users = ref([])
const loading = ref(false)

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

const fetchUsers = async () => {
  // if (!selectedRole.value) {
  //   showToast('Please select a role', 'error')
  //   return
  // }

  loading.value = true
  try {
    const { data } = await api().get('/role-by-user-list', {
      params: {
        role: selectedRole.value
      }
    })

    users.value = data.data?.data || []

  } catch (err) {
    console.error(err)
    showToast('Failed to load users', 'error')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  // Initial fetch if needed
  fetchUsers()
})

</script>
<template>
  <div class="min-h-screen bg-gradient-to-br from-sky-100 via-indigo-100 to-pink-100 px-10 pb-8 pt-4">
    <Breadcrumb />
    <div class=" mx-auto bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8">
      <h2 class="text-3xl font-bold text-center mb-6 text-indigo-600">
        User List
      </h2>

      <!-- Role Filter -->
      <div class="flex gap-4 mb-6">
        <select v-model="selectedRole" class="input flex-1">
          <option value="" disabled>Select Role</option>

          <option value="crm-director">CRM - Director</option>
          <option value="crm-manager">CRM - Manager</option>
          <option value="crm-executive">CRM - Executive</option>

          <option value="sales-director">Sales - Director</option>
          <option value="sales-manager">Sales - Manager</option>
          <option value="sales-executive">Sales - Executive</option>

          <option value="marketing-director">Marketing - Director</option>
          <option value="marketing-manager">Marketing - Manager</option>
          <option value="marketing-executive">Marketing - Executive</option>
        </select>

        <button
          @click="fetchUsers"
          :disabled="loading"
          class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-70 transition-all duration-200"
        >
          {{ loading ? 'Loading...' : 'Search' }}
        </button>
      </div>

      <!-- User Table -->
      <div v-if="users.length" class="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
        <table class="min-w-full divide-y divide-gray-200 table-zebra">
          <thead class="bg-gradient-to-r from-indigo-50 to-indigo-100">
            <tr>
              <th scope="col" class="px-6 py-4 border-e text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" class="px-6 py-4 border-e text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" class="px-6 py-4 border-e text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                Role
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr 
              v-for="(user, index) in users" 
              :key="user.id"
              class="hover:bg-indigo-50/50 transition-colors duration-150"
              :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'"
            >
              <td class="px-6 py-4 border-e border-slate-200 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-sm">
                    {{ user.name?.charAt(0) || 'U' }}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900 capitalize">
                      {{ user.name }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 border-e border-slate-200 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ user.email }}</div>
              </td>
              <td class="px-6 py-4 border-e border-slate-200 whitespace-nowrap">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize"
                  :class="{
                    'bg-purple-100 text-purple-800': user.role?.includes('director'),
                    'bg-blue-100 text-blue-800': user.role?.includes('manager'),
                    'bg-green-100 text-green-800': user.role?.includes('executive'),
                    'bg-gray-100 text-gray-800': !user.role?.includes('director') && !user.role?.includes('manager') && !user.role?.includes('executive')
                  }">
                  {{ user.role }}
                </span>
              </td>
              
            </tr>
          </tbody>
        </table>
      </div>

    <!-- Empty State -->
    <div v-else class="text-center py-16">
      <div class="mx-auto w-24 h-24 bg-gradient-to-br from-indigo-100 to-pink-100 rounded-full flex items-center justify-center mb-6">
        <svg class="w-12 h-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No users found</h3>
      <p class="text-gray-500 max-w-md mx-auto">
        {{ selectedRole ? `No users found with the role "${selectedRole}". Try selecting a different role.` : 'Select a role and click "Search" to view users.' }}
      </p>
    </div>

      <!-- Results Summary -->
      <div v-if="users.length" class="mt-4 flex justify-between items-center text-sm text-gray-600">
        <div class="flex items-center space-x-4">
          <span class="inline-flex items-center">
            <span class="h-3 w-3 bg-indigo-400 rounded-full mr-2"></span>
            Showing {{ users.length }} users
          </span>
          <!-- <span class="inline-flex items-center">
            <span class="h-3 w-3 bg-purple-400 rounded-full mr-2"></span>
            Directors
          </span>
          <span class="inline-flex items-center">
            <span class="h-3 w-3 bg-blue-400 rounded-full mr-2"></span>
            Managers
          </span>
          <span class="inline-flex items-center">
            <span class="h-3 w-3 bg-green-400 rounded-full mr-2"></span>
            Executives
          </span> -->
        </div>
        <button 
          v-if="users.length"
          class="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
          @click="users = []"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Clear Results
        </button>
      </div>
    </div>

    <!-- Toast -->
    <transition name="fade">
      <div
        v-if="toast.show"
        class="fixed bottom-6 right-6 px-5 py-4 rounded-xl text-white shadow-lg transition-all duration-300"
        :class="{
          'bg-gradient-to-r from-green-500 to-emerald-600': toast.type === 'success',
          'bg-gradient-to-r from-red-500 to-rose-600': toast.type === 'error',
          'animate-slide-in': toast.show
        }"
      >
        <div class="flex items-center">
          <svg v-if="toast.type === 'success'" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ toast.message }}
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.input {
  @apply px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}
</style>