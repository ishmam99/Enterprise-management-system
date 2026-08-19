<!-- AppLayout.vue -->
<template>
  <div class="flex flex-col min-h-screen">
    <!-- Top navigation (tabs) -->
    <!-- <TopTabs :active="activeTopTab" @change="setTopTab" /> -->
    <p class="hidden">{{ customerId }}</p>

    <!-- Main content area -->
    <div class="flex flex-1">
      <!-- Sidebar -->
      <div class="hidden md:block">
        <Sidebar :active="activeTab" :topTab="activeTopTab" :customer="customer" @change="setActiveTab" />
      </div>

      <!-- Page content -->
      <main class="flex-1 bg-gray-50 p-4 md:p-6 overflow-auto">
        <component :is="currentView" :customer="customer" :key="activeTab" />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/config/api'

// Components
import Sidebar from '@/components/customer_success_team_sales/sideTabs.vue'
import TopTabs from '@/components/customer_success_team_sales/topTabs.vue'
import Solutions from '@/components/customer_success_team_sales/AllSolutions.vue'
import Software from '@/components/customer_success_team_sales/AllSoftware.vue'

// Pages
import Overview from '@/components/customer_success_team_sales/DashboardHome.vue'
import CustomerSupport from '@/components/customer_success_team_sales/CustomerSupport.vue'
import Users from '@/components/customer_success_team_sales/Users.vue'

import Training from '@/components/customer_success_team_sales/training.vue'
import Deal from '@/components/customer_success_team_sales/Deal.vue'
import Contact from '@/components/customer_success_team_sales/Contact.vue'
import ActivityList from '@/components/customer_success_team_sales/ActivityList.vue'
import EntryActivity from '@/components/customer_success_team_sales/EntryActivity.vue'
import MyAction from '@/components/customer_success_team_sales/myAction.vue'

const route = useRoute()

/** TOP TAB (controls sidebar content) */
const activeTopTab = ref('overview')

/** SIDEBAR TAB (controls page content) */
const activeTab = ref('overview')

const customer = ref(null)

const customerId = computed(() => {
  customer.value = null
  getCustomer(route.params.name)
  return route.params.name
})

const viewMap = {
  overview: Overview,
  // customers: MyCustomers,
  support: CustomerSupport,
  users: Users,
  solutions: Solutions,
  software: Software,
  training: Training,
  deal: Deal,
  contact: Contact,
  myAction: MyAction,
  'activity-list': ActivityList,
  'entry-activity': EntryActivity,
  'deal-structure-analysis-service': Deal,
  'deal-system-dynamics-analysis-service': Deal,
  'deal-acoustics-analysis-service': Deal,
  'deal-fluids-analysis-service': Deal,
  'deal-autonomous-analysis-service': Deal,
  'deal-vmc-analysis-service': Deal,
  'deal-icme-analysis-service': Deal,
  'contact-structure-analysis-service': Contact,
  'contact-system-dynamics-analysis-service': Contact,
  'contact-acoustics-analysis-service': Contact,
  'contact-fluids-analysis-service': Contact,
  'contact-autonomous-analysis-service': Contact,
  'contact-vmc-analysis-service': Contact,
  'contact-icme-analysis-service': Contact,

}

const currentView = computed(() => viewMap[activeTab.value] || Overview)

function setTopTab(key) {
  activeTopTab.value = key
  activeTab.value = key === 'overview' ? 'overview' : activeTab.value
}

function setActiveTab(key) {
  activeTab.value = key
}

const getCustomer = async (id) => {
  const { data } = await api().get('customers/' + id)
  customer.value = data.data
}
</script>
