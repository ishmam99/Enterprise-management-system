<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="relative h-[500px] md:h-[600px] bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-96 h-96 bg-cyan-400 rounded-full filter blur-3xl animate-pulse"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      </div>
      
      <div class="relative container mx-auto px-6 h-full flex flex-col justify-center items-center text-center text-white">
        <div class="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-6 py-3 mb-6">
          <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
          <span class="text-blue-200 font-semibold">About Hi-Tech SoftSys</span>
        </div>
        
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Engineering Excellence Through
          <span class="block mt-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Innovation & Partnership
          </span>
        </h1>
        
        <p class="text-xl md:text-2xl text-blue-100 max-w-4xl mb-8">
          Empowering businesses worldwide with cutting-edge engineering software, expert support, and comprehensive solutions since 2015
        </p>

        <div class="flex flex-col sm:flex-row gap-4">
          <a href="#mission" class="px-8 py-4 bg-white text-blue-900 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 hover:scale-105">
            Our Mission
          </a>
          <a href="/contact_us" class="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-300 hover:scale-105">
            Contact Us
          </a>
        </div>
      </div>
    </section>

    <!-- Mission, Vision, Values -->
    <section id="mission" class="py-20 bg-gradient-to-b from-white to-gray-50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Foundation
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Built on principles of excellence, innovation, and unwavering commitment to client success
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Mission -->
          <div class="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-400">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform">
              <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p class="text-gray-600 leading-relaxed">
              To strategically partner with our clients as an extension of their teams, delivering the right resources, process advancements, and technology solutions at the right time to exceed their business objectives.
            </p>
          </div>

          <!-- Vision -->
          <div class="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-purple-400">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform">
              <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p class="text-gray-600 leading-relaxed">
              To be the world's most trusted partner for engineering software solutions, recognized for innovation, exceptional service, and transformative client partnerships.
            </p>
          </div>

          <!-- Values -->
          <div class="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-400">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform">
              <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
            <p class="text-gray-600 leading-relaxed">
              Excellence, integrity, innovation, and client-first approach drive everything we do. We believe in building lasting partnerships based on trust and exceptional value delivery.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Company Story -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Story</span>
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
              Welcome to Hi-Tech SoftSys
            </h2>
            <div class="space-y-6 text-gray-700 leading-relaxed">
              <p class="text-lg">
                As a global provider of Resources, Processes, and Technology Solutions, <span class="font-bold text-gray-900">Hi-Tech SoftSys</span> strategically partners with our clients to force-multiply their teams, accelerate their product development processes, and exceed their key business initiative requirements.
              </p>
              <p>
                Our partnerships are uniquely provided to every client as a strategic extension of their teams, in the context of their specific timelines, objectives and funding justifications, delivering the right resources, process advancements and technology solutions at the right time.
              </p>
              <p>
                Founded in <span class="font-bold text-blue-600">2015</span>, our team continues to grow to support our clients' full spectrum of needs, from resource staffing to departmental point-solutions, virtual training and skills transfer, Sr. Analysts (PhD) mentoring, deployment of virtual test labs, global enterprise collaboration, and much more.
              </p>
            </div>
          </div>

          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl blur-2xl opacity-20"></div>
            <div class="relative bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 text-white shadow-2xl">
              <h3 class="text-2xl font-bold mb-6">Key Achievements</h3>
              <div class="grid grid-cols-2 gap-6">
                <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div class="text-4xl font-bold mb-2">2015</div>
                  <div class="text-blue-200 text-sm">Founded</div>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div class="text-4xl font-bold mb-2">42K+</div>
                  <div class="text-blue-200 text-sm">Companies in CRM</div>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div class="text-4xl font-bold mb-2">10+</div>
                  <div class="text-blue-200 text-sm">Industries Served</div>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div class="text-4xl font-bold mb-2">24/7</div>
                  <div class="text-blue-200 text-sm">Global Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Engineering & Software Reselling -->
    <section class="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div class="container mx-auto px-6">
        <div class="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <div class="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-6">
            <h2 class="text-3xl md:text-4xl font-bold text-white">
              Engineering & Software Reselling Program
            </h2>
          </div>
          <div class="p-8 md:p-12">
            <div class="space-y-6 text-gray-700 leading-relaxed">
              <p class="text-lg">
                <span class="font-bold text-gray-900">Hi-Tech SoftSys, Inc.</span> is an experienced Engineering Software reselling company. We provide Engineering software solutions for ten different industries over the period of the last ten years.
              </p>
              <p>
                Having vast experience in software reselling programs, we continue to work with multiple partners as a valuable software reseller. Our focus is on reselling Engineering Design & Engineering Analysis related software which are on the most priority list worldwide.
              </p>
              <div class="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                <div class="flex items-start gap-4">
                  <svg class="w-8 h-8 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                  <div>
                    <p class="font-bold text-blue-900 mb-2">World-Class CRM Database</p>
                    <p class="text-gray-700">
                      Our state-of-the-art CRM carries more than <span class="font-bold text-blue-600">42,000 companies'</span> detailed information with updated points of contact across ten different industries.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Teams Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <span class="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Teams</span>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Expert Teams Driving Success
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Dedicated professionals working 24/7 to deliver exceptional results and drive your business forward
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Marketing Team -->
          <div class="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-purple-200 hover:border-purple-400">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-900">Marketing Team</h3>
                <p class="text-purple-600 font-semibold">8 Members</p>
              </div>
            </div>
            <p class="text-gray-700 mb-4 leading-relaxed">
              Hi-Tech SoftSys follows a clear marketing process integrated in our CRM. Our dedicated team works relentlessly 24/7, highly capable of establishing the brand by building and running campaigns efficiently.
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">Brand Building</span>
              <span class="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">24/7 Operations</span>
              <span class="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">CRM Integration</span>
            </div>
          </div>

          <!-- Business Development Team -->
          <div class="group bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-blue-200 hover:border-blue-400">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-900">Business Development</h3>
                <p class="text-blue-600 font-semibold">10 Members</p>
              </div>
            </div>
            <p class="text-gray-700 mb-4 leading-relaxed">
              Following a strong business development process, our team works thoroughly to cover business in both US & International markets, utilizing our enriched CRM database to make development plans a reality.
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">Global Reach</span>
              <span class="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">Strategic Growth</span>
              <span class="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">Market Expansion</span>
            </div>
          </div>

          <!-- Sales Team -->
          <div class="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-green-200 hover:border-green-400">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-900">Sales Team</h3>
                <p class="text-green-600 font-semibold">10 Members</p>
              </div>
            </div>
            <p class="text-gray-700 mb-4 leading-relaxed">
              Our sales team members are capable of not only deal generation but also experts in closing. They are precise and clear when delivering to our valuable clients, executing sales flawlessly for over 10 years.
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">Deal Closing</span>
              <span class="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">Client Relations</span>
              <span class="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">10+ Years Exp</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Partnership Program -->
    <!-- <section class="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div class="container mx-auto px-6">
        <div class="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 class="text-3xl md:text-4xl font-bold mb-4">
                Become Our Reseller Partner
              </h2>
              <p class="text-xl text-orange-100 mb-6">
                Hi-Tech SoftSys values its partners and is actively developing more partnerships around the world.
              </p>
              <p class="text-lg text-orange-50 mb-8">
                As a partner, we are committed to helping you gain more profitable business and deliver quality services to your clients.
              </p>
              <a href="/contact_us" class="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-orange-50 transition-all duration-300 hover:scale-105 shadow-lg">
                <span>Partner With Us</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </a>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <svg class="w-10 h-10 text-white mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p class="font-bold text-sm">Profitable Business</p>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <svg class="w-10 h-10 text-white mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
                <p class="font-bold text-sm">Quality Services</p>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <svg class="w-10 h-10 text-white mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <p class="font-bold text-sm">Global Network</p>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <svg class="w-10 h-10 text-white mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                <p class="font-bold text-sm">Dedicated Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- Why Choose Us -->
    <section class="py-20 bg-gradient-to-b from-white to-blue-50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Partner With Hi-Tech SoftSys?
          </h2>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
            <h4 class="font-bold text-gray-900 mb-2">Expert Team</h4>
            <p class="text-gray-600 text-sm">28+ professionals across all departments</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h4 class="font-bold text-gray-900 mb-2">Proven Track Record</h4>
            <p class="text-gray-600 text-sm">10+ years of excellence in service delivery</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h4 class="font-bold text-gray-900 mb-2">Global Presence</h4>
            <p class="text-gray-600 text-sm">Serving clients across 10+ industries worldwide</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-7 h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
              </svg>
            </div>
            <h4 class="font-bold text-gray-900 mb-2">Complete Solutions</h4>
            <p class="text-gray-600 text-sm">Software + Support + Training + Engineering</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Experience Excellence?
        </h2>
        <p class="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
          Join hundreds of satisfied clients who trust Hi-Tech SoftSys for their engineering software and services needs
        </p>
        <!-- <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="openQuoteModal"
            class="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-bold rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Get FREE Quote
          </button>
          <button
            @click="openDemoModal"
            class="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            Request FREE Demo
          </button>
        </div> -->
      </div>
    </section>

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
/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}
</style>