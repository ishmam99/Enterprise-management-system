<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100  flex flex-col items-center justify-center p-6">
    <!-- Animated 404 indicator -->
    <div class="relative mb-12">
      <div class="text-[120px] font-bold text-red-300 tracking-widest">404</div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-4xl font-medium text-gray-700 animate-pulse">Page Not Found</div>
      </div>
    </div>

    <!-- Content container -->
    <div class="max-w-lg text-center space-y-8">
      <!-- Animated icon -->
      <div class="animate-float">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-32 w-32 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <!-- Formal message -->
      <div class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-800">We couldn't find that page</h2>
        <p class="text-gray-600 leading-relaxed">
          The requested page could not be located. This may be due to an outdated link,
          a typing error, or the page having been moved. Please verify the URL or
          navigate using the options below.
        </p>
      </div>

      <!-- Action buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center pt-6">
        <button 
          @click="goBack"
          class="px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white font-medium rounded-md shadow-sm transition-all duration-200 hover:shadow-md"
        >
          Return to Previous Page
        </button>
        <router-link 
          to="/"
          class="px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-md border border-gray-300 shadow-sm transition-all duration-200 hover:shadow-md"
        >
          Go to Homepage
        </router-link>

           <button
          @click="authStore.logout(), router.push('/login/adminLogin')"
          class="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </div>

    <!-- Subtle decorative elements -->
    <div class="absolute top-20 left-10 w-12 h-12 rounded-full bg-gray-200 opacity-20 animate-float-slow"></div>
    <div class="absolute bottom-1/4 right-20 w-16 h-16 rounded-full bg-gray-300 opacity-15 animate-float-slower"></div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const goBack = () => {
  window.history.back();
};
</script>

<style>
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
@keyframes float-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
@keyframes float-slower {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}
.animate-float {
  animation: float 4s ease-in-out infinite;
}
.animate-float-slow {
  animation: float-slow 6s ease-in-out infinite;
}
.animate-float-slower {
  animation: float-slower 8s ease-in-out infinite;
}
</style>