<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">

    <!-- Hero Banner -->
    <div class="relative bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <div class="relative pt-12 pb-8 px-4 text-center">
        <div class="max-w-5xl mx-auto">
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-5 py-2 mb-5 border border-white/20 shadow-lg">
            <span class="text-yellow-300 text-lg">🎓</span>
            <span class="text-sm font-semibold tracking-wide">100% FREE Training with Every License</span>
            <span class="text-yellow-300 text-lg">✨</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
            MSC Software Training Enrollment
          </h1>
          <p class="text-indigo-200 text-lg max-w-3xl mx-auto">
            Select your analysis type, course track, and enrollment type to see real-time pricing and course details
          </p>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50/20 to-transparent"></div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="max-w-7xl mx-auto px-4 py-20 text-center">
      <div class="inline-block">
        <div class="relative">
          <div class="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-8 h-8 bg-indigo-100 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
      <p class="mt-6 text-gray-600 font-medium">Loading training programs...</p>
    </div>

    <div v-else class="mx-44 px-4 py-10">

      <!-- Main Enrollment Card -->
      <div class="bg-blue-100 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-3xl">

        <!-- Card Header with Stepper -->
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h2 class="text-2xl font-bold text-white flex items-center gap-3">
                <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                Enrollment Wizard
              </h2>
              <p class="text-indigo-100 text-sm mt-1 ml-1">Complete all 4 steps to see your personalized training package</p>
            </div>
            <div class="text-right">
              <div class="inline-flex items-center gap-1 bg-white/10 rounded-lg px-3 py-1">
                <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span class="text-xs text-indigo-100">Real-time pricing</span>
              </div>
            </div>
          </div>

          <!-- Stepper -->
          <div class="mt-8">
            <div class="relative flex items-center justify-between max-w-4xl mx-auto">
              <div class="absolute top-5 left-0 right-0 h-0.5 bg-white/20 rounded-full"></div>
              <div
                class="absolute top-5 left-0 h-0.5 bg-green-400 rounded-full transition-all duration-500"
                :style="{ width: `${progressWidth}%` }"
              ></div>

              <div v-for="(step, index) in steps" :key="step.key" class="relative flex flex-col items-center z-10">
                <div :class="[
                  'w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-lg transform hover:scale-105',
                  step.completed ? 'bg-green-500 text-white ring-4 ring-green-300' : 'bg-white/25 text-white'
                ]">
                  <span v-if="step.completed" class="text-lg">✓</span>
                  <span v-else>{{ index + 1 }}</span>
                </div>
                <span class="text-xs mt-2 font-semibold text-white/90">{{ step.label }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Dropdowns Section -->
        <div class="p-8">
          <div class="grid md:grid-cols-2 gap-8">

            <!-- Step 1: Analysis Type -->
            <div class="group">
              <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">1</span>
                Select Analysis Type <span class="text-red-500">*</span>
              </label>
              <select
                v-model="selectedAnalysisTypeId"
                @change="onAnalysisTypeChange"
                class="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-indigo-300 cursor-pointer"
              >
                <option disabled value="">— Choose an analysis type —</option>
                <option v-for="analysis in analysisTypeList" :key="analysis.id" :value="analysis.id">
                  {{ analysis.icon }} {{ analysis.name }}
                </option>
              </select>
            </div>

            <!-- Step 2: Course Type -->
            <div class="group">
              <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">2</span>
                Course Type <span class="text-red-500">*</span>
              </label>
              <select
                v-model="selectedCourseType"
                @change="onCourseTypeChange"
                class="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-indigo-300 cursor-pointer"
              >
                <option disabled value="">— Select course type —</option>
                <option value="basic">🎯 Basic (Fundamentals)</option>
                <option value="advanced">🚀 Advanced (Mastery)</option>
                <option value="lunchlearn">🍱 Lunch & Learn (Webinar)</option>
              </select>
            </div>

            <!-- Step 3: Specific Course -->
            <div class="group">
              <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">3</span>
                Select Course <span class="text-red-500">*</span>
              </label>
              <select
                v-model="selectedCourse"
                @change="onCourseChange"
                :disabled="!availableCourses.length"
                class="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option disabled value="">
                  — {{ availableCourses.length ? 'Choose a course' : 'Select analysis type & course type first' }} —
                </option>
                <option v-for="course in availableCourses" :key="course.id" :value="course">
                  {{ course.name }} ({{ getCourseDurationDays(course.duration) }} day{{ getCourseDurationDays(course.duration) > 1 ? 's' : '' }})
                </option>
              </select>
            </div>

            <!-- Step 4: Enrollment Type -->
            <div class="group">
              <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">4</span>
                Enrollment Type <span class="text-red-500">*</span>
              </label>
              <select
                v-model="selectedEnrollmentType"
                @change="onEnrollmentTypeChange"
                class="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-indigo-300 cursor-pointer"
              >
                <option disabled value="">— Select enrollment type —</option>
                <option value="individual">👤 Individual</option>
                <option value="group">👥 Group</option>
                <option value="jumbo">🏢 Company</option>
              </select>
            </div>

            <!-- Preferred Start Date (individual / jumbo only) -->
            <div
              v-if="selectedEnrollmentType === 'individual' || selectedEnrollmentType === 'jumbo'"
              class="mt-2 col-span-2"
            >
              <div class="bg-gradient-to-r from-green-50 via-teal-50 to-green-50 rounded-2xl p-6 border border-green-200">
                <div class="flex items-center gap-2 mb-5">
                  <div class="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center">
                    <span class="text-green-700 text-lg">📅</span>
                  </div>
                  <h3 class="font-bold text-gray-800 text-lg">Preferred Start Date</h3>
                  <span class="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full ml-2">Optional</span>
                </div>
                <input
                  v-model="preferredStartDate"
                  type="date"
                  :min="new Date().toISOString().split('T')[0]"
                  class="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white"
                />
              </div>
            </div>
          </div>

          <!-- Group: Schedule Picker -->
          <div v-if="selectedEnrollmentType === 'group' && selectedCourse" class="mt-8">
            <div class="bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 rounded-2xl p-6 border border-blue-200">
              <div class="flex items-center gap-2 mb-5">
                <div class="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
                  <span class="text-blue-700 text-lg">📅</span>
                </div>
                <h3 class="font-bold text-gray-800 text-lg">Select Training Schedule</h3>
                <span class="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full ml-2">Required</span>
              </div>

              <div v-if="loadingSchedules" class="flex items-center justify-center py-8">
                <div class="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <span class="ml-3 text-gray-600">Loading available schedules...</span>
              </div>

              <div v-else-if="upcomingSchedules.length > 0" class="space-y-3">
                <div
                  v-for="schedule in upcomingSchedules"
                  :key="schedule.id"
                  @click="selectedSchedule = schedule"
                  :class="[
                    'border-2 rounded-xl p-4 cursor-pointer transition-all duration-200',
                    selectedSchedule?.id === schedule.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                  ]"
                >
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="font-semibold text-gray-800">{{ formatDate(schedule.date) }}</div>
                      <div class="text-sm text-gray-500">Trainer: {{ schedule.trainer?.name || 'To be assigned' }}</div>
                    </div>
                    <div class="text-right">
                      <div class="text-sm font-medium text-gray-700">Available Seats: {{ schedule.available_seats }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else class="text-center py-8 bg-yellow-50 rounded-xl">
                <p class="text-yellow-700">No upcoming schedules available for this course.</p>
              </div>
            </div>
          </div>

          <!-- Company: Extra Fields -->
          <div v-if="selectedEnrollmentType === 'jumbo'" class="mt-8">
            <div class="bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 rounded-2xl p-6 border border-indigo-100">
              <div class="flex items-center gap-2 mb-5">
                <div class="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center">
                  <span class="text-indigo-700 text-lg">🏢</span>
                </div>
                <h3 class="font-bold text-gray-800 text-lg">Company Enrollment Details</h3>
              </div>
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
                  <input
                    v-model="companyName"
                    type="text"
                    placeholder="Enter your company name"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Number of Participants *</label>
                  <select
                    v-model="numberOfPersons"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  >
                    <option :value="5">5 Participants</option>
                    <option :value="10">10 Participants</option>
                    <option :value="15">15 Participants</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- ── Details + Payment Panel ── -->
          <div v-if="showDetails" class="mt-10 rounded-2xl overflow-hidden border border-gray-200 shadow-xl">

            <!-- Course Summary Header -->
              <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6 text-white">
              <div
                class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div>
                  <h3 class="text-2xl font-bold">{{ selectedCourse?.name }}</h3>
                  <div class="flex flex-wrap gap-2 mt-3">
                    <span
                      class="inline-flex items-center gap-1.5 text-xs bg-white/20 backdrop-blur rounded-full px-3 py-1.5"
                    >
                      <span>{{ selectedAnalysisTypeIcon }}</span> {{ selectedAnalysisTypeName }}
                    </span>
                    <span
                      class="inline-flex items-center gap-1.5 text-xs bg-white/20 backdrop-blur rounded-full px-3 py-1.5"
                    >
                      <span>📘</span> {{ courseTypeLabel }}
                    </span>
                    <span
                      class="inline-flex items-center gap-1.5 text-xs bg-white/20 backdrop-blur rounded-full px-3 py-1.5"
                    >
                      <span>⏱️</span> {{ getCourseDurationDays(selectedCourse?.duration) }} day{{
                        getCourseDurationDays(selectedCourse?.duration) > 1 ? 's' : ''
                      }}
                    </span>
                    <span
                      class="inline-flex items-center gap-1.5 text-xs bg-green-500/40 backdrop-blur rounded-full px-3 py-1.5"
                    >
                      <span>✅</span> Certificate Included
                    </span>
                    <!-- Show selected schedule in details -->
                    <span
                      v-if="selectedEnrollmentType === 'group' && selectedSchedule"
                      class="inline-flex items-center gap-1.5 text-xs bg-blue-500/40 backdrop-blur rounded-full px-3 py-1.5"
                    >
                      <span>📅</span> {{ formatDate(selectedSchedule.date) }}
                    </span>
                  </div>
                </div>
                <div class="text-right bg-white/10 backdrop-blur rounded-2xl px-6 py-3">
                  <div class="text-xs opacity-90 tracking-wide">TOTAL INVESTMENT</div>
                  <div class="text-4xl md:text-5xl font-extrabold">
                    ${{ calculatedPrice.toLocaleString() }}
                  </div>
                  <div class="text-xs opacity-80 mt-1">
                    {{ enrollmentTypeLabel }} •
                    {{
                      selectedEnrollmentType === 'jumbo'
                        ? 'per ' + numberOfPersons + ' participants'
                        : 'per participant'
                    }}
                  </div>
                </div>
              </div>
            </div>

            <div class="p-8 bg-white">
              <div class="grid md:grid-cols-2 gap-8">
                <div class="space-y-5">
                  <div class="flex items-start gap-4 pb-4 border-b border-gray-100">
                    <div
                      class="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0"
                    >
                      <span class="text-xl">{{ selectedAnalysisTypeIcon }}</span>
                    </div>
                    <div>
                      <div class="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                        Analysis Type
                      </div>
                      <div class="font-bold text-gray-800 text-lg">
                        {{ selectedAnalysisTypeName }}
                      </div>
                      <div class="text-sm text-gray-500 mt-0.5">
                        {{ selectedAnalysisTypeDescription }}
                      </div>
                    </div>
                  </div>

                  <div class="flex items-start gap-4 pb-4 border-b border-gray-100">
                    <div
                      class="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0"
                    >
                      <svg
                        class="w-5 h-5 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <div>
                      <div class="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                        Course Type
                      </div>
                      <div class="font-bold text-gray-800 text-lg">{{ courseTypeLabel }}</div>
                    </div>
                  </div>

                  <div class="flex items-start gap-4 pb-4 border-b border-gray-100">
                    <div
                      class="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0"
                    >
                      <svg
                        class="w-5 h-5 text-emerald-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div class="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                        Enrollment Type
                      </div>
                      <div class="font-bold text-gray-800 text-lg">{{ enrollmentTypeLabel }}</div>
                      <div
                        v-if="selectedEnrollmentType === 'jumbo' && companyName"
                        class="text-sm text-gray-500 mt-0.5"
                      >
                        {{ companyName }} • {{ numberOfPersons }} participant{{
                          numberOfPersons > 1 ? 's' : ''
                        }}
                      </div>
                      <div
                        v-if="selectedEnrollmentType === 'group' && selectedSchedule"
                        class="text-sm text-gray-500 mt-0.5"
                      >
                        Training Date: {{ formatDate(selectedSchedule.date) }} • Trainer: {{ selectedSchedule.trainer?.name || 'TBD' }}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="bg-gradient-to-br from-gray-50 to-indigo-50/30 rounded-2xl p-5 border border-gray-100"
                >
                  <div class="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg
                      class="w-5 h-5 text-indigo-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Price Breakdown
                  </div>
                  <div class="space-y-3 text-sm">
                    <div
                      class="flex justify-between py-2 border-b border-gray-200"
                      v-if="selectedCourseType !== 'lunchlearn'"
                    >
                      <span class="text-gray-600"
                        >Base price per day ({{
                          getCourseDurationDays(selectedCourse?.duration)
                        }}
                        day{{
                          getCourseDurationDays(selectedCourse?.duration) > 1 ? 's' : ''
                        }})</span
                      >
                      <span class="font-semibold">${{ pricePerDay }} / day</span>
                    </div>
                    <div
                      v-if="
                        selectedEnrollmentType === 'jumbo' && selectedCourseType !== 'lunchlearn'
                      "
                      class="flex justify-between py-2 border-b border-gray-200"
                    >
                      <span class="text-gray-600">Per participant price</span>
                      <span class="font-semibold"
                        >${{ (calculatedPrice / numberOfPersons).toLocaleString() }}</span
                      >
                    </div>
                    <div
                      v-if="selectedEnrollmentType === 'jumbo'"
                      class="flex justify-between py-2 border-b border-gray-200 bg-indigo-50/50 rounded-lg px-2 -mx-2"
                    >
                      <span class="text-gray-700 font-medium">Number of participants</span>
                      <span class="font-bold text-indigo-600">× {{ numberOfPersons }}</span>
                    </div>
                    <div class="flex justify-between pt-3">
                      <span class="font-bold text-gray-800 text-base">Total Investment</span>
                      <span class="font-extrabold text-indigo-600 text-2xl"
                        >${{ calculatedPrice.toLocaleString() }}</span
                      >
                    </div>
                    <div
                      v-if="selectedCourseType === 'lunchlearn'"
                      class="text-xs text-green-600 mt-3 bg-green-50 p-3 rounded-xl flex items-start gap-2"
                    >
                      <span>✨</span> Lunch & Learn features fixed pricing — no per-day calculation
                    </div>
                    <div
                      v-if="
                        selectedEnrollmentType === 'jumbo' && selectedCourseType !== 'lunchlearn'
                      "
                      class="text-xs text-indigo-600 mt-2 bg-indigo-50 p-2 rounded-lg text-center"
                    >
                      🎉 Volume discount applied! Company rate is ${{
                        (calculatedPrice / numberOfPersons).toLocaleString()
                      }}
                      per participant.
                    </div>
                  </div>
                </div>
              </div>

              <div
                v-if="selectedCourse?.long_description || selectedCourse?.longDescription"
                class="mt-6 p-5 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-xl border border-indigo-100"
              >
                <div class="flex items-start gap-3">
                  <svg
                    class="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <div class="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                      Course Highlights
                    </div>
                    <p class="text-gray-700 leading-relaxed">
                      {{ selectedCourse?.long_description || selectedCourse?.longDescription }}
                    </p>
                  </div>
                </div>
              </div>
              </div>

            <!-- Stripe Payment Form -->
            <div class="bg-gradient-to-r from-gray-50 to-gray-100 p-8 border-t border-gray-200">
              <div class="flex items-center gap-2 mb-6">
                <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span class="text-gray-700 text-lg">💳</span>
                </div>
                <h3 class="font-bold text-gray-800 text-lg">Payment Information</h3>
                <span class="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full ml-2">Secure SSL Encrypted</span>
              </div>

              <StripePaymentForm
                :calculated-price="calculatedPrice"
                :selected-course="selectedCourse"
                :selected-enrollment-type="selectedEnrollmentType"
                :company-name="companyName"
                :number-of-persons="numberOfPersons"
                :selected-schedule="selectedSchedule"
                :preferred-start-date="preferredStartDate"
                :is-submit-disabled="isSubmitDisabled"
                @payment-success="handlePaymentSuccess"
                @payment-error="handlePaymentError"
              />
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="mt-10 text-center py-16 bg-gradient-to-br from-gray-50 to-indigo-50/20 rounded-2xl border-2 border-dashed border-gray-200">
            <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-700 mb-2">Complete Your Selection</h3>
            <p class="text-gray-500">Select all 4 options above to see your personalized training package</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      @click.self="showSuccessModal = false"
    >
      <div class="bg-white rounded-2xl max-w-md w-full mx-4 p-8 shadow-2xl">
        <div class="text-center">
          <div class="mx-auto w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-5">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">Enrollment Confirmed!</h3>
          <p class="text-gray-600 mb-6">Your payment was successful. A confirmation email will be sent shortly.</p>
          <button
            @click="showSuccessModal = false"
            class="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/stores/AuthStore'
import StripePaymentForm from '@/components/StripePaymentForm.vue'

const router    = useRouter()
const authStore = useAuthStore()

// ── Analysis types ────────────────────────────────────────────
const analysisTypeList = ref([
  { id: 'dynamic',           name: 'Dynamic Analysis',          icon: '📊' },
  { id: 'static',            name: 'Static Analysis',           icon: '⚖️' },
  { id: 'thermal',           name: 'Thermal Analysis',          icon: '🔥' },
  { id: 'cfd',               name: 'CFD Analysis',              icon: '🌊' },
  { id: 'multibody',         name: 'Multibody Dynamic Analysis',icon: '⚙️' },
  { id: 'fatigue',           name: 'Fatigue Analysis',          icon: '🔄' },
  { id: 'composite',         name: 'Composite Analysis',        icon: '📐' },
  { id: 'acoustics_analysis',name: 'Acoustics Analysis',        icon: '🎵' },
])

// ── State ─────────────────────────────────────────────────────
const loading              = ref(true)
const loadingSchedules     = ref(false)
const softwareList         = ref([])
const solutionList         = ref([])
const allCourses           = ref([])
const showSuccessModal     = ref(false)
const upcomingSchedules    = ref([])
const selectedSchedule     = ref(null)
const preferredStartDate   = ref('')
const selectedAnalysisTypeId = ref('')
const selectedCourseType   = ref('')
const selectedCourse       = ref(null)
const selectedEnrollmentType = ref('')
const companyName          = ref('')
const numberOfPersons      = ref(5)

// ── Stepper config ────────────────────────────────────────────
const steps = computed(() => [
  { key: 'analysis',   label: 'Analysis Type', completed: !!selectedAnalysisTypeId.value },
  { key: 'courseType', label: 'Course Type',   completed: !!selectedCourseType.value },
  { key: 'course',     label: 'Course',        completed: !!selectedCourse.value },
  { key: 'enrollment', label: 'Enrollment',    completed: !!selectedEnrollmentType.value },
])

const progressWidth = computed(() => {
  const done = steps.value.filter(s => s.completed).length
  return (done / steps.value.length) * 100
})

// ── Helpers ───────────────────────────────────────────────────
const getCourseDurationDays = (durationString) => {
  if (!durationString) return 1
  const match = durationString.match(/\d+/)
  return match ? parseInt(match[0]) : 1
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

// ── API ───────────────────────────────────────────────────────
const fetchSoftwares = async () => {
  try {
    const res = await api().get('/softwares?with=InternalTrainings')
    softwareList.value = res.data?.data || res.data || []
  } catch (e) { console.error('fetchSoftwares:', e); softwareList.value = [] }
}

const fetchSolutions = async () => {
  try {
    const res = await api().get('/solutions?with=InternalTrainings')
    solutionList.value = res.data?.data || res.data || []
  } catch (e) { console.error('fetchSolutions:', e); solutionList.value = [] }
}

const fetchTrainings = async () => {
  try {
    const res = await api().get('/internal-trainings')
    const trainings = res.data?.data || res.data || []
    allCourses.value = trainings.map(t => ({
      ...t,
      software_name: softwareList.value.find(s => s.id == t.software_id)?.name || null,
      solution_name: solutionList.value.find(s => s.id == t.solution_id)?.name || null,
    }))
  } catch (e) { console.error('fetchTrainings:', e); allCourses.value = [] }
}

const fetchUpcomingSchedules = async (courseId) => {
  if (!courseId) return
  loadingSchedules.value = true
  try {
    const res = await api().get(`/public/courses/${courseId}/upcoming-schedules`)
    upcomingSchedules.value = res.data?.data || []
  } catch (e) { console.error('fetchSchedules:', e); upcomingSchedules.value = [] }
  finally { loadingSchedules.value = false }
}

// ── Computed ──────────────────────────────────────────────────
const selectedAnalysisType     = computed(() => analysisTypeList.value.find(a => a.id === selectedAnalysisTypeId.value))
const selectedAnalysisTypeName = computed(() => selectedAnalysisType.value?.name || '')
const selectedAnalysisTypeIcon = computed(() => selectedAnalysisType.value?.icon || '📊')

const availableCourses = computed(() => {
  if (!selectedAnalysisTypeId.value || !selectedCourseType.value) return []

  return allCourses.value.filter(course => {
    const type           = (course.type  || '').toLowerCase()
    const level          = (course.level || '').toLowerCase()
    const courseAnalysis = (course.analysis || '').toLowerCase()
    const sel            = selectedAnalysisTypeId.value.toLowerCase()

    // Course type filter
    const typeMatch =
      selectedCourseType.value === 'lunchlearn' ? type === 'online' :
      selectedCourseType.value === 'basic'       ? type === 'onsite' && level === 'beginner' :
      selectedCourseType.value === 'advanced'    ? type === 'onsite' && level === 'advanced' : false

    if (!typeMatch) return false

    // Analysis filter
    const analysisMap = {
      dynamic:           'dynamic analysis',
      multibody:         'multibody dynamic analysis',
      acoustics_analysis:'acoustics',
    }
    const target = analysisMap[sel] || sel
    return courseAnalysis.includes(target)
  })
})

const showDetails = computed(() => {
  if (!selectedAnalysisTypeId.value || !selectedCourseType.value || !selectedCourse.value || !selectedEnrollmentType.value) return false
  if (selectedEnrollmentType.value === 'group')  return !!selectedSchedule.value
  if (selectedEnrollmentType.value === 'jumbo')  return !!companyName.value.trim() && !!numberOfPersons.value
  return true
})

// isSubmitDisabled — passed to StripePaymentForm to gate the button
const isSubmitDisabled = computed(() => !showDetails.value)

const courseTypeLabel = computed(() => ({
  basic: 'Basic Course', advanced: 'Advanced Course', lunchlearn: 'Lunch & Learn'
})[selectedCourseType.value] || '')

const enrollmentTypeLabel = computed(() => ({
  individual: 'Individual', group: 'Group', jumbo: 'Company'
})[selectedEnrollmentType.value] || '')

const basePricePerParticipant = computed(() => {
  if (!selectedCourse.value || !selectedEnrollmentType.value || !selectedCourseType.value) return 0
  const days   = getCourseDurationDays(selectedCourse.value.duration)
  const type   = selectedCourseType.value
  const enroll = selectedEnrollmentType.value

  if (type === 'lunchlearn') {
    return { individual: 100, group: 150, jumbo: 75 }[enroll] || 0
  }

  const priceMap = {
    individual: { 5: 3000, 3: 2000, 1: 1000 },
    group:      { 5: 1200, 3:  800, 1:  400 },
    jumbo:      { 5: 1000, 3:  700, 1:  300 },
  }
  return priceMap[enroll]?.[days] ?? 0
})

const companyPricingMap = { 5: 5000, 10: 8000, 15: 12000 }
const calculatedPrice = computed(() =>
  selectedEnrollmentType.value === 'jumbo'
    ? companyPricingMap[numberOfPersons.value] || 0
    : basePricePerParticipant.value
)

// ── Event handlers ────────────────────────────────────────────
const resetSchedules = () => { selectedSchedule.value = null; upcomingSchedules.value = [] }

const onAnalysisTypeChange  = () => { selectedCourse.value = null; resetSchedules() }
const onCourseTypeChange    = () => { selectedCourse.value = null; resetSchedules() }
const onCourseChange        = () => {
  resetSchedules()
  if (selectedEnrollmentType.value === 'group' && selectedCourse.value) {
    fetchUpcomingSchedules(selectedCourse.value.id)
  }
}
const onEnrollmentTypeChange = () => {
  if (selectedEnrollmentType.value !== 'jumbo') { companyName.value = ''; numberOfPersons.value = 5 }
  resetSchedules()
  preferredStartDate.value = ''
  if (selectedEnrollmentType.value === 'group' && selectedCourse.value) {
    fetchUpcomingSchedules(selectedCourse.value.id)
  }
}

// ── Payment result handlers ───────────────────────────────────
const handlePaymentSuccess = () => {
  showSuccessModal.value = true
  setTimeout(() => router.push('/user'), 3000)
}

const handlePaymentError = (error) => {
  // StripePaymentForm already shows a Swal; this is a fallback / logging hook
  console.error('Payment error received in parent:', error)
}

// ── Bootstrap ─────────────────────────────────────────────────
const loadAllData = async () => {
  loading.value = true
  await Promise.all([fetchSoftwares(), fetchSolutions()])
  await fetchTrainings()
  loading.value = false
}

watch(selectedCourse, (newCourse) => {
  if (selectedEnrollmentType.value === 'group' && newCourse) fetchUpcomingSchedules(newCourse.id)
})

onMounted(loadAllData)
</script>

<style scoped>
.animate-spin { animation: spin 1s linear infinite; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.shadow-3xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
</style>