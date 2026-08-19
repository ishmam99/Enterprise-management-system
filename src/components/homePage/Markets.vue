<template>
  <section class="relative py-24 overflow-hidden bg-slate-900">
    <!-- Smooth transition from the light About section above -->
    <div
      class="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white to-transparent pointer-events-none"
    />

    <!-- Subtle background pattern / glow -->
    <div
      class="absolute inset-0 opacity-30"
      style="
        background-image: radial-gradient(circle at 20% 50%, rgba(37, 99, 235, 0.15) 0%, transparent 60%),
                          radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.08) 0%, transparent 50%);
      "
    />

    <div class="relative container mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <div
          class="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-400/30 backdrop-blur px-4 py-2 rounded-full mb-4"
        >
          <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
          <span class="text-sm font-medium tracking-wide text-blue-300">
            Markets
          </span>
        </div>

        <h2 class="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
          Markets We Serve
        </h2>

        <p class="text-lg text-gray-400 max-w-2xl mx-auto">
          Specialized composite solutions across three core industries.
        </p>
      </div>

      <!-- Three Industry Cards -->
      <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        
        <!-- Card 1: Aerospace & Defense -->
        <div
          class="group bg-slate-800/60 backdrop-blur-sm border border-white/10 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-600/10"
        >
          <div
            class="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center mb-6 group-hover:bg-blue-600/30 transition"
          >
            <!-- Aircraft / Shield Icon -->
            <svg
              class="w-8 h-8 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.813 15.904L9 18.75l-.083-2.5-2.5-.083 2.854-.813L9.813 15.904zm0 0l5.292-5.292m-5.292 5.292l1.792-1.792m5.292-5.292l1.792-1.792m-5.292 5.292L15.904 9.813zm0 0l2.854-.813-2.5-.083L18.75 9l-2.854-.813z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6.75L6.75 12 12 17.25 17.25 12 12 6.75z"
              />
            </svg>
          </div>

          <h3 class="text-2xl font-bold text-white mb-3">
            Aerospace &amp; Defense
          </h3>

          <p class="text-gray-400 leading-relaxed mb-6">
            High‑performance radomes, lightweight structural components, and EMI shielding for mission‑critical aircraft, UAVs, and ground defense systems.
          </p>

          <div class="flex items-center gap-2 text-blue-400 font-medium text-sm group-hover:gap-3 transition-all">
            <span>Learn More</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </div>
        </div>

        <!-- Card 2: Medical Imaging -->
        <div
          class="group bg-slate-800/60 backdrop-blur-sm border border-white/10 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-600/10"
        >
          <div
            class="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center mb-6 group-hover:bg-blue-600/30 transition"
          >
            <!-- Medical / Scanner Icon -->
            <svg
              class="w-8 h-8 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.75 9.75L12 12m0 0l2.25-2.25M12 12l2.25 2.25M12 12L9.75 14.25M12 12v4.5m0-4.5V7.5M12 12l4.5 0M12 12l-4.5 0"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6.75a3.75 3.75 0 00-7.5 0v10.5a3.75 3.75 0 007.5 0V6.75z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 12a7.5 7.5 0 01-15 0 7.5 7.5 0 0115 0z"
              />
            </svg>
          </div>

          <h3 class="text-2xl font-bold text-white mb-3">
            Medical Imaging
          </h3>

          <p class="text-gray-400 leading-relaxed mb-6">
            Precision composite enclosures, patient‑handling components, and non‑magnetic structures for MRI, CT, and PET scanners requiring radiolucent properties.
          </p>

          <div class="flex items-center gap-2 text-blue-400 font-medium text-sm group-hover:gap-3 transition-all">
            <span>Learn More</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </div>
        </div>

        <!-- Card 3: Commercial & Space -->
        <div
          class="group bg-slate-800/60 backdrop-blur-sm border border-white/10 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-600/10"
        >
          <div
            class="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center mb-6 group-hover:bg-blue-600/30 transition"
          >
            <!-- Rocket / Satellite Icon -->
            <svg
              class="w-8 h-8 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
              />
            </svg>
          </div>

          <h3 class="text-2xl font-bold text-white mb-3">
            Commercial &amp; Space
          </h3>

          <p class="text-gray-400 leading-relaxed mb-6">
            Durable, high‑strength composite assemblies for satellite systems, launch vehicles, and next‑generation commercial aircraft platforms.
          </p>

          <div class="flex items-center gap-2 text-blue-400 font-medium text-sm group-hover:gap-3 transition-all">
            <span>Learn More</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="text-center mt-16">
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold transition shadow-lg shadow-blue-600/30"
        >
          View All Capabilities
        </button>
      </div>
    </div>

    <!-- Subtle bottom transition (fading to the next light section) -->
    <!-- <div
      class="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"
    /> -->
  </section>
</template>