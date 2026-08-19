import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    // 🔐 Auth
    isAuthenticated: false,
    token: null,
    hrm_token: null,
    // 👤 User Info
    user: {
      id: '',
      name: '',
      email: '',
      avatar: ''
    },

    // 🎭 Role & Dashboard
    role: null,
    currentDashboard: null,

    // 🧭 UI State
    sidebarOpen: true,
    currentTab: 'crm', // 'crm' | 'user'

    // 🕒 Attendance
    attendance_info_id: null,
    login_id: null,
    attendance_login_time: null,

    // ⏱ Timecard
    team_id: null,
    customerSuccessTeamSidebarIdentifier: null,
    companyName: null,
    companyId: null,
    variableModuleId: null,
  }),

  actions: {
    // ✅ Login
    login(user, token, role, dashboard = 'crm') {
      this.isAuthenticated = true
      this.user = user
      this.token = token
      this.role = role
      this.currentDashboard = dashboard
      this.currentTab = dashboard // sync dashboard & tab
    },

    // ✅ Logout
    logout() {
      this.isAuthenticated = false
      this.token = null
      this.hrm_token = null
      this.role = null
      this.currentDashboard = null
      this.team_id = null
      this.customerSuccessTeamSidebarIdentifier = null
      this.companyName = null
      this.companyId = null
      this.variableModuleId = null

      this.user = {
        id: '',
        name: '',
        email: '',
        avatar: ''
      }

      // Reset UI
      this.sidebarOpen = true
      this.currentTab = 'crm'
    },

    setTeamId(teamId) {
      this.team_id = teamId
    },

    setCompanyName(companyName) {
      this.companyName = companyName
    },

    setVariableModuleId(variableModuleId) {
      this.variableModuleId = variableModuleId
    },

    setCompanyId(companyId) {
      this.companyId = companyId
    },

    setCustomerSuccessTeamSidebarIdentifier(customerSuccessTeamSidebarIdentifier) {
      this.customerSuccessTeamSidebarIdentifier = customerSuccessTeamSidebarIdentifier
    },

    // 👤 Update User Info
    updateUserInfo(userInfo) {
      this.user = { ...this.user, ...userInfo }
    },

    // 📂 Sidebar Toggle
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },

    // 🧭 Switch Dashboard / Tabs
    setCurrentTab(tab) {
      if (['crm', 'user'].includes(tab)) {
        this.currentTab = tab
      }
    }
  },

  getters: {
    getUserName: (state) => state.user.name,
    getUserEmail: (state) => state.user.email,
    getUserAvatar: (state) => state.user.avatar,
    isCRM: (state) => state.currentTab === 'crm',
    isUserManagement: (state) => state.currentTab === 'user'
  },

  // 💾 Persist EVERYTHING (perfect for layouts)
  persist: true
})
