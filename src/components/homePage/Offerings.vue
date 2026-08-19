<template>
  <div class="offerings-container py-16 px-4 md:px-8 lg:px-24 ">
    <!-- Header -->
    <!-- <div class="text-center mb-16">
      <h1 class="text-4xl font-bold text-[#013067] relative inline-block">
        Our Offerings
        <span class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-teal-400 to-blue-600 rounded-full"></span>
      </h1>
      <p class="text-gray-600 mt-6 max-w-2xl mx-auto text-lg">
        Discover our comprehensive range of services and solutions designed to meet your needs
      </p>
    </div> -->

    <!-- Offerings Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Offering Card Template -->
      <div 
        v-for="(offering, index) in offerings" 
        :key="index"
        class="offering-card relative overflow-hidden group rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500"
        :style="`--delay: ${index * 100}ms`"
      >
        <!-- Image Container -->
        <div class="h-64 overflow-hidden relative">
          <img 
            :src="offering.image" 
            :alt="offering.title"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          >
          <!-- Overlay Gradient -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
          
          <!-- Icon -->
          <div class="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xl">
            <i :class="offering.icon"></i>
          </div>
        </div>
        
        <!-- Content -->
        <div class="absolute bottom-0 left-0 w-full p-6 text-white">
          <h3 class="text-xl font-bold mb-2 transform transition-transform duration-500 group-hover:translate-y-1">
            {{ offering.title }}
          </h3>
          <p class="text-sm opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-500 delay-200 overflow-hidden">
            {{ offering.description }}
          </p>
          
          <!-- Button -->
          <div class="mt-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-300">
            <button class="px-4 py-2 bg-white text-gray-800 text-sm font-semibold rounded-full hover:bg-teal-50 transition-colors flex items-center">
              Learn More
              <i class="fas fa-arrow-right ml-2 text-xs"></i>
            </button>
          </div>
        </div>
        
        <!-- Hover Border Effect -->
        <div class="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl transition-all duration-500"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import res1 from "../../assets/images/img1.jpg";
import res2 from "../../assets/images/img2.jpg";
import res3 from "../../assets/images/img3.jpg";
import res4 from "../../assets/images/img4.jpg";
import res5 from "../../assets/images/img1.jpg";
import res6 from "../../assets/images/img2.jpg";
const offerings = ref([
  {
    title: 'Hotel Development',
   

    image: res1,
    icon: 'fas fa-building',
    description: 'Complete solutions for hotel construction, design, and development projects.'
  },
  {
    title: 'Operations and Maintenance',
    image: res2,
    icon: 'fas fa-cogs',
    description: 'Professional maintenance services to keep your systems running smoothly.'
  },
  {
    title: 'Wi-Fi Solutions',
    image: res3,
    icon: 'fas fa-wifi',
    description: 'High-performance wireless networking solutions for any environment.'
  },
  {
    title: 'Appliances',
    image: res4,
    icon: 'fas fa-blender',
    description: 'Premium appliances for hospitality and commercial applications.'
  },
  {
    title: 'Surveillance',
    image: res5,
    icon: 'fas fa-video',
    description: 'Advanced security and surveillance systems for complete peace of mind.'
  },
  {
    title: 'Structured Cable',
    image: res6,
    icon: 'fas fa-network-wired',
    description: 'Professional cabling infrastructure for reliable connectivity.'
  }
])
</script>

<style scoped>
.offerings-container {
  font-family: 'Inter', sans-serif;
}

.offering-card {
  animation: fadeInUp 0.6s ease-out both;
  animation-delay: var(--delay);
}

.offering-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 103, 123, 0.2) 0%, rgba(0, 68, 107, 0.2) 100%);
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: 1;
}

.offering-card:hover::before {
  opacity: 1;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .offerings-container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>