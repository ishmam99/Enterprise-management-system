<template>
  <div>
    <!-- ================= TOP ROLE BASED SYSTEM TABS ================= -->
    <header
      class="fixed flex flex-col top-0 left-0 w-full z-40 bg-[url('/src/assets/images/bg.webp')] bg-cover bg-no-repeat"
    >
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
        <router-link to="/" class="flex items-center gap-2">
          <img src="/src/assets/images/HHi-tech_softsys_Logo_Black.png" class="w-12" />
          <div class="leading-none flex flex-col">
            <p class="text-white font-bold text-2xl">Hi-Tech</p>
            <p class="text-red-700 font-bold text-2xl">SoftSys</p>
          </div>
        </router-link>

        <!-- CENTER : TITLE -->
        <h1
          class="text-xl text-center uppercase font-bold text-white text-nowrap py-1 bg-sky-700 rounded-lg drop-shadow-md"
        >
          <span v-if="authStore.role === 'sales-executive' || authStore.role === 'sales-executive'">
            Training Management – Sales Dashboard</span
          >
          <span v-else>Training Management System</span>
        </h1>

        <!-- RIGHT : ACTIONS -->
        <div class="flex items-center justify-end gap-4">
          <div
            class="hover:bg-red-600 bg-white text-red-600 hover:text-white px-4 py-2 cursor-pointer rounded-lg"
            @click="authStore.logout(), router.push('/login/adminLogin')"
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
          </div>
        </div>
      </div>
    </header>
    <div
      class="flex justify-between"
      :class="
        authStore.role == 'sales-executive' || authStore.role == 'sales-executive'
          ? 'mt-[130px]'
          : 'mt-[70px]'
      "
    >
      <transition
        enter-active-class="transition-all duration-500 ease-in-out"
        enter-from-class="opacity-0 translate-x-10"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition-all duration-500 ease-in-out"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 translate-x-10"
      >
        <Sidebar
          v-if="sideBarActive"
          :activeTab="activeTab"
          @change-tab="(tab) => changeTab(tab)"
        />
      </transition>
      <!-- <transition
      mode="out-in"
      enter-active-class="transition-all duration-500 ease-in-out"
      enter-from-class="opacity-0 translate-x-10"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition-all duration-500 ease-in-out"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 translate-x-10"
    > -->
      <RouterView :activeTab="activeTab" @set-tab="(tab) => setTab(tab)" />
      <!-- </transition> -->
    </div>
  </div>
</template>
<script setup>
// import HrSidebar from '/src/views/Hr/HrSidebar.vue'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'
import Sidebar from '@/components/TrainingSidebar.vue'
import { useTrainingStore } from '@/pages/training_management/stores/trainingStore'
const store = useTrainingStore()
const authStore = useAuthStore()
const tabs = ['All', 'Bid Management', 'Vendor Management', 'Purchase', 'Supply Chain Team']
const activeTab = ref(store.currentMenu || 'All')
const router = useRouter()
const sideBarActive = ref(true)
const route = useRoute()
const solutions = ref([])
// watch(
//   () => authStore.isAuthenticated,
//   (newIsAuthenticated) => {
//     console.log(newIsAuthenticated)

//     if (!newIsAuthenticated) {
//       router.push('/')
//     }
//   }
// )

const logoutUser = () => {
  authStore.logout()
  router.push(`/login/adminLogin`)
}

onMounted(() => {
  if (
    !['training-director', 'training-executive', 'training-manager', 'sales-executive'].includes(
      authStore.role
    )
  ) {
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
