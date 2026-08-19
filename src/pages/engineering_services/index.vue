<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="py-28 bg-gradient-to-r from-cyan-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      <!-- Gradient background elements -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-96 h-96 bg-cyan-400 rounded-full filter blur-3xl"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl"></div>
      </div>
      
      <div class="container mx-auto px-6 text-center relative z-10">
        <div class="inline-flex items-center gap-2 bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full px-6 py-3 mb-6">
          <svg class="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
          <span class="text-cyan-200 font-semibold text-sm">EXPERT ENGINEERING PARTNERSHIP</span>
        </div>
        
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Engineering Services & Technical Consulting</h1>
        <p class="text-lg text-cyan-200 max-w-3xl mx-auto mb-4">Beyond software sales, we serve as your contractual engineering partner. Expert simulation services, design consulting, and technical support powered by industry-leading MSC Software solutions.</p>
        
        <div class="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-4 mb-8 shadow-2xl border-2 border-yellow-400 inline-block">
          <p class="text-gray-900 font-bold">🔧 Structural Analysis | Dynamics | Thermal | NVH | CFD</p>
        </div>
        
        <div class="mt-8 flex justify-center gap-4 flex-wrap">
          <!-- <button @click="openConsultationModal" class="px-6 py-3 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-600 transition">Request Consultation</button> -->
          <RouterLink to="/contact_us" class="px-6 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition">Contact Sales</RouterLink>
        </div>
      </div>
    </section>

      <section class="relative py-20 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl animate-pulse"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 rounded-full filter blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <span class="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Engineering Excellence</span>
        <h2 class="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Contractual Engineering Design & Analysis Services
        </h2>
        <p class="text-xl text-gray-300 max-w-4xl mx-auto">
          Beyond software sales and support, we serve as your <span class="text-cyan-400 font-bold">contractual engineering partner</span> - providing expert design, simulation, and analysis services to bring your projects to life
        </p>
      </div>

      <!-- Value Proposition -->
      <div class="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-8 md:p-12 mb-16 shadow-2xl">
        <div class="flex flex-col md:flex-row items-center gap-8">
          <div class="flex-shrink-0">
            <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center">
              <svg class="w-14 h-14 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
          </div>
          <div class="flex-1 text-white">
            <h3 class="text-3xl md:text-4xl font-bold mb-4">
              Your Trusted Engineering Partner
            </h3>
            <p class="text-lg md:text-xl text-blue-100">
              We don't just provide tools - we work alongside you as a <span class="font-bold">contractual partner</span> to solve your most challenging engineering problems. From concept to completion, our expert team delivers results.
            </p>
          </div>
        </div>
      </div>

      <!-- Services Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <!-- FEA Services -->
        <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
            <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">Finite Element Analysis (FEA)</h3>
          <p class="text-gray-300 mb-4">
            Comprehensive structural analysis for stress, strain, vibration, and fatigue predictions
          </p>
          <ul class="space-y-2 text-gray-400">
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Linear & Nonlinear Stress Analysis</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Modal & Harmonic Analysis</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Thermal & Fatigue Analysis</span>
            </li>
          </ul>
        </div>

        <!-- CFD Services -->
        <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
            <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">Computational Fluid Dynamics (CFD)</h3>
          <p class="text-gray-300 mb-4">
            Advanced fluid flow, heat transfer, and thermal management simulations
          </p>
          <ul class="space-y-2 text-gray-400">
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Aerodynamic Analysis</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Heat Transfer Simulation</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Multi-Phase Flow Analysis</span>
            </li>
          </ul>
        </div>

        <!-- Structural Design -->
        <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
            <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">Structural Design</h3>
          <p class="text-gray-300 mb-4">
            Complete structural engineering design and validation services
          </p>
          <ul class="space-y-2 text-gray-400">
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Component & Assembly Design</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Design Optimization</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Load Path Analysis</span>
            </li>
          </ul>
        </div>

        <!-- Crash & Impact Analysis -->
        <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mb-6">
            <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">Crash & Impact Analysis</h3>
          <p class="text-gray-300 mb-4">
            Explicit dynamics simulation for crash, drop, and impact scenarios
          </p>
          <ul class="space-y-2 text-gray-400">
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Vehicle Crashworthiness</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Drop Test Simulation</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Impact & Penetration Studies</span>
            </li>
          </ul>
        </div>

        <!-- NVH Analysis -->
        <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
            <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">NVH Analysis</h3>
          <p class="text-gray-300 mb-4">
            Noise, Vibration, and Harshness analysis for acoustic comfort
          </p>
          <ul class="space-y-2 text-gray-400">
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Acoustic Simulation</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Vibration Isolation</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Sound Quality Assessment</span>
            </li>
          </ul>
        </div>

        <!-- Multi-Physics -->
        <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-6">
            <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">Multi-Physics Simulation</h3>
          <p class="text-gray-300 mb-4">
            Coupled analysis combining multiple physics domains
          </p>
          <ul class="space-y-2 text-gray-400">
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Thermal-Structural Coupling</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Fluid-Structure Interaction</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Electro-Thermal Analysis</span>
            </li>
          </ul>
        </div>

        <!-- Design Optimization -->
        <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-6">
            <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">Design Optimization</h3>
          <p class="text-gray-300 mb-4">
            Topology, shape, and size optimization for efficient designs
          </p>
          <ul class="space-y-2 text-gray-400">
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Topology Optimization</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Weight Reduction Studies</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Performance Enhancement</span>
            </li>
          </ul>
        </div>

        <!-- Manufacturing Simulation -->
        <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
            <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">Manufacturing Simulation</h3>
          <p class="text-gray-300 mb-4">
            Virtual manufacturing process simulation and validation
          </p>
          <ul class="space-y-2 text-gray-400">
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Metal Forming Simulation</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Additive Manufacturing</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Welding & Joining Analysis</span>
            </li>
          </ul>
        </div>

        <!-- Technical Consulting -->
        <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6">
            <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">Technical Consulting</h3>
          <p class="text-gray-300 mb-4">
            Expert guidance and problem-solving for complex challenges
          </p>
          <ul class="space-y-2 text-gray-400">
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Methodology Development</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Best Practices Implementation</span>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Project Review & Validation</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Why Choose Our Engineering Services -->
      <div class="grid md:grid-cols-2 gap-8 mb-16">
        <!-- Left: Image/Visual -->
        <div class="relative">
          <div class="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl blur-2xl opacity-30"></div>
          <div class="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 class="text-2xl font-bold text-white mb-6">Our Engineering Expertise</h3>
            <div class="space-y-4">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg font-bold text-white mb-1">Experienced Engineers</h4>
                  <p class="text-gray-300 text-sm">20+ years of combined experience in CAE and simulation</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg font-bold text-white mb-1">Multi-Industry Experience</h4>
                  <p class="text-gray-300 text-sm">Aerospace, automotive, energy, defense, and more</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg font-bold text-white mb-1">Proven Track Record</h4>
                  <p class="text-gray-300 text-sm">1000+ successful projects delivered globally</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg font-bold text-white mb-1">On-Time Delivery</h4>
                  <p class="text-gray-300 text-sm">Meeting deadlines with quality results</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Benefits -->
        <div class="space-y-6">
          <div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span class="text-white font-bold text-lg">1</span>
              </div>
              <div>
                <h4 class="text-lg font-bold text-white mb-2">Flexible Contracting</h4>
                <p class="text-gray-300 text-sm">Project-based, hourly, or retainer agreements tailored to your needs</p>
              </div>
            </div>
          </div>

          <div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span class="text-white font-bold text-lg">2</span>
              </div>
              <div>
                <h4 class="text-lg font-bold text-white mb-2">Scalable Resources</h4>
                <p class="text-gray-300 text-sm">Scale your engineering team up or down based on project demands</p>
              </div>
            </div>
          </div>

          <div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span class="text-white font-bold text-lg">3</span>
              </div>
              <div>
                <h4 class="text-lg font-bold text-white mb-2">Cost-Effective</h4>
                <p class="text-gray-300 text-sm">No overhead costs of hiring full-time engineers</p>
              </div>
            </div>
          </div>

          <div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span class="text-white font-bold text-lg">4</span>
              </div>
              <div>
                <h4 class="text-lg font-bold text-white mb-2">IP Protection</h4>
                <p class="text-gray-300 text-sm">Strict confidentiality and NDA agreements for your peace of mind</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Industries Served -->
      <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 mb-12">
        <h3 class="text-3xl font-bold text-white text-center mb-8">Industries We Serve</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div class="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
            <div class="text-3xl mb-2">✈️</div>
            <p class="text-white font-semibold text-sm">Aerospace</p>
          </div>
          <div class="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
            <div class="text-3xl mb-2">🚗</div>
            <p class="text-white font-semibold text-sm">Automotive</p>
          </div>
          <div class="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
            <div class="text-3xl mb-2">⚡</div>
            <p class="text-white font-semibold text-sm">Energy</p>
          </div>
          <div class="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
            <div class="text-3xl mb-2">🛡️</div>
            <p class="text-white font-semibold text-sm">Defense</p>
          </div>
          <div class="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
            <div class="text-3xl mb-2">⚙️</div>
            <p class="text-white font-semibold text-sm">Heavy Equipment</p>
          </div>
          <div class="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
            <div class="text-3xl mb-2">🏥</div>
            <p class="text-white font-semibold text-sm">Medical Devices</p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-8 md:p-12 text-center shadow-2xl">
        <h3 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Partner with Our Engineering Team?
        </h3>
        <p class="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
          Let our experienced engineers help you solve complex design challenges and accelerate your product development
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact_us"
            class="px-8 py-4 bg-white text-blue-900 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2"
          >
            <span>Discuss Your Project</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </a>
          <a
            href="mailto:sales@hitechsoftsys.net"
            class="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <span>Email Us</span>
          </a>
        </div>
      </div>

      <!-- Process Timeline -->
      <div class="mt-16">
        <h3 class="text-3xl font-bold text-white text-center mb-12">
          Our Engineering Services Process
        </h3>
        <div class="relative">
          <!-- Timeline Line (Desktop) -->
          <div class="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transform -translate-y-1/2"></div>
          
          <div class="grid lg:grid-cols-5 gap-6">
            <div class="relative text-center">
              <div class="relative inline-block mb-4">
                <div class="absolute inset-0 bg-cyan-500 rounded-full blur-xl opacity-50"></div>
                <div class="relative w-20 h-20 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center mx-auto border-4 border-gray-900">
                  <span class="text-white font-bold text-2xl">1</span>
                </div>
              </div>
              <h4 class="text-white font-bold mb-2">Consultation</h4>
              <p class="text-gray-400 text-sm">Understand your requirements and challenges</p>
            </div>

            <div class="relative text-center">
              <div class="relative inline-block mb-4">
                <div class="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-50"></div>
                <div class="relative w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto border-4 border-gray-900">
                  <span class="text-white font-bold text-2xl">2</span>
                </div>
              </div>
              <h4 class="text-white font-bold mb-2">Proposal</h4>
              <p class="text-gray-400 text-sm">Detailed scope, timeline, and cost estimate</p>
            </div>

            <div class="relative text-center">
              <div class="relative inline-block mb-4">
                <div class="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-50"></div>
                <div class="relative w-20 h-20 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center mx-auto border-4 border-gray-900">
                  <span class="text-white font-bold text-2xl">3</span>
                </div>
              </div>
              <h4 class="text-white font-bold mb-2">Execution</h4>
              <p class="text-gray-400 text-sm">Expert team performs analysis and design work</p>
            </div>

            <div class="relative text-center">
              <div class="relative inline-block mb-4">
                <div class="absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-50"></div>
                <div class="relative w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto border-4 border-gray-900">
                  <span class="text-white font-bold text-2xl">4</span>
                </div>
              </div>
              <h4 class="text-white font-bold mb-2">Review</h4>
              <p class="text-gray-400 text-sm">Comprehensive results presentation and validation</p>
            </div>

            <div class="relative text-center">
              <div class="relative inline-block mb-4">
                <div class="absolute inset-0 bg-pink-500 rounded-full blur-xl opacity-50"></div>
                <div class="relative w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mx-auto border-4 border-gray-900">
                  <span class="text-white font-bold text-2xl">5</span>
                </div>
              </div>
              <h4 class="text-white font-bold mb-2">Support</h4>
              <p class="text-gray-400 text-sm">Ongoing support and iterations as needed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

    <!-- Services Overview -->
    <!-- <section class="py-16 bg-gradient-to-b from-white to-gray-50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <span class="text-cyan-600 font-semibold text-sm uppercase tracking-wider">Our Expertise</span>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">Engineering Services Overview</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">Comprehensive engineering solutions across multiple disciplines and industries</p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="service in mainServices" :key="service.id" class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition border border-gray-200">
            <div class="h-32 bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
              <span class="text-5xl">{{ service.icon }}</span>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold mb-2 text-gray-900">{{ service.title }}</h3>
              <p class="text-gray-600 mb-4">{{ service.description }}</p>
              <button @click="selectService(service)" class="text-cyan-600 hover:text-cyan-800 font-semibold text-sm">Learn More →</button>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- Detailed Services -->
    <!-- <section class="py-16 bg-white">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <span class="text-cyan-600 font-semibold text-sm uppercase tracking-wider">Detailed Capabilities</span>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">Service Categories</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">Deep expertise in specialized engineering disciplines</p>
        </div>

        <div class="mb-12 bg-white rounded-lg p-8 border border-gray-200">
          <div class="flex items-start gap-4 mb-6">
            <div class="text-4xl">🏗️</div>
            <div>
              <h3 class="text-2xl font-bold mb-2">Structural Analysis & Design</h3>
              <p class="text-gray-600">Comprehensive structural design, analysis, and optimization services for safe and efficient structures.</p>
            </div>
          </div>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-bold text-gray-800 mb-3">Services Include:</h4>
              <ul class="space-y-2 text-gray-700">
                <li v-for="item in services.structural.items" :key="item" class="flex items-start">
                  <span class="text-blue-600 mr-2">✓</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-gray-800 mb-3">Industries Served:</h4>
              <ul class="space-y-2 text-gray-700">
                <li v-for="industry in services.structural.industries" :key="industry" class="flex items-start">
                  <span class="text-green-600 mr-2">•</span>
                  <span>{{ industry }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
            <p class="text-sm text-gray-700"><strong>Typical Deliverables:</strong> {{ services.structural.deliverables }}</p>
          </div>
        </div>

        <div class="mb-12 bg-white rounded-lg p-8 border border-gray-200">
          <div class="flex items-start gap-4 mb-6">
            <div class="text-4xl">⚙️</div>
            <div>
              <h3 class="text-2xl font-bold mb-2">Dynamics & Motion Analysis</h3>
              <p class="text-gray-600">Multibody dynamics, mechanism analysis, and system-level performance simulation.</p>
            </div>
          </div>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-bold text-gray-800 mb-3">Services Include:</h4>
              <ul class="space-y-2 text-gray-700">
                <li v-for="item in services.dynamics.items" :key="item" class="flex items-start">
                  <span class="text-blue-600 mr-2">✓</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-gray-800 mb-3">Industries Served:</h4>
              <ul class="space-y-2 text-gray-700">
                <li v-for="industry in services.dynamics.industries" :key="industry" class="flex items-start">
                  <span class="text-green-600 mr-2">•</span>
                  <span>{{ industry }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
            <p class="text-sm text-gray-700"><strong>Typical Deliverables:</strong> {{ services.dynamics.deliverables }}</p>
          </div>
        </div>

        <div class="mb-12 bg-white rounded-lg p-8 border border-gray-200">
          <div class="flex items-start gap-4 mb-6">
            <div class="text-4xl">🔊</div>
            <div>
              <h3 class="text-2xl font-bold mb-2">Acoustics & NVH (Noise, Vibration, Harshness)</h3>
              <p class="text-gray-600">Sound and vibration analysis, control, and optimization for enhanced comfort and regulatory compliance.</p>
            </div>
          </div>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-bold text-gray-800 mb-3">Services Include:</h4>
              <ul class="space-y-2 text-gray-700">
                <li v-for="item in services.acoustics.items" :key="item" class="flex items-start">
                  <span class="text-blue-600 mr-2">✓</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-gray-800 mb-3">Industries Served:</h4>
              <ul class="space-y-2 text-gray-700">
                <li v-for="industry in services.acoustics.industries" :key="industry" class="flex items-start">
                  <span class="text-green-600 mr-2">•</span>
                  <span>{{ industry }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
            <p class="text-sm text-gray-700"><strong>Typical Deliverables:</strong> {{ services.acoustics.deliverables }}</p>
          </div>
        </div>

        <div class="mb-12 bg-white rounded-lg p-8 border border-gray-200">
          <div class="flex items-start gap-4 mb-6">
            <div class="text-4xl">🌡️</div>
            <div>
              <h3 class="text-2xl font-bold mb-2">Thermal & Fluids Analysis</h3>
              <p class="text-gray-600">Thermal management, CFD analysis, and fluid-structure interaction simulations.</p>
            </div>
          </div>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-bold text-gray-800 mb-3">Services Include:</h4>
              <ul class="space-y-2 text-gray-700">
                <li v-for="item in services.thermal.items" :key="item" class="flex items-start">
                  <span class="text-blue-600 mr-2">✓</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-gray-800 mb-3">Industries Served:</h4>
              <ul class="space-y-2 text-gray-700">
                <li v-for="industry in services.thermal.industries" :key="industry" class="flex items-start">
                  <span class="text-green-600 mr-2">•</span>
                  <span>{{ industry }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
            <p class="text-sm text-gray-700"><strong>Typical Deliverables:</strong> {{ services.thermal.deliverables }}</p>
          </div>
        </div>

        <div class="bg-white rounded-lg p-8 border border-gray-200">
          <div class="flex items-start gap-4 mb-6">
            <div class="text-4xl">💻</div>
            <div>
              <h3 class="text-2xl font-bold mb-2">Digital Transformation & Integration</h3>
              <p class="text-gray-600">Simulation process automation, digital twin development, and enterprise solution integration.</p>
            </div>
          </div>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-bold text-gray-800 mb-3">Services Include:</h4>
              <ul class="space-y-2 text-gray-700">
                <li v-for="item in services.digital.items" :key="item" class="flex items-start">
                  <span class="text-blue-600 mr-2">✓</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-gray-800 mb-3">Industries Served:</h4>
              <ul class="space-y-2 text-gray-700">
                <li v-for="industry in services.digital.industries" :key="industry" class="flex items-start">
                  <span class="text-green-600 mr-2">•</span>
                  <span>{{ industry }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
            <p class="text-sm text-gray-700"><strong>Typical Deliverables:</strong> {{ services.digital.deliverables }}</p>
          </div>
        </div>
      </div>
    </section> -->

    <!-- Engagement Models -->
    <!-- <section class="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <span class="text-cyan-600 font-semibold text-sm uppercase tracking-wider">Flexible Partnerships</span>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">Flexible Engagement Models</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">Tailored partnerships to match your project needs and budget</p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="model in engagementModels" :key="model.id" class="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-200 hover:shadow-lg transition">
            <h3 class="text-lg font-bold mb-3 text-cyan-900">{{ model.title }}</h3>
            <p class="text-sm text-gray-700 mb-4">{{ model.description }}</p>
            <div class="space-y-2 text-xs text-gray-600">
              <div class="font-semibold text-gray-800">Ideal for:</div>
              <ul class="space-y-1">
                <li v-for="use in model.idealFor" :key="use" class="flex items-start">
                  <span class="text-cyan-600 mr-2">•</span>
                  <span>{{ use }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- Expert Team -->
    <!-- <section class="py-16 bg-white">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <span class="text-cyan-600 font-semibold text-sm uppercase tracking-wider">Your Team</span>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">Our Expert Team</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">Experienced engineers dedicated to solving your toughest challenges</p>
        </div>
        
        <div class="max-w-4xl mx-auto bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 border border-cyan-200">
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-xl font-bold mb-4 text-cyan-900">Team Credentials</h3>
              <ul class="space-y-3">
                <li v-for="credential in teamCredentials" :key="credential" class="flex items-start gap-3">
                  <span class="text-cyan-600 text-lg">★</span>
                  <span class="text-gray-700">{{ credential }}</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-xl font-bold mb-4 text-cyan-900">Why Choose Us</h3>
              <ul class="space-y-3">
                <li v-for="benefit in teamBenefits" :key="benefit" class="flex items-start gap-3">
                  <span class="text-green-600 text-lg">✓</span>
                  <span class="text-gray-700">{{ benefit }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- Case Studies / Success Stories -->
    <!-- <section class="py-16 bg-gradient-to-b from-white to-gray-50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <span class="text-cyan-600 font-semibold text-sm uppercase tracking-wider">Track Record</span>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">Success Stories</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">Real-world examples of how we've helped clients overcome engineering challenges</p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div v-for="story in caseStudies" :key="story.id" class="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition">
            <div class="flex items-center gap-4 mb-4">
              <span class="text-4xl">{{ story.icon }}</span>
              <div>
                <h3 class="font-bold text-gray-900 text-lg">{{ story.title }}</h3>
                <p class="text-sm text-cyan-600 font-semibold">{{ story.industry }}</p>
              </div>
            </div>
            <p class="text-gray-700 mb-4">{{ story.description }}</p>
            <div class="pt-4 border-t border-gray-200">
              <p class="text-sm text-cyan-600 font-semibold">{{ story.result }}</p>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- Process Methodology -->
    <!-- <section class="py-16 bg-white">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <span class="text-cyan-600 font-semibold text-sm uppercase tracking-wider">Our Approach</span>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">Project Methodology</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">A proven 5-step process for delivering quality engineering solutions</p>
        </div>
        
        <div class="max-w-5xl mx-auto">
          <div class="grid md:grid-cols-5 gap-4">
            <div v-for="(step, idx) in projectSteps" :key="idx" class="relative">
              <div class="bg-white rounded-2xl p-6 border-2 border-cyan-200 text-center hover:shadow-lg transition">
                <div class="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3 text-lg">{{ idx + 1 }}</div>
                <h3 class="font-bold text-gray-900 mb-2">{{ step.title }}</h3>
                <p class="text-sm text-gray-600">{{ step.description }}</p>
              </div>
              <div v-if="idx < projectSteps.length - 1" class="hidden md:block absolute top-1/2 -right-6 w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-400"></div>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- Technology Stack -->
    <!-- <section class="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <span class="text-cyan-600 font-semibold text-sm uppercase tracking-wider">Technical Foundation</span>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">Technology Stack</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">Cutting-edge simulation and engineering tools</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div class="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-200">
            <h3 class="text-lg font-bold mb-4 text-cyan-900">Simulation Software</h3>
            <ul class="space-y-2 text-gray-700 text-sm">
              <li v-for="tool in technologyStack.simulation" :key="tool" class="flex items-start gap-2">
                <span class="text-cyan-600">•</span>
                <span>{{ tool }}</span>
              </li>
            </ul>
          </div>
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
            <h3 class="text-lg font-bold mb-4 text-green-900">Analysis Tools</h3>
            <ul class="space-y-2 text-gray-700 text-sm">
              <li v-for="tool in technologyStack.analysis" :key="tool" class="flex items-start gap-2">
                <span class="text-green-600">•</span>
                <span>{{ tool }}</span>
              </li>
            </ul>
          </div>
          <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
            <h3 class="text-lg font-bold mb-4 text-purple-900">Integration & Automation</h3>
            <ul class="space-y-2 text-gray-700 text-sm">
              <li v-for="tool in technologyStack.integration" :key="tool" class="flex items-start gap-2">
                <span class="text-purple-600">•</span>
                <span>{{ tool }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section> -->

    <!-- FAQ Section -->
    <!-- <section class="py-16 bg-gradient-to-b from-white via-cyan-50 to-white">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold text-center mb-2 text-gray-900">Frequently Asked Questions</h2>
        <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto text-lg">Find answers to common questions about our engineering services and MSC Software solutions.</p>
        
        <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div v-for="(faq, index) in faqs" :key="index" class="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer" @click="toggleFaq(index)">
            <div class="flex items-start gap-4">
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                <span :class="['text-white font-bold transition', openFaqId === index ? 'rotate-45' : '']">+</span>
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-gray-900 mb-2 text-lg">{{ faq.question }}</h3>
                <p v-if="openFaqId === index" class="text-gray-600 text-sm leading-relaxed animate-in">{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- Call to Action -->
    <section class="py-16 bg-gradient-to-r from-cyan-900 to-blue-900 text-white text-center">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Engineering Challenges?</h2>
        <p class="text-xl text-cyan-200 mb-8 max-w-2xl mx-auto">Let our expert team help you leverage MSC Software to drive innovation, efficiency, and competitive advantage.</p>
        <div class="flex justify-center gap-4 flex-wrap">
          <!-- <button @click="openConsultationModal" class="px-6 py-3 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-600 transition">Request Consultation</button> -->
          <RouterLink to="/contact_us" class="px-6 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition">Get in Touch</RouterLink>
        </div>
      </div>
    </section>

    <!-- Modals -->
    <RequestConsultationModal v-model="showConsultationModal" @submit="handleConsultationSubmit" :selectedService="selectedService" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import RequestConsultationModal from '@/components/shared/RequestConsultationModal.vue'

const showConsultationModal = ref(false)
const openFaqId = ref(null)
const selectedService = ref(null)

const openConsultationModal = () => (showConsultationModal.value = true)
const toggleFaq = (idx) => (openFaqId.value = openFaqId.value === idx ? null : idx)

const selectService = (service) => {
  selectedService.value = service
  openConsultationModal()
}

const handleConsultationSubmit = (form) => {
  console.log('Consultation request:', form)
  showConsultationModal.value = false
}

const mainServices = [
  {
    id: 1,
    icon: '🏗️',
    title: 'Structural Analysis',
    description: 'FEA-based structural design, optimization, and certification support.'
  },
  {
    id: 2,
    icon: '⚙️',
    title: 'Dynamics Simulation',
    description: 'Multibody dynamics, mechanism analysis, and motion simulation.'
  },
  {
    id: 3,
    icon: '🔊',
    title: 'Acoustics & NVH',
    description: 'Sound and vibration analysis for comfort and compliance.'
  },
  {
    id: 4,
    icon: '🌡️',
    title: 'Thermal Analysis',
    description: 'Thermal management and performance optimization.'
  },
  {
    id: 5,
    icon: '💻',
    title: 'Digital Transformation',
    description: 'Simulation automation and digital twin development.'
  },
  {
    id: 6,
    icon: '📊',
    title: 'Technical Support',
    description: 'Specialized support and troubleshooting for complex projects.'
  }
]

const services = {
  structural: {
    items: [
      'Static and dynamic structural analysis',
      'Nonlinear analysis and material modeling',
      'Composite and laminate design',
      'Optimization and topology optimization',
      'Fatigue and durability analysis',
      'Certification support (aerospace, automotive)'
    ],
    industries: ['Aerospace', 'Automotive', 'Construction', 'Energy', 'Marine'],
    deliverables: 'Detailed reports, design recommendations, optimized CAD models, and certification documentation'
  },
  dynamics: {
    items: [
      'Multibody system simulation',
      'Mechanism design and analysis',
      'Contact and collision analysis',
      'Control system integration',
      'Motion and force prediction',
      'Vehicle dynamics simulation'
    ],
    industries: ['Automotive', 'Aerospace', 'Heavy Equipment', 'Robotics', 'Defense'],
    deliverables: 'Animation reports, kinematic/dynamic results, performance metrics, and design optimization'
  },
  acoustics: {
    items: [
      'Acoustic source identification',
      'Noise radiation analysis',
      'Vibration control design',
      'Soundproofing recommendations',
      'Regulatory compliance assessment',
      'Multi-physics coupled analysis'
    ],
    industries: ['Automotive', 'Aerospace', 'Industrial', 'HVAC', 'Consumer Products'],
    deliverables: 'Acoustic maps, NVH reports, attenuation strategies, and compliance certifications'
  },
  thermal: {
    items: [
      'Thermal transient and steady-state analysis',
      'Heat transfer optimization',
      'CFD for flow analysis',
      'Fluid-structure interaction (FSI)',
      'Phase change and thermal cycling',
      'Component-level to system-level analysis'
    ],
    industries: ['Electronics', 'Automotive', 'Aerospace', 'Energy', 'Medical Devices'],
    deliverables: 'Thermal maps, cooling strategies, performance predictions, and optimization reports'
  },
  digital: {
    items: [
      'Simulation workflow automation',
      'Digital twin development',
      'Cloud-based simulation platforms',
      'Real-time monitoring systems',
      'Data analytics and visualization',
      'PLM and CAD integration'
    ],
    industries: ['Manufacturing', 'Aerospace', 'Automotive', 'Energy', 'Industrial IoT'],
    deliverables: 'Automated workflows, digital twin models, dashboards, and integration documentation'
  }
}

const engagementModels = [
  {
    id: 1,
    title: 'Project-Based',
    description: 'Fixed-scope engineering projects with defined deliverables and timeline.',
    idealFor: ['Specific design challenges', 'One-time projects', 'Design optimization']
  },
  {
    id: 2,
    title: 'Time & Materials',
    description: 'Flexible engagement with hourly or daily rates for ongoing support.',
    idealFor: ['Ongoing support', 'Exploratory work', 'Complex development']
  },
  {
    id: 3,
    title: 'Managed Services',
    description: 'Dedicated resources for long-term engineering support and continuous improvement.',
    idealFor: ['Sustained support', 'Multiple projects', 'Team augmentation']
  },
  {
    id: 4,
    title: 'Training & Knowledge Transfer',
    description: 'Upskill your team with hands-on training and mentoring.',
    idealFor: ['Team development', 'Internal capability', 'Succession planning']
  }
]

const teamCredentials = [
  'Certified MSC Software Consultants',
  '50+ years combined engineering expertise',
  'Industry-recognized specialists',
  'Active in professional engineering societies',
  'Continuous certifications and training'
]

const teamBenefits = [
  'Deep domain expertise across industries',
  'Proven track record with 100+ projects',
  'Client-focused approach',
  'Latest technology and best practices',
  'Rapid problem resolution'
]

const caseStudies = [
  {
    id: 1,
    icon: '✈️',
    title: 'Aircraft Wing Optimization',
    industry: 'Aerospace',
    description: 'Reduced structural weight by 12% through advanced topology optimization using MSC Nastran, while maintaining all certification requirements.',
    result: '12% weight reduction | 18-month project | Certification approved'
  },
  {
    id: 2,
    icon: '🚗',
    title: 'Vehicle Suspension Dynamics',
    industry: 'Automotive',
    description: 'Optimized suspension system performance using Adams multibody simulation, improving ride comfort and handling characteristics.',
    result: '15% improved comfort | 8% reduced NVH | 6-month project'
  },
  {
    id: 3,
    icon: '⚡',
    title: 'Power Electronics Thermal Management',
    industry: 'Energy',
    description: 'Designed efficient cooling strategy for high-power electronics using thermal and fluid analysis, reducing operating temperature by 20°C.',
    result: '20°C temperature reduction | 25% improved reliability | 4-month project'
  },
  {
    id: 4,
    icon: '🏥',
    title: 'Prosthetic Joint Analysis',
    industry: 'Medical',
    description: 'Performed biomechanical analysis and optimization of prosthetic joint design using nonlinear FEA and durability assessment.',
    result: '2x lifetime increase | FDA approved | 10-month project'
  }
]

const projectSteps = [
  {
    title: 'Discovery',
    description: 'Understand challenges and objectives'
  },
  {
    title: 'Planning',
    description: 'Define scope and methodology'
  },
  {
    title: 'Execution',
    description: 'Perform analysis and optimization'
  },
  {
    title: 'Validation',
    description: 'Verify results and document'
  },
  {
    title: 'Delivery',
    description: 'Present solutions and support'
  }
]

const technologyStack = {
  simulation: ['MSC Nastran', 'Adams', 'Actran', 'Marc', 'Dytran', 'MSC Apex'],
  analysis: ['Patran', 'SimXpert', 'MATLAB', 'Python', 'VBA Scripting'],
  integration: ['REST APIs', 'CAD Integration', 'Cloud Platforms', 'Docker', 'Git/CI-CD']
}

const faqs = [
  {
    question: 'What industries do you serve?',
    answer: 'We serve a wide range of industries including aerospace, automotive, energy, medical devices, manufacturing, and consumer products. Our expertise spans from design to certification across multiple engineering disciplines.'
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Project duration varies based on complexity and scope. Simple analysis projects take 2-4 weeks, while comprehensive optimization and certification projects may take 3-12 months. We provide detailed timelines during the discovery phase.'
  },
  {
    question: 'Can you work with existing CAD models?',
    answer: 'Yes, we can work with any industry-standard CAD format (STEP, IGES, Parasolid, etc.). Our team has expertise in model preparation, geometry cleanup, and mesh generation for analysis.'
  },
  {
    question: 'Do you provide IP ownership?',
    answer: 'Yes, you retain full intellectual property ownership of all deliverables, including analysis models, results, and documentation. We can also sign NDA agreements as required.'
  },
  {
    question: 'How is accuracy ensured in simulations?',
    answer: 'We employ industry-standard validation practices including mesh convergence studies, analytical benchmarking, physical testing correlations, and peer reviews. Quality is built into our methodology.'
  },
  {
    question: 'Can we scale from project-based to ongoing support?',
    answer: 'Absolutely. Many clients start with a specific project and transition to managed services as they expand their simulation capabilities. We offer flexible engagement models to grow with your needs.'
  }
]
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
