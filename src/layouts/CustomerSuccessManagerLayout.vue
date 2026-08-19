<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-purple-50">
    <!-- Main Header -->
    <header class="sticky top-0 z-50 w-full bg-gradient-to-r from-teal-600  to-cyan-700 shadow-lg">
      <!-- Top Bar -->
      <div class="border-b border-white/10">
        <div class="px-6 py-3">
          <div class="flex items-center justify-between">
            <!-- Logo and Brand -->
            <div class="flex items-center w-full justify-start gap-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <img src="/src/assets/images/HHi-tech_softsys_Logo_Black.png" alt="Hi-Tech SoftSys"
                    class="w-10 h-10" />
                </div>
                <div class="flex flex-col">
                  <span class="text-2xl font-bold text-white leading-tight">Hi-Tech</span>
                  <span class="text-xl font-bold text-red-400 leading-tight">SoftSys</span>
                </div>
              </div>

              <div class="h-8 w-px bg-white/20"></div>

              <div class="flex flex-col">
                <span class="text-xl font-medium text-white/80">Customer Success Manager</span>
                <span class="text-lg font-bold text-white">Dashboard</span>
              </div>
            </div>

            <!-- Right Actions -->
            <div class="flex items-center w-full justify-end gap-4">
              <!-- Team Selector -->
              <div ref="dropdownRef" class=" relative">
                <button @click="toggleDropdown"
                  class="flex items-center gap-3 px-4 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all duration-200 group">
                  <div
                    class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                    <i class="fas fa-users text-white text-sm"></i>
                  </div>
                  <div class="text-left">
                    <div class="text-xs text-white/70">Active Team</div>
                    <div class="text-sm font-semibold text-white truncate ">
                      {{ selectedLabel }}
                    </div>
                  </div>
                  <i class="fas fa-chevron-down text-white/70 text-sm transition-transform duration-200"
                    :class="{ 'rotate-180': dropdownOpen }"></i>
                </button>

                <!-- Dropdown -->
                <transition enter-active-class="transition-all duration-200 ease-out"
                  enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100"
                  leave-active-class="transition-all duration-150 ease-in" leave-from-class="opacity-100 scale-100"
                  leave-to-class="opacity-0 scale-95">
                  <div v-if="dropdownOpen"
                    class="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                    <!-- Dropdown Header -->
                    <div class="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
                      <div class="flex items-center gap-3">
                        <div
                          class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                          <i class="fas fa-building text-white"></i>
                        </div>
                        <div>
                          <h3 class="font-bold text-gray-900">Select Company & Team</h3>
                          <p class="text-xs text-gray-600">Switch between your assigned teams</p>
                        </div>
                      </div>
                    </div>

                    <!-- Teams List -->
                    <div class="max-h-80 overflow-y-auto">
                      <div v-for="team in myTeams" :key="team.id" @click="selectTeam(team)"
                        class="p-4 border-b border-gray-100 hover:bg-blue-50/50 cursor-pointer transition-colors duration-150"
                        :class="{ 'bg-blue-50': team.id === authStore.team_id }">
                        <div class="flex items-center gap-3">
                          <!-- Status Indicator -->
                          <div class="relative">
                            <div
                              class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                              <i class="fas fa-users text-blue-600"></i>
                            </div>
                            <div v-if="team.id === authStore.team_id"
                              class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                              <i class="fas fa-check text-white text-xs"></i>
                            </div>
                          </div>

                          <!-- Team Info -->
                          <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2 mb-1">
                              <span class="font-semibold text-gray-900 truncate">{{ team.name }}</span>
                              <span v-if="team.id === authStore.team_id"
                                class="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                                Active
                              </span>
                            </div>
                            <div class="flex items-center gap-2 text-sm text-gray-600">
                              <i class="fas fa-building text-gray-400 text-xs"></i>
                              <span class="truncate">{{ team.company?.name || 'No Company' }}</span>
                            </div>
                          </div>

                          <!-- Selection Indicator -->
                          <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center" :class="team.id === authStore.team_id
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'">
                            <i v-if="team.id === authStore.team_id" class="fas fa-check text-white text-xs"></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Dropdown Footer -->
                    <div class="p-3 bg-gray-50 border-t border-gray-200">
                      <div class="text-xs text-gray-500 text-center">
                        {{ myTeams.length }} team{{ myTeams.length !== 1 ? 's' : '' }} available
                      </div>
                    </div>
                  </div>
                </transition>
              </div>

              <!-- Logout Button -->
              <button @click="authStore.logout(), router.push('/login/adminLogin')"
                class="group relative px-4 py-2.5 bg-white/10 hover:bg-red-500/80 backdrop-blur-sm rounded-xl transition-all duration-200 overflow-hidden"
                title="Logout">
                <div
                  class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000">
                </div>
                <div class="flex items-center gap-2 relative">
                  <i class="fas fa-sign-out-alt text-white"></i>
                  <span class="text-sm font-medium text-white hidden lg:inline">Logout</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Dashboard Title -->
      <!-- <div class="px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-2 h-8 rounded-full bg-gradient-to-b from-yellow-400 to-orange-500"></div>
            <div>
              <h1 class="text-2xl font-bold text-white">Customer Success Manager Dashboard</h1>
              <p class="text-sm text-white/80 mt-1">Monitor and manage all customer success activities</p>
            </div>
          </div>


          <div class="hidden lg:flex items-center gap-4">
            <div class="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
              <div class="text-xs text-white/70">Total Teams</div>
              <div class="text-lg font-bold text-white">{{ myTeams.length }}</div>
            </div>
            <div class="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
              <div class="text-xs text-white/70">Active</div>
              <div class="text-lg font-bold text-white">{{ authStore.team_id ? 1 : 0 }}</div>
            </div>
          </div>
        </div>
      </div> -->
    </header>

    <!-- Main Content Area -->
    <div class="flex w-full h-full justify-between">
      <!-- Sidebar -->
      <transition enter-active-class="transition-all duration-300 h-full ease-in-out"
        enter-from-class="-translate-x-full opacity-0" enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transition-all duration-300 ease-in-out" leave-from-class="translate-x-0 opacity-100"
        leave-to-class="-translate-x-full opacity-0">
        <div v-if="store.showSidebar" class="sticky min-h-screen h-full  z-40">
          <Sidebar :activeTab="activeTab" class="min-w-[300px]  min-h-screen h-full  max-w-[300px]"
            @change-tab="(tab) => changeTab(tab)" />
        </div>
      </transition>
      <RouterView class="w-full overflow-x-auto min-h-[500px]" :activeTab="activeTab" @set-tab="(tab) => setTab(tab)" />

    </div>

    <!-- Background Elements -->
    <div class="fixed inset-0 -z-10 overflow-hidden">
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20">
      </div>
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20">
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'
import Sidebar from '@/components/sidebars/CustomerSuccessManagerSidebar.vue'
import { useCustomerSuccessManagerStore } from '@/pages/customer_success_manager/stores/customerSuccessManagerStore'
import api from '@/config/api'

const store = useCustomerSuccessManagerStore()
const authStore = useAuthStore()
const router = useRouter()

// Tab management
const activeTab = ref(store.currentMenu || 'All')

const tabsConfig = {
  'All': {
    icon: 'fas fa-grid',
    description: 'Overview of all customer success activities'
  },
  'Bid Management': {
    icon: 'fas fa-gavel',
    description: 'Manage bids and proposals'
  },
  'Vendor Management': {
    icon: 'fas fa-truck',
    description: 'Manage vendor relationships and contracts'
  },
  'Purchase': {
    icon: 'fas fa-shopping-cart',
    description: 'Purchase order management'
  },
  'Supply Chain Team': {
    icon: 'fas fa-link',
    description: 'Supply chain coordination and management'
  }
}

const getTabIcon = (tab) => {
  return tabsConfig[tab]?.icon || 'fas fa-cog'
}

const getTabDescription = (tab) => {
  return tabsConfig[tab]?.description || 'Manage your customer success operations'
}

// Team dropdown
const dropdownRef = ref(null)
const dropdownOpen = ref(false)
const myTeams = ref([])

const fetchMyTeams = async () => {
  try {
    const { data } = await api().get('/my-success-team?with=company')
    myTeams.value = data.data.data || data.data

    if (myTeams.value.length > 0) {
      authStore.setTeamId(myTeams.value[0].id)
      authStore.setCompanyName(myTeams.value[0].company?.name)
      authStore.setCompanyId(myTeams.value[0].company?.id)
    }
  } catch (error) {
    console.error('Failed to fetch teams:', error)
  }
}

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const selectTeam = (team) => {
  authStore.setTeamId(team.id)
  authStore.setCompanyId(team.company?.id)
  authStore.setCompanyName(team.company?.name)
  dropdownOpen.value = false

  // You can add additional logic here like refreshing data for the selected team
}

const selectedLabel = computed(() => {
  const team = myTeams.value.find(t => t.id === authStore.team_id)
  return team
    ? `${team.company?.name} — ${team.name}`
    : 'Select a Team'
})

// Click outside to close dropdown
const handleClickOutside = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    dropdownOpen.value = false
  }
}

// Tab change handlers
const changeTab = (tab) => {
  activeTab.value = tab
  store.setCurrentMenu(tab)
}

const setTab = (tab) => {
  activeTab.value = tab
  store.setCurrentMenu(tab)
}

// Format current time for display
const formatCurrentTime = () => {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
}

// Lifecycle
onMounted(() => {
  fetchMyTeams()
  document.addEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Custom scrollbar for dropdown */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* Glass effect */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Gradient text effect */
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Shimmer effect for logout button */
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

.group:hover .group-hover\:translate-x-full {
  animation: shimmer 1s infinite;
}
</style>
