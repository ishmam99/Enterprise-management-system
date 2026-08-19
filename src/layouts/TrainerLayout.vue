<template>
  <div>
    <div
      class="h-[80px]  w-full flex justify-between bg-[url('/src/assets/images/bg.webp')] bg-cover bg-no-repeat items-center text-black fixed top-0 z-40 duration-300">
      <div
        class="flex items-center justify-between w-full gap-8 px-10 h-[80px]  bg-gradient-to-r from-sky-600/50 to-purple-500/50   text-sm  font-semibold">
        <div class="flex justify-between w-full items-center">
          <div class="flex rounded-lg p-2  gap-2">


            <img src="/src/assets/images/HHi-tech_softsys_Logo_Black.png" alt="Logo" class="w-16  m-auto" />
            <div class="space-y-[-10px]">
              <p class="text-white font-bold text-nowrap w-32 shadow-lg text-3xl">Hi-Tech</p>
              <p class="text-red-700 font-bold text-nowrap w-32 shadow-lg text-3xl">SoftSys</p>
            </div>
          </div>
          <div class="flex items-center justify-center w-full gap-4">
            <!-- <h1 class="text-2xl uppercase font-bold text-white px-2 mx-10 rounded-r-lg  bg-sky-700 drop-shadow-md">
              Trainer Dashboard
            </h1> -->
            <div class="flex flex-col gap-1 items-center ms-10">
              <span
                class=" bg-white text-3xl text-center flex uppercase font-bold text-red-600  text-nowrap py-1 px-2 rounded-lg drop-shadow-md">
                <img v-if="authStore.companyName == 'Bell Textron'" src="/src/assets/images/bell.png" class="w-12" />
                {{ authStore.companyName }}</span>
            </div>
            <!-- </div> -->
          </div>
        </div>


        <!-- Dropdown-->
        <div class="flex items-center justify-end gap-4 w-4/12">
          <!-- Customer Success Team dropdown -->
          <div class="relative" @mouseenter="dropdownOpen = true" @mouseleave="dropdownOpen = false">
            <button
              class="bg-white px-4 py-3 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-4 shadow-sm">
              <Icon name="material-symbols:groups" class="text-lg" />
              <span class="font-semibold text-gray-700">Select Company - Customer Success Team</span>

              <!-- Arrow -->
              <svg class="w-4 h-4 transition-transform duration-300" :class="dropdownOpen ? 'rotate-180' : ''"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <!-- Dropdown -->
            <transition name="fade-slide">
              <div v-show="dropdownOpen"
                class="absolute mt-3 right-0 bg-gray-900/95 backdrop-blur-lg text-white rounded-xl shadow-2xl w-96 z-50 overflow-hidden border border-gray-700">
                <p class="px-4 py-2 text-xs text-gray-400 uppercase tracking-wide border-b border-gray-700">
                  Select Company
                </p>

                <router-link v-for="team in myTeams" :key="team.id" :to="'/trainer'">
                  <div class="flex items-center gap-2 px-4 py-3 hover:bg-blue-600/20 transition-all duration-200 group"
                    @click="authStore.setTeamId(team.id), authStore.setCompanyName(team.company?.name), authStore.setCompanyId(team.company?.id)">
                    <span class="h-2 w-2 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition"></span>
                    <span class="group-hover:translate-x-1 transition-transform duration-200">
                      Team: {{ team.name }} <br> Company: {{ team.company?.name }}
                    </span>

                  </div>
                </router-link>
              </div>
            </transition>
          </div>

          <!-- <div class="hover:bg-red-600 bg-white  text-red-600 hover:text-white px-4 py-2 cursor-pointer rounded-lg"
            @click="authStore.logout(), router.push('/login/userLogin')">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path
                d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z">
              </path>
            </svg>
          </div> -->
        </div>


      <div class="hover:bg-red-600 bg-white  text-red-600 hover:text-white px-4 py-3 cursor-pointer rounded-lg"
          @click="router.push('/login/adminLogin'), authStore.logout()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path
              d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z">
            </path>
          </svg>
      </div>


      </div>
    </div>
    <div class="flex pt-[80px]">
      <transition enter-active-class="transition-all duration-500 ease-in-out"
        enter-from-class="opacity-0 translate-x-10" enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition-all duration-500 ease-in-out" leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 translate-x-10">
        <Sidebar v-if="sideBarActive" :activeTab="activeTab" @change-tab="(tab) => changeTab(tab)" />
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
import Sidebar from '@/components/TrainerSidebar.vue'
import { useTrainerStore } from '@/pages/trainer/stores/trainerStore'
const store = useTrainerStore()
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

const dropdownOpen = ref(false)


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

onMounted(() => {
  if (!['trainer'].includes(authStore.role)) {
    router.push({ name: 'errors-not-authorized' })
  }
  fetchMyTeams()
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
