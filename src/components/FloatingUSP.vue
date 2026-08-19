<template>
  <Transition
    enter-active-class="transition-all duration-500"
    enter-from-class="opacity-0 -translate-x-full"
    enter-to-class="opacity-100 translate-x-0"
    leave-active-class="transition-all duration-300"
    leave-from-class="opacity-100 translate-x-0"
    leave-to-class="opacity-0 -translate-x-full"
  >
    <div 
      v-if="isVisible"
      class="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
    >
      <!-- USP Cards -->
      <div class="flex flex-col gap-3">
        <!-- Certified Reseller -->
        <div 
          class="group relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-r-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:pr-4 overflow-hidden"
          @mouseenter="expandCard(0)"
          @mouseleave="collapseCard(0)"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative flex items-center gap-3 p-4 pr-6">
            <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
              </svg>
            </div>
            <div class="transition-all duration-300" :class="expandedCard === 0 ? 'opacity-100 max-w-xs' : 'opacity-0 max-w-0 overflow-hidden'">
              <p class="font-bold text-sm whitespace-nowrap">Certified Reseller</p>
              <p class="text-xs text-blue-100 whitespace-nowrap">Official MSC Software Partner</p>
            </div>
          </div>
        </div>

        <!-- 24/7 Services -->
        <div 
          class="group relative bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-r-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:pr-4 overflow-hidden"
          @mouseenter="expandCard(1)"
          @mouseleave="collapseCard(1)"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative flex items-center gap-3 p-4 pr-6">
            <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
            <div class="transition-all duration-300" :class="expandedCard === 1 ? 'opacity-100 max-w-xs' : 'opacity-0 max-w-0 overflow-hidden'">
              <p class="font-bold text-sm whitespace-nowrap">24/7 Technical Support</p>
              <p class="text-xs text-green-100 whitespace-nowrap">Round-the-Clock Assistance</p>
            </div>
          </div>
        </div>

        <!-- Training Programs -->
        <div 
          class="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-r-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:pr-4 overflow-hidden"
          @mouseenter="expandCard(2)"
          @mouseleave="collapseCard(2)"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative flex items-center gap-3 p-4 pr-6">
            <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <div class="transition-all duration-300" :class="expandedCard === 2 ? 'opacity-100 max-w-xs' : 'opacity-0 max-w-0 overflow-hidden'">
              <p class="font-bold text-sm whitespace-nowrap">FREE Training Programs</p>
              <p class="text-xs text-purple-100 whitespace-nowrap">Expert-Led Sessions</p>
            </div>
          </div>
        </div>

        <!-- Engineering Services -->
        <div 
          class="group relative bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-r-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:pr-4 overflow-hidden"
          @mouseenter="expandCard(3)"
          @mouseleave="collapseCard(3)"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative flex items-center gap-3 p-4 pr-6">
            <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div class="transition-all duration-300" :class="expandedCard === 3 ? 'opacity-100 max-w-xs' : 'opacity-0 max-w-0 overflow-hidden'">
              <p class="font-bold text-sm whitespace-nowrap">Engineering Services</p>
              <p class="text-xs text-orange-100 whitespace-nowrap">FEA, CFD & Design Analysis</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Floating Badge - Always Visible -->
      <div class="absolute -right-2 top-0 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
        FREE
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)
const expandedCard = ref(null)

const expandCard = (index) => {
  expandedCard.value = index
}

const collapseCard = (index) => {
  if (expandedCard.value === index) {
    expandedCard.value = null
  }
}

const handleScroll = () => {
  // Show after scrolling past hero section (approximately 600px)
  isVisible.value = window.scrollY > 200
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Smooth animations */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Glow effect on hover */
.group:hover {
  filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.5));
}
</style>

