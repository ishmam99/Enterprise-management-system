<template>
  <section class="bg-white py-20">
    <div class="container mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <span class="text-blue-600 font-semibold text-sm uppercase tracking-wider">Featured Solutions</span>
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
          Industry-Leading Engineering Tools
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Empowering businesses with cutting-edge software solutions for digital transformation and engineering excellence
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
        >
          <!-- Image -->
          <div class="relative overflow-hidden h-64">
            <img
              :src="service.image"
              :alt="service.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <!-- Badge -->
            <div class="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <h3 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
              {{ service.title }}
            </h3>
            <p class="text-gray-600 leading-relaxed mb-6 line-clamp-3">
              {{ service.description }}
            </p>
            
            <!-- CTA Button -->
            <a
              :href="service.link"
              class="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm tracking-wide hover:gap-3 transition-all duration-300 group/link"
            >
              <span>LEARN MORE</span>
              <svg class="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>

          <!-- Hover Effect Border -->
          <div class="absolute inset-0 border-2 border-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import img1 from "../../assets/images/img1.jpg"
import img2 from "../../assets/images/img2.jpg"
import img3 from "../../assets/images/img3.jpg"

const services = [
  {
    title: "Digital Transformation for Manufacturing",
    description:
      "Implement the newest technologies to connect devices and systems, empower people with data, expand the intelligence of your enterprise, and become increasingly autonomous.",
    image: img1,
    link: "#",
  },
  {
    title: "Cradle-PICLS",
    description:
      "PICLS is a thermal simulation tool which helps designers easily perform thermal simulation of PCBs. Even if you are unfamiliar with thermal simulation...",
    image: img2,
    link: "#",
  },
  {
    title: "Design and Engineering Software",
    description:
      "Providing computer-aided engineering (CAE) software to simulate the behaviour of components, assemblies, materials, processes and environments, and engineering software solutions.",
    image: img3,
    link: "#",
  },
]
</script>
