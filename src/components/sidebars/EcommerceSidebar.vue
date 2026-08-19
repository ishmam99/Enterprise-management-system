<template>
  <div class="sidebar fixed  h-full w-64 bg-gray-800 text-white overflow-y-auto">
    <div class="p-4 border-b border-gray-700">
      <h2 class="text-xl font-semibold">E-Commerce Management Dashboard</h2>
      <h3 class="text-lg font-semibold pt-4 underline underline-offset-4">Welcome, {{authStore?.user?.department}} {{authStore?.user?.role}}</h3>
    </div>

    <nav class="p-2 space-y-1   ">
      <!-- Dashboard Link -->
      <router-link
        :to="{name:'ecommerce'}"
        class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-colors"
        :class="{
          'bg-blue-600 hover:bg-blue-700':
            route.path === '/ecommerce',
        }"
      >
        <Icon name="material-symbols:dashboard" class="text-lg" />
        <span>Dashboard</span>
      </router-link>

      <!-- Customer Management -->
      <div class="relative group">
        <div
          class="flex items-center justify-between gap-3 p-3 rounded-md hover:bg-gray-700 text-white transition-all cursor-pointer"
          :class="{
            'bg-gray-700 font-semibold': isCustomerManagementActive,
          }"
        >
          <div class="flex items-center gap-3">
            <Icon name="mdi:account-group" class="text-xl text-white" />
            <span>Customer Management</span>
          </div>
          <Icon
            name="heroicons:chevron-down"
            class="text-lg transition-transform duration-200 group-hover:rotate-180 text-white"
            :class="{
              'rotate-180': isCustomerManagementActive,
            }"
          />
        </div>

        <!-- Dropdown Menu -->
        <div
          class="ml-4 pl-3 border-l-2 border-gray-600 overflow-hidden transition-all duration-1000"
          :class="
            isCustomerManagementActive
              ? 'max-h-40'
              : 'max-h-0 group-hover:max-h-40'
          "
        >

          <router-link
            :to="{name:'ecommerce-customer-list'}"
            class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-all text-sm text-white"
            :class="{
              'bg-blue-600 hover:bg-blue-700':
                route.path === '/ecommerce/customer-list',
            }"
          >
            <Icon name="mdi:account-multiple" class="text-lg text-white" />
            <span>Customer List</span>
          </router-link>
          <router-link
               :to="{name:'ecommerce-add-new-customer'}"

            class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-all text-sm text-white"
            :class="{
              'bg-blue-600 hover:bg-blue-700':
                route.path === '/ecommerce/add-new-customer',
            }"
          >
            <Icon name="mdi:account-plus" class="text-lg text-white" />
            <span>Add New Customer</span>
          </router-link>
          <router-link
          :to="{name:'ecommerce-customer-activity-logs'}"

            class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-all text-sm text-white"
            :class="{
              'bg-blue-600 hover:bg-blue-700':
                route.path === '/ecommerce/customer-activity-logs',
            }"
          >
            <Icon name="mdi:history" class="text-lg text-white" />
            <span>Customer Activity Logs</span>
          </router-link>
        </div>
      </div>
      <!-- Product Management -->
      <div class="relative group">
        <div
          class="flex items-center justify-between gap-3 p-3 rounded-md hover:bg-gray-700 text-white transition-all cursor-pointer"
          :class="{
            'bg-gray-700 font-semibold': isProductManagementActive,
          }"
        >
          <div class="flex items-center gap-3">
            <Icon
              name="mdi:package-variant-closed"
              class="text-xl text-white"
            />
            <span>Products Management</span>
          </div>

          <Icon
            name="heroicons:chevron-down"
            class="text-lg transition-transform duration-200 group-hover:rotate-180 text-white"
            :class="{
              'rotate-180': isProductManagementActive,
            }"
          />
        </div>

        <!-- Dropdown Menu -->
        <div
          class="ml-4 pl-3 border-l-2 border-gray-600 overflow-hidden transition-all duration-1000"
          :class="
            isProductManagementActive
              ? 'max-h-40'
              : 'max-h-0 group-hover:max-h-40'
          "
        >
          <router-link

            :to="{name:'ecommerce-productList'}"
            class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-all text-sm text-white"
            :class="{
              'bg-blue-600 hover:bg-blue-700':
                route.path === '/ecommerce/productlist',
            }"
          >
            <Icon name="mdi:account-multiple" class="text-lg text-white" />
            <span>Products List</span>
          </router-link>
          <router-link
            :to="{name:'ecommerce-productCreate'}"

            class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-all text-sm text-white"
            :class="{
              'bg-blue-600 hover:bg-blue-700':
                route.path === '/ecommerce/productcreate',
            }"
          >
            <Icon name="mdi:account-plus" class="text-lg text-white" />
            <span>Add New Product</span>
          </router-link>
        </div>
      </div>

      <!-- Orders with Dropdown -->
      <div class="relative group">
        <div
          class="flex items-center justify-between gap-3 p-3 rounded-md hover:bg-gray-700 text-white transition-all cursor-pointer"
          :class="{
            'bg-gray-700 font-semibold': isOrdersActive,
          }"
        >
          <div class="flex items-center gap-3">
            <Icon name="mdi:clipboard-list" class="text-xl text-white" />
            <span>Orders</span>
          </div>
          <Icon
            name="heroicons:chevron-down"
            class="text-lg transition-transform duration-200 group-hover:rotate-180 text-white"
            :class="{ 'rotate-180': isOrdersActive }"
          />
        </div>

        <!-- Dropdown Menu -->
        <div
          class="ml-4 pl-3 border-l-2 border-gray-600 overflow-hidden transition-all duration-1000"
          :class="isOrdersActive ? 'max-h-80' : 'max-h-0 group-hover:max-h-80'"
        >
          <router-link

              :to="{name:'ecommerce-all-orders'}"
            class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-all text-sm text-white"
            :class="{
              'bg-blue-600 hover:bg-blue-700':
                route.path === '/ecommerce/all-orders',
            }"
          >
            <Icon name="mdi:format-list-bulleted" class="text-lg text-white" />
            <span>All Orders</span>
          </router-link>
          <router-link
            :to="{name:'ecommerce-pending-orders'}"

            class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-all text-sm text-white"
            :class="{
              'bg-blue-600 hover:bg-blue-700':
                route.path === '/ecommerce/pending-orders',
            }"
          >
            <Icon name="mdi:clock-outline" class="text-lg text-white" />
            <span>Pending Orders</span>
          </router-link>
          <router-link
            :to="{name:'ecommerce-completed-orders'}"

            class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-all text-sm text-white"
            :class="{
              'bg-blue-600 hover:bg-blue-700':

                route.path === '/ecommerce/completed-orders',
            }"
          >
            <Icon name="mdi:check-circle-outline" class="text-lg text-white" />
            <span>Completed Orders</span>
          </router-link>
          <router-link
            :to="{name:'ecommerce-cancelled-orders'}"

            class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-all text-sm text-white"
            :class="{
              'bg-blue-600 hover:bg-blue-700':
                route.path === '/ecommerce/cancelled-orders',
            }"
          >
            <Icon name="mdi:cancel" class="text-lg text-white" />
            <span>Cancelled Orders</span>
          </router-link>
        </div>
      </div>

      <!-- Payment & Transactions -->
      <div class="relative group">
        <div
          class="flex items-center justify-between gap-3 p-3 rounded-md hover:bg-gray-700 text-white transition-all cursor-pointer"
          :class="{
            'bg-gray-700 font-semibold': isPaymentsActive,
          }"
        >
          <div class="flex items-center gap-3">
            <Icon name="mdi:credit-card-outline" class="text-xl text-white" />
            <span>Payments & Transactions</span>
          </div>
          <Icon
            name="heroicons:chevron-down"
            class="text-lg transition-transform duration-200 group-hover:rotate-180 text-white"
            :class="{
              'rotate-180': isPaymentsActive,
            }"
          />
        </div>

        <!-- Dropdown Menu -->
        <div
          class="ml-4 pl-3 border-l-2 border-gray-600 overflow-hidden transition-all duration-1000"
          :class="
            isPaymentsActive ? 'max-h-40' : 'max-h-0 group-hover:max-h-40'
          "
        >
          <router-link
          :to="{name:'ecommerce-payments'}"

            class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-all text-sm text-white"
            :class="{
              'bg-blue-600 hover:bg-blue-700':
                route.path === 'ecommerce/payments',
            }"
          >
            <Icon name="mdi:cash-multiple" class="text-lg text-white" />
            <span>Payments</span>
          </router-link>
          <router-link
          :to="{name:'ecommerce-refunds'}"

            class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-all text-sm text-white"
            :class="{
              'bg-blue-600 hover:bg-blue-700':
                route.path === 'ecommerce/refunds',
            }"
          >
            <Icon name="mdi:cash-refund" class="text-lg text-white" />
            <span>Refunds</span>
          </router-link>
        </div>
      </div>

      <!-- Marketing & Promotions -->
      <div class="relative group">
        <div
          class="flex items-center justify-between gap-3 p-3 rounded-md hover:bg-gray-700 text-white transition-all cursor-pointer"
          :class="{
            'bg-gray-700 font-semibold': isMarketingActive,
          }"
        >
          <div class="flex items-center gap-3">
            <Icon name="mdi:bullhorn-outline" class="text-xl text-white" />
            <span>Marketing &amp; Promotions</span>
          </div>
          <Icon
            name="heroicons:chevron-down"
            class="text-lg transition-transform duration-200 group-hover:rotate-180 text-white"
            :class="{
              'rotate-180': isMarketingActive,
            }"
          />
        </div>

        <!-- Dropdown Menu -->
        <div
          class="ml-4 pl-3 border-l-2 border-gray-600 overflow-hidden transition-all duration-1000"
          :class="
            isMarketingActive ? 'max-h-40' : 'max-h-0 group-hover:max-h-40'
          "
        >
          <router-link
          :to="{name:'ecommerce-coupons'}"

            class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-all text-sm text-white"
            :class="{
              'bg-blue-600 hover:bg-blue-700':
                route.path === 'ecommerce/coupons',
            }"
          >
            <Icon
              name="mdi:ticket-percent-outline"
              class="text-lg text-white"
            />
            <span>Coupons</span>
          </router-link>
          <router-link
          :to="{name:'ecommerce-banners'}"

            class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-all text-sm text-white"
            :class="{
              'bg-blue-600 hover:bg-blue-700':
                route.path === 'ecommerce/banners',
            }"
          >
            <Icon name="mdi:billboard" class="text-lg text-white" />
            <span>Banners</span>
          </router-link>
        </div>
      </div>

      <!-- Settings -->
      <div class="relative group">
        <div
          class="flex items-center justify-between gap-3 p-3 rounded-md hover:bg-gray-700 text-white transition-all cursor-pointer"
          :class="{
            'bg-gray-700 font-semibold': isSettingsActive,
          }"
        >
          <div class="flex items-center gap-3">
            <Icon name="mdi:cog-outline" class="text-xl text-white" />
            <span>Settings</span>
          </div>
          <Icon
            name="heroicons:chevron-down"
            class="text-lg transition-transform duration-200 group-hover:rotate-180 text-white"
            :class="{ 'rotate-180': isSettingsActive }"
          />
        </div>

        <!-- Dropdown Menu -->
        <div
          class="ml-4 pl-3 border-l-2 border-gray-600 overflow-hidden transition-all duration-1000"
          :class="
            isSettingsActive ? 'max-h-40' : 'max-h-0 group-hover:max-h-40'
          "
        >
          <router-link
          :to="{name:'ecommerce-store-settings'}"

            class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-all text-sm text-white"
            :class="{
              'bg-blue-600 hover:bg-blue-700':
                route.path === 'ecommerce/store-settings',
            }"
          >
            <Icon name="mdi:store-outline" class="text-lg text-white" />
            <span>Store Settings</span>
          </router-link>
          <router-link
          :to="{name:'ecommerce-users-roles'}"

            class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-all text-sm text-white"
            :class="{
              'bg-blue-600 hover:bg-blue-700':
                route.path === 'ecommerce/users-roles',
            }"
          >
            <Icon name="mdi:account-cog-outline" class="text-lg text-white" />
            <span>Users &amp; Roles</span>
          </router-link>
          <router-link
          :to="{name:'ecommerce-security'}"
            
            class="flex items-center gap-3 p-3 rounded hover:bg-gray-700 transition-all text-sm text-white"
            :class="{
              'bg-blue-600 hover:bg-blue-700':
                route.path === 'ecommerce/security',
            }"
          >
            <Icon name="mdi:shield-lock-outline" class="text-lg text-white" />
            <span>Security</span>
          </router-link>
        </div>
      </div>

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
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const isProductManagementActive = computed(() => {
  return (
    route.path.startsWith('/ecommerce/') &&
    (route.path.includes('productList') ||
      route.path.includes('productCreate') ||
      route.path.includes('productEdit'))
  )
})
const isCustomerManagementActive = computed(() => {
  return (route.path.startsWith('/ecommerce/') &&
    (route.path.includes('customer-list') ||
      route.path.includes('add-new-customer') ||
      route.path.includes('customer-activity-logs'))
  )
})

const isOrdersActive = computed(() => {
  return (
    route.path.startsWith('/ecommerce/') &&
    (route.path.includes('orders') ||
      route.path.includes('pending-orders') ||
      route.path.includes('completed-orders') ||
      route.path.includes('cancelled-orders'))
  )
})

const isPaymentsActive = computed(() => {
  return (
    route.path.startsWith('/ecommerce/') &&
    (route.path.includes('payments') || route.path.includes('refunds'))
  )
})

const isMarketingActive = computed(() => {
  return (
    route.path.startsWith('/ecommerce/') &&
    (route.path.includes('coupons') || route.path.includes('banners'))
  )
})

const isSettingsActive = computed(() => {
  return (
    route.path.startsWith('/ecommerce/') &&
    (route.path.includes('settings') ||
      route.path.includes('store-settings') ||
      route.path.includes('users-roles') ||
      route.path.includes('security'))
  )
})

const logoutUser = () => {
  authStore.logout()
  // loginCookie.value = ''
  // tokenCookie.value = ''
  // userCookie.value = ''
  router.push(`/login`)
}
</script>

<style scoped>
.sidebar {
  width: 16rem;
  z-index: 10;
}
</style>
