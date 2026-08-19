<template>
  <div class="px-2 bg-slate-50 py-5 w-11/12 mx-auto min-h-screen">
    <!-- Header -->
    <div class="rounded-2xl text-white px-8 py-6 mb-6 relative overflow-hidden" style="background: linear-gradient(135deg, #0f766e 0%, #0d9488 40%, #14b8a6 70%, #5eead4 100%);">
      <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px); background-size: 40px 40px;"></div>
      <div class="relative z-10 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold tracking-tight" style="font-family: 'Georgia', serif;">Trainer Management</h1>
          <p class="text-teal-100 mt-1 text-sm font-medium">Manage trainer profiles, skills, courses & schedules</p>
        </div>
        <div class="flex items-center gap-3">
          <div class="bg-white/20 backdrop-blur rounded-xl px-4 py-2 text-center">
            <div class="text-2xl font-bold">{{ trainers.length }}</div>
            <div class="text-xs text-teal-100">Total Trainers</div>
          </div>
          <div class="bg-white/20 backdrop-blur rounded-xl px-4 py-2 text-center">
            <div class="text-2xl font-bold">{{ trainers.filter(t => t.status == 1).length }}</div>
            <div class="text-xs text-teal-100">Active</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters Panel -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-5">
      <div class="flex items-center gap-2 mb-4">
        <div class="w-2 h-6 rounded-full bg-teal-500"></div>
        <h2 class="font-semibold text-slate-700 text-sm uppercase tracking-wider">Filter Trainers</h2>
        <button @click="resetFilters" class="ml-auto text-xs text-teal-600 hover:text-teal-800 font-medium border border-teal-200 hover:border-teal-400 px-3 py-1 rounded-full transition-all">
          ↺ Reset All
        </button>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <!-- Search -->
        <div class="relative lg:col-span-2">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input v-model="filters.search" type="text" placeholder="Search trainer, email, skill..." class="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent bg-slate-50" />
        </div>
        
        <!-- Status Filter -->
        <select v-model="filters.status" class="px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 bg-slate-50 text-slate-600">
          <option value="">All Status</option>
          <option value="0">⏳ Pending</option>
          <option value="1">✅ Approved</option>
          <option value="2">❌ Rejected</option>
        </select>
       
        <!-- Solution Filter - From API -->
        <select v-model="filters.solution_id" class="px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50 text-slate-600">
          <option value="">All Solutions</option>
          <option v-for="sol in solutions" :key="sol.id" :value="sol.id">{{ sol.name }}</option>
        </select>
        
        <!-- Software Filter - From API -->
        <select v-model="filters.software_id" class="px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 bg-slate-50 text-slate-600">
          <option value="">All Software</option>
          <option v-for="sw in softwares" :key="sw.id" :value="sw.id">{{ sw.name }}</option>
        </select>
        
        <!-- Analysis Filter -->
        <select v-model="filters.analysis" class="px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-slate-50 text-slate-600">
          <option value="">All Analysis Types</option>
          <option v-for="a in analysisTypeList" :key="a.id" :value="a.name">{{ a.icon }} {{ a.name }}</option>
        </select>
        
        <!-- Course Filter -->
        <select v-model="filters.course_id" class="px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-slate-50 text-slate-600">
          <option value="">All Courses</option>
          <option v-for="c in courses" :key="c.id" :value="c.id">{{ c.name }}</option>
        </select>
      </div>

      <!-- Active filter chips -->
      <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-100">
        <span class="text-xs text-slate-500 self-center">Active:</span>
        <span v-if="filters.search" class="inline-flex items-center gap-1 px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-medium border border-teal-200">
          🔍 "{{ filters.search }}" <button @click="filters.search=''" class="ml-1 hover:text-teal-900">×</button>
        </span>
        <span v-if="filters.status !== ''" class="inline-flex items-center gap-1 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium border border-yellow-200">
          Status: {{ filters.status == 0 ? 'Pending' : filters.status == 1 ? 'Approved' : 'Rejected' }} <button @click="filters.status=''" class="ml-1">×</button>
        </span>
        <span v-if="filters.solution_id" class="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium border border-purple-200">
          Solution: {{ getSolutionName(filters.solution_id) }} <button @click="filters.solution_id=''" class="ml-1">×</button>
        </span>
        <span v-if="filters.software_id" class="inline-flex items-center gap-1 px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-medium border border-orange-200">
          Software: {{ getSoftwareName(filters.software_id) }} <button @click="filters.software_id=''" class="ml-1">×</button>
        </span>
        <span v-if="filters.analysis" class="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium border border-indigo-200">
          Analysis: {{ filters.analysis }} <button @click="filters.analysis=''" class="ml-1">×</button>
        </span>
        <span v-if="filters.course_id" class="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
          Course: {{ courses.find(c=>c.id==filters.course_id)?.name }} <button @click="filters.course_id=''" class="ml-1">×</button>
        </span>
      </div>
    </div>

    <!-- Table Card -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <!-- Loading -->
      <div v-if="loading" class="flex justify-center items-center py-16">
        <span class="loading loading-spinner loading-lg text-teal-600"></span>
        <span class="ml-3 text-slate-500 font-medium">Loading trainers...</span>
      </div>

      <!-- Table -->
      <div v-else class="overflow-x-auto">
        <table class="table w-full border-collapse">
          <thead>
            <tr style="background: linear-gradient(to right, #f0fdfa, #eff6ff, #faf5ff);">
              <th class="border border-slate-200 px-4 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider w-12">#</th>
              <th class="border border-slate-200 px-4 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Trainer</th>
              <th class="border border-slate-200 px-4 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
              <th class="border border-slate-200 px-4 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Skills</th>
              <th class="border border-slate-200 px-4 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Courses</th>
              <th class="border border-slate-200 px-4 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Schedules</th>
              <th class="border border-slate-200 px-4 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th class="border border-slate-200 px-4 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(trainer, index) in paginatedTrainers"
              :key="trainer.id"
              class="hover:bg-slate-50/80 transition-colors group"
              :class="index % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'"
            >
              <!-- ID -->
              <td class="border border-slate-200 px-4 py-4">
                <span class="text-xs font-mono font-bold text-slate-400">#{{ trainer.id }}</span>
              </td>

              <!-- Trainer Info -->
              <td class="border border-slate-200 px-4 py-4 min-w-[200px]">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                       :style="`background: linear-gradient(135deg, ${avatarGradient(trainer.user?.name)})`">
                    {{ initials(trainer.user?.name) }}
                  </div>
                  <div>
                    <div class="font-semibold text-slate-800 text-sm">{{ trainer.user?.name }}</div>
                    <div class="text-xs text-slate-400 mt-0.5">ID: {{ trainer.user_id }}</div>
                    <div v-if="trainer.address" class="text-xs text-slate-400 truncate max-w-[140px]">📍 {{ trainer.address }}</div>
                  </div>
                </div>
              </td>

              <!-- Contact -->
              <td class="border border-slate-200 px-4 py-4 min-w-[200px]">
                <div class="space-y-1.5">
                  <div class="flex items-center gap-2 text-xs text-slate-600">
                    <span class="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">✉</span>
                    <span class="truncate max-w-[160px]">{{ trainer.user?.email }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-xs text-slate-500">
                    <span class="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">📞</span>
                    <span>{{ trainer.phone || 'Not provided' }}</span>
                  </div>
                  <a v-if="trainer.linkedin_profile" :href="trainer.linkedin_profile" target="_blank"
                     class="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-800 font-medium">
                    <span class="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">in</span>
                    LinkedIn
                  </a>
                </div>
              </td>

              <!-- Skills - Show software and solution info -->
              <td class="border border-slate-200 px-4 py-4 min-w-[220px]">
                <div class="space-y-2">
                  <!-- Skills by type -->
                  <div v-for="skill in trainer.skills" :key="skill.id" class="flex flex-wrap gap-1.5">
                    <span class="px-2 py-0.5 rounded-full text-xs font-medium" :class="getSkillColor(skill.skill_type)">
                      {{ getSkillTypeName(skill.skill_type) }}
                    </span>
                    <!-- Show solution if exists -->
                    <span v-if="skill.solution" class="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      📦 {{ skill.solution.name }}
                    </span>
                    <!-- Show software if exists -->
                    <span v-if="skill.software" class="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      💻 {{ skill.software.name }}
                    </span>
                    <!-- Show analysis if exists -->
                    <span v-if="skill.analysis" class="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      📊 {{ skill.analysis }}
                    </span>
                  </div>
                  <div v-if="!trainer.skills || trainer.skills.length === 0" class="text-xs text-slate-400 italic">No skills assigned</div>
                </div>
               
              </td>

              <!-- Courses -->
              <td class="border border-slate-200 px-4 py-4 min-w-[360px]">
                <div class="space-y-1.5">
                  <div v-for="course in trainer.courses" :key="course.id"
                       class="flex items-start gap-2 p-2 rounded-lg border text-xs"
                       :class="courseStyle(course.training_course?.level)">
                    <div class="min-w-0 flex-1">
                      <div class="font-medium truncate max-w-[360px]">{{ course.training_course?.name }}</div>
                      <div class="flex gap-1 mt-0.5 flex-wrap">
                        <span class="px-1.5 py-0.5 rounded bg-white/60 text-xs">{{ course.training_course?.code }}</span>
                        <span class="px-1.5 py-0.5 rounded bg-white/60 text-xs">{{ course.training_course?.duration }}</span>
                        <span class="px-1.5 py-0.5 rounded bg-white/60 text-xs capitalize">{{ course.training_course?.type == "onsite" ? "Training" : "Lunch and Learn" }}</span>
                        <span v-if="course.training_course?.software" class="px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 text-xs">🖥️ {{ course.training_course.software.name }}</span>
                        <span v-if="course.training_course?.solution" class="px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 text-xs">📦 {{ course.training_course.solution.name }}</span>
                      </div>
                    </div>
                  </div>
                  <span v-if="!trainer.courses || trainer.courses.length === 0" class="text-xs text-slate-400 italic">No courses assigned</span>
                </div>
              </td>

              <!-- Schedules -->
              <td class="border border-slate-200 px-4 py-4 min-w-[200px]">
                <div class="space-y-1.5">
                  <div v-for="schedule in trainer.prefered_schedules" :key="schedule.id"
                       class="flex items-center gap-2 p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                    <span class="text-base">📅</span>
                    <div>
                      <div class="font-medium text-slate-700">{{ formatDays(schedule.days) }}</div>
                      <div class="text-slate-400">{{ schedule.start_time }} - {{ schedule.end_time }}</div>
                    </div>
                    <span class="ml-auto px-1.5 py-0.5 rounded-full text-xs"
                          :class="schedule.status == '0' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
                      {{ schedule.status == '0' ? 'Active' : 'Inactive' }}
                    </span>
                  </div>
                  <span v-if="!trainer.prefered_schedules || trainer.prefered_schedules.length === 0" class="text-xs text-slate-400 italic">No schedules</span>
                </div>
              </td>

              <!-- Status -->
              <td class="border border-slate-200 px-4 py-4">
                <span class="px-3 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1"
                      :class="{
                        'bg-amber-100 text-amber-800 border border-amber-200': trainer.status == 0,
                        'bg-emerald-100 text-emerald-800 border border-emerald-200': trainer.status == 1,
                        'bg-red-100 text-red-800 border border-red-200': trainer.status == 2
                      }">
                  <span>{{ trainer.status == 0 ? '⏳' : trainer.status == 1 ? '✅' : '❌' }}</span>
                  {{ trainer.status == 0 ? 'Pending' : trainer.status == 1 ? 'Approved' : 'Rejected' }}
                </span>
              </td>

              <!-- Actions -->
              <td class="border border-slate-200 px-4 py-4">
                <div class="flex flex-col gap-1.5">
                  <button @click="viewDetails(trainer)" class="btn btn-xs rounded-lg text-white text-xs" style="background: #0891b2; border-color: #0891b2;">
                    👁 View
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="filteredTrainers.length === 0" class="text-center py-16 text-slate-400">
          <div class="text-6xl mb-4">🔍</div>
          <p class="text-lg font-medium text-slate-500">No trainers found</p>
          <p class="text-sm mt-1">Try adjusting your filters</p>
          <button @click="resetFilters" class="mt-4 text-teal-600 text-sm font-medium hover:underline">Clear all filters</button>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="filteredTrainers.length > 0" class="flex justify-between items-center px-6 py-4 border-t border-slate-200 bg-slate-50/50">
        <div class="text-sm text-slate-500">
          Showing <span class="font-semibold text-slate-700">{{ Math.min((currentPage - 1) * itemsPerPage + 1, filteredTrainers.length) }}–{{ Math.min(currentPage * itemsPerPage, filteredTrainers.length) }}</span> of <span class="font-semibold text-slate-700">{{ filteredTrainers.length }}</span> trainers
        </div>
        <div class="join">
          <button class="join-item btn btn-sm" :disabled="currentPage === 1" @click="currentPage--">‹ Prev</button>
          <button v-for="p in totalPages" :key="p" class="join-item btn btn-sm" :class="p === currentPage ? 'btn-active bg-teal-600 text-white border-teal-600' : ''" @click="currentPage = p">{{ p }}</button>
          <button class="join-item btn btn-sm" :disabled="currentPage === totalPages" @click="currentPage++">Next ›</button>
        </div>
      </div>
    </div>

    <!-- View Details Modal -->
    <div v-if="selectedTrainer" class="modal modal-open">
      <div class="modal-box max-w-4xl p-0 overflow-hidden">
        <!-- Modal Header -->
        <div class="px-8 py-5 text-white relative overflow-hidden" style="background: linear-gradient(135deg, #0f766e, #0d9488);">
          <div class="flex items-center gap-4 relative z-10">
            <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
                 :style="`background: rgba(255,255,255,0.25)`">
              {{ initials(selectedTrainer.user?.name) }}
            </div>
            <div>
              <h3 class="text-xl font-bold">{{ selectedTrainer.user?.name }}</h3>
              <p class="text-teal-100 text-sm">{{ selectedTrainer.user?.email }}</p>
              <span class="px-2 py-0.5 rounded-full text-xs font-semibold mt-1 inline-block"
                    :class="{
                      'bg-amber-400/30 text-amber-100': selectedTrainer.status == 0,
                      'bg-emerald-400/30 text-emerald-100': selectedTrainer.status == 1,
                      'bg-red-400/30 text-red-100': selectedTrainer.status == 2
                    }">
                {{ selectedTrainer.status == 0 ? '⏳ Pending' : selectedTrainer.status == 1 ? '✅ Approved' : '❌ Rejected' }}
              </span>
            </div>
          </div>
          <button @click="selectedTrainer = null" class="absolute top-4 right-4 text-white/80 hover:text-white text-xl font-bold">×</button>
        </div>

        <div class="p-6 overflow-y-auto max-h-[70vh]">
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div class="text-xs text-slate-400 mb-1 uppercase tracking-wide font-semibold">Phone</div>
              <div class="text-slate-700 font-medium">{{ selectedTrainer.phone || 'Not provided' }}</div>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div class="text-xs text-slate-400 mb-1 uppercase tracking-wide font-semibold">Expertise Area</div>
              <div class="text-slate-700 font-medium">{{ selectedTrainer.expertise_area || 'Not specified' }}</div>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 col-span-2">
              <div class="text-xs text-slate-400 mb-1 uppercase tracking-wide font-semibold">Address</div>
              <div class="text-slate-700">{{ selectedTrainer.address || 'Not provided' }}</div>
            </div>
            <div v-if="selectedTrainer.linkedin_profile" class="p-3 bg-blue-50 rounded-xl border border-blue-100 col-span-2">
              <div class="text-xs text-blue-400 mb-1 uppercase tracking-wide font-semibold">LinkedIn</div>
              <a :href="selectedTrainer.linkedin_profile" target="_blank" class="text-blue-600 hover:text-blue-800 text-sm break-all">{{ selectedTrainer.linkedin_profile }}</a>
            </div>
          </div>

          <!-- Bio -->
          <div class="mb-5">
            <div class="text-xs text-slate-400 mb-2 uppercase tracking-wide font-semibold">Biography</div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {{ selectedTrainer.bio || 'No biography provided.' }}
            </div>
          </div>

          <!-- Skills with software/solution details -->
          <div class="mb-5">
            <div class="text-xs text-slate-400 mb-2 uppercase tracking-wide font-semibold">Skills</div>
            <div class="space-y-3">
              <div v-for="skill in selectedTrainer.skills" :key="skill.id" class="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div class="flex flex-wrap gap-2 items-center">
                  <span class="px-3 py-1 rounded-full text-xs font-medium" :class="getSkillColor(skill.skill_type)">
                    {{ getSkillTypeName(skill.skill_type) }}
                  </span>
                  <span v-if="skill.solution" class="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    📦 Solution: {{ skill.solution.name }}
                  </span>
                  <span v-if="skill.software" class="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    💻 Software: {{ skill.software.name }}
                  </span>
                  <span v-if="skill.level" class="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    📊 Level: {{ skill.level }}
                  </span>
                </div>
                <div v-if="skill.analysis" class="mt-2 text-xs text-slate-600">
                  <span class="font-medium">Analysis:</span> {{ skill.analysis }}
                </div>
              </div>
            </div>
          </div>

          <!-- Courses -->
          <div class="mb-5">
            <div class="text-xs text-slate-400 mb-2 uppercase tracking-wide font-semibold">Assigned Courses</div>
            <div class="grid grid-cols-2 gap-2">
              <div v-for="course in selectedTrainer.courses" :key="course.id"
                   class="p-3 rounded-xl border text-xs" :class="courseStyle(course.training_course?.level)">
                <div class="font-bold text-sm">{{ course.training_course?.code }}</div>
                <div class="font-medium mt-0.5">{{ course.training_course?.name }}</div>
                <div class="flex gap-2 mt-1.5 text-xs opacity-80 flex-wrap">
                  <span class="capitalize">{{ course.training_course?.type == "onsite" ? "Training" : "Lunch and Learn"}}</span>
                  <span v-if="course.training_course?.software" class="text-orange-600">🖥️ {{ course.training_course.software.name }}</span>
                  <span v-if="course.training_course?.solution" class="text-purple-600">📦 {{ course.training_course.solution.name }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Schedules -->
          <div>
            <div class="text-xs text-slate-400 mb-2 uppercase tracking-wide font-semibold">Available Schedules</div>
            <div class="space-y-2">
              <div v-for="schedule in selectedTrainer.prefered_schedules" :key="schedule.id"
                   class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm">
                <span class="text-2xl">📅</span>
                <div class="flex-1">
                  <div class="font-medium text-slate-700">{{ formatDays(schedule.days) }} · {{ schedule.start_time }} - {{ schedule.end_time }}</div>
                  <div class="text-xs text-slate-400">Status: {{ schedule.status == '0' ? 'Active' : 'Inactive' }}</div>
                </div>
                <span class="px-2 py-1 rounded-full text-xs font-semibold"
                      :class="schedule.status == '0' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'">
                  {{ schedule.status == '0' ? 'Active' : 'Inactive' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-action px-6 py-4 border-t border-slate-200 bg-slate-50">
          <button class="btn btn-sm btn-ghost" @click="selectedTrainer = null">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from '@/components/ui/toast/use-toast'
import { ref, onMounted, computed, reactive, watch } from 'vue'
import api from '@/config/api'

const { toast } = useToast()

// ─── Static data ────────────────────────────────────────────────
const analysisTypeList = [
  { id: "dynamic", name: "Dynamic Analysis", icon: "📊" },
  { id: "static", name: "Static Analysis", icon: "⚖️" },
  { id: "thermal", name: "Thermal Analysis", icon: "🔥" },
  { id: "cfd", name: "CFD Analysis", icon: "🌊" },
  { id: "multibody", name: "Multibody Dynamic Analysis", icon: "⚙️" },
  { id: "fatigue", name: "Fatigue Analysis", icon: "🔄" },
  { id: "composite", name: "Composite Analysis", icon: "📐" },
  { id: "acoustics_analysis", name: "Acoustics Analysis", icon: "🎵" },
]

// ─── State ───────────────────────────────────────────────────────
const trainers = ref([])
const softwares = ref([])
const solutions = ref([])
const courses = ref([])
const selectedTrainer = ref(null)
const loading = ref(false)
const currentPage = ref(1)
const itemsPerPage = 10

// ─── Filters ─────────────────────────────────────────────────────
const filters = reactive({
  status: '',
  search: '',
  solution_id: '',
  software_id: '',
  course_id: '',
  analysis: '',
})

const hasActiveFilters = computed(() =>
  filters.search || filters.status !== '' || filters.solution_id || filters.software_id ||
  filters.course_id || filters.analysis
)

const resetFilters = () => {
  Object.keys(filters).forEach(k => filters[k] = '')
}

// ─── Helper functions for display ───────────────────────────────
const getSolutionName = (solutionId) => {
  const solution = solutions.value.find(s => s.id == solutionId)
  return solution?.name || 'Unknown'
}

const getSoftwareName = (softwareId) => {
  const software = softwares.value.find(s => s.id == softwareId)
  return software?.name || 'Unknown'
}

const getSkillTypeName = (skillType) => {
  const skillMap = {
    '1': 'Software Skill',
    '2': 'Solution Skill', 
    '3': 'Analysis Skill',
    '4': 'Other Skill'
  }
  return skillMap[skillType] || 'Skill'
}

const getSkillColor = (skillType) => {
  const colorMap = {
    '1': 'bg-orange-100 text-orange-800 border border-orange-200',
    '2': 'bg-purple-100 text-purple-800 border border-purple-200',
    '3': 'bg-green-100 text-green-800 border border-green-200',
    '4': 'bg-gray-100 text-gray-800 border border-gray-200'
  }
  return colorMap[skillType] || 'bg-gray-100 text-gray-800 border border-gray-200'
}

const formatDays = (daysJson) => {
  if (!daysJson) return 'No days set'
  try {
    const days = JSON.parse(daysJson)
    if (Array.isArray(days)) {
      return days.map(d => d.charAt(0).toUpperCase() + d.slice(1)).join(', ')
    }
    return daysJson
  } catch {
    return daysJson
  }
}

// ─── Filter logic with REAL DATA ─────────────────────────────────
const filteredTrainers = computed(() => {
  let list = [...trainers.value]

  // Status filter
  if (filters.status !== '') {
    list = list.filter(t => String(t.status) === String(filters.status))
  }

  // Search filter - search in skills, solutions, software too
  if (filters.search) {
    const s = filters.search.toLowerCase()
    list = list.filter(t =>
      t.user?.name?.toLowerCase().includes(s) ||
      t.user?.email?.toLowerCase().includes(s) ||
      t.phone?.toLowerCase().includes(s) ||
      t.expertise_area?.toLowerCase().includes(s) ||
      t.skills?.some(skill => 
        skill.solution?.name?.toLowerCase().includes(s) ||
        skill.software?.name?.toLowerCase().includes(s) ||
        getSkillTypeName(skill.skill_type).toLowerCase().includes(s)
      ) ||
      t.courses?.some(course => 
        course.training_course?.name?.toLowerCase().includes(s) ||
        course.training_course?.code?.toLowerCase().includes(s)
      )
    )
  }

  // Solution filter - Check in skills AND courses
  if (filters.solution_id) {
    list = list.filter(t => 
      t.skills?.some(skill => skill.solution_id == filters.solution_id) ||
      t.courses?.some(course => course.training_course?.solution_id == filters.solution_id)
    )
  }

  // Software filter - Check in skills AND courses
  if (filters.software_id) {
    list = list.filter(t => 
      t.skills?.some(skill => skill.software_id == filters.software_id) ||
      t.courses?.some(course => course.training_course?.software_id == filters.software_id)
    )
  }

  // Course filter
  if (filters.course_id) {
    list = list.filter(t => 
      t.courses?.some(course => course.training_course_id == filters.course_id)
    )
  }

// Analysis filter - ONLY check training_course.analysis field
if (filters.analysis) {
  list = list.filter(trainer => 
    trainer.courses?.some(course => 
      course.training_course?.analysis === filters.analysis
    )
  )
}
  return list
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredTrainers.value.length / itemsPerPage)))

const paginatedTrainers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredTrainers.value.slice(start, start + itemsPerPage)
})

// ─── UI helpers ──────────────────────────────────────────────────
const gradients = [
  '#0f766e, #0d9488', '#7c3aed, #a78bfa', '#1d4ed8, #60a5fa',
  '#b45309, #f59e0b', '#be185d, #f472b6', '#065f46, #34d399',
  '#1e3a8a, #6366f1', '#7f1d1d, #f87171',
]
const avatarGradient = (name) => {
  if (!name) return gradients[0]
  return gradients[name.charCodeAt(0) % gradients.length]
}
const initials = (name) => {
  if (!name) return '?'
  return name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase()
}
const courseStyle = (level) => {
  if (level === 'Advanced') return 'border-red-200 bg-red-50 text-red-900'
  if (level === 'Beginner') return 'border-amber-200 bg-amber-50 text-amber-900'
  return 'border-green-200 bg-green-50 text-green-900'
}

// ─── API Calls ─────────────────────────────────────────────────
const fetchTrainers = async () => {
  loading.value = true
  try {
    const response = await api().get('/trainer?with=user,skills.solution,skills.software,preferedSchedules,courses.trainingCourse')
    trainers.value = response.data.data || response.data || []
  } catch (e) {
    console.error(e)
    toast({ title: 'Error', description: 'Failed to load trainers', variant: 'destructive' })
  } finally {
    loading.value = false
  }
}

const fetchSoftwares = async () => {
  try {
    const response = await api().get('/softwares')
    softwares.value = response.data.data || []
  } catch (e) {
    console.error('Failed to fetch softwares:', e)
  }
}

const fetchSolutions = async () => {
  try {
    const response = await api().get('/solutions')
    solutions.value = response.data.data || []
  } catch (e) {
    console.error('Failed to fetch solutions:', e)
  }
}

const fetchCourses = async () => {
  try {
    const res = await api().get('/internal-trainings?status=2')
    courses.value = res.data.data || []
  } catch (e) { 
    console.error(e) 
  }
}

// ─── Actions ─────────────────────────────────────────────────────
const viewDetails = (trainer) => { 
  selectedTrainer.value = trainer 
}

// Watch filters to reset page
watch(() => filters, () => { currentPage.value = 1 }, { deep: true })

onMounted(() => {
  fetchTrainers()
  fetchSoftwares()
  fetchSolutions()
  fetchCourses()
})
</script>