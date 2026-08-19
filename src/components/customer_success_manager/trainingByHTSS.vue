<template>
  <div class="w-full  p-0 m-0">
    <div class="w-full mx-auto p-0 m-0">
      <!-- Header with Search in same row -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <!-- Left: Title and Description -->
        <div class="lg:flex-1">
          <h1 class="text-2xl font-bold text-gray-900">Enrollment by HTSS Users List</h1>
          <p class="text-gray-600 text-sm mt-1">Manage your organization's users</p>
        </div>

        <!-- Right: Search -->
        <div class="flex-1 lg:flex lg:items-center lg:justify-end">
          <div class="relative flex-1 lg:max-w-xs">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search users..."
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white shadow-sm"
            >
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <!-- <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="rounded-lg shadow p-4 border border-gray-200 bg-white">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-lg font-semibold text-gray-900">{{ users.length }}</h3>
              <p class="text-xs text-gray-600">Total Users</p>
            </div>
          </div>
        </div>

        <div class="rounded-lg shadow p-4 border border-gray-200 bg-white">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-lg font-semibold text-gray-900">{{ activeUsersCount }}</h3>
              <p class="text-xs text-gray-600">Active Users</p>
            </div>
          </div>
        </div>
      </div> -->

      <!-- Users Table -->
      <div class="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Name</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Email</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Username</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Softwares</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-100 bg-white">
              <tr
                v-for="user in paginatedUsers"
                :key="user.id"
                class="hover:bg-blue-50 transition-colors"
              >
                <!-- Name -->
                <td class="px-4 py-3">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span class="text-white font-semibold text-xs">
                        {{ getUserInitials(user) }}
                      </span>
                    </div>
                    <span class="font-medium text-gray-800 text-sm truncate max-w-[120px]" :title="user.user?.name">
                      {{ user.user?.name }}
                    </span>
                  </div>
                </td>

                <!-- Email -->
                <td class="px-4 py-3">
                  <span class="text-sm text-gray-600 truncate block max-w-[180px]" :title="user.user?.email">
                    {{ user.user?.email }}
                  </span>
                </td>

                <!-- Username -->
                <td class="px-4 py-3">
                  <span class="text-sm text-gray-600 truncate block max-w-[120px]" :title="user.username">
                    {{ user.username }}
                  </span>
                </td>

                <!-- Status -->
                <td class="px-4 py-3">
                  <span
                    :class="[
                      'inline-flex items-center px-2 py-1 rounded text-xs font-medium',
                      user.status === '1'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    ]"
                  >
                    {{ user.status === '1' ? 'Active' : 'Inactive' }}
                  </span>
                </td>

                <!-- Softwares -->
                <td class="px-4 py-3">
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-if="user.softwares?.length"
                      v-for="software in user.softwares.slice(0, 2)"
                      :key="software.id"
                      class="bg-purple-100 text-purple-800 px-2 py-0.5 text-xs font-medium rounded"
                    >
                      {{ software.name }}
                    </span>
                    <span v-if="user.softwares?.length > 2" class="text-gray-400 text-xs">
                      +{{ user.softwares.length - 2 }} more
                    </span>
                    <span v-else-if="!user.softwares?.length" class="text-gray-400 italic text-xs">
                      No software
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="filteredUsers.length === 0" class="text-center py-8">
          <svg class="w-12 h-12 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <h3 class="mt-3 text-base font-medium text-gray-900">No users found</h3>
          <p class="mt-1 text-sm text-gray-500">Try adjusting your search</p>
          <button
            @click="clearFilters"
            class="mt-3 px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
          >
            Clear Search
          </button>
        </div>

        <!-- Pagination -->
        <div v-if="filteredUsers.length > 0" class="px-4 py-3 border-t border-gray-200 bg-gray-50">
          <div class="flex items-center justify-between">
            <div class="text-xs text-gray-500">
              Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredUsers.length }} users
            </div>
            <div class="flex items-center space-x-2">
              <button
                @click="previousPage"
                :disabled="currentPage === 1"
                class="px-2.5 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <div class="flex items-center space-x-1">
                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="goToPage(page)"
                  :class="[
                    'px-2.5 py-1 text-xs rounded transition-colors min-w-[32px]',
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  ]"
                >
                  {{ page }}
                </button>
              </div>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="px-2.5 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '@/config/api'
import { ref, reactive, computed, onMounted } from 'vue'

// Data
const users = ref([])
const searchQuery = ref('')
const filters = reactive({
  status: 'all',
  industry: 'all',
  solution: 'all',
  software: 'all'
})

// Pagination
const currentPage = ref(1)
const pageSize = 10

// Computed properties
const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch =
      user.user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesStatus = filters.status === 'all' || user.status === filters.status

    return matchesSearch && matchesStatus
  })
})

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredUsers.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / pageSize))
const startIndex = computed(() => (currentPage.value - 1) * pageSize)
const endIndex = computed(() => Math.min(startIndex.value + pageSize, filteredUsers.value.length))

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 5) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    if (current <= 3) {
      for (let i = 1; i <= 4; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 2) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 3; i <= total; i++) pages.push(i)
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    }
  }

  return pages
})

// Stats
const activeUsersCount = computed(() => users.value.filter(user => user.status === '1').length)

// Helper methods
const getUserInitials = (user) => {
  const name = user.user.name
  const nameParts = name.split(' ')
  if (nameParts.length >= 2) {
    return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`
  }
  return name.charAt(0)
}

// API methods
const fetchUsers = async () => {
  try {
    const {data} = await api().get('end-users?per_page=20&with=user')
    users.value = data.data.data
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

// Methods
const clearFilters = () => {
  searchQuery.value = ''
  filters.status = 'all'
  currentPage.value = 1
}

const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const goToPage = (page) => {
  if (page !== '...') currentPage.value = page
}

// Lifecycle
onMounted(async () => {
  await fetchUsers()
})
</script>

<style scoped>
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
