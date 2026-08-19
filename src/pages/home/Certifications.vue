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
            Certifications
          </span>
        </div>
        <h1 class="text-4xl md:text-5xl font-black mb-4">
          Quality <span class="text-blue-400">Recognized</span> Worldwide
        </h1>
        <p class="text-xl max-w-3xl mx-auto text-gray-300">
          We hold the most rigorous aerospace, defense, and medical certifications –
          AS9100D, NADCAP, ISO 13485, and more. Every part meets or exceeds
          the highest industry standards.
        </p>
      </div>
    </section>

    <!-- Certification Grid -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-black text-slate-800">
            Our <span class="text-blue-600">Accreditations</span>
          </h2>
          <p class="text-xl text-gray-600 mt-2">
            Independent validation of our quality, process, and product excellence.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="cert in certifications"
            :key="cert.id"
            class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition"
          >
            <div class="p-6 text-center">
              <!-- Icon or logo placeholder -->
              <div
                class="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4"
              >
                <span class="text-3xl font-black text-blue-600">{{
                  cert.abbr
                }}</span>
              </div>
              <h3 class="text-2xl font-bold text-slate-800">{{ cert.name }}</h3>
              <p class="text-sm text-blue-600 font-semibold mb-2">
                {{ cert.standard }}
              </p>
              <p class="text-gray-600 text-sm leading-relaxed">
                {{ cert.description }}
              </p>
              <div
                class="mt-3 pt-3 border-t border-gray-100 flex justify-center gap-2 flex-wrap"
              >
                <span
                  v-for="scope in cert.scope"
                  :key="scope"
                  class="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
                >
                  {{ scope }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quality Approach -->
    <section class="py-16 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div
              class="inline-flex items-center gap-2 bg-slate-200/50 border border-slate-300 px-4 py-2 rounded-full mb-4"
            >
              <span class="w-2 h-2 bg-slate-600 rounded-full"></span>
              <span class="text-sm font-medium text-slate-700"
                >Our Quality Commitment</span
              >
            </div>
            <h2 class="text-3xl font-black text-slate-800 mb-4">
              Built on a <span class="text-blue-600">Culture of Quality</span>
            </h2>
            <p class="text-gray-600 mb-4 leading-relaxed">
              Certifications aren't just badges – they reflect a company‑wide
              commitment to excellence. At Vermont Composites, quality is
              embedded in every process, from material receiving to final
              inspection.
            </p>
            <p class="text-gray-600 mb-4 leading-relaxed">
              Our quality management system is designed to meet the most
              demanding customer requirements, including those of major primes
              like Lockheed Martin, Boeing, Northrop Grumman, and NASA.
            </p>
            <ul class="space-y-2">
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
                  ><strong>AS9100D</strong> – Certified by PRI Registrar</span
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
                  ><strong>NADCAP</strong> – Composites, NDT, and Welding</span
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
                  ><strong>ISO 13485</strong> – Medical Device Quality</span
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
                  ><strong>ITAR</strong> – Registered &amp; Compliant</span
                >
              </li>
            </ul>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200"
              alt="Quality inspection at Vermont Composites"
              class="rounded-xl shadow-xl w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Customer Recognition -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <div
            class="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full mb-4"
          >
            <span class="w-2 h-2 bg-blue-600 rounded-full"></span>
            <span class="text-sm font-medium text-blue-700"
              >Customer Recognition</span
            >
          </div>
          <h2 class="text-3xl font-black text-slate-800">
            Trusted by the <span class="text-blue-600">Industry's Best</span>
          </h2>
          <p class="text-xl text-gray-600 mt-2">
            Our quality record has earned us recognition from leading primes.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-slate-50 p-6 rounded-xl text-center border border-gray-100">
            <div class="text-4xl text-blue-600 mb-3">⭐</div>
            <h3 class="text-lg font-bold text-slate-800">
              Lockheed Martin Star Supplier
            </h3>
            <p class="text-sm text-gray-600 mt-2">
              Recognized for outstanding performance and quality on the F‑35
              and other programs.
            </p>
          </div>
          <div class="bg-slate-50 p-6 rounded-xl text-center border border-gray-100">
            <div class="text-4xl text-blue-600 mb-3">🏆</div>
            <h3 class="text-lg font-bold text-slate-800">
              Boeing Performance Excellence Award
            </h3>
            <p class="text-sm text-gray-600 mt-2">
              Consistently meeting Boeing's rigorous quality and delivery
              standards.
            </p>
          </div>
          <div class="bg-slate-50 p-6 rounded-xl text-center border border-gray-100">
            <div class="text-4xl text-blue-600 mb-3">🚀</div>
            <h3 class="text-lg font-bold text-slate-800">
              NASA Preferred Supplier
            </h3>
            <p class="text-sm text-gray-600 mt-2">
              Approved to provide composite structures for human spaceflight
              and exploration programs.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-black mb-4">
          Need a Certified <span class="text-blue-400">Composite Partner</span>?
        </h2>
        <p class="text-xl text-gray-300 mb-8">
          Let's discuss your program requirements and how our certified quality
          systems can support your mission.
        </p>
        <router-link
          to="/contact"
          class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-blue-600/30"
        >
          Contact Our Quality Team
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
      'The internationally recognized quality management standard for the aerospace industry, ensuring consistent product quality, safety, and reliability.',
    scope: ['Aerospace', 'Defense', 'Commercial Aviation']
  },
  {
    id: 2,
    name: 'NADCAP – Composites',
    abbr: 'NDC',
    standard: 'NADCAP',
    description:
      'Specialized accreditation for advanced composite manufacturing processes, including automated layup, autoclave cure, and inspection.',
    scope: ['Composites', 'NDT', 'Welding']
  },
  {
    id: 3,
    name: 'Medical Device Quality',
    abbr: 'ISO',
    standard: 'ISO 13485',
    description:
      'Quality management system specifically designed for medical device manufacturing, ensuring compliance with regulatory requirements.',
    scope: ['Medical Imaging', 'Patient Handling']
  },
  {
    id: 4,
    name: 'ITAR Registration',
    abbr: 'ITAR',
    standard: 'ITAR',
    description:
      'Registered with the U.S. Department of State for the manufacturing of defense articles and services, ensuring compliance with export controls.',
    scope: ['Defense', 'Export Compliance']
  },
  {
    id: 5,
    name: 'Nadcap – NDT',
    abbr: 'NDT',
    standard: 'NADCAP NDT',
    description:
      'Accreditation for non‑destructive testing methods – ultrasonic, X‑ray, and thermography – ensuring defect‑free components.',
    scope: ['Ultrasonic C‑Scan', 'Radiography', 'Thermography']
  },
  {
    id: 6,
    name: 'ISO 9001',
    abbr: 'ISO9',
    standard: 'ISO 9001:2015',
    description:
      'Foundation quality management system that underpins our AS9100D and ISO 13485 certifications, ensuring continuous improvement.',
    scope: ['General Quality', 'Process Management']
  }
];
</script>

<style scoped>
/* optional style overrides */
</style>