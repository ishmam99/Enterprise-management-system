<template>
  <div class="w-4/5 mx-auto">
    <!-- Header Section -->
    <div class="bg-white/95 backdrop-blur-xl border-b border-gray-200/30 sticky top-0 z-10 shadow-lg shadow-purple-100/20">
      <div class="mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div class="flex-1">
            <div class="flex items-center gap-4">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 rounded-2xl blur-lg opacity-70"></div>
                <div class="relative p-3 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 rounded-2xl shadow-2xl">
                  <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                  </svg>
                </div>
              </div>
              <div>
                <h1 class="text-3xl lg:text-4xl pb-1 font-black bg-gradient-to-r from-rose-600 via-pink-600 to-purple-700 bg-clip-text text-transparent">
                  {{ props.activeTab }} {{ props.activeTab !== 'All' ? '' : '' }} Overview - User Management System
                </h1>
                <p class="text-gray-600 mt-2 flex items-center gap-2">
                  <span class="px-3 py-1.5 bg-gradient-to-r from-emerald-400 to-cyan-500 text-white text-xs font-bold rounded-full shadow-lg shadow-emerald-400/30">
                    ✨ Live Dashboard
                  </span>
                  <span class="text-sm font-medium text-gray-700">Real-time analytics & insights</span>
                </p>
              </div>
            </div>
          </div>
          
          <div v-if="props.activeTab !== 'All'" class="flex-shrink-0">
            <button 
              @click="$emit('setTab','All')"
              class="group relative inline-flex items-center px-6 py-3.5 text-sm font-bold rounded-2xl bg-gradient-to-r from-white to-gray-50 text-gray-800 shadow-xl border border-purple-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 hover:border-pink-300"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              <svg class="w-5 h-5 mr-2 text-purple-600 group-hover:text-pink-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- All Dashboard View -->
      <div v-if="props.activeTab === 'All'" class="space-y-8">
        <!-- Stats Grid - Rainbow Color Scheme -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Total Users Card - Purple Theme -->
          <div class="group relative bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-fuchsia-500/10 rounded-3xl shadow-2xl border-2 border-purple-200/50 p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-fuchsia-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="absolute -top-10 -right-10 w-24 h-24 bg-purple-300/30 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
            <div class="absolute -bottom-8 -left-8 w-20 h-20 bg-fuchsia-300/20 rounded-full group-hover:scale-125 transition-transform duration-1000"></div>
            
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-4">
                <p class="text-sm font-bold text-purple-800 uppercase tracking-wide">Total Users</p>
                <div class="p-2 bg-gradient-to-br from-purple-200 to-fuchsia-200 rounded-xl shadow-inner">
                  <div class="p-1.5 bg-white/80 rounded-lg shadow-sm">
                    <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <p class="text-4xl font-black text-gray-900 mb-3">
                <count-up :end-val="dbStats?.bid_forms" class="bg-gradient-to-r from-purple-700 to-fuchsia-600 bg-clip-text text-transparent"/>
              </p>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 bg-gradient-to-r from-purple-400 to-fuchsia-500 rounded-full animate-pulse shadow-lg shadow-purple-400/50"></div>
                  <span class="text-xs font-semibold text-purple-700">Active now</span>
                </div>
                <div class="px-2 py-1 bg-gradient-to-r from-purple-100 to-fuchsia-100 rounded-full border border-purple-200">
                  <span class="text-xs font-bold text-purple-700">+12%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Total Schedules Card - Blue Theme -->
          <div class="group relative bg-gradient-to-br from-blue-500/10 via-cyan-400/5 to-sky-500/10 rounded-3xl shadow-2xl border-2 border-blue-200/50 p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="absolute -top-10 -right-10 w-24 h-24 bg-blue-300/30 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
            <div class="absolute -bottom-8 -left-8 w-20 h-20 bg-cyan-300/20 rounded-full group-hover:scale-125 transition-transform duration-1000"></div>
            
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-4">
                <p class="text-sm font-bold text-blue-800 uppercase tracking-wide">Total Schedules</p>
                <div class="p-2 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-xl shadow-inner">
                  <div class="p-1.5 bg-white/80 rounded-lg shadow-sm">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                    </svg>
                  </div>
                </div>
              </div>
              <p class="text-4xl font-black text-gray-900 mb-3">
                <count-up :end-val="dbStats?.purchases" class="bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent"/>
              </p>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full shadow-lg shadow-blue-400/50"></div>
                  <span class="text-xs font-semibold text-blue-700">Ongoing</span>
                </div>
                <div class="px-2 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full border border-blue-200">
                  <span class="text-xs font-bold text-blue-700">+8%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Total Skills Card - Orange Theme -->
          <div class="group relative bg-gradient-to-br from-amber-500/10 via-orange-400/5 to-red-500/10 rounded-3xl shadow-2xl border-2 border-amber-200/50 p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="absolute -top-10 -right-10 w-24 h-24 bg-amber-300/30 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
            <div class="absolute -bottom-8 -left-8 w-20 h-20 bg-orange-300/20 rounded-full group-hover:scale-125 transition-transform duration-1000"></div>
            
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-4">
                <p class="text-sm font-bold text-amber-800 uppercase tracking-wide">Total Skills</p>
                <div class="p-2 bg-gradient-to-br from-amber-200 to-orange-200 rounded-xl shadow-inner">
                  <div class="p-1.5 bg-white/80 rounded-lg shadow-sm">
                    <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <p class="text-4xl font-black text-gray-900 mb-3">
                <count-up :end-val="dbStats?.vendors_status_2" class="bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent"/>
              </p>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse shadow-lg shadow-amber-400/50"></div>
                  <span class="text-xs font-semibold text-amber-700">Available</span>
                </div>
                <div class="px-2 py-1 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full border border-amber-200">
                  <span class="text-xs font-bold text-amber-700">+15%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Active Vendors Card - Green Theme -->
          <div class="group relative bg-gradient-to-br from-emerald-500/10 via-green-400/5 to-teal-500/10 rounded-3xl shadow-2xl border-2 border-emerald-200/50 p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="absolute -top-10 -right-10 w-24 h-24 bg-emerald-300/30 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
            <div class="absolute -bottom-8 -left-8 w-20 h-20 bg-green-300/20 rounded-full group-hover:scale-125 transition-transform duration-1000"></div>
            
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-4">
                <p class="text-sm font-bold text-emerald-800 uppercase tracking-wide">Active Users</p>
                <div class="p-2 bg-gradient-to-br from-emerald-200 to-green-200 rounded-xl shadow-inner">
                  <div class="p-1.5 bg-white/80 rounded-lg shadow-sm">
                    <!-- Active Users Icon -->
                    <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <p class="text-4xl font-black text-gray-900 mb-3">
                <count-up :end-val="dbStats?.vendors_status_3" class="bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent"/>
              </p>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                  <span class="text-xs font-semibold text-emerald-700">Online</span>
                </div>
                <div class="px-2 py-1 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full border border-emerald-200">
                  <span class="text-xs font-bold text-emerald-700">+22%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions - Rainbow Gradient Section -->
        <div class="group relative bg-gradient-to-br from-sky-500/10 via-purple-500/5 to-blue-500/10 rounded-3xl shadow-2xl border-2 border-purple-200/50 p-8 hover:shadow-3xl transition-all duration-700 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-violet-500/15 via-purple-500/10 to-pink-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div class="absolute -top-24 -right-24 w-48 h-48 bg-violet-300/20 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
          <div class="absolute -bottom-24 -left-24 w-48 h-48 bg-pink-300/20 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
          
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-10">
              <div class="flex items-center gap-4">
                <div class="relative">
                  <div class="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-60"></div>
                  <div class="relative p-4 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 class="text-2xl font-black bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Quick Actions</h3>
                  <p class="text-gray-700 mt-2 font-semibold">Instant access to frequently used features</p>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <!-- Create User - Blue/Purple -->
              <router-link
                to="/user_management/user_creation/createUser"
                class="group relative p-8 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-500/10 rounded-2xl shadow-xl border-2 border-blue-200/50 hover:border-purple-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-600/0 group-hover:from-blue-500/15 group-hover:to-purple-600/15 transition-all duration-500"></div>
                <div class="absolute -top-6 -right-6 w-16 h-16 bg-blue-300/30 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                <div class="relative z-10 flex flex-col items-center text-center">
                  <div class="p-5 bg-gradient-to-br from-blue-200 to-purple-200 rounded-3xl shadow-inner mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    <div class="p-4 bg-white/90 rounded-2xl shadow-lg">
                      <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                      </svg>
                    </div>
                  </div>
                  <span class="text-lg font-black text-gray-800 group-hover:text-blue-700 transition-colors mb-2">Create User</span>
                  <span class="text-sm text-gray-600 font-medium">Add new users to the system</span>
                </div>
              </router-link>

              <!-- Active Users - Green/Teal -->
              <router-link
                to="/user_management/user/active"
                class="group relative p-8 bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-teal-500/10 rounded-2xl shadow-xl border-2 border-emerald-200/50 hover:border-teal-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-teal-600/0 group-hover:from-emerald-500/15 group-hover:to-teal-600/15 transition-all duration-500"></div>
                <div class="absolute -top-6 -right-6 w-16 h-16 bg-emerald-300/30 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                <div class="relative z-10 flex flex-col items-center text-center">
                  <div class="p-5 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-3xl shadow-inner mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    <div class="p-4 bg-white/90 rounded-2xl shadow-lg">
                      <svg class="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                  </div>
                  <span class="text-lg font-black text-gray-800 group-hover:text-emerald-700 transition-colors mb-2">Active Users</span>
                  <span class="text-sm text-gray-600 font-medium">Manage active user accounts</span>
                </div>
              </router-link>

              <!-- Skill List - Orange/Red -->
              <router-link
                to="/user_management/skillsList/skillList"
                class="group relative p-8 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-red-500/10 rounded-2xl shadow-xl border-2 border-amber-200/50 hover:border-red-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-amber-500/0 to-red-600/0 group-hover:from-amber-500/15 group-hover:to-red-600/15 transition-all duration-500"></div>
                <div class="absolute -top-6 -right-6 w-16 h-16 bg-amber-300/30 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                <div class="relative z-10 flex flex-col items-center text-center">
                  <div class="p-5 bg-gradient-to-br from-amber-200 to-red-200 rounded-3xl shadow-inner mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    <div class="p-4 bg-white/90 rounded-2xl shadow-lg">
                      <svg class="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                      </svg>
                    </div>
                  </div>
                  <span class="text-lg font-black text-gray-800 group-hover:text-amber-700 transition-colors mb-2">Skill List</span>
                  <span class="text-sm text-gray-600 font-medium">View and manage all skills</span>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Bid Management View - Colorful Cards -->
      <div v-if="props.activeTab === 'Bid Management'" class="space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Total Bids Card - Emerald Theme -->
          <div class="group relative bg-gradient-to-br from-emerald-500/15 via-green-500/10 to-teal-500/15 rounded-3xl shadow-2xl border-2 border-emerald-200/60 p-8 hover:shadow-3xl hover:-translate-y-2 transition-all duration-700 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/25 to-green-600/25 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="absolute -top-12 -right-12 w-32 h-32 bg-emerald-300/30 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-6">
                <p class="text-lg font-black text-emerald-800 uppercase tracking-wide">Total Bids</p>
                <div class="p-3 bg-gradient-to-br from-emerald-200 to-green-200 rounded-2xl shadow-inner">
                  <div class="p-2 bg-white/90 rounded-xl shadow-lg">
                    <svg class="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <p class="text-5xl font-black text-gray-900 mb-4">
                <count-up :end-val="dbStats?.bid_forms" class="bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent"/>
              </p>
              <div class="px-4 py-2 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full border border-emerald-300 inline-block">
                <span class="text-sm font-black text-emerald-700">🎯 Active Bidding</span>
              </div>
            </div>
          </div>

          <!-- New Applied Bids Card - Sky Blue Theme -->
          <div class="group relative bg-gradient-to-br from-sky-500/15 via-blue-500/10 to-cyan-500/15 rounded-3xl shadow-2xl border-2 border-sky-200/60 p-8 hover:shadow-3xl hover:-translate-y-2 transition-all duration-700 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-sky-500/25 to-cyan-600/25 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="absolute -top-12 -right-12 w-32 h-32 bg-sky-300/30 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-6">
                <p class="text-lg font-black text-sky-800 uppercase tracking-wide">New Applied Bids</p>
                <div class="p-3 bg-gradient-to-br from-sky-200 to-cyan-200 rounded-2xl shadow-inner">
                  <div class="p-2 bg-white/90 rounded-xl shadow-lg">
                    <svg class="w-7 h-7 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                    </svg>
                  </div>
                </div>
              </div>
              <p class="text-5xl font-black text-gray-900 mb-4">
                <count-up :end-val="dbStats?.vendors_status_2" class="bg-gradient-to-r from-sky-700 to-cyan-600 bg-clip-text text-transparent"/>
              </p>
              <div class="px-4 py-2 bg-gradient-to-r from-sky-100 to-cyan-100 rounded-full border border-sky-300 inline-block">
                <span class="text-sm font-black text-sky-700">📈 Growing Fast</span>
              </div>
            </div>
          </div>

          <!-- Completed Bids Card - Rose Theme -->
          <div class="group relative bg-gradient-to-br from-rose-500/15 via-pink-500/10 to-fuchsia-500/15 rounded-3xl shadow-2xl border-2 border-rose-200/60 p-8 hover:shadow-3xl hover:-translate-y-2 transition-all duration-700 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-rose-500/25 to-fuchsia-600/25 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="absolute -top-12 -right-12 w-32 h-32 bg-rose-300/30 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-6">
                <p class="text-lg font-black text-rose-800 uppercase tracking-wide">Completed Bids</p>
                <div class="p-3 bg-gradient-to-br from-rose-200 to-fuchsia-200 rounded-2xl shadow-inner">
                  <div class="p-2 bg-white/90 rounded-xl shadow-lg">
                    <svg class="w-7 h-7 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <p class="text-5xl font-black text-gray-900 mb-4">
                <count-up :end-val="dbStats?.purchases" class="bg-gradient-to-r from-rose-700 to-fuchsia-600 bg-clip-text text-transparent"/>
              </p>
              <div class="px-4 py-2 bg-gradient-to-r from-rose-100 to-fuchsia-100 rounded-full border border-rose-300 inline-block">
                <span class="text-sm font-black text-rose-700">✅ Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, ref, onMounted } from 'vue';
import { useAuthStore } from '/src/stores/AuthStore';
import { useRouter, useRoute } from 'vue-router';
import CountUp from "vue-countup-v3";
import { useUserManagementStore } from './stores/userManagementStore';

const authStore = useAuthStore()
const route = useRoute();
const router = useRouter();
const store = useUserManagementStore();
const props = defineProps({
  activeTab: {
    type: String,
    default: ''
  }
})
defineEmits(['setTab'])

const softwares = [
  'Actran', 'CAEfatigue', 'Cradle CFD', 'MSC Apex', 'Dytran', 
  'Marc', 'Patran', 'MSC Nastran', 'MSC CoSim'
]

const dbStats = ref()

const fetchDbStats = async () => {
  try {
    const { data } = await api().get('supply-chain-director-stats');
    dbStats.value = data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
  }
}

onMounted(async () => {
  store.setCurrentSubMenu('')
  fetchDbStats();
})
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Enhanced smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 500ms;
}
</style>