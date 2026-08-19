<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-6">
   <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
  <!-- Title -->
  <div>
    <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Contacts</h1>
    <p class="text-sm text-gray-500 mt-1">Manage and track all your contacts</p>
  </div>

  <!-- Tabs -->
  <div class="bg-white shadow-sm rounded-xl px-4 py-2 border border-gray-200">
    <nav class="flex items-center gap-2">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
        :class="activeTab === tab.id
          ? 'bg-blue-600 text-white shadow'
          : 'text-gray-600 hover:bg-gray-100'"
      >
        <span class="text-base">{{ tab.icon }}</span>
        <span>{{ tab.name }}</span>

        <span
          v-if="tab.badge"
          class="ml-1 px-2 py-0.5 rounded-full text-xs font-semibold"
          :class="activeTab === tab.id
            ? 'bg-white/20 text-white'
            : 'bg-gray-200 text-gray-700'"
        >
          {{ tab.badge }}
        </span>
      </button>
    </nav>
  </div>
</div>


    <!-- Tab Content -->
    <div class="bg-white rounded-xl border shadow-sm p-4 md:p-6">
      <!-- Tab 1: Deals  -->
      <div v-if="activeTab === 'contacts'">
        <Contacts />
      </div>

      <!-- Tab 2: Prospective Deals -->
      <div v-else-if="activeTab === 'leaders'">
        <leaders />
      </div>


    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Contacts from './AllContacts.vue'
import Leaders from './Leaders.vue'


// Tabs configuration
const tabs = [
  {
    id: 'contacts',
    name: 'Contacts',
    icon: '👥',
    badge: '24'
  },
  {
    id: 'leaders',
    name: 'Leaders',
    icon: '🛟',
    badge: '12'
  }
]

// Active tab state
const activeTab = ref('contacts')
</script>
