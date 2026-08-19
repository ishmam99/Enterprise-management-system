<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
    <!-- Header -->
    <header class="mb-8 flex justify-center items-center flex-col">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-3">
        <div class="p-3 bg-blue-500 text-white rounded-2xl shadow-lg">
          <i class="fas fa-users text-xl"></i>
        </div>HTSS Contacts List
      </h1>
      <!-- <p class="text-gray-500 mt-2">View all your HTSS contacts</p> -->
    </header>

    <!-- Stats Cards -->
    <div class="grid hidden grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div class="bg-white rounded-xl shadow p-5 flex items-center gap-4">
        <div class="p-3 bg-blue-100 text-blue-500 rounded-xl">
          <i class="fas fa-users text-xl"></i>
        </div>
        <div>
          <p class="text-gray-500 text-sm">Total Members</p>
          <p class="text-2xl font-bold text-gray-800">{{ contacts.length }}</p>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow p-5 flex items-center gap-4">
        <div class="p-3 bg-green-100 text-green-500 rounded-xl">
          <i class="fas fa-user-friends text-xl"></i>
        </div>
        <div>
          <p class="text-gray-500 text-sm">Active</p>
          <p class="text-2xl font-bold text-gray-800">{{ activeCount }}</p>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow p-5 flex items-center gap-4">
        <div class="p-3 bg-purple-100 text-purple-500 rounded-xl">
          <i class="fas fa-building text-xl"></i>
        </div>
        <div>
          <p class="text-gray-500 text-sm">Roles</p>
          <p class="text-2xl font-bold text-gray-800">{{ roleCount }}</p>
        </div>
      </div>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Left Panel: Contact List -->
      <div class="lg:w-2/3">
        <!-- Search and Filter Bar -->
        <div class="bg-white rounded-xl shadow p-4 mb-6">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="relative flex-1">
              <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search members by name, email or role..."
                class="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div class="flex hidden gap-3">
              <select
                v-model="selectedFilter"
                class="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Members</option>
                <option value="active">Active Only</option>
                <option value="developer">Developers</option>
                <option value="designer">Designers</option>
                <option value="manager">Managers</option>
              </select>
              <button
                @click="openAddModal"
                class="bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-3 rounded-xl flex items-center gap-2 transition-colors shadow-md hover:shadow-lg"
              >
                <i class="fas fa-plus"></i>
                <span class="hidden md:inline">Add Member</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Contacts List -->
        <div class="bg-white rounded-xl shadow overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="text-left py-4 px-6 font-medium text-gray-500">Member</th>
                  <th class="text-left py-4 px-6 font-medium text-gray-500 hidden lg:table-cell">Email</th>
                  <th class="text-left py-4 px-6 font-medium text-gray-500">Company</th>
                  <th class="text-left py-4 px-6 font-medium text-gray-500">Role</th>
                  <th class="text-left py-4 px-6 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr
                  v-for="contact in filteredContacts"
                  :key="contact.id"
                  class="hover:bg-gray-50 transition-colors"
                >
                  <td class="py-4 px-6">
                    <div class="flex items-center gap-4">
                      <div class="relative">
                        <div
                          class="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-semibold"
                          :class="getAvatarColor(contact.name)"
                        >
                          {{ getInitials(contact.name) }}
                        </div>
                        <div
                          v-if="contact.is_active"
                          class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                          title="Active"
                        ></div>
                      </div>
                      <div>
                        <p class="font-medium text-gray-800">{{ contact.name }}</p>
                        <p class="text-sm text-gray-500">{{ contact.phone || 'No phone' }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-6 hidden lg:table-cell">
                    <p class="text-gray-800 truncate max-w-xs">{{ contact.email }}</p>
                  </td>
                  <td class="py-4 px-6">
                    <span
                      class="px-3 py-1 rounded-full text-xs bg-violet-500 text-white text-nowrap font-medium"
                    >
                      {{ contact.company || 'Hi-Tech Softsys' }}
                    </span>
                  </td>
                  <td class="py-4 px-6">
                    <span
                      class="px-3 py-1 rounded-full text-xs font-medium"
                      :class="getRoleClass(contact.role)"
                    >
                      {{ formatRole(contact.role) }}
                    </span>
                  </td>
                  <td class="py-4 px-6">
                    <div class="flex items-center gap-2">
                      <button
                        @click="viewContactDetails(contact)"
                        class="px-3 py-2 flex gap-2 items-center justify-center text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors text-sm"
                        title="View Details"
                      >
                        <i class="fas fa-eye"></i> View
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="py-12 text-center">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <h3 class="text-lg font-medium text-gray-600 mb-2">Loading team members...</h3>
          </div>

          <!-- Empty State -->
          <div v-if="!loading && filteredContacts.length === 0" class="py-12 text-center">
            <div class="text-gray-400 text-5xl mb-4">
              <i class="fas fa-users-slash"></i>
            </div>
            <h3 class="text-lg font-medium text-gray-600 mb-2">No team members found</h3>
            <p class="text-gray-500 mb-6">{{ searchQuery ? 'Try adjusting your search' : 'No members in this team yet' }}</p>
            <button
              @click="openAddModal"
              class="bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-3 rounded-xl inline-flex items-center gap-2 transition-colors"
            >
              <i class="fas fa-plus"></i>
              Add First Member
            </button>
          </div>
        </div>
      </div>

      <!-- Right Panel: Contact Details -->
      <div class="lg:w-1/3">
        <div class="bg-white rounded-xl shadow p-6 sticky top-8">
          <h2 class="text-xl font-bold text-gray-800 mb-6">Member Details</h2>

          <div v-if="selectedContact" class="space-y-6">
            <!-- Contact Header -->
            <div class="flex flex-col items-center text-center mb-6">
              <div
                class="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-semibold mb-4"
                :class="getAvatarColor(selectedContact.name)"
              >
                {{ getInitials(selectedContact.name) }}
              </div>
              <h3 class="text-2xl font-bold text-gray-800">{{ selectedContact.name }}</h3>
              <p class="text-gray-500">{{ formatRole(selectedContact.role) }}</p>

              <div class="flex items-center gap-2 mt-2">
                <span
                  class="px-3 py-1 rounded-full text-xs font-medium"
                  :class="selectedContact.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                >
                  {{ selectedContact.is_active ? 'Active' : 'Inactive' }}
                </span>
              </div>
            </div>

            <!-- Contact Info -->
            <div class="space-y-4">
              <div v-if="selectedContact.email" class="flex items-center gap-4">
                <div class="p-3 bg-blue-50 text-blue-500 rounded-xl">
                  <i class="fas fa-envelope"></i>
                </div>
                <div>
                  <p class="text-gray-500 text-sm">Email</p>
                  <p class="text-gray-800 font-medium">{{ selectedContact.email }}</p>
                </div>
              </div>

              <div v-if="selectedContact.phone" class="flex items-center gap-4">
                <div class="p-3 bg-green-50 text-green-500 rounded-xl">
                  <i class="fas fa-phone"></i>
                </div>
                <div>
                  <p class="text-gray-500 text-sm">Phone</p>
                  <p class="text-gray-800 font-medium">{{ selectedContact.phone }}</p>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="p-3 bg-purple-50 text-purple-500 rounded-xl">
                  <i class="fas fa-briefcase"></i>
                </div>
                <div>
                  <p class="text-gray-500 text-sm">Role</p>
                  <p class="text-gray-800 font-medium">{{ formatRole(selectedContact.role) }}</p>
                </div>
              </div>

              <div v-if="selectedContact.company" class="flex items-center gap-4">
                <div class="p-3 bg-orange-50 text-orange-500 rounded-xl">
                  <i class="fas fa-building"></i>
                </div>
                <div>
                  <p class="text-gray-500 text-sm">Company</p>
                  <p class="text-gray-800 font-medium">{{ selectedContact.company }}</p>
                </div>
              </div>

              <div v-if="selectedContact.department" class="flex items-center gap-4">
                <div class="p-3 bg-teal-50 text-teal-500 rounded-xl">
                  <i class="fas fa-sitemap"></i>
                </div>
                <div>
                  <p class="text-gray-500 text-sm">Department</p>
                  <p class="text-gray-800 font-medium">{{ selectedContact.department }}</p>
                </div>
              </div>

              <div v-if="selectedContact.joined_date" class="flex items-center gap-4">
                <div class="p-3 bg-pink-50 text-pink-500 rounded-xl">
                  <i class="fas fa-calendar-alt"></i>
                </div>
                <div>
                  <p class="text-gray-500 text-sm">Joined Date</p>
                  <p class="text-gray-800 font-medium">{{ formatDate(selectedContact.joined_date) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- No Contact Selected -->
          <div v-else class="text-center py-8">
            <div class="text-gray-300 text-4xl mb-4">
              <i class="fas fa-user-circle"></i>
            </div>
            <p class="text-gray-500">Select a team member to view details</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/AuthStore'
import { ref, computed, onMounted } from 'vue'

// Import your API
// const api = () => { return { get: async () => ({ data: { members: [] } }) } } // Mock - replace with your actual API import

// Reactive state
const contacts = ref([])
const selectedContact = ref(null)
const searchQuery = ref('')
const selectedFilter = ref('all')
const showModal = ref(false)
const loading = ref(true)
const authStore = useAuthStore()

// Computed properties
const activeCount = computed(() => {
  return contacts.value.filter(c => c.is_active).length
})

const roleCount = computed(() => {
  const roles = new Set(contacts.value.map(c => c.role))
  return roles.size
})

const filteredContacts = computed(() => {
  let filtered = contacts.value

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(contact =>
      contact.name.toLowerCase().includes(query) ||
      (contact.email && contact.email.toLowerCase().includes(query)) ||
      (contact.phone && contact.phone.includes(query)) ||
      contact.role.toLowerCase().includes(query)
    )
  }

  // Apply category filter
  if (selectedFilter.value !== 'all') {
    filtered = filtered.filter(contact => {
      if (selectedFilter.value === 'active') {
        return contact.is_active
      }
      return contact.role === selectedFilter.value
    })
  }

  return filtered
})

// Methods
const getInitials = (name) => {
  if (!name) return '??'
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const getAvatarColor = (name) => {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-orange-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-red-500'
  ]
  const index = name ? name.length % colors.length : 0
  return colors[index]
}

const getRoleClass = (role) => {
  const classes = {
    'developer': 'bg-blue-100 text-blue-800',
    'designer': 'bg-pink-100 text-pink-800',
    'manager': 'bg-purple-100 text-purple-800',
    'admin': 'bg-red-100 text-red-800',
    'analyst': 'bg-green-100 text-green-800',
    'tester': 'bg-yellow-100 text-yellow-800',
    'customer-manager': 'bg-indigo-100 text-indigo-800',
    'partner': 'bg-teal-100 text-teal-800'
  }
  return classes[role] || 'bg-gray-100 text-gray-800'
}

const formatRole = (role) => {
  const roleMap = {
    'developer': 'Developer',
    'designer': 'Designer',
    'manager': 'Manager',
    'admin': 'Administrator',
    'analyst': 'Analyst',
    'tester': 'Tester',
    'customer-manager': 'Customer Manager',
    'partner': 'Partner'
  }
  return roleMap[role] || role.charAt(0).toUpperCase() + role.slice(1).replace('-', ' ')
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const viewContactDetails = (contact) => {
  selectedContact.value = contact
}

const openAddModal = () => {
  // Implement your add modal logic here
  console.log('Open add modal')
}

const getContacts = async () => {
  try {
    loading.value = true
    const { data } = await api().get('success-teams/' + authStore.team_id)

    // Filter out customer-manager and partner roles
    contacts.value = data.members.filter(e =>
      e.role != 'customer-manager' && e.role != 'partner'
    ).map(member => ({
      ...member,
      // Ensure all required fields exist
      name: member.name || 'Unknown',
      email: member.email || '',
      phone: member.phone || '',
      role: member.role || 'member',
      company: member.company || 'Hi-Tech Softsys',
      is_active: member.is_active !== false, // Default to true if not specified
      department: member.department || '',
      joined_date: member.joined_date || member.created_at
    }))

    // Select first contact by default if available
    if (contacts.value.length > 0) {
      selectedContact.value = contacts.value[0]
    }
    console.log(contacts.value)
  } catch (error) {
    console.error('Error fetching contacts:', error)
    contacts.value = []
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  getContacts()
})
</script>
