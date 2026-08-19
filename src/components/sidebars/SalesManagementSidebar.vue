<template>
  <div class="h-full w-80 bg-sky-100 text-gray-800 overflow-y-auto border-r border-gray-200">
    <!-- Header: User Info -->
    <div class="p-6 mt-2 bg-sky-100 border-b-4 border-gray-200 rounded-b-lg">
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center border">
          <i class="ri-user-3-line text-2xl text-gray-600"></i>
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="text-base font-semibold truncate">
            {{ authStore?.user?.name || 'Sales' }}
          </h3>
          <p
            class="text-xs border border-slate-300 rounded-lg w-full px-1 py-0.5 capitalize text-gray-500 mt-1"
          >
            {{
              authStore?.role == 'sales-director'
                ? 'Director of Sales'
                : authStore?.role == 'vp-sales'
                ? 'VP of Sales'
                : authStore?.role == 'sales-executive' || authStore.role === 'sales-executive'
                ? 'Sales Executive'
                : authStore?.role == 'manager-sales'
                ? 'Manager of Sales'
                : authStore?.role == 'director-cs'
                ? 'Director of Customer Support'
                : authStore?.role == 'vp-cs'
                ? 'VP of Customer Support'
                : authStore?.role == 'manager-cs'
                ? 'Manager of Customer Support'
                : authStore?.role == 'executive-cs'
                ? 'Customer Support Executive'
                : authStore?.role
            }}
          </p>
        </div>
      </div>
    </div>
    <!-- {{ companyNames }} -->

    <nav class="p-4 space-y-6">
      <!-- Main Navigation -->
      <div v-if="route.name === 'sales_management'" class="space-y-2">
        <h4 class="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider"></h4>

        <router-link
          v-for="item in mainNav"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 px-4 py-2.5 rounded-md border text-sm transition"
          :class="
            route.path === item.to
              ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium'
              : 'bg-white border-transparent hover:bg-gray-100 text-gray-700'
          "
        >
          <div
            class="w-8 h-8 rounded-md flex items-center justify-center border"
            :class="
              route.path === item.to
                ? 'bg-blue-100 border-blue-300 text-blue-600'
                : 'bg-gray-100 border-gray-300 text-gray-500'
            "
          >
            <i :class="item.icon"></i>
          </div>
          <span>{{ item.label }}</span>
        </router-link>
      </div>

      <!-- Collapsible Sections -->
      <template v-for="section in collapsibleSections" :key="section.key">
        <div v-if="isSectionActive(section)" class="space-y-3">
          <h4 class="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {{ section.key }}
          </h4>

          <!-- All -->
          <router-link
            :to="section.allPath"
            class="flex items-center gap-3 px-4 py-2.5 rounded-md border text-sm transition"
            :class="
              route.path === section.allPath
                ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium'
                : 'bg-white border-gray-200 hover:bg-gray-100'
            "
          >
            <div class="w-7 h-7 rounded-md bg-gray-100 border flex items-center justify-center">
              <i class="ri-list-check-2 text-gray-600"></i>
            </div>
            <span> All {{ section.key.charAt(0).toUpperCase() + section.key.slice(1) }} </span>
          </router-link>

          <!-- Groups -->
          <template v-for="(item, idx) in section.subItems" :key="idx">
            <!-- Group Header -->
            <div
              v-if="item.group && item.collapsible"
              @click="toggleGroup(section.key, item.group)"
              class="flex items-center justify-between px-4 py-2 rounded-md border bg-gray-50 hover:bg-gray-100 cursor-pointer"
            >
              <div class="flex items-center gap-3 text-sm font-medium text-gray-800">
                <div class="w-7 h-7 rounded-md bg-gray-100 border flex items-center justify-center">
                  <i :class="getGroupIcon(item.group)" class="text-gray-500"></i>
                </div>
                <span>{{ item.group }}</span>
              </div>

              <i
                :class="
                  isGroupOpen(section.key, item.group)
                    ? 'ri-arrow-up-s-line'
                    : 'ri-arrow-down-s-line'
                "
                class="text-gray-400"
              ></i>
            </div>

            <!-- Group Items -->
            <div
              v-if="item.group && isGroupOpen(section.key, item.group)"
              class="ml-4 mt-1 space-y-1"
            >
              <router-link
                v-for="subItem in getGroupItems(section.subItems, idx)"
                :key="subItem.to"
                :to="subItem.to"
                class="flex items-center gap-3 px-4 py-2 rounded-md border text-sm transition"
                :class="
                  route.path.includes(subItem.to)
                    ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium'
                    : 'bg-white border-transparent hover:bg-gray-100 text-gray-700'
                "
              >
                <div class="w-6 h-6 rounded-md bg-gray-100 border flex items-center justify-center">
                  <i :class="subItem.icon" class="text-gray-500"></i>
                </div>
                <span>{{ subItem.label }}</span>
              </router-link>
            </div>
          </template>
        </div>
      </template>

      <!-- Simple Sections -->
      <template v-for="section in simpleSections" :key="section.key">
        <div v-if="isSectionActive(section)" class="space-y-3">
          <h4 class="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {{ section.key }}
          </h4>

          <!-- <router-link
            :to="section.dashboard"
            class="flex items-center gap-3 px-4 py-2.5 rounded-md border text-sm transition"
            :class="route.path === section.dashboard
              ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium'
              : 'bg-white border-gray-200 hover:bg-gray-100'"
          >
            <div class="w-8 h-8 rounded-md bg-gray-100 border flex items-center justify-center">
              <i class="ri-dashboard-3-line text-gray-500"></i>
            </div>
            <span>Dashboard</span>
          </router-link> -->

          <router-link
            v-for="item in section.subItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 pl-10 pr-4 py-2 rounded-md border text-sm transition"
            :class="
              route.path === item.to
                ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium'
                : 'bg-white border-transparent hover:bg-gray-100 text-gray-700'
            "
          >
            <i :class="item.icon" class="text-gray-500"></i>
            <span>{{ item.label }}</span>
          </router-link>
        </div>
      </template>

      <!-- Contracts Section -->
      <div v-if="isSectionActive(contractsSection)" class="space-y-3">
        <h4 class="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Contracts</h4>

        <router-link
          to="/sales_management/contracts"
          class="flex items-center gap-3 px-4 py-2.5 rounded-md border text-sm transition"
          :class="
            route.path === '/sales_management/contracts'
              ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium'
              : 'bg-white border-gray-200 hover:bg-gray-100'
          "
        >
          <i class="ri-dashboard-3-line text-gray-500"></i>
          <span>Dashboard</span>
        </router-link>

        <router-link
          to="/sales_management/contracts/all"
          class="flex items-center gap-3 px-4 py-2 rounded-md border text-sm transition"
          :class="
            route.path === '/sales_management/contracts/all'
              ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium'
              : 'bg-white border-transparent hover:bg-gray-100 text-gray-700'
          "
        >
          <i class="ri-list-check-2 text-gray-500"></i>
          <span>My All Contracts</span>
        </router-link>

        <router-link
          v-for="item in contractTimeLinks"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 px-4 py-2 rounded-md border text-sm transition"
          :class="
            route.path === item.to
              ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium'
              : 'bg-white border-transparent hover:bg-gray-100 text-gray-700'
          "
        >
          <i class="ri-time-line text-gray-500"></i>
          <span>{{ item.label }}</span>
        </router-link>

        <!-- Industry Dropdown -->
        <div>
          <button
            @click="toggleDropdown"
            class="flex items-center justify-between w-full px-4 py-2.5 rounded-md border bg-white hover:bg-gray-100 text-sm font-medium"
          >
            <span>My Contract By Industry</span>
            <i
              :class="isDropdownOpen ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'"
              class="text-gray-400"
            ></i>
          </button>

          <div v-if="isDropdownOpen" class="mt-2 ml-4 space-y-1 border-l border-gray-300 pl-4">
            <router-link
              v-for="industry in industries"
              :key="industry.route"
              :to="industry.route"
              class="block px-3 py-1.5 rounded-md text-sm transition"
              :class="
                route.path === industry.route
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'hover:bg-gray-100 text-gray-700'
              "
            >
              {{ industry.text }}
            </router-link>
          </div>
        </div>
      </div>

      <!-- Logout -->
      <div
        @click="logoutUser"
        class="flex items-center gap-3 px-4 py-3 mt-6 cursor-pointer rounded-md border bg-red-50 text-red-600 hover:bg-red-100 transition"
      >
        <i class="ri-logout-box-r-line text-lg"></i>
        <span class="font-medium">Logout</span>
      </div>
    </nav>
  </div>
</template>

<script setup>
import api from '@/config/api'
import { useAuthStore } from '@/stores/AuthStore'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const isDropdownOpen = ref(false)

const bySolutionIcon = 'ri-layout-grid-line'
const mscDealsIcon = 'ri-briefcase-line'
const htssDealsIcon = 'ri-building-line'

// === Collapsible State ===
const openGroups = ref({
  leads: new Set(['By Time']),
  accounts: new Set(['By Time']),
  customer: new Set(['By Time']),
  deals: new Set(['By Time - Closing Date']),
  contact: new Set() // ✅ ADD THIS
})

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const toggleGroup = (sectionKey, groupName) => {
  const section = openGroups.value[sectionKey]
  section.has(groupName) ? section.delete(groupName) : section.add(groupName)
}

const isGroupOpen = (sectionKey, groupName) => {
  return openGroups.value[sectionKey]?.has(groupName) || false
}

const getGroupItems = (items, startIdx) => {
  const header = items[startIdx]
  const groupName = header.group

  const explicit = items.filter((item) => !item.collapsible && item.group === groupName && item.to)

  // ✅ if explicit grouping exists, use it
  if (explicit.length) return explicit

  // 🔁 fallback to legacy behavior
  const legacy = []
  for (let i = startIdx + 1; i < items.length; i++) {
    if (items[i].collapsible) break
    if (items[i].to) legacy.push(items[i])
  }

  return legacy
}

// === Group Icons ===
const getGroupIcon = (group) => {
  const map = {
    'By Time': 'ri-time-line',
    'By Time - Closing Date': 'ri-calendar-event-line',
    'By Time - Call Schedule': 'ri-phone-line',
    'By Lead To Prospect to Potential': 'ri-user-search-line',
    'By Lead Priority': 'ri-star-line',
    'By Deal Stage': 'ri-flow-chart'
  }
  return map[group] || 'ri-folder-line'
}

const isLoading = ref(false)
const parentCompanyNames = ref([])

const fetchParentCompanyNames = async () => {
  try {
    isLoading.value = true

    const { data } = await api().get('/crm/modules/2/records?fields=parent_company')

    const uniqueMap = new Map()

    data.data.forEach((record) => {
      record.values.forEach((v) => {
        if (v.field?.name === 'parent_company' && v.value) {
          const raw = v.value
          const key = raw

          // preserve original casing (first occurrence)
          if (!uniqueMap.has(key)) {
            uniqueMap.set(key, raw.trim())
          }
        }
      })
    })

    parentCompanyNames.value = Array.from(uniqueMap.values())
  } catch (err) {
    console.error('Error fetching parent companies:', err)
  } finally {
    isLoading.value = false
  }
}

const isLoadingCompany = ref(false)
const companyNames = ref([])

const fetchCompanyNames = async () => {
  try {
    isLoadingCompany.value = true

    const { data } = await api().get('/crm/modules/2/records?fields=company_name')

    const result = []

    data.data.forEach((record) => {
      record.values.forEach((v) => {
        if (v.field?.name === 'company_name' && v.value) {
          result.push(v.value)
        }
      })
    })

    companyNames.value = result
  } catch (err) {
    console.error('Error fetching company names:', err)
  } finally {
    isLoadingCompany.value = false
  }
}

// === Main Nav ===
const mainNav = [
  // { to: '/sales_management', label: 'Dashboard', icon: 'ri-dashboard-3-line' },
  { to: '/sales_management/leads/allLeads', label: 'Leads', icon: 'ri-user-search-line' },
  { to: '/sales_management/accounts/allAccounts', label: 'Accounts', icon: 'ri-building-line' },
  { to: '/sales_management/contact/allContacts', label: 'Contacts', icon: 'ri-contacts-line' },
  { to: '/sales_management/deals/allDeals', label: 'Deals', icon: 'ri-shake-hands-line' },
  { to: '/sales_management/proposal/allProposal', label: 'Proposal', icon: 'ri-file-text-line' },
  { to: '/sales_management/contract', label: 'Contracts', icon: 'ri-contract-line' },
  { to: '/sales_management/customer/allCustomers', label: 'Customers', icon: 'ri-building-line' },
  // { to: '/sales_management/projects', label: 'Projects', icon: 'ri-folder-open-line' },
  { to: '/sales_management/timecard', label: 'Timecard', icon: 'ri-folder-open-line' },
  {
    to: '/sales_management/employees/createEmployee',
    label: 'Employees',
    icon: 'ri-folder-open-line'
  }
]

// === Reusable: Leads & Accounts & Customers ===
const leadAccountSubItems = [
  { group: 'Call Schedule - By Time', collapsible: true },
  { to: '/all', label: 'All', icon: 'ri-calendar-todo-line' },
  { to: '/today', label: 'Today', icon: 'ri-calendar-todo-line' },
  { to: '/thisWeek', label: 'This Week', icon: 'ri-calendar-schedule-line' },
  { to: '/nextWeek', label: 'Next Week', icon: 'ri-calendar-schedule-line' },
  { to: '/lastWeek', label: 'Last Week', icon: 'ri-calendar-schedule-line' },
  { to: '/thisMonth', label: 'This Month', icon: 'ri-calendar-todo-line' },
  { to: '/nextMonth', label: 'Next Month', icon: 'ri-calendar-todo-line' },
  { to: '/lastMonth', label: 'Last Month', icon: 'ri-calendar-todo-line' },

  { group: 'By Lead To Prospect to Potential', collapsible: true },
  { to: '/initialLead', label: 'All', icon: 'ri-flag-line' },
  { to: '/initialLead', label: 'Initial Lead', icon: 'ri-flag-line' },
  { to: '/prospect', label: 'Prospect', icon: 'ri-user-search-line' },
  { to: '/potentialNominee', label: 'Potential Nominee', icon: 'ri-star-line' },
  { to: '/potential', label: 'Potential', icon: 'ri-user-search-line' },
  { to: '/highlyPotential', label: 'Highly Potential', icon: 'ri-fire-line' },

  { group: 'By Lead Priority', collapsible: true },
  { to: '/bronze', label: 'All', icon: 'ri-medal-line', badge: 'bronze' },
  { to: '/bronze', label: 'Bronze', icon: 'ri-medal-line', badge: 'bronze' },
  { to: '/silver', label: 'Silver', icon: 'ri-medal-line', badge: 'silver' },
  { to: '/gold', label: 'Gold', icon: 'ri-medal-line', badge: 'gold' },
  { to: '/diamond', label: 'Diamond', icon: 'ri-medal-line', badge: 'diamond' },
  { to: '/platinum', label: 'Platinum', icon: 'ri-medal-line', badge: 'platinum' }
]

// === Deals SubItems ===
const dealsSubItems = computed(() => {
  const items = []

  // By Parent Company
  items.push({ group: 'By Parent Company', collapsible: true })
  if (parentCompanyNames.value?.length) {
    parentCompanyNames.value.forEach((name) => {
      items.push({
        label: name,
        icon: bySolutionIcon,
        to: `/deals/by_parent_company/${name}`
      })
    })
  }

  // By Company
  items.push({ group: 'By Company', collapsible: true })
  if (companyNames.value?.length) {
    companyNames.value.forEach((name) => {
      items.push({
        label: name,
        icon: bySolutionIcon,
        to: `/deals/by_company/${name}`
      })
    })
  }

  // By Current Working Status
  items.push(
    { group: 'By Current Working Status', collapsible: true },
    {
      to: '/deals/current_working_status/Currently Working - Platinum',
      label: 'Currently Working - Platinum',
      icon: htssDealsIcon
    },
    {
      to: '/deals/current_working_status/Currently Working - Diamond',
      label: 'Currently Working - Diamond',
      icon: htssDealsIcon
    },
    {
      to: '/deals/current_working_status/Currently Working - Gold',
      label: 'Currently Working - Gold',
      icon: htssDealsIcon
    },
    {
      to: '/deals/current_working_status/Currently Working - Silver',
      label: 'Currently Working - Silver',
      icon: htssDealsIcon
    },
    {
      to: '/deals/current_working_status/Not Currently Working',
      label: 'Not Currently Working',
      icon: htssDealsIcon
    }
  )

  // Closing Date - By Time
  items.push(
    { group: 'Closing Date - By Time', collapsible: true },
    { to: '/deals/closing/all', label: 'All', icon: 'ri-calendar-todo-line' },
    { to: '/deals/closing/today', label: 'Today', icon: 'ri-calendar-todo-line' },
    { to: '/deals/closing/thisWeek', label: 'This Week', icon: 'ri-calendar-schedule-line' },
    { to: '/deals/closing/nextWeek', label: 'Next Week', icon: 'ri-calendar-schedule-line' },
    { to: '/deals/closing/lastWeek', label: 'Last Week', icon: 'ri-calendar-schedule-line' },
    { to: '/deals/closing/thisMonth', label: 'This Month', icon: 'ri-calendar-todo-line' },
    { to: '/deals/closing/nextMonth', label: 'Next Month', icon: 'ri-calendar-todo-line' },
    { to: '/deals/closing/lastMonth', label: 'Last Month', icon: 'ri-calendar-todo-line' },
    { to: '/deals/closing/lastQuarter', label: 'Last Quarter', icon: 'ri-calendar-todo-line' },
    { to: '/deals/closing/thisQuarter', label: 'This Quarter', icon: 'ri-calendar-todo-line' },
    { to: '/deals/closing/nextQuarter', label: 'Next Quarter', icon: 'ri-calendar-todo-line' },
    { to: '/deals/closing/lastYear', label: 'Last Year', icon: 'ri-calendar-todo-line' },
    { to: '/deals/closing/thisYear', label: 'This Year', icon: 'ri-calendar-todo-line' },
    { to: '/deals/closing/nextYear', label: 'Next Year', icon: 'ri-calendar-todo-line' }
  )

  // Call Schedule - By Time
  items.push(
    { group: 'Call Schedule - By Time', collapsible: true },
    { to: '/deals/call/all', label: 'All', icon: 'ri-calendar-todo-line' },
    { to: '/deals/call/today', label: 'Today', icon: 'ri-calendar-todo-line' },
    { to: '/deals/call/thisWeek', label: 'This Week', icon: 'ri-calendar-schedule-line' },
    { to: '/deals/call/nextWeek', label: 'Next Week', icon: 'ri-calendar-schedule-line' },
    { to: '/deals/call/lastWeek', label: 'Last Week', icon: 'ri-calendar-schedule-line' },
    { to: '/deals/call/thisMonth', label: 'This Month', icon: 'ri-calendar-todo-line' },
    { to: '/deals/call/nextMonth', label: 'Next Month', icon: 'ri-calendar-todo-line' },
    { to: '/deals/call/lastMonth', label: 'Last Month', icon: 'ri-calendar-todo-line' },
    { to: '/deals/call/lastQuarter', label: 'Last Quarter', icon: 'ri-calendar-todo-line' },
    { to: '/deals/call/thisQuarter', label: 'This Quarter', icon: 'ri-calendar-todo-line' },
    { to: '/deals/call/nextQuarter', label: 'Next Quarter', icon: 'ri-calendar-todo-line' },
    { to: '/deals/call/lastYear', label: 'Last Year', icon: 'ri-calendar-todo-line' },
    { to: '/deals/call/thisYear', label: 'This Year', icon: 'ri-calendar-todo-line' },
    { to: '/deals/call/nextYear', label: 'Next Year', icon: 'ri-calendar-todo-line' }
  )

  // By Deal Stage
  items.push(
    { group: 'By Deal Stage', collapsible: true },
    { to: '/deals/stage/all', label: 'All', icon: 'ri-checkbox-circle-line' },
    { to: '/deals/stage/Qualification', label: 'Qualification', icon: 'ri-checkbox-circle-line' },
    { to: '/deals/stage/Need Analysis', label: 'Need Analysis', icon: 'ri-bar-chart-line' },
    {
      to: '/deals/stage/Identify Decision Maker',
      label: 'Identify Decision Maker',
      icon: 'ri-user-search-line'
    },
    {
      to: '/deals/stage/Proposal Submitted',
      label: 'Proposal Submitted',
      icon: 'ri-file-text-line'
    },
    { to: '/deals/stage/Negotiation', label: 'Negotiation/Review', icon: 'ri-discuss-line' },
    { to: '/deals/stage/Closed Won', label: 'Closed Won', icon: 'ri-thumb-up-line' },
    { to: '/deals/stage/Closed Lost', label: 'Closed Lost', icon: 'ri-thumb-down-line' }
  )

  // By Solution
  items.push(
    { group: 'By Solution', collapsible: true },
    {
      to: '/deals/by_solution/A. Structure Analysis Service',
      label: 'Structure Analysis Service',
      icon: bySolutionIcon
    },
    {
      to: '/deals/by_solution/B. System Dynamics Analysis Service',
      label: 'System Dynamics Analysis',
      icon: bySolutionIcon
    },
    {
      to: '/deals/by_solution/C. Acoustics Analysis Service',
      label: 'Acoustics Analysis Service',
      icon: bySolutionIcon
    },
    {
      to: '/deals/by_solution/D. Fluids Analysis Service',
      label: 'Fluids Analysis Service',
      icon: bySolutionIcon
    },
    {
      to: '/deals/by_solution/E. Autonomous Analysis Service',
      label: 'Autonomous Analysis Service',
      icon: bySolutionIcon
    },
    { to: '/deals/by_solution/F. VM&C Analysis Service', label: 'VM&C', icon: bySolutionIcon },
    { to: '/deals/by_solution/G. ICME Analysis Service', label: 'ICME', icon: bySolutionIcon }
  )

  // By Software
  items.push(
    { group: 'By Software', collapsible: true },

    {
      to: '/deals/by_software/A0. Structural Analysis -MSC One',
      label: 'Structural Analysis -MSC One',
      icon: htssDealsIcon
    },
    {
      to: '/deals/by_software/A1. Structural Analysis -Adams',
      label: 'Structural Analysis -Adams',
      icon: htssDealsIcon
    },
    {
      to: '/deals/by_software/A2. Structural Analysis -CAE Fatigue',
      label: 'Structural Analysis -CAE Fatigue',
      icon: htssDealsIcon
    },
    {
      to: '/deals/by_software/A3. Structural Analysis -MSC Apex',
      label: 'Structural Analysis -MSC Apex',
      icon: htssDealsIcon
    },
    {
      to: '/deals/by_software/A4. Structural Analysis -Marc',
      label: 'Structural Analysis -Marc',
      icon: htssDealsIcon
    },
    {
      to: '/deals/by_software/A5. Structural Analysis -MSC Nastran',
      label: 'Structural Analysis -MSC Nastran',
      icon: htssDealsIcon
    },
    {
      to: '/deals/by_software/A6. Structural Analysis -MSC Patran',
      label: 'Structural Analysis -MSC Patran',
      icon: htssDealsIcon
    },
    {
      to: '/deals/by_software/A7. Structural Analysis -Dytran',
      label: 'Structural Analysis -Dytran',
      icon: htssDealsIcon
    },
    {
      to: '/deals/by_software/A8. Structural Analysis -Marc (Nonlinear)',
      label: 'Structural Analysis -Marc',
      icon: htssDealsIcon
    },
    {
      to: '/deals/by_software/A9. Structural Analysis -Fatigue',
      label: 'Structural Analysis -Fatigue',
      icon: htssDealsIcon
    },
    {
      to: '/deals/by_software/A10. Structural Analysis -Sim Manager',
      label: 'Structural Analysis -Sim Manager',
      icon: htssDealsIcon
    },
    {
      to: '/deals/by_software/A11. Structural Analysis -Sinda',
      label: 'Structural Analysis -Sinda',
      icon: htssDealsIcon
    },

    {
      to: '/deals/by_software/B1. System Dynamics -Romax',
      label: 'System Dynamics -Romax',
      icon: htssDealsIcon
    },
    {
      to: '/deals/by_software/B2. System Dynamics -Easy5',
      label: 'System Dynamics -Easy5',
      icon: htssDealsIcon
    },
    {
      to: '/deals/by_software/B3. System Dynamics -Elements',
      label: 'System Dynamics -Elements',
      icon: htssDealsIcon
    },

    {
      to: '/deals/by_software/C1. Acoustics -Actran',
      label: 'Acoustics -Actran',
      icon: htssDealsIcon
    },

    {
      to: '/deals/by_software/D1. Fluids -MSC Cradle CFD',
      label: 'Fluids -MSC Cradle CFD',
      icon: htssDealsIcon
    },
    {
      to: '/deals/by_software/D2. Fluids -MSCCoSim',
      label: 'Fluids -MSCCoSim',
      icon: htssDealsIcon
    },

    {
      to: '/deals/by_software/E1. Autonomous -VTDScale',
      label: 'Autonomous -VTDScale',
      icon: htssDealsIcon
    },
    {
      to: '/deals/by_software/E2. Autonomous -VTD',
      label: 'Autonomous -VTD',
      icon: htssDealsIcon
    },
    {
      to: '/deals/by_software/E3. Autonomous -Cloud',
      label: 'Autonomous -Cloud',
      icon: htssDealsIcon
    },

    {
      to: '/deals/by_software/F1. VM&C -ODYSSEE',
      label: 'VM&C -ODYSSEE',
      icon: htssDealsIcon
    },
    {
      to: '/deals/by_software/F2. VM&C -Simufact',
      label: 'VM&C -Simufact',
      icon: htssDealsIcon
    },
    {
      to: '/deals/by_software/F3. VM&C -FTI FormingSuite',
      label: 'VM&C -FTI FormingSuite',
      icon: htssDealsIcon
    },

    {
      to: '/deals/by_software/G1. ICME (Materials) -MaterialCenter',
      label: 'ICME (Materials) -MaterialCenter',
      icon: htssDealsIcon
    },
    {
      to: '/deals/by_software/G2. ICME (Materials) -Digimat',
      label: 'ICME (Materials) -Digimat',
      icon: htssDealsIcon
    },
    {
      to: '/deals/by_software/G3. ICME (Materials) -MaterialCenter Database',
      label: 'ICME (Materials) -MaterialCenter Database',
      icon: htssDealsIcon
    }
  )

  items.push(
    { group: 'MSC Deals', collapsible: true },
    { to: '/deals/msc_deals_all/all', label: 'All', icon: mscDealsIcon },
    {
      to: '/deals/msc_deals/A. Structure Analysis Service',
      label: 'Structure Analysis Service',
      icon: mscDealsIcon
    },
    {
      to: '/deals/msc_deals/D. Fluids Analysis Service',
      label: 'Fluids Analysis Service',
      icon: mscDealsIcon
    },
    {
      to: '/deals/msc_deals/B. System Dynamics Analysis Service',
      label: 'System Dynamics Analysis',
      icon: mscDealsIcon
    },
    { to: '/deals/msc_deals/G. ICME Analysis Service', label: 'ICME', icon: mscDealsIcon },
    { to: '/deals/msc_deals/F. VM&C Analysis Service', label: 'VM&C', icon: mscDealsIcon },
    {
      to: '/deals/msc_deals/E. Autonomous Analysis Service',
      label: 'Autonomous Analysis Service',
      icon: mscDealsIcon
    },
    {
      to: '/deals/msc_deals/C. Acoustics Analysis Service',
      label: 'Acoustics Analysis Service',
      icon: mscDealsIcon
    }
  )

  items.push(
    { group: 'HTSS Deals', collapsible: true },
    { to: '/deals/htss_deals_all/all', label: 'All', icon: mscDealsIcon },
    {
      to: '/deals/htss_deals/A. Structure Analysis Service',
      label: 'Structure Analysis Service',
      icon: mscDealsIcon
    },
    {
      to: '/deals/htss_deals/D. Fluids Analysis Service',
      label: 'Fluids Analysis Service',
      icon: htssDealsIcon
    },
    {
      to: '/deals/htss_deals/B. System Dynamics Analysis Service',
      label: 'System Dynamics Analysis',
      icon: htssDealsIcon
    },
    { to: '/deals/htss_deals/G. ICME Analysis Service', label: 'ICME', icon: htssDealsIcon },
    { to: '/deals/htss_deals/F. VM&C Analysis Service', label: 'VM&C', icon: htssDealsIcon },
    {
      to: '/deals/htss_deals/E. Autonomous Analysis Service',
      label: 'Autonomous Analysis Service',
      icon: htssDealsIcon
    },
    {
      to: '/deals/htss_deals/C. Acoustics Analysis Service',
      label: 'Acoustics Analysis Service',
      icon: htssDealsIcon
    }
  )

  return items
})

// === Contact SubItems ===
const contactSubitem = computed(() => {
  const items = []

  // By Call Importance
  items.push(
    { group: 'By Call Importance', collapsible: true },
    {
      to: '/contact/by_call_importance/1. On Fire -One Business Day',
      label: 'On Fire -One Business Day',
      icon: htssDealsIcon
    },
    {
      to: '/contact/by_call_importance/2. On Super Critical -Two Business Day',
      label: 'On Super Critical -Two Business Day',
      icon: htssDealsIcon
    },
    {
      to: '/contact/by_call_importance/3. On Critical -Three Business Day',
      label: 'On Critical -Three Business Day',
      icon: htssDealsIcon
    },
    {
      to: '/contact/by_call_importance/4. On Urgent -Five Business Day',
      label: 'On Urgent -Five Business Day',
      icon: htssDealsIcon
    },
    {
      to: '/contact/by_call_importance/5. On Crucial -Ten Business Day',
      label: 'On Crucial -Ten Business Day',
      icon: htssDealsIcon
    },
    {
      to: '/contact/by_call_importance/6. On Important -Fifteen Business Day',
      label: 'On Important -Fifteen Business Day',
      icon: htssDealsIcon
    },
    {
      to: '/contact/by_call_importance/7. Thirty Business Days',
      label: 'Thirty Business Days',
      icon: htssDealsIcon
    },
    {
      to: '/contact/by_call_importance/8. Forty-Five Business Days',
      label: 'Forty-Five Business Days',
      icon: htssDealsIcon
    }
  )

  //  By Contact Type
  items.push(
    { group: 'By Contact Type', collapsible: true },
    {
      to: '/contact/contact_type/Primary',
      label: 'Primary',
      icon: htssDealsIcon
    },
    {
      to: '/contact/contact_type/Primary and Absolute',
      label: 'Primary and Absolute',
      icon: htssDealsIcon
    },
    { to: '/contact/contact_type/Secondary', label: 'Secondary', icon: htssDealsIcon },
    { to: '/contact/contact_type/Decision Maker', label: 'Decision Maker', icon: htssDealsIcon }
  )

  // By Parent Company
  items.push({ group: 'By Parent Company', collapsible: true })
  if (parentCompanyNames.value?.length) {
    parentCompanyNames.value.forEach((name) => {
      items.push({
        label: name,
        icon: bySolutionIcon,
        to: `/contact/by_parent_company/${name}`
      })
    })
  }

  // By Company
  items.push({ group: 'By Company', collapsible: true })
  if (companyNames.value?.length) {
    companyNames.value.forEach((name) => {
      items.push({
        label: name,
        icon: bySolutionIcon,
        to: `/contact/by_company/${name}`
      })
    })
  }

  //  By Industry
  items.push(
    { group: 'By Industry', collapsible: true },
    {
      to: '/contact/by_industry/Aerospace & Defense',
      label: 'Aerospace & Defense',
      icon: mscDealsIcon
    },
    {
      to: '/contact/by_industry/Agriculture, Forestry & Fishing',
      label: 'Agriculture, Forestry & Fishing',
      icon: htssDealsIcon
    },
    {
      to: '/contact/by_industry/Automotive, Transportation & Mobility',
      label: 'Automotive, Transportation & Mobility',
      icon: htssDealsIcon
    },
    {
      to: '/contact/by_industry/Financial & Business Services',
      label: 'Financial & Business Services',
      icon: htssDealsIcon
    },
    { to: '/contact/by_industry/High Tech', label: 'High Tech', icon: htssDealsIcon },
    { to: '/contact/by_industry/Education Sector', label: 'Education Sector', icon: htssDealsIcon },
    {
      to: '/contact/by_industry/Entertainment, Leisure and Hospitality',
      label: 'Entertainment, Leisure and Hospitality',
      icon: htssDealsIcon
    },
    {
      to: '/contact/by_industry/Healthcare Technology',
      label: 'Healthcare Technology',
      icon: htssDealsIcon
    },
    { to: '/contact/by_industry/Manufacturing', label: 'Manufacturing', icon: htssDealsIcon },
    {
      to: '/contact/by_industry/Local Government Sector',
      label: 'Local Government Sector',
      icon: htssDealsIcon
    },
    {
      to: '/contact/by_industry/General, Merchandise & Grocery',
      label: 'General, Merchandise & Grocery',
      icon: htssDealsIcon
    },
    {
      to: '/contact/by_industry/Information Technology',
      label: 'Information Technology',
      icon: htssDealsIcon
    },
    {
      to: '/contact/by_industry/Energy, Process & Utilities',
      label: 'Energy, Process & Utilities',
      icon: htssDealsIcon
    },
    {
      to: '/contact/by_industry/Architecture, Engineering & Construction',
      label: 'Architecture, Engineering & Construction',
      icon: htssDealsIcon
    },
    {
      to: '/contact/by_industry/Consumer Goods & Packaging',
      label: 'Consumer Goods & Packaging',
      icon: htssDealsIcon
    },
    {
      to: '/contact/by_industry/Floating Structures',
      label: 'Floating Structures',
      icon: htssDealsIcon
    },
    {
      to: '/contact/by_industry/Heavy Machinery Equipment',
      label: 'Heavy Machinery Equipment',
      icon: htssDealsIcon
    },
    {
      to: '/contact/by_industry/Life Science & Medical Device',
      label: 'Life Science & Medical Device',
      icon: htssDealsIcon
    },
    { to: '/contact/by_industry/Service Provider', label: 'Service Provider', icon: htssDealsIcon }
  )

  //  By Solution
  items.push(
    { group: 'By Solution', collapsible: true },
    {
      to: '/contact/by_solution/A. Structure Analysis Service',
      label: 'Structure Analysis Service',
      icon: mscDealsIcon
    },
    {
      to: '/contact/by_solution/B. System Dynamics Analysis Service',
      label: 'System Dynamics Analysis',
      icon: htssDealsIcon
    },
    {
      to: '/contact/by_solution/C. Acoustics Analysis Service',
      label: 'Acoustics Analysis Service',
      icon: htssDealsIcon
    },

    {
      to: '/contact/by_solution/D. Fluids Analysis Service',
      label: 'Fluids Analysis Service',
      icon: htssDealsIcon
    },
    {
      to: '/contact/by_solution/E. Autonomous Analysis Service',
      label: 'Autonomous Analysis Service',
      icon: htssDealsIcon
    },
    { to: '/contact/by_solution/F. VM&C Analysis Service', label: 'VM&C', icon: htssDealsIcon },
    { to: '/contact/by_solution/G. ICME Analysis Service', label: 'ICME', icon: htssDealsIcon }
  )

  return items
})

const collapsibleSections = computed(() => [
  {
    key: 'leads',
    path: '/sales_management/leads',
    allPath: '/sales_management/leads/allLeads',
    subItems: leadAccountSubItems.map((item) => ({
      ...item,
      to: item.to ? `/sales_management/leads${item.to}` : undefined
    }))
  },
  {
    key: 'accounts',
    path: '/sales_management/accounts',
    allPath: '/sales_management/accounts/allAccounts',
    subItems: leadAccountSubItems.map((item) => ({
      ...item,
      to: item.to ? `/sales_management/accounts${item.to}` : undefined
    }))
  },
  {
    key: 'customer',
    path: '/sales_management/customer',
    allPath: '/sales_management/customer/allCustomers',
    subItems: leadAccountSubItems.map((item) => ({
      ...item,
      to: item.to ? `/sales_management/customer${item.to}` : undefined
    }))
  },
  {
    key: 'deals',
    path: '/sales_management/deals',
    allPath: '/sales_management/deals/allDeals',
    subItems: dealsSubItems.value.map((item) => ({
      ...item,
      to: item.to ? `/sales_management${item.to}` : undefined
    }))
  },
  {
    key: 'contact',
    path: '/sales_management/contact',
    allPath: '/sales_management/contact/allContacts',
    subItems: contactSubitem.value.map((item) => ({
      ...item,
      to: item.to ? `/sales_management${item.to}` : undefined
    }))
  }
])

// === Simple Sections ===
const simpleSections = [
  {
    key: 'proposal',
    path: '/sales_management/proposal',
    dashboard: '/sales_management/proposal',
    subItems: [
      { to: '/sales_management/proposal/allProposal', label: 'All', icon: 'ri-list-check-2' },
      {
        to: '/sales_management/proposal/createProposal',
        label: 'Create Proposal',
        icon: 'ri-file-add-line'
      },
      {
        to: '/sales_management/proposal/currentWeek',
        label: 'Current Week',
        icon: 'ri-calendar-week-line'
      },
      {
        to: '/sales_management/proposal/nextMonth',
        label: 'Next Month',
        icon: 'ri-calendar-next-month-line'
      },
      {
        to: '/sales_management/proposal/currentMonth',
        label: 'Current Month',
        icon: 'ri-calendar-month-line'
      },
      {
        to: '/sales_management/proposal/currentQuarter',
        label: 'Current Quarter',
        icon: 'ri-calendar-quarter-line'
      },
      {
        to: '/sales_management/proposal/nextQuarter',
        label: 'Next Quarter',
        icon: 'ri-calendar-future-line'
      },
      {
        to: '/sales_management/proposal/qualificationAll',
        label: 'Qualification All',
        icon: 'ri-checkbox-circle-line'
      }
    ]
  },
  // {
  //   key: 'projects',
  //   path: '/sales_management/projects',
  //   dashboard: '/sales_management/projects',
  //   subItems: [
  //     { to: '/sales_management/projects/currentDeliverable', label: 'Current Projects Deliverable', icon: 'ri-task-line' },
  //     { to: '/sales_management/projects/today', label: 'Today', icon: 'ri-calendar-todo-line' },
  //     { to: '/sales_management/projects/currentWeek', label: 'Current Week', icon: 'ri-calendar-week-line' },
  //     { to: '/sales_management/projects/currentMonth', label: 'Current Month', icon: 'ri-calendar-month-line' },
  //     { to: '/sales_management/projects/currentQuarter', label: 'Current Quarter', icon: 'ri-calendar-quarter-line' },
  //   ],
  // },
  {
    key: 'timecard',
    path: '/sales_management/timecard',
    dashboard: '/sales_management/timecard',
    subItems: [
      { to: '/sales_management/timecard', label: 'My Weekly', icon: 'ri-task-line' },
      // {
      //   to: '/sales_management/timecard/myWeekly',
      //   label: 'My Weekly',
      //   icon: 'ri-calendar-todo-line'
      // },
      {
        to: '/sales_management/timecard/myMonthly',
        label: 'My Monthly',
        icon: 'ri-calendar-todo-line'
      }
    ]
  },
  {
    key: 'employees',
    path: '/sales_management/employees',
    dashboard: '/sales_management/employees',
    subItems: [
      {
        to: '/sales_management/employees/assignRole',
        label: 'Assign Role',
        icon: 'ri-user-add-line'
      },
      {
        to: '/sales_management/employees/allEmployees',
        label: 'All Employees',
        icon: 'ri-user-line'
      },
      // {
      //   to: '/sales_management/employees/assignedEmployees',
      //   label: 'Assigned Employees',
      //   icon: 'ri-user-line'
      // },
      // {
      //   to: '/sales_management/employees/unassignedEmployees',
      //   label: 'Unassigned Employees',
      //   icon: 'ri-user-line'
      // }
    ]
  },
    {
    key: 'onlineDeal',
    path: '/sales_management/online_requested_deal',
    dashboard: '/sales_management/online_requested_deal',
    subItems: [
      {
        to: '/sales_management/online_requested_deal',
        label: 'All Online Requested Deal',
        icon: 'ri-file-add-line'
      },

      // {
      //   to: '/sales_management/employees/assignedEmployees',
      //   label: 'Assigned Employees',
      //   icon: 'ri-user-line'
      // },
      // {
      //   to: '/sales_management/employees/unassignedEmployees',
      //   label: 'Unassigned Employees',
      //   icon: 'ri-user-line'
      // }
    ]
  }
]

const contractsSection = { key: 'contract', path: '/sales_management/contract' }
const contractTimeLinks = [
  { to: '/sales_management/contracts/current', label: 'My Current Contract' },
  { to: '/sales_management/contracts/worked', label: 'My Worked Contract' },
  { to: '/sales_management/contracts/priority', label: 'My Priority Contract' },
  { to: '/sales_management/contracts/important', label: 'My Important Contract' }
]
const industries = [
  { text: 'All', route: '/sales_management/contracts/industry/all' },
  { text: 'Aerospace', route: '/sales_management/contracts/industry/aerospace' },
  { text: 'Automotive', route: '/sales_management/contracts/industry/automotive' },
  { text: 'Consumer', route: '/sales_management/contracts/industry/consumer' },
  { text: 'Products', route: '/sales_management/contracts/industry/products' },
  { text: 'Defense', route: '/sales_management/contracts/industry/defense' },
  { text: 'Electronics', route: '/sales_management/contracts/industry/electronics' },
  { text: 'Energy', route: '/sales_management/contracts/industry/energy' },
  { text: 'Heavy Equipment', route: '/sales_management/contracts/industry/heavy-equipment' },
  { text: 'Machinery', route: '/sales_management/contracts/industry/machinery' },
  { text: 'Medical', route: '/sales_management/contracts/industry/medical' },
  { text: 'Packaging', route: '/sales_management/contracts/industry/packaging' },
  { text: 'Retail', route: '/sales_management/contracts/industry/retail' },
  { text: 'Shipbuilding', route: '/sales_management/contracts/industry/shipbuilding' }
]

const isSectionActive = (section) =>
  route.path.startsWith(section.path) || route.path.includes(section.path)
const logoutUser = () => {
  authStore.logout()
  router.push('/login/adminLogin')
}

onMounted(() => {
  fetchParentCompanyNames()
  fetchCompanyNames()
})
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
