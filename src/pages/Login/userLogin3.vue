<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-6">
    <div class="w-full max-w-4xl flex flex-col items-center">
      <!-- Header -->
      <div class="text-center mb-12">
        <img src="/public/Hi-tech_softsys_Logo_Black.png" alt="Logo" class="w-48 mx-auto mb-4" />
        <h1 class="text-4xl font-bold text-white mb-2">Hi-Tech SoftSys</h1>
        <h2 class="text-xl text-blue-200">Technology Management System</h2>
      </div>

      <!-- Main Circular Menu Container -->
      <div class="relative w-[500px] h-[500px]">

        <!-- Outer Industries Menu (appears when login type is selected) -->
        <div
          v-if="activeLoginType"
          class="absolute inset-0 transition-all duration-500"
          :class="outerMenuVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"
        >
          <!-- Industries Circle Background -->
          <div class="absolute inset-0 rounded-full border-2 border-white/20 bg-black/20 backdrop-blur-sm"></div>

          <!-- Industry Sectors -->
          <button
            v-for="(industry, index) in industries"
            :key="industry"
            @click="selectIndustry(industry)"
            class="absolute flex items-center justify-center w-20 h-20 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-xs font-medium text-center shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-cyan-500/50 z-20"
            :style="getSectorPosition(index)"
          >
            <span class="px-2">{{ industry }}</span>
          </button>
        </div>

        <!-- SVG Circular Login Menu -->
        <svg
          width="500"
          height="500"
          viewBox="0 0 500 500"
          class="absolute inset-0 z-10"
        >
          <!-- Customer Login Segment -->
          <path
            d="M250,250 L250,50 A200,200 0 0,1 433.01,366.01 Z"
            :fill="activeLoginType === 'customer' ? '#4f46e5' : '#A054FF'"
            stroke="#ffffff40"
            stroke-width="2"
            class="cursor-pointer transition-all duration-300 hover:fill-indigo-600"
            @click="selectLoginType('customer')"
          />

          <!-- Partner Login Segment -->
          <path
            d="M250,250 L433.01,366.01 A200,200 0 0,1 66.99,366.01 Z"
            :fill="activeLoginType === 'partner' ? '#059669' : '#FF66A5'"
            stroke="#ffffff40"
            stroke-width="2"
            class="cursor-pointer transition-all duration-300 hover:fill-emerald-600"
            @click="selectLoginType('partner')"
          />

          <!-- User Login Segment -->
          <path
            d="M250,250 L66.99,366.01 A200,200 0 0,1 250,50 Z"
            :fill="activeLoginType === 'user' ? '#dc2626' : '#B76BC0'"
            stroke="#ffffff40"
            stroke-width="2"
            class="cursor-pointer transition-all duration-300 hover:fill-red-600"
            @click="selectLoginType('user')"
          />

          <!-- Outer Circle Outline -->
          <circle
            cx="250"
            cy="250"
            r="200"
            fill="none"
            stroke="#3B82F6"
            stroke-width="2"
          />

          <!-- Curved Text Paths -->
          <defs>
            <path id="customerPath" d="M240,80 A170,170 0 0,1 400,300" />
            <path id="partnerPath" d="M420,320 A170,170 0 0,1 80,320" />
            <path id="userPath" d="M80,320 A170,170 0 0,1 240,80" />
          </defs>

          <!-- Customer Login Text -->
          <text
            fill="white"
            font-size="16"
            font-weight="600"
            class="cursor-pointer"
            @click="selectLoginType('customer')"
          >
            <textPath href="#customerPath" startOffset="35%">Customer Login</textPath>
          </text>

          <!-- Partner Login Text -->
          <text
            fill="white"
            font-size="16"
            font-weight="600"
            class="cursor-pointer"
            @click="selectLoginType('partner')"
          >
            <textPath href="#partnerPath" startOffset="30%">Partner Login</textPath>
          </text>

          <!-- User Login Text -->
          <text
            fill="white"
            font-size="16"
            font-weight="600"
            class="cursor-pointer"
            @click="selectLoginType('user')"
          >
            <textPath href="#userPath" startOffset="15%">User Login</textPath>
          </text>
        </svg>

        <!-- Center Circle -->
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <div class="w-48 h-48 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl border-2 border-white/20">
            <div class="text-center text-white px-4">
              <h3 class="text-lg font-bold mb-2">
                {{ activeLoginType ? `${activeLoginType} Login` : 'Technology Management' }}
              </h3>
              <p class="text-sm">
                {{ activeLoginType ? 'Select Industry' : 'Select Login Type' }}
              </p>
              <p v-if="selectedIndustry" class="text-xs mt-2 font-semibold">
                {{ selectedIndustry }}
              </p>
            </div>
          </div>
        </div>
      </div>


    </div>
  </div>
  <!-- <template> -->
    <div class="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-green-100">
    <div class="relative">
      <svg width="400" height="400" viewBox="0 0 400 400">
        <!-- ===== Circle Segments (Each 120°) ===== -->
        <!-- User Login -->
        <path
          d="M200,200 L200,40 A160,160 0 0,1 338.56,280 Z"
          fill="#A054FF"
          stroke="#3B82F6"
          stroke-width="1"
        />

        <!-- Partner Login -->
        <path
          d="M200,200 L338.56,280 A160,160 0 0,1 61.44,280 Z"
          fill="#FF66A5"
          stroke="#3B82F6"
          stroke-width="1"
        />

        <!-- Customer Login -->
        <path
          d="M200,200 L61.44,280 A160,160 0 0,1 200,40 Z"
          fill="#B76BC0"
          stroke="#3B82F6"
          stroke-width="1"
        />

        <!-- Outer Circle Outline -->
        <circle cx="200" cy="200" r="160" fill="none" stroke="#3B82F6" stroke-width="2" />

        <!-- ===== Curved Texts (inside each arc) ===== -->
        <defs>
          <!-- Paths for text inside each 120° area -->
          <path id="userPath" d="M190,70 A130,130 0 0,1 310,230" />
          <path id="partnerPath" d="M310,260 A130,130 0 0,1 90,230" />
          <path id="customerPath" d="M90,230 A130,130 0 0,1 190,70" />
        </defs>

        <!-- User Login -->
        <text class="text-white font-bold text-xl" fill="white" font-size="16" font-weight="600">
          <textPath href="#userPath" class="text-white" startOffset="35%">User Login</textPath>
        </text>

        <!-- Partner Login -->
         <text class="text-white font-bold text-xl" fill="white" font-size="16" font-weight="600">
          <textPath href="#partnerPath" class="text-white" startOffset="25%">Partner Login</textPath>
        </text>

        <!-- Customer Login -->
         <text class="text-white font-bold text-xl" fill="white" font-size="16" font-weight="600">
          <textPath href="#customerPath" startOffset="10%">Customer Login</textPath>
        </text>
      </svg>

      <!-- ===== Inner Circle ===== -->
      <div
        class="absolute top-1/4 left-1/4 w-48 h-48 -translate-x-1/2 -translate-y-1/2 bg-green-300 rounded-full flex items-center justify-center border border-green-600 text-blue-800 font-semibold text-center px-4 shadow-md"
      >
        Technology Management
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

// Reactive data
const activeLoginType = ref(null)
const selectedIndustry = ref(null)
const outerMenuVisible = ref(false)
const menus = ref([
  { title: 'Partner Login', key: 'partner' , color:'#4B83D6' },
  // { title: 'User Login', key: 'user',color:'#9B4BD6' },
  // { title: 'Customer Login', key: 'customer',color:'rgb(16, 185, 129)' }
])

// Industries data from your image
const industries = ref([
  'Aerospace', 'Shipbuilding', 'Automotive', 'Retail',
  'Packaging', 'Medical', 'Machinery', 'Heavy Equipment',
  'Energy', 'Consumer Products', 'Defense', 'Electronics'
])

// Methods
const selectLoginType = (type) => {
  activeLoginType.value = type
  selectedIndustry.value = null
}

const selectIndustry = (industry) => {
  selectedIndustry.value = industry
  // Here you would typically show login form or navigate
}

const getSectorPosition = (index) => {
  const radius = 270
  const center = 250
  }
// compute position of main industry items for each menu
function menuItemStyle(menuIndex, index) {
  // circle radius and center tuned for the 420px container
  const radius = 270
  const center =230 // half of container width/height
  const total = industries.value.length
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2

  const x = center + radius * Math.cos(angle)
  const y = center + radius * Math.sin(angle)

  return {
    left: `${x}px`,
    top: `${y}px`,
    transform: 'translate(-50%, -50%)'
  }
}

// Watch for login type changes to show/hide outer menu
watch(activeLoginType, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      outerMenuVisible.value = true
    }, 100)
  } else {
    outerMenuVisible.value = false
  }
})

</script>

<style scoped>
/* Custom styles for better interactivity */
path:hover {
  filter: brightness(1.2);
}

text:hover {
  filter: brightness(1.3);
  cursor: pointer;
}

/* Smooth transitions */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
