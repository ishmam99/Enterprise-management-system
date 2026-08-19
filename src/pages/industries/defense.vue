<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white overflow-hidden">
      <div class="absolute inset-0">
        <img src="/src/assets/images/Aerospace&Defense.png" alt="Defense" class="w-full h-full object-cover opacity-30" />
        <div class="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-slate-900/85 to-transparent"></div>
      </div>
      
      <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div class="max-w-3xl">
          <!-- Breadcrumb -->
          <nav class="flex items-center gap-2 text-sm text-gray-300 mb-6">
            <a href="/" class="hover:text-white transition-colors">Home</a>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
            <a href="/industries" class="hover:text-white transition-colors">Industries</a>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-white">Defense</span>
          </nav>

          <!-- Badge -->
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
            <svg class="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
            <span class="text-cyan-200 font-semibold">Industry Solutions</span>
          </div>

          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            Defense
            <span class="block mt-2 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Engineering Solutions
            </span>
          </h1>

          <p class="text-xl text-gray-200 leading-relaxed mb-8">
            As a pioneer in simulation technologies for defense industry, MSC Software offers a complete suite of multidisciplinary capabilities required to build best-of-class products.
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <a href="/contact_us" class="px-8 py-4 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors inline-flex items-center justify-center gap-2 shadow-xl">
              <span>Request Consultation</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>
            <a href="#solutions" class="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/20 transition-colors inline-flex items-center justify-center gap-2">
              <span>Explore Solutions</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Industry Challenges Section -->
    <div class="py-16 md:py-24 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Defense Industry Challenges
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Meeting the demanding requirements of modern defense engineering and national security
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-red-500">
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Mission-Critical Safety</h3>
              <p class="text-gray-600">Ensuring absolute reliability and safety in life-threatening combat situations</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-orange-500">
              <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Extreme Environments</h3>
              <p class="text-gray-600">Designing systems that operate in harsh combat conditions and extreme weather</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-yellow-500">
              <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Cost Optimization</h3>
              <p class="text-gray-600">Balancing advanced capabilities with budget constraints and procurement requirements</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-green-500">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Advanced Materials</h3>
              <p class="text-gray-600">Developing and testing new materials for armor, stealth, and performance</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-blue-500">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Rapid Deployment</h3>
              <p class="text-gray-600">Accelerating development cycles while maintaining rigorous testing standards</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-purple-500">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Multi-Domain Operations</h3>
              <p class="text-gray-600">Integrating land, sea, air, and space systems for comprehensive defense</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Simulation Showcase Section -->
    <div class="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Advanced Defense Simulation
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              See how MSC Software enables world-class defense engineering and analysis
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-6 mb-8">
            <div class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <img src="https://www.hitechsoftsys.net/images/aerospace_1.jpg" alt="Defense Structural Analysis" class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='/src/assets/images/product_service/biman.jpg'" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                <div class="text-white">
                  <h3 class="text-xl font-bold mb-2">Armor & Ballistics Simulation</h3>
                  <p class="text-sm text-gray-200">Advanced FEA for protective systems and ballistic analysis</p>
                </div>
              </div>
            </div>

            <div class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <img src="https://www.hitechsoftsys.net/images/aerospace_2.jpg" alt="Defense Blast Analysis" class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='/src/assets/images/product_service/biman2.jpg'" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                <div class="text-white">
                  <h3 class="text-xl font-bold mb-2">Blast & Impact Analysis</h3>
                  <p class="text-sm text-gray-200">Explosive simulation and survivability analysis</p>
                </div>
              </div>
            </div>

            <div class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <img src="https://www.hitechsoftsys.net/images/aerospace_3.jpg" alt="Defense Vehicle Analysis" class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='/src/assets/images/product_service/biman3.jpg'" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                <div class="text-white">
                  <h3 class="text-xl font-bold mb-2">Vehicle Dynamics</h3>
                  <p class="text-sm text-gray-200">Military vehicle performance and terrain analysis</p>
                </div>
              </div>
            </div>

            <div class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <img src="https://www.hitechsoftsys.net/images/aerospace_4.jpg" alt="Defense Systems Analysis" class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='/src/assets/images/product_service/biman5.jpg'" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                <div class="text-white">
                  <h3 class="text-xl font-bold mb-2">Multi-Body Dynamics</h3>
                  <p class="text-sm text-gray-200">Complex system behavior and mechanism analysis</p>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center">
            <p class="text-gray-600 mb-4">
              <span class="font-semibold text-blue-600">Trusted by leading defense contractors worldwide</span> - MSC Software has been the industry standard since the 1960s
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- MSC Software Solutions Section -->
    <div id="solutions" class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              MSC Software Solutions for Defense
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive simulation and analysis tools tailored for defense engineering
            </p>
          </div>

          <div class="space-y-8">
            <!-- MSC Nastran -->
            <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div class="grid md:grid-cols-5 gap-0">
                <div class="md:col-span-2 relative h-64 md:h-auto">
                  <img src="https://www.hitechsoftsys.net/images/nastran_aerospace.jpg" alt="MSC Nastran Simulation" class="w-full h-full object-cover" onerror="this.src='/src/assets/images/product_service/biman4.png'" />
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent to-blue-50/90 md:block hidden"></div>
                </div>
                <div class="md:col-span-3 p-8 md:p-10">
                  <div class="flex items-start gap-4 mb-4">
                    <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <h3 class="text-2xl font-bold text-gray-900 mb-2">MSC Nastran</h3>
                      <p class="text-sm text-blue-600 font-semibold">Industry Standard FEA</p>
                    </div>
                  </div>
                  <p class="text-gray-600 mb-4">
                    Industry-standard finite element analysis (FEA) for structural analysis, fatigue, durability, and optimization. Trusted by leading defense contractors worldwide.
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">Static Analysis</span>
                    <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">Dynamic Analysis</span>
                    <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">Fatigue Analysis</span>
                    <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">Armor Design</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Dytran -->
            <div class="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow">
              <div class="flex flex-col md:flex-row gap-6 items-start">
                <div class="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-gray-900 mb-3">MSC Dytran</h3>
                  <p class="text-gray-600 mb-4">
                    Explicit nonlinear and transient dynamics analysis for blast, impact, crash, and ballistic scenarios. Essential for defense survivability analysis.
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">Blast Analysis</span>
                    <span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">Impact Simulation</span>
                    <span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">Ballistics</span>
                    <span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">Crash Analysis</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- MSC Apex -->
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div class="grid md:grid-cols-5 gap-0">
                <div class="md:col-span-3 p-8 md:p-10 order-2 md:order-1">
                  <div class="flex items-start gap-4 mb-4">
                    <div class="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <h3 class="text-2xl font-bold text-gray-900 mb-2">MSC Apex</h3>
                      <p class="text-sm text-green-600 font-semibold">Next-Generation CAE</p>
                    </div>
                  </div>
                  <p class="text-gray-600 mb-4">
                    Next-generation generative design and simulation platform. Rapid modeling, meshing, and analysis for concept exploration and design optimization.
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Generative Design</span>
                    <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Rapid Meshing</span>
                    <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Topology Optimization</span>
                    <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Concept Design</span>
                  </div>
                </div>
                <div class="md:col-span-2 relative h-64 md:h-auto order-1 md:order-2">
                  <img src="https://www.hitechsoftsys.net/images/apex_aerospace.jpg" alt="MSC Apex Simulation" class="w-full h-full object-cover" onerror="this.src='/src/assets/images/product_service/biman6.jpg'" />
                  <div class="absolute inset-0 bg-gradient-to-l from-transparent to-green-50/90 md:block hidden"></div>
                </div>
              </div>
            </div>

            <!-- Adams -->
            <div class="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow">
              <div class="flex flex-col md:flex-row gap-6 items-start">
                <div class="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-gray-900 mb-3">MSC Adams</h3>
                  <p class="text-gray-600 mb-4">
                    Multi-body dynamics simulation for vehicle systems, mechanisms, and complex mechanical assemblies in defense applications.
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">Vehicle Dynamics</span>
                    <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">Mechanism Analysis</span>
                    <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">Control Systems</span>
                    <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">Terrain Analysis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Purpose of MSC Software Section -->
    <div class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Purpose of Using MSC Software by Engineers
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              MSC Software enables defense engineers to simulate and analyze critical systems and components
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Weight Reduction of Structures</h3>
                  <p class="text-sm text-gray-600">Optimizing structural weight while maintaining strength</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Armored Vehicle Fatigue Studies</h3>
                  <p class="text-sm text-gray-600">Durability analysis for military vehicles</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Vehicle Crash Analysis</h3>
                  <p class="text-sm text-gray-600">Impact simulation and crashworthiness</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Vehicle Maneuverability</h3>
                  <p class="text-sm text-gray-600">Terrain analysis and mobility simulation</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Mine Blast Analysis</h3>
                  <p class="text-sm text-gray-600">Explosive simulation and survivability</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Projectile Launching</h3>
                  <p class="text-sm text-gray-600">Ballistics and trajectory analysis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Defense Business Segments Section -->
    <div class="py-16 md:py-24 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Defense Business Segments
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive coverage across all defense industry sectors
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-blue-500">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Aircraft</h3>
              <p class="text-gray-600">Military aircraft design, analysis, and optimization</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-green-500">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Ground Defense</h3>
              <p class="text-gray-600">Armored vehicles, tanks, and ground systems</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-purple-500">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Military Aircraft</h3>
              <p class="text-gray-600">Fighter jets, bombers, and military aviation</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-orange-500">
              <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Space Systems</h3>
              <p class="text-gray-600">Satellites, missiles, and space defense</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-red-500">
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Airframe (OEMs) Suppliers</h3>
              <p class="text-gray-600">Aircraft structure and component suppliers</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-cyan-500">
              <div class="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Helicopters</h3>
              <p class="text-gray-600">Military helicopter design and analysis</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MSC Products Used Section -->
    <div class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              MSC Products Used in Defense Industry
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive software solutions for every defense engineering need
            </p>
          </div>

          <div class="space-y-8">
            <div 
              v-for="(category, index) in mscProducts" 
              :key="index"
              class="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="category.icon"></path>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900">{{ category.name }}</h3>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div 
                  v-for="(product, productIndex) in category.products" 
                  :key="productIndex"
                  class="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
                >
                  <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span class="text-gray-700 font-medium">{{ product }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Case Studies Section -->
    <div class="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Defense Case Studies
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Real-world applications and success stories from defense industry leaders
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Developing New Customizable Armaments</h3>
              <p class="text-gray-600">Advanced weapon system design and optimization using MSC Software solutions</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Compressing Product Development Cycles</h3>
              <p class="text-gray-600">Accelerating defense system development through advanced simulation</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Explicit Simulation with Dytran</h3>
              <p class="text-gray-600">Advanced blast and impact analysis for defense industry applications</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">MSC Adams Ejection Performance</h3>
              <p class="text-gray-600">Improving military ejection seat performance and safety systems</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">High Performing Mechanism</h3>
              <p class="text-gray-600">Advanced mechanism design and optimization for defense systems</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Call to Action Section -->
    <div class="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-indigo-600">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Enhance Your Defense Engineering Capabilities?
          </h2>
          <p class="text-xl text-blue-100 mb-8">
            Get expert MSC Software solutions with FREE 24/7 support, training, and implementation assistance
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact_us" class="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <span>Get FREE Quote</span>
            </a>
            <a href="/contact_us" class="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              <span>Request Demo</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Modal state
const showDemoModal = ref(false)
const showQuoteModal = ref(false)

// Modal handlers
const openDemoModal = () => {
  showDemoModal.value = true
}

const openQuoteModal = () => {
  showQuoteModal.value = true
}

const handleDemoSubmit = (formData) => {
  console.log('Demo request submitted:', formData)
  showDemoModal.value = false
}

const handleQuoteSubmit = (formData) => {
  console.log('Quote request submitted:', formData)
  showQuoteModal.value = false
}

// MSC Products data
const mscProducts = ref([
  {
    name: 'Structural Analysis',
    icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
    products: [
      'MSC Nastran',
      'MSC Marc',
      'MSC Patran',
      'MSC Apex',
      'MSC Adams',
      'MSC Dytran'
    ]
  },
  {
    name: 'Multi-Body Dynamics',
    icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
    products: [
      'MSC Adams',
      'MSC Adams/Car',
      'MSC Adams/View',
      'MSC Adams/Flex',
      'MSC Adams/Controls',
      'MSC Adams/Machinery'
    ]
  },
  {
    name: 'Explicit Dynamics',
    icon: 'M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z',
    products: [
      'MSC Dytran',
      'MSC Nastran Explicit',
      'MSC Marc Explicit',
      'MSC Apex Explicit',
      'MSC Adams Explicit',
      'MSC Dytran Explicit'
    ]
  },
  {
    name: 'Fatigue & Durability',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    products: [
      'MSC Fatigue',
      'MSC Nastran Fatigue',
      'MSC Marc Fatigue',
      'MSC Apex Fatigue',
      'MSC Adams Fatigue',
      'MSC Dytran Fatigue'
    ]
  },
  {
    name: 'CFD & Thermal',
    icon: 'M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V1a1 1 0 011-1h2a1 1 0 011 1v3m0 0h8',
    products: [
      'Cradle CFD',
      'MSC Nastran Thermal',
      'MSC Marc Thermal',
      'MSC Apex Thermal',
      'MSC Adams Thermal',
      'MSC Dytran Thermal'
    ]
  },
  {
    name: 'Acoustics & NVH',
    icon: 'M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z',
    products: [
      'MSC Actran',
      'MSC Nastran Acoustics',
      'MSC Marc Acoustics',
      'MSC Apex Acoustics',
      'MSC Adams Acoustics',
      'MSC Dytran Acoustics'
    ]
  }
])
</script>

<style scoped>
</style>

