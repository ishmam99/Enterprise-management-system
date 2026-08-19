import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import { useMainStore } from '@/stores/main.js'
import api from './config/api.js'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './assets/css/main.css'

// Init Pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
// Create Vue app
createApp(App).use(router).use(pinia).mount('#app')
window.api = api
