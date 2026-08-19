<template>
  <div class="bg-slate-300 w-96 py-4 px-2 min-h-screen border-r border-gray-200">
    <div class="bg-[#a4cef125] p-2 h-full flex flex-col font-semibold">
      <div class="bg-white/90 backdrop-blur-sm rounded-xl p-4 mb-4 shadow-sm">
        <h4 class="font-bold text-center text-sm text-sky-700 mb-3 pb-2 border-b border-sky-100">
          Trainer Dashboard
        </h4>
        <div class="flex justify-center">
          <div
            class="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-sky-600 to-blue-600 text-white text-sm font-medium rounded-full shadow-sm">
            <i class="ri-user-line"></i>
            {{ store?.user?.name }}
          </div>
        </div>
      </div>

      <router-link to="/trainer" active-class="bg-purple-100 text-purple-700"
        class="flex items-center justify-center mb-4 bg-white text-purple-600 font-medium py-2.5 px-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md">
        <i class="ri-dashboard-line mr-2"></i>
        Dashboard
      </router-link>

      <!-- Loading State -->
      <div v-if="isSidebarLoading" class="flex flex-col gap-2 my-2">
        <div v-for="i in 5" :key="i" class="h-10 bg-white/40 rounded-lg animate-pulse"></div>
      </div>

      <!-- My Locations - Matches Trainer Dashboard design -->
      <div class="space-y-2">
        <div class="accordion-group bg-transparent rounded-xl">
          <div class="flex items-center justify-between w-full p-3 rounded-xl transition-all duration-300"
            :class="dropdownHeaderClass" @click="toggleAccordion('MyLocations')">
            <div class="flex items-center gap-3">
              <i class="text-white py-1 px-2 rounded-md ri-map-pin-line bg-purple-500"></i>
              <span>My Locations</span>
            </div>

            <i class="ri-arrow-down-s-line transition-transform duration-300"
              :class="{ 'rotate-180': openSection === 'MyLocations' }"></i>
          </div>

          <!-- Dropdown Content -->
          <div v-show="openSection === 'MyLocations'" class="ml-4 mt-1 space-y-1 border-l-2 border-gray-300 pl-3">
            <div v-if="customers.length > 0" class="space-y-1">
              <router-link v-for="customer in customers" :key="customer.id" :to="{
                path: `/trainer/my_customers/${customer.id}`,
                query: {
                  id: customer.id,
                  name: customer.user?.name || customer.name,
                  recordId: customer.record_id,
                  industryId: customer.industry_id
                }
              }" class="flex items-center gap-2 p-2 text-sm rounded-lg transition-all duration-300"
                :class="dropdownItemClass" active-class="router-link-active">
                <i class="text-white py-1 px-2 rounded-md ri-building-line bg-purple-500"></i>
                <span>{{ customer.user?.name || 'Unnamed Customer' }}</span>
              </router-link>
            </div>
            <div v-else class="p-2 text-blue-800 text-sm italic">No locations found</div>
          </div>
        </div>

        <div class="accordion-group bg-transparent rounded-xl">
          <!-- <div
    class="flex items-center text-white justify-between w-full p-3 border border-white rounded-xl transition-all duration-300 group"
    :class="openSection === 'MyCustomerSuccessTeam' ? 'bg-[#2e318a] text-white shadow-md' : 'hover:bg-[#2e318a] hover:text-white hover:shadow-md bg-[#2e318a] text-white shadow-md'"
    @click="toggleAccordion('MyCustomerSuccessTeam')">
    <div class="flex items-center gap-3">
      <i class="text-white py-1 px-2 rounded-md ri-team-line bg-emerald-500"></i>
      <span>My Customer Success Team</span>
    </div>
    <i class="ri-arrow-down-s-line transition-transform duration-300"
      :class="{'rotate-180': openSection === 'MyCustomerSuccessTeam'}"></i>
  </div> -->

          <!-- Dropdown Content -->
          <div v-show="openSection === 'MyCustomerSuccessTeam'"
            class="ml-4 mt-1 space-y-1 border-l-2 border-gray-300 pl-3">
            <router-link :to="`/trainer/viewTeam`"
              class="flex items-center gap-2 p-2 text-sm rounded-lg transition-all duration-300"
              :class="dropdownItemClass" active-class="router-link-active">
              <i class="text-white py-1 px-2 rounded-md ri-eye-line bg-emerald-500"></i>
              <span>View Team</span>
            </router-link>
          </div>
        </div>

        <!-- My Task - Menu with groups -->
        <div class="accordion-group bg-transparent rounded-xl">
          <div class="flex items-center justify-between w-full p-3 rounded-xl transition-all duration-300"
            :class="dropdownHeaderClass" @click="toggleAccordion('MyTask')">
            <div class="flex items-center gap-3">
              <i class="text-white py-1 px-2 rounded-md ri-task-line bg-orange-500"></i>
              <span>My Task</span>
            </div>

            <i class="ri-arrow-down-s-line transition-transform duration-300"
              :class="{ 'rotate-180': openSection === 'MyTask' }"></i>
          </div>

          <!-- Groups like original Trainer menus -->
          <div v-show="openSection === 'MyTask'" class="ml-4 mt-1 space-y-1 border-l-2 border-gray-300 pl-3">
            <div class="accordion-group space-y-1">
              <router-link :to="`/trainer/taskList`"
                class="flex items-center gap-2 p-2 text-sm rounded-lg transition-all duration-300"
                :class="dropdownItemClass" active-class="router-link-active">
                <i class="text-white py-1 px-2 rounded-md ri-list-check-2 bg-orange-500"></i>
                <span>Task List</span>
              </router-link>
              <router-link :to="`/trainer/taskList/assignedTask`"
                class="flex items-center gap-2 p-2 text-sm rounded-lg transition-all duration-300"
                :class="dropdownItemClass" active-class="router-link-active">
                <i class="text-white py-1 px-2 rounded-md ri-user-shared-line bg-orange-500"></i>
                <span>Assigned Task</span>
              </router-link>
              <router-link :to="`/trainer/taskList/completedTask`"
                class="flex items-center gap-2 p-2 text-sm rounded-lg transition-all duration-300"
                :class="dropdownItemClass" active-class="router-link-active">
                <i class="text-white py-1 px-2 rounded-md ri-checkbox-circle-line bg-orange-500"></i>
                <span>Completed Task</span>
              </router-link>
            </div>
          </div>
        </div>

        <!-- My Actions - Menu with groups -->
        <div class="accordion-group bg-transparent rounded-xl">
          <div class="flex items-center justify-between w-full p-3 rounded-xl transition-all duration-300"
            :class="dropdownHeaderClass" @click="toggleAccordion('MyActions')">
            <div class="flex items-center gap-3">
              <i class="text-white py-1 px-2 rounded-md ri-list-check-2 bg-purple-500"></i>
              <span>My Actions</span>
            </div>

            <i class="ri-arrow-down-s-line transition-transform duration-300"
              :class="{ 'rotate-180': openSection === 'MyActions' }"></i>
          </div>

          <!-- Dropdown Content -->
          <div v-show="openSection === 'MyActions'" class="ml-4 mt-1 space-y-1 border-l-2 border-gray-300 pl-3">
            <router-link :to="`/trainer/myActions/weekly`"
              class="flex items-center gap-2 p-2 text-sm rounded-lg transition-all duration-300"
              :class="dropdownItemClass" active-class="router-link-active">
              <i class="text-white py-1 px-2 rounded-md ri-calendar-event-line bg-purple-500"></i>
              <span>My Weekly Action List</span>
            </router-link>
            <router-link :to="`/trainer/myActions/monthly`"
              class="flex items-center gap-2 p-2 text-sm rounded-lg transition-all duration-300"
              :class="dropdownItemClass" active-class="router-link-active">
              <i class="text-white py-1 px-2 rounded-md ri-calendar-2-line bg-purple-500"></i>
              <span>My Monthly Action List</span>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Original Trainer Dashboard Menus -->
      <div class="space-y-2 mt-2">
        <div v-for="menu in menus" :key="menu.id" class="accordion-group bg-transparent rounded-xl">
          <div v-if="activeTab === menu?.id || activeTab === 'All'"
            class="flex items-center justify-between w-full p-3 rounded-xl transition-all duration-300"
            :class="dropdownHeaderClass" @click="toggleAccordion(menu.id, menu.hasdb)">
            <div class="flex items-center gap-3">
              <i class="text-white py-1 px-2 rounded-md" :class="`${menu.icon} bg-${menu.iconColor}-500`"></i>
              <span>{{ menu.title }}</span>
            </div>

            <i class="ri-arrow-down-s-line transition-transform duration-300"
              :class="{ 'rotate-180': openSection === menu.id }"></i>
          </div>

          <div v-if="activeTab === menu.id || (activeTab == 'All' && currentAccordions === menu.id)"
            class="ml-4 mt-1 space-y-1 border-l-2 border-gray-300 pl-3">
            <template v-if="menu.links">
              <router-link v-for="link in menu.links" :key="link.to" :to="link.to"
                class="flex items-center gap-2 p-2 text-sm rounded-lg transition-all duration-300"
                :class="dropdownItemClass" active-class="router-link-active">
                <i class="text-white py-1 px-2 rounded-md" :class="`${link.icon} bg-${menu.iconColor}-500`"></i>
                <!-- <i :class="link.icon"></i> -->
                <span class="block max-w-[160px] truncate whitespace-nowrap" :title="link.text">
                  {{ link.text }}
                </span>
              </router-link>
            </template>

            <template v-if="menu.groups">
              <div v-for="group in menu.groups" :key="group.key" class="accordion-group">
                <button v-if="
                  store.currentMenu == 'My Industry Solution Management' &&
                  store.currentSubMenu != group
                " @click="toggleNested(group.key)"
                  class="flex items-center justify-between w-full p-2 rounded-lg transition-all duration-300"
                  :class="dropdownItemClass">
                  <div class="flex items-center gap-2">
                    <i v-if="!group.icon" class="ri-add-line text-white py-1 px-2 rounded-md"
                      :class="`bg-${menu.iconColor}-500`"></i>
                    <!-- <i v-else :class="group.icon"></i> -->
                    <i v-else class="text-white py-1 px-2 rounded-md"
                      :class="`${group.icon} bg-${menu.iconColor}-500`"></i>
                    <span class="text-base text-start">{{ group.title }}</span>
                  </div>
                  {{ group.groups }}
                  <i class="ri-arrow-down-s-line transition-transform duration-300"
                    :class="{ 'rotate-180': dropdown === group.key }"></i>
                </button>
                <button v-else @click="toggleNested(group.key)"
                  class="flex items-center justify-between w-full p-2 rounded-lg transition-all duration-300"
                  :class="dropdownItemClass">
                  <div class="flex items-center gap-2">
                    <i v-if="!group.icon" class="ri-add-line text-white py-1 px-2 rounded-md"
                      :class="`bg-${menu.iconColor}-500`"></i>
                    <!-- <i v-else :class="group.icon"></i> -->
                    <i v-else class="text-white py-1 px-2 rounded-md"
                      :class="`${group.icon} bg-${menu.iconColor}-500`"></i>
                    <span class="text-base text-start">{{ group.title }}</span>
                  </div>
                  {{ group.groups }}
                  <i class="ri-arrow-down-s-line transition-transform duration-300"
                    :class="{ 'rotate-180': dropdown === group.key }"></i>
                </button>

                <div v-show="dropdown === group.key || store.currentSubMenu == group.key"
                  class="ml-4 mt-1 space-y-1 border-l-2 border-gray-300 pl-3">
                  <router-link v-for="link in group.links" :key="link.to" :to="link.to"
                    class="flex items-center gap-2 p-2 text-sm rounded-lg transition-all duration-300"
                    :class="dropdownItemClass" active-class="router-link-active">
                    <i class="text-white py-1 px-2 rounded-md" :class="`${link.icon} bg-${menu.iconColor}-500`"></i>
                    {{ link.text }}
                  </router-link>
                  <template v-if="group.sub_groups">
                    <div v-for="sub_groups in group.sub_groups" :key="sub_groups.key" class="accordion-group">
                      <button @click="toggleSubNested(sub_groups.key)"
                        class="flex items-center justify-between w-full p-2 rounded-lg transition-all duration-300"
                        :class="dropdownItemClass">
                        <div class="flex items-center gap-2">
                          <i v-if="!sub_groups.icon" class="ri-add-line text-white py-1 px-2 rounded-md"
                            :class="`bg-${menu.iconColor}-500`"></i>
                          <!-- <i v-else :class="sub_groups.icon"></i> -->
                          <i v-else class="text-white py-1 px-2 rounded-md"
                            :class="`${sub_groups.icon} bg-${menu.iconColor}-500`"></i>
                          <span class="text-base text-start">{{ sub_groups.title }}</span>
                        </div>

                        <i class="ri-arrow-down-s-line transition-transform duration-300"
                          :class="{ 'rotate-180': dropdown === sub_groups.key }"></i>
                      </button>

                      <div v-show="subDropdown === sub_groups.key"
                        class="ml-4 mt-1 space-y-1 border-l-2 border-gray-300 pl-3">
                        <router-link v-for="link in sub_groups.links" :key="link.to" :to="link.to"
                          class="flex items-center gap-2 p-2 text-sm rounded-lg transition-all duration-300"
                          :class="dropdownItemClass" active-class="router-link-active">
                          <i class="text-white py-1 px-2 rounded-md"
                            :class="`${link.icon} bg-${menu.iconColor}-500`"></i>

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

      <!-- LOGOUT -->
      <button type="button"
        class="py-3 px-6 mt-6 w-full bg-gradient-to-r from-red-600 to-pink-600 rounded-xl text-white font-semibold transition-all duration-300 hover:from-red-700 hover:to-pink-700 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2"
        @click="authStore.logout(), router.push('/login/adminLogin')">
        <i class="ri-logout-box-r-line"></i>
        Log Out
      </button>

      <div class="flex flex-col gap-2 overflow-hidden mt-4"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
// import { useAuthStore } from '/src/stores/AuthStore'
import UserDashboardInfo from '@/components/UserDashboardInfo.vue'
import { useUserStore } from '@/pages/user/stores/userStore'
import { useAuthStore } from '@/stores/AuthStore'
import api from '@/config/api'
// import { useOperationStore } from '../stores/accountStore'

const dropdownHeaderClass = 'bg-white text-blue-800 hover:bg-blue-50 shadow-md'

const dropdownItemClass = 'bg-white text-blue-800 hover:bg-blue-50'
const dropdownItemActiveClass = 'bg-blue-100 text-blue-900'

const authStore = useAuthStore()
const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
/* ================= CUSTOMER SUCCESS TEAMS (NEW) ================= */
const customerSuccessTeams = ref([])

const getCustomerSuccessTeams = async () => {
  try {
    const res = await api().get('/my-success-team')

    customerSuccessTeams.value = res.data.data.data.map((team) => {
      const name = team.name || 'Unnamed Team'
      const id = team.id

      return {
        text: name,
        icon: 'ri-team-line',
        to: `/trainer/viewTeams/${slugify(name)}/${id}`
      }
    })
  } catch (error) {
    console.error('Customer Success Teams API failed', error)
  }
}
const props = defineProps({
  activeTab: {
    type: String,
    default: 'All'
  }
})
const emit = defineEmits(['changeTab'])

const store = useAuthStore()
const router = useRouter()
// const operationStore = useOperationStore()
const dropdown = ref('')
const subDropdown = ref('')
const currentAccordions = ref('')
const subsubDropdown = ref('')

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
function toggleSubSubNested(key) {
  subsubDropdown.value = subsubDropdown.value === key ? '' : key
}

// Data for new sections
const services = ref([])
const customers = ref([])
const isSidebarLoading = ref(false)

// Fetch customer data
const fetchCompanyNames = async (teamId) => {
  if (!teamId) return

  isSidebarLoading.value = true

  try {
    const { data } = await api().get(`/success-teams/${teamId}`)
    customers.value = data?.company.customers ?? []
  } catch (error) {
    console.error('Error fetching customer names:', error)
    customers.value = {}
  } finally {
    isSidebarLoading.value = false
  }
}

// Watch for role changes to fetch appropriate data
watch(
  () => store.role,
  (role) => {
    if (role !== 'sales-executive' && role !== 'sales-executive' && role !== 'trainer') return

    const teamId = store.team_id

    if (!teamId) {
      console.warn('Team ID missing for trainer')
      return
    }

    fetchCompanyNames(teamId)
  },
  { immediate: true }
)

// Re-fetch companies when team_id changes
watch(
  () => store.team_id,
  (newTeamId, oldTeamId) => {
    if (!newTeamId || newTeamId === oldTeamId) return
    fetchCompanyNames(newTeamId)
  },
  { immediate: true }
)

onMounted(() => {
  getCustomerSuccessTeams()
})

const menus = computed(() => [
  {
    id: 'My Profile',
    title: 'My Profile',
    icon: 'ri-user-3-line',
    hasdb: false,
    iconColor: 'blue',
    links: [
      { to: '/trainer/my_profile/buildProfile', icon: 'ri-eye-line', text: 'Build Profile' },
      { to: '/trainer/my_profile/pending', icon: 'ri-eye-line', text: 'Pending' },
      { to: '/trainer/my_profile/approved', icon: 'ri-eye-line', text: 'Approved' }
    ]
  },
  {
    id: 'My Training',
    title: 'My Training',
    icon: 'ri-graduation-cap-line',
    hasdb: false,
    iconColor: 'sky',
    links: [{ to: '/trainer/myTraining/all', icon: 'ri-list-check-2', text: 'My Scheduled Training' },]

  },
  {
    id: 'My Skills',
    title: 'My Skills',
    icon: 'ri-graduation-cap-line',
    hasdb: false,
    iconColor: 'sky',
    links: [{ to: '/trainer/mySkills/mySkills', icon: 'ri-list-check-2', text: 'My Skills' }]

  },
   {
    id: 'My Training Availability',
    title: 'My Training Availability',
    icon: 'ri-graduation-cap-line',
    hasdb: false,
    iconColor: 'sky',
    links: [{ to: '/trainer/myTrainingAvailability', icon: 'ri-list-check-2', text: 'My Training Availability' }]

  },
  {
    id: 'My Course',
    title: 'My Course',
    icon: 'ri-graduation-cap-line',
    hasdb: false,
    iconColor: 'purple',
    links: [
      { to: '/trainer/myCourse/applyCourse', icon: 'ri-list-check-2', text: 'Apply new course' }
    ],
    groups: [
      {
        key: 'All course',
        title: 'My Course List',
        icon: 'ri-bookmark-line',
        links: [
          { to: '/trainer/myCourse/pending', icon: 'ri-award-line', text: ' Pending Courses' },
          {
            to: '/trainer/myCourse/approved',
            icon: 'ri-checkbox-circle-line',
            text: 'Approved Courses'
          }
          // { to: '/trainer/myCourse/PlannedList', icon: 'ri-calendar-line', text: 'Planned Training List' },
        ]
      }
    ]
  },

  {
    id: 'SuccessTeamMeetingSchedule',
    title: 'My Meeting Schedule Management',
    icon: 'ri-user-community-line',
    key: 'myScheduledMeeting',
    iconColor: 'sky',
    links: [
      {
        to: '/trainer/meeting-management/create-meeting-schedule',
        text: 'Create Meeting Schedule',
        icon: 'ri-calendar-2-line'
      },
      {
        to: '/trainer/meeting-management/schedule-list',
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
            to: '/trainer/meeting-management/scheduled-meetings/today',
            text: 'Today\'s Scheduled Meetings',
            icon: 'ri-calendar-2-line'
          },
          {
            to: '/trainer/meeting-management/scheduled-meetings/thisWeek',
            text: 'This Week\'s Scheduled Meetings',
            icon: 'ri-calendar-2-line'
          },
          {
            to: '/trainer/meeting-management/scheduled-meetings/thisMonth',
            text: 'This Month\'s Scheduled Meetings',
            icon: 'ri-calendar-2-line'
          },
          {
            to: '/trainer/meeting-management/scheduled-meetings/thisQuarter',
            text: 'This Quarter\'s Scheduled Meetings',
            icon: 'ri-calendar-2-line'
          },
          {
            to: '/trainer/meeting-management/scheduled-meetings/thisYear',
            text: 'This Year\'s Scheduled Meetings',
            icon: 'ri-calendar-2-line'
          }
        ]
      },


    ]


  },

  {
    id: 'My Schedule',
    title: 'My Training Schedule',
    icon: 'ri-computer-line',
    hasdb: false,
    iconColor: 'green',
    links: [
      {
        to: '/trainer/schedule/createSchedule',
        icon: 'ri-add-circle-line',
        text: 'Create Schedule'
      },
      { to: '/trainer/schedule/pending', icon: 'ri-list-unordered', text: 'Pending Schedules' },
      { to: '/trainer/schedule/approved', icon: 'ri-list-unordered', text: 'Approved Schedules' }
    ]
  },

  {
    id: 'CustomerSuccessTeams',
    title: 'Customer Success Teams',
    icon: 'ri-team-line',
    hasdb: false,
    iconColor: 'violet',
    links: customerSuccessTeams.value
  }
])
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

.router-link-active:hover {
  background-color: #3a3fb0;
}
</style>
