import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

export const useLayout = () => {
  const route = useRoute()
  const sidebarOpen = ref(true)

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  const closeSidebar = () => {
    sidebarOpen.value = false
  }

  const openSidebar = () => {
    sidebarOpen.value = true
  }

  // Auto-close sidebar on mobile
  const isMobile = computed(() => window.innerWidth < 768)

  // Watch for route changes to close sidebar on mobile
  watch(
    () => route.path,
    () => {
      if (isMobile.value) {
        closeSidebar()
      }
    }
  )

  return {
    sidebarOpen,
    toggleSidebar,
    closeSidebar,
    openSidebar
  }
}
