
<template>
<!-- bg-gradient-to-r from-blue-100 via-white to-red-200 -->


     <!-- <div class="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-6"></div> -->
  <div class="min-h-[110vh]  bg-[url('/src/assets/bggay.jpg')] h-screen flex items-center justify-center  p-6">
    <div class="w-full ">

      <div class="flex gap-3 w-full justify-center items-center">
        <div
          v-for="(menu, menuIndex) in menus"
          :key="menu.key"
          class="relative w-[440px] h-[440px]  border border-white/20 rounded-full  shadow-2xl flex items-center justify-center"

        >

<svg width="440" height="440" viewBox="0 0 440 440">
  <!-- ===== Circle Segments (Each 120°) ===== -->
  <!-- User Login -->
  <path

    d="M220,220 L220,20 A200,200 0 0,1 387.85,326.6 Z"

    :fill="activeLoginType === 'user' ? '#FF66A5' : '#A054FF'"
    stroke="#ffffff40"
    stroke-width="1"
    @click="selectLoginType('user')"
  />
  <path
    d="M220,220 L387.85,326.6 A200,200 0 0,1 52.15,326.6 Z"

    :fill="activeLoginType === 'partner' ? '#FF66A5' : '#A054FF'"
    stroke="#ffffff40"
    stroke-width="1"
    @click="selectLoginType('partner')"
  />
  <path
    d="M220,220 L52.15,326.6 A200,200 0 0,1 220,20 Z"

    :fill="activeLoginType === 'customer' ? '#FF66A5' : '#A054FF'"
    stroke="#ffffff40"
    stroke-width="1"
    @click="selectLoginType('customer')"
  />

  <!-- Outer Circle Outline -->
  <circle
    cx="220"
    cy="220"
    r="200"
    fill="none"
    stroke="#3B82F6"
    stroke-width="2"
  />

  <!-- ===== Curved Texts (inside each arc) ===== -->
  <defs>
    <path  id="userPath" d="M210,60 A160,160 0 0,1 360,250"   />
    <path id="partnerPath" d="M80,230 A160,160 0 0,0 390,270"  />
    <path id="customerPath" d="M80,250 A160,160 0 0,1 210,60"  />
  </defs>

  <text  fill="white" font-size="18" font-weight="600" @click="selectLoginType('user')">
    <textPath href="#userPath" startOffset="45%">User Login</textPath>
  </text>
  <text fill="white" font-size="18"  font-weight="600" @click="selectLoginType('partner')" >
    <textPath href="#partnerPath"  startOffset="40%">Partner Login</textPath>
  </text>
  <text fill="white" font-size="18" font-weight="600" @click="selectLoginType('customer')" >
    <textPath href="#customerPath" startOffset="15%">Customer Login</textPath>
  </text>
</svg>


       <div class="absolute left-1/5 top-1/5 -translate-x-1/2  -translate-y-1/2 z-20 text-center" @click="selectLoginType('')" >
            <div class="w-64 h-64 rounded-full  flex items-center justify-center shadow-lg bg-teal-50"  >
              <div class="text-center">
                    <img src="/public/Hi-tech_softsys_Logo_Black.png" alt="Logo" class="w-32 mb-5 m-auto" />
                <h2 class="text-xl px-5 font-bold text-teal-700">Technology Management System</h2>
                <!-- <h1 class="text-2xl font-bold text-white">{{ menu.title }}</h1> -->

              </div>
            </div>
          </div>
         <div v-show="activeLoginType && showIndustries">
          <!-- <div
            v-for="(industry, index) in industries"
            :key="industry + '-' + index"
            class="absolute card-item group"
            :style="activeLoginType ? menuItemStyle(menuIndex, index) : ''"
          >
            <button
              type="button"
              class="flex flex-col w-[82px] h-[82px] items-center gap-2 p-3 justify-center rounded-full shadow-2xl transition-all duration-500 z-10 relative focus:outline-none"
              :style="{ backgroundColor: getRandomColor(index) }"
            >
              <div class="text-white text-sm font-semibold text-center">{{ industry }}</div>
            </button>

          </div> -->
        <transition-group
          name="fade-up"
          tag="div"
        >
          <div
            v-for="(industry, index) in industries"
            :key="industry + '-' + index"
            class="absolute card-item group"
            :style="menuItemStyle(menuIndex, index)"
          >
            <router-link
            :to="'/login?role='+activeLoginType+'&email='+activeLoginType+'1@mail.com&password=password123'"
              type="button"
              class="flex flex-col w-[82px] h-[82px] items-center gap-2 p-3 justify-center rounded-full shadow-2xl transition-all duration-500 z-10 relative focus:outline-none"
              :style="{ backgroundColor: getRandomColor(index) }"
            >
              <div class="text-white text-sm font-semibold text-center">{{ industry }}</div>
            </router-link>
          </div>
        </transition-group>

          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <template> -->

</template>

<script setup>
import { ref, onMounted } from 'vue'

const menus = ref([
  { title: 'Partner Login', key: 'partner' , color:'#4B83D6' },
  // { title: 'User Login', key: 'user',color:'#9B4BD6' },
  // { title: 'Customer Login', key: 'customer',color:'rgb(16, 185, 129)' }
])

const industries = ref([
  'Aerospace', 'Automotive', 'Consumer Products', 'Defense',
  'Electronics', 'Energy', 'Heavy Equipment', 'Machinery',
  'Medical', 'Packaging', 'Retail', 'Shipbuilding'
])

const showIndustries = ref(false)
const randomColors = [
  '#06b6d4', // cyan-500
  '#f43f5e', // rose-500
  '#f59e0b', // amber-500
  '#10b981', // emerald-500
  '#6366f1', // indigo-500
  '#ec4899', // pink-500
  '#84cc16'  // lime-500
]
const activeLoginType = ref(null)
const selectedIndustry = ref(null)
function getRandomColor(index) {
  // deterministic-ish color for a given index so same industry keeps same color across menus
  return randomColors[index % randomColors.length]
}
const selectLoginType = (type) => {
activeLoginType.value = null
  showIndustries.value = false

  // small delay for deselect animation (optional)
  setTimeout(() => {
    activeLoginType.value = type
    // wait a bit before showing industries
    setTimeout(() => {
      showIndustries.value = true
    }, 200)
  }, 200)
}
// used to trigger entrance animation per menu
const visible = ref(false)

onMounted(() => {
  setTimeout(() => (visible.value = true), 120)
})

// compute position of main industry items for each menu
function menuItemStyle(menuIndex, index) {
  // circle radius and center tuned for the 420px container
  const radius = 270
  const center =230 // half of container width/height
  const total = industries.value.length
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2


  const x = center + radius * Math.cos(angle)
  const y = center + radius * Math.sin(angle)

  const delay = index * 40 + menuIndex * 80

  return {
    left: `${x - 50}px`,
    top: `${y - 50}px`,
    opacity: visible.value ? 1 : 0,
    transform: visible.value ? 'scale(1)' : 'scale(0.6) translateY(20px)',
    transition: `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms`
  }
}

</script>

<style scoped>
.card-item:hover { z-index: 60; }
.group:hover .absolute:not(.card-item) { opacity: 1 !important; visibility: visible !important; }
.absolute:not(.card-item) { transform: scale(0.9); }

.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.6s ease;
}
.fade-up-enter-from {
  opacity: 0;
  transform: scale(0.6) translateY(30px);
}
.fade-up-enter-to {
  opacity: 1;
  transform: scale(1) translateY(0);
}
.fade-up-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}
.fade-up-leave-to {
  opacity: 0;
  transform: scale(0.6) translateY(30px);
}

</style>
