<template>
  <div class="bg-slate-400 border-r border-gray-200 w-1/5 min-w-[300px] min-h-screen sticky top-[80px] shadow-sm">
    <div class="p-5 h-full flex flex-col font-medium text-sm">
      <p class="bg-red-500"></p>

      <div class="font-bold text-center text-base p-2 rounded-xl bg-cyan-600 text-white border border-gray-300"
        @click="() => $router.push('/partner')">


        Partner Dashboard <br> Welcome, {{ store?.user?.name }}

      </div>

      <div class="space-y-2 mt-4">
        <div v-for="menu in menus" :key="menu.id"
          class="accordion-group rounded-lg bg-white transition-all duration-200">
          <div v-if="activeTab === menu?.id || activeTab === 'All'"
            class="flex items-center justify-between w-full p-1.5 border border-gray-300 rounded-lg transition-all duration-200 group hover:border-blue-400"
            :class="openSection === menu.id
              ? 'bg-blue-50 border-blue-400 text-blue-700 shadow-sm'
              : 'bg-white hover:bg-gray-50 text-gray-700'" @click="toggleAccordion(menu.id, menu.hasdb)">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-lg shadow-xs bg-white border border-gray-300 group-hover:border-blue-400">
                <i class="text-base" :class="`text-${menu.iconColor}-600 ${menu.icon}`"></i>
              </div>
              <span class="font-semibold text-xs">{{ menu.title }}</span>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"
              class="transition-transform duration-200 transform text-gray-500 group-hover:text-gray-700"
              :class="{ 'rotate-180': openSection === menu.id }">
              <path
                d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" />
            </svg>
          </div>

          <div v-if="activeTab === menu.id || (activeTab == 'All' && currentAccordions === menu.id)"
            class="ml-4 mt-2 space-y-1 bg-white border-l-2 border-gray-300 pl-4">

            <template v-if="menu.groups">
              <div v-for="group in menu.groups" :key="group.key" class="accordion-group rounded-lg">
                <button v-if="store.currentMenu == 'My Industry Solution Management' && store.currentSubMenu != group"
                  @click="toggleNested(group.key)"
                  class="flex items-center bg-gray-100 justify-between w-full p-2 text-gray-600 rounded-lg transition-all duration-200 hover:bg-gray-50 group border border-transparent hover:border-gray-300 hover:text-gray-800">
                  <div class="flex items-center gap-2">
                    <div
                      class="p-1.5 rounded-md bg-gray-100 border border-gray-300 group-hover:bg-gray-200 transition-colors">
                      <i v-if="!group.icon" class="ri-add-line text-gray-600"></i>
                      <i v-else :class="group.icon" class="text-gray-600"></i>
                    </div>
                    <span class="text-xs text-start font-medium">{{ group.title }}</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor"
                    class="transition-transform duration-200 text-gray-500"
                    :class="{ 'rotate-180': dropdown === group.key }">
                    <path
                      d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" />
                  </svg>
                </button>

                <button v-else @click="toggleNested(group.key)"
                  class="flex items-center bg-gray-100 justify-between w-full px-2 py-1 text-gray-600 rounded-lg transition-all duration-200 hover:bg-gray-50 group border border-transparent hover:border-gray-300 hover:text-gray-800">
                  <div class="flex items-center gap-2">
                    <div
                      class="p-1.5 rounded-md bg-gray-100 border border-gray-300 group-hover:bg-gray-200 transition-colors">
                      <i v-if="!group.icon" class="ri-add-line text-gray-600"></i>
                      <i v-else :class="group.icon" class="text-gray-600"></i>
                    </div>
                    <span class="text-xs text-start font-medium">{{ group.title }}</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor"
                    class="transition-transform duration-200 text-gray-500"
                    :class="{ 'rotate-180': dropdown === group.key }">
                    <path
                      d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" />
                  </svg>
                </button>

                <div v-show="dropdown === group.key || store.currentSubMenu == group.key"
                  class="ml-4  mt-1 space-y-1 border-l-2 border-gray-300 pl-3">
                  <router-link v-for="link in group.links" :key="link.to" :to="link.to"
                    class="flex items-center gap-2 p-2 bg-gray-200 p text-xs text-gray-600 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:text-gray-800 group border border-transparent hover:border-gray-300"
                    active-class="router-link-active bg-blue-50 text-blue-700 border border-blue-200">
                    <div
                      class="p-1.5 rounded-md bg-gray-100 border border-gray-300 group-hover:bg-gray-200 transition-colors">
                      <i :class="link.icon" class="text-gray-600"></i>
                    </div>
                    <span class="font-medium text-xs">{{ link.text }}</span>
                  </router-link>

                  <template v-if="group.sub_groups">
                    <div v-for="sub_groups in group.sub_groups" :key="sub_groups.key"
                      class="accordion-group bg-gray-300 rounded-lg">
                      <button @click="toggleSubNested(sub_groups.key)"
                        class="flex items-center justify-between w-full p-2 text-gray-600 rounded-lg transition-all duration-200 hover:bg-gray-50 group border border-transparent hover:border-gray-300 hover:text-gray-800">
                        <div class="flex items-center gap-2">
                          <div
                            class="p-1.5 rounded-md bg-gray-100 border border-gray-300 group-hover:bg-gray-200 transition-colors">
                            <i v-if="!sub_groups.icon" class="ri-add-line text-gray-600"></i>
                            <i v-else :class="sub_groups.icon" class="text-gray-600"></i>
                          </div>
                          <span class="text-xs text-start font-medium">{{ sub_groups.title }}</span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14"
                          fill="currentColor" class="transition-transform duration-200 text-gray-500"
                          :class="{ 'rotate-180': subDropdown === sub_groups.key }">
                          <path
                            d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" />
                        </svg>
                      </button>

                      <div v-show="subDropdown === sub_groups.key"
                        class="ml-4 mt-1 space-y-1 border-l-2 border-gray-300 pl-3">
                        <router-link v-for="link in sub_groups.links" :key="link.to" :to="link.to"
                          class="flex items-center gap-2 p-2 text-xs text-gray-600 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:text-gray-800 group border border-transparent hover:border-gray-300"
                          active-class="router-link-active bg-green-50 text-green-700 border border-green-200">
                          <div
                            class="p-1.5 rounded-md bg-gray-100 border border-gray-300 group-hover:bg-gray-200 transition-colors">
                            <i :class="link.icon" class="text-gray-600"></i>
                          </div>
                          <span class="font-medium text-xs">{{ link.text }}</span>
                        </router-link>
                        <template v-if="sub_groups.sub_sub_groups">
                          <div v-for="sub_sub_group in sub_groups.sub_sub_groups" :key="sub_sub_group.key"
                            class="accordion-group">
                            <button @click="toggleSubSubNested(sub_sub_group.key)"
                              class="flex items-center justify-between w-full p-1 text-gray-600 rounded-md transition-all duration-200 hover:bg-gray-50 group hover:text-gray-800">
                              <div class="flex items-center gap-2">
                                <svg v-if="!sub_sub_group.icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                  width="14" height="14" fill="currentColor" class="text-gray-600">
                                  <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" />
                                </svg>
                                <i v-else class="py-1 px-1.5 rounded-sm text-xs"
                                  :class="`${sub_sub_group.icon} bg-gray-100 text-gray-700 border border-gray-300`"></i>
                                <span class="text-xs text-start">{{ sub_sub_group.title }}</span>
                              </div>

                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12"
                                fill="currentColor" class="text-gray-500"
                                :class="{ 'rotate-180 transition-transform duration-200': dropdown === sub_sub_group.key }">
                                <path
                                  d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" />
                              </svg>
                            </button>

                            <div v-show="subsubDropdown === sub_sub_group.key"
                              class="ml-4 mt-1 space-y-1 border-l-2 border-gray-300 pl-3">

                              <router-link v-for="link in sub_sub_group.links" :key="link.to" :to="link.to"
                                class="text-xs space-y-[-8px] flex items-center gap-2 p-1.5 rounded-md transition-all text-gray-600 duration-200 hover:bg-gray-50 hover:text-gray-800"
                                active-class="router-link-active bg-amber-50 text-amber-700">
                                <i class="py-0.5 px-1.5 rounded-sm text-[10px]"
                                  :class="` ${link.icon} bg-gray-100 text-gray-700 border border-gray-300`"></i>

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

            <template v-if="menu.links">
              <router-link v-for="link in menu.links" :key="link.to" :to="link.to"
                class="flex items-center gap-2 px-2 bg-gray-100 py-1 text-xs text-gray-600 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:text-gray-800 group border border-transparent hover:border-gray-300"
                active-class="router-link-active bg-blue-50 text-blue-700 border border-blue-200">
                <div
                  class="p-1.5 rounded-md bg-gray-100 border border-gray-300 group-hover:bg-gray-200 transition-colors">
                  <i :class="link.icon + ` text-${menu.iconColor}-600`"></i>
                </div>
                <span class="font-medium text-xs">{{ link.text }}</span>
              </router-link>
            </template>
          </div>
        </div>
      </div>

      <button type="button"
        class="py-2.5 px-6 mt-6 w-full bg-gray-100 rounded-lg text-gray-700 font-medium transition-all duration-200 hover:bg-gray-200 hover:shadow-sm hover:scale-[1.01] flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400"
        @click="store.logout(), router.push('/login/userLogin')">
        <i class="ri-logout-box-r-line"></i>
        Log Out
      </button>

      <div class="flex flex-col gap-2 overflow-hidden mt-6">
        <div class="text-center text-gray-500 text-xs pt-4 border-t border-gray-300">

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/config/api'
import UserDashboardInfo from '@/components/UserDashboardInfo.vue'
import { useAuthStore } from '@/stores/AuthStore'

/* ================= PROPS ================= */
const props = defineProps({
  activeTab: {
    type: String,
    default: 'All'
  }
})
const emit = defineEmits(['changeTab'])

/* ================= STATE ================= */
const store = useAuthStore()
const router = useRouter()

const dropdown = ref('')
const subDropdown = ref('')
const subsubDropdown = ref('')
const currentAccordions = ref('')
const openSection = currentAccordions

/* ================= TOGGLES ================= */
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
function toggleSubSubNested(key) {
  subsubDropdown.value = subsubDropdown.value === key ? '' : key
}

/* ================= ACTIVITY REPORTS (NEW) ================= */
const activityCustomers = ref([])
const championContacts = ref([])

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')

// const getActivityCustomers = async () => {
//   try {
//     const res = await api().get('my-success-team')

//     activityCustomers.value = res.data.data.map(item => {
//       const name = item.company.name || 'Unknown Customer'
//       const id = item.id

//       return {
//         text: name,
//         icon: 'ri-add-circle-line',
//         to: `/partner/activity-report/${id}`
//       }
//     })
//   } catch (error) {
//     console.error('Activity Reports API failed', error)
//   }
// }

// onMounted(() => {
//   getActivityCustomers()
// })

/* ================= MENUS (REACTIVE FIX) ================= */
const menus = computed(() => {
  return [
    {
      id: `My Contact`,
      title: `My Contacts at ${store.companyName}`,
      icon: 'ri-auction-line',
      hasdb: false,
      iconColor: 'blue',
      groups: [
        {
          key: 'SuccessTeamTask22',
          title: 'By Solution',
          icon: 'ri-price-tag-3-line',
          links: [
            { to: '/partner/myContact/solution-structure-analysis-service', icon: 'ri-add-circle-line', text: 'Structure Analysis and Service' },
            { to: '/partner/myContact/solution-system-dynamics-analysis-service', icon: 'ri-add-circle-line', text: 'System Dynamics Analysis Service' },
            { to: '/partner/myContact/solution-acoustics-analysis-service', icon: 'ri-add-circle-line', text: 'Acoustics Analysis Service' },
            { to: '/partner/myContact/solution-fluids-analysis-service', icon: 'ri-add-circle-line', text: 'Fluids Analysis Service' },
            { to: '/partner/myContact/solution-autonomous-analysis-service', icon: 'ri-add-circle-line', text: 'Autonomous Analysis Service' },
            { to: '/partner/myContact/solution-vmc-analysis-service', icon: 'ri-add-circle-line', text: 'VM&C Analysis Service' },
            { to: '/partner/myContact/solution-icme-analysis-service', icon: 'ri-add-circle-line', text: 'ICME Analysis Service' },
          ]
        },
        {
          key: 'SuccessTeamTask33',
          title: 'By Software',
          icon: 'ri-price-tag-3-line',
          links: [
            { to: '/partner/myContact/software-adams', icon: 'ri-add-circle-line', text: 'Adams' },
            { to: '/partner/myContact/software-cae-fatigue', icon: 'ri-add-circle-line', text: 'CAE Fatigue' },
            { to: '/partner/myContact/software-msc-apex', icon: 'ri-add-circle-line', text: 'MSC Apex' },
            { to: '/partner/myContact/software-dytran', icon: 'ri-add-circle-line', text: 'Dytran' },
            { to: '/partner/myContact/software-marc', icon: 'ri-add-circle-line', text: 'Marc' },
            { to: '/partner/myContact/software-nastran', icon: 'ri-add-circle-line', text: 'Nastran' },
            { to: '/partner/myContact/software-patran', icon: 'ri-add-circle-line', text: 'Patran' },
            { to: '/partner/myContact/software-msc-cradle-cfd', icon: 'ri-add-circle-line', text: 'MSC Cradle CFD' },
            { to: '/partner/myContact/software-msc-cosim', icon: 'ri-add-circle-line', text: 'MSC CoSim' },
            { to: '/partner/myContact/software-romax', icon: 'ri-add-circle-line', text: 'Romax' },
            { to: '/partner/myContact/software-easy5', icon: 'ri-add-circle-line', text: 'Easy5' },
            { to: '/partner/myContact/software-elements', icon: 'ri-add-circle-line', text: 'Elements' },
            { to: '/partner/myContact/software-material-center', icon: 'ri-add-circle-line', text: 'Material Center' },
            { to: '/partner/myContact/software-digimat', icon: 'ri-add-circle-line', text: 'Digimat' },
            { to: '/partner/myContact/software-material-center-databanks', icon: 'ri-add-circle-line', text: 'Material Center Databanks' },
            { to: '/partner/myContact/software-odyssee', icon: 'ri-add-circle-line', text: 'ODYSSEE' },
            { to: '/partner/myContact/software-simufact', icon: 'ri-add-circle-line', text: 'Simufact' },
            { to: '/partner/myContact/software-fti-formingsuite', icon: 'ri-add-circle-line', text: 'FTI FormingSuite' },
            { to: '/partner/myContact/software-vtd-scale', icon: 'ri-add-circle-line', text: 'VTD Scale' },
            { to: '/partner/myContact/software-vtd', icon: 'ri-add-circle-line', text: 'VTD' },
            { to: '/partner/myContact/software-cloud', icon: 'ri-add-circle-line', text: 'Cloud' },
            { to: '/partner/myContact/software-actran', icon: 'ri-add-circle-line', text: 'Actran' },

          ]

        }
      ],
      links: [
        { to: '/partner/myContact/engineering-department', icon: 'ri-add-circle-line', text: 'Engineering Department' },
        { to: '/partner/myContact/purchase-sales-department', icon: 'ri-add-circle-line', text: 'Purchase and Sales Department' },
      ],
    },
    {
      id: 'CustomerSuccessTeams',
      title: `Customer Success Teams at ${store.companyName}`,
      icon: 'ri-team-line',
      hasdb: false,
      iconColor: 'green',
      links: [
        {
          text: 'View Team Contacts',
          icon: 'ri-team-line',
          to: `/partner/viewTeams/contact/htss`
        },
        {
          text: 'View Team Tree',
          icon: 'ri-team-line',
          to: `/partner/viewTeams/${slugify(store.companyName)}/${store.team_id}`
        }
      ],
    },
    {
      id: `Customer Support`,
      title: `Customer Support at ${store.companyName}`,
      icon: 'ri-customer-service-2-line',
      hasdb: false,
      iconColor: 'orange',
      groups: [
        {
          key: 'Tickets',
          title: 'Tickets',
          icon: 'ri-ticket-line',
          links: [
            { to: '/partner/Customer-Support/UnsolvedticketIssue', icon: 'ri-alert-line', text: 'Unresolved Issued Tickets' },
            { to: '/partner/Customer-Support/SolvedticketIssue', icon: 'ri-check-line', text: 'Solved Issued Tickets' },
          ]
        },
        {
          key: 'live',
          title: 'Live Support',
          icon: 'ri-chat-3-line',
          sub_groups: [
            {
              key: 'Live Call',
              title: 'Live Call',
              icon: 'ri-phone-line',
              links: [],
              sub_sub_groups: [
                {
                  key: 'Approved Call Schedule',
                  title: 'Approved Call Schedule',
                  icon: 'ri-calendar-check-line',
                  links: [
                    { to: '/partner/Customer-Support/Live-Support/Live-Call/ApprovedCallSchedules/ApprovedList', icon: 'ri-list-check', text: 'Approved Call Schedule List' },
                    { to: '/partner/Customer-Support/Live-Support/Live-Call/ApprovedCallSchedules/Today', icon: 'ri-calendar-todo-line', text: 'Todays' },
                    { to: '/partner/Customer-Support/Live-Support/Live-Call/ApprovedCallSchedules/Previous', icon: 'ri-arrow-left-line', text: 'Previous' },
                    { to: '/partner/Customer-Support/Live-Support/Live-Call/ApprovedCallSchedules/Completed', icon: 'ri-check-double-line', text: 'Completed' },
                  ]
                },
                {
                  key: 'Completed Call Schedule',
                  title: 'Completed Call Schedule',
                  icon: 'ri-checkbox-circle-line',
                  links: [
                    { to: '/partner/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/CompletedCallList', icon: 'ri-list-check', text: 'Completed Call Schedule List' },
                    { to: '/partner/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/Today', icon: 'ri-calendar-todo-line', text: 'Todays' },
                    { to: '/partner/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/CurrentWeek', icon: 'ri-calendar-week-line', text: 'Current Week' },
                    { to: '/partner/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/Completed', icon: 'ri-check-double-line', text: 'Completed' },
                  ]
                },

              ]
            },
            {
              key: 'Live Chat',
              title: 'Live Chat',
              icon: 'ri-message-3-line',
              links: [],
              sub_sub_groups: [
                {
                  key: 'Approved Chat Schedule',
                  title: 'Approved Chat Schedule',
                  icon: 'ri-calendar-check-line',
                  links: [
                    { to: '/partner/Customer-Support/Live-Support/Live-Chat/ApprovedChatSchedules/ApprovedList', icon: 'ri-list-check', text: 'Approved Chat Schedule List' },
                    { to: '/partner/Customer-Support/Live-Support/Live-Chat/ApprovedChatSchedules/Today', icon: 'ri-calendar-todo-line', text: 'Todays' },
                    { to: '/partner/Customer-Support/Live-Support/Live-Chat/ApprovedChatSchedules/Previous', icon: 'ri-arrow-left-line', text: 'Previous' },
                    { to: '/partner/Customer-Support/Live-Support/Live-Chat/ApprovedChatSchedules/Completed', icon: 'ri-check-double-line', text: 'Completed' },
                  ]
                },
                {
                  key: 'Completed Chat Schedule',
                  title: 'Completed Chat Schedule',
                  icon: 'ri-checkbox-circle-line',
                  links: [
                    { to: '/partner/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/CompletedCallList', icon: 'ri-list-check', text: 'Completed Chat Schedule List' },
                    { to: '/partner/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/Today', icon: 'ri-calendar-todo-line', text: 'Todays' },
                    { to: '/partner/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/CurrentWeek', icon: 'ri-calendar-week-line', text: 'Current Week' },
                    { to: '/partner/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/Completed', icon: 'ri-check-double-line', text: 'Completed' },
                  ]
                },

              ]
            },
          ]
        },
        {
          key: 'onsite',
          title: 'Onsite Support',
          icon: 'ri-home-gear-line',
          links: [
            { to: '/partner/Customer-Support/onsite/PendingSupportRequests', icon: 'ri-time-line', text: 'Pending Support Requests' },
            { to: '/partner/Customer-Support/onsite/AcceptedSupportRequests', icon: 'ri-check-line', text: 'Accepted Support Requests' },
          ],
          sub_groups: [
            {
              key: 'Completed Support Requests',
              title: 'Completed Support Requests',
              icon: 'ri-check-double-line',
              links: [
                { to: '/partner/Customer-Support/onsite/CompletedSupportRequest/AllList', icon: 'ri-list-check', text: 'All List' },
                { to: '/partner/Customer-Support/onsite/CompletedSupportRequest/Today', icon: 'ri-calendar-todo-line', text: 'Todays' },
                { to: '/partner/Customer-Support/onsite/CompletedSupportRequest/CurrentWeek', icon: 'ri-calendar-week-line', text: 'Current Week' },
                { to: '/partner/Customer-Support/onsite/CompletedSupportRequest/CurrentMonth', icon: 'ri-calendar-month-line', text: 'Current Month' },
                { to: '/partner/Customer-Support/onsite/CompletedSupportRequest/CurrentQuarter', icon: 'ri-calendar-quarter-line', text: 'Current Quarter' },
              ],
            }]
        }
      ]
    },
    {
      id: 'HTSS Training',
      title: `HTSS Training at ${store.companyName}`,
      icon: 'ri-graduation-cap-line',
      hasdb: false,
      iconColor: 'purple',
      groups: [
        {
          key: 'HTSS Training1',
          title: 'HTSS Training',
          icon: 'ri-book-open-line',
          links: [
            { to: '/partner_individual/htss-training/Training-List/CurrentTraining', icon: 'ri-play-circle-line', text: 'Current Training' },
            { to: '/partner/htss-training/Training-List/UpcomingTraining', icon: 'ri-calendar-schedule-line', text: 'Upcoming Training' },
            { to: '/partner/htss-training/Training-List/CompletedTraining', icon: 'ri-check-double-line', text: 'Completed Training' },
          ]
        },
        {
          key: 'HTSS Training for HTSS CSTMR',
          title: 'HTSS Training for HTSS CSTMR',
          icon: 'ri-building-line',
          links: [
            { to: '/partner/htss-training/HTSS-Customer/CurrentTraining', icon: 'ri-play-circle-line', text: 'Current Training' },
            { to: '/partner/htss-training/HTSS-Customer/UpcomingTraining', icon: 'ri-calendar-schedule-line', text: 'Upcoming Training' },
            { to: '/partner/htss-training/HTSS-Customer/CompletedTraining', icon: 'ri-check-double-line', text: 'Completed Training' },
          ]
        },
        {
          key: 'HTSS Training for Independent CSTMR',
          title: 'HTSS Training for Independent CSTMR',
          icon: 'ri-user-line',
          links: [
            { to: '/partner/htss-training/Independent-Customer/CurrentTraining', icon: 'ri-play-circle-line', text: 'Current Training' },
            { to: '/partner/htss-training/Independent-Customer/UpcomingTraining', icon: 'ri-calendar-schedule-line', text: 'Upcoming Training' },
            { to: '/partner/htss-training/Independent-Customer/CompletedTraining', icon: 'ri-check-double-line', text: 'Completed Training' },
          ]
        },
        {
          key: 'HTSS Training for Independent User',
          title: 'HTSS Training for Independent User',
          icon: 'ri-user-star-line',
          links: [
            { to: '/partner/htss-training/Independent-User/CurrentTraining', icon: 'ri-play-circle-line', text: 'Current Training' },
            { to: '/partner/htss-training/Independent-User/UpcomingTraining', icon: 'ri-calendar-schedule-line', text: 'Upcoming Training' },
            { to: '/partner/htss-training/Independent-User/CompletedTraining', icon: 'ri-check-double-line', text: 'Completed Training' },
          ]
        },
        {
          key: 'HTSS Training for Hexagon CSTMR',
          title: 'HTSS Training for Hexagon CSTMR',
          icon: 'ri-building-3-line',
          links: [
            { to: '/partner/htss-training/Hexagon-Customer/CurrentTraining', icon: 'ri-play-circle-line', text: 'Current Training' },
            { to: '/partner/htss-training/Hexagon-Customer/UpcomingTraining', icon: 'ri-calendar-schedule-line', text: 'Upcoming Training' },
            { to: '/partner/htss-training/Hexagon-Customer/CompletedTraining', icon: 'ri-check-double-line', text: 'Completed Training' },
          ]
        },
        {
          key: 'All Schedules',
          title: 'HTSS Training Schedules',
          icon: 'ri-calendar-line',
          links: [
            { to: '/partner/htss-training/Schedules/AllTrainingList', icon: 'ri-list-check', text: 'List All Training' },
            { to: '/partner/htss-training/Schedules/CurrentMonth', icon: 'ri-calendar-month-line', text: 'Current Month Training' },
            { to: '/partner/htss-training/Schedules/CurrentQuarter', icon: 'ri-calendar-quarter-line', text: 'Current Quarter Training' },
            { to: '/partner/htss-training/Schedules/CurrentYear', icon: 'ri-calendar-year-line', text: 'Current Year Training' },
            { to: '/partner/htss-training/Schedules/TrainingBySoftware', icon: 'ri-computer-line', text: 'Training By Software' },
            { to: '/partner/htss-training/Schedules/TrainingBySolution', icon: 'ri-lightbulb-line', text: 'Training By Solution' },
          ]
        },
      ]
    },
    {
      id: `Task Management`,
      title: `My Task Management at ${store.companyName}`,
      icon: 'ri-auction-line',
      hasdb: false,
      iconColor: 'red',
      links: [
        { to: '/partner/success-team-task/all', icon: 'ri-add-circle-line', text: 'All Task' },

      ],
      groups: [
        {
          key: 'Partner Task',
          title: 'Partner Task',
          icon: 'ri-book-open-line',
          links: [
            { to: '/partner/success-team-task/create', icon: 'ri-add-circle-line', text: 'Create Task' },
            { to: '/partner/success-team-task/list', icon: 'ri-list-check', text: 'Task List' },
          ]
        },
        {
          key: 'My Task',
          title: 'My Task',
          icon: 'ri-book-open-line',
          links: [
            { to: '/partner/success-team-task/create-my-task', icon: 'ri-add-circle-line', text: 'Create Task' },
            { to: '/partner/success-team-task/list-my-task', icon: 'ri-list-check', text: 'Task List' },
          ]
        },

      ]
    },
    {
        id: 'SuccessTeamMeetingSchedule',
        title: `My Meeting Schedule Management at ${store.companyName}`,
        icon: 'ri-user-community-line',
        key: 'myScheduledMeeting',
        links: [
          {
            to: '/partner/meeting-management/create-meeting-schedule',
            text: 'Create Meeting Schedule',
            icon: 'ri-calendar-2-line'
          },
           {
            to: '/partner/meeting-management/schedule-list',
            text: 'Meetings Scheduled by Me',
            icon: 'ri-calendar-2-line'
          },
        ],
        groups: [
          {
            key: 'ScheduledMeetings',
            title: 'Scheduled Meeting',
            icon: 'ri-add-circle-line',
            links: [
                {
                to: '/partner/meeting-management/scheduled-meetings/today',
                text: 'Today\'s Scheduled Meetings',
                icon: 'ri-calendar-2-line'
              },
              {
                to: '/partner/meeting-management/scheduled-meetings/thisWeek',
                text: 'This Week\'s Scheduled Meetings',
                icon: 'ri-calendar-2-line'
              },
              {
                to: '/partner/meeting-management/scheduled-meetings/thisMonth',
                text: 'This Month\'s Scheduled Meetings',
                icon: 'ri-calendar-2-line'
              },
              {
                to: '/partner/meeting-management/scheduled-meetings/thisQuarter',
                text: 'This Quarter\'s Scheduled Meetings',
                icon: 'ri-calendar-2-line'
              },
              {
                to: '/partner/meeting-management/scheduled-meetings/thisYear',
                text: 'This Year\'s Scheduled Meetings',
                icon: 'ri-calendar-2-line'
              }
            ]
          },
        ]
      },
    {
      id: `Sales Tech Actions`,
      title: `Sales Tech Actions at ${store.companyName}`,
      icon: 'ri-bar-chart-2-line',
      hasdb: false,
      iconColor: 'teal',
      links: [
        { to: '/partner/sales-tech/current', icon: 'ri-add-circle-line', text: 'Current Deals' },
        { to: '/partner/sales-tech/proposed', icon: 'ri-list-check', text: 'Proposed Deals' },
      ]
    },
    {
      id: 'Users',
      title: `Users at ${store.companyName}`,
      icon: 'ri-user-line',
      hasdb: false,
      iconColor: 'pink',
      links: [
        { to: '/partner/htss-users/htssCustomer', icon: 'ri-building-line', text: 'List By HTSS CSTMR' },
        { to: '/partner/htss-users/hexagonCustomer', icon: 'ri-building-3-line', text: 'List By Hexagon CSTMR' },
        { to: '/partner/htss-users/independentCustomer', icon: 'ri-user-line', text: 'List by Independent CSTMR' },
        { to: '/partner/htss-users/independentUser', icon: 'ri-user-star-line', text: 'List of Independent Users' },
      ],
    },
    {
      id: 'Software',
      title: `Softwares at ${store.companyName}`,
      icon: 'ri-computer-line',
      hasdb: false,
      iconColor: 'orange',
      links: [
        { to: '/partner/software/AddSoftware', icon: 'ri-add-circle-line', text: 'Add Software' },
        { to: '/partner/software/ListSoftware', icon: 'ri-list-check', text: 'List Of Current Software' },
        { to: '/partner/software/UsabilityOfCurrentSoftware', icon: 'ri-list-check', text: 'Usability Of Current Software' },
        { to: '/partner/software/usabilityGraph', icon: 'ri-list-check', text: 'Usability Graph' },
      ]
    },
    {
      id: 'Solution',
      title: `Solutions at ${store.companyName}`,
      icon: 'ri-lightbulb-line',
      hasdb: false,
      iconColor: 'blue',
      links: [
        { to: '/partner/solution/AddSoftware', icon: 'ri-add-circle-line', text: 'Add Solution' },
        { to: '/partner/solution/ListSoftware', icon: 'ri-list-check', text: 'List Of Current Solutions' },
        { to: '/partner/solution/UsabilityOfCurrentSolution', icon: 'ri-list-check', text: 'Usability Of Current Solution' },
        { to: '/partner/solution/usabilityGraph', icon: 'ri-list-check', text: 'Usability Graph' },
      ]
    },
    {
      id: 'ActivityReports',
      title: `Activity Reports for ${store.companyName}`,
      icon: 'ri-file-chart-line',
      hasdb: false,
      iconColor: 'indigo',
      links: [
        { to: '/partner/activity-report/approved', icon: 'ri-list-check', text: 'Activity Report List' }
      ]
    },
  ]
})
</script>

<style scoped>
.router-link-active {
  background-color: #f0f9ff;
  color: #1e40af;
  border: 1px solid #93c5fd;
  border-radius: 0.375rem;
  padding: 0.5rem;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.shadow-xs {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
</style>
