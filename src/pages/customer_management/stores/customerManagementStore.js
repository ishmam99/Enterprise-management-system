import { defineStore } from 'pinia'
export const useCustomerManagementStore = defineStore('customerManagementStore', {
  state: () => ({
    currentMenu: 'All',
    currentSubMenu: ''
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
