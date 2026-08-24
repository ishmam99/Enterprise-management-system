<script setup>
const certifications = [
  {
    id: 1,
    name: 'Aerospace Quality Management',
    abbr: 'AS91',
    standard: 'AS9100D',
    description:
      'The internationally recognized quality management standard for the aerospace industry, ensuring consistent product quality, safety, and reliability.',
    scope: ['Aerospace', 'Defense', 'Commercial Aviation'],
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-600',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.0833 15.1999L21.2854 15.9212C21.5221 16.0633 21.5989 16.3704 21.4569 16.6072C21.4146 16.6776 21.3557 16.7365 21.2854 16.7787L12.5144 22.0412C12.1977 22.2313 11.8021 22.2313 11.4854 22.0412L2.71451 16.7787C2.47772 16.6366 2.40093 16.3295 2.54301 16.0927C2.58523 16.0223 2.64413 15.9634 2.71451 15.9212L3.9166 15.1999L11.9999 20.0499L20.0833 15.1999ZM20.0833 10.4999L21.2854 11.2212C21.5221 11.3633 21.5989 11.6704 21.4569 11.9072C21.4146 11.9776 21.3557 12.0365 21.2854 12.0787L11.9999 17.6499L2.71451 12.0787C2.47772 11.9366 2.40093 11.6295 2.54301 11.3927C2.58523 11.3223 2.64413 11.2634 2.71451 11.2212L3.9166 10.4999L11.9999 15.3499L20.0833 10.4999ZM12.5144 1.30864L21.2854 6.5712C21.5221 6.71327 21.5989 7.0204 21.4569 7.25719C21.4146 7.32757 21.3557 7.38647 21.2854 7.42869L11.9999 12.9999L2.71451 7.42869C2.47772 7.28662 2.40093 6.97949 2.54301 6.7427C2.58523 6.67232 2.64413 6.61343 2.71451 6.5712L11.4854 1.30864C11.8021 1.11864 12.1977 1.11864 12.5144 1.30864ZM11.9999 3.33233L5.88723 6.99995L11.9999 10.6676L18.1126 6.99995L11.9999 3.33233Z"/></svg>`
  },
  {
    id: 2,
    name: 'NADCAP – Composites',
    abbr: 'NDC',
    standard: 'NADCAP',
    description:
      'Specialized accreditation for advanced composite manufacturing processes, including automated layup, autoclave cure, and inspection.',
    scope: ['Composites', 'NDT', 'Welding'],
    color: 'from-purple-500 to-pink-500',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-600',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 3C12.6716 3 12 3.67157 12 4.5C12 5.32843 12.6716 6 13.5 6C14.3284 6 15 5.32843 15 4.5C15 3.67157 14.3284 3 13.5 3ZM10.5 8C9.67157 8 9 8.67157 9 9.5C9 10.3284 9.67157 11 10.5 11C11.3284 11 12 10.3284 12 9.5C12 8.67157 11.3284 8 10.5 8ZM8 13.5C8 12.6716 8.67157 12 9.5 12H14.5C15.3284 12 16 12.6716 16 13.5V17H17C18.1046 17 19 16.1046 19 15V9.5C19 8.11929 17.8807 7 16.5 7H7.5C6.11929 7 5 8.11929 5 9.5V15C5 16.1046 5.89543 17 7 17H8V13.5ZM7.5 18H16.5C17.8807 18 19 16.8807 19 15.5V9.5C19 8.11929 17.8807 7 16.5 7H7.5C6.11929 7 5 8.11929 5 9.5V15.5C5 16.8807 6.11929 18 7.5 18Z"/></svg>`
  },
  {
    id: 3,
    name: 'Medical Device Quality',
    abbr: 'ISO',
    standard: 'ISO 13485',
    description:
      'Quality management system specifically designed for medical device manufacturing, ensuring compliance with regulatory requirements.',
    scope: ['Medical Imaging', 'Patient Handling'],
    color: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-600',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9.75 9.75L12 12m0 0l2.25-2.25M12 12l2.25 2.25M12 12L9.75 14.25M12 12v4.5m0-4.5V7.5M12 12l4.5 0M12 12l-4.5 0"/><path d="M15.75 6.75a3.75 3.75 0 00-7.5 0v10.5a3.75 3.75 0 007.5 0V6.75z"/><path d="M19.5 12a7.5 7.5 0 01-15 0 7.5 7.5 0 0115 0z"/></svg>`
  },
  {
    id: 4,
    name: 'ITAR Registration',
    abbr: 'ITAR',
    standard: 'ITAR',
    description:
      'Registered with the U.S. Department of State for the manufacturing of defense articles and services, ensuring compliance with export controls.',
    scope: ['Defense', 'Export Compliance'],
    color: 'from-red-500 to-orange-500',
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-600',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 7v4c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm0 2.18l7 3.89v3.93c0 4.55-3.18 8.98-7 10.32-3.82-1.34-7-5.77-7-10.32V8.07l7-3.89zm-1 4.07v7.5l-2.5-2.5-1.5 1.5 4 4 4-4-1.5-1.5-2.5 2.5V8.25h-2z"/></svg>`
  },
  {
    id: 5,
    name: 'Nadcap – NDT',
    abbr: 'NDT',
    standard: 'NADCAP NDT',
    description:
      'Accreditation for non‑destructive testing methods – ultrasonic, X‑ray, and thermography – ensuring defect‑free components.',
    scope: ['Ultrasonic C‑Scan', 'Radiography', 'Thermography'],
    color: 'from-indigo-500 to-blue-500',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    text: 'text-indigo-600',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/><path d="M12 7v5l3 3"/></svg>`
  },
  {
    id: 6,
    name: 'ISO 9001',
    abbr: 'ISO9',
    standard: 'ISO 9001:2015',
    description:
      'Foundation quality management system that underpins our AS9100D and ISO 13485 certifications, ensuring continuous improvement.',
    scope: ['General Quality', 'Process Management'],
    color: 'from-amber-500 to-yellow-500',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-600',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16V8C21 6.89543 20.1046 6 19 6ZM5 8H19V9H5V8ZM5 11H10V13H5V11ZM5 15H10V16H5V15ZM12 11H19V16H12V11Z"/></svg>`
  }
];

const recognitions = [
  {
    title: 'Lockheed Martin Star Supplier',
    description: 'Recognized for outstanding performance and quality on the F‑35 and other programs.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`,
    color: 'from-yellow-400 to-orange-400',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-600'
  },
  {
    title: 'Boeing Performance Excellence Award',
    description: "Consistently meeting Boeing's rigorous quality and delivery standards.",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`,
    color: 'from-blue-400 to-indigo-400',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-600'
  },
  {
    title: 'NASA Preferred Supplier',
    description: 'Approved to provide composite structures for human spaceflight and exploration programs.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13 9H21L11 24V15H4L13 0V9ZM11 11V7.22063L7.53238 13H13V17.3944L17.263 11H11Z"/></svg>`,
    color: 'from-cyan-400 to-blue-400',
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
    text: 'text-cyan-600'
  }
];
</script>

<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <section
      class="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 text-white py-24 overflow-hidden"
    >
      <div class="absolute inset-0 opacity-20" style="
        background-image: radial-gradient(circle at 30% 40%, rgba(37,99,235,0.3) 0%, transparent 60%),
                          radial-gradient(circle at 70% 80%, rgba(37,99,235,0.15) 0%, transparent 50%);
      "></div>
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
    <section class="py-16 bg-gradient-to-b from-white to-blue-50/30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <div
            class="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full mb-4"
          >
            <span class="w-2 h-2 bg-blue-600 rounded-full"></span>
            <span class="text-sm font-medium text-blue-700">Our Accreditations</span>
          </div>
          <h2 class="text-3xl md:text-4xl font-black text-slate-800">
            <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Independent</span> Validation of Excellence
          </h2>
          <p class="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
            Each certification reflects our unwavering commitment to quality, safety, and continuous improvement.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="cert in certifications"
            :key="cert.id"
            class="group rounded-2xl shadow-lg overflow-hidden border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            :class="[cert.bg, cert.border]"
          >
            <div class="p-6 text-center relative">
              <!-- Decorative gradient bar -->
              <div
                class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r"
                :class="cert.color"
              ></div>
              <!-- Icon + Abbr -->
              <div class="flex justify-center items-center gap-3 mb-4">
                <div class="w-12 h-12 text-current" :class="cert.text" v-html="cert.icon"></div>
                <div
                  class="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center border-2"
                  :class="[cert.border, cert.text]"
                >
                  <span class="text-lg font-black">{{ cert.abbr }}</span>
                </div>
              </div>
              <h3 class="text-xl font-bold text-slate-800">{{ cert.name }}</h3>
              <p class="text-sm font-semibold" :class="cert.text">
                {{ cert.standard }}
              </p>
              <p class="text-gray-600 text-sm leading-relaxed mt-2">
                {{ cert.description }}
              </p>
              <div
                class="mt-4 pt-3 border-t border-gray-200 flex justify-center gap-2 flex-wrap"
              >
                <span
                  v-for="scope in cert.scope"
                  :key="scope"
                  class="text-xs font-medium px-3 py-1 rounded-full bg-white/70 backdrop-blur shadow-sm"
                  :class="[cert.text, cert.bg]"
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
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div
              class="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 px-4 py-2 rounded-full mb-4"
            >
              <span class="w-2 h-2 bg-slate-600 rounded-full"></span>
              <span class="text-sm font-medium text-slate-700">Our Quality Commitment</span>
            </div>
            <h2 class="text-3xl md:text-4xl font-black text-slate-800 mb-4">
              Built on a <span class="text-blue-600">Culture of Quality</span>
            </h2>
            <p class="text-gray-600 mb-4 leading-relaxed">
              Certifications aren't just badges – they reflect a company‑wide
              commitment to excellence. At Vermont Composites, quality is
              embedded in every process, from material receiving to final
              inspection.
            </p>
            <p class="text-gray-600 mb-6 leading-relaxed">
              Our quality management system is designed to meet the most
              demanding customer requirements, including those of major primes
              like Lockheed Martin, Boeing, Northrop Grumman, and NASA.
            </p>
            <ul class="space-y-3">
              <li
                v-for="item in [
                  { label: 'AS9100D – Certified by PRI Registrar', color: 'blue' },
                  { label: 'NADCAP – Composites, NDT, and Welding', color: 'purple' },
                  { label: 'ISO 13485 – Medical Device Quality', color: 'emerald' },
                  { label: 'ITAR – Registered & Compliant', color: 'red' },
                ]"
                :key="item.label"
                class="flex items-start gap-3"
              >
                <div
                  class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  :class="{
                    'bg-blue-100 text-blue-600': item.color === 'blue',
                    'bg-purple-100 text-purple-600': item.color === 'purple',
                    'bg-emerald-100 text-emerald-600': item.color === 'emerald',
                    'bg-red-100 text-red-600': item.color === 'red',
                  }"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-gray-700 text-sm" v-html="item.label.replace(/\u2013/g, '–')"></span>
              </li>
            </ul>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200"
              alt="Quality inspection at Vermont Composites"
              class="rounded-xl shadow-xl w-full h-[400px] object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Customer Recognition -->
    <section class="py-16 bg-gradient-to-b from-blue-50/30 to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <div
            class="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-full mb-4"
          >
            <span class="w-2 h-2 bg-amber-600 rounded-full"></span>
            <span class="text-sm font-medium text-amber-700">Customer Recognition</span>
          </div>
          <h2 class="text-3xl md:text-4xl font-black text-slate-800">
            Trusted by the <span class="text-blue-600">Industry's Best</span>
          </h2>
          <p class="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
            Our quality record has earned us recognition from leading primes.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="rec in recognitions"
            :key="rec.title"
            class="group rounded-2xl p-8 text-center border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            :class="[rec.bg, rec.border]"
          >
            <div
              class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-white shadow-md"
              :class="[rec.text]"
            >
              <div class="w-8 h-8" v-html="rec.icon"></div>
            </div>
            <h3 class="text-xl font-bold text-slate-800">{{ rec.title }}</h3>
            <p class="text-gray-600 mt-2 text-sm">{{ rec.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
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
          class="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-blue-600/30"
        >
          Contact Our Quality Team
        </router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Smooth hover effects */
.group:hover .bg-white\/70 {
  background-color: rgba(255,255,255,0.9);
}
</style>