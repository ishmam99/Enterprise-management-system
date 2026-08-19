<template>
  <div
    class="bg-gray-300 bg-cover w-1/5 min-w-[300px] min-h-screen sticky top-[80px] shadow-2xl"
  >
    <div class="bg-gray-300 p-5 h-full flex flex-col font-semibold text-lg backdrop-blur-sm">
<p class="bg-red-500"></p>
     <!-- <UserDashboardInfo /> -->
        <!-- {{ store.currentSubMenu  }} -->


       <div class="bg-white/90 backdrop-blur-sm rounded-xl p-4 mb-4 shadow-sm">
      <h4 class="font-bold text-center text-sm text-sky-700 mb-3 pb-2 border-b border-sky-100">
        Partner Management Dashboard
      </h4>
      <div class="flex justify-center">
        <div
          class="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-sky-600 to-blue-600 text-white text-sm font-medium rounded-full shadow-sm">
          <i class="ri-user-line"></i>
          {{ store?.user?.name }}
        </div>
      </div>
    </div>

    <!-- Dashboard Button -->
    <router-link to="/partner_management"
      class="flex items-center justify-center mb-4 bg-white text-purple-600 hover:from-purple-600 hover:to-purple-700  font-medium py-2.5 px-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md">
      <i class="ri-dashboard-line mr-2"></i>
      {{ teamData?.company?.name || 'Dashboard' }}
    </router-link>

      <div class="space-y-3 mt-4">
        <div
          v-for="menu in menus"
          :key="menu.id"
          class="accordion-group bg-white rounded-xl transition-all duration-300 hover:transform hover:scale-[1.02]"
        >
          <div
            v-if="activeTab === menu?.id || activeTab === 'All'"
            class="flex items-center text-sky-700 justify-between w-full p-4 border border-white/30 rounded-xl transition-all duration-300 group shadow-lg"
            :class="openSection === menu.id
              ? 'bg-white text-sky-800 shadow-xl'
              : 'bg-white hover:to-pink-600 text-blue-800 hover:shadow-xl'"
            @click="toggleAccordion(menu.id,menu.hasdb)"
          >
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-xl backdrop-blur-sm shadow-sm" :class="`bg-${menu.iconColor}-500`">
                <i class="text-white text-lg" :class="menu.icon"></i>
              </div>
              <span class="font-semibold drop-shadow-sm">{{ menu.title }}</span>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
              class="transition-transform duration-300 transform"
              :class="{'rotate-180': openSection === menu.id}"
            >
              <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"/>
            </svg>
          </div>

          <div
            v-if="activeTab === menu.id || (activeTab == 'All' && currentAccordions === menu.id)"
            class="ml-4 bg-white mt-2 space-y-2 border-l-2 border-white/30 pl-4"
          >
            <template v-if="menu.links">
              <router-link
                v-for="link in menu.links"
                :key="link.to"
                :to="link.to"
                class="flex items-center text-sky-800 gap-3 p-3 text-sm rounded-xl transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-md group border border-blue-400 hover:border-white/20"
                active-class="router-link-active bg-blue-500 text-white border border-cyan-400/30 shadow-md"
              >
                <div class="p-1.5 rounded-lg  group-hover:bg-white/20 transition-colors" :class="`bg-${menu.iconColor}-500`">
                  <i :class="link.icon" class="text-white"></i>
                </div>
                <span class="font-medium">{{ link.text }}</span>
              </router-link>
            </template>

            <template v-if="menu.groups">
              <div v-for="group in menu.groups" :key="group.key" class="accordion-group rounded-lg">
                <button
                  v-if="store.currentMenu == 'My Industry Solution Management' && store.currentSubMenu != group"
                  @click="toggleNested(group.key)"
                  class="flex items-center justify-between w-full p-3 text-white/90 rounded-xl transition-all duration-300 hover:bg-white/20 group border border-transparent hover:border-white/20 hover:text-white hover:shadow-md"
                >
                  <div class="flex items-center gap-3">
                    <div class="p-1.5 rounded-lg group-hover:bg-white/20 transition-colors" :class="`bg-${menu.iconColor}-500`">
                      <i v-if="!group.icon" class="ri-add-line text-cyan-300"></i>
                      <i v-else :class="group.icon" class="text-cyan-300"></i>
                    </div>
                    <span class="text-base text-start font-medium">{{ group.title }}</span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="transition-transform duration-300"
                    :class="{'rotate-180': dropdown === group.key}"
                  >
                    <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"/>
                  </svg>
                </button>

                <button
                  v-else
                  @click="toggleNested(group.key)"
                  class="flex items-center justify-between w-full p-3 text-white/90 rounded-xl transition-all duration-300 hover:bg-white/20 group border border-transparent hover:border-white/20 hover:text-white hover:shadow-md"
                >
                  <div class="flex items-center gap-3">
                    <div class="p-1.5 rounded-lg  group-hover:bg-white/20 transition-colors" :class="`bg-${menu.iconColor}-500`">
                      <i v-if="!group.icon" class="ri-add-line text-cyan-300"></i>
                      <i v-else :class="group.icon" class="text-cyan-300"></i>
                    </div>
                    <span class="text-base text-start font-medium">{{ group.title }}</span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="transition-transform duration-300"
                    :class="{'rotate-180': dropdown === group.key}"
                  >
                    <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"/>
                  </svg>
                </button>

                <div v-show="dropdown === group.key || store.currentSubMenu == group.key" class="ml-4 mt-2 space-y-2 border-l-2 border-white/30 pl-4">
                  <router-link
                    v-for="link in group.links"
                    :key="link.to"
                    :to="link.to"
                    class="flex items-center gap-3 p-3 text-sm text-white/90 rounded-xl transition-all duration-300 hover:bg-white/20 hover:text-white hover:shadow-md group border border-transparent hover:border-white/20"
                    active-class="router-link-active bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-white border border-emerald-400/30 shadow-md"
                  >
                    <div class="p-1.5 rounded-lg  group-hover:bg-white/20 transition-colors" :class="`bg-${menu.iconColor}-500`">
                      <i :class="link.icon" class="text-emerald-300"></i>
                    </div>
                    <span class="font-medium">{{ link.text }}</span>
                  </router-link>

                  <template v-if="group.sub_groups">
                    <div v-for="sub_groups in group.sub_groups" :key="sub_groups.key" class="accordion-group rounded-lg">
                      <button
                        @click="toggleSubNested(sub_groups.key)"
                        class="flex items-center justify-between w-full p-3 text-white/90 rounded-xl transition-all duration-300 hover:bg-white/20 group border border-transparent hover:border-white/20 hover:text-white hover:shadow-md"
                      >
                        <div class="flex items-center gap-3">
                          <div class="p-1.5 rounded-lg  group-hover:bg-white/20 transition-colors" :class="`bg-${menu.iconColor}-500`">
                            <i v-if="!sub_groups.icon" class="ri-add-line text-amber-300"></i>
                            <i v-else :class="sub_groups.icon" class="text-amber-300"></i>
                          </div>
                          <span class="text-base text-start font-medium">{{ sub_groups.title }}</span>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="transition-transform duration-300"
                          :class="{'rotate-180': subDropdown === sub_groups.key}"
                        >
                          <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"/>
                        </svg>
                      </button>

                      <div v-show="subDropdown === sub_groups.key" class="ml-4 mt-2 space-y-2 border-l-2 border-white/30 pl-4">
                        <router-link
                          v-for="link in sub_groups.links"
                          :key="link.to"
                          :to="link.to"
                          class="flex items-center gap-3 p-3 text-sm text-white/90 rounded-xl transition-all duration-300 hover:bg-white/20 hover:text-white hover:shadow-md group border border-transparent hover:border-white/20"
                          active-class="router-link-active bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-white border border-amber-400/30 shadow-md"
                        >
                          <div class="p-1.5 rounded-lg  group-hover:bg-white/20 transition-colors" :class="`bg-${menu.iconColor}-500`">
                            <i :class="link.icon" class="text-amber-300"></i>
                          </div>
                          <span class="font-medium">{{ link.text }}</span>
                        </router-link>
                         <template v-if="sub_groups.sub_sub_groups">
              <div v-for="sub_sub_group in sub_groups.sub_sub_groups" :key="sub_sub_group.key" class="accordion-group">
                <button
                  @click="toggleSubSubNested(sub_sub_group.key)"
                  class="flex items-center justify-between w-full p-2 text-white rounded-lg transition-all duration-300 hover:bg-gray-200 group hover:text-blue-900"
                >
                  <div class="flex items-center gap-2">

                    <svg v-if="!sub_sub_group.icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"/>
                    </svg>
                    <!-- <i v-else :class="sub_groups.icon"></i> -->
                    <i v-else class=" text-white py-1 px-2 rounded-md" :class="`${sub_sub_group.icon} bg-${menu.iconColor}-500`"></i>
                    <span class="text-base text-start">{{ sub_sub_group.title }}</span>
                  </div>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                    :class="{'rotate-180 transition-transform duration-300': dropdown === sub_sub_group.key}"
                  >
                    <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"/>
                  </svg>
                </button>

                <div v-show="subsubDropdown === sub_sub_group.key" class="ml-4 mt-1 space-y-1 border-l-2 border-gray-300 pl-3">

                  <router-link
                    v-for="link in sub_sub_group.links"
                    :key="link.to"
                    :to="link.to"
                    class="flex items-center gap-2 p-2 text-sm rounded-lg transition-all text-white duration-300 hover:bg-gray-200 hover:text-[#2e318a]"
                    active-class="router-link-active"
                  >
                     <i  class=" text-white py-1 px-2 rounded-md" :class="`${link.icon} bg-${menu.iconColor}-500`"></i>

                    {{ link.text }}
                  </router-link>

                </div>
              </div>
            </template>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <button
        type="button"
                class="py-3 px-6 mt-6 w-full bg-gradient-to-r from-red-600 to-pink-600 rounded-xl text-white font-semibold transition-all duration-300 hover:from-red-700 hover:to-pink-700 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2"
      @click="store.logout(),router.push('/login/adminLogin')" >
        <i class="ri-logout-box-r-line" ></i>
        Log Out
      </button>

      <div class="flex flex-col gap-2 overflow-hidden mt-6">
        <div class="text-center text-white/60 text-xs pt-4 border-t border-white/20">

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
// import { useAuthStore } from '/src/stores/AuthStore'
import UserDashboardInfo from '@/components/UserDashboardInfo.vue'
import { useUserStore } from '@/pages/user/stores/userStore'
import { useAuthStore } from '@/stores/AuthStore'
// import { useOperationStore } from '../stores/accountStore'

const props = defineProps({
  activeTab: {
    type: String,
    default: 'All'
  }
})
const emit = defineEmits(['changeTab'])


const store = useAuthStore()
const router = useRouter()
// const operationStore = useOperationStore()
const dropdown = ref('')
const subDropdown = ref('')
const currentAccordions = ref('')
const openSection = currentAccordions

const subsubDropdown = ref('')
function toggleSubSubNested(key) {
  subsubDropdown.value = subsubDropdown.value === key ? '' : key
}
function toggleAccordion(name,hasdb) {
  if(hasdb)
  emit('changeTab',name)
  if (name === currentAccordions.value) {
    currentAccordions.value = ''
    dropdown.value = ''
  } else {
    currentAccordions.value = name
    dropdown.value = ''
  }
}

function toggleNested(key) {
  dropdown.value = dropdown.value === key ? '' : key
}
function toggleSubNested(key) {
  subDropdown.value = subDropdown.value === key ? '' : key
}
// watch(
//   () => store.isAuthenticated,
//   (newVal) => {
//     if (!newVal) router.push('/')
//   }
// )

/*
  Menu structure:
  - id: top-level name used in activeTab checks
  - title: visible title
  - icon: icon class (uses remix-icon / font-awesome if available)
  - links: simple list
  - groups: nested dropdown groups (key used to toggle)
*/
const menus = [

  {
    id: 'Partner Creation',
    title: 'Partner Creation',
    icon: 'ri-auction-line',
    hasdb:false,
    iconColor: 'yellow',
links: [

          { to: '/partner_management/partner/create',icon: 'ri-add-circle-line', text: 'Create Partner Account' },
          { to: '/partner_management/partner/approve',icon: 'ri-add-circle-line', text: 'Approve Partner Account' },

        ]
  },
  {
    id: 'Partner List',
    title: 'Partner List',
    icon: 'ri-auction-line',
    hasdb:false,
    iconColor: 'red',
links: [

          { to: '/partner_management/partner/pendingList',icon: 'ri-add-circle-line', text: 'Created Partners List' },
          { to: '/partner_management/partner/activeList',icon: 'ri-add-circle-line', text: 'Active Partners List' },

        ]
  },
  {
    id: 'Partner Customer',
    title: 'Partner Customers & Users',
    icon: 'ri-auction-line',
    hasdb:false,
    iconColor: 'blue',
links: [

          { to: '/partner_management/partner/customerIndividual',icon: 'ri-add-circle-line', text: 'Customer List By Partners' },
          { to: '/partner_management/partner/usersIndividual',icon: 'ri-add-circle-line', text: 'Users List By Partners' },

        ]
  },
  {
    id: 'Partner Customer',
    title: 'Partner Software & Solutions',
    icon: 'ri-auction-line',
    hasdb:false,
    iconColor: 'blue',
links: [

          { to: '/partner_management/partner/softwareList',icon: 'ri-add-circle-line', text: 'Software List By Partners' },
          { to: '/partner_management/partner/solutionList',icon: 'ri-add-circle-line', text: 'Solution List By Partners' },

        ]
  },





]

</script>
<!-- 
<style scoped>
.router-link-active {
  background-color: #3a3da8;
  color: white;
  border-radius: 0.375rem;
  /* padding: 0.5rem; */
  transition:
    background-color 0.3s,
    color 0.3s;
}
</style> -->
