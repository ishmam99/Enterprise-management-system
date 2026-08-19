<template>
  <div class="bg-base-200 w-1/5 min-w-[300px] min-h-screen sticky top-[80px]">
    <div class="p-5 h-full flex flex-col font-semibold text-lg">
      <div class="mb-2 rounded-md px-2 space-y-1 py-2">
        <h4
          class="font-bold text-center text-md shadow-xl p-1 rounded-b-md bg-slate-100 text-[#2e828a]"
        >
         User Management
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
        <!-- <div v-for="menu in menus" :key="menu.id" class="accordion-group rounded-xl">
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
        </div> -->

        <div class="space-y-2 mt-4">
  <router-link
    v-for="item in flatUserMenus"
    :key="item.to"
    :to="item.to"
    class="flex items-center gap-3 p-3 rounded-xl font-medium transition-all
           hover:bg-sky-100 hover:text-[#2e318a]"
    active-class="bg-sky-100 text-[#2e318a] shadow"
  >
    <i
      class="py-1 px-2 rounded-md text-white"
      :class="`${item.icon} bg-sky-500`"
    ></i>
    {{ item.text }}
  </router-link>
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

const flatUserMenus = [
  {
    to: '/crm/user',
    icon: 'ri-dashboard-line',
    text: 'Dashboard'
  },
  // {
  //   to: '/crm/user/create',
  //   icon: 'ri-user-add-line',
  //   text: 'User Creation dd'
  // },
  {
    to: '/crm/employees/assignRole',
    icon: 'ri-group-line',
    text: 'Assign Role'
  },
  {
    to: '/crm/employees/allEmployees',
    icon: 'ri-group-line',
    text: 'Assigned Employees'
  },
  {
    to: '/crm/employees/unassignedEmployee',
    icon: 'ri-group-line',
    text: 'Unassigned Employees'
  },
  {
    to: '/crm/user/list',
    icon: 'ri-group-line',
    text: 'View Users'
  },
  // {
  //   to: '/crm/user/assign',
  //   icon: 'ri-user-settings-line',
  //   text: 'Assign Users'
  // }
]



const menus = [
  {
    id: 'Leads',
    title: 'User',
    icon: 'ri-shield-user-fill',
    hasdb: false,
    iconColor: 'orange',
    links: [
      { to: '/crm/leads', icon: 'ri-user-add-line', text: 'User Creation' },
      { to: '/crm/leads/create', icon: 'ri-user-add-line', text: 'View Users' },
      { to: '/crm/leads/create', icon: 'ri-user-add-line', text: 'Assign Users' },
    ],
    // groups: [
    //   {
    //     key: 'MyCurrentLeads',
    //     title: 'By Time',
    //     icon: 'ri-auction-line',
    //     iconColor: 'green',
    //     links: [
    //       { to: '/crm/leads/today', icon: 'ri-add-circle-line', text: 'Today' },
    //       { to: '/crm/leads/thisWeek', icon: 'ri-add-circle-line', text: 'This Week' },
    //       { to: '/crm/leads/nextWeek', icon: 'ri-add-circle-line', text: 'Next Week' },
    //       { to: '/crm/leads/lastWeek', icon: 'ri-add-circle-line', text: 'Last Week' },
    //       { to: '/crm/leads/thisMonth', icon: 'ri-add-circle-line', text: 'This Month' },
    //       { to: '/crm/leads/nextMonth', icon: 'ri-add-circle-line', text: 'Next Month' },
    //       { to: '/crm/leads/thisQuarter', icon: 'ri-add-circle-line', text: 'This Quarter' },
    //     ]
    //   },
    //   {
    //     key: 'MyPriorityLeads',
    //     title: 'By Lead to Prospect to Potential',
    //     icon: 'ri-auction-line',
    //     iconColor: 'green',
    //     links: [
    //       { to: '/crm/leads/initialLead', icon: 'ri-add-circle-line', text: 'Initial Lead' },
    //       { to: '/crm/leads/prospect', icon: 'ri-list-check', text: 'Prospect' },
    //       { to: '/crm/leads/potentialNominee', icon: 'ri-list-check', text: 'Potential Nominee' },
    //       { to: '/crm/leads/potential', icon: 'ri-list-check', text: 'Potential' },
    //       { to: '/crm/leads/highlyPotential', icon: 'ri-list-check', text: 'Highly Potential ' },
    //     ]
    //   },
    //   {
    //     key: 'MyLeadImportnace',
    //     title: 'By Lead Priority',
    //     icon: 'ri-auction-line',
    //     iconColor: 'green',
    //     links: [
    //       { to: '/crm/leads/bronze', icon: 'ri-add-circle-line', text: 'Bronze' },
    //       { to: '/crm/leads/silver', icon: 'ri-list-check', text: 'Silver' },
    //       { to: '/crm/leads/gold', icon: 'ri-list-check', text: 'Gold' },
    //       { to: '/crm/leads/diamond', icon: 'ri-list-check', text: 'Diamond' },
    //       { to: '/crm/leads/platinum', icon: 'ri-list-check', text: 'Platinum ' },
    //       { to: '/crm/leads/not-defined', icon: 'ri-list-check', text: 'Not Defined' }
    //     ]
    //   },
    //     {
    //     key: 'MyLeadCustom',
    //     title: 'Custom View',
    //     icon: 'ri-auction-line',
    //     iconColor: 'green',
    //     links: [
    //       { to: '/crm/leads/custom/create', icon: 'ri-add-circle-line', text: 'Create Custom View' },
    //       { to: '/crm/leads/custom', icon: 'ri-list-check', text: 'List Custom View' },
    //       // { to: '/crm/leads/silver', icon: 'ri-list-check', text: 'Silver' },
    //       // { to: '/crm/leads/gold', icon: 'ri-list-check', text: 'Gold' },
    //       // { to: '/crm/leads/diamond', icon: 'ri-list-check', text: 'Diamond' },
    //       // { to: '/crm/leads/platinum', icon: 'ri-list-check', text: 'Platinum ' },
    //       // { to: '/crm/leads/not-defined', icon: 'ri-list-check', text: 'Not Defined' }
    //     ]
    //   },

    //   // {
    //   //   key: 'MyLeadByIndustry',
    //   //   title: 'My Lead By Industry',
    //   //   icon: 'ri-auction-line',
    //   //   iconColor: 'green',
    //   //   links: [
    //   //     { to: '/crm/leads/industry/all', icon: 'ri-add-circle-line', text: 'All' },
    //   //     { to: '/crm/leads/industry/aerospace', icon: 'ri-list-check', text: 'Aerospace' },
    //   //     { to: '/crm/leads/industry/automotive', icon: 'ri-list-check', text: 'Automotive' },
    //   //     { to: '/crm/leads/industry/consumer', icon: 'ri-list-check', text: 'Consumer' },
    //   //     { to: '/crm/leads/industry/products', icon: 'ri-list-check', text: 'Products' },
    //   //     { to: '/crm/leads/industry/defense', icon: 'ri-list-check', text: 'Defense' },
    //   //     { to: '/crm/leads/industry/electronics', icon: 'ri-list-check', text: 'Electronics' },
    //   //     { to: '/crm/leads/industry/energy', icon: 'ri-list-check', text: 'Energy' },
    //   //     { to: '/crm/leads/industry/heavy-equipment', icon: 'ri-list-check', text: 'Heavy Equipment' },
    //   //     { to: '/crm/leads/industry/machinery', icon: 'ri-list-check', text: 'Machinery' },
    //   //     { to: '/crm/leads/industry/medical', icon: 'ri-list-check', text: 'Medical' },
    //   //     { to: '/crm/leads/industry/packaging', icon: 'ri-list-check', text: 'Packaging' },
    //   //     { to: '/crm/leads/industry/retail', icon: 'ri-list-check', text: 'Retail' },
    //   //     { to: '/crm/leads/industry/shipbuilding', icon: 'ri-list-check', text: 'Shipbuilding' }
    //   //   ]
    //   // }
    // ]
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
