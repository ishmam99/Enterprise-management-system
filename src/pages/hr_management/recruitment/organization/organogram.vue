<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
    <!-- Header -->
    <div class="text-center mb-12">
      <div class="inline-flex items-center justify-center gap-3 mb-4">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 flex items-center justify-center">
          <Users class="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-800 to-blue-700 bg-clip-text text-transparent">
            HR Department Organogram
          </h1>
          <p class="text-gray-600 mt-2 max-w-3xl mx-auto text-sm md:text-base">
            Interactive hierarchical structure showing reporting lines, roles, and responsibilities within the Human Resources department
          </p>
        </div>
      </div>

      <!-- Stats -->
      <div class="flex flex-wrap justify-center gap-4 mt-8">
        <div class="stat-card">
          <div class="text-2xl font-bold text-indigo-700">4</div>
          <div class="text-sm text-gray-600">Managers</div>
        </div>
        <div class="stat-card">
          <div class="text-2xl font-bold text-blue-700">5</div>
          <div class="text-sm text-gray-600">Functional Teams</div>
        </div>
        <div class="stat-card">
          <div class="text-2xl font-bold text-emerald-700">12</div>
          <div class="text-sm text-gray-600">Total Roles</div>
        </div>
        <div class="stat-card">
          <div class="text-2xl font-bold text-violet-700">1</div>
          <div class="text-sm text-gray-600">CHRO</div>
        </div>
      </div>
    </div>

    <!-- Organogram Container -->
    <div class="relative max-w-7xl mx-auto">
      <!-- Connecting Lines (SVG) -->
      <svg class="absolute inset-0 w-full h-full pointer-events-none" style="z-index: 1;">
        <!-- CHRO to Managers -->
        <line x1="50%" y1="120" x2="12.5%" y2="240" stroke="#818cf8" stroke-width="2" stroke-dasharray="4" />
        <line x1="50%" y1="120" x2="37.5%" y2="240" stroke="#818cf8" stroke-width="2" stroke-dasharray="4" />
        <line x1="50%" y1="120" x2="62.5%" y2="240" stroke="#818cf8" stroke-width="2" stroke-dasharray="4" />
        <line x1="50%" y1="120" x2="87.5%" y2="240" stroke="#818cf8" stroke-width="2" stroke-dasharray="4" />

        <!-- Managers to Teams -->
        <line x1="12.5%" y1="240" x2="16.67%" y2="360" stroke="#93c5fd" stroke-width="1.5" stroke-dasharray="3" />
        <line x1="12.5%" y1="240" x2="33.33%" y2="360" stroke="#93c5fd" stroke-width="1.5" stroke-dasharray="3" />
        <line x1="37.5%" y1="240" x2="50%" y2="360" stroke="#93c5fd" stroke-width="1.5" stroke-dasharray="3" />
        <line x1="62.5%" y1="240" x2="66.67%" y2="360" stroke="#93c5fd" stroke-width="1.5" stroke-dasharray="3" />
        <line x1="62.5%" y1="240" x2="83.33%" y2="360" stroke="#93c5fd" stroke-width="1.5" stroke-dasharray="3" />
      </svg>

      <!-- Organizational Levels -->
      <div class="relative space-y-20 md:space-y-24" style="z-index: 10;">
        <!-- Level 1: CHRO -->
        <div class="flex justify-center">
          <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-gray-200 transition-all duration-300 hover:shadow-3xl hover:-translate-y-1 group">
            <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span class="px-4 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg">
                CHRO
              </span>
            </div>
            <div class="flex flex-col items-center">
              <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center mb-4 shadow-lg group-hover:scale-105 transition-transform">
                <Users class="w-10 h-10 text-white" />
              </div>
              <h2 class="text-xl font-bold text-gray-900">Chief Human Resources Officer</h2>
              <p class="text-gray-600 text-sm mt-2">Overall HR Strategy & Leadership</p>
              <div class="flex items-center gap-2 mt-3">
                <span class="px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full">
                  Direct Reports: 4
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Level 2: Managers -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 px-4">
          <div
            v-for="(manager, index) in managers"
            :key="manager.title"
            class="manager-card group"
            :class="managerCardColors[index]"
          >
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span class="text-xl font-bold text-white">{{ index + 1 }}</span>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-white mb-1">
                  {{ manager.title }}
                </h3>
                <p class="text-white/90 text-sm leading-relaxed">
                  {{ manager.description }}
                </p>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-white/20">
              <div class="flex items-center justify-between text-sm">
                <span class="text-white/80">Reports to: CHRO</span>
                <span class="px-2 py-1 bg-white/20 rounded-full text-white text-xs">
                  Manager Level
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Level 3: Functional Teams -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          <div
            v-for="(team, index) in teams"
            :key="team.name"
            class="team-card group"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full" :class="teamColors[index]"></div>
                <h3 class="font-bold text-gray-900 text-lg">
                  {{ team.name }}
                </h3>
              </div>
              <span class="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                {{ team.roles.length }} roles
              </span>
            </div>

            <div class="space-y-3 mb-4">
              <div
                v-for="(role, roleIndex) in team.roles"
                :key="role"
                class="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-gray-200 group-hover:border-gray-300 transition-colors"
              >
                <div class="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-100 to-blue-100 flex items-center justify-center flex-shrink-0">
                  <span class="text-sm font-medium text-indigo-700">{{ roleIndex + 1 }}</span>
                </div>
                <span class="text-gray-800 font-medium">{{ role }}</span>
              </div>
            </div>

            <div class="pt-4 border-t border-gray-200">
              <p class="text-sm text-gray-600 leading-relaxed">
                {{ team.responsibility }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Legend & Notes -->
    <div class="mt-20 max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Legend -->
        <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h4 class="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
            <AlertCircle class="w-5 h-5 text-indigo-600" />
            Reporting Structure Legend
          </h4>
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <div class="w-4 h-4 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600"></div>
              <span class="text-gray-700">Solid line: Direct reporting authority</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"></div>
              <span class="text-gray-700">Dashed line: Functional reporting</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-4 h-4 rounded-full bg-indigo-100 border-2 border-indigo-500"></div>
              <span class="text-gray-700">Executive level (CHRO)</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              <span class="text-gray-700">Managerial level</span>
            </div>
          </div>
        </div>

        <!-- Notes -->
        <div class="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl shadow-lg p-6 border border-indigo-100">
          <h4 class="font-bold text-indigo-900 text-lg mb-4 flex items-center gap-2">
            <Info class="w-5 h-5 text-indigo-600" />
            Organizational Notes
          </h4>
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div>
              <span class="text-gray-700">Each manager oversees specific functional areas with clear accountability</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div>
              <span class="text-gray-700">Teams collaborate across functions for integrated HR service delivery</span>
            </li>
            <li class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div>
              <span class="text-gray-700">Structure supports agile response to organizational needs and compliance requirements</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Footer Actions -->
    <div class="mt-12 flex justify-center gap-4">
      <button class="action-btn bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50">
        <Download class="w-5 h-5" />
        Export Organogram
      </button>
      <button class="action-btn bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700">
        <Users class="w-5 h-5" />
        View Team Details
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  Users,
  Download,
  AlertCircle,
  Info
} from 'lucide-vue-next'

const managers = ref([
  {
    title: 'HR Manager',
    description: 'Oversees HR policies, employee relations, and daily HR operations.',
  },
  {
    title: 'Recruitment Manager',
    description: 'Manages hiring processes, interviews, and talent acquisition.',
  },
  {
    title: 'Compensation & Benefits Manager',
    description: 'Handles payroll, benefits, and salary structures.',
  },
  {
    title: 'HR Operations Manager',
    description: 'Ensures compliance, attendance, and HR documentation.',
  },
])

const teams = ref([
  {
    name: 'Recruitment & Talent Acquisition',
    roles: [
      'Senior Recruiter',
      'Junior Recruiter',
      'Interview Coordinator',
    ],
    responsibility: 'Responsible for hiring, candidate screening, interviews, and onboarding.',
  },
  {
    name: 'Employee Relations & Engagement',
    roles: [
      'Employee Relations Officer',
      'Engagement Executive',
    ],
    responsibility: 'Maintains employee satisfaction, conflict resolution, and engagement programs.',
  },
  {
    name: 'Payroll & Compensation',
    roles: [
      'Payroll Officer',
      'Compensation Analyst',
    ],
    responsibility: 'Processes salaries, incentives, bonuses, and benefits.',
  },
  {
    name: 'Training & Development',
    roles: [
      'Training Coordinator',
      'L&D Specialist',
    ],
    responsibility: 'Organizes employee training, learning programs, and skill development.',
  },
  {
    name: 'HR Operations & Compliance',
    roles: [
      'HR Executive',
      'Compliance Officer',
    ],
    responsibility: 'Manages attendance, leave, policies, and legal compliance.',
  },
])

// Color schemes for manager cards
const managerCardColors = [
  'bg-gradient-to-r from-indigo-600 to-purple-600',
  'bg-gradient-to-r from-blue-600 to-cyan-600',
  'bg-gradient-to-r from-violet-600 to-fuchsia-600',
  'bg-gradient-to-r from-sky-600 to-blue-600',
]

// Color schemes for team indicators
const teamColors = [
  'bg-gradient-to-r from-indigo-500 to-purple-500',
  'bg-gradient-to-r from-emerald-500 to-teal-500',
  'bg-gradient-to-r from-amber-500 to-orange-500',
  'bg-gradient-to-r from-rose-500 to-pink-500',
  'bg-gradient-to-r from-cyan-500 to-blue-500',
]
</script>

<style scoped>
.manager-card {
  @apply rounded-xl p-5 shadow-lg transition-all duration-300
         hover:shadow-2xl hover:-translate-y-1;
}

.team-card {
  @apply bg-white rounded-xl p-5 shadow-lg border border-gray-200
         transition-all duration-300 hover:shadow-xl hover:border-gray-300;
}

.stat-card {
  @apply bg-white/80 backdrop-blur-sm rounded-xl px-6 py-4 shadow-md
         border border-gray-200 min-w-[140px];
}

.action-btn {
  @apply px-6 py-3 rounded-xl font-medium transition-all duration-300
         shadow-md hover:shadow-lg flex items-center gap-2;
}
</style>
