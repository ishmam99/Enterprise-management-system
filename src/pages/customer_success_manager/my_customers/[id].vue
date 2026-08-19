<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import Sidebar from '@/components/customer_success_manager/sideTabs.vue'
import TopTabs from '@/components/customer_success_manager/topTabs.vue'

// Pages
import Overview from '@/components/customer_success_manager/DashboardHome.vue'
import CustomerSupport from '@/components/customer_success_manager/CustomerSupport.vue'
import Users from '@/components/customer_success_team_sales/Users.vue'
import Solutions from '@/components/customer_success_team_sales/AllSolutions.vue'
import Software from '@/components/customer_success_team_sales/AllSoftware.vue'
import Training from '@/components/customer_success_team_sales/allTrainings.vue'
import Deal from '@/components/customer_success_team_sales/Deal.vue'
import Contact from '@/components/customer_success_team_sales/Contact.vue'
import ActivityList from '@/components/customer_success_manager/ActivityList.vue'
import EntryActivity from '@/components/customer_success_manager/EntryActivity.vue'

import api from '@/config/api'
import { watch } from 'vue'

const route = useRoute()

const activeTopTab = ref('overview')
const activeTab = ref('overview')
const customer = ref(null)

const viewMap = {
  overview: Overview,
  support: CustomerSupport,
  users: Users,
  solutions: Solutions,
  software: Software,
  training: Training,
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
  'activity-list': ActivityList,
  'entry-activity': EntryActivity,
}

/* 🔹 CORE LOGIC */
const currentView = computed(() => {

  if (viewMap[activeTab.value]) {

    return { component: viewMap[activeTab.value], props: { customer: customer.value } }
  }

  // 🔹 SOLUTION TASK
  if (activeTab.value.startsWith('solution-')) {
    const [, id, type] = activeTab.value.split('-')

    return {
      component: type === 'create' ? CreateTask : TaskList,
      props: {
        mode: 'solution',
        solutionId: Number(id),
        customer: customer.value
      }
    }
  }

  // 🔹 SOFTWARE TASK
  if (activeTab.value.startsWith('software-')) {
    const [, id, type] = activeTab.value.split('-')

    return {
      component: type === 'create' ? CreateTask : TaskList,
      props: {
        mode: 'software',
        softwareId: Number(id)
      }
    }
  }

  return Overview
})

const setTopTab = (key) => {
  activeTopTab.value = key
}
const setActiveTab = (key) => {
  activeTab.value = key
}
const getCustomer = async () => {
  const { data } = await api().get('customers/' + route.params.id)
  customer.value = data.data
}
watch(() => route.params.id, () => {
  getCustomer()
})
onMounted(() => {
  getCustomer()
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <TopTabs :active="activeTopTab" @change="setTopTab" />

    <div class="flex flex-1">
      <Sidebar :active="activeTab" :topTab="activeTopTab" :customer="customer" @change="setActiveTab" />

      <main class="flex-1 p-6 bg-gray-50 overflow-auto">

        <component :is="currentView.component || currentView" v-bind="currentView.props" :key="activeTab" />
      </main>
    </div>
  </div>
</template>
