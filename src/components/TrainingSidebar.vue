<template>
  <div class="bg-slate-300 py-4 px-2 min-h-screen border-r border-gray-200 w-1/5">
    <div class="p-5 h-full flex flex-col">

      <!-- Header -->
      <div class="bg-white/90 rounded-xl p-4 mb-4 shadow-sm">
        <h4 class="font-bold text-center text-sm text-sky-700 mb-3 pb-2 border-b">
          Training Management Dashboard
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
      <router-link to="/training_management"
        class="flex justify-center mb-4 bg-white text-purple-600 font-medium py-2.5 rounded-xl shadow-sm hover:shadow-md">
        <i class="ri-dashboard-line mr-2"></i> Dashboard
      </router-link>

      <!-- Menu -->
      <nav class="flex flex-col gap-1">

        <div v-for="menu in dynamicMenus" :key="menu.id" class="bg-white rounded-xl overflow-hidden">

          <!-- MENU HEADER -->
          <div class="flex justify-between px-3.5 py-2 text-blue-600 cursor-pointer hover:bg-blue-500 hover:text-white"
            @click="toggleAccordion(menu.id, menu.hasdb)">
            <div class="flex items-center gap-3">
              <i class="w-8 h-8 flex items-center justify-center rounded-md text-white" :class="menu.icon"
                :style="{ backgroundColor: getMenuColor(menu.title) }"></i>
              <span class="text-sm font-medium">{{ menu.title }}</span>
            </div>
            <i class="ri-arrow-down-s-line transition-transform"
              :class="{ 'rotate-180': currentAccordions === menu.id }"></i>
          </div>


          <!-- MENU BODY -->
          <div v-if="currentAccordions === menu.id" class="ml-4 bg-white">

            <!-- DIRECT LINKS -->
            <router-link v-for="link in menu.links" :key="link.to" :to="link.to"
              class="flex gap-3 m-1 px-4 py-2.5 text-sm text-blue-700 border rounded-lg hover:bg-blue-500 hover:text-white"
              :class="{
                'bg-gradient-to-r from-blue-700/50 to-sky-700/50 border-l-4 border-blue-300': isLinkActive(link.to)
              }">
              <i class="w-6 h-6 flex items-center justify-center text-white rounded" :class="link.icon"
                :style="{ backgroundColor: getMenuColor(menu.title) }"></i>
              {{ link.text }}
            </router-link>

            <!-- GROUPS -->
            <template v-if="menu.groups">
              <div v-for="group in menu.groups" :key="group.key" class="border-l-2 border-blue-300/30 ml-2">

                <!-- GROUP HEADER -->
                <button
                  class="flex justify-between w-full p-2.5 m-1 text-sm text-blue-600 border rounded-lg hover:bg-blue-600 hover:text-white"
                  @click="toggleNested(group.key)">
                  <div class="flex items-center gap-2">
                    <i v-if="group.icon" class="w-5 h-5 flex items-center justify-center text-white rounded"
                      :class="group.icon" :style="{ backgroundColor: getMenuColor(menu.title) }"></i>
                    {{ group.title }}
                  </div>
                  <i class="ri-arrow-right-s-line transition-transform"
                    :class="{ 'rotate-90': dropdown === group.key }"></i>
                </button>

                <!-- GROUP BODY -->
                <div v-show="dropdown === group.key" class="ml-3">

                  <!-- SUB LINKS -->
                  <router-link v-for="link in group.links || []" :key="link.to" :to="link.to"
                    class="flex gap-3 m-1 px-4 py-2.5 text-sm text-blue-700 border rounded-lg hover:bg-blue-500 hover:text-white"
                    :class="{
                      'bg-gradient-to-r from-blue-700/50 to-sky-700/50 border-l-4 border-blue-300': isLinkActive(link.to)
                    }">
                    <i v-if="link.icon" class="w-6 h-6 flex items-center justify-center text-white rounded"
                      :class="link.icon" :style="{ backgroundColor: getMenuColor(menu.title) }"></i>
                    {{ link.text }}
                  </router-link>

                  <!-- SUB GROUPS -->
                  <template v-if="group.sub_groups">
                    <div v-for="sub in group.sub_groups" :key="sub.key" class="border-l-2 ml-3">

                      <!-- SUB GROUP HEADER -->
                      <button
                        class="flex justify-between w-full p-2 m-1 text-sm border rounded-lg hover:bg-blue-500 hover:text-white"
                        @click="toggleSubNested(sub.key)">
                        <div class="flex items-center gap-2">
                          <i v-if="sub.icon" class="w-5 h-5 flex items-center justify-center text-white rounded"
                            :class="sub.icon" :style="{ backgroundColor: getMenuColor(menu.title) }"></i>
                          {{ sub.title }}
                        </div>
                        <i class="ri-arrow-right-s-line transition-transform"
                          :class="{ 'rotate-90': subDropdown === sub.key }"></i>
                      </button>

                      <!-- SUB GROUP BODY -->
                      <div v-show="subDropdown === sub.key" class="ml-3">

                        <!-- SUB LINKS -->
                        <router-link v-for="link in sub.links || []" :key="link.to" :to="link.to"
                          class="flex gap-3 m-1 px-4 py-2.5 text-sm text-blue-700 border rounded-lg hover:bg-blue-500 hover:text-white"
                          :class="{
                            'bg-gradient-to-r from-blue-700/50 to-sky-700/50 border-l-4 border-blue-300': isLinkActive(link.to)
                          }">
                          <i v-if="link.icon" class="w-6 h-6 flex items-center justify-center text-white rounded"
                            :class="link.icon" :style="{ backgroundColor: getMenuColor(menu.title) }"></i>
                          {{ link.text }}
                        </router-link>

                        <!-- SUB-SUB GROUPS (3rd level) -->
                        <template v-if="sub.sub_sub_groups">
                          <div v-for="subsub in sub.sub_sub_groups" :key="subsub.key" class="border-l-2 ml-3">

                            <!-- SUB-SUB HEADER -->
                            <button
                              class="flex justify-between w-full p-2 m-1 text-sm border rounded-lg hover:bg-blue-500 hover:text-white"
                              @click="toggleSubSubNested(subsub.key)">
                              <div class="flex items-center gap-2">
                                <i v-if="subsub.icon"
                                  class="w-5 h-5 flex items-center justify-center text-white rounded"
                                  :class="subsub.icon" :style="{ backgroundColor: getMenuColor(menu.title) }"></i>
                                {{ subsub.title }}
                              </div>
                              <i class="ri-arrow-right-s-line transition-transform"
                                :class="{ 'rotate-90': subsubDropdown === subsub.key }"></i>
                            </button>

                            <!-- SUB-SUB BODY -->
                            <div v-show="subsubDropdown === subsub.key" class="ml-3">
                              <router-link v-for="link in subsub.links || []" :key="link.to" :to="link.to"
                                class="flex gap-3 m-1 px-4 py-2.5 text-sm text-blue-700 border rounded-lg hover:bg-blue-500 hover:text-white"
                                :class="{
                                  'bg-gradient-to-r from-blue-700/50 to-sky-700/50 border-l-4 border-blue-300': isLinkActive(link.to)
                                }">
                                <i v-if="link.icon" class="w-6 h-6 flex items-center justify-center text-white rounded"
                                  :class="link.icon" :style="{ backgroundColor: getMenuColor(menu.title) }"></i>
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
        <button type="button"
          class="py-3 px-6 mt-6 w-full bg-gradient-to-r from-red-600 to-pink-600 rounded-xl text-white font-semibold transition-all duration-300 hover:from-red-700 hover:to-pink-700 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2"
          @click="store.logout(), router.push('/login/adminLogin')">
          <i class="ri-logout-box-r-line"></i>
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
  'Group Training Events': '#00BA9A',
  'Training Requests': '#F3EF11C9',
  'User Training': '#FFA500',
  'Schedule': '#FF4500',
  'Customer Training': '#BA55D3',
  'My Task': '#00CED1',
  'MSC Training Courses': '#a000ff',
  'Trainer': '#0ea5e9',
  "Employees": '#14b8a6',
  'Timecards': '#ef4444',

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
const staticMenus = computed(() => {
  const role = authStore.role
  const menus = [
    {
      id: 'Course ID',
      title: 'HTSS Training Courses',
      icon: 'ri-book-line',
      hasdb: false,
      iconColor: 'green',
      links: [
        { to: '/training_management/training/create', icon: 'ri-add-circle-line', text: 'Create' },
        { to: '/training_management/training/approve', icon: 'ri-list-check', text: 'Approve' },
        { to: '/training_management/training/post', icon: 'ri-list-check', text: 'Post' },
        { to: '/training_management/training/published', icon: 'ri-list-check', text: 'Published' },
      ],

    },
    {
      id: 'TrainingEvent',
      title: ' Group Training Events',
      icon: 'ri-calendar-event-line',
      hasdb: false,
      iconColor: 'teal',
      links: [
        { to: '/training_management/training_events/create', icon: 'ri-add-circle-line', text: 'Create' },
        { to: '/training_management/training_events/approve', icon: 'ri-list-check', text: 'Pending' },
        { to: '/training_management/training_events/post', icon: 'ri-list-check', text: 'Approved' },
        { to: '/training_management/training_events/list', icon: 'ri-list-check', text: 'Broadcasted' },
      ]
    },

    {
      id: 'userTraining',
      title: 'Training Enrollments',
      icon: 'ri-user-3-line',
      hasdb: false,
      iconColor: 'yellow',
      groups: [
        {
          key: 'Company Tranings',
          title: 'Company Trainings',
          icon: 'ri-user-line',
          links: [
            { to: '/training_management/UserTraining/create_event/company', icon: 'ri-user-add-line', text: 'Create Event' },
            { to: '/training_management/UserTraining/enrolled_list/upcoming/company', icon: 'ri-list-check', text: 'Upcoming Enrolled List' },
            { to: '/training_management/UserTraining/enrolled_list/completed/company', icon: 'ri-list-check', text: 'Completed Enrolled List' },
          ]
        },
        {
          key: 'Group Trainings',
          title: 'Group Trainings',
          icon: 'ri-group-line',
          links: [
            // { to: '/training_management/UserTraining/create_event/group', icon: 'ri-user-add-line', text: 'Create Event' },
            { to: '/training_management/UserTraining/enrolled_list/upcoming/group', icon: 'ri-list-check', text: 'Upcoming Enrolled List' },
            { to: '/training_management/UserTraining/enrolled_list/completed/group', icon: 'ri-list-check', text: 'Completed Enrolled List' },
          ]
        },
        {
          key: 'Individual Trainings',
          title: 'Individual Trainings',
          icon: 'ri-group-line',
          links: [
            { to: '/training_management/UserTraining/create_event/individual', icon: 'ri-user-add-line', text: 'Create Event' },
            { to: '/training_management/UserTraining/enrolled_list/upcoming/individual', icon: 'ri-list-check', text: 'Upcoming Enrolled List' },
            { to: '/training_management/UserTraining/enrolled_list/completed/individual', icon: 'ri-list-check', text: 'Completed Enrolled List' },
          ]
        }
      ]
    },
    {
      id: 'Trainer',
      title: 'Trainer',
      icon: 'ri-user-star-line',
      hasdb: false,
      iconColor: 'orange',
      links: [
        { to: '/training_management/Trainer/create', icon: 'ri-add-circle-line', text: 'Create' },
        { to: '/training_management/Trainer/approve', icon: 'ri-list-check', text: 'Approve' },
        { to: '/training_management/Trainer/list', icon: 'ri-list-check', text: 'List' },
        // { to: '/training_management/Trainer/trainerRequestForm', icon: 'ri-questionnaire-line', text: 'Trainer Request Form' },
        { to: '/training_management/Trainer/pendingRequest', icon: 'ri-list-check', text: 'Pending Trainer Request' },
        { to: '/training_management/Trainer/approvedRequest', icon: 'ri-list-check', text: 'Approved Trainer Request' },
        // { to: '/training_management/Trainer/requestedTrainer', icon: 'ri-list-check', text: 'Trainer Request List' },
      ]
    },

    {
      id: 'TrainingRequests',
      title: 'Training Requests',
      icon: 'ri-calendar-event-line',
      hasdb: false,
      iconColor: 'teal',
      links: [
        { to: '/training_management/training_request/1', icon: 'ri-add-circle-line', text: 'Pending Training Requests' },
        { to: '/training_management/training_request/2', icon: 'ri-list-check', text: 'Approved Training Requests' },
        { to: '/training_management/training_request/3', icon: 'ri-list-check', text: 'Scheduled Training Requests' },
      ]
    },

    {
      id: 'TrainingSchedule',
      title: 'Training Schedule',
      icon: 'ri-calendar-event-line',
      hasdb: false,
      iconColor: 'teal',
      links: [
        { to: '/training_management/training_schedule/upcoming', icon: 'ri-add-circle-line', text: 'Upcoming Training Schedule' },
        { to: '/training_management/training_schedule/completed', icon: 'ri-list-check', text: 'Completed Training Schedule' },
      ]
    },
    // {
    //   id: 'Events',
    //   title: 'Events',
    //   icon: 'ri-calendar-event-line',
    //   hasdb: false,
    //   iconColor: 'teal',
    //   links: [
    //     { to: '/training_management/Events/create', icon: 'ri-add-circle-line', text: 'Create' },
    //     { to: '/training_management/Events/approve', icon: 'ri-list-check', text: 'Approve' },
    //     { to: '/training_management/Events/post', icon: 'ri-list-check', text: 'Post' },
    //     { to: '/training_management/Events/list', icon: 'ri-list-check', text: 'List' },
    //   ]
    // },
    // {
    //   id: 'Solution',
    //   title: 'Events Schedule / Training Offer',
    //   icon: 'ri-calendar-schedule-line',
    //   hasdb: false,
    //   iconColor: 'blue',
    //   links: [
    //     { to: '/training_management/Offer/create', icon: 'ri-add-circle-line', text: 'Create' },
    //     { to: '/training_management/Offer/approve', icon: 'ri-list-check', text: 'Approve' },
    //     { to: '/training_management/Offer/broadcast', icon: 'ri-list-check', text: 'Broadcast' },
    //   ]
    // },
    {
      id: 'Course Name',
      title: 'Customer Training',
      icon: 'ri-user-line',
      hasdb: false,
      iconColor: 'red',
      links: [
        { to: '/training_management/customer_training/allTrainingsList', icon: 'ri-list-unordered', text: 'All Training List' },
        { to: '/training_management/customer_training/currentMonth', icon: 'ri-calendar-line', text: 'Current Month Training' },
        { to: '/training_management/customer_training/currentQuarter', icon: 'ri-calendar-line', text: 'Current Quarter Training' },
        { to: '/training_management/customer_training/currentYear', icon: 'ri-calendar-line', text: 'Current Year Training' },
        { to: '/training_management/customer_training/bySoftware', icon: 'ri-computer-line', text: 'Training By Software' },
        { to: '/training_management/customer_training/bySolution', icon: 'ri-tools-line', text: 'Training By Solution' },
      ]
    },
    {
      id: 'MSC',
      title: 'MSC Training Courses',
      icon: 'ri-book-2-line',
      hasdb: false,
      iconColor: 'indigo',
      links: [
        { to: '/training_management/msc_training/create', icon: 'ri-add-circle-line', text: 'Create' },
        { to: '/training_management/msc_training/approve', icon: 'ri-list-check', text: 'Approve' },
        { to: '/training_management/msc_training/list', icon: 'ri-list-check', text: 'All List' },
        // { to: '/training_management/msc_training/trainerRequestForm', icon: 'ri-questionnaire-line', text: 'Trainer Request Form' },
        { to: '/training_management/msc_training/pendingRequest', icon: 'ri-list-check', text: 'Pending Trainer Requests' },
        { to: '/training_management/msc_training/approvedRequest', icon: 'ri-list-check', text: 'Approved Trainer Requests' },
        // { to: '/training_management/msc_training/requestedTrainer', icon: 'ri-list-check', text: 'Trainer Request List' },
      ]
    },
    {
      id: 'Schedule',
      title: 'Schedule',
      icon: 'ri-calendar-line',
      hasdb: false,
      iconColor: 'pink',
      groups: [
        {
          key: 'All Schedules',
          title: 'All Schedules',
          icon: 'ri-calendar-check-line',
          links: [
            { to: '/training_management/Schedule/All Schedule/bySoftware', icon: 'ri-computer-line', text: 'By Software' },
            { to: '/training_management/Schedule/All Schedule/byPartner', icon: 'ri-handshake-line', text: 'By Partner' },
            { to: '/training_management/Schedule/All Schedule/online', icon: 'ri-computer-line', text: 'Online' },
            { to: '/training_management/Schedule/All Schedule/seminar', icon: 'ri-microscope-line', text: 'Seminar' },
            { to: '/training_management/Schedule/All Schedule/conference', icon: 'ri-group-line', text: 'Conference' },
          ]
        },
        {
          key: 'By HTSS',
          title: 'By HTSS',
          icon: 'ri-building-line',
          links: [
            { to: '/training_management/Schedule/By HTSS/bySoftware', icon: 'ri-computer-line', text: 'By Software' },
            { to: '/training_management/Schedule/By HTSS/byPartner', icon: 'ri-handshake-line', text: 'By Partner' },
            { to: '/training_management/Schedule/By HTSS/online', icon: 'ri-computer-line', text: 'Online' },
            { to: '/training_management/Schedule/By HTSS/seminar', icon: 'ri-microscope-line', text: 'Seminar' },
            { to: '/training_management/Schedule/By HTSS/conference', icon: 'ri-group-line', text: 'Conference' },
          ]
        },
        {
          key: 'By CSTMR',
          title: 'By CSTMR',
          icon: 'ri-user-line',
          links: [
            { to: '/training_management/Schedule/By CSTMR/bySoftware', icon: 'ri-computer-line', text: 'By Software' },
            { to: '/training_management/Schedule/By CSTMR/byPartner', icon: 'ri-handshake-line', text: 'By Partner' },
            { to: '/training_management/Schedule/By CSTMR/online', icon: 'ri-computer-line', text: 'Online' },
            { to: '/training_management/Schedule/By CSTMR/seminar', icon: 'ri-microscope-line', text: 'Seminar' },
            { to: '/training_management/Schedule/By CSTMR/conference', icon: 'ri-group-line', text: 'Conference' },
          ]
        },
        {
          key: 'By Partner',
          title: 'By Partner',
          icon: 'ri-handshake-line',
          links: [
            { to: '/training_management/Schedule/By Partner/bySoftware', icon: 'ri-computer-line', text: 'By Software' },
            { to: '/training_management/Schedule/By Partner/byPartner', icon: 'ri-handshake-line', text: 'By Partner' },
            { to: '/training_management/Schedule/By Partner/online', icon: 'ri-computer-line', text: 'Online' },
            { to: '/training_management/Schedule/By Partner/seminar', icon: 'ri-microscope-line', text: 'Seminar' },
            { to: '/training_management/Schedule/By Partner/conference', icon: 'ri-group-line', text: 'Conference' },
          ]
        },
      ]
    },
    {
      id: 'employees',
      title: 'Employees Management',
      icon: 'ri-user-line',
      hasdb: false,
      iconColor: 'teal',
      links: [
        { to: '/training_management/employees/assignRole', text: 'Assign Role', icon: 'ri-user-add-line' },
        { to: '/training_management/employees/allEmployees', text: 'Assigned Employees', icon: 'ri-user-line' },
        { to: '/training_management/employees/unassignedEmployee', text: 'Unassigned Employees', icon: 'ri-user-line' },
      ]
    },
    {
      id: 'Timecards',
      title: 'Timecards',
      icon: 'ri-timer-line',
      roles: ['training-executive'],
      // roles:['software_management_system_executive'],
      hasdb: false,
      iconColor: 'red',
      links: [
        { to: '/training_management/timecard', text: 'My Timecards', icon: 'ri-timer-line' },
        { to: '/training_management/timecard/myMonthly', text: 'Monthly Timecards', icon: 'ri-timer-line' },
      ]
    },
  ]
  return menus.filter(menu => {
    if (!menu.roles) return true
    return menu.roles.includes(role)
  })
});


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
  const menusCopy = JSON.parse(JSON.stringify(staticMenus.value));


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
