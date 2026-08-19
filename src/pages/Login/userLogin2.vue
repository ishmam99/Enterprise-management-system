<!-- <template>
    <div class="min-h-[110vh] bg-[url('/src/assets/bggay.jpg')] h-screen flex items-center justify-center p-4">
      <div class="bg-white/30 border border-white/20 h-full shadow-2xl rounded-2xl p-8 w-full">
        <div class="relative w-[400px] h-[400px] mx-auto">
          <div class="absolute w-[480px] mb-56 bottom-[-245px] left-[-2%] transform bg-white bg-opacity-50 shadow-2xl rounded-full px-2 py-24 flex item-center justify-center flex-col pb-14 -translate-x-1/2 -translate-y-1/2 text-center">
            <img src="/public/Hi-tech_softsys_Logo_Black.png" alt="Logo" class="w-56 m-auto" />
            <h1 class="text-2xl text-wrap font-extrabold text-primary mb-2"> <br>
            Technology Management System
            </h1>



          </div>

          <div
            v-for="(item, index) in menuItems"
            :key="item.to"
            class="absolute card-item group "
            :style="menuItemStyle(index)"
          >
            <router-link
              :to="item.to"
              class="flex flex-col wow w-[130px] h-[130px] items-center gap-2 p-4 justify-center bg-cyan-500  rounded-full shadow-2xl transition-all duration-500 z-10 relative hover:scale-120 hover:bg-green-500"
              :style="{...mainItemHoverStyle(index), backgroundColor: getRandomColor(index)}"
            >
              <i :class="item.icon" class="text-2xl text-white"></i>
              <span class="font-semibold text-white text-center text-sm leading-tight">{{ item.label }}</span>
            </router-link>

            <div
              v-for="(subItem, subIndex) in item.subMenus"
              :key="subIndex"
              class="absolute w-16 h-16 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-700 z-20"
              :style="getSunflowerPetalPosition(index, subIndex, item.subMenus.length)"
            >
              <router-link
                :to="item.to"
                class="flex flex-col w-full h-full items-center justify-center p-2 rounded-full shadow-xl transition-all duration-300 hover:scale-125 text-white text-xs font-medium text-center "
                :class="getMoonColor(subItem.color)"
              >
                <i :class="subItem.icon" class="text-xs mb-1"></i>
                <span class="leading-tight text-center">{{ subItem.label }}</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { onMounted, ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const randomColors = [
  '#06b6d4', // cyan-500
  '#f43f5e', // rose-500
  '#f59e0b', // amber-500
  '#10b981', // emerald-500
  '#6366f1', // indigo-500
  '#ec4899', // pink-500
  '#84cc16'  // lime-500
]

// If you want it to truly shuffle per render
function getRandomColor() {
  const colors = [...randomColors]
  return colors[Math.floor(Math.random() * colors.length)]
}
const menuItems = ref([
   {
    to: "/Member_Login",
    label: "Member Login",
    icon: "fas fa-user-circle",

  },
  {
    to: "/Member_Login",
    label: "Youth Login",
    icon: "fa-solid fa-children",

  },
  {
    to: "/Member_Login",
    label: "Volunteer Login",
    icon: "fa-solid fa-handshake",

  },
  {
    to: "/Member_Login",
    label: "Imam Login",
    icon: "fa-solid fa-user-tie",

  },

  {
    to: "/Member_Login",
    label:"Vendor Login",
    icon: "fa-regular fa-address-card",

  },
  {
    to: "/Employee_Login",
    label:"Employee Login",
    icon: "fa-regular fa-address-card",

  },
])


const visible = ref(false);

const menuItemStyle = computed(() => (index) => {
  const radius = 260;
  const center = 230;
  const total = menuItems.value.length;
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  const x = center + radius * Math.cos(angle);
  const y = center + radius * Math.sin(angle);

  const delay = index * 100;

  return {
    left: `${x - 65}px`,
    top: `${y + 120}px`,
    opacity: visible.value ? 1 : 0,
    transform: visible.value ? "scale(1)" : "scale(0.5) translateY(50px)",
    transition: `opacity 0.4s ease ${delay}ms, transform 0.4s ease ${delay}ms`
  };
});

const mainItemHoverStyle = computed(() => (index) => {
  const radius = 290;
  const center = 230;
  const total = menuItems.value.length;
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;

  const moveDistance = 10;
  const moveX = moveDistance * Math.cos(angle);
  const moveY = moveDistance * Math.sin(angle);

  return {
    transform: `translate(${moveX}px, ${moveY}px) scale(1.1)`,
    transition: 'all 0.5s ease'
  };
});

const getSunflowerPetalPosition = (mainIndex, subIndex, totalSubMenus) => {
  const mainRadius = 110;
  const center = 30;
  const totalMainItems = menuItems.value.length;

  const mainAngle = (mainIndex / totalMainItems) * 2 * Math.PI - Math.PI / 2;

  const outerRingRadius = mainRadius + (mainRadius / 3);

  const petalSpread = Math.PI / 2;
  const subAngle = mainAngle - (petalSpread / 2) + (subIndex * petalSpread / (totalSubMenus - 1));

  const x = center + outerRingRadius * Math.cos(subAngle) ;
  const y = center + outerRingRadius * Math.sin(subAngle) ;

  const delay = subIndex * 150 + 200;

  return {
    left: `${x}px`,
    top: `${y}px`,
    transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms, opacity 0.5s ease ${delay}ms`,
    transform: 'scale(0.8)'
  };
};
const getMoonColor = (color) => {
  const colorMap = {
    blue: 'bg-blue-500/90 hover:bg-blue-600 shadow-blue-500/50',
    green: 'bg-green-500/90 hover:bg-green-600 shadow-green-500/50',
    purple: 'bg-purple-500/90 hover:bg-purple-600 shadow-purple-500/50',
    orange: 'bg-orange-500/90 hover:bg-orange-600 shadow-orange-500/50',
    red: 'bg-red-500/90 hover:bg-red-600 shadow-red-500/50',
    teal: 'bg-teal-500/90 hover:bg-teal-600 shadow-teal-500/50'
  };
  return colorMap[color] || 'bg-gray-500/90 hover:bg-gray-600 shadow-gray-500/50';
};
onMounted(() => {

  setTimeout(() => {
    visible.value = true;
  }, 100);
});
</script>

<style scoped>


.card-item:hover {
  z-index: 50;

}
.router-link-active {
  outline: none;
}
.wow:hover{
  background-color: rgb(69, 69, 255);
  transform: scale(1.1) !important;
}
.card-item:focus-within {
  /* outline: 2px solid white; */
  outline-offset: 2px;
}

.group:hover .absolute:not(.card-item) {
  opacity: 1 !important;
  visibility: visible !important;
  transform: scale(0.9) !important;
}

.absolute:not(.card-item) {
  transform: scale(0.8);
}
.router-link {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
}

.router-link:hover {
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.4);

}
</style> -->
<template>
<!-- bg-gradient-to-r from-blue-100 via-white to-red-200 -->
   <div class="h-[80px] bg-gradient-to-r from-green-950 via-teal-950 to-cyan-950">

     </div>
  <div class="min-h-[110vh]  bg-[url('/src/assets/bggay.jpg')] h-screen flex items-center justify-center  p-6">
    <div class="w-full ">
      <div class="flex gap-3 w-full justify-between items-start">
        <div
          v-for="(menu, menuIndex) in menus"
          :key="menu.key"
          class="relative w-[440px] h-[440px]  border border-white/20 rounded-full p-6 shadow-2xl flex items-center justify-center"

        >
          <!-- center area -->
          <div class="absolute left-2/5 top-2/5 -translate-x-1/2  -translate-y-1/2 z-20 text-center">
            <div class="w-[260px] h-[260px] rounded-full  flex items-center justify-center shadow-lg"  :style="{backgroundColor:menu.color}">
              <div class="text-center">
                    <img src="/public/Hi-tech_softsys_Logo_Black.png" alt="Logo" class="w-32 mb-5 m-auto" />
                <h2 class="text-xl font-bold text-white">Technology Management System</h2>
                <h1 class="text-2xl font-bold text-white">{{ menu.title }}</h1>
                <!-- <p class="text-xs text-gray-600 mt-1">Select Industry</p> -->
              </div>
            </div>
          </div>

          <!-- radial items -->
          <div
            v-for="(industry, index) in industries"
            :key="industry + '-' + index"
            class="absolute card-item group"
            :style="menuItemStyle(menuIndex, index)"
          >
            <button
              type="button"
              class="flex flex-col w-[82px] h-[82px] items-center gap-2 p-3 justify-center rounded-full shadow-2xl transition-all duration-500 z-10 relative focus:outline-none"
              :style="{ backgroundColor: getRandomColor(index) }"
            >
              <div class="text-white text-sm font-semibold text-center">{{ industry }}</div>
            </button>

            <!-- sub items (3 softwares) -->
            <div
              v-for="(soft, sIndex) in softwareOptions"
              :key="sIndex"
              class="absolute w-16 h-16 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 z-30"
              :style="getSunflowerPetalPosition(menuIndex, index, sIndex, softwareOptions.length)"
            >
              <router-link
               :to="'/login?email='+menu.key+'1@mail.com&password=12345678'"
                class="flex w-full h-full items-center gap-1 justify-center p-2 rounded-full shadow-xl text-white text-xs font-medium text-center"
                :class="getMoonColorClass(sIndex)"
                role="button"
                aria-hidden="true"
              >
                <i :class="soft.icon + ' text-[10px] block'" aria-hidden="true"></i>
                <span class="leading-tight text-wrap text-xs">{{ soft.name }}</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const menus = ref([
  { title: 'Partner Login', key: 'partner' , color:'#4B83D6' },
  { title: 'User Login', key: 'user',color:'#9B4BD6' },
  { title: 'Customer Login', key: 'customer',color:'rgb(16, 185, 129)' }
])

const industries = ref([
  'Aerospace', 'Automotive', 'Consumer Products', 'Defense',
  'Electronics', 'Energy', 'Heavy Equipment', 'Machinery',
  'Medical', 'Packaging', 'Retail', 'Shipbuilding'
])

const softwareOptions = ref([
  { name: 'Nastron', icon: 'fas fa-cube'  },
  { name: 'Patran', icon: 'fas fa-industry' },
  { name: 'Hexa Soft', icon: 'fas fa-cogs' }
])

const randomColors = [
  '#06b6d4', // cyan-500
  '#f43f5e', // rose-500
  '#f59e0b', // amber-500
  '#10b981', // emerald-500
  '#6366f1', // indigo-500
  '#ec4899', // pink-500
  '#84cc16'  // lime-500
]

function getRandomColor(index) {
  // deterministic-ish color for a given index so same industry keeps same color across menus
  return randomColors[index % randomColors.length]
}

// used to trigger entrance animation per menu
const visible = ref(false)

onMounted(() => {
  setTimeout(() => (visible.value = true), 120)
})

// compute position of main industry items for each menu
function menuItemStyle(menuIndex, index) {
  // circle radius and center tuned for the 420px container
  const radius = 170
  const center =230 // half of container width/height
  const total = industries.value.length
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2

  // offset the menus slightly horizontally so items don't overlap visually when side-by-side
  const menuOffsetX = (menuIndex - 1) * 460 // -460, 0, +460

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

// sub-item positions around each industry button
function getSunflowerPetalPosition(menuIndex, industryIndex, subIndex, totalSub) {
  // small radius relative to main item
  const petalRadius = 100
  const center = 40 // because the parent absolute is sized around 110 -> half ~55
  const totalIndustries = industries.value.length

  const mainAngle = (industryIndex / totalIndustries) * 2 * Math.PI - Math.PI / 2

  // spread the 3 items within a small arc (approx 90 degrees)
  const petalSpread = Math.PI / 2
  const subAngle = mainAngle - petalSpread / 2 + (subIndex * petalSpread / (totalSub - 1))

  const x = center + petalRadius * Math.cos(subAngle)
  const y = center + petalRadius * Math.sin(subAngle)

  const delay = subIndex * 80 + industryIndex * 10

  return {
    left: `${x - 16}px`,
    top: `${y - 16}px`,
    transition: `all 0.45s cubic-bezier(0.2, 1, 0.22, 1) ${delay}ms, opacity 0.25s ease ${delay}ms`,
    transform: 'scale(1)'
  }
}

function getMoonColorClass(index) {
  // give each software a distinct color scheme
  const map = [
    'bg-indigo-500/90 hover:bg-indigo-600 shadow-indigo-500/50',
    'bg-emerald-500/90 hover:bg-emerald-600 shadow-emerald-500/50',
    'bg-orange-500/90 hover:bg-orange-600 shadow-orange-500/50'
  ]
  return map[index] || 'bg-gray-500/90 hover:bg-gray-600 shadow-gray-500/50'
}
</script>

<style scoped>
.card-item:hover { z-index: 60; }
.group:hover .absolute:not(.card-item) { opacity: 1 !important; visibility: visible !important; }
.absolute:not(.card-item) { transform: scale(0.9); }
</style>
