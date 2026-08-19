<template>
  <section>
    <!-- Hero Header Section -->
    <div class="relative bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
      <div class="absolute inset-0">
        <img
          :src="imgHead"
          alt="MSC Software Catalog"
          class="w-full h-full object-cover opacity-20"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-indigo-900/80 to-purple-900/90"></div>
      </div>

      <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
            <svg class="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
            </svg>
            <span class="text-blue-200 font-semibold">Complete Software Catalog</span>
          </div>
          
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            MSC Software
            <span class="block mt-2 bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
              Engineering Solutions
            </span>
          </h1>
          
          <p class="text-xl md:text-2xl text-gray-200 leading-relaxed mb-8">
            Hi-Tech SoftSys, Inc. partnered with MSC Software works as a software reseller globally. We provide comprehensive software solutions across 12 different industries with over 10 years of excellence.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              @click="emit('open-quote')"
              class="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 hover:scale-105 shadow-xl inline-flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <span>Get FREE Quote</span>
            </button>
            <button
              @click="emit('open-demo')"
              class="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/20 transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              <span>Request Demo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import imgHead from '@/assets/images/softwareEng.png'

const emit = defineEmits(['open-demo', 'open-quote'])
</script>
