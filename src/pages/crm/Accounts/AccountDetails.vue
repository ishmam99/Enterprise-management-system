<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <div class="w-64 bg-gray-800 border-r border-gray-200 p-5 text-white">
      <div class="pb-5 border-b border-gray-200 mb-5">
        <h2 class="text-lg font-medium">Account Id: {{ accountData['Account ID'] }}</h2>
        <h2 class="text-lg font-medium">Account Name: {{ accountData['Account Name'] }}</h2>
      </div>
      <div class="space-y-1">
        <div
          :class="['px-3 py-2 rounded-md cursor-pointer', activeSection === 'notes' ? 'bg-gray-500 font-medium' : 'hover:bg-gray-500']"
          @click="navigateTo('notes')"
        >
          Notes
        </div>
        <div
          :class="['px-3 py-2 rounded-md cursor-pointer', activeSection === 'deals' ? 'bg-gray-500 font-medium' : 'hover:bg-gray-500']"
          @click="navigateTo('deals')"
        >
          Deals
        </div>
        <div
          :class="['px-3 py-2 rounded-md cursor-pointer', activeSection === 'invoices' ? 'bg-gray-500 font-medium' : 'hover:bg-gray-500']"
          @click="navigateTo('invoices')"
        >
          Invoices
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-6">
      <Breadcrumb />
      <div class="mb-6 border-b border-gray-200">
        <nav class="-mb-px flex space-x-8 justify-center">
          <button :class="tabClasses('overview')" class="" @click="activeTab = 'overview'">
            Overview
          </button>
          <button :class="tabClasses('summary')" @click="activeTab = 'summary'">
            Summary
          </button>
        </nav>
      </div>

      <div class="py-4">
        <div v-if="activeTab === 'overview'" class="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <AccountOverview :accountData="accountData" :active-section="activeSection" />
        </div>
        <div v-if="activeTab === 'summary'" class="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <AccountSummary :accountData="accountData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AccountOverview from './AccountOverview.vue'
import AccountSummary from './AccountSummary.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'

const route = useRoute()
const router = useRouter()
const activeTab = ref('overview')
const activeSection = ref('notes') // Default to notes

// Get account data from route state or fetch from API
const accountData = ref(route.state?.accountData || {})

// Watch for hash changes in URL
watch(() => route.hash, (newHash) => {
  if (newHash) {
    activeSection.value = newHash.replace('#', '')
  }
}, { immediate: true })

const navigateTo = (section) => {
  activeSection.value = section
  router.push({ hash: `#${section}` })

  // If you have specific components for each section, you could also:
  // router.push({ name: 'account-details', hash: `#${section}` })
}

const tabClasses = (tabName) => {
  return [
    'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-2xl',
    activeTab.value === tabName
      ? 'border-green-500 text-green-600'
      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
  ]
}
</script>
