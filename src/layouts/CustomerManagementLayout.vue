<template>
  <div>
    <div
      class="h-[80px]  w-full flex justify-between  bg-gradient-to-r from-sky-500 to-cyan-500 items-center text-black fixed top-0 z-40 duration-300"
    >
      <div
        class="flex items-center justify-between w-full gap-10 px-10 h-[80px]    text-sm  font-semibold"
      >
        <div class="flex justify-between w-full items-center">
        <div class="flex rounded-lg p-2  gap-2">


         <img src="/src/assets/images/HHi-tech_softsys_Logo_Black.png" alt="Logo" class="w-16  m-auto" />
        <div class="space-y-[-10px] p-2 shadow-lg ">
          <p class="text-white font-bold text-nowrap w-32 text-3xl">Hi-Tech</p>
         <p class="text-red-700 font-bold text-nowrap w-32 text-3xl">SoftSys</p>
        </div>
        </div>
         <div class="flex items-center justify-center w-full gap-4">
          <h1 class="text-2xl uppercase font-bold text-white p-2 px-4 rounded-lg  bg-sky-700 drop-shadow-md">
              {{ authStore.role == "customer-manager" ? "Customer Manager Dashboard" : "Customer Management Dashboard" }}
          </h1>
        <!-- </div> -->
       </div>
       </div>

        <div
         class="hover:bg-red-600 bg-white  text-red-600 hover:text-white px-4 py-3 cursor-pointer rounded-lg"
          @click="router.push('/login/adminLogin'),authStore.logout()"

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
    <div class="flex pt-[80px] justify-between">
    <!-- <div class="flex"> -->
      <transition
        enter-active-class="transition-all duration-500 ease-in-out"
        enter-from-class="opacity-0 translate-x-10"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition-all duration-500 ease-in-out"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 translate-x-10"
      >
        <Sidebar v-if="sideBarActive" :activeTab="activeTab"  @change-tab="(tab)=>changeTab(tab)" />
      </transition>

      <RouterView class="w-full overflow-x-auto" :activeTab="activeTab" @set-tab="(tab)=>setTab(tab)"/>
      <!-- </transition> -->
    </div>
  </div>
</template>
<script setup>
// import HrSidebar from '/src/views/Hr/HrSidebar.vue'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'
import Sidebar from '@/components/sidebars/CustomerManagementSidebar.vue'
import { useCustomerManagementStore } from '@/pages/customer_management/stores/customerManagementStore'
const store = useCustomerManagementStore()
const authStore = useAuthStore()
const tabs = ['All', 'Bid Management', 'Vendor Management', 'Purchase', 'Supply Chain Team']
const activeTab = ref( store.currentMenu || 'All' )
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
onMounted(() => {
  if (!['customer-director','customer_management_system_director','customer-executive','customer-manager'].includes(authStore.role)) {
    router.push({name: 'errors-not-authorized'})
  }
})
const changeTab = (tab) => {
  console.log('here and there',tab)
  activeTab.value =tab
}
const setTab = (tab) => {
  console.log('here and there',tab)
  activeTab.value =tab
}
</script>
