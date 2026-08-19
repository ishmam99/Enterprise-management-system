<!-- AppLayout.vue -->
<template>
  <div class="flex flex-col min-h-screen">
    <!-- Top navigation (tabs) -->
    <TopTabs :active="activeTab" @change="setActiveTab" />

    <!-- Main content area -->
    <div class="flex flex-1">
      {{ customerId }}
      <!-- Sidebar (visible on md+ screens) -->
      <div class="hidden md:block">
        <Sidebar :active="activeTab" @change="setActiveTab" />
      </div>

      <!-- Page content -->
      <main class="flex-1 bg-gray-50 p-4 md:p-6 overflow-auto">
        <!-- Main content changes dynamically -->
        <component :is="currentView" :key="activeTab" />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Components
import Sidebar from '@/components/customer_success_manager/sideTabs.vue'
import TopTabs from '@/components/customer_success_manager/topTabs.vue'

// Page components (make sure these exist)
import Overview from '@/components/customer_success_manager/DashboardHome.vue'
import MyCustomers from '@/components/customer_success_manager/myCustomer.vue'
import CustomerSupport from '@/components/customer_success_manager/CustomerSupport.vue'

import Users from '@/components/customer_success_manager/Users.vue'
import Solutions from '@/components/customer_success_manager/Solutions.vue'
import Software from '@/components/customer_success_manager/Softwares.vue'
import ViewActivityReport from '@/components/customer_success_manager/view_activity_report.vue'
import CreateTask from '@/components/customer_success_manager/Createtask.vue'

import { useRoute } from 'vue-router'
import api from '@/config/api'
// import Training from '@/components/customer_success_manager/Training.vue'
// import Deal from '@/components/customer_success_manager/Deal.vue'
// import Contact from '@/components/customer_success_manager/Contact.vue'
const route = useRoute()
// Active tab state
const activeTab = ref('overview')
const customer = ref()
const customerId = computed(() => {
  return route.params.id
})
// Map of tab keys to components
const viewMap = {
  overview: Overview,
  customers: MyCustomers,
  support: CustomerSupport,

  users: Users,
  solutions: Solutions,
  software: Software,
  Createtask: CreateTask,

  // training: Training,
  // deal: Deal,
  // contact: Contact
}
const getCustomer = async () => {
  const { data } = await api().get('customers/' + customerId.value)

}
// Computed: returns the component for current tab
const currentView = computed(() => viewMap[activeTab.value] || Overview)
onMounted(() => {
  console.log('yalla')
  getCustomer()
})
// Update active tab from Sidebar or TopTabs
function setActiveTab(key) {
  activeTab.value = key
}
</script>
