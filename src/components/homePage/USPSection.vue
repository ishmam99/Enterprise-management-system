<template>
  <section class="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-0 left-0 w-96 h-96 bg-cyan-400 rounded-full filter blur-3xl animate-pulse"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <!-- Main USP Header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-6 py-3 mb-6">
          <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
          </svg>
          <span class="text-yellow-300 font-bold text-lg">Industry-First Complete Solution</span>
        </div>
        
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Why Choose Hi-Tech SoftSys?
        </h2>
        
        <p class="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-8">
          We don't just sell software - we deliver a <span class="text-yellow-400 font-bold">complete end-to-end solution</span> that no other company offers!
        </p>

        <!-- Key USP Statement -->
        <!-- <div class="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-8 md:p-12 max-w-5xl mx-auto shadow-2xl border-4 border-yellow-400/50 mb-12">
          <div class="flex items-start gap-4 mb-6">
            <div class="flex-shrink-0 w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <svg class="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
              </svg>
            </div>
            <div class="text-left flex-1">
              <h3 class="text-2xl md:text-3xl font-bold text-white mb-4">
                🎁 Purchase MSC Software License & Get Absolutely FREE:
              </h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-white flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <div>
                    <p class="text-white font-bold text-lg">✓ FREE 24/7 Technical Support</p>
                    <p class="text-yellow-100 text-sm">No additional cost, lifetime support</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-white flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <div>
                    <p class="text-white font-bold text-lg">✓ FREE Software Training</p>
                    <p class="text-yellow-100 text-sm">Expert-led training programs included</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border-2 border-white/30">
            <p class="text-white text-lg font-semibold text-center">
              💡 <span class="text-yellow-200">No hidden costs. No surprises. Just complete support - absolutely FREE!</span>
            </p>
          </div>
        </div> -->
      </div>

      <!-- Complete Solution Flow -->
      <div class="mb-16">
        <h3 class="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          Our Complete End-to-End Solution
        </h3>
        
        <div class="grid md:grid-cols-4 gap-6">
          <!-- Step 1 -->
          <div class="relative">
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 h-full">
              <div class="flex justify-center mb-4">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  1
                </div>
              </div>
              <h4 class="text-xl font-bold text-white mb-3 text-center">Software Sales</h4>
              <p class="text-blue-200 text-center text-sm">
                Purchase authentic MSC software licenses at competitive prices
              </p>
            </div>
            <!-- Arrow -->
            <div class="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
              <svg class="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="relative">
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 h-full">
              <div class="flex justify-center mb-4">
                <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  2
                </div>
              </div>
              <div class="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                FREE
              </div>
              <h4 class="text-xl font-bold text-white mb-3 text-center">Installation & Support</h4>
              <p class="text-blue-200 text-center text-sm">
                Free installation, configuration & 24/7 technical support
              </p>
            </div>
            <!-- Arrow -->
            <div class="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
              <svg class="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="relative">
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 h-full">
              <div class="flex justify-center mb-4">
                <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  3
                </div>
              </div>
              <div class="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                FREE
              </div>
              <h4 class="text-xl font-bold text-white mb-3 text-center">Training Programs</h4>
              <p class="text-blue-200 text-center text-sm">
                Free comprehensive training on-site or online
              </p>
            </div>
            <!-- Arrow -->
            <div class="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
              <svg class="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>

          <!-- Step 4 -->
          <div class="relative">
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 h-full">
              <div class="flex justify-center mb-4">
                <div class="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  4
                </div>
              </div>
              <h4 class="text-xl font-bold text-white mb-3 text-center">Engineering Services</h4>
              <p class="text-blue-200 text-center text-sm">
                Optional: FEA/CFD analysis as your contractual partner
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Comparison/Why We're Different -->
      <div class="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/20">
        <div class="text-center mb-8">
          <h3 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Why No Other Company Matches Our Value
          </h3>
          <p class="text-blue-200 text-lg">
            See what makes Hi-Tech SoftSys the #1 choice for MSC Software solutions
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <!-- Benefit 1 -->
          <div class="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6 border-2 border-blue-400/30">
            <div class="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h4 class="text-xl font-bold text-white mb-3 text-center">Save Thousands</h4>
            <p class="text-blue-100 text-center">
              Others charge separately for support & training. We include it FREE - saving you $10,000+ annually
            </p>
          </div>

          <!-- Benefit 2 -->
          <div class="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border-2 border-green-400/30">
            <div class="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h4 class="text-xl font-bold text-white mb-3 text-center">Complete Peace of Mind</h4>
            <p class="text-blue-100 text-center">
              From purchase to deployment to training - we handle everything. You focus on your engineering work
            </p>
          </div>

          <!-- Benefit 3 -->
          <div class="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border-2 border-purple-400/30">
            <div class="w-14 h-14 bg-purple-500 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h4 class="text-xl font-bold text-white mb-3 text-center">Long-term Partnership</h4>
            <p class="text-blue-100 text-center">
              We're not just vendors - we're your engineering partners. Need analysis services? We've got you covered
            </p>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="text-center mt-12">
        <p class="text-2xl md:text-3xl text-yellow-300 font-bold mb-6">
          Ready to experience the Hi-Tech SoftSys advantage?
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact_us"
            class="group relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-bold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl text-center"
          >
            <span class="relative z-10 flex items-center justify-center gap-2">
              Get Your FREE Quote Now
              <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </span>
          </a>
          
          <a
            href="/Products_and_services/Software_Sales/Engineering_Software_List"
            class="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-lg border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 text-center"
          >
            View MSC Software Catalog
          </a>
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

