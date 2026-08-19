import { defineStore } from 'pinia'
export const usePMStore = defineStore('pmStore', {
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
