<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 w-full">
    <!-- Hero Banner -->
    <div
      class="relative bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white overflow-hidden"
    >
      <div class="relative pt-12 pb-8 px-4 text-center">
        <div class="max-w-5xl mx-auto">
          <div
            class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-5 py-2 mb-5 border border-white/20 shadow-lg"
          >
            <span class="text-yellow-300 text-lg">🎓</span>
            <span class="text-sm font-semibold tracking-wide"
              >100% FREE Training with Every License</span
            >
            <span class="text-yellow-300 text-lg">✨</span>
          </div>
          <h1
            class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent"
          >
            MSC Software Training Enrollment
          </h1>
          <p class="text-indigo-200 text-lg max-w-3xl mx-auto">
            Select your analysis type, course track, and enrollment type to see real-time pricing
            and course details
          </p>
        </div>
      </div>
      <div
        class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50/20 to-transparent"
      ></div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="max-w-7xl mx-auto px-4 py-20 text-center">
      <div class="inline-block">
        <div class="relative">
          <div
            class="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"
          ></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-8 h-8 bg-indigo-100 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
      <p class="mt-6 text-gray-600 font-medium">Loading training programs...</p>
    </div>

    <div v-else class=" mx-44 px-4 py-10">
      <!-- Main Enrollment Card -->
      <div
        class="bg-blue-100 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-3xl"
      >
        <!-- Card Header with Stepper -->
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h2 class="text-2xl font-bold text-white flex items-center gap-3">
                <div
                  class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                Enrollment Wizard
              </h2>
              <p class="text-indigo-100 text-sm mt-1 ml-1">
                Complete all 4 steps to see your personalized training package
              </p>
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
              <!-- Progress Bar Background -->
              <div class="absolute top-5 left-0 right-0 h-0.5 bg-white/20 rounded-full"></div>
              <!-- Dynamic Progress Bar -->
              <div
                class="absolute top-5 left-0 h-0.5 bg-green-400 rounded-full transition-all duration-500"
                :style="{ width: `${progressWidth}%` }"
              ></div>

              <!-- Step 1 -->
              <div class="relative flex flex-col items-center z-10">
                <div
                  :class="[
                    'w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-lg transform hover:scale-105',
                    selectedAnalysisTypeId
                      ? 'bg-green-500 text-white ring-4 ring-green-300'
                      : 'bg-white/25 text-white'
                  ]"
                >
                  <span v-if="selectedAnalysisTypeId" class="text-lg">✓</span>
                  <span v-else>1</span>
                </div>
                <span class="text-xs mt-2 font-semibold text-white/90">Analysis Type</span>
              </div>

              <!-- Step 2 -->
              <div class="relative flex flex-col items-center z-10">
                <div
                  :class="[
                    'w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-lg transform hover:scale-105',
                    selectedCourseType
                      ? 'bg-green-500 text-white ring-4 ring-green-300'
                      : 'bg-white/25 text-white'
                  ]"
                >
                  <span v-if="selectedCourseType" class="text-lg">✓</span>
                  <span v-else>2</span>
                </div>
                <span class="text-xs mt-2 font-semibold text-white/90">Course Type</span>
              </div>

              <!-- Step 3 -->
              <div class="relative flex flex-col items-center z-10">
                <div
                  :class="[
                    'w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-lg transform hover:scale-105',
                    selectedCourse
                      ? 'bg-green-500 text-white ring-4 ring-green-300'
                      : 'bg-white/25 text-white'
                  ]"
                >
                  <span v-if="selectedCourse" class="text-lg">✓</span>
                  <span v-else>3</span>
                </div>
                <span class="text-xs mt-2 font-semibold text-white/90">Course</span>
              </div>

              <!-- Step 4 -->
              <div class="relative flex flex-col items-center z-10">
                <div
                  :class="[
                    'w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-lg transform hover:scale-105',
                    selectedEnrollmentType
                      ? 'bg-green-500 text-white ring-4 ring-green-300'
                      : 'bg-white/25 text-white'
                  ]"
                >
                  <span v-if="selectedEnrollmentType" class="text-lg">✓</span>
                  <span v-else>4</span>
                </div>
                <span class="text-xs mt-2 font-semibold text-white/90">Enrollment</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Dropdowns Section -->
        <div class="p-8">
          <div class="grid md:grid-cols-2 gap-8">
            <!-- Step 1: Analysis Type Dropdown -->
            <div class="group">
              <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <span
                  class="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold"
                  >1</span
                >
                1. Select Analysis Type <span class="text-red-500">*</span>
              </label>
              <select
                v-model="selectedAnalysisTypeId"
                @change="onAnalysisTypeChange"
                class="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-indigo-300 cursor-pointer"
              >
                <option disabled value="">— Choose an analysis type —</option>
                <option
                  v-for="analysis in analysisTypeList"
                  :key="analysis.id"
                  :value="analysis.id"
                >
                  {{ analysis.icon }} {{ analysis.name }}
                </option>
              </select>
              <p class="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                <span>ℹ️</span> Select the type of analysis you need training for
              </p>
            </div>

            <!-- Step 2: Course Type Dropdown -->
            <div class="group">
              <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <span
                  class="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold"
                  >2</span
                >
                2. Course Type <span class="text-red-500">*</span>
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

            <!-- Step 3: Specific Course Dropdown -->
            <div class="group">
              <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <span
                  class="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold"
                  >3</span
                >
                3. Select Course <span class="text-red-500">*</span>
              </label>
              <select
                v-model="selectedCourse"
                @change="onCourseChange"
                :disabled="!availableCourses.length"
                class="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option disabled value="">
                  —
                  {{
                    availableCourses.length
                      ? 'Choose a course'
                      : 'Select analysis type & course type first'
                  }}
                  —
                </option>
                <option v-for="course in availableCourses" :key="course.id" :value="course">
                  <div class="flex justify-between">
                    <span>{{ course.name }}</span>
                    <span class="text-gray-400 text-sm">
                      ({{ getCourseDurationDays(course.duration) }} day{{
                        getCourseDurationDays(course.duration) > 1 ? 's' : ''
                      }})</span
                    >
                  </div>
                </option>
              </select>
              <p
                v-if="selectedAnalysisTypeId && selectedCourseType && !availableCourses.length"
                class="text-amber-600 text-xs mt-1.5 flex items-center gap-1"
              >
                <span>⚠️</span> No courses available for this combination
              </p>
            </div>

            <!-- Step 4: Enrollment Type Dropdown -->
            <div class="group">
              <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <span
                  class="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold"
                  >4</span
                >
                4. Enrollment Type <span class="text-red-500">*</span>
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
            <!-- Preferred Start Date for Individual and Company Enrollment -->
<div 
  v-if="selectedEnrollmentType && (selectedEnrollmentType === 'individual' || selectedEnrollmentType === 'jumbo')" 
  class="mt-6"
>
  <div
    class="bg-gradient-to-r from-green-50 via-teal-50 to-green-50 rounded-2xl p-6 border border-green-200 shadow-inner"
  >
    <div class="flex items-center gap-2 mb-5">
      <div class="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center">
        <span class="text-green-700 text-lg">📅</span>
      </div>
      <h3 class="font-bold text-gray-800 text-lg">Preferred Start Date</h3>
      <span class="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full ml-2"
        >Optional</span
      >
    </div>
    
    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-2">
        Select your preferred training start date
      </label>
      <input
        v-model="preferredStartDate"
        type="date"
        :min="minDate"
        class="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white hover:border-green-300 cursor-pointer"
        :class="{ 'border-green-300': preferredStartDate }"
      />
      <p class="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
        <span>💡</span> Please select your preferred start date. Our team will confirm availability.
      </p>
    </div>
  </div>
</div>
          </div>

          <!-- Upcoming Schedules for Group Enrollment -->
          <div v-if="selectedEnrollmentType === 'group' && selectedCourse" class="mt-8">
            <div
              class="bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 rounded-2xl p-6 border border-blue-200 shadow-inner"
            >
              <div class="flex items-center gap-2 mb-5">
                <div class="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
                  <span class="text-blue-700 text-lg">📅</span>
                </div>
                <h3 class="font-bold text-gray-800 text-lg">Select Training Schedule</h3>
                <span class="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full ml-2"
                  >Required for Group Enrollment</span>
              </div>
              
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Upcoming Training Dates <span class="text-red-500">*</span>
                </label>
                
                <!-- Loading schedules -->
                <div v-if="loadingSchedules" class="flex items-center justify-center py-8">
                  <div class="inline-block">
                    <div class="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  </div>
                  <span class="ml-3 text-gray-600">Loading available schedules...</span>
                </div>
                
                <!-- Schedules list -->
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
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <div class="font-semibold text-gray-800">
                            {{ formatDate(schedule.date) }}
                          </div>
                          <div class="text-sm text-gray-500">
                            Trainer: {{ schedule.trainer?.name || 'To be assigned' }}
                          </div>
                        </div>
                      </div>
                      <div class="text-right">
                        <div class="text-sm font-medium text-gray-700">
                          Available Seats: 
                          <span :class="schedule.available_seats > 0 ? 'text-green-600' : 'text-red-600'">
                            {{ schedule.available_seats }}
                          </span>
                        </div>
                        <div class="text-xs text-gray-400 mt-1">
                          ID: {{ schedule.id }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- No schedules available -->
                <div v-else class="text-center py-8 bg-yellow-50 rounded-xl border border-yellow-200">
                  <svg class="w-12 h-12 text-yellow-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p class="text-yellow-700">No upcoming schedules available for this course.</p>
                  <p class="text-sm text-yellow-600 mt-1">Please contact us for alternative dates.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Company Extra Fields (shown only when jumbo is selected) -->
          <div v-if="selectedEnrollmentType === 'jumbo'" class="mt-8">
            <div
              class="bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 rounded-2xl p-6 border border-indigo-100 shadow-inner"
            >
              <div class="flex items-center gap-2 mb-5">
                <div class="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center">
                  <span class="text-indigo-700 text-lg">🏢</span>
                </div>
                <h3 class="font-bold text-gray-800 text-lg">Company Enrollment Details</h3>
                <span class="text-xs bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded-full ml-2"
                  >Volume Pricing</span
                >
              </div>
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <svg
                        class="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <input
                      v-model="companyName"
                      type="text"
                      placeholder="Enter your company name"
                      class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white"
                    />
                  </div>
                </div>
                <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Participants <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <select
                    v-model="numberOfPersons"
                    class="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white appearance-none cursor-pointer"
                  >
                    <option value="5">5 Participants</option>
                    <option value="10">10 Participants</option>
                    <option value="15">15 Participants</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <p class="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
                  <span>💡</span> Company enrollment price is per participant × {{ numberOfPersons }} people
                </p>
              </div>
              </div>
            </div>
          </div>

          <!-- Details Section -->
          <div
            v-if="showDetails"
            class="mt-10 rounded-2xl overflow-hidden border border-gray-200 shadow-xl transition-all duration-300 animate-fadeInUp"
          >
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

              <div class="mt-8 flex justify-end">
                <button
                  @click="submitEnrollment"
                  :disabled="isSubmitDisabled"
                  :class="[
                    'group px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300 flex items-center gap-3 transform hover:scale-105 hover:shadow-xl',
                    isSubmitDisabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : 'hover:from-indigo-700 hover:to-purple-700'
                  ]"
                >
                  <svg
                    class="w-5 h-5 transition-transform group-hover:rotate-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  Enroll Now
                  <svg
                    class="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div
            v-else
            class="mt-10 text-center py-16 bg-gradient-to-br from-gray-50 to-indigo-50/20 rounded-2xl border-2 border-dashed border-gray-200"
          >
            <div class="relative inline-block">
              <div
                class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner"
              >
                <svg
                  class="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div
                class="absolute -top-1 -right-1 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce"
              >
                4
              </div>
            </div>
            <h3 class="text-xl font-bold text-gray-700 mb-2">Complete Your Selection</h3>
            <p class="text-gray-500 max-w-md mx-auto">
              Select all 4 options above to see your personalized training package and pricing
            </p>
            <div class="flex justify-center gap-2 mt-4">
              <span class="w-2 h-2 bg-gray-300 rounded-full"></span>
              <span class="w-2 h-2 bg-gray-300 rounded-full"></span>
              <span class="w-4 h-2 bg-indigo-400 rounded-full"></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300"
      @click.self="showSuccessModal = false"
    >
      <div
        class="bg-white rounded-2xl max-w-md w-full mx-4 p-6 shadow-2xl transform animate-scaleIn"
      >
        <div class="text-center">
          <div
            class="mx-auto w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-5 shadow-lg"
          >
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">Enrollment Submitted!</h3>
          <p class="text-gray-600 mb-6">
            Thank you for enrolling in
            <span class="font-bold text-indigo-600">{{ selectedCourse?.name }}</span> ({{
              enrollmentTypeLabel
            }}).
            <template v-if="selectedEnrollmentType === 'jumbo' && companyName">
              <br /><span class="text-sm"
                >Company: <strong>{{ companyName }}</strong
                ><br />Participants: <strong>{{ numberOfPersons }}</strong></span
              >
            </template>
            <template v-if="selectedEnrollmentType === 'group' && selectedSchedule">
              <br /><span class="text-sm"
                >Training Date: <strong>{{ formatDate(selectedSchedule.date) }}</strong></span
              >
            </template>
          </p>
          <div class="bg-indigo-50 rounded-xl p-3 mb-6 text-sm text-indigo-700">
            Our training team will contact you within 24 hours to confirm your spot.
          </div>
          <button
            @click="showSuccessModal = false"
            class="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-200 shadow-md"
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
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/stores/AuthStore'

const route = useRoute()
const courseIdFromQuery = route.query.courseId || null

// Analysis Type List
const analysisTypeList = ref([
  {
    id: 'dynamic',
    name: 'Dynamic Analysis',
    icon: '📊',
    gradient: 'bg-gradient-to-br from-purple-600 to-indigo-700',
    shortDescription: 'Vibration, shock, and transient response'
  },
  {
    id: 'static',
    name: 'Static Analysis',
    icon: '⚖️',
    gradient: 'bg-gradient-to-br from-blue-600 to-cyan-700',
    shortDescription: 'Linear and nonlinear static analysis'
  },
  {
    id: 'thermal',
    name: 'Thermal Analysis',
    icon: '🔥',
    gradient: 'bg-gradient-to-br from-orange-600 to-red-700',
    shortDescription: 'Heat transfer and thermal simulation'
  },
  {
    id: 'cfd',
    name: 'CFD Analysis',
    icon: '🌊',
    gradient: 'bg-gradient-to-br from-green-600 to-emerald-700',
    shortDescription: 'Computational fluid dynamics'
  },
  {
    id: 'multibody',
    name: 'Multibody Dynamic Analysis',
    icon: '⚙️',
    gradient: 'bg-gradient-to-br from-pink-600 to-rose-700',
    shortDescription: 'Mechanical system simulation'
  },
  {
    id: 'fatigue',
    name: 'Fatigue Analysis',
    icon: '🔄',
    gradient: 'bg-gradient-to-br from-amber-600 to-orange-700',
    shortDescription: 'Durability and fatigue life prediction'
  },
  {
    id: 'composite',
    name: 'Composite Analysis',
    icon: '📐',
    gradient: 'bg-gradient-to-br from-teal-600 to-cyan-700',
    shortDescription: 'Composite material modeling'
  },
  {
    id: 'acoustics_analysis',
    name: 'Acoustics Analysis',
    icon: '🎵',
    gradient: 'bg-gradient-to-br from-purple-600 to-pink-700',
    shortDescription: 'Sound and vibration simulation'
  }
])

// State
const loading = ref(true)
const loadingSchedules = ref(false)
const softwareList = ref([])
const solutionList = ref([])
const allCourses = ref([])
const showSuccessModal = ref(false)
const upcomingSchedules = ref([])
const selectedSchedule = ref(null)
const preferredStartDate = ref('') 
// Form selections
const selectedAnalysisTypeId = ref('')
const selectedCourseType = ref('')
const selectedCourse = ref(null)
const selectedEnrollmentType = ref('')

// Company enrollment fields
const companyName = ref('')
const numberOfPersons = ref(5) // Changed to 5 as default to match options

// Auth
const authStore = useAuthStore()
const router = useRouter()
const isLoggedIn = computed(() => authStore.isAuthenticated)

// Computed property to check if submit is disabled
const isSubmitDisabled = computed(() => {
  if (selectedEnrollmentType.value === 'group' && !selectedSchedule.value) {
    return true
  }
  if (selectedEnrollmentType.value === 'jumbo' && (!companyName.value.trim() || !numberOfPersons.value)) {
    return true
  }
  return false
})

// Progress width for stepper
const progressWidth = computed(() => {
  let stepsCompleted = 0
  if (selectedAnalysisTypeId.value) stepsCompleted++
  if (selectedCourseType.value) stepsCompleted++
  if (selectedCourse.value) stepsCompleted++
  if (selectedEnrollmentType.value) stepsCompleted++
  return (stepsCompleted / 4) * 100
})

// Helper functions
const sortSoftwareByTrainingCount = (list) => {
  return list.slice().sort((a, b) => {
    const aCount = a.internal_trainings?.length || a.InternalTrainings?.length || 0
    const bCount = b.internal_trainings?.length || b.InternalTrainings?.length || 0
    return bCount - aCount
  })
}

const sortSolutionByTrainingCount = (list) => {
  return list.slice().sort((a, b) => {
    const aCount = a.internal_trainings?.length || a.InternalTrainings?.length || 0
    const bCount = b.internal_trainings?.length || b.InternalTrainings?.length || 0
    return bCount - aCount
  })
}

const getSoftwareNameById = (softwareId) => {
  const software = softwareList.value.find((s) => s.id == softwareId)
  return software ? software.name : null
}

const getSolutionNameById = (solutionId) => {
  const solution = solutionList.value.find((s) => s.id == solutionId)
  return solution ? solution.name : null
}

const getCourseDurationDays = (durationString) => {
  if (!durationString) return 1
  const match = durationString.match(/\d+/)
  if (match) {
    const days = parseInt(match[0])
    return days === 5 || days === 3 || days === 1 ? days : 1
  }
  return 1
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

// Fetch upcoming schedules for a course
const fetchUpcomingSchedules = async (courseId) => {
  if (!courseId) return
  
  loadingSchedules.value = true
  upcomingSchedules.value = []
  selectedSchedule.value = null
  
  try {
    const response = await api().get(`/public/courses/${courseId}/upcoming-schedules`)
    if (response.data && response.data.success && response.data.data) {
      upcomingSchedules.value = response.data.data
    } else {
      upcomingSchedules.value = []
    }
  } catch (error) {
    console.error('Error fetching upcoming schedules:', error)
    upcomingSchedules.value = []
    Swal.fire({
      title: 'Error',
      text: 'Failed to load upcoming schedules. Please try again later.',
      icon: 'error',
      confirmButtonText: 'OK'
    })
  } finally {
    loadingSchedules.value = false
  }
}

// Map analysis string from API to analysis type ID
const mapAnalysisToId = (analysisString) => {
  if (!analysisString) return ''
  const lowerAnalysis = analysisString.toLowerCase()

  if (lowerAnalysis === 'dynamic analysis') return 'dynamic'
  if (lowerAnalysis === 'multibody dynamic analysis') return 'multibody'
  if (lowerAnalysis.includes('static')) return 'static'
  if (lowerAnalysis.includes('thermal') || lowerAnalysis.includes('heat')) return 'thermal'
  if (lowerAnalysis.includes('cfd') || lowerAnalysis.includes('fluid')) return 'cfd'
  if (lowerAnalysis.includes('fatigue') || lowerAnalysis.includes('durability')) return 'fatigue'
  if (lowerAnalysis.includes('composite')) return 'composite'
  if (lowerAnalysis.includes('acoustics') || lowerAnalysis.includes('sound'))
    return 'acoustics_analysis'

  return ''
}

// Determine course type from course object
const getCourseTypeFromCourse = (course) => {
  if (!course) return ''
  const type = (course.type || '').toLowerCase()
  const level = (course.level || '').toLowerCase()

  if (type === 'online') return 'lunchlearn'
  if (type === 'onsite') {
    if (level === 'beginner') return 'basic'
    if (level === 'advanced') return 'advanced'
  }
  return ''
}

// API Calls
const fetchSoftwares = async () => {
  try {
    const response = await api().get('/softwares?with=InternalTrainings')
    if (response.data && response.data.data) {
      softwareList.value = sortSoftwareByTrainingCount(response.data.data)
    } else if (Array.isArray(response.data)) {
      softwareList.value = sortSoftwareByTrainingCount(response.data)
    } else {
      softwareList.value = []
    }
  } catch (error) {
    console.error('Error fetching softwares:', error)
    softwareList.value = []
  }
}

const fetchSolutions = async () => {
  try {
    const response = await api().get('/solutions?with=InternalTrainings')
    if (response.data && response.data.data) {
      solutionList.value = sortSolutionByTrainingCount(response.data.data)
    } else if (Array.isArray(response.data)) {
      solutionList.value = sortSolutionByTrainingCount(response.data)
    } else {
      solutionList.value = []
    }
  } catch (error) {
    console.error('Error fetching solutions:', error)
    solutionList.value = []
  }
}

const fetchTrainings = async () => {
  try {
    const response = await api().get('/internal-trainings')
    let trainings = []

    if (response.data && response.data.data) {
      trainings = response.data.data
    } else if (Array.isArray(response.data)) {
      trainings = response.data
    }

    allCourses.value = trainings.map((training) => ({
      ...training,
      software_name: getSoftwareNameById(training.software_id),
      solution_name: getSolutionNameById(training.solution_id),
      shortDescription: training.short_description,
      longDescription: training.long_description
    }))
  } catch (error) {
    console.error('Error fetching trainings:', error)
    allCourses.value = []
  }
}

// Autofill from query parameter
const autofillFromQuery = () => {
  if (!courseIdFromQuery || allCourses.value.length === 0) return

  const courseId = parseInt(courseIdFromQuery)
  const foundCourse = allCourses.value.find((c) => c.id === courseId)

  if (!foundCourse) {
    console.warn(`Course with ID ${courseIdFromQuery} not found`)
    return
  }

  // Set selected course
  selectedCourse.value = foundCourse

  // Set analysis type
  const analysisId = mapAnalysisToId(foundCourse.analysis)
  if (analysisId) {
    selectedAnalysisTypeId.value = analysisId
  } else {
    console.warn(`Could not map analysis: ${foundCourse.analysis}`)
  }

  // Set course type
  const courseType = getCourseTypeFromCourse(foundCourse)
  if (courseType) {
    selectedCourseType.value = courseType
  }

  // Note: enrollment type is NOT autofilled - user must select
}

const loadAllData = async () => {
  loading.value = true
  await Promise.all([fetchSoftwares(), fetchSolutions()])
  await fetchTrainings()

  // Autofill from query after courses are loaded
  autofillFromQuery()

  loading.value = false
}

// Computed properties for Analysis Type
const selectedAnalysisType = computed(() => {
  return analysisTypeList.value.find((a) => a.id === selectedAnalysisTypeId.value)
})

const selectedAnalysisTypeName = computed(() => {
  return selectedAnalysisType.value?.name || ''
})

const selectedAnalysisTypeIcon = computed(() => {
  return selectedAnalysisType.value?.icon || '📊'
})

const selectedAnalysisTypeDescription = computed(() => {
  return selectedAnalysisType.value?.shortDescription || ''
})

const availableCourses = computed(() => {
  if (!selectedAnalysisTypeId.value || !selectedCourseType.value) return []

  // Step 1: Filter by course type
  let coursesByType = allCourses.value.filter((course) => {
    const type = (course.type || '').toLowerCase()
    const level = (course.level || '').toLowerCase()

    if (selectedCourseType.value === 'lunchlearn') {
      return type === 'online'
    }

    if (selectedCourseType.value === 'basic') {
      return type === 'onsite' && level === 'beginner'
    }

    if (selectedCourseType.value === 'advanced') {
      return type === 'onsite' && level === 'advanced'
    }

    return false
  })

  // Step 2: Filter the already-filtered courses by analysis
  return coursesByType.filter((course) => {
    const courseAnalysis = (course.analysis || '').toLowerCase()
    const selectedAnalysis = selectedAnalysisTypeId.value.toLowerCase()

    if (selectedAnalysis === 'dynamic') {
      return courseAnalysis === 'dynamic analysis'
    }

    if (selectedAnalysis === 'static') {
      return courseAnalysis.includes('static')
    }

    if (selectedAnalysis === 'thermal') {
      return courseAnalysis.includes('thermal') || courseAnalysis.includes('heat')
    }

    if (selectedAnalysis === 'cfd') {
      return courseAnalysis.includes('cfd') || courseAnalysis.includes('fluid')
    }

    if (selectedAnalysis === 'multibody') {
      return courseAnalysis === 'multibody dynamic analysis'
    }

    if (selectedAnalysis === 'fatigue') {
      return courseAnalysis.includes('fatigue') || courseAnalysis.includes('durability')
    }

    if (selectedAnalysis === 'composite') {
      return courseAnalysis.includes('composite')
    }

    if (selectedAnalysis === 'acoustics_analysis') {
      return courseAnalysis.includes('acoustics') || courseAnalysis.includes('sound')
    }

    return courseAnalysis === selectedAnalysis
  })
})

const showDetails = computed(() => {
  let baseCondition = selectedAnalysisTypeId.value &&
    selectedCourseType.value &&
    selectedCourse.value &&
    selectedEnrollmentType.value
  
  // For group enrollment, also require schedule selection
  if (selectedEnrollmentType.value === 'group') {
    return baseCondition && selectedSchedule.value
  }
  
  // For jumbo enrollment, require company name
  if (selectedEnrollmentType.value === 'jumbo') {
    return baseCondition && companyName.value.trim() && numberOfPersons.value
  }
  
  return baseCondition
})

const courseTypeLabel = computed(() => {
  if (selectedCourseType.value === 'basic') return 'Basic Course'
  if (selectedCourseType.value === 'advanced') return 'Advanced Course'
  if (selectedCourseType.value === 'lunchlearn') return 'Lunch & Learn'
  return ''
})

const enrollmentTypeLabel = computed(() => {
  if (selectedEnrollmentType.value === 'individual') return 'Individual'
  if (selectedEnrollmentType.value === 'group') return 'Group'
  if (selectedEnrollmentType.value === 'jumbo') return 'Company'
  return ''
})

const pricePerDay = computed(() => {
  if (!selectedCourse.value) return 0
  const days = getCourseDurationDays(selectedCourse.value.duration)
  const total = basePricePerParticipant.value
  return days > 0 ? Math.round(total / days) : total
})

const basePricePerParticipant = computed(() => {
  if (!selectedCourse.value || !selectedEnrollmentType.value || !selectedCourseType.value) return 0

  const days = getCourseDurationDays(selectedCourse.value.duration)
  const type = selectedCourseType.value
  const enroll = selectedEnrollmentType.value

  if (type === 'lunchlearn') {
    if (enroll === 'individual') return 100
    if (enroll === 'group') return 150
    if (enroll === 'jumbo') return 75
    return 0
  }

  if (enroll === 'individual') {
    if (days === 5) return 3000
    if (days === 3) return 2000
    if (days === 1) return 1000
  } else if (enroll === 'group') {
    if (days === 5) return 1200
    if (days === 3) return 800
    if (days === 1) return 400
  } else if (enroll === 'jumbo') {
    if (days === 5) return 1000
    if (days === 3) return 700
    if (days === 1) return 300
  }

  return 0
})

const companyPricingMap = {
  5: 5000,
  10: 8000,
  15: 12000,
  20: 15000
}

const calculatedPrice = computed(() => {
  if (selectedEnrollmentType.value === 'jumbo') {
    const participants = numberOfPersons.value
    return companyPricingMap[participants] || 0
  }

  return basePricePerParticipant.value
})

// Event handlers
const onAnalysisTypeChange = () => {
  selectedCourse.value = null
  selectedSchedule.value = null
  upcomingSchedules.value = []
}

const onCourseTypeChange = () => {
  selectedCourse.value = null
  selectedSchedule.value = null
  upcomingSchedules.value = []
}

const onCourseChange = () => {
  selectedSchedule.value = null
  upcomingSchedules.value = []
  
  if (selectedEnrollmentType.value === 'group' && selectedCourse.value) {
    fetchUpcomingSchedules(selectedCourse.value.id)
  }
}

const onEnrollmentTypeChange = () => {
  if (selectedEnrollmentType.value !== 'jumbo') {
    companyName.value = ''
    numberOfPersons.value = 5
  }
  
  if (selectedEnrollmentType.value !== 'group') {
    selectedSchedule.value = null
    upcomingSchedules.value = []
  }
  
  // Reset preferred start date when changing enrollment type
  preferredStartDate.value = ''
  
  if (selectedEnrollmentType.value === 'group' && selectedCourse.value) {
    fetchUpcomingSchedules(selectedCourse.value.id)
  }
}

watch(selectedCourse, (newCourse) => {
  if (selectedEnrollmentType.value === 'group' && newCourse) {
    fetchUpcomingSchedules(newCourse.id)
  }
})

const promptRegisterThenRedirect = () => {
  Swal.fire({
    title: 'Registration required',
    text: 'You need to register first to enroll. You will be redirected to the registration page.',
    icon: 'info',
    confirmButtonText: 'Go to Register',
    allowOutsideClick: false
  }).then((result) => {
    if (result.isConfirmed) {
      router.push('/register')
    }
  })
}

const submitEnrollment = async () => {
  if (!isLoggedIn.value) {
    promptRegisterThenRedirect()
    return
  }

  if (selectedEnrollmentType.value === 'jumbo') {
    if (!companyName.value.trim()) {
      Swal.fire({
        title: 'Missing Information',
        text: 'Please enter your company name.',
        icon: 'warning',
        confirmButtonText: 'OK'
      })
      return
    }
    if (!numberOfPersons.value || numberOfPersons.value < 1) {
      Swal.fire({
        title: 'Missing Information',
        text: 'Please enter the number of participants (minimum 1).',
        icon: 'warning',
        confirmButtonText: 'OK'
      })
      return
    }
  }
  
  if (selectedEnrollmentType.value === 'group') {
    if (!selectedSchedule.value) {
      Swal.fire({
        title: 'Missing Information',
        text: 'Please select a training schedule for your group enrollment.',
        icon: 'warning',
        confirmButtonText: 'OK'
      })
      return
    }
  }

  let payload = {}
  
  if (selectedEnrollmentType.value === 'individual') {
    payload = {
      course_id: selectedCourse.value.id,
      course_price: calculatedPrice.value,
      training_type: 'individual',
      status: 'approved'
    }
    // Add preferred start date if provided
    if (preferredStartDate.value) {
      payload.preferred_start_date = preferredStartDate.value
    }
  } else if (selectedEnrollmentType.value === 'jumbo') {
    payload = {
      course_id: selectedCourse.value.id,
      course_price: calculatedPrice.value,
      number_of_participants: numberOfPersons.value,
      organization: companyName.value,
      training_type: 'company',
      status: 'approved'
    }
    // Add preferred start date if provided
    if (preferredStartDate.value) {
      payload.preferred_start_date = preferredStartDate.value
    }
  } else if (selectedEnrollmentType.value === 'group') {
    payload = {
      course_id: selectedCourse.value.id,
      course_price: calculatedPrice.value,
      training_course_schedule_id: selectedSchedule.value.id,
      training_type: 'group',
      status: 'approved'
    }
  }

  // Show loading state
  const loadingSwal = Swal.fire({
    title: 'Submitting Enrollment...',
    text: 'Please wait while we process your request.',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    }
  })

  try {
    const response = await api().post('/training-requests', payload)
    
    loadingSwal.close()
    
    if (response.data && response.data.success) {
      showSuccessModal.value = true
      
      // Optional: You can also show additional success message
      Swal.fire({
        title: 'Success!',
        text: response.data.message || 'Your enrollment request has been submitted successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      })
    } else {
      // Handle API error response
      throw new Error(response.data?.message || 'Failed to submit enrollment')
    }

    await router.push(`/user`)
  } catch (error) {
    // Close loading indicator if still open
    loadingSwal.close()
    
    // Handle error
    console.error('Enrollment submission error:', error)
    
    Swal.fire({
      title: 'Submission Failed',
      text: error.response?.data?.message || error.message || 'There was an error submitting your enrollment. Please try again.',
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }
}

// Lifecycle
onMounted(() => {
  loadAllData()
})
</script>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

.animate-fadeInUp {
  animation: fadeInUp 0.4s ease-out;
}

.animate-scaleIn {
  animation: scaleIn 0.3s ease-out;
}

.shadow-3xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
</style>