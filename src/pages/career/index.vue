<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950 text-white overflow-hidden min-h-[85vh] flex items-center">
      <!-- Animated Background Pattern -->
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGgxMnYxMkg0OHYxMkgzNnYtMTJoMTJ2LTEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>

      <!-- Floating Geometric Shapes -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div class="absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div class="max-w-5xl mx-auto text-center">
          <!-- Badge -->
          <div class="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md border-2 border-green-400/30 rounded-full px-6 py-3 mb-8 shadow-2xl animate-bounce-slow">
            <span class="relative flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span class="text-green-200 font-bold text-lg">🎯 11 Positions Open Now!</span>
            <svg class="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
          </div>

          <!-- Main Heading -->
          <h1 class="text-5xl sm:text-3xl md:text-4xl lg:text-4xl font-extrabold leading-tight mb-8 tracking-tight">
            <span class="block text-white">Shape the Future of</span>
            <span class="block mt-3 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Engineering Innovation
            </span>
          </h1>

          <!-- Subheading -->
          <p class="text-xl md:text-2xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-6 font-light">
            Join Hi-Tech SoftSys and work with the world's leading simulation software
          </p>

          <p class="text-lg md:text-xl text-blue-200/80 max-w-3xl mx-auto leading-relaxed mb-10">
            Power your career with <span class="font-semibold text-cyan-300"> MSC Software</span> • Global exposure • Leadership opportunities • Work with Fortune 500 companies
          </p>

          <!-- Stats Bar -->
          <div class="flex flex-wrap justify-center gap-6 md:gap-8 mb-10">
            <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 shadow-xl">
              <div class="text-3xl md:text-4xl font-bold text-white mb-1">15+</div>
              <div class="text-sm text-blue-200">Years Excellence</div>
            </div>
            <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 shadow-xl">
              <div class="text-3xl md:text-4xl font-bold text-white mb-1">100+</div>
              <div class="text-sm text-blue-200">Global Clients</div>
            </div>
            <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 shadow-xl">
              <div class="text-3xl md:text-4xl font-bold text-white mb-1">50+</div>
              <div class="text-sm text-blue-200">Team Members</div>
            </div>
          </div>

          <!-- Deadline Alert -->
          <div class="inline-flex items-center gap-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-md border-2 border-amber-400/40 rounded-2xl px-8 py-4 mb-10 shadow-2xl">
            <div class="bg-amber-500 rounded-full p-3 animate-pulse">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="text-left">
              <div class="text-amber-200 font-bold text-xl md:text-2xl">Application Deadline: January 15, 2026</div>
              <div class="text-amber-300 text-sm md:text-base mt-1 flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Only 12 days left to apply!
              </div>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <a href="#openings" class="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transform">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span>Explore All Positions</span>
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>

            <!-- <a href="mailto:ahsan.ansary@hitechsoftsys.net" class="group px-10 py-5 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold text-lg rounded-2xl border-3 border-white/30 hover:border-white/50 transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-xl hover:scale-105 transform">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span>Submit Resume</span>
            </a> -->
            <router-link to="career/SubmitResume" class="group px-10 py-5 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold text-lg rounded-2xl border-3 border-white/30 hover:border-white/50 transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-xl hover:scale-105 transform">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span>Submit Resume</span>
            </router-link>
          </div>

          <!-- Bottom Tags -->
          <div class="mt-12 flex flex-wrap justify-center gap-3">
            <span class="bg-white/10 backdrop-blur-sm border border-white/20 text-blue-200 px-5 py-2 rounded-full text-sm font-semibold">
              🚀 Remote Work Available
            </span>
            <span class="bg-white/10 backdrop-blur-sm border border-white/20 text-blue-200 px-5 py-2 rounded-full text-sm font-semibold">
              💼 Leadership Roles Open
            </span>
            <span class="bg-white/10 backdrop-blur-sm border border-white/20 text-blue-200 px-5 py-2 rounded-full text-sm font-semibold">
              🎓 Freshers Welcome
            </span>
            <span class="bg-white/10 backdrop-blur-sm border border-white/20 text-blue-200 px-5 py-2 rounded-full text-sm font-semibold">
              🌍 Global Exposure
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

      <!-- Why Join Us Section -->
      <div class="mb-20">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Hi-Tech SoftSys?
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            We offer more than just a job - we provide a platform for growth, innovation, and excellence
          </p>
          <div class="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-full px-6 py-3">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            <span class="text-green-800 font-bold">Fresh Graduates & Experienced Professionals Welcome!</span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-200 hover:-translate-y-1">
            <div class="bg-blue-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Global Opportunities</h3>
            <p class="text-gray-600">Work with international clients and expand your professional network globally</p>
          </div>

          <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-200 hover:-translate-y-1">
            <div class="bg-purple-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Innovation First</h3>
            <p class="text-gray-600">Work on cutting-edge MSC Software solutions and engineering projects</p>
          </div>

          <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-200 hover:-translate-y-1">
            <div class="bg-green-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Competitive Pay</h3>
            <p class="text-gray-600">Industry-leading compensation packages and performance bonuses</p>
          </div>

          <div class="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-200 hover:-translate-y-1">
            <div class="bg-orange-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Learning & Growth</h3>
            <p class="text-gray-600">Continuous training, certifications, and professional development</p>
          </div>
        </div>
      </div>

      <!-- Main Career Section -->
      <div id="openings" class="bg-white rounded-2xl shadow-2xl overflow-hidden mb-16 scroll-mt-20">

        <!-- Table Header -->
        <div class="bg-gradient-to-r from-[#0a1d3b] to-[#133c8b] text-white px-8 py-8">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-3xl md:text-4xl font-bold uppercase tracking-wide mb-2">
                Career Opportunities
              </h2>
              <p class="text-blue-200 text-lg opacity-90">
                {{ jobs.length }} open positions available
              </p>
            </div>
            <div class="hidden md:flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-lg">
              <i class="fa-solid fa-briefcase text-blue-300 text-xl"></i>
              <span class="text-blue-100 font-medium">We're Hiring</span>
            </div>
          </div>
        </div>

        <!-- Table Container -->
        <div class="overflow-x-auto">
          <!-- Loading State -->
          <div v-if="loading" class="flex items-center justify-center py-20">
            <div class="text-center">
              <div class="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mb-4"></div>
              <p class="text-gray-600 text-lg font-medium">Loading job opportunities...</p>
              <p class="text-gray-400 text-sm mt-2">Please wait while we fetch the latest positions</p>
            </div>
          </div>

          <!-- Jobs Table -->
          <table v-else class="w-full text-left">
            <thead class="bg-gradient-to-r from-slate-800 to-slate-700 text-white table-zebra">
              <tr>
                <th class="py-6 px-6 font-bold text-lg uppercase tracking-wider border-r border-slate-600/50 w-20 text-center">
                  <div class="flex items-center justify-center gap-2">
                    <i class="fa-solid fa-hashtag text-blue-300"></i>
                    <span>S/N</span>
                  </div>
                </th>
                <th class="py-6 px-6 font-bold text-lg uppercase tracking-wider border-r border-slate-600/50">
                  <div class="flex items-center gap-3">
                    <i class="fa-solid fa-suitcase text-blue-300"></i>
                    <span>Job Title</span>
                  </div>
                </th>
                <th class="py-6 px-6 font-bold text-lg uppercase tracking-wider border-r border-slate-600/50">
                  <div class="flex items-center gap-3">
                    <i class="fa-solid fa-calendar-clock text-blue-300"></i>
                    <span>Application Deadline</span>
                  </div>
                </th>
                <th class="py-6 px-6 font-bold text-lg uppercase tracking-wider text-center w-48">
                  <div class="flex items-center justify-center gap-3">
                    <i class="fa-solid fa-eye text-blue-300"></i>
                    <span>Job Details</span>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-200">
              <!-- Empty State -->
              <tr v-if="!loading && jobs.length === 0">
                <td colspan="4" class="py-20 text-center">
                  <div class="flex flex-col items-center justify-center">
                    <svg class="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <p class="text-xl font-semibold text-gray-700 mb-2">No job openings at the moment</p>
                    <p class="text-gray-500">Check back soon for new opportunities!</p>
                  </div>
                </td>
              </tr>

              <!-- Jobs List -->
              <tr
                v-for="(job, index) in jobs"
                :key="job.id || index"
                class="group hover:bg-gradient-to-r hover:from-blue-50 hover:to-slate-50 transition-all duration-300 ease-in-out"
                :class="index % 2 === 0 ? 'bg-white' : 'bg-slate-50/80'"
              >
                <!-- Serial Number -->
                <td class="py-5 px-6 text-center">
                  <div class="flex items-center justify-center">
                    <span class="font-bold text-lg w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                      :class="job.isFresher ? 'bg-green-100 text-green-700 group-hover:bg-green-600 group-hover:text-white' : 'bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white'">
                      {{ index + 1 }}
                    </span>
                  </div>
                </td>

                <!-- Job Title -->
                <td class="py-5 px-6">
                  <div class="flex items-start gap-4">
                    <div class="text-white p-3 rounded-xl shadow-sm"
                      :class="job.isFresher ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-blue-500 to-blue-600'">
                      <i class="fa-solid fa-laptop-code text-lg"></i>
                    </div>
                    <div>
                      <h3 class="text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300 mb-1">
                        {{ job.title }}
                      </h3>
                      <p class="text-sm text-gray-600 mb-2 line-clamp-2">
                        {{ job.description }}
                      </p>
                      <div class="flex flex-wrap gap-2 mt-2">
                        <span v-if="job.isFresher" class="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full border-2 border-green-300 animate-pulse">
                          <i class="fa-solid fa-star mr-1"></i>
                          FRESHER FRIENDLY
                        </span>
                        <span class="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                          <i class="fa-solid fa-location-dot mr-1"></i>
                          {{ job.location }}
                        </span>
                        <span class="bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full">
                          <i class="fa-solid fa-briefcase mr-1"></i>
                          {{ job.type }}
                        </span>
                        <span class="text-xs font-medium px-3 py-1 rounded-full"
                          :class="job.isFresher ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'">
                          <i class="fa-solid fa-clock mr-1"></i>
                          {{ job.experience }}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>


                <!-- Application Deadline -->
                <td class="py-5 px-6">
                  <div class="flex items-center gap-3">
                    <div class="bg-red-100 p-2 rounded-lg">
                      <i class="fa-solid fa-clock text-red-600"></i>
                    </div>
                    <div>
                      <span class="text-lg font-semibold text-gray-900 block">
                        {{ job.deadline }}
                      </span>
                      <span class="text-sm text-red-600 font-medium flex items-center gap-1 mt-1">
                        <i class="fa-solid fa-exclamation-circle"></i>
                        Apply soon
                      </span>
                    </div>
                  </div>
                </td>

                <!-- Action Button -->
                <td class="py-5 px-6 text-center">
                  <!-- <button
                    @click="openJobDetails(job)"
                    class="group relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out overflow-hidden"
                  >
                    <span class="relative z-10 flex items-center gap-2">
                      <i class="fa-solid fa-file-lines"></i>
                      Read Details
                    </span>
                    <div class="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button> -->
                  <router-link :to="`/career/${job.id}`" class="group relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out overflow-hidden">
                  <button><i class="fa-solid fa-file-lines"></i> view details</button>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Table Footer -->
        <div class="bg-slate-50 border-t border-slate-200 px-8 py-6">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4">
            <p class="text-gray-600 text-lg">
              <i class="fa-solid fa-info-circle text-blue-500 mr-2"></i>
              Can't find what you're looking for?
              <a href="#" class="text-blue-600 hover:text-blue-700 font-semibold ml-1 underline">
                Send us your CV
              </a>
            </p>
            <div class="flex items-center gap-2 text-green-600 font-semibold">
              <i class="fa-solid fa-bolt"></i>
              <span>Urgent Hiring</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Comprehensive Benefits Section -->
      <div class="mb-20">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Employee Benefits & Perks
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            We believe in taking care of our team with comprehensive benefits and a supportive work environment
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 group">
            <div class="flex items-start gap-4">
              <div class="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">
                <svg class="w-6 h-6 text-blue-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">Competitive Salary</h3>
                <p class="text-gray-600 text-sm">Market-leading compensation with annual increments and performance bonuses</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 group">
            <div class="flex items-start gap-4">
              <div class="bg-green-100 p-3 rounded-lg group-hover:bg-green-600 transition-colors duration-300">
                <svg class="w-6 h-6 text-green-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">Health Insurance</h3>
                <p class="text-gray-600 text-sm">Comprehensive health coverage for you and your family members</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 group">
            <div class="flex items-start gap-4">
              <div class="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-600 transition-colors duration-300">
                <svg class="w-6 h-6 text-purple-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">Work-Life Balance</h3>
                <p class="text-gray-600 text-sm">Flexible working hours and remote work options for better balance</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 group">
            <div class="flex items-start gap-4">
              <div class="bg-orange-100 p-3 rounded-lg group-hover:bg-orange-600 transition-colors duration-300">
                <svg class="w-6 h-6 text-orange-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">Training & Certifications</h3>
                <p class="text-gray-600 text-sm">MSC Software certifications and professional development programs</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 group">
            <div class="flex items-start gap-4">
              <div class="bg-indigo-100 p-3 rounded-lg group-hover:bg-indigo-600 transition-colors duration-300">
                <svg class="w-6 h-6 text-indigo-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">Career Growth</h3>
                <p class="text-gray-600 text-sm">Clear career paths with opportunities for advancement and leadership roles</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 group">
            <div class="flex items-start gap-4">
              <div class="bg-red-100 p-3 rounded-lg group-hover:bg-red-600 transition-colors duration-300">
                <svg class="w-6 h-6 text-red-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">Paid Time Off</h3>
                <p class="text-gray-600 text-sm">Generous vacation days, sick leave, and paid holidays</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Our Culture Section -->
      <div class="mb-20">
        <div class="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl p-8 md:p-12 shadow-2xl text-white">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-3xl md:text-4xl font-bold mb-6">
                Our Work Culture
              </h2>
              <p class="text-xl text-indigo-200 mb-6">
                At Hi-Tech SoftSys, we foster a culture of innovation, collaboration, and continuous improvement.
              </p>
              <div class="space-y-4">
                <div class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p class="text-indigo-100">Collaborative team environment with Subject Matter Experts</p>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p class="text-indigo-100">Work on cutting-edge MSC Software technologies across industries</p>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p class="text-indigo-100">Global client base with domestic and international rates</p>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p class="text-indigo-100">24/7 on-demand availability with strategic client partnerships</p>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div class="text-3xl font-bold text-white mb-2">15+</div>
                <p class="text-indigo-200 text-sm">Years of Excellence</p>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div class="text-3xl font-bold text-white mb-2">100+</div>
                <p class="text-indigo-200 text-sm">Global Clients</p>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div class="text-3xl font-bold text-white mb-2">24/7</div>
                <p class="text-indigo-200 text-sm">Support Available</p>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div class="text-3xl font-bold text-white mb-2">50+</div>
                <p class="text-indigo-200 text-sm">Engineering Experts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Fresh Graduate Benefits Section -->
      <div class="mb-20">
        <div class="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-8 md:p-12 border-2 border-green-300 shadow-xl">
          <div class="text-center mb-8">
            <div class="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full mb-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
              <span class="font-bold text-lg">Special Program for Fresh Graduates</span>
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Launch Your Career in CAE & Simulation
            </h2>
            <p class="text-lg text-gray-700 max-w-3xl mx-auto">
              Fresh out of college? We provide comprehensive training programs to transform you into a CAE expert!
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white rounded-xl p-6 shadow-lg border border-green-200">
              <div class="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-900 text-center mb-2">Structured Training</h3>
              <p class="text-gray-600 text-sm text-center">6-month comprehensive training on MSC Software products</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg border border-green-200">
              <div class="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center (aptitude test for freshers) mb-4 mx-auto">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-900 text-center mb-2">Expert Mentorship</h3>
              <p class="text-gray-600 text-sm text-center">Learn from industry veterans with 10+ years experience</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg border border-green-200">
              <div class="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-900 text-center mb-2">Free Certifications</h3>
              <p class="text-gray-600 text-sm text-center">Get MSC Software certified during your training period</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg border border-green-200">
              <div class="bg-orange-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-900 text-center mb-2">Career Growth</h3>
              <p class="text-gray-600 text-sm text-center">Clear path from Trainee to Senior Engineer roles</p>
            </div>
          </div>

          <div class="mt-8 text-center">
            <p class="text-gray-700 text-lg mb-4">
              <span class="font-bold text-green-700">Eligibility:</span> B.S./M.S. in Mechanical, Aerospace, Automotive, or related Engineering (2024/2025 batch)
            </p>
            <a href="#openings" class="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-xl transition-all transform hover:scale-105">
              <span>View Fresher Positions</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Application Process -->
      <div class="mb-20">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Application Process
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Our straightforward hiring process designed to find the best talent
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="relative">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 text-center">
              <div class="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">1</div>
              <h3 class="font-bold text-gray-900 mb-2">Submit Application</h3>
              <p class="text-sm text-gray-600 mb-2">Email your resume with cover letter to:</p>
              <a href="mailto:ahsan.ansary@hitechsoftsys.net " class="text-sm font-bold text-blue-600 hover:text-blue-700 underline block mb-2">ahsan.ansary@hitechsoftsys.net </a>
              <p class="text-xs text-gray-500 italic">Subject: Position Title - Your Name</p>
            </div>
            <div class="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
              <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>

          <div class="relative">
            <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 text-center">
              <div class="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">2</div>
              <h3 class="font-bold text-gray-900 mb-2">Initial Screening</h3>
              <p class="text-sm text-gray-600">HR reviews your application and qualifications</p>
            </div>
            <div class="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
              <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>

          <div class="relative">
            <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 text-center">
              <div class="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">3</div>
              <h3 class="font-bold text-gray-900 mb-2">Technical Interview</h3>
              <p class="text-sm text-gray-600">Assessment with our technical team</p>
            </div>
            <div class="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
              <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>

          <div>
            <div class="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border-2 border-orange-200 text-center">
              <div class="bg-orange-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">4</div>
              <h3 class="font-bold text-gray-900 mb-2">Offer & Onboarding</h3>
              <p class="text-sm text-gray-600">Welcome to Hi-Tech SoftSys team!</p>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-center shadow-2xl">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Start Your Journey?
        </h2>
        <p class="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
          Don't see a position that matches your skills? We're always looking for talented individuals. Send us your resume!
        </p>

        <!-- Application Instructions -->
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 max-w-3xl mx-auto border border-white/20">
          <h3 class="text-xl font-bold text-white mb-4 flex items-center justify-center gap-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            How to Apply
          </h3>
          <div class="text-left text-white space-y-3">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p><span class="font-semibold">Email Address:</span> <a href="mailto:ahsan.ansary@hitechsoftsys.net " class="text-blue-200 hover:text-white underline font-bold">ahsan.ansary@hitechsoftsys.net </a></p>
            </div>
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p><span class="font-semibold">Required Documents:</span> Resume/CV and Cover Letter (PDF format preferred)</p>
            </div>
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p><span class="font-semibold">Email Subject:</span> "<span class="text-yellow-300">Application: [Position Title] - [Your Full Name]</span>"</p>
            </div>
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p><span class="font-semibold">Example:</span> "Application: Mechanical Engineer - Structural Analysis Specialist - John Smith"</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="mailto:ahsan.ansary@hitechsoftsys.net " class="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2 shadow-xl">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <span>Send Your Resume</span>
          </a>
          <a href="/contact_us" class="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/20 transition-colors inline-flex items-center justify-center gap-2">
            <span>Contact HR Team</span>
          </a>
        </div>
      </div>

    </div>

    <!-- Job Details Modal -->
    <div v-if="showJobModal" class="fixed inset-0 z-50 overflow-y-auto" @click.self="closeJobModal">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div class="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75" @click="closeJobModal"></div>

        <!-- Modal panel -->
        <div class="inline-block w-full max-w-5xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl">
          <!-- Modal Header -->
          <div class="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 px-8 py-6 text-white">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3 class="text-3xl font-bold mb-2">{{ selectedJob?.title }}</h3>
                <div class="flex flex-wrap gap-3 mt-3">
                  <span class="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium">
                    <i class="fa-solid fa-building mr-2"></i>{{ selectedJob?.department }}
                  </span>
                  <span class="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium">
                    <i class="fa-solid fa-location-dot mr-2"></i>{{ selectedJob?.location }}
                  </span>
                  <span class="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium">
                    <i class="fa-solid fa-briefcase mr-2"></i>{{ selectedJob?.type }}
                  </span>
                  <span class="bg-yellow-500/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium border border-yellow-300/50">
                    <i class="fa-solid fa-calendar mr-2"></i>Deadline: {{ selectedJob?.deadline }}
                  </span>
                </div>
              </div>
              <button @click="closeJobModal" class="ml-4 text-white hover:text-gray-200 transition-colors">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Modal Body -->
          <div class="px-8 py-6 max-h-[70vh] overflow-y-auto">
            <!-- Overview -->
            <div class="mb-8">
              <h4 class="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div class="w-1 h-8 bg-blue-600 rounded"></div>
                Position Overview
              </h4>
              <p class="text-gray-700 text-lg leading-relaxed">{{ selectedJob?.description }}</p>
            </div>

            <!-- Quick Info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <h5 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <i class="fa-solid fa-laptop-code text-blue-600"></i>
                  Primary Software
                </h5>
                <p class="text-gray-700 text-lg">{{ selectedJob?.software }}</p>
              </div>
              <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <h5 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <i class="fa-solid fa-chart-line text-green-600"></i>
                  Required Experience
                </h5>
                <p class="text-gray-700 text-lg">{{ selectedJob?.experience }}</p>
              </div>
            </div>

            <!-- Key Responsibilities -->
            <div class="mb-8">
              <h4 class="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div class="w-1 h-8 bg-purple-600 rounded"></div>
                Key Responsibilities
              </h4>
              <ul class="space-y-3">
                <li v-for="(responsibility, idx) in selectedJob?.responsibilities" :key="idx" class="flex items-start gap-3 text-gray-700">
                  <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span class="text-base leading-relaxed">{{ responsibility }}</span>
                </li>
              </ul>
            </div>

            <!-- Required Qualifications -->
            <div class="mb-8">
              <h4 class="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div class="w-1 h-8 bg-orange-600 rounded"></div>
                Required Qualifications
              </h4>
              <ul class="space-y-3">
                <li v-for="(qualification, idx) in selectedJob?.qualifications" :key="idx" class="flex items-start gap-3 text-gray-700">
                  <svg class="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span class="text-base leading-relaxed">{{ qualification }}</span>
                </li>
              </ul>
            </div>

            <!-- Key Skills -->
            <div class="mb-8">
              <h4 class="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div class="w-1 h-8 bg-indigo-600 rounded"></div>
                Key Skills & Competencies
              </h4>
              <div class="flex flex-wrap gap-2">
                <span v-for="(skill, idx) in selectedJob?.skills" :key="idx" class="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold border border-indigo-200">
                  {{ skill }}
                </span>
              </div>
            </div>

            <!-- Benefits Highlight -->
            <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 mb-6">
              <h4 class="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <i class="fa-solid fa-gift text-green-600 text-2xl"></i>
                What We Offer
              </h4>
              <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li class="flex items-center gap-2 text-gray-700">
                  <i class="fa-solid fa-check-circle text-green-600"></i>
                  <span>Competitive salary with performance bonuses</span>
                </li>
                <li class="flex items-center gap-2 text-gray-700">
                  <i class="fa-solid fa-check-circle text-green-600"></i>
                  <span>Comprehensive health insurance</span>
                </li>
                <li class="flex items-center gap-2 text-gray-700">
                  <i class="fa-solid fa-check-circle text-green-600"></i>
                  <span>Professional development & certifications</span>
                </li>
                <li class="flex items-center gap-2 text-gray-700">
                  <i class="fa-solid fa-check-circle text-green-600"></i>
                  <span>Flexible work arrangements</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="bg-gray-50 px-8 py-6 border-t border-gray-200">
            <div class="mb-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 class="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Application Instructions:
              </h4>
              <ul class="text-sm text-gray-700 space-y-1 ml-7">
                <li>• Email: <a href="mailto:ahsan.ansary@hitechsoftsys.net " class="text-blue-600 hover:text-blue-700 font-semibold underline">ahsan.ansary@hitechsoftsys.net </a></li>
                <li>• Include: Resume/CV + Cover Letter (PDF preferred)</li>
                <li>• Subject: "<span class="font-semibold">Application: {{ selectedJob?.title }} - [Your Name]</span>"</li>
              </ul>
            </div>
            <div class="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <p class="text-gray-600 text-sm">
                <i class="fa-solid fa-exclamation-circle text-orange-500 mr-2"></i>
                Application deadline: <span class="font-bold text-gray-900">{{ selectedJob?.deadline }}</span>
              </p>
              <button @click="closeJobModal" class="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/config/api';
import moment from 'moment';

const jobs = ref([]);
const loading = ref(false);

// Helper function to parse JSON strings safely
const parseJsonString = (jsonString) => {
  if (!jsonString) return [];
  if (Array.isArray(jsonString)) return jsonString;
  try {
    const parsed = JSON.parse(jsonString);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn('Failed to parse JSON string:', jsonString);
    return [];
  }
};

// Transform API job data to component format
const transformJobData = (apiJob) => {
  // Format deadline
  const formatDeadline = (deadline) => {
    if (!deadline) return 'N/A';
    try {
      return moment(deadline).format('DD MMMM, YYYY');
    } catch (e) {
      return deadline;
    }
  };

  // Build location string
  const buildLocation = (locationType, baseCountry) => {
    const parts = [];
    if (locationType) parts.push(locationType);
    if (baseCountry) parts.push(`(${baseCountry}-based)`);
    return parts.length > 0 ? parts.join(' ') : 'Not specified';
  };

  // Join software array
  const formatSoftware = (softwareArray) => {
    const parsed = parseJsonString(softwareArray);
    if (parsed.length === 0) return 'Not specified';
    return parsed.join(', ');
  };

  // Parse responsibilities
  const responsibilities = parseJsonString(apiJob.key_responsibilities);

  // Parse qualifications
  const qualifications = parseJsonString(apiJob.required_qualifications);

  // Parse skills
  const skills = parseJsonString(apiJob.key_skills);

  // Determine if fresher position
  const experience = apiJob.required_experience || '';
  const isFresher = experience.toLowerCase().includes('fresher') ||
                    experience.toLowerCase().includes('0') ||
                    experience.toLowerCase().includes('entry') ||
                    experience.toLowerCase().includes('trainee');

  return {
    id: apiJob.id,
    title: apiJob.title || 'Untitled Position',
    deadline: formatDeadline(apiJob.deadline),
    type: apiJob.job_type || 'Full-time',
    location: buildLocation(apiJob.location_type, apiJob.base_country),
    department: apiJob.department?.name || `Department ${apiJob.department_id}` || 'Not specified',
    experience: apiJob.required_experience || 'Not specified',
    software: formatSoftware(apiJob.primary_software),
    description: apiJob.overview || 'No description available',
    responsibilities: responsibilities,
    qualifications: qualifications,
    skills: skills,
    isFresher: isFresher
  };
};

// Fetch jobs from API
const fetchJobs = async () => {
  loading.value = true;
  try {
    const response = await api().get('job-public', {
      params: {
        status: 1 // Only fetch active jobs
      }
    });

    // Handle different response structures
    const jobData = response.data?.data || response.data || [];

    // Transform and filter active jobs (status can be string "1" or number 1)
    jobs.value = jobData
      .filter(job => job.status == 1 || job.status === "1")
      .map(transformJobData);

  } catch (error) {
    console.error('Error fetching jobs:', error);
    jobs.value = [];
  } finally {
    loading.value = false;
  }
};

// Fetch jobs on component mount
onMounted(() => {
  fetchJobs();
});

const selectedJob = ref(null);
const showJobModal = ref(false);

const openJobDetails = (job) => {
  selectedJob.value = job;
  showJobModal.value = true;
};

const closeJobModal = () => {
  showJobModal.value = false;
  selectedJob.value = null;
};
</script>

<style scoped>
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
