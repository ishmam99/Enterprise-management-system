<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 text-white overflow-hidden">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div class="max-w-4xl mx-auto text-center space-y-6">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2">
            <svg class="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <span class="text-cyan-200 font-semibold">Industry Expertise</span>
          </div>

          <!-- Main Heading -->
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Industries We
            <span class="block mt-2 bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-400 bg-clip-text text-transparent">
              Transform with Technology
            </span>
          </h1>

          <!-- Subheading -->
          <p class="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Delivering advanced MSC Software solutions and engineering services across diverse sectors. 
            From aerospace to medical devices, we help industries innovate, optimize, and excel.
          </p>

          <!-- Stats Row -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-cyan-300">12+</div>
              <div class="text-sm text-gray-300 mt-1">Industries</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-cyan-300">500+</div>
              <div class="text-sm text-gray-300 mt-1">Projects</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-cyan-300">25+</div>
              <div class="text-sm text-gray-300 mt-1">Years Experience</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-cyan-300">99%</div>
              <div class="text-sm text-gray-300 mt-1">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Industries Grid Section -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Industry Solutions
        </h2>
        <p class="text-lg text-gray-600">
          Explore how our MSC Software expertise and engineering services empower your industry
        </p>
      </div>

      <!-- Industries Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        <router-link
          v-for="(item, index) in industries"
          :key="index"
          :to="item.link"
          class="group relative rounded-2xl overflow-hidden h-[280px] shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
        >
          <!-- Image -->
          <img
            :src="item.image"
            :alt="item.name"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
          
          <!-- Industry Icon -->
          <div class="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-cyan-500 transition-all duration-300">
            <component :is="item.icon" class="w-6 h-6 text-white" />
          </div>

          <!-- Content -->
          <div class="absolute bottom-0 left-0 right-0 p-6">
            <h3 class="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
              {{ item.name }}
            </h3>
            <p class="text-sm text-gray-300 mb-3 line-clamp-2">
              {{ item.description }}
            </p>
            
            <!-- View More Button -->
            <div class="flex items-center gap-2 text-cyan-300 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <span>Explore Solutions</span>
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </div>
          </div>

          <!-- Border Glow Effect -->
          <div class="absolute inset-0 border-2 border-transparent group-hover:border-cyan-400 rounded-2xl transition-all duration-300"></div>
        </router-link>
      </div>
    </div>

    <!-- Why Choose Us Section -->
    <div class="bg-gradient-to-br from-blue-50 to-cyan-50 py-16 md:py-24">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <!-- Section Header -->
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industry-Specific Expertise
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              We understand the unique challenges of each industry and deliver tailored solutions
            </p>
          </div>

          <!-- Features Grid -->
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Certified Experts</h3>
              <p class="text-gray-600">Industry-certified engineers with deep domain knowledge</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">MSC Software Suite</h3>
              <p class="text-gray-600">Complete range of simulation and analysis tools</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p class="text-gray-600">Round-the-clock technical assistance and training</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Rapid Deployment</h3>
              <p class="text-gray-600">Quick implementation with minimal disruption</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">FREE Training</h3>
              <p class="text-gray-600">Comprehensive training included with every license</p>
            </div>

            <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div class="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Proven Results</h3>
              <p class="text-gray-600">Track record of successful implementations</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div class="max-w-4xl mx-auto text-center bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        <div class="relative">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Industry?
          </h2>
          <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how our MSC Software solutions can help you innovate and excel
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact_us" class="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2 shadow-lg">
              <span>Contact Our Experts</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>
            
            <a href="/Products_and_services" class="px-8 py-4 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors inline-flex items-center justify-center gap-2 border-2 border-white/30">
              <span>Explore Solutions</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { h } from 'vue'

// Icon components
const AerospaceIcon = (props) => h('svg', { ...props, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, 
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' })
)

const AutomotiveIcon = (props) => h('svg', { ...props, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, 
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' })
)

const ConsumerIcon = (props) => h('svg', { ...props, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, 
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' })
)

const DefenseIcon = (props) => h('svg', { ...props, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, 
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' })
)

const ElectronicsIcon = (props) => h('svg', { ...props, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, 
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z' })
)

const EnergyIcon = (props) => h('svg', { ...props, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, 
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 10V3L4 14h7v7l9-11h-7z' })
)

const EquipmentIcon = (props) => h('svg', { ...props, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, 
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' })
)

const MedicalIcon = (props) => h('svg', { ...props, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, 
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' })
)

const PackagingIcon = (props) => h('svg', { ...props, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, 
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' })
)

const RailIcon = (props) => h('svg', { ...props, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, 
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' })
)

const ShipIcon = (props) => h('svg', { ...props, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, 
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' })
)

const MachineryIcon = (props) => h('svg', { ...props, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, 
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' })
)

const industries = [
  {
    name: "Aerospace",
    image: "/src/assets/images/Aerospace&Defense.png",
    link: "/industries/aerospace",
    description: "Advanced FEA and CFD solutions for aircraft design and analysis",
    icon: AerospaceIcon,
  },
  {
    name: "Automotive",
    image: "/src/assets/images/TransportationMobility.png",
    link: "/industries/automotive",
    description: "Crash analysis, NVH, and structural simulation for vehicles",
    icon: AutomotiveIcon,
  },
  {
    name: "Consumer Products",
    image: "/src/assets/images/Consumer_Packaged_Goods_banner_1.jpg",
    link: "/industries/consumer-products",
    description: "Product design optimization and manufacturing simulation",
    icon: ConsumerIcon,
  },
  {
    name: "Defense",
    image: "/src/assets/images/Aerospace&Defense.png",
    link: "/industries/defense",
    description: "Mission-critical analysis and simulation solutions",
    icon: DefenseIcon,
  },
  {
    name: "Electronics",
    image: "/src/assets/images/HiTechIndustry.png",
    link: "/industries/electronics",
    description: "Thermal, structural, and reliability analysis",
    icon: ElectronicsIcon,
  },
  {
    name: "Energy & Power",
    image: "/src/assets/images/EnergyProcessUtility.png",
    link: "/industries/energy",
    description: "Power generation and renewable energy solutions",
    icon: EnergyIcon,
  },
  {
    name: "Heavy Equipment",
    image: "/src/assets/images/IndustrialEquipment.png",
    link: "/industries/heavy-equipment",
    description: "Structural integrity and performance optimization",
    icon: EquipmentIcon,
  },
  {
    name: "Machinery",
    image: "/src/assets/images/IndustrialEquipment.png",
    link: "/industries/machinery",
    description: "Design validation and durability testing",
    icon: MachineryIcon,
  },
  {
    name: "Medical Devices",
    image: "/src/assets/images/Life_Sciences.jpg",
    link: "/industries/medical",
    description: "Biomedical engineering and device simulation",
    icon: MedicalIcon,
  },
  {
    name: "Packaging",
    image: "/src/assets/images/Consumer_Packaged_Goods_banner_1.jpg",
    link: "/industries/packaging",
    description: "Package design and material optimization",
    icon: PackagingIcon,
  },
  {
    name: "Rail & Transit",
    image: "/src/assets/images/ArchitectureEngineering.png",
    link: "/industries/rail",
    description: "Railway system analysis and safety validation",
    icon: RailIcon,
  },
  {
    name: "Marine & Shipbuilding",
    image: "/src/assets/images/MarineOffshore.png",
    link: "/industries/shipbuilding",
    description: "Naval architecture and offshore structure analysis",
    icon: ShipIcon,
  },
];
</script>

<style scoped>
.bg-grid-pattern {
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
