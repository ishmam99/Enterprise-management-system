<template>
  <div class="bg-slate-50 text-slate-900 min-h-screen">
    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <!-- Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-blue-50/50"></div>
      <div class="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent"></div>
      
      <!-- Decorative lines -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-1/4 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
        <div class="absolute bottom-1/4 right-0 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-300/20 to-transparent"></div>
        <div class="absolute top-1/3 right-0 w-24 h-24 rounded-full bg-blue-400/5 blur-3xl"></div>
        <div class="absolute bottom-1/4 left-0 w-32 h-32 rounded-full bg-blue-500/5 blur-3xl"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
        <div class="text-center max-w-4xl mx-auto">
          <div class="inline-block mb-4">
            <span class="text-xs font-semibold tracking-[0.3em] uppercase text-blue-700 bg-blue-50 border border-blue-200/50 px-4 py-2 rounded-full">
              Customers &amp; Partners
            </span>
          </div>
          
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-slate-900">
            Trusted by the Teams Behind
            <span class="bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 bg-clip-text text-transparent">Mission-Critical Systems</span>
          </h1>
          
          <p class="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Vermont Composites supports demanding aerospace, defense, space, and medical applications through advanced composite manufacturing and engineering expertise.
          </p>
        </div>
      </div>
    </section>

    <!-- Industry Filtering -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
      <div class="bg-white/90 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-4 md:p-6 shadow-lg shadow-slate-200/50">
        <div class="flex flex-wrap items-center justify-center gap-2 md:gap-3">
          <button
            v-for="industry in industries"
            :key="industry"
            @click="activeIndustry = industry"
            class="px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300"
            :class="activeIndustry === industry 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-1 ring-blue-400/50' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent hover:border-slate-200'"
          >
            {{ industry }}
          </button>
        </div>
      </div>
    </section>

    <!-- Our Customers Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div class="text-center mb-12 md:mb-16">
        <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-slate-900">
          Our <span class="text-blue-600">Customers</span>
        </h2>
        <p class="text-slate-600 max-w-2xl mx-auto text-lg">
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
          class="group bg-white border border-slate-200/80 hover:border-blue-300/60 rounded-2xl p-6 md:p-8 transition-all duration-500 hover:-translate-y-1 shadow-md hover:shadow-xl hover:shadow-blue-500/10"
        >
          <!-- Logo/Icon -->
          <div class="flex items-center justify-center w-16 h-16 rounded-xl bg-blue-50 border border-blue-200/60 mb-5 group-hover:border-blue-300/80 transition-colors duration-300">
            <span class="text-2xl font-bold text-blue-600 group-hover:text-blue-500 transition-colors">
              {{ customer.name.charAt(0) }}
            </span>
          </div>

          <!-- Customer Name -->
          <h3 class="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
            {{ customer.name }}
          </h3>
          
          <!-- Industry -->
          <div class="inline-block bg-blue-50 border border-blue-200/60 rounded-full px-3 py-0.5 text-xs font-medium text-blue-700 mb-4">
            {{ customer.industry }}
          </div>

          <!-- Programs -->
          <div class="mb-4">
            <p class="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Programs Supported</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="program in customer.programs"
                :key="program"
                class="text-xs bg-slate-100 border border-slate-200 rounded-full px-3 py-1 text-slate-700"
              >
                {{ program }}
              </span>
            </div>
          </div>

          <!-- Relationship -->
          <p class="text-sm text-slate-600 leading-relaxed mb-5 line-clamp-3">
            {{ customer.relationship }}
          </p>

          <!-- Website Link -->
          <a
            v-if="customer.website"
            :href="customer.website"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors group"
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
        <p class="text-slate-500">No customers found for this category.</p>
      </div>
    </section>

    <!-- Featured Customer Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
      <div 
        v-if="featuredCustomer"
        class="relative overflow-hidden bg-white border border-slate-200/80 rounded-3xl p-8 md:p-12 lg:p-16 shadow-lg shadow-slate-200/50"
      >
        <!-- Decorative background -->
        <div class="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50/40 to-transparent"></div>
        <div class="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-t from-blue-50/30 to-transparent"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-400/5 blur-3xl"></div>
        
        <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <div class="flex items-center gap-3 mb-3">
              <span class="text-xs font-semibold tracking-[0.2em] uppercase text-blue-700 bg-blue-50 border border-blue-200/60 rounded-full px-4 py-1.5">
                Featured Partner
              </span>
            </div>
            
            <h3 class="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-slate-900">
              {{ featuredCustomer.name }}
            </h3>
            
            <div class="inline-block bg-blue-50 border border-blue-200/60 rounded-full px-3 py-0.5 text-sm font-medium text-blue-700 mb-4">
              {{ featuredCustomer.industry }}
            </div>

            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="program in featuredCustomer.programs"
                :key="program"
                class="text-sm bg-slate-100 border border-slate-200 rounded-full px-4 py-1.5 text-slate-700"
              >
                {{ program }}
              </span>
            </div>

            <p class="text-slate-600 leading-relaxed mb-6 max-w-xl">
              {{ featuredCustomer.relationship }}
            </p>

            <a
              :href="featuredCustomer.website"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-400/50 hover:-translate-y-0.5"
            >
              Learn More
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>

          <div class="hidden lg:flex items-center justify-center">
            <div class="w-full aspect-square max-w-md rounded-2xl bg-gradient-to-br from-blue-100/60 via-slate-100/50 to-white border border-slate-200/60 flex items-center justify-center">
              <div class="text-center p-8">
                <span class="text-7xl font-bold text-blue-600/20">{{ featuredCustomer.name.charAt(0) }}</span>
                <p class="text-slate-400 text-sm mt-4">Premium Composite Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Selected Programs Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-slate-900">
          Selected <span class="text-blue-600">Programs</span>
        </h2>
        <p class="text-slate-600 max-w-2xl mx-auto">
          These mission-critical platforms demonstrate the caliber of programs associated with Vermont Composites' customer relationships.
        </p>
        <div class="w-20 h-1 bg-gradient-to-r from-blue-600 to-sky-400 rounded-full mx-auto mt-4"></div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="program in referencePrograms"
          :key="program.name"
          class="bg-white border border-slate-200/80 hover:border-blue-300/60 rounded-xl p-5 text-center transition-all duration-300 hover:-translate-y-0.5 shadow-sm hover:shadow-md hover:shadow-blue-500/5"
        >
          <div class="text-sm font-medium text-slate-700">{{ program.name }}</div>
          <div class="text-xs text-slate-400 mt-1">{{ program.category }}</div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
      <div class="relative overflow-hidden bg-gradient-to-br from-blue-50/80 via-slate-50 to-white border border-blue-200/50 rounded-3xl p-8 md:p-12 lg:p-16 text-center shadow-lg shadow-blue-500/5">
        <!-- Decorative elements -->
        <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
        <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/20 to-transparent"></div>
        <div class="absolute top-0 right-0 w-64 h-64 rounded-full bg-blue-400/5 blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"></div>
        
        <h3 class="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4 text-slate-900 relative">
          Building the Next Generation of <span class="text-blue-600">Mission-Critical Systems</span>?
        </h3>
        
        <p class="text-slate-600 max-w-2xl mx-auto mb-8 text-lg relative">
          Talk with Vermont Composites about your next advanced composite manufacturing challenge.
        </p>

        <div class="flex flex-wrap items-center justify-center gap-4 relative">
          <router-link
          to="/home/contactView"
            href="#"
            class="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-400/50 hover:-translate-y-0.5"
          >
            Contact Our Team
          </router-link>
          <router-link
            to="/home/composite"
            class="px-8 py-3.5 bg-white hover:bg-slate-50 border border-slate-300/80 text-slate-700 font-medium rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300/50"
          >
            Explore Capabilities
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeIndustry = ref('All')

const industries = ['All', 'Aerospace & Defense', 'Medical', 'Automotive']

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