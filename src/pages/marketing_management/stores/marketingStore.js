import { defineStore } from 'pinia'
export const useMarketingStore = defineStore('marketingStore', {
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
