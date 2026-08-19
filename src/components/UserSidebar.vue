<template>
  <div class="bg-slate-300 py-4 px-2 min-h-screen border-r border-gray-200 w-72 min-w-72 flex-shrink-0">
    <div class="p-2 h-full flex flex-col">

      <!-- Header -->
      <div class="bg-white/90 rounded-xl p-4 mb-4 shadow-sm">
        <h4 class="font-bold text-center text-sm text-sky-700 mb-3 pb-2 border-b">
          User Dashboard
        </h4>
        <div class="flex justify-center">
          <div
            class="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-sky-600 to-blue-600 text-white text-sm rounded-full">
            <i class="ri-user-line"></i>
            {{ store?.user?.name }}
          </div>
        </div>
      </div>

      <!-- Dashboard -->
      <router-link to="/user"
        class="flex justify-center mb-4 bg-white text-purple-600 font-medium py-2.5 rounded-xl shadow-sm hover:shadow-md">
        <i class="ri-dashboard-line mr-2"></i> Dashboard
      </router-link>

      <!-- Menu -->
<nav class="flex flex-col gap-1">
  <div v-for="menu in dynamicMenus" :key="menu.id" class="bg-white rounded-xl overflow-hidden">

    <router-link v-if="menu.to" :to="menu.to"
      class="flex items-center px-3.5 py-2 text-blue-600 hover:bg-blue-500 hover:text-white transition-all"
      :class="{ 'bg-blue-600 text-white': isLinkActive(menu.to) }">
      <div class="flex items-center gap-3">
        <i class="w-8 h-8 flex items-center justify-center rounded-md text-white"
           :class="menu.icon"
           :style="{ backgroundColor: getMenuColor(menu.title) }"></i>
        <span class="text-sm font-medium">{{ menu.title }}</span>
      </div>
    </router-link>

    <template v-else>
      <div class="flex justify-between px-3.5 py-2 text-blue-600 cursor-pointer hover:bg-blue-500 hover:text-white transition-all"
        :class="{ 'bg-blue-50 border-l-4 border-blue-500': currentAccordions === menu.id }"
        @click="toggleAccordion(menu.id, menu.hasdb)">
        <div class="flex items-center gap-3">
          <i class="w-8 h-8 flex items-center justify-center rounded-md text-white"
             :class="menu.icon"
             :style="{ backgroundColor: getMenuColor(menu.title) }"></i>
          <span class="text-sm font-medium">{{ menu.title }}</span>
        </div>
        <i class="ri-arrow-down-s-line transition-transform"
          :class="{ 'rotate-180': currentAccordions === menu.id }"></i>
      </div>

   <div v-if="currentAccordions === menu.id" class="ml-4 bg-white pb-2">

  <router-link v-for="link in menu.links" :key="link.to" :to="link.to"
    class="flex gap-3 m-1 px-4 py-2.5 text-sm text-blue-700 border rounded-lg hover:bg-blue-500 hover:text-white transition-all"
    :class="{ 'bg-blue-100 border-l-4 border-blue-500': isLinkActive(link.to) }">
    <i class="w-6 h-6 flex items-center justify-center text-white rounded" :class="link.icon"
      :style="{ backgroundColor: getMenuColor(menu.title) }"></i>
    {{ link.text }}
  </router-link>

  <template v-if="menu.groups">
    <div v-for="group in menu.groups" :key="group.key" class="border-l-2 border-blue-300/30 ml-2 mb-1">

      <button
        class="flex justify-between w-full p-2.5 m-1 text-sm text-blue-600 border rounded-lg hover:bg-blue-600 hover:text-white transition-all"
        @click.stop="toggleNested(group.key)">
        <div class="flex items-center gap-2">
          <i v-if="group.icon" class="w-5 h-5 flex items-center justify-center text-white rounded"
            :class="group.icon" :style="{ backgroundColor: getMenuColor(menu.title) }"></i>
          {{ group.title }}
        </div>
        <i class="ri-arrow-right-s-line transition-transform"
          :class="{ 'rotate-90': dropdown === group.key }"></i>
      </button>

      <div v-show="dropdown === group.key" class="ml-3">

        <router-link v-for="link in group.links || []" :key="link.to" :to="link.to"
          class="flex gap-3 m-1 px-4 py-2 text-sm text-blue-700 border rounded-lg hover:bg-blue-500 hover:text-white"
          :class="{ 'bg-blue-50 border-blue-300': isLinkActive(link.to) }">
          <i v-if="link.icon" class="w-5 h-5 flex items-center justify-center text-white rounded"
            :class="link.icon" :style="{ backgroundColor: getMenuColor(menu.title) }"></i>
          {{ link.text }}
        </router-link>

      <template v-if="group.sub_groups">
  <div v-for="sub in group.sub_groups" :key="sub.key" class="ml-3">

    <!-- Sub Group Toggle -->
    <button
      class="flex justify-between w-full p-2 m-1 text-sm text-blue-600 border rounded-lg hover:bg-blue-600 hover:text-white transition-all"
      @click.stop="toggleSubNested(sub.key)"
    >
      <div class="flex items-center gap-2">
        <i v-if="sub.icon"
          class="w-5 h-5 flex items-center justify-center text-white rounded"
          :class="sub.icon"
          :style="{ backgroundColor: getMenuColor(menu.title) }"
        ></i>
        {{ sub.title }}
      </div>

      <i class="ri-arrow-right-s-line transition-transform"
        :class="{ 'rotate-90': subDropdown === sub.key }"></i>
    </button>

    <!-- Sub Links -->
    <div v-show="subDropdown === sub.key" class="ml-3">

      <router-link
        v-for="link in sub.links || []"
        :key="link.to"
        :to="link.to"
        class="flex gap-3 m-1 px-4 py-2 text-sm text-blue-700 border rounded-lg hover:bg-blue-500 hover:text-white"
        :class="{ 'bg-blue-50 border-blue-300': isLinkActive(link.to) }"
      >
        <i v-if="link.icon"
          class="w-5 h-5 flex items-center justify-center text-white rounded"
          :class="link.icon"
          :style="{ backgroundColor: getMenuColor(menu.title) }"
        ></i>
        {{ link.text }}
      </router-link>

      <!-- ✅ Sub Sub Groups -->
      <template v-if="sub.sub_sub_groups">
        <div v-for="subsub in sub.sub_sub_groups" :key="subsub.key" class="ml-3">

          <!-- Sub Sub Toggle -->
          <button
            class="flex justify-between w-full p-2 m-1 text-sm text-blue-600 border rounded-lg hover:bg-blue-600 hover:text-white transition-all"
            @click.stop="toggleSubSubNested(subsub.key)"
          >
            <div class="flex items-center gap-2">
              <i v-if="subsub.icon"
                class="w-5 h-5 flex items-center justify-center text-white rounded"
                :class="subsub.icon"
                :style="{ backgroundColor: getMenuColor(menu.title) }"
              ></i>
              {{ subsub.title }}
            </div>

            <i class="ri-arrow-right-s-line transition-transform"
              :class="{ 'rotate-90': subsubDropdown === subsub.key }"></i>
          </button>

          <!-- Sub Sub Links -->
          <div v-show="subsubDropdown === subsub.key" class="ml-3">
            <router-link
              v-for="link in subsub.links || []"
              :key="link.to"
              :to="link.to"
              class="flex gap-3 m-1 px-4 py-2 text-sm text-blue-700 border rounded-lg hover:bg-blue-500 hover:text-white"
              :class="{ 'bg-blue-50 border-blue-300': isLinkActive(link.to) }"
            >
              <i v-if="link.icon"
                class="w-5 h-5 flex items-center justify-center text-white rounded"
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
    </template>

  </div>
</nav>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'
import api from '@/config/api'

const isCustomerIdNull = computed(() => {
  return !authStore.user?.profile?.customer_id;
});

const teams = ref([]);
const isLoading = ref(false);
const softSolutions = ref({
  software: [],
  solutions: []
});
const careerData = ref({
  software: [],
  solutions: []
})
const getCareerData = async () => {
  try {
    const [softwareRes, solutionRes] = await Promise.all([
      api().get('/end-user-software-list'),
      api().get('/end-user-solution-list')
    ])

    // SOFTWARE
    careerData.value.software = softwareRes.data?.data?.map(e => ({
      to: {
        name: 'user-Career-BySoftware-id',
        params: { id: e.id },
        query: { name: e?.name, solution_name: e?.solutions?.[0]?.name }
      },
      icon: 'ri-apps-line',
      text: e.name
    })) || []

    // SOLUTIONS
    careerData.value.solutions = solutionRes.data?.data?.map(e => ({
      to: {
        name: 'user-Career-BySolution-id',
        params: { id: e.id },
        query: { name: e.name }
      },
      icon: 'ri-lightbulb-line',
      text: e.name
    })) || []

  } catch (err) {
    console.error('Career data fetch error:', err)
  }
}
const menuColors = {
  'My Profile': '#0ea5e9',        // blue
  'My Training': '#BA55D3',       // purple
  'My Software': '#22c55e',       // green
  'My Solution': '#f59e0b',       // orange
  'My Schedule': '#ef4444',       // red
  'My Enrollment': '#f43f5e',     // pink
  'Customer Support': '#14b8a6',
  'My Resume': '#6366f1',         // indigo
  'My Career Development': '#8b5cf6', // violet
  'My Education/Library': '#0d9488',  // cyan-teal
  'My Daily Learning': '#eab308',     // yellow
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
  await getCareerData();
  // Fetch software/solutions only if we have team data
  if (teams.value?.length > 0 && teams.value[0]?.company?.customers?.length > 0) {
    const customerIds = teams.value[0].company.customers.map(e => e.id);
    await getSoftSolutions(customerIds);
  }
});


// Static menus definition - REMOVED the nested "All Customer Success Manager" group
const staticMenus =
  [

// Inside staticMenus array

 {
      id: 'My Training',
      title: 'My Training',
      icon: 'ri-graduation-cap-line',
      hasdb: false,
      iconColor: 'purple',
       links: [
            { to: '/user/my_training/enrollment', icon: 'ri-award-line', text: 'Enroll New Training Course' },
            { to: '/user/my_training/approved', icon: 'ri-checkbox-circle-line', text: 'My Pending Payments' },
            { to: '/user/my_training/active', icon: 'ri-calendar-line', text: 'My Active Enrollment' },
          ]
    },

    {
      id: 'My Software',
      title: 'My Software',
      icon: 'ri-computer-line',
      hasdb: false,
      iconColor: 'green',
      links: [
        { to: '/user/my_software/AddSoftware', icon: 'ri-add-circle-line', text: 'Add Software' },
        { to: '/user/my_software/ListSoftware', icon: 'ri-list-unordered', text: 'List Of Software' },
      ]
    },
    {
      id: 'My Solution',
      title: 'My Solution',
      icon: 'ri-lightbulb-line',
      hasdb: false,
      iconColor: 'orange',
      links: [
        { to: '/user/my_solution/AddSolution', icon: 'ri-add-circle-line', text: 'Add Solution' },
        { to: '/user/my_solution/ListSolution', icon: 'ri-list-unordered', text: 'List Of Solutions' },
      ]
    },

    {
      id: 'My Enrollment',
      title: 'My Enrollment',
      icon: 'ri-lightbulb-line',
      hasdb: false,
      iconColor: 'red',
      links: [
        { to: '/user/Enrollment/list', icon: 'ri-add-circle-line', text: 'New Enrollment' },
        { to: '/user/Enrollment/ListEnrollment', icon: 'ri-list-unordered', text: 'Enrolled Courses' },
      ]
    },
    {
      id: 'Customer Support',
      title: 'Customer Support',
      icon: 'ri-auction-line',
      hasdb: false,
      iconColor: 'teal',

      groups: [
        {
          key: 'Tickets',
          title: 'Tickets',
          icon: 'ri-price-tag-3-line',
          links: [
            { to: '/user/Customer-Support/ticketIssue', icon: 'ri-add-circle-line', text: 'Create Issue Ticket' },
            { to: '/user/Customer-Support/UnsolvedticketIssue', icon: 'ri-add-circle-line', text: 'Unresolved Issued Tickets' },
            { to: '/user/Customer-Support/SolvedticketIssue', icon: 'ri-add-circle-line', text: 'Solved Issued Tickets' },
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
              links: [
                { to: '/user/Customer-Support/Live-Support/Live-Call/NewCallSchedule', icon: 'ri-add-circle-line', text: 'Create New Call Schedule' },
                // { to: '/user/Customer-Support/UnsolvedticketIssue',icon: 'ri-add-circle-line', text: 'Approved Call Schedule' },
                // { to: '/user/Customer-Support/SolvedticketIssue',icon: 'ri-add-circle-line', text: 'Completed Call Schedule' },
              ],
              sub_sub_groups: [
                {
                  key: 'Approved Call Schedule',
                  title: 'Approved Call Schedule',
                  icon: 'ri-price-tag-3-line',
                  links: [
                    { to: '/user/Customer-Support/Live-Support/Live-Call/ApprovedCallSchedules/ApprovedList', icon: 'ri-add-circle-line', text: 'Approved Call Schedule List' },
                    { to: '/user/Customer-Support/Live-Support/Live-Call/ApprovedCallSchedules/Today', icon: 'ri-add-circle-line', text: 'Todays' },
                    { to: '/user/Customer-Support/Live-Support/Live-Call/ApprovedCallSchedules/Previous', icon: 'ri-add-circle-line', text: 'Previous' },
                    { to: '/user/Customer-Support/Live-Support/Live-Call/ApprovedCallSchedules/Completed', icon: 'ri-add-circle-line', text: 'Completed' },
                  ]
                },
                {
                  key: 'Completed Call Schedule',
                  title: 'Completed Call Schedule',
                  icon: 'ri-price-tag-3-line',
                  links: [
                    { to: '/user/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/CompletedCallList', icon: 'ri-add-circle-line', text: 'Completed Call Schedule List' },
                    { to: '/user/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/Today', icon: 'ri-add-circle-line', text: 'Todays' },
                    { to: '/user/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/CurrentWeek', icon: 'ri-add-circle-line', text: 'Current Week' },
                    { to: '/user/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/Completed', icon: 'ri-add-circle-line', text: 'Completed' },
                  ]
                },

              ]
            },
            {
              key: 'Live Chat',
              title: 'Live Chat',
              icon: 'ri-price-tag-3-line',
              links: [
                { to: '/user/Customer-Support/Live-Support/Live-Chat/NewChatSchedule', icon: 'ri-add-circle-line', text: 'Create New Chat Schedule' },
                // { to: '/user/Customer-Support/UnsolvedticketIssue',icon: 'ri-add-circle-line', text: 'Approved Call Schedule' },
                // { to: '/user/Customer-Support/SolvedticketIssue',icon: 'ri-add-circle-line', text: 'Completed Call Schedule' },
              ],
              sub_sub_groups: [
                {
                  key: 'Approved Chat Schedule',
                  title: 'Approved Chat Schedule',
                  icon: 'ri-price-tag-3-line',
                  links: [
                    { to: '/user/Customer-Support/Live-Support/Live-Chat/ApprovedChatSchedules/ApprovedList', icon: 'ri-add-circle-line', text: 'Approved Chat Schedule List' },
                    { to: '/user/Customer-Support/Live-Support/Live-Chat/ApprovedChatSchedules/Today', icon: 'ri-add-circle-line', text: 'Todays' },
                    { to: '/user/Customer-Support/Live-Support/Live-Chat/ApprovedChatSchedules/Previous', icon: 'ri-add-circle-line', text: 'Previous' },
                    { to: '/user/Customer-Support/Live-Support/Live-Chat/ApprovedChatSchedules/Completed', icon: 'ri-add-circle-line', text: 'Completed' },
                  ]
                },
                {
                  key: 'Completed Chat Schedule',
                  title: 'Completed Chat Schedule',
                  icon: 'ri-price-tag-3-line',
                  links: [
                    { to: '/user/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/CompletedCallList', icon: 'ri-add-circle-line', text: 'Completed Chat Schedule List' },
                    { to: '/user/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/Today', icon: 'ri-add-circle-line', text: 'Todays' },
                    { to: '/user/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/CurrentWeek', icon: 'ri-add-circle-line', text: 'Current Week' },
                    { to: '/user/Customer-Support/Live-Support/Live-Call/CompletedCallSchedules/Completed', icon: 'ri-add-circle-line', text: 'Completed' },
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
            { to: '/user/Customer-Support/onsite/CreateSupportRequest', icon: 'ri-add-circle-line', text: 'Create Support Request' },
            { to: '/user/Customer-Support/onsite/PendingSupportRequests', icon: 'ri-list-check', text: 'Pending Support Requests' },
            { to: '/user/Customer-Support/onsite/AcceptedSupportRequests', icon: 'ri-list-check', text: 'Accepted Support Requests' },
            // { to: '/user/Customer-Support/onsite/CompletedSupportRequests',icon:'ri-list-check', text: 'Completed Support Requests' },
          ],

          sub_groups: [
            {
              key: 'Completed Support Requests',
              title: 'Completed Support Requests',
              icon: 'ri-price-tag-3-line',
              links: [
                { to: '/user/Customer-Support/onsite/CompletedSupportRequest/AllList', icon: 'ri-add-circle-line', text: 'All List' },
                { to: '/user/Customer-Support/onsite/CompletedSupportRequest/Today', icon: 'ri-add-circle-line', text: 'Todays' },
                { to: '/user/Customer-Support/onsite/CompletedSupportRequest/CurrentWeek', icon: 'ri-add-circle-line', text: 'Current Week' },
                { to: '/user/Customer-Support/onsite/CompletedSupportRequest/CurrentMonth', icon: 'ri-add-circle-line', text: 'Current Month' },
                { to: '/user/Customer-Support/onsite/CompletedSupportRequest/CurrentQuarter', icon: 'ri-add-circle-line', text: 'Current Quarter' },
              ],
            }]
          //
        }
        ,]

    },

  {
    id: 'myCareerDevelopment',
    title: 'My Career Development',
    icon: 'ri-line-chart-line',
    hasdb: false,
    iconColor: '#8b5cf6',

  },
  {
    id: 'myEducationLibrary',
    title: 'My Education Library',
    icon: 'ri-book-open-line',
    hasdb: false,
    iconColor: '#0d9488',
    links: [
      // { to: '', icon: 'ri-video-line', text: 'My Training' },
      // { to: '', icon: 'ri-calendar-line', text: 'My Schedule' },
      // { to: '', icon: 'ri-file-list-line', text: 'My Enrollment' },
    ]
  },
  {
    id: 'myDailyLearning',
    title: 'My Daily Learning',
    icon: 'ri-time-line',
    hasdb: false,
    iconColor: '#eab308',
    links: [
      { to: '', icon: 'ri-video-line', text: 'My Training' },
      { to: '', icon: 'ri-calendar-line', text: 'My Schedule' },
      { to: '', icon: 'ri-file-list-line', text: 'My Enrollment' },
    ]
  }
  ,
  {
  id: 'myResume',
  title: 'My Resume',
  icon: 'ri-file-user-line',
  hasdb: false,
  iconColor: '#6366f1',
  to: '/user/myResume/ResumeDetails',
},
     {
      id: 'My Profile',
      title: 'My Profile',
      icon: 'ri-user-3-line',
      hasdb: false,
      iconColor: 'blue',
      links: [
        { to: '/user/my_profile/ViewProfile', icon: 'ri-eye-line', text: 'View Profile' },
        { to: '/user/my_profile/EditProfile', icon: 'ri-edit-line', text: 'Edit Profile' },
      ],
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

  const careerMenu = menusCopy.find(menu => menu.id === 'myCareerDevelopment')
    if (careerMenu) {
    careerMenu.groups = [
      {
        key: 'careerSoftware',
        title: 'By Software',
        icon: 'ri-apps-line',
        links: careerData.value.software.length
          ? careerData.value.software
          : [{
              to: '',
              text: 'No Software Found',
              icon: 'ri-error-warning-line'
            }]
      },
      {
        key: 'careerSolution',
        title: 'By Solutions',
        icon: 'ri-lightbulb-line',
        links: careerData.value.solutions.length
          ? careerData.value.solutions
          : [{
              to: '',
              text: 'No Solutions Found',
              icon: 'ri-error-warning-line'
            }]
      }
    ]
  }

    if (isCustomerIdNull.value) {
    const myTrainingMenu = menusCopy.find(menu => menu.id === 'My Training');
    return myTrainingMenu ? [myTrainingMenu] : [];
  }


  return menusCopy;
});

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
