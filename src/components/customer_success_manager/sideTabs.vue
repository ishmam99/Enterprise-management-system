<template>
  <div
    class="w-72 min-h-full text-white p-5 flex flex-col transition-colors duration-300"
    :class="sidebarBg"
  >
    <h2 class="text-2xl font-bold mb-8 text-center tracking-tight">
      {{ props.customer?.user?.name }}
    </h2>

    <ul class="space-y-1.5 flex-1">
      <li v-for="item in filteredMenu" :key="item.key">
        <!-- 🔹 MAIN ITEM -->
        <div
          @click="handleClick(item)"
          class="cursor-pointer px-4 py-3 rounded-lg transition-all flex items-center justify-between"
          :class="active === item.key ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'"
        >
          <div class="flex items-center">
            <i :class="item.icon" class="mr-3 text-xl"></i>
            {{ item.label }}
          </div>

          <i
            v-if="item.children || item.key.includes('task_')"
            class="ri-arrow-down-s-line transition-transform"
            :class="getOpenState(item.key) ? 'rotate-180' : ''"
          ></i>
        </div>

        <!-- 🔸 ACTIVITY REPORT SUBMENU -->
        <ul
          v-if="item.key === 'Activity Reports' && openActivity"
          class="ml-8 mt-1 space-y-1 text-sm"
        >
          <li
            v-for="child in item.children"
            :key="child.key"
            @click.stop="$emit('change', child.key)"
            class="cursor-pointer px-3 py-2 rounded-md transition-all"
            :class="active === child.key ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'"
          >
            {{ child.label }}
          </li>
        </ul>

        <!-- 🔸 Deal -->
        <ul v-if="item.key === 'deal' && openDeal" class="ml-8 mt-1 space-y-1 text-sm">
          <li
            v-for="child in item.children"
            :key="child.key"
            @click.stop="$emit('change', child.key)"
            @click="authStore.setCustomerSuccessTeamSidebarIdentifier(child.key)"
            class="cursor-pointer px-3 py-2 rounded-md transition-all"
            :class="active === child.key ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'"
          >
            {{ child.label }}
          </li>
        </ul>

        <!-- 🔸 Contact -->
        <ul v-if="item.key === 'contact' && openContact" class="ml-8 mt-1 space-y-1 text-sm">
          <li
            v-for="child in item.children"
            :key="child.key"
            @click.stop="$emit('change', child.key)"
            @click="authStore.setCustomerSuccessTeamSidebarIdentifier(child.key)"
            class="cursor-pointer px-3 py-2 rounded-md transition-all"
            :class="active === child.key ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'"
          >
            {{ child.label }}
          </li>
        </ul>

        <!-- 🔸 TASKING BY SOLUTION -->
        <ul
          v-if="item.key === 'task_solution' && openTaskSolution"
          class="ml-8 mt-1 space-y-2 text-sm"
        >
          <li v-for="sol in solutions" :key="sol.id">
            <p class="font-semibold opacity-80">{{ sol.name }}</p>
            <ul class="ml-4">
              <li
                class="cursor-pointer py-1 hover:underline"
                @click.stop="$emit('change', `solution-${sol.id}-create`)"
              >
                Create Task
              </li>
              <li
                class="cursor-pointer py-1 hover:underline"
                @click.stop="$emit('change', `solution-${sol.id}-list`)"
              >
                Task List
              </li>
            </ul>
          </li>
        </ul>

        <!-- 🔸 TASKING BY SOFTWARE -->
        <ul
          v-if="item.key === 'task_software' && openTaskSoftware"
          class="ml-8 mt-1 space-y-2 text-sm"
        >
          <li v-for="soft in softwares" :key="soft.id">
            <p class="font-semibold opacity-80">{{ soft.name }}</p>
            <ul class="ml-4">
              <li
                class="cursor-pointer py-1 hover:underline"
                @click.stop="$emit('change', `software-${soft.id}-create`)"
              >
                Create Task
              </li>
              <li
                class="cursor-pointer py-1 hover:underline"
                @click.stop="$emit('change', `software-${soft.id}-list`)"
              >
                Task List
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>

    <div class="mt-auto pt-6 border-t border-white/20 text-sm opacity-80">
      <p>© 2026 Hi-tech Softsys</p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import api from '@/config/api'

const authStore = useAuthStore()

const props = defineProps({
  active: String,
  topTab: String,
  customer: Object
})

const emit = defineEmits(['change'])

/* 🔹 TOGGLES */
const openActivity = ref(false)
const openTaskSolution = ref(false)
const openDeal = ref(false)
const openContact = ref(false)
const openTaskSoftware = ref(false)

/* 🔹 DATA */
const solutions = ref([])
const softwares = ref([])

/* 🔹 FETCH API DATA */
onMounted(async () => {
  try {
    const resSol = await api().get('/industries/1?solutions')
    const resSoft = await api().get('/industries/1?softwares')

    solutions.value = resSol.data?.data.solutions || []
    softwares.value = resSoft.data?.data.softwares || []
  } catch (err) {
    console.error('Sidebar API error:', err)
  }
})

/* 🔹 SIDEBAR GROUPS */
const sidebarGroups = {
  overview: [
    'overview',
    'support',
    'users',
    'solutions',
    'software',
    'training',
    'deal',
    'contact',
   
  ],
  support: ['support', 'users', 'solutions', 'software', ],
  training: ['software', 'solutions', 'training', ],
  Sales: ['software', 'solutions', 'deal', 'contact', ]
}

/* 🔹 MENU MAP */
const menuMap = {
  overview: { label: 'Overview', icon: 'ri-home-4-line' },
  support: { label: 'Customer Support', icon: 'ri-customer-service-2-line' },
  users: { label: 'Users', icon: 'ri-team-line' },
  solutions: { label: 'Solutions', icon: 'ri-lightbulb-line' },
  software: { label: 'Software', icon: 'ri-terminal-box-line' },
  training: { label: 'Training', icon: 'ri-graduation-cap-line' },
  deal: {
    label: 'Deal',
    icon: 'ri-hand-coin-line',
    children: [
      { key: 'deal-structure-analysis-service', label: 'Structure Analysis Service' },
      { key: 'deal-system-dynamics-analysis-service', label: 'System Dynamics Analysis Service' },
      { key: 'deal-acoustics-analysis-service', label: 'Acoustics Analysis Service' },
      { key: 'deal-fluids-analysis-service', label: 'Fluids Analysis Service' },
      { key: 'deal-autonomous-analysis-service', label: 'Autonomous Analysis Service' },
      { key: 'deal-vmc-analysis-service', label: 'VM&C Analysis Service' },
      { key: 'deal-icme-analysis-service', label: 'ICME Analysis Service' }
    ]
  },
  contact: {
    label: 'Contact',
    icon: 'ri-hand-coin-line',
    children: [
      { key: 'contact-structure-analysis-service', label: 'Structure Analysis Service' },
      {
        key: 'contact-system-dynamics-analysis-service',
        label: 'System Dynamics Analysis Service'
      },
      { key: 'contact-acoustics-analysis-service', label: 'Acoustics Analysis Service' },
      { key: 'contact-fluids-analysis-service', label: 'Fluids Analysis Service' },
      { key: 'contact-autonomous-analysis-service', label: 'Autonomous Analysis Service' },
      { key: 'contact-vmc-analysis-service', label: 'VM&C Analysis Service' },
      { key: 'contact-icme-analysis-service', label: 'ICME Analysis Service' }
    ]
  },

  'Activity Reports': {
    label: 'Activity Reports',
    icon: 'ri-file-chart-line',
    children: [
      { key: 'entry-activity', label: 'Entry Activity' },
      { key: 'activity-list', label: 'Activity List' }
    ]
  },

  task_solution: {
    label: 'Tasking - by Solution',
    icon: 'ri-stack-line'
  },

  task_software: {
    label: 'Tasking - by Software',
    icon: 'ri-apps-line'
  },

  view_activity_report: {
    label: 'View Activity Report',
    icon: 'ri-file-list-line'
  }
}

/* 🔹 FILTER MENU */
const filteredMenu = computed(() => {
  if (authStore.role === 'sales-executive') {
    return sidebarGroups.Sales.map((key) => ({
      key,
      ...menuMap[key]
    }))
  }

  return (
    sidebarGroups[props.topTab]?.map((key) => ({
      key,
      ...menuMap[key]
    })) || []
  )
})

/* 🔹 CLICK HANDLER */
const handleClick = (item) => {
  if (item.key === 'Activity Reports') {
    openActivity.value = !openActivity.value
  } else if (item.key === 'task_solution') {
    openTaskSolution.value = !openTaskSolution.value
  } else if (item.key === 'task_software') {
    openTaskSoftware.value = !openTaskSoftware.value
  } else if (item.key === 'deal') {
    openDeal.value = !openDeal.value
  } else if (item.key === 'contact') {
    openContact.value = !openContact.value
  } else {
    emit('change', item.key)
  }
}

/* 🔹 TOGGLE STATE */
const getOpenState = (key) => {
  if (key === 'Activity Reports') return openActivity.value
  if (key === 'task_solution') return openTaskSolution.value
  if (key === 'task_software') return openTaskSoftware.value
  return false
}

/* 🎨 SIDEBAR COLOR */
const sidebarBg = computed(() => {
  if (authStore.role === 'sales-executive') {
    return 'bg-gradient-to-b from-stone-600 to-stone-800'
  }

  const map = {
    overview: 'bg-gradient-to-b from-cyan-700 to-cyan-800',
    support: 'bg-gradient-to-b from-blue-900 to-slate-900',
    training: 'bg-gradient-to-b from-teal-800 to-gray-900',
    Sales: 'bg-gradient-to-b from-stone-600 to-stone-800'
  }

  return map[props.topTab] || map.overview
})
</script>
