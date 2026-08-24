<template>
  <section class="relative py-24 overflow-hidden bg-slate-900">
    <!-- Transition from the light Program Experience section above -->
    <!-- <div
      class="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white to-transparent pointer-events-none"
    /> -->

    <!-- Subtle background glow -->
    <div
      class="absolute inset-0 opacity-30"
      style="
        background-image: radial-gradient(circle at 30% 50%, rgba(37, 99, 235, 0.12) 0%, transparent 60%),
                          radial-gradient(circle at 70% 80%, rgba(37, 99, 235, 0.06) 0%, transparent 50%);
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
            Why Vermont Composites
          </span>
        </div>

        <h2 class="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
          Built for the
          <span class="text-blue-400">World's Most Demanding</span>
          Applications
        </h2>

        <p class="text-lg text-gray-400 max-w-2xl mx-auto">
          From design engineering through production and certification — we deliver precision composite structures
          for aerospace, defense, and medical imaging.[reference:1]
        </p>
      </div>

      <!-- Four Pillars -->
      <div class="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">

        <!-- Pillar 1: Design-to-Production Under One Roof -->
        <div
          class="group bg-slate-800/60 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-600/10"
        >
          <div class="flex items-start gap-4">
            <div
              class="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/30 transition"
            >
              <span class="text-xl font-black text-blue-400">01</span>
            </div>
            <div>
              <h3 class="text-xl font-bold text-white mb-2">
                Design-to-Production Under One Roof
              </h3>
              <p class="text-gray-400 leading-relaxed text-sm">
                From initial FEA analysis and tooling design through prototyping, validation testing, and
                full-rate production — we manage the entire lifecycle in-house. Fewer handoffs. Faster timelines.
                Better results.[reference:2]
              </p>
            </div>
          </div>
        </div>

        <!-- Pillar 2: Industry-Recognized Quality -->
        <div
          class="group bg-slate-800/60 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-600/10"
        >
          <div class="flex items-start gap-4">
            <div
              class="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/30 transition"
            >
              <span class="text-xl font-black text-blue-400">02</span>
            </div>
            <div>
              <h3 class="text-xl font-bold text-white mb-2">
                Industry-Recognized Quality
              </h3>
              <p class="text-gray-400 leading-relaxed text-sm">
                <span class="text-white font-semibold">ISO AS9100</span> certified and
                <span class="text-white font-semibold">Nadcap</span> accredited. Our quality systems meet the
                most rigorous aerospace standards, backed by comprehensive NDI, mechanical testing, and
                inspection capabilities.[reference:3][reference:4]
              </p>
            </div>
          </div>
        </div>

        <!-- Pillar 3: Deep Engineering Expertise -->
        <div
          class="group bg-slate-800/60 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-600/10"
        >
          <div class="flex items-start gap-4">
            <div
              class="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/30 transition"
            >
              <span class="text-xl font-black text-blue-400">03</span>
            </div>
            <div>
              <h3 class="text-xl font-bold text-white mb-2">
                Deep Engineering Expertise
              </h3>
              <p class="text-gray-400 leading-relaxed text-sm">
                Our engineering team uses <span class="text-white font-semibold">SolidWorks, CATIA,</span> and
                <span class="text-white font-semibold">Unigraphics</span> for design, and
                <span class="text-white font-semibold">Abaqus</span> for analysis and testing. We don't just
                build to print — we solve problems.[reference:5][reference:6]
              </p>
            </div>
          </div>
        </div>

        <!-- Pillar 4: Trusted by the Primes -->
        <div
          class="group bg-slate-800/60 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-600/10"
        >
          <div class="flex items-start gap-4">
            <div
              class="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/30 transition"
            >
              <span class="text-xl font-black text-blue-400">04</span>
            </div>
            <div>
              <h3 class="text-xl font-bold text-white mb-2">
                Trusted by the Primes
              </h3>
              <p class="text-gray-400 leading-relaxed text-sm">
                The world's most demanding prime contractors trust Vermont Composites to deliver on their most
                critical programs. Recipient of the <span class="text-white font-semibold">Lockheed Martin Star
                Supplier Award</span>.[reference:7][reference:8]
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Supporting Stats Bar -->
      <div
        class="mt-12 max-w-4xl mx-auto bg-slate-800/40 border border-white/5 rounded-2xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
      >
        <div>
          <h4 class="text-2xl font-black text-blue-400">40+</h4>
          <p class="text-xs text-gray-500 uppercase tracking-wider">Years of Excellence[reference:9]</p>
        </div>
        <div>
          <h4 class="text-2xl font-black text-blue-400">100K</h4>
          <p class="text-xs text-gray-500 uppercase tracking-wider">Sq. Ft. Facility</p>
        </div>
        <div>
          <h4 class="text-2xl font-black text-blue-400">7+</h4>
          <p class="text-xs text-gray-500 uppercase tracking-wider">Leading Platforms[reference:10]</p>
        </div>
        <div>
          <h4 class="text-2xl font-black text-blue-400">99.8%</h4>
          <p class="text-xs text-gray-500 uppercase tracking-wider">On‑Time Delivery</p>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="text-center mt-12">
        <router-link to="/home/contactView"
          class="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold transition shadow-lg shadow-blue-600/30"
        >
          Get In Touch
        </router-link>
      </div>
    </div>

    <!-- Transition to next section (light) -->
    <!-- <div
      class="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"
    /> -->
  </section>
</template>