<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
      <div class="absolute inset-0">
        <img src="/src/assets/images/Aerospace&Defense.png" alt="Aerospace" class="w-full h-full object-cover opacity-30" />
        <div class="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-indigo-900/80 to-transparent"></div>
      </div>
      
      <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div class="max-w-3xl">
          <!-- Breadcrumb -->
          <nav class="flex items-center gap-2 text-sm text-blue-200 mb-6">
            <a href="/" class="hover:text-white transition-colors">Home</a>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
            <a href="/industries" class="hover:text-white transition-colors">Industries</a>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-white">Aerospace</span>
          </nav>

          <!-- Badge -->
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
            <svg class="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
            </svg>
            <span class="text-cyan-200 font-semibold">Industry Solutions</span>
          </div>

          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            Aerospace Engineering
            <span class="block mt-2 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Solutions
            </span>
          </h1>

          <p class="text-xl text-gray-200 leading-relaxed mb-8">
            Advanced simulation and analysis tools for aerospace design, testing, and certification. From structural integrity to flight dynamics, we power innovation in the skies.
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
              Aerospace Industry Challenges
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Meeting the demanding requirements of modern aerospace engineering
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-blue-500">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Safety & Certification</h3>
              <p class="text-gray-600">Meeting stringent regulatory requirements and ensuring aircraft safety through rigorous analysis and testing</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-purple-500">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Weight Optimization</h3>
              <p class="text-gray-600">Reducing weight while maintaining structural integrity to improve fuel efficiency and performance</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-green-500">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Cost Reduction</h3>
              <p class="text-gray-600">Optimizing design and manufacturing processes to reduce development and production costs</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-red-500">
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Complex Simulations</h3>
              <p class="text-gray-600">Analyzing complex multi-physics interactions including aerodynamics, structures, and thermal effects</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-cyan-500">
              <div class="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Time to Market</h3>
              <p class="text-gray-600">Accelerating development cycles while maintaining quality and safety standards</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-orange-500">
              <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Sustainability</h3>
              <p class="text-gray-600">Developing eco-friendly aircraft with reduced emissions and improved fuel efficiency</p>
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
              Advanced Aerospace Simulation
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              See how MSC Software enables world-class aerospace engineering and analysis
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-6 mb-8">
            <div class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <img src="https://www.hitechsoftsys.net/images/aerospace_1.jpg" alt="Aerospace Structural Analysis" class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='/src/assets/images/product_service/biman.jpg'" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                <div class="text-white">
                  <h3 class="text-xl font-bold mb-2">Structural Analysis Simulation</h3>
                  <p class="text-sm text-gray-200">Advanced FEA for aircraft structures</p>
                </div>
              </div>
            </div>

            <div class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <img src="https://www.hitechsoftsys.net/images/aerospace_2.jpg" alt="Aerodynamic Analysis" class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='/src/assets/images/product_service/biman2.jpg'" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                <div class="text-white">
                  <h3 class="text-xl font-bold mb-2">Aerodynamic Flow Analysis</h3>
                  <p class="text-sm text-gray-200">CFD simulation for airflow optimization</p>
                </div>
              </div>
            </div>

            <div class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <img src="https://www.hitechsoftsys.net/images/aerospace_3.jpg" alt="Aircraft Component Simulation" class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='/src/assets/images/product_service/biman3.jpg'" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                <div class="text-white">
                  <h3 class="text-xl font-bold mb-2">Component Analysis</h3>
                  <p class="text-sm text-gray-200">Detailed mechanical component simulation</p>
                </div>
              </div>
            </div>

            <div class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <img src="https://www.hitechsoftsys.net/images/aerospace_4.jpg" alt="Aircraft Systems Simulation" class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='/src/assets/images/product_service/biman5.jpg'" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                <div class="text-white">
                  <h3 class="text-xl font-bold mb-2">Multi-Body Dynamics</h3>
                  <p class="text-sm text-gray-200">Dynamic system behavior analysis</p>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center">
            <p class="text-gray-600 mb-4">
              <span class="font-semibold text-blue-600">Trusted by leading aerospace companies worldwide</span> - MSC Software has been the industry standard since the 1960s
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
              MSC Software Solutions for Aerospace
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive simulation and analysis tools tailored for aerospace engineering
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
                    Industry-standard finite element analysis (FEA) for structural analysis, flutter, aeroelasticity, and optimization. Trusted by leading aerospace companies worldwide.
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">Static Analysis</span>
                    <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">Dynamic Analysis</span>
                    <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">Aeroelasticity</span>
                    <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">Fatigue Analysis</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Patran -->
            <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow">
              <div class="flex flex-col md:flex-row gap-6 items-start">
                <div class="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-gray-900 mb-3">MSC Patran</h3>
                  <p class="text-gray-600 mb-4">
                    Comprehensive pre- and post-processing environment for aerospace FEA. Build, analyze, and visualize complex aircraft structures with ease.
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">Meshing</span>
                    <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">Model Building</span>
                    <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">Results Visualization</span>
                    <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">CAD Integration</span>
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
                    <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Multi-body Dynamics</span>
                  </div>
                </div>
                <div class="md:col-span-2 relative h-64 md:h-auto order-1 md:order-2">
                  <img src="https://www.hitechsoftsys.net/images/apex_aerospace.jpg" alt="MSC Apex Simulation" class="w-full h-full object-cover" onerror="this.src='/src/assets/images/product_service/biman6.jpg'" />
                  <div class="absolute inset-0 bg-gradient-to-l from-transparent to-green-50/90 md:block hidden"></div>
                </div>
              </div>
            </div>

            <!-- Dytran -->
            <div class="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow">
              <div class="flex flex-col md:flex-row gap-6 items-start">
                <div class="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-gray-900 mb-3">MSC Dytran</h3>
                  <p class="text-gray-600 mb-4">
                    Explicit nonlinear and transient dynamics analysis for bird strike, impact, crash, and blast scenarios. Essential for aircraft safety certification.
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">Bird Strike</span>
                    <span class="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">Impact Analysis</span>
                    <span class="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">Crash Simulation</span>
                    <span class="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">Blast Analysis</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Actran -->
            <div class="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow">
              <div class="flex flex-col md:flex-row gap-6 items-start">
                <div class="w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-gray-900 mb-3">MSC Actran</h3>
                  <p class="text-gray-600 mb-4">
                    Advanced acoustics simulation for aircraft interior and exterior noise analysis. Meet stringent noise regulations and improve passenger comfort.
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">Cabin Noise</span>
                    <span class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">Engine Noise</span>
                    <span class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">Aero-acoustics</span>
                    <span class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">Vibro-acoustics</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Engineering Segments Section -->
    <section class="py-20 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl"></div>
      </div>

      <div class="container mx-auto px-6 relative z-10">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full px-4 py-2 mb-4">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
            <span class="text-blue-600 font-semibold text-sm uppercase tracking-wider">Engineering Expertise</span>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
            Aerospace Engineering Segments & Analysis Solutions
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive simulation solutions for structural, thermal, dynamic, acoustic, and advanced aerospace engineering challenges
          </p>
        </div>

        <!-- Engineering Segments Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div v-for="seg in segments" :key="seg.key"
            class="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 hover:border-blue-400 transform hover:-translate-y-1">
            <!-- Header with Icon -->
            <div class="flex items-start gap-4 mb-6">
              <div
                :class="['w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md', seg.iconGradient]">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="seg.iconPath"></path>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{{ seg.title }}</h3>
                <span class="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">{{ seg.short }}</span>
              </div>
            </div>

            <!-- Definition -->
            <p class="text-gray-700 font-medium mb-3 leading-relaxed">{{ seg.definition }}</p>
            <p class="text-gray-600 text-sm mb-6 leading-relaxed">{{ seg.description }}</p>

            <!-- MSC Products - Clickable Blocks -->
            <div class="mb-6 pb-6 border-b border-gray-200">
              <h4 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                Relevant MSC Products
              </h4>
              <div class="grid grid-cols-1 gap-3">
                <button v-for="p in seg.products" :key="p.name" 
                  @click="openProductModal(p)"
                  class="group/product flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 text-left transform hover:scale-105 hover:shadow-md">
                  <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/product:rotate-12 transition-transform">
                    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                      <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-semibold text-gray-900 group-hover/product:text-blue-600 transition-colors flex items-center gap-2">
                      {{ p.name }}
                      <svg class="w-4 h-4 text-blue-500 opacity-0 group-hover/product:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                      </svg>
                    </p>
                    <p class="text-gray-600 text-xs mt-1 line-clamp-1">{{ p.usage }}</p>
                  </div>
                </button>
              </div>
            </div>

            <!-- Business Value -->
            <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-100">
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                  <h5 class="font-bold text-gray-900 text-sm mb-1">Business Value</h5>
                  <p class="text-gray-700 text-sm leading-relaxed">{{ seg.business }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Key Benefits Section -->
        <div class="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-white">
          <div class="text-center mb-8">
            <h3 class="text-3xl md:text-4xl font-bold mb-4">
              Why Choose MSC Software for Aerospace?
            </h3>
            <p class="text-blue-100 text-lg max-w-2xl mx-auto">
              Industry-leading simulation tools backed by 60+ years of aerospace engineering excellence
            </p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-6">
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h4 class="text-xl font-bold mb-2">Faster Certification</h4>
              <p class="text-blue-100">Accelerate aerospace certification processes with proven simulation technology</p>
            </div>
            
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h4 class="text-xl font-bold mb-2">Reduce Testing Costs</h4>
              <p class="text-blue-100">Minimize expensive physical prototyping and wind tunnel testing significantly</p>
            </div>
            
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h4 class="text-xl font-bold mb-2">Ensure Safety</h4>
              <p class="text-blue-100">Deliver safer aircraft that exceed industry safety standards and regulations</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Product Detail Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="selectedProduct" 
          @click="closeProductModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div @click.stop 
            class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all">
            <!-- Modal Header -->
            <div class="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-t-2xl">
              <div class="flex items-start justify-between">
                <div class="flex items-center gap-4">
                  <div class="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold">{{ selectedProduct.name }}</h3>
                    <p class="text-blue-100 text-sm mt-1">{{ selectedProduct.category }}</p>
                  </div>
                </div>
                <button @click="closeProductModal"
                  class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/20 transition-colors">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Modal Content -->
            <div class="p-8">
              <!-- Description -->
              <div class="mb-8">
                <h4 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Overview
                </h4>
                <p class="text-gray-700 leading-relaxed">{{ selectedProduct.description }}</p>
              </div>

              <!-- Primary Use -->
              <div class="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 class="text-sm font-bold text-blue-900 mb-2 uppercase tracking-wider">Primary Application</h4>
                <p class="text-gray-700">{{ selectedProduct.usage }}</p>
              </div>

              <!-- Key Features -->
              <div class="mb-8">
                <h4 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                  Key Features
                </h4>
                <div class="grid gap-3">
                  <div v-for="(feature, idx) in selectedProduct.features" :key="idx"
                    class="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                    <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-gray-700">{{ feature }}</span>
                  </div>
                </div>
              </div>

              <!-- Benefits -->
              <div class="mb-8">
                <h4 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Business Benefits
                </h4>
                <p class="text-gray-700 leading-relaxed bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                  {{ selectedProduct.benefits }}
                </p>
              </div>

              <!-- CTA Buttons -->
              <div class="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                <a href="/contact_us"
                  @click="closeProductModal"
                  class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all text-center">
                  Request Quote
                </a>
                <a href="/Products_and_services/Software_Sales/Engineering_Software_List"
                  @click="closeProductModal"
                  class="flex-1 px-6 py-3 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-all text-center">
                  View All Products
                </a>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Purpose of MSC Software Section -->
    <div class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Purpose of Using MSC Software by Engineers
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              MSC Software enables aerospace engineers to simulate and analyze critical systems and components
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
                  <h3 class="font-bold text-gray-900 mb-1">Aircraft Maneuver Simulation</h3>
                  <p class="text-sm text-gray-600">Dynamic flight behavior analysis</p>
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
                  <h3 class="font-bold text-gray-900 mb-1">Body and Fuselage</h3>
                  <p class="text-sm text-gray-600">Structural integrity simulation</p>
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
                  <h3 class="font-bold text-gray-900 mb-1">Wing Structure & Deflection</h3>
                  <p class="text-sm text-gray-600">Wing performance under load</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Kinematics of Landing Gear</h3>
                  <p class="text-sm text-gray-600">Landing gear & wing flaps motion</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Jet Engine Nozzle</h3>
                  <p class="text-sm text-gray-600">Engine component optimization</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Hydraulic Controls</h3>
                  <p class="text-sm text-gray-600">Hydraulic system analysis</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Mechanical Flight Controls</h3>
                  <p class="text-sm text-gray-600">Control system dynamics</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Turbo Machinery</h3>
                  <p class="text-sm text-gray-600">Turbine and compressor analysis</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Attachment Interfaces</h3>
                  <p class="text-sm text-gray-600">Component connection analysis</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Ejection Systems</h3>
                  <p class="text-sm text-gray-600">Ejection & stores separation</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Environmental Control Systems</h3>
                  <p class="text-sm text-gray-600">Climate control & pressurization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Types of Analysis Section -->
    <div class="py-16 md:py-24 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">
              Types of Analysis Done Using MSC Software
            </h2>
            <p class="text-xl text-blue-200 max-w-3xl mx-auto">
              As a proud partner of MSC Software, Hi-Tech SoftSys provides all the essential licensing for comprehensive aerospace analysis
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Thermal & CFD Analysis</h3>
              <p class="text-blue-200">Computational Fluid Dynamics for heat transfer and airflow</p>
            </div>

            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Multi-Body Dynamics</h3>
              <p class="text-blue-200">MBD analysis for kinematic and dynamic systems</p>
            </div>

            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <div class="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Structural, Fatigue & Durability</h3>
              <p class="text-blue-200">Comprehensive structural integrity analysis</p>
            </div>

            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">ICME Analysis</h3>
              <p class="text-blue-200">Integrated Computational Materials Engineering</p>
            </div>

            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <div class="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Acoustics Analysis</h3>
              <p class="text-blue-200">Noise and vibration simulation</p>
            </div>

            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <div class="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Virtual Manufacturing & Costing</h3>
              <p class="text-blue-200">VM&C analysis for production optimization</p>
            </div>
          </div>

          <!-- Analysis Images Section -->
          <div class="mt-16">
            <div class="text-center mb-8">
              <h3 class="text-2xl md:text-3xl font-bold text-white mb-4">
                Analysis Simulation Gallery
              </h3>
              <p class="text-lg text-blue-200 max-w-2xl mx-auto">
                Visual examples of MSC Software analysis capabilities in aerospace engineering
              </p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all">
                <img src="/images/industries/aerospace/Aerospace_1.jpg" alt="Aerospace CFD Analysis" class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='/src/assets/images/Aerospace&Defense.png'" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                  <!-- <div class="text-white">
                    <h4 class="text-sm font-bold mb-1">Thermal & CFD Analysis</h4>
                    <p class="text-xs text-gray-200">Heat transfer & airflow simulation</p>
                  </div> -->
                </div>
              </div>

              <div class="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all">
                <img src="/images/industries/aerospace/Aerospace_2.jpg" alt="Aerospace MBD Analysis" class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='/src/assets/images/product_service/biman.jpg'" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                  <!-- <div class="text-white">
                    <h4 class="text-sm font-bold mb-1">Multi-Body Dynamics</h4>
                    <p class="text-xs text-gray-200">Kinematic & dynamic systems</p>
                  </div> -->
                </div>
              </div>

              <div class="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all">
                <img src="/images/industries/aerospace/Aerospace_3.jpg" alt="Aerospace Structural Analysis" class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='/src/assets/images/product_service/biman3.jpg'" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                  <!-- <div class="text-white">
                    <h4 class="text-sm font-bold mb-1">Structural Analysis</h4>
                    <p class="text-xs text-gray-200">Structural integrity analysis</p>
                  </div> -->
                </div>
              </div>

              <div class="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all">
                <img src="/images/industries/aerospace/Aerospace_4.jpg" alt="Aerospace ICME Analysis" class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='/src/assets/images/Aerospace&Defense.png'" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                  <!-- <div class="text-white">
                    <h4 class="text-sm font-bold mb-1">ICME Analysis</h4>
                    <p class="text-xs text-gray-200">Materials engineering</p>
                  </div> -->
                </div>
              </div>

              <div class="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all">
                <img src="/images/industries/aerospace/Aerospace_5.jpg" alt="Aerospace Acoustics Analysis" class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='/src/assets/images/product_service/biman.jpg'" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                  <!-- <div class="text-white">
                    <h4 class="text-sm font-bold mb-1">Acoustics Analysis</h4>
                    <p class="text-xs text-gray-200">Noise & vibration simulation</p>
                  </div> -->
                </div>
              </div>

              <div class="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all">
                <img src="/images/industries/aerospace/Aerospace_6.jpg" alt="Aerospace Manufacturing Analysis" class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='/src/assets/images/product_service/biman3.jpg'" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                  <!-- <div class="text-white">
                    <h4 class="text-sm font-bold mb-1">Virtual Manufacturing</h4>
                    <p class="text-xs text-gray-200">Production optimization</p>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Applications Section -->
    <div class="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Key Applications
            </h2>
            <p class="text-lg text-gray-600">
              How our solutions are applied in aerospace engineering
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-white rounded-xl p-6 shadow-lg">
              <h3 class="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                Structural Analysis
              </h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Fuselage and wing structural integrity</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Landing gear design and analysis</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Composite material analysis</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Fatigue and crack propagation</span>
                </li>
              </ul>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg">
              <h3 class="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                Aeroelasticity & Flutter
              </h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Flutter analysis and prevention</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Gust response simulation</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Control surface effectiveness</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Dynamic loads analysis</span>
                </li>
              </ul>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg">
              <h3 class="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                Impact & Crash
              </h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Bird strike certification</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Ditching and crashworthiness</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Foreign object damage (FOD)</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Cabin safety analysis</span>
                </li>
              </ul>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg">
              <h3 class="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                NVH & Acoustics
              </h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Cabin noise reduction</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Engine noise prediction</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Vibration analysis</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Acoustic compliance testing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Simulation Section -->
    <div class="py-16 md:py-24 bg-gradient-to-br from-slate-900 to-blue-900 text-white relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <img src="/src/assets/images/product_service/biman7.jpg" alt="Aerospace Simulation Background" class="w-full h-full object-cover" />
      </div>
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="max-w-6xl mx-auto">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div class="inline-block bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2 mb-6">
                <span class="text-blue-300 font-semibold text-sm">Advanced Simulation Technology</span>
              </div>
              <h2 class="text-3xl md:text-4xl font-bold mb-6">
                Making Aerospace Manufacturing Smarter
              </h2>
              <p class="text-xl text-blue-100 mb-8">
                With more than 400 highly-skilled field engineers worldwide, MSC has the skills and capacity to help you with your aerospace design challenges
              </p>
              <div class="space-y-4">
                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-white mb-1">Mission-Critical Reliability</h4>
                    <p class="text-blue-200 text-sm">Trusted partner to the aerospace industry since the 1960s</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-white mb-1">World-Class Accuracy</h4>
                    <p class="text-blue-200 text-sm">Best-in-class simulation for large, complex, dynamic systems</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-white mb-1">24/7 Expert Support</h4>
                    <p class="text-blue-200 text-sm">Global team of aerospace simulation experts at your service</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="relative">
              <div class="rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-400/30">
                <img src="https://www.hitechsoftsys.net/images/aerospace_simulation.jpg" alt="Advanced Aerospace Simulation" class="w-full h-auto" onerror="this.src='/src/assets/images/product_service/biman7.jpg'" />
              </div>
              <div class="absolute -bottom-6 -left-6 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-6 shadow-2xl max-w-xs">
                <div class="text-4xl font-bold text-white mb-1">60+</div>
                <div class="text-cyan-100 text-sm font-semibold">Years of Aerospace Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Benefits Section -->
    <div class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Hi-Tech SoftSys for Aerospace?
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Your complete partner for aerospace simulation and analysis
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-6 mb-12">
            <div class="text-center p-6">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Certified MSC Reseller</h3>
              <p class="text-gray-600">Official partner providing genuine software and support</p>
            </div>

            <div class="text-center p-6">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">FREE Training Included</h3>
              <p class="text-gray-600">Comprehensive training with every software license</p>
            </div>

            <div class="text-center p-6">
              <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">24/7 Technical Support</h3>
              <p class="text-gray-600">Round-the-clock assistance from aerospace experts</p>
            </div>
          </div>

          <!-- Value Banner -->
          <div class="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-8 shadow-2xl">
            <div class="flex flex-col md:flex-row items-center justify-between gap-6">
              <div class="flex-1 text-center md:text-left">
                <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  🎁 Special Aerospace Package
                </h3>
                <p class="text-lg text-gray-800">
                  Buy any MSC Software license and get FREE training + 24/7 support!
                  <span class="font-bold">Save $10,000+ annually</span>
                </p>
              </div>
              <a href="/contact_us" class="px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg whitespace-nowrap">
                Get Started Today
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="py-16 md:py-24 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Ready to Elevate Your Aerospace Engineering?
          </h2>
          <p class="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your aerospace simulation needs and discover how our solutions can accelerate your innovation
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              @click="openQuoteModal"
              class="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 hover:scale-105 shadow-xl inline-flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <span>Get FREE Quote</span>
            </button>
            
            <button
              @click="openDemoModal"
              class="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/20 transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              <span>Request FREE Demo</span>
            </button>
          </div>

          <!-- Contact Info -->
          <div class="mt-12 pt-12 border-t border-white/20">
            <p class="text-blue-200 mb-4">Or reach out directly:</p>
            <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="mailto:info@hitechsoftsys.com" class="flex items-center gap-2 text-white hover:text-cyan-300 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span>info@hitechsoftsys.com</span>
              </a>
              <a href="tel:+1234567890" class="flex items-center gap-2 text-white hover:text-cyan-300 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span>+1 (234) 567-890</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modals -->
    <RequestDemoModal
      v-model="showDemoModal"
      @submit="handleDemoSubmit"
    />
    <RequestQuoteModal
      v-model="showQuoteModal"
      @submit="handleQuoteSubmit"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RequestDemoModal from '@/components/shared/RequestDemoModal.vue'
import RequestQuoteModal from '@/components/shared/RequestQuoteModal.vue'

const showDemoModal = ref(false)
const showQuoteModal = ref(false)
const selectedProduct = ref(null)

const openDemoModal = () => {
  showDemoModal.value = true
}

const openQuoteModal = () => {
  showQuoteModal.value = true
}

const openProductModal = (product) => {
  selectedProduct.value = product
}

const closeProductModal = () => {
  selectedProduct.value = null
}

const handleDemoSubmit = (formData) => {
  console.log('Demo request submitted:', formData)
  // Here you would typically send this to your backend API
}

const handleQuoteSubmit = (formData) => {
  console.log('Quote request submitted:', formData)
  // Here you would typically send this to your backend API
}

// Engineering Segments Data
const segments = ref([
  {
    key: 'structure',
    title: 'Structural Analysis',
    short: 'FEA & Structural',
    iconGradient: 'bg-gradient-to-br from-blue-500 to-blue-700',
    iconPath: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
    definition: 'Advanced finite element analysis for aircraft structural integrity, stress distribution, and failure prediction.',
    description: 'Simulate complex loading scenarios including static loads, thermal stresses, vibration, fatigue, and composite material behavior for fuselage, wings, and critical components.',
    business: 'Reduce physical testing costs by 60%, accelerate certification timelines by 40%, and optimize weight-to-strength ratios for improved fuel efficiency.',
    products: [
      {
        name: 'MSCOne',
        category: 'Unified CAE Platform',
        usage: 'Complete structural analysis suite with flexible token-based access',
        description: 'MSCOne provides aerospace engineers with unlimited access to the entire MSC portfolio including Nastran, Marc, Patran, and Apex through a flexible token-based licensing system. Perfect for multi-disciplinary aerospace teams working on aircraft certification and structural optimization.',
        features: [
          'Access to complete MSC structural analysis portfolio',
          'Flexible token-based licensing for peak workload management',
          'Seamless workflow between preprocessing, solving, and postprocessing',
          'Integration with CAD systems (CATIA, NX, SolidWorks)',
          'Advanced nonlinear and linear FEA capabilities',
          'Cloud-ready for distributed engineering teams'
        ],
        benefits: 'Maximize ROI with flexible access to all structural analysis tools. Reduce software costs by 35% while improving engineering productivity across airframe design, landing gear analysis, and composite structures.'
      },
      {
        name: 'MSC Nastran',
        category: 'Multidisciplinary Structural Analysis',
        usage: 'Industry-standard FEA solver for linear and nonlinear structural analysis, aeroelasticity, and optimization',
        description: 'The gold standard for aerospace structural analysis since the 1960s. MSC Nastran provides unmatched accuracy and reliability for aircraft certification, flutter analysis, and complex loading scenarios.',
        features: [
          'Linear and nonlinear static and dynamic analysis',
          'Aeroelastic flutter and divergence analysis',
          'Advanced composite material modeling',
          'Optimization for weight reduction',
          'Fatigue and crack growth prediction',
          'SOL 200 optimization capabilities'
        ],
        benefits: 'Trusted by every major aerospace OEM for aircraft certification. Reduce certification time by 40% with industry-accepted analysis methods. Achieve 25% weight reduction through topology optimization.'
      },
      {
        name: 'MSC Patran',
        category: 'Pre/Post Processing',
        usage: 'Complete pre and post-processing environment for FEA model creation and results visualization',
        description: 'Industry-leading pre and post-processor that streamlines the creation of complex aircraft FEA models and provides powerful results visualization for certification documentation.',
        features: [
          'Advanced meshing for complex aerospace geometries',
          'Direct CAD integration with associativity',
          'Powerful results visualization and animation',
          'Automated report generation for certification',
          'Multi-solver support (Nastran, Marc, Abaqus)',
          'Scripting and automation capabilities (PCL)'
        ],
        benefits: 'Reduce modeling time by 50% with automated meshing. Generate certification-ready reports automatically. Manage large aircraft assemblies with ease.'
      },
      {
        name: 'MSC Marc',
        category: 'Nonlinear FEA',
        usage: 'Advanced nonlinear simulation for manufacturing processes and complex material behavior',
        description: 'Premier nonlinear FEA solver for simulating manufacturing processes, material forming, and large deformation analysis of aerospace components.',
        features: [
          'Advanced material models (elastomers, plastics, composites)',
          'Large deformation and contact analysis',
          'Manufacturing process simulation',
          'Heat treatment and residual stress prediction',
          'Coupled thermal-structural analysis',
          'Fracture mechanics and failure analysis'
        ],
        benefits: 'Optimize manufacturing processes to reduce scrap by 40%. Predict residual stresses before final machining. Simulate complex assembly sequences.'
      }
    ]
  },
  {
    key: 'dynamics',
    title: 'System Dynamics & Kinematics',
    short: 'MBD & Kinematics',
    iconGradient: 'bg-gradient-to-br from-indigo-500 to-indigo-700',
    iconPath: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    definition: 'Multi-body dynamics simulation for landing gear, flight control systems, and mechanical assemblies.',
    description: 'Analyze kinematic motion, dynamic forces, and control system integration for landing gear deployment, wing flap actuation, and hydraulic systems.',
    business: 'Virtual testing reduces physical prototype requirements by 70%. Optimize system performance before hardware investment. Accelerate qualification testing.',
    products: [
      {
        name: 'MSCOne',
        category: 'Unified CAE Platform',
        usage: 'Complete multibody dynamics and system simulation suite',
        description: 'Access the full range of MSC Adams and Easy5 capabilities through flexible token licensing. Ideal for aerospace teams working on landing gear dynamics, flight controls, and integrated vehicle simulation.',
        features: [
          'Complete Adams MBD and Easy5 system simulation access',
          'Flexible licensing for concurrent multiphysics projects',
          'Integration between MBD and structural FEA',
          'Automated co-simulation workflows',
          'Cloud-based collaboration tools',
          'Real-time model optimization'
        ],
        benefits: 'Seamlessly combine rigid body dynamics, flexible body analysis, and system controls. Reduce landing gear development time by 50%. Optimize control algorithms virtually.'
      },
      {
        name: 'MSC Adams',
        category: 'Multibody Dynamics',
        usage: 'Industry-leading MBD software for mechanism simulation and optimization',
        description: 'Simulate and analyze the kinematic and dynamic behavior of landing gear, control surfaces, and mechanical systems. Predict forces, moments, and wear throughout the operational envelope.',
        features: [
          'Rigid and flexible body dynamics',
          'Advanced contact and friction modeling',
          'Control system integration',
          'Hydraulic and pneumatic system modeling',
          'Optimization for mechanism design',
          'Co-simulation with FEA and CFD'
        ],
        benefits: 'Reduce landing gear testing by 60%. Optimize deployment sequences virtually. Predict component wear and maintenance intervals. Integrate with flight simulation systems.'
      },
      {
        name: 'Easy5',
        category: 'System Simulation',
        usage: '1D system-level modeling for aircraft systems including hydraulic, pneumatic, and electrical systems',
        description: 'Model and simulate aircraft systems including environmental control, hydraulics, fuel systems, and electrical power distribution. Predict system performance and optimize control strategies.',
        features: [
          'Pre-built aerospace system libraries',
          'Hydraulic and pneumatic component modeling',
          'Electrical system simulation',
          'Thermal management system analysis',
          'Control system design and validation',
          'Hardware-in-the-loop (HIL) integration'
        ],
        benefits: 'Validate aircraft systems before hardware builds. Reduce system integration issues by 55%. Optimize fuel system performance. Accelerate flight test preparation.'
      }
    ]
  },
  {
    key: 'acoustics',
    title: 'Acoustics & NVH',
    short: 'Noise & Vibration',
    iconGradient: 'bg-gradient-to-br from-cyan-500 to-cyan-700',
    iconPath: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
    definition: 'Comprehensive noise, vibration, and harshness analysis for passenger comfort and regulatory compliance.',
    description: 'Predict cabin noise levels, engine noise transmission, aero-acoustic effects, and vibration modes. Meet stringent FAA/EASA noise certification requirements.',
    business: 'Meet noise regulations before first flight. Reduce passenger cabin noise by 8dB. Optimize acoustic treatments for weight and cost savings.',
    products: [
      {
        name: 'MSCOne',
        category: 'Unified CAE Platform',
        usage: 'Complete NVH and acoustics analysis with integrated structural dynamics',
        description: 'Full access to Actran acoustic simulation combined with Nastran structural dynamics through flexible token licensing. Perfect for aircraft cabin noise prediction and certification.',
        features: [
          'Complete Actran + Nastran portfolio access',
          'Vibro-acoustic coupled analysis',
          'Aero-acoustic simulation capabilities',
          'Flexible licensing for peak NVH projects',
          'Integration with structural and CFD solvers',
          'Automated optimization workflows'
        ],
        benefits: 'Solve complex NVH challenges with integrated acoustic and structural tools. Reduce cabin noise certification time by 45%. Optimize acoustic treatments cost-effectively.'
      },
      {
        name: 'Actran',
        category: 'Acoustic Simulation',
        usage: 'Advanced acoustic FEA for interior/exterior noise, vibro-acoustics, and aero-acoustics',
        description: 'Industry-leading acoustic simulation for aircraft cabin noise, engine noise propagation, and exterior noise footprint prediction. Meet Chapter 14 noise regulations.',
        features: [
          'Interior cabin noise prediction',
          'Engine and propeller noise analysis',
          'Landing gear noise simulation',
          'Aero-acoustic modeling (trailing edge, cavity)',
          'Vibro-acoustic coupling with Nastran',
          'Noise certification analysis (ICAO Chapter 14)'
        ],
        benefits: 'Predict cabin noise before first flight. Meet noise regulations first time. Optimize acoustic treatment placement. Reduce ground noise testing by 60%.'
      },
      {
        name: 'MSC Nastran',
        category: 'Structural Dynamics',
        usage: 'Normal modes, frequency response, and vibration analysis for NVH',
        description: 'Predict structural vibration modes, frequency response, and dynamic loads that drive cabin noise. Critical foundation for vibro-acoustic analysis.',
        features: [
          'Modal analysis for vibration modes',
          'Frequency response analysis',
          'Random vibration analysis',
          'Transient dynamics',
          'Rotor dynamics for engines',
          'Vibro-acoustic coupling with Actran'
        ],
        benefits: 'Identify vibration hotspots before testing. Optimize structure for low noise transmission. Reduce vibration-related fatigue failures.'
      }
    ]
  },
  {
    key: 'fluids',
    title: 'Fluids & FSI',
    short: 'CFD & FSI',
    iconGradient: 'bg-gradient-to-br from-green-500 to-green-700',
    iconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
    definition: 'Fluid-structure interaction and thermal analysis for aero-thermal loading, engine cooling, and bird strike.',
    description: 'Couple aerodynamic loads with structural response for bird strike certification, ditching analysis, and thermal effects on structures.',
    business: 'Achieve bird strike certification virtually. Predict thermal stresses before test. Reduce coupled physics testing costs by 65%.',
    products: [
      {
        name: 'MSCOne',
        category: 'Unified CAE Platform',
        usage: 'Complete FSI and thermal analysis with integrated structural solvers',
        description: 'Access Dytran explicit dynamics, coupled thermal-structural analysis, and complete structural solver portfolio through unified token licensing.',
        features: [
          'Dytran explicit FSI capabilities',
          'Nastran/Marc thermal-structural coupling',
          'Flexible token management for FSI projects',
          'Integration with external CFD solvers',
          'Automated co-simulation workflows',
          'Cloud-based collaborative analysis'
        ],
        benefits: 'Tackle complex FSI problems with integrated tools. Reduce bird strike testing requirements. Optimize thermal protection systems efficiently.'
      },
      {
        name: 'MSC Dytran',
        category: 'Explicit FSI',
        usage: 'Fluid-structure interaction for bird strike, ditching, and extreme impact events',
        description: 'Explicit nonlinear solver with integrated Eulerian CFD for bird strike certification, ditching analysis, and extreme loading scenarios.',
        features: [
          'Coupled Eulerian-Lagrangian FSI',
          'Bird strike certification analysis',
          'Ditching and water impact simulation',
          'Fuel sloshing dynamics',
          'Ice impact and foreign object damage',
          'Integration with Nastran for implicit analysis'
        ],
        benefits: 'Achieve bird strike certification without expensive testing. Predict ditching performance virtually. Reduce physical testing by 80% for impact scenarios.'
      },
      {
        name: 'MSC Nastran',
        category: 'Thermal-Structural',
        usage: 'Coupled thermal-structural analysis for aero-heating and thermal stress',
        description: 'Analyze thermal loads from aerodynamic heating, engine exhaust, and solar radiation combined with structural response and thermal stress prediction.',
        features: [
          'Steady-state and transient thermal analysis',
          'Thermal-structural coupling',
          'Radiation and convection modeling',
          'Temperature-dependent material properties',
          'Thermal stress and distortion analysis',
          'Integration with CFD thermal loads'
        ],
        benefits: 'Predict thermal stresses in high-speed flight. Optimize thermal protection systems. Reduce thermal testing requirements by 50%.'
      }
    ]
  },
  {
    key: 'autonomous',
    title: 'Autonomous & ADAS Systems',
    short: 'UAV & Autonomous',
    iconGradient: 'bg-gradient-to-br from-purple-500 to-purple-700',
    iconPath: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    definition: 'Virtual development and validation of autonomous flight systems, UAVs, and eVTOL vehicles.',
    description: 'End-to-end simulation of autonomous aircraft including flight dynamics, sensor systems, control algorithms, and structural integrity of next-gen aviation.',
    business: 'Accelerate eVTOL certification by 18 months. Reduce physical prototype testing by 60%. Validate autonomous systems before flight tests.',
    products: [
      {
        name: 'MSCOne',
        category: 'Unified CAE Platform',
        usage: 'Complete autonomous system development and validation toolkit',
        description: 'Unified platform combining Adams vehicle dynamics, Easy5 control systems, and structural FEA for comprehensive eVTOL and UAV development.',
        features: [
          'Complete toolkit for autonomous aircraft development',
          'Integrated multi-physics simulation',
          'Flexible licensing for innovation teams',
          'Real-time co-simulation capabilities',
          'Hardware-in-the-loop integration',
          'Cloud-based collaboration for distributed teams'
        ],
        benefits: 'Reduce physical prototype testing by 60%. Accelerate eVTOL certification timelines. Validate autonomous flight controls virtually before hardware builds.'
      },
      {
        name: 'MSC Adams',
        category: 'Vehicle Dynamics',
        usage: 'Flight dynamics, rotor dynamics, and mechanical system simulation for UAVs and eVTOL',
        description: 'Model complete aircraft dynamics including rotorcraft, tilt-rotor, and fixed-wing configurations. Integrate with flight control systems for autonomous operation validation.',
        features: [
          'Rotorcraft and multi-rotor dynamics',
          'Tilt-rotor and hybrid propulsion modeling',
          'Landing gear and ground handling',
          'Control surface actuation',
          'Flexible airframe coupling',
          'Real-time simulation for HIL testing'
        ],
        benefits: 'Validate flight envelope before first flight. Optimize rotor blade design for efficiency. Reduce flight test hours by 50%. Accelerate control law development.'
      },
      {
        name: 'Easy5',
        category: 'Control Systems',
        usage: 'Flight control system design, electric propulsion simulation, and battery management',
        description: 'Design and validate autonomous flight controllers, electric propulsion systems, and energy management for next-generation aircraft.',
        features: [
          'Flight control system modeling',
          'Electric motor and inverter simulation',
          'Battery management system (BMS) modeling',
          'Thermal management for batteries and motors',
          'Fault detection and redundancy analysis',
          'Model-based system engineering (MBSE) integration'
        ],
        benefits: 'Optimize battery usage for maximum range. Validate redundant control systems. Reduce control system integration time by 40%. Enable model-based certification.'
      },
      {
        name: 'MSC Nastran',
        category: 'Structural Analysis',
        usage: 'Lightweight structure optimization and aeroelastic analysis for eVTOL and UAVs',
        description: 'Optimize airframe structures for minimum weight while meeting strength and stiffness requirements. Critical for electric aircraft range optimization.',
        features: [
          'Topology optimization for weight reduction',
          'Composite material design and analysis',
          'Aeroelastic flutter analysis',
          'Fatigue and durability prediction',
          'Battery housing structural integrity',
          'Crash energy absorption design'
        ],
        benefits: 'Achieve 30% weight reduction through optimization. Extend aircraft range by 25%. Ensure structural safety with virtual testing. Reduce development costs by 45%.'
      }
    ]
  },
  {
    key: 'vmc',
    title: 'Virtual Manufacturing & Composites',
    short: 'Manufacturing & Composites',
    iconGradient: 'bg-gradient-to-br from-orange-500 to-orange-700',
    iconPath: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    definition: 'Manufacturing process simulation and composites analysis for autoclave curing, forming, and assembly.',
    description: 'Simulate composite layup, curing processes, residual stress prediction, and automated fiber placement. Optimize manufacturing sequences for large assemblies.',
    business: 'Reduce composite part scrap rates by 50%. Predict and eliminate manufacturing defects. Accelerate time-to-market by 8 months.',
    products: [
      {
        name: 'MSCOne',
        category: 'Unified CAE Platform',
        usage: 'Complete manufacturing simulation and composites analysis portfolio',
        description: 'Integrated access to Marc, Digimat, and structural analysis tools for end-to-end manufacturing process simulation from material behavior to final assembly.',
        features: [
          'Complete Marc + Digimat portfolio',
          'Integrated composites workflow',
          'Flexible licensing for manufacturing teams',
          'Material characterization to part analysis',
          'Automated process optimization',
          'Quality prediction and defect analysis'
        ],
        benefits: 'Reduce scrap rates by 50% through process optimization. Accelerate time-to-market by 8 months. Eliminate trial-and-error in composite manufacturing.'
      },
      {
        name: 'MSC Marc',
        category: 'Process Simulation',
        usage: 'Manufacturing process simulation including forming, curing, welding, and assembly',
        description: 'Simulate composite curing cycles, metal forming, welding distortion, and residual stress prediction. Optimize manufacturing processes before production.',
        features: [
          'Composite curing and consolidation',
          'Autoclave process simulation',
          'Residual stress and spring-back prediction',
          'Welding and joining simulation',
          'Assembly sequence optimization',
          'Additive manufacturing (metal 3D printing)'
        ],
        benefits: 'Predict and eliminate manufacturing defects. Reduce autoclave time and energy costs. Optimize cure cycles for quality and speed. Minimize assembly distortion.'
      },
      {
        name: 'Digimat',
        category: 'Material Modeling',
        usage: 'Multi-scale material modeling for composites and advanced materials',
        description: 'Link material microstructure to part performance. Model fiber reinforced plastics, woven composites, and injection molded parts with accuracy.',
        features: [
          'Multi-scale material modeling',
          'Injection molding simulation',
          'Fiber orientation prediction',
          'Material property prediction',
          'Progressive damage and failure',
          'Integration with Nastran and Marc'
        ],
        benefits: 'Accurately predict composite part performance. Optimize fiber orientations for strength. Reduce material characterization testing by 70%. Improve first-time-right designs.'
      },
      {
        name: 'MSC Nastran',
        category: 'Composite Analysis',
        usage: 'Structural analysis of composite laminates with progressive damage',
        description: 'Advanced composite material modeling including progressive damage, delamination, and failure prediction for aerospace composite structures.',
        features: [
          'Laminated composite analysis',
          'Progressive damage modeling',
          'Delamination and matrix cracking',
          'Bolted joint analysis',
          'Post-buckling of composites',
          'Certification analysis (building block approach)'
        ],
        benefits: 'Certify composite structures with confidence. Predict failure modes accurately. Optimize ply layups for weight and strength. Reduce physical testing pyramid.'
      }
    ]
  }
])
</script>

<style scoped>
/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.3s ease;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.9);
}
</style>