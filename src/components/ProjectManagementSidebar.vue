<script setup>
import { ref } from 'vue'

const openMenus = ref({
  projects: false,
  milestones: false,
  tasks: false,
  timesheets: false,
  expenses: false,
  files: false,
  risks: false
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

      <!-- Overview -->
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

      <!-- Projects -->
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
          <RouterLink to="/project_management/project/allprojects" v-slot="{ isActive }">
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
              <span class="ml-auto text-xs bg-purple-600/30 text-purple-300 px-2 py-0.5 rounded-full">8</span>
            </div>
          </RouterLink>
          <RouterLink to="/project_management/project/createProject" v-slot="{ isActive }">
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
        </div>
      </div>

      <!-- Milestones -->
      <div>
        <div
          @click="toggleMenu('milestones')"
          class="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-700/50 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <span class="text-lg">🎯</span>
            <span>Milestones</span>
          </div>
          <span class="text-xs transition-transform duration-300" :class="openMenus.milestones ? 'rotate-90' : ''">
            ▶
          </span>
        </div>
        <div v-show="openMenus.milestones" class="ml-6 space-y-1 mt-1">
          <RouterLink to="/project_management/project/milestones" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">📌</span>
              All Milestones
              <span class="ml-auto text-xs bg-purple-600/30 text-purple-300 px-2 py-0.5 rounded-full">6</span>
            </div>
          </RouterLink>
          <RouterLink to="/project_management/project/createMilestone" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">➕</span>
              Add Milestone
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Tasks -->
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
          <RouterLink to="/project_management/project/tasks" v-slot="{ isActive }">
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
              <span class="ml-auto text-xs bg-purple-600/30 text-purple-300 px-2 py-0.5 rounded-full">12</span>
            </div>
          </RouterLink>
          <RouterLink to="/project_management/project/createTask" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">➕</span>
              Add Task
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Timesheets -->
      <div>
        <div
          @click="toggleMenu('timesheets')"
          class="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-700/50 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <span class="text-lg">⏱️</span>
            <span>Timesheets</span>
          </div>
          <span class="text-xs transition-transform duration-300" :class="openMenus.timesheets ? 'rotate-90' : ''">
            ▶
          </span>
        </div>
        <div v-show="openMenus.timesheets" class="ml-6 space-y-1 mt-1">
          <RouterLink to="/project_management/project/timesheets" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">📊</span>
              All Timesheets
              <span class="ml-auto text-xs bg-purple-600/30 text-purple-300 px-2 py-0.5 rounded-full">24</span>
            </div>
          </RouterLink>
          <RouterLink to="/project_management/project/createTimesheet" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">➕</span>
              Log Hours
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Expenses -->
      <div>
        <div
          @click="toggleMenu('expenses')"
          class="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-700/50 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <span class="text-lg">💰</span>
            <span>Expenses</span>
          </div>
          <span class="text-xs transition-transform duration-300" :class="openMenus.expenses ? 'rotate-90' : ''">
            ▶
          </span>
        </div>
        <div v-show="openMenus.expenses" class="ml-6 space-y-1 mt-1">
          <RouterLink to="/project_management/project/expenses" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">📊</span>
              All Expenses
              <span class="ml-auto text-xs bg-purple-600/30 text-purple-300 px-2 py-0.5 rounded-full">16</span>
            </div>
          </RouterLink>
          <RouterLink to="/project_management/project/createExpense" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">➕</span>
              Add Expense
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Files -->
      <div>
        <div
          @click="toggleMenu('files')"
          class="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-700/50 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <span class="text-lg">📁</span>
            <span>Files</span>
          </div>
          <span class="text-xs transition-transform duration-300" :class="openMenus.files ? 'rotate-90' : ''">
            ▶
          </span>
        </div>
        <div v-show="openMenus.files" class="ml-6 space-y-1 mt-1">
          <RouterLink to="/project_management/project/files" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">📄</span>
              All Files
              <span class="ml-auto text-xs bg-purple-600/30 text-purple-300 px-2 py-0.5 rounded-full">32</span>
            </div>
          </RouterLink>
          <RouterLink to="/project_management/project/uploadFile" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">➕</span>
              Upload File
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Risks -->
      <div>
        <div
          @click="toggleMenu('risks')"
          class="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-700/50 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <span class="text-lg">⚠️</span>
            <span>Risks</span>
          </div>
          <span class="text-xs transition-transform duration-300" :class="openMenus.risks ? 'rotate-90' : ''">
            ▶
          </span>
        </div>
        <div v-show="openMenus.risks" class="ml-6 space-y-1 mt-1">
          <RouterLink to="/project_management/project/risks" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">📋</span>
              All Risks
              <span class="ml-auto text-xs bg-purple-600/30 text-purple-300 px-2 py-0.5 rounded-full">5</span>
            </div>
          </RouterLink>
          <RouterLink to="/project_management/project/createRisk" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-purple-600/20 text-purple-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">➕</span>
              Add Risk
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