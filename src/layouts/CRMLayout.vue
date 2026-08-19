<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import CRMSidebar from '@/components/CRM/CRMSidebar.vue'
import CRMSettingsDropdown from '@/components/CRM/SettingsDropdown.vue'
import UserManagementSidebar from '@/components/CRM/UserManagementSidebar.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// 🔹 Active top module
const activeModule = computed(() => authStore.currentTab)

const switchModule = (module) => {
  if (authStore.currentTab === module) return

  authStore.setCurrentTab(module)
  router.push({ name: module === 'crm' ? 'crm' : 'crm-user' })
}


// 🔹 CRM Tabs (existing)
const crmTabs = [
  { name: 'crm', title: 'Dashboard' },
  { name: 'crm-Leads', title: 'Leads' },
  { name: 'crm-Accounts', title: 'Accounts' },
  { name: 'crm-Deals', title: 'Deals' },
  { name: 'crm-contacts', title: 'Contacts' },
  { name: 'crm-Products', title: 'Products' },
  { name: 'crm-timecard', title: 'Timecard' }
]

// 🔹 User Management Tabs
const userTabs = [
  { name: 'crm-user', title: 'Dashboard' },
  { name: 'crm-employees-assignRole', title: 'Assign Role' },
  { name: 'crm-employees-allEmployees', title: 'All Employees' },
  { name: 'crm-employees-unassignedEmployee', title: 'Unassigned Employees' },
  { name: 'crm-user-list', title: 'View Users' },
  // { name: 'crm-user-assign', title: 'Assign User' }
]

// 🔹 Tabs to render
const visibleTabs = computed(() => (authStore.currentTab === 'crm' ? crmTabs : userTabs))

// ✅ Logout
const logoutUser = () => {
  authStore.logout()
  router.push('/login/adminLogin')
}

// ✅ Sidebar toggle
const toggleSidebar = () => {
  authStore.toggleSidebar()
}

// ✅ View mode
const hasView = computed(() => ['crm-Accounts-view-id', 'crm-Leads-view-id'].includes(route?.name))

const isTabActive = (tabName) => {
  if (!route.name || !tabName) return false

  const current = route.name.toString().toLowerCase()
  const tab = tabName.toLowerCase()

  // ✅ Exact dashboard match
  if (tab === 'crm' || tab === 'crm-user') {
    return current === tab
  }

  // ✅ Keep active for child routes (create, edit, view)
  return current.startsWith(tab)
}




onMounted(() => {
  if (!['crm-director', 'crm-executive', 'crm-manager'].includes(authStore.role)) {
    router.push({ name: 'errors-not-authorized' })
  }
})
</script>

<template>
  <div>
    <!-- 🔷 TOP MODULE BAR -->
    <div v-if="authStore.role == 'crm-director'" class="bg-slate-900 w-full text-white flex items-center justify-center gap-6 py-3 px-2 shadow">
      <button
        class="w-1/2 py-1 rounded-lg"
        :class="
          authStore.currentTab === 'crm'
            ? 'bg-gradient-to-r from-sky-600 via-emerald-600 to-cyan-700/80 text-white '
            : 'text-gray-300 hover:text-white '
        "
        @click="switchModule('crm')"
      >
        CRM Management
      </button>

      <button
        class="w-1/2 py-1 rounded-lg"
        :class="
          authStore.currentTab === 'user'
            ? 'bg-gradient-to-r from-cyan-700/80 via-emerald-600 to-sky-600 text-white '
            : 'text-gray-300 hover:text-white '
        "
        @click="switchModule('user')"
      >
        User Management
      </button>
    </div>

    <!-- 🔷 EXISTING NAVBAR -->
    <nav class="bg-slate-800 text-white flex items-center justify-between px-4 py-2 shadow">
      <!-- Left -->
      <div class="flex items-center gap-3">
        <button @click="toggleSidebar" class="hover:text-sky-300">
          <i class="ri-menu-line text-2xl"></i>
        </button>
        <span class="font-semibold text-lg">HTSS CRM</span>
      </div>

      <!-- Center Tabs -->
      <div class="hidden md:flex items-center space-x-4">
        <router-link
          v-for="tab in visibleTabs"
          :key="tab.name"
          :to="{ name: tab.name }"
          class="py-2 px-3 text-lg font-medium hover:border-b-2 border-white transition"
          :class="{ 'border-b-2 border-white': isTabActive(tab.name) }"
        >
          {{ tab.title }}
        </router-link>
      </div>

      <!-- Right -->
      <div class="flex items-center gap-3">
        <i class="ri-search-line text-xl"></i>
        <CRMSettingsDropdown />
        <div class="flex items-center gap-2">
          <img src="/src/assets/people.png" class="h-10 w-10 rounded-full" />
          <div class="text-sm">
            <p class="text-gray-300">{{ authStore.user?.name }}</p>
            <p class="font-medium capitalize">{{ authStore.role }}</p>
          </div>
          <button class="p-2 hover:bg-red-700 text-red-500 rounded-full" @click="logoutUser">
            <i class="ri-logout-box-r-line text-xl"></i>
          </button>
        </div>
      </div>
    </nav>

    <!-- MAIN -->
    <div v-if="authStore.currentTab == 'crm' " class="flex w-full transition-all">
      <CRMSidebar
        v-if="!hasView && authStore.sidebarOpen"
        class="w-1/5 bg-white shadow-lg transition-all duration-300"
      />

      <main
        :class="[
          hasView || !authStore.sidebarOpen ? 'w-full' : 'w-4/5',
          'transition-all duration-300'
        ]"
      >
        <router-view />
      </main>
    </div>
    <div v-if="authStore.currentTab == 'user' " class="flex w-full transition-all">
      <UserManagementSidebar
        v-if="!hasView && authStore.sidebarOpen"
        class="w-1/5 bg-white shadow-lg transition-all duration-300"
      />

      <main
        :class="[
          hasView || !authStore.sidebarOpen ? 'w-full' : 'w-4/5',
          'transition-all duration-300'
        ]"
      >
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  @apply text-white border-b-2 border-white;
}
</style>
