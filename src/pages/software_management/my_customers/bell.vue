<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar
      :active="activeView"
      @change="activeView = $event"
    />

    <!-- Content -->
    <div class="flex-1 p-6 bg-white">
      <component :is="currentComponent" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import Sidebar from '@/components/customer_success_manager/sidebar.vue'

// content components
import DashboardHome from '@/components/customer_success_manager/DashboardHome.vue'
import myCustomer from '@/components/customer_success_manager/myCustomer.vue'
// import CustomerDetails from './content/CustomerDetails.vue'
// import Reports from './content/Reports.vue'

const activeView = ref('dashboard')

const componentMap = {
  dashboard: DashboardHome,
  customers: myCustomer,
  // customer_details: CustomerDetails,
  // reports: Reports
}

const currentComponent = computed(() => {
  return componentMap[activeView.value]
})
</script>
