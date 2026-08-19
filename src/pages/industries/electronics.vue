<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white overflow-hidden">
      <div class="absolute inset-0">
        <img src="/src/assets/images/HiTechIndustry.png" alt="Electronics" class="w-full h-full object-cover opacity-30" />
        <div class="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-purple-900/80 to-transparent"></div>
      </div>

      <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div class="max-w-3xl">
          <!-- Breadcrumb -->
          <nav class="flex items-center gap-2 text-sm text-indigo-200 mb-6">
            <a href="/" class="hover:text-white transition-colors">Home</a>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
            <a href="/industries" class="hover:text-white transition-colors">Industries</a>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-white">Electronics</span>
          </nav>

          <!-- Badge -->
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
            <svg class="w-5 h-5 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
            </svg>
            <span class="text-indigo-200 font-semibold">Industry Solutions</span>
          </div>

          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            Electronics
            <span class="block mt-2 bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Engineering Solutions
            </span>
          </h1>

          <p class="text-xl text-gray-200 leading-relaxed mb-8">
            The multiphysics and multidisciplinary solutions from MSC Software are ideal for realistic simulations of your electronics products
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <a href="/contact_us" class="px-8 py-4 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-colors inline-flex items-center justify-center gap-2 shadow-xl">
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

    <!-- HTSS Industry Electronics Section -->
    <div class="py-16 md:py-24 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
            <div class="bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900 p-8 md:p-10">
              <div class="flex items-center gap-4">
                <div class="w-16 h-16 bg-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                  </svg>
                </div>
                <div>
                  <h2 class="text-3xl md:text-4xl font-bold text-white mb-2">
                    HTSS Industry Electronics
                  </h2>
                  <p class="text-indigo-200">Comprehensive electronics engineering solutions</p>
                </div>
              </div>
            </div>

            <div class="p-8 md:p-10">
              <div class="prose prose-lg max-w-none text-gray-700">
                <p class="mb-6">
                  Hi-Tech SoftSys, Inc. is a global provider of software service and works as a software reseller globally. We also provide elite Engineering Design & Analysis resources, processes & technology solutions. Through strategic client partnerships we provide 24/7 on-demand availability, with real-world industry expertise, at domestic & global rates.
                </p>
                <p class="mb-6">
                  Our Senior Program Management teams & Subject Matter Experts are keys to our on-time delivery & exceeding our clients' expectations. MSC Software, one of our proud partners is a trusted one in terms of providing simulation solutions to the Electronics Industry. It provides CAE tools with advanced multiphysics capabilities to simulate thermal, mechanical & electromagnetic behavior.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Industry Challenges Section -->
    <div class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Electronics Industry Challenges
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Meeting the demanding requirements of modern electronics engineering and manufacturing
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-blue-500">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Thermal Management</h3>
              <p class="text-gray-600">Managing heat dissipation in increasingly compact electronic devices</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-green-500">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Reliability & Durability</h3>
              <p class="text-gray-600">Ensuring long-term performance and resistance to environmental factors</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-purple-500">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Miniaturization</h3>
              <p class="text-gray-600">Designing smaller, more efficient components while maintaining performance</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-red-500">
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">EMI/EMC Compliance</h3>
              <p class="text-gray-600">Meeting electromagnetic interference and compatibility standards</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-yellow-500">
              <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Time to Market</h3>
              <p class="text-gray-600">Accelerating development cycles while ensuring quality and reliability</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-cyan-500">
              <div class="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Cost Optimization</h3>
              <p class="text-gray-600">Balancing performance requirements with manufacturing costs</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Simulation Showcase Section -->
    <div class="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Advanced Electronics Simulation
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              See how MSC Software enables world-class electronics engineering and analysis
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-6 mb-8">
            <div class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <!-- <img src="/src/assets/images/simulation-electronics-thermal.jpg" alt="Electronics Thermal Analysis" class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='/src/assets/images/product_service/biman.jpg'" /> -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                <div class="text-white">
                  <h3 class="text-xl font-bold mb-2">Thermal Analysis</h3>
                  <p class="text-sm text-gray-200">Advanced CFD for electronics cooling and heat management</p>
                </div>
              </div>
            </div>

            <div class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <!-- <img src="/src/assets/images/simulation-pcb-stress.jpg" alt="PCB Stress Analysis" class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='/src/assets/images/product_service/biman2.jpg'" /> -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                <div class="text-white">
                  <h3 class="text-xl font-bold mb-2">PCB Stress Analysis</h3>
                  <p class="text-sm text-gray-200">Structural analysis for circuit board reliability</p>
                </div>
              </div>
            </div>

            <div class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <!-- <img src="/src/assets/images/simulation-drop-test.jpg" alt="Electronics Drop Testing" class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='/src/assets/images/product_service/biman3.jpg'" /> -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                <div class="text-white">
                  <h3 class="text-xl font-bold mb-2">Drop Testing</h3>
                  <p class="text-sm text-gray-200">Impact simulation for mobile device durability</p>
                </div>
              </div>
            </div>

            <div class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <!-- <img src="/src/assets/images/simulation-acoustic.jpg" alt="Electronics Acoustic Analysis" class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='/src/assets/images/product_service/biman5.jpg'" /> -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                <div class="text-white">
                  <h3 class="text-xl font-bold mb-2">Acoustic Analysis</h3>
                  <p class="text-sm text-gray-200">Noise reduction and sound quality optimization</p>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center">
            <p class="text-gray-600 mb-4">
              <span class="font-semibold text-indigo-600">Trusted by leading electronics companies worldwide</span> - MSC Software provides comprehensive multiphysics simulation solutions
            </p>
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
              MSC Software enables electronics engineers to simulate and analyze critical components and systems
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Circuit Boards</h3>
                  <p class="text-sm text-gray-600">PCB design and reliability analysis</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Hard Drives</h3>
                  <p class="text-sm text-gray-600">Storage device mechanical analysis</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">LCD Screens</h3>
                  <p class="text-sm text-gray-600">Display technology optimization</p>
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
                  <h3 class="font-bold text-gray-900 mb-1">Heat Sinks</h3>
                  <p class="text-sm text-gray-600">Thermal management system design</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Types of Analysis Section -->
    <div class="py-16 md:py-24 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Types of Analysis Done Using MSC Software
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              MSC Software is capable of doing all sorts of Analysis Services for Electronics Industry
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-red-500">
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Thermal & CFD Analysis</h3>
              <p class="text-gray-600">Computational fluid dynamics for electronics cooling and thermal management</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-blue-500">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Multi-Body Dynamics</h3>
              <p class="text-gray-600">MBD analysis for mechanical systems and component interactions</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-green-500">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Structural Analysis</h3>
              <p class="text-gray-600">Structural, fatigue & durability analysis for electronic components</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-purple-500">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">ICME Analysis</h3>
              <p class="text-gray-600">Integrated Computational Materials Engineering for advanced materials</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-yellow-500">
              <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Acoustics Analysis</h3>
              <p class="text-gray-600">Sound analysis and noise reduction for electronic devices</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-cyan-500">
              <div class="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Virtual Manufacturing</h3>
              <p class="text-gray-600">Virtual Manufacturing & Costing (VM&C) analysis for production optimization</p>
            </div>
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
              MSC Software Solutions for Electronics
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive simulation and analysis tools tailored for electronics engineering
            </p>
          </div>

          <div class="space-y-8">
            <!-- MSC Apex -->
            <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div class="grid md:grid-cols-5 gap-0">
                <div class="md:col-span-2 relative h-64 md:h-auto">
                  <!-- <img src="/src/assets/images/simulation-electronics-thermal.jpg" alt="MSC Apex Simulation" class="w-full h-full object-cover" onerror="this.src='/src/assets/images/product_service/biman4.png'" /> -->
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent to-indigo-50/90 md:block hidden"></div>
                </div>
                <div class="md:col-span-3 p-8 md:p-10">
                  <div class="flex items-start gap-4 mb-4">
                    <div class="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <h3 class="text-2xl font-bold text-gray-900 mb-2">MSC Apex</h3>
                      <p class="text-sm text-indigo-600 font-semibold">Generative Design & Structures</p>
                    </div>
                  </div>
                  <p class="text-gray-600 mb-4">
                    Next-generation generative design and simulation platform for rapid electronics design optimization and structural analysis.
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">Generative Design</span>
                    <span class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">Structural Analysis</span>
                    <span class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">Topology Optimization</span>
                    <span class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">Rapid Meshing</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Cradle CFD -->
            <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow">
              <div class="flex flex-col md:flex-row gap-6 items-start">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V1a1 1 0 011-1h2a1 1 0 011 1v3m0 0h8"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-gray-900 mb-3">Cradle CFD</h3>
                  <p class="text-gray-600 mb-4">
                    Advanced computational fluid dynamics for electronics thermal management, cooling system design, and airflow optimization.
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">Thermal Analysis</span>
                    <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">Cooling Design</span>
                    <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">Airflow Simulation</span>
                    <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">Heat Transfer</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- MSC Nastran -->
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div class="grid md:grid-cols-5 gap-0">
                <div class="md:col-span-3 p-8 md:p-10 order-2 md:order-1">
                  <div class="flex items-start gap-4 mb-4">
                    <div class="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <h3 class="text-2xl font-bold text-gray-900 mb-2">MSC Nastran</h3>
                      <p class="text-sm text-green-600 font-semibold">Industry Standard FEA</p>
                    </div>
                  </div>
                  <p class="text-gray-600 mb-4">
                    Industry-standard finite element analysis for structural analysis, fatigue, durability, and optimization of electronic components and systems.
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Static Analysis</span>
                    <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Fatigue Analysis</span>
                    <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Durability</span>
                    <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Optimization</span>
                  </div>
                </div>
                <div class="md:col-span-2 relative h-64 md:h-auto order-1 md:order-2">
                  <!-- <img src="/src/assets/images/simulation-pcb-stress.jpg" alt="MSC Nastran Simulation" class="w-full h-full object-cover" onerror="this.src='/src/assets/images/product_service/biman6.jpg'" /> -->
                  <div class="absolute inset-0 bg-gradient-to-l from-transparent to-green-50/90 md:block hidden"></div>
                </div>
              </div>
            </div>

            <!-- MSC Adams -->
            <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow">
              <div class="flex flex-col md:flex-row gap-6 items-start">
                <div class="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-gray-900 mb-3">MSC Adams</h3>
                  <p class="text-gray-600 mb-4">
                    Multi-body dynamics simulation for mechanical systems, mechanisms, and complex assemblies in electronic devices.
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">Mechanism Analysis</span>
                    <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">System Dynamics</span>
                    <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">Control Systems</span>
                    <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">Motion Analysis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Electronics Business Segments Section -->
    <div class="py-16 md:py-24 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Electronics Business Segments
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive coverage across all electronics industry sectors
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-blue-500">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Semiconductors</h3>
              <p class="text-gray-600">Chip design, wafer processing, and semiconductor manufacturing</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-green-500">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Electro Mechanical Devices</h3>
              <p class="text-gray-600">Mechatronic systems and electromechanical components</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-purple-500">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Telecommunications</h3>
              <p class="text-gray-600">Network equipment, computing systems, and communication devices</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-orange-500">
              <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Electronic Components</h3>
              <p class="text-gray-600">Passive and active electronic components and assemblies</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-red-500">
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Vehicle Interactions</h3>
              <p class="text-gray-600">Vehicle-to-vehicle communication and traffic simulation systems</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-yellow-500">
              <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Switchgears</h3>
              <p class="text-gray-600">Electrical switchgear and power distribution equipment</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-cyan-500">
              <div class="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Contract Manufacturing</h3>
              <p class="text-gray-600">Contract services for electronics manufacturing and assembly</p>
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
              MSC Products Used in Electronics Industry
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive software solutions for every electronics engineering need
            </p>
          </div>

          <div class="space-y-8">
            <div
              v-for="(category, index) in mscProducts"
              :key="index"
              class="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
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
                  class="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300"
                >
                  <div class="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                  <span class="text-gray-700 font-medium">{{ product }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Case Studies Section -->
    <div class="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Electronics Case Studies
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Real-world applications and success stories from electronics industry leaders
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Stiffness of a Bracket in Reinforced PBT</h3>
              <p class="text-gray-600">Advanced material analysis for electronic component brackets</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V1a1 1 0 011-1h2a1 1 0 011 1v3m0 0h8"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Better Electronic Enclosures by CFD</h3>
              <p class="text-gray-600">Thermal optimization of electronic enclosures using CFD simulation</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Optimizing Semiconductor Production</h3>
              <p class="text-gray-600">Hardware optimization for semiconductor manufacturing processes</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Fiber Orientation in Collector Box</h3>
              <p class="text-gray-600">Ground cable retention feature design optimization</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Switching Over to MSC Adams</h3>
              <p class="text-gray-600">Multi-body dynamics implementation for electronic systems</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Call to Action Section -->
    <div class="py-16 md:py-24 bg-gradient-to-r from-indigo-600 to-purple-600">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Enhance Your Electronics Engineering Capabilities?
          </h2>
          <p class="text-xl text-indigo-100 mb-8">
            Get expert MSC Software solutions with FREE 24/7 support, training, and implementation assistance
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact_us" class="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <span>Get FREE Quote</span>
            </a>
            <a href="/contact_us" class="px-8 py-4 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2">
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

// MSC Products data
const mscProducts = ref([
  {
    name: 'Generative Design & Modeling',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    products: [
      'MSC Apex Generative Design',
      'MSC Apex Modeler',
      'MSC Apex Structures',
      'MSC Patran',
      'MSC SimXpert'
    ]
  },
  {
    name: 'Integrated Solutions',
    icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
    products: [
      'MSC Adams',
      'MSC Actran',
      'Digimat',
      'Easy5',
      'MSC Marc',
      'Simufact',
      'SimXpert'
    ]
  },
  {
    name: 'Solver Solutions',
    icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
    products: [
      'Cradle CFD',
      'MSC Nastran',
      'MSC Dytran',
      'MSC Fatigue',
      'Sinda',
      'scSTREAM'
    ]
  },
  {
    name: 'Mid-sized Business Solutions',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    products: [
      'MSC Nastran Desktop',
      'SimDesigner'
    ]
  },
  {
    name: 'Modeling Solutions',
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    products: [
      'MSC Patran',
      'MSC SimXpert'
    ]
  },
  {
    name: 'Process & Data Management',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    products: [
      'SimManager',
      'MaterialCenter'
    ]
  }
])
</script>

<style scoped>
</style>
