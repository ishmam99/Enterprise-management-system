<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 text-white overflow-hidden">
      <div class="absolute inset-0">
        <img src="/src/assets/images/TransportationMobility.png" alt="Automotive" class="w-full h-full object-cover opacity-30" />
        <div class="absolute inset-0 bg-gradient-to-r from-red-900/90 via-orange-900/80 to-transparent"></div>
      </div>
      
      <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div class="max-w-3xl">
          <!-- Breadcrumb -->
          <nav class="flex items-center gap-2 text-sm text-orange-200 mb-6">
            <a href="/" class="hover:text-white transition-colors">Home</a>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
            <a href="/industries" class="hover:text-white transition-colors">Industries</a>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-white">Automotive</span>
          </nav>

          <!-- Badge -->
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
            <svg class="w-5 h-5 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
            </svg>
            <span class="text-orange-200 font-semibold">Industry Solutions</span>
          </div>

          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            Automotive Engineering
            <span class="block mt-2 bg-gradient-to-r from-orange-300 to-yellow-400 bg-clip-text text-transparent">
              Solutions
            </span>
          </h1>

          <p class="text-xl text-gray-200 leading-relaxed mb-8">
            Advanced simulation tools for vehicle design, crash safety, NVH analysis, and performance optimization. Accelerate innovation from concept to production.
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <a href="/contact_us" class="px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors inline-flex items-center justify-center gap-2 shadow-xl">
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

    <!-- About Section -->
    <div class="py-16 md:py-24 bg-gradient-to-br from-slate-900 to-gray-800 text-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-block bg-orange-500/20 backdrop-blur-sm border border-orange-400/30 rounded-full px-5 py-2 mb-6">
            <span class="text-orange-300 font-semibold">Industry Leader in Automotive CAE</span>
          </div>
          <h2 class="text-3xl md:text-4xl font-bold mb-6">
            MSC Software: Recognized Leader in Automotive CAE
          </h2>
          <p class="text-xl text-gray-300 leading-relaxed mb-8">
            Hi-Tech SoftSys, Inc. is a global provider of software service and works as a software reseller globally. We provide elite Engineering Design & Analysis resources, processes & technology solutions. Through strategic client partnerships we provide <span class="text-orange-400 font-semibold">24/7 on-demand availability</span>, with real-world industry expertise, at domestic & global rates.
          </p>
          <p class="text-lg text-gray-400 leading-relaxed">
            MSC Software provides <span class="text-white font-semibold">best-in-class modeling and optimization tools</span>, offering all required solutions ranging from analyzing component performance to system level design.
          </p>
        </div>
      </div>
    </div>

    <!-- Industry Challenges Section -->
    <div class="py-16 md:py-24 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Automotive Industry Challenges
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Meeting the evolving demands of modern vehicle development
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-red-500">
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Crash Safety Standards</h3>
              <p class="text-gray-600">Meeting stringent safety regulations and achieving high crash test ratings</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-orange-500">
              <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">NVH Performance</h3>
              <p class="text-gray-600">Reducing noise, vibration, and harshness for superior ride comfort</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-green-500">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Electrification</h3>
              <p class="text-gray-600">Transitioning to electric and hybrid powertrains efficiently</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-blue-500">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Weight Reduction</h3>
              <p class="text-gray-600">Lightweighting to improve fuel efficiency and performance</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-purple-500">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Development Speed</h3>
              <p class="text-gray-600">Accelerating time-to-market in a competitive landscape</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-cyan-500">
              <div class="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Durability Testing</h3>
              <p class="text-gray-600">Ensuring long-term reliability and component life</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Simulation Showcase Section -->
    <div class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Advanced Automotive Simulation
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              See how MSC Software enables cutting-edge automotive engineering
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-6">
            <div class="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <img src="https://www.hitechsoftsys.net/images/automotive_crash.jpg" alt="Vehicle Crash Simulation" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='/src/assets/images/product_service/biman.jpg'" />
              <div class="absolute inset-0 bg-gradient-to-t from-red-900/80 via-red-900/20 to-transparent flex items-end p-5">
                <div class="text-white">
                  <h3 class="text-lg font-bold mb-1">Crash Analysis</h3>
                  <p class="text-xs text-gray-200">Impact & safety simulation</p>
                </div>
              </div>
            </div>

            <div class="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <img src="https://www.hitechsoftsys.net/images/automotive_nvh.jpg" alt="NVH Analysis" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='/src/assets/images/product_service/biman2.jpg'" />
              <div class="absolute inset-0 bg-gradient-to-t from-orange-900/80 via-orange-900/20 to-transparent flex items-end p-5">
                <div class="text-white">
                  <h3 class="text-lg font-bold mb-1">NVH Simulation</h3>
                  <p class="text-xs text-gray-200">Noise & vibration analysis</p>
                </div>
              </div>
            </div>

            <div class="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <img src="https://www.hitechsoftsys.net/images/automotive_body.jpg" alt="Structural Analysis" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='/src/assets/images/product_service/biman3.jpg'" />
              <div class="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent flex items-end p-5">
                <div class="text-white">
                  <h3 class="text-lg font-bold mb-1">Body Structure</h3>
                  <p class="text-xs text-gray-200">Chassis & body analysis</p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8 text-center">
            <p class="text-gray-600">
              <span class="font-semibold text-red-600">Trusted by global automotive manufacturers</span> - MSC Software is the recognized leader in automotive CAE
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- MSC Software Solutions Section -->
    <div id="solutions" class="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-red-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              MSC Software Solutions for Automotive
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive simulation and analysis tools for vehicle development
            </p>
          </div>

          <div class="space-y-8">
            <!-- MSC Nastran -->
            <div class="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow">
              <div class="flex flex-col md:flex-row gap-6 items-start">
                <div class="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-gray-900 mb-3">MSC Nastran</h3>
                  <p class="text-gray-600 mb-4">
                    Industry-leading FEA for structural analysis, crash simulation, and durability. Analyze body structures, chassis, suspension, and powertrains with confidence.
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">Structural Analysis</span>
                    <span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">Fatigue Life</span>
                    <span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">Optimization</span>
                    <span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">Modal Analysis</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- MSC Dytran -->
            <div class="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow">
              <div class="flex flex-col md:flex-row gap-6 items-start">
                <div class="w-16 h-16 bg-gradient-to-br from-orange-600 to-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-gray-900 mb-3">MSC Dytran</h3>
                  <p class="text-gray-600 mb-4">
                    Explicit nonlinear dynamics for crash testing, occupant safety, and impact scenarios. Meet NCAP and regulatory requirements with accurate simulations.
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">Crash Testing</span>
                    <span class="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">Occupant Safety</span>
                    <span class="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">Impact Analysis</span>
                    <span class="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">Airbag Deployment</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- MSC Actran -->
            <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow">
              <div class="flex flex-col md:flex-row gap-6 items-start">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-gray-900 mb-3">MSC Actran</h3>
                  <p class="text-gray-600 mb-4">
                    Advanced acoustics simulation for NVH analysis. Design quieter cabins, optimize exhaust systems, and meet stringent noise regulations.
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">Cabin Acoustics</span>
                    <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">Engine Noise</span>
                    <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">Road Noise</span>
                    <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">Wind Noise</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- MSC Marc -->
            <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow">
              <div class="flex flex-col md:flex-row gap-6 items-start">
                <div class="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-gray-900 mb-3">MSC Marc</h3>
                  <p class="text-gray-600 mb-4">
                    Nonlinear FEA for manufacturing processes, rubber components, and complex material behavior. Simulate gaskets, seals, tires, and forming operations.
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">Rubber Analysis</span>
                    <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">Tire Simulation</span>
                    <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">Forming</span>
                    <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">Contact Analysis</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- MSC Apex -->
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow">
              <div class="flex flex-col md:flex-row gap-6 items-start">
                <div class="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-gray-900 mb-3">MSC Apex</h3>
                  <p class="text-gray-600 mb-4">
                    Next-generation CAE platform for rapid concept evaluation and design optimization. Accelerate early-stage vehicle development with generative design.
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Generative Design</span>
                    <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Topology Optimization</span>
                    <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Rapid Meshing</span>
                    <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Multi-body Dynamics</span>
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
              MSC Software provides comprehensive tools ranging from component performance to system-level design
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Structural Performance</h3>
                  <p class="text-sm text-gray-600">Components and assemblies analysis</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Suspension Systems</h3>
                  <p class="text-sm text-gray-600">Kinematics and dynamics</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Elastomeric Components</h3>
                  <p class="text-sm text-gray-600">Seals and mounts simulation</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Composites Modeling</h3>
                  <p class="text-sm text-gray-600">Failure analysis & optimization</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Tire Analysis</h3>
                  <p class="text-sm text-gray-600">Performance & hydroplaning</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Weight Optimization</h3>
                  <p class="text-sm text-gray-600">Lightweight design solutions</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Nonlinear Analysis</h3>
                  <p class="text-sm text-gray-600">Complex material behavior</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Manufacturing Process</h3>
                  <p class="text-sm text-gray-600">Production simulation</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Defroster Studies</h3>
                  <p class="text-sm text-gray-600">HVAC system optimization</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Fuel-Tank Sloshing</h3>
                  <p class="text-sm text-gray-600">Fluid dynamics analysis</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Control Systems</h3>
                  <p class="text-sm text-gray-600">Vehicle control optimization</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Materials Management</h3>
                  <p class="text-sm text-gray-600">Advanced material selection</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Mechatronics</h3>
                  <p class="text-sm text-gray-600">Integrated system simulation</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Multidiscipline Analysis</h3>
                  <p class="text-sm text-gray-600">Multi-physics integration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Types of Analysis Section -->
    <div class="py-16 md:py-24 bg-gradient-to-br from-red-900 to-orange-900 text-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">
              Types of Analysis Done Using MSC Software
            </h2>
            <p class="text-xl text-orange-200 max-w-3xl mx-auto">
              As a proud partner of MSC Software, Hi-Tech SoftSys provides all essential licensing for comprehensive automotive analysis
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <div class="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Thermal & CFD Analysis</h3>
              <p class="text-orange-200">Computational Fluid Dynamics for cooling and airflow</p>
            </div>

            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <div class="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Multi-Body Dynamics</h3>
              <p class="text-orange-200">MBD analysis for vehicle dynamics and kinematics</p>
            </div>

            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <div class="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Structural, Fatigue & Durability</h3>
              <p class="text-orange-200">Comprehensive structural integrity and life analysis</p>
            </div>

            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">ICME Analysis</h3>
              <p class="text-orange-200">Integrated Computational Materials Engineering</p>
            </div>

            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Acoustics Analysis</h3>
              <p class="text-orange-200">NVH and sound quality simulation</p>
            </div>

            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Virtual Manufacturing & Costing</h3>
              <p class="text-orange-200">VM&C analysis for production planning</p>
            </div>
          </div>

          <!-- Analysis Images Section -->
          <div class="mt-16">
            <div class="text-center mb-8">
              <h3 class="text-2xl md:text-3xl font-bold text-white mb-4">
                Analysis Simulation Gallery
              </h3>
              <p class="text-lg text-orange-200 max-w-2xl mx-auto">
                Visual examples of MSC Software analysis capabilities in automotive engineering
              </p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all">
                <img src="/images/industries/automotive/Automotive_1.png" alt="Automotive CFD Analysis" class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='/src/assets/images/Automotive.png'" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                  <!-- <div class="text-white">
                    <h4 class="text-sm font-bold mb-1">Thermal & CFD Analysis</h4>
                    <p class="text-xs text-gray-200">Cooling & airflow simulation</p>
                  </div> -->
                </div>
              </div>

              <div class="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all">
                <img src="/images/industries/automotive/Automotive_2.png" alt="Automotive MBD Analysis" class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='/src/assets/images/product_service/biman.jpg'" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                  <!-- <div class="text-white">
                    <h4 class="text-sm font-bold mb-1">Multi-Body Dynamics</h4>
                    <p class="text-xs text-gray-200">Vehicle dynamics & kinematics</p>
                  </div> -->
                </div>
              </div>

              <div class="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all">
                <img src="/images/industries/automotive/Automotive_3.png" alt="Automotive Structural Analysis" class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='/src/assets/images/product_service/biman3.jpg'" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                  <!-- <div class="text-white">
                    <h4 class="text-sm font-bold mb-1">Structural Analysis</h4>
                    <p class="text-xs text-gray-200">Structural integrity & life analysis</p>
                  </div> -->
                </div>
              </div>

              <div class="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all">
                <img src="/images/industries/automotive/Automotive_4.png" alt="Automotive ICME Analysis" class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='/src/assets/images/Automotive.png'" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                  <!-- <div class="text-white">
                    <h4 class="text-sm font-bold mb-1">ICME Analysis</h4>
                    <p class="text-xs text-gray-200">Materials engineering</p>
                  </div> -->
                </div>
              </div>

              <!-- <div class="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all">
                <img src="https://www.hitechsoftsys.net/images/automotive_acoustics_analysis.jpg" alt="Automotive Acoustics Analysis" class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='/src/assets/images/product_service/biman.jpg'" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                  <div class="text-white">
                    <h4 class="text-sm font-bold mb-1">Acoustics Analysis</h4>
                    <p class="text-xs text-gray-200">NVH & sound quality simulation</p>
                  </div>
                </div>
              </div>

              <div class="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all">
                <img src="https://www.hitechsoftsys.net/images/automotive_manufacturing_analysis.jpg" alt="Automotive Manufacturing Analysis" class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='/src/assets/images/product_service/biman3.jpg'" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                  <div class="text-white">
                    <h4 class="text-sm font-bold mb-1">Virtual Manufacturing</h4>
                    <p class="text-xs text-gray-200">Production planning</p>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Automotive Business Segments Section -->
    <div class="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-slate-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Automotive Business Segments
            </h2>
            <p class="text-lg text-gray-600">
              Specialized solutions for emerging automotive technologies
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="font-bold text-gray-900 mb-2">ePowertrain Engineering</h3>
              <p class="text-sm text-gray-600">Electric motor and powertrain design</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                </svg>
              </div>
              <h3 class="font-bold text-gray-900 mb-2">EV Battery Manufacturing</h3>
              <p class="text-sm text-gray-600">Battery pack production simulation</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-purple-500">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
              </div>
              <h3 class="font-bold text-gray-900 mb-2">System Dynamics for eMobility</h3>
              <p class="text-sm text-gray-600">EV system integration</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-cyan-500">
              <div class="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Driver Assist Systems</h3>
              <p class="text-sm text-gray-600">ADAS development & testing</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-orange-500">
              <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                </svg>
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Vehicle to Vehicle Interactions</h3>
              <p class="text-sm text-gray-600">V2V communication simulation</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-indigo-500">
              <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Traffic Simulation</h3>
              <p class="text-sm text-gray-600">Traffic flow and behavior analysis</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-pink-500">
              <div class="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                </svg>
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Autonomous Vehicles</h3>
              <p class="text-sm text-gray-600">Self-driving technology simulation</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-red-500">
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Motorsports</h3>
              <p class="text-sm text-gray-600">Racing performance optimization</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Applications Section -->
    <div class="py-16 md:py-24 bg-gradient-to-br from-red-50 to-orange-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Key Applications
            </h2>
            <p class="text-lg text-gray-600">
              How our solutions drive automotive innovation
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-white rounded-xl p-6 shadow-lg">
              <h3 class="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                Crash & Safety
              </h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Frontal, side, and rear impact analysis</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Occupant safety and restraint systems</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Pedestrian protection</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>NCAP rating optimization</span>
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
                Body & Chassis
              </h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Body-in-white stiffness and strength</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Suspension kinematics and compliance</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Component durability and fatigue</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Weight optimization</span>
                </li>
              </ul>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg">
              <h3 class="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                NVH Analysis
              </h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Interior and exterior noise</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Powertrain and exhaust acoustics</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Vibration isolation and damping</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Road and wind noise</span>
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
                Electric Vehicles
              </h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Battery pack structural design</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>E-motor and gearbox analysis</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Thermal management systems</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Charging connector durability</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MSC Products Section -->
    <div class="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-gray-100">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              MSC Products Used in Automotive Industry
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Complete suite of automotive-specific MSC Software solutions
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-8">
            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div class="flex items-start gap-4 mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">MSC Apex</h3>
                  <p class="text-sm text-gray-600 mb-3">Modeler & Structures - Next-gen CAE platform</p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-2 py-1 bg-red-50 text-red-700 rounded text-xs font-medium">Rapid Modeling</span>
                    <span class="px-2 py-1 bg-red-50 text-red-700 rounded text-xs font-medium">Meshing</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div class="flex items-start gap-4 mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Integrated Solutions</h3>
                  <p class="text-sm text-gray-600 mb-3">Complete multiphysics suite</p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-2 py-1 bg-orange-50 text-orange-700 rounded text-xs font-medium">Adams</span>
                    <span class="px-2 py-1 bg-orange-50 text-orange-700 rounded text-xs font-medium">Actran</span>
                    <span class="px-2 py-1 bg-orange-50 text-orange-700 rounded text-xs font-medium">Digimat</span>
                    <span class="px-2 py-1 bg-orange-50 text-orange-700 rounded text-xs font-medium">Marc</span>
                    <span class="px-2 py-1 bg-orange-50 text-orange-700 rounded text-xs font-medium">Simufact</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div class="flex items-start gap-4 mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Solver Solutions</h3>
                  <p class="text-sm text-gray-600 mb-3">Industry-standard solvers</p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">MSC Nastran</span>
                    <span class="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">Dytran</span>
                    <span class="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">MSC Fatigue</span>
                    <span class="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">Sinda</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div class="flex items-start gap-4 mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Modeling Solutions</h3>
                  <p class="text-sm text-gray-600 mb-3">Pre and post-processing</p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-medium">Patran</span>
                    <span class="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-medium">SimXpert</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div class="flex items-start gap-4 mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Mid-sized Business Solutions</h3>
                  <p class="text-sm text-gray-600 mb-3">Accessible CAE solutions</p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium">MSC Nastran Desktop</span>
                    <span class="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium">SimDesigner</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div class="flex items-start gap-4 mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Data Management</h3>
                  <p class="text-sm text-gray-600 mb-3">Process & data management</p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-medium">SimManager</span>
                    <span class="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-medium">MaterialCenter</span>
                  </div>
                </div>
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
              Why Choose Hi-Tech SoftSys for Automotive?
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Your trusted partner for automotive simulation excellence
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-6 mb-12">
            <div class="text-center p-6">
              <div class="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Industry Experts</h3>
              <p class="text-gray-600">Automotive-focused engineers with deep CAE expertise</p>
            </div>

            <div class="text-center p-6">
              <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">FREE Training</h3>
              <p class="text-gray-600">Comprehensive automotive-specific training included</p>
            </div>

            <div class="text-center p-6">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p class="text-gray-600">Round-the-clock technical assistance</p>
            </div>
          </div>

          <!-- Value Banner -->
          <div class="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-8 shadow-2xl">
            <div class="flex flex-col md:flex-row items-center justify-between gap-6">
              <div class="flex-1 text-center md:text-left">
                <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  🎁 Special Automotive Package
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
    <div class="py-16 md:py-24 bg-gradient-to-br from-red-900 to-orange-900 text-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Ready to Accelerate Your Automotive Innovation?
          </h2>
          <p class="text-xl text-orange-200 mb-8 max-w-2xl mx-auto">
            Contact us to learn how our MSC Software solutions can transform your vehicle development process
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
            <p class="text-orange-200 mb-4">Or reach out directly:</p>
            <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="mailto:info@hitechsoftsys.com" class="flex items-center gap-2 text-white hover:text-orange-300 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span>info@hitechsoftsys.com</span>
              </a>
              <a href="tel:+1234567890" class="flex items-center gap-2 text-white hover:text-orange-300 transition-colors">
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

const openDemoModal = () => {
  showDemoModal.value = true
}

const openQuoteModal = () => {
  showQuoteModal.value = true
}

const handleDemoSubmit = (formData) => {
  console.log('Demo request submitted:', formData)
}

const handleQuoteSubmit = (formData) => {
  console.log('Quote request submitted:', formData)
}
</script>

<style scoped>
/* Custom styles if needed */
</style>

