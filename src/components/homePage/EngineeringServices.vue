<template>
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
</template>

<script setup>
// No script needed
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.2;
  }
}
</style>

