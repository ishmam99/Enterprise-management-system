<!-- Sidebar.vue -->
<template>
  <div class="w-72 min-h-screen bg-gradient-to-b from-indigo-700 to-indigo-900 text-white p-5 flex flex-col">
    <h2 class="text-2xl font-bold mb-8 text-center tracking-tight">
      Customer Success
    </h2>

    <ul class="space-y-1.5 flex-1">
      <li
        v-for="item in menu"
        :key="item.key"
        @click="$emit('change', item.key)"
        class="cursor-pointer px-4 py-3 rounded-lg transition-colors flex items-center"
        :class="active === item.key
          ? 'bg-white/15 font-semibold'
          : 'hover:bg-indigo-600/60'"
      >
        <i :class="item.icon" class="mr-3 text-xl"></i>
        {{ item.label }}
      </li>
    </ul>

    <!-- Optional: bottom section -->
    <div class="mt-auto pt-6 border-t border-indigo-600/40 text-sm opacity-80">
      <p>© 2026 Your Company</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  active: String
})

defineEmits(['change'])

const menu = [
  { key: 'overview',       label: 'Overview',          icon: 'ri-home-4-line'      },
  { key: 'customers',      label: 'My Customers',      icon: 'ri-user-line'        },
  { key: 'support',        label: 'Customer Support',  icon: 'ri-customer-service-2-line' },
  { key: 'bell',           label: 'Bell',              icon: 'ri-notification-3-line' },
  { key: 'users',          label: 'Users',             icon: 'ri-team-line'        },
  { key: 'solutions',      label: 'Solutions',         icon: 'ri-lightbulb-line'   },
  { key: 'software',       label: 'Software',          icon: 'ri-terminal-box-line' },
  { key: 'training',       label: 'Training',          icon: 'ri-graduation-cap-line' },
  { key: 'deal',           label: 'Deal',              icon: 'ri-hand-coin-line'   },
  { key: 'contact',        label: 'Contact',           icon: 'ri-contacts-line'    }
]
</script>
