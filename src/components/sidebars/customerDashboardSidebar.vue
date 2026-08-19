<!-- components/Sidebar.vue -->
<template>
  <div class="w-64 bg-gray-800 shadow-lg fixed h-full border-r border-gray-700 pt-20">
    <!-- Logo/Header -->
    <div class="p-6 border-b border-gray-700">
      <h2 class="text-xl font-bold text-white">Customer Dashboard</h2>
        <h3 class="text-lg font-semibold pt-4 underline underline-offset-4">Welcome, {{authStore?.user?.department}} {{authStore?.user?.role}}</h3>
    </div>

    <!-- Navigation -->
    <nav class="p-4 space-y-2">
      <!-- Dashboard -->
      <NuxtLink
        to="/customer/dashboard"
        class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-colors text-white"
        active-class="bg-blue-600 hover:bg-blue-700"
      >
        <Icon name="material-symbols:dashboard" class="text-lg text-white" />
        <span>Dashboard</span>
      </NuxtLink>

      <!-- My Orders with Dropdown -->
      <div class="relative group">
        <div
          class="flex items-center justify-between gap-3 p-3 rounded-md hover:bg-gray-700 text-white transition-all cursor-pointer"
          :class="{'bg-gray-700 font-semibold': route.path.includes('/orders')}"
        >
          <div class="flex items-center gap-3">
            <Icon name="material-symbols:shopping-bag" class="text-xl text-white" />
            <span>My Orders</span>
          </div>
          <Icon 
            name="heroicons:chevron-down" 
            class="text-lg transition-transform duration-200 group-hover:rotate-180 text-white"
            :class="{'rotate-180': route.path.includes('/customer/orders')}" 
          />
        </div>

        <!-- Dropdown Menu -->
        <div
          class="ml-4 pl-3 border-l-2 border-gray-600 overflow-hidden transition-all duration-300"
          :class="route.path.includes('/orders') ? 'max-h-40' : 'max-h-0 group-hover:max-h-40'"
        >
          <NuxtLink
            to="/customer/orders/pending_orders"
            class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-all text-sm text-white"
            active-class="bg-blue-600 hover:bg-blue-700"
          >
            <Icon name="material-symbols:pending" class="text-lg text-white" />
            <span>Pending Orders</span>
          </NuxtLink>
          <NuxtLink
            to="/customer/orders/completed_orders"
            class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-all text-sm text-white"
            active-class="bg-blue-600 hover:bg-blue-700"
          >
            <Icon name="material-symbols:check-circle" class="text-lg text-white" />
            <span>Completed Orders</span>
          </NuxtLink>
          <NuxtLink
            to="/customer/orders/cancelled_orders"
            class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-all text-sm text-white"
            active-class="bg-blue-600 hover:bg-blue-700"
          >
            <Icon name="material-symbols:cancel" class="text-lg text-white" />
            <span>Cancelled Orders</span>
          </NuxtLink>
        </div>
      </div>

      <!-- My Profile -->
      <NuxtLink
        to="/customer/profile"
        class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-colors text-white"
        active-class="bg-blue-600 hover:bg-blue-700"
      >
        <Icon name="material-symbols:account-circle" class="text-lg text-white" />
        <span>My Profile</span>
      </NuxtLink>

      <!-- Payments -->
      <NuxtLink
        to="/customer/payments"
        class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-colors text-white"
        active-class="bg-blue-600 hover:bg-blue-700"
      >
        <Icon name="material-symbols:credit-card" class="text-lg text-white" />
        <span>Payments</span>
      </NuxtLink>

      <!-- Wishlist -->
      <NuxtLink
        to="/customer/wishlist"
        class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-colors text-white"
        active-class="bg-blue-600 hover:bg-blue-700"
      >
        <Icon name="material-symbols:favorite" class="text-lg text-white" />
        <span>Wishlist</span>
      </NuxtLink>

      <!-- Settings -->
      <NuxtLink
        to="/customer/settings"
        class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-colors text-white"
        active-class="bg-blue-600 hover:bg-blue-700"
      >
        <Icon name="material-symbols:settings" class="text-lg text-white" />
        <span>Settings</span>
      </NuxtLink>
    </nav>

    <!-- Footer -->
    <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 text-xs text-white text-center">
      HTB-Hospitality
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
</script>

<style scoped>
/* Active link indicator */
.router-link-active {
  position: relative;
}
.router-link-active:after {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 60%;
  width: 3px;
  background: #ffffff;
  border-radius: 0 3px 3px 0;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>
