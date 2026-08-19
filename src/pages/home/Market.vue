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
            Markets
          </span>
        </div>
        <h1 class="text-4xl md:text-5xl font-black mb-4">
          Markets <span class="text-blue-400">We Serve</span>
        </h1>
        <p class="text-xl max-w-3xl mx-auto text-gray-300">
          Specialized composite solutions across three core industries.
        </p>
      </div>
    </section>

    <!-- Aerospace & Defense -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div
              class="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full mb-4"
            >
              <span class="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span class="text-sm font-medium text-blue-700"
                >Aerospace &amp; Defense</span
              >
            </div>
            <h2 class="text-3xl font-black text-slate-800 mb-4">
              <span class="text-blue-600">Advanced</span> Composite Solutions
              for Aerospace &amp; Defense
            </h2>
            <p class="text-gray-600 mb-4 leading-relaxed">
              We design and manufacture a wide range of composite structures
              for aerospace and defense platforms, including:
            </p>
            <ul class="space-y-2 mb-4">
              <li class="flex items-start gap-3">
                <svg
                  class="w-5 h-5 text-blue-600 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span class="text-gray-700"
                  >Reflectors, radomes, EMI-shielded mission structures</span
                >
              </li>
              <li class="flex items-start gap-3">
                <svg
                  class="w-5 h-5 text-blue-600 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span class="text-gray-700"
                  >Wing-to-body fairings and inlets, machined core details</span
                >
              </li>
              <li class="flex items-start gap-3">
                <svg
                  class="w-5 h-5 text-blue-600 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span class="text-gray-700"
                  >Control surfaces and interiors</span
                >
              </li>
              <li class="flex items-start gap-3">
                <svg
                  class="w-5 h-5 text-blue-600 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span class="text-gray-700"
                  >Aero structures including outlet guide vanes, acoustic
                  panels, and fan track liners</span
                >
              </li>
              <li class="flex items-start gap-3">
                <svg
                  class="w-5 h-5 text-blue-600 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span class="text-gray-700"
                  >Structures and workstations, racks and enclosures, and
                  complex assemblies for military platforms</span
                >
              </li>
            </ul>
            <div class="flex flex-wrap gap-2 mt-4">
              <span
                class="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
                >P-8 Poseidon</span
              >
              <span
                class="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
                >CH-47 Chinook</span
              >
              <span
                class="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
                >FA-18 Hornet</span
              >
              <span
                class="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
                >V-22 Osprey</span
              >
              <span
                class="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
                >CH-53K</span
              >
              <span
                class="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
                >E-2D</span
              >
            </div>
          </div>
          <div>
            <img
              src="/src/assets/images/f16.png"
              alt="Aerospace and defense composite applications"
              class="rounded-xl shadow-xl w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Medical Imaging -->
    <section class="py-16 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200"
              alt="Medical imaging composite components"
              class="rounded-xl shadow-xl w-full h-[400px] object-cover"
            />
          </div>
          <div class="order-1 lg:order-2">
            <div
              class="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full mb-4"
            >
              <span class="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span class="text-sm font-medium text-blue-700"
                >Medical Imaging</span
              >
            </div>
            <h2 class="text-3xl font-black text-slate-800 mb-4">
              Composite Structures for
              <span class="text-blue-600">Medical Imaging</span> Systems
            </h2>
            <p class="text-gray-600 mb-4 leading-relaxed">
              We supply precision composite components for leading medical
              equipment OEMs, including:
            </p>
            <ul class="space-y-2 mb-4">
              <li class="flex items-start gap-3">
                <svg
                  class="w-5 h-5 text-blue-600 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span class="text-gray-700"
                  >Oncology table tops and extensions</span
                >
              </li>
              <li class="flex items-start gap-3">
                <svg
                  class="w-5 h-5 text-blue-600 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span class="text-gray-700"
                  >Orthopedic tables and beams</span
                >
              </li>
              <li class="flex items-start gap-3">
                <svg
                  class="w-5 h-5 text-blue-600 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span class="text-gray-700"
                  >Computed tomography (CT) tables and headrests</span
                >
              </li>
              <li class="flex items-start gap-3">
                <svg
                  class="w-5 h-5 text-blue-600 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span class="text-gray-700"
                  >Baggage screening tunnels</span
                >
              </li>
            </ul>
            <div class="flex flex-wrap gap-2 mt-4">
              <span
                class="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
                >Siemens Healthineers</span
              >
              <span
                class="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
                >GE Healthcare</span
              >
              <span
                class="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
                >Philips</span
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Commercial & Space -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div
              class="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full mb-4"
            >
              <span class="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span class="text-sm font-medium text-blue-700"
                >Commercial &amp; Space</span
              >
            </div>
            <h2 class="text-3xl font-black text-slate-800 mb-4">
              Composite Structures for
              <span class="text-blue-600">Commercial &amp; Space</span>
              Applications
            </h2>
            <p class="text-gray-600 mb-4 leading-relaxed">
              Our advanced composites serve the commercial aviation and space
              sectors, supplying programs for leading OEMs with:
            </p>
            <ul class="space-y-2 mb-4">
              <li class="flex items-start gap-3">
                <svg
                  class="w-5 h-5 text-blue-600 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span class="text-gray-700"
                  >Reflectors and radome assemblies</span
                >
              </li>
              <li class="flex items-start gap-3">
                <svg
                  class="w-5 h-5 text-blue-600 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span class="text-gray-700"
                  >Wing-to-body fairings and aerodynamic surfaces</span
                >
              </li>
              <li class="flex items-start gap-3">
                <svg
                  class="w-5 h-5 text-blue-600 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span class="text-gray-700"
                  >Interior components and structural assemblies</span
                >
              </li>
              <li class="flex items-start gap-3">
                <svg
                  class="w-5 h-5 text-blue-600 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span class="text-gray-700"
                  >Lightweight composite structures for launch vehicles and
                  satellites</span
                >
              </li>
            </ul>
            <div class="flex flex-wrap gap-2 mt-4">
              <span
                class="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
                >Orion</span
              >
              <span
                class="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
                >Boeing</span
              >
              <span
                class="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
                >Airbus</span
              >
              <span
                class="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
                >Lockheed Martin</span
              >
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1516849677043-ef67c9557e16?w=1200"
              alt="Commercial and space composite applications"
              class="rounded-xl shadow-xl w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Stats / Trust Indicators -->
    <section
      class="py-16 bg-gradient-to-r from-slate-900 to-slate-800 text-white"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-4xl font-black text-blue-400">40+</div>
            <div class="text-xl text-gray-300">Years of Excellence</div>
          </div>
          <div>
            <div class="text-4xl font-black text-blue-400">100K</div>
            <div class="text-xl text-gray-300">Sq. Ft. Facility</div>
          </div>
          <div>
            <div class="text-4xl font-black text-blue-400">15+</div>
            <div class="text-xl text-gray-300">Leading Platforms</div>
          </div>
          <div>
            <div class="text-4xl font-black text-blue-400">99.8%</div>
            <div class="text-xl text-gray-300">On‑Time Delivery</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-20 bg-white">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-black text-slate-800 mb-4">
          Ready to Discuss Your
          <span class="text-blue-600">Market Requirements</span>?
        </h2>
        <p class="text-xl text-gray-600 mb-8">
          Whether you're in aerospace, defense, medical imaging, or commercial
          space – we have the expertise to deliver.
        </p>
        <router-link
          to="/contact"
          class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-blue-600/30"
        >
          Contact Our Market Experts
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
// No additional logic needed
</script>

<style scoped>
/* optional style overrides */
</style>