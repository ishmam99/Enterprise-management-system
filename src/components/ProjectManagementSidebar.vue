<script setup>
import { ref } from 'vue'

// Accordion state
const openMenus = ref({
  projects: false,
  tasks: false,
  resources: false,
  reports: false
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
          <p class="text-xs text-slate-400">Project Management</p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="p-4 flex-1 space-y-1 overflow-y-auto">

      <!-- Overview (no submenu) -->
      <RouterLink to="/project_management" v-slot="{ isExactActive }">
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

      <!-- Projects (accordion) -->
      <div>
        <div
          @click="toggleMenu('projects')"
          class="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-700/50 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <span class="text-lg">📋</span>
            <span>Projects</span>
          </div>
          <span class="text-xs transition-transform duration-300" :class="openMenus.projects ? 'rotate-90' : ''">
            ▶
          </span>
        </div>
        <div v-show="openMenus.projects" class="ml-6 space-y-1 mt-1">
          <RouterLink to="/project_management/project/AllProjects" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">📄</span>
              All Projects
              <span class="ml-auto text-xs bg-purple-600/30 text-purple-300 px-2 py-0.5 rounded-full">12</span>
            </div>
          </RouterLink>
          <RouterLink to="/project_management/project/timeline" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">📅</span>
              Timeline
            </div>
          </RouterLink>
          <RouterLink to="/project_management/project/resources" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">📦</span>
              Resources
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Tasks (accordion) -->
      <div>
        <div
          @click="toggleMenu('tasks')"
          class="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-700/50 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <span class="text-lg">✅</span>
            <span>Tasks</span>
          </div>
          <span class="text-xs transition-transform duration-300" :class="openMenus.tasks ? 'rotate-90' : ''">
            ▶
          </span>
        </div>
        <div v-show="openMenus.tasks" class="ml-6 space-y-1 mt-1">
          <RouterLink to="/project_management/project/AllTasks" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">📋</span>
              All Tasks
              <span class="ml-auto text-xs bg-purple-600/30 text-purple-300 px-2 py-0.5 rounded-full">28</span>
            </div>
          </RouterLink>
          <RouterLink to="/project_management/project/BoardView" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">📌</span>
              Board View
            </div>
          </RouterLink>
          <RouterLink to="/project_management/project/MyTasks" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">👤</span>
              My Tasks
              <span class="ml-auto text-xs bg-purple-600/30 text-purple-300 px-2 py-0.5 rounded-full">6</span>
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Resources & Team (accordion) -->
      <div>
        <div
          @click="toggleMenu('resources')"
          class="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-700/50 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <span class="text-lg">👥</span>
            <span>Resources</span>
          </div>
          <span class="text-xs transition-transform duration-300" :class="openMenus.resources ? 'rotate-90' : ''">
            ▶
          </span>
        </div>
        <div v-show="openMenus.resources" class="ml-6 space-y-1 mt-1">
          <RouterLink to="/project_management/project/team" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">👥</span>
              Team
            </div>
          </RouterLink>
          <RouterLink to="/project_management/project/calendar" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">📆</span>
              Calendar
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Reports & Analytics (accordion) -->
      <div>
        <div
          @click="toggleMenu('reports')"
          class="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-700/50 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <span class="text-lg">📈</span>
            <span>Reports</span>
          </div>
          <span class="text-xs transition-transform duration-300" :class="openMenus.reports ? 'rotate-90' : ''">
            ▶
          </span>
        </div>
        <div v-show="openMenus.reports" class="ml-6 space-y-1 mt-1">
          <RouterLink to="/project_management/project/reports" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">📊</span>
              Project Reports
            </div>
          </RouterLink>
          <RouterLink to="/project_management/project/timesheets" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">⏱️</span>
              Timesheets
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Settings (no submenu) -->
      <RouterLink to="/project_management/project/settings" v-slot="{ isActive }">
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