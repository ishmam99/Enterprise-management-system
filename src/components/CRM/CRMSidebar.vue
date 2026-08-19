<template>
  <div class="bg-base-200 w-1/5 min-w-[300px] min-h-screen sticky top-[80px]">
    <div class="p-5 h-full flex flex-col font-semibold text-lg">
      <div class="mb-2 rounded-md px-2 space-y-1 py-2">
        <h4
          class="font-bold text-center text-md shadow-xl p-1 rounded-b-md bg-slate-100 text-[#2e828a]"
        >
         CRM Management
        </h4>
        {{ isInsideLeads }}
        <h2
          class="font-bold flex justify-start items-center gap-2 text-center text-sm text-sky-700"
        >
          <div class="p-1 px-2 rounded-full items-center mx-auto capitalize">
            <i class="ri-user-line"></i> {{ authStore?.role }}
          </div>
        </h2>
      </div>

      <div class="space-y-3 mt-4">
        <div v-for="menu in menus" :key="menu.id" class="accordion-group rounded-xl">
          <div
            v-if="activeTab === menu?.id || activeTab === 'All'"
            class="flex items-center justify-between w-full p-3 rounded-xl transition-all duration-300 group bg-sky-100 cursor-pointer"
            :class="
              openSection === menu.id
                ? ' shadow-md'
                : 'hover:bg-[#2e318a] hover:text-blue-400 hover:shadow-md   shadow-md'
            "
            @click="toggleAccordion(menu.id)"
          >
            <div class="flex items-center gap-3">
              <i class="py-1 px-2 rounded-md text-white" :class="`${menu.icon} bg-${menu.iconColor}-500`"></i>
              <span>{{ menu.title }}</span>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
              :class="{ 'rotate-180 transition-transform duration-300': openSection === menu.id }"
            >
              <path
                d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"
              />
            </svg>
          </div>

          <div
            v-if="activeTab === menu.id || (activeTab == 'All' && currentAccordions === menu.id)"
            class="ml-4 mt-1 space-y-1 border-l-2 border-gray-300 pl-3"
          >
            <template v-if="menu.links">
              <router-link
                v-for="link in menu.links"
                :key="link.to"
                :to="link.to"
                class="flex items-center gap-2 p-2 text-sm rounded-lg transition-all duration-300 hover:bg-gray-200 hover:text-[#2e318a]"
                active-class="router-link-active"
              >
                <i
                  class="py-1 px-2 rounded-md text-white"
                  :class="`${link.icon} bg-${menu.iconColor}-500`"
                ></i>
                <!-- <i :class="link.icon"></i> -->
                {{ link.text }}
              </router-link>
            </template>

            <template v-if="menu.groups">
              <div v-for="group in menu.groups" :key="group.key" class="accordion-group">
                <button
                  @click="toggleNested(group.key)"
                  class="flex items-center justify-between w-full p-2 rounded-lg transition-all duration-300 hover:bg-gray-200 group hover:text-blue-900"
                >
                  <div class="flex items-center gap-2">
                    <svg
                      v-if="!group.icon"
                      xmlns="http://www.w3.org/2000/svg"
                      class="py-1 px-2 rounded-md"
                      :class="` bg-${menu.iconColor}-500`"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="currentColor"
                    >
                      <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" />
                    </svg>
                    <i
                      v-else
                      class="py-1 px-2 rounded-md text-white"
                      :class="`${group.icon} bg-${menu.iconColor}-500`"
                    ></i>
                    <span class="text-base text-start">{{ group.title }}</span>
                  </div>
                  {{ group.groups }}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                    :class="{
                      'rotate-180 transition-transform duration-300': dropdown === group.key
                    }"
                  >
                    <path
                      d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"
                    />
                  </svg>
                </button>

                <div
                  v-show="dropdown === group.key"
                  class="ml-4 mt-1 space-y-1 border-l-2 border-gray-300 pl-3"
                >
                  <router-link
                    v-for="link in group.links"
                    :key="link.to"
                    :to="link.to"
                    class="flex items-center gap-2 p-2 text-sm rounded-lg transition-all duration-300 hover:bg-gray-200 hover:text-[#2e318a]"
                    active-class="router-link-active"
                  >
                    <i
                      class="py-1 px-2 rounded-md text-white"
                      :class="`${link.icon} bg-${menu.iconColor}-500`"
                    ></i>
                    {{ link.text }}
                  </router-link>
                  <template v-if="group.sub_groups">
                    <div
                      v-for="sub_groups in group.sub_groups"
                      :key="sub_groups.key"
                      class="accordion-group"
                    >
                      <button
                        @click="toggleSubNested(sub_groups.key)"
                        class="flex items-center justify-between w-full p-2 rounded-lg transition-all duration-300 hover:bg-gray-200 group hover:text-blue-900"
                      >
                        <div class="flex items-center gap-2">
                          <svg
                            v-if="!sub_groups.icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="currentColor"
                          >
                            <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" />
                          </svg>
                          <i
                            v-else
                            class="py-1 px-2 rounded-md text-white"
                            :class="`${sub_groups.icon} bg-${menu.iconColor}-500`"
                          ></i>
                          <span class="text-base text-start">{{ sub_groups.title }}</span>
                        </div>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          fill="currentColor"
                          :class="{
                            'rotate-180 transition-transform duration-300':
                              dropdown === sub_groups.key
                          }"
                        >
                          <path
                            d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"
                          />
                        </svg>
                      </button>

                      <div
                        v-show="subDropdown === sub_groups.key"
                        class="ml-4 mt-1 space-y-1 border-l-2 border-gray-300 pl-3"
                      >
                        <router-link
                          v-for="link in sub_groups.links"
                          :key="link.to"
                          :to="link.to"
                          class="flex items-center gap-2 p-2 text-sm rounded-lg transition-all duration-300 hover:bg-gray-200 hover:text-[#2e318a]"
                          active-class="router-link-active"
                        >
                          <i
                            class="py-1 px-2 rounded-md text-white"
                            :class="`${link.icon} bg-${menu.iconColor}-500`"
                          ></i>

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
        class="py-2 px-5 mt-10 bg-red-800 rounded-md text-white duration-300"
        @click="authStore.logout(), router.push('/login/adminLogin')"
      >
        Log Out
      </button>

      <div class="flex flex-col gap-2 overflow-hidden mt-4"></div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UserDashboardInfo from '@/components/UserDashboardInfo.vue'
import { useUserManagementStore } from '@/pages/user_management/stores/userManagementStore'
import { useAuthStore } from '@/stores/AuthStore'

const emit = defineEmits(['changeTab'])

const activeTab = computed(() => {
  if (route.path.startsWith('/crm/leads')) return 'Leads'
  if (route.path.startsWith('/crm/accounts')) return 'Accounts'
  if (route.path.startsWith('/crm/customer')) return 'Customer'
  if (route.path.startsWith('/crm/deals')) return 'Deals'
  if (route.path.startsWith('/crm/contacts')) return 'Contacts'
  if (route.path.startsWith('/crm/contracts')) return 'Contracts'
  if (route.path.startsWith('/crm/projects')) return 'Projects'
  if (route.path.startsWith('/crm/products')) return 'Products'
  if (route.path.startsWith('/crm/invoice')) return 'Invoice'
  if (route.path.startsWith('/crm/timecard')) return 'Timecard'
  else return 'All'
})
const store = useUserManagementStore()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
// const operationStore = useOperationStore()
const dropdown = ref('')
const subDropdown = ref('')
const currentAccordions = ref('')
const openSection = currentAccordions

function toggleAccordion(name, hasdb) {
  if (hasdb) emit('changeTab', name)
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

const menus = [
  {
    id: 'Leads',
    title: 'Leads',
    icon: 'ri-shield-user-fill',
    hasdb: false,
    iconColor: 'orange',
    links: [
      { to: '/crm/leads', icon: 'ri-user-add-line', text: 'All Leads' },
      // { to: '/crm/leads/create', icon: 'ri-user-add-line', text: 'Create New Leads' },
    ],
    groups: [
      {
        key: 'MyCurrentLeads',
        title: 'By Time',
        icon: 'ri-auction-line',
        iconColor: 'green',
        links: [
          { to: '/crm/leads/today', icon: 'ri-add-circle-line', text: 'Today' },
          { to: '/crm/leads/thisWeek', icon: 'ri-add-circle-line', text: 'This Week' },
          { to: '/crm/leads/nextWeek', icon: 'ri-add-circle-line', text: 'Next Week' },
          { to: '/crm/leads/lastWeek', icon: 'ri-add-circle-line', text: 'Last Week' },
          { to: '/crm/leads/thisMonth', icon: 'ri-add-circle-line', text: 'This Month' },
          { to: '/crm/leads/nextMonth', icon: 'ri-add-circle-line', text: 'Next Month' },
          { to: '/crm/leads/thisQuarter', icon: 'ri-add-circle-line', text: 'This Quarter' },
        ]
      },
      {
        key: 'MyPriorityLeads',
        title: 'By Lead to Prospect to Potential',
        icon: 'ri-auction-line',
        iconColor: 'green',
        links: [
          { to: '/crm/leads/initialLead', icon: 'ri-add-circle-line', text: 'Initial Lead' },
          { to: '/crm/leads/prospect', icon: 'ri-list-check', text: 'Prospect' },
          { to: '/crm/leads/potentialNominee', icon: 'ri-list-check', text: 'Potential Nominee' },
          { to: '/crm/leads/potential', icon: 'ri-list-check', text: 'Potential' },
          { to: '/crm/leads/highlyPotential', icon: 'ri-list-check', text: 'Highly Potential ' },
        ]
      },
      {
        key: 'MyLeadImportnace',
        title: 'By Lead Priority',
        icon: 'ri-auction-line',
        iconColor: 'green',
        links: [
          { to: '/crm/leads/bronze', icon: 'ri-add-circle-line', text: 'Bronze' },
          { to: '/crm/leads/silver', icon: 'ri-list-check', text: 'Silver' },
          { to: '/crm/leads/gold', icon: 'ri-list-check', text: 'Gold' },
          { to: '/crm/leads/diamond', icon: 'ri-list-check', text: 'Diamond' },
          { to: '/crm/leads/platinum', icon: 'ri-list-check', text: 'Platinum ' },
          { to: '/crm/leads/not-defined', icon: 'ri-list-check', text: 'Not Defined' }
        ]
      },
        {
        key: 'MyLeadCustom',
        title: 'Custom View',
        icon: 'ri-auction-line',
        iconColor: 'green',
        links: [
          { to: '/crm/leads/custom/create', icon: 'ri-add-circle-line', text: 'Create Custom View' },
          { to: '/crm/leads/custom', icon: 'ri-list-check', text: 'List Custom View' },
        ]
      },

      // {
      //   key: 'MyLeadByIndustry',
      //   title: 'My Lead By Industry',
      //   icon: 'ri-auction-line',
      //   iconColor: 'green',
      //   links: [
      //     { to: '/crm/leads/industry/all', icon: 'ri-add-circle-line', text: 'All' },
      //     { to: '/crm/leads/industry/aerospace', icon: 'ri-list-check', text: 'Aerospace' },
      //     { to: '/crm/leads/industry/automotive', icon: 'ri-list-check', text: 'Automotive' },
      //     { to: '/crm/leads/industry/consumer', icon: 'ri-list-check', text: 'Consumer' },
      //     { to: '/crm/leads/industry/products', icon: 'ri-list-check', text: 'Products' },
      //     { to: '/crm/leads/industry/defense', icon: 'ri-list-check', text: 'Defense' },
      //     { to: '/crm/leads/industry/electronics', icon: 'ri-list-check', text: 'Electronics' },
      //     { to: '/crm/leads/industry/energy', icon: 'ri-list-check', text: 'Energy' },
      //     { to: '/crm/leads/industry/heavy-equipment', icon: 'ri-list-check', text: 'Heavy Equipment' },
      //     { to: '/crm/leads/industry/machinery', icon: 'ri-list-check', text: 'Machinery' },
      //     { to: '/crm/leads/industry/medical', icon: 'ri-list-check', text: 'Medical' },
      //     { to: '/crm/leads/industry/packaging', icon: 'ri-list-check', text: 'Packaging' },
      //     { to: '/crm/leads/industry/retail', icon: 'ri-list-check', text: 'Retail' },
      //     { to: '/crm/leads/industry/shipbuilding', icon: 'ri-list-check', text: 'Shipbuilding' }
      //   ]
      // }
    ]
  },

  {
    id: 'Accounts',
    title: 'Accounts',
    icon: 'ri-auction-line',
    hasdb: false,
    iconColor: 'green',
    links: [
      { to: '/crm/accounts', icon: 'ri-add-circle-line', text: 'All Accounts' },
      // { to: '/crm/accounts/create', icon: 'ri-add-circle-line', text: 'Create New Accounts' },

    ],
     groups: [
      {
        key: 'MyCurrentLeads',
        title: 'By Time',
        icon: 'ri-auction-line',
        iconColor: 'green',
        links: [
          { to: '/crm/accounts/today', icon: 'ri-add-circle-line', text: 'Today' },
          { to: '/crm/accounts/thisWeek', icon: 'ri-add-circle-line', text: 'This Week' },
          { to: '/crm/accounts/nextWeek', icon: 'ri-add-circle-line', text: 'Next Week' },
          { to: '/crm/accounts/lastWeek', icon: 'ri-add-circle-line', text: 'Last Week' },
          { to: '/crm/accounts/thisMonth', icon: 'ri-add-circle-line', text: 'This Month' },
          { to: '/crm/accounts/nextMonth', icon: 'ri-add-circle-line', text: 'Next Month' },
          { to: '/crm/accounts/thisQuarter', icon: 'ri-add-circle-line', text: 'This Quarter' },
        ]
      },
      {
        key: 'MyPriorityLeads',
        title: 'By Lead to Prospect to Potential',
        icon: 'ri-auction-line',
        iconColor: 'green',
        links: [
          { to: '/crm/accounts/initialLead', icon: 'ri-add-circle-line', text: 'Initial Lead' },
          { to: '/crm/accounts/prospect', icon: 'ri-list-check', text: 'Prospect' },
          { to: '/crm/accounts/potentialNominee', icon: 'ri-list-check', text: 'Potential Nominee' },
          { to: '/crm/accounts/potential', icon: 'ri-list-check', text: 'Potential' },
          { to: '/crm/accounts/highlyPotential', icon: 'ri-list-check', text: 'Highly Potential ' },
        ]
      },
      {
        key: 'MyLeadImportnace',
        title: 'By Lead Priority',
        icon: 'ri-auction-line',
        iconColor: 'green',
        links: [
          { to: '/crm/accounts/bronze', icon: 'ri-add-circle-line', text: 'Bronze' },
          { to: '/crm/accounts/silver', icon: 'ri-list-check', text: 'Silver' },
          { to: '/crm/accounts/gold', icon: 'ri-list-check', text: 'Gold' },
          { to: '/crm/accounts/diamond', icon: 'ri-list-check', text: 'Diamond' },
          { to: '/crm/accounts/platinum', icon: 'ri-list-check', text: 'Platinum ' },
          { to: '/crm/accounts/not-defined', icon: 'ri-list-check', text: 'Not Defined' }
        ]
      },
      {
        key: 'MyLeadCustom',
        title: 'Custom View',
        icon: 'ri-auction-line',
        iconColor: 'green',
        links: [
          { to: '/crm/accounts/custom/create', icon: 'ri-add-circle-line', text: 'Create Custom View' },
          { to: '/crm/accounts/custom', icon: 'ri-list-check', text: 'List Custom View' },
        ]
      },
      //   {
      //   key: 'MyAccountByIndustry',
      //   title: 'My Accounts By Industry',
      //   icon: 'ri-auction-line',
      //   iconColor: 'green',
      //   links: [
      //     { to: '/crm/accounts/industry/all', icon: 'ri-add-circle-line', text: 'All' },
      //     { to: '/crm/accounts/industry/aerospace', icon: 'ri-list-check', text: 'Aerospace' },
      //     { to: '/crm/accounts/industry/automotive', icon: 'ri-list-check', text: 'Automotive' },
      //     { to: '/crm/accounts/industry/consumer', icon: 'ri-list-check', text: 'Consumer' },
      //     { to: '/crm/accounts/industry/products', icon: 'ri-list-check', text: 'Products' },
      //     { to: '/crm/accounts/industry/defense', icon: 'ri-list-check', text: 'Defense' },
      //     { to: '/crm/accounts/industry/electronics', icon: 'ri-list-check', text: 'Electronics' },
      //     { to: '/crm/accounts/industry/energy', icon: 'ri-list-check', text: 'Energy' },
      //     { to: '/crm/accounts/industry/heavy-equipment', icon: 'ri-list-check', text: 'Heavy Equipment' },
      //     { to: '/crm/accounts/industry/machinery', icon: 'ri-list-check', text: 'Machinery' },
      //     { to: '/crm/accounts/industry/medical', icon: 'ri-list-check', text: 'Medical' },
      //     { to: '/crm/accounts/industry/packaging', icon: 'ri-list-check', text: 'Packaging' },
      //     { to: '/crm/accounts/industry/retail', icon: 'ri-list-check', text: 'Retail' },
      //     { to: '/crm/accounts/industry/shipbuilding', icon: 'ri-list-check', text: 'Shipbuilding' }
      //   ]
      // }
    ]
  },

//  {
//     id: 'Customer',
//     title: 'Customer',
//     icon: 'ri-auction-line',
//     hasdb: false,
//     iconColor: 'green',
//     links: [
//       { to: '/crm/customer', icon: 'ri-add-circle-line', text: 'All Customers' },

//     ],
//      groups: [
//       {
//         key: 'MyCurrentLeads',
//         title: 'By Time',
//         icon: 'ri-auction-line',
//         iconColor: 'green',
//         links: [
//           { to: '/crm/accounts/today', icon: 'ri-add-circle-line', text: 'Today' },
//           { to: '/crm/accounts/thisWeek', icon: 'ri-add-circle-line', text: 'This Week' },
//           { to: '/crm/accounts/nextWeek', icon: 'ri-add-circle-line', text: 'Next Week' },
//           { to: '/crm/accounts/lastWeek', icon: 'ri-add-circle-line', text: 'Last Week' },
//           { to: '/crm/accounts/thisMonth', icon: 'ri-add-circle-line', text: 'This Month' },
//           { to: '/crm/accounts/nextMonth', icon: 'ri-add-circle-line', text: 'Next Month' },
//           { to: '/crm/accounts/thisQuarter', icon: 'ri-add-circle-line', text: 'This Quarter' },
//         ]
//       },
//       {
//         key: 'MyPriorityLeads',
//         title: 'By Lead to Prospect to Potential',
//         icon: 'ri-auction-line',
//         iconColor: 'green',
//         links: [
//           { to: '/crm/accounts/initialLead', icon: 'ri-add-circle-line', text: 'Initial Lead' },
//           { to: '/crm/accounts/prospect', icon: 'ri-list-check', text: 'Prospect' },
//           { to: '/crm/accounts/potentialNominee', icon: 'ri-list-check', text: 'Potential Nominee' },
//           { to: '/crm/accounts/potential', icon: 'ri-list-check', text: 'Potential' },
//           { to: '/crm/accounts/highlyPotential', icon: 'ri-list-check', text: 'Highly Potential ' },
//         ]
//       },
//       {
//         key: 'MyLeadImportnace',
//         title: 'By Lead Priority',
//         icon: 'ri-auction-line',
//         iconColor: 'green',
//         links: [
//           { to: '/crm/accounts/bronze', icon: 'ri-add-circle-line', text: 'Bronze' },
//           { to: '/crm/accounts/silver', icon: 'ri-list-check', text: 'Silver' },
//           { to: '/crm/accounts/gold', icon: 'ri-list-check', text: 'Gold' },
//           { to: '/crm/accounts/diamond', icon: 'ri-list-check', text: 'Diamond' },
//           { to: '/crm/accounts/platinum', icon: 'ri-list-check', text: 'Platinum ' },
//           { to: '/crm/accounts/not-defined', icon: 'ri-list-check', text: 'Not Defined' }
//         ]
//       },
//       //   {
//       //   key: 'MyAccountByIndustry',
//       //   title: 'My Accounts By Industry',
//       //   icon: 'ri-auction-line',
//       //   iconColor: 'green',
//       //   links: [
//       //     { to: '/crm/accounts/industry/all', icon: 'ri-add-circle-line', text: 'All' },
//       //     { to: '/crm/accounts/industry/aerospace', icon: 'ri-list-check', text: 'Aerospace' },
//       //     { to: '/crm/accounts/industry/automotive', icon: 'ri-list-check', text: 'Automotive' },
//       //     { to: '/crm/accounts/industry/consumer', icon: 'ri-list-check', text: 'Consumer' },
//       //     { to: '/crm/accounts/industry/products', icon: 'ri-list-check', text: 'Products' },
//       //     { to: '/crm/accounts/industry/defense', icon: 'ri-list-check', text: 'Defense' },
//       //     { to: '/crm/accounts/industry/electronics', icon: 'ri-list-check', text: 'Electronics' },
//       //     { to: '/crm/accounts/industry/energy', icon: 'ri-list-check', text: 'Energy' },
//       //     { to: '/crm/accounts/industry/heavy-equipment', icon: 'ri-list-check', text: 'Heavy Equipment' },
//       //     { to: '/crm/accounts/industry/machinery', icon: 'ri-list-check', text: 'Machinery' },
//       //     { to: '/crm/accounts/industry/medical', icon: 'ri-list-check', text: 'Medical' },
//       //     { to: '/crm/accounts/industry/packaging', icon: 'ri-list-check', text: 'Packaging' },
//       //     { to: '/crm/accounts/industry/retail', icon: 'ri-list-check', text: 'Retail' },
//       //     { to: '/crm/accounts/industry/shipbuilding', icon: 'ri-list-check', text: 'Shipbuilding' }
//       //   ]
//       // }
//     ]
//   },

  {
    id: 'Deals',
    title: 'Deals',
    icon: 'ri-auction-line',
    hasdb: false,
    iconColor: 'red',
      links: [
      { to: '/crm/deals', icon: 'ri-add-circle-line', text: 'All Deals' },


    ],
      groups: [
      {
        key: 'MyClosingDeal',
        title: 'By Time - Closing Date',
        icon: 'ri-auction-line',
        iconColor: 'green',
        links: [
          { to: '/crm/deals/closing/today', icon: 'ri-add-circle-line', text: 'Today' },
          { to: '/crm/deals/closing/thisWeek', icon: 'ri-list-check', text: 'This Week' },
          { to: '/crm/deals/closing/nextWeek', icon: 'ri-list-check', text: 'Next Week' },
          { to: '/crm/deals/closing/lastWeek', icon: 'ri-add-circle-line', text: 'Last Week' },
          { to: '/crm/deals/closing/thisMonth', icon: 'ri-list-check', text: 'This Month' },
          { to: '/crm/deals/closing/nextMonth', icon: 'ri-list-check', text: 'Next Month' },
          { to: '/crm/deals/closing/lastMonth', icon: 'ri-list-check', text: 'Last Month' },
        ]
      },
            {
        key: 'MyCallSchedule',
        title: 'By Time - Call Schedule',
        icon: 'ri-auction-line',
        iconColor: 'green',
        links: [
          { to: '/crm/deals/call/today', icon: 'ri-add-circle-line', text: 'Today' },
          { to: '/crm/deals/call/thisWeek', icon: 'ri-list-check', text: 'This Week' },
          { to: '/crm/deals/call/nextWeek', icon: 'ri-list-check', text: 'Next Week' },
          { to: '/crm/deals/call/lastWeek', icon: 'ri-add-circle-line', text: 'Last Week' },
          { to: '/crm/deals/call/thisMonth', icon: 'ri-list-check', text: 'This Month' },
          { to: '/crm/deals/call/nextMonth', icon: 'ri-list-check', text: 'Next Month' },
          { to: '/crm/deals/call/lastMonth', icon: 'ri-list-check', text: 'Last Month' },
        ]
      },
      {
        key: 'MyDealByIndustry',
        title: 'By Deal Stage',
        icon: 'ri-auction-line',
        iconColor: 'green',
        links: [
          { to: '/crm/deals/stage/qualification', icon: 'ri-add-circle-line', text: 'Qualification' },
          { to: '/crm/deals/stage/needAnalysis', icon: 'ri-list-check', text: 'Need Analysis' },
          { to: '/crm/deals/stage/identifyDecisionMaker', icon: 'ri-list-check', text: 'Identify Decision Maker' },
          { to: '/crm/deals/stage/proposalSubmitted', icon: 'ri-list-check', text: 'Proposal Submitted' },
          { to: '/crm/deals/stage/negotiationReview', icon: 'ri-list-check', text: 'Negotiation/Review' },
          { to: '/crm/deals/stage/closedWon', icon: 'ri-list-check', text: 'Closed Won' },
          { to: '/crm/deals/stage/closedLost', icon: 'ri-list-check', text: 'Closed Lost' },
        ]
      },

    ]},


  {
    id: 'Contacts',
    title: 'Contacts',
    icon: 'ri-auction-line',
    hasdb: false,
    iconColor: 'teal',
    links: [
      {
        to: '/crm/contacts',
        icon: 'ri-add-circle-line',
        text: 'All Contacts'
      },
      // {
      //   to: '/crm/projects/today',
      //   icon: 'ri-list-check',
      //   text: 'Today'
      // },
      {
        to: '/crm/contacts/thisWeek',
        icon: 'ri-list-check',
        text: 'This Week'
      },
      {
        to: '/crm/contacts/nextWeek',
        icon: 'ri-list-check',
        text: 'Next Week'
      },
      {
        to: '/crm/contacts/thisMonth',
        icon: 'ri-list-check',
        text: 'This Month'
      },
      {
        to: '/crm/contacts/nextMonth',
        icon: 'ri-list-check',
        text: 'Next Month'
      },
      {
        to: '/crm/contacts/thisQuarter',
        icon: 'ri-list-check',
        text: 'This Quarter'
      },
      {
        to: '/crm/contacts/nextQuarter',
        icon: 'ri-list-check',
        text: 'Next Quarter'
      }
    ]
  },


  // {
  //   id: 'Contracts',
  //   title: 'Contracts',
  //   icon: 'ri-auction-line',
  //   hasdb: false,
  //   iconColor: 'blue',
  //     links: [
  //     { to: '/crm/contracts', icon: 'ri-add-circle-line', text: 'My All Contract' },
  //     { to: '/crm/contracts/current', icon: 'ri-add-circle-line', text: 'My Current Contract' },
  //     { to: '/crm/contracts/worked', icon: 'ri-add-circle-line', text: 'My Worked Contract' },
  //     { to: '/crm/contracts/priority', icon: 'ri-add-circle-line', text: 'My Priority Contract' },
  //     { to: '/crm/contracts/important', icon: 'ri-add-circle-line', text: 'My Important Contract' },

  //   ],
  //     groups: [
  //     {
  //       key: 'MyContractByIndustry',
  //       title: 'My Contract By Industry',
  //       icon: 'ri-auction-line',
  //       iconColor: 'green',
  //       links: [
  //         { to: '/crm/contracts/industry', icon: 'ri-add-circle-line', text: 'All' },
  //         { to: '/crm/contracts/industry/aerospace', icon: 'ri-list-check', text: 'Aerospace' },
  //         { to: '/crm/contracts/industry/automotive', icon: 'ri-list-check', text: 'Automotive' },
  //         { to: '/crm/contracts/industry/consumer', icon: 'ri-list-check', text: 'Consumer' },
  //         { to: '/crm/contracts/industry/products', icon: 'ri-list-check', text: 'Products' },
  //         { to: '/crm/contracts/industry/defense', icon: 'ri-list-check', text: 'Defense' },
  //         { to: '/crm/contracts/industry/electronics', icon: 'ri-list-check', text: 'Electronics' },
  //         { to: '/crm/contracts/industry/energy', icon: 'ri-list-check', text: 'Energy' },
  //         { to: '/crm/contracts/industry/heavy-equipment', icon: 'ri-list-check', text: 'Heavy Equipment' },
  //         { to: '/crm/contracts/industry/machinery', icon: 'ri-list-check', text: 'Machinery' },
  //         { to: '/crm/contracts/industry/medical', icon: 'ri-list-check', text: 'Medical' },
  //         { to: '/crm/contracts/industry/packaging', icon: 'ri-list-check', text: 'Packaging' },
  //         { to: '/crm/contracts/industry/retail', icon: 'ri-list-check', text: 'Retail' },
  //         { to: '/crm/contracts/industry/shipbuilding', icon: 'ri-list-check', text: 'Shipbuilding' }
  //       ]
  //     },

  //   ]
  // },
  // {
  //   id: 'Projects',
  //   title: 'Projects',
  //   icon: 'ri-auction-line',
  //   hasdb: false,
  //   iconColor: 'teal',
  //   links: [
  //     {
  //       to: '/crm/projects/current',
  //       icon: 'ri-add-circle-line',
  //       text: 'Current Project Deliverable'
  //     },
  //     {
  //       to: '/crm/projects/today',
  //       icon: 'ri-list-check',
  //       text: 'Today'
  //     },
  //     {
  //       to: '/crm/projects/week',
  //       icon: 'ri-list-check',
  //       text: 'This Week'
  //     },
  //     {
  //       to: '/crm/projects/month',
  //       icon: 'ri-list-check',
  //       text: 'This Month'
  //     },
  //     {
  //       to: '/crm/projects/quarter',
  //       icon: 'ri-list-check',
  //       text: 'This Quarter'
  //     }
  //   ]
  // },
  {
    id: 'Products',
    title: 'Products and Services',
    icon: 'ri-auction-line',
    hasdb: false,
    iconColor: 'purple',
      groups: [
      {
        key: 'CRMServiceArea',
        title: 'Service Area',
        icon: 'ri-auction-line',
        iconColor: 'green',
         links: [
          { to: '/crm/contracts/industry', icon: 'ri-add-circle-line', text: 'Create Service area' },
      ],
         sub_groups: [
          {
            key: 'ServiceAreaList',
            title: 'Service Area List',
            icon: 'ri-add-circle-line',
            links: [
              {
                to: '/crm/accounts/planned/planned/today',
                icon: 'ri-add-circle-line',
                text: 'A. Structural Analysis'
              },
              {
                to: '/crm/accounts/planned/planned/week',
                icon: 'ri-add-circle-line',
                text: 'B. System Dynamics'
              },
              {
                to: '/crm/accounts/planned/planned/month',
                icon: 'ri-add-circle-line',
                text: 'C. Acouastics'
              },
              {
                to: '/crm/accounts/planned/planned/quarter',
                icon: 'ri-add-circle-line',
                text: 'D. Fluids'
              },
              {
                to: '/crm/accounts/planned/planned/quarter',
                icon: 'ri-add-circle-line',
                text: 'E. Autonomuos'
              },
              {
                to: '/crm/accounts/planned/planned/quarter',
                icon: 'ri-add-circle-line',
                text: 'F. VM&C'
              },
              {
                to: '/crm/accounts/planned/planned/quarter',
                icon: 'ri-add-circle-line',
                text: 'G. ICME (Materials)'
              },
            ]
      },]
      },
      {
        key: 'CRMServiceType',
        title: 'Service Type',
        icon: 'ri-auction-line',
        iconColor: 'green',
         links: [
          { to: '/crm/contracts/industry', icon: 'ri-add-circle-line', text: 'Create Service Type' },
      ],
         sub_groups: [
          {
            key: 'ServiceTypeList',
            title: 'Service Type List',
            icon: 'ri-add-circle-line',
            links: [
              {
                to: '/crm/accounts/planned/planned/today',
                icon: 'ri-add-circle-line',
                text: '1. Software Sales'
              },
              {
                to: '/crm/accounts/planned/planned/week',
                icon: 'ri-add-circle-line',
                text: '2. Software Taining'
              },
              {
                to: '/crm/accounts/planned/planned/month',
                icon: 'ri-add-circle-line',
                text: '3. Engineering Service'
              },

            ]
      },]
      },
      {
        key: 'CRMProducts',
        title: 'Products',
        icon: 'ri-auction-line',
        iconColor: 'green',
         links: [
          { to: '/crm/products/create', icon: 'ri-add-circle-line', text: 'Create Products ' },
          { to: '/crm/products', icon: 'ri-add-circle-line', text: 'Products List' },
      ],

      },


    ],
    // links: [
    //   {
    //     to: '/crm/products/create',
    //     icon: 'ri-add-circle-line',
    //     text: 'Create Products'
    //   },
    //   {
    //     to: '/crm/products/active',
    //     icon: 'ri-add-circle-line',
    //     text: 'Active Products List'
    //   },

    // ]
  },
      {
    id: 'Timecard',
    title: 'Timecard',
    icon: 'ri-shield-user-fill',
    hasdb: false,
    iconColor: 'sky',
    links: [
      { to: '/crm/timecard', icon: 'ri-user-add-line', text: 'Weekly Timecard' },
      { to: '/crm/timecard/myMonthly', icon: 'ri-user-add-line', text: 'Monthly Timecard' },
    ],
  },
  // {
  //   id: 'Invoice',
  //   title: 'Invoice',
  //   icon: 'ri-auction-line',
  //   hasdb: false,
  //   iconColor: 'yellow',
  //   links: [
  //     {
  //       to: '/crm/invoice',
  //       icon: 'ri-add-circle-line',
  //       text: 'All Invoice List'
  //     },
  //     {
  //       to: '/crm/invoice/current',
  //       icon: 'ri-list-check',
  //       text: 'Current Invoice List'
  //     }
  //   ]
  // }
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
