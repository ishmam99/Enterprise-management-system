<template>
  <section class="relative py-24 overflow-hidden bg-slate-900">
    <!-- Smooth transition from the light section above -->
    <div
      class="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white to-transparent pointer-events-none"
    />

    <!-- Subtle background pattern / glow -->
    <div
      class="absolute inset-0 opacity-30"
      style="
        background-image: radial-gradient(circle at 20% 50%, rgba(37, 99, 235, 0.15) 0%, transparent 60%),
                          radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.08) 0%, transparent 50%);
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
            Industries
          </span>
        </div>

        <h2 class="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
          Industries We Serve
        </h2>

        <p class="text-lg text-gray-400 max-w-2xl mx-auto">
          Specialized composite solutions across three core industries.
        </p>
      </div>

      <!-- Three Industry Cards -->
      <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div
          v-for="(industry, index) in industries"
          :key="index"
          class="group bg-slate-800/60 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-600/10"
        >
          <!-- Image -->
          <div class="relative h-48 overflow-hidden">
            <img
              :src="industry.image"
              :alt="industry.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
          </div>

          <div class="p-8">
            <!-- <div
              class="w-14 h-14 rounded-2xl bg-blue-600/20 flex items-center justify-center mb-5 group-hover:bg-blue-600/30 transition"
            >
              <span class="text-2xl">{{ industry.icon }}</span>
            </div> -->

            <h3 class="text-2xl font-bold text-white mb-3">
              {{ industry.title }}
            </h3>

            <p class="text-gray-400 leading-relaxed mb-6">
              {{ industry.description }}
            </p>

            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tag in industry.tags"
                :key="tag"
                class="text-xs px-3 py-1 rounded-full bg-blue-600/20 text-blue-300 border border-blue-400/20"
              >
                {{ tag }}
              </span>
            </div>

            <div class="flex items-center gap-2 text-blue-400 font-medium text-sm group-hover:gap-3 transition-all">
              <span>Learn More</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom CTA -->
      <!-- <div class="text-center mt-16">
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold transition shadow-lg shadow-blue-600/30"
        >
          View All Capabilities
        </button>
      </div> -->
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const industries = ref([
  {
    title: 'Aerospace & Defense',
    icon: '✈️',
    description:
      'High-performance radomes, lightweight structural components, and EMI shielding for mission-critical aircraft, UAVs, and ground defense systems.',
    image:
      '/src/assets/images/f16.png',
    tags: ['Radomes', 'Structural Components', 'EMI Shielding']
  },
  {
    title: 'Automotive',
    icon: '🚗',
    description:
      'Lightweight composite body panels, structural reinforcements, and high-performance components for electric and conventional vehicles requiring strength and weight reduction.',
    image:
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80',
    tags: ['Body Panels', 'Structural Parts', 'EV Components']
  },
  {
    title: 'Medical',
    icon: '🏥',
    description:
      'Precision composite enclosures, patient-handling components, and non-magnetic structures for MRI, CT, and PET scanners requiring radiolucent and biocompatible properties.',
    image:
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
    tags: ['MRI Components', 'CT Tables', 'Non-Magnetic']
  }
])
</script>