import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useResumeViewStore = defineStore('resumeView', () => {
  // State
  const activeView = ref('view') // 'edit', 'view', 'submit'
  const activeSidebar = ref('create-pdf')
  const openMenu = ref('current')
  
  // Actions
  const setActiveView = (view) => {
    activeView.value = view
  }
  
  const setActiveSidebar = (sidebar) => {
    activeSidebar.value = sidebar
  }
  
  const setOpenMenu = (menu) => {
    openMenu.value = menu
  }
  
  const toggleMenu = (menu) => {
    openMenu.value = openMenu.value === menu ? null : menu
  }
  
  const navigateToEdit = (sidebarKey = 'personal-information') => {
    activeView.value = 'edit'
    activeSidebar.value = sidebarKey
    openMenu.value = 'edit'
  }
  
  const navigateToView = (sidebarKey = 'create-pdf') => {
    activeView.value = 'view'
    activeSidebar.value = sidebarKey
    openMenu.value = 'current'
  }
  
  const navigateToSubmit = () => {
    activeView.value = 'submit'
    openMenu.value = 'submit'
  }
  
  return {
    // State
    activeView,
    activeSidebar,
    openMenu,
    // Actions
    setActiveView,
    setActiveSidebar,
    setOpenMenu,
    toggleMenu,
    navigateToEdit,
    navigateToView,
    navigateToSubmit
  }
})