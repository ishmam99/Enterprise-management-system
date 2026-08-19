<script setup>
import { ref } from 'vue'

// Accordion state
const openMenus = ref({
  campaigns: false,
  leads: false,
  content: false,
  analytics: false
})

const toggleMenu = (menu) => {
  openMenus.value[menu] = !openMenus.value[menu]
}
</script>

<template>
  <aside
    class="hidden lg:flex flex-col w-72 bg-gradient-to-b from-slate-800 to-slate-900 border-r border-slate-700"
  >
    <!-- Brand -->
    <div class="p-6 border-b border-slate-700">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center">
          <span class="text-purple-400 font-bold text-lg">VC</span>
        </div>
        <div>
          <h2 class="text-xl font-bold text-white">Vermont Composites</h2>
          <p class="text-xs text-slate-400">Marketing Management</p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="p-4 flex-1 space-y-1 overflow-y-auto">

      <!-- Overview (no submenu) -->
      <RouterLink to="/marketing_management" v-slot="{ isExactActive }">
        <div
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-xl transition cursor-pointer',
            isExactActive
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
              : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
          ]"
        >
          <span class="text-lg">📊</span>
          Overview
        </div>
      </RouterLink>

      <!-- Campaigns (accordion) -->
      <div>
        <div
          @click="toggleMenu('campaigns')"
          class="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-700/50 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <span class="text-lg">📣</span>
            <span>Campaigns</span>
          </div>
          <span class="text-xs transition-transform duration-300" :class="openMenus.campaigns ? 'rotate-90' : ''">
            ▶
          </span>
        </div>
        <div v-show="openMenus.campaigns" class="ml-6 space-y-1 mt-1">
          <RouterLink to="/marketing_management/marketing/EmailCampaigns" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">✉️</span>
              Email Campaigns
              <span class="ml-auto text-xs bg-purple-600/30 text-purple-300 px-2 py-0.5 rounded-full">8</span>
            </div>
          </RouterLink>
          <RouterLink to="/marketing_management/marketing/SocialMedia" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">📱</span>
              Social Media
            </div>
          </RouterLink>
          <RouterLink to="/marketing_management/marketing/AdCampaigns" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">💵</span>
              Ad Campaigns
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Leads & Contacts (accordion) -->
      <div>
        <div
          @click="toggleMenu('leads')"
          class="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-700/50 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <span class="text-lg">👤</span>
            <span>Leads &amp; Contacts</span>
          </div>
          <span class="text-xs transition-transform duration-300" :class="openMenus.leads ? 'rotate-90' : ''">
            ▶
          </span>
        </div>
        <div v-show="openMenus.leads" class="ml-6 space-y-1 mt-1">
          <RouterLink to="/marketing_management/marketing/leads" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">📋</span>
              Leads
              <span class="ml-auto text-xs bg-purple-600/30 text-purple-300 px-2 py-0.5 rounded-full">24</span>
            </div>
          </RouterLink>
          <RouterLink to="/marketing_management/marketing/contacts" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">📇</span>
              Contacts
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Content (accordion) -->
      <div>
        <div
          @click="toggleMenu('content')"
          class="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-700/50 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <span class="text-lg">📝</span>
            <span>Content</span>
          </div>
          <span class="text-xs transition-transform duration-300" :class="openMenus.content ? 'rotate-90' : ''">
            ▶
          </span>
        </div>
        <div v-show="openMenus.content" class="ml-6 space-y-1 mt-1">
          <RouterLink to="/marketing_management/marketing/blog" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">📰</span>
              Blog
            </div>
          </RouterLink>
          <RouterLink to="/marketing_management/marketing/assets" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">🖼️</span>
              Assets
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Analytics & Reports (accordion) -->
      <div>
        <div
          @click="toggleMenu('analytics')"
          class="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-700/50 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <span class="text-lg">📈</span>
            <span>Analytics</span>
          </div>
          <span class="text-xs transition-transform duration-300" :class="openMenus.analytics ? 'rotate-90' : ''">
            ▶
          </span>
        </div>
        <div v-show="openMenus.analytics" class="ml-6 space-y-1 mt-1">
          <RouterLink to="/marketing_management/marketing/analyticsDashboard" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">📊</span>
              Dashboard
            </div>
          </RouterLink>
          <RouterLink to="/marketing_management/marketing/reports" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">📉</span>
              Reports
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Team (no submenu) -->
      <RouterLink to="/marketing_management/marketing/team" v-slot="{ isActive }">
        <div
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-xl transition cursor-pointer',
            isActive
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
              : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
          ]"
        >
          <span class="text-lg">👥</span>
          Team
        </div>
      </RouterLink>

      <!-- Settings (no submenu) -->
      <RouterLink to="/marketing_management/marketing/settings" v-slot="{ isActive }">
        <div
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-xl transition cursor-pointer',
            isActive
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
              : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
          ]"
        >
          <span class="text-lg">⚙️</span>
          Settings
        </div>
      </RouterLink>

    </nav>

    <!-- Logout -->
    <div class="p-4 border-t border-slate-700">
      <button
        class="w-full bg-red-600/20 text-red-400 py-3 rounded-xl font-medium hover:bg-red-600/30 hover:text-red-300 transition flex items-center justify-center gap-2"
      >
        <span class="text-lg">🚪</span>
        Logout
      </button>
    </div>
  </aside>
</template>

<style scoped>
.transition {
  transition: all 0.2s ease;
}
.rotate-90 {
  transform: rotate(90deg);
}
.bg-purple-600\/20 {
  background-color: rgba(124, 58, 237, 0.2);
}
aside::-webkit-scrollbar {
  width: 4px;
}
aside::-webkit-scrollbar-track {
  background: transparent;
}
aside::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}
aside::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>