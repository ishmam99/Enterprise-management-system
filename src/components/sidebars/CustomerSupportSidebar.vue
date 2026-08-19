<template>
  <div class="h-full w-64 bg-gray-800 text-white overflow-y-auto">
    <div class="p-4 border-b border-gray-700">
      <h3 class="text-lg capitalize font-semibold pt-4 underline underline-offset-4">
        Welcome {{ authStore?.user?.name ? authStore?.user?.name : 'Customer Support' }},
        {{ authStore?.role ? authStore?.role : 'Director' }}
      </h3>
    </div>

    <nav class="p-2 space-y-1">
      <!-- Customer Support Section -->
      <div v-if="route?.path.includes('/customer_support')" class="relative">
        <!-- Dashboard -->
        <router-link
          to="/customer_support"
          class="flex items-center gap-3 px-3 text-lg py-2 rounded hover:bg-gray-700 transition-colors"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:dashboard" class="text-lg" />
          <span>Dashboard</span>
        </router-link>

        <!-- Tickets Section -->
        <div
          class="flex items-center justify-between gap-3 p-2 rounded hover:bg-gray-700 text-white transition-all cursor-pointer"
          :class="{ 'bg-gray-700 font-semibold': isActiveSection('tickets') }"
          @click="toggleSection('tickets')"
        >
          <div class="flex items-center gap-3">
            <Icon name="material-symbols:confirmation-number" class="text-lg" />
            <span>Tickets</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            :class="{ 'rotate-180': isActiveSection('tickets') }"
            fill="currentColor"
          >
            <path
              d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"
            ></path>
          </svg>
        </div>

        <!-- Tickets Submenu -->
        <div
          class="ml-4 pl-3 border-l-2 border-gray-600 overflow-hidden transition-all duration-200"
          :class="isActiveSection('tickets') ? 'max-h-96' : 'max-h-0'"
        >
          <router-link
            to="/customer_support/tickets/all"
            class="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition-all text-sm"
            exact-active-class="bg-blue-600 hover:bg-blue-700"
          >
            <Icon name="material-symbols:list" class="text-lg" />
            <span>All Tickets</span>
          </router-link>

          <router-link
            to="/customer_support/tickets/my-tickets"
            class="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition-all text-sm"
            exact-active-class="bg-blue-600 hover:bg-blue-700"
          >
            <Icon name="material-symbols:person" class="text-lg" />
            <span>My Tickets</span>
          </router-link>

          <router-link
            to="/customer_support/tickets/unassigned"
            class="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition-all text-sm"
            exact-active-class="bg-blue-600 hover:bg-blue-700"
          >
            <Icon name="material-symbols:help" class="text-lg" />
            <span>Unassigned</span>
          </router-link>
        </div>

        <!-- Customer Feedback -->
        <router-link
          to="/customer_support/feedback"
          class="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition-colors"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:reviews" class="text-lg" />
          <span>Customer Feedback</span>
        </router-link>

        <!-- Reports & Analytics -->
        <router-link
          to="/customer_support/reports"
          class="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition-colors"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:analytics" class="text-lg" />
          <span>Reports & Analytics</span>
        </router-link>

        <!-- Settings -->
        <router-link
          to="/customer_support/settings"
          class="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition-colors"
          exact-active-class="bg-blue-600 hover:bg-blue-700"
        >
          <Icon name="material-symbols:settings" class="text-lg" />
          <span>Settings</span>
        </router-link>
      </div>

      <!-- Logout Button -->
      <div

        class="flex items-center gap-3 p-3 cursor-pointer hover:bg-red-700 transition-colors mt-10"
         @click="store.logout(),router.push('/login/adminLogin')"
      >
        <Icon name="material-symbols:logout" class="text-lg" />
        <span>Logout</span>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/AuthStore'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const activeSections = ref(new Set())

const isActiveSection = (section) => {
  return (
    route.path.startsWith(`/customer_support/${section}`) ||
    activeSections.value.has(section)
  )
}

const toggleSection = (section) => {
  // If the section is already active, close it
  if (activeSections.value.has(section)) {
    activeSections.value.delete(section)
  } else {
    // Close all other sections first
    activeSections.value.clear()
    // Then open the clicked section
    activeSections.value.add(section)
  }
}

const logoutUser = () => {
  authStore.logout()
  router.push(`/login`)
}

const dashboardPath = computed(() => {
  switch (route.name) {
    case 'customer_support-dashboard':
      return '/customer_support/dashboard'
    case 'customer_support-tickets':
      return '/customer_support/tickets'
    case 'customer_support-feedback':
      return '/customer_support/feedback'
    case 'customer_support-reports':
      return '/customer_support/reports'
    case 'customer_support-settings':
      return '/customer_support/settings'
    default:
      return '/customer_support/dashboard'
  }
})
</script>

<style scoped>
.router-link-active.router-link-exact-active {
  background-color: rgb(37 99 235);
}

.router-link-active.router-link-exact-active:hover {
  background-color: rgb(29 78 216);
}

.rotate-180 {
  transform: rotate(180deg);
  transition: transform 0.2s ease;
}
</style>
