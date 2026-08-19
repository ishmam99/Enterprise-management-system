<template>
  <div
    class="bg-gray-200 bg-cover w-1/5 min-w-[300px] min-h-screen sticky top-[80px] shadow-lg border-r border-gray-200">
    <div
      class="bg-gray-300 p-5 h-full flex flex-col font-semibold text-lg backdrop-blur-sm">
      <p class="bg-red-500"></p>
      <!-- <UserDashboardInfo /> -->
      <!-- {{ store.currentSubMenu  }} -->

      <router-link to="/partner"
        class="mb-4 bg-gray-100 rounded-2xl px-3 space-y-2 py-3 shadow-sm border ">
        <h4
          class="font-bold text-center text-lg p-2 rounded-xl bg-white backdrop-blur-sm text-blue-800 border shadow-sm">
          Partner Dashboard <br> Welcome, {{ store?.user?.name }}

        </h4>


      </router-link>
      <p class="text-sky-500"></p>
      <div class="space-y-3 mt-4">
        <div v-for="menu in menus" :key="menu.id"
          class="accordion-group rounded-xl bg-white transition-all duration-300 hover:transform hover:scale-[1.02]">
          <div v-if="activeTab === menu?.id || activeTab === 'All'"
            class="flex items-center justify-between w-full p-4 border border-gray-300 rounded-xl transition-all duration-300 group shadow-sm"
            :class="openSection === menu.id
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md'
              : 'bg-white  hover:from-blue-100 hover:to-cyan-100 text-gray-800 hover:shadow-md border border-gray-300'"
            @click="toggleAccordion(menu.id, menu.hasdb)">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-xl backdrop-blur-sm shadow-sm bg-white border border-gray-300">
                <i class="text-lg" :class="`text-${menu.iconColor}-500 ${menu.icon}`" ></i>
              </div>
              <span class="font-semibold">{{ menu.title }}</span>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"
              class="transition-transform duration-300 transform" :class="openSection === menu.id ? 'text-white rotate-180' : 'text-gray-600'">
              <path
                d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" />
            </svg>
          </div>

          <div v-if="activeTab === menu.id || (activeTab == 'All' && currentAccordions === menu.id)"
            class="ml-4 mt-2 space-y-2 border-l-2 bg-white border-gray-300 pl-4">
            <template v-if="menu.links">
              <router-link v-for="link in menu.links" :key="link.to" :to="link.to"
                class="flex items-center gap-3 p-3 bg-slate-200 text-sm rounded-xl transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 hover:shadow-sm group border border-transparent hover:border-blue-200 text-gray-700"
                active-class="router-link-active bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border border-blue-300 shadow-sm">
                <div class="p-1.5 rounded-lg bg-white border border-gray-300 group-hover:bg-blue-100 transition-colors">
                  <i :class="link.icon+` text-${menu.iconColor}-500`"></i>
                </div>
                <span class="font-medium">{{ link.text }}</span>
              </router-link>
            </template>

            <template v-if="menu.groups">
              <div v-for="group in menu.groups" :key="group.key" class="accordion-group rounded-lg">
                <button v-if="store.currentMenu == 'My Industry Solution Management' && store.currentSubMenu != group"
                  @click="toggleNested(group.key)"
                  class="flex items-center justify-between w-full p-3 rounded-xl transition-all duration-300 hover:bg-blue-50 group border border-transparent hover:border-blue-200 hover:text-blue-700 hover:shadow-sm text-gray-700">
                  <div class="flex items-center gap-3">
                    <div class="p-1.5 rounded-lg bg-white border border-gray-300 group-hover:bg-blue-100 transition-colors">
                      <i v-if="!group.icon" class="ri-add-line" :class="`text-${menu.iconColor}-500`"></i>
                      <i v-else :class="group.icon+` text-${menu.iconColor}-500`"></i>
                    </div>
                    <span class="text-base text-start font-medium">{{ group.title }}</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"
                    class="transition-transform duration-300 text-gray-600"
                    :class="{ 'rotate-180': dropdown === group.key }">
                    <path
                      d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" />
                  </svg>
                </button>

                <button v-else @click="toggleNested(group.key)"
                  class="flex items-center bg-gray-200 justify-between w-full p-3 rounded-xl transition-all duration-300 hover:bg-blue-50 group border border-transparent hover:border-blue-200 hover:text-blue-700 hover:shadow-sm text-gray-700">
                  <div class="flex items-center gap-3">
                    <div class="p-1.5 rounded-lg bg-white border border-gray-300 group-hover:bg-blue-100 transition-colors">
                      <i v-if="!group.icon" class="ri-add-line" :class="`text-${menu.iconColor}-500`"></i>
                      <i v-else :class="group.icon+` text-${menu.iconColor}-500`"></i>
                    </div>
                    <span class="text-base text-start font-medium">{{ group.title }}</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"
                    class="transition-transform duration-300 text-gray-600"
                    :class="{ 'rotate-180': dropdown === group.key }">
                    <path
                      d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" />
                  </svg>
                </button>

                <div v-show="dropdown === group.key || store.currentSubMenu == group.key"
                  class="ml-4 mt-2 space-y-2 border-l-2 border-gray-300 pl-4">
                  <router-link v-for="link in group.links" :key="link.to" :to="link.to"
                    class="flex items-center bg-gray-300 gap-3 p-3 text-sm rounded-xl transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 hover:shadow-sm group border border-transparent hover:border-blue-200 text-gray-700"
                    active-class="router-link-active bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-300 shadow-sm">
                    <div class="p-1.5 rounded-lg bg-white border border-gray-300 group-hover:bg-emerald-100 transition-colors">
                      <i :class="link.icon" class="text-emerald-500"></i>
                    </div>
                    <span class="font-medium">{{ link.text }}</span>
                  </router-link>

                  <template v-if="group.sub_groups">
                    <div v-for="sub_groups in group.sub_groups" :key="sub_groups.key"
                      class="accordion-group rounded-lg">
                      <button @click="toggleSubNested(sub_groups.key)"
                        class="flex items-center justify-between bg-gray-300 w-full p-3 rounded-xl transition-all duration-300 hover:bg-blue-50 group border border-transparent hover:border-blue-200 hover:text-blue-700 hover:shadow-sm text-gray-700">
                        <div class="flex items-center gap-3">
                          <div class="p-1.5 rounded-lg bg-white border border-gray-300 group-hover:bg-amber-100 transition-colors">
                            <i v-if="!sub_groups.icon" class="ri-add-line text-amber-500"></i>
                            <i v-else :class="sub_groups.icon" class="text-amber-500"></i>
                          </div>
                          <span class="text-base text-start font-medium">{{ sub_groups.title }}</span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"
                          fill="currentColor" class="transition-transform duration-300 text-gray-600"
                          :class="{ 'rotate-180': subDropdown === sub_groups.key }">
                          <path
                            d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" />
                        </svg>
                      </button>

                      <div v-show="subDropdown === sub_groups.key"
                        class="ml-4 mt-2 space-y-2 border-l-2 border-gray-300 pl-4">
                        <router-link v-for="link in sub_groups.links" :key="link.to" :to="link.to"
                          class="flex items-center gap-3 p-3 text-sm rounded-xl transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 hover:shadow-sm group border border-transparent hover:border-blue-200 text-gray-700"
                          active-class="router-link-active bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border border-amber-300 shadow-sm">
                          <div class="p-1.5 rounded-lg bg-white border border-gray-300 group-hover:bg-amber-100 transition-colors">
                            <i :class="link.icon" class="text-amber-500"></i>
                          </div>
                          <span class="font-medium">{{ link.text }}</span>
                        </router-link>
                        <template v-if="sub_groups.sub_sub_groups">
                          <div v-for="sub_sub_group in sub_groups.sub_sub_groups" :key="sub_sub_group.key"
                            class="accordion-group">
                            <button @click="toggleSubSubNested(sub_sub_group.key)"
                              class="flex items-center justify-between w-full p-2 rounded-lg transition-all duration-300 hover:bg-blue-50 group hover:text-blue-700 text-gray-700">
                              <div class="flex items-center gap-2">
                                <svg v-if="!sub_sub_group.icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                  width="16" height="16" fill="currentColor" class="text-gray-600">
                                  <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" />
                                </svg>
                                <i v-else class="py-1 px-2 rounded-md"
                                  :class="`${sub_sub_group.icon} bg-${menu.iconColor}-100 text-${menu.iconColor}-600 border border-${menu.iconColor}-300`"></i>
                                <span class="text-base text-start">{{ sub_sub_group.title }}</span>
                              </div>

                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"
                                fill="currentColor" class="text-gray-600"
                                :class="{ 'rotate-180 transition-transform duration-300': dropdown === sub_sub_group.key }">
                                <path
                                  d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" />
                              </svg>
                            </button>

                            <div v-show="subsubDropdown === sub_sub_group.key"
                              class="ml-4 mt-1 space-y-1 border-l-2 border-gray-300 pl-3">

                              <router-link v-for="link in sub_sub_group.links" :key="link.to" :to="link.to"
                                class="flex items-center gap-2 p-2 text-sm rounded-lg transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 text-gray-700"
                                active-class="router-link-active">
                                <i class="py-1 px-2 rounded-md"
                                  :class="`${link.icon} bg-${menu.iconColor}-100 text-${menu.iconColor}-600 border border-${menu.iconColor}-300`"></i>

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

      <button type="button"
        class="py-3 px-6 mt-6 w-full bg-gradient-to-r from-red-100 to-pink-100 rounded-xl text-red-700 font-semibold transition-all duration-300 hover:from-red-200 hover:to-pink-200 hover:shadow-md hover:scale-[1.02] flex items-center justify-center gap-2 border border-red-300"
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

const getActivityCustomers = async () => {
  try {
    const res = await api().get('my-success-team')

    activityCustomers.value = res.data.data.data.map(item => {
      const name = item.company?.name || 'Unknown Customer'
      const id = item.id

      return {
        text: name,
        icon: 'ri-add-circle-line',
        to:{name:'partner-activity-report-company-id',params:{company:slugify(name),id:id}}
      }
    })
  } catch (error) {
    console.error('Activity Reports API failed', error)
  }
}
/* ================= CUSTOMER SUCCESS TEAMS (NEW) ================= */
const customerSuccessTeams = ref([])

const getCustomerSuccessTeams = async () => {
  try {
    const res = await api().get('/my-success-team')

    customerSuccessTeams.value = res.data.data.data.map(team => {
      const name = team.name || 'Unnamed Team'
      const id = team.id

      return {
        text: name,
        icon: 'ri-team-line',
        to: `/partner/viewTeams/${slugify(name)}/${id}`
      }
    })


    championContacts.value = res.data.data.data.map(team => {
      const name = team.company?.name || 'Unnamed Team'
      const id = team.company_id

      return {
        key: name,
        title: name,
        icon: 'ri-price-tag-3-line',
        sub_groups: [
          {
            key: 'bySolution',
            title: "By Solution",
            icon: 'ri-price-tag-3-line',
            links: [
              {
                to: {
                  name: "partner-champion-contact-by-solution-slug-company-id",
                  params: { company: name, id: id, slug: "structure-analysis-service" }
                },
                icon: 'ri-add-circle-line',
                text: 'Structure Analysis Service'
              },
              {
                to: {
                  name: "partner-champion-contact-by-solution-slug-company-id",
                  params: { company: name, id: id, slug: "system-dynamics-analysis-service" }
                },
                icon: 'ri-add-circle-line',
                text: 'System Dynamics Analysis Service'
              },
              {
                to: {
                  name: "partner-champion-contact-by-solution-slug-company-id",
                  params: { company: name, id: id, slug: "acoustics-analysis-service" }
                },
                icon: 'ri-add-circle-line',
                text: 'Acoustics Analysis Service'
              },
              {
                to: {
                  name: "partner-champion-contact-by-solution-slug-company-id",
                  params: { company: name, id: id, slug: "fluids-analysis-service" }
                },
                icon: 'ri-add-circle-line',
                text: 'Fluids Analysis Service'
              },
              {
                to: {
                  name: "partner-champion-contact-by-solution-slug-company-id",
                  params: { company: name, id: id, slug: "autonomous-analysis-service" }
                },
                icon: 'ri-add-circle-line',
                text: 'Autonomous Analysis Service'
              },
              {
                to: {
                  name: "partner-champion-contact-by-solution-slug-company-id",
                  params: { company: name, id: id, slug: "vmc-analysis-service" }
                },
                icon: 'ri-add-circle-line',
                text: 'VM&C Analysis Service'
              },
              {
                to: {
                  name: "partner-champion-contact-by-solution-slug-company-id",
                  params: { company: name, id: id, slug: "icme-analysis-service" }
                },
                icon: 'ri-add-circle-line',
                text: 'ICME Analysis Service'
              },
            ]
          },
          {
            key: 'byDepartment',
            title: "By Department",
            icon: 'ri-price-tag-3-line',
            links: [
              { to: `/partner/champion-contact-by-department/engineering/${id}`, icon: 'ri-add-circle-line', text: 'Engineering' },
              { to: `/partner/champion-contact-by-department/purchase-and-sales/${id}`, icon: 'ri-add-circle-line', text: 'Purchase and Sales' },

            ]
          }
        ],
      }
    })

    //
  } catch (error) {
    console.error('Customer Success Teams API failed', error)
  }
}


onMounted(() => {
  getActivityCustomers()
  getCustomerSuccessTeams()
})


/* ================= MENUS (REACTIVE FIX) ================= */


const menus = computed(() => {

  return [
    {
      id: 'Customer Support',
      title: 'Customer Support',
      icon: 'ri-auction-line',
      hasdb: false,
      iconColor: 'yellow',
      groups: [
        {
          key: 'Tickets',
          title: 'Tickets',
          icon: 'ri-price-tag-3-line',
          links: [
            { to: '/partner/Customer-Support/UnsolvedticketIssue', icon: 'ri-add-circle-line', text: 'Unresolved Issued Tickets' },
            { to: '/partner/Customer-Support/SolvedticketIssue', icon: 'ri-add-circle-line', text: 'Solved Issued Tickets' },
          ]
        },
        {
          key: 'live',
          title: 'Live Support',
          icon: 'ri-price-tag-3-line',
          sub_groups: [
            {
              key: 'Live Call',
              title: 'Live Call',
              icon: 'ri-price-tag-3-line',
              links: [],
              sub_sub_groups: [
                {
                  key: 'Approved Call Schedule',
                  title: 'Approved Call Schedule',
                  icon: 'ri-price-tag-3-line',
                  links: [
                    { to: '/partner/Customer-Support/Live-Support/Live-Call/ApprovedCallSchedules/ApprovedList', icon: 'ri-add-circle-line', text: 'Approved Call Schedule List' },
                    { to: '/partner/Customer-Support/Live-Support/Live-Call/ApprovedCallSchedules/Today', icon: 'ri-add-circle-line', text: 'Todays' },
                    { to: '/partner/Customer-Support/Live-Support/Live-Call/ApprovedCallSchedules/Previous', icon: 'ri-add-circle-line', text: 'Previous' },
                    { to: '/partner/Customer-Support/Live-Support/Live-Call/ApprovedCallSchedules/Completed', icon: 'ri-add-circle-line', text: 'Completed' },
                  ]
                },
                {
                  key: 'Completed Call Schedule',
                  title: 'Completed Call Schedule',
                  icon: 'ri-price-tag-3-line',
                  links: [
                    { to: '/partner/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/CompletedCallList', icon: 'ri-add-circle-line', text: 'Completed Call Schedule List' },
                    { to: '/partner/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/Today', icon: 'ri-add-circle-line', text: 'Todays' },
                    { to: '/partner/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/CurrentWeek', icon: 'ri-add-circle-line', text: 'Current Week' },
                    { to: '/partner/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/Completed', icon: 'ri-add-circle-line', text: 'Completed' },
                  ]
                },

              ]
            },
            {
              key: 'Live Chat',
              title: 'Live Chat',
              icon: 'ri-price-tag-3-line',
              links: [],
              sub_sub_groups: [
                {
                  key: 'Approved Chat Schedule',
                  title: 'Approved Chat Schedule',
                  icon: 'ri-price-tag-3-line',
                  links: [
                    { to: '/partner/Customer-Support/Live-Support/Live-Chat/ApprovedChatSchedules/ApprovedList', icon: 'ri-add-circle-line', text: 'Approved Chat Schedule List' },
                    { to: '/partner/Customer-Support/Live-Support/Live-Chat/ApprovedChatSchedules/Today', icon: 'ri-add-circle-line', text: 'Todays' },
                    { to: '/partner/Customer-Support/Live-Support/Live-Chat/ApprovedChatSchedules/Previous', icon: 'ri-add-circle-line', text: 'Previous' },
                    { to: '/partner/Customer-Support/Live-Support/Live-Chat/ApprovedChatSchedules/Completed', icon: 'ri-add-circle-line', text: 'Completed' },
                  ]
                },
                {
                  key: 'Completed Chat Schedule',
                  title: 'Completed Chat Schedule',
                  icon: 'ri-price-tag-3-line',
                  links: [
                    { to: '/partner/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/CompletedCallList', icon: 'ri-add-circle-line', text: 'Completed Chat Schedule List' },
                    { to: '/partner/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/Today', icon: 'ri-add-circle-line', text: 'Todays' },
                    { to: '/partner/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/CurrentWeek', icon: 'ri-add-circle-line', text: 'Current Week' },
                    { to: '/partner/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/Completed', icon: 'ri-add-circle-line', text: 'Completed' },
                  ]
                },

              ]
            },
          ]

        },
        {
          key: 'onsite',
          title: 'Onsite Support ',
          icon: 'ri-price-tag-3-line',
          links: [
            { to: '/partner/Customer-Support/onsite/PendingSupportRequests', icon: 'ri-list-check', text: 'Pending Support Requests' },
            { to: '/partner/Customer-Support/onsite/AcceptedSupportRequests', icon: 'ri-list-check', text: 'Accepted Support Requests' },
          ],

          sub_groups: [
            {
              key: 'Completed Support Requests',
              title: 'Completed Support Requests',
              icon: 'ri-price-tag-3-line',
              links: [
                { to: '/partner/Customer-Support/onsite/CompletedSupportRequest/AllList', icon: 'ri-add-circle-line', text: 'All List' },
                { to: '/partner/Customer-Support/onsite/CompletedSupportRequest/Today', icon: 'ri-add-circle-line', text: 'Todays' },
                { to: '/partner/Customer-Support/onsite/CompletedSupportRequest/CurrentWeek', icon: 'ri-add-circle-line', text: 'Current Week' },
                { to: '/partner/Customer-Support/onsite/CompletedSupportRequest/CurrentMonth', icon: 'ri-add-circle-line', text: 'Current Month' },
                { to: '/partner/Customer-Support/onsite/CompletedSupportRequest/CurrentQuarter', icon: 'ri-add-circle-line', text: 'Current Quarter' },
              ],
            }]
        }
        ,]

    },
    {
      id: 'Users',
      title: 'HTSS Users',
      icon: 'ri-auction-line',
      hasdb: false,
      iconColor: 'red',
      links: [
        { to: '/partner/htss-users/htssCustomer', icon: 'ri-add-circle-line', text: 'List By HTSS CSTMR' },
        { to: '/partner/htss-users/hexagonCustomer', icon: 'ri-add-circle-line', text: 'List By Hexagon CSTMR' },
        { to: '/partner/htss-users/independentCustomer', icon: 'ri-add-circle-line', text: 'List by Independent CSTMR' },
        { to: '/partner/htss-users/independentUser', icon: 'ri-add-circle-line', text: 'List of Independent Users' },
      ],
    },
    {
      id: 'HTSS Training',
      title: 'HTSS Training',
      icon: 'ri-auction-line',
      hasdb: false,
      iconColor: 'sky',

      groups: [
        {
          key: 'HTSS Training1',
          title: 'HTSS Training',
          icon: 'ri-price-tag-3-line',
          links: [
            { to: '/partner/htss-training/Training-List/CurrentTraining', icon: 'ri-add-circle-line', text: 'Current Training' },
            { to: '/partner/htss-training/Training-List/UpcomingTraining', icon: 'ri-list-check', text: 'Upcoming Training' },
            { to: '/partner/htss-training/Training-List/CompletedTraining', icon: 'ri-list-check', text: 'Completed Training' },
          ]
        },
        {
          key: 'HTSS Training for HTSS CSTMR',
          title: 'HTSS Training for HTSS CSTMR',
          icon: 'ri-price-tag-3-line',
          links: [
            { to: '/partner/htss-training/HTSS-Customer/CurrentTraining', icon: 'ri-add-circle-line', text: 'Current Training' },
            { to: '/partner/htss-training/HTSS-Customer/UpcomingTraining', icon: 'ri-list-check', text: 'Upcoming Training' },
            { to: '/partner/htss-training/HTSS-Customer/CompletedTraining', icon: 'ri-list-check', text: 'Completed Training' },
          ]
        },
        {
          key: 'HTSS Training for Independent CSTMR',
          title: 'HTSS Training for Independent CSTMR',
          icon: 'ri-price-tag-3-line',
          links: [
            { to: '/partner/htss-training/Independent-Customer/CurrentTraining', icon: 'ri-add-circle-line', text: 'Current Training' },
            { to: '/partner/htss-training/Independent-Customer/UpcomingTraining', icon: 'ri-list-check', text: 'Upcoming Training' },
            { to: '/partner/htss-training/Independent-Customer/CompletedTraining', icon: 'ri-list-check', text: 'Completed Training' },
          ]
        },
        {
          key: 'HTSS Training for Independent User',
          title: 'HTSS Training for Independent User',
          icon: 'ri-price-tag-3-line',
          links: [
            { to: '/partner/htss-training/Independent-User/CurrentTraining', icon: 'ri-add-circle-line', text: 'Current Training' },
            { to: '/partner/htss-training/Independent-User/UpcomingTraining', icon: 'ri-list-check', text: 'Upcoming Training' },
            { to: '/partner/htss-training/Independent-User/CompletedTraining', icon: 'ri-list-check', text: 'Completed Training' },
          ]
        },
        {
          key: 'HTSS Training for Hexagon CSTMR',
          title: 'HTSS Training for Hexagon CSTMR',
          icon: 'ri-price-tag-3-line',
          links: [
            { to: '/partner/htss-training/Hexagon-Customer/CurrentTraining', icon: 'ri-add-circle-line', text: 'Current Training' },
            { to: '/partner/htss-training/Hexagon-Customer/UpcomingTraining', icon: 'ri-list-check', text: 'Upcoming Training' },
            { to: '/partner/htss-training/Hexagon-Customer/CompletedTraining', icon: 'ri-list-check', text: 'Completed Training' },
          ]
        },
        {
          key: 'All Schedules',
          title: 'HTSS Training Schedules',
          icon: 'ri-price-tag-3-line',
          links: [
            { to: '/partner/htss-training/Schedules/AllTrainingList', icon: 'ri-add-circle-line', text: 'List All Training' },
            { to: '/partner/htss-training/Schedules/CurrentMonth', icon: 'ri-list-check', text: 'Current Month Training' },
            { to: '/partner/htss-training/Schedules/CurrentQuarter', icon: 'ri-list-check', text: 'Current Quarter Training' },
            { to: '/partner/htss-training/Schedules/CurrentYear', icon: 'ri-list-check', text: 'Current Year Training' },
            { to: '/partner/htss-training/Schedules/TrainingBySoftware', icon: 'ri-list-check', text: 'Training By Software' },
            { to: '/partner/htss-training/Schedules/TrainingBySolution', icon: 'ri-list-check', text: 'Training By Solution' },
          ]
        },
      ]

    },

    {
      id: 'Customer',
      title: 'Customer',
      icon: 'ri-auction-line',
      hasdb: false,
      iconColor: 'green',
      groups: [
        {
          key: 'Current Customer',
          title: 'Current Customer',
          icon: 'ri-price-tag-3-line',
          links: [
            { to: '/partner/Customer/CurrentCustomers/ByIndustry', icon: 'ri-list-check', text: 'By Industry' },
            { to: '/partner/Customer/CurrentCustomers/BySolution', icon: 'ri-list-check', text: 'By Solution' },
            { to: '/partner/Customer/CurrentCustomers/BySoftware', icon: 'ri-list-check', text: 'By Software' },
          ]
        },
        {
          key: 'All Schedules1',
          title: 'Registered Deal',
          icon: 'ri-price-tag-3-line',
          links: [
            { to: '/partner/Customer/RegisteredDeal/ByIndustry', icon: 'ri-add-circle-line', text: 'By Industry' },
            { to: '/partner/Customer/RegisteredDeal/BySolution', icon: 'ri-add-circle-line', text: 'By Solution' },
            { to: '/partner/Customer/RegisteredDeal/BySoftware', icon: 'ri-list-check', text: 'By Software' },
          ],
          sub_groups: [
            {
              key: 'Deal Closing',
              title: 'Deal Closing',
              icon: 'ri-price-tag-3-line',
              links: [
                { to: '/partner/Customer/DealClosing/currentMonth', icon: 'ri-add-circle-line', text: 'Current Month' },
                { to: '/partner/Customer/DealClosing/currentQuarter', icon: 'ri-list-check', text: 'Current Quarter' },
                { to: '/partner/Customer/DealClosing/currentYear', icon: 'ri-list-check', text: 'Current Year' },
              ]
            },
          ]
        },]

    },
    {
      id: 'Software',
      title: 'Software',
      icon: 'ri-auction-line',
      hasdb: false,
      iconColor: 'orange',
      links: [
        { to: '/partner/software/AddSoftware', icon: 'ri-add-circle-line', text: 'Add Software' },
        { to: '/partner/software/ListSoftware', icon: 'ri-add-circle-line', text: 'List Of Software' },
      ]

    },
    {
      id: 'Solution',
      title: 'Solution',
      icon: 'ri-auction-line',
      hasdb: false,
      iconColor: 'blue',
      links: [
        { to: '/partner/solution/AddSoftware', icon: 'ri-add-circle-line', text: 'Add Solution' },
        { to: '/partner/solution/ListSoftware', icon: 'ri-add-circle-line', text: 'List Of Solutions' },
      ]

    },
    {
      id: 'ActivityReports',
      title: 'Activity Reports',
      icon: 'ri-auction-line',
      hasdb: false,
      iconColor: 'blue',
      links: activityCustomers.value
    },
    {
      id: 'CustomerSuccessTeams',
      title: 'Customer Success Teams',
      icon: 'ri-team-line',
      hasdb: false,
      iconColor: 'emerald',
      links: customerSuccessTeams.value,
      groups: [
        {
          key: 'SuccessTeamTask',
          title: 'Task Management',
          icon: 'ri-price-tag-3-line',
          links: [
            { to: '/partner/success-team-task/create', icon: 'ri-add-circle-line', text: 'Create Task' },
            { to: '/partner/success-team-task/list', icon: 'ri-add-circle-line', text: 'Task List' },
          ]

        }
      ]


    },

    {
      id: 'championContacts',
      title: 'Champion Contacts',
      icon: 'ri-auction-line',
      hasdb: false,
      iconColor: 'blue',
      groups: championContacts.value,
    },
  ]
})
</script>


<style scoped>
.router-link-active {
  background: linear-gradient(to right, #dbeafe, #e0f2fe);
  color: #1e40af;
  border: 1px solid #93c5fd;
  border-radius: 0.5rem;
  padding: 0.75rem;
  transition:
    background-color 0.3s,
    color 0.3s;
}
</style>
