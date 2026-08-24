<template>
  <section class="relative min-h-screen overflow-hidden">

    <!-- Animated Background Slideshow -->
    <div class="absolute inset-0 overflow-hidden">

      <!-- Image 1 -->
      
      <div class="hero-bg hero-bg-1 absolute inset-0 bg-cover bg-center"
      style="background-image: url('/src/assets/hero.jpg');"></div>
      
      <!-- Image 2 -->
      <div class="hero-bg hero-bg-2 absolute inset-0 bg-cover bg-center"
      style="background-image: url('/src/assets/vermont/vermont_1.webp');"></div>
      
      <!-- Image 3 -->
      <div class="hero-bg hero-bg-3 absolute inset-0 bg-cover bg-center"
      style="background-image: url('/src/assets/vermont/vermont_2.jpg');"></div>
      
      <!-- Image 4 -->
      <div class="hero-bg hero-bg-1 absolute inset-0 bg-cover bg-center"
        style="background-image: url('/src/assets/vermont/vermont_3.jpg');"></div>
        
      <!-- Dark cinematic overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/55 to-slate-700/20 z-10"></div>
      <!-- Bottom fade -->
      <div
        class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent z-20">
      </div>
    </div>


    <!-- Hero Content -->
    <div class="relative z-30 container mx-auto px-6 min-h-screen flex items-center">
      <div class="grid lg:grid-cols-2 gap-12 items-center w-full">

        <!-- Left Content -->
        <div class="text-white">

          <div
            class="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-400/30 backdrop-blur-md px-4 py-2 rounded-full mb-6">
            <span class="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>

            <span class="text-sm font-medium tracking-wide">
              AS9100 &amp; NADCAP Certified
            </span>
          </div>


          <h1 class="text-5xl md:text-6xl xl:text-7xl font-black leading-tight mb-6">
            Precision Composites.
            <br />

            <span class="text-blue-400">
              Critical Missions.
            </span>

            <br />

            Uncompromised Quality.
          </h1>


          <p class="text-lg md:text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed">
            From concept to production, we engineer advanced composite
            structures for aerospace, defense, and medical imaging –
            delivering reliability where it matters most.
          </p>


          <!-- Buttons -->
          <div class="flex flex-wrap gap-4 mb-12">

            <button
              class="group bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:-translate-y-1">
              Contact Our Team

              <span class="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>


            <button
              class="border border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white hover:text-slate-900 px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:-translate-y-1">
              Explore Capabilities
            </button>

          </div>


          <!-- Stats -->
          <div class="grid grid-cols-3 gap-6 max-w-xl">

            <div>
              <h3 class="text-3xl font-bold text-blue-400">
                40+
              </h3>

              <p class="text-gray-400 text-sm mt-1">
                Years of Excellence
              </p>
            </div>


            <div>
              <h3 class="text-3xl font-bold text-blue-400">
                100K
              </h3>

              <p class="text-gray-400 text-sm mt-1">
                Sq. Ft. Facility
              </p>
            </div>


            <div>
              <h3 class="text-3xl font-bold text-blue-400">
                99.8%
              </h3>

              <p class="text-gray-400 text-sm mt-1">
                On-Time Delivery
              </p>
            </div>

          </div>

        </div>


        <!-- Right Side Card -->
        <div class="hidden lg:flex justify-center">

          <div
            class="bg-white/95 backdrop-blur rounded-3xl overflow-hidden shadow-2xl max-w-md transition-all duration-500 hover:scale-[1.02] hover:shadow-blue-900/30">

            <img src="/src/assets/hero.jpg" alt="Advanced composite part" class="h-[300px] w-full object-cover" />

            <div class="p-6">

              <div class="text-blue-600 text-sm font-bold uppercase tracking-widest mb-2">
                Advanced Materials
              </div>

              <h3 class="text-2xl font-bold text-slate-800 mb-2">
                Engineered for Extreme Environments
              </h3>

              <p class="text-gray-600 mb-5 leading-relaxed">
                Our lightweight, high-strength composites meet the most
                rigorous military and aerospace standards – from radomes
                to structural assemblies.
              </p>

              <button
                class="group w-full bg-slate-800 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition-all duration-300">
                Request a Quote

                <span class="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>

            </div>
          </div>

        </div>

      </div>
    </div>

  </section>
</template>


<style scoped>
/* =========================================================
   HERO BACKGROUND
   ========================================================= */

.hero-bg {
  opacity: 0;
  transform: scale(1.06);
  will-change: opacity, transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}


/* =========================================================
   IMAGE 1
   ========================================================= */

.hero-bg-1 {
  animation: heroSlide1 18s linear infinite;
}


/* =========================================================
   IMAGE 2
   ========================================================= */

.hero-bg-2 {
  animation: heroSlide2 18s linear infinite;
}


/* =========================================================
   IMAGE 3
   ========================================================= */

.hero-bg-3 {
  animation: heroSlide3 18s linear infinite;
}


/* =========================================================
   IMAGE 1
   Visible from 0% → 33%
   Crossfades into Image 2
   ========================================================= */

@keyframes heroSlide1 {

  /* Start visible */
  0% {
    opacity: 1;
    transform: scale(1.06) translate3d(-1%, 0, 0);
  }

  /* Slow movement */
  25% {
    opacity: 1;
    transform: scale(1.02) translate3d(1%, 0, 0);
  }

  /* Crossfade */
  30% {
    opacity: 0.8;
  }

  33% {
    opacity: 0;
    transform: scale(1.01) translate3d(1.5%, 0, 0);
  }

  100% {
    opacity: 0;
  }
}


/* =========================================================
   IMAGE 2
   ========================================================= */

@keyframes heroSlide2 {

  0% {
    opacity: 0;
    transform: scale(1.06) translate3d(1%, 0, 0);
  }

  /* Start fading in BEFORE Image 1 disappears */
  30% {
    opacity: 0;
  }

  35% {
    opacity: 1;
    transform: scale(1.05) translate3d(1%, 0, 0);
  }

  /* Slow movement */
  58% {
    opacity: 1;
    transform: scale(1.02) translate3d(-1%, 0, 0);
  }

  /* Crossfade */
  63% {
    opacity: 0.8;
  }

  66% {
    opacity: 0;
    transform: scale(1.01) translate3d(-1.5%, 0, 0);
  }

  100% {
    opacity: 0;
  }
}


/* =========================================================
   IMAGE 3
   ========================================================= */

@keyframes heroSlide3 {

  0% {
    opacity: 0;
    transform: scale(1.06) translate3d(-1%, 0, 0);
  }

  /* Start fading in BEFORE Image 2 disappears */
  63% {
    opacity: 0;
  }

  68% {
    opacity: 1;
    transform: scale(1.05) translate3d(-1%, 0, 0);
  }

  /* Slow movement */
  91% {
    opacity: 1;
    transform: scale(1.02) translate3d(1%, 0, 0);
  }

  /* Crossfade */
  96% {
    opacity: 0.8;
  }

  100% {
    opacity: 0;
    transform: scale(1.01) translate3d(1.5%, 0, 0);
  }
}


/* =========================================================
   ACCESSIBILITY
   ========================================================= */

@media (prefers-reduced-motion: reduce) {

  .hero-bg {
    animation: none !important;
    transform: none !important;
  }

  .hero-bg-1 {
    opacity: 1;
  }

  .hero-bg-2,
  .hero-bg-3 {
    opacity: 0;
  }
}
</style>