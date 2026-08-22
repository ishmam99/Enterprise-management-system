<script setup>
import { ref } from 'vue'

// Accordion state for each module
const openMenus = ref({
  partners: false,
  markets: false,
  competitors: false,
  projects: false,
  meetings: false,
  referrals: false
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
          <p class="text-xs text-slate-400">Business Development</p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="p-4 flex-1 space-y-1 overflow-y-auto">
      <!-- Dashboard -->
      <RouterLink to="/business_management" v-slot="{ isExactActive }">
        <div
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-xl transition cursor-pointer',
            isExactActive
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
              : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
          ]"
        >
          <span class="text-lg">📊</span>
          Dashboard
        </div>
      </RouterLink>

      <!-- Partners -->
      <div>
        <div
          @click="toggleMenu('partners')"
          class="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-700/50 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <span class="text-lg">🤝</span>
            <span>Business Partners</span>
          </div>
          <span
            class="text-xs transition-transform duration-300"
            :class="openMenus.partners ? 'rotate-90' : ''"
          >
            ▶
          </span>
        </div>
        <div v-show="openMenus.partners" class="ml-6 space-y-1 mt-1">
          <RouterLink to="/business_management/business/partners" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">📋</span>
              All Partners
              <span
                class="ml-auto text-xs bg-purple-600/30 text-purple-300 px-2 py-0.5 rounded-full"
                >12</span
              >
            </div>
          </RouterLink>
          <RouterLink to="/business_management/business/createPartner" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">➕</span>
              Add Partner
            </div>
          </RouterLink>
          <RouterLink to="/business_management/business/partnerAnalytics" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">📈</span>
              Partner Analytics
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Markets -->
      <div>
        <div
          @click="toggleMenu('markets')"
          class="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-700/50 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <span class="text-lg">🌍</span>
            <span>Markets</span>
          </div>
          <span
            class="text-xs transition-transform duration-300"
            :class="openMenus.markets ? 'rotate-90' : ''"
          >
            ▶
          </span>
        </div>
        <div v-show="openMenus.markets" class="ml-6 space-y-1 mt-1">
          <RouterLink to="/business_management/business/markets" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">📋</span>
              All Markets
              <span
                class="ml-auto text-xs bg-purple-600/30 text-purple-300 px-2 py-0.5 rounded-full"
                >6</span
              >
            </div>
          </RouterLink>
          <RouterLink to="/business_management/business/createMarket" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">➕</span>
              Add Market
            </div>
          </RouterLink>
          <RouterLink to="/business_management/business/marketStrategies" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">🧠</span>
              Market Strategies
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Competitors -->
      <div>
        <div
          @click="toggleMenu('competitors')"
          class="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-700/50 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <span class="text-lg">🏆</span>
            <span>Competitors</span>
          </div>
          <span
            class="text-xs transition-transform duration-300"
            :class="openMenus.competitors ? 'rotate-90' : ''"
          >
            ▶
          </span>
        </div>
        <div v-show="openMenus.competitors" class="ml-6 space-y-1 mt-1">
          <RouterLink to="/business_management/business/competitors" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">📋</span>
              All Competitors
              <span
                class="ml-auto text-xs bg-purple-600/30 text-purple-300 px-2 py-0.5 rounded-full"
                >8</span
              >
            </div>
          </RouterLink>
          <RouterLink to="/business_management/business/createCompetitor" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">➕</span>
              Add Competitor
            </div>
          </RouterLink>
          <RouterLink to="/business_management/business/competitiveAnalysis" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">🔍</span>
              Competitive Analysis
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Strategic Projects -->
      <div>
        <div
          @click="toggleMenu('projects')"
          class="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-700/50 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <span class="text-lg">🚀</span>
            <span>Strategic Projects</span>
          </div>
          <span
            class="text-xs transition-transform duration-300"
            :class="openMenus.projects ? 'rotate-90' : ''"
          >
            ▶
          </span>
        </div>
        <div v-show="openMenus.projects" class="ml-6 space-y-1 mt-1">
          <RouterLink to="/business_management/business/StrategicProjects" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">📋</span>
              All Projects
              <span
                class="ml-auto text-xs bg-purple-600/30 text-purple-300 px-2 py-0.5 rounded-full"
                >4</span
              >
            </div>
          </RouterLink>
          <RouterLink to="/business_management/business/createProject" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">➕</span>
              Add Project
            </div>
          </RouterLink>
          <RouterLink to="/business_management/business/projectTimeline" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">📅</span>
              Project Timeline
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Meetings -->
      <div>
        <div
          @click="toggleMenu('meetings')"
          class="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-700/50 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <span class="text-lg">📅</span>
            <span>Meetings</span>
          </div>
          <span
            class="text-xs transition-transform duration-300"
            :class="openMenus.meetings ? 'rotate-90' : ''"
          >
            ▶
          </span>
        </div>
        <div v-show="openMenus.meetings" class="ml-6 space-y-1 mt-1">
          <RouterLink to="/business_management/business/meetings" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">📋</span>
              All Meetings
              <span
                class="ml-auto text-xs bg-purple-600/30 text-purple-300 px-2 py-0.5 rounded-full"
                >8</span
              >
            </div>
          </RouterLink>
          <RouterLink to="/business_management/business/scheduleMeeting" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">➕</span>
              Schedule Meeting
            </div>
          </RouterLink>
          <RouterLink to="/business_management/business/calendarView" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">📆</span>
              Calendar View
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Referrals -->
      <div>
        <div
          @click="toggleMenu('referrals')"
          class="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-700/50 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <span class="text-lg">🔄</span>
            <span>Referrals</span>
          </div>
          <span
            class="text-xs transition-transform duration-300"
            :class="openMenus.referrals ? 'rotate-90' : ''"
          >
            ▶
          </span>
        </div>
        <div v-show="openMenus.referrals" class="ml-6 space-y-1 mt-1">
          <RouterLink to="/business_management/business/referrals" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">📋</span>
              All Referrals
              <span
                class="ml-auto text-xs bg-purple-600/30 text-purple-300 px-2 py-0.5 rounded-full"
                >5</span
              >
            </div>
          </RouterLink>
          <RouterLink to="/business_management/business/createReferral" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">➕</span>
              Add Referral
            </div>
          </RouterLink>
          <RouterLink to="/business_management/business/referralAnalytics" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">📈</span>
              Referral Analytics
            </div>
          </RouterLink>
        </div>
      </div>
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
