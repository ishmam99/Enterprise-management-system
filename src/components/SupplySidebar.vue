<template>
  <div
    class="bg-[url('/src/assets/image/common/bg-pattern.jpg')] bg-cover w-1/5 min-w-[300px] min-h-screen sticky top-[80px]"
  >
    <div class="bg-[#a4cef1] p-5 h-full flex flex-col font-semibold text-lg backdrop-blur-sm">

     <!-- <UserDashboardInfo /> -->


      <div class="space-y-2 mt-4">
        <div
          v-for="menu in menus"
          :key="menu.id"

          class="accordion-group bg-sky-600 rounded-xl "
        >

          <div   v-if="activeTab === menu?.id || activeTab === 'All'"
            class="flex items-center text-white justify-between w-full p-3 rounded-xl transition-all duration-300 group"
            :class="openSection === menu.id ? 'bg-[#2e318a] text-white shadow-md' : 'hover:bg-[#2e318a] hover:text-white hover:shadow-md bg-[#2e318a] text-white shadow-md'"
            @click="toggleAccordion(menu.id)"
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

                <div v-show="dropdown === group.key" class="ml-4 mt-1 space-y-1 border-l-2 border-gray-300 pl-3">
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
        @click="store.logout()"
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
import { useAuthStore } from '/src/stores/AuthStore'
// import UserDashboardInfo from '@/components/UserDashboardInfo.vue'
// import { useOperationStore } from '../stores/accountStore'

const props = defineProps({
  activeTab: {
    type: String,
    default: 'All'
  }
})

const store = useAuthStore()
const router = useRouter()
// const operationStore = useOperationStore()
const dropdown = ref('')
const subDropdown = ref('')
const currentAccordions = ref('')
const openSection = currentAccordions

function toggleAccordion(name) {
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
    id: 'Bid Management',
    title: 'Bid Management',
    icon: 'ri-auction-line',
    iconColor: 'green',
    groups:[

      {
        key: 'Purchase Category',
        title: 'Purchase Category',
        icon: 'ri-price-tag-3-line',
        links: [
          { to: '/supply/create-purchase-category',icon: 'ri-add-circle-line', text: 'Create Purchase Category' },
          { to: '/supply/pending-purchase-category',icon:'ri-list-check', text: 'Pending Purchase Category' },
          { to: '/supply/active-purchase-category',icon:'ri-list-check', text: 'Active Purchase Category' },
          { to: '/supply/all-purchase-category',icon:'ri-list-check', text: 'All Purchase Category' },
        ]

    },
    {
        key: 'Bid Creation',
        title: 'Bid Creation',
        icon:'ri-add-circle-line',
        links: [
          { to: '/supply/create-bid',icon: 'ri-add-circle-line',text: 'Create Bid' },
          { to: '/supply/approve-bid',icon:'ri-list-check', text: 'Approve Bid' },
          { to: '/supply/post-bid',icon:'ri-list-check', text: 'Post Bid' },
          { to: '/supply/posted-bids',icon:'ri-list-check', text: 'Posted Bids' },
          { to: '/supply/Update-bid-status',icon:'ri-list-check', text: 'Update Bid Status' },

        ],

    },
    {
        key: 'Bid List',
        title: 'Bid List',
        icon:'ri-list-check',
        links: [
          { to: '/supply/current-bid-list',icon:'ri-list-check', text: 'Current Bid List' },
          { to: '/supply/pending-bid-list',icon:'ri-list-check', text: 'Pending Bid List' },
          { to: '/supply/approved-bid-list',icon:'ri-list-check', text: 'Approved Bid List' },
          { to: '/supply/completed-bid-list',icon:'ri-list-check', text: 'Completed Bid List' },
        ],

    },
    {
        key: 'Bid Selection',
        title: 'Bid Selection',
        icon:'ri-radio-button-line',
        links: [
          { to: '/supply/new-applied-bids',icon:'ri-list-check', text: 'New Applied Bids' },
          { to: '/supply/bids-in-review',icon:'ri-list-check', text: 'Bids In Review' },
          { to: '/supply/bids-winner',icon:'ri-list-check', text: 'Bids Winner' },
          { to: '/supply/bids-loser',icon:'ri-list-check', text: 'Bids Loser' },
        ],

    },
  ]

  },

  //Vendor Management
  {
    id: 'Vendor Management',
    title: 'Vendor Management',
    icon: 'ri-store-2-line',
    iconColor: 'yellow',
    groups:[

      {
        key: 'Vendor Hiring',
        title: 'Vendor Hiring',
        icon: 'ri-user-add-line',
        links: [
          { to: '/supply/new-applicants',icon:'ri-user-add-line', text: 'New Applicants' },
          { to: '/supply/vendor-in-review',icon:'ri-list-check', text: 'Vendor In Review' },
          { to: '/supply/approve-vendor',icon:'ri-list-check', text: 'Approve vendor' }
        ]
      },

    {
        key: 'Vendor Listing',
        title: 'Vendor Listing',
        icon: 'ri-file-list-3-line',
        links: [
          { to: '/supply/registered-vendor-list',icon:'ri-pencil-line', text: 'Registered Vendor list' },
          { to: '/supply/active-vendor-list',icon:'ri-checkbox-circle-line', text: 'Active Vendor list' },
          { to: '/supply/preferred-vendor-list',icon:'ri-list-check', text: 'Preferred Vendor list' },
        ]
      },
  ]

  },

  //Purchase
  {
    id: 'Purchase',
    title: 'Purchase',
    icon: 'ri-shopping-cart-line',
    iconColor: 'red',
    groups:[
    {
        key: 'Purchase Creation',
        title: 'Purchase Creation',
        icon: 'ri-add-circle-line',
        links: [
          { to: '/supply/create-purchase',icon: 'ri-add-circle-line', text: 'Create Purchase'},
          { to: '/supply/approve-purchase',icon: 'ri-list-check', text: 'Approve Purchase'},
          { to: '/supply/receive-purchase',icon: 'ri-list-check', text: 'Receive Purchase'},
          { to: '/supply/complete-purchase',icon: 'ri-list-check', text: 'Complete Purchase'},

        ]
      },
  {
        key: 'Purchase List',
        title: 'Purchase List',
        icon:'ri-list-check',
        links: [
          { to: '/supply/vendor-wise-purchase-list',icon: 'ri-list-check', text: 'vendor Wise Purchase List'},
          { to: '/supply/category-wise-purchase-list',icon: 'ri-list-check', text: 'Category Wise Purchase List'},
          { to: '/supply/all-purchase-list', icon: 'ri-list-check', text: 'All Purchase List' },
          { to: '/supply/completed-purchase',icon: 'ri-list-check', text: 'Completed Purchase'},
        ]
    },
  ]

  },

  {
    id: 'Supply Chain Team',
    title: 'Supply Chain Team',
    icon: 'ri-team-line',
    iconColor: 'teal',
    groups:[
    {
        key: 'Supply Chain Team - Manager',
        title: 'Supply Chain Team - Manager',
        icon: 'ri-team-line',
        links: [
          { to: '/supply/create-supply-chain-manager',icon: 'ri-add-circle-line', text: 'Create Supply Chain Manager' },
          { to: '/supply/supply-chain-manager-list',icon: 'ri-list-check', text: 'Supply Chain Manager list' },
        ]
      },
  {
        key: 'Supply Chain Team - Executive',
        title: 'Supply Chain Team - Executive',
        icon: 'ri-team-line',
        links: [
          { to: '/supply/create-supply-chain-executive',icon: 'ri-add-circle-line', text: 'Create Supply Chain Executive' },
          { to: '/supply/supply-chain-executive-list',icon: 'ri-list-check', text: 'Supply Chain Executive list' },
        ]
      },
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
