<template>
  <section class="relative min-h-screen overflow-hidden">
    <!-- Background Image (composites / manufacturing) -->
    <div
      class="absolute inset-0 bg-cover bg-center"
      style="
        background-image: url('/src/assets/hero.jpg');
      "
    >
      <div
        class="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/80 to-slate-700/40"
      />
    </div>

    <div
      class="relative container mx-auto px-6 min-h-screen flex items-center"
    >
      <div class="grid lg:grid-cols-2 gap-12 items-center w-full">

        <!-- Left Content -->
        <div class="text-white">

          <div
            class="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-400/30 backdrop-blur px-4 py-2 rounded-full mb-6"
          >
            <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
            <span class="text-sm font-medium tracking-wide">
              AS9100 &amp; NADCAP Certified
            </span>
          </div>

          <h1
            class="text-5xl md:text-6xl xl:text-7xl font-black leading-tight mb-6"
          >
            Precision Composites.
            <br />
            Critical Missions.
            <br />
            Uncompromised Quality.
          </h1>

          <p
            class="text-lg md:text-xl text-gray-300 max-w-2xl mb-8"
          >
            From concept to production, we engineer advanced composite structures
            for aerospace, defense, and medical imaging – delivering reliability
            where it matters most.
          </p>

          <div class="flex flex-wrap gap-4 mb-12">
            <button
              class="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-bold transition shadow-lg shadow-blue-600/30"
            >
              Contact Our Team
            </button>

            <button
              class="border border-white/30 hover:bg-white hover:text-slate-900 px-8 py-4 rounded-xl font-bold transition"
            >
              Explore Capabilities
            </button>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-6 max-w-xl">
            <div>
              <h3 class="text-3xl font-bold text-blue-400">
                40+
              </h3>
              <p class="text-gray-400 text-sm">
                Years of Excellence
              </p>
            </div>

            <div>
              <h3 class="text-3xl font-bold text-blue-400">
                100K
              </h3>
              <p class="text-gray-400 text-sm">
                Sq. Ft. Facility
              </p>
            </div>

            <div>
              <h3 class="text-3xl font-bold text-blue-400">
                99.8%
              </h3>
              <p class="text-gray-400 text-sm">
                On‑Time Delivery
              </p>
            </div>
          </div>

        </div>

        <!-- Right Side Card -->
        <div class="hidden lg:flex justify-center">
          <div
            class="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-md transition-transform hover:scale-[1.02]"
          >
            <img
              src="/src/assets/hero.jpg"
              alt="Advanced composite part"
              class="h-[300px] w-full object-cover"
            />

            <div class="p-6">
              <h3 class="text-2xl font-bold text-slate-800 mb-2">
                Engineered for Extreme Environments
              </h3>

              <p class="text-gray-600 mb-4">
                Our lightweight, high‑strength composites meet the most rigorous
                military and aerospace standards – from radomes to structural
                assemblies.
              </p>

              <button
                class="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl font-semibold transition"
              >
                Request a Quote
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Bottom Wave (now a subtle dark-to-transparent) -->
    <div
      class="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-900 to-transparent"
    />
  </section>
</template>