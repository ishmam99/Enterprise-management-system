<template>
  <div class="bg-slate-300 bg-center py-4 px-2  min-h-screen h-full  top-20 border-r border-gray-200">
    <!-- User Info Section -->
    <div class="bg-white/90 backdrop-blur-sm rounded-xl p-4 mb-4 shadow-sm">
      <h4 class="font-bold text-center text-sm text-sky-700 mb-3 pb-2 border-b border-sky-100">
        Customer Success Manager Dashboard
      </h4>
      <div class="flex justify-center">
        <div
          class="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-sky-600 to-blue-600 text-white text-sm font-medium rounded-full shadow-sm">
          <i class="ri-user-line"></i>
          {{ store?.user?.name }}
        </div>
      </div>
    </div>

    <!-- Dashboard Button -->
    <router-link to="/customer_success_manager"
      class="flex items-center justify-center mb-4 bg-white text-purple-600 hover:from-purple-600 hover:to-purple-700  font-medium py-2.5 px-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md">
      <!-- <i class="ri-dashboard-line mr-2"></i> -->
      <img :src="getLogo(teamData?.company?.name)" alt="" class="w-6 h-6 mr-2"> {{ teamData?.company?.name ||
        'Dashboard' }}
    </router-link>

    <!-- Sidebar Menus -->
    <div class="flex flex-col gap-1">
      <div v-for="menu in menus" :key="menu.id" class="bg-white rounded-xl overflow-hidden transition-all duration-300"
        :class="{ 'from-sky-600 to-blue-600 shadow-md': openSection === menu.id }">
        <!-- Top Level Menu Item -->
        <div
          class="flex items-center justify-between px-3.5 py-2 text-blue-600 cursor-pointer transition-colors duration-200 hover:bg-blue-500 hover:text-white"
          @click="toggleAccordion(menu.id)">
          <div class="flex items-center gap-3">
            <i class="flex items-center justify-center w-8 h-8 rounded-md text-white" :class="menu.icon"
              :style="{ backgroundColor: getMenuColor(menu.title) }"></i>
            <span class="font-medium text-sm">{{ menu.title }}</span>
          </div>
          <i class="ri-arrow-down-s-line transition-transform duration-300"
            :class="{ 'rotate-180': openSection === menu.id }"></i>
        </div>

        <!-- Menu Content (Links & Groups) -->
        <div v-if="openSection === menu.id" class="bg-white ml-4 backdrop-blur-sm">
          <!-- Direct Links -->
          <template v-if="menu.links && menu.links.length">
            <router-link v-for="link in menu.links" :key="link.to.path || link.to" :to="link.to"
              class="flex items-center border hover:bg-blue-500 hover:text-white rounded-lg gap-3 m-1 py-2.5 px-4 text-sm text-blue-700 transition-colors duration-200 "
              :class="{
                'bg-blue-500 border-l-4 text-white hover:bg-blue-600 border-blue-300':
                  isLinkActive(link.to)
              }">
              <i class="flex items-center justify-center w-6 h-6 text-white px-2 rounded text-xs" :class="link.icon"
                :style="{ backgroundColor: getMenuColor(menu.title) }"></i>
              <span class="font-medium">{{ link.text }}</span>
            </router-link>
          </template>

          <!-- Groups -->
          <template v-if="menu.groups && menu.groups.length">
            <div v-for="group in menu.groups" :key="group.key" class="border-l-2 border-blue-300/30">
              <button
                class="flex items-center border rounded-lg m-1 justify-between w-full p-2.5 text-sm text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200"
                @click="toggleNested(group.key)">
                <div class="flex items-center gap-2">
                  <i v-if="group.icon" class="flex items-center text-white justify-center w-5 h-5 rounded text-xs"
                    :class="group.icon" :style="{ backgroundColor: getMenuColor(menu.title) }"></i>
                  <span class="font-medium">{{ group.title }}</span>
                </div>
                <i class="ri-arrow-right-s-line transition-transform duration-300"
                  :class="{ 'rotate-90': openGroup === group.key }"></i>
              </button>

              <!-- Group Links -->
              <div v-if="openGroup === group.key" class="ml-3 flex flex-col gap-0.5">

                <router-link v-for="link in group.links" :key="link.to" :to="link.to"
                  class="flex items-center border rounded-lg border-blue-300 mr-1 gap-3 py-2.5 px-4 text-sm text-blue-700 border-lg transition-colors duration-200 hover:bg-blue-600 hover:text-white"
                  :class="{
                    'bg-gradient-to-r from-blue-700/50 to-sky-700/50 border-l-4 border-blue-300':
                      isLinkActive(link.to)
                  }">
                  <i v-if="link.icon" class="flex text-white items-center justify-center w-6 h-6 rounded text-xs"
                    :class="link.icon" :style="{ backgroundColor: getMenuColor(menu.title) }"></i>
                  <span v-else class="w-2 h-2 rounded-full"
                    :style="{ backgroundColor: getMenuColor(menu.title) }"></span>
                  <span class="font-medium">{{ link.text }}</span>
                </router-link>

                <!-- Sub-groups -->
                <template v-if="group.sub_groups && group.sub_groups.length">
                  <div v-for="subGroup in group.sub_groups" :key="subGroup.key" class="border-l-2 border-blue-300/30">
                    <button
                      class="flex items-center border justify-between w-full p-2.5 text-sm text-white hover:bg-white/10 transition-colors duration-200"
                      @click="toggleSubNested(subGroup.key)">
                      <div class="flex items-center gap-2">
                        <i v-if="subGroup.icon" class="flex items-center justify-center w-5 h-5 rounded text-xs"
                          :class="subGroup.icon" :style="{ backgroundColor: getMenuColor(menu.title) }"></i>
                        <span class="font-medium">{{ subGroup.title }}</span>
                      </div>
                      <i class="ri-arrow-right-s-line transition-transform duration-300"
                        :class="{ 'rotate-90': openSubGroup === subGroup.key }"></i>
                    </button>

                    <!-- Sub-group Links -->
                    <div v-if="openSubGroup === subGroup.key" class="ml-3 flex flex-col gap-0.5">

                      <router-link v-for="link in subGroup.links" :key="link.to.path || link.to" :to="link.to"
                        class="flex items-center gap-3 py-2.5 px-4 border text-sm text-white transition-colors duration-200 hover:bg-white/20"
                        :class="{
                          'bg-gradient-to-r from-blue-700/50 to-sky-700/50 border-l-4 border-blue-300':
                            isLinkActive(link.to)
                        }">
                        <i v-if="link.icon" class="flex items-center justify-center w-6 h-6 rounded text-xs"
                          :class="link.icon" :style="{ backgroundColor: getMenuColor(menu.title) }"></i>
                        <span v-else class="w-2 h-2 rounded-full"
                          :style="{ backgroundColor: getMenuColor(menu.title) }"></span>
                        <span class="font-medium">{{ link.text }}</span>
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

    <!-- Logout Button -->
    <button type="button"
      class="py-3 px-6 mt-6 w-full bg-gradient-to-r from-red-600 to-pink-600 rounded-xl text-white font-semibold transition-all duration-300 hover:from-red-700 hover:to-pink-700 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2"
      @click="store.logout(), router.push('/login/adminLogin')">
      <i class="ri-logout-box-r-line"></i>
      Log Out
    </button>


  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'
import { watch } from 'vue'
import { useCompanyLogo } from '@/composables/useCompanyLogo'

const { getLogo } = useCompanyLogo()
const router = useRouter()
const route = useRoute()
const store = useAuthStore()
const authStore = useAuthStore()

// State
const openSection = ref('')
const openGroup = ref('')
const openSubGroup = ref('')
const teamData = ref(null)

// Menu color mapping
const menuColors = {
  'My Locations': '#BA55D3',
  'My Team Contacts': '#00BA9A',
  'Planning Management': '#FFA500',
  'Activity Report': '#FF4500',
  'Cleaning Management': '#BA55D3',
  'Team Task': '#00CED1',
  'My Customer Success Team': '#a000ff',
  'My Companies': '#0ea5e9',
  'My Contacts': '#00CED1'
}

// Methods
const getMenuColor = (menuTitle) => {
  return menuColors[menuTitle] || '#6B7280'
}

const isLinkActive = (linkTo) => {
  if (!linkTo) return false

  const path = typeof linkTo === 'object' ? linkTo.path : linkTo
  return route.path === path || route.path.startsWith(path + '/')
}

const toggleAccordion = (id) => {
  openSection.value = openSection.value === id ? '' : id
  openGroup.value = ''
  openSubGroup.value = ''
}

const toggleNested = (key) => {
  openGroup.value = openGroup.value === key ? '' : key
  openSubGroup.value = ''
}

const toggleSubNested = (key) => {
  openSubGroup.value = openSubGroup.value === key ? '' : key
}

const handleLogout = () => {
  store.logout()
  router.push('/login/adminLogin')
}

// Data fetching
const menus = ref([
  {
    id: 1
  },
  {
    id: 1
  },
  {
    id: 1
  },
  {
    id: 1
  },
  {
    id: 1
  }
])

const getTeamData = async () => {
  try {
    // Replace with your actual API call
    const { data } = await api().get(`success-teams/${authStore.team_id}`)
    teamData.value = data
    menus.value = [
      {
        id: 'Systems',
        title: 'My Locations @ ' + teamData.value?.company?.name,
        icon: 'ri-user-settings-fill',
        key: 'myCustomers',
        links: []
      },
      {
        id: 'SuccessTeam',
        title: 'My Customer Success Team',
        icon: 'ri-user-community-line',
        key: 'myTeams',
        links: []
      },

      {
        id: 'SuccessTeamTask',
        title: 'Task Management',
        icon: 'ri-user-community-line',
        key: 'myTeamTask',

      },
      {
        id: 'SuccessTeamMeetingSchedule',
        title: 'Schedule Management',
        icon: 'ri-user-community-line',
        key: 'myScheduledMeeting',
        links: [
          {
            to: '/customer_success_manager/meeting-management/create-meeting-schedule',
            text: 'Create Meeting Schedule',
            icon: 'ri-calendar-2-line'
          },
           {
            to: '/customer_success_manager/meeting-management/schedule-list',
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
                to: '/customer_success_manager/meeting-management/scheduled-meetings/today',
                text: 'Today\'s Scheduled Meetings',
                icon: 'ri-calendar-2-line'
              },
              {
                to: '/customer_success_manager/meeting-management/scheduled-meetings/thisWeek',
                text: 'This Week\'s Scheduled Meetings',
                icon: 'ri-calendar-2-line'
              },
              {
                to: '/customer_success_manager/meeting-management/scheduled-meetings/thisMonth',
                text: 'This Month\'s Scheduled Meetings',
                icon: 'ri-calendar-2-line'
              },
              {
                to: '/customer_success_manager/meeting-management/scheduled-meetings/thisQuarter',
                text: 'This Quarter\'s Scheduled Meetings',
                icon: 'ri-calendar-2-line'
              },
              {
                to: '/customer_success_manager/meeting-management/scheduled-meetings/thisYear',
                text: 'This Year\'s Scheduled Meetings',
                icon: 'ri-calendar-2-line'
              }
            ]
          },


        ]


      },
      {
        id: 'ActivityLog',
        title: 'Activity Report',
        icon: 'ri-todo-fill',
        key: 'activityReport',
        links: [
          // {
          //   to: '/customer_success_manager/activity-log',
          //   text: 'Activity Log List',
          //   icon: 'ri-list-check'
          // },
          {
            to: '/customer_success_manager/activity-report/create',
            text: 'Generate Activity Report',
            icon: 'ri-add-circle-line  '
          }
        ],
        groups: [
          {
            key: 'ActivityReportList',
            title: 'Activity Report List',
            icon: 'ri-list-check',
            links: [
              { to: '/customer_success_manager/activity-report/list', text: 'Generated Activity Reports', icon: 'ri-list-check' },
              { to: '/customer_success_manager/activity-report/pre-approved', text: 'Pre Approved Activity Report', icon: 'ri-list-check' },
              { to: '/customer_success_manager/activity-report/approved', text: 'Approved Activity Reports', icon: 'ri-list-check' },
            ]

          },
        ]
      },
      {
        id: 'MyContacts',
        title: 'My Team Contacts',
        icon: 'ri-todo-fill',
        key: 'myContacts',
        links: [
          { to: '/customer_success_manager/my-team-contacts/htss', text: 'Contacts of Customer Success Team', icon: 'ri-list-check' },
          { to: '/customer_success_manager/my-team-contacts/company', text: 'Contacts of ' + teamData.value?.company?.name + ' Representative', icon: 'ri-list-check' },
          { to: '/customer_success_manager/my-team-contacts/partner', text: 'Contacts of MSC Representative', icon: 'ri-list-check' },
        ]
      },
      {
        id: 'MyContacts2',
        title: 'Softwares @ ' + teamData.value?.company?.name,
        icon: 'ri-todo-fill',
        key: 'myContacts',
        links: [
          { to: '/customer_success_manager/software/listSoftware', text: 'List of Current Softwares', icon: 'ri-list-check' },
          { to: '/customer_success_manager/software/UsabilityOfCurrentSoftware', text: 'Usability of Current Softwares', icon: 'ri-list-check' },
          { to: '/customer_success_manager/software/usabilityGraph', text: 'View Usability Graph', icon: 'ri-list-check' },
        ]
      },
      {
        id: 'MyContacts3',
        title: 'Solutions @ ' + teamData.value?.company?.name,
        icon: 'ri-todo-fill',
        key: 'myContacts',
        links: [
          { to: '/customer_success_manager/Solution/listSolution', text: 'List of Current Solutions', icon: 'ri-list-check' },
          { to: '/customer_success_manager/Solution/UsabilityOfCurrentSolution', text: 'Usability of Current Solutions', icon: 'ri-list-check' },
          { to: '/customer_success_manager/Solution/usabilityGraph', text: 'View Usability Graph', icon: 'ri-list-check' },
        ]
      },
      {
        id: 'MyContacts1',
        title: 'My Contacts',
        icon: 'ri-todo-fill',
        key: 'myContacts1',
        links: [
          // {
          //   to: '/customer_success_manager/activity-log',
          //   text: 'Activity Log List',
          //   icon: 'ri-list-check'
          // },
          {
            to: `/customer_success_manager/my-contacts/engineering-department`,
            text: 'Engineering Department',
            icon: 'ri-add-circle-line  '
          },
          {
            to: '/customer_success_manager/my-contacts/purchase-sales-department',
            text: 'Purchasing and Sales Department',
            icon: 'ri-add-circle-line  '
          },
        ],
        groups: [
          {
            key: 'bySolution',
            title: 'By Solution',
            icon: 'ri-list-check',
            links: [
              {
                to: '/customer_success_manager/my-contacts/solution-structure-analysis-service',
                text: 'Structure Analysis Service',
                icon: 'ri-user-settings-line'
              },
              {
                to: '/customer_success_manager/my-contacts/solution-system-dynamics-analysis-service',
                text: 'System Dynamics Analysis Service',
                icon: 'ri-user-settings-line'
              },
              {
                to: '/customer_success_manager/my-contacts/solution-acoustics-analysis-service',
                text: 'Acoustics Analysis Service',
                icon: 'ri-user-settings-line'
              },
              {
                to: '/customer_success_manager/my-contacts/solution-fluids-analysis-service',
                text: 'Fluids Analysis Service',
                icon: 'ri-user-settings-line'
              },
              {
                to: '/customer_success_manager/my-contacts/solution-autonomous-analysis-service',
                text: 'Autonomous Analysis Service',
                icon: 'ri-user-settings-line'
              },
              {
                to: '/customer_success_manager/my-contacts/solution-vmc-analysis-service',
                text: 'VM&C Analysis Service',
                icon: 'ri-user-settings-line'
              },
              {
                to: '/customer_success_manager/my-contacts/solution-icme-analysis-service',
                text: 'ICME Analysis Service',
                icon: 'ri-user-settings-line'
              }
            ]
          },

          {
            key: 'bySoftware',
            title: 'By Software',
            icon: 'ri-list-check',
            links: [
              'Adams',
              'CAE Fatigue',
              'MSC Apex',
              'Dytran',
              'Marc',
              'Nastran',
              'Patran',
              'MSC Cradle CFD',
              'MSC CoSim',
              'Romax',
              'Easy5',
              'Elements',
              'Material Center',
              'Digimat',
              'Material Center Databanks',
              'ODYSSEE',
              'Simufact',
              'FTI FormingSuite',
              'VTD Scale',
              'VTD',
              'Cloud',
              'Actran'
            ].map(name => ({
              to: `/customer_success_manager/my-contacts/software-${name
                .toLowerCase()
                .replace(/\s+/g, '-')}`,
              text: name,
              icon: 'ri-user-settings-line'
            }))
          }
        ]
      },
    ]
    menus.value[1].links = [
      {
        to: {
          path: `/customer_success_manager/success-team/${teamData.value.id}`,
          query: {
            id: teamData.value.id
          }
        },
        text: teamData.value.name,
        icon: 'ri-team-line'
      }
    ]
    if (teamData.value?.company?.customers && teamData.value?.company?.customers.length) {
      let customerIds = teamData.value.company?.customers.map(e => e.id)
      menus.value[0].links = teamData.value.company.customers.map((customer) =>

      ({
        to: {
          path: `/customer_success_manager/my_customers/${customer.id}`,
          query: {
            id: customer.id,
            name: customer.user?.name || customer.name,
            recordId: customer.record_id,
            industryId: customer.industry_id
          }
        },
        text: customer.user.name,
        icon: 'ri-user-line'
      }))
      await getSoftSolutions(customerIds)
    } else {
      menus.value[0].links = [
        {
          to: `/customer_success_manager`,
          text: 'No Locations assigned',
          icon: 'ri-error-warning-line'
        }
      ]
    }

  } catch (error) {
    console.error('Error fetching team data:', error)
  }
}
const getSoftSolutions = async (customerIds) => {
  try {
    const [softwareRes, solutionRes] = await Promise.all([
      api().get('customer-software?customer_ids=' + customerIds),
      api().get('customer-solution?customer_ids=' + customerIds)
    ])
    let softList = softwareRes.data.map((e) => {
      return { to: { name: 'customer_success_manager-team-tasks-software-id', query: { name: e?.software?.name }, params: { id: e.software_id } }, icon: 'ri-list-check', text: e.software.name }
    })
    let solutionList = solutionRes.data.map((e) => {
      return { to: { name: 'customer_success_manager-team-tasks-solution-id', query: { name: e?.solution_name }, params: { id: e.solution_id } }, icon: 'ri-list-check', text: e.solution_name }
    })
    console.log(softList)
    menus.value[2].groups =
      [
        {
          key: 'TaskByTeam',
          title: 'Team Task',
          icon: 'ri-add-circle-line',

          links: [
            {
              to: '/customer_success_manager/team-tasks/create',
              text: 'Create Task',
              icon: 'ri-task-line'
            },
            {
              to: '/customer_success_manager/team-tasks/list',
              text: 'Task List',
              icon: 'ri-task-line'
            },
            {
              to: '/customer_success_manager/team-tasks/partner',
              text: 'Partner Task List',
              icon: 'ri-task-line'
            }
          ]
        }, {
          key: 'TaskByMe',
          title: 'My Task',
          icon: 'ri-add-circle-line',

          links: [
            {
              to: '/customer_success_manager/my-tasks/create',
              text: 'Create Task',
              icon: 'ri-task-line'
            },
            {
              to: '/customer_success_manager/my-tasks/list',
              text: 'Task List',
              icon: 'ri-task-line'
            },

          ]
        },
        {
          key: 'TaskBySoftware',
          title: 'Task List By Software',
          icon: 'ri-add-circle-line',
          links: softList

        },
        {
          key: 'TaskBySolution',
          title: 'Task List By Solution',
          icon: 'ri-add-circle-line',
          links: solutionList

        }
      ]



  } catch (error) {
    console.error('Error fetching software and solutions:', error)
  }
}
watch(
  () => authStore.team_id,
  () => {
    getTeamData()
  }
)
onMounted(() => {
  getTeamData()
})
</script>
