<template>
  <section class="py-20 bg-gradient-to-b from-white to-blue-50">
    <div class="container mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 bg-purple-100 border border-purple-300 rounded-full px-6 py-3 mb-4">
          <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
          </svg>
          <span class="text-purple-700 font-bold text-sm">FREE WITH EVERY LICENSE PURCHASE</span>
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
          Comprehensive Training Services
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Expert-led training programs designed to maximize your team's productivity and software proficiency
        </p>
      </div>

      <!-- Training Types Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <!-- On-Site Training -->
        <div class="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-purple-200 hover:border-purple-400">
          <div class="relative h-64 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 overflow-hidden">
            <div class="absolute inset-0 opacity-20">
              <div class="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
              <div class="absolute bottom-0 right-0 w-64 h-64 bg-pink-400 rounded-full filter blur-3xl"></div>
            </div>
            <div class="relative h-full flex flex-col items-center justify-center text-white p-8">
              <div class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
                <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h3 class="text-3xl font-bold mb-2">On-Site Training</h3>
              <p class="text-purple-200 text-center">At your location, customized for your team</p>
            </div>
          </div>
          <div class="p-8">
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Instructor at Your Facility</p>
                  <p class="text-gray-600 text-sm">Expert trainers come to your location</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Customized Curriculum</p>
                  <p class="text-gray-600 text-sm">Tailored to your specific needs and projects</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Hands-On Practice</p>
                  <p class="text-gray-600 text-sm">Real-world examples and exercises</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Flexible Scheduling</p>
                  <p class="text-gray-600 text-sm">Training scheduled around your operations</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Online Training -->
        <div class="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-blue-200 hover:border-blue-400">
          <div class="relative h-64 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-800 overflow-hidden">
            <div class="absolute inset-0 opacity-20">
              <div class="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
              <div class="absolute bottom-0 right-0 w-64 h-64 bg-cyan-400 rounded-full filter blur-3xl"></div>
            </div>
            <div class="relative h-full flex flex-col items-center justify-center text-white p-8">
              <div class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
                <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="text-3xl font-bold mb-2">Online Training</h3>
              <p class="text-blue-200 text-center">Live virtual sessions from anywhere in the world</p>
            </div>
          </div>
          <div class="p-8">
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Live Interactive Sessions</p>
                  <p class="text-gray-600 text-sm">Real-time Q&A with expert instructors</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Screen Sharing & Remote Access</p>
                  <p class="text-gray-600 text-sm">Direct collaboration and problem-solving</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Recorded Sessions</p>
                  <p class="text-gray-600 text-sm">Access recordings for future reference</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Global Time Zones</p>
                  <p class="text-gray-600 text-sm">Convenient scheduling for any location</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Webinars -->
        <div class="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-green-200 hover:border-green-400">
          <div class="relative h-64 bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 overflow-hidden">
            <div class="absolute inset-0 opacity-20">
              <div class="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
              <div class="absolute bottom-0 right-0 w-64 h-64 bg-emerald-400 rounded-full filter blur-3xl"></div>
            </div>
            <div class="relative h-full flex flex-col items-center justify-center text-white p-8">
              <div class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
                <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="text-3xl font-bold mb-2">MSC Webinars</h3>
              <p class="text-green-200 text-center">Regular online sessions on latest MSC features</p>
            </div>
          </div>
          <div class="p-8">
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Monthly Live Sessions</p>
                  <p class="text-gray-600 text-sm">Regular updates on MSC software features</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Expert Demonstrations</p>
                  <p class="text-gray-600 text-sm">Real-world use cases and best practices</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Q&A Sessions</p>
                  <p class="text-gray-600 text-sm">Interactive discussions with experts</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Free for All Clients</p>
                  <p class="text-gray-600 text-sm">Join unlimited webinars at no cost</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Seminars & Workshops -->
        <div class="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-orange-200 hover:border-orange-400">
          <div class="relative h-64 bg-gradient-to-br from-orange-600 via-orange-700 to-red-800 overflow-hidden">
            <div class="absolute inset-0 opacity-20">
              <div class="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
              <div class="absolute bottom-0 right-0 w-64 h-64 bg-yellow-400 rounded-full filter blur-3xl"></div>
            </div>
            <div class="relative h-full flex flex-col items-center justify-center text-white p-8">
              <div class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
                <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 class="text-3xl font-bold mb-2">Seminars & Workshops</h3>
              <p class="text-orange-200 text-center">Industry events and collaborative learning</p>
            </div>
          </div>
          <div class="p-8">
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Industry Seminars</p>
                  <p class="text-gray-600 text-sm">Quarterly events on MSC software trends</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Hands-On Workshops</p>
                  <p class="text-gray-600 text-sm">Intensive practical sessions with experts</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Networking Opportunities</p>
                  <p class="text-gray-600 text-sm">Connect with other MSC users and experts</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Latest Features & Updates</p>
                  <p class="text-gray-600 text-sm">Stay current with MSC innovations</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Training Programs -->
      <div class="mb-12">
        <h3 class="text-3xl font-bold text-gray-900 text-center mb-10">
          Available Training Programs
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(program, index) in trainingPrograms"
            :key="index"
            class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-300"
          >
            <div class="flex items-start gap-4 mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <div>
                <h4 class="font-bold text-gray-900 text-lg mb-1">{{ program.title }}</h4>
                <p class="text-purple-600 text-sm font-semibold">{{ program.duration }}</p>
              </div>
            </div>
            <p class="text-gray-600 mb-4">{{ program.description }}</p>
            <div class="flex items-center gap-2 text-sm text-gray-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              <span>{{ program.level }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Training Features -->
      <div class="grid md:grid-cols-4 gap-6 mb-12">
        <div class="text-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
          </div>
          <h4 class="font-bold text-gray-900 mb-2">Certified Instructors</h4>
          <p class="text-gray-600 text-sm">Expert trainers with real-world experience</p>
        </div>

        <div class="text-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <h4 class="font-bold text-gray-900 mb-2">Course Materials</h4>
          <p class="text-gray-600 text-sm">Comprehensive manuals and resources</p>
        </div>

        <div class="text-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
            </svg>
          </div>
          <h4 class="font-bold text-gray-900 mb-2">Certificates</h4>
          <p class="text-gray-600 text-sm">Official completion certificates</p>
        </div>

        <div class="text-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
          </div>
          <h4 class="font-bold text-gray-900 mb-2">Post-Training Support</h4>
          <p class="text-gray-600 text-sm">Ongoing assistance after training</p>
        </div>
      </div>

      <!-- FREE Banner -->
      <div class="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl p-8 md:p-12 text-center shadow-2xl border-4 border-yellow-300">
        <div class="flex flex-col md:flex-row items-center justify-center gap-6">
          <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
            </svg>
          </div>
          <div class="text-white">
            <h3 class="text-3xl md:text-4xl font-bold mb-2">
              100% FREE Training with Every License
            </h3>
            <p class="text-xl text-yellow-100">
              No additional charges. No hidden fees. Complete training included with your software purchase!
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const trainingPrograms = ref([
  {
    title: 'MSC Nastran Basics',
    duration: '3-5 Days',
    description: 'Introduction to FEA concepts and MSC Nastran fundamentals',
    level: 'Beginner to Intermediate'
  },
  {
    title: 'Advanced Nastran',
    duration: '3-5 Days',
    description: 'Advanced analysis techniques and optimization strategies',
    level: 'Advanced'
  },
  {
    title: 'Patran Modeling',
    duration: '2-3 Days',
    description: 'Complete pre-processing and model preparation workflow',
    level: 'All Levels'
  },
  {
    title: 'Marc Nonlinear Analysis',
    duration: '4-5 Days',
    description: 'Nonlinear material behavior and contact analysis',
    level: 'Intermediate to Advanced'
  },
  {
    title: 'Dytran Explicit Dynamics',
    duration: '3-4 Days',
    description: 'Crash, impact, and transient dynamic analysis',
    level: 'Intermediate'
  },
  {
    title: 'Actran Acoustics',
    duration: '3-4 Days',
    description: 'Acoustic simulation and vibro-acoustic analysis',
    level: 'Intermediate to Advanced'
  }
])
</script>

<style scoped>
/* Additional styles if needed */
</style>

