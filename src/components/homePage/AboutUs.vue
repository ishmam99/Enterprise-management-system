<template>
  <section class="relative py-24 overflow-hidden bg-white">
    <!-- Background Image with subtle light overlay -->
    <div
      class="absolute inset-0 bg-cover bg-center opacity-10"
      style="
        background-image: url('https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=2000');
      "
    >
      <div
        class="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-gray-100/60"
      />
    </div>

    <div class="relative container mx-auto px-6">
      <div class="grid lg:grid-cols-2 gap-16 items-center">

        <!-- Left Content: Text & Details -->
        <div class="text-slate-800 order-2 lg:order-1">

          <div
            class="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 backdrop-blur px-4 py-2 rounded-full mb-6"
          >
            <span class="w-2 h-2 bg-blue-600 rounded-full"></span>
            <span class="text-sm font-medium tracking-wide text-blue-700">About us
            </span>
          </div>

          <h2
            class="text-4xl md:text-5xl font-black leading-tight mb-6"
          >
            Engineered for
            <span class="text-blue-600">Excellence.</span>
          </h2>

          <p class="text-lg text-gray-600 mb-4">
            For over 40 years, <strong class="text-slate-800">Vermont Composites</strong> has been a trusted partner in advanced composite manufacturing, serving the most demanding aerospace, defense, and medical imaging programs.
          </p>

          <p class="text-gray-500 mb-8">
            From our 100,000 sq. ft. facility in Bennington, VT, we offer vertically integrated capabilities – from engineering and tooling to production, assembly, and testing. Our commitment to quality is backed by <strong class="text-slate-800">AS9100</strong> and <strong class="text-slate-800">NADCAP</strong> accreditations, ensuring every part meets mission‑critical standards.
          </p>

          <!-- Key differentiators as feature list -->
          <div class="grid sm:grid-cols-2 gap-4 mb-10">
            <div class="flex items-start gap-3">
              <div class="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <svg class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-slate-800">Vertical Integration</h4>
                <p class="text-sm text-gray-500">Design, tooling, production &amp; assembly in‑house</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <svg class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-slate-800">NADCAP &amp; AS9100</h4>
                <p class="text-sm text-gray-500">Rigorous aerospace quality management</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <svg class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-slate-800">Mission‑Critical</h4>
                <p class="text-sm text-gray-500">Radomes, structures, and medical components</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <svg class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-slate-800">Custom Solutions</h4>
                <p class="text-sm text-gray-500">Thermoset &amp; thermoplastic composites</p>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap gap-4">
            <button
              class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition shadow-lg shadow-blue-600/30"
            >
              Our Capabilities
            </button>
            <button
              class="border border-slate-300 text-slate-700 hover:bg-slate-800 hover:text-white px-8 py-3 rounded-xl font-bold transition"
            >
              View Facility
            </button>
          </div>
        </div>

        <!-- Right Side: Image Card with Stats Overlay -->
        <div class="order-1 lg:order-2">
          <div
            class="bg-white shadow-2xl border border-gray-100 rounded-3xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80"
              alt="Vermont Composites facility and manufacturing"
              class="w-full h-64 md:h-80 object-cover"
            />

            <div class="p-6 md:p-8">
              <!-- Compact stats grid inside the card -->
              <div class="grid grid-cols-3 gap-4 text-center border-b border-gray-200 pb-6 mb-6">
                <div>
                  <h4 class="text-2xl font-black text-blue-600">40+</h4>
                  <p class="text-xs text-gray-400 uppercase tracking-wider">Years</p>
                </div>
                <div>
                  <h4 class="text-2xl font-black text-blue-600">100K</h4>
                  <p class="text-xs text-gray-400 uppercase tracking-wider">Sq. Ft.</p>
                </div>
                <div>
                  <h4 class="text-2xl font-black text-blue-600">99.8%</h4>
                  <p class="text-xs text-gray-400 uppercase tracking-wider">On‑Time</p>
                </div>
              </div>

              <blockquote class="text-gray-600 italic text-sm md:text-base">
                “We don’t just make parts – we deliver solutions that perform
                when it counts. Our team takes pride in every layup, every cure
                cycle, and every inspection.”
              </blockquote>

              <div class="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200">
                <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                  VC
                </div>
                <div>
                  <p class="text-slate-800 text-sm font-semibold">Vermont Composites</p>
                  <p class="text-gray-500 text-xs">Bennington, VT</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Smooth transition from the dark hero (wave from white to transparent) -->
    <div
      class="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-white to-transparent pointer-events-none"
    />
  </section>
</template>