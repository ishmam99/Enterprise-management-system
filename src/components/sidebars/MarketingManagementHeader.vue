<template>
  <div class="bg-gray-800 text-white shadow-md w-full">
    <!-- 🔹 TOP TABS (Executive Sales only) - Desktop -->
    <div v-if="authStore.role == 'sales-executive' || authStore.role == 'sales-executive'"
      class="bg-gray-900 border-b border-gray-700 px-6 py-2 hidden md:block">
      <div class="grid grid-cols-4 gap-2 bg-gray-800/60 rounded-xl p-1 w-full mx-auto">
        <router-link to="/marketing"
          class="px-6 py-2 rounded-lg text-lg font-semibold border border-gray-400/20 shadow-lg transition-all duration-300 flex items-center justify-center"
          :class="route.path.startsWith('/marketing')
            ? 'bg-blue-600 text-white shadow-md'
            : 'text-gray-400 hover:text-white hover:bg-gray-700'
            ">
          Marketing Management System
        </router-link>

        <router-link :to="{ path: '/customer_success_team_sales' }"
          class="px-6 py-2 rounded-lg text-lg font-semibold border border-gray-400/20 shadow-lg transition-all duration-300 flex items-center justify-center"
          :class="route.path.startsWith('/customer_success_team_sales')
            ? 'bg-blue-600 text-white shadow-md'
            : 'text-gray-400 hover:text-white hover:bg-gray-700'
            ">
          Customer Management System
        </router-link>

        <router-link :to="{ path: '/training_management' }"
          class="px-6 py-2 rounded-lg text-lg font-semibold border border-gray-400/20 shadow-lg transition-all duration-300 flex items-center justify-center"
          :class="route.path.startsWith('/customer_success_team_sales')
            ? 'bg-blue-600 text-white shadow-md'
            : 'text-gray-400 hover:text-white hover:bg-gray-700'
            ">
          Training Management System
        </router-link>

        <div class="flex items-center justify-end gap-2">
          <img src="/src/assets/people.png" class="h-10 w-10 rounded-full" alt="" />
          <div class="text-sm">
            <!-- <p class="text-gray-300">{{ authStore?.user?.name }}</p> -->
            <p class="text-gray-300">Marketing Director</p>
            <!-- <p class="font-medium text-lg">
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
            </p> -->
          </div>
          <button
            class="p-2 rounded-full hover:bg-red-700 hover:text-white text-red-500 transition-colors flex items-center gap-1"
            @click="logoutUser">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path
                d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z">
              </path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 🔹 TOP TABS - Mobile -->
    <div v-if="authStore.role == 'sales-executive' || authStore.role == 'sales-executive'"
      class="bg-gray-900 border-b border-gray-700 px-3 py-2 md:hidden">
      <div class="flex flex-col gap-2">
        <!-- Mobile Top Row with User Info -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <img src="/src/assets/people.png" class="h-8 w-8 rounded-full" alt="" />
            <div class="text-xs">
              <p class="text-gray-300">{{ authStore?.user?.name }}</p> x
              <p class="font-medium text-xs">
                {{
                  authStore?.role == 'director-sales'
                    ? 'Director'
                    : authStore?.role == 'vp-sales'
                      ? 'VP'
                      : authStore?.role == 'sales-executive'
                        ? 'Sales Exec'
                        : authStore?.role == 'manager-sales'
                          ? 'Manager'
                          : authStore?.role == 'director-cs'
                            ? 'Director CS'
                            : authStore?.role == 'vp-cs'
                              ? 'VP CS'
                              : authStore?.role == 'manager-cs'
                                ? 'Manager CS'
                                : authStore?.role == 'executive - cs'
                                  ? 'CS Exec'
                                  : ''
                }}
              </p>
            </div>
          </div>
          <button class="p-1 rounded-full hover:bg-red-700 hover:text-white text-red-500 transition-colors"
            @click="logoutUser">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path
                d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z">
              </path>
            </svg>
          </button>
        </div>

        <!-- Mobile System Tabs -->
        <div class="grid grid-cols-3 gap-1">
          <router-link to="/marketing"
            class="px-2 py-1.5 rounded-lg text-xs font-semibold border border-gray-400/20 text-center truncate" :class="route.path.startsWith('/marketing')
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 bg-gray-800/60'
              ">
            Sales
          </router-link>

          <router-link :to="{ path: '/customer_success_team_sales' }"
            class="px-2 py-1.5 rounded-lg text-xs font-semibold border border-gray-400/20 text-center truncate" :class="route.path.startsWith('/customer_success_team_sales')
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 bg-gray-800/60'
              ">
            Customer
          </router-link>

          <router-link :to="{ path: '/training_management' }"
            class="px-2 py-1.5 rounded-lg text-xs font-semibold border border-gray-400/20 text-center truncate" :class="route.path.startsWith('/training_management')
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 bg-gray-800/60'
              ">
            Training
          </router-link>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="py-1 px-3 md:px-10 w-full">
      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center justify-between h-16">
        <div class="flex items-center gap-2">
          <button @click="$emit('toggle-sidebar')" class="p-2 rounded-md hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <nav class="flex space-x-1">
          <router-link to="/marketing"
            class="px-4 py-2 rounded hover:bg-gray-700 transition-colors flex items-center gap-2"
            exact-active-class="bg-blue-600 hover:bg-blue-700">
            <Icon name="material-symbols:home" class="text-lg" />
            <span>Dashboard</span>
          </router-link>
          <router-link to="/marketing/leads/allLeads"
            class="px-4 py-2 rounded hover:bg-gray-700 transition-colors flex items-center gap-2" :class="{
              'bg-blue-600 hover:bg-blue-700': route?.path.includes('/marketing/leads')
            }" exact-active-class="bg-blue-600 hover:bg-blue-700">
            <Icon name="material-symbols:leaderboard" class="text-lg" />
            <span>Leads</span>
          </router-link>

          <router-link to="/marketing/accounts/allAccounts"
            class="px-4 py-2 rounded hover:bg-gray-700 transition-colors flex items-center gap-2" :class="{
              'bg-blue-600 hover:bg-blue-700': route?.path.includes('/marketing/accounts')
            }" exact-active-class="bg-blue-600 hover:bg-blue-700">
            <Icon name="material-symbols:leaderboard" class="text-lg" />
            <span>Accounts</span>
          </router-link>

          <router-link to="/marketing/contact/allContacts"
            class="px-4 py-2 rounded hover:bg-gray-700 transition-colors flex items-center gap-2" :class="{
              'bg-blue-600 hover:bg-blue-700': route?.path.includes('/marketing/contact')
            }" exact-active-class="bg-blue-600 hover:bg-blue-700">
            <Icon name="material-symbols:mail" class="text-lg" />
            <span>Contacts</span>
          </router-link>
          <router-link to="/marketing/deals/allDeals"
            class="px-4 py-2 rounded hover:bg-gray-700 transition-colors flex items-center gap-2" :class="{
              'bg-blue-600 hover:bg-blue-700': route?.path.includes('/marketing/deals')
            }" exact-active-class="bg-blue-600 hover:bg-blue-700">
            <Icon name="material-symbols:inventory" class="text-lg" />
            <span>Deals</span>
          </router-link>

          <!-- <router-link to="/marketing/online_requested_deal"
            class="px-4 py-2 rounded hover:bg-gray-700 transition-colors flex items-center gap-2" :class="{
              'bg-blue-600 hover:bg-blue-700': route?.path.includes('/marketing/online_requested_deal')
            }"
            exact-active-class="bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-2xl translate-y-0 border-b-4 border-blue-700">
            <span class="z-10 drop-shadow-sm">Online Requested Deal</span>
          </router-link> -->

        </nav>

        <div v-if="authStore.role != 'sales-executive'" class="flex items-center justify-end gap-2">
          <img src="/src/assets/people.png" class="h-10 w-10 rounded-full" alt="" />
          <div class="text-sm">
            <!-- <p class="text-gray-300">{{ authStore?.user?.name }}</p> -->
            <p class="text-gray-300">Marketing Director</p>
            <p class="font-medium text-lg">
              {{
                authStore?.role == 'director-sales'
                  ? 'Director of Sales'
                  : authStore?.role == 'vp-sales'
                    ? 'VP of Sales'
                    : authStore?.role == 'sales-executive' || authStore.role === 'executive-sales'
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
            @click="logoutUser">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path
                d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z">
              </path>
            </svg>
          </button>
        </div>

        <div v-if="authStore.role == 'sales-executive'"></div>
      </div>

      <!-- Mobile Navigation -->
      <div class="md:hidden">
        <!-- Top Row with Menu Toggle -->
        <div class="flex items-center justify-between h-14">
          <div class="flex items-center gap-2">
            <button @click="toggleMobileMenu" class="p-2 rounded-md hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span class="font-semibold text-sm">Sales Management</span>
          </div>

          <!-- Mobile Quick Actions -->
          <div class="flex items-center gap-1">
            <button @click="showSearch = !showSearch" class="p-2 rounded-md hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu (Dropdown) -->
        <div v-if="mobileMenuOpen" class="pb-3 space-y-1 max-h-[70vh] overflow-y-auto">
          <router-link to="/marketing" class="block px-4 py-2.5 rounded hover:bg-gray-700 transition-colors text-sm"
            :class="route.path === '/marketing' ? 'bg-blue-600' : ''" @click="mobileMenuOpen = false">
            <Icon name="material-symbols:home" class="inline mr-2" />
            Dashboard
          </router-link>

          <router-link to="/marketing/leads/allLeads"
            class="block px-4 py-2.5 rounded hover:bg-gray-700 transition-colors text-sm"
            :class="route?.path.includes('/marketing/leads') ? 'bg-blue-600' : ''" @click="mobileMenuOpen = false">
            <Icon name="material-symbols:leaderboard" class="inline mr-2" />
            Leads
          </router-link>

          <router-link to="/marketing/accounts/allAccounts"
            class="block px-4 py-2.5 rounded hover:bg-gray-700 transition-colors text-sm"
            :class="route?.path.includes('/marketing/accounts') ? 'bg-blue-600' : ''" @click="mobileMenuOpen = false">
            <Icon name="material-symbols:leaderboard" class="inline mr-2" />
            Accounts
          </router-link>

          <router-link to="/marketing/contact/allContacts"
            class="block px-4 py-2.5 rounded hover:bg-gray-700 transition-colors text-sm"
            :class="route?.path.includes('/marketing/contact') ? 'bg-blue-600' : ''" @click="mobileMenuOpen = false">
            <Icon name="material-symbols:mail" class="inline mr-2" />
            Contacts
          </router-link>

          <router-link to="/marketing/deals/allDeals"
            class="block px-4 py-2.5 rounded hover:bg-gray-700 transition-colors text-sm"
            :class="route?.path.includes('/marketing/deals') ? 'bg-blue-600' : ''" @click="mobileMenuOpen = false">
            <Icon name="material-symbols:inventory" class="inline mr-2" />
            Deals
          </router-link>

          <router-link to="/marketing/proposal/allProposal"
            class="block px-4 py-2.5 rounded hover:bg-gray-700 transition-colors text-sm"
            :class="route?.path.includes('/marketing/proposal') ? 'bg-blue-600' : ''" @click="mobileMenuOpen = false">
            <Icon name="material-symbols:inventory" class="inline mr-2" />
            Proposal
          </router-link>

          <router-link to="/marketing/contracts"
            class="block px-4 py-2.5 rounded hover:bg-gray-700 transition-colors text-sm"
            :class="route?.path.includes('/marketing/contracts') ? 'bg-blue-600' : ''" @click="mobileMenuOpen = false">
            <Icon name="material-symbols:mail" class="inline mr-2" />
            Contracts
          </router-link>

          <router-link to="/marketing/customer/allCustomers"
            class="block px-4 py-2.5 rounded hover:bg-gray-700 transition-colors text-sm"
            :class="route?.path.includes('/marketing/customer') ? 'bg-blue-600' : ''" @click="mobileMenuOpen = false">
            <Icon name="material-symbols:mail" class="inline mr-2" />
            Customers
          </router-link>

          <router-link to="/marketing/timecard"
            class="block px-4 py-2.5 rounded hover:bg-gray-700 transition-colors text-sm"
            :class="route?.path.includes('/marketing/timecard') ? 'bg-blue-600' : ''" @click="mobileMenuOpen = false">
            Timecard
          </router-link>

          <!-- <router-link to="/marketing/employees/assignRole"
            class="block px-4 py-2.5 rounded hover:bg-gray-700 transition-colors text-sm"
            :class="route?.path.includes('/marketing/employees/assignRole') ? 'bg-blue-600' : ''"
            @click="mobileMenuOpen = false">
            Employees
          </router-link> -->
        </div>

        <!-- Mobile Search Bar (if needed) -->
        <div v-if="showSearch" class="pb-3">
          <input type="text" placeholder="Search..."
            class="w-full px-4 py-2 bg-gray-700 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { useRouter, useRoute } from 'vue-router'

defineProps({
  sidebarOpen: Boolean
})

defineEmits(['toggle-sidebar'])

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const mobileMenuOpen = ref(false)
const showSearch = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const logoutUser = () => {
  authStore.logout()
  router.push(`/login/adminLogin`)
}

// Close mobile menu when route changes
onMounted(() => {
  // This will run after the component is mounted
})
</script>

<style scoped>
/* Mobile menu scrollbar styling */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #374151;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #4B5563;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #6B7280;
}
</style>