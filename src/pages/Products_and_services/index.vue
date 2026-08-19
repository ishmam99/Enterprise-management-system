<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="relative h-[500px] md:h-[600px] bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-96 h-96 bg-cyan-400 rounded-full filter blur-3xl animate-pulse"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
      </div>
      
      <div class="relative container mx-auto px-6 h-full flex flex-col justify-center items-center text-center text-white">
        <div class="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-6 py-3 mb-6">
          <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
          </svg>
          <span class="text-blue-200 font-semibold">Complete Engineering Solutions</span>
        </div>
        
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Products & Services
          <span class="block mt-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Engineered for Excellence
          </span>
        </h1>
        
        <p class="text-xl md:text-2xl text-blue-100 max-w-4xl mb-8">
          From world-class MSC Software solutions to expert engineering services, training, and 24/7 support - everything you need for engineering success
        </p>

        <!-- Quick Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div class="text-3xl font-bold mb-1">8+</div>
            <div class="text-blue-200 text-sm">MSC Products</div>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div class="text-3xl font-bold mb-1">FREE</div>
            <div class="text-blue-200 text-sm">Support & Training</div>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div class="text-3xl font-bold mb-1">24/7</div>
            <div class="text-blue-200 text-sm">Technical Support</div>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div class="text-3xl font-bold mb-1">10+</div>
            <div class="text-blue-200 text-sm">Industries</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Categories -->
    <section class="py-20 bg-gradient-to-b from-white to-gray-50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <span class="text-blue-600 font-semibold text-sm uppercase tracking-wider">What We Offer</span>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Comprehensive Engineering Ecosystem
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need under one roof - software, support, training, and engineering expertise
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <!-- Software Sales -->
          <div class="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-blue-200 hover:border-blue-400">
            <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-cyan-600"></div>
            
            <div class="p-8 md:p-10">
              <div class="flex items-start gap-6 mb-6">
                <div class="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 transition-transform">
                  <svg class="w-11 h-11 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    Software Sales
                  </h3>
                  <p class="text-blue-600 font-semibold text-lg">Certified MSC Software Reseller</p>
                </div>
              </div>

              <p class="text-gray-700 mb-6 leading-relaxed">
                Complete range of MSC Software solutions including Nastran, Patran, Marc, Dytran, MSC Apex, Actran, and more. Get authentic licenses with competitive pricing and full support.
              </p>

              <div class="mb-6">
                <h4 class="font-bold text-gray-900 mb-3">Featured Products:</h4>
                <div class="grid grid-cols-2 gap-3">
                  <div class="flex items-center gap-2 text-sm text-gray-700">
                    <svg class="w-5 h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>MSC Nastran</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm text-gray-700">
                    <svg class="w-5 h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Patran</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm text-gray-700">
                    <svg class="w-5 h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Marc</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm text-gray-700">
                    <svg class="w-5 h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Dytran</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm text-gray-700">
                    <svg class="w-5 h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>MSC Apex</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm text-gray-700">
                    <svg class="w-5 h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Actran</span>
                  </div>
                </div>
              </div>

              <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg mb-6">
                <p class="text-yellow-800 font-bold text-sm flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
                  </svg>
                  <span>FREE 24/7 Support & Training!</span>
                </p>
              </div>

              <div class="flex flex-col sm:flex-row gap-3">
                <button
                  @click="openQuoteModal"
                  class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <span>Get Quote</span>
                </button>
                <RouterLink 
                  to="/Products_and_services/Software_Sales/Engineering_Software_List"
                  class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <span>View Catalog</span>
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </RouterLink>
              </div>
            </div>
          </div>

                    <!-- Training Services - NEW -->
                    <div class="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-green-200 hover:border-green-400">
            <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-600 to-emerald-600"></div>
            
            <div class="p-8 md:p-10">
              <div class="flex items-start gap-6 mb-6">
                <div class="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 transition-transform">
                  <svg class="w-11 h-11 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-3xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    Training Services
                  </h3>
                  <p class="text-green-600 font-semibold text-lg">Master MSC Software</p>
                </div>
              </div>

              <p class="text-gray-700 mb-6 leading-relaxed">
                Comprehensive training programs for MSC Software products. Learn from certified instructors with hands-on exercises, real-world applications, and certification support.
              </p>

              <div class="mb-6">
                <h4 class="font-bold text-gray-900 mb-3">Training Options:</h4>
                <div class="grid grid-cols-2 gap-3">
                  <div class="flex items-center gap-2 text-sm text-gray-700">
                    <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>On-site Training</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm text-gray-700">
                    <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Online Training</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm text-gray-700">
                    <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Webinars</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm text-gray-700">
                    <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Custom Courses</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm text-gray-700">
                    <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Certifications</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm text-gray-700">
                    <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Workshops</span>
                  </div>
                </div>
              </div>

              <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mb-6">
                <p class="text-green-800 font-bold text-sm flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                  </svg>
                  <span>FREE with Software Purchase!</span>
                </p>
              </div>

              <a 
                href="/contact_us"
                class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <span>Request Training</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </a>
            </div>
          </div>

          <!-- Engineering Services -->
          <div class="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-purple-200 hover:border-purple-400">
            <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-600 to-pink-600"></div>
            
            <div class="p-8 md:p-10">
              <div class="flex items-start gap-6 mb-6">
                <div class="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 transition-transform">
                  <svg class="w-11 h-11 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-3xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    Engineering Services
                  </h3>
                  <p class="text-purple-600 font-semibold text-lg">Design, Analysis & Consulting</p>
                </div>
              </div>

              <p class="text-gray-700 mb-6 leading-relaxed">
                Expert engineering services including FEA, CFD analysis, structural design, crash simulation, NVH analysis, and comprehensive technical consulting.
              </p>

              <div class="mb-6">
                <h4 class="font-bold text-gray-900 mb-3">Core Services:</h4>
                <div class="grid grid-cols-2 gap-3">
                  <div class="flex items-center gap-2 text-sm text-gray-700">
                    <svg class="w-5 h-5 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>FEA Analysis</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm text-gray-700">
                    <svg class="w-5 h-5 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>CFD Simulation</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm text-gray-700">
                    <svg class="w-5 h-5 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Crash Analysis</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm text-gray-700">
                    <svg class="w-5 h-5 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Design Optimization</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm text-gray-700">
                    <svg class="w-5 h-5 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>NVH Analysis</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm text-gray-700">
                    <svg class="w-5 h-5 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Thermal Analysis</span>
                  </div>
                </div>
              </div>

              <RouterLink 
                to="/Products_and_services/software_service"
                class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <span>Explore Services</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Additional Services -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Included with Every Purchase
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Our unique value proposition - complete support at no extra cost
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- 24/7 Support -->
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-lg border-2 border-green-200">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
              <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
            <div class="inline-block bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full mb-3">
              FREE
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">24/7 Technical Support</h3>
            <p class="text-gray-600 text-sm">Round-the-clock help desk, remote troubleshooting, and dedicated support team</p>
          </div>

          <!-- Training -->
          <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-lg border-2 border-purple-200">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
              <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <div class="inline-block bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full mb-3">
              FREE
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Training Programs</h3>
            <p class="text-gray-600 text-sm">On-site, online training, webinars, and certification programs</p>
          </div>

          <!-- Installation -->
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 shadow-lg border-2 border-blue-200">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
              <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
            </div>
            <div class="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
              INCLUDED
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Installation & Setup</h3>
            <p class="text-gray-600 text-sm">Complete software installation, configuration, and deployment assistance</p>
          </div>

          <!-- Consulting -->
          <div class="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 shadow-lg border-2 border-orange-200">
            <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
              <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <div class="inline-block bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
              AVAILABLE
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Technical Consulting</h3>
            <p class="text-gray-600 text-sm">Expert guidance, methodology development, and best practices implementation</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Service Comparison -->
    <section class="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Our Complete Package?
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            See the difference between traditional vendors and Hi-Tech SoftSys
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <!-- Traditional Vendor -->
          <div class="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
            <div class="text-center mb-6">
              <div class="inline-block bg-gray-100 rounded-full p-4 mb-4">
                <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900">Traditional Vendors</h3>
            </div>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-gray-700">Software license only</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-gray-700">Extra charge for support ($5K-$8K/year)</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-gray-700">Training costs extra ($3K-$5K)</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-gray-700">Limited engagement</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-gray-700">No engineering services</span>
              </li>
            </ul>
            <div class="mt-6 text-center">
              <p class="text-2xl font-bold text-gray-900">Total Cost:</p>
              <p class="text-3xl font-bold text-red-600">$18K-$23K/year</p>
            </div>
          </div>

          <!-- Hi-Tech SoftSys -->
          <div class="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 shadow-2xl text-white relative overflow-hidden">
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400 rounded-full opacity-20"></div>
            <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-400 rounded-full opacity-20"></div>
            
            <div class="relative text-center mb-6">
              <div class="inline-block bg-yellow-400 rounded-full p-4 mb-4">
                <svg class="w-10 h-10 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold">Hi-Tech SoftSys</h3>
              <p class="text-blue-200 text-sm">Complete Solution Package</p>
            </div>
            <ul class="space-y-3 relative">
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span>MSC Software license</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span><strong>FREE</strong> 24/7 technical support</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span><strong>FREE</strong> comprehensive training</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span><strong>FREE</strong> installation & configuration</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span>Optional engineering services</span>
              </li>
            </ul>
            <div class="mt-6 text-center relative">
              <p class="text-xl font-bold mb-1">Your Investment:</p>
              <p class="text-4xl font-bold text-yellow-300">License Only</p>
              <p class="text-sm text-blue-200 mt-2">Save $10K-$13K annually!</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Training Services Detailed Section -->
    <section class="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <span class="text-green-600 font-semibold text-sm uppercase tracking-wider">Professional Development</span>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            MSC Software Training Programs
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock the full potential of MSC Software with our comprehensive training programs
          </p>
        </div>

        <!-- Training Types -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-green-200 hover:-translate-y-1">
            <div class="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">On-Site Training</h3>
            <p class="text-gray-600 text-sm mb-4">Instructor-led training at your facility with customized curriculum</p>
            <div class="text-green-600 font-semibold text-sm">1-5 Days Duration</div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-blue-200 hover:-translate-y-1">
            <div class="bg-gradient-to-br from-blue-500 to-indigo-600 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Online Training</h3>
            <p class="text-gray-600 text-sm mb-4">Live virtual training sessions with interactive learning modules</p>
            <div class="text-blue-600 font-semibold text-sm">Flexible Schedule</div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-purple-200 hover:-translate-y-1">
            <div class="bg-gradient-to-br from-purple-500 to-pink-600 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Webinars</h3>
            <p class="text-gray-600 text-sm mb-4">Focused sessions on specific topics and software features</p>
            <div class="text-purple-600 font-semibold text-sm">1-2 Hours Each</div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-orange-200 hover:-translate-y-1">
            <div class="bg-gradient-to-br from-orange-500 to-red-600 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Certifications</h3>
            <p class="text-gray-600 text-sm mb-4">Industry-recognized MSC Software certifications and credentials</p>
            <div class="text-orange-600 font-semibold text-sm">Professional Certs</div>
          </div>
        </div>

        <!-- Training Curriculum -->
        <div class="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-12">
          <h3 class="text-3xl font-bold text-gray-900 mb-8 text-center">
            Comprehensive Training Curriculum
          </h3>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <div class="flex items-center gap-3 mb-4">
                <div class="bg-blue-100 p-2 rounded-lg">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                  </svg>
                </div>
                <h4 class="text-xl font-bold text-gray-900">MSC Nastran</h4>
              </div>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-green-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Linear Static Analysis</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-green-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Dynamic Analysis</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-green-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Optimization Techniques</span>
                </li>
              </ul>
            </div>

            <div>
              <div class="flex items-center gap-3 mb-4">
                <div class="bg-purple-100 p-2 rounded-lg">
                  <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                </div>
                <h4 class="text-xl font-bold text-gray-900">Marc</h4>
              </div>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-green-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Nonlinear Analysis</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-green-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Contact Mechanics</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-green-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Material Models</span>
                </li>
              </ul>
            </div>

            <div>
              <div class="flex items-center gap-3 mb-4">
                <div class="bg-cyan-100 p-2 rounded-lg">
                  <svg class="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                  </svg>
                </div>
                <h4 class="text-xl font-bold text-gray-900">Actran</h4>
              </div>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-green-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Acoustic Simulation</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-green-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Vibro-Acoustics</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-green-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>NVH Analysis</span>
                </li>
              </ul>
            </div>

            <div>
              <div class="flex items-center gap-3 mb-4">
                <div class="bg-orange-100 p-2 rounded-lg">
                  <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                  </svg>
                </div>
                <h4 class="text-xl font-bold text-gray-900">Patran</h4>
              </div>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-green-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Pre-Processing</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-green-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Post-Processing</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-green-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Meshing Techniques</span>
                </li>
              </ul>
            </div>

            <div>
              <div class="flex items-center gap-3 mb-4">
                <div class="bg-red-100 p-2 rounded-lg">
                  <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h4 class="text-xl font-bold text-gray-900">Adams</h4>
              </div>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-green-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Multibody Dynamics</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-green-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>System Simulation</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-green-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Motion Analysis</span>
                </li>
              </ul>
            </div>

            <div>
              <div class="flex items-center gap-3 mb-4">
                <div class="bg-indigo-100 p-2 rounded-lg">
                  <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h4 class="text-xl font-bold text-gray-900">CFD Solutions</h4>
              </div>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-green-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Fluid Flow Analysis</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-green-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Thermal Management</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-green-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Aerodynamics</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-8 text-center">
            <a href="/contact_us" class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 shadow-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>Schedule Training Session</span>
            </a>
          </div>
        </div>

        <!-- Training Benefits -->
        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
            <div class="flex items-center gap-3 mb-4">
              <div class="bg-green-100 p-3 rounded-lg">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h4 class="text-lg font-bold text-gray-900">Expert Instructors</h4>
            </div>
            <p class="text-gray-600 text-sm">Learn from MSC Software certified trainers with real-world industry experience</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
            <div class="flex items-center gap-3 mb-4">
              <div class="bg-blue-100 p-3 rounded-lg">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h4 class="text-lg font-bold text-gray-900">Course Materials</h4>
            </div>
            <p class="text-gray-600 text-sm">Comprehensive documentation, exercise files, and reference guides included</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
            <div class="flex items-center gap-3 mb-4">
              <div class="bg-purple-100 p-3 rounded-lg">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                </svg>
              </div>
              <h4 class="text-lg font-bold text-gray-900">Certification</h4>
            </div>
            <p class="text-gray-600 text-sm">Receive official MSC Software training certificates upon completion</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Industries We Serve -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <span class="text-blue-600 font-semibold text-sm uppercase tracking-wider">Industry Expertise</span>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Serving Multiple Industries
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Our solutions power innovation across diverse sectors
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <RouterLink 
            v-for="(industry, index) in industries" 
            :key="index"
            :to="industry.link"
            class="group bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-400 text-center"
          >
            <div class="text-5xl mb-3">{{ industry.icon }}</div>
            <h3 class="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{{ industry.name }}</h3>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Get Started?
        </h2>
        <p class="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
          Experience the Hi-Tech SoftSys difference - complete solutions with unmatched value
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="openQuoteModal"
            class="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span>Get Your FREE Quote</span>
          </button>
          <button
            @click="openDemoModal"
            class="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            <span>Request FREE Demo</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Request Demo Modal -->
    <RequestDemoModal
      v-model="showDemoModal"
      @submit="handleDemoSubmit"
    />

    <!-- Request Quote Modal -->
    <RequestQuoteModal
      v-model="showQuoteModal"
      @submit="handleQuoteSubmit"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import RequestDemoModal from '@/components/shared/RequestDemoModal.vue'
import RequestQuoteModal from '@/components/shared/RequestQuoteModal.vue'

const showDemoModal = ref(false)
const showQuoteModal = ref(false)

const openDemoModal = () => {
  showDemoModal.value = true
}

const openQuoteModal = () => {
  showQuoteModal.value = true
}

const handleDemoSubmit = (formData) => {
  console.log('Demo request submitted:', formData)
  // Here you would typically send this to your backend API
}

const handleQuoteSubmit = (formData) => {
  console.log('Quote request submitted:', formData)
  // Here you would typically send this to your backend API
}

const industries = [
  { name: 'Aerospace', icon: '✈️', link: '/industries/aerospace' },
  { name: 'Automotive', icon: '🚗', link: '/industries/automotive' },
  { name: 'Energy', icon: '⚡', link: '/industries/energy' },
  { name: 'Defense', icon: '🛡️', link: '/industries/defense' },
  { name: 'Electronics', icon: '📱', link: '/industries/electronics' },
  { name: 'Heavy Equipment', icon: '⚙️', link: '/industries/heavy-equipment' },
  { name: 'Medical', icon: '🏥', link: '/industries/medical' },
  { name: 'Machinery', icon: '🔧', link: '/industries/machinery' },
  { name: 'Shipbuilding', icon: '🚢', link: '/industries/shipbuilding' },
  { name: 'Rail', icon: '🚂', link: '/industries/rail' },
  { name: 'Packaging', icon: '📦', link: '/industries/packaging' },
  { name: 'Consumer Products', icon: '🛍️', link: '/industries/consumer-products' }
]
</script>

<style scoped>
/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}
</style>

