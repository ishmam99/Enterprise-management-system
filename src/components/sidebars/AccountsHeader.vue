<template>
  <div class="bg-gray-800 text-white shadow-md w-full">
    <div class="py-2 px-10 w-full">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center gap-2">
          <button @click="$emit('toggle-sidebar')" class="p-2 rounded-md hover:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span class="font-semibold text-lg">Accounts Management System</span>
        </div>

        <nav class="hidden md:flex space-x-1">
          <router-link
            to="/accounts_management"
            class="px-4 py-2 rounded hover:bg-gray-700 transition-colors flex items-center gap-2"
            exact-active-class="bg-blue-600 hover:bg-blue-700"
          >
            <Icon name="material-symbols:home" class="text-lg" />
            <span>Dashboard</span>
          </router-link>

 

          <router-link
            to="/accounts_management/revenue"
            class="px-4 py-2 rounded hover:bg-gray-700 transition-colors flex items-center gap-2"
            :class="{'bg-blue-600 hover:bg-blue-700': route?.path.includes('/accounts_management/hiring')}"
            exact-active-class="bg-blue-600 hover:bg-blue-700"
          >
            <Icon name="material-symbols:leaderboard" class="text-lg" />
            <span>Revenue</span>
          </router-link>

          <router-link
            to="/accounts_management/expense"
            class="px-4 py-2 rounded hover:bg-gray-700 transition-colors flex items-center gap-2"
            :class="{'bg-blue-600 hover:bg-blue-700': route?.path.includes('/accounts_management/expense')}"
            exact-active-class="bg-blue-600 hover:bg-blue-700"
          >
            <Icon name="material-symbols:mail" class="text-lg" />
            <span>Expense</span>
          </router-link>

          <router-link
            to="/accounts_management/invoice"
            class="px-4 py-2 rounded hover:bg-gray-700 transition-colors flex items-center gap-2"
            :class="{'bg-blue-600 hover:bg-blue-700': route?.path.includes('/accounts_management/Invoice')}"
            exact-active-class="bg-blue-600 hover:bg-blue-700"
          >
            <Icon name="material-symbols:inventory" class="text-lg" />
            <span>Invoice</span>
          </router-link>
        </nav>

        <div class="flex items-center gap-2">
          <img src="/src/assets/people.png" class="h-10 w-10 rounded-full" alt="">
          <div class="text-sm">
            <p class="text-gray-300">{{authStore?.user?.name}}</p>
            <p class="font-medium text-lg">{{authStore?.role}}</p>
          </div>
          <button
          class="p-2 rounded-full hover:bg-red-700 hover:text-white text-red-500 transition-colors flex items-center gap-1"
          @click="logoutUser"
          > <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"></path></svg>

          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/AuthStore";
import { useRouter, useRoute } from 'vue-router'

defineProps({
  sidebarOpen: Boolean
});

defineEmits(['toggle-sidebar']);

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const logoutUser = () => {
  authStore.logout()
  router.push(`/`)
}
</script>

<style scoped>
/* Remove the old CSS styles since we're using exact-active-class attribute */
</style>
