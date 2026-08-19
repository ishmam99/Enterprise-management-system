src/components/PMSidebar.vue<template>
  <div
    class="bg-[url('/src/assets/images/sidebg1.jpg')] bg-contain w-1/5 min-w-[300px] min-h-screen sticky top-[80px]"
  >
    <div class="bg-[#a4cef125] p-5 h-full flex flex-col font-semibold text-lg ">

     <!-- <UserDashboardInfo /> -->
        <!-- {{ store.currentSubMenu  }} -->

              <div class="mb-2 bg-cyan-100 rounded-md px-2 space-y-1 py-2">
         <h4 class="font-bold text-center text-md shadow-xl p-1 rounded-b-md bg-white text-[#2e828a]">
           <!-- {{ store?.role.match(/[A-Z][a-z]+$|[A-Z]+$/)?.[0] }} -->
           Partner Management Dashboard
           </h4>

           <h2 class="font-bold flex justify-start items-center gap-2 text-center text-sm text-sky-700">
           <div class="p-1 px-2 rounded-full bg-sky-700 text-white items-center mx-auto">
            <i class="ri-user-line"></i> Partner Management Director
           </div>
            <!-- {{ store?.user?.name }} -->
           </h2>

      </div>

      <div class="space-y-2 mt-4">
        <div
          v-for="menu in menus"
          :key="menu.id"

          class="accordion-group bg-sky-600 rounded-xl "
        >

          <div   v-if="activeTab === menu?.id || activeTab === 'All'"
            class="flex items-center text-white justify-between w-full p-3 border border-white rounded-xl transition-all duration-300 group"
            :class="openSection === menu.id ? 'bg-[#2e318a] text-white shadow-md' : 'hover:bg-[#2e318a] hover:text-white hover:shadow-md bg-[#2e318a] text-white shadow-md'"
            @click="toggleAccordion(menu.id,menu.hasdb)"
          >
            <div class="flex items-center gap-3">
              <i class=" text-white py-1 px-2 rounded-md" :class="`${menu.icon} bg-${menu.iconColor}-500`"></i>
              <span>{{ menu.title }}</span>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
              :class="{'rotate-180 transition-transform duration-300': openSection === menu.id}"
            >
              <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"/>
            </svg>
          </div>


          <div
            v-if="activeTab === menu.id ||(activeTab == 'All' && currentAccordions === menu.id)"
            class="ml-4 mt-1 space-y-1 border-l-2 border-gray-300 pl-3"
          >

            <template v-if="menu.links">
              <router-link
                v-for="link in menu.links"
                :key="link.to"
                :to="link.to"
                class="flex items-center text-white gap-2 p-2 text-sm rounded-lg transition-all duration-300 hover:bg-gray-200 hover:text-[#2e318a]"
                active-class="router-link-active"
              >
               <i class=" text-white py-1 px-2 rounded-md" :class="`${link.icon} bg-${menu.iconColor}-500`"></i>
               <!-- <i :class="link.icon"></i> -->
                {{ link.text }}
              </router-link>
            </template>


            <template v-if="menu.groups">

              <div v-for="group in menu.groups" :key="group.key" class="accordion-group">
                <button
                  v-if="store.currentMenu == 'My Industry Solution Management' &&  store.currentSubMenu != group"
                  @click="toggleNested(group.key)"
                  class="flex items-center justify-between w-full p-2 text-white rounded-lg transition-all duration-300 hover:bg-gray-200 group hover:text-blue-900"
                >
                  <div class="flex items-center gap-2">

                    <svg v-if="!group.icon" xmlns="http://www.w3.org/2000/svg" class=" text-white py-1 px-2 rounded-md" :class="` bg-${menu.iconColor}-500`" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"/>
                    </svg>
                    <!-- <i v-else :class="group.icon"></i> -->
                    <i  v-else  class=" text-white py-1 px-2 rounded-md" :class="`${group.icon} bg-${menu.iconColor}-500`"></i>
                    <span class="text-base text-start">{{ group.title }}</span>
                  </div>
                  {{ group.groups }}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                    :class="{'rotate-180 transition-transform duration-300': dropdown === group.key}"
                  >
                    <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"/>
                  </svg>
                </button>
                <button
                  v-else
                  @click="toggleNested(group.key)"
                  class="flex items-center justify-between w-full p-2 text-white rounded-lg transition-all duration-300 hover:bg-gray-200 group hover:text-blue-900"
                >
                  <div class="flex items-center gap-2">

                    <svg v-if="!group.icon" xmlns="http://www.w3.org/2000/svg" class=" text-white py-1 px-2 rounded-md" :class="` bg-${menu.iconColor}-500`" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"/>
                    </svg>
                    <!-- <i v-else :class="group.icon"></i> -->
                    <i  v-else  class=" text-white py-1 px-2 rounded-md" :class="`${group.icon} bg-${menu.iconColor}-500`"></i>
                    <span class="text-base text-start">{{ group.title }}</span>
                  </div>
                  {{ group.groups }}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                    :class="{'rotate-180 transition-transform duration-300': dropdown === group.key}"
                  >
                    <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"/>
                  </svg>
                </button>

                <div v-show="dropdown === group.key || store.currentSubMenu == group.key" class="ml-4 mt-1 space-y-1 border-l-2 border-gray-300 pl-3">
                  <router-link
                    v-for="link in group.links"
                    :key="link.to"
                    :to="link.to"
                    class="flex items-center gap-2 p-2 text-sm rounded-lg transition-all text-white duration-300 hover:bg-gray-200 hover:text-[#2e318a]"
                    active-class="router-link-active"
                  >
                     <i  class=" text-white py-1 px-2 rounded-md" :class="`${link.icon} bg-${menu.iconColor}-500`"></i>
                    {{ link.text }}
                  </router-link>
                  <template v-if="group.sub_groups">
              <div v-for="sub_groups in group.sub_groups" :key="sub_groups.key" class="accordion-group">
                <button
                  @click="toggleSubNested(sub_groups.key)"
                  class="flex items-center justify-between w-full p-2 text-white rounded-lg transition-all duration-300 hover:bg-gray-200 group hover:text-blue-900"
                >
                  <div class="flex items-center gap-2">

                    <svg v-if="!sub_groups.icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"/>
                    </svg>
                    <!-- <i v-else :class="sub_groups.icon"></i> -->
                    <i v-else class=" text-white py-1 px-2 rounded-md" :class="`${sub_groups.icon} bg-${menu.iconColor}-500`"></i>
                    <span class="text-base text-start">{{ sub_groups.title }}</span>
                  </div>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                    :class="{'rotate-180 transition-transform duration-300': dropdown === sub_groups.key}"
                  >
                    <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"/>
                  </svg>
                </button>

                <div v-show="subDropdown === sub_groups.key" class="ml-4 mt-1 space-y-1 border-l-2 border-gray-300 pl-3">
                  <router-link
                    v-for="link in sub_groups.links"
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
      </div>


      <button
        type="button"
        @click="logout()"
        class="py-2 px-5 mt-4 w-1/2 bg-red-800 rounded-md text-white duration-300"
      >
        Log Out
      </button>


      <div class="flex flex-col gap-2 overflow-hidden mt-4"></div>
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


const store = useUserStore()
const router = useRouter()
// const operationStore = useOperationStore()
const dropdown = ref('')
const subDropdown = ref('')
const currentAccordions = ref('')
const openSection = currentAccordions
const authStore = useAuthStore()
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
const logout = () => {
 authStore.logout()
 router.push('/login/userLogin')
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
    id: 'Course ID',
    title: 'Course ID',
    icon: 'ri-auction-line',
    hasdb:false,
    iconColor: 'green',
     links: [
          { to: '/supply/create-purchase-category',icon: 'ri-add-circle-line', text: 'Create Course ID' },
          { to: '/supply/pending-purchase-category',icon:'ri-list-check', text: 'Approve Course ID' },
          { to: '/supply/active-purchase-category',icon:'ri-list-check', text: 'Broadcast Course ID' },
        ]

  },
  {
    id: 'Course Name',
    title: 'Course Name',
    icon: 'ri-auction-line',
    hasdb:false,
    iconColor: 'red',
     links: [
          { to: '/supply/create-purchase-category',icon: 'ri-add-circle-line', text: 'Create Course Name' },
          { to: '/supply/approve-purchase-category',icon:'ri-list-check', text: 'Pending Course Name' },
          { to: '/supply/Broadcast-purchase-category',icon:'ri-list-check', text: 'Broadcast Course Name' },
        ]

  },
  {
    id: 'Product',
    title: 'Product',
    icon: 'ri-auction-line',
    hasdb:false,
    iconColor: 'yellow',
     links: [
          { to: '/supply/create-purchase-category',icon: 'ri-add-circle-line', text: 'Create Product' },
          { to: '/supply/approve-purchase-category',icon:'ri-list-check', text: 'Pending Product' },
          { to: '/supply/Broadcast-purchase-category',icon:'ri-list-check', text: 'Broadcast Product' },
        ]

  },
  {
    id: 'Solution',
    title: 'Solution',
    icon: 'ri-auction-line',
    hasdb:false,
    iconColor: 'blue',
     links: [
          { to: '/supply/create-purchase-category',icon: 'ri-add-circle-line', text: 'Create Solution' },
          { to: '/supply/approve-purchase-category',icon:'ri-list-check', text: 'Pending Solution' },
          { to: '/supply/Broadcast-purchase-category',icon:'ri-list-check', text: 'Broadcast Solution' },
        ]

  },
  {
    id: 'Industry',
    title: 'Industry',
    icon: 'ri-auction-line',
    hasdb:false,
    iconColor: 'purple',
     links: [
          { to: '/supply/create-purchase-category',icon: 'ri-add-circle-line', text: 'Create Industry' },
          { to: '/supply/approve-purchase-category',icon:'ri-list-check', text: 'Pending Industry' },
          { to: '/supply/Broadcast-purchase-category',icon:'ri-list-check', text: 'Broadcast Industry' },
        ]

  },
  {
    id: 'Events',
    title: 'Events',
    icon: 'ri-auction-line',
    hasdb:false,
    iconColor: 'teal',
     links: [
          { to: '/supply/create-purchase-category',icon: 'ri-add-circle-line', text: 'Training' },
          { to: '/supply/approve-purchase-category',icon:'ri-list-check', text: 'Onsite' },
          { to: '/supply/Broadcast-purchase-category',icon:'ri-list-check', text: 'Online' },
          { to: '/supply/Broadcast-purchase-category',icon:'ri-list-check', text: 'Seminar' },
          { to: '/supply/Broadcast-purchase-category',icon:'ri-list-check', text: 'Conference' },
        ]

  },
  {
    id: 'Schedule',
    title: 'Schedule',
    icon: 'ri-auction-line',
    hasdb:false,
    iconColor: 'green',
     links: [
          { to: '/supply/Broadcast-purchase-category',icon:'ri-list-check', text: 'Seminar' },
          { to: '/supply/create-purchase-category',icon: 'ri-add-circle-line', text: 'Training' },
          { to: '/supply/Broadcast-purchase-category',icon:'ri-list-check', text: 'Conference' },
        ]

  },


]

</script>

<style scoped>
.router-link-active {
  background-color: #2e318a;
  color: white;
  border-radius: 0.375rem;
  padding: 0.5rem;
  transition:
    background-color 0.3s,
    color 0.3s;
}
</style>
