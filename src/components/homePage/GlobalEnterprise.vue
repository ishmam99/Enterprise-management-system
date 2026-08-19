<template>
  <section class="relative py-20 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
    <!-- Background Decoration -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full filter blur-3xl"></div>
      <div class="absolute bottom-20 right-10 w-72 h-72 bg-purple-400 rounded-full filter blur-3xl"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 bg-blue-100 border border-blue-300 rounded-full px-6 py-3 mb-4">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="text-blue-700 font-bold text-sm">Our Global Network</span>
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
          HTB Global Enterprise Family
        </h2>
        <p class="text-xl text-gray-600 max-w-4xl mx-auto">
          A powerful ecosystem of specialized companies delivering world-class solutions across engineering software, IT services, and staffing
        </p>
      </div>

      <!-- Main Content -->
      <div class="grid lg:grid-cols-5 gap-8 mb-12">
        <!-- Left: Visual/Image - Takes 2 columns -->
        <div class="lg:col-span-2">
          <div class="sticky top-24">
            <!-- Stats Overview -->
            <div class="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 text-white mb-6 shadow-2xl">
              <h3 class="text-2xl font-bold mb-6">Our Global Reach</h3>
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div class="text-3xl font-bold mb-1">3</div>
                  <div class="text-blue-200 text-sm">Companies</div>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div class="text-3xl font-bold mb-1">500+</div>
                  <div class="text-blue-200 text-sm">Global Clients</div>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div class="text-3xl font-bold mb-1">25+</div>
                  <div class="text-blue-200 text-sm">Years Experience</div>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div class="text-3xl font-bold mb-1">24/7</div>
                  <div class="text-blue-200 text-sm">Support</div>
                </div>
              </div>
            </div>

            <!-- Image -->
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl blur-2xl opacity-30 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div class="relative bg-white p-4 rounded-2xl shadow-2xl border-2 border-blue-100">
                <img
                  src="../../assets/images/digital_executive_final.jpg"
                  alt="HTB Global Enterprise"
                  class="rounded-xl object-cover w-full group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Company Cards - Takes 3 columns -->
        <div class="lg:col-span-3 space-y-6">
          <div 
            v-for="(company, index) in companies" 
            :key="index" 
            class="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
            :class="[
              index === 0 ? 'hover:border-blue-400' : '',
              index === 1 ? 'hover:border-purple-400' : '',
              index === 2 ? 'hover:border-cyan-400' : ''
            ]"
          >
            <!-- Gradient Top Border -->
            <div 
              class="h-1.5"
              :class="[
                index === 0 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : '',
                index === 1 ? 'bg-gradient-to-r from-purple-500 to-pink-500' : '',
                index === 2 ? 'bg-gradient-to-r from-cyan-500 to-teal-500' : ''
              ]"
            ></div>

            <div class="p-6 md:p-8">
              <!-- Company Header -->
              <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div class="flex items-start gap-4 flex-1">
                  <div 
                    class="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg transform group-hover:scale-110 transition-transform duration-300"
                    :class="[
                      index === 0 ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : '',
                      index === 1 ? 'bg-gradient-to-br from-purple-500 to-pink-500' : '',
                      index === 2 ? 'bg-gradient-to-br from-cyan-500 to-teal-500' : ''
                    ]"
                  >
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 
                      class="text-xl md:text-2xl font-bold text-gray-900 mb-2 transition-colors"
                      :class="[
                        index === 0 ? 'group-hover:text-blue-600' : '',
                        index === 1 ? 'group-hover:text-purple-600' : '',
                        index === 2 ? 'group-hover:text-cyan-600' : ''
                      ]"
                    >
                      {{ company.name }}
                    </h3>
                    <div class="flex flex-wrap gap-2 mb-3">
                      <span 
                        v-for="(tag, tagIndex) in company.tags" 
                        :key="tagIndex"
                        class="text-xs px-3 py-1 rounded-full font-semibold"
                        :class="[
                          index === 0 ? 'bg-blue-100 text-blue-700' : '',
                          index === 1 ? 'bg-purple-100 text-purple-700' : '',
                          index === 2 ? 'bg-cyan-100 text-cyan-700' : ''
                        ]"
                      >
                        {{ tag }}
                      </span>
                    </div>
                  </div>
                </div>
                
                <a
                  :href="company.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex-shrink-0 inline-flex items-center gap-2 font-bold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group/btn text-white"
                  :class="[
                    index === 0 ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700' : '',
                    index === 1 ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' : '',
                    index === 2 ? 'bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700' : ''
                  ]"
                >
                  <span>Visit Site</span>
                  <svg class="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>
              </div>

              <!-- Description -->
              <p class="text-gray-600 leading-relaxed mb-4">
                {{ company.description }}
              </p>

              <!-- Key Features -->
              <div class="grid md:grid-cols-2 gap-3">
                <div 
                  v-for="(feature, featureIndex) in company.features" 
                  :key="featureIndex"
                  class="flex items-start gap-2"
                >
                  <svg 
                    class="w-5 h-5 mt-0.5 flex-shrink-0"
                    :class="[
                      index === 0 ? 'text-blue-500' : '',
                      index === 1 ? 'text-purple-500' : '',
                      index === 2 ? 'text-cyan-500' : ''
                    ]"
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="text-gray-700 text-sm">{{ feature }}</span>
                </div>
              </div>
            </div>

            <!-- Hover Effect Border -->
            <div 
              class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border-2"
              :class="[
                index === 0 ? 'border-blue-400' : '',
                index === 1 ? 'border-purple-400' : '',
                index === 2 ? 'border-cyan-400' : ''
              ]"
            ></div>
          </div>
        </div>
      </div>

      <!-- Strength Section -->
      <div class="mt-16 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
        <div class="text-center mb-10">
          <h3 class="text-3xl md:text-4xl font-bold mb-4">
            Collective Strength, Individual Excellence
          </h3>
          <p class="text-xl text-blue-100 max-w-3xl mx-auto">
            Together, our companies form a comprehensive ecosystem to serve all your technology and business needs
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
            <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
              <svg class="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h4 class="text-xl font-bold mb-2">Comprehensive Solutions</h4>
            <p class="text-blue-100 text-sm">From software to staffing, IT to engineering - we cover all your technology needs</p>
          </div>

          <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
            <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
              <svg class="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h4 class="text-xl font-bold mb-2">Unified Support</h4>
            <p class="text-blue-100 text-sm">Seamless collaboration across our companies to deliver integrated solutions</p>
          </div>

          <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
            <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
              <svg class="w-7 h-7 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h4 class="text-xl font-bold mb-2">Global Presence</h4>
            <p class="text-blue-100 text-sm">Serving clients worldwide with local expertise and global resources</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const companies = [
  {
    name: "CAE SoftSys, Inc.",
    description:
      "Research and development oriented engineering and consultancy solutions provider committed to delivering exceptional value through cutting-edge CAE technologies and expert analysis services.",
    link: "https://caesoftsys.net/",
    tags: ["Engineering", "CAE Solutions", "R&D"],
    features: [
      "FEA & CFD Analysis Services",
      "Design Optimization",
      "Technical Consulting",
      "Simulation Expertise"
    ]
  },
  {
    name: "Hi-Tech Bangla Information Systems, Inc.",
    description:
      "Leading Verizon channel partner delivering comprehensive managed IT and telecom solutions, empowering business enterprises with reliable, scalable technology infrastructure.",
    link: "https://htb-is.com/",
    tags: ["IT Services", "Telecom", "Verizon Partner"],
    features: [
      "Managed IT Solutions",
      "Telecom Services",
      "Network Infrastructure",
      "Cloud Solutions"
    ]
  },
  {
    name: "Hi-Tech Bangla Staffing Services, Inc.",
    description:
      "Premier staffing service provider specializing in IT talent acquisition. Our mission: minimize downtime and streamline your hiring process with top-tier professionals.",
    link: "http://hi-techbanglastaffing.com/",
    tags: ["Staffing", "IT Recruitment", "Talent Solutions"],
    features: [
      "IT Staffing Solutions",
      "Contract & Permanent Placement",
      "Technical Recruitment",
      "Rapid Deployment"
    ]
  },
]
</script>
