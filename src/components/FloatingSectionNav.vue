<template>
  <Transition
    enter-active-class="transition-all duration-500"
    enter-from-class="opacity-0 translate-x-full"
    enter-to-class="opacity-100 translate-x-0"
    leave-active-class="transition-all duration-300"
    leave-from-class="opacity-100 translate-x-0"
    leave-to-class="opacity-0 translate-x-full"
  >
    <div 
      v-if="isVisible"
      class="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
    >
      <div class="flex flex-col gap-0.5">
        <div
          v-for="(section, index) in sections"
          :key="index"
          class="group relative"
        >
          <!-- Section Dot/Indicator -->
          <button
            @click="scrollToSection(section.id)"
            class="relative flex items-center transition-all duration-300"
            :class="activeSection === section.id ? 'pr-8' : 'pr-4'"
          >
            <!-- Active Indicator Bar -->
            <div
              class="absolute right-0 h-full w-1 rounded-l-full transition-all duration-300"
              :class="[
                activeSection === section.id 
                  ? `${section.color} opacity-100 w-2` 
                  : 'bg-gray-300 opacity-0 group-hover:opacity-50'
              ]"
            ></div>

            <!-- Dot -->
            <div
              class="w-3 h-3 rounded-full border-2 transition-all duration-300 mr-3"
              :class="[
                activeSection === section.id 
                  ? `${section.dotColor} border-transparent scale-150` 
                  : 'bg-white border-gray-400 group-hover:scale-125 group-hover:border-blue-500'
              ]"
            ></div>

            <!-- Label (appears on hover or when active) -->
            <Transition
              enter-active-class="transition-all duration-200"
              enter-from-class="opacity-0 -translate-x-2"
              enter-to-class="opacity-100 translate-x-0"
              leave-active-class="transition-all duration-150"
              leave-from-class="opacity-100 translate-x-0"
              leave-to-class="opacity-0 -translate-x-2"
            >
              <div
                v-if="activeSection === section.id || hoveredSection === index"
                @mouseenter="hoveredSection = index"
                @mouseleave="hoveredSection = null"
                class="absolute right-full mr-4 bg-white rounded-lg shadow-xl px-4 py-2 whitespace-nowrap border"
                :class="[
                  activeSection === section.id 
                    ? `${section.borderColor} border-2` 
                    : 'border-gray-200'
                ]"
              >
                <p 
                  class="font-bold text-sm"
                  :class="[
                    activeSection === section.id 
                      ? section.textColor 
                      : 'text-gray-700'
                  ]"
                >
                  {{ section.name }}
                </p>
                <p class="text-xs text-gray-500">{{ section.subtitle }}</p>
              </div>
            </Transition>
          </button>
        </div>
      </div>

      <!-- Section Counter -->
      <div class="absolute -right-2 -top-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
        {{ currentSectionNumber }}/{{ sections.length }}
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const isVisible = ref(false)
const activeSection = ref('hero')
const hoveredSection = ref(null)

const sections = ref([
  { 
    id: 'hero', 
    name: 'Hero', 
    subtitle: 'MSC Software Partner',
    color: 'bg-gradient-to-r from-blue-600 to-cyan-600',
    dotColor: 'bg-blue-600',
    borderColor: 'border-blue-600',
    textColor: 'text-blue-600'
  },
  { 
    id: 'usp', 
    name: 'Our USP', 
    subtitle: 'FREE Support & Training',
    color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    dotColor: 'bg-yellow-500',
    borderColor: 'border-yellow-500',
    textColor: 'text-yellow-600'
  },
  { 
    id: 'services', 
    name: 'Services', 
    subtitle: 'Complete Solutions',
    color: 'bg-gradient-to-r from-purple-600 to-pink-600',
    dotColor: 'bg-purple-600',
    borderColor: 'border-purple-600',
    textColor: 'text-purple-600'
  },
  { 
    id: 'msc-software', 
    name: 'MSC Software', 
    subtitle: 'Product Catalog',
    color: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    dotColor: 'bg-blue-500',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-600'
  },
  { 
    id: 'engineering-services', 
    name: 'Engineering', 
    subtitle: 'Design & Analysis',
    color: 'bg-gradient-to-r from-gray-700 to-gray-900',
    dotColor: 'bg-gray-700',
    borderColor: 'border-gray-700',
    textColor: 'text-gray-700'
  },
  { 
    id: 'training', 
    name: 'Training', 
    subtitle: 'Learn MSC Software',
    color: 'bg-gradient-to-r from-purple-600 to-pink-600',
    dotColor: 'bg-purple-600',
    borderColor: 'border-purple-600',
    textColor: 'text-purple-600'
  },
  { 
    id: 'industry', 
    name: 'Industries', 
    subtitle: 'Real Applications',
    color: 'bg-gradient-to-r from-teal-600 to-cyan-600',
    dotColor: 'bg-teal-600',
    borderColor: 'border-teal-600',
    textColor: 'text-teal-600'
  },
  { 
    id: 'global-enterprise', 
    name: 'Global Network', 
    subtitle: 'HTB Companies',
    color: 'bg-gradient-to-r from-indigo-600 to-purple-600',
    dotColor: 'bg-indigo-600',
    borderColor: 'border-indigo-600',
    textColor: 'text-indigo-600'
  },
  { 
    id: 'partners', 
    name: 'Partners', 
    subtitle: 'Trusted Clients',
    color: 'bg-gradient-to-r from-green-600 to-emerald-600',
    dotColor: 'bg-green-600',
    borderColor: 'border-green-600',
    textColor: 'text-green-600'
  },
  { 
    id: 'contact', 
    name: 'Contact', 
    subtitle: 'Get In Touch',
    color: 'bg-gradient-to-r from-orange-600 to-red-600',
    dotColor: 'bg-orange-600',
    borderColor: 'border-orange-600',
    textColor: 'text-orange-600'
  }
])

const currentSectionNumber = computed(() => {
  const index = sections.value.findIndex(s => s.id === activeSection.value)
  return index >= 0 ? index + 1 : 1
})

const handleScroll = () => {
  // Show navigation after scrolling past initial view
  isVisible.value = window.scrollY > 300

  // Detect which section is in view
  const scrollPosition = window.scrollY + window.innerHeight / 3

  // Check each section
  for (let i = sections.value.length - 1; i >= 0; i--) {
    const section = sections.value[i]
    const element = document.getElementById(section.id)
    
    if (element) {
      const offsetTop = element.offsetTop
      if (scrollPosition >= offsetTop) {
        activeSection.value = section.id
        break
      }
    }
  }
}

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const navbarHeight = 80 // Height of fixed navbar
    const offsetTop = element.offsetTop - navbarHeight
    
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    })
  }
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
/* Smooth transitions */
button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Glow effect on active */
.group:hover .w-3 {
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
}
</style>

