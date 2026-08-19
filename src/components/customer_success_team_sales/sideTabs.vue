<template>
  <div
    class="w-72 min-h-full text-white p-5 flex flex-col transition-colors duration-300"
    :class="sidebarBg"
  >
    <h2 class="text-2xl font-bold mb-8 text-center tracking-tight">
      {{ customer?.user?.name }}
    </h2>

    <ul class="space-y-1.5 flex-1">
      <li v-for="item in filteredMenu" :key="item.key">
        <!-- 🔹 Main Menu Item -->
        <div
          @click="handleClick(item)"
          class="cursor-pointer px-4 py-3 rounded-lg transition-all flex items-center justify-between"
          :class="active === item.key ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'"
        >
          <div class="flex items-center">
            <i :class="item.icon" class="mr-3 text-xl"></i>
            {{ item.label }}
          </div>

          <!-- arrow for submenu -->
          <i
            v-if="item.children"
            class="ri-arrow-down-s-line transition-transform"
            :class="openSubmenus[item.key] ? 'rotate-180' : ''"
          ></i>
        </div>

        <!-- 🔸 Submenu -->
        <ul v-if="item.children && openSubmenus[item.key]" class="ml-8 mt-1 space-y-1 text-sm">
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
      </li>
    </ul>

    <div class="mt-auto pt-6 border-t border-white/20 text-sm opacity-80">
      <p>© 2026 Hi-tech Softsys</p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
const authStore = useAuthStore()

const props = defineProps({
  active: String,
  topTab: String,
  customer: Object
})

const emit = defineEmits(['change'])

const openSubmenus = ref({})

/* 🔹 Sidebar menu groups (UNCHANGED) */
const sidebarGroups = {
  overview: [
    'overview',
    'support',
    'users',
    'solutions',
    'software',
    'deal',
    'contact',
    'Activity Reports'
  ],
  support: ['support', 'users', 'solutions', 'software', 'Activity Reports'],
  training: ['software', 'solutions', 'Activity Reports'],
  Sales: ['overview', 'users', 'software', 'solutions', 'deal', 'contact', 'view_activity_report']
}

/* 🔹 Menu config */
const menuMap = {
  overview: { label: 'Overview', icon: 'ri-home-4-line' },
  support: { label: 'Customer Support', icon: 'ri-customer-service-2-line' },
  users: { label: 'Users', icon: 'ri-team-line' },
  solutions: { label: 'Solutions', icon: 'ri-lightbulb-line' },
  software: { label: 'Software', icon: 'ri-terminal-box-line' },
  training: { label: 'Training', icon: 'ri-graduation-cap-line' },
  myAction: { label: 'My Action', icon: 'ri-graduation-cap-line' },
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

  view_activity_report: { label: 'View Activity Report', icon: 'ri-file-list-line' }
}

const filteredMenu = computed(() => {
  // 🔐 Executive Sales → ONLY Sales sidebar
  if (authStore.role === 'sales-executive' || authStore.role === 'sales-executive') {
    return sidebarGroups.Sales.map((key) => ({
      key,
      ...menuMap[key]
    }))
  }

  // 👤 Normal behavior
  return (
    sidebarGroups[props.topTab]?.map((key) => ({
      key,
      ...menuMap[key]
    })) || []
  )
})

const handleClick = (item) => {
  if (item.children) {
    openSubmenus.value[item.key] = !openSubmenus.value[item.key]
  } else {
    emit('change', item.key)
  }
}

/* 🎨 TOP TAB → SIDEBAR COLOR */
const sidebarBg = computed(() => {
  if (authStore.role === 'sales-executive' || authStore.role === 'sales-executive') {
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
