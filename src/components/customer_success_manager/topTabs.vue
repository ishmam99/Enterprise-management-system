<!-- TopTabs.vue -->
<template>
  <div class="bg-gradient-to-r px-3 flex from-cyan-600 to-cyan-700 text-white shadow-lg">
    <div class="flex justify-center items-center">
      <!-- DO NOT TOUCH -->
      <button
        @click="store.showSidebar = !store.showSidebar"
        class="flex px-3 py-1 bg-amber-300 text-blue-600 rounded-lg"
      >
        <i v-if="store.showSidebar" class="ri-arrow-left-double-line"></i>
        <i v-else class="ri-arrow-right-double-line"></i>
      </button>
    </div>

    <div class="max-w-7xl mx-auto px-4">
      <div class="flex items-center h-14 md:h-16">
        <nav class="flex space-x-2 overflow-x-auto">
          <button
            v-for="item in menu"
            :key="item.key"
            @click="$emit('change', item.key)"
            class="px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap"
            :class="
              active === item.key
                ? 'bg-white/20 text-white'
                : 'text-indigo-100 hover:bg-indigo-700/40 hover:text-white'
            "
          >
            <i :class="item.icon" class="mr-2"></i>
            {{ item.label }}
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCustomerSuccessManagerStore } from '@/pages/customer_success_manager/stores/customerSuccessManagerStore'
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()
const store = useCustomerSuccessManagerStore()

defineProps({ active: String })
defineEmits(['change'])

/** ALL POSSIBLE TABS */
const allMenus = [
  { key: 'overview', label: 'Overview', icon: 'ri-home-4-line' },
  { key: 'support', label: 'Support', icon: 'ri-customer-service-2-line' },
  { key: 'training', label: 'Training', icon: 'ri-graduation-cap-line' },
  { key: 'Sales', label: 'Sales', icon: 'ri-hand-coin-line' }
]

/** ROLE-AWARE MENU */
const menu = computed(() => {
  // 🔐 Executive Sales → ONLY Sales tab
  if (authStore.role === 'sales-executive') {
    return allMenus.filter((m) => m.key === 'Sales')
  }

  // 👤 Everyone else → full menu
  return allMenus
})
</script>
