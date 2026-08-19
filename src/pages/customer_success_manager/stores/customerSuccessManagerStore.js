import { defineStore } from 'pinia'
export const useCustomerSuccessManagerStore = defineStore('customerSuccessManagerStore', {
  state: () => ({
    currentMenu: 'All',
    currentSubMenu: '',
    showSidebar:true
  }),
  actions: {
    setDashboard(menu) {
      this.currentMenu = menu;
    },
    

    setCurrentSubMenu(menu) {
      this.currentSubMenu = menu;
    },
  },
  persist: true
});
