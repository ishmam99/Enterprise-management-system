<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar (unchanged) -->
    <aside class="w-64 bg-slate-900/90 text-white shadow-xl border-r border-slate-700 backdrop-blur-md px-4 py-6 sticky top-0 h-screen overflow-y-auto">
      <h2 class="text-lg font-semibold mb-6 px-4 tracking-wide">📂 Related List</h2>
      <ul class="menu space-y-1">
        <li
          v-for="(item, index) in sidebarItems"
          :key="index"
          class="transition-all duration-200"
        >
          <button
            class="w-full text-left px-3 py-2 rounded-lg flex items-center justify-between hover:bg-slate-700/70"
            :class="{ 'bg-blue-600 text-white shadow-md': activeSidebar === item.key }"
            @click="scrollToSection(item.key)"
          >
            <span>{{ item.label }}</span>
            <span
              v-if="item.count"
              class="ml-2 text-xs font-medium bg-blue-500/80 text-white px-2 py-0.5 rounded-full"
            >
              {{ item.count }}
            </span>
          </button>
        </li>
      </ul>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
      <!-- Header -->
      <div class="bg-white shadow-sm px-8 py-5 border-b border-gray-200">
        
          <h1 class="text-3xl text-center border-b-2 py-1 mb-2 font-bold text-blue-600">Deals Dashboard</h1>
        <div class="flex items-center justify-between">
          <div class="text-xl font-semibold">
            
            <p class="text-gray-600 mt-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-4 0H9m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v12m4 0V9m0 12h4m-4 0V9m4 0h2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4m-4 0v12m4-12h2" />
              </svg>
              Company Name: {{ route.query.name || 'N/A' }}
            </p>
          </div>
          <button
            class="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg px-4 py-2 transition-all duration-300"
            title="Go back"
            @click="goBack"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"
              ></path>
            </svg>
            <span class="font-medium">Back</span>
          </button>
        </div>
      </div>

      <!-- Upper Account Section -->
      <div class="bg-blue-100 shadow-sm rounded-lg p-6 mx-8 my-6 border border-gray-200">
        <!-- Tabs -->
        <div class="flex items-center border-b mb-6 bg-gray-50 px-4 pt-4 rounded-t-lg">
          <button
            v-for="tab in tabs"
            :key="tab"
            class="px-6 py-3 text-sm font-medium rounded-t-lg transition-all mx-1"
            :class="
              overviewTab === tab
                ? 'bg-white border-t border-l border-r border-gray-200 text-blue-600 font-semibold'
                : 'text-gray-500 hover:text-gray-700'
            "
            @click="overviewTab = tab"
          >
            {{ tab }}
          </button>
          <span class="ml-auto text-xs text-gray-500 flex items-center bg-white py-1.5 px-3 rounded border border-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1 text-amber-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Last Update: <span class="ml-1 font-medium">4 day(s) ago</span>
          </span>
        </div>

        <!-- Overview Tab -->
        <div v-if="overviewTab === 'Overview'" class="space-y-4 text-sm">
          <div class="grid grid-cols-2 gap-x-8 gap-y-4">
            <div v-for="(item, index) in overviewData" :key="index" class="flex flex-col">
              <div class="font-medium text-gray-500 mb-1 flex items-center">
                <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                {{ item.label }}
              </div>
              <div :class="['text-gray-800 font-semibold', item.value === '—' ? 'text-gray-400' : '']">
                {{ item.value }}
              </div>
            </div>
          </div>
        </div>

        <!-- Timeline Tab -->
        <div v-else-if="overviewTab === 'Timeline'" class="space-y-3 text-center py-8">
          <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-gray-600">Timeline data will appear here...</p>
          </div>
        </div>
      </div>

      <!-- All Sections Content -->
      <main class="px-8 pb-10 flex-1 space-y-6">
        <!-- Notes Section -->
        <section
          :id="'notes'"
          class="bg-cyan-100/70 shadow-sm rounded-lg p-6 w-full border border-gray-200 transition-all duration-300 hover:shadow-md"
        >
          <h2 class="text-xl font-semibold mb-4 flex items-center text-gray-800">
            <div class="bg-blue-100 p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            Notes
            <span class="ml-3 bg-white text-blue-700 text-xs px-3 py-1 rounded-full">
              {{ notes.length }} items
            </span>
          </h2>
          <div class="space-y-3">
            <div
              v-for="(note, idx) in notes"
              :key="idx"
              class="border-l-4 border-blue-400 pl-4 py-3 bg-white rounded-r-lg transition-all duration-300"
            >
              <p class="text-gray-700 flex items-start">
                <span class="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded mr-2 mt-0.5">{{ idx + 1 }}</span>
                {{ note }}
              </p>
            </div>
          </div>
        </section>

        <!-- Generic Section Template -->
        <section
          v-for="item in otherSections"
          :id="item.id"
          :key="item.id"
          :class="item.bgColor"
          class=" shadow-sm rounded-lg p-6 w-full border border-gray-200 transition-all duration-300 hover:shadow-md"
        >
          <h2 class="text-xl font-semibold mb-4 flex items-center text-gray-800">
            <div :class="['p-2 rounded-lg mr-3', item.bgColor2]">
              <span :class="item.iconColor">{{ item.icon }}</span>
            </div>
            {{ item.title }}
          </h2>
          <p class="text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100">
            {{ item.text }}
          </p>
        </section>

        <!-- Account Review Section -->
        <section
          :id="'account-review'"
          class="bg-teal-100 shadow-sm rounded-lg p-6 w-full border border-gray-200 transition-all duration-300 hover:shadow-md"
        >
          <h2 class="text-xl font-semibold mb-4 flex items-center text-gray-800">
            <div class="bg-purple-100 p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            Account Review 2022
          </h2>
          <div class="space-y-3 text-sm bg-gray-50 p-5 rounded-lg border border-gray-100">
            <p class="flex items-center">
              <span class="font-medium text-gray-700 w-40">Account Name:</span>
              <span class="text-gray-800">Extended Stay America Premier Suites Austin - Kyle</span>
            </p>
            <p class="flex items-center">
              <span class="font-medium text-gray-700 w-40">Last Email Date:</span>
              <span class="text-gray-800">Aug 20, 2025</span>
            </p>
            <p class="flex items-center">
              <span class="font-medium text-gray-700 w-40">Lead Associate Last Call Back Date:</span>
              <span class="text-gray-800">--</span>
            </p>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/AuthStore'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
authStore.sidebarOpen = false

const tabs = ['Overview', 'Timeline']
const overviewTab = ref('Overview')

const overviewData = [
  { label: 'D06B SSEM Communication Schedule', value: '—' },
  { label: 'D06C SSEM Call Importance', value: '—' },
  { label: 'D06D SSEM Work Notes', value: '—' },
  { label: 'H03 Account Potential Status', value: '1. Initial Lead' },
  { label: 'E16 Next Step Summary', value: '20250825: Asif: Left vm need to call back' }
]

const sidebarItems = [
  { key: 'notes', label: 'Notes', count: 3 },
  // { key: 'connected-records', label: 'Connected Records' },
  // { key: 'attachments', label: 'Attachments' },
  { key: 'deals', label: 'Deals' },
  { key: 'contacts', label: 'Contacts' },
  // { key: 'open-activities', label: 'Open Activities' },
  // { key: 'closed-activities', label: 'Closed Activities' },
  { key: 'products', label: 'Products' },
  { key: 'quotes', label: 'Quotes' },
  { key: 'sales-quotes', label: 'Sales Quotes' },
  { key: 'invoices', label: 'Invoices' },
  // { key: 'member-accounts', label: 'Member Accounts' },
  { key: 'account-review', label: 'Account Review' }
]

const otherSections = [
  // { id: 'connected-records', title: 'Connected Records', text: 'Connected Records will appear here.', icon: '🔗', bgColor: 'bg-green-100', iconColor: 'text-green-600' },
  // { id: 'attachments', title: 'Attachments', text: 'Attachments list goes here.', icon: '📎', bgColor: 'bg-gray-100', iconColor: 'text-gray-600' },
  { id: 'deals', title: 'Deals', text: 'Deals list goes here.', icon: '🤝', bgColor: 'bg-amber-100', bgColor2: 'bg-amber-200', iconColor: 'text-amber-600' },
  { id: 'contacts', title: 'Contacts', text: 'Contacts list goes here.', icon: '👥', bgColor: 'bg-cyan-100', bgColor2: 'bg-cyan-200', iconColor: 'text-cyan-600' },
  // { id: 'open-activities', title: 'Open Activities', text: 'Open activities list goes here.', icon: '⏳', bgColor: 'bg-yellow-100', iconColor: 'text-yellow-600' },
  // { id: 'closed-activities', title: 'Closed Activities', text: 'Closed activities list goes here.', icon: '✅', bgColor: 'bg-emerald-100', iconColor: 'text-emerald-600' },
  { id: 'products', title: 'Products', text: 'Products list goes here.', icon: '📦', bgColor: 'bg-indigo-100', bgColor2: 'bg-indigo-200', iconColor: 'text-indigo-600' },
  { id: 'quotes', title: 'Quotes', text: 'Quotes list goes here.', icon: '💬', bgColor: 'bg-pink-100', bgColor2: 'bg-pink-200', iconColor: 'text-pink-600' },
  { id: 'sales-quotes', title: 'Sales Quotes', text: 'Sales quotes list goes here.', icon: '📋', bgColor: 'bg-blue-100', bgColor2: 'bg-blue-200', iconColor: 'text-blue-600' },
  { id: 'invoices', title: 'Invoices', text: 'Invoices list goes here.', icon: '🧾', bgColor: 'bg-purple-100', bgColor2: 'bg-purple-200', iconColor: 'text-purple-600' },
  // { id: 'member-accounts', title: 'Member Accounts', text: 'Member accounts list goes here.', icon: '👤', bgColor: 'bg-teal-100', iconColor: 'text-teal-600' }
]

const activeSidebar = ref('account-review')

const notes = [
  '2025-08-25: Asif - Left VM, need to call back',
  '2025-08-20: Initial Lead created',
  '2025-08-10: Follow-up scheduled'
]

const scrollToSection = (sectionId) => {
  activeSidebar.value = sectionId
  const element = document.getElementById(sectionId)
  const container = document.querySelector(".flex-1.flex.flex-col.overflow-y-auto")

  if (element && container) {
    const headerOffset = 100
    const elementPosition = element.offsetTop
    const offsetPosition = elementPosition - headerOffset

    container.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })

    element.classList.add("ring-2", "ring-blue-400", "ring-opacity-70")
    setTimeout(() => {
      element.classList.remove("ring-2", "ring-blue-400", "ring-opacity-70")
    }, 2000)
  }
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  if (route.hash) {
    const sectionId = route.hash.replace('#', '')
    setTimeout(() => {
      scrollToSection(sectionId)
    }, 100)
  }
})
</script>

<style>
/* Custom scrollbar for the sidebar */
aside::-webkit-scrollbar {
  width: 6px;
}

aside::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

aside::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

aside::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>