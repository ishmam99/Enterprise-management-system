<template>
  <div class="min-h-screen bg-white">
    <section
      class="py-8 bg-gradient-to-r h-20 from-purple-900 via-purple-800 to-indigo-900 text-white relative overflow-hidden">
    </section>

    <!-- Hero Section -->
    <div
      class="mt-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl p-8 md:p-12 text-center shadow-2xl border-4 border-yellow-300">
      <div class="flex flex-col md:flex-row items-center justify-center gap-12">
        <RouterLink to="/"
          class="px-6 py-3 flex gap-2 font-semibold bg-white/70 border border-white/20 rounded-lg hover:bg-white/20 transition">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M22.0003 12.9999L22.0004 11L8.41421 11V5.58582L2 12L8.41421 18.4142L8.41421 13L22.0003 12.9999Z">
            </path>
          </svg>
          Go Back
        </RouterLink>
        <div class="flex gap-4">
          <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7">
              </path>
            </svg>
          </div>

          <div class="text-white">
            <div class="flex w-full justify-between items-center">
              <h3 class="text-3xl md:text-4xl font-bold mb-2">
                100% FREE Training with Every License
              </h3>
            </div>
            <p class="text-xl text-yellow-100">
              No additional charges. No hidden fees. Complete training included with your software
              purchase!
            </p>
          </div>
        </div>
        <button @click="openCourseEnrollModal()"
          class="px-6 py-3 bg-yellow-500 flex gap-2 text-gray-900 font-semibold rounded-lg hover:bg-yellow-600 transition advert-blink">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path
              d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z">
            </path>
          </svg>
          Enroll Now
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <!-- Colorful Skeleton Loading State -->
    <div v-if="loading" class="bg-gradient-to-b from-white to-blue-50 pt-2">
      <div class="container">
        <!-- Header Skeleton -->
        <div class="text-center mb-8">
          <div
            class="h-10 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 rounded-lg w-64 mx-auto mb-4 animate-pulse bg-[length:200%_100%]">
          </div>
          <div
            class="h-6 bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 rounded-lg w-96 mx-auto animate-pulse bg-[length:200%_100%]">
          </div>
        </div>

        <!-- Colorful Tab Headers Skeleton -->
        <div class="grid md:grid-cols-3 gap-6 mb-4">
          <!-- Basic Tab Skeleton (Green) -->
          <div
            class="bg-gradient-to-br from-green-100 to-emerald-100 p-4 rounded-t-2xl border-2 border-green-300 animate-pulse">
            <div class="sticky top-0 z-10">
              <div class="h-14 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl shadow-md mx-auto w-full">
              </div>
              <div class="h-4 bg-green-300 rounded w-48 mx-auto mt-3"></div>
            </div>
          </div>
          <!-- Advanced Tab Skeleton (Amber/Orange) -->
          <div
            class="bg-gradient-to-br from-amber-100 to-orange-100 p-4 rounded-t-2xl border-2 border-amber-300 animate-pulse">
            <div class="sticky top-0 z-10">
              <div class="h-14 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl shadow-md mx-auto w-full"></div>
              <div class="h-4 bg-amber-300 rounded w-48 mx-auto mt-3"></div>
            </div>
          </div>
          <!-- Lunch Tab Skeleton (Red/Rose) -->
          <div
            class="bg-gradient-to-br from-red-100 to-rose-100 p-4 rounded-t-2xl border-2 border-red-300 animate-pulse">
            <div class="sticky top-0 z-10">
              <div class="h-14 bg-gradient-to-r from-red-400 to-rose-400 rounded-xl shadow-md mx-auto w-full"></div>
              <div class="h-4 bg-red-300 rounded w-48 mx-auto mt-3"></div>
            </div>
          </div>
        </div>

        <!-- Colorful Active Tab Content Skeleton (3 cards with shimmer) -->
        <div
          class="grid md:grid-cols-3 gap-6 bg-gradient-to-br from-green-50/50 to-emerald-50/50 p-4 rounded-2xl shadow-lg border-2 border-green-200 backdrop-blur-sm">
          <!-- Card 1 - Green themed -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-[450px] relative">
            <div
              class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer">
            </div>
            <div class="bg-gradient-to-r from-green-400 to-emerald-400 px-5 min-h-[4rem] py-3">
              <div class="flex justify-between items-start gap-2">
                <div class="h-5 bg-white/40 rounded flex-1"></div>
                <div class="h-6 w-16 bg-yellow-300/80 rounded-lg"></div>
              </div>
            </div>
            <div class="flex-1 flex flex-col p-5 space-y-3">
              <div class="space-y-2">
                <div class="h-4 bg-green-100 rounded w-full"></div>
                <div class="h-4 bg-green-100 rounded w-5/6"></div>
                <div class="h-4 bg-green-100 rounded w-4/6"></div>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div class="h-3 bg-green-50 rounded"></div>
                <div class="h-3 bg-green-50 rounded"></div>
                <div class="h-3 bg-green-50 rounded"></div>
                <div class="h-3 bg-green-50 rounded"></div>
                <div class="h-3 bg-green-50 rounded"></div>
                <div class="h-3 bg-green-50 rounded"></div>
              </div>
              <div class="h-20 bg-green-50 rounded-lg"></div>
              <div class="h-12 bg-green-100 rounded-lg"></div>
              <div class="h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg mt-auto"></div>
            </div>
          </div>
          <!-- Card 2 - Amber themed -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-[450px] relative">
            <div
              class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer">
            </div>
            <div class="bg-gradient-to-r from-amber-400 to-orange-400 px-5 min-h-[4rem] py-3">
              <div class="flex justify-between items-start gap-2">
                <div class="h-5 bg-white/40 rounded flex-1"></div>
                <div class="h-6 w-16 bg-yellow-300/80 rounded-lg"></div>
              </div>
            </div>
            <div class="flex-1 flex flex-col p-5 space-y-3">
              <div class="space-y-2">
                <div class="h-4 bg-amber-100 rounded w-full"></div>
                <div class="h-4 bg-amber-100 rounded w-5/6"></div>
                <div class="h-4 bg-amber-100 rounded w-4/6"></div>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div class="h-3 bg-amber-50 rounded"></div>
                <div class="h-3 bg-amber-50 rounded"></div>
                <div class="h-3 bg-amber-50 rounded"></div>
                <div class="h-3 bg-amber-50 rounded"></div>
                <div class="h-3 bg-amber-50 rounded"></div>
                <div class="h-3 bg-amber-50 rounded"></div>
              </div>
              <div class="h-20 bg-amber-50 rounded-lg"></div>
              <div class="h-12 bg-amber-100 rounded-lg"></div>
              <div class="h-10 bg-gradient-to-r from-amber-400 to-orange-400 rounded-lg mt-auto"></div>
            </div>
          </div>
          <!-- Card 3 - Red/Rose themed -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-[450px] relative">
            <div
              class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer">
            </div>
            <div class="bg-gradient-to-r from-red-400 to-rose-400 px-5 min-h-[4rem] py-3">
              <div class="flex justify-between items-start gap-2">
                <div class="h-5 bg-white/40 rounded flex-1"></div>
                <div class="h-6 w-16 bg-yellow-300/80 rounded-lg"></div>
              </div>
            </div>
            <div class="flex-1 flex flex-col p-5 space-y-3">
              <div class="space-y-2">
                <div class="h-4 bg-red-100 rounded w-full"></div>
                <div class="h-4 bg-red-100 rounded w-5/6"></div>
                <div class="h-4 bg-red-100 rounded w-4/6"></div>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div class="h-3 bg-red-50 rounded"></div>
                <div class="h-3 bg-red-50 rounded"></div>
                <div class="h-3 bg-red-50 rounded"></div>
                <div class="h-3 bg-red-50 rounded"></div>
                <div class="h-3 bg-red-50 rounded"></div>
                <div class="h-3 bg-red-50 rounded"></div>
              </div>
              <div class="h-20 bg-red-50 rounded-lg"></div>
              <div class="h-12 bg-red-100 rounded-lg"></div>
              <div class="h-10 bg-gradient-to-r from-red-400 to-rose-400 rounded-lg mt-auto"></div>
            </div>
          </div>
        </div>



        <!-- Colorful FREE Banner Skeleton with animated gradient -->
        <div
          class="py-8 bg-gradient-to-r from-purple-800 via-pink-800 to-indigo-800 rounded-xl mt-8 mb-4 h-80 relative overflow-hidden">
          <div
            class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer">
          </div>
          <div class="absolute inset-0 opacity-20">
            <div class="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full filter blur-3xl animate-pulse"></div>
            <div class="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full filter blur-3xl animate-pulse">
            </div>
          </div>
          <div class="container pt-20 px-6 text-center relative z-10">
            <div class="inline-flex items-center gap-2 bg-purple-500/30 rounded-full px-6 py-3 mb-6">
              <div class="h-5 w-5 bg-purple-300 rounded-full animate-pulse"></div>
              <div class="h-4 w-40 bg-purple-300 rounded animate-pulse"></div>
            </div>
            <div class="h-10 bg-white/20 rounded w-3/4 mx-auto mb-4 animate-pulse"></div>
            <div class="h-6 bg-white/15 rounded w-1/2 mx-auto mb-4 animate-pulse"></div>
            <div class="h-12 bg-yellow-400/30 rounded-xl w-64 mx-auto mb-8 animate-pulse"></div>
            <div class="flex justify-center gap-4">
              <div class="h-10 w-32 bg-yellow-400/50 rounded-lg animate-pulse"></div>
              <div class="h-10 w-40 bg-white/20 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Training Types Section -->
    <section v-else ref="trainingTypesSection" class="bg-gradient-to-b from-white to-blue-50">
      <div class="container">
        <!-- Course Listing Section -->
        <div class="">
          <div class="text-center mb-4">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {{ selectedFilterItem }} Training Courses
            </h2>
            <p class="text-lg text-gray-600">
              Available training courses for {{ selectedFilterItem }}
            </p>
          </div>
          <div class="grid md:grid-cols-3 gap-6">
            <!-- Beginner Column -->
            <div @click="activeTab = 'basic'"
              class="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-t-2xl border-2 border-green-400 cursor-pointer transition-all"
              :class="activeTab == 'basic' ? 'border-b-0 rounded-b-none mb-[-2px]' : 'rounded-2xl mb-3'">
              <div class="sticky top-0 z-10">
                <h1
                  class="text-center text-2xl font-bold p-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl shadow-md">
                  🎯 Basic
                </h1>
                <p class="text-center text-sm text-green-700 mt-2 font-medium">
                  Perfect for those new to the software
                </p>
              </div>
            </div>

            <!-- Advanced Column -->
            <div @click="activeTab = 'advanced'"
              class="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-t-2xl border-2 border-amber-400 cursor-pointer transition-all"
              :class="activeTab == 'advanced' ? 'border-b-0 rounded-b-none mb-[-2px]' : 'rounded-2xl mb-3'">
              <div class="sticky top-0 z-10">
                <h1
                  class="text-center text-2xl font-bold p-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl shadow-md">
                  🚀 Advanced
                </h1>
                <p class="text-center text-sm text-amber-700 mt-2 font-medium">
                  For experienced users seeking mastery
                </p>
              </div>
            </div>

            <!-- Lunch & Learn Column -->
            <div @click="activeTab = 'lunch'"
              class="bg-gradient-to-br from-red-50 to-rose-50 p-4 rounded-t-2xl border-2 border-red-400 cursor-pointer transition-all"
              :class="activeTab == 'lunch' ? 'border-b-0 rounded-b-none mb-[-2px]' : 'rounded-2xl mb-3'">
              <div class="sticky top-0 z-10">
                <h1
                  class="text-center text-2xl font-bold p-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl shadow-md">
                  🎓 Lunch & Learn
                </h1>
                <p class="text-center text-sm text-red-700 mt-2 font-medium">
                  Free weekly webinars on latest features
                </p>
              </div>
            </div>
          </div>

          <!-- Basic Tab Content -->
          <div v-if="activeTab == 'basic'"
            class="grid md:grid-cols-3 gap-6 bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-2xl -mt-[1px] rounded-s-sm shadow-lg border-2  border-green-400">
            <!-- Real Courses -->
            <template
              v-for="(course, index) in filteredCoursesBySelection.filter(e => (e.level == 'Beginner' || e.level === 'Basic') && e.type === 'onsite')"
              :key="course.id">
              <div
                class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-green-500 overflow-hidden flex flex-col h-[450px]">
                <!-- Card Header -->
                <div class="bg-gradient-to-r from-green-600 to-emerald-600 px-5 min-h-[4rem] py-3">
                  <div class="flex justify-between items-start gap-2">
                    <h3 class="text-base font-bold text-white line-clamp-2 flex-1">{{ course.name }}</h3>
                    <span
                      class="bg-yellow-400 text-gray-900 px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap">{{
                      course.code }}</span>
                  </div>
                </div>

                <!-- Card Body -->
                <div class="flex-1 flex flex-col overflow-hidden p-5">
                  <div class="mb-3">
                    <p class="text-gray-700 text-sm line-clamp-3">{{ course.short_description || course.shortDescription
                      }}</p>
                  </div>

                  <div class="grid grid-cols-2 gap-2 mb-3 text-xs">
                    <div class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span class="text-gray-600 truncate"><span class="font-semibold">Duration:</span> {{
                        course.duration }}</span>
                    </div>

                    <div class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                      <span class="text-gray-600 truncate"><span class="font-semibold">Level:</span>
                        <span class="text-green-600 font-medium">{{ course.level }}</span>
                      </span>
                    </div>

                    <div class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                        </path>
                      </svg>
                      <span class="text-gray-600 truncate"><span class="font-semibold">Software:</span> {{
                        course?.software?.name || "Not Available" }}</span>
                    </div>

                    <div class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
                        </path>
                      </svg>
                      <span class="text-gray-600 truncate"><span class="font-semibold">Solution:</span> {{
                        course.solution.name || "Not Available" }}</span>
                    </div>

                    <div class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                        </path>
                      </svg>
                      <span class="text-gray-600 truncate"><span class="font-semibold">Price:</span>
                        <span v-if="course.price == '0' || course.price == 0"
                          class="text-green-600 font-semibold">Free</span>
                        <span v-else class="text-green-700 font-semibold">${{ course.price }}</span>
                      </span>
                    </div>

                    <div class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z">
                        </path>
                      </svg>
                      <span class="text-gray-600 truncate"><span class="font-semibold">Format:</span>
                        <span class="capitalize">{{ course.type }}</span>
                      </span>
                    </div>

                    <div class="col-span-2 flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                      <span class="text-gray-600 text-xs truncate"><span class="font-semibold">Analysis:</span> {{
                        course.analysis || 'N/A' }}</span>
                    </div>
                  </div>

                  <div v-if="course.long_description || course.longDescription" class="mb-3">
                    <div class="bg-green-50 rounded-lg p-3 h-24 overflow-y-auto custom-scrollbar">
                      <div class="flex items-start gap-2">
                        <svg class="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p class="text-xs text-gray-700">{{ course.long_description || course.longDescription }}</p>
                      </div>
                    </div>
                  </div>

                  <div class="mb-3 p-2 bg-gray-50 rounded-lg">
                    <div class="flex items-center gap-1.5 text-xs">
                      <svg class="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
                        </path>
                      </svg>
                      <span class="text-gray-700"><span class="font-semibold">Certificate:</span>
                        <span class="text-green-600">Included upon completion</span>
                      </span>
                    </div>
                  </div>

                  <button @click="openCourseEnrollModal(course)"
                    class="w-full px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition font-semibold flex items-center justify-center gap-2 text-sm">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
                      </path>
                    </svg>
                    Enroll in Course
                  </button>
                </div>
              </div>
            </template>

            <!-- Demo Courses to fill up to 3 columns -->
         
            <template
              v-for="n in (3 - (filteredCoursesBySelection.filter(e => e.level == 'Beginner' && e.type === 'onsite').length%3))"
              :key="'demo-basic-' + n">
              <div
                class="bg-white rounded-xl shadow-md border-2 border-dashed border-green-300 overflow-hidden flex flex-col h-[450px] ">
                <div class="bg-gradient-to-r from-green-300 to-emerald-300 px-5 min-h-[4rem] py-3">
                  <div class="flex justify-between items-start gap-2">
                    <h3 class="text-base font-bold text-white line-clamp-2 flex-1">
                      Example {{ selectedFilterItem }} Basics
                    </h3>
                    <span class="bg-yellow-400 text-gray-600 px-2 py-1 rounded-lg text-xs font-bold">DEMO</span>
                  </div>
                </div>
                <div class="flex-1 flex flex-col h-full overflow-hidden p-5">
                  <div class="mb-3">
                    <p class="text-gray-500 text-sm italic">
                      Foundational {{ selectedFilterItem }} training course - available soon
                    </p>
                  </div>
                  <div class="grid grid-cols-2 gap-2 mb-3 text-xs">
                    <div class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span class="text-gray-400">2 Days</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                      <span class="text-gray-400">Basic</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                        </path>
                      </svg>
                      <span class="text-gray-400">MSC Software</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
                        </path>
                      </svg>
                      <span class="text-gray-400">{{ selectedFilterItem }}</span>
                    </div>
                  </div>
                  <div class="mb-3 p-2 bg-gray-50 rounded-lg text-center">
                    <p class="text-xs text-gray-500">
                      📌 Master {{ selectedFilterItem }} fundamentals with hands-on training
                    </p>
                  </div>
                  <button disabled
                    class="w-full bottom-0 px-4 py-2.5 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed font-semibold text-sm">
                    Coming Soon
                  </button>
                </div>
              </div>
            </template>

            <!-- Empty State when no real courses and no demo needed (should not happen with demos) -->
            <div
              v-if="filteredCoursesBySelection.filter(e => (e.level == 'Beginner' || e.level === 'Basic') && e.type === 'onsite').length === 0 && (3 - filteredCoursesBySelection.filter(e => (e.level == 'Beginner' || e.level === 'Basic') && e.type === 'onsite').length) === 0"
              class="bg-white rounded-xl p-8 text-center border-2 border-dashed border-green-300">
              <svg class="w-12 h-12 text-green-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-gray-500">No beginner courses available</p>
            </div>
          </div>

          <!-- Advanced Tab Content -->
          <div v-if="activeTab == 'advanced'"
            class="grid md:grid-cols-3 gap-6 bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-2xl -mt-[1px] shadow-lg border-2  border-amber-400">
            <!-- Real Courses -->
            <template
              v-for="course in filteredCoursesBySelection.filter(e => e.level === 'Advanced' && e.type === 'onsite')"
              :key="course.id">
              <div
                class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-amber-500 overflow-hidden flex flex-col h-[450px]">
                <div class="bg-gradient-to-r from-amber-600 to-orange-600 px-5 py-3 min-h-[4rem]">
                  <div class="flex justify-between items-start gap-2">
                    <h3 class="text-base font-bold text-white line-clamp-2 flex-1">{{ course.name }}</h3>
                    <span
                      class="bg-yellow-400 text-gray-900 px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap">{{
                      course.code }}</span>
                  </div>
                </div>
                <div class="flex-1 flex flex-col overflow-hidden p-5">
                  <div class="mb-3">
                    <p class="text-gray-700 text-sm line-clamp-3">{{ course.short_description || course.shortDescription
                      }}</p>
                  </div>
                  <div class="grid grid-cols-2 gap-2 mb-3 text-xs">
                    <div class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span class="text-gray-600 truncate"><span class="font-semibold">Duration:</span> {{
                        course.duration }}</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                      <span class="text-gray-600 truncate"><span class="font-semibold">Level:</span>
                        <span class="text-amber-600 font-medium">{{ course.level }}</span>
                      </span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                        </path>
                      </svg>
                      <span class="text-gray-600 truncate"><span class="font-semibold">Software:</span> {{
                        course.software.name || "Not Available" }}</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
                        </path>
                      </svg>
                      <span class="text-gray-600 truncate"><span class="font-semibold">Solution:</span> {{
                        course.solution.name || "Not Available" }}</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                        </path>
                      </svg>
                      <span class="text-gray-600 truncate"><span class="font-semibold">Price:</span>
                        <span v-if="course.price == '0' || course.price == 0"
                          class="text-green-600 font-semibold">Free</span>
                        <span v-else class="text-amber-700 font-semibold">${{ course.price }}</span>
                      </span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z">
                        </path>
                      </svg>
                      <span class="text-gray-600 truncate"><span class="font-semibold">Format:</span>
                        <span class="capitalize">{{ course.type }}</span>
                      </span>
                    </div>
                    <div class="col-span-2 flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                      <span class="text-gray-600 text-xs truncate"><span class="font-semibold">Analysis:</span> {{
                        course.analysis || 'N/A' }}</span>
                    </div>
                  </div>
                  <div v-if="course.long_description || course.longDescription" class="mb-3">
                    <div class="bg-amber-50 rounded-lg p-3 h-24 overflow-y-auto custom-scrollbar">
                      <div class="flex items-start gap-2">
                        <svg class="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p class="text-xs text-gray-700">{{ course.long_description || course.longDescription }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 p-2 bg-gray-50 rounded-lg">
                    <div class="flex items-center gap-1.5 text-xs">
                      <svg class="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
                        </path>
                      </svg>
                      <span class="text-gray-700"><span class="font-semibold">Certificate:</span>
                        <span class="text-green-600">Included upon completion</span>
                      </span>
                    </div>
                  </div>
                  <button @click="openCourseEnrollModal(course)"
                    class="w-full px-4 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition font-semibold flex items-center justify-center gap-2 text-sm">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
                      </path>
                    </svg>
                    Enroll in Course
                  </button>
                </div>
              </div>
            </template>

            <!-- Demo Courses to fill up to 3 columns -->
            <template
              v-for="n in (3 - filteredCoursesBySelection.filter(e => e.level === 'Advanced' && e.type === 'onsite').length)"
              :key="'demo-advanced-' + n">
              <div
                class="bg-white rounded-xl shadow-md border-2 border-dashed border-amber-300 overflow-hidden flex flex-col h-[450px] opacity-60">
                <div class="bg-gradient-to-r from-amber-300 to-orange-300 px-5 py-3 min-h-[4rem]">
                  <div class="flex justify-between items-start gap-2">
                    <h3 class="text-base font-bold text-white line-clamp-2 flex-1">
                      Example Advanced {{ selectedFilterItem }}
                    </h3>
                    <span class="bg-gray-300 text-gray-600 px-2 py-1 rounded-lg text-xs font-bold">DEMO</span>
                  </div>
                </div>
                <div class="flex-1 flex flex-col overflow-hidden p-5">
                  <div class="mb-3">
                    <p class="text-gray-500 text-sm italic">
                      Advanced {{ selectedFilterItem }} techniques - launching soon
                    </p>
                  </div>
                  <div class="grid grid-cols-2 gap-2 mb-3 text-xs">
                    <div class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span class="text-gray-400">3 Days</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                      <span class="text-gray-400">Advanced</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                        </path>
                      </svg>
                      <span class="text-gray-400">MSC Software</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
                        </path>
                      </svg>
                      <span class="text-gray-400">{{ selectedFilterItem }}</span>
                    </div>
                  </div>
                  <div class="mb-3 p-2 bg-gray-50 rounded-lg text-center">
                    <p class="text-xs text-gray-500">
                      🚀 Advanced {{ selectedFilterItem }} strategies and optimization
                    </p>
                  </div>
                  <button disabled
                    class="w-full px-4 py-2.5 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed font-semibold text-sm">
                    Coming Soon
                  </button>
                </div>
              </div>
            </template>
          </div>

          <!-- Lunch Tab Content -->
          <div v-if="activeTab == 'lunch'"
            class="grid md:grid-cols-3 gap-6 bg-gradient-to-br from-red-50 to-rose-50 p-4 rounded-2xl rounded-e-sm shadow-lg border-2  border-red-400 -mt-[1px]">
            <!-- Real Webinars -->
            <template v-for="course in filteredCoursesBySelection.filter(e => e.type === 'online')" :key="course.id">
              <div
                class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-red-500 overflow-hidden flex flex-col h-[450px]">
                <div class="bg-gradient-to-r from-red-600 to-rose-600 px-5 min-h-[4rem] py-3">
                  <div class="flex justify-between items-start gap-2">
                    <h3 class="text-base font-bold text-white line-clamp-2 flex-1">{{ course.name }}</h3>
                    <span
                      class="bg-yellow-400 text-gray-900 px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap">{{
                      course.code }}</span>
                  </div>
                </div>
                <div class="flex-1 flex flex-col overflow-hidden p-5">
                  <div class="mb-3">
                    <p class="text-gray-700 text-sm line-clamp-3">{{ course.short_description || course.shortDescription
                      }}</p>
                  </div>
                  <div class="grid grid-cols-2 gap-2 mb-3 text-xs">
                    <div class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span class="text-gray-600 truncate"><span class="font-semibold">Duration:</span> {{
                        course.duration }}</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                      <span class="text-gray-600 truncate"><span class="font-semibold">Level:</span>
                        <span
                          :class="{ 'text-green-600': (course.level == 'Beginner' || course.level === 'Basic'), 'text-amber-600': course.level === 'Intermediate', 'text-red-600': course.level === 'Advanced', 'text-purple-600': course.level === 'Expert' || course.level === 'All' }"
                          class="font-medium">{{ course.level }}</span>
                      </span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                        </path>
                      </svg>
                      <span class="text-gray-600 truncate"><span class="font-semibold">Software:</span> {{
                        course.software?.name || "Not Available" }}</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
                        </path>
                      </svg>
                      <span class="text-gray-600 truncate"><span class="font-semibold">Solution:</span> {{
                        course.solution.name || "Not Available" }}</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                        </path>
                      </svg>
                      <span class="text-gray-600 truncate"><span class="font-semibold">Price:</span>
                        <span v-if="course.price == '0' || course.price == 0"
                          class="text-green-600 font-semibold">Free</span>
                        <span v-else class="text-red-700 font-semibold">${{ course.price }}</span>
                      </span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z">
                        </path>
                      </svg>
                      <span class="text-gray-600 truncate"><span class="font-semibold">Format:</span>
                        <span class="capitalize">{{ course.type === 'online' ? 'Webinar' : course.type }}</span>
                      </span>
                    </div>
                    <div class="col-span-2 flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                      <span class="text-gray-600 text-xs truncate"><span class="font-semibold">Analysis:</span> {{
                        course.analysis || 'N/A' }}</span>
                    </div>
                  </div>
                  <div v-if="course.long_description || course.longDescription" class="mb-3">
                    <div class="bg-red-50 rounded-lg p-3 h-24 overflow-y-auto custom-scrollbar">
                      <div class="flex items-start gap-2">
                        <svg class="w-3.5 h-3.5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p class="text-xs text-gray-700">{{ course.long_description || course.longDescription }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="mb-3 p-2 bg-gray-50 rounded-lg">
                    <div class="flex items-center gap-1.5 text-xs">
                      <svg class="w-4 h-4 text-red-600 flex-shrink-0" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
                        </path>
                      </svg>
                      <span class="text-gray-700"><span class="font-semibold">Certificate:</span>
                        <span class="text-orange-600">Available upon request</span>
                      </span>
                    </div>
                  </div>
                  <button @click="openCourseEnrollModal(course)"
                    class="w-full px-4 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:from-red-700 hover:to-rose-700 transition font-semibold flex items-center justify-center gap-2 text-sm">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z">
                      </path>
                    </svg>
                    Register for Webinar
                  </button>
                </div>
              </div>
            </template>

            <!-- Demo Webinars to fill up to 3 columns -->
            <!-- <template v-for="n in (3 - filteredCoursesBySelection.filter(e => e.type === 'online').length)" :key="'demo-webinar-' + n">
      <div class="bg-white rounded-xl shadow-md border-2 border-dashed border-red-300 overflow-hidden flex flex-col h-[450px] opacity-60">
        <div class="bg-gradient-to-r from-red-300 to-rose-300 px-5 min-h-[4rem] py-3">
          <div class="flex justify-between items-start gap-2">
            <h3 class="text-base font-bold text-white line-clamp-2 flex-1">
              Lunch & Learn: {{ selectedFilterItem }} - Coming Soon
            </h3>
            <span class="bg-gray-300 text-gray-600 px-2 py-1 rounded-lg text-xs font-bold">DEMO</span>
          </div>
        </div>
        <div class="flex-1 flex flex-col overflow-hidden p-5">
          <div class="mb-3">
            <p class="text-gray-500 text-sm italic">
              Free webinar on {{ selectedFilterItem }} - schedule coming soon
            </p>
          </div>
          <div class="grid grid-cols-2 gap-2 mb-3 text-xs">
            <div class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-gray-400">1 Hour</span>
            </div>
            <div class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <span class="text-gray-400">All Levels</span>
            </div>
            <div class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              <span class="text-gray-400">MSC Software</span>
            </div>
            <div class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              <span class="text-gray-400">{{ selectedFilterItem }}</span>
            </div>
          </div>
          <div class="mb-3 p-2 bg-gray-50 rounded-lg text-center">
            <p class="text-xs text-gray-500">
              🎓 Free {{ selectedFilterItem }} webinar series - stay tuned!
            </p>
          </div>
          <button disabled class="w-full px-4 py-2.5 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed font-semibold text-sm">
            Coming Soon
          </button>
        </div>
      </div>
    </template> -->
          </div>
        </div>
        <div class="hidden">

          <div class="text-center mb-4">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {{ selectedFilterItem }} Training Courses
            </h2>
            <p class="text-lg text-gray-600">
              {{
                selectedTrainingType == 'online'
                  ? 'Free webinar sessions'
                  : 'Available training courses for ' + selectedFilterItem.name
              }}
            </p>
          </div>
          <!-- Tab Buttons - No bottom radius when active -->
          <div class="grid md:grid-cols-3 gap-6">
            <!-- Beginner Column -->
            <div @click="activeTab = 'basic'"
              class="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-t-2xl border border-green-200 cursor-pointer transition-all"
              :class="activeTab == 'basic' ? 'border-b-0 rounded-b-none' : 'rounded-2xl mb-3'">
              <div class="sticky top-0 z-10 ">
                <h1
                  class="text-center text-2xl font-bold p-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl shadow-md">
                  🎯 Basic
                </h1>
                <p class="text-center text-sm text-green-700 mt-2 font-medium">
                  Perfect for those new to the software
                </p>
              </div>
            </div>

            <!-- Advanced Column -->
            <div @click="activeTab = 'advanced'"
              class="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-t-2xl border border-amber-200 cursor-pointer transition-all"
              :class="activeTab == 'advanced' ? 'border-b-0 rounded-b-none' : 'rounded-2xl mb-3'">
              <div class="sticky top-0 z-10 ">
                <h1
                  class="text-center text-2xl font-bold p-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl shadow-md">
                  🚀 Advanced
                </h1>
                <p class="text-center text-sm text-amber-700 mt-2 font-medium">
                  For experienced users seeking mastery
                </p>
              </div>
            </div>

            <!-- Lunch & Learn Column -->
            <div @click="activeTab = 'lunch'"
              class="bg-gradient-to-br from-red-50 to-rose-50 p-4 rounded-t-2xl border border-red-200 cursor-pointer transition-all"
              :class="activeTab == 'lunch' ? 'border-b-0 rounded-b-none' : 'rounded-2xl mb-3'">
              <div class="sticky top-0 z-10 ">
                <h1
                  class="text-center text-2xl font-bold p-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl shadow-md">
                  🎓 Lunch & Learn
                </h1>
                <p class="text-center text-sm text-red-700 mt-2 font-medium">
                  Free weekly webinars on latest features
                </p>
              </div>
            </div>
          </div>

          <!-- Basic Tab Content -->
          <div v-if="activeTab == 'basic'"
            class="grid md:grid-cols-3 gap-6 bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-b-2xl shadow-lg border border-t-0 border-green-200">
            <div
              v-for="course in filteredCoursesBySelection.filter(e => (e.level == 'Beginner' || e.level === 'Basic') && e.type === 'onsite')"
              :key="course.id"
              class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-green-500 overflow-hidden flex flex-col h-[450px]">
              <!-- Card Header -->
              <div class="bg-gradient-to-r from-green-600 to-emerald-600 px-5 min-h-[4rem] py-3">
                <div class="flex justify-between items-start gap-2">
                  <h3 class="text-base font-bold text-white line-clamp-2 flex-1">{{ course.name }}</h3>
                  <span class="bg-yellow-400 text-gray-900 px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap">{{
                    course.code }}</span>
                </div>
              </div>

              <!-- Card Body - Scrollable -->
              <div class="flex-1 flex flex-col overflow-hidden p-5">
                <!-- Short Description -->
                <div class="mb-3">
                  <p class="text-gray-700 text-sm line-clamp-3">{{ course.short_description || course.shortDescription
                    }}</p>
                </div>

                <!-- Course Details Grid -->
                <div class="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="text-gray-600 truncate"><span class="font-semibold">Duration:</span> {{ course.duration
                      }}</span>
                  </div>

                  <div class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z">
                      </path>
                    </svg>
                    <span class="text-gray-600 truncate"><span class="font-semibold">Level:</span>
                      <span class="text-green-600 font-medium">{{ course.level }}</span>
                    </span>
                  </div>

                  <div class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                      </path>
                    </svg>
                    <span class="text-gray-600 truncate"><span class="font-semibold">Software:</span> {{
                      course?.software?.name ||
                      "Not Available" }}</span>
                  </div>

                  <div class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
                      </path>
                    </svg>
                    <span class="text-gray-600 truncate"><span class="font-semibold">Solution:</span> {{
                      course.solution.name ||
                      "Not Available" }}</span>
                  </div>

                  <div class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                      </path>
                    </svg>
                    <span class="text-gray-600 truncate"><span class="font-semibold">Price:</span>
                      <span v-if="course.price == '0' || course.price == 0"
                        class="text-green-600 font-semibold">Free</span>
                      <span v-else class="text-green-700 font-semibold">${{ course.price }}</span>
                    </span>
                  </div>

                  <div class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z">
                      </path>
                    </svg>
                    <span class="text-gray-600 truncate"><span class="font-semibold">Format:</span>
                      <span class="capitalize">{{ course.type }}</span>
                    </span>
                  </div>

                  <div class="col-span-2 flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z">
                      </path>
                    </svg>
                    <span class="text-gray-600 text-xs truncate"><span class="font-semibold">Analysis:</span> {{
                      course.analysis
                      || 'N/A' }}</span>
                  </div>
                </div>

                <!-- Long Description - Scrollable -->
                <div v-if="course.long_description || course.longDescription" class="mb-3">
                  <div class="bg-green-50 rounded-lg p-3 h-24 overflow-y-auto custom-scrollbar">
                    <div class="flex items-start gap-2">
                      <svg class="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <p class="text-xs text-gray-700">{{ course.long_description || course.longDescription }}</p>
                    </div>
                  </div>
                </div>

                <!-- Certificate Info -->
                <div class="mb-3 p-2 bg-gray-50 rounded-lg">
                  <div class="flex items-center gap-1.5 text-xs">
                    <svg class="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
                      </path>
                    </svg>
                    <span class="text-gray-700"><span class="font-semibold">Certificate:</span>
                      <span class="text-green-600">Included upon completion</span>
                    </span>
                  </div>
                </div>

                <!-- Enroll Button -->
                <button @click="openCourseEnrollModal(course)"
                  class="w-full px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition font-semibold flex items-center justify-center gap-2 text-sm">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
                    </path>
                  </svg>
                  Enroll in Course
                </button>
              </div>
            </div>

            <!-- Empty State -->
            <div
              v-if="filteredCoursesBySelection.filter(e => (e.level == 'Beginner' || e.level === 'Basic') && e.type === 'onsite').length === 0"
              class="bg-white rounded-xl p-8 text-center border-2 border-dashed border-green-300">
              <svg class="w-12 h-12 text-green-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-gray-500">No beginner courses available</p>
            </div>
          </div>

          <!-- Advanced Tab Content -->
          <div v-if="activeTab == 'advanced'"
            class="grid md:grid-cols-3 gap-6 bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-b-2xl shadow-lg border border-t-0 border-amber-200">
            <div v-for="course in filteredCoursesBySelection.filter(e => e.level === 'Advanced' && e.type === 'onsite')"
              :key="course.id"
              class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-amber-500 overflow-hidden flex flex-col h-[450px]">
              <!-- Card Header -->
              <div class="bg-gradient-to-r from-amber-600 to-orange-600 px-5 py-3 min-h-[4rem]">
                <div class="flex justify-between items-start gap-2">
                  <h3 class="text-base font-bold text-white line-clamp-2 flex-1">{{ course.name }}</h3>
                  <span class="bg-yellow-400 text-gray-900 px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap">{{
                    course.code }}</span>
                </div>
              </div>

              <!-- Card Body -->
              <div class="flex-1 flex flex-col overflow-hidden p-5">
                <div class="mb-3">
                  <p class="text-gray-700 text-sm line-clamp-3">{{ course.short_description || course.shortDescription
                    }}</p>
                </div>

                <div class="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="text-gray-600 truncate"><span class="font-semibold">Duration:</span> {{ course.duration
                      }}</span>
                  </div>

                  <div class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z">
                      </path>
                    </svg>
                    <span class="text-gray-600 truncate"><span class="font-semibold">Level:</span>
                      <span class="text-amber-600 font-medium">{{ course.level }}</span>
                    </span>
                  </div>

                  <div class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                      </path>
                    </svg>
                    <span class="text-gray-600 truncate"><span class="font-semibold">Software:</span> {{
                      course.software.name ||
                      "Not Available" }}</span>
                  </div>

                  <div class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
                      </path>
                    </svg>
                    <span class="text-gray-600 truncate"><span class="font-semibold">Solution:</span> {{
                      course.solution.name ||
                      "Not Available" }}</span>
                  </div>

                  <div class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                      </path>
                    </svg>
                    <span class="text-gray-600 truncate"><span class="font-semibold">Price:</span>
                      <span v-if="course.price == '0' || course.price == 0"
                        class="text-green-600 font-semibold">Free</span>
                      <span v-else class="text-amber-700 font-semibold">${{ course.price }}</span>
                    </span>
                  </div>

                  <div class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z">
                      </path>
                    </svg>
                    <span class="text-gray-600 truncate"><span class="font-semibold">Format:</span>
                      <span class="capitalize">{{ course.type }}</span>
                    </span>
                  </div>

                  <div class="col-span-2 flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z">
                      </path>
                    </svg>
                    <span class="text-gray-600 text-xs truncate"><span class="font-semibold">Analysis:</span> {{
                      course.analysis
                      || 'N/A' }}</span>
                  </div>
                </div>

                <div v-if="course.long_description || course.longDescription" class="mb-3">
                  <div class="bg-amber-50 rounded-lg p-3 h-24 overflow-y-auto custom-scrollbar">
                    <div class="flex items-start gap-2">
                      <svg class="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <p class="text-xs text-gray-700">{{ course.long_description || course.longDescription }}</p>
                    </div>
                  </div>
                </div>

                <div class="mb-3 p-2 bg-gray-50 rounded-lg">
                  <div class="flex items-center gap-1.5 text-xs">
                    <svg class="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
                      </path>
                    </svg>
                    <span class="text-gray-700"><span class="font-semibold">Certificate:</span>
                      <span class="text-green-600">Included upon completion</span>
                    </span>
                  </div>
                </div>

                <button @click="openCourseEnrollModal(course)"
                  class="w-full px-4 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition font-semibold flex items-center justify-center gap-2 text-sm">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
                    </path>
                  </svg>
                  Enroll in Course
                </button>
              </div>
            </div>

            <div
              v-if="filteredCoursesBySelection.filter(e => e.level === 'Advanced' && e.type === 'onsite').length === 0"
              class="bg-white rounded-xl p-8 text-center border-2 border-dashed border-amber-300">
              <svg class="w-12 h-12 text-amber-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-gray-500">No advanced courses available</p>
            </div>
          </div>

          <!-- Lunch Tab Content -->
          <div v-if="activeTab == 'lunch'"
            class="grid md:grid-cols-3 gap-6 bg-gradient-to-br from-red-50 to-rose-50 p-4 rounded-b-2xl shadow-lg border border-t-0 border-red-200">
            <div v-for="course in filteredCoursesBySelection.filter(e => e.type === 'online')" :key="course.id"
              class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-red-500 overflow-hidden flex flex-col h-[450px]">
              <!-- Card Header -->
              <div class="bg-gradient-to-r from-red-600 to-rose-600 px-5 min-h-[4rem] py-3">
                <div class="flex justify-between items-start gap-2">
                  <h3 class="text-base font-bold text-white line-clamp-2 flex-1">{{ course.name }}</h3>
                  <span class="bg-yellow-400 text-gray-900 px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap">{{
                    course.code }}</span>
                </div>
              </div>

              <!-- Card Body -->
              <div class="flex-1 flex flex-col overflow-hidden p-5">
                <div class="mb-3">
                  <p class="text-gray-700 text-sm line-clamp-3">{{ course.short_description || course.shortDescription
                    }}</p>
                </div>

                <div class="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="text-gray-600 truncate"><span class="font-semibold">Duration:</span> {{ course.duration
                      }}</span>
                  </div>

                  <div class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z">
                      </path>
                    </svg>
                    <span class="text-gray-600 truncate"><span class="font-semibold">Level:</span>
                      <span
                        :class="{ 'text-green-600': (course.level == 'Beginner' || course.level === 'Basic'), 'text-amber-600': course.level === 'Intermediate', 'text-red-600': course.level === 'Advanced', 'text-purple-600': course.level === 'Expert' || course.level === 'All' }"
                        class="font-medium">{{ course.level }}</span>
                    </span>
                  </div>

                  <div class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                      </path>
                    </svg>
                    <span class="text-gray-600 truncate"><span class="font-semibold">Software:</span> {{
                      course.software?.name ||
                      "Not Available" }}</span>
                  </div>

                  <div class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
                      </path>
                    </svg>
                    <span class="text-gray-600 truncate"><span class="font-semibold">Solution:</span> {{
                      course.solution.name ||
                      "Not Available" }}</span>
                  </div>

                  <div class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                      </path>
                    </svg>
                    <span class="text-gray-600 truncate"><span class="font-semibold">Price:</span>
                      <span v-if="course.price == '0' || course.price == 0"
                        class="text-green-600 font-semibold">Free</span>
                      <span v-else class="text-red-700 font-semibold">${{ course.price }}</span>
                    </span>
                  </div>

                  <div class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z">
                      </path>
                    </svg>
                    <span class="text-gray-600 truncate"><span class="font-semibold">Format:</span>
                      <span class="capitalize">{{ course.type === 'online' ? 'Webinar' : course.type }}</span>
                    </span>
                  </div>

                  <div class="col-span-2 flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z">
                      </path>
                    </svg>
                    <span class="text-gray-600 text-xs truncate"><span class="font-semibold">Analysis:</span> {{
                      course.analysis
                      || 'N/A' }}</span>
                  </div>
                </div>

                <div v-if="course.long_description || course.longDescription" class="mb-3">
                  <div class="bg-red-50 rounded-lg p-3 h-24 overflow-y-auto custom-scrollbar">
                    <div class="flex items-start gap-2">
                      <svg class="w-3.5 h-3.5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <p class="text-xs text-gray-700">{{ course.long_description || course.longDescription }}</p>
                    </div>
                  </div>
                </div>

                <div class="mb-3 p-2 bg-gray-50 rounded-lg">
                  <div class="flex items-center gap-1.5 text-xs">
                    <svg class="w-4 h-4 text-red-600 flex-shrink-0" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
                      </path>
                    </svg>
                    <span class="text-gray-700"><span class="font-semibold">Certificate:</span>
                      <span class="text-orange-600">Available upon request</span>
                    </span>
                  </div>
                </div>

                <button @click="openCourseEnrollModal(course)"
                  class="w-full px-4 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:from-red-700 hover:to-rose-700 transition font-semibold flex items-center justify-center gap-2 text-sm">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z">
                    </path>
                  </svg>
                  Register for Webinar
                </button>
              </div>
            </div>

            <div v-if="filteredCoursesBySelection.filter(e => e.type === 'online').length === 0"
              class="bg-white rounded-xl p-8 text-center border-2 border-dashed border-red-300">
              <svg class="w-12 h-12 text-red-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-gray-500">No webinars scheduled at this time</p>
            </div>
          </div>
        </div>


        <!-- Training Features -->
        <div class="grid md:grid-cols-4 gap-6 mb-12 mt-2" v-if="!selectedTrainingType">
          <div class="text-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <div
              class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
                </path>
              </svg>
            </div>
            <h4 class="font-bold text-gray-900 mb-2">Certified Instructors</h4>
            <p class="text-gray-600 text-sm">Expert trainers with real-world experience</p>
          </div>

          <div class="text-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <div
              class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
                </path>
              </svg>
            </div>
            <h4 class="font-bold text-gray-900 mb-2">Course Materials</h4>
            <p class="text-gray-600 text-sm">Comprehensive manuals and resources</p>
          </div>

          <div class="text-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <div
              class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z">
                </path>
              </svg>
            </div>
            <h4 class="font-bold text-gray-900 mb-2">Certificates</h4>
            <p class="text-gray-600 text-sm">Official completion certificates</p>
          </div>

          <div class="text-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <div
              class="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z">
                </path>
              </svg>
            </div>
            <h4 class="font-bold text-gray-900 mb-2">Post-Training Support</h4>
            <p class="text-gray-600 text-sm">Ongoing assistance after training</p>
          </div>
        </div>

        <!-- FREE Banner -->
        <section
          class="py-8 bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white relative overflow-hidden my-2 rounded-xl">
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-0 left-0 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl"></div>
            <div class="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 rounded-full filter blur-3xl"></div>
          </div>

          <div class="container pt-20 px-6 text-center relative z-10 ">
            <div
              class="inline-flex items-center gap-2 bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full px-6 py-3 mb-6">
              <svg class="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
                </path>
              </svg>
              <span class="text-purple-200 font-semibold text-sm">FREE WITH EVERY LICENSE PURCHASE</span>
            </div>

            <h1 class="text-4xl md:text-5xl font-bold mb-4">
              MSC Software Training & Certification
            </h1>
            <p class="text-lg text-purple-200 max-w-3xl mx-auto mb-4">
              Expert-led training programs designed to maximize your team's productivity and
              software proficiency. Become certified and advance your engineering career.
            </p>

            <div
              class="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-4 mb-8 shadow-2xl border-2 border-yellow-400 inline-block">
              <p class="text-gray-900 font-bold">
                🎓 Expert Instructors | Hands-On Practice | Industry Recognized Certifications
              </p>
            </div>

            <div class="mt-8 flex justify-center gap-4 flex-wrap">
              <button @click="openCourseEnrollModal()"
                class="px-6 py-3 bg-yellow-500 flex gap-2 text-gray-900 font-semibold rounded-lg hover:bg-yellow-600 transition advert-blink">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path
                    d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z">
                  </path>
                </svg>
                Enroll Now
              </button>
              <RouterLink to="/contact_us"
                class="px-6 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition">Contact
                Training
                Team</RouterLink>
            </div>
          </div>
        </section>

        <!-- <div
          class="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl p-8 md:p-12 text-center shadow-2xl border-4 border-yellow-300"
        >
          <div class="flex flex-col md:flex-row items-center justify-center gap-6">
            <div
              class="w-20 h-20 bg-white rounded-full flex items-center justify-center flex-shrink-0"
            >
              <svg
                class="w-12 h-12 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                ></path>
              </svg>
            </div>
            <div class="text-white">
              <h3 class="text-3xl md:text-4xl font-bold mb-2">
                100% FREE Training with Every License
              </h3>
              <p class="text-xl text-yellow-100">
                No additional charges. No hidden fees. Complete training included with your software
                purchase!
              </p>
            </div>
          </div>
        </div> -->
      </div>
    </section>


  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/stores/AuthStore'
import CourseType from '@/components/msc_software_training/course_type.vue'
// == STATE ==
const loading = ref(true)
const showEnrollModal = ref(false)
const selectedTrainingType = ref('online')
const selectedFilterItem = ref(null)
const activeTab = ref('basic')
const selectedCourse = ref(null)
const successMessage = ref('')
const errorMessage = ref('')
const authStore = useAuthStore()
// Data from API
const softwareList = ref([])
const solutionList = ref([])
const allCourses = ref([])

// Refs for sections
const trainingTypesSection = ref(null)
const softwareSelectionSection = ref(null)
const courseListingSection = ref(null)
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

// Helper function to pad courses array to fill rows of 3 columns
const getPaddedCourses = (courses, columnsPerRow = 3) => {
  const padded = [...courses]
  const remainder = padded.length % columnsPerRow
  if (remainder !== 0) {
    const emptySlots = columnsPerRow - remainder
    for (let i = 0; i < emptySlots; i++) {
      padded.push(null)
    }
  }
  return padded
}
// Enrollment form data
const enrollForm = ref({
  name: '',
  email: '',
  phone: '',
  organization: '',
  jobTitle: '',
  experienceLevel: 'beginner',
  format: 'online',
  comments: ''
})

const isLoggedIn = computed(() => authStore.isAuthenticated)
const router = useRouter()

const selectedLevelTab = ref('basic')

const promptRegisterThenRedirect = (course) => {
  Swal.fire({
    title: 'You need to login to enroll',
    text: 'You will be redirected to the login page automatically. If you do not have an account, you can create one by clicking "Open a New Account".',
    icon: 'info',
    confirmButtonText: 'Go to Login',
    denyButtonText: 'Open a New Account',
    showDenyButton: true,
    denyButtonColor: '#10B981',
    allowOutsideClick: false,
    allowEscapeKey: true,
    showCloseButton: true,
    timer: 12000,
    timerProgressBar: true,
    // footer: "Don't have an account?"
  }).then((result) => {
   if(course){
     if (result.isConfirmed) {
      router.push('/login?role=user&page=trainingEnroll&course_id=' + course.id)
    } else if (result.isDenied) {
      router.push('/register?page=trainingEnroll&course_id=' + course.id)
    } else if (result.dismiss === Swal.DismissReason.timer) {
      router.push('/login?role=user&page=trainingEnroll&course_id=' + course.id)
    }
   } else{
     if (result.isConfirmed) {
      router.push('/login?role=user&page=trainingEnroll')
    } else if (result.isDenied) {
      router.push('/register?page=trainingEnroll')
    } else if (result.dismiss === Swal.DismissReason.timer) {
      router.push('/login?role=user&page=trainingEnroll')
    }
   }
  })
}

// == HELPER FUNCTIONS ==
const trainingTypeNames = {
  onsite: 'On-Site',
  online: 'Online',
  webinar: 'Lunch & Learn'
}

const scrollToElement = async (elementRef, offset = 80) => {
  await nextTick()
  if (elementRef.value) {
    const elementPosition = elementRef.value.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }
}

// == API CALLS ==
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

const fetchSoftwares = async () => {
  try {
    const response = await api().get(`/softwares?with=InternalTrainings`)
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
    const response = await api().get(`/solutions?with=InternalTrainings`)
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
    const response = await api().get(`/internal-trainings`)
    let trainings = []

    if (response.data && response.data.data) {
      trainings = response.data.data
    } else if (Array.isArray(response.data)) {
      trainings = response.data
    }

    // Enhance training data with related names
    allCourses.value = trainings.map((training) => ({
      ...training,
      software_name: getSoftwareNameById(training.software_id),
      solution_name: getSolutionNameById(training.solution_id),
      // Map fields to match expected format
      shortDescription: training.short_description,
      longDescription: training.long_description
    }))
  } catch (error) {
    console.error('Error fetching trainings:', error)
    allCourses.value = []
  }
}

const getSoftwareNameById = (softwareId) => {
  const software = softwareList.value.find((s) => s.id == softwareId)
  return software ? software.name : null
}

const getSolutionNameById = (solutionId) => {
  const solution = solutionList.value.find((s) => s.id == solutionId)
  return solution ? solution.name : null
}

const loadAllData = async () => {
  loading.value = true
  await Promise.all([fetchSoftwares(), fetchSolutions()])
  await fetchTrainings()
  loading.value = false
}

const filteredCoursesBySelection = computed(() => {
  console.log(selectedFilterItem.value)

  return allCourses.value.filter(
    (course) => course.analysis.toLowerCase() == selectedFilterItem.value.toLowerCase()
  )

  return []
})

const isEnrollFormValid = computed(() => {
  return enrollForm.value.name && enrollForm.value.email && enrollForm.value.organization
})

const selectSolution = async (solution) => {
  // Ensure first letter is uppercase and append ' Analysis'
  if (typeof solution === 'string' && solution.length > 0) {
    selectedFilterItem.value =
      solution == 'multibody'
        ? 'Multibody Dynamic Analysis'
        : solution.charAt(0).toUpperCase() + solution.slice(1) + ' Analysis'
    console.log('Selected filter item set to:', selectedFilterItem.value)
    console.log('Selected filter item set to:', solution)
  } else {
    selectedFilterItem.value = solution
  }
  await scrollToElement(courseListingSection)
}



const openCourseEnrollModal = (course) => {
  if (!isLoggedIn.value) {
    promptRegisterThenRedirect(course)
    return
  }
  if (!course) {
    router.push({
      name: 'msc_software_training-solution-enrollment',

    })
  } else {
    router.push({
      name: 'msc_software_training-solution-enrollment',
      query: {
        courseId: course.id
      }
    })
  }
  // selectedCourse.value = course
  // resetForm()
  // showEnrollModal.value = true
}

const resetForm = () => {
  enrollForm.value = {
    name: '',
    email: '',
    phone: '',
    organization: '',
    jobTitle: '',
    experienceLevel: 'beginner',
    format: 'online',
    comments: ''
  }
}

const closeModal = () => {
  showEnrollModal.value = false
  selectedCourse.value = null
}

const submitEnrollment = async () => {
  if (!isEnrollFormValid.value) {
    errorMessage.value = '⚠️ Please fill all required fields.'
    setTimeout(() => {
      errorMessage.value = ''
    }, 3000)
    return
  }

  console.log('Enrollment submitted:', {
    ...enrollForm.value,
    course: selectedCourse.value,
    trainingType: selectedTrainingType.value
  })

  // Here you would send to your backend API
  // try {
  //   await axios.post(`${API_BASE_URL}/enrollments`, {
  //     ...enrollForm.value,
  //     course_id: selectedCourse.value?.id,
  //     training_type: selectedTrainingType.value,
  //   });
  //   successMessage.value = `✅ Enrollment submitted successfully!`;
  // } catch (error) {
  //   errorMessage.value = '❌ Failed to submit enrollment. Please try again.';
  // }

  successMessage.value = `✅ Enrollment submitted successfully for "${selectedCourse.value?.name || 'Training Program'
    }"! We will contact you at ${enrollForm.value.email}`
  setTimeout(() => {
    successMessage.value = ''
  }, 5000)
  closeModal()
}
const route = useRoute()
watch(
  () => route.params,
  () => {
    selectSolution(route.params.name)
  }
)
// == LIFECYCLE ==
onMounted(() => {
  selectSolution(route.params.name)
  loadAllData()
})
</script>

<style>
/* Custom scrollbar styling */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.advert-blink {
  animation: advert-blink 1.25s ease-in-out infinite;
}

@keyframes advert-blink {

  0%,
  100% {
    transform: translateY(0);
    box-shadow:
      0 0 14px rgba(36, 68, 251, 0.55),
      inset 0 0 0 rgba(255, 255, 255, 0);
  }

  40% {
    transform: translateY(-1px);
    box-shadow:
      0 0 24px rgba(251, 191, 36, 0.8),
      inset 0 0 12px rgba(255, 255, 255, 0.35);
  }

  70% {
    transform: translateY(0);
    box-shadow:
      0 0 10px rgba(176, 251, 36, 0.65),
      inset 0 0 0 rgba(255, 255, 255, 0);
  }
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 1.5s infinite;
}
</style>
