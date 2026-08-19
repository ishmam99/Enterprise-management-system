<template>
  <div>
    <div
      class="h-[80px]  w-full flex justify-between bg-[url('/src/assets/images/bg.webp')] bg-cover bg-no-repeat items-center text-black fixed top-0 z-40 duration-300">
      <!-- Main Header -->
      <header class="sticky top-0 z-50 w-full bg-gradient-to-r from-teal-600/70  to-cyan-700/70 shadow-lg">
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
                    <span class="text-xl font-bold text-red-500 leading-tight">SoftSys</span>
                  </div>
                </div>

                <div class="h-8 w-px bg-white/20"></div>

                <div class="flex flex-col">
                  <span class="text-xl font-medium text-white/80">Partner</span>
                  <span class="text-lg font-bold text-white">Dashboard</span>
                </div>
              </div>
              <div class=" flex flex-col gap-1 items-center border border-white/20 rounded-lg px-3 py-1 w-1/2 shadow">
                <span
                  class="inline-flex items-center gap-1  text-xl text-center uppercase font-bold text-white text-nowrap py-1 px-2 rounded-lg drop-shadow-md">

                  <img v-if="authStore.companyName == 'Bell Textron'" src="/src/assets/images/bell.png" class="w-8" />

                  {{ authStore.companyName }}
                </span>
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
                      <div class="text-xs text-white/70">Active Company: {{ authStore.companyName }} </div>
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

                        <!-- ALL OPTION -->
                        <div @click="selectAllTeams"
                          class="p-4 border-b border-gray-100 hover:bg-blue-50/50 cursor-pointer transition-colors duration-150"
                          :class="{ 'bg-blue-50': !authStore.team_id }">
                          <div class="flex items-center gap-3">
                            <div
                              class="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                              <i class="fas fa-layer-group text-gray-700"></i>
                            </div>

                            <div class="flex-1 min-w-0">
                              <span class="font-semibold text-gray-900">All Teams</span>
                              <div class="text-xs text-gray-600">All companies & teams</div>
                            </div>

                            <i v-if="!authStore.team_id" class="fas fa-check text-blue-600"></i>
                          </div>
                        </div>

                        <!-- DYNAMIC TEAMS -->
                        <div v-for="team in myTeams" :key="team.id" @click="selectTeam(team)"
                          class="p-4 border-b border-gray-100 hover:bg-blue-50/50 cursor-pointer transition-colors duration-150"
                          :class="{ 'bg-blue-50': team.id === authStore.team_id }">
                          <div class="flex items-center gap-3">
                            <div
                              class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                              <i class="fas fa-users text-blue-600"></i>
                            </div>

                            <div class="flex-1 min-w-0">
                              <span class="font-semibold text-gray-900 truncate">{{ team.name }}</span>
                              <div class="text-xs text-gray-600 truncate">
                                {{ team.company?.name || 'No Company' }}
                              </div>
                            </div>

                            <i v-if="team.id === authStore.team_id" class="fas fa-check text-blue-600"></i>
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


      </header>
    </div>
    <div class="flex pt-[80px] justify-between">

        <SidebarAll v-if="sideBarActive && authStore.team_id == null" :activeTab="activeTab" @change-tab="changeTab" />

        <Sidebar v-else-if="sideBarActive" :activeTab="activeTab" @change-tab="changeTab" />


      <RouterView class="w-full" :activeTab="activeTab" @set-tab="(tab) => setTab(tab)" />
      <!-- </transition> -->
    </div>
  </div>
</template>
<script setup>
// import HrSidebar from '/src/views/Hr/HrSidebar.vue'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'
import Sidebar from '@/components/sidebars/PartnerSidebar.vue'
import SidebarAll from '@/components/sidebars/PartnerSidebarAll.vue'
import { useUserStore } from '@/pages/user/stores/userStore'
import { usePartnerStore } from '@/pages/partner/stores/partnerStore'
const store = usePartnerStore()
const authStore = useAuthStore()
const tabs = ['All', 'Bid Management', 'Vendor Management', 'Purchase', 'Supply Chain Team']
const activeTab = ref(store.currentMenu || 'All')
const router = useRouter()
const sideBarActive = ref(true)
// watch(
//   () => authStore.isAuthenticated,
//   (newIsAuthenticated) => {
//     console.log(newIsAuthenticated)

//     if (!newIsAuthenticated) {
//       router.push('/')
//     }
//   }
// )


// Team dropdown
const dropdownRef = ref(null)
const dropdownOpen = ref(false)
const myTeams = ref([])

const fetchMyTeams = async () => {
  try {
    const { data } = await api().get('/my-success-team?with=company')
    myTeams.value = data.data.data || data.data

  } catch (error) {
    console.error('Failed to fetch teams:', error)
  }
}

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const selectedLabel = ref()  // default label

const selectAllTeams = () => {
  authStore.setTeamId(null)
  authStore.setCompanyId(null)
  authStore.setCompanyName('All Teams')
  selectedLabel.value = 'All Teams'
  dropdownOpen.value = false
}

const selectTeam = (team) => {
  authStore.setTeamId(team.id)
  authStore.setCompanyId(team.company?.id)
  authStore.setCompanyName(team.company?.name)
  selectedLabel.value = team.name
  dropdownOpen.value = false
}
onMounted(() => {
  fetchMyTeams()

  // Default select All
  if(!authStore.companyId)
{  authStore.setTeamId(null)
  authStore.setCompanyId(null)
  authStore.setCompanyName('All Teams')
  selectedLabel.value = 'All Teams'}

  if (!['partner'].includes(authStore.role)) {
    router.push({ name: 'errors-not-authorized' })
  }
})
const changeTab = (tab) => {
  console.log('here and there', tab)
  activeTab.value = tab
}
const setTab = (tab) => {
  console.log('here and there', tab)
  activeTab.value = tab
}
</script>
