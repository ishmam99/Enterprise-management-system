<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="py-8 bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 rounded-full filter blur-3xl"></div>
      </div>

      <div class="container pt-20 px-6 text-center relative z-10">
        <div class="inline-flex items-center gap-2 bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full px-6 py-3 mb-6">
          <svg class="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
          <span class="text-purple-200 font-semibold text-sm">FREE WITH EVERY LICENSE PURCHASE</span>
        </div>

        <h1 class="text-4xl md:text-5xl font-bold mb-4">MSC Software Training & Certification</h1>
        <p class="text-lg text-purple-200 max-w-3xl mx-auto mb-4">
          Expert-led training programs designed to maximize your team's productivity and software proficiency. Become certified and advance your engineering career.
        </p>

        <div class="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-4 mb-8 shadow-2xl border-2 border-yellow-400 inline-block">
          <p class="text-gray-900 font-bold">🎓 Expert Instructors | Hands-On Practice | Industry Recognized Certifications</p>
        </div>

        <div class="mt-8 flex justify-center gap-4 flex-wrap">
          <button @click="openEnrollModal" class="px-6 py-3 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-600 transition">Enroll Now</button>
          <RouterLink to="/contact_us" class="px-6 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition">Contact Training Team</RouterLink>
        </div>
      </div>
    </section>

    <!-- Loading State -->
    <div v-if="loading" class="py-20 text-center">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      <p class="mt-4 text-gray-600">Loading training programs...</p>
    </div>

    <!-- Training Types Section -->
    <section v-else ref="trainingTypesSection" class="py-20 bg-gradient-to-b from-white to-blue-50">
      <div class="container">
    
        <!-- Selection Area (shown after training type selection) -->
        <div class="mt-2">
          <!-- Back Button -->
          <router-link to="/msc_software_training" class="mb-2 flex items-center gap-2 text-purple-600 hover:text-purple-800 transition font-semibold">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Training Types
          </router-link>

          <div class="text-center mb-2">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Select {{ trainingTypeNames[selectedTrainingType] == 'Lunch & Learn' ? 'Webinar' : trainingTypeNames[selectedTrainingType] }} Content
            </h2>
            <p class="text-lg text-gray-600">Choose by Software</p>
          </div>

          <!-- Tab System -->
          <div class="mb-3 w-full">
         

            <!-- Tab Panels -->
            <div class="pt-2 p-3 bg-blue-200'">
            
              <!-- Software Tab Panel -->
              <div  class="transition-all duration-300">
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                   <template v-for="software in softwareList" :key="software.id" >
                       <div  v-if="software.internal_trainings.length > 0"  @click="selectSoftware(software)" class="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-200 hover:border-purple-400">
                 
                    <div :class="['h-48 bg-gradient-to-br flex items-center justify-center', getSoftwareGradient(software.name)]">
                      <div class="text-center text-white">
                        <div class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                          <span class="text-3xl font-bold">{{ getSoftwareIcon(software.name) }}</span>
                        </div>
                        <h3 class="text-2xl font-bold">{{ software.name }}</h3>
                      </div>
                    </div>
                    <div class="p-6">
                      <p class="text-gray-600 mb-4">{{ getSoftwareDescription(software.name) }}</p>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-500">Available Courses:</span>
                        <span class="font-bold text-purple-600">{{ getCourseCountForSoftware(software.id) }}</span>
                      </div>
                      <div class="mt-4 text-purple-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Courses
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </div>
                    </div> </div>
                </template>
                 
                </div>
              </div>

             
            </div>
          </div>
        </div>

        <!-- Course Listing Section -->
        <div v-if="selectedFilterItem" ref="courseListingSection" class="mt-6">
          <button @click="goBackToSelection" class="mb-4 flex items-center gap-2 text-purple-600 hover:text-purple-800 transition font-semibold">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to {{ activeTab == 'software' ? 'Software' : 'Solutions' }}
          </button>

          <div class="text-center mb-4">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{{ selectedFilterItem.name }} Training Courses</h2>
            <p class="text-lg text-gray-600">{{ selectedTrainingType == 'online' ? 'Free webinar sessions' : 'Available training courses for ' + selectedFilterItem.name }}</p>
          </div>
          
          <!-- <div class="grid md:grid-cols-3 gap-3">
        

              <div class=" bg-green-200 p-2 space-y-4 rounded">
                <h1 class="text-center text-2xl font-bold p-2 bg-green-500 text-white rounded-lg mb-2">Beginner</h1>
            <div v-for="course in filteredCoursesBySelection.filter(e=>e.level == 'Beginner' && e.type == 'onsite')" :key="course.id" class="bg-white   rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden flex flex-col">
              <div class="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
                <div class="flex justify-between items-center">
                  <h3 class="text-lg font-bold text-white">{{ course.name }}</h3>
                  <span class="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">{{ course.code }}</span>
                </div>
              </div>
              
              <div class="p-6 flex-1 flex flex-col">
                <p class="text-gray-700 mb-4">{{ course.short_description || course.shortDescription }}</p>
                
                <div class="grid grid-cols-2 gap-3 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="text-gray-600"><span class="font-semibold">Duration:</span> {{ course.duration }}</span>
                  </div>
                  
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    <span class="text-gray-600"><span class="font-semibold">Level: </span> 
                      <span :class="{'text-green-600': course.level == 'Beginner', 'text-orange-600': course.level == 'Intermediate', 'text-red-600': course.level == 'Advanced', 'text-purple-600': course.level == 'Expert' || course.level == 'All'}" class="font-medium">{{ course.level }}</span>
                    </span>
                  </div>
                  
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    <span class="text-gray-600"><span class="font-semibold">Software: </span> <span class="capitalize">{{ course.software_name || course.software }}</span></span>
                  </div>
                  
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    <span class="text-gray-600"><span class="font-semibold">Solution: </span> {{ course.solution_name || course.solution }}</span>
                  </div>
                  
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="text-gray-600"><span class="font-semibold">Price: </span> 
                      <span v-if="course.price == '0' || course.price == 0" class="text-green-600 font-semibold">Free</span>
                      <span v-else class="text-purple-600 font-semibold">${{ course.price }}</span>
                    </span>
                  </div>
                  
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                    <span class="text-gray-600"><span class="font-semibold">Format: </span> 
                      <span :class="{'text-green-600': course.type == 'webinar', 'text-blue-600': course.type == 'online', 'text-purple-600': course.type == 'onsite'}" class="font-medium capitalize">{{ course.type == 'webinar' ? 'Lunch & Learn' : course.type }}</span>
                    </span>
                  </div>

                  <div class="flex items-center gap-2 text-sm col-span-2">
                    <svg class="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    <span class="text-gray-600"><span class="font-semibold">Analysis: </span> {{ course.analysis || 'N/A' }}</span>
                  </div>
                </div>
                
                <div v-if="course.long_description || course.longDescription" class="mb-4 p-3 h-20 overflow-y-auto bg-purple-50 rounded-lg">
                  <div class="flex items-start gap-2">
                    <svg class="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p class="text-sm text-gray-700">{{ course.long_description || course.longDescription }}</p>
                  </div>
                </div>
                
                <div class="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    <span class="text-gray-700"><span class="font-semibold">Certificate: </span> 
                      <span v-if="course.type != 'online'" class="text-green-600">Included upon completion</span>
                      <span v-else class="text-orange-600">Available upon request</span>
                    </span>
                  </div>
                </div>
                
                <button @click="openCourseEnrollModal(course)" class="mt-auto w-full px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold flex items-center justify-center gap-2">
                  <svg v-if="course.type == 'online'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                  {{ course.type == 'online' ? 'Register for Webinar' : 'Enroll in Course' }}
                </button>
              </div>
            </div> 
            </div> 
             <div class=" bg-amber-200 p-2 space-y-4 rounded">
                <h1 class="text-center text-2xl font-bold p-2 bg-amber-500 text-white rounded-lg mb-2">Advanced</h1>
            <div v-for="course in filteredCoursesBySelection.filter(e=>e.level == 'Advanced' && e.type == 'onsite')" :key="course.id" class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden flex flex-col">
            <div class="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
                <div class="flex justify-between items-center">
                  <h3 class="text-lg font-bold text-white">{{ course.name }}</h3>
                  <span class="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">{{ course.code }}</span>
                </div>
              </div>
              
              <div class="p-6 flex-1 flex flex-col">
                <p class="text-gray-700 mb-4">{{ course.short_description || course.shortDescription }}</p>
                
                <div class="grid grid-cols-2 gap-3 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="text-gray-600"><span class="font-semibold">Duration:</span> {{ course.duration }}</span>
                  </div>
                  
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    <span class="text-gray-600"><span class="font-semibold">Level: </span> 
                      <span :class="{'text-green-600': course.level == 'Beginner', 'text-orange-600': course.level == 'Intermediate', 'text-red-600': course.level == 'Advanced', 'text-purple-600': course.level == 'Expert' || course.level == 'All'}" class="font-medium">{{ course.level }}</span>
                    </span>
                  </div>
                  
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    <span class="text-gray-600"><span class="font-semibold">Software: </span> <span class="capitalize">{{ course.software_name || course.software }}</span></span>
                  </div>
                  
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    <span class="text-gray-600"><span class="font-semibold">Solution: </span> {{ course.solution_name || course.solution }}</span>
                  </div>
                  
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="text-gray-600"><span class="font-semibold">Price: </span> 
                      <span v-if="course.price == '0' || course.price == 0" class="text-green-600 font-semibold">Free</span>
                      <span v-else class="text-purple-600 font-semibold">${{ course.price }}</span>
                    </span>
                  </div>
                  
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                    <span class="text-gray-600"><span class="font-semibold">Format: </span> 
                      <span :class="{'text-green-600': course.type == 'webinar', 'text-blue-600': course.type == 'online', 'text-purple-600': course.type == 'onsite'}" class="font-medium capitalize">{{ course.type == 'webinar' ? 'Lunch & Learn' : course.type }}</span>
                    </span>
                  </div>

                  <div class="flex items-center gap-2 text-sm col-span-2">
                    <svg class="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    <span class="text-gray-600"><span class="font-semibold">Analysis: </span> {{ course.analysis || 'N/A' }}</span>
                  </div>
                </div>
                
                <div v-if="course.long_description || course.longDescription" class="mb-4 h-20 overflow-y-auto p-3 bg-purple-50 rounded-lg">
                  <div class="flex items-start gap-2">
                    <svg class="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p class="text-sm text-gray-700">{{ course.long_description || course.longDescription }}</p>
                  </div>
                </div>
                
                <div class="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    <span class="text-gray-700"><span class="font-semibold">Certificate: </span> 
                      <span v-if="course.type != 'online'" class="text-green-600">Included upon completion</span>
                      <span v-else class="text-orange-600">Available upon request</span>
                    </span>
                  </div>
                </div>
                
                <button @click="openCourseEnrollModal(course)" class="mt-auto w-full px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold flex items-center justify-center gap-2">
                  <svg v-if="course.type == 'online'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                  {{ course.type == 'online' ? 'Register for Webinar' : 'Enroll in Course' }}
                </button>
              </div>
            </div> 
            </div> 
            <div class=" bg-red-200 p-2 space-y-4 rounded">
                <h1 class="text-center text-2xl font-bold p-2 bg-red-500 text-white rounded-lg mb-2">Lunch & Learn</h1>
            <div v-for="course in filteredCoursesBySelection.filter(e=>e.type == 'online')" :key="course.id" class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden flex flex-col">
              <div class="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
                <div class="flex justify-between items-center">
                  <h3 class="text-lg font-bold text-white">{{ course.name }}</h3>
                  <span class="bg-yellow-400 text-gray-900 px-3 py-1 text-nowrap rounded-full text-sm font-bold">{{ course.code }}</span>
                </div>
              </div>
              
              <div class="p-6 flex-1 flex flex-col">
                <p class="text-gray-700 mb-4">{{ course.short_description || course.shortDescription }}</p>
                
                <div class="grid grid-cols-2 gap-3 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="text-gray-600"><span class="font-semibold">Duration:</span> {{ course.duration }}</span>
                  </div>
                  
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    <span class="text-gray-600"><span class="font-semibold">Level: </span> 
                      <span :class="{'text-green-600': course.level == 'Beginner', 'text-orange-600': course.level == 'Intermediate', 'text-red-600': course.level == 'Advanced', 'text-purple-600': course.level == 'Expert' || course.level == 'All'}" class="font-medium">{{ course.level }}</span>
                    </span>
                  </div>
                  
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    <span class="text-gray-600"><span class="font-semibold">Software: </span> <span class="capitalize">{{ course.software_name || course.software }}</span></span>
                  </div>
                  
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    <span class="text-gray-600"><span class="font-semibold">Solution: </span> {{ course.solution_name || course.solution }}</span>
                  </div>
                  
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="text-gray-600"><span class="font-semibold">Price: </span> 
                      <span v-if="course.price == '0' || course.price == 0" class="text-green-600 font-semibold">Free</span>
                      <span v-else class="text-purple-600 font-semibold">${{ course.price }}</span>
                    </span>
                  </div>
                  
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                    <span class="text-gray-600"><span class="font-semibold">Format: </span> 
                      <span :class="{'text-green-600': course.type == 'webinar', 'text-blue-600': course.type == 'online', 'text-purple-600': course.type == 'onsite'}" class="font-medium capitalize">{{ course.type == 'webinar' ? 'Lunch & Learn' : course.type }}</span>
                    </span>
                  </div>

                  <div class="flex items-center gap-2 text-sm col-span-2">
                    <svg class="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    <span class="text-gray-600"><span class="font-semibold">Analysis: </span> {{ course.analysis || 'N/A' }}</span>
                  </div>
                </div>
                
                <div v-if="course.long_description || course.longDescription" class="mb-4 p-3 h-20 overflow-y-auto bg-purple-50 rounded-lg">
                  <div class="flex items-start gap-2">
                    <svg class="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p class="text-sm text-gray-700">{{ course.long_description || course.longDescription }}</p>
                  </div>
                </div>
                
                <div class="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div class="flex items-center gap-2 text-sm">
                    <svg class="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    <span class="text-gray-700"><span class="font-semibold">Certificate: </span> 
                      <span v-if="course.type != 'online'" class="text-green-600">Included upon completion</span>
                      <span v-else class="text-orange-600">Available upon request</span>
                    </span>
                  </div>
                </div>
                
                <button @click="openCourseEnrollModal(course)" class="mt-auto w-full px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold flex items-center justify-center gap-2">
                  <svg v-if="course.type == 'online'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                  {{ course.type == 'online' ? 'Register for Webinar' : 'Enroll in Course' }}
                </button>
              </div>
            </div> 
            </div> 
        
          </div> -->

  <div class="grid md:grid-cols-3 gap-6">
    <!-- Beginner Column -->
    <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-2xl shadow-lg border border-green-200">
      <div class="sticky top-0 z-10 mb-4">
        <h1 class="text-center text-2xl font-bold p-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl shadow-md">
          🎯 Basic
        </h1>
        <p class="text-center text-sm text-green-700 mt-2 font-medium">Perfect for those new to the software</p>
      </div>
      
      <div class="space-y-4  pr-1 ">
        <div v-for="course in filteredCoursesBySelection.filter(e => (e.level == 'Beginner' || e.level === 'Basic') && e.type === 'onsite')" 
             :key="course.id" 
             class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-green-500 overflow-hidden flex flex-col h-[450px]">
          
          <!-- Card Header -->
          <div class="bg-gradient-to-r from-green-600 to-emerald-600 px-5 min-h-[4rem] py-3">
            <div class="flex justify-between items-start gap-2">
              <h3 class="text-base font-bold text-white line-clamp-2 flex-1">{{ course.name }}</h3>
              <span class="bg-yellow-400 text-gray-900 px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap">{{ course.code }}</span>
            </div>
          </div>
          
          <!-- Card Body - Scrollable -->
          <div class="flex-1 flex flex-col overflow-hidden p-5">
            <!-- Short Description -->
            <div class="mb-3">
              <p class="text-gray-700 text-sm line-clamp-3">{{ course.short_description || course.shortDescription }}</p>
            </div>
            
            <!-- Course Details Grid -->
            <div class="grid grid-cols-2 gap-2 mb-3 text-xs">
              <div class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span class="text-gray-600 truncate"><span class="font-semibold">Duration:</span> {{ course.duration }}</span>
              </div>
              
              <div class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <span class="text-gray-600 truncate"><span class="font-semibold">Level:</span> 
                  <span class="text-green-600 font-medium">{{ course.level }}</span>
                </span>
              </div>
              
              <div class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                <span class="text-gray-600 truncate"><span class="font-semibold">Software:</span> {{ course.software_name || course.software }}</span>
              </div>
              
              <div class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                <span class="text-gray-600 truncate"><span class="font-semibold">Solution:</span> {{ course.solution_name || course.solution }}</span>
              </div>
              
              <div class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span class="text-gray-600 truncate"><span class="font-semibold">Price:</span> 
                  <span v-if="course.price == '0' || course.price == 0" class="text-green-600 font-semibold">Free</span>
                  <span v-else class="text-green-700 font-semibold">${{ course.price }}</span>
                </span>
              </div>
              
              <div class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
                <span class="text-gray-600 truncate"><span class="font-semibold">Format:</span> 
                  <span class="capitalize">{{ course.type }}</span>
                </span>
              </div>

              <div class="col-span-2 flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <span class="text-gray-600 text-xs truncate"><span class="font-semibold">Analysis:</span> {{ course.analysis || 'N/A' }}</span>
              </div>
            </div>
            
            <!-- Long Description - Scrollable -->
            <div v-if="course.long_description || course.longDescription" class="mb-3">
              <div class="bg-green-50 rounded-lg p-3 h-24 overflow-y-auto custom-scrollbar">
                <div class="flex items-start gap-2">
                  <svg class="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p class="text-xs text-gray-700">{{ course.long_description || course.longDescription }}</p>
                </div>
              </div>
            </div>
            
            <!-- Certificate Info -->
            <div class="mb-3 p-2 bg-gray-50 rounded-lg">
              <div class="flex items-center gap-1.5 text-xs">
                <svg class="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                <span class="text-gray-700"><span class="font-semibold">Certificate:</span> 
                  <span class="text-green-600">Included upon completion</span>
                </span>
              </div>
            </div>
            
            <!-- Enroll Button -->
            <button @click="openCourseEnrollModal(course)" class="w-full px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition font-semibold flex items-center justify-center gap-2 text-sm">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
              Enroll in Course
            </button>
          </div>
        </div>
        
        <!-- Empty State -->
        <div v-if="filteredCoursesBySelection.filter(e => (e.level == 'Beginner' || e.level === 'Basic') && e.type === 'onsite').length === 0" 
             class="bg-white rounded-xl p-8 text-center border-2 border-dashed border-green-300">
          <svg class="w-12 h-12 text-green-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-gray-500">No beginner courses available</p>
        </div>
      </div>
    </div>

    <!-- Advanced Column -->
    <div class="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-2xl shadow-lg border border-amber-200">
      <div class="sticky top-0 z-10 mb-4">
        <h1 class="text-center text-2xl font-bold p-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl shadow-md">
          🚀 Advanced
        </h1>
        <p class="text-center text-sm text-amber-700 mt-2 font-medium">For experienced users seeking mastery</p>
      </div>
      
      <div class="space-y-4  pr-1">
        <div v-for="course in filteredCoursesBySelection.filter(e => e.level === 'Advanced' && e.type === 'onsite')" 
             :key="course.id" 
             class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-amber-500 overflow-hidden flex flex-col h-[450px]">
          
          <!-- Card Header -->
          <div class="bg-gradient-to-r from-amber-600 to-orange-600 px-5 py-3 min-h-[4rem]">
            <div class="flex justify-between items-start gap-2">
              <h3 class="text-base font-bold text-white line-clamp-2 flex-1">{{ course.name }}</h3>
              <span class="bg-yellow-400 text-gray-900 px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap">{{ course.code }}</span>
            </div>
          </div>
          
          <!-- Card Body - Scrollable -->
          <div class="flex-1 flex flex-col overflow-hidden p-5">
            <!-- Short Description -->
            <div class="mb-3">
              <p class="text-gray-700 text-sm line-clamp-3">{{ course.short_description || course.shortDescription }}</p>
            </div>
            
            <!-- Course Details Grid -->
            <div class="grid grid-cols-2 gap-2 mb-3 text-xs">
              <div class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span class="text-gray-600 truncate"><span class="font-semibold">Duration:</span> {{ course.duration }}</span>
              </div>
              
              <div class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <span class="text-gray-600 truncate"><span class="font-semibold">Level:</span> 
                  <span class="text-amber-600 font-medium">{{ course.level }}</span>
                </span>
              </div>
              
              <div class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                <span class="text-gray-600 truncate"><span class="font-semibold">Software:</span> {{ course.software_name || course.software }}</span>
              </div>
              
              <div class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                <span class="text-gray-600 truncate"><span class="font-semibold">Solution:</span> {{ course.solution_name || course.solution }}</span>
              </div>
              
              <div class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span class="text-gray-600 truncate"><span class="font-semibold">Price:</span> 
                  <span v-if="course.price == '0' || course.price == 0" class="text-green-600 font-semibold">Free</span>
                  <span v-else class="text-amber-700 font-semibold">${{ course.price }}</span>
                </span>
              </div>
              
              <div class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
                <span class="text-gray-600 truncate"><span class="font-semibold">Format:</span> 
                  <span class="capitalize">{{ course.type }}</span>
                </span>
              </div>

              <div class="col-span-2 flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <span class="text-gray-600 text-xs truncate"><span class="font-semibold">Analysis:</span> {{ course.analysis || 'N/A' }}</span>
              </div>
            </div>
            
            <!-- Long Description - Scrollable -->
            <div v-if="course.long_description || course.longDescription" class="mb-3 ">
              <div class="bg-amber-50 rounded-lg p-3 h-24 overflow-y-auto custom-scrollbar">
                <div class="flex items-start gap-2">
                  <svg class="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p class="text-xs text-gray-700">{{ course.long_description || course.longDescription }}</p>
                </div>
              </div>
            </div>
            
            <!-- Certificate Info -->
            <div class="mb-3 p-2 bg-gray-50 rounded-lg">
              <div class="flex items-center gap-1.5 text-xs">
                <svg class="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                <span class="text-gray-700"><span class="font-semibold">Certificate:</span> 
                  <span class="text-green-600">Included upon completion</span>
                </span>
              </div>
            </div>
            
            <!-- Enroll Button -->
            <button @click="openCourseEnrollModal(course)" class=" w-full px-4 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition font-semibold flex items-center justify-center gap-2 text-sm">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
              Enroll in Course
            </button>
          </div>
        </div>
        
        <!-- Empty State -->
        <div v-if="filteredCoursesBySelection.filter(e => e.level === 'Advanced' && e.type === 'onsite').length === 0" 
             class="bg-white rounded-xl p-8 text-center border-2 border-dashed border-amber-300">
          <svg class="w-12 h-12 text-amber-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-gray-500">No advanced courses available</p>
        </div>
      </div>
    </div>

    <!-- Lunch & Learn Column -->
    <div class="bg-gradient-to-br from-red-50 to-rose-50 p-4 rounded-2xl shadow-lg border border-red-200">
      <div class="sticky top-0 z-10 mb-4">
        <h1 class="text-center text-2xl font-bold p-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl shadow-md">
          🎓 Lunch & Learn
        </h1>
        <p class="text-center text-sm text-red-700 mt-2 font-medium">Free weekly webinars on latest features</p>
      </div>
      
      <div class="space-y-4 pr-1 ">
        <div v-for="course in filteredCoursesBySelection.filter(e => e.type === 'online')" 
             :key="course.id" 
             class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-red-500 overflow-hidden flex flex-col h-[450px]">
          
          <!-- Card Header -->
          <div class="bg-gradient-to-r from-red-600 to-rose-600 px-5 min-h-[4rem] py-3">
            <div class="flex justify-between items-start gap-2">
              <h3 class="text-base font-bold text-white line-clamp-2 flex-1">{{ course.name }}</h3>
              <span class="bg-yellow-400 text-gray-900 px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap">{{ course.code }}</span>
            </div>
          </div>
          
          <!-- Card Body - Scrollable -->
          <div class="flex-1 flex flex-col overflow-hidden p-5">
            <!-- Short Description -->
            <div class="mb-3">
              <p class="text-gray-700 text-sm line-clamp-3">{{ course.short_description || course.shortDescription }}</p>
            </div>
            
            <!-- Course Details Grid -->
            <div class="grid grid-cols-2 gap-2 mb-3 text-xs">
              <div class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span class="text-gray-600 truncate"><span class="font-semibold">Duration:</span> {{ course.duration }}</span>
              </div>
              
              <div class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <span class="text-gray-600 truncate"><span class="font-semibold">Level:</span> 
                  <span :class="{'text-green-600': (course.level == 'Beginner' || course.level === 'Basic'), 'text-amber-600': course.level === 'Intermediate', 'text-red-600': course.level === 'Advanced', 'text-purple-600': course.level === 'Expert' || course.level === 'All'}" class="font-medium">{{ course.level }}</span>
                </span>
              </div>
              
              <div class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                <span class="text-gray-600 truncate"><span class="font-semibold">Software:</span> {{ course.software_name || course.software }}</span>
              </div>
              
              <div class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                <span class="text-gray-600 truncate"><span class="font-semibold">Solution:</span> {{ course.solution_name || course.solution }}</span>
              </div>
              
              <div class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span class="text-gray-600 truncate"><span class="font-semibold">Price:</span> 
                  <span v-if="course.price == '0' || course.price == 0" class="text-green-600 font-semibold">Free</span>
                  <span v-else class="text-red-700 font-semibold">${{ course.price }}</span>
                </span>
              </div>
              
              <div class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
                <span class="text-gray-600 truncate"><span class="font-semibold">Format:</span> 
                  <span class="capitalize">{{ course.type === 'online' ? 'Webinar' : course.type }}</span>
                </span>
              </div>

              <div class="col-span-2 flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <span class="text-gray-600 text-xs truncate"><span class="font-semibold">Analysis:</span> {{ course.analysis || 'N/A' }}</span>
              </div>
            </div>
            
            <!-- Long Description - Scrollable -->
            <div v-if="course.long_description || course.longDescription" class="mb-3 ">
              <div class="bg-red-50 rounded-lg p-3 h-24 overflow-y-auto custom-scrollbar">
                <div class="flex items-start gap-2">
                  <svg class="w-3.5 h-3.5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p class="text-xs text-gray-700">{{ course.long_description || course.longDescription }}</p>
                </div>
              </div>
            </div>
            
            <!-- Certificate Info -->
            <div class="mb-3 p-2 bg-gray-50 rounded-lg">
              <div class="flex items-center gap-1.5 text-xs">
                <svg class="w-4 h-4 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                <span class="text-gray-700"><span class="font-semibold">Certificate:</span> 
                  <span class="text-orange-600">Available upon request</span>
                </span>
              </div>
            </div>
            
            <!-- Register Button -->
            <button @click="openCourseEnrollModal(course)" class=" w-full px-4 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:from-red-700 hover:to-rose-700 transition font-semibold flex items-center justify-center gap-2 text-sm">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              Register for Webinar
            </button>
          </div>
        </div>
        
        <!-- Empty State -->
        <div v-if="filteredCoursesBySelection.filter(e => e.type === 'online').length === 0" 
             class="bg-white rounded-xl p-8 text-center border-2 border-dashed border-red-300">
          <svg class="w-12 h-12 text-red-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-gray-500">No webinars scheduled at this time</p>
        </div>
      </div>
    </div>
  </div>
          <div v-if="filteredCoursesBySelection.length == 0" class="text-center py-12">
            <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">No Courses Found</h3>
            <p class="text-gray-600">No {{ selectedTrainingType == 'webinar' ? 'webinars' : 'courses' }} available for this selection yet.</p>
            <button @click="goBackToSelection" class="mt-4 text-purple-600 font-semibold hover:text-purple-800">← Go back and try another selection</button>
          </div>
        </div>

        <!-- Training Features -->
        <div class="grid md:grid-cols-4 gap-6 mb-12" v-if="!selectedTrainingType">
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
              <h3 class="text-3xl md:text-4xl font-bold mb-2">100% FREE Training with Every License</h3>
              <p class="text-xl text-yellow-100">No additional charges. No hidden fees. Complete training included with your software purchase!</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Enrollment Modal -->
    <div v-if="showEnrollModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeModal"></div>
        <div class="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div v-if="successMessage" class="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">{{ successMessage }}</div>
          <div v-if="errorMessage" class="fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">{{ errorMessage }}</div>
          
          <div class="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-bold text-white">Enroll in {{ selectedCourse?.name || 'Training Program' }}</h3>
              <button @click="closeModal" class="text-white hover:text-gray-200 transition">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <div class="px-6 py-4">
            <div v-if="selectedCourse" class="mb-4 p-3 bg-purple-50 rounded-lg">
              <p class="text-sm text-gray-700"><span class="font-semibold">Course:</span> {{ selectedCourse.name }}</p>
              <p class="text-sm text-gray-700 mt-1"><span class="font-semibold">Code:</span> {{ selectedCourse.code }}</p>
              <p class="text-sm text-gray-700 mt-1"><span class="font-semibold">Duration:</span> {{ selectedCourse.duration }}</p>
            </div>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input v-model="enrollForm.name" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" placeholder="John Doe">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input v-model="enrollForm.email" type="email" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" placeholder="john@example.com">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input v-model="enrollForm.phone" type="tel" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" placeholder="+1 (555) 000-0000">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Organization *</label>
                <input v-model="enrollForm.organization" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" placeholder="Acme Corporation">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input v-model="enrollForm.jobTitle" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" placeholder="Senior Engineer">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                <select v-model="enrollForm.experienceLevel" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500">
                  <option value="beginner">Beginner - New to MSC Software</option>
                  <option value="intermediate">Intermediate - Some experience</option>
                  <option value="advanced">Advanced - Extensive experience</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Training Format</label>
                <div class="space-y-2">
                  <label class="flex items-center"><input v-model="enrollForm.format" type="radio" value="online" class="mr-2"><span>Online</span></label>
                  <label class="flex items-center"><input v-model="enrollForm.format" type="radio" value="onsite" class="mr-2"><span>On-Site</span></label>
                  <label class="flex items-center"><input v-model="enrollForm.format" type="radio" value="hybrid" class="mr-2"><span>Hybrid</span></label>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Additional Comments</label>
                <textarea v-model="enrollForm.comments" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" placeholder="Any specific training goals or questions?"></textarea>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 px-6 py-4 flex justify-end gap-3">
            <button @click="closeModal" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition">Cancel</button>
            <button @click="submitEnrollment" :disabled="!isEnrollFormValid" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed">Submit Enrollment</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
// == STATE ==
const loading = ref(true);
const showEnrollModal = ref(false);
const selectedTrainingType = ref('online');
const selectedFilterItem = ref(null);
const activeTab = ref("software");
const selectedCourse = ref(null);
const successMessage = ref('');
const errorMessage = ref('');

// Data from API
const softwareList = ref([]);
const solutionList = ref([]);
const allCourses = ref([]);

// Refs for sections
const trainingTypesSection = ref(null);
const softwareSelectionSection = ref(null);
const courseListingSection = ref(null);
const analysisTypeList = ref([
  { id: "dynamic", name: "Dynamic Analysis", icon: "📊", gradient: "bg-gradient-to-br from-purple-600 to-indigo-700", shortDescription: "Vibration, shock, and transient response" },
  { id: "static", name: "Static Analysis", icon: "⚖️", gradient: "bg-gradient-to-br from-blue-600 to-cyan-700", shortDescription: "Linear and nonlinear static analysis" },
  { id: "thermal", name: "Thermal Analysis", icon: "🔥", gradient: "bg-gradient-to-br from-orange-600 to-red-700", shortDescription: "Heat transfer and thermal simulation" },
  { id: "cfd", name: "CFD Analysis", icon: "🌊", gradient: "bg-gradient-to-br from-green-600 to-emerald-700", shortDescription: "Computational fluid dynamics" },
  { id: "multibody", name: "Multibody Analysis", icon: "⚙️", gradient: "bg-gradient-to-br from-pink-600 to-rose-700", shortDescription: "Mechanical system simulation" },
  { id: "fatigue", name: "Fatigue Analysis", icon: "🔄", gradient: "bg-gradient-to-br from-amber-600 to-orange-700", shortDescription: "Durability and fatigue life prediction" },
  { id: "composite", name: "Composite Analysis", icon: "📐", gradient: "bg-gradient-to-br from-teal-600 to-cyan-700", shortDescription: "Composite material modeling" },
  { id: "acoustics_analysis", name: "Acoustics Analysis", icon: "🎵", gradient: "bg-gradient-to-br from-purple-600 to-pink-700", shortDescription: "Sound and vibration simulation" },
]);
// Enrollment form data
const enrollForm = ref({
  name: "",
  email: "",
  phone: "",
  organization: "",
  jobTitle: "",
  experienceLevel: "beginner",
  format: "online",
  comments: "",
});

// == HELPER FUNCTIONS ==
const trainingTypeNames = {
  onsite: "On-Site",
  online: "Online",
  webinar: "Lunch & Learn",
};

const scrollToElement = async (elementRef, offset = 80) => {
  await nextTick();
  if (elementRef.value) {
    const elementPosition = elementRef.value.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }
};

// == API CALLS ==
const sortSoftwareByTrainingCount = (list) => {
  return list
    .slice()
    .sort((a, b) => {
      const aCount = (a.internal_trainings?.length || a.InternalTrainings?.length || 0);
      const bCount = (b.internal_trainings?.length || b.InternalTrainings?.length || 0);
      return bCount - aCount;
    });
};
const sortSolutionByTrainingCount = (list) => {
  return list
    .slice()
    .sort((a, b) => {
      const aCount = (a.internal_trainings?.length || a.InternalTrainings?.length || 0);
      const bCount = (b.internal_trainings?.length || b.InternalTrainings?.length || 0);
      return bCount - aCount;
    });
};

const fetchSoftwares = async () => {
  try {
    const response = await api().get(`/softwares?with=InternalTrainings`);
    if (response.data && response.data.data) {
      softwareList.value = sortSoftwareByTrainingCount(response.data.data);
    } else if (Array.isArray(response.data)) {
      softwareList.value = sortSoftwareByTrainingCount(response.data);
    } else {
      softwareList.value = [];
    }
  } catch (error) {
    console.error("Error fetching softwares:", error);
    softwareList.value = [];
  }
};

const fetchSolutions = async () => {
  try {
    const response = await api().get(`/solutions?with=InternalTrainings`);
    if (response.data && response.data.data) {
      solutionList.value = sortSolutionByTrainingCount(response.data.data);
    } else if (Array.isArray(response.data)) {
      solutionList.value = sortSolutionByTrainingCount(response.data);
    } else {
      solutionList.value = [];
    }
  } catch (error) {
    console.error("Error fetching solutions:", error);
    solutionList.value = [];
  }
};

const fetchTrainings = async () => {
  try {
    const response = await api().get(`/internal-trainings`);
    let trainings = [];
    
    if (response.data && response.data.data) {
      trainings = response.data.data;
    } else if (Array.isArray(response.data)) {
      trainings = response.data;
    }
    
    // Enhance training data with related names
    allCourses.value = trainings.map(training => ({
      ...training,
      software_name: getSoftwareNameById(training.software_id),
      solution_name: getSolutionNameById(training.solution_id),
      // Map fields to match expected format
      shortDescription: training.short_description,
      longDescription: training.long_description,
    }));
  } catch (error) {
    console.error("Error fetching trainings:", error);
    allCourses.value = [];
  }
};

const getSoftwareNameById = (softwareId) => {
  const software = softwareList.value.find(s => s.id == softwareId);
  return software ? software.name : null;
};

const getSolutionNameById = (solutionId) => {
  const solution = solutionList.value.find(s => s.id == solutionId);
  return solution ? solution.name : null;
};

const loadAllData = async () => {
  loading.value = true;
  await Promise.all([fetchSoftwares(), fetchSolutions()]);
  await fetchTrainings();
  loading.value = false;
};

// == UI HELPER FUNCTIONS ==
const getSoftwareGradient = (softwareName) => {
  const gradients = {
    'Nastran': 'bg-gradient-to-br from-purple-600 to-indigo-700',
    'Patran': 'bg-gradient-to-br from-blue-600 to-cyan-700',
    'Actran': 'bg-gradient-to-br from-green-600 to-emerald-700',
    'Adams': 'bg-gradient-to-br from-orange-600 to-red-700',
    'Cradle': 'bg-gradient-to-br from-pink-600 to-rose-700',
    'Sinda': 'bg-gradient-to-br from-teal-600 to-cyan-700',
    'Marc': 'bg-gradient-to-br from-amber-600 to-orange-700',
  };
  return gradients[softwareName] || 'bg-gradient-to-br from-gray-600 to-gray-700';
};

const getSoftwareIcon = (softwareName) => {
  const icons = {
    'Nastran': 'N',
    'Patran': 'P',
    'Actran': 'A',
    'Adams': 'M',
    'Cradle': 'C',
    'Sinda': 'S',
    'Marc': 'M',
  };
  return icons[softwareName] || 'S';
};

const getSoftwareDescription = (softwareName) => {
  const descriptions = {
    'Nastran': 'Finite element analysis for structural simulation',
    'Patran': 'Pre- and post-processing for FEA models',
    'Actran': 'Acoustic and vibro-acoustic simulation',
    'Adams': 'Multibody dynamics simulation',
    'Cradle': 'CFD and thermal simulation',
    'Sinda': 'Thermal analysis and simulation',
    'Marc': 'Nonlinear finite element analysis',
  };
  return descriptions[softwareName] || 'Engineering simulation software';
};

const getSolutionGradient = (solutionName) => {
  const gradients = {
    'Structural Analysis': 'bg-gradient-to-br from-purple-600 to-indigo-700',
    'Fluids': 'bg-gradient-to-br from-blue-600 to-cyan-700',
    'Acoustics': 'bg-gradient-to-br from-green-600 to-emerald-700',
  };
  return gradients[solutionName] || 'bg-gradient-to-br from-gray-600 to-gray-700';
};

const getSolutionIcon = (solutionName) => {
  const icons = {
    'Structural Analysis': '🏗️',
    'Fluids': '💧',
    'Acoustics': '🔊',
  };
  return icons[solutionName] || '📊';
};

const getSolutionDescription = (solutionName) => {
  const descriptions = {
    'Structural Analysis': 'Structural analysis and simulation',
    'Fluids': 'CFD and thermal-fluid simulation',
    'Acoustics': 'Acoustic and vibro-acoustic analysis',
  };
  return descriptions[solutionName] || 'Engineering simulation solution';
};

// == COMPUTED PROPERTIES ==
const getCourseCountForSoftware = (softwareId) => {
  return allCourses.value.filter(c => c.software_id == softwareId && c.type == selectedTrainingType.value).length;
};

const getCourseCountForSolution = (solutionId) => {
  return allCourses.value.filter(c => c.analysis == solutionId && c.type == selectedTrainingType.value).length;
};

const filteredCoursesBySelection = computed(() => {
  if (!selectedFilterItem.value || !selectedTrainingType.value) return [];
  console.log(selectedFilterItem.value)
  if (activeTab.value == 'software') {
    return allCourses.value.filter(course => course.software_id == selectedFilterItem.value.id );
  } else if (activeTab.value == 'solution') {
    return allCourses.value.filter(course => course.analysis == selectedFilterItem.value );
  }
  return [];
});

const isEnrollFormValid = computed(() => {
  return enrollForm.value.name && enrollForm.value.email && enrollForm.value.organization;
});

// == METHODS ==
const selectTrainingType = async (type) => {
  selectedTrainingType.value = type;
  selectedFilterItem.value = null;
  activeTab.value = "solution";
  await scrollToElement(softwareSelectionSection);
};

const selectSoftware = async (software) => {
  selectedFilterItem.value = software;
  await scrollToElement(courseListingSection);
};

const selectSolution = async (solution) => {
  selectedFilterItem.value = solution;
  await scrollToElement(courseListingSection);
};

const goBackToTrainingTypes = async () => {
  selectedTrainingType.value = null;
  selectedFilterItem.value = null;
  await scrollToElement(trainingTypesSection);
};

const goBackToSelection = async () => {
  selectedFilterItem.value = null;
  await scrollToElement(softwareSelectionSection);
};

const openEnrollModal = () => {
  selectedCourse.value = null;
  resetForm();
  showEnrollModal.value = true;
};

const openCourseEnrollModal = (course) => {
  selectedCourse.value = course;
  resetForm();
  showEnrollModal.value = true;
};

const resetForm = () => {
  enrollForm.value = {
    name: "",
    email: "",
    phone: "",
    organization: "",
    jobTitle: "",
    experienceLevel: "beginner",
    format: "online",
    comments: "",
  };
};

const closeModal = () => {
  showEnrollModal.value = false;
  selectedCourse.value = null;
};

const submitEnrollment = async () => {
  if (!isEnrollFormValid.value) {
    errorMessage.value = '⚠️ Please fill all required fields.';
    setTimeout(() => { errorMessage.value = ''; }, 3000);
    return;
  }

  console.log("Enrollment submitted:", {
    ...enrollForm.value,
    course: selectedCourse.value,
    trainingType: selectedTrainingType.value,
  });
  
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
  
  successMessage.value = `✅ Enrollment submitted successfully for "${selectedCourse.value?.name || 'Training Program'}"! We will contact you at ${enrollForm.value.email}`;
  setTimeout(() => { successMessage.value = ''; }, 5000);
  closeModal();
};
const route = useRoute()
watch(() => route.query, () => {
  if(route.query.type && route.query.type =='solution')
{
   selectTrainingType('onsite');
  if(route.query.subtype != 'general')
  selectSolution(route.query.subtype);
}
});
// == LIFECYCLE ==
onMounted(() => {
  loadAllData();
});
</script>


<style >
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
</style>