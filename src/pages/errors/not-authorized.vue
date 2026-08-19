<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6">
    <!-- Error header -->
    <div class="relative mb-10 w-full max-w-md text-center">
      <div class="text-[120px] font-bold text-red-100 tracking-widest">403</div>
      <div class="absolute inset-0 flex flex-col items-center justify-center space-y-2">
        <h1 class="text-3xl font-semibold text-gray-800">Access Denied</h1>
        <div class="w-16 h-1 bg-red-500 rounded-full"></div>
      </div>
    </div>

    <!-- Content container -->
    <div class="max-w-lg bg-white rounded-xl shadow-sm p-8 space-y-6">
      <!-- Icon and message -->
      <div class="flex flex-col items-center space-y-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>

        <div class="text-center space-y-3">
          <h2 class="text-xl font-medium text-gray-800">Permission Required</h2>
          <p class="text-gray-600">
            Your account (<span class="font-medium text-gray-700">{{ authStore.user?.email || authStore.user?.name }}</span>)
            with <span class="font-medium text-gray-700">{{ authStore.role }}</span> role doesn't have
            sufficient permissions to access this resource.
          </p>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
               <button
          @click="authStore.logout(), router.push('/login/userLogin')"
          class="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Logout</span>
        </button>

        <router-link
          to="/"
          class="flex-1 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-300 transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Go to Home</span>
        </router-link>


      </div>
<!-- //hello -->
      <!-- Additional help -->
      <div class="pt-6 border-t border-gray-100 text-center">
        <p class="text-sm text-gray-500">
          If you believe this is an error, please contact
          system administration
          and reference your role: <span class="font-mono bg-gray-100 px-2 py-1 rounded text-sm">{{ authStore.role }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';
// import { useRolesStore } from '@/stores/rolesStore';

const router = useRouter();
const authStore = useAuthStore();
// const rolesStore = useRolesStore();

const goBack = () => {
  window.history.back();
};
</script>

<style scoped>
/* Smooth entrance animation */
.error-enter-active {
  transition: all 0.3s ease-out;
}
.error-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
</style>
