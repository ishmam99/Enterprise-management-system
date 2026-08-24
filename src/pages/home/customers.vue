<template>
  <div class="bg-slate-950 text-white min-h-screen">
    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <!-- Background gradient -->
      <div class="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
      <div class="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent"></div>
      
      <!-- Decorative lines -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-1/4 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
        <div class="absolute bottom-1/4 right-0 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
        <div class="text-center max-w-4xl mx-auto">
          <div class="inline-block mb-4">
            <span class="text-xs font-semibold tracking-[0.3em] uppercase text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full">
              Customers &amp; Partners
            </span>
          </div>
          
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Trusted by the Teams Behind
            <span class="bg-gradient-to-r from-blue-400 via-blue-300 to-sky-400 bg-clip-text text-transparent">Mission-Critical Systems</span>
          </h1>
          
          <p class="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Vermont Composites supports demanding aerospace, defense, space, and medical applications through advanced composite manufacturing and engineering expertise.
          </p>
        </div>
      </div>
    </section>

    <!-- Industry Filtering -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
      <div class="bg-slate-900/80 backdrop-blur-sm border border-slate-800/60 rounded-2xl p-4 md:p-6">
        <div class="flex flex-wrap items-center justify-center gap-2 md:gap-3">
          <button
            v-for="industry in industries"
            :key="industry"
            @click="activeIndustry = industry"
            class="px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300"
            :class="activeIndustry === industry 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 ring-1 ring-blue-400/50' 
              : 'text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700'"
          >
            {{ industry }}
          </button>
        </div>
      </div>
    </section>

    <!-- Our Customers Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div class="text-center mb-12 md:mb-16">
        <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Our <span class="text-blue-400">Customers</span>
        </h2>
        <p class="text-slate-400 max-w-2xl mx-auto text-lg">
          We work with organizations operating at the highest levels of aerospace, defense, space, and medical technology.
        </p>
        <div class="w-20 h-1 bg-gradient-to-r from-blue-600 to-sky-400 rounded-full mx-auto mt-4"></div>
      </div>

      <!-- Customer Grid -->
      <div 
        v-if="filteredCustomers.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        <div
          v-for="customer in filteredCustomers"
          :key="customer.name"
          class="group bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-sm border border-slate-800/60 hover:border-blue-500/40 rounded-2xl p-6 md:p-8 transition-all duration-500 hover:-translate-y-1 shadow-xl hover:shadow-2xl hover:shadow-blue-500/5"
        >
          <!-- Logo/Icon -->
          <div class="flex items-center justify-center w-16 h-16 rounded-xl bg-slate-800/80 border border-slate-700/50 mb-5 group-hover:border-blue-500/30 transition-colors duration-300">
            <span class="text-2xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors">
              {{ customer.name.charAt(0) }}
            </span>
          </div>

          <!-- Customer Name -->
          <h3 class="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
            {{ customer.name }}
          </h3>
          
          <!-- Industry -->
          <div class="inline-block bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-0.5 text-xs font-medium text-blue-400 mb-4">
            {{ customer.industry }}
          </div>

          <!-- Programs -->
          <div class="mb-4">
            <p class="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Programs Supported</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="program in customer.programs"
                :key="program"
                class="text-xs bg-slate-800/80 border border-slate-700/50 rounded-full px-3 py-1 text-slate-300"
              >
                {{ program }}
              </span>
            </div>
          </div>

          <!-- Relationship -->
          <p class="text-sm text-slate-400 leading-relaxed mb-5 line-clamp-3">
            {{ customer.relationship }}
          </p>

          <!-- Website Link -->
          <a
            v-if="customer.website"
            :href="customer.website"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors group"
          >
            Explore Customer
            <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <p class="text-slate-400">No customers found for this category.</p>
      </div>
    </section>

    <!-- Featured Customer Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
      <div 
        v-if="featuredCustomer"
        class="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800/60 border border-slate-800/60 rounded-3xl p-8 md:p-12 lg:p-16"
      >
        <!-- Decorative background -->
        <div class="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-500/5 to-transparent"></div>
        <div class="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-t from-blue-400/5 to-transparent"></div>
        
        <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <div class="flex items-center gap-3 mb-3">
              <span class="text-xs font-semibold tracking-[0.2em] uppercase text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5">
                Featured Partner
              </span>
            </div>
            
            <h3 class="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              {{ featuredCustomer.name }}
            </h3>
            
            <div class="inline-block bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-0.5 text-sm font-medium text-blue-400 mb-4">
              {{ featuredCustomer.industry }}
            </div>

            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="program in featuredCustomer.programs"
                :key="program"
                class="text-sm bg-slate-800/80 border border-slate-700/50 rounded-full px-4 py-1.5 text-slate-300"
              >
                {{ program }}
              </span>
            </div>

            <p class="text-slate-300 leading-relaxed mb-6 max-w-xl">
              {{ featuredCustomer.relationship }}
            </p>

            <a
              :href="featuredCustomer.website"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
            >
              Learn More
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>

          <div class="hidden lg:flex items-center justify-center">
            <div class="w-full aspect-square max-w-md rounded-2xl bg-gradient-to-br from-blue-600/10 via-slate-800/50 to-slate-900/80 border border-slate-700/50 flex items-center justify-center">
              <div class="text-center p-8">
                <span class="text-7xl font-bold text-blue-400/30">{{ featuredCustomer.name.charAt(0) }}</span>
                <p class="text-slate-500 text-sm mt-4">Premium Composite Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Selected Programs Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Selected <span class="text-blue-400">Programs</span>
        </h2>
        <p class="text-slate-400 max-w-2xl mx-auto">
          These mission-critical platforms demonstrate the caliber of programs associated with Vermont Composites' customer relationships.
        </p>
        <div class="w-20 h-1 bg-gradient-to-r from-blue-600 to-sky-400 rounded-full mx-auto mt-4"></div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="program in referencePrograms"
          :key="program.name"
          class="bg-slate-900/60 border border-slate-800/60 hover:border-blue-500/30 rounded-xl p-5 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/5"
        >
          <div class="text-sm font-medium text-slate-300">{{ program.name }}</div>
          <div class="text-xs text-slate-500 mt-1">{{ program.category }}</div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
      <div class="relative overflow-hidden bg-gradient-to-br from-blue-950/40 via-slate-900 to-slate-950/80 border border-blue-500/20 rounded-3xl p-8 md:p-12 lg:p-16 text-center">
        <!-- Decorative elements -->
        <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
        
        <h3 class="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
          Building the Next Generation of <span class="text-blue-400">Mission-Critical Systems</span>?
        </h3>
        
        <p class="text-slate-400 max-w-2xl mx-auto mb-8 text-lg">
          Talk with Vermont Composites about your next advanced composite manufacturing challenge.
        </p>

        <div class="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#"
            class="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
          >
            Contact Our Team
          </a>
          <a
            href="#"
            class="px-8 py-3.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-white font-medium rounded-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            Explore Capabilities
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeIndustry = ref('All')

const industries = ['All', 'Aerospace & Defense', 'Space', 'Medical']

// Verified Customers based on research
const customers = [
  {
    name: 'Sikorsky Aircraft Corporation',
    industry: 'Aerospace & Defense',
    website: 'https://www.lockheedmartin.com/en-us/who-we-are/business-areas/sikorsky.html',
    programs: ['UH-60 Black Hawk', 'MH-60R', 'F-35 Lightning II'],
    relationship: 'Vermont Composites partnered with Sikorsky on the MH-60R radome program since 2002, delivering over 200 units. Awarded "Rotary and Mission Systems Elite Supplier" status.',
    verified: true
  },
  {
    name: 'Boeing',
    industry: 'Aerospace & Defense',
    website: 'https://www.boeing.com',
    programs: ['P-8 Poseidon', 'C-130 Hercules'],
    relationship: 'Vermont Composites holds platform positions on Boeing\'s P-8 Poseidon and C-130 Hercules programs, providing composite structures for these aircraft.',
    verified: true
  },
  {
    name: 'Bell-Boeing (V-22 Osprey)',
    industry: 'Aerospace & Defense',
    website: 'https://www.boeing.com/defense/v-22-osprey',
    programs: ['V-22 Osprey'],
    relationship: 'Vermont Composites supplies composite structures for the V-22 Osprey tiltrotor aircraft, a joint program between Bell Helicopter and Boeing.',
    verified: true
  },
  {
    name: 'Lockheed Martin',
    industry: 'Aerospace & Space',
    website: 'https://www.lockheedmartin.com',
    programs: ['F-35 Lightning II', 'Orion Spacecraft'],
    relationship: 'Vermont Composites supports F-35 programs through the Sikorsky relationship. The company\'s composite expertise aligns with Orion spacecraft requirements.',
    verified: true
  },
  {
    name: 'Northrop Grumman',
    industry: 'Aerospace & Defense',
    website: 'https://www.northropgrumman.com',
    programs: ['Global Hawk', 'Triton'],
    relationship: 'Vermont Composites has positions on various UAV platforms including the Global Hawk and Triton, supporting intelligence, surveillance, and reconnaissance applications.',
    verified: true
  },
  {
    name: 'Siemens Healthineers',
    industry: 'Medical',
    website: 'https://www.siemens-healthineers.com',
    programs: ['Medical Imaging Systems'],
    relationship: 'Vermont Composites is a recognized supplier to the medical imaging industry, producing radiolucent carbon fiber components for imaging tables and equipment.',
    verified: true
  }
]

const referencePrograms = [
  { name: 'F-35 Lightning II', category: 'Joint Strike Fighter' },
  { name: 'F/A-18 Hornet', category: 'Strike Fighter' },
  { name: 'P-8 Poseidon', category: 'Maritime Patrol' },
  { name: 'Orion Spacecraft', category: 'Space Exploration' },
  { name: 'UH-60 Black Hawk', category: 'Utility Helicopter' },
  { name: 'Global Hawk / Triton', category: 'UAV / ISR' },
  { name: 'V-22 Osprey', category: 'Tiltrotor Aircraft' },
  { name: 'C-130 Hercules', category: 'Tactical Airlift' }
]

const filteredCustomers = computed(() => {
  if (activeIndustry.value === 'All') {
    return customers
  }
  return customers.filter(c => c.industry === activeIndustry.value)
})

// Featured customer - first verified customer
const featuredCustomer = computed(() => {
  return customers.find(c => c.verified === true)
})
</script>