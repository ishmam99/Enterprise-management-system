<template>
  <header class="bg-gray-800 text-white shadow-md">
    <div class=" px-10">
      <div class="flex items-center justify-between h-16">
        <!-- Logo/Title -->
        <div class="flex items-center">
          <RouterLink to="/" class="text-xl font-bold">HTBIS-Hospitality</RouterLink>
        </div>

        <!-- Main Navigation -->
        <nav class="hidden md:flex space-x-1">
          <NuxtLink
            to="/admin/business_development"
            class="px-4 py-2 rounded hover:bg-gray-700 transition-colors flex items-center gap-2"
            active-class="bg-blue-600 hover:bg-blue-700"
          >
            <Icon name="material-symbols:home" class="text-lg" />
            <span>Home</span>
          </NuxtLink>

          <NuxtLink
            to="/admin/business_development/leads"
            class="px-4 py-2 rounded hover:bg-gray-700 transition-colors flex items-center gap-2"
            active-class="bg-blue-600 hover:bg-blue-700"
          >
            <Icon name="material-symbols:leaderboard" class="text-lg" />
            <span>Leads</span>
          </NuxtLink>
          <NuxtLink
            to="/admin/business_development/bd-leads"
            class="px-4 py-2 rounded hover:bg-gray-700 transition-colors flex items-center gap-2"
            active-class="bg-blue-600 hover:bg-blue-700"
          >
            <Icon name="material-symbols:leaderboard" class="text-lg" />
            <span>BD Leads</span>
          </NuxtLink>
          <NuxtLink
            to="/admin/business_development/bd-accounts"
            class="px-4 py-2 rounded hover:bg-gray-700 transition-colors flex items-center gap-2"
            active-class="bg-blue-600 hover:bg-blue-700"
          >
            <Icon name="material-symbols:leaderboard" class="text-lg" />
            <span>BD Accounts</span>
          </NuxtLink>

          <NuxtLink
            to="/admin/business_development/contacts"
            class="px-4 py-2 rounded hover:bg-gray-700 transition-colors flex items-center gap-2"
            active-class="bg-blue-600 hover:bg-blue-700"
          >
            <Icon name="material-symbols:mail" class="text-lg" />
            <span>Contacts</span>
          </NuxtLink>

          <NuxtLink
            to="/admin/business_development/products"
            class="px-4 py-2 rounded hover:bg-gray-700 transition-colors flex items-center gap-2"
            active-class="bg-blue-600 hover:bg-blue-700"
          >
            <Icon name="material-symbols:inventory" class="text-lg" />
            <span>Products</span>
          </NuxtLink>

          <NuxtLink
            to="/admin/business_development/sold-products"
            class="px-4 py-2 rounded hover:bg-gray-700 transition-colors flex items-center gap-2"
            active-class="bg-blue-600 hover:bg-blue-700"
          >
            <Icon name="material-symbols:sell" class="text-lg" />
            <span>Sold Products</span>
          </NuxtLink>

          <!-- <NuxtLink
            to="/admin/business_development/emails"
            class="px-4 py-2 rounded hover:bg-gray-700 transition-colors flex items-center gap-2"
            active-class="bg-blue-600 hover:bg-blue-700"
          >
            <Icon name="material-symbols:mail" class="text-lg" />
            <span>Emails</span>
          </NuxtLink> -->
        </nav>

        <!-- User Profile and Actions -->
        <div class="flex items-center gap-4">
          <div class="text-sm">
            <p class="font-medium">{{authStore?.user?.department}}</p>
            <p class="text-gray-300">{{authStore?.user?.role}}</p>
          </div>
          <button
            @click="logoutUser"
            class="p-2 rounded-full hover:bg-red-700 transition-colors flex items-center gap-1"
            title="Logout"
          >
            <Icon name="material-symbols:logout" class="text-lg" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const logoutUser = () => {
  authStore.logout()
  router.push(`/login`)
}
</script>

<style scoped>
header {
  z-index: 50;
}

.router-link-active.router-link-exact-active {
  background-color: rgb(37 99 235);
  border-radius: var(--radius-2xl);
}

.router-link-active.router-link-exact-active:hover {
  background-color: rgb(29 78 216);
  border-radius: var(--radius-2xl);
}
</style>
