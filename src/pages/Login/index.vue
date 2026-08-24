<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'
import api from '@/config/api'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

// Form state
const formData = ref({
  email: '',
  password: ''
})

// UI state
const showPassword = ref(false)
const loading = ref(false)
const error = ref(null)
const validationErrors = ref({})

// Role to dashboard mapping (for normal authentication flow)
const ROLE_DASHBOARD_MAP = {
  // Sales roles
  'sales-manager': 'sales_management',
  'sales-director': 'sales_management',
  'sales-executive': 'sales_management',
  'manager-sales': 'sales_management',
  'director-sales': 'sales_management',
  'vp-sales': 'sales_management',

  // Training roles
  'training-manager': 'training_management',
  'training-director': 'training_management',
  'training-executive': 'training_management',

  // CRM roles
  'crm-manager': 'crm',
  'crm-director': 'crm',
  'crm-executive': 'crm',

  // Customer Management roles
  customer_management_system_director: 'customer_management',
  'customer-manager': 'customer_management',
  customer_management_system_vp: 'customer_management',
  customer_management_system_manager: 'customer_management',
  customer_management_system_executive: 'customer_management',

  // Customer Success roles
  customer_success_management_manager: 'customer_success_manager',
  customer_success_management_director: 'customer_success_manager',

  // HR roles
  'hr-director': 'hr_management',
  'hr-vp': 'hr_management',
  'hr-manager': 'hr_management',
  'hr-executive': 'hr_management',

  // Partner roles
  'partner-director': 'partner_management',
  'partner-vp': 'partner_management',
  'partner-manager': 'partner_management',
  'partner-executive': 'partner_management',

  // User Management roles
  'user-director': 'user_management',
  'user-vp': 'user_management',
  'user-manager': 'user_management',
  'user-executive': 'user_management',

  // Software Management roles
  'software_management_system_director': 'software_management',
  'software_management_system_vp': 'software_management',
  'software_management_system_manager': 'software_management',
  'software_management_system_executive': 'software_management',

  // Industry Management roles
  'industry-director': 'industry_management',
  'industry-vp': 'industry_management',
  'industry-manager': 'industry_management',
  'industry-executive': 'industry_management',

  // Website Management roles
  'website-director': 'website_management',
  'website-vp': 'website_management',
  'website-manager': 'website_management',
  'website-executive': 'website_management',

  // Other roles
  customer: 'customer',
  'end-user': 'user',
  partner: 'partner',
  trainer: 'trainer',

  // Marketing roles
  'marketing-manager': 'marketing',
  'marketing-director': 'marketing',
  'marketing-executive': 'marketing',


}

// Computed properties
const pageTitle = computed(() => {
  const role = route?.query?.role
  const name = route?.query?.name

  if (role?.includes('Customer_Success')) {
    return 'Customer Success Login'
  }

  return name ? `${name} Management Login` : `${role || 'Management'} Login`
})

// Initialize form with query params
onMounted(() => {
  if (route?.query?.email) {
    formData.value.email = route.query.email
  }

  // Only set default password for development/testing
  if (import.meta.env.DEV) {
    formData.value.password = '12345678'
  }
})

// Validation functions
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePassword = (password) => {
  return password && password.length >= 6
}

const validateForm = () => {
  const errors = {}

  if (!formData.value.email) {
    errors.email = 'Email is required'
  } else if (!validateEmail(formData.value.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (!formData.value.password) {
    errors.password = 'Password is required'
  } else if (!validatePassword(formData.value.password)) {
    errors.password = 'Password must be at least 6 characters'
  }

  validationErrors.value = errors
  return Object.keys(errors).length === 0
}

// Check if role is valid for normal authentication
const isValidRole = (role) => {
  return role && ROLE_DASHBOARD_MAP.hasOwnProperty(role)
}

// Helper to get the target dashboard for the three bypassed management pages
const getBypassDashboard = () => {
  const name = route?.query?.name?.toLowerCase()
  const role = route?.query?.role?.toLowerCase()

  if (name === 'project' || role?.includes('project')) return 'project_management'
  if (name === 'business' || role?.includes('business')) return 'business_management'
  if (name === 'website' || role?.includes('website')) return 'website_management'

  return null
}

// Handle login
const handleLogin = async () => {
  // ===== Bypass for Project / Business / Marketing Management =====
  const bypassDashboard = getBypassDashboard()
  if (bypassDashboard) {
    // Show loading spinner for a moment before redirect
    loading.value = true
    // Use a small delay to let the UI update (optional, for smoother UX)
    await new Promise(resolve => setTimeout(resolve, 300))
    await router.push(`/${bypassDashboard}`)
    return
  }

  // Reset error states for normal login
  error.value = null

  // Validate form
  if (!validateForm()) {
    return
  }

  loading.value = true

  try {
    const response = await api().post('/login', {
      email: formData.value.email.trim().toLowerCase(),
      password: formData.value.password
    })

    const { user, token } = response.data

    // Validate response data
    if (!user || !token) {
      throw new Error('Invalid response from server')
    }

    const role = user.role

    // Check if role is valid/predefined
    if (!isValidRole(role)) {
      error.value = 'Access denied: Your role is not authorized to access this system. Please contact your administrator.'
      loading.value = false
      return
    }

    const dashboard = ROLE_DASHBOARD_MAP[role]

    // Store authentication data
    authStore.login(user, token, role, dashboard)

    // Redirect to appropriate dashboard
    if (route?.query?.page != 'trainingEnroll') {
      await router.push(`/${dashboard}`)
      
    } else {
      if (!route?.query?.course_id) {
        router.push({
          name: 'msc_software_training-solution-enrollment',

        })
      } else {
        router.push({
          name: 'msc_software_training-solution-enrollment',
          query: {
            courseId: route.query.course_id
          }
        })
      }
    }

  } catch (err) {
    // Handle different types of errors
    if (err.response) {
      // Server responded with error
      error.value = err.response.data?.message || 'Invalid email or password'

      // Handle specific status codes
      switch (err.response.status) {
        case 401:
          error.value = 'Invalid credentials. Please try again.'
          break
        case 403:
          error.value = 'Your account is not authorized to access this system.'
          break
        case 429:
          error.value = 'Too many login attempts. Please try again later.'
          break
        case 500:
          error.value = 'Server error. Please try again later.'
          break
      }
    } else if (err.request) {
      // Request was made but no response
      error.value = 'Unable to connect to server. Please check your internet connection.'
    } else {
      // Something else happened
      error.value = err.message || 'An unexpected error occurred'
    }

    // Log error for debugging (remove in production)
    if (import.meta.env.DEV) {
      console.error('Login error:', err)
    }
  } finally {
    loading.value = false
  }
}

// Clear validation error for a field when user starts typing
const clearFieldError = (field) => {
  if (validationErrors.value[field]) {
    validationErrors.value[field] = null
  }
}
</script>

<template>
  <!-- Your existing template – unchanged -->
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 via-indigo-100 to-pink-100 p-6">
    <div
      class="w-full max-w-2xl bg-white/70 backdrop-blur-lg border border-white/40 rounded-2xl shadow-2xl p-10 transition-transform duration-300 hover:scale-[1.001]">

      <!-- Logo / Title -->
      <div class="flex flex-col items-center justify-center mb-8">
        <h1 class="flex gap-1 items-center justify-center flex-wrap">
          <img src="/public/logo.png" alt="Hi-Tech Softsys Logo"
            class="w-28 bg-white/10 px-4 py-2 rounded-2xl" />
          <span
            class="text-4xl flex flex-col items-center gap-0 justify-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500">
            Vermont <span class="text-red-500">Composites</span>
          </span>
        </h1>
        <p class="text-gray-600 my-2 text-2xl font-bold underline underline-offset-8 capitalize">
          {{ pageTitle }}
        </p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6" novalidate>
        <!-- Email Field -->
        <div>
          <label for="email" class="block text-gray-700 font-semibold mb-1">
            Email <span class="text-red-500">*</span>
          </label>
          <input id="email" v-model="formData.email" @input="clearFieldError('email')" type="email" required
            placeholder="you@hitechsoftsys.com"
            class="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all outline-none"
            :class="{ 'border-red-500': validationErrors.email }" :disabled="loading" />
          <p v-if="validationErrors.email" class="mt-1 text-sm text-red-500">
            {{ validationErrors.email }}
          </p>
        </div>

        <!-- Password Field -->
        <div>
          <label for="password" class="block text-gray-700 font-semibold mb-1">
            Password <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <input id="password" v-model="formData.password" @input="clearFieldError('password')"
              :type="showPassword ? 'text' : 'password'" required placeholder="••••••••"
              class="w-full border border-slate-300 rounded-lg p-3 pr-16 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all outline-none"
              :class="{ 'border-red-500': validationErrors.password }" :disabled="loading" />
            <button type="button" @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-indigo-500 focus:outline-none focus:text-indigo-500"
              :disabled="loading">
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
          <p v-if="validationErrors.password" class="mt-1 text-sm text-red-500">
            {{ validationErrors.password }}
          </p>
        </div>

        <!-- Error Message -->
        <transition name="fade">
          <div v-if="error"
            class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm text-center" role="alert">
            {{ error }}
          </div>
        </transition>

        <!-- Login Button -->
        <button type="submit" :disabled="loading"
          class="w-full mt-6 bg-gradient-to-r from-cyan-600 via-blue-500 to-indigo-500 text-white py-3 rounded-full font-semibold flex justify-center items-center gap-2 shadow-lg hover:shadow-xl hover:brightness-110 active:scale-95 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100">
          <svg v-if="loading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" aria-hidden="true">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span>{{ loading ? 'Signing in...' : 'Sign In' }}</span>
        </button>
      </form>

      <!-- Footer -->
      <div v-if="route.query.role == 'trainer'" class="mt-8 text-sm text-gray-500 text-center">
        <p>
          Don't have an account?
          <router-link to="/register-trainer"
            class="text-indigo-600 font-semibold hover:text-cyan-600 hover:underline transition">
            Register Here
          </router-link>
        </p>
      </div>

      <div v-else class="mt-8 text-sm text-gray-500 text-center">
        <p>
          Need Access?
          <a href="mailto:admin@hitechsoftsys.com?subject=Access%20Request"
            class="text-indigo-600 font-semibold hover:text-cyan-600 hover:underline transition">
            Contact administrator
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

button:disabled {
  cursor: not-allowed;
  pointer-events: none;
}

@media (max-width: 640px) {
  .text-4xl {
    font-size: 1.875rem;
  }
}
</style>