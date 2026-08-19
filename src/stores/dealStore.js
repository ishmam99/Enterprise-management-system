import { defineStore } from 'pinia'

export const useDealStore = defineStore('dealStore', {
  state: () => ({
  deal_id: '',
  account_id: '',
  deal_name: '',
  software_name: '',
  industry: '',
  service_type: '',
  software_area: ''

  }),
    persist: true
})
