<template>
  <div class="min-h-screen bg-white">
    <div class="relative bg-gradient-to-br from-slate-900 via-gray-800 to-zinc-900 text-white overflow-hidden">
      <div class="absolute inset-0">
        <img src="/src/assets/images/IndustrialEquipment.png" alt="Machinery" class="w-full h-full object-cover opacity-30" />
        <div class="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-gray-800/80 to-transparent"></div>
      </div>
      
      <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div class="max-w-3xl">
          <nav class="flex items-center gap-2 text-sm text-gray-300 mb-6">
            <a href="/" class="hover:text-white transition-colors">Home</a>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
            <a href="/industries" class="hover:text-white transition-colors">Industries</a>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-white">Machinery</span>
          </nav>

          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            Industrial Machinery
            <span class="block mt-2 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Solutions
            </span>
          </h1>

          <p class="text-xl text-gray-200 leading-relaxed mb-8">
            Advanced simulation for machine design, kinematics, dynamics, and durability. Optimize performance and reliability.
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <a href="/contact_us" class="px-8 py-4 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors inline-flex items-center justify-center gap-2 shadow-xl">
              <span>Request Consultation</span>
            </a>
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
              Industrial Machinery Simulation
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Advanced simulation for machine design and optimization
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-6">
            <div class="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <img src="https://www.hitechsoftsys.net/images/machinery_design.jpg" alt="Machine Design" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='/src/assets/images/IndustrialEquipment.png'" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex items-end p-5">
                <div class="text-white">
                  <h3 class="text-lg font-bold mb-1">Machine Design</h3>
                  <p class="text-xs text-gray-200">Structural & kinematic analysis</p>
                </div>
              </div>
            </div>

            <div class="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <img src="https://www.hitechsoftsys.net/images/machinery_motion.jpg" alt="Multi-body Dynamics" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='/src/assets/images/product_service/biman5.jpg'" />
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent flex items-end p-5">
                <div class="text-white">
                  <h3 class="text-lg font-bold mb-1">Motion Analysis</h3>
                  <p class="text-xs text-gray-200">Multi-body dynamics</p>
                </div>
              </div>
            </div>

            <div class="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <img src="https://www.hitechsoftsys.net/images/machinery_component.jpg" alt="Component Analysis" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='/src/assets/images/product_service/biman3.jpg'" />
              <div class="absolute inset-0 bg-gradient-to-t from-cyan-900/80 via-cyan-900/20 to-transparent flex items-end p-5">
                <div class="text-white">
                  <h3 class="text-lg font-bold mb-1">Component Design</h3>
                  <p class="text-xs text-gray-200">Durability & performance</p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8 text-center">
            <p class="text-gray-600">
              <span class="font-semibold text-slate-700">Optimizing machinery performance</span> through advanced simulation
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- About Section -->
    <div class="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div class="flex items-start gap-4 mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-slate-600 to-gray-700 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <div>
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  HTSS Industry Machinery
                </h2>
                <div class="prose prose-lg max-w-none text-gray-700 space-y-4">
                  <p>
                    <strong class="text-slate-700">Hi-Tech SoftSys, Inc.</strong> is a global provider of software service and works as a software reseller globally. We also provide elite Engineering Design & Analysis resources, processes & technology solutions. Through strategic client partnerships we provide 24/7 on-demand availability, with real-world industry expertise, at domestic & global rates.
                  </p>
                  <p>
                    Our Senior Program Management teams & Subject Matter Experts are keys to our on-time delivery & exceeding our clients' expectations. MSC Software, one of our proud partners is a trusted one in terms of <span class="font-semibold text-slate-700">providing a variety of proven simulation solutions across a broad spectrum of machinery applications</span>. It also enables customers to maintain uniformity and reliable information sharing across departments and the supply chain.
                  </p>
                  <p class="text-lg font-semibold text-gray-900 mt-6">
                    MSC Software is helping hundreds of machinery manufacturers to make the transition with CAE tools and supporting services that ensure quick deployment and rapid return on investment.
                  </p>
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
              Purpose of using MSC Software by Engineers
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Machinery engineers rely on MSC Software for comprehensive simulation and analysis
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900 mb-1">Agricultural Equipment</h3>
                  <p class="text-sm text-gray-600">Farming machinery design and optimization</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900 mb-1">Packaging Machine</h3>
                  <p class="text-sm text-gray-600">Automated packaging system simulation</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900 mb-1">Washing Machines</h3>
                  <p class="text-sm text-gray-600">Appliance dynamics and durability</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900 mb-1">Industrial Robots</h3>
                  <p class="text-sm text-gray-600">Robotic system kinematics and control</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900 mb-1">Piling and Drilling Mechanisms</h3>
                  <p class="text-sm text-gray-600">Construction equipment analysis</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-cyan-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900 mb-1">Mobile Automation</h3>
                  <p class="text-sm text-gray-600">Automated mobile machinery systems</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900 mb-1">Fans & Blowers</h3>
                  <p class="text-sm text-gray-600">Air movement and flow optimization</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900 mb-1">Gas & Steam Turbines</h3>
                  <p class="text-sm text-gray-600">Turbomachinery performance analysis</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900 mb-1">Compressors, Expanders & Turbochargers</h3>
                  <p class="text-sm text-gray-600">Compression system efficiency</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900 mb-1">Marine Machinery</h3>
                  <p class="text-sm text-gray-600">Ship propulsion and auxiliary systems</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900 mb-1">Pumps & Water Turbines</h3>
                  <p class="text-sm text-gray-600">Fluid machinery optimization</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-cyan-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900 mb-1">Conveying Equipment Simulation</h3>
                  <p class="text-sm text-gray-600">Material transport system dynamics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Types of Analysis Section -->
    <div class="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-slate-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Types of Analysis Done Using MSC Software
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              MSC Software is capable of doing all sorts of Analysis Services for Machinery Industry
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div class="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Thermal & CFD Analysis</h3>
              <p class="text-gray-600">Computational Fluid Dynamics for heat transfer and flow analysis</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Multi-Body Dynamics (MBD)</h3>
              <p class="text-gray-600">Dynamic simulation of complex mechanical systems</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div class="w-14 h-14 bg-gradient-to-br from-slate-500 to-gray-600 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Structural, Fatigue & Durability</h3>
              <p class="text-gray-600">Comprehensive structural integrity analysis</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">ICME Analysis</h3>
              <p class="text-gray-600">Integrated Computational Materials Engineering</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div class="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Acoustics Analysis</h3>
              <p class="text-gray-600">Noise and vibration analysis</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div class="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Virtual Manufacturing & Costing (VM&C)</h3>
              <p class="text-gray-600">Manufacturing process simulation and cost optimization</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Machinery Business Segments -->
    <div class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Machinery Business Segments
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions for diverse machinery applications
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="group bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-slate-600 to-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span class="text-white font-bold text-xl">🏭</span>
                </div>
                <h3 class="text-xl font-bold text-gray-900">Industrial Equipment</h3>
              </div>
              <p class="text-gray-600">Manufacturing and processing machinery</p>
            </div>

            <div class="group bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-gray-600 to-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span class="text-white font-bold text-xl">⚙️</span>
                </div>
                <h3 class="text-xl font-bold text-gray-900">Rotating Machinery</h3>
              </div>
              <p class="text-gray-600">Turbines, compressors, and pumps</p>
            </div>

            <div class="group bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span class="text-white font-bold text-xl">🤖</span>
                </div>
                <h3 class="text-xl font-bold text-gray-900">Automation Systems</h3>
              </div>
              <p class="text-gray-600">Robotics and automated machinery</p>
            </div>

            <div class="group bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-slate-700 to-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span class="text-white font-bold text-xl">🚜</span>
                </div>
                <h3 class="text-xl font-bold text-gray-900">Agricultural Machinery</h3>
              </div>
              <p class="text-gray-600">Farm equipment and implements</p>
            </div>

            <div class="group bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-gray-700 to-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span class="text-white font-bold text-xl">📦</span>
                </div>
                <h3 class="text-xl font-bold text-gray-900">Material Handling</h3>
              </div>
              <p class="text-gray-600">Conveying and packaging systems</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MSC Products Section -->
    <div class="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              MSC Products used in Machinery Industry
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive suite of simulation tools for machinery applications
            </p>
          </div>

          <div class="space-y-6">
            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-slate-600 to-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">MSC Apex - Modeler & Structures</h3>
                  <p class="text-gray-600">Next-generation CAE modeler for rapid structural simulation</p>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-gray-600 to-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Integrated Solutions</h3>
                  <p class="text-gray-600 mb-2">Adams, Actran, Digimat, Easy5, Marc, Simufact, SimXpert</p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">Multi-body Dynamics</span>
                    <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Acoustics</span>
                    <span class="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">Materials</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Solver Solutions</h3>
                  <p class="text-gray-600 mb-2">Cradle, MSC Nastran, Dytran, MSC Fatigue, Sinda, scSTREAM, SC/Tetra</p>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">CFD</span>
                    <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">FEA</span>
                    <span class="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">Fatigue</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-slate-700 to-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Mid-sized Business Solutions</h3>
                  <p class="text-gray-600">MSC Nastran Desktop, SimDesigner - Perfect for growing companies</p>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-gray-700 to-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Modeling Solutions</h3>
                  <p class="text-gray-600">Patran, SimXpert - Advanced pre and post-processing</p>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-cyan-700 to-blue-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Engineering Lifecycle Management</h3>
                  <p class="text-gray-600">SimManager, MaterialCenter - Comprehensive data and process management</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Benefits Section -->
    <div class="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-slate-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              MSC Software for Machinery
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Advanced simulation for industrial machinery and equipment design
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-6 mb-12">
            <div class="text-center p-6">
              <div class="w-16 h-16 bg-gradient-to-br from-slate-500 to-gray-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Kinematics & Dynamics</h3>
              <p class="text-gray-600">Analyze machine motion and mechanical systems</p>
            </div>

            <div class="text-center p-6">
              <div class="w-16 h-16 bg-gradient-to-br from-gray-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">FREE Training</h3>
              <p class="text-gray-600">Machinery-specific training included</p>
            </div>

            <div class="text-center p-6">
              <div class="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p class="text-gray-600">Round-the-clock technical assistance</p>
            </div>
          </div>

          <!-- Value Banner -->
          <div class="bg-gradient-to-r from-slate-700 to-gray-700 rounded-2xl p-8 shadow-2xl">
            <div class="flex flex-col md:flex-row items-center justify-between gap-6">
              <div class="flex-1 text-center md:text-left">
                <h3 class="text-2xl md:text-3xl font-bold text-white mb-2">
                  ⚙️ Machinery Package
                </h3>
                <p class="text-lg text-gray-200">
                  Buy any MSC Software license and get FREE training + 24/7 support!
                  <span class="font-bold text-white">Save $10,000+ annually</span>
                </p>
              </div>
              <a href="/contact_us" class="px-8 py-4 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-600 transition-colors shadow-lg whitespace-nowrap">
                Get Started Today
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="py-16 md:py-24 bg-gradient-to-br from-slate-900 to-gray-900 text-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Optimize Your Machinery Design
          </h2>
          <div class="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a href="/contact_us" class="px-8 py-4 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors inline-flex items-center justify-center gap-2 shadow-xl">
              <span>Schedule Consultation</span>
            </a>
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
</script>

