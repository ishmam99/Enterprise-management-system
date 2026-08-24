<script setup>
import { ref } from 'vue'

const openMenus = ref({
  pages: false,
  navigation: false,
  testimonials: false
})

const toggleMenu = (menu) => {
  openMenus.value[menu] = !openMenus.value[menu]
}
</script>

<template>
  <aside
    class="hidden lg:flex flex-col w-72 bg-gradient-to-b from-slate-800 to-slate-900 border-r border-slate-700"
  >
    <!-- Brand -->
    <div class="p-6 border-b border-slate-700">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-600 flex items-center justify-center shadow-lg shadow-fuchsia-500/30">
          <span class="text-white font-bold text-lg">VC</span>
        </div>
        <div>
          <h2 class="text-xl font-bold text-white">Vermont Composites</h2>
          <p class="text-xs text-slate-400">Website Management</p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="p-4 flex-1 space-y-1 overflow-y-auto">

      <!-- Overview -->
      <RouterLink to="/website_management" v-slot="{ isExactActive }">
        <div
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-xl transition cursor-pointer',
            isExactActive
              ? 'bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow-lg shadow-fuchsia-600/30'
              : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
          ]"
        >
          <span class="text-lg">📊</span>
          Overview
        </div>
      </RouterLink>

      <!-- Pages -->
      <div>
        <div
          @click="toggleMenu('pages')"
          class="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-700/50 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <span class="text-lg">📄</span>
            <span>Pages</span>
          </div>
          <span class="text-xs transition-transform duration-300" :class="openMenus.pages ? 'rotate-90' : ''">▶</span>
        </div>
        <div v-show="openMenus.pages" class="ml-6 space-y-1 mt-1">
          <RouterLink to="/website_management/website/pages" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-fuchsia-600/20 text-fuchsia-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">📋</span> All Pages
              <span class="ml-auto text-xs bg-fuchsia-600/30 text-fuchsia-300 px-2 py-0.5 rounded-full">6</span>
            </div>
          </RouterLink>
          <RouterLink to="/website_management/website/createPage" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-fuchsia-600/20 text-fuchsia-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">➕</span> Add Page
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Navigation -->
      <div>
        <div
          @click="toggleMenu('navigation')"
          class="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-700/50 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <span class="text-lg">🧭</span>
            <span>Navigation</span>
          </div>
          <span class="text-xs transition-transform duration-300" :class="openMenus.navigation ? 'rotate-90' : ''">▶</span>
        </div>
        <div v-show="openMenus.navigation" class="ml-6 space-y-1 mt-1">
          <RouterLink to="/website_management/website/navigation" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-fuchsia-600/20 text-fuchsia-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">📋</span> All Menus
              <span class="ml-auto text-xs bg-fuchsia-600/30 text-fuchsia-300 px-2 py-0.5 rounded-full">4</span>
            </div>
          </RouterLink>
          <RouterLink to="/website_management/website/createNavigation" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-fuchsia-600/20 text-fuchsia-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">➕</span> Add Menu
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Testimonials -->
      <div>
        <div
          @click="toggleMenu('testimonials')"
          class="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-700/50 text-slate-300 hover:text-white transition cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <span class="text-lg">💬</span>
            <span>Testimonials</span>
          </div>
          <span class="text-xs transition-transform duration-300" :class="openMenus.testimonials ? 'rotate-90' : ''">▶</span>
        </div>
        <div v-show="openMenus.testimonials" class="ml-6 space-y-1 mt-1">
          <RouterLink to="/website_management/website/testimonials" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-fuchsia-600/20 text-fuchsia-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">📋</span> All Testimonials
              <span class="ml-auto text-xs bg-fuchsia-600/30 text-fuchsia-300 px-2 py-0.5 rounded-full">8</span>
            </div>
          </RouterLink>
          <RouterLink to="/website_management/website/createTestimonial" v-slot="{ isActive }">
            <div
              :class="[
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition cursor-pointer text-sm',
                isActive
                  ? 'bg-fuchsia-600/20 text-fuchsia-300 font-medium'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              ]"
            >
              <span class="text-base">➕</span> Add Testimonial
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Settings -->
      <RouterLink to="/website_management/website/settings" v-slot="{ isActive }">
        <div
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-xl transition cursor-pointer',
            isActive
              ? 'bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow-lg shadow-fuchsia-600/30'
              : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
          ]"
        >
          <span class="text-lg">⚙️</span>
          Settings
        </div>
      </RouterLink>

    </nav>

    <!-- Logout -->
    <div class="p-4 border-t border-slate-700">
      <button class="w-full bg-gradient-to-r from-red-600/20 to-rose-700/20 text-red-400 py-3 rounded-xl font-medium hover:from-red-600/30 hover:to-rose-700/30 hover:text-red-300 transition flex items-center justify-center gap-2">
        <span class="text-lg">🚪</span> Logout
      </button>
    </div>
  </aside>
</template>

<style scoped>
.transition {
  transition: all 0.2s ease;
}
.rotate-90 {
  transform: rotate(90deg);
}
.bg-fuchsia-600\/20 {
  background-color: rgba(192, 38, 211, 0.2);
}
aside::-webkit-scrollbar {
  width: 4px;
}
aside::-webkit-scrollbar-track {
  background: transparent;
}
aside::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}
aside::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>