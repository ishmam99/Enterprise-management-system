<template>
  <div>
    <header class="fixed flex flex-col top-0 left-0 w-full z-30 bg-cover bg-no-repeat bg-white">
      <!-- ===== ROLE BASED TABS (EXECUTIVE SALES) ===== -->
      <div
        v-if="authStore.role == 'sales-executive' || authStore.role == 'sales-executive'"
        class="bg-gray-900 border-b border-gray-700 px-6 py-2"
      >
        <div class="grid grid-cols-4 gap-2 bg-gray-800/60 rounded-xl p-1 w-full mx-auto">
          <router-link
            to="/sales_management"
            class="px-6 py-2 rounded-lg text-lg font-semibold border border-gray-400/20 shadow-lg transition-all duration-300 flex items-center justify-center"
            :class="
              route.path.startsWith('/sales_management')
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            "
          >
            Sales Management System
          </router-link>

          <router-link
            :to="{ path: '/customer_success_team_sales' }"
            class="px-6 py-2 rounded-lg text-lg font-semibold border border-gray-400/20 shadow-lg transition-all duration-300 flex items-center justify-center"
            :class="
              route.path.startsWith('/customer_success_team_sales')
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            "
          >
            Customer Management System
          </router-link>

          <router-link
            :to="{ path: '/training_management' }"
            class="px-6 py-2 rounded-lg text-lg font-semibold border border-gray-400/20 shadow-lg transition-all duration-300 flex items-center justify-center"
            :class="
              route.path.startsWith('/training_management')
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            "
          >
            Training Management System
          </router-link>

          <div class="flex items-center justify-end gap-2">
            <img src="/src/assets/people.png" class="h-10 w-10 rounded-full" alt="" />
            <div class="text-sm">
              <p class="text-gray-300">{{ authStore?.user?.name }}</p>
              <p class="font-medium text-lg text-white">
                {{
                  authStore?.role == 'director-sales'
                    ? 'Director of Sales'
                    : authStore?.role == 'vp-sales'
                    ? 'VP of Sales'
                    : authStore?.role == 'sales-executive' || authStore.role === 'sales-executive'
                    ? 'Sales Executive'
                    : authStore?.role == 'manager-sales'
                    ? 'Manager of Sales'
                    : authStore?.role == 'director-cs'
                    ? 'Director of CustomerSupport'
                    : authStore?.role == 'vp-cs'
                    ? 'VP of Customer Support'
                    : authStore?.role == 'manager-cs'
                    ? 'Manager of Customer Support'
                    : authStore?.role == 'executive - cs'
                    ? 'Customer Support Executive'
                    : ''
                }}
              </p>
            </div>
            <button
              class="p-2 rounded-full hover:bg-red-700 hover:text-white text-red-500 transition-colors flex items-center gap-1"
              @click="logoutUser"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path
                  d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- ===== TOP BAR ===== -->
      <div
        class="h-[70px] grid grid-cols-3 items-center justify-between px-10 bg-gradient-to-r from-sky-600/50 to-purple-500/50 text-sm font-semibold"
      >
        <div class="flex items-center gap-2">
          <img src="/src/assets/images/HHi-tech_softsys_Logo_Black.png" class="w-12" />
          <div class="leading-none flex flex-col">
            <p class="text-white font-bold text-2xl">Hi-Tech</p>
            <p class="text-red-700 font-bold text-2xl">SoftSys</p>
          </div>
        </div>

        <!-- CENTER : TITLE -->
        <div class="flex flex-col gap-1 items-center">
          <span
            class="bg-white text-3xl text-center flex uppercase font-bold text-red-600 text-nowrap py-1 px-2 rounded-lg drop-shadow-md"
          >
            <img
              v-if="authStore.companyName == 'Bell Textron'"
              src="/src/assets/images/bell.png"
              class="w-12"
            />
            {{ authStore.companyName }}</span
          >
        </div>

        <!-- RIGHT : ACTIONS -->
        <div class="flex items-center justify-end gap-4">
          <!-- Customer Success Team dropdown -->
          <div
            class="relative"
            @mouseenter="dropdownOpen = true"
            @mouseleave="dropdownOpen = false"
          >
            <button
              class="bg-white px-4 py-3 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Icon name="material-symbols:groups" class="text-lg" />
              <span class="font-semibold text-gray-700"
                >Select Company - Customer Success Team</span
              >

              <!-- Arrow -->
              <svg
                class="w-4 h-4 transition-transform duration-300"
                :class="dropdownOpen ? 'rotate-180' : ''"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            <!-- Dropdown -->
            <transition name="fade-slide">
              <div
                v-show="dropdownOpen"
                class="absolute mt-3 right-0 bg-gray-900/95 backdrop-blur-lg text-white rounded-xl shadow-2xl w-96 z-50 overflow-hidden border border-gray-700"
              >
                <p
                  class="px-4 py-2 text-xs text-gray-400 uppercase tracking-wide border-b border-gray-700"
                >
                  Select Company
                </p>

                <router-link
                  to="/customer_success_team_sales"
                  v-for="team in myTeams"
                  :key="team.id"
                >
                  <div
                    class="flex items-center gap-2 px-4 py-3 hover:bg-blue-600/20 transition-all duration-200 group"
                    @click="
                      authStore.setTeamId(team.id),
                        authStore.setCompanyName(team.company?.name),
                        authStore.setCompanyId(team.company?.id)
                    "
                  >
                    <span
                      class="h-2 w-2 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition"
                    ></span>
                    <span class="group-hover:translate-x-1 transition-transform duration-200">
                      Team: {{ team.name }} <br />
                      Company: {{ team.company?.name }}
                    </span>
                  </div>
                </router-link>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </header>

    <!-- ================= PAGE CONTENT ================= -->
    <!-- 80px header + 44px tabs -->
    <div class="flex mt-[130px]">
      <Sidebar
        class="fixed"
        v-if="store.showSidebar"
        :activeTab="activeTab"
        @change-tab="changeTab"
      />

      <RouterView class="w-full" :activeTab="activeTab" @set-tab="setTab" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'
import Sidebar from '@/components/sidebars/CustomerSuccessTeamSalesSidebar.vue'
import { useCustomerSuccessTeamSalesStore } from '@/pages/customer_success_team_sales/stores/customerSuccessTeamSalesStore'

const authStore = useAuthStore()
const store = useCustomerSuccessTeamSalesStore()
const route = useRoute()
const router = useRouter()

const activeTab = ref(store.currentMenu || 'All')

const changeTab = (tab) => (activeTab.value = tab)
const setTab = (tab) => (activeTab.value = tab)

const logout = () => {
  authStore.logout()
  router.push('/login/userLogin')
}

const myTeams = ref([])

const fetchMyTeams = async () => {
  const { data } = await api().get('/my-success-team?with=company')
  myTeams.value = data.data.data

  if (myTeams.value.length > 0) {
    authStore.setTeamId(myTeams.value[0].id)
    authStore.setCompanyName(myTeams.value[0].company?.name)
    authStore.setCompanyId(myTeams.value[0].company?.id)
  }
}

const dropdownOpen = ref(false)
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}
const logoutUser = () => {
  authStore.logout()
  router.push(`/login/adminLogin`)
}

onMounted(() => {
  fetchMyTeams()
})
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(6px) scale(0.98);
}
</style>
