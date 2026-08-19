<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-[#0a1d3b] to-[#133c8b] text-white py-20">
      <div class="container mx-auto px-6 md:px-16 lg:px-24">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <i class="fa-solid fa-rocket text-yellow-400"></i>
            <span class="text-sm font-semibold">Limited Time Offer</span>
          </div>
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Exclusive <span class="text-yellow-400">Promotions</span>
          </h1>
          <p class="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
            Unlock incredible savings and special offers designed to accelerate your business growth
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button class="bg-yellow-400 hover:bg-yellow-300 text-[#0a1d3b] font-bold px-8 py-4 rounded-xl text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl">
              <i class="fa-solid fa-bolt mr-2"></i>
              Claim Offer Now
            </button>
            <button class="border-2 border-white/50 hover:border-white text-white font-semibold px-8 py-4 rounded-xl text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <i class="fa-solid fa-play mr-2"></i>
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Promotion Cards -->
    <section class="py-20">
      <div class="container mx-auto px-6 md:px-16 lg:px-24">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Current <span class="text-blue-600">Promotions</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our latest offers and special deals tailored for your success
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          <!-- Promotion Card 1 -->
          <div class="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 group hover:transform hover:-translate-y-2 transition-all duration-500">
            <div class="relative">
              <div class="bg-gradient-to-r from-blue-600 to-purple-600 h-48 flex items-center justify-center">
                <i class="fa-solid fa-star text-white text-6xl opacity-20"></i>
                <div class="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                  -30% OFF
                </div>
              </div>
            </div>
            <div class="p-8">
              <div class="flex items-center gap-2 mb-4">
                <span class="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                  <i class="fa-solid fa-clock mr-1"></i>
                  7 Days Left
                </span>
                <span class="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
                  Popular
                </span>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">Software Suite Pro</h3>
              <p class="text-gray-600 text-lg mb-6 leading-relaxed">
                Complete engineering software package with premium support and training sessions included.
              </p>
              <div class="flex items-center justify-between mb-6">
                <div>
                  <span class="text-3xl font-bold text-gray-900">$2,499</span>
                  <span class="text-lg text-gray-500 line-through ml-2">$3,570</span>
                </div>
                <div class="text-right">
                  <span class="text-green-600 font-bold text-lg flex items-center gap-1">
                    <i class="fa-solid fa-chart-line"></i>
                    Save $1,071
                  </span>
                </div>
              </div>
              <button class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg">
                <i class="fa-solid fa-cart-shopping mr-2"></i>
                Get This Deal
              </button>
            </div>
          </div>

          <!-- Promotion Card 2 -->
          <div class="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 group hover:transform hover:-translate-y-2 transition-all duration-500">
            <div class="relative">
              <div class="bg-gradient-to-r from-green-500 to-emerald-600 h-48 flex items-center justify-center">
                <i class="fa-solid fa-gem text-white text-6xl opacity-20"></i>
                <div class="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                  FREE Trial
                </div>
              </div>
            </div>
            <div class="p-8">
              <div class="flex items-center gap-2 mb-4">
                <span class="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                  <i class="fa-solid fa-clock mr-1"></i>
                  14 Days Left
                </span>
                <span class="bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full">
                  New
                </span>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">Enterprise Cloud Package</h3>
              <p class="text-gray-600 text-lg mb-6 leading-relaxed">
                30-day free trial of our enterprise cloud solutions with full feature access and dedicated support.
              </p>
              <div class="flex items-center justify-between mb-6">
                <div>
                  <span class="text-3xl font-bold text-gray-900">$0</span>
                  <span class="text-lg text-gray-500 ml-2">first month</span>
                </div>
                <div class="text-right">
                  <span class="text-green-600 font-bold text-lg flex items-center gap-1">
                    <i class="fa-solid fa-gift"></i>
                    No Commitment
                  </span>
                </div>
              </div>
              <button class="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg">
                <i class="fa-solid fa-play mr-2"></i>
                Start Free Trial
              </button>
            </div>
          </div>

          <!-- Promotion Card 3 -->
          <div class="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 group hover:transform hover:-translate-y-2 transition-all duration-500">
            <div class="relative">
              <div class="bg-gradient-to-r from-purple-500 to-pink-600 h-48 flex items-center justify-center">
                <i class="fa-solid fa-crown text-white text-6xl opacity-20"></i>
                <div class="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                  Bundle Deal
                </div>
              </div>
            </div>
            <div class="p-8">
              <div class="flex items-center gap-2 mb-4">
                <span class="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                  <i class="fa-solid fa-clock mr-1"></i>
                  21 Days Left
                </span>
                <span class="bg-red-100 text-red-700 text-sm font-medium px-3 py-1 rounded-full">
                  Limited
                </span>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">Team Training Bundle</h3>
              <p class="text-gray-600 text-lg mb-6 leading-relaxed">
                Complete training package for teams of 5+ with certification and ongoing mentorship included.
              </p>
              <div class="flex items-center justify-between mb-6">
                <div>
                  <span class="text-3xl font-bold text-gray-900">$4,999</span>
                  <span class="text-lg text-gray-500 line-through ml-2">$7,850</span>
                </div>
                <div class="text-right">
                  <span class="text-green-600 font-bold text-lg flex items-center gap-1">
                    <i class="fa-solid fa-users"></i>
                    Team Discount
                  </span>
                </div>
              </div>
              <button class="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg">
                <i class="fa-solid fa-users mr-2"></i>
                Team Enrollment
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-6 md:px-16 lg:px-24">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Our <span class="text-blue-600">Promotions</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Exceptional value with benefits that go beyond just savings
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center group hover:transform hover:-translate-y-2 transition-all duration-300">
            <div class="bg-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
              <i class="fa-solid fa-shield-alt text-blue-600 text-2xl group-hover:text-white"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Premium Support</h3>
            <p class="text-gray-600">24/7 dedicated support with guaranteed response times</p>
          </div>

          <div class="text-center group hover:transform hover:-translate-y-2 transition-all duration-300">
            <div class="bg-green-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600 transition-colors duration-300">
              <i class="fa-solid fa-graduation-cap text-green-600 text-2xl group-hover:text-white"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Free Training</h3>
            <p class="text-gray-600">Comprehensive training sessions and certification</p>
          </div>

          <div class="text-center group hover:transform hover:-translate-y-2 transition-all duration-300">
            <div class="bg-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-600 transition-colors duration-300">
              <i class="fa-solid fa-sync-alt text-purple-600 text-2xl group-hover:text-white"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Flexible Terms</h3>
            <p class="text-gray-600">Easy upgrades, downgrades, and cancellation options</p>
          </div>

          <div class="text-center group hover:transform hover:-translate-y-2 transition-all duration-300">
            <div class="bg-orange-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-600 transition-colors duration-300">
              <i class="fa-solid fa-chart-line text-orange-600 text-2xl group-hover:text-white"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">ROI Focused</h3>
            <p class="text-gray-600">Proven results and measurable business impact</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-[#0a1d3b] to-[#133c8b] text-white">
      <div class="container mx-auto px-6 md:px-16 lg:px-24">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-4xl md:text-5xl font-bold mb-6">
            Don't Miss Out on These <span class="text-yellow-400">Exclusive Deals</span>
          </h2>
          <p class="text-xl text-blue-100 mb-8 leading-relaxed">
            These offers are available for a limited time only. Secure your promotion before it's gone!
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button class="bg-yellow-400 hover:bg-yellow-300 text-[#0a1d3b] font-bold px-8 py-4 rounded-xl text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl">
              <i class="fa-solid fa-bolt mr-2"></i>
              Claim Your Promotion
            </button>
            <button class="border-2 border-white/50 hover:border-white text-white font-semibold px-8 py-4 rounded-xl text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <i class="fa-solid fa-phone mr-2"></i>
              Talk to Sales
            </button>
          </div>
          <div class="mt-8 flex items-center justify-center gap-4 text-blue-200">
            <i class="fa-solid fa-clock"></i>
            <span class="font-semibold">Offers end soon - Act fast!</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>

</script>

<style scoped>

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.floating {
  animation: float 3s ease-in-out infinite;
}
</style>