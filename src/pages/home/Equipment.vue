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
            Equipment &amp; Certifications
          </span>
        </div>
        <h1 class="text-4xl md:text-5xl font-black mb-4">
          Advanced Equipment.
          <span class="text-blue-400">Recognized Quality.</span>
        </h1>
        <p class="text-xl max-w-3xl mx-auto text-gray-300">
          Our state‑of‑the‑art manufacturing equipment combined with
          industry‑leading certifications ensures every part meets the most
          demanding aerospace, defense, and medical standards.
        </p>
      </div>
    </section>

    <!-- Equipment Overview -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <div
            class="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full mb-4"
          >
            <span class="w-2 h-2 bg-blue-600 rounded-full"></span>
            <span class="text-sm font-medium text-blue-700"
              >Manufacturing Equipment</span
            >
          </div>
          <h2 class="text-3xl font-black text-slate-800">
            Our <span class="text-blue-600">Production</span> Capabilities
          </h2>
          <p class="text-xl text-gray-600 mt-2">
            Purpose‑built equipment to handle the most complex composite
            structures.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-100 hover:border-blue-400"
          >
            <div
              class="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4"
            >
              <svg
                class="w-7 h-7 text-blue-600"
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
            <h3 class="text-xl font-bold text-slate-800">
              Autoclave Systems
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Multiple autoclaves with precise temperature and pressure control
              for curing advanced thermoset composites.
            </p>
            <div class="mt-3 flex flex-wrap gap-1">
              <span
                class="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
                >12 ft diameter</span
              >
              <span
                class="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
                >25 ft length</span
              >
              <span
                class="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
                >200°C max</span
              >
            </div>
          </div>

          <div
            class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-100 hover:border-blue-400"
          >
            <div
              class="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4"
            >
              <svg
                class="w-7 h-7 text-blue-600"
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
            <h3 class="text-xl font-bold text-slate-800">
              CNC Machining Center
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              5‑axis CNC routers and 3‑axis mills for precision trimming,
              drilling, and complex geometry machining.
            </p>
            <div class="mt-3 flex flex-wrap gap-1">
              <span
                class="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
                >5‑axis</span
              >
              <span
                class="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
                >20 ft x 10 ft bed</span
              >
              <span
                class="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
                >±0.005" tolerance</span
              >
            </div>
          </div>

          <div
            class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-100 hover:border-blue-400"
          >
            <div
              class="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4"
            >
              <svg
                class="w-7 h-7 text-blue-600"
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
            <h3 class="text-xl font-bold text-slate-800">
              Non‑Destructive Inspection (NDI)
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Advanced inspection systems for 100% quality verification of
              critical composite structures.
            </p>
            <div class="mt-3 flex flex-wrap gap-1">
              <span
                class="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
                >Ultrasonic C‑scan</span
              >
              <span
                class="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
                >X‑ray</span
              >
              <span
                class="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
                >Thermography</span
              >
            </div>
          </div>

          <div
            class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-100 hover:border-blue-400"
          >
            <div
              class="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4"
            >
              <svg
                class="w-7 h-7 text-blue-600"
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
            <h3 class="text-xl font-bold text-slate-800">Clean Rooms</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Climate‑controlled, particulate‑controlled environments for
              precision layup and bonding operations.
            </p>
            <div class="mt-3 flex flex-wrap gap-1">
              <span
                class="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
                >Class 100</span
              >
              <span
                class="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
                >Class 1000</span
              >
              <span
                class="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
                >NASA cleanliness</span
              >
            </div>
          </div>

          <div
            class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-100 hover:border-blue-400"
          >
            <div
              class="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4"
            >
              <svg
                class="w-7 h-7 text-blue-600"
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
            <h3 class="text-xl font-bold text-slate-800">
              Automated Tape Layup (ATL)
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              High‑speed automated layup machines for large‑scale, repeatable
              production of flat and contoured laminates.
            </p>
            <div class="mt-3 flex flex-wrap gap-1">
              <span
                class="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
                >Carbon/glass</span
              >
              <span
                class="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
                >20 ft length</span
              >
              <span
                class="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
                >±0.010" accuracy</span
              >
            </div>
          </div>

          <div
            class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-100 hover:border-blue-400"
          >
            <div
              class="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4"
            >
              <svg
                class="w-7 h-7 text-blue-600"
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
            <h3 class="text-xl font-bold text-slate-800">Quality Lab</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Mechanical testing, thermal analysis, and material
              characterization labs for full property verification.
            </p>
            <div class="mt-3 flex flex-wrap gap-1">
              <span
                class="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
                >DSC/TGA</span
              >
              <span
                class="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
                >DMA</span
              >
              <span
                class="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
                >Mechanical test</span
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Certifications Section -->
    <section class="py-16 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <div
            class="inline-flex items-center gap-2 bg-slate-200/50 border border-slate-300 px-4 py-2 rounded-full mb-4"
          >
            <span class="w-2 h-2 bg-slate-600 rounded-full"></span>
            <span class="text-sm font-medium text-slate-700"
              >Quality Certifications</span
            >
          </div>
          <h2 class="text-3xl font-black text-slate-800">
            Industry‑Recognized <span class="text-blue-600">Quality Standards</span>
          </h2>
          <p class="text-xl text-gray-600 mt-2">
            Independent validation of our quality, process, and product
            excellence.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="cert in certifications"
            :key="cert.id"
            class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border border-gray-100 text-center"
          >
            <div
              class="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4"
            >
              <span class="text-2xl font-black text-blue-600">{{
                cert.abbr
              }}</span>
            </div>
            <h3 class="text-xl font-bold text-slate-800">{{ cert.name }}</h3>
            <p class="text-sm text-blue-600 font-semibold mb-2">
              {{ cert.standard }}
            </p>
            <p class="text-gray-600 text-sm leading-relaxed">
              {{ cert.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section
      class="py-16 bg-gradient-to-r from-slate-900 to-slate-800 text-white"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-4xl font-black text-blue-400">7</div>
            <div class="text-xl text-gray-300">Autoclaves</div>
          </div>
          <div>
            <div class="text-4xl font-black text-blue-400">100K</div>
            <div class="text-xl text-gray-300">Sq. Ft. Facility</div>
          </div>
          <div>
            <div class="text-4xl font-black text-blue-400">6</div>
            <div class="text-xl text-gray-300">Certifications</div>
          </div>
          <div>
            <div class="text-4xl font-black text-blue-400">99.8%</div>
            <div class="text-xl text-gray-300">On‑Time Delivery</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 bg-white">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-black text-slate-800 mb-4">
          Ready to Discuss Your <span class="text-blue-600">Program</span>?
        </h2>
        <p class="text-xl text-gray-600 mb-8">
          Our equipment and certifications are ready to support your next
          mission‑critical program. Let's talk.
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
const certifications = [
  {
    id: 1,
    name: 'Aerospace Quality Management',
    abbr: 'AS91',
    standard: 'AS9100D',
    description:
      'The internationally recognized quality management standard for the aerospace industry, ensuring consistent product quality and safety.'
  },
  {
    id: 2,
    name: 'NADCAP – Composites',
    abbr: 'NDC',
    standard: 'NADCAP',
    description:
      'Specialized accreditation for advanced composite manufacturing processes, including automated layup, autoclave cure, and inspection.'
  },
  {
    id: 3,
    name: 'Medical Device Quality',
    abbr: 'ISO',
    standard: 'ISO 13485',
    description:
      'Quality management system specifically designed for medical device manufacturing, ensuring compliance with regulatory requirements.'
  },
  {
    id: 4,
    name: 'ITAR Registration',
    abbr: 'ITAR',
    standard: 'ITAR',
    description:
      'Registered with the U.S. Department of State for manufacturing defense articles and services, ensuring export compliance.'
  },
  {
    id: 5,
    name: 'NADCAP – NDT',
    abbr: 'NDT',
    standard: 'NADCAP NDT',
    description:
      'Accreditation for non‑destructive testing methods – ultrasonic C‑scan, X‑ray, and thermography – ensuring defect‑free components.'
  },
  {
    id: 6,
    name: 'ISO 9001',
    abbr: 'ISO9',
    standard: 'ISO 9001:2015',
    description:
      'Foundation quality management system underpinning our AS9100D and ISO 13485 certifications, ensuring continuous improvement.'
  }
];
</script>

<style scoped>
/* optional hover enhancements */
</style>