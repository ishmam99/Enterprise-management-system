<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <section
      class="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 text-white py-24"
    >
      <div
        class="absolute inset-0 opacity-20"
        style="
          background-image: radial-gradient(
            circle at 30% 40%,
            rgba(37, 99, 235, 0.3) 0%,
            transparent 60%
          );
        "
      ></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          class="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-400/30 backdrop-blur px-4 py-2 rounded-full mb-6"
        >
          <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
          <span class="text-sm font-medium tracking-wide text-blue-300">
            Our Facility
          </span>
        </div>
        <h1 class="text-4xl md:text-5xl font-black mb-4">
          Built for <span class="text-blue-400">Precision</span> &amp;
          <span class="text-blue-400">Scale</span>
        </h1>
        <p class="text-xl max-w-3xl mx-auto text-gray-300">
          Our 100,000 sq. ft. state‑of‑the‑art facility in Bennington, VT is
          purpose‑designed for advanced composite manufacturing – from R&amp;D
          to full‑rate production.
        </p>
      </div>
    </section>

    <!-- Facility Overview -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div
              class="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full mb-4"
            >
              <span class="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span class="text-sm font-medium text-blue-700"
                >Facility Overview</span
              >
            </div>
            <h2 class="text-3xl font-black text-slate-800 mb-4">
              Designed for <span class="text-blue-600">Mission‑Ready</span>
              Production
            </h2>
            <p class="text-gray-600 mb-4 leading-relaxed">
              Our 100,000 sq. ft. facility in Bennington, Vermont, is
              purpose‑built for advanced composite manufacturing. From
              engineering and prototyping to production, assembly, and testing
              – everything happens under one roof.
            </p>
            <p class="text-gray-600 mb-4 leading-relaxed">
              We maintain strict environmental controls, including clean rooms,
              temperature‑controlled layup areas, and advanced autoclave
              capacity to support the most demanding aerospace and defense
              programs.
            </p>
            <p class="text-gray-600 leading-relaxed">
              Our in‑house inspection lab is equipped with NDI (Non‑Destructive
              Inspection) tools, CMMs, and mechanical testing equipment to
              ensure every part meets customer specifications.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=1200"
              alt="Vermont Composites facility"
              class="rounded-xl shadow-xl w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Key Stats -->
    <section class="py-12 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div
            class="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100"
          >
            <div class="text-3xl font-black text-blue-600">100K</div>
            <div class="text-sm text-gray-500 uppercase tracking-wider">
              Sq. Ft. Facility
            </div>
          </div>
          <div
            class="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100"
          >
            <div class="text-3xl font-black text-blue-600">7</div>
            <div class="text-sm text-gray-500 uppercase tracking-wider">
              Autoclaves
            </div>
          </div>
          <div
            class="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100"
          >
            <div class="text-3xl font-black text-blue-600">200°</div>
            <div class="text-sm text-gray-500 uppercase tracking-wider">
              Degree Celsius Max Cure
            </div>
          </div>
          <div
            class="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100"
          >
            <div class="text-3xl font-black text-blue-600">4</div>
            <div class="text-sm text-gray-500 uppercase tracking-wider">
              Clean Rooms (Class 100–1000)
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Equipment & Capabilities -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <div
            class="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full mb-4"
          >
            <span class="w-2 h-2 bg-blue-600 rounded-full"></span>
            <span class="text-sm font-medium text-blue-700"
              >Equipment &amp; Capabilities</span
            >
          </div>
          <h2 class="text-3xl font-black text-slate-800">
            Advanced <span class="text-blue-600">Manufacturing</span> Technology
          </h2>
          <p class="text-xl text-gray-600 mt-2">
            Our facility is equipped with industry‑leading machinery and
            inspection tools.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-100 hover:border-blue-400"
          >
            <div
              class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4"
            >
              <svg
                class="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">
              Autoclave &amp; Oven Curing
            </h3>
            <p class="text-gray-600 text-sm">
              Multiple autoclaves up to 12 ft diameter and 25 ft length, with
              precise temperature and pressure control for high‑performance
              thermoset composites.
            </p>
          </div>

          <div
            class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-100 hover:border-blue-400"
          >
            <div
              class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4"
            >
              <svg
                class="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">
              CNC Machining &amp; Waterjet
            </h3>
            <p class="text-gray-600 text-sm">
              5‑axis CNC routers, 3‑axis mills, and abrasive waterjet cutting
              for precision trimming, drilling, and complex geometries.
            </p>
          </div>

          <div
            class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-100 hover:border-blue-400"
          >
            <div
              class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4"
            >
              <svg
                class="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">
              Non‑Destructive Inspection (NDI)
            </h3>
            <p class="text-gray-600 text-sm">
              Ultrasonic C‑scan, X‑ray, and thermography systems for 100%
              inspection of critical composite structures.
            </p>
          </div>

          <div
            class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-100 hover:border-blue-400"
          >
            <div
              class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4"
            >
              <svg
                class="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">
              Clean Rooms &amp; Prep Areas
            </h3>
            <p class="text-gray-600 text-sm">
              Climate‑controlled, particulate‑controlled environments for
              precision layup and bonding, meeting NASA and MIL‑STD cleanliness
              levels.
            </p>
          </div>

          <div
            class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-100 hover:border-blue-400"
          >
            <div
              class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4"
            >
              <svg
                class="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">
              Automated Tape Layup (ATL)
            </h3>
            <p class="text-gray-600 text-sm">
              High‑speed tape layup machines for large‑scale, repeatable
              production of flat and contoured composite laminates.
            </p>
          </div>

          <div
            class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-100 hover:border-blue-400"
          >
            <div
              class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4"
            >
              <svg
                class="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">
              Quality Lab &amp; Testing
            </h3>
            <p class="text-gray-600 text-sm">
              Mechanical testing, thermal analysis, and material
              characterization labs to verify properties and ensure compliance.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Certifications & Accreditations -->
    <section class="py-16 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <div
            class="inline-flex items-center gap-2 bg-slate-200/50 border border-slate-300 px-4 py-2 rounded-full mb-4"
          >
            <span class="w-2 h-2 bg-slate-600 rounded-full"></span>
            <span class="text-sm font-medium text-slate-700"
              >Certifications</span
            >
          </div>
          <h2 class="text-3xl font-black text-slate-800">
            Industry‑Recognized
            <span class="text-blue-600">Quality Standards</span>
          </h2>
          <p class="text-xl text-gray-600 mt-2">
            Our facility and processes meet the most rigorous aerospace and
            defense requirements.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            class="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100"
          >
            <div class="text-4xl font-black text-blue-600 mb-2">AS9100D</div>
            <p class="text-sm text-gray-600">
              Aerospace quality management system certification, ensuring
              consistent product quality and safety.
            </p>
          </div>
          <div
            class="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100"
          >
            <div class="text-4xl font-black text-blue-600 mb-2">NADCAP</div>
            <p class="text-sm text-gray-600">
              Accredited for composites, NDT, and welding – meeting prime
              contractor requirements.
            </p>
          </div>
          <div
            class="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100"
          >
            <div class="text-4xl font-black text-blue-600 mb-2">ISO 13485</div>
            <p class="text-sm text-gray-600">
              Medical device quality management – for our medical imaging
              components.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 bg-white">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-black text-slate-800 mb-4">
          See Our Facility in <span class="text-blue-600">Action</span>
        </h2>
        <p class="text-xl text-gray-600 mb-8">
          Schedule a tour or virtual visit to see how our capabilities can
          support your next program.
        </p>
        <router-link
          to="/contact"
          class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-blue-600/30"
        >
          Contact Our Team
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
// No additional logic needed
</script>

<style scoped>
/* optional hover enhancements */
</style>