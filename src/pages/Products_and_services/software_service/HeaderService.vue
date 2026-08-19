<template>
  <section class="pb-10">
    <!-- Header Section -->
    <div
      class="relative bg-gradient-to-r from-sky-300 to-blue-500 text-slate-200 py-12 flex flex-col items-center justify-center h-[400px] max-w-full"
    >
      <div class="absolute inset-0">
        <img
          :src="imgHead"
          alt="Software Service"
          class="w-full h-full object-cover opacity-90"
        />
      </div>

      <div class="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-6">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span class="text-white font-semibold">Expert Software Services</span>
        </div>
        
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Software Services
          <span class="block mt-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Experience to its Limit
          </span>
        </h1>
        
        <p class="text-xl md:text-2xl text-blue-100 max-w-3xl mb-8">
          Comprehensive software services with FREE 24/7 support, expert training, and implementation assistance
        </p>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="$emit('open-quote')"
            class="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span>Get FREE Quote</span>
          </button>
          <button
            @click="$emit('open-demo')"
            class="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            <span>Request Demo</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <div
        class="bg-white shadow-2xl border border-gray-300 rounded-2xl p-8 md:p-10 text-gray-800 font-serif leading-relaxed text-lg md:text-xl"
      >
        <div class="max-w-4xl mx-auto">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-1 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
            <h2 class="text-2xl font-bold text-gray-900">About Our Software Services</h2>
          </div>
          <p class="mb-6">
            Hi-tech SoftSys, Inc. provides comprehensive software services simultaneously with
            software sales. We are expert in serving ten different industries
            according to their needs. Our experts are capable of delivering all
            the software solutions & Technical support for our clients 24/7 on
            demand.
          </p>
          <p class="mb-6">
            Moreover, we provide cost-effective software solutions and
            technical support to our customers so that they can enjoy modern
            engineering solutions with minimal pricing.
          </p>
          
          <!-- Key Features Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div class="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
              <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p class="text-sm text-gray-600">Round-the-clock technical assistance</p>
            </div>
            <div class="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Expert Training</h3>
              <p class="text-sm text-gray-600">Comprehensive training programs</p>
            </div>
            <div class="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Industry Expertise</h3>
              <p class="text-sm text-gray-600">10+ industries served</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import imgHead from '@/assets/images/serv-software.jpg'

defineEmits(['open-demo', 'open-quote'])
</script>
