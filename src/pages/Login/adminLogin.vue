<template>
  <!-- <div class="h-[60px] md:h-[80px] bg-gradient-to-r from-blue-950 via-teal-950 to-cyan-950"></div> -->
  
  <!-- Desktop View (unchanged) -->
  <div v-if="!isMobile" class="min-h-[110vh] bg-[url('/src/assets/bggay.jpg')] h-screen flex items-center justify-center p-4">
    <div class="bg-pattern border border-white/20 h-full shadow-2xl rounded-2xl p-3 w-full">
      <div class="relative w-[400px] h-[400px] mx-auto mt-10">
        <div class="absolute h-[550px] w-[550px] left-[-26%] top-[20%] transform bg-opacity-50 shadow-2xl rounded-full flex item-center justify-center flex-col -translate-x-1/2 -translate-y-1/2 text-center" 
             :style="{ backgroundColor: getRandomCenterColor() }">
          <div class="flex justify-center items-center flex-col gap-4">
            <img src="/public/logo.png" alt="Logo" class="w-48 bg-white px-4 py-2 rounded-2xl text-center" />
            <h1 class="text-wrap font-extrabold text-4xl text-primary mb-2 text-white">
              Management System
            </h1>
          </div>
        </div>

        <div
          v-for="(item, index) in menuItems"
          :key="item.to"
          class="absolute card-item group"
          :style="menuItemStyle(index)"
        >
          <div
            class="flex flex-col wow w-[110px] h-[110px] items-center gap-2 p-4 justify-center rounded-full shadow-2xl transition-all duration-500 z-10 relative hover:scale-120 hover:brightness-110"
            :style="{ ...mainItemHoverStyle(index), backgroundColor: getMenuItemColor(index) }"
          >
            <i :class="item.icon" class="text-sm text-white"></i>
            <span class="font-semibold text-white text-center text-xs leading-tight">{{ item.label }}</span>
          </div>

          <div
            v-for="(subItem, subIndex) in item.subMenus"
            :key="subIndex"
            class="absolute w-20 h-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-700 z-20"
            :style="getSunflowerPetalPosition(index, subIndex, item.subMenus.length, item.label)"
          >
            <router-link
              :to="subItem.to"
              class="flex flex-col w-full h-full items-center justify-center p-2 rounded-full shadow-xl transition-all duration-300 hover:scale-125 text-white font-semibold text-center"
              :class="getSubmenuColor(subItem.color)"
            >
              <i :class="subItem.icon" class="text-xs mb-1"></i>
              <span class="leading-tight text-center text-sm">{{ subItem.label }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile View (New Layout) -->
  <div v-else class="min-h-screen bg-[url('/src/assets/bggay.jpg')] bg-cover bg-center p-3">
    <div class="bg-pattern border border-white/20 rounded-2xl p-4 min-h-screen">
      <!-- Header -->
      <div class="text-center mb-6">
        <img src="/public/logo.png" alt="Logo" 
             class="w-32 mx-auto bg-white px-3 py-2 rounded-2xl mb-3" />
        <h1 class="text-wrap font-extrabold text-xl text-white bg-black/30 py-2 px-4 rounded-full backdrop-blur-sm">Management System
        </h1>
      </div>

      <!-- Menu Grid -->
      <div class="space-y-4">
        <div
          v-for="(item, index) in menuItems"
          :key="item.to"
          class="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden"
        >
          <!-- Main Menu Button -->
          <button
            @click="toggleSubMenu(index)"
            class="w-full flex items-center justify-between p-4 text-white"
            :style="{ backgroundColor: getMenuItemColor(index) }"
          >
            <div class="flex items-center gap-3">
              <i :class="item.icon" class="text-xl"></i>
              <span class="font-semibold text-sm">{{ item.label }}</span>
            </div>
            <i :class="openMenus[index] ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'" 
               class="text-white"></i>
          </button>

          <!-- Submenus (Expandable) -->
          <div v-if="item.subMenus && item.subMenus.length" 
               v-show="openMenus[index]"
               class="p-3 bg-black/20 grid grid-cols-2 gap-2"
          >
            <router-link
              v-for="(subItem, subIndex) in item.subMenus"
              :key="subIndex"
              :to="subItem.to"
              class="flex flex-col items-center justify-center p-3 rounded-xl text-white text-center transition-all hover:scale-105"
              :class="getSubmenuColor(subItem.color)"
            >
              <i :class="subItem.icon" class="text-lg mb-1"></i>
              <span class="text-[10px] leading-tight">{{ subItem.label }}</span>
            </router-link>
          </div>
        </div>
      </div>

      <!-- User Login Section (if applicable) -->
      <div v-if="route.name === 'user_login'" class="mt-6">
        <div class="grid grid-cols-2 gap-3">
          <router-link
            v-for="(item, index) in menuItems"
            :key="index"
            :to="item.to"
            class="flex flex-col items-center justify-center p-4 rounded-xl text-white text-center"
            :style="{ backgroundColor: getMenuItemColor(index) }"
          >
            <i :class="item.icon" class="text-2xl mb-2"></i>
            <span class="text-xs font-semibold">{{ item.label }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const visible = ref(false);
const isMobile = ref(false);
const openMenus = ref({});

// Check screen size
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

// Toggle submenu for mobile
const toggleSubMenu = (index) => {
  openMenus.value[index] = !openMenus.value[index];
};

// Initialize and listen for resize
if (typeof window !== 'undefined') {
  checkMobile();
  window.addEventListener('resize', checkMobile);
}

// Center circle colors
const centerColors = [
  '#06b6d7',
  '#f43f5e',
  '#f59e0b',
  '#10b981',
  '#6366f1',
  '#ec4899',
  '#84cc16'
];

// Main menu colors
const menuColors = [
  '#FF6B6B', // Coral Red
  '#4ECDC4', // Medium Turquoise
  '#45B7D1', // Blue
  '#6ECA9F', // Sage Green
  '#EAC83E', // Yellow
  '#CF8181', // Dusty Rose
  '#9B59B6', // Amethyst
  '#3498DB', // Blue
  '#E67E22', // Carrot
  '#2ECC71', // Emerald
  '#F1C40F', // Sunflower
  '#E74C3C', // Alizarin
  '#1ABC9C', // Turquoise
  '#34495E', // Wet Asphalt
];

function getRandomCenterColor() {
  const colors = [...centerColors];
  return colors[Math.floor(Math.random() * colors.length)];
}

function getMenuItemColor(index) {
  return menuColors[index % menuColors.length];
}

const menuUser = ref([
  {
    to: "/Member_Login",
    label: "Youth Login",
    icon: "fa-solid fa-child-reaching",
    subMenus: []
  },
  {
    to: "/Member_Login",
    label: "Volunteer Login",
    icon: "fa-solid fa-hand-holding-heart",
    subMenus: []
  },
  {
    to: "/Member_Login",
    label: "Imam Login",
    icon: "fa-solid fa-mosque",
    subMenus: []
  },
  {
    to: "/Member_Login",
    label: "Member Login",
    icon: "fas fa-user-astronaut",
    subMenus: []
  }
]);

const menuAdmin = ref([

  // {
  //   to: "/Business_development_management",
  //   label: "Business Development Management",
  //   icon: "fas fa-chalkboard-user",
  //   subMenus: [
  //     { to: "/login?name=Business&role=Director&email=Business_director@hitechsoftsys.net", 
  //       label: "Director", icon: "fa-solid fa-crown", color: "gold" },
  //     { to: "/login?name=Business&role=VP&email=Business_vp@hitechsoftsys.net", 
  //       label: "VP", icon: "fa-solid fa-star", color: "purple" },
  //     { to: "/login?name=Business&role=Business-manager&email=Business_manager@hitechsoftsys.net", 
  //       label: "Manager", icon: "fa-solid fa-chart-line", color: "blue" },
  //     { to: "/login?name=Business&role=Executive&email=Business_executive@hitechsoftsys.net", 
  //       label: "Executive", icon: "fa-solid fa-briefcase", color: "green" }
  //   ]
  // },
  {
    to: "/login?name=Sales&role=Director&email=",
    label: "Sales Management",
    icon: "fas fa-chart-simple",
    subMenus: [
      { to: "/login?name=Sales&role=Director&email=sales_director@mail.com", 
        label: "Director", icon: "fa-solid fa-crown", color: "gold" },
      { to: "/login?name=Sales&role=Manager&email=", 
        label: "Manager", icon: "fa-solid fa-chart-line", color: "blue" },
      { to: "/login?name=Sales&role=Executive&email=azmain.iqbal@hitechsoftsys.net", 
        label: "Executive", icon: "fa-solid fa-briefcase", color: "green" },
      { to: "/login?name=Sales&role=Customer_Success_Director&email=", 
        label: "CS Director", icon: "fa-solid fa-medal", color: "orange" },
      { to: "/login?name=Sales&role=Customer_Success_Manager&email=", 
        label: "CS Manager", icon: "fa-solid fa-user-check", color: "teal" },
      { to: "/login?name=Sales&role=Customer_Success_Executive&email=", 
        label: "CS Executive", icon: "fa-solid fa-hand-peace", color: "pink" }
    ]
  },
  {
    to: "/login?name=CRM&role=Director&email=",
    label: "CRM System",
    icon: "fas fa-address-card",
    subMenus: [
      { to: "/login?name=CRM&role=Director&email=crm_director@mail.com", 
        label: "Director", icon: "fa-solid fa-crown", color: "gold" },
      { to: "/login?name=CRM&role=Manager&email=", 
        label: "Manager", icon: "fa-solid fa-chart-line", color: "blue" },
      { to: "/login?name=CRM&role=Executive&email=", 
        label: "Executive", icon: "fa-solid fa-briefcase", color: "green" }
    ]
  },
  {
    to: "/marketing_management",
    label: "Marketing Management",
    icon: "fas fa-people-arrows",
    subMenus: [
      { to: "/login?name=Marketing&role=Director&email=Marketing_director@hitechsoftsys.net", 
        label: "Director", icon: "fa-solid fa-crown", color: "gold" },
      { to: "/login?name=Marketing&role=VP&email=Marketing_vp@hitechsoftsys.net", 
        label: "VP", icon: "fa-solid fa-star", color: "purple" },
      { to: "/login?name=Marketing&role=Manager&email=Marketing_manager@hitechsoftsys.net", 
        label: "Manager", icon: "fa-solid fa-chart-line", color: "blue" },
      { to: "/login?name=Marketing&role=Executive&email=Marketing_executive@hitechsoftsys.net", 
        label: "Executive", icon: "fa-solid fa-briefcase", color: "green" }
    ]
  },
  // {
  //   to: "/project_Management_Login",
  //   label: "Project Management",
  //   icon: "fas fa-globe",
  //   subMenus: [
  //     { to: "/login?name=Project&role=Director&email=Project_director@hitechsoftsys.net", 
  //       label: "Director", icon: "fa-solid fa-crown", color: "gold" },
  //     { to: "/login?name=Project&role=VP&email=Project_vp@hitechsoftsys.net", 
  //       label: "VP", icon: "fa-solid fa-star", color: "purple" },
  //     { to: "/login?name=Project&role=Manager&email=Project_manager@hitechsoftsys.net", 
  //       label: "Manager", icon: "fa-solid fa-chart-line", color: "blue" },
  //     { to:"/login?name=Project&role=Executive&email=Project_executive@hitechsoftsys.net", 
  //       label: "Executive", icon: "fa-solid fa-briefcase", color: "green" }
  //   ]
  // },
]);

const menuItemStyle = computed(() => (index) => {
  const radius = 300;
  const center = 180;
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

const getSunflowerPetalPosition = (mainIndex, subIndex, totalSubMenus, label) => {
  const mainRadius = label == "Sales Management System" ? 150 : 110;
  const center = 20;
  const totalMainItems = menuItems.value.length;

  const mainAngle = (mainIndex / totalMainItems) * 2 * Math.PI - Math.PI / 2;
  const outerRingRadius = mainRadius + (mainRadius / 3);
  const petalSpread = Math.PI / (label == "Sales Management System" ? 1 : 1.3);
  const subAngle = mainAngle - (petalSpread / 2) + (subIndex * petalSpread / (totalSubMenus - 1));

  const x = center + outerRingRadius * Math.cos(subAngle);
  const y = center + outerRingRadius * Math.sin(subAngle);

  const delay = subIndex * 150 + 200;

  return {
    left: `${x}px`,
    top: `${y}px`,
    transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms, opacity 0.5s ease ${delay}ms`,
    transform: 'scale(0.8)'
  };
};

const menuItems = ref([]);

const getSubmenuColor = (color) => {
  const colorMap = {
    gold: 'bg-amber-500/90 hover:bg-amber-600',
    purple: 'bg-purple-500/90 hover:bg-purple-600',
    blue: 'bg-blue-500/90 hover:bg-blue-600',
    green: 'bg-green-500/90 hover:bg-green-600',
    orange: 'bg-orange-500/90 hover:bg-orange-600',
    teal: 'bg-teal-500/90 hover:bg-teal-600',
    pink: 'bg-pink-500/90 hover:bg-pink-600',
    red: 'bg-red-500/90 hover:bg-red-600'
  };
  return colorMap[color] || 'bg-gray-500/90 hover:bg-gray-600';
};

watch(
  () => route.name,
  (newName) => {
    if(newName == "user_login") {
      menuItems.value = menuUser.value;
    } else {
      menuItems.value = menuAdmin.value;
    }
    setTimeout(() => {
      visible.value = true;
    }, 100);
  },
  { immediate: true }
);

onMounted(() => {
  if(route.name == "user_login") {
    menuItems.value = menuUser.value;
  } else {
    menuItems.value = menuAdmin.value;
  }
  setTimeout(() => {
    visible.value = true;
  }, 100);
});
</script>

<style scoped>
.bg-pattern {
  background: url('https://www.transparenttextures.com/patterns/cubes.png'), 
              linear-gradient(135deg, #ccc4c44f 0%, #e6eaff49 100%);
}

/* Desktop styles */
.card-item:hover {
  z-index: 50;
}

.router-link-active {
  outline: none;
}

.wow:hover {
  transform: scale(1.1) !important;
  filter: brightness(1.1);
}

.card-item:focus-within {
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

/* Mobile styles */
@media (max-width: 768px) {
  .group:hover .absolute:not(.card-item) {
    transform: scale(0.8) !important;
  }
}
</style>