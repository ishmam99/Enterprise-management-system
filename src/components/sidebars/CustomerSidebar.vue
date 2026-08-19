<template>
  <div class="bg-slate-300 w-[400px] py-4 px-2 min-h-screen border-r border-gray-200">

    <div class="p-5 h-full flex flex-col">

      <!-- Header -->
      <div class="bg-white/90 rounded-xl p-4 mb-4 shadow-sm">
        <h4 class="font-bold text-center text-sm text-sky-700 mb-3 pb-2 border-b">
          Customer Dashboard
        </h4>
        <div class="flex justify-center">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-sky-600 to-blue-600 text-white text-sm rounded-full">
            <i class="ri-user-line"></i>
            {{ store?.user?.name }}
          </div>
        </div>
      </div>

      <!-- Dashboard -->
      <router-link
        to="/customer"
        class="flex justify-center mb-4 bg-white text-purple-600 font-medium py-2.5 rounded-xl shadow-sm hover:shadow-md">
        <i class="ri-dashboard-line mr-2"></i> Dashboard
      </router-link>

      <!-- Menu -->
      <nav class="flex flex-col gap-1">

        <div
          v-for="menu in dynamicMenus"
          :key="menu.id"
          class="bg-white rounded-xl overflow-hidden"
        >

          <!-- MENU HEADER -->
          <div
            class="flex justify-between px-3.5 py-2 text-blue-600 cursor-pointer hover:bg-blue-500 hover:text-white"
            @click="toggleAccordion(menu.id, menu.hasdb)"
          >
            <div class="flex items-center gap-3">
              <i
                class="w-8 h-8 flex items-center justify-center rounded-md text-white"
                :class="menu.icon"
                :style="{ backgroundColor: getMenuColor(menu.title) }"
              ></i>
              <span class="text-sm font-medium">{{ menu.title }}</span>
            </div>
            <i
              class="ri-arrow-down-s-line transition-transform"
              :class="{ 'rotate-180': currentAccordions === menu.id }"
            ></i>
          </div>

          
          <!-- MENU BODY -->
        <div v-if="currentAccordions === menu.id" class="ml-4 bg-white">

          <!-- DIRECT LINKS -->
          <router-link
            v-for="link in menu.links"
            :key="link.to"
            :to="link.to"
            class="flex gap-3 m-1 px-4 py-2.5 text-sm text-blue-700 border rounded-lg hover:bg-blue-500 hover:text-white"
            :class="{
              'bg-gradient-to-r from-blue-700/50 to-sky-700/50 border-l-4 border-blue-300': isLinkActive(link.to)
            }"
          >
            <i
              class="w-6 h-6 flex items-center justify-center text-white rounded"
              :class="link.icon"
              :style="{ backgroundColor: getMenuColor(menu.title) }"
            ></i>
            {{ link.text }}
          </router-link>

          <!-- GROUPS -->
          <template v-if="menu.groups">
            <div v-for="group in menu.groups" :key="group.key" class="border-l-2 border-blue-300/30 ml-2">

              <!-- GROUP HEADER -->
              <button
                class="flex justify-between w-full p-2.5 m-1 text-sm text-blue-600 border rounded-lg hover:bg-blue-600 hover:text-white"
                @click="toggleNested(group.key)"
              >
                <div class="flex items-center gap-2">
                  <i
                    v-if="group.icon"
                    class="w-5 h-5 flex items-center justify-center text-white rounded"
                    :class="group.icon"
                    :style="{ backgroundColor: getMenuColor(menu.title) }"
                  ></i>
                  {{ group.title }}
                </div>
                <i
                  class="ri-arrow-right-s-line transition-transform"
                  :class="{ 'rotate-90': dropdown === group.key }"
                ></i>
              </button>

              <!-- GROUP BODY -->
              <div v-show="dropdown === group.key" class="ml-3">

                <!-- SUB LINKS -->
                <router-link
                  v-for="link in group.links || []"
                  :key="link.to"
                  :to="link.to"
                  class="flex gap-3 m-1 px-4 py-2.5 text-sm text-blue-700 border rounded-lg hover:bg-blue-500 hover:text-white"
                  :class="{
                    'bg-gradient-to-r from-blue-700/50 to-sky-700/50 border-l-4 border-blue-300': isLinkActive(link.to)
                  }"
                >
                  <i
                    v-if="link.icon"
                    class="w-6 h-6 flex items-center justify-center text-white rounded"
                    :class="link.icon"
                    :style="{ backgroundColor: getMenuColor(menu.title) }"
                  ></i>
                  {{ link.text }}
                </router-link>

                <!-- SUB GROUPS -->
                <template v-if="group.sub_groups">
                  <div v-for="sub in group.sub_groups" :key="sub.key" class="border-l-2 ml-3">

                    <!-- SUB GROUP HEADER -->
                    <button
                      class="flex justify-between w-full p-2 m-1 text-sm border rounded-lg hover:bg-blue-500 hover:text-white"
                      @click="toggleSubNested(sub.key)"
                    >
                      <div class="flex items-center gap-2">
                        <i
                          v-if="sub.icon"
                          class="w-5 h-5 flex items-center justify-center text-white rounded"
                          :class="sub.icon"
                          :style="{ backgroundColor: getMenuColor(menu.title) }"
                        ></i>
                        {{ sub.title }}
                      </div>
                      <i
                        class="ri-arrow-right-s-line transition-transform"
                        :class="{ 'rotate-90': subDropdown === sub.key }"
                      ></i>
                    </button>

                    <!-- SUB GROUP BODY -->
                    <div v-show="subDropdown === sub.key" class="ml-3">

                      <!-- SUB LINKS -->
                      <router-link
                        v-for="link in sub.links || []"
                        :key="link.to"
                        :to="link.to"
                        class="flex gap-3 m-1 px-4 py-2.5 text-sm text-blue-700 border rounded-lg hover:bg-blue-500 hover:text-white"
                        :class="{
                          'bg-gradient-to-r from-blue-700/50 to-sky-700/50 border-l-4 border-blue-300': isLinkActive(link.to)
                        }"
                      >
                        <i
                          v-if="link.icon"
                          class="w-6 h-6 flex items-center justify-center text-white rounded"
                          :class="link.icon"
                          :style="{ backgroundColor: getMenuColor(menu.title) }"
                        ></i>
                        {{ link.text }}
                      </router-link>

                      <!-- SUB-SUB GROUPS (3rd level) -->
                      <template v-if="sub.sub_sub_groups">
                        <div v-for="subsub in sub.sub_sub_groups" :key="subsub.key" class="border-l-2 ml-3">

                          <!-- SUB-SUB HEADER -->
                          <button
                            class="flex justify-between w-full p-2 m-1 text-sm border rounded-lg hover:bg-blue-500 hover:text-white"
                            @click="toggleSubSubNested(subsub.key)"
                          >
                            <div class="flex items-center gap-2">
                              <i
                                v-if="subsub.icon"
                                class="w-5 h-5 flex items-center justify-center text-white rounded"
                                :class="subsub.icon"
                                :style="{ backgroundColor: getMenuColor(menu.title) }"
                              ></i>
                              {{ subsub.title }}
                            </div>
                            <i
                              class="ri-arrow-right-s-line transition-transform"
                              :class="{ 'rotate-90': subsubDropdown === subsub.key }"
                            ></i>
                          </button>

                          <!-- SUB-SUB BODY -->
                          <div v-show="subsubDropdown === subsub.key" class="ml-3">
                            <router-link
                              v-for="link in subsub.links || []"
                              :key="link.to"
                              :to="link.to"
                              class="flex gap-3 m-1 px-4 py-2.5 text-sm text-blue-700 border rounded-lg hover:bg-blue-500 hover:text-white"
                              :class="{
                                'bg-gradient-to-r from-blue-700/50 to-sky-700/50 border-l-4 border-blue-300': isLinkActive(link.to)
                              }"
                            >
                              <i
                                v-if="link.icon"
                                class="w-6 h-6 flex items-center justify-center text-white rounded"
                                :class="link.icon"
                                :style="{ backgroundColor: getMenuColor(menu.title) }"
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
          </template>

        </div>

        </div>

        <!-- LOGOUT -->
         <button
        type="button"
                class="py-3 px-6 mt-6 w-full bg-gradient-to-r from-red-600 to-pink-600 rounded-xl text-white font-semibold transition-all duration-300 hover:from-red-700 hover:to-pink-700 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2"
      @click="store.logout(),router.push('/login/adminLogin')" >
        <i class="ri-logout-box-r-line" ></i>
        Log Out
      </button>

      </nav>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'
import api from '@/config/api'

const teams = ref([]);
const isLoading = ref(false);
const softSolutions = ref({
  software: [],
  solutions: []
});
const menuColors = {
  'HTSS Training Courses': '#BA55D3',
  'Events': '#00BA9A',
  'Events Schedule / Training Offer': '#00BA9A',
  'Training Courses': '#FFA500',
  'Schedule': '#FF4500',
  'Customer Support': '#BA55D3',
  'Solution': '#00CED1',
  'Software': '#a000ff',
  'Users': '#0ea5e9'
}
const getMenuColor = (menuTitle) => {
  // Try exact match first
  if (menuColors[menuTitle]) return menuColors[menuTitle];

  // Fallback: check if any key is a prefix of the title
  const matchedKey = Object.keys(menuColors).find(key => menuTitle.startsWith(key));
  if (matchedKey) return menuColors[matchedKey];

  return '#6B7280'; // default gray
}

const authStore = useAuthStore()
const props = defineProps({
  activeTab: {
    type: String,
    default: 'All'
  }
})
const emit = defineEmits(['changeTab'])

const store = useAuthStore()
const router = useRouter()
const dropdown = ref('')
const subDropdown = ref('')
const subsubDropdown = ref('')
const currentAccordions = ref('')
const openSection = currentAccordions

const isLinkActive = (to) => {
  if (!to) return false

  // If route is an object (name / params / query)
  if (typeof to === 'object') {
    return router.resolve(to).path === router.currentRoute.value.path
  }

  // If route is a string
  return router.currentRoute.value.path === to
}


function toggleAccordion(name, hasdb) {
  if (hasdb)
    emit('changeTab', name)
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

onMounted(async () => {
  await getSuccessTeam();

  // Fetch software/solutions only if we have team data
  if (teams.value?.length > 0 && teams.value[0]?.company?.customers?.length > 0) {
    const customerIds = teams.value[0].company.customers.map(e => e.id);
    await getSoftSolutions(customerIds);
  }
});


// Static menus definition - REMOVED the nested "All Customer Success Manager" group
const staticMenus =
 [
  {
    id: 'Customer Support',
    title: 'Customer Support',
    icon: 'ri-customer-service-2-line',
    hasdb:false,
    iconColor: 'teal',
    groups: [
      {
        key: 'Tickets',
        title: 'Tickets',
        icon: 'ri-price-tag-3-line',
         links: [
           { to: '/customer/Customer-Support/ticketIssue',icon: 'ri-add-circle-line', text: 'Create Issue Ticket' },
          { to: '/customer/Customer-Support/UnsolvedticketIssue',icon: 'ri-list-check', text: 'Unresolved Issued Tickets' },
          { to: '/customer/Customer-Support/SolvedticketIssue',icon: 'ri-list-check', text: 'Solved Issued Tickets' },
        ]
      },
      {
        key: 'live',
        title: 'Live Support',
        icon: 'ri-live-line',
            sub_groups: [
                    {
                      key: 'Live Call',
                      title: 'Live Call',
                      icon: 'ri-live-line',
                      links: [
                        { to: '/customer/Customer-Support/Live-Support/Live-Call/NewCallSchedule',icon: 'ri-add-circle-line', text: 'Create New Call Schedule' },
                        // { to: '/customer/Customer-Support/UnsolvedticketIssue',icon: 'ri-list-check', text: 'Approved Call Schedule' },
                        // { to: '/customer/Customer-Support/SolvedticketIssue',icon: 'ri-list-check', text: 'Completed Call Schedule' },
                      ],
                      sub_sub_groups: [
                    {
                      key: 'Approved Call Schedule',
                      title: 'Approved Call Schedule',
                      icon: 'ri-live-line',
                      links: [
                        { to: '/customer/Customer-Support/Live-Support/Live-Call/ApprovedCallSchedules/ApprovedList',icon: 'ri-list-check', text: 'Approved Call Schedule List' },
                        { to: '/customer/Customer-Support/Live-Support/Live-Call/ApprovedCallSchedules/Today',icon: 'ri-list-check', text: 'Todays' },
                        { to: '/customer/Customer-Support/Live-Support/Live-Call/ApprovedCallSchedules/Previous',icon: 'ri-list-check', text: 'Previous' },
                        { to: '/customer/Customer-Support/Live-Support/Live-Call/ApprovedCallSchedules/Completed',icon: 'ri-list-check', text: 'Completed' },
                      ]
                    },
                    {
                      key: 'Completed Call Schedule',
                      title: 'Completed Call Schedule',
                      icon: 'ri-live-line',
                      links: [
                        { to: '/customer/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/CompletedCallList',icon: 'ri-list-check', text: 'Completed Call Schedule List' },
                        { to: '/customer/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/Today',icon: 'ri-list-check', text: 'Todays' },
                        { to: '/customer/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/CurrentWeek',icon: 'ri-list-check', text: 'Current Week' },
                        { to: '/customer/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/Completed',icon: 'ri-list-check', text: 'Completed' },
                      ]
                    },

                  ]
                    },
                    {
                      key: 'Live Chat',
                      title: 'Live Chat',
                      icon: 'ri-live-line',
                      links: [
                        { to: '/customer/Customer-Support/Live-Support/Live-Chat/NewChatSchedule',icon: 'ri-add-circle-line', text: 'Create New Chat Schedule' },
                        // { to: '/customer/Customer-Support/UnsolvedticketIssue',icon: 'ri-list-check', text: 'Approved Call Schedule' },
                        // { to: '/customer/Customer-Support/SolvedticketIssue',icon: 'ri-list-check', text: 'Completed Call Schedule' },
                      ],
                      sub_sub_groups: [
                    {
                      key: 'Approved Chat Schedule',
                      title: 'Approved Chat Schedule',
                      icon: 'ri-live-line',
                      links: [
                        { to: '/customer/Customer-Support/Live-Support/Live-Chat/ApprovedChatSchedules/ApprovedList',icon: 'ri-list-check', text: 'Approved Chat Schedule List' },
                        { to: '/customer/Customer-Support/Live-Support/Live-Chat/ApprovedChatSchedules/Today',icon: 'ri-list-check', text: 'Todays' },
                        { to: '/customer/Customer-Support/Live-Support/Live-Chat/ApprovedChatSchedules/Previous',icon: 'ri-list-check', text: 'Previous' },
                        { to: '/customer/Customer-Support/Live-Support/Live-Chat/ApprovedChatSchedules/Completed',icon: 'ri-list-check', text: 'Completed' },
                      ]
                    },
                    {
                      key: 'Completed Chat Schedule',
                      title: 'Completed Chat Schedule',
                      icon: 'ri-live-line',
                      links: [
                        { to: '/customer/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/CompletedCallList',icon: 'ri-list-check', text: 'Completed Chat Schedule List' },
                        { to: '/customer/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/Today',icon: 'ri-list-check', text: 'Todays' },
                        { to: '/customer/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/CurrentWeek',icon: 'ri-list-check', text: 'Current Week' },
                        { to: '/customer/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/Completed',icon: 'ri-list-check', text: 'Completed' },
                      ]
                    },

                  ]
                    },
                    // {
                    //   key: 'live',
                    //   title: 'Live Chat',
                    //   icon: 'ri-live-line',
                    //   links: [
                    //       { to: '/customer/Customer-Support/LiveChat',icon: 'ri-add-circle-line', text: 'Live Chat' },
                    //     { to: '/customer/Customer-Support/LiveCall',icon: 'ri-add-circle-line', text: 'Live Call' },
                    //   ]
                    // },
                  ]

        //  links: [
        //     { to: '/customer/Customer-Support/LiveChat',icon: 'ri-add-circle-line', text: 'Live Chat' },
        //   { to: '/customer/Customer-Support/LiveCall',icon: 'ri-add-circle-line', text: 'Live Call' },
        // ]
      },
      {
        key: 'onsite',
        title: 'Onsite Support ',
        icon: 'ri-live-line',
         links: [
          { to: '/customer/Customer-Support/onsite/CreateSupportRequest',icon: 'ri-add-circle-line', text: 'Create Support Request' },
          { to: '/customer/Customer-Support/onsite/PendingSupportRequests',icon:'ri-list-check', text: 'Pending Support Requests' },
          { to: '/customer/Customer-Support/onsite/AcceptedSupportRequests',icon:'ri-list-check', text: 'Accepted Support Requests' },
          // { to: '/customer/Customer-Support/onsite/CompletedSupportRequests',icon:'ri-list-check', text: 'Completed Support Requests' },
        ],

         sub_groups: [
                    {
                      key: 'Completed Support Requests',
                      title: 'Completed Support Requests',
                      icon: 'ri-live-line',
                      links: [
                        { to: '/customer/Customer-Support/onsite/CompletedSupportRequest/AllList',icon: 'ri-list-check', text: 'All List' },
                            { to: '/customer/Customer-Support/onsite/CompletedSupportRequest/Today',icon: 'ri-list-check', text: 'Todays' },
                        { to: '/customer/Customer-Support/onsite/CompletedSupportRequest/CurrentWeek',icon: 'ri-list-check', text: 'Current Week' },
                        { to: '/customer/Customer-Support/onsite/CompletedSupportRequest/CurrentMonth',icon: 'ri-list-check', text: 'Current Month' },
                        { to: '/customer/Customer-Support/onsite/CompletedSupportRequest/CurrentQuarter',icon: 'ri-list-check', text: 'Current Quarter' },
                        // { to: '/customer/Customer-Support/UnsolvedticketIssue',icon: 'ri-list-check', text: 'Approved Call Schedule' },
                        // { to: '/customer/Customer-Support/SolvedticketIssue',icon: 'ri-list-check', text: 'Completed Call Schedule' },
                      ],}]
        //
      }
      ,]

  },
  {
    id: 'Users',
    title: 'Users',
    icon: 'ri-group-line',
    hasdb:false,
    iconColor: 'purple',
     links: [
          { to: '/customer/Users/createUsers',icon: 'ri-add-circle-line', text: 'Add User' },




        ],

        groups: [
      {
        key: 'All Schedules3',
        title: 'Users List',
        icon: 'ri-price-tag-3-line',
         links: [
          { to: '/customer/Users/listUsers',icon: 'ri-list-check', text: 'List Of All Users' },

          { to: '/customer/Users/listUsersSoftware',icon: 'ri-list-check', text: 'List Of Users By Software' },
          { to: '/customer/Users/listUsersSolution',icon: 'ri-list-check', text: 'List Of Users By Solutions' },
        ]
      },]

  },
  {
    id: 'Product',
    title: 'Training Courses',
    icon: 'ri-book-open-line',
    hasdb:false,
    iconColor: 'yellow',

        groups: [
      {
        key: 'All Schedules3',
        title: 'Our Company Training',
        icon: 'ri-price-tag-3-line',
         links: [
          { to: '/customer/Training/HTSSTraining/create',icon: 'ri-add-circle-line', text: 'Create Training Course' },
          { to: '/customer/Training/Events/create',icon:'ri-list-check', text: 'Create Event' },
          { to: '/customer/Training/Offer/create',icon:'ri-list-check', text: 'Create Offer' },
          // { to: '/customer/Training/Offer/list',icon:'ri-list-check', text: 'Our Company Offer List' },
        ]
      },
      {
        key: 'HTSS Training',
        title: 'HTSS Training',
        icon: 'ri-price-tag-3-line',
         links: [
          { to: '/customer/Training/HTSSTraining/approve',icon: 'ri-add-circle-line', text: 'View Trainings' },
          { to: '/customer/Training/Events/online',icon:'ri-list-check', text: 'View Events' },
          { to: '/customer/Training/Offer/htss',icon:'ri-list-check', text: 'View Offers' },
        ]
      },
      {
        key: 'Training Enrollment',
        title: 'Training Enrollment',
        icon: 'ri-price-tag-3-line',
         links: [
          { to: '/customer/Training/TrainingEnrollment/ByOurUsers',icon: 'ri-add-circle-line', text: 'Enrollment by Our Users' },
          { to: '/customer/Training/TrainingEnrollment/ByHTSSUsers',icon:'ri-list-check', text: 'Enrollment by HTSS Users' },
          { to: '/customer/Training/TrainingEnrollment/ByIndependentUsers',icon:'ri-list-check', text: 'Enrollment by Independent Users' },
        ]
      },
      {
        key: 'All Schedules',
        title: 'Training Schedules',
        icon: 'ri-price-tag-3-line',
          links: [
          { to: '/customer/Training/TrainingSchedule/allTrainingsList',icon: 'ri-add-circle-line', text: 'All Trainings List' },
          { to: '/customer/Training/TrainingSchedule/currentMonth',icon:'ri-list-check', text: 'Current Month Trainings' },
          { to: '/customer/Training/TrainingSchedule/currentQuarter',icon:'ri-list-check', text: 'Current Quarter Trainings' },
          { to: '/customer/Training/TrainingSchedule/currentYear',icon:'ri-list-check', text: 'Current Year Trainings' },
          { to: '/customer/Training/TrainingSchedule/bySoftware',icon:'ri-list-check', text: 'Training By Software' },
          { to: '/customer/Training/TrainingSchedule/bySolution',icon:'ri-list-check', text: 'Training By Solution' },
        ]
      },
    ]

  },
  // {
  //   id: 'SolutiEventson',
  //   title: 'Offer',
  //   icon: 'ri-auction-line',
  //   hasdb:false,
  //   iconColor: 'blue',
  //    links: [
  //         { to: '/supply/create-purchase-category',icon: 'ri-add-circle-line', text: 'MSC' },
  //         { to: '/supply/pending-purchase-category',icon:'ri-list-check', text: 'HTSS' },
  //       ]

  // },
  // {
  //   id: 'Industry',
  //   title: 'Event',
  //   icon: 'ri-auction-line',
  //   hasdb:false,
  //   iconColor: 'purple',
  //    links: [
  //         { to: '/supply/create-purchase-category',icon: 'ri-add-circle-line', text: 'Training' },
  //         { to: '/supply/approve-purchase-category',icon:'ri-list-check', text: 'Seminar' },
  //         { to: '/supply/Broadcast-purchase-category',icon:'ri-list-check', text: 'Conference' },
  //       ]

  // },
  {
    id: 'Software',
    title: 'Software',
    icon: 'ri-apps-line',
    hasdb:false,
    iconColor: 'green',
     links: [
          { to: '/customer/software/AddSoftware',icon: 'ri-add-circle-line', text: 'Add Software' },
          { to: '/customer/software/ListSoftware',icon: 'ri-list-check', text: 'List Of Software' },


        ]

  },
  {
    id: 'Solution',
    title: 'Solution',
    icon: 'ri-lightbulb-line',
    hasdb:false,
    iconColor: 'red',
     links: [
          { to: '/customer/solution/AddSoftware',icon: 'ri-add-circle-line', text: 'Add Solution' },
          { to: '/customer/solution/ListSoftware',icon: 'ri-list-check', text: 'List Of Solutions' },


        ]

  },
  
  ];


const getSuccessTeam = async () => {
  try {
    isLoading.value = true;
    const response = await api().get('my-success-team');
    if (response.data?.success) {
      teams.value = response.data.data?.data || [];
    }
    const team = teams?.value?.[0]
    if (team) {
      selectTeam(team)
    }



  } catch (error) {
    console.error("Error fetching success team:", error);
    teams.value = [];
  } finally {
    isLoading.value = false;
  }
}

const getSoftSolutions = async (customerIds) => {
  try {
    const [softwareRes, solutionRes] = await Promise.all([
      api().get('customer-software?customer_ids=' + customerIds),
      api().get('customer-solution?customer_ids=' + customerIds)
    ]);

    softSolutions.value.software = softwareRes.data.map((e) => ({
      to: {
        name: 'customer_management-team-tasks-software-id',
        query: { name: e?.software?.name },
        params: { id: e.software_id }
      },
      icon: 'ri-list-check',
      text: e.software?.name || 'Unknown Software'
    }));

    softSolutions.value.solutions = solutionRes.data.map((e) => ({
      to: {
        name: 'customer_management-team-tasks-solution-id',
        query: { name: e?.solution_name },
        params: { id: e.solution_id }
      },
      icon: 'ri-list-check',
      text: e.solution_name || 'Unknown Solution'
    }));

  } catch (error) {
    console.error('Error fetching software and solutions:', error);
  }
};

const dynamicMenus = computed(() => {
  const menusCopy = JSON.parse(JSON.stringify(staticMenus));

  // Only update if we have team data
  if (teams.value?.length > 0 && teams.value[0]?.company?.customers?.length > 0) {
    const team = teams.value[0];

    if (authStore.role === "customer-manager") {
      // Update My Customers section
      const myCustomersMenu = menusCopy.find(menu => menu.id === 'MyTask');

      if (myCustomersMenu) {


        // Add software and solution groups if data exists
        if (softSolutions.value.software.length > 0 || softSolutions.value.solutions.length > 0) {
          const groups = [];

          if (softSolutions.value.software.length > 0) {
            groups.push({
              key: 'TaskBySoftware',
              title: 'Task List By Software',
              icon: 'ri-apps-line',
              links: softSolutions.value.software
            });
          }

          if (softSolutions.value.solutions.length > 0) {
            groups.push({
              key: 'TaskBySolution',
              title: 'Task List By Solution',
              icon: 'ri-lightbulb-line',
              links: softSolutions.value.solutions
            });
          }

          if (groups.length > 0) {
            myCustomersMenu.groups = groups;
          }
        }
      }
    }
  } else {
    // Handle case where no customers are assigned
    if (authStore.role === "customer-manager") {
      const myCustomersMenu = menusCopy.find(menu => menu.id === 'MyTask');
      if (myCustomersMenu) {
        myCustomersMenu.links = [
          {
            to: `/customer_success_manager`,
            text: 'No customers assigned',
            icon: 'ri-error-warning-line'
          }
        ];
      }
    }
  }

  return menusCopy;
});

// In your template, update the loop to use dynamicMenus instead of staticMenus
// Create a reactive reference for menus
const menus = ref([...staticMenus]);

// Function to update the MyTask menu
const updateMyTaskMenu = (softList, solutionList) => {
  // Find the MyTask menu
  const myTaskIndex = menus.value.findIndex(menu => menu.id === 'MyTask');

  if (myTaskIndex !== -1) {
    // Create updated menu with groups for software and solutions
    const updatedMyTaskMenu = {
      ...menus.value[myTaskIndex],
      groups: [
        {
          key: 'TaskBySoftware',
          title: 'Task List By Software',
          icon: 'ri-apps-line',
          links: softList
        },
        {
          key: 'TaskBySolution',
          title: 'Task List By Solution',
          icon: 'ri-lightbulb-line',
          links: solutionList
        }
      ]
    };

    // Replace the old MyTask menu with the updated one
    menus.value[myTaskIndex] = updatedMyTaskMenu;
  }
};

const selectTeam = (team) => {
  authStore.setTeamId(team.id)
  authStore.setCompanyId(team.company?.id)
  authStore.setCompanyName(team.company?.name)
}




</script>

<style scoped>
.router-link-active {
  background-color: #e0f2fe;
  color: #0369a1;
  border-radius: 0.5rem;
}

/* scrollbar */
nav::-webkit-scrollbar {
  width: 4px;
}

nav::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

nav::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* micro hover */
button:hover,
a:hover {
  transform: translateY(-1px);
}
</style>
