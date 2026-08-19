<template>
  <div class="sidebar fixed h-full w-64 bg-gray-800 text-white overflow-y-auto">
    <div class="p-4 border-b border-gray-700">
      <h2 class="text-xl font-semibold">Website Management Dashboard</h2>
        <h3 class="text-lg font-semibold pt-4 underline underline-offset-4">Welcome, {{authStore?.user?.department}} {{authStore?.user?.role}}</h3>
    </div>

    <nav class="p-2 space-y-1">
      <!-- Dashboard Link -->
      <router-link
        :to="{name:'website_management'}"
        class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-colors"
       :class="{
          'bg-blue-600 hover:bg-blue-700':
            route.path === '/website_management',
        }"
      >
        <Icon name="material-symbols:dashboard" class="text-lg" />
        <span>Dashboard</span>
      </router-link>
      <!-- <NuxtLink
        to="/admin/website_management"
        class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-colors"
        active-class="bg-blue-600 hover:bg-blue-700"
      >
        <Icon name="material-symbols:dashboard" class="text-lg" />
        <span>Overview</span>
      </NuxtLink> -->

      <!-- Analytics Link -->
      <routerLink
        :to="{ name: 'website_management-analytics' }"
        class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-colors"
        active-class="bg-blue-600 hover:bg-blue-700"
      >
        <Icon name="material-symbols:analytics" class="text-lg" />
        <span>Analytics</span>
      </routerLink>

      <!-- Content Section with Hover Submenu -->
      <div class="relative group">
        <div
          class="flex items-center justify-between gap-3 p-3 rounded hover:bg-gray-700 text-white transition-all cursor-pointer"
          :class="{'bg-gray-700 font-semibold': isContentRoute()}"
        >
          <div class="flex items-center gap-3" active-class="text-blue-400 font-medium">
            <Icon name="material-symbols:content-copy" class="text-lg" />
            <span>Content</span>
          </div>
          <Icon
            name="heroicons:chevron-down"
            class="text-lg transition-transform duration-200 group-hover:rotate-180"
            :class="{'rotate-180': isContentRoute()}"
          />
        </div>

        <!-- Dropdown Menu -->
        <div
          class="ml-4 pl-3 border-l-2 border-gray-600 overflow-hidden transition-all duration-300"
          :class="isContentRoute() ? 'max-h-96' : 'max-h-0 group-hover:max-h-96'"
        >
          <router-link
            :to="{ name: 'website_management-content' }"

            class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
            active-class="text-blue-400 font-medium"
          >
            <Icon name="material-symbols:grid-view" class="text-lg" />
            <span>Dashboard</span>
          </router-link>
          <router-link
            :to="{ name: 'website_management-content-banners' }"
            class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
            active-class="text-blue-400 font-medium"
          >
            <Icon name="material-symbols:image" class="text-lg" />
            <span>Banners</span>
          </router-link>
          <router-link
            :to="{ name: 'website_management-content-images' }"

            class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
            active-class="text-blue-400 font-medium"
          >
            <Icon name="material-symbols:photo-library" class="text-lg" />
            <span>Images</span>
          </router-link>
          <router-link
            :to="{ name: 'website_management-content-videos' }"

            class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
            active-class="text-blue-400 font-medium"
          >
            <Icon name="material-symbols:video-library" class="text-lg" />
            <span>Videos</span>
          </router-link>
        </div>
      </div>

      <!-- <div class="relative group">
        <div
          class="flex items-center justify-between gap-3 p-3 rounded hover:bg-gray-700 text-white transition-all cursor-pointer"
          :class="{'bg-gray-700 font-semibold': isEcommerceRoute()}"
        >
          <div class="flex items-center gap-3">
            <Icon name="material-symbols:shopping-cart" class="text-lg" />
            <span>E-commerce</span>
          </div>
          <Icon
            name="heroicons:chevron-down"
            class="text-lg transition-transform duration-200 group-hover:rotate-180"
            :class="{'rotate-180': isEcommerceRoute()}"
          />
        </div>

        <div
          class="ml-4 pl-3 border-l-2 border-gray-600 overflow-hidden transition-all duration-300"
          :class="isEcommerceRoute() ? 'max-h-96' : 'max-h-0 group-hover:max-h-96'"
        >
          <NuxtLink
            to="/admin/website_management/ecommerce/dashboard"
            class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
            active-class="text-blue-400 font-medium"
          >
            <Icon name="material-symbols:dashboard" class="text-lg" />
            <span>Dashboard</span>
          </NuxtLink>
          <NuxtLink
            to="/admin/website_management/ecommerce/orders"
            class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
            active-class="text-blue-400 font-medium"
          >
            <Icon name="material-symbols:receipt" class="text-lg" />
            <span>Orders</span>
          </NuxtLink>
          <NuxtLink
            to="/admin/website_management/ecommerce/pending-orders"
            class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
            active-class="text-blue-400 font-medium"
          >
            <Icon name="material-symbols:pending-actions" class="text-lg" />
            <span>Pending Orders</span>
          </NuxtLink>
          <NuxtLink
            to="/admin/website_management/ecommerce/products"
            class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
            active-class="text-blue-400 font-medium"
          >
            <Icon name="material-symbols:inventory" class="text-lg" />
            <span>Products</span>
          </NuxtLink>
          <NuxtLink
            to="/admin/website_management/ecommerce/categories"
            class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
            active-class="text-blue-400 font-medium"
          >
            <Icon name="material-symbols:category" class="text-lg" />
            <span>Categories</span>
          </NuxtLink>
          <NuxtLink
            to="/admin/website_management/ecommerce/inventory"
            class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
            active-class="text-blue-400 font-medium"
          >
            <Icon name="material-symbols:warehouse" class="text-lg" />
            <span>Inventory</span>
          </NuxtLink>
          <NuxtLink
            to="/admin/website_management/ecommerce/discounts"
            class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
            active-class="text-blue-400 font-medium"
          >
            <Icon name="material-symbols:percent" class="text-lg" />
            <span>Discounts</span>
          </NuxtLink>
          <NuxtLink
            to="/admin/website_management/ecommerce/customers"
            class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
            active-class="text-blue-400 font-medium"
          >
            <Icon name="material-symbols:group" class="text-lg" />
            <span>Customers</span>
          </NuxtLink>
          <NuxtLink
            to="/admin/website_management/ecommerce/reviews"
            class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
            active-class="text-blue-400 font-medium"
          >
            <Icon name="material-symbols:reviews" class="text-lg" />
            <span>Reviews</span>
          </NuxtLink>
          <NuxtLink
            to="/admin/website_management/ecommerce/shipping"
            class="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all text-sm"
            active-class="text-blue-400 font-medium"
          >
            <Icon name="material-symbols:local-shipping" class="text-lg" />
            <span>Shipping</span>
          </NuxtLink>
        </div>
      </div> -->

      <!-- Users Link -->
      <router-link
        :to="{ name: 'website_management-users' }"

        class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-colors"
        active-class="bg-blue-600 hover:bg-blue-700"

      >
        <Icon name="material-symbols:group" class="text-lg" />
        <span>Users</span>
      </router-link>

      <!-- Settings Link -->
      <router-link
      :to="{ name: 'website_management-settings' }"

        class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-colors"
        active-class="bg-blue-600 hover:bg-blue-700"
      >
        <Icon name="material-symbols:settings" class="text-lg" />
        <span>Settings</span>
      </router-link>
      <div
         @click="logoutUser()"
        class="flex items-center gap-3 p-3  cursor-pointer hover:bg-red-700 transition-colors mt-10"

      >
        <Icon name="material-symbols:dashboard" class="text-lg" />
        <span>Logout</span>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

// Check if current route is a content page
const isContentRoute = () => {
  return route.path.startsWith('/website_management/content')
}


const logoutUser = () => {
  authStore.logout()
  router.push('/login/userLogin')
}
</script>

<style scoped>
.sidebar {
  width: 16rem;
  z-index: 10;
}
</style>
