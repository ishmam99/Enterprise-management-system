<template>
  <div
    class="bg-slate-300 w-96 py-4 px-2 min-h-screen border-r border-gray-200"
  >
    <div class="p-2 h-full flex flex-col">

      <div class="bg-white/90 rounded-xl p-4 mb-4 shadow-sm">
        <h4 class="font-bold text-center text-sm text-sky-700 mb-3 pb-2 border-b">
          Software Management Dashboard
        </h4>
        <div class="flex justify-center">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-sky-600 to-blue-600 text-white text-sm rounded-full">
            <i class="ri-user-line"></i>
            {{ authStore?.user?.name }}
          </div>
        </div>
      </div>

     <!-- Dashboard -->
      <router-link
        to="/software_management"
        active-class="bg-purple-100 text-purple-700"
        class="flex items-center justify-center mb-4 bg-white text-purple-600 font-medium py-2.5 px-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
      >
      <i class="ri-dashboard-line mr-2"></i>
      Dashboard
    </router-link>

      <!-- Loading State -->
      <div v-if="isSidebarLoading" class="flex flex-col gap-2 my-2">
        <div v-for="i in 5" :key="i" class="h-10 bg-white/40 rounded-lg animate-pulse"></div>
      </div>

      <!-- Software Management Specific Menus -->
      <div class="space-y-2">
        <!-- My Locations - Now matches Industry/Solution/Software design -->
        <div class="accordion-group bg-white-600 rounded-xl">
        <!-- Dropdown Header -->
        <div
          class="flex items-center justify-between w-full p-3 border border-white rounded-xl transition-all duration-300 group"
          :class="openSection === 'MyLocations'
            ? 'bg-white text-blue-800 shadow-md'
            : 'hover:bg-white hover:text-blue-800 hover:shadow-md bg-white text-blue-800 shadow-md'"
          @click="toggleAccordion('MyLocations')"
        >
          <div class="flex items-center gap-3">
            <i class="text-white py-1 px-2 rounded-md ri-map-pin-line bg-blue-500"></i>
            <span class="text-base font-medium">My Locations</span>
          </div>

          <i class="ri-arrow-down-s-line transition-transform duration-300"
            :class="{'rotate-180': openSection === 'MyLocations'}"></i>
        </div>

        <!-- Dropdown Links -->
        <div v-show="openSection === 'MyLocations'"
            :class="[
              'ml-4 mt-1 space-y-1 border-l-2 border-gray-300 pl-3 rounded-xl transition-all duration-300',
              openSection === 'MyLocations'
                ? 'bg-white text-blue-800'
                : 'bg-transparent text-white'
            ]"
        >
          <div v-if="customers.length > 0" class="space-y-1">
            <router-link v-for="customer in customers" :key="customer.id"
              :to="{
                path: `/software_management/my_customers/${customer.id}`,
                query: {
                  id: customer.id,
                  name: customer.user?.name || customer.name,
                  recordId: customer.record_id,
                  industryId: customer.industry_id
                }
              }"
              class="flex items-center gap-2 p-2 text-sm rounded-lg transition-all duration-300 hover:bg-gray-200 hover:text-[#2e318a]"
              :class="openSection === 'MyLocations' ? 'text-blue-800' : 'text-white'"
              active-class="router-link-active"
            >
              <i class="text-white py-1 px-2 rounded-md ri-building-line bg-purple-500"></i>
              <span>{{ customer.user?.name || 'Unnamed Customer' }}</span>
            </router-link>
          </div>
          <div v-else class="p-2 text-sm italic" :class="openSection === 'MyLocations' ? 'text-blue-800' : 'text-white'">
            No locations found
          </div>
        </div>

        </div>

        <!-- My Customer Success Team - Single link menu -->
        <div class="accordion-group rounded-xl">
          <router-link
            to="/software_management/viewTeam"
            class="flex items-center justify-between w-full p-3 border border-gray-300 rounded-xl transition-all duration-300 group bg-white text-blue-800 shadow-sm hover:bg-gray-100 hover:text-blue-800 hover:shadow-md"
            active-class="router-link-active"
          >
            <div class="flex items-center gap-3">
              <i class="text-white py-1 px-2 rounded-md ri-team-line bg-emerald-500"></i>
              <span class="text-sm text-nowrap">My Customer Success Team</span>
            </div>
            <i class="ri-arrow-right-s-line text-blue-800"></i>
          </router-link>
        </div>


        <!-- My Task - Menu with groups like Industry/Solution -->
        <div class="accordion-group bg-white-600 rounded-xl">
          <!-- Dropdown Header -->
          <div
            class="flex items-center justify-between w-full p-3 border border-white rounded-xl transition-all duration-300 group"
            :class="openSection === 'MyTask'
              ? 'bg-white text-blue-800 shadow-md'
              : 'hover:bg-white hover:text-blue-800 hover:shadow-md bg-white text-blue-800 shadow-md'"
            @click="toggleAccordion('MyTask')"
          >
            <div class="flex items-center gap-3">
              <i class="text-white py-1 px-2 rounded-md ri-task-line bg-orange-500"></i>
              <span class="text-base">My Task</span>
            </div>
            <i class="ri-arrow-down-s-line transition-transform duration-300"
              :class="{'rotate-180': openSection === 'MyTask'}"></i>
          </div>

          <!-- Dropdown Links Container -->
          <div v-show="openSection === 'MyTask'"
              :class="[
                'ml-4 mt-1 space-y-1 border-l-2 border-gray-300 pl-3 rounded-xl transition-all duration-300',
                openSection === 'MyTask' ? 'bg-white text-blue-800' : 'bg-transparent text-blue-800'
              ]"
          >
            <div class="accordion-group">
              <!-- Nested Button -->
              <button
                @click="toggleNested('taskList')"
                class="flex items-center justify-between w-full p-2 rounded-lg transition-all duration-300 hover:bg-gray-200 hover:text-blue-800 text-blue-800"
              >
                <div class="flex items-center gap-2">
                  <i class="text-white py-1 px-2 rounded-md ri-list-check bg-orange-500"></i>
                  <span class="text-base text-start">Task Management</span>
                </div>
                <i class="ri-arrow-down-s-line transition-transform duration-300"
                  :class="{'rotate-180': dropdown === 'taskList'}"></i>
              </button>

              <!-- Nested Links -->
              <div v-show="dropdown === 'taskList'" class="ml-4 mt-2 border-l-2 border-gray-300 pl-3">
                <router-link
                  :to="`/software_management/taskList`"
                  class="flex items-center gap-2 p-2 mb-2 text-sm rounded-lg transition-all duration-300 hover:bg-gray-200 hover:text-blue-800 text-blue-800"
                  active-class="router-link-active"
                >
                  <i class="text-white py-1 px-2 rounded-md ri-list-check-2 bg-orange-500"></i>
                  <span>Task List</span>
                </router-link>

                <router-link
                  :to="`/software_management/taskList/assignedTask`"
                  class="flex items-center gap-2 p-2 mb-2 text-sm rounded-lg transition-all duration-300 hover:bg-gray-200 hover:text-blue-800 text-blue-800"
                  active-class="router-link-active"
                >
                  <i class="text-white py-1 px-2 rounded-md ri-user-shared-line bg-orange-500"></i>
                  <span>Assigned Task</span>
                </router-link>

                <router-link
                  :to="`/software_management/taskList/completedTask`"
                  class="flex items-center gap-2 p-2 text-sm rounded-lg transition-all duration-300 hover:bg-gray-200 hover:text-blue-800 text-blue-800"
                  active-class="router-link-active"
                >
                  <i class="text-white py-1 px-2 rounded-md ri-checkbox-circle-line bg-orange-500"></i>
                  <span>Completed Task</span>
                </router-link>
              </div>

            </div>
          </div>
        </div>


        <!-- My Schedules - Menu with groups -->
        <!-- <div class="accordion-group bg-sky-600 rounded-xl">
          <div
            class="flex items-center text-white justify-between w-full p-3 border border-white rounded-xl transition-all duration-300 group"
            :class="openSection === 'MySchedules' ? 'bg-[#2e318a] text-white shadow-md' : 'hover:bg-[#2e318a] hover:text-white hover:shadow-md bg-[#2e318a] text-white shadow-md'"
            @click="toggleAccordion('MySchedules')">
            <div class="flex items-center gap-3">
              <i class="text-white py-1 px-2 rounded-md ri-calendar-line bg-red-500"></i>
              <span>My Schedules</span>
            </div>

            <i class="ri-arrow-down-s-line transition-transform duration-300"
              :class="{'rotate-180': openSection === 'MySchedules'}"></i>
          </div>

          <div v-show="openSection === 'MySchedules'"
            class="ml-4 mt-1 space-y-1 border-l-2 border-gray-300 pl-3">

          </div>
        </div> -->

        <!-- My Actions - Menu with groups -->
        <div class="accordion-group bg-white-600 rounded-xl">
  <!-- Dropdown Header -->
  <div
    class="flex items-center justify-between w-full p-3 border border-white rounded-xl transition-all duration-300 group"
    :class="openSection === 'MyActions'
      ? 'bg-white text-blue-800 shadow-md'
      : 'hover:bg-white hover:text-blue-800 hover:shadow-md bg-white text-blue-800 shadow-md'"
    @click="toggleAccordion('MyActions')"
  >
    <div class="flex items-center gap-3">
      <i class="text-white py-1 px-2 rounded-md ri-list-check-2 bg-purple-500"></i>
      <span class="text-base">My Actions</span>
    </div>
    <i class="ri-arrow-down-s-line transition-transform duration-300"
      :class="{'rotate-180': openSection === 'MyActions'}"></i>
  </div>

  <!-- Dropdown Content -->
  <div v-show="openSection === 'MyActions'"
      class="ml-4 mt-1 space-y-2 border-l-2 border-gray-300 pl-3 rounded-xl bg-white text-blue-800"
  >
    <router-link
      :to="`/software_management/myActions/weekly`"
      class="flex items-center gap-2 p-2 text-sm rounded-lg transition-all duration-300 hover:bg-gray-200 hover:text-blue-800 text-blue-800"
      active-class="router-link-active"
    >
      <i class="text-white py-1 px-2 rounded-md ri-calendar-event-line bg-purple-500"></i>
      <span>My Weekly Action List</span>
    </router-link>

    <router-link
      :to="`/software_management/myActions/monthly`"
      class="flex items-center gap-2 p-2 text-sm rounded-lg transition-all duration-300 hover:bg-gray-200 hover:text-blue-800 text-blue-800"
      active-class="router-link-active"
    >
      <i class="text-white py-1 px-2 rounded-md ri-calendar-2-line bg-purple-500"></i>
      <span>My Monthly Action List</span>
    </router-link>
  </div>
</div>

      </div>

      <!-- Original Software Management Dashboard Menus -->
<div class="space-y-2 mt-2">
  <div v-for="menu in menus" :key="menu.id" class="accordion-group rounded-xl">

    <!-- Header -->
    <div
      class="flex items-center justify-between w-full p-3 border rounded-xl transition-all duration-300 group"
      :class="openSection === menu.id
        ? 'bg-white text-blue-800 shadow-md border-gray-300'
        : 'hover:bg-white hover:text-blue-800 hover:shadow-md bg-white text-blue-800 border-gray-300 shadow-sm'"
      @click="toggleAccordion(menu.id, menu.hasdb)"
    >
      <div class="flex items-center gap-3">
        <i class="text-white py-1 px-2 rounded-md" :class="`${menu.icon} bg-${menu.iconColor}-500`"></i>
        <span class="text-base">{{ menu.title }}</span>
      </div>
      <i class="ri-arrow-down-s-line transition-transform duration-300"
        :class="{'rotate-180': openSection === menu.id}"></i>
    </div>

    <!-- Dropdown -->
    <div
      v-if="activeTab === menu.id || (activeTab === 'All' && currentAccordions === menu.id)"
      class="ml-4 mt-1 space-y-2 border-l-2 border-gray-300 pl-3 rounded-xl bg-white text-blue-800"
    >
      <!-- Direct Links -->
      <template v-if="menu.links">
        <router-link
          v-for="link in menu.links"
          :key="link.to"
          :to="link.to"
          class="flex items-center gap-2 p-2 text-sm rounded-lg transition-all duration-300 hover:bg-gray-200 hover:text-blue-800 text-blue-800"
          active-class="router-link-active"
        >
          <i class="text-white py-1 px-2 rounded-md" :class="`${link.icon} bg-${menu.iconColor}-500`"></i>
          <span class="block max-w-[160px] truncate whitespace-nowrap" :title="link.text">{{ link.text }}</span>
        </router-link>
      </template>

      <!-- Groups -->
      <template v-if="menu.groups">
        <div v-for="group in menu.groups" :key="group.key" class="accordion-group">
          <button
            @click="toggleNested(group.key)"
            class="flex items-center justify-between w-full p-2 text-blue-800 rounded-lg transition-all duration-300 hover:bg-gray-200"
          >
            <div class="flex items-center gap-2">
              <i v-if="!group.icon" class="ri-add-line text-white py-1 px-2 rounded-md" :class="`bg-${menu.iconColor}-500`"></i>
              <i v-else class="text-white py-1 px-2 rounded-md" :class="`${group.icon} bg-${menu.iconColor}-500`"></i>
              <span class="text-base">{{ group.title }}</span>
            </div>
            <i class="ri-arrow-down-s-line transition-transform duration-300"
              :class="{'rotate-180': dropdown === group.key}"></i>
          </button>

          <!-- Nested Links -->
          <div v-show="dropdown === group.key || store.currentSubMenu === group.key" class="ml-4 mt-1 space-y-2 border-l-2 border-gray-300 pl-3 bg-white text-blue-800 rounded-xl">
            <router-link
              v-for="link in group.links"
              :key="link.to"
              :to="link.to"
              class="flex items-center gap-2 p-2 text-sm rounded-lg transition-all duration-300 hover:bg-gray-200 hover:text-blue-800 text-blue-800"
              active-class="router-link-active"
            >
              <i class="text-white py-1 px-2 rounded-md" :class="`${link.icon} bg-${menu.iconColor}-500`"></i>
              {{ link.text }}
            </router-link>

            <!-- Subgroups -->
            <template v-if="group.sub_groups">
              <div v-for="sub_group in group.sub_groups" :key="sub_group.key" class="accordion-group">
                <button
                  @click="toggleSubNested(sub_group.key)"
                  class="flex items-center justify-between w-full p-2 text-blue-800 rounded-lg transition-all duration-300 hover:bg-gray-200"
                >
                  <div class="flex items-center gap-2">
                    <i v-if="!sub_group.icon" class="ri-add-line text-white py-1 px-2 rounded-md" :class="`bg-${menu.iconColor}-500`"></i>
                    <i v-else class="text-white py-1 px-2 rounded-md" :class="`${sub_group.icon} bg-${menu.iconColor}-500`"></i>
                    <span class="text-base">{{ sub_group.title }}</span>
                  </div>
                  <i class="ri-arrow-down-s-line transition-transform duration-300"
                    :class="{'rotate-180': subDropdown === sub_group.key}"></i>
                </button>

                <div v-show="subDropdown === sub_group.key" class="ml-4 mt-1 space-y-2 border-l-2 border-gray-300 pl-3 bg-white text-blue-800 rounded-xl">
                  <router-link
                    v-for="link in sub_group.links"
                    :key="link.to"
                    :to="link.to"
                    class="flex items-center gap-2 p-2 text-sm rounded-lg transition-all duration-300 hover:bg-gray-200 hover:text-blue-800 text-blue-800"
                    active-class="router-link-active"
                  >
                    <i class="text-white py-1 px-2 rounded-md" :class="`${link.icon} bg-${menu.iconColor}-500`"></i>
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
                class="py-3 px-6 mt-6 w-full bg-gradient-to-r from-red-600 to-pink-600 rounded-xl text-white font-semibold transition-all duration-300 hover:from-red-700 hover:to-pink-700 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2"
      @click="authStore.logout(),router.push('/login/adminLogin')" >
        <i class="ri-logout-box-r-line" ></i>
        Log Out
    </button>


      <div class="flex flex-col gap-2 overflow-hidden mt-4"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSmsStore } from '@/pages/software_management/stores/smsStore'
import { useAuthStore } from '@/stores/AuthStore'
import api from '@/config/api'

const authStore = useAuthStore()
const props = defineProps({
  activeTab: {
    type: String,
    default: 'All'
  }
})
const emit = defineEmits(['changeTab'])

const store = useSmsStore()
const router = useRouter()
const dropdown = ref('')
const subDropdown = ref('')
const currentAccordions = ref('')
const openSection = currentAccordions
// const openSection = ref('')

function toggleAccordion(name, hasdb) {
  if (hasdb) emit('changeTab', name)

  openSection.value = openSection.value === name ? '' : name
  dropdown.value = ''
}

function toggleNested(key) {
  dropdown.value = dropdown.value === key ? '' : key
}
function toggleSubNested(key) {
  subDropdown.value = subDropdown.value === key ? '' : key
}

// Data for new sections
const customers = ref([])
const isSidebarLoading = ref(false)

// Fetch customer data
const fetchCompanyNames = async (teamId) => {
  if (!teamId) return

  isSidebarLoading.value = true

  try {
    const { data } = await api().get(
      `/success-teams/${teamId}`
    )
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
  () => authStore.role,
  (role) => {
    // Adjust this to match your software management role
    if (role !== 'software_management_system_director' ) return

    const teamId = authStore.team_id

    if (!teamId) {
      console.warn('Team ID missing for software manager')
      customers.value = []
      return
    }

    fetchCompanyNames(teamId)
  },
  { immediate: true }
)

// Re-fetch companies when team_id changes
watch(
  () => authStore.team_id,
  (newTeamId, oldTeamId) => {
    if (!newTeamId || newTeamId === oldTeamId) return
    fetchCompanyNames(newTeamId)
  },
  { immediate: true }
)

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

    customerSuccessTeams.value = res.data.data.data.map(team => {
      const name = team.name || 'Unnamed Team'
      const id = team.id

      return {
        text: name,
        icon: 'ri-team-line',
        to: `/software_management/viewTeams/${slugify(name)}/${id}`
      }
    })
  } catch (error) {
    console.error('Customer Success Teams API failed', error)
  }
}

onMounted(() => {
  getCustomerSuccessTeams()
})
const menus = computed(() => {
  const role = authStore.role

  return [
 {
    id: 'Industry',
    title: 'Industry',
    icon: 'ri-building-4-line',
    hasdb: false,
    iconColor: 'orange',
    groups: [
      {
        key: 'IndustryCreation',
        title: 'Industry Creation',
        icon: 'ri-add-circle-line',
        links: [
          { to: '/software_management/industry/create', icon: 'ri-add-circle-line', text: 'Create' },
          { to: '/software_management/industry/approve', icon: 'ri-list-check', text: 'Approve' },

        ]
      },
      {
        key: 'IndustryAssign',
        title: 'Industry Assign',
        icon: 'ri-add-circle-line',
        links: [

          { to: '/software_management/industry/assign_solution', icon: 'ri-list-check', text: 'Assign Solution' },
          { to: '/software_management/industry/assign_software', icon: 'ri-list-check', text: 'Assign Software' }
        ]
      },
      {
        key: 'IndustryListing',
        title: 'Industry Listing',
        icon: 'ri-list-check',
        links: []
      }
    ]
  },
  {
    id: 'Solution',
    title: 'Solution',
    icon: 'ri-lightbulb-line',
    hasdb: false,
    iconColor: 'pink',
    groups: [
      {
        key: 'SolutionCreation',
        title: 'Solution Creation',
        icon: 'ri-add-circle-line',
        links: [
          { to: '/software_management/solution/create', icon: 'ri-add-circle-line', text: 'Create' },
          { to: '/software_management/solution/approve', icon: 'ri-list-check', text: 'Approve' },

        ]
      },
            {
        key: 'SolutionAssign',
        title: 'Solution Assign',
        icon: 'ri-add-circle-line',
        links: [

          { to: '/software_management/solution/assign_industry', icon: 'ri-list-check', text: 'Assign Industry' },
          { to: '/software_management/solution/assign_software', icon: 'ri-list-check', text: 'Assign Software' }
        ]
      },
      {
        key: 'SolutionListing',
        title: 'Solution Listing',
        icon: 'ri-list-check',
        links: []
      }
    ]
  },
  {
    id: 'Software',
    title: 'Software',
    icon: 'ri-apps-line',
    hasdb: false,
    iconColor: 'blue',
    groups: [
      {
        key: 'SoftwareCreation',
        title: 'Software Creation',
        icon: 'ri-add-circle-line',
        links: [
          { to: '/software_management/software/create', icon: 'ri-add-circle-line', text: 'Create' },
          { to: '/software_management/software/approve', icon: 'ri-list-check', text: 'Approve' },

        ]
      },
      {
        key: 'SoftwareSkill',
        title: 'Software Skill',
        icon: 'ri-add-circle-line',
        links: [
          { to: '/software_management/software/skill/create', icon: 'ri-add-circle-line', text: 'Create Skill' },
          { to: '/software_management/software/skill/pending', icon: 'ri-list-check', text: 'Skill List' },

        ]
      },
      {
        key: 'SoftwareAssign',
        title: 'Software Assign',
        icon: 'ri-add-circle-line',
        links: [

          { to: '/software_management/software/assign_industry', icon: 'ri-add-circle-line', text: 'Assign Industry' },
          { to: '/software_management/software/assign_solution', icon: 'ri-list-check', text: 'Assign Solution' }
        ]
      },
      {
        key: 'SoftwareListing',
        title: 'Software Listing',
        icon: 'ri-list-check',
        links: []
      }
    ]
  },
  {
    id: 'CustomerSuccessTeams',
    title: 'Customer Success Teams',
    icon: 'ri-team-line',
    hasdb: false,
    iconColor: 'emerald',
    links: customerSuccessTeams.value
  },
    {
    key: 'employees',
    title: 'Employees Management',
    icon: 'ri-user-line',
    iconColor: 'teal',
    // path: '/software_management/employees',
    // dashboard: '/software_management/employees',
    links: [
      { to: '/software_management/employees/assignRole', text: 'Assign Role', icon: 'ri-user-add-line' },
      // { to: '/software_management/employees/allEmployees', text: 'All Employees', icon: 'ri-user-line' },
      { to: '/software_management/employees/allEmployees', text: 'Assigned Employees', icon: 'ri-user-line' },
      { to: '/software_management/employees/unassignedEmployee', text: 'Unassigned Employees', icon: 'ri-user-line' },
    ]
  },
  {
    id:'Timecards',
    title:'Timecards',
    icon:'ri-timer-line',
      roles: ['software_management_system_executive'],
  // roles:['software_management_system_executive'],
    hasdb:false,
    iconColor:'red',
    links:[
      {to:'/software_management/timecard',text:'My Timecards',icon:'ri-timer-line'},
      {to:'/software_management/timecard/myMonthly',text:'Monthly Timecards',icon:'ri-timer-line'},
    ]
  },
].filter(menu => {
    if (!menu.roles) return true
    return menu.roles.includes(role)
  })
})




const getIndustries = async () => {
  try {
    const response = await api().get('/industries')
    const industries = response.data.data.map(ind => ({
      to: `/software_management/industry/${ind.id}`,
      text: ind.name,
      icon: 'ri-building-4-line'
    }))
    const industryMenu = menus.value.find(menu => menu.id === 'Industry')
    if (industryMenu) {
      const listingGroup = industryMenu.groups.find(g => g.key === 'IndustryListing')
      if (listingGroup) listingGroup.links = industries
    }
  } catch (error) {
    console.error('Error fetching industries:', error)
  }
}

const getSolutions = async () => {
  try {
    const response = await api().get('/solutions')
    const solutions = response.data.data.map(sol => ({
      to: `/software_management/solution/${sol.id}`,
      text: sol.name,
      icon: 'ri-lightbulb-line'
    }))
    const solutionMenu = menus.value.find(menu => menu.id === 'Solution')
    if (solutionMenu) {
      const listingGroup = solutionMenu.groups.find(g => g.key === 'SolutionListing')
      if (listingGroup) listingGroup.links = solutions
    }
  } catch (error) {
    console.error('Error fetching solutions:', error)
  }
}

const getSoftwares = async () => {
  try {
    const response = await api().get('/softwares')
    const softwares = response.data.data.map(sw => ({
      to: `/software_management/software/${sw.id}`,
      text: sw.name,
      icon: 'ri-macbook-line'
    }))
    const softwareMenu = menus.value.find(menu => menu.id === 'Software')
    if (softwareMenu) {
      const listingGroup = softwareMenu.groups.find(g => g.key === 'SoftwareListing')
      if (listingGroup) listingGroup.links = softwares
    }
  } catch (error) {
    console.error('Error fetching softwares:', error)
  }
}


onMounted(() => {
  getIndustries()
  getSolutions()
  getSoftwares()
})
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
