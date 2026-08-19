<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-6">
    <!-- Header -->
    <div class="mb-2">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-900">Softwares</h1>
      <p class="text-gray-600 mt-1">Manage all Softwares</p>
    </div>

    <!-- Tab Navigation -->
    <div class="mb-8">
      <div class="border-b border-gray-200">
        <nav class="flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm'
            ]"
          >
            <span class="mr-2">{{ tab.icon }}</span>
            {{ tab.name }}
            <span
              v-if="tab.badge"
              :class="[
                activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-900',
                'ml-2 py-0.5 px-2 rounded-full text-xs font-medium'
              ]"
            >
              {{ tab.badge }}
            </span>
          </button>
        </nav>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="">
      <!-- Tab 1: Customer Overview -->
      <div v-if="activeTab === 'prospective'">
        <customer-overview />
      </div>

      <!-- Tab 2: softwares Tickets -->
      <div v-else-if="activeTab === 'softwares'">
        <support-tickets />
      </div>


    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import SupportTickets from './AllSoftware.vue'
import CustomerOverview from './ProspectiveSoftware.vue'

const activeTab = ref('softwares')
// Tabs configuration
const tabs = [

  {
    id: 'softwares',
    name: 'All softwares',
    icon: '🛟',
    badge: '12'
  },
  {
    id: 'prospective',
    name: 'Prospective softwares',
    icon: '🎓',
    badge: '8'
  }
]

// Active tab state

</script>
