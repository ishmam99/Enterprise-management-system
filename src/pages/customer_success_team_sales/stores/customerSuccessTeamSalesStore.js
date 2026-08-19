import { defineStore } from 'pinia'
export const useCustomerSuccessTeamSalesStore = defineStore('customerSuccessTeamSalesStore', {
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
