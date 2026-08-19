<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900 text-white overflow-hidden">
      <div class="absolute inset-0">
        <!-- <img src="/src/assets/images/medical_device_field.jpg" alt="Medical" class="w-full h-full object-cover opacity-30" /> -->
        <div class="absolute inset-0 bg-gradient-to-r from-teal-900/90 via-cyan-900/80 to-transparent"></div>
      </div>

      <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div class="max-w-3xl">
          <!-- Breadcrumb -->
          <nav class="flex items-center gap-2 text-sm text-teal-200 mb-6">
            <a href="/" class="hover:text-white transition-colors">Home</a>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
            <a href="/industries" class="hover:text-white transition-colors">Industries</a>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-white">Medical Devices</span>
          </nav>

          <!-- Badge -->
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
            <svg class="w-5 h-5 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
            <span class="text-teal-200 font-semibold">Industry Solutions</span>
          </div>

          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            Medical Devices
            <span class="block mt-2 bg-gradient-to-r from-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Engineering Solutions
            </span>
          </h1>

          <p class="text-xl text-gray-200 leading-relaxed mb-8">
            Computational modeling and analysis is giving biomedical engineers a competitive advantage by reducing risk, lowering costs, and accelerating innovation
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <a href="/contact_us" class="px-8 py-4 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors inline-flex items-center justify-center gap-2 shadow-xl">
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

    <!-- HTSS Industry Medical Section -->
    <div class="py-16 md:py-24 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
            <div class="bg-gradient-to-r from-teal-900 via-cyan-900 to-blue-900 p-8 md:p-10">
              <div class="flex items-center gap-4">
                <div class="w-16 h-16 bg-teal-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <div>
                  <h2 class="text-3xl md:text-4xl font-bold text-white mb-2">
                    HTSS Industry Medical
                  </h2>
                  <p class="text-teal-200">Comprehensive medical device engineering solutions</p>
                </div>
              </div>
            </div>

            <div class="p-8 md:p-10">
              <div class="prose prose-lg max-w-none text-gray-700">
                <p class="mb-6">
                  Hi-Tech SoftSys, Inc. is a global provider of software service and works as a software reseller globally. We also provide elite Engineering Design & Analysis resources, processes & technology solutions. Through strategic client partnerships we provide 24/7 on-demand availability, with real-world industry expertise, at domestic & global rates.
                </p>
                <p class="mb-6">
                  Our Senior Program Management teams & Subject Matter Experts are keys to our on-time delivery & exceeding our clients' expectations. MSC Software, one of our proud partners is a trusted engineering simulation and analysis partner to the medical device industry for over 15 years.
                </p>
                <p class="mb-0">
                  During the design process to predict durability, stress, fatigue and mechanical performance of medical products using analysis and computational modeling methods the solutions and consulting services of MSC Software are used.
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
              Medical Device Industry Challenges
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Meeting the demanding requirements of medical device development and regulatory compliance
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-red-500">
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Regulatory Compliance</h3>
              <p class="text-gray-600">Meeting stringent FDA and international regulatory requirements for medical devices</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-orange-500">
              <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Patient Safety</h3>
              <p class="text-gray-600">Ensuring absolute safety and reliability in medical devices that directly impact patient health</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-yellow-500">
              <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Cost Optimization</h3>
              <p class="text-gray-600">Balancing innovation with cost-effectiveness in healthcare technology development</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-green-500">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Time to Market</h3>
              <p class="text-gray-600">Accelerating development cycles while maintaining quality and safety standards</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-blue-500">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Biocompatibility</h3>
              <p class="text-gray-600">Ensuring materials and designs are compatible with human tissue and biological systems</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-purple-500">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Innovation Pressure</h3>
              <p class="text-gray-600">Staying ahead in rapidly evolving medical technology landscape</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Simulation Showcase Section -->
    <div class="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-teal-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Advanced Medical Device Simulation
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              See how MSC Software enables world-class medical device engineering and analysis
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-6 mb-8">
            <div class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <!-- <img src="/src/assets/images/medical_device_field.jpg" alt="Medical Device Structural Analysis" class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" /> -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                <div class="text-white">
                  <h3 class="text-xl font-bold mb-2">Structural Analysis</h3>
                  <p class="text-sm text-gray-200">Medical device structural integrity and durability analysis</p>
                </div>
              </div>
            </div>

            <div class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <!-- <img src="/src/assets/images/medical_device_field.jpg" alt="Medical Device Biocompatibility" class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" /> -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                <div class="text-white">
                  <h3 class="text-xl font-bold mb-2">Biocompatibility Analysis</h3>
                  <p class="text-sm text-gray-200">Material compatibility and tissue interaction simulation</p>
                </div>
              </div>
            </div>

            <div class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <!-- <img src="/src/assets/images/medical_device_field.jpg" alt="Medical Device Fatigue Analysis" class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" /> -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                <div class="text-white">
                  <h3 class="text-xl font-bold mb-2">Fatigue Analysis</h3>
                  <p class="text-sm text-gray-200">Long-term durability and life cycle analysis</p>
                </div>
              </div>
            </div>

            <div class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <!-- <img src="/src/assets/images/medical_device_field.jpg" alt="Medical Device Thermal Analysis" class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" /> -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                <div class="text-white">
                  <h3 class="text-xl font-bold mb-2">Thermal Analysis</h3>
                  <p class="text-sm text-gray-200">Heat transfer and thermal management for medical devices</p>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center">
            <p class="text-gray-600 mb-4">
              <span class="font-semibold text-teal-600">Trusted by leading medical device companies worldwide</span> - MSC Software provides comprehensive simulation solutions for healthcare technology
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
              Purpose of Using MSC Software by Biomedical Engineers
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              MSC Software enables biomedical engineers to simulate and analyze critical medical device systems and components
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Orthopedic Products</h3>
                  <p class="text-sm text-gray-600">Joint replacement and orthopedic device analysis</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Medical Fasteners</h3>
                  <p class="text-sm text-gray-600">Surgical fasteners and implant fixation analysis</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Ocular Modeling</h3>
                  <p class="text-sm text-gray-600">Eye implants and vision correction devices</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Soft Tissue Simulation</h3>
                  <p class="text-sm text-gray-600">Biological tissue interaction modeling</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Packaging</h3>
                  <p class="text-sm text-gray-600">Medical device packaging and sterilization</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Electronic Systems</h3>
                  <p class="text-sm text-gray-600">Medical electronics and monitoring devices</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Knee Replacement</h3>
                  <p class="text-sm text-gray-600">Joint replacement device design and analysis</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100 hover:shadow-lg transition-shadow">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Laser Bonding</h3>
                  <p class="text-sm text-gray-600">Medical device manufacturing processes</p>
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
              MSC Software is capable of doing all sorts of Analysis Services for Medical Industry
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
              <p class="text-gray-600">Computational fluid dynamics for medical device thermal management and heat transfer</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-blue-500">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Multi-Body Dynamics</h3>
              <p class="text-gray-600">MBD analysis for complex medical device systems and component interactions</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-green-500">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Structural Analysis</h3>
              <p class="text-gray-600">Structural, fatigue & durability analysis for medical device components</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-purple-500">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">ICME Analysis</h3>
              <p class="text-gray-600">Integrated Computational Materials Engineering for advanced medical materials</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-yellow-500">
              <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Acoustics Analysis</h3>
              <p class="text-gray-600">Sound analysis and noise reduction for medical equipment</p>
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

    <!-- Medical Business Segments Section -->
    <div class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Medical Business Segments
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive coverage across all medical industry sectors
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100 hover:shadow-lg transition-shadow">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900">Medical Device</h3>
              </div>
              <p class="text-gray-600">Comprehensive medical device design and analysis solutions</p>
            </div>

            <div class="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100 hover:shadow-lg transition-shadow">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900">Hospital Equipment</h3>
              </div>
              <p class="text-gray-600">Advanced hospital equipment simulation and analysis</p>
            </div>

            <div class="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100 hover:shadow-lg transition-shadow">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900">Orthopedic Products</h3>
              </div>
              <p class="text-gray-600">Orthopedic device design and joint replacement analysis</p>
            </div>

            <div class="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100 hover:shadow-lg transition-shadow">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900">Virtual Biomechanics</h3>
              </div>
              <p class="text-gray-600">Human biomechanics simulation and analysis</p>
            </div>

            <div class="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100 hover:shadow-lg transition-shadow">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900">Human Modeling</h3>
              </div>
              <p class="text-gray-600">Advanced human body modeling and simulation</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MSC Software Solutions Section -->
    <div id="solutions" class="py-16 md:py-24 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              MSC Software Solutions for Medical Devices
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive simulation and analysis tools tailored for medical device engineering
            </p>
          </div>

          <div class="space-y-8">
            <!-- MSC Apex -->
            <div class="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div class="grid md:grid-cols-5 gap-0">
                <div class="md:col-span-2 relative h-64 md:h-auto">
                  <!-- <img src="/src/assets/images/medical_device_field.jpg" alt="MSC Apex Simulation" class="w-full h-full object-cover" /> -->
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent to-teal-50/90 md:block hidden"></div>
                </div>
                <div class="md:col-span-3 p-8 md:p-10">
                  <div class="flex items-start gap-4 mb-4">
                    <div class="w-16 h-16 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <h3 class="text-2xl font-bold text-gray-900 mb-2">MSC Apex</h3>
                      <p class="text-sm text-teal-600 font-semibold">Modeler & Structures</p>
                    </div>
                  </div>
                  <p class="text-gray-600 mb-4">
                    Next-generation modeling and structural analysis platform for rapid medical device design and optimization.
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold">Rapid Modeling</span>
                    <span class="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold">Structural Analysis</span>
                    <span class="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold">Design Optimization</span>
                    <span class="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold">Meshing</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- MSC Marc -->
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow">
              <div class="flex flex-col md:flex-row gap-6 items-start">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-gray-900 mb-3">MSC Marc</h3>
                  <p class="text-gray-600 mb-4">
                    Advanced nonlinear finite element analysis for complex medical devices including biocompatibility analysis and material modeling.
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">Nonlinear Analysis</span>
                    <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">Biocompatibility</span>
                    <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">Material Modeling</span>
                    <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">Thermal Analysis</span>
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
                    Industry-standard finite element analysis for structural analysis, fatigue, durability, and optimization of medical device components.
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Static Analysis</span>
                    <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Dynamic Analysis</span>
                    <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Fatigue Analysis</span>
                    <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Durability</span>
                  </div>
                </div>
                <div class="md:col-span-2 relative h-64 md:h-auto order-1 md:order-2">
                  <!-- <img src="/src/assets/images/medical_device_field.jpg" alt="MSC Nastran Simulation" class="w-full h-full object-cover" /> -->
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
                    Multi-body dynamics simulation for complex medical device systems including prosthetics, implants, and mechanical components.
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">Multi-body Dynamics</span>
                    <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">Prosthetics</span>
                    <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">Implants</span>
                    <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">Mechanical Systems</span>
                  </div>
                </div>
              </div>
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
              MSC Products Used in Medical Industry
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive software solutions for every medical device engineering need
            </p>
          </div>

          <div class="space-y-8">
            <div
              v-for="(category, index) in mscProducts"
              :key="index"
              class="bg-gradient-to-r from-gray-50 to-teal-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
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
                  class="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-teal-300 hover:bg-teal-50 transition-all duration-300"
                >
                  <div class="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                  <span class="text-gray-700 font-medium">{{ product }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Case Studies Section -->
    <div class="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-teal-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Medical Device Case Studies
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Real-world applications and success stories from medical device industry leaders
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Stimulating Nerve Paths to the Brain</h3>
              <p class="text-gray-600">Advanced neural stimulation device simulation and analysis</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">University of Missouri Knee Diagnosis</h3>
              <p class="text-gray-600">Adams simulations help diagnose knee problems and orthopedic conditions</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Anisotropic Explicit Simulation</h3>
              <p class="text-gray-600">Considering manufacturing effects and nonlinearity in medical devices</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Marshall Aerospace & Defence Group</h3>
              <p class="text-gray-600">Medical device success with MSC Software solutions</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Ludwig Maximilian University</h3>
              <p class="text-gray-600">Medical research and device development with MSC Software</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Call to Action Section -->
    <div class="py-16 md:py-24 bg-gradient-to-r from-teal-600 to-cyan-600">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Advance Your Medical Device Engineering?
          </h2>
          <p class="text-xl text-teal-100 mb-8">
            Get expert MSC Software solutions with FREE 24/7 support, training, and implementation assistance
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact_us" class="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <span>Get FREE Quote</span>
            </a>
            <a href="/contact_us" class="px-8 py-4 bg-white text-teal-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2">
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
    name: 'Modeling & Structures',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    products: [
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
      'scSTREAM',
      'SC/Tetra'
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
    name: 'Engineering Lifecycle Management',
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
