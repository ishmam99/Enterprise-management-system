<template>
  <section class="relative py-24 overflow-hidden bg-white">
    <!-- Transition from dark Markets section -->
    <div
      class="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-slate-900 to-transparent pointer-events-none"
    />

    <!-- Subtle background glow -->
    <div
      class="absolute inset-0 opacity-30"
      style="
        background-image: radial-gradient(circle at 80% 50%, rgba(37, 99, 235, 0.08) 0%, transparent 60%),
                          radial-gradient(circle at 20% 80%, rgba(37, 99, 235, 0.05) 0%, transparent 50%);
      "
    />

    <div class="relative container mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center max-w-4xl mx-auto mb-16">
        <div
          class="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 backdrop-blur px-4 py-2 rounded-full mb-4"
        >
          <span class="w-2 h-2 bg-blue-600 rounded-full"></span>
          <span class="text-sm font-medium tracking-wide text-blue-700">
            Program Experience
          </span>
        </div>

        <p class="text-lg text-gray-600 max-w-3xl mx-auto mb-3">
          Our composite structures fly on some of the most critical platforms in service today.
        </p>

        <h2 class="text-4xl md:text-5xl font-black text-slate-800 leading-tight">
          Proven Performance Across
          <span class="text-blue-600">Leading Platforms</span>
        </h2>
      </div>

      <!-- Platform Grid – 4 columns on large, 2 on medium, 1 on small -->
      <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        
        <!-- Card 1: F-35 Lightning II (Blue) -->
        <div
          class="group bg-blue-50/80 backdrop-blur-sm border border-blue-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
        >
          <div
            class="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition"
          >
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.083-2.5-2.5-.083 2.854-.813L9.813 15.904zm0 0l5.292-5.292m-5.292 5.292l1.792-1.792m5.292-5.292l1.792-1.792m-5.292 5.292L15.904 9.813zm0 0l2.854-.813-2.5-.083L18.75 9l-2.854-.813z" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-slate-800">F-35 Lightning II</h3>
          <p class="text-xs text-blue-600 font-semibold">Joint Strike Fighter</p>
          <p class="text-sm text-gray-600 mt-2 leading-relaxed">
            Advanced composite radomes and structural components for the world's most advanced multi‑role fighter.
          </p>
          <div class="mt-3 pt-3 border-t border-blue-200/50 flex items-center justify-between">
            <span class="text-xs text-gray-500">Active · Production</span>
            <span class="text-xs font-medium text-blue-700 bg-blue-200/50 px-3 py-1 rounded-full">Flight Proven</span>
          </div>
        </div>

        <!-- Card 2: F/A-18 Hornet (Red) -->
        <div
          class="group bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
        >
          <div
            class="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center mb-4 group-hover:bg-red-500/30 transition"
          >
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.083-2.5-2.5-.083 2.854-.813L9.813 15.904zm0 0l5.292-5.292m-5.292 5.292l1.792-1.792m5.292-5.292l1.792-1.792m-5.292 5.292L15.904 9.813zm0 0l2.854-.813-2.5-.083L18.75 9l-2.854-.813z" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-slate-800">F/A-18 Hornet</h3>
          <p class="text-xs text-red-600 font-semibold">Carrier‑based Multi‑role Fighter</p>
          <p class="text-sm text-gray-600 mt-2 leading-relaxed">
            Rugged composite airframe structures and radomes designed for carrier landings and high‑G maneuvers.
          </p>
          <div class="mt-3 pt-3 border-t border-red-200/50 flex items-center justify-between">
            <span class="text-xs text-gray-500">Active · Production</span>
            <span class="text-xs font-medium text-red-700 bg-red-200/50 px-3 py-1 rounded-full">Fleet Standard</span>
          </div>
        </div>

        <!-- Card 3: P-8 Poseidon (Navy/Indigo) -->
        <div
          class="group bg-indigo-50/80 backdrop-blur-sm border border-indigo-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
        >
          <div
            class="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4 group-hover:bg-indigo-500/30 transition"
          >
            <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-slate-800">P-8 Poseidon</h3>
          <p class="text-xs text-indigo-600 font-semibold">Maritime Patrol &amp; Anti‑Submarine</p>
          <p class="text-sm text-gray-600 mt-2 leading-relaxed">
            Composite structures and sensor housings for the U.S. Navy's next‑generation maritime surveillance aircraft.
          </p>
          <div class="mt-3 pt-3 border-t border-indigo-200/50 flex items-center justify-between">
            <span class="text-xs text-gray-500">Active · Production</span>
            <span class="text-xs font-medium text-indigo-700 bg-indigo-200/50 px-3 py-1 rounded-full">Global Fleet</span>
          </div>
        </div>

        <!-- Card 4: Orion Spacecraft (Purple) -->
        <div
          class="group bg-purple-50/80 backdrop-blur-sm border border-purple-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
        >
          <div
            class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition"
          >
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-slate-800">Orion Spacecraft</h3>
          <p class="text-xs text-purple-600 font-semibold">NASA Deep Space Exploration</p>
          <p class="text-sm text-gray-600 mt-2 leading-relaxed">
            Lightweight composite structures and thermal protection for humanity's next generation of deep space missions.
          </p>
          <div class="mt-3 pt-3 border-t border-purple-200/50 flex items-center justify-between">
            <span class="text-xs text-gray-500">Active · Test Flights</span>
            <span class="text-xs font-medium text-purple-700 bg-purple-200/50 px-3 py-1 rounded-full">Flight Proven</span>
          </div>
        </div>

        <!-- Card 5: UH-60 Black Hawk (Green) -->
        <div
          class="group bg-green-50/80 backdrop-blur-sm border border-green-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
        >
          <div
            class="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition"
          >
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75V3.75M12 6.75a3 3 0 00-3 3v3a3 3 0 006 0v-3a3 3 0 00-3-3zM9 15.75h6M12 21v-3.75" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6.75V5.25a3 3 0 00-7.5 0v1.5" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-slate-800">UH-60 Black Hawk</h3>
          <p class="text-xs text-green-600 font-semibold">Utility Tactical Transport</p>
          <p class="text-sm text-gray-600 mt-2 leading-relaxed">
            Durable composite airframe components and rotorcraft structures for the U.S. Army's premier utility helicopter.
          </p>
          <div class="mt-3 pt-3 border-t border-green-200/50 flex items-center justify-between">
            <span class="text-xs text-gray-500">Active · Production</span>
            <span class="text-xs font-medium text-green-700 bg-green-200/50 px-3 py-1 rounded-full">Fleet Standard</span>
          </div>
        </div>

        <!-- Card 6: Global Hawk / Triton (Teal) -->
        <div
          class="group bg-teal-50/80 backdrop-blur-sm border border-teal-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
        >
          <div
            class="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center mb-4 group-hover:bg-teal-500/30 transition"
          >
            <svg class="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364a9 9 0 00-12.728 0M18.364 5.636a9 9 0 00-12.728 0M21 12a9 9 0 01-18 0 9 9 0 0118 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-slate-800">Global Hawk / Triton</h3>
          <p class="text-xs text-teal-600 font-semibold">HALE UAV</p>
          <p class="text-sm text-gray-600 mt-2 leading-relaxed">
            Lightweight composite radomes and sensor housings for advanced surveillance and reconnaissance missions.
          </p>
          <div class="mt-3 pt-3 border-t border-teal-200/50 flex items-center justify-between">
            <span class="text-xs text-gray-500">Active · Production</span>
            <span class="text-xs font-medium text-teal-700 bg-teal-200/50 px-3 py-1 rounded-full">Global Operations</span>
          </div>
        </div>

        <!-- Card 7: Siemens Healthineers (Orange) -->
        <div
          class="group bg-orange-50/80 backdrop-blur-sm border border-orange-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 lg:col-span-1 md:col-span-2 lg:col-start-2 lg:col-end-2 md:mx-auto"
        >
          <div
            class="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mb-4 group-hover:bg-orange-500/30 transition"
          >
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75L12 12m0 0l2.25-2.25M12 12l2.25 2.25M12 12L9.75 14.25M12 12v4.5m0-4.5V7.5M12 12l4.5 0M12 12l-4.5 0" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-slate-800">Siemens Healthineers</h3>
          <p class="text-xs text-orange-600 font-semibold">MRI &amp; PET/CT Systems</p>
          <p class="text-sm text-gray-600 mt-2 leading-relaxed">
            Precision composite enclosures and patient‑handling components for advanced medical imaging equipment.
          </p>
          <div class="mt-3 pt-3 border-t border-orange-200/50 flex items-center justify-between">
            <span class="text-xs text-gray-500">Active · Production</span>
            <span class="text-xs font-medium text-orange-700 bg-orange-200/50 px-3 py-1 rounded-full">Medical Leader</span>
          </div>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="text-center mt-16">
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold transition shadow-lg shadow-blue-600/30"
        >
          Explore Our Programs
        </button>
      </div>
    </div>

    <!-- Transition to next section (dark) -->
    <div
      class="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"
    />
  </section>
</template>