<template>
  <div class="bg-slate-300 w-80 p-2 min-h-screen border-r border-gray-200">
    <div class="p-2 h-full flex flex-col">

      <!-- Header -->
      <div class="bg-white/90 rounded-xl p-4 mb-4 shadow-sm">
        <h4 class="font-bold text-center text-sm text-sky-700 mb-3 pb-2 border-b">
          User Management Dashboard
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
        to="/user_management"
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
  'User Creation': '#BA55D3',
  'List Users': '#00BA9A',
  'List Customers at': '#00BA9A',
  'List of Skills': '#FFA500',
  'List of Schedule': '#FF4500',
  'Cleaning Management': '#BA55D3',
  'My Task': '#00CED1',
  'Customer Success Team': '#a000ff',
  'My Contact': '#0ea5e9'
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
    id: 'UserCreation',
    title: 'User Creation',
    icon: 'ri-shield-user-fill',
    hasdb:false,
    iconColor: 'orange',
     links: [
          { to: '/user_management/user_creation/createUser',icon: 'ri-user-add-line', text: 'Create User' },
          { to: '/user_management/user_creation/approveUser',icon:'ri-leaf-fill', text: 'Approve User ' },

        ]

  },
  {
    id: 'UserList',
    title: 'List Users',
    icon: 'ri-user-line',
    hasdb:false,
    iconColor: 'green',
     links: [
          { to: '/user_management/user/allUsers',icon: 'ri-add-circle-line', text: 'All Users' },
          { to: '/user_management/user/active',icon: 'ri-add-circle-line', text: 'Active User' },
       { to: '/user_management/user/inactive', icon: 'ri-list-check', text: 'Inactive User ' },
       { to: '/user_management/user/byIndustry', icon: 'ri-list-check', text: 'By Industry ' },
       { to: '/user_management/user/bySoftware', icon: 'ri-list-check', text: 'By Software ' },
       { to: '/user_management/user/bySolution', icon: 'ri-list-check', text: 'By Solution ' },
       { to: '/user_management/user/byCustomer',icon:'ri-list-check', text: 'By Customer ' },

        ]

  },
  // {
  //   id: 'Enrollement',
  //   title: 'Enrollement',
  //   icon: 'ri-auction-line',
  //   hasdb:false,
  //   iconColor: 'blue',
  //    links: [
  //      { to: '/user_management/Enrollment/Offered',icon: 'ri-add-circle-line', text: 'Offered Trainings' },
  //      { to: '/user_management/Enrollment/enrolled', icon: 'ri-list-check', text: 'Enrolled Trainings' },
  //     ]

  // },
  {
    id: 'Course Name',
    title: 'List of Schedule',
    icon: 'ri-calendar-event-line',
    hasdb:false,
    iconColor: 'red',
    groups:[

      {
        key: 'Content',
        title: 'Seminar',
        icon: 'ri-presentation-line',
        sub_groups: [
      {
        key: 'Content Creation',
        title: 'List',
        icon: 'ri-list-check',
        links: [
          { to: '/user_management/schedule/seminar/list/ongoing',icon: 'ri-list-check', text: 'Ongoing' },
          { to: '/user_management/schedule/seminar/list/previous',icon:'ri-list-check', text: 'Previous' },
          { to: '/user_management/schedule/seminar/list/upcoming',icon:'ri-list-check', text: 'Upcoming' }
        ]
      },
      {
        key: 'Content List',
        title: 'User Request',
        icon: 'ri-hand-coin-line',
        links: [
          { to: '/user_management/schedule/seminar/userRequest/pending',icon: 'ri-hand-coin-line', text: 'Pending' },
          { to: '/user_management/schedule/seminar/userRequest/approve',icon: 'ri-hand-coin-line', text: 'Approve' },
          { to: '/user_management/schedule/seminar/userRequest/reject',icon: 'ri-hand-coin-line', text: 'Reject' },
        ]
      },

    ]
    },
          {
        key: 'Conference',
        title: 'Conference',
        icon: 'ri-group-line',
        sub_groups: [
      {
        key: 'Content Creation',
        title: 'List',
        icon: 'ri-list-check',
         links: [
          { to: '/user_management/schedule/conference/list/ongoing',icon: 'ri-list-check', text: 'Ongoing' },
          { to: '/user_management/schedule/conference/list/previous',icon:'ri-list-check', text: 'Previous' },
          { to: '/user_management/schedule/conference/list/upcoming',icon:'ri-list-check', text: 'Upcoming' }
        ]
      },
      {
        key: 'Content List',
        title: 'User Request',
        icon: 'ri-hand-coin-line',
         links: [
          { to: '/user_management/schedule/conference/userRequest/pending',icon: 'ri-hand-coin-line', text: 'Pending' },
          { to: '/user_management/schedule/conference/userRequest/approve',icon: 'ri-hand-coin-line', text: 'Approve' },
          { to: '/user_management/schedule/conference/userRequest/reject',icon: 'ri-hand-coin-line', text: 'Reject' },
        ]
      },

    ]
    },
          {
        key: 'Training',
        title: 'Training',
        icon: 'ri-graduation-cap-line',
        sub_groups: [
      {
        key: 'Content Creation',
        title: 'List',
        icon: 'ri-list-check',
        links: [
          { to: '/user_management/schedule/training/list/ongoing',icon: 'ri-list-check', text: 'Ongoing' },
          { to: '/user_management/schedule/training/list/previous',icon:'ri-list-check', text: 'Previous' },
          { to: '/user_management/schedule/training/list/upcoming',icon:'ri-list-check', text: 'Upcoming' }
        ]
      },
      {
        key: 'Content List',
        title: 'User Request',
        icon: 'ri-hand-coin-line',
         links: [
          { to: '/user_management/schedule/training/userRequest/pending',icon: 'ri-hand-coin-line', text: 'Pending' },
          { to: '/user_management/schedule/training/userRequest/approve',icon: 'ri-hand-coin-line', text: 'Approve' },
          { to: '/user_management/schedule/training/userRequest/reject',icon: 'ri-hand-coin-line', text: 'Reject' },
        ]
      },

    ]
    },

  ]

  },
  {
    id: 'Product',
    title: 'List of Skills',
    icon: 'ri-award-line',
    hasdb:false,
    iconColor: 'yellow',
     links: [
          { to: '/user_management/skillsList/skillList',icon: 'ri-list-check', text: 'Skill List' },
          { to: '/user_management/skillsList/userSkillList',icon:'ri-list-check', text: 'User Skill List' },
        ]

  },
  // {
  //   id: 'Solution',
  //   title: 'Solution',
  //   icon: 'ri-auction-line',
  //   hasdb:false,
  //   iconColor: 'blue',
  //    links: [
  //         { to: '/supply/create-purchase-category',icon: 'ri-add-circle-line', text: 'Create Solution' },
  //         { to: '/supply/approve-purchase-category',icon:'ri-list-check', text: 'Pending Solution' },
  //         { to: '/supply/Broadcast-purchase-category',icon:'ri-list-check', text: 'Broadcast Solution' },
  //       ]

  // },
  // {
  //   id: 'Industry',
  //   title: 'Industry',
  //   icon: 'ri-auction-line',
  //   hasdb:false,
  //   iconColor: 'purple',
  //    links: [
  //         { to: '/supply/create-purchase-category',icon: 'ri-add-circle-line', text: 'Create Industry' },
  //         { to: '/supply/approve-purchase-category',icon:'ri-list-check', text: 'Pending Industry' },
  //         { to: '/supply/Broadcast-purchase-category',icon:'ri-list-check', text: 'Broadcast Industry' },
  //       ]

  // },
  // {
  //   id: 'Events',
  //   title: 'Events',
  //   icon: 'ri-auction-line',
  //   hasdb:false,
  //   iconColor: 'teal',
  //    links: [
  //         { to: '/supply/create-purchase-category',icon: 'ri-add-circle-line', text: 'Training' },
  //         { to: '/supply/approve-purchase-category',icon:'ri-list-check', text: 'Onsite' },
  //         { to: '/supply/Broadcast-purchase-category',icon:'ri-list-check', text: 'Online' },
  //         { to: '/supply/Broadcast-purchase-category',icon:'ri-list-check', text: 'Seminar' },
  //         { to: '/supply/Broadcast-purchase-category',icon:'ri-list-check', text: 'Conference' },
  //       ]

  // },
  // {
  //   id: 'Schedule',
  //   title: 'Schedule',
  //   icon: 'ri-auction-line',
  //   hasdb:false,
  //   iconColor: 'green',
  //    links: [
  //         { to: '/supply/Broadcast-purchase-category',icon:'ri-list-check', text: 'Seminar' },
  //         { to: '/supply/create-purchase-category',icon: 'ri-add-circle-line', text: 'Training' },
  //         { to: '/supply/Broadcast-purchase-category',icon:'ri-list-check', text: 'Conference' },
  //       ]

  // },

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
