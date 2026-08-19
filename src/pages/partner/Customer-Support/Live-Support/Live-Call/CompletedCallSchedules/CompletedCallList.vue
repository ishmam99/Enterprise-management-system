<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <div class="flex items-center mb-2">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-3">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Completed Call Schedule List
            </h1>
          </div>
          <p class="text-gray-600 ml-13">Review and analyze all completed live call sessions</p>
        </div>
        <div class="flex items-center space-x-4">
          <button
            @click="$router.back()"
            class="flex items-center px-4 py-2 text-gray-600 hover:text-blue-700 transition-colors border border-gray-300 hover:border-blue-400 rounded-lg"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Back
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-2xl p-6 shadow-lg border border-blue-200">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ stats.totalCalls }}</p>
              <p class="text-sm text-gray-600">Total Completed</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-lg border border-green-200">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ stats.successfulCalls }}</p>
              <p class="text-sm text-gray-600">Successful</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-lg border border-purple-200">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ stats.averageDuration }}</p>
              <p class="text-sm text-gray-600">Avg Duration</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-lg border border-orange-200">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ stats.uniqueParticipants }}</p>
              <p class="text-sm text-gray-600">Participants</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-blue-100">
        <div class="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div class="flex-1">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search completed calls..."
                class="block w-full pl-10 pr-3 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-blue-50"
              >
            </div>
          </div>

          <div class="flex flex-wrap gap-4">
            <div class="relative">
              <select
                v-model="filters.priority"
                class="px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-purple-50 appearance-none pr-10"
              >
                <option value="all">All Priorities</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>

            <div class="relative">
              <select
                v-model="filters.type"
                class="px-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-green-50 appearance-none pr-10"
              >
                <option value="all">All Types</option>
                <option value="client-call">Client Call</option>
                <option value="team-meeting">Team Meeting</option>
                <option value="one-on-one">One-on-One</option>
                <option value="training">Training</option>
                <option value="webinar">Webinar</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>

            <div class="relative">
              <select
                v-model="filters.duration"
                class="px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-orange-50 appearance-none pr-10"
              >
                <option value="all">Any Duration</option>
                <option value="short">Short (&lt; 30min)</option>
                <option value="medium">Medium (30-60min)</option>
                <option value="long">Long (&gt; 60min)</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-20">
        <div class="inline-flex flex-col items-center">
          <div class="relative">
            <svg class="animate-spin h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
          <p class="text-gray-600 mt-4 font-medium">Loading completed calls...</p>
        </div>
      </div>

      <!-- Calls List -->
      <div v-else-if="filteredCalls.length > 0" class="space-y-6">
        <div
          v-for="call in filteredCalls"
          :key="call.id"
          class="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
        >
          <!-- Call Header -->
          <div class="p-6 border-b border-gray-100">
            <div class="flex justify-between items-start mb-3">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="text-lg font-semibold text-gray-900 line-clamp-1">{{ call.title || 'Untitled Call' }}</h3>
                  <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    Completed
                  </span>
                </div>
                <p class="text-sm text-gray-500">Call #{{ call.id }}</p>
              </div>
              <div class="flex items-center gap-2">
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-xs font-semibold',
                    call.priority === 'urgent' ? 'bg-red-100 text-red-700 border border-red-200' :
                    call.priority === 'high' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                    call.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                    'bg-green-100 text-green-700 border border-green-200'
                  ]"
                >
                  {{ call.priority || 'normal' }} priority
                </span>
              </div>
            </div>
            <p class="text-gray-600 text-sm line-clamp-2">{{ call.description || 'No description provided' }}</p>
          </div>

          <!-- Call Details -->
          <div class="p-6 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Date & Time -->
              <div class="flex items-center text-sm text-gray-600">
                <svg class="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <div>
                  <div class="font-medium">{{ formatDate(call.date) }}</div>
                  <div class="text-xs">{{ formatTime(call.start_time) }} - {{ formatTime(call.end_time) }}</div>
                </div>
              </div>

              <!-- Call Type -->
              <div class="flex items-center text-sm text-gray-600">
                <svg class="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
                <div>
                  <div class="font-medium capitalize">{{ (call.call_type || call.type)?.replace('-', ' ') || 'N/A' }}</div>
                  <div class="text-xs">Call Type</div>
                </div>
              </div>

              <!-- Duration -->
              <div class="flex items-center text-sm text-gray-600">
                <svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div>
                  <div class="font-medium">{{ calculateDuration(call.start_time, call.end_time) }}</div>
                  <div class="text-xs">Duration</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
            <div class="flex space-x-3">
              <button
                @click="viewRecording(call)"
                class="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                :disabled="!call.record_call || call.record_call !== '1'"
                :class="{ 'opacity-50 cursor-not-allowed': !call.record_call || call.record_call !== '1' }"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
                {{ call.record_call === '1' ? 'View Recording' : 'No Recording' }}
              </button>
              <button
                @click="toggleDetails(call.id)"
                class="px-4 py-2 border border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-700 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center"
              >
                <span>{{ expandedCall === call.id ? 'Hide Details' : 'View Details' }}</span>
                <svg 
                  class="w-4 h-4 ml-1 transition-transform duration-300" 
                  :class="{ 'rotate-180': expandedCall === call.id }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Expanded Details Section -->
          <div 
            v-if="expandedCall === call.id"
            class="border-t border-gray-200 bg-gray-50 p-6 animate-fade-in"
          >
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Left Column -->
              <div class="space-y-6">
                <!-- Call Information -->
                <div>
                  <h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <svg class="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Call Information
                  </h4>
                  <div class="space-y-3">
                    <div class="flex justify-between items-center p-3 bg-white rounded-lg border">
                      <span class="text-sm text-gray-600">Call ID</span>
                      <span class="font-medium">#{{ call.id }}</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-white rounded-lg border">
                      <span class="text-sm text-gray-600">Type</span>
                      <span class="font-medium capitalize">{{ (call.call_type || call.type)?.replace('-', ' ') || 'N/A' }}</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-white rounded-lg border">
                      <span class="text-sm text-gray-600">Recorded</span>
                      <span class="font-medium" :class="call.record_call === '1' ? 'text-green-600' : 'text-red-600'">
                        {{ call.record_call === '1' ? 'Yes' : 'No' }}
                      </span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-white rounded-lg border">
                      <span class="text-sm text-gray-600">Duration</span>
                      <span class="font-medium">{{ calculateDuration(call.start_time, call.end_time) }}</span>
                    </div>
                  </div>
                </div>

                <!-- Customer Information -->
                <div v-if="call.customer">
                  <h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                    Customer Organization
                  </h4>
                  <div class="bg-white rounded-lg p-4 border border-gray-200 space-y-2">
                    <p class="font-medium text-sm">{{ call.customer.user?.name || 'N/A' }}</p>
                    <p class="text-xs text-gray-500">{{ call.customer.user?.email || 'N/A' }}</p>
                    <p class="text-xs text-gray-500">{{ call.customer.address || 'No address provided' }}</p>
                    <p class="text-xs text-gray-500">{{ call.customer.phone || 'No phone provided' }}</p>
                  </div>
                </div>
              </div>

              <!-- Right Column -->
              <div class="space-y-6">
                <!-- End User Information -->
                <div v-if="call.end_user">
                  <h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <svg class="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    Call Participant
                  </h4>
                  <div class="bg-white rounded-lg p-4 border border-gray-200 space-y-2">
                    <p class="font-medium text-sm">{{ call.end_user.user?.name || 'N/A' }}</p>
                    <p class="text-xs text-gray-500">{{ call.end_user.user?.email || 'N/A' }}</p>
                    <p class="text-xs text-gray-500">Username: {{ call.end_user.username || 'N/A' }}</p>
                    <p class="text-xs text-gray-500">Status: 
                      <span :class="call.end_user.status === '1' ? 'text-green-600' : 'text-red-600'">
                        {{ call.end_user.status === '1' ? 'Active' : 'Inactive' }}
                      </span>
                    </p>
                  </div>
                </div>

                <!-- Call Settings -->
                <div>
                  <h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <svg class="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    Call Settings
                  </h4>
                  <div class="grid grid-cols-2 gap-3">
                    <div class="bg-white rounded-lg p-3 border border-gray-200 text-center">
                      <div class="text-sm font-medium text-gray-600">Guests</div>
                      <div class="text-lg font-semibold" :class="call.allow_guests === '1' ? 'text-green-600' : 'text-red-600'">
                        {{ call.allow_guests === '1' ? 'Allowed' : 'Not Allowed' }}
                      </div>
                    </div>
                    <div class="bg-white rounded-lg p-3 border border-gray-200 text-center">
                      <div class="text-sm font-medium text-gray-600">Reminders</div>
                      <div class="text-lg font-semibold" :class="call.send_reminders === '1' ? 'text-green-600' : 'text-red-600'">
                        {{ call.send_reminders === '1' ? 'Sent' : 'Not Sent' }}
                      </div>
                    </div>
                    <div class="bg-white rounded-lg p-3 border border-gray-200 text-center">
                      <div class="text-sm font-medium text-gray-600">File Sharing</div>
                      <div class="text-lg font-semibold" :class="call.allow_file_sharing === '1' ? 'text-green-600' : 'text-red-600'">
                        {{ call.allow_file_sharing === '1' ? 'Allowed' : 'Not Allowed' }}
                      </div>
                    </div>
                    <div class="bg-white rounded-lg p-3 border border-gray-200 text-center">
                      <div class="text-sm font-medium text-gray-600">Anonymous</div>
                      <div class="text-lg font-semibold" :class="call.allow_anonymous === '1' ? 'text-green-600' : 'text-red-600'">
                        {{ call.allow_anonymous === '1' ? 'Allowed' : 'Not Allowed' }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Full Description -->
            <div class="mt-6 pt-6 border-t border-gray-200">
              <h4 class="text-sm font-semibold text-gray-700 mb-3">Call Description</h4>
              <p class="text-gray-600 text-sm leading-relaxed bg-white p-4 rounded-lg border border-gray-200">
                {{ call.description || 'No detailed description provided for this completed call.' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <div class="inline-flex flex-col items-center max-w-md">
          <div class="relative mb-6">
            <div class="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <svg class="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900">No completed calls</h3>
          <p class="mt-2 text-gray-600">There are no completed calls to display at the moment.</p>
          <button
            @click="$router.push('/schedule-call')"
            class="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Schedule New Call
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/config/api'
import Swal from 'sweetalert2'

const router = useRouter()
const isLoading = ref(true)
const searchQuery = ref('')
const calls = ref([])
const expandedCall = ref(null)
const error = ref('')

const filters = ref({
  priority: 'all',
  type: 'all',
  duration: 'all'
})

const stats = ref({
  totalCalls: 0,
  successfulCalls: 0,
  averageDuration: '0min',
  uniqueParticipants: 0
})

// Toggle details view
const toggleDetails = (callId) => {
  expandedCall.value = expandedCall.value === callId ? null : callId
}

// Computed: Filtered & Searched Calls
const filteredCalls = computed(() => {
  let filtered = calls.value

  // Search
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(call =>
      (call.title?.toLowerCase().includes(query) ?? false) ||
      (call.description?.toLowerCase().includes(query) ?? false) ||
      (call.id?.toString().includes(query) ?? false) ||
      (call.customer?.user?.name?.toLowerCase().includes(query) ?? false) ||
      (call.end_user?.user?.name?.toLowerCase().includes(query) ?? false)
    )
  }

  // Priority filter
  if (filters.value.priority !== 'all') {
    filtered = filtered.filter(call => call.priority === filters.value.priority)
  }

  // Type filter
  if (filters.value.type !== 'all') {
    filtered = filtered.filter(call => 
      (call.call_type === filters.value.type) || (call.type === filters.value.type)
    )
  }

  // Duration filter
  if (filters.value.duration !== 'all') {
    filtered = filtered.filter(call => {
      const duration = calculateDurationMinutes(call.start_time, call.end_time)
      switch (filters.value.duration) {
        case 'short': return duration < 30
        case 'medium': return duration >= 30 && duration <= 60
        case 'long': return duration > 60
        default: return true
      }
    })
  }

  return filtered
})

// Format date nicely
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const formatTime = (time24) => {
  if (!time24) return 'N/A'
  const [h, m] = time24.split(':')
  const hour = parseInt(h)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${m} ${ampm}`
}

// Calculate duration between start and end time
const calculateDuration = (startTime, endTime) => {
  if (!startTime || !endTime) return 'N/A'
  
  const start = new Date(`2000-01-01T${startTime}`)
  const end = new Date(`2000-01-01T${endTime}`)
  const diffMs = end - start
  const diffMins = Math.floor(diffMs / 60000)
  
  if (diffMins < 60) {
    return `${diffMins}min`
  } else {
    const hours = Math.floor(diffMins / 60)
    const mins = diffMins % 60
    return `${hours}h ${mins}m`
  }
}

const calculateDurationMinutes = (startTime, endTime) => {
  if (!startTime || !endTime) return 0
  const start = new Date(`2000-01-01T${startTime}`)
  const end = new Date(`2000-01-01T${endTime}`)
  return Math.floor((end - start) / 60000)
}

// View recording
const viewRecording = (call) => {
  if (!call.record_call || call.record_call !== '1') {
    Swal.fire('No Recording', 'This call was not recorded.', 'info')
    return
  }
  
  // Replace with your actual recording URL logic
  const recordingUrl = `https://yourdomain.com/recordings/${call.id}`
  window.open(recordingUrl, '_blank')
}

// Update stats based on current calls
const updateStats = () => {
  const completedCalls = calls.value
  
  stats.value.totalCalls = completedCalls.length
  stats.value.successfulCalls = completedCalls.filter(call => 
    call.record_call === '1' && call.allow_file_sharing === '1'
  ).length
  
  // Calculate average duration
  const totalDuration = completedCalls.reduce((total, call) => {
    return total + calculateDurationMinutes(call.start_time, call.end_time)
  }, 0)
  const avgDuration = completedCalls.length > 0 ? Math.round(totalDuration / completedCalls.length) : 0
  stats.value.averageDuration = `${avgDuration}min`
  
  // Count unique participants (simplified)
  stats.value.uniqueParticipants = new Set(
    completedCalls.map(call => call.end_user?.user?.id).filter(Boolean)
  ).size
}

// Fetch Completed Calls from API
const fetchCompletedCalls = async () => {
  isLoading.value = true
  error.value = ''

  try {
    const response = await api().get('/customer-support?type=liveCall&status=completed')

    // Use the actual API response structure
    const data = response.data?.data || []

    if (Array.isArray(data)) {
      calls.value = data.map(call => ({
        ...call,
        // Mark all as completed for this page
        status: 'completed',
        title: call.title || 'Untitled Call',
        description: call.description || 'No description provided'
      }))
    } else {
      console.warn('Unexpected API response format:', response.data)
      calls.value = []
    }

    updateStats()
  } catch (err) {
    console.error('Failed to fetch completed calls:', err)
    error.value = err.response?.data?.message || 'Failed to load completed calls. Please try again.'

    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.value
    })

    calls.value = []
    updateStats()
  } finally {
    isLoading.value = false
  }
}

// Load data on mount
onMounted(() => {
  fetchCompletedCalls()
})
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2563eb, #7c3aed);
}
</style>